var menu = document.querySelector('#menu')
var links = menu.querySelectorAll('a')
var look = document.querySelector('.look')

window.addEventListener('load', main)

function main () {
  bindDropdown({
    el: look,
    list: [
      '文本',
      '缩略图'
    ],
    onClick (li) {
      var id = parseInt(li.dataset.id)
      if (id === 0) {
        thumbnail.hide()
        textList.show()
      } else if (id === 1) {
        thumbnail.show()
        textList.hide()
      }
    }
  })
}

/**
 * 耦合
 * 文本
 */
var textList = (function () {
  var list = menu.querySelector('ul')

  return {
    show () {
      list.style.display = 'block'
    },
    hide () {
      list.style.display = 'none'
    }
  }
})()

/**
 * 耦合
 * 缩略图
 */
var thumbnail = (function () {
  var map = []
  var iframeWrapper = document.createElement('div')
  iframeWrapper.classList.add('iframe_wrapper')
  iframeWrapper.style.display = 'none'
  window.addEventListener('message', function (event) {
    var href = event.data.href
  
    if (href) {
      window.location.href = href
    }
  })
  
  links.forEach(function (link, i) {
    map[link.href] = {
      linkIndex: i,
      iframe: false // is iframe existed
    }
  })
  
  var pagenation = createPagenation({
    list: links,
    onePage: 6,
    onGroup (payload) {
      var group = payload.group
      var groupBox = document.createElement('div')
      groupBox.classList.add('iframe_box')
  
      group.forEach(function (v) {
        groupBox.appendChild(createIframe(v.href))
      })
  
      if (payload.groupIndex === 0) {
        groupBox.classList.add('iframe_box-active')
        ;[].forEach.call(groupBox.children, function (iframe) {
          iframe.src = iframe.dataset.src
        })
      }
  
      iframeWrapper.appendChild(groupBox)
    },
    onPrev (from, to, opts) {
      opts.onNumber(from, to)
    },
    onNext (from, to, opts) {
      opts.onNumber(from, to)
    },
    onNumber (from, to) {
      var groupBoxes = document.querySelectorAll('.iframe_box')
  
      if (groupBoxes[to - 1].classList.contains('iframe_box-active')) {
        return
      }
  
      ;[].forEach.call(groupBoxes, function (box, i) {
        if (box.classList.contains('iframe_box-active')) {
          box.classList.remove('iframe_box-active')
          return
        }
        if (i === to - 1) {
          box.classList.add('iframe_box-active')
          ;[].forEach.call(box.children, (function (iframe) {
            if (!iframe.src) {
              iframe.src = iframe.dataset.src
            }
          }))
        }
      })

      document.scrollingElement.scrollTop = 0
    }
  })
  pagenation.style.display = 'none'

  menu.appendChild(iframeWrapper)
  insertAfter(pagenation, menu)

  function createIframe (src) {
    if (!map[src].iframe) {
      var iframe = map[src].iframe = document.createElement('iframe')
      iframe.dataset.src = src
      iframe.onload = function () {
        iframe.contentDocument.addEventListener('click', function () {
          iframe.contentWindow.top.postMessage({
            tag: 'iframe',
            href: iframe.src
          }, '*')
        })
      }
    }
    
    return map[src].iframe
  }

  return {
    show () {
      iframeWrapper.style.display = 'block'
      pagenation.style.display = 'block'
      menu.classList.add('thumbnail')
    },
    hide () {
      iframeWrapper.style.display = 'none'
      pagenation.style.display = 'none'
      menu.classList.remove('thumbnail')
    }
  }
})()

function insertAfter (node, ref) {
  if (ref.nextElementSibling) {
    ref.parentElement.insertBefore(node, ref.nextElementSibling)
  } else {
    ref.parentElement.appendChild(node)
  }
}

