import os
import json
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# -------------------------------------------------------------
# Color Constants based on SPD Bank Brand Identity
# -------------------------------------------------------------
COLOR_PRIMARY_NAVY  = RGBColor(10, 25, 80)     # #0A1950 浦发主深蓝
COLOR_NAVY_BLUE     = RGBColor(5, 55, 125)    # #05377D
COLOR_ROYAL_BLUE    = RGBColor(8, 80, 180)    # #0850B4
COLOR_BRIGHT_BLUE   = RGBColor(15, 110, 240)  # #0F6EF0
COLOR_ACCENT_BLUE   = RGBColor(120, 170, 245) # #78AAF5
COLOR_LIGHT_BG      = RGBColor(240, 245, 253) # #F0F5FD
COLOR_CARD_BG       = RGBColor(248, 250, 252) # #F8FAFC
COLOR_WHITE         = RGBColor(255, 255, 255)
COLOR_BORDER        = RGBColor(226, 232, 240) # #E2E8F0
COLOR_DARK_TEXT     = RGBColor(65, 65, 65)    # #414141 默认正文
COLOR_MUTED_TEXT    = RGBColor(110, 100, 100) # #6E6464
COLOR_ACCENT_RED    = RGBColor(170, 5, 30)    # #AA051E 浦发红/警示红
COLOR_LIGHT_RED     = RGBColor(254, 242, 242) # #FEF2F2
COLOR_GOLD          = RGBColor(251, 174, 23)  # #FBAF16
COLOR_GREEN         = RGBColor(16, 185, 129)  # #10B981

TIER_COLORS = {
    '布局层': RGBColor(16, 185, 129),  # Green
    '论证层': RGBColor(14, 165, 233),  # Sky Blue
    '研究层': RGBColor(245, 158, 11),  # Amber/Gold
    '观察层': RGBColor(244, 63, 94)    # Rose/Red
}

CATEGORY_COLORS = {
    '人工智能': RGBColor(79, 140, 255),
    '数据要素': RGBColor(16, 185, 129),
    '量子科技': RGBColor(139, 92, 246),
    '网络安全': RGBColor(244, 63, 94),
    '安全':     RGBColor(244, 63, 94),
    '基础设施': RGBColor(6, 182, 212),
    '合规科技': RGBColor(245, 158, 11),
    '客户体验': RGBColor(236, 72, 153)
}

FONT_CN = "Microsoft YaHei"
FONT_EN = "Arial"

CHART_DIR = os.path.abspath("scripts/chart_output")

