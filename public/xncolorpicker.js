!function() {
    "use strict";
    var n = {
        "./node_modules/css-loader/dist/runtime/api.js": /*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
        function(e) {
            e.exports = function(n) {
                var l = [];
                return l.toString = function() {
                    return this.map(function(e) {
                        var t = n(e);
                        return e[2] ? "@media ".concat(e[2], " {").concat(t, "}") : t
                    }).join("")
                }
                ,
                l.i = function(e, t, n) {
                    "string" == typeof e && (e = [[null, e, ""]]);
                    var r = {};
                    if (n)
                        for (var o = 0; o < this.length; o++) {
                            var i = this[o][0];
                            null != i && (r[i] = !0)
                        }
                    for (var a = 0; a < e.length; a++) {
                        var s = [].concat(e[a]);
                        n && r[s[0]] || (t && (s[2] ? s[2] = "".concat(t, " and ").concat(s[2]) : s[2] = t),
                        l.push(s))
                    }
                }
                ,
                l
            }
        },
        "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js": /*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
        function(e) {
            function o(e, t) {
                return function(e) {
                    if (Array.isArray(e))
                        return e
                }(e) || function(e, t) {
                    if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                        return;
                    var n = []
                      , r = !0
                      , o = !1
                      , i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value),
                        !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        o = !0,
                        i = e
                    } finally {
                        try {
                            r || null == s.return || s.return()
                        } finally {
                            if (o)
                                throw i
                        }
                    }
                    return n
                }(e, t) || function(e, t) {
                    if (!e)
                        return;
                    if ("string" == typeof e)
                        return r(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === n && e.constructor && (n = e.constructor.name);
                    if ("Map" === n || "Set" === n)
                        return Array.from(e);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return r(e, t)
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }
            function r(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++)
                    r[n] = e[n];
                return r
            }
            e.exports = function(e) {
                var t = o(e, 4)
                  , n = t[1]
                  , r = t[3];
                if ("function" != typeof btoa)
                    return [n].join("\n");
                e = btoa(unescape(encodeURIComponent(JSON.stringify(r)))),
                t = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e),
                e = "/*# ".concat(t, " */"),
                t = r.sources.map(function(e) {
                    return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e, " */")
                });
                return [n].concat(t).concat([e]).join("\n")
            }
        },
        "./node_modules/css-loader/dist/runtime/getUrl.js": /*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
        function(e) {
            e.exports = function(e, t) {
                return t = t || {},
                "string" != typeof (e = e && e.__esModule ? e.default : e) ? e : (/^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
                t.hash && (e += t.hash),
                /["'() \t\n]/.test(e) || t.needQuotes ? '"'.concat(e.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : e)
            }
        },
        "./src/colorFormat.min.js": /*!********************************!*\
  !*** ./src/colorFormat.min.js ***!
  \********************************/
        function(n, r, o) {
            var i;
            !function() {
                function e(e) {
                    return new t(e)
                }
                var t = function(e) {
                    var t, n = e && e.color && e.color.replace(/\s/g, "").toLowerCase() || "#f00", r = e && e.format && e.format.replace(/\s/g, "").toLowerCase() || "rgb", o = -1 == r.indexOf("rgba") ? 0 : 1, e = -1 == r.indexOf("hsla") ? 0 : 1;
                    if (-1 < n.indexOf("#"))
                        "hex" == r ? (t = this.hexToRgb(n),
                        t = this.rgbToHex(t)) : -1 < r.indexOf("rgb") ? t = this.hexToRgb(n, o) : -1 < r.indexOf("hsl") && (t = this.hexToRgb(n),
                        t = this.rgbToHsl(t, e));
                    else if (-1 < n.indexOf("rgb"))
                        t = this.getRgb(n, o),
                        "hex" == r ? t = this.rgbToHex(t) : -1 < r.indexOf("hsl") && (t = this.rgbToHsl(t, e));
                    else if (-1 < n.indexOf("hsl"))
                        t = this.getHsl(n, e),
                        t = this.hslToRgb(t, o),
                        "hex" == r ? t = this.rgbToHex(t) : -1 < r.indexOf("hsl") && (t = this.rgbToHsl(t, e));
                    else {
                        for (var i, a = this.defineColor, s = 0, l = a.length; s < l; s++)
                            if (n == a[s].name) {
                                i = a[s].hex;
                                break
                            }
                        if (!(i && 0 < i.length))
                            return !1;
                        "hex" == r ? (t = this.hexToRgb(i),
                        t = this.rgbToHex(t)) : -1 < r.indexOf("rgb") ? t = this.hexToRgb(i, o) : -1 < r.indexOf("hsl") && (t = this.hexToRgb(i),
                        t = this.rgbToHsl(t, e))
                    }
                    return t
                };
                t.prototype = {
                    constructor: this,
                    defineColor: [{
                        name: "red",
                        hex: "#f00"
                    }, {
                        name: "orange",
                        hex: "#ffa500"
                    }, {
                        name: "yellow",
                        hex: "#ff0"
                    }, {
                        name: "green",
                        hex: "#0f0"
                    }, {
                        name: "cyan",
                        hex: "#0ff"
                    }, {
                        name: "blue",
                        hex: "#00f"
                    }, {
                        name: "violet",
                        hex: "#ee82ee"
                    }, {
                        name: "black",
                        hex: "#000"
                    }, {
                        name: "white",
                        hex: "#fff"
                    }],
                    getRgb: function(e, t) {
                        var n = -1 == (e = e.toLowerCase()).indexOf("rgba") ? 0 : 1;
                        e = (e = n ? e.replace("rgba", "") : e.replace("rgb", "")).replace(/\s/g, "").split(",");
                        var r = Number(e[0].slice(1))
                          , o = Number(e[1])
                          , i = n ? Number(e[2]) : Number(e[2].slice(0, -1));
                        return {
                            r: r,
                            g: o,
                            b: i,
                            o: e = !n || 1 < Number(e[3].slice(0, -1)) ? 1 : Number(e[3].slice(0, -1)),
                            complete: t ? "rgba(" + [r, o, i, e].join(",") + ")" : "rgb(" + [r, o, i].join(",") + ")"
                        }
                    },
                    getHsl: function(e, t) {
                        var n = -1 == (e = e.toLowerCase()).indexOf("hsla") ? 0 : 1;
                        e = (e = n ? e.replace("hsla", "") : e.replace("hsl", "")).replace(/\s/g, "").split(",");
                        var r = Number(e[0].slice(1))
                          , o = parseInt(e[1])
                          , i = n ? parseInt(e[2]) : parseInt(e[2].slice(0, -1));
                        return {
                            h: r,
                            s: o / 100,
                            l: i / 100,
                            o: e = !n || 1 < Number(e[3].slice(0, -1)) ? 1 : Number(e[3].slice(0, -1)),
                            complete: t ? "hsla(" + [r, o, i, e].join(",") + ")" : "hsl(" + [r, o, i].join(",") + ")"
                        }
                    },
                    rgbToHex: function(e) {
                        var t = Number(e.r).toString(16)
                          , n = Number(e.g).toString(16)
                          , r = Number(e.b).toString(16)
                          , o = Math.round(255 * e.o).toString(16);
                        return t.length < 2 && (t = 0 + t),
                        n.length < 2 && (n = 0 + n),
                        r.length < 2 && (r = 0 + r),
                        o.length < 2 && (o = 0 + o),
                        t[0] == t[1] && n[0] == n[1] && r[0] == r[1] && (o[0],
                        o[1]),
                        {
                            r: t,
                            g: n,
                            b: r,
                            o: o,
                            complete: "#" + (t + n + r + (1 == e.o ? "" : o))
                        }
                    },
                    rgbToHsl: function(e, t) {
                        var n, r = Number(e.r) / 255, o = Number(e.g) / 255, i = Number(e.b) / 255, a = Number(e.o), s = Math.max(r, o, i), l = Math.min(r, o, i), e = (s + l) / 2;
                        if (s == l)
                            n = d = 0;
                        else {
                            var c = s - l
                              , d = e < .5 ? c / (s + l) : c / (2 - s - l);
                            switch (s) {
                            case r:
                                n = (o - i) / c;
                                break;
                            case o:
                                n = (i - r) / c + 2;
                                break;
                            case i:
                                n = (r - o) / c + 4
                            }
                            n = (n *= 60) < 0 ? n + 360 : n
                        }
                        return {
                            h: n = Math.round(n),
                            s: d = Math.round(100 * d) + "%",
                            l: e = Math.round(100 * e) + "%",
                            o: a,
                            complete: t ? "hsla(" + [n, d, e, a].join(",") + ")" : "hsl(" + [n, d, e].join(",") + ")"
                        }
                    },
                    hexToRgb: function(e, t) {
                        var n, r, o, i, a = (e = e.replace("#", "")).split("");
                        return 3 == e.length ? (n = parseInt(a[0] + a[0], 16),
                        r = parseInt(a[1] + a[1], 16),
                        o = parseInt(a[2] + a[2], 16),
                        i = 1) : 4 == e.length ? (n = parseInt(a[0] + a[0], 16),
                        r = parseInt(a[1] + a[1], 16),
                        o = parseInt(a[2] + a[2], 16),
                        i = Math.round(parseInt(a[3] + a[3], 16) / 255 * 100) / 100) : 6 == e.length ? (n = parseInt(a[0] + a[1], 16),
                        r = parseInt(a[2] + a[3], 16),
                        o = parseInt(a[4] + a[5], 16),
                        i = 1) : 8 == e.length && (n = parseInt(a[0] + a[1], 16),
                        r = parseInt(a[2] + a[3], 16),
                        o = parseInt(a[4] + a[5], 16),
                        i = Math.round(parseInt(a[6] + a[7], 16) / 255 * 100) / 100),
                        {
                            r: n,
                            g: r,
                            b: o,
                            o: i,
                            complete: t ? "rgba(" + [n, r, o, i].join(",") + ")" : "rgb(" + [n, r, o].join(",") + ")"
                        }
                    },
                    hslToRgb: function(e, t) {
                        var n, r, o, i = Number(e.h), a = Number(e.s), s = Number(e.l), l = Number(e.o);
                        return 0 == a ? n = r = o = s : (n = (e = function(e, t, n) {
                            return n < 0 && (n += 1),
                            1 < n && --n,
                            n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
                        }
                        )(a = 2 * s - (s = s < .5 ? s * (1 + a) : s + a - s * a), s, (i /= 360) + 1 / 3),
                        r = e(a, s, i),
                        o = e(a, s, i - 1 / 3)),
                        {
                            r: n = Math.round(255 * n),
                            g: r = Math.round(255 * r),
                            b: o = Math.round(255 * o),
                            o: l,
                            complete: t ? "rgba(" + [n, r, o, l].join(",") + ")" : "rgb(" + [n, r, o].join(",") + ")"
                        }
                    }
                },
                function() {
                    this || (0,
                    eval)("this")
                }(),
                n.exports ? n.exports = e : void 0 === (i = function() {
                    return e
                }
                .call(r, o, r, n)) || (n.exports = i)
            }()
        },
        "./src/jquery.min.js": /*!***************************!*\
  !*** ./src/jquery.min.js ***!
  \***************************/
        function(tn, nn, e) {
            var rn;
            tn = e.nmd(tn);
            var t, on = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ;
            /*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
            e = "undefined" != typeof window ? window : void 0,
            t = function(h, e) {
                function t(e, t) {
                    return t.toUpperCase()
                }
                var u = []
                  , d = u.slice
                  , g = u.concat
                  , s = u.push
                  , o = u.indexOf
                  , n = {}
                  , r = n.toString
                  , m = n.hasOwnProperty
                  , A = {}
                  , C = function e(t, n) {
                    return new e.fn.init(t,n)
                }
                  , i = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
                  , a = /^-ms-/
                  , l = /-([\da-z])/gi;
                function c(e) {
                    var t = "length"in e && e.length
                      , n = C.type(e);
                    return "function" !== n && !C.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e))
                }
                C.fn = C.prototype = {
                    jquery: "1.11.3",
                    constructor: C,
                    selector: "",
                    length: 0,
                    toArray: function() {
                        return d.call(this)
                    },
                    get: function(e) {
                        return null != e ? e < 0 ? this[e + this.length] : this[e] : d.call(this)
                    },
                    pushStack: function(e) {
                        e = C.merge(this.constructor(), e);
                        return e.prevObject = this,
                        e.context = this.context,
                        e
                    },
                    each: function(e, t) {
                        return C.each(this, e, t)
                    },
                    map: function(n) {
                        return this.pushStack(C.map(this, function(e, t) {
                            return n.call(e, t, e)
                        }))
                    },
                    slice: function() {
                        return this.pushStack(d.apply(this, arguments))
                    },
                    first: function() {
                        return this.eq(0)
                    },
                    last: function() {
                        return this.eq(-1)
                    },
                    eq: function(e) {
                        var t = this.length
                          , e = +e + (e < 0 ? t : 0);
                        return this.pushStack(0 <= e && e < t ? [this[e]] : [])
                    },
                    end: function() {
                        return this.prevObject || this.constructor(null)
                    },
                    push: s,
                    sort: u.sort,
                    splice: u.splice
                },
                C.extend = C.fn.extend = function() {
                    var e, t, n, r, o, i = arguments[0] || {}, a = 1, s = arguments.length, l = !1;
                    for ("boolean" == typeof i && (l = i,
                    i = arguments[a] || {},
                    a++),
                    "object" == (void 0 === i ? "undefined" : on(i)) || C.isFunction(i) || (i = {}),
                    a === s && (i = this,
                    a--); a < s; a++)
                        if (null != (r = arguments[a]))
                            for (n in r)
                                o = i[n],
                                i !== (t = r[n]) && (l && t && (C.isPlainObject(t) || (e = C.isArray(t))) ? (o = e ? (e = !1,
                                o && C.isArray(o) ? o : []) : o && C.isPlainObject(o) ? o : {},
                                i[n] = C.extend(l, o, t)) : void 0 !== t && (i[n] = t));
                    return i
                }
                ,
                C.extend({
                    expando: "jQuery" + ("1.11.3" + Math.random()).replace(/\D/g, ""),
                    isReady: !0,
                    error: function(e) {
                        throw new Error(e)
                    },
                    noop: function() {},
                    isFunction: function(e) {
                        return "function" === C.type(e)
                    },
                    isArray: Array.isArray || function(e) {
                        return "array" === C.type(e)
                    }
                    ,
                    isWindow: function(e) {
                        return null != e && e == e.window
                    },
                    isNumeric: function(e) {
                        return !C.isArray(e) && 0 <= e - parseFloat(e) + 1
                    },
                    isEmptyObject: function(e) {
                        for (var t in e)
                            return !1;
                        return !0
                    },
                    isPlainObject: function(e) {
                        if (!e || "object" !== C.type(e) || e.nodeType || C.isWindow(e))
                            return !1;
                        try {
                            if (e.constructor && !m.call(e, "constructor") && !m.call(e.constructor.prototype, "isPrototypeOf"))
                                return !1
                        } catch (e) {
                            return !1
                        }
                        if (A.ownLast)
                            for (var t in e)
                                return m.call(e, t);
                        for (t in e)
                            ;
                        return void 0 === t || m.call(e, t)
                    },
                    type: function(e) {
                        return null == e ? e + "" : "object" == (void 0 === e ? "undefined" : on(e)) || "function" == typeof e ? n[r.call(e)] || "object" : void 0 === e ? "undefined" : on(e)
                    },
                    globalEval: function(e) {
                        e && C.trim(e) && (h.execScript || function(e) {
                            h.eval.call(h, e)
                        }
                        )(e)
                    },
                    camelCase: function(e) {
                        return e.replace(a, "ms-").replace(l, t)
                    },
                    nodeName: function(e, t) {
                        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                    },
                    each: function(e, t, n) {
                        var r = 0
                          , o = e.length
                          , i = c(e);
                        if (n) {
                            if (i)
                                for (; r < o && !1 !== t.apply(e[r], n); r++)
                                    ;
                            else
                                for (r in e)
                                    if (!1 === t.apply(e[r], n))
                                        break
                        } else if (i)
                            for (; r < o && !1 !== t.call(e[r], r, e[r]); r++)
                                ;
                        else
                            for (r in e)
                                if (!1 === t.call(e[r], r, e[r]))
                                    break;
                        return e
                    },
                    trim: function(e) {
                        return null == e ? "" : (e + "").replace(i, "")
                    },
                    makeArray: function(e, t) {
                        t = t || [];
                        return null != e && (c(Object(e)) ? C.merge(t, "string" == typeof e ? [e] : e) : s.call(t, e)),
                        t
                    },
                    inArray: function(e, t, n) {
                        var r;
                        if (t) {
                            if (o)
                                return o.call(t, e, n);
                            for (r = t.length,
                            n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
                                if (n in t && t[n] === e)
                                    return n
                        }
                        return -1
                    },
                    merge: function(e, t) {
                        for (var n = +t.length, r = 0, o = e.length; r < n; )
                            e[o++] = t[r++];
                        if (n != n)
                            for (; void 0 !== t[r]; )
                                e[o++] = t[r++];
                        return e.length = o,
                        e
                    },
                    grep: function(e, t, n) {
                        for (var r = [], o = 0, i = e.length, a = !n; o < i; o++)
                            !t(e[o], o) != a && r.push(e[o]);
                        return r
                    },
                    map: function(e, t, n) {
                        var r, o = 0, i = e.length, a = [];
                        if (c(e))
                            for (; o < i; o++)
                                null != (r = t(e[o], o, n)) && a.push(r);
                        else
                            for (o in e)
                                null != (r = t(e[o], o, n)) && a.push(r);
                        return g.apply([], a)
                    },
                    guid: 1,
                    proxy: function(e, t) {
                        var n, r;
                        return "string" == typeof t && (r = e[t],
                        t = e,
                        e = r),
                        C.isFunction(e) ? (n = d.call(arguments, 2),
                        (r = function() {
                            return e.apply(t || this, n.concat(d.call(arguments)))
                        }
                        ).guid = e.guid = e.guid || C.guid++,
                        r) : void 0
                    },
                    now: function() {
                        return +new Date
                    },
                    support: A
                }),
                C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
                    n["[object " + t + "]"] = t.toLowerCase()
                });
                var p = function(n) {
                    function u(e, t, n) {
                        var r = "0x" + t - 65536;
                        return r != r || n ? t : r < 0 ? String.fromCharCode(65536 + r) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    }
                    function t() {
                        m()
                    }
                    var e, f, b, i, r, h, p, g, C, c, d, m, x, o, A, v, a, s, y, B = "sizzle" + +new Date, w = n.document, k = 0, I = 0, l = ie(), T = ie(), S = ie(), E = function(e, t) {
                        return e === t && (d = !0),
                        0
                    }, N = {}.hasOwnProperty, j = [], D = j.pop, L = j.push, F = j.push, H = j.slice, O = function(e, t) {
                        for (var n = 0, r = e.length; n < r; n++)
                            if (e[n] === t)
                                return n;
                        return -1
                    }, M = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", q = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", W = R.replace("w", "w#"), z = "\\[" + q + "*(" + R + ")(?:" + q + "*([*^$|!~]?=)" + q + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + W + "))|)" + q + "*\\]", _ = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + z + ")*)|.*)\\)|)", P = new RegExp(q + "+","g"), U = new RegExp("^" + q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + q + "+$","g"), X = new RegExp("^" + q + "*," + q + "*"), $ = new RegExp("^" + q + "*([>+~]|" + q + ")" + q + "*"), G = new RegExp("=" + q + "*([^\\]'\"]*?)" + q + "*\\]","g"), Y = new RegExp(_), V = new RegExp("^" + W + "$"), Q = {
                        ID: new RegExp("^#(" + R + ")"),
                        CLASS: new RegExp("^\\.(" + R + ")"),
                        TAG: new RegExp("^(" + R.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + z),
                        PSEUDO: new RegExp("^" + _),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + q + "*(even|odd|(([+-]|)(\\d*)n|)" + q + "*(?:([+-]|)" + q + "*(\\d+)|))" + q + "*\\)|)","i"),
                        bool: new RegExp("^(?:" + M + ")$","i"),
                        needsContext: new RegExp("^" + q + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + q + "*((?:-\\d)?\\d*)" + q + "*\\)|)(?=[^-]|$)","i")
                    }, K = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, Z = /^[^{]+\{\s*\[native \w/, ee = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, te = /[+~]/, ne = /'|\\/g, re = new RegExp("\\\\([\\da-f]{1,6}" + q + "?|(" + q + ")|.)","ig");
                    try {
                        F.apply(j = H.call(w.childNodes), w.childNodes),
                        j[w.childNodes.length].nodeType
                    } catch (e) {
                        F = {
                            apply: j.length ? function(e, t) {
                                L.apply(e, H.call(t))
                            }
                            : function(e, t) {
                                for (var n = e.length, r = 0; e[n++] = t[r++]; )
                                    ;
                                e.length = n - 1
                            }
                        }
                    }
                    function oe(e, t, n, r) {
                        var o, i, a, s, l, c, d, u, p;
                        if ((t ? t.ownerDocument || t : w) !== x && m(t),
                        n = n || [],
                        a = (t = t || x).nodeType,
                        "string" != typeof e || !e || 1 !== a && 9 !== a && 11 !== a)
                            return n;
                        if (!r && A) {
                            if (11 !== a && (o = ee.exec(e)))
                                if (c = o[1]) {
                                    if (9 === a) {
                                        if (!(i = t.getElementById(c)) || !i.parentNode)
                                            return n;
                                        if (i.id === c)
                                            return n.push(i),
                                            n
                                    } else if (t.ownerDocument && (i = t.ownerDocument.getElementById(c)) && y(t, i) && i.id === c)
                                        return n.push(i),
                                        n
                                } else {
                                    if (o[2])
                                        return F.apply(n, t.getElementsByTagName(e)),
                                        n;
                                    if ((c = o[3]) && f.getElementsByClassName)
                                        return F.apply(n, t.getElementsByClassName(c)),
                                        n
                                }
                            if (f.qsa && (!v || !v.test(e))) {
                                if (d = c = B,
                                u = t,
                                p = 1 !== a && e,
                                1 === a && "object" !== t.nodeName.toLowerCase()) {
                                    for (l = h(e),
                                    (c = t.getAttribute("id")) ? d = c.replace(ne, "\\$&") : t.setAttribute("id", d),
                                    d = "[id='" + d + "'] ",
                                    s = l.length; s--; )
                                        l[s] = d + fe(l[s]);
                                    u = te.test(e) && ue(t.parentNode) || t,
                                    p = l.join(",")
                                }
                                if (p)
                                    try {
                                        return F.apply(n, u.querySelectorAll(p)),
                                        n
                                    } catch (e) {} finally {
                                        c || t.removeAttribute("id")
                                    }
                            }
                        }
                        return g(e.replace(U, "$1"), t, n, r)
                    }
                    function ie() {
                        var n = [];
                        function r(e, t) {
                            return n.push(e + " ") > b.cacheLength && delete r[n.shift()],
                            r[e + " "] = t
                        }
                        return r
                    }
                    function ae(e) {
                        return e[B] = !0,
                        e
                    }
                    function se(e) {
                        var t = x.createElement("div");
                        try {
                            return !!e(t)
                        } catch (e) {
                            return !1
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t),
                            t = null
                        }
                    }
                    function le(e, t) {
                        for (var n = e.split("|"), r = e.length; r--; )
                            b.attrHandle[n[r]] = t
                    }
                    function ce(e, t) {
                        var n = t && e
                          , r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || 1 << 31) - (~e.sourceIndex || 1 << 31);
                        if (r)
                            return r;
                        if (n)
                            for (; n = n.nextSibling; )
                                if (n === t)
                                    return -1;
                        return e ? 1 : -1
                    }
                    function de(a) {
                        return ae(function(i) {
                            return i = +i,
                            ae(function(e, t) {
                                for (var n, r = a([], e.length, i), o = r.length; o--; )
                                    e[n = r[o]] && (e[n] = !(t[n] = e[n]))
                            })
                        })
                    }
                    function ue(e) {
                        return e && void 0 !== e.getElementsByTagName && e
                    }
                    for (e in f = oe.support = {},
                    r = oe.isXML = function(e) {
                        e = e && (e.ownerDocument || e).documentElement;
                        return !!e && "HTML" !== e.nodeName
                    }
                    ,
                    m = oe.setDocument = function(e) {
                        var l = e ? e.ownerDocument || e : w;
                        return l !== x && 9 === l.nodeType && l.documentElement ? (o = (x = l).documentElement,
                        (e = l.defaultView) && e !== e.top && (e.addEventListener ? e.addEventListener("unload", t, !1) : e.attachEvent && e.attachEvent("onunload", t)),
                        A = !r(l),
                        f.attributes = se(function(e) {
                            return e.className = "i",
                            !e.getAttribute("className")
                        }),
                        f.getElementsByTagName = se(function(e) {
                            return e.appendChild(l.createComment("")),
                            !e.getElementsByTagName("*").length
                        }),
                        f.getElementsByClassName = Z.test(l.getElementsByClassName),
                        f.getById = se(function(e) {
                            return o.appendChild(e).id = B,
                            !l.getElementsByName || !l.getElementsByName(B).length
                        }),
                        f.getById ? (b.find.ID = function(e, t) {
                            if (void 0 !== t.getElementById && A) {
                                e = t.getElementById(e);
                                return e && e.parentNode ? [e] : []
                            }
                        }
                        ,
                        b.filter.ID = function(e) {
                            var t = e.replace(re, u);
                            return function(e) {
                                return e.getAttribute("id") === t
                            }
                        }
                        ) : (delete b.find.ID,
                        b.filter.ID = function(e) {
                            var t = e.replace(re, u);
                            return function(e) {
                                e = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                return e && e.value === t
                            }
                        }
                        ),
                        b.find.TAG = f.getElementsByTagName ? function(e, t) {
                            return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : f.qsa ? t.querySelectorAll(e) : void 0
                        }
                        : function(e, t) {
                            var n, r = [], o = 0, i = t.getElementsByTagName(e);
                            if ("*" !== e)
                                return i;
                            for (; n = i[o++]; )
                                1 === n.nodeType && r.push(n);
                            return r
                        }
                        ,
                        b.find.CLASS = f.getElementsByClassName && function(e, t) {
                            return A ? t.getElementsByClassName(e) : void 0
                        }
                        ,
                        a = [],
                        v = [],
                        (f.qsa = Z.test(l.querySelectorAll)) && (se(function(e) {
                            o.appendChild(e).innerHTML = "<a id='" + B + "'></a><select id='" + B + "-\f]' msallowcapture=''><option selected=''></option></select>",
                            e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + q + "*(?:''|\"\")"),
                            e.querySelectorAll("[selected]").length || v.push("\\[" + q + "*(?:value|" + M + ")"),
                            e.querySelectorAll("[id~=" + B + "-]").length || v.push("~="),
                            e.querySelectorAll(":checked").length || v.push(":checked"),
                            e.querySelectorAll("a#" + B + "+*").length || v.push(".#.+[+~]")
                        }),
                        se(function(e) {
                            var t = l.createElement("input");
                            t.setAttribute("type", "hidden"),
                            e.appendChild(t).setAttribute("name", "D"),
                            e.querySelectorAll("[name=d]").length && v.push("name" + q + "*[*^$|!~]?="),
                            e.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"),
                            e.querySelectorAll("*,:x"),
                            v.push(",.*:")
                        })),
                        (f.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && se(function(e) {
                            f.disconnectedMatch = s.call(e, "div"),
                            s.call(e, "[s!='']:x"),
                            a.push("!=", _)
                        }),
                        v = v.length && new RegExp(v.join("|")),
                        a = a.length && new RegExp(a.join("|")),
                        e = Z.test(o.compareDocumentPosition),
                        y = e || Z.test(o.contains) ? function(e, t) {
                            var n = 9 === e.nodeType ? e.documentElement : e
                              , t = t && t.parentNode;
                            return e === t || !(!t || 1 !== t.nodeType || !(n.contains ? n.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
                        }
                        : function(e, t) {
                            if (t)
                                for (; t = t.parentNode; )
                                    if (t === e)
                                        return !0;
                            return !1
                        }
                        ,
                        E = e ? function(e, t) {
                            if (e === t)
                                return d = !0,
                                0;
                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !f.sortDetached && t.compareDocumentPosition(e) === n ? e === l || e.ownerDocument === w && y(w, e) ? -1 : t === l || t.ownerDocument === w && y(w, t) ? 1 : c ? O(c, e) - O(c, t) : 0 : 4 & n ? -1 : 1)
                        }
                        : function(e, t) {
                            if (e === t)
                                return d = !0,
                                0;
                            var n, r = 0, o = e.parentNode, i = t.parentNode, a = [e], s = [t];
                            if (!o || !i)
                                return e === l ? -1 : t === l ? 1 : o ? -1 : i ? 1 : c ? O(c, e) - O(c, t) : 0;
                            if (o === i)
                                return ce(e, t);
                            for (n = e; n = n.parentNode; )
                                a.unshift(n);
                            for (n = t; n = n.parentNode; )
                                s.unshift(n);
                            for (; a[r] === s[r]; )
                                r++;
                            return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0
                        }
                        ,
                        l) : x
                    }
                    ,
                    oe.matches = function(e, t) {
                        return oe(e, null, null, t)
                    }
                    ,
                    oe.matchesSelector = function(e, t) {
                        if ((e.ownerDocument || e) !== x && m(e),
                        t = t.replace(G, "='$1']"),
                        !(!f.matchesSelector || !A || a && a.test(t) || v && v.test(t)))
                            try {
                                var n = s.call(e, t);
                                if (n || f.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                                    return n
                            } catch (e) {}
                        return 0 < oe(t, x, null, [e]).length
                    }
                    ,
                    oe.contains = function(e, t) {
                        return (e.ownerDocument || e) !== x && m(e),
                        y(e, t)
                    }
                    ,
                    oe.attr = function(e, t) {
                        (e.ownerDocument || e) !== x && m(e);
                        var n = b.attrHandle[t.toLowerCase()]
                          , n = n && N.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !A) : void 0;
                        return void 0 !== n ? n : f.attributes || !A ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
                    }
                    ,
                    oe.error = function(e) {
                        throw new Error("Syntax error, unrecognized expression: " + e)
                    }
                    ,
                    oe.uniqueSort = function(e) {
                        var t, n = [], r = 0, o = 0;
                        if (d = !f.detectDuplicates,
                        c = !f.sortStable && e.slice(0),
                        e.sort(E),
                        d) {
                            for (; t = e[o++]; )
                                t === e[o] && (r = n.push(o));
                            for (; r--; )
                                e.splice(n[r], 1)
                        }
                        return c = null,
                        e
                    }
                    ,
                    i = oe.getText = function(e) {
                        var t, n = "", r = 0, o = e.nodeType;
                        if (o) {
                            if (1 === o || 9 === o || 11 === o) {
                                if ("string" == typeof e.textContent)
                                    return e.textContent;
                                for (e = e.firstChild; e; e = e.nextSibling)
                                    n += i(e)
                            } else if (3 === o || 4 === o)
                                return e.nodeValue
                        } else
                            for (; t = e[r++]; )
                                n += i(t);
                        return n
                    }
                    ,
                    (b = oe.selectors = {
                        cacheLength: 50,
                        createPseudo: ae,
                        match: Q,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(e) {
                                return e[1] = e[1].replace(re, u),
                                e[3] = (e[3] || e[4] || e[5] || "").replace(re, u),
                                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                                e.slice(0, 4)
                            },
                            CHILD: function(e) {
                                return e[1] = e[1].toLowerCase(),
                                "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]),
                                e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                                e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]),
                                e
                            },
                            PSEUDO: function(e) {
                                var t, n = !e[6] && e[2];
                                return Q.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && Y.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                                e[2] = n.slice(0, t)),
                                e.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function(e) {
                                var t = e.replace(re, u).toLowerCase();
                                return "*" === e ? function() {
                                    return !0
                                }
                                : function(e) {
                                    return e.nodeName && e.nodeName.toLowerCase() === t
                                }
                            },
                            CLASS: function(e) {
                                var t = l[e + " "];
                                return t || (t = new RegExp("(^|" + q + ")" + e + "(" + q + "|$)")) && l(e, function(e) {
                                    return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                })
                            },
                            ATTR: function(t, n, r) {
                                return function(e) {
                                    e = oe.attr(e, t);
                                    return null == e ? "!=" === n : !n || (e += "",
                                    "=" === n ? e === r : "!=" === n ? e !== r : "^=" === n ? r && 0 === e.indexOf(r) : "*=" === n ? r && -1 < e.indexOf(r) : "$=" === n ? r && e.slice(-r.length) === r : "~=" === n ? -1 < (" " + e.replace(P, " ") + " ").indexOf(r) : "|=" === n && (e === r || e.slice(0, r.length + 1) === r + "-"))
                                }
                            },
                            CHILD: function(f, e, t, h, g) {
                                var m = "nth" !== f.slice(0, 3)
                                  , A = "last" !== f.slice(-4)
                                  , v = "of-type" === e;
                                return 1 === h && 0 === g ? function(e) {
                                    return !!e.parentNode
                                }
                                : function(e, t, n) {
                                    var r, o, i, a, s, l, c = m != A ? "nextSibling" : "previousSibling", d = e.parentNode, u = v && e.nodeName.toLowerCase(), p = !n && !v;
                                    if (d) {
                                        if (m) {
                                            for (; c; ) {
                                                for (i = e; i = i[c]; )
                                                    if (v ? i.nodeName.toLowerCase() === u : 1 === i.nodeType)
                                                        return !1;
                                                l = c = "only" === f && !l && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (l = [A ? d.firstChild : d.lastChild],
                                        A && p) {
                                            for (s = (r = (o = d[B] || (d[B] = {}))[f] || [])[0] === k && r[1],
                                            a = r[0] === k && r[2],
                                            i = s && d.childNodes[s]; i = ++s && i && i[c] || (a = s = 0) || l.pop(); )
                                                if (1 === i.nodeType && ++a && i === e) {
                                                    o[f] = [k, s, a];
                                                    break
                                                }
                                        } else if (p && (r = (e[B] || (e[B] = {}))[f]) && r[0] === k)
                                            a = r[1];
                                        else
                                            for (; (i = ++s && i && i[c] || (a = s = 0) || l.pop()) && ((v ? i.nodeName.toLowerCase() !== u : 1 !== i.nodeType) || !++a || (p && ((i[B] || (i[B] = {}))[f] = [k, a]),
                                            i !== e)); )
                                                ;
                                        return (a -= g) === h || a % h == 0 && 0 <= a / h
                                    }
                                }
                            },
                            PSEUDO: function(e, i) {
                                var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                                return a[B] ? a(i) : 1 < a.length ? (t = [e, e, "", i],
                                b.setFilters.hasOwnProperty(e.toLowerCase()) ? ae(function(e, t) {
                                    for (var n, r = a(e, i), o = r.length; o--; )
                                        e[n = O(e, r[o])] = !(t[n] = r[o])
                                }) : function(e) {
                                    return a(e, 0, t)
                                }
                                ) : a
                            }
                        },
                        pseudos: {
                            not: ae(function(e) {
                                var r = []
                                  , o = []
                                  , s = p(e.replace(U, "$1"));
                                return s[B] ? ae(function(e, t, n, r) {
                                    for (var o, i = s(e, null, r, []), a = e.length; a--; )
                                        (o = i[a]) && (e[a] = !(t[a] = o))
                                }) : function(e, t, n) {
                                    return r[0] = e,
                                    s(r, null, n, o),
                                    r[0] = null,
                                    !o.pop()
                                }
                            }),
                            has: ae(function(t) {
                                return function(e) {
                                    return 0 < oe(t, e).length
                                }
                            }),
                            contains: ae(function(t) {
                                return t = t.replace(re, u),
                                function(e) {
                                    return -1 < (e.textContent || e.innerText || i(e)).indexOf(t)
                                }
                            }),
                            lang: ae(function(n) {
                                return V.test(n || "") || oe.error("unsupported lang: " + n),
                                n = n.replace(re, u).toLowerCase(),
                                function(e) {
                                    var t;
                                    do {
                                        if (t = A ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                            return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                    } while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                            }),
                            target: function(e) {
                                var t = n.location && n.location.hash;
                                return t && t.slice(1) === e.id
                            },
                            root: function(e) {
                                return e === o
                            },
                            focus: function(e) {
                                return e === x.activeElement && (!x.hasFocus || x.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                            },
                            enabled: function(e) {
                                return !1 === e.disabled
                            },
                            disabled: function(e) {
                                return !0 === e.disabled
                            },
                            checked: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && !!e.checked || "option" === t && !!e.selected
                            },
                            selected: function(e) {
                                return e.parentNode && e.parentNode.selectedIndex,
                                !0 === e.selected
                            },
                            empty: function(e) {
                                for (e = e.firstChild; e; e = e.nextSibling)
                                    if (e.nodeType < 6)
                                        return !1;
                                return !0
                            },
                            parent: function(e) {
                                return !b.pseudos.empty(e)
                            },
                            header: function(e) {
                                return J.test(e.nodeName)
                            },
                            input: function(e) {
                                return K.test(e.nodeName)
                            },
                            button: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && "button" === e.type || "button" === t
                            },
                            text: function(e) {
                                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase())
                            },
                            first: de(function() {
                                return [0]
                            }),
                            last: de(function(e, t) {
                                return [t - 1]
                            }),
                            eq: de(function(e, t, n) {
                                return [n < 0 ? n + t : n]
                            }),
                            even: de(function(e, t) {
                                for (var n = 0; n < t; n += 2)
                                    e.push(n);
                                return e
                            }),
                            odd: de(function(e, t) {
                                for (var n = 1; n < t; n += 2)
                                    e.push(n);
                                return e
                            }),
                            lt: de(function(e, t, n) {
                                for (var r = n < 0 ? n + t : n; 0 <= --r; )
                                    e.push(r);
                                return e
                            }),
                            gt: de(function(e, t, n) {
                                for (var r = n < 0 ? n + t : n; ++r < t; )
                                    e.push(r);
                                return e
                            })
                        }
                    }).pseudos.nth = b.pseudos.eq,
                    {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    })
                        b.pseudos[e] = function(t) {
                            return function(e) {
                                return "input" === e.nodeName.toLowerCase() && e.type === t
                            }
                        }(e);
                    for (e in {
                        submit: !0,
                        reset: !0
                    })
                        b.pseudos[e] = function(n) {
                            return function(e) {
                                var t = e.nodeName.toLowerCase();
                                return ("input" === t || "button" === t) && e.type === n
                            }
                        }(e);
                    function pe() {}
                    function fe(e) {
                        for (var t = 0, n = e.length, r = ""; t < n; t++)
                            r += e[t].value;
                        return r
                    }
                    function he(a, e, t) {
                        var s = e.dir
                          , l = t && "parentNode" === s
                          , c = I++;
                        return e.first ? function(e, t, n) {
                            for (; e = e[s]; )
                                if (1 === e.nodeType || l)
                                    return a(e, t, n)
                        }
                        : function(e, t, n) {
                            var r, o, i = [k, c];
                            if (n) {
                                for (; e = e[s]; )
                                    if ((1 === e.nodeType || l) && a(e, t, n))
                                        return !0
                            } else
                                for (; e = e[s]; )
                                    if (1 === e.nodeType || l) {
                                        if ((r = (o = e[B] || (e[B] = {}))[s]) && r[0] === k && r[1] === c)
                                            return i[2] = r[2];
                                        if ((o[s] = i)[2] = a(e, t, n))
                                            return !0
                                    }
                        }
                    }
                    function ge(o) {
                        return 1 < o.length ? function(e, t, n) {
                            for (var r = o.length; r--; )
                                if (!o[r](e, t, n))
                                    return !1;
                            return !0
                        }
                        : o[0]
                    }
                    function me(e, t, n, r, o) {
                        for (var i, a = [], s = 0, l = e.length, c = null != t; s < l; s++)
                            !(i = e[s]) || n && !n(i, r, o) || (a.push(i),
                            c && t.push(s));
                        return a
                    }
                    function Ae(f, h, g, m, A, e) {
                        return m && !m[B] && (m = Ae(m)),
                        A && !A[B] && (A = Ae(A, e)),
                        ae(function(e, t, n, r) {
                            var o, i, a, s = [], l = [], c = t.length, d = e || function(e, t, n) {
                                for (var r = 0, o = t.length; r < o; r++)
                                    oe(e, t[r], n);
                                return n
                            }(h || "*", n.nodeType ? [n] : n, []), u = !f || !e && h ? d : me(d, s, f, n, r), p = g ? A || (e ? f : c || m) ? [] : t : u;
                            if (g && g(u, p, n, r),
                            m)
                                for (o = me(p, l),
                                m(o, [], n, r),
                                i = o.length; i--; )
                                    (a = o[i]) && (p[l[i]] = !(u[l[i]] = a));
                            if (e) {
                                if (A || f) {
                                    if (A) {
                                        for (o = [],
                                        i = p.length; i--; )
                                            (a = p[i]) && o.push(u[i] = a);
                                        A(null, p = [], o, r)
                                    }
                                    for (i = p.length; i--; )
                                        (a = p[i]) && -1 < (o = A ? O(e, a) : s[i]) && (e[o] = !(t[o] = a))
                                }
                            } else
                                p = me(p === t ? p.splice(c, p.length) : p),
                                A ? A(null, t, p, r) : F.apply(t, p)
                        })
                    }
                    function ve(m, A) {
                        function e(e, t, n, r, o) {
                            var i, a, s, l = 0, c = "0", d = e && [], u = [], p = C, f = e || y && b.find.TAG("*", o), h = k += null == p ? 1 : Math.random() || .1, g = f.length;
                            for (o && (C = t !== x && t); c !== g && null != (i = f[c]); c++) {
                                if (y && i) {
                                    for (a = 0; s = m[a++]; )
                                        if (s(i, t, n)) {
                                            r.push(i);
                                            break
                                        }
                                    o && (k = h)
                                }
                                v && ((i = !s && i) && l--,
                                e && d.push(i))
                            }
                            if (l += c,
                            v && c !== l) {
                                for (a = 0; s = A[a++]; )
                                    s(d, u, t, n);
                                if (e) {
                                    if (0 < l)
                                        for (; c--; )
                                            d[c] || u[c] || (u[c] = D.call(r));
                                    u = me(u)
                                }
                                F.apply(r, u),
                                o && !e && 0 < u.length && 1 < l + A.length && oe.uniqueSort(r)
                            }
                            return o && (k = h,
                            C = p),
                            d
                        }
                        var v = 0 < A.length
                          , y = 0 < m.length;
                        return v ? ae(e) : e
                    }
                    return pe.prototype = b.filters = b.pseudos,
                    b.setFilters = new pe,
                    h = oe.tokenize = function(e, t) {
                        var n, r, o, i, a, s, l, c = T[e + " "];
                        if (c)
                            return t ? 0 : c.slice(0);
                        for (a = e,
                        s = [],
                        l = b.preFilter; a; ) {
                            for (i in n && !(r = X.exec(a)) || (r && (a = a.slice(r[0].length) || a),
                            s.push(o = [])),
                            n = !1,
                            (r = $.exec(a)) && (n = r.shift(),
                            o.push({
                                value: n,
                                type: r[0].replace(U, " ")
                            }),
                            a = a.slice(n.length)),
                            b.filter)
                                !(r = Q[i].exec(a)) || l[i] && !(r = l[i](r)) || (n = r.shift(),
                                o.push({
                                    value: n,
                                    type: i,
                                    matches: r
                                }),
                                a = a.slice(n.length));
                            if (!n)
                                break
                        }
                        return t ? a.length : a ? oe.error(e) : T(e, s).slice(0)
                    }
                    ,
                    p = oe.compile = function(e, t) {
                        var n, r = [], o = [], i = S[e + " "];
                        if (!i) {
                            for (n = (t = t || h(e)).length; n--; )
                                ((i = function e(t) {
                                    for (var r, n, o, i = t.length, a = b.relative[t[0].type], s = a || b.relative[" "], l = a ? 1 : 0, c = he(function(e) {
                                        return e === r
                                    }, s, !0), d = he(function(e) {
                                        return -1 < O(r, e)
                                    }, s, !0), u = [function(e, t, n) {
                                        return n = !a && (n || t !== C) || ((r = t).nodeType ? c : d)(e, t, n),
                                        r = null,
                                        n
                                    }
                                    ]; l < i; l++)
                                        if (n = b.relative[t[l].type])
                                            u = [he(ge(u), n)];
                                        else {
                                            if ((n = b.filter[t[l].type].apply(null, t[l].matches))[B]) {
                                                for (o = ++l; o < i && !b.relative[t[o].type]; o++)
                                                    ;
                                                return Ae(1 < l && ge(u), 1 < l && fe(t.slice(0, l - 1).concat({
                                                    value: " " === t[l - 2].type ? "*" : ""
                                                })).replace(U, "$1"), n, l < o && e(t.slice(l, o)), o < i && e(t = t.slice(o)), o < i && fe(t))
                                            }
                                            u.push(n)
                                        }
                                    return ge(u)
                                }(t[n]))[B] ? r : o).push(i);
                            (i = S(e, ve(o, r))).selector = e
                        }
                        return i
                    }
                    ,
                    g = oe.select = function(e, t, n, r) {
                        var o, i, a, s, l, c = "function" == typeof e && e, d = !r && h(e = c.selector || e);
                        if (n = n || [],
                        1 === d.length) {
                            if (2 < (i = d[0] = d[0].slice(0)).length && "ID" === (a = i[0]).type && f.getById && 9 === t.nodeType && A && b.relative[i[1].type]) {
                                if (!(t = (b.find.ID(a.matches[0].replace(re, u), t) || [])[0]))
                                    return n;
                                c && (t = t.parentNode),
                                e = e.slice(i.shift().value.length)
                            }
                            for (o = Q.needsContext.test(e) ? 0 : i.length; o-- && (a = i[o],
                            !b.relative[s = a.type]); )
                                if ((l = b.find[s]) && (r = l(a.matches[0].replace(re, u), te.test(i[0].type) && ue(t.parentNode) || t))) {
                                    if (i.splice(o, 1),
                                    !(e = r.length && fe(i)))
                                        return F.apply(n, r),
                                        n;
                                    break
                                }
                        }
                        return (c || p(e, d))(r, t, !A, n, te.test(e) && ue(t.parentNode) || t),
                        n
                    }
                    ,
                    f.sortStable = B.split("").sort(E).join("") === B,
                    f.detectDuplicates = !!d,
                    m(),
                    f.sortDetached = se(function(e) {
                        return 1 & e.compareDocumentPosition(x.createElement("div"))
                    }),
                    se(function(e) {
                        return e.innerHTML = "<a href='#'></a>",
                        "#" === e.firstChild.getAttribute("href")
                    }) || le("type|href|height|width", function(e, t, n) {
                        return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                    }),
                    f.attributes && se(function(e) {
                        return e.innerHTML = "<input/>",
                        e.firstChild.setAttribute("value", ""),
                        "" === e.firstChild.getAttribute("value")
                    }) || le("value", function(e, t, n) {
                        return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                    }),
                    se(function(e) {
                        return null == e.getAttribute("disabled")
                    }) || le(M, function(e, t, n) {
                        return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (t = e.getAttributeNode(t)) && t.specified ? t.value : null
                    }),
                    oe
                }(h);
                C.find = p,
                C.expr = p.selectors,
                C.expr[":"] = C.expr.pseudos,
                C.unique = p.uniqueSort,
                C.text = p.getText,
                C.isXMLDoc = p.isXML,
                C.contains = p.contains;
                var f = C.expr.match.needsContext
                  , v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
                  , y = /^.[^:#\[\.,]*$/;
                function b(e, n, r) {
                    if (C.isFunction(n))
                        return C.grep(e, function(e, t) {
                            return !!n.call(e, t, e) !== r
                        });
                    if (n.nodeType)
                        return C.grep(e, function(e) {
                            return e === n !== r
                        });
                    if ("string" == typeof n) {
                        if (y.test(n))
                            return C.filter(n, e, r);
                        n = C.filter(n, e)
                    }
                    return C.grep(e, function(e) {
                        return 0 <= C.inArray(e, n) !== r
                    })
                }
                C.filter = function(e, t, n) {
                    var r = t[0];
                    return n && (e = ":not(" + e + ")"),
                    1 === t.length && 1 === r.nodeType ? C.find.matchesSelector(r, e) ? [r] : [] : C.find.matches(e, C.grep(t, function(e) {
                        return 1 === e.nodeType
                    }))
                }
                ,
                C.fn.extend({
                    find: function(e) {
                        var t, n = [], r = this, o = r.length;
                        if ("string" != typeof e)
                            return this.pushStack(C(e).filter(function() {
                                for (t = 0; t < o; t++)
                                    if (C.contains(r[t], this))
                                        return !0
                            }));
                        for (t = 0; t < o; t++)
                            C.find(e, r[t], n);
                        return (n = this.pushStack(1 < o ? C.unique(n) : n)).selector = this.selector ? this.selector + " " + e : e,
                        n
                    },
                    filter: function(e) {
                        return this.pushStack(b(this, e || [], !1))
                    },
                    not: function(e) {
                        return this.pushStack(b(this, e || [], !0))
                    },
                    is: function(e) {
                        return !!b(this, "string" == typeof e && f.test(e) ? C(e) : e || [], !1).length
                    }
                });
                var x, B = h.document, w = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
                (C.fn.init = function(e, t) {
                    var n, r;
                    if (!e)
                        return this;
                    if ("string" != typeof e)
                        return e.nodeType ? (this.context = this[0] = e,
                        this.length = 1,
                        this) : C.isFunction(e) ? void 0 !== x.ready ? x.ready(e) : e(C) : (void 0 !== e.selector && (this.selector = e.selector,
                        this.context = e.context),
                        C.makeArray(e, this));
                    if (!(n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && 3 <= e.length ? [null, e, null] : w.exec(e)) || !n[1] && t)
                        return (!t || t.jquery ? t || x : this.constructor(t)).find(e);
                    if (n[1]) {
                        if (t = t instanceof C ? t[0] : t,
                        C.merge(this, C.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : B, !0)),
                        v.test(n[1]) && C.isPlainObject(t))
                            for (n in t)
                                C.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    if ((r = B.getElementById(n[2])) && r.parentNode) {
                        if (r.id !== n[2])
                            return x.find(e);
                        this.length = 1,
                        this[0] = r
                    }
                    return this.context = B,
                    this.selector = e,
                    this
                }
                ).prototype = C.fn,
                x = C(B);
                var k = /^(?:parents|prev(?:Until|All))/
                  , I = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
                function T(e, t) {
                    for (; e = e[t],
                    e && 1 !== e.nodeType; )
                        ;
                    return e
                }
                C.extend({
                    dir: function(e, t, n) {
                        for (var r = [], o = e[t]; o && 9 !== o.nodeType && (void 0 === n || 1 !== o.nodeType || !C(o).is(n)); )
                            1 === o.nodeType && r.push(o),
                            o = o[t];
                        return r
                    },
                    sibling: function(e, t) {
                        for (var n = []; e; e = e.nextSibling)
                            1 === e.nodeType && e !== t && n.push(e);
                        return n
                    }
                }),
                C.fn.extend({
                    has: function(e) {
                        var t, n = C(e, this), r = n.length;
                        return this.filter(function() {
                            for (t = 0; t < r; t++)
                                if (C.contains(this, n[t]))
                                    return !0
                        })
                    },
                    closest: function(e, t) {
                        for (var n, r = 0, o = this.length, i = [], a = f.test(e) || "string" != typeof e ? C(e, t || this.context) : 0; r < o; r++)
                            for (n = this[r]; n && n !== t; n = n.parentNode)
                                if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && C.find.matchesSelector(n, e))) {
                                    i.push(n);
                                    break
                                }
                        return this.pushStack(1 < i.length ? C.unique(i) : i)
                    },
                    index: function(e) {
                        return e ? "string" == typeof e ? C.inArray(this[0], C(e)) : C.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function(e, t) {
                        return this.pushStack(C.unique(C.merge(this.get(), C(e, t))))
                    },
                    addBack: function(e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                    }
                }),
                C.each({
                    parent: function(e) {
                        e = e.parentNode;
                        return e && 11 !== e.nodeType ? e : null
                    },
                    parents: function(e) {
                        return C.dir(e, "parentNode")
                    },
                    parentsUntil: function(e, t, n) {
                        return C.dir(e, "parentNode", n)
                    },
                    next: function(e) {
                        return T(e, "nextSibling")
                    },
                    prev: function(e) {
                        return T(e, "previousSibling")
                    },
                    nextAll: function(e) {
                        return C.dir(e, "nextSibling")
                    },
                    prevAll: function(e) {
                        return C.dir(e, "previousSibling")
                    },
                    nextUntil: function(e, t, n) {
                        return C.dir(e, "nextSibling", n)
                    },
                    prevUntil: function(e, t, n) {
                        return C.dir(e, "previousSibling", n)
                    },
                    siblings: function(e) {
                        return C.sibling((e.parentNode || {}).firstChild, e)
                    },
                    children: function(e) {
                        return C.sibling(e.firstChild)
                    },
                    contents: function(e) {
                        return C.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : C.merge([], e.childNodes)
                    }
                }, function(r, o) {
                    C.fn[r] = function(e, t) {
                        var n = C.map(this, o, e);
                        return (t = "Until" !== r.slice(-5) ? e : t) && "string" == typeof t && (n = C.filter(t, n)),
                        1 < this.length && (I[r] || (n = C.unique(n)),
                        k.test(r) && (n = n.reverse())),
                        this.pushStack(n)
                    }
                });
                var S, E = /\S+/g, N = {};
                function j() {
                    B.addEventListener ? (B.removeEventListener("DOMContentLoaded", D, !1),
                    h.removeEventListener("load", D, !1)) : (B.detachEvent("onreadystatechange", D),
                    h.detachEvent("onload", D))
                }
                function D() {
                    !B.addEventListener && "load" !== event.type && "complete" !== B.readyState || (j(),
                    C.ready())
                }
                C.Callbacks = function(o) {
                    var e, n;
                    o = "string" == typeof o ? N[o] || (n = N[e = o] = {},
                    C.each(e.match(E) || [], function(e, t) {
                        n[t] = !0
                    }),
                    n) : C.extend({}, o);
                    function r(e) {
                        for (t = o.memory && e,
                        a = !0,
                        l = c || 0,
                        c = 0,
                        s = d.length,
                        i = !0; d && l < s; l++)
                            if (!1 === d[l].apply(e[0], e[1]) && o.stopOnFalse) {
                                t = !1;
                                break
                            }
                        i = !1,
                        d && (u ? u.length && r(u.shift()) : t ? d = [] : p.disable())
                    }
                    var i, t, a, s, l, c, d = [], u = !o.once && [], p = {
                        add: function() {
                            var e;
                            return d && (e = d.length,
                            function r(e) {
                                C.each(e, function(e, t) {
                                    var n = C.type(t);
                                    "function" === n ? o.unique && p.has(t) || d.push(t) : t && t.length && "string" !== n && r(t)
                                })
                            }(arguments),
                            i ? s = d.length : t && (c = e,
                            r(t))),
                            this
                        },
                        remove: function() {
                            return d && C.each(arguments, function(e, t) {
                                for (var n; -1 < (n = C.inArray(t, d, n)); )
                                    d.splice(n, 1),
                                    i && (n <= s && s--,
                                    n <= l && l--)
                            }),
                            this
                        },
                        has: function(e) {
                            return e ? -1 < C.inArray(e, d) : !(!d || !d.length)
                        },
                        empty: function() {
                            return d = [],
                            s = 0,
                            this
                        },
                        disable: function() {
                            return d = u = t = void 0,
                            this
                        },
                        disabled: function() {
                            return !d
                        },
                        lock: function() {
                            return u = void 0,
                            t || p.disable(),
                            this
                        },
                        locked: function() {
                            return !u
                        },
                        fireWith: function(e, t) {
                            return !d || a && !u || (t = [e, (t = t || []).slice ? t.slice() : t],
                            i ? u.push(t) : r(t)),
                            this
                        },
                        fire: function() {
                            return p.fireWith(this, arguments),
                            this
                        },
                        fired: function() {
                            return !!a
                        }
                    };
                    return p
                }
                ,
                C.extend({
                    Deferred: function(e) {
                        var i = [["resolve", "done", C.Callbacks("once memory"), "resolved"], ["reject", "fail", C.Callbacks("once memory"), "rejected"], ["notify", "progress", C.Callbacks("memory")]]
                          , o = "pending"
                          , a = {
                            state: function() {
                                return o
                            },
                            always: function() {
                                return s.done(arguments).fail(arguments),
                                this
                            },
                            then: function() {
                                var o = arguments;
                                return C.Deferred(function(r) {
                                    C.each(i, function(e, t) {
                                        var n = C.isFunction(o[e]) && o[e];
                                        s[t[1]](function() {
                                            var e = n && n.apply(this, arguments);
                                            e && C.isFunction(e.promise) ? e.promise().done(r.resolve).fail(r.reject).progress(r.notify) : r[t[0] + "With"](this === a ? r.promise() : this, n ? [e] : arguments)
                                        })
                                    }),
                                    o = null
                                }).promise()
                            },
                            promise: function(e) {
                                return null != e ? C.extend(e, a) : a
                            }
                        }
                          , s = {};
                        return a.pipe = a.then,
                        C.each(i, function(e, t) {
                            var n = t[2]
                              , r = t[3];
                            a[t[1]] = n.add,
                            r && n.add(function() {
                                o = r
                            }, i[1 ^ e][2].disable, i[2][2].lock),
                            s[t[0]] = function() {
                                return s[t[0] + "With"](this === s ? a : this, arguments),
                                this
                            }
                            ,
                            s[t[0] + "With"] = n.fireWith
                        }),
                        a.promise(s),
                        e && e.call(s, s),
                        s
                    },
                    when: function(e) {
                        function t(t, n, r) {
                            return function(e) {
                                n[t] = this,
                                r[t] = 1 < arguments.length ? d.call(arguments) : e,
                                r === o ? c.notifyWith(n, r) : --l || c.resolveWith(n, r)
                            }
                        }
                        var o, n, r, i = 0, a = d.call(arguments), s = a.length, l = 1 !== s || e && C.isFunction(e.promise) ? s : 0, c = 1 === l ? e : C.Deferred();
                        if (1 < s)
                            for (o = new Array(s),
                            n = new Array(s),
                            r = new Array(s); i < s; i++)
                                a[i] && C.isFunction(a[i].promise) ? a[i].promise().done(t(i, r, a)).fail(c.reject).progress(t(i, n, o)) : --l;
                        return l || c.resolveWith(r, a),
                        c.promise()
                    }
                }),
                C.fn.ready = function(e) {
                    return C.ready.promise().done(e),
                    this
                }
                ,
                C.extend({
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function(e) {
                        e ? C.readyWait++ : C.ready(!0)
                    },
                    ready: function(e) {
                        if (!0 === e ? !--C.readyWait : !C.isReady) {
                            if (!B.body)
                                return setTimeout(C.ready);
                            (C.isReady = !0) !== e && 0 < --C.readyWait || (S.resolveWith(B, [C]),
                            C.fn.triggerHandler && (C(B).triggerHandler("ready"),
                            C(B).off("ready")))
                        }
                    }
                }),
                C.ready.promise = function(e) {
                    if (!S)
                        if (S = C.Deferred(),
                        "complete" === B.readyState)
                            setTimeout(C.ready);
                        else if (B.addEventListener)
                            B.addEventListener("DOMContentLoaded", D, !1),
                            h.addEventListener("load", D, !1);
                        else {
                            B.attachEvent("onreadystatechange", D),
                            h.attachEvent("onload", D);
                            var n = !1;
                            try {
                                n = null == h.frameElement && B.documentElement
                            } catch (e) {}
                            n && n.doScroll && !function t() {
                                if (!C.isReady) {
                                    try {
                                        n.doScroll("left")
                                    } catch (e) {
                                        return setTimeout(t, 50)
                                    }
                                    j(),
                                    C.ready()
                                }
                            }()
                        }
                    return S.promise(e)
                }
                ;
                var L, F = "undefined";
                for (L in C(A))
                    break;
                A.ownLast = "0" !== L,
                A.inlineBlockNeedsLayout = !1,
                C(function() {
                    var e, t, n = B.getElementsByTagName("body")[0];
                    n && n.style && (e = B.createElement("div"),
                    (t = B.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                    n.appendChild(t).appendChild(e),
                    on(e.style.zoom) !== F && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
                    A.inlineBlockNeedsLayout = e = 3 === e.offsetWidth,
                    e && (n.style.zoom = 1)),
                    n.removeChild(t))
                }),
                function() {
                    var e = B.createElement("div");
                    if (null == A.deleteExpando) {
                        A.deleteExpando = !0;
                        try {
                            delete e.test
                        } catch (e) {
                            A.deleteExpando = !1
                        }
                    }
                    e = null
                }(),
                C.acceptData = function(e) {
                    var t = C.noData[(e.nodeName + " ").toLowerCase()]
                      , n = +e.nodeType || 1;
                    return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
                }
                ;
                var H = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
                  , O = /([A-Z])/g;
                function M(e, t, n) {
                    if (void 0 === n && 1 === e.nodeType) {
                        var r = "data-" + t.replace(O, "-$1").toLowerCase();
                        if ("string" == typeof (n = e.getAttribute(r))) {
                            try {
                                n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : H.test(n) ? C.parseJSON(n) : n)
                            } catch (e) {}
                            C.data(e, t, n)
                        } else
                            n = void 0
                    }
                    return n
                }
                function q(e) {
                    for (var t in e)
                        if (("data" !== t || !C.isEmptyObject(e[t])) && "toJSON" !== t)
                            return;
                    return 1
                }
                function R(e, t, n, r) {
                    if (C.acceptData(e)) {
                        var o, i = C.expando, a = e.nodeType, s = a ? C.cache : e, l = a ? e[i] : e[i] && i;
                        if (l && s[l] && (r || s[l].data) || void 0 !== n || "string" != typeof t)
                            return s[l = l || (a ? e[i] = u.pop() || C.guid++ : i)] || (s[l] = a ? {} : {
                                toJSON: C.noop
                            }),
                            "object" != (void 0 === t ? "undefined" : on(t)) && "function" != typeof t || (r ? s[l] = C.extend(s[l], t) : s[l].data = C.extend(s[l].data, t)),
                            l = s[l],
                            r || (l.data || (l.data = {}),
                            l = l.data),
                            void 0 !== n && (l[C.camelCase(t)] = n),
                            "string" == typeof t ? null == (o = l[t]) && (o = l[C.camelCase(t)]) : o = l,
                            o
                    }
                }
                function W(e, t, n) {
                    if (C.acceptData(e)) {
                        var r, o, i = e.nodeType, a = i ? C.cache : e, s = i ? e[C.expando] : C.expando;
                        if (a[s]) {
                            if (t && (r = n ? a[s] : a[s].data)) {
                                o = (t = C.isArray(t) ? t.concat(C.map(t, C.camelCase)) : t in r ? [t] : (t = C.camelCase(t))in r ? [t] : t.split(" ")).length;
                                for (; o--; )
                                    delete r[t[o]];
                                if (n ? !q(r) : !C.isEmptyObject(r))
                                    return
                            }
                            (n || (delete a[s].data,
                            q(a[s]))) && (i ? C.cleanData([e], !0) : A.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
                        }
                    }
                }
                C.extend({
                    cache: {},
                    noData: {
                        "applet ": !0,
                        "embed ": !0,
                        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                    },
                    hasData: function(e) {
                        return !!(e = e.nodeType ? C.cache[e[C.expando]] : e[C.expando]) && !q(e)
                    },
                    data: function(e, t, n) {
                        return R(e, t, n)
                    },
                    removeData: function(e, t) {
                        return W(e, t)
                    },
                    _data: function(e, t, n) {
                        return R(e, t, n, !0)
                    },
                    _removeData: function(e, t) {
                        return W(e, t, !0)
                    }
                }),
                C.fn.extend({
                    data: function(e, t) {
                        var n, r, o, i = this[0], a = i && i.attributes;
                        if (void 0 !== e)
                            return "object" == (void 0 === e ? "undefined" : on(e)) ? this.each(function() {
                                C.data(this, e)
                            }) : 1 < arguments.length ? this.each(function() {
                                C.data(this, e, t)
                            }) : i ? M(i, e, C.data(i, e)) : void 0;
                        if (this.length && (o = C.data(i),
                        1 === i.nodeType && !C._data(i, "parsedAttrs"))) {
                            for (n = a.length; n--; )
                                a[n] && (0 === (r = a[n].name).indexOf("data-") && M(i, r = C.camelCase(r.slice(5)), o[r]));
                            C._data(i, "parsedAttrs", !0)
                        }
                        return o
                    },
                    removeData: function(e) {
                        return this.each(function() {
                            C.removeData(this, e)
                        })
                    }
                }),
                C.extend({
                    queue: function(e, t, n) {
                        var r;
                        return e ? (t = (t || "fx") + "queue",
                        r = C._data(e, t),
                        n && (!r || C.isArray(n) ? r = C._data(e, t, C.makeArray(n)) : r.push(n)),
                        r || []) : void 0
                    },
                    dequeue: function(e, t) {
                        t = t || "fx";
                        var n = C.queue(e, t)
                          , r = n.length
                          , o = n.shift()
                          , i = C._queueHooks(e, t);
                        "inprogress" === o && (o = n.shift(),
                        r--),
                        o && ("fx" === t && n.unshift("inprogress"),
                        delete i.stop,
                        o.call(e, function() {
                            C.dequeue(e, t)
                        }, i)),
                        !r && i && i.empty.fire()
                    },
                    _queueHooks: function(e, t) {
                        var n = t + "queueHooks";
                        return C._data(e, n) || C._data(e, n, {
                            empty: C.Callbacks("once memory").add(function() {
                                C._removeData(e, t + "queue"),
                                C._removeData(e, n)
                            })
                        })
                    }
                }),
                C.fn.extend({
                    queue: function(t, n) {
                        var e = 2;
                        return "string" != typeof t && (n = t,
                        t = "fx",
                        e--),
                        arguments.length < e ? C.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                            var e = C.queue(this, t, n);
                            C._queueHooks(this, t),
                            "fx" === t && "inprogress" !== e[0] && C.dequeue(this, t)
                        })
                    },
                    dequeue: function(e) {
                        return this.each(function() {
                            C.dequeue(this, e)
                        })
                    },
                    clearQueue: function(e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function(e, t) {
                        function n() {
                            --o || i.resolveWith(a, [a])
                        }
                        var r, o = 1, i = C.Deferred(), a = this, s = this.length;
                        for ("string" != typeof e && (t = e,
                        e = void 0),
                        e = e || "fx"; s--; )
                            (r = C._data(a[s], e + "queueHooks")) && r.empty && (o++,
                            r.empty.add(n));
                        return n(),
                        i.promise(t)
                    }
                });
                function z(e, t) {
                    return e = t || e,
                    "none" === C.css(e, "display") || !C.contains(e.ownerDocument, e)
                }
                var _ = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
                  , P = ["Top", "Right", "Bottom", "Left"]
                  , U = C.access = function(e, t, n, r, o, i, a) {
                    var s = 0
                      , l = e.length
                      , c = null == n;
                    if ("object" === C.type(n))
                        for (s in o = !0,
                        n)
                            C.access(e, t, s, n[s], !0, i, a);
                    else if (void 0 !== r && (o = !0,
                    C.isFunction(r) || (a = !0),
                    t = c ? a ? (t.call(e, r),
                    null) : (c = t,
                    function(e, t, n) {
                        return c.call(C(e), n)
                    }
                    ) : t))
                        for (; s < l; s++)
                            t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                    return o ? e : c ? t.call(e) : l ? t(e[0], n) : i
                }
                  , X = /^(?:checkbox|radio)$/i;
                !function() {
                    var e = B.createElement("input")
                      , t = B.createElement("div")
                      , n = B.createDocumentFragment();
                    if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                    A.leadingWhitespace = 3 === t.firstChild.nodeType,
                    A.tbody = !t.getElementsByTagName("tbody").length,
                    A.htmlSerialize = !!t.getElementsByTagName("link").length,
                    A.html5Clone = "<:nav></:nav>" !== B.createElement("nav").cloneNode(!0).outerHTML,
                    e.type = "checkbox",
                    e.checked = !0,
                    n.appendChild(e),
                    A.appendChecked = e.checked,
                    t.innerHTML = "<textarea>x</textarea>",
                    A.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue,
                    n.appendChild(t),
                    t.innerHTML = "<input type='radio' checked='checked' name='t'/>",
                    A.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
                    A.noCloneEvent = !0,
                    t.attachEvent && (t.attachEvent("onclick", function() {
                        A.noCloneEvent = !1
                    }),
                    t.cloneNode(!0).click()),
                    null == A.deleteExpando) {
                        A.deleteExpando = !0;
                        try {
                            delete t.test
                        } catch (e) {
                            A.deleteExpando = !1
                        }
                    }
                }(),
                function() {
                    var e, t, n = B.createElement("div");
                    for (e in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    })
                        t = "on" + e,
                        (A[e + "Bubbles"] = t in h) || (n.setAttribute(t, "t"),
                        A[e + "Bubbles"] = !1 === n.attributes[t].expando);
                    n = null
                }();
                var $ = /^(?:input|select|textarea)$/i
                  , G = /^key/
                  , Y = /^(?:mouse|pointer|contextmenu)|click/
                  , V = /^(?:focusinfocus|focusoutblur)$/
                  , Q = /^([^.]*)(?:\.(.+)|)$/;
                function K() {
                    return !0
                }
                function J() {
                    return !1
                }
                function Z() {
                    try {
                        return B.activeElement
                    } catch (e) {}
                }
                function ee(e) {
                    var t = te.split("|")
                      , n = e.createDocumentFragment();
                    if (n.createElement)
                        for (; t.length; )
                            n.createElement(t.pop());
                    return n
                }
                C.event = {
                    global: {},
                    add: function(e, t, n, r, o) {
                        var i, a, s, l, c, d, u, p, f, h = C._data(e);
                        if (h) {
                            for (n.handler && (n = (s = n).handler,
                            o = s.selector),
                            n.guid || (n.guid = C.guid++),
                            (i = h.events) || (i = h.events = {}),
                            (c = h.handle) || ((c = h.handle = function(e) {
                                return (void 0 === C ? "undefined" : on(C)) === F || e && C.event.triggered === e.type ? void 0 : C.event.dispatch.apply(c.elem, arguments)
                            }
                            ).elem = e),
                            a = (t = (t || "").match(E) || [""]).length; a--; )
                                u = f = (d = Q.exec(t[a]) || [])[1],
                                p = (d[2] || "").split(".").sort(),
                                u && (l = C.event.special[u] || {},
                                u = (o ? l.delegateType : l.bindType) || u,
                                l = C.event.special[u] || {},
                                d = C.extend({
                                    type: u,
                                    origType: f,
                                    data: r,
                                    handler: n,
                                    guid: n.guid,
                                    selector: o,
                                    needsContext: o && C.expr.match.needsContext.test(o),
                                    namespace: p.join(".")
                                }, s),
                                (f = i[u]) || ((f = i[u] = []).delegateCount = 0,
                                l.setup && !1 !== l.setup.call(e, r, p, c) || (e.addEventListener ? e.addEventListener(u, c, !1) : e.attachEvent && e.attachEvent("on" + u, c))),
                                l.add && (l.add.call(e, d),
                                d.handler.guid || (d.handler.guid = n.guid)),
                                o ? f.splice(f.delegateCount++, 0, d) : f.push(d),
                                C.event.global[u] = !0);
                            e = null
                        }
                    },
                    remove: function(e, t, n, r, o) {
                        var i, a, s, l, c, d, u, p, f, h, g, m = C.hasData(e) && C._data(e);
                        if (m && (d = m.events)) {
                            for (c = (t = (t || "").match(E) || [""]).length; c--; )
                                if (f = g = (s = Q.exec(t[c]) || [])[1],
                                h = (s[2] || "").split(".").sort(),
                                f) {
                                    for (u = C.event.special[f] || {},
                                    p = d[f = (r ? u.delegateType : u.bindType) || f] || [],
                                    s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                    l = i = p.length; i--; )
                                        a = p[i],
                                        !o && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(i, 1),
                                        a.selector && p.delegateCount--,
                                        u.remove && u.remove.call(e, a));
                                    l && !p.length && (u.teardown && !1 !== u.teardown.call(e, h, m.handle) || C.removeEvent(e, f, m.handle),
                                    delete d[f])
                                } else
                                    for (f in d)
                                        C.event.remove(e, f + t[c], n, r, !0);
                            C.isEmptyObject(d) && (delete m.handle,
                            C._removeData(e, "events"))
                        }
                    },
                    trigger: function(e, t, n, r) {
                        var o, i, a, s, l, c, d = [n || B], u = m.call(e, "type") ? e.type : e, p = m.call(e, "namespace") ? e.namespace.split(".") : [], f = l = n = n || B;
                        if (3 !== n.nodeType && 8 !== n.nodeType && !V.test(u + C.event.triggered) && (0 <= u.indexOf(".") && (u = (p = u.split(".")).shift(),
                        p.sort()),
                        i = u.indexOf(":") < 0 && "on" + u,
                        (e = e[C.expando] ? e : new C.Event(u,"object" == (void 0 === e ? "undefined" : on(e)) && e)).isTrigger = r ? 2 : 3,
                        e.namespace = p.join("."),
                        e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                        e.result = void 0,
                        e.target || (e.target = n),
                        t = null == t ? [e] : C.makeArray(t, [e]),
                        s = C.event.special[u] || {},
                        r || !s.trigger || !1 !== s.trigger.apply(n, t))) {
                            if (!r && !s.noBubble && !C.isWindow(n)) {
                                for (a = s.delegateType || u,
                                V.test(a + u) || (f = f.parentNode); f; f = f.parentNode)
                                    d.push(f),
                                    l = f;
                                l === (n.ownerDocument || B) && d.push(l.defaultView || l.parentWindow || h)
                            }
                            for (c = 0; (f = d[c++]) && !e.isPropagationStopped(); )
                                e.type = 1 < c ? a : s.bindType || u,
                                (o = (C._data(f, "events") || {})[e.type] && C._data(f, "handle")) && o.apply(f, t),
                                (o = i && f[i]) && o.apply && C.acceptData(f) && (e.result = o.apply(f, t),
                                !1 === e.result && e.preventDefault());
                            if (e.type = u,
                            !r && !e.isDefaultPrevented() && (!s._default || !1 === s._default.apply(d.pop(), t)) && C.acceptData(n) && i && n[u] && !C.isWindow(n)) {
                                (l = n[i]) && (n[i] = null),
                                C.event.triggered = u;
                                try {
                                    n[u]()
                                } catch (e) {}
                                C.event.triggered = void 0,
                                l && (n[i] = l)
                            }
                            return e.result
                        }
                    },
                    dispatch: function(e) {
                        e = C.event.fix(e);
                        var t, n, r, o, i, a = d.call(arguments), s = (C._data(this, "events") || {})[e.type] || [], l = C.event.special[e.type] || {};
                        if ((a[0] = e).delegateTarget = this,
                        !l.preDispatch || !1 !== l.preDispatch.call(this, e)) {
                            for (i = C.event.handlers.call(this, e, s),
                            t = 0; (r = i[t++]) && !e.isPropagationStopped(); )
                                for (e.currentTarget = r.elem,
                                o = 0; (n = r.handlers[o++]) && !e.isImmediatePropagationStopped(); )
                                    e.namespace_re && !e.namespace_re.test(n.namespace) || (e.handleObj = n,
                                    e.data = n.data,
                                    void 0 !== (n = ((C.event.special[n.origType] || {}).handle || n.handler).apply(r.elem, a)) && !1 === (e.result = n) && (e.preventDefault(),
                                    e.stopPropagation()));
                            return l.postDispatch && l.postDispatch.call(this, e),
                            e.result
                        }
                    },
                    handlers: function(e, t) {
                        var n, r, o, i, a = [], s = t.delegateCount, l = e.target;
                        if (s && l.nodeType && (!e.button || "click" !== e.type))
                            for (; l != this; l = l.parentNode || this)
                                if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                                    for (o = [],
                                    i = 0; i < s; i++)
                                        void 0 === o[n = (r = t[i]).selector + " "] && (o[n] = r.needsContext ? 0 <= C(n, this).index(l) : C.find(n, this, null, [l]).length),
                                        o[n] && o.push(r);
                                    o.length && a.push({
                                        elem: l,
                                        handlers: o
                                    })
                                }
                        return s < t.length && a.push({
                            elem: this,
                            handlers: t.slice(s)
                        }),
                        a
                    },
                    fix: function(e) {
                        if (e[C.expando])
                            return e;
                        var t, n, r, o = e.type, i = e, a = this.fixHooks[o];
                        for (a || (this.fixHooks[o] = a = Y.test(o) ? this.mouseHooks : G.test(o) ? this.keyHooks : {}),
                        r = a.props ? this.props.concat(a.props) : this.props,
                        e = new C.Event(i),
                        t = r.length; t--; )
                            e[n = r[t]] = i[n];
                        return e.target || (e.target = i.srcElement || B),
                        3 === e.target.nodeType && (e.target = e.target.parentNode),
                        e.metaKey = !!e.metaKey,
                        a.filter ? a.filter(e, i) : e
                    },
                    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks: {},
                    keyHooks: {
                        props: "char charCode key keyCode".split(" "),
                        filter: function(e, t) {
                            return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                            e
                        }
                    },
                    mouseHooks: {
                        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                        filter: function(e, t) {
                            var n, r, o = t.button, i = t.fromElement;
                            return null == e.pageX && null != t.clientX && (r = (n = e.target.ownerDocument || B).documentElement,
                            n = n.body,
                            e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0),
                            e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)),
                            !e.relatedTarget && i && (e.relatedTarget = i === e.target ? t.toElement : i),
                            e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                            e
                        }
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        focus: {
                            trigger: function() {
                                if (this !== Z() && this.focus)
                                    try {
                                        return this.focus(),
                                        !1
                                    } catch (e) {}
                            },
                            delegateType: "focusin"
                        },
                        blur: {
                            trigger: function() {
                                return this === Z() && this.blur ? (this.blur(),
                                !1) : void 0
                            },
                            delegateType: "focusout"
                        },
                        click: {
                            trigger: function() {
                                return C.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                                !1) : void 0
                            },
                            _default: function(e) {
                                return C.nodeName(e.target, "a")
                            }
                        },
                        beforeunload: {
                            postDispatch: function(e) {
                                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                            }
                        }
                    },
                    simulate: function(e, t, n, r) {
                        e = C.extend(new C.Event, n, {
                            type: e,
                            isSimulated: !0,
                            originalEvent: {}
                        });
                        r ? C.event.trigger(e, null, t) : C.event.dispatch.call(t, e),
                        e.isDefaultPrevented() && n.preventDefault()
                    }
                },
                C.removeEvent = B.removeEventListener ? function(e, t, n) {
                    e.removeEventListener && e.removeEventListener(t, n, !1)
                }
                : function(e, t, n) {
                    t = "on" + t;
                    e.detachEvent && (on(e[t]) === F && (e[t] = null),
                    e.detachEvent(t, n))
                }
                ,
                C.Event = function(e, t) {
                    return this instanceof C.Event ? (e && e.type ? (this.originalEvent = e,
                    this.type = e.type,
                    this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? K : J) : this.type = e,
                    t && C.extend(this, t),
                    this.timeStamp = e && e.timeStamp || C.now(),
                    void (this[C.expando] = !0)) : new C.Event(e,t)
                }
                ,
                C.Event.prototype = {
                    isDefaultPrevented: J,
                    isPropagationStopped: J,
                    isImmediatePropagationStopped: J,
                    preventDefault: function() {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = K,
                        e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                    },
                    stopPropagation: function() {
                        var e = this.originalEvent;
                        this.isPropagationStopped = K,
                        e && (e.stopPropagation && e.stopPropagation(),
                        e.cancelBubble = !0)
                    },
                    stopImmediatePropagation: function() {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = K,
                        e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
                        this.stopPropagation()
                    }
                },
                C.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, function(e, o) {
                    C.event.special[e] = {
                        delegateType: o,
                        bindType: o,
                        handle: function(e) {
                            var t, n = e.relatedTarget, r = e.handleObj;
                            return n && (n === this || C.contains(this, n)) || (e.type = r.origType,
                            t = r.handler.apply(this, arguments),
                            e.type = o),
                            t
                        }
                    }
                }),
                A.submitBubbles || (C.event.special.submit = {
                    setup: function() {
                        return !C.nodeName(this, "form") && void C.event.add(this, "click._submit keypress._submit", function(e) {
                            e = e.target,
                            e = C.nodeName(e, "input") || C.nodeName(e, "button") ? e.form : void 0;
                            e && !C._data(e, "submitBubbles") && (C.event.add(e, "submit._submit", function(e) {
                                e._submit_bubble = !0
                            }),
                            C._data(e, "submitBubbles", !0))
                        })
                    },
                    postDispatch: function(e) {
                        e._submit_bubble && (delete e._submit_bubble,
                        this.parentNode && !e.isTrigger && C.event.simulate("submit", this.parentNode, e, !0))
                    },
                    teardown: function() {
                        return !C.nodeName(this, "form") && void C.event.remove(this, "._submit")
                    }
                }),
                A.changeBubbles || (C.event.special.change = {
                    setup: function() {
                        return $.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (C.event.add(this, "propertychange._change", function(e) {
                            "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                        }),
                        C.event.add(this, "click._change", function(e) {
                            this._just_changed && !e.isTrigger && (this._just_changed = !1),
                            C.event.simulate("change", this, e, !0)
                        })),
                        !1) : void C.event.add(this, "beforeactivate._change", function(e) {
                            e = e.target;
                            $.test(e.nodeName) && !C._data(e, "changeBubbles") && (C.event.add(e, "change._change", function(e) {
                                !this.parentNode || e.isSimulated || e.isTrigger || C.event.simulate("change", this.parentNode, e, !0)
                            }),
                            C._data(e, "changeBubbles", !0))
                        })
                    },
                    handle: function(e) {
                        var t = e.target;
                        return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
                    },
                    teardown: function() {
                        return C.event.remove(this, "._change"),
                        !$.test(this.nodeName)
                    }
                }),
                A.focusinBubbles || C.each({
                    focus: "focusin",
                    blur: "focusout"
                }, function(n, r) {
                    function o(e) {
                        C.event.simulate(r, e.target, C.event.fix(e), !0)
                    }
                    C.event.special[r] = {
                        setup: function() {
                            var e = this.ownerDocument || this
                              , t = C._data(e, r);
                            t || e.addEventListener(n, o, !0),
                            C._data(e, r, (t || 0) + 1)
                        },
                        teardown: function() {
                            var e = this.ownerDocument || this
                              , t = C._data(e, r) - 1;
                            t ? C._data(e, r, t) : (e.removeEventListener(n, o, !0),
                            C._removeData(e, r))
                        }
                    }
                }),
                C.fn.extend({
                    on: function(e, t, n, r, o) {
                        var i, a;
                        if ("object" == (void 0 === e ? "undefined" : on(e))) {
                            for (i in "string" != typeof t && (n = n || t,
                            t = void 0),
                            e)
                                this.on(i, t, n, e[i], o);
                            return this
                        }
                        if (null == n && null == r ? (r = t,
                        n = t = void 0) : null == r && ("string" == typeof t ? (r = n,
                        n = void 0) : (r = n,
                        n = t,
                        t = void 0)),
                        !1 === r)
                            r = J;
                        else if (!r)
                            return this;
                        return 1 === o && (a = r,
                        (r = function(e) {
                            return C().off(e),
                            a.apply(this, arguments)
                        }
                        ).guid = a.guid || (a.guid = C.guid++)),
                        this.each(function() {
                            C.event.add(this, e, r, n, t)
                        })
                    },
                    one: function(e, t, n, r) {
                        return this.on(e, t, n, r, 1)
                    },
                    off: function(e, t, n) {
                        var r, o;
                        if (e && e.preventDefault && e.handleObj)
                            return r = e.handleObj,
                            C(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                            this;
                        if ("object" != (void 0 === e ? "undefined" : on(e)))
                            return !1 !== t && "function" != typeof t || (n = t,
                            t = void 0),
                            !1 === n && (n = J),
                            this.each(function() {
                                C.event.remove(this, e, n, t)
                            });
                        for (o in e)
                            this.off(o, t, e[o]);
                        return this
                    },
                    trigger: function(e, t) {
                        return this.each(function() {
                            C.event.trigger(e, t, this)
                        })
                    },
                    triggerHandler: function(e, t) {
                        var n = this[0];
                        return n ? C.event.trigger(e, t, n, !0) : void 0
                    }
                });
                var te = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
                  , ne = / jQuery\d+="(?:null|\d+)"/g
                  , re = new RegExp("<(?:" + te + ")[\\s/>]","i")
                  , oe = /^\s+/
                  , ie = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
                  , ae = /<([\w:]+)/
                  , se = /<tbody/i
                  , le = /<|&#?\w+;/
                  , ce = /<(?:script|style|link)/i
                  , de = /checked\s*(?:[^=]|=\s*.checked.)/i
                  , ue = /^$|\/(?:java|ecma)script/i
                  , pe = /^true\/(.*)/
                  , fe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
                  , he = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    area: [1, "<map>", "</map>"],
                    param: [1, "<object>", "</object>"],
                    thead: [1, "<table>", "</table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: A.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                }
                  , ge = ee(B).appendChild(B.createElement("div"));
                function me(e, t) {
                    var n, r, o = 0, i = on(e.getElementsByTagName) !== F ? e.getElementsByTagName(t || "*") : on(e.querySelectorAll) !== F ? e.querySelectorAll(t || "*") : void 0;
                    if (!i)
                        for (i = [],
                        n = e.childNodes || e; null != (r = n[o]); o++)
                            !t || C.nodeName(r, t) ? i.push(r) : C.merge(i, me(r, t));
                    return void 0 === t || t && C.nodeName(e, t) ? C.merge([e], i) : i
                }
                function Ae(e) {
                    X.test(e.type) && (e.defaultChecked = e.checked)
                }
                function ve(e, t) {
                    return C.nodeName(e, "table") && C.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
                }
                function ye(e) {
                    return e.type = (null !== C.find.attr(e, "type")) + "/" + e.type,
                    e
                }
                function be(e) {
                    var t = pe.exec(e.type);
                    return t ? e.type = t[1] : e.removeAttribute("type"),
                    e
                }
                function Ce(e, t) {
                    for (var n, r = 0; null != (n = e[r]); r++)
                        C._data(n, "globalEval", !t || C._data(t[r], "globalEval"))
                }
                function xe(e, t) {
                    if (1 === t.nodeType && C.hasData(e)) {
                        var n, r, o, i = C._data(e), e = C._data(t, i), a = i.events;
                        if (a)
                            for (n in delete e.handle,
                            e.events = {},
                            a)
                                for (r = 0,
                                o = a[n].length; r < o; r++)
                                    C.event.add(t, n, a[n][r]);
                        e.data && (e.data = C.extend({}, e.data))
                    }
                }
                he.optgroup = he.option,
                he.tbody = he.tfoot = he.colgroup = he.caption = he.thead,
                he.th = he.td,
                C.extend({
                    clone: function(e, t, n) {
                        var r, o, i, a, s, l = C.contains(e.ownerDocument, e);
                        if (A.html5Clone || C.isXMLDoc(e) || !re.test("<" + e.nodeName + ">") ? i = e.cloneNode(!0) : (ge.innerHTML = e.outerHTML,
                        ge.removeChild(i = ge.firstChild)),
                        !(A.noCloneEvent && A.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || C.isXMLDoc(e)))
                            for (r = me(i),
                            s = me(e),
                            a = 0; null != (o = s[a]); ++a)
                                r[a] && function(e, t) {
                                    var n, r, o;
                                    if (1 === t.nodeType) {
                                        if (n = t.nodeName.toLowerCase(),
                                        !A.noCloneEvent && t[C.expando]) {
                                            for (r in (o = C._data(t)).events)
                                                C.removeEvent(t, r, o.handle);
                                            t.removeAttribute(C.expando)
                                        }
                                        "script" === n && t.text !== e.text ? (ye(t).text = e.text,
                                        be(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
                                        A.html5Clone && e.innerHTML && !C.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && X.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
                                        t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
                                    }
                                }(o, r[a]);
                        if (t)
                            if (n)
                                for (s = s || me(e),
                                r = r || me(i),
                                a = 0; null != (o = s[a]); a++)
                                    xe(o, r[a]);
                            else
                                xe(e, i);
                        return 0 < (r = me(i, "script")).length && Ce(r, !l && me(e, "script")),
                        r = s = o = null,
                        i
                    },
                    buildFragment: function(e, t, n, r) {
                        for (var o, i, a, s, l, c, d, u = e.length, p = ee(t), f = [], h = 0; h < u; h++)
                            if ((i = e[h]) || 0 === i)
                                if ("object" === C.type(i))
                                    C.merge(f, i.nodeType ? [i] : i);
                                else if (le.test(i)) {
                                    for (s = s || p.appendChild(t.createElement("div")),
                                    l = (ae.exec(i) || ["", ""])[1].toLowerCase(),
                                    d = he[l] || he._default,
                                    s.innerHTML = d[1] + i.replace(ie, "<$1></$2>") + d[2],
                                    o = d[0]; o--; )
                                        s = s.lastChild;
                                    if (!A.leadingWhitespace && oe.test(i) && f.push(t.createTextNode(oe.exec(i)[0])),
                                    !A.tbody)
                                        for (o = (i = "table" !== l || se.test(i) ? "<table>" !== d[1] || se.test(i) ? 0 : s : s.firstChild) && i.childNodes.length; o--; )
                                            C.nodeName(c = i.childNodes[o], "tbody") && !c.childNodes.length && i.removeChild(c);
                                    for (C.merge(f, s.childNodes),
                                    s.textContent = ""; s.firstChild; )
                                        s.removeChild(s.firstChild);
                                    s = p.lastChild
                                } else
                                    f.push(t.createTextNode(i));
                        for (s && p.removeChild(s),
                        A.appendChecked || C.grep(me(f, "input"), Ae),
                        h = 0; i = f[h++]; )
                            if ((!r || -1 === C.inArray(i, r)) && (a = C.contains(i.ownerDocument, i),
                            s = me(p.appendChild(i), "script"),
                            a && Ce(s),
                            n))
                                for (o = 0; i = s[o++]; )
                                    ue.test(i.type || "") && n.push(i);
                        return s = null,
                        p
                    },
                    cleanData: function(e, t) {
                        for (var n, r, o, i, a = 0, s = C.expando, l = C.cache, c = A.deleteExpando, d = C.event.special; null != (n = e[a]); a++)
                            if ((t || C.acceptData(n)) && (i = (o = n[s]) && l[o])) {
                                if (i.events)
                                    for (r in i.events)
                                        d[r] ? C.event.remove(n, r) : C.removeEvent(n, r, i.handle);
                                l[o] && (delete l[o],
                                c ? delete n[s] : on(n.removeAttribute) !== F ? n.removeAttribute(s) : n[s] = null,
                                u.push(o))
                            }
                    }
                }),
                C.fn.extend({
                    text: function(e) {
                        return U(this, function(e) {
                            return void 0 === e ? C.text(this) : this.empty().append((this[0] && this[0].ownerDocument || B).createTextNode(e))
                        }, null, e, arguments.length)
                    },
                    append: function() {
                        return this.domManip(arguments, function(e) {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || ve(this, e).appendChild(e)
                        })
                    },
                    prepend: function() {
                        return this.domManip(arguments, function(e) {
                            var t;
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = ve(this, e)).insertBefore(e, t.firstChild)
                        })
                    },
                    before: function() {
                        return this.domManip(arguments, function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this)
                        })
                    },
                    after: function() {
                        return this.domManip(arguments, function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                        })
                    },
                    remove: function(e, t) {
                        for (var n, r = e ? C.filter(e, this) : this, o = 0; null != (n = r[o]); o++)
                            t || 1 !== n.nodeType || C.cleanData(me(n)),
                            n.parentNode && (t && C.contains(n.ownerDocument, n) && Ce(me(n, "script")),
                            n.parentNode.removeChild(n));
                        return this
                    },
                    empty: function() {
                        for (var e, t = 0; null != (e = this[t]); t++) {
                            for (1 === e.nodeType && C.cleanData(me(e, !1)); e.firstChild; )
                                e.removeChild(e.firstChild);
                            e.options && C.nodeName(e, "select") && (e.options.length = 0)
                        }
                        return this
                    },
                    clone: function(e, t) {
                        return e = null != e && e,
                        t = null == t ? e : t,
                        this.map(function() {
                            return C.clone(this, e, t)
                        })
                    },
                    html: function(e) {
                        return U(this, function(e) {
                            var t = this[0] || {}
                              , n = 0
                              , r = this.length;
                            if (void 0 === e)
                                return 1 === t.nodeType ? t.innerHTML.replace(ne, "") : void 0;
                            if (!("string" != typeof e || ce.test(e) || !A.htmlSerialize && re.test(e) || !A.leadingWhitespace && oe.test(e) || he[(ae.exec(e) || ["", ""])[1].toLowerCase()])) {
                                e = e.replace(ie, "<$1></$2>");
                                try {
                                    for (; n < r; n++)
                                        1 === (t = this[n] || {}).nodeType && (C.cleanData(me(t, !1)),
                                        t.innerHTML = e);
                                    t = 0
                                } catch (e) {}
                            }
                            t && this.empty().append(e)
                        }, null, e, arguments.length)
                    },
                    replaceWith: function() {
                        var t = arguments[0];
                        return this.domManip(arguments, function(e) {
                            t = this.parentNode,
                            C.cleanData(me(this)),
                            t && t.replaceChild(e, this)
                        }),
                        t && (t.length || t.nodeType) ? this : this.remove()
                    },
                    detach: function(e) {
                        return this.remove(e, !0)
                    },
                    domManip: function(n, r) {
                        n = g.apply([], n);
                        var e, t, o, i, a, s, l = 0, c = this.length, d = this, u = c - 1, p = n[0], f = C.isFunction(p);
                        if (f || 1 < c && "string" == typeof p && !A.checkClone && de.test(p))
                            return this.each(function(e) {
                                var t = d.eq(e);
                                f && (n[0] = p.call(this, e, t.html())),
                                t.domManip(n, r)
                            });
                        if (c && (e = (s = C.buildFragment(n, this[0].ownerDocument, !1, this)).firstChild,
                        1 === s.childNodes.length && (s = e),
                        e)) {
                            for (o = (i = C.map(me(s, "script"), ye)).length; l < c; l++)
                                t = s,
                                l !== u && (t = C.clone(t, !0, !0),
                                o && C.merge(i, me(t, "script"))),
                                r.call(this[l], t, l);
                            if (o)
                                for (a = i[i.length - 1].ownerDocument,
                                C.map(i, be),
                                l = 0; l < o; l++)
                                    t = i[l],
                                    ue.test(t.type || "") && !C._data(t, "globalEval") && C.contains(a, t) && (t.src ? C._evalUrl && C._evalUrl(t.src) : C.globalEval((t.text || t.textContent || t.innerHTML || "").replace(fe, "")));
                            s = e = null
                        }
                        return this
                    }
                }),
                C.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function(e, a) {
                    C.fn[e] = function(e) {
                        for (var t, n = 0, r = [], o = C(e), i = o.length - 1; n <= i; n++)
                            t = n === i ? this : this.clone(!0),
                            C(o[n])[a](t),
                            s.apply(r, t.get());
                        return this.pushStack(r)
                    }
                });
                var Be, we, ke = {};
                function Ie(e, t) {
                    var t = C(t.createElement(e)).appendTo(t.body)
                      , n = h.getDefaultComputedStyle && (n = h.getDefaultComputedStyle(t[0])) ? n.display : C.css(t[0], "display");
                    return t.detach(),
                    n
                }
                function Te(e) {
                    var t = B
                      , n = ke[e];
                    return n || ("none" !== (n = Ie(e, t)) && n || ((t = ((Be = (Be || C("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || Be[0].contentDocument).document).write(),
                    t.close(),
                    n = Ie(e, t),
                    Be.detach()),
                    ke[e] = n),
                    n
                }
                A.shrinkWrapBlocks = function() {
                    return null != we ? we : (we = !1,
                    (t = B.getElementsByTagName("body")[0]) && t.style ? (e = B.createElement("div"),
                    (n = B.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                    t.appendChild(n).appendChild(e),
                    on(e.style.zoom) !== F && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
                    e.appendChild(B.createElement("div")).style.width = "5px",
                    we = 3 !== e.offsetWidth),
                    t.removeChild(n),
                    we) : void 0);
                    var e, t, n
                }
                ;
                var Se, Ee, Ne, je, De, Le, Fe = /^margin/, He = new RegExp("^(" + _ + ")(?!px)[a-z%]+$","i"), Oe = /^(top|right|bottom|left)$/;
                function Me(t, n) {
                    return {
                        get: function() {
                            var e = t();
                            if (null != e)
                                return e ? void delete this.get : (this.get = n).apply(this, arguments)
                        }
                    }
                }
                function qe() {
                    var e, t, n, r = B.getElementsByTagName("body")[0];
                    r && r.style && (e = B.createElement("div"),
                    (t = B.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                    r.appendChild(t).appendChild(e),
                    e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
                    Ne = je = !1,
                    Le = !0,
                    h.getComputedStyle && (Ne = "1%" !== (h.getComputedStyle(e, null) || {}).top,
                    je = "4px" === (h.getComputedStyle(e, null) || {
                        width: "4px"
                    }).width,
                    (n = e.appendChild(B.createElement("div"))).style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                    n.style.marginRight = n.style.width = "0",
                    e.style.width = "1px",
                    Le = !parseFloat((h.getComputedStyle(n, null) || {}).marginRight),
                    e.removeChild(n)),
                    e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                    (n = e.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none",
                    (De = 0 === n[0].offsetHeight) && (n[0].style.display = "",
                    n[1].style.display = "none",
                    De = 0 === n[0].offsetHeight),
                    r.removeChild(t))
                }
                h.getComputedStyle ? (Se = function(e) {
                    return (e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView : h).getComputedStyle(e, null)
                }
                ,
                Ee = function(e, t, n) {
                    var r, o = e.style, i = (n = n || Se(e)) ? n.getPropertyValue(t) || n[t] : void 0;
                    return n && ("" !== i || C.contains(e.ownerDocument, e) || (i = C.style(e, t)),
                    He.test(i) && Fe.test(t) && (r = o.width,
                    e = o.minWidth,
                    t = o.maxWidth,
                    o.minWidth = o.maxWidth = o.width = i,
                    i = n.width,
                    o.width = r,
                    o.minWidth = e,
                    o.maxWidth = t)),
                    void 0 === i ? i : i + ""
                }
                ) : B.documentElement.currentStyle && (Se = function(e) {
                    return e.currentStyle
                }
                ,
                Ee = function(e, t, n) {
                    var r, o, i, a = e.style;
                    return null == (i = (n = n || Se(e)) ? n[t] : void 0) && a && a[t] && (i = a[t]),
                    He.test(i) && !Oe.test(t) && (r = a.left,
                    (n = (o = e.runtimeStyle) && o.left) && (o.left = e.currentStyle.left),
                    a.left = "fontSize" === t ? "1em" : i,
                    i = a.pixelLeft + "px",
                    a.left = r,
                    n && (o.left = n)),
                    void 0 === i ? i : i + "" || "auto"
                }
                ),
                (tt = B.createElement("div")).innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                (nt = (nt = tt.getElementsByTagName("a")[0]) && nt.style) && (nt.cssText = "float:left;opacity:.5",
                A.opacity = "0.5" === nt.opacity,
                A.cssFloat = !!nt.cssFloat,
                tt.style.backgroundClip = "content-box",
                tt.cloneNode(!0).style.backgroundClip = "",
                A.clearCloneStyle = "content-box" === tt.style.backgroundClip,
                A.boxSizing = "" === nt.boxSizing || "" === nt.MozBoxSizing || "" === nt.WebkitBoxSizing,
                C.extend(A, {
                    reliableHiddenOffsets: function() {
                        return null == De && qe(),
                        De
                    },
                    boxSizingReliable: function() {
                        return null == je && qe(),
                        je
                    },
                    pixelPosition: function() {
                        return null == Ne && qe(),
                        Ne
                    },
                    reliableMarginRight: function() {
                        return null == Le && qe(),
                        Le
                    }
                })),
                C.swap = function(e, t, n, r) {
                    var o, i = {};
                    for (o in t)
                        i[o] = e.style[o],
                        e.style[o] = t[o];
                    for (o in r = n.apply(e, r || []),
                    t)
                        e.style[o] = i[o];
                    return r
                }
                ;
                var Re = /alpha\([^)]*\)/i
                  , We = /opacity\s*=\s*([^)]*)/
                  , ze = /^(none|table(?!-c[ea]).+)/
                  , _e = new RegExp("^(" + _ + ")(.*)$","i")
                  , Pe = new RegExp("^([+-])=(" + _ + ")","i")
                  , Ue = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                }
                  , Xe = {
                    letterSpacing: "0",
                    fontWeight: "400"
                }
                  , $e = ["Webkit", "O", "Moz", "ms"];
                function Ge(e, t) {
                    if (t in e)
                        return t;
                    for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, o = $e.length; o--; )
                        if ((t = $e[o] + n)in e)
                            return t;
                    return r
                }
                function Ye(e, t) {
                    for (var n, r, o, i = [], a = 0, s = e.length; a < s; a++)
                        (r = e[a]).style && (i[a] = C._data(r, "olddisplay"),
                        n = r.style.display,
                        t ? (i[a] || "none" !== n || (r.style.display = ""),
                        "" === r.style.display && z(r) && (i[a] = C._data(r, "olddisplay", Te(r.nodeName)))) : (o = z(r),
                        (n && "none" !== n || !o) && C._data(r, "olddisplay", o ? n : C.css(r, "display"))));
                    for (a = 0; a < s; a++)
                        (r = e[a]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? i[a] || "" : "none"));
                    return e
                }
                function Ve(e, t, n) {
                    var r = _e.exec(t);
                    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
                }
                function Qe(e, t, n, r, o) {
                    for (var i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; i < 4; i += 2)
                        "margin" === n && (a += C.css(e, n + P[i], !0, o)),
                        r ? ("content" === n && (a -= C.css(e, "padding" + P[i], !0, o)),
                        "margin" !== n && (a -= C.css(e, "border" + P[i] + "Width", !0, o))) : (a += C.css(e, "padding" + P[i], !0, o),
                        "padding" !== n && (a += C.css(e, "border" + P[i] + "Width", !0, o)));
                    return a
                }
                function Ke(e, t, n) {
                    var r = !0
                      , o = "width" === t ? e.offsetWidth : e.offsetHeight
                      , i = Se(e)
                      , a = A.boxSizing && "border-box" === C.css(e, "boxSizing", !1, i);
                    if (o <= 0 || null == o) {
                        if (((o = Ee(e, t, i)) < 0 || null == o) && (o = e.style[t]),
                        He.test(o))
                            return o;
                        r = a && (A.boxSizingReliable() || o === e.style[t]),
                        o = parseFloat(o) || 0
                    }
                    return o + Qe(e, t, n || (a ? "border" : "content"), r, i) + "px"
                }
                function Je(e, t, n, r, o) {
                    return new Je.prototype.init(e,t,n,r,o)
                }
                C.extend({
                    cssHooks: {
                        opacity: {
                            get: function(e, t) {
                                if (t) {
                                    e = Ee(e, "opacity");
                                    return "" === e ? "1" : e
                                }
                            }
                        }
                    },
                    cssNumber: {
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {
                        float: A.cssFloat ? "cssFloat" : "styleFloat"
                    },
                    style: function(e, t, n, r) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var o, i, a, s = C.camelCase(t), l = e.style;
                            if (t = C.cssProps[s] || (C.cssProps[s] = Ge(l, s)),
                            a = C.cssHooks[t] || C.cssHooks[s],
                            void 0 === n)
                                return a && "get"in a && void 0 !== (o = a.get(e, !1, r)) ? o : l[t];
                            if ("string" === (i = void 0 === n ? "undefined" : on(n)) && (o = Pe.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(C.css(e, t)),
                            i = "number"),
                            null != n && n == n && ("number" !== i || C.cssNumber[s] || (n += "px"),
                            A.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                            !(a && "set"in a && void 0 === (n = a.set(e, n, r)))))
                                try {
                                    l[t] = n
                                } catch (e) {}
                        }
                    },
                    css: function(e, t, n, r) {
                        var o, i = C.camelCase(t);
                        return t = C.cssProps[i] || (C.cssProps[i] = Ge(e.style, i)),
                        "normal" === (o = void 0 === (o = (i = C.cssHooks[t] || C.cssHooks[i]) && "get"in i ? i.get(e, !0, n) : o) ? Ee(e, t, r) : o) && t in Xe && (o = Xe[t]),
                        "" === n || n ? (t = parseFloat(o),
                        !0 === n || C.isNumeric(t) ? t || 0 : o) : o
                    }
                }),
                C.each(["height", "width"], function(e, o) {
                    C.cssHooks[o] = {
                        get: function(e, t, n) {
                            return t ? ze.test(C.css(e, "display")) && 0 === e.offsetWidth ? C.swap(e, Ue, function() {
                                return Ke(e, o, n)
                            }) : Ke(e, o, n) : void 0
                        },
                        set: function(e, t, n) {
                            var r = n && Se(e);
                            return Ve(0, t, n ? Qe(e, o, n, A.boxSizing && "border-box" === C.css(e, "boxSizing", !1, r), r) : 0)
                        }
                    }
                }),
                A.opacity || (C.cssHooks.opacity = {
                    get: function(e, t) {
                        return We.test((t && e.currentStyle ? e.currentStyle : e.style).filter || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
                    },
                    set: function(e, t) {
                        var n = e.style
                          , r = e.currentStyle
                          , o = C.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
                          , e = r && r.filter || n.filter || "";
                        ((n.zoom = 1) <= t || "" === t) && "" === C.trim(e.replace(Re, "")) && n.removeAttribute && (n.removeAttribute("filter"),
                        "" === t || r && !r.filter) || (n.filter = Re.test(e) ? e.replace(Re, o) : e + " " + o)
                    }
                }),
                C.cssHooks.marginRight = Me(A.reliableMarginRight, function(e, t) {
                    return t ? C.swap(e, {
                        display: "inline-block"
                    }, Ee, [e, "marginRight"]) : void 0
                }),
                C.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, function(o, i) {
                    C.cssHooks[o + i] = {
                        expand: function(e) {
                            for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)
                                n[o + P[t] + i] = r[t] || r[t - 2] || r[0];
                            return n
                        }
                    },
                    Fe.test(o) || (C.cssHooks[o + i].set = Ve)
                }),
                C.fn.extend({
                    css: function(e, t) {
                        return U(this, function(e, t, n) {
                            var r, o, i = {}, a = 0;
                            if (C.isArray(t)) {
                                for (r = Se(e),
                                o = t.length; a < o; a++)
                                    i[t[a]] = C.css(e, t[a], !1, r);
                                return i
                            }
                            return void 0 !== n ? C.style(e, t, n) : C.css(e, t)
                        }, e, t, 1 < arguments.length)
                    },
                    show: function() {
                        return Ye(this, !0)
                    },
                    hide: function() {
                        return Ye(this)
                    },
                    toggle: function(e) {
                        return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                            z(this) ? C(this).show() : C(this).hide()
                        })
                    }
                }),
                (C.Tween = Je).prototype = {
                    constructor: Je,
                    init: function(e, t, n, r, o, i) {
                        this.elem = e,
                        this.prop = n,
                        this.easing = o || "swing",
                        this.options = t,
                        this.start = this.now = this.cur(),
                        this.end = r,
                        this.unit = i || (C.cssNumber[n] ? "" : "px")
                    },
                    cur: function() {
                        var e = Je.propHooks[this.prop];
                        return (e && e.get ? e : Je.propHooks._default).get(this)
                    },
                    run: function(e) {
                        var t, n = Je.propHooks[this.prop];
                        return this.options.duration ? this.pos = t = C.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                        this.now = (this.end - this.start) * t + this.start,
                        this.options.step && this.options.step.call(this.elem, this.now, this),
                        (n && n.set ? n : Je.propHooks._default).set(this),
                        this
                    }
                },
                Je.prototype.init.prototype = Je.prototype,
                Je.propHooks = {
                    _default: {
                        get: function(e) {
                            var t;
                            return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = C.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0 : e.elem[e.prop]
                        },
                        set: function(e) {
                            C.fx.step[e.prop] ? C.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[C.cssProps[e.prop]] || C.cssHooks[e.prop]) ? C.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                        }
                    }
                },
                Je.propHooks.scrollTop = Je.propHooks.scrollLeft = {
                    set: function(e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                    }
                },
                C.easing = {
                    linear: function(e) {
                        return e
                    },
                    swing: function(e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    }
                },
                C.fx = Je.prototype.init,
                C.fx.step = {};
                var Ze, et, tt, nt, rt, ot = /^(?:toggle|show|hide)$/, it = new RegExp("^(?:([+-])=|)(" + _ + ")([a-z%]*)$","i"), at = /queueHooks$/, st = [function(t, e, n) {
                    var r, o, i, a, s, l, c, d = this, u = {}, p = t.style, f = t.nodeType && z(t), h = C._data(t, "fxshow");
                    for (r in n.queue || (null == (s = C._queueHooks(t, "fx")).unqueued && (s.unqueued = 0,
                    l = s.empty.fire,
                    s.empty.fire = function() {
                        s.unqueued || l()
                    }
                    ),
                    s.unqueued++,
                    d.always(function() {
                        d.always(function() {
                            s.unqueued--,
                            C.queue(t, "fx").length || s.empty.fire()
                        })
                    })),
                    1 === t.nodeType && ("height"in e || "width"in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
                    c = C.css(t, "display"),
                    "inline" === ("none" === c ? C._data(t, "olddisplay") || Te(t.nodeName) : c) && "none" === C.css(t, "float") && (A.inlineBlockNeedsLayout && "inline" !== Te(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")),
                    n.overflow && (p.overflow = "hidden",
                    A.shrinkWrapBlocks() || d.always(function() {
                        p.overflow = n.overflow[0],
                        p.overflowX = n.overflow[1],
                        p.overflowY = n.overflow[2]
                    })),
                    e)
                        if (o = e[r],
                        ot.exec(o)) {
                            if (delete e[r],
                            i = i || "toggle" === o,
                            o === (f ? "hide" : "show")) {
                                if ("show" !== o || !h || void 0 === h[r])
                                    continue;
                                f = !0
                            }
                            u[r] = h && h[r] || C.style(t, r)
                        } else
                            c = void 0;
                    if (C.isEmptyObject(u))
                        "inline" === ("none" === c ? Te(t.nodeName) : c) && (p.display = c);
                    else
                        for (r in h ? "hidden"in h && (f = h.hidden) : h = C._data(t, "fxshow", {}),
                        i && (h.hidden = !f),
                        f ? C(t).show() : d.done(function() {
                            C(t).hide()
                        }),
                        d.done(function() {
                            for (var e in C._removeData(t, "fxshow"),
                            u)
                                C.style(t, e, u[e])
                        }),
                        u)
                            a = ut(f ? h[r] : 0, r, d),
                            r in h || (h[r] = a.start,
                            f && (a.end = a.start,
                            a.start = "width" === r || "height" === r ? 1 : 0))
                }
                ], lt = {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t)
                          , r = n.cur()
                          , t = it.exec(t)
                          , o = t && t[3] || (C.cssNumber[e] ? "" : "px")
                          , i = (C.cssNumber[e] || "px" !== o && +r) && it.exec(C.css(n.elem, e))
                          , a = 1
                          , s = 20;
                        if (i && i[3] !== o)
                            for (o = o || i[3],
                            t = t || [],
                            i = +r || 1; i /= a = a || ".5",
                            C.style(n.elem, e, i + o),
                            a !== (a = n.cur() / r) && 1 !== a && --s; )
                                ;
                        return t && (i = n.start = +i || +r || 0,
                        n.unit = o,
                        n.end = t[1] ? i + (t[1] + 1) * t[2] : +t[2]),
                        n
                    }
                    ]
                };
                function ct() {
                    return setTimeout(function() {
                        Ze = void 0
                    }),
                    Ze = C.now()
                }
                function dt(e, t) {
                    var n, r = {
                        height: e
                    }, o = 0;
                    for (t = t ? 1 : 0; o < 4; o += 2 - t)
                        r["margin" + (n = P[o])] = r["padding" + n] = e;
                    return t && (r.opacity = r.width = e),
                    r
                }
                function ut(e, t, n) {
                    for (var r, o = (lt[t] || []).concat(lt["*"]), i = 0, a = o.length; i < a; i++)
                        if (r = o[i].call(n, t, e))
                            return r
                }
                function pt(o, e, t) {
                    var n, i, r = 0, a = st.length, s = C.Deferred().always(function() {
                        delete l.elem
                    }), l = function() {
                        if (i)
                            return !1;
                        for (var e = Ze || ct(), e = Math.max(0, c.startTime + c.duration - e), t = 1 - (e / c.duration || 0), n = 0, r = c.tweens.length; n < r; n++)
                            c.tweens[n].run(t);
                        return s.notifyWith(o, [c, t, e]),
                        t < 1 && r ? e : (s.resolveWith(o, [c]),
                        !1)
                    }, c = s.promise({
                        elem: o,
                        props: C.extend({}, e),
                        opts: C.extend(!0, {
                            specialEasing: {}
                        }, t),
                        originalProperties: e,
                        originalOptions: t,
                        startTime: Ze || ct(),
                        duration: t.duration,
                        tweens: [],
                        createTween: function(e, t) {
                            e = C.Tween(o, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
                            return c.tweens.push(e),
                            e
                        },
                        stop: function(e) {
                            var t = 0
                              , n = e ? c.tweens.length : 0;
                            if (i)
                                return this;
                            for (i = !0; t < n; t++)
                                c.tweens[t].run(1);
                            return e ? s.resolveWith(o, [c, e]) : s.rejectWith(o, [c, e]),
                            this
                        }
                    }), d = c.props;
                    for (function(e, t) {
                        var n, r, o, i, a;
                        for (n in e)
                            if (o = t[r = C.camelCase(n)],
                            i = e[n],
                            C.isArray(i) && (o = i[1],
                            i = e[n] = i[0]),
                            n !== r && (e[r] = i,
                            delete e[n]),
                            (a = C.cssHooks[r]) && "expand"in a)
                                for (n in i = a.expand(i),
                                delete e[r],
                                i)
                                    n in e || (e[n] = i[n],
                                    t[n] = o);
                            else
                                t[r] = o
                    }(d, c.opts.specialEasing); r < a; r++)
                        if (n = st[r].call(c, o, d, c.opts))
                            return n;
                    return C.map(d, ut, c),
                    C.isFunction(c.opts.start) && c.opts.start.call(o, c),
                    C.fx.timer(C.extend(l, {
                        elem: o,
                        anim: c,
                        queue: c.opts.queue
                    })),
                    c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
                }
                C.Animation = C.extend(pt, {
                    tweener: function(e, t) {
                        for (var n, r = 0, o = (e = C.isFunction(e) ? (t = e,
                        ["*"]) : e.split(" ")).length; r < o; r++)
                            n = e[r],
                            lt[n] = lt[n] || [],
                            lt[n].unshift(t)
                    },
                    prefilter: function(e, t) {
                        t ? st.unshift(e) : st.push(e)
                    }
                }),
                C.speed = function(e, t, n) {
                    var r = e && "object" == (void 0 === e ? "undefined" : on(e)) ? C.extend({}, e) : {
                        complete: n || !n && t || C.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !C.isFunction(t) && t
                    };
                    return r.duration = C.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in C.fx.speeds ? C.fx.speeds[r.duration] : C.fx.speeds._default,
                    null != r.queue && !0 !== r.queue || (r.queue = "fx"),
                    r.old = r.complete,
                    r.complete = function() {
                        C.isFunction(r.old) && r.old.call(this),
                        r.queue && C.dequeue(this, r.queue)
                    }
                    ,
                    r
                }
                ,
                C.fn.extend({
                    fadeTo: function(e, t, n, r) {
                        return this.filter(z).css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, r)
                    },
                    animate: function(t, e, n, r) {
                        var o = C.isEmptyObject(t)
                          , i = C.speed(e, n, r)
                          , r = function() {
                            var e = pt(this, C.extend({}, t), i);
                            (o || C._data(this, "finish")) && e.stop(!0)
                        };
                        return r.finish = r,
                        o || !1 === i.queue ? this.each(r) : this.queue(i.queue, r)
                    },
                    stop: function(o, e, i) {
                        function a(e) {
                            var t = e.stop;
                            delete e.stop,
                            t(i)
                        }
                        return "string" != typeof o && (i = e,
                        e = o,
                        o = void 0),
                        e && !1 !== o && this.queue(o || "fx", []),
                        this.each(function() {
                            var e = !0
                              , t = null != o && o + "queueHooks"
                              , n = C.timers
                              , r = C._data(this);
                            if (t)
                                r[t] && r[t].stop && a(r[t]);
                            else
                                for (t in r)
                                    r[t] && r[t].stop && at.test(t) && a(r[t]);
                            for (t = n.length; t--; )
                                n[t].elem !== this || null != o && n[t].queue !== o || (n[t].anim.stop(i),
                                e = !1,
                                n.splice(t, 1));
                            !e && i || C.dequeue(this, o)
                        })
                    },
                    finish: function(a) {
                        return !1 !== a && (a = a || "fx"),
                        this.each(function() {
                            var e, t = C._data(this), n = t[a + "queue"], r = t[a + "queueHooks"], o = C.timers, i = n ? n.length : 0;
                            for (t.finish = !0,
                            C.queue(this, a, []),
                            r && r.stop && r.stop.call(this, !0),
                            e = o.length; e--; )
                                o[e].elem === this && o[e].queue === a && (o[e].anim.stop(!0),
                                o.splice(e, 1));
                            for (e = 0; e < i; e++)
                                n[e] && n[e].finish && n[e].finish.call(this);
                            delete t.finish
                        })
                    }
                }),
                C.each(["toggle", "show", "hide"], function(e, r) {
                    var o = C.fn[r];
                    C.fn[r] = function(e, t, n) {
                        return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(dt(r, !0), e, t, n)
                    }
                }),
                C.each({
                    slideDown: dt("show"),
                    slideUp: dt("hide"),
                    slideToggle: dt("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(e, r) {
                    C.fn[e] = function(e, t, n) {
                        return this.animate(r, e, t, n)
                    }
                }),
                C.timers = [],
                C.fx.tick = function() {
                    var e, t = C.timers, n = 0;
                    for (Ze = C.now(); n < t.length; n++)
                        (e = t[n])() || t[n] !== e || t.splice(n--, 1);
                    t.length || C.fx.stop(),
                    Ze = void 0
                }
                ,
                C.fx.timer = function(e) {
                    C.timers.push(e),
                    e() ? C.fx.start() : C.timers.pop()
                }
                ,
                C.fx.interval = 13,
                C.fx.start = function() {
                    et = et || setInterval(C.fx.tick, C.fx.interval)
                }
                ,
                C.fx.stop = function() {
                    clearInterval(et),
                    et = null
                }
                ,
                C.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                },
                C.fn.delay = function(r, e) {
                    return r = C.fx && C.fx.speeds[r] || r,
                    e = e || "fx",
                    this.queue(e, function(e, t) {
                        var n = setTimeout(e, r);
                        t.stop = function() {
                            clearTimeout(n)
                        }
                    })
                }
                ,
                (rt = B.createElement("div")).setAttribute("className", "t"),
                rt.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                p = rt.getElementsByTagName("a")[0],
                nt = (tt = B.createElement("select")).appendChild(B.createElement("option")),
                _ = rt.getElementsByTagName("input")[0],
                p.style.cssText = "top:1px",
                A.getSetAttribute = "t" !== rt.className,
                A.style = /top/.test(p.getAttribute("style")),
                A.hrefNormalized = "/a" === p.getAttribute("href"),
                A.checkOn = !!_.value,
                A.optSelected = nt.selected,
                A.enctype = !!B.createElement("form").enctype,
                tt.disabled = !0,
                A.optDisabled = !nt.disabled,
                (_ = B.createElement("input")).setAttribute("value", ""),
                A.input = "" === _.getAttribute("value"),
                _.value = "t",
                _.setAttribute("type", "radio"),
                A.radioValue = "t" === _.value;
                var ft = /\r/g;
                C.fn.extend({
                    val: function(t) {
                        var n, e, r, o = this[0];
                        return arguments.length ? (r = C.isFunction(t),
                        this.each(function(e) {
                            1 === this.nodeType && (null == (e = r ? t.call(this, e, C(this).val()) : t) ? e = "" : "number" == typeof e ? e += "" : C.isArray(e) && (e = C.map(e, function(e) {
                                return null == e ? "" : e + ""
                            })),
                            (n = C.valHooks[this.type] || C.valHooks[this.nodeName.toLowerCase()]) && "set"in n && void 0 !== n.set(this, e, "value") || (this.value = e))
                        })) : o ? (n = C.valHooks[o.type] || C.valHooks[o.nodeName.toLowerCase()]) && "get"in n && void 0 !== (e = n.get(o, "value")) ? e : "string" == typeof (e = o.value) ? e.replace(ft, "") : null == e ? "" : e : void 0
                    }
                }),
                C.extend({
                    valHooks: {
                        option: {
                            get: function(e) {
                                var t = C.find.attr(e, "value");
                                return null != t ? t : C.trim(C.text(e))
                            }
                        },
                        select: {
                            get: function(e) {
                                for (var t, n = e.options, r = e.selectedIndex, o = "select-one" === e.type || r < 0, i = o ? null : [], a = o ? r + 1 : n.length, s = r < 0 ? a : o ? r : 0; s < a; s++)
                                    if (!(!(t = n[s]).selected && s !== r || (A.optDisabled ? t.disabled : null !== t.getAttribute("disabled")) || t.parentNode.disabled && C.nodeName(t.parentNode, "optgroup"))) {
                                        if (t = C(t).val(),
                                        o)
                                            return t;
                                        i.push(t)
                                    }
                                return i
                            },
                            set: function(e, t) {
                                for (var n, r, o = e.options, i = C.makeArray(t), a = o.length; a--; )
                                    if (r = o[a],
                                    0 <= C.inArray(C.valHooks.option.get(r), i))
                                        try {
                                            r.selected = n = !0
                                        } catch (e) {
                                            r.scrollHeight
                                        }
                                    else
                                        r.selected = !1;
                                return n || (e.selectedIndex = -1),
                                o
                            }
                        }
                    }
                }),
                C.each(["radio", "checkbox"], function() {
                    C.valHooks[this] = {
                        set: function(e, t) {
                            return C.isArray(t) ? e.checked = 0 <= C.inArray(C(e).val(), t) : void 0
                        }
                    },
                    A.checkOn || (C.valHooks[this].get = function(e) {
                        return null === e.getAttribute("value") ? "on" : e.value
                    }
                    )
                });
                var ht, gt, mt = C.expr.attrHandle, At = /^(?:checked|selected)$/i, vt = A.getSetAttribute, yt = A.input;
                C.fn.extend({
                    attr: function(e, t) {
                        return U(this, C.attr, e, t, 1 < arguments.length)
                    },
                    removeAttr: function(e) {
                        return this.each(function() {
                            C.removeAttr(this, e)
                        })
                    }
                }),
                C.extend({
                    attr: function(e, t, n) {
                        var r, o, i = e.nodeType;
                        if (e && 3 !== i && 8 !== i && 2 !== i)
                            return on(e.getAttribute) === F ? C.prop(e, t, n) : (1 === i && C.isXMLDoc(e) || (t = t.toLowerCase(),
                            r = C.attrHooks[t] || (C.expr.match.bool.test(t) ? gt : ht)),
                            void 0 === n ? r && "get"in r && null !== (o = r.get(e, t)) ? o : null == (o = C.find.attr(e, t)) ? void 0 : o : null !== n ? r && "set"in r && void 0 !== (o = r.set(e, n, t)) ? o : (e.setAttribute(t, n + ""),
                            n) : void C.removeAttr(e, t))
                    },
                    removeAttr: function(e, t) {
                        var n, r, o = 0, i = t && t.match(E);
                        if (i && 1 === e.nodeType)
                            for (; n = i[o++]; )
                                r = C.propFix[n] || n,
                                C.expr.match.bool.test(n) ? yt && vt || !At.test(n) ? e[r] = !1 : e[C.camelCase("default-" + n)] = e[r] = !1 : C.attr(e, n, ""),
                                e.removeAttribute(vt ? n : r)
                    },
                    attrHooks: {
                        type: {
                            set: function(e, t) {
                                if (!A.radioValue && "radio" === t && C.nodeName(e, "input")) {
                                    var n = e.value;
                                    return e.setAttribute("type", t),
                                    n && (e.value = n),
                                    t
                                }
                            }
                        }
                    }
                }),
                gt = {
                    set: function(e, t, n) {
                        return !1 === t ? C.removeAttr(e, n) : yt && vt || !At.test(n) ? e.setAttribute(!vt && C.propFix[n] || n, n) : e[C.camelCase("default-" + n)] = e[n] = !0,
                        n
                    }
                },
                C.each(C.expr.match.bool.source.match(/\w+/g), function(e, t) {
                    var i = mt[t] || C.find.attr;
                    mt[t] = yt && vt || !At.test(t) ? function(e, t, n) {
                        var r, o;
                        return n || (o = mt[t],
                        mt[t] = r,
                        r = null != i(e, t, n) ? t.toLowerCase() : null,
                        mt[t] = o),
                        r
                    }
                    : function(e, t, n) {
                        return n ? void 0 : e[C.camelCase("default-" + t)] ? t.toLowerCase() : null
                    }
                }),
                yt && vt || (C.attrHooks.value = {
                    set: function(e, t, n) {
                        return C.nodeName(e, "input") ? void (e.defaultValue = t) : ht && ht.set(e, t, n)
                    }
                }),
                vt || (ht = {
                    set: function(e, t, n) {
                        var r = e.getAttributeNode(n);
                        return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)),
                        r.value = t += "",
                        "value" === n || t === e.getAttribute(n) ? t : void 0
                    }
                },
                mt.id = mt.name = mt.coords = function(e, t, n) {
                    return n ? void 0 : (t = e.getAttributeNode(t)) && "" !== t.value ? t.value : null
                }
                ,
                C.valHooks.button = {
                    get: function(e, t) {
                        t = e.getAttributeNode(t);
                        return t && t.specified ? t.value : void 0
                    },
                    set: ht.set
                },
                C.attrHooks.contenteditable = {
                    set: function(e, t, n) {
                        ht.set(e, "" !== t && t, n)
                    }
                },
                C.each(["width", "height"], function(e, n) {
                    C.attrHooks[n] = {
                        set: function(e, t) {
                            return "" === t ? (e.setAttribute(n, "auto"),
                            t) : void 0
                        }
                    }
                })),
                A.style || (C.attrHooks.style = {
                    get: function(e) {
                        return e.style.cssText || void 0
                    },
                    set: function(e, t) {
                        return e.style.cssText = t + ""
                    }
                });
                var bt = /^(?:input|select|textarea|button|object)$/i
                  , Ct = /^(?:a|area)$/i;
                C.fn.extend({
                    prop: function(e, t) {
                        return U(this, C.prop, e, t, 1 < arguments.length)
                    },
                    removeProp: function(e) {
                        return e = C.propFix[e] || e,
                        this.each(function() {
                            try {
                                this[e] = void 0,
                                delete this[e]
                            } catch (e) {}
                        })
                    }
                }),
                C.extend({
                    propFix: {
                        for: "htmlFor",
                        class: "className"
                    },
                    prop: function(e, t, n) {
                        var r, o, i = e.nodeType;
                        if (e && 3 !== i && 8 !== i && 2 !== i)
                            return (1 !== i || !C.isXMLDoc(e)) && (t = C.propFix[t] || t,
                            o = C.propHooks[t]),
                            void 0 !== n ? o && "set"in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get"in o && null !== (r = o.get(e, t)) ? r : e[t]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(e) {
                                var t = C.find.attr(e, "tabindex");
                                return t ? parseInt(t, 10) : bt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
                            }
                        }
                    }
                }),
                A.hrefNormalized || C.each(["href", "src"], function(e, t) {
                    C.propHooks[t] = {
                        get: function(e) {
                            return e.getAttribute(t, 4)
                        }
                    }
                }),
                A.optSelected || (C.propHooks.selected = {
                    get: function(e) {
                        e = e.parentNode;
                        return e && (e.selectedIndex,
                        e.parentNode && e.parentNode.selectedIndex),
                        null
                    }
                }),
                C.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                    C.propFix[this.toLowerCase()] = this
                }),
                A.enctype || (C.propFix.enctype = "encoding");
                var xt = /[\t\r\n\f]/g;
                C.fn.extend({
                    addClass: function(t) {
                        var e, n, r, o, i, a, s = 0, l = this.length, c = "string" == typeof t && t;
                        if (C.isFunction(t))
                            return this.each(function(e) {
                                C(this).addClass(t.call(this, e, this.className))
                            });
                        if (c)
                            for (e = (t || "").match(E) || []; s < l; s++)
                                if (r = 1 === (n = this[s]).nodeType && (n.className ? (" " + n.className + " ").replace(xt, " ") : " ")) {
                                    for (i = 0; o = e[i++]; )
                                        r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                    a = C.trim(r),
                                    n.className !== a && (n.className = a)
                                }
                        return this
                    },
                    removeClass: function(t) {
                        var e, n, r, o, i, a, s = 0, l = this.length, c = 0 === arguments.length || "string" == typeof t && t;
                        if (C.isFunction(t))
                            return this.each(function(e) {
                                C(this).removeClass(t.call(this, e, this.className))
                            });
                        if (c)
                            for (e = (t || "").match(E) || []; s < l; s++)
                                if (r = 1 === (n = this[s]).nodeType && (n.className ? (" " + n.className + " ").replace(xt, " ") : "")) {
                                    for (i = 0; o = e[i++]; )
                                        for (; 0 <= r.indexOf(" " + o + " "); )
                                            r = r.replace(" " + o + " ", " ");
                                    a = t ? C.trim(r) : "",
                                    n.className !== a && (n.className = a)
                                }
                        return this
                    },
                    toggleClass: function(o, t) {
                        var i = void 0 === o ? "undefined" : on(o);
                        return "boolean" == typeof t && "string" === i ? t ? this.addClass(o) : this.removeClass(o) : this.each(C.isFunction(o) ? function(e) {
                            C(this).toggleClass(o.call(this, e, this.className, t), t)
                        }
                        : function() {
                            if ("string" === i)
                                for (var e, t = 0, n = C(this), r = o.match(E) || []; e = r[t++]; )
                                    n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                            else
                                i !== F && "boolean" !== i || (this.className && C._data(this, "__className__", this.className),
                                this.className = !this.className && !1 !== o && C._data(this, "__className__") || "")
                        }
                        )
                    },
                    hasClass: function(e) {
                        for (var t = " " + e + " ", n = 0, r = this.length; n < r; n++)
                            if (1 === this[n].nodeType && 0 <= (" " + this[n].className + " ").replace(xt, " ").indexOf(t))
                                return !0;
                        return !1
                    }
                }),
                C.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, n) {
                    C.fn[n] = function(e, t) {
                        return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
                    }
                }),
                C.fn.extend({
                    hover: function(e, t) {
                        return this.mouseenter(e).mouseleave(t || e)
                    },
                    bind: function(e, t, n) {
                        return this.on(e, null, t, n)
                    },
                    unbind: function(e, t) {
                        return this.off(e, null, t)
                    },
                    delegate: function(e, t, n, r) {
                        return this.on(t, e, n, r)
                    },
                    undelegate: function(e, t, n) {
                        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                    }
                });
                var Bt = C.now()
                  , wt = /\?/
                  , kt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
                C.parseJSON = function(e) {
                    if (h.JSON && h.JSON.parse)
                        return h.JSON.parse(e + "");
                    var o, i = null, t = C.trim(e + "");
                    return t && !C.trim(t.replace(kt, function(e, t, n, r) {
                        return 0 === (i = o && t ? 0 : i) ? e : (o = n || t,
                        i += !r - !n,
                        "")
                    })) ? Function("return " + t)() : C.error("Invalid JSON: " + e)
                }
                ,
                C.parseXML = function(e) {
                    var t;
                    if (!e || "string" != typeof e)
                        return null;
                    try {
                        h.DOMParser ? t = (new DOMParser).parseFromString(e, "text/xml") : ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false",
                        t.loadXML(e))
                    } catch (e) {
                        t = void 0
                    }
                    return t && t.documentElement && !t.getElementsByTagName("parsererror").length || C.error("Invalid XML: " + e),
                    t
                }
                ;
                var It, Tt, St = /#.*$/, Et = /([?&])_=[^&]*/, Nt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, jt = /^(?:GET|HEAD)$/, Dt = /^\/\//, Lt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Ft = {}, Ht = {}, Ot = "*/".concat("*");
                try {
                    Tt = location.href
                } catch (e) {
                    (Tt = B.createElement("a")).href = "",
                    Tt = Tt.href
                }
                function Mt(i) {
                    return function(e, t) {
                        "string" != typeof e && (t = e,
                        e = "*");
                        var n, r = 0, o = e.toLowerCase().match(E) || [];
                        if (C.isFunction(t))
                            for (; n = o[r++]; )
                                "+" === n.charAt(0) ? (n = n.slice(1) || "*",
                                (i[n] = i[n] || []).unshift(t)) : (i[n] = i[n] || []).push(t)
                    }
                }
                function qt(t, r, o, i) {
                    var a = {}
                      , s = t === Ht;
                    function l(e) {
                        var n;
                        return a[e] = !0,
                        C.each(t[e] || [], function(e, t) {
                            t = t(r, o, i);
                            return "string" != typeof t || s || a[t] ? s ? !(n = t) : void 0 : (r.dataTypes.unshift(t),
                            l(t),
                            !1)
                        }),
                        n
                    }
                    return l(r.dataTypes[0]) || !a["*"] && l("*")
                }
                function Rt(e, t) {
                    var n, r, o = C.ajaxSettings.flatOptions || {};
                    for (r in t)
                        void 0 !== t[r] && ((o[r] ? e : n = n || {})[r] = t[r]);
                    return n && C.extend(!0, e, n),
                    e
                }
                It = Lt.exec(Tt.toLowerCase()) || [],
                C.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: Tt,
                        type: "GET",
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(It[1]),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": Ot,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /xml/,
                            html: /html/,
                            json: /json/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": C.parseJSON,
                            "text xml": C.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(e, t) {
                        return t ? Rt(Rt(e, C.ajaxSettings), t) : Rt(C.ajaxSettings, e)
                    },
                    ajaxPrefilter: Mt(Ft),
                    ajaxTransport: Mt(Ht),
                    ajax: function(e, t) {
                        "object" == (void 0 === e ? "undefined" : on(e)) && (t = e,
                        e = void 0),
                        t = t || {};
                        var n, l, c, d, u, p, r, f = C.ajaxSetup({}, t), h = f.context || f, g = f.context && (h.nodeType || h.jquery) ? C(h) : C.event, m = C.Deferred(), A = C.Callbacks("once memory"), v = f.statusCode || {}, o = {}, i = {}, y = 0, a = "canceled", b = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (2 === y) {
                                    if (!r)
                                        for (r = {}; t = Nt.exec(c); )
                                            r[t[1].toLowerCase()] = t[2];
                                    t = r[e.toLowerCase()]
                                }
                                return null == t ? null : t
                            },
                            getAllResponseHeaders: function() {
                                return 2 === y ? c : null
                            },
                            setRequestHeader: function(e, t) {
                                var n = e.toLowerCase();
                                return y || (e = i[n] = i[n] || e,
                                o[e] = t),
                                this
                            },
                            overrideMimeType: function(e) {
                                return y || (f.mimeType = e),
                                this
                            },
                            statusCode: function(e) {
                                if (e)
                                    if (y < 2)
                                        for (var t in e)
                                            v[t] = [v[t], e[t]];
                                    else
                                        b.always(e[b.status]);
                                return this
                            },
                            abort: function(e) {
                                e = e || a;
                                return p && p.abort(e),
                                s(0, e),
                                this
                            }
                        };
                        if (m.promise(b).complete = A.add,
                        b.success = b.done,
                        b.error = b.fail,
                        f.url = ((e || f.url || Tt) + "").replace(St, "").replace(Dt, It[1] + "//"),
                        f.type = t.method || t.type || f.method || f.type,
                        f.dataTypes = C.trim(f.dataType || "*").toLowerCase().match(E) || [""],
                        null == f.crossDomain && (e = Lt.exec(f.url.toLowerCase()),
                        f.crossDomain = !(!e || e[1] === It[1] && e[2] === It[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (It[3] || ("http:" === It[1] ? "80" : "443")))),
                        f.data && f.processData && "string" != typeof f.data && (f.data = C.param(f.data, f.traditional)),
                        qt(Ft, f, t, b),
                        2 === y)
                            return b;
                        for (n in (u = C.event && f.global) && 0 == C.active++ && C.event.trigger("ajaxStart"),
                        f.type = f.type.toUpperCase(),
                        f.hasContent = !jt.test(f.type),
                        l = f.url,
                        f.hasContent || (f.data && (l = f.url += (wt.test(l) ? "&" : "?") + f.data,
                        delete f.data),
                        !1 === f.cache && (f.url = Et.test(l) ? l.replace(Et, "$1_=" + Bt++) : l + (wt.test(l) ? "&" : "?") + "_=" + Bt++)),
                        f.ifModified && (C.lastModified[l] && b.setRequestHeader("If-Modified-Since", C.lastModified[l]),
                        C.etag[l] && b.setRequestHeader("If-None-Match", C.etag[l])),
                        (f.data && f.hasContent && !1 !== f.contentType || t.contentType) && b.setRequestHeader("Content-Type", f.contentType),
                        b.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Ot + "; q=0.01" : "") : f.accepts["*"]),
                        f.headers)
                            b.setRequestHeader(n, f.headers[n]);
                        if (f.beforeSend && (!1 === f.beforeSend.call(h, b, f) || 2 === y))
                            return b.abort();
                        for (n in a = "abort",
                        {
                            success: 1,
                            error: 1,
                            complete: 1
                        })
                            b[n](f[n]);
                        if (p = qt(Ht, f, t, b)) {
                            b.readyState = 1,
                            u && g.trigger("ajaxSend", [b, f]),
                            f.async && 0 < f.timeout && (d = setTimeout(function() {
                                b.abort("timeout")
                            }, f.timeout));
                            try {
                                y = 1,
                                p.send(o, s)
                            } catch (e) {
                                if (!(y < 2))
                                    throw e;
                                s(-1, e)
                            }
                        } else
                            s(-1, "No Transport");
                        function s(e, t, n, r) {
                            var o, i, a, s = t;
                            2 !== y && (y = 2,
                            d && clearTimeout(d),
                            p = void 0,
                            c = r || "",
                            b.readyState = 0 < e ? 4 : 0,
                            r = 200 <= e && e < 300 || 304 === e,
                            n && (a = function(e, t, n) {
                                for (var r, o, i, a, s = e.contents, l = e.dataTypes; "*" === l[0]; )
                                    l.shift(),
                                    void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
                                if (o)
                                    for (a in s)
                                        if (s[a] && s[a].test(o)) {
                                            l.unshift(a);
                                            break
                                        }
                                if (l[0]in n)
                                    i = l[0];
                                else {
                                    for (a in n) {
                                        if (!l[0] || e.converters[a + " " + l[0]]) {
                                            i = a;
                                            break
                                        }
                                        r = r || a
                                    }
                                    i = i || r
                                }
                                return i ? (i !== l[0] && l.unshift(i),
                                n[i]) : void 0
                            }(f, b, n)),
                            a = function(e, t, n, r) {
                                var o, i, a, s, l, c = {}, d = e.dataTypes.slice();
                                if (d[1])
                                    for (a in e.converters)
                                        c[a.toLowerCase()] = e.converters[a];
                                for (i = d.shift(); i; )
                                    if (e.responseFields[i] && (n[e.responseFields[i]] = t),
                                    !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                                    l = i,
                                    i = d.shift())
                                        if ("*" === i)
                                            i = l;
                                        else if ("*" !== l && l !== i) {
                                            if (!(a = c[l + " " + i] || c["* " + i]))
                                                for (o in c)
                                                    if ((s = o.split(" "))[1] === i && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                                                        !0 === a ? a = c[o] : !0 !== c[o] && (i = s[0],
                                                        d.unshift(s[1]));
                                                        break
                                                    }
                                            if (!0 !== a)
                                                if (a && e.throws)
                                                    t = a(t);
                                                else
                                                    try {
                                                        t = a(t)
                                                    } catch (e) {
                                                        return {
                                                            state: "parsererror",
                                                            error: a ? e : "No conversion from " + l + " to " + i
                                                        }
                                                    }
                                        }
                                return {
                                    state: "success",
                                    data: t
                                }
                            }(f, a, b, r),
                            r ? (f.ifModified && ((n = b.getResponseHeader("Last-Modified")) && (C.lastModified[l] = n),
                            (n = b.getResponseHeader("etag")) && (C.etag[l] = n)),
                            204 === e || "HEAD" === f.type ? s = "nocontent" : 304 === e ? s = "notmodified" : (s = a.state,
                            o = a.data,
                            r = !(i = a.error))) : (i = s,
                            !e && s || (s = "error",
                            e < 0 && (e = 0))),
                            b.status = e,
                            b.statusText = (t || s) + "",
                            r ? m.resolveWith(h, [o, s, b]) : m.rejectWith(h, [b, s, i]),
                            b.statusCode(v),
                            v = void 0,
                            u && g.trigger(r ? "ajaxSuccess" : "ajaxError", [b, f, r ? o : i]),
                            A.fireWith(h, [b, s]),
                            u && (g.trigger("ajaxComplete", [b, f]),
                            --C.active || C.event.trigger("ajaxStop")))
                        }
                        return b
                    },
                    getJSON: function(e, t, n) {
                        return C.get(e, t, n, "json")
                    },
                    getScript: function(e, t) {
                        return C.get(e, void 0, t, "script")
                    }
                }),
                C.each(["get", "post"], function(e, o) {
                    C[o] = function(e, t, n, r) {
                        return C.isFunction(t) && (r = r || n,
                        n = t,
                        t = void 0),
                        C.ajax({
                            url: e,
                            type: o,
                            dataType: r,
                            data: t,
                            success: n
                        })
                    }
                }),
                C._evalUrl = function(e) {
                    return C.ajax({
                        url: e,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        throws: !0
                    })
                }
                ,
                C.fn.extend({
                    wrapAll: function(t) {
                        return C.isFunction(t) ? this.each(function(e) {
                            C(this).wrapAll(t.call(this, e))
                        }) : (this[0] && (e = C(t, this[0].ownerDocument).eq(0).clone(!0),
                        this[0].parentNode && e.insertBefore(this[0]),
                        e.map(function() {
                            for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; )
                                e = e.firstChild;
                            return e
                        }).append(this)),
                        this);
                        var e
                    },
                    wrapInner: function(n) {
                        return this.each(C.isFunction(n) ? function(e) {
                            C(this).wrapInner(n.call(this, e))
                        }
                        : function() {
                            var e = C(this)
                              , t = e.contents();
                            t.length ? t.wrapAll(n) : e.append(n)
                        }
                        )
                    },
                    wrap: function(t) {
                        var n = C.isFunction(t);
                        return this.each(function(e) {
                            C(this).wrapAll(n ? t.call(this, e) : t)
                        })
                    },
                    unwrap: function() {
                        return this.parent().each(function() {
                            C.nodeName(this, "body") || C(this).replaceWith(this.childNodes)
                        }).end()
                    }
                }),
                C.expr.filters.hidden = function(e) {
                    return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !A.reliableHiddenOffsets() && "none" === (e.style && e.style.display || C.css(e, "display"))
                }
                ,
                C.expr.filters.visible = function(e) {
                    return !C.expr.filters.hidden(e)
                }
                ;
                var Wt = /%20/g
                  , zt = /\[\]$/
                  , _t = /\r?\n/g
                  , Pt = /^(?:submit|button|image|reset|file)$/i
                  , Ut = /^(?:input|select|textarea|keygen)/i;
                C.param = function(e, t) {
                    function n(e, t) {
                        t = C.isFunction(t) ? t() : null == t ? "" : t,
                        o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    }
                    var r, o = [];
                    if (void 0 === t && (t = C.ajaxSettings && C.ajaxSettings.traditional),
                    C.isArray(e) || e.jquery && !C.isPlainObject(e))
                        C.each(e, function() {
                            n(this.name, this.value)
                        });
                    else
                        for (r in e)
                            !function n(r, e, o, i) {
                                if (C.isArray(e))
                                    C.each(e, function(e, t) {
                                        o || zt.test(r) ? i(r, t) : n(r + "[" + ("object" == (void 0 === t ? "undefined" : on(t)) ? e : "") + "]", t, o, i)
                                    });
                                else if (o || "object" !== C.type(e))
                                    i(r, e);
                                else
                                    for (var t in e)
                                        n(r + "[" + t + "]", e[t], o, i)
                            }(r, e[r], t, n);
                    return o.join("&").replace(Wt, "+")
                }
                ,
                C.fn.extend({
                    serialize: function() {
                        return C.param(this.serializeArray())
                    },
                    serializeArray: function() {
                        return this.map(function() {
                            var e = C.prop(this, "elements");
                            return e ? C.makeArray(e) : this
                        }).filter(function() {
                            var e = this.type;
                            return this.name && !C(this).is(":disabled") && Ut.test(this.nodeName) && !Pt.test(e) && (this.checked || !X.test(e))
                        }).map(function(e, t) {
                            var n = C(this).val();
                            return null == n ? null : C.isArray(n) ? C.map(n, function(e) {
                                return {
                                    name: t.name,
                                    value: e.replace(_t, "\r\n")
                                }
                            }) : {
                                name: t.name,
                                value: n.replace(_t, "\r\n")
                            }
                        }).get()
                    }
                }),
                C.ajaxSettings.xhr = void 0 !== h.ActiveXObject ? function() {
                    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Gt() || function() {
                        try {
                            return new h.ActiveXObject("Microsoft.XMLHTTP")
                        } catch (e) {}
                    }()
                }
                : Gt;
                var Xt = 0
                  , $t = {}
                  , _ = C.ajaxSettings.xhr();
                function Gt() {
                    try {
                        return new h.XMLHttpRequest
                    } catch (e) {}
                }
                h.attachEvent && h.attachEvent("onunload", function() {
                    for (var e in $t)
                        $t[e](void 0, !0)
                }),
                A.cors = !!_ && "withCredentials"in _,
                (_ = A.ajax = !!_) && C.ajaxTransport(function(l) {
                    var c;
                    if (!l.crossDomain || A.cors)
                        return {
                            send: function(e, i) {
                                var t, a = l.xhr(), s = ++Xt;
                                if (a.open(l.type, l.url, l.async, l.username, l.password),
                                l.xhrFields)
                                    for (t in l.xhrFields)
                                        a[t] = l.xhrFields[t];
                                for (t in l.mimeType && a.overrideMimeType && a.overrideMimeType(l.mimeType),
                                l.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"),
                                e)
                                    void 0 !== e[t] && a.setRequestHeader(t, e[t] + "");
                                a.send(l.hasContent && l.data || null),
                                c = function(e, t) {
                                    var n, r, o;
                                    if (c && (t || 4 === a.readyState))
                                        if (delete $t[s],
                                        c = void 0,
                                        a.onreadystatechange = C.noop,
                                        t)
                                            4 !== a.readyState && a.abort();
                                        else {
                                            o = {},
                                            n = a.status,
                                            "string" == typeof a.responseText && (o.text = a.responseText);
                                            try {
                                                r = a.statusText
                                            } catch (e) {
                                                r = ""
                                            }
                                            n || !l.isLocal || l.crossDomain ? 1223 === n && (n = 204) : n = o.text ? 200 : 404
                                        }
                                    o && i(n, r, o, a.getAllResponseHeaders())
                                }
                                ,
                                l.async ? 4 === a.readyState ? setTimeout(c) : a.onreadystatechange = $t[s] = c : c()
                            },
                            abort: function() {
                                c && c(void 0, !0)
                            }
                        }
                }),
                C.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /(?:java|ecma)script/
                    },
                    converters: {
                        "text script": function(e) {
                            return C.globalEval(e),
                            e
                        }
                    }
                }),
                C.ajaxPrefilter("script", function(e) {
                    void 0 === e.cache && (e.cache = !1),
                    e.crossDomain && (e.type = "GET",
                    e.global = !1)
                }),
                C.ajaxTransport("script", function(t) {
                    if (t.crossDomain) {
                        var r, o = B.head || C("head")[0] || B.documentElement;
                        return {
                            send: function(e, n) {
                                (r = B.createElement("script")).async = !0,
                                t.scriptCharset && (r.charset = t.scriptCharset),
                                r.src = t.url,
                                r.onload = r.onreadystatechange = function(e, t) {
                                    !t && r.readyState && !/loaded|complete/.test(r.readyState) || (r.onload = r.onreadystatechange = null,
                                    r.parentNode && r.parentNode.removeChild(r),
                                    r = null,
                                    t || n(200, "success"))
                                }
                                ,
                                o.insertBefore(r, o.firstChild)
                            },
                            abort: function() {
                                r && r.onload(void 0, !0)
                            }
                        }
                    }
                });
                var Yt = []
                  , Vt = /(=)\?(?=&|$)|\?\?/;
                C.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var e = Yt.pop() || C.expando + "_" + Bt++;
                        return this[e] = !0,
                        e
                    }
                }),
                C.ajaxPrefilter("json jsonp", function(e, t, n) {
                    var r, o, i, a = !1 !== e.jsonp && (Vt.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(e.data) && "data");
                    return a || "jsonp" === e.dataTypes[0] ? (r = e.jsonpCallback = C.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                    a ? e[a] = e[a].replace(Vt, "$1" + r) : !1 !== e.jsonp && (e.url += (wt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
                    e.converters["script json"] = function() {
                        return i || C.error(r + " was not called"),
                        i[0]
                    }
                    ,
                    e.dataTypes[0] = "json",
                    o = h[r],
                    h[r] = function() {
                        i = arguments
                    }
                    ,
                    n.always(function() {
                        h[r] = o,
                        e[r] && (e.jsonpCallback = t.jsonpCallback,
                        Yt.push(r)),
                        i && C.isFunction(o) && o(i[0]),
                        i = o = void 0
                    }),
                    "script") : void 0
                }),
                C.parseHTML = function(e, t, n) {
                    if (!e || "string" != typeof e)
                        return null;
                    "boolean" == typeof t && (n = t,
                    t = !1),
                    t = t || B;
                    var r = v.exec(e)
                      , n = !n && [];
                    return r ? [t.createElement(r[1])] : (r = C.buildFragment([e], t, n),
                    n && n.length && C(n).remove(),
                    C.merge([], r.childNodes))
                }
                ;
                var Qt = C.fn.load;
                C.fn.load = function(e, t, n) {
                    if ("string" != typeof e && Qt)
                        return Qt.apply(this, arguments);
                    var r, o, i, a = this, s = e.indexOf(" ");
                    return 0 <= s && (r = C.trim(e.slice(s, e.length)),
                    e = e.slice(0, s)),
                    C.isFunction(t) ? (n = t,
                    t = void 0) : t && "object" == (void 0 === t ? "undefined" : on(t)) && (i = "POST"),
                    0 < a.length && C.ajax({
                        url: e,
                        type: i,
                        dataType: "html",
                        data: t
                    }).done(function(e) {
                        o = arguments,
                        a.html(r ? C("<div>").append(C.parseHTML(e)).find(r) : e)
                    }).complete(n && function(e, t) {
                        a.each(n, o || [e.responseText, t, e])
                    }
                    ),
                    this
                }
                ,
                C.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                    C.fn[t] = function(e) {
                        return this.on(t, e)
                    }
                }),
                C.expr.filters.animated = function(t) {
                    return C.grep(C.timers, function(e) {
                        return t === e.elem
                    }).length
                }
                ;
                var Kt = h.document.documentElement;
                function Jt(e) {
                    return C.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
                }
                C.offset = {
                    setOffset: function(e, t, n) {
                        var r, o, i, a, s = C.css(e, "position"), l = C(e), c = {};
                        "static" === s && (e.style.position = "relative"),
                        i = l.offset(),
                        r = C.css(e, "top"),
                        a = C.css(e, "left"),
                        a = ("absolute" === s || "fixed" === s) && -1 < C.inArray("auto", [r, a]) ? (o = (s = l.position()).top,
                        s.left) : (o = parseFloat(r) || 0,
                        parseFloat(a) || 0),
                        null != (t = C.isFunction(t) ? t.call(e, n, i) : t).top && (c.top = t.top - i.top + o),
                        null != t.left && (c.left = t.left - i.left + a),
                        "using"in t ? t.using.call(e, c) : l.css(c)
                    }
                },
                C.fn.extend({
                    offset: function(t) {
                        if (arguments.length)
                            return void 0 === t ? this : this.each(function(e) {
                                C.offset.setOffset(this, t, e)
                            });
                        var e, n = {
                            top: 0,
                            left: 0
                        }, r = this[0], o = r && r.ownerDocument;
                        return o ? (e = o.documentElement,
                        C.contains(e, r) ? (on(r.getBoundingClientRect) !== F && (n = r.getBoundingClientRect()),
                        o = Jt(o),
                        {
                            top: n.top + (o.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                            left: n.left + (o.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                        }) : n) : void 0
                    },
                    position: function() {
                        if (this[0]) {
                            var e, t, n = {
                                top: 0,
                                left: 0
                            }, r = this[0];
                            return "fixed" === C.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(),
                            t = this.offset(),
                            (n = !C.nodeName(e[0], "html") ? e.offset() : n).top += C.css(e[0], "borderTopWidth", !0),
                            n.left += C.css(e[0], "borderLeftWidth", !0)),
                            {
                                top: t.top - n.top - C.css(r, "marginTop", !0),
                                left: t.left - n.left - C.css(r, "marginLeft", !0)
                            }
                        }
                    },
                    offsetParent: function() {
                        return this.map(function() {
                            for (var e = this.offsetParent || Kt; e && !C.nodeName(e, "html") && "static" === C.css(e, "position"); )
                                e = e.offsetParent;
                            return e || Kt
                        })
                    }
                }),
                C.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, function(t, o) {
                    var i = /Y/.test(o);
                    C.fn[t] = function(e) {
                        return U(this, function(e, t, n) {
                            var r = Jt(e);
                            return void 0 === n ? r ? o in r ? r[o] : r.document.documentElement[t] : e[t] : void (r ? r.scrollTo(i ? C(r).scrollLeft() : n, i ? n : C(r).scrollTop()) : e[t] = n)
                        }, t, e, arguments.length, null)
                    }
                }),
                C.each(["top", "left"], function(e, n) {
                    C.cssHooks[n] = Me(A.pixelPosition, function(e, t) {
                        return t ? (t = Ee(e, n),
                        He.test(t) ? C(e).position()[n] + "px" : t) : void 0
                    })
                }),
                C.each({
                    Height: "height",
                    Width: "width"
                }, function(i, a) {
                    C.each({
                        padding: "inner" + i,
                        content: a,
                        "": "outer" + i
                    }, function(r, e) {
                        C.fn[e] = function(e, t) {
                            var n = arguments.length && (r || "boolean" != typeof e)
                              , o = r || (!0 === e || !0 === t ? "margin" : "border");
                            return U(this, function(e, t, n) {
                                var r;
                                return C.isWindow(e) ? e.document.documentElement["client" + i] : 9 === e.nodeType ? (r = e.documentElement,
                                Math.max(e.body["scroll" + i], r["scroll" + i], e.body["offset" + i], r["offset" + i], r["client" + i])) : void 0 === n ? C.css(e, t, o) : C.style(e, t, n, o)
                            }, a, n ? e : void 0, n, null)
                        }
                    })
                }),
                C.fn.size = function() {
                    return this.length
                }
                ,
                C.fn.andSelf = C.fn.addBack,
                void 0 === (rn = function() {
                    return C
                }
                .apply(nn, [])) || (tn.exports = rn);
                var Zt = h.jQuery
                  , en = h.$;
                return C.noConflict = function(e) {
                    return h.$ === C && (h.$ = en),
                    e && h.jQuery === C && (h.jQuery = Zt),
                    C
                }
                ,
                (void 0 === e ? "undefined" : on(e)) === F && (h.jQuery = h.$ = C),
                C
            }
            ,
            "object" == on(tn) && "object" == on(tn.exports) ? tn.exports = e.document ? t(e, !0) : function(e) {
                if (!e.document)
                    throw new Error("jQuery requires a window with a document");
                return t(e)
            }
            : t(e)
        },
        "./node_modules/css-loader/dist/cjs.js!./src/xncolorpicker.css": /*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/xncolorpicker.css ***!
  \*********************************************************************/
        function(e, t, n) {
            n.r(t);
            var r = n(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */
            "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js")
              , o = n.n(r)
              , i = n(/*! ../node_modules/css-loader/dist/runtime/api.js */
            "./node_modules/css-loader/dist/runtime/api.js")
              , r = n.n(i)
              , i = n(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */
            "./node_modules/css-loader/dist/runtime/getUrl.js")
              , i = n.n(i)
              , n = n(/*! ./opacity.png */
            "./src/opacity.png")
              , o = r()(o())
              , n = i()(n.default);
            o.push([e.id, ".fcolorpicker-curbox{\r\n    height: 18px;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker{\r\n    width: 500px;\r\n    background: #fff;\r\n    border:1px solid #ccc;\r\n    position: fixed;\r\n    top: 100px;\r\n    padding: 6px 10px;\r\n    box-sizing: border-box;\r\n    z-index: 999999;\r\n    /*display: none;*/\r\n    user-select: none;\r\n}\r\n.fcolorpicker.canmove{\r\n    cursor: move;\r\n}\r\n.fcolorpicker>*{\r\n    cursor: auto;\r\n}\r\n.fcolorpicker .fcolor-list{\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n     margin-left: 2px;\r\n  margin-right: 18px;\r\n   padding: 14px 0 5px;\r\n    padding-bottom: 0;\r\n}\r\n.fcolorpicker .color-item{\r\n    flex:0 0 20px;\r\n    cursor: pointer;\r\n    width:20px;\r\n    height:18px;\r\n    background:rgba(239,83,79,1);\r\n    border-radius:2px 0px 0px 0px;\r\n    margin-bottom: 3px;\r\n    margin-right:2px;\r\n    position: relative;\r\n    /*background-image: url(opacity.png);*/\r\n    /*border:1px solid #E0E0E0;*/\r\n}\r\n.fcolorpicker .color-item span{\r\n    position: absolute;\r\n    display: block;\r\n    pointer-events: none;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.fcolorpicker .color-item:before{\r\n    content:'';\r\n    display: block;\r\n    background:url(" + n + ");\r\n    -webkit-background-size: contain;\r\n    background-size: 8px;\r\n    position: absolute;\r\n    width:100%;\r\n    height:100%;\r\n    top:0;\r\n    left:0;\r\n}\r\n.fcolorpicker .color-latest .color-item{\r\n    width:18px;\r\n    height:18px;\r\n    background:rgba(255,255,255,1);\r\n    border-radius:2px;\r\n    /*border:1px solid rgba(224,224,224,1);*/\r\n    flex:0 0 18px;\r\n    margin-right: 4px;\r\n    margin-bottom: 4px;\r\n}\r\n.fcolorpicker .color-btns{\r\n    /*display: flex;*/\r\n    /*justify-content: space-between;*/\r\n    padding-top: 10px;\r\n    /*align-items: center;*/\r\n}\r\n.fcolorpicker .color-btns .color-preview{\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom:6px;\r\n}\r\n.fcolorpicker .color-palette{\r\n    display: flex;\r\n    height: 131px;\r\n    /*padding: 8px;*/\r\n    margin-top:6px;\r\n}\r\n.fcolorpicker .color-palette .lightness{\r\n    flex:0 0 212px;\r\n    height: 129px;\r\n    margin-right: 8px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n    overflow: visible;\r\n}\r\n.fcolorpicker .color-palette .lightness canvas{\r\n    width:100%;\r\n    height: 100%;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-palette .hue{\r\n    flex:0 0 6px;\r\n    margin-right: 8px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n}\r\n.fcolorpicker .color-palette .hue canvas,.color-palette .opacity canvas{\r\n    height: 100%;\r\n    width: 100%;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-palette .opacity{\r\n    flex:0 0 6px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n}\r\n.fcolorpicker .color-palette .opacity canvas{\r\n    background:url(" + n + ");\r\n    -webkit-background-size: contain;\r\n    background-size: contain;\r\n}\r\n.fcolorpicker .color-palette .lightbar{\r\n    position: absolute;\r\n    border-radius: 50%;\r\n    left: 0px;\r\n    box-shadow: 0 0px 2px rgba(204,204,192,1);\r\n    pointer-events: none;\r\n    margin-top: -7px;\r\n    margin-left:-7px;\r\n    width: 14px;\r\n    height: 14px;\r\n    background: none;\r\n    border: 4px solid #e0e0e0;\r\n    box-sizing: border-box;\r\n}\r\n.fcolorpicker .color-palette .huebar,.color-palette .opacitybar{\r\n    position: absolute;\r\n    border-radius: 50%;\r\n    left: -4px;\r\n    box-shadow: 0 2px 7px -1px rgb(81 81 78);\r\n    pointer-events: none;\r\n    margin-top: -7px;\r\n    width: 14px;\r\n    height: 14px;\r\n    background: #fff;\r\n    box-sizing: border-box;\r\n    z-index:9;\r\n}\r\n.fcolorpicker .current-color{\r\n    border-radius: 2px;\r\n    flex: 0 0 26px;\r\n    height: 26px;\r\n    /*border: 1px solid #f3f3f3;*/\r\n}\r\n.current-color-value{\r\n    border: 1px solid #ccc;\r\n    line-height: 24px;\r\n    height: 24px;\r\n    margin-left: 2px;\r\n    flex:auto;\r\n    padding: 0 6px;\r\n    font-size: 12px;\r\n    border-radius: 2px;\r\n    color: #666;\r\n    background: #fff;\r\n\r\n}\r\n.current-color-value input{\r\n    width: 100%;\r\n    border: 0;\r\n    outline: none;\r\n    color: #666;\r\n}\r\n.fcolorpicker .color-btn-group{\r\n    align-items: center;\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    flex: 0 0 82px;\r\n}\r\n.fcolorpicker .color-btn-group>a{\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    text-align: center;\r\n    background: red;\r\n    color: #fff;\r\n    cursor: pointer;\r\n    height: 27px;\r\n    border-radius: 2px;\r\n    line-height: 26px;\r\n    padding: 0 10px;\r\n    margin-left: 6px;\r\n}\r\n.fcolorpicker .color-btn-group .cancel-color{\r\n    background: #d9e5f4;\r\n    color: #333;\r\n}\r\n.fcolorpicker .color-btn-group .confirm-color{\r\n    background: #57a4ff;\r\n}\r\n\r\n\r\n.fcolorpicker .color-gradient{\r\n    width: calc(100% - 18px);\r\n    margin-left: 9px;\r\n}\r\n.fcolorpicker .gradient-bar-container{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    position: relative;\r\n    padding-top:34px;\r\n}\r\n\r\n\r\n.fcolorpicker .gradient-colors{\r\n    position: absolute;\r\n    width: calc(100% - 10px);\r\n    left: 0;\r\n    top: 6px;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item{\r\n    width:16px;\r\n    height:16px;\r\n    position: absolute;\r\n    top:0;\r\n    border:1px solid #d9d7d7;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin-left: -9px;\r\n    cursor: pointer;\r\n    background: #fff;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item.on{\r\n    border:1px solid #57a4ff;\r\n    /*background: #57a4ff;*/\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item.deleting-item:after{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    width:100%;\r\n    height:100%;\r\n    background: rgba(0,0,0,.5);\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item:before{\r\n    position: absolute;\r\n    top: 12px;\r\n    color: #928f8f;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item .color{\r\n    background:blue;\r\n    width:12px;\r\n    height:12px;\r\n}\r\n.fcolorpicker .gradient-bar{\r\n    flex:auto;\r\n    height:14px;\r\n\r\n    margin-right:6px;\r\n    position: relative;\r\n}\r\n.fcolorpicker .gradient-bar span{\r\n    position: absolute;\r\n    top:0;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    display: block;\r\n}\r\n.fcolorpicker .gradient-bar:before{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    left:0;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background: url(" + n + ");\r\n    background-size: 10px;\r\n}\r\n.fcolorpicker .add-gradient{\r\n    flex:0 0 16px;\r\n    height:16px;\r\n    width:16px;\r\n    color: #57A4FF;\r\n    cursor:pointer;\r\n}\r\n.fcolorpicker .gradient-angle{\r\n    padding-top: 10px;\r\n    margin-bottom:22px;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle{\r\n    width:100%;\r\n    height:4px;\r\n    background:#d5d3d3;\r\n    position: relative;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle div{\r\n    width:14px;\r\n    height:14px;\r\n    border-radius:50%;\r\n    background:#57A4FF;\r\n    position: absolute;\r\n    top: -6px;\r\n    margin-left:-7px;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle span{\r\n    font-size: 12px;\r\n    position: absolute;\r\n    top: 8px;\r\n}\r\n.fcolorpicker .color-type{\r\n    font-size:14px;\r\n    margin-bottom:0px;\r\n}\r\n.fcolorpicker .color-type span{\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-type .on{\r\n    color: #57a4ff;\r\n    font-weight: BOLD;\r\n}\r\n.fcolorpicker .color-slidedown{\r\n    position: relative;\r\n    display: inline-block;\r\n    padding-right:14px;\r\n    cursor: pointer;\r\n    font-size: 12px;\r\n    margin-right:2px;\r\n}\r\n.fcolorpicker .color-slidedown:before{\r\n    position: absolute;\r\n    right: 0px;\r\n    top: 3px;\r\n    font-size: 12px;\r\n    color: #666;\r\n}\r\n.fcolorpicker .color-slidedown p{\r\n    margin:0;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-slidedown ul{\r\n    display: block;\r\n    position: absolute;\r\n    background: #000;\r\n    z-index: 9;\r\n    list-style: none;\r\n    padding: 0;\r\n    margin: 0;\r\n    line-height: 26px;\r\n    box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);\r\n    border-radius: 2px;\r\n    padding: 4px 10px;\r\n    font-size: 12px;\r\n    color: #fff;\r\n    white-space: nowrap;\r\n    display: none;\r\n}\r\n.fcolorpicker .color-slidedown.down ul{\r\n    display: block;\r\n}\r\n.fcolorpicker .color-slidedown ul li{\r\n    cursor: pointer;\r\n}\r\n\r\n.fcolorpicker .color-slidedown.color-format-type ul{\r\n    bottom:20px;\r\n}\r\n", "", {
                version: 3,
                sources: ["webpack://./src/xncolorpicker.css"],
                names: [],
                mappings: "AAAA;IACI,WAAW;IACX,YAAY;IACZ,eAAe;AACnB;AACA;IACI,YAAY;IACZ,gBAAgB;IAChB,qBAAqB;IACrB,eAAe;IACf,UAAU;IACV,iBAAiB;IACjB,sBAAsB;IACtB,eAAe;IACf,iBAAiB;IACjB,iBAAiB;AACrB;AACA;IACI,YAAY;AAChB;AACA;IACI,YAAY;AAChB;AACA;IACI,aAAa;IACb,eAAe;IACf,6BAA6B;IAC7B,gBAAgB;IAChB,cAAc;IACd,iBAAiB;AACrB;AACA;IACI,aAAa;IACb,eAAe;IACf,UAAU;IACV,WAAW;IACX,4BAA4B;IAC5B,6BAA6B;IAC7B,kBAAkB;IAClB,gBAAgB;IAChB,kBAAkB;IAClB,sCAAsC;IACtC,4BAA4B;AAChC;AACA;IACI,kBAAkB;IAClB,cAAc;IACd,oBAAoB;IACpB,WAAW;IACX,YAAY;AAChB;AACA;IACI,UAAU;IACV,cAAc;IACd,kDAA2B;IAC3B,gCAAgC;IAChC,oBAAoB;IACpB,kBAAkB;IAClB,UAAU;IACV,WAAW;IACX,KAAK;IACL,MAAM;AACV;AACA;IACI,UAAU;IACV,WAAW;IACX,8BAA8B;IAC9B,iBAAiB;IACjB,wCAAwC;IACxC,aAAa;IACb,iBAAiB;IACjB,kBAAkB;AACtB;AACA;IACI,iBAAiB;IACjB,kCAAkC;IAClC,iBAAiB;IACjB,uBAAuB;AAC3B;AACA;IACI,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,iBAAiB;AACrB;AACA;IACI,aAAa;IACb,aAAa;IACb,gBAAgB;IAChB,cAAc;AAClB;AACA;IACI,cAAc;IACd,aAAa;IACb,iBAAiB;IACjB,yBAAyB;IACzB,kBAAkB;IAClB,iBAAiB;AACrB;AACA;IACI,UAAU;IACV,YAAY;IACZ,eAAe;AACnB;AACA;IACI,YAAY;IACZ,iBAAiB;IACjB,yBAAyB;IACzB,kBAAkB;AACtB;AACA;IACI,YAAY;IACZ,WAAW;IACX,eAAe;AACnB;AACA;IACI,YAAY;IACZ,yBAAyB;IACzB,kBAAkB;AACtB;AACA;IACI,kDAA2B;IAC3B,gCAAgC;IAChC,wBAAwB;AAC5B;AACA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,SAAS;IACT,yCAAyC;IACzC,oBAAoB;IACpB,gBAAgB;IAChB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,gBAAgB;IAChB,yBAAyB;IACzB,sBAAsB;AAC1B;AACA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,UAAU;IACV,wCAAwC;IACxC,oBAAoB;IACpB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,gBAAgB;IAChB,sBAAsB;IACtB,SAAS;AACb;AACA;IACI,kBAAkB;IAClB,cAAc;IACd,YAAY;IACZ,6BAA6B;AACjC;AACA;IACI,sBAAsB;IACtB,iBAAiB;IACjB,YAAY;IACZ,gBAAgB;IAChB,SAAS;IACT,cAAc;IACd,eAAe;IACf,kBAAkB;IAClB,WAAW;IACX,gBAAgB;;AAEpB;AACA;IACI,WAAW;IACX,SAAS;IACT,aAAa;IACb,WAAW;AACf;AACA;IACI,mBAAmB;IACnB,aAAa;IACb,yBAAyB;IACzB,cAAc;AAClB;AACA;IACI,qBAAqB;IACrB,eAAe;IACf,kBAAkB;IAClB,eAAe;IACf,WAAW;IACX,eAAe;IACf,YAAY;IACZ,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;IACf,gBAAgB;AACpB;AACA;IACI,mBAAmB;IACnB,WAAW;AACf;AACA;IACI,mBAAmB;AACvB;;;AAGA;IACI,wBAAwB;IACxB,gBAAgB;AACpB;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,kBAAkB;IAClB,gBAAgB;AACpB;;;AAGA;IACI,kBAAkB;IAClB,wBAAwB;IACxB,OAAO;IACP,QAAQ;AACZ;AACA;IACI,UAAU;IACV,WAAW;IACX,kBAAkB;IAClB,KAAK;IACL,wBAAwB;IACxB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,iBAAiB;IACjB,eAAe;IACf,gBAAgB;AACpB;AACA;IACI,wBAAwB;IACxB,uBAAuB;AAC3B;AACA;IACI,UAAU;IACV,cAAc;IACd,kBAAkB;IAClB,UAAU;IACV,WAAW;IACX,0BAA0B;AAC9B;AACA;IACI,kBAAkB;IAClB,SAAS;IACT,cAAc;AAClB;AACA;IACI,eAAe;IACf,UAAU;IACV,WAAW;AACf;AACA;IACI,SAAS;IACT,WAAW;;IAEX,gBAAgB;IAChB,kBAAkB;AACtB;AACA;IACI,kBAAkB;IAClB,KAAK;IACL,MAAM;IACN,UAAU;IACV,WAAW;IACX,cAAc;AAClB;AACA;IACI,UAAU;IACV,cAAc;IACd,kBAAkB;IAClB,MAAM;IACN,KAAK;IACL,UAAU;IACV,WAAW;IACX,mDAA4B;IAC5B,qBAAqB;AACzB;AACA;IACI,aAAa;IACb,WAAW;IACX,UAAU;IACV,cAAc;IACd,cAAc;AAClB;AACA;IACI,iBAAiB;IACjB,kBAAkB;AACtB;AACA;IACI,UAAU;IACV,UAAU;IACV,kBAAkB;IAClB,kBAAkB;AACtB;AACA;IACI,UAAU;IACV,WAAW;IACX,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;IAClB,SAAS;IACT,gBAAgB;IAChB,eAAe;AACnB;AACA;IACI,eAAe;IACf,kBAAkB;IAClB,QAAQ;AACZ;AACA;IACI,cAAc;IACd,iBAAiB;AACrB;AACA;IACI,eAAe;AACnB;AACA;IACI,cAAc;IACd,iBAAiB;AACrB;AACA;IACI,kBAAkB;IAClB,qBAAqB;IACrB,kBAAkB;IAClB,eAAe;IACf,eAAe;IACf,gBAAgB;AACpB;AACA;IACI,kBAAkB;IAClB,UAAU;IACV,QAAQ;IACR,eAAe;IACf,WAAW;AACf;AACA;IACI,QAAQ;IACR,eAAe;AACnB;AACA;IACI,cAAc;IACd,kBAAkB;IAClB,gBAAgB;IAChB,UAAU;IACV,gBAAgB;IAChB,UAAU;IACV,SAAS;IACT,iBAAiB;IACjB,sCAAsC;IACtC,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;IACf,WAAW;IACX,mBAAmB;IACnB,aAAa;AACjB;AACA;IACI,cAAc;AAClB;AACA;IACI,eAAe;AACnB;;AAEA;IACI,WAAW;AACf",
                sourcesContent: [".fcolorpicker-curbox{\r\n      height: 30px;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker{\r\n    width: 500px;\r\n    background: #fff;\r\n    border:1px solid #ccc;\r\n    position: fixed;\r\n    top: 100px;\r\n    padding: 6px 10px;\r\n    box-sizing: border-box;\r\n    z-index: 999999;\r\n    /*display: none;*/\r\n    user-select: none;\r\n}\r\n.fcolorpicker.canmove{\r\n    cursor: move;\r\n}\r\n.fcolorpicker>*{\r\n    cursor: auto;\r\n}\r\n.fcolorpicker .fcolor-list{\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n     margin-left: 2px;\r\n    padding: 4px 0;\r\n    padding-bottom: 0;\r\n}\r\n.fcolorpicker .color-item{\r\n    flex:0 0 39px;\r\n    cursor: pointer;\r\n    width:39px;\r\n    height:18px;\r\n    background:rgba(239,83,79,1);\r\n    border-radius:2px 0px 0px 0px;\r\n    margin-bottom: 1px;\r\n    margin-right:1px;\r\n    position: relative;\r\n    /*background-image: url(opacity.png);*/\r\n    /*border:1px solid #E0E0E0;*/\r\n}\r\n.fcolorpicker .color-item span{\r\n    position: absolute;\r\n    display: block;\r\n    pointer-events: none;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.fcolorpicker .color-item:before{\r\n    content:'';\r\n    display: block;\r\n    background:url(opacity.png);\r\n    -webkit-background-size: contain;\r\n    background-size: 8px;\r\n    position: absolute;\r\n    width:100%;\r\n    height:100%;\r\n    top:0;\r\n    left:0;\r\n}\r\n.fcolorpicker .color-latest .color-item{\r\n    width:18px;\r\n    height:18px;\r\n    background:rgba(255,255,255,1);\r\n    border-radius:2px;\r\n    /*border:1px solid rgba(224,224,224,1);*/\r\n    flex:0 0 18px;\r\n    margin-right: 4px;\r\n    margin-bottom: 4px;\r\n}\r\n.fcolorpicker .color-btns{\r\n    /*display: flex;*/\r\n    /*justify-content: space-between;*/\r\n    padding-top: 10px;\r\n    /*align-items: center;*/\r\n}\r\n.fcolorpicker .color-btns .color-preview{\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom:6px;\r\n}\r\n.fcolorpicker .color-palette{\r\n    display: flex;\r\n    height: 131px;\r\n    /*padding: 8px;*/\r\n    margin-top:6px;\r\n}\r\n.fcolorpicker .color-palette .lightness{\r\n    flex:0 0 212px;\r\n    height: 129px;\r\n    margin-right: 8px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n    overflow: visible;\r\n}\r\n.fcolorpicker .color-palette .lightness canvas{\r\n    width:100%;\r\n    height: 100%;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-palette .hue{\r\n    flex:0 0 6px;\r\n    margin-right: 8px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n}\r\n.fcolorpicker .color-palette .hue canvas,.color-palette .opacity canvas{\r\n    height: 100%;\r\n    width: 100%;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-palette .opacity{\r\n    flex:0 0 6px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n}\r\n.fcolorpicker .color-palette .opacity canvas{\r\n    background:url(opacity.png);\r\n    -webkit-background-size: contain;\r\n    background-size: contain;\r\n}\r\n.fcolorpicker .color-palette .lightbar{\r\n    position: absolute;\r\n    border-radius: 50%;\r\n    left: 0px;\r\n    box-shadow: 0 0px 2px rgba(204,204,192,1);\r\n    pointer-events: none;\r\n    margin-top: -7px;\r\n    margin-left:-7px;\r\n    width: 14px;\r\n    height: 14px;\r\n    background: none;\r\n    border: 4px solid #e0e0e0;\r\n    box-sizing: border-box;\r\n}\r\n.fcolorpicker .color-palette .huebar,.color-palette .opacitybar{\r\n    position: absolute;\r\n    border-radius: 50%;\r\n    left: -4px;\r\n    box-shadow: 0 2px 7px -1px rgb(81 81 78);\r\n    pointer-events: none;\r\n    margin-top: -7px;\r\n    width: 14px;\r\n    height: 14px;\r\n    background: #fff;\r\n    box-sizing: border-box;\r\n    z-index:9;\r\n}\r\n.fcolorpicker .current-color{\r\n    border-radius: 2px;\r\n    flex: 0 0 26px;\r\n    height: 26px;\r\n    /*border: 1px solid #f3f3f3;*/\r\n}\r\n.current-color-value{\r\n    border: 1px solid #ccc;\r\n    line-height: 24px;\r\n    height: 24px;\r\n    margin-left: 2px;\r\n    flex:auto;\r\n    padding: 0 6px;\r\n    font-size: 12px;\r\n    border-radius: 2px;\r\n    color: #666;\r\n    background: #fff;\r\n\r\n}\r\n.current-color-value input{\r\n    width: 100%;\r\n    border: 0;\r\n    outline: none;\r\n    color: #666;\r\n}\r\n.fcolorpicker .color-btn-group{\r\n    align-items: center;\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    flex: 0 0 82px;\r\n}\r\n.fcolorpicker .color-btn-group>a{\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    text-align: center;\r\n    background: red;\r\n    color: #fff;\r\n    cursor: pointer;\r\n    height: 27px;\r\n    border-radius: 2px;\r\n    line-height: 26px;\r\n    padding: 0 10px;\r\n    margin-left: 6px;\r\n}\r\n.fcolorpicker .color-btn-group .cancel-color{\r\n    background: #d9e5f4;\r\n    color: #333;\r\n}\r\n.fcolorpicker .color-btn-group .confirm-color{\r\n    background: #57a4ff;\r\n}\r\n\r\n\r\n.fcolorpicker .color-gradient{\r\n    width: calc(100% - 18px);\r\n    margin-left: 9px;\r\n}\r\n.fcolorpicker .gradient-bar-container{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    position: relative;\r\n    padding-top:34px;\r\n}\r\n\r\n\r\n.fcolorpicker .gradient-colors{\r\n    position: absolute;\r\n    width: calc(100% - 10px);\r\n    left: 0;\r\n    top: 6px;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item{\r\n    width:16px;\r\n    height:16px;\r\n    position: absolute;\r\n    top:0;\r\n    border:1px solid #d9d7d7;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin-left: -9px;\r\n    cursor: pointer;\r\n    background: #fff;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item.on{\r\n    border:1px solid #57a4ff;\r\n    /*background: #57a4ff;*/\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item.deleting-item:after{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    width:100%;\r\n    height:100%;\r\n    background: rgba(0,0,0,.5);\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item:before{\r\n    position: absolute;\r\n    top: 12px;\r\n    color: #928f8f;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item .color{\r\n    background:blue;\r\n    width:12px;\r\n    height:12px;\r\n}\r\n.fcolorpicker .gradient-bar{\r\n    flex:auto;\r\n    height:14px;\r\n\r\n    margin-right:6px;\r\n    position: relative;\r\n}\r\n.fcolorpicker .gradient-bar span{\r\n    position: absolute;\r\n    top:0;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    display: block;\r\n}\r\n.fcolorpicker .gradient-bar:before{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    left:0;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background: url(opacity.png);\r\n    background-size: 10px;\r\n}\r\n.fcolorpicker .add-gradient{\r\n    flex:0 0 16px;\r\n    height:16px;\r\n    width:16px;\r\n    color: #57A4FF;\r\n    cursor:pointer;\r\n}\r\n.fcolorpicker .gradient-angle{\r\n    padding-top: 10px;\r\n    margin-bottom:22px;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle{\r\n    width:100%;\r\n    height:4px;\r\n    background:#d5d3d3;\r\n    position: relative;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle div{\r\n    width:14px;\r\n    height:14px;\r\n    border-radius:50%;\r\n    background:#57A4FF;\r\n    position: absolute;\r\n    top: -6px;\r\n    margin-left:-7px;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle span{\r\n    font-size: 12px;\r\n    position: absolute;\r\n    top: 8px;\r\n}\r\n.fcolorpicker .color-type{\r\n    font-size:14px;\r\n    margin-bottom:0px;\r\n}\r\n.fcolorpicker .color-type span{\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-type .on{\r\n    color: #57a4ff;\r\n    font-weight: BOLD;\r\n}\r\n.fcolorpicker .color-slidedown{\r\n    position: relative;\r\n    display: inline-block;\r\n    padding-right:14px;\r\n    cursor: pointer;\r\n    font-size: 12px;\r\n    margin-right:2px;\r\n}\r\n.fcolorpicker .color-slidedown:before{\r\n    position: absolute;\r\n    right: 0px;\r\n    top: 3px;\r\n    font-size: 12px;\r\n    color: #666;\r\n}\r\n.fcolorpicker .color-slidedown p{\r\n    margin:0;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-slidedown ul{\r\n    display: block;\r\n    position: absolute;\r\n    background: #000;\r\n    z-index: 9;\r\n    list-style: none;\r\n    padding: 0;\r\n    margin: 0;\r\n    line-height: 26px;\r\n    box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);\r\n    border-radius: 2px;\r\n    padding: 4px 10px;\r\n    font-size: 12px;\r\n    color: #fff;\r\n    white-space: nowrap;\r\n    display: none;\r\n}\r\n.fcolorpicker .color-slidedown.down ul{\r\n    display: block;\r\n}\r\n.fcolorpicker .color-slidedown ul li{\r\n    cursor: pointer;\r\n}\r\n\r\n.fcolorpicker .color-slidedown.color-format-type ul{\r\n    bottom:20px;\r\n}\r\n"],
                sourceRoot: ""
            }]),
            t.default = o
        },
        "./src/xncolorpicker.css": /*!*******************************!*\
  !*** ./src/xncolorpicker.css ***!
  \*******************************/
        function(e, t, n) {
            n.r(t);
            var r = n(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */
            "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")
              , o = n.n(r)
              , r = n(/*! !!../node_modules/css-loader/dist/cjs.js!./xncolorpicker.css */
            "./node_modules/css-loader/dist/cjs.js!./src/xncolorpicker.css")
              , n = {
                insert: "head",
                singleton: !1
            };
            o()(r.default, n);
            t.default = r.default.locals || {}
        },
        "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js": /*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
        function(e, t, o) {
            var n, r, s = function() {
                return n = void 0 === n ? Boolean(window && document && document.all && !window.atob) : n
            }, i = (r = {},
            function(e) {
                if (void 0 === r[e]) {
                    var t = document.querySelector(e);
                    if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement)
                        try {
                            t = t.contentDocument.head
                        } catch (e) {
                            t = null
                        }
                    r[e] = t
                }
                return r[e]
            }
            ), c = [];
            function d(e) {
                for (var t = -1, n = 0; n < c.length; n++)
                    if (c[n].identifier === e) {
                        t = n;
                        break
                    }
                return t
            }
            function l(e, t) {
                for (var n = {}, r = [], o = 0; o < e.length; o++) {
                    var i = e[o]
                      , a = t.base ? i[0] + t.base : i[0]
                      , s = n[a] || 0
                      , l = "".concat(a, " ").concat(s);
                    n[a] = s + 1;
                    s = d(l),
                    i = {
                        css: i[1],
                        media: i[2],
                        sourceMap: i[3]
                    };
                    -1 !== s ? (c[s].references++,
                    c[s].updater(i)) : c.push({
                        identifier: l,
                        updater: function(t, e) {
                            var n, r, o;
                            {
                                var i;
                                o = e.singleton ? (i = g++,
                                n = h = h || u(e),
                                r = f.bind(null, n, i, !1),
                                f.bind(null, n, i, !0)) : (n = u(e),
                                r = function(e, t, n) {
                                    var r = n.css
                                      , o = n.media
                                      , n = n.sourceMap;
                                    o ? e.setAttribute("media", o) : e.removeAttribute("media");
                                    n && "undefined" != typeof btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n)))), " */"));
                                    if (e.styleSheet)
                                        e.styleSheet.cssText = r;
                                    else {
                                        for (; e.firstChild; )
                                            e.removeChild(e.firstChild);
                                        e.appendChild(document.createTextNode(r))
                                    }
                                }
                                .bind(null, n, e),
                                function() {
                                    var e;
                                    null !== (e = n).parentNode && e.parentNode.removeChild(e)
                                }
                                )
                            }
                            return r(t),
                            function(e) {
                                e ? e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap || r(t = e) : o()
                            }
                        }(i, t),
                        references: 1
                    }),
                    r.push(l)
                }
                return r
            }
            function u(e) {
                var t, n = document.createElement("style"), r = e.attributes || {};
                if (void 0 !== r.nonce || (t = o.nc) && (r.nonce = t),
                Object.keys(r).forEach(function(e) {
                    n.setAttribute(e, r[e])
                }),
                "function" == typeof e.insert)
                    e.insert(n);
                else {
                    e = i(e.insert || "head");
                    if (!e)
                        throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    e.appendChild(n)
                }
                return n
            }
            var a, p = (a = [],
            function(e, t) {
                return a[e] = t,
                a.filter(Boolean).join("\n")
            }
            );
            function f(e, t, n, r) {
                n = n ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
                e.styleSheet ? e.styleSheet.cssText = p(t, n) : (r = document.createTextNode(n),
                (n = e.childNodes)[t] && e.removeChild(n[t]),
                n.length ? e.insertBefore(r, n[t]) : e.appendChild(r))
            }
            var h = null
              , g = 0;
            e.exports = function(e, i) {
                (i = i || {}).singleton || "boolean" == typeof i.singleton || (i.singleton = s());
                var a = l(e = e || [], i);
                return function(e) {
                    if (e = e || [],
                    "[object Array]" === Object.prototype.toString.call(e)) {
                        for (var t = 0; t < a.length; t++) {
                            var n = d(a[t]);
                            c[n].references--
                        }
                        for (var e = l(e, i), r = 0; r < a.length; r++) {
                            var o = d(a[r]);
                            0 === c[o].references && (c[o].updater(),
                            c.splice(o, 1))
                        }
                        a = e
                    }
                }
            }
        },
        "./src/opacity.png": /*!*************************!*\
  !*** ./src/opacity.png ***!
  \*************************/
        function(e, t, n) {
            n.r(t),
            t.default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA5SURBVHgB7dOxDQAgDANBgxjE+0/lTYARXKSIIn9tXRNl3R+MJDkzbBQXMGAH8LgfQNLa5SgBR4IPUi8JxinXq5EAAAAASUVORK5CYII="
        }
    }
      , r = {};
    function l(e) {
        if (r[e])
            return r[e].exports;
        var t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e](t, t.exports, l),
        t.loaded = !0,
        t.exports
    }
    l.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return l.d(t, {
            a: t
        }),
        t
    }
    ,
    l.d = function(e, t) {
        for (var n in t)
            l.o(t, n) && !l.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    l.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    l.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    l.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        /*!******************************!*\
  !*** ./src/xncolorpicker.js ***!
  \******************************/
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , s = e(l(/*! ./jquery.min.js */
        "./src/jquery.min.js"))
          , r = e(l(/*! ./colorFormat.min.js */
        "./src/colorFormat.min.js"));
        function e(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        //! XNColorPicker.js
        //! https://github.com/fanaiai/xncolorpicker
        //! version : 1.0.1
        //! authors : 范媛媛
        //! create date:2019/05/14
        //! update date:2021/01/06 v1.0.0发布
        //! update date:2021/01/06 v1.1.0发布
        l(/*! ./xncolorpicker.css */
        "./src/xncolorpicker.css");
        var o, t, i = (i = document.getElementsByTagName("script"))[i.length - 1], i = (i = document.querySelector ? i.src : i.getAttribute("src", 4)).substr(0, +i.lastIndexOf("/"));
        function a(e) {
            this.pos = {
                left: 0,
                top: 0
            },
            this.moved = !1,
            this.id = this.getRandomString(),
            this.btns = {
                cn: ["取消", "确定"],
                en: ["Cancel", "OK"]
            },
            this.colorTypeList = {
                cn: {
                    single: "纯色",
                    "linear-gradient": "线性渐变",
                    "radial-gradient": "径向渐变"
                },
                en: {
                    single: "Solid",
                    "linear-gradient": "Linear",
                    "radial-gradient": "Radial"
                }
            },
            this.option = s.default.extend(!0, {}, t, e),
            e.prevcolors ? this.option.prevcolors = e.prevcolors : this.option.prevcolors = t.prevcolors,
            this.option.colorTypeOption = this.option.colorTypeOption ? this.option.colorTypeOption.split(",") : ["single", "linear-gradient", "radial-gradient"],
            this.currentColorFormat = this.option.format,
            this.option.selector,
            this.$el = (0,
            s.default)(this.option.selector),
            this.lastColor = this.option.color,
            this.initCurrentColorBox()
        }
        !function(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t]
                  , r = document.getElementsByTagName("head")[0]
                  , o = document.createElement("link");
                o.type = "text/css",
                o.rel = "stylesheet",
                o.href = n,
                r.appendChild(o)
            }
        }(["https://at.alicdn.com/t/font_2330183_hjqs7adohe.css"]),
        o = window,
        t = {
            color: "#ffffff",
            selector: "",
            showprecolor: !0,
            prevcolors: ["#EF534F", "#BA69C8", "#FFD54F", "#81C784", "#7FDEEA", "#90CAF9", "#F44436", "#AB47BC", "#FFC106", "#66BB6A", "#25C6DA", "#4EC3F7", "#E53934", "#9D27B0", "#FFA726", "#4CAF50", "#00ACC1", "#29B6F6", "#D32E30", "#8F24AA", "#FB8C01", "#378E3C", "#0097A7", "#02AAF4", "#C62928", "#7B1FA2", "#F57C02", "#2F7D31", "#00838F", "#029BE5", "#B71B1C", "#6A1B9A", "#EF6C00", "#34691D", "#006164", "#0388D1", "#980A0B", "#4A148C", "#E65100", "#1A5E20", "#004D41", "#01579B", "#00000000", "#FFFFFF", "#DBDBDB", "#979797", "#606060", "#000000"],
            showhistorycolor: !0,
            historycolornum: 16,
            format: "rgba",
            showPalette: !0,
            show: !1,
            alwaysShow: !1,
            lang: "cn",
            colorTypeOption: "single,linear-gradient,radial-gradient",
            canMove: !0,
            autoConfirm: !1
        },
        a.prototype = {
            getRandomString: function(e) {
                e = e || 8;
                for (var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz", n = t.length, r = "", o = 0; o < e; o++)
                    r += t.charAt(Math.floor(Math.random() * n));
                return r
            },
            initCurrentColorBox: function() {
                var t = this;
                this.curcolordom = document.createElement("div"),
                this.curcolordom.classList.add("fcolorpicker-curbox"),
                this.curcolordom.style.background = this.option.color,
                this.$el.empty().append(this.curcolordom),
                t.init(),
                this.curcolordom.onclick = function(e) {
                    t.changeShow()
                }
                ,
                this.option.show && (0,
                s.default)(t.dom).show()
            },
            changeShow: function(e) {
                (0,
                s.default)(this.dom) && "block" == (0,
                s.default)(this.dom).css("display") || e ? this.option.alwaysShow || ((0,
                s.default)(this.dom).empty(),
                (0,
                s.default)(this.dom).hide(),
                this.moved = !1) : (this.init(),
                (0,
                s.default)(this.dom).show())
            },
            init: function() {
                this.initDom(),
                this.initColorFormat(),
                this.option.showPalette ? (this.initPalette(),
                this.initColorBand(),
                this.initOpacity()) : this.dom.querySelector(".color-palette").style.display = "none",
                this.setPrevColors(),
                this.getHistoryColors(),
                this.setPosition(),
                this.addPosEvent(),
                this.changeColorFormatType(),
                (0,
                s.default)(this.dom).hide()
            },
            rendGradientDom: function() {},
            initDom: function() {
                var e = !0
                  , t = document.body.querySelector(".fcolorpicker#" + this.id);
                t || ((t = document.createElement("div")).classList.add("fcolorpicker"),
                this.option.canMove && t.classList.add("canmove"),
                t.id = this.id,
                e = !1);
                for (var n = "", r = 0; r < this.option.colorTypeOption.length; r++) {
                    var o = this.option.colorTypeOption[r];
                    n += '<li class="color-type-item" data-type="' + o + '">' + this.colorTypeList[this.option.lang][o] + "</li>"
                }
    

                var i = `<div style="display:flex">
                <div style="width:255px">
                    <div class="color-recommend fcolor-list">
                    </div>
                    <div style="font-size:14px;font-weight:bold;margin-top:10px;padding:10px 0 0 0;border-top:1px solid #ddd;margin-right:18px">历史记录</div>
                    <div class="color-latest fcolor-list">
                    </div>
                </div>
                <div>
                    <div class="color-type color-slidedown iconfontcolorpicker iconcolorpickerxiala">
                        <p class="color-slidedown-curbox"></p>
                        <ul>
                            ${n}
                        </ul>
                    </div>
                    <div class="color-gradient">
                        <div class="gradient-bar-container">
                            <div class="gradient-colors">
                                <div class="gradient-item iconfontcolorpicker iconcolorpicker1" style="left:10%">
                                    <div class="color"></div>
                                </div>
                                <div class="gradient-item iconfontcolorpicker iconcolorpicker1" style="left:20%">
                                    <div class="color"></div>
                                </div>
                            </div>
                            <div class="gradient-bar">
                                <span></span>
                            </div>
                           
                        </div>
                        <div class="gradient-angle">
                            <div class="current-angle">
                                <div class="angle-bar"></div>
                                <span>30°</span>
                            </div>
                        </div>
                    </div>
                    <div class="color-palette">
                        <div class="lightness">
                            <div class="lightbar"></div>
                        </div>
                        <div class="hue">
                            <div class="huebar"></div>
                        </div>
                        <div class="opacity">
                            <div class="opacitybar"></div>
                        </div>
                    </div>
                    <div class="color-btns">
                        <div class="color-preview">
                            <div class="color-format-type color-slidedown iconfontcolorpicker iconcolorpickerxiala">
                                <p class="color-slidedown-curbox">RGBA</p>
                                <ul>
                                    <li class="color-format-type-item" data-type="rgba">RGBA</li>
                                    <li class="color-format-type-item" data-type="hex">HEX</li>
                                    <li class="color-format-type-item" data-type="hsla">HSLA</li>
                                </ul>
                            </div>
                            <div class="current-color"></div>
                            <div class="current-color-value">
                                <input type="text" onfocus="this.select()">
                            </div>
                        </div>
            
                        <div class="color-btn-group">
                            <a class="cancel-color">取消</a>
                            <a class="confirm-color">确定</a>
                        </div>
                    </div>
                </div>
            </div>`
                t.innerHTML = i,
                this.dom = t,
                document.body.appendChild(this.dom),
                this.canvasSize = {
                    width: 212,
                    height: 129
                },
                this.lightbar = this.dom.querySelector(".lightbar"),
                this.huebar = this.dom.querySelector(".huebar"),
                this.opacitybar = this.dom.querySelector(".opacitybar"),
                this.option.showprecolor || (0,
                s.default)(this.dom).find(".color-recommend").hide(),
                this.option.showhistorycolor || (0,
                s.default)(this.dom).find(".color-latest").hide(),
                this.option.colorTypeOption.length < 2 && (0,
                s.default)(this.dom).find(".color-type").remove(),
                this.setPosition(),
                e || this.addEvent(),
                this.addBlurEvent()

                //数据加载

            },
            addPosEvent: function() {
                var e = this;
                o.addEventListener("scroll", function() {
                    e.setPosition()
                }),
                o.addEventListener("resize", function() {
                    e.setPosition()
                })
            },
            moveDom: function(e, t) {
                var n;
                this.dom && (this.moved = !0,
                n = t.clientX - e.x + this.pos.left,
                e = t.clientY - e.y + this.pos.top,
                this.dom.style.top = e + "px",
                this.dom.style.left = n + "px")
            },
            setPosition: function() {
                var e, t, n, r, o, i, a;
                this.dom && !this.moved && (e = document.documentElement.clientWidth,
                t = document.documentElement.clientHeight,
                r = (n = this.$el[0].querySelector("div")).getBoundingClientRect().top,
                a = n.getBoundingClientRect().left+35,
                o = (0,
                s.default)(this.dom).outerWidth(),
                i = (0,
                s.default)(this.dom).outerHeight(),
                // a = e - a <= o ? a - o - 10 : a + 10 + n.offsetWidth,
                (r = t - r < i ? r - i - n.offsetHeight : r) < 10 && (r = 10),
                this.dom.style.top = r+35 + "px",
                this.dom.style.left = a -280+ "px",
                this.pos = {
                    left: a,
                    top: r
                })
            },
            addHistoryColors: function(type) {
            
                    for (var e = this.dom.querySelector(".current-color-value input").value, t = 0; t < this.hiscolors.length; t++)
                    if ((0,
                    r.default)({
                        color: this.hiscolors[t],
                        format: this.currentColorFormat
                    }).complete == e) {
                        
                    }
                
                    if(type){
                        var it=true
                        for(var i=0;i<this.hiscolors.length;i++){
                            this.hiscolors[i]==e?it=false:''
                        }
                        if(it){
                        this.hiscolors.unshift(e)
                    }
                    }
                 
                o.localStorage.setItem("fcolorpicker", this.hiscolors.join(";")),
                this.rendHisColors()
                this.setPosition()
              
                
            },
            getHistoryColors: function() {
                var e = o.localStorage.getItem("fcolorpicker");
                this.hiscolors = (e || "").split(";"),
                this.rendHisColors()
            },
            clearHistoryColors: function() {
                this.hiscolors = [],
                o.localStorage.setItem("fcolorpicker", this.hiscolors.join(";")),
                this.rendHisColors(),
                this.setPosition()
            },
            rendHisColors: function() {
                if (this.option.showhistorycolor) {
                    (0,
                    s.default)(this.dom).find(".color-latest").empty();
                    for (var e, t = 0; t < (this.option.historycolornum < 0 ? this.hiscolors.length : this.option.historycolornum); t++)
                        this.hiscolors[t] && "" != this.hiscolors[t] && (e = '\n                    <div class="color-item" data-color="' + this.hiscolors[t] + '">\n                    <span style="background:' + this.hiscolors[t] + '"></span>\n <span class="xuanze"></span> \n</div>\n                ',
                        (0,
                        s.default)(this.dom).find(".color-latest").append(e))
                }
            },
            setPrevColors: function() {
                if (this.option.showprecolor)
                    for (var e = 0; e < this.option.prevcolors.length; e++) {
                        var t = '\n                    <div class="color-item" data-color="' + this.option.prevcolors[e] + '">\n                    <span style="background:' + this.option.prevcolors[e] + '"></span>\n <span class="xuanze"></span>\n</div>\n                ';
                        (0,
                        s.default)(this.dom).find(".color-recommend").append(t)
                    }
            },
            addBlurEvent: function() {
                var t = this;
                this.dom.querySelector("input").onblur = function(e) {
                    t.initColorFormat( e),
                    t.fillOpacity(),
                    t.fillPalette(),
                    t.addHistoryColors()
                }
            },
            cancleFun: function() {
                this.initColorFormat(this.lastColor, !0);
                var e = {
                    colorType: this.currentColorType
                };
                "single" == this.currentColorType ? (e.color = this.color,
                this.lastColor = this.color.rgba) : (e.color = this.gradientColor,
                this.lastColor = this.gradientColor.str),
                this.changeCurColorDom(),
                this.option.onCancel(e),
                this.changeShow(!0)
            },
            getCurrentColor: function(e,type) {
                this.addHistoryColors(type);
                this.initColorFormat( this.dom.querySelector(".current-color-value input").value, !0);
              
                var t = {
                    colorType: this.currentColorType
                };
                return "single" == this.currentColorType ? (t.color = this.color,
                e && (this.lastColor = this.color.rgba)) : (t.color = this.gradientColor,
                e && (this.lastColor = this.gradientColor.str)),
                this.changeCurColorDom(),
                t
            },
            addEvent: function() {
                var r = this
                  , o = null
                  , i = this
                  , a = {
                    top: 0,
                    left: 0,
                    bartop: 0,
                    isGradientBar: !1,
                    $ele: null
                };
                i.dom.addEventListener("mousedown", function(e) {
                    var t, n = (0,
                    s.default)(e.target);
                    o = null,
                  
                    0 < n.parents(".lightness").length && (o = "lightness"),
                
                    0 < n.parents(".hue").length && (o = "hue",
                    t = 100 * e.offsetY / i.canvasSize.height,
                    i.huebar.style.top = t.toFixed(2) + "%",
                    a.bartop = parseFloat(i.huebar.style.top)),
                    0 < n.parents(".opacity").length && (o = "opacity",
                    t = 100 * e.offsetY / i.canvasSize.height,
                    i.opacitybar.style.top = t.toFixed(2) + "%",
                    a.bartop = parseFloat(i.opacitybar.style.top)),
                    a.x = e.clientX,
                    a.y = e.clientY,
                    o && i.changeColor(o, e, null),
                    (n = n.parents(".gradient-item")[0] ? n.parents(".gradient-item") : n).hasClass("gradient-item") && (a.isGradientBar = !0,
                    r.gradientIndex = n.index(),
                    r.updateGradientBar(),
                    r.setCurrentGradientColor(),
                    a.$ele = n), 
                    n.hasClass("add-gradient") && r.gradientColor.arry.colors.length<3 &&(
                        r.gradientColor.arry.colors.push({
                        per: 100,
                        color: "#ffffff"
                    }),
                    r.gradientColor = r.revertGradientToString(r.gradientColor.arry),
                    r.gradientIndex = r.gradientColor.arry.colors.length - 1,
                    r.rendInputValue(),
                    r.rendGradientColors(),
                    r.updateGradientBar()),
                    n.hasClass("angle-bar") && (a.isGradientBar = !1,
                    a.isAngleBar = !0),
                    n[0] == r.dom && r.option.canMove ? a.isMove = !0 : a.isMove = !1
                    0 < n.parents(".gradient-colors").length && (i.fillPalette())
                }),
                document.addEventListener("mousemove", function(e) {
                    var t;
                    o ? i.changeColor(o, e, a) : a.isGradientBar ? (t = (100 * (e.clientX - (0,
                    s.default)(r.dom).find(".gradient-colors")[0].getBoundingClientRect().left) / (0,
                    s.default)(r.dom).find(".gradient-colors")[0].getBoundingClientRect().width).toFixed(1),
                    r.gradientColor.arry.colors.length < 3 ? (t = 100 < t ? 100 : t) < 0 && (t = 0) : -5 <= (t = 100 < t && t <= 105 ? 100 : t) && t < 0 && (t = 0),
                    r.gradientColor.arry.colors[r.gradientIndex].per = t,
                    a.$ele.css({
                        left: t + "%"
                    }),
                    r.updateGradientColors(!0),
                    r.changeCurColorDom(),
                    t < -5 || 105 < t ? a.$ele.addClass("deleting-item") : a.$ele.removeClass("deleting-item")) : a.isAngleBar && (360 < (t = (t = (360 * (e.clientX - (0,
                    s.default)(r.dom).find(".gradient-angle")[0].getBoundingClientRect().left) / (0,
                    s.default)(r.dom).find(".gradient-angle")[0].getBoundingClientRect().width).toFixed(1)) < 0 ? 0 : t) && (t = 360),
                    r.gradientColor.arry.angle = t,
                    r.updateAngleBar(),
                    r.updateGradientColors(),
                    r.changeCurColorDom()),
                    a.isMove && r.moveDom(a, e)
                }),
                document.addEventListener("mouseup", function(e) {
                    var t;
                    a.isGradientBar && (t = (100 * (e.clientX - (0,
                    s.default)(r.dom).find(".gradient-colors")[0].getBoundingClientRect().left) / (0,
                    s.default)(r.dom).find(".gradient-colors")[0].getBoundingClientRect().width).toFixed(1),
                    2 < r.gradientColor.arry.colors.length && (105 < t || t < -5) && (r.gradientColor.arry.colors.splice(r.gradientIndex, 1),
                    a.$ele.remove(),
                    r.updateGradientBar(),
                    r.gradientColor = r.revertGradientToString(r.gradientColor.arry),
                    r.rendInputValue()),
                    t = i.getCurrentColor(r.option.autoConfirm),
                    i.option.onChange(t),
                    r.option.autoConfirm && r.option.onConfirm(t)),
                    (o || a.isAngleBar) && (t = i.getCurrentColor(r.option.autoConfirm),
                    i.option.onChange(t),
                    r.option.autoConfirm && r.option.onConfirm(t)),
                    o = null,
                    a.isGradientBar = !1,
                    a.isAngleBar = !1,
                    a.isMove && (t = e.clientX - a.x + r.pos.left,
                    e = e.clientY - a.y + r.pos.top,
                    r.pos.left = t,
                    r.pos.top = e),
                    a.isMove = !1
                }),
                this.dom.addEventListener("click", function(e) {
                    e.stopPropagation();
                    var t, e = (0,
                    s.default)(e.target);
                    if (e.hasClass("color-item")) {
                        i.getColorFormat(e.attr("data-color")),
                        i.fillOpacity(),
                        i.fillPalette(),
                        i.addHistoryColors(),
                        "single" != r.currentColorType && (r.updateGradientColors(),
                        r.changeCurColorDom());
                        var n = i.getCurrentColor(r.option.autoConfirm);
                        return i.option.onChange(n),
                        void (r.option.autoConfirm && r.option.onConfirm(n))
                    }
                    if (e.hasClass("cancel-color") && r.cancleFun(),
                    e.hasClass("confirm-color")) {
                        n = i.getCurrentColor(!0,'true');
                        return i.option.onConfirm(n),
                        void i.changeShow(!0)
                    }
                    (e = e.hasClass("color-slidedown-curbox") ? e.parent() : e).hasClass("color-slidedown") && (e.hasClass("down") ? e.removeClass("down") : e.addClass("down")),
                    e.hasClass("color-type-item") && (e.hasClass("on") ? e.parents(".color-slidedown").removeClass("down") : (t = e.attr("data-type"),
                    r.currentColorType = t,
                    r.changeColorType())),
                    e.hasClass("color-format-type-item") && (e.hasClass("on") ? e.parents(".color-slidedown").removeClass("down") : (t = e.attr("data-type"),
                    r.currentColorFormat = t,
                    r.changeColorFormatType()))
                });
                function e(e) {
                    e.stopPropagation(),
                    i.dom && e.target != i.dom && (0,
                    s.default)(e.target).parents(".fcolorpicker")[0] != i.dom && (0,
                    s.default)(e.target)[0] != i.curcolordom && "block" == (0,
                    s.default)(i.dom).css("display") && i.cancleFun(),
                    (0,
                    s.default)(r.dom).find(".color-slidedown").not((0,
                    s.default)(e.target).parents(".color-slidedown")[0]).removeClass("down")
                }
                this.removeMouseDownEvent = function() {
                    document.removeEventListener("mousedown", e)
                }
                ,
                document.addEventListener("mousedown", e)
            },
            changeColor: function(e, t, n) {
                if (e) {
                    var r = t.offsetX
                      , o = t.offsetY;
                    if (n) {
                        var i = 100 * (t.clientY - n.y) / this.canvasSize.height + n.bartop;
                        if (99.9 < i && "lightness" != e)
                            return;
                        i < 0 && (i = 0)
                    } else
                        i = (100 * t.offsetY / this.canvasSize.height).toFixed(2);
                    switch (e) {
                    case "hue":
                        this.huebar.style.top = i + "%",
                       
                        c = "hsla(" + Math.round(360 * i / 100) + "," + this.color.hslav[1] + "%," + this.color.hslav[2] + "%," + this.color.hslav[3] + ")";
                        break;
                    case "lightness":
                
                        r = t.clientX - this.dom.querySelector(".lightness").getBoundingClientRect().left;
                        (o = t.clientY - this.dom.querySelector(".lightness").getBoundingClientRect().top) < 0 && (o = 0),
                        (r = r < 0 ? 0 : r) > this.dom.querySelector(".lightness canvas").getBoundingClientRect().width && (r = this.dom.querySelector(".lightness canvas").getBoundingClientRect().width),
                        o > this.dom.querySelector(".lightness canvas").getBoundingClientRect().height && (o = this.dom.querySelector(".lightness canvas").getBoundingClientRect().height);
                        var a = this.color.hslav[0]
                          , s = r / this.canvasSize.width * 100
                          , l = 100 - o / this.canvasSize.height * 100
                          , l = this.HSBToRGB({
                            h: a,
                            s: s,
                            b: l
                        })
                          , c = "rgba(" + l.r + "," + l.g + "," + l.b + "," + this.color.rgbav[3] + ")";
                        this.lightbar.style.top = o + "px",
                        this.lightbar.style.left = r + "px";
                        break;
                    case "opacity":
                        i = 99.2 < i ? 100 : i,
                        this.opacitybar.style.top = i + "%",
                        console.log(this.opacitybar.style.top)
                        c = "rgba(" + this.color.rgbav[0] + "," + this.color.rgbav[1] + "," + this.color.rgbav[2] + "," + ((100 - i) / 100).toFixed(2) + ")"
                    }
                    var moreColor = this.getCurrentColor(this.option.autoConfirm);
                    this.option.onChange(moreColor),
                    this.getColorFormat(c),
                    "hue" == e && (this.fillOpacity(),
                    this.fillPalette(Math.round(360 * i / 100))),
                    this.setPosition(),
                    "single" != this.currentColorType && this.updateGradientColors(),
                    this.changeCurColorDom()
                }
            },
            HSBToRGB: function(e) {
                var t = {}
                  , n = e.h
                  , r = 255 * e.s / 100
                  , o = 255 * e.b / 100;
                return 0 == r ? t.r = t.g = t.b = o : (o = n % 60 * ((e = o) - (r = (255 - r) * o / 255)) / 60,
                (n = 360 == n ? 0 : n) < 60 ? (t.r = e,
                t.b = r,
                t.g = r + o) : n < 120 ? (t.g = e,
                t.b = r,
                t.r = e - o) : n < 180 ? (t.g = e,
                t.r = r,
                t.b = r + o) : n < 240 ? (t.b = e,
                t.r = r,
                t.g = e - o) : n < 300 ? (t.b = e,
                t.g = r,
                t.r = r + o) : n < 360 ? (t.r = e,
                t.g = r,
                t.b = e - o) : (t.r = 0,
                t.g = 0,
                t.b = 0)),
                {
                    r: Math.round(t.r),
                    g: Math.round(t.g),
                    b: Math.round(t.b)
                }
            },
            updateGradientColors: function(e) {
                this.gradientColor.arry.colors[this.gradientIndex].color = this.color.rgba,
                this.updateGradientBar(),
                this.updateGradientColorItem(this.gradientIndex, this.color.rgba),
                this.gradientColor = this.revertGradientToString(this.gradientColor.arry),
                this.rendInputValue(),
                e || this.rendGradientColors()
            },
            rendInputValue: function() {
                "single" != this.currentColorType ? (this.dom.querySelector(".current-color").style.background = this.gradientColor.str,
                this.dom.querySelector(".current-color-value input").value = this.gradientColor.str) : (this.dom.querySelector(".current-color").style.background = this.color[this.currentColorFormat],
                this.dom.querySelector(".current-color-value input").value = this.color[this.currentColorFormat])
            },
            initColorBand: function() {
                var e = document.createElement("canvas");
                this.ctxhue = e.getContext("2d"),
                e.width = 10,
                e.height = this.canvasSize.height,
                this.dom.querySelector(".color-palette .hue").appendChild(e),
                this.ctxhue.rect(0, 0, 10, this.canvasSize.height);
                e = this.ctxhue.createLinearGradient(0, 0, 0, this.canvasSize.height);
                e.addColorStop(0, "rgba(255, 0, 0, 1)"),
                e.addColorStop(.17, "rgba(255, 255, 0, 1)"),
                e.addColorStop(.34, "rgba(0, 255, 0, 1)"),
                e.addColorStop(.51, "rgba(0, 255, 255, 1)"),
                e.addColorStop(.68, "rgba(0, 0, 255, 1)"),
                e.addColorStop(.85, "rgba(255, 0, 255, 1)"),
                e.addColorStop(1, "rgba(255, 0, 0, 1)"),
                this.ctxhue.fillStyle = e,
                this.ctxhue.fill()
            },
            initOpacity: function() {
                var e = document.createElement("canvas");
                this.ctxopacity = e.getContext("2d"),
                e.width = 10,
                e.height = this.canvasSize.height,
                this.dom.querySelector(".color-palette .opacity").appendChild(e),
                this.fillOpacity()
            },
            fillOpacity: function() {
                var e;
                this.ctxopacity && (this.ctxopacity.clearRect(0, 0, 10, this.canvasSize.height),
                
                (e = this.ctxlightness.createLinearGradient(0, 0, 10, this.canvasSize.height)).addColorStop(0, "rgba(" + this.color.rgbav[0] + "," + this.color.rgbav[1] + "," + this.color.rgbav[2] + ",1)"),
                e.addColorStop(1, "rgba(" + this.color.rgbav[0] + "," + this.color.rgbav[1] + "," + this.color.rgbav[2] + ",0)"),
                this.ctxopacity.fillStyle = e,
                this.ctxopacity.fillRect(0, 0, 10, this.canvasSize.height))
            },
            initPalette: function() {
                this.canvas = document.createElement("canvas"),
                this.ctxlightness = this.canvas.getContext("2d"),
                this.canvas.width = this.canvasSize.width,
                this.canvas.height = this.canvasSize.height,
                this.dom.querySelector(".color-palette .lightness").appendChild(this.canvas),
                this.fillPalette()
            },
            fillPalette: function(i) {
                var e, t, n;
                this.color.hslav[0]=i?i: this.color.hslav[0]
                this.ctxlightness && (this.ctxlightness.fillStyle = "hsla(" + (i?i:this.color.hslav[0]) + ",100%,50%,1)",
                e = this.canvasSize.width,
                t = this.canvasSize.height,
                this.ctxlightness.fillRect(0, 0, e, t),
                (n = this.ctxlightness.createLinearGradient(0, 0, e, 0)).addColorStop(0, "rgba(255,255,255,1)"),
                n.addColorStop(1, "rgba(255,255,255,0)"),
                this.ctxlightness.fillStyle = n,
                this.ctxlightness.fillRect(0, 0, e, t),
                (n = this.ctxlightness.createLinearGradient(0, 0, 0, t)).addColorStop(0, "rgba(0,0,0,0)"),
                n.addColorStop(1, "rgba(0,0,0,1)"),
                this.ctxlightness.fillStyle = n,
                this.ctxlightness.fillRect(0, 0, e, t),
                this.updatelightbar())
            },
            updatelightbar: function() {
                this.lightbar = this.dom.querySelector(".lightbar");
                var e = this.RGBToHSB({
                    r: this.color.rgbav[0],
                    g: this.color.rgbav[1],
                    b: this.color.rgbav[2]
                })
                  , t = e.s * this.canvasSize.width / 100
                  , e = (100 - e.b) * this.canvasSize.height / 100;
                this.lightbar.style.top = e + "px",
                this.lightbar.style.left = t + "px"
            },
            RGBToHSB: function(e) {
                var t = {
                    h: 0,
                    s: 0,
                    b: 0
                }
                  , n = Math.min(e.r, e.g, e.b)
                  , r = Math.max(e.r, e.g, e.b)
                  , o = r - n;
                return t.b = r,
                t.s = 0 != r ? 255 * o / r : 0,
                0 != t.s ? e.r == r ? t.h = (e.g - e.b) / o : e.g == r ? t.h = 2 + (e.b - e.r) / o : t.h = 4 + (e.r - e.g) / o : t.h = -1,
                r == n && (t.h = 0),
                t.h *= 60,
                t.h < 0 && (t.h += 360),
                t.s *= 100 / 255,
                t.b *= 100 / 255,
                t
            },
            setColor: function(e) {
                this.option.color = e,
                this.getColorFormat(e)
            },
            getColor: function(e) {
                return this.color
            },
            rgbToHex: function(e) {
                var t = Number(e.r).toString(16)
                  , n = Number(e.g).toString(16)
                  , r = Number(e.b).toString(16)
                  , o = Math.round(255 * e.o).toString(16);
                return t.length < 2 && (t = 0 + t),
                n.length < 2 && (n = 0 + n),
                r.length < 2 && (r = 0 + r),
                o.length < 2 && (o = 0 + o),
                t[0] == t[1] && n[0] == n[1] && r[0] == r[1] && (o[0],
                o[1]),
                {
                    r: t,
                    g: n,
                    b: r,
                    o: o,
                    complete: "#" + (t + n + r + (1 == e.o ? "" : o))
                }
            },
            hslToRgb: function(e, t) {
                var n, r, o, i = Number(e.h), a = Number(e.s), s = Number(e.l), l = Number(e.o);
                return 0 == a ? n = r = o = s : (n = (e = function(e, t, n) {
                    return n < 0 && (n += 1),
                    1 < n && --n,
                    n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
                }
                )(a = 2 * s - (s = s < .5 ? s * (1 + a) : s + a - s * a), s, (i /= 360) + 1 / 3),
                r = e(a, s, i),
                o = e(a, s, i - 1 / 3)),
                {
                    r: n = Math.round(255 * n),
                    g: r = Math.round(255 * r),
                    b: o = Math.round(255 * o),
                    o: l,
                    complete: t ? "rgba(" + [n, r, o, l].join(",") + ")" : "rgb(" + [n, r, o].join(",") + ")"
                }
            },
            getHsl: function(e, t) {
                var n = -1 == (e = e.toLowerCase()).indexOf("hsla") ? 0 : 1;
                e = (e = n ? e.replace("hsla", "") : e.replace("hsl", "")).replace(/\s/g, "").split(",");
                var r = Number(e[0].slice(1))
                  , o = parseInt(e[1])
                  , i = n ? parseInt(e[2]) : parseInt(e[2].slice(0, -1));
                return {
                    h: r,
                    s: o / 100,
                    l: i / 100,
                    o: e = !n || 1 < Number(e[3].slice(0, -1)) ? 1 : Number(e[3].slice(0, -1)),
                    complete: t ? "hsla(" + [r, o, i, e].join(",") + ")" : "hsl(" + [r, o, i].join(",") + ")"
                }
            },
            getRgb: function(e, t) {
                var n = -1 == (e = e.toLowerCase()).indexOf("rgba") ? 0 : 1;
                e = (e = n ? e.replace("rgba", "") : e.replace("rgb", "")).replace(/\s/g, "").split(",");
                var r = Number(e[0].slice(1))
                  , o = Number(e[1])
                  , i = n ? Number(e[2]) : Number(e[2].slice(0, -1));
                return {
                    r: r,
                    g: o,
                    b: i,
                    o: e = !n || 1 < Number(e[3].slice(0, -1)) ? 1 : Number(e[3].slice(0, -1)),
                    complete: t ? "rgba(" + [r, o, i, e].join(",") + ")" : "rgb(" + [r, o, i].join(",") + ")"
                }
            },hexToRgb: function(e, t) {
                var n, r, o, i, a = (e = e.replace("#", "")).split("");
                return 3 == e.length ? (n = parseInt(a[0] + a[0], 16),
                r = parseInt(a[1] + a[1], 16),
                o = parseInt(a[2] + a[2], 16),
                i = 1) : 4 == e.length ? (n = parseInt(a[0] + a[0], 16),
                r = parseInt(a[1] + a[1], 16),
                o = parseInt(a[2] + a[2], 16),
                i = Math.round(parseInt(a[3] + a[3], 16) / 255 * 100) / 100) : 6 == e.length ? (n = parseInt(a[0] + a[1], 16),
                r = parseInt(a[2] + a[3], 16),
                o = parseInt(a[4] + a[5], 16),
                i = 1) : 8 == e.length && (n = parseInt(a[0] + a[1], 16),
                r = parseInt(a[2] + a[3], 16),
                o = parseInt(a[4] + a[5], 16),
                i = Math.round(parseInt(a[6] + a[7], 16) / 255 * 100) / 100),
                {
                    r: n,
                    g: r,
                    b: o,
                    o: i,
                    complete: t ? "rgba(" + [n, r, o, i].join(",") + ")" : "rgb(" + [n, r, o].join(",") + ")"
                }
            }, getRgbLevel: function(rab) {
                return rab.b * 0.299 + rab.g * 0.587 + rab.r * 0.114;
            },
            initColorFormat: function(e, t) {
                if(typeof e =='string'){
                    if(e.indexOf('(')==-1&&e.indexOf('#')==-1){
                        e='#'+e
                    }
                    var nums=0
                    var colorRab={}
                    if(e.indexOf('#')>-1){

                       colorRab['complete']=e
                       var rab= this.hexToRgb(e)
                       nums=this.getRgbLevel(rab)
                       
                    }
                    if(e.indexOf('rgb')>-1){
                        var ls=  this.getRgb(e,true)
                        colorRab=  this.rgbToHex(ls)
                    }
                    if(e.indexOf('hsla')>-1){
                      var hals=  this.getHsl(e, true)
                      var ls=  this.hslToRgb(hals,true)
                      colorRab=  this.rgbToHex(ls)
                    }
               
                var colorDatas=document.querySelectorAll('.color-item')
               
                colorDatas.forEach(s => {
                    var elements=s.querySelector('.xuanze')
                    if(s.getAttribute('data-color')==colorRab.complete){
                     
                        elements.style.display='inline-block'
                        elements.style.fontWeight='700'
                        elements.style.margin='3px 6px'
                        elements.style.width='4px'
                        elements.style.height= '9px'
                        elements.style.borderStyle='solid'
                        elements.style.borderColor=nums>199?'#000000':"#ffffff"
                        elements.style.borderWidth=  '0 3px 2px 0' 
                        elements.style.transform='rotate(45deg)'
                    
                    }else{
                        elements.style.display='none'
                    }
                    
                }); 
                }
               
                "object" == (void 0 === (e = e || this.lastColor) ? "undefined" : n(e)) ? (this.gradientColor = this.revertGradientToString(e),
                -1 < this.gradientColor.str.indexOf("linear-gradient") ? this.currentColorType = "linear-gradient" : this.currentColorType = "radial-gradient") : -1 < e.toLowerCase().indexOf("linear-gradient") || -1 < e.toLowerCase().indexOf("radial-gradient") ? (this.gradientColor = this.revertGradientToArray(e),
                -1 < this.gradientColor.str.indexOf("linear-gradient") ? this.currentColorType = "linear-gradient" : this.currentColorType = "radial-gradient") : (this.getColorFormat(e || "#000"),
                this.currentColorType = "single"),
                t || (this.changeColorType(!0),
                "single" != this.currentColorType && (this.setCurrentGradientColor(),
                this.updateAngleBar(),
                this.updateGradientColors(),
                this.rendGradientColors()))
            },
            setCurrentGradientColor: function() {
                this.getColorFormat(this.gradientColor.arry.colors[this.gradientIndex].color)
            },
            updateAngleBar: function() {
                (0,
                s.default)(this.dom).find(".current-angle span").html(this.gradientColor.arry.angle + "°"),
                (0,
                s.default)(this.dom).find(".current-angle .angle-bar").css("left", this.gradientColor.arry.angle / 3.6 + "%")
            },
            updateGradientColorItem: function(e, t) {
                (0,
                s.default)(this.dom).find(".gradient-item").eq(e).find(".color").css("background", t)
            },
            updateGradientBar: function() {
            
                var e = this.revertGradientToString(this.gradientColor.arry, !0);
                (0,
                s.default)(this.dom).find(".gradient-bar span").css("background", e.str),
                (0,
                s.default)(this.dom).find(".gradient-item").removeClass("on").eq(this.gradientIndex).addClass("on")
            },
            rendGradientColors: function() {
                for (var e = "", t = 0; t < this.gradientColor.arry.colors.length; t++)
                    e += '<div class="gradient-item iconfontcolorpicker iconcolorpicker1" style="left:' + this.gradientColor.arry.colors[t].per + '%">\n                            <div class="color" style="background:' + this.gradientColor.arry.colors[t].color + '"></div>\n                        </div>';
                (0,
                s.default)(this.dom).find(".gradient-colors").empty().append(e),
                (0,
                s.default)(this.dom).find(".gradient-item").removeClass("on").eq(this.gradientIndex).addClass("on")
            },
            setColorTypeDom: function() {
                (0,
                s.default)(this.dom).find(".color-type")[0] && ((0,
                s.default)(this.dom).find(".color-type li").removeClass("on"),
                (0,
                s.default)(this.dom).find(".color-type-item[data-type=" + this.currentColorType + "]").addClass("on"),
                (0,
                s.default)(this.dom).find(".color-type").removeClass("down"),
                (0,
                s.default)(this.dom).find(".color-type .color-slidedown-curbox")[0].innerHTML = (0,
                s.default)(this.dom).find(".color-type-item[data-type=" + this.currentColorType + "]")[0].innerHTML)
            },
            changeColorFormatType: function() {
                (0,
                s.default)(this.dom).find(".color-format-type li").removeClass("on"),
                (0,
                s.default)(this.dom).find(".color-format-type-item[data-type=" + this.currentColorFormat + "]").addClass("on"),
                (0,
                s.default)(this.dom).find(".color-format-type").removeClass("down"),
                (0,
                s.default)(this.dom).find(".color-format-type .color-slidedown-curbox")[0].innerHTML = (0,
                s.default)(this.dom).find(".color-format-type-item[data-type=" + this.currentColorFormat + "]")[0].innerHTML;
                var e = this.getCurrentColor(this.option.autoConfirm);
                this.rendInputValue()
                // this.option.onChange(e),
                // this.option.autoConfirm && this.option.onConfirm(e)
            },
            changeColorType: function(e) {
                this.gradientIndex = 0;
                var t = this.option.colorTypeOption.indexOf(this.currentColorType) < 0;
                t && (this.currentColorType = this.option.colorTypeOption[0]),
                "single" == this.currentColorType ? (e && !t || this.getColorFormat(this.gradientColor ? this.gradientColor.arry.colors[0].color : "#ffffff"),
                (0,
                s.default)(this.dom).find(".color-gradient").hide()) : (e && !t || this.gradientColor || (this.gradientColor = {
                    type: this.currentColorType
                },
                this.initColorFormat({
                    type: this.currentColorType,
                    angle: 0,
                    colors: [{
                        per: 0,
                        color: this.color.rgba
                    }, {
                        per: 100,
                        color: "rgba(255,255,255,1)"
                    }]
                })),
                this.gradientColor.arry.type != this.currentColorType && (this.gradientColor.arry.type = this.currentColorType,
                this.gradientColor = this.revertGradientToString(this.gradientColor.arry)),
                (0,
                s.default)(this.dom).find(".color-gradient").show(),
                this.rendGradientColors(),
                this.updateGradientBar(),
                this.updateAngleBar(),
                this.changeCurColorDom(),
                "linear-gradient" == this.currentColorType ? (0,
                s.default)(this.dom).find(".gradient-angle").show() : (0,
                s.default)(this.dom).find(".gradient-angle").hide()),
                this.setColorTypeDom(),
                this.rendInputValue(),
                this.setPosition()
            },
            getColorFormat: function(e) {
                this.color = this.getColorFormatFunc(e),
                this.color.rgbav = this.color.rgba.slice(5, this.color.rgba.indexOf(")")).split(","),
                this.color.hslav = this.color.hsla.slice(5, this.color.hsla.indexOf(")")).split(",").map(function(e) {
                    return -1 < e.indexOf("%") ? e.slice(0, e.indexOf("%")) : e
                }),
                this.dom && ("single" == this.currentColorType && (this.changeCurColorDom(),
                this.dom.querySelector(".current-color").style.background = this.color.rgba,
                this.dom.querySelector(".current-color-value input").value = this.color[this.currentColorFormat]),
                this.setBarPos())
            },
            changeCurColorDom: function() {
                "single" == this.currentColorType ? this.curcolordom.style.background = this.color.rgba : this.curcolordom.style.background = this.gradientColor.str
            },
            getColorFormatFunc: function(e) {
                
                e.indexOf("rgb") < 0 && e.indexOf("#") < 0 && e.indexOf("hsl") < 0 && (e = "rgba(255,255,255,1)");
                e = {
                    rgba: (0,r.default)({
                        color: e,
                        format: "rgba"
                    }).complete,
                    hsla: (0,
                    r.default)({
                        color: e,
                        format: "hsla"
                    }).complete,
                    hex: (0,
                    r.default)({
                        color: e,
                        format: "hex"
                    }).complete
                };
                return !e.rgba || -1 < e.rgba.indexOf("NaN") ? this.dom ? void ( this.dom.querySelector(".current-color-value input").value = this.color[this.currentColorFormat]) : void 0 : e
            },
            setBarPos: function() {
                this.opacitybar.style.top = 100 * (1 - this.color.rgbav[3]) + "%",
                0 != parseFloat(this.color.hslav[1]) && (this.huebar.style.top = 100 * this.color.hslav[0] / 360 + "%")
            },
            replace: function() {
                var e = "" + (arguments.length <= 0 ? void 0 : arguments[0]);
                return arguments.length < 3 ? e : e.replace(arguments.length <= 1 ? void 0 : arguments[1], arguments.length <= 2 ? void 0 : arguments[2])
            },
            revertGradientToArray: function(e) {
                var t = this
                  , n = "";
                e = e.toLowerCase();
                e = this.replace(e, /(rgba\(.*?\))/gi, function(e) {
                    return t.getColorFormatFunc(e).hex
                }),
                -1 < (e = this.replace(e, /(hsla\(.*?\))/gi, function(e) {
                    return t.getColorFormatFunc(e).hex
                })).toLowerCase().indexOf("radial-gradient") && (n = "radial-gradient"),
                -1 < e.toLowerCase().indexOf("linear-gradient") && (n = "linear-gradient");
                for (var r = e.slice(e.toLowerCase().indexOf(n) + 16, e.toLowerCase().lastIndexOf(")")).split(",").map(function(e) {
                    return e.trim()
                }), o = {
                    type: n,
                    angle: "linear-gradient" == n ? parseFloat(r[0]).toFixed(0) : 0,
                    colors: []
                }, i = "linear-gradient" == n ? 1 : 0; i < r.length; i++) {
                    var a = r[i].split(" ");
                    o.colors.push({
                        color: a[0],
                        per: a[1] ? parseFloat(a[1]) : 100 * (i - 1) / (r.length - 2)
                    })
                }
                return {
                    str: this.revertGradientToString(o).str,
                    arry: o
                }
            },
            revertGradientToString: function(e, t) {
                var n = (t ? "linear-gradient" : e.type) + "(";
                t ? n += "to right," : "linear-gradient" == e.type && (n += parseFloat(e.angle).toFixed(1) + "deg,");
                for (var r = 0; r < e.colors.length; r++) {
                    var o = this.getColorFormatFunc(e.colors[r].color)[this.currentColorFormat];
                    n += (e.colors[r].color = o) + " " + parseFloat(e.colors[r].per).toFixed(1),
                    "" != e.colors[r].per && (n += "%"),
                    r < e.colors.length - 1 && (n += ",")
                }
                return {
                    str: n += ")",
                    arry: e
                }
            },
            $copy: function(e) {
                var t = document.createElement("textarea");
                t.style.position = "fixed",
                t.style.top = "0",
                t.style.left = "0",
                t.style.width = "2em",
                t.style.height = "2em",
                t.style.padding = "0",
                t.style.border = "none",
                t.style.outline = "none",
                t.style.boxShadow = "none",
                t.style.background = "transparent",
                t.value = e,
                document.body.appendChild(t),
                t.select();
                try {
                    var n = document.execCommand("copy") ? "成功复制到剪贴板" : "该浏览器不支持点击复制到剪贴板";
                    layer.msg(n, {
                        skin: "suclayer"
                    })
                } catch (e) {
                    layer.msg("该浏览器不支持点击复制到剪贴板", {
                        skin: "errorlayer"
                    })
                }
                document.body.removeChild(t)
            },
            destroy: function() {
                (0,
                s.default)(this.dom).remove(),
                this.removeMouseDownEvent(),
                this.curcolordom.onclick = null
            }
        },
        o.XNColorPicker = a
    }()
}();
