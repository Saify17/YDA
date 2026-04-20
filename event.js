let slideIndex = 1; // current slide index (1-based)
// Cache frequently used DOM collections/elements for performance
const slides = document.getElementsByClassName("mySlides"); // all slide containers
const dots = document.getElementsByClassName("demo"); // all thumbnail images
const captionText = document.getElementById("caption"); // optional caption element (may be null)
showSlides(slideIndex); // render initial slide on load

// Auto-advance every 2 seconds
const AUTO_INTERVAL_MS = 2300; // auto-advance delay in milliseconds
let autoAdvanceInterval = null; // holds setInterval timer id

function startAutoAdvance() { // starts the auto-slide timer
  stopAutoAdvance(); // ensure only one timer runs
  autoAdvanceInterval = setInterval(() => { // set up repeating callback
    plusSlides(1); // move forward by one slide
  }, AUTO_INTERVAL_MS); // every 2 seconds
}

function stopAutoAdvance() { // stops the auto-slide timer
  if (autoAdvanceInterval) { // if a timer is running
    clearInterval(autoAdvanceInterval); // cancel it
    autoAdvanceInterval = null; // reset reference
  }
}

// Pause when tab is hidden, resume when visible
document.addEventListener("visibilitychange", () => { // pause/resume when tab visibility changes
  if (document.hidden) { // if the tab is not visible
    stopAutoAdvance(); // pause auto sliding
  } else { // when the tab becomes visible again
    startAutoAdvance(); // resume auto sliding
  }
});

// Next/previous controls
function plusSlides(n) { // go to next/previous slide
  showSlides(slideIndex += n); // update index and render
}

// Thumbnail image controls
function currentSlide(n) { // jump directly to a specific slide
  showSlides(slideIndex = n); // set index and render
}

// (moved DOM caches above initial render for proper initialization)

function showSlides(n) { // render the slide corresponding to index n
  let i; // loop counter
  if (n > slides.length) {slideIndex = 1} // wrap to first when exceeding last
  if (n < 1) {slideIndex = slides.length} // wrap to last when going before first
  for (i = 0; i < slides.length; i++) { // hide all slides
    slides[i].style.display = "none"; // none = not visible
  }
  for (i = 0; i < dots.length; i++) { // remove active state from all thumbnails
    dots[i].className = dots[i].className.replace(" active", ""); // strip active class suffix
  }
  slides[slideIndex-1].style.display = "block"; // show the current slide
  dots[slideIndex-1].className += " active"; // mark matching thumbnail as active
  if (captionText) { // update caption only if element exists
    captionText.innerHTML = dots[slideIndex-1].alt; // set caption from thumbnail alt text
  }
}

// Start auto-advance after initial render
startAutoAdvance(); // begin auto-advance once initial slide is shown
// ---------------------------------------------
// Scroll-triggered reveal for the content section
// Uses IntersectionObserver to add a class when visible
// This keeps visual logic in CSS and minimizes JS footprint
// ---------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Find the informational content section placed below the slider
  const contentSection = document.querySelector('.content-section');
  if (!contentSection) return; // Guard: if section is missing, do nothing

  // Create an observer that triggers when ~20% of the section is visible
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the class that starts CSS animations
          contentSection.classList.add('reveal');
          // Unobserve to prevent retriggering and save resources
          obs.unobserve(contentSection);
        }
      });
    },
    {
      root: null, // viewport
      threshold: 0.2, // 20% visibility threshold
    }
  );

  observer.observe(contentSection);
});