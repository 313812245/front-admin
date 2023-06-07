import Bar from './bar.vue'

const percentage = reactive({
  value: 0,
  show: false
})

let timer

const clearTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const progressContainer = document.createElement('div')
document.body.appendChild(progressContainer)

const closeProgressBar = () => {
  hideProgressBar()
  progressContainer.remove()
}

const hideProgressBar = () => {
  setTimeout(() => {
    percentage.show = false
    setTimeout(() => {
      percentage.value = 0
    }, 300)
  }, 300)
}

const vnode = defineComponent({
  setup: () => {
    return () => h(
      Bar, {
        percentage: percentage.value,
        show: percentage.show
      }
    )
  }
})

const app = createApp(vnode)
app.mount(progressContainer)

export default {
  start () {
    if (timer) return
    percentage.value = 0
    percentage.show = true
    timer = setInterval(() => {
      percentage.value += Math.floor(Math.random() * 3 + 1)
      if (percentage.value >= 95) {
        clearTimer()
      }
    }, 200)
  },
  finish () {
    clearTimer()
    percentage.value = 100
    hideProgressBar()
  },
  close () {
    clearTimer()
    hideProgressBar()
  },
  destroy () {
    clearTimer()
    closeProgressBar()
  }
}
