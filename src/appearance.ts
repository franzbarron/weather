let colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');

const setColorScheme = (e) => {
  if (e.matches) {
    // Dark
    setDarkMode();
  } else {
    // Light
    setLightMode();
  }
};

setColorScheme(colorSchemeQueryList);
colorSchemeQueryList.addListener(setColorScheme);

function setDarkMode() {
  // Make background dark
  document.body.classList.add('bg-dark');

  // Change location buttons appearance
  const locationBtns = document.querySelectorAll('.btn.btn-block');
  for (const btn of locationBtns) {
    btn.classList.add('btn-primary');
  }

  // Change preference buttons appearance
  const appearanceBtn = document.querySelectorAll('.preference-btn');
  for (const btn of appearanceBtn) {
    btn.classList.add('btn-primary');
  }

  // Change Dark/Light Mode button icon
  const appearanceIcon = document.querySelector('#appearance-icon');
  appearanceIcon.classList.value = 'wi wi-day-sunny';
}

function setLightMode() {
  // Make background white
  document.body.classList.remove('bg-dark');

  // Change location buttons appearance
  const locationBtns = document.querySelectorAll('.btn.btn-block');
  for (const btn of locationBtns) {
    btn.classList.remove('btn-primary');
  }

  // Change preference buttons appearance
  const appearanceBtn = document.querySelectorAll('.preference-btn');
  for (const btn of appearanceBtn) {
    btn.classList.remove('btn-primary');
  }

  // Change Dark/Light Mode button icon
  const appearanceIcon = document.querySelector('#appearance-icon');
  appearanceIcon.classList.value = 'wi wi-night-clear';
}