# -------------------------------------------------------------
# Base Helper Functions
# -------------------------------------------------------------
def set_title(slide, title_text, subtitle_text=None):
    """Sets standard slide title in layout placeholder 0 or via top textbox"""
    for ph in slide.placeholders:
        if ph.placeholder_format.idx == 0:
            tf = ph.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = title_text
            p.font.name = FONT_CN
            p.font.size = Pt(22)
            p.font.bold = True
            p.font.color.rgb = COLOR_PRIMARY_NAVY
            if subtitle_text:
                p2 = tf.add_paragraph()
                p2.text = subtitle_text
                p2.font.name = FONT_CN
                p2.font.size = Pt(10.5)
                p2.font.color.rgb = COLOR_MUTED_TEXT
                p2.space_before = Pt(3)
            return
    tb = slide.shapes.add_textbox(Inches(0.4), Inches(0.28), Inches(12.5), Inches(0.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title_text
    p.font.name = FONT_CN
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    if subtitle_text:
        p2 = tf.add_paragraph()
        p2.text = subtitle_text
        p2.font.name = FONT_CN
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = COLOR_MUTED_TEXT
        p2.space_before = Pt(3)

def add_card(slide, left, top, width, height, bg_color=COLOR_CARD_BG, border_color=COLOR_BORDER, border_width=Pt(1)):
    """Creates a rounded rectangle card container"""
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = border_width
    else:
        shape.line.fill.background()
    return shape

def add_badge(slide, left, top, width, height, text, bg_color=COLOR_PRIMARY_NAVY, text_color=COLOR_WHITE, font_size=Pt(8.5), bold=True):
    """Creates a small badge / pill"""
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    shape.line.fill.background()
    tf = shape.text_frame
    tf.word_wrap = False
    tf.margin_left = Inches(0.04)
    tf.margin_right = Inches(0.04)
    tf.margin_top = Inches(0.01)
    tf.margin_bottom = Inches(0.01)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = text
    p.font.name = FONT_CN
    p.font.size = font_size
    p.font.bold = bold
    p.font.color.rgb = text_color
    return shape

def format_bullet_text(tf, raw_text, font_size=Pt(8.5), text_color=COLOR_DARK_TEXT):
    """Formats multi-line bullet points cleanly into a text frame"""
    if not raw_text:
        return
    lines = [l.strip() for l in raw_text.split('\n') if l.strip()]
    first = True
    for line in lines:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        clean_line = line
        if not clean_line.startswith('•') and not clean_line.startswith('·'):
            clean_line = '• ' + clean_line
        else:
            clean_line = '• ' + clean_line.lstrip('•· ')
        p.text = clean_line
        p.font.name = FONT_CN
        p.font.size = font_size
        p.font.color.rgb = text_color
        p.space_after = Pt(2.5)

# -------------------------------------------------------------
# Slide Builders (P01 ~ P60)
# -------------------------------------------------------------

def build_p01_inside_cover(prs):
    """P01: 扉页衬页 (Layout 4: 空白)"""
    slide = prs.slides.add_slide(prs.slide_layouts[4])
    tb = slide.shapes.add_textbox(Inches(1.0), Inches(3.0), Inches(11.3), Inches(1.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "科技发展部前沿技术研究成果集"
    p.font.name = FONT_CN
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = RGBColor(180, 195, 215)
    
    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "SHANGHAI PUDONG DEVELOPMENT BANK · FRONTIER TECHNOLOGY RESEARCH"
    p2.font.name = FONT_EN
    p2.font.size = Pt(11)
    p2.font.color.rgb = RGBColor(200, 215, 235)
    p2.space_before = Pt(8)
    return slide

def build_p02_cover(prs, data):
    """P02: 封面 (Layout 9: 简易封面)"""
    slide = prs.slides.add_slide(prs.slide_layouts[9])
    # Layout 9 has placeholder 0 (Title) and 1 (Subtitle/Object)
    for ph in slide.placeholders:
        if ph.placeholder_format.idx == 0:
            tf = ph.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = "科技发展部前沿技术研究成果集"
            p.font.name = FONT_CN
            p.font.size = Pt(32)
            p.font.bold = True
            p.font.color.rgb = COLOR_PRIMARY_NAVY
        elif ph.placeholder_format.idx == 1:
            tf = ph.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = "前沿技术研究与战略布局全景报告\n科技规划处 编制 · 2026年 (专利审查演示版)"
            p.font.name = FONT_CN
            p.font.size = Pt(16)
            p.font.bold = False
            p.font.color.rgb = COLOR_DARK_TEXT
    return slide

def build_p03_motto(prs):
    """P03: 卷首标语 (Layout 6: 空白 黑)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    tb = slide.shapes.add_textbox(Inches(1.0), Inches(2.5), Inches(11.33), Inches(2.5))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.alignment = PP_ALIGN.CENTER
    p0.text = "VALUATION & STRATEGY"
    p0.font.name = FONT_EN
    p0.font.size = Pt(14)
    p0.font.color.rgb = COLOR_GOLD
    p0.font.bold = True
    
    p1 = tf.add_paragraph()
    p1.alignment = PP_ALIGN.CENTER
    p1.text = "看见变化  ·  判断趋势  ·  洞察影响  ·  赢得主动"
    p1.font.name = FONT_CN
    p1.font.size = Pt(30)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_WHITE
    p1.space_before = Pt(16)
    
    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "以架构为引领 · 以前瞻为导向 · 驱动金融科技高质量发展"
    p2.font.name = FONT_CN
    p2.font.size = Pt(13)
    p2.font.color.rgb = COLOR_ACCENT_BLUE
    p2.space_before = Pt(16)
    return slide

def build_p04_foreword(prs, data):
    """P04: 序章 (Layout 1: 单栏)"""
    slide = prs.slides.add_slide(prs.slide_layouts[1])
    set_title(slide, "序章：面对快速变化的技术，我们能否更早一步？", "前沿技术研究与战略布局的时代使命与探索")
    
    # Left emphasis card
    card_l = add_card(slide, Inches(0.4), Inches(1.2), Inches(4.5), Inches(5.6), bg_color=COLOR_LIGHT_BG, border_color=COLOR_NAVY_BLUE, border_width=Pt(1.5))
    tf_l = card_l.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = Inches(0.25)
    tf_l.margin_right = Inches(0.25)
    tf_l.margin_top = Inches(0.3)
    
    p = tf_l.paragraphs[0]
    p.text = "时代命题：主动迎战技术裂变"
    p.font.name = FONT_CN
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    quotes = [
        "当前，以人工智能、数据要素、量子计算为代表的新一轮科技革命正以超预期速度重构全球金融业基础设施。",
        "面对技术代际跨度急剧缩短、颠覆性技术密集爆发的新态势，银行业科技规划如果仅停留在'见招拆招'的被动应对，将迅速失去战略先机。",
        "核心使命：构建前瞻性、全景化、工程化的前沿技术研判与储备体系，从盲目跟风转向精准研判，从单点突破转向体系布局。"
    ]
    for q in quotes:
        pq = tf_l.add_paragraph()
        pq.text = "“ " + q + " ”"
        pq.font.name = FONT_CN
        pq.font.size = Pt(10)
        pq.font.color.rgb = COLOR_DARK_TEXT
        pq.space_before = Pt(12)
        
    # Right cards (2 stacked)
    card_r1 = add_card(slide, Inches(5.1), Inches(1.2), Inches(7.8), Inches(2.65))
    tf_r1 = card_r1.text_frame
    tf_r1.word_wrap = True
    tf_r1.margin_left = Inches(0.25)
    tf_r1.margin_top = Inches(0.2)
    p = tf_r1.paragraphs[0]
    p.text = "💡 全景研判体系：四大核心价值逻辑"
    p.font.name = FONT_CN
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    r1_bullets = (
        "• 看见变化：建立涵盖权威咨询、顶级期刊、开源社区、监管与科技厂商的全球动态情报雷达。\n"
        "• 判断趋势：采用六维量化评价标尺与Gartner成熟度曲线，精准定位技术演进阶段与商业化窗口。\n"
        "• 洞察影响：通过影响力雷达与企业级APQC流程对标，量化评估对银行风险、运营与客户体验的重塑。\n"
        "• 赢得主动：将前沿技术落位至企架十大中心，制定四级梯度处置策略，资源前置、治理先行。"
    )
    format_bullet_text(tf_r1, r1_bullets, font_size=Pt(9.5))
    
    card_r2 = add_card(slide, Inches(5.1), Inches(4.05), Inches(7.8), Inches(2.75))
    tf_r2 = card_r2.text_frame
    tf_r2.word_wrap = True
    tf_r2.margin_left = Inches(0.25)
    tf_r2.margin_top = Inches(0.2)
    p = tf_r2.paragraphs[0]
    p.text = "🚀 本书架构导读：知行合一的工程化成果"
    p.font.name = FONT_CN
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    r2_bullets = (
        "• 第一章 工作方案与方法：系统展示顶层推进计划、21个信息来源评估、25项研判工具与四级梯队分层机制。\n"
        "• 第二章 整体研究成果：呈现全行前沿技术全景画像、36项长名单台账、成熟度曲线、影响力雷达及企架落位图谱。\n"
        "• 第三章 各项前沿技术研究：围绕36项核心技术，展开六大维度全景深度专题研判与处置建议。\n"
        "• 附录 工具与术语：提供覆盖全生命周期的25项方法论详析及72项前沿技术专业中英文术语索引。"
    )
    format_bullet_text(tf_r2, r2_bullets, font_size=Pt(9.5))
    return slide

def build_p05_toc1(prs, data):
    """P05: 目录（上） (Layout 7: 目录页)"""
    slide = prs.slides.add_slide(prs.slide_layouts[7])
    set_title(slide, "全书目录（上）", "前沿技术研究工作方案与整体研判成果")
    
    # Left Card: 第一章
    card1 = add_card(slide, Inches(0.5), Inches(1.3), Inches(5.9), Inches(5.5), bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE, border_width=Pt(1.5))
    tf1 = card1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = Inches(0.3)
    tf1.margin_top = Inches(0.3)
    
    p = tf1.paragraphs[0]
    p.text = "第一章 · 工作方案与方法"
    p.font.name = FONT_CN
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    items1 = [
        ("1.1 工作方案", "四阶段推进时间表、核心目标、任务拆解与交付物"),
        ("1.2 信息来源评估", "权威咨询、学术期刊、开源社区等 6 大信息源层级评估"),
        ("1.3 研判工具应用", "8 大研判维度与 25 项方法论工具矩阵全景导航"),
        ("1.4 研判方法与分层机制", "六维研判评分体系与布局/论证/研究/观察四级流转机制")
    ]
    for num, desc in items1:
        pi = tf1.add_paragraph()
        pi.text = f"▶ {num}"
        pi.font.name = FONT_CN
        pi.font.size = Pt(13)
        pi.font.bold = True
        pi.font.color.rgb = COLOR_ROYAL_BLUE
        pi.space_before = Pt(12)
        
        pd = tf1.add_paragraph()
        pd.text = desc
        pd.font.name = FONT_CN
        pd.font.size = Pt(10)
        pd.font.color.rgb = COLOR_MUTED_TEXT
        pd.space_before = Pt(2)
        
    # Right Card: 第二章
    card2 = add_card(slide, Inches(6.8), Inches(1.3), Inches(5.9), Inches(5.5), bg_color=COLOR_WHITE, border_color=COLOR_BRIGHT_BLUE, border_width=Pt(1.5))
    tf2 = card2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = Inches(0.3)
    tf2.margin_top = Inches(0.3)
    
    p = tf2.paragraphs[0]
    p.text = "第二章 · 整体研究成果"
    p.font.name = FONT_CN
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    items2 = [
        ("2.1 整体研究成果概述", "9 大核心量化指标卡片、总体分布特征与研判洞察"),
        ("2.2 前沿技术储备库（长名单）", "36 项前沿技术 × 30 个台账字段全景原生可编辑表格"),
        ("2.3 技术成熟度曲线（Hype Cycle）", "Gartner 曲线模型、5 个演进阶段与重点技术成熟度分布"),
        ("2.4 技术影响力雷达图（Impact Radar）", "5 大架构维度 × 4 大时间圈层实质性影响综合推导"),
        ("2.5 企架十大中心落位图谱", "映射至企架十大中心架构蓝图驱动链路与协同分析")
    ]
    for num, desc in items2:
        pi = tf2.add_paragraph()
        pi.text = f"▶ {num}"
        pi.font.name = FONT_CN
        pi.font.size = Pt(13)
        pi.font.bold = True
        pi.font.color.rgb = COLOR_BRIGHT_BLUE
        pi.space_before = Pt(8)
        
        pd = tf2.add_paragraph()
        pd.text = desc
        pd.font.name = FONT_CN
        pd.font.size = Pt(10)
        pd.font.color.rgb = COLOR_MUTED_TEXT
        pd.space_before = Pt(2)
    return slide

def build_p06_toc2(prs, data):
    """P06: 目录（下） (Layout 7: 目录页)"""
    slide = prs.slides.add_slide(prs.slide_layouts[7])
    set_title(slide, "全书目录（下）", "第三章 36项前沿技术专题研究与附录索引")
    
    # Left Card: 第三章
    card1 = add_card(slide, Inches(0.5), Inches(1.3), Inches(7.5), Inches(5.5), bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE, border_width=Pt(1.5))
    tf1 = card1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = Inches(0.3)
    tf1.margin_top = Inches(0.25)
    
    p = tf1.paragraphs[0]
    p.text = "第三章 · 各项前沿技术专题研判 (36项)"
    p.font.name = FONT_CN
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    cats = [
        ("人工智能 (9项)", "T01 自主型AI智能体 · T02 AI原生架构 · T14 向量DB/RAG · T15 MCP协议 · T17 SLM端侧AI · T19 因果AI · T27 神经符号AI · T34 多智能体MAS · T36 LLMOps平台"),
        ("数据要素 (7项)", "T05 数据织网 · T06 数据网格 · T18 合成数据 · T31 业务编排BOAT · T32 客户数字孪生 · T33 决策智能DIP · T35 可组合核心银行"),
        ("量子科技 (3项)", "T07 后量子密码PQC · T09 量子计算 · T25 量子保密通信QKD"),
        ("网络安全 (8项)", "T08 零信任架构 · T11 隐私计算PETs · T12 机密计算TEE · T16 AI安全平台 · T20 软件供应链SBOM · T21 深度伪造检测 · T22 去中心化身份DID"),
        ("基础设施与计算 (7项)", "T03 事件驱动EDA · T04 WASM运行时 · T10 算力网络 · T13 平台工程IDP · T23 神经形态计算 · T26 绿色IT/液冷 · T29 监管科技RegTech · T28 数字人/空间计算")
    ]
    for c_title, c_techs in cats:
        pc = tf1.add_paragraph()
        pc.text = f"■ {c_title}"
        pc.font.name = FONT_CN
        pc.font.size = Pt(11)
        pc.font.bold = True
        pc.font.color.rgb = COLOR_ROYAL_BLUE
        pc.space_before = Pt(6)
        
        pt = tf1.add_paragraph()
        pt.text = c_techs
        pt.font.name = FONT_CN
        pt.font.size = Pt(9)
        pt.font.color.rgb = COLOR_DARK_TEXT
        pt.space_before = Pt(1)

    # Right Card: 附录体系
    card2 = add_card(slide, Inches(8.3), Inches(1.3), Inches(4.5), Inches(5.5), bg_color=COLOR_WHITE, border_color=COLOR_PRIMARY_NAVY, border_width=Pt(1.5))
    tf2 = card2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = Inches(0.3)
    tf2.margin_top = Inches(0.25)
    
    p = tf2.paragraphs[0]
    p.text = "附录 · 方法论工具体系与索引"
    p.font.name = FONT_CN
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    app_items = [
        ("附录一 · 方法论体系", "25 项前沿技术方法论工具详析、三层推进逻辑与三大内在张力平衡指南"),
        ("附录二 · 术语表", "全书 72 项核心专业术语详尽释义与索引速查（A-Z字母排序）"),
        ("编委会名单", "科技发展部前沿技术研判工作组主要成员与版权说明"),
        ("封底", "浦发银行品牌寄语：看见变化·判断趋势·洞察影响·赢得主动")
    ]
    for atitle, adesc in app_items:
        pa = tf2.add_paragraph()
        pa.text = f"▶ {atitle}"
        pa.font.name = FONT_CN
        pa.font.size = Pt(12)
        pa.font.bold = True
        pa.font.color.rgb = COLOR_PRIMARY_NAVY
        pa.space_before = Pt(14)
        
        pad = tf2.add_paragraph()
        pad.text = adesc
        pad.font.name = FONT_CN
        pad.font.size = Pt(9.5)
        pad.font.color.rgb = COLOR_MUTED_TEXT
        pad.space_before = Pt(3)
    return slide

def build_chapter_divider(prs, num_str, title_str, sub_str, badge_str):
    """P07, P12, P18, P55: 章节过渡页 (Layout 5: 只有標題 黑)"""
    slide = prs.slides.add_slide(prs.slide_layouts[5])
    tb = slide.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.33), Inches(3.2))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = f"CHAPTER {badge_str}"
    p0.font.name = FONT_EN
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = COLOR_GOLD
    
    p1 = tf.add_paragraph()
    p1.text = f"{num_str} · {title_str}"
    p1.font.name = FONT_CN
    p1.font.size = Pt(30)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_WHITE
    p1.space_before = Pt(8)
    
    p2 = tf.add_paragraph()
    p2.text = sub_str
    p2.font.name = FONT_CN
    p2.font.size = Pt(14)
    p2.font.color.rgb = COLOR_ACCENT_BLUE
    p2.space_before = Pt(12)
    return slide

def build_p08_workplan(prs, data):
    """P08: 1.1 工作方案 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "第一章 · 1.1 工作方案", "四阶段稳步推进 · 明确任务节点与成果交付")
    
    stages = [
        {
            "num": "阶段一",
            "time": "1 ~ 2 月",
            "title": "启动与规划",
            "goal": "确立技术范围与方法坐标",
            "tasks": "• 梳理全球金融科技前沿态势\n• 构建信息来源与工具体系\n• 确立六维打分机制与分层标准\n• 输出顶层推进方案与长名单台账",
            "deliverable": "《工作推进方案》《信息来源报告》"
        },
        {
            "num": "阶段二",
            "time": "3 ~ 5 月",
            "title": "深度研判与对标",
            "goal": "多维论证与台账建档",
            "tasks": "• 专家访谈与行内业务需求对齐\n• 展开同业实践与领先厂商调研\n• 逐项填报36项技术30项台账字段\n• 编制首批重点技术专题报告",
            "deliverable": "《前沿技术分层台账》《调研纪要》"
        },
        {
            "num": "阶段三",
            "time": "6 ~ 8 月",
            "title": "成果集成与论证",
            "goal": "全景图谱绘制与体系集成",
            "tasks": "• 绘制技术成熟度曲线(Hype Cycle)\n• 构建五大维度技术影响力雷达\n• 梳理企架十大中心落位图谱\n• 形成全书全景报告与电子书原型",
            "deliverable": "《全景图谱库》《成果集征求意见稿》"
        },
        {
            "num": "阶段四",
            "time": "9 ~ 12 月",
            "title": "推广落地与转化",
            "goal": "战略落地与闭环演进",
            "tasks": "• 面向全行开展成果巡讲与宣贯\n• 推进布局层与论证层重大立项\n• 建立前沿技术动态滚动复评机制\n• 形成金融科技前瞻布局持久动力",
            "deliverable": "《技术落地建议》《年度跟踪报告》"
        }
    ]
    
    card_w = Inches(2.95)
    card_h = Inches(5.4)
    start_left = Inches(0.5)
    gap = Inches(0.2)
    
    for idx, stg in enumerate(stages):
        cur_left = start_left + idx * (card_w + gap)
        card = add_card(slide, cur_left, Inches(1.3), card_w, card_h, bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE if idx < 2 else COLOR_NAVY_BLUE, border_width=Pt(1.5))
        
        # Header box inside card
        hdr = add_badge(slide, cur_left + Inches(0.15), Inches(1.45), card_w - Inches(0.3), Inches(0.55), f"{stg['num']} · {stg['time']}", bg_color=COLOR_PRIMARY_NAVY, text_color=COLOR_WHITE, font_size=Pt(11))
        
        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.18)
        tf.margin_right = Inches(0.18)
        tf.margin_top = Inches(0.85)
        
        p = tf.paragraphs[0]
        p.text = stg['title']
        p.font.name = FONT_CN
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY_NAVY
        
        pg = tf.add_paragraph()
        pg.text = f"🎯 核心目标：{stg['goal']}"
        pg.font.name = FONT_CN
        pg.font.size = Pt(9.5)
        pg.font.bold = True
        pg.font.color.rgb = COLOR_ROYAL_BLUE
        pg.space_before = Pt(6)
        
        pt = tf.add_paragraph()
        pt.text = "📋 关键任务："
        pt.font.name = FONT_CN
        pt.font.size = Pt(9.5)
        pt.font.bold = True
        pt.font.color.rgb = COLOR_DARK_TEXT
        pt.space_before = Pt(8)
        
        format_bullet_text(tf, stg['tasks'], font_size=Pt(8.5))
        
        pd = tf.add_paragraph()
        pd.text = f"📦 阶段成果：\n{stg['deliverable']}"
        pd.font.name = FONT_CN
        pd.font.size = Pt(8.5)
        pd.font.bold = True
        pd.font.color.rgb = COLOR_GREEN
        pd.space_before = Pt(8)
    return slide

def build_p09_sources(prs, data):
    """P09: 1.2 信息来源评估 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "第一章 · 1.2 信息来源评估", "6大信息源层级 · 21个全球情报渠道全景评估")
    
    tiers = [
        {"tier": "T1", "name": "国际权威咨询机构", "score": "9.5分", "freq": "季度/年度", "examples": "Gartner、IDC、Forrester、麦肯锡、波士顿咨询", "role": "宏观趋势研判、技术成熟度定位、全球市场规模与竞资格局对标"},
        {"tier": "T2", "name": "学术顶级期刊与预印本", "score": "9.2分", "freq": "月度/持续", "examples": "IEEE、ACM、Nature、Science、arXiv计算机科学库", "role": "硬科技底层突破机理跟踪、算法原型验证、数学原理可解释性探索"},
        {"tier": "T3", "name": "领先开源社区与标准化组织", "score": "9.0分", "freq": "周度/实时", "examples": "Linux基金会、CNCF、W3C、OpenAI、GitHub Trending", "role": "工程化生态成熟度、开发者活跃度、协议标准化（如MCP/OTel）"},
        {"tier": "T4", "name": "监管机构与行业智库联盟", "score": "9.8分", "freq": "动态/即时", "examples": "金融监管总局、中国信通院、央行清算中心、金标委", "role": "金融合规红线与准入规范、行业指导意见对齐、信创与安全标准遵循"},
        {"tier": "T5", "name": "全球顶尖科技领军厂商", "score": "8.8分", "freq": "月度发布", "examples": "微软、谷歌、AWS、阿里、腾讯、华为、百度", "role": "商业化产品落地方案、生产级架构参考、企业级POC与规模化实践"},
        {"tier": "T6", "name": "知识产权与创投大数据", "score": "8.5分", "freq": "月度监控", "examples": "全球专利数据库(IncoPat)、CB Insights、PitchBook", "role": "技术代际布局盲点发现、核心发明专利壁垒、初创企业技术路线预警"}
    ]
    
    card_w = Inches(3.95)
    card_h = Inches(2.65)
    lefts = [Inches(0.5), Inches(4.7), Inches(8.9)]
    tops = [Inches(1.3), Inches(4.15)]
    
    for idx, t in enumerate(tiers):
        c_left = lefts[idx % 3]
        c_top = tops[idx // 3]
        card = add_card(slide, c_left, c_top, card_w, card_h, bg_color=COLOR_WHITE, border_color=COLOR_BORDER)
        
        # Top title row
        add_badge(slide, c_left + Inches(0.15), c_top + Inches(0.15), Inches(0.6), Inches(0.3), t['tier'], bg_color=COLOR_PRIMARY_NAVY, text_color=COLOR_WHITE, font_size=Pt(10))
        
        tb = slide.shapes.add_textbox(c_left + Inches(0.85), c_top + Inches(0.12), card_w - Inches(1.0), Inches(0.35))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.text = t['name']
        p.font.name = FONT_CN
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY_NAVY
        
        # Content box
        tbc = slide.shapes.add_textbox(c_left + Inches(0.15), c_top + Inches(0.55), card_w - Inches(0.3), card_h - Inches(0.65))
        tfc = tbc.text_frame
        tfc.word_wrap = True
        
        p = tfc.paragraphs[0]
        p.text = f"⭐ 权威度评分：{t['score']}  |  ⏱️ 采集频度：{t['freq']}"
        p.font.name = FONT_CN
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = COLOR_ROYAL_BLUE
        
        p2 = tfc.add_paragraph()
        p2.text = f"🔍 代表渠道：{t['examples']}"
        p2.font.name = FONT_CN
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = COLOR_DARK_TEXT
        p2.space_before = Pt(4)
        
        p3 = tfc.add_paragraph()
        p3.text = f"💡 研判赋能价值：{t['role']}"
        p3.font.name = FONT_CN
        p3.font.size = Pt(8.5)
        p3.font.color.rgb = COLOR_MUTED_TEXT
        p3.space_before = Pt(4)
    return slide

def build_p10_methodology_appl(prs, data):
    """P10: 1.3 研判工具应用 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "第一章 · 1.3 研判工具应用", "覆盖研判全生命周期 8 大维度 25 项方法论工具矩阵")
    
    dims = [
        ("01. 行业标尺定位", "Hype Cycle成熟度曲线、NASA TRL九级量化、TOGAF ADM架构准入"),
        ("02. 硬科技量化刻度", "多源数据交叉校准、专利技术生命周期S曲线、学术发表热度指数"),
        ("03. 业务任务拆解", "APQC跨行业流程分类、JTBD待办任务模型、麦肯锡三层面理论"),
        ("04. 优先级矩阵", "价值贡献-实现难度矩阵、技术雷达(ThoughtWorks)、创新投资组合"),
        ("05. 失效模式分析", "FMEA失效模式与影响分析、金融级红蓝对抗演练、合规压力测试"),
        ("06. 厂商与市场测评", "IDC MarketScape厂商矩阵、波特五力竞争模型、TAM/SAM/SOM市场空间"),
        ("07. 专家共识收敛", "德尔菲法(Delphi)、双向交叉校准法、同行评议与治理共识委员会"),
        ("08. 路线图规划与推进", "3G技术发展路线图、波士顿矩阵(BCG)、敏捷看板与动态滚动淘汰")
    ]
    
    card_w = Inches(2.95)
    card_h = Inches(2.65)
    lefts = [Inches(0.5), Inches(3.6), Inches(6.7), Inches(9.8)]
    tops = [Inches(1.3), Inches(4.15)]
    
    for idx, (title, content) in enumerate(dims):
        c_left = lefts[idx % 4]
        c_top = tops[idx // 4]
        card = add_card(slide, c_left, c_top, card_w, card_h, bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE, border_width=Pt(1))
        
        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.18)
        tf.margin_right = Inches(0.18)
        tf.margin_top = Inches(0.18)
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = FONT_CN
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY_NAVY
        
        pd = tf.add_paragraph()
        pd.text = "包含方法论工具："
        pd.font.name = FONT_CN
        pd.font.size = Pt(9)
        pd.font.bold = True
        pd.font.color.rgb = COLOR_BRIGHT_BLUE
        pd.space_before = Pt(6)
        
        tools = [t.strip() for t in content.split('、')]
        for tool in tools:
            pt = tf.add_paragraph()
            pt.text = f"• {tool}"
            pt.font.name = FONT_CN
            pt.font.size = Pt(8.5)
            pt.font.color.rgb = COLOR_DARK_TEXT
            pt.space_before = Pt(2)
    return slide

def build_p11_methodology_mechanism(prs, data):
    """P11: 1.4 研判方法与分层机制 (Layout 2: 两栏)"""
    slide = prs.slides.add_slide(prs.slide_layouts[2])
    set_title(slide, "第一章 · 1.4 研判方法与分层机制", "六大评级维度定义与布局/论证/研究/观察四级流转机制")
    
    # Left Card: 六大评级维度
    card_l = add_card(slide, Inches(0.5), Inches(1.3), Inches(6.0), Inches(5.5), bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE, border_width=Pt(1.5))
    tf_l = card_l.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = Inches(0.25)
    tf_l.margin_top = Inches(0.25)
    
    p = tf_l.paragraphs[0]
    p.text = "🕸️ 六大评级维度定义与量化标尺 (1-5分制)"
    p.font.name = FONT_CN
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    six_dims = [
        ("技术成熟度 (Maturity)", "评估底层技术原理健全性与工程落地可靠性。1分萌芽、2分触发、3分攻坚、4分投产、5分成熟。"),
        ("战略匹配度 (Strategic Fit)", "衡量与我行'数智化转型'、'五篇大文章'及企架规划方向契合度。高分代表重点战略抓手。"),
        ("价值贡献度 (Value)", "评估对降本增效、风险防控、用户体验提升与业务模式创新的潜在贡献天花板。"),
        ("引入可行度 (Feasibility)", "综合考察行内架构兼容性、信创适配度、人才技能储备与工程实施复杂度。"),
        ("战略紧迫度 (Urgency)", "结合监管政策指引、同业竞相发力态势与市场竞争窗口期倒逼压力打分。"),
        ("生态开放度 (Openness)", "评估开源社区活跃度、行业标准规范化程度、跨平台兼容性及厂商绑定锁死风险。")
    ]
    for d_title, d_desc in six_dims:
        pd = tf_l.add_paragraph()
        pd.text = f"■ {d_title}"
        pd.font.name = FONT_CN
        pd.font.size = Pt(10)
        pd.font.bold = True
        pd.font.color.rgb = COLOR_ROYAL_BLUE
        pd.space_before = Pt(6)
        
        pdd = tf_l.add_paragraph()
        pdd.text = d_desc
        pdd.font.name = FONT_CN
        pdd.font.size = Pt(8.5)
        pdd.font.color.rgb = COLOR_DARK_TEXT
        pdd.space_before = Pt(1)

    # Right Card: 四级处置机制
    card_r = add_card(slide, Inches(6.8), Inches(1.3), Inches(6.0), Inches(5.5), bg_color=COLOR_WHITE, border_color=COLOR_PRIMARY_NAVY, border_width=Pt(1.5))
    tf_r = card_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = Inches(0.25)
    tf_r.margin_top = Inches(0.25)
    
    p = tf_r.paragraphs[0]
    p.text = "🎯 四级梯队处置策略与动态流转机制"
    p.font.name = FONT_CN
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    tiers_info = [
        ("布局层 (Advance Layout)", "战略匹配度与价值贡献度双高，但成熟度或可行度处于爬坡期。策略：资源前置、治理先行、先立标准、窄场景试点回滚，抢占战略制高点。"),
        ("论证层 (Systematic Feasibility)", "技术成熟度与可行性较高，同业有生产案例。策略：启动行内工程化POC、联合业务部门出台专项可行性报告，纳入近期重点投产排期。"),
        ("研究层 (Deep Research)", "具有颠覆性潜力但尚处实验室或早期阶段。策略：联合高校智库设立攻关课题、跟踪标准演进，适时开展小规模沙箱实验。"),
        ("观察层 (Dynamic Observation)", "成熟度较低、路径分歧大或强依赖外部底座。策略：保持战略耐心、持续动态监测，防范颠覆性技术突变与外部技术封锁风险。")
    ]
    for t_name, t_desc in tiers_info:
        pt = tf_r.add_paragraph()
        pt.text = f"▶ {t_name}"
        pt.font.name = FONT_CN
        pt.font.size = Pt(10)
        pt.font.bold = True
        pt.font.color.rgb = COLOR_PRIMARY_NAVY
        pt.space_before = Pt(8)
        
        ptd = tf_r.add_paragraph()
        ptd.text = t_desc
        ptd.font.name = FONT_CN
        ptd.font.size = Pt(8.5)
        ptd.font.color.rgb = COLOR_DARK_TEXT
        ptd.space_before = Pt(1)
        
    p_dyn = tf_r.add_paragraph()
    p_dyn.text = "🔄 动态调整：每半年依托六维台账重新评分，触发升阶（如观察→研究→论证）或降级淘汰。"
    p_dyn.font.name = FONT_CN
    p_dyn.font.size = Pt(8.5)
    p_dyn.font.bold = True
    p_dyn.font.color.rgb = COLOR_ACCENT_RED
    p_dyn.space_before = Pt(10)
    return slide

def build_p13_research_overview(prs, data):
    """P13: 2.1 整体成果概述 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "第二章 · 2.1 整体研究成果概述", "前沿技术全景画像 · 四级梯队分布 · 核心研判指标数据")
    
    kpis = [
        ("1 套", "工作方法体系", "形成闭环式前沿技术研判推进全流程"),
        ("21 个", "信息渠道评估", "覆盖全球权威智库、期刊、社区与监管"),
        ("25 项", "方法论工具", "贯穿认知建立、深入分析到方案输出"),
        ("100 +份", "知识库报告归集", "建立持续动态更新的金融前沿情报中心"),
        ("36 项", "重点前沿技术", "每项技术维护超30个维度详实研判信息"),
        ("3 项", "体系化全景图谱", "成熟度曲线、影响力雷达与企架十大中心"),
        ("3 套", "深度研判资产", "全套评估表、一页纸图概览与深度报告"),
        ("1 套", "成果电子书系统", "纯原生零依赖、开箱即用离线交互系统"),
        ("15 万+字", "全案研究成果", "累计沉淀高质量金融科技前沿专题洞察")
    ]
    
    card_w = Inches(3.95)
    card_h = Inches(1.5)
    lefts = [Inches(0.5), Inches(4.7), Inches(8.9)]
    tops = [Inches(1.3), Inches(2.95), Inches(4.6)]
    
    for idx, (val, title, desc) in enumerate(kpis):
        c_left = lefts[idx % 3]
        c_top = tops[idx // 3]
        card = add_card(slide, c_left, c_top, card_w, card_h, bg_color=COLOR_WHITE, border_color=COLOR_BORDER)
        
        tb = slide.shapes.add_textbox(c_left + Inches(0.15), c_top + Inches(0.1), card_w - Inches(0.3), card_h - Inches(0.2))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = val
        p.font.name = FONT_EN
        p.font.size = Pt(22)
        p.font.bold = True
        p.font.color.rgb = COLOR_ROYAL_BLUE
        
        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.name = FONT_CN
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_PRIMARY_NAVY
        p2.space_before = Pt(2)
        
        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_CN
        p3.font.size = Pt(8.5)
        p3.font.color.rgb = COLOR_MUTED_TEXT
        p3.space_before = Pt(2)
        
    # Bottom insight summary
    bot_card = add_card(slide, Inches(0.5), Inches(6.25), Inches(12.35), Inches(0.85), bg_color=COLOR_LIGHT_BG, border_color=COLOR_NAVY_BLUE)
    tf_b = bot_card.text_frame
    tf_b.word_wrap = True
    tf_b.margin_left = Inches(0.2)
    tf_b.margin_top = Inches(0.12)
    p = tf_b.paragraphs[0]
    p.text = "💡 核心战略研判洞察："
    p.font.name = FONT_CN
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    p2 = tf_b.add_paragraph()
    p2.text = "全行 36 项技术呈现梯队分布：布局层 8 项（重点AI与数据编排）、论证层 7 项（加速工程落地）、研究层 14 项（深度储备）、观察层 7 项（前沿跟踪）。"
    p2.font.name = FONT_CN
    p2.font.size = Pt(9)
    p2.font.color.rgb = COLOR_DARK_TEXT
    p2.space_before = Pt(2)
    return slide

def build_p14_library_table(prs, data):
    """P14: 2.2 前沿技术储备库长名单 (Layout 3: 只有標題) - NATIVE EDITABLE TABLE"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "第二章 · 2.2 前沿技术储备库（长名单）", "36项重点前沿技术全景台账 · 30个关键字段综合研判 (原生可编辑表格)")
    
    rows = len(data['technologies']) + 1  # 37 rows
    cols = 11
    
    table_shape = slide.shapes.add_table(rows, cols, Inches(0.4), Inches(1.2), Inches(12.53), Inches(5.6))
    table = table_shape.table
    
    col_widths = [
        Inches(0.55),  # 编号
        Inches(2.1),   # 技术名称
        Inches(1.0),   # 领域
        Inches(0.8),   # 层级
        Inches(0.6),   # 成熟
        Inches(0.6),   # 匹配
        Inches(0.6),   # 贡献
        Inches(0.6),   # 可行
        Inches(0.6),   # 紧迫
        Inches(0.6),   # 开放
        Inches(4.48)   # 核心处置结论
    ]
    for i, w in enumerate(col_widths):
        table.columns[i].width = w
        
    headers = ["编号", "技术名称", "所属领域", "层级", "成熟", "匹配", "贡献", "可行", "紧迫", "开放", "核心处置建议与研判结论摘要"]
    for i, h in enumerate(headers):
        cell = table.cell(0, i)
        cell.fill.solid()
        cell.fill.fore_color.rgb = COLOR_PRIMARY_NAVY
        tf = cell.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.04)
        tf.margin_right = Inches(0.04)
        tf.margin_top = Inches(0.02)
        tf.margin_bottom = Inches(0.02)
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER if i != 1 and i != 10 else PP_ALIGN.LEFT
        p.text = h
        p.font.name = FONT_CN
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = COLOR_WHITE
        
    for r_idx, tech in enumerate(data['technologies']):
        row_num = r_idx + 1
        bg = COLOR_WHITE if r_idx % 2 == 0 else COLOR_CARD_BG
        
        row_data = [
            tech['id'],
            tech['name'],
            tech.get('category', ''),
            tech.get('tier', ''),
            f"{tech.get('maturity', '')}分",
            f"{tech.get('strategicFit', '')}分",
            f"{tech.get('value', '')}分",
            f"{tech.get('feasibility', '')}分",
            f"{tech.get('urgency', '')}分",
            f"{tech.get('openness', '')}分",
            tech.get('conclusion', '')[:75] + '...' if len(tech.get('conclusion', '')) > 75 else tech.get('conclusion', '')
        ]
        
        for c_idx, val in enumerate(row_data):
            cell = table.cell(row_num, c_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = bg
            tf = cell.text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.04)
            tf.margin_right = Inches(0.04)
            tf.margin_top = Inches(0.01)
            tf.margin_bottom = Inches(0.01)
            p = tf.paragraphs[0]
            p.alignment = PP_ALIGN.CENTER if c_idx not in (1, 10) else PP_ALIGN.LEFT
            p.text = str(val)
            p.font.name = FONT_CN
            p.font.size = Pt(7.0)
            
            if c_idx == 3:  # Tier coloring
                t_color = TIER_COLORS.get(val, COLOR_DARK_TEXT)
                p.font.color.rgb = t_color
                p.font.bold = True
            elif c_idx == 0:
                p.font.bold = True
                p.font.color.rgb = COLOR_PRIMARY_NAVY
            elif c_idx == 1:
                p.font.bold = True
                p.font.color.rgb = COLOR_DARK_TEXT
            else:
                p.font.color.rgb = COLOR_DARK_TEXT
    return slide

