
import Gsap from 'gsap'
const gsap = Gsap;

export const addMdFormOpenFunc = () => {
  gsap.set( '#addMdBg', { display: 'block', opacity: 0 });
  gsap.to( '#addMdBg', { duration: .5, ease: 'power4.out', opacity: .5 });

  gsap.set( '#addMdForm', { display: 'block', opacity: 1, y: '5%' });
  gsap.to( '#addMdForm', { duration: .5, ease: 'power4.out', opacity: 1, y: 0 });
}
export const addMdFormCloseFunc = () => {
  gsap.to( '#addMdBg', { duration: .5, ease: 'power4.out', display: 'none', opacity: 0 });

  gsap.to( '#addMdForm', { duration: .5, ease: 'power4.out', display: 'none', opacity: 0, y: '5%' });
}