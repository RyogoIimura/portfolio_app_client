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
        gsap.to( window, {duration: .7, ease: 'power4.out',scrollTo: { y: lpContentY - headerHeight}});
      }
    });
  }
}