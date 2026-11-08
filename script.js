// These variables store the kettle's current data and state.
let state = "empty"; // Possible values: empty, ready, heating, boiled.
let temperature = 20; // Degrees Celsius.
let hasWater = false;
let heatingInterval = null; // Stores the timer ID; null means no timer is running.

const simulator = document.querySelector(".simulator");
const temperatureDisplay = document.querySelector("#temperature");
const stateLabel = document.querySelector("#state-label");
const statusMessage = document.querySelector("#status-message");
const temperatureMeter = document.querySelector("#temperature-meter");
const temperatureFill = document.querySelector("#temperature-fill");
const addWaterButton = document.querySelector("#add-water");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");

// Update the visible feedback from the variables after each change.
function updateDisplay(message) {
  simulator.dataset.state = state;
  temperatureDisplay.textContent = temperature;
  stateLabel.textContent = state;
  statusMessage.textContent = message;
  temperatureMeter.setAttribute("aria-valuenow", temperature);
  temperatureFill.style.width = ((temperature - 20) / 80) * 100 + "%";
  addWaterButton.disabled = state === "heating";
}

// Start each page visit with empty water and matching visual feedback.
function initializeKettle() {
  clearInterval(heatingInterval);
  heatingInterval = null;
  state = "empty";
  hasWater = false;
  temperature = 20;
  updateDisplay("Add water to begin.");
}

initializeKettle();

// A browser can restore a page from its back/forward cache without rerunning it.
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    initializeKettle();
  }
});

// Event listeners run these functions when a button is clicked.
addWaterButton.addEventListener("click", function () {
  // This condition also guards against replacing water during heating.
  if (state === "heating") {
    return;
  }
  hasWater = true;
  temperature = 20;
  state = "ready";
  updateDisplay("Fresh water added. Press Start to heat the kettle.");
});

startButton.addEventListener("click", function () {
  // Check the conditions in order before creating a heating timer.
  if (!hasWater) {
    updateDisplay("Please add water first.");
  } else if (temperature >= 100) {
    updateDisplay("Replace the water to start a new cycle.");
  } else if (state === "heating" || heatingInterval !== null) {
    updateDisplay("Already heating. Only one timer is running.");
  } else {
    state = "heating";
    updateDisplay("Heating the water. You can stop and resume at any time.");

    // The timer runs every 1,000 milliseconds (one second).
    heatingInterval = setInterval(function () {
      temperature = Math.min(temperature + 5, 100);
      if (temperature >= 100) {
        clearInterval(heatingInterval);
        heatingInterval = null;
        state = "boiled";
        updateDisplay("Water boiled! The kettle has switched off automatically.");
      } else {
        updateDisplay("Heating the water. You can stop and resume at any time.");
      }
    }, 1000);
  }
});

stopButton.addEventListener("click", function () {
  // Stop only changes the state when heating is in progress.
  if (state === "heating") {
    clearInterval(heatingInterval);
    heatingInterval = null;
    state = "ready";
    updateDisplay("Heating stopped. Press Start to resume from " + temperature + "°C.");
  }
});
