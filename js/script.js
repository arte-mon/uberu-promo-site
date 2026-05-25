import gsap from "https://cdn.skypack.dev/gsap@3.15.0";
import ScrollTrigger from "https://cdn.skypack.dev/gsap@3.15.0/ScrollTrigger";
import Lenis from "https://cdn.skypack.dev/lenis@1.3.23";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const path = document.getElementById("stroke-path");

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
});