def build_p15_hype_cycle(prs, data):
    """P15: 2.3 技术成熟度曲线 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "第二章 · 2.3 技术成熟度曲线（Gartner Hype Cycle）", "36项前沿技术全景成熟度研判 · 5大演进生命周期阶段分布")
    
    # Left / Main: High-res Hype Cycle graphic
    chart_img = os.path.join(CHART_DIR, "hype_cycle.png")
    if os.path.exists(chart_img):
        slide.shapes.add_picture(chart_img, Inches(0.5), Inches(1.25), Inches(7.8), Inches(4.3))
    
    # Right: Phase Breakdown Cards
    phases = [
        ("1. 创新萌芽期 (10项)", "自主型AI智能体、SLM端侧AI、因果AI、神经形态计算等。技术触发、探索性验证。"),
        ("2. 期望膨胀期 (5项)", "AI原生架构、合成数据、业务编排BOAT等。市场热度高涨，探索规模化突破。"),
        ("3. 幻灭低谷期 (9项)", "WASM、数据织网、数据网格等。遭遇工程复杂性挑战，进入务实攻坚阶段。"),
        ("4. 复苏爬升期 (8项)", "事件驱动EDA、零信任、向量DB/RAG等。架构方法论趋于成熟，领先行规模化落地。"),
        ("5. 生产成熟期 (4项)", "算力网络、平台工程IDP、可观测性等。进入规模化稳定生产收益期。")
    ]
    
    c_w = Inches(4.3)
    c_h = Inches(0.95)
    start_top = Inches(1.25)
    
    for idx, (p_title, p_desc) in enumerate(phases):
        card = add_card(slide, Inches(8.5), start_top + idx * Inches(1.05), c_w, c_h, bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE if idx in (0, 3) else COLOR_BORDER)
        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.15)
        tf.margin_top = Inches(0.08)
        
        p = tf.paragraphs[0]
        p.text = p_title
        p.font.name = FONT_CN
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY_NAVY
        
        pd = tf.add_paragraph()
        pd.text = p_desc
        pd.font.name = FONT_CN
        pd.font.size = Pt(8.0)
        pd.font.color.rgb = COLOR_DARK_TEXT
        pd.space_before = Pt(2)
        
    # Bottom methodology note
    note = add_card(slide, Inches(0.5), Inches(5.65), Inches(12.3), Inches(1.15), bg_color=COLOR_LIGHT_BG, border_color=COLOR_NAVY_BLUE)
    tf_n = note.text_frame
    tf_n.word_wrap = True
    tf_n.margin_left = Inches(0.2)
    tf_n.margin_top = Inches(0.1)
    
    p = tf_n.paragraphs[0]
    p.text = "📌 成熟度与处置策略对齐机制："
    p.font.name = FONT_CN
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    p2 = tf_n.add_paragraph()
    p2.text = "曲线横轴严格对应我行36项技术的'技术成熟度'评分（1分萌芽、2分触发、3分攻坚、4分投产、5分成熟）。处于萌芽期与膨胀期但价值高者进入【布局层】（治理先行）；处于低谷与爬升期者进入【论证层】（攻关落地）；成熟期技术沉淀为行内标准化底座能力。"
    p2.font.name = FONT_CN
    p2.font.size = Pt(8.5)
    p2.font.color.rgb = COLOR_DARK_TEXT
    p2.space_before = Pt(2)
    return slide

def build_p16_impact_radar(prs, data):
    """P16: 2.4 技术影响力雷达图 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "第二章 · 2.4 技术影响力雷达图（Impact Radar）", "5大架构维度 · 4大影响圈层 · 价值贡献度综合推导")
    
    # Left: Radar Graphic
    chart_img = os.path.join(CHART_DIR, "impact_radar.png")
    if os.path.exists(chart_img):
        slide.shapes.add_picture(chart_img, Inches(0.5), Inches(1.25), Inches(5.6), Inches(5.5))
        
    # Right: Ring & Dimension explanation
    rings = [
        ("圈层一：当前 (Now, 0-1年实质影响)", "重点攻坚与投产：自主型智能体试点、EDA事件驱动、平台工程、零信任架构落地。"),
        ("圈层二：近期 (Near-term, 1-3年影响)", "系统论证与架构对齐：AI原生应用、数据织网、后量子密码PQC、模型工程LLMOps。"),
        ("圈层三：中期 (Mid-term, 3-6年影响)", "前瞻储备与深度研究：全同态加密FHE、可组合核心系统、客户数字孪生DToC。"),
        ("圈层四：远期 (Long-term, 6-8年影响)", "前沿探索与学术观察：通用量子计算、神经形态与光子计算、神经符号AI。")
    ]
    
    c_w = Inches(6.5)
    c_h = Inches(1.0)
    start_top = Inches(1.25)
    
    for idx, (r_title, r_desc) in enumerate(rings):
        card = add_card(slide, Inches(6.35), start_top + idx * Inches(1.1), c_w, c_h, bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE if idx < 2 else COLOR_BORDER)
        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.2)
        tf.margin_top = Inches(0.1)
        
        p = tf.paragraphs[0]
        p.text = r_title
        p.font.name = FONT_CN
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY_NAVY
        
        pd = tf.add_paragraph()
        pd.text = r_desc
        pd.font.name = FONT_CN
        pd.font.size = Pt(8.5)
        pd.font.color.rgb = COLOR_DARK_TEXT
        pd.space_before = Pt(2)
        
    # Architecture Dimensions Summary Box
    dim_box = add_card(slide, Inches(6.35), Inches(5.75), c_w, Inches(1.0), bg_color=COLOR_LIGHT_BG, border_color=COLOR_NAVY_BLUE)
    tf_d = dim_box.text_frame
    tf_d.word_wrap = True
    tf_d.margin_left = Inches(0.2)
    tf_d.margin_top = Inches(0.08)
    
    p = tf_d.paragraphs[0]
    p.text = "🌐 5 大架构维度分布统计："
    p.font.name = FONT_CN
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    p2 = tf_d.add_paragraph()
    p2.text = "• 业务维度 (5项) · 应用维度 (10项) · 数据维度 (6项) · 技术基础设施 (7项) · 安全维度 (8项)\n以圆周角度表征架构维度，气泡大小表征价值贡献度，颜色表征四级梯队。"
    p2.font.name = FONT_CN
    p2.font.size = Pt(8.0)
    p2.font.color.rgb = COLOR_DARK_TEXT
    p2.space_before = Pt(2)
    return slide

