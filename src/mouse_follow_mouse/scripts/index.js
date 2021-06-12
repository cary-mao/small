var items = document.querySelectorAll('.item')

document.addEventListener('mousemove', function (event) {
  var x = event.clientX
  var y = event.clientY

  items.forEach(function (item) {
    var offsetLeft = item.offsetLeft
    var offsetTop = item.offsetTop

    var deltaX = x - offsetLeft
    var deltaY = y - offsetTop
    var radians = Math.atan2(deltaY, deltaX)
    angle = radians * 180 / Math.PI

    item.style.transform = 'rotate(' + angle + 'deg)';
  })
})