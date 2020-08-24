let colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
const setColorScheme = (e) => {
    if (e.matches) {
        setDarkMode();
    }
    else {
        setLightMode();
    }
};
setColorScheme(colorSchemeQueryList);
colorSchemeQueryList.addListener(setColorScheme);
function setDarkMode() {
    document.body.classList.add('bg-dark');
    const locationBtns = document.querySelectorAll('.btn.btn-block');
    for (const btn of locationBtns) {
        btn.classList.add('btn-primary');
    }
    const appearanceBtn = document.querySelectorAll('.preference-btn');
    for (const btn of appearanceBtn) {
        btn.classList.add('btn-primary');
    }
    const appearanceIcon = document.querySelector('#appearance-icon');
    appearanceIcon.classList.value = 'wi wi-day-sunny';
}
function setLightMode() {
    document.body.classList.remove('bg-dark');
    const locationBtns = document.querySelectorAll('.btn.btn-block');
    for (const btn of locationBtns) {
        btn.classList.remove('btn-primary');
    }
    const appearanceBtn = document.querySelectorAll('.preference-btn');
    for (const btn of appearanceBtn) {
        btn.classList.remove('btn-primary');
    }
    const appearanceIcon = document.querySelector('#appearance-icon');
    appearanceIcon.classList.value = 'wi wi-night-clear';
}