def build_p17_ten_centers(prs, data):
    """P17: 2.5 企架十大中心落位图谱 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "第二章 · 2.5 企架十大中心落位图谱", "企架建设十大中心 · 36项前沿技术精准落位与驱动链路")
    
    # Top/Left: Blueprint Graphic
    chart_img = os.path.join(CHART_DIR, "ten_centers_blueprint.png")
    if os.path.exists(chart_img):
        slide.shapes.add_picture(chart_img, Inches(0.5), Inches(1.25), Inches(7.5), Inches(5.5))
        
    # Right: 10 Centers Statistics & Driving Link
    card_r = add_card(slide, Inches(8.2), Inches(1.25), Inches(4.6), Inches(5.5), bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE, border_width=Pt(1.5))
    tf_r = card_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = Inches(0.2)
    tf_r.margin_top = Inches(0.2)
    
    p = tf_r.paragraphs[0]
    p.text = "🏛️ 企架十大中心前沿技术落位明细"
    p.font.name = FONT_CN
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    centers = [
        ("1. 对客服务中心 (4项)", "T01 自主智能体、T22 去中心身份、T28 数字人等"),
        ("2. 智慧运营中心 (2项)", "T19 因果AI、T31 业务编排BOAT流程自动化"),
        ("3. 客户经营中心 (2项)", "T32 客户数字孪生DToC、T33 决策智能DIP"),
        ("4. 产品合约中心 (1项)", "T13 区块链资产代币化与智能合约"),
        ("5. 业务处理中心 (2项)", "T03 事件驱动EDA、T35 可组合核心银行系统"),
        ("6. 风险管理中心 (5项)", "T16 AI安全平台、T21 反AI深度伪造、T30 监管科技"),
        ("7. 账务交易中心 (2项)", "T07 后量子密码PQC、T25 量子保密通信QKD"),
        ("8. 管理支持中心 (2项)", "T17 小语言模型SLM、T20 软件供应链安全SBOM"),
        ("9. 数智能力中心 (6项)", "T05 数据织网、T06 数据网格、T14 向量DB、T18 合成数据"),
        ("10. 技术服务中心 (10项)", "T02 AI原生架构、T04 WASM、T10 算力网络、T36 LLMOps")
    ]
    for c_name, c_tech in centers:
        pc = tf_r.add_paragraph()
        pc.text = f"■ {c_name}"
        pc.font.name = FONT_CN
        pc.font.size = Pt(8.5)
        pc.font.bold = True
        pc.font.color.rgb = COLOR_ROYAL_BLUE
        pc.space_before = Pt(3)
        
        pt = tf_r.add_paragraph()
        pt.text = c_tech
        pt.font.name = FONT_CN
        pt.font.size = Pt(7.5)
        pt.font.color.rgb = COLOR_DARK_TEXT
        pt.space_before = Pt(1)
    return slide

def build_p19_to_p54_tech_slides(prs, data):
    """P19 ~ P54: 36 项前沿技术独立专题卡片 (Layout 3: 只有標題)"""
    for tech in data['technologies']:
        slide = prs.slides.add_slide(prs.slide_layouts[3])
        t_id = tech['id']
        t_name = tech['name']
        t_en = tech.get('nameEn', '')
        t_cat = tech.get('category', '前沿科技')
        t_tier = tech.get('tier', '研究层')
        t_disposal = tech.get('disposal', '持续跟踪')
        t_dim = tech.get('archDim', '技术')
        
        # 1. Custom Title Bar with Badges
        # Clear title placeholder text
        for ph in slide.placeholders:
            if ph.placeholder_format.idx == 0:
                ph.text_frame.text = ""
                break
                
        # Main Title Row
        tb_title = slide.shapes.add_textbox(Inches(0.4), Inches(0.22), Inches(12.5), Inches(0.85))
        tf_t = tb_title.text_frame
        tf_t.word_wrap = True
        
        p = tf_t.paragraphs[0]
        # ID Badge
        r0 = p.add_run()
        r0.text = f"[{t_id}] "
        r0.font.name = FONT_EN
        r0.font.size = Pt(22)
        r0.font.bold = True
        r0.font.color.rgb = COLOR_PRIMARY_NAVY
        
        # Name
        r1 = p.add_run()
        r1.text = t_name
        r1.font.name = FONT_CN
        r1.font.size = Pt(22)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_PRIMARY_NAVY
        
        if t_en:
            r2 = p.add_run()
            r2.text = f"  ({t_en})"
            r2.font.name = FONT_EN
            r2.font.size = Pt(13)
            r2.font.color.rgb = COLOR_MUTED_TEXT
            
        p_sub = tf_t.add_paragraph()
        p_sub.text = f"所属领域: {t_cat}   |   处置梯队: 【{t_tier}】   |   核心建议: {t_disposal}   |   架构维度: {t_dim}"
        p_sub.font.name = FONT_CN
        p_sub.font.size = Pt(9.5)
        p_sub.font.color.rgb = COLOR_ROYAL_BLUE
        p_sub.font.bold = True
        p_sub.space_before = Pt(3)

        # 2. Left Column: Radar + Six-dimension Scores + Conclusion
        # Left Top Card: Radar Box
        card_radar = add_card(slide, Inches(0.4), Inches(1.15), Inches(4.1), Inches(2.85), bg_color=COLOR_WHITE, border_color=COLOR_BORDER)
        tf_rb = card_radar.text_frame
        p = tf_rb.paragraphs[0]
        p.text = "🕸️ 六维研判蜘蛛图"
        p.font.name = FONT_CN
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY_NAVY
        
        radar_img = os.path.join(CHART_DIR, f"radar_{t_id}.png")
        if os.path.exists(radar_img):
            slide.shapes.add_picture(radar_img, Inches(0.5), Inches(1.5), Inches(2.2), Inches(2.2))
            
        # Scores text on right of radar
        tb_scores = slide.shapes.add_textbox(Inches(2.75), Inches(1.5), Inches(1.7), Inches(2.2))
        tf_s = tb_scores.text_frame
        tf_s.word_wrap = True
        
        scores_data = [
            ("成熟度", tech.get('maturity', 3)),
            ("匹配度", tech.get('strategicFit', 3)),
            ("贡献度", tech.get('value', 3)),
            ("可行度", tech.get('feasibility', 3)),
            ("紧迫度", tech.get('urgency', 3)),
            ("开放度", tech.get('openness', 3))
        ]
        for s_idx, (s_name, s_val) in enumerate(scores_data):
            p = tf_s.paragraphs[0] if s_idx == 0 else tf_s.add_paragraph()
            p.text = f"{s_name}：{'★' * s_val} {s_val}分"
            p.font.name = FONT_CN
            p.font.size = Pt(8.5)
            p.font.color.rgb = COLOR_ACCENT_RED if s_val >= 4 else COLOR_DARK_TEXT
            p.font.bold = (s_val >= 4)
            p.space_after = Pt(2)
            
        # Left Bottom Card: Conclusion Box
        card_concl = add_card(slide, Inches(0.4), Inches(4.1), Inches(4.1), Inches(2.95), bg_color=COLOR_LIGHT_RED, border_color=COLOR_ACCENT_RED, border_width=Pt(1.2))
        tf_c = card_concl.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = Inches(0.18)
        tf_c.margin_right = Inches(0.18)
        tf_c.margin_top = Inches(0.15)
        
        p = tf_c.paragraphs[0]
        p.text = f"⚖️ 研判结论与处置建议 (【{t_tier}】)"
        p.font.name = FONT_CN
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_ACCENT_RED
        
        p2 = tf_c.add_paragraph()
        p2.text = tech.get('conclusion', '暂无详细研判结论。')
        p2.font.name = FONT_CN
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = COLOR_DARK_TEXT
        p2.space_before = Pt(4)

        # 3. Right Area: Bento 6 Cards Grid (3 rows × 2 cols)
        bento_cards = [
            {"title": "🧭 演进背景与动因", "text": tech.get('background', '')},
            {"title": "💡 技术定义与机理", "text": tech.get('definition', '') or tech.get('summary', '')},
            {"title": "📍 产业现状与同业实践", "text": tech.get('currentStatus', '')},
            {"title": "🚀 颠覆性趋势演进", "text": tech.get('trend', '')},
            {"title": "🏦 对银行业务与架构的价值", "text": tech.get('bankValue', '')},
            {"title": "⚠️ 当前局限性与合规风险", "text": tech.get('limitation', '')}
        ]
        
        col1_left = Inches(4.65)
        col2_left = Inches(8.8)
        c_width = Inches(4.05)
        c_height = Inches(1.85)
        
        row_tops = [Inches(1.15), Inches(3.1), Inches(5.05)]
        
        for b_idx, bc in enumerate(bento_cards):
            col_l = col1_left if b_idx % 2 == 0 else col2_left
            row_t = row_tops[b_idx // 2]
            
            card = add_card(slide, col_l, row_t, c_width, c_height, bg_color=COLOR_WHITE, border_color=COLOR_BORDER)
            tf = card.text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.18)
            tf.margin_right = Inches(0.18)
            tf.margin_top = Inches(0.12)
            
            p = tf.paragraphs[0]
            p.text = bc['title']
            p.font.name = FONT_CN
            p.font.size = Pt(10)
            p.font.bold = True
            p.font.color.rgb = COLOR_PRIMARY_NAVY
            
            format_bullet_text(tf, bc['text'], font_size=Pt(8.0))

def build_p56_appendix_methodology(prs, data):
    """P56: 附录一 · 方法论体系 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "附录一 · 前沿技术研究方法论工具体系", "覆盖研判全生命周期 8 大维度 25 项方法论工具全景导航")
    
    layers = [
        {
            "title": "1. 认知建立层（定位与宏观扫描 · 8项工具）",
            "desc": "行业标尺定位、硬科技量化刻度、架构准入规范、宏观风险扫描、市场规模与竞争结构。",
            "chips": "01. Hype Cycle 曲线 · 02. NASA TRL 量化 · 03. TOGAF ADM 架构 · 08. PESTEL 宏观扫描 · 11. TAM/SAM/SOM 空间 · 12. 双向交叉验证 · 13. IDC MarketScape · 14. 波特五力模型"
        },
        {
            "title": "2. 深入分析层（多维严谨验证 · 11项工具）",
            "desc": "业务任务拆解、APQC流程对标、优先级矩阵、技术雷达、失效模式、厂商测评与组织落地。",
            "chips": "04. 4R架构评估 · 05. APQC跨行业分类 · 06. JTBD待办任务 · 07. 麦肯锡三层面 · 09. 价值-难度矩阵 · 10. ThoughtWorks雷达 · 15. FMEA失效模式 · 16. 红蓝对抗 · 17. 敏捷雷达 · 18. BCG矩阵 · 19. 康威定律组织"
        },
        {
            "title": "3. 方案输出层（收敛与执行闭环 · 6项工具）",
            "desc": "专家共识收敛、多源数据校准、变革路径设计、路线图规划、持续迭代与目标对齐闭环。",
            "chips": "20. 德尔菲法(Delphi) · 21. Kotter八步变革 · 22. 3G路线图 · 23. OKR目标对齐 · 24. 敏捷看板 · 25. 动态淘汰机制"
        }
    ]
    
    card_w = Inches(3.95)
    card_h = Inches(3.5)
    lefts = [Inches(0.5), Inches(4.7), Inches(8.9)]
    
    for idx, l in enumerate(layers):
        card = add_card(slide, lefts[idx], Inches(1.3), card_w, card_h, bg_color=COLOR_WHITE, border_color=COLOR_ROYAL_BLUE, border_width=Pt(1.2))
        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.2)
        tf.margin_right = Inches(0.2)
        tf.margin_top = Inches(0.2)
        
        p = tf.paragraphs[0]
        p.text = l['title']
        p.font.name = FONT_CN
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY_NAVY
        
        pd = tf.add_paragraph()
        pd.text = l['desc']
        pd.font.name = FONT_CN
        pd.font.size = Pt(8.5)
        pd.font.color.rgb = COLOR_MUTED_TEXT
        pd.space_before = Pt(4)
        
        pt = tf.add_paragraph()
        pt.text = "涵盖工具清单："
        pt.font.name = FONT_CN
        pt.font.size = Pt(9)
        pt.font.bold = True
        pt.font.color.rgb = COLOR_BRIGHT_BLUE
        pt.space_before = Pt(8)
        
        chips = l['chips'].split(' · ')
        for c in chips:
            pc = tf.add_paragraph()
            pc.text = f"• {c}"
            pc.font.name = FONT_CN
            pc.font.size = Pt(8.0)
            pc.font.color.rgb = COLOR_DARK_TEXT
            pc.space_before = Pt(1.5)
            
    # Bottom: 3 Tensions
    bot_card = add_card(slide, Inches(0.5), Inches(4.95), Inches(12.35), Inches(1.9), bg_color=COLOR_LIGHT_BG, border_color=COLOR_NAVY_BLUE)
    tf_b = bot_card.text_frame
    tf_b.word_wrap = True
    tf_b.margin_left = Inches(0.2)
    tf_b.margin_top = Inches(0.12)
    
    p = tf_b.paragraphs[0]
    p.text = "⚖️ 方法论选择的三大内在张力与平衡指南"
    p.font.name = FONT_CN
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    tensions = [
        ("定性判断 vs. 量化计算", "经验洞察与严谨工程打分互补，定性定框架、定量定刻度，防止纯定性主观偏差与纯定量机械化陷阱。"),
        ("权威性 vs. 时效性", "国际权威年度咨询报告（Gartner/IDC）与行内敏捷动态情报源双轨融合，既保持大局观又捕捉周度裂变。"),
        ("通用模型 vs. 金融特殊性", "通用科技分析框架（TOGAF/Hype Cycle）与银行强监管合规、高可用风控强约束结合，确保落地合规。")
    ]
    for t_t, t_d in tensions:
        pt = tf_b.add_paragraph()
        pt.text = f"■ {t_t}：{t_d}"
        pt.font.name = FONT_CN
        pt.font.size = Pt(8.5)
        pt.font.color.rgb = COLOR_DARK_TEXT
        pt.space_before = Pt(3)
    return slide

