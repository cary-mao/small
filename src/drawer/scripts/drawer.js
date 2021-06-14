function Drawer (opts) {
  this.container = opts.container
  this.open = opts.open
  this.drawerClass = opts.drawerClass || 'drawer'
  this.drawerSwitchClass = opts.drawerSwitchClass || 'drawer_switch'

  if (typeof this.container === 'string') {
    this.container = document.querySelector(this.container)
  }

  this._init()
}

Drawer.prototype._init = function () {
  // create drawer
  const drawer = this.drawer = document.createElement('div')
  const drawerSwitch = this.drawerSwitch = document.createElement('div')
  drawer.classList.add(this.drawerClass, )
  drawerSwitch.classList.add(this.drawerSwitchClass)
  drawer.appendChild(drawerSwitch)
  insertToFirstChild(this.container, drawer)

  this.bindEvents()
}

Drawer.prototype.bindEvents = function () {
  this.drawer.addEventListener('click', () => {
    const open = this.open = !this.open

    this.drawer.classList.toggle('drawer-open')
    this.drawer.nextSibling.classList.toggle('drawer_content-open')
  })
}

function insertToFirstChild (parent, node) {
  if (parent.children.length) {
    parent.insertBefore(node, parent.children[0])
  } else {
    parent.appendChild(node)
  }
}