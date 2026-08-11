document.addEventListener('DOMContentLoaded', () => {

  const btnDarkMode = document.getElementById('btn-dark-mode');
  const htmlEl = document.documentElement;

  if (btnDarkMode) {
    btnDarkMode.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('isadora-theme', newTheme);
    });

    const savedTheme = localStorage.getItem('isadora-theme');
    if (savedTheme) {
      htmlEl.setAttribute('data-theme', savedTheme);
    }
  }

  const btnLang = document.getElementById('btn-lang');
  let currentLang = 'en';

  function createSplitText(element) {
    if (!element) return;
    const text = element.textContent.trim();
    element.innerHTML = '';
    const words = text.split(' ');

    words.forEach((wordText, wIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';

      Array.from(wordText).forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      element.appendChild(wordSpan);
      if (wIdx < words.length - 1) {
        const space = document.createTextNode(' ');
        element.appendChild(space);
      }
    });
  }

  function setupPouchSplitText() {
    document.querySelectorAll('#pouch-text-overlay .split-text').forEach(el => {
      createSplitText(el);
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    htmlEl.setAttribute('data-lang', lang);
    const translatableElements = document.querySelectorAll('[data-en][data-es]');

    translatableElements.forEach(el => {
      const translation = el.getAttribute(`data-${lang}`);
      if (translation) {
        el.innerHTML = translation;
      }
    });

    setupPouchSplitText();

    if (btnLang) {
      const spans = btnLang.querySelectorAll('span:not(.separator)');
      if (spans.length >= 2) {
        spans[0].style.fontWeight = lang === 'en' ? '900' : '400';
        spans[0].style.opacity = lang === 'en' ? '1' : '0.6';
        spans[1].style.fontWeight = lang === 'es' ? '900' : '400';
        spans[1].style.opacity = lang === 'es' ? '1' : '0.6';
      }
    }
  }

  if (btnLang) {
    btnLang.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'es' : 'en');
    });
    setLanguage('en');
  } else {
    setupPouchSplitText();
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const heroTl = gsap.timeline();
    heroTl
      .from('.hero-frase', {
        opacity: 0,
        y: -30,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.product-col--center', {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'back.out(1.4)'
      }, '-=0.5')
      .from('.product-col--left', {
        opacity: 0,
        x: -50,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.4')
      .from('.product-col--right', {
        opacity: 0,
        x: 50,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.7');


    gsap.from('.stats-trend-text', {
      scrollTrigger: {
        trigger: '.stats-trend',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -100,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from('.stats-map', {
      scrollTrigger: {
        trigger: '.stats-trend',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: 100,
      duration: 1,
      ease: 'power2.out'
    });

    const bagTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.stats-bag-row',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });


    bagTimeline
      .from('.bag-wrapper', {
        opacity: 0,
        x: -80,
        duration: 0.8,
        ease: 'power2.out'
      })
      .from('.stats-numbers', {
        opacity: 0,
        x: 80,
        duration: 0.8,
        ease: 'power2.out'
      }, '<')
      .from('#bag-svg', {
        scale: 0.94,
        duration: 0.5,
        ease: 'back.out(1.4)'
      }, '-=0.2')
      .from('#pouch-num .split-char', {
        opacity: 0,
        scale: 0,
        y: -30,
        rotate: -15,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(2)'
      }, '-=0.3')
      .from('#pouch-body .split-char', {
        opacity: 0,
        y: 25,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.5,
        ease: 'back.out(1.5)'
      }, '-=0.4')
      .from('.stat-item', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4');


    gsap.to('#parallax-plato-1', {
      scrollTrigger: {
        trigger: '.section-quality',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      },
      y: -90,
      rotation: -10,
      ease: 'none'
    });

    gsap.to('#parallax-plato-2', {
      scrollTrigger: {
        trigger: '.section-quality',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: 70,
      rotation: 12,
      ease: 'none'
    });

    gsap.to('#parallax-plato-3', {
      scrollTrigger: {
        trigger: '.section-quality',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.4
      },
      x: -110,
      rotation: 0,
      ease: 'none'
    });

    gsap.from('.quality-content', {
      scrollTrigger: {
        trigger: '.section-quality',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power2.out'
    });

    gsap.from('.feature-item', {
      scrollTrigger: {
        trigger: '.quality-features',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      scale: 0.85,
      stagger: 0.12,
      duration: 0.6,
      ease: 'back.out(1.5)'
    });
  }
});