def build_p57_appendix_terms(prs, data):
    """P57: 附录二 · 术语表 (Layout 3: 只有標題)"""
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    set_title(slide, "附录二 · 术语表", "全书 72 项专业技术术语释义与索引（按 A–Z 字母序）")
    
    # Render two compact tables: Left 36 terms, Right 36 terms
    terms = data.get('terms', [])
    half = len(terms) // 2
    left_terms = terms[:half]
    right_terms = terms[half:]
    
    for t_idx, term_set in enumerate([left_terms, right_terms]):
        tbl_left = Inches(0.4) if t_idx == 0 else Inches(6.7)
        tbl_w = Inches(6.1)
        rows_cnt = len(term_set) + 1
        
        t_shape = slide.shapes.add_table(rows_cnt, 3, tbl_left, Inches(1.2), tbl_w, Inches(5.6))
        table = t_shape.table
        table.columns[0].width = Inches(1.3)
        table.columns[1].width = Inches(1.4)
        table.columns[2].width = Inches(3.4)
        
        headers = ["术语", "中文名称", "核心定义与金融相关性"]
        for ci, h in enumerate(headers):
            cell = table.cell(0, ci)
            cell.fill.solid()
            cell.fill.fore_color.rgb = COLOR_PRIMARY_NAVY
            tf = cell.text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.04)
            tf.margin_right = Inches(0.04)
            tf.margin_top = Inches(0.01)
            tf.margin_bottom = Inches(0.01)
            p = tf.paragraphs[0]
            p.text = h
            p.font.name = FONT_CN
            p.font.size = Pt(8.0)
            p.font.bold = True
            p.font.color.rgb = COLOR_WHITE
            
        for ri, tm in enumerate(term_set):
            r_num = ri + 1
            bg = COLOR_WHITE if ri % 2 == 0 else COLOR_CARD_BG
            vals = [
                tm.get('term', ''),
                tm.get('nameCn', ''),
                tm.get('def', '')[:45] + '...' if len(tm.get('def', '')) > 45 else tm.get('def', '')
            ]
            for ci, val in enumerate(vals):
                cell = table.cell(r_num, ci)
                cell.fill.solid()
                cell.fill.fore_color.rgb = bg
                tf = cell.text_frame
                tf.word_wrap = True
                tf.margin_left = Inches(0.04)
                tf.margin_right = Inches(0.04)
                tf.margin_top = Inches(0.01)
                tf.margin_bottom = Inches(0.01)
                p = tf.paragraphs[0]
                p.text = str(val)
                p.font.name = FONT_CN
                p.font.size = Pt(6.8)
                if ci == 0:
                    p.font.bold = True
                    p.font.color.rgb = COLOR_PRIMARY_NAVY
                else:
                    p.font.color.rgb = COLOR_DARK_TEXT
    return slide

