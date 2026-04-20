// Speaker swiper js code 

document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: false,
    loop: true,
    speed: 1000,
    autoplay: false, // Start with autoplay disabled
    watchSlidesProgress: true,
    pauseOnLastSlide: true,
    waitForTransition: true,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      hideOnClick: false,
      enabled: true,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    },
    on: {
      init: function () {
        console.log('Swiper initialized successfully');
      },
      reachEnd: function () {
        // Pause at the end
        swiper.autoplay.stop();
        
        // Wait for 2 seconds then restart from beginning
        setTimeout(() => {
          swiper.slideTo(0, 0); // Go to first slide instantly
          setTimeout(() => {
            swiper.autoplay.start(); // Restart autoplay after positioning
          }, 100);
        }, 1700);
      }
    }
  });

  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start autoplay when the slider comes into view
        swiper.params.autoplay = {
          delay: 1400,
          disableOnInteraction: false,
          pauseOnLastSlide: true,
          waitForTransition: true
        };
        swiper.autoplay.start();
        
        // Optional: Stop observing after starting
        observer.unobserve(entry.target);
      } else {
        // Optional: Pause when out of view
        swiper.autoplay.stop();
      }
    });
  }, {
    // Observer options
    threshold: 0.2, // Start when 20% of the slider is visible
    rootMargin: '50px' // Start slightly before the slider comes into view
  });

  // Start observing the slider
  const swiperElement = document.querySelector('.mySwiper');
  if (swiperElement) {
    observer.observe(swiperElement);
  }
});









// contact scrooll trigger


  document.querySelectorAll('.scroll-to-footer').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const footer = document.querySelector('.section-dark');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });




  //scrolling animation for join as ambassdor  section

  