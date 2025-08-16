import {c as Fr, a as Wr} from "./_commonjsHelpers-Chg3vePA.js";
var kn = {
    exports: {}
};
/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
(function(jn) {
    (function(j, Je) {
        jn.exports = j.document ? Je(j, !0) : function(U) {
            if (!U.document)
                throw new Error("jQuery requires a window with a document");
            return Je(U)
        }
    }
    )(typeof window != "undefined" ? window : Fr, function(j, Je) {
        var U = []
          , Mt = Object.getPrototypeOf
          , Z = U.slice
          , Rt = U.flat ? function(e) {
            return U.flat.call(e)
        }
        : function(e) {
            return U.concat.apply([], e)
        }
          , Ke = U.push
          , de = U.indexOf
          , Ze = {}
          , It = Ze.toString
          , Ie = Ze.hasOwnProperty
          , _t = Ie.toString
          , qn = _t.call(Object)
          , q = {}
          , L = function(t) {
            return typeof t == "function" && typeof t.nodeType != "number" && typeof t.item != "function"
        }
          , De = function(t) {
            return t != null && t === t.window
        }
          , k = j.document
          , Ln = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };
        function Ft(e, t, n) {
            n = n || k;
            var r, o, u = n.createElement("script");
            if (u.text = e,
            t)
                for (r in Ln)
                    o = t[r] || t.getAttribute && t.getAttribute(r),
                    o && u.setAttribute(r, o);
            n.head.appendChild(u).parentNode.removeChild(u)
        }
        function Ae(e) {
            return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? Ze[It.call(e)] || "object" : typeof e
        }
        var Wt = "3.7.1"
          , Hn = /HTML$/i
          , i = function(e, t) {
            return new i.fn.init(e,t)
        };
        i.fn = i.prototype = {
            jquery: Wt,
            constructor: i,
            length: 0,
            toArray: function() {
                return Z.call(this)
            },
            get: function(e) {
                return e == null ? Z.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = i.merge(this.constructor(), e);
                return t.prevObject = this,
                t
            },
            each: function(e) {
                return i.each(this, e)
            },
            map: function(e) {
                return this.pushStack(i.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(Z.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(i.grep(this, function(e, t) {
                    return (t + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(i.grep(this, function(e, t) {
                    return t % 2
                }))
            },
            eq: function(e) {
                var t = this.length
                  , n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: Ke,
            sort: U.sort,
            splice: U.splice
        },
        i.extend = i.fn.extend = function() {
            var e, t, n, r, o, u, a = arguments[0] || {}, c = 1, f = arguments.length, d = !1;
            for (typeof a == "boolean" && (d = a,
            a = arguments[c] || {},
            c++),
            typeof a != "object" && !L(a) && (a = {}),
            c === f && (a = this,
            c--); c < f; c++)
                if ((e = arguments[c]) != null)
                    for (t in e)
                        r = e[t],
                        !(t === "__proto__" || a === r) && (d && r && (i.isPlainObject(r) || (o = Array.isArray(r))) ? (n = a[t],
                        o && !Array.isArray(n) ? u = [] : !o && !i.isPlainObject(n) ? u = {} : u = n,
                        o = !1,
                        a[t] = i.extend(d, u, r)) : r !== void 0 && (a[t] = r));
            return a
        }
        ,
        i.extend({
            expando: "jQuery" + (Wt + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isPlainObject: function(e) {
                var t, n;
                return !e || It.call(e) !== "[object Object]" ? !1 : (t = Mt(e),
                t ? (n = Ie.call(t, "constructor") && t.constructor,
                typeof n == "function" && _t.call(n) === qn) : !0)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            globalEval: function(e, t, n) {
                Ft(e, {
                    nonce: t && t.nonce
                }, n)
            },
            each: function(e, t) {
                var n, r = 0;
                if (lt(e))
                    for (n = e.length; r < n && t.call(e[r], r, e[r]) !== !1; r++)
                        ;
                else
                    for (r in e)
                        if (t.call(e[r], r, e[r]) === !1)
                            break;
                return e
            },
            text: function(e) {
                var t, n = "", r = 0, o = e.nodeType;
                if (!o)
                    for (; t = e[r++]; )
                        n += i.text(t);
                return o === 1 || o === 11 ? e.textContent : o === 9 ? e.documentElement.textContent : o === 3 || o === 4 ? e.nodeValue : n
            },
            makeArray: function(e, t) {
                var n = t || [];
                return e != null && (lt(Object(e)) ? i.merge(n, typeof e == "string" ? [e] : e) : Ke.call(n, e)),
                n
            },
            inArray: function(e, t, n) {
                return t == null ? -1 : de.call(t, e, n)
            },
            isXMLDoc: function(e) {
                var t = e && e.namespaceURI
                  , n = e && (e.ownerDocument || e).documentElement;
                return !Hn.test(t || n && n.nodeName || "HTML")
            },
            merge: function(e, t) {
                for (var n = +t.length, r = 0, o = e.length; r < n; r++)
                    e[o++] = t[r];
                return e.length = o,
                e
            },
            grep: function(e, t, n) {
                for (var r, o = [], u = 0, a = e.length, c = !n; u < a; u++)
                    r = !t(e[u], u),
                    r !== c && o.push(e[u]);
                return o
            },
            map: function(e, t, n) {
                var r, o, u = 0, a = [];
                if (lt(e))
                    for (r = e.length; u < r; u++)
                        o = t(e[u], u, n),
                        o != null && a.push(o);
                else
                    for (u in e)
                        o = t(e[u], u, n),
                        o != null && a.push(o);
                return Rt(a)
            },
            guid: 1,
            support: q
        }),
        typeof Symbol == "function" && (i.fn[Symbol.iterator] = U[Symbol.iterator]),
        i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            Ze["[object " + t + "]"] = t.toLowerCase()
        });
        function lt(e) {
            var t = !!e && "length"in e && e.length
              , n = Ae(e);
            return L(e) || De(e) ? !1 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
        }
        function $(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }
        var On = U.pop
          , Pn = U.sort
          , Mn = U.splice
          , F = "[\\x20\\t\\r\\n\\f]"
          , _e = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$","g");
        i.contains = function(e, t) {
            var n = t && t.parentNode;
            return e === n || !!(n && n.nodeType === 1 && (e.contains ? e.contains(n) : e.compareDocumentPosition && e.compareDocumentPosition(n) & 16))
        }
        ;
        var Rn = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
        function In(e, t) {
            return t ? e === "\0" ? " " : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }
        i.escapeSelector = function(e) {
            return (e + "").replace(Rn, In)
        }
        ;
        var pe = k
          , dt = Ke;
        (function() {
            var e, t, n, r, o, u = dt, a, c, f, d, y, x = i.expando, h = 0, b = 0, A = at(), R = at(), H = at(), V = at(), z = function(s, l) {
                return s === l && (o = !0),
                0
            }, ae = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", se = "(?:\\\\[\\da-fA-F]{1,6}" + F + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", M = "\\[" + F + "*(" + se + ")(?:" + F + "*([*^$|!~]?=)" + F + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + se + "))|)" + F + "*\\]", Se = ":(" + se + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + M + ")*)|.*)\\)|)", I = new RegExp(F + "+","g"), B = new RegExp("^" + F + "*," + F + "*"), Ge = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"), kt = new RegExp(F + "|>"), fe = new RegExp(Se), Qe = new RegExp("^" + se + "$"), ce = {
                ID: new RegExp("^#(" + se + ")"),
                CLASS: new RegExp("^\\.(" + se + ")"),
                TAG: new RegExp("^(" + se + "|[*])"),
                ATTR: new RegExp("^" + M),
                PSEUDO: new RegExp("^" + Se),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)","i"),
                bool: new RegExp("^(?:" + ae + ")$","i"),
                needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)","i")
            }, xe = /^(?:input|select|textarea|button)$/i, be = /^h\d$/i, te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, jt = /[+~]/, ye = new RegExp("\\\\[\\da-fA-F]{1,6}" + F + "?|\\\\([^\\r\\n\\f])","g"), ve = function(s, l) {
                var p = "0x" + s.slice(1) - 65536;
                return l || (p < 0 ? String.fromCharCode(p + 65536) : String.fromCharCode(p >> 10 | 55296, p & 1023 | 56320))
            }, Hr = function() {
                me()
            }, Or = ft(function(s) {
                return s.disabled === !0 && $(s, "fieldset")
            }, {
                dir: "parentNode",
                next: "legend"
            });
            function Pr() {
                try {
                    return a.activeElement
                } catch (s) {}
            }
            try {
                u.apply(U = Z.call(pe.childNodes), pe.childNodes),
                U[pe.childNodes.length].nodeType
            } catch (s) {
                u = {
                    apply: function(l, p) {
                        dt.apply(l, Z.call(p))
                    },
                    call: function(l) {
                        dt.apply(l, Z.call(arguments, 1))
                    }
                }
            }
            function _(s, l, p, g) {
                var v, m, T, w, C, O, D, N = l && l.ownerDocument, P = l ? l.nodeType : 9;
                if (p = p || [],
                typeof s != "string" || !s || P !== 1 && P !== 9 && P !== 11)
                    return p;
                if (!g && (me(l),
                l = l || a,
                f)) {
                    if (P !== 11 && (C = te.exec(s)))
                        if (v = C[1]) {
                            if (P === 9)
                                if (T = l.getElementById(v)) {
                                    if (T.id === v)
                                        return u.call(p, T),
                                        p
                                } else
                                    return p;
                            else if (N && (T = N.getElementById(v)) && _.contains(l, T) && T.id === v)
                                return u.call(p, T),
                                p
                        } else {
                            if (C[2])
                                return u.apply(p, l.getElementsByTagName(s)),
                                p;
                            if ((v = C[3]) && l.getElementsByClassName)
                                return u.apply(p, l.getElementsByClassName(v)),
                                p
                        }
                    if (!V[s + " "] && (!d || !d.test(s))) {
                        if (D = s,
                        N = l,
                        P === 1 && (kt.test(s) || Ge.test(s))) {
                            for (N = jt.test(s) && qt(l.parentNode) || l,
                            (N != l || !q.scope) && ((w = l.getAttribute("id")) ? w = i.escapeSelector(w) : l.setAttribute("id", w = x)),
                            O = Ye(s),
                            m = O.length; m--; )
                                O[m] = (w ? "#" + w : ":scope") + " " + st(O[m]);
                            D = O.join(",")
                        }
                        try {
                            return u.apply(p, N.querySelectorAll(D)),
                            p
                        } catch (E) {
                            V(s, !0)
                        } finally {
                            w === x && l.removeAttribute("id")
                        }
                    }
                }
                return Nn(s.replace(_e, "$1"), l, p, g)
            }
            function at() {
                var s = [];
                function l(p, g) {
                    return s.push(p + " ") > t.cacheLength && delete l[s.shift()],
                    l[p + " "] = g
                }
                return l
            }
            function ie(s) {
                return s[x] = !0,
                s
            }
            function Me(s) {
                var l = a.createElement("fieldset");
                try {
                    return !!s(l)
                } catch (p) {
                    return !1
                } finally {
                    l.parentNode && l.parentNode.removeChild(l),
                    l = null
                }
            }
            function Mr(s) {
                return function(l) {
                    return $(l, "input") && l.type === s
                }
            }
            function Rr(s) {
                return function(l) {
                    return ($(l, "input") || $(l, "button")) && l.type === s
                }
            }
            function Dn(s) {
                return function(l) {
                    return "form"in l ? l.parentNode && l.disabled === !1 ? "label"in l ? "label"in l.parentNode ? l.parentNode.disabled === s : l.disabled === s : l.isDisabled === s || l.isDisabled !== !s && Or(l) === s : l.disabled === s : "label"in l ? l.disabled === s : !1
                }
            }
            function Ee(s) {
                return ie(function(l) {
                    return l = +l,
                    ie(function(p, g) {
                        for (var v, m = s([], p.length, l), T = m.length; T--; )
                            p[v = m[T]] && (p[v] = !(g[v] = p[v]))
                    })
                })
            }
            function qt(s) {
                return s && typeof s.getElementsByTagName != "undefined" && s
            }
            function me(s) {
                var l, p = s ? s.ownerDocument || s : pe;
                return p == a || p.nodeType !== 9 || !p.documentElement || (a = p,
                c = a.documentElement,
                f = !i.isXMLDoc(a),
                y = c.matches || c.webkitMatchesSelector || c.msMatchesSelector,
                c.msMatchesSelector && pe != a && (l = a.defaultView) && l.top !== l && l.addEventListener("unload", Hr),
                q.getById = Me(function(g) {
                    return c.appendChild(g).id = i.expando,
                    !a.getElementsByName || !a.getElementsByName(i.expando).length
                }),
                q.disconnectedMatch = Me(function(g) {
                    return y.call(g, "*")
                }),
                q.scope = Me(function() {
                    return a.querySelectorAll(":scope")
                }),
                q.cssHas = Me(function() {
                    try {
                        return a.querySelector(":has(*,:jqfake)"),
                        !1
                    } catch (g) {
                        return !0
                    }
                }),
                q.getById ? (t.filter.ID = function(g) {
                    var v = g.replace(ye, ve);
                    return function(m) {
                        return m.getAttribute("id") === v
                    }
                }
                ,
                t.find.ID = function(g, v) {
                    if (typeof v.getElementById != "undefined" && f) {
                        var m = v.getElementById(g);
                        return m ? [m] : []
                    }
                }
                ) : (t.filter.ID = function(g) {
                    var v = g.replace(ye, ve);
                    return function(m) {
                        var T = typeof m.getAttributeNode != "undefined" && m.getAttributeNode("id");
                        return T && T.value === v
                    }
                }
                ,
                t.find.ID = function(g, v) {
                    if (typeof v.getElementById != "undefined" && f) {
                        var m, T, w, C = v.getElementById(g);
                        if (C) {
                            if (m = C.getAttributeNode("id"),
                            m && m.value === g)
                                return [C];
                            for (w = v.getElementsByName(g),
                            T = 0; C = w[T++]; )
                                if (m = C.getAttributeNode("id"),
                                m && m.value === g)
                                    return [C]
                        }
                        return []
                    }
                }
                ),
                t.find.TAG = function(g, v) {
                    return typeof v.getElementsByTagName != "undefined" ? v.getElementsByTagName(g) : v.querySelectorAll(g)
                }
                ,
                t.find.CLASS = function(g, v) {
                    if (typeof v.getElementsByClassName != "undefined" && f)
                        return v.getElementsByClassName(g)
                }
                ,
                d = [],
                Me(function(g) {
                    var v;
                    c.appendChild(g).innerHTML = "<a id='" + x + "' href='' disabled='disabled'></a><select id='" + x + "-\r\\' disabled='disabled'><option selected=''></option></select>",
                    g.querySelectorAll("[selected]").length || d.push("\\[" + F + "*(?:value|" + ae + ")"),
                    g.querySelectorAll("[id~=" + x + "-]").length || d.push("~="),
                    g.querySelectorAll("a#" + x + "+*").length || d.push(".#.+[+~]"),
                    g.querySelectorAll(":checked").length || d.push(":checked"),
                    v = a.createElement("input"),
                    v.setAttribute("type", "hidden"),
                    g.appendChild(v).setAttribute("name", "D"),
                    c.appendChild(g).disabled = !0,
                    g.querySelectorAll(":disabled").length !== 2 && d.push(":enabled", ":disabled"),
                    v = a.createElement("input"),
                    v.setAttribute("name", ""),
                    g.appendChild(v),
                    g.querySelectorAll("[name='']").length || d.push("\\[" + F + "*name" + F + "*=" + F + `*(?:''|"")`)
                }),
                q.cssHas || d.push(":has"),
                d = d.length && new RegExp(d.join("|")),
                z = function(g, v) {
                    if (g === v)
                        return o = !0,
                        0;
                    var m = !g.compareDocumentPosition - !v.compareDocumentPosition;
                    return m || (m = (g.ownerDocument || g) == (v.ownerDocument || v) ? g.compareDocumentPosition(v) : 1,
                    m & 1 || !q.sortDetached && v.compareDocumentPosition(g) === m ? g === a || g.ownerDocument == pe && _.contains(pe, g) ? -1 : v === a || v.ownerDocument == pe && _.contains(pe, v) ? 1 : r ? de.call(r, g) - de.call(r, v) : 0 : m & 4 ? -1 : 1)
                }
                ),
                a
            }
            _.matches = function(s, l) {
                return _(s, null, null, l)
            }
            ,
            _.matchesSelector = function(s, l) {
                if (me(s),
                f && !V[l + " "] && (!d || !d.test(l)))
                    try {
                        var p = y.call(s, l);
                        if (p || q.disconnectedMatch || s.document && s.document.nodeType !== 11)
                            return p
                    } catch (g) {
                        V(l, !0)
                    }
                return _(l, a, null, [s]).length > 0
            }
            ,
            _.contains = function(s, l) {
                return (s.ownerDocument || s) != a && me(s),
                i.contains(s, l)
            }
            ,
            _.attr = function(s, l) {
                (s.ownerDocument || s) != a && me(s);
                var p = t.attrHandle[l.toLowerCase()]
                  , g = p && Ie.call(t.attrHandle, l.toLowerCase()) ? p(s, l, !f) : void 0;
                return g !== void 0 ? g : s.getAttribute(l)
            }
            ,
            _.error = function(s) {
                throw new Error("Syntax error, unrecognized expression: " + s)
            }
            ,
            i.uniqueSort = function(s) {
                var l, p = [], g = 0, v = 0;
                if (o = !q.sortStable,
                r = !q.sortStable && Z.call(s, 0),
                Pn.call(s, z),
                o) {
                    for (; l = s[v++]; )
                        l === s[v] && (g = p.push(v));
                    for (; g--; )
                        Mn.call(s, p[g], 1)
                }
                return r = null,
                s
            }
            ,
            i.fn.uniqueSort = function() {
                return this.pushStack(i.uniqueSort(Z.apply(this)))
            }
            ,
            t = i.expr = {
                cacheLength: 50,
                createPseudo: ie,
                match: ce,
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
                    ATTR: function(s) {
                        return s[1] = s[1].replace(ye, ve),
                        s[3] = (s[3] || s[4] || s[5] || "").replace(ye, ve),
                        s[2] === "~=" && (s[3] = " " + s[3] + " "),
                        s.slice(0, 4)
                    },
                    CHILD: function(s) {
                        return s[1] = s[1].toLowerCase(),
                        s[1].slice(0, 3) === "nth" ? (s[3] || _.error(s[0]),
                        s[4] = +(s[4] ? s[5] + (s[6] || 1) : 2 * (s[3] === "even" || s[3] === "odd")),
                        s[5] = +(s[7] + s[8] || s[3] === "odd")) : s[3] && _.error(s[0]),
                        s
                    },
                    PSEUDO: function(s) {
                        var l, p = !s[6] && s[2];
                        return ce.CHILD.test(s[0]) ? null : (s[3] ? s[2] = s[4] || s[5] || "" : p && fe.test(p) && (l = Ye(p, !0)) && (l = p.indexOf(")", p.length - l) - p.length) && (s[0] = s[0].slice(0, l),
                        s[2] = p.slice(0, l)),
                        s.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(s) {
                        var l = s.replace(ye, ve).toLowerCase();
                        return s === "*" ? function() {
                            return !0
                        }
                        : function(p) {
                            return $(p, l)
                        }
                    },
                    CLASS: function(s) {
                        var l = A[s + " "];
                        return l || (l = new RegExp("(^|" + F + ")" + s + "(" + F + "|$)")) && A(s, function(p) {
                            return l.test(typeof p.className == "string" && p.className || typeof p.getAttribute != "undefined" && p.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(s, l, p) {
                        return function(g) {
                            var v = _.attr(g, s);
                            return v == null ? l === "!=" : l ? (v += "",
                            l === "=" ? v === p : l === "!=" ? v !== p : l === "^=" ? p && v.indexOf(p) === 0 : l === "*=" ? p && v.indexOf(p) > -1 : l === "$=" ? p && v.slice(-p.length) === p : l === "~=" ? (" " + v.replace(I, " ") + " ").indexOf(p) > -1 : l === "|=" ? v === p || v.slice(0, p.length + 1) === p + "-" : !1) : !0
                        }
                    },
                    CHILD: function(s, l, p, g, v) {
                        var m = s.slice(0, 3) !== "nth"
                          , T = s.slice(-4) !== "last"
                          , w = l === "of-type";
                        return g === 1 && v === 0 ? function(C) {
                            return !!C.parentNode
                        }
                        : function(C, O, D) {
                            var N, P, E, W, K, X = m !== T ? "nextSibling" : "previousSibling", ne = C.parentNode, le = w && C.nodeName.toLowerCase(), Re = !D && !w, G = !1;
                            if (ne) {
                                if (m) {
                                    for (; X; ) {
                                        for (E = C; E = E[X]; )
                                            if (w ? $(E, le) : E.nodeType === 1)
                                                return !1;
                                        K = X = s === "only" && !K && "nextSibling"
                                    }
                                    return !0
                                }
                                if (K = [T ? ne.firstChild : ne.lastChild],
                                T && Re) {
                                    for (P = ne[x] || (ne[x] = {}),
                                    N = P[s] || [],
                                    W = N[0] === h && N[1],
                                    G = W && N[2],
                                    E = W && ne.childNodes[W]; E = ++W && E && E[X] || (G = W = 0) || K.pop(); )
                                        if (E.nodeType === 1 && ++G && E === C) {
                                            P[s] = [h, W, G];
                                            break
                                        }
                                } else if (Re && (P = C[x] || (C[x] = {}),
                                N = P[s] || [],
                                W = N[0] === h && N[1],
                                G = W),
                                G === !1)
                                    for (; (E = ++W && E && E[X] || (G = W = 0) || K.pop()) && !((w ? $(E, le) : E.nodeType === 1) && ++G && (Re && (P = E[x] || (E[x] = {}),
                                    P[s] = [h, G]),
                                    E === C)); )
                                        ;
                                return G -= v,
                                G === g || G % g === 0 && G / g >= 0
                            }
                        }
                    },
                    PSEUDO: function(s, l) {
                        var p, g = t.pseudos[s] || t.setFilters[s.toLowerCase()] || _.error("unsupported pseudo: " + s);
                        return g[x] ? g(l) : g.length > 1 ? (p = [s, s, "", l],
                        t.setFilters.hasOwnProperty(s.toLowerCase()) ? ie(function(v, m) {
                            for (var T, w = g(v, l), C = w.length; C--; )
                                T = de.call(v, w[C]),
                                v[T] = !(m[T] = w[C])
                        }) : function(v) {
                            return g(v, 0, p)
                        }
                        ) : g
                    }
                },
                pseudos: {
                    not: ie(function(s) {
                        var l = []
                          , p = []
                          , g = Pt(s.replace(_e, "$1"));
                        return g[x] ? ie(function(v, m, T, w) {
                            for (var C, O = g(v, null, w, []), D = v.length; D--; )
                                (C = O[D]) && (v[D] = !(m[D] = C))
                        }) : function(v, m, T) {
                            return l[0] = v,
                            g(l, null, T, p),
                            l[0] = null,
                            !p.pop()
                        }
                    }),
                    has: ie(function(s) {
                        return function(l) {
                            return _(s, l).length > 0
                        }
                    }),
                    contains: ie(function(s) {
                        return s = s.replace(ye, ve),
                        function(l) {
                            return (l.textContent || i.text(l)).indexOf(s) > -1
                        }
                    }),
                    lang: ie(function(s) {
                        return Qe.test(s || "") || _.error("unsupported lang: " + s),
                        s = s.replace(ye, ve).toLowerCase(),
                        function(l) {
                            var p;
                            do
                                if (p = f ? l.lang : l.getAttribute("xml:lang") || l.getAttribute("lang"))
                                    return p = p.toLowerCase(),
                                    p === s || p.indexOf(s + "-") === 0;
                            while ((l = l.parentNode) && l.nodeType === 1);
                            return !1
                        }
                    }),
                    target: function(s) {
                        var l = j.location && j.location.hash;
                        return l && l.slice(1) === s.id
                    },
                    root: function(s) {
                        return s === c
                    },
                    focus: function(s) {
                        return s === Pr() && a.hasFocus() && !!(s.type || s.href || ~s.tabIndex)
                    },
                    enabled: Dn(!1),
                    disabled: Dn(!0),
                    checked: function(s) {
                        return $(s, "input") && !!s.checked || $(s, "option") && !!s.selected
                    },
                    selected: function(s) {
                        return s.parentNode && s.parentNode.selectedIndex,
                        s.selected === !0
                    },
                    empty: function(s) {
                        for (s = s.firstChild; s; s = s.nextSibling)
                            if (s.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function(s) {
                        return !t.pseudos.empty(s)
                    },
                    header: function(s) {
                        return be.test(s.nodeName)
                    },
                    input: function(s) {
                        return xe.test(s.nodeName)
                    },
                    button: function(s) {
                        return $(s, "input") && s.type === "button" || $(s, "button")
                    },
                    text: function(s) {
                        var l;
                        return $(s, "input") && s.type === "text" && ((l = s.getAttribute("type")) == null || l.toLowerCase() === "text")
                    },
                    first: Ee(function() {
                        return [0]
                    }),
                    last: Ee(function(s, l) {
                        return [l - 1]
                    }),
                    eq: Ee(function(s, l, p) {
                        return [p < 0 ? p + l : p]
                    }),
                    even: Ee(function(s, l) {
                        for (var p = 0; p < l; p += 2)
                            s.push(p);
                        return s
                    }),
                    odd: Ee(function(s, l) {
                        for (var p = 1; p < l; p += 2)
                            s.push(p);
                        return s
                    }),
                    lt: Ee(function(s, l, p) {
                        var g;
                        for (p < 0 ? g = p + l : p > l ? g = l : g = p; --g >= 0; )
                            s.push(g);
                        return s
                    }),
                    gt: Ee(function(s, l, p) {
                        for (var g = p < 0 ? p + l : p; ++g < l; )
                            s.push(g);
                        return s
                    })
                }
            },
            t.pseudos.nth = t.pseudos.eq;
            for (e in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
                t.pseudos[e] = Mr(e);
            for (e in {
                submit: !0,
                reset: !0
            })
                t.pseudos[e] = Rr(e);
            function An() {}
            An.prototype = t.filters = t.pseudos,
            t.setFilters = new An;
            function Ye(s, l) {
                var p, g, v, m, T, w, C, O = R[s + " "];
                if (O)
                    return l ? 0 : O.slice(0);
                for (T = s,
                w = [],
                C = t.preFilter; T; ) {
                    (!p || (g = B.exec(T))) && (g && (T = T.slice(g[0].length) || T),
                    w.push(v = [])),
                    p = !1,
                    (g = Ge.exec(T)) && (p = g.shift(),
                    v.push({
                        value: p,
                        type: g[0].replace(_e, " ")
                    }),
                    T = T.slice(p.length));
                    for (m in t.filter)
                        (g = ce[m].exec(T)) && (!C[m] || (g = C[m](g))) && (p = g.shift(),
                        v.push({
                            value: p,
                            type: m,
                            matches: g
                        }),
                        T = T.slice(p.length));
                    if (!p)
                        break
                }
                return l ? T.length : T ? _.error(s) : R(s, w).slice(0)
            }
            function st(s) {
                for (var l = 0, p = s.length, g = ""; l < p; l++)
                    g += s[l].value;
                return g
            }
            function ft(s, l, p) {
                var g = l.dir
                  , v = l.next
                  , m = v || g
                  , T = p && m === "parentNode"
                  , w = b++;
                return l.first ? function(C, O, D) {
                    for (; C = C[g]; )
                        if (C.nodeType === 1 || T)
                            return s(C, O, D);
                    return !1
                }
                : function(C, O, D) {
                    var N, P, E = [h, w];
                    if (D) {
                        for (; C = C[g]; )
                            if ((C.nodeType === 1 || T) && s(C, O, D))
                                return !0
                    } else
                        for (; C = C[g]; )
                            if (C.nodeType === 1 || T)
                                if (P = C[x] || (C[x] = {}),
                                v && $(C, v))
                                    C = C[g] || C;
                                else {
                                    if ((N = P[m]) && N[0] === h && N[1] === w)
                                        return E[2] = N[2];
                                    if (P[m] = E,
                                    E[2] = s(C, O, D))
                                        return !0
                                }
                    return !1
                }
            }
            function Lt(s) {
                return s.length > 1 ? function(l, p, g) {
                    for (var v = s.length; v--; )
                        if (!s[v](l, p, g))
                            return !1;
                    return !0
                }
                : s[0]
            }
            function Ir(s, l, p) {
                for (var g = 0, v = l.length; g < v; g++)
                    _(s, l[g], p);
                return p
            }
            function ct(s, l, p, g, v) {
                for (var m, T = [], w = 0, C = s.length, O = l != null; w < C; w++)
                    (m = s[w]) && (!p || p(m, g, v)) && (T.push(m),
                    O && l.push(w));
                return T
            }
            function Ht(s, l, p, g, v, m) {
                return g && !g[x] && (g = Ht(g)),
                v && !v[x] && (v = Ht(v, m)),
                ie(function(T, w, C, O) {
                    var D, N, P, E, W = [], K = [], X = w.length, ne = T || Ir(l || "*", C.nodeType ? [C] : C, []), le = s && (T || !l) ? ct(ne, W, s, C, O) : ne;
                    if (p ? (E = v || (T ? s : X || g) ? [] : w,
                    p(le, E, C, O)) : E = le,
                    g)
                        for (D = ct(E, K),
                        g(D, [], C, O),
                        N = D.length; N--; )
                            (P = D[N]) && (E[K[N]] = !(le[K[N]] = P));
                    if (T) {
                        if (v || s) {
                            if (v) {
                                for (D = [],
                                N = E.length; N--; )
                                    (P = E[N]) && D.push(le[N] = P);
                                v(null, E = [], D, O)
                            }
                            for (N = E.length; N--; )
                                (P = E[N]) && (D = v ? de.call(T, P) : W[N]) > -1 && (T[D] = !(w[D] = P))
                        }
                    } else
                        E = ct(E === w ? E.splice(X, E.length) : E),
                        v ? v(null, w, E, O) : u.apply(w, E)
                })
            }
            function Ot(s) {
                for (var l, p, g, v = s.length, m = t.relative[s[0].type], T = m || t.relative[" "], w = m ? 1 : 0, C = ft(function(N) {
                    return N === l
                }, T, !0), O = ft(function(N) {
                    return de.call(l, N) > -1
                }, T, !0), D = [function(N, P, E) {
                    var W = !m && (E || P != n) || ((l = P).nodeType ? C(N, P, E) : O(N, P, E));
                    return l = null,
                    W
                }
                ]; w < v; w++)
                    if (p = t.relative[s[w].type])
                        D = [ft(Lt(D), p)];
                    else {
                        if (p = t.filter[s[w].type].apply(null, s[w].matches),
                        p[x]) {
                            for (g = ++w; g < v && !t.relative[s[g].type]; g++)
                                ;
                            return Ht(w > 1 && Lt(D), w > 1 && st(s.slice(0, w - 1).concat({
                                value: s[w - 2].type === " " ? "*" : ""
                            })).replace(_e, "$1"), p, w < g && Ot(s.slice(w, g)), g < v && Ot(s = s.slice(g)), g < v && st(s))
                        }
                        D.push(p)
                    }
                return Lt(D)
            }
            function _r(s, l) {
                var p = l.length > 0
                  , g = s.length > 0
                  , v = function(m, T, w, C, O) {
                    var D, N, P, E = 0, W = "0", K = m && [], X = [], ne = n, le = m || g && t.find.TAG("*", O), Re = h += ne == null ? 1 : Math.random() || .1, G = le.length;
                    for (O && (n = T == a || T || O); W !== G && (D = le[W]) != null; W++) {
                        if (g && D) {
                            for (N = 0,
                            !T && D.ownerDocument != a && (me(D),
                            w = !f); P = s[N++]; )
                                if (P(D, T || a, w)) {
                                    u.call(C, D);
                                    break
                                }
                            O && (h = Re)
                        }
                        p && ((D = !P && D) && E--,
                        m && K.push(D))
                    }
                    if (E += W,
                    p && W !== E) {
                        for (N = 0; P = l[N++]; )
                            P(K, X, T, w);
                        if (m) {
                            if (E > 0)
                                for (; W--; )
                                    K[W] || X[W] || (X[W] = On.call(C));
                            X = ct(X)
                        }
                        u.apply(C, X),
                        O && !m && X.length > 0 && E + l.length > 1 && i.uniqueSort(C)
                    }
                    return O && (h = Re,
                    n = ne),
                    K
                };
                return p ? ie(v) : v
            }
            function Pt(s, l) {
                var p, g = [], v = [], m = H[s + " "];
                if (!m) {
                    for (l || (l = Ye(s)),
                    p = l.length; p--; )
                        m = Ot(l[p]),
                        m[x] ? g.push(m) : v.push(m);
                    m = H(s, _r(v, g)),
                    m.selector = s
                }
                return m
            }
            function Nn(s, l, p, g) {
                var v, m, T, w, C, O = typeof s == "function" && s, D = !g && Ye(s = O.selector || s);
                if (p = p || [],
                D.length === 1) {
                    if (m = D[0] = D[0].slice(0),
                    m.length > 2 && (T = m[0]).type === "ID" && l.nodeType === 9 && f && t.relative[m[1].type]) {
                        if (l = (t.find.ID(T.matches[0].replace(ye, ve), l) || [])[0],
                        l)
                            O && (l = l.parentNode);
                        else
                            return p;
                        s = s.slice(m.shift().value.length)
                    }
                    for (v = ce.needsContext.test(s) ? 0 : m.length; v-- && (T = m[v],
                    !t.relative[w = T.type]); )
                        if ((C = t.find[w]) && (g = C(T.matches[0].replace(ye, ve), jt.test(m[0].type) && qt(l.parentNode) || l))) {
                            if (m.splice(v, 1),
                            s = g.length && st(m),
                            !s)
                                return u.apply(p, g),
                                p;
                            break
                        }
                }
                return (O || Pt(s, D))(g, l, !f, p, !l || jt.test(s) && qt(l.parentNode) || l),
                p
            }
            q.sortStable = x.split("").sort(z).join("") === x,
            me(),
            q.sortDetached = Me(function(s) {
                return s.compareDocumentPosition(a.createElement("fieldset")) & 1
            }),
            i.find = _,
            i.expr[":"] = i.expr.pseudos,
            i.unique = i.uniqueSort,
            _.compile = Pt,
            _.select = Nn,
            _.setDocument = me,
            _.tokenize = Ye,
            _.escape = i.escapeSelector,
            _.getText = i.text,
            _.isXML = i.isXMLDoc,
            _.selectors = i.expr,
            _.support = i.support,
            _.uniqueSort = i.uniqueSort
        }
        )();
        var Ne = function(e, t, n) {
            for (var r = [], o = n !== void 0; (e = e[t]) && e.nodeType !== 9; )
                if (e.nodeType === 1) {
                    if (o && i(e).is(n))
                        break;
                    r.push(e)
                }
            return r
        }
          , $t = function(e, t) {
            for (var n = []; e; e = e.nextSibling)
                e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
          , Bt = i.expr.match.needsContext
          , zt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function pt(e, t, n) {
            return L(t) ? i.grep(e, function(r, o) {
                return !!t.call(r, o, r) !== n
            }) : t.nodeType ? i.grep(e, function(r) {
                return r === t !== n
            }) : typeof t != "string" ? i.grep(e, function(r) {
                return de.call(t, r) > -1 !== n
            }) : i.filter(t, e, n)
        }
        i.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"),
            t.length === 1 && r.nodeType === 1 ? i.find.matchesSelector(r, e) ? [r] : [] : i.find.matches(e, i.grep(t, function(o) {
                return o.nodeType === 1
            }))
        }
        ,
        i.fn.extend({
            find: function(e) {
                var t, n, r = this.length, o = this;
                if (typeof e != "string")
                    return this.pushStack(i(e).filter(function() {
                        for (t = 0; t < r; t++)
                            if (i.contains(o[t], this))
                                return !0
                    }));
                for (n = this.pushStack([]),
                t = 0; t < r; t++)
                    i.find(e, o[t], n);
                return r > 1 ? i.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(pt(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(pt(this, e || [], !0))
            },
            is: function(e) {
                return !!pt(this, typeof e == "string" && Bt.test(e) ? i(e) : e || [], !1).length
            }
        });
        var Ut, _n = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Fn = i.fn.init = function(e, t, n) {
            var r, o;
            if (!e)
                return this;
            if (n = n || Ut,
            typeof e == "string")
                if (e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? r = [null, e, null] : r = _n.exec(e),
                r && (r[1] || !t))
                    if (r[1]) {
                        if (t = t instanceof i ? t[0] : t,
                        i.merge(this, i.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : k, !0)),
                        zt.test(r[1]) && i.isPlainObject(t))
                            for (r in t)
                                L(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    } else
                        return o = k.getElementById(r[2]),
                        o && (this[0] = o,
                        this.length = 1),
                        this;
                else
                    return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            else {
                if (e.nodeType)
                    return this[0] = e,
                    this.length = 1,
                    this;
                if (L(e))
                    return n.ready !== void 0 ? n.ready(e) : e(i)
            }
            return i.makeArray(e, this)
        }
        ;
        Fn.prototype = i.fn,
        Ut = i(k);
        var Wn = /^(?:parents|prev(?:Until|All))/
          , $n = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        i.fn.extend({
            has: function(e) {
                var t = i(e, this)
                  , n = t.length;
                return this.filter(function() {
                    for (var r = 0; r < n; r++)
                        if (i.contains(this, t[r]))
                            return !0
                })
            },
            closest: function(e, t) {
                var n, r = 0, o = this.length, u = [], a = typeof e != "string" && i(e);
                if (!Bt.test(e)) {
                    for (; r < o; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : n.nodeType === 1 && i.find.matchesSelector(n, e))) {
                                u.push(n);
                                break
                            }
                }
                return this.pushStack(u.length > 1 ? i.uniqueSort(u) : u)
            },
            index: function(e) {
                return e ? typeof e == "string" ? de.call(i(e), this[0]) : de.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(i.uniqueSort(i.merge(this.get(), i(e, t))))
            },
            addBack: function(e) {
                return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
            }
        });
        function Vt(e, t) {
            for (; (e = e[t]) && e.nodeType !== 1; )
                ;
            return e
        }
        i.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && t.nodeType !== 11 ? t : null
            },
            parents: function(e) {
                return Ne(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return Ne(e, "parentNode", n)
            },
            next: function(e) {
                return Vt(e, "nextSibling")
            },
            prev: function(e) {
                return Vt(e, "previousSibling")
            },
            nextAll: function(e) {
                return Ne(e, "nextSibling")
            },
            prevAll: function(e) {
                return Ne(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return Ne(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return Ne(e, "previousSibling", n)
            },
            siblings: function(e) {
                return $t((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return $t(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument != null && Mt(e.contentDocument) ? e.contentDocument : ($(e, "template") && (e = e.content || e),
                i.merge([], e.childNodes))
            }
        }, function(e, t) {
            i.fn[e] = function(n, r) {
                var o = i.map(this, t, n);
                return e.slice(-5) !== "Until" && (r = n),
                r && typeof r == "string" && (o = i.filter(r, o)),
                this.length > 1 && ($n[e] || i.uniqueSort(o),
                Wn.test(e) && o.reverse()),
                this.pushStack(o)
            }
        });
        var oe = /[^\x20\t\r\n\f]+/g;
        function Bn(e) {
            var t = {};
            return i.each(e.match(oe) || [], function(n, r) {
                t[r] = !0
            }),
            t
        }
        i.Callbacks = function(e) {
            e = typeof e == "string" ? Bn(e) : i.extend({}, e);
            var t, n, r, o, u = [], a = [], c = -1, f = function() {
                for (o = o || e.once,
                r = t = !0; a.length; c = -1)
                    for (n = a.shift(); ++c < u.length; )
                        u[c].apply(n[0], n[1]) === !1 && e.stopOnFalse && (c = u.length,
                        n = !1);
                e.memory || (n = !1),
                t = !1,
                o && (n ? u = [] : u = "")
            }, d = {
                add: function() {
                    return u && (n && !t && (c = u.length - 1,
                    a.push(n)),
                    function y(x) {
                        i.each(x, function(h, b) {
                            L(b) ? (!e.unique || !d.has(b)) && u.push(b) : b && b.length && Ae(b) !== "string" && y(b)
                        })
                    }(arguments),
                    n && !t && f()),
                    this
                },
                remove: function() {
                    return i.each(arguments, function(y, x) {
                        for (var h; (h = i.inArray(x, u, h)) > -1; )
                            u.splice(h, 1),
                            h <= c && c--
                    }),
                    this
                },
                has: function(y) {
                    return y ? i.inArray(y, u) > -1 : u.length > 0
                },
                empty: function() {
                    return u && (u = []),
                    this
                },
                disable: function() {
                    return o = a = [],
                    u = n = "",
                    this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return o = a = [],
                    !n && !t && (u = n = ""),
                    this
                },
                locked: function() {
                    return !!o
                },
                fireWith: function(y, x) {
                    return o || (x = x || [],
                    x = [y, x.slice ? x.slice() : x],
                    a.push(x),
                    t || f()),
                    this
                },
                fire: function() {
                    return d.fireWith(this, arguments),
                    this
                },
                fired: function() {
                    return !!r
                }
            };
            return d
        }
        ;
        function ke(e) {
            return e
        }
        function et(e) {
            throw e
        }
        function Xt(e, t, n, r) {
            var o;
            try {
                e && L(o = e.promise) ? o.call(e).done(t).fail(n) : e && L(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(r))
            } catch (u) {
                n.apply(void 0, [u])
            }
        }
        i.extend({
            Deferred: function(e) {
                var t = [["notify", "progress", i.Callbacks("memory"), i.Callbacks("memory"), 2], ["resolve", "done", i.Callbacks("once memory"), i.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", i.Callbacks("once memory"), i.Callbacks("once memory"), 1, "rejected"]]
                  , n = "pending"
                  , r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments),
                        this
                    },
                    catch: function(u) {
                        return r.then(null, u)
                    },
                    pipe: function() {
                        var u = arguments;
                        return i.Deferred(function(a) {
                            i.each(t, function(c, f) {
                                var d = L(u[f[4]]) && u[f[4]];
                                o[f[1]](function() {
                                    var y = d && d.apply(this, arguments);
                                    y && L(y.promise) ? y.promise().progress(a.notify).done(a.resolve).fail(a.reject) : a[f[0] + "With"](this, d ? [y] : arguments)
                                })
                            }),
                            u = null
                        }).promise()
                    },
                    then: function(u, a, c) {
                        var f = 0;
                        function d(y, x, h, b) {
                            return function() {
                                var A = this
                                  , R = arguments
                                  , H = function() {
                                    var z, ae;
                                    if (!(y < f)) {
                                        if (z = h.apply(A, R),
                                        z === x.promise())
                                            throw new TypeError("Thenable self-resolution");
                                        ae = z && (typeof z == "object" || typeof z == "function") && z.then,
                                        L(ae) ? b ? ae.call(z, d(f, x, ke, b), d(f, x, et, b)) : (f++,
                                        ae.call(z, d(f, x, ke, b), d(f, x, et, b), d(f, x, ke, x.notifyWith))) : (h !== ke && (A = void 0,
                                        R = [z]),
                                        (b || x.resolveWith)(A, R))
                                    }
                                }
                                  , V = b ? H : function() {
                                    try {
                                        H()
                                    } catch (z) {
                                        i.Deferred.exceptionHook && i.Deferred.exceptionHook(z, V.error),
                                        y + 1 >= f && (h !== et && (A = void 0,
                                        R = [z]),
                                        x.rejectWith(A, R))
                                    }
                                }
                                ;
                                y ? V() : (i.Deferred.getErrorHook ? V.error = i.Deferred.getErrorHook() : i.Deferred.getStackHook && (V.error = i.Deferred.getStackHook()),
                                j.setTimeout(V))
                            }
                        }
                        return i.Deferred(function(y) {
                            t[0][3].add(d(0, y, L(c) ? c : ke, y.notifyWith)),
                            t[1][3].add(d(0, y, L(u) ? u : ke)),
                            t[2][3].add(d(0, y, L(a) ? a : et))
                        }).promise()
                    },
                    promise: function(u) {
                        return u != null ? i.extend(u, r) : r
                    }
                }
                  , o = {};
                return i.each(t, function(u, a) {
                    var c = a[2]
                      , f = a[5];
                    r[a[1]] = c.add,
                    f && c.add(function() {
                        n = f
                    }, t[3 - u][2].disable, t[3 - u][3].disable, t[0][2].lock, t[0][3].lock),
                    c.add(a[3].fire),
                    o[a[0]] = function() {
                        return o[a[0] + "With"](this === o ? void 0 : this, arguments),
                        this
                    }
                    ,
                    o[a[0] + "With"] = c.fireWith
                }),
                r.promise(o),
                e && e.call(o, o),
                o
            },
            when: function(e) {
                var t = arguments.length
                  , n = t
                  , r = Array(n)
                  , o = Z.call(arguments)
                  , u = i.Deferred()
                  , a = function(c) {
                    return function(f) {
                        r[c] = this,
                        o[c] = arguments.length > 1 ? Z.call(arguments) : f,
                        --t || u.resolveWith(r, o)
                    }
                };
                if (t <= 1 && (Xt(e, u.done(a(n)).resolve, u.reject, !t),
                u.state() === "pending" || L(o[n] && o[n].then)))
                    return u.then();
                for (; n--; )
                    Xt(o[n], a(n), u.reject);
                return u.promise()
            }
        });
        var zn = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        i.Deferred.exceptionHook = function(e, t) {
            j.console && j.console.warn && e && zn.test(e.name) && j.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
        }
        ,
        i.readyException = function(e) {
            j.setTimeout(function() {
                throw e
            })
        }
        ;
        var ht = i.Deferred();
        i.fn.ready = function(e) {
            return ht.then(e).catch(function(t) {
                i.readyException(t)
            }),
            this
        }
        ,
        i.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(e) {
                (e === !0 ? --i.readyWait : i.isReady) || (i.isReady = !0,
                !(e !== !0 && --i.readyWait > 0) && ht.resolveWith(k, [i]))
            }
        }),
        i.ready.then = ht.then;
        function tt() {
            k.removeEventListener("DOMContentLoaded", tt),
            j.removeEventListener("load", tt),
            i.ready()
        }
        k.readyState === "complete" || k.readyState !== "loading" && !k.documentElement.doScroll ? j.setTimeout(i.ready) : (k.addEventListener("DOMContentLoaded", tt),
        j.addEventListener("load", tt));
        var he = function(e, t, n, r, o, u, a) {
            var c = 0
              , f = e.length
              , d = n == null;
            if (Ae(n) === "object") {
                o = !0;
                for (c in n)
                    he(e, t, c, n[c], !0, u, a)
            } else if (r !== void 0 && (o = !0,
            L(r) || (a = !0),
            d && (a ? (t.call(e, r),
            t = null) : (d = t,
            t = function(y, x, h) {
                return d.call(i(y), h)
            }
            )),
            t))
                for (; c < f; c++)
                    t(e[c], n, a ? r : r.call(e[c], c, t(e[c], n)));
            return o ? e : d ? t.call(e) : f ? t(e[0], n) : u
        }
          , Un = /^-ms-/
          , Vn = /-([a-z])/g;
        function Xn(e, t) {
            return t.toUpperCase()
        }
        function ue(e) {
            return e.replace(Un, "ms-").replace(Vn, Xn)
        }
        var Fe = function(e) {
            return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
        };
        function We() {
            this.expando = i.expando + We.uid++
        }
        We.uid = 1,
        We.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {},
                Fe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))),
                t
            },
            set: function(e, t, n) {
                var r, o = this.cache(e);
                if (typeof t == "string")
                    o[ue(t)] = n;
                else
                    for (r in t)
                        o[ue(r)] = t[r];
                return o
            },
            get: function(e, t) {
                return t === void 0 ? this.cache(e) : e[this.expando] && e[this.expando][ue(t)]
            },
            access: function(e, t, n) {
                return t === void 0 || t && typeof t == "string" && n === void 0 ? this.get(e, t) : (this.set(e, t, n),
                n !== void 0 ? n : t)
            },
            remove: function(e, t) {
                var n, r = e[this.expando];
                if (r !== void 0) {
                    if (t !== void 0)
                        for (Array.isArray(t) ? t = t.map(ue) : (t = ue(t),
                        t = t in r ? [t] : t.match(oe) || []),
                        n = t.length; n--; )
                            delete r[t[n]];
                    (t === void 0 || i.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return t !== void 0 && !i.isEmptyObject(t)
            }
        };
        var S = new We
          , Q = new We
          , Gn = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
          , Qn = /[A-Z]/g;
        function Yn(e) {
            return e === "true" ? !0 : e === "false" ? !1 : e === "null" ? null : e === +e + "" ? +e : Gn.test(e) ? JSON.parse(e) : e
        }
        function Gt(e, t, n) {
            var r;
            if (n === void 0 && e.nodeType === 1)
                if (r = "data-" + t.replace(Qn, "-$&").toLowerCase(),
                n = e.getAttribute(r),
                typeof n == "string") {
                    try {
                        n = Yn(n)
                    } catch (o) {}
                    Q.set(e, t, n)
                } else
                    n = void 0;
            return n
        }
        i.extend({
            hasData: function(e) {
                return Q.hasData(e) || S.hasData(e)
            },
            data: function(e, t, n) {
                return Q.access(e, t, n)
            },
            removeData: function(e, t) {
                Q.remove(e, t)
            },
            _data: function(e, t, n) {
                return S.access(e, t, n)
            },
            _removeData: function(e, t) {
                S.remove(e, t)
            }
        }),
        i.fn.extend({
            data: function(e, t) {
                var n, r, o, u = this[0], a = u && u.attributes;
                if (e === void 0) {
                    if (this.length && (o = Q.get(u),
                    u.nodeType === 1 && !S.get(u, "hasDataAttrs"))) {
                        for (n = a.length; n--; )
                            a[n] && (r = a[n].name,
                            r.indexOf("data-") === 0 && (r = ue(r.slice(5)),
                            Gt(u, r, o[r])));
                        S.set(u, "hasDataAttrs", !0)
                    }
                    return o
                }
                return typeof e == "object" ? this.each(function() {
                    Q.set(this, e)
                }) : he(this, function(c) {
                    var f;
                    if (u && c === void 0)
                        return f = Q.get(u, e),
                        f !== void 0 || (f = Gt(u, e),
                        f !== void 0) ? f : void 0;
                    this.each(function() {
                        Q.set(this, e, c)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    Q.remove(this, e)
                })
            }
        }),
        i.extend({
            queue: function(e, t, n) {
                var r;
                if (e)
                    return t = (t || "fx") + "queue",
                    r = S.get(e, t),
                    n && (!r || Array.isArray(n) ? r = S.access(e, t, i.makeArray(n)) : r.push(n)),
                    r || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = i.queue(e, t)
                  , r = n.length
                  , o = n.shift()
                  , u = i._queueHooks(e, t)
                  , a = function() {
                    i.dequeue(e, t)
                };
                o === "inprogress" && (o = n.shift(),
                r--),
                o && (t === "fx" && n.unshift("inprogress"),
                delete u.stop,
                o.call(e, a, u)),
                !r && u && u.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return S.get(e, n) || S.access(e, n, {
                    empty: i.Callbacks("once memory").add(function() {
                        S.remove(e, [t + "queue", n])
                    })
                })
            }
        }),
        i.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return typeof e != "string" && (t = e,
                e = "fx",
                n--),
                arguments.length < n ? i.queue(this[0], e) : t === void 0 ? this : this.each(function() {
                    var r = i.queue(this, e, t);
                    i._queueHooks(this, e),
                    e === "fx" && r[0] !== "inprogress" && i.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    i.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, r = 1, o = i.Deferred(), u = this, a = this.length, c = function() {
                    --r || o.resolveWith(u, [u])
                };
                for (typeof e != "string" && (t = e,
                e = void 0),
                e = e || "fx"; a--; )
                    n = S.get(u[a], e + "queueHooks"),
                    n && n.empty && (r++,
                    n.empty.add(c));
                return c(),
                o.promise(t)
            }
        });
        var Qt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
          , $e = new RegExp("^(?:([+-])=|)(" + Qt + ")([a-z%]*)$","i")
          , ge = ["Top", "Right", "Bottom", "Left"]
          , Te = k.documentElement
          , je = function(e) {
            return i.contains(e.ownerDocument, e)
        }
          , Jn = {
            composed: !0
        };
        Te.getRootNode && (je = function(e) {
            return i.contains(e.ownerDocument, e) || e.getRootNode(Jn) === e.ownerDocument
        }
        );
        var nt = function(e, t) {
            return e = t || e,
            e.style.display === "none" || e.style.display === "" && je(e) && i.css(e, "display") === "none"
        };
        function Yt(e, t, n, r) {
            var o, u, a = 20, c = r ? function() {
                return r.cur()
            }
            : function() {
                return i.css(e, t, "")
            }
            , f = c(), d = n && n[3] || (i.cssNumber[t] ? "" : "px"), y = e.nodeType && (i.cssNumber[t] || d !== "px" && +f) && $e.exec(i.css(e, t));
            if (y && y[3] !== d) {
                for (f = f / 2,
                d = d || y[3],
                y = +f || 1; a--; )
                    i.style(e, t, y + d),
                    (1 - u) * (1 - (u = c() / f || .5)) <= 0 && (a = 0),
                    y = y / u;
                y = y * 2,
                i.style(e, t, y + d),
                n = n || []
            }
            return n && (y = +y || +f || 0,
            o = n[1] ? y + (n[1] + 1) * n[2] : +n[2],
            r && (r.unit = d,
            r.start = y,
            r.end = o)),
            o
        }
        var Jt = {};
        function Kn(e) {
            var t, n = e.ownerDocument, r = e.nodeName, o = Jt[r];
            return o || (t = n.body.appendChild(n.createElement(r)),
            o = i.css(t, "display"),
            t.parentNode.removeChild(t),
            o === "none" && (o = "block"),
            Jt[r] = o,
            o)
        }
        function qe(e, t) {
            for (var n, r, o = [], u = 0, a = e.length; u < a; u++)
                r = e[u],
                r.style && (n = r.style.display,
                t ? (n === "none" && (o[u] = S.get(r, "display") || null,
                o[u] || (r.style.display = "")),
                r.style.display === "" && nt(r) && (o[u] = Kn(r))) : n !== "none" && (o[u] = "none",
                S.set(r, "display", n)));
            for (u = 0; u < a; u++)
                o[u] != null && (e[u].style.display = o[u]);
            return e
        }
        i.fn.extend({
            show: function() {
                return qe(this, !0)
            },
            hide: function() {
                return qe(this)
            },
            toggle: function(e) {
                return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
                    nt(this) ? i(this).show() : i(this).hide()
                })
            }
        });
        var Be = /^(?:checkbox|radio)$/i
          , Kt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
          , Zt = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
            var e = k.createDocumentFragment()
              , t = e.appendChild(k.createElement("div"))
              , n = k.createElement("input");
            n.setAttribute("type", "radio"),
            n.setAttribute("checked", "checked"),
            n.setAttribute("name", "t"),
            t.appendChild(n),
            q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
            t.innerHTML = "<textarea>x</textarea>",
            q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue,
            t.innerHTML = "<option></option>",
            q.option = !!t.lastChild
        }
        )();
        var ee = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        ee.tbody = ee.tfoot = ee.colgroup = ee.caption = ee.thead,
        ee.th = ee.td,
        q.option || (ee.optgroup = ee.option = [1, "<select multiple='multiple'>", "</select>"]);
        function Y(e, t) {
            var n;
            return typeof e.getElementsByTagName != "undefined" ? n = e.getElementsByTagName(t || "*") : typeof e.querySelectorAll != "undefined" ? n = e.querySelectorAll(t || "*") : n = [],
            t === void 0 || t && $(e, t) ? i.merge([e], n) : n
        }
        function gt(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                S.set(e[n], "globalEval", !t || S.get(t[n], "globalEval"))
        }
        var Zn = /<|&#?\w+;/;
        function en(e, t, n, r, o) {
            for (var u, a, c, f, d, y, x = t.createDocumentFragment(), h = [], b = 0, A = e.length; b < A; b++)
                if (u = e[b],
                u || u === 0)
                    if (Ae(u) === "object")
                        i.merge(h, u.nodeType ? [u] : u);
                    else if (!Zn.test(u))
                        h.push(t.createTextNode(u));
                    else {
                        for (a = a || x.appendChild(t.createElement("div")),
                        c = (Kt.exec(u) || ["", ""])[1].toLowerCase(),
                        f = ee[c] || ee._default,
                        a.innerHTML = f[1] + i.htmlPrefilter(u) + f[2],
                        y = f[0]; y--; )
                            a = a.lastChild;
                        i.merge(h, a.childNodes),
                        a = x.firstChild,
                        a.textContent = ""
                    }
            for (x.textContent = "",
            b = 0; u = h[b++]; ) {
                if (r && i.inArray(u, r) > -1) {
                    o && o.push(u);
                    continue
                }
                if (d = je(u),
                a = Y(x.appendChild(u), "script"),
                d && gt(a),
                n)
                    for (y = 0; u = a[y++]; )
                        Zt.test(u.type || "") && n.push(u)
            }
            return x
        }
        var tn = /^([^.]*)(?:\.(.+)|)/;
        function Le() {
            return !0
        }
        function He() {
            return !1
        }
        function yt(e, t, n, r, o, u) {
            var a, c;
            if (typeof t == "object") {
                typeof n != "string" && (r = r || n,
                n = void 0);
                for (c in t)
                    yt(e, c, n, r, t[c], u);
                return e
            }
            if (r == null && o == null ? (o = n,
            r = n = void 0) : o == null && (typeof n == "string" ? (o = r,
            r = void 0) : (o = r,
            r = n,
            n = void 0)),
            o === !1)
                o = He;
            else if (!o)
                return e;
            return u === 1 && (a = o,
            o = function(f) {
                return i().off(f),
                a.apply(this, arguments)
            }
            ,
            o.guid = a.guid || (a.guid = i.guid++)),
            e.each(function() {
                i.event.add(this, t, o, r, n)
            })
        }
        i.event = {
            global: {},
            add: function(e, t, n, r, o) {
                var u, a, c, f, d, y, x, h, b, A, R, H = S.get(e);
                if (Fe(e))
                    for (n.handler && (u = n,
                    n = u.handler,
                    o = u.selector),
                    o && i.find.matchesSelector(Te, o),
                    n.guid || (n.guid = i.guid++),
                    (f = H.events) || (f = H.events = Object.create(null)),
                    (a = H.handle) || (a = H.handle = function(V) {
                        return typeof i != "undefined" && i.event.triggered !== V.type ? i.event.dispatch.apply(e, arguments) : void 0
                    }
                    ),
                    t = (t || "").match(oe) || [""],
                    d = t.length; d--; )
                        c = tn.exec(t[d]) || [],
                        b = R = c[1],
                        A = (c[2] || "").split(".").sort(),
                        b && (x = i.event.special[b] || {},
                        b = (o ? x.delegateType : x.bindType) || b,
                        x = i.event.special[b] || {},
                        y = i.extend({
                            type: b,
                            origType: R,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: o,
                            needsContext: o && i.expr.match.needsContext.test(o),
                            namespace: A.join(".")
                        }, u),
                        (h = f[b]) || (h = f[b] = [],
                        h.delegateCount = 0,
                        (!x.setup || x.setup.call(e, r, A, a) === !1) && e.addEventListener && e.addEventListener(b, a)),
                        x.add && (x.add.call(e, y),
                        y.handler.guid || (y.handler.guid = n.guid)),
                        o ? h.splice(h.delegateCount++, 0, y) : h.push(y),
                        i.event.global[b] = !0)
            },
            remove: function(e, t, n, r, o) {
                var u, a, c, f, d, y, x, h, b, A, R, H = S.hasData(e) && S.get(e);
                if (!(!H || !(f = H.events))) {
                    for (t = (t || "").match(oe) || [""],
                    d = t.length; d--; ) {
                        if (c = tn.exec(t[d]) || [],
                        b = R = c[1],
                        A = (c[2] || "").split(".").sort(),
                        !b) {
                            for (b in f)
                                i.event.remove(e, b + t[d], n, r, !0);
                            continue
                        }
                        for (x = i.event.special[b] || {},
                        b = (r ? x.delegateType : x.bindType) || b,
                        h = f[b] || [],
                        c = c[2] && new RegExp("(^|\\.)" + A.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        a = u = h.length; u--; )
                            y = h[u],
                            (o || R === y.origType) && (!n || n.guid === y.guid) && (!c || c.test(y.namespace)) && (!r || r === y.selector || r === "**" && y.selector) && (h.splice(u, 1),
                            y.selector && h.delegateCount--,
                            x.remove && x.remove.call(e, y));
                        a && !h.length && ((!x.teardown || x.teardown.call(e, A, H.handle) === !1) && i.removeEvent(e, b, H.handle),
                        delete f[b])
                    }
                    i.isEmptyObject(f) && S.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, r, o, u, a, c = new Array(arguments.length), f = i.event.fix(e), d = (S.get(this, "events") || Object.create(null))[f.type] || [], y = i.event.special[f.type] || {};
                for (c[0] = f,
                t = 1; t < arguments.length; t++)
                    c[t] = arguments[t];
                if (f.delegateTarget = this,
                !(y.preDispatch && y.preDispatch.call(this, f) === !1)) {
                    for (a = i.event.handlers.call(this, f, d),
                    t = 0; (o = a[t++]) && !f.isPropagationStopped(); )
                        for (f.currentTarget = o.elem,
                        n = 0; (u = o.handlers[n++]) && !f.isImmediatePropagationStopped(); )
                            (!f.rnamespace || u.namespace === !1 || f.rnamespace.test(u.namespace)) && (f.handleObj = u,
                            f.data = u.data,
                            r = ((i.event.special[u.origType] || {}).handle || u.handler).apply(o.elem, c),
                            r !== void 0 && (f.result = r) === !1 && (f.preventDefault(),
                            f.stopPropagation()));
                    return y.postDispatch && y.postDispatch.call(this, f),
                    f.result
                }
            },
            handlers: function(e, t) {
                var n, r, o, u, a, c = [], f = t.delegateCount, d = e.target;
                if (f && d.nodeType && !(e.type === "click" && e.button >= 1)) {
                    for (; d !== this; d = d.parentNode || this)
                        if (d.nodeType === 1 && !(e.type === "click" && d.disabled === !0)) {
                            for (u = [],
                            a = {},
                            n = 0; n < f; n++)
                                r = t[n],
                                o = r.selector + " ",
                                a[o] === void 0 && (a[o] = r.needsContext ? i(o, this).index(d) > -1 : i.find(o, this, null, [d]).length),
                                a[o] && u.push(r);
                            u.length && c.push({
                                elem: d,
                                handlers: u
                            })
                        }
                }
                return d = this,
                f < t.length && c.push({
                    elem: d,
                    handlers: t.slice(f)
                }),
                c
            },
            addProp: function(e, t) {
                Object.defineProperty(i.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: L(t) ? function() {
                        if (this.originalEvent)
                            return t(this.originalEvent)
                    }
                    : function() {
                        if (this.originalEvent)
                            return this.originalEvent[e]
                    }
                    ,
                    set: function(n) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: n
                        })
                    }
                })
            },
            fix: function(e) {
                return e[i.expando] ? e : new i.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(e) {
                        var t = this || e;
                        return Be.test(t.type) && t.click && $(t, "input") && rt(t, "click", !0),
                        !1
                    },
                    trigger: function(e) {
                        var t = this || e;
                        return Be.test(t.type) && t.click && $(t, "input") && rt(t, "click"),
                        !0
                    },
                    _default: function(e) {
                        var t = e.target;
                        return Be.test(t.type) && t.click && $(t, "input") && S.get(t, "click") || $(t, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        e.result !== void 0 && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        };
        function rt(e, t, n) {
            if (!n) {
                S.get(e, t) === void 0 && i.event.add(e, t, Le);
                return
            }
            S.set(e, t, !1),
            i.event.add(e, t, {
                namespace: !1,
                handler: function(r) {
                    var o, u = S.get(this, t);
                    if (r.isTrigger & 1 && this[t]) {
                        if (u)
                            (i.event.special[t] || {}).delegateType && r.stopPropagation();
                        else if (u = Z.call(arguments),
                        S.set(this, t, u),
                        this[t](),
                        o = S.get(this, t),
                        S.set(this, t, !1),
                        u !== o)
                            return r.stopImmediatePropagation(),
                            r.preventDefault(),
                            o
                    } else
                        u && (S.set(this, t, i.event.trigger(u[0], u.slice(1), this)),
                        r.stopPropagation(),
                        r.isImmediatePropagationStopped = Le)
                }
            })
        }
        i.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }
        ,
        i.Event = function(e, t) {
            if (!(this instanceof i.Event))
                return new i.Event(e,t);
            e && e.type ? (this.originalEvent = e,
            this.type = e.type,
            this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === void 0 && e.returnValue === !1 ? Le : He,
            this.target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target,
            this.currentTarget = e.currentTarget,
            this.relatedTarget = e.relatedTarget) : this.type = e,
            t && i.extend(this, t),
            this.timeStamp = e && e.timeStamp || Date.now(),
            this[i.expando] = !0
        }
        ,
        i.Event.prototype = {
            constructor: i.Event,
            isDefaultPrevented: He,
            isPropagationStopped: He,
            isImmediatePropagationStopped: He,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = Le,
                e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = Le,
                e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = Le,
                e && !this.isSimulated && e.stopImmediatePropagation(),
                this.stopPropagation()
            }
        },
        i.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: !0
        }, i.event.addProp),
        i.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            function n(r) {
                if (k.documentMode) {
                    var o = S.get(this, "handle")
                      , u = i.event.fix(r);
                    u.type = r.type === "focusin" ? "focus" : "blur",
                    u.isSimulated = !0,
                    o(r),
                    u.target === u.currentTarget && o(u)
                } else
                    i.event.simulate(t, r.target, i.event.fix(r))
            }
            i.event.special[e] = {
                setup: function() {
                    var r;
                    if (rt(this, e, !0),
                    k.documentMode)
                        r = S.get(this, t),
                        r || this.addEventListener(t, n),
                        S.set(this, t, (r || 0) + 1);
                    else
                        return !1
                },
                trigger: function() {
                    return rt(this, e),
                    !0
                },
                teardown: function() {
                    var r;
                    if (k.documentMode)
                        r = S.get(this, t) - 1,
                        r ? S.set(this, t, r) : (this.removeEventListener(t, n),
                        S.remove(this, t));
                    else
                        return !1
                },
                _default: function(r) {
                    return S.get(r.target, e)
                },
                delegateType: t
            },
            i.event.special[t] = {
                setup: function() {
                    var r = this.ownerDocument || this.document || this
                      , o = k.documentMode ? this : r
                      , u = S.get(o, t);
                    u || (k.documentMode ? this.addEventListener(t, n) : r.addEventListener(e, n, !0)),
                    S.set(o, t, (u || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this.document || this
                      , o = k.documentMode ? this : r
                      , u = S.get(o, t) - 1;
                    u ? S.set(o, t, u) : (k.documentMode ? this.removeEventListener(t, n) : r.removeEventListener(e, n, !0),
                    S.remove(o, t))
                }
            }
        }),
        i.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            i.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(n) {
                    var r, o = this, u = n.relatedTarget, a = n.handleObj;
                    return (!u || u !== o && !i.contains(o, u)) && (n.type = a.origType,
                    r = a.handler.apply(this, arguments),
                    n.type = t),
                    r
                }
            }
        }),
        i.fn.extend({
            on: function(e, t, n, r) {
                return yt(this, e, t, n, r)
            },
            one: function(e, t, n, r) {
                return yt(this, e, t, n, r, 1)
            },
            off: function(e, t, n) {
                var r, o;
                if (e && e.preventDefault && e.handleObj)
                    return r = e.handleObj,
                    i(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                    this;
                if (typeof e == "object") {
                    for (o in e)
                        this.off(o, t, e[o]);
                    return this
                }
                return (t === !1 || typeof t == "function") && (n = t,
                t = void 0),
                n === !1 && (n = He),
                this.each(function() {
                    i.event.remove(this, e, n, t)
                })
            }
        });
        var er = /<script|<style|<link/i
          , tr = /checked\s*(?:[^=]|=\s*.checked.)/i
          , nr = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
        function nn(e, t) {
            return $(e, "table") && $(t.nodeType !== 11 ? t : t.firstChild, "tr") && i(e).children("tbody")[0] || e
        }
        function rr(e) {
            return e.type = (e.getAttribute("type") !== null) + "/" + e.type,
            e
        }
        function ir(e) {
            return (e.type || "").slice(0, 5) === "true/" ? e.type = e.type.slice(5) : e.removeAttribute("type"),
            e
        }
        function rn(e, t) {
            var n, r, o, u, a, c, f;
            if (t.nodeType === 1) {
                if (S.hasData(e) && (u = S.get(e),
                f = u.events,
                f)) {
                    S.remove(t, "handle events");
                    for (o in f)
                        for (n = 0,
                        r = f[o].length; n < r; n++)
                            i.event.add(t, o, f[o][n])
                }
                Q.hasData(e) && (a = Q.access(e),
                c = i.extend({}, a),
                Q.set(t, c))
            }
        }
        function or(e, t) {
            var n = t.nodeName.toLowerCase();
            n === "input" && Be.test(e.type) ? t.checked = e.checked : (n === "input" || n === "textarea") && (t.defaultValue = e.defaultValue)
        }
        function Oe(e, t, n, r) {
            t = Rt(t);
            var o, u, a, c, f, d, y = 0, x = e.length, h = x - 1, b = t[0], A = L(b);
            if (A || x > 1 && typeof b == "string" && !q.checkClone && tr.test(b))
                return e.each(function(R) {
                    var H = e.eq(R);
                    A && (t[0] = b.call(this, R, H.html())),
                    Oe(H, t, n, r)
                });
            if (x && (o = en(t, e[0].ownerDocument, !1, e, r),
            u = o.firstChild,
            o.childNodes.length === 1 && (o = u),
            u || r)) {
                for (a = i.map(Y(o, "script"), rr),
                c = a.length; y < x; y++)
                    f = o,
                    y !== h && (f = i.clone(f, !0, !0),
                    c && i.merge(a, Y(f, "script"))),
                    n.call(e[y], f, y);
                if (c)
                    for (d = a[a.length - 1].ownerDocument,
                    i.map(a, ir),
                    y = 0; y < c; y++)
                        f = a[y],
                        Zt.test(f.type || "") && !S.access(f, "globalEval") && i.contains(d, f) && (f.src && (f.type || "").toLowerCase() !== "module" ? i._evalUrl && !f.noModule && i._evalUrl(f.src, {
                            nonce: f.nonce || f.getAttribute("nonce")
                        }, d) : Ft(f.textContent.replace(nr, ""), f, d))
            }
            return e
        }
        function on(e, t, n) {
            for (var r, o = t ? i.filter(t, e) : e, u = 0; (r = o[u]) != null; u++)
                !n && r.nodeType === 1 && i.cleanData(Y(r)),
                r.parentNode && (n && je(r) && gt(Y(r, "script")),
                r.parentNode.removeChild(r));
            return e
        }
        i.extend({
            htmlPrefilter: function(e) {
                return e
            },
            clone: function(e, t, n) {
                var r, o, u, a, c = e.cloneNode(!0), f = je(e);
                if (!q.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !i.isXMLDoc(e))
                    for (a = Y(c),
                    u = Y(e),
                    r = 0,
                    o = u.length; r < o; r++)
                        or(u[r], a[r]);
                if (t)
                    if (n)
                        for (u = u || Y(e),
                        a = a || Y(c),
                        r = 0,
                        o = u.length; r < o; r++)
                            rn(u[r], a[r]);
                    else
                        rn(e, c);
                return a = Y(c, "script"),
                a.length > 0 && gt(a, !f && Y(e, "script")),
                c
            },
            cleanData: function(e) {
                for (var t, n, r, o = i.event.special, u = 0; (n = e[u]) !== void 0; u++)
                    if (Fe(n)) {
                        if (t = n[S.expando]) {
                            if (t.events)
                                for (r in t.events)
                                    o[r] ? i.event.remove(n, r) : i.removeEvent(n, r, t.handle);
                            n[S.expando] = void 0
                        }
                        n[Q.expando] && (n[Q.expando] = void 0)
                    }
            }
        }),
        i.fn.extend({
            detach: function(e) {
                return on(this, e, !0)
            },
            remove: function(e) {
                return on(this, e)
            },
            text: function(e) {
                return he(this, function(t) {
                    return t === void 0 ? i.text(this) : this.empty().each(function() {
                        (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = t)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return Oe(this, arguments, function(e) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = nn(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return Oe(this, arguments, function(e) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = nn(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return Oe(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return Oe(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; (e = this[t]) != null; t++)
                    e.nodeType === 1 && (i.cleanData(Y(e, !1)),
                    e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = e == null ? !1 : e,
                t = t == null ? e : t,
                this.map(function() {
                    return i.clone(this, e, t)
                })
            },
            html: function(e) {
                return he(this, function(t) {
                    var n = this[0] || {}
                      , r = 0
                      , o = this.length;
                    if (t === void 0 && n.nodeType === 1)
                        return n.innerHTML;
                    if (typeof t == "string" && !er.test(t) && !ee[(Kt.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = i.htmlPrefilter(t);
                        try {
                            for (; r < o; r++)
                                n = this[r] || {},
                                n.nodeType === 1 && (i.cleanData(Y(n, !1)),
                                n.innerHTML = t);
                            n = 0
                        } catch (u) {}
                    }
                    n && this.empty().append(t)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return Oe(this, arguments, function(t) {
                    var n = this.parentNode;
                    i.inArray(this, e) < 0 && (i.cleanData(Y(this)),
                    n && n.replaceChild(t, this))
                }, e)
            }
        }),
        i.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            i.fn[e] = function(n) {
                for (var r, o = [], u = i(n), a = u.length - 1, c = 0; c <= a; c++)
                    r = c === a ? this : this.clone(!0),
                    i(u[c])[t](r),
                    Ke.apply(o, r.get());
                return this.pushStack(o)
            }
        });
        var vt = new RegExp("^(" + Qt + ")(?!px)[a-z%]+$","i")
          , xt = /^--/
          , it = function(e) {
            var t = e.ownerDocument.defaultView;
            return (!t || !t.opener) && (t = j),
            t.getComputedStyle(e)
        }
          , un = function(e, t, n) {
            var r, o, u = {};
            for (o in t)
                u[o] = e.style[o],
                e.style[o] = t[o];
            r = n.call(e);
            for (o in t)
                e.style[o] = u[o];
            return r
        }
          , ur = new RegExp(ge.join("|"),"i");
        (function() {
            function e() {
                if (d) {
                    f.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                    d.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                    Te.appendChild(f).appendChild(d);
                    var y = j.getComputedStyle(d);
                    n = y.top !== "1%",
                    c = t(y.marginLeft) === 12,
                    d.style.right = "60%",
                    u = t(y.right) === 36,
                    r = t(y.width) === 36,
                    d.style.position = "absolute",
                    o = t(d.offsetWidth / 3) === 12,
                    Te.removeChild(f),
                    d = null
                }
            }
            function t(y) {
                return Math.round(parseFloat(y))
            }
            var n, r, o, u, a, c, f = k.createElement("div"), d = k.createElement("div");
            d.style && (d.style.backgroundClip = "content-box",
            d.cloneNode(!0).style.backgroundClip = "",
            q.clearCloneStyle = d.style.backgroundClip === "content-box",
            i.extend(q, {
                boxSizingReliable: function() {
                    return e(),
                    r
                },
                pixelBoxStyles: function() {
                    return e(),
                    u
                },
                pixelPosition: function() {
                    return e(),
                    n
                },
                reliableMarginLeft: function() {
                    return e(),
                    c
                },
                scrollboxSize: function() {
                    return e(),
                    o
                },
                reliableTrDimensions: function() {
                    var y, x, h, b;
                    return a == null && (y = k.createElement("table"),
                    x = k.createElement("tr"),
                    h = k.createElement("div"),
                    y.style.cssText = "position:absolute;left:-11111px;border-collapse:separate",
                    x.style.cssText = "box-sizing:content-box;border:1px solid",
                    x.style.height = "1px",
                    h.style.height = "9px",
                    h.style.display = "block",
                    Te.appendChild(y).appendChild(x).appendChild(h),
                    b = j.getComputedStyle(x),
                    a = parseInt(b.height, 10) + parseInt(b.borderTopWidth, 10) + parseInt(b.borderBottomWidth, 10) === x.offsetHeight,
                    Te.removeChild(y)),
                    a
                }
            }))
        }
        )();
        function ze(e, t, n) {
            var r, o, u, a, c = xt.test(t), f = e.style;
            return n = n || it(e),
            n && (a = n.getPropertyValue(t) || n[t],
            c && a && (a = a.replace(_e, "$1") || void 0),
            a === "" && !je(e) && (a = i.style(e, t)),
            !q.pixelBoxStyles() && vt.test(a) && ur.test(t) && (r = f.width,
            o = f.minWidth,
            u = f.maxWidth,
            f.minWidth = f.maxWidth = f.width = a,
            a = n.width,
            f.width = r,
            f.minWidth = o,
            f.maxWidth = u)),
            a !== void 0 ? a + "" : a
        }
        function an(e, t) {
            return {
                get: function() {
                    if (e()) {
                        delete this.get;
                        return
                    }
                    return (this.get = t).apply(this, arguments)
                }
            }
        }
        var sn = ["Webkit", "Moz", "ms"]
          , fn = k.createElement("div").style
          , cn = {};
        function ar(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = sn.length; n--; )
                if (e = sn[n] + t,
                e in fn)
                    return e
        }
        function bt(e) {
            var t = i.cssProps[e] || cn[e];
            return t || (e in fn ? e : cn[e] = ar(e) || e)
        }
        var sr = /^(none|table(?!-c[ea]).+)/
          , fr = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }
          , ln = {
            letterSpacing: "0",
            fontWeight: "400"
        };
        function dn(e, t, n) {
            var r = $e.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
        }
        function mt(e, t, n, r, o, u) {
            var a = t === "width" ? 1 : 0
              , c = 0
              , f = 0
              , d = 0;
            if (n === (r ? "border" : "content"))
                return 0;
            for (; a < 4; a += 2)
                n === "margin" && (d += i.css(e, n + ge[a], !0, o)),
                r ? (n === "content" && (f -= i.css(e, "padding" + ge[a], !0, o)),
                n !== "margin" && (f -= i.css(e, "border" + ge[a] + "Width", !0, o))) : (f += i.css(e, "padding" + ge[a], !0, o),
                n !== "padding" ? f += i.css(e, "border" + ge[a] + "Width", !0, o) : c += i.css(e, "border" + ge[a] + "Width", !0, o));
            return !r && u >= 0 && (f += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - u - f - c - .5)) || 0),
            f + d
        }
        function pn(e, t, n) {
            var r = it(e)
              , o = !q.boxSizingReliable() || n
              , u = o && i.css(e, "boxSizing", !1, r) === "border-box"
              , a = u
              , c = ze(e, t, r)
              , f = "offset" + t[0].toUpperCase() + t.slice(1);
            if (vt.test(c)) {
                if (!n)
                    return c;
                c = "auto"
            }
            return (!q.boxSizingReliable() && u || !q.reliableTrDimensions() && $(e, "tr") || c === "auto" || !parseFloat(c) && i.css(e, "display", !1, r) === "inline") && e.getClientRects().length && (u = i.css(e, "boxSizing", !1, r) === "border-box",
            a = f in e,
            a && (c = e[f])),
            c = parseFloat(c) || 0,
            c + mt(e, t, n || (u ? "border" : "content"), a, r, c) + "px"
        }
        i.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = ze(e, "opacity");
                            return n === "" ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                aspectRatio: !0,
                borderImageSlice: !0,
                columnCount: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                scale: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
                fillOpacity: !0,
                floodOpacity: !0,
                stopOpacity: !0,
                strokeMiterlimit: !0,
                strokeOpacity: !0
            },
            cssProps: {},
            style: function(e, t, n, r) {
                if (!(!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)) {
                    var o, u, a, c = ue(t), f = xt.test(t), d = e.style;
                    if (f || (t = bt(c)),
                    a = i.cssHooks[t] || i.cssHooks[c],
                    n !== void 0) {
                        if (u = typeof n,
                        u === "string" && (o = $e.exec(n)) && o[1] && (n = Yt(e, t, o),
                        u = "number"),
                        n == null || n !== n)
                            return;
                        u === "number" && !f && (n += o && o[3] || (i.cssNumber[c] ? "" : "px")),
                        !q.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (d[t] = "inherit"),
                        (!a || !("set"in a) || (n = a.set(e, n, r)) !== void 0) && (f ? d.setProperty(t, n) : d[t] = n)
                    } else
                        return a && "get"in a && (o = a.get(e, !1, r)) !== void 0 ? o : d[t]
                }
            },
            css: function(e, t, n, r) {
                var o, u, a, c = ue(t), f = xt.test(t);
                return f || (t = bt(c)),
                a = i.cssHooks[t] || i.cssHooks[c],
                a && "get"in a && (o = a.get(e, !0, n)),
                o === void 0 && (o = ze(e, t, r)),
                o === "normal" && t in ln && (o = ln[t]),
                n === "" || n ? (u = parseFloat(o),
                n === !0 || isFinite(u) ? u || 0 : o) : o
            }
        }),
        i.each(["height", "width"], function(e, t) {
            i.cssHooks[t] = {
                get: function(n, r, o) {
                    if (r)
                        return sr.test(i.css(n, "display")) && (!n.getClientRects().length || !n.getBoundingClientRect().width) ? un(n, fr, function() {
                            return pn(n, t, o)
                        }) : pn(n, t, o)
                },
                set: function(n, r, o) {
                    var u, a = it(n), c = !q.scrollboxSize() && a.position === "absolute", f = c || o, d = f && i.css(n, "boxSizing", !1, a) === "border-box", y = o ? mt(n, t, o, d, a) : 0;
                    return d && c && (y -= Math.ceil(n["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(a[t]) - mt(n, t, "border", !1, a) - .5)),
                    y && (u = $e.exec(r)) && (u[3] || "px") !== "px" && (n.style[t] = r,
                    r = i.css(n, t)),
                    dn(n, r, y)
                }
            }
        }),
        i.cssHooks.marginLeft = an(q.reliableMarginLeft, function(e, t) {
            if (t)
                return (parseFloat(ze(e, "marginLeft")) || e.getBoundingClientRect().left - un(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                })) + "px"
        }),
        i.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            i.cssHooks[e + t] = {
                expand: function(n) {
                    for (var r = 0, o = {}, u = typeof n == "string" ? n.split(" ") : [n]; r < 4; r++)
                        o[e + ge[r] + t] = u[r] || u[r - 2] || u[0];
                    return o
                }
            },
            e !== "margin" && (i.cssHooks[e + t].set = dn)
        }),
        i.fn.extend({
            css: function(e, t) {
                return he(this, function(n, r, o) {
                    var u, a, c = {}, f = 0;
                    if (Array.isArray(r)) {
                        for (u = it(n),
                        a = r.length; f < a; f++)
                            c[r[f]] = i.css(n, r[f], !1, u);
                        return c
                    }
                    return o !== void 0 ? i.style(n, r, o) : i.css(n, r)
                }, e, t, arguments.length > 1)
            }
        });
        function J(e, t, n, r, o) {
            return new J.prototype.init(e,t,n,r,o)
        }
        i.Tween = J,
        J.prototype = {
            constructor: J,
            init: function(e, t, n, r, o, u) {
                this.elem = e,
                this.prop = n,
                this.easing = o || i.easing._default,
                this.options = t,
                this.start = this.now = this.cur(),
                this.end = r,
                this.unit = u || (i.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = J.propHooks[this.prop];
                return e && e.get ? e.get(this) : J.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = J.propHooks[this.prop];
                return this.options.duration ? this.pos = t = i.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                this.now = (this.end - this.start) * t + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this),
                n && n.set ? n.set(this) : J.propHooks._default.set(this),
                this
            }
        },
        J.prototype.init.prototype = J.prototype,
        J.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null ? e.elem[e.prop] : (t = i.css(e.elem, e.prop, ""),
                    !t || t === "auto" ? 0 : t)
                },
                set: function(e) {
                    i.fx.step[e.prop] ? i.fx.step[e.prop](e) : e.elem.nodeType === 1 && (i.cssHooks[e.prop] || e.elem.style[bt(e.prop)] != null) ? i.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        },
        J.propHooks.scrollTop = J.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        i.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        },
        i.fx = J.prototype.init,
        i.fx.step = {};
        var Pe, ot, cr = /^(?:toggle|show|hide)$/, lr = /queueHooks$/;
        function Tt() {
            ot && (k.hidden === !1 && j.requestAnimationFrame ? j.requestAnimationFrame(Tt) : j.setTimeout(Tt, i.fx.interval),
            i.fx.tick())
        }
        function hn() {
            return j.setTimeout(function() {
                Pe = void 0
            }),
            Pe = Date.now()
        }
        function ut(e, t) {
            var n, r = 0, o = {
                height: e
            };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
                n = ge[r],
                o["margin" + n] = o["padding" + n] = e;
            return t && (o.opacity = o.width = e),
            o
        }
        function gn(e, t, n) {
            for (var r, o = (re.tweeners[t] || []).concat(re.tweeners["*"]), u = 0, a = o.length; u < a; u++)
                if (r = o[u].call(n, t, e))
                    return r
        }
        function dr(e, t, n) {
            var r, o, u, a, c, f, d, y, x = "width"in t || "height"in t, h = this, b = {}, A = e.style, R = e.nodeType && nt(e), H = S.get(e, "fxshow");
            n.queue || (a = i._queueHooks(e, "fx"),
            a.unqueued == null && (a.unqueued = 0,
            c = a.empty.fire,
            a.empty.fire = function() {
                a.unqueued || c()
            }
            ),
            a.unqueued++,
            h.always(function() {
                h.always(function() {
                    a.unqueued--,
                    i.queue(e, "fx").length || a.empty.fire()
                })
            }));
            for (r in t)
                if (o = t[r],
                cr.test(o)) {
                    if (delete t[r],
                    u = u || o === "toggle",
                    o === (R ? "hide" : "show"))
                        if (o === "show" && H && H[r] !== void 0)
                            R = !0;
                        else
                            continue;
                    b[r] = H && H[r] || i.style(e, r)
                }
            if (f = !i.isEmptyObject(t),
            !(!f && i.isEmptyObject(b))) {
                x && e.nodeType === 1 && (n.overflow = [A.overflow, A.overflowX, A.overflowY],
                d = H && H.display,
                d == null && (d = S.get(e, "display")),
                y = i.css(e, "display"),
                y === "none" && (d ? y = d : (qe([e], !0),
                d = e.style.display || d,
                y = i.css(e, "display"),
                qe([e]))),
                (y === "inline" || y === "inline-block" && d != null) && i.css(e, "float") === "none" && (f || (h.done(function() {
                    A.display = d
                }),
                d == null && (y = A.display,
                d = y === "none" ? "" : y)),
                A.display = "inline-block")),
                n.overflow && (A.overflow = "hidden",
                h.always(function() {
                    A.overflow = n.overflow[0],
                    A.overflowX = n.overflow[1],
                    A.overflowY = n.overflow[2]
                })),
                f = !1;
                for (r in b)
                    f || (H ? "hidden"in H && (R = H.hidden) : H = S.access(e, "fxshow", {
                        display: d
                    }),
                    u && (H.hidden = !R),
                    R && qe([e], !0),
                    h.done(function() {
                        R || qe([e]),
                        S.remove(e, "fxshow");
                        for (r in b)
                            i.style(e, r, b[r])
                    })),
                    f = gn(R ? H[r] : 0, r, h),
                    r in H || (H[r] = f.start,
                    R && (f.end = f.start,
                    f.start = 0))
            }
        }
        function pr(e, t) {
            var n, r, o, u, a;
            for (n in e)
                if (r = ue(n),
                o = t[r],
                u = e[n],
                Array.isArray(u) && (o = u[1],
                u = e[n] = u[0]),
                n !== r && (e[r] = u,
                delete e[n]),
                a = i.cssHooks[r],
                a && "expand"in a) {
                    u = a.expand(u),
                    delete e[r];
                    for (n in u)
                        n in e || (e[n] = u[n],
                        t[n] = o)
                } else
                    t[r] = o
        }
        function re(e, t, n) {
            var r, o, u = 0, a = re.prefilters.length, c = i.Deferred().always(function() {
                delete f.elem
            }), f = function() {
                if (o)
                    return !1;
                for (var x = Pe || hn(), h = Math.max(0, d.startTime + d.duration - x), b = h / d.duration || 0, A = 1 - b, R = 0, H = d.tweens.length; R < H; R++)
                    d.tweens[R].run(A);
                return c.notifyWith(e, [d, A, h]),
                A < 1 && H ? h : (H || c.notifyWith(e, [d, 1, 0]),
                c.resolveWith(e, [d]),
                !1)
            }, d = c.promise({
                elem: e,
                props: i.extend({}, t),
                opts: i.extend(!0, {
                    specialEasing: {},
                    easing: i.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Pe || hn(),
                duration: n.duration,
                tweens: [],
                createTween: function(x, h) {
                    var b = i.Tween(e, d.opts, x, h, d.opts.specialEasing[x] || d.opts.easing);
                    return d.tweens.push(b),
                    b
                },
                stop: function(x) {
                    var h = 0
                      , b = x ? d.tweens.length : 0;
                    if (o)
                        return this;
                    for (o = !0; h < b; h++)
                        d.tweens[h].run(1);
                    return x ? (c.notifyWith(e, [d, 1, 0]),
                    c.resolveWith(e, [d, x])) : c.rejectWith(e, [d, x]),
                    this
                }
            }), y = d.props;
            for (pr(y, d.opts.specialEasing); u < a; u++)
                if (r = re.prefilters[u].call(d, e, y, d.opts),
                r)
                    return L(r.stop) && (i._queueHooks(d.elem, d.opts.queue).stop = r.stop.bind(r)),
                    r;
            return i.map(y, gn, d),
            L(d.opts.start) && d.opts.start.call(e, d),
            d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always),
            i.fx.timer(i.extend(f, {
                elem: e,
                anim: d,
                queue: d.opts.queue
            })),
            d
        }
        i.Animation = i.extend(re, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return Yt(n.elem, e, $e.exec(t), n),
                    n
                }
                ]
            },
            tweener: function(e, t) {
                L(e) ? (t = e,
                e = ["*"]) : e = e.match(oe);
                for (var n, r = 0, o = e.length; r < o; r++)
                    n = e[r],
                    re.tweeners[n] = re.tweeners[n] || [],
                    re.tweeners[n].unshift(t)
            },
            prefilters: [dr],
            prefilter: function(e, t) {
                t ? re.prefilters.unshift(e) : re.prefilters.push(e)
            }
        }),
        i.speed = function(e, t, n) {
            var r = e && typeof e == "object" ? i.extend({}, e) : {
                complete: n || !n && t || L(e) && e,
                duration: e,
                easing: n && t || t && !L(t) && t
            };
            return i.fx.off ? r.duration = 0 : typeof r.duration != "number" && (r.duration in i.fx.speeds ? r.duration = i.fx.speeds[r.duration] : r.duration = i.fx.speeds._default),
            (r.queue == null || r.queue === !0) && (r.queue = "fx"),
            r.old = r.complete,
            r.complete = function() {
                L(r.old) && r.old.call(this),
                r.queue && i.dequeue(this, r.queue)
            }
            ,
            r
        }
        ,
        i.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(nt).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var o = i.isEmptyObject(e)
                  , u = i.speed(t, n, r)
                  , a = function() {
                    var c = re(this, i.extend({}, e), u);
                    (o || S.get(this, "finish")) && c.stop(!0)
                };
                return a.finish = a,
                o || u.queue === !1 ? this.each(a) : this.queue(u.queue, a)
            },
            stop: function(e, t, n) {
                var r = function(o) {
                    var u = o.stop;
                    delete o.stop,
                    u(n)
                };
                return typeof e != "string" && (n = t,
                t = e,
                e = void 0),
                t && this.queue(e || "fx", []),
                this.each(function() {
                    var o = !0
                      , u = e != null && e + "queueHooks"
                      , a = i.timers
                      , c = S.get(this);
                    if (u)
                        c[u] && c[u].stop && r(c[u]);
                    else
                        for (u in c)
                            c[u] && c[u].stop && lr.test(u) && r(c[u]);
                    for (u = a.length; u--; )
                        a[u].elem === this && (e == null || a[u].queue === e) && (a[u].anim.stop(n),
                        o = !1,
                        a.splice(u, 1));
                    (o || !n) && i.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"),
                this.each(function() {
                    var t, n = S.get(this), r = n[e + "queue"], o = n[e + "queueHooks"], u = i.timers, a = r ? r.length : 0;
                    for (n.finish = !0,
                    i.queue(this, e, []),
                    o && o.stop && o.stop.call(this, !0),
                    t = u.length; t--; )
                        u[t].elem === this && u[t].queue === e && (u[t].anim.stop(!0),
                        u.splice(t, 1));
                    for (t = 0; t < a; t++)
                        r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }),
        i.each(["toggle", "show", "hide"], function(e, t) {
            var n = i.fn[t];
            i.fn[t] = function(r, o, u) {
                return r == null || typeof r == "boolean" ? n.apply(this, arguments) : this.animate(ut(t, !0), r, o, u)
            }
        }),
        i.each({
            slideDown: ut("show"),
            slideUp: ut("hide"),
            slideToggle: ut("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            i.fn[e] = function(n, r, o) {
                return this.animate(t, n, r, o)
            }
        }),
        i.timers = [],
        i.fx.tick = function() {
            var e, t = 0, n = i.timers;
            for (Pe = Date.now(); t < n.length; t++)
                e = n[t],
                !e() && n[t] === e && n.splice(t--, 1);
            n.length || i.fx.stop(),
            Pe = void 0
        }
        ,
        i.fx.timer = function(e) {
            i.timers.push(e),
            i.fx.start()
        }
        ,
        i.fx.interval = 13,
        i.fx.start = function() {
            ot || (ot = !0,
            Tt())
        }
        ,
        i.fx.stop = function() {
            ot = null
        }
        ,
        i.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        i.fn.delay = function(e, t) {
            return e = i.fx && i.fx.speeds[e] || e,
            t = t || "fx",
            this.queue(t, function(n, r) {
                var o = j.setTimeout(n, e);
                r.stop = function() {
                    j.clearTimeout(o)
                }
            })
        }
        ,
        function() {
            var e = k.createElement("input")
              , t = k.createElement("select")
              , n = t.appendChild(k.createElement("option"));
            e.type = "checkbox",
            q.checkOn = e.value !== "",
            q.optSelected = n.selected,
            e = k.createElement("input"),
            e.value = "t",
            e.type = "radio",
            q.radioValue = e.value === "t"
        }();
        var yn, Ue = i.expr.attrHandle;
        i.fn.extend({
            attr: function(e, t) {
                return he(this, i.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    i.removeAttr(this, e)
                })
            }
        }),
        i.extend({
            attr: function(e, t, n) {
                var r, o, u = e.nodeType;
                if (!(u === 3 || u === 8 || u === 2)) {
                    if (typeof e.getAttribute == "undefined")
                        return i.prop(e, t, n);
                    if ((u !== 1 || !i.isXMLDoc(e)) && (o = i.attrHooks[t.toLowerCase()] || (i.expr.match.bool.test(t) ? yn : void 0)),
                    n !== void 0) {
                        if (n === null) {
                            i.removeAttr(e, t);
                            return
                        }
                        return o && "set"in o && (r = o.set(e, n, t)) !== void 0 ? r : (e.setAttribute(t, n + ""),
                        n)
                    }
                    return o && "get"in o && (r = o.get(e, t)) !== null ? r : (r = i.find.attr(e, t),
                    r == null ? void 0 : r)
                }
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!q.radioValue && t === "radio" && $(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                            n && (e.value = n),
                            t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, r = 0, o = t && t.match(oe);
                if (o && e.nodeType === 1)
                    for (; n = o[r++]; )
                        e.removeAttribute(n)
            }
        }),
        yn = {
            set: function(e, t, n) {
                return t === !1 ? i.removeAttr(e, n) : e.setAttribute(n, n),
                n
            }
        },
        i.each(i.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = Ue[t] || i.find.attr;
            Ue[t] = function(r, o, u) {
                var a, c, f = o.toLowerCase();
                return u || (c = Ue[f],
                Ue[f] = a,
                a = n(r, o, u) != null ? f : null,
                Ue[f] = c),
                a
            }
        });
        var hr = /^(?:input|select|textarea|button)$/i
          , gr = /^(?:a|area)$/i;
        i.fn.extend({
            prop: function(e, t) {
                return he(this, i.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[i.propFix[e] || e]
                })
            }
        }),
        i.extend({
            prop: function(e, t, n) {
                var r, o, u = e.nodeType;
                if (!(u === 3 || u === 8 || u === 2))
                    return (u !== 1 || !i.isXMLDoc(e)) && (t = i.propFix[t] || t,
                    o = i.propHooks[t]),
                    n !== void 0 ? o && "set"in o && (r = o.set(e, n, t)) !== void 0 ? r : e[t] = n : o && "get"in o && (r = o.get(e, t)) !== null ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = i.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : hr.test(e.nodeName) || gr.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }),
        q.optSelected || (i.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex,
                null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex,
                t.parentNode && t.parentNode.selectedIndex)
            }
        }),
        i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            i.propFix[this.toLowerCase()] = this
        });
        function Ce(e) {
            var t = e.match(oe) || [];
            return t.join(" ")
        }
        function we(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }
        function Ct(e) {
            return Array.isArray(e) ? e : typeof e == "string" ? e.match(oe) || [] : []
        }
        i.fn.extend({
            addClass: function(e) {
                var t, n, r, o, u, a;
                return L(e) ? this.each(function(c) {
                    i(this).addClass(e.call(this, c, we(this)))
                }) : (t = Ct(e),
                t.length ? this.each(function() {
                    if (r = we(this),
                    n = this.nodeType === 1 && " " + Ce(r) + " ",
                    n) {
                        for (u = 0; u < t.length; u++)
                            o = t[u],
                            n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                        a = Ce(n),
                        r !== a && this.setAttribute("class", a)
                    }
                }) : this)
            },
            removeClass: function(e) {
                var t, n, r, o, u, a;
                return L(e) ? this.each(function(c) {
                    i(this).removeClass(e.call(this, c, we(this)))
                }) : arguments.length ? (t = Ct(e),
                t.length ? this.each(function() {
                    if (r = we(this),
                    n = this.nodeType === 1 && " " + Ce(r) + " ",
                    n) {
                        for (u = 0; u < t.length; u++)
                            for (o = t[u]; n.indexOf(" " + o + " ") > -1; )
                                n = n.replace(" " + o + " ", " ");
                        a = Ce(n),
                        r !== a && this.setAttribute("class", a)
                    }
                }) : this) : this.attr("class", "")
            },
            toggleClass: function(e, t) {
                var n, r, o, u, a = typeof e, c = a === "string" || Array.isArray(e);
                return L(e) ? this.each(function(f) {
                    i(this).toggleClass(e.call(this, f, we(this), t), t)
                }) : typeof t == "boolean" && c ? t ? this.addClass(e) : this.removeClass(e) : (n = Ct(e),
                this.each(function() {
                    if (c)
                        for (u = i(this),
                        o = 0; o < n.length; o++)
                            r = n[o],
                            u.hasClass(r) ? u.removeClass(r) : u.addClass(r);
                    else
                        (e === void 0 || a === "boolean") && (r = we(this),
                        r && S.set(this, "__className__", r),
                        this.setAttribute && this.setAttribute("class", r || e === !1 ? "" : S.get(this, "__className__") || ""))
                }))
            },
            hasClass: function(e) {
                var t, n, r = 0;
                for (t = " " + e + " "; n = this[r++]; )
                    if (n.nodeType === 1 && (" " + Ce(we(n)) + " ").indexOf(t) > -1)
                        return !0;
                return !1
            }
        });
        var yr = /\r/g;
        i.fn.extend({
            val: function(e) {
                var t, n, r, o = this[0];
                return arguments.length ? (r = L(e),
                this.each(function(u) {
                    var a;
                    this.nodeType === 1 && (r ? a = e.call(this, u, i(this).val()) : a = e,
                    a == null ? a = "" : typeof a == "number" ? a += "" : Array.isArray(a) && (a = i.map(a, function(c) {
                        return c == null ? "" : c + ""
                    })),
                    t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()],
                    (!t || !("set"in t) || t.set(this, a, "value") === void 0) && (this.value = a))
                })) : o ? (t = i.valHooks[o.type] || i.valHooks[o.nodeName.toLowerCase()],
                t && "get"in t && (n = t.get(o, "value")) !== void 0 ? n : (n = o.value,
                typeof n == "string" ? n.replace(yr, "") : n == null ? "" : n)) : void 0
            }
        }),
        i.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = i.find.attr(e, "value");
                        return t != null ? t : Ce(i.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, r, o = e.options, u = e.selectedIndex, a = e.type === "select-one", c = a ? null : [], f = a ? u + 1 : o.length;
                        for (u < 0 ? r = f : r = a ? u : 0; r < f; r++)
                            if (n = o[r],
                            (n.selected || r === u) && !n.disabled && (!n.parentNode.disabled || !$(n.parentNode, "optgroup"))) {
                                if (t = i(n).val(),
                                a)
                                    return t;
                                c.push(t)
                            }
                        return c
                    },
                    set: function(e, t) {
                        for (var n, r, o = e.options, u = i.makeArray(t), a = o.length; a--; )
                            r = o[a],
                            (r.selected = i.inArray(i.valHooks.option.get(r), u) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1),
                        u
                    }
                }
            }
        }),
        i.each(["radio", "checkbox"], function() {
            i.valHooks[this] = {
                set: function(e, t) {
                    if (Array.isArray(t))
                        return e.checked = i.inArray(i(e).val(), t) > -1
                }
            },
            q.checkOn || (i.valHooks[this].get = function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
            )
        });
        var Ve = j.location
          , vn = {
            guid: Date.now()
        }
          , wt = /\?/;
        i.parseXML = function(e) {
            var t, n;
            if (!e || typeof e != "string")
                return null;
            try {
                t = new j.DOMParser().parseFromString(e, "text/xml")
            } catch (r) {}
            return n = t && t.getElementsByTagName("parsererror")[0],
            (!t || n) && i.error("Invalid XML: " + (n ? i.map(n.childNodes, function(r) {
                return r.textContent
            }).join(`
`) : e)),
            t
        }
        ;
        var xn = /^(?:focusinfocus|focusoutblur)$/
          , bn = function(e) {
            e.stopPropagation()
        };
        i.extend(i.event, {
            trigger: function(e, t, n, r) {
                var o, u, a, c, f, d, y, x, h = [n || k], b = Ie.call(e, "type") ? e.type : e, A = Ie.call(e, "namespace") ? e.namespace.split(".") : [];
                if (u = x = a = n = n || k,
                !(n.nodeType === 3 || n.nodeType === 8) && !xn.test(b + i.event.triggered) && (b.indexOf(".") > -1 && (A = b.split("."),
                b = A.shift(),
                A.sort()),
                f = b.indexOf(":") < 0 && "on" + b,
                e = e[i.expando] ? e : new i.Event(b,typeof e == "object" && e),
                e.isTrigger = r ? 2 : 3,
                e.namespace = A.join("."),
                e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + A.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                e.result = void 0,
                e.target || (e.target = n),
                t = t == null ? [e] : i.makeArray(t, [e]),
                y = i.event.special[b] || {},
                !(!r && y.trigger && y.trigger.apply(n, t) === !1))) {
                    if (!r && !y.noBubble && !De(n)) {
                        for (c = y.delegateType || b,
                        xn.test(c + b) || (u = u.parentNode); u; u = u.parentNode)
                            h.push(u),
                            a = u;
                        a === (n.ownerDocument || k) && h.push(a.defaultView || a.parentWindow || j)
                    }
                    for (o = 0; (u = h[o++]) && !e.isPropagationStopped(); )
                        x = u,
                        e.type = o > 1 ? c : y.bindType || b,
                        d = (S.get(u, "events") || Object.create(null))[e.type] && S.get(u, "handle"),
                        d && d.apply(u, t),
                        d = f && u[f],
                        d && d.apply && Fe(u) && (e.result = d.apply(u, t),
                        e.result === !1 && e.preventDefault());
                    return e.type = b,
                    !r && !e.isDefaultPrevented() && (!y._default || y._default.apply(h.pop(), t) === !1) && Fe(n) && f && L(n[b]) && !De(n) && (a = n[f],
                    a && (n[f] = null),
                    i.event.triggered = b,
                    e.isPropagationStopped() && x.addEventListener(b, bn),
                    n[b](),
                    e.isPropagationStopped() && x.removeEventListener(b, bn),
                    i.event.triggered = void 0,
                    a && (n[f] = a)),
                    e.result
                }
            },
            simulate: function(e, t, n) {
                var r = i.extend(new i.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                i.event.trigger(r, null, t)
            }
        }),
        i.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    i.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n)
                    return i.event.trigger(e, t, n, !0)
            }
        });
        var vr = /\[\]$/
          , mn = /\r?\n/g
          , xr = /^(?:submit|button|image|reset|file)$/i
          , br = /^(?:input|select|textarea|keygen)/i;
        function St(e, t, n, r) {
            var o;
            if (Array.isArray(t))
                i.each(t, function(u, a) {
                    n || vr.test(e) ? r(e, a) : St(e + "[" + (typeof a == "object" && a != null ? u : "") + "]", a, n, r)
                });
            else if (!n && Ae(t) === "object")
                for (o in t)
                    St(e + "[" + o + "]", t[o], n, r);
            else
                r(e, t)
        }
        i.param = function(e, t) {
            var n, r = [], o = function(u, a) {
                var c = L(a) ? a() : a;
                r[r.length] = encodeURIComponent(u) + "=" + encodeURIComponent(c == null ? "" : c)
            };
            if (e == null)
                return "";
            if (Array.isArray(e) || e.jquery && !i.isPlainObject(e))
                i.each(e, function() {
                    o(this.name, this.value)
                });
            else
                for (n in e)
                    St(n, e[n], t, o);
            return r.join("&")
        }
        ,
        i.fn.extend({
            serialize: function() {
                return i.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = i.prop(this, "elements");
                    return e ? i.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !i(this).is(":disabled") && br.test(this.nodeName) && !xr.test(e) && (this.checked || !Be.test(e))
                }).map(function(e, t) {
                    var n = i(this).val();
                    return n == null ? null : Array.isArray(n) ? i.map(n, function(r) {
                        return {
                            name: t.name,
                            value: r.replace(mn, `\r
`)
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(mn, `\r
`)
                    }
                }).get()
            }
        });
        var mr = /%20/g
          , Tr = /#.*$/
          , Cr = /([?&])_=[^&]*/
          , wr = /^(.*?):[ \t]*([^\r\n]*)$/mg
          , Sr = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
          , Er = /^(?:GET|HEAD)$/
          , Dr = /^\/\//
          , Tn = {}
          , Et = {}
          , Cn = "*/".concat("*")
          , Dt = k.createElement("a");
        Dt.href = Ve.href;
        function wn(e) {
            return function(t, n) {
                typeof t != "string" && (n = t,
                t = "*");
                var r, o = 0, u = t.toLowerCase().match(oe) || [];
                if (L(n))
                    for (; r = u[o++]; )
                        r[0] === "+" ? (r = r.slice(1) || "*",
                        (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }
        function Sn(e, t, n, r) {
            var o = {}
              , u = e === Et;
            function a(c) {
                var f;
                return o[c] = !0,
                i.each(e[c] || [], function(d, y) {
                    var x = y(t, n, r);
                    if (typeof x == "string" && !u && !o[x])
                        return t.dataTypes.unshift(x),
                        a(x),
                        !1;
                    if (u)
                        return !(f = x)
                }),
                f
            }
            return a(t.dataTypes[0]) || !o["*"] && a("*")
        }
        function At(e, t) {
            var n, r, o = i.ajaxSettings.flatOptions || {};
            for (n in t)
                t[n] !== void 0 && ((o[n] ? e : r || (r = {}))[n] = t[n]);
            return r && i.extend(!0, e, r),
            e
        }
        function Ar(e, t, n) {
            for (var r, o, u, a, c = e.contents, f = e.dataTypes; f[0] === "*"; )
                f.shift(),
                r === void 0 && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r) {
                for (o in c)
                    if (c[o] && c[o].test(r)) {
                        f.unshift(o);
                        break
                    }
            }
            if (f[0]in n)
                u = f[0];
            else {
                for (o in n) {
                    if (!f[0] || e.converters[o + " " + f[0]]) {
                        u = o;
                        break
                    }
                    a || (a = o)
                }
                u = u || a
            }
            if (u)
                return u !== f[0] && f.unshift(u),
                n[u]
        }
        function Nr(e, t, n, r) {
            var o, u, a, c, f, d = {}, y = e.dataTypes.slice();
            if (y[1])
                for (a in e.converters)
                    d[a.toLowerCase()] = e.converters[a];
            for (u = y.shift(); u; )
                if (e.responseFields[u] && (n[e.responseFields[u]] = t),
                !f && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                f = u,
                u = y.shift(),
                u) {
                    if (u === "*")
                        u = f;
                    else if (f !== "*" && f !== u) {
                        if (a = d[f + " " + u] || d["* " + u],
                        !a) {
                            for (o in d)
                                if (c = o.split(" "),
                                c[1] === u && (a = d[f + " " + c[0]] || d["* " + c[0]],
                                a)) {
                                    a === !0 ? a = d[o] : d[o] !== !0 && (u = c[0],
                                    y.unshift(c[1]));
                                    break
                                }
                        }
                        if (a !== !0)
                            if (a && e.throws)
                                t = a(t);
                            else
                                try {
                                    t = a(t)
                                } catch (x) {
                                    return {
                                        state: "parsererror",
                                        error: a ? x : "No conversion from " + f + " to " + u
                                    }
                                }
                    }
                }
            return {
                state: "success",
                data: t
            }
        }
        i.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Ve.href,
                type: "GET",
                isLocal: Sr.test(Ve.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Cn,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": i.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? At(At(e, i.ajaxSettings), t) : At(i.ajaxSettings, e)
            },
            ajaxPrefilter: wn(Tn),
            ajaxTransport: wn(Et),
            ajax: function(e, t) {
                typeof e == "object" && (t = e,
                e = void 0),
                t = t || {};
                var n, r, o, u, a, c, f, d, y, x, h = i.ajaxSetup({}, t), b = h.context || h, A = h.context && (b.nodeType || b.jquery) ? i(b) : i.event, R = i.Deferred(), H = i.Callbacks("once memory"), V = h.statusCode || {}, z = {}, ae = {}, se = "canceled", M = {
                    readyState: 0,
                    getResponseHeader: function(I) {
                        var B;
                        if (f) {
                            if (!u)
                                for (u = {}; B = wr.exec(o); )
                                    u[B[1].toLowerCase() + " "] = (u[B[1].toLowerCase() + " "] || []).concat(B[2]);
                            B = u[I.toLowerCase() + " "]
                        }
                        return B == null ? null : B.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return f ? o : null
                    },
                    setRequestHeader: function(I, B) {
                        return f == null && (I = ae[I.toLowerCase()] = ae[I.toLowerCase()] || I,
                        z[I] = B),
                        this
                    },
                    overrideMimeType: function(I) {
                        return f == null && (h.mimeType = I),
                        this
                    },
                    statusCode: function(I) {
                        var B;
                        if (I)
                            if (f)
                                M.always(I[M.status]);
                            else
                                for (B in I)
                                    V[B] = [V[B], I[B]];
                        return this
                    },
                    abort: function(I) {
                        var B = I || se;
                        return n && n.abort(B),
                        Se(0, B),
                        this
                    }
                };
                if (R.promise(M),
                h.url = ((e || h.url || Ve.href) + "").replace(Dr, Ve.protocol + "//"),
                h.type = t.method || t.type || h.method || h.type,
                h.dataTypes = (h.dataType || "*").toLowerCase().match(oe) || [""],
                h.crossDomain == null) {
                    c = k.createElement("a");
                    try {
                        c.href = h.url,
                        c.href = c.href,
                        h.crossDomain = Dt.protocol + "//" + Dt.host != c.protocol + "//" + c.host
                    } catch (I) {
                        h.crossDomain = !0
                    }
                }
                if (h.data && h.processData && typeof h.data != "string" && (h.data = i.param(h.data, h.traditional)),
                Sn(Tn, h, t, M),
                f)
                    return M;
                d = i.event && h.global,
                d && i.active++ === 0 && i.event.trigger("ajaxStart"),
                h.type = h.type.toUpperCase(),
                h.hasContent = !Er.test(h.type),
                r = h.url.replace(Tr, ""),
                h.hasContent ? h.data && h.processData && (h.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (h.data = h.data.replace(mr, "+")) : (x = h.url.slice(r.length),
                h.data && (h.processData || typeof h.data == "string") && (r += (wt.test(r) ? "&" : "?") + h.data,
                delete h.data),
                h.cache === !1 && (r = r.replace(Cr, "$1"),
                x = (wt.test(r) ? "&" : "?") + "_=" + vn.guid++ + x),
                h.url = r + x),
                h.ifModified && (i.lastModified[r] && M.setRequestHeader("If-Modified-Since", i.lastModified[r]),
                i.etag[r] && M.setRequestHeader("If-None-Match", i.etag[r])),
                (h.data && h.hasContent && h.contentType !== !1 || t.contentType) && M.setRequestHeader("Content-Type", h.contentType),
                M.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + (h.dataTypes[0] !== "*" ? ", " + Cn + "; q=0.01" : "") : h.accepts["*"]);
                for (y in h.headers)
                    M.setRequestHeader(y, h.headers[y]);
                if (h.beforeSend && (h.beforeSend.call(b, M, h) === !1 || f))
                    return M.abort();
                if (se = "abort",
                H.add(h.complete),
                M.done(h.success),
                M.fail(h.error),
                n = Sn(Et, h, t, M),
                !n)
                    Se(-1, "No Transport");
                else {
                    if (M.readyState = 1,
                    d && A.trigger("ajaxSend", [M, h]),
                    f)
                        return M;
                    h.async && h.timeout > 0 && (a = j.setTimeout(function() {
                        M.abort("timeout")
                    }, h.timeout));
                    try {
                        f = !1,
                        n.send(z, Se)
                    } catch (I) {
                        if (f)
                            throw I;
                        Se(-1, I)
                    }
                }
                function Se(I, B, Ge, kt) {
                    var fe, Qe, ce, xe, be, te = B;
                    f || (f = !0,
                    a && j.clearTimeout(a),
                    n = void 0,
                    o = kt || "",
                    M.readyState = I > 0 ? 4 : 0,
                    fe = I >= 200 && I < 300 || I === 304,
                    Ge && (xe = Ar(h, M, Ge)),
                    !fe && i.inArray("script", h.dataTypes) > -1 && i.inArray("json", h.dataTypes) < 0 && (h.converters["text script"] = function() {}
                    ),
                    xe = Nr(h, xe, M, fe),
                    fe ? (h.ifModified && (be = M.getResponseHeader("Last-Modified"),
                    be && (i.lastModified[r] = be),
                    be = M.getResponseHeader("etag"),
                    be && (i.etag[r] = be)),
                    I === 204 || h.type === "HEAD" ? te = "nocontent" : I === 304 ? te = "notmodified" : (te = xe.state,
                    Qe = xe.data,
                    ce = xe.error,
                    fe = !ce)) : (ce = te,
                    (I || !te) && (te = "error",
                    I < 0 && (I = 0))),
                    M.status = I,
                    M.statusText = (B || te) + "",
                    fe ? R.resolveWith(b, [Qe, te, M]) : R.rejectWith(b, [M, te, ce]),
                    M.statusCode(V),
                    V = void 0,
                    d && A.trigger(fe ? "ajaxSuccess" : "ajaxError", [M, h, fe ? Qe : ce]),
                    H.fireWith(b, [M, te]),
                    d && (A.trigger("ajaxComplete", [M, h]),
                    --i.active || i.event.trigger("ajaxStop")))
                }
                return M
            },
            getJSON: function(e, t, n) {
                return i.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return i.get(e, void 0, t, "script")
            }
        }),
        i.each(["get", "post"], function(e, t) {
            i[t] = function(n, r, o, u) {
                return L(r) && (u = u || o,
                o = r,
                r = void 0),
                i.ajax(i.extend({
                    url: n,
                    type: t,
                    dataType: u,
                    data: r,
                    success: o
                }, i.isPlainObject(n) && n))
            }
        }),
        i.ajaxPrefilter(function(e) {
            var t;
            for (t in e.headers)
                t.toLowerCase() === "content-type" && (e.contentType = e.headers[t] || "")
        }),
        i._evalUrl = function(e, t, n) {
            return i.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(r) {
                    i.globalEval(r, t, n)
                }
            })
        }
        ,
        i.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (L(e) && (e = e.call(this[0])),
                t = i(e, this[0].ownerDocument).eq(0).clone(!0),
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var n = this; n.firstElementChild; )
                        n = n.firstElementChild;
                    return n
                }).append(this)),
                this
            },
            wrapInner: function(e) {
                return L(e) ? this.each(function(t) {
                    i(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = i(this)
                      , n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = L(e);
                return this.each(function(n) {
                    i(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    i(this).replaceWith(this.childNodes)
                }),
                this
            }
        }),
        i.expr.pseudos.hidden = function(e) {
            return !i.expr.pseudos.visible(e)
        }
        ,
        i.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }
        ,
        i.ajaxSettings.xhr = function() {
            try {
                return new j.XMLHttpRequest
            } catch (e) {}
        }
        ;
        var kr = {
            0: 200,
            1223: 204
        }
          , Xe = i.ajaxSettings.xhr();
        q.cors = !!Xe && "withCredentials"in Xe,
        q.ajax = Xe = !!Xe,
        i.ajaxTransport(function(e) {
            var t, n;
            if (q.cors || Xe && !e.crossDomain)
                return {
                    send: function(r, o) {
                        var u, a = e.xhr();
                        if (a.open(e.type, e.url, e.async, e.username, e.password),
                        e.xhrFields)
                            for (u in e.xhrFields)
                                a[u] = e.xhrFields[u];
                        e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType),
                        !e.crossDomain && !r["X-Requested-With"] && (r["X-Requested-With"] = "XMLHttpRequest");
                        for (u in r)
                            a.setRequestHeader(u, r[u]);
                        t = function(c) {
                            return function() {
                                t && (t = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null,
                                c === "abort" ? a.abort() : c === "error" ? typeof a.status != "number" ? o(0, "error") : o(a.status, a.statusText) : o(kr[a.status] || a.status, a.statusText, (a.responseType || "text") !== "text" || typeof a.responseText != "string" ? {
                                    binary: a.response
                                } : {
                                    text: a.responseText
                                }, a.getAllResponseHeaders()))
                            }
                        }
                        ,
                        a.onload = t(),
                        n = a.onerror = a.ontimeout = t("error"),
                        a.onabort !== void 0 ? a.onabort = n : a.onreadystatechange = function() {
                            a.readyState === 4 && j.setTimeout(function() {
                                t && n()
                            })
                        }
                        ,
                        t = t("abort");
                        try {
                            a.send(e.hasContent && e.data || null)
                        } catch (c) {
                            if (t)
                                throw c
                        }
                    },
                    abort: function() {
                        t && t()
                    }
                }
        }),
        i.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }),
        i.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return i.globalEval(e),
                    e
                }
            }
        }),
        i.ajaxPrefilter("script", function(e) {
            e.cache === void 0 && (e.cache = !1),
            e.crossDomain && (e.type = "GET")
        }),
        i.ajaxTransport("script", function(e) {
            if (e.crossDomain || e.scriptAttrs) {
                var t, n;
                return {
                    send: function(r, o) {
                        t = i("<script>").attr(e.scriptAttrs || {}).prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(u) {
                            t.remove(),
                            n = null,
                            u && o(u.type === "error" ? 404 : 200, u.type)
                        }
                        ),
                        k.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var En = []
          , Nt = /(=)\?(?=&|$)|\?\?/;
        i.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = En.pop() || i.expando + "_" + vn.guid++;
                return this[e] = !0,
                e
            }
        }),
        i.ajaxPrefilter("json jsonp", function(e, t, n) {
            var r, o, u, a = e.jsonp !== !1 && (Nt.test(e.url) ? "url" : typeof e.data == "string" && (e.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Nt.test(e.data) && "data");
            if (a || e.dataTypes[0] === "jsonp")
                return r = e.jsonpCallback = L(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                a ? e[a] = e[a].replace(Nt, "$1" + r) : e.jsonp !== !1 && (e.url += (wt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
                e.converters["script json"] = function() {
                    return u || i.error(r + " was not called"),
                    u[0]
                }
                ,
                e.dataTypes[0] = "json",
                o = j[r],
                j[r] = function() {
                    u = arguments
                }
                ,
                n.always(function() {
                    o === void 0 ? i(j).removeProp(r) : j[r] = o,
                    e[r] && (e.jsonpCallback = t.jsonpCallback,
                    En.push(r)),
                    u && L(o) && o(u[0]),
                    u = o = void 0
                }),
                "script"
        }),
        q.createHTMLDocument = function() {
            var e = k.implementation.createHTMLDocument("").body;
            return e.innerHTML = "<form></form><form></form>",
            e.childNodes.length === 2
        }(),
        i.parseHTML = function(e, t, n) {
            if (typeof e != "string")
                return [];
            typeof t == "boolean" && (n = t,
            t = !1);
            var r, o, u;
            return t || (q.createHTMLDocument ? (t = k.implementation.createHTMLDocument(""),
            r = t.createElement("base"),
            r.href = k.location.href,
            t.head.appendChild(r)) : t = k),
            o = zt.exec(e),
            u = !n && [],
            o ? [t.createElement(o[1])] : (o = en([e], t, u),
            u && u.length && i(u).remove(),
            i.merge([], o.childNodes))
        }
        ,
        i.fn.load = function(e, t, n) {
            var r, o, u, a = this, c = e.indexOf(" ");
            return c > -1 && (r = Ce(e.slice(c)),
            e = e.slice(0, c)),
            L(t) ? (n = t,
            t = void 0) : t && typeof t == "object" && (o = "POST"),
            a.length > 0 && i.ajax({
                url: e,
                type: o || "GET",
                dataType: "html",
                data: t
            }).done(function(f) {
                u = arguments,
                a.html(r ? i("<div>").append(i.parseHTML(f)).find(r) : f)
            }).always(n && function(f, d) {
                a.each(function() {
                    n.apply(this, u || [f.responseText, d, f])
                })
            }
            ),
            this
        }
        ,
        i.expr.pseudos.animated = function(e) {
            return i.grep(i.timers, function(t) {
                return e === t.elem
            }).length
        }
        ,
        i.offset = {
            setOffset: function(e, t, n) {
                var r, o, u, a, c, f, d, y = i.css(e, "position"), x = i(e), h = {};
                y === "static" && (e.style.position = "relative"),
                c = x.offset(),
                u = i.css(e, "top"),
                f = i.css(e, "left"),
                d = (y === "absolute" || y === "fixed") && (u + f).indexOf("auto") > -1,
                d ? (r = x.position(),
                a = r.top,
                o = r.left) : (a = parseFloat(u) || 0,
                o = parseFloat(f) || 0),
                L(t) && (t = t.call(e, n, i.extend({}, c))),
                t.top != null && (h.top = t.top - c.top + a),
                t.left != null && (h.left = t.left - c.left + o),
                "using"in t ? t.using.call(e, h) : x.css(h)
            }
        },
        i.fn.extend({
            offset: function(e) {
                if (arguments.length)
                    return e === void 0 ? this : this.each(function(o) {
                        i.offset.setOffset(this, e, o)
                    });
                var t, n, r = this[0];
                if (r)
                    return r.getClientRects().length ? (t = r.getBoundingClientRect(),
                    n = r.ownerDocument.defaultView,
                    {
                        top: t.top + n.pageYOffset,
                        left: t.left + n.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    }
            },
            position: function() {
                if (this[0]) {
                    var e, t, n, r = this[0], o = {
                        top: 0,
                        left: 0
                    };
                    if (i.css(r, "position") === "fixed")
                        t = r.getBoundingClientRect();
                    else {
                        for (t = this.offset(),
                        n = r.ownerDocument,
                        e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && i.css(e, "position") === "static"; )
                            e = e.parentNode;
                        e && e !== r && e.nodeType === 1 && (o = i(e).offset(),
                        o.top += i.css(e, "borderTopWidth", !0),
                        o.left += i.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - o.top - i.css(r, "marginTop", !0),
                        left: t.left - o.left - i.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && i.css(e, "position") === "static"; )
                        e = e.offsetParent;
                    return e || Te
                })
            }
        }),
        i.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = t === "pageYOffset";
            i.fn[e] = function(r) {
                return he(this, function(o, u, a) {
                    var c;
                    if (De(o) ? c = o : o.nodeType === 9 && (c = o.defaultView),
                    a === void 0)
                        return c ? c[t] : o[u];
                    c ? c.scrollTo(n ? c.pageXOffset : a, n ? a : c.pageYOffset) : o[u] = a
                }, e, r, arguments.length)
            }
        }),
        i.each(["top", "left"], function(e, t) {
            i.cssHooks[t] = an(q.pixelPosition, function(n, r) {
                if (r)
                    return r = ze(n, t),
                    vt.test(r) ? i(n).position()[t] + "px" : r
            })
        }),
        i.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            i.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, r) {
                i.fn[r] = function(o, u) {
                    var a = arguments.length && (n || typeof o != "boolean")
                      , c = n || (o === !0 || u === !0 ? "margin" : "border");
                    return he(this, function(f, d, y) {
                        var x;
                        return De(f) ? r.indexOf("outer") === 0 ? f["inner" + e] : f.document.documentElement["client" + e] : f.nodeType === 9 ? (x = f.documentElement,
                        Math.max(f.body["scroll" + e], x["scroll" + e], f.body["offset" + e], x["offset" + e], x["client" + e])) : y === void 0 ? i.css(f, d, c) : i.style(f, d, y, c)
                    }, t, a ? o : void 0, a)
                }
            })
        }),
        i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            i.fn[t] = function(n) {
                return this.on(t, n)
            }
        }),
        i.fn.extend({
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
                return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            hover: function(e, t) {
                return this.on("mouseenter", e).on("mouseleave", t || e)
            }
        }),
        i.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
            i.fn[t] = function(n, r) {
                return arguments.length > 0 ? this.on(t, null, n, r) : this.trigger(t)
            }
        });
        var jr = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        i.proxy = function(e, t) {
            var n, r, o;
            if (typeof t == "string" && (n = e[t],
            t = e,
            e = n),
            !!L(e))
                return r = Z.call(arguments, 2),
                o = function() {
                    return e.apply(t || this, r.concat(Z.call(arguments)))
                }
                ,
                o.guid = e.guid = e.guid || i.guid++,
                o
        }
        ,
        i.holdReady = function(e) {
            e ? i.readyWait++ : i.ready(!0)
        }
        ,
        i.isArray = Array.isArray,
        i.parseJSON = JSON.parse,
        i.nodeName = $,
        i.isFunction = L,
        i.isWindow = De,
        i.camelCase = ue,
        i.type = Ae,
        i.now = Date.now,
        i.isNumeric = function(e) {
            var t = i.type(e);
            return (t === "number" || t === "string") && !isNaN(e - parseFloat(e))
        }
        ,
        i.trim = function(e) {
            return e == null ? "" : (e + "").replace(jr, "$1")
        }
        ;
        var qr = j.jQuery
          , Lr = j.$;
        return i.noConflict = function(e) {
            return j.$ === i && (j.$ = Lr),
            e && j.jQuery === i && (j.jQuery = qr),
            i
        }
        ,
        typeof Je == "undefined" && (j.jQuery = j.$ = i),
        i
    })
}
)(kn);
var $r = kn.exports;
const zr = Wr($r);
export {zr as $, $r as j};
//# sourceMappingURL=jquery-DneebmYf.js.map
var Ht = Object.defineProperty;
var Bt = Object.getOwnPropertySymbols;
var qt = Object.prototype.hasOwnProperty
  , Vt = Object.prototype.propertyIsEnumerable;
var Pt = (u, t, e) => t in u ? Ht(u, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : u[t] = e
  , wt = (u, t) => {
    for (var e in t || (t = {}))
        qt.call(t, e) && Pt(u, e, t[e]);
    if (Bt)
        for (var e of Bt(t))
            Vt.call(t, e) && Pt(u, e, t[e]);
    return u
}
;
import {c as Ot, a as Gt} from "./_commonjsHelpers-Chg3vePA.js";
class Ut {
    constructor() {
        this.core = {
            listeners: []
        }
    }
    listen(t, e) {
        document.addEventListener(t, e, !1),
        this.core.listeners.push({
            name: t,
            task: e
        })
    }
    destroy() {
        this.core.listeners.forEach(t => {
            document.removeEventListener(t.name, t.task)
        }
        )
    }
}
class jt extends Ut {
    bind(t, e={}) {}
    isEnabled() {
        return this.enabled === !0
    }
    disable() {
        this.enabled = !1
    }
    enable() {
        this.enabled = !0
    }
    toggle() {
        this.enabled ? this.disable() : this.enable()
    }
}
function Kt(u) {
    var t;
    return u && window.debug && window.debug.publish ? window.debug.publish.includes ? window.debug.publish.includes.includes(u) : window.debug.publish.excludes ? !window.debug.publish.excludes.includes(u) : (t = window.debug.publish.log) != null ? t : !1 : !1
}
function $t(u, t={}) {
    const e = this.core.subscribers[u];
    Kt(u) && window.debug.publish.trace,
    Array.isArray(e) && Array.from(e).forEach(s => {
        s.callback(t)
    }
    )
}
function Jt(u, t, e) {
    if (mt.isComponent(u) && u.hasFeature("publisher-subscriber")) {
        const s = {
            subscription_id: `${this._id}#${u._id}#${this.core.nbSubscriptions}`,
            callback: e
        };
        return s.unsubscribe = xt.unsubscribeFactory(this, s, t, u),
        xt.addSubscription(this, t, s, u),
        xt.addSubscriber(this, t, s, u),
        s
    } else
        return null
}
function Qt(u={}) {
    typeof u.message == "string" && (u.message = [u.message]),
    Array.isArray(u.message) && u.message.forEach(t => {
        const e = this.core.subscriptions[t];
        Array.isArray(e) && e.map(s => s.unsubscribe).forEach(s => {
            s()
        }
        )
    }
    )
}
class xt extends jt {
    constructor(t={}) {
        super(t)
    }
    init(t) {
        t.core.subscribers = {},
        t.core.subscriptions = {},
        t.core.nbSubscriptions = 0,
        t.core.nbSubscribers = 0,
        t.publish = $t.bind(t),
        t.subscribe = Jt.bind(t),
        t.unsubscribe = Qt.bind(t),
        this.destroy = xt.destroy.bind(this, t)
    }
    static addSubscription(t, e, s, h) {
        Array.isArray(t.core.subscriptions[e]) !== !0 && (t.core.subscriptions[e] = []),
        t.core.subscriptions[e].push(wt({
            component_id: h._id
        }, s)),
        t.core.nbSubscriptions++
    }
    static unsubscribeFactory(t, e, s, h) {
        return () => {
            const i = h.core.subscribers[s];
            if (Array.isArray(i)) {
                const a = i.findIndex(f => f.subscription_id === e.subscription_id);
                if (a >= 0) {
                    const f = i.splice(a, 1);
                    delete f.callback,
                    h.core.nbSubscribers--,
                    h.core.subscribers[s].length === 0 && delete h.core.subscribers[s]
                }
            }
            const o = t.core.subscriptions[s];
            if (Array.isArray(o)) {
                const a = o.findIndex(f => f.subscription_id === e.subscription_id);
                if (a >= 0) {
                    const f = o.splice(a, 1);
                    delete f.unsubscribe,
                    t.core.subscriptions[s].length === 0 && delete t.core.subscriptions[s],
                    t.core.nbSubscriptions--
                }
            }
        }
    }
    static addSubscriber(t, e, s, h) {
        Array.isArray(h.core.subscribers[e]) !== !0 && (h.core.subscribers[e] = []),
        h.core.subscribers[e].push(wt({
            component_id: t._id
        }, s)),
        h.core.nbSubscribers++
    }
    static destroy(t) {
        Object.values(t.core.subscriptions).forEach(e => {
            e.forEach(s => s.unsubscribe())
        }
        ),
        Object.values(t.core.subscribers).forEach(e => {
            e.forEach(s => s.unsubscribe())
        }
        )
    }
}
function te(u, t={}) {
    const e = new xt(t);
    return e.init(u, t),
    e
}
function ee() {}
let re = 0;
class mt extends Ut {
    constructor(t={}) {
        super(t),
        typeof t.component > "u" && (t.component = {}),
        Object.defineProperties(this.core, {
            instancied_at: {
                value: Date.now(),
                writable: !1,
                configurable: !1
            },
            _id: {
                value: "component_" + re++,
                writable: !1,
                configurable: !1
            },
            isSmartComponent: {
                value: !0,
                writable: !1,
                configurable: !1
            }
        }),
        this._id = t._id || this.core._id,
        this.features = {
            "publisher-subscriber": {
                bindFeature: te,
                priority: -1
            }
        },
        this.quietEvents = {},
        this.setup(t)
    }
    static isComponent(t) {
        return typeof t == "object" && typeof t.core == "object" && t.core.isSmartComponent === !0
    }
    featureIsEnabled(t) {
        const e = this.features[t];
        return typeof e != "object" || typeof e.isEnabled != "function" ? !1 : e.isEnabled() || !1
    }
    is(t=null) {
        return t !== null && this._id === t._id
    }
    store(t, e) {
        this.data[t] = e
    }
    get(t) {
        return typeof this.data[t] < "u" ? this.data[t] : null
    }
    setBehavior(t, e) {
        this.behaviours[t] = e
    }
    hasFeature(t) {
        return typeof this.features[t] < "u"
    }
    getBehavior(t) {
        return this.behaviours[t]
    }
    clearBehavior(t) {
        delete this.behaviours[t]
    }
    behave(t, e) {
        const s = this.getBehavior(t);
        if (typeof s == "function")
            return s(e)
    }
    hide(t) {
        t.classList.add("im-hidden")
    }
    show(t) {
        t.classList.remove("im-hidden")
    }
    doAsync(t) {
        new Promise(e => {
            t(),
            e()
        }
        ).then(ee)
    }
    setup(t={}) {
        typeof t.component.name < "u" ? this.name = t.component.name : typeof t.name < "u" ? this.name = t.name : this.name = this._id,
        this.ui = {},
        this.label = {},
        this.data = {},
        this.behaviours = {},
        this.onSetup(t),
        this.injectFeatures(Object.assign({}, t.component.features, t.features, this.features))
    }
    onSetup(t) {}
    setId(t) {
        this._id = t
    }
    checkInjectionRulesBindTo(t, e) {
        if (typeof e.bindTo > "u")
            return !0;
        if (Array.isArray(e.bindTo)) {
            if (e.bindTo.has(this.name) === !1)
                return !1
        } else {
            if (typeof e.bindTo == "function")
                return e.bindTo(this, e);
            if (this.name !== e.bindTo)
                return !1
        }
        return !0
    }
    checkInjectionBindMethod(t, e) {
        return typeof e == "function" ? !0 : (typeof e.bind > "u" && typeof e.bindFeature != "function" && (e.bindFeature = defaultSettings.featuresRecorded[t]),
        typeof e.bindFeature > "u" ? (this.notifyError(`Unable to find '${t}' in built-in viewer features`),
        !1) : !0)
    }
    checkInjectionRules(t, e) {
        return this.injectionRules.bindTo !== !0 && typeof e.bindTo < "u" || this.injectionRules.bindTo === !0 && this.checkInjectionRulesBindTo(t, e) !== !0 ? !1 : this.checkInjectionBindMethod(t, e) === !0
    }
    injectFeatures(t={}) {
        Object.keys(t).map(e => {
            const s = {
                name: e
            }
              , h = t[e];
            return typeof h == "function" ? s.bindFeature = h : s.bindFeature = h.bindFeature,
            Number.isFinite(h.priority) ? s.priority = h.priority : s.priority = Number.POSITIVE_INFINITY,
            s
        }
        ).sort( (e, s) => e.priority - s.priority).forEach(e => {
            this.injectFeature(e.name, e.bindFeature)
        }
        )
    }
    injectFeature(t, e={}) {
        if (e === !1 || e.enabled === !1)
            return;
        let s;
        try {
            typeof e.bindFeature == "function" ? s = e.bindFeature(this, e) : typeof e == "function" && (s = e(this, e)),
            typeof s < "u" ? this.features[t] = s : this.features[t] = e,
            this.publish && this.publish("feature-added", {
                name: t,
                data: e
            })
        } catch (h) {
            this.notifyError(`Unable to bind feature "${t}" to component "${this.name}"`)
        }
        return !0
    }
    quiet(t, e=!0) {
        e === !0 ? this.quietEvents[t] = !0 : delete this.quietEvents[t]
    }
    resetQuietEvents() {
        Object.keys(this.quietEvents).forEach(t => {
            delete this.quietEvents[t]
        }
        )
    }
    isQuiet(t) {
        return this.quietEvents[t] === !0
    }
    emit(t, e={}) {
        this.isQuiet(t) !== !0 && (e.target || document).dispatchEvent(this.createCustomEvent(t, Object.assign({
            emitter: this
        }, e)))
    }
    destroy() {
        super.destroy(),
        this.publish("destroy", this),
        Object.values(this.features).forEach(t => {
            typeof t.destroy == "function" && t.destroy()
        }
        )
    }
    createCustomEvent(t, e) {
        if (typeof window < "u") {
            if (typeof window.CustomEvent == "function")
                return new CustomEvent(t,e);
            {
                const s = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                }
                  , h = document.createEvent("CustomEvent");
                return h.initCustomEvent(t, s.bubbles, s.cancelable, s.detail),
                h
            }
        }
    }
    notifyWarning(t) {
        mt.verboseMode
    }
    notifyError(t, e=!1) {
        if (mt.verboseMode,
        typeof window < "u" && window.newrelic && window.newrelic.noticeError(t),
        e === !0)
            throw new Error(t)
    }
    notifyLog(t) {}
}
mt.verboseMode = !0;
mt.enableVerboseMode = function() {
    mt.verboseMode = !0
}
;
mt.disableVerboseMode = function() {
    mt.verboseMode = !1
}
;
class Mt {
    constructor() {
        this.data = {
            coords: {
                x: 0,
                y: 0
            },
            lastCoords: {
                x: 0,
                y: 0
            },
            delta: {
                x: 0,
                y: 0
            },
            lastCoordsOnScreen: {
                x: 0,
                y: 0
            },
            lastMouseDownCoords: {
                x: 0,
                y: 0
            }
        },
        this.isDown = !1,
        this.mouseDownTarget = null
    }
    setCoords(t, e, s=1, h=1, i=1) {
        const o = this.data.coords;
        this.setLastCoords(o.x, o.y),
        o.x = t,
        o.y = e,
        this.data.delta.x = Math.round((o.x - this.data.lastCoords.x) * s * h),
        this.data.delta.y = Math.round((o.y - this.data.lastCoords.y) * s * i)
    }
    setLastCoords(t, e) {
        const s = this.data.lastCoords;
        s.x = t,
        s.y = e
    }
    getLastCoords() {
        const {x: t, y: e} = this.data.lastCoords;
        return {
            x: t,
            y: e
        }
    }
    setLastMouseDownCoords(t, e) {
        const s = this.data.lastMouseDownCoords;
        s.x = t,
        s.y = e
    }
    getLastMouseDownCoords() {
        const {x: t, y: e} = this.data.lastMouseDownCoords;
        return {
            x: t,
            y: e
        }
    }
    setMouseDownTarget(t=null) {
        this.mouseDownTarget = t
    }
    getMouseDownTarget() {
        return this.mouseDownTarget
    }
    update(t) {
        const e = Mt.retrieveCoords(t)
          , s = t.target;
        let h = 1
          , i = 1;
        if (Number.isFinite(s.width) && Number.isFinite(s.height)) {
            const o = s.getBoundingClientRect();
            h = s.width / o.width,
            i = s.height / o.height
        }
        this.setCoords(e.x, e.y, 1, h, i)
    }
    static retrieveCoords(t, e=null) {
        const s = (e || t.target).getBoundingClientRect();
        let h = t;
        return t.changedTouches && t.changedTouches[0] && (h = t.changedTouches[0]),
        {
            x: h.clientX - s.left,
            y: h.clientY - s.top
        }
    }
}
class It extends mt {
    constructor(t) {
        typeof t.name > "u" && (t.name = "mouse-controller"),
        super(t),
        this.domTarget = t.domTarget || window,
        this.lockPointer = t.lockPointer || !1;
        const e = t.defaultIsAvoid ? It.avoid : null;
        this.onMouseMove = t.onMouseMove || e,
        this.onMouseDown = t.onMouseDown || e,
        this.onMouseUp = t.onMouseUp || e,
        this.onClick = t.onClick || e,
        this.onDoubleClick = t.onDoubleClick || e,
        this.onMouseEnter = t.onMouseEnter || e,
        this.onMouseLeave = t.onMouseLeave || e,
        this.onMouseWheel = t.onMouseWheel || e,
        this.onTouchStart = t.onTouchStart || t.onMouseDown || e,
        this.onTouchMove = t.onTouchMove || t.onMouseMove || e,
        this.onTouchEnd = t.onTouchEnd || t.onMouseUp || e,
        this.sensivity = 1,
        this.notify(),
        this.init(t)
    }
    init(t={}) {
        if (typeof t.state < "u" ? this.state = t.state : this.state = new Mt,
        this.lockPointer && this.requestPointerLock(),
        document.addEventListener("contextmenu", function(s) {
            return !1
        }, !1),
        this.domTarget.addEventListener("contextmenu", function(s) {
            return s.preventDefault(),
            !1
        }, !1),
        this.onMouseMove !== null && this.domTarget.addEventListener("mousemove", this.onMouseMove, !1),
        this.onMouseDown !== null && this.domTarget.addEventListener("mousedown", this.onMouseDown, !1),
        this.onMouseUp !== null && this.domTarget.addEventListener("mouseup", this.onMouseUp, !1),
        this.onClick !== null && this.domTarget.addEventListener("click", this.onClick, !1),
        this.onDoubleClick !== null && this.domTarget.addEventListener("dblclick", this.onDoubleClick, !1),
        this.onMouseEnter !== null && this.domTarget.addEventListener("mouseenter", this.onMouseEnter, !1),
        this.onMouseLeave !== null && this.domTarget.addEventListener("mouseleave", this.onMouseLeave, !1),
        this.onMouseWheel !== null && (this.domTarget.addEventListener("mousewheel", this.onMouseWheel, !1),
        this.domTarget.addEventListener("DOMMouseScroll", this.onMouseWheel, !1)),
        this.onTouchStart !== null) {
            var e = this;
            this.domTarget.addEventListener("touchstart", function(s) {
                e.onTouchStart(s)
            }, {
                passive: !1
            })
        }
        if (this.onTouchMove !== null) {
            var e = this;
            this.domTarget.addEventListener("touchmove", this.onTouchMove, {
                passive: !1
            })
        }
        this.onTouchEnd !== null && this.domTarget.addEventListener("touchend", this.onTouchEnd, !1)
    }
    isLeftClick(t) {
        return typeof t != "object" ? !1 : t.which == 1
    }
    isRightClick(t) {
        return typeof t != "object" ? !1 : t.which === 3
    }
    avoid() {}
    getMouseCoords(t) {
        var e = t.target, s = e.getBoundingClientRect(), h, i;
        if (h = 1,
        i = 1,
        this.isTouchEvent(t))
            var o = (t.changedTouches[0].clientX - s.left) * h
              , a = (t.changedTouches[0].clientY - s.top) * i;
        else
            var o = (t.clientX - s.left) * h
              , a = (t.clientY - s.top) * i;
        return {
            x: o,
            y: a
        }
    }
    notify() {
        try {
            this.boundRect = this.domTarget.getBoundingClientRect()
        } catch (t) {
            this.boundRect ? (this.boundRect.width = this.domTarget.clientWidth,
            this.boundRect.height = this.domTarget.clientHeight) : this.boundRect = {
                width: this.domTarget.clientWidth,
                height: this.domTarget.clientHeight
            },
            this.notifyError(t)
        }
        this.isTargetEmpty() ? (this.ratioX = 1,
        this.ratioY = 1) : (this.ratioX = Math.round(this.domTarget.width / this.boundRect.width),
        this.ratioY = Math.round(this.domTarget.height / this.boundRect.height))
    }
    isTargetEmpty() {
        return typeof this.domTarget.width > "u" || typeof this.domTarget.height > "u" || this.boundRect.width === 0 || this.boundRect.height === 0
    }
    setCoords(t, e) {
        this.state.setCoords(t, e, this.sensivity, this.ratioX, this.ratioY)
    }
    isTouchEvent(t) {
        return t.changedTouches
    }
    updateCoords(t) {
        let e;
        this.isTouchEvent() ? e = t.changedTouches[0] : e = t,
        this.setCoords((e.clientX - this.boundRect.left) * this.ratioX, (e.clientY - this.boundRect.top) * this.ratioY)
    }
    getPointerMovement(t) {
        t.target;
        var e = t._movementX * this.sensivity
          , s = t._movementY * this.sensivity;
        return e || (e = 0),
        s || (s = 0),
        {
            x: e,
            y: s
        }
    }
    setPointerMovement(t, e) {
        const s = this.state.data.lastCoordsOnScreen;
        return s.x && s.y && (t._movementX = parseFloat(e.x - s.x),
        t._movementY = parseFloat(e.y - s.y)),
        t
    }
    requestPointerLock() {
        var t = this.domTarget;
        t.addEventListener("click", function() {
            t.requestPointerLock = t.requestPointerLock || t.mozRequestPointerLock || t.webkitRequestPointerLock,
            t.requestPointerLock && t.requestPointerLock()
        }, !1)
    }
    exitPointerLock() {
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock,
        document.exitPointerLock()
    }
}
function ie(u) {
    let t = "";
    return u.ctrlKey && (t += "ctrl+"),
    u.altKey && (t += "alt+"),
    u.metaKey && (t += "meta+"),
    u.shiftKey && (t += "shift+"),
    t
}
class St {
    constructor(t={}) {
        this.elementsExcluded = new Set(t.elementsExcluded || St.elementsExcluded);
        const e = t.eventsRecognized || St.eventsRecognized;
        this.handler = t.handler,
        this.component = t.component,
        this.keysFired = {},
        e.forEach(s => {
            document.addEventListener(s, h => {
                if (!this.isAllowed(h))
                    return;
                const i = h.key.toLowerCase()
                  , o = this.getHandler(h, i);
                if (typeof o > "u" || !this.shouldTriggerEvent(o, s, i) || typeof o[s] != "function") {
                    this.handleEventKeyUpMetaKey(s, i);
                    return
                }
                o[s](h, this.component),
                this.handleEventKeyUpMetaKey(s, i)
            }
            )
        }
        )
    }
    shouldTriggerEvent(t, e, s) {
        return !(t.triggerOncePerPression && this.applyTriggerOncePerPressConstraint(e, s) !== !0)
    }
    getHandler(t, e) {
        let s = this.handler[`${ie(t)}${e}`];
        return typeof s > "u" && typeof this.handler["*"] < "u" && (s = this.handler["*"]),
        s
    }
    applyTriggerOncePerPressConstraint(t, e) {
        if (t === "keydown")
            return this.isFired(e) ? !1 : (this.fire(e),
            !0);
        if (t === "keyup")
            return this.unfire(e),
            !0
    }
    isAllowed(t) {
        return !(this.isElementExcluded(t) || this.isContentEditable(t))
    }
    isElementExcluded(t) {
        return this.elementsExcluded.has(t.target.tagName.toLowerCase())
    }
    isContentEditable(t) {
        const e = t.target.getAttribute("contenteditable");
        return e !== null || typeof e == "string" && e.length > 0
    }
    isFired(t) {
        return this.keysFired[t] === !0
    }
    fire(t) {
        this.keysFired[t] = !0
    }
    unfire(t) {
        this.keysFired[t] = !1
    }
    handleEventKeyUpMetaKey(t, e) {
        e !== "meta" || t !== "keyup" || Object.keys(this.keysFired).forEach(s => {
            this.keysFired[s] = !1
        }
        )
    }
}
St.elementsExcluded = new Set(["textarea", "input"]);
St.eventsRecognized = new Set(["keydown", "keyup"]);
function U(u, t, e) {
    this.data = u !== void 0 ? [u, t, e] : [0, 0, 0]
}
U.initialized = !1;
U.POOL = {
    instances: [],
    avaibles: [],
    initialSize: 10
};
U.initialize = function() {
    if (U.initialized === !1) {
        for (var u = 0; u < U.POOL.initialSize; ++u) {
            var t = new U;
            U.POOL.instances.push(t),
            U.POOL.avaibles.push(t)
        }
        U.initialized = !0
    }
}
;
U.getComplementOfCouple = function(u, t) {
    return t[0].equals(u[0]) || t[0].equals(u[1]) ? t[1] : t[0]
}
;
U.fromPoints = function(u, t) {
    return new U(t.getX() - u.getX(),t.getY() - u.getY(),t.getZ() - u.getZ())
}
;
U.local = function(u, t, e) {
    return new U(u,t,e)
}
;
U.use = function(h, i, o) {
    var s, h = h || 0, i = i || 0, o = o || 0;
    return U.POOL.avaibles.length > 0 ? s = U.POOL.avaibles.pop() : (s = new U,
    U.POOL.instances.push(s)),
    s.set(h, i, o),
    s.inUse = !0,
    s
}
;
U.getOne = function(h, i, o) {
    var s, h = h || 0, i = i || 0, o = o || 0;
    return U.POOL.avaibles.length > 0 ? s = U.POOL.avaibles.pop() : (s = new U,
    U.POOL.instances.push(s)),
    s.set(h, i, o),
    s.inUse = !0,
    s
}
;
U.getInstance = function(u) {
    return u === !0 ? U.use() : new U
}
;
U.determinant = function(u, t) {
    return u.getX() * t.getY() - u.getY() * t.getX()
}
;
U.det3x3 = function(u, t, e) {
    var s = u[0]
      , h = t[0]
      , i = e[0]
      , o = u[1]
      , a = t[1]
      , f = e[1]
      , _ = u[2]
      , E = t[2]
      , y = e[2];
    return s * (a * y - E * f) + o * (E * i - y * h) + _ * (h * f - a * i)
}
;
U.prototype.inUse = !1;
U.prototype.recycle = function() {
    this.inUse === !0 && (this.inUse = !1,
    U.POOL.avaibles.push(this))
}
;
U.prototype.setX = function(u) {
    return this.data[0] = u,
    this
}
;
U.prototype.setY = function(u) {
    return this.data[1] = u,
    this
}
;
U.prototype.setZ = function(u) {
    return this.data[2] = u,
    this
}
;
U.prototype.getX = function(u) {
    return this.data[0]
}
;
U.prototype.getY = function(u) {
    return this.data[1]
}
;
U.prototype.getZ = function() {
    return this.data[2]
}
;
U.prototype.set = function(u, t, e) {
    return this.data[0] = u,
    this.data[1] = t,
    this.data[2] = e,
    this
}
;
U.prototype.affect = function(u) {
    return this.data[0] = u.data[0],
    this.data[1] = u.data[1],
    this.data[2] = u.data[2],
    this
}
;
U.prototype.getNorm = function() {
    return Math.sqrt(this.data[0] * this.data[0] + this.data[1] * this.data[1] + this.data[2] * this.data[2])
}
;
U.prototype.getNorm2 = function() {
    return this.data[0] * this.data[0] + this.data[1] * this.data[1] + this.data[2] * this.data[2]
}
;
U.prototype.normalize = function() {
    var u = this.getNorm();
    return u > 0 && this.set(this.data[0] / u, this.data[1] / u, this.data[2] / u),
    this
}
;
U.prototype.isNull = function() {
    return this.data[0] === 0 && this.data[1] === 0 && this.data[2] === 0
}
;
U.prototype.cross = function(u, t) {
    var e = U.use().affect(u)
      , s = U.use().affect(t);
    return this.set(e.data[1] * s.data[2] - e.data[2] * s.data[1], e.data[2] * s.data[0] - e.data[0] * s.data[2], e.data[0] * s.data[1] - e.data[1] * s.data[0]),
    e.recycle(),
    s.recycle(),
    this
}
;
U.prototype.round = function(u) {
    return this.set(Math.round(this.data[0] * u) / u, Math.round(this.data[1] * u) / u, Math.round(this.data[2] * u) / u),
    this
}
;
U.prototype.approxEqual = function(u) {
    return this.distance(u) < .1
}
;
U.prototype.isInSpace = function(u, t) {
    return t === void 0 && (t = 0),
    this.data[0] < u.minX - t || this.data[1] < u.minY - t || this.data[2] < u.minZ - t || this.data[0] > u.maxX + t || this.data[1] > u.maxY + t || this.data[2] > u.maxZ + t
}
;
U.prototype.isInSpace2D = function(u, t) {
    return t === void 0 && (t = 0),
    this.data[0] < u.minX - t || this.data[1] < u.minY - t || this.data[0] > u.maxX + t || this.data[1] > u.maxY + t
}
;
U.prototype.copy = function(u) {
    return U.getInstance(u).set(this.data[0], this.data[1], this.data[2])
}
;
U.prototype.equals = function(u) {
    return this.data[0] === u.data[0] && this.data[1] === u.data[1] && this.data[2] === u.data[2]
}
;
U.prototype.distance = function(u) {
    return Math.sqrt((u.data[0] - this.data[0]) * (u.data[0] - this.data[0]) + (u.data[1] - this.data[1]) * (u.data[1] - this.data[1]) + (u.data[2] - this.data[2]) * (u.data[2] - this.data[2]))
}
;
U.prototype.angle = function(u) {
    var t = this.scalar(u) / (this.getNorm() * u.getNorm());
    function e(s, h, i) {
        return s <= h ? h : s >= i ? i : s
    }
    return Math.acos(e(t, -1, 1))
}
;
U.prototype.signedAngleXY = function(u) {
    return Math.atan2(this.getX() * u.getY() - this.getY() * u.getX(), this.getX() * u.getX() + this.getY() * u.getY())
}
;
U.prototype.rotateZ = function(u, t) {
    var e = this.data[0] - u.data[0]
      , s = this.data[1] - u.data[1]
      , h = this.data[2] - u.data[2];
    return this.set(e * Math.cos(t) - s * Math.sin(t) + u.data[0], e * Math.sin(t) + s * Math.cos(t) + u.data[1], h + u.data[2]),
    this
}
;
U.prototype.get = function(u) {
    return this.data[u]
}
;
U.from2D = function(u, t, e) {
    return U.getInstance(e).set(u, t, 0)
}
;
U.prototype.scalar = function(u) {
    return this.data[0] * u.data[0] + this.data[1] * u.data[1] + this.data[2] * u.data[2]
}
;
U.prototype.isColinear = function(u) {
    for (var t = 0; u.data[t] === 0 && t < u.data.length; )
        t++;
    if (t === u.length - 1)
        return !1;
    for (var e = this.data[t] / u.data[t], s = !0, h = 0; h < this.data.length; ++h)
        u.data[h] !== 0 && (e > this.data[h] / u.data[h] - .1 && e < this.data[h] / u.data[h] + .1 || (s = !1));
    return s && e !== 0
}
;
U.prototype.minus = function(u, t) {
    return U.getInstance(t).set(this.data[0] - u.data[0], this.data[1] - u.data[1], this.data[2] - u.data[2])
}
;
U.prototype.plus = function(u, t) {
    return U.getInstance(t).set(this.data[0] + u.data[0], this.data[1] + u.data[1], this.data[2] + u.data[2])
}
;
U.prototype.add = function(u) {
    return this.set(this.data[0] + u.data[0], this.data[1] + u.data[1], this.data[2] + u.data[2]),
    this
}
;
U.prototype.substract = function(u) {
    return this.set(this.data[0] - u.data[0], this.data[1] - u.data[1], this.data[2] - u.data[2]),
    this
}
;
U.prototype.divideScalar = function(u) {
    return u !== 0 && this.set(this.data[0] / u, this.data[1] / u, this.data[2] / u),
    this
}
;
U.prototype.multiplyScalar = function(u) {
    return this.set(this.data[0] * u, this.data[1] * u, this.data[2] * u),
    this
}
;
U.prototype.distance = function(u) {
    var t = this.minus(u)
      , e = t.getNorm();
    return e
}
;
U.prototype.transformMat4 = function(u, t) {
    var e = u.data[0]
      , s = u.data[1]
      , h = u.data[2]
      , i = t[3] * e + t[7] * s + t[11] * h + t[15];
    return i = i || 1,
    this.set((t[0] * e + t[4] * s + t[8] * h + t[12]) / i, (t[1] * e + t[5] * s + t[9] * h + t[13]) / i, (t[2] * e + t[6] * s + t[10] * h + t[14]) / i),
    this
}
;
U.prototype.translate = function(u, t, e) {
    return t === void 0 ? this.set(this.data[0] - u.data[0], this.data[1] - u.data[1], this.data[2] - u.data[2]) : this.set(this.data[0] + u, this.data[1] + t, this.data[2] + e),
    this
}
;
U.prototype.inverseSens = function() {
    return this.data[0] *= -1,
    this.data[1] *= -1,
    this.data[2] *= -1,
    this
}
;
U.prototype.scale = function(u=1, t=1, e=1) {
    return this.data[0] *= u,
    this.data[1] *= t,
    this.data[2] *= e,
    this
}
;
U.prototype.transfert = function(u) {
    this.affect(u(this))
}
;
U.prototype.swap = function(u) {
    var t = u.data[0]
      , e = u.data[1]
      , s = u.data[2];
    return u.data[0] = this.data[0],
    u.data[1] = this.data[1],
    u.data[2] = this.data[2],
    this.set(t, e, s),
    this
}
;
U.prototype.movePoint = function(u, t) {
    this.set(this.data[0] + u * t.getX(), this.data[1] + u * t.getY(), this.data[2] + u * t.getZ())
}
;
U.prototype.getIndexOfAbsoluteComposanteMax = function() {
    var u = 0
      , t = 0;
    return this.data.forEach(function(e, s) {
        var h = Math.abs(e);
        u < h && (u = h,
        t = s)
    }),
    t
}
;
U.prototype.isValid = function() {
    const u = this.data[0]
      , t = this.data[1]
      , e = this.data[2];
    return Number.isFinite(u) && Number.isFinite(t) && Number.isFinite(e)
}
;
U.prototype.toString = function() {
    return `[x: ${this.data[0]}|y: ${this.data[1]}|z: ${this.data[2]}]`
}
;
U.prototype.translateAlongVector = function(u) {
    this.translate(u.getX(), u.getY(), u.getZ())
}
;
U.initialize();
typeof window < "u" && typeof window.Vec3 > "u" && (window.Vec3 = U);
const vt = {
    getXByDistanceAndAngle(u, t, e) {
        return u + Math.cos(e % 360 * Math.PI / 180) * t
    },
    getYByDistanceAndAngle(u, t, e) {
        return u + Math.sin(e % 360 * Math.PI / 180) * -1 * t
    },
    getReverseAngle(u) {
        var t = (u + 180) % 360;
        return t
    },
    getAngleBetween2XY(u, t, e, s) {
        var h = s - t
          , i = e - u
          , o = Math.atan2(-h, i);
        o < 0 && (o += 2 * Math.PI);
        var a = o * 180 / Math.PI;
        return a
    },
    getDistanceBetween2XY(u, t, e, s) {
        var h = Math.pow(e - u, 2)
          , i = Math.pow(t - s, 2)
          , o = Math.sqrt(h + i);
        return o
    },
    rotatePointAroundCenter(u, t, e, s, h) {
        var i = Math.PI / 180 * h
          , o = Math.cos(i)
          , a = Math.sin(i)
          , f = o * (e - u) + a * (s - t) + u
          , _ = o * (s - t) - a * (e - u) + t;
        return {
            x: f,
            y: _
        }
    },
    getCartesianEquationOfLine(u, t) {
        var e = t.getY() - u.getY()
          , s = u.getX() - t.getX();
        return {
            a: e,
            b: s,
            c: -(u.getY() * s + e * u.getX())
        }
    },
    pointCircleCollide(u, t, e, s=!1) {
        if (e === 0)
            return !1;
        const h = t[0] - u[0]
          , i = t[1] - u[1]
          , o = h * h + i * i
          , a = o <= e * e;
        return s === !0 ? {
            distance: Math.sqrt(o),
            hasCollision: a
        } : a
    },
    lineCircleCollide(u, t, e, s, h) {
        if (vt.pointCircleCollide(u, e, s))
            return h && (h[0] = u[0],
            h[1] = u[1]),
            !0;
        if (vt.pointCircleCollide(t, e, s))
            return h && (h[0] = t[0],
            h[1] = t[1]),
            !0;
        const i = u[0]
          , o = u[1]
          , a = t[0]
          , f = t[1]
          , _ = e[0]
          , E = e[1]
          , y = a - i
          , w = f - o
          , d = _ - i
          , v = E - o
          , l = y * y + w * w;
        let m = y
          , c = w;
        if (l > 0) {
            const x = (d * y + v * w) / l;
            m *= x,
            c *= x
        }
        h || (h = [0, 0]),
        h[0] = i + m,
        h[1] = o + c;
        const b = m * m + c * c;
        return vt.pointCircleCollide(h, e, s) && b <= l && m * y + c * w >= 0
    },
    distancePointToLine2D: function(u, t, e) {
        var s = vt.getCartesianEquationOfLine(t, e)
          , h = Math.abs(s.a * u.getX() + s.b * u.getY() + s.c)
          , i = s.a * s.a + s.b * s.b;
        return h / Math.sqrt(i)
    },
    distancePointToEdge2D: function(u, t, e, s) {
        const h = u.distance(t)
          , i = t.distance(e)
          , o = u.distance(e)
          , a = i + s
          , f = h < a
          , _ = o < a;
        return f && _ ? vt.distancePointToLine2D(u, t, e) : Math.min(h, o)
    },
    gauss: function(u) {
        for (var t = 3, e = 0; e < t; e++) {
            for (var s = Math.abs(u[e][e]), h = e, i = e + 1; i < t; i++)
                Math.abs(u[i][e]) > s && (s = Math.abs(u[i][e]),
                h = i);
            for (var i = e; i < t + 1; i++) {
                var o = u[h][i];
                u[h][i] = u[e][i],
                u[e][i] = o
            }
            for (i = e + 1; i < t; i++)
                for (var a = -u[i][e] / u[e][e], f = e; f < t + 1; f++)
                    e == f ? u[i][f] = 0 : u[i][f] += a * u[e][f]
        }
        for (var _ = new Array(t), e = t - 1; e > -1; e--) {
            _[e] = u[e][e] === 0 ? 0 : u[e][t] / u[e][e];
            for (var i = e - 1; i > -1; i--)
                u[i][t] -= u[i][e] * _[e]
        }
        return _
    },
    getCartesianEquationOfPlane: function(u, t, e) {
        var s = new U;
        return e !== void 0 ? s.cross(t, e) : s.affect(t),
        {
            a: s.getX(),
            b: s.getY(),
            c: s.getZ(),
            d: -s.getX() * u.getX() - s.getY() * u.getY() - s.getZ() * u.getZ()
        }
    },
    intersection2D: function(u, t, e, s) {
        var h = u.getX() - t.getX()
          , i = u.getY() - t.getY()
          , o = e.getX() - s.getX()
          , a = e.getY() - s.getY()
          , f = h * a - i * o;
        if (Math.abs(f) < .01)
            return new U(null,null,null);
        var _ = u.getX() * t.getY() - u.getY() * t.getX()
          , E = e.getX() * s.getY() - e.getY() * s.getX()
          , y = (_ * o - E * h) / f
          , w = (_ * a - E * i) / f;
        return new U(y,w,0)
    },
    AABBRayIntersection: function(u, t, e) {
        var s = U.use(u.min.getX(), u.min.getY(), 0)
          , h = U.use(u.max.getX(), u.min.getY(), 0)
          , i = U.use(u.min.getX(), u.max.getY(), 0)
          , o = U.use(u.max.getX(), u.max.getY(), 0)
          , a = [];
        a.push(vt.intersection2D(s, h, t, e)),
        a.push(vt.intersection2D(s, i, t, e)),
        a.push(vt.intersection2D(h, o, t, e)),
        a.push(vt.intersection2D(i, o, t, e));
        var f = [];
        return a.forEach(function(_) {
            _.getX() !== null && u.containsPoint(_) === !0 && f.push(_)
        }),
        s.recycle(),
        h.recycle(),
        i.recycle(),
        o.recycle(),
        f
    }
};
let ne = class {
    constructor(u, t, e, s, h, i) {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        this.matrix = this.svg.createSVGMatrix(),
        this.setTransform(u, t, e, s, h, i)
    }
    setTransformMatrix(u) {
        this.matrix = u
    }
    getTransformMatrix() {
        return this.matrix
    }
    scale(u, t) {
        this.matrix = this.matrix.scaleNonUniform(u, t)
    }
    rotate(u) {
        this.matrix = this.matrix.rotate(u * 180 / Math.PI)
    }
    translate(u, t) {
        this.matrix = this.matrix.translate(u, t)
    }
    setTransform(u, t, e, s, h, i) {
        this.matrix.a = u,
        this.matrix.b = t,
        this.matrix.c = e,
        this.matrix.d = s,
        this.matrix.e = h,
        this.matrix.f = i
    }
    transform(u, t, e, s, h, i) {
        var o = this.svg.createSVGMatrix();
        o.a = u,
        o.b = t,
        o.c = e,
        o.d = s,
        o.e = h,
        o.f = i,
        this.matrix = this.matrix.multiply(o)
    }
    transformCoordinates(u, t) {
        var e = this.svg.createSVGPoint();
        return e.x = parseFloat(u),
        e.y = parseFloat(t),
        e.matrixTransform(this.matrix.inverse())
    }
    multiply(u) {
        this.matrix.multiply(u)
    }
    getComputedScaleX() {
        return Math.sqrt(this.matrix.a * this.matrix.a + this.matrix.c * this.matrix.c)
    }
    getComputedScaleY() {
        return Math.sqrt(this.matrix.d * this.matrix.d + this.matrix.b * this.matrix.b)
    }
    getTx() {
        return this.matrix.e
    }
    getTy() {
        return this.matrix.f
    }
    getScaleX() {
        return this.matrix.a
    }
    getScaleY() {
        return this.matrix.d
    }
    getSkewX() {
        return this.matrix.b
    }
    getSkewY() {
        return this.matrix.c
    }
    flipX() {
        this.matrix = this.matrix.flipX()
    }
    flipY() {
        this.matrix = this.matrix.flipY()
    }
}
;
const se = 1
  , ae = 0;
class pt {
    constructor(t) {
        const e = t.width
          , s = t.height;
        switch (this.canvasTag = document.createElement("canvas"),
        this.canvasTag.width = e,
        this.canvasTag.height = s,
        this.canvasTag.style.zIndex = t.cssZIndex,
        this.canvasTag.style.position = t.cssPosition,
        this.canvasTag.style.pointerEvents = t.cssPointerEvents,
        this.context = this.canvasTag.getContext("2d"),
        this.context.shadowOffsetX = 0,
        this.context.shadowOffsetY = 0,
        this.context.shadowBlur = 0,
        this.context.shadowColor = null,
        this.transformMatrix = new ne(1,0,0,1,0,0),
        this.canvasWidth = e,
        this.canvasHeight = s,
        this.savedTransforms = [],
        this.baseLineForText = "top",
        this.container = t.canvasDiv,
        t.addStatusId) {
        case se:
            this.container.appendChild(this.canvasTag);
            break;
        case ae:
            this.container.insertBefore(this.canvasTag, this.container.firstChild);
            break;
        default:
            throw 'missing "addStatusId" parameter'
        }
        this.ellipsisWidth = 0,
        this.ellipsis = "...",
        this.space = " ",
        this.spaceWidth = 0,
        t.useMouseController !== !1 && this.setupListener(),
        this.resize(e, s)
    }
    getContainer() {
        return this.container
    }
    setupListener() {
        const t = this;
        this.mouseController = new It({
            name: "icanvas-mouse-controller",
            domTarget: t.canvasTag,
            defaultIsAvoid: !0
        })
    }
    getImageUrl() {
        return this.canvasTag.toDataURL("image/png")
    }
    saveImage() {
        window.open(this.canvasTag.toDataURL("image/jpeg", 1))
    }
    getCanvasHeight() {
        return this.canvasHeight
    }
    setCanvasHeight(t) {
        return t = Math.floor(t),
        this.canvasTag.height !== t && (this.canvasTag.height = t,
        this.canvasHeight = t),
        this.canvasHeight
    }
    getCanvasWidth() {
        return this.canvasWidth
    }
    setCanvasWidth(t) {
        return t = Math.floor(t),
        this.canvasTag.width !== t && (this.canvasTag.width = t,
        this.canvasWidth = t),
        this.canvasWidth
    }
    setOnMouseDown(t) {
        this.mouseController.onMouseDown = t,
        this.mouseController.onTouchStart = t
    }
    setOnMouseMove(t) {
        this.mouseController.onMouseMove = t,
        this.mouseController.onTouchMove = t
    }
    setOnMouseUp(t) {
        this.mouseController.onMouseUp = t,
        this.mouseController.onTouchEnd = t
    }
    setOnMouseEnter(t) {
        this.mouseController.onMouseEnter = t
    }
    setOnMouseLeave(t) {
        this.mouseController.onMouseLeave = t
    }
    setOnMouseOut(t) {
        this.mouseController.onMouseOut = t
    }
    setOnMouseWheel(t) {
        this.mouseController.onMouseWheel = t
    }
    setOnClick(t) {
        this.mouseController.onClick = t
    }
    setOnDoubleClick(t) {
        this.mouseController.onDoubleClick = t
    }
    setKeyDownHandler(t) {
        document.addEventListener("keydown", t)
    }
    setId(t) {
        this.canvasTag.setAttribute("id", t)
    }
    setCss(t, e) {
        $(this.canvasTag).css(t, e)
    }
    setLineWidth(t) {
        this.context.lineWidth = t
    }
    getOffset() {
        return {
            left: this.canvasTag.offsetLeft,
            top: this.canvasTag.offsetTop
        }
    }
    setTextBaseline(t) {
        this.baseLineForText = t,
        this.context.textBaseline = this.baseLineForText
    }
    setTextAlign(t) {
        this.context.textAlign = t
    }
    setFillStyle(t) {
        this.context.fillStyle = t
    }
    setStrokeStyle(t) {
        this.context.strokeStyle = t
    }
    beginPath() {
        this.context.beginPath()
    }
    moveTo(t, e) {
        this.context.moveTo(t, e)
    }
    lineTo(t, e) {
        this.context.lineTo(t, e)
    }
    stroke() {
        this.context.stroke()
    }
    drawLine(t) {
        const e = this.context;
        e.fillStyle = t.color,
        e.strokeStyle = t.color,
        e.beginPath(),
        e.moveTo(Math.floor(t.a.getX()), Math.floor(t.a.getY())),
        e.lineTo(Math.floor(t.b.getX()), Math.floor(t.b.getY())),
        e.fill(),
        e.stroke(),
        e.closePath()
    }
    drawImage(t, e, s, h, i) {
        h && i ? this.context.drawImage(t, e, s, h, i) : this.context.drawImage(t, e, s)
    }
    fillCircle(t, e, s, h, i) {
        this.context.beginPath(),
        this.context.arc(t, e, s, 0, 2 * Math.PI, !1);
        const o = pt.getColorFromHex(i);
        this.context.fillStyle = "rgba(" + o.r + "," + o.g + "," + o.b + "," + h + ")",
        this.context.fill()
    }
    strokeCircle(t, e, s, h, i, o) {
        this.context.beginPath(),
        this.context.arc(t, e, s, 0, 2 * Math.PI, !1);
        var a = pt.getColorFromHex(i);
        this.context.lineWidth = o,
        this.context.strokeStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + h + ")",
        this.context.stroke()
    }
    fillEllipsis(t, e, s, h, i, o, a) {
        this.context.beginPath(),
        this.context.ellipse(t, e, s, h, i, 0, Math.PI * 2, !1);
        var f = pt.getColorFromHex(a);
        this.context.fillStyle = "rgba(" + f.r + "," + f.g + "," + f.b + "," + o + ")",
        this.context.fill()
    }
    strokeEllipsis(t, e, s, h, i, o, a, f) {
        this.context.beginPath(),
        this.context.ellipse(t, e, Math.abs(s), Math.abs(h), i, 0, Math.PI * 2, !1),
        this.context.lineWidth = f;
        var _ = pt.getColorFromHex(a);
        this.context.strokeStyle = "rgba(" + _.r + "," + _.g + "," + _.b + "," + o + ")",
        this.context.stroke()
    }
    drawRect(t, e, s, h, i, o) {
        this.context.beginPath(),
        this.context.rect(t, e, s, h);
        const a = pt.getColorFromHex(o);
        this.context.fillStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + i + ")",
        this.context.fill()
    }
    strokeRect(t, e, s, h, i, o) {
        this.context.beginPath(),
        this.context.rect(t, e, s, h);
        const a = pt.getColorFromHex(o);
        this.context.strokeStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + i + ")",
        this.context.stroke()
    }
    fillRect(t, e, s, h, i, o) {
        this.context.beginPath(),
        this.context.rect(t, e, s, h);
        const a = pt.getColorFromHex(o);
        this.context.fillStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + i + ")",
        this.context.fill()
    }
    clearCanvas(t=0, e=0, s=this.getCanvasWidth(), h=this.getCanvasHeight(), i=!1) {
        i === !0 && (this.saveCanvas(),
        this.setTransform(1, 0, 0, 1, 0, 0)),
        this.context.clearRect(t, e, s, h),
        i === !0 && this.restoreCanvas()
    }
    saveCanvas() {
        this.savedTransforms.push(new TransformMatrix(this.getScaleX(),this.getSkewX(),this.getSkewY(),this.getScaleY(),this.getTx(),this.getTy())),
        this.context.save()
    }
    restoreCanvas() {
        this.transformMatrix = this.savedTransforms.pop(),
        this.context.restore()
    }
    setGlobalAlpha(t) {
        this.context.globalAlpha = t
    }
    resize(t, e) {
        this.canvasWidth = t,
        this.canvasHeight = e,
        this.canvasTag.width = t,
        this.canvasTag.height = e,
        this.context.textBaseline = this.baseLineForText
    }
    getTransformMatrix() {
        return this.transformMatrix
    }
    scale(t, e) {
        this.transformMatrix.scale(t, e),
        this.context.scale(t, e)
    }
    rotate(t) {
        this.transformMatrix.rotate(t),
        this.context.rotate(t)
    }
    translate(t, e) {
        this.transformMatrix.translate(t, e),
        this.context.translate(t, e)
    }
    setTransform(t, e, s, h, i, o) {
        this.transformMatrix.setTransform(t, e, s, h, i, o),
        this.context.setTransform(t, e, s, h, i, o)
    }
    transform(t, e, s, h, i, o) {
        this.transformMatrix.transform(t, e, s, h, i, o),
        this.context.transform(t, e, s, h, i, o)
    }
    transformCoordinates(t, e) {
        return this.transformMatrix.transformCoordinates(t, e)
    }
    getTx() {
        return this.transformMatrix.getTx()
    }
    getTy() {
        return this.transformMatrix.getTy()
    }
    getComputedScaleX(t) {
        return (t ? -1 : 1) * this.transformMatrix.getComputedScaleX()
    }
    getComputedScaleY(t) {
        return t ? -this.transformMatrix.getComputedScaleY() : this.transformMatrix.getComputedScaleY()
    }
    getScaleX() {
        return this.transformMatrix.getScaleX()
    }
    getScaleY() {
        return this.transformMatrix.getScaleY()
    }
    getSkewX() {
        return this.transformMatrix.getSkewX()
    }
    getSkewY() {
        return this.transformMatrix.getSkewY()
    }
    flipX() {
        this.transformMatrix.flipX(),
        this.setTransform(-this.transformMatrix.getScaleX(), -this.transformMatrix.getSkewX(), -this.transformMatrix.getSkewY(), this.transformMatrix.getScaleY(), this.transformMatrix.getTx(), this.transformMatrix.getTy())
    }
    flipX2() {
        this.transformMatrix.flipX(),
        this.setTransform(this.transformMatrix.getScaleX(), -this.transformMatrix.getSkewX(), this.transformMatrix.getSkewY(), this.transformMatrix.getScaleY(), this.transformMatrix.getTx(), this.transformMatrix.getTy())
    }
    flipY2() {
        this.transformMatrix.flipY(),
        this.setTransform(-this.transformMatrix.getScaleX(), -this.transformMatrix.getSkewX(), -this.transformMatrix.getSkewY(), this.transformMatrix.getScaleY(), this.transformMatrix.getTx(), this.transformMatrix.getTy())
    }
    flipXY() {
        this.transformMatrix.flipX(),
        this.setTransform(-this.transformMatrix.getScaleX(), this.transformMatrix.getSkewX(), this.transformMatrix.getSkewY(), this.transformMatrix.getScaleY(), this.transformMatrix.getTx(), this.transformMatrix.getTy())
    }
    flipY() {
        this.transformMatrix.flipY(),
        this.setTransform(this.transformMatrix.getScaleX(), this.transformMatrix.getSkewX(), -this.transformMatrix.getSkewY(), this.transformMatrix.getScaleY(), this.transformMatrix.getTx(), this.transformMatrix.getTy())
    }
    measureTextInCanvas(t) {
        return this.context.measureText(t).width
    }
    stringEllipsis(t, e, s) {
        let h = this.context.measureText(t).width;
        if (h < e && s === !1)
            return t;
        {
            let i = t.length;
            for (; h >= e - this.ellipsisWidth && i-- > 0; )
                t = t.substring(0, i),
                h = this.context.measureText(t).width;
            return t + this.ellipsis
        }
    }
    drawMultilineText(t, e, s, h, i, o, a, f) {
        if (f === !1)
            var _ = Math.ceil(e + h);
        else
            var _ = Math.ceil(e);
        var E = Math.ceil(s)
          , y = this.context.measureText(t).width
          , w = 0;
        if (y > h) {
            for (var d = this, v = t.split(this.space), l = v.map(function(j) {
                return d.context.measureText(j).width
            }), m = !1, c = 0, b = 0, x = 0, T = 0, S = 0; S < o; ++S) {
                for (; c < l.length && x < h; )
                    x += l[c],
                    ++c;
                if (x > h && c > b + 1 && (--c,
                x -= l[c]),
                S == 0 && (T = x),
                S < o - 1)
                    this.context.fillText(v.slice(b, c).join(" "), _, E + i * S),
                    x += (c - b) * this.spaceWidth;
                else if (c - b === 0 && c < v.length) {
                    ++c,
                    x += l[c],
                    m = !0;
                    var R = v.slice(b, c).join(this.space)
                      , F = this.context.measureText(R).width;
                    F < h ? (R = this.stringEllipsis(R, h, c < l.length),
                    x += (c - b) * this.spaceWidth + this.ellipsisWidth) : x += (c - b) * this.spaceWidth,
                    this.context.fillText(R, _, E + i * S)
                } else if (c - b !== 0 && c <= v.length) {
                    m = !0;
                    var R = v.slice(b, c).join(this.space)
                      , F = this.context.measureText(R).width;
                    F < h ? (R = this.stringEllipsis(R, h, c < l.length),
                    x += (c - b) * this.spaceWidth + this.ellipsisWidth) : x += (c - b) * this.spaceWidth,
                    this.context.fillText(R, _, E + i * S)
                }
                w < x && (w = x),
                a && (x = Math.ceil(x),
                this.context.beginPath(),
                f === !1 ? (this.context.moveTo(_, E + 2 + i * (S + 1)),
                this.context.lineTo(_ - x, E + 2 + i * (S + 1))) : (this.context.moveTo(_, E + 2 + i * (S + 1)),
                this.context.lineTo(_ + x, E + 2 + i * (S + 1))),
                this.context.stroke()),
                x = 0,
                b = c
            }
            return {
                lengthOfFirstLine: (m === !0 ? -1 : 1) * T,
                maxLength: w
            }
        } else
            return this.context.fillText(t, _, E),
            a && (this.context.beginPath(),
            this.context.moveTo(_, E + i + 2),
            f === !1 ? this.context.lineTo(_ - y, E + i + 2) : this.context.lineTo(e + y, E + i + 2),
            this.context.stroke()),
            {
                lengthOfFirstLine: y,
                maxLength: y
            }
    }
    getLabelInfos(t, e, s, h) {
        var i = this.context.measureText(t).width
          , o = Math.min(Math.max(Math.ceil(i / s), 1), h)
          , a = o * (e + EAnatomyViewer.STYLE.LINE_INTERVAL_PX);
        return LabelToDrawInfos.getOne(a, t, t.length, o)
    }
    setCanvasBackground(t) {
        this.canvasTag.style.backgroundColor = "#" + t
    }
    hide() {
        this.canvasTag.style.display = "none"
    }
    show() {
        this.canvasTag.style.display = "block"
    }
    static recycleColor(t) {}
    getColor(t) {}
    static getColorFromHex(t) {
        if (t.charAt(0) == "#" && (t = t.substr(1)),
        pt.COLOR_POOL.AVAILABLE.length > 0)
            var e = pt.COLOR_POOL.AVAILABLE.pop();
        else
            var e = {
                r: 0,
                g: 0,
                b: 0
            };
        var s = parseInt(t, 16);
        return e.r = s >> 16,
        e.g = s >> 8 & 255,
        e.b = s & 255,
        e
    }
}
pt.COLOR_POOL = {
    AVAILABLE: [{
        r: 0,
        g: 0,
        b: 0
    }, {
        r: 0,
        g: 0,
        b: 0
    }, {
        r: 0,
        g: 0,
        b: 0
    }]
};
class ue {
    constructor(t, e, s) {
        this.a = t,
        this.b = e,
        this.color = s,
        this.accuracy = .1
    }
    getDirection(t=!1) {
        return U.getInstance(t).affect(this.b).substract(this.a).normalize()
    }
    recycle() {
        this.a.recycle(),
        this.b.recycle()
    }
    setAccuracy(t) {
        this.accuracy = t
    }
    hasPoint(t) {
        const e = t.distance(this.a)
          , s = this.a.distance(this.b)
          , h = t.distance(this.b);
        return Math.abs(e + h - s) < this.accuracy
    }
    getIntersectionWith(t) {
        let e = vt.intersection2D(this.a, this.b, t.a, t.b);
        return e !== null && this.hasPoint(e) === !1 && (e = null),
        e
    }
}
class _t extends mt {
    constructor(t) {
        super(wt({
            name: "pointer-controller"
        }, t)),
        this.target = t.target,
        this.handlers = {
            pointer: new It({
                domTarget: this.target,
                onMouseMove: this.onMouseMove.bind(this),
                onMouseDown: this.onMouseDown.bind(this),
                onMouseUp: this.onMouseUp.bind(this),
                onClick: this.onClick.bind(this),
                onDoubleClick: this.onDoubleClick.bind(this),
                onMouseEnter: this.onMouseEnter.bind(this),
                onMouseLeave: this.onMouseLeave.bind(this),
                onMouseWheel: this.onMouseWheel.bind(this)
            })
        },
        this.state = {
            pointer: t.state.pointer || new Mt
        };
        const e = t.clickSensitivity || {};
        this.clickSensitivity = {
            min: e.min || 80,
            max: e.max || 200
        },
        this.lastClickTimestamp = Date.now(),
        this.lastDBClickTimestamp = Date.now(),
        this.longClickTimer = null
    }
    updatePointerCoords(t) {
        this.state.pointer.update(t),
        this.state.pointer.data.lastCoordsOnScreen.x = t.clientX,
        this.state.pointer.data.lastCoordsOnScreen.y = t.clientY
    }
    clearLongClickTimer() {
        clearTimeout(this.longClickTimer),
        this.longClickTimer = null
    }
    enable() {
        this.data.enabled = !0
    }
    disable() {
        this.data.enabled = !1
    }
    isEnabled() {
        return this.data.enabled === !0
    }
    onMouseMove(t) {
        this.isEnabled() === !0 && (this.updatePointerCoords(t),
        this.publish(_t.EVENT.POINTER_MOVE, t),
        this.clearLongClickTimer())
    }
    onMouseDown(t) {
        this.updatePointerCoords(t),
        this.state.pointer.setMouseDownTarget(t.target),
        this.state.pointer.isDown = !0;
        const e = Date.now()
          , s = e - this.lastClickTimestamp;
        if (s <= this.clickSensitivity.min)
            this.lastClickTimestamp = e;
        else {
            if (this.state.pointer.isDown = !0,
            this.lastClickTimestamp = e,
            s < this.clickSensitivity.max)
                return this.onDoubleClick(t);
            this.longClickTimer === null && (this.longClickTimer = setTimeout( () => {
                this.publish(_t.EVENT.LONG_CLICK)
            }
            , 500)),
            this.publish(_t.EVENT.POINTER_DOWN, t)
        }
    }
    onMouseUp(t) {
        this.updatePointerCoords(t),
        clearTimeout(this.longClickTimer),
        this.state.pointer.isDown = !1,
        this.publish(_t.EVENT.POINTER_UP, t),
        t.preventDefault()
    }
    onMouseEnter(t) {
        this.updatePointerCoords(t),
        this.publish(_t.EVENT.POINTER_ENTER, t)
    }
    onMouseLeave(t) {
        this.state.pointer.isDown && (this.state.pointer.isDown = !1,
        this.clearLongClickTimer()),
        this.publish(_t.EVENT.POINTER_LEAVE, t)
    }
    onMouseWheel(t) {
        this.publish(_t.EVENT.MOUSE_WHEEL, t)
    }
    onClick(t) {}
    onDoubleClick(t) {
        const e = Date.now();
        e - this.lastDBClickTimestamp < this.clickSensitivity.min * 2 || (this.lastDBClickTimestamp = e,
        this.lastClickTimestamp = e,
        this.publish(_t.EVENT.DOUBLE_CLICK, t))
    }
    static isRightClick(t) {
        return t.which === 3 || t.button === 2
    }
}
_t.EVENT = {
    POINTER_MOVE: "pointer-move",
    POINTER_DOWN: "pointer-down",
    POINTER_UP: "pointer-up",
    POINTER_ENTER: "pointer-enter",
    POINTER_LEAVE: "pointer-leave",
    LONG_CLICK: "long-click",
    DOUBLE_CLICK: "double-click",
    MOUSE_WHEEL: "mouse-wheel"
};
class Lt extends jt {
    constructor(t) {
        super(),
        this.initialize = e => {
            this.init(e, t)
        }
    }
    init(t, e) {
        return t.store("isFullScreen", !1),
        Lt.isSafariIOS() ? this.initFullscreenModeForIOS(t, e.element) : this.initFullscreenMode(t, e.element),
        this
    }
    onFullScreen(t, e) {
        t.emit("onFullScreen"),
        t.store("isFullScreen", !0),
        e.classList.add("fullscreen"),
        t.publish(Nt.ON_FULLSCREEN)
    }
    onExitFullScreen(t, e) {
        t.emit("onExitFullscreen"),
        t.store("isFullScreen", !1),
        e.classList.remove("fullscreen"),
        t.publish(Nt.ON_EXIT_FULLSCREEN)
    }
    onFullScreenChange(t, e) {
        document[this.getLeaveFullscreenHandler(t).propertyName] !== e && this.onExitFullScreen(t, e)
    }
    initFullscreenModeForIOS(t, e) {
        const s = document.body
          , h = i => {
            try {
                i.preventDefault()
            } catch (o) {
                t.notifyError(o)
            }
        }
        ;
        t.setBehavior("toggleFullScreen", () => {
            t.get("isFullScreen") === !1 ? (e.classList.add("fullscreen"),
            s.classList.add("no-scroll"),
            s.ontouchmove = h,
            s.parentElement.ontouchmove = h,
            e.style.height = window.innerHeight + "px") : (e.classList.remove("fullscreen"),
            s.classList.remove("no-scroll"),
            s.ontouchmove = null,
            s.parentElement.ontouchmove = null,
            e.style.height = "")
        }
        )
    }
    initFullscreenMode(t, e) {
        const s = this.getFullscreenHandler(t, e);
        t.listen(s.eventName, () => {
            this.onFullScreenChange(t, e)
        }
        ),
        s.eventName !== "fullscreenchange" && t.listen("fullscreenchange", () => {
            this.onFullScreenChange(t, e)
        }
        ),
        t.setBehavior("toggleFullScreen", () => {
            t.get("isFullScreen") === !1 ? (s.requestFullScreen(),
            this.onFullScreen(t, e)) : (s.exitFullscreen(),
            this.onExitFullScreen(t, e))
        }
        )
    }
    getOpenFullscreenHandler(t, e=document.body) {
        let s, h;
        return typeof e.requestFullscreen == "function" ? (s = "requestFullscreen",
        h = "fullscreenChange") : typeof e.mozRequestFullScreen == "function" ? (s = "mozRequestFullScreen",
        h = "mozfullscreenchange") : typeof e.webkitRequestFullscreen == "function" ? (s = "webkitRequestFullScreen",
        h = "webkitfullscreenchange") : typeof e.msRequestFullscreen == "function" && (s = "msRequestFullscreen",
        h = "MSFullscreenChange"),
        {
            requestFullScreen() {
                try {
                    e[s]()
                } catch (i) {
                    t.notifyError(i)
                }
            },
            eventName: h
        }
    }
    getLeaveFullscreenHandler(t) {
        let e = null
          , s = null;
        if (typeof document.exitFullscreen == "function")
            e = "exitFullscreen";
        else if (typeof document.webkitExitFullscreen == "function")
            e = "webkitExitFullscreen";
        else if (typeof document.mozCancelFullScreen == "function")
            e = "mozCancelFullScreen";
        else if (typeof document.msExitFullscreen == "function")
            e = "msExitFullscreen";
        else
            throw new Error("No exit fullscreen method");
        if ("fullscreenElement"in document)
            s = "fullscreenElement";
        else if ("webkitFullscreenElement"in document)
            s = "webkitFullscreenElement";
        else if ("mozFullScreenElement"in document)
            s = "mozFullScreenElement";
        else if ("msFullscreenElement"in document)
            s = "msFullscreenElement ";
        else
            throw new Error("No fullscreen element property");
        return {
            exitFullscreen() {
                if (s === null || document[s])
                    try {
                        document[e]()
                    } catch (h) {
                        t.notifyError(h)
                    }
            },
            propertyName: s
        }
    }
    getFullscreenHandler(t, e=document.body) {
        return wt(wt({}, this.getOpenFullscreenHandler(t, e)), this.getLeaveFullscreenHandler(t))
    }
    static isSafariIOS() {
        return navigator.userAgent.match(/(iPod|iPhone|iPad)/) !== null && navigator.userAgent.match(/AppleWebKit/) !== null
    }
}
const Nt = {
    ON_FULLSCREEN: "onFullscreen",
    ON_EXIT_FULLSCREEN: "onExitFullscreen"
};
function ce(u, t) {
    return new Lt(t)
}
const de = "1.1.11";
function zt(u) {
    throw new Error('Could not dynamically require "' + u + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
}
var Wt = {
    exports: {}
};
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(u, t) {
    (function(e) {
        u.exports = e()
    }
    )(function() {
        return function e(s, h, i) {
            function o(_, E) {
                if (!h[_]) {
                    if (!s[_]) {
                        var y = typeof zt == "function" && zt;
                        if (!E && y)
                            return y(_, !0);
                        if (a)
                            return a(_, !0);
                        var w = new Error("Cannot find module '" + _ + "'");
                        throw w.code = "MODULE_NOT_FOUND",
                        w
                    }
                    var d = h[_] = {
                        exports: {}
                    };
                    s[_][0].call(d.exports, function(v) {
                        var l = s[_][1][v];
                        return o(l || v)
                    }, d, d.exports, e, s, h, i)
                }
                return h[_].exports
            }
            for (var a = typeof zt == "function" && zt, f = 0; f < i.length; f++)
                o(i[f]);
            return o
        }({
            1: [function(e, s, h) {
                var i = e("./utils")
                  , o = e("./support")
                  , a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                h.encode = function(f) {
                    for (var _, E, y, w, d, v, l, m = [], c = 0, b = f.length, x = b, T = i.getTypeOf(f) !== "string"; c < f.length; )
                        x = b - c,
                        y = T ? (_ = f[c++],
                        E = c < b ? f[c++] : 0,
                        c < b ? f[c++] : 0) : (_ = f.charCodeAt(c++),
                        E = c < b ? f.charCodeAt(c++) : 0,
                        c < b ? f.charCodeAt(c++) : 0),
                        w = _ >> 2,
                        d = (3 & _) << 4 | E >> 4,
                        v = 1 < x ? (15 & E) << 2 | y >> 6 : 64,
                        l = 2 < x ? 63 & y : 64,
                        m.push(a.charAt(w) + a.charAt(d) + a.charAt(v) + a.charAt(l));
                    return m.join("")
                }
                ,
                h.decode = function(f) {
                    var _, E, y, w, d, v, l = 0, m = 0, c = "data:";
                    if (f.substr(0, c.length) === c)
                        throw new Error("Invalid base64 input, it looks like a data url.");
                    var b, x = 3 * (f = f.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
                    if (f.charAt(f.length - 1) === a.charAt(64) && x--,
                    f.charAt(f.length - 2) === a.charAt(64) && x--,
                    x % 1 != 0)
                        throw new Error("Invalid base64 input, bad content length.");
                    for (b = o.uint8array ? new Uint8Array(0 | x) : new Array(0 | x); l < f.length; )
                        _ = a.indexOf(f.charAt(l++)) << 2 | (w = a.indexOf(f.charAt(l++))) >> 4,
                        E = (15 & w) << 4 | (d = a.indexOf(f.charAt(l++))) >> 2,
                        y = (3 & d) << 6 | (v = a.indexOf(f.charAt(l++))),
                        b[m++] = _,
                        d !== 64 && (b[m++] = E),
                        v !== 64 && (b[m++] = y);
                    return b
                }
            }
            , {
                "./support": 30,
                "./utils": 32
            }],
            2: [function(e, s, h) {
                var i = e("./external")
                  , o = e("./stream/DataWorker")
                  , a = e("./stream/Crc32Probe")
                  , f = e("./stream/DataLengthProbe");
                function _(E, y, w, d, v) {
                    this.compressedSize = E,
                    this.uncompressedSize = y,
                    this.crc32 = w,
                    this.compression = d,
                    this.compressedContent = v
                }
                _.prototype = {
                    getContentWorker: function() {
                        var E = new o(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new f("data_length"))
                          , y = this;
                        return E.on("end", function() {
                            if (this.streamInfo.data_length !== y.uncompressedSize)
                                throw new Error("Bug : uncompressed data size mismatch")
                        }),
                        E
                    },
                    getCompressedWorker: function() {
                        return new o(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
                    }
                },
                _.createWorkerFrom = function(E, y, w) {
                    return E.pipe(new a).pipe(new f("uncompressedSize")).pipe(y.compressWorker(w)).pipe(new f("compressedSize")).withStreamInfo("compression", y)
                }
                ,
                s.exports = _
            }
            , {
                "./external": 6,
                "./stream/Crc32Probe": 25,
                "./stream/DataLengthProbe": 26,
                "./stream/DataWorker": 27
            }],
            3: [function(e, s, h) {
                var i = e("./stream/GenericWorker");
                h.STORE = {
                    magic: "\0\0",
                    compressWorker: function() {
                        return new i("STORE compression")
                    },
                    uncompressWorker: function() {
                        return new i("STORE decompression")
                    }
                },
                h.DEFLATE = e("./flate")
            }
            , {
                "./flate": 7,
                "./stream/GenericWorker": 28
            }],
            4: [function(e, s, h) {
                var i = e("./utils")
                  , o = function() {
                    for (var a, f = [], _ = 0; _ < 256; _++) {
                        a = _;
                        for (var E = 0; E < 8; E++)
                            a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
                        f[_] = a
                    }
                    return f
                }();
                s.exports = function(a, f) {
                    return a !== void 0 && a.length ? i.getTypeOf(a) !== "string" ? function(_, E, y, w) {
                        var d = o
                          , v = w + y;
                        _ ^= -1;
                        for (var l = w; l < v; l++)
                            _ = _ >>> 8 ^ d[255 & (_ ^ E[l])];
                        return -1 ^ _
                    }(0 | f, a, a.length, 0) : function(_, E, y, w) {
                        var d = o
                          , v = w + y;
                        _ ^= -1;
                        for (var l = w; l < v; l++)
                            _ = _ >>> 8 ^ d[255 & (_ ^ E.charCodeAt(l))];
                        return -1 ^ _
                    }(0 | f, a, a.length, 0) : 0
                }
            }
            , {
                "./utils": 32
            }],
            5: [function(e, s, h) {
                h.base64 = !1,
                h.binary = !1,
                h.dir = !1,
                h.createFolders = !0,
                h.date = null,
                h.compression = null,
                h.compressionOptions = null,
                h.comment = null,
                h.unixPermissions = null,
                h.dosPermissions = null
            }
            , {}],
            6: [function(e, s, h) {
                var i = null;
                i = typeof Promise != "undefined" ? Promise : e("lie"),
                s.exports = {
                    Promise: i
                }
            }
            , {
                lie: 37
            }],
            7: [function(e, s, h) {
                var i = typeof Uint8Array != "undefined" && typeof Uint16Array != "undefined" && typeof Uint32Array != "undefined"
                  , o = e("pako")
                  , a = e("./utils")
                  , f = e("./stream/GenericWorker")
                  , _ = i ? "uint8array" : "array";
                function E(y, w) {
                    f.call(this, "FlateWorker/" + y),
                    this._pako = null,
                    this._pakoAction = y,
                    this._pakoOptions = w,
                    this.meta = {}
                }
                h.magic = "\b\0",
                a.inherits(E, f),
                E.prototype.processChunk = function(y) {
                    this.meta = y.meta,
                    this._pako === null && this._createPako(),
                    this._pako.push(a.transformTo(_, y.data), !1)
                }
                ,
                E.prototype.flush = function() {
                    f.prototype.flush.call(this),
                    this._pako === null && this._createPako(),
                    this._pako.push([], !0)
                }
                ,
                E.prototype.cleanUp = function() {
                    f.prototype.cleanUp.call(this),
                    this._pako = null
                }
                ,
                E.prototype._createPako = function() {
                    this._pako = new o[this._pakoAction]({
                        raw: !0,
                        level: this._pakoOptions.level || -1
                    });
                    var y = this;
                    this._pako.onData = function(w) {
                        y.push({
                            data: w,
                            meta: y.meta
                        })
                    }
                }
                ,
                h.compressWorker = function(y) {
                    return new E("Deflate",y)
                }
                ,
                h.uncompressWorker = function() {
                    return new E("Inflate",{})
                }
            }
            , {
                "./stream/GenericWorker": 28,
                "./utils": 32,
                pako: 38
            }],
            8: [function(e, s, h) {
                function i(d, v) {
                    var l, m = "";
                    for (l = 0; l < v; l++)
                        m += String.fromCharCode(255 & d),
                        d >>>= 8;
                    return m
                }
                function o(d, v, l, m, c, b) {
                    var x, T, S = d.file, R = d.compression, F = b !== _.utf8encode, j = a.transformTo("string", b(S.name)), I = a.transformTo("string", _.utf8encode(S.name)), Z = S.comment, Q = a.transformTo("string", b(Z)), k = a.transformTo("string", _.utf8encode(Z)), L = I.length !== S.name.length, n = k.length !== Z.length, B = "", et = "", W = "", rt = S.dir, X = S.date, tt = {
                        crc32: 0,
                        compressedSize: 0,
                        uncompressedSize: 0
                    };
                    v && !l || (tt.crc32 = d.crc32,
                    tt.compressedSize = d.compressedSize,
                    tt.uncompressedSize = d.uncompressedSize);
                    var z = 0;
                    v && (z |= 8),
                    F || !L && !n || (z |= 2048);
                    var O = 0
                      , J = 0;
                    rt && (O |= 16),
                    c === "UNIX" ? (J = 798,
                    O |= function(q, ot) {
                        var ct = q;
                        return q || (ct = ot ? 16893 : 33204),
                        (65535 & ct) << 16
                    }(S.unixPermissions, rt)) : (J = 20,
                    O |= function(q) {
                        return 63 & (q || 0)
                    }(S.dosPermissions)),
                    x = X.getUTCHours(),
                    x <<= 6,
                    x |= X.getUTCMinutes(),
                    x <<= 5,
                    x |= X.getUTCSeconds() / 2,
                    T = X.getUTCFullYear() - 1980,
                    T <<= 4,
                    T |= X.getUTCMonth() + 1,
                    T <<= 5,
                    T |= X.getUTCDate(),
                    L && (et = i(1, 1) + i(E(j), 4) + I,
                    B += "up" + i(et.length, 2) + et),
                    n && (W = i(1, 1) + i(E(Q), 4) + k,
                    B += "uc" + i(W.length, 2) + W);
                    var V = "";
                    return V += `
\0`,
                    V += i(z, 2),
                    V += R.magic,
                    V += i(x, 2),
                    V += i(T, 2),
                    V += i(tt.crc32, 4),
                    V += i(tt.compressedSize, 4),
                    V += i(tt.uncompressedSize, 4),
                    V += i(j.length, 2),
                    V += i(B.length, 2),
                    {
                        fileRecord: y.LOCAL_FILE_HEADER + V + j + B,
                        dirRecord: y.CENTRAL_FILE_HEADER + i(J, 2) + V + i(Q.length, 2) + "\0\0\0\0" + i(O, 4) + i(m, 4) + j + B + Q
                    }
                }
                var a = e("../utils")
                  , f = e("../stream/GenericWorker")
                  , _ = e("../utf8")
                  , E = e("../crc32")
                  , y = e("../signature");
                function w(d, v, l, m) {
                    f.call(this, "ZipFileWorker"),
                    this.bytesWritten = 0,
                    this.zipComment = v,
                    this.zipPlatform = l,
                    this.encodeFileName = m,
                    this.streamFiles = d,
                    this.accumulate = !1,
                    this.contentBuffer = [],
                    this.dirRecords = [],
                    this.currentSourceOffset = 0,
                    this.entriesCount = 0,
                    this.currentFile = null,
                    this._sources = []
                }
                a.inherits(w, f),
                w.prototype.push = function(d) {
                    var v = d.meta.percent || 0
                      , l = this.entriesCount
                      , m = this._sources.length;
                    this.accumulate ? this.contentBuffer.push(d) : (this.bytesWritten += d.data.length,
                    f.prototype.push.call(this, {
                        data: d.data,
                        meta: {
                            currentFile: this.currentFile,
                            percent: l ? (v + 100 * (l - m - 1)) / l : 100
                        }
                    }))
                }
                ,
                w.prototype.openedSource = function(d) {
                    this.currentSourceOffset = this.bytesWritten,
                    this.currentFile = d.file.name;
                    var v = this.streamFiles && !d.file.dir;
                    if (v) {
                        var l = o(d, v, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                        this.push({
                            data: l.fileRecord,
                            meta: {
                                percent: 0
                            }
                        })
                    } else
                        this.accumulate = !0
                }
                ,
                w.prototype.closedSource = function(d) {
                    this.accumulate = !1;
                    var v = this.streamFiles && !d.file.dir
                      , l = o(d, v, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                    if (this.dirRecords.push(l.dirRecord),
                    v)
                        this.push({
                            data: function(m) {
                                return y.DATA_DESCRIPTOR + i(m.crc32, 4) + i(m.compressedSize, 4) + i(m.uncompressedSize, 4)
                            }(d),
                            meta: {
                                percent: 100
                            }
                        });
                    else
                        for (this.push({
                            data: l.fileRecord,
                            meta: {
                                percent: 0
                            }
                        }); this.contentBuffer.length; )
                            this.push(this.contentBuffer.shift());
                    this.currentFile = null
                }
                ,
                w.prototype.flush = function() {
                    for (var d = this.bytesWritten, v = 0; v < this.dirRecords.length; v++)
                        this.push({
                            data: this.dirRecords[v],
                            meta: {
                                percent: 100
                            }
                        });
                    var l = this.bytesWritten - d
                      , m = function(c, b, x, T, S) {
                        var R = a.transformTo("string", S(T));
                        return y.CENTRAL_DIRECTORY_END + "\0\0\0\0" + i(c, 2) + i(c, 2) + i(b, 4) + i(x, 4) + i(R.length, 2) + R
                    }(this.dirRecords.length, l, d, this.zipComment, this.encodeFileName);
                    this.push({
                        data: m,
                        meta: {
                            percent: 100
                        }
                    })
                }
                ,
                w.prototype.prepareNextSource = function() {
                    this.previous = this._sources.shift(),
                    this.openedSource(this.previous.streamInfo),
                    this.isPaused ? this.previous.pause() : this.previous.resume()
                }
                ,
                w.prototype.registerPrevious = function(d) {
                    this._sources.push(d);
                    var v = this;
                    return d.on("data", function(l) {
                        v.processChunk(l)
                    }),
                    d.on("end", function() {
                        v.closedSource(v.previous.streamInfo),
                        v._sources.length ? v.prepareNextSource() : v.end()
                    }),
                    d.on("error", function(l) {
                        v.error(l)
                    }),
                    this
                }
                ,
                w.prototype.resume = function() {
                    return !!f.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(),
                    !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(),
                    !0))
                }
                ,
                w.prototype.error = function(d) {
                    var v = this._sources;
                    if (!f.prototype.error.call(this, d))
                        return !1;
                    for (var l = 0; l < v.length; l++)
                        try {
                            v[l].error(d)
                        } catch (m) {}
                    return !0
                }
                ,
                w.prototype.lock = function() {
                    f.prototype.lock.call(this);
                    for (var d = this._sources, v = 0; v < d.length; v++)
                        d[v].lock()
                }
                ,
                s.exports = w
            }
            , {
                "../crc32": 4,
                "../signature": 23,
                "../stream/GenericWorker": 28,
                "../utf8": 31,
                "../utils": 32
            }],
            9: [function(e, s, h) {
                var i = e("../compressions")
                  , o = e("./ZipFileWorker");
                h.generateWorker = function(a, f, _) {
                    var E = new o(f.streamFiles,_,f.platform,f.encodeFileName)
                      , y = 0;
                    try {
                        a.forEach(function(w, d) {
                            y++;
                            var v = function(b, x) {
                                var T = b || x
                                  , S = i[T];
                                if (!S)
                                    throw new Error(T + " is not a valid compression method !");
                                return S
                            }(d.options.compression, f.compression)
                              , l = d.options.compressionOptions || f.compressionOptions || {}
                              , m = d.dir
                              , c = d.date;
                            d._compressWorker(v, l).withStreamInfo("file", {
                                name: w,
                                dir: m,
                                date: c,
                                comment: d.comment || "",
                                unixPermissions: d.unixPermissions,
                                dosPermissions: d.dosPermissions
                            }).pipe(E)
                        }),
                        E.entriesCount = y
                    } catch (w) {
                        E.error(w)
                    }
                    return E
                }
            }
            , {
                "../compressions": 3,
                "./ZipFileWorker": 8
            }],
            10: [function(e, s, h) {
                function i() {
                    if (!(this instanceof i))
                        return new i;
                    if (arguments.length)
                        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                    this.files = Object.create(null),
                    this.comment = null,
                    this.root = "",
                    this.clone = function() {
                        var o = new i;
                        for (var a in this)
                            typeof this[a] != "function" && (o[a] = this[a]);
                        return o
                    }
                }
                (i.prototype = e("./object")).loadAsync = e("./load"),
                i.support = e("./support"),
                i.defaults = e("./defaults"),
                i.version = "3.10.1",
                i.loadAsync = function(o, a) {
                    return new i().loadAsync(o, a)
                }
                ,
                i.external = e("./external"),
                s.exports = i
            }
            , {
                "./defaults": 5,
                "./external": 6,
                "./load": 11,
                "./object": 15,
                "./support": 30
            }],
            11: [function(e, s, h) {
                var i = e("./utils")
                  , o = e("./external")
                  , a = e("./utf8")
                  , f = e("./zipEntries")
                  , _ = e("./stream/Crc32Probe")
                  , E = e("./nodejsUtils");
                function y(w) {
                    return new o.Promise(function(d, v) {
                        var l = w.decompressed.getContentWorker().pipe(new _);
                        l.on("error", function(m) {
                            v(m)
                        }).on("end", function() {
                            l.streamInfo.crc32 !== w.decompressed.crc32 ? v(new Error("Corrupted zip : CRC32 mismatch")) : d()
                        }).resume()
                    }
                    )
                }
                s.exports = function(w, d) {
                    var v = this;
                    return d = i.extend(d || {}, {
                        base64: !1,
                        checkCRC32: !1,
                        optimizedBinaryString: !1,
                        createFolders: !1,
                        decodeFileName: a.utf8decode
                    }),
                    E.isNode && E.isStream(w) ? o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", w, !0, d.optimizedBinaryString, d.base64).then(function(l) {
                        var m = new f(d);
                        return m.load(l),
                        m
                    }).then(function(l) {
                        var m = [o.Promise.resolve(l)]
                          , c = l.files;
                        if (d.checkCRC32)
                            for (var b = 0; b < c.length; b++)
                                m.push(y(c[b]));
                        return o.Promise.all(m)
                    }).then(function(l) {
                        for (var m = l.shift(), c = m.files, b = 0; b < c.length; b++) {
                            var x = c[b]
                              , T = x.fileNameStr
                              , S = i.resolve(x.fileNameStr);
                            v.file(S, x.decompressed, {
                                binary: !0,
                                optimizedBinaryString: !0,
                                date: x.date,
                                dir: x.dir,
                                comment: x.fileCommentStr.length ? x.fileCommentStr : null,
                                unixPermissions: x.unixPermissions,
                                dosPermissions: x.dosPermissions,
                                createFolders: d.createFolders
                            }),
                            x.dir || (v.file(S).unsafeOriginalName = T)
                        }
                        return m.zipComment.length && (v.comment = m.zipComment),
                        v
                    })
                }
            }
            , {
                "./external": 6,
                "./nodejsUtils": 14,
                "./stream/Crc32Probe": 25,
                "./utf8": 31,
                "./utils": 32,
                "./zipEntries": 33
            }],
            12: [function(e, s, h) {
                var i = e("../utils")
                  , o = e("../stream/GenericWorker");
                function a(f, _) {
                    o.call(this, "Nodejs stream input adapter for " + f),
                    this._upstreamEnded = !1,
                    this._bindStream(_)
                }
                i.inherits(a, o),
                a.prototype._bindStream = function(f) {
                    var _ = this;
                    (this._stream = f).pause(),
                    f.on("data", function(E) {
                        _.push({
                            data: E,
                            meta: {
                                percent: 0
                            }
                        })
                    }).on("error", function(E) {
                        _.isPaused ? this.generatedError = E : _.error(E)
                    }).on("end", function() {
                        _.isPaused ? _._upstreamEnded = !0 : _.end()
                    })
                }
                ,
                a.prototype.pause = function() {
                    return !!o.prototype.pause.call(this) && (this._stream.pause(),
                    !0)
                }
                ,
                a.prototype.resume = function() {
                    return !!o.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(),
                    !0)
                }
                ,
                s.exports = a
            }
            , {
                "../stream/GenericWorker": 28,
                "../utils": 32
            }],
            13: [function(e, s, h) {
                var i = e("readable-stream").Readable;
                function o(a, f, _) {
                    i.call(this, f),
                    this._helper = a;
                    var E = this;
                    a.on("data", function(y, w) {
                        E.push(y) || E._helper.pause(),
                        _ && _(w)
                    }).on("error", function(y) {
                        E.emit("error", y)
                    }).on("end", function() {
                        E.push(null)
                    })
                }
                e("../utils").inherits(o, i),
                o.prototype._read = function() {
                    this._helper.resume()
                }
                ,
                s.exports = o
            }
            , {
                "../utils": 32,
                "readable-stream": 16
            }],
            14: [function(e, s, h) {
                s.exports = {
                    isNode: typeof Buffer != "undefined",
                    newBufferFrom: function(i, o) {
                        if (Buffer.from && Buffer.from !== Uint8Array.from)
                            return Buffer.from(i, o);
                        if (typeof i == "number")
                            throw new Error('The "data" argument must not be a number');
                        return new Buffer(i,o)
                    },
                    allocBuffer: function(i) {
                        if (Buffer.alloc)
                            return Buffer.alloc(i);
                        var o = new Buffer(i);
                        return o.fill(0),
                        o
                    },
                    isBuffer: function(i) {
                        return Buffer.isBuffer(i)
                    },
                    isStream: function(i) {
                        return i && typeof i.on == "function" && typeof i.pause == "function" && typeof i.resume == "function"
                    }
                }
            }
            , {}],
            15: [function(e, s, h) {
                function i(S, R, F) {
                    var j, I = a.getTypeOf(R), Z = a.extend(F || {}, E);
                    Z.date = Z.date || new Date,
                    Z.compression !== null && (Z.compression = Z.compression.toUpperCase()),
                    typeof Z.unixPermissions == "string" && (Z.unixPermissions = parseInt(Z.unixPermissions, 8)),
                    Z.unixPermissions && 16384 & Z.unixPermissions && (Z.dir = !0),
                    Z.dosPermissions && 16 & Z.dosPermissions && (Z.dir = !0),
                    Z.dir && (S = c(S)),
                    Z.createFolders && (j = m(S)) && b.call(this, j, !0);
                    var Q = I === "string" && Z.binary === !1 && Z.base64 === !1;
                    F && F.binary !== void 0 || (Z.binary = !Q),
                    (R instanceof y && R.uncompressedSize === 0 || Z.dir || !R || R.length === 0) && (Z.base64 = !1,
                    Z.binary = !0,
                    R = "",
                    Z.compression = "STORE",
                    I = "string");
                    var k = null;
                    k = R instanceof y || R instanceof f ? R : v.isNode && v.isStream(R) ? new l(S,R) : a.prepareContent(S, R, Z.binary, Z.optimizedBinaryString, Z.base64);
                    var L = new w(S,k,Z);
                    this.files[S] = L
                }
                var o = e("./utf8")
                  , a = e("./utils")
                  , f = e("./stream/GenericWorker")
                  , _ = e("./stream/StreamHelper")
                  , E = e("./defaults")
                  , y = e("./compressedObject")
                  , w = e("./zipObject")
                  , d = e("./generate")
                  , v = e("./nodejsUtils")
                  , l = e("./nodejs/NodejsStreamInputAdapter")
                  , m = function(S) {
                    S.slice(-1) === "/" && (S = S.substring(0, S.length - 1));
                    var R = S.lastIndexOf("/");
                    return 0 < R ? S.substring(0, R) : ""
                }
                  , c = function(S) {
                    return S.slice(-1) !== "/" && (S += "/"),
                    S
                }
                  , b = function(S, R) {
                    return R = R !== void 0 ? R : E.createFolders,
                    S = c(S),
                    this.files[S] || i.call(this, S, null, {
                        dir: !0,
                        createFolders: R
                    }),
                    this.files[S]
                };
                function x(S) {
                    return Object.prototype.toString.call(S) === "[object RegExp]"
                }
                var T = {
                    load: function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    },
                    forEach: function(S) {
                        var R, F, j;
                        for (R in this.files)
                            j = this.files[R],
                            (F = R.slice(this.root.length, R.length)) && R.slice(0, this.root.length) === this.root && S(F, j)
                    },
                    filter: function(S) {
                        var R = [];
                        return this.forEach(function(F, j) {
                            S(F, j) && R.push(j)
                        }),
                        R
                    },
                    file: function(S, R, F) {
                        if (arguments.length !== 1)
                            return S = this.root + S,
                            i.call(this, S, R, F),
                            this;
                        if (x(S)) {
                            var j = S;
                            return this.filter(function(Z, Q) {
                                return !Q.dir && j.test(Z)
                            })
                        }
                        var I = this.files[this.root + S];
                        return I && !I.dir ? I : null
                    },
                    folder: function(S) {
                        if (!S)
                            return this;
                        if (x(S))
                            return this.filter(function(I, Z) {
                                return Z.dir && S.test(I)
                            });
                        var R = this.root + S
                          , F = b.call(this, R)
                          , j = this.clone();
                        return j.root = F.name,
                        j
                    },
                    remove: function(S) {
                        S = this.root + S;
                        var R = this.files[S];
                        if (R || (S.slice(-1) !== "/" && (S += "/"),
                        R = this.files[S]),
                        R && !R.dir)
                            delete this.files[S];
                        else
                            for (var F = this.filter(function(I, Z) {
                                return Z.name.slice(0, S.length) === S
                            }), j = 0; j < F.length; j++)
                                delete this.files[F[j].name];
                        return this
                    },
                    generate: function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    },
                    generateInternalStream: function(S) {
                        var R, F = {};
                        try {
                            if ((F = a.extend(S || {}, {
                                streamFiles: !1,
                                compression: "STORE",
                                compressionOptions: null,
                                type: "",
                                platform: "DOS",
                                comment: null,
                                mimeType: "application/zip",
                                encodeFileName: o.utf8encode
                            })).type = F.type.toLowerCase(),
                            F.compression = F.compression.toUpperCase(),
                            F.type === "binarystring" && (F.type = "string"),
                            !F.type)
                                throw new Error("No output type specified.");
                            a.checkSupport(F.type),
                            F.platform !== "darwin" && F.platform !== "freebsd" && F.platform !== "linux" && F.platform !== "sunos" || (F.platform = "UNIX"),
                            F.platform === "win32" && (F.platform = "DOS");
                            var j = F.comment || this.comment || "";
                            R = d.generateWorker(this, F, j)
                        } catch (I) {
                            (R = new f("error")).error(I)
                        }
                        return new _(R,F.type || "string",F.mimeType)
                    },
                    generateAsync: function(S, R) {
                        return this.generateInternalStream(S).accumulate(R)
                    },
                    generateNodeStream: function(S, R) {
                        return (S = S || {}).type || (S.type = "nodebuffer"),
                        this.generateInternalStream(S).toNodejsStream(R)
                    }
                };
                s.exports = T
            }
            , {
                "./compressedObject": 2,
                "./defaults": 5,
                "./generate": 9,
                "./nodejs/NodejsStreamInputAdapter": 12,
                "./nodejsUtils": 14,
                "./stream/GenericWorker": 28,
                "./stream/StreamHelper": 29,
                "./utf8": 31,
                "./utils": 32,
                "./zipObject": 35
            }],
            16: [function(e, s, h) {
                s.exports = e("stream")
            }
            , {
                stream: void 0
            }],
            17: [function(e, s, h) {
                var i = e("./DataReader");
                function o(a) {
                    i.call(this, a);
                    for (var f = 0; f < this.data.length; f++)
                        a[f] = 255 & a[f]
                }
                e("../utils").inherits(o, i),
                o.prototype.byteAt = function(a) {
                    return this.data[this.zero + a]
                }
                ,
                o.prototype.lastIndexOfSignature = function(a) {
                    for (var f = a.charCodeAt(0), _ = a.charCodeAt(1), E = a.charCodeAt(2), y = a.charCodeAt(3), w = this.length - 4; 0 <= w; --w)
                        if (this.data[w] === f && this.data[w + 1] === _ && this.data[w + 2] === E && this.data[w + 3] === y)
                            return w - this.zero;
                    return -1
                }
                ,
                o.prototype.readAndCheckSignature = function(a) {
                    var f = a.charCodeAt(0)
                      , _ = a.charCodeAt(1)
                      , E = a.charCodeAt(2)
                      , y = a.charCodeAt(3)
                      , w = this.readData(4);
                    return f === w[0] && _ === w[1] && E === w[2] && y === w[3]
                }
                ,
                o.prototype.readData = function(a) {
                    if (this.checkOffset(a),
                    a === 0)
                        return [];
                    var f = this.data.slice(this.zero + this.index, this.zero + this.index + a);
                    return this.index += a,
                    f
                }
                ,
                s.exports = o
            }
            , {
                "../utils": 32,
                "./DataReader": 18
            }],
            18: [function(e, s, h) {
                var i = e("../utils");
                function o(a) {
                    this.data = a,
                    this.length = a.length,
                    this.index = 0,
                    this.zero = 0
                }
                o.prototype = {
                    checkOffset: function(a) {
                        this.checkIndex(this.index + a)
                    },
                    checkIndex: function(a) {
                        if (this.length < this.zero + a || a < 0)
                            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?")
                    },
                    setIndex: function(a) {
                        this.checkIndex(a),
                        this.index = a
                    },
                    skip: function(a) {
                        this.setIndex(this.index + a)
                    },
                    byteAt: function() {},
                    readInt: function(a) {
                        var f, _ = 0;
                        for (this.checkOffset(a),
                        f = this.index + a - 1; f >= this.index; f--)
                            _ = (_ << 8) + this.byteAt(f);
                        return this.index += a,
                        _
                    },
                    readString: function(a) {
                        return i.transformTo("string", this.readData(a))
                    },
                    readData: function() {},
                    lastIndexOfSignature: function() {},
                    readAndCheckSignature: function() {},
                    readDate: function() {
                        var a = this.readInt(4);
                        return new Date(Date.UTC(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1))
                    }
                },
                s.exports = o
            }
            , {
                "../utils": 32
            }],
            19: [function(e, s, h) {
                var i = e("./Uint8ArrayReader");
                function o(a) {
                    i.call(this, a)
                }
                e("../utils").inherits(o, i),
                o.prototype.readData = function(a) {
                    this.checkOffset(a);
                    var f = this.data.slice(this.zero + this.index, this.zero + this.index + a);
                    return this.index += a,
                    f
                }
                ,
                s.exports = o
            }
            , {
                "../utils": 32,
                "./Uint8ArrayReader": 21
            }],
            20: [function(e, s, h) {
                var i = e("./DataReader");
                function o(a) {
                    i.call(this, a)
                }
                e("../utils").inherits(o, i),
                o.prototype.byteAt = function(a) {
                    return this.data.charCodeAt(this.zero + a)
                }
                ,
                o.prototype.lastIndexOfSignature = function(a) {
                    return this.data.lastIndexOf(a) - this.zero
                }
                ,
                o.prototype.readAndCheckSignature = function(a) {
                    return a === this.readData(4)
                }
                ,
                o.prototype.readData = function(a) {
                    this.checkOffset(a);
                    var f = this.data.slice(this.zero + this.index, this.zero + this.index + a);
                    return this.index += a,
                    f
                }
                ,
                s.exports = o
            }
            , {
                "../utils": 32,
                "./DataReader": 18
            }],
            21: [function(e, s, h) {
                var i = e("./ArrayReader");
                function o(a) {
                    i.call(this, a)
                }
                e("../utils").inherits(o, i),
                o.prototype.readData = function(a) {
                    if (this.checkOffset(a),
                    a === 0)
                        return new Uint8Array(0);
                    var f = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
                    return this.index += a,
                    f
                }
                ,
                s.exports = o
            }
            , {
                "../utils": 32,
                "./ArrayReader": 17
            }],
            22: [function(e, s, h) {
                var i = e("../utils")
                  , o = e("../support")
                  , a = e("./ArrayReader")
                  , f = e("./StringReader")
                  , _ = e("./NodeBufferReader")
                  , E = e("./Uint8ArrayReader");
                s.exports = function(y) {
                    var w = i.getTypeOf(y);
                    return i.checkSupport(w),
                    w !== "string" || o.uint8array ? w === "nodebuffer" ? new _(y) : o.uint8array ? new E(i.transformTo("uint8array", y)) : new a(i.transformTo("array", y)) : new f(y)
                }
            }
            , {
                "../support": 30,
                "../utils": 32,
                "./ArrayReader": 17,
                "./NodeBufferReader": 19,
                "./StringReader": 20,
                "./Uint8ArrayReader": 21
            }],
            23: [function(e, s, h) {
                h.LOCAL_FILE_HEADER = "PK",
                h.CENTRAL_FILE_HEADER = "PK",
                h.CENTRAL_DIRECTORY_END = "PK",
                h.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07",
                h.ZIP64_CENTRAL_DIRECTORY_END = "PK",
                h.DATA_DESCRIPTOR = "PK\x07\b"
            }
            , {}],
            24: [function(e, s, h) {
                var i = e("./GenericWorker")
                  , o = e("../utils");
                function a(f) {
                    i.call(this, "ConvertWorker to " + f),
                    this.destType = f
                }
                o.inherits(a, i),
                a.prototype.processChunk = function(f) {
                    this.push({
                        data: o.transformTo(this.destType, f.data),
                        meta: f.meta
                    })
                }
                ,
                s.exports = a
            }
            , {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            25: [function(e, s, h) {
                var i = e("./GenericWorker")
                  , o = e("../crc32");
                function a() {
                    i.call(this, "Crc32Probe"),
                    this.withStreamInfo("crc32", 0)
                }
                e("../utils").inherits(a, i),
                a.prototype.processChunk = function(f) {
                    this.streamInfo.crc32 = o(f.data, this.streamInfo.crc32 || 0),
                    this.push(f)
                }
                ,
                s.exports = a
            }
            , {
                "../crc32": 4,
                "../utils": 32,
                "./GenericWorker": 28
            }],
            26: [function(e, s, h) {
                var i = e("../utils")
                  , o = e("./GenericWorker");
                function a(f) {
                    o.call(this, "DataLengthProbe for " + f),
                    this.propName = f,
                    this.withStreamInfo(f, 0)
                }
                i.inherits(a, o),
                a.prototype.processChunk = function(f) {
                    if (f) {
                        var _ = this.streamInfo[this.propName] || 0;
                        this.streamInfo[this.propName] = _ + f.data.length
                    }
                    o.prototype.processChunk.call(this, f)
                }
                ,
                s.exports = a
            }
            , {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            27: [function(e, s, h) {
                var i = e("../utils")
                  , o = e("./GenericWorker");
                function a(f) {
                    o.call(this, "DataWorker");
                    var _ = this;
                    this.dataIsReady = !1,
                    this.index = 0,
                    this.max = 0,
                    this.data = null,
                    this.type = "",
                    this._tickScheduled = !1,
                    f.then(function(E) {
                        _.dataIsReady = !0,
                        _.data = E,
                        _.max = E && E.length || 0,
                        _.type = i.getTypeOf(E),
                        _.isPaused || _._tickAndRepeat()
                    }, function(E) {
                        _.error(E)
                    })
                }
                i.inherits(a, o),
                a.prototype.cleanUp = function() {
                    o.prototype.cleanUp.call(this),
                    this.data = null
                }
                ,
                a.prototype.resume = function() {
                    return !!o.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0,
                    i.delay(this._tickAndRepeat, [], this)),
                    !0)
                }
                ,
                a.prototype._tickAndRepeat = function() {
                    this._tickScheduled = !1,
                    this.isPaused || this.isFinished || (this._tick(),
                    this.isFinished || (i.delay(this._tickAndRepeat, [], this),
                    this._tickScheduled = !0))
                }
                ,
                a.prototype._tick = function() {
                    if (this.isPaused || this.isFinished)
                        return !1;
                    var f = null
                      , _ = Math.min(this.max, this.index + 16384);
                    if (this.index >= this.max)
                        return this.end();
                    switch (this.type) {
                    case "string":
                        f = this.data.substring(this.index, _);
                        break;
                    case "uint8array":
                        f = this.data.subarray(this.index, _);
                        break;
                    case "array":
                    case "nodebuffer":
                        f = this.data.slice(this.index, _)
                    }
                    return this.index = _,
                    this.push({
                        data: f,
                        meta: {
                            percent: this.max ? this.index / this.max * 100 : 0
                        }
                    })
                }
                ,
                s.exports = a
            }
            , {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            28: [function(e, s, h) {
                function i(o) {
                    this.name = o || "default",
                    this.streamInfo = {},
                    this.generatedError = null,
                    this.extraStreamInfo = {},
                    this.isPaused = !0,
                    this.isFinished = !1,
                    this.isLocked = !1,
                    this._listeners = {
                        data: [],
                        end: [],
                        error: []
                    },
                    this.previous = null
                }
                i.prototype = {
                    push: function(o) {
                        this.emit("data", o)
                    },
                    end: function() {
                        if (this.isFinished)
                            return !1;
                        this.flush();
                        try {
                            this.emit("end"),
                            this.cleanUp(),
                            this.isFinished = !0
                        } catch (o) {
                            this.emit("error", o)
                        }
                        return !0
                    },
                    error: function(o) {
                        return !this.isFinished && (this.isPaused ? this.generatedError = o : (this.isFinished = !0,
                        this.emit("error", o),
                        this.previous && this.previous.error(o),
                        this.cleanUp()),
                        !0)
                    },
                    on: function(o, a) {
                        return this._listeners[o].push(a),
                        this
                    },
                    cleanUp: function() {
                        this.streamInfo = this.generatedError = this.extraStreamInfo = null,
                        this._listeners = []
                    },
                    emit: function(o, a) {
                        if (this._listeners[o])
                            for (var f = 0; f < this._listeners[o].length; f++)
                                this._listeners[o][f].call(this, a)
                    },
                    pipe: function(o) {
                        return o.registerPrevious(this)
                    },
                    registerPrevious: function(o) {
                        if (this.isLocked)
                            throw new Error("The stream '" + this + "' has already been used.");
                        this.streamInfo = o.streamInfo,
                        this.mergeStreamInfo(),
                        this.previous = o;
                        var a = this;
                        return o.on("data", function(f) {
                            a.processChunk(f)
                        }),
                        o.on("end", function() {
                            a.end()
                        }),
                        o.on("error", function(f) {
                            a.error(f)
                        }),
                        this
                    },
                    pause: function() {
                        return !this.isPaused && !this.isFinished && (this.isPaused = !0,
                        this.previous && this.previous.pause(),
                        !0)
                    },
                    resume: function() {
                        if (!this.isPaused || this.isFinished)
                            return !1;
                        var o = this.isPaused = !1;
                        return this.generatedError && (this.error(this.generatedError),
                        o = !0),
                        this.previous && this.previous.resume(),
                        !o
                    },
                    flush: function() {},
                    processChunk: function(o) {
                        this.push(o)
                    },
                    withStreamInfo: function(o, a) {
                        return this.extraStreamInfo[o] = a,
                        this.mergeStreamInfo(),
                        this
                    },
                    mergeStreamInfo: function() {
                        for (var o in this.extraStreamInfo)
                            Object.prototype.hasOwnProperty.call(this.extraStreamInfo, o) && (this.streamInfo[o] = this.extraStreamInfo[o])
                    },
                    lock: function() {
                        if (this.isLocked)
                            throw new Error("The stream '" + this + "' has already been used.");
                        this.isLocked = !0,
                        this.previous && this.previous.lock()
                    },
                    toString: function() {
                        var o = "Worker " + this.name;
                        return this.previous ? this.previous + " -> " + o : o
                    }
                },
                s.exports = i
            }
            , {}],
            29: [function(e, s, h) {
                var i = e("../utils")
                  , o = e("./ConvertWorker")
                  , a = e("./GenericWorker")
                  , f = e("../base64")
                  , _ = e("../support")
                  , E = e("../external")
                  , y = null;
                if (_.nodestream)
                    try {
                        y = e("../nodejs/NodejsStreamOutputAdapter")
                    } catch (v) {}
                function w(v, l) {
                    return new E.Promise(function(m, c) {
                        var b = []
                          , x = v._internalType
                          , T = v._outputType
                          , S = v._mimeType;
                        v.on("data", function(R, F) {
                            b.push(R),
                            l && l(F)
                        }).on("error", function(R) {
                            b = [],
                            c(R)
                        }).on("end", function() {
                            try {
                                var R = function(F, j, I) {
                                    switch (F) {
                                    case "blob":
                                        return i.newBlob(i.transformTo("arraybuffer", j), I);
                                    case "base64":
                                        return f.encode(j);
                                    default:
                                        return i.transformTo(F, j)
                                    }
                                }(T, function(F, j) {
                                    var I, Z = 0, Q = null, k = 0;
                                    for (I = 0; I < j.length; I++)
                                        k += j[I].length;
                                    switch (F) {
                                    case "string":
                                        return j.join("");
                                    case "array":
                                        return Array.prototype.concat.apply([], j);
                                    case "uint8array":
                                        for (Q = new Uint8Array(k),
                                        I = 0; I < j.length; I++)
                                            Q.set(j[I], Z),
                                            Z += j[I].length;
                                        return Q;
                                    case "nodebuffer":
                                        return Buffer.concat(j);
                                    default:
                                        throw new Error("concat : unsupported type '" + F + "'")
                                    }
                                }(x, b), S);
                                m(R)
                            } catch (F) {
                                c(F)
                            }
                            b = []
                        }).resume()
                    }
                    )
                }
                function d(v, l, m) {
                    var c = l;
                    switch (l) {
                    case "blob":
                    case "arraybuffer":
                        c = "uint8array";
                        break;
                    case "base64":
                        c = "string"
                    }
                    try {
                        this._internalType = c,
                        this._outputType = l,
                        this._mimeType = m,
                        i.checkSupport(c),
                        this._worker = v.pipe(new o(c)),
                        v.lock()
                    } catch (b) {
                        this._worker = new a("error"),
                        this._worker.error(b)
                    }
                }
                d.prototype = {
                    accumulate: function(v) {
                        return w(this, v)
                    },
                    on: function(v, l) {
                        var m = this;
                        return v === "data" ? this._worker.on(v, function(c) {
                            l.call(m, c.data, c.meta)
                        }) : this._worker.on(v, function() {
                            i.delay(l, arguments, m)
                        }),
                        this
                    },
                    resume: function() {
                        return i.delay(this._worker.resume, [], this._worker),
                        this
                    },
                    pause: function() {
                        return this._worker.pause(),
                        this
                    },
                    toNodejsStream: function(v) {
                        if (i.checkSupport("nodestream"),
                        this._outputType !== "nodebuffer")
                            throw new Error(this._outputType + " is not supported by this method");
                        return new y(this,{
                            objectMode: this._outputType !== "nodebuffer"
                        },v)
                    }
                },
                s.exports = d
            }
            , {
                "../base64": 1,
                "../external": 6,
                "../nodejs/NodejsStreamOutputAdapter": 13,
                "../support": 30,
                "../utils": 32,
                "./ConvertWorker": 24,
                "./GenericWorker": 28
            }],
            30: [function(e, s, h) {
                if (h.base64 = !0,
                h.array = !0,
                h.string = !0,
                h.arraybuffer = typeof ArrayBuffer != "undefined" && typeof Uint8Array != "undefined",
                h.nodebuffer = typeof Buffer != "undefined",
                h.uint8array = typeof Uint8Array != "undefined",
                typeof ArrayBuffer == "undefined")
                    h.blob = !1;
                else {
                    var i = new ArrayBuffer(0);
                    try {
                        h.blob = new Blob([i],{
                            type: "application/zip"
                        }).size === 0
                    } catch (a) {
                        try {
                            var o = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                            o.append(i),
                            h.blob = o.getBlob("application/zip").size === 0
                        } catch (f) {
                            h.blob = !1
                        }
                    }
                }
                try {
                    h.nodestream = !!e("readable-stream").Readable
                } catch (a) {
                    h.nodestream = !1
                }
            }
            , {
                "readable-stream": 16
            }],
            31: [function(e, s, h) {
                for (var i = e("./utils"), o = e("./support"), a = e("./nodejsUtils"), f = e("./stream/GenericWorker"), _ = new Array(256), E = 0; E < 256; E++)
                    _[E] = 252 <= E ? 6 : 248 <= E ? 5 : 240 <= E ? 4 : 224 <= E ? 3 : 192 <= E ? 2 : 1;
                _[254] = _[254] = 1;
                function y() {
                    f.call(this, "utf-8 decode"),
                    this.leftOver = null
                }
                function w() {
                    f.call(this, "utf-8 encode")
                }
                h.utf8encode = function(d) {
                    return o.nodebuffer ? a.newBufferFrom(d, "utf-8") : function(v) {
                        var l, m, c, b, x, T = v.length, S = 0;
                        for (b = 0; b < T; b++)
                            (64512 & (m = v.charCodeAt(b))) == 55296 && b + 1 < T && (64512 & (c = v.charCodeAt(b + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (c - 56320),
                            b++),
                            S += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
                        for (l = o.uint8array ? new Uint8Array(S) : new Array(S),
                        b = x = 0; x < S; b++)
                            (64512 & (m = v.charCodeAt(b))) == 55296 && b + 1 < T && (64512 & (c = v.charCodeAt(b + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (c - 56320),
                            b++),
                            m < 128 ? l[x++] = m : (m < 2048 ? l[x++] = 192 | m >>> 6 : (m < 65536 ? l[x++] = 224 | m >>> 12 : (l[x++] = 240 | m >>> 18,
                            l[x++] = 128 | m >>> 12 & 63),
                            l[x++] = 128 | m >>> 6 & 63),
                            l[x++] = 128 | 63 & m);
                        return l
                    }(d)
                }
                ,
                h.utf8decode = function(d) {
                    return o.nodebuffer ? i.transformTo("nodebuffer", d).toString("utf-8") : function(v) {
                        var l, m, c, b, x = v.length, T = new Array(2 * x);
                        for (l = m = 0; l < x; )
                            if ((c = v[l++]) < 128)
                                T[m++] = c;
                            else if (4 < (b = _[c]))
                                T[m++] = 65533,
                                l += b - 1;
                            else {
                                for (c &= b === 2 ? 31 : b === 3 ? 15 : 7; 1 < b && l < x; )
                                    c = c << 6 | 63 & v[l++],
                                    b--;
                                1 < b ? T[m++] = 65533 : c < 65536 ? T[m++] = c : (c -= 65536,
                                T[m++] = 55296 | c >> 10 & 1023,
                                T[m++] = 56320 | 1023 & c)
                            }
                        return T.length !== m && (T.subarray ? T = T.subarray(0, m) : T.length = m),
                        i.applyFromCharCode(T)
                    }(d = i.transformTo(o.uint8array ? "uint8array" : "array", d))
                }
                ,
                i.inherits(y, f),
                y.prototype.processChunk = function(d) {
                    var v = i.transformTo(o.uint8array ? "uint8array" : "array", d.data);
                    if (this.leftOver && this.leftOver.length) {
                        if (o.uint8array) {
                            var l = v;
                            (v = new Uint8Array(l.length + this.leftOver.length)).set(this.leftOver, 0),
                            v.set(l, this.leftOver.length)
                        } else
                            v = this.leftOver.concat(v);
                        this.leftOver = null
                    }
                    var m = function(b, x) {
                        var T;
                        for ((x = x || b.length) > b.length && (x = b.length),
                        T = x - 1; 0 <= T && (192 & b[T]) == 128; )
                            T--;
                        return T < 0 || T === 0 ? x : T + _[b[T]] > x ? T : x
                    }(v)
                      , c = v;
                    m !== v.length && (o.uint8array ? (c = v.subarray(0, m),
                    this.leftOver = v.subarray(m, v.length)) : (c = v.slice(0, m),
                    this.leftOver = v.slice(m, v.length))),
                    this.push({
                        data: h.utf8decode(c),
                        meta: d.meta
                    })
                }
                ,
                y.prototype.flush = function() {
                    this.leftOver && this.leftOver.length && (this.push({
                        data: h.utf8decode(this.leftOver),
                        meta: {}
                    }),
                    this.leftOver = null)
                }
                ,
                h.Utf8DecodeWorker = y,
                i.inherits(w, f),
                w.prototype.processChunk = function(d) {
                    this.push({
                        data: h.utf8encode(d.data),
                        meta: d.meta
                    })
                }
                ,
                h.Utf8EncodeWorker = w
            }
            , {
                "./nodejsUtils": 14,
                "./stream/GenericWorker": 28,
                "./support": 30,
                "./utils": 32
            }],
            32: [function(e, s, h) {
                var i = e("./support")
                  , o = e("./base64")
                  , a = e("./nodejsUtils")
                  , f = e("./external");
                function _(l) {
                    return l
                }
                function E(l, m) {
                    for (var c = 0; c < l.length; ++c)
                        m[c] = 255 & l.charCodeAt(c);
                    return m
                }
                e("setimmediate"),
                h.newBlob = function(l, m) {
                    h.checkSupport("blob");
                    try {
                        return new Blob([l],{
                            type: m
                        })
                    } catch (b) {
                        try {
                            var c = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                            return c.append(l),
                            c.getBlob(m)
                        } catch (x) {
                            throw new Error("Bug : can't construct the Blob.")
                        }
                    }
                }
                ;
                var y = {
                    stringifyByChunk: function(l, m, c) {
                        var b = []
                          , x = 0
                          , T = l.length;
                        if (T <= c)
                            return String.fromCharCode.apply(null, l);
                        for (; x < T; )
                            m === "array" || m === "nodebuffer" ? b.push(String.fromCharCode.apply(null, l.slice(x, Math.min(x + c, T)))) : b.push(String.fromCharCode.apply(null, l.subarray(x, Math.min(x + c, T)))),
                            x += c;
                        return b.join("")
                    },
                    stringifyByChar: function(l) {
                        for (var m = "", c = 0; c < l.length; c++)
                            m += String.fromCharCode(l[c]);
                        return m
                    },
                    applyCanBeUsed: {
                        uint8array: function() {
                            try {
                                return i.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1
                            } catch (l) {
                                return !1
                            }
                        }(),
                        nodebuffer: function() {
                            try {
                                return i.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1
                            } catch (l) {
                                return !1
                            }
                        }()
                    }
                };
                function w(l) {
                    var m = 65536
                      , c = h.getTypeOf(l)
                      , b = !0;
                    if (c === "uint8array" ? b = y.applyCanBeUsed.uint8array : c === "nodebuffer" && (b = y.applyCanBeUsed.nodebuffer),
                    b)
                        for (; 1 < m; )
                            try {
                                return y.stringifyByChunk(l, c, m)
                            } catch (x) {
                                m = Math.floor(m / 2)
                            }
                    return y.stringifyByChar(l)
                }
                function d(l, m) {
                    for (var c = 0; c < l.length; c++)
                        m[c] = l[c];
                    return m
                }
                h.applyFromCharCode = w;
                var v = {};
                v.string = {
                    string: _,
                    array: function(l) {
                        return E(l, new Array(l.length))
                    },
                    arraybuffer: function(l) {
                        return v.string.uint8array(l).buffer
                    },
                    uint8array: function(l) {
                        return E(l, new Uint8Array(l.length))
                    },
                    nodebuffer: function(l) {
                        return E(l, a.allocBuffer(l.length))
                    }
                },
                v.array = {
                    string: w,
                    array: _,
                    arraybuffer: function(l) {
                        return new Uint8Array(l).buffer
                    },
                    uint8array: function(l) {
                        return new Uint8Array(l)
                    },
                    nodebuffer: function(l) {
                        return a.newBufferFrom(l)
                    }
                },
                v.arraybuffer = {
                    string: function(l) {
                        return w(new Uint8Array(l))
                    },
                    array: function(l) {
                        return d(new Uint8Array(l), new Array(l.byteLength))
                    },
                    arraybuffer: _,
                    uint8array: function(l) {
                        return new Uint8Array(l)
                    },
                    nodebuffer: function(l) {
                        return a.newBufferFrom(new Uint8Array(l))
                    }
                },
                v.uint8array = {
                    string: w,
                    array: function(l) {
                        return d(l, new Array(l.length))
                    },
                    arraybuffer: function(l) {
                        return l.buffer
                    },
                    uint8array: _,
                    nodebuffer: function(l) {
                        return a.newBufferFrom(l)
                    }
                },
                v.nodebuffer = {
                    string: w,
                    array: function(l) {
                        return d(l, new Array(l.length))
                    },
                    arraybuffer: function(l) {
                        return v.nodebuffer.uint8array(l).buffer
                    },
                    uint8array: function(l) {
                        return d(l, new Uint8Array(l.length))
                    },
                    nodebuffer: _
                },
                h.transformTo = function(l, m) {
                    if (m = m || "",
                    !l)
                        return m;
                    h.checkSupport(l);
                    var c = h.getTypeOf(m);
                    return v[c][l](m)
                }
                ,
                h.resolve = function(l) {
                    for (var m = l.split("/"), c = [], b = 0; b < m.length; b++) {
                        var x = m[b];
                        x === "." || x === "" && b !== 0 && b !== m.length - 1 || (x === ".." ? c.pop() : c.push(x))
                    }
                    return c.join("/")
                }
                ,
                h.getTypeOf = function(l) {
                    return typeof l == "string" ? "string" : Object.prototype.toString.call(l) === "[object Array]" ? "array" : i.nodebuffer && a.isBuffer(l) ? "nodebuffer" : i.uint8array && l instanceof Uint8Array ? "uint8array" : i.arraybuffer && l instanceof ArrayBuffer ? "arraybuffer" : void 0
                }
                ,
                h.checkSupport = function(l) {
                    if (!i[l.toLowerCase()])
                        throw new Error(l + " is not supported by this platform")
                }
                ,
                h.MAX_VALUE_16BITS = 65535,
                h.MAX_VALUE_32BITS = -1,
                h.pretty = function(l) {
                    var m, c, b = "";
                    for (c = 0; c < (l || "").length; c++)
                        b += "\\x" + ((m = l.charCodeAt(c)) < 16 ? "0" : "") + m.toString(16).toUpperCase();
                    return b
                }
                ,
                h.delay = function(l, m, c) {
                    setImmediate(function() {
                        l.apply(c || null, m || [])
                    })
                }
                ,
                h.inherits = function(l, m) {
                    function c() {}
                    c.prototype = m.prototype,
                    l.prototype = new c
                }
                ,
                h.extend = function() {
                    var l, m, c = {};
                    for (l = 0; l < arguments.length; l++)
                        for (m in arguments[l])
                            Object.prototype.hasOwnProperty.call(arguments[l], m) && c[m] === void 0 && (c[m] = arguments[l][m]);
                    return c
                }
                ,
                h.prepareContent = function(l, m, c, b, x) {
                    return f.Promise.resolve(m).then(function(T) {
                        return i.blob && (T instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(T)) !== -1) && typeof FileReader != "undefined" ? new f.Promise(function(S, R) {
                            var F = new FileReader;
                            F.onload = function(j) {
                                S(j.target.result)
                            }
                            ,
                            F.onerror = function(j) {
                                R(j.target.error)
                            }
                            ,
                            F.readAsArrayBuffer(T)
                        }
                        ) : T
                    }).then(function(T) {
                        var S = h.getTypeOf(T);
                        return S ? (S === "arraybuffer" ? T = h.transformTo("uint8array", T) : S === "string" && (x ? T = o.decode(T) : c && b !== !0 && (T = function(R) {
                            return E(R, i.uint8array ? new Uint8Array(R.length) : new Array(R.length))
                        }(T))),
                        T) : f.Promise.reject(new Error("Can't read the data of '" + l + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
                    })
                }
            }
            , {
                "./base64": 1,
                "./external": 6,
                "./nodejsUtils": 14,
                "./support": 30,
                setimmediate: 54
            }],
            33: [function(e, s, h) {
                var i = e("./reader/readerFor")
                  , o = e("./utils")
                  , a = e("./signature")
                  , f = e("./zipEntry")
                  , _ = e("./support");
                function E(y) {
                    this.files = [],
                    this.loadOptions = y
                }
                E.prototype = {
                    checkSignature: function(y) {
                        if (!this.reader.readAndCheckSignature(y)) {
                            this.reader.index -= 4;
                            var w = this.reader.readString(4);
                            throw new Error("Corrupted zip or bug: unexpected signature (" + o.pretty(w) + ", expected " + o.pretty(y) + ")")
                        }
                    },
                    isSignature: function(y, w) {
                        var d = this.reader.index;
                        this.reader.setIndex(y);
                        var v = this.reader.readString(4) === w;
                        return this.reader.setIndex(d),
                        v
                    },
                    readBlockEndOfCentral: function() {
                        this.diskNumber = this.reader.readInt(2),
                        this.diskWithCentralDirStart = this.reader.readInt(2),
                        this.centralDirRecordsOnThisDisk = this.reader.readInt(2),
                        this.centralDirRecords = this.reader.readInt(2),
                        this.centralDirSize = this.reader.readInt(4),
                        this.centralDirOffset = this.reader.readInt(4),
                        this.zipCommentLength = this.reader.readInt(2);
                        var y = this.reader.readData(this.zipCommentLength)
                          , w = _.uint8array ? "uint8array" : "array"
                          , d = o.transformTo(w, y);
                        this.zipComment = this.loadOptions.decodeFileName(d)
                    },
                    readBlockZip64EndOfCentral: function() {
                        this.zip64EndOfCentralSize = this.reader.readInt(8),
                        this.reader.skip(4),
                        this.diskNumber = this.reader.readInt(4),
                        this.diskWithCentralDirStart = this.reader.readInt(4),
                        this.centralDirRecordsOnThisDisk = this.reader.readInt(8),
                        this.centralDirRecords = this.reader.readInt(8),
                        this.centralDirSize = this.reader.readInt(8),
                        this.centralDirOffset = this.reader.readInt(8),
                        this.zip64ExtensibleData = {};
                        for (var y, w, d, v = this.zip64EndOfCentralSize - 44; 0 < v; )
                            y = this.reader.readInt(2),
                            w = this.reader.readInt(4),
                            d = this.reader.readData(w),
                            this.zip64ExtensibleData[y] = {
                                id: y,
                                length: w,
                                value: d
                            }
                    },
                    readBlockZip64EndOfCentralLocator: function() {
                        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4),
                        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8),
                        this.disksCount = this.reader.readInt(4),
                        1 < this.disksCount)
                            throw new Error("Multi-volumes zip are not supported")
                    },
                    readLocalFiles: function() {
                        var y, w;
                        for (y = 0; y < this.files.length; y++)
                            w = this.files[y],
                            this.reader.setIndex(w.localHeaderOffset),
                            this.checkSignature(a.LOCAL_FILE_HEADER),
                            w.readLocalPart(this.reader),
                            w.handleUTF8(),
                            w.processAttributes()
                    },
                    readCentralDir: function() {
                        var y;
                        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER); )
                            (y = new f({
                                zip64: this.zip64
                            },this.loadOptions)).readCentralPart(this.reader),
                            this.files.push(y);
                        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
                            throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
                    },
                    readEndOfCentral: function() {
                        var y = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
                        if (y < 0)
                            throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                        this.reader.setIndex(y);
                        var w = y;
                        if (this.checkSignature(a.CENTRAL_DIRECTORY_END),
                        this.readBlockEndOfCentral(),
                        this.diskNumber === o.MAX_VALUE_16BITS || this.diskWithCentralDirStart === o.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === o.MAX_VALUE_16BITS || this.centralDirRecords === o.MAX_VALUE_16BITS || this.centralDirSize === o.MAX_VALUE_32BITS || this.centralDirOffset === o.MAX_VALUE_32BITS) {
                            if (this.zip64 = !0,
                            (y = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
                                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                            if (this.reader.setIndex(y),
                            this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
                            this.readBlockZip64EndOfCentralLocator(),
                            !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),
                            this.relativeOffsetEndOfZip64CentralDir < 0))
                                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
                            this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),
                            this.readBlockZip64EndOfCentral()
                        }
                        var d = this.centralDirOffset + this.centralDirSize;
                        this.zip64 && (d += 20,
                        d += 12 + this.zip64EndOfCentralSize);
                        var v = w - d;
                        if (0 < v)
                            this.isSignature(w, a.CENTRAL_FILE_HEADER) || (this.reader.zero = v);
                        else if (v < 0)
                            throw new Error("Corrupted zip: missing " + Math.abs(v) + " bytes.")
                    },
                    prepareReader: function(y) {
                        this.reader = i(y)
                    },
                    load: function(y) {
                        this.prepareReader(y),
                        this.readEndOfCentral(),
                        this.readCentralDir(),
                        this.readLocalFiles()
                    }
                },
                s.exports = E
            }
            , {
                "./reader/readerFor": 22,
                "./signature": 23,
                "./support": 30,
                "./utils": 32,
                "./zipEntry": 34
            }],
            34: [function(e, s, h) {
                var i = e("./reader/readerFor")
                  , o = e("./utils")
                  , a = e("./compressedObject")
                  , f = e("./crc32")
                  , _ = e("./utf8")
                  , E = e("./compressions")
                  , y = e("./support");
                function w(d, v) {
                    this.options = d,
                    this.loadOptions = v
                }
                w.prototype = {
                    isEncrypted: function() {
                        return (1 & this.bitFlag) == 1
                    },
                    useUTF8: function() {
                        return (2048 & this.bitFlag) == 2048
                    },
                    readLocalPart: function(d) {
                        var v, l;
                        if (d.skip(22),
                        this.fileNameLength = d.readInt(2),
                        l = d.readInt(2),
                        this.fileName = d.readData(this.fileNameLength),
                        d.skip(l),
                        this.compressedSize === -1 || this.uncompressedSize === -1)
                            throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                        if ((v = function(m) {
                            for (var c in E)
                                if (Object.prototype.hasOwnProperty.call(E, c) && E[c].magic === m)
                                    return E[c];
                            return null
                        }(this.compressionMethod)) === null)
                            throw new Error("Corrupted zip : compression " + o.pretty(this.compressionMethod) + " unknown (inner file : " + o.transformTo("string", this.fileName) + ")");
                        this.decompressed = new a(this.compressedSize,this.uncompressedSize,this.crc32,v,d.readData(this.compressedSize))
                    },
                    readCentralPart: function(d) {
                        this.versionMadeBy = d.readInt(2),
                        d.skip(2),
                        this.bitFlag = d.readInt(2),
                        this.compressionMethod = d.readString(2),
                        this.date = d.readDate(),
                        this.crc32 = d.readInt(4),
                        this.compressedSize = d.readInt(4),
                        this.uncompressedSize = d.readInt(4);
                        var v = d.readInt(2);
                        if (this.extraFieldsLength = d.readInt(2),
                        this.fileCommentLength = d.readInt(2),
                        this.diskNumberStart = d.readInt(2),
                        this.internalFileAttributes = d.readInt(2),
                        this.externalFileAttributes = d.readInt(4),
                        this.localHeaderOffset = d.readInt(4),
                        this.isEncrypted())
                            throw new Error("Encrypted zip are not supported");
                        d.skip(v),
                        this.readExtraFields(d),
                        this.parseZIP64ExtraField(d),
                        this.fileComment = d.readData(this.fileCommentLength)
                    },
                    processAttributes: function() {
                        this.unixPermissions = null,
                        this.dosPermissions = null;
                        var d = this.versionMadeBy >> 8;
                        this.dir = !!(16 & this.externalFileAttributes),
                        d == 0 && (this.dosPermissions = 63 & this.externalFileAttributes),
                        d == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535),
                        this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0)
                    },
                    parseZIP64ExtraField: function() {
                        if (this.extraFields[1]) {
                            var d = i(this.extraFields[1].value);
                            this.uncompressedSize === o.MAX_VALUE_32BITS && (this.uncompressedSize = d.readInt(8)),
                            this.compressedSize === o.MAX_VALUE_32BITS && (this.compressedSize = d.readInt(8)),
                            this.localHeaderOffset === o.MAX_VALUE_32BITS && (this.localHeaderOffset = d.readInt(8)),
                            this.diskNumberStart === o.MAX_VALUE_32BITS && (this.diskNumberStart = d.readInt(4))
                        }
                    },
                    readExtraFields: function(d) {
                        var v, l, m, c = d.index + this.extraFieldsLength;
                        for (this.extraFields || (this.extraFields = {}); d.index + 4 < c; )
                            v = d.readInt(2),
                            l = d.readInt(2),
                            m = d.readData(l),
                            this.extraFields[v] = {
                                id: v,
                                length: l,
                                value: m
                            };
                        d.setIndex(c)
                    },
                    handleUTF8: function() {
                        var d = y.uint8array ? "uint8array" : "array";
                        if (this.useUTF8())
                            this.fileNameStr = _.utf8decode(this.fileName),
                            this.fileCommentStr = _.utf8decode(this.fileComment);
                        else {
                            var v = this.findExtraFieldUnicodePath();
                            if (v !== null)
                                this.fileNameStr = v;
                            else {
                                var l = o.transformTo(d, this.fileName);
                                this.fileNameStr = this.loadOptions.decodeFileName(l)
                            }
                            var m = this.findExtraFieldUnicodeComment();
                            if (m !== null)
                                this.fileCommentStr = m;
                            else {
                                var c = o.transformTo(d, this.fileComment);
                                this.fileCommentStr = this.loadOptions.decodeFileName(c)
                            }
                        }
                    },
                    findExtraFieldUnicodePath: function() {
                        var d = this.extraFields[28789];
                        if (d) {
                            var v = i(d.value);
                            return v.readInt(1) !== 1 || f(this.fileName) !== v.readInt(4) ? null : _.utf8decode(v.readData(d.length - 5))
                        }
                        return null
                    },
                    findExtraFieldUnicodeComment: function() {
                        var d = this.extraFields[25461];
                        if (d) {
                            var v = i(d.value);
                            return v.readInt(1) !== 1 || f(this.fileComment) !== v.readInt(4) ? null : _.utf8decode(v.readData(d.length - 5))
                        }
                        return null
                    }
                },
                s.exports = w
            }
            , {
                "./compressedObject": 2,
                "./compressions": 3,
                "./crc32": 4,
                "./reader/readerFor": 22,
                "./support": 30,
                "./utf8": 31,
                "./utils": 32
            }],
            35: [function(e, s, h) {
                function i(v, l, m) {
                    this.name = v,
                    this.dir = m.dir,
                    this.date = m.date,
                    this.comment = m.comment,
                    this.unixPermissions = m.unixPermissions,
                    this.dosPermissions = m.dosPermissions,
                    this._data = l,
                    this._dataBinary = m.binary,
                    this.options = {
                        compression: m.compression,
                        compressionOptions: m.compressionOptions
                    }
                }
                var o = e("./stream/StreamHelper")
                  , a = e("./stream/DataWorker")
                  , f = e("./utf8")
                  , _ = e("./compressedObject")
                  , E = e("./stream/GenericWorker");
                i.prototype = {
                    internalStream: function(v) {
                        var l = null
                          , m = "string";
                        try {
                            if (!v)
                                throw new Error("No output type specified.");
                            var c = (m = v.toLowerCase()) === "string" || m === "text";
                            m !== "binarystring" && m !== "text" || (m = "string"),
                            l = this._decompressWorker();
                            var b = !this._dataBinary;
                            b && !c && (l = l.pipe(new f.Utf8EncodeWorker)),
                            !b && c && (l = l.pipe(new f.Utf8DecodeWorker))
                        } catch (x) {
                            (l = new E("error")).error(x)
                        }
                        return new o(l,m,"")
                    },
                    async: function(v, l) {
                        return this.internalStream(v).accumulate(l)
                    },
                    nodeStream: function(v, l) {
                        return this.internalStream(v || "nodebuffer").toNodejsStream(l)
                    },
                    _compressWorker: function(v, l) {
                        if (this._data instanceof _ && this._data.compression.magic === v.magic)
                            return this._data.getCompressedWorker();
                        var m = this._decompressWorker();
                        return this._dataBinary || (m = m.pipe(new f.Utf8EncodeWorker)),
                        _.createWorkerFrom(m, v, l)
                    },
                    _decompressWorker: function() {
                        return this._data instanceof _ ? this._data.getContentWorker() : this._data instanceof E ? this._data : new a(this._data)
                    }
                };
                for (var y = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], w = function() {
                    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                }, d = 0; d < y.length; d++)
                    i.prototype[y[d]] = w;
                s.exports = i
            }
            , {
                "./compressedObject": 2,
                "./stream/DataWorker": 27,
                "./stream/GenericWorker": 28,
                "./stream/StreamHelper": 29,
                "./utf8": 31
            }],
            36: [function(e, s, h) {
                (function(i) {
                    var o, a, f = i.MutationObserver || i.WebKitMutationObserver;
                    if (f) {
                        var _ = 0
                          , E = new f(v)
                          , y = i.document.createTextNode("");
                        E.observe(y, {
                            characterData: !0
                        }),
                        o = function() {
                            y.data = _ = ++_ % 2
                        }
                    } else if (i.setImmediate || i.MessageChannel === void 0)
                        o = "document"in i && "onreadystatechange"in i.document.createElement("script") ? function() {
                            var l = i.document.createElement("script");
                            l.onreadystatechange = function() {
                                v(),
                                l.onreadystatechange = null,
                                l.parentNode.removeChild(l),
                                l = null
                            }
                            ,
                            i.document.documentElement.appendChild(l)
                        }
                        : function() {
                            setTimeout(v, 0)
                        }
                        ;
                    else {
                        var w = new i.MessageChannel;
                        w.port1.onmessage = v,
                        o = function() {
                            w.port2.postMessage(0)
                        }
                    }
                    var d = [];
                    function v() {
                        var l, m;
                        a = !0;
                        for (var c = d.length; c; ) {
                            for (m = d,
                            d = [],
                            l = -1; ++l < c; )
                                m[l]();
                            c = d.length
                        }
                        a = !1
                    }
                    s.exports = function(l) {
                        d.push(l) !== 1 || a || o()
                    }
                }
                ).call(this, typeof Ot != "undefined" ? Ot : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {})
            }
            , {}],
            37: [function(e, s, h) {
                var i = e("immediate");
                function o() {}
                var a = {}
                  , f = ["REJECTED"]
                  , _ = ["FULFILLED"]
                  , E = ["PENDING"];
                function y(c) {
                    if (typeof c != "function")
                        throw new TypeError("resolver must be a function");
                    this.state = E,
                    this.queue = [],
                    this.outcome = void 0,
                    c !== o && l(this, c)
                }
                function w(c, b, x) {
                    this.promise = c,
                    typeof b == "function" && (this.onFulfilled = b,
                    this.callFulfilled = this.otherCallFulfilled),
                    typeof x == "function" && (this.onRejected = x,
                    this.callRejected = this.otherCallRejected)
                }
                function d(c, b, x) {
                    i(function() {
                        var T;
                        try {
                            T = b(x)
                        } catch (S) {
                            return a.reject(c, S)
                        }
                        T === c ? a.reject(c, new TypeError("Cannot resolve promise with itself")) : a.resolve(c, T)
                    })
                }
                function v(c) {
                    var b = c && c.then;
                    if (c && (typeof c == "object" || typeof c == "function") && typeof b == "function")
                        return function() {
                            b.apply(c, arguments)
                        }
                }
                function l(c, b) {
                    var x = !1;
                    function T(F) {
                        x || (x = !0,
                        a.reject(c, F))
                    }
                    function S(F) {
                        x || (x = !0,
                        a.resolve(c, F))
                    }
                    var R = m(function() {
                        b(S, T)
                    });
                    R.status === "error" && T(R.value)
                }
                function m(c, b) {
                    var x = {};
                    try {
                        x.value = c(b),
                        x.status = "success"
                    } catch (T) {
                        x.status = "error",
                        x.value = T
                    }
                    return x
                }
                (s.exports = y).prototype.finally = function(c) {
                    if (typeof c != "function")
                        return this;
                    var b = this.constructor;
                    return this.then(function(x) {
                        return b.resolve(c()).then(function() {
                            return x
                        })
                    }, function(x) {
                        return b.resolve(c()).then(function() {
                            throw x
                        })
                    })
                }
                ,
                y.prototype.catch = function(c) {
                    return this.then(null, c)
                }
                ,
                y.prototype.then = function(c, b) {
                    if (typeof c != "function" && this.state === _ || typeof b != "function" && this.state === f)
                        return this;
                    var x = new this.constructor(o);
                    return this.state !== E ? d(x, this.state === _ ? c : b, this.outcome) : this.queue.push(new w(x,c,b)),
                    x
                }
                ,
                w.prototype.callFulfilled = function(c) {
                    a.resolve(this.promise, c)
                }
                ,
                w.prototype.otherCallFulfilled = function(c) {
                    d(this.promise, this.onFulfilled, c)
                }
                ,
                w.prototype.callRejected = function(c) {
                    a.reject(this.promise, c)
                }
                ,
                w.prototype.otherCallRejected = function(c) {
                    d(this.promise, this.onRejected, c)
                }
                ,
                a.resolve = function(c, b) {
                    var x = m(v, b);
                    if (x.status === "error")
                        return a.reject(c, x.value);
                    var T = x.value;
                    if (T)
                        l(c, T);
                    else {
                        c.state = _,
                        c.outcome = b;
                        for (var S = -1, R = c.queue.length; ++S < R; )
                            c.queue[S].callFulfilled(b)
                    }
                    return c
                }
                ,
                a.reject = function(c, b) {
                    c.state = f,
                    c.outcome = b;
                    for (var x = -1, T = c.queue.length; ++x < T; )
                        c.queue[x].callRejected(b);
                    return c
                }
                ,
                y.resolve = function(c) {
                    return c instanceof this ? c : a.resolve(new this(o), c)
                }
                ,
                y.reject = function(c) {
                    var b = new this(o);
                    return a.reject(b, c)
                }
                ,
                y.all = function(c) {
                    var b = this;
                    if (Object.prototype.toString.call(c) !== "[object Array]")
                        return this.reject(new TypeError("must be an array"));
                    var x = c.length
                      , T = !1;
                    if (!x)
                        return this.resolve([]);
                    for (var S = new Array(x), R = 0, F = -1, j = new this(o); ++F < x; )
                        I(c[F], F);
                    return j;
                    function I(Z, Q) {
                        b.resolve(Z).then(function(k) {
                            S[Q] = k,
                            ++R !== x || T || (T = !0,
                            a.resolve(j, S))
                        }, function(k) {
                            T || (T = !0,
                            a.reject(j, k))
                        })
                    }
                }
                ,
                y.race = function(c) {
                    var b = this;
                    if (Object.prototype.toString.call(c) !== "[object Array]")
                        return this.reject(new TypeError("must be an array"));
                    var x = c.length
                      , T = !1;
                    if (!x)
                        return this.resolve([]);
                    for (var S = -1, R = new this(o); ++S < x; )
                        F = c[S],
                        b.resolve(F).then(function(j) {
                            T || (T = !0,
                            a.resolve(R, j))
                        }, function(j) {
                            T || (T = !0,
                            a.reject(R, j))
                        });
                    var F;
                    return R
                }
            }
            , {
                immediate: 36
            }],
            38: [function(e, s, h) {
                var i = {};
                (0,
                e("./lib/utils/common").assign)(i, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")),
                s.exports = i
            }
            , {
                "./lib/deflate": 39,
                "./lib/inflate": 40,
                "./lib/utils/common": 41,
                "./lib/zlib/constants": 44
            }],
            39: [function(e, s, h) {
                var i = e("./zlib/deflate")
                  , o = e("./utils/common")
                  , a = e("./utils/strings")
                  , f = e("./zlib/messages")
                  , _ = e("./zlib/zstream")
                  , E = Object.prototype.toString
                  , y = 0
                  , w = -1
                  , d = 0
                  , v = 8;
                function l(c) {
                    if (!(this instanceof l))
                        return new l(c);
                    this.options = o.assign({
                        level: w,
                        method: v,
                        chunkSize: 16384,
                        windowBits: 15,
                        memLevel: 8,
                        strategy: d,
                        to: ""
                    }, c || {});
                    var b = this.options;
                    b.raw && 0 < b.windowBits ? b.windowBits = -b.windowBits : b.gzip && 0 < b.windowBits && b.windowBits < 16 && (b.windowBits += 16),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new _,
                    this.strm.avail_out = 0;
                    var x = i.deflateInit2(this.strm, b.level, b.method, b.windowBits, b.memLevel, b.strategy);
                    if (x !== y)
                        throw new Error(f[x]);
                    if (b.header && i.deflateSetHeader(this.strm, b.header),
                    b.dictionary) {
                        var T;
                        if (T = typeof b.dictionary == "string" ? a.string2buf(b.dictionary) : E.call(b.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(b.dictionary) : b.dictionary,
                        (x = i.deflateSetDictionary(this.strm, T)) !== y)
                            throw new Error(f[x]);
                        this._dict_set = !0
                    }
                }
                function m(c, b) {
                    var x = new l(b);
                    if (x.push(c, !0),
                    x.err)
                        throw x.msg || f[x.err];
                    return x.result
                }
                l.prototype.push = function(c, b) {
                    var x, T, S = this.strm, R = this.options.chunkSize;
                    if (this.ended)
                        return !1;
                    T = b === ~~b ? b : b === !0 ? 4 : 0,
                    typeof c == "string" ? S.input = a.string2buf(c) : E.call(c) === "[object ArrayBuffer]" ? S.input = new Uint8Array(c) : S.input = c,
                    S.next_in = 0,
                    S.avail_in = S.input.length;
                    do {
                        if (S.avail_out === 0 && (S.output = new o.Buf8(R),
                        S.next_out = 0,
                        S.avail_out = R),
                        (x = i.deflate(S, T)) !== 1 && x !== y)
                            return this.onEnd(x),
                            !(this.ended = !0);
                        S.avail_out !== 0 && (S.avail_in !== 0 || T !== 4 && T !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(o.shrinkBuf(S.output, S.next_out))) : this.onData(o.shrinkBuf(S.output, S.next_out)))
                    } while ((0 < S.avail_in || S.avail_out === 0) && x !== 1);
                    return T === 4 ? (x = i.deflateEnd(this.strm),
                    this.onEnd(x),
                    this.ended = !0,
                    x === y) : T !== 2 || (this.onEnd(y),
                    !(S.avail_out = 0))
                }
                ,
                l.prototype.onData = function(c) {
                    this.chunks.push(c)
                }
                ,
                l.prototype.onEnd = function(c) {
                    c === y && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)),
                    this.chunks = [],
                    this.err = c,
                    this.msg = this.strm.msg
                }
                ,
                h.Deflate = l,
                h.deflate = m,
                h.deflateRaw = function(c, b) {
                    return (b = b || {}).raw = !0,
                    m(c, b)
                }
                ,
                h.gzip = function(c, b) {
                    return (b = b || {}).gzip = !0,
                    m(c, b)
                }
            }
            , {
                "./utils/common": 41,
                "./utils/strings": 42,
                "./zlib/deflate": 46,
                "./zlib/messages": 51,
                "./zlib/zstream": 53
            }],
            40: [function(e, s, h) {
                var i = e("./zlib/inflate")
                  , o = e("./utils/common")
                  , a = e("./utils/strings")
                  , f = e("./zlib/constants")
                  , _ = e("./zlib/messages")
                  , E = e("./zlib/zstream")
                  , y = e("./zlib/gzheader")
                  , w = Object.prototype.toString;
                function d(l) {
                    if (!(this instanceof d))
                        return new d(l);
                    this.options = o.assign({
                        chunkSize: 16384,
                        windowBits: 0,
                        to: ""
                    }, l || {});
                    var m = this.options;
                    m.raw && 0 <= m.windowBits && m.windowBits < 16 && (m.windowBits = -m.windowBits,
                    m.windowBits === 0 && (m.windowBits = -15)),
                    !(0 <= m.windowBits && m.windowBits < 16) || l && l.windowBits || (m.windowBits += 32),
                    15 < m.windowBits && m.windowBits < 48 && !(15 & m.windowBits) && (m.windowBits |= 15),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new E,
                    this.strm.avail_out = 0;
                    var c = i.inflateInit2(this.strm, m.windowBits);
                    if (c !== f.Z_OK)
                        throw new Error(_[c]);
                    this.header = new y,
                    i.inflateGetHeader(this.strm, this.header)
                }
                function v(l, m) {
                    var c = new d(m);
                    if (c.push(l, !0),
                    c.err)
                        throw c.msg || _[c.err];
                    return c.result
                }
                d.prototype.push = function(l, m) {
                    var c, b, x, T, S, R, F = this.strm, j = this.options.chunkSize, I = this.options.dictionary, Z = !1;
                    if (this.ended)
                        return !1;
                    b = m === ~~m ? m : m === !0 ? f.Z_FINISH : f.Z_NO_FLUSH,
                    typeof l == "string" ? F.input = a.binstring2buf(l) : w.call(l) === "[object ArrayBuffer]" ? F.input = new Uint8Array(l) : F.input = l,
                    F.next_in = 0,
                    F.avail_in = F.input.length;
                    do {
                        if (F.avail_out === 0 && (F.output = new o.Buf8(j),
                        F.next_out = 0,
                        F.avail_out = j),
                        (c = i.inflate(F, f.Z_NO_FLUSH)) === f.Z_NEED_DICT && I && (R = typeof I == "string" ? a.string2buf(I) : w.call(I) === "[object ArrayBuffer]" ? new Uint8Array(I) : I,
                        c = i.inflateSetDictionary(this.strm, R)),
                        c === f.Z_BUF_ERROR && Z === !0 && (c = f.Z_OK,
                        Z = !1),
                        c !== f.Z_STREAM_END && c !== f.Z_OK)
                            return this.onEnd(c),
                            !(this.ended = !0);
                        F.next_out && (F.avail_out !== 0 && c !== f.Z_STREAM_END && (F.avail_in !== 0 || b !== f.Z_FINISH && b !== f.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = a.utf8border(F.output, F.next_out),
                        T = F.next_out - x,
                        S = a.buf2string(F.output, x),
                        F.next_out = T,
                        F.avail_out = j - T,
                        T && o.arraySet(F.output, F.output, x, T, 0),
                        this.onData(S)) : this.onData(o.shrinkBuf(F.output, F.next_out)))),
                        F.avail_in === 0 && F.avail_out === 0 && (Z = !0)
                    } while ((0 < F.avail_in || F.avail_out === 0) && c !== f.Z_STREAM_END);
                    return c === f.Z_STREAM_END && (b = f.Z_FINISH),
                    b === f.Z_FINISH ? (c = i.inflateEnd(this.strm),
                    this.onEnd(c),
                    this.ended = !0,
                    c === f.Z_OK) : b !== f.Z_SYNC_FLUSH || (this.onEnd(f.Z_OK),
                    !(F.avail_out = 0))
                }
                ,
                d.prototype.onData = function(l) {
                    this.chunks.push(l)
                }
                ,
                d.prototype.onEnd = function(l) {
                    l === f.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)),
                    this.chunks = [],
                    this.err = l,
                    this.msg = this.strm.msg
                }
                ,
                h.Inflate = d,
                h.inflate = v,
                h.inflateRaw = function(l, m) {
                    return (m = m || {}).raw = !0,
                    v(l, m)
                }
                ,
                h.ungzip = v
            }
            , {
                "./utils/common": 41,
                "./utils/strings": 42,
                "./zlib/constants": 44,
                "./zlib/gzheader": 47,
                "./zlib/inflate": 49,
                "./zlib/messages": 51,
                "./zlib/zstream": 53
            }],
            41: [function(e, s, h) {
                var i = typeof Uint8Array != "undefined" && typeof Uint16Array != "undefined" && typeof Int32Array != "undefined";
                h.assign = function(f) {
                    for (var _ = Array.prototype.slice.call(arguments, 1); _.length; ) {
                        var E = _.shift();
                        if (E) {
                            if (typeof E != "object")
                                throw new TypeError(E + "must be non-object");
                            for (var y in E)
                                E.hasOwnProperty(y) && (f[y] = E[y])
                        }
                    }
                    return f
                }
                ,
                h.shrinkBuf = function(f, _) {
                    return f.length === _ ? f : f.subarray ? f.subarray(0, _) : (f.length = _,
                    f)
                }
                ;
                var o = {
                    arraySet: function(f, _, E, y, w) {
                        if (_.subarray && f.subarray)
                            f.set(_.subarray(E, E + y), w);
                        else
                            for (var d = 0; d < y; d++)
                                f[w + d] = _[E + d]
                    },
                    flattenChunks: function(f) {
                        var _, E, y, w, d, v;
                        for (_ = y = 0,
                        E = f.length; _ < E; _++)
                            y += f[_].length;
                        for (v = new Uint8Array(y),
                        _ = w = 0,
                        E = f.length; _ < E; _++)
                            d = f[_],
                            v.set(d, w),
                            w += d.length;
                        return v
                    }
                }
                  , a = {
                    arraySet: function(f, _, E, y, w) {
                        for (var d = 0; d < y; d++)
                            f[w + d] = _[E + d]
                    },
                    flattenChunks: function(f) {
                        return [].concat.apply([], f)
                    }
                };
                h.setTyped = function(f) {
                    f ? (h.Buf8 = Uint8Array,
                    h.Buf16 = Uint16Array,
                    h.Buf32 = Int32Array,
                    h.assign(h, o)) : (h.Buf8 = Array,
                    h.Buf16 = Array,
                    h.Buf32 = Array,
                    h.assign(h, a))
                }
                ,
                h.setTyped(i)
            }
            , {}],
            42: [function(e, s, h) {
                var i = e("./common")
                  , o = !0
                  , a = !0;
                try {
                    String.fromCharCode.apply(null, [0])
                } catch (y) {
                    o = !1
                }
                try {
                    String.fromCharCode.apply(null, new Uint8Array(1))
                } catch (y) {
                    a = !1
                }
                for (var f = new i.Buf8(256), _ = 0; _ < 256; _++)
                    f[_] = 252 <= _ ? 6 : 248 <= _ ? 5 : 240 <= _ ? 4 : 224 <= _ ? 3 : 192 <= _ ? 2 : 1;
                function E(y, w) {
                    if (w < 65537 && (y.subarray && a || !y.subarray && o))
                        return String.fromCharCode.apply(null, i.shrinkBuf(y, w));
                    for (var d = "", v = 0; v < w; v++)
                        d += String.fromCharCode(y[v]);
                    return d
                }
                f[254] = f[254] = 1,
                h.string2buf = function(y) {
                    var w, d, v, l, m, c = y.length, b = 0;
                    for (l = 0; l < c; l++)
                        (64512 & (d = y.charCodeAt(l))) == 55296 && l + 1 < c && (64512 & (v = y.charCodeAt(l + 1))) == 56320 && (d = 65536 + (d - 55296 << 10) + (v - 56320),
                        l++),
                        b += d < 128 ? 1 : d < 2048 ? 2 : d < 65536 ? 3 : 4;
                    for (w = new i.Buf8(b),
                    l = m = 0; m < b; l++)
                        (64512 & (d = y.charCodeAt(l))) == 55296 && l + 1 < c && (64512 & (v = y.charCodeAt(l + 1))) == 56320 && (d = 65536 + (d - 55296 << 10) + (v - 56320),
                        l++),
                        d < 128 ? w[m++] = d : (d < 2048 ? w[m++] = 192 | d >>> 6 : (d < 65536 ? w[m++] = 224 | d >>> 12 : (w[m++] = 240 | d >>> 18,
                        w[m++] = 128 | d >>> 12 & 63),
                        w[m++] = 128 | d >>> 6 & 63),
                        w[m++] = 128 | 63 & d);
                    return w
                }
                ,
                h.buf2binstring = function(y) {
                    return E(y, y.length)
                }
                ,
                h.binstring2buf = function(y) {
                    for (var w = new i.Buf8(y.length), d = 0, v = w.length; d < v; d++)
                        w[d] = y.charCodeAt(d);
                    return w
                }
                ,
                h.buf2string = function(y, w) {
                    var d, v, l, m, c = w || y.length, b = new Array(2 * c);
                    for (d = v = 0; d < c; )
                        if ((l = y[d++]) < 128)
                            b[v++] = l;
                        else if (4 < (m = f[l]))
                            b[v++] = 65533,
                            d += m - 1;
                        else {
                            for (l &= m === 2 ? 31 : m === 3 ? 15 : 7; 1 < m && d < c; )
                                l = l << 6 | 63 & y[d++],
                                m--;
                            1 < m ? b[v++] = 65533 : l < 65536 ? b[v++] = l : (l -= 65536,
                            b[v++] = 55296 | l >> 10 & 1023,
                            b[v++] = 56320 | 1023 & l)
                        }
                    return E(b, v)
                }
                ,
                h.utf8border = function(y, w) {
                    var d;
                    for ((w = w || y.length) > y.length && (w = y.length),
                    d = w - 1; 0 <= d && (192 & y[d]) == 128; )
                        d--;
                    return d < 0 || d === 0 ? w : d + f[y[d]] > w ? d : w
                }
            }
            , {
                "./common": 41
            }],
            43: [function(e, s, h) {
                s.exports = function(i, o, a, f) {
                    for (var _ = 65535 & i | 0, E = i >>> 16 & 65535 | 0, y = 0; a !== 0; ) {
                        for (a -= y = 2e3 < a ? 2e3 : a; E = E + (_ = _ + o[f++] | 0) | 0,
                        --y; )
                            ;
                        _ %= 65521,
                        E %= 65521
                    }
                    return _ | E << 16 | 0
                }
            }
            , {}],
            44: [function(e, s, h) {
                s.exports = {
                    Z_NO_FLUSH: 0,
                    Z_PARTIAL_FLUSH: 1,
                    Z_SYNC_FLUSH: 2,
                    Z_FULL_FLUSH: 3,
                    Z_FINISH: 4,
                    Z_BLOCK: 5,
                    Z_TREES: 6,
                    Z_OK: 0,
                    Z_STREAM_END: 1,
                    Z_NEED_DICT: 2,
                    Z_ERRNO: -1,
                    Z_STREAM_ERROR: -2,
                    Z_DATA_ERROR: -3,
                    Z_BUF_ERROR: -5,
                    Z_NO_COMPRESSION: 0,
                    Z_BEST_SPEED: 1,
                    Z_BEST_COMPRESSION: 9,
                    Z_DEFAULT_COMPRESSION: -1,
                    Z_FILTERED: 1,
                    Z_HUFFMAN_ONLY: 2,
                    Z_RLE: 3,
                    Z_FIXED: 4,
                    Z_DEFAULT_STRATEGY: 0,
                    Z_BINARY: 0,
                    Z_TEXT: 1,
                    Z_UNKNOWN: 2,
                    Z_DEFLATED: 8
                }
            }
            , {}],
            45: [function(e, s, h) {
                var i = function() {
                    for (var o, a = [], f = 0; f < 256; f++) {
                        o = f;
                        for (var _ = 0; _ < 8; _++)
                            o = 1 & o ? 3988292384 ^ o >>> 1 : o >>> 1;
                        a[f] = o
                    }
                    return a
                }();
                s.exports = function(o, a, f, _) {
                    var E = i
                      , y = _ + f;
                    o ^= -1;
                    for (var w = _; w < y; w++)
                        o = o >>> 8 ^ E[255 & (o ^ a[w])];
                    return -1 ^ o
                }
            }
            , {}],
            46: [function(e, s, h) {
                var i, o = e("../utils/common"), a = e("./trees"), f = e("./adler32"), _ = e("./crc32"), E = e("./messages"), y = 0, w = 4, d = 0, v = -2, l = -1, m = 4, c = 2, b = 8, x = 9, T = 286, S = 30, R = 19, F = 2 * T + 1, j = 15, I = 3, Z = 258, Q = Z + I + 1, k = 42, L = 113, n = 1, B = 2, et = 3, W = 4;
                function rt(r, D) {
                    return r.msg = E[D],
                    D
                }
                function X(r) {
                    return (r << 1) - (4 < r ? 9 : 0)
                }
                function tt(r) {
                    for (var D = r.length; 0 <= --D; )
                        r[D] = 0
                }
                function z(r) {
                    var D = r.state
                      , M = D.pending;
                    M > r.avail_out && (M = r.avail_out),
                    M !== 0 && (o.arraySet(r.output, D.pending_buf, D.pending_out, M, r.next_out),
                    r.next_out += M,
                    D.pending_out += M,
                    r.total_out += M,
                    r.avail_out -= M,
                    D.pending -= M,
                    D.pending === 0 && (D.pending_out = 0))
                }
                function O(r, D) {
                    a._tr_flush_block(r, 0 <= r.block_start ? r.block_start : -1, r.strstart - r.block_start, D),
                    r.block_start = r.strstart,
                    z(r.strm)
                }
                function J(r, D) {
                    r.pending_buf[r.pending++] = D
                }
                function V(r, D) {
                    r.pending_buf[r.pending++] = D >>> 8 & 255,
                    r.pending_buf[r.pending++] = 255 & D
                }
                function q(r, D) {
                    var M, g, p = r.max_chain_length, C = r.strstart, P = r.prev_length, N = r.nice_match, A = r.strstart > r.w_size - Q ? r.strstart - (r.w_size - Q) : 0, Y = r.window, G = r.w_mask, H = r.prev, K = r.strstart + Z, at = Y[C + P - 1], nt = Y[C + P];
                    r.prev_length >= r.good_match && (p >>= 2),
                    N > r.lookahead && (N = r.lookahead);
                    do
                        if (Y[(M = D) + P] === nt && Y[M + P - 1] === at && Y[M] === Y[C] && Y[++M] === Y[C + 1]) {
                            C += 2,
                            M++;
                            do
                                ;
                            while (Y[++C] === Y[++M] && Y[++C] === Y[++M] && Y[++C] === Y[++M] && Y[++C] === Y[++M] && Y[++C] === Y[++M] && Y[++C] === Y[++M] && Y[++C] === Y[++M] && Y[++C] === Y[++M] && C < K);
                            if (g = Z - (K - C),
                            C = K - Z,
                            P < g) {
                                if (r.match_start = D,
                                N <= (P = g))
                                    break;
                                at = Y[C + P - 1],
                                nt = Y[C + P]
                            }
                        }
                    while ((D = H[D & G]) > A && --p != 0);
                    return P <= r.lookahead ? P : r.lookahead
                }
                function ot(r) {
                    var D, M, g, p, C, P, N, A, Y, G, H = r.w_size;
                    do {
                        if (p = r.window_size - r.lookahead - r.strstart,
                        r.strstart >= H + (H - Q)) {
                            for (o.arraySet(r.window, r.window, H, H, 0),
                            r.match_start -= H,
                            r.strstart -= H,
                            r.block_start -= H,
                            D = M = r.hash_size; g = r.head[--D],
                            r.head[D] = H <= g ? g - H : 0,
                            --M; )
                                ;
                            for (D = M = H; g = r.prev[--D],
                            r.prev[D] = H <= g ? g - H : 0,
                            --M; )
                                ;
                            p += H
                        }
                        if (r.strm.avail_in === 0)
                            break;
                        if (P = r.strm,
                        N = r.window,
                        A = r.strstart + r.lookahead,
                        Y = p,
                        G = void 0,
                        G = P.avail_in,
                        Y < G && (G = Y),
                        M = G === 0 ? 0 : (P.avail_in -= G,
                        o.arraySet(N, P.input, P.next_in, G, A),
                        P.state.wrap === 1 ? P.adler = f(P.adler, N, G, A) : P.state.wrap === 2 && (P.adler = _(P.adler, N, G, A)),
                        P.next_in += G,
                        P.total_in += G,
                        G),
                        r.lookahead += M,
                        r.lookahead + r.insert >= I)
                            for (C = r.strstart - r.insert,
                            r.ins_h = r.window[C],
                            r.ins_h = (r.ins_h << r.hash_shift ^ r.window[C + 1]) & r.hash_mask; r.insert && (r.ins_h = (r.ins_h << r.hash_shift ^ r.window[C + I - 1]) & r.hash_mask,
                            r.prev[C & r.w_mask] = r.head[r.ins_h],
                            r.head[r.ins_h] = C,
                            C++,
                            r.insert--,
                            !(r.lookahead + r.insert < I)); )
                                ;
                    } while (r.lookahead < Q && r.strm.avail_in !== 0)
                }
                function ct(r, D) {
                    for (var M, g; ; ) {
                        if (r.lookahead < Q) {
                            if (ot(r),
                            r.lookahead < Q && D === y)
                                return n;
                            if (r.lookahead === 0)
                                break
                        }
                        if (M = 0,
                        r.lookahead >= I && (r.ins_h = (r.ins_h << r.hash_shift ^ r.window[r.strstart + I - 1]) & r.hash_mask,
                        M = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h],
                        r.head[r.ins_h] = r.strstart),
                        M !== 0 && r.strstart - M <= r.w_size - Q && (r.match_length = q(r, M)),
                        r.match_length >= I)
                            if (g = a._tr_tally(r, r.strstart - r.match_start, r.match_length - I),
                            r.lookahead -= r.match_length,
                            r.match_length <= r.max_lazy_match && r.lookahead >= I) {
                                for (r.match_length--; r.strstart++,
                                r.ins_h = (r.ins_h << r.hash_shift ^ r.window[r.strstart + I - 1]) & r.hash_mask,
                                M = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h],
                                r.head[r.ins_h] = r.strstart,
                                --r.match_length != 0; )
                                    ;
                                r.strstart++
                            } else
                                r.strstart += r.match_length,
                                r.match_length = 0,
                                r.ins_h = r.window[r.strstart],
                                r.ins_h = (r.ins_h << r.hash_shift ^ r.window[r.strstart + 1]) & r.hash_mask;
                        else
                            g = a._tr_tally(r, 0, r.window[r.strstart]),
                            r.lookahead--,
                            r.strstart++;
                        if (g && (O(r, !1),
                        r.strm.avail_out === 0))
                            return n
                    }
                    return r.insert = r.strstart < I - 1 ? r.strstart : I - 1,
                    D === w ? (O(r, !0),
                    r.strm.avail_out === 0 ? et : W) : r.last_lit && (O(r, !1),
                    r.strm.avail_out === 0) ? n : B
                }
                function it(r, D) {
                    for (var M, g, p; ; ) {
                        if (r.lookahead < Q) {
                            if (ot(r),
                            r.lookahead < Q && D === y)
                                return n;
                            if (r.lookahead === 0)
                                break
                        }
                        if (M = 0,
                        r.lookahead >= I && (r.ins_h = (r.ins_h << r.hash_shift ^ r.window[r.strstart + I - 1]) & r.hash_mask,
                        M = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h],
                        r.head[r.ins_h] = r.strstart),
                        r.prev_length = r.match_length,
                        r.prev_match = r.match_start,
                        r.match_length = I - 1,
                        M !== 0 && r.prev_length < r.max_lazy_match && r.strstart - M <= r.w_size - Q && (r.match_length = q(r, M),
                        r.match_length <= 5 && (r.strategy === 1 || r.match_length === I && 4096 < r.strstart - r.match_start) && (r.match_length = I - 1)),
                        r.prev_length >= I && r.match_length <= r.prev_length) {
                            for (p = r.strstart + r.lookahead - I,
                            g = a._tr_tally(r, r.strstart - 1 - r.prev_match, r.prev_length - I),
                            r.lookahead -= r.prev_length - 1,
                            r.prev_length -= 2; ++r.strstart <= p && (r.ins_h = (r.ins_h << r.hash_shift ^ r.window[r.strstart + I - 1]) & r.hash_mask,
                            M = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h],
                            r.head[r.ins_h] = r.strstart),
                            --r.prev_length != 0; )
                                ;
                            if (r.match_available = 0,
                            r.match_length = I - 1,
                            r.strstart++,
                            g && (O(r, !1),
                            r.strm.avail_out === 0))
                                return n
                        } else if (r.match_available) {
                            if ((g = a._tr_tally(r, 0, r.window[r.strstart - 1])) && O(r, !1),
                            r.strstart++,
                            r.lookahead--,
                            r.strm.avail_out === 0)
                                return n
                        } else
                            r.match_available = 1,
                            r.strstart++,
                            r.lookahead--
                    }
                    return r.match_available && (g = a._tr_tally(r, 0, r.window[r.strstart - 1]),
                    r.match_available = 0),
                    r.insert = r.strstart < I - 1 ? r.strstart : I - 1,
                    D === w ? (O(r, !0),
                    r.strm.avail_out === 0 ? et : W) : r.last_lit && (O(r, !1),
                    r.strm.avail_out === 0) ? n : B
                }
                function st(r, D, M, g, p) {
                    this.good_length = r,
                    this.max_lazy = D,
                    this.nice_length = M,
                    this.max_chain = g,
                    this.func = p
                }
                function ut() {
                    this.strm = null,
                    this.status = 0,
                    this.pending_buf = null,
                    this.pending_buf_size = 0,
                    this.pending_out = 0,
                    this.pending = 0,
                    this.wrap = 0,
                    this.gzhead = null,
                    this.gzindex = 0,
                    this.method = b,
                    this.last_flush = -1,
                    this.w_size = 0,
                    this.w_bits = 0,
                    this.w_mask = 0,
                    this.window = null,
                    this.window_size = 0,
                    this.prev = null,
                    this.head = null,
                    this.ins_h = 0,
                    this.hash_size = 0,
                    this.hash_bits = 0,
                    this.hash_mask = 0,
                    this.hash_shift = 0,
                    this.block_start = 0,
                    this.match_length = 0,
                    this.prev_match = 0,
                    this.match_available = 0,
                    this.strstart = 0,
                    this.match_start = 0,
                    this.lookahead = 0,
                    this.prev_length = 0,
                    this.max_chain_length = 0,
                    this.max_lazy_match = 0,
                    this.level = 0,
                    this.strategy = 0,
                    this.good_match = 0,
                    this.nice_match = 0,
                    this.dyn_ltree = new o.Buf16(2 * F),
                    this.dyn_dtree = new o.Buf16(2 * (2 * S + 1)),
                    this.bl_tree = new o.Buf16(2 * (2 * R + 1)),
                    tt(this.dyn_ltree),
                    tt(this.dyn_dtree),
                    tt(this.bl_tree),
                    this.l_desc = null,
                    this.d_desc = null,
                    this.bl_desc = null,
                    this.bl_count = new o.Buf16(j + 1),
                    this.heap = new o.Buf16(2 * T + 1),
                    tt(this.heap),
                    this.heap_len = 0,
                    this.heap_max = 0,
                    this.depth = new o.Buf16(2 * T + 1),
                    tt(this.depth),
                    this.l_buf = 0,
                    this.lit_bufsize = 0,
                    this.last_lit = 0,
                    this.d_buf = 0,
                    this.opt_len = 0,
                    this.static_len = 0,
                    this.matches = 0,
                    this.insert = 0,
                    this.bi_buf = 0,
                    this.bi_valid = 0
                }
                function ht(r) {
                    var D;
                    return r && r.state ? (r.total_in = r.total_out = 0,
                    r.data_type = c,
                    (D = r.state).pending = 0,
                    D.pending_out = 0,
                    D.wrap < 0 && (D.wrap = -D.wrap),
                    D.status = D.wrap ? k : L,
                    r.adler = D.wrap === 2 ? 0 : 1,
                    D.last_flush = y,
                    a._tr_init(D),
                    d) : rt(r, v)
                }
                function gt(r) {
                    var D = ht(r);
                    return D === d && function(M) {
                        M.window_size = 2 * M.w_size,
                        tt(M.head),
                        M.max_lazy_match = i[M.level].max_lazy,
                        M.good_match = i[M.level].good_length,
                        M.nice_match = i[M.level].nice_length,
                        M.max_chain_length = i[M.level].max_chain,
                        M.strstart = 0,
                        M.block_start = 0,
                        M.lookahead = 0,
                        M.insert = 0,
                        M.match_length = M.prev_length = I - 1,
                        M.match_available = 0,
                        M.ins_h = 0
                    }(r.state),
                    D
                }
                function ft(r, D, M, g, p, C) {
                    if (!r)
                        return v;
                    var P = 1;
                    if (D === l && (D = 6),
                    g < 0 ? (P = 0,
                    g = -g) : 15 < g && (P = 2,
                    g -= 16),
                    p < 1 || x < p || M !== b || g < 8 || 15 < g || D < 0 || 9 < D || C < 0 || m < C)
                        return rt(r, v);
                    g === 8 && (g = 9);
                    var N = new ut;
                    return (r.state = N).strm = r,
                    N.wrap = P,
                    N.gzhead = null,
                    N.w_bits = g,
                    N.w_size = 1 << N.w_bits,
                    N.w_mask = N.w_size - 1,
                    N.hash_bits = p + 7,
                    N.hash_size = 1 << N.hash_bits,
                    N.hash_mask = N.hash_size - 1,
                    N.hash_shift = ~~((N.hash_bits + I - 1) / I),
                    N.window = new o.Buf8(2 * N.w_size),
                    N.head = new o.Buf16(N.hash_size),
                    N.prev = new o.Buf16(N.w_size),
                    N.lit_bufsize = 1 << p + 6,
                    N.pending_buf_size = 4 * N.lit_bufsize,
                    N.pending_buf = new o.Buf8(N.pending_buf_size),
                    N.d_buf = 1 * N.lit_bufsize,
                    N.l_buf = 3 * N.lit_bufsize,
                    N.level = D,
                    N.strategy = C,
                    N.method = M,
                    gt(r)
                }
                i = [new st(0,0,0,0,function(r, D) {
                    var M = 65535;
                    for (M > r.pending_buf_size - 5 && (M = r.pending_buf_size - 5); ; ) {
                        if (r.lookahead <= 1) {
                            if (ot(r),
                            r.lookahead === 0 && D === y)
                                return n;
                            if (r.lookahead === 0)
                                break
                        }
                        r.strstart += r.lookahead,
                        r.lookahead = 0;
                        var g = r.block_start + M;
                        if ((r.strstart === 0 || r.strstart >= g) && (r.lookahead = r.strstart - g,
                        r.strstart = g,
                        O(r, !1),
                        r.strm.avail_out === 0) || r.strstart - r.block_start >= r.w_size - Q && (O(r, !1),
                        r.strm.avail_out === 0))
                            return n
                    }
                    return r.insert = 0,
                    D === w ? (O(r, !0),
                    r.strm.avail_out === 0 ? et : W) : (r.strstart > r.block_start && (O(r, !1),
                    r.strm.avail_out),
                    n)
                }
                ), new st(4,4,8,4,ct), new st(4,5,16,8,ct), new st(4,6,32,32,ct), new st(4,4,16,16,it), new st(8,16,32,32,it), new st(8,16,128,128,it), new st(8,32,128,256,it), new st(32,128,258,1024,it), new st(32,258,258,4096,it)],
                h.deflateInit = function(r, D) {
                    return ft(r, D, b, 15, 8, 0)
                }
                ,
                h.deflateInit2 = ft,
                h.deflateReset = gt,
                h.deflateResetKeep = ht,
                h.deflateSetHeader = function(r, D) {
                    return r && r.state ? r.state.wrap !== 2 ? v : (r.state.gzhead = D,
                    d) : v
                }
                ,
                h.deflate = function(r, D) {
                    var M, g, p, C;
                    if (!r || !r.state || 5 < D || D < 0)
                        return r ? rt(r, v) : v;
                    if (g = r.state,
                    !r.output || !r.input && r.avail_in !== 0 || g.status === 666 && D !== w)
                        return rt(r, r.avail_out === 0 ? -5 : v);
                    if (g.strm = r,
                    M = g.last_flush,
                    g.last_flush = D,
                    g.status === k)
                        if (g.wrap === 2)
                            r.adler = 0,
                            J(g, 31),
                            J(g, 139),
                            J(g, 8),
                            g.gzhead ? (J(g, (g.gzhead.text ? 1 : 0) + (g.gzhead.hcrc ? 2 : 0) + (g.gzhead.extra ? 4 : 0) + (g.gzhead.name ? 8 : 0) + (g.gzhead.comment ? 16 : 0)),
                            J(g, 255 & g.gzhead.time),
                            J(g, g.gzhead.time >> 8 & 255),
                            J(g, g.gzhead.time >> 16 & 255),
                            J(g, g.gzhead.time >> 24 & 255),
                            J(g, g.level === 9 ? 2 : 2 <= g.strategy || g.level < 2 ? 4 : 0),
                            J(g, 255 & g.gzhead.os),
                            g.gzhead.extra && g.gzhead.extra.length && (J(g, 255 & g.gzhead.extra.length),
                            J(g, g.gzhead.extra.length >> 8 & 255)),
                            g.gzhead.hcrc && (r.adler = _(r.adler, g.pending_buf, g.pending, 0)),
                            g.gzindex = 0,
                            g.status = 69) : (J(g, 0),
                            J(g, 0),
                            J(g, 0),
                            J(g, 0),
                            J(g, 0),
                            J(g, g.level === 9 ? 2 : 2 <= g.strategy || g.level < 2 ? 4 : 0),
                            J(g, 3),
                            g.status = L);
                        else {
                            var P = b + (g.w_bits - 8 << 4) << 8;
                            P |= (2 <= g.strategy || g.level < 2 ? 0 : g.level < 6 ? 1 : g.level === 6 ? 2 : 3) << 6,
                            g.strstart !== 0 && (P |= 32),
                            P += 31 - P % 31,
                            g.status = L,
                            V(g, P),
                            g.strstart !== 0 && (V(g, r.adler >>> 16),
                            V(g, 65535 & r.adler)),
                            r.adler = 1
                        }
                    if (g.status === 69)
                        if (g.gzhead.extra) {
                            for (p = g.pending; g.gzindex < (65535 & g.gzhead.extra.length) && (g.pending !== g.pending_buf_size || (g.gzhead.hcrc && g.pending > p && (r.adler = _(r.adler, g.pending_buf, g.pending - p, p)),
                            z(r),
                            p = g.pending,
                            g.pending !== g.pending_buf_size)); )
                                J(g, 255 & g.gzhead.extra[g.gzindex]),
                                g.gzindex++;
                            g.gzhead.hcrc && g.pending > p && (r.adler = _(r.adler, g.pending_buf, g.pending - p, p)),
                            g.gzindex === g.gzhead.extra.length && (g.gzindex = 0,
                            g.status = 73)
                        } else
                            g.status = 73;
                    if (g.status === 73)
                        if (g.gzhead.name) {
                            p = g.pending;
                            do {
                                if (g.pending === g.pending_buf_size && (g.gzhead.hcrc && g.pending > p && (r.adler = _(r.adler, g.pending_buf, g.pending - p, p)),
                                z(r),
                                p = g.pending,
                                g.pending === g.pending_buf_size)) {
                                    C = 1;
                                    break
                                }
                                C = g.gzindex < g.gzhead.name.length ? 255 & g.gzhead.name.charCodeAt(g.gzindex++) : 0,
                                J(g, C)
                            } while (C !== 0);
                            g.gzhead.hcrc && g.pending > p && (r.adler = _(r.adler, g.pending_buf, g.pending - p, p)),
                            C === 0 && (g.gzindex = 0,
                            g.status = 91)
                        } else
                            g.status = 91;
                    if (g.status === 91)
                        if (g.gzhead.comment) {
                            p = g.pending;
                            do {
                                if (g.pending === g.pending_buf_size && (g.gzhead.hcrc && g.pending > p && (r.adler = _(r.adler, g.pending_buf, g.pending - p, p)),
                                z(r),
                                p = g.pending,
                                g.pending === g.pending_buf_size)) {
                                    C = 1;
                                    break
                                }
                                C = g.gzindex < g.gzhead.comment.length ? 255 & g.gzhead.comment.charCodeAt(g.gzindex++) : 0,
                                J(g, C)
                            } while (C !== 0);
                            g.gzhead.hcrc && g.pending > p && (r.adler = _(r.adler, g.pending_buf, g.pending - p, p)),
                            C === 0 && (g.status = 103)
                        } else
                            g.status = 103;
                    if (g.status === 103 && (g.gzhead.hcrc ? (g.pending + 2 > g.pending_buf_size && z(r),
                    g.pending + 2 <= g.pending_buf_size && (J(g, 255 & r.adler),
                    J(g, r.adler >> 8 & 255),
                    r.adler = 0,
                    g.status = L)) : g.status = L),
                    g.pending !== 0) {
                        if (z(r),
                        r.avail_out === 0)
                            return g.last_flush = -1,
                            d
                    } else if (r.avail_in === 0 && X(D) <= X(M) && D !== w)
                        return rt(r, -5);
                    if (g.status === 666 && r.avail_in !== 0)
                        return rt(r, -5);
                    if (r.avail_in !== 0 || g.lookahead !== 0 || D !== y && g.status !== 666) {
                        var N = g.strategy === 2 ? function(A, Y) {
                            for (var G; ; ) {
                                if (A.lookahead === 0 && (ot(A),
                                A.lookahead === 0)) {
                                    if (Y === y)
                                        return n;
                                    break
                                }
                                if (A.match_length = 0,
                                G = a._tr_tally(A, 0, A.window[A.strstart]),
                                A.lookahead--,
                                A.strstart++,
                                G && (O(A, !1),
                                A.strm.avail_out === 0))
                                    return n
                            }
                            return A.insert = 0,
                            Y === w ? (O(A, !0),
                            A.strm.avail_out === 0 ? et : W) : A.last_lit && (O(A, !1),
                            A.strm.avail_out === 0) ? n : B
                        }(g, D) : g.strategy === 3 ? function(A, Y) {
                            for (var G, H, K, at, nt = A.window; ; ) {
                                if (A.lookahead <= Z) {
                                    if (ot(A),
                                    A.lookahead <= Z && Y === y)
                                        return n;
                                    if (A.lookahead === 0)
                                        break
                                }
                                if (A.match_length = 0,
                                A.lookahead >= I && 0 < A.strstart && (H = nt[K = A.strstart - 1]) === nt[++K] && H === nt[++K] && H === nt[++K]) {
                                    at = A.strstart + Z;
                                    do
                                        ;
                                    while (H === nt[++K] && H === nt[++K] && H === nt[++K] && H === nt[++K] && H === nt[++K] && H === nt[++K] && H === nt[++K] && H === nt[++K] && K < at);
                                    A.match_length = Z - (at - K),
                                    A.match_length > A.lookahead && (A.match_length = A.lookahead)
                                }
                                if (A.match_length >= I ? (G = a._tr_tally(A, 1, A.match_length - I),
                                A.lookahead -= A.match_length,
                                A.strstart += A.match_length,
                                A.match_length = 0) : (G = a._tr_tally(A, 0, A.window[A.strstart]),
                                A.lookahead--,
                                A.strstart++),
                                G && (O(A, !1),
                                A.strm.avail_out === 0))
                                    return n
                            }
                            return A.insert = 0,
                            Y === w ? (O(A, !0),
                            A.strm.avail_out === 0 ? et : W) : A.last_lit && (O(A, !1),
                            A.strm.avail_out === 0) ? n : B
                        }(g, D) : i[g.level].func(g, D);
                        if (N !== et && N !== W || (g.status = 666),
                        N === n || N === et)
                            return r.avail_out === 0 && (g.last_flush = -1),
                            d;
                        if (N === B && (D === 1 ? a._tr_align(g) : D !== 5 && (a._tr_stored_block(g, 0, 0, !1),
                        D === 3 && (tt(g.head),
                        g.lookahead === 0 && (g.strstart = 0,
                        g.block_start = 0,
                        g.insert = 0))),
                        z(r),
                        r.avail_out === 0))
                            return g.last_flush = -1,
                            d
                    }
                    return D !== w ? d : g.wrap <= 0 ? 1 : (g.wrap === 2 ? (J(g, 255 & r.adler),
                    J(g, r.adler >> 8 & 255),
                    J(g, r.adler >> 16 & 255),
                    J(g, r.adler >> 24 & 255),
                    J(g, 255 & r.total_in),
                    J(g, r.total_in >> 8 & 255),
                    J(g, r.total_in >> 16 & 255),
                    J(g, r.total_in >> 24 & 255)) : (V(g, r.adler >>> 16),
                    V(g, 65535 & r.adler)),
                    z(r),
                    0 < g.wrap && (g.wrap = -g.wrap),
                    g.pending !== 0 ? d : 1)
                }
                ,
                h.deflateEnd = function(r) {
                    var D;
                    return r && r.state ? (D = r.state.status) !== k && D !== 69 && D !== 73 && D !== 91 && D !== 103 && D !== L && D !== 666 ? rt(r, v) : (r.state = null,
                    D === L ? rt(r, -3) : d) : v
                }
                ,
                h.deflateSetDictionary = function(r, D) {
                    var M, g, p, C, P, N, A, Y, G = D.length;
                    if (!r || !r.state || (C = (M = r.state).wrap) === 2 || C === 1 && M.status !== k || M.lookahead)
                        return v;
                    for (C === 1 && (r.adler = f(r.adler, D, G, 0)),
                    M.wrap = 0,
                    G >= M.w_size && (C === 0 && (tt(M.head),
                    M.strstart = 0,
                    M.block_start = 0,
                    M.insert = 0),
                    Y = new o.Buf8(M.w_size),
                    o.arraySet(Y, D, G - M.w_size, M.w_size, 0),
                    D = Y,
                    G = M.w_size),
                    P = r.avail_in,
                    N = r.next_in,
                    A = r.input,
                    r.avail_in = G,
                    r.next_in = 0,
                    r.input = D,
                    ot(M); M.lookahead >= I; ) {
                        for (g = M.strstart,
                        p = M.lookahead - (I - 1); M.ins_h = (M.ins_h << M.hash_shift ^ M.window[g + I - 1]) & M.hash_mask,
                        M.prev[g & M.w_mask] = M.head[M.ins_h],
                        M.head[M.ins_h] = g,
                        g++,
                        --p; )
                            ;
                        M.strstart = g,
                        M.lookahead = I - 1,
                        ot(M)
                    }
                    return M.strstart += M.lookahead,
                    M.block_start = M.strstart,
                    M.insert = M.lookahead,
                    M.lookahead = 0,
                    M.match_length = M.prev_length = I - 1,
                    M.match_available = 0,
                    r.next_in = N,
                    r.input = A,
                    r.avail_in = P,
                    M.wrap = C,
                    d
                }
                ,
                h.deflateInfo = "pako deflate (from Nodeca project)"
            }
            , {
                "../utils/common": 41,
                "./adler32": 43,
                "./crc32": 45,
                "./messages": 51,
                "./trees": 52
            }],
            47: [function(e, s, h) {
                s.exports = function() {
                    this.text = 0,
                    this.time = 0,
                    this.xflags = 0,
                    this.os = 0,
                    this.extra = null,
                    this.extra_len = 0,
                    this.name = "",
                    this.comment = "",
                    this.hcrc = 0,
                    this.done = !1
                }
            }
            , {}],
            48: [function(e, s, h) {
                s.exports = function(i, o) {
                    var a, f, _, E, y, w, d, v, l, m, c, b, x, T, S, R, F, j, I, Z, Q, k, L, n, B;
                    a = i.state,
                    f = i.next_in,
                    n = i.input,
                    _ = f + (i.avail_in - 5),
                    E = i.next_out,
                    B = i.output,
                    y = E - (o - i.avail_out),
                    w = E + (i.avail_out - 257),
                    d = a.dmax,
                    v = a.wsize,
                    l = a.whave,
                    m = a.wnext,
                    c = a.window,
                    b = a.hold,
                    x = a.bits,
                    T = a.lencode,
                    S = a.distcode,
                    R = (1 << a.lenbits) - 1,
                    F = (1 << a.distbits) - 1;
                    t: do {
                        x < 15 && (b += n[f++] << x,
                        x += 8,
                        b += n[f++] << x,
                        x += 8),
                        j = T[b & R];
                        e: for (; ; ) {
                            if (b >>>= I = j >>> 24,
                            x -= I,
                            (I = j >>> 16 & 255) === 0)
                                B[E++] = 65535 & j;
                            else {
                                if (!(16 & I)) {
                                    if (!(64 & I)) {
                                        j = T[(65535 & j) + (b & (1 << I) - 1)];
                                        continue e
                                    }
                                    if (32 & I) {
                                        a.mode = 12;
                                        break t
                                    }
                                    i.msg = "invalid literal/length code",
                                    a.mode = 30;
                                    break t
                                }
                                Z = 65535 & j,
                                (I &= 15) && (x < I && (b += n[f++] << x,
                                x += 8),
                                Z += b & (1 << I) - 1,
                                b >>>= I,
                                x -= I),
                                x < 15 && (b += n[f++] << x,
                                x += 8,
                                b += n[f++] << x,
                                x += 8),
                                j = S[b & F];
                                r: for (; ; ) {
                                    if (b >>>= I = j >>> 24,
                                    x -= I,
                                    !(16 & (I = j >>> 16 & 255))) {
                                        if (!(64 & I)) {
                                            j = S[(65535 & j) + (b & (1 << I) - 1)];
                                            continue r
                                        }
                                        i.msg = "invalid distance code",
                                        a.mode = 30;
                                        break t
                                    }
                                    if (Q = 65535 & j,
                                    x < (I &= 15) && (b += n[f++] << x,
                                    (x += 8) < I && (b += n[f++] << x,
                                    x += 8)),
                                    d < (Q += b & (1 << I) - 1)) {
                                        i.msg = "invalid distance too far back",
                                        a.mode = 30;
                                        break t
                                    }
                                    if (b >>>= I,
                                    x -= I,
                                    (I = E - y) < Q) {
                                        if (l < (I = Q - I) && a.sane) {
                                            i.msg = "invalid distance too far back",
                                            a.mode = 30;
                                            break t
                                        }
                                        if (L = c,
                                        (k = 0) === m) {
                                            if (k += v - I,
                                            I < Z) {
                                                for (Z -= I; B[E++] = c[k++],
                                                --I; )
                                                    ;
                                                k = E - Q,
                                                L = B
                                            }
                                        } else if (m < I) {
                                            if (k += v + m - I,
                                            (I -= m) < Z) {
                                                for (Z -= I; B[E++] = c[k++],
                                                --I; )
                                                    ;
                                                if (k = 0,
                                                m < Z) {
                                                    for (Z -= I = m; B[E++] = c[k++],
                                                    --I; )
                                                        ;
                                                    k = E - Q,
                                                    L = B
                                                }
                                            }
                                        } else if (k += m - I,
                                        I < Z) {
                                            for (Z -= I; B[E++] = c[k++],
                                            --I; )
                                                ;
                                            k = E - Q,
                                            L = B
                                        }
                                        for (; 2 < Z; )
                                            B[E++] = L[k++],
                                            B[E++] = L[k++],
                                            B[E++] = L[k++],
                                            Z -= 3;
                                        Z && (B[E++] = L[k++],
                                        1 < Z && (B[E++] = L[k++]))
                                    } else {
                                        for (k = E - Q; B[E++] = B[k++],
                                        B[E++] = B[k++],
                                        B[E++] = B[k++],
                                        2 < (Z -= 3); )
                                            ;
                                        Z && (B[E++] = B[k++],
                                        1 < Z && (B[E++] = B[k++]))
                                    }
                                    break
                                }
                            }
                            break
                        }
                    } while (f < _ && E < w);
                    f -= Z = x >> 3,
                    b &= (1 << (x -= Z << 3)) - 1,
                    i.next_in = f,
                    i.next_out = E,
                    i.avail_in = f < _ ? _ - f + 5 : 5 - (f - _),
                    i.avail_out = E < w ? w - E + 257 : 257 - (E - w),
                    a.hold = b,
                    a.bits = x
                }
            }
            , {}],
            49: [function(e, s, h) {
                var i = e("../utils/common")
                  , o = e("./adler32")
                  , a = e("./crc32")
                  , f = e("./inffast")
                  , _ = e("./inftrees")
                  , E = 1
                  , y = 2
                  , w = 0
                  , d = -2
                  , v = 1
                  , l = 852
                  , m = 592;
                function c(k) {
                    return (k >>> 24 & 255) + (k >>> 8 & 65280) + ((65280 & k) << 8) + ((255 & k) << 24)
                }
                function b() {
                    this.mode = 0,
                    this.last = !1,
                    this.wrap = 0,
                    this.havedict = !1,
                    this.flags = 0,
                    this.dmax = 0,
                    this.check = 0,
                    this.total = 0,
                    this.head = null,
                    this.wbits = 0,
                    this.wsize = 0,
                    this.whave = 0,
                    this.wnext = 0,
                    this.window = null,
                    this.hold = 0,
                    this.bits = 0,
                    this.length = 0,
                    this.offset = 0,
                    this.extra = 0,
                    this.lencode = null,
                    this.distcode = null,
                    this.lenbits = 0,
                    this.distbits = 0,
                    this.ncode = 0,
                    this.nlen = 0,
                    this.ndist = 0,
                    this.have = 0,
                    this.next = null,
                    this.lens = new i.Buf16(320),
                    this.work = new i.Buf16(288),
                    this.lendyn = null,
                    this.distdyn = null,
                    this.sane = 0,
                    this.back = 0,
                    this.was = 0
                }
                function x(k) {
                    var L;
                    return k && k.state ? (L = k.state,
                    k.total_in = k.total_out = L.total = 0,
                    k.msg = "",
                    L.wrap && (k.adler = 1 & L.wrap),
                    L.mode = v,
                    L.last = 0,
                    L.havedict = 0,
                    L.dmax = 32768,
                    L.head = null,
                    L.hold = 0,
                    L.bits = 0,
                    L.lencode = L.lendyn = new i.Buf32(l),
                    L.distcode = L.distdyn = new i.Buf32(m),
                    L.sane = 1,
                    L.back = -1,
                    w) : d
                }
                function T(k) {
                    var L;
                    return k && k.state ? ((L = k.state).wsize = 0,
                    L.whave = 0,
                    L.wnext = 0,
                    x(k)) : d
                }
                function S(k, L) {
                    var n, B;
                    return k && k.state ? (B = k.state,
                    L < 0 ? (n = 0,
                    L = -L) : (n = 1 + (L >> 4),
                    L < 48 && (L &= 15)),
                    L && (L < 8 || 15 < L) ? d : (B.window !== null && B.wbits !== L && (B.window = null),
                    B.wrap = n,
                    B.wbits = L,
                    T(k))) : d
                }
                function R(k, L) {
                    var n, B;
                    return k ? (B = new b,
                    (k.state = B).window = null,
                    (n = S(k, L)) !== w && (k.state = null),
                    n) : d
                }
                var F, j, I = !0;
                function Z(k) {
                    if (I) {
                        var L;
                        for (F = new i.Buf32(512),
                        j = new i.Buf32(32),
                        L = 0; L < 144; )
                            k.lens[L++] = 8;
                        for (; L < 256; )
                            k.lens[L++] = 9;
                        for (; L < 280; )
                            k.lens[L++] = 7;
                        for (; L < 288; )
                            k.lens[L++] = 8;
                        for (_(E, k.lens, 0, 288, F, 0, k.work, {
                            bits: 9
                        }),
                        L = 0; L < 32; )
                            k.lens[L++] = 5;
                        _(y, k.lens, 0, 32, j, 0, k.work, {
                            bits: 5
                        }),
                        I = !1
                    }
                    k.lencode = F,
                    k.lenbits = 9,
                    k.distcode = j,
                    k.distbits = 5
                }
                function Q(k, L, n, B) {
                    var et, W = k.state;
                    return W.window === null && (W.wsize = 1 << W.wbits,
                    W.wnext = 0,
                    W.whave = 0,
                    W.window = new i.Buf8(W.wsize)),
                    B >= W.wsize ? (i.arraySet(W.window, L, n - W.wsize, W.wsize, 0),
                    W.wnext = 0,
                    W.whave = W.wsize) : (B < (et = W.wsize - W.wnext) && (et = B),
                    i.arraySet(W.window, L, n - B, et, W.wnext),
                    (B -= et) ? (i.arraySet(W.window, L, n - B, B, 0),
                    W.wnext = B,
                    W.whave = W.wsize) : (W.wnext += et,
                    W.wnext === W.wsize && (W.wnext = 0),
                    W.whave < W.wsize && (W.whave += et))),
                    0
                }
                h.inflateReset = T,
                h.inflateReset2 = S,
                h.inflateResetKeep = x,
                h.inflateInit = function(k) {
                    return R(k, 15)
                }
                ,
                h.inflateInit2 = R,
                h.inflate = function(k, L) {
                    var n, B, et, W, rt, X, tt, z, O, J, V, q, ot, ct, it, st, ut, ht, gt, ft, r, D, M, g, p = 0, C = new i.Buf8(4), P = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                    if (!k || !k.state || !k.output || !k.input && k.avail_in !== 0)
                        return d;
                    (n = k.state).mode === 12 && (n.mode = 13),
                    rt = k.next_out,
                    et = k.output,
                    tt = k.avail_out,
                    W = k.next_in,
                    B = k.input,
                    X = k.avail_in,
                    z = n.hold,
                    O = n.bits,
                    J = X,
                    V = tt,
                    D = w;
                    t: for (; ; )
                        switch (n.mode) {
                        case v:
                            if (n.wrap === 0) {
                                n.mode = 13;
                                break
                            }
                            for (; O < 16; ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            if (2 & n.wrap && z === 35615) {
                                C[n.check = 0] = 255 & z,
                                C[1] = z >>> 8 & 255,
                                n.check = a(n.check, C, 2, 0),
                                O = z = 0,
                                n.mode = 2;
                                break
                            }
                            if (n.flags = 0,
                            n.head && (n.head.done = !1),
                            !(1 & n.wrap) || (((255 & z) << 8) + (z >> 8)) % 31) {
                                k.msg = "incorrect header check",
                                n.mode = 30;
                                break
                            }
                            if ((15 & z) != 8) {
                                k.msg = "unknown compression method",
                                n.mode = 30;
                                break
                            }
                            if (O -= 4,
                            r = 8 + (15 & (z >>>= 4)),
                            n.wbits === 0)
                                n.wbits = r;
                            else if (r > n.wbits) {
                                k.msg = "invalid window size",
                                n.mode = 30;
                                break
                            }
                            n.dmax = 1 << r,
                            k.adler = n.check = 1,
                            n.mode = 512 & z ? 10 : 12,
                            O = z = 0;
                            break;
                        case 2:
                            for (; O < 16; ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            if (n.flags = z,
                            (255 & n.flags) != 8) {
                                k.msg = "unknown compression method",
                                n.mode = 30;
                                break
                            }
                            if (57344 & n.flags) {
                                k.msg = "unknown header flags set",
                                n.mode = 30;
                                break
                            }
                            n.head && (n.head.text = z >> 8 & 1),
                            512 & n.flags && (C[0] = 255 & z,
                            C[1] = z >>> 8 & 255,
                            n.check = a(n.check, C, 2, 0)),
                            O = z = 0,
                            n.mode = 3;
                        case 3:
                            for (; O < 32; ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            n.head && (n.head.time = z),
                            512 & n.flags && (C[0] = 255 & z,
                            C[1] = z >>> 8 & 255,
                            C[2] = z >>> 16 & 255,
                            C[3] = z >>> 24 & 255,
                            n.check = a(n.check, C, 4, 0)),
                            O = z = 0,
                            n.mode = 4;
                        case 4:
                            for (; O < 16; ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            n.head && (n.head.xflags = 255 & z,
                            n.head.os = z >> 8),
                            512 & n.flags && (C[0] = 255 & z,
                            C[1] = z >>> 8 & 255,
                            n.check = a(n.check, C, 2, 0)),
                            O = z = 0,
                            n.mode = 5;
                        case 5:
                            if (1024 & n.flags) {
                                for (; O < 16; ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                n.length = z,
                                n.head && (n.head.extra_len = z),
                                512 & n.flags && (C[0] = 255 & z,
                                C[1] = z >>> 8 & 255,
                                n.check = a(n.check, C, 2, 0)),
                                O = z = 0
                            } else
                                n.head && (n.head.extra = null);
                            n.mode = 6;
                        case 6:
                            if (1024 & n.flags && (X < (q = n.length) && (q = X),
                            q && (n.head && (r = n.head.extra_len - n.length,
                            n.head.extra || (n.head.extra = new Array(n.head.extra_len)),
                            i.arraySet(n.head.extra, B, W, q, r)),
                            512 & n.flags && (n.check = a(n.check, B, q, W)),
                            X -= q,
                            W += q,
                            n.length -= q),
                            n.length))
                                break t;
                            n.length = 0,
                            n.mode = 7;
                        case 7:
                            if (2048 & n.flags) {
                                if (X === 0)
                                    break t;
                                for (q = 0; r = B[W + q++],
                                n.head && r && n.length < 65536 && (n.head.name += String.fromCharCode(r)),
                                r && q < X; )
                                    ;
                                if (512 & n.flags && (n.check = a(n.check, B, q, W)),
                                X -= q,
                                W += q,
                                r)
                                    break t
                            } else
                                n.head && (n.head.name = null);
                            n.length = 0,
                            n.mode = 8;
                        case 8:
                            if (4096 & n.flags) {
                                if (X === 0)
                                    break t;
                                for (q = 0; r = B[W + q++],
                                n.head && r && n.length < 65536 && (n.head.comment += String.fromCharCode(r)),
                                r && q < X; )
                                    ;
                                if (512 & n.flags && (n.check = a(n.check, B, q, W)),
                                X -= q,
                                W += q,
                                r)
                                    break t
                            } else
                                n.head && (n.head.comment = null);
                            n.mode = 9;
                        case 9:
                            if (512 & n.flags) {
                                for (; O < 16; ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                if (z !== (65535 & n.check)) {
                                    k.msg = "header crc mismatch",
                                    n.mode = 30;
                                    break
                                }
                                O = z = 0
                            }
                            n.head && (n.head.hcrc = n.flags >> 9 & 1,
                            n.head.done = !0),
                            k.adler = n.check = 0,
                            n.mode = 12;
                            break;
                        case 10:
                            for (; O < 32; ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            k.adler = n.check = c(z),
                            O = z = 0,
                            n.mode = 11;
                        case 11:
                            if (n.havedict === 0)
                                return k.next_out = rt,
                                k.avail_out = tt,
                                k.next_in = W,
                                k.avail_in = X,
                                n.hold = z,
                                n.bits = O,
                                2;
                            k.adler = n.check = 1,
                            n.mode = 12;
                        case 12:
                            if (L === 5 || L === 6)
                                break t;
                        case 13:
                            if (n.last) {
                                z >>>= 7 & O,
                                O -= 7 & O,
                                n.mode = 27;
                                break
                            }
                            for (; O < 3; ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            switch (n.last = 1 & z,
                            O -= 1,
                            3 & (z >>>= 1)) {
                            case 0:
                                n.mode = 14;
                                break;
                            case 1:
                                if (Z(n),
                                n.mode = 20,
                                L !== 6)
                                    break;
                                z >>>= 2,
                                O -= 2;
                                break t;
                            case 2:
                                n.mode = 17;
                                break;
                            case 3:
                                k.msg = "invalid block type",
                                n.mode = 30
                            }
                            z >>>= 2,
                            O -= 2;
                            break;
                        case 14:
                            for (z >>>= 7 & O,
                            O -= 7 & O; O < 32; ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            if ((65535 & z) != (z >>> 16 ^ 65535)) {
                                k.msg = "invalid stored block lengths",
                                n.mode = 30;
                                break
                            }
                            if (n.length = 65535 & z,
                            O = z = 0,
                            n.mode = 15,
                            L === 6)
                                break t;
                        case 15:
                            n.mode = 16;
                        case 16:
                            if (q = n.length) {
                                if (X < q && (q = X),
                                tt < q && (q = tt),
                                q === 0)
                                    break t;
                                i.arraySet(et, B, W, q, rt),
                                X -= q,
                                W += q,
                                tt -= q,
                                rt += q,
                                n.length -= q;
                                break
                            }
                            n.mode = 12;
                            break;
                        case 17:
                            for (; O < 14; ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            if (n.nlen = 257 + (31 & z),
                            z >>>= 5,
                            O -= 5,
                            n.ndist = 1 + (31 & z),
                            z >>>= 5,
                            O -= 5,
                            n.ncode = 4 + (15 & z),
                            z >>>= 4,
                            O -= 4,
                            286 < n.nlen || 30 < n.ndist) {
                                k.msg = "too many length or distance symbols",
                                n.mode = 30;
                                break
                            }
                            n.have = 0,
                            n.mode = 18;
                        case 18:
                            for (; n.have < n.ncode; ) {
                                for (; O < 3; ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                n.lens[P[n.have++]] = 7 & z,
                                z >>>= 3,
                                O -= 3
                            }
                            for (; n.have < 19; )
                                n.lens[P[n.have++]] = 0;
                            if (n.lencode = n.lendyn,
                            n.lenbits = 7,
                            M = {
                                bits: n.lenbits
                            },
                            D = _(0, n.lens, 0, 19, n.lencode, 0, n.work, M),
                            n.lenbits = M.bits,
                            D) {
                                k.msg = "invalid code lengths set",
                                n.mode = 30;
                                break
                            }
                            n.have = 0,
                            n.mode = 19;
                        case 19:
                            for (; n.have < n.nlen + n.ndist; ) {
                                for (; st = (p = n.lencode[z & (1 << n.lenbits) - 1]) >>> 16 & 255,
                                ut = 65535 & p,
                                !((it = p >>> 24) <= O); ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                if (ut < 16)
                                    z >>>= it,
                                    O -= it,
                                    n.lens[n.have++] = ut;
                                else {
                                    if (ut === 16) {
                                        for (g = it + 2; O < g; ) {
                                            if (X === 0)
                                                break t;
                                            X--,
                                            z += B[W++] << O,
                                            O += 8
                                        }
                                        if (z >>>= it,
                                        O -= it,
                                        n.have === 0) {
                                            k.msg = "invalid bit length repeat",
                                            n.mode = 30;
                                            break
                                        }
                                        r = n.lens[n.have - 1],
                                        q = 3 + (3 & z),
                                        z >>>= 2,
                                        O -= 2
                                    } else if (ut === 17) {
                                        for (g = it + 3; O < g; ) {
                                            if (X === 0)
                                                break t;
                                            X--,
                                            z += B[W++] << O,
                                            O += 8
                                        }
                                        O -= it,
                                        r = 0,
                                        q = 3 + (7 & (z >>>= it)),
                                        z >>>= 3,
                                        O -= 3
                                    } else {
                                        for (g = it + 7; O < g; ) {
                                            if (X === 0)
                                                break t;
                                            X--,
                                            z += B[W++] << O,
                                            O += 8
                                        }
                                        O -= it,
                                        r = 0,
                                        q = 11 + (127 & (z >>>= it)),
                                        z >>>= 7,
                                        O -= 7
                                    }
                                    if (n.have + q > n.nlen + n.ndist) {
                                        k.msg = "invalid bit length repeat",
                                        n.mode = 30;
                                        break
                                    }
                                    for (; q--; )
                                        n.lens[n.have++] = r
                                }
                            }
                            if (n.mode === 30)
                                break;
                            if (n.lens[256] === 0) {
                                k.msg = "invalid code -- missing end-of-block",
                                n.mode = 30;
                                break
                            }
                            if (n.lenbits = 9,
                            M = {
                                bits: n.lenbits
                            },
                            D = _(E, n.lens, 0, n.nlen, n.lencode, 0, n.work, M),
                            n.lenbits = M.bits,
                            D) {
                                k.msg = "invalid literal/lengths set",
                                n.mode = 30;
                                break
                            }
                            if (n.distbits = 6,
                            n.distcode = n.distdyn,
                            M = {
                                bits: n.distbits
                            },
                            D = _(y, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, M),
                            n.distbits = M.bits,
                            D) {
                                k.msg = "invalid distances set",
                                n.mode = 30;
                                break
                            }
                            if (n.mode = 20,
                            L === 6)
                                break t;
                        case 20:
                            n.mode = 21;
                        case 21:
                            if (6 <= X && 258 <= tt) {
                                k.next_out = rt,
                                k.avail_out = tt,
                                k.next_in = W,
                                k.avail_in = X,
                                n.hold = z,
                                n.bits = O,
                                f(k, V),
                                rt = k.next_out,
                                et = k.output,
                                tt = k.avail_out,
                                W = k.next_in,
                                B = k.input,
                                X = k.avail_in,
                                z = n.hold,
                                O = n.bits,
                                n.mode === 12 && (n.back = -1);
                                break
                            }
                            for (n.back = 0; st = (p = n.lencode[z & (1 << n.lenbits) - 1]) >>> 16 & 255,
                            ut = 65535 & p,
                            !((it = p >>> 24) <= O); ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            if (st && !(240 & st)) {
                                for (ht = it,
                                gt = st,
                                ft = ut; st = (p = n.lencode[ft + ((z & (1 << ht + gt) - 1) >> ht)]) >>> 16 & 255,
                                ut = 65535 & p,
                                !(ht + (it = p >>> 24) <= O); ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                z >>>= ht,
                                O -= ht,
                                n.back += ht
                            }
                            if (z >>>= it,
                            O -= it,
                            n.back += it,
                            n.length = ut,
                            st === 0) {
                                n.mode = 26;
                                break
                            }
                            if (32 & st) {
                                n.back = -1,
                                n.mode = 12;
                                break
                            }
                            if (64 & st) {
                                k.msg = "invalid literal/length code",
                                n.mode = 30;
                                break
                            }
                            n.extra = 15 & st,
                            n.mode = 22;
                        case 22:
                            if (n.extra) {
                                for (g = n.extra; O < g; ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                n.length += z & (1 << n.extra) - 1,
                                z >>>= n.extra,
                                O -= n.extra,
                                n.back += n.extra
                            }
                            n.was = n.length,
                            n.mode = 23;
                        case 23:
                            for (; st = (p = n.distcode[z & (1 << n.distbits) - 1]) >>> 16 & 255,
                            ut = 65535 & p,
                            !((it = p >>> 24) <= O); ) {
                                if (X === 0)
                                    break t;
                                X--,
                                z += B[W++] << O,
                                O += 8
                            }
                            if (!(240 & st)) {
                                for (ht = it,
                                gt = st,
                                ft = ut; st = (p = n.distcode[ft + ((z & (1 << ht + gt) - 1) >> ht)]) >>> 16 & 255,
                                ut = 65535 & p,
                                !(ht + (it = p >>> 24) <= O); ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                z >>>= ht,
                                O -= ht,
                                n.back += ht
                            }
                            if (z >>>= it,
                            O -= it,
                            n.back += it,
                            64 & st) {
                                k.msg = "invalid distance code",
                                n.mode = 30;
                                break
                            }
                            n.offset = ut,
                            n.extra = 15 & st,
                            n.mode = 24;
                        case 24:
                            if (n.extra) {
                                for (g = n.extra; O < g; ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                n.offset += z & (1 << n.extra) - 1,
                                z >>>= n.extra,
                                O -= n.extra,
                                n.back += n.extra
                            }
                            if (n.offset > n.dmax) {
                                k.msg = "invalid distance too far back",
                                n.mode = 30;
                                break
                            }
                            n.mode = 25;
                        case 25:
                            if (tt === 0)
                                break t;
                            if (q = V - tt,
                            n.offset > q) {
                                if ((q = n.offset - q) > n.whave && n.sane) {
                                    k.msg = "invalid distance too far back",
                                    n.mode = 30;
                                    break
                                }
                                ot = q > n.wnext ? (q -= n.wnext,
                                n.wsize - q) : n.wnext - q,
                                q > n.length && (q = n.length),
                                ct = n.window
                            } else
                                ct = et,
                                ot = rt - n.offset,
                                q = n.length;
                            for (tt < q && (q = tt),
                            tt -= q,
                            n.length -= q; et[rt++] = ct[ot++],
                            --q; )
                                ;
                            n.length === 0 && (n.mode = 21);
                            break;
                        case 26:
                            if (tt === 0)
                                break t;
                            et[rt++] = n.length,
                            tt--,
                            n.mode = 21;
                            break;
                        case 27:
                            if (n.wrap) {
                                for (; O < 32; ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z |= B[W++] << O,
                                    O += 8
                                }
                                if (V -= tt,
                                k.total_out += V,
                                n.total += V,
                                V && (k.adler = n.check = n.flags ? a(n.check, et, V, rt - V) : o(n.check, et, V, rt - V)),
                                V = tt,
                                (n.flags ? z : c(z)) !== n.check) {
                                    k.msg = "incorrect data check",
                                    n.mode = 30;
                                    break
                                }
                                O = z = 0
                            }
                            n.mode = 28;
                        case 28:
                            if (n.wrap && n.flags) {
                                for (; O < 32; ) {
                                    if (X === 0)
                                        break t;
                                    X--,
                                    z += B[W++] << O,
                                    O += 8
                                }
                                if (z !== (4294967295 & n.total)) {
                                    k.msg = "incorrect length check",
                                    n.mode = 30;
                                    break
                                }
                                O = z = 0
                            }
                            n.mode = 29;
                        case 29:
                            D = 1;
                            break t;
                        case 30:
                            D = -3;
                            break t;
                        case 31:
                            return -4;
                        case 32:
                        default:
                            return d
                        }
                    return k.next_out = rt,
                    k.avail_out = tt,
                    k.next_in = W,
                    k.avail_in = X,
                    n.hold = z,
                    n.bits = O,
                    (n.wsize || V !== k.avail_out && n.mode < 30 && (n.mode < 27 || L !== 4)) && Q(k, k.output, k.next_out, V - k.avail_out) ? (n.mode = 31,
                    -4) : (J -= k.avail_in,
                    V -= k.avail_out,
                    k.total_in += J,
                    k.total_out += V,
                    n.total += V,
                    n.wrap && V && (k.adler = n.check = n.flags ? a(n.check, et, V, k.next_out - V) : o(n.check, et, V, k.next_out - V)),
                    k.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === 12 ? 128 : 0) + (n.mode === 20 || n.mode === 15 ? 256 : 0),
                    (J == 0 && V === 0 || L === 4) && D === w && (D = -5),
                    D)
                }
                ,
                h.inflateEnd = function(k) {
                    if (!k || !k.state)
                        return d;
                    var L = k.state;
                    return L.window && (L.window = null),
                    k.state = null,
                    w
                }
                ,
                h.inflateGetHeader = function(k, L) {
                    var n;
                    return k && k.state && 2 & (n = k.state).wrap ? ((n.head = L).done = !1,
                    w) : d
                }
                ,
                h.inflateSetDictionary = function(k, L) {
                    var n, B = L.length;
                    return k && k.state ? (n = k.state).wrap !== 0 && n.mode !== 11 ? d : n.mode === 11 && o(1, L, B, 0) !== n.check ? -3 : Q(k, L, B, B) ? (n.mode = 31,
                    -4) : (n.havedict = 1,
                    w) : d
                }
                ,
                h.inflateInfo = "pako inflate (from Nodeca project)"
            }
            , {
                "../utils/common": 41,
                "./adler32": 43,
                "./crc32": 45,
                "./inffast": 48,
                "./inftrees": 50
            }],
            50: [function(e, s, h) {
                var i = e("../utils/common")
                  , o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]
                  , a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]
                  , f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]
                  , _ = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                s.exports = function(E, y, w, d, v, l, m, c) {
                    var b, x, T, S, R, F, j, I, Z, Q = c.bits, k = 0, L = 0, n = 0, B = 0, et = 0, W = 0, rt = 0, X = 0, tt = 0, z = 0, O = null, J = 0, V = new i.Buf16(16), q = new i.Buf16(16), ot = null, ct = 0;
                    for (k = 0; k <= 15; k++)
                        V[k] = 0;
                    for (L = 0; L < d; L++)
                        V[y[w + L]]++;
                    for (et = Q,
                    B = 15; 1 <= B && V[B] === 0; B--)
                        ;
                    if (B < et && (et = B),
                    B === 0)
                        return v[l++] = 20971520,
                        v[l++] = 20971520,
                        c.bits = 1,
                        0;
                    for (n = 1; n < B && V[n] === 0; n++)
                        ;
                    for (et < n && (et = n),
                    k = X = 1; k <= 15; k++)
                        if (X <<= 1,
                        (X -= V[k]) < 0)
                            return -1;
                    if (0 < X && (E === 0 || B !== 1))
                        return -1;
                    for (q[1] = 0,
                    k = 1; k < 15; k++)
                        q[k + 1] = q[k] + V[k];
                    for (L = 0; L < d; L++)
                        y[w + L] !== 0 && (m[q[y[w + L]]++] = L);
                    if (F = E === 0 ? (O = ot = m,
                    19) : E === 1 ? (O = o,
                    J -= 257,
                    ot = a,
                    ct -= 257,
                    256) : (O = f,
                    ot = _,
                    -1),
                    k = n,
                    R = l,
                    rt = L = z = 0,
                    T = -1,
                    S = (tt = 1 << (W = et)) - 1,
                    E === 1 && 852 < tt || E === 2 && 592 < tt)
                        return 1;
                    for (; ; ) {
                        for (j = k - rt,
                        Z = m[L] < F ? (I = 0,
                        m[L]) : m[L] > F ? (I = ot[ct + m[L]],
                        O[J + m[L]]) : (I = 96,
                        0),
                        b = 1 << k - rt,
                        n = x = 1 << W; v[R + (z >> rt) + (x -= b)] = j << 24 | I << 16 | Z | 0,
                        x !== 0; )
                            ;
                        for (b = 1 << k - 1; z & b; )
                            b >>= 1;
                        if (b !== 0 ? (z &= b - 1,
                        z += b) : z = 0,
                        L++,
                        --V[k] == 0) {
                            if (k === B)
                                break;
                            k = y[w + m[L]]
                        }
                        if (et < k && (z & S) !== T) {
                            for (rt === 0 && (rt = et),
                            R += n,
                            X = 1 << (W = k - rt); W + rt < B && !((X -= V[W + rt]) <= 0); )
                                W++,
                                X <<= 1;
                            if (tt += 1 << W,
                            E === 1 && 852 < tt || E === 2 && 592 < tt)
                                return 1;
                            v[T = z & S] = et << 24 | W << 16 | R - l | 0
                        }
                    }
                    return z !== 0 && (v[R + z] = k - rt << 24 | 64 << 16 | 0),
                    c.bits = et,
                    0
                }
            }
            , {
                "../utils/common": 41
            }],
            51: [function(e, s, h) {
                s.exports = {
                    2: "need dictionary",
                    1: "stream end",
                    0: "",
                    "-1": "file error",
                    "-2": "stream error",
                    "-3": "data error",
                    "-4": "insufficient memory",
                    "-5": "buffer error",
                    "-6": "incompatible version"
                }
            }
            , {}],
            52: [function(e, s, h) {
                var i = e("../utils/common")
                  , o = 0
                  , a = 1;
                function f(p) {
                    for (var C = p.length; 0 <= --C; )
                        p[C] = 0
                }
                var _ = 0
                  , E = 29
                  , y = 256
                  , w = y + 1 + E
                  , d = 30
                  , v = 19
                  , l = 2 * w + 1
                  , m = 15
                  , c = 16
                  , b = 7
                  , x = 256
                  , T = 16
                  , S = 17
                  , R = 18
                  , F = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
                  , j = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
                  , I = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
                  , Z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
                  , Q = new Array(2 * (w + 2));
                f(Q);
                var k = new Array(2 * d);
                f(k);
                var L = new Array(512);
                f(L);
                var n = new Array(256);
                f(n);
                var B = new Array(E);
                f(B);
                var et, W, rt, X = new Array(d);
                function tt(p, C, P, N, A) {
                    this.static_tree = p,
                    this.extra_bits = C,
                    this.extra_base = P,
                    this.elems = N,
                    this.max_length = A,
                    this.has_stree = p && p.length
                }
                function z(p, C) {
                    this.dyn_tree = p,
                    this.max_code = 0,
                    this.stat_desc = C
                }
                function O(p) {
                    return p < 256 ? L[p] : L[256 + (p >>> 7)]
                }
                function J(p, C) {
                    p.pending_buf[p.pending++] = 255 & C,
                    p.pending_buf[p.pending++] = C >>> 8 & 255
                }
                function V(p, C, P) {
                    p.bi_valid > c - P ? (p.bi_buf |= C << p.bi_valid & 65535,
                    J(p, p.bi_buf),
                    p.bi_buf = C >> c - p.bi_valid,
                    p.bi_valid += P - c) : (p.bi_buf |= C << p.bi_valid & 65535,
                    p.bi_valid += P)
                }
                function q(p, C, P) {
                    V(p, P[2 * C], P[2 * C + 1])
                }
                function ot(p, C) {
                    for (var P = 0; P |= 1 & p,
                    p >>>= 1,
                    P <<= 1,
                    0 < --C; )
                        ;
                    return P >>> 1
                }
                function ct(p, C, P) {
                    var N, A, Y = new Array(m + 1), G = 0;
                    for (N = 1; N <= m; N++)
                        Y[N] = G = G + P[N - 1] << 1;
                    for (A = 0; A <= C; A++) {
                        var H = p[2 * A + 1];
                        H !== 0 && (p[2 * A] = ot(Y[H]++, H))
                    }
                }
                function it(p) {
                    var C;
                    for (C = 0; C < w; C++)
                        p.dyn_ltree[2 * C] = 0;
                    for (C = 0; C < d; C++)
                        p.dyn_dtree[2 * C] = 0;
                    for (C = 0; C < v; C++)
                        p.bl_tree[2 * C] = 0;
                    p.dyn_ltree[2 * x] = 1,
                    p.opt_len = p.static_len = 0,
                    p.last_lit = p.matches = 0
                }
                function st(p) {
                    8 < p.bi_valid ? J(p, p.bi_buf) : 0 < p.bi_valid && (p.pending_buf[p.pending++] = p.bi_buf),
                    p.bi_buf = 0,
                    p.bi_valid = 0
                }
                function ut(p, C, P, N) {
                    var A = 2 * C
                      , Y = 2 * P;
                    return p[A] < p[Y] || p[A] === p[Y] && N[C] <= N[P]
                }
                function ht(p, C, P) {
                    for (var N = p.heap[P], A = P << 1; A <= p.heap_len && (A < p.heap_len && ut(C, p.heap[A + 1], p.heap[A], p.depth) && A++,
                    !ut(C, N, p.heap[A], p.depth)); )
                        p.heap[P] = p.heap[A],
                        P = A,
                        A <<= 1;
                    p.heap[P] = N
                }
                function gt(p, C, P) {
                    var N, A, Y, G, H = 0;
                    if (p.last_lit !== 0)
                        for (; N = p.pending_buf[p.d_buf + 2 * H] << 8 | p.pending_buf[p.d_buf + 2 * H + 1],
                        A = p.pending_buf[p.l_buf + H],
                        H++,
                        N === 0 ? q(p, A, C) : (q(p, (Y = n[A]) + y + 1, C),
                        (G = F[Y]) !== 0 && V(p, A -= B[Y], G),
                        q(p, Y = O(--N), P),
                        (G = j[Y]) !== 0 && V(p, N -= X[Y], G)),
                        H < p.last_lit; )
                            ;
                    q(p, x, C)
                }
                function ft(p, C) {
                    var P, N, A, Y = C.dyn_tree, G = C.stat_desc.static_tree, H = C.stat_desc.has_stree, K = C.stat_desc.elems, at = -1;
                    for (p.heap_len = 0,
                    p.heap_max = l,
                    P = 0; P < K; P++)
                        Y[2 * P] !== 0 ? (p.heap[++p.heap_len] = at = P,
                        p.depth[P] = 0) : Y[2 * P + 1] = 0;
                    for (; p.heap_len < 2; )
                        Y[2 * (A = p.heap[++p.heap_len] = at < 2 ? ++at : 0)] = 1,
                        p.depth[A] = 0,
                        p.opt_len--,
                        H && (p.static_len -= G[2 * A + 1]);
                    for (C.max_code = at,
                    P = p.heap_len >> 1; 1 <= P; P--)
                        ht(p, Y, P);
                    for (A = K; P = p.heap[1],
                    p.heap[1] = p.heap[p.heap_len--],
                    ht(p, Y, 1),
                    N = p.heap[1],
                    p.heap[--p.heap_max] = P,
                    p.heap[--p.heap_max] = N,
                    Y[2 * A] = Y[2 * P] + Y[2 * N],
                    p.depth[A] = (p.depth[P] >= p.depth[N] ? p.depth[P] : p.depth[N]) + 1,
                    Y[2 * P + 1] = Y[2 * N + 1] = A,
                    p.heap[1] = A++,
                    ht(p, Y, 1),
                    2 <= p.heap_len; )
                        ;
                    p.heap[--p.heap_max] = p.heap[1],
                    function(nt, dt) {
                        var kt, bt, Et, lt, Tt, Ft, yt = dt.dyn_tree, Rt = dt.max_code, Xt = dt.stat_desc.static_tree, Yt = dt.stat_desc.has_stree, Zt = dt.stat_desc.extra_bits, Dt = dt.stat_desc.extra_base, Ct = dt.stat_desc.max_length, At = 0;
                        for (lt = 0; lt <= m; lt++)
                            nt.bl_count[lt] = 0;
                        for (yt[2 * nt.heap[nt.heap_max] + 1] = 0,
                        kt = nt.heap_max + 1; kt < l; kt++)
                            Ct < (lt = yt[2 * yt[2 * (bt = nt.heap[kt]) + 1] + 1] + 1) && (lt = Ct,
                            At++),
                            yt[2 * bt + 1] = lt,
                            Rt < bt || (nt.bl_count[lt]++,
                            Tt = 0,
                            Dt <= bt && (Tt = Zt[bt - Dt]),
                            Ft = yt[2 * bt],
                            nt.opt_len += Ft * (lt + Tt),
                            Yt && (nt.static_len += Ft * (Xt[2 * bt + 1] + Tt)));
                        if (At !== 0) {
                            do {
                                for (lt = Ct - 1; nt.bl_count[lt] === 0; )
                                    lt--;
                                nt.bl_count[lt]--,
                                nt.bl_count[lt + 1] += 2,
                                nt.bl_count[Ct]--,
                                At -= 2
                            } while (0 < At);
                            for (lt = Ct; lt !== 0; lt--)
                                for (bt = nt.bl_count[lt]; bt !== 0; )
                                    Rt < (Et = nt.heap[--kt]) || (yt[2 * Et + 1] !== lt && (nt.opt_len += (lt - yt[2 * Et + 1]) * yt[2 * Et],
                                    yt[2 * Et + 1] = lt),
                                    bt--)
                        }
                    }(p, C),
                    ct(Y, at, p.bl_count)
                }
                function r(p, C, P) {
                    var N, A, Y = -1, G = C[1], H = 0, K = 7, at = 4;
                    for (G === 0 && (K = 138,
                    at = 3),
                    C[2 * (P + 1) + 1] = 65535,
                    N = 0; N <= P; N++)
                        A = G,
                        G = C[2 * (N + 1) + 1],
                        ++H < K && A === G || (H < at ? p.bl_tree[2 * A] += H : A !== 0 ? (A !== Y && p.bl_tree[2 * A]++,
                        p.bl_tree[2 * T]++) : H <= 10 ? p.bl_tree[2 * S]++ : p.bl_tree[2 * R]++,
                        Y = A,
                        at = (H = 0) === G ? (K = 138,
                        3) : A === G ? (K = 6,
                        3) : (K = 7,
                        4))
                }
                function D(p, C, P) {
                    var N, A, Y = -1, G = C[1], H = 0, K = 7, at = 4;
                    for (G === 0 && (K = 138,
                    at = 3),
                    N = 0; N <= P; N++)
                        if (A = G,
                        G = C[2 * (N + 1) + 1],
                        !(++H < K && A === G)) {
                            if (H < at)
                                for (; q(p, A, p.bl_tree),
                                --H != 0; )
                                    ;
                            else
                                A !== 0 ? (A !== Y && (q(p, A, p.bl_tree),
                                H--),
                                q(p, T, p.bl_tree),
                                V(p, H - 3, 2)) : H <= 10 ? (q(p, S, p.bl_tree),
                                V(p, H - 3, 3)) : (q(p, R, p.bl_tree),
                                V(p, H - 11, 7));
                            Y = A,
                            at = (H = 0) === G ? (K = 138,
                            3) : A === G ? (K = 6,
                            3) : (K = 7,
                            4)
                        }
                }
                f(X);
                var M = !1;
                function g(p, C, P, N) {
                    V(p, (_ << 1) + (N ? 1 : 0), 3),
                    function(A, Y, G, H) {
                        st(A),
                        J(A, G),
                        J(A, ~G),
                        i.arraySet(A.pending_buf, A.window, Y, G, A.pending),
                        A.pending += G
                    }(p, C, P)
                }
                h._tr_init = function(p) {
                    M || (function() {
                        var C, P, N, A, Y, G = new Array(m + 1);
                        for (A = N = 0; A < E - 1; A++)
                            for (B[A] = N,
                            C = 0; C < 1 << F[A]; C++)
                                n[N++] = A;
                        for (n[N - 1] = A,
                        A = Y = 0; A < 16; A++)
                            for (X[A] = Y,
                            C = 0; C < 1 << j[A]; C++)
                                L[Y++] = A;
                        for (Y >>= 7; A < d; A++)
                            for (X[A] = Y << 7,
                            C = 0; C < 1 << j[A] - 7; C++)
                                L[256 + Y++] = A;
                        for (P = 0; P <= m; P++)
                            G[P] = 0;
                        for (C = 0; C <= 143; )
                            Q[2 * C + 1] = 8,
                            C++,
                            G[8]++;
                        for (; C <= 255; )
                            Q[2 * C + 1] = 9,
                            C++,
                            G[9]++;
                        for (; C <= 279; )
                            Q[2 * C + 1] = 7,
                            C++,
                            G[7]++;
                        for (; C <= 287; )
                            Q[2 * C + 1] = 8,
                            C++,
                            G[8]++;
                        for (ct(Q, w + 1, G),
                        C = 0; C < d; C++)
                            k[2 * C + 1] = 5,
                            k[2 * C] = ot(C, 5);
                        et = new tt(Q,F,y + 1,w,m),
                        W = new tt(k,j,0,d,m),
                        rt = new tt(new Array(0),I,0,v,b)
                    }(),
                    M = !0),
                    p.l_desc = new z(p.dyn_ltree,et),
                    p.d_desc = new z(p.dyn_dtree,W),
                    p.bl_desc = new z(p.bl_tree,rt),
                    p.bi_buf = 0,
                    p.bi_valid = 0,
                    it(p)
                }
                ,
                h._tr_stored_block = g,
                h._tr_flush_block = function(p, C, P, N) {
                    var A, Y, G = 0;
                    0 < p.level ? (p.strm.data_type === 2 && (p.strm.data_type = function(H) {
                        var K, at = 4093624447;
                        for (K = 0; K <= 31; K++,
                        at >>>= 1)
                            if (1 & at && H.dyn_ltree[2 * K] !== 0)
                                return o;
                        if (H.dyn_ltree[18] !== 0 || H.dyn_ltree[20] !== 0 || H.dyn_ltree[26] !== 0)
                            return a;
                        for (K = 32; K < y; K++)
                            if (H.dyn_ltree[2 * K] !== 0)
                                return a;
                        return o
                    }(p)),
                    ft(p, p.l_desc),
                    ft(p, p.d_desc),
                    G = function(H) {
                        var K;
                        for (r(H, H.dyn_ltree, H.l_desc.max_code),
                        r(H, H.dyn_dtree, H.d_desc.max_code),
                        ft(H, H.bl_desc),
                        K = v - 1; 3 <= K && H.bl_tree[2 * Z[K] + 1] === 0; K--)
                            ;
                        return H.opt_len += 3 * (K + 1) + 5 + 5 + 4,
                        K
                    }(p),
                    A = p.opt_len + 3 + 7 >>> 3,
                    (Y = p.static_len + 3 + 7 >>> 3) <= A && (A = Y)) : A = Y = P + 5,
                    P + 4 <= A && C !== -1 ? g(p, C, P, N) : p.strategy === 4 || Y === A ? (V(p, 2 + (N ? 1 : 0), 3),
                    gt(p, Q, k)) : (V(p, 4 + (N ? 1 : 0), 3),
                    function(H, K, at, nt) {
                        var dt;
                        for (V(H, K - 257, 5),
                        V(H, at - 1, 5),
                        V(H, nt - 4, 4),
                        dt = 0; dt < nt; dt++)
                            V(H, H.bl_tree[2 * Z[dt] + 1], 3);
                        D(H, H.dyn_ltree, K - 1),
                        D(H, H.dyn_dtree, at - 1)
                    }(p, p.l_desc.max_code + 1, p.d_desc.max_code + 1, G + 1),
                    gt(p, p.dyn_ltree, p.dyn_dtree)),
                    it(p),
                    N && st(p)
                }
                ,
                h._tr_tally = function(p, C, P) {
                    return p.pending_buf[p.d_buf + 2 * p.last_lit] = C >>> 8 & 255,
                    p.pending_buf[p.d_buf + 2 * p.last_lit + 1] = 255 & C,
                    p.pending_buf[p.l_buf + p.last_lit] = 255 & P,
                    p.last_lit++,
                    C === 0 ? p.dyn_ltree[2 * P]++ : (p.matches++,
                    C--,
                    p.dyn_ltree[2 * (n[P] + y + 1)]++,
                    p.dyn_dtree[2 * O(C)]++),
                    p.last_lit === p.lit_bufsize - 1
                }
                ,
                h._tr_align = function(p) {
                    V(p, 2, 3),
                    q(p, x, Q),
                    function(C) {
                        C.bi_valid === 16 ? (J(C, C.bi_buf),
                        C.bi_buf = 0,
                        C.bi_valid = 0) : 8 <= C.bi_valid && (C.pending_buf[C.pending++] = 255 & C.bi_buf,
                        C.bi_buf >>= 8,
                        C.bi_valid -= 8)
                    }(p)
                }
            }
            , {
                "../utils/common": 41
            }],
            53: [function(e, s, h) {
                s.exports = function() {
                    this.input = null,
                    this.next_in = 0,
                    this.avail_in = 0,
                    this.total_in = 0,
                    this.output = null,
                    this.next_out = 0,
                    this.avail_out = 0,
                    this.total_out = 0,
                    this.msg = "",
                    this.state = null,
                    this.data_type = 2,
                    this.adler = 0
                }
            }
            , {}],
            54: [function(e, s, h) {
                (function(i) {
                    (function(o, a) {
                        if (!o.setImmediate) {
                            var f, _, E, y, w = 1, d = {}, v = !1, l = o.document, m = Object.getPrototypeOf && Object.getPrototypeOf(o);
                            m = m && m.setTimeout ? m : o,
                            f = {}.toString.call(o.process) === "[object process]" ? function(T) {
                                process.nextTick(function() {
                                    b(T)
                                })
                            }
                            : function() {
                                if (o.postMessage && !o.importScripts) {
                                    var T = !0
                                      , S = o.onmessage;
                                    return o.onmessage = function() {
                                        T = !1
                                    }
                                    ,
                                    o.postMessage("", "*"),
                                    o.onmessage = S,
                                    T
                                }
                            }() ? (y = "setImmediate$" + Math.random() + "$",
                            o.addEventListener ? o.addEventListener("message", x, !1) : o.attachEvent("onmessage", x),
                            function(T) {
                                o.postMessage(y + T, "*")
                            }
                            ) : o.MessageChannel ? ((E = new MessageChannel).port1.onmessage = function(T) {
                                b(T.data)
                            }
                            ,
                            function(T) {
                                E.port2.postMessage(T)
                            }
                            ) : l && "onreadystatechange"in l.createElement("script") ? (_ = l.documentElement,
                            function(T) {
                                var S = l.createElement("script");
                                S.onreadystatechange = function() {
                                    b(T),
                                    S.onreadystatechange = null,
                                    _.removeChild(S),
                                    S = null
                                }
                                ,
                                _.appendChild(S)
                            }
                            ) : function(T) {
                                setTimeout(b, 0, T)
                            }
                            ,
                            m.setImmediate = function(T) {
                                typeof T != "function" && (T = new Function("" + T));
                                for (var S = new Array(arguments.length - 1), R = 0; R < S.length; R++)
                                    S[R] = arguments[R + 1];
                                var F = {
                                    callback: T,
                                    args: S
                                };
                                return d[w] = F,
                                f(w),
                                w++
                            }
                            ,
                            m.clearImmediate = c
                        }
                        function c(T) {
                            delete d[T]
                        }
                        function b(T) {
                            if (v)
                                setTimeout(b, 0, T);
                            else {
                                var S = d[T];
                                if (S) {
                                    v = !0;
                                    try {
                                        (function(R) {
                                            var F = R.callback
                                              , j = R.args;
                                            switch (j.length) {
                                            case 0:
                                                F();
                                                break;
                                            case 1:
                                                F(j[0]);
                                                break;
                                            case 2:
                                                F(j[0], j[1]);
                                                break;
                                            case 3:
                                                F(j[0], j[1], j[2]);
                                                break;
                                            default:
                                                F.apply(a, j)
                                            }
                                        }
                                        )(S)
                                    } finally {
                                        c(T),
                                        v = !1
                                    }
                                }
                            }
                        }
                        function x(T) {
                            T.source === o && typeof T.data == "string" && T.data.indexOf(y) === 0 && b(+T.data.slice(y.length))
                        }
                    }
                    )(typeof self == "undefined" ? i === void 0 ? this : i : self)
                }
                ).call(this, typeof Ot != "undefined" ? Ot : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {})
            }
            , {}]
        }, {}, [10])(10)
    })
}
)(Wt);
var oe = Wt.exports;
const fe = Gt(oe);
export {Lt as D, St as F, jt as I, It as L, vt as M, Mt as O, _t as T, Nt as X, mt as b, zt as c, ue as e, pt as g, de as n, U as o, ce as r, fe as x};
//# sourceMappingURL=jszip.min-CyYQaS4k.js.mapvar g = (h, e, t) => new Promise( (i, s) => {
    var o = r => {
        try {
            a(t.next(r))
        } catch (u) {
            s(u)
        }
    }
      , n = r => {
        try {
            a(t.throw(r))
        } catch (u) {
            s(u)
        }
    }
      , a = r => r.done ? i(r.value) : Promise.resolve(r.value).then(o, n);
    a((t = t.apply(h, e)).next())
}
);
import {w as l} from "./utils-BACTbHDn.js";
import {S as c, C as p, P as m, T as I} from "./config.constant-BTOtLmfz.js";
import {N as d} from "./notifications.constant-CpYlRevd.js";
import {p as b} from "./sha256-DHPrLCgn.js";
import {g as A, f as E, a as f} from "./imaios-global-BEKmHNS5.js";
class y {
    constructor() {
        this.isInitialized = !1,
        this.subscriber = new b.Subscriber("login-management-subscriber"),
        this.onConnectionCheckFinished = () => g(this, null, function*() {}),
        this.awaitableConnection = new Promise(e => this.onConnectionCheckFinished = e),
        window.addEventListener("DOMContentLoaded", e => {
            this.subscribeToEvents()
        }
        ),
        window.addEventListener("pageshow", e => {
            e.persisted && (imaios.store("are-credentials-reliable", !1),
            this.loadLogin()),
            (e.persisted || typeof window.performance != "undefined" && window.performance.getEntriesByType("navigation").some(t => t.type === "back_forward")) && A("guard:user-connected") && (this.isConnected() || window.location.reload()),
            this.subscribeToEvents()
        }
        ),
        window.addEventListener("pagehide", () => {
            imaios.store("are-credentials-reliable", !1),
            this.unsubscribe()
        }
        ),
        this.subscribeToEvents()
    }
    isConnected() {
        return this.getEmailFromStorage() !== null
    }
    getUserInformation() {
        return new Promise( (e, t) => {
            const i = "vw=" + document.documentElement.clientWidth + "&vh=" + document.documentElement.clientHeight + "&dw=" + window.screen.width + "&dh=" + window.screen.height;
            E(`/${imaios.getSiteAccess()}/api/user/information?${i}`).then(s => s.json()).then(s => e(s)).catch( () => t()).finally( () => this.onConnectionCheckFinished())
        }
        )
    }
    loadLogin() {
        this.checkExpire(),
        l.get(c.IMAIOS_USER_INFORMATION) === null ? this.getUserInformation().then(e => {
            typeof e == "object" && Object.keys(e).length > 0 ? (this.addLoginToStorage(e),
            this.replaceUserInformation()) : this.displayLoggedOutInformation(),
            this.hidePlaceholderAndDisplayUserInformation(),
            window.imaios.pubsub.publish(d.USER_INFORMATIONS_AVAILABLE, l.get(c.IMAIOS_USER_INFORMATION)),
            imaios.store("are-credentials-reliable", !0)
        }
        ).catch( () => {
            this.hidePlaceholderAndDisplayUserInformation(),
            this.displayLoggedOutInformation(),
            imaios.store("are-credentials-reliable", !1)
        }
        ) : (this.hidePlaceholderAndDisplayUserInformation(),
        this.replaceUserInformation(),
        window.imaios.pubsub.publish(d.USER_INFORMATIONS_AVAILABLE, l.get(c.IMAIOS_USER_INFORMATION)),
        imaios.store("are-credentials-reliable", !0),
        this.onConnectionCheckFinished())
    }
    replaceUserInformation() {
        var s;
        this.updateAccessViaThirdPartyCookie();
        const e = this.getEmailFromStorage()
          , t = this.getNameFromStorage();
        if (e !== null) {
            const o = this.getIsLoginAsFromStorage();
            this.replaceUserEmail(e, o)
        } else
            this.displayLoggedOutInformation();
        t !== null && this.replaceUserName(t);
        let i = f(p.THIRD_PARTY_PROVIDER);
        if (i)
            try {
                i = JSON.parse(decodeURIComponent(i)),
                i !== null && typeof i.provider != "undefined" && this.replaceInstituteIfExist(i.provider, !0)
            } catch (o) {}
        else {
            const o = this.getLocalUserData()
              , n = this.getInstituteFromStorage();
            n !== null && this.replaceInstituteIfExist(n, (s = o.isIp) != null ? s : !1)
        }
    }
    replaceUserName(e) {
        const t = document.getElementById("user-name-account")
          , i = document.getElementById("user-name-account-avatar");
        t && i && e.firstName.length > 0 && e.lastName.length > 0 && (t.innerText = e.firstName + " " + e.lastName,
        i.innerHTML = `<p class="mb-0 text-xl text-center">${e.firstName[0] + e.lastName[0]}</p>`)
    }
    replaceUserEmail(e, t) {
        if (this.toggleDisplayLoginElements(),
        e !== null) {
            const i = document.querySelectorAll(".imaios-login-logged-out");
            for (let n = 0; n < i.length; n++)
                i[n].classList.add("d-none");
            const s = document.querySelectorAll(".imaios-login-logged-in");
            for (let n = 0; n < s.length; n++)
                s[n].classList.remove("d-none");
            const o = document.querySelectorAll(".imaios-login");
            if (o.length > 0) {
                const n = t ? "LOGGED IN AS " : "";
                for (let a = 0; a < o.length; a++)
                    if (o[a].classList.contains("imaios-login-mobile")) {
                        const r = e.split("");
                        let u = r.slice(0, r.indexOf("@"));
                        o[a].innerText = n + u.join("")
                    } else
                        o[a].innerText = n + e
            }
        }
    }
    toggleDisplayLoginElements() {
        const e = document.querySelectorAll(".imaios-login-logged-in");
        for (let t = 0; t < e.length; t++)
            e[t].style.setProperty("display", "")
    }
    getLocalUserData() {
        var e;
        return (e = l.get(c.IMAIOS_USER_INFORMATION)) != null ? e : null
    }
    getEmailFromStorage() {
        const e = this.getLocalUserData();
        return e !== null ? e.email : null
    }
    getNameFromStorage() {
        const e = this.getLocalUserData();
        return e !== null && e.firstName !== null && e.lastName !== null ? {
            firstName: e.firstName,
            lastName: e.lastName
        } : null
    }
    getIsLoginAsFromStorage() {
        const e = this.getLocalUserData();
        return e !== null ? !!e.is_login_as : !1
    }
    getInstituteFromStorage() {
        const e = this.getLocalUserData();
        return e !== null ? e.b2b_customer_name : null
    }
    addLoginToStorage(e) {
        l.add(c.IMAIOS_USER_INFORMATION, e),
        this.onConnectionCheckFinished()
    }
    unsubscribe() {
        this.subscriber.unsubscribeFromPublisherId(imaios.pubsub.getId()),
        this.isInitialized = !1
    }
    subscribeToEvents() {
        if (!this.isInitialized) {
            this.isInitialized = !0,
            this.subscriber.subscribe(imaios.pubsub, d.LOGOUT, () => {
                l.remove(c.IMAIOS_USER_INFORMATION),
                imaios.store("is-connected", !1)
            }
            ),
            this.subscriber.subscribe(imaios.pubsub, d.IS_REQUIRING_REFRESH_USER_INFO, () => {
                l.remove(c.IMAIOS_USER_INFORMATION),
                this.loadLogin()
            }
            );
            const e = document.querySelectorAll(".imaios-login-logged-out a");
            for (let t = 0; t < e.length; t++)
                e[t].addEventListener("click", i => {
                    imaios.pubsub.publish(d.LOGOUT)
                }
                );
            imaios.pubsub.publish(d.LOGIN_MANAGER_READY, this)
        }
    }
    checkExpire() {
        l.checkExpire(c.IMAIOS_USER_INFORMATION)
    }
    replaceInstituteIfExist(e, t=!1) {
        if (e !== null && t) {
            const i = document.querySelectorAll(".imaios-institute");
            for (let s = 0; s < i.length; s++) {
                i[s].style.setProperty("display", "");
                const o = i[s].querySelector(".imaios-institute-text");
                o !== null && (o.innerText = e)
            }
        }
    }
    haveAccessToProduct(e) {
        const t = this.getLocalUserData();
        return t !== null ? typeof t.access[e] != "undefined" : !1
    }
    deleteSubscriptionsTags() {
        this.haveAccessToProduct(m.E_ANATOMY) && this.deleteSubscriptionsTagsByApplication(m.E_ANATOMY),
        this.haveAccessToProduct(m.VET_ANATOMY) && this.deleteSubscriptionsTagsByApplication(m.VET_ANATOMY)
    }
    deleteSubscriptionsTagsByApplication(e) {
        const t = document.querySelectorAll(`.imaios-anatomy-subscription-tag-${e === m.E_ANATOMY ? "eanatomy" : "vetanatomy"}`);
        for (let i = 0; i < t.length; i++)
            t[i].style.setProperty("display", "none", "important")
    }
    hidePlaceholderAndDisplayUserInformation() {
        imaios.store("is-connected", this.isConnected());
        const e = document.querySelectorAll(".imaios-placeholder-animated");
        for (let i = 0; i < e.length; i++)
            e[i].style.setProperty("display", "none", "important");
        const t = document.querySelectorAll(".user-information");
        for (let i = 0; i < t.length; i++)
            t[i].style.setProperty("display", "")
    }
    displayLoggedOutInformation() {
        const e = document.querySelectorAll(".imaios-login-logged-out");
        for (let i = 0; i < e.length; i++)
            e[i].style.setProperty("display", ""),
            e[i].classList.remove("d-none");
        const t = document.querySelectorAll(".imaios-login-logged-in");
        for (let i = 0; i < t.length; i++)
            t[i].classList.add("d-none")
    }
    getUserAccess() {
        return g(this, null, function*() {
            if (this.checkExpire(),
            l.get(c.IMAIOS_USER_INFORMATION) === null)
                try {
                    const t = yield this.getUserInformation();
                    typeof t == "object" && Object.keys(t).length > 0 && this.addLoginToStorage(t)
                } catch (t) {
                    return {}
                }
            const e = this.getLocalUserData();
            return e !== null ? e.access : {}
        })
    }
    updateAccessViaThirdPartyCookie() {
        let e = f(p.THIRD_PARTY_PROVIDER);
        if (e) {
            e = JSON.parse(decodeURIComponent(e));
            const t = this.getLocalUserData();
            t !== null && (e.product.split(",").forEach(i => {
                t.access[I[i.toUpperCase()]] = {
                    group_premium: !0
                }
            }
            ),
            this.addLoginToStorage(t))
        }
    }
    awaitConnection() {
        return g(this, null, function*() {
            if (!imaios.get("are-credentials-reliable"))
                return yield this.awaitableConnection
        })
    }
}
const R = new y;
export {R as L};
//# sourceMappingURL=login-management-service-AsiTy0FF.js.map

