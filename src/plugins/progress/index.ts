import { Teleport } from 'vue'
import { ElProgress } from 'element-plus'

const containerStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '9999'
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
  percentage.show = false
  percentage.value = 0
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
    return new Promise<void>((resolve) => {
      percentage.value = 0
      percentage.show = true
      const timer = setInterval(() => {
        percentage.value += Math.floor(Math.random() * 3 + 1)
        if (percentage.value >= 95) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  },
  finish () {
    percentage.value = 100
    setTimeout(() => {
      hideProgressBar()
    }, 800)
  },
  close () {
    hideProgressBar()
  },
  destroy () {
    closeProgressBar()
  }
}
