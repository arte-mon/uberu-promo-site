import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm/ScrollTrigger";
import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm";

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
