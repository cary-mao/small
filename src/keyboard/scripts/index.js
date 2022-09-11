const keys = { backspace: 8, tab: 9, enter: 13, shift: 16, ctrl: 17, alt: 18, pausebreak: 19, capslock: 20, esc: 27, space: 32, pageup: 33, pagedown: 34, end: 35, home: 36, leftarrow: 37, uparrow: 38, rightarrow: 39, downarrow: 40, insert: 45, delete: 46, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90, leftwindowkey: 91, rightwindowkey: 92, selectkey: 93, numpad0: 96, numpad1: 97, numpad2: 98, numpad3: 99, numpad4: 100, numpad5: 101, numpad6: 102, numpad7: 103, numpad8: 104, numpad9: 105, multiply: 106, add: 107, subtract: 109, decimalpoint: 110, divide: 111, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123, numlock: 144, scrolllock: 145, semicolon: 186, equalsign: 187, comma: 188, dash: 189, period: 190, forwardslash: 191, graveaccent: 192, openbracket: 219, backslash: 220, closebracket: 221, singlequote: 222 };

// key elements
const keyEls = [].slice.call(document.querySelector('.keyboard').children)
const keyElsMap = {}
keyEls.forEach(el => {
    let key = el.innerText.toLowerCase()

    if (key === 'delete') {
        key = 'backspace'
    }

    // left and right
    if (['shift', 'alt', 'ctrl'].indexOf(key) >= 0) {
        if (!keyElsMap[keys[key]]) {
            keyElsMap[keys[key]] = [el]
        } else {
            keyElsMap[keys[key]].push(el)
        }
        return
    }

    keyElsMap[keys[key]] = el
})

const keyTipKey = document.querySelector('.key-tip').firstElementChild

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    let keyCode = e.keyCode

    console.log(keyCode)

    if (keyCode >= 97 && keyCode <= 122) {
        keyCode -= 32
    }

    let detectedEl = keyElsMap[keyCode]

    if (Array.isArray(detectedEl)) {
        detectedEl =  detectedEl[e.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT ? 0 : 1]
    }

    if (detectedEl) {
        const text = keyTipKey.innerText = detectedEl.innerText
        detectedEl.classList.add('key-active')
        keyTipKey.parentElement.classList.add('key-tip-active')
        if (text.length > 1) {
            const keyWidth = text.length * 14
            keyTipKey.parentElement.style.width = 100 + keyWidth + 'px';
            keyTipKey.parentElement.style.marginLeft = -(50 + keyWidth / 2) + 'px';
            keyTipKey.style.width = keyWidth + 'px';
        }
    }
})

window.addEventListener('keyup', (e) => {
    e.preventDefault()
    let keyCode = e.keyCode

    if (keyCode >= 97 && keyCode <= 122) {
        keyCode -= 32
    }

    let detectedEl = keyElsMap[keyCode]

    if (Array.isArray(detectedEl)) {
        detectedEl =  detectedEl[e.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT ? 0 : 1]
    }

    if (detectedEl) {
        detectedEl.classList.remove('key-active')
        keyTipKey.parentElement.classList.remove('key-tip-active')
        keyTipKey.parentElement.style.width = ''
        keyTipKey.parentElement.style.marginLeft = ''
        keyTipKey.style.width = ''
    }
})