$.mlpFnName = (fn) ->
  fn.name || (fn + '').split(/\s|\(/)[1]

$.mlpInit = (fn, name, set = true) ->
  window.MLP = window.MLP || {}
  window.MLP.apps = window.MLP.apps || {}
  if fn && set
    name = name || $.mlpFnName(fn)
    window.MLP.apps[name] = fn
  else 
    window.MLP.apps[fn]

$.mlpPluggin = (fn, name, bypass = false, elPluggin = true) ->
  obj = {}
  $.mlpInit()
  name = name || $.mlpFnName(fn)
  obj[name] = (option, args...) ->
    @each -> 
      $this = $(this)
      key = 'mlp-'+name
      data = $this.data(key)
      if !data || bypass
        $this.data 'name', name
        $this.data key, (data = new fn(option, this))
      if typeof option == 'string'
        data[option].apply(data, args)
    return
  $.fn.extend obj 

  if !elPluggin
    obj[name] = (option) ->
      new fn(option)
    $.extend obj

class MLPModule 
  defaults: {}

  constructor: (options, element) ->
    @ops = $.extend({}, @defaults, options)
    @sel = @sel || {}
    @el = @el || {}
    @el.target = $(element)
    @init()

  init: ->
    @classes =
      active: 'active'
      offscreen: 'l-offscreen'

    @keys =
      esc: 27
      down: 40
      up: 38
      left: 37
      right: 39
      o: 79
      space: 32
      tab: 9
      enter: 13

    @aria = 
      expanded: 'aria-expanded'
      hidden: 'aria-hidden'
      controls: 'aria-controls'
      selected: 'aria-selected'
      invalid: 'aria-invalid'
      pressed: 'aria-pressed'
      described: 'aria-describedby'
      checked: 'aria-checked'
      label: 'aria-label'
      labelled: 'aria-labelledby'
      popup: 'aria-haspopup'

    @attr =
      tabindex: 'tabindex'

  stop: (e) ->
    e.preventDefault()
    e.stopPropagation()

  target: (e) ->
    $(e.target)

  currentTarget: (e) ->
    $(e.currentTarget)

  isEnter: (e) ->
    @keycode(e) == @keys.enter

  isSpace: (e) ->
    @keycode(e) == @keys.space

  isTab: (e) ->
    @keycode(e) == @keys.tab

  isBackTab: (e) ->
    e.shiftKey && @isTab(e)

  isEsc: (e) ->
    @keycode(e) == @keys.esc

  isEnterOrSpace: (e) ->
    @isEnter(e) || @isSpace(e)

  keycode: (e) ->
    e.which

  isIE: (version = 8) ->
    bowser.msie && bowser.version == version

## Add plugin to window namespace.
$.mlpInit(MLPModule, 'MLPModule')