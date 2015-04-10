# Essage - a more elegant way to show message
# https://github.com/sofish/essage

~((win, doc) ->

  Utils =
    is: (obj, type) ->
      Object::toString.call(obj).slice(8, -1) == type
    copy: (defaults, source) ->
      for p of source
        if source.hasOwnProperty(p)
          val = source[p]
          defaults[p] = if @is(val, 'Object') then @copy({}, val) else if @is(val, 'Array') then @copy([], val) else val
      defaults

  Essage = ->
    self = this
    @defaults =
      status: 'normal'
    @el = doc.createElement('div')
    @el.className = 'essage'
    @close = '<span class="close">&times;</span>'
    @error = '<span class="icon icon-circle-error"></span>'
    @warning = '<span class="icon icon-circle-warning"></span>'
    @success = '<span class="icon icon-circle-check"></span>'
    @info = '<span class="icon icon-circle-info"></span>'

    @el.onclick = (e) ->
      e = e or win.event
      target = e.target or e.srcElement
      if target.className == 'close'
        self.hide()

    doc.body.appendChild(@el)
    return this

  Essage::_width = ->
    @el.offsetWidth or @el.clientWidth

  Essage::_class = (classname, isRemove) ->
    el = @el
    if el.classList
      el.classList[if isRemove then 'remove' else 'add'] classname
    else
      defaultclass = el.className
      reg = new RegExp('\\b' + classname + '\\b', 'g')
      el.className = if isRemove then defaultclass.replace(reg, '') else if defaultclass.match(reg) then defaultclass else defaultclass + ' ' + classname
    return el

  Essage::set = (message) ->
    message = if typeof message == 'string' then message: message else message
    # copy for each message
    @config = Utils.copy({}, @defaults)
    @config = Utils.copy(@config, message)
    # set status(className)
    @el.className = 'essage'
    @_class 'essage-' + @config.status
    return this

  Essage::show = (message, duration = 2000) ->
    el = @el
    self = @set(message)
    # set message
    el.innerHTML = @close + @[@config.status] + ' ' + @config.message
    marginLeft = -@_width() / 2
    @el.style.marginLeft = parseInt(marginLeft) + 'px'
    # disppear automaticlly
    @_class 'is-active'
    clearTimeout @delayHide if @delayHide
    @delayHide = setTimeout ->
      self.hide()
    , duration
    @el.addEventListener 'webkitTransitionEnd', @delayHide, false
    @el.addEventListener 'transitionend', @delayHide, false
    return this

  Essage::hide = ->
    @_class 'is-active', true
    return this

  # export to window
  win.Essage = new Essage

)(window, document)
