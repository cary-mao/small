const winHeight = document.documentElement.clientHeight
const blockMinHeightRatio = 0.2
const blockMaxHeightRatio = 1
const dividerRatio = 0.5
const blockMinHeight = winHeight * blockMinHeightRatio
const blockMaxHeight = winHeight * blockMaxHeightRatio

const block = document.querySelector('.slide-up-block')
const main = document.querySelector('.main')
block.style.height = blockMinHeight + 'px'

let startY = 0
let endY = 0
let originHeight

block.addEventListener('touchstart', (e) => {
  originHeight = block.clientHeight
  startY = e.changedTouches[0].clientY
  document.addEventListener('touchmove', onTouchMove, {passive: true}, true)
}, {passive: true})

block.addEventListener('touchend', (e) => {
  main.style.transition = 'opacity .5s ease'
  if (block.clientHeight < winHeight * dividerRatio) {
    block.style.transition = 'height .5s ease-out'
    block.style.height = blockMinHeight + 'px'
    main.style.opacity = 1
  } else {
    block.style.transition = 'height .5s ease-in'
    block.style.height = blockMaxHeight + 'px'
    main.style.opacity = 0
  }
  
  block.ontransitionend = () => {
    block.style.transition = ''
    block.ontransitionend = null
  }

  document.removeEventListener('touchmove', onTouchMove)
}, {passive: true})

function onTouchMove(e) {
  endY = e.changedTouches[0].clientY
  const currentHeight = originHeight + startY - endY
  block.style.height = currentHeight + 'px'

  // fade main content
  let currentOpacity = 1 - ((currentHeight -blockMinHeight) / (blockMaxHeight - blockMinHeight))
  if (currentOpacity < 0) {
    currentOpacity = 0
  }
  main.style.opacity = currentOpacity
}