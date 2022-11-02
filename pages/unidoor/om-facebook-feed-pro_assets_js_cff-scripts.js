var cff_js_exists = (typeof cff_js_exists !== 'undefined') ? true : false;
if(!cff_js_exists){
    if (typeof window.cff_block_editor !== 'undefined') {
        cffmetatrans = false;
        cffajaxurl = window.cff_block_editor.cffajaxurl;
    }

    /*! Hammer.JS - v2.0.8 - 2016-04-23
        * http://hammerjs.github.io/
        *
        * Copyright (c) 2016 Jorik Tangelder;
        * Licensed under the MIT license
        * */
    if (typeof cffnomobileswipe === 'undefined') {
        !function (a, b, c, d) {
            "use strict";

            function e(a, b, c) {
                return setTimeout(j(a, c), b)
            }

            function f(a, b, c) {
                return Array.isArray(a) ? (g(a, c[b], c), !0) : !1
            }

            function g(a, b, c) {
                var e;
                if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
            }

            function h(b, c, d) {
                var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
                return function () {
                    var c = new Error("get-stack-trace"),
                        d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                        f = a.console && (a.console.warn || a.console.log);
                    return f && f.call(a.console, e, d), b.apply(this, arguments)
                }
            }

            function i(a, b, c) {
                var d, e = b.prototype;
                d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c)
            }

            function j(a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            }

            function k(a, b) {
                return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a
            }

            function l(a, b) {
                return a === d ? b : a
            }

            function m(a, b, c) {
                g(q(b), function (b) {
                    a.addEventListener(b, c, !1)
                })
            }

            function n(a, b, c) {
                g(q(b), function (b) {
                    a.removeEventListener(b, c, !1)
                })
            }

            function o(a, b) {
                for (; a;) {
                    if (a == b) return !0;
                    a = a.parentNode
                }
                return !1
            }

            function p(a, b) {
                return a.indexOf(b) > -1
            }

            function q(a) {
                return a.trim().split(/\s+/g)
            }

            function r(a, b, c) {
                if (a.indexOf && !c) return a.indexOf(b);
                for (var d = 0; d < a.length;) {
                    if (c && a[d][c] == b || !c && a[d] === b) return d;
                    d++
                }
                return -1
            }

            function s(a) {
                return Array.prototype.slice.call(a, 0)
            }

            function t(a, b, c) {
                for (var d = [], e = [], f = 0; f < a.length;) {
                    var g = b ? a[f][b] : a[f];
                    r(e, g) < 0 && d.push(a[f]), e[f] = g, f++
                }
                return c && (d = b ? d.sort(function (a, c) {
                    return a[b] > c[b]
                }) : d.sort()), d
            }

            function u(a, b) {
                for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
                    if (c = ma[g], e = c ? c + f : b, e in a) return e;
                    g++
                }
                return d
            }

            function v() {
                return ua++
            }

            function w(b) {
                var c = b.ownerDocument || b;
                return c.defaultView || c.parentWindow || a
            }

            function x(a, b) {
                var c = this;
                this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
                    k(a.options.enable, [a]) && c.handler(b)
                }, this.init()
            }

            function y(a) {
                var b, c = a.options.inputClass;
                return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z)
            }

            function z(a, b, c) {
                var d = c.pointers.length, e = c.changedPointers.length, f = b & Ea && d - e === 0,
                    g = b & (Ga | Ha) && d - e === 0;
                c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
            }

            function A(a, b) {
                var c = a.session, d = b.pointers, e = d.length;
                c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
                var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = E(d);
                b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
                var j = F(b.deltaTime, b.deltaX, b.deltaY);
                b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);
                var k = a.element;
                o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k
            }

            function B(a, b) {
                var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {};
                b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = {
                    x: f.deltaX || 0,
                    y: f.deltaY || 0
                }, d = a.offsetDelta = {x: c.x, y: c.y}), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
            }

            function C(a, b) {
                var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp;
                if (b.eventType != Ha && (i > Da || h.velocity === d)) {
                    var j = b.deltaX - h.deltaX, k = b.deltaY - h.deltaY, l = F(i, j, k);
                    e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b
                } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
                b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
            }

            function D(a) {
                for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
                    clientX: pa(a.pointers[c].clientX),
                    clientY: pa(a.pointers[c].clientY)
                }, c++;
                return {timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY}
            }

            function E(a) {
                var b = a.length;
                if (1 === b) return {x: pa(a[0].clientX), y: pa(a[0].clientY)};
                for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;
                return {x: pa(c / b), y: pa(d / b)}
            }

            function F(a, b, c) {
                return {x: b / a || 0, y: c / a || 0}
            }

            function G(a, b) {
                return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma
            }

            function H(a, b, c) {
                c || (c = Qa);
                var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
                return Math.sqrt(d * d + e * e)
            }

            function I(a, b, c) {
                c || (c = Qa);
                var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
                return 180 * Math.atan2(e, d) / Math.PI
            }

            function J(a, b) {
                return I(b[1], b[0], Ra) + I(a[1], a[0], Ra)
            }

            function K(a, b) {
                return H(b[0], b[1], Ra) / H(a[0], a[1], Ra)
            }

            function L() {
                this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments)
            }

            function M() {
                this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
            }

            function N() {
                this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments)
            }

            function O(a, b) {
                var c = s(a.touches), d = s(a.changedTouches);
                return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d]
            }

            function P() {
                this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments)
            }

            function Q(a, b) {
                var c = s(a.touches), d = this.targetIds;
                if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
                var e, f, g = s(a.changedTouches), h = [], i = this.target;
                if (f = c.filter(function (a) {
                    return o(a.target, i)
                }), b === Ea) for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
                for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;
                return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0
            }

            function R() {
                x.apply(this, arguments);
                var a = j(this.handler, this);
                this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = []
            }

            function S(a, b) {
                a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b)
            }

            function T(a) {
                var b = a.changedPointers[0];
                if (b.identifier === this.primaryTouch) {
                    var c = {x: b.clientX, y: b.clientY};
                    this.lastTouches.push(c);
                    var d = this.lastTouches, e = function () {
                        var a = d.indexOf(c);
                        a > -1 && d.splice(a, 1)
                    };
                    setTimeout(e, cb)
                }
            }

            function U(a) {
                for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
                    var e = this.lastTouches[d], f = Math.abs(b - e.x), g = Math.abs(c - e.y);
                    if (db >= f && db >= g) return !0
                }
                return !1
            }

            function V(a, b) {
                this.manager = a, this.set(b)
            }

            function W(a) {
                if (p(a, jb)) return jb;
                var b = p(a, kb), c = p(a, lb);
                return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb
            }

            function X() {
                if (!fb) return !1;
                var b = {}, c = a.CSS && a.CSS.supports;
                return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) {
                    b[d] = c ? a.CSS.supports("touch-action", d) : !0
                }), b
            }

            function Y(a) {
                this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = []
            }

            function Z(a) {
                return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : ""
            }

            function $(a) {
                return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : ""
            }

            function _(a, b) {
                var c = b.manager;
                return c ? c.get(a) : a
            }

            function aa() {
                Y.apply(this, arguments)
            }

            function ba() {
                aa.apply(this, arguments), this.pX = null, this.pY = null
            }

            function ca() {
                aa.apply(this, arguments)
            }

            function da() {
                Y.apply(this, arguments), this._timer = null, this._input = null
            }

            function ea() {
                aa.apply(this, arguments)
            }

            function fa() {
                aa.apply(this, arguments)
            }

            function ga() {
                Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
            }

            function ha(a, b) {
                return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b)
            }

            function ia(a, b) {
                this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) {
                    var b = this.add(new a[0](a[1]));
                    a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
                }, this)
            }

            function ja(a, b) {
                var c = a.element;
                if (c.style) {
                    var d;
                    g(a.options.cssProps, function (e, f) {
                        d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || ""
                    }), b || (a.oldCssProps = {})
                }
            }

            function ka(a, c) {
                var d = b.createEvent("Event");
                d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
            }

            var la, ma = ["", "webkit", "Moz", "MS", "ms", "o"], na = b.createElement("div"), oa = "function",
                pa = Math.round, qa = Math.abs, ra = Date.now;
            la = "function" != typeof Object.assign ? function (a) {
                if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");
                for (var b = Object(a), c = 1; c < arguments.length; c++) {
                    var e = arguments[c];
                    if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f])
                }
                return b
            } : Object.assign;
            var sa = h(function (a, b, c) {
                    for (var e = Object.keys(b), f = 0; f < e.length;) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
                    return a
                }, "extend", "Use `assign`."), ta = h(function (a, b) {
                    return sa(a, b, !0)
                }, "merge", "Use `assign`."), ua = 1, va = /mobile|tablet|ip(ad|hone|od)|android/i,
                wa = "ontouchstart" in a, xa = u(a, "PointerEvent") !== d, ya = wa && va.test(navigator.userAgent),
                za = "touch", Aa = "pen", Ba = "mouse", Ca = "kinect", Da = 25, Ea = 1, Fa = 2, Ga = 4, Ha = 8, Ia = 1,
                Ja = 2, Ka = 4, La = 8, Ma = 16, Na = Ja | Ka, Oa = La | Ma, Pa = Na | Oa, Qa = ["x", "y"],
                Ra = ["clientX", "clientY"];
            x.prototype = {
                handler: function () {
                }, init: function () {
                    this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler)
                }, destroy: function () {
                    this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler)
                }
            };
            var Sa = {mousedown: Ea, mousemove: Fa, mouseup: Ga}, Ta = "mousedown", Ua = "mousemove mouseup";
            i(L, x, {
                handler: function (a) {
                    var b = Sa[a.type];
                    b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, {
                        pointers: [a],
                        changedPointers: [a],
                        pointerType: Ba,
                        srcEvent: a
                    }))
                }
            });
            var Va = {pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha},
                Wa = {2: za, 3: Aa, 4: Ba, 5: Ca}, Xa = "pointerdown", Ya = "pointermove pointerup pointercancel";
            a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, {
                handler: function (a) {
                    var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Va[d],
                        f = Wa[a.pointerType] || a.pointerType, g = f == za, h = r(b, a.pointerId, "pointerId");
                    e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
                        pointers: b,
                        changedPointers: [a],
                        pointerType: f,
                        srcEvent: a
                    }), c && b.splice(h, 1))
                }
            });
            var Za = {touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha}, $a = "touchstart",
                _a = "touchstart touchmove touchend touchcancel";
            i(N, x, {
                handler: function (a) {
                    var b = Za[a.type];
                    if (b === Ea && (this.started = !0), this.started) {
                        var c = O.call(this, a, b);
                        b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                            pointers: c[0],
                            changedPointers: c[1],
                            pointerType: za,
                            srcEvent: a
                        })
                    }
                }
            });
            var ab = {touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha},
                bb = "touchstart touchmove touchend touchcancel";
            i(P, x, {
                handler: function (a) {
                    var b = ab[a.type], c = Q.call(this, a, b);
                    c && this.callback(this.manager, b, {
                        pointers: c[0],
                        changedPointers: c[1],
                        pointerType: za,
                        srcEvent: a
                    })
                }
            });
            var cb = 2500, db = 25;
            i(R, x, {
                handler: function (a, b, c) {
                    var d = c.pointerType == za, e = c.pointerType == Ba;
                    if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
                        if (d) S.call(this, b, c); else if (e && U.call(this, c)) return;
                        this.callback(a, b, c)
                    }
                }, destroy: function () {
                    this.touch.destroy(), this.mouse.destroy()
                }
            });
            var eb = u(na.style, "touchAction"), fb = eb !== d, gb = "compute", hb = "auto", ib = "manipulation",
                jb = "none", kb = "pan-x", lb = "pan-y", mb = X();
            V.prototype = {
                set: function (a) {
                    a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim()
                }, update: function () {
                    this.set(this.manager.options.touchAction)
                }, compute: function () {
                    var a = [];
                    return g(this.manager.recognizers, function (b) {
                        k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
                    }), W(a.join(" "))
                }, preventDefaults: function (a) {
                    var b = a.srcEvent, c = a.offsetDirection;
                    if (this.manager.session.prevented) return void b.preventDefault();
                    var d = this.actions, e = p(d, jb) && !mb[jb], f = p(d, lb) && !mb[lb], g = p(d, kb) && !mb[kb];
                    if (e) {
                        var h = 1 === a.pointers.length, i = a.distance < 2, j = a.deltaTime < 250;
                        if (h && i && j) return
                    }
                    return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0
                }, preventSrc: function (a) {
                    this.manager.session.prevented = !0, a.preventDefault()
                }
            };
            var nb = 1, ob = 2, pb = 4, qb = 8, rb = qb, sb = 16, tb = 32;
            Y.prototype = {
                defaults: {}, set: function (a) {
                    return la(this.options, a), this.manager && this.manager.touchAction.update(), this
                }, recognizeWith: function (a) {
                    if (f(a, "recognizeWith", this)) return this;
                    var b = this.simultaneous;
                    return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
                }, dropRecognizeWith: function (a) {
                    return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this)
                }, requireFailure: function (a) {
                    if (f(a, "requireFailure", this)) return this;
                    var b = this.requireFail;
                    return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this
                }, dropRequireFailure: function (a) {
                    if (f(a, "dropRequireFailure", this)) return this;
                    a = _(a, this);
                    var b = r(this.requireFail, a);
                    return b > -1 && this.requireFail.splice(b, 1), this
                }, hasRequireFailures: function () {
                    return this.requireFail.length > 0
                }, canRecognizeWith: function (a) {
                    return !!this.simultaneous[a.id]
                }, emit: function (a) {
                    function b(b) {
                        c.manager.emit(b, a)
                    }

                    var c = this, d = this.state;
                    qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d))
                }, tryEmit: function (a) {
                    return this.canEmit() ? this.emit(a) : void (this.state = tb)
                }, canEmit: function () {
                    for (var a = 0; a < this.requireFail.length;) {
                        if (!(this.requireFail[a].state & (tb | nb))) return !1;
                        a++
                    }
                    return !0
                }, recognize: function (a) {
                    var b = la({}, a);
                    return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb))
                }, process: function (a) {
                }, getTouchAction: function () {
                }, reset: function () {
                }
            }, i(aa, Y, {
                defaults: {pointers: 1}, attrTest: function (a) {
                    var b = this.options.pointers;
                    return 0 === b || a.pointers.length === b
                }, process: function (a) {
                    var b = this.state, c = a.eventType, d = b & (ob | pb), e = this.attrTest(a);
                    return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb
                }
            }), i(ba, aa, {
                defaults: {event: "pan", threshold: 10, pointers: 1, direction: Pa},
                getTouchAction: function () {
                    var a = this.options.direction, b = [];
                    return a & Na && b.push(lb), a & Oa && b.push(kb), b
                },
                directionTest: function (a) {
                    var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY;
                    return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
                },
                attrTest: function (a) {
                    return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a))
                },
                emit: function (a) {
                    this.pX = a.deltaX, this.pY = a.deltaY;
                    var b = $(a.direction);
                    b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a)
                }
            }), i(ca, aa, {
                defaults: {event: "pinch", threshold: 0, pointers: 2}, getTouchAction: function () {
                    return [jb]
                }, attrTest: function (a) {
                    return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob)
                }, emit: function (a) {
                    if (1 !== a.scale) {
                        var b = a.scale < 1 ? "in" : "out";
                        a.additionalEvent = this.options.event + b
                    }
                    this._super.emit.call(this, a)
                }
            }), i(da, Y, {
                defaults: {event: "press", pointers: 1, time: 251, threshold: 9},
                getTouchAction: function () {
                    return [hb]
                },
                process: function (a) {
                    var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold,
                        f = a.deltaTime > b.time;
                    if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset(); else if (a.eventType & Ea) this.reset(), this._timer = e(function () {
                        this.state = rb, this.tryEmit()
                    }, b.time, this); else if (a.eventType & Ga) return rb;
                    return tb
                },
                reset: function () {
                    clearTimeout(this._timer)
                },
                emit: function (a) {
                    this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)))
                }
            }), i(ea, aa, {
                defaults: {event: "rotate", threshold: 0, pointers: 2}, getTouchAction: function () {
                    return [jb]
                }, attrTest: function (a) {
                    return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob)
                }
            }), i(fa, aa, {
                defaults: {event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1},
                getTouchAction: function () {
                    return ba.prototype.getTouchAction.call(this)
                },
                attrTest: function (a) {
                    var b, c = this.options.direction;
                    return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga
                },
                emit: function (a) {
                    var b = $(a.offsetDirection);
                    b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
                }
            }), i(ga, Y, {
                defaults: {
                    event: "tap",
                    pointers: 1,
                    taps: 1,
                    interval: 300,
                    time: 250,
                    threshold: 9,
                    posThreshold: 10
                }, getTouchAction: function () {
                    return [ib]
                }, process: function (a) {
                    var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold,
                        f = a.deltaTime < b.time;
                    if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();
                    if (d && f && c) {
                        if (a.eventType != Ga) return this.failTimeout();
                        var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                            h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                        this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                        var i = this.count % b.taps;
                        if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () {
                            this.state = rb, this.tryEmit()
                        }, b.interval, this), ob) : rb
                    }
                    return tb
                }, failTimeout: function () {
                    return this._timer = e(function () {
                        this.state = tb
                    }, this.options.interval, this), tb
                }, reset: function () {
                    clearTimeout(this._timer)
                }, emit: function () {
                    this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                }
            }), ha.VERSION = "2.0.8", ha.defaults = {
                domEvents: !1,
                touchAction: gb,
                enable: !0,
                inputTarget: null,
                inputClass: null,
                preset: [[ea, {enable: !1}], [ca, {enable: !1}, ["rotate"]], [fa, {direction: Na}], [ba, {direction: Na}, ["swipe"]], [ga], [ga, {
                    event: "doubletap",
                    taps: 2
                }, ["tap"]], [da]],
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    contentZooming: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                }
            };
            var ub = 1, vb = 2;
            ia.prototype = {
                set: function (a) {
                    return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
                }, stop: function (a) {
                    this.session.stopped = a ? vb : ub
                }, recognize: function (a) {
                    var b = this.session;
                    if (!b.stopped) {
                        this.touchAction.preventDefaults(a);
                        var c, d = this.recognizers, e = b.curRecognizer;
                        (!e || e && e.state & rb) && (e = b.curRecognizer = null);
                        for (var f = 0; f < d.length;) c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++
                    }
                }, get: function (a) {
                    if (a instanceof Y) return a;
                    for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
                    return null
                }, add: function (a) {
                    if (f(a, "add", this)) return this;
                    var b = this.get(a.options.event);
                    return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
                }, remove: function (a) {
                    if (f(a, "remove", this)) return this;
                    if (a = this.get(a)) {
                        var b = this.recognizers, c = r(b, a);
                        -1 !== c && (b.splice(c, 1), this.touchAction.update())
                    }
                    return this
                }, on: function (a, b) {
                    if (a !== d && b !== d) {
                        var c = this.handlers;
                        return g(q(a), function (a) {
                            c[a] = c[a] || [], c[a].push(b)
                        }), this
                    }
                }, off: function (a, b) {
                    if (a !== d) {
                        var c = this.handlers;
                        return g(q(a), function (a) {
                            b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a]
                        }), this
                    }
                }, emit: function (a, b) {
                    this.options.domEvents && ka(a, b);
                    var c = this.handlers[a] && this.handlers[a].slice();
                    if (c && c.length) {
                        b.type = a, b.preventDefault = function () {
                            b.srcEvent.preventDefault()
                        };
                        for (var d = 0; d < c.length;) c[d](b), d++
                    }
                }, destroy: function () {
                    this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
                }
            }, la(ha, {
                INPUT_START: Ea,
                INPUT_MOVE: Fa,
                INPUT_END: Ga,
                INPUT_CANCEL: Ha,
                STATE_POSSIBLE: nb,
                STATE_BEGAN: ob,
                STATE_CHANGED: pb,
                STATE_ENDED: qb,
                STATE_RECOGNIZED: rb,
                STATE_CANCELLED: sb,
                STATE_FAILED: tb,
                DIRECTION_NONE: Ia,
                DIRECTION_LEFT: Ja,
                DIRECTION_RIGHT: Ka,
                DIRECTION_UP: La,
                DIRECTION_DOWN: Ma,
                DIRECTION_HORIZONTAL: Na,
                DIRECTION_VERTICAL: Oa,
                DIRECTION_ALL: Pa,
                Manager: ia,
                Input: x,
                TouchAction: V,
                TouchInput: P,
                MouseInput: L,
                PointerEventInput: M,
                TouchMouseInput: R,
                SingleTouchInput: N,
                Recognizer: Y,
                AttrRecognizer: aa,
                Tap: ga,
                Pan: ba,
                Swipe: fa,
                Pinch: ca,
                Rotate: ea,
                Press: da,
                on: m,
                off: n,
                each: g,
                merge: ta,
                extend: sa,
                assign: la,
                inherit: i,
                bindFn: j,
                prefixed: u
            });
            var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
            wb.Hammer = ha, "function" == typeof define && define.amd ? define(function () {
                return ha
            }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha
        }(window, document, "Hammer");
        (function (factory) {
            if (typeof define === 'function' && define.amd) {
                define(['jquery', 'hammerjs'], factory);
            } else if (typeof exports === 'object') {
                factory(require('jquery'), require('hammerjs'));
            } else {
                factory(jQuery, Hammer);
            }
        }(function (jQuery, Hammer) {
            function hammerify(el, options) {
                var $el = jQuery(el);
                if (!$el.data("hammer")) {
                    $el.data("hammer", new Hammer($el[0], options));
                }
            }

            jQuery.fn.hammer = function (options) {
                return this.each(function () {
                    hammerify(this, options);
                });
            };

            // extend the emit method to also trigger jQuery events
            Hammer.Manager.prototype.emit = (function (originalEmit) {
                return function (type, data) {
                    originalEmit.call(this, type, data);
                    jQuery(this.element).trigger({
                        type: type,
                        gesture: data
                    });
                };
            })(Hammer.Manager.prototype.emit);
        }));

    } else {
        var Hammer = {
            Manager: {
                prototype: {}
            }
        };
        (function (factory) {
            if (typeof define === 'function' && define.amd) {
                define(['jquery', 'hammerjs'], factory);
            } else if (typeof exports === 'object') {
                factory(require('jquery'), require('hammerjs'));
            } else {
                factory(jQuery, Hammer);
            }
        }(function (jQuery, Hammer) {
            function hammerify(el, options) {
            }

            jQuery.fn.hammer = function (options) {
                return this.each(function () {
                    hammerify(this, options);
                });
            };
            // extend the emit method to also trigger jQuery events
            Hammer.Manager.prototype.emit = (function (originalEmit) {
                return function (type, data) {
                    originalEmit.call(this, type, data);
                    jQuery(this.element).trigger({
                        type: type,
                        gesture: data
                    });
                };
            })(Hammer.Manager.prototype.emit);
        }));
    }

