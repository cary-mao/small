const moon = document.getElementById('moon')
const mountain = document.getElementById('mountain')
const road = document.getElementById('road')
const text = document.getElementById('text')


window.addEventListener('scroll', () => {
  const value = window.scrollY

  /**
   * 核心在于每个对象都是top: 0, left: 0
   * 即使是text，也是通过flex定位的，再设置为relative，相对于自身定位
   * 所以，这里设置top和left时通过value的倍数来定，就相当于对象移动了value的倍数长度。
   */
  bg.style.top = value * 0.5 + 'px'
  moon.style.left = -value * 0.5 + 'px'
  mountain.style.top = -value * 0.15 + 'px';
  road.style.top = value * 0.15 + 'px';
  text.style.top = value * 1 + 'px';
})

// window.addEventListener('resize', () => {
//   const moon = document.getElementById('moon')
//   const width = moon.offsetWidth
//   const height = moon.offsetHeight
//   const radio = width / height

//   console.log(radio)

//   if (radio < 1.4) {
//     moon.style.objectFit = 'contain'
//   } else {
//     moon.style.objectFit = 'cover'
//   }
// })