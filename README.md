# Electric Kettle Simulator

Open `index.html` in a web browser (double-click it). No installation, build, or internet connection is needed. Keep `styles.css` and `script.js` beside it.

## How it works

- **Data and variables:** `state`, `temperature`, and `hasWater` describe the kettle. `heatingInterval` holds the active timer ID, or `null` when stopped.
- **Events:** each button has a JavaScript `click` event listener.
- **Initialization:** each load resets to `empty`, no water, 20°C, no timer, and “Add water to begin.” A page restored from the browser's back/forward cache resets too. Only the water button adds water.
- **Control flow:** `if` / `else if` / `else` conditions decide whether to show a message, add water, start heating, or ignore a repeated Start. Stop changes only a heating kettle.
- **Timer:** `setInterval` adds 5°C every second. At 100°C, `clearInterval` stops it and the state becomes `boiled`. `Math.min` prevents overshooting. Stopping preserves temperature so Start can resume.
- **Feedback:** `updateDisplay` refreshes the temperature, state, progress bar, status message, and water button. CSS uses the state to show water, steam, and the heating light.

State transitions: `empty → ready → heating → boiled`. Stop changes `heating → ready`; replacing water changes any non-heating state to `ready` at 20°C. This teaching simulation does not model cooling or real kettle safety systems.

## Try it

1. Start empty: “Please add water first.”
2. Add water and Start: temperature rises by 5°C each second.
3. Click Start repeatedly: heating stays at one timer; replacing water is disabled.
4. Stop partway: temperature stays fixed; Start resumes from there.
5. Reach 100°C: heating stops automatically and state becomes `boiled`.
6. Start after boiling: “Replace the water to start a new cycle.” Replace water and Start again.
7. Stop when not heating: nothing changes.
