const translations = {
  en: {
    welcomeTitle: "Fan-Made Concept",
    welcomeText: "Warning: This is an unofficial fan-made Metro UI interface emulator (v0.0.0.0001). Enjoy exploring!",
    gotItBtn: "Got it!",
    splashDisclaimer: "Metro UI Kernel v0.0.0.0001",
    createProfile: "Create Profile",
    enterDetails: "Enter username and password to log in",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Password",
    loginBtn: "Log in",
    startHeader: "Start",
    tileDesktop: "Desktop",
    tileMail: "Mail",
    tileCalendar: "Calendar",
    tileStore: "Store",
    tilePhotos: "Photos",
    tileWeather: "Weather",
    tileSettings: "Settings",
    settingsTitle: "Settings",
    languageLabel: "System Language",
    resetFirstLaunch: "Reset First Launch Warning",
    checkForUpdates: "Check for Updates",
    featureTitle: "Coming Soon!",
    featureText: "This feature is not released yet in version 0.0.0.0001.",
    closeBtn: "OK"
  },
  ru: {
    welcomeTitle: "Фанатская версия",
    welcomeText: "Внимание: Это неофициальный фанатский эмулятор интерфейса Metro UI (v0.0.0.0001). Приятного использования!",
    gotItBtn: "Понятно!",
    splashDisclaimer: "Ядро Metro UI v0.0.0.0001",
    createProfile: "Создание профиля",
    enterDetails: "Придумайте имя пользователя и пароль",
    usernamePlaceholder: "Имя пользователя",
    passwordPlaceholder: "Пароль",
    loginBtn: "Войти",
    startHeader: "Пуск",
    tileDesktop: "Рабочий стол",
    tileMail: "Почта",
    tileCalendar: "Календарь",
    tileStore: "Store",
    tilePhotos: "Фотографии",
    tileWeather: "Погода",
    tileSettings: "Параметры",
    settingsTitle: "Параметры",
    languageLabel: "Язык системы",
    resetFirstLaunch: "Сбросить статус первого входа",
    checkForUpdates: "Проверить обновления",
    featureTitle: "Скоро выйдет!",
    featureText: "Эта функция еще не выпущена в версии 0.0.0.0001.",
    closeBtn: "ОК"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  
  document.querySelectorAll('[data-key]').forEach(elem => {
    const key = elem.getAttribute('data-key');
    if (translations[lang][key]) {
      elem.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-key-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-key-placeholder');
    if (translations[lang][key]) {
      elem.placeholder = translations[lang][key];
    }
  });

  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    langSelect.value = lang;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const splashScreen = document.getElementById('splash-screen');
  const loginScreen = document.getElementById('login-screen');
  const startScreen = document.getElementById('start-screen');
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const userDisplayName = document.getElementById('user-display-name');
  
  const firstLaunchModal = document.getElementById('first-launch-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  
  const featureModal = document.getElementById('feature-modal');
  const closeFeatureBtn = document.getElementById('close-feature-btn');
  
  const settingsTile = document.getElementById('settings-tile');
  const settingsPanel = document.getElementById('settings-panel');
  const closeSettingsBtn = document.getElementById('close-settings-btn');
  const languageSelect = document.getElementById('language-select');
  const resetFirstLaunchBtn = document.getElementById('reset-first-launch-btn');
  const updateBtn = document.getElementById('update-btn');

  setLanguage('en');

  // Плавный переход сплэш-скрина
  setTimeout(() => {
    splashScreen.classList.add('fade-out');
    setTimeout(() => {
      splashScreen.classList.add('hidden');
      loginScreen.classList.remove('hidden');

      if (!localStorage.getItem('hasVisitedBefore')) {
        firstLaunchModal.classList.remove('hidden');
      }
    }, 800);
  }, 2500);

  // Закрытие модального окна первого запуска
  closeModalBtn.addEventListener('click', () => {
    firstLaunchModal.classList.add('fade-out');
    localStorage.setItem('hasVisitedBefore', 'true');
    setTimeout(() => {
      firstLaunchModal.classList.add('hidden');
    }, 400);
  });

  // Авторизация
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = usernameInput.value.trim();
    if (name) {
      userDisplayName.textContent = name;
      loginScreen.classList.add('fade-out');
      setTimeout(() => {
        loginScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        startScreen.classList.add('animate-in');
      }, 500);
    }
  });

  // Обработка кликов по плиткам (заглушка для еще не вышедших версий)
  document.querySelectorAll('.tiles-grid .tile').forEach(tile => {
    if (tile.id === 'settings-tile') return; // Настройки открывают панель
    tile.addEventListener('click', () => {
      featureModal.classList.remove('hidden');
    });
  });

  closeFeatureBtn.addEventListener('click', () => {
    featureModal.classList.add('fade-out');
    setTimeout(() => {
      featureModal.classList.add('hidden');
      featureModal.classList.remove('fade-out');
    }, 400);
  });

  // Управление панелью настроек
  settingsTile.addEventListener('click', () => {
    settingsPanel.classList.add('open');
  });

  closeSettingsBtn.addEventListener('click', () => {
    settingsPanel.classList.remove('open');
  });

  languageSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });

  // Проверка обновлений -> Переход на GitHub
  updateBtn.addEventListener('click', () => {
    // В Electron или браузере открывает ссылку на GitHub
    window.location.href = "https://github.com"; 
  });

  resetFirstLaunchBtn.addEventListener('click', () => {
    localStorage.removeItem('hasVisitedBefore');
    alert(currentLang === 'en' ? 'First launch reset! Reload to test.' : 'Статус первого входа сброшен! Перезагрузите страницу.');
  });
});