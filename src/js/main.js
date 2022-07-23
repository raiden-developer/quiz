import Swiper, {Scrollbar, Navigation, EffectFade} from 'swiper'
import 'simplebar'

Swiper.use([EffectFade])

const swiper = new Swiper('.swiper', {
  threshold: 10,
  spaceBetween: 100,
  speed: 250,
  effect: 'fade',
  initialSlide: 0,
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

const connectionTypes = [
  {
    name: 'whatsapp',
    text: 'Ваш номер в Whatsapp',
    nameAttr: 'Whatsapp номер'
  },
  {
    name: 'telegram',
    text: 'Ваш номер в Telegram',
    nameAttr: 'Telegram номер'
  },
  {
    name: 'phone',
    text: 'Ваш номер телефона',
    nameAttr: 'Номер телефона'
  }
]

function selectConnectionType(connectionTypes, selector, targetSelector) {
  const elements = document.querySelectorAll(selector)
  const target = document.querySelector(targetSelector)
  let lastElement = null

  elements.forEach((el) => {
    if (el.classList.contains('active')) lastElement = el

    const currentConnection = connectionTypes.find((connection) => {
      return connection.name === el.getAttribute('data-connection')
    })

    el.addEventListener('click', () => {
      if (lastElement) lastElement.classList.remove('active')
      target.name = currentConnection.nameAttr
      target.placeholder = currentConnection.text
      el.classList.add('active')
      lastElement = el
    })
  })
}

selectConnectionType(
  connectionTypes,
  '.m-quiz__social-btn',
  '.m-quiz__final-number input'
)
