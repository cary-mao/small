const config = {
    type: true,
    w: 1200,
    h: 600,
    bt: 100,
    br: 100,
    bb: 100,
    bl: 100,
    bc: 'white',
    btc: 'yellow',
    brc: 'pink',
    bbc: 'lightblue',
    blc: 'orange'
}

const idToCssPropsMap = {
    w: 'width',
    h: 'height',
    bt: 'borderTop',
    br: 'borderRight',
    bb: 'borderBottom',
    bl: 'borderLeft'
}

const box = document.getElementById('box')

const typeSwitch = document.getElementById('type')
type.onchange = function () {
    box.style.boxSizing = (type.checked ? 'border' : 'content') + '-box'
}
type.checked = config.type
type.onchange()

const ranges = document.querySelectorAll('input[type="range"]')
;[].forEach.call(ranges, (range) => {
    range.oninput = function () {
        range.nextElementSibling.innerText = range.value
        
        let styleProp = idToCssPropsMap[range.id]

        if (styleProp.startsWith('b')) {
            styleProp += 'Width'
        }
        box.style[styleProp] = range.value + 'px'
    }
    range.value = config[range.id]
    range.oninput()
})

const colorInputs = document.querySelectorAll('[data-color]')
;[].forEach.call(colorInputs, (input) => {
    input.onchange = function () {
        if (input.id === 'bc') {
            box.style.backgroundColor = input.value
        } else {
            const styleProp = idToCssPropsMap[input.id.substring(0, 2)] + 'Color'
    
            box.style[styleProp] = input.value
        }
    }
    input.value = config[input.id]
    input.onchange()
})