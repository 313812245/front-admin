<template>
  <transition name="fade">
    <div :class="classes" :style="outerStyles" v-show="show">
      <div :class="innerClasses" :style="styles"></div>
    </div>
  </transition>
</template>
<style>
  .fade-appear,.fade-enter-active{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-play-state:paused;animation-play-state:paused}
  .fade-leave-active{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-play-state:paused;animation-play-state:paused}
  .fade-appear,.fade-enter-active{-webkit-animation-name:myFadeIn;animation-name:myFadeIn;-webkit-animation-play-state:running;animation-play-state:running}
  .fade-leave-active{-webkit-animation-name:myFadeOut;animation-name:myFadeOut;-webkit-animation-play-state:running;animation-play-state:running}
  .fade-appear,.fade-enter-active{opacity:0;-webkit-animation-timing-function:linear;animation-timing-function:linear}
  .fade-leave-active{-webkit-animation-timing-function:linear;animation-timing-function:linear}
  .my-loading-bar {width: 100%;position: fixed;top: 0;left: 0;right: 0;z-index: 2000;}
  .my-loading-bar-inner{-webkit-transition:width .2s linear;transition:width .2s linear}
  .my-loading-bar-inner-color-primary{background-color:#2d8cf0}
  .my-loading-bar-inner-failed-color-error{background-color:#ed4014}
  @-webkit-keyframes myFadeIn{0%{opacity:0}100%{opacity:1}}
  @keyframes myFadeIn{0%{opacity:0}100%{opacity:1}}
  @-webkit-keyframes myFadeOut{0%{opacity:1}100%{opacity:0}}
  @keyframes myFadeOut{0%{opacity:1}100%{opacity:0}}
</style>
<script lang="ts">
const prefixCls = 'my-loading-bar'
export default {
  name: 'ProgressBar',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    failedColor: {
      type: String,
      default: 'error'
    },
    height: {
      type: Number,
      default: 2
    },
    percentage: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls,
      status: 'success'
    }
  },
  computed: {
    percent () {
      return this.percentage
    },
    classes () {
      return `${prefixCls}`
    },
    innerClasses () {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-color-primary`]: this.color === 'primary' && this.status === 'success',
          [`${prefixCls}-inner-failed-color-error`]: this.failedColor === 'error' && this.status === 'error'
        }
      ]
    },
    outerStyles () {
      return {
        height: `${this.height}px`
      }
    },
    styles () {
      const style: any = {
        width: `${this.percent}%`,
        height: `${this.height}px`
      }
      if (this.color !== 'primary' && this.status === 'success') {
        style.backgroundColor = this.color
      }
      if (this.failedColor !== 'error' && this.status === 'error') {
        style.backgroundColor = this.failedColor
      }
      return style
    }
  }
}
</script>
