const PptxGenJS = require("pptxgenjs");
const pptx = new PptxGenJS();

// Color palette
const C = {
  orange: "FF6B35",
  white: "FFFFFF",
  yellow: "FFD23F",
  cyan: "06AED5",
  pink: "EE4266",
  dark: "1A1A2E",
  gray: "888888",
  lightGray: "F5F5F5",
  green: "2ECC71",
};

const makeShadow = () => ({ type: "outer", blur: 6, offset: 3, angle: 45, color: "000000", opacity: 0.25 });

pptx.layout = "LAYOUT_16x9";

// ─────────────────────────────────────────────────────
// SLIDE 1 — Title
// ─────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  // Dark gradient-like background with layered shapes
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: C.dark } });
  // Orange diagonal accent
  slide.addShape(pptx.ShapeType.rect, {
    x: -1, y: 3.5, w: 12, h: 2.2, rotate: -8,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  // Yellow accent strip
  slide.addShape(pptx.ShapeType.rect, {
    x: -1, y: 5.3, w: 12, h: 0.35, rotate: -8,
    fill: { color: C.yellow }, line: { color: C.yellow },
  });
  // Cyan circle decoration
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.2, y: -0.5, w: 2.5, h: 2.5,
    fill: { color: C.cyan, transparency: 60 }, line: { color: C.cyan, transparency: 60 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.8, y: 4.8, w: 1.5, h: 1.5,
    fill: { color: C.pink, transparency: 50 }, line: { color: C.pink, transparency: 50 },
  });

  // Main title
  slide.addText("🍛 カレー", {
    x: 0.5, y: 0.6, w: 9, h: 1.5,
    fontSize: 60, bold: true, color: C.white,
    fontFace: "Arial Black",
    shadow: makeShadow(),
  });
  slide.addText("Curry", {
    x: 0.5, y: 2.0, w: 9, h: 1.0,
    fontSize: 44, bold: true, color: C.yellow,
    fontFace: "Arial Black",
    shadow: makeShadow(),
  });
  slide.addText("Curry (roux, readymade) — Theme 76", {
    x: 0.5, y: 3.1, w: 9, h: 0.6,
    fontSize: 20, bold: false, color: C.white,
    fontFace: "Arial",
  });
  // Decorative pill badge
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 3.9, w: 3.2, h: 0.55, rectRadius: 0.2,
    fill: { color: C.pink }, line: { color: C.pink },
  });
  slide.addText("🌶 SPICY & FUN!", {
    x: 0.5, y: 3.9, w: 3.2, h: 0.55,
    fontSize: 14, bold: true, color: C.white,
    fontFace: "Arial", align: "center", valign: "middle",
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 2 — Is Japanese curry different?
// ─────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: C.white } });
  // Header bar
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 1.3, fill: { color: C.orange }, line: { color: C.orange } });
  // Side accent
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 1.3, w: 0.18, h: 6.2, fill: { color: C.yellow }, line: { color: C.yellow } });

  slide.addText("Is Japanese curry different from Indian curry?", {
    x: 0.3, y: 0.08, w: 9.4, h: 0.65,
    fontSize: 22, bold: true, color: C.white, fontFace: "Arial Black",
  });
  slide.addText("日本のカレーはインドカレーとは違うのですか？", {
    x: 0.3, y: 0.72, w: 9.4, h: 0.45,
    fontSize: 14, color: C.yellow, fontFace: "Arial", italic: true,
  });

  const bullets = [
    {
      en: "Indian curry was introduced to England in the 18th century, and then came from England to Japan during the Meiji Era.",
      ja: "インドのカレーは、18世紀にイギリスに伝わり、日本へは明治時代にイギリスから入ってきました。",
      color: C.cyan,
    },
    {
      en: "Powdered curry roux was developed during the Taisho Era, improving it so it was easier for Japanese people to make.",
      ja: "日本人は作りやすいように改良して、大正時代に粉末のカレールーを開発しました。",
      color: C.pink,
    },
    {
      en: "In 1950, solid curry roux first appeared, and curry with a unique stickiness rapidly spread as a home-cooked dish.",
      ja: "1950年には、固形のカレールーが登場し、独特の粘り気のあるカレーが、家庭料理として急速に広がりました。",
      color: C.orange,
    },
  ];

  bullets.forEach((b, i) => {
    const y = 1.4 + i * 1.38;
    // Bullet circle
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.3, y: y + 0.08, w: 0.36, h: 0.36,
      fill: { color: b.color }, line: { color: b.color },
    });
    slide.addText(`${i + 1}`, {
      x: 0.3, y: y + 0.08, w: 0.36, h: 0.36,
      fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle",
    });
    // Card background
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.78, y: y, w: 9.0, h: 1.28, rectRadius: 0.12,
      fill: { color: C.lightGray }, line: { color: b.color, width: 2 },
    });
    slide.addText([
      { text: b.en, options: { fontSize: 13, bold: false, color: C.dark, breakLine: true } },
      { text: b.ja, options: { fontSize: 10.5, color: C.gray, italic: true } },
    ], { x: 0.95, y: y + 0.04, w: 8.7, h: 1.2, valign: "middle", fontFace: "Arial" });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 3 — Has curry penetrated Japan's food culture?
