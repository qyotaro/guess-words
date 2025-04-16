document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.getElementById('game-grid');
    const keyboardContainer = document.getElementById('keyboard');
    const messageContainer = document.getElementById('message-container');
    const loginModal = document.getElementById('login-modal');
    const settingsModal = document.getElementById('settings-modal');
    const statsModal = document.getElementById('stats-modal');
    const leaderboardModal = document.getElementById('leaderboard-modal');
    const helpModal = document.getElementById('help-modal');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username-input');
    const loginError = document.getElementById('login-error');
    const settingsButton = document.getElementById('settings-button');
    const statsButton = document.getElementById('stats-button');
    const leaderboardButton = document.getElementById('leaderboard-button');
    const helpButton = document.getElementById('help-button');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const logoutButton = document.getElementById('logout-button');
    const applySettingsButton = document.getElementById('apply-settings-button');
    const wordLengthSelect = document.getElementById('word-length-select');
    const gameModeRadios = document.querySelectorAll('input[name="gameMode"]');
    const wordLengthSettingDiv = document.getElementById('word-length-setting');
    const statsUsername = document.getElementById('stats-username');
    const statsPlayed = document.getElementById('stats-played');
    const statsWinPercentage = document.getElementById('stats-win-percentage');
    const statsCurrentStreak = document.getElementById('stats-current-streak');
    const statsMaxStreak = document.getElementById('stats-max-streak');
    const statsDistribution = document.getElementById('stats-distribution');
    const resetStatsButton = document.getElementById('reset-stats-button');
    const statsDailySuccessRate = document.getElementById('stats-daily-success-rate');
    const statsDailyFastestTime = document.getElementById('stats-daily-fastest-time');
    const leaderboardList = document.getElementById('leaderboard-list');
    const currentModeDisplay = document.getElementById('current-mode-display');
    const wordLengthDisplay = document.getElementById('word-length-display');
    const dailyTimerDisplay = document.getElementById('daily-timer');
    const dailyWordProgressDisplay = document.getElementById('daily-word-progress');
    const closeButtons = document.querySelectorAll('.close-button');
  
    const MAX_ATTEMPTS = 6;
    const FLIP_ANIMATION_DURATION = 300;
    const POP_ANIMATION_DURATION = 100;
    const MESSAGE_DURATION = 2000;
    const DAILY_WORDS_COUNT = 5;
  
    const WORDS = {
      4: ["АВТО", "БАБА", "БАНК", "БІЛЬ", "БОРГ", "БОРЩ", "БРАТ", "БРУД", "БЮРО", "ВАГА", "ВАЗА", "ВАТА", "ВИНО", "ВІЗА", "ВІРА", "ВОВК", "ВОДА", "ВОЛЯ", "ВУХО", "ГНІВ", "ГОРА",
        "ГРІХ", "ГУБА", "ДАТА", "ДЕНЬ", "ДІДО", "ДІЛО", "ДІРА", "ДОЛЯ", "ДОНЯ", "ДУША", "ЖАБА", "ЗИМА", "ЗНАК", "ЗОНА", "ЗВУК", "ЗЯТЬ", "ІДЕЯ", "КАВА", "КАСА", "КАША", "КІНО",
        "КЛУБ", "КОЛО", "КОМА", "КОСА", "КОЗА", "КРАЙ", "КРОК", "КУРС", "КУЛЯ", "ЛАВА", "ЛІТО", "МАМА", "МАСА", "МЕНЮ", "МЕТА", "МЕТР", "МИЛО", "МОВА", "МОРЕ", "МУКА", "МУХА",
        "МЯСО", "НЕБО", "НИВА", "НОГА", "НОТА", "ОЛІЯ", "ПАРА", "ПАРК", "ПИВО", "ПІНА", "ПЛАН", "ПЛАЧ", "ПЛІД", "ПОЯС", "ПОРТ", "ПТАХ", "РАДА", "РАМА", "РАНА", "РИБА", "РОЛЬ",
        "РОСА", "РОЗУМ", "РУКА", "САЛО", "СЕЛО", "СИЛА", "СІЛЬ", "СКЛО", "СЛІД", "СМІХ", "СОДА", "СТІЛ", "СУМА", "СХІД", "ТАНК", "ТАТО", "ТЕМА", "ТЕЩА", "ТИГР", "ТІЛО", "ТІНЬ",
        "ФАКТ", "ФОТО", "ХЛІБ", "ЦІНА", "ЦВЯХ", "ЧАША", "ШАНА", "ШАНС", "ШАФА", "ШИНА", "ШИЯ", "ШЛЯХ", "ШРАМ", "ЯЙЦЕ"],
  
      5: ["АВТОР", "БАЗАР", "БЕРЕГ", "ВАРТА", "ВЕЧІР", "ВИБІР", "ВИЛКА", "ВИХІД", "ВІЙНА", "ВІКНО", "ВІТЕР", "ВІВЦЯ", "ВЛАДА", "ВОЛОС", "ГОЛОС", "ГОЛОД", "ГОРЛО", "ГОЛКА",
        "ГРОШІ", "ГРУПА", "ГРУДИ", "ДВЕРІ", "ДОШКА", "ДУМКА", "ЖІНКА", "ЖИВІТ", "ЗАВОД", "ЗАЄЦЬ", "ЗАКОН", "ЗАМОК", "ЗАПАХ", "ЗАПИС", "ЗАХІД", "ЗЕМЛЯ", "ЗІРКА", "ЗМІСТ",
        "ЗОШИТ", "КАНАЛ", "КАРТА", "КАЗКА", "КНИГА", "КОЛІР", "КОШИК", "КРИЗА", "КУРКА", "ЛАМПА", "ЛІКАР", "ЛІЖКО", "ЛІТАК", "ЛОЖКА", "МАСЛО", "МИСКА", "МІСЦЕ", "МІШОК",
        "МІСТО", "МОЗОК", "МУЗЕЙ", "НАУКА", "НАКАЗ", "НАМІР", "НАЗВА", "НОМЕР", "НОРМА", "НИТКИ", "ОБРАЗ", "ОЗЕРО", "ОКЕАН", "ОЛЕНЬ", "ОПЕРА", "ОСІНЬ", "ПАПІР", "ПІСОК",
        "ПІСНЯ", "ПЛЕЧЕ", "ПОЇЗД", "ПОПИТ", "ПОПІЛ", "ПОСУД", "ПРАЦЯ", "ПРАВО", "РАНОК", "РИЗИК", "РІЧКА", "РУЧКА", "СВИНЯ", "СЕРЦЕ", "СКЛАД", "СЛОВО", "СОНЦЕ", "СОРОМ",
        "СПИНА", "СТІНА", "СТРАХ", "СУКНЯ", "ТЕАТР", "ТЕКСТ", "ТЕПЛО", "ТЕСТЬ", "ТОВАР", "УМОВА", "УСПІХ", "УЧЕНЬ", "ФІРМА", "ФОРМА", "ХОЛОД", "ЦЕНТР", "ЧАЙКА", "ЧАШКА",
        "ЧЕСТЬ", "ЧИСЛО", "ЧОВЕН", "ШКОДА", "ШКІРА", "ШТАНИ"],
  
      6: ["АНАЛІЗ", "АПТЕКА", "АСПЕКТ", "БАБУСЯ", "БАЛАНС", "БАТЬКО", "БДЖОЛА", "БЕНЗИН", "БІЗНЕС", "БОЛОТО", "БРЕХНЯ", "БЮДЖЕТ", "ВАЛІЗА", "ВИБОРИ", "ВНЕСОК", "ВОКЗАЛ",
        "ВОЛОСЯ", "ВОРОНА", "ВОРОТА", "ВУЛИЦЯ", "ВЧИНОК", "ГАЛЯВА", "ГЛЕЧИК", "ГОДИНА", "ГОЛОВА", "ГОТЕЛЬ", "ГРАФІК", "ДЕКРЕТ", "ДЕТАЛЬ", "ДЕРЕВО", "ДІАЛОГ", "ДІДУСЬ",
        "ДИТИНА", "ДОВІРА", "ДОЛОНЯ", "ДОРОГА", "ДОСВІД", "ДОСТУП", "ДРУЖБА", "ДЯДЬКО", "ЗАЛІЗО", "ЗАХИСТ", "ЗБИТОК", "ЗВИЧКА", "ЗНАННЯ", "ЗОЛОТО", "ІМПОРТ", "ІНДЕКС",
        "КАЛИНА", "КАМІНЬ", "КВИТОК", "КІСТКА", "КЛІМАТ", "КЛОПІТ", "КНИГА", "КНОПКА", "КОВДРА", "КОЛІНО", "КОЛЕСО", "КОРДОН", "КОРІНЬ", "КОРОВА", "КОРПУС", "КОРОНА",
        "КРАЇНА", "КРЕДИТ", "КРИТИК", "ЛЕГЕНІ", "ЛЕЛЕКА", "ЛИСИЦЯ", "ЛІКОТЬ", "ЛОПАТА", "МАЙДАН", "МАЛИНА", "МІСЯЦЬ", "МОМЕНТ", "МОНЕТА", "МУЗИКА", "МУРАХА", "НАПРЯМ",
        "НАТОВП", "НІГОТЬ", "НОЖИЦІ", "ОБРАЗА", "ОЗНАКА", "ОЦІНКА", "ПАЛИВО", "ПАЛЕЦЬ", "ПАЛЬТО", "ПАРКАН", "ПАТЕНТ", "ПЕЧАЛЬ", "ПЕЧЕРА", "ПІВЕНЬ", "ПЛЯШКА", "ПОВАГА",
        "ПОГОДА", "ПОСТУП", "ПРАВДА", "ПРАСКА", "ПРИВИД", "ПРИПИС", "ПРОЕКТ", "ПРОЦЕС", "РЕГІОН", "РЕСУРС", "РЕШЕТО", "РІВЕНЬ", "РИТУАЛ", "РОЗДІЛ", "РОЗМІР", "РОДИНА",
        "РУШНИК", "СВІЧКА", "СЕКРЕТ", "СЕРВІС", "СЕСТРА", "СИГНАЛ", "СИМВОЛ", "СИНТЕЗ", "СИНИЦЯ", "СКРІПКА", "СМЕРТЬ", "СМУТОК", "СОБАКА", "СОКИРА", "СОЛОМА", "СПОСІБ",
        "СРІБЛО", "СТАТУС", "СТАТТЯ", "СТЕЖКА", "СТИМУЛ", "СУМНІВ", "ТАЛАНТ", "ТЕРМІН", "ФАКТОР", "ФАНЕРА", "ФОРМАТ", "ХУСТКА", "ЦЕРКВА", "ЧОБОТИ", "ШАБЛОН", "ШКОЛЯР",
        "ШЛУНОК", "ЯКІСТЬ", "ЯЧМІНЬ", "ВЛАСНИК", "ЗНАЙОМА", "ЗДОРОВЯ", "КАВЯРНЯ", "ПАСАЖИР", "ПЕРЕБІГ", "ПРИНЦИП", "ТРОТУАР"],
  
      7: ["БАЖАННЯ", "БУДИНОК", "ВАРІАНТ", "ВЕДМІДЬ", "ВЕСЕЛКА", "ВЕРШИНА", "ВИНЯТОК", "ВИСТАВА", "ВИТРАТА", "ГРОМАДА", "ДЕЛЬФІН", "ДЕРЖАВА", "ДЖЕРЕЛО", "ДІАМЕТР", "ДОГОВІР",
        "ДРУЖИНА", "ЕКСПЕРТ", "ЕЛЕМЕНТ", "ЕНЕРГІЯ", "ЗАГРОЗА", "ЗАПИСКА", "ЗАПАСКА", "КАБІНЕТ", "КАРТИНА", "КЕРУНОК", "КИШЕНЯ", "КІМНАТА", "КОВБАСА", "КОМІСІЯ", "КОМАНДА",
        "КОНКУРС", "КОНЦЕРТ", "КОНТОРА", "КОРИДОР", "КРИНИЦЯ", "КРОПИВА", "ЛІКАРНЯ", "ЛІНІЙКА", "МАГАЗИН", "МАЛЮНОК", "МЕТЕЛИК", "МИТНИЦЯ", "МОЛОТОК", "МОЛИТВА", "НАПРУГА",
        "НАСТРІЙ", "ОЛІВЕЦЬ", "ПЕНЗЕЛЬ", "ПЕРЕРВА", "ПИТАННЯ", "ПІДЛОГА", "ПЛАНЕТА", "ПОВІТРЯ", "ПОДАТОК", "ПОЗИЦІЯ", "ПОЛУМ'Я", "ПОМИЛКА", "ПОНЯТТЯ", "ПОРАЗКА", "ПОРЯДОК",
        "ПОСЛУГА", "ПОТРЕБА", "ПОЧУТТЯ", "ПРАВИЛО", "ПРЕДМЕТ", "ПРИКЛАД", "ПРИРОДА", "ПРИЧИНА", "ПРОДУКТ", "ПРОМОВА", "ПРОСТІР", "ПШЕНИЦЯ", "РАДІСТЬ", "РАХУНОК", "РЕАКЦІЯ",
        "РЕКЛАМА", "РЕФОРМА", "РІШЕННЯ", "РОЗКЛАД", "РОЗМОВА", "РУШНИЦЯ", "СВОБОДА", "СЕКУНДА", "СИСТЕМА", "СКЛЯНКА", "СОВІСТЬ", "СОРОЧКА", "СПАЛЬНЯ", "СТАДІОН", "СТОЛИЦЯ",
        "СТУПІНЬ", "ТАРІЛКА", "ТВАРИНА", "ТЕХНІКА", "ТЕЛЕФОН", "ТЕОРЕМА", "ТИЖДЕНЬ", "ТОВАРИШ", "ТРИВОГА", "ТУРБОТА", "УКРАЇНА", "ФАБРИКА", "ФОРМУЛА", "ФУНКЦІЯ", "ХВИЛИНА",
        "ХВОРОБА", "ЧАСТИНА", "ЧЕМПІОН", "ЧИТАННЯ", "ЧОЛОВІК", "ЧОРНИЦЯ"]
      ,
      8: ["БІДНІСТЬ", "ВІДСТАНЬ", "ВІДСОТОК", "ВІДЧУТТЯ", "ВИКЛАДАЧ", "ВИРІШЕННЯ", "ВОДОСПАД", "ВРАЖЕННЯ", "ГАРНІТУР", "ГАРАНТІЯ", "ГОДИННИК", "ГОРОБЕЦЬ", "ДЗЕРКАЛО",
        "ДИРЕКТОР", "ДИСКУСІЯ", "ДІЛЬНИЦЯ", "ДОВКІЛЛЯ", "ДОКУМЕНТ", "ЗАВДАННЯ", "ЗНАЙОМИЙ", "ЗНАЧЕННЯ", "ЗІБРАННЯ", "КАБЛУЧКА", "КАРТОПЛЯ", "КАСТРУЛЯ", "КЕРІВНИК", "КОЛЕКТИВ",
        "КОМЕНТАР", "КОМІРЕЦЬ", "КОНВАЛІЯ", "КОНТЕКСТ", "КОНТРОЛЬ", "КОНФЛІКТ", "КРАВАТКА", "КУЛЬБАБА", "ЛІХТАРИК", "МАЙБУТНЄ", "МАТЕРІАЛ", "МАТЕРИК", "МЕХАНІЗМ", "МІЗИНЕЦЬ",
        "МОРОЗИВО", "МУЗИКАНТ", "НАВУШНИК", "НАВЧАННЯ", "НАПРЯМОК", "НАСЛІДОК", "НЕВІСТКА", "НЕСПОКІЙ", "ОКОЛИЦЯ", "ОРГАНІЗМ", "ПАРАГРАФ", "ПАРАСОЛЯ", "ПАТЕЛЬНЯ", "ПАПІРЕЦЬ",
        "ПАВУТИНА", "ПЕРЕВАГА", "ПЕРЕКЛАД", "ПЕРЕМОГА", "ПЕРСОНАЖ", "ПІСТОЛЕТ", "ПОВЕРХНЯ", "ПОКАЗНИК", "ПОСІБНИК", "ПОТИЛИЦЯ", "ПРИБУТОК", "ПРОБЛЕМА", "ПРОТОКОЛ", "ПРОФЕСІЯ",
        "ПРОВУЛОК", "РЕДАКЦІЯ", "РОБІТНИК", "РОЗРОБКА", "РУКАВИЦЯ", "СВЕКРУХА", "СВІТАНОК", "СЕРВЕТКА", "СИМПАТІЯ", "СЛОВНИК", "СНІДАНОК", "СПІДНИЦЯ", "СТАНДАРТ", "СТОСУНКИ",
        "ТРАДИЦІЯ", "УСТАНОВА", "ХАРАКТЕР", "ХУДОЖНИК", "ЧЕРНЕТКА", "ЧЕРЕВИКИ", "ЧИНОВНИК", "ЩЕПЛЕННЯ", "ЩОДЕННИК"]
  
    };
  
    let currentUser = null;
    let currentStats = {};
    let wordLength = 5;
    let targetWord = '';
    let currentGuess = [];
    let currentRowIndex = 0;
    let isGameOver = false;
    let isAnimating = false;
    let gameMode = 'standard';
    let dailyWords = [];
    let dailyWordIndex = 0;
    let dailyStartTime = null;
    let dailyTimerInterval = null;
  
    // --- Ініціалізація ---
    function init() {
      loadDarkModePreference();
      checkLogin();
      setupEventListeners();
    }
  
    // --- Керування користувачем ---
    function checkLogin() {
      currentUser = localStorage.getItem('wordleCloneUser');
      if (!currentUser) {
        showModal('login-modal');
        resetGameInfo();
      } else {
        loadUserData();
        hideModal('login-modal');
        gameMode = currentStats.preferredMode || 'standard';
        wordLength = currentStats.preferredLength || 5;
        const modeRadio = document.querySelector(`input[name="gameMode"][value="${gameMode}"]`);
        if (modeRadio) modeRadio.checked = true;
        wordLengthSelect.value = wordLength;
        wordLengthSettingDiv.style.display = gameMode === 'standard' ? 'block' : 'none';
  
        startGame();
      }
    }
  
    function handleLogin() {
      const username = usernameInput.value.trim();
      loginError.textContent = '';
      if (username && username.length >= 3) {
        currentUser = username;
        localStorage.setItem('wordleCloneUser', currentUser);
        loadUserData();
        hideModal('login-modal');
        gameMode = 'standard';
        wordLength = 5;
        const modeRadio = document.querySelector(`input[name="gameMode"][value="${gameMode}"]`);
        if (modeRadio) modeRadio.checked = true;
        wordLengthSelect.value = wordLength;
        wordLengthSettingDiv.style.display = 'block';
  
        startGame();
      } else {
        loginError.textContent = 'Логін користувача повинен містити щонайменше 3 символи';
      }
    }
  
    function handleLogout() {
      if (dailyTimerInterval) {
        clearInterval(dailyTimerInterval);
        dailyTimerInterval = null;
        dailyStartTime = null;
      }
      localStorage.removeItem('wordleCloneUser');
      currentUser = null;
      currentStats = {};
      isGameOver = true;
      clearGrid();
      clearKeyboard();
      resetGameInfo();
      hideModal('settings-modal');
      showModal('login-modal');
    }
  
    function loadUserData() {
      if (!currentUser) return;
      const storedData = localStorage.getItem(`wordleCloneStats_${currentUser}`);
      if (storedData) {
        currentStats = JSON.parse(storedData);
        if (!currentStats.guessDistribution) {
          currentStats.guessDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        }
      } else {
        currentStats = {
          gamesPlayed: 0,
          wins: 0,
          currentStreak: 0,
          maxStreak: 0,
          guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
          dailyAttempts: 0,
          dailyWins: 0,
          dailyFastestTime: null,
          lastDailyPlayed: null,
          preferredMode: 'standard',
          preferredLength: 5
        };
      }
    }
  
    function saveUserData() {
      if (!currentUser) return;
      currentStats.preferredMode = gameMode;
      currentStats.preferredLength = wordLength;
      localStorage.setItem(`wordleCloneStats_${currentUser}`, JSON.stringify(currentStats));
    }
  
    // --- Допоміжні функції ---
    function getTodayDateString() {
      return new Date().toISOString().split('T')[0];
    }
  
    function getDailyWords() {
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      const seed = dayOfYear + today.getFullYear();
      let currentSeed = seed;
      const dailySequence = [];
  
      function pseudoRandom() {
        var x = Math.sin(currentSeed++) * 10000;
        return x - Math.floor(x);
      }
  
      for (let i = 0; i < DAILY_WORDS_COUNT; i++) {
        const length = 4 + i;
        const wordList = WORDS[length];
        if (!wordList || wordList.length === 0) {
          console.error(`No words available for length ${length}`);
          dailySequence.push("ERROR");
          continue;
        }
        const randomIndex = Math.floor(pseudoRandom() * wordList.length);
        dailySequence.push(wordList[randomIndex]);
      }
      return dailySequence;
    }
  
    // --- Налаштування гри ---
    function startGame() {
      if (!currentUser) {
        console.log("Cannot start game: No user logged in.");
        resetGameInfo();
        return;
      }
  
      isGameOver = false;
      currentRowIndex = 0;
      currentGuess = [];
      isAnimating = false;
      dailyWordIndex = 0;
      stopDailyTimer();
  
  
      if (gameMode === 'daily') {
        const today = getTodayDateString();
        if (currentStats.lastDailyPlayed === today) {
          showMessage("Сьогодні ви вже виконали щоденний челендж!", "info", 3000);
          gameMode = 'standard';
          const standardRadio = document.querySelector('input[name="gameMode"][value="standard"]');
          if (standardRadio) standardRadio.checked = true;
          wordLengthSettingDiv.style.display = 'block';
          wordLength = currentStats.preferredLength || 5;
          wordLengthSelect.value = wordLength;
        }
      }
  
  
      if (gameMode === 'daily') {
        dailyWords = getDailyWords();
        if (dailyWords.some(word => word === "ERROR" || !word)) {
          showMessage("Помилка завантаження щоденних слів. Перехід у стандартний режим.", "error", 5000);
          gameMode = 'standard';
          wordLength = currentStats.preferredLength || 5;
          targetWord = selectWord(wordLength);
          if (!targetWord) {
            showMessage("Критична помилка: Не завантажено жодного слова!", "error", 10000);
            isGameOver = true;
            resetGameInfo();
            return;
          }
          dailyWordProgressDisplay.style.display = 'none';
          dailyTimerDisplay.style.display = 'none';
  
        } else {
          wordLength = dailyWords[dailyWordIndex].length;
          targetWord = dailyWords[dailyWordIndex];
          dailyWordProgressDisplay.textContent = `Word: ${dailyWordIndex + 1}/${DAILY_WORDS_COUNT}`;
          dailyWordProgressDisplay.style.display = 'inline';
          dailyTimerDisplay.style.display = 'inline';
          dailyTimerDisplay.textContent = 'Time: 0s';
        }
      } else {
        targetWord = selectWord(wordLength);
        dailyWordProgressDisplay.style.display = 'none';
        dailyTimerDisplay.style.display = 'none';
      }
  
      if (!isGameOver && !targetWord) {
        showMessage(`Помилка: Немає слів, доступних за довжиною ${wordLength}. Повертаємося до довжини 5.`, "error", 5000);
        wordLength = 5;
        gameMode = 'standard';
        targetWord = selectWord(wordLength);
        if (!targetWord) {
          showMessage("Критична помилка: Не завантажено жодного слова!", "error", 10000);
          isGameOver = true;
          resetGameInfo();
          return;
        }
        dailyWordProgressDisplay.style.display = 'none';
        dailyTimerDisplay.style.display = 'none';
      }
  
      if (!isGameOver) {
        updateGameInfo();
        createGrid();
        createKeyboard();
      } else {
        resetGameInfo();
      }
    }
  
    function selectWord(length) {
      const availableWords = WORDS[length];
      if (!availableWords || availableWords.length === 0) {
        console.error(`No words available for length ${length}`);
        return null;
      }
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      return availableWords[randomIndex].toUpperCase();
    }
  
    // --- Створення/очищення сітки та клавіатури ---
    function createGrid() {
      gameGrid.innerHTML = '';
      gameGrid.style.gridTemplateColumns = `repeat(${wordLength}, var(--tile-size))`;
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        for (let j = 0; j < wordLength; j++) {
          const tile = document.createElement('div');
          tile.classList.add('tile');
          tile.setAttribute('id', `tile-${i}-${j}`);
          gameGrid.appendChild(tile);
        }
      }
    }
  
    function clearGrid() {
      const tiles = gameGrid.querySelectorAll('.tile');
      tiles.forEach(tile => {
        tile.textContent = '';
        tile.className = 'tile';
      });
    }
  
    function createKeyboard() {
      keyboardContainer.innerHTML = '';
      const keysLayout = ["ЙЦУКЕНГШЩЗХЇ", "ФІВАПРОЛДЖЄ", "ЯЧСМИТЬБЮ"];
      keysLayout.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('keyboard-row');
        if (rowIndex === 2) {
          const enterKey = document.createElement('button');
          enterKey.classList.add('key', 'wide');
          enterKey.textContent = 'Enter';
          enterKey.dataset.key = 'Enter';
          rowDiv.appendChild(enterKey);
        }
        row.split('').forEach(char => {
          const keyButton = document.createElement('button');
          keyButton.classList.add('key');
          keyButton.textContent = char;
          keyButton.dataset.key = char;
          rowDiv.appendChild(keyButton);
        });
        if (rowIndex === 2) {
          const backspaceKey = document.createElement('button');
          backspaceKey.classList.add('key', 'wide');
          backspaceKey.innerHTML = '<i class="fas fa-backspace"></i>';
          backspaceKey.dataset.key = 'Backspace';
          rowDiv.appendChild(backspaceKey);
        }
        keyboardContainer.appendChild(rowDiv);
      });
    }
  
    function clearKeyboard() {
      const keys = keyboardContainer.querySelectorAll('.key');
      keys.forEach(key => {
        key.classList.remove('correct', 'present', 'absent');
      });
    }
  
    // --- Оновлення інтерфейсу ---
    function updateGameInfo() {
      currentModeDisplay.textContent = `Режим: ${gameMode === 'daily' ? 'Щоденний виклик' : 'Класичний'}`;
      wordLengthDisplay.textContent = `Довжина: ${wordLength}`;
    }
  
    function resetGameInfo() {
      currentModeDisplay.textContent = `Режим: -`;
      wordLengthDisplay.textContent = `Довжина: -`;
      dailyTimerDisplay.style.display = 'none';
      dailyWordProgressDisplay.style.display = 'none';
    }
  
  
    // --- Обробка подій ---
    function setupEventListeners() {
      loginButton.addEventListener('click', handleLogin);
      usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
      });
  
      settingsButton.addEventListener('click', () => showModal('settings-modal'));
      statsButton.addEventListener('click', () => showModal('stats-modal'));
      leaderboardButton.addEventListener('click', () => showModal('leaderboard-modal'));
      helpButton.addEventListener('click', () => showModal('help-modal'));
      darkModeToggle.addEventListener('click', toggleDarkMode);
  
      closeButtons.forEach(button => {
        button.addEventListener('click', () => hideModal(button.dataset.modalId));
      });
      window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal') && event.target.classList.contains('active')) {
          if (event.target.id !== 'login-modal') {
            hideModal(event.target.id);
          }
        }
      });
  
      logoutButton.addEventListener('click', handleLogout);
      applySettingsButton.addEventListener('click', applySettings);
      gameModeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          wordLengthSettingDiv.style.display = e.target.value === 'standard' ? 'block' : 'none';
        });
      });
  
      if (resetStatsButton) {
        resetStatsButton.addEventListener('click', handleResetStats);
      }
  
      document.addEventListener('keydown', handleKeyPress);
      keyboardContainer.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button && button.dataset.key) {
          handleKeyPress({ key: button.dataset.key });
        }
      });
    }
  
    function handleKeyPress(event) {
      if (isGameOver || isAnimating || !currentUser) return;
  
      const keyValue = event.key;
      // --- Визначимо допустимі українські літери ---
      const ukrainianAlphabet = "ЙЦУКЕНГШЩЗХЇФІВАПРОЛДЖЄЯЧСМИТЬБЮ";
  
      // --- Перевіряємо, чи це одна з допустимих українських літер ---
      if (keyValue && keyValue.length === 1 && ukrainianAlphabet.includes(keyValue.toUpperCase())) {
        if (currentGuess.length < wordLength) {
          addLetter(keyValue.toUpperCase());
        }
      } else if (keyValue === 'Backspace') {
        removeLetter();
      } else if (keyValue === 'Enter') {
        if (currentGuess.length === wordLength) {
          submitGuess();
        } else {
          showMessage("Не вистачає літер");
          shakeRow(currentRowIndex);
        }
      }
    }
  
    function addLetter(letter) {
      if (currentGuess.length < wordLength) {
        currentGuess.push(letter);
        const tile = getTileElement(currentRowIndex, currentGuess.length - 1);
        if (tile) {
          tile.textContent = letter;
          tile.classList.add('filled', 'pop');
          setTimeout(() => tile.classList.remove('pop'), POP_ANIMATION_DURATION);
        }
      }
    }
  
    function removeLetter() {
      if (currentGuess.length > 0) {
        const tileIndex = currentGuess.length - 1;
        currentGuess.pop();
        const tile = getTileElement(currentRowIndex, tileIndex);
        if (tile) {
          tile.textContent = '';
          tile.classList.remove('filled');
        }
      }
    }
  
    // --- Логіка гри ---
    function submitGuess() {
      if (currentGuess.length !== wordLength || isAnimating || isGameOver) {
        if (currentGuess.length !== wordLength && !isAnimating && !isGameOver) {
          showMessage("Не вистачає літер");
          shakeRow(currentRowIndex);
        }
        return;
      }
  
      const guessWord = currentGuess.join('');
      const wordListForValidation = WORDS[wordLength];
  
      if (!wordListForValidation || !wordListForValidation.includes(guessWord)) {
        showMessage("Немає у списку слів");
        shakeRow(currentRowIndex);
        return;
      }
  
      if (gameMode === 'daily' && !dailyStartTime && dailyWordIndex === 0 && currentRowIndex === 0) {
        startDailyTimer();
        const today = getTodayDateString();
        if (currentUser && currentStats.lastDailyPlayed !== today) {
          currentStats.dailyAttempts = (currentStats.dailyAttempts || 0) + 1;
          saveUserData();
        }
      }
  
      isAnimating = true;
      const result = checkGuess(guessWord, targetWord);
      animateGuess(result).then(() => {
        updateKeyboardColors(result);
        isAnimating = false;
  
        if (guessWord === targetWord) {
          handleWin();
        } else if (currentRowIndex === MAX_ATTEMPTS - 1) {
          handleLoss();
        } else {
          currentRowIndex++;
          currentGuess = [];
        }
      });
    }
  
    function checkGuess(guess, target) {
      const result = Array(wordLength).fill('absent');
      const targetLetters = target.split('');
      const guessLetters = guess.split('');
      const letterCounts = {};
  
      targetLetters.forEach(letter => {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
      });
  
      // --- Перший прохід: правильні (зелені) ---
      for (let i = 0; i < wordLength; i++) {
        if (guessLetters[i] === targetLetters[i]) {
          result[i] = 'correct';
          letterCounts[guessLetters[i]]--;
        }
      }
  
      // --- Другий прохід: присутні (жовті) ---
      for (let i = 0; i < wordLength; i++) {
        if (result[i] !== 'correct' && targetLetters.includes(guessLetters[i]) && letterCounts[guessLetters[i]] > 0) {
          result[i] = 'present';
          letterCounts[guessLetters[i]]--;
        }
      }
      return result;
    }
  
    function handleWin() {
      showMessage(getWinMessage(), "Успіх", 3000);
      isGameOver = true;
  
      updateStats(true, currentRowIndex + 1);
  
      if (gameMode === 'daily') {
        dailyWordIndex++;
        if (dailyWordIndex < DAILY_WORDS_COUNT) {
          showMessage(`Правильно! Наступне слово... (${dailyWordIndex + 1}/${DAILY_WORDS_COUNT})`, "Успіх", 2500);
          setTimeout(() => {
            wordLength = dailyWords[dailyWordIndex].length;
            targetWord = dailyWords[dailyWordIndex];
            currentRowIndex = 0;
            currentGuess = [];
            isGameOver = false;
            updateGameInfo();
            createGrid();
            clearKeyboard();
            dailyWordProgressDisplay.textContent = `Слово: ${dailyWordIndex + 1}/${DAILY_WORDS_COUNT}`;
          }, 2600);
        } else {
          stopDailyTimer();
          const timeTaken = dailyStartTime ? Math.floor((Date.now() - dailyStartTime) / 1000) : null;
  
          const today = getTodayDateString();
          currentStats.lastDailyPlayed = today;
  
          showMessage(`Щоденний челендж завершено! Час: ${timeTaken !== null ? formatTime(timeTaken) : 'N/A'}`, "Успіх", 5000);
          updateDailyStats(true, timeTaken);
          if (timeTaken !== null) {
            updateLeaderboard(currentUser, timeTaken);
          }
          saveUserData();
  
          setTimeout(() => {
            displayStats();
            highlightWinningDistribution(currentRowIndex + 1);
            showModal('stats-modal');
          }, 5100);
        }
      } else {
        saveUserData();
        setTimeout(() => {
          displayStats();
          highlightWinningDistribution(currentRowIndex + 1);
          showModal('stats-modal');
        }, 3100);
      }
    }
  
    function handleLoss() {
      showMessage(`Гру закінчено! Слово: ${targetWord}`, "error", 5000);
      isGameOver = true;
  
      updateStats(false, MAX_ATTEMPTS);
  
      if (gameMode === 'daily') {
        stopDailyTimer();
        const today = getTodayDateString();
        currentStats.lastDailyPlayed = today;
        updateDailyStats(false, null);
        saveUserData();
  
        setTimeout(() => {
          displayStats();
          showModal('stats-modal');
        }, 5100);
      } else {
        saveUserData();
        setTimeout(() => {
          displayStats();
          showModal('stats-modal');
        }, 5100);
      }
    }
  
    function getWinMessage() {
      const messages = ["Геніально!", "Чудово!", "Вражаюче!", "Неймовірно!", "Відмінно!", "Вау!"];
      return messages[currentRowIndex] || "Well Done!";
    }
  
    // --- Анімації та оновлення інтерфейсу ---
    function getTileElement(row, col) {
      const index = row * wordLength + col;
      if (index >= 0 && index < gameGrid.children.length) {
        return gameGrid.children[index];
      }
      return null;
    }
  
    function animateGuess(result) {
      return new Promise(resolve => {
        let delay = 0;
        const totalDuration = wordLength * FLIP_ANIMATION_DURATION;
        for (let i = 0; i < wordLength; i++) {
          const tile = getTileElement(currentRowIndex, i);
          if (!tile) continue;
          setTimeout(() => {
            tile.classList.add('flip');
            setTimeout(() => {
              tile.classList.add(result[i]);
            }, FLIP_ANIMATION_DURATION / 2);
          }, delay);
          delay += FLIP_ANIMATION_DURATION;
        }
        setTimeout(resolve, totalDuration);
      });
    }
  
    function shakeRow(rowIndex) {
      const rowStart = rowIndex * wordLength;
      const rowEnd = rowStart + wordLength;
      if (rowStart < 0 || rowEnd > gameGrid.children.length || rowStart >= rowEnd) {
        console.error("Invalid row indices for shake animation:", rowIndex);
        return;
      }
      const rowTiles = Array.from(gameGrid.children).slice(rowStart, rowEnd);
  
      rowTiles.forEach(tile => tile.classList.add('shake'));
      setTimeout(() => {
        rowTiles.forEach(tile => tile.classList.remove('shake'));
      }, 500);
    }
  
    function updateKeyboardColors(result) {
      const processedGuess = currentGuess.join('');
      for (let i = 0; i < wordLength; i++) {
        const letter = processedGuess[i];
        if (!letter) continue;
        const state = result[i];
        const keyElement = keyboardContainer.querySelector(`[data-key="${letter}"]`);
        if (keyElement) {
          const currentKeyState = keyElement.classList.contains('correct') ? 'correct'
            : keyElement.classList.contains('present') ? 'present'
              : keyElement.classList.contains('absent') ? 'absent'
                : null;
  
          if (state === 'correct') {
            keyElement.classList.remove('present', 'absent');
            keyElement.classList.add('correct');
          } else if (state === 'present' && currentKeyState !== 'correct') {
            keyElement.classList.remove('absent');
            keyElement.classList.add('present');
          } else if (state === 'absent' && !currentKeyState) {
            keyElement.classList.add('absent');
          }
        }
      }
    }
  
    function showMessage(msg, type = "info", duration = MESSAGE_DURATION) {
      messageContainer.textContent = msg;
      messageContainer.className = 'message show';
      if (type) messageContainer.classList.add(type);
  
      if (messageContainer.timeoutId) clearTimeout(messageContainer.timeoutId);
      if (messageContainer.fadeTimeoutId) clearTimeout(messageContainer.fadeTimeoutId);
  
      messageContainer.timeoutId = setTimeout(() => {
        messageContainer.classList.remove('show');
        messageContainer.fadeTimeoutId = setTimeout(() => {
          if (!messageContainer.classList.contains('show')) {
            messageContainer.textContent = '';
            messageContainer.className = 'message';
          }
        }, 500);
      }, duration);
    }
  
    // --- Модальні вікна ---
    function showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        if (modalId === 'stats-modal' && currentUser) {
          displayStats();
          if (isGameOver && currentGuess.join('') === targetWord) {
            setTimeout(() => highlightWinningDistribution(currentRowIndex + 1), 50);
          }
        }
        if (modalId === 'leaderboard-modal') {
          displayLeaderboard();
        }
        modal.classList.add('active');
      }
    }
  
    function hideModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    }
  
    // --- Застосування налаштувань ---
    function applySettings() {
      if (!currentUser) return;
  
      const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
      const selectedLength = parseInt(wordLengthSelect.value, 10);
  
      const today = getTodayDateString();
      if (selectedMode === 'daily' && gameMode !== 'daily' && currentStats.lastDailyPlayed === today) {
        showMessage("Сьогодні ви вже виконали щоденне завдання!", "info", 3000);
        const currentModeRadio = document.querySelector(`input[name="gameMode"][value="${gameMode}"]`);
        if (currentModeRadio) currentModeRadio.checked = true;
        wordLengthSettingDiv.style.display = gameMode === 'standard' ? 'block' : 'none';
        hideModal('settings-modal');
        return;
      }
  
      const modeChanged = selectedMode !== gameMode;
      const lengthChanged = (selectedMode === 'standard' && selectedLength !== wordLength);
      const settingsChanged = modeChanged || lengthChanged;
  
      if (settingsChanged) {
        const oldGameMode = gameMode;
        gameMode = selectedMode;
  
        if (gameMode === 'standard') {
          wordLength = selectedLength;
        }
  
        if (oldGameMode === 'daily' && gameMode !== 'daily' && dailyTimerInterval) {
          stopDailyTimer();
        }
  
        saveUserData();
  
        startGame();
      }
  
      hideModal('settings-modal');
    }
  
  
    // --- Статистика ---
    function updateStats(win, attempts) {
      if (!currentUser || !currentStats) return;
  
      currentStats.gamesPlayed = (currentStats.gamesPlayed || 0) + 1;
      if (!currentStats.guessDistribution) currentStats.guessDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  
      if (win) {
        currentStats.wins = (currentStats.wins || 0) + 1;
        currentStats.currentStreak = (currentStats.currentStreak || 0) + 1;
        currentStats.maxStreak = Math.max(currentStats.maxStreak || 0, currentStats.currentStreak);
        if (attempts >= 1 && attempts <= MAX_ATTEMPTS) {
          currentStats.guessDistribution[attempts] = (currentStats.guessDistribution[attempts] || 0) + 1;
        }
      } else {
        currentStats.currentStreak = 0;
      }
    }
  
    function updateDailyStats(win, timeSeconds) {
      if (!currentUser || !currentStats) return;
  
      currentStats.dailyWins = (currentStats.dailyWins || 0) + (win ? 1 : 0);
  
      if (win && timeSeconds !== null && typeof timeSeconds === 'number') {
        if (currentStats.dailyFastestTime === null || timeSeconds < currentStats.dailyFastestTime) {
          currentStats.dailyFastestTime = timeSeconds;
        }
      }
    }
  
    function handleResetStats() {
      if (!currentUser) return;
      const confirmReset = confirm("Ви впевнені, що хочете скинути всю свою статистику? Ця дія не може бути скасована.");
      if (confirmReset) {
        currentStats = {
          gamesPlayed: 0, wins: 0, currentStreak: 0, maxStreak: 0,
          guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
          dailyAttempts: 0, dailyWins: 0, dailyFastestTime: null,
          lastDailyPlayed: null,
          preferredMode: 'standard',
          preferredLength: 5
        };
        saveUserData();
        displayStats();
        showMessage("Статистика успішно скинута!", "Успіх");
      }
    }
  
    function displayStats() {
      if (!currentUser || !currentStats) {
        statsUsername.textContent = '-';
        statsPlayed.textContent = 0;
        statsWinPercentage.textContent = 0;
        statsCurrentStreak.textContent = 0;
        statsMaxStreak.textContent = 0;
        statsDailySuccessRate.textContent = 'N/A';
        statsDailyFastestTime.textContent = 'N/A';
        statsDistribution.innerHTML = '<p>Зіграйте в гру, щоб побачити свою статистику!</p>';
        return;
      };
  
      statsUsername.textContent = currentUser;
      const gp = currentStats.gamesPlayed || 0;
      const wins = currentStats.wins || 0;
      statsPlayed.textContent = gp;
      statsWinPercentage.textContent = gp > 0 ? Math.round((wins / gp) * 100) : 0;
      statsCurrentStreak.textContent = currentStats.currentStreak || 0;
      statsMaxStreak.textContent = currentStats.maxStreak || 0;
  
      const dailyAttempts = currentStats.dailyAttempts || 0;
      const dailyWins = currentStats.dailyWins || 0;
      statsDailySuccessRate.textContent = dailyAttempts > 0 ? `${Math.round((dailyWins / dailyAttempts) * 100)}%` : 'N/A';
      statsDailyFastestTime.textContent = currentStats.dailyFastestTime !== null ? formatTime(currentStats.dailyFastestTime) : 'N/A';
  
      statsDistribution.innerHTML = '';
      const distribution = currentStats.guessDistribution || {};
      let maxDistributionValue = 0;
      for (let i = 1; i <= MAX_ATTEMPTS; i++) {
        maxDistributionValue = Math.max(maxDistributionValue, distribution[i] || 0);
      }
      if (maxDistributionValue === 0) maxDistributionValue = 1;
  
      for (let i = 1; i <= MAX_ATTEMPTS; i++) {
        const count = distribution[i] || 0;
        const barWidthPercent = (count / maxDistributionValue) * 100;
        const barStyleWidth = `max(8px, ${barWidthPercent}%)`;
  
        const row = document.createElement('div');
        row.classList.add('distribution-row');
        const label = document.createElement('div');
        label.classList.add('distribution-label');
        label.textContent = i;
        row.appendChild(label);
        const barContainer = document.createElement('div');
        barContainer.classList.add('distribution-bar-container');
        const bar = document.createElement('div');
        bar.classList.add('distribution-bar');
        bar.style.width = barStyleWidth;
        bar.textContent = count;
        barContainer.appendChild(bar);
        row.appendChild(barContainer);
        statsDistribution.appendChild(row);
      }
    }
  
    function highlightWinningDistribution(attempts) {
      const rows = statsDistribution.querySelectorAll('.distribution-row');
      if (attempts >= 1 && attempts <= rows.length) {
        rows.forEach((row, index) => {
          const bar = row.querySelector('.distribution-bar');
          if (bar) {
            if (index === attempts - 1) {
              bar.classList.add('highlight');
            } else {
              bar.classList.remove('highlight');
            }
          }
        });
      }
    }
  
    // --- Таблиця лідерів ---
    function getLeaderboard() {
      const storedLeaderboard = localStorage.getItem('wordleCloneLeaderboard');
      try {
        const parsed = storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error("Error parsing leaderboard:", e);
        return [];
      }
    }
  
    function saveLeaderboard(leaderboard) {
      if (Array.isArray(leaderboard)) {
        localStorage.setItem('wordleCloneLeaderboard', JSON.stringify(leaderboard));
      } else {
        console.error("Attempted to save invalid leaderboard data:", leaderboard);
      }
    }
  
    function updateLeaderboard(username, timeSeconds) {
      if (!username || typeof timeSeconds !== 'number' || timeSeconds < 0) return;
  
      const leaderboard = getLeaderboard();
      const today = getTodayDateString();
  
      leaderboard.push({ username: username, time: timeSeconds, date: today });
  
      leaderboard.sort((a, b) => (a.time || Infinity) - (b.time || Infinity));
  
      const top10 = leaderboard.slice(0, 10);
  
      saveLeaderboard(top10);
    }
  
    function displayLeaderboard() {
      const leaderboard = getLeaderboard();
      leaderboardList.innerHTML = '';
  
      if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<li>Поки ніхто не пройшов щоденний челендж. Пройдіть щоденний челендж!</li>';
        return;
      }
  
      leaderboard.forEach((entry, index) => {
        if (!entry || typeof entry.username !== 'string' || typeof entry.time !== 'number' || typeof entry.date !== 'string') {
          console.warn("Skipping invalid leaderboard entry during display:", entry);
          return;
        }
        const li = document.createElement('li');
        const rank = index + 1;
        const usernameSpan = document.createElement('span');
        usernameSpan.textContent = `${rank}. ${entry.username.substring(0, 15)}`;
        const timeSpan = document.createElement('span');
        timeSpan.classList.add('leaderboard-time');
        timeSpan.textContent = `${formatTime(entry.time)} (${entry.date})`;
        li.appendChild(usernameSpan);
        li.appendChild(timeSpan);
        leaderboardList.appendChild(li);
      });
    }
  
    // --- Щоденний таймер ---
    function startDailyTimer() {
      if (dailyTimerInterval) clearInterval(dailyTimerInterval);
      dailyStartTime = Date.now();
      dailyTimerDisplay.textContent = 'Час: 0с';
  
      dailyTimerInterval = setInterval(() => {
        if (dailyStartTime) {
          const elapsedSeconds = Math.floor((Date.now() - dailyStartTime) / 1000);
          dailyTimerDisplay.textContent = `Час: ${formatTime(elapsedSeconds)}`;
        } else {
          stopDailyTimer();
        }
      }, 1000);
    }
  
    function stopDailyTimer() {
      if (dailyTimerInterval) {
        clearInterval(dailyTimerInterval);
        dailyTimerInterval = null;
      }
    }
  
    function formatTime(totalSeconds) {
      if (typeof totalSeconds !== 'number' || totalSeconds < 0 || !Number.isFinite(totalSeconds)) {
        return 'N/A';
      }
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  
    // --- Темний режим ---
    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('wordleCloneDarkMode', isDarkMode ? 'enabled' : 'disabled');
      darkModeToggle.innerHTML = `<i class="fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}"></i>`;
    }
  
    function loadDarkModePreference() {
      const preference = localStorage.getItem('wordleCloneDarkMode');
      const isDarkMode = preference === 'enabled';
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      darkModeToggle.innerHTML = `<i class="fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}"></i>`;
    }
  
    // --- Запуск програми ---
    init();
  
  });