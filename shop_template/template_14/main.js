document.addEventListener("DOMContentLoaded",function(){
  var catToggles=document.querySelectorAll(".category-toggle");
  catToggles.forEach(function(btn){
    btn.addEventListener("click",function(){
      var wrap=btn.parentElement;
      var sub=wrap.querySelector(".subcategory");
      if(sub){sub.classList.toggle("hidden")}
    });
  });
  var subToggles=document.querySelectorAll(".subcategory-toggle");
  subToggles.forEach(function(btn){
    btn.addEventListener("click",function(){
      var wrap=btn.parentElement;
      var child=wrap.querySelector(".childcategory");
      if(child){child.classList.toggle("hidden")}
    });
  });

  if(window.gsap){
    gsap.from("header",{y:-40,opacity:0,duration:0.5,ease:"power2.out"});
  }

  // Custom Slider Logic
  const slider = document.getElementById('category-slider');
  const prevBtn = document.getElementById('category-prev');
  const nextBtn = document.getElementById('category-next');


// Slider Initialization Function
function initSlider(config) {
    const slider = document.getElementById(config.sliderId);
    const prevBtn = document.getElementById(config.prevBtnId);
    const nextBtn = document.getElementById(config.nextBtnId);

    if (!slider || !prevBtn || !nextBtn) return;

    let currentSlide = 0;

    function getVisibleSlides() {
        if (window.innerWidth >= 1024) return config.visibleLg || 5;
        if (window.innerWidth >= 768) return config.visibleMd || 3;
        return config.visibleSm || 2;
    }

    function updateSlider() {
        const cards = slider.children;
        if (cards.length === 0) return;

        const cardStyle = window.getComputedStyle(cards[0]);
        const gap = 24; // gap-6
        const cardWidth = cards[0].offsetWidth + gap;

        const totalSlides = cards.length;
        const visibleSlides = getVisibleSlides();
        const maxSlide = Math.max(0, totalSlides - visibleSlides);

        // Clamp currentSlide
        if (config.loop !== false) {
            if (currentSlide > maxSlide) currentSlide = 0;
            if (currentSlide < 0) currentSlide = maxSlide;
        } else {
            currentSlide = Math.max(0, Math.min(currentSlide, maxSlide));
        }

        // Handle Navigation Visibility (for specific sections like Category)
        if (config.hideNavAtBounds) {
            if (currentSlide === 0) {
                prevBtn.classList.add('opacity-0', 'invisible');
                prevBtn.classList.remove('opacity-100', 'visible');
            } else {
                prevBtn.classList.remove('opacity-0', 'invisible');
                prevBtn.classList.add('opacity-100', 'visible');
            }

            if (currentSlide >= maxSlide) {
                nextBtn.classList.add('opacity-0', 'invisible');
                nextBtn.classList.remove('opacity-100', 'visible');
            } else {
                nextBtn.classList.remove('opacity-0', 'invisible');
                nextBtn.classList.add('opacity-100', 'visible');
            }
        }

        const offset = currentSlide * cardWidth;
        slider.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const totalSlides = slider.children.length;
        const visibleSlides = getVisibleSlides();
        const maxSlide = Math.max(0, totalSlides - visibleSlides);

        if (currentSlide >= maxSlide) {
            if (config.loop !== false) currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        const totalSlides = slider.children.length;
        const visibleSlides = getVisibleSlides();
        const maxSlide = Math.max(0, totalSlides - visibleSlides);

        if (currentSlide <= 0) {
            if (config.loop !== false) currentSlide = maxSlide;
        } else {
            currentSlide--;
        }
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);

    // Auto-slide
    if (config.autoSlide !== false) {
        setInterval(() => {
            const totalSlides = slider.children.length;
            const visibleSlides = getVisibleSlides();
            const maxSlide = Math.max(0, totalSlides - visibleSlides);

            if (currentSlide >= maxSlide) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateSlider();
        }, 5000);
    }

    // Initial check
    updateSlider();
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Featured Products Slider
    initSlider({
        sliderId: 'featured-slider',
        prevBtnId: 'featured-prev',
        nextBtnId: 'featured-next',
        visibleLg: 5,
        visibleMd: 3,
        visibleSm: 2
    });

    // Initialize Flash Sale Slider
    initSlider({
        sliderId: 'flash-slider',
        prevBtnId: 'flash-prev',
        nextBtnId: 'flash-next',
        visibleLg: 4,
        visibleMd: 3,
        visibleSm: 2
    });

    // Initialize Category Collections Slider
    initSlider({
        sliderId: 'category-slider',
        prevBtnId: 'category-prev',
        nextBtnId: 'category-next',
        visibleLg: 5,
        visibleMd: 3,
        visibleSm: 2,
        hideNavAtBounds: true,
        loop: false,
        autoSlide: false
    });
});

// Add any custom interactivity here that isn't handled by Flowbite

// Example: Simple cart counter animation (demo purpose)
const cartButtons = document.querySelectorAll('button');
cartButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.querySelector('svg path[d="M12 4v16m8-8H4"]')) { // checks if it's an add to cart button
            // Visual feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = `<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;
            setTimeout(() => {
                this.innerHTML = `<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 1000);
            }, 600);
        }
    });
});
// Flash Sale Countdown Timer
function startFlashSaleTimer() {
    const timerElement = document.getElementById('flash-sale-timer');
    if (!timerElement) return;

    const hoursEl = timerElement.querySelector('.hours');
    const minsEl = timerElement.querySelector('.minutes');
    const secsEl = timerElement.querySelector('.seconds');

    // Set a random end time for demo (e.g., 24 hours from now)
    let totalSeconds = (24 * 60 * 60) + (15 * 60) + 45;

    const interval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(interval);
            return;
        }

        totalSeconds--;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        hoursEl.textContent = String(h).padStart(2, '0');
        minsEl.textContent = String(m).padStart(2, '0');
        secsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    startFlashSaleTimer();

    // Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight / 2) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-10');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-10');
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
