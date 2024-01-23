document.addEventListener("DOMContentLoaded", function() {
    let header = document.getElementById("main-header");

    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;

        let scrollThreshold = 10;

        if (scrollPosition > scrollThreshold) {
            header.style.opacity = "0.9"; 
        } else {
            header.style.opacity = "1"; 
        }
    });

    // SLIDER
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    slides[slides.length - 1].classList.add("single-image");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    slider.addEventListener("touchmove", (e) => {
      touchEndX = e.touches[0].clientX;
    });
    
    slider.addEventListener("touchend", () => {
      const swipeThreshold = 50; 
    
      if (window.innerWidth <= 750) {
        if (touchStartX - touchEndX > swipeThreshold) {
          showSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
          showSlide(currentIndex - 1);
        }
      }
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
      });
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle(i === currentIndex);
      });
    
    document.querySelector(".arrow_left").addEventListener("click", () => {
      showSlide(currentIndex - 1);
    });
    
    document.querySelector(".arrow_right").addEventListener("click", () => {
      showSlide(currentIndex + 1);
    });

    showSlide(currentIndex);

    setInterval(() => {
        showSlide(currentIndex + 1);
      }, 5000);

    function showSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
    
      currentIndex = index;
    
      slides.forEach((slide, i) => {
        const opacity = i === currentIndex ? 1 : 0;
        slide.style.opacity = opacity;
      });
    
     
    }
    
    // FAQ!
    document.querySelector('.questions').addEventListener('click', function (event) {
      let target = event.target;
  
      if (target.classList.contains('acc-btn') || target.classList.contains('arrow')) {
          let container = target.closest('.acc-container');
          let content = container.querySelector('.acc-content');
          let arrow = container.querySelector('.arrow');
  
          content.classList.toggle('active');
  
          if (arrow) {
              arrow.style.transform = content.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
          }
  
          let otherContainers = document.querySelectorAll('.acc-container');
          otherContainers.forEach(function (otherContainer) {
              if (otherContainer !== container && otherContainer.querySelector('.acc-content').classList.contains('active')) {
                  otherContainer.querySelector('.acc-content').classList.remove('active');
                  let otherArrow = otherContainer.querySelector('.arrow');
                  if (otherArrow) {
                      otherArrow.style.transform = 'rotate(0deg)';
                  }
              }
          });
      }
  });
  
  // BURGER MENU 
  let toggleNavButton = document.getElementById('toggleNav');
  let navigation = document.querySelector('.navigation');

  toggleNavButton.addEventListener('click', function (event) {
      event.stopPropagation();
      header.style.opacity = 1;
      navigation.classList.toggle('sshow');
      document.body.classList.toggle('no-scroll')

  });
  document.addEventListener('click', function (event) {
    if (navigation.classList.contains('sshow')) { 
      navigation.classList.remove('sshow');
      document.body.classList.remove('no-scroll');
    }
  });

  navigation.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      navigation.classList.remove('sshow');
      document.body.classList.remove('no-scroll');
    }
  });


});