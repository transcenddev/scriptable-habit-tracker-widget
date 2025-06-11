# Pretty Progress Habit Streak Widget

This is a minimal habit streak widget for iOS using Scriptable.  
It displays your current habit streak as a grid of dots, with options for simple customization.

## How to Use

1. Install the Scriptable app from the iOS App Store.
2. Create a new script and paste the code from `habit-streak-widget.js`.
3. Customize the configuration at the top of the script to fit your habit.
4. Run the script or add it as a medium-sized widget on your home screen.

## Configuration

You can adjust the following settings in the script:

- `habit.name`: Name of the habit (e.g., "Meditation")
- `habit.streak`: Number of days in your current streak
- `habit.max`: Total number of days to track (e.g., 365)
- `visual`: Colors, background image, overlay opacity
- `layout`: Widget size, dot spacing, padding, and other layout settings

Example:

```js
const habit = {
  name: "Meditation",
  streak: 57,
  max: 365,
};
```
