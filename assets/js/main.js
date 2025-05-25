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

  let navbarlinks = select('#navbarNavLISA .scrollto', true); 
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
    let header = select('#header-new'); 
    let navbarElement = select('.custom-navbar');
    let offset = 0;

    if (header && header.classList.contains('fixed-top') && navbarElement) {
      offset = navbarElement.offsetHeight;
    } else if (navbarElement) {
      offset = navbarElement.offsetHeight;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  let selectHeader = select('#header-new'); 
  if (selectHeader) {
    const headerScrolled = () => {
      let navbarElement = select('.custom-navbar');
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
        if (navbarElement) navbarElement.classList.add('navbar-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
        if (navbarElement) navbarElement.classList.remove('navbar-scrolled');
      }
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
    select('.custom-navbar').classList.toggle('navbar-mobile-active-wrapper');
    select('#navbarNavLISA').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault(); 

      let navbarMobileContainer = select('#navbarNavLISA');
      let navbarWrapper = select('.custom-navbar');
      let navbarToggle = select('.mobile-nav-toggle'); 

      scrollto(this.hash);
      
      if (navbarMobileContainer && navbarMobileContainer.classList.contains('navbar-mobile') && navbarToggle) {
        setTimeout(() => {
          navbarMobileContainer.classList.remove('navbar-mobile');
          if (navbarWrapper) navbarWrapper.classList.remove('navbar-mobile-active-wrapper');
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
        slidesPerView: 3,
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

  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

})();