/**
 * 
 * @param {object} opts
 *  list: Array,
 *  total: number\
 *  onePage: number\
 *  limit: number\
 *  distance: number\
 *  triggerType: string\
 *  onToLeft: Function\
 *  onToRight: Function\
 *  onPrev: Function\
 *  onNext: Function\
 *  onNumber: Function\
 *  onDot: Function\
 *  onGroup: Function
 * @return {HTMLElement}
 */
function createPagenation (opts) {
  var list = opts.list
  var total = opts.total || list.length // 全部条数
  var onePage = opts.onePage // 一页显示的条数
  var limit = opts.limit || 3 // 显示数字页按钮的个数
  var distance = distance || 3 // ...前面一个和最后一个数字页按钮相距个数，如果小于，就不显示...
  var triggerType = triggerType || 'click'
  var btns = []

  var pagenation = document.createElement('div')
  pagenation.classList.add('pagenation')

  var ul = document.createElement('ul')
  pagenation.appendChild(ul)

  addBtn(ul, '<<')
  addBtn(ul, '<')

  var page = Math.ceil(total / onePage)

  var groupIndex = 0
  var numBtnCount = 0
  for (var i = 1; i <= page; i++) {
    if (i <= limit) {
      addBtn(ul, i)
      numBtnCount++
    }

    if (!list) continue

    var start = (i - 1) * onePage
    var group = [].slice.call(list, start, start + onePage)
    callFnIfDef(opts.onGroup, {
      group: group,
      groupIndex: groupIndex
    }, opts)
    groupIndex++
  }


  numBtnCount--

  if (page > limit) {
    if (numBtnCount + distance <= page) {
      addBtn(ul, '...')
      addBtn(ul, page)
    } else {
      while (numBtnCount <= page) {
        console.log(numBtnCount)
        addBtn(ul, numBtnCount)
        numBtnCount++
      }
    }
  }

  addBtn(ul, '>')
  addBtn(ul, '>>')

  function addBtn (ul, text) {
    var btn = document.createElement('li')
    btn.innerText = text
    ul.appendChild(btn)
    btns.push(btn)
  }

  var from = 1
  var to = 0
  var offset = 2 // skip << and <
  btns[from - 1 + offset].classList.add('pagenation_btn-active')
  pagenation.addEventListener(triggerType, function (event) {
    var target = event.target
    var text = target.innerText
    var isCall = false // 是否调用回调函数
    var fn = null

    if (text === '<<') {
      to = 1
      isCall = from !== to
      fn = opts.onToLeft
    } else if (text === '>>') {
      to = page
      isCall = from !== to
      fn = opts.onToRight
    } else if (text === '<') {
      to = from - 1
      isCall = to > 0
      fn = opts.onPrev
    } else if (text === '>') {
      to = from + 1
      isCall = to <= page
      fn = opts.onNext
    } else if (text === '...') {
      callFnIfDef(opts.onDot, opts)
    } else if (typeof parseFloat(text) === 'number') {
      to = parseFloat(text)
      isCall = from !== to
      fn = opts.onNumber
    }

    if (isCall) {
      callFnIfDef(fn, from, to, opts)
      btns[from - 1 + offset].classList.remove('pagenation_btn-active')
      btns[to - 1 + offset].classList.add('pagenation_btn-active')
      from = to
    }
  })

  return pagenation
}

function bindDropdown (opts) {
  var el = opts.el
  var list = opts.list
  var menu = document.createElement('ul')
  menu.classList.add('dropdown')
  menu.classList.add('dropdown-active')
  list.forEach(function (item, i) {
    var li = document.createElement('li')
    li.dataset.id = i
    li.innerText = item
    menu.appendChild(li)
  })
  menu.addEventListener('click', function (event) {
    event.stopPropagation()
    var target = event.target
    if (target.nodeName === 'LI') {
      callFnIfDef(opts.onClick, target)
    }
  })
  el.addEventListener('click', function () {
    menu.classList.toggle('dropdown-active')
  })
  el.appendChild(menu)
}

function callFnIfDef (fn) {
  fn && fn.apply(null, [].slice.call(arguments, 1))
}