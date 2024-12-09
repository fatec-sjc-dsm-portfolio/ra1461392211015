$(document).ready(function () {
  /*NAVBAR CODIGO*/
  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
  });

  var typed = new Typed(".typing", {
    strings: ["Desenvolvedor.", "Designer."],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: ["Desenvolvedor FullStack.", "Designer Digital."],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });
  /*Carrossel*/
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplayTimeout: 2000,
    autoplayHoverPauser: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const workCards = document.querySelectorAll(".work-card");
  const modalTitle = document.getElementById("workModalLabel");
  const modalContent = document.getElementById("workModalContent");
  const modalContent2 = document.getElementById("workModalContentTwo");
  const modalContent3 = document.getElementById("workModalContentThree");

  workCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title");
      const content = card.getAttribute("data-content");
      const content2 = card.getAttribute("data-content-two");
      const content3 = card.getAttribute("data-content-three");

      modalTitle.textContent = title;
      modalContent.textContent = content;
      modalContent2.textContent = content2;
      modalContent3.textContent = content3;
    });
  });
});
