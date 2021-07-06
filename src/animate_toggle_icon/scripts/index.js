window.addEventListener('load', function () {
  var btn = document.querySelector('.btn')
  btn.addEventListener('click', function () {
    btn.children[1].classList.toggle('active')
  })
})