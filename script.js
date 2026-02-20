const defaultConfig = {
  main_title: "Happy Valentine's Day!",
  button_text: "Click for a Surprise 💝",
  letter_title: "Dear, Baba",
  letter_content: `From the moment I met you, my life changed in the most beautiful way. Every day with you feels like a dream I never want to wake up from.

You are my sunshine on cloudy days, my comfort in times of worry, and my greatest adventure. Your smile lights up my world, and your love fills my heart with endless joy.

Thank you for being you, for loving me, and for making every moment we share so incredibly special. I cherish every laugh, every conversation, and every quiet moment together.

Here's to us, to our love, and to all the beautiful memories we'll continue to create together. 💕`,
  signature: "Bf mong pogi,\nTam 💗",
  background_color: "#1a0a0a",
  accent_color: "#ff6b9d",
  text_color: "#ffb6c1",
  button_color: "#ff6b9d",
  letter_bg: "#fffbf0"
};

// Create floating hearts
function createFloatingHearts() {
  const container = document.getElementById('hearts-container');
  const hearts = ['💕', '❤️', '💗', '💖', '💝', '🌹'];
  
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart-bg';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (4 + Math.random() * 4) + 's';
      heart.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(heart);
      
      heart.addEventListener('animationend', () => heart.remove());
    }, i * 400);
  }
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart-bg';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    container.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }, 800);
}

// Flower animation
function createFlowerAnimation() {
  const container = document.getElementById('flower-container');
  const flowers = ['🌸', '🌺', '🌹', '🌷', '💐', '🌻', '🌼', '💮', '🏵️'];
  const petals = ['🌸', '🎀', '💗', '💕'];
  
  // Create bursting flowers
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const flower = document.createElement('div');
      flower.className = 'flower';
      flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      flower.style.left = (10 + Math.random() * 80) + '%';
      flower.style.top = (20 + Math.random() * 60) + '%';
      flower.style.fontSize = (30 + Math.random() * 40) + 'px';
      flower.style.animationDelay = (Math.random() * 0.5) + 's';
      container.appendChild(flower);
    }, i * 100);
  }
  
  // Create falling petals
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.left = Math.random() * 100 + '%';
      petal.style.top = Math.random() * 30 + '%';
      petal.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(petal);
    }, 500 + i * 80);
  }
}

// Show popup with animation
function showFlowerPopup() {
  const popup = document.getElementById('flower-popup');
  const content = document.getElementById('popup-content');
  
  popup.classList.remove('hidden');
  popup.classList.add('flex');
  
  createFlowerAnimation();
  
  setTimeout(() => {
    content.style.opacity = '1';
  }, 2000);
}

// Show letter page
function showLetterPage() {
  document.getElementById('flower-popup').classList.add('hidden');
  document.getElementById('flower-popup').classList.remove('flex');
  document.getElementById('landing-page').classList.add('hidden');
  document.getElementById('letter-page').classList.remove('hidden');
  window.scrollTo(0, 0);
}

// Back to start
function backToStart() {
  document.getElementById('letter-page').classList.add('hidden');
  document.getElementById('landing-page').classList.remove('hidden');
  document.getElementById('flower-container').innerHTML = '';
  document.getElementById('popup-content').style.opacity = '0';
}

// Event listeners
document.getElementById('surprise-btn').addEventListener('click', showFlowerPopup);
document.getElementById('more-surprises-btn').addEventListener('click', showLetterPage);
document.getElementById('back-btn').addEventListener('click', backToStart);

// Initialize floating hearts
createFloatingHearts();

// Element SDK initialization
async function onConfigChange(config) {
  const mainTitle = document.getElementById('main-title');
  const buttonText = document.getElementById('button-text');
  const letterTitle = document.getElementById('letter-title');
  const letterContent = document.getElementById('letter-content');
  const signature = document.getElementById('signature');
  
  if (mainTitle) mainTitle.textContent = config.main_title || defaultConfig.main_title;
  if (buttonText) buttonText.textContent = config.button_text || defaultConfig.button_text;
  if (letterTitle) letterTitle.textContent = config.letter_title || defaultConfig.letter_title;
  
  if (letterContent) {
    const content = config.letter_content || defaultConfig.letter_content;
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    letterContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
  }
  
  if (signature) {
    const sig = config.signature || defaultConfig.signature;
    signature.innerHTML = sig.replace(/\n/g, '<br>');
  }
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => { config.background_color = value; window.elementSdk.setConfig({ background_color: value }); }
      },
      {
        get: () => config.accent_color || defaultConfig.accent_color,
        set: (value) => { config.accent_color = value; window.elementSdk.setConfig({ accent_color: value }); }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => { config.text_color = value; window.elementSdk.setConfig({ text_color: value }); }
      },
      {
        get: () => config.button_color || defaultConfig.button_color,
        set: (value) => { config.button_color = value; window.elementSdk.setConfig({ button_color: value }); }
      },
      {
        get: () => config.letter_bg || defaultConfig.letter_bg,
        set: (value) => { config.letter_bg = value; window.elementSdk.setConfig({ letter_bg: value }); }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || 'Dancing Script',
      set: (value) => { config.font_family = value; window.elementSdk.setConfig({ font_family: value }); }
    },
    fontSizeable: {
      get: () => config.font_size || 16,
      set: (value) => { config.font_size = value; window.elementSdk.setConfig({ font_size: value }); }
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ["main_title", config.main_title || defaultConfig.main_title],
    ["button_text", config.button_text || defaultConfig.button_text],
    ["letter_title", config.letter_title || defaultConfig.letter_title],
    ["letter_content", config.letter_content || defaultConfig.letter_content],
    ["signature", config.signature || defaultConfig.signature]
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}