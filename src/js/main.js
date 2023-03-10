import Swiper, {Navigation, EffectFade} from 'swiper'
import 'simplebar'
Swiper.use([EffectFade])

const progressbar = document.querySelector('.m-quiz__scrollbar-fill')
let activeSlide
let inputsNum
let inputsText
let inputs

const nextBtn = document.querySelector('.m-quiz__btn--next')

function getActiveInputs(slider) {
  activeSlide = slider.slides[slider.activeIndex]
  inputsNum = activeSlide.querySelectorAll('input[required][type=number]')
  inputsText = activeSlide.querySelectorAll('input[required][type=text]')
  inputs = [...inputsNum, ...inputsText]
}

function progressbarUpdate(slider) {
  progressbar.style.width =
    ((slider.activeIndex + 1) / slider.slides.length) * 100 + '%'
}

const swiper = new Swiper('.swiper', {
  threshold: 10,
  spaceBetween: 100,
  speed: 250,
  effect: 'fade',
  initialSlide: 0,
  allowTouchMove: false,
  noSwiping: true,
  autoHeight: true,
  observer: true,
  fadeEffect: {
    crossFade: true
  },
  on: {
    init: (swiper) => {
      getActiveInputs(swiper)
      progressbarUpdate(swiper)
    },
    resize: (swiper) => {
      // swiper.updateAutoHeight(1000)
    },
    observerUpdate() {
      // swiper.updateAutoHeight(1000)
    }
  },
  modules: [Navigation],
  navigation: {
    nextEl: '.m-quiz__btn--next',
    prevEl: '.m-quiz__btn--prev'
  }
})

window.addEventListener('resize', resizeThrottler, false)

var resizeTimeout
function resizeThrottler() {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(function () {
      resizeTimeout = null
      actualResizeHandler()

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66)
  }
}

function actualResizeHandler() {
  console.log('resize')
  swiper.updateAutoHeight(1000)
}

const isInputsValid = () => {
  let allowMove = true

  inputs.forEach((input) => {
    if (input.value === '') {
      allowMove = false
    }
  })

  if (allowMove) {
    nextBtn.disabled = false
  } else {
    nextBtn.disabled = true
  }
}

function checkQuizValidation(inputs) {
  isInputsValid()

  inputs.forEach((input) => {
    input.addEventListener('input', isInputsValid)
  })
}

swiper.on('slideChange', () => {
  getActiveInputs(swiper)
  checkQuizValidation(inputs)
  progressbarUpdate(swiper)
})

swiper.on('beforeSlideChangeStart', () => {
  inputs.forEach((input) => {
    input.removeEventListener('input', isInputsValid)
  })
})

function updateDiscount(selector, num) {
  let elements = document.querySelectorAll(selector)

  elements.forEach((el) => {
    el.innerHTML = num
  })
}

function watchSlidesProgress(selector) {
  const items = document.querySelectorAll(selector)
  const prevBtn = document.querySelector('.m-quiz__btn--prev')
  const nextBtn = document.querySelector('.m-quiz__btn--next')

  items.forEach((el) => {
    const current = el.querySelector('.js-current')
    const total = el.querySelector('.js-total')
    let discount = 250

    current.innerHTML = `???????????? ${swiper.activeIndex + 1}`
    total.innerHTML = swiper.slides.length - 1

    swiper.on('slideChange', () => {
      if (swiper.activeIndex + 1 === swiper.slides.length) {
        el.innerHTML = '????????????'
        prevBtn.classList.add('hide')
        nextBtn.classList.add('hide')
        updateDiscount('.js-discount', discount)
      } else {
        discount = (swiper.activeIndex + 1) * 250
        current.innerHTML = `???????????? ${swiper.activeIndex + 1}`
        updateDiscount('.js-discount', discount)
      }
    })
  })
}

watchSlidesProgress('.js-slides-progress')

const connectionTypes = [
  {
    name: 'whatsapp',
    text: '?????? ?????????? ?? Whatsapp',
    nameAttr: 'Whatsapp ??????????'
  },
  {
    name: 'telegram',
    text: '?????? ?????????? ?? Telegram',
    nameAttr: 'Telegram ??????????'
  },
  {
    name: 'phone',
    text: '?????? ?????????? ????????????????',
    nameAttr: '?????????? ????????????????'
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
      target.value = ''
      target.name = currentConnection.nameAttr
      target.placeholder = currentConnection.text
      target.focus()
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
      isInputsValid()
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

// ?????? ???????????? ?????? ???????????????? ?????????? ???? AJAX ?????????? ?????????????? ???? ???????????? ??????????????
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

  var dataPost
  // ?????????????????? ???????????? ???????????? ?????? ????????????????
  data.forEach(function (value, key) {
    dataPost += '&' + key + '=' + value
  })

  console.log(dataPost)
  request.send(dataPost)
}

const form = document.querySelector('.m-quiz__slider')
form.addEventListener('submit', submitHandler)

function customSelect() {
  // ???????????????? ?????? ???????????? forEach ?????? NodeList
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this)
      }
    }
  }

  document.querySelectorAll('.m-dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.m-dropdown__button')
    const dropDownList = dropDownWrapper.querySelector('.m-dropdown__list')
    const dropDownListItems = dropDownList.querySelectorAll(
      '.m-dropdown__list-item'
    )
    const dropDownInput = dropDownWrapper.querySelector(
      '.m-dropdown__input-hidden'
    )

    // ???????? ???? ????????????. ??????????????/?????????????? select
    dropDownBtn.addEventListener('click', function (e) {
      dropDownList.classList.toggle('m-dropdown__list--visible')
      this.classList.toggle('m-dropdown__button--active')

      console.log(dropDownInput.value)
    })

    // ?????????? ???????????????? ????????????. ?????????????????? ?????????????????? ????????????????. ?????????????? ????????????????
    dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation()
        dropDownBtn.innerText = this.innerText
        dropDownBtn.focus()
        dropDownInput.value = this.dataset.value
        dropDownList.classList.remove('m-dropdown__list--visible')
        dropDownBtn.classList.remove('m-dropdown__button--active')
      })
    })

    // ???????? ?????????????? ??????????????????. ?????????????? ????????????????
    document.addEventListener('click', function (e) {
      if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('m-dropdown__button--active')
        dropDownList.classList.remove('m-dropdown__list--visible')
      }
    })

    // ?????????????? ???? Tab ?????? Escape. ?????????????? ????????????????
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('m-dropdown__button--active')
        dropDownList.classList.remove('m-dropdown__list--visible')
      }
    })
  })
}

customSelect()
