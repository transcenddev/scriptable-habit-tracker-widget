// Pretty Progress Habit Streak Widget (Enhanced & Modularized)

// =======================
// USER CONFIGURATION
// =======================
const habit = {
  name: "Meditation",     // Habit name
  streak: 57,             // Current streak
  max: 365                // Total days
};

const visual = {
  bgImageUrl: "",               // Optional background image URL
  bgColor: "#18181b",           // Solid background color
  overlayOpacity: 0.95,         // Opacity for dark overlay

  filledDotColor: "#ffffff",    // Color for completed days
  emptyDotColor: "#444444",     // Color for remaining
  emptyDotOpacity: 0.6
};

const layout = {
  widgetWidth: 300,      // Best for iPhone XR
  padding: 20,
  circleSize: 3,
  circleSpacing: 1,
  textSpacing: 15,
  dotShiftLeft: 0,
  yearOffset: 0,
  daysLeftOffset: 0,
  cornerRadius: 16
};

// Calculate grid dimensions
const totalDays = habit.max;
const availableWidth = layout.widgetWidth - 2 * layout.padding;
const totalDotWidth = layout.circleSize + layout.circleSpacing;
layout.columns = Math.floor(availableWidth / totalDotWidth);
layout.rows = Math.ceil(totalDays / layout.columns);

const font = {
  bold: new Font("Menlo-Bold", 10),
  regular: new Font("Menlo", 10)
};

// =======================
// INITIALIZE WIDGET
// =======================
const w = new ListWidget();
w.cornerRadius = layout.cornerRadius;
w.setPadding(layout.padding, layout.padding, layout.padding, layout.padding);

// Background
if (visual.bgImageUrl) {
  try {
    const req = new Request(visual.bgImageUrl);
    const bgImage = await req.loadImage();
    w.backgroundImage = bgImage;
  } catch {
    console.log("Could not load background image.");
  }
}

// Gradient overlay
const overlay = new LinearGradient();
overlay.locations = [0, 1];
overlay.colors = [
  new Color(visual.bgColor, visual.overlayOpacity),
  new Color(visual.bgColor, visual.overlayOpacity)
];
w.backgroundGradient = overlay;

// =======================
// DOT GRID
// =======================
const gridContainer = w.addStack();
gridContainer.layoutVertically();

const gridStack = gridContainer.addStack();
gridStack.layoutVertically();
gridStack.spacing = layout.circleSpacing;

for (let row = 0; row < layout.rows; row++) {
  const rowStack = gridStack.addStack();
  rowStack.layoutHorizontally();
  rowStack.addSpacer(layout.dotShiftLeft);

  for (let col = 0; col < layout.columns; col++) {
    const day = row * layout.columns + col + 1;
    if (day > habit.max) continue;

    const dot = rowStack.addText("●");
    dot.font = Font.systemFont(layout.circleSize);
    dot.textColor = (day <= habit.streak)
      ? new Color(visual.filledDotColor)
      : new Color(visual.emptyDotColor, visual.emptyDotOpacity);

    if (col < layout.columns - 1) rowStack.addSpacer(layout.circleSpacing);
  }
}

w.addSpacer(layout.textSpacing);

// =======================
// FOOTER
// =======================
const footer = w.addStack();
footer.layoutHorizontally();

// Habit name (left)
const habitNameStack = footer.addStack();
habitNameStack.addSpacer(layout.yearOffset);
const nameText = habitNameStack.addText(habit.name);
nameText.font = font.bold;
nameText.textColor = new Color(visual.filledDotColor);
nameText.lineLimit = 1;

// Dynamic spacing
const streakText = `${habit.streak} days streak`;
const approxCharWidth = 7.5;
const textWidth = streakText.length * approxCharWidth;
const availableSpace = layout.widgetWidth - (layout.padding * 2) - layout.yearOffset - (habit.name.length * approxCharWidth);
const spacerLength = availableSpace - textWidth + layout.daysLeftOffset;

footer.addSpacer(spacerLength);

// Streak count (right)
const streakStack = footer.addStack();
const streakDisplay = streakStack.addText(streakText);
streakDisplay.font = font.regular;
streakDisplay.textColor = new Color("#ffffff", 0.4);
streakDisplay.lineLimit = 1;

// =======================
// RENDER
// =======================
if (config.runsInWidget) {
  Script.setWidget(w);
} else {
  await w.presentMedium();
}
Script.complete();
