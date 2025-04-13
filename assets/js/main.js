/**
 * Template Name: Selecao
 * Updated: Mar 10 2023 with Bootstrap v5.2.3
 * Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      (all ? selectEl.forEach(e => e.addEventListener(type, listener)) : selectEl.addEventListener(type, listener));
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) ? navbarlink.classList.add('active') : navbarlink.classList.remove('active');
    });
  };

  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      (window.scrollY > 100) ? selectHeader.classList.add('header-scrolled') : selectHeader.classList.remove('header-scrolled');
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      (window.scrollY > 100) ? backtotop.classList.add('active') : backtotop.classList.remove('active');
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault(); 

      let navbar = select('#navbar');
      let navbarToggle = select('.mobile-nav-toggle'); 

      scrollto(this.hash);
      
      if (navbar.classList.contains('navbar-mobile') && navbarToggle) {
        setTimeout(() => {
          navbar.classList.remove('navbar-mobile'); 
          navbarToggle.classList.remove('bi-x');   
          navbarToggle.classList.add('bi-list');
        }, 300); 
      }
    }
  }, true);

  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      let portfolioFilters = select('#portfolio-flters li', true); 

      on('click', '#portfolio-flters li', function(e) { 
        e.preventDefault();
        portfolioFilters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', () => {
          AOS.refresh()
        });
      }, true);
    }
  });

  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  new Swiper('.testimonials-slider', {
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
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3, // Garanta que haja pelo menos 3 slides para isso funcionar bem
        spaceBetween: 20
      }
    }
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  // Adicionando o preloader se ele existir no HTML original (presumindo que existia)
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

})();