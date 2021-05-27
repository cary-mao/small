const curve = document.getElementById('curve')

window.addEventListener('scroll', () => {
  /**
   * 核心：
   * 缩放范围再[0,1]，所以1 + ...；然后，window.scrollY/-500是为了与滚动相关和得到一个小于1的小数
   * 仅仅缩放弧形图片
   */
  const value = 1 + window.scrollY / -500
  curve.style.transform = `scaleY(${value})`
})