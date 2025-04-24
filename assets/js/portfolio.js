document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.portfolio-slider', {
      speed: 600,
      loop: true, 
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto', 
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      // Add navigation arrows if desired
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      on: {
          init: function (swiper) {
              if (swiper.slides.length <= 1) {
                  swiper.params.loop = false;
                  swiper.update(); 
                  if(swiper.pagination.el) {
                      swiper.pagination.el.style.display = 'none';
                  }
              } else {
                  if(swiper.pagination.el) {
                       swiper.pagination.el.style.display = 'block';
                  }
              }
          },
          slideChange: function (swiper) {
          }
      }
    });
});