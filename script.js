document.addEventListener('DOMContentLoaded', function(){
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const enterButton = document.getElementById('enter-button');
  const mainContainer = document.getElementById('main-container');
  const batteryIcon = document.getElementById('battery-icon');
  const batteryLevel = document.getElementById('battery-level');

  loadingScreen.style.display = 'none';
  mainContent.style.display = 'none';

  enterButton.addEventListener('click', () => {
    loadingScreen.style.display = 'none';
    document.body.classList.add('loaded');
  });

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
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';
    window.location.href = 'index.html';
  }, 3000); 
});
