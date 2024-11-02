import Gsap from 'gsap'
const gsap = Gsap;

export const navOpenFunc = () => {
  gsap.set( '#bg', { display: 'block', opacity: 0 });
  gsap.set( '#nav', { display: 'block', opacity: 1, x: '30%' });
  gsap.to( '#bg', { duration: .5, ease: 'power4.out', opacity: .5 });
  gsap.to( '#nav', { duration: .5, ease: 'power4.out', opacity: 1, x: 0 });
}
export const navCloseFunc = () => {
  gsap.to( '#bg', { duration: .5, ease: 'power4.out', display: 'none', opacity: 0 });
  gsap.to( '#nav', { duration: .5, ease: 'power4.out', display: 'none', opacity: 0, x: '30%' });
}

export const userNavOpenFunc = () => {
  gsap.set( '#userNavCont', { display: 'block', opacity: 0, y: '20%' });
  gsap.to( '#userNavCont', { duration: .5, ease: 'power4.out', opacity: 1, y: 0 });
}
export const userNavCloseFunc = () => {
  gsap.to( '#userNavCont', { duration: .5, ease: 'power4.out', display: 'none', opacity: 0, y: '20%' });
}