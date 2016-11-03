/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	  TODO:
	   * Throttle rather than debounce for quicker updates
	   * Persistance
	   * Storage (backend)
	*/
	
	var hue = function () {
	
	  var pusher = new Pusher('58bc4d61a110f2e2f5be', {
	    cluster: 'eu',
	    encrypted: true,
	    authEndpoint: 'https://7msnbzsc3e.execute-api.eu-west-1.amazonaws.com/dev/auth'
	  });
	
	  // Colours are in order clockwise from the top of the colour wheel
	  var colorSteps = ["pink", "orange", "orange", "yellow", "light green", "dark green", "blue", "purple"];
	
	  // functions listening for colour change
	  var listeners = [];
	
	  var channel = pusher.subscribe('private-hue');
	
	  channel.bind('client-change', function (data) {
	
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i](data.color);
	    }
	  });
	
	  var debounce = function debounce(fn, time, timer) {
	    time = time || 150;
	    return function (arg) {
	      clearTimeout(timer);
	      timer = setTimeout(fn, time, arg);
	    };
	  };
	
	  var trigger = debounce(function (value) {
	    channel.trigger('client-change', {
	      color: value
	    });
	  });
	
	  return {
	    listen: function listen(fn) {
	      listeners.push(fn);
	    },
	
	    set: function set(color) {
	      trigger(color);
	
	      // update listeners
	      for (var i = 0; i < listeners.length; i++) {
	        listeners[i](color);
	      }
	    }
	  };
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function getterSetter(a, b, c, d) {
	  Object.defineProperty ? Object.defineProperty(a, b, { get: c, set: d }) : document.__defineGetter__ && (a.__defineGetter__(b, c), a.__defineSetter__(b, d));
	}!function (a) {
	  var b = "propeller",
	      c = { angle: 0, speed: 0, inertia: 0, minimalSpeed: .001, minimalAngleChange: .1, step: 0, stepTransitionTime: 0, stepTransitionEasing: "linear", rotateParentInstantly: !1, touchElement: null },
	      d = function d(a, b) {
	    return "string" == typeof a && (a = document.querySelectorAll(a)), a.length > 1 ? d.createMany(a, b) : (1 === a.length && (a = a[0]), this.element = a, this.active = !1, this.transiting = !1, this.update = this.update.bind(this), this.initCSSPrefix(), this.initAngleGetterSetter(), this.initOptions(b), this.initHardwareAcceleration(), this.initTransition(), this.bindHandlers(), this.addListeners(), void this.update());
	  };d.createMany = function (a, b) {
	    for (var c = [], e = 0; e < a.length; e++) {
	      c.push(new d(a[e], b));
	    }return c;
	  };var e = d.prototype;e.initAngleGetterSetter = function () {
	    getterSetter(this, "angle", function () {
	      return this._angle;
	    }, function (a) {
	      this._angle = a, this.virtualAngle = a, this.updateCSS();
	    });
	  }, e.bindHandlers = function () {
	    this.onRotationStart = this.onRotationStart.bind(this), this.onRotationStop = this.onRotationStop.bind(this), this.onRotated = this.onRotated.bind(this);
	  }, e.addListeners = function () {
	    this.listenersInstalled = !0, "ontouchstart" in document.documentElement ? (this.touchElement.addEventListener("touchstart", this.onRotationStart), this.touchElement.addEventListener("touchmove", this.onRotated), this.touchElement.addEventListener("touchend", this.onRotationStop), this.touchElement.addEventListener("touchcancel", this.onRotationStop), this.touchElement.addEventListener("dragstart", this.returnFalse)) : (this.touchElement.addEventListener("mousedown", this.onRotationStart), this.touchElement.addEventListener("mousemove", this.onRotated), this.touchElement.addEventListener("mouseup", this.onRotationStop), this.touchElement.addEventListener("mouseleave", this.onRotationStop), this.touchElement.addEventListener("dragstart", this.returnFalse)), this.touchElement.ondragstart = this.returnFalse;
	  }, e.removeListeners = function () {
	    this.listenersInstalled = !1, "ontouchstart" in document.documentElement ? (this.touchElement.removeEventListener("touchstart", this.onRotationStart), this.touchElement.removeEventListener("touchmove", this.onRotated), this.touchElement.removeEventListener("touchend", this.onRotationStop), this.touchElement.removeEventListener("touchcancel", this.onRotationStop), this.touchElement.removeEventListener("dragstart", this.returnFalse)) : (this.touchElement.removeEventListener("mousedown", this.onRotationStart), this.touchElement.removeEventListener("mousemove", this.onRotated), this.touchElement.removeEventListener("mouseup", this.onRotationStop), this.touchElement.removeEventListener("mouseleave", this.onRotationStop), this.touchElement.removeEventListener("dragstart", this.returnFalse));
	  }, e.bind = function () {
	    this.listenersInstalled !== !0 && this.addListeners();
	  }, e.unbind = function () {
	    this.listenersInstalled === !0 && (this.removeListeners(), this.onRotationStop());
	  }, e.stop = function () {
	    this.speed = 0, this.onRotationStop();
	  }, e.onRotationStart = function (a) {
	    this.initCoordinates(), this.initDrag(), this.active = !0, void 0 !== this.onDragStart && this.onDragStart(), this.rotateParentInstantly === !1 && a.stopPropagation();
	  }, e.onRotationStop = function () {
	    void 0 !== this.onDragStop && this.active === !0 && this.onDragStop(), this.active = !1;
	  }, e.onRotated = function (a) {
	    this.active === !0 && (a.stopPropagation(), a.preventDefault(), this.lastMouseEvent = void 0 !== a.targetTouches && void 0 !== a.targetTouches[0] ? { pageX: a.targetTouches[0].pageX, pageY: a.targetTouches[0].pageY } : { pageX: a.pageX || a.clientX, pageY: a.pageY || a.clientY });
	  }, e.update = function () {
	    void 0 !== this.lastMouseEvent && this.active === !0 && this.updateAngleToMouse(this.lastMouseEvent), this.updateAngle(), this.applySpeed(), this.applyInertia(), Math.abs(this.lastAppliedAngle - this._angle) >= this.minimalAngleChange && this.transiting === !1 && (this.updateCSS(), this.blockTransition(), void 0 !== this.onRotate && "function" == typeof this.onRotate && this.onRotate.bind(this)(), this.lastAppliedAngle = this._angle), window.requestAnimFrame(this.update);
	  }, e.updateAngle = function () {
	    this._angle = this.step > 0 ? this.getAngleFromVirtual() : this.normalizeAngle(this.virtualAngle);
	  }, e.getAngleFromVirtual = function () {
	    return Math.ceil(this.virtualAngle / this.step) * this.step;
	  }, e.normalizeAngle = function (a) {
	    var b = a;return b %= 360, 0 > b && (b = 360 + b), b;
	  }, e.differenceBetweenAngles = function (a, b) {
	    var c = a * (Math.PI / 180),
	        d = b * (Math.PI / 180),
	        e = Math.atan2(Math.sin(c - d), Math.cos(c - d)),
	        f = e * (180 / Math.PI);return Math.round(100 * f) / 100;
	  }, e.applySpeed = function () {
	    this.inertia > 0 && 0 !== this.speed && this.active === !1 && (this.virtualAngle += this.speed);
	  }, e.applyInertia = function () {
	    this.inertia > 0 && (Math.abs(this.speed) >= this.minimalSpeed ? (this.speed = this.speed * this.inertia, this.active === !1 && Math.abs(this.speed) < this.minimalSpeed && void 0 !== this.onStop && this.onStop()) : 0 !== this.speed && (this.speed = 0));
	  }, e.updateAngleToMouse = function (a) {
	    var b = a.pageX - this.cx,
	        d = a.pageY - this.cy,
	        e = Math.atan2(b, d),
	        f = e * (180 / Math.PI) * -1 + 180;if (void 0 === this.lastMouseAngle && (this.lastElementAngle = this.virtualAngle, this.lastMouseAngle = f), this.stepTransitionTime !== c.stepTransitionTime) this.speed = this.mouseDiff = this.differenceBetweenAngles(f, this.lastMouseAngle), this.virtualAngle = this.lastElementAngle + this.mouseDiff, this.lastElementAngle = this.virtualAngle, this.lastMouseAngle = f;else {
	      var g = this.virtualAngle;this.mouseDiff = f - this.lastMouseAngle, this.virtualAngle = this.lastElementAngle + this.mouseDiff;var h = this.virtualAngle;this.speed = this.differenceBetweenAngles(h, g);
	    }
	  }, e.initCoordinates = function () {
	    var a = this.getViewOffset();this.cx = a.x + this.element.offsetWidth / 2, this.cy = a.y + this.element.offsetHeight / 2;
	  }, e.initDrag = function () {
	    this.speed = 0, this.lastMouseAngle = void 0, this.lastElementAngle = void 0, this.lastMouseEvent = void 0;
	  }, e.initOptions = function (a) {
	    a = a || c, this.touchElement = document.querySelectorAll(a.touchElement)[0] || this.element, this.onRotate = a.onRotate || a.onrotate, this.onStop = a.onStop || a.onstop, this.onDragStop = a.onDragStop || a.ondragstop, this.onDragStart = a.onDragStart || a.ondragstart, this.step = a.step || c.step, this.stepTransitionTime = a.stepTransitionTime || c.stepTransitionTime, this.stepTransitionEasing = a.stepTransitionEasing || c.stepTransitionEasing, this.angle = a.angle || c.angle, this.speed = a.speed || c.speed, this.inertia = a.inertia || c.inertia, this.minimalSpeed = a.minimalSpeed || c.minimalSpeed, this.lastAppliedAngle = this.virtualAngle = this._angle = a.angle || c.angle, this.minimalAngleChange = this.step !== c.step ? this.step : c.minimalAngleChange, this.rotateParentInstantly = a.rotateParentInstantly || c.rotateParentInstantly;
	  }, e.initCSSPrefix = function () {
	    void 0 === d.cssPrefix && ("undefined" != typeof document.body.style.transform ? d.cssPrefix = "" : "undefined" != typeof document.body.style.mozTransform ? d.cssPrefix = "-moz-" : "undefined" != typeof document.body.style.webkitTransform ? d.cssPrefix = "-webkit-" : "undefined" != typeof document.body.style.msTransform && (d.cssPrefix = "-ms-"));
	  }, e.initHardwareAcceleration = function () {
	    this.accelerationPostfix = "";var a,
	        b = document.createElement("p"),
	        c = { webkitTransform: "-webkit-transform", OTransform: "-o-transform", msTransform: "-ms-transform", MozTransform: "-moz-transform", transform: "transform" };document.body.insertBefore(b, null);for (var e in c) {
	      void 0 !== b.style[e] && (b.style[e] = "translate3d(1px,1px,1px)", a = window.getComputedStyle(b).getPropertyValue(c[e]));
	    }document.body.removeChild(b);var f = void 0 !== a && a.length > 0 && "none" !== a;f === !0 && (this.accelerationPostfix = "translateZ(0)", this.element.style[d.cssPrefix + "transform"] = this.accelerationPostfix, this.updateCSS());
	  }, e.initTransition = function () {
	    if (this.stepTransitionTime !== c.stepTransitionTime) {
	      var a = "all " + this.stepTransitionTime + "ms " + this.stepTransitionEasing;this.element.style[d.cssPrefix + "transition"] = a;
	    }
	  }, e.updateCSS = function () {
	    this.element.style[d.cssPrefix + "transform"] = "rotate(" + this._angle + "deg) " + this.accelerationPostfix;
	  }, e.blockTransition = function () {
	    if (this.stepTransitionTime !== c.stepTransitionTime) {
	      var a = this;setTimeout(function () {
	        a.transiting = !1;
	      }, this.stepTransitionTime), this.transiting = !0;
	    }
	  }, e.getViewOffset = function () {
	    var a = { x: 0, y: 0 };return d.IEVersion !== !1 && d.IEVersion < 9 ? (a.x = this.element.offsetLeft, a.y = this.element.offsetTop, a) : (this.element && this.addOffset(this.element, a, "defaultView" in document ? document.defaultView : document.parentWindow), a);
	  }, e.addOffset = function (a, b, c) {
	    var d = a.offsetParent;if (b.x += a.offsetLeft - (d ? d.scrollLeft : 0), b.y += a.offsetTop - (d ? d.scrollTop : 0), d) {
	      if (1 == d.nodeType) {
	        var e = c.getComputedStyle(d, "");if ("static" != e.position) {
	          if (b.x += parseInt(e.borderLeftWidth), b.y += parseInt(e.borderTopWidth), "table" == d.localName.toLowerCase()) b.x += parseInt(e.paddingLeft), b.y += parseInt(e.paddingTop);else if ("body" == d.localName.toLowerCase()) {
	            var f = c.getComputedStyle(a, "");b.x += parseInt(f.marginLeft), b.y += parseInt(f.marginTop);
	          }
	        } else "body" == d.localName.toLowerCase() && (b.x += parseInt(e.borderLeftWidth), b.y += parseInt(e.borderTopWidth));for (var g = a.parentNode; d != g;) {
	          b.x -= g.scrollLeft, b.y -= g.scrollTop, g = g.parentNode;
	        }this.addOffset(d, b, c);
	      }
	    } else {
	      if ("body" == a.localName.toLowerCase()) {
	        var f = c.getComputedStyle(a, "");b.x += parseInt(f.borderLeftWidth), b.y += parseInt(f.borderTopWidth);var h = c.getComputedStyle(a.parentNode, "");b.x += parseInt(h.paddingLeft), b.y += parseInt(h.paddingTop), b.x += parseInt(h.marginLeft), b.y += parseInt(h.marginTop);
	      }a.scrollLeft && (b.x += a.scrollLeft), a.scrollTop && (b.y += a.scrollTop);var i = a.ownerDocument.defaultView;i && i.frameElement && this.addOffset(i.frameElement, b, i);
	    }
	  }, e.returnFalse = function () {
	    return !1;
	  }, void 0 !== a.$ && ($.propeller = {}, $.propeller.propellers = [], $.fn[b] = function (a) {
	    return this.each(function () {
	      if (!$.data(this, "plugin_" + b)) {
	        var c = new d(this, a);$.data(this, "plugin_" + b, c), $.propeller.propellers.push(c);
	      }
	    });
	  });var f = navigator.userAgent.toLowerCase();d.IEVersion = -1 != f.indexOf("msie") ? parseInt(f.split("msie")[1]) : !1, d.deg2radians = 2 * Math.PI / 360, a.Propeller = d;
	}(window), window.requestAnimFrame = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (a) {
	    window.setTimeout(a, 1e3 / 60);
	  };
	}(), Function.prototype.bind || (Function.prototype.bind = function (a) {
	  if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b = Array.prototype.slice.call(arguments, 1),
	      c = this,
	      d = function d() {},
	      e = function e() {
	    return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)));
	  };return d.prototype = this.prototype, e.prototype = new d(), e;
	}), function (a, b) {
	  function c(a) {
	    var c = b[a];b[a] = function (a) {
	      return e(c(a));
	    };
	  }function d(b, c, d) {
	    return (d = this).attachEvent("on" + b, function (b) {
	      var b = b || a.event;b.preventDefault = b.preventDefault || function () {
	        b.returnValue = !1;
	      }, b.stopPropagation = b.stopPropagation || function () {
	        b.cancelBubble = !0;
	      }, c.call(d, b);
	    });
	  }function e(a, b) {
	    if (b = a.length) for (; b--;) {
	      a[b].addEventListener = d;
	    } else a.addEventListener = d;return a;
	  }a.addEventListener || (e([b, a]), "Element" in a ? a.Element.prototype.addEventListener = d : (b.attachEvent("onreadystatechange", function () {
	    e(b.all);
	  }), c("getElementsByTagName"), c("getElementById"), c("createElement"), e(b.all)), "object" == ( false ? "undefined" : _typeof(module)) && module.exports && (module.exports = Propeller));
	}(window, document), window.getComputedStyle || (window.getComputedStyle = function (a) {
	  return this.el = a, this.getPropertyValue = function (b) {
	    var c = /(\-([a-z]){1})/g;return "float" == b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function () {
	      return arguments[2].toUpperCase();
	    })), a.currentStyle[b] ? a.currentStyle[b] : null;
	  }, this;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var theSelector = document.getElementsByClassName('Toggle-shim')[0];
	var options = {
	  inertia: 0.99,
	  onDragStop: function onDragStop() {
	    hueClientNewColor(this.angle);
	  }
	};
	
	new Propeller(theSelector, options);
	
	var hueClientNewColor = function hueClientNewColor(angle) {
	  console.log(getColor(angle));
	  huePulse(getColor(angle));
	  // getColor(angle)
	};
	
	var getColor = function getColor(angle) {
	
	  var x = Math.round(angle);
	  switch (true) {
	    case x > 0 && x < 75:
	      return "green";
	    case x > 75 && x < 135:
	      return "blue";
	    case x > 135 && x < 175:
	      return "purple";
	    case x > 175 && x < 220:
	      return "pink";
	    case x > 220 && x < 300:
	      return "orange";
	    case x > 300:
	      return "green";
	  }
	};
	
	var huePulse = function huePulse(color) {
	  var pulseElement = document.querySelectorAll('.Toggle-ring')[0];
	
	  pulseElement.style.borderColor = color;
	  pulseElement.classList.add('is-animating');
	
	  // This should really be done on an animationend event
	  setTimeout(function () {
	    pulseElement.classList.remove('is-animating');
	  }, 2000);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map