def build_p58_closing(prs, data):
    """P58: 编委会 (Layout 8: 总结页)"""
    slide = prs.slides.add_slide(prs.slide_layouts[8])
    set_title(slide, "编委会", "科技发展部前沿技术研究成果集")
    
    card = add_card(slide, Inches(2.0), Inches(1.8), Inches(9.33), Inches(4.5), bg_color=COLOR_WHITE, border_color=COLOR_PRIMARY_NAVY, border_width=Pt(2))
    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)
    
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "科技发展部前沿技术研究成果集 · 编委会"
    p.font.name = FONT_CN
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY_NAVY
    
    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "编制机构：上海浦东发展银行股份有限公司 科技发展部 科技规划处"
    p2.font.name = FONT_CN
    p2.font.size = Pt(13)
    p2.font.color.rgb = COLOR_ROYAL_BLUE
    p2.font.bold = True
    p2.space_before = Pt(16)
    
    lines = [
        "项目总监 / 牵头主编：徐捷",
        "联合编委：科技发展部 前沿技术研判工作组",
        "版本说明：专利审查演示版 v1.33（金融科技前瞻研判专用）",
        "编制时间：2026年",
        "© 2026 上海浦东发展银行 科技发展部 保留所有权利"
    ]
    for line in lines:
        pl = tf.add_paragraph()
        pl.alignment = PP_ALIGN.CENTER
        pl.text = line
        pl.font.name = FONT_CN
        pl.font.size = Pt(11)
        pl.font.color.rgb = COLOR_DARK_TEXT
        pl.space_before = Pt(10)
    return slide

