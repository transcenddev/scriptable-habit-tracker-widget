// Pretty Progress Habit Streak Widget for Scriptable

// ===================================================
// USER CONFIGURATION
// ===================================================

// STEP 1: Customize your habit
const habitName = "Meditation";    // Your habit name
const streakCount = 57;           // Your current streak (max 365)

// STEP 2: Visual Customization
const BG_IMAGE_URL = "";          // Add image URL or leave blank
const BG_COLOR = "#18181b";       // Background/overlay color
const BG_OVERLAY_OPACITY = 0.95;  // Overlay opacity (0-1)

// Color settings for dots
const filledDotColor = new Color("#ffffff");         // Completed days
const emptyDotColor = new Color("#444444", 0.6);    // Remaining days

// Layout Configuration
// Optimized specifically for iPhone XR to prevent overlapping
const WIDGET_WIDTH = 300;         // Further reduced for XR
const PADDING = 20;               // More padding for safety
const CIRCLE_SIZE = 3;            // Even smaller dots
const CIRCLE_SPACING = 1;         // Minimal spacing
const TEXT_SPACING = 15;          // More space between grid and text
const DOT_SHIFT_LEFT = 0;         // No left shift needed
const YEAR_OFFSET = 0;            // No text offset needed
const DAYS_LEFT_OFFSET = 0;       // Kept at 0
const cornerRadius = 16;          // Kept the same

// Calculate grid dimensions
const AVAILABLE_WIDTH = WIDGET_WIDTH - (2 * PADDING);
const TOTAL_CIRCLE_WIDTH = CIRCLE_SIZE + CIRCLE_SPACING;
const COLUMNS = 20;               // Further reduced columns
const ROWS = 19;                  // Increased rows to compensate

// Font Configuration
const MENLO_REGULAR = new Font("Menlo", 10);  // Smaller font size
const MENLO_BOLD = new Font("Menlo-Bold", 10);  // Smaller font size

// Create widget
let w = new ListWidget();
w.cornerRadius = cornerRadius;

// Set up background
if (BG_IMAGE_URL) {
    try {
        const req = new Request(BG_IMAGE_URL);
        const bgImage = await req.loadImage();
        w.backgroundImage = bgImage;
    } catch (e) {
        console.log("Couldn't load background image");
    }
}

// Add gradient overlay
const overlay = new LinearGradient();
overlay.locations = [0, 1];
overlay.colors = [
    new Color(BG_COLOR, BG_OVERLAY_OPACITY),
    new Color(BG_COLOR, BG_OVERLAY_OPACITY)
];
w.backgroundGradient = overlay;

w.setPadding(PADDING, PADDING, PADDING, PADDING);

// Create grid container
const gridContainer = w.addStack();
gridContainer.layoutVertically();

// Build the dot grid
const gridStack = gridContainer.addStack();
gridStack.layoutVertically();
gridStack.spacing = CIRCLE_SPACING;

for (let row = 0; row < ROWS; row++) {
    const rowStack = gridStack.addStack();
    rowStack.layoutHorizontally();
    rowStack.addSpacer(DOT_SHIFT_LEFT);
    
    for (let col = 0; col < COLUMNS; col++) {
        const day = row * COLUMNS + col + 1;
        if (day > 365) continue;
        
        const circle = rowStack.addText("●");
        circle.font = Font.systemFont(CIRCLE_SIZE);
        circle.textColor = (day <= streakCount) ? filledDotColor : emptyDotColor;
        
        if (col < COLUMNS - 1) rowStack.addSpacer(CIRCLE_SPACING);
    }
}

w.addSpacer(TEXT_SPACING);

// Bottom row with habit name and streak count
const footer = w.addStack();
footer.layoutHorizontally();

// Habit name (left)
const eventStack = footer.addStack();
eventStack.addSpacer(YEAR_OFFSET);
const nameText = eventStack.addText(habitName);
nameText.font = MENLO_BOLD;
nameText.textColor = filledDotColor;
nameText.lineLimit = 1;

// Calculate spacing for streak text
const streakText = `${streakCount} days streak`;
const textWidth = streakText.length * 7.5;
const availableSpace = WIDGET_WIDTH - (PADDING * 2) - YEAR_OFFSET - (nameText.text.length * 7.5);
const spacerLength = availableSpace - textWidth + DAYS_LEFT_OFFSET;

footer.addSpacer(spacerLength);

// Streak count (right)
const streakTextStack = footer.addStack();
const streakDisplay = streakTextStack.addText(streakText);
streakDisplay.font = MENLO_REGULAR;
streakDisplay.textColor = new Color("#ffffff", 0.4);  // Matching the countdown widget's style
streakDisplay.lineLimit = 1;

// Present widget
if (config.runsInWidget) {
    Script.setWidget(w);
} else {
    await w.presentMedium();
}
Script.complete();