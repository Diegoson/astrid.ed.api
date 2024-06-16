
window.onload = function() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');

  loadingScreen.style.display = 'none';

  const enterButton = document.getElementById('enter-button');
  const mainContainer = document.getElementById('main-container');

  enterButton.addEventListener('click', () => {
    loadingScreen.style.display = 'none';
    document.body.classList.add('loaded');
  });

  const batteryIcon = document.getElementById('battery-icon');
  const batteryLevel = document.getElementById('battery-level');

  function updateBatteryStatus(battery) {
    const level = Math.floor(battery.level * 100);
    const charging = battery.charging ? 'charging' : 'discharging';
    batteryLevel.textContent = `${level}% ${charging}`;
    if (level > 75) {
      batteryIcon.className = 'fas fa-battery-full';
    } else if (level > 50) {
      batteryIcon.className = 'fas fa-battery-three-quarters';
    } else if (level > 25) {
      batteryIcon.className = 'fas fa-battery-half';
    } else if (level > 10) {
      batteryIcon.className = 'fas fa-battery-quarter';
    } else {
      batteryIcon.className = 'fas fa-battery-empty';
    }
  }

  navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);
    battery.addEventListener('levelchange', () => {
      updateBatteryStatus(battery);
    });
    battery.addEventListener('chargingchange', () => {
      updateBatteryStatus(battery);
    });
  });

  setTimeout(() => {
    mainContent.style.display = 'block';
  }, 1000);
        }
                             