//Only load the Masonry code if there's a masonry feed on the page
    if( jQuery('#cff.cff-masonry-js').length || typeof window.cff_block_editor !== 'undefined'){
        //Masonry
        !function(a){function b(){}
            function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}
                function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}
                    return this}
                    return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}
                if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}
            var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c("object"==typeof exports?require("jquery"):a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}
            var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(window),function(){function a(){}
            function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}
            function c(a){return function(){return this[a].apply(this,arguments)}}
            var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:e.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}
            var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}
            function c(){}
            function d(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}
                return a}
            function e(c){function e(){if(!m){m=!0;var d=a.getComputedStyle;if(j=function(){var a=d?function(a){return d(a,null)}:function(a){return a.currentStyle};return function(b){var c=a(b);return c||f("Style returned "+c+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),c}}(),k=c("boxSizing")){var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style[k]="border-box";var g=document.body||document.documentElement;g.appendChild(e);var h=j(e);l=200===b(h.width),g.removeChild(e)}}}
                function h(a){if(e(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var c=j(a);if("none"===c.display)return d();var f={};f.width=a.offsetWidth,f.height=a.offsetHeight;for(var h=f.isBorderBox=!(!k||!c[k]||"border-box"!==c[k]),m=0,n=g.length;n>m;m++){var o=g[m],p=c[o];p=i(a,p);var q=parseFloat(p);f[o]=isNaN(q)?0:q}
                    var r=f.paddingLeft+f.paddingRight,s=f.paddingTop+f.paddingBottom,t=f.marginLeft+f.marginRight,u=f.marginTop+f.marginBottom,v=f.borderLeftWidth+f.borderRightWidth,w=f.borderTopWidth+f.borderBottomWidth,x=h&&l,y=b(c.width);y!==!1&&(f.width=y+(x?0:r+v));var z=b(c.height);return z!==!1&&(f.height=z+(x?0:s+w)),f.innerWidth=f.width-(r+v),f.innerHeight=f.height-(s+w),f.outerWidth=f.width+t,f.outerHeight=f.height+u,f}}
                function i(b,c){if(a.getComputedStyle||-1===c.indexOf("%"))return c;var d=b.style,e=d.left,f=b.runtimeStyle,g=f&&f.left;return g&&(f.left=b.currentStyle.left),d.left=c,c=d.pixelLeft,d.left=e,g&&(f.left=g),c}
                var j,k,l,m=!1;return h}
            var f="undefined"==typeof console?c:function(a){console.error(a)},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],e):"object"==typeof exports?module.exports=e(require("desandro-get-style-property")):a.getSize=e(a.getStyleProperty)}(window),function(a){function b(a){"function"==typeof a&&(b.isReady?a():g.push(a))}
            function c(a){var c="readystatechange"===a.type&&"complete"!==f.readyState;b.isReady||c||d()}
            function d(){b.isReady=!0;for(var a=0,c=g.length;c>a;a++){var d=g[a];d()}}
            function e(e){return"complete"===f.readyState?d():(e.bind(f,"DOMContentLoaded",c),e.bind(f,"readystatechange",c),e.bind(a,"load",c)),b}
            var f=a.document,g=[];b.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],e):"object"==typeof exports?module.exports=e(require("eventie")):a.docReady=e(a.eventie)}(window),function(a){function b(a,b){return a[g](b)}
            function c(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}
            function d(a,b){c(a);for(var d=a.parentNode.querySelectorAll(b),e=0,f=d.length;f>e;e++)if(d[e]===a)return!0;return!1}
            function e(a,d){return c(a),b(a,d)}
            var f,g=function(){if(a.matches)return"matches";if(a.matchesSelector)return"matchesSelector";for(var b=["webkit","moz","ms","o"],c=0,d=b.length;d>c;c++){var e=b[c],f=e+"MatchesSelector";if(a[f])return f}}();if(g){var h=document.createElement("div"),i=b(h,"div");f=i?b:e}else f=d;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return f}):"object"==typeof exports?module.exports=f:window.matchesSelector=f}(Element.prototype),function(a,b){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(c,d){return b(a,c,d)}):"object"==typeof exports?module.exports=b(a,require("doc-ready"),require("desandro-matches-selector")):a.fizzyUIUtils=b(a,a.docReady,a.matchesSelector)}(window,function(a,b,c){var d={};d.extend=function(a,b){for(var c in b)a[c]=b[c];return a},d.modulo=function(a,b){return(a%b+b)%b};var e=Object.prototype.toString;d.isArray=function(a){return"[object Array]"==e.call(a)},d.makeArray=function(a){var b=[];if(d.isArray(a))b=a;else if(a&&"number"==typeof a.length)for(var c=0,e=a.length;e>c;c++)b.push(a[c]);else b.push(a);return b},d.indexOf=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},d.removeFrom=function(a,b){var c=d.indexOf(a,b);-1!=c&&a.splice(c,1)},d.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1==a.nodeType&&"string"==typeof a.nodeName},d.setText=function(){function a(a,c){b=b||(void 0!==document.documentElement.textContent?"textContent":"innerText"),a[b]=c}
            var b;return a}(),d.getParent=function(a,b){for(;a!=document.body;)if(a=a.parentNode,c(a,b))return a},d.getQueryElement=function(a){return"string"==typeof a?document.querySelector(a):a},d.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},d.filterFindElements=function(a,b){a=d.makeArray(a);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f];if(d.isElement(h))if(b){c(h,b)&&e.push(h);for(var i=h.querySelectorAll(b),j=0,k=i.length;k>j;j++)e.push(i[j])}else e.push(h)}
            return e},d.debounceMethod=function(a,b,c){var d=a.prototype[b],e=b+"Timeout";a.prototype[b]=function(){var a=this[e];a&&clearTimeout(a);var b=arguments,f=this;this[e]=setTimeout(function(){d.apply(f,b),delete f[e]},c||100)}},d.toDashed=function(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()};var f=a.console;return d.htmlInit=function(c,e){b(function(){for(var b=d.toDashed(e),g=document.querySelectorAll(".js-"+b),h="data-"+b+"-options",i=0,j=g.length;j>i;i++){var k,l=g[i],m=l.getAttribute(h);try{k=m&&JSON.parse(m)}catch(n){f&&f.error("Error parsing "+h+" on "+l.nodeName.toLowerCase()+(l.id?"#"+l.id:"")+": "+n);continue}
            var o=new c(l,k),p=a.jQuery;p&&p.data(l,e,o)}})},d}),function(a,b){"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(c,d,e,f){return b(a,c,d,e,f)}):"object"==typeof exports?module.exports=b(a,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(a.Outlayer={},a.Outlayer.Item=b(a,a.EventEmitter,a.getSize,a.getStyleProperty,a.fizzyUIUtils))}(window,function(a,b,c,d,e){function f(a){for(var b in a)return!1;return b=null,!0}
            function g(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}
            var h=a.getComputedStyle,i=h?function(a){return h(a,null)}:function(a){return a.currentStyle},j=d("transition"),k=d("transform"),l=j&&k,m=!!d("perspective"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[j],o=["transform","transition","transitionDuration","transitionProperty"],p=function(){for(var a={},b=0,c=o.length;c>b;b++){var e=o[b],f=d(e);f&&f!==e&&(a[e]=f)}
                return a}();e.extend(g.prototype,b.prototype),g.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.getSize=function(){this.size=c(this.element)},g.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=p[c]||c;b[d]=a[c]}},g.prototype.getPosition=function(){var a=i(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=parseInt(a[c?"left":"right"],10),f=parseInt(a[d?"top":"bottom"],10);e=isNaN(e)?0:e,f=isNaN(f)?0:f;var g=this.layout.size;e-=c?g.paddingLeft:g.paddingRight,f-=d?g.paddingTop:g.paddingBottom,this.position.x=e,this.position.y=f},g.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={},d=b.isOriginLeft?"paddingLeft":"paddingRight",e=b.isOriginLeft?"left":"right",f=b.isOriginLeft?"right":"left",g=this.position.x+a[d];g=b.percentPosition&&!b.isHorizontal?g/a.width*100+"%":g+"px",c[e]=g,c[f]="";var h=b.isOriginTop?"paddingTop":"paddingBottom",i=b.isOriginTop?"top":"bottom",j=b.isOriginTop?"bottom":"top",k=this.position.y+a[h];k=b.percentPosition&&b.isHorizontal?k/a.height*100+"%":k+"px",c[i]=k,c[j]="",this.css(c),this.emitEvent("layout",[this])};var q=m?function(a,b){return"translate3d("+a+"px, "+b+"px, 0)"}:function(a,b){return"translate("+a+"px, "+b+"px)"};g.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={},k=this.layout.options;h=k.isOriginLeft?h:-h,i=k.isOriginTop?i:-i,j.transform=q(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},g.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},g.prototype.moveTo=l?g.prototype._transitionTo:g.prototype.goTo,g.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},g.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},g.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}
                this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var r=k&&e.toDashed(k)+",opacity";g.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:r,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(n,this,!1))},g.prototype.transition=g.prototype[j?"_transition":"_nonTransition"],g.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},g.prototype.onotransitionend=function(a){this.ontransitionend(a)};var s={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};g.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,c=s[a.propertyName]||a.propertyName;if(delete b.ingProperties[c],f(b.ingProperties)&&this.disableTransition(),c in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[c]),c in b.onEnd){var d=b.onEnd[c];d.call(this),delete b.onEnd[c]}
                this.emitEvent("transitionEnd",[this])}},g.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(n,this,!1),this.isTransitioning=!1},g.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var t={transitionProperty:"",transitionDuration:""};return g.prototype.removeTransitionStyles=function(){this.css(t)},g.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},g.prototype.remove=function(){if(!j||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.once("transitionEnd",function(){a.removeElem()}),this.hide()},g.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("visibleStyle");b[c]=this.onRevealTransitionEnd,this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},g.prototype.getHideRevealTransitionEndProperty=function(a){var b=this.layout.options[a];if(b.opacity)return"opacity";for(var c in b)return c},g.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("hiddenStyle");b[c]=this.onHideTransitionEnd,this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},g.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},g}),function(a,b){"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(c,d,e,f,g){return b(a,c,d,e,f,g)}):"object"==typeof exports?module.exports=b(a,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):a.Outlayer=b(a,a.eventie,a.EventEmitter,a.getSize,a.fizzyUIUtils,a.Outlayer.Item)}(window,function(a,b,c,d,e,f){function g(a,b){var c=e.getQueryElement(a);if(!c)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(c||a)));this.element=c,i&&(this.$element=i(this.element)),this.options=e.extend({},this.constructor.defaults),this.option(b);var d=++k;this.element.outlayerGUID=d,l[d]=this,this._create(),this.options.isInitLayout&&this.layout()}
            var h=a.console,i=a.jQuery,j=function(){},k=0,l={};return g.namespace="outlayer",g.Item=f,g.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e.extend(g.prototype,c.prototype),g.prototype.option=function(a){e.extend(this.options,a)},g.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},g.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},g.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}
                return d},g.prototype._filterFindItemElements=function(a){return e.filterFindElements(a,this.options.itemSelector)},g.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},g.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},g.prototype._init=g.prototype.layout,g.prototype._resetLayout=function(){this.getSize()},g.prototype.getSize=function(){this.size=d(this.element)},g.prototype._getMeasurement=function(a,b){var c,f=this.options[a];f?("string"==typeof f?c=this.element.querySelector(f):e.isElement(f)&&(c=f),this[a]=c?d(c)[b]:f):this[a]=0},g.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},g.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}
                return b},g.prototype._layoutItems=function(a,b){if(this._emitCompleteOnItems("layout",a),a&&a.length){for(var c=[],d=0,e=a.length;e>d;d++){var f=a[d],g=this._getItemLayoutPosition(f);g.item=f,g.isInstant=b||f.isLayoutInstant,c.push(g)}
                this._processLayoutQueue(c)}},g.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},g.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},g.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},g.prototype._postLayout=function(){this.resizeContainer()},g.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},g.prototype._getContainerSize=j,g.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},g.prototype._emitCompleteOnItems=function(a,b){function c(){e.emitEvent(a+"Complete",[b])}
                function d(){g++,g===f&&c()}
                var e=this,f=b.length;if(!b||!f)return void c();for(var g=0,h=0,i=b.length;i>h;h++){var j=b[h];j.once(a,d)}},g.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},g.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},g.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},g.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e.removeFrom(this.stamps,d),this.unignore(d)}},g.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=e.makeArray(a)):void 0},g.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},g.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},g.prototype._manageStamp=j,g.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,e=d(a),f={left:b.left-c.left-e.marginLeft,top:b.top-c.top-e.marginTop,right:c.right-b.right-e.marginRight,bottom:c.bottom-b.bottom-e.marginBottom};return f},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.bindResize=function(){this.isResizeBound||(b.bind(a,"resize",this),this.isResizeBound=!0)},g.prototype.unbindResize=function(){this.isResizeBound&&b.unbind(a,"resize",this),this.isResizeBound=!1},g.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}
                this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},g.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},g.prototype.needsResizeLayout=function(){var a=d(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},g.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},g.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},g.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},g.prototype.reveal=function(a){this._emitCompleteOnItems("reveal",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.reveal()}},g.prototype.hide=function(a){this._emitCompleteOnItems("hide",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.hide()}},g.prototype.revealItemElements=function(a){var b=this.getItems(a);this.reveal(b)},g.prototype.hideItemElements=function(a){var b=this.getItems(a);this.hide(b)},g.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},g.prototype.getItems=function(a){a=e.makeArray(a);for(var b=[],c=0,d=a.length;d>c;c++){var f=a[c],g=this.getItem(f);g&&b.push(g)}
                return b},g.prototype.remove=function(a){var b=this.getItems(a);if(this._emitCompleteOnItems("remove",b),b&&b.length)for(var c=0,d=b.length;d>c;c++){var f=b[c];f.remove(),e.removeFrom(this.items,f)}},g.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}
                this.unbindResize();var e=this.element.outlayerGUID;delete l[e],delete this.element.outlayerGUID,i&&i.removeData(this.element,this.constructor.namespace)},g.data=function(a){a=e.getQueryElement(a);var b=a&&a.outlayerGUID;return b&&l[b]},g.create=function(a,b){function c(){g.apply(this,arguments)}
                return Object.create?c.prototype=Object.create(g.prototype):e.extend(c.prototype,g.prototype),c.prototype.constructor=c,c.defaults=e.extend({},g.defaults),e.extend(c.defaults,b),c.prototype.settings={},c.namespace=a,c.data=g.data,c.Item=function(){f.apply(this,arguments)},c.Item.prototype=new f,e.htmlInit(c,a),i&&i.bridget&&i.bridget(a,c),c},g.Item=f,g}),function(a,b){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],b):"object"==typeof exports?module.exports=b(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):a.Masonry=b(a.Outlayer,a.getSize,a.fizzyUIUtils)}(window,function(a,b,c){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}
            var d=this.columnWidth+=this.gutter,e=this.containerWidth+this.gutter,f=e/d,g=d-e%d,h=g&&1>g?"round":"floor";f=Math[h](f),this.cols=Math.max(f,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c.indexOf(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}
            return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d})

        function cffAddMasonry($self) {

            var evt = jQuery.Event('cffbeforemasonry');
            evt.$self = $self;
            jQuery(window).trigger(evt);

            if (typeof $self.masonry !== 'function') {
                return;
            }
            if (jQuery(window).width() > 480 && $self.hasClass('masonry-1-desktop') ){
                $self.addClass('cff-disable-masonry');
            } else if (jQuery(window).width() > 780 || $self.hasClass('masonry-2-mobile') ) {
                //Add the class in case it was removed when resizing down
                $self.addClass('cff-masonry cff-masonry-js').removeClass('cff-disable-masonry');
                if($self.find('.cff-item').length) {
                    window.cffMasonrySettings.itemSelector = '.cff-new, .cff-item, .cff-likebox';
                    $self.masonry(window.cffMasonrySettings);
                    // Add margin to the bottom of each post to give some space
                    $self.find('.cff-item').each( function() {
                        jQuery(this).css('margin-bottom', '15px');
                    });
                } else if($self.find('.cff-album-item').length) {
                    window.cffMasonrySettings.itemSelector = '.cff-album-item';
                    $self.masonry(window.cffMasonrySettings);
                }
            } else {
                //Disable masonry in 1 col mobile as isn't needed
                $self.addClass('cff-disable-masonry');
            }
        }

    } //End Masonry code

    window.cffMasonrySettings = {itemSelector: '.cff-album-item' };

    function Cff() {
        this.feeds = {};
        this.options = {};
    }

    Cff.prototype = {
        createPage: function (createFeeds, createFeedsArgs) {

            if (typeof window.cffOptions === 'undefined'
                || typeof window.cffOptions.resized_url === 'undefined') {
                window.cffOptions = {
                    resized_url: location.protocol + '//' + window.location.hostname + "/wp-content/uploads/sb-facebook-feed-images/",
                    placeholder: location.protocol + '//' + window.location.hostname + "/wp-content/plugins/custom-facebook-feed-pro/assets/img/placeholder.png",
                }
            }

            createFeeds(createFeedsArgs);
        },
        createFeeds: function (args) {
            jQuery('.cff').each(function (index) {
                jQuery(this).attr('data-cff-index', index + 1);
                var $self = jQuery(this),
                    flags = typeof $self.attr('data-cff-flags') !== 'undefined' ? $self.attr('data-cff-flags').split(',') : [];
                var feedOptions = {
                    feedID : $self.find('.cff_resized_image_data').attr('data-feedid'),
                    shortCodeAtts : $self.attr('data-cff-shortcode'),
                    resizingEnabled : $self.find('.cff_resized_image_data').length,
                    page: 1,
                    pag_url : '',
                    gdpr : (flags.indexOf('gdpr') > -1),
                    overrideBlockCDN : (flags.indexOf('overrideBlockCDN') > -1),
                    consentGiven : false,
                    locator : (flags.indexOf('locator') > -1),
                    postID : typeof $self.attr( 'data-postid' ) !== 'undefind' ? $self.attr( 'data-postid' ) : 'unknown',
                };

                window.cff.feeds[index] = new CffFeed(this, index, feedOptions);
                if (typeof window.cff.feeds[index].setResizedImages !== 'undefined') {
                    window.cff.feeds[index].setResizedImages();
                }
                if (typeof window.cff.feeds[index].setResizedImages !== 'undefined') {
                    window.cff.feeds[index].init();
                }
            });
        },

    };

    function CffFeed(el, index, settings) {
        this.el = el;
        this.index = index;
        this.settings = settings;
        this.resizedImages = {};
        this.needsResizing = [];
        this.imagesWaiting = 0;
    }

    CffFeed.prototype = {
        init: function() {
            var feed = this;
            feed.settings.consentGiven = feed.checkConsent();
            if (!feed.settings.consentGiven) {
                if (jQuery(this.el).find('.cff-load-more').is(':visible')) {
                    jQuery(this.el).find('.cff-load-more').hide().addClass('cff-no-consent-hide');
                }
                var $wrapper = jQuery(this.el).closest('.cff-wrapper');
                if ($wrapper.find('.cff-visual-header').length) {
                    $wrapper.find('.cff-header-text').closest('.cff-visual-header').addClass('cff-no-consent');
                }
                $wrapper.find('.fb-video').addClass('cff-no-consent');

                setTimeout(function() {
                    feed.settings.consentGiven = feed.checkConsent();
                    if (feed.settings.consentGiven) {
                        feed.addFullFeatures();
                    }
                },1000);
            }

            var cff_delay = (function () {
                var cff_timer = 0;
                return function (cff_callback, cff_ms) {
                    clearTimeout(cff_timer);
                    cff_timer = setTimeout(cff_callback, cff_ms);
                };
            })();
            this.afterInitialImagesLoaded();
            jQuery(window).on('resize', function () {
                cff_delay(function () {
                    feed.afterResize();
                }, 500);
            });

            jQuery(this.el).find('.cff-item').each(function() {
                feed.lazyLoadCheck(jQuery(this));
            });

        },
        addFullFeatures: function() {
            var $ = jQuery,
                $self = jQuery(this.el);
            jQuery('.cff-gdpr-notice').remove();

            jQuery(this.el).find('.cff-author-img').each(function() {
                $(this).find('img').attr('src',$(this).attr('data-avatar'));
                $(this).removeClass('cff-no-consent');
            });
            jQuery('.fb-video.cff-no-consent').removeClass('cff-no-consent');

            if (jQuery('.cff-visual-header').length) {
                jQuery('.cff-visual-header').each(function() {
                    jQuery(this).removeClass('cff-no-consent');
                    if (jQuery(this).find('.cff-header-hero').length) {
                        jQuery(this).find('.cff-header-hero').find('img').attr('src',jQuery(this).find('.cff-header-hero').find('img').attr('data-cover-url'))
                    }
                    if (jQuery(this).find('.cff-header-img').length) {
                        jQuery(this).find('.cff-header-img').find('img').attr('src',jQuery(this).find('.cff-header-img').find('img').attr('data-avatar'))
                    }
                });


            }
            jQuery('.cff-comment:visible').each(function() {
                var $thisComment = jQuery(this); // here
                var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;
                if (consentGiven) {
                    $thisComment.find('.cff-comment-img:not(.cff-comment-reply-img) a, .cff-comment-img:not(.cff-comment-reply-img) span').html('<img src="' + $thisComment.attr("data-avatar") + '" alt="Avatar" onerror="this.style.display=\'none\'" />');
                }
            });

            //cff-comment-image-placeholder, <img src="'+commentItem.attachment.media.image.src+'" alt=""/>
            jQuery('.cff-comment-image-placeholder').each(function() {
                jQuery(this).replaceWith('<img src="'+jQuery(this).attr('data-src')+'" alt="Attachement"/>');
            });
            //
            jQuery('.cff-likebox iframe').each(function(){
                var $likebox = $(this),
                    likeboxWidth = $likebox.attr('data-likebox-width'),
                    cffFeedWidth = $likebox.parent().width();

                //Default width is 340
                if( likeboxWidth == '' ) likeboxWidth = 340;
                //Change the width dynamically so it's responsive
                if( cffFeedWidth < likeboxWidth ) likeboxWidth = cffFeedWidth;

                $likebox.attr('src', 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F'+$likebox.attr('data-likebox-id')+'%2F&tabs&width='+Math.floor(likeboxWidth)+'&small_header='+$likebox.attr('data-likebox-header')+'&adapt_container_width=true&hide_cover='+$likebox.attr('data-hide-cover')+'&hide_cta='+$likebox.attr('data-hide-cta')+'&show_facepile='+$likebox.attr('data-likebox-faces')+'&locale='+$likebox.attr('data-locale'));
            });
            jQuery('.cff-iframe-placeholder').each(function(){
                var $placeholder = jQuery(this),
                    src = $placeholder.attr('data-src'),
                    type = $placeholder.attr('data-type');
                switch (type) {
                    case 'facebook':
                        $placeholder.replaceWith('<iframe src="'+src+'" title="Facebook video player" allowfullscreen frameborder="0" webkitallowfullscreen mozallowfullscreen></iframe>');
                        break;
                    case 'youtube':
                        $placeholder.replaceWith('<iframe class="youtube-player" type="text/html" src="'+src+'" allowfullscreen title="YouTube video"></iframe>');
                        break;
                    case 'vimeo':
                        $placeholder.replaceWith('<iframe src="'+src+'" webkitAllowFullScreen mozallowfullscreen allowFullScreen title="Vimeo video"></iframe>');
                        break;
                    case 'soundcloud':
                        $placeholder.replaceWith('<iframe class="cff-soundcloud" width="100%" height="100" scrolling="no" title="Music player" frameborder="no" src="'+src+'"></iframe>');
                        break;
                    case 'spotify':
                        $placeholder.replaceWith('<iframe class="cff-spotify" src="'+src+'" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
                        break;
                    case 'video':
                        var posterSrc = $placeholder.attr('data-poster-src');
                        $placeholder.replaceWith('<video src="'+src+'" poster="'+posterSrc+'" preload="none"></video>');
                        break;
                }
            });

            jQuery(this.el).find('.cff-load-more.cff-no-consent-hide').show();

            this.afterResize();
        },
        setResizedImages: function() {
            if (jQuery(this.el).find('.cff_resized_image_data').length
                && typeof jQuery(this.el).find('.cff_resized_image_data').attr('data-resized') !== 'undefined'
                && (jQuery(this.el).find('.cff_resized_image_data').attr('data-resized').indexOf('{"') === 0 || jQuery(this.el).find('.cff_resized_image_data').attr('data-resized').indexOf('[') === 0)) {
                var rawResized = JSON.parse(jQuery(this.el).find('.cff_resized_image_data').attr('data-resized')),
                    organizedResized = {};

                jQuery.each(rawResized,function(index,value) {
                    organizedResized[value.facebook_id] = {
                        id: value.media_id,
                        sizes: JSON.parse(value.sizes),
                        aspect: value.aspect_ratio
                    }

                });

                this.resizedImages = organizedResized;
            }
            jQuery(this.el).find('.cff_resized_image_data').remove();
        },
        sendNeedsResizingToServer: function() {
            var feed = this;

            if (feed.needsResizing.length > 0 && feed.settings.resizingEnabled) {
                var itemOffset = jQuery(this.el).find('.cff-item').length;
                if (!feed.settings.consentGiven
                    && !feed.settings.overrideBlockCDN) {
                    if (typeof jQuery(this.el).find('.cff-lightbox-link').attr('data-cff-lightbox') !== 'undefined') {
                        jQuery(this.el).find('.cff-lightbox-link').attr('data-x-cff-lightbox',jQuery(this.el).find('.cff-lightbox-link').attr('data-cff-lightbox'));
                        jQuery(this.el).find('.cff-lightbox-link').removeAttr('data-cff-lightbox');
                    }
                }

                var submitData = {
                    action: 'cff_resized_images_submit',
                    needs_resizing: feed.needsResizing,
                    offset: itemOffset,
                    feed_id: feed.settings.feedID,
                    atts: feed.settings.shortCodeAtts,
                    pag_url: feed.pag_url,
                    location: feed.locationGuess(),
                    post_id: feed.settings.postID,
                };
                var onSuccess = function(data) {
                    feed.needsResizing = [];
                    if (data.trim().indexOf('{') === 0) {
                        var response = JSON.parse(data);
                        if (feed.settings.debugEnabled) {
                            console.log(response);
                        }

                        if (typeof response.resizing !== 'undefined') {
                            var resized = response.resizing;
                            for (var property in resized) {
                                if (resized.hasOwnProperty(property)) {
                                    feed.resizedImages[property] = resized[property];
                                }
                            }
                            feed.maybeRaiseImageResolution();

                            if (typeof jQuery(feed.el).find('.cff-lightbox-link').attr('data-x-cff-lightbox') !== 'undefined') {
                                jQuery(feed.el).find('.cff-lightbox-link').attr('data-cff-lightbox',jQuery(feed.el).find('.cff-lightbox-link').attr('data-x-cff-lightbox'));
                                jQuery(feed.el).find('.cff-lightbox-link').removeAttr('data-x-cff-lightbox');
                            }

                            setTimeout(function() {
                                feed.afterResize();
                            },500);
                        }
                    }
                };
                cffAjax(submitData,onSuccess);
            } else if (feed.settings.locator) {
                    var submitData = {
                        action: 'cff_do_locator',
                        feed_id: feed.settings.feedID,
                        atts: feed.settings.shortCodeAtts,
                        location: feed.locationGuess(),
                        post_id: feed.settings.postID
                    };
                    var onSuccess = function(data) {

                    };
                    cffAjax(submitData,onSuccess);
            }
        },
        hasTargetElement: function($cffItem) {
            var $target = $cffItem;
            if ($cffItem.find('.cff-photo').length) {
                $target = $cffItem.find('.cff-photo');
            } else if ($cffItem.find('.cff-poster').length) {
                $target = $cffItem.find('.cff-poster');
            } else if ($cffItem.find('.cff-link-slider-slides').length) {
                $target = $cffItem.find('.cff-link-slider-slides');
            } else if ($cffItem.find('.cff-img-wrap').length) {
                $target = $cffItem.find('.cff-img-wrap');
            } else if ($cffItem.find('.cff-album-cover').length) {
                $target = $cffItem.find('.cff-album-cover');
            } else if ($cffItem.find('.cff-link').length) {
                $target = $cffItem.find('.cff-link');
            }

            return typeof $target.attr('data-img-src-set') !== 'undefined';
        },
        getTargetElement: function($cffItem) {
            var $target = $cffItem.find('.cff-photo');

            if ($cffItem.find('.cff-poster').length) {
                $target = $cffItem.find('.cff-poster');
            } else if ($cffItem.find('.cff-link-slider-slides').length) {
                $target = $cffItem.find('.cff-link-slider-item');
            } else if ($cffItem.find('.cff-img-wrap').length) {
                $target = $cffItem.find('.cff-img-wrap');
            } else if ($cffItem.find('.cff-album-cover').length) {
                $target = $cffItem.find('.cff-album-cover');
            } else if ($cffItem.find('.cff-link').length) {
                $target = $cffItem.find('.cff-link');
            }

            return $target;
        },
        getTargetElementImage: function($targetItem) {
            if ($targetItem.find('img').length) {
                return $targetItem.find('img');
            } else {
                return $targetItem;
            }
        },
        getTargetWidth: function($imgWrapItem,$item,index) {
            var width = 50,
                newWidth = 0;

            if ($item.find('.cff-multi-image').length > 2 && index > 0) {
                newWidth = $item.innerWidth() / 3;
            } else if ($item.closest('.cff-masonry').length) {
                newWidth = $item.innerWidth();
            } else if ($imgWrapItem.closest('.cff-item').find('.cff-link-slider').length) {
                newWidth = $imgWrapItem.closest('.cff-item').find('.cff-link-slider').width();
            } else if ($imgWrapItem.closest('.cff-media-wrap').length
                && !$imgWrapItem.closest('.cff-thumb-layout').length
                && !$imgWrapItem.closest('.cff-half-layout').length) {
                newWidth = $imgWrapItem.closest('.cff-media-wrap').width();
            } else {
                newWidth = $imgWrapItem.innerWidth();
            }

            return Math.max(width,newWidth);
        },
        maybeRaiseSingleImageResolution: function ($item, index, forceChange) {
            var feed = this,
                $target = feed.getTargetElement($item),
                imgSrcSet = feed.getImageUrls($item,$target);

            $target.each(function(i) {
                var $imgWrapItem = jQuery(this),
                    $targetImageElement = feed.getTargetElementImage($imgWrapItem),
                    currentUrl = $targetImageElement.attr('src'),
                    currentRes = typeof $imgWrapItem.attr('data-current') === 'undefined' ? 0 : parseInt($imgWrapItem.attr('data-current')),
                    neededRes = feed.getTargetWidth($imgWrapItem,$item,i),
                    changeToRes = false;

                if (currentRes < neededRes && typeof imgSrcSet[i] !== 'undefined') {
                    var foundBestRes = false;
                    jQuery.each(imgSrcSet[i], function (ii, value) {

                        if (! foundBestRes && ii > currentRes) {
                            changeToRes = ii;
                            if (ii >= neededRes) {
                                foundBestRes = true;
                            }
                        }
                    });
                }

                if (!feed.settings.consentGiven) {
                    //'a[data-cff-lightbox], area[data-cff-lightbox]'
                    var $lightboxAnchor = false;
                    if ($imgWrapItem.find('a[data-cff-lightbox]').length) {
                        $lightboxAnchor = $imgWrapItem.find('a[data-cff-lightbox]');

                    } else if ($imgWrapItem.closest('.cff-item').find('a[data-cff-lightbox]').length) {
                        $lightboxAnchor = $imgWrapItem.closest('.cff-item').find('a[data-cff-lightbox]');

                    } if ($imgWrapItem.find('area[data-cff-lightbox]').length) {
                        $lightboxAnchor = $imgWrapItem.find('area[data-cff-lightbox]');

                    } else if ($imgWrapItem.closest('.cff-item').find('area[data-cff-lightbox]').length) {
                        $lightboxAnchor = $imgWrapItem.closest('.cff-item').find('area[data-cff-lightbox]');

                    }
                    if ($lightboxAnchor) {
                        $lightboxAnchor.attr('href',feed.getMaxResImage(imgSrcSet,i));
                    }

                    //getMaxResImage: function(imgSrcSet,index)

                }

                if (changeToRes) {
                    currentRes = changeToRes;
                    if (feed.settings.debugEnabled) {
                        var reason = currentUrl === feed.placeholderURL ? 'was placeholder' : 'too small';
                    }
                    $imgWrapItem.attr('data-current',changeToRes);
                    var newUrl = imgSrcSet[i][changeToRes];
                    if (newUrl !== currentUrl) {
                        $targetImageElement.attr('src', newUrl);
                        if ($imgWrapItem.hasClass('imgLiquid_ready')) {
                            $imgWrapItem.css('background-image', 'url("' + newUrl + '")');
                            $imgWrapItem.imgLiquid({fill:true});
                        }

                        feed.processNewImage($imgWrapItem);

                        if (currentRes < 720 && $item.hasClass('cff-album-item') && ! $targetImageElement.hasClass('cff-secondary-check')) {
                            $targetImageElement.addClass('cff-secondary-check');
                            $targetImageElement.on('load',function() {
                                if (!jQuery(this).hasClass('cff-secondary-checked')) {
                                    jQuery(this).addClass('cff-secondary-checked');
                                    var imagEl = $targetImageElement.get(0),
                                        height = imagEl.naturalHeight,
                                        aspectRatio = imagEl.naturalWidth/imagEl.naturalHeight;

                                    if ($targetImageElement.innerWidth() > height) {
                                        neededRes = feed.getTargetWidth($imgWrapItem,$item,i) * aspectRatio;
                                        if (parseInt(currentRes) < neededRes) {
                                            foundBestRes = false;
                                            jQuery.each(imgSrcSet[i], function (ii, value) {

                                                if (! foundBestRes && ii > currentRes) {
                                                    changeToRes = ii;
                                                    if (ii >= neededRes) {
                                                        foundBestRes = true;
                                                    }
                                                }
                                            });

                                            if (changeToRes) {
                                                $imgWrapItem.attr('data-current', changeToRes);
                                                var newUrl = imgSrcSet[i][changeToRes];
                                                if (newUrl !== currentUrl) {
                                                    $targetImageElement.attr('src', newUrl);
                                                    if ($imgWrapItem.hasClass('imgLiquid_ready')) {
                                                        $imgWrapItem.css('background-image', 'url("' + newUrl + '")');
                                                        $imgWrapItem.imgLiquid({fill:true});
                                                    }

                                                    feed.processNewImage($imgWrapItem);
                                                }
                                            }
                                        }
                                    }
                                }

                            });
                        }

                    }

                }

                $targetImageElement.on('error', function () {
                    if (!jQuery(this).hasClass('cff-img-error')) {
                        jQuery(this).addClass('cff-img-error');
                        var newUrl = typeof jQuery(this).attr('data-orig-source') !== 'undefined' ? jQuery(this).attr('data-orig-source') : false;
                        if (newUrl && newUrl !== currentUrl) {
                            $targetImageElement.attr('src', newUrl);
                            if ($imgWrapItem.hasClass('imgLiquid_ready')) {
                                $imgWrapItem.css('background-image', 'url("' + newUrl + '")');
                            }
                        }
                        setTimeout(function() {
                            feed.afterResize();
                        }, 1500)
                    } else {
                        console.log('unfixed error ' + jQuery(this).attr('src'));
                    }
                });
            });


        },
        maybeRaiseImageResolution: function (justNew) {
            var feed = this,
                itemsSelector = typeof justNew !== 'undefined' && justNew === true ? '.cff-item.cff-new, .cff-album-item.cff-new' : '.cff-item, .cff-album-item';
            jQuery(feed.el).find(itemsSelector).each(function (index) {
                if (!jQuery(this).hasClass('cff-num-diff-hide')
                    && feed.hasTargetElement(jQuery(this))) {
                    feed.maybeRaiseSingleImageResolution(jQuery(this),index);
                }
            }); //End .cff-item each
        },
        getImageUrls: function ($item,$target) {
            var feed = this,
                srcSet = {},
                $srcSetItem = false,
                id = $item.attr('id').replace('cff_', '');

            if (typeof $target.attr('data-img-src-set') !== 'undefined') {
                $srcSetItem = $target;
            } else if (typeof $item.find('.cff-photo').attr('data-img-src-set') !== 'undefined') {
                $srcSetItem = $item.find('.cff-photo');
            } else if (typeof $item.find('.cff-link-slider-slides').attr('data-img-src-set') !== 'undefined') {
                $srcSetItem = $item.find('.cff-link-slider-slides');
            } else if (typeof $item.find('.cff-album-cover').attr('data-img-src-set') !== 'undefined') {
                $srcSetItem = $item.find('.cff-album-cover');
            }

            if ($srcSetItem) {
                srcSet = JSON.parse($srcSetItem.attr('data-img-src-set').replace(/\\\//g, '/'))
            }

            if (!this.settings.consentGiven && !this.settings.overrideBlockCDN) {
                jQuery.each(srcSet,function(index,value) {
                    srcSet[index] = {};
                });
            }

            var returnSrcSet = srcSet;
            if (typeof feed.resizedImages[id] === 'undefined' && id.indexOf('_') === -1) {
                id = $item.attr('data-page-id') + '_' + id;
            }
            if (typeof feed.resizedImages[id] !== 'undefined'
                && feed.resizedImages[id].id !== 'pending'
                && feed.resizedImages[id].id !== 'error') {
                jQuery.each(srcSet,function(index,value) {

                    if (feed.settings.consentGiven) {
                        returnSrcSet[index] = {};
                        var apiSourceSet = JSON.parse($srcSetItem.attr('data-img-src-set').replace(/\\\//g, '/'));

                        jQuery.each(apiSourceSet[index],function(index2,value2) {
                            if (index2 > 700
                                || index2 < 220) {
                                returnSrcSet[index][index2] = value2;
                            }
                        });
                    }


                    jQuery.each(feed.resizedImages[id].sizes,function(index2,value2) {
                        returnSrcSet[index][value2] = window.cffOptions.resized_url+feed.resizedImages[id].id+'-'+index+'-'+value2+'.jpg';
                    });
                });
            } else if (typeof this.resizedImages[id] === 'undefined'
                || (typeof this.resizedImages[id]['id'] !== 'undefined' && this.resizedImages[id]['id'] !== 'pending' && this.resizedImages[id]['id'] !== 'error')) {
                var hasMediumSize = false;

                jQuery.each(returnSrcSet[0],function(resolution) {
                    if (parseInt(resolution) > 150 && parseInt(resolution) < 500) {
                        hasMediumSize = true;
                    }
                });
                if (feed.settings.gdpr) {
                    hasMediumSize = false;
                }
                if (!hasMediumSize) {
                    this.addToNeedsResizing(id);
                }
            }

            return returnSrcSet;
        },
        addToNeedsResizing: function (id) {
            if (this.needsResizing.indexOf(id) === -1) {
                this.needsResizing.push(id);
            }
        },
        processNewImage: function($item) {
            var feed = this;
            $item.find('img').each(function() {
                if (!jQuery(this).prop('complete')) {
                    feed.imagesWaiting++;
                    jQuery(this).addClass('cff-image-loading').on('load',function() {
                        jQuery(this).removeClass('cff-image-loading');
                        feed.imagesWaiting--;
                        if (feed.imagesWaiting < 1) {
                            feed.afterResize();
                        }
                    });
                    jQuery(this).on('error',function() {
                        jQuery(this).removeClass('cff-image-loading');
                        feed.imagesWaiting--;
                        if (feed.imagesWaiting < 1) {
                            feed.afterResize();
                        }
                    });
                }
            });
        },
        getMaxResImage: function(imgSrcSet,index) {
            if (typeof imgSrcSet[index] === 'undefined') {
                return false;
            }
            var largest = 0,
                largestImage = false;
            jQuery.each(imgSrcSet[index], function (index, value) {
                if (index > largest) {
                    largest = index;
                    largestImage = value.toString();
                }
            });

            return largestImage;
        },
        lazyLoadCheck: function($item){
            var feed = this,
                $target = feed.getTargetElement($item),
                imgSrcSet = feed.getImageUrls($item,$target);
            if (!$item.closest('.cff').hasClass('cff-no-ll-check')) {
                $item.find('img').each(function(index) {
                    if (typeof jQuery(this).attr('data-src') !== 'undefined') {
                        jQuery(this).attr('data-src',jQuery(this).attr('data-orig-source'));
                    }
                    if (typeof jQuery(this).attr('data-orig-src') !== 'undefined') {
                        jQuery(this).attr('data-orig-src',jQuery(this).attr('data-orig-source'));
                    }

                    if (!feed.settings.consentGiven) {
                        jQuery(this).removeAttr('data-orig-source');
                        maxResImage = feed.getMaxResImage(imgSrcSet,index);
                        if (maxResImage && maxResImage.indexOf('scontent') === -1) {
                            jQuery(this).attr('data-orig-source',maxResImage);
                        }
                    }

                    jQuery(this).on('load',function() {
                        if (!jQuery(this).hasClass('cff-replaced')
                            && jQuery(this).attr('src').indexOf('placeholder') > -1) {
                            jQuery(this).addClass('cff-replaced');
                            var origSource = typeof jQuery(this).attr('data-orig-source') !== 'undefined' ? jQuery(this).attr('data-orig-source') : false;
                            if (origSource) {
                                jQuery(this).attr('src',jQuery(this).attr('data-orig-source'));
                                if (jQuery(this).closest('.imgLiquid_bgSize').length) {
                                    jQuery(this).closest('.imgLiquid_bgSize').css('background-image', 'url(' + origSource + ')');
                                }
                            }
                        }
                    });
                });
            }
        },
        maybeRelayoutMasonry: function() {
            var $cff = jQuery(this.el);
            if ($cff.hasClass('cff-masonry-js') && !$cff.hasClass('cff-masonry-css')){
                var cff_delay = (function () {
                    var cff_timer = 0;
                    return function (cff_callback, cff_ms) {
                        clearTimeout(cff_timer);
                        cff_timer = setTimeout(cff_callback, cff_ms);
                    };
                })();
                cff_delay(function () {
                    cffAddMasonry($cff);
                }, 500);
            }
        },
        afterInitialImagesLoaded: function(){
            this.maybeRaiseImageResolution();
            this.sendNeedsResizingToServer();
            this.maybeCleanUpNew();
            if (this.settings.consentGiven) {
                this.addFullFeatures();
            }else{
                jQuery('.cff-gdpr-notice').css({'display':'inline-block'});
            }
        },
        afterResize: function () {
            this.maybeRaiseImageResolution();
            this.maybeRelayoutMasonry();
        },
        afterLoadMoreClicked: function() {
            this.maybeRaiseImageResolution();
            this.addFullFeatures();
        },
        maybeCleanUpNew: function() {
            var feed = this,
                $cff = jQuery(this.el);
            setTimeout(function() {
                if  (feed.index > 0) {
                    $cff.find('.cff-new').removeClass('cff-new');
                }
                $cff.find('img').each(function() {
                    if (feed.settings.consentGiven && !jQuery(this).hasClass('cff-image-loading')
                    && ( jQuery(this).attr('src') != null && jQuery(this).attr('src') != undefined ) && jQuery(this).attr('src').indexOf('placeholder.png') > -1) {
                        console.log('lazy load correction');
                        var $self = jQuery(this),
                            currentSrc = $self.attr('src'),
                            originalSrc = $self.attr('data-orig-source');

                        // Check if the img source has been changed by lazy loading
                        if(originalSrc != currentSrc){
                            $self.attr('src', originalSrc);
                        }

                        // Timeline album posts need the background source reset
                        if($self.hasClass('cff-multi-image')){
                            $self.css('background-image', 'url(' + originalSrc + ')');
                        }
                    }
                });
            },1250);
        },
        checkConsent: function() {
            if (this.settings.consentGiven || !this.settings.gdpr) {
                return true;
            }
            if (typeof CLI_Cookie !== "undefined") { // GDPR Cookie Consent by WebToffee
                if (CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME) !== null)  {

                    // WebToffee no longer uses this cookie but being left here to maintain backwards compatibility
                    if (CLI_Cookie.read('cookielawinfo-checkbox-non-necessary') !== 'null') {
                        this.settings.consentGiven = CLI_Cookie.read('cookielawinfo-checkbox-non-necessary') === 'yes';
                    }

                    if (CLI_Cookie.read('cookielawinfo-checkbox-necessary') !== 'null') {
                        this.settings.consentGiven = CLI_Cookie.read('cookielawinfo-checkbox-necessary') === 'yes';
                    }
                }

            } else if (typeof window.cnArgs !== "undefined") { // Cookie Notice by dFactory
                var value = "; " + document.cookie,
                    parts = value.split( '; cookie_notice_accepted=' );

                if ( parts.length === 2 ) {
                    var val = parts.pop().split( ';' ).shift();

                    this.settings.consentGiven = (val === 'true');
                }
            } else if (typeof window.cookieconsent !== 'undefined') { // Complianz by Really Simple Plugins
                this.settings.consentGiven = cffCmplzGetCookie('complianz_consent_status') === 'allow';
            } else if (typeof window.Cookiebot !== "undefined") { // Cookiebot by Cybot A/S
                this.settings.consentGiven = Cookiebot.consented;
            } else if (typeof window.BorlabsCookie !== 'undefined') { // Borlabs Cookie by Borlabs
                this.settings.consentGiven = window.BorlabsCookie.checkCookieConsent('facebook');
            }

            var evt = jQuery.Event('cffcheckconsent');
            evt.feed = this;
            jQuery(window).trigger(evt);

            return this.settings.consentGiven; // GDPR not enabled
        },
        afterConsentToggled: function() {
            if (this.checkConsent()) {
                var feed = this;
                feed.maybeRaiseImageResolution();
                this.addFullFeatures();
                setTimeout(function() {
                    feed.afterResize();
                },500);
            }
        },
        locationGuess: function($cff = false) {
                var $feed = ($cff == false) ? jQuery(this.el) : $cff,
                    location = 'content';

                if ($feed.closest('footer').length) {
                    location = 'footer';
                } else if ($feed.closest('.header').length
                    || $feed.closest('header').length) {
                    location = 'header';
                } else if ($feed.closest('.sidebar').length
                    || $feed.closest('aside').length) {
                    location = 'sidebar';
                }

                return location;
            }
    };

    function cffAjax(submitData, onSuccess) {
        jQuery.ajax({
            url: cffajaxurl,
            type: 'post',
            data: submitData,
            success: onSuccess
        });
    }
    function cffCmplzGetCookie(cname) {
        var name = cname + "="; //Create the cookie name variable with cookie name concatenate with = sign
        var cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'

        //Loop through the cookies and return the cookie value if it find the cookie name
        for (var i = 0; i < cArr.length; i++) {
            var c = cArr[i].trim();
            //If the name is the cookie string at position 0, we found the cookie and return the cookie value
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }

        return "";
    }

    function cff_init( $cff ){

        //JS is running
        jQuery('.cff-nojs').removeClass('cff-nojs');

        //Check whether it's a touch device
        var cffTouchDevice = false;
        if (cffIsTouchDevice() === true) cffTouchDevice = true;
        function cffIsTouchDevice() {
            return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        }

        //If a feed selector isn't passed in then default to using selector for all feeds
        var firsttime = false;
        if(typeof $cff === 'undefined'){
            $cff = jQuery('.cff');
            firsttime = true;
        }

        (function($){

            //Toggle comments
            jQuery(document).off('click', '#cff a.cff-view-comments').on('click', '#cff a.cff-view-comments', function(){
                var $self = jQuery(this),
                    $commentsBox = $self.closest('.cff-item').find('.cff-comments-box');
                $self.toggleClass('cff-open');

                $commentsBox.slideToggle(300);

                //Masonry - overlap comments box when open
                var $feed = $self.closest('#cff'),
                    $item = $(this).closest('.cff-item');
                if( $feed.hasClass('cff-masonry-js') && !$feed.hasClass('cff-opaque-comments') ){
                    setTimeout(function(){
                        cffAddMasonry($feed);
                    }, 500);
                }

                //Add comment avatars
                $commentsBox.find('.cff-comment:visible').each(function(){
                    var $thisComment = jQuery(this); // here
                    var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;
                    if (consentGiven) {
                        $thisComment.find('.cff-comment-img:not(.cff-comment-reply-img) a, .cff-comment-img:not(.cff-comment-reply-img) span').html( '<img src="'+$thisComment.attr("data-avatar")+'" alt="Avatar" onerror="this.style.display=\'none\'" />' );
                    }
                });

            });

            //Comments box hover
            var cffAnimateIconColorVar,
                stopAnimate = false;
            $cff.find('.cff-view-comments').on('mouseenter',  function(){
                var $self = $(this),
                    time = 50;
                if( $self.hasClass('cff-open') ) return;

                $self.find('.cff-icon').each(function() {
                    var $cffIcon = jQuery(this);
                    cffAnimateIconColor($cffIcon, time);
                    time += 50;
                });
            }).on('mouseleave',  function(){
                cffStopAnimateIconColor();
                $(this).find('.cff-icon').removeClass('cff-animate');
            });
            function cffAnimateIconColor($cffIcon, time){
                stopAnimate = false;
                cffAnimateIconColorVar = setTimeout( function(){
                    if( !stopAnimate ) $cffIcon.addClass('cff-animate');
                }, time);
            }
            function cffStopAnimateIconColor() {
                clearTimeout(cffAnimateIconColorVar);
                stopAnimate = true;
            }

            //Set paths for query.php
            if (typeof cffsiteurl === 'undefined' || cffsiteurl == '') cffsiteurl = window.location.host + '/wp-content/plugins';
            var locatefile = true;

            //Create meta data array for caching likes and comments
            var metaArr = {},
                newMetaArr = {}, metaArray = []; //For caching only new posts that are loaded

            //Loop through the feeds on the page and add a unique attribute to each to use for lightbox groups
            var lb = 0;
            jQuery('#cff.cff-lb').each(function(){
                lb++;
                $(this).attr('data-cff-lb', lb);
            });


            //If it's the first load then loop through all .cff-items on the page, otherwise, only loop through the feed where the load more button is clicked
            var $cff_post_selector = $cff.find('.cff-item.cff-new, .cff-album-item.cff-new');
            if( firsttime ){
                $cff_post_selector = jQuery('#cff .cff-item.cff-new, #cff .cff-album-item.cff-new');
            }

            //Loop through each item
            $cff_post_selector.each(function(){

                var $self = jQuery(this);

                //Wpautop fix
                if( $self.find('.cff-viewpost-link, .cff-viewpost-facebook, .cff-viewpost').parent('p').length ){
                    //Don't unwrap event only viewpost link
                    if( !$self.hasClass('event') ) $self.find('.cff-viewpost-link, .cff-viewpost-facebook, .cff-viewpost').unwrap('p');
                }
                if( $self.find('.cff-photo').parent('p').length ){
                    $self.find('p .cff-photo').unwrap('p');
                    $self.find('.cff-album-icon').appendTo('.cff-photo:last');
                }
                if( $self.find('.cff-event-thumb').parent('p').length ){
                    $self.find('.cff-event-thumb').unwrap('p');
                }
                if( $self.find('.cff-vidLink').parent('p').length ){
                    $self.find('.cff-vidLink').unwrap('p');
                }
                if( $self.find('.cff-link').parent('p').length ){
                    $self.find('.cff-link').unwrap('p');
                }
                if( $self.find('.cff-viewpost-link').parent('p').length ){
                    $self.find('.cff-viewpost-link').unwrap('p');
                }
                if( $self.find('.cff-viewpost-facebook').parent('p').length ){
                    $self.find('.cff-viewpost-facebook').unwrap('p');
                }

                if( $self.find('iframe').parent('p').length ){
                    $self.find('iframe').unwrap('p');
                }
                if( $self.find('.cff-author').parent('p').length ){
                    $self.find('.cff-author').eq(1).unwrap('p');
                    $self.find('.cff-author').eq(1).remove();
                }
                if( $self.find('.cff-view-comments').parent('p').length ){
                    $self.find('.cff-meta-wrap > p').remove();
                    $self.find('.cff-view-comments').eq(1).remove();
                    //Move meta ul inside the link element
                    var $cffMeta = $self.find('.cff-meta'),
                        cffMetaClasses = $cffMeta.attr('class');
                    $cffMeta.find('.cff-view-comments').unwrap().wrapInner('<ul class="'+cffMetaClasses+'">');
                }
                if( $self.find('.cff-photo').siblings('.cff-photo').length ){
                    $self.find('.cff-photo').slice(0,2).remove();
                }
                //Fix the formatting issue that pushes avatar to the left
                if( $('.cff-author-img').parent().is('p') ) $('.cff-author-img').unwrap('p');
                //Remove empty p tags
                $self.find('p:empty').not('.cff-comments-box p').remove();

                //Expand post
                var expanded = false;
                if( $self.hasClass('cff-event') ){
                    var $post_text = $self.find('.cff-desc .cff-desc-text'),
                        text_limit = $post_text.parent().attr('data-char');
                } else {
                    var $post_text = $self.find('.cff-post-text .cff-text'),
                        text_limit = $self.closest('#cff').attr('data-char');
                }

                if (typeof text_limit === 'undefined' || text_limit == '') text_limit = 99999;

                //If the text is linked then use the text within the link
                if ( $post_text.find('a.cff-post-text-link').length ) $post_text = $self.find('.cff-post-text .cff-text a');
                var full_text = $post_text.html();
                if(full_text == undefined) full_text = '';


                //Truncate text taking HTML tags into account
                var cff_trunc_regx = new RegExp(/(<[^>]*>)/g);
                var cff_trunc_counter = 0;

                //convert the string to array using the HTML tags as delimiter and keeping them as array elements
                full_text_arr = full_text.split(cff_trunc_regx);

                for (var i = 0, len = full_text_arr.length; i < len; i++) {
                    //ignore the array elements that are HTML tags
                    if ( !(cff_trunc_regx.test(full_text_arr[i])) ) {
                        //if the counter is 100, remove this element with text
                        if (cff_trunc_counter == text_limit) {
                            full_text_arr.splice(i, 1);
                            continue; //ignore next commands and continue the for loop
                        }
                        //if the counter != 100, increase the counter with this element length
                        cff_trunc_counter = cff_trunc_counter + full_text_arr[i].length;
                        //if is over 100, slice the text of this element to match the total of 100 chars and set the counter to 100
                        if (cff_trunc_counter > text_limit) {
                            var diff = cff_trunc_counter - text_limit;
                            full_text_arr[i] = full_text_arr[i].slice(0, -diff);
                            cff_trunc_counter = text_limit;

                            //Show the 'See More' link if needed
                            if (full_text.length > text_limit) $self.find('.cff-expand').show();
                        }
                    }
                }

                //new string from the array
                var short_text = full_text_arr.join('');

                //remove empty html tags from the array
                short_text = short_text.replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)/g, "");

                //If the short text cuts off in the middle of a <br> tag then remove the stray '<' which is displayed
                var lastChar = short_text.substr(short_text.length - 1);
                if(lastChar == '<') short_text = short_text.substring(0, short_text.length - 1);

                //Remove any <br> tags from the end of the short_text
                short_text = short_text.replace(/(<br>\s*)+$/,'');
                short_text = short_text.replace(/(<img class="cff-linebreak">\s*)+$/,'');

                //Cut the text based on limits set
                $post_text.html( short_text );


                //Click function
                $self.find('.cff-expand a').off('click').on('click', function(e){
                    e.preventDefault();
                    var $expand = jQuery(this),
                        $more = $expand.find('.cff-more'),
                        $less = $expand.find('.cff-less');
                    if (expanded == false){
                        $post_text.html( full_text );
                        expanded = true;
                        $more.hide();
                        $less.show();
                    } else {
                        $post_text.html( short_text );
                        expanded = false;
                        $more.show();
                        $less.hide();
                    }
                    cffLinkHashtags();
                    //Add target to links in text when expanded
                    $post_text.find('a').attr('target', '_blank');

                    //Re-init masonry for JS
                    if( $self.closest('.cff').hasClass('cff-masonry-js') && !$self.closest('.cff').hasClass('cff-masonry-css') ){
                        cffAddMasonry($cff);
                    }

                });
                //Add target attr to post text links via JS so aren't included in char count
                $post_text.find('a').add( $self.find('.cff-post-desc a') ).attr({
                    'target' : '_blank',
                    'rel' : 'nofollow noopener noreferrer'
                });


                //This is the modified Post ID - so if the post is an album post then this could be the album ID which is used to get the lightbox thumbs
                var post_id = $self.attr('id').substring(4),
                    //This is the original post ID which is used to get the number of likes and comments for the timeline post
                    post_id_orig = $self.find('.cff-view-comments').attr('id');

                if( locatefile != true ) $self.find('.cff-lightbox-thumbs-holder').css('min-height', 0);


                //Show all comments on click
                jQuery(document).off('click', '#cff .cff-show-more-comments, .cff-lightbox-sidebar .cff-show-more-comments').on('click', '#cff .cff-show-more-comments, .cff-lightbox-sidebar .cff-show-more-comments', function(){

                    var $cffMoreCommentsLink = jQuery(this),
                        thisCommentsTotal = parseInt($cffMoreCommentsLink.attr('data-cff-comments-total'));

                    //If there's more than 25 comments then link the "View more comments" link to post on Facebook
                    if( $cffMoreCommentsLink.hasClass('cff-clicked') && thisCommentsTotal > 25 ){
                        //Link to Facebook
                        $cffMoreCommentsLink.find('a').attr({
                            'href' : $cffMoreCommentsLink.closest('.cff-comments-box').find('.cff-comment-on-facebook a').attr('href'),
                            'target' : '_blank'
                        });
                    }
                    //Hide 'View more comments' link
                    if( thisCommentsTotal <= 25 ) $cffMoreCommentsLink.hide();

                    //Add class so we can only trigger the above on the second click
                    $cffMoreCommentsLink.addClass('cff-clicked');

                    //Show comments and add comment avatars
                    $cffMoreCommentsLink.parent().find('.cff-comment').show().each(function(){
                        var $thisComment = jQuery(this);
                        var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;
                        if (consentGiven) {
                            $thisComment.find('.cff-comment-img:not(.cff-comment-reply-img) a, .cff-comment-img:not(.cff-comment-reply-img) span').html( '<img src="'+$thisComment.attr("data-avatar")+'" alt="Avatar" onerror="this.style.display=\'none\'" />' );
                        }

                    });

                    //Re-init masonry when more comments loaded
                    var $closestCff = $cffMoreCommentsLink.closest('.cff');
                    if( $closestCff.hasClass('cff-masonry-js') && !$closestCff.hasClass('cff-opaque-comments') ){
                        setTimeout(function(){
                            cffAddMasonry( $closestCff );
                        }, 500);
                    }
                });


                //Remove event end date day if the same as the start date
                if( $self.hasClass('cff-timeline-event') || $self.hasClass('cff-event') ){
                    if( $(this).find('.cff-date .cff-start-date k').text() !== $(this).find('.cff-date .cff-end-date k').text() ) $(this).find('.cff-date .cff-end-date k').show();
                }


                //Replace Photon (Jetpack CDN) images with the originals again
                var $cffPhotoImg = $self.find('.cff-photo img, .cff-event-thumb img, .cff-poster, .cff-album-cover img'),
                    cffPhotoImgSrc = $cffPhotoImg.attr('src'),
                    cffImgStringAttr = $cffPhotoImg.attr('data-querystring');

                if( typeof cffPhotoImgSrc == 'undefined' ) cffPhotoImgSrc = '';

                if( cffPhotoImgSrc.indexOf('i0.wp.com') > -1 || cffPhotoImgSrc.indexOf('i1.wp.com') > -1 || cffPhotoImgSrc.indexOf('i2.wp.com') > -1 || cffPhotoImgSrc.indexOf('i3.wp.com') > -1 || cffPhotoImgSrc.indexOf('i4.wp.com') > -1 || cffPhotoImgSrc.indexOf('i5.wp.com') > -1 ){

                    //Create new src. Single slash in https is intentional as one is left over from removing i_.wp.com
                    var photonSrc = $cffPhotoImg.attr('src').substring(0, $cffPhotoImg.attr('src').indexOf('?')),
                        newSrc = photonSrc.replace('http://', 'https:/').replace(/i0.wp.com|i1.wp.com|i2.wp.com|i3.wp.com|i4.wp.com|i5.wp.com/gi, '') + '?' + cffImgStringAttr;

                    $cffPhotoImg.attr('src', newSrc);
                }

                function cffLinkHashtags(){
                    //Link hashtags
                    var cffTextStr = $self.find('.cff-text').html(),
                        cffDescStr = $self.find('.cff-post-desc').html(),
                        regex = /(^|\s)#(\w*[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+\w*)/gi,
                        linkcolor = $self.find('.cff-text').attr('data-color'),
                        linkcolorHTML = '';

                    function replacer(hash){
                        //Remove white space at beginning of hash
                        var replacementString = jQuery.trim(hash);
                        //If the hash is a hex code then don't replace it with a link as it's likely in the style attr, eg: "color: #ff0000"
                        if ( /^#[0-9A-F]{6}$/i.test( replacementString ) ){
                            return replacementString;
                        } else {
                            if( typeof linkcolor !== 'undefined' ){
                                if( linkcolor.length > 1 ) linkcolorHTML = 'style="color:#' + linkcolor + '"';
                            }
                            return ' <a href="https://www.facebook.com/hashtag/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow noopener" '+linkcolorHTML+'>' + replacementString + '</a>';
                        }
                    }

                    //If it's not defined in the source code then set it to be true
                    if (typeof cfflinkhashtags == 'undefined') cfflinkhashtags = 'true';

                    if(cfflinkhashtags == 'true'){
                        //Replace hashtags in text
                        var $cffText = $self.find('.cff-text');

                        if($cffText.length > 0){
                            //Add a space after all <br> tags so that #hashtags immediately after them are also converted to hashtag links. Without the space they aren't captured by the regex.
                            cffTextStr = cffTextStr.replace(/<br>/g, "<br> ");
                            $cffText.html( cffTextStr.replace( regex , replacer ) );
                        }
                    }

                    //Replace hashtags in desc
                    if( $self.find('.cff-post-desc').length > 0 ) $self.find('.cff-post-desc').html( cffDescStr.replace( regex , replacer ) );
                }
                cffLinkHashtags();

                //Add target attr to post text links via JS so aren't included in char count
                $self.find('.cff-text a').attr('target', '_blank');


                //Add lightbox tile link to photos
                if( $self.closest('#cff').hasClass('cff-lb') ){
                    $self.find('.cff-photo, .cff-album-cover, .cff-event-thumb, .cff-html5-video, .cff-iframe-wrap').each(function(){
                        var $photo = $(this),
                            postId = post_id,
                            cffLightboxTitle = '',
                            cffShowThumbs = false,
                            postType = '',
                            cffgroupalbums = '';


                        // if( $self.hasClass('cff-album') || $self.hasClass('cff-albums-only') ) cffShowThumbs = true;
                        cffShowThumbs = true;

                        function cffFormatCaption(text){
                            return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, "<br/>");
                        }

                        //Set the caption/title
                        if( $self.hasClass('cff-albums-only') ){
                            postType = 'albumsonly';
                            cffLightboxTitle = cffFormatCaption( $self.find('img').attr('alt') );

                            //Check whether there's an absolute path attr and if there is then add it to the query
                            var dataGroup = $self.closest('#cff').attr('data-group');
                            if( typeof dataGroup !== 'undefined' ) cffgroupalbums = 'data-cffgroupalbums="true"';

                        } else if( $self.hasClass('cff-timeline-event') ) {
                            var capText = '';
                            if( $self.find('.cff-author-text .cff-page-name').length ) capText += $self.find('.cff-author-text .cff-page-name').text() + '<br /><br />';
                            //Display the full event details but the info is hidden in CSS as it's too long in some cases
                            if( full_text.length > 5 ) capText += full_text;
                            cffLightboxTitle = cffFormatCaption( capText );

                        } else if ( $self.hasClass('cff-event') ) {
                            //Events feed
                            if( $self.find('.cff-details').length ){
                                // if( $self.find('.cff-event-title').length ) cffLightboxTitle = cffFormatCaption( $self.find('.cff-event-title')[0].outerHTML );
                                // if( $self.find('.cff-date').length ) cffLightboxTitle += cffFormatCaption( $self.find('.cff-date')[0].outerHTML );
                                // if( $self.find('.cff-location').length ) cffLightboxTitle += cffFormatCaption( $self.find('.cff-location')[0].outerHTML );

                                if( $self.find('.cff-event-title').length ) cffLightboxTitle = '<span class="cff-event-title" style="font-weight:bold;">' + cffFormatCaption( $self.find('.cff-event-title').html() + '</span>' );
                                if( $self.find('.cff-date').length ) cffLightboxTitle += '<span class="cff-date">' + cffFormatCaption( $self.find('.cff-date').html() + '</span>' );
                                if( $self.find('.cff-location').length ) cffLightboxTitle += '<span class="cff-location">' + cffFormatCaption( $self.find('.cff-location').html() + '</span>' );

                                cffLightboxTitle += '<span class="cff-desc">' + full_text + '</span>';
                            }

                        } else if( $self.hasClass('cff-album-item') ) {
                            cffLightboxTitle = cffFormatCaption( $self.find('img').attr('alt') );
                        } else {
                            var lb_title = full_text;
                            //If there's no post text then use the description
                            if( full_text.trim() == '' ) lb_title = $self.find('.cff-post-desc').text();

                            //If there's no post text or desc then use the story
                            if( lb_title == '' && $self.find('.cff-author .cff-story').length ) lb_title = $self.find('.cff-author .cff-page-name').text();

                            //If there's no text at all then just set it to be a space so that it renders as blank, otherwise it will use the caption from the post before
                            if( lb_title == '' ) lb_title = '&nbsp;';

                            cffLightboxTitle = cffFormatCaption( lb_title );
                        }

                        if(cffLightboxTitle.length > 1) cffLightboxTitle = cffLightboxTitle.replace(/"/g, '&quot;');


                        //Create the lightbox link
                        //Add the hover tile
                        var cffLightboxTile = '<a class="cff-lightbox-link nofancybox" rel="nofollow" ';

                        //If it's a YouTube or Vimeo then set the poster image to use in the lightbox
                        if( $photo.hasClass('cff-iframe-wrap') ){
                            //Add the image to the video lightbox placeholder as a query string so that the href value is unique and is added to the lightbox order. Otherwise, if it doesn't contain the query string then all videos that use the placeholder have the same URL and so they aren't added to the lightbox order. The actual video image is very small and so we need to use the placeholder to have the video display larger in the lightbox:
                            var iframeSrc = '';
                            if ($photo.find('iframe').length) {
                                iframeSrc = $photo.find('iframe').attr('src');
                            } if ($photo.find('.cff-iframe-placeholder').length ) {
                                iframeSrc = $photo.find('.cff-iframe-placeholder').attr('data-src');
                            }
                            cffLightboxTile += 'href="'+cffsiteurl+'/custom-facebook-feed-pro/assets/img/video-lightbox.png?'+postId+'" data-iframe="'+iframeSrc+'" ';
                            //If it's a swf then display it in an iframe
                        } else if( $photo.hasClass('cff-swf') ) {
                            cffLightboxTile += 'href="'+cffsiteurl+'/custom-facebook-feed-pro/assets/img/video-lightbox.png" data-iframe="'+$photo.find('video').attr('src')+'" ';
                        } else {
                            var lb_href = $photo.find('img').attr('src').indexOf('placeholder') === -1 ? $photo.find('img').attr('src') : $photo.find('img').attr('data-orig-source');
                            if( $photo.find('img').attr('data-cff-no-event-img-large') ) lb_href = $photo.find('img').attr('data-cff-no-event-img-large');
                            if( $photo.find('img').attr('data-cff-full-img') ) lb_href = $photo.find('img').attr('data-cff-full-img');
                            cffLightboxTile += 'href="'+lb_href+'" data-iframe="" ';
                        }

                        //No nav
                        // cffLightboxTile += 'data-cff-lightbox="'+postId+'" data-title="'+cffLightboxTitle+'" data-id="'+postId+'" data-thumbs="'+cffShowThumbs+'" ';
                        cffLightboxTile += 'data-cff-lightbox="cff-lightbox-'+$self.closest("#cff").attr("data-cff-lb")+'" data-title="'+cffLightboxTitle+'" data-id="'+postId+'" data-thumbs="'+cffShowThumbs+'" '+cffgroupalbums+' ';

                        //If it's an HTML5 video then set the data-video attr
                        if( $photo.hasClass('cff-html5-video') ){

                            if($photo.hasClass('cff-swf')){
                                cffLightboxTile += 'data-url="'+$photo.find('.cff-html5-play').attr('href')+'" data-video="';
                            } else {
                                cffLightboxTile += 'data-url="'+$photo.find('.cff-html5-play').attr('href')+'" data-video="'+$photo.find('img').attr('data-cff-video');
                            }

                            //Videos only:
                        } else if( $photo.hasClass('cff-video') ) {
                            cffLightboxTile += 'data-url="http://facebook.com/'+$photo.attr('id')+'" data-video="'+$photo.attr('data-source');
                        } else if( $photo.hasClass('cff-iframe-wrap') ) {
                            cffLightboxTile += 'data-url="http://facebook.com/'+post_id+'" data-video="';
                        } else {
                            cffLightboxTile += 'data-url="'+$photo.attr('href')+'" data-video="';
                        }

                        cffLightboxTile += '" data-type="'+postType+'" data-lb-comments="'+$photo.closest('.cff-lb').attr('data-lb-comments')+'"><div class="cff-photo-hover"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search-plus fa-w-16 fa-2x"><path fill="currentColor" d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z" class=""></path></svg><span class="cff-screenreader">View</span></div></a>';

                        //Add the link to the photos/videos in the feed
                        $photo.prepend(cffLightboxTile);

                        if( !cffTouchDevice ){ //Only apply hover effect if not touch screen device
                            //Fade in links on hover
                            $photo.on('mouseenter', function(){
                                $self.find('.cff-photo-hover').fadeIn(150);
                            }).on('mouseleave', function(){
                                $self.find('.cff-photo-hover').stop().fadeOut(500);
                            });
                        }

                    });
                }

                //Share tooltip function
                $self.find('.cff-share-link').off('click').on('click', function(e){
                    e.preventDefault();
                    var $cffShareTooltip = $self.find('.cff-share-tooltip')

                    //Hide tooltip
                    if( $cffShareTooltip.is(':visible') ){
                        $cffShareTooltip.hide().find('a').removeClass('cff-show');
                    } else {
                        //Show tooltip
                        $cffShareTooltip.show();

                        var time = 0;
                        $cffShareTooltip.find('a').each(function() {
                            var $cffShareIcon = jQuery(this);
                            setTimeout( function(){
                                $cffShareIcon.addClass('cff-show');
                            }, time);
                            time += 20;
                        });
                    }
                });

                //If it's a restricted page then use the lightbox src for the photo feed images
                if( typeof $cff.attr('data-restricted') !== 'undefined' ){
                    var cff_restricted_page = true;
                } else {
                    var cff_restricted_page = false;
                }

                //Photos only
                if( $self.hasClass('cff-album-item') ){
                    var cff_data_full_size = $self.attr('data-cff-full-size');

                    if( typeof cff_data_full_size !== 'undefined' && cff_data_full_size != '' ){

                        if( cff_restricted_page ){
                            $self.find('.cff-lightbox-link').attr('href', cff_data_full_size).closest('.cff-album-cover').css('background-image', 'url('+cff_data_full_size+')');
                            $self.find('img').attr('src', cff_data_full_size);
                        } else {
                            $self.find('.cff-lightbox-link').attr('href', cff_data_full_size);
                        }

                    }
                }


                //Add the HD video player
                //If it's a video post then add the video link to the video element so it can be used in the lightbox
                if( ( $self.find('.cff-html5-video').length || $self.hasClass('cff-video') ) ){

                    var cff_live_video = false;

                    //Set the selector based on whether it's a timeline vid or videos only
                    if( $self.find('.cff-html5-video').length ){
                        var $vid_sel = $self.find('.cff-html5-video');
                        if( $vid_sel.attr('data-cff-live') == 'true' ) cff_live_video = true;
                    }
                    if( $self.hasClass('cff-video') ) var $vid_sel = $self;

                    if( cff_live_video && $(window).width() <= 640 ){
                        //If it's live video and on mobile then use HTMl5 player as live video doesn't work on mobile using Facebook player
                    } else {

                        if( !$self.closest('.cff').hasClass('cff-private-group') ){
                            //If the Facebook Player is selected then pass the iframe URL into the lightbox.
                            if( $vid_sel.attr('data-cff-video-player') != 'standard' ){
                                $self.find('.cff-lightbox-link').attr({
                                    'data-iframe' : 'https://www.facebook.com/v2.3/plugins/video.php?href=' + $vid_sel.attr('data-cff-video-link'),
                                    'data-video' : ''
                                });
                            }
                        }

                    }

                }

                //Try to fix any video wrapper formatting issues
                setTimeout(function(){
                    $self.find('.cff-iframe-wrap .fluid-width-video-wrapper iframe').unwrap().wrap('<div style="float: left; width: 100%;"></div>');
                    $self.find('.cff-iframe-wrap .iframe-embed iframe').unwrap('iframe-embed');
                }, 500);


                //Open lightbox when clicking album or video title
                $self.find('.cff-album-info a').on('click', function(e){
                    e.preventDefault();
                    $self.find('.cff-lightbox-link').trigger('click');
                });


            }); //End $cff_post_selector.each loop


            //Load comment replies
            jQuery(document).off('click', '.cff-comment-replies a').on('click', '.cff-comment-replies a', function(){
                cffLoadCommentReplies( $(this) );
            });


            $('.cff-wrapper').each(function(){
                var $cff = $(this).find('#cff'),
                    cff_grid_pag = $cff.attr('data-grid-pag');

                //Get the Access Token from the shortcode so it can be used in the connect file
                var shortcode_token_param = cffGetShortcodeToken($cff);

                var $cffNumDiffHide = $(this).find('.cff');
                //maybe hide
                if (typeof $cffNumDiffHide.attr('data-nummobile') !== 'undefined') {
                    var num = typeof $cffNumDiffHide.attr('data-pag-num') !== 'undefined' && $cffNumDiffHide.attr('data-pag-num') !== '' ? parseInt($cffNumDiffHide.attr('data-pag-num')) : 1,
                        nummobile = typeof $cffNumDiffHide.attr('data-nummobile') !== 'undefined' && $cffNumDiffHide.attr('data-nummobile') !== '' ? parseInt($cffNumDiffHide.attr('data-nummobile')) : num,
                        itemSelector = $cffNumDiffHide.find('.cff-item').length ? '.cff-item' : '.cff-album-item';
                    if ($(window).width() < 480) {
                        if (nummobile < $cffNumDiffHide.find(itemSelector).length) {
                            $cffNumDiffHide.find(itemSelector).slice(nummobile - $cffNumDiffHide.find(itemSelector).length).addClass('cff-num-diff-hide');
                        }
                    } else {
                        if (num < $cffNumDiffHide.find(itemSelector).length) {
                            $cffNumDiffHide.find(itemSelector).slice(num - $cffNumDiffHide.find(itemSelector).length).addClass('cff-num-diff-hide');
                        }
                    }
                    $cffNumDiffHide.removeAttr('data-nummobile');
                }

                //Masonry
                if( $cff.hasClass('cff-masonry-js' && ! $cff.hasClass('cff-all-reviews') ) ){

                    if( $cff.find('.cff-album-item').length ){
                        $cff.removeClass('cff-masonry-js');
                        return;
                    }

                    cffAddMasonry($cff);
                    //Call it again in case images aren't fully loaded
                    setTimeout(function(){ cffAddMasonry($cff); }, 1000);

                    // Resizing the window can affect the masonry feed so it is reset on resize
                    $(window).on('resize', function () {
                        setTimeout(function(){
                            cffAddMasonry($cff);
                        }, 500);
                    });

                    if( $cff.find('.cff-credit').length ) $cff.css('padding-bottom', 30);
                }

                //Allow us to make some tweaks when the feed is narrow
                function cffCheckWidth(){

                    if( $cff.hasClass('cff-album-items-feed') ){
                        var $cffElement = $cff;
                    } else {
                        var $cffElement = $cff.find('.cff-item').first();
                    }

                    if( $cffElement.innerWidth() < 400 ){
                        if( !$cff.hasClass('cff-disable-narrow') ){
                            $cff.addClass('narrow');
                        }
                    } else {
                        $cff.removeClass('narrow');
                    }
                    if( $cffElement.innerWidth() < 250 ){
                        $cff.addClass('cff-super-narrow');
                    }
                }
                cffCheckWidth();

                function cffActionLinksPos(){
                    if( $cff.find('.cff-item').first().innerWidth() < (190 + $('.cff-post-links').innerWidth() ) ){
                        $cff.find('.cff-post-links').addClass('cff-left')
                    } else {
                        $cff.find('.cff-post-links').removeClass('cff-left');
                    }
                }
                cffActionLinksPos();

                //Only check the width once the resize event is over
                var cffdelay = (function(){
                    var cfftimer = 0;
                    return function(cffcallback, cffms){
                        clearTimeout (cfftimer);
                        cfftimer = setTimeout(cffcallback, cffms);
                    };
                })();
                window.addEventListener('resize', function(event){
                    cffdelay(function(){
                        cffCheckWidth();
                        cffActionLinksPos();
                        cffResizeAlbum();
                    }, 500);
                });

                //Albums only
                //Resize image height
                function cffResizeAlbum(last){
                    var cffAlbumWidth = $cff.find('.cff-album-item').eq(0).find('a').innerWidth();
                    $cff.find('.cff-album-item a').css('height', cffAlbumWidth);
                    //Crops event images when selected
                    $cff.find('.cff-photo.cff-crop').css( 'height', $cff.find('.cff-photo.cff-crop').width() );

                    //Sets crop height of main post image to be 60% (or the height of the thumbs - whichever is larger - so it's never shorter than the thumbs) to make room for the thumbs beneath
                    $cff.find('.cff-item.cff-album .cff-photo.cff-multiple, .cff-video-post .cff-html5-video.cff-multiple').each(function(){
                        var $cffPhotoEl = $(this);

                        //Crop image attachments in posts
                        var cffPhotoImgWidth = $cffPhotoEl.find('img').first().width();
                        if( cffPhotoImgWidth < 10 ) cffPhotoImgWidth = 300;

                        if($cffPhotoEl.hasClass('cff-img-layout-3')) $cffPhotoEl.find('.cff-img-attachments .cff-crop').css( 'height', cffPhotoImgWidth/2 );
                        if($cffPhotoEl.hasClass('cff-img-layout-4')) $cffPhotoEl.find('.cff-img-attachments .cff-crop').css( 'height', cffPhotoImgWidth/3 );

                        //Crop main image
                        if( $cffPhotoEl.is('.cff-img-layout-3, .cff-img-layout-4') ){
                            var $cffMainImage = $cffPhotoEl.find('.cff-main-image'),
                                cropPercentage = 0.6;
                            if( $cffPhotoEl.hasClass('cff-img-layout-4') ) cropPercentage = 0.8;

                            //Set the height based on ratio
                            var cffImageHeight = Math.round( cffPhotoImgWidth / $cffMainImage.find('img').attr('data-ratio') );
                            $cffMainImage.css( 'height', Math.round( Math.max(cffImageHeight*cropPercentage, $cffPhotoEl.find('.cff-img-attachments').height() ) ) );
                        } else if( $cffPhotoEl.is('.cff-img-layout-2') ) {
                            var $cffCrop = $cffPhotoEl.find('.cff-img-wrap.cff-crop');
                            if( $cffPhotoEl.hasClass('cff-portrait') ){
                                $cffPhotoEl.find('.cff-img-wrap.cff-crop').css('height', $cffPhotoEl.width()*0.8 );
                            } else {
                                $cffPhotoEl.find('.cff-img-wrap.cff-crop').css('height', $cffPhotoEl.width()/2 );
                            }
                        }

                        //If the main image is being cropped to zero then remove the crop so the full image is shown
                        if( last == true && ( $cffPhotoEl.is('.cff-img-layout-3') || $cffPhotoEl.is('.cff-img-layout-4') ) && $cffPhotoEl.find('.cff-main-image').height() < 10 ) $cffPhotoEl.find('.cff-img-layout-3 .cff-main-image img, .cff-img-layout-4 .cff-main-image img').css({
                            'display' : 'block',
                            'visibility' : 'visible'
                        })

                        //Make "+6" text small if the images are small
                        if( cffPhotoImgWidth < 200 ){
                            $cffPhotoEl.addClass('cff-small-layout');
                        } else {
                            $cffPhotoEl.removeClass('cff-small-layout');
                        }
                    });

                }
                cffResizeAlbum(false);
                setTimeout(function(){ cffResizeAlbum(false); }, 50);
                setTimeout(function(){ cffResizeAlbum(true); }, 500);
                setTimeout(function(){ cffResizeAlbum(true); }, 1500);


                //PAGINATION
                //Events JS pagination
                var num_events = parseInt( $cff.attr('data-pag-num') ),
                    show_events = num_events; //Iterated for each set
                //Show first set of events
                $cff.find('.cff-event').slice(0, num_events).css('display', 'inline-block');
                //cffResizeAlbum(); //Correctly recalcs height of event images when using eventimage=cropped

                //Review JS pagination
                if( $cff.hasClass('cff-all-reviews') ){
                    var num_reviews = parseInt( $cff.attr('data-pag-num') ),
                        show_reviews = num_reviews;

                    //Offset
                    var review_offset = parseInt($cff.attr('data-offset'));
                    if( typeof review_offset == 'undefined' || isNaN(review_offset) ) review_offset = 0;

                    //Only show the required number of reviews
                    $cff.find('.cff-review').slice(0, num_reviews + review_offset ).css('display', 'inline-block');

                    //Hide some reviews if using offset setting
                    if( review_offset > 0 ) $cff.find('.cff-review').slice(0, review_offset ).remove();

                    //If using masonry then run it here
                    if( $cff.hasClass('cff-masonry-js') ) {

                        cffAddMasonry($cff);
                        //Call it again in case images aren't fully loaded
                        setTimeout(function(){ cffAddMasonry($cff); }, 1000);

                        // Resizing the window can affect the masonry feed so it is reset on resize
                        $(window).on('resize', function () {
                            setTimeout(function(){
                                cffAddMasonry($cff);
                            }, 500);
                        });

                        if( $cff.find('.cff-credit').length ) $cff.css('padding-bottom', 30);
                    }

                }

                //Set a data attr that lets us know whether no posts were loaded into the feed so that we can change the "until" value in the next request
                var $cffLoadMore = $cff.find('#cff-load-more'),
                    cff_no_posts_added = $cff.find('.cff-load-more').attr('data-cff-no-posts-added');
                if (typeof cff_no_posts_added == typeof undefined || cff_no_posts_added == false) {
                    $cffLoadMore.attr('data-cff-no-posts-added', 'false');
                }

                //If there's no posts in the feed initially then set the data-attr to be true
                if( $cff.find('.cff-item, .cff-album-item').length < 1 ) $cffLoadMore.attr('data-cff-no-posts-added', 'true');

                // add the load more button and input to simulate a dynamic json file call
                $cffLoadMore.off().on('click', function() {
                    // reveal any hidden posts due to difference in desktop vs mobile devices
                    // read the json that is in the cff-data-shortcode that contains all of the shortcode arguments
                    var shortcodeData = $cff.attr('data-cff-shortcode'),
                        $paginationURL = $cff.find('.cff-pag-url'),
                        pag_url = $paginationURL.attr('data-cff-pag-url'),
                        feed_id = $paginationURL.attr('data-transient-name'),
                        post_id = $paginationURL.attr('data-post-id'),
                        location = CffFeed.prototype.locationGuess($cff);
                    //Upmcoming events JS pagination
                    var events_count = $cff.find('.cff-upcoming-event').length;
                    //If it's an event feed
                    if( events_count > 0 ){
                        show_events = show_events + num_events;
                        //Show the next set of events
                        $cff.find('.cff-upcoming-event').slice(0, show_events).css('display', 'inline-block');
                        if( show_events > events_count ){
                            $cff.find('#cff-load-more').hide();
                            cff_no_more_posts($cff, $cffLoadMore);
                        }

                        //Re-init masonry for JS
                        if( $cff.hasClass('cff-masonry-js') && !$cff.hasClass('cff-masonry-css') ){
                            cffAddMasonry($cff);
                        }
                        return;
                    }

                    //Reviews JS pagination
                    if( $cff.hasClass('cff-all-reviews') ){
                        var reviews_count = $cff.find('.cff-review').length;
                        //If it's an reviews feed
                        if( reviews_count > 0 ){
                            show_reviews = show_reviews + num_reviews;
                            //Show the next set of reviews
                            $cff.find('.cff-review').slice(0, show_reviews).css('display', 'inline-block');
                            if( show_reviews > reviews_count ){
                                $cff.find('#cff-load-more').hide();
                                cff_no_more_posts($cff, $cffLoadMore);
                            }

                            //Re-init masonry for JS
                            if( $cff.hasClass('cff-masonry-js') && !$cff.hasClass('cff-masonry-css') ){
                                cffAddMasonry($cff);
                            }
                            return;
                        }
                    }


                    //Remove the ID so it can't be clicked twice before the posts are loaded
                    $cffLoadMore.off().removeAttr('id').addClass('cff-disabled');

                    // remove the hidden field since it will be replaced with new before token and after token next url data
                    $paginationURL.remove();


                    //If it's a photo/vid/album feed then change the selector
                    if( $cff.hasClass('cff-album-items-feed') ){
                        var item_sel = '.cff-album-item';
                    } else {
                        var item_sel = '.cff-item';
                    }

                    if( item_sel == '.cff-album-item' ){
                        //If the next_url is empty then use the prev_url
                        if( (pag_url == '' || pag_url == '{}') ) pag_url = $paginationURL.attr('data-cff-prev-url');

                        //Loop through the previous URLs and if the next URL is empty for an ID then add it in
                        var prev_urls = $paginationURL.attr('data-cff-prev-url');

                        //Convert the JSON string into an object so we can loop through it
                        var prev_urls_arr = ( typeof prev_urls == 'undefined' ) ? '' : JSON.parse( prev_urls );
                    }

                    //Parse the urls string into an array so we can loop through it
                    var pag_url_arr = ( typeof pag_url == 'undefined' ) ? '' : JSON.parse( pag_url );

                    if( item_sel == '.cff-album-item' ){
                        //Add the URL to the next_urls if it doesn't exist in the array
                        for (var key in prev_urls_arr) {
                            if (prev_urls_arr.hasOwnProperty(key)) {
                                if( typeof pag_url_arr[key] == 'undefined' ) pag_url_arr[key] = prev_urls_arr[key];
                            }
                        }
                    }
                    if( (pag_url == '' || pag_url == '{}' || pag_url == 0 || pag_url == '0' ) && item_sel == '.cff-item' ){
                        $cffLoadMore.hide();
                        cff_no_more_posts($cff, $cffLoadMore);
                    } else {
                        //Display loader
                        $cffLoadMore.addClass('cff-loading').append('<div class="cff-loader"></div>');
                        $cffLoadMore.find('.cff-loader').css('background-color', $cffLoadMore.css('color'));
                    }


                    //Check which pagination method to use
                    var cff_timeline_api_paging = false;
                    if( $cff.attr('data-timeline-pag') ) cff_timeline_api_paging = true;

                    if( cff_timeline_api_paging == true ){
                        //Use the raw "next" URL with the "paging_token" in it, as using the "until" method can cause a problem with groups due to the fact that the recent activity ordering method of groups can cause the last post in a feed to have an older date than those in the next batch, and so some are missed when paginating using the date.
                    } else {
                        //Loop through the pag array. Replace the until params for each id. Stringify to send in the ajax request
                        for (var key in pag_url_arr) {
                            if (pag_url_arr.hasOwnProperty(key) && key != 'latest_record_date') {

                                var this_url = pag_url_arr[key],
                                    until_old = cffGetParameterByName('until', this_url),
                                    $last_item = $cff.find(item_sel+'.cff-' + key).last(),
                                    until_new = (parseInt( $last_item.attr('data-cff-timestamp') ) - 1).toString(),
                                    backdated_new = false;

                                //If the post is backdated then use that instead as the API orders posts by backdate
                                if( typeof $last_item.attr('data-cff-backdated') != 'undefined' ){
                                    until_new = (parseInt( $last_item.attr('data-cff-backdated') ) - 1).toString();
                                }

                                //If there's no posts in the feed for a specific author then use the timestamp from the last post in the feed from any author
                                if( isNaN(parseFloat(until_new)) ){
                                    $last_item = $cff.find(item_sel).last();
                                    until_new = (parseInt( $last_item.attr('data-cff-timestamp') ) - 1).toString();

                                    //If the post is backdated then use that instead as the API orders posts by backdate
                                    if( typeof $last_item.attr('data-cff-backdated') != 'undefined' ){
                                        until_new = (parseInt( $last_item.attr('data-cff-backdated') ) - 1).toString();
                                    }
                                }

                                var new_url = this_url;

                                if( $cffLoadMore.attr('data-cff-no-posts-added') == 'true' ){
                                    //If there were no posts added to the feed from the previous response then don't replace the until_old with the until_new in the next request
                                } else {
                                    //If it's a regular timeline feed then add the "until" param
                                    if( item_sel !== '.cff-album-item' ){

                                        //V2.9+ of the API don't include "until" in the next url so only replace it if it exists
                                        if( this_url.indexOf("until=") !== -1 ){
                                            //Replace old until value with new one in the URL
                                            var new_url = this_url.replace("until="+until_old,"until="+until_new);
                                        } else {
                                            //If "until" doesn't exist then add it to the end of the URL
                                            var new_url = this_url + "&until="+until_new;
                                        }

                                        //Remove the "after" param as it overrides the "until" param
                                        if( new_url.indexOf('&after=') > -1 ) new_url = new_url.replace("&after="+cffGetParameterByName('after', new_url),"");

                                    }

                                }

                                //USE OFFSET PAGINATION METHOD
                                if( cff_grid_pag == 'offset' ){
                                    if( item_sel == '.cff-album-item' ){
                                        //If it's an album item then remove the "after" param as it overrides the "until" param
                                        if( new_url.indexOf('&after=') > -1 ) new_url = new_url.replace("&after="+cffGetParameterByName('after', new_url),"");

                                        //Add the offset param for pagination as time based doesn't work with albums due to the albums not always being in date order, and the other type of paging doesn't work due to filtering/higher post limits
                                        key = key.replace( /(:|\.|\[|\]|,|=)/g, "\\$1" );
                                        var albumItemCount = $cff.find('.cff-album-item.cff-' + key).length + $cff.find('.cff-empty-album.cff-' + key).length;
                                        if( new_url.indexOf('&offset=') > -1 ){
                                            new_url = new_url.replace("&offset="+cffGetParameterByName('offset', new_url), "&offset="+albumItemCount);
                                        } else {
                                            new_url = new_url + "&offset=" + albumItemCount;
                                        }
                                        key = key.replace(/\\/g, '');
                                    }
                                }
                                //END USE OFFSET PAGINATION METHOD


                                //If it's an events only URL then remove the "after" param as we're using the "until" value instead
                                if( (this_url.indexOf('/events') > -1 && this_url.indexOf('&after=') > -1) || (this_url.indexOf('/ratings') > -1 && this_url.indexOf('&after=') > -1 && $cff.hasClass('cff-all-reviews') ) ){
                                    new_url = new_url.replace("&after="+cffGetParameterByName('after', new_url),"");
                                }

                                //Remove the "__paging_token" parameter from the URL as it causes some posts to be missing and it isn't needed as we're using "until"
                                if( new_url.indexOf('&__paging_token') > -1 ){
                                    new_url = new_url.replace("&__paging_token="+cffGetParameterByName('__paging_token', new_url),"");
                                }

                                pag_url_arr[key] = new_url;
                            }
                        } // End pag_url_arr loop
                    } // End cff_timeline_api_paging if/else

                    //Convert the array back into a string
                    pag_url = JSON.stringify( pag_url_arr );
                    jQuery.ajax({
                        url : cffajaxurl,
                        type : 'post',
                        data : {
                            action : 'cff_get_new_posts',
                            shortcode_data : shortcodeData,
                            pag_url : pag_url,
                            feed_id : feed_id,
                            post_id : post_id,
                            location : location
                        },
                        success : function(data) {
                            $cff.find('.cff-num-diff-hide').removeClass('cff-num-diff-hide');
                            //If there's no posts added to the feed then set a data attr on the button so that we can change the "until" value to get a new batch next time
                            //Check by seeing if the data contains a div (ie. post)
                            if( data.indexOf('<div class=') == -1 && data.indexOf('<span class=') == -1 ){
                                $cffLoadMore.attr('data-cff-no-posts-added', 'true');
                            } else {
                                $cffLoadMore.attr('data-cff-no-posts-added', 'false');
                            }

                            //Appends the html echoed out in cff_get_new_posts() to the last existing post element
                            if( $cff.find('.cff-item, .cff-album-item').length ){
                                $cff.find('.cff-item, .cff-album-item').removeClass('cff-new').last().after(data);
                            } else {
                                //If there's no posts yet then just add it into the posts container
                                $cff.find('.cff-posts-wrap').append(data);
                            }
                            /*
                            if($cff.find('.cff-pag-url').attr('data-cff-pag-url') == 0){
                                $cffLoadMore.hide();
                                cff_no_more_posts($cff, $cffLoadMore);
                            }
                            */

                            //Replace any duplicate album items with empty items so doesn't affect offset pagination
                            $cff.find('.cff-album-item').each(function (i) {
                                var $el = $('[id="' + this.id + '"]').eq(1);
                                if($el.length){
                                    this_classes = $el.attr('class');
                                    this_classes = this_classes.replace("cff-album-item","");
                                }
                            });

                            //Remove loader
                            $cffLoadMore.removeClass('cff-loading').find('.cff-loader').remove();
                            //Re-add the ID so it can be clicked again
                            $cffLoadMore.attr('id', 'cff-load-more').removeClass('cff-disabled');

                            //Rerun JS (only runs on new items - .cff-new)
                            cff_init( $cff );

                            // rerun image resolution code for new images
                            var feedIndex = parseInt($cffLoadMore.closest('.cff').attr('data-cff-index')) - 1;
                            if (typeof window.cff !== 'undefined' && window.cff.feeds[feedIndex] !== 'undefined') {
                                window.cff.feeds[feedIndex].afterLoadMoreClicked($cffLoadMore);
                            }
                            /*
                            if( $cff.hasClass('cff-album-items-feed')){
                                cffAddMasonry($cff);
                            }
                            */
                            //Re-init masonry
                            if( $cff.hasClass('cff-masonry-js') && !$cff.hasClass('cff-masonry-css') ){
                                $cff.masonry('appended', $cff.find('.cff-new'));
                                $cff.find('.cff-view-comments, .cff-comment-replies a, .cff-show-more-comments a').off().on('click', function() {
                                    if( !$cff.hasClass('cff-opaque-comments') ){
                                        setTimeout(function(){
                                            cffAddMasonry($cff);
                                        }, 500);
                                    }
                                });
                            }

                            //If there's no more API URLs to hit then hide the load more button
                            var next_urls = $cff.find('.cff-pag-url').attr('data-cff-pag-url');
                            if( item_sel == '.cff-item' || cff_grid_pag == 'cursor' ){
                                if( next_urls == '{}' ) cff_no_more_posts($cff, $cffLoadMore);
                            } else {
                                if( data.indexOf('class="cff-album-item') < 0 && data.indexOf('class="cff-empty-album') < 0 ){
                                    cff_no_more_posts($cff, $cffLoadMore);
                                }
                            }

                            // Call Custom JS if it exists
                            // if (typeof cff_custom_js == 'function') setTimeout(function(){ cff_custom_js(jQuery); }, 100);
                            if (typeof cff_custom_js == 'function') cff_custom_js(jQuery);

                        } // End success
                    }); // End Ajax call
                //Hover on Load More button
                }).on('mouseenter',  function() {
                        $(this).css('background', $(this).attr('data-cff-hover') );
                }).on('mouseleave', function() {
                        $(this).css('background', $(this).attr('data-cff-bg') );
                });

                function cff_no_more_posts($cff, $cffLoadMore){
                    var no_more_posts_text = ( $cffLoadMore.attr('data-no-more') == '' ) ? 'No more posts' : $cffLoadMore.attr('data-no-more').replace(/\\'/g,"'");
                    if( $cff.find('.cff-no-more-posts').length < 1 ) $cffLoadMore.hide().after('<p class="cff-no-more-posts">'+no_more_posts_text+'</p>');
                }

                //Remove the masonry css class if it's a grid feed
                if( $cff.find('.cff-album-item').length ){
                    $cff.removeClass('cff-masonry cff-masonry-js cff-masonry-css');
                }

                //Multiple event dates toggle
                $cff.find('.cff-more-dates').on('click', function(){
                    $(this).siblings('.cff-multiple-dates').slideToggle(100);
                });


            }); // End .$('.cff-wrapper').each

             function cffGetCommentsIDArray(){
                    var commentsArrayIDs = [];
                    $('.cff-posts-wrap').each(function(){
                        var wrapper = $(this);
                        wrapper.find('.cff-item.cff-new:not(.cff-event)').each(function(){
                            var $self = $(this),
                            post_id_orig = $self.find('.cff-view-comments').attr('id'),
                            object_id = $self.closest('.cff-item').attr('data-object-id');
                            commentsArrayIDs.push(post_id_orig);
                        });

                    });
                    return commentsArrayIDs;
                }

                function cffGetFeedLocatorDataArray(){
                    var feedLocatorData = [];
                    $('.cff-timeline-feed').each(function(){
                        $cffPagUrl = $(this).find('.cff-pag-url');
                        var singleFeedLocatorData = {
                            feedID : $cffPagUrl.attr('data-feed-id'),
                            postID : $cffPagUrl.attr('data-post-id'),
                            shortCodeAtts : $(this).attr('data-cff-shortcode').trim() == '' ? {} : JSON.parse($(this).attr('data-cff-shortcode')),
                            location : CffFeed.prototype.locationGuess($(this))
                        };
                        feedLocatorData.push(singleFeedLocatorData);
                    });
                    return feedLocatorData;
                }
            //GET/CACHE COMMENTS
            //Check if the meta transient exists (set in head JS vars) and that a timeline feed exists on the page
            if($('.cff-timeline-feed').length && (typeof cffdisablecommentcaching == 'undefined') ){
                var commentsArrayIDs = cffGetCommentsIDArray(),
                feedLocatorData =  cffGetFeedLocatorDataArray();
                //If the comments data is cached then get it from the transient in the DB
                $.ajax({
                    url: cffajaxurl,
                    type: 'POST',
                    async: true,
                    cache: false,
                    data:{
                        action: 'get_meta',
                        comments_array_ids : commentsArrayIDs,
                        feedLocatorData : feedLocatorData
                    },
                    success: function(data) {
                        //If there's no data then set the array to be empty so that it hits the API for the data
                        if( data == '' || data.length < 1 ){
                            metaArr = [];
                        } else {
                            //Decode the JSON to that it can be used again
                            //Replace any escaped single quotes as it results in invalid JSON
                            data = data.replace(/\\'/g, "'");
                            //Convert the cached JSON string back to a JSON object
                            metaArr = JSON.parse( data );
                        }
                        // $cff.find('.cff-item.cff-new').each(function(){
                        $cff.each(function(){
                            $(this).find('.cff-item.cff-new:not(.cff-event)').each(function(){
                                var $self = $(this),
                                    post_id_orig = $self.find('.cff-view-comments').attr('id'),
                                    object_id = $self.closest('.cff-item').attr('data-object-id');
                                //If the post ID doesn't exist in the array then use the API to get the data
                                if( metaArr.hasOwnProperty(post_id_orig) && metaArr[post_id_orig] != ""){
                                    cffCreateComments($self, JSON.parse(metaArr[post_id_orig])['content']);
                                    cffAddFullsizeImageURLs($self, JSON.parse(metaArr[post_id_orig])['content']);
                                } else {
                                    cffGetMetaAPI($self, post_id_orig, object_id);
                                }
                            });
                        });
                    },
                    error: function(xhr,textStatus,e) {
                        return;
                    }

                }); //End ajax

            } else {
                $('#cff .cff-item.cff-new:not(.cff-event)').each(function(){
                    var $self = $(this),
                    post_id_orig = $self.find('.cff-view-comments').attr('id'),
                    object_id = $self.closest('.cff-item').attr('data-object-id');
                    cffGetMetaAPI($self, post_id_orig, object_id);
                });
            } //END GET/CACHE COMMENTS

            function cffGetMetaAPI($self, post_id_orig, object_id){

                //If there's no comments box on the page then return so we don't hit the API to get the data
                if( $self.find('.cff-view-comments').length == 0 ) return;

                if( typeof object_id == 'undefined' || object_id.length < 2 ) object_id = '';

                var object_id_query = ''+object_id,
                    post_id_query = '?post_id='+post_id_orig,
                    use_id = 'object',
                    post_comment_count = $self.find('.cff-comments .cff-count').text(),
                    post_likes_count = $self.find('.cff-likes .cff-count').text(),
                    cff_page_id = $self.attr('data-page-id');

                if( typeof post_comment_count == 'undefined' || post_comment_count == '' ) post_comment_count = 0;
                //Load comment counts via JS
                if( typeof $self.attr('data-comments-js') !== 'undefined' ){
                    if( typeof post_comment_count == 'undefined' || post_comment_count == '' ) post_comment_count = 1;
                }
                if( typeof post_likes_count == 'undefined' || post_likes_count == '' ) post_likes_count = 0;

                //If it's a video post or there's no object ID then use the post ID (video posts don't have "images" field)
                // if( typeof object_id == 'undefined' || object_id.length < 2 || $self.hasClass('cff-video-post') ) use_id = 'post';
                if( typeof object_id == 'undefined' || object_id.length < 2 || $self.find('.cff-comments-box').hasClass('cff-shared-story') || $self.hasClass('cff-timeline-event') ) use_id = 'post';

                var timeline_event = '';
                if( $self.hasClass('cff-timeline-event') ) timeline_event = '&timeline_event=true';

                var usegrouptoken = '',
                    useowntoken = '';
                if( $self.closest('#cff').hasClass('cff-group') ) usegrouptoken = '&usegrouptoken=true';
                if( $self.closest('#cff').attr('data-own-token') == 'true' ) useowntoken = '&useowntoken=true';

                shortcode_token_param = cffGetShortcodeToken( $self.closest('#cff') );

                //Is it a video post? If so, then we may be able to use the object ID to get the embeddable video object
                var cff_is_video_post = $self.hasClass('cff-video-post') ? '&isvideo=true' : '';

                var url = cffsiteurl + "/custom-facebook-feed-pro/query.php?o_id=" + object_id + '&post_id='+post_id_orig + '&use_id=' + use_id + timeline_event + usegrouptoken + useowntoken + '&comments_num=' + post_comment_count + '&likes_num=' + post_likes_count + '&type=meta' + cff_is_video_post + '&pageid=' + cff_page_id + shortcode_token_param;

                if( $self.hasClass('cff-album') ) url += '&timelinealbum=true';

                //Get comments, reactions, and full size images data from the API
                if( locatefile == true && typeof window.cff_block_editor === 'undefined' ){
                    var submitData = {
                        action: 'cff_query',
                        o_id: object_id,
                        post_id: post_id_orig,
                        use_id: use_id,
                        comments_num: post_comment_count,
                        likes_num: post_likes_count,
                        type: 'meta',
                        pageid: cff_page_id,
                    };
                    if( $self.hasClass('cff-video-post') ) {
                        submitData.isvideo = true;
                    }
                    if( $self.hasClass('cff-timeline-event') ) {
                        submitData.timeline_event = true;
                    }
                    if( $self.closest('#cff').hasClass('cff-group') ) {
                        submitData.usegrouptoken = true;
                    }
                    if( $self.closest('#cff').attr('data-own-token') == 'true' ) {
                        submitData.useowntoken = true;
                    }
                    if( shortcode_token_param !== '' ){
                        var token = shortcode_token_param.split('=');

                        submitData.at = token[1];
                    }

                    var onSuccess = function(data) {
                        metaArray.push( {'id_post' : post_id_orig, 'content' : data} );
                        //Cache the comments by adding to the cache array
                        metaArr[ post_id_orig ] = data;
                        newMetaArr[ post_id_orig ] = data; //This is cached. Only the new comments.
                        //Add the comments HTML
                        cffCreateComments($self, data);

                        //Replace images URLs with full size ones
                        cffAddFullsizeImageURLs($self, data);
                        //Set the cache
                        cffSetMetaCache(metaArray);

                    };
                    cffAjax(submitData,onSuccess);
                }

            } //End cffGetMetaAPI()

            //Only allow this function to run once every time new posts are loaded so that a load of ajax requests aren't all fired off at once. It's called once and then runs 3 times in total to cache all comments on the page into the cff_meta transient.
            var cffSetMetaCache_executed = false;
            function cffSetMetaCache(newMetaArr){
                if( typeof cffdisablecommentcaching != 'undefined' ) return;
                if( !cffSetMetaCache_executed ){

                    //Cache the comments data
                    var cffTimesCached = 0,
                        cffCacheDelay = setTimeout(function() {
                            //Try to cache it multiple times so that if the comments data isn't finished returning the first time then the subsequent attempts gets it
                            var cffCacheInterval = setInterval(function(){

                                cffCacheMeta(newMetaArr);

                                cffTimesCached++;
                                if(cffTimesCached == 2) clearInterval(cffCacheInterval);
                            }, 3000);

                            //Send the data to DB initially via ajax after a 0.5 second delay
                            cffCacheMeta(newMetaArr);
                        }, 500);

                    cffSetMetaCache_executed = true;

                } // End cffRunFunction check




                //Cache the likes and comments counts by sending an array via ajax to the main plugin file which then stores it in a transient
                function cffCacheMeta(newMetaArr){
                    //Convert the JSON object to a string
                    var jsonstring = JSON.stringify( newMetaArr );
                    //Encode the JSON string so that it can be stored in the database
                    //Cache the data
                    var opts = {
                        url: cffajaxurl,
                        type: 'POST',
                        async: true,
                        cache: false,
                        data:{
                            action: 'cache_meta',
                            metadata: jsonstring // Passes array of meta data to WP to cache
                        },
                        success: function(response) {
                            return;
                        },
                        error: function(xhr,textStatus,e) {
                            return;
                        }
                    };
                    $.ajax(opts);

                } // End cffCacheMeta()

            } // End cffSetMetaCache()


            function cffGetParameterByName(name, url) {
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }

            function cffLinkify(inputText) {
                var replacedText, replacePattern1, replacePattern2, replacePattern3;

                //URLs starting with http://, https://, or ftp://
                replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
                replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank" rel="nofollow noopener noreferrer">$1</a>');

                //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
                replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
                replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank" rel="nofollow noopener noreferrer">$2</a>');

                //Change email addresses to mailto:: links.
                replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
                replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

                return replacedText;
            }


            //HTML5 Video play button
            $(document).off('click', '#cff .cff-html5-video .cff-html5-play').on('click', '#cff .cff-html5-video .cff-html5-play', function(e){
                e.preventDefault();

                var $self = $(this),
                    $videoWrapper = $self.closest('.cff-html5-video'),
                    video = $self.siblings('video')[0];
                video.play();
                $self.hide();
                $self.siblings('.cff-poster').hide();

                //Show controls when the play button is clicked
                if (video.hasAttribute("controls")) {
                    video.removeAttribute("controls")
                } else {
                    video.setAttribute("controls","controls")
                }

                if($videoWrapper.innerWidth() < 150 && !$videoWrapper.hasClass('cff-no-video-expand')) {
                    $videoWrapper.css('width','100%').closest('.cff-item').find('.cff-text-wrapper').css('width','100%');
                }
            });


            //Replace the lightbox image with the full size image which is retrieved in the meta API request
            function cffAddFullsizeImageURLs($self, data){
                var data = JSON.parse( data );

                if( typeof data.images !== 'undefined' && data.images !== null ) $self.find('.cff-lightbox-link').attr('href', data.images[0].source);

                //Removed in v3.7 as shouldn't be needed any longer. Commenting out in case needs to be re-added.
                //Add the full size video image which is retrieved from query.php to fix the Facebook video image size API bug
                // if( $self.find('.cff-html5-video').length && typeof data.attachments !== 'undefined' && data.attachments !== null ){
                //  $self.find('.cff-poster').attr('src', data.attachments.data[0].media.image.src);
                //  console.log( data.attachments.data[0] );
                //  $self.find('.cff-lightbox-link').attr('href', data.attachments.data[0].media.image.src);
                // }
            }


            //Create comments
            function cffCreateComments($self, data){

                if (data.substring(0, 1) == "<") return false;

                //Convert string of data received from comments.php to a JSON object
                var data = JSON.parse( data ),
                    cff_comments = '',
                    cff_likes_this = '',
                    commentShow = parseInt( $self.find('.cff-comments-box').attr('data-num') ),
                    like_count = ( typeof data.likes !== 'undefined' ) ? data.likes.summary.total_count : 0,
                    $cffCommentsBox = $self.find('.cff-comments-box'),
                    $cffCommentLikes = $cffCommentsBox.find('.cff-comment-likes'),
                    cff_hide_comment_avatars = Boolean($self.find('.cff-comments-box').attr('data-cff-hide-avatars')),
                    cff_expand_comments = Boolean($self.find('.cff-comments-box').attr('data-cff-expand-comments')),
                    cff_translate_like_this_text = $cffCommentsBox.attr('data-cff-like-text'),
                    cff_translate_likes_this_text = $cffCommentsBox.attr('data-cff-likes-text'),
                    cff_translate_reacted_to_this_text = $cffCommentsBox.attr('data-cff-reacted-text'),
                    cff_translate_and_text = $cffCommentsBox.attr('data-cff-and-text'),
                    cff_translate_other_text = $cffCommentsBox.attr('data-cff-other-text'),
                    cff_translate_others_text = $cffCommentsBox.attr('data-cff-others-text'),
                    cff_translate_reply_text = $cffCommentsBox.attr('data-cff-reply-text'),
                    cff_translate_replies_text = $cffCommentsBox.attr('data-cff-replies-text'),
                    cff_total_comments_count = ( typeof data.comments !== 'undefined' ) ? data.comments.summary.total_count : 0,
                    cff_meta_link_color = $self.find('.cff-comments-box').attr('data-cff-meta-link-color'),
                    cff_post_tags = Boolean( $self.find('.cff-comments-box').attr('data-cff-post-tags') );

                //Load comment counts via JS
                if( typeof $self.attr('data-comments-js') !== 'undefined' ){
                    var comment_count = ( typeof data.comments !== 'undefined' ) ? data.comments.summary.total_count : 0;
                    $self.find('.cff-comments .cff-count').text(comment_count);
                }

                //ADD REACTIONS
                var cff_haha_count = ( typeof data.haha !== 'undefined' ) ? data.haha.summary.total_count : 0;
                var cff_love_count = ( typeof data.love !== 'undefined' ) ? data.love.summary.total_count : 0;
                var cff_wow_count = ( typeof data.wow !== 'undefined' ) ? data.wow.summary.total_count : 0;
                var cff_sad_count = ( typeof data.sad !== 'undefined' ) ? data.sad.summary.total_count : 0;
                var cff_angry_count = ( typeof data.angry !== 'undefined' ) ? data.angry.summary.total_count : 0;

                var reactions_arr = [cff_haha_count, cff_love_count, cff_wow_count, cff_sad_count, cff_angry_count];
                var reaction_first_num = reactions_arr.sort(sortNumber)[0];
                var reaction_second_num = reactions_arr.sort(sortNumber)[1];

                //Sort array highest to lowest
                function sortNumber(a,b) {
                    return b - a;
                }

                var reactions_html = '',
                    love_added = false,
                    haha_added = false,
                    wow_added = false,
                    sad_added = false,
                    angry_added = false,
                    love_svg = '<svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.7c-54.5-46.4-136-38.7-186.6 13.5L256 96.6l-19.7-20.3C195.5 34.1 113.2 8.7 49.7 62.7c-62.8 53.6-66.1 149.8-9.9 207.8l193.5 199.8c6.2 6.4 14.4 9.7 22.6 9.7 8.2 0 16.4-3.2 22.6-9.7L472 270.5c56.4-58 53.1-154.2-9.7-207.8zm-13.1 185.6L256.4 448.1 62.8 248.3c-38.4-39.6-46.4-115.1 7.7-161.2 54.8-46.8 119.2-12.9 142.8 11.5l42.7 44.1 42.7-44.1c23.2-24 88.2-58 142.8-11.5 54 46 46.1 121.5 7.7 161.2z"></path></svg>'+'<span class="cff-svg-bg-dark"><svg class="cff-svg-bg" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg></span>',
                    haha_svg = '<svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm152.7 400.7c-19.8 19.8-43 35.4-68.7 46.3-26.6 11.3-54.9 17-84.1 17s-57.5-5.7-84.1-17c-25.7-10.9-48.8-26.5-68.7-46.3-19.8-19.8-35.4-43-46.3-68.7-11.3-26.6-17-54.9-17-84.1s5.7-57.5 17-84.1c10.9-25.7 26.5-48.8 46.3-68.7 19.8-19.8 43-35.4 68.7-46.3 26.6-11.3 54.9-17 84.1-17s57.5 5.7 84.1 17c25.7 10.9 48.8 26.5 68.7 46.3 19.8 19.8 35.4 43 46.3 68.7 11.3 26.6 17 54.9 17 84.1s-5.7 57.5-17 84.1c-10.8 25.8-26.4 48.9-46.3 68.7zM281.8 206.3l80 48c11.5 6.8 24-7.6 15.4-18L343.6 196l33.6-40.3c8.6-10.3-3.8-24.8-15.4-18l-80 48c-7.7 4.7-7.7 15.9 0 20.6zm-147.6 48l80-48c7.8-4.7 7.8-15.9 0-20.6l-80-48c-11.6-6.9-24 7.7-15.4 18l33.6 40.3-33.6 40.3c-8.7 10.4 3.8 24.8 15.4 18zM383 288H113c-9.6 0-17.1 8.4-15.9 18 8.8 71 69.4 126 142.9 126h16c73.4 0 134-55 142.9-126 1.2-9.6-6.3-18-15.9-18zM256 400h-16c-50.2 0-93.5-33.3-107.4-80h230.8c-13.9 46.7-57.2 80-107.4 80z"></path></svg>'+'<svg class="cff-svg-bg" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 152c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm88 272h-16c-73.4 0-134-55-142.9-126-1.2-9.5 6.3-18 15.9-18h270c9.6 0 17.1 8.4 15.9 18-8.9 71-69.5 126-142.9 126z"></path></svg>',
                    wow_svg = '<svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216zm0-184c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64zm0 96c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm-48-176c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32zm128-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"></path></svg>'+'<svg class="cff-svg-bg" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM136 208c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm112 208c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm80-176c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>',
                    sad_svg = '<svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216zm0-152c-44.4 0-86.2 19.6-114.8 53.8-5.7 6.8-4.8 16.9 2 22.5 6.8 5.7 16.9 4.8 22.5-2 22.4-26.8 55.3-42.2 90.2-42.2s67.8 15.4 90.2 42.2c5.3 6.4 15.4 8 22.5 2 6.8-5.7 7.7-15.8 2-22.5C334.2 339.6 292.4 320 248 320zm-80-80c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z"></path></svg>'+'<svg class="cff-svg-bg" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm170.2 218.2C315.8 367.4 282.9 352 248 352s-67.8 15.4-90.2 42.2c-13.5 16.3-38.1-4.2-24.6-20.5C161.7 339.6 203.6 320 248 320s86.3 19.6 114.7 53.8c13.6 16.2-11 36.7-24.5 20.4z"></path></svg>',
                    angry_svg = '<svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216zm0-136c-31.2 0-60.6 13.8-80.6 37.8-5.7 6.8-4.8 16.9 2 22.5s16.9 4.8 22.5-2c27.9-33.4 84.2-33.4 112.1 0 5.3 6.4 15.4 8 22.5 2 6.8-5.7 7.7-15.8 2-22.5-19.9-24-49.3-37.8-80.5-37.8zm-48-96c0-2.9-.9-5.6-1.7-8.2.6.1 1.1.2 1.7.2 6.9 0 13.2-4.5 15.3-11.4 2.6-8.5-2.2-17.4-10.7-19.9l-80-24c-8.4-2.5-17.4 2.3-19.9 10.7-2.6 8.5 2.2 17.4 10.7 19.9l31 9.3c-6.3 5.8-10.5 14.1-10.5 23.4 0 17.7 14.3 32 32 32s32.1-14.3 32.1-32zm171.4-63.3l-80 24c-8.5 2.5-13.3 11.5-10.7 19.9 2.1 6.9 8.4 11.4 15.3 11.4.6 0 1.1-.2 1.7-.2-.7 2.7-1.7 5.3-1.7 8.2 0 17.7 14.3 32 32 32s32-14.3 32-32c0-9.3-4.1-17.5-10.5-23.4l31-9.3c8.5-2.5 13.3-11.5 10.7-19.9-2.4-8.5-11.4-13.2-19.8-10.7z"></path></svg><span class="cff-svg-bg-dark"><svg class="cff-svg-bg" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM136 240c0-9.3 4.1-17.5 10.5-23.4l-31-9.3c-8.5-2.5-13.3-11.5-10.7-19.9 2.5-8.5 11.4-13.2 19.9-10.7l80 24c8.5 2.5 13.3 11.5 10.7 19.9-2.1 6.9-8.4 11.4-15.3 11.4-.5 0-1.1-.2-1.7-.2.7 2.7 1.7 5.3 1.7 8.2 0 17.7-14.3 32-32 32S136 257.7 136 240zm168 154.2c-27.8-33.4-84.2-33.4-112.1 0-13.5 16.3-38.2-4.2-24.6-20.5 20-24 49.4-37.8 80.6-37.8s60.6 13.8 80.6 37.8c13.8 16.5-11.1 36.6-24.5 20.5zm76.6-186.9l-31 9.3c6.3 5.8 10.5 14.1 10.5 23.4 0 17.7-14.3 32-32 32s-32-14.3-32-32c0-2.9.9-5.6 1.7-8.2-.6.1-1.1.2-1.7.2-6.9 0-13.2-4.5-15.3-11.4-2.5-8.5 2.3-17.4 10.7-19.9l80-24c8.4-2.5 17.4 2.3 19.9 10.7 2.5 8.5-2.3 17.4-10.8 19.9z"></path></svg></span>',
                    like_svg = '<svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496.656 285.683C506.583 272.809 512 256 512 235.468c-.001-37.674-32.073-72.571-72.727-72.571h-70.15c8.72-17.368 20.695-38.911 20.695-69.817C389.819 34.672 366.518 0 306.91 0c-29.995 0-41.126 37.918-46.829 67.228-3.407 17.511-6.626 34.052-16.525 43.951C219.986 134.75 184 192 162.382 203.625c-2.189.922-4.986 1.648-8.032 2.223C148.577 197.484 138.931 192 128 192H32c-17.673 0-32 14.327-32 32v256c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32v-8.74c32.495 0 100.687 40.747 177.455 40.726 5.505.003 37.65.03 41.013 0 59.282.014 92.255-35.887 90.335-89.793 15.127-17.727 22.539-43.337 18.225-67.105 12.456-19.526 15.126-47.07 9.628-69.405zM32 480V224h96v256H32zm424.017-203.648C472 288 472 336 450.41 347.017c13.522 22.76 1.352 53.216-15.015 61.996 8.293 52.54-18.961 70.606-57.212 70.974-3.312.03-37.247 0-40.727 0-72.929 0-134.742-40.727-177.455-40.727V235.625c37.708 0 72.305-67.939 106.183-101.818 30.545-30.545 20.363-81.454 40.727-101.817 50.909 0 50.909 35.517 50.909 61.091 0 42.189-30.545 61.09-30.545 101.817h111.999c22.73 0 40.627 20.364 40.727 40.727.099 20.363-8.001 36.375-23.984 40.727zM104 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"></path></svg>'+'<svg class="cff-svg-bg" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path></svg>',
                    like_svg_2 = '<svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"></path></svg>';


                //Add first reaction
                var reaction_one_html = '';
                if( reaction_first_num > 0 ){
                    if(data.love.summary.total_count == reaction_first_num){
                        reaction_one_html += '<span class="cff-love cff-reaction-one cff-icon">'+love_svg+'</span>';
                        love_added = true;
                    }
                    if(data.haha.summary.total_count == reaction_first_num){
                        reaction_one_html += '<span class="cff-haha cff-reaction-one cff-icon">'+haha_svg+'</span>';
                        haha_added = true;
                    }
                    if(data.wow.summary.total_count == reaction_first_num){
                        reaction_one_html += '<span class="cff-wow cff-reaction-one cff-icon">'+wow_svg+'</span>';
                        wow_added = true;
                    }
                    if(data.sad.summary.total_count == reaction_first_num){
                        reaction_one_html += '<span class="cff-sad cff-reaction-one cff-icon">'+sad_svg+'</span>';
                        sad_added = true;
                    }
                    if(data.angry.summary.total_count == reaction_first_num){
                        reaction_one_html += '<span class="cff-angry cff-reaction-one cff-icon">'+angry_svg+'</span>';
                        angry_added = true;
                    }
                    reactions_html += reaction_one_html;
                }

                //If reaction one doesn't already contain two reactions (eg: if the two reaction_ones are the same number) then don't include a reaction_two
                if( reaction_one_html.split('cff-reaction-one').length < 3 ){
                    //Add second reaction
                    if( reaction_second_num > 0 ){
                        var reaction_two_html = '';

                        if(data.love.summary.total_count == reaction_second_num && !love_added){
                            reaction_two_html = '<span class="cff-love cff-reaction-two cff-icon">'+love_svg+'</span>';
                        }
                        if(data.haha.summary.total_count == reaction_second_num && !haha_added){
                            reaction_two_html = '<span class="cff-haha cff-reaction-two cff-icon">'+haha_svg+'</span>';
                        }
                        if(data.wow.summary.total_count == reaction_second_num && !wow_added){
                            reaction_two_html = '<span class="cff-wow cff-reaction-two cff-icon">'+wow_svg+'</span>';
                        }
                        if(data.sad.summary.total_count == reaction_second_num && !sad_added){
                            reaction_two_html = '<span class="cff-sad cff-reaction-two cff-icon">'+sad_svg+'</span>';
                        }
                        if(data.angry.summary.total_count == reaction_second_num && !angry_added){
                            reaction_two_html = '<span class="cff-angry cff-reaction-two cff-icon">'+angry_svg+'</span>';
                        }
                        reactions_html += reaction_two_html;
                    }
                }

                //Add the reaction icons
                if( $self.find('.cff-meta .cff-likes').find('.cff-icon').length < 2 ) $self.find('.cff-meta .cff-likes .cff-icon').after( reactions_html );

                //If there's no likes but there's a reacton then don't show the like icon - show the reaction icon instead
                if( parseInt(like_count) == 0 && ( parseInt(cff_love_count) > 0 || parseInt(cff_haha_count) > 0 || parseInt(cff_wow_count) > 0 || parseInt(cff_sad_count) > 0 || parseInt(cff_angry_count) > 0 ) ){
                    $self.find('.cff-meta .cff-likes .cff-like').remove();
                    $self.find('.cff-meta .cff-likes span').addClass('cff-no-animate');
                }

                //Add reactions to like count
                var cff_reactions_count = parseInt(like_count) + parseInt(cff_love_count) + parseInt(cff_haha_count) + parseInt(cff_wow_count) + parseInt(cff_sad_count) + parseInt(cff_angry_count);
                if( cff_reactions_count > 0 ) $self.find('.cff-meta .cff-likes .cff-count').text( cff_reactions_count );


                //ADDS REACTIONS TO COMMENTS BOX
                var cff_no_reactions = false;
                if( cff_love_count == 0 && cff_haha_count == 0 && cff_wow_count == 0 && cff_sad_count == 0 && cff_angry_count == 0 ) cff_no_reactions = true;

                var reactions_count_html = '<span class="cff-reactions-count">';

                if( parseInt(like_count) > 0){
                    reactions_count_html += '<span class="cff-like cff-icon">'+like_svg+'</span>';

                    if( !cff_no_reactions ){
                        if( parseInt(like_count) > 0 ) reactions_count_html += '<span class="cff-like-count">'+like_count+'</span>';
                        if( cff_love_count > 0 ) reactions_count_html += '<span class="cff-reaction-wrap"><span class="cff-love cff-icon">'+love_svg+'</span><span class="cff-love-count">'+cff_love_count+'</span></span>';
                        if( cff_haha_count > 0 ) reactions_count_html += '<span class="cff-reaction-wrap"><span class="cff-haha cff-icon">'+haha_svg+'</span><span class="cff-haha-count">'+cff_haha_count+'</span></span>';
                        if( cff_wow_count > 0 ) reactions_count_html += '<span class="cff-reaction-wrap"><span class="cff-wow cff-icon">'+wow_svg+'</span><span class="cff-wow-count">'+cff_wow_count+'</span></span>';
                        if( cff_sad_count > 0 ) reactions_count_html += '<span class="cff-reaction-wrap"><span class="cff-sad cff-icon">'+sad_svg+'</span><span class="cff-sad-count">'+cff_sad_count+'</span></span>';
                        if( cff_angry_count > 0 ) reactions_count_html += '<span class="cff-reaction-wrap"><span class="cff-angry cff-icon">'+angry_svg+'</span><span class="cff-angry-count">'+cff_angry_count+'</span></span>';
                    }
                }
                reactions_count_html += '</span>';

                //CREATE LIKES PART AT TOP OF COMMENTS BOX
                if( typeof data.likes !== 'undefined' ){
                    if( data.likes.data.length ){

                        cff_likes_this += '<span class="cff-likes-this-text">';

                        var liker_one = '',
                            liker_two = '';

                        if ( like_count > 0 && typeof data.likes.data[0] !== 'undefined' ){

                            //Only link the name if a legit link is available for this user
                            var userHasLink = false;
                            if( typeof data.likes.data[0].link !== 'undefined' ){
                                if( data.likes.data[0].link.indexOf('/app_scoped_user_id/') == -1 ) userHasLink = true;
                            }

                            //Creat link or span
                            userHasLink ? liker_one += '<a href="'+data.likes.data[0].link+'" target="_blank" rel="nofollow noopener" class="cff-liker-one-name" style="color:'+cff_meta_link_color+';' : liker_one = '<span class="cff-liker-one-name" style="';
                            if (cff_no_reactions) liker_one += ' margin-left: 5px';
                            liker_one += '">'+data.likes.data[0].name;

                            userHasLink ? liker_one += '</a>' : liker_one += '</span>';
                        }

                        if ( like_count > 1 && typeof data.likes.data[1] !== 'undefined' ){

                            //Only link the name if a legit link is available for this user
                            var userHasLink = false;
                            if( typeof data.likes.data[1].link !== 'undefined' ){
                                if( data.likes.data[1].link.indexOf('/app_scoped_user_id/') == -1 ) userHasLink = true;
                            }

                            //Creat link or span
                            userHasLink ? liker_two += '<a href="'+data.likes.data[1].link+'" target="_blank" rel="nofollow noopener" style="color:'+cff_meta_link_color+'">' : liker_two = '<span>';
                            liker_two += data.likes.data[1].name;

                            userHasLink ? liker_two += '</a>' : liker_two += '</span>';
                        }

                        if (like_count == 1){
                            cff_likes_this += liker_one+' '+cff_translate_likes_this_text;
                        } else if (like_count == 2){
                            cff_likes_this += liker_one+' '+cff_translate_and_text+' '+liker_two+' '+cff_translate_like_this_text;
                        } else if (like_count == 3){
                            cff_likes_this += liker_one+', '+liker_two+' '+cff_translate_and_text+' 1 '+cff_translate_other_text+' '+cff_translate_like_this_text;
                        } else {
                            cff_likes_this += liker_one+', '+liker_two+' '+cff_translate_and_text+' ';
                            if (like_count == 25) cff_likes_this += '<span class="cff-comment-likes-count">';
                            cff_likes_this += parseInt(cff_reactions_count)-2;
                            if (like_count == 25) cff_likes_this += '</span>';
                            cff_likes_this += ' '+cff_translate_others_text;

                            if( parseInt(cff_reactions_count) == parseInt(like_count) ){
                                cff_likes_this += ' '+cff_translate_like_this_text;
                            } else {
                                cff_likes_this += ' '+cff_translate_reacted_to_this_text;
                            }

                        }

                        cff_likes_this += '</span>';

                        if( $cffCommentLikes.find('.cff-reactions-count').length < 1 ) $cffCommentLikes.append('<span class="cff-likes-info-wrap">' + reactions_count_html + cff_likes_this + '</span>');

                    } else {
                        //If there's no likes data then hide the top of the comments box that shows the "likes this" section
                        if( cff_no_reactions ){
                            $cffCommentLikes.hide();
                        } else {
                            if( $cffCommentLikes.find('.cff-reactions-count').length < 1 ) $cffCommentLikes.append('<span class="cff-likes-info-wrap">' + reactions_count_html + '</span>');
                        }
                    }

                }


                if( typeof data.comments !== 'undefined' ){
                    $.each(data.comments.data, function(i, commentItem) {
                        var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;

                        //Do a final encode of the comment message
                        var comment_message = cffEncodeHTML(commentItem.message),
                            comment_message = cffLinkify(comment_message),
                            cff_comment_author_info = true,
                            cff_hide_comment_avatars = false;

                        //Check whether comment author info exists - only accessible with page access token from the page now
                        if( typeof commentItem.from !== 'undefined' ){
                            cff_comment_from_id = commentItem.from.id;
                        } else {
                            cff_hide_comment_avatars = true;
                            cff_comment_author_info = false;
                            cff_comment_from_id = '';
                        }

                        cff_comments += '<div class="cff-comment" id="cff_'+commentItem.id+'" data-id="'+cff_comment_from_id+'"';
                        cff_comments += ' style="';
                        ( i >= commentShow ) ? cff_comments += 'display: none;' : cff_comments += 'display: block;';
                        if( typeof $self.find('#cff_'+commentItem.id).attr('style') !== 'undefined' ) cff_comments += $self.find('#cff_'+commentItem.id).attr('style');
                        cff_comments += '"';
                        if( typeof commentItem.from !== 'undefined' ){
                            if( typeof commentItem.from.picture !== 'undefined' ){
                                cff_comments += 'data-avatar="'+commentItem.from.picture.data.url+'"';
                            }
                        }
                        cff_comments += '>';
                        cff_comments += '<div class="cff-comment-text-wrapper">';
                        cff_comments += '<div class="cff-comment-text';
                        if( cff_hide_comment_avatars ) cff_comments += ' cff-no-image';
                        cff_comments += '"><p>';
                        if( cff_comment_author_info ){
                            if( typeof commentItem.from.link !== 'undefined' ){
                                cff_comments += '<a href="'+commentItem.from.link+'" class="cff-name" target="_blank" rel="nofollow noopener" style="color:' + cff_meta_link_color + '">'+commentItem.from.name+'</a>';
                            } else {
                                cff_comments += '<span class="cff-name">'+commentItem.from.name+'</span>';
                            }
                        }

                        //MESSAGE TAGS
                        if( cff_post_tags && commentItem.hasOwnProperty('message_tags') ){

                            //Loop through the tags and use the name to replace them
                            $.each(commentItem.message_tags, function(i, message_tag) {
                                tag_name = message_tag.name;
                                tag_link = '<a href="http://facebook.com/'+message_tag.id+'" target="_blank" rel="nofollow noopener" style="color:'+cff_meta_link_color+'">'+message_tag.name+'</a>';

                                comment_message = comment_message.replace(tag_name, tag_link);
                            });

                        } //END MESSAGE TAGS

                        cff_comments += comment_message+'</p>';


                        //Add image attachment if exists
                        if( commentItem.hasOwnProperty('attachment') ){
                            if( commentItem.attachment.hasOwnProperty('media') ){
                                if (consentGiven) {
                                    cff_comments += '<a class="cff-comment-attachment" href="https://facebook.com/'+commentItem.id+'" target="_blank" rel="nofollow noopener"><img src="'+commentItem.attachment.media.image.src+'" alt="';
                                } else {
                                    cff_comments += '<a class="cff-comment-attachment" href="https://facebook.com/'+commentItem.id+'" target="_blank" rel="nofollow noopener"><span class="cff-comment-image-placeholder" data-src="'+commentItem.attachment.media.image.src+'"></span>';
                                }

                                if (consentGiven) {
                                    if( commentItem.attachment.hasOwnProperty('title') ){
                                        cff_comments += commentItem.attachment.title;
                                    } else {
                                        cff_comments += 'Attachment';
                                    }
                                    cff_comments += '" /></a>';
                                } else {
                                    cff_comments += '</a>';

                                }

                            }
                        }

                        cff_comments += '<span class="cff-time">';
                        var cff_middot = '',
                            cff_comment_time = $self.find('#cff_'+commentItem.id).attr('data-cff-comment-date');
                        //If the time is undefined then don't show it
                        if( typeof cff_comment_time !== 'undefined' ){
                            cff_comments += '<span class="cff-comment-date">'+cff_comment_time+'</span>';
                            cff_middot = '&nbsp; &middot; &nbsp;';
                        }
                        if ( commentItem.like_count > 0 ) cff_comments += '<span class="cff-comment-likes"><span class="cff-comment-likes-bg"><b>'+like_svg_2+'</b>'+commentItem.like_count+'</span></span>';
                        cff_comments += '</span>';

                        //Comment replies
                        var cff_comment_count = parseInt(commentItem.comment_count);
                        if( cff_comment_count > 0 ){
                            //Get this from a data attr on the comments box container
                            var cff_replies_text_string = '';
                            (cff_comment_count == 1) ? cff_replies_text_string = cff_translate_reply_text : cff_replies_text_string = cff_translate_replies_text;
                            cff_comments += '<p class="cff-comment-replies" data-id="'+commentItem.id+'"><a class="cff-comment-replies-a" href="javascript:void(0);" style="color:' + cff_meta_link_color + '"><span class="cff-replies-icon"></span>'+cff_comment_count+' '+cff_replies_text_string+'</a></p><div class="cff-comment-replies-box cff-empty"></div>';
                        }

                        cff_comments += '</div>'; //End .cff-comment-text
                        cff_comments += '</div>'; //End .cff-comment-text-wrapper

                        //Only load the comment avatars if they're being displayed initially, otherwise load via JS on click to save all the HTTP requests on page load
                        if( !cff_hide_comment_avatars && cff_comment_author_info ){
                            cff_comments += '<div class="cff-comment-img cff-avatar-fallback">';
                            if( typeof commentItem.from.link !== 'undefined' ) cff_comments += '<a href="https://facebook.com/'+commentItem.from.link+'" target="_blank" rel="noopener">';
                            if( cff_expand_comments && (i < commentShow) ) {
                                if (consentGiven) {
                                    cff_comments += '<img src="'+commentItem.from.picture.data.url+'" width=32 height=32 alt="'+commentItem.from.name+'" onerror="this.style.display=\'none\'">';
                                } else {
                                    cff_comments += '<span class="cff-comment-avatar-placeholder" data-src="'+commentItem.from.picture.data.url+'">';
                                }
                            } else {
                                cff_comments += '<span class="cff-comment-avatar"></span>';
                            }
                            if( typeof commentItem.from.link !== 'undefined' ) cff_comments += '</a>';
                            cff_comments += '</div>';
                        }

                        cff_comments += '</div>'; //End .cff-comment

                    }); //End data.comments.data loop

                } //End if

                //Remove the comments added for SEO in PHP
                $self.find('.cff-comments-wrap .cff-comment').remove();
                //Add the comments to the page
                $self.find('.cff-comments-wrap').prepend( cff_comments );
                $self.find('.cff-show-more-comments').attr('data-cff-comments-total', cff_total_comments_count);

                //Add border radius
                if( $self.find('.cff-comment-likes span').length > 0 ) $self.find('.cff-comment-on-facebook').css({'border-top-left-radius':"0",'border-top-right-radius':"0"});
                if( $self.find('.cff-comments-wrap .cff-comment').length > 0 ) $self.find('.cff-comment-on-facebook').css({'border-bottom-left-radius':"0",'border-bottom-right-radius':"0"});
                //Add a little more padding if there's no comments
                if( $self.find('.cff-comments-wrap .cff-comment').length < 1 ) $self.find('.cff-comment-on-facebook').css('padding','8px 15px 8px 10px');

                setTimeout(function(){
                    if( $self.closest('.cff').hasClass('cff-masonry-js') && !$self.closest('.cff').hasClass('cff-masonry-css') ) cffAddMasonry( $self.closest('.cff') );
                }, 200);

            } //End cffCreateComments()


            //Check if any lazy loading plugins have changed the image src
            function cff_lazy_load_correction(){

                var $ = jQuery;

                // The lightbox link needs to be reset to the original source
                $('.cff-lightbox-link').each(function(){
                    var $lbLink = $(this);

                    if( $lbLink.closest('.cff-album-item').attr('data-cff-full-size') ){
                        lborigSrc = $lbLink.attr('data-cff-full-size');
                    } else {
                        lborigSrc = $lbLink.parent().find('img').attr('data-orig-source');
                    }
                    $lbLink.attr('href', lborigSrc);
                })

                // Check if lazy load placeholder image is being used
                $('img[data-orig-source]').each(function(){
                    var $self = $(this),
                        currentSrc = $self.attr('src'),
                        originalSrc = $self.attr('data-orig-source');

                    // Check if the img source has been changed by lazy loading
                    if(originalSrc != currentSrc){
                        $self.attr('src', originalSrc);
                    }

                    // Timeline album posts need the background source reset
                    if($self.hasClass('cff-multi-image')){
                        $self.css('background-image', 'url(' + originalSrc + ')');
                    }
                });

                // Need to set a default value for the link slider in shared links otherwise it gets a 1px width
                $('.cff-link-slider').each(function(){
                    $(this).find('.cff-link-slider-slides').css('width', '2500px')
                });
            }

            if (typeof window.cff === 'undefined' || typeof window.cff.feeds === 'undefined') {
                if (!$cff.find('.cff_resized_image_data').length) {
                    cff_lazy_load_correction();
                }
            } else if (typeof window.cff.feeds[0] !== 'undefined') {
                if (!window.cff.feeds[0].settings.resizingEnabled) {
                    cff_lazy_load_correction();
                }
            }

            //Create shared link multi-image slider
            setTimeout(function(){

                $cff.find('.cff-link-slider').each(function(){

                    var $cffLinkSlider = $(this),
                        $cffLinkSliderSlides = $cffLinkSlider.find('.cff-link-slider-slides'),
                        $cffLinkSliderItem = $cffLinkSliderSlides.find('.cff-link-slider-item'),
                        cffLinkSliderCount = $cffLinkSliderItem.length,
                        cffLinkSliderWidth = $cffLinkSlider.width(),
                        cffCurSlide = 0;
                    $cffLinkSliderSlides.css({ width: cffLinkSliderWidth * cffLinkSliderCount });
                    $cffLinkSliderItem.css({ width: cffLinkSliderWidth });

                    function cffMoveSlide(dir) {
                        //Change slides
                        dir == 'prev' ? cffCurSlide-- : cffCurSlide++;
                        $cffLinkSliderSlides.css('left', -cffCurSlide*cffLinkSliderWidth);

                        //Hide the nav arrows at beginning/end
                        cffCurSlide == cffLinkSliderCount-1 ? $cffLinkSlider.find('a.cff-slider-next').hide() : $cffLinkSlider.find('a.cff-slider-next').show();
                        cffCurSlide > 0 ? $cffLinkSlider.find('a.cff-slider-prev').show() : $cffLinkSlider.find('a.cff-slider-prev').hide();
                    };
                    //Nav arrows click
                    $cffLinkSlider.find('a.cff-slider-prev, a.cff-slider-next').on('click', function(e){
                        e.preventDefault();
                        $(this).hasClass('cff-slider-prev') ? cffMoveSlide('prev') : cffMoveSlide('next');
                    });
                    //Vertically center last image in slider
                    setTimeout(function(){
                        var cffLastSlideHeight = $cffLinkSliderSlides.find('.cff-link-slider-item').first().height();
                        $cffLinkSliderSlides.find('.cff-final-item').css('height', cffLastSlideHeight).find('img').css('margin-top', (cffLastSlideHeight/2)-100 );
                    }, 1500);

                    //Show all slides (initially hidden in CSS)
                    $cffLinkSliderSlides.find('.cff-link-slider-item').show();

                });

            }, 200);


        })(jQuery); //End (function($){

        /*!
        imgLiquid v0.9.944 / 03-05-2013
        https://github.com/karacas/imgLiquid
        */

        var imgLiquid = imgLiquid || {VER: '0.9.944'};
        imgLiquid.bgs_Available = false;
        imgLiquid.bgs_CheckRunned = false;
        //Add the CSS using CSS as then it's only used when the JS file runs, otherwise with Ajax themes it's hiding the images but then the JS isn't running. This way still allows the images to display even if the JS doesn't run.
        $cff.find('.cff-new .cff-album-cover img, .cff-new .cff-crop img').css('visibility', 'hidden');
        jQuery('#cff .cff-img-attachments .cff-crop img').css('opacity', 0);


        (function ($) {

            // ___________________________________________________________________

            function checkBgsIsavailable() {
                if (imgLiquid.bgs_CheckRunned) return;
                else imgLiquid.bgs_CheckRunned = true;

                var spanBgs = $('<span style="background-size:cover" />');
                $('body').append(spanBgs);

                !function () {
                    var bgs_Check = spanBgs[0];
                    if (!bgs_Check || !window.getComputedStyle) return;
                    var compStyle = window.getComputedStyle(bgs_Check, null);
                    if (!compStyle || !compStyle.backgroundSize) return;
                    imgLiquid.bgs_Available = (compStyle.backgroundSize === 'cover');
                }();

                spanBgs.remove();
            }


            // ___________________________________________________________________

            $.fn.extend({
                imgLiquid: function (options) {

                    this.defaults = {
                        fill: true,
                        verticalAlign: 'center',            //  'top'   //  'bottom' // '50%'  // '10%'
                        horizontalAlign: 'center',          //  'left'  //  'right'  // '50%'  // '10%'
                        useBackgroundSize: false,
                        useDataHtmlAttr: true,

                        responsive: true,                   /* Only for use with BackgroundSize false (or old browsers) */
                        delay: false,                           /* Only for use with BackgroundSize false (or old browsers) */
                        fadeInTime: false,                      /* Only for use with BackgroundSize false (or old browsers) */
                        removeBoxBackground: true,          /* Only for use with BackgroundSize false (or old browsers) */
                        hardPixels: true,                   /* Only for use with BackgroundSize false (or old browsers) */
                        responsiveCheckTime: 500,           /* Only for use with BackgroundSize false (or old browsers) */ /* time to check div resize */
                        timecheckvisibility: 500,           /* Only for use with BackgroundSize false (or old browsers) */ /* time to recheck if visible/loaded */

                        // CALLBACKS
                        onStart: null,                      // no-params
                        onFinish: null,                     // no-params
                        onItemStart: null,                  // params: (index, container, img )
                        onItemFinish: function(index, container, img){  // params: (index, container, img )
                            img.addClass('cffFadeIn');
                        },
                        onItemError: null                   // params: (index, container, img )
                    };

                    checkBgsIsavailable();
                    var imgLiquidRoot = this;

                    // Extend global settings
                    this.options = options;
                    this.settings = $.extend({}, this.defaults, this.options);

                    // CallBack
                    if (this.settings.onStart) this.settings.onStart();


                    // ___________________________________________________________________

                    return this.each(function ($i) {

                        // MAIN >> each for image

                        var settings = imgLiquidRoot.settings,
                            $imgBoxCont = $(this),
                            $img = $('img:first',$imgBoxCont);
                        if (!$img.length) {onError(); return;}


                        // Extend settings
                        if (!$img.data('imgLiquid_settings')) {
                            // First time
                            settings = $.extend({}, imgLiquidRoot.settings, getSettingsOverwrite());
                        } else {
                            // Recall
                            // Remove Classes
                            $imgBoxCont.removeClass('imgLiquid_error').removeClass('imgLiquid_ready');
                            settings = $.extend({}, $img.data('imgLiquid_settings'), imgLiquidRoot.options);
                        }
                        $img.data('imgLiquid_settings', settings);


                        // Start CallBack
                        if (settings.onItemStart) settings.onItemStart($i, $imgBoxCont, $img); /* << CallBack */


                        // Process
                        if (imgLiquid.bgs_Available && settings.useBackgroundSize)
                            processBgSize();
                        else
                            processOldMethod();


                        // END MAIN <<

                        // ___________________________________________________________________

                        function processBgSize() {

                            // Check change img src
                            if ($imgBoxCont.css('background-image').indexOf(encodeURI($img.attr('src'))) === -1) {
                                // Change
                                $imgBoxCont.css({'background-image': 'url("' + encodeURI($img.attr('src')) + '")'});
                            }

                            $imgBoxCont.css({
                                'background-size':      (settings.fill) ? 'cover' : 'contain',
                                'background-position':  (settings.horizontalAlign + ' ' + settings.verticalAlign).toLowerCase(),
                                'background-repeat':    'no-repeat'
                            });

                            $('a:first', $imgBoxCont).css({
                                'display':  'block',
                                'width':    '100%',
                                'height':   '100%'
                            });

                            $('img', $imgBoxCont).css({'display': 'none'});

                            if (settings.onItemFinish) settings.onItemFinish($i, $imgBoxCont, $img); /* << CallBack */

                            $imgBoxCont.addClass('imgLiquid_bgSize');
                            $imgBoxCont.addClass('imgLiquid_ready');
                            checkFinish();
                        }

                        // ___________________________________________________________________

                        function processOldMethod() {

                            // Check change img src
                            if ($img.data('oldSrc') && $img.data('oldSrc') !== $img.attr('src')) {

                                /* Clone & Reset img */
                                var $imgCopy = $img.clone().removeAttr('style');
                                $imgCopy.data('imgLiquid_settings', $img.data('imgLiquid_settings'));
                                $img.parent().prepend($imgCopy);
                                $img.remove();
                                $img = $imgCopy;
                                $img[0].width = 0;

                                // Bug ie with > if (!$img[0].complete && $img[0].width) onError();
                                setTimeout(processOldMethod, 10);
                                return;
                            }


                            // Reproceess?
                            if ($img.data('imgLiquid_oldProcessed')) {
                                makeOldProcess(); return;
                            }


                            // Set data
                            $img.data('imgLiquid_oldProcessed', false);
                            $img.data('oldSrc', $img.attr('src'));


                            // Hide others images
                            $('img:not(:first)', $imgBoxCont).css('display', 'none');


                            // CSSs
                            $imgBoxCont.css({'overflow': 'hidden'});
                            $img.fadeTo(0, 0).removeAttr('width').removeAttr('height').css({
                                'visibility': 'visible',
                                'max-width': 'none',
                                'max-height': 'none',
                                'width': 'auto',
                                'height': 'auto',
                                'display': 'block'
                            });


                            // CheckErrors
                            $img.on('error', onError);
                            $img[0].onerror = onError;


                            // loop until load
                            function onLoad() {
                                if ($img.data('imgLiquid_error') || $img.data('imgLiquid_loaded') || $img.data('imgLiquid_oldProcessed')) return;
                                if ($imgBoxCont.is(':visible') && $img[0].complete && $img[0].width > 0 && $img[0].height > 0) {
                                    $img.data('imgLiquid_loaded', true);
                                    setTimeout(makeOldProcess, $i * settings.delay);
                                } else {
                                    setTimeout(onLoad, settings.timecheckvisibility);
                                }
                            }


                            onLoad();
                            checkResponsive();
                        }

                        // ___________________________________________________________________

                        function checkResponsive() {

                            /* Only for oldProcessed method (background-size dont need) */

                            if (!settings.responsive && !$img.data('imgLiquid_oldProcessed')) return;
                            if (!$img.data('imgLiquid_settings')) return;

                            settings = $img.data('imgLiquid_settings');

                            $imgBoxCont.actualSize = $imgBoxCont.get(0).offsetWidth + ($imgBoxCont.get(0).offsetHeight / 10000);
                            if ($imgBoxCont.sizeOld && $imgBoxCont.actualSize !== $imgBoxCont.sizeOld) makeOldProcess();

                            $imgBoxCont.sizeOld = $imgBoxCont.actualSize;
                            setTimeout(checkResponsive, settings.responsiveCheckTime);
                        }

                        // ___________________________________________________________________

                        function onError() {
                            $img.data('imgLiquid_error', true);
                            $imgBoxCont.addClass('imgLiquid_error');
                            if (settings.onItemError) settings.onItemError($i, $imgBoxCont, $img); /* << CallBack */
                            checkFinish();
                        }

                        // ___________________________________________________________________

                        function getSettingsOverwrite() {
                            var SettingsOverwrite = {};

                            if (imgLiquidRoot.settings.useDataHtmlAttr) {
                                var dif = $imgBoxCont.attr('data-imgLiquid-fill'),
                                    ha =  $imgBoxCont.attr('data-imgLiquid-horizontalAlign'),
                                    va =  $imgBoxCont.attr('data-imgLiquid-verticalAlign');

                                if (dif === 'true' || dif === 'false') SettingsOverwrite.fill = Boolean (dif === 'true');
                                if (ha !== undefined && (ha === 'left' || ha === 'center' || ha === 'right' || ha.indexOf('%') !== -1)) SettingsOverwrite.horizontalAlign = ha;
                                if (va !== undefined && (va === 'top' ||  va === 'bottom' || va === 'center' || va.indexOf('%') !== -1)) SettingsOverwrite.verticalAlign = va;
                            }

                            if (imgLiquid.isIE && imgLiquidRoot.settings.ieFadeInDisabled) SettingsOverwrite.fadeInTime = 0; //ie no anims
                            return SettingsOverwrite;
                        }

                        // ___________________________________________________________________

                        function makeOldProcess() { /* Only for old browsers, or useBackgroundSize seted false */

                            // Calculate size
                            var w, h, wn, hn, ha, va, hdif, vdif,
                                margT = 0,
                                margL = 0,
                                $imgCW = $imgBoxCont.width(),
                                $imgCH = $imgBoxCont.height();


                            // Save original sizes
                            if ($img.data('owidth') === undefined) $img.data('owidth',  $img[0].width);
                            if ($img.data('oheight') === undefined) $img.data('oheight', $img[0].height);


                            // Compare ratio
                            if (settings.fill === ($imgCW / $imgCH) >= ($img.data('owidth') / $img.data('oheight'))) {
                                w = '100%';
                                h = 'auto';
                                wn = Math.floor($imgCW);
                                hn = Math.floor($imgCW * ($img.data('oheight') / $img.data('owidth')));
                            } else {
                                w = 'auto';
                                h = '100%';
                                wn = Math.floor($imgCH * ($img.data('owidth') / $img.data('oheight')));
                                hn = Math.floor($imgCH);
                            }

                            // Align X
                            ha = settings.horizontalAlign.toLowerCase();
                            hdif = $imgCW - wn;
                            if (ha === 'left') margL = 0;
                            if (ha === 'center') margL = hdif * 0.5;
                            if (ha === 'right') margL = hdif;
                            if (ha.indexOf('%') !== -1){
                                ha = parseInt (ha.replace('%',''), 10);
                                if (ha > 0) margL = hdif * ha * 0.01;
                            }


                            // Align Y
                            va = settings.verticalAlign.toLowerCase();
                            vdif = $imgCH - hn;
                            if (va === 'left') margT = 0;
                            if (va === 'center') margT = vdif * 0.5;
                            if (va === 'bottom') margT = vdif;
                            if (va.indexOf('%') !== -1){
                                va = parseInt (va.replace('%',''), 10);
                                if (va > 0) margT = vdif * va * 0.01;
                            }


                            // Add Css
                            if (settings.hardPixels) {w = wn; h = hn;}
                            $img.css({
                                'width': w,
                                'height': h,
                                'margin-left': Math.floor(margL),
                                'margin-top': Math.floor(margT)
                            });


                            // FadeIn > Only first time
                            if (!$img.data('imgLiquid_oldProcessed')) {
                                $img.fadeTo(settings.fadeInTime, 1);
                                $img.data('imgLiquid_oldProcessed', true);
                                if (settings.removeBoxBackground) $imgBoxCont.css('background-image', 'none');
                                $imgBoxCont.addClass('imgLiquid_nobgSize');
                                $imgBoxCont.addClass('imgLiquid_ready');
                            }


                            if (settings.onItemFinish) settings.onItemFinish($i, $imgBoxCont, $img); /* << CallBack */
                            checkFinish();
                        }

                        // ___________________________________________________________________

                        function checkFinish() { /* Check callBack */
                            if ($i === imgLiquidRoot.length - 1) if (imgLiquidRoot.settings.onFinish) imgLiquidRoot.settings.onFinish();
                        }


                    });
                } //End imgLiquid: function
            }); //End $.fn.extend

        })(jQuery);

        if (typeof window.cff === 'undefined' || typeof window.cff.feeds === 'undefined') {
            window.cff = new Cff();
            window.cff.createPage(window.cff.createFeeds, {});
        }
        jQuery(document).ready(function() {
            var allInitiated = true;
            jQuery('.cff').each(function(index) {
                if (typeof window.cff !== 'undefined'
                    && typeof window.cff.feeds !== 'undefined'
                    && typeof window.cff.feeds[index] === 'undefined' ) {
                    allInitiated = false;

                }
            });

            if (!allInitiated) {
                window.cff.createPage(window.cff.createFeeds, {});
            }

            var $ = jQuery;
            $('#cookie-notice a').on('click', function() {
                setTimeout(function() {
                    $.each(window.cff.feeds,function(index){
                        window.cff.feeds[ index ].afterConsentToggled();
                    });
                },1000);
            });

            // Cookie Notice by dFactory
            $('#cookie-law-info-bar a').on('click', function() {
                setTimeout(function() {
                    $.each(window.cff.feeds,function(index){
                        window.cff.feeds[ index ].afterConsentToggled();
                    });
                },1000);
            });

            // GDPR Cookie Consent by WebToffee
            $('.cli-user-preference-checkbox').on('click', function(){
                setTimeout(function() {
                    $.each(window.cff.feeds,function(index){
                        window.cff.feeds[ index ].settings.consentGiven = false;
                        window.cff.feeds[ index ].afterConsentToggled();
                    });
                },1000);
            });

            // Cookiebot
            $(window).on('CookiebotOnAccept', function (event) {
                $.each(window.cff.feeds,function(index){
                    window.cff.feeds[ index ].settings.consentGiven = true;
                    window.cff.feeds[ index ].afterConsentToggled();
                });
            });

            // Complianz by Really Simple Plugins
            $(document).on('cmplzAcceptAll', function (event) {
                $.each(window.cff.feeds,function(index){
                    window.cff.feeds[ index ].settings.consentGiven = true;
                    window.cff.feeds[ index ].afterConsentToggled();
                });
            });

            // Complianz by Really Simple Plugins
            $(document).on('cmplzRevoke', function (event) {
                $.each(window.cff.feeds,function(index){
                    window.cff.feeds[ index ].settings.consentGiven = false;
                    window.cff.feeds[ index ].afterConsentToggled();
                });
            });

            // Borlabs Cookie by Borlabs
            $(document).on('borlabs-cookie-consent-saved', function (event) {
                $.each(window.cff.feeds,function(index){
                    window.cff.feeds[ index ].settings.consentGiven = false;
                    window.cff.feeds[ index ].afterConsentToggled();
                });
            });

        });

        //If a video is wrapped in this element then remove it as it causes an issue with some themes
        setTimeout(function(){
            jQuery('#cff .embed-responsive video, #cff .embed-responsive iframe').unwrap();
        }, 500);


        // Inject css styles ______________________________________________________
        !function () {
            var css = imgLiquid.injectCss,
                head = document.getElementsByTagName('head')[0],
                style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        }();
        jQuery(".cff-new .cff-album-cover").imgLiquid({fill:true});
        jQuery(".cff-new .cff-crop").imgLiquid({fill:true, useBackgroundSize:true});
        jQuery(".cff-header-hero").imgLiquid({fill:true});

    } //********* END cff_init() FUNCTION ************//


    cff_init();


//Get the Access Token from the shortcode so it can be used in the connect file
    function cffGetShortcodeToken($cff){
        var shortcode_token_param = '';
        if ( $cff.attr('data-cff-shortcode') ){
            if( $cff.attr('data-cff-shortcode').indexOf('accesstoken') !== -1 ){
                var shortcode_att = $cff.attr('data-cff-shortcode'),
                    shortcode_att_arr = JSON.parse( shortcode_att );
                shortcode_token_param = encodeURI('&at=' + shortcode_att_arr['accesstoken']);
            }
        }
        return shortcode_token_param;
    }

// Used for linking text in captions
    /* JavaScript Linkify - v0.3 - 6/27/2009 - http://benalman.com/projects/javascript-linkify/ */
    window.cffLinkify=(function(){var k="[a-z\\d.-]+://",h="(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",c="(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",n="(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",f="(?:"+c+n+"|"+h+")",o="(?:[;/][^#?<>\\s]*)?",e="(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",d="\\b"+k+"[^<>\\s]+",a="\\b"+f+o+e+"(?!\\w)",m="mailto:",j="(?:"+m+")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"+f+e+"(?!\\w)",l=new RegExp("(?:"+d+"|"+a+"|"+j+")","ig"),g=new RegExp("^"+k,"i"),b={"'":"`",">":"<",")":"(","]":"[","}":"{","B;":"B+","b:":"b9"},i={callback:function(q,p){return p?'<a href="'+p+'" title="'+p+'" target="_blank" rel="nofollow noopener noreferrer">'+q+"</a>":q},punct_regexp:/(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/};return function(u,z){z=z||{};var w,v,A,p,x="",t=[],s,E,C,y,q,D,B,r;for(v in i){if(z[v]===undefined){z[v]=i[v]}}while(w=l.exec(u)){A=w[0];E=l.lastIndex;C=E-A.length;if(/[\/:]/.test(u.charAt(C-1))){continue}do{y=A;r=A.substr(-1);B=b[r];if(B){q=A.match(new RegExp("\\"+B+"(?!$)","g"));D=A.match(new RegExp("\\"+r,"g"));if((q?q.length:0)<(D?D.length:0)){A=A.substr(0,A.length-1);E--}}if(z.punct_regexp){A=A.replace(z.punct_regexp,function(F){E-=F.length;return""})}}while(A.length&&A!==y);p=A;if(!g.test(p)){p=(p.indexOf("@")!==-1?(!p.indexOf(m)?"":m):!p.indexOf("irc.")?"irc://":!p.indexOf("ftp.")?"ftp://":"http://")+p}if(s!=C){t.push([u.slice(s,C)]);s=E}t.push([A,p])}t.push([u.substr(s)]);for(v=0;v<t.length;v++){x+=z.callback.apply(window,t[v])}return x||u}})();

//Link #hashtags
    function cffReplaceHashtags(hash){
        //Remove white space at beginning of hash
        var replacementString = jQuery.trim(hash);
        //If the hash is a hex code then don't replace it with a link as it's likely in the style attr, eg: "color: #ff0000"
        if ( /^#[0-9A-F]{6}$/i.test( replacementString ) ){
            return replacementString;
        } else {
            return '<a href="https://www.facebook.com/hashtag/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow noopener">' + replacementString + '</a>';
        }
    }
//Link @tags
    function cffReplaceTags(tag){
        var replacementString = jQuery.trim(tag);
        return '<a href="https://www.facebook.com/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow noopener">' + replacementString + '</a>';
    }
    var hashRegex = /[#]+[A-Za-z0-9-_]+/g,
        tagRegex = /[@]+[A-Za-z0-9-_]+/g;
// End caption linking functions

//Encoding comments
    function cffEncodeHTML(raw) {
        // make sure passed variable is defined
        if (typeof raw === 'undefined') {
            return '';
        }
        // replace greater than and less than symbols with html entity to disallow html in comments
        var encoded = raw.replace(/(>)/g,'&gt;'),
            encoded = encoded.replace(/(<)/g,'&lt;');
        encoded = encoded.replace(/(&lt;br\/&gt;)/g,'<br>');
        encoded = encoded.replace(/(&lt;br&gt;)/g,'<br>');

        return encoded;
    }


//Load comment replies using Ajax
    function cffLoadCommentReplies( $this ){

        var usegrouptoken = '',
            useowntoken = '',
            $cffClosestContainer = jQuery('#cff_'+$this.parent().attr('data-id')).closest('#cff');
        if( $cffClosestContainer.hasClass('cff-group') ) usegrouptoken = '&usegrouptoken=true';
        if( $cffClosestContainer.attr('data-own-token') == 'true' ) useowntoken = '&useowntoken=true';

        //Get the token from the shortcode
        var cff_page_id = $this.closest('.cff-item').attr('data-page-id'),
            shortcode_token_param = cffGetShortcodeToken( $cffClosestContainer ),
            $commentReplies = $this.parent(),
            $commentRepliesBox = $commentReplies.siblings('.cff-comment-replies-box'),
            comments_url = cffsiteurl + "/custom-facebook-feed-pro/comments.php?id=" + $commentReplies.attr('data-id') + usegrouptoken + useowntoken + '&pageid=' + cff_page_id + shortcode_token_param;

        if( $commentReplies.hasClass('cff-hide') ){

            $commentRepliesBox.hide();
            $commentReplies.removeClass('cff-hide');

        } else {

            $commentRepliesBox.show();
            $commentReplies.addClass('cff-hide');

            //If the replies haven't been retrieved yet then get them, otherwise just show the existing ones again
            if( $commentRepliesBox.hasClass('cff-empty') ){

                //Display loader
                var $commentRepliesA = $commentReplies.find('a');
                $commentRepliesA.append('<div class="cff-loader"></div>');
                $commentReplies.find('.cff-loader').css('background-color', $commentRepliesA.css('color'));

                var submitData = {
                    action: 'cff_comments',
                    id: $commentReplies.attr('data-id'),
                    pageid: cff_page_id,
                };
                if( $cffClosestContainer.hasClass('cff-group') ){
                    submitData.usegrouptoken = true;
                }
                if( $cffClosestContainer.attr('data-own-token') == 'true' ) {
                    submitData.useowntoken = true;
                }
                if( shortcode_token_param !== '' ){
                    var token = shortcode_token_param.split('=');
                    submitData.at = token[1];
                }

                var onSuccess = function(data) {

                    //Remove loader
                    $commentReplies.find('.cff-loader').remove();

                    //Convert string of data received from comments.php to a JSON object
                    var data = JSON.parse( data ),
                        allComments = '';

                    if( typeof data.comments !== 'undefined' ){
                        jQuery.each(data.comments.data, function(i, commentItem) {
                            var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;

                            //Check whether comment author info exists - only accessible with page access token from the page now
                            var cff_comment_author_info = true;
                            if( typeof commentItem.from !== 'undefined' ){
                                cff_comment_from_id = commentItem.from.id;
                            } else {
                                cff_comment_author_info = false;
                                cff_comment_from_id = '';
                            }


                            allComments += '<div class="cff-comment-reply" id="cff_'+commentItem.id+'"><div class="cff-comment-text-wrapper"><div class="cff-comment-text';
                            if(!cff_comment_author_info) allComments += ' cff-no-name';
                            allComments += '"><p>';


                            if(cff_comment_author_info){
                                if( typeof commentItem.from.link != 'undefined' ){
                                    allComments += '<a href="http://facebook.com/'+commentItem.from.id+'" class="cff-name" target="_blank" rel="nofollow noopener">'+commentItem.from.name+'</a>';
                                } else {
                                    allComments += '<span class="cff-name">'+commentItem.from.name+'</span>';
                                }
                            }


                            var cffCommentMessage = cffEncodeHTML(commentItem.message);
                            allComments += cffCommentMessage;

                            //Show like count if exists
                            if(parseInt(commentItem.like_count) > 0) allComments += '<span class="cff-comment-likes"><span class="cff-comment-likes-bg"><b style="padding-top: 3px;"><svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"></path></svg></b>'+commentItem.like_count+'</span></span>';

                            allComments += '</p>';

                            //Add image attachment if exists
                            if( typeof commentItem.attachment !== 'undefined' ) {
                                if (consentGiven) {
                                    allComments += '<a class="cff-comment-attachment" href="'+commentItem.attachment.url+'" target="_blank" rel="nofollow noopener"><img src="'+commentItem.attachment.media.image.src+'" alt="'+commentItem.attachment.title+'" /></a>';
                                } else {
                                    allComments += '<a class="cff-comment-attachment" href="'+commentItem.attachment.url+'" target="_blank" rel="nofollow noopener"><span class="cff-comment-image-placeholder" data-src="'+commentItem.attachment.media.image.src+'" data-alt="'+commentItem.attachment.title+'"></span></a>';
                                }
                            }

                            allComments += '</div></div>';
                            if(cff_comment_author_info) {
                                if (consentGiven) {
                                    allComments += '<div class="cff-comment-img cff-comment-reply-img"><a href="http://facebook.com/'+commentItem.from.id+'" target="_blank" rel="nofollow noopener"><img src="'+commentItem.from.picture.data.url+'" width="20" height="20" alt="Avatar" onerror="this.style.display=\'none\'"></a></div>';
                                } else {
                                    allComments += '<div class="cff-comment-img cff-comment-reply-img"><a href="http://facebook.com/'+commentItem.from.id+'" target="_blank" rel="nofollow noopener"><span data-src="'+commentItem.from.picture.data.url+'"></span></a></div>';
                                }
                            }
                            allComments += '</div>';
                        });
                    }

                    $commentRepliesBox.html(allComments).removeClass('cff-empty');

                    //Re-init masonry layout when loading comment replies
                    if( $this.closest('#cff').hasClass('cff-masonry-js') && !$this.closest('#cff').hasClass('cff-masonry-css') && !$this.closest('#cff').hasClass('cff-opaque-comments') ){
                        cffAddMasonry( $this.closest('#cff') );
                    }

                };
                cffAjax(submitData,onSuccess);

            } //End if

        } //End if/else

    } // End cffLoadCommentReplies()




    function cffLightbox(){
        /**
         * Lightbox v2.7.1
         * by Lokesh Dhakar - http://lokeshdhakar.com/projects/lightbox2/
         *
         * @license http://creativecommons.org/licenses/by/2.5/
         * - Free for use in both personal and commercial projects
         * - Attribution requires leaving author name, author link, and the license info intact
         */

        (function() {
            // Use local alias
            var $ = jQuery;

            var LightboxOptions = (function() {
                function LightboxOptions() {
                    this.fadeDuration                = 300;
                    this.fitImagesInViewport         = true;
                    this.resizeDuration              = 400;
                    this.positionFromTop             = 50;
                    this.showImageNumberLabel        = true;
                    this.alwaysShowNavOnTouchDevices = false;
                    this.wrapAround                  = false;
                }

                // Change to localize to non-english language
                LightboxOptions.prototype.albumLabel = function(curImageNum, albumSize) {
                    return curImageNum + " / " + albumSize;
                };

                return LightboxOptions;
            })();


            var Lightbox = (function() {
                function Lightbox(options) {
                    this.options           = options;
                    this.album             = [];
                    this.currentImageIndex = void 0;
                    this.init();
                }

                Lightbox.prototype.init = function() {
                    this.enable();
                    this.build();
                };

                // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
                // that contain 'cff-lightbox'. When these are clicked, start lightbox.
                Lightbox.prototype.enable = function() {
                    var self = this;
                    $('body').on('click', 'a[data-cff-lightbox], area[data-cff-lightbox]', function(event) {
                        self.start($(event.currentTarget));
                        return false;
                    });
                };

                // Build html for the lightbox and the overlay.
                // Attach event handlers to the new DOM elements.
                Lightbox.prototype.build = function() {
                    //Disable SVG icons?
                    var cff_lightbox_svg_class = '';
                    if( $('.cff.cff-no-svgs').length ) cff_lightbox_svg_class = 'cff-no-svgs';

                    var self = this;
                    $("<div id='cff-lightbox-overlay' class='cff-lightbox-overlay'></div><div id='cff-lightbox-wrapper' class='cff-lightbox-wrapper "+cff_lightbox_svg_class+"'><div class='cff-lightbox-outerContainer'><div class='cff-lightbox-container'><iframe type='text/html' src='' allowfullscreen frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen title='Video'></iframe><img class='cff-lightbox-image' src='' alt='"+$('#cff').attr('data-fb-text')+"' /><div class='cff-lightbox-nav'><a class='cff-lightbox-prev' href=''><span>Previous</span></a><a class='cff-lightbox-next' href=''><span>Next</span></a></div><div class='cff-lightbox-loader'><a class='cff-lightbox-cancel'></a></div><div class='cff-lightbox-sidebar'></div></div></div><div class='cff-lightbox-dataContainer'><div class='cff-lightbox-data'><div class='cff-lightbox-details'><p class='cff-lightbox-caption'><span class='cff-lightbox-caption-text'></span><a class='cff-lightbox-facebook' href=''><svg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='facebook-square' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' class='svg-inline--fa fa-facebook-square fa-w-14'><path fill='currentColor' d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z'></path></svg>"+$('#cff').attr('data-fb-text')+"</a></p><div class='cff-lightbox-thumbs'><div class='cff-lightbox-thumbs-holder'></div></div></div><div class='cff-lightbox-closeContainer'><a class='cff-lightbox-close'><svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' class='svg-inline--fa fa-times fa-w-11'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' class=''></path></svg></a></div></div></div></div>").appendTo($('body'));

                    // Make sure hammer is defined somehow
                    if (typeof jQuery("#cff-lightbox-wrapper").find(".cff-lightbox-dataContainer").hammer !== 'function') {
                        var Hammer = {
                            Manager: {
                                prototype: {}
                            }
                        };
                        (function (factory) {
                            if (typeof define === 'function' && define.amd) {
                                define(['jquery', 'hammerjs'], factory);
                            } else if (typeof exports === 'object') {
                                factory(require('jquery'), require('hammerjs'));
                            } else {
                                factory(jQuery, Hammer);
                            }
                        }(function (jQuery, Hammer) {
                            function hammerify(el, options) {
                            }

                            jQuery.fn.hammer = function (options) {
                                return this.each(function () {
                                    hammerify(this, options);
                                });
                            };
                            // extend the emit method to also trigger jQuery events
                            Hammer.Manager.prototype.emit = (function (originalEmit) {
                                return function (type, data) {
                                    originalEmit.call(this, type, data);
                                    jQuery(this.element).trigger({
                                        type: type,
                                        gesture: data
                                    });
                                };
                            })(Hammer.Manager.prototype.emit);
                        }));
                    }

                    // Cache jQuery objects
                    this.$lightbox       = $('#cff-lightbox-wrapper');
                    this.$overlay        = $('#cff-lightbox-overlay');
                    this.$outerContainer = this.$lightbox.find('.cff-lightbox-outerContainer');
                    this.$container      = this.$lightbox.find('.cff-lightbox-container');

                    // Store css values for future lookup
                    this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
                    this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
                    this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
                    this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);

                    // Attach event handlers to the newly minted DOM elements
                    this.$overlay.hide().on('click', function() {
                        self.end();
                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');
                        if ($('body').length) {
                            $('body').removeClass('cff_no_scroll');
                        }
                        return false;
                    });


                    this.$lightbox.hide().on('click', function(event) {
                        if ($(event.target).attr('id') === 'cff-lightbox-wrapper') {
                            self.end();
                            if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                            $('#cff-lightbox-wrapper iframe').attr('src', '');
                            if ($('body').length) {
                                $('body').removeClass('cff_no_scroll');
                            }
                        }
                        return false;
                    });
                    this.$outerContainer.on('click', function(event) {
                        if ($(event.target).attr('id') === 'cff-lightbox-wrapper') {
                            self.end();
                            if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                            $('#cff-lightbox-wrapper iframe').attr('src', '');
                        }
                        return false;
                    });


                    this.$lightbox.find('.cff-lightbox-prev').on('click', function() {
                        if (self.currentImageIndex === 0) {
                            self.changeImage(self.album.length - 1);
                        } else {
                            self.changeImage(self.currentImageIndex - 1);
                        }
                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');
                        return false;
                    });

                    this.$lightbox.find('.cff-lightbox-next').on('click', function() {
                        if (self.currentImageIndex === self.album.length - 1) {
                            self.changeImage(0);
                        } else {
                            self.changeImage(self.currentImageIndex + 1);
                        }
                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');
                        return false;
                    });

                    this.$lightbox.find('.cff-lightbox-outerContainer').hammer().on("swipeleft", function() {
                        if (self.currentImageIndex === self.album.length - 1) {
                            self.changeImage(0);
                        } else {
                            self.changeImage(self.currentImageIndex + 1);
                        }
                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');
                        return false;
                    });

                    this.$lightbox.find('.cff-lightbox-outerContainer').hammer().on("swiperight", function() {
                        if (self.currentImageIndex === 0) {
                            self.changeImage(self.album.length - 1);
                        } else {
                            self.changeImage(self.currentImageIndex - 1);
                        }
                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');
                        return false;
                    });

                    //CHANGE IMAGE ON THUMB CLICK
                    $('.cff-lightbox-thumbs').on('click', '.cff-lightbox-attachment', function (){
                        var $thumb = $(this),
                            $thumbImg = $thumb.find('img'),
                            captionText = $thumb.attr('data-caption');

                        if(captionText == '' || captionText == 'undefined') captionText = $thumb.attr('orig-caption');

                        //Pass image URL, width and height to the change image function
                        self.changeImage(parseInt( $thumb.attr('data-cff-lightbox-order') ), $thumb.attr('href'), $thumbImg.attr('width'), $thumbImg.attr('height'), $thumb.attr('data-facebook'), captionText);
                        return false;
                    });


                    this.$lightbox.find('.cff-lightbox-loader, .cff-lightbox-close').on('click', function() {
                        self.end();
                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');
                        if ($('body').length) {
                            $('body').removeClass('cff_no_scroll');
                        }
                        return false;
                    });

                }; //End build()

                // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
                Lightbox.prototype.start = function($link) {
                    var self    = this;
                    var $window = $(window);

                    $window.on('resize', $.proxy(this.sizeOverlay, this));

                    if ($('body').length) {
                        $('body').addClass('cff_no_scroll');
                    }

                    $('select, object, embed').css({
                        visibility: "hidden"
                    });

                    this.sizeOverlay();

                    //Only set the album to be empty when the page first loads, otherwise don't empty it otherwise it's rebuilt using the "push" method below and it pushes the lightbox thumbnails onto the end of the array instead of them being spliced in at their correct location
                    if(this.album.length == 0) this.album = [];
                    var imageNumber = 0;

                    function addToAlbum($link) {

                        var albumClassName = $link.closest('.cff-posts-wrap').children().attr('class');                    

                        linkParentPostID = '';
                        
                        if ( typeof albumClassName !== 'undefined' ) {
                            linkParentPostID = $link.closest('.'+albumClassName.split(' ')[0]).attr('id');
                            linkParentPostID = linkParentPostID.replace('cff_','')
                        }

                        //If an image with the same href has already been added then don't add it to the lightbox order again
                        var found = false;
                        $.each(self.album, function(i, imageitem) {
                            if( ( imageitem.link == $link.attr('href') ) && ( imageitem.postid == linkParentPostID ) ){
                                found = true;
                                return;
                            }
                        });
                        //Some videos may legitimately use the exact same thumbnail images. If so, adding this class to the shortcode will allow them to be added to the lightbox order.
                        if( !$('.cff-duplicate-video-thumbnails').length ) if(found == true) return;
                        var closestFeedIndex = parseInt($link.closest('.cff').attr('data-cff-index')-1);

                        var video = $link.attr("data-video"),
                            iframe = $link.attr('data-iframe'),
                            link = $link.attr("href"),
                            count = 0;
                        var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;
                        if (!consentGiven) {
                            if (iframe !== '') {
                                iframe = 'link';
                            }
                            if (video !== '') {
                                video = 'link';
                            }
                            if ($link.closest('.cff-album-item').length
                                && typeof $link.closest('.cff-album-item').attr('data-count') !== 'undefined') {
                                count = $link.closest('.cff-album-item').attr('data-count');
                            }
                        }
                        self.album.push({
                            link: link,
                            title: $link.attr('data-title') || $link.attr('title'),
                            postid: $link.attr('data-id'),
                            showthumbs: $link.attr('data-thumbs'),
                            facebookurl: $link.attr('data-url'),
                            video: video,
                            iframe: iframe,
                            type: $link.attr('data-type'),
                            cffgroupalbums: $link.attr('data-cffgroupalbums'),
                            isthumbnail: $link.attr('data-cff-isthumbnail'),
                            pagename: $link.parent().attr('data-cff-page-name'),
                            posttime: $link.parent().attr('data-cff-post-time'),
                            lbcomments: $link.attr('data-lb-comments'),
                            feedIndex: closestFeedIndex,
                            count: count
                        });
                    }

                    // Support both data-lightbox attribute and rel attribute implementations
                    var dataLightboxValue = $link.attr('data-cff-lightbox');
                    var $links;

                    if (dataLightboxValue) {
                        $links = $($link.prop("tagName") + '[data-cff-lightbox="' + dataLightboxValue + '"]');
                        for (var i = 0; i < $links.length; i = ++i) {
                            addToAlbum($($links[i]));
                            if ($links[i] === $link[0]) {
                                imageNumber = i;

                                //Loop through the album array and try to match the ID of the image that was clicked on with an image within the album array. We can then use that to set the lightbox order for that image, as otherwise it's incorrect if there have been thumbs added into the album array which aren't physically present on the page as they're loaded dynamically from the thumbs array within the lightbox. Only do this for post images and not thumbnails.
                                $.each(self.album, function(i, image) {
                                    if( (image.postid == $link.attr('data-id')) && image.isthumbnail != true ) imageNumber = i;
                                });
                            }
                        }
                    } else {
                        if ($link.attr('rel') === 'lightbox') {
                            // If image is not part of a set
                            addToAlbum($link);
                        } else {
                            // If image is part of a set
                            $links = $($link.prop("tagName") + '[rel="' + $link.attr('rel') + '"]');
                            for (var j = 0; j < $links.length; j = ++j) {
                                addToAlbum($($links[j]));
                                if ($links[j] === $link[0]) {
                                    imageNumber = j;
                                }
                            }
                        }
                    }

                    // Position Lightbox
                    var top  = $window.scrollTop() + this.options.positionFromTop;
                    var left = $window.scrollLeft();
                    this.$lightbox.css({
                        top: top + 'px',
                        left: left + 'px'
                    }).fadeIn(this.options.fadeDuration);

                    this.changeImage(imageNumber);
                };

                // Hide most UI elements in preparation for the animated resizing of the lightbox.
                Lightbox.prototype.changeImage = function(imageNumberVal, imageUrl, imgWidth, imgHeight, facebookLink, captionText) {
                    var self = this,
                        isThumb = false,
                        bottomPadding = 120;

                    imageNumber = imageNumberVal;

                    //Is this a thumb being clicked?
                    if(typeof imageUrl !== 'undefined') isThumb = true;

                    this.disableKeyboardNav();
                    var $image = this.$lightbox.find('.cff-lightbox-image');

                    this.$overlay.fadeIn(this.options.fadeDuration);

                    $('.cff-lightbox-loader').fadeIn('slow');
                    this.$lightbox.find('.cff-lightbox-image, .cff-lightbox-nav, .cff-lightbox-prev, .cff-lightbox-next, .cff-lightbox-dataContainer, .cff-lightbox-numbers, .cff-lightbox-caption').hide();

                    this.$outerContainer.addClass('animating');


                    // When image to show is preloaded, we send the width and height to sizeContainer()
                    var preloader = new Image();
                    preloader.onload = function() {
                        var $preloader, imageHeight, imageWidth, maxImageHeight, maxImageWidth, windowHeight, windowWidth;

                        $image.attr('src', self.album[imageNumber].link);

                        /*** THUMBS ***/
                        //Change the main image when it's a thumb that's being clicked
                        if(isThumb){
                            $image.attr('src', imageUrl);
                            $('.cff-lightbox-facebook').attr('href', facebookLink);
                            $('.cff-lightbox-caption .cff-lightbox-caption-text').html(captionText);

                            //Set width and height of image when thumb is clicked
                            preloader.width = imgWidth;
                            preloader.height = imgHeight;

                            //Increase bottom padding to make room for at least one row of thumbs
                            bottomPadding = 180;
                        }
                        /*** THUMBS ***/

                        $preloader = $(preloader);

                        $image.width(preloader.width);
                        $image.height(preloader.height);

                        if (self.options.fitImagesInViewport) {
                            // Fit image inside the viewport.
                            // Take into account the border around the image and an additional 10px gutter on each side.
                            windowWidth    = $(window).width();
                            windowHeight   = $(window).height();

                            //If this feed has lightbox comments enabled then add room for the sidebar
                            var cff_lb_comments_width = 0,
                                cffNavArrowsWidth = 80;

                            if( $('#cff_' + self.album[0].postid).closest('#cff').attr('data-lb-comments') == 'true' && windowWidth > 640 ) cff_lb_comments_width = 300;

                            //Use narrower arrows on mobile
                            if(window.innerWidth < 640) cffNavArrowsWidth = 40;

                            maxImageWidth  = windowWidth - self.containerLeftPadding - self.containerRightPadding - 20 - cff_lb_comments_width - cffNavArrowsWidth;
                            maxImageHeight = windowHeight - self.containerTopPadding - self.containerBottomPadding - bottomPadding;

                            // Is there a fitting issue?
                            if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
                                if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
                                    imageWidth  = maxImageWidth;
                                    imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
                                    $image.width(imageWidth);
                                    $image.height(imageHeight);
                                } else {
                                    imageHeight = maxImageHeight;
                                    imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
                                    $image.width(imageWidth);
                                    $image.height(imageHeight);
                                }
                            }
                        }

                        //Pass the width and height of the main image
                        self.sizeContainer($image.width(), $image.height());

                    };

                    preloader.src          = this.album[imageNumber].link;
                    this.currentImageIndex = imageNumber;
                };

                // Stretch overlay to fit the viewport
                Lightbox.prototype.sizeOverlay = function() {
                    this.$overlay
                        .width($(window).width())
                        .height($(document).height());
                };

                // Animate the size of the lightbox to fit the image we are showing
                Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
                    var self = this;

                    var oldWidth  = this.$outerContainer.outerWidth();
                    var oldHeight = this.$outerContainer.outerHeight();
                    var newWidth  = imageWidth + this.containerLeftPadding + this.containerRightPadding;
                    var newHeight = imageHeight + this.containerTopPadding + this.containerBottomPadding;

                    function postResize() {
                        self.$lightbox.find('.cff-lightbox-dataContainer').width(newWidth);
                        self.$lightbox.find('.cff-lightbox-prevLink').height(newHeight);
                        self.$lightbox.find('.cff-lightbox-nextLink').height(newHeight);
                        self.showImage();
                    }

                    if (oldWidth !== newWidth || oldHeight !== newHeight) {
                        this.$outerContainer.animate({
                            width: newWidth,
                            height: newHeight
                        }, this.options.resizeDuration, 'swing', function() {
                            postResize();
                        });
                    } else {
                        postResize();
                    }
                };

                // Display the image and it's details and begin preload neighboring images.
                Lightbox.prototype.showImage = function() {
                    this.$lightbox.find('.cff-lightbox-loader').hide();
                    this.$lightbox.find('.cff-lightbox-image').fadeIn('slow');

                    this.updateNav();
                    this.updateDetails();
                    this.preloadNeighboringImages();
                    this.enableKeyboardNav();
                };

                // Display previous and next navigation if appropriate.
                Lightbox.prototype.updateNav = function() {
                    // Check to see if the browser supports touch events. If so, we take the conservative approach
                    // and assume that mouse hover events are not supported and always show prev/next navigation
                    // arrows in image sets.
                    var alwaysShowNav = false;
                    try {
                        document.createEvent("TouchEvent");
                        alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices)? true: false;
                    } catch (e) {}

                    this.$lightbox.find('.cff-lightbox-nav').show();

                    if (this.album.length > 1) {
                        if (this.options.wrapAround) {
                            if (alwaysShowNav) {
                                this.$lightbox.find('.cff-lightbox-prev, .cff-lightbox-next').css('opacity', '1');
                            }
                            this.$lightbox.find('.cff-lightbox-prev, .cff-lightbox-next').show();
                        } else {
                            if (this.currentImageIndex > 0) {
                                this.$lightbox.find('.cff-lightbox-prev').show();
                                if (alwaysShowNav) {
                                    this.$lightbox.find('.cff-lightbox-prev').css('opacity', '1');
                                }
                            }
                            if (this.currentImageIndex < this.album.length - 1) {
                                this.$lightbox.find('.cff-lightbox-next').show();
                                if (alwaysShowNav) {
                                    this.$lightbox.find('.cff-lightbox-next').css('opacity', '1');
                                }
                            }
                        }
                    }
                };

                var thumbsArr = {};

                // Display caption, image number, and closing button.
                Lightbox.prototype.updateDetails = function() {
                    var self = this;
                    var origCaption = '';

                    this.$lightbox.find('.cff-lightbox-nav, .cff-lightbox-nav a').show();

                    /** NEW PHOTO ACTION **/

                    //Add the video element to the lightbox dynamically (as it causes issues with some themes if an empty tag is in there on page load)
                    if( $('.cff-lightbox-video').length == 0 ) $('.cff-lightbox-container').prepend("<video class='cff-lightbox-video' src='' poster='' controls></video>");

                    //Switch video when either a new popup or navigating to new one
                    if( cff_supports_video() ){
                        $('#cff-lightbox-wrapper').removeClass('cff-has-video');

                        if (typeof this.album[this.currentImageIndex].video !== 'undefined'
                            && this.album[this.currentImageIndex].video !== 'link'){
                            if( this.album[this.currentImageIndex].video.length ){

                                $('#cff-lightbox-wrapper').addClass('cff-has-video');
                                $('.cff-lightbox-video').attr({
                                    'src' : this.album[this.currentImageIndex].video,
                                    'poster' : this.album[this.currentImageIndex].link,
                                    'autoplay' : 'true'
                                });
                            }
                        }

                    }

                    var iframeIsLink = false;
                    if (this.album[this.currentImageIndex].iframe === 'link') {
                        iframeIsLink = true;
                    }
                    if ((this.album[this.currentImageIndex].video === 'link' || iframeIsLink)
                        && ! jQuery(".cff-lightbox-container .cff_gdpr_notice").length) {
                        jQuery(".cff-lightbox-container").prepend('<a href="'+this.album[this.currentImageIndex].facebookurl+'" target="_blank" rel="noopener noreferrer" class="cff_gdpr_notice"><svg style="color: rgba(255,255,255,1)" class="svg-inline--fa fa-play fa-w-14" aria-label="Play" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="play" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></a>')
                    } else if (this.album[this.currentImageIndex].video !== 'link' && !iframeIsLink) {
                        jQuery('.cff_gdpr_notice').remove();
                    } else if (jQuery(".cff-lightbox-container .cff_gdpr_notice").length) {
                        jQuery(".cff-lightbox-container .cff_gdpr_notice").attr('href',this.album[this.currentImageIndex].facebookurl);
                    }

                    //***LIGHTBOX COMMENTS***
                    //Enable/disable lightbox comments. If it's a lightbox thumbnail then check whether the parent post has lb_comments enabled/disabled.
                    var cff_lb_comments = (this.album[this.currentImageIndex].lbcomments == 'true' && $('#cff_'+this.album[this.currentImageIndex].postid+' .cff-lightbox-link').attr('data-lb-comments') != 'false') ? true : false;

                    if( $(window).width() <= 640 ) cff_lb_comments = false;

                    //Add lightbox sidebar
                    if( cff_lb_comments ){
                        var lb_post_id = this.album[this.currentImageIndex].postid,
                            page_id = lb_post_id.split('_')[0],
                            author_name = this.album[this.currentImageIndex].pagename,
                            date_in_correct_format = this.album[this.currentImageIndex].posttime,
                            $lightbox_sidebar = $('.cff-lightbox-container .cff-lightbox-sidebar'),
                            $lightbox_thumbs_holder = $('.cff-lightbox-thumbs-holder'),
                            from_id = $( '#cff_'+this.album[this.currentImageIndex].postid ).attr('data-cff-from');

                        //Add class to the lightbox container
                        $('.cff-lightbox-wrapper').addClass('cff-enable-lb-comments');

                        //Adjust width to make room for the sidebar
                        $('.cff-lightbox-dataContainer').css( 'width', $('.cff-lightbox-dataContainer').innerWidth() + 300 );
                        $lightbox_sidebar.css('display', 'block');

                        //If the from info isn't available then display a placeholder avatar and the date
                        var cff_post_author = "";
                        var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;
                        if( consentGiven && typeof from_id !== 'undefined' ){
                            cff_post_author =  "<div class='cff-author'><div class='cff-author-text'><p class='cff-page-name cff-author-date'><a href='https://facebook.com/"+from_id+"' target='_blank' rel='nofollow'>"+author_name+"</a><span class='cff-story'> </span></p><p class='cff-date'>"+date_in_correct_format+"</p></div><a href='https://facebook.com/"+from_id+"' target='_blank' rel='nofollow noopener' class='cff-author-img'><img src='https://graph.facebook.com/"+from_id+"/picture?type=square' title='"+author_name+"' alt='"+author_name+"' width='40' height='40'></a></div>";
                        } else {
                            cff_post_author =  "<div class='cff-author cff-no-author-info'><div class='cff-author-text'><p class='cff-date'>"+date_in_correct_format+"</p></div><div class='cff-author-img'></div></div>";
                        }

                        //Remove the close button from the bottom of lightbox as it's added to the top of the sidebar
                        $('.cff-lightbox-dataContainer .cff-lightbox-close').remove();

                        $lightbox_sidebar.html("<div class='cff-lightbox-closeContainer'><div class='cff-lightbox-close'><svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' class='svg-inline--fa fa-times fa-w-11'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' class=''></path></svg></div></div><div class='cff-lightbox-sidebar-content'>" + cff_post_author + "<p class='cff-lightbox-caption'><span class='cff-lightbox-caption-text'>" + $('.cff-lightbox-caption-text').html() + '</span></p></div>' + $('#cff_'+this.album[this.currentImageIndex].postid+' .cff-comments-box')[0].outerHTML );

                        this.$lightbox.find('.cff-lightbox-close').on('click', function() {
                            self.end();
                            if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                            $('#cff-lightbox-wrapper iframe').attr('src', '');
                            if ($('body').length) {
                                $('body').removeClass('cff_no_scroll');
                            }
                            return false;
                        });

                        //Use a timeout to delay this as the thumbs aren't added till further down
                        setTimeout(function(){
                            if( $lightbox_thumbs_holder.find('a').length > 1 ){
                                $lightbox_sidebar.find('.cff-page-name a').text( $lightbox_thumbs_holder.find('a.cff-selected').attr('data-page-name') );
                                $lightbox_sidebar.find('.cff-date').text( $lightbox_thumbs_holder.find('a.cff-selected').attr('data-post-date') );
                            }
                        }, 0);

                        //Bump the thumbs section up if the sidebar section is enabled as there's no caption under the photo
                        $lightbox_thumbs_holder.css('margin-top', -10);

                        //If the "__ likes this" text is too long then bump it onto the next line
                        if( $lightbox_sidebar.find('.cff-reactions-count').innerWidth() > 150 ){
                            $lightbox_sidebar.find('.cff-likes-this-text').addClass('cff-long');
                        }

                        //Add comment avatars
                        $lightbox_sidebar.find('.cff-comment:visible').each(function(){
                            var $thisComment = jQuery(this);
                            var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;
                            if (consentGiven) {
                                $thisComment.find('.cff-comment-img:not(.cff-comment-reply-img) a, .cff-comment-img:not(.cff-comment-reply-img) span').html( '<img src="'+$thisComment.attr("data-avatar")+'" alt="Avatar" onerror="this.style.display=\'none\'" />' );
                            }

                        });

                        //Load comment replies
                        $lightbox_sidebar.find('.cff-comment-replies a').on('click', function(){
                            cffLoadCommentReplies( $(this) );
                        });

                        $lightbox_sidebar.find('.cff-show-more-comments a').attr('href', $lightbox_sidebar.find('.cff-comment-on-facebook a').attr('href') );

                    } else { //End add lightbox sidebar

                        //Disable lightbox
                        $('.cff-lightbox-wrapper .cff-lightbox-sidebar').html('');
                        $('.cff-lightbox-wrapper').removeClass('cff-enable-lb-comments');

                    }
                    //***END LIGHTBOX COMMENTS***



                    $('#cff-lightbox-wrapper').removeClass('cff-has-iframe cff-fb-player cff-has-thumbs');

                    //If it's an iframe video (embed or FB video player)
                    if( typeof this.album[this.currentImageIndex].iframe !== 'undefined' ){
                        if( this.album[this.currentImageIndex].iframe.length && this.album[this.currentImageIndex].iframe !== 'link'){
                            var videoURL = this.album[this.currentImageIndex].iframe;
                            $('#cff-lightbox-wrapper').addClass('cff-has-iframe');

                            if( videoURL.indexOf("https://www.facebook.com/v2.3/plugins/video.php?") !=-1 ) $('#cff-lightbox-wrapper').addClass('cff-fb-player');

                            //If it's a swf then don't add the autoplay parameter. This is only for embedded videos like YouTube or Vimeo.
                            if( videoURL.indexOf(".swf") > -1 || videoURL.indexOf("&autoplay=1") !=-1 ){
                                var autoplayParam = '';
                            } else {
                                var autoplayParam = '?autoplay=1';
                            }

                            //Add a slight delay before adding the URL else it doesn't autoplay on Firefox
                            var vInt = setTimeout(function() {
                                $('#cff-lightbox-wrapper iframe').attr({
                                    'src' : videoURL + autoplayParam + "&mute=0"
                                });
                            }, 500);
                        }
                    }

                    //Check whether it's a thumbnail image that's currently being shown in the lightbox
                    var isThumbnail = false;
                    if( this.album[this.currentImageIndex].isthumbnail ) isThumbnail = true;

                    //Remove existing thumbs unless it's a thumbnail image which is being navigated through in which case keep the existing thumbnails
                    if( !isThumbnail ) $('.cff-lightbox-thumbs-holder').empty().removeClass('cff-animate');

                    //Change the link on the Facebook icon to be the link to the Facebook post only if it's the first image in the lightbox and one of the thumbs hasn't been clicked
                    if( this.album[this.currentImageIndex].link == $('.cff-lightbox-image').attr('src') ){
                        $('.cff-lightbox-facebook').attr('href', this.album[this.currentImageIndex].facebookurl);
                    }

                    //Show thumbs area if there are thumbs
                    if( this.album[this.currentImageIndex].showthumbs == 'true' ){
                        $('.cff-lightbox-thumbs').show();

                        //Get the post ID
                        var thisPostId = this.album[this.currentImageIndex].postid,
                            albumInfo = '',
                            albumThumbs = '',
                            albumsonly = false;
                        if( this.album[this.currentImageIndex].type == 'albumsonly' ) albumsonly = true;


                        if( typeof thumbsArr[thisPostId] !== 'undefined' ){

                            //load them in from array in local var
                            $.each(thumbsArr[thisPostId], function(i, thumb) {
                                var origCaption = thumb[5].replace(/"/g, '&quot;');

                                //Loop through the album array and find the imageindex of the item with this post ID. Then set the current image index to be this. Otherwise when going backwards through the lightbox the imageindex is set to be the current thumb index and then once i is added the index is too high.
                                var albumIndex = 0;
                                $.each(self.album, function(i, albumItem) {
                                    if( albumItem.postid == thisPostId ){
                                        albumIndex = i;
                                        //Once found the first match exit the loop
                                        return false;
                                    }
                                });

                                var lightboxImageOrder = (parseInt(albumIndex)+parseInt(i));

                                //If the small thumb isn't defined (like in regular posts) then use the full image instead
                                if( typeof thumb[8] == 'undefined' ) thumb[8] = thumb[0];

                                albumThumbs += '<a href="'+thumb[0]+'" class="cff-lightbox-attachment" data-cff-lightbox="cff-lightbox-1" data-facebook="'+thumb[3]+'" data-caption="'+thumb[4]+'" orig-caption="'+origCaption+'" data-page-name="'+thumb[6]+'" data-post-date="'+thumb[7]+'" data-cff-lightbox-order="'+lightboxImageOrder+'" lbcomments="true" data-thumbs="true" data-url="'+thumb[3]+'" data-iframe data-video ';

                                (albumsonly) ? albumThumbs += 'data-type="albumsonly" ' : albumThumbs += 'data-type ';
                                albumThumbs += 'data-cff-isthumbnail="true"><img src="'+thumb[8]+'" width="'+thumb[1]+'" height="'+thumb[2]+'" /></a>';

                                //Add all of the thumbs (apart from the first thumb) to the lightbox order
                                if( i > 0 ){
                                    cffInsertLightboxImage(lightboxImageOrder, thumb[0], thumb[4], thumb[3], thisPostId, albumsonly, true, thumb[6], thumb[7], thumb[8]);
                                }
                            });

                            //Add thumbs to the page
                            $('.cff-lightbox-thumbs-holder').html( '<div class="cff-lightbox-thumbs-wrap">' + albumThumbs + '</div>' ).addClass('cff-animate');
                            $('.cff-lightbox-wrapper').addClass('cff-has-thumbs');

                            //Liquidfill the thumbs
                            jQuery(".cff-lightbox-thumbs-holder a").imgLiquid({fill:true, useBackgroundSize:true});

                            //Hide the loader
                            $('.cff-loader').hide();
                            $('.cff-lightbox-thumbs-holder').css('min-height', 0);

                        } else {
                            //Use ajax to get them from Facebook API

                            //Set paths for thumbs.php
                            if (typeof cffsiteurl === 'undefined' || cffsiteurl == '') cffsiteurl = window.location.host + '/wp-content/plugins';

                            //Get the token from the shortcode
                            var $cffClosest = $('#cff_'+thisPostId).closest('.cff'),
                                cff_page_id = $('#cff_'+thisPostId).attr('data-page-id'),
                                shortcode_token_param = cffGetShortcodeToken( $cffClosest ),
                                useowntoken = '';
                            if( $cffClosest.attr('data-own-token') == 'true' ) useowntoken = '&useowntoken=true';

                            //AJAX
                            var cffAttachmentsUrl = cffsiteurl + "/custom-facebook-feed-pro/thumbs.php?id=" + thisPostId + '&pageid=' + cff_page_id + useowntoken + shortcode_token_param,
                                thumbsData = [];

                            //If this is an albums only item and the thumbs will
                            if( albumsonly ){
                                cffAttachmentsUrl = cffAttachmentsUrl + '&albumsonly=true';
                                var consentGiven = (typeof window.cff !== 'undefined' && typeof window.cff.feeds !== 'undefined') ? window.cff.feeds[0].settings.consentGiven : true;
                                if (consentGiven) {
                                    $('.cff-lightbox-thumbs-holder').css('min-height', 45).after('<div class="cff-loader"></div>');
                                }
                            }

                            //If it's a group album then add the absolute path so we can get the User Access Token from the DB
                            var cffgroupalbums = this.album[this.currentImageIndex].cffgroupalbums;
                            if( cffgroupalbums ) cffAttachmentsUrl = cffAttachmentsUrl + '&usegrouptoken=' + cffgroupalbums;

                            var submitData = {
                                action: 'cff_thumbs',
                                id: thisPostId,
                                pageid: cff_page_id,
                            };
                            if( shortcode_token_param !== '' ){
                                var token = shortcode_token_param.split('=');
                                submitData.at = token[1];
                            }
                            if( $cffClosest.attr('data-own-token') == 'true' ) {
                                submitData.useowntoken = true;
                            }
                            if( cffgroupalbums ){
                                submitData.usegrouptoken = cffgroupalbums;
                            }
                            if( albumsonly ){
                                submitData.albumsonly = true;
                            }

                            var onSuccess = function(data) {
                                //Convert string of data received from thumbs.php to a JSON object
                                data = JSON.parse( data );

                                if(albumsonly){
                                    //Compile the thumbs
                                    $.each(data.data, function(i, photoItem) {
                                        var dataCaption = '';
                                        if( photoItem.name ) dataCaption = photoItem.name;
                                        // origCaption = String(origCaption).replace(/"/g, '&quot;');

                                        //Format the caption and add links
                                        dataCaption = cffLinkify(dataCaption);
                                        dataCaption = dataCaption.replace( hashRegex , cffReplaceHashtags );

                                        // dataCaption = dataCaption.replace( tagRegex , cffReplaceTags ); - causes an issue with email address linking
                                        dataCaption = String(dataCaption).replace(/& /g, '&amp; ').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, "<br/>");

                                        origCaption = String(origCaption).replace(/& /g, '&amp; ').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, "<br/>");

                                        var lightboxImageOrder = (parseInt(self.currentImageIndex)+parseInt(i));

                                        //If it's a group then use the source otherwise it displays as question marks
                                        var cffThumbHref = photoItem.source,
                                            cffPhotoItemWidth = photoItem.width,
                                            cffPhotoItemHeight = photoItem.height;

                                        //Use the full size image if available
                                        if( typeof photoItem.images[0] !== 'undefined' ){
                                            cffThumbHref = photoItem.images[0].source;
                                            cffPhotoItemWidth = photoItem.images[0].width;
                                            cffPhotoItemHeight = photoItem.images[0].height;
                                        }

                                        //Set the thumbnail image to be the smallest size available, which is the second from last in images arr
                                        if( typeof photoItem.images[ photoItem.images.length-2 ] !== 'undefined' ){
                                            var cffThumbImg = photoItem.images[ photoItem.images.length-2 ].source;
                                        } else {
                                            var cffThumbImg = cffThumbHref;
                                        }

                                        albumThumbs += '<a href="'+cffThumbHref+'" class="cff-lightbox-attachment" data-facebook="http://facebook.com/'+photoItem.id+'" data-caption="'+dataCaption+'" orig-caption="'+origCaption+'" data-cff-lightbox-order="'+lightboxImageOrder+'" data-thumbs="true" data-url="http://facebook.com/'+photoItem.id+'" data-iframe data-video data-type="albumsonly" data-cff-isthumbnail="true"><img src="'+cffThumbImg+'" lbcomments="false" width="'+cffPhotoItemWidth+'" height="'+cffPhotoItemHeight+'" /></a>';

                                        thumbsData.push([cffThumbHref, cffPhotoItemWidth, cffPhotoItemHeight, 'http://facebook.com/'+photoItem.id, dataCaption, origCaption, undefined, undefined, cffThumbImg]);

                                        //Add all of the thumbs (apart from the first thumb) to the lightbox order
                                        if( i > 0 ){
                                            cffInsertLightboxImage(lightboxImageOrder, cffThumbHref, dataCaption, 'http://facebook.com/'+photoItem.id, thisPostId, albumsonly, true, cffThumbImg);
                                        }

                                    }); //End each

                                } else {
                                    //Check whether there's data..
                                    if (typeof data.attachments !== 'undefined') {

                                        //..Then compile the thumbs
                                        $.each(data.attachments.data[0].subattachments.data, function(i, subattachment) {
                                            var dataCaption = '';
                                            if( subattachment.description ) dataCaption = subattachment.description;
                                            origCaption = String(origCaption).replace(/"/g, '&quot;');

                                            //Format the caption and add links
                                            dataCaption = cffLinkify(dataCaption);
                                            dataCaption = dataCaption.replace( hashRegex , cffReplaceHashtags );
                                            // dataCaption = dataCaption.replace( tagRegex , cffReplaceTags ); - causes an issue with email address linking
                                            dataCaption = String(dataCaption).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, "<br/>");

                                            var lightboxImageOrder = (parseInt(self.currentImageIndex)+parseInt(i));

                                            albumThumbs += '<a href="'+subattachment.media.image.src+'" class="cff-lightbox-attachment" data-facebook="'+subattachment.url+'" data-caption="'+dataCaption+'" orig-caption="'+origCaption+'" lbcomments="true" data-page-name="'+author_name+'" data-post-date="'+date_in_correct_format+'" data-cff-lightbox-order="'+lightboxImageOrder+'" data-thumbs="true" data-url="'+subattachment.url+'" data-iframe data-video data-type data-cff-isthumbnail="true"><img src="'+subattachment.media.image.src+'" width="'+subattachment.media.image.width+'" height="'+subattachment.media.image.height+'" /></a>';

                                            thumbsData.push([subattachment.media.image.src, subattachment.media.image.width, subattachment.media.image.height, subattachment.url, dataCaption, origCaption, author_name, date_in_correct_format]);

                                            //Add all of the thumbs (apart from the first thumb) to the lightbox order
                                            if( i > 0 ){
                                                cffInsertLightboxImage(lightboxImageOrder, subattachment.media.image.src, dataCaption, subattachment.url, thisPostId, albumsonly, true, author_name, date_in_correct_format, subattachment.media.image.src);
                                            }

                                        });

                                    } //End undefined check

                                } //End if/else

                                //Add thumbs to the page
                                if( albumThumbs.length > 0 ){
                                    $('.cff-lightbox-thumbs-holder').html( '<div class="cff-lightbox-thumbs-wrap">' + albumThumbs + '</div>' ).addClass('cff-animate');
                                    $('.cff-lightbox-wrapper').addClass('cff-has-thumbs');
                                }

                                //Liquidfill the thumbs
                                jQuery(".cff-lightbox-thumbs-holder .cff-lightbox-attachment").imgLiquid({fill:true, useBackgroundSize:true});

                                //Hide the loader
                                $('.cff-loader').hide();

                                $('.cff-lightbox-thumbs-holder').css('min-height', 0);

                                //Add the thumbs to the thumbs array to store them
                                thumbsArr[ thisPostId ] = thumbsData;

                                //album done loading, can change items now
                                if (albumsonly) {
                                    jQuery('.cff-lightbox-container').removeClass('cff-album-loading');
                                    jQuery('.cff-lightbox-prev, .cff-lightbox-next').show();
                                }
                            }; // end success
                            $('.cff-gdpr-more-link').remove();
                            if (window.cff.feeds[ this.album[this.currentImageIndex].feedIndex ].settings.consentGiven) {
                                // disable navigation while albums load
                                if (albumsonly) {
                                    jQuery('.cff-lightbox-container').addClass('cff-album-loading');
                                    jQuery('.cff-lightbox-prev, .cff-lightbox-next').hide();
                                }
                                cffAjax(submitData,onSuccess);
                            } else {
                                if (parseInt(this.album[this.currentImageIndex].count) > 0) {
                                    $('.cff-lightbox-facebook').after('<a href="' + $('.cff-lightbox-facebook').attr('href') + '"  class="cff-gdpr-more-link cff-lightbox-attachment"><div class="cff-gdpr-overlay"></div><span>+' + this.album[this.currentImageIndex].count + '</span><img src="'+jQuery('.cff-lightbox-image').attr('src')+'"></a>');
                                    $('.cff-gdpr-more-link').imgLiquid({fill:true, useBackgroundSize:true});
                                    setTimeout(function () {
                                        $('.cff-gdpr-more-link span').css({
                                            'margin-top': '-' + ($('.cff-gdpr-more-link span').height() / 2) + 'px',
                                            'margin-right': '-' + ($('.cff-gdpr-more-link span').width() / 2) + 'px',
                                            'display': 'block'
                                        });
                                    }, 200);
                                }
                            }

                        } //End if/else

                    } else {
                        //If there are no thumbs then hide the thumbs area
                        $('.cff-lightbox-thumbs').hide();
                    }

                    //Add a class to the selected thumb
                    $(".cff-lightbox-attachment").removeClass('cff-selected');
                    $(".cff-lightbox-attachment[href='"+$('.cff-lightbox-image').attr('src')+"']").addClass('cff-selected');


                    function cffInsertLightboxImage(currentImageIndex, link, title, facebookurl, postid, albumsonly, isThumbnail, cffThumbImg){

                        //Make sure the thumbs aren't added to the lightbox order more than once
                        var found = false;
                        $.each(self.album, function(i, thumbitem) {
                            if( ( thumbitem.link == link ) && ( thumbitem.postid == postid ) ){
                                found = true;
                                return;
                            }
                        });
                        if(found == true) return;

                        ( albumsonly ) ? postType = 'albumsonly' : postType = '';
                        ( albumsonly ) ? lbcomments = 'false' : lbcomments = 'true';

                        //Push the image into the album array at the correct location so it's included in the lightbox order
                        self.album.splice(currentImageIndex, 0, {
                            link: link,
                            title: title,
                            postid: postid,
                            showthumbs: 'true',
                            facebookurl: facebookurl,
                            video: '',
                            iframe: '',
                            type: postType,
                            cffgroupalbums: undefined,
                            isthumbnail: isThumbnail,
                            lbcomments: lbcomments,
                            thumbimg: cffThumbImg
                        });

                    } //End cffInsertLightboxImage()

                    /** END NEW PHOTO ACTION **/


                    //Still show the caption section even if there's not a caption as it contains the View on Facebook link
                    this.$lightbox.find('.cff-lightbox-caption').fadeIn('fast');


                    // Enable anchor clicks in the injected caption html.
                    if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {

                        //If it's the first image in the lightbox then set the caption to be the text from the post. For all subsequent images the caption is changed on the fly based elsehwere in the code based on an attr from the thumb that's clicked
                        var origCaption = this.album[this.currentImageIndex].title;
                        //Add hashtag and tag links
                        // origCaption = cffLinkify(origCaption); - Caused issues with @tag links in regular lightbox popup
                        origCaption = origCaption.replace( hashRegex , cffReplaceHashtags );
                        // origCaption = origCaption.replace( tagRegex , cffReplaceTags ); - causes an issue with email address linking
                        //Decode the caption back so that the tags are rendered as HTML:
                        origCaption = String(origCaption).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');

                        var $lightboxCaption = this.$lightbox.find('.cff-lightbox-caption'),
                            $lightboxCaptionText = $lightboxCaption.find('.cff-lightbox-caption-text');
                        if( this.album[this.currentImageIndex].link == $('.cff-lightbox-image').attr('src') ) $lightboxCaptionText.html( origCaption );

                        //If there's no caption then remove the border and margin from the View on Facebook link
                        if( $lightboxCaptionText.text() == ' ' || $lightboxCaptionText.text() == '' ){
                            $lightboxCaption.addClass('cff-no-caption');
                        } else {
                            $lightboxCaption.removeClass('cff-no-caption');
                        }

                    } else {
                        if(albumsonly || this.album[this.currentImageIndex].title === undefined) this.$lightbox.find('.cff-lightbox-caption-text').html('');

                        //If there's no caption then add a class
                        if( this.$lightbox.find('.cff-lightbox-caption .cff-lightbox-caption-text').text().length < 1 ) this.$lightbox.find('.cff-lightbox-caption').addClass('cff-no-caption').find('.cff-lightbox-caption-text').html('');
                    }

                    this.$lightbox.find('.cff-lightbox-facebook, .cff-lightbox-caption-text a, .cff-lightbox-sidebar a:not(.cff-comment-replies-a), .cff_gdpr_notice, .cff-gdpr-more-link').off('click').on('click', function(event){
                            window.open(
                                $(this).attr('href'),
                                '_blank'
                            )
                        }
                    );

                    if (this.album.length > 1 && this.options.showImageNumberLabel) {
                        this.$lightbox.find('.cff-lightbox-number').text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn('fast');
                    } else {
                        this.$lightbox.find('.cff-lightbox-number').hide();
                    }

                    if (typeof cffLightboxAction === 'function') {
                        setTimeout(function() {
                            cffLightboxAction();
                        },100);
                    }

                    this.$outerContainer.removeClass('animating');

                    this.$lightbox.find('.cff-lightbox-dataContainer').fadeIn(this.options.resizeDuration, function() {
                        return self.sizeOverlay();
                    });

                }; //End Lightbox.prototype.updateDetails

                // Preload previous and next images in set.
                Lightbox.prototype.preloadNeighboringImages = function() {
                    if (this.album.length > this.currentImageIndex + 1) {
                        var preloadNext = new Image();
                        preloadNext.src = this.album[this.currentImageIndex + 1].link;
                    }
                    if (this.currentImageIndex > 0) {
                        var preloadPrev = new Image();
                        preloadPrev.src = this.album[this.currentImageIndex - 1].link;
                    }
                };

                Lightbox.prototype.enableKeyboardNav = function() {
                    $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
                };

                Lightbox.prototype.disableKeyboardNav = function() {
                    $(document).off('.keyboard');
                };

                Lightbox.prototype.keyboardAction = function(event) {
                    var KEYCODE_ESC        = 27;
                    var KEYCODE_LEFTARROW  = 37;
                    var KEYCODE_RIGHTARROW = 39;

                    var keycode = event.keyCode;
                    var key     = String.fromCharCode(keycode).toLowerCase();
                    if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');

                        this.end();
                    } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                        if (jQuery('.cff-lightbox-container').hasClass('cff-album-loading')) {
                            // disable navigation while albums load
                            return;
                        }
                        if (this.currentImageIndex !== 0) {
                            this.changeImage(this.currentImageIndex - 1);
                        } else if (this.options.wrapAround && this.album.length > 1) {
                            this.changeImage(this.album.length - 1);
                        }

                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');

                    } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                        if (jQuery('.cff-lightbox-container').hasClass('cff-album-loading')) {
                            // disable navigation while albums load
                            return;
                        }
                        if (this.currentImageIndex !== this.album.length - 1) {
                            this.changeImage(this.currentImageIndex + 1);
                        } else if (this.options.wrapAround && this.album.length > 1) {
                            this.changeImage(0);
                        }

                        if( cff_supports_video() ) $('#cff-lightbox-wrapper video.cff-lightbox-video')[0].pause();
                        $('#cff-lightbox-wrapper iframe').attr('src', '');

                    }
                };

                // Closing time
                Lightbox.prototype.end = function() {
                    this.disableKeyboardNav();
                    $(window).off("resize", this.sizeOverlay);
                    this.$lightbox.fadeOut(this.options.fadeDuration);
                    this.$overlay.fadeOut(this.options.fadeDuration);
                    $('select, object, embed').css({
                        visibility: "visible"
                    });
                };

                return Lightbox;

            })(); //End Lightbox = (function()

            $(function() {
                var options  = new LightboxOptions();
                var lightbox = new Lightbox(options);
            });

        }).call(this); //End (function() {

        //Checks whether browser support HTML5 video element
        function cff_supports_video() {
            return !!document.createElement('video').canPlayType;
        }


    } //End cffLightbox function

//Only call the lightbox if the class is on at least one feed on the page
    if( jQuery('#cff.cff-lb').length ) cffLightbox();



} //End cff_js_exists check