// ─────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: C.white } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 1.3, fill: { color: C.cyan }, line: { color: C.cyan } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 1.3, w: 0.18, h: 6.2, fill: { color: C.yellow }, line: { color: C.yellow } });

  slide.addText("Has curry penetrated Japan's food culture?", {
    x: 0.3, y: 0.08, w: 9.4, h: 0.65,
    fontSize: 22, bold: true, color: C.white, fontFace: "Arial Black",
  });
  slide.addText("日本人の食文化には、カレーが浸透しているのですか？", {
    x: 0.3, y: 0.72, w: 9.4, h: 0.45,
    fontSize: 14, color: C.yellow, fontFace: "Arial", italic: true,
  });

  const bullets = [
    {
      en: "There are many types of curry roux on display at supermarkets.",
      ja: "スーパーには、いろんな種類のカレールーが並んでいます。",
      color: C.orange, icon: "🛒",
    },
    {
      en: "There are many foods with curry flavoring, such as curry buns, curry-flavored snacks, and curry udon.",
      ja: "カレーパンやカレー味のスナック、カレーうどんなど、いろいろなものがカレー味にアレンジされています。",
      color: C.pink, icon: "🍞",
    },
    {
      en: "Curry is always a popular item in school lunches and at fast-food restaurants.",
      ja: "学校給食やファストフード店でも、カレーはつねに人気メニューです。",
      color: C.cyan, icon: "🏫",
    },
  ];

  bullets.forEach((b, i) => {
    const y = 1.4 + i * 1.38;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.25, y: y + 0.37, w: 0.55, h: 0.55, rectRadius: 0.1,
      fill: { color: b.color }, line: { color: b.color },
    });
    slide.addText(b.icon, {
      x: 0.25, y: y + 0.37, w: 0.55, h: 0.55,
      fontSize: 18, align: "center", valign: "middle",
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.9, y: y, w: 8.85, h: 1.28, rectRadius: 0.12,
      fill: { color: C.lightGray }, line: { color: b.color, width: 2 },
    });
    slide.addText([
      { text: b.en, options: { fontSize: 13, bold: false, color: C.dark, breakLine: true } },
      { text: b.ja, options: { fontSize: 10.5, color: C.gray, italic: true } },
    ], { x: 1.05, y: y + 0.04, w: 8.55, h: 1.2, valign: "middle", fontFace: "Arial" });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 4 — Local curries in 47 prefectures?
// ─────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: C.white } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 1.3, fill: { color: C.pink }, line: { color: C.pink } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 1.3, w: 0.18, h: 6.2, fill: { color: C.yellow }, line: { color: C.yellow } });

  slide.addText("Are there original local curries in each of the 47 prefectures?", {
    x: 0.3, y: 0.05, w: 9.4, h: 0.7,
    fontSize: 20, bold: true, color: C.white, fontFace: "Arial Black",
  });
  slide.addText("47都道府県それぞれに、オリジナルのご当地カレーがあるのですか？", {
    x: 0.3, y: 0.76, w: 9.4, h: 0.45,
    fontSize: 13, color: C.yellow, fontFace: "Arial", italic: true,
  });

  const bullets = [
    {
      en: "Readymade curry, which can be eaten by warming in water or heating in a microwave oven, is popular as a simple souvenir.",
      ja: "お湯で温めたり、電子レンジで加熱するだけで食べられる「レトルトカレー」は手軽なお土産としても人気があります。",
      color: C.cyan, icon: "🎁",
    },
    {
      en: "Local curries featuring famous produce from each region are very trendy lately.",
      ja: "最近では、地域ごとの名産を活かした「ご当地カレー」がブームになっています。",
      color: C.orange, icon: "🗾",
    },
    {
      en: "Interest is apparently being stimulated by collaborations with famous produce from various regions of Japan, such as oysters and beef tongue.",
      ja: "牡蠣や牛タンなど、日本各地の名産とカレーのコラボレーションに好奇心を刺激されるようです。",
      color: C.pink, icon: "🦪",
    },
  ];

  bullets.forEach((b, i) => {
    const y = 1.4 + i * 1.38;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.25, y: y + 0.37, w: 0.55, h: 0.55, rectRadius: 0.1,
      fill: { color: b.color }, line: { color: b.color },
    });
    slide.addText(b.icon, {
      x: 0.25, y: y + 0.37, w: 0.55, h: 0.55,
      fontSize: 18, align: "center", valign: "middle",
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.9, y: y, w: 8.85, h: 1.28, rectRadius: 0.12,
      fill: { color: C.lightGray }, line: { color: b.color, width: 2 },
    });
    slide.addText([
      { text: b.en, options: { fontSize: 13, bold: false, color: C.dark, breakLine: true } },
      { text: b.ja, options: { fontSize: 10.5, color: C.gray, italic: true } },
    ], { x: 1.05, y: y + 0.04, w: 8.55, h: 1.2, valign: "middle", fontFace: "Arial" });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 5 — Quiz!
// ─────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  // Vibrant background
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: C.dark } });
  // Star decorations
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -0.3, y: -0.3, w: 2, h: 2,
    fill: { color: C.yellow, transparency: 70 }, line: { color: C.yellow, transparency: 70 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.3, y: 5.2, w: 2.5, h: 2.5,
    fill: { color: C.pink, transparency: 70 }, line: { color: C.pink, transparency: 70 },
  });

  // Quiz badge
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.4, y: 0.15, w: 2.4, h: 0.65, rectRadius: 0.2,
    fill: { color: C.yellow }, line: { color: C.yellow },
  });
  slide.addText("🎯 QUIZ!", {
    x: 0.4, y: 0.15, w: 2.4, h: 0.65,
    fontSize: 20, bold: true, color: C.dark, align: "center", valign: "middle", fontFace: "Arial Black",
  });
  slide.addText("クイズ！", {
    x: 2.9, y: 0.15, w: 2, h: 0.65,
    fontSize: 20, bold: true, color: C.yellow, fontFace: "Arial Black", valign: "middle",
  });

  // Question
  slide.addText("カレー発祥の地はどこでしょう？", {
    x: 0.4, y: 0.95, w: 9.2, h: 0.65,
    fontSize: 26, bold: true, color: C.white, fontFace: "Arial Black",
  });
  slide.addText("Where did curry originate?", {
    x: 0.4, y: 1.6, w: 9.2, h: 0.5,
    fontSize: 18, color: C.yellow, fontFace: "Arial", italic: true,
  });

  // 2x2 answer boxes
  const answers = [
    { label: "A", en: "India", ja: "インド", color: C.cyan },
    { label: "B", en: "Sri Lanka", ja: "スリランカ", color: C.pink },
    { label: "C", en: "Thailand", ja: "タイ", color: C.orange },
    { label: "D", en: "Nepal", ja: "ネパール", color: C.yellow },
  ];

  const boxW = 4.45, boxH = 1.7;
  const positions = [
    { x: 0.3, y: 2.2 },
    { x: 5.05, y: 2.2 },
    { x: 0.3, y: 4.15 },
    { x: 5.05, y: 4.15 },
  ];

  answers.forEach((a, i) => {
    const pos = positions[i];
    slide.addShape(pptx.ShapeType.roundRect, {
      x: pos.x, y: pos.y, w: boxW, h: boxH, rectRadius: 0.2,
      fill: { color: a.color }, line: { color: a.color },
      shadow: makeShadow(),
    });
    // Label circle
    slide.addShape(pptx.ShapeType.ellipse, {
      x: pos.x + 0.15, y: pos.y + 0.35, w: 0.7, h: 0.7,
      fill: { color: C.dark }, line: { color: C.dark },
    });
    slide.addText(a.label, {
      x: pos.x + 0.15, y: pos.y + 0.35, w: 0.7, h: 0.7,
      fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Arial Black",
    });
    slide.addText([
      { text: a.en, options: { fontSize: 20, bold: true, color: C.dark, breakLine: true } },
      { text: a.ja, options: { fontSize: 16, bold: true, color: C.dark } },
    ], { x: pos.x + 1.0, y: pos.y + 0.25, w: 3.3, h: 1.2, valign: "middle", fontFace: "Arial" });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 6 — Quiz Answer
// ─────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: C.dark } });
  // Celebratory burst circles
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 4.5, y: 0.5, w: 5.5, h: 5.5,
    fill: { color: C.yellow, transparency: 85 }, line: { color: C.yellow, transparency: 85 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -0.5, y: 2, w: 4, h: 4,
    fill: { color: C.cyan, transparency: 80 }, line: { color: C.cyan, transparency: 80 },
  });

  // Answer badge
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.4, y: 0.15, w: 3.0, h: 0.7, rectRadius: 0.2,
    fill: { color: C.green }, line: { color: C.green },
  });
  slide.addText("✅ 答え / Answer", {
    x: 0.4, y: 0.15, w: 3.0, h: 0.7,
    fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Arial Black",
  });

  // Big answer reveal
  slide.addText("正解は…", {
    x: 0.4, y: 1.05, w: 9.2, h: 0.7,
    fontSize: 30, bold: true, color: C.white, fontFace: "Arial Black",
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.4, y: 1.8, w: 9.2, h: 1.5, rectRadius: 0.2,
    fill: { color: C.cyan }, line: { color: C.cyan },
    shadow: makeShadow(),
  });
  slide.addText("🇮🇳  A. インド / India  🎉", {
    x: 0.4, y: 1.8, w: 9.2, h: 1.5,
    fontSize: 40, bold: true, color: C.dark, align: "center", valign: "middle", fontFace: "Arial Black",
  });

  // Explanation card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.4, y: 3.55, w: 9.2, h: 1.9, rectRadius: 0.15,
    fill: { color: "1E2A3A" }, line: { color: C.yellow, width: 2 },
  });
  slide.addText([
    {
      text: "Curry originated in India, was brought to England in the 18th century, and reached Japan during the Meiji Era via England.",
      options: { fontSize: 14, color: C.white, breakLine: true },
    },
    {
      text: "カレーはインドが発祥。18世紀にイギリスへ伝わり、明治時代にイギリスから日本に入ってきました。",
      options: { fontSize: 12, color: C.gray, italic: true },
    },
  ], { x: 0.65, y: 3.65, w: 8.7, h: 1.75, valign: "middle", fontFace: "Arial" });
}

// ─────────────────────────────────────────────────────
// SLIDE 7 — Thank You
// ─────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: C.orange } });
  // Large overlapping circles for depth
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -1.5, y: -1.5, w: 6, h: 6,
    fill: { color: C.yellow, transparency: 60 }, line: { color: C.yellow, transparency: 60 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 6.5, y: 3, w: 5, h: 5,
    fill: { color: C.pink, transparency: 65 }, line: { color: C.pink, transparency: 65 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 3.5, y: -1, w: 4, h: 4,
    fill: { color: C.cyan, transparency: 70 }, line: { color: C.cyan, transparency: 70 },
  });

  slide.addText("🍛", {
    x: 0, y: 0.5, w: "100%", h: 1.2,
    fontSize: 60, align: "center",
  });
  slide.addText("Thank you!", {
    x: 0, y: 1.7, w: "100%", h: 1.3,
    fontSize: 56, bold: true, color: C.dark, align: "center", fontFace: "Arial Black",
    shadow: makeShadow(),
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.5, y: 3.0, w: 7, h: 0.06,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  slide.addText("ありがとうございました", {
    x: 0, y: 3.1, w: "100%", h: 1.0,
    fontSize: 34, bold: true, color: C.dark, align: "center", fontFace: "Arial",
    shadow: makeShadow(),
  });
  slide.addText("Curry (roux, readymade) — Theme 76", {
    x: 0, y: 4.4, w: "100%", h: 0.55,
    fontSize: 16, color: C.dark, align: "center", fontFace: "Arial",
  });
}

// ─────────────────────────────────────────────────────
// Save
// ─────────────────────────────────────────────────────
pptx.writeFile({ fileName: "curry_presentation.pptx" })
  .then(() => console.log("✅  curry_presentation.pptx saved!"))
  .catch((err) => { console.error("❌ Error:", err); process.exit(1); });
