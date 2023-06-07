import { Teleport } from 'vue'
import { ElProgress } from 'element-plus'

const containerStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '9999'
}
let timer

function clearTimer () {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const progressContainer = document.createElement('div')
Object.assign(progressContainer.style, containerStyle)
document.body.appendChild(progressContainer)

const percentage = reactive({
  value: 0,
  show: false
})

const closeProgressBar = () => {
  hideProgressBar()
  progressContainer.remove()
}
const hideProgressBar = () => {
  setTimeout(() => {
    percentage.show = false
    percentage.value = 0
  }, 800)
}

const vnode = defineComponent({
  setup: () => {
    const showMap = {
      true: 'block',
      false: 'none'
    }
    return () => h(
      Teleport,
      { to: progressContainer },
      h(ElProgress, {
        style: { display: showMap[String(percentage.show)] },
        percentage: percentage.value,
        showText: false,
        color: '#409EFF'
      })
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
