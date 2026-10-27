#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
跨平台（macOS / Windows / Linux）全功能同步与打包引擎
零第三方依赖（纯 Python 3 标准库实现），与 scripts/sync-sources.js、scripts/pack.js、scripts/pack-patent.js 完全等价。

用法：
  python3 scripts/pack.py              # 同步资产并打包生成 index-standalone.html
  python3 scripts/pack.py --sync-only  # 仅同步 sources/ 与 assets/ 资产到 data.js
  python3 scripts/pack.py --patent     # 零侵入生成脱敏版 index-patent.html
"""
import os
import re
import sys
import shutil
import base64
import subprocess
import unicodedata
from datetime import datetime, timezone, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(ROOT, "index.html")
DATA_PATH = os.path.join(ROOT, "data.js")
APP_PATH = os.path.join(ROOT, "js", "app.js")
STANDALONE_PATH = os.path.join(ROOT, "index-standalone.html")
PATENT_PATH = os.path.join(ROOT, "index-patent.html")


def norm_nfc(s):
    return unicodedata.normalize("NFC", str(s or ""))


def format_bytes(size):
    if not size or size <= 0:
        return "0 B"
    if size < 1024:
        return f"{size} B"
    if size < 1024 * 1024:
        return f"{size / 1024:.1f} KB"
    return f"{size / (1024 * 1024):.2f} MB"


def format_date(ts):
    if not ts:
        return ""
    dt = datetime.fromtimestamp(ts)
    return dt.strftime("%Y-%m-%d")


def find_mac_soffice():
    candidates = [
        "/Applications/LibreOffice.app/Contents/MacOS/soffice",
        "/opt/homebrew/bin/soffice",
        "/usr/local/bin/soffice",
    ]
    for p in candidates:
        if os.path.exists(p):
            return p
    return None


def convert_office_to_pdf(src_abs, dst_abs, script_name):
    dst_dir = os.path.dirname(dst_abs)
    os.makedirs(dst_dir, exist_ok=True)
    if sys.platform == "win32":
        conv_script = os.path.join(ROOT, "scripts", script_name)
        if os.path.exists(conv_script):
            subprocess.run(
                ["powershell", "-ExecutionPolicy", "Bypass", "-File", conv_script, "-src", src_abs, "-dst", dst_abs],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                check=False,
            )
            return os.path.exists(dst_abs)
    elif sys.platform == "darwin":
        soffice = find_mac_soffice()
        if soffice:
            tmp_dir = os.path.join(dst_dir, ".tmp_pdf_conv")
            os.makedirs(tmp_dir, exist_ok=True)
            try:
                subprocess.run(
                    [soffice, "--headless", "--convert-to", "pdf", "--outdir", tmp_dir, src_abs],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    check=False,
                )
                base_pdf = os.path.splitext(os.path.basename(src_abs))[0] + ".pdf"
                gen_pdf = os.path.join(tmp_dir, base_pdf)
                if os.path.exists(gen_pdf):
                    shutil.move(gen_pdf, dst_abs)
            finally:
                shutil.rmtree(tmp_dir, ignore_errors=True)
            return os.path.exists(dst_abs)
    return False


def scan_folder_for_assets(folder_abs, folder_rel):
    if not os.path.exists(folder_abs):
        return None
    files = [
        f for f in os.listdir(folder_abs)
        if not f.startswith("~$") and not f.startswith(".") and f != "_archive"
        and os.path.isfile(os.path.join(folder_abs, f))
    ]

    def pick_latest(pred):
        matched = [f for f in files if pred(f)]
        if not matched:
            return None
        matched.sort(key=lambda x: os.path.getmtime(os.path.join(folder_abs, x)), reverse=True)
        f = matched[0]
        st = os.stat(os.path.join(folder_abs, f))
        return {
            "path": f"{folder_rel}/{f}",
            "name": f,
            "size": format_bytes(st.st_size),
            "date": format_date(st.st_mtime),
            "mtime_ms": st.st_mtime * 1000.0,
        }

    docx = pick_latest(lambda f: re.search(r"\.(docx|doc)$", f, re.I))
    pptx = pick_latest(lambda f: re.search(r"\.(pptx|ppt)$", f, re.I))
    img = pick_latest(
        lambda f: re.search(r"\.(png|jpg|jpeg|svg|webp)$", f, re.I)
        and ("成熟度" not in norm_nfc(f))
        and ("HypeCycle" not in f)
    )
    video = pick_latest(lambda f: re.search(r"\.(mp4|webm|ogg|mov)$", f, re.I))
    return {"docx": docx, "pptx": pptx, "img": img, "video": video}


def sync_sources():
    sources_tech_dir = os.path.join(ROOT, "sources", "technologies")
    assets_tech_dir = os.path.join(ROOT, "assets", "technologies")
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data_content = f.read()

    source_folders = []
    if os.path.exists(sources_tech_dir):
        source_folders = [
            name for name in os.listdir(sources_tech_dir)
            if not name.startswith(".") and name != "_archive"
            and os.path.isdir(os.path.join(sources_tech_dir, name))
        ]

    asset_folders = []
    if os.path.exists(assets_tech_dir):
        asset_folders = [
            name for name in os.listdir(assets_tech_dir)
            if not name.startswith(".") and name != "_archive"
            and os.path.isdir(os.path.join(assets_tech_dir, name))
        ]

    print(f"[sync-sources] Found {len(source_folders)} folders in sources, {len(asset_folders)} folders in assets.")

    tech_items = re.findall(
        r"\{\s*id:\s*['\"](T\d+)['\"],\s*no:\s*(\d+),\s*name:\s*['\"]([^'\"]+)['\"],\s*short:\s*['\"]([^'\"]+)['\"]",
        data_content,
    )

    updated_map = {}
    for tech_id, no_str, name, short_raw in tech_items:
        no = int(no_str)
        short_name = norm_nfc(short_raw)
        prefix_re = re.compile(rf"^T0*{no}(_|$)", re.I)

        matched_source = next(
            (f for f in source_folders if prefix_re.search(norm_nfc(f)) or (short_name and short_name in norm_nfc(f))),
            None,
        )
        matched_asset = next(
            (f for f in asset_folders if prefix_re.search(norm_nfc(f)) or (short_name and short_name in norm_nfc(f))),
            None,
        )

        folder_name = norm_nfc(matched_source or matched_asset or "")
        if not folder_name:
            continue

        source_assets = (
            scan_folder_for_assets(os.path.join(sources_tech_dir, matched_source), f"sources/technologies/{norm_nfc(matched_source)}")
            if matched_source else None
        )
        asset_assets = (
            scan_folder_for_assets(os.path.join(assets_tech_dir, matched_asset), f"assets/technologies/{norm_nfc(matched_asset)}")
            if matched_asset else None
        )

        docx = (source_assets and source_assets["docx"]) or (asset_assets and asset_assets["docx"]) or None
        pptx = (source_assets and source_assets["pptx"]) or (asset_assets and asset_assets["pptx"]) or None

        img = None
        if source_assets and source_assets["img"]:
            img = dict(source_assets["img"])
            target_dir = os.path.join(assets_tech_dir, folder_name)
            os.makedirs(target_dir, exist_ok=True)
            src_disk = os.path.join(ROOT, *img["path"].split("/"))
            dst_disk = os.path.join(target_dir, img["name"])
            try:
                if os.path.abspath(src_disk) != os.path.abspath(dst_disk):
                    shutil.copy2(src_disk, dst_disk)
            except Exception as e:
                print(f"[sync-sources] Warning copying {img['name']}: {e}")
            img["webPath"] = f"assets/technologies/{folder_name}/{norm_nfc(img['name'])}"
        elif asset_assets and asset_assets["img"]:
            img = dict(asset_assets["img"])
            img["webPath"] = norm_nfc(img["path"])

        video = (source_assets and source_assets["video"]) or (asset_assets and asset_assets["video"]) or None

        report_pdf = None
        slides_pdf = None
        assets_folder_abs = os.path.join(assets_tech_dir, matched_asset or folder_name)
        if os.path.exists(assets_folder_abs):
            pdf_files = [
                f for f in os.listdir(assets_folder_abs)
                if not f.startswith(".") and f.lower().endswith(".pdf")
            ]
            r_pdf = next(
                (f for f in pdf_files if norm_nfc(f) == f"{folder_name}_专题研究报告.pdf"),
                next((f for f in pdf_files if "专题研究报告" in norm_nfc(f) or "报告" in norm_nfc(f)), None),
            )
            if r_pdf:
                report_pdf = f"assets/technologies/{folder_name}/{norm_nfc(r_pdf)}"

            s_pdf = next(
                (f for f in pdf_files if norm_nfc(f) == f"{folder_name}_演示汇报.pdf"),
                next((f for f in pdf_files if any(k in norm_nfc(f) for k in ("演示汇报", "汇报", "演示"))), None),
            )
            if s_pdf:
                slides_pdf = f"assets/technologies/{folder_name}/{norm_nfc(s_pdf)}"

        # Auto-convert Word/PPT if needed
        target_report_rel = f"assets/technologies/{folder_name}/{folder_name}_专题研究报告.pdf"
        target_report_abs = os.path.join(ROOT, *target_report_rel.split("/"))
        if docx and sys.platform in ("win32", "darwin"):
            docx_abs = os.path.join(ROOT, *docx["path"].split("/"))
            need_conv = (not report_pdf or not os.path.exists(target_report_abs)) or (
                os.path.getmtime(docx_abs) > os.path.getmtime(target_report_abs) + 2.0
            )
            if need_conv and convert_office_to_pdf(docx_abs, target_report_abs, "convert-doc.ps1"):
                report_pdf = target_report_rel

        target_slides_rel = f"assets/technologies/{folder_name}/{folder_name}_演示汇报.pdf"
        target_slides_abs = os.path.join(ROOT, *target_slides_rel.split("/"))
        if pptx and sys.platform in ("win32", "darwin"):
            pptx_abs = os.path.join(ROOT, *pptx["path"].split("/"))
            need_conv = (not slides_pdf or not os.path.exists(target_slides_abs)) or (
                os.path.getmtime(pptx_abs) > os.path.getmtime(target_slides_abs) + 2.0
            )
            if need_conv and convert_office_to_pdf(pptx_abs, target_slides_abs, "convert-ppt.ps1"):
                slides_pdf = target_slides_rel

        updated_map[tech_id] = {
            "folder": f"sources/technologies/{norm_nfc(matched_source)}" if matched_source else f"assets/technologies/{norm_nfc(matched_asset)}",
            "folderName": folder_name,
            "docx": docx,
            "pptx": pptx,
            "img": img,
            "video": video,
            "reportPdf": report_pdf,
            "slidesPdf": slides_pdf,
        }

        print(f"[sync-sources] Matched {tech_id} ({short_name}) -> {folder_name}")

    for tech_id, info in updated_map.items():
        pattern = re.compile(rf"(\{{[\s\n]*id:\s*['\"]{tech_id}['\"][\s\S]*?center:\s*['\"][^'\"]+['\"][\s\S]*?\}})")
        m = pattern.search(data_content)
        if not m:
            continue
        block = m.group(1)
        for field in (
            "folder", "reportDocx", "reportDocxName", "reportDocxSize", "reportDocxDate", "reportPdf",
            "slidesPptx", "slidesPptxName", "slidesPptxSize", "slidesPptxDate", "slidesPdf",
            "image", "imageName", "imageSize", "video", "videoName", "videoSize", "videoDate",
        ):
            block = re.sub(rf"\s*{field}:\s*['\"][^'\"]*['\"],?", "", block)

        new_fields = f"\n    folder: '{info['folder']}',"
        if info["docx"]:
            d = info["docx"]
            new_fields += f"\n    reportDocx: '{norm_nfc(d['path'])}', reportDocxName: '{norm_nfc(d['name'])}', reportDocxSize: '{d['size']}', reportDocxDate: '{d['date']}',"
            if info["reportPdf"]:
                new_fields += f" reportPdf: '{info['reportPdf']}',"
        elif info["reportPdf"]:
            new_fields += f"\n    reportPdf: '{info['reportPdf']}',"

        if info["pptx"]:
            p = info["pptx"]
            new_fields += f"\n    slidesPptx: '{norm_nfc(p['path'])}', slidesPptxName: '{norm_nfc(p['name'])}', slidesPptxSize: '{p['size']}', slidesPptxDate: '{p['date']}',"
            if info["slidesPdf"]:
                new_fields += f" slidesPdf: '{info['slidesPdf']}',"
        elif info["slidesPdf"]:
            new_fields += f"\n    slidesPdf: '{info['slidesPdf']}',"

        if info["img"]:
            im = info["img"]
            new_fields += f"\n    image: '{im.get('webPath') or norm_nfc(im['path'])}', imageName: '{norm_nfc(im['name'])}', imageSize: '{im['size']}',"

        if info["video"]:
            v = info["video"]
            new_fields += f"\n    video: '{norm_nfc(v['path'])}', videoName: '{norm_nfc(v['name'])}', videoSize: '{v['size']}', videoDate: '{v['date']}',"

        block = re.sub(r"(\n\s*center:\s*)", lambda mr: new_fields + mr.group(1), block, count=1)
        data_content = data_content.replace(m.group(1), block, 1)

    with open(DATA_PATH, "w", encoding="utf-8") as f:
        f.write(data_content)
    print("[sync-sources] data.js updated successfully!")


def inline_images(data_js, index_html, skip_tech_all=False):
    img_re = re.compile(r"['\"]((?:assets|sources)/[^'\"]+\.(?:png|jpg|jpeg|svg|webp))['\"]", re.I)
    image_paths = set(img_re.findall(data_js)) | set(img_re.findall(index_html))

    inlined_count = 0
    for rel_path in sorted(image_paths):
        if skip_tech_all and "technologies/" in rel_path:
            continue
        if "technologies/" in rel_path and ("成熟度" not in rel_path) and ("HypeCycle" not in rel_path):
            continue
        disk_path = os.path.join(ROOT, *rel_path.split("/"))
        if os.path.exists(disk_path):
            ext = os.path.splitext(disk_path)[1].lower().lstrip(".")
            mime = "image/svg+xml" if ext == "svg" else ("image/jpeg" if ext in ("jpg", "jpeg") else "image/png")
            with open(disk_path, "rb") as bf:
                b64 = base64.b64encode(bf.read()).decode("ascii")
            data_uri = f"data:{mime};base64,{b64}"
            data_js = data_js.replace(rel_path, data_uri)
            index_html = index_html.replace(rel_path, data_uri)
            inlined_count += 1
    return data_js, index_html, inlined_count


def pack_standalone():
    sync_sources()
    tz_utc8 = timezone(timedelta(hours=8))
    version_str = datetime.now(tz_utc8).strftime("%Y%m%d%H%M")

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data_js = f.read()
    data_js = re.sub(r"version:\s*'[^']*'", f"version: '{version_str}'", data_js, count=1)
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        f.write(data_js)

    with open(INDEX_PATH, "r", encoding="utf-8") as f:
        index_html = f.read()
    index_html = re.sub(
        r'<div class="app-version-badge" id="appVersionBadge"[^>]*>.*?</div>',
        f'<div class="app-version-badge" id="appVersionBadge" title="发布版本号（UTC+8）：{version_str}">v{version_str}</div>',
        index_html,
        count=1,
    )
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        f.write(index_html)

    with open(APP_PATH, "r", encoding="utf-8") as f:
        app_js = f.read()

    replaced_data_js, replaced_index_html, inlined_count = inline_images(data_js, index_html, skip_tech_all=False)
    out = replaced_index_html.replace('<script src="data.js"></script>', f"<script>\n{replaced_data_js}\n</script>", 1)
    out = out.replace('<script src="js/app.js"></script>', f"<script>\n{app_js}\n</script>", 1)

    with open(STANDALONE_PATH, "w", encoding="utf-8") as f:
        f.write(out)
    size_mb = os.path.getsize(STANDALONE_PATH) / (1024 * 1024)
    print(f"Successfully packed index-standalone.html! Version: {version_str}, Inlined Images: {inlined_count}, Size: {size_mb:.2f} MB")


def pack_patent():
    print("[pack-patent] Starting patent review edition build...")
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        clean_data_js = f.read()
    with open(INDEX_PATH, "r", encoding="utf-8") as f:
        clean_index_html = f.read()
    with open(APP_PATH, "r", encoding="utf-8") as f:
        clean_app_js = f.read()

    fields_to_remove = [
        "folder",
        "reportDocx", "reportDocxName", "reportDocxSize", "reportDocxDate", "reportPdf",
        "slidesPptx", "slidesPptxName", "slidesPptxSize", "slidesPptxDate", "slidesPdf",
        "image", "imageName", "imageSize",
        "hypeCycle",
        "video", "videoName", "videoSize", "videoDate",
    ]
    for field in fields_to_remove:
        clean_data_js = re.sub(rf"\s*{field}:\s*['\"][^'\"]*['\"],?", "", clean_data_js)

    patent_version = "专利审查演示版"
    clean_data_js = re.sub(r"(book:\s*\{[\s\S]*?version:\s*')[^']*", rf"\g<1>{patent_version}", clean_data_js, count=1)

    clean_index_html = re.sub(
        r"<title>.*?</title>",
        "<title>科技发展部前沿技术研究成果集（专利审查演示版）</title>",
        clean_index_html,
        count=1,
    )
    clean_index_html = re.sub(
        r'<div class="app-version-badge" id="appVersionBadge"[^>]*>.*?</div>',
        f'<div class="app-version-badge" id="appVersionBadge" title="{patent_version}">v{patent_version}</div>',
        clean_index_html,
        count=1,
    )

    replaced_data_js, replaced_index_html, inlined_count = inline_images(clean_data_js, clean_index_html, skip_tech_all=True)

    patent_closing = """function closingHTML() {
    return '<div class="page-pad page-pad-closing">' +
      '<div class="closing-center-stage">' +
        '<div class="closing-quote-list">' +
          '<div class="fl-q-item"><div class="fl-q-text">前沿技术研究，不是预测每一个未来，</div></div>' +
          '<div class="fl-q-item"><div class="fl-q-text">而是更早发现变化，更深理解趋势，更准确判断影响，</div></div>' +
          '<div class="fl-q-item"><div class="fl-q-text">并将不确定的技术变化，转化为可认知、可研判、可行动的研究成果。</div></div>' +
        '</div>' +
      '</div>' +
      '<div class="eb-copyright" style="margin-top:auto;display:flex;justify-content:flex-end;align-items:center;gap:4px;font-size:16px;font-weight:600;color:var(--text);letter-spacing:1.5px;padding-bottom:14px;padding-right:8px;">' +
        '<span style="font-size:18px;line-height:1;">&reg;</span>徐捷' +
      '</div>' +
    '</div>';
  }"""
    clean_app_js = re.sub(r"function closingHTML\(\) \{[\s\S]*?'</div>';\s*\}", lambda _: patent_closing, clean_app_js, count=1)

    out = replaced_index_html.replace('<script src="data.js"></script>', f"<script>\n{replaced_data_js}\n</script>", 1)
    out = out.replace('<script src="js/app.js"></script>', f"<script>\n{clean_app_js}\n</script>", 1)

    with open(PATENT_PATH, "w", encoding="utf-8") as f:
        f.write(out)
    size_mb = os.path.getsize(PATENT_PATH) / (1024 * 1024)
    print(f"[pack-patent] Successfully created: {os.path.basename(PATENT_PATH)} ({size_mb:.2f} MB, Inlined Assets: {inlined_count})")


if __name__ == "__main__":
    if "--patent" in sys.argv:
        pack_patent()
    elif "--sync-only" in sys.argv:
        sync_sources()
    else:
        pack_standalone()
