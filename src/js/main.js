import Swiper, {Scrollbar, Navigation, EffectFade} from 'swiper'
import 'simplebar'

Swiper.use([EffectFade])

const swiper = new Swiper('.swiper', {
  threshold: 10,
  spaceBetween: 100,
  speed: 250,
  effect: 'fade',
  initialSlide: 4,
  fadeEffect: {
    crossFade: true
  },

  modules: [Scrollbar, Navigation],
  scrollbar: {
    el: '.swiper-scrollbar'
  },
  navigation: {
    nextEl: '.m-quiz__btn--next',
    prevEl: '.m-quiz__btn--prev'
  }
})
