(function() {
  ~(function(win, doc) {
    var Essage, Utils;
    Utils = {
      is: function(obj, type) {
        return Object.prototype.toString.call(obj).slice(8, -1) === type;
      },
      copy: function(defaults, source) {
        var p, val;
        for (p in source) {
          if (source.hasOwnProperty(p)) {
            val = source[p];
            defaults[p] = this.is(val, 'Object') ? this.copy({}, val) : this.is(val, 'Array') ? this.copy([], val) : val;
          }
        }
        return defaults;
      }
    };
    Essage = function() {
      var self;
      self = this;
      this.defaults = {
        status: 'normal'
      };
      this.el = doc.createElement('div');
      this.el.className = 'essage';
      this.close = '<span class="close">&times;</span>';
      this.error = '<span class="icon icon-circle-error"></span>';
      this.warning = '<span class="icon icon-circle-warning"></span>';
      this.success = '<span class="icon icon-circle-check"></span>';
      this.info = '<span class="icon icon-circle-info"></span>';
      this.el.onclick = function(e) {
        var target;
        e = e || win.event;
        target = e.target || e.srcElement;
        if (target.className === 'close') {
          return self.hide();
        }
      };
      doc.body.appendChild(this.el);
      return this;
    };
    Essage.prototype._width = function() {
      return this.el.offsetWidth || this.el.clientWidth;
    };
    Essage.prototype._class = function(classname, isRemove) {
      var defaultclass, el, reg;
      el = this.el;
      if (el.classList) {
        el.classList[isRemove ? 'remove' : 'add'](classname);
      } else {
        defaultclass = el.className;
        reg = new RegExp('\\b' + classname + '\\b', 'g');
        el.className = isRemove ? defaultclass.replace(reg, '') : defaultclass.match(reg) ? defaultclass : defaultclass + ' ' + classname;
      }
      return el;
    };
    Essage.prototype.set = function(message) {
      message = typeof message === 'string' ? {
        message: message
      } : message;
      this.config = Utils.copy({}, this.defaults);
      this.config = Utils.copy(this.config, message);
      this.el.className = 'essage';
      this._class('essage-' + this.config.status);
      return this;
    };
    Essage.prototype.show = function(message, duration) {
      var el, marginLeft, self;
      if (duration == null) {
        duration = 2000;
      }
      el = this.el;
      self = this.set(message);
      el.innerHTML = this.close + this[this.config.status] + ' ' + this.config.message;
      marginLeft = -this._width() / 2;
      this.el.style.marginLeft = parseInt(marginLeft) + 'px';
      this._class('is-active');
      if (this.delayHide) {
        clearTimeout(this.delayHide);
      }
      this.delayHide = setTimeout(function() {
        return self.hide();
      }, duration);
      this.el.addEventListener('webkitTransitionEnd', this.delayHide, false);
      this.el.addEventListener('transitionend', this.delayHide, false);
      return this;
    };
    Essage.prototype.hide = function() {
      this._class('is-active', true);
      return this;
    };
    return win.Essage = new Essage;
  })(window, document);

}).call(this);
