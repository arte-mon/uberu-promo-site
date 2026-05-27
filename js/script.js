import gsap from "https://cdn.skypack.dev/gsap@3.15.0";
import ScrollTrigger from "https://cdn.skypack.dev/gsap@3.15.0/ScrollTrigger";
import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.mjs";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const path = document.getElementById("stroke-path");
  const heroImgWrapper = document.querySelector(".hero-img-wrapper");

  ScrollTrigger.create({
    trigger: ".spotlight",
    start: "top top",
    end: "bottom bottom",
    onEnter: () => initPathAnimation(),
    onRefresh: () => initPathAnimation(),
  });

  function initPathAnimation() {
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".spotlight",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  // Анимация изображения героя: перемещение из hero в spotlight
  if (heroImgWrapper) {
    const svgPathElement = document.querySelector(".svg-path");

    // Позиция остановки - верхняя точка SVG пути (где начинается отрисовка линии)
    const targetTop = svgPathElement
      ? svgPathElement.offsetTop + 20 // +20px отступ сверху SVG контейнера
      : window.innerHeight * 0.2;

    // Начальная позиция картинки (внизу hero секции)
    const initialRect = heroImgWrapper.getBoundingClientRect();
    const initialTop = initialRect.top + window.scrollY;

    // Вычисляем расстояние для анимации
    const distanceToTravel = targetTop - initialTop;

    // Создаем timeline для плавного перехода
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "bottom top",
          end: "+=800", // 800px скролл для анимации перемещения
          scrub: true,
        },
      })
      .to(heroImgWrapper, {
        y: distanceToTravel,
        ease: "none",
      });

    // Когда доходим до начала линии - фиксируем позицию
    ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top+=200 center", // Начинаем фиксировать когда spotlight чуть появился
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        // Фиксируем изображение в позиции начала SVG пути
        gsap.set(heroImgWrapper, {
          position: "absolute",
          top: "20svh", // Позиция совпадает с top: 20svh у .svg-path
          left: "50%",
          transform: "translateX(-50%)",
          y: 0,
        });
      },
    });
  }

  // Анимация появления карточек при скролле
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
});
