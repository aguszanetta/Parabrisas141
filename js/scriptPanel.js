(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    console.log("AAAA")
    $("body").toggleClass("sidebar-toggled sidebar-icon-only");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      //Sidebar cerrada
      $("#turnosNav").attr("data-bs-target", "#dummy-target")
      $("#collapseTurnos > ul").removeClass("bg-white py-2 collapse-inner rounded")
      $("#collapseTurnos > ul > li").addClass("nav-item")
      $("#collapseTurnos > ul > li > a").addClass("nav-link")
      $("#collapseTurnos > ul > li > a").removeClass("collapse-item")

      $("#lpNav").attr("data-bs-target", "#dummy-target")
      $("#collapseLp > ul").removeClass("bg-white py-2 collapse-inner rounded")
      $("#collapseLp > ul > li").addClass("nav-item")
      $("#collapseLp > ul > li > a").addClass("nav-link")
      $("#collapseLp > ul > li > a").removeClass("collapse-item")
      
      $("#collapseTurnos").removeClass("show")
      $("#collapseLp").removeClass("show")
    }else{
      //Sidebar extendida
      $("#turnosNav").attr("data-bs-target", "#collapseTurnos")
      $("#collapseTurnos > ul").addClass("bg-white py-2 collapse-inner rounded")
      $("#collapseTurnos > ul > li").removeClass("nav-item")
      $("#collapseTurnos > ul > li > a").removeClass("nav-link")
      $("#collapseTurnos > ul > li > a").addClass("collapse-item")

      $("#lpNav").attr("data-bs-target", "#collapseLp")
      $("#collapseLp > ul").addClass("bg-white py-2 collapse-inner rounded")
      $("#collapseLp > ul > li").removeClass("nav-item")
      $("#collapseLp > ul > li > a").removeClass("nav-link")
      $("#collapseLp > ul > li > a").addClass("collapse-item")
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      //$('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict
