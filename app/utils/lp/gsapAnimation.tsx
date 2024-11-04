import Gsap from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger";

const gsap = Gsap;
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(ScrollTrigger);

export const parallaxImg = () => {
  const parallaxElm: Array<HTMLElement> = gsap.utils.toArray(".parallaxImg");
  parallaxElm.forEach((e) => {
    gsap.fromTo( e,
      { x: 0 },
      {
        x: -300,
        scrollTrigger: {
          trigger: e,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          // markers: true
        }
      }
    );
  });
}
export const toLpContent = () => {
  const header = document.getElementById('header');
  const lpContent = document.querySelectorAll('.lpContent');
  const pageLinkButton = document.querySelectorAll('.pageLinkButton');

  for( let i = 0; i < pageLinkButton.length; i++ ){
    pageLinkButton[i].addEventListener("click", () => {
      if(header){
        const headerHeight = header.clientHeight;
        const num = Number(pageLinkButton[i].getAttribute('data-num'));
        const lpContentY = lpContent[num].getBoundingClientRect().top + window.scrollY;

        gsap.set( window, {scrollTo: { y: lpContentY - headerHeight - 150}});
        gsap.to( window, { duration: .7, ease: 'power4.out',scrollTo: { y: lpContentY - headerHeight}});
      }
    });
  }
}
export const fvAnimation = () => {
  const header = document.getElementById('header');
  const fv = document.getElementById('fv');
  const fvSwiper = document.getElementById('fvSwiper');
  const subTitle = document.getElementById('subTitle');

  gsap.set( [fv, subTitle], { opacity: 0 });
  gsap.set( header, { opacity: 0, y: '-40%' });
  gsap.set( fvSwiper, { opacity: 0, scale: 1.05 });
  gsap.set( '#title span', { opacity: 0, y: '10%', scale: .5, transformOrigin: '50% 100%', display: 'inline-block', willChange: 'transform' });

  gsap.to( fv, { duration: .7, ease: 'power4.out', opacity: 1, delay: .3 });
  gsap.to( header, { duration: 1, ease: 'power4.out', opacity: 1, y: 0, delay: .5 });
  gsap.to( fvSwiper, { duration: 1.5, ease: "power4.out", opacity: 1, scale: 1, delay: .5 });
  gsap.to( subTitle, { duration: .7, ease: 'power4.out', opacity: 1, y: 0, delay: 1 });
  gsap.to( '#title span', { duration: .5, ease: 'power4.out', opacity: 1, y: 0, scale: 1, stagger: .03, delay: 1 });
}