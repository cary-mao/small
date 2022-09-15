[].forEach.call(document.querySelectorAll('.input'), function (el) {
    el.addEventListener('focus', function () {
        el.parentNode.classList.add('focus')
    })
    el.addEventListener('blur', function () {
        if (el.value === '') {
            el.parentNode.classList.remove('focus')
        }
    })
})