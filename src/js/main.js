import Swiper, {Navigation, EffectFade, Pagination} from 'swiper'
import 'simplebar'

Swiper.use([EffectFade])

const swiper = new Swiper('.swiper', {
  threshold: 10,
  spaceBetween: 100,
  speed: 250,
  effect: 'fade',
  initialSlide: 0,
  allowTouchMove: false,
  noSwiping: true,
  autoHeight: true,
  fadeEffect: {
    crossFade: true
  },
  on: {
    init: (swiper) => {}
  },
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.m-quiz__btn--next',
    prevEl: '.m-quiz__btn--prev'
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar'
  }
})

function checkQuizValidation(inputs) {
  const nextBtn = document.querySelector('.m-quiz__btn--next')
  let allowMove = false

  const isInputsValid = (inputs) => {
    allowMove = true
    inputs.forEach((input) => {
      if (input.value === '') {
        allowMove = false
      }
    })

    if (allowMove) {
      nextBtn.disabled = false
    } else [(nextBtn.disabled = true)]
  }

  isInputsValid(inputs)

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isInputsValid(inputs)
    })
  })
}

swiper.on('slideChange', () => {
  let activeSlide = swiper.slides[swiper.activeIndex]
  let inputsNum = activeSlide.querySelectorAll('input[required][type=number]')
  let inputsText = activeSlide.querySelectorAll('input[required][type=text]')
  let inputs = [...inputsNum, ...inputsText]

  checkQuizValidation(inputs)
})

function watchSlidesProgress(selector) {
  const items = document.querySelectorAll(selector)
  const prevBtn = document.querySelector('.m-quiz__btn--prev')
  const nextBtn = document.querySelector('.m-quiz__btn--next')

  items.forEach((el) => {
    const current = el.querySelector('.js-current')
    const total = el.querySelector('.js-total')

    current.innerHTML = `Вопрос ${swiper.activeIndex + 1}`
    total.innerHTML = swiper.slides.length - 1

    swiper.on('slideChange', () => {
      if (swiper.activeIndex + 1 === swiper.slides.length) {
        el.innerHTML = 'Готово'
        prevBtn.classList.add('hide')
        nextBtn.classList.add('hide')
      } else {
        current.innerHTML = `Вопрос ${swiper.activeIndex + 1}`
      }
    })
  })
}
watchSlidesProgress('.js-slides-progress')

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

function numberControls(selector) {
  let numbers = document.querySelectorAll(selector)

  function inputValidation(number) {
    if (number <= 0) return 1
    return number
  }

  numbers.forEach((el) => {
    const increase = el.querySelector('.m-number__control--inc')
    const decrease = el.querySelector('.m-number__control--dec')
    const input = el.querySelector('.m-number__field')

    increase.addEventListener('click', () => {
      input.value = inputValidation(+input.value + 1)
    })

    decrease.addEventListener('click', () => {
      input.value = inputValidation(+input.value - 1)
    })
  })
}

numberControls('.js-number-input')

function fileInputs(selector) {
  const fileInputs = document.querySelectorAll(selector)

  fileInputs.forEach((input) => {
    const field = input.querySelector('input[type=file]')
    const text = input.querySelector('.m-file__text')

    field.addEventListener('change', (e) => {
      const files = e.currentTarget.files
      const keys = Object.keys(files)
      const fileNames = []

      keys.forEach((key) => {
        fileNames.push(files[key].name)
      })

      text.innerHTML = fileNames.join(' , ')
    })
  })
}

fileInputs('.m-file')

function submitHandler(e) {
  e.preventDefault()

  var request = new XMLHttpRequest()

  request.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    }
  }

  request.open(this.method, this.action, true)
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

  var data = new FormData(this)
  console.log(data)
  var dataPost
  // Формируем массив данных для отправки
  data.forEach(function (value, key) {
    dataPost += '&' + key + '=' + value
  })

  console.log(dataPost)

  request.send(dataPost)
}

const form = document.querySelector('.m-quiz__slider')
form.addEventListener('submit', submitHandler)