def build_p59_back_cover(prs, data):
    """P59: 封底 (Layout 10: 1_结束页)"""
    slide = prs.slides.add_slide(prs.slide_layouts[10])
    for ph in slide.placeholders:
        if ph.placeholder_format.idx == 12 or ph.placeholder_format.type == pptx.enum.shapes.PP_PLACEHOLDER.BODY:
            tf = ph.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = "看见变化 · 判断趋势 · 洞察影响 · 赢得主动"
            p.font.name = FONT_CN
            p.font.size = Pt(22)
            p.font.bold = True
            p.font.color.rgb = COLOR_WHITE
            
            p2 = tf.add_paragraph()
            p2.text = "科技发展部 科技规划处 编制 · 2026年"
            p2.font.name = FONT_CN
            p2.font.size = Pt(14)
            p2.font.color.rgb = COLOR_ACCENT_BLUE
            p2.space_before = Pt(10)
            return slide
            
    # Fallback textbox
    tb = slide.shapes.add_textbox(Inches(1.0), Inches(3.0), Inches(10.0), Inches(2.0))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "看见变化 · 判断趋势 · 洞察影响 · 赢得主动"
    p.font.name = FONT_CN
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE
    p2 = tf.add_paragraph()
    p2.text = "科技发展部 科技规划处 编制 · 2026年"
    p2.font.name = FONT_CN
    p2.font.size = Pt(14)
    p2.font.color.rgb = COLOR_ACCENT_BLUE
    p2.space_before = Pt(10)
    return slide

def build_p60_end_blank(prs):
    """P60: 衬底页 (Layout 4: 空白)"""
    slide = prs.slides.add_slide(prs.slide_layouts[4])
    return slide

# -------------------------------------------------------------
# Main Assembly Orchestrator
# -------------------------------------------------------------
def main():
    template_path = r"C:\Users\Administrator\Documents\Antigravity\Techbook\浦发银行PPT模板.pptx"
    out_pptx_path = r"C:\Users\Administrator\Documents\Antigravity\Techbook\前沿技术研究成果集-浦发银行可编辑演示文稿.pptx"
    data_path = os.path.abspath("scripts/techbook_data.json")

    print("Loading data from:", data_path)
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    print("Loading presentation template from:", template_path)
    prs = pptx.Presentation(template_path)
    initial_count = len(prs.slides)
    print(f"Template loaded with {initial_count} demo slides.")

    print("Building all 60 slides in exact sequence...")
    # P01
    print("Building P01: 扉页衬页...")
    build_p01_inside_cover(prs)
    # P02
    print("Building P02: 封面...")
    build_p02_cover(prs, data)
    # P03
    print("Building P03: 卷首标语...")
    build_p03_motto(prs)
    # P04
    print("Building P04: 序章...")
    build_p04_foreword(prs, data)
    # P05
    print("Building P05: 目录（上）...")
    build_p05_toc1(prs, data)
    # P06
    print("Building P06: 目录（下）...")
    build_p06_toc2(prs, data)
    # P07
    print("Building P07: 第一章 过渡页...")
    build_chapter_divider(prs, "第一章", "工作方案与方法", "顶层规划 · 情报源评估 · 研判工具与多维坐标", "01")
    # P08
    print("Building P08: 1.1 工作方案...")
    build_p08_workplan(prs, data)
    # P09
    print("Building P09: 1.2 信息来源评估...")
    build_p09_sources(prs, data)
    # P10
    print("Building P10: 1.3 研判工具应用...")
    build_p10_methodology_appl(prs, data)
    # P11
    print("Building P11: 1.4 研判方法与分层机制...")
    build_p11_methodology_mechanism(prs, data)
    # P12
    print("Building P12: 第二章 过渡页...")
    build_chapter_divider(prs, "第二章", "整体研究成果", "前沿技术全景 · 成熟度研判 · 影响力雷达 · 企架落位", "02")
    # P13
    print("Building P13: 2.1 整体研究成果概述...")
    build_p13_research_overview(prs, data)
    # P14
    print("Building P14: 2.2 前沿技术储备库长名单表格...")
    build_p14_library_table(prs, data)
    # P15
    print("Building P15: 2.3 技术成熟度曲线...")
    build_p15_hype_cycle(prs, data)
    # P16
    print("Building P16: 2.4 技术影响力雷达图...")
    build_p16_impact_radar(prs, data)
    # P17
    print("Building P17: 2.5 企架十大中心落位图谱...")
    build_p17_ten_centers(prs, data)
    # P18
    print("Building P18: 第三章 过渡页...")
    build_chapter_divider(prs, "第三章", "各项前沿技术研究", "六大维度全面解构 · 36项重点技术专题研判", "03")
    # P19 ~ P54
    print("Building P19 ~ P54: 36项前沿技术专题卡片...")
    build_p19_to_p54_tech_slides(prs, data)
    # P55
    print("Building P55: 附录 过渡页...")
    build_chapter_divider(prs, "附录", "方法论工具与术语表", "前沿技术研究方法论工具体系 · 术语表", "附")
    # P56
    print("Building P56: 附录一 · 方法论体系...")
    build_p56_appendix_methodology(prs, data)
    # P57
    print("Building P57: 附录二 · 术语表...")
    build_p57_appendix_terms(prs, data)
    # P58
    print("Building P58: 编委会...")
    build_p58_closing(prs, data)
    # P59
    print("Building P59: 封底...")
    build_p59_back_cover(prs, data)
    # P60
    print("Building P60: 衬底页...")
    build_p60_end_blank(prs)

    print("Removing initial demo slides...")
    for _ in range(initial_count):
        rId = prs.slides._sldIdLst[0].rId
        prs.part.drop_rel(rId)
        del prs.slides._sldIdLst[0]

    final_count = len(prs.slides)
    print(f"All slides generated. Total final slides: {final_count}")

    print(f"Saving presentation to: {out_pptx_path}...")
    saved_path = out_pptx_path
    try:
        prs.save(out_pptx_path)
    except PermissionError:
        alt_path = out_pptx_path.replace(".pptx", "(已更新).pptx")
        prs.save(alt_path)
        saved_path = alt_path
        print(f"原文件正被 PowerPoint 占用，已保存至新版本文件: {saved_path}")
    file_size_mb = os.path.getsize(saved_path) / (1024 * 1024)
    print(f"Successfully saved to {saved_path}! File size: {file_size_mb:.2f} MB")

if __name__ == "__main__":
    main()
