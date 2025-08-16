var mo = Object.defineProperty
  , go = Object.defineProperties;
var yo = Object.getOwnPropertyDescriptors;
var br = Object.getOwnPropertySymbols;
var bo = Object.prototype.hasOwnProperty
  , ko = Object.prototype.propertyIsEnumerable;
var kr = (r, e, t) => e in r ? mo(r, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : r[e] = t
  , k = (r, e) => {
    for (var t in e || (e = {}))
        bo.call(e, t) && kr(r, t, e[t]);
    if (br)
        for (var t of br(e))
            ko.call(e, t) && kr(r, t, e[t]);
    return r
}
  , B = (r, e) => go(r, yo(e));
function $(r) {
    this.content = r
}
$.prototype = {
    constructor: $,
    find: function(r) {
        for (var e = 0; e < this.content.length; e += 2)
            if (this.content[e] === r)
                return e;
        return -1
    },
    get: function(r) {
        var e = this.find(r);
        return e == -1 ? void 0 : this.content[e + 1]
    },
    update: function(r, e, t) {
        var n = t && t != r ? this.remove(t) : this
          , i = n.find(r)
          , s = n.content.slice();
        return i == -1 ? s.push(t || r, e) : (s[i + 1] = e,
        t && (s[i] = t)),
        new $(s)
    },
    remove: function(r) {
        var e = this.find(r);
        if (e == -1)
            return this;
        var t = this.content.slice();
        return t.splice(e, 2),
        new $(t)
    },
    addToStart: function(r, e) {
        return new $([r, e].concat(this.remove(r).content))
    },
    addToEnd: function(r, e) {
        var t = this.remove(r).content.slice();
        return t.push(r, e),
        new $(t)
    },
    addBefore: function(r, e, t) {
        var n = this.remove(e)
          , i = n.content.slice()
          , s = n.find(r);
        return i.splice(s == -1 ? i.length : s, 0, e, t),
        new $(i)
    },
    forEach: function(r) {
        for (var e = 0; e < this.content.length; e += 2)
            r(this.content[e], this.content[e + 1])
    },
    prepend: function(r) {
        return r = $.from(r),
        r.size ? new $(r.content.concat(this.subtract(r).content)) : this
    },
    append: function(r) {
        return r = $.from(r),
        r.size ? new $(this.subtract(r).content.concat(r.content)) : this
    },
    subtract: function(r) {
        var e = this;
        r = $.from(r);
        for (var t = 0; t < r.content.length; t += 2)
            e = e.remove(r.content[t]);
        return e
    },
    toObject: function() {
        var r = {};
        return this.forEach(function(e, t) {
            r[e] = t
        }),
        r
    },
    get size() {
        return this.content.length >> 1
    }
};
$.from = function(r) {
    if (r instanceof $)
        return r;
    var e = [];
    if (r)
        for (var t in r)
            e.push(t, r[t]);
    return new $(e)
}
;
function Di(r, e, t) {
    for (let n = 0; ; n++) {
        if (n == r.childCount || n == e.childCount)
            return r.childCount == e.childCount ? null : t;
        let i = r.child(n)
          , s = e.child(n);
        if (i == s) {
            t += i.nodeSize;
            continue
        }
        if (!i.sameMarkup(s))
            return t;
        if (i.isText && i.text != s.text) {
            for (let o = 0; i.text[o] == s.text[o]; o++)
                t++;
            return t
        }
        if (i.content.size || s.content.size) {
            let o = Di(i.content, s.content, t + 1);
            if (o != null)
                return o
        }
        t += i.nodeSize
    }
}
function Ai(r, e, t, n) {
    for (let i = r.childCount, s = e.childCount; ; ) {
        if (i == 0 || s == 0)
            return i == s ? null : {
                a: t,
                b: n
            };
        let o = r.child(--i)
          , l = e.child(--s)
          , a = o.nodeSize;
        if (o == l) {
            t -= a,
            n -= a;
            continue
        }
        if (!o.sameMarkup(l))
            return {
                a: t,
                b: n
            };
        if (o.isText && o.text != l.text) {
            let c = 0
              , d = Math.min(o.text.length, l.text.length);
            for (; c < d && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
                c++,
                t--,
                n--;
            return {
                a: t,
                b: n
            }
        }
        if (o.content.size || l.content.size) {
            let c = Ai(o.content, l.content, t - 1, n - 1);
            if (c)
                return c
        }
        t -= a,
        n -= a
    }
}
class b {
    constructor(e, t) {
        if (this.content = e,
        this.size = t || 0,
        t == null)
            for (let n = 0; n < e.length; n++)
                this.size += e[n].nodeSize
    }
    nodesBetween(e, t, n, i=0, s) {
        for (let o = 0, l = 0; l < t; o++) {
            let a = this.content[o]
              , c = l + a.nodeSize;
            if (c > e && n(a, i + l, s || null, o) !== !1 && a.content.size) {
                let d = l + 1;
                a.nodesBetween(Math.max(0, e - d), Math.min(a.content.size, t - d), n, i + d)
            }
            l = c
        }
    }
    descendants(e) {
        this.nodesBetween(0, this.size, e)
    }
    textBetween(e, t, n, i) {
        let s = ""
          , o = !0;
        return this.nodesBetween(e, t, (l, a) => {
            let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
            l.isBlock && (l.isLeaf && c || l.isTextblock) && n && (o ? o = !1 : s += n),
            s += c
        }
        , 0),
        s
    }
    append(e) {
        if (!e.size)
            return this;
        if (!this.size)
            return e;
        let t = this.lastChild
          , n = e.firstChild
          , i = this.content.slice()
          , s = 0;
        for (t.isText && t.sameMarkup(n) && (i[i.length - 1] = t.withText(t.text + n.text),
        s = 1); s < e.content.length; s++)
            i.push(e.content[s]);
        return new b(i,this.size + e.size)
    }
    cut(e, t=this.size) {
        if (e == 0 && t == this.size)
            return this;
        let n = []
          , i = 0;
        if (t > e)
            for (let s = 0, o = 0; o < t; s++) {
                let l = this.content[s]
                  , a = o + l.nodeSize;
                a > e && ((o < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, t - o - 1))),
                n.push(l),
                i += l.nodeSize),
                o = a
            }
        return new b(n,i)
    }
    cutByIndex(e, t) {
        return e == t ? b.empty : e == 0 && t == this.content.length ? this : new b(this.content.slice(e, t))
    }
    replaceChild(e, t) {
        let n = this.content[e];
        if (n == t)
            return this;
        let i = this.content.slice()
          , s = this.size + t.nodeSize - n.nodeSize;
        return i[e] = t,
        new b(i,s)
    }
    addToStart(e) {
        return new b([e].concat(this.content),this.size + e.nodeSize)
    }
    addToEnd(e) {
        return new b(this.content.concat(e),this.size + e.nodeSize)
    }
    eq(e) {
        if (this.content.length != e.content.length)
            return !1;
        for (let t = 0; t < this.content.length; t++)
            if (!this.content[t].eq(e.content[t]))
                return !1;
        return !0
    }
    get firstChild() {
        return this.content.length ? this.content[0] : null
    }
    get lastChild() {
        return this.content.length ? this.content[this.content.length - 1] : null
    }
    get childCount() {
        return this.content.length
    }
    child(e) {
        let t = this.content[e];
        if (!t)
            throw new RangeError("Index " + e + " out of range for " + this);
        return t
    }
    maybeChild(e) {
        return this.content[e] || null
    }
    forEach(e) {
        for (let t = 0, n = 0; t < this.content.length; t++) {
            let i = this.content[t];
            e(i, n, t),
            n += i.nodeSize
        }
    }
    findDiffStart(e, t=0) {
        return Di(this, e, t)
    }
    findDiffEnd(e, t=this.size, n=e.size) {
        return Ai(this, e, t, n)
    }
    findIndex(e) {
        if (e == 0)
            return Tt(0, e);
        if (e == this.size)
            return Tt(this.content.length, e);
        if (e > this.size || e < 0)
            throw new RangeError(`Position ${e} outside of fragment (${this})`);
        for (let t = 0, n = 0; ; t++) {
            let i = this.child(t)
              , s = n + i.nodeSize;
            if (s >= e)
                return s == e ? Tt(t + 1, s) : Tt(t, n);
            n = s
        }
    }
    toString() {
        return "<" + this.toStringInner() + ">"
    }
    toStringInner() {
        return this.content.join(", ")
    }
    toJSON() {
        return this.content.length ? this.content.map(e => e.toJSON()) : null
    }
    static fromJSON(e, t) {
        if (!t)
            return b.empty;
        if (!Array.isArray(t))
            throw new RangeError("Invalid input for Fragment.fromJSON");
        return new b(t.map(e.nodeFromJSON))
    }
    static fromArray(e) {
        if (!e.length)
            return b.empty;
        let t, n = 0;
        for (let i = 0; i < e.length; i++) {
            let s = e[i];
            n += s.nodeSize,
            i && s.isText && e[i - 1].sameMarkup(s) ? (t || (t = e.slice(0, i)),
            t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s)
        }
        return new b(t || e,n)
    }
    static from(e) {
        if (!e)
            return b.empty;
        if (e instanceof b)
            return e;
        if (Array.isArray(e))
            return this.fromArray(e);
        if (e.attrs)
            return new b([e],e.nodeSize);
        throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""))
    }
}
b.empty = new b([],0);
const fn = {
    index: 0,
    offset: 0
};
function Tt(r, e) {
    return fn.index = r,
    fn.offset = e,
    fn
}
function zt(r, e) {
    if (r === e)
        return !0;
    if (!(r && typeof r == "object") || !(e && typeof e == "object"))
        return !1;
    let t = Array.isArray(r);
    if (Array.isArray(e) != t)
        return !1;
    if (t) {
        if (r.length != e.length)
            return !1;
        for (let n = 0; n < r.length; n++)
            if (!zt(r[n], e[n]))
                return !1
    } else {
        for (let n in r)
            if (!(n in e) || !zt(r[n], e[n]))
                return !1;
        for (let n in e)
            if (!(n in r))
                return !1
    }
    return !0
}
let I = class Dn {
    constructor(e, t) {
        this.type = e,
        this.attrs = t
    }
    addToSet(e) {
        let t, n = !1;
        for (let i = 0; i < e.length; i++) {
            let s = e[i];
            if (this.eq(s))
                return e;
            if (this.type.excludes(s.type))
                t || (t = e.slice(0, i));
            else {
                if (s.type.excludes(this.type))
                    return e;
                !n && s.type.rank > this.type.rank && (t || (t = e.slice(0, i)),
                t.push(this),
                n = !0),
                t && t.push(s)
            }
        }
        return t || (t = e.slice()),
        n || t.push(this),
        t
    }
    removeFromSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t]))
                return e.slice(0, t).concat(e.slice(t + 1));
        return e
    }
    isInSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t]))
                return !0;
        return !1
    }
    eq(e) {
        return this == e || this.type == e.type && zt(this.attrs, e.attrs)
    }
    toJSON() {
        let e = {
            type: this.type.name
        };
        for (let t in this.attrs) {
            e.attrs = this.attrs;
            break
        }
        return e
    }
    static fromJSON(e, t) {
        if (!t)
            throw new RangeError("Invalid input for Mark.fromJSON");
        let n = e.marks[t.type];
        if (!n)
            throw new RangeError(`There is no mark type ${t.type} in this schema`);
        let i = n.create(t.attrs);
        return n.checkAttrs(i.attrs),
        i
    }
    static sameSet(e, t) {
        if (e == t)
            return !0;
        if (e.length != t.length)
            return !1;
        for (let n = 0; n < e.length; n++)
            if (!e[n].eq(t[n]))
                return !1;
        return !0
    }
    static setFrom(e) {
        if (!e || Array.isArray(e) && e.length == 0)
            return Dn.none;
        if (e instanceof Dn)
            return [e];
        let t = e.slice();
        return t.sort( (n, i) => n.type.rank - i.type.rank),
        t
    }
}
;
I.none = [];
class Ft extends Error {
}
class x {
    constructor(e, t, n) {
        this.content = e,
        this.openStart = t,
        this.openEnd = n
    }
    get size() {
        return this.content.size - this.openStart - this.openEnd
    }
    insertAt(e, t) {
        let n = vi(this.content, e + this.openStart, t);
        return n && new x(n,this.openStart,this.openEnd)
    }
    removeBetween(e, t) {
        return new x(Ii(this.content, e + this.openStart, t + this.openStart),this.openStart,this.openEnd)
    }
    eq(e) {
        return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd
    }
    toString() {
        return this.content + "(" + this.openStart + "," + this.openEnd + ")"
    }
    toJSON() {
        if (!this.content.size)
            return null;
        let e = {
            content: this.content.toJSON()
        };
        return this.openStart > 0 && (e.openStart = this.openStart),
        this.openEnd > 0 && (e.openEnd = this.openEnd),
        e
    }
    static fromJSON(e, t) {
        if (!t)
            return x.empty;
        let n = t.openStart || 0
          , i = t.openEnd || 0;
        if (typeof n != "number" || typeof i != "number")
            throw new RangeError("Invalid input for Slice.fromJSON");
        return new x(b.fromJSON(e, t.content),n,i)
    }
    static maxOpen(e, t=!0) {
        let n = 0
          , i = 0;
        for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
            n++;
        for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
            i++;
        return new x(e,n,i)
    }
}
x.empty = new x(b.empty,0,0);
function Ii(r, e, t) {
    let {index: n, offset: i} = r.findIndex(e)
      , s = r.maybeChild(n)
      , {index: o, offset: l} = r.findIndex(t);
    if (i == e || s.isText) {
        if (l != t && !r.child(o).isText)
            throw new RangeError("Removing non-flat range");
        return r.cut(0, e).append(r.cut(t))
    }
    if (n != o)
        throw new RangeError("Removing non-flat range");
    return r.replaceChild(n, s.copy(Ii(s.content, e - i - 1, t - i - 1)))
}
function vi(r, e, t, n) {
    let {index: i, offset: s} = r.findIndex(e)
      , o = r.maybeChild(i);
    if (s == e || o.isText)
        return r.cut(0, e).append(t).append(r.cut(e));
    let l = vi(o.content, e - s - 1, t);
    return l && r.replaceChild(i, o.copy(l))
}
function xo(r, e, t) {
    if (t.openStart > r.depth)
        throw new Ft("Inserted content deeper than insertion position");
    if (r.depth - t.openStart != e.depth - t.openEnd)
        throw new Ft("Inconsistent open depths");
    return Ri(r, e, t, 0)
}
function Ri(r, e, t, n) {
    let i = r.index(n)
      , s = r.node(n);
    if (i == e.index(n) && n < r.depth - t.openStart) {
        let o = Ri(r, e, t, n + 1);
        return s.copy(s.content.replaceChild(i, o))
    } else if (t.content.size)
        if (!t.openStart && !t.openEnd && r.depth == n && e.depth == n) {
            let o = r.parent
              , l = o.content;
            return Le(o, l.cut(0, r.parentOffset).append(t.content).append(l.cut(e.parentOffset)))
        } else {
            let {start: o, end: l} = So(t, r);
            return Le(s, Bi(r, o, l, e, n))
        }
    else
        return Le(s, Lt(r, e, n))
}
function Pi(r, e) {
    if (!e.type.compatibleContent(r.type))
        throw new Ft("Cannot join " + e.type.name + " onto " + r.type.name)
}
function An(r, e, t) {
    let n = r.node(t);
    return Pi(n, e.node(t)),
    n
}
function Fe(r, e) {
    let t = e.length - 1;
    t >= 0 && r.isText && r.sameMarkup(e[t]) ? e[t] = r.withText(e[t].text + r.text) : e.push(r)
}
function ft(r, e, t, n) {
    let i = (e || r).node(t)
      , s = 0
      , o = e ? e.index(t) : i.childCount;
    r && (s = r.index(t),
    r.depth > t ? s++ : r.textOffset && (Fe(r.nodeAfter, n),
    s++));
    for (let l = s; l < o; l++)
        Fe(i.child(l), n);
    e && e.depth == t && e.textOffset && Fe(e.nodeBefore, n)
}
function Le(r, e) {
    return r.type.checkContent(e),
    r.copy(e)
}
function Bi(r, e, t, n, i) {
    let s = r.depth > i && An(r, e, i + 1)
      , o = n.depth > i && An(t, n, i + 1)
      , l = [];
    return ft(null, r, i, l),
    s && o && e.index(i) == t.index(i) ? (Pi(s, o),
    Fe(Le(s, Bi(r, e, t, n, i + 1)), l)) : (s && Fe(Le(s, Lt(r, e, i + 1)), l),
    ft(e, t, i, l),
    o && Fe(Le(o, Lt(t, n, i + 1)), l)),
    ft(n, null, i, l),
    new b(l)
}
function Lt(r, e, t) {
    let n = [];
    if (ft(null, r, t, n),
    r.depth > t) {
        let i = An(r, e, t + 1);
        Fe(Le(i, Lt(r, e, t + 1)), n)
    }
    return ft(e, null, t, n),
    new b(n)
}
function So(r, e) {
    let t = e.depth - r.openStart
      , i = e.node(t).copy(r.content);
    for (let s = t - 1; s >= 0; s--)
        i = e.node(s).copy(b.from(i));
    return {
        start: i.resolveNoCache(r.openStart + t),
        end: i.resolveNoCache(i.content.size - r.openEnd - t)
    }
}
class mt {
    constructor(e, t, n) {
        this.pos = e,
        this.path = t,
        this.parentOffset = n,
        this.depth = t.length / 3 - 1
    }
    resolveDepth(e) {
        return e == null ? this.depth : e < 0 ? this.depth + e : e
    }
    get parent() {
        return this.node(this.depth)
    }
    get doc() {
        return this.node(0)
    }
    node(e) {
        return this.path[this.resolveDepth(e) * 3]
    }
    index(e) {
        return this.path[this.resolveDepth(e) * 3 + 1]
    }
    indexAfter(e) {
        return e = this.resolveDepth(e),
        this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1)
    }
    start(e) {
        return e = this.resolveDepth(e),
        e == 0 ? 0 : this.path[e * 3 - 1] + 1
    }
    end(e) {
        return e = this.resolveDepth(e),
        this.start(e) + this.node(e).content.size
    }
    before(e) {
        if (e = this.resolveDepth(e),
        !e)
            throw new RangeError("There is no position before the top-level node");
        return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1]
    }
    after(e) {
        if (e = this.resolveDepth(e),
        !e)
            throw new RangeError("There is no position after the top-level node");
        return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize
    }
    get textOffset() {
        return this.pos - this.path[this.path.length - 1]
    }
    get nodeAfter() {
        let e = this.parent
          , t = this.index(this.depth);
        if (t == e.childCount)
            return null;
        let n = this.pos - this.path[this.path.length - 1]
          , i = e.child(t);
        return n ? e.child(t).cut(n) : i
    }
    get nodeBefore() {
        let e = this.index(this.depth)
          , t = this.pos - this.path[this.path.length - 1];
        return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1)
    }
    posAtIndex(e, t) {
        t = this.resolveDepth(t);
        let n = this.path[t * 3]
          , i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
        for (let s = 0; s < e; s++)
            i += n.child(s).nodeSize;
        return i
    }
    marks() {
        let e = this.parent
          , t = this.index();
        if (e.content.size == 0)
            return I.none;
        if (this.textOffset)
            return e.child(t).marks;
        let n = e.maybeChild(t - 1)
          , i = e.maybeChild(t);
        if (!n) {
            let l = n;
            n = i,
            i = l
        }
        let s = n.marks;
        for (var o = 0; o < s.length; o++)
            s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
        return s
    }
    marksAcross(e) {
        let t = this.parent.maybeChild(this.index());
        if (!t || !t.isInline)
            return null;
        let n = t.marks
          , i = e.parent.maybeChild(e.index());
        for (var s = 0; s < n.length; s++)
            n[s].type.spec.inclusive === !1 && (!i || !n[s].isInSet(i.marks)) && (n = n[s--].removeFromSet(n));
        return n
    }
    sharedDepth(e) {
        for (let t = this.depth; t > 0; t--)
            if (this.start(t) <= e && this.end(t) >= e)
                return t;
        return 0
    }
    blockRange(e=this, t) {
        if (e.pos < this.pos)
            return e.blockRange(this);
        for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--)
            if (e.pos <= this.end(n) && (!t || t(this.node(n))))
                return new Vt(this,e,n);
        return null
    }
    sameParent(e) {
        return this.pos - this.parentOffset == e.pos - e.parentOffset
    }
    max(e) {
        return e.pos > this.pos ? e : this
    }
    min(e) {
        return e.pos < this.pos ? e : this
    }
    toString() {
        let e = "";
        for (let t = 1; t <= this.depth; t++)
            e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
        return e + ":" + this.parentOffset
    }
    static resolve(e, t) {
        if (!(t >= 0 && t <= e.content.size))
            throw new RangeError("Position " + t + " out of range");
        let n = []
          , i = 0
          , s = t;
        for (let o = e; ; ) {
            let {index: l, offset: a} = o.content.findIndex(s)
              , c = s - a;
            if (n.push(o, l, i + a),
            !c || (o = o.child(l),
            o.isText))
                break;
            s = c - 1,
            i += a + 1
        }
        return new mt(t,n,s)
    }
    static resolveCached(e, t) {
        let n = xr.get(e);
        if (n)
            for (let s = 0; s < n.elts.length; s++) {
                let o = n.elts[s];
                if (o.pos == t)
                    return o
            }
        else
            xr.set(e, n = new Mo);
        let i = n.elts[n.i] = mt.resolve(e, t);
        return n.i = (n.i + 1) % Co,
        i
    }
}
class Mo {
    constructor() {
        this.elts = [],
        this.i = 0
    }
}
const Co = 12
  , xr = new WeakMap;
class Vt {
    constructor(e, t, n) {
        this.$from = e,
        this.$to = t,
        this.depth = n
    }
    get start() {
        return this.$from.before(this.depth + 1)
    }
    get end() {
        return this.$to.after(this.depth + 1)
    }
    get parent() {
        return this.$from.node(this.depth)
    }
    get startIndex() {
        return this.$from.index(this.depth)
    }
    get endIndex() {
        return this.$to.indexAfter(this.depth)
    }
}
const wo = Object.create(null);
let Ce = class In {
    constructor(e, t, n, i=I.none) {
        this.type = e,
        this.attrs = t,
        this.marks = i,
        this.content = n || b.empty
    }
    get children() {
        return this.content.content
    }
    get nodeSize() {
        return this.isLeaf ? 1 : 2 + this.content.size
    }
    get childCount() {
        return this.content.childCount
    }
    child(e) {
        return this.content.child(e)
    }
    maybeChild(e) {
        return this.content.maybeChild(e)
    }
    forEach(e) {
        this.content.forEach(e)
    }
    nodesBetween(e, t, n, i=0) {
        this.content.nodesBetween(e, t, n, i, this)
    }
    descendants(e) {
        this.nodesBetween(0, this.content.size, e)
    }
    get textContent() {
        return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "")
    }
    textBetween(e, t, n, i) {
        return this.content.textBetween(e, t, n, i)
    }
    get firstChild() {
        return this.content.firstChild
    }
    get lastChild() {
        return this.content.lastChild
    }
    eq(e) {
        return this == e || this.sameMarkup(e) && this.content.eq(e.content)
    }
    sameMarkup(e) {
        return this.hasMarkup(e.type, e.attrs, e.marks)
    }
    hasMarkup(e, t, n) {
        return this.type == e && zt(this.attrs, t || e.defaultAttrs || wo) && I.sameSet(this.marks, n || I.none)
    }
    copy(e=null) {
        return e == this.content ? this : new In(this.type,this.attrs,e,this.marks)
    }
    mark(e) {
        return e == this.marks ? this : new In(this.type,this.attrs,this.content,e)
    }
    cut(e, t=this.content.size) {
        return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t))
    }
    slice(e, t=this.content.size, n=!1) {
        if (e == t)
            return x.empty;
        let i = this.resolve(e)
          , s = this.resolve(t)
          , o = n ? 0 : i.sharedDepth(t)
          , l = i.start(o)
          , c = i.node(o).content.cut(i.pos - l, s.pos - l);
        return new x(c,i.depth - o,s.depth - o)
    }
    replace(e, t, n) {
        return xo(this.resolve(e), this.resolve(t), n)
    }
    nodeAt(e) {
        for (let t = this; ; ) {
            let {index: n, offset: i} = t.content.findIndex(e);
            if (t = t.maybeChild(n),
            !t)
                return null;
            if (i == e || t.isText)
                return t;
            e -= i + 1
        }
    }
    childAfter(e) {
        let {index: t, offset: n} = this.content.findIndex(e);
        return {
            node: this.content.maybeChild(t),
            index: t,
            offset: n
        }
    }
    childBefore(e) {
        if (e == 0)
            return {
                node: null,
                index: 0,
                offset: 0
            };
        let {index: t, offset: n} = this.content.findIndex(e);
        if (n < e)
            return {
                node: this.content.child(t),
                index: t,
                offset: n
            };
        let i = this.content.child(t - 1);
        return {
            node: i,
            index: t - 1,
            offset: n - i.nodeSize
        }
    }
    resolve(e) {
        return mt.resolveCached(this, e)
    }
    resolveNoCache(e) {
        return mt.resolve(this, e)
    }
    rangeHasMark(e, t, n) {
        let i = !1;
        return t > e && this.nodesBetween(e, t, s => (n.isInSet(s.marks) && (i = !0),
        !i)),
        i
    }
    get isBlock() {
        return this.type.isBlock
    }
    get isTextblock() {
        return this.type.isTextblock
    }
    get inlineContent() {
        return this.type.inlineContent
    }
    get isInline() {
        return this.type.isInline
    }
    get isText() {
        return this.type.isText
    }
    get isLeaf() {
        return this.type.isLeaf
    }
    get isAtom() {
        return this.type.isAtom
    }
    toString() {
        if (this.type.spec.toDebugString)
            return this.type.spec.toDebugString(this);
        let e = this.type.name;
        return this.content.size && (e += "(" + this.content.toStringInner() + ")"),
        zi(this.marks, e)
    }
    contentMatchAt(e) {
        let t = this.type.contentMatch.matchFragment(this.content, 0, e);
        if (!t)
            throw new Error("Called contentMatchAt on a node with invalid content");
        return t
    }
    canReplace(e, t, n=b.empty, i=0, s=n.childCount) {
        let o = this.contentMatchAt(e).matchFragment(n, i, s)
          , l = o && o.matchFragment(this.content, t);
        if (!l || !l.validEnd)
            return !1;
        for (let a = i; a < s; a++)
            if (!this.type.allowsMarks(n.child(a).marks))
                return !1;
        return !0
    }
    canReplaceWith(e, t, n, i) {
        if (i && !this.type.allowsMarks(i))
            return !1;
        let s = this.contentMatchAt(e).matchType(n)
          , o = s && s.matchFragment(this.content, t);
        return o ? o.validEnd : !1
    }
    canAppend(e) {
        return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type)
    }
    check() {
        this.type.checkContent(this.content),
        this.type.checkAttrs(this.attrs);
        let e = I.none;
        for (let t = 0; t < this.marks.length; t++) {
            let n = this.marks[t];
            n.type.checkAttrs(n.attrs),
            e = n.addToSet(e)
        }
        if (!I.sameSet(e, this.marks))
            throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map(t => t.type.name)}`);
        this.content.forEach(t => t.check())
    }
    toJSON() {
        let e = {
            type: this.type.name
        };
        for (let t in this.attrs) {
            e.attrs = this.attrs;
            break
        }
        return this.content.size && (e.content = this.content.toJSON()),
        this.marks.length && (e.marks = this.marks.map(t => t.toJSON())),
        e
    }
    static fromJSON(e, t) {
        if (!t)
            throw new RangeError("Invalid input for Node.fromJSON");
        let n;
        if (t.marks) {
            if (!Array.isArray(t.marks))
                throw new RangeError("Invalid mark data for Node.fromJSON");
            n = t.marks.map(e.markFromJSON)
        }
        if (t.type == "text") {
            if (typeof t.text != "string")
                throw new RangeError("Invalid text node in JSON");
            return e.text(t.text, n)
        }
        let i = b.fromJSON(e, t.content)
          , s = e.nodeType(t.type).create(t.attrs, i, n);
        return s.type.checkAttrs(s.attrs),
        s
    }
}
;
Ce.prototype.text = void 0;
class $t extends Ce {
    constructor(e, t, n, i) {
        if (super(e, t, null, i),
        !n)
            throw new RangeError("Empty text nodes are not allowed");
        this.text = n
    }
    toString() {
        return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : zi(this.marks, JSON.stringify(this.text))
    }
    get textContent() {
        return this.text
    }
    textBetween(e, t) {
        return this.text.slice(e, t)
    }
    get nodeSize() {
        return this.text.length
    }
    mark(e) {
        return e == this.marks ? this : new $t(this.type,this.attrs,this.text,e)
    }
    withText(e) {
        return e == this.text ? this : new $t(this.type,this.attrs,e,this.marks)
    }
    cut(e=0, t=this.text.length) {
        return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t))
    }
    eq(e) {
        return this.sameMarkup(e) && this.text == e.text
    }
    toJSON() {
        let e = super.toJSON();
        return e.text = this.text,
        e
    }
}
function zi(r, e) {
    for (let t = r.length - 1; t >= 0; t--)
        e = r[t].type.name + "(" + e + ")";
    return e
}
class We {
    constructor(e) {
        this.validEnd = e,
        this.next = [],
        this.wrapCache = []
    }
    static parse(e, t) {
        let n = new Oo(e,t);
        if (n.next == null)
            return We.empty;
        let i = Fi(n);
        n.next && n.err("Unexpected trailing text");
        let s = vo(Io(i));
        return Ro(s, n),
        s
    }
    matchType(e) {
        for (let t = 0; t < this.next.length; t++)
            if (this.next[t].type == e)
                return this.next[t].next;
        return null
    }
    matchFragment(e, t=0, n=e.childCount) {
        let i = this;
        for (let s = t; i && s < n; s++)
            i = i.matchType(e.child(s).type);
        return i
    }
    get inlineContent() {
        return this.next.length != 0 && this.next[0].type.isInline
    }
    get defaultType() {
        for (let e = 0; e < this.next.length; e++) {
            let {type: t} = this.next[e];
            if (!(t.isText || t.hasRequiredAttrs()))
                return t
        }
        return null
    }
    compatible(e) {
        for (let t = 0; t < this.next.length; t++)
            for (let n = 0; n < e.next.length; n++)
                if (this.next[t].type == e.next[n].type)
                    return !0;
        return !1
    }
    fillBefore(e, t=!1, n=0) {
        let i = [this];
        function s(o, l) {
            let a = o.matchFragment(e, n);
            if (a && (!t || a.validEnd))
                return b.from(l.map(c => c.createAndFill()));
            for (let c = 0; c < o.next.length; c++) {
                let {type: d, next: f} = o.next[c];
                if (!(d.isText || d.hasRequiredAttrs()) && i.indexOf(f) == -1) {
                    i.push(f);
                    let u = s(f, l.concat(d));
                    if (u)
                        return u
                }
            }
            return null
        }
        return s(this, [])
    }
    findWrapping(e) {
        for (let n = 0; n < this.wrapCache.length; n += 2)
            if (this.wrapCache[n] == e)
                return this.wrapCache[n + 1];
        let t = this.computeWrapping(e);
        return this.wrapCache.push(e, t),
        t
    }
    computeWrapping(e) {
        let t = Object.create(null)
          , n = [{
            match: this,
            type: null,
            via: null
        }];
        for (; n.length; ) {
            let i = n.shift()
              , s = i.match;
            if (s.matchType(e)) {
                let o = [];
                for (let l = i; l.type; l = l.via)
                    o.push(l.type);
                return o.reverse()
            }
            for (let o = 0; o < s.next.length; o++) {
                let {type: l, next: a} = s.next[o];
                !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (n.push({
                    match: l.contentMatch,
                    type: l,
                    via: i
                }),
                t[l.name] = !0)
            }
        }
        return null
    }
    get edgeCount() {
        return this.next.length
    }
    edge(e) {
        if (e >= this.next.length)
            throw new RangeError(`There's no ${e}th edge in this content match`);
        return this.next[e]
    }
    toString() {
        let e = [];
        function t(n) {
            e.push(n);
            for (let i = 0; i < n.next.length; i++)
                e.indexOf(n.next[i].next) == -1 && t(n.next[i].next)
        }
        return t(this),
        e.map( (n, i) => {
            let s = i + (n.validEnd ? "*" : " ") + " ";
            for (let o = 0; o < n.next.length; o++)
                s += (o ? ", " : "") + n.next[o].type.name + "->" + e.indexOf(n.next[o].next);
            return s
        }
        ).join(`
`)
    }
}
We.empty = new We(!0);
class Oo {
    constructor(e, t) {
        this.string = e,
        this.nodeTypes = t,
        this.inline = null,
        this.pos = 0,
        this.tokens = e.split(/\s*(?=\b|\W|$)/),
        this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(),
        this.tokens[0] == "" && this.tokens.shift()
    }
    get next() {
        return this.tokens[this.pos]
    }
    eat(e) {
        return this.next == e && (this.pos++ || !0)
    }
    err(e) {
        throw new SyntaxError(e + " (in content expression '" + this.string + "')")
    }
}
function Fi(r) {
    let e = [];
    do
        e.push(To(r));
    while (r.eat("|"));
    return e.length == 1 ? e[0] : {
        type: "choice",
        exprs: e
    }
}
function To(r) {
    let e = [];
    do
        e.push(No(r));
    while (r.next && r.next != ")" && r.next != "|");
    return e.length == 1 ? e[0] : {
        type: "seq",
        exprs: e
    }
}
function No(r) {
    let e = Ao(r);
    for (; ; )
        if (r.eat("+"))
            e = {
                type: "plus",
                expr: e
            };
        else if (r.eat("*"))
            e = {
                type: "star",
                expr: e
            };
        else if (r.eat("?"))
            e = {
                type: "opt",
                expr: e
            };
        else if (r.eat("{"))
            e = Eo(r, e);
        else
            break;
    return e
}
function Sr(r) {
    /\D/.test(r.next) && r.err("Expected number, got '" + r.next + "'");
    let e = Number(r.next);
    return r.pos++,
    e
}
function Eo(r, e) {
    let t = Sr(r)
      , n = t;
    return r.eat(",") && (r.next != "}" ? n = Sr(r) : n = -1),
    r.eat("}") || r.err("Unclosed braced range"),
    {
        type: "range",
        min: t,
        max: n,
        expr: e
    }
}
function Do(r, e) {
    let t = r.nodeTypes
      , n = t[e];
    if (n)
        return [n];
    let i = [];
    for (let s in t) {
        let o = t[s];
        o.isInGroup(e) && i.push(o)
    }
    return i.length == 0 && r.err("No node type or group '" + e + "' found"),
    i
}
function Ao(r) {
    if (r.eat("(")) {
        let e = Fi(r);
        return r.eat(")") || r.err("Missing closing paren"),
        e
    } else if (/\W/.test(r.next))
        r.err("Unexpected token '" + r.next + "'");
    else {
        let e = Do(r, r.next).map(t => (r.inline == null ? r.inline = t.isInline : r.inline != t.isInline && r.err("Mixing inline and block content"),
        {
            type: "name",
            value: t
        }));
        return r.pos++,
        e.length == 1 ? e[0] : {
            type: "choice",
            exprs: e
        }
    }
}
function Io(r) {
    let e = [[]];
    return i(s(r, 0), t()),
    e;
    function t() {
        return e.push([]) - 1
    }
    function n(o, l, a) {
        let c = {
            term: a,
            to: l
        };
        return e[o].push(c),
        c
    }
    function i(o, l) {
        o.forEach(a => a.to = l)
    }
    function s(o, l) {
        if (o.type == "choice")
            return o.exprs.reduce( (a, c) => a.concat(s(c, l)), []);
        if (o.type == "seq")
            for (let a = 0; ; a++) {
                let c = s(o.exprs[a], l);
                if (a == o.exprs.length - 1)
                    return c;
                i(c, l = t())
            }
        else if (o.type == "star") {
            let a = t();
            return n(l, a),
            i(s(o.expr, a), a),
            [n(a)]
        } else if (o.type == "plus") {
            let a = t();
            return i(s(o.expr, l), a),
            i(s(o.expr, a), a),
            [n(a)]
        } else {
            if (o.type == "opt")
                return [n(l)].concat(s(o.expr, l));
            if (o.type == "range") {
                let a = l;
                for (let c = 0; c < o.min; c++) {
                    let d = t();
                    i(s(o.expr, a), d),
                    a = d
                }
                if (o.max == -1)
                    i(s(o.expr, a), a);
                else
                    for (let c = o.min; c < o.max; c++) {
                        let d = t();
                        n(a, d),
                        i(s(o.expr, a), d),
                        a = d
                    }
                return [n(a)]
            } else {
                if (o.type == "name")
                    return [n(l, void 0, o.value)];
                throw new Error("Unknown expr type")
            }
        }
    }
}
function Li(r, e) {
    return e - r
}
function Mr(r, e) {
    let t = [];
    return n(e),
    t.sort(Li);
    function n(i) {
        let s = r[i];
        if (s.length == 1 && !s[0].term)
            return n(s[0].to);
        t.push(i);
        for (let o = 0; o < s.length; o++) {
            let {term: l, to: a} = s[o];
            !l && t.indexOf(a) == -1 && n(a)
        }
    }
}
function vo(r) {
    let e = Object.create(null);
    return t(Mr(r, 0));
    function t(n) {
        let i = [];
        n.forEach(o => {
            r[o].forEach( ({term: l, to: a}) => {
                if (!l)
                    return;
                let c;
                for (let d = 0; d < i.length; d++)
                    i[d][0] == l && (c = i[d][1]);
                Mr(r, a).forEach(d => {
                    c || i.push([l, c = []]),
                    c.indexOf(d) == -1 && c.push(d)
                }
                )
            }
            )
        }
        );
        let s = e[n.join(",")] = new We(n.indexOf(r.length - 1) > -1);
        for (let o = 0; o < i.length; o++) {
            let l = i[o][1].sort(Li);
            s.next.push({
                type: i[o][0],
                next: e[l.join(",")] || t(l)
            })
        }
        return s
    }
}
function Ro(r, e) {
    for (let t = 0, n = [r]; t < n.length; t++) {
        let i = n[t]
          , s = !i.validEnd
          , o = [];
        for (let l = 0; l < i.next.length; l++) {
            let {type: a, next: c} = i.next[l];
            o.push(a.name),
            s && !(a.isText || a.hasRequiredAttrs()) && (s = !1),
            n.indexOf(c) == -1 && n.push(c)
        }
        s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)")
    }
}
function Vi(r) {
    let e = Object.create(null);
    for (let t in r) {
        let n = r[t];
        if (!n.hasDefault)
            return null;
        e[t] = n.default
    }
    return e
}
function $i(r, e) {
    let t = Object.create(null);
    for (let n in r) {
        let i = e && e[n];
        if (i === void 0) {
            let s = r[n];
            if (s.hasDefault)
                i = s.default;
            else
                throw new RangeError("No value supplied for attribute " + n)
        }
        t[n] = i
    }
    return t
}
function Wi(r, e, t, n) {
    for (let i in e)
        if (!(i in r))
            throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
    for (let i in r) {
        let s = r[i];
        s.validate && s.validate(e[i])
    }
}
function Hi(r, e) {
    let t = Object.create(null);
    if (e)
        for (let n in e)
            t[n] = new Bo(r,n,e[n]);
    return t
}
let Cr = class ji {
    constructor(e, t, n) {
        this.name = e,
        this.schema = t,
        this.spec = n,
        this.markSet = null,
        this.groups = n.group ? n.group.split(" ") : [],
        this.attrs = Hi(e, n.attrs),
        this.defaultAttrs = Vi(this.attrs),
        this.contentMatch = null,
        this.inlineContent = null,
        this.isBlock = !(n.inline || e == "text"),
        this.isText = e == "text"
    }
    get isInline() {
        return !this.isBlock
    }
    get isTextblock() {
        return this.isBlock && this.inlineContent
    }
    get isLeaf() {
        return this.contentMatch == We.empty
    }
    get isAtom() {
        return this.isLeaf || !!this.spec.atom
    }
    isInGroup(e) {
        return this.groups.indexOf(e) > -1
    }
    get whitespace() {
        return this.spec.whitespace || (this.spec.code ? "pre" : "normal")
    }
    hasRequiredAttrs() {
        for (let e in this.attrs)
            if (this.attrs[e].isRequired)
                return !0;
        return !1
    }
    compatibleContent(e) {
        return this == e || this.contentMatch.compatible(e.contentMatch)
    }
    computeAttrs(e) {
        return !e && this.defaultAttrs ? this.defaultAttrs : $i(this.attrs, e)
    }
    create(e=null, t, n) {
        if (this.isText)
            throw new Error("NodeType.create can't construct text nodes");
        return new Ce(this,this.computeAttrs(e),b.from(t),I.setFrom(n))
    }
    createChecked(e=null, t, n) {
        return t = b.from(t),
        this.checkContent(t),
        new Ce(this,this.computeAttrs(e),t,I.setFrom(n))
    }
    createAndFill(e=null, t, n) {
        if (e = this.computeAttrs(e),
        t = b.from(t),
        t.size) {
            let o = this.contentMatch.fillBefore(t);
            if (!o)
                return null;
            t = o.append(t)
        }
        let i = this.contentMatch.matchFragment(t)
          , s = i && i.fillBefore(b.empty, !0);
        return s ? new Ce(this,e,t.append(s),I.setFrom(n)) : null
    }
    validContent(e) {
        let t = this.contentMatch.matchFragment(e);
        if (!t || !t.validEnd)
            return !1;
        for (let n = 0; n < e.childCount; n++)
            if (!this.allowsMarks(e.child(n).marks))
                return !1;
        return !0
    }
    checkContent(e) {
        if (!this.validContent(e))
            throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`)
    }
    checkAttrs(e) {
        Wi(this.attrs, e, "node", this.name)
    }
    allowsMarkType(e) {
        return this.markSet == null || this.markSet.indexOf(e) > -1
    }
    allowsMarks(e) {
        if (this.markSet == null)
            return !0;
        for (let t = 0; t < e.length; t++)
            if (!this.allowsMarkType(e[t].type))
                return !1;
        return !0
    }
    allowedMarks(e) {
        if (this.markSet == null)
            return e;
        let t;
        for (let n = 0; n < e.length; n++)
            this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t || (t = e.slice(0, n));
        return t ? t.length ? t : I.none : e
    }
    static compile(e, t) {
        let n = Object.create(null);
        e.forEach( (s, o) => n[s] = new ji(s,t,o));
        let i = t.spec.topNode || "doc";
        if (!n[i])
            throw new RangeError("Schema is missing its top node type ('" + i + "')");
        if (!n.text)
            throw new RangeError("Every schema needs a 'text' type");
        for (let s in n.text.attrs)
            throw new RangeError("The text node type should not have attributes");
        return n
    }
}
;
function Po(r, e, t) {
    let n = t.split("|");
    return i => {
        let s = i === null ? "null" : typeof i;
        if (n.indexOf(s) < 0)
            throw new RangeError(`Expected value of type ${n} for attribute ${e} on type ${r}, got ${s}`)
    }
}
class Bo {
    constructor(e, t, n) {
        this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"),
        this.default = n.default,
        this.validate = typeof n.validate == "string" ? Po(e, t, n.validate) : n.validate
    }
    get isRequired() {
        return !this.hasDefault
    }
}
class Xt {
    constructor(e, t, n, i) {
        this.name = e,
        this.rank = t,
        this.schema = n,
        this.spec = i,
        this.attrs = Hi(e, i.attrs),
        this.excluded = null;
        let s = Vi(this.attrs);
        this.instance = s ? new I(this,s) : null
    }
    create(e=null) {
        return !e && this.instance ? this.instance : new I(this,$i(this.attrs, e))
    }
    static compile(e, t) {
        let n = Object.create(null)
          , i = 0;
        return e.forEach( (s, o) => n[s] = new Xt(s,i++,t,o)),
        n
    }
    removeFromSet(e) {
        for (var t = 0; t < e.length; t++)
            e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)),
            t--);
        return e
    }
    isInSet(e) {
        for (let t = 0; t < e.length; t++)
            if (e[t].type == this)
                return e[t]
    }
    checkAttrs(e) {
        Wi(this.attrs, e, "mark", this.name)
    }
    excludes(e) {
        return this.excluded.indexOf(e) > -1
    }
}
class Ji {
    constructor(e) {
        this.linebreakReplacement = null,
        this.cached = Object.create(null);
        let t = this.spec = {};
        for (let i in e)
            t[i] = e[i];
        t.nodes = $.from(e.nodes),
        t.marks = $.from(e.marks || {}),
        this.nodes = Cr.compile(this.spec.nodes, this),
        this.marks = Xt.compile(this.spec.marks, this);
        let n = Object.create(null);
        for (let i in this.nodes) {
            if (i in this.marks)
                throw new RangeError(i + " can not be both a node and a mark");
            let s = this.nodes[i]
              , o = s.spec.content || ""
              , l = s.spec.marks;
            if (s.contentMatch = n[o] || (n[o] = We.parse(o, this.nodes)),
            s.inlineContent = s.contentMatch.inlineContent,
            s.spec.linebreakReplacement) {
                if (this.linebreakReplacement)
                    throw new RangeError("Multiple linebreak nodes defined");
                if (!s.isInline || !s.isLeaf)
                    throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
                this.linebreakReplacement = s
            }
            s.markSet = l == "_" ? null : l ? wr(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null
        }
        for (let i in this.marks) {
            let s = this.marks[i]
              , o = s.spec.excludes;
            s.excluded = o == null ? [s] : o == "" ? [] : wr(this, o.split(" "))
        }
        this.nodeFromJSON = i => Ce.fromJSON(this, i),
        this.markFromJSON = i => I.fromJSON(this, i),
        this.topNodeType = this.nodes[this.spec.topNode || "doc"],
        this.cached.wrappings = Object.create(null)
    }
    node(e, t=null, n, i) {
        if (typeof e == "string")
            e = this.nodeType(e);
        else if (e instanceof Cr) {
            if (e.schema != this)
                throw new RangeError("Node type from different schema used (" + e.name + ")")
        } else
            throw new RangeError("Invalid node type: " + e);
        return e.createChecked(t, n, i)
    }
    text(e, t) {
        let n = this.nodes.text;
        return new $t(n,n.defaultAttrs,e,I.setFrom(t))
    }
    mark(e, t) {
        return typeof e == "string" && (e = this.marks[e]),
        e.create(t)
    }
    nodeType(e) {
        let t = this.nodes[e];
        if (!t)
            throw new RangeError("Unknown node type: " + e);
        return t
    }
}
function wr(r, e) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
        let i = e[n]
          , s = r.marks[i]
          , o = s;
        if (s)
            t.push(s);
        else
            for (let l in r.marks) {
                let a = r.marks[l];
                (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(o = a)
            }
        if (!o)
            throw new SyntaxError("Unknown mark type: '" + e[n] + "'")
    }
    return t
}
function zo(r) {
    return r.tag != null
}
function Fo(r) {
    return r.style != null
}
class we {
    constructor(e, t) {
        this.schema = e,
        this.rules = t,
        this.tags = [],
        this.styles = [];
        let n = this.matchedStyles = [];
        t.forEach(i => {
            if (zo(i))
                this.tags.push(i);
            else if (Fo(i)) {
                let s = /[^=]*/.exec(i.style)[0];
                n.indexOf(s) < 0 && n.push(s),
                this.styles.push(i)
            }
        }
        ),
        this.normalizeLists = !this.tags.some(i => {
            if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
                return !1;
            let s = e.nodes[i.node];
            return s.contentMatch.matchType(s)
        }
        )
    }
    parse(e, t={}) {
        let n = new Tr(this,t,!1);
        return n.addAll(e, I.none, t.from, t.to),
        n.finish()
    }
    parseSlice(e, t={}) {
        let n = new Tr(this,t,!0);
        return n.addAll(e, I.none, t.from, t.to),
        x.maxOpen(n.finish())
    }
    matchTag(e, t, n) {
        for (let i = n ? this.tags.indexOf(n) + 1 : 0; i < this.tags.length; i++) {
            let s = this.tags[i];
            if ($o(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
                if (s.getAttrs) {
                    let o = s.getAttrs(e);
                    if (o === !1)
                        continue;
                    s.attrs = o || void 0
                }
                return s
            }
        }
    }
    matchStyle(e, t, n, i) {
        for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
            let o = this.styles[s]
              , l = o.style;
            if (!(l.indexOf(e) != 0 || o.context && !n.matchesContext(o.context) || l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
                if (o.getAttrs) {
                    let a = o.getAttrs(t);
                    if (a === !1)
                        continue;
                    o.attrs = a || void 0
                }
                return o
            }
        }
    }
    static schemaRules(e) {
        let t = [];
        function n(i) {
            let s = i.priority == null ? 50 : i.priority
              , o = 0;
            for (; o < t.length; o++) {
                let l = t[o];
                if ((l.priority == null ? 50 : l.priority) < s)
                    break
            }
            t.splice(o, 0, i)
        }
        for (let i in e.marks) {
            let s = e.marks[i].spec.parseDOM;
            s && s.forEach(o => {
                n(o = Nr(o)),
                o.mark || o.ignore || o.clearMark || (o.mark = i)
            }
            )
        }
        for (let i in e.nodes) {
            let s = e.nodes[i].spec.parseDOM;
            s && s.forEach(o => {
                n(o = Nr(o)),
                o.node || o.ignore || o.mark || (o.node = i)
            }
            )
        }
        return t
    }
    static fromSchema(e) {
        return e.cached.domParser || (e.cached.domParser = new we(e,we.schemaRules(e)))
    }
}
const qi = {
    address: !0,
    article: !0,
    aside: !0,
    blockquote: !0,
    canvas: !0,
    dd: !0,
    div: !0,
    dl: !0,
    fieldset: !0,
    figcaption: !0,
    figure: !0,
    footer: !0,
    form: !0,
    h1: !0,
    h2: !0,
    h3: !0,
    h4: !0,
    h5: !0,
    h6: !0,
    header: !0,
    hgroup: !0,
    hr: !0,
    li: !0,
    noscript: !0,
    ol: !0,
    output: !0,
    p: !0,
    pre: !0,
    section: !0,
    table: !0,
    tfoot: !0,
    ul: !0
}
  , Lo = {
    head: !0,
    noscript: !0,
    object: !0,
    script: !0,
    style: !0,
    title: !0
}
  , Ki = {
    ol: !0,
    ul: !0
}
  , gt = 1
  , vn = 2
  , ut = 4;
function Or(r, e, t) {
    return e != null ? (e ? gt : 0) | (e === "full" ? vn : 0) : r && r.whitespace == "pre" ? gt | vn : t & ~ut
}
class Nt {
    constructor(e, t, n, i, s, o) {
        this.type = e,
        this.attrs = t,
        this.marks = n,
        this.solid = i,
        this.options = o,
        this.content = [],
        this.activeMarks = I.none,
        this.match = s || (o & ut ? null : e.contentMatch)
    }
    findWrapping(e) {
        if (!this.match) {
            if (!this.type)
                return [];
            let t = this.type.contentMatch.fillBefore(b.from(e));
            if (t)
                this.match = this.type.contentMatch.matchFragment(t);
            else {
                let n = this.type.contentMatch, i;
                return (i = n.findWrapping(e.type)) ? (this.match = n,
                i) : null
            }
        }
        return this.match.findWrapping(e.type)
    }
    finish(e) {
        if (!(this.options & gt)) {
            let n = this.content[this.content.length - 1], i;
            if (n && n.isText && (i = /[ \t\r\n\u000c]+$/.exec(n.text))) {
                let s = n;
                n.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length))
            }
        }
        let t = b.from(this.content);
        return !e && this.match && (t = t.append(this.match.fillBefore(b.empty, !0))),
        this.type ? this.type.create(this.attrs, t, this.marks) : t
    }
    inlineContext(e) {
        return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !qi.hasOwnProperty(e.parentNode.nodeName.toLowerCase())
    }
}
class Tr {
    constructor(e, t, n) {
        this.parser = e,
        this.options = t,
        this.isOpen = n,
        this.open = 0,
        this.localPreserveWS = !1;
        let i = t.topNode, s, o = Or(null, t.preserveWhitespace, 0) | (n ? ut : 0);
        i ? s = new Nt(i.type,i.attrs,I.none,!0,t.topMatch || i.type.contentMatch,o) : n ? s = new Nt(null,null,I.none,!0,null,o) : s = new Nt(e.schema.topNodeType,null,I.none,!0,null,o),
        this.nodes = [s],
        this.find = t.findPositions,
        this.needsBlock = !1
    }
    get top() {
        return this.nodes[this.open]
    }
    addDOM(e, t) {
        e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t)
    }
    addTextNode(e, t) {
        let n = e.nodeValue
          , i = this.top
          , s = i.options & vn ? "full" : this.localPreserveWS || (i.options & gt) > 0;
        if (s === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
            if (s)
                s !== "full" ? n = n.replace(/\r?\n|\r/g, " ") : n = n.replace(/\r\n?/g, `
`);
            else if (n = n.replace(/[ \t\r\n\u000c]+/g, " "),
            /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
                let o = i.content[i.content.length - 1]
                  , l = e.previousSibling;
                (!o || l && l.nodeName == "BR" || o.isText && /[ \t\r\n\u000c]$/.test(o.text)) && (n = n.slice(1))
            }
            n && this.insertNode(this.parser.schema.text(n), t, !/\S/.test(n)),
            this.findInText(e)
        } else
            this.findInside(e)
    }
    addElement(e, t, n) {
        let i = this.localPreserveWS
          , s = this.top;
        (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
        let o = e.nodeName.toLowerCase(), l;
        Ki.hasOwnProperty(o) && this.parser.normalizeLists && Vo(e);
        let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, n));
        e: if (a ? a.ignore : Lo.hasOwnProperty(o))
            this.findInside(e),
            this.ignoreFallback(e, t);
        else if (!a || a.skip || a.closeParent) {
            a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
            let c, d = this.needsBlock;
            if (qi.hasOwnProperty(o))
                s.content.length && s.content[0].isInline && this.open && (this.open--,
                s = this.top),
                c = !0,
                s.type || (this.needsBlock = !0);
            else if (!e.firstChild) {
                this.leafFallback(e, t);
                break e
            }
            let f = a && a.skip ? t : this.readStyles(e, t);
            f && this.addAll(e, f),
            c && this.sync(s),
            this.needsBlock = d
        } else {
            let c = this.readStyles(e, t);
            c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0)
        }
        this.localPreserveWS = i
    }
    leafFallback(e, t) {
        e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t)
    }
    ignoreFallback(e, t) {
        e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0)
    }
    readStyles(e, t) {
        let n = e.style;
        if (n && n.length)
            for (let i = 0; i < this.parser.matchedStyles.length; i++) {
                let s = this.parser.matchedStyles[i]
                  , o = n.getPropertyValue(s);
                if (o)
                    for (let l = void 0; ; ) {
                        let a = this.parser.matchStyle(s, o, this, l);
                        if (!a)
                            break;
                        if (a.ignore)
                            return null;
                        if (a.clearMark ? t = t.filter(c => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)),
                        a.consuming === !1)
                            l = a;
                        else
                            break
                    }
            }
        return t
    }
    addElementByRule(e, t, n, i) {
        let s, o;
        if (t.node)
            if (o = this.parser.schema.nodes[t.node],
            o.isLeaf)
                this.insertNode(o.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
            else {
                let a = this.enter(o, t.attrs || null, n, t.preserveWhitespace);
                a && (s = !0,
                n = a)
            }
        else {
            let a = this.parser.schema.marks[t.mark];
            n = n.concat(a.create(t.attrs))
        }
        let l = this.top;
        if (o && o.isLeaf)
            this.findInside(e);
        else if (i)
            this.addElement(e, n, i);
        else if (t.getContent)
            this.findInside(e),
            t.getContent(e, this.parser.schema).forEach(a => this.insertNode(a, n, !1));
        else {
            let a = e;
            typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement),
            this.findAround(e, a, !0),
            this.addAll(a, n),
            this.findAround(e, a, !1)
        }
        s && this.sync(l) && this.open--
    }
    addAll(e, t, n, i) {
        let s = n || 0;
        for (let o = n ? e.childNodes[n] : e.firstChild, l = i == null ? null : e.childNodes[i]; o != l; o = o.nextSibling,
        ++s)
            this.findAtPoint(e, s),
            this.addDOM(o, t);
        this.findAtPoint(e, s)
    }
    findPlace(e, t, n) {
        let i, s;
        for (let o = this.open, l = 0; o >= 0; o--) {
            let a = this.nodes[o]
              , c = a.findWrapping(e);
            if (c && (!i || i.length > c.length + l) && (i = c,
            s = a,
            !c.length))
                break;
            if (a.solid) {
                if (n)
                    break;
                l += 2
            }
        }
        if (!i)
            return null;
        this.sync(s);
        for (let o = 0; o < i.length; o++)
            t = this.enterInner(i[o], null, t, !1);
        return t
    }
    insertNode(e, t, n) {
        if (e.isInline && this.needsBlock && !this.top.type) {
            let s = this.textblockFromContext();
            s && (t = this.enterInner(s, null, t))
        }
        let i = this.findPlace(e, t, n);
        if (i) {
            this.closeExtra();
            let s = this.top;
            s.match && (s.match = s.match.matchType(e.type));
            let o = I.none;
            for (let l of i.concat(e.marks))
                (s.type ? s.type.allowsMarkType(l.type) : Er(l.type, e.type)) && (o = l.addToSet(o));
            return s.content.push(e.mark(o)),
            !0
        }
        return !1
    }
    enter(e, t, n, i) {
        let s = this.findPlace(e.create(t), n, !1);
        return s && (s = this.enterInner(e, t, n, !0, i)),
        s
    }
    enterInner(e, t, n, i=!1, s) {
        this.closeExtra();
        let o = this.top;
        o.match = o.match && o.match.matchType(e);
        let l = Or(e, s, o.options);
        o.options & ut && o.content.length == 0 && (l |= ut);
        let a = I.none;
        return n = n.filter(c => (o.type ? o.type.allowsMarkType(c.type) : Er(c.type, e)) ? (a = c.addToSet(a),
        !1) : !0),
        this.nodes.push(new Nt(e,t,a,i,null,l)),
        this.open++,
        n
    }
    closeExtra(e=!1) {
        let t = this.nodes.length - 1;
        if (t > this.open) {
            for (; t > this.open; t--)
                this.nodes[t - 1].content.push(this.nodes[t].finish(e));
            this.nodes.length = this.open + 1
        }
    }
    finish() {
        return this.open = 0,
        this.closeExtra(this.isOpen),
        this.nodes[0].finish(!!(this.isOpen || this.options.topOpen))
    }
    sync(e) {
        for (let t = this.open; t >= 0; t--) {
            if (this.nodes[t] == e)
                return this.open = t,
                !0;
            this.localPreserveWS && (this.nodes[t].options |= gt)
        }
        return !1
    }
    get currentPos() {
        this.closeExtra();
        let e = 0;
        for (let t = this.open; t >= 0; t--) {
            let n = this.nodes[t].content;
            for (let i = n.length - 1; i >= 0; i--)
                e += n[i].nodeSize;
            t && e++
        }
        return e
    }
    findAtPoint(e, t) {
        if (this.find)
            for (let n = 0; n < this.find.length; n++)
                this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos)
    }
    findInside(e) {
        if (this.find)
            for (let t = 0; t < this.find.length; t++)
                this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos)
    }
    findAround(e, t, n) {
        if (e != t && this.find)
            for (let i = 0; i < this.find.length; i++)
                this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (n ? 2 : 4) && (this.find[i].pos = this.currentPos)
    }
    findInText(e) {
        if (this.find)
            for (let t = 0; t < this.find.length; t++)
                this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset))
    }
    matchesContext(e) {
        if (e.indexOf("|") > -1)
            return e.split(/\s*\|\s*/).some(this.matchesContext, this);
        let t = e.split("/")
          , n = this.options.context
          , i = !this.isOpen && (!n || n.parent.type == this.nodes[0].type)
          , s = -(n ? n.depth + 1 : 0) + (i ? 0 : 1)
          , o = (l, a) => {
            for (; l >= 0; l--) {
                let c = t[l];
                if (c == "") {
                    if (l == t.length - 1 || l == 0)
                        continue;
                    for (; a >= s; a--)
                        if (o(l - 1, a))
                            return !0;
                    return !1
                } else {
                    let d = a > 0 || a == 0 && i ? this.nodes[a].type : n && a >= s ? n.node(a - s).type : null;
                    if (!d || d.name != c && !d.isInGroup(c))
                        return !1;
                    a--
                }
            }
            return !0
        }
        ;
        return o(t.length - 1, this.open)
    }
    textblockFromContext() {
        let e = this.options.context;
        if (e)
            for (let t = e.depth; t >= 0; t--) {
                let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
                if (n && n.isTextblock && n.defaultAttrs)
                    return n
            }
        for (let t in this.parser.schema.nodes) {
            let n = this.parser.schema.nodes[t];
            if (n.isTextblock && n.defaultAttrs)
                return n
        }
    }
}
function Vo(r) {
    for (let e = r.firstChild, t = null; e; e = e.nextSibling) {
        let n = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
        n && Ki.hasOwnProperty(n) && t ? (t.appendChild(e),
        e = t) : n == "li" ? t = e : n && (t = null)
    }
}
function $o(r, e) {
    return (r.matches || r.msMatchesSelector || r.webkitMatchesSelector || r.mozMatchesSelector).call(r, e)
}
function Nr(r) {
    let e = {};
    for (let t in r)
        e[t] = r[t];
    return e
}
function Er(r, e) {
    let t = e.schema.nodes;
    for (let n in t) {
        let i = t[n];
        if (!i.allowsMarkType(r))
            continue;
        let s = []
          , o = l => {
            s.push(l);
            for (let a = 0; a < l.edgeCount; a++) {
                let {type: c, next: d} = l.edge(a);
                if (c == e || s.indexOf(d) < 0 && o(d))
                    return !0
            }
        }
        ;
        if (o(i.contentMatch))
            return !0
    }
}
class Ke {
    constructor(e, t) {
        this.nodes = e,
        this.marks = t
    }
    serializeFragment(e, t={}, n) {
        n || (n = un(t).createDocumentFragment());
        let i = n
          , s = [];
        return e.forEach(o => {
            if (s.length || o.marks.length) {
                let l = 0
                  , a = 0;
                for (; l < s.length && a < o.marks.length; ) {
                    let c = o.marks[a];
                    if (!this.marks[c.type.name]) {
                        a++;
                        continue
                    }
                    if (!c.eq(s[l][0]) || c.type.spec.spanning === !1)
                        break;
                    l++,
                    a++
                }
                for (; l < s.length; )
                    i = s.pop()[1];
                for (; a < o.marks.length; ) {
                    let c = o.marks[a++]
                      , d = this.serializeMark(c, o.isInline, t);
                    d && (s.push([c, i]),
                    i.appendChild(d.dom),
                    i = d.contentDOM || d.dom)
                }
            }
            i.appendChild(this.serializeNodeInner(o, t))
        }
        ),
        n
    }
    serializeNodeInner(e, t) {
        let {dom: n, contentDOM: i} = Rt(un(t), this.nodes[e.type.name](e), null, e.attrs);
        if (i) {
            if (e.isLeaf)
                throw new RangeError("Content hole not allowed in a leaf node spec");
            this.serializeFragment(e.content, t, i)
        }
        return n
    }
    serializeNode(e, t={}) {
        let n = this.serializeNodeInner(e, t);
        for (let i = e.marks.length - 1; i >= 0; i--) {
            let s = this.serializeMark(e.marks[i], e.isInline, t);
            s && ((s.contentDOM || s.dom).appendChild(n),
            n = s.dom)
        }
        return n
    }
    serializeMark(e, t, n={}) {
        let i = this.marks[e.type.name];
        return i && Rt(un(n), i(e, t), null, e.attrs)
    }
    static renderSpec(e, t, n=null, i) {
        return Rt(e, t, n, i)
    }
    static fromSchema(e) {
        return e.cached.domSerializer || (e.cached.domSerializer = new Ke(this.nodesFromSchema(e),this.marksFromSchema(e)))
    }
    static nodesFromSchema(e) {
        let t = Dr(e.nodes);
        return t.text || (t.text = n => n.text),
        t
    }
    static marksFromSchema(e) {
        return Dr(e.marks)
    }
}
function Dr(r) {
    let e = {};
    for (let t in r) {
        let n = r[t].spec.toDOM;
        n && (e[t] = n)
    }
    return e
}
function un(r) {
    return r.document || window.document
}
const Ar = new WeakMap;
function Wo(r) {
    let e = Ar.get(r);
    return e === void 0 && Ar.set(r, e = Ho(r)),
    e
}
function Ho(r) {
    let e = null;
    function t(n) {
        if (n && typeof n == "object")
            if (Array.isArray(n))
                if (typeof n[0] == "string")
                    e || (e = []),
                    e.push(n);
                else
                    for (let i = 0; i < n.length; i++)
                        t(n[i]);
            else
                for (let i in n)
                    t(n[i])
    }
    return t(r),
    e
}
function Rt(r, e, t, n) {
    if (typeof e == "string")
        return {
            dom: r.createTextNode(e)
        };
    if (e.nodeType != null)
        return {
            dom: e
        };
    if (e.dom && e.dom.nodeType != null)
        return e;
    let i = e[0], s;
    if (typeof i != "string")
        throw new RangeError("Invalid array passed to renderSpec");
    if (n && (s = Wo(n)) && s.indexOf(e) > -1)
        throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
    let o = i.indexOf(" ");
    o > 0 && (t = i.slice(0, o),
    i = i.slice(o + 1));
    let l, a = t ? r.createElementNS(t, i) : r.createElement(i), c = e[1], d = 1;
    if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
        d = 2;
        for (let f in c)
            if (c[f] != null) {
                let u = f.indexOf(" ");
                u > 0 ? a.setAttributeNS(f.slice(0, u), f.slice(u + 1), c[f]) : f == "style" && a.style ? a.style.cssText = c[f] : a.setAttribute(f, c[f])
            }
    }
    for (let f = d; f < e.length; f++) {
        let u = e[f];
        if (u === 0) {
            if (f < e.length - 1 || f > d)
                throw new RangeError("Content hole must be the only child of its parent node");
            return {
                dom: a,
                contentDOM: a
            }
        } else {
            let {dom: h, contentDOM: p} = Rt(r, u, t, n);
            if (a.appendChild(h),
            p) {
                if (l)
                    throw new RangeError("Multiple content holes");
                l = p
            }
        }
    }
    return {
        dom: a,
        contentDOM: l
    }
}
const Ui = 65535
  , _i = Math.pow(2, 16);
function jo(r, e) {
    return r + e * _i
}
function Ir(r) {
    return r & Ui
}
function Jo(r) {
    return (r - (r & Ui)) / _i
}
const Gi = 1
  , Yi = 2
  , Pt = 4
  , Xi = 8;
class Rn {
    constructor(e, t, n) {
        this.pos = e,
        this.delInfo = t,
        this.recover = n
    }
    get deleted() {
        return (this.delInfo & Xi) > 0
    }
    get deletedBefore() {
        return (this.delInfo & (Gi | Pt)) > 0
    }
    get deletedAfter() {
        return (this.delInfo & (Yi | Pt)) > 0
    }
    get deletedAcross() {
        return (this.delInfo & Pt) > 0
    }
}
class Z {
    constructor(e, t=!1) {
        if (this.ranges = e,
        this.inverted = t,
        !e.length && Z.empty)
            return Z.empty
    }
    recover(e) {
        let t = 0
          , n = Ir(e);
        if (!this.inverted)
            for (let i = 0; i < n; i++)
                t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
        return this.ranges[n * 3] + t + Jo(e)
    }
    mapResult(e, t=1) {
        return this._map(e, t, !1)
    }
    map(e, t=1) {
        return this._map(e, t, !0)
    }
    _map(e, t, n) {
        let i = 0
          , s = this.inverted ? 2 : 1
          , o = this.inverted ? 1 : 2;
        for (let l = 0; l < this.ranges.length; l += 3) {
            let a = this.ranges[l] - (this.inverted ? i : 0);
            if (a > e)
                break;
            let c = this.ranges[l + s]
              , d = this.ranges[l + o]
              , f = a + c;
            if (e <= f) {
                let u = c ? e == a ? -1 : e == f ? 1 : t : t
                  , h = a + i + (u < 0 ? 0 : d);
                if (n)
                    return h;
                let p = e == (t < 0 ? a : f) ? null : jo(l / 3, e - a)
                  , m = e == a ? Yi : e == f ? Gi : Pt;
                return (t < 0 ? e != a : e != f) && (m |= Xi),
                new Rn(h,m,p)
            }
            i += d - c
        }
        return n ? e + i : new Rn(e + i,0,null)
    }
    touches(e, t) {
        let n = 0
          , i = Ir(t)
          , s = this.inverted ? 2 : 1
          , o = this.inverted ? 1 : 2;
        for (let l = 0; l < this.ranges.length; l += 3) {
            let a = this.ranges[l] - (this.inverted ? n : 0);
            if (a > e)
                break;
            let c = this.ranges[l + s]
              , d = a + c;
            if (e <= d && l == i * 3)
                return !0;
            n += this.ranges[l + o] - c
        }
        return !1
    }
    forEach(e) {
        let t = this.inverted ? 2 : 1
          , n = this.inverted ? 1 : 2;
        for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
            let o = this.ranges[i]
              , l = o - (this.inverted ? s : 0)
              , a = o + (this.inverted ? 0 : s)
              , c = this.ranges[i + t]
              , d = this.ranges[i + n];
            e(l, l + c, a, a + d),
            s += d - c
        }
    }
    invert() {
        return new Z(this.ranges,!this.inverted)
    }
    toString() {
        return (this.inverted ? "-" : "") + JSON.stringify(this.ranges)
    }
    static offset(e) {
        return e == 0 ? Z.empty : new Z(e < 0 ? [0, -e, 0] : [0, 0, e])
    }
}
Z.empty = new Z([]);
class Wt {
    constructor(e, t, n=0, i=e ? e.length : 0) {
        this.mirror = t,
        this.from = n,
        this.to = i,
        this._maps = e || [],
        this.ownData = !(e || t)
    }
    get maps() {
        return this._maps
    }
    slice(e=0, t=this.maps.length) {
        return new Wt(this._maps,this.mirror,e,t)
    }
    appendMap(e, t) {
        this.ownData || (this._maps = this._maps.slice(),
        this.mirror = this.mirror && this.mirror.slice(),
        this.ownData = !0),
        this.to = this._maps.push(e),
        t != null && this.setMirror(this._maps.length - 1, t)
    }
    appendMapping(e) {
        for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
            let i = e.getMirror(t);
            this.appendMap(e._maps[t], i != null && i < t ? n + i : void 0)
        }
    }
    getMirror(e) {
        if (this.mirror) {
            for (let t = 0; t < this.mirror.length; t++)
                if (this.mirror[t] == e)
                    return this.mirror[t + (t % 2 ? -1 : 1)]
        }
    }
    setMirror(e, t) {
        this.mirror || (this.mirror = []),
        this.mirror.push(e, t)
    }
    appendMappingInverted(e) {
        for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
            let i = e.getMirror(t);
            this.appendMap(e._maps[t].invert(), i != null && i > t ? n - i - 1 : void 0)
        }
    }
    invert() {
        let e = new Wt;
        return e.appendMappingInverted(this),
        e
    }
    map(e, t=1) {
        if (this.mirror)
            return this._map(e, t, !0);
        for (let n = this.from; n < this.to; n++)
            e = this._maps[n].map(e, t);
        return e
    }
    mapResult(e, t=1) {
        return this._map(e, t, !1)
    }
    _map(e, t, n) {
        let i = 0;
        for (let s = this.from; s < this.to; s++) {
            let o = this._maps[s]
              , l = o.mapResult(e, t);
            if (l.recover != null) {
                let a = this.getMirror(s);
                if (a != null && a > s && a < this.to) {
                    s = a,
                    e = this._maps[a].recover(l.recover);
                    continue
                }
            }
            i |= l.delInfo,
            e = l.pos
        }
        return n ? e : new Rn(e,i,null)
    }
}
const hn = Object.create(null);
class q {
    getMap() {
        return Z.empty
    }
    merge(e) {
        return null
    }
    static fromJSON(e, t) {
        if (!t || !t.stepType)
            throw new RangeError("Invalid input for Step.fromJSON");
        let n = hn[t.stepType];
        if (!n)
            throw new RangeError(`No step type ${t.stepType} defined`);
        return n.fromJSON(e, t)
    }
    static jsonID(e, t) {
        if (e in hn)
            throw new RangeError("Duplicate use of step JSON ID " + e);
        return hn[e] = t,
        t.prototype.jsonID = e,
        t
    }
}
class R {
    constructor(e, t) {
        this.doc = e,
        this.failed = t
    }
    static ok(e) {
        return new R(e,null)
    }
    static fail(e) {
        return new R(null,e)
    }
    static fromReplace(e, t, n, i) {
        try {
            return R.ok(e.replace(t, n, i))
        } catch (s) {
            if (s instanceof Ft)
                return R.fail(s.message);
            throw s
        }
    }
}
function _n(r, e, t) {
    let n = [];
    for (let i = 0; i < r.childCount; i++) {
        let s = r.child(i);
        s.content.size && (s = s.copy(_n(s.content, e, s))),
        s.isInline && (s = e(s, t, i)),
        n.push(s)
    }
    return b.fromArray(n)
}
class xe extends q {
    constructor(e, t, n) {
        super(),
        this.from = e,
        this.to = t,
        this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to)
          , n = e.resolve(this.from)
          , i = n.node(n.sharedDepth(this.to))
          , s = new x(_n(t.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i),t.openStart,t.openEnd);
        return R.fromReplace(e, this.from, this.to, s)
    }
    invert() {
        return new oe(this.from,this.to,this.mark)
    }
    map(e) {
        let t = e.mapResult(this.from, 1)
          , n = e.mapResult(this.to, -1);
        return t.deleted && n.deleted || t.pos >= n.pos ? null : new xe(t.pos,n.pos,this.mark)
    }
    merge(e) {
        return e instanceof xe && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new xe(Math.min(this.from, e.from),Math.max(this.to, e.to),this.mark) : null
    }
    toJSON() {
        return {
            stepType: "addMark",
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(e, t) {
        if (typeof t.from != "number" || typeof t.to != "number")
            throw new RangeError("Invalid input for AddMarkStep.fromJSON");
        return new xe(t.from,t.to,e.markFromJSON(t.mark))
    }
}
q.jsonID("addMark", xe);
class oe extends q {
    constructor(e, t, n) {
        super(),
        this.from = e,
        this.to = t,
        this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to)
          , n = new x(_n(t.content, i => i.mark(this.mark.removeFromSet(i.marks)), e),t.openStart,t.openEnd);
        return R.fromReplace(e, this.from, this.to, n)
    }
    invert() {
        return new xe(this.from,this.to,this.mark)
    }
    map(e) {
        let t = e.mapResult(this.from, 1)
          , n = e.mapResult(this.to, -1);
        return t.deleted && n.deleted || t.pos >= n.pos ? null : new oe(t.pos,n.pos,this.mark)
    }
    merge(e) {
        return e instanceof oe && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new oe(Math.min(this.from, e.from),Math.max(this.to, e.to),this.mark) : null
    }
    toJSON() {
        return {
            stepType: "removeMark",
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(e, t) {
        if (typeof t.from != "number" || typeof t.to != "number")
            throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
        return new oe(t.from,t.to,e.markFromJSON(t.mark))
    }
}
q.jsonID("removeMark", oe);
class Se extends q {
    constructor(e, t) {
        super(),
        this.pos = e,
        this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t)
            return R.fail("No node at mark step's position");
        let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
        return R.fromReplace(e, this.pos, this.pos + 1, new x(b.from(n),0,t.isLeaf ? 0 : 1))
    }
    invert(e) {
        let t = e.nodeAt(this.pos);
        if (t) {
            let n = this.mark.addToSet(t.marks);
            if (n.length == t.marks.length) {
                for (let i = 0; i < t.marks.length; i++)
                    if (!t.marks[i].isInSet(n))
                        return new Se(this.pos,t.marks[i]);
                return new Se(this.pos,this.mark)
            }
        }
        return new He(this.pos,this.mark)
    }
    map(e) {
        let t = e.mapResult(this.pos, 1);
        return t.deletedAfter ? null : new Se(t.pos,this.mark)
    }
    toJSON() {
        return {
            stepType: "addNodeMark",
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(e, t) {
        if (typeof t.pos != "number")
            throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
        return new Se(t.pos,e.markFromJSON(t.mark))
    }
}
q.jsonID("addNodeMark", Se);
class He extends q {
    constructor(e, t) {
        super(),
        this.pos = e,
        this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t)
            return R.fail("No node at mark step's position");
        let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
        return R.fromReplace(e, this.pos, this.pos + 1, new x(b.from(n),0,t.isLeaf ? 0 : 1))
    }
    invert(e) {
        let t = e.nodeAt(this.pos);
        return !t || !this.mark.isInSet(t.marks) ? this : new Se(this.pos,this.mark)
    }
    map(e) {
        let t = e.mapResult(this.pos, 1);
        return t.deletedAfter ? null : new He(t.pos,this.mark)
    }
    toJSON() {
        return {
            stepType: "removeNodeMark",
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(e, t) {
        if (typeof t.pos != "number")
            throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
        return new He(t.pos,e.markFromJSON(t.mark))
    }
}
q.jsonID("removeNodeMark", He);
class F extends q {
    constructor(e, t, n, i=!1) {
        super(),
        this.from = e,
        this.to = t,
        this.slice = n,
        this.structure = i
    }
    apply(e) {
        return this.structure && Pn(e, this.from, this.to) ? R.fail("Structure replace would overwrite content") : R.fromReplace(e, this.from, this.to, this.slice)
    }
    getMap() {
        return new Z([this.from, this.to - this.from, this.slice.size])
    }
    invert(e) {
        return new F(this.from,this.from + this.slice.size,e.slice(this.from, this.to))
    }
    map(e) {
        let t = e.mapResult(this.from, 1)
          , n = e.mapResult(this.to, -1);
        return t.deletedAcross && n.deletedAcross ? null : new F(t.pos,Math.max(t.pos, n.pos),this.slice,this.structure)
    }
    merge(e) {
        if (!(e instanceof F) || e.structure || this.structure)
            return null;
        if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
            let t = this.slice.size + e.slice.size == 0 ? x.empty : new x(this.slice.content.append(e.slice.content),this.slice.openStart,e.slice.openEnd);
            return new F(this.from,this.to + (e.to - e.from),t,this.structure)
        } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
            let t = this.slice.size + e.slice.size == 0 ? x.empty : new x(e.slice.content.append(this.slice.content),e.slice.openStart,this.slice.openEnd);
            return new F(e.from,this.to,t,this.structure)
        } else
            return null
    }
    toJSON() {
        let e = {
            stepType: "replace",
            from: this.from,
            to: this.to
        };
        return this.slice.size && (e.slice = this.slice.toJSON()),
        this.structure && (e.structure = !0),
        e
    }
    static fromJSON(e, t) {
        if (typeof t.from != "number" || typeof t.to != "number")
            throw new RangeError("Invalid input for ReplaceStep.fromJSON");
        return new F(t.from,t.to,x.fromJSON(e, t.slice),!!t.structure)
    }
}
q.jsonID("replace", F);
class L extends q {
    constructor(e, t, n, i, s, o, l=!1) {
        super(),
        this.from = e,
        this.to = t,
        this.gapFrom = n,
        this.gapTo = i,
        this.slice = s,
        this.insert = o,
        this.structure = l
    }
    apply(e) {
        if (this.structure && (Pn(e, this.from, this.gapFrom) || Pn(e, this.gapTo, this.to)))
            return R.fail("Structure gap-replace would overwrite content");
        let t = e.slice(this.gapFrom, this.gapTo);
        if (t.openStart || t.openEnd)
            return R.fail("Gap is not a flat range");
        let n = this.slice.insertAt(this.insert, t.content);
        return n ? R.fromReplace(e, this.from, this.to, n) : R.fail("Content does not fit in gap")
    }
    getMap() {
        return new Z([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert])
    }
    invert(e) {
        let t = this.gapTo - this.gapFrom;
        return new L(this.from,this.from + this.slice.size + t,this.from + this.insert,this.from + this.insert + t,e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from),this.gapFrom - this.from,this.structure)
    }
    map(e) {
        let t = e.mapResult(this.from, 1)
          , n = e.mapResult(this.to, -1)
          , i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1)
          , s = this.to == this.gapTo ? n.pos : e.map(this.gapTo, 1);
        return t.deletedAcross && n.deletedAcross || i < t.pos || s > n.pos ? null : new L(t.pos,n.pos,i,s,this.slice,this.insert,this.structure)
    }
    toJSON() {
        let e = {
            stepType: "replaceAround",
            from: this.from,
            to: this.to,
            gapFrom: this.gapFrom,
            gapTo: this.gapTo,
            insert: this.insert
        };
        return this.slice.size && (e.slice = this.slice.toJSON()),
        this.structure && (e.structure = !0),
        e
    }
    static fromJSON(e, t) {
        if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
            throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
        return new L(t.from,t.to,t.gapFrom,t.gapTo,x.fromJSON(e, t.slice),t.insert,!!t.structure)
    }
}
q.jsonID("replaceAround", L);
function Pn(r, e, t) {
    let n = r.resolve(e)
      , i = t - e
      , s = n.depth;
    for (; i > 0 && s > 0 && n.indexAfter(s) == n.node(s).childCount; )
        s--,
        i--;
    if (i > 0) {
        let o = n.node(s).maybeChild(n.indexAfter(s));
        for (; i > 0; ) {
            if (!o || o.isLeaf)
                return !0;
            o = o.firstChild,
            i--
        }
    }
    return !1
}
function qo(r, e, t, n) {
    let i = [], s = [], o, l;
    r.doc.nodesBetween(e, t, (a, c, d) => {
        if (!a.isInline)
            return;
        let f = a.marks;
        if (!n.isInSet(f) && d.type.allowsMarkType(n.type)) {
            let u = Math.max(c, e)
              , h = Math.min(c + a.nodeSize, t)
              , p = n.addToSet(f);
            for (let m = 0; m < f.length; m++)
                f[m].isInSet(p) || (o && o.to == u && o.mark.eq(f[m]) ? o.to = h : i.push(o = new oe(u,h,f[m])));
            l && l.to == u ? l.to = h : s.push(l = new xe(u,h,n))
        }
    }
    ),
    i.forEach(a => r.step(a)),
    s.forEach(a => r.step(a))
}
function Ko(r, e, t, n) {
    let i = []
      , s = 0;
    r.doc.nodesBetween(e, t, (o, l) => {
        if (!o.isInline)
            return;
        s++;
        let a = null;
        if (n instanceof Xt) {
            let c = o.marks, d;
            for (; d = n.isInSet(c); )
                (a || (a = [])).push(d),
                c = d.removeFromSet(c)
        } else
            n ? n.isInSet(o.marks) && (a = [n]) : a = o.marks;
        if (a && a.length) {
            let c = Math.min(l + o.nodeSize, t);
            for (let d = 0; d < a.length; d++) {
                let f = a[d], u;
                for (let h = 0; h < i.length; h++) {
                    let p = i[h];
                    p.step == s - 1 && f.eq(i[h].style) && (u = p)
                }
                u ? (u.to = c,
                u.step = s) : i.push({
                    style: f,
                    from: Math.max(l, e),
                    to: c,
                    step: s
                })
            }
        }
    }
    ),
    i.forEach(o => r.step(new oe(o.from,o.to,o.style)))
}
function Gn(r, e, t, n=t.contentMatch, i=!0) {
    let s = r.doc.nodeAt(e)
      , o = []
      , l = e + 1;
    for (let a = 0; a < s.childCount; a++) {
        let c = s.child(a)
          , d = l + c.nodeSize
          , f = n.matchType(c.type);
        if (!f)
            o.push(new F(l,d,x.empty));
        else {
            n = f;
            for (let u = 0; u < c.marks.length; u++)
                t.allowsMarkType(c.marks[u].type) || r.step(new oe(l,d,c.marks[u]));
            if (i && c.isText && t.whitespace != "pre") {
                let u, h = /\r?\n|\r/g, p;
                for (; u = h.exec(c.text); )
                    p || (p = new x(b.from(t.schema.text(" ", t.allowedMarks(c.marks))),0,0)),
                    o.push(new F(l + u.index,l + u.index + u[0].length,p))
            }
        }
        l = d
    }
    if (!n.validEnd) {
        let a = n.fillBefore(b.empty, !0);
        r.replace(l, l, new x(a,0,0))
    }
    for (let a = o.length - 1; a >= 0; a--)
        r.step(o[a])
}
function Uo(r, e, t) {
    return (e == 0 || r.canReplace(e, r.childCount)) && (t == r.childCount || r.canReplace(0, t))
}
function ot(r) {
    let t = r.parent.content.cutByIndex(r.startIndex, r.endIndex);
    for (let n = r.depth; ; --n) {
        let i = r.$from.node(n)
          , s = r.$from.index(n)
          , o = r.$to.indexAfter(n);
        if (n < r.depth && i.canReplace(s, o, t))
            return n;
        if (n == 0 || i.type.spec.isolating || !Uo(i, s, o))
            break
    }
    return null
}
function _o(r, e, t) {
    let {$from: n, $to: i, depth: s} = e
      , o = n.before(s + 1)
      , l = i.after(s + 1)
      , a = o
      , c = l
      , d = b.empty
      , f = 0;
    for (let p = s, m = !1; p > t; p--)
        m || n.index(p) > 0 ? (m = !0,
        d = b.from(n.node(p).copy(d)),
        f++) : a--;
    let u = b.empty
      , h = 0;
    for (let p = s, m = !1; p > t; p--)
        m || i.after(p + 1) < i.end(p) ? (m = !0,
        u = b.from(i.node(p).copy(u)),
        h++) : c++;
    r.step(new L(a,c,o,l,new x(d.append(u),f,h),d.size - f,!0))
}
function Yn(r, e, t=null, n=r) {
    let i = Go(r, e)
      , s = i && Yo(n, e);
    return s ? i.map(vr).concat({
        type: e,
        attrs: t
    }).concat(s.map(vr)) : null
}
function vr(r) {
    return {
        type: r,
        attrs: null
    }
}
function Go(r, e) {
    let {parent: t, startIndex: n, endIndex: i} = r
      , s = t.contentMatchAt(n).findWrapping(e);
    if (!s)
        return null;
    let o = s.length ? s[0] : e;
    return t.canReplaceWith(n, i, o) ? s : null
}
function Yo(r, e) {
    let {parent: t, startIndex: n, endIndex: i} = r
      , s = t.child(n)
      , o = e.contentMatch.findWrapping(s.type);
    if (!o)
        return null;
    let a = (o.length ? o[o.length - 1] : e).contentMatch;
    for (let c = n; a && c < i; c++)
        a = a.matchType(t.child(c).type);
    return !a || !a.validEnd ? null : o
}
function Xo(r, e, t) {
    let n = b.empty;
    for (let o = t.length - 1; o >= 0; o--) {
        if (n.size) {
            let l = t[o].type.contentMatch.matchFragment(n);
            if (!l || !l.validEnd)
                throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper")
        }
        n = b.from(t[o].type.create(t[o].attrs, n))
    }
    let i = e.start
      , s = e.end;
    r.step(new L(i,s,i,s,new x(n,0,0),t.length,!0))
}
function Zo(r, e, t, n, i) {
    if (!n.isTextblock)
        throw new RangeError("Type given to setBlockType should be a textblock");
    let s = r.steps.length;
    r.doc.nodesBetween(e, t, (o, l) => {
        let a = typeof i == "function" ? i(o) : i;
        if (o.isTextblock && !o.hasMarkup(n, a) && Qo(r.doc, r.mapping.slice(s).map(l), n)) {
            let c = null;
            if (n.schema.linebreakReplacement) {
                let h = n.whitespace == "pre"
                  , p = !!n.contentMatch.matchType(n.schema.linebreakReplacement);
                h && !p ? c = !1 : !h && p && (c = !0)
            }
            c === !1 && Qi(r, o, l, s),
            Gn(r, r.mapping.slice(s).map(l, 1), n, void 0, c === null);
            let d = r.mapping.slice(s)
              , f = d.map(l, 1)
              , u = d.map(l + o.nodeSize, 1);
            return r.step(new L(f,u,f + 1,u - 1,new x(b.from(n.create(a, null, o.marks)),0,0),1,!0)),
            c === !0 && Zi(r, o, l, s),
            !1
        }
    }
    )
}
function Zi(r, e, t, n) {
    e.forEach( (i, s) => {
        if (i.isText) {
            let o, l = /\r?\n|\r/g;
            for (; o = l.exec(i.text); ) {
                let a = r.mapping.slice(n).map(t + 1 + s + o.index);
                r.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create())
            }
        }
    }
    )
}
function Qi(r, e, t, n) {
    e.forEach( (i, s) => {
        if (i.type == i.type.schema.linebreakReplacement) {
            let o = r.mapping.slice(n).map(t + 1 + s);
            r.replaceWith(o, o + 1, e.type.schema.text(`
`))
        }
    }
    )
}
function Qo(r, e, t) {
    let n = r.resolve(e)
      , i = n.index();
    return n.parent.canReplaceWith(i, i + 1, t)
}
function el(r, e, t, n, i) {
    let s = r.doc.nodeAt(e);
    if (!s)
        throw new RangeError("No node at given position");
    t || (t = s.type);
    let o = t.create(n, null, i || s.marks);
    if (s.isLeaf)
        return r.replaceWith(e, e + s.nodeSize, o);
    if (!t.validContent(s.content))
        throw new RangeError("Invalid content for node type " + t.name);
    r.step(new L(e,e + s.nodeSize,e + 1,e + s.nodeSize - 1,new x(b.from(o),0,0),1,!0))
}
function pe(r, e, t=1, n) {
    let i = r.resolve(e)
      , s = i.depth - t
      , o = n && n[n.length - 1] || i.parent;
    if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
        return !1;
    for (let c = i.depth - 1, d = t - 2; c > s; c--,
    d--) {
        let f = i.node(c)
          , u = i.index(c);
        if (f.type.spec.isolating)
            return !1;
        let h = f.content.cutByIndex(u, f.childCount)
          , p = n && n[d + 1];
        p && (h = h.replaceChild(0, p.type.create(p.attrs)));
        let m = n && n[d] || f;
        if (!f.canReplace(u + 1, f.childCount) || !m.type.validContent(h))
            return !1
    }
    let l = i.indexAfter(s)
      , a = n && n[0];
    return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type)
}
function tl(r, e, t=1, n) {
    let i = r.doc.resolve(e)
      , s = b.empty
      , o = b.empty;
    for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--,
    c--) {
        s = b.from(i.node(l).copy(s));
        let d = n && n[c];
        o = b.from(d ? d.type.create(d.attrs, o) : i.node(l).copy(o))
    }
    r.step(new F(e,e,new x(s.append(o),t,t),!0))
}
function De(r, e) {
    let t = r.resolve(e)
      , n = t.index();
    return es(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(n, n + 1)
}
function nl(r, e) {
    e.content.size || r.type.compatibleContent(e.type);
    let t = r.contentMatchAt(r.childCount)
      , {linebreakReplacement: n} = r.type.schema;
    for (let i = 0; i < e.childCount; i++) {
        let s = e.child(i)
          , o = s.type == n ? r.type.schema.nodes.text : s.type;
        if (t = t.matchType(o),
        !t || !r.type.allowsMarks(s.marks))
            return !1
    }
    return t.validEnd
}
function es(r, e) {
    return !!(r && e && !r.isLeaf && nl(r, e))
}
function Zt(r, e, t=-1) {
    let n = r.resolve(e);
    for (let i = n.depth; ; i--) {
        let s, o, l = n.index(i);
        if (i == n.depth ? (s = n.nodeBefore,
        o = n.nodeAfter) : t > 0 ? (s = n.node(i + 1),
        l++,
        o = n.node(i).maybeChild(l)) : (s = n.node(i).maybeChild(l - 1),
        o = n.node(i + 1)),
        s && !s.isTextblock && es(s, o) && n.node(i).canReplace(l, l + 1))
            return e;
        if (i == 0)
            break;
        e = t < 0 ? n.before(i) : n.after(i)
    }
}
function rl(r, e, t) {
    let n = null
      , {linebreakReplacement: i} = r.doc.type.schema
      , s = r.doc.resolve(e - t)
      , o = s.node().type;
    if (i && o.inlineContent) {
        let d = o.whitespace == "pre"
          , f = !!o.contentMatch.matchType(i);
        d && !f ? n = !1 : !d && f && (n = !0)
    }
    let l = r.steps.length;
    if (n === !1) {
        let d = r.doc.resolve(e + t);
        Qi(r, d.node(), d.before(), l)
    }
    o.inlineContent && Gn(r, e + t - 1, o, s.node().contentMatchAt(s.index()), n == null);
    let a = r.mapping.slice(l)
      , c = a.map(e - t);
    if (r.step(new F(c,a.map(e + t, -1),x.empty,!0)),
    n === !0) {
        let d = r.doc.resolve(c);
        Zi(r, d.node(), d.before(), r.steps.length)
    }
    return r
}
function il(r, e, t) {
    let n = r.resolve(e);
    if (n.parent.canReplaceWith(n.index(), n.index(), t))
        return e;
    if (n.parentOffset == 0)
        for (let i = n.depth - 1; i >= 0; i--) {
            let s = n.index(i);
            if (n.node(i).canReplaceWith(s, s, t))
                return n.before(i + 1);
            if (s > 0)
                return null
        }
    if (n.parentOffset == n.parent.content.size)
        for (let i = n.depth - 1; i >= 0; i--) {
            let s = n.indexAfter(i);
            if (n.node(i).canReplaceWith(s, s, t))
                return n.after(i + 1);
            if (s < n.node(i).childCount)
                return null
        }
    return null
}
function sl(r, e, t) {
    let n = r.resolve(e);
    if (!t.content.size)
        return e;
    let i = t.content;
    for (let s = 0; s < t.openStart; s++)
        i = i.firstChild.content;
    for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
        for (let o = n.depth; o >= 0; o--) {
            let l = o == n.depth ? 0 : n.pos <= (n.start(o + 1) + n.end(o + 1)) / 2 ? -1 : 1
              , a = n.index(o) + (l > 0 ? 1 : 0)
              , c = n.node(o)
              , d = !1;
            if (s == 1)
                d = c.canReplace(a, a, i);
            else {
                let f = c.contentMatchAt(a).findWrapping(i.firstChild.type);
                d = f && c.canReplaceWith(a, a, f[0])
            }
            if (d)
                return l == 0 ? n.pos : l < 0 ? n.before(o + 1) : n.after(o + 1)
        }
    return null
}
function Qt(r, e, t=e, n=x.empty) {
    if (e == t && !n.size)
        return null;
    let i = r.resolve(e)
      , s = r.resolve(t);
    return ts(i, s, n) ? new F(e,t,n) : new ol(i,s,n).fit()
}
function ts(r, e, t) {
    return !t.openStart && !t.openEnd && r.start() == e.start() && r.parent.canReplace(r.index(), e.index(), t.content)
}
class ol {
    constructor(e, t, n) {
        this.$from = e,
        this.$to = t,
        this.unplaced = n,
        this.frontier = [],
        this.placed = b.empty;
        for (let i = 0; i <= e.depth; i++) {
            let s = e.node(i);
            this.frontier.push({
                type: s.type,
                match: s.contentMatchAt(e.indexAfter(i))
            })
        }
        for (let i = e.depth; i > 0; i--)
            this.placed = b.from(e.node(i).copy(this.placed))
    }
    get depth() {
        return this.frontier.length - 1
    }
    fit() {
        for (; this.unplaced.size; ) {
            let c = this.findFittable();
            c ? this.placeNodes(c) : this.openMore() || this.dropNode()
        }
        let e = this.mustMoveInline()
          , t = this.placed.size - this.depth - this.$from.depth
          , n = this.$from
          , i = this.close(e < 0 ? this.$to : n.doc.resolve(e));
        if (!i)
            return null;
        let s = this.placed
          , o = n.depth
          , l = i.depth;
        for (; o && l && s.childCount == 1; )
            s = s.firstChild.content,
            o--,
            l--;
        let a = new x(s,o,l);
        return e > -1 ? new L(n.pos,e,this.$to.pos,this.$to.end(),a,t) : a.size || n.pos != this.$to.pos ? new F(n.pos,i.pos,a) : null
    }
    findFittable() {
        let e = this.unplaced.openStart;
        for (let t = this.unplaced.content, n = 0, i = this.unplaced.openEnd; n < e; n++) {
            let s = t.firstChild;
            if (t.childCount > 1 && (i = 0),
            s.type.spec.isolating && i <= n) {
                e = n;
                break
            }
            t = s.content
        }
        for (let t = 1; t <= 2; t++)
            for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
                let i, s = null;
                n ? (s = pn(this.unplaced.content, n - 1).firstChild,
                i = s.content) : i = this.unplaced.content;
                let o = i.firstChild;
                for (let l = this.depth; l >= 0; l--) {
                    let {type: a, match: c} = this.frontier[l], d, f = null;
                    if (t == 1 && (o ? c.matchType(o.type) || (f = c.fillBefore(b.from(o), !1)) : s && a.compatibleContent(s.type)))
                        return {
                            sliceDepth: n,
                            frontierDepth: l,
                            parent: s,
                            inject: f
                        };
                    if (t == 2 && o && (d = c.findWrapping(o.type)))
                        return {
                            sliceDepth: n,
                            frontierDepth: l,
                            parent: s,
                            wrap: d
                        };
                    if (s && c.matchType(s.type))
                        break
                }
            }
    }
    openMore() {
        let {content: e, openStart: t, openEnd: n} = this.unplaced
          , i = pn(e, t);
        return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new x(e,t + 1,Math.max(n, i.size + t >= e.size - n ? t + 1 : 0)),
        !0)
    }
    dropNode() {
        let {content: e, openStart: t, openEnd: n} = this.unplaced
          , i = pn(e, t);
        if (i.childCount <= 1 && t > 0) {
            let s = e.size - t <= t + i.size;
            this.unplaced = new x(at(e, t - 1, 1),t - 1,s ? t - 1 : n)
        } else
            this.unplaced = new x(at(e, t, 1),t,n)
    }
    placeNodes({sliceDepth: e, frontierDepth: t, parent: n, inject: i, wrap: s}) {
        for (; this.depth > t; )
            this.closeFrontierNode();
        if (s)
            for (let m = 0; m < s.length; m++)
                this.openFrontierNode(s[m]);
        let o = this.unplaced
          , l = n ? n.content : o.content
          , a = o.openStart - e
          , c = 0
          , d = []
          , {match: f, type: u} = this.frontier[t];
        if (i) {
            for (let m = 0; m < i.childCount; m++)
                d.push(i.child(m));
            f = f.matchFragment(i)
        }
        let h = l.size + e - (o.content.size - o.openEnd);
        for (; c < l.childCount; ) {
            let m = l.child(c)
              , g = f.matchType(m.type);
            if (!g)
                break;
            c++,
            (c > 1 || a == 0 || m.content.size) && (f = g,
            d.push(ns(m.mark(u.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)))
        }
        let p = c == l.childCount;
        p || (h = -1),
        this.placed = ct(this.placed, t, b.from(d)),
        this.frontier[t].match = f,
        p && h < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
        for (let m = 0, g = l; m < h; m++) {
            let y = g.lastChild;
            this.frontier.push({
                type: y.type,
                match: y.contentMatchAt(y.childCount)
            }),
            g = y.content
        }
        this.unplaced = p ? e == 0 ? x.empty : new x(at(o.content, e - 1, 1),e - 1,h < 0 ? o.openEnd : e - 1) : new x(at(o.content, e, c),o.openStart,o.openEnd)
    }
    mustMoveInline() {
        if (!this.$to.parent.isTextblock)
            return -1;
        let e = this.frontier[this.depth], t;
        if (!e.type.isTextblock || !mn(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
            return -1;
        let {depth: n} = this.$to
          , i = this.$to.after(n);
        for (; n > 1 && i == this.$to.end(--n); )
            ++i;
        return i
    }
    findCloseLevel(e) {
        e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
            let {match: n, type: i} = this.frontier[t]
              , s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1))
              , o = mn(e, t, i, n, s);
            if (o) {
                for (let l = t - 1; l >= 0; l--) {
                    let {match: a, type: c} = this.frontier[l]
                      , d = mn(e, l, c, a, !0);
                    if (!d || d.childCount)
                        continue e
                }
                return {
                    depth: t,
                    fit: o,
                    move: s ? e.doc.resolve(e.after(t + 1)) : e
                }
            }
        }
    }
    close(e) {
        let t = this.findCloseLevel(e);
        if (!t)
            return null;
        for (; this.depth > t.depth; )
            this.closeFrontierNode();
        t.fit.childCount && (this.placed = ct(this.placed, t.depth, t.fit)),
        e = t.move;
        for (let n = t.depth + 1; n <= e.depth; n++) {
            let i = e.node(n)
              , s = i.type.contentMatch.fillBefore(i.content, !0, e.index(n));
            this.openFrontierNode(i.type, i.attrs, s)
        }
        return e
    }
    openFrontierNode(e, t=null, n) {
        let i = this.frontier[this.depth];
        i.match = i.match.matchType(e),
        this.placed = ct(this.placed, this.depth, b.from(e.create(t, n))),
        this.frontier.push({
            type: e,
            match: e.contentMatch
        })
    }
    closeFrontierNode() {
        let t = this.frontier.pop().match.fillBefore(b.empty, !0);
        t.childCount && (this.placed = ct(this.placed, this.frontier.length, t))
    }
}
function at(r, e, t) {
    return e == 0 ? r.cutByIndex(t, r.childCount) : r.replaceChild(0, r.firstChild.copy(at(r.firstChild.content, e - 1, t)))
}
function ct(r, e, t) {
    return e == 0 ? r.append(t) : r.replaceChild(r.childCount - 1, r.lastChild.copy(ct(r.lastChild.content, e - 1, t)))
}
function pn(r, e) {
    for (let t = 0; t < e; t++)
        r = r.firstChild.content;
    return r
}
function ns(r, e, t) {
    if (e <= 0)
        return r;
    let n = r.content;
    return e > 1 && (n = n.replaceChild(0, ns(n.firstChild, e - 1, n.childCount == 1 ? t - 1 : 0))),
    e > 0 && (n = r.type.contentMatch.fillBefore(n).append(n),
    t <= 0 && (n = n.append(r.type.contentMatch.matchFragment(n).fillBefore(b.empty, !0)))),
    r.copy(n)
}
function mn(r, e, t, n, i) {
    let s = r.node(e)
      , o = i ? r.indexAfter(e) : r.index(e);
    if (o == s.childCount && !t.compatibleContent(s.type))
        return null;
    let l = n.fillBefore(s.content, !0, o);
    return l && !ll(t, s.content, o) ? l : null
}
function ll(r, e, t) {
    for (let n = t; n < e.childCount; n++)
        if (!r.allowsMarks(e.child(n).marks))
            return !0;
    return !1
}
function al(r) {
    return r.spec.defining || r.spec.definingForContent
}
function cl(r, e, t, n) {
    if (!n.size)
        return r.deleteRange(e, t);
    let i = r.doc.resolve(e)
      , s = r.doc.resolve(t);
    if (ts(i, s, n))
        return r.step(new F(e,t,n));
    let o = is(i, r.doc.resolve(t));
    o[o.length - 1] == 0 && o.pop();
    let l = -(i.depth + 1);
    o.unshift(l);
    for (let u = i.depth, h = i.pos - 1; u > 0; u--,
    h--) {
        let p = i.node(u).type.spec;
        if (p.defining || p.definingAsContext || p.isolating)
            break;
        o.indexOf(u) > -1 ? l = u : i.before(u) == h && o.splice(1, 0, -u)
    }
    let a = o.indexOf(l)
      , c = []
      , d = n.openStart;
    for (let u = n.content, h = 0; ; h++) {
        let p = u.firstChild;
        if (c.push(p),
        h == n.openStart)
            break;
        u = p.content
    }
    for (let u = d - 1; u >= 0; u--) {
        let h = c[u]
          , p = al(h.type);
        if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
            d = u;
        else if (p || !h.type.isTextblock)
            break
    }
    for (let u = n.openStart; u >= 0; u--) {
        let h = (u + d + 1) % (n.openStart + 1)
          , p = c[h];
        if (p)
            for (let m = 0; m < o.length; m++) {
                let g = o[(m + a) % o.length]
                  , y = !0;
                g < 0 && (y = !1,
                g = -g);
                let C = i.node(g - 1)
                  , O = i.index(g - 1);
                if (C.canReplaceWith(O, O, p.type, p.marks))
                    return r.replace(i.before(g), y ? s.after(g) : t, new x(rs(n.content, 0, n.openStart, h),h,n.openEnd))
            }
    }
    let f = r.steps.length;
    for (let u = o.length - 1; u >= 0 && (r.replace(e, t, n),
    !(r.steps.length > f)); u--) {
        let h = o[u];
        h < 0 || (e = i.before(h),
        t = s.after(h))
    }
}
function rs(r, e, t, n, i) {
    if (e < t) {
        let s = r.firstChild;
        r = r.replaceChild(0, s.copy(rs(s.content, e + 1, t, n, s)))
    }
    if (e > n) {
        let s = i.contentMatchAt(0)
          , o = s.fillBefore(r).append(r);
        r = o.append(s.matchFragment(o).fillBefore(b.empty, !0))
    }
    return r
}
function dl(r, e, t, n) {
    if (!n.isInline && e == t && r.doc.resolve(e).parent.content.size) {
        let i = il(r.doc, e, n.type);
        i != null && (e = t = i)
    }
    r.replaceRange(e, t, new x(b.from(n),0,0))
}
function fl(r, e, t) {
    let n = r.doc.resolve(e)
      , i = r.doc.resolve(t)
      , s = is(n, i);
    for (let o = 0; o < s.length; o++) {
        let l = s[o]
          , a = o == s.length - 1;
        if (a && l == 0 || n.node(l).type.contentMatch.validEnd)
            return r.delete(n.start(l), i.end(l));
        if (l > 0 && (a || n.node(l - 1).canReplace(n.index(l - 1), i.indexAfter(l - 1))))
            return r.delete(n.before(l), i.after(l))
    }
    for (let o = 1; o <= n.depth && o <= i.depth; o++)
        if (e - n.start(o) == n.depth - o && t > n.end(o) && i.end(o) - t != i.depth - o && n.start(o - 1) == i.start(o - 1) && n.node(o - 1).canReplace(n.index(o - 1), i.index(o - 1)))
            return r.delete(n.before(o), t);
    r.delete(e, t)
}
function is(r, e) {
    let t = []
      , n = Math.min(r.depth, e.depth);
    for (let i = n; i >= 0; i--) {
        let s = r.start(i);
        if (s < r.pos - (r.depth - i) || e.end(i) > e.pos + (e.depth - i) || r.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
            break;
        (s == e.start(i) || i == r.depth && i == e.depth && r.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && t.push(i)
    }
    return t
}
class et extends q {
    constructor(e, t, n) {
        super(),
        this.pos = e,
        this.attr = t,
        this.value = n
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t)
            return R.fail("No node at attribute step's position");
        let n = Object.create(null);
        for (let s in t.attrs)
            n[s] = t.attrs[s];
        n[this.attr] = this.value;
        let i = t.type.create(n, null, t.marks);
        return R.fromReplace(e, this.pos, this.pos + 1, new x(b.from(i),0,t.isLeaf ? 0 : 1))
    }
    getMap() {
        return Z.empty
    }
    invert(e) {
        return new et(this.pos,this.attr,e.nodeAt(this.pos).attrs[this.attr])
    }
    map(e) {
        let t = e.mapResult(this.pos, 1);
        return t.deletedAfter ? null : new et(t.pos,this.attr,this.value)
    }
    toJSON() {
        return {
            stepType: "attr",
            pos: this.pos,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(e, t) {
        if (typeof t.pos != "number" || typeof t.attr != "string")
            throw new RangeError("Invalid input for AttrStep.fromJSON");
        return new et(t.pos,t.attr,t.value)
    }
}
q.jsonID("attr", et);
class yt extends q {
    constructor(e, t) {
        super(),
        this.attr = e,
        this.value = t
    }
    apply(e) {
        let t = Object.create(null);
        for (let i in e.attrs)
            t[i] = e.attrs[i];
        t[this.attr] = this.value;
        let n = e.type.create(t, e.content, e.marks);
        return R.ok(n)
    }
    getMap() {
        return Z.empty
    }
    invert(e) {
        return new yt(this.attr,e.attrs[this.attr])
    }
    map(e) {
        return this
    }
    toJSON() {
        return {
            stepType: "docAttr",
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(e, t) {
        if (typeof t.attr != "string")
            throw new RangeError("Invalid input for DocAttrStep.fromJSON");
        return new yt(t.attr,t.value)
    }
}
q.jsonID("docAttr", yt);
let nt = class extends Error {
}
;
nt = function r(e) {
    let t = Error.call(this, e);
    return t.__proto__ = r.prototype,
    t
}
;
nt.prototype = Object.create(Error.prototype);
nt.prototype.constructor = nt;
nt.prototype.name = "TransformError";
class ss {
    constructor(e) {
        this.doc = e,
        this.steps = [],
        this.docs = [],
        this.mapping = new Wt
    }
    get before() {
        return this.docs.length ? this.docs[0] : this.doc
    }
    step(e) {
        let t = this.maybeStep(e);
        if (t.failed)
            throw new nt(t.failed);
        return this
    }
    maybeStep(e) {
        let t = e.apply(this.doc);
        return t.failed || this.addStep(e, t.doc),
        t
    }
    get docChanged() {
        return this.steps.length > 0
    }
    addStep(e, t) {
        this.docs.push(this.doc),
        this.steps.push(e),
        this.mapping.appendMap(e.getMap()),
        this.doc = t
    }
    replace(e, t=e, n=x.empty) {
        let i = Qt(this.doc, e, t, n);
        return i && this.step(i),
        this
    }
    replaceWith(e, t, n) {
        return this.replace(e, t, new x(b.from(n),0,0))
    }
    delete(e, t) {
        return this.replace(e, t, x.empty)
    }
    insert(e, t) {
        return this.replaceWith(e, e, t)
    }
    replaceRange(e, t, n) {
        return cl(this, e, t, n),
        this
    }
    replaceRangeWith(e, t, n) {
        return dl(this, e, t, n),
        this
    }
    deleteRange(e, t) {
        return fl(this, e, t),
        this
    }
    lift(e, t) {
        return _o(this, e, t),
        this
    }
    join(e, t=1) {
        return rl(this, e, t),
        this
    }
    wrap(e, t) {
        return Xo(this, e, t),
        this
    }
    setBlockType(e, t=e, n, i=null) {
        return Zo(this, e, t, n, i),
        this
    }
    setNodeMarkup(e, t, n=null, i) {
        return el(this, e, t, n, i),
        this
    }
    setNodeAttribute(e, t, n) {
        return this.step(new et(e,t,n)),
        this
    }
    setDocAttribute(e, t) {
        return this.step(new yt(e,t)),
        this
    }
    addNodeMark(e, t) {
        return this.step(new Se(e,t)),
        this
    }
    removeNodeMark(e, t) {
        let n = this.doc.nodeAt(e);
        if (!n)
            throw new RangeError("No node at position " + e);
        if (t instanceof I)
            t.isInSet(n.marks) && this.step(new He(e,t));
        else {
            let i = n.marks, s, o = [];
            for (; s = t.isInSet(i); )
                o.push(new He(e,s)),
                i = s.removeFromSet(i);
            for (let l = o.length - 1; l >= 0; l--)
                this.step(o[l])
        }
        return this
    }
    split(e, t=1, n) {
        return tl(this, e, t, n),
        this
    }
    addMark(e, t, n) {
        return qo(this, e, t, n),
        this
    }
    removeMark(e, t, n) {
        return Ko(this, e, t, n),
        this
    }
    clearIncompatible(e, t, n) {
        return Gn(this, e, t, n),
        this
    }
}
const gn = Object.create(null);
class E {
    constructor(e, t, n) {
        this.$anchor = e,
        this.$head = t,
        this.ranges = n || [new ul(e.min(t),e.max(t))]
    }
    get anchor() {
        return this.$anchor.pos
    }
    get head() {
        return this.$head.pos
    }
    get from() {
        return this.$from.pos
    }
    get to() {
        return this.$to.pos
    }
    get $from() {
        return this.ranges[0].$from
    }
    get $to() {
        return this.ranges[0].$to
    }
    get empty() {
        let e = this.ranges;
        for (let t = 0; t < e.length; t++)
            if (e[t].$from.pos != e[t].$to.pos)
                return !1;
        return !0
    }
    content() {
        return this.$from.doc.slice(this.from, this.to, !0)
    }
    replace(e, t=x.empty) {
        let n = t.content.lastChild
          , i = null;
        for (let l = 0; l < t.openEnd; l++)
            i = n,
            n = n.lastChild;
        let s = e.steps.length
          , o = this.ranges;
        for (let l = 0; l < o.length; l++) {
            let {$from: a, $to: c} = o[l]
              , d = e.mapping.slice(s);
            e.replaceRange(d.map(a.pos), d.map(c.pos), l ? x.empty : t),
            l == 0 && Br(e, s, (n ? n.isInline : i && i.isTextblock) ? -1 : 1)
        }
    }
    replaceWith(e, t) {
        let n = e.steps.length
          , i = this.ranges;
        for (let s = 0; s < i.length; s++) {
            let {$from: o, $to: l} = i[s]
              , a = e.mapping.slice(n)
              , c = a.map(o.pos)
              , d = a.map(l.pos);
            s ? e.deleteRange(c, d) : (e.replaceRangeWith(c, d, t),
            Br(e, n, t.isInline ? -1 : 1))
        }
    }
    static findFrom(e, t, n=!1) {
        let i = e.parent.inlineContent ? new T(e) : Ye(e.node(0), e.parent, e.pos, e.index(), t, n);
        if (i)
            return i;
        for (let s = e.depth - 1; s >= 0; s--) {
            let o = t < 0 ? Ye(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, n) : Ye(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, n);
            if (o)
                return o
        }
        return null
    }
    static near(e, t=1) {
        return this.findFrom(e, t) || this.findFrom(e, -t) || new Q(e.node(0))
    }
    static atStart(e) {
        return Ye(e, e, 0, 0, 1) || new Q(e)
    }
    static atEnd(e) {
        return Ye(e, e, e.content.size, e.childCount, -1) || new Q(e)
    }
    static fromJSON(e, t) {
        if (!t || !t.type)
            throw new RangeError("Invalid input for Selection.fromJSON");
        let n = gn[t.type];
        if (!n)
            throw new RangeError(`No selection type ${t.type} defined`);
        return n.fromJSON(e, t)
    }
    static jsonID(e, t) {
        if (e in gn)
            throw new RangeError("Duplicate use of selection JSON ID " + e);
        return gn[e] = t,
        t.prototype.jsonID = e,
        t
    }
    getBookmark() {
        return T.between(this.$anchor, this.$head).getBookmark()
    }
}
E.prototype.visible = !0;
class ul {
    constructor(e, t) {
        this.$from = e,
        this.$to = t
    }
}
let Rr = !1;
function Pr(r) {
    !Rr && !r.parent.inlineContent && (Rr = !0)
}
class T extends E {
    constructor(e, t=e) {
        Pr(e),
        Pr(t),
        super(e, t)
    }
    get $cursor() {
        return this.$anchor.pos == this.$head.pos ? this.$head : null
    }
    map(e, t) {
        let n = e.resolve(t.map(this.head));
        if (!n.parent.inlineContent)
            return E.near(n);
        let i = e.resolve(t.map(this.anchor));
        return new T(i.parent.inlineContent ? i : n,n)
    }
    replace(e, t=x.empty) {
        if (super.replace(e, t),
        t == x.empty) {
            let n = this.$from.marksAcross(this.$to);
            n && e.ensureMarks(n)
        }
    }
    eq(e) {
        return e instanceof T && e.anchor == this.anchor && e.head == this.head
    }
    getBookmark() {
        return new en(this.anchor,this.head)
    }
    toJSON() {
        return {
            type: "text",
            anchor: this.anchor,
            head: this.head
        }
    }
    static fromJSON(e, t) {
        if (typeof t.anchor != "number" || typeof t.head != "number")
            throw new RangeError("Invalid input for TextSelection.fromJSON");
        return new T(e.resolve(t.anchor),e.resolve(t.head))
    }
    static create(e, t, n=t) {
        let i = e.resolve(t);
        return new this(i,n == t ? i : e.resolve(n))
    }
    static between(e, t, n) {
        let i = e.pos - t.pos;
        if ((!n || i) && (n = i >= 0 ? 1 : -1),
        !t.parent.inlineContent) {
            let s = E.findFrom(t, n, !0) || E.findFrom(t, -n, !0);
            if (s)
                t = s.$head;
            else
                return E.near(t, n)
        }
        return e.parent.inlineContent || (i == 0 ? e = t : (e = (E.findFrom(e, -n, !0) || E.findFrom(e, n, !0)).$anchor,
        e.pos < t.pos != i < 0 && (e = t))),
        new T(e,t)
    }
}
E.jsonID("text", T);
class en {
    constructor(e, t) {
        this.anchor = e,
        this.head = t
    }
    map(e) {
        return new en(e.map(this.anchor),e.map(this.head))
    }
    resolve(e) {
        return T.between(e.resolve(this.anchor), e.resolve(this.head))
    }
}
class M extends E {
    constructor(e) {
        let t = e.nodeAfter
          , n = e.node(0).resolve(e.pos + t.nodeSize);
        super(e, n),
        this.node = t
    }
    map(e, t) {
        let {deleted: n, pos: i} = t.mapResult(this.anchor)
          , s = e.resolve(i);
        return n ? E.near(s) : new M(s)
    }
    content() {
        return new x(b.from(this.node),0,0)
    }
    eq(e) {
        return e instanceof M && e.anchor == this.anchor
    }
    toJSON() {
        return {
            type: "node",
            anchor: this.anchor
        }
    }
    getBookmark() {
        return new Xn(this.anchor)
    }
    static fromJSON(e, t) {
        if (typeof t.anchor != "number")
            throw new RangeError("Invalid input for NodeSelection.fromJSON");
        return new M(e.resolve(t.anchor))
    }
    static create(e, t) {
        return new M(e.resolve(t))
    }
    static isSelectable(e) {
        return !e.isText && e.type.spec.selectable !== !1
    }
}
M.prototype.visible = !1;
E.jsonID("node", M);
class Xn {
    constructor(e) {
        this.anchor = e
    }
    map(e) {
        let {deleted: t, pos: n} = e.mapResult(this.anchor);
        return t ? new en(n,n) : new Xn(n)
    }
    resolve(e) {
        let t = e.resolve(this.anchor)
          , n = t.nodeAfter;
        return n && M.isSelectable(n) ? new M(t) : E.near(t)
    }
}
class Q extends E {
    constructor(e) {
        super(e.resolve(0), e.resolve(e.content.size))
    }
    replace(e, t=x.empty) {
        if (t == x.empty) {
            e.delete(0, e.doc.content.size);
            let n = E.atStart(e.doc);
            n.eq(e.selection) || e.setSelection(n)
        } else
            super.replace(e, t)
    }
    toJSON() {
        return {
            type: "all"
        }
    }
    static fromJSON(e) {
        return new Q(e)
    }
    map(e) {
        return new Q(e)
    }
    eq(e) {
        return e instanceof Q
    }
    getBookmark() {
        return hl
    }
}
E.jsonID("all", Q);
const hl = {
    map() {
        return this
    },
    resolve(r) {
        return new Q(r)
    }
};
function Ye(r, e, t, n, i, s=!1) {
    if (e.inlineContent)
        return T.create(r, t);
    for (let o = n - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
        let l = e.child(o);
        if (l.isAtom) {
            if (!s && M.isSelectable(l))
                return M.create(r, t - (i < 0 ? l.nodeSize : 0))
        } else {
            let a = Ye(r, l, t + i, i < 0 ? l.childCount : 0, i, s);
            if (a)
                return a
        }
        t += l.nodeSize * i
    }
    return null
}
function Br(r, e, t) {
    let n = r.steps.length - 1;
    if (n < e)
        return;
    let i = r.steps[n];
    if (!(i instanceof F || i instanceof L))
        return;
    let s = r.mapping.maps[n], o;
    s.forEach( (l, a, c, d) => {
        o == null && (o = d)
    }
    ),
    r.setSelection(E.near(r.doc.resolve(o), t))
}
const zr = 1
  , Et = 2
  , Fr = 4;
class pl extends ss {
    constructor(e) {
        super(e.doc),
        this.curSelectionFor = 0,
        this.updated = 0,
        this.meta = Object.create(null),
        this.time = Date.now(),
        this.curSelection = e.selection,
        this.storedMarks = e.storedMarks
    }
    get selection() {
        return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)),
        this.curSelectionFor = this.steps.length),
        this.curSelection
    }
    setSelection(e) {
        if (e.$from.doc != this.doc)
            throw new RangeError("Selection passed to setSelection must point at the current document");
        return this.curSelection = e,
        this.curSelectionFor = this.steps.length,
        this.updated = (this.updated | zr) & ~Et,
        this.storedMarks = null,
        this
    }
    get selectionSet() {
        return (this.updated & zr) > 0
    }
    setStoredMarks(e) {
        return this.storedMarks = e,
        this.updated |= Et,
        this
    }
    ensureMarks(e) {
        return I.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e),
        this
    }
    addStoredMark(e) {
        return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()))
    }
    removeStoredMark(e) {
        return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()))
    }
    get storedMarksSet() {
        return (this.updated & Et) > 0
    }
    addStep(e, t) {
        super.addStep(e, t),
        this.updated = this.updated & ~Et,
        this.storedMarks = null
    }
    setTime(e) {
        return this.time = e,
        this
    }
    replaceSelection(e) {
        return this.selection.replace(this, e),
        this
    }
    replaceSelectionWith(e, t=!0) {
        let n = this.selection;
        return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || I.none))),
        n.replaceWith(this, e),
        this
    }
    deleteSelection() {
        return this.selection.replace(this),
        this
    }
    insertText(e, t, n) {
        let i = this.doc.type.schema;
        if (t == null)
            return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
        {
            if (n == null && (n = t),
            n = n == null ? t : n,
            !e)
                return this.deleteRange(t, n);
            let s = this.storedMarks;
            if (!s) {
                let o = this.doc.resolve(t);
                s = n == t ? o.marks() : o.marksAcross(this.doc.resolve(n))
            }
            return this.replaceRangeWith(t, n, i.text(e, s)),
            this.selection.empty || this.setSelection(E.near(this.selection.$to)),
            this
        }
    }
    setMeta(e, t) {
        return this.meta[typeof e == "string" ? e : e.key] = t,
        this
    }
    getMeta(e) {
        return this.meta[typeof e == "string" ? e : e.key]
    }
    get isGeneric() {
        for (let e in this.meta)
            return !1;
        return !0
    }
    scrollIntoView() {
        return this.updated |= Fr,
        this
    }
    get scrolledIntoView() {
        return (this.updated & Fr) > 0
    }
}
function Lr(r, e) {
    return !e || !r ? r : r.bind(e)
}
class dt {
    constructor(e, t, n) {
        this.name = e,
        this.init = Lr(t.init, n),
        this.apply = Lr(t.apply, n)
    }
}
const ml = [new dt("doc",{
    init(r) {
        return r.doc || r.schema.topNodeType.createAndFill()
    },
    apply(r) {
        return r.doc
    }
}), new dt("selection",{
    init(r, e) {
        return r.selection || E.atStart(e.doc)
    },
    apply(r) {
        return r.selection
    }
}), new dt("storedMarks",{
    init(r) {
        return r.storedMarks || null
    },
    apply(r, e, t, n) {
        return n.selection.$cursor ? r.storedMarks : null
    }
}), new dt("scrollToSelection",{
    init() {
        return 0
    },
    apply(r, e) {
        return r.scrolledIntoView ? e + 1 : e
    }
})];
class yn {
    constructor(e, t) {
        this.schema = e,
        this.plugins = [],
        this.pluginsByKey = Object.create(null),
        this.fields = ml.slice(),
        t && t.forEach(n => {
            if (this.pluginsByKey[n.key])
                throw new RangeError("Adding different instances of a keyed plugin (" + n.key + ")");
            this.plugins.push(n),
            this.pluginsByKey[n.key] = n,
            n.spec.state && this.fields.push(new dt(n.key,n.spec.state,n))
        }
        )
    }
}
class Ze {
    constructor(e) {
        this.config = e
    }
    get schema() {
        return this.config.schema
    }
    get plugins() {
        return this.config.plugins
    }
    apply(e) {
        return this.applyTransaction(e).state
    }
    filterTransaction(e, t=-1) {
        for (let n = 0; n < this.config.plugins.length; n++)
            if (n != t) {
                let i = this.config.plugins[n];
                if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
                    return !1
            }
        return !0
    }
    applyTransaction(e) {
        if (!this.filterTransaction(e))
            return {
                state: this,
                transactions: []
            };
        let t = [e]
          , n = this.applyInner(e)
          , i = null;
        for (; ; ) {
            let s = !1;
            for (let o = 0; o < this.config.plugins.length; o++) {
                let l = this.config.plugins[o];
                if (l.spec.appendTransaction) {
                    let a = i ? i[o].n : 0
                      , c = i ? i[o].state : this
                      , d = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, n);
                    if (d && n.filterTransaction(d, o)) {
                        if (d.setMeta("appendedTransaction", e),
                        !i) {
                            i = [];
                            for (let f = 0; f < this.config.plugins.length; f++)
                                i.push(f < o ? {
                                    state: n,
                                    n: t.length
                                } : {
                                    state: this,
                                    n: 0
                                })
                        }
                        t.push(d),
                        n = n.applyInner(d),
                        s = !0
                    }
                    i && (i[o] = {
                        state: n,
                        n: t.length
                    })
                }
            }
            if (!s)
                return {
                    state: n,
                    transactions: t
                }
        }
    }
    applyInner(e) {
        if (!e.before.eq(this.doc))
            throw new RangeError("Applying a mismatched transaction");
        let t = new Ze(this.config)
          , n = this.config.fields;
        for (let i = 0; i < n.length; i++) {
            let s = n[i];
            t[s.name] = s.apply(e, this[s.name], this, t)
        }
        return t
    }
    get tr() {
        return new pl(this)
    }
    static create(e) {
        let t = new yn(e.doc ? e.doc.type.schema : e.schema,e.plugins)
          , n = new Ze(t);
        for (let i = 0; i < t.fields.length; i++)
            n[t.fields[i].name] = t.fields[i].init(e, n);
        return n
    }
    reconfigure(e) {
        let t = new yn(this.schema,e.plugins)
          , n = t.fields
          , i = new Ze(t);
        for (let s = 0; s < n.length; s++) {
            let o = n[s].name;
            i[o] = this.hasOwnProperty(o) ? this[o] : n[s].init(e, i)
        }
        return i
    }
    toJSON(e) {
        let t = {
            doc: this.doc.toJSON(),
            selection: this.selection.toJSON()
        };
        if (this.storedMarks && (t.storedMarks = this.storedMarks.map(n => n.toJSON())),
        e && typeof e == "object")
            for (let n in e) {
                if (n == "doc" || n == "selection")
                    throw new RangeError("The JSON fields `doc` and `selection` are reserved");
                let i = e[n]
                  , s = i.spec.state;
                s && s.toJSON && (t[n] = s.toJSON.call(i, this[i.key]))
            }
        return t
    }
    static fromJSON(e, t, n) {
        if (!t)
            throw new RangeError("Invalid input for EditorState.fromJSON");
        if (!e.schema)
            throw new RangeError("Required config field 'schema' missing");
        let i = new yn(e.schema,e.plugins)
          , s = new Ze(i);
        return i.fields.forEach(o => {
            if (o.name == "doc")
                s.doc = Ce.fromJSON(e.schema, t.doc);
            else if (o.name == "selection")
                s.selection = E.fromJSON(s.doc, t.selection);
            else if (o.name == "storedMarks")
                t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
            else {
                if (n)
                    for (let l in n) {
                        let a = n[l]
                          , c = a.spec.state;
                        if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
                            s[o.name] = c.fromJSON.call(a, e, t[l], s);
                            return
                        }
                    }
                s[o.name] = o.init(e, s)
            }
        }
        ),
        s
    }
}
function ls(r, e, t) {
    for (let n in r) {
        let i = r[n];
        i instanceof Function ? i = i.bind(e) : n == "handleDOMEvents" && (i = ls(i, e, {})),
        t[n] = i
    }
    return t
}
class ce {
    constructor(e) {
        this.spec = e,
        this.props = {},
        e.props && ls(e.props, this, this.props),
        this.key = e.key ? e.key.key : as("plugin")
    }
    getState(e) {
        return e[this.key]
    }
}
const bn = Object.create(null);
function as(r) {
    return r in bn ? r + "$" + ++bn[r] : (bn[r] = 0,
    r + "$")
}
class Ue {
    constructor(e="key") {
        this.key = as(e)
    }
    get(e) {
        return e.config.pluginsByKey[this.key]
    }
    getState(e) {
        return e[this.key]
    }
}
const W = function(r) {
    for (var e = 0; ; e++)
        if (r = r.previousSibling,
        !r)
            return e
}
  , rt = function(r) {
    let e = r.assignedSlot || r.parentNode;
    return e && e.nodeType == 11 ? e.host : e
};
let Bn = null;
const fe = function(r, e, t) {
    let n = Bn || (Bn = document.createRange());
    return n.setEnd(r, t == null ? r.nodeValue.length : t),
    n.setStart(r, e || 0),
    n
}
  , gl = function() {
    Bn = null
}
  , je = function(r, e, t, n) {
    return t && (Vr(r, e, t, n, -1) || Vr(r, e, t, n, 1))
}
  , yl = /^(img|br|input|textarea|hr)$/i;
function Vr(r, e, t, n, i) {
    for (var s; ; ) {
        if (r == t && e == n)
            return !0;
        if (e == (i < 0 ? 0 : te(r))) {
            let o = r.parentNode;
            if (!o || o.nodeType != 1 || Ct(r) || yl.test(r.nodeName) || r.contentEditable == "false")
                return !1;
            e = W(r) + (i < 0 ? 0 : 1),
            r = o
        } else if (r.nodeType == 1) {
            let o = r.childNodes[e + (i < 0 ? -1 : 0)];
            if (o.nodeType == 1 && o.contentEditable == "false")
                if (!((s = o.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
                    e += i;
                else
                    return !1;
            else
                r = o,
                e = i < 0 ? te(r) : 0
        } else
            return !1
    }
}
function te(r) {
    return r.nodeType == 3 ? r.nodeValue.length : r.childNodes.length
}
function bl(r, e) {
    for (; ; ) {
        if (r.nodeType == 3 && e)
            return r;
        if (r.nodeType == 1 && e > 0) {
            if (r.contentEditable == "false")
                return null;
            r = r.childNodes[e - 1],
            e = te(r)
        } else if (r.parentNode && !Ct(r))
            e = W(r),
            r = r.parentNode;
        else
            return null
    }
}
function kl(r, e) {
    for (; ; ) {
        if (r.nodeType == 3 && e < r.nodeValue.length)
            return r;
        if (r.nodeType == 1 && e < r.childNodes.length) {
            if (r.contentEditable == "false")
                return null;
            r = r.childNodes[e],
            e = 0
        } else if (r.parentNode && !Ct(r))
            e = W(r) + 1,
            r = r.parentNode;
        else
            return null
    }
}
function xl(r, e, t) {
    for (let n = e == 0, i = e == te(r); n || i; ) {
        if (r == t)
            return !0;
        let s = W(r);
        if (r = r.parentNode,
        !r)
            return !1;
        n = n && s == 0,
        i = i && s == te(r)
    }
}
function Ct(r) {
    let e;
    for (let t = r; t && !(e = t.pmViewDesc); t = t.parentNode)
        ;
    return e && e.node && e.node.isBlock && (e.dom == r || e.contentDOM == r)
}
const tn = function(r) {
    return r.focusNode && je(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset)
};
function Re(r, e) {
    let t = document.createEvent("Event");
    return t.initEvent("keydown", !0, !0),
    t.keyCode = r,
    t.key = t.code = e,
    t
}
function Sl(r) {
    let e = r.activeElement;
    for (; e && e.shadowRoot; )
        e = e.shadowRoot.activeElement;
    return e
}
function Ml(r, e, t) {
    if (r.caretPositionFromPoint)
        try {
            let n = r.caretPositionFromPoint(e, t);
            if (n)
                return {
                    node: n.offsetNode,
                    offset: Math.min(te(n.offsetNode), n.offset)
                }
        } catch (n) {}
    if (r.caretRangeFromPoint) {
        let n = r.caretRangeFromPoint(e, t);
        if (n)
            return {
                node: n.startContainer,
                offset: Math.min(te(n.startContainer), n.startOffset)
            }
    }
}
const le = typeof navigator != "undefined" ? navigator : null
  , $r = typeof document != "undefined" ? document : null
  , Ae = le && le.userAgent || ""
  , zn = /Edge\/(\d+)/.exec(Ae)
  , cs = /MSIE \d/.exec(Ae)
  , Fn = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Ae)
  , X = !!(cs || Fn || zn)
  , Oe = cs ? document.documentMode : Fn ? +Fn[1] : zn ? +zn[1] : 0
  , ie = !X && /gecko\/(\d+)/i.test(Ae);
ie && +(/Firefox\/(\d+)/.exec(Ae) || [0, 0])[1];
const Ln = !X && /Chrome\/(\d+)/.exec(Ae)
  , J = !!Ln
  , ds = Ln ? +Ln[1] : 0
  , U = !X && !!le && /Apple Computer/.test(le.vendor)
  , it = U && (/Mobile\/\w+/.test(Ae) || !!le && le.maxTouchPoints > 2)
  , ee = it || (le ? /Mac/.test(le.platform) : !1)
  , Cl = le ? /Win/.test(le.platform) : !1
  , ue = /Android \d/.test(Ae)
  , wt = !!$r && "webkitFontSmoothing"in $r.documentElement.style
  , wl = wt ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Ol(r) {
    let e = r.defaultView && r.defaultView.visualViewport;
    return e ? {
        left: 0,
        right: e.width,
        top: 0,
        bottom: e.height
    } : {
        left: 0,
        right: r.documentElement.clientWidth,
        top: 0,
        bottom: r.documentElement.clientHeight
    }
}
function de(r, e) {
    return typeof r == "number" ? r : r[e]
}
function Tl(r) {
    let e = r.getBoundingClientRect()
      , t = e.width / r.offsetWidth || 1
      , n = e.height / r.offsetHeight || 1;
    return {
        left: e.left,
        right: e.left + r.clientWidth * t,
        top: e.top,
        bottom: e.top + r.clientHeight * n
    }
}
function Wr(r, e, t) {
    let n = r.someProp("scrollThreshold") || 0
      , i = r.someProp("scrollMargin") || 5
      , s = r.dom.ownerDocument;
    for (let o = t || r.dom; o; ) {
        if (o.nodeType != 1) {
            o = rt(o);
            continue
        }
        let l = o
          , a = l == s.body
          , c = a ? Ol(s) : Tl(l)
          , d = 0
          , f = 0;
        if (e.top < c.top + de(n, "top") ? f = -(c.top - e.top + de(i, "top")) : e.bottom > c.bottom - de(n, "bottom") && (f = e.bottom - e.top > c.bottom - c.top ? e.top + de(i, "top") - c.top : e.bottom - c.bottom + de(i, "bottom")),
        e.left < c.left + de(n, "left") ? d = -(c.left - e.left + de(i, "left")) : e.right > c.right - de(n, "right") && (d = e.right - c.right + de(i, "right")),
        d || f)
            if (a)
                s.defaultView.scrollBy(d, f);
            else {
                let h = l.scrollLeft
                  , p = l.scrollTop;
                f && (l.scrollTop += f),
                d && (l.scrollLeft += d);
                let m = l.scrollLeft - h
                  , g = l.scrollTop - p;
                e = {
                    left: e.left - m,
                    top: e.top - g,
                    right: e.right - m,
                    bottom: e.bottom - g
                }
            }
        let u = a ? "fixed" : getComputedStyle(o).position;
        if (/^(fixed|sticky)$/.test(u))
            break;
        o = u == "absolute" ? o.offsetParent : rt(o)
    }
}
function Nl(r) {
    let e = r.dom.getBoundingClientRect(), t = Math.max(0, e.top), n, i;
    for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
        let l = r.root.elementFromPoint(s, o);
        if (!l || l == r.dom || !r.dom.contains(l))
            continue;
        let a = l.getBoundingClientRect();
        if (a.top >= t - 20) {
            n = l,
            i = a.top;
            break
        }
    }
    return {
        refDOM: n,
        refTop: i,
        stack: fs(r.dom)
    }
}
function fs(r) {
    let e = []
      , t = r.ownerDocument;
    for (let n = r; n && (e.push({
        dom: n,
        top: n.scrollTop,
        left: n.scrollLeft
    }),
    r != t); n = rt(n))
        ;
    return e
}
function El({refDOM: r, refTop: e, stack: t}) {
    let n = r ? r.getBoundingClientRect().top : 0;
    us(t, n == 0 ? 0 : n - e)
}
function us(r, e) {
    for (let t = 0; t < r.length; t++) {
        let {dom: n, top: i, left: s} = r[t];
        n.scrollTop != i + e && (n.scrollTop = i + e),
        n.scrollLeft != s && (n.scrollLeft = s)
    }
}
let _e = null;
function Dl(r) {
    if (r.setActive)
        return r.setActive();
    if (_e)
        return r.focus(_e);
    let e = fs(r);
    r.focus(_e == null ? {
        get preventScroll() {
            return _e = {
                preventScroll: !0
            },
            !0
        }
    } : void 0),
    _e || (_e = !1,
    us(e, 0))
}
function hs(r, e) {
    let t, n = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
    for (let d = r.firstChild, f = 0; d; d = d.nextSibling,
    f++) {
        let u;
        if (d.nodeType == 1)
            u = d.getClientRects();
        else if (d.nodeType == 3)
            u = fe(d).getClientRects();
        else
            continue;
        for (let h = 0; h < u.length; h++) {
            let p = u[h];
            if (p.top <= o && p.bottom >= l) {
                o = Math.max(p.bottom, o),
                l = Math.min(p.top, l);
                let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
                if (m < n) {
                    t = d,
                    n = m,
                    i = m && t.nodeType == 3 ? {
                        left: p.right < e.left ? p.right : p.left,
                        top: e.top
                    } : e,
                    d.nodeType == 1 && m && (s = f + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
                    continue
                }
            } else
                p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = d,
                c = {
                    left: Math.max(p.left, Math.min(p.right, e.left)),
                    top: p.top
                });
            !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = f + 1)
        }
    }
    return !t && a && (t = a,
    i = c,
    n = 0),
    t && t.nodeType == 3 ? Al(t, i) : !t || n && t.nodeType == 1 ? {
        node: r,
        offset: s
    } : hs(t, i)
}
function Al(r, e) {
    let t = r.nodeValue.length
      , n = document.createRange();
    for (let i = 0; i < t; i++) {
        n.setEnd(r, i + 1),
        n.setStart(r, i);
        let s = ye(n, 1);
        if (s.top != s.bottom && Zn(e, s))
            return {
                node: r,
                offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0)
            }
    }
    return {
        node: r,
        offset: 0
    }
}
function Zn(r, e) {
    return r.left >= e.left - 1 && r.left <= e.right + 1 && r.top >= e.top - 1 && r.top <= e.bottom + 1
}
function Il(r, e) {
    let t = r.parentNode;
    return t && /^li$/i.test(t.nodeName) && e.left < r.getBoundingClientRect().left ? t : r
}
function vl(r, e, t) {
    let {node: n, offset: i} = hs(e, t)
      , s = -1;
    if (n.nodeType == 1 && !n.firstChild) {
        let o = n.getBoundingClientRect();
        s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1
    }
    return r.docView.posFromDOM(n, i, s)
}
function Rl(r, e, t, n) {
    let i = -1;
    for (let s = e, o = !1; s != r.dom; ) {
        let l = r.docView.nearestDesc(s, !0), a;
        if (!l)
            return null;
        if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!o && a.left > n.left || a.top > n.top ? i = l.posBefore : (!o && a.right < n.left || a.bottom < n.top) && (i = l.posAfter),
        o = !0),
        !l.contentDOM && i < 0 && !l.node.isText))
            return (l.node.isBlock ? n.top < (a.top + a.bottom) / 2 : n.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
        s = l.dom.parentNode
    }
    return i > -1 ? i : r.docView.posFromDOM(e, t, -1)
}
function ps(r, e, t) {
    let n = r.childNodes.length;
    if (n && t.top < t.bottom)
        for (let i = Math.max(0, Math.min(n - 1, Math.floor(n * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = i; ; ) {
            let o = r.childNodes[s];
            if (o.nodeType == 1) {
                let l = o.getClientRects();
                for (let a = 0; a < l.length; a++) {
                    let c = l[a];
                    if (Zn(e, c))
                        return ps(o, e, c)
                }
            }
            if ((s = (s + 1) % n) == i)
                break
        }
    return r
}
function Pl(r, e) {
    let t = r.dom.ownerDocument, n, i = 0, s = Ml(t, e.left, e.top);
    s && ({node: n, offset: i} = s);
    let o = (r.root.elementFromPoint ? r.root : t).elementFromPoint(e.left, e.top), l;
    if (!o || !r.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
        let c = r.dom.getBoundingClientRect();
        if (!Zn(e, c) || (o = ps(r.dom, e, c),
        !o))
            return null
    }
    if (U)
        for (let c = o; n && c; c = rt(c))
            c.draggable && (n = void 0);
    if (o = Il(o, e),
    n) {
        if (ie && n.nodeType == 1 && (i = Math.min(i, n.childNodes.length),
        i < n.childNodes.length)) {
            let d = n.childNodes[i], f;
            d.nodeName == "IMG" && (f = d.getBoundingClientRect()).right <= e.left && f.bottom > e.top && i++
        }
        let c;
        wt && i && n.nodeType == 1 && (c = n.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--,
        n == r.dom && i == n.childNodes.length - 1 && n.lastChild.nodeType == 1 && e.top > n.lastChild.getBoundingClientRect().bottom ? l = r.state.doc.content.size : (i == 0 || n.nodeType != 1 || n.childNodes[i - 1].nodeName != "BR") && (l = Rl(r, n, i, e))
    }
    l == null && (l = vl(r, o, e));
    let a = r.docView.nearestDesc(o, !0);
    return {
        pos: l,
        inside: a ? a.posAtStart - a.border : -1
    }
}
function Hr(r) {
    return r.top < r.bottom || r.left < r.right
}
function ye(r, e) {
    let t = r.getClientRects();
    if (t.length) {
        let n = t[e < 0 ? 0 : t.length - 1];
        if (Hr(n))
            return n
    }
    return Array.prototype.find.call(t, Hr) || r.getBoundingClientRect()
}
const Bl = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function ms(r, e, t) {
    let {node: n, offset: i, atom: s} = r.docView.domFromPos(e, t < 0 ? -1 : 1)
      , o = wt || ie;
    if (n.nodeType == 3)
        if (o && (Bl.test(n.nodeValue) || (t < 0 ? !i : i == n.nodeValue.length))) {
            let a = ye(fe(n, i, i), t);
            if (ie && i && /\s/.test(n.nodeValue[i - 1]) && i < n.nodeValue.length) {
                let c = ye(fe(n, i - 1, i - 1), -1);
                if (c.top == a.top) {
                    let d = ye(fe(n, i, i + 1), -1);
                    if (d.top != a.top)
                        return lt(d, d.left < c.left)
                }
            }
            return a
        } else {
            let a = i
              , c = i
              , d = t < 0 ? 1 : -1;
            return t < 0 && !i ? (c++,
            d = -1) : t >= 0 && i == n.nodeValue.length ? (a--,
            d = 1) : t < 0 ? a-- : c++,
            lt(ye(fe(n, a, c), d), d < 0)
        }
    if (!r.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
        if (s == null && i && (t < 0 || i == te(n))) {
            let a = n.childNodes[i - 1];
            if (a.nodeType == 1)
                return kn(a.getBoundingClientRect(), !1)
        }
        if (s == null && i < te(n)) {
            let a = n.childNodes[i];
            if (a.nodeType == 1)
                return kn(a.getBoundingClientRect(), !0)
        }
        return kn(n.getBoundingClientRect(), t >= 0)
    }
    if (s == null && i && (t < 0 || i == te(n))) {
        let a = n.childNodes[i - 1]
          , c = a.nodeType == 3 ? fe(a, te(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
        if (c)
            return lt(ye(c, 1), !1)
    }
    if (s == null && i < te(n)) {
        let a = n.childNodes[i];
        for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
            a = a.nextSibling;
        let c = a ? a.nodeType == 3 ? fe(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
        if (c)
            return lt(ye(c, -1), !0)
    }
    return lt(ye(n.nodeType == 3 ? fe(n) : n, -t), t >= 0)
}
function lt(r, e) {
    if (r.width == 0)
        return r;
    let t = e ? r.left : r.right;
    return {
        top: r.top,
        bottom: r.bottom,
        left: t,
        right: t
    }
}
function kn(r, e) {
    if (r.height == 0)
        return r;
    let t = e ? r.top : r.bottom;
    return {
        top: t,
        bottom: t,
        left: r.left,
        right: r.right
    }
}
function gs(r, e, t) {
    let n = r.state
      , i = r.root.activeElement;
    n != e && r.updateState(e),
    i != r.dom && r.focus();
    try {
        return t()
    } finally {
        n != e && r.updateState(n),
        i != r.dom && i && i.focus()
    }
}
function zl(r, e, t) {
    let n = e.selection
      , i = t == "up" ? n.$from : n.$to;
    return gs(r, e, () => {
        let {node: s} = r.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
        for (; ; ) {
            let l = r.docView.nearestDesc(s, !0);
            if (!l)
                break;
            if (l.node.isBlock) {
                s = l.contentDOM || l.dom;
                break
            }
            s = l.dom.parentNode
        }
        let o = ms(r, i.pos, 1);
        for (let l = s.firstChild; l; l = l.nextSibling) {
            let a;
            if (l.nodeType == 1)
                a = l.getClientRects();
            else if (l.nodeType == 3)
                a = fe(l, 0, l.nodeValue.length).getClientRects();
            else
                continue;
            for (let c = 0; c < a.length; c++) {
                let d = a[c];
                if (d.bottom > d.top + 1 && (t == "up" ? o.top - d.top > (d.bottom - o.top) * 2 : d.bottom - o.bottom > (o.bottom - d.top) * 2))
                    return !1
            }
        }
        return !0
    }
    )
}
const Fl = /[\u0590-\u08ac]/;
function Ll(r, e, t) {
    let {$head: n} = e.selection;
    if (!n.parent.isTextblock)
        return !1;
    let i = n.parentOffset
      , s = !i
      , o = i == n.parent.content.size
      , l = r.domSelection();
    return l ? !Fl.test(n.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? s : o : gs(r, e, () => {
        let {focusNode: a, focusOffset: c, anchorNode: d, anchorOffset: f} = r.domSelectionRange()
          , u = l.caretBidiLevel;
        l.modify("move", t, "character");
        let h = n.depth ? r.docView.domAfterPos(n.before()) : r.dom
          , {focusNode: p, focusOffset: m} = r.domSelectionRange()
          , g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
        try {
            l.collapse(d, f),
            a && (a != d || c != f) && l.extend && l.extend(a, c)
        } catch (y) {}
        return u != null && (l.caretBidiLevel = u),
        g
    }
    ) : n.pos == n.start() || n.pos == n.end()
}
let jr = null
  , Jr = null
  , qr = !1;
function Vl(r, e, t) {
    return jr == e && Jr == t ? qr : (jr = e,
    Jr = t,
    qr = t == "up" || t == "down" ? zl(r, e, t) : Ll(r, e, t))
}
const ne = 0
  , Kr = 1
  , Be = 2
  , ae = 3;
class Ot {
    constructor(e, t, n, i) {
        this.parent = e,
        this.children = t,
        this.dom = n,
        this.contentDOM = i,
        this.dirty = ne,
        n.pmViewDesc = this
    }
    matchesWidget(e) {
        return !1
    }
    matchesMark(e) {
        return !1
    }
    matchesNode(e, t, n) {
        return !1
    }
    matchesHack(e) {
        return !1
    }
    parseRule() {
        return null
    }
    stopEvent(e) {
        return !1
    }
    get size() {
        let e = 0;
        for (let t = 0; t < this.children.length; t++)
            e += this.children[t].size;
        return e
    }
    get border() {
        return 0
    }
    destroy() {
        this.parent = void 0,
        this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
        for (let e = 0; e < this.children.length; e++)
            this.children[e].destroy()
    }
    posBeforeChild(e) {
        for (let t = 0, n = this.posAtStart; ; t++) {
            let i = this.children[t];
            if (i == e)
                return n;
            n += i.size
        }
    }
    get posBefore() {
        return this.parent.posBeforeChild(this)
    }
    get posAtStart() {
        return this.parent ? this.parent.posBeforeChild(this) + this.border : 0
    }
    get posAfter() {
        return this.posBefore + this.size
    }
    get posAtEnd() {
        return this.posAtStart + this.size - 2 * this.border
    }
    localPosFromDOM(e, t, n) {
        if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
            if (n < 0) {
                let s, o;
                if (e == this.contentDOM)
                    s = e.childNodes[t - 1];
                else {
                    for (; e.parentNode != this.contentDOM; )
                        e = e.parentNode;
                    s = e.previousSibling
                }
                for (; s && !((o = s.pmViewDesc) && o.parent == this); )
                    s = s.previousSibling;
                return s ? this.posBeforeChild(o) + o.size : this.posAtStart
            } else {
                let s, o;
                if (e == this.contentDOM)
                    s = e.childNodes[t];
                else {
                    for (; e.parentNode != this.contentDOM; )
                        e = e.parentNode;
                    s = e.nextSibling
                }
                for (; s && !((o = s.pmViewDesc) && o.parent == this); )
                    s = s.nextSibling;
                return s ? this.posBeforeChild(o) : this.posAtEnd
            }
        let i;
        if (e == this.dom && this.contentDOM)
            i = t > W(this.contentDOM);
        else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
            i = e.compareDocumentPosition(this.contentDOM) & 2;
        else if (this.dom.firstChild) {
            if (t == 0)
                for (let s = e; ; s = s.parentNode) {
                    if (s == this.dom) {
                        i = !1;
                        break
                    }
                    if (s.previousSibling)
                        break
                }
            if (i == null && t == e.childNodes.length)
                for (let s = e; ; s = s.parentNode) {
                    if (s == this.dom) {
                        i = !0;
                        break
                    }
                    if (s.nextSibling)
                        break
                }
        }
        return (i == null ? n > 0 : i) ? this.posAtEnd : this.posAtStart
    }
    nearestDesc(e, t=!1) {
        for (let n = !0, i = e; i; i = i.parentNode) {
            let s = this.getDesc(i), o;
            if (s && (!t || s.node))
                if (n && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
                    n = !1;
                else
                    return s
        }
    }
    getDesc(e) {
        let t = e.pmViewDesc;
        for (let n = t; n; n = n.parent)
            if (n == this)
                return t
    }
    posFromDOM(e, t, n) {
        for (let i = e; i; i = i.parentNode) {
            let s = this.getDesc(i);
            if (s)
                return s.localPosFromDOM(e, t, n)
        }
        return -1
    }
    descAt(e) {
        for (let t = 0, n = 0; t < this.children.length; t++) {
            let i = this.children[t]
              , s = n + i.size;
            if (n == e && s != n) {
                for (; !i.border && i.children.length; )
                    for (let o = 0; o < i.children.length; o++) {
                        let l = i.children[o];
                        if (l.size) {
                            i = l;
                            break
                        }
                    }
                return i
            }
            if (e < s)
                return i.descAt(e - n - i.border);
            n = s
        }
    }
    domFromPos(e, t) {
        if (!this.contentDOM)
            return {
                node: this.dom,
                offset: 0,
                atom: e + 1
            };
        let n = 0
          , i = 0;
        for (let s = 0; n < this.children.length; n++) {
            let o = this.children[n]
              , l = s + o.size;
            if (l > e || o instanceof bs) {
                i = e - s;
                break
            }
            s = l
        }
        if (i)
            return this.children[n].domFromPos(i - this.children[n].border, t);
        for (let s; n && !(s = this.children[n - 1]).size && s instanceof ys && s.side >= 0; n--)
            ;
        if (t <= 0) {
            let s, o = !0;
            for (; s = n ? this.children[n - 1] : null,
            !(!s || s.dom.parentNode == this.contentDOM); n--,
            o = !1)
                ;
            return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : {
                node: this.contentDOM,
                offset: s ? W(s.dom) + 1 : 0
            }
        } else {
            let s, o = !0;
            for (; s = n < this.children.length ? this.children[n] : null,
            !(!s || s.dom.parentNode == this.contentDOM); n++,
            o = !1)
                ;
            return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : {
                node: this.contentDOM,
                offset: s ? W(s.dom) : this.contentDOM.childNodes.length
            }
        }
    }
    parseRange(e, t, n=0) {
        if (this.children.length == 0)
            return {
                node: this.contentDOM,
                from: e,
                to: t,
                fromOffset: 0,
                toOffset: this.contentDOM.childNodes.length
            };
        let i = -1
          , s = -1;
        for (let o = n, l = 0; ; l++) {
            let a = this.children[l]
              , c = o + a.size;
            if (i == -1 && e <= c) {
                let d = o + a.border;
                if (e >= d && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
                    return a.parseRange(e, t, d);
                e = o;
                for (let f = l; f > 0; f--) {
                    let u = this.children[f - 1];
                    if (u.size && u.dom.parentNode == this.contentDOM && !u.emptyChildAt(1)) {
                        i = W(u.dom) + 1;
                        break
                    }
                    e -= u.size
                }
                i == -1 && (i = 0)
            }
            if (i > -1 && (c > t || l == this.children.length - 1)) {
                t = c;
                for (let d = l + 1; d < this.children.length; d++) {
                    let f = this.children[d];
                    if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(-1)) {
                        s = W(f.dom);
                        break
                    }
                    t += f.size
                }
                s == -1 && (s = this.contentDOM.childNodes.length);
                break
            }
            o = c
        }
        return {
            node: this.contentDOM,
            from: e,
            to: t,
            fromOffset: i,
            toOffset: s
        }
    }
    emptyChildAt(e) {
        if (this.border || !this.contentDOM || !this.children.length)
            return !1;
        let t = this.children[e < 0 ? 0 : this.children.length - 1];
        return t.size == 0 || t.emptyChildAt(e)
    }
    domAfterPos(e) {
        let {node: t, offset: n} = this.domFromPos(e, 0);
        if (t.nodeType != 1 || n == t.childNodes.length)
            throw new RangeError("No node after pos " + e);
        return t.childNodes[n]
    }
    setSelection(e, t, n, i=!1) {
        let s = Math.min(e, t)
          , o = Math.max(e, t);
        for (let h = 0, p = 0; h < this.children.length; h++) {
            let m = this.children[h]
              , g = p + m.size;
            if (s > p && o < g)
                return m.setSelection(e - p - m.border, t - p - m.border, n, i);
            p = g
        }
        let l = this.domFromPos(e, e ? -1 : 1)
          , a = t == e ? l : this.domFromPos(t, t ? -1 : 1)
          , c = n.root.getSelection()
          , d = n.domSelectionRange()
          , f = !1;
        if ((ie || U) && e == t) {
            let {node: h, offset: p} = l;
            if (h.nodeType == 3) {
                if (f = !!(p && h.nodeValue[p - 1] == `
`),
                f && p == h.nodeValue.length)
                    for (let m = h, g; m; m = m.parentNode) {
                        if (g = m.nextSibling) {
                            g.nodeName == "BR" && (l = a = {
                                node: g.parentNode,
                                offset: W(g) + 1
                            });
                            break
                        }
                        let y = m.pmViewDesc;
                        if (y && y.node && y.node.isBlock)
                            break
                    }
            } else {
                let m = h.childNodes[p - 1];
                f = m && (m.nodeName == "BR" || m.contentEditable == "false")
            }
        }
        if (ie && d.focusNode && d.focusNode != a.node && d.focusNode.nodeType == 1) {
            let h = d.focusNode.childNodes[d.focusOffset];
            h && h.contentEditable == "false" && (i = !0)
        }
        if (!(i || f && U) && je(l.node, l.offset, d.anchorNode, d.anchorOffset) && je(a.node, a.offset, d.focusNode, d.focusOffset))
            return;
        let u = !1;
        if ((c.extend || e == t) && !f) {
            c.collapse(l.node, l.offset);
            try {
                e != t && c.extend(a.node, a.offset),
                u = !0
            } catch (h) {}
        }
        if (!u) {
            if (e > t) {
                let p = l;
                l = a,
                a = p
            }
            let h = document.createRange();
            h.setEnd(a.node, a.offset),
            h.setStart(l.node, l.offset),
            c.removeAllRanges(),
            c.addRange(h)
        }
    }
    ignoreMutation(e) {
        return !this.contentDOM && e.type != "selection"
    }
    get contentLost() {
        return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM)
    }
    markDirty(e, t) {
        for (let n = 0, i = 0; i < this.children.length; i++) {
            let s = this.children[i]
              , o = n + s.size;
            if (n == o ? e <= o && t >= n : e < o && t > n) {
                let l = n + s.border
                  , a = o - s.border;
                if (e >= l && t <= a) {
                    this.dirty = e == n || t == o ? Be : Kr,
                    e == l && t == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = ae : s.markDirty(e - l, t - l);
                    return
                } else
                    s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? Be : ae
            }
            n = o
        }
        this.dirty = Be
    }
    markParentsDirty() {
        let e = 1;
        for (let t = this.parent; t; t = t.parent,
        e++) {
            let n = e == 1 ? Be : Kr;
            t.dirty < n && (t.dirty = n)
        }
    }
    get domAtom() {
        return !1
    }
    get ignoreForCoords() {
        return !1
    }
    get ignoreForSelection() {
        return !1
    }
    isText(e) {
        return !1
    }
}
class ys extends Ot {
    constructor(e, t, n, i) {
        let s, o = t.type.toDOM;
        if (typeof o == "function" && (o = o(n, () => {
            if (!s)
                return i;
            if (s.parent)
                return s.parent.posBeforeChild(s)
        }
        )),
        !t.type.spec.raw) {
            if (o.nodeType != 1) {
                let l = document.createElement("span");
                l.appendChild(o),
                o = l
            }
            o.contentEditable = "false",
            o.classList.add("ProseMirror-widget")
        }
        super(e, [], o, null),
        this.widget = t,
        this.widget = t,
        s = this
    }
    matchesWidget(e) {
        return this.dirty == ne && e.type.eq(this.widget.type)
    }
    parseRule() {
        return {
            ignore: !0
        }
    }
    stopEvent(e) {
        let t = this.widget.spec.stopEvent;
        return t ? t(e) : !1
    }
    ignoreMutation(e) {
        return e.type != "selection" || this.widget.spec.ignoreSelection
    }
    destroy() {
        this.widget.type.destroy(this.dom),
        super.destroy()
    }
    get domAtom() {
        return !0
    }
    get ignoreForSelection() {
        return !!this.widget.type.spec.relaxedSide
    }
    get side() {
        return this.widget.type.side
    }
}
class $l extends Ot {
    constructor(e, t, n, i) {
        super(e, [], t, null),
        this.textDOM = n,
        this.text = i
    }
    get size() {
        return this.text.length
    }
    localPosFromDOM(e, t) {
        return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t
    }
    domFromPos(e) {
        return {
            node: this.textDOM,
            offset: e
        }
    }
    ignoreMutation(e) {
        return e.type === "characterData" && e.target.nodeValue == e.oldValue
    }
}
class Je extends Ot {
    constructor(e, t, n, i, s) {
        super(e, [], n, i),
        this.mark = t,
        this.spec = s
    }
    static create(e, t, n, i) {
        let s = i.nodeViews[t.type.name]
          , o = s && s(t, i, n);
        return (!o || !o.dom) && (o = Ke.renderSpec(document, t.type.spec.toDOM(t, n), null, t.attrs)),
        new Je(e,t,o.dom,o.contentDOM || o.dom,o)
    }
    parseRule() {
        return this.dirty & ae || this.mark.type.spec.reparseInView ? null : {
            mark: this.mark.type.name,
            attrs: this.mark.attrs,
            contentElement: this.contentDOM
        }
    }
    matchesMark(e) {
        return this.dirty != ae && this.mark.eq(e)
    }
    markDirty(e, t) {
        if (super.markDirty(e, t),
        this.dirty != ne) {
            let n = this.parent;
            for (; !n.node; )
                n = n.parent;
            n.dirty < this.dirty && (n.dirty = this.dirty),
            this.dirty = ne
        }
    }
    slice(e, t, n) {
        let i = Je.create(this.parent, this.mark, !0, n)
          , s = this.children
          , o = this.size;
        t < o && (s = $n(s, t, o, n)),
        e > 0 && (s = $n(s, 0, e, n));
        for (let l = 0; l < s.length; l++)
            s[l].parent = i;
        return i.children = s,
        i
    }
    ignoreMutation(e) {
        return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e)
    }
    destroy() {
        this.spec.destroy && this.spec.destroy(),
        super.destroy()
    }
}
class Te extends Ot {
    constructor(e, t, n, i, s, o, l, a, c) {
        super(e, [], s, o),
        this.node = t,
        this.outerDeco = n,
        this.innerDeco = i,
        this.nodeDOM = l
    }
    static create(e, t, n, i, s, o) {
        let l = s.nodeViews[t.type.name], a, c = l && l(t, s, () => {
            if (!a)
                return o;
            if (a.parent)
                return a.parent.posBeforeChild(a)
        }
        , n, i), d = c && c.dom, f = c && c.contentDOM;
        if (t.isText) {
            if (!d)
                d = document.createTextNode(t.text);
            else if (d.nodeType != 3)
                throw new RangeError("Text must be rendered as a DOM text node")
        } else
            d || ({dom: d, contentDOM: f} = Ke.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
        !f && !t.isText && d.nodeName != "BR" && (d.hasAttribute("contenteditable") || (d.contentEditable = "false"),
        t.type.spec.draggable && (d.draggable = !0));
        let u = d;
        return d = Ss(d, n, t),
        c ? a = new Wl(e,t,n,i,d,f || null,u,c,s,o + 1) : t.isText ? new nn(e,t,n,i,d,u,s) : new Te(e,t,n,i,d,f || null,u,s,o + 1)
    }
    parseRule() {
        if (this.node.type.spec.reparseInView)
            return null;
        let e = {
            node: this.node.type.name,
            attrs: this.node.attrs
        };
        if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"),
        !this.contentDOM)
            e.getContent = () => this.node.content;
        else if (!this.contentLost)
            e.contentElement = this.contentDOM;
        else {
            for (let t = this.children.length - 1; t >= 0; t--) {
                let n = this.children[t];
                if (this.dom.contains(n.dom.parentNode)) {
                    e.contentElement = n.dom.parentNode;
                    break
                }
            }
            e.contentElement || (e.getContent = () => b.empty)
        }
        return e
    }
    matchesNode(e, t, n) {
        return this.dirty == ne && e.eq(this.node) && Ht(t, this.outerDeco) && n.eq(this.innerDeco)
    }
    get size() {
        return this.node.nodeSize
    }
    get border() {
        return this.node.isLeaf ? 0 : 1
    }
    updateChildren(e, t) {
        let n = this.node.inlineContent
          , i = t
          , s = e.composing ? this.localCompositionInfo(e, t) : null
          , o = s && s.pos > -1 ? s : null
          , l = s && s.pos < 0
          , a = new jl(this,o && o.node,e);
        Kl(this.node, this.innerDeco, (c, d, f) => {
            c.spec.marks ? a.syncToMarks(c.spec.marks, n, e) : c.type.side >= 0 && !f && a.syncToMarks(d == this.node.childCount ? I.none : this.node.child(d).marks, n, e),
            a.placeWidget(c, e, i)
        }
        , (c, d, f, u) => {
            a.syncToMarks(c.marks, n, e);
            let h;
            a.findNodeMatch(c, d, f, u) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, d, f, h, e) || a.updateNextNode(c, d, f, e, u, i) || a.addNode(c, d, f, e, i),
            i += c.nodeSize
        }
        ),
        a.syncToMarks([], n, e),
        this.node.isTextblock && a.addTextblockHacks(),
        a.destroyRest(),
        (a.changed || this.dirty == Be) && (o && this.protectLocalComposition(e, o),
        ks(this.contentDOM, this.children, e),
        it && Ul(this.dom))
    }
    localCompositionInfo(e, t) {
        let {from: n, to: i} = e.state.selection;
        if (!(e.state.selection instanceof T) || n < t || i > t + this.node.content.size)
            return null;
        let s = e.input.compositionNode;
        if (!s || !this.dom.contains(s.parentNode))
            return null;
        if (this.node.inlineContent) {
            let o = s.nodeValue
              , l = _l(this.node.content, o, n - t, i - t);
            return l < 0 ? null : {
                node: s,
                pos: l,
                text: o
            }
        } else
            return {
                node: s,
                pos: -1,
                text: ""
            }
    }
    protectLocalComposition(e, {node: t, pos: n, text: i}) {
        if (this.getDesc(t))
            return;
        let s = t;
        for (; s.parentNode != this.contentDOM; s = s.parentNode) {
            for (; s.previousSibling; )
                s.parentNode.removeChild(s.previousSibling);
            for (; s.nextSibling; )
                s.parentNode.removeChild(s.nextSibling);
            s.pmViewDesc && (s.pmViewDesc = void 0)
        }
        let o = new $l(this,s,t,i);
        e.input.compositionNodes.push(o),
        this.children = $n(this.children, n, n + i.length, e, o)
    }
    update(e, t, n, i) {
        return this.dirty == ae || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, i),
        !0)
    }
    updateInner(e, t, n, i) {
        this.updateOuterDeco(t),
        this.node = e,
        this.innerDeco = n,
        this.contentDOM && this.updateChildren(i, this.posAtStart),
        this.dirty = ne
    }
    updateOuterDeco(e) {
        if (Ht(e, this.outerDeco))
            return;
        let t = this.nodeDOM.nodeType != 1
          , n = this.dom;
        this.dom = xs(this.dom, this.nodeDOM, Vn(this.outerDeco, this.node, t), Vn(e, this.node, t)),
        this.dom != n && (n.pmViewDesc = void 0,
        this.dom.pmViewDesc = this),
        this.outerDeco = e
    }
    selectNode() {
        this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"),
        (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0)
    }
    deselectNode() {
        this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"),
        (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable"))
    }
    get domAtom() {
        return this.node.isAtom
    }
}
function Ur(r, e, t, n, i) {
    Ss(n, e, r);
    let s = new Te(void 0,r,e,t,n,n,n,i,0);
    return s.contentDOM && s.updateChildren(i, 0),
    s
}
class nn extends Te {
    constructor(e, t, n, i, s, o, l) {
        super(e, t, n, i, s, null, o, l, 0)
    }
    parseRule() {
        let e = this.nodeDOM.parentNode;
        for (; e && e != this.dom && !e.pmIsDeco; )
            e = e.parentNode;
        return {
            skip: e || !0
        }
    }
    update(e, t, n, i) {
        return this.dirty == ae || this.dirty != ne && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t),
        (this.dirty != ne || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text,
        i.trackWrites == this.nodeDOM && (i.trackWrites = null)),
        this.node = e,
        this.dirty = ne,
        !0)
    }
    inParent() {
        let e = this.parent.contentDOM;
        for (let t = this.nodeDOM; t; t = t.parentNode)
            if (t == e)
                return !0;
        return !1
    }
    domFromPos(e) {
        return {
            node: this.nodeDOM,
            offset: e
        }
    }
    localPosFromDOM(e, t, n) {
        return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, n)
    }
    ignoreMutation(e) {
        return e.type != "characterData" && e.type != "selection"
    }
    slice(e, t, n) {
        let i = this.node.cut(e, t)
          , s = document.createTextNode(i.text);
        return new nn(this.parent,i,this.outerDeco,this.innerDeco,s,s,n)
    }
    markDirty(e, t) {
        super.markDirty(e, t),
        this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = ae)
    }
    get domAtom() {
        return !1
    }
    isText(e) {
        return this.node.text == e
    }
}
class bs extends Ot {
    parseRule() {
        return {
            ignore: !0
        }
    }
    matchesHack(e) {
        return this.dirty == ne && this.dom.nodeName == e
    }
    get domAtom() {
        return !0
    }
    get ignoreForCoords() {
        return this.dom.nodeName == "IMG"
    }
}
class Wl extends Te {
    constructor(e, t, n, i, s, o, l, a, c, d) {
        super(e, t, n, i, s, o, l, c, d),
        this.spec = a
    }
    update(e, t, n, i) {
        if (this.dirty == ae)
            return !1;
        if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
            let s = this.spec.update(e, t, n);
            return s && this.updateInner(e, t, n, i),
            s
        } else
            return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, n, i)
    }
    selectNode() {
        this.spec.selectNode ? this.spec.selectNode() : super.selectNode()
    }
    deselectNode() {
        this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode()
    }
    setSelection(e, t, n, i) {
        this.spec.setSelection ? this.spec.setSelection(e, t, n.root) : super.setSelection(e, t, n, i)
    }
    destroy() {
        this.spec.destroy && this.spec.destroy(),
        super.destroy()
    }
    stopEvent(e) {
        return this.spec.stopEvent ? this.spec.stopEvent(e) : !1
    }
    ignoreMutation(e) {
        return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e)
    }
}
function ks(r, e, t) {
    let n = r.firstChild
      , i = !1;
    for (let s = 0; s < e.length; s++) {
        let o = e[s]
          , l = o.dom;
        if (l.parentNode == r) {
            for (; l != n; )
                n = _r(n),
                i = !0;
            n = n.nextSibling
        } else
            i = !0,
            r.insertBefore(l, n);
        if (o instanceof Je) {
            let a = n ? n.previousSibling : r.lastChild;
            ks(o.contentDOM, o.children, t),
            n = a ? a.nextSibling : r.firstChild
        }
    }
    for (; n; )
        n = _r(n),
        i = !0;
    i && t.trackWrites == r && (t.trackWrites = null)
}
const ht = function(r) {
    r && (this.nodeName = r)
};
ht.prototype = Object.create(null);
const ze = [new ht];
function Vn(r, e, t) {
    if (r.length == 0)
        return ze;
    let n = t ? ze[0] : new ht
      , i = [n];
    for (let s = 0; s < r.length; s++) {
        let o = r[s].type.attrs;
        if (o) {
            o.nodeName && i.push(n = new ht(o.nodeName));
            for (let l in o) {
                let a = o[l];
                a != null && (t && i.length == 1 && i.push(n = new ht(e.isInline ? "span" : "div")),
                l == "class" ? n.class = (n.class ? n.class + " " : "") + a : l == "style" ? n.style = (n.style ? n.style + ";" : "") + a : l != "nodeName" && (n[l] = a))
            }
        }
    }
    return i
}
function xs(r, e, t, n) {
    if (t == ze && n == ze)
        return e;
    let i = e;
    for (let s = 0; s < n.length; s++) {
        let o = n[s]
          , l = t[s];
        if (s) {
            let a;
            l && l.nodeName == o.nodeName && i != r && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName),
            a.pmIsDeco = !0,
            a.appendChild(i),
            l = ze[0]),
            i = a
        }
        Hl(i, l || ze[0], o)
    }
    return i
}
function Hl(r, e, t) {
    for (let n in e)
        n != "class" && n != "style" && n != "nodeName" && !(n in t) && r.removeAttribute(n);
    for (let n in t)
        n != "class" && n != "style" && n != "nodeName" && t[n] != e[n] && r.setAttribute(n, t[n]);
    if (e.class != t.class) {
        let n = e.class ? e.class.split(" ").filter(Boolean) : []
          , i = t.class ? t.class.split(" ").filter(Boolean) : [];
        for (let s = 0; s < n.length; s++)
            i.indexOf(n[s]) == -1 && r.classList.remove(n[s]);
        for (let s = 0; s < i.length; s++)
            n.indexOf(i[s]) == -1 && r.classList.add(i[s]);
        r.classList.length == 0 && r.removeAttribute("class")
    }
    if (e.style != t.style) {
        if (e.style) {
            let n = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
            for (; i = n.exec(e.style); )
                r.style.removeProperty(i[1])
        }
        t.style && (r.style.cssText += t.style)
    }
}
function Ss(r, e, t) {
    return xs(r, r, ze, Vn(e, t, r.nodeType != 1))
}
function Ht(r, e) {
    if (r.length != e.length)
        return !1;
    for (let t = 0; t < r.length; t++)
        if (!r[t].type.eq(e[t].type))
            return !1;
    return !0
}
function _r(r) {
    let e = r.nextSibling;
    return r.parentNode.removeChild(r),
    e
}
class jl {
    constructor(e, t, n) {
        this.lock = t,
        this.view = n,
        this.index = 0,
        this.stack = [],
        this.changed = !1,
        this.top = e,
        this.preMatch = Jl(e.node.content, e)
    }
    destroyBetween(e, t) {
        if (e != t) {
            for (let n = e; n < t; n++)
                this.top.children[n].destroy();
            this.top.children.splice(e, t - e),
            this.changed = !0
        }
    }
    destroyRest() {
        this.destroyBetween(this.index, this.top.children.length)
    }
    syncToMarks(e, t, n) {
        let i = 0
          , s = this.stack.length >> 1
          , o = Math.min(s, e.length);
        for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
            i++;
        for (; i < s; )
            this.destroyRest(),
            this.top.dirty = ne,
            this.index = this.stack.pop(),
            this.top = this.stack.pop(),
            s--;
        for (; s < e.length; ) {
            this.stack.push(this.top, this.index + 1);
            let l = -1;
            for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
                let c = this.top.children[a];
                if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
                    l = a;
                    break
                }
            }
            if (l > -1)
                l > this.index && (this.changed = !0,
                this.destroyBetween(this.index, l)),
                this.top = this.top.children[this.index];
            else {
                let a = Je.create(this.top, e[s], t, n);
                this.top.children.splice(this.index, 0, a),
                this.top = a,
                this.changed = !0
            }
            this.index = 0,
            s++
        }
    }
    findNodeMatch(e, t, n, i) {
        let s = -1, o;
        if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, n))
            s = this.top.children.indexOf(o, this.index);
        else
            for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
                let c = this.top.children[l];
                if (c.matchesNode(e, t, n) && !this.preMatch.matched.has(c)) {
                    s = l;
                    break
                }
            }
        return s < 0 ? !1 : (this.destroyBetween(this.index, s),
        this.index++,
        !0)
    }
    updateNodeAt(e, t, n, i, s) {
        let o = this.top.children[i];
        return o.dirty == ae && o.dom == o.contentDOM && (o.dirty = Be),
        o.update(e, t, n, s) ? (this.destroyBetween(this.index, i),
        this.index++,
        !0) : !1
    }
    findIndexWithChild(e) {
        for (; ; ) {
            let t = e.parentNode;
            if (!t)
                return -1;
            if (t == this.top.contentDOM) {
                let n = e.pmViewDesc;
                if (n) {
                    for (let i = this.index; i < this.top.children.length; i++)
                        if (this.top.children[i] == n)
                            return i
                }
                return -1
            }
            e = t
        }
    }
    updateNextNode(e, t, n, i, s, o) {
        for (let l = this.index; l < this.top.children.length; l++) {
            let a = this.top.children[l];
            if (a instanceof Te) {
                let c = this.preMatch.matched.get(a);
                if (c != null && c != s)
                    return !1;
                let d = a.dom, f, u = this.isLocked(d) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != ae && Ht(t, a.outerDeco));
                if (!u && a.update(e, t, n, i))
                    return this.destroyBetween(this.index, l),
                    a.dom != d && (this.changed = !0),
                    this.index++,
                    !0;
                if (!u && (f = this.recreateWrapper(a, e, t, n, i, o)))
                    return this.destroyBetween(this.index, l),
                    this.top.children[this.index] = f,
                    f.contentDOM && (f.dirty = Be,
                    f.updateChildren(i, o + 1),
                    f.dirty = ne),
                    this.changed = !0,
                    this.index++,
                    !0;
                break
            }
        }
        return !1
    }
    recreateWrapper(e, t, n, i, s, o) {
        if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Ht(n, e.outerDeco) || !i.eq(e.innerDeco))
            return null;
        let l = Te.create(this.top, t, n, i, s, o);
        if (l.contentDOM) {
            l.children = e.children,
            e.children = [];
            for (let a of l.children)
                a.parent = l
        }
        return e.destroy(),
        l
    }
    addNode(e, t, n, i, s) {
        let o = Te.create(this.top, e, t, n, i, s);
        o.contentDOM && o.updateChildren(i, s + 1),
        this.top.children.splice(this.index++, 0, o),
        this.changed = !0
    }
    placeWidget(e, t, n) {
        let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
        if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
            this.index++;
        else {
            let s = new ys(this.top,e,t,n);
            this.top.children.splice(this.index++, 0, s),
            this.changed = !0
        }
    }
    addTextblockHacks() {
        let e = this.top.children[this.index - 1]
          , t = this.top;
        for (; e instanceof Je; )
            t = e,
            e = t.children[t.children.length - 1];
        (!e || !(e instanceof nn) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((U || J) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t),
        this.addHackNode("BR", this.top))
    }
    addHackNode(e, t) {
        if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
            this.index++;
        else {
            let n = document.createElement(e);
            e == "IMG" && (n.className = "ProseMirror-separator",
            n.alt = ""),
            e == "BR" && (n.className = "ProseMirror-trailingBreak");
            let i = new bs(this.top,[],n,null);
            t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i),
            this.changed = !0
        }
    }
    isLocked(e) {
        return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode))
    }
}
function Jl(r, e) {
    let t = e
      , n = t.children.length
      , i = r.childCount
      , s = new Map
      , o = [];
    e: for (; i > 0; ) {
        let l;
        for (; ; )
            if (n) {
                let c = t.children[n - 1];
                if (c instanceof Je)
                    t = c,
                    n = c.children.length;
                else {
                    l = c,
                    n--;
                    break
                }
            } else {
                if (t == e)
                    break e;
                n = t.parent.children.indexOf(t),
                t = t.parent
            }
        let a = l.node;
        if (a) {
            if (a != r.child(i - 1))
                break;
            --i,
            s.set(l, i),
            o.push(l)
        }
    }
    return {
        index: i,
        matched: s,
        matches: o.reverse()
    }
}
function ql(r, e) {
    return r.type.side - e.type.side
}
function Kl(r, e, t, n) {
    let i = e.locals(r)
      , s = 0;
    if (i.length == 0) {
        for (let c = 0; c < r.childCount; c++) {
            let d = r.child(c);
            n(d, i, e.forChild(s, d), c),
            s += d.nodeSize
        }
        return
    }
    let o = 0
      , l = []
      , a = null;
    for (let c = 0; ; ) {
        let d, f;
        for (; o < i.length && i[o].to == s; ) {
            let g = i[o++];
            g.widget && (d ? (f || (f = [d])).push(g) : d = g)
        }
        if (d)
            if (f) {
                f.sort(ql);
                for (let g = 0; g < f.length; g++)
                    t(f[g], c, !!a)
            } else
                t(d, c, !!a);
        let u, h;
        if (a)
            h = -1,
            u = a,
            a = null;
        else if (c < r.childCount)
            h = c,
            u = r.child(c++);
        else
            break;
        for (let g = 0; g < l.length; g++)
            l[g].to <= s && l.splice(g--, 1);
        for (; o < i.length && i[o].from <= s && i[o].to > s; )
            l.push(i[o++]);
        let p = s + u.nodeSize;
        if (u.isText) {
            let g = p;
            o < i.length && i[o].from < g && (g = i[o].from);
            for (let y = 0; y < l.length; y++)
                l[y].to < g && (g = l[y].to);
            g < p && (a = u.cut(g - s),
            u = u.cut(0, g - s),
            p = g,
            h = -1)
        } else
            for (; o < i.length && i[o].to < p; )
                o++;
        let m = u.isInline && !u.isLeaf ? l.filter(g => !g.inline) : l.slice();
        n(u, m, e.forChild(s, u), h),
        s = p
    }
}
function Ul(r) {
    if (r.nodeName == "UL" || r.nodeName == "OL") {
        let e = r.style.cssText;
        r.style.cssText = e + "; list-style: square !important",
        window.getComputedStyle(r).listStyle,
        r.style.cssText = e
    }
}
function _l(r, e, t, n) {
    for (let i = 0, s = 0; i < r.childCount && s <= n; ) {
        let o = r.child(i++)
          , l = s;
        if (s += o.nodeSize,
        !o.isText)
            continue;
        let a = o.text;
        for (; i < r.childCount; ) {
            let c = r.child(i++);
            if (s += c.nodeSize,
            !c.isText)
                break;
            a += c.text
        }
        if (s >= t) {
            if (s >= n && a.slice(n - e.length - l, n - l) == e)
                return n - e.length;
            let c = l < n ? a.lastIndexOf(e, n - l - 1) : -1;
            if (c >= 0 && c + e.length + l >= t)
                return l + c;
            if (t == n && a.length >= n + e.length - l && a.slice(n - l, n - l + e.length) == e)
                return n
        }
    }
    return -1
}
function $n(r, e, t, n, i) {
    let s = [];
    for (let o = 0, l = 0; o < r.length; o++) {
        let a = r[o]
          , c = l
          , d = l += a.size;
        c >= t || d <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, n)),
        i && (s.push(i),
        i = void 0),
        d > t && s.push(a.slice(t - c, a.size, n)))
    }
    return s
}
function Qn(r, e=null) {
    let t = r.domSelectionRange()
      , n = r.state.doc;
    if (!t.focusNode)
        return null;
    let i = r.docView.nearestDesc(t.focusNode)
      , s = i && i.size == 0
      , o = r.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
    if (o < 0)
        return null;
    let l = n.resolve(o), a, c;
    if (tn(t)) {
        for (a = o; i && !i.node; )
            i = i.parent;
        let f = i.node;
        if (i && f.isAtom && M.isSelectable(f) && i.parent && !(f.isInline && xl(t.focusNode, t.focusOffset, i.dom))) {
            let u = i.posBefore;
            c = new M(o == u ? l : n.resolve(u))
        }
    } else {
        if (t instanceof r.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
            let f = o
              , u = o;
            for (let h = 0; h < t.rangeCount; h++) {
                let p = t.getRangeAt(h);
                f = Math.min(f, r.docView.posFromDOM(p.startContainer, p.startOffset, 1)),
                u = Math.max(u, r.docView.posFromDOM(p.endContainer, p.endOffset, -1))
            }
            if (f < 0)
                return null;
            [a,o] = u == r.state.selection.anchor ? [u, f] : [f, u],
            l = n.resolve(o)
        } else
            a = r.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
        if (a < 0)
            return null
    }
    let d = n.resolve(a);
    if (!c) {
        let f = e == "pointer" || r.state.selection.head < l.pos && !s ? 1 : -1;
        c = er(r, d, l, f)
    }
    return c
}
function Ms(r) {
    return r.editable ? r.hasFocus() : ws(r) && document.activeElement && document.activeElement.contains(r.dom)
}
function me(r, e=!1) {
    let t = r.state.selection;
    if (Cs(r, t),
    !!Ms(r)) {
        if (!e && r.input.mouseDown && r.input.mouseDown.allowDefault && J) {
            let n = r.domSelectionRange()
              , i = r.domObserver.currentSelection;
            if (n.anchorNode && i.anchorNode && je(n.anchorNode, n.anchorOffset, i.anchorNode, i.anchorOffset)) {
                r.input.mouseDown.delayedSelectionSync = !0,
                r.domObserver.setCurSelection();
                return
            }
        }
        if (r.domObserver.disconnectSelection(),
        r.cursorWrapper)
            Yl(r);
        else {
            let {anchor: n, head: i} = t, s, o;
            Gr && !(t instanceof T) && (t.$from.parent.inlineContent || (s = Yr(r, t.from)),
            !t.empty && !t.$from.parent.inlineContent && (o = Yr(r, t.to))),
            r.docView.setSelection(n, i, r, e),
            Gr && (s && Xr(s),
            o && Xr(o)),
            t.visible ? r.dom.classList.remove("ProseMirror-hideselection") : (r.dom.classList.add("ProseMirror-hideselection"),
            "onselectionchange"in document && Gl(r))
        }
        r.domObserver.setCurSelection(),
        r.domObserver.connectSelection()
    }
}
const Gr = U || J && ds < 63;
function Yr(r, e) {
    let {node: t, offset: n} = r.docView.domFromPos(e, 0)
      , i = n < t.childNodes.length ? t.childNodes[n] : null
      , s = n ? t.childNodes[n - 1] : null;
    if (U && i && i.contentEditable == "false")
        return xn(i);
    if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
        if (i)
            return xn(i);
        if (s)
            return xn(s)
    }
}
function xn(r) {
    return r.contentEditable = "true",
    U && r.draggable && (r.draggable = !1,
    r.wasDraggable = !0),
    r
}
function Xr(r) {
    r.contentEditable = "false",
    r.wasDraggable && (r.draggable = !0,
    r.wasDraggable = null)
}
function Gl(r) {
    let e = r.dom.ownerDocument;
    e.removeEventListener("selectionchange", r.input.hideSelectionGuard);
    let t = r.domSelectionRange()
      , n = t.anchorNode
      , i = t.anchorOffset;
    e.addEventListener("selectionchange", r.input.hideSelectionGuard = () => {
        (t.anchorNode != n || t.anchorOffset != i) && (e.removeEventListener("selectionchange", r.input.hideSelectionGuard),
        setTimeout( () => {
            (!Ms(r) || r.state.selection.visible) && r.dom.classList.remove("ProseMirror-hideselection")
        }
        , 20))
    }
    )
}
function Yl(r) {
    let e = r.domSelection()
      , t = document.createRange();
    if (!e)
        return;
    let n = r.cursorWrapper.dom
      , i = n.nodeName == "IMG";
    i ? t.setStart(n.parentNode, W(n) + 1) : t.setStart(n, 0),
    t.collapse(!0),
    e.removeAllRanges(),
    e.addRange(t),
    !i && !r.state.selection.visible && X && Oe <= 11 && (n.disabled = !0,
    n.disabled = !1)
}
function Cs(r, e) {
    if (e instanceof M) {
        let t = r.docView.descAt(e.from);
        t != r.lastSelectedViewDesc && (Zr(r),
        t && t.selectNode(),
        r.lastSelectedViewDesc = t)
    } else
        Zr(r)
}
function Zr(r) {
    r.lastSelectedViewDesc && (r.lastSelectedViewDesc.parent && r.lastSelectedViewDesc.deselectNode(),
    r.lastSelectedViewDesc = void 0)
}
function er(r, e, t, n) {
    return r.someProp("createSelectionBetween", i => i(r, e, t)) || T.between(e, t, n)
}
function Qr(r) {
    return r.editable && !r.hasFocus() ? !1 : ws(r)
}
function ws(r) {
    let e = r.domSelectionRange();
    if (!e.anchorNode)
        return !1;
    try {
        return r.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (r.editable || r.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode))
    } catch (t) {
        return !1
    }
}
function Xl(r) {
    let e = r.docView.domFromPos(r.state.selection.anchor, 0)
      , t = r.domSelectionRange();
    return je(e.node, e.offset, t.anchorNode, t.anchorOffset)
}
function Wn(r, e) {
    let {$anchor: t, $head: n} = r.selection
      , i = e > 0 ? t.max(n) : t.min(n)
      , s = i.parent.inlineContent ? i.depth ? r.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
    return s && E.findFrom(s, e)
}
function be(r, e) {
    return r.dispatch(r.state.tr.setSelection(e).scrollIntoView()),
    !0
}
function ei(r, e, t) {
    let n = r.state.selection;
    if (n instanceof T)
        if (t.indexOf("s") > -1) {
            let {$head: i} = n
              , s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
            if (!s || s.isText || !s.isLeaf)
                return !1;
            let o = r.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
            return be(r, new T(n.$anchor,o))
        } else if (n.empty) {
            if (r.endOfTextblock(e > 0 ? "forward" : "backward")) {
                let i = Wn(r.state, e);
                return i && i instanceof M ? be(r, i) : !1
            } else if (!(ee && t.indexOf("m") > -1)) {
                let i = n.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
                if (!s || s.isText)
                    return !1;
                let l = e < 0 ? i.pos - s.nodeSize : i.pos;
                return s.isAtom || (o = r.docView.descAt(l)) && !o.contentDOM ? M.isSelectable(s) ? be(r, new M(e < 0 ? r.state.doc.resolve(i.pos - s.nodeSize) : i)) : wt ? be(r, new T(r.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1
            }
        } else
            return !1;
    else {
        if (n instanceof M && n.node.isInline)
            return be(r, new T(e > 0 ? n.$to : n.$from));
        {
            let i = Wn(r.state, e);
            return i ? be(r, i) : !1
        }
    }
}
function jt(r) {
    return r.nodeType == 3 ? r.nodeValue.length : r.childNodes.length
}
function pt(r, e) {
    let t = r.pmViewDesc;
    return t && t.size == 0 && (e < 0 || r.nextSibling || r.nodeName != "BR")
}
function Ge(r, e) {
    return e < 0 ? Zl(r) : Ql(r)
}
function Zl(r) {
    let e = r.domSelectionRange()
      , t = e.focusNode
      , n = e.focusOffset;
    if (!t)
        return;
    let i, s, o = !1;
    for (ie && t.nodeType == 1 && n < jt(t) && pt(t.childNodes[n], -1) && (o = !0); ; )
        if (n > 0) {
            if (t.nodeType != 1)
                break;
            {
                let l = t.childNodes[n - 1];
                if (pt(l, -1))
                    i = t,
                    s = --n;
                else if (l.nodeType == 3)
                    t = l,
                    n = t.nodeValue.length;
                else
                    break
            }
        } else {
            if (Os(t))
                break;
            {
                let l = t.previousSibling;
                for (; l && pt(l, -1); )
                    i = t.parentNode,
                    s = W(l),
                    l = l.previousSibling;
                if (l)
                    t = l,
                    n = jt(t);
                else {
                    if (t = t.parentNode,
                    t == r.dom)
                        break;
                    n = 0
                }
            }
        }
    o ? Hn(r, t, n) : i && Hn(r, i, s)
}
function Ql(r) {
    let e = r.domSelectionRange()
      , t = e.focusNode
      , n = e.focusOffset;
    if (!t)
        return;
    let i = jt(t), s, o;
    for (; ; )
        if (n < i) {
            if (t.nodeType != 1)
                break;
            let l = t.childNodes[n];
            if (pt(l, 1))
                s = t,
                o = ++n;
            else
                break
        } else {
            if (Os(t))
                break;
            {
                let l = t.nextSibling;
                for (; l && pt(l, 1); )
                    s = l.parentNode,
                    o = W(l) + 1,
                    l = l.nextSibling;
                if (l)
                    t = l,
                    n = 0,
                    i = jt(t);
                else {
                    if (t = t.parentNode,
                    t == r.dom)
                        break;
                    n = i = 0
                }
            }
        }
    s && Hn(r, s, o)
}
function Os(r) {
    let e = r.pmViewDesc;
    return e && e.node && e.node.isBlock
}
function ea(r, e) {
    for (; r && e == r.childNodes.length && !Ct(r); )
        e = W(r) + 1,
        r = r.parentNode;
    for (; r && e < r.childNodes.length; ) {
        let t = r.childNodes[e];
        if (t.nodeType == 3)
            return t;
        if (t.nodeType == 1 && t.contentEditable == "false")
            break;
        r = t,
        e = 0
    }
}
function ta(r, e) {
    for (; r && !e && !Ct(r); )
        e = W(r),
        r = r.parentNode;
    for (; r && e; ) {
        let t = r.childNodes[e - 1];
        if (t.nodeType == 3)
            return t;
        if (t.nodeType == 1 && t.contentEditable == "false")
            break;
        r = t,
        e = r.childNodes.length
    }
}
function Hn(r, e, t) {
    if (e.nodeType != 3) {
        let s, o;
        (o = ea(e, t)) ? (e = o,
        t = 0) : (s = ta(e, t)) && (e = s,
        t = s.nodeValue.length)
    }
    let n = r.domSelection();
    if (!n)
        return;
    if (tn(n)) {
        let s = document.createRange();
        s.setEnd(e, t),
        s.setStart(e, t),
        n.removeAllRanges(),
        n.addRange(s)
    } else
        n.extend && n.extend(e, t);
    r.domObserver.setCurSelection();
    let {state: i} = r;
    setTimeout( () => {
        r.state == i && me(r)
    }
    , 50)
}
function ti(r, e) {
    let t = r.state.doc.resolve(e);
    if (!(J || Cl) && t.parent.inlineContent) {
        let i = r.coordsAtPos(e);
        if (e > t.start()) {
            let s = r.coordsAtPos(e - 1)
              , o = (s.top + s.bottom) / 2;
            if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
                return s.left < i.left ? "ltr" : "rtl"
        }
        if (e < t.end()) {
            let s = r.coordsAtPos(e + 1)
              , o = (s.top + s.bottom) / 2;
            if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
                return s.left > i.left ? "ltr" : "rtl"
        }
    }
    return getComputedStyle(r.dom).direction == "rtl" ? "rtl" : "ltr"
}
function ni(r, e, t) {
    let n = r.state.selection;
    if (n instanceof T && !n.empty || t.indexOf("s") > -1 || ee && t.indexOf("m") > -1)
        return !1;
    let {$from: i, $to: s} = n;
    if (!i.parent.inlineContent || r.endOfTextblock(e < 0 ? "up" : "down")) {
        let o = Wn(r.state, e);
        if (o && o instanceof M)
            return be(r, o)
    }
    if (!i.parent.inlineContent) {
        let o = e < 0 ? i : s
          , l = n instanceof Q ? E.near(o, e) : E.findFrom(o, e);
        return l ? be(r, l) : !1
    }
    return !1
}
function ri(r, e) {
    if (!(r.state.selection instanceof T))
        return !0;
    let {$head: t, $anchor: n, empty: i} = r.state.selection;
    if (!t.sameParent(n))
        return !0;
    if (!i)
        return !1;
    if (r.endOfTextblock(e > 0 ? "forward" : "backward"))
        return !0;
    let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
    if (s && !s.isText) {
        let o = r.state.tr;
        return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize),
        r.dispatch(o),
        !0
    }
    return !1
}
function ii(r, e, t) {
    r.domObserver.stop(),
    e.contentEditable = t,
    r.domObserver.start()
}
function na(r) {
    if (!U || r.state.selection.$head.parentOffset > 0)
        return !1;
    let {focusNode: e, focusOffset: t} = r.domSelectionRange();
    if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
        let n = e.firstChild;
        ii(r, n, "true"),
        setTimeout( () => ii(r, n, "false"), 20)
    }
    return !1
}
function ra(r) {
    let e = "";
    return r.ctrlKey && (e += "c"),
    r.metaKey && (e += "m"),
    r.altKey && (e += "a"),
    r.shiftKey && (e += "s"),
    e
}
function ia(r, e) {
    let t = e.keyCode
      , n = ra(e);
    if (t == 8 || ee && t == 72 && n == "c")
        return ri(r, -1) || Ge(r, -1);
    if (t == 46 && !e.shiftKey || ee && t == 68 && n == "c")
        return ri(r, 1) || Ge(r, 1);
    if (t == 13 || t == 27)
        return !0;
    if (t == 37 || ee && t == 66 && n == "c") {
        let i = t == 37 ? ti(r, r.state.selection.from) == "ltr" ? -1 : 1 : -1;
        return ei(r, i, n) || Ge(r, i)
    } else if (t == 39 || ee && t == 70 && n == "c") {
        let i = t == 39 ? ti(r, r.state.selection.from) == "ltr" ? 1 : -1 : 1;
        return ei(r, i, n) || Ge(r, i)
    } else {
        if (t == 38 || ee && t == 80 && n == "c")
            return ni(r, -1, n) || Ge(r, -1);
        if (t == 40 || ee && t == 78 && n == "c")
            return na(r) || ni(r, 1, n) || Ge(r, 1);
        if (n == (ee ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
            return !0
    }
    return !1
}
function tr(r, e) {
    r.someProp("transformCopied", h => {
        e = h(e, r)
    }
    );
    let t = []
      , {content: n, openStart: i, openEnd: s} = e;
    for (; i > 1 && s > 1 && n.childCount == 1 && n.firstChild.childCount == 1; ) {
        i--,
        s--;
        let h = n.firstChild;
        t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null),
        n = h.content
    }
    let o = r.someProp("clipboardSerializer") || Ke.fromSchema(r.state.schema)
      , l = Is()
      , a = l.createElement("div");
    a.appendChild(o.serializeFragment(n, {
        document: l
    }));
    let c = a.firstChild, d, f = 0;
    for (; c && c.nodeType == 1 && (d = As[c.nodeName.toLowerCase()]); ) {
        for (let h = d.length - 1; h >= 0; h--) {
            let p = l.createElement(d[h]);
            for (; a.firstChild; )
                p.appendChild(a.firstChild);
            a.appendChild(p),
            f++
        }
        c = a.firstChild
    }
    c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${f ? ` -${f}` : ""} ${JSON.stringify(t)}`);
    let u = r.someProp("clipboardTextSerializer", h => h(e, r)) || e.content.textBetween(0, e.content.size, `

`);
    return {
        dom: a,
        text: u,
        slice: e
    }
}
function Ts(r, e, t, n, i) {
    let s = i.parent.type.spec.code, o, l;
    if (!t && !e)
        return null;
    let a = e && (n || s || !t);
    if (a) {
        if (r.someProp("transformPastedText", u => {
            e = u(e, s || n, r)
        }
        ),
        s)
            return e ? new x(b.from(r.state.schema.text(e.replace(/\r\n?/g, `
`))),0,0) : x.empty;
        let f = r.someProp("clipboardTextParser", u => u(e, i, n, r));
        if (f)
            l = f;
        else {
            let u = i.marks()
              , {schema: h} = r.state
              , p = Ke.fromSchema(h);
            o = document.createElement("div"),
            e.split(/(?:\r\n?|\n)+/).forEach(m => {
                let g = o.appendChild(document.createElement("p"));
                m && g.appendChild(p.serializeNode(h.text(m, u)))
            }
            )
        }
    } else
        r.someProp("transformPastedHTML", f => {
            t = f(t, r)
        }
        ),
        o = aa(t),
        wt && ca(o);
    let c = o && o.querySelector("[data-pm-slice]")
      , d = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
    if (d && d[3])
        for (let f = +d[3]; f > 0; f--) {
            let u = o.firstChild;
            for (; u && u.nodeType != 1; )
                u = u.nextSibling;
            if (!u)
                break;
            o = u
        }
    if (l || (l = (r.someProp("clipboardParser") || r.someProp("domParser") || we.fromSchema(r.state.schema)).parseSlice(o, {
        preserveWhitespace: !!(a || d),
        context: i,
        ruleFromNode(u) {
            return u.nodeName == "BR" && !u.nextSibling && u.parentNode && !sa.test(u.parentNode.nodeName) ? {
                ignore: !0
            } : null
        }
    })),
    d)
        l = da(si(l, +d[1], +d[2]), d[4]);
    else if (l = x.maxOpen(oa(l.content, i), !0),
    l.openStart || l.openEnd) {
        let f = 0
          , u = 0;
        for (let h = l.content.firstChild; f < l.openStart && !h.type.spec.isolating; f++,
        h = h.firstChild)
            ;
        for (let h = l.content.lastChild; u < l.openEnd && !h.type.spec.isolating; u++,
        h = h.lastChild)
            ;
        l = si(l, f, u)
    }
    return r.someProp("transformPasted", f => {
        l = f(l, r)
    }
    ),
    l
}
const sa = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function oa(r, e) {
    if (r.childCount < 2)
        return r;
    for (let t = e.depth; t >= 0; t--) {
        let i = e.node(t).contentMatchAt(e.index(t)), s, o = [];
        if (r.forEach(l => {
            if (!o)
                return;
            let a = i.findWrapping(l.type), c;
            if (!a)
                return o = null;
            if (c = o.length && s.length && Es(a, s, l, o[o.length - 1], 0))
                o[o.length - 1] = c;
            else {
                o.length && (o[o.length - 1] = Ds(o[o.length - 1], s.length));
                let d = Ns(l, a);
                o.push(d),
                i = i.matchType(d.type),
                s = a
            }
        }
        ),
        o)
            return b.from(o)
    }
    return r
}
function Ns(r, e, t=0) {
    for (let n = e.length - 1; n >= t; n--)
        r = e[n].create(null, b.from(r));
    return r
}
function Es(r, e, t, n, i) {
    if (i < r.length && i < e.length && r[i] == e[i]) {
        let s = Es(r, e, t, n.lastChild, i + 1);
        if (s)
            return n.copy(n.content.replaceChild(n.childCount - 1, s));
        if (n.contentMatchAt(n.childCount).matchType(i == r.length - 1 ? t.type : r[i + 1]))
            return n.copy(n.content.append(b.from(Ns(t, r, i + 1))))
    }
}
function Ds(r, e) {
    if (e == 0)
        return r;
    let t = r.content.replaceChild(r.childCount - 1, Ds(r.lastChild, e - 1))
      , n = r.contentMatchAt(r.childCount).fillBefore(b.empty, !0);
    return r.copy(t.append(n))
}
function jn(r, e, t, n, i, s) {
    let o = e < 0 ? r.firstChild : r.lastChild
      , l = o.content;
    return r.childCount > 1 && (s = 0),
    i < n - 1 && (l = jn(l, e, t, n, i + 1, s)),
    i >= t && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(b.empty, !0))),
    r.replaceChild(e < 0 ? 0 : r.childCount - 1, o.copy(l))
}
function si(r, e, t) {
    return e < r.openStart && (r = new x(jn(r.content, -1, e, r.openStart, 0, r.openEnd),e,r.openEnd)),
    t < r.openEnd && (r = new x(jn(r.content, 1, t, r.openEnd, 0, 0),r.openStart,t)),
    r
}
const As = {
    thead: ["table"],
    tbody: ["table"],
    tfoot: ["table"],
    caption: ["table"],
    colgroup: ["table"],
    col: ["table", "colgroup"],
    tr: ["table", "tbody"],
    td: ["table", "tbody", "tr"],
    th: ["table", "tbody", "tr"]
};
let oi = null;
function Is() {
    return oi || (oi = document.implementation.createHTMLDocument("title"))
}
let Sn = null;
function la(r) {
    let e = window.trustedTypes;
    return e ? (Sn || (Sn = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", {
        createHTML: t => t
    })),
    Sn.createHTML(r)) : r
}
function aa(r) {
    let e = /^(\s*<meta [^>]*>)*/.exec(r);
    e && (r = r.slice(e[0].length));
    let t = Is().createElement("div"), n = /<([a-z][^>\s]+)/i.exec(r), i;
    if ((i = n && As[n[1].toLowerCase()]) && (r = i.map(s => "<" + s + ">").join("") + r + i.map(s => "</" + s + ">").reverse().join("")),
    t.innerHTML = la(r),
    i)
        for (let s = 0; s < i.length; s++)
            t = t.querySelector(i[s]) || t;
    return t
}
function ca(r) {
    let e = r.querySelectorAll(J ? "span:not([class]):not([style])" : "span.Apple-converted-space");
    for (let t = 0; t < e.length; t++) {
        let n = e[t];
        n.childNodes.length == 1 && n.textContent == " " && n.parentNode && n.parentNode.replaceChild(r.ownerDocument.createTextNode(" "), n)
    }
}
function da(r, e) {
    if (!r.size)
        return r;
    let t = r.content.firstChild.type.schema, n;
    try {
        n = JSON.parse(e)
    } catch (l) {
        return r
    }
    let {content: i, openStart: s, openEnd: o} = r;
    for (let l = n.length - 2; l >= 0; l -= 2) {
        let a = t.nodes[n[l]];
        if (!a || a.hasRequiredAttrs())
            break;
        i = b.from(a.create(n[l + 1], i)),
        s++,
        o++
    }
    return new x(i,s,o)
}
const _ = {}
  , G = {}
  , fa = {
    touchstart: !0,
    touchmove: !0
};
class ua {
    constructor() {
        this.shiftKey = !1,
        this.mouseDown = null,
        this.lastKeyCode = null,
        this.lastKeyCodeTime = 0,
        this.lastClick = {
            time: 0,
            x: 0,
            y: 0,
            type: "",
            button: 0
        },
        this.lastSelectionOrigin = null,
        this.lastSelectionTime = 0,
        this.lastIOSEnter = 0,
        this.lastIOSEnterFallbackTimeout = -1,
        this.lastFocus = 0,
        this.lastTouch = 0,
        this.lastChromeDelete = 0,
        this.composing = !1,
        this.compositionNode = null,
        this.composingTimeout = -1,
        this.compositionNodes = [],
        this.compositionEndedAt = -2e8,
        this.compositionID = 1,
        this.compositionPendingChanges = 0,
        this.domChangeCount = 0,
        this.eventHandlers = Object.create(null),
        this.hideSelectionGuard = null
    }
}
function ha(r) {
    for (let e in _) {
        let t = _[e];
        r.dom.addEventListener(e, r.input.eventHandlers[e] = n => {
            ma(r, n) && !nr(r, n) && (r.editable || !(n.type in G)) && t(r, n)
        }
        , fa[e] ? {
            passive: !0
        } : void 0)
    }
    U && r.dom.addEventListener("input", () => null),
    Jn(r)
}
function Me(r, e) {
    r.input.lastSelectionOrigin = e,
    r.input.lastSelectionTime = Date.now()
}
function pa(r) {
    r.domObserver.stop();
    for (let e in r.input.eventHandlers)
        r.dom.removeEventListener(e, r.input.eventHandlers[e]);
    clearTimeout(r.input.composingTimeout),
    clearTimeout(r.input.lastIOSEnterFallbackTimeout)
}
function Jn(r) {
    r.someProp("handleDOMEvents", e => {
        for (let t in e)
            r.input.eventHandlers[t] || r.dom.addEventListener(t, r.input.eventHandlers[t] = n => nr(r, n))
    }
    )
}
function nr(r, e) {
    return r.someProp("handleDOMEvents", t => {
        let n = t[e.type];
        return n ? n(r, e) || e.defaultPrevented : !1
    }
    )
}
function ma(r, e) {
    if (!e.bubbles)
        return !0;
    if (e.defaultPrevented)
        return !1;
    for (let t = e.target; t != r.dom; t = t.parentNode)
        if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
            return !1;
    return !0
}
function ga(r, e) {
    !nr(r, e) && _[e.type] && (r.editable || !(e.type in G)) && _[e.type](r, e)
}
G.keydown = (r, e) => {
    let t = e;
    if (r.input.shiftKey = t.keyCode == 16 || t.shiftKey,
    !Rs(r, t) && (r.input.lastKeyCode = t.keyCode,
    r.input.lastKeyCodeTime = Date.now(),
    !(ue && J && t.keyCode == 13)))
        if (t.keyCode != 229 && r.domObserver.forceFlush(),
        it && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
            let n = Date.now();
            r.input.lastIOSEnter = n,
            r.input.lastIOSEnterFallbackTimeout = setTimeout( () => {
                r.input.lastIOSEnter == n && (r.someProp("handleKeyDown", i => i(r, Re(13, "Enter"))),
                r.input.lastIOSEnter = 0)
            }
            , 200)
        } else
            r.someProp("handleKeyDown", n => n(r, t)) || ia(r, t) ? t.preventDefault() : Me(r, "key")
}
;
G.keyup = (r, e) => {
    e.keyCode == 16 && (r.input.shiftKey = !1)
}
;
G.keypress = (r, e) => {
    let t = e;
    if (Rs(r, t) || !t.charCode || t.ctrlKey && !t.altKey || ee && t.metaKey)
        return;
    if (r.someProp("handleKeyPress", i => i(r, t))) {
        t.preventDefault();
        return
    }
    let n = r.state.selection;
    if (!(n instanceof T) || !n.$from.sameParent(n.$to)) {
        let i = String.fromCharCode(t.charCode)
          , s = () => r.state.tr.insertText(i).scrollIntoView();
        !/[\r\n]/.test(i) && !r.someProp("handleTextInput", o => o(r, n.$from.pos, n.$to.pos, i, s)) && r.dispatch(s()),
        t.preventDefault()
    }
}
;
function rn(r) {
    return {
        left: r.clientX,
        top: r.clientY
    }
}
function ya(r, e) {
    let t = e.x - r.clientX
      , n = e.y - r.clientY;
    return t * t + n * n < 100
}
function rr(r, e, t, n, i) {
    if (n == -1)
        return !1;
    let s = r.state.doc.resolve(n);
    for (let o = s.depth + 1; o > 0; o--)
        if (r.someProp(e, l => o > s.depth ? l(r, t, s.nodeAfter, s.before(o), i, !0) : l(r, t, s.node(o), s.before(o), i, !1)))
            return !0;
    return !1
}
function tt(r, e, t) {
    if (r.focused || r.focus(),
    r.state.selection.eq(e))
        return;
    let n = r.state.tr.setSelection(e);
    n.setMeta("pointer", !0),
    r.dispatch(n)
}
function ba(r, e) {
    if (e == -1)
        return !1;
    let t = r.state.doc.resolve(e)
      , n = t.nodeAfter;
    return n && n.isAtom && M.isSelectable(n) ? (tt(r, new M(t)),
    !0) : !1
}
function ka(r, e) {
    if (e == -1)
        return !1;
    let t = r.state.selection, n, i;
    t instanceof M && (n = t.node);
    let s = r.state.doc.resolve(e);
    for (let o = s.depth + 1; o > 0; o--) {
        let l = o > s.depth ? s.nodeAfter : s.node(o);
        if (M.isSelectable(l)) {
            n && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? i = s.before(t.$from.depth) : i = s.before(o);
            break
        }
    }
    return i != null ? (tt(r, M.create(r.state.doc, i)),
    !0) : !1
}
function xa(r, e, t, n, i) {
    return rr(r, "handleClickOn", e, t, n) || r.someProp("handleClick", s => s(r, e, n)) || (i ? ka(r, t) : ba(r, t))
}
function Sa(r, e, t, n) {
    return rr(r, "handleDoubleClickOn", e, t, n) || r.someProp("handleDoubleClick", i => i(r, e, n))
}
function Ma(r, e, t, n) {
    return rr(r, "handleTripleClickOn", e, t, n) || r.someProp("handleTripleClick", i => i(r, e, n)) || Ca(r, t, n)
}
function Ca(r, e, t) {
    if (t.button != 0)
        return !1;
    let n = r.state.doc;
    if (e == -1)
        return n.inlineContent ? (tt(r, T.create(n, 0, n.content.size)),
        !0) : !1;
    let i = n.resolve(e);
    for (let s = i.depth + 1; s > 0; s--) {
        let o = s > i.depth ? i.nodeAfter : i.node(s)
          , l = i.before(s);
        if (o.inlineContent)
            tt(r, T.create(n, l + 1, l + 1 + o.content.size));
        else if (M.isSelectable(o))
            tt(r, M.create(n, l));
        else
            continue;
        return !0
    }
}
function ir(r) {
    return Jt(r)
}
const vs = ee ? "metaKey" : "ctrlKey";
_.mousedown = (r, e) => {
    let t = e;
    r.input.shiftKey = t.shiftKey;
    let n = ir(r)
      , i = Date.now()
      , s = "singleClick";
    i - r.input.lastClick.time < 500 && ya(t, r.input.lastClick) && !t[vs] && r.input.lastClick.button == t.button && (r.input.lastClick.type == "singleClick" ? s = "doubleClick" : r.input.lastClick.type == "doubleClick" && (s = "tripleClick")),
    r.input.lastClick = {
        time: i,
        x: t.clientX,
        y: t.clientY,
        type: s,
        button: t.button
    };
    let o = r.posAtCoords(rn(t));
    o && (s == "singleClick" ? (r.input.mouseDown && r.input.mouseDown.done(),
    r.input.mouseDown = new wa(r,o,t,!!n)) : (s == "doubleClick" ? Sa : Ma)(r, o.pos, o.inside, t) ? t.preventDefault() : Me(r, "pointer"))
}
;
class wa {
    constructor(e, t, n, i) {
        this.view = e,
        this.pos = t,
        this.event = n,
        this.flushed = i,
        this.delayedSelectionSync = !1,
        this.mightDrag = null,
        this.startDoc = e.state.doc,
        this.selectNode = !!n[vs],
        this.allowDefault = n.shiftKey;
        let s, o;
        if (t.inside > -1)
            s = e.state.doc.nodeAt(t.inside),
            o = t.inside;
        else {
            let d = e.state.doc.resolve(t.pos);
            s = d.parent,
            o = d.depth ? d.before() : 0
        }
        const l = i ? null : n.target
          , a = l ? e.docView.nearestDesc(l, !0) : null;
        this.target = a && a.dom.nodeType == 1 ? a.dom : null;
        let {selection: c} = e.state;
        (n.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof M && c.from <= o && c.to > o) && (this.mightDrag = {
            node: s,
            pos: o,
            addAttr: !!(this.target && !this.target.draggable),
            setUneditable: !!(this.target && ie && !this.target.hasAttribute("contentEditable"))
        }),
        this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(),
        this.mightDrag.addAttr && (this.target.draggable = !0),
        this.mightDrag.setUneditable && setTimeout( () => {
            this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false")
        }
        , 20),
        this.view.domObserver.start()),
        e.root.addEventListener("mouseup", this.up = this.up.bind(this)),
        e.root.addEventListener("mousemove", this.move = this.move.bind(this)),
        Me(e, "pointer")
    }
    done() {
        this.view.root.removeEventListener("mouseup", this.up),
        this.view.root.removeEventListener("mousemove", this.move),
        this.mightDrag && this.target && (this.view.domObserver.stop(),
        this.mightDrag.addAttr && this.target.removeAttribute("draggable"),
        this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"),
        this.view.domObserver.start()),
        this.delayedSelectionSync && setTimeout( () => me(this.view)),
        this.view.input.mouseDown = null
    }
    up(e) {
        if (this.done(),
        !this.view.dom.contains(e.target))
            return;
        let t = this.pos;
        this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(rn(e))),
        this.updateAllowDefault(e),
        this.allowDefault || !t ? Me(this.view, "pointer") : xa(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || U && this.mightDrag && !this.mightDrag.node.isAtom || J && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (tt(this.view, E.near(this.view.state.doc.resolve(t.pos))),
        e.preventDefault()) : Me(this.view, "pointer")
    }
    move(e) {
        this.updateAllowDefault(e),
        Me(this.view, "pointer"),
        e.buttons == 0 && this.done()
    }
    updateAllowDefault(e) {
        !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0)
    }
}
_.touchstart = r => {
    r.input.lastTouch = Date.now(),
    ir(r),
    Me(r, "pointer")
}
;
_.touchmove = r => {
    r.input.lastTouch = Date.now(),
    Me(r, "pointer")
}
;
_.contextmenu = r => ir(r);
function Rs(r, e) {
    return r.composing ? !0 : U && Math.abs(e.timeStamp - r.input.compositionEndedAt) < 500 ? (r.input.compositionEndedAt = -2e8,
    !0) : !1
}
const Oa = ue ? 5e3 : -1;
G.compositionstart = G.compositionupdate = r => {
    if (!r.composing) {
        r.domObserver.flush();
        let {state: e} = r
          , t = e.selection.$to;
        if (e.selection instanceof T && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some(n => n.type.spec.inclusive === !1)))
            r.markCursor = r.state.storedMarks || t.marks(),
            Jt(r, !0),
            r.markCursor = null;
        else if (Jt(r, !e.selection.empty),
        ie && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
            let n = r.domSelectionRange();
            for (let i = n.focusNode, s = n.focusOffset; i && i.nodeType == 1 && s != 0; ) {
                let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
                if (!o)
                    break;
                if (o.nodeType == 3) {
                    let l = r.domSelection();
                    l && l.collapse(o, o.nodeValue.length);
                    break
                } else
                    i = o,
                    s = -1
            }
        }
        r.input.composing = !0
    }
    Ps(r, Oa)
}
;
G.compositionend = (r, e) => {
    r.composing && (r.input.composing = !1,
    r.input.compositionEndedAt = e.timeStamp,
    r.input.compositionPendingChanges = r.domObserver.pendingRecords().length ? r.input.compositionID : 0,
    r.input.compositionNode = null,
    r.input.compositionPendingChanges && Promise.resolve().then( () => r.domObserver.flush()),
    r.input.compositionID++,
    Ps(r, 20))
}
;
function Ps(r, e) {
    clearTimeout(r.input.composingTimeout),
    e > -1 && (r.input.composingTimeout = setTimeout( () => Jt(r), e))
}
function Bs(r) {
    for (r.composing && (r.input.composing = !1,
    r.input.compositionEndedAt = Na()); r.input.compositionNodes.length > 0; )
        r.input.compositionNodes.pop().markParentsDirty()
}
function Ta(r) {
    let e = r.domSelectionRange();
    if (!e.focusNode)
        return null;
    let t = bl(e.focusNode, e.focusOffset)
      , n = kl(e.focusNode, e.focusOffset);
    if (t && n && t != n) {
        let i = n.pmViewDesc
          , s = r.domObserver.lastChangedTextNode;
        if (t == s || n == s)
            return s;
        if (!i || !i.isText(n.nodeValue))
            return n;
        if (r.input.compositionNode == n) {
            let o = t.pmViewDesc;
            if (!(!o || !o.isText(t.nodeValue)))
                return n
        }
    }
    return t || n
}
function Na() {
    let r = document.createEvent("Event");
    return r.initEvent("event", !0, !0),
    r.timeStamp
}
function Jt(r, e=!1) {
    if (!(ue && r.domObserver.flushingSoon >= 0)) {
        if (r.domObserver.forceFlush(),
        Bs(r),
        e || r.docView && r.docView.dirty) {
            let t = Qn(r)
              , n = r.state.selection;
            return t && !t.eq(n) ? r.dispatch(r.state.tr.setSelection(t)) : (r.markCursor || e) && !n.$from.node(n.$from.sharedDepth(n.to)).inlineContent ? r.dispatch(r.state.tr.deleteSelection()) : r.updateState(r.state),
            !0
        }
        return !1
    }
}
function Ea(r, e) {
    if (!r.dom.parentNode)
        return;
    let t = r.dom.parentNode.appendChild(document.createElement("div"));
    t.appendChild(e),
    t.style.cssText = "position: fixed; left: -10000px; top: 10px";
    let n = getSelection()
      , i = document.createRange();
    i.selectNodeContents(e),
    r.dom.blur(),
    n.removeAllRanges(),
    n.addRange(i),
    setTimeout( () => {
        t.parentNode && t.parentNode.removeChild(t),
        r.focus()
    }
    , 50)
}
const bt = X && Oe < 15 || it && wl < 604;
_.copy = G.cut = (r, e) => {
    let t = e
      , n = r.state.selection
      , i = t.type == "cut";
    if (n.empty)
        return;
    let s = bt ? null : t.clipboardData
      , o = n.content()
      , {dom: l, text: a} = tr(r, o);
    s ? (t.preventDefault(),
    s.clearData(),
    s.setData("text/html", l.innerHTML),
    s.setData("text/plain", a)) : Ea(r, l),
    i && r.dispatch(r.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"))
}
;
function Da(r) {
    return r.openStart == 0 && r.openEnd == 0 && r.content.childCount == 1 ? r.content.firstChild : null
}
function Aa(r, e) {
    if (!r.dom.parentNode)
        return;
    let t = r.input.shiftKey || r.state.selection.$from.parent.type.spec.code
      , n = r.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
    t || (n.contentEditable = "true"),
    n.style.cssText = "position: fixed; left: -10000px; top: 10px",
    n.focus();
    let i = r.input.shiftKey && r.input.lastKeyCode != 45;
    setTimeout( () => {
        r.focus(),
        n.parentNode && n.parentNode.removeChild(n),
        t ? kt(r, n.value, null, i, e) : kt(r, n.textContent, n.innerHTML, i, e)
    }
    , 50)
}
function kt(r, e, t, n, i) {
    let s = Ts(r, e, t, n, r.state.selection.$from);
    if (r.someProp("handlePaste", a => a(r, i, s || x.empty)))
        return !0;
    if (!s)
        return !1;
    let o = Da(s)
      , l = o ? r.state.tr.replaceSelectionWith(o, n) : r.state.tr.replaceSelection(s);
    return r.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")),
    !0
}
function zs(r) {
    let e = r.getData("text/plain") || r.getData("Text");
    if (e)
        return e;
    let t = r.getData("text/uri-list");
    return t ? t.replace(/\r?\n/g, " ") : ""
}
G.paste = (r, e) => {
    let t = e;
    if (r.composing && !ue)
        return;
    let n = bt ? null : t.clipboardData
      , i = r.input.shiftKey && r.input.lastKeyCode != 45;
    n && kt(r, zs(n), n.getData("text/html"), i, t) ? t.preventDefault() : Aa(r, t)
}
;
class Fs {
    constructor(e, t, n) {
        this.slice = e,
        this.move = t,
        this.node = n
    }
}
const Ia = ee ? "altKey" : "ctrlKey";
function Ls(r, e) {
    let t = r.someProp("dragCopies", n => !n(e));
    return t != null ? t : !e[Ia]
}
_.dragstart = (r, e) => {
    let t = e
      , n = r.input.mouseDown;
    if (n && n.done(),
    !t.dataTransfer)
        return;
    let i = r.state.selection, s = i.empty ? null : r.posAtCoords(rn(t)), o;
    if (!(s && s.pos >= i.from && s.pos <= (i instanceof M ? i.to - 1 : i.to))) {
        if (n && n.mightDrag)
            o = M.create(r.state.doc, n.mightDrag.pos);
        else if (t.target && t.target.nodeType == 1) {
            let f = r.docView.nearestDesc(t.target, !0);
            f && f.node.type.spec.draggable && f != r.docView && (o = M.create(r.state.doc, f.posBefore))
        }
    }
    let l = (o || r.state.selection).content()
      , {dom: a, text: c, slice: d} = tr(r, l);
    (!t.dataTransfer.files.length || !J || ds > 120) && t.dataTransfer.clearData(),
    t.dataTransfer.setData(bt ? "Text" : "text/html", a.innerHTML),
    t.dataTransfer.effectAllowed = "copyMove",
    bt || t.dataTransfer.setData("text/plain", c),
    r.dragging = new Fs(d,Ls(r, t),o)
}
;
_.dragend = r => {
    let e = r.dragging;
    window.setTimeout( () => {
        r.dragging == e && (r.dragging = null)
    }
    , 50)
}
;
G.dragover = G.dragenter = (r, e) => e.preventDefault();
G.drop = (r, e) => {
    let t = e
      , n = r.dragging;
    if (r.dragging = null,
    !t.dataTransfer)
        return;
    let i = r.posAtCoords(rn(t));
    if (!i)
        return;
    let s = r.state.doc.resolve(i.pos)
      , o = n && n.slice;
    o ? r.someProp("transformPasted", p => {
        o = p(o, r)
    }
    ) : o = Ts(r, zs(t.dataTransfer), bt ? null : t.dataTransfer.getData("text/html"), !1, s);
    let l = !!(n && Ls(r, t));
    if (r.someProp("handleDrop", p => p(r, t, o || x.empty, l))) {
        t.preventDefault();
        return
    }
    if (!o)
        return;
    t.preventDefault();
    let a = o ? sl(r.state.doc, s.pos, o) : s.pos;
    a == null && (a = s.pos);
    let c = r.state.tr;
    if (l) {
        let {node: p} = n;
        p ? p.replace(c) : c.deleteSelection()
    }
    let d = c.mapping.map(a)
      , f = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1
      , u = c.doc;
    if (f ? c.replaceRangeWith(d, d, o.content.firstChild) : c.replaceRange(d, d, o),
    c.doc.eq(u))
        return;
    let h = c.doc.resolve(d);
    if (f && M.isSelectable(o.content.firstChild) && h.nodeAfter && h.nodeAfter.sameMarkup(o.content.firstChild))
        c.setSelection(new M(h));
    else {
        let p = c.mapping.map(a);
        c.mapping.maps[c.mapping.maps.length - 1].forEach( (m, g, y, C) => p = C),
        c.setSelection(er(r, h, c.doc.resolve(p)))
    }
    r.focus(),
    r.dispatch(c.setMeta("uiEvent", "drop"))
}
;
_.focus = r => {
    r.input.lastFocus = Date.now(),
    r.focused || (r.domObserver.stop(),
    r.dom.classList.add("ProseMirror-focused"),
    r.domObserver.start(),
    r.focused = !0,
    setTimeout( () => {
        r.docView && r.hasFocus() && !r.domObserver.currentSelection.eq(r.domSelectionRange()) && me(r)
    }
    , 20))
}
;
_.blur = (r, e) => {
    let t = e;
    r.focused && (r.domObserver.stop(),
    r.dom.classList.remove("ProseMirror-focused"),
    r.domObserver.start(),
    t.relatedTarget && r.dom.contains(t.relatedTarget) && r.domObserver.currentSelection.clear(),
    r.focused = !1)
}
;
_.beforeinput = (r, e) => {
    if (J && ue && e.inputType == "deleteContentBackward") {
        r.domObserver.flushSoon();
        let {domChangeCount: n} = r.input;
        setTimeout( () => {
            if (r.input.domChangeCount != n || (r.dom.blur(),
            r.focus(),
            r.someProp("handleKeyDown", s => s(r, Re(8, "Backspace")))))
                return;
            let {$cursor: i} = r.state.selection;
            i && i.pos > 0 && r.dispatch(r.state.tr.delete(i.pos - 1, i.pos).scrollIntoView())
        }
        , 50)
    }
}
;
for (let r in G)
    _[r] = G[r];
function xt(r, e) {
    if (r == e)
        return !0;
    for (let t in r)
        if (r[t] !== e[t])
            return !1;
    for (let t in e)
        if (!(t in r))
            return !1;
    return !0
}
class qt {
    constructor(e, t) {
        this.toDOM = e,
        this.spec = t || Ve,
        this.side = this.spec.side || 0
    }
    map(e, t, n, i) {
        let {pos: s, deleted: o} = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
        return o ? null : new re(s - n,s - n,this)
    }
    valid() {
        return !0
    }
    eq(e) {
        return this == e || e instanceof qt && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && xt(this.spec, e.spec))
    }
    destroy(e) {
        this.spec.destroy && this.spec.destroy(e)
    }
}
class Ne {
    constructor(e, t) {
        this.attrs = e,
        this.spec = t || Ve
    }
    map(e, t, n, i) {
        let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - n
          , o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - n;
        return s >= o ? null : new re(s,o,this)
    }
    valid(e, t) {
        return t.from < t.to
    }
    eq(e) {
        return this == e || e instanceof Ne && xt(this.attrs, e.attrs) && xt(this.spec, e.spec)
    }
    static is(e) {
        return e.type instanceof Ne
    }
    destroy() {}
}
class sr {
    constructor(e, t) {
        this.attrs = e,
        this.spec = t || Ve
    }
    map(e, t, n, i) {
        let s = e.mapResult(t.from + i, 1);
        if (s.deleted)
            return null;
        let o = e.mapResult(t.to + i, -1);
        return o.deleted || o.pos <= s.pos ? null : new re(s.pos - n,o.pos - n,this)
    }
    valid(e, t) {
        let {index: n, offset: i} = e.content.findIndex(t.from), s;
        return i == t.from && !(s = e.child(n)).isText && i + s.nodeSize == t.to
    }
    eq(e) {
        return this == e || e instanceof sr && xt(this.attrs, e.attrs) && xt(this.spec, e.spec)
    }
    destroy() {}
}
class re {
    constructor(e, t, n) {
        this.from = e,
        this.to = t,
        this.type = n
    }
    copy(e, t) {
        return new re(e,t,this.type)
    }
    eq(e, t=0) {
        return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to
    }
    map(e, t, n) {
        return this.type.map(e, this, t, n)
    }
    static widget(e, t, n) {
        return new re(e,e,new qt(t,n))
    }
    static inline(e, t, n, i) {
        return new re(e,t,new Ne(n,i))
    }
    static node(e, t, n, i) {
        return new re(e,t,new sr(n,i))
    }
    get spec() {
        return this.type.spec
    }
    get inline() {
        return this.type instanceof Ne
    }
    get widget() {
        return this.type instanceof qt
    }
}
const Xe = []
  , Ve = {};
class z {
    constructor(e, t) {
        this.local = e.length ? e : Xe,
        this.children = t.length ? t : Xe
    }
    static create(e, t) {
        return t.length ? Kt(t, e, 0, Ve) : j
    }
    find(e, t, n) {
        let i = [];
        return this.findInner(e == null ? 0 : e, t == null ? 1e9 : t, i, 0, n),
        i
    }
    findInner(e, t, n, i, s) {
        for (let o = 0; o < this.local.length; o++) {
            let l = this.local[o];
            l.from <= t && l.to >= e && (!s || s(l.spec)) && n.push(l.copy(l.from + i, l.to + i))
        }
        for (let o = 0; o < this.children.length; o += 3)
            if (this.children[o] < t && this.children[o + 1] > e) {
                let l = this.children[o] + 1;
                this.children[o + 2].findInner(e - l, t - l, n, i + l, s)
            }
    }
    map(e, t, n) {
        return this == j || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || Ve)
    }
    mapInner(e, t, n, i, s) {
        let o;
        for (let l = 0; l < this.local.length; l++) {
            let a = this.local[l].map(e, n, i);
            a && a.type.valid(t, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec)
        }
        return this.children.length ? va(this.children, o || [], e, t, n, i, s) : o ? new z(o.sort($e),Xe) : j
    }
    add(e, t) {
        return t.length ? this == j ? z.create(e, t) : this.addInner(e, t, 0) : this
    }
    addInner(e, t, n) {
        let i, s = 0;
        e.forEach( (l, a) => {
            let c = a + n, d;
            if (d = $s(t, l, c)) {
                for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
                    s += 3;
                i[s] == a ? i[s + 2] = i[s + 2].addInner(l, d, c + 1) : i.splice(s, 0, a, a + l.nodeSize, Kt(d, l, c + 1, Ve)),
                s += 3
            }
        }
        );
        let o = Vs(s ? Ws(t) : t, -n);
        for (let l = 0; l < o.length; l++)
            o[l].type.valid(e, o[l]) || o.splice(l--, 1);
        return new z(o.length ? this.local.concat(o).sort($e) : this.local,i || this.children)
    }
    remove(e) {
        return e.length == 0 || this == j ? this : this.removeInner(e, 0)
    }
    removeInner(e, t) {
        let n = this.children
          , i = this.local;
        for (let s = 0; s < n.length; s += 3) {
            let o, l = n[s] + t, a = n[s + 1] + t;
            for (let d = 0, f; d < e.length; d++)
                (f = e[d]) && f.from > l && f.to < a && (e[d] = null,
                (o || (o = [])).push(f));
            if (!o)
                continue;
            n == this.children && (n = this.children.slice());
            let c = n[s + 2].removeInner(o, l + 1);
            c != j ? n[s + 2] = c : (n.splice(s, 3),
            s -= 3)
        }
        if (i.length) {
            for (let s = 0, o; s < e.length; s++)
                if (o = e[s])
                    for (let l = 0; l < i.length; l++)
                        i[l].eq(o, t) && (i == this.local && (i = this.local.slice()),
                        i.splice(l--, 1))
        }
        return n == this.children && i == this.local ? this : i.length || n.length ? new z(i,n) : j
    }
    forChild(e, t) {
        if (this == j)
            return this;
        if (t.isLeaf)
            return z.empty;
        let n, i;
        for (let l = 0; l < this.children.length; l += 3)
            if (this.children[l] >= e) {
                this.children[l] == e && (n = this.children[l + 2]);
                break
            }
        let s = e + 1
          , o = s + t.content.size;
        for (let l = 0; l < this.local.length; l++) {
            let a = this.local[l];
            if (a.from < o && a.to > s && a.type instanceof Ne) {
                let c = Math.max(s, a.from) - s
                  , d = Math.min(o, a.to) - s;
                c < d && (i || (i = [])).push(a.copy(c, d))
            }
        }
        if (i) {
            let l = new z(i.sort($e),Xe);
            return n ? new ke([l, n]) : l
        }
        return n || j
    }
    eq(e) {
        if (this == e)
            return !0;
        if (!(e instanceof z) || this.local.length != e.local.length || this.children.length != e.children.length)
            return !1;
        for (let t = 0; t < this.local.length; t++)
            if (!this.local[t].eq(e.local[t]))
                return !1;
        for (let t = 0; t < this.children.length; t += 3)
            if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
                return !1;
        return !0
    }
    locals(e) {
        return or(this.localsInner(e))
    }
    localsInner(e) {
        if (this == j)
            return Xe;
        if (e.inlineContent || !this.local.some(Ne.is))
            return this.local;
        let t = [];
        for (let n = 0; n < this.local.length; n++)
            this.local[n].type instanceof Ne || t.push(this.local[n]);
        return t
    }
    forEachSet(e) {
        e(this)
    }
}
z.empty = new z([],[]);
z.removeOverlap = or;
const j = z.empty;
class ke {
    constructor(e) {
        this.members = e
    }
    map(e, t) {
        const n = this.members.map(i => i.map(e, t, Ve));
        return ke.from(n)
    }
    forChild(e, t) {
        if (t.isLeaf)
            return z.empty;
        let n = [];
        for (let i = 0; i < this.members.length; i++) {
            let s = this.members[i].forChild(e, t);
            s != j && (s instanceof ke ? n = n.concat(s.members) : n.push(s))
        }
        return ke.from(n)
    }
    eq(e) {
        if (!(e instanceof ke) || e.members.length != this.members.length)
            return !1;
        for (let t = 0; t < this.members.length; t++)
            if (!this.members[t].eq(e.members[t]))
                return !1;
        return !0
    }
    locals(e) {
        let t, n = !0;
        for (let i = 0; i < this.members.length; i++) {
            let s = this.members[i].localsInner(e);
            if (s.length)
                if (!t)
                    t = s;
                else {
                    n && (t = t.slice(),
                    n = !1);
                    for (let o = 0; o < s.length; o++)
                        t.push(s[o])
                }
        }
        return t ? or(n ? t : t.sort($e)) : Xe
    }
    static from(e) {
        switch (e.length) {
        case 0:
            return j;
        case 1:
            return e[0];
        default:
            return new ke(e.every(t => t instanceof z) ? e : e.reduce( (t, n) => t.concat(n instanceof z ? n : n.members), []))
        }
    }
    forEachSet(e) {
        for (let t = 0; t < this.members.length; t++)
            this.members[t].forEachSet(e)
    }
}
function va(r, e, t, n, i, s, o) {
    let l = r.slice();
    for (let c = 0, d = s; c < t.maps.length; c++) {
        let f = 0;
        t.maps[c].forEach( (u, h, p, m) => {
            let g = m - p - (h - u);
            for (let y = 0; y < l.length; y += 3) {
                let C = l[y + 1];
                if (C < 0 || u > C + d - f)
                    continue;
                let O = l[y] + d - f;
                h >= O ? l[y + 1] = u <= O ? -2 : -1 : u >= d && g && (l[y] += g,
                l[y + 1] += g)
            }
            f += g
        }
        ),
        d = t.maps[c].map(d, -1)
    }
    let a = !1;
    for (let c = 0; c < l.length; c += 3)
        if (l[c + 1] < 0) {
            if (l[c + 1] == -2) {
                a = !0,
                l[c + 1] = -1;
                continue
            }
            let d = t.map(r[c] + s)
              , f = d - i;
            if (f < 0 || f >= n.content.size) {
                a = !0;
                continue
            }
            let u = t.map(r[c + 1] + s, -1)
              , h = u - i
              , {index: p, offset: m} = n.content.findIndex(f)
              , g = n.maybeChild(p);
            if (g && m == f && m + g.nodeSize == h) {
                let y = l[c + 2].mapInner(t, g, d + 1, r[c] + s + 1, o);
                y != j ? (l[c] = f,
                l[c + 1] = h,
                l[c + 2] = y) : (l[c + 1] = -2,
                a = !0)
            } else
                a = !0
        }
    if (a) {
        let c = Ra(l, r, e, t, i, s, o)
          , d = Kt(c, n, 0, o);
        e = d.local;
        for (let f = 0; f < l.length; f += 3)
            l[f + 1] < 0 && (l.splice(f, 3),
            f -= 3);
        for (let f = 0, u = 0; f < d.children.length; f += 3) {
            let h = d.children[f];
            for (; u < l.length && l[u] < h; )
                u += 3;
            l.splice(u, 0, d.children[f], d.children[f + 1], d.children[f + 2])
        }
    }
    return new z(e.sort($e),l)
}
function Vs(r, e) {
    if (!e || !r.length)
        return r;
    let t = [];
    for (let n = 0; n < r.length; n++) {
        let i = r[n];
        t.push(new re(i.from + e,i.to + e,i.type))
    }
    return t
}
function Ra(r, e, t, n, i, s, o) {
    function l(a, c) {
        for (let d = 0; d < a.local.length; d++) {
            let f = a.local[d].map(n, i, c);
            f ? t.push(f) : o.onRemove && o.onRemove(a.local[d].spec)
        }
        for (let d = 0; d < a.children.length; d += 3)
            l(a.children[d + 2], a.children[d] + c + 1)
    }
    for (let a = 0; a < r.length; a += 3)
        r[a + 1] == -1 && l(r[a + 2], e[a] + s + 1);
    return t
}
function $s(r, e, t) {
    if (e.isLeaf)
        return null;
    let n = t + e.nodeSize
      , i = null;
    for (let s = 0, o; s < r.length; s++)
        (o = r[s]) && o.from > t && o.to < n && ((i || (i = [])).push(o),
        r[s] = null);
    return i
}
function Ws(r) {
    let e = [];
    for (let t = 0; t < r.length; t++)
        r[t] != null && e.push(r[t]);
    return e
}
function Kt(r, e, t, n) {
    let i = []
      , s = !1;
    e.forEach( (l, a) => {
        let c = $s(r, l, a + t);
        if (c) {
            s = !0;
            let d = Kt(c, l, t + a + 1, n);
            d != j && i.push(a, a + l.nodeSize, d)
        }
    }
    );
    let o = Vs(s ? Ws(r) : r, -t).sort($e);
    for (let l = 0; l < o.length; l++)
        o[l].type.valid(e, o[l]) || (n.onRemove && n.onRemove(o[l].spec),
        o.splice(l--, 1));
    return o.length || i.length ? new z(o,i) : j
}
function $e(r, e) {
    return r.from - e.from || r.to - e.to
}
function or(r) {
    let e = r;
    for (let t = 0; t < e.length - 1; t++) {
        let n = e[t];
        if (n.from != n.to)
            for (let i = t + 1; i < e.length; i++) {
                let s = e[i];
                if (s.from == n.from) {
                    s.to != n.to && (e == r && (e = r.slice()),
                    e[i] = s.copy(s.from, n.to),
                    li(e, i + 1, s.copy(n.to, s.to)));
                    continue
                } else {
                    s.from < n.to && (e == r && (e = r.slice()),
                    e[t] = n.copy(n.from, s.from),
                    li(e, i, n.copy(s.from, n.to)));
                    break
                }
            }
    }
    return e
}
function li(r, e, t) {
    for (; e < r.length && $e(t, r[e]) > 0; )
        e++;
    r.splice(e, 0, t)
}
function Mn(r) {
    let e = [];
    return r.someProp("decorations", t => {
        let n = t(r.state);
        n && n != j && e.push(n)
    }
    ),
    r.cursorWrapper && e.push(z.create(r.state.doc, [r.cursorWrapper.deco])),
    ke.from(e)
}
const Pa = {
    childList: !0,
    characterData: !0,
    characterDataOldValue: !0,
    attributes: !0,
    attributeOldValue: !0,
    subtree: !0
}
  , Ba = X && Oe <= 11;
class za {
    constructor() {
        this.anchorNode = null,
        this.anchorOffset = 0,
        this.focusNode = null,
        this.focusOffset = 0
    }
    set(e) {
        this.anchorNode = e.anchorNode,
        this.anchorOffset = e.anchorOffset,
        this.focusNode = e.focusNode,
        this.focusOffset = e.focusOffset
    }
    clear() {
        this.anchorNode = this.focusNode = null
    }
    eq(e) {
        return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset
    }
}
class Fa {
    constructor(e, t) {
        this.view = e,
        this.handleDOMChange = t,
        this.queue = [],
        this.flushingSoon = -1,
        this.observer = null,
        this.currentSelection = new za,
        this.onCharData = null,
        this.suppressingSelectionUpdates = !1,
        this.lastChangedTextNode = null,
        this.observer = window.MutationObserver && new window.MutationObserver(n => {
            for (let i = 0; i < n.length; i++)
                this.queue.push(n[i]);
            X && Oe <= 11 && n.some(i => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush()
        }
        ),
        Ba && (this.onCharData = n => {
            this.queue.push({
                target: n.target,
                type: "characterData",
                oldValue: n.prevValue
            }),
            this.flushSoon()
        }
        ),
        this.onSelectionChange = this.onSelectionChange.bind(this)
    }
    flushSoon() {
        this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout( () => {
            this.flushingSoon = -1,
            this.flush()
        }
        , 20))
    }
    forceFlush() {
        this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon),
        this.flushingSoon = -1,
        this.flush())
    }
    start() {
        this.observer && (this.observer.takeRecords(),
        this.observer.observe(this.view.dom, Pa)),
        this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData),
        this.connectSelection()
    }
    stop() {
        if (this.observer) {
            let e = this.observer.takeRecords();
            if (e.length) {
                for (let t = 0; t < e.length; t++)
                    this.queue.push(e[t]);
                window.setTimeout( () => this.flush(), 20)
            }
            this.observer.disconnect()
        }
        this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData),
        this.disconnectSelection()
    }
    connectSelection() {
        this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange)
    }
    disconnectSelection() {
        this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange)
    }
    suppressSelectionUpdates() {
        this.suppressingSelectionUpdates = !0,
        setTimeout( () => this.suppressingSelectionUpdates = !1, 50)
    }
    onSelectionChange() {
        if (Qr(this.view)) {
            if (this.suppressingSelectionUpdates)
                return me(this.view);
            if (X && Oe <= 11 && !this.view.state.selection.empty) {
                let e = this.view.domSelectionRange();
                if (e.focusNode && je(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
                    return this.flushSoon()
            }
            this.flush()
        }
    }
    setCurSelection() {
        this.currentSelection.set(this.view.domSelectionRange())
    }
    ignoreSelectionChange(e) {
        if (!e.focusNode)
            return !0;
        let t = new Set, n;
        for (let s = e.focusNode; s; s = rt(s))
            t.add(s);
        for (let s = e.anchorNode; s; s = rt(s))
            if (t.has(s)) {
                n = s;
                break
            }
        let i = n && this.view.docView.nearestDesc(n);
        if (i && i.ignoreMutation({
            type: "selection",
            target: n.nodeType == 3 ? n.parentNode : n
        }))
            return this.setCurSelection(),
            !0
    }
    pendingRecords() {
        if (this.observer)
            for (let e of this.observer.takeRecords())
                this.queue.push(e);
        return this.queue
    }
    flush() {
        let {view: e} = this;
        if (!e.docView || this.flushingSoon > -1)
            return;
        let t = this.pendingRecords();
        t.length && (this.queue = []);
        let n = e.domSelectionRange()
          , i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && Qr(e) && !this.ignoreSelectionChange(n)
          , s = -1
          , o = -1
          , l = !1
          , a = [];
        if (e.editable)
            for (let d = 0; d < t.length; d++) {
                let f = this.registerMutation(t[d], a);
                f && (s = s < 0 ? f.from : Math.min(f.from, s),
                o = o < 0 ? f.to : Math.max(f.to, o),
                f.typeOver && (l = !0))
            }
        if (ie && a.length) {
            let d = a.filter(f => f.nodeName == "BR");
            if (d.length == 2) {
                let[f,u] = d;
                f.parentNode && f.parentNode.parentNode == u.parentNode ? u.remove() : f.remove()
            } else {
                let {focusNode: f} = this.currentSelection;
                for (let u of d) {
                    let h = u.parentNode;
                    h && h.nodeName == "LI" && (!f || $a(e, f) != h) && u.remove()
                }
            }
        }
        let c = null;
        s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && tn(n) && (c = Qn(e)) && c.eq(E.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0,
        me(e),
        this.currentSelection.set(n),
        e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o),
        La(e)),
        this.handleDOMChange(s, o, l, a),
        e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(n) || me(e),
        this.currentSelection.set(n))
    }
    registerMutation(e, t) {
        if (t.indexOf(e.target) > -1)
            return null;
        let n = this.view.docView.nearestDesc(e.target);
        if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e))
            return null;
        if (e.type == "childList") {
            for (let d = 0; d < e.addedNodes.length; d++) {
                let f = e.addedNodes[d];
                t.push(f),
                f.nodeType == 3 && (this.lastChangedTextNode = f)
            }
            if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target))
                return {
                    from: n.posBefore,
                    to: n.posAfter
                };
            let i = e.previousSibling
              , s = e.nextSibling;
            if (X && Oe <= 11 && e.addedNodes.length)
                for (let d = 0; d < e.addedNodes.length; d++) {
                    let {previousSibling: f, nextSibling: u} = e.addedNodes[d];
                    (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (i = f),
                    (!u || Array.prototype.indexOf.call(e.addedNodes, u) < 0) && (s = u)
                }
            let o = i && i.parentNode == e.target ? W(i) + 1 : 0
              , l = n.localPosFromDOM(e.target, o, -1)
              , a = s && s.parentNode == e.target ? W(s) : e.target.childNodes.length
              , c = n.localPosFromDOM(e.target, a, 1);
            return {
                from: l,
                to: c
            }
        } else
            return e.type == "attributes" ? {
                from: n.posAtStart - n.border,
                to: n.posAtEnd + n.border
            } : (this.lastChangedTextNode = e.target,
            {
                from: n.posAtStart,
                to: n.posAtEnd,
                typeOver: e.target.nodeValue == e.oldValue
            })
    }
}
let ai = new WeakMap
  , ci = !1;
function La(r) {
    if (!ai.has(r) && (ai.set(r, null),
    ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(r.dom).whiteSpace) !== -1)) {
        if (r.requiresGeckoHackNode = ie,
        ci)
            return;
        ci = !0
    }
}
function di(r, e) {
    let t = e.startContainer
      , n = e.startOffset
      , i = e.endContainer
      , s = e.endOffset
      , o = r.domAtPos(r.state.selection.anchor);
    return je(o.node, o.offset, i, s) && ([t,n,i,s] = [i, s, t, n]),
    {
        anchorNode: t,
        anchorOffset: n,
        focusNode: i,
        focusOffset: s
    }
}
function Va(r, e) {
    if (e.getComposedRanges) {
        let i = e.getComposedRanges(r.root)[0];
        if (i)
            return di(r, i)
    }
    let t;
    function n(i) {
        i.preventDefault(),
        i.stopImmediatePropagation(),
        t = i.getTargetRanges()[0]
    }
    return r.dom.addEventListener("beforeinput", n, !0),
    document.execCommand("indent"),
    r.dom.removeEventListener("beforeinput", n, !0),
    t ? di(r, t) : null
}
function $a(r, e) {
    for (let t = e.parentNode; t && t != r.dom; t = t.parentNode) {
        let n = r.docView.nearestDesc(t, !0);
        if (n && n.node.isBlock)
            return t
    }
    return null
}
function Wa(r, e, t) {
    let {node: n, fromOffset: i, toOffset: s, from: o, to: l} = r.docView.parseRange(e, t), a = r.domSelectionRange(), c, d = a.anchorNode;
    if (d && r.dom.contains(d.nodeType == 1 ? d : d.parentNode) && (c = [{
        node: d,
        offset: a.anchorOffset
    }],
    tn(a) || c.push({
        node: a.focusNode,
        offset: a.focusOffset
    })),
    J && r.input.lastKeyCode === 8)
        for (let g = s; g > i; g--) {
            let y = n.childNodes[g - 1]
              , C = y.pmViewDesc;
            if (y.nodeName == "BR" && !C) {
                s = g;
                break
            }
            if (!C || C.size)
                break
        }
    let f = r.state.doc
      , u = r.someProp("domParser") || we.fromSchema(r.state.schema)
      , h = f.resolve(o)
      , p = null
      , m = u.parse(n, {
        topNode: h.parent,
        topMatch: h.parent.contentMatchAt(h.index()),
        topOpen: !0,
        from: i,
        to: s,
        preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
        findPositions: c,
        ruleFromNode: Ha,
        context: h
    });
    if (c && c[0].pos != null) {
        let g = c[0].pos
          , y = c[1] && c[1].pos;
        y == null && (y = g),
        p = {
            anchor: g + o,
            head: y + o
        }
    }
    return {
        doc: m,
        sel: p,
        from: o,
        to: l
    }
}
function Ha(r) {
    let e = r.pmViewDesc;
    if (e)
        return e.parseRule();
    if (r.nodeName == "BR" && r.parentNode) {
        if (U && /^(ul|ol)$/i.test(r.parentNode.nodeName)) {
            let t = document.createElement("div");
            return t.appendChild(document.createElement("li")),
            {
                skip: t
            }
        } else if (r.parentNode.lastChild == r || U && /^(tr|table)$/i.test(r.parentNode.nodeName))
            return {
                ignore: !0
            }
    } else if (r.nodeName == "IMG" && r.getAttribute("mark-placeholder"))
        return {
            ignore: !0
        };
    return null
}
const ja = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function Ja(r, e, t, n, i) {
    let s = r.input.compositionPendingChanges || (r.composing ? r.input.compositionID : 0);
    if (r.input.compositionPendingChanges = 0,
    e < 0) {
        let w = r.input.lastSelectionTime > Date.now() - 50 ? r.input.lastSelectionOrigin : null
          , v = Qn(r, w);
        if (v && !r.state.selection.eq(v)) {
            if (J && ue && r.input.lastKeyCode === 13 && Date.now() - 100 < r.input.lastKeyCodeTime && r.someProp("handleKeyDown", po => po(r, Re(13, "Enter"))))
                return;
            let Y = r.state.tr.setSelection(v);
            w == "pointer" ? Y.setMeta("pointer", !0) : w == "key" && Y.scrollIntoView(),
            s && Y.setMeta("composition", s),
            r.dispatch(Y)
        }
        return
    }
    let o = r.state.doc.resolve(e)
      , l = o.sharedDepth(t);
    e = o.before(l + 1),
    t = r.state.doc.resolve(t).after(l + 1);
    let a = r.state.selection, c = Wa(r, e, t), d = r.state.doc, f = d.slice(c.from, c.to), u, h;
    r.input.lastKeyCode === 8 && Date.now() - 100 < r.input.lastKeyCodeTime ? (u = r.state.selection.to,
    h = "end") : (u = r.state.selection.from,
    h = "start"),
    r.input.lastKeyCode = null;
    let p = Ua(f.content, c.doc.content, c.from, u, h);
    if (p && r.input.domChangeCount++,
    (it && r.input.lastIOSEnter > Date.now() - 225 || ue) && i.some(w => w.nodeType == 1 && !ja.test(w.nodeName)) && (!p || p.endA >= p.endB) && r.someProp("handleKeyDown", w => w(r, Re(13, "Enter")))) {
        r.input.lastIOSEnter = 0;
        return
    }
    if (!p)
        if (n && a instanceof T && !a.empty && a.$head.sameParent(a.$anchor) && !r.composing && !(c.sel && c.sel.anchor != c.sel.head))
            p = {
                start: a.from,
                endA: a.to,
                endB: a.to
            };
        else {
            if (c.sel) {
                let w = fi(r, r.state.doc, c.sel);
                if (w && !w.eq(r.state.selection)) {
                    let v = r.state.tr.setSelection(w);
                    s && v.setMeta("composition", s),
                    r.dispatch(v)
                }
            }
            return
        }
    r.state.selection.from < r.state.selection.to && p.start == p.endB && r.state.selection instanceof T && (p.start > r.state.selection.from && p.start <= r.state.selection.from + 2 && r.state.selection.from >= c.from ? p.start = r.state.selection.from : p.endA < r.state.selection.to && p.endA >= r.state.selection.to - 2 && r.state.selection.to <= c.to && (p.endB += r.state.selection.to - p.endA,
    p.endA = r.state.selection.to)),
    X && Oe <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--,
    p.endA--,
    p.endB--);
    let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), y = d.resolve(p.start), C = m.sameParent(g) && m.parent.inlineContent && y.end() >= p.endA, O;
    if ((it && r.input.lastIOSEnter > Date.now() - 225 && (!C || i.some(w => w.nodeName == "DIV" || w.nodeName == "P")) || !C && m.pos < c.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && !/\S/.test(c.doc.textBetween(m.pos, g.pos, "", "")) && (O = E.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && O.head > m.pos) && r.someProp("handleKeyDown", w => w(r, Re(13, "Enter")))) {
        r.input.lastIOSEnter = 0;
        return
    }
    if (r.state.selection.anchor > p.start && Ka(d, p.start, p.endA, m, g) && r.someProp("handleKeyDown", w => w(r, Re(8, "Backspace")))) {
        ue && J && r.domObserver.suppressSelectionUpdates();
        return
    }
    J && p.endB == p.start && (r.input.lastChromeDelete = Date.now()),
    ue && !C && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2,
    g = c.doc.resolveNoCache(p.endB - c.from),
    setTimeout( () => {
        r.someProp("handleKeyDown", function(w) {
            return w(r, Re(13, "Enter"))
        })
    }
    , 20));
    let A = p.start, D = p.endA, P = w => {
        let v = w || r.state.tr.replace(A, D, c.doc.slice(p.start - c.from, p.endB - c.from));
        if (c.sel) {
            let Y = fi(r, v.doc, c.sel);
            Y && !(J && r.composing && Y.empty && (p.start != p.endB || r.input.lastChromeDelete < Date.now() - 100) && (Y.head == A || Y.head == v.mapping.map(D) - 1) || X && Y.empty && Y.head == A) && v.setSelection(Y)
        }
        return s && v.setMeta("composition", s),
        v.scrollIntoView()
    }
    , K;
    if (C) {
        if (m.pos == g.pos) {
            X && Oe <= 11 && m.parentOffset == 0 && (r.domObserver.suppressSelectionUpdates(),
            setTimeout( () => me(r), 20));
            let w = P(r.state.tr.delete(A, D))
              , v = d.resolve(p.start).marksAcross(d.resolve(p.endA));
            v && w.ensureMarks(v),
            r.dispatch(w)
        } else if (p.endA == p.endB && (K = qa(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))) {
            let w = P(r.state.tr);
            K.type == "add" ? w.addMark(A, D, K.mark) : w.removeMark(A, D, K.mark),
            r.dispatch(w)
        } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
            let w = m.parent.textBetween(m.parentOffset, g.parentOffset)
              , v = () => P(r.state.tr.insertText(w, A, D));
            r.someProp("handleTextInput", Y => Y(r, A, D, w, v)) || r.dispatch(v())
        }
    } else
        r.dispatch(P())
}
function fi(r, e, t) {
    return Math.max(t.anchor, t.head) > e.content.size ? null : er(r, e.resolve(t.anchor), e.resolve(t.head))
}
function qa(r, e) {
    let t = r.firstChild.marks, n = e.firstChild.marks, i = t, s = n, o, l, a;
    for (let d = 0; d < n.length; d++)
        i = n[d].removeFromSet(i);
    for (let d = 0; d < t.length; d++)
        s = t[d].removeFromSet(s);
    if (i.length == 1 && s.length == 0)
        l = i[0],
        o = "add",
        a = d => d.mark(l.addToSet(d.marks));
    else if (i.length == 0 && s.length == 1)
        l = s[0],
        o = "remove",
        a = d => d.mark(l.removeFromSet(d.marks));
    else
        return null;
    let c = [];
    for (let d = 0; d < e.childCount; d++)
        c.push(a(e.child(d)));
    if (b.from(c).eq(r))
        return {
            mark: l,
            type: o
        }
}
function Ka(r, e, t, n, i) {
    if (t - e <= i.pos - n.pos || Cn(n, !0, !1) < i.pos)
        return !1;
    let s = r.resolve(e);
    if (!n.parent.isTextblock) {
        let l = s.nodeAfter;
        return l != null && t == e + l.nodeSize
    }
    if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
        return !1;
    let o = r.resolve(Cn(s, !0, !0));
    return !o.parent.isTextblock || o.pos > t || Cn(o, !0, !1) < t ? !1 : n.parent.content.cut(n.parentOffset).eq(o.parent.content)
}
function Cn(r, e, t) {
    let n = r.depth
      , i = e ? r.end() : r.pos;
    for (; n > 0 && (e || r.indexAfter(n) == r.node(n).childCount); )
        n--,
        i++,
        e = !1;
    if (t) {
        let s = r.node(n).maybeChild(r.indexAfter(n));
        for (; s && !s.isLeaf; )
            s = s.firstChild,
            i++
    }
    return i
}
function Ua(r, e, t, n, i) {
    let s = r.findDiffStart(e, t);
    if (s == null)
        return null;
    let {a: o, b: l} = r.findDiffEnd(e, t + r.size, t + e.size);
    if (i == "end") {
        let a = Math.max(0, s - Math.min(o, l));
        n -= o + a - s
    }
    if (o < s && r.size < e.size) {
        let a = n <= s && n >= o ? s - n : 0;
        s -= a,
        s && s < e.size && ui(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1),
        l = s + (l - o),
        o = s
    } else if (l < s) {
        let a = n <= s && n >= l ? s - n : 0;
        s -= a,
        s && s < r.size && ui(r.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1),
        o = s + (o - l),
        l = s
    }
    return {
        start: s,
        endA: o,
        endB: l
    }
}
function ui(r) {
    if (r.length != 2)
        return !1;
    let e = r.charCodeAt(0)
      , t = r.charCodeAt(1);
    return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319
}
class Hs {
    constructor(e, t) {
        this._root = null,
        this.focused = !1,
        this.trackWrites = null,
        this.mounted = !1,
        this.markCursor = null,
        this.cursorWrapper = null,
        this.lastSelectedViewDesc = void 0,
        this.input = new ua,
        this.prevDirectPlugins = [],
        this.pluginViews = [],
        this.requiresGeckoHackNode = !1,
        this.dragging = null,
        this._props = t,
        this.state = t.state,
        this.directPlugins = t.plugins || [],
        this.directPlugins.forEach(yi),
        this.dispatch = this.dispatch.bind(this),
        this.dom = e && e.mount || document.createElement("div"),
        e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)),
        this.editable = mi(this),
        pi(this),
        this.nodeViews = gi(this),
        this.docView = Ur(this.state.doc, hi(this), Mn(this), this.dom, this),
        this.domObserver = new Fa(this, (n, i, s, o) => Ja(this, n, i, s, o)),
        this.domObserver.start(),
        ha(this),
        this.updatePluginViews()
    }
    get composing() {
        return this.input.composing
    }
    get props() {
        if (this._props.state != this.state) {
            let e = this._props;
            this._props = {};
            for (let t in e)
                this._props[t] = e[t];
            this._props.state = this.state
        }
        return this._props
    }
    update(e) {
        e.handleDOMEvents != this._props.handleDOMEvents && Jn(this);
        let t = this._props;
        this._props = e,
        e.plugins && (e.plugins.forEach(yi),
        this.directPlugins = e.plugins),
        this.updateStateInner(e.state, t)
    }
    setProps(e) {
        let t = {};
        for (let n in this._props)
            t[n] = this._props[n];
        t.state = this.state;
        for (let n in e)
            t[n] = e[n];
        this.update(t)
    }
    updateState(e) {
        this.updateStateInner(e, this._props)
    }
    updateStateInner(e, t) {
        var n;
        let i = this.state
          , s = !1
          , o = !1;
        e.storedMarks && this.composing && (Bs(this),
        o = !0),
        this.state = e;
        let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
        if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
            let h = gi(this);
            Ga(h, this.nodeViews) && (this.nodeViews = h,
            s = !0)
        }
        (l || t.handleDOMEvents != this._props.handleDOMEvents) && Jn(this),
        this.editable = mi(this),
        pi(this);
        let a = Mn(this)
          , c = hi(this)
          , d = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve"
          , f = s || !this.docView.matchesNode(e.doc, c, a);
        (f || !e.selection.eq(i.selection)) && (o = !0);
        let u = d == "preserve" && o && this.dom.style.overflowAnchor == null && Nl(this);
        if (o) {
            this.domObserver.stop();
            let h = f && (X || J) && !this.composing && !i.selection.empty && !e.selection.empty && _a(i.selection, e.selection);
            if (f) {
                let p = J ? this.trackWrites = this.domSelectionRange().focusNode : null;
                this.composing && (this.input.compositionNode = Ta(this)),
                (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c),
                this.docView.destroy(),
                this.docView = Ur(e.doc, c, a, this.dom, this)),
                p && !this.trackWrites && (h = !0)
            }
            h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && Xl(this)) ? me(this, h) : (Cs(this, e.selection),
            this.domObserver.setCurSelection()),
            this.domObserver.start()
        }
        this.updatePluginViews(i),
        !((n = this.dragging) === null || n === void 0) && n.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i),
        d == "reset" ? this.dom.scrollTop = 0 : d == "to selection" ? this.scrollToSelection() : u && El(u)
    }
    scrollToSelection() {
        let e = this.domSelectionRange().focusNode;
        if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
            if (!this.someProp("handleScrollToSelection", t => t(this)))
                if (this.state.selection instanceof M) {
                    let t = this.docView.domAfterPos(this.state.selection.from);
                    t.nodeType == 1 && Wr(this, t.getBoundingClientRect(), e)
                } else
                    Wr(this, this.coordsAtPos(this.state.selection.head, 1), e)
        }
    }
    destroyPluginViews() {
        let e;
        for (; e = this.pluginViews.pop(); )
            e.destroy && e.destroy()
    }
    updatePluginViews(e) {
        if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
            this.prevDirectPlugins = this.directPlugins,
            this.destroyPluginViews();
            for (let t = 0; t < this.directPlugins.length; t++) {
                let n = this.directPlugins[t];
                n.spec.view && this.pluginViews.push(n.spec.view(this))
            }
            for (let t = 0; t < this.state.plugins.length; t++) {
                let n = this.state.plugins[t];
                n.spec.view && this.pluginViews.push(n.spec.view(this))
            }
        } else
            for (let t = 0; t < this.pluginViews.length; t++) {
                let n = this.pluginViews[t];
                n.update && n.update(this, e)
            }
    }
    updateDraggedNode(e, t) {
        let n = e.node
          , i = -1;
        if (this.state.doc.nodeAt(n.from) == n.node)
            i = n.from;
        else {
            let s = n.from + (this.state.doc.content.size - t.doc.content.size);
            (s > 0 && this.state.doc.nodeAt(s)) == n.node && (i = s)
        }
        this.dragging = new Fs(e.slice,e.move,i < 0 ? void 0 : M.create(this.state.doc, i))
    }
    someProp(e, t) {
        let n = this._props && this._props[e], i;
        if (n != null && (i = t ? t(n) : n))
            return i;
        for (let o = 0; o < this.directPlugins.length; o++) {
            let l = this.directPlugins[o].props[e];
            if (l != null && (i = t ? t(l) : l))
                return i
        }
        let s = this.state.plugins;
        if (s)
            for (let o = 0; o < s.length; o++) {
                let l = s[o].props[e];
                if (l != null && (i = t ? t(l) : l))
                    return i
            }
    }
    hasFocus() {
        if (X) {
            let e = this.root.activeElement;
            if (e == this.dom)
                return !0;
            if (!e || !this.dom.contains(e))
                return !1;
            for (; e && this.dom != e && this.dom.contains(e); ) {
                if (e.contentEditable == "false")
                    return !1;
                e = e.parentElement
            }
            return !0
        }
        return this.root.activeElement == this.dom
    }
    focus() {
        this.domObserver.stop(),
        this.editable && Dl(this.dom),
        me(this),
        this.domObserver.start()
    }
    get root() {
        let e = this._root;
        if (e == null) {
            for (let t = this.dom.parentNode; t; t = t.parentNode)
                if (t.nodeType == 9 || t.nodeType == 11 && t.host)
                    return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()),
                    this._root = t
        }
        return e || document
    }
    updateRoot() {
        this._root = null
    }
    posAtCoords(e) {
        return Pl(this, e)
    }
    coordsAtPos(e, t=1) {
        return ms(this, e, t)
    }
    domAtPos(e, t=0) {
        return this.docView.domFromPos(e, t)
    }
    nodeDOM(e) {
        let t = this.docView.descAt(e);
        return t ? t.nodeDOM : null
    }
    posAtDOM(e, t, n=-1) {
        let i = this.docView.posFromDOM(e, t, n);
        if (i == null)
            throw new RangeError("DOM position not inside the editor");
        return i
    }
    endOfTextblock(e, t) {
        return Vl(this, t || this.state, e)
    }
    pasteHTML(e, t) {
        return kt(this, "", e, !1, t || new ClipboardEvent("paste"))
    }
    pasteText(e, t) {
        return kt(this, e, null, !0, t || new ClipboardEvent("paste"))
    }
    serializeForClipboard(e) {
        return tr(this, e)
    }
    destroy() {
        this.docView && (pa(this),
        this.destroyPluginViews(),
        this.mounted ? (this.docView.update(this.state.doc, [], Mn(this), this),
        this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom),
        this.docView.destroy(),
        this.docView = null,
        gl())
    }
    get isDestroyed() {
        return this.docView == null
    }
    dispatchEvent(e) {
        return ga(this, e)
    }
    domSelectionRange() {
        let e = this.domSelection();
        return e ? U && this.root.nodeType === 11 && Sl(this.dom.ownerDocument) == this.dom && Va(this, e) || e : {
            focusNode: null,
            focusOffset: 0,
            anchorNode: null,
            anchorOffset: 0
        }
    }
    domSelection() {
        return this.root.getSelection()
    }
}
Hs.prototype.dispatch = function(r) {
    let e = this._props.dispatchTransaction;
    e ? e.call(this, r) : this.updateState(this.state.apply(r))
}
;
function hi(r) {
    let e = Object.create(null);
    return e.class = "ProseMirror",
    e.contenteditable = String(r.editable),
    r.someProp("attributes", t => {
        if (typeof t == "function" && (t = t(r.state)),
        t)
            for (let n in t)
                n == "class" ? e.class += " " + t[n] : n == "style" ? e.style = (e.style ? e.style + ";" : "") + t[n] : !e[n] && n != "contenteditable" && n != "nodeName" && (e[n] = String(t[n]))
    }
    ),
    e.translate || (e.translate = "no"),
    [re.node(0, r.state.doc.content.size, e)]
}
function pi(r) {
    if (r.markCursor) {
        let e = document.createElement("img");
        e.className = "ProseMirror-separator",
        e.setAttribute("mark-placeholder", "true"),
        e.setAttribute("alt", ""),
        r.cursorWrapper = {
            dom: e,
            deco: re.widget(r.state.selection.from, e, {
                raw: !0,
                marks: r.markCursor
            })
        }
    } else
        r.cursorWrapper = null
}
function mi(r) {
    return !r.someProp("editable", e => e(r.state) === !1)
}
function _a(r, e) {
    let t = Math.min(r.$anchor.sharedDepth(r.head), e.$anchor.sharedDepth(e.head));
    return r.$anchor.start(t) != e.$anchor.start(t)
}
function gi(r) {
    let e = Object.create(null);
    function t(n) {
        for (let i in n)
            Object.prototype.hasOwnProperty.call(e, i) || (e[i] = n[i])
    }
    return r.someProp("nodeViews", t),
    r.someProp("markViews", t),
    e
}
function Ga(r, e) {
    let t = 0
      , n = 0;
    for (let i in r) {
        if (r[i] != e[i])
            return !0;
        t++
    }
    for (let i in e)
        n++;
    return t != n
}
function yi(r) {
    if (r.spec.state || r.spec.filterTransaction || r.spec.appendTransaction)
        throw new RangeError("Plugins passed directly to the view must not have a state component")
}
var Ee = {
    8: "Backspace",
    9: "Tab",
    10: "Enter",
    12: "NumLock",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Meta",
    92: "Meta",
    106: "*",
    107: "+",
    108: ",",
    109: "-",
    110: ".",
    111: "/",
    144: "NumLock",
    145: "ScrollLock",
    160: "Shift",
    161: "Shift",
    162: "Control",
    163: "Control",
    164: "Alt",
    165: "Alt",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
}
  , Ut = {
    48: ")",
    49: "!",
    50: "@",
    51: "#",
    52: "$",
    53: "%",
    54: "^",
    55: "&",
    56: "*",
    57: "(",
    59: ":",
    61: "+",
    173: "_",
    186: ":",
    187: "+",
    188: "<",
    189: "_",
    190: ">",
    191: "?",
    192: "~",
    219: "{",
    220: "|",
    221: "}",
    222: '"'
}
  , Ya = typeof navigator != "undefined" && /Mac/.test(navigator.platform)
  , Xa = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var H = 0; H < 10; H++)
    Ee[48 + H] = Ee[96 + H] = String(H);
for (var H = 1; H <= 24; H++)
    Ee[H + 111] = "F" + H;
for (var H = 65; H <= 90; H++)
    Ee[H] = String.fromCharCode(H + 32),
    Ut[H] = String.fromCharCode(H);
for (var wn in Ee)
    Ut.hasOwnProperty(wn) || (Ut[wn] = Ee[wn]);
function Za(r) {
    var e = Ya && r.metaKey && r.shiftKey && !r.ctrlKey && !r.altKey || Xa && r.shiftKey && r.key && r.key.length == 1 || r.key == "Unidentified"
      , t = !e && r.key || (r.shiftKey ? Ut : Ee)[r.keyCode] || r.key || "Unidentified";
    return t == "Esc" && (t = "Escape"),
    t == "Del" && (t = "Delete"),
    t == "Left" && (t = "ArrowLeft"),
    t == "Up" && (t = "ArrowUp"),
    t == "Right" && (t = "ArrowRight"),
    t == "Down" && (t = "ArrowDown"),
    t
}
const Qa = typeof navigator != "undefined" && /Mac|iP(hone|[oa]d)/.test(navigator.platform)
  , ec = typeof navigator != "undefined" && /Win/.test(navigator.platform);
function tc(r) {
    let e = r.split(/-(?!$)/)
      , t = e[e.length - 1];
    t == "Space" && (t = " ");
    let n, i, s, o;
    for (let l = 0; l < e.length - 1; l++) {
        let a = e[l];
        if (/^(cmd|meta|m)$/i.test(a))
            o = !0;
        else if (/^a(lt)?$/i.test(a))
            n = !0;
        else if (/^(c|ctrl|control)$/i.test(a))
            i = !0;
        else if (/^s(hift)?$/i.test(a))
            s = !0;
        else if (/^mod$/i.test(a))
            Qa ? o = !0 : i = !0;
        else
            throw new Error("Unrecognized modifier name: " + a)
    }
    return n && (t = "Alt-" + t),
    i && (t = "Ctrl-" + t),
    o && (t = "Meta-" + t),
    s && (t = "Shift-" + t),
    t
}
function nc(r) {
    let e = Object.create(null);
    for (let t in r)
        e[tc(t)] = r[t];
    return e
}
function On(r, e, t=!0) {
    return e.altKey && (r = "Alt-" + r),
    e.ctrlKey && (r = "Ctrl-" + r),
    e.metaKey && (r = "Meta-" + r),
    t && e.shiftKey && (r = "Shift-" + r),
    r
}
function rc(r) {
    return new ce({
        props: {
            handleKeyDown: ic(r)
        }
    })
}
function ic(r) {
    let e = nc(r);
    return function(t, n) {
        let i = Za(n), s, o = e[On(i, n)];
        if (o && o(t.state, t.dispatch, t))
            return !0;
        if (i.length == 1 && i != " ") {
            if (n.shiftKey) {
                let l = e[On(i, n, !1)];
                if (l && l(t.state, t.dispatch, t))
                    return !0
            }
            if ((n.altKey || n.metaKey || n.ctrlKey) && !(ec && n.ctrlKey && n.altKey) && (s = Ee[n.keyCode]) && s != i) {
                let l = e[On(s, n)];
                if (l && l(t.state, t.dispatch, t))
                    return !0
            }
        }
        return !1
    }
}
const lr = (r, e) => r.selection.empty ? !1 : (e && e(r.tr.deleteSelection().scrollIntoView()),
!0);
function js(r, e) {
    let {$cursor: t} = r.selection;
    return !t || (e ? !e.endOfTextblock("backward", r) : t.parentOffset > 0) ? null : t
}
const Js = (r, e, t) => {
    let n = js(r, t);
    if (!n)
        return !1;
    let i = ar(n);
    if (!i) {
        let o = n.blockRange()
          , l = o && ot(o);
        return l == null ? !1 : (e && e(r.tr.lift(o, l).scrollIntoView()),
        !0)
    }
    let s = i.nodeBefore;
    if (Qs(r, i, e, -1))
        return !0;
    if (n.parent.content.size == 0 && (st(s, "end") || M.isSelectable(s)))
        for (let o = n.depth; ; o--) {
            let l = Qt(r.doc, n.before(o), n.after(o), x.empty);
            if (l && l.slice.size < l.to - l.from) {
                if (e) {
                    let a = r.tr.step(l);
                    a.setSelection(st(s, "end") ? E.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : M.create(a.doc, i.pos - s.nodeSize)),
                    e(a.scrollIntoView())
                }
                return !0
            }
            if (o == 1 || n.node(o - 1).childCount > 1)
                break
        }
    return s.isAtom && i.depth == n.depth - 1 ? (e && e(r.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()),
    !0) : !1
}
  , sc = (r, e, t) => {
    let n = js(r, t);
    if (!n)
        return !1;
    let i = ar(n);
    return i ? qs(r, i, e) : !1
}
  , oc = (r, e, t) => {
    let n = Us(r, t);
    if (!n)
        return !1;
    let i = cr(n);
    return i ? qs(r, i, e) : !1
}
;
function qs(r, e, t) {
    let n = e.nodeBefore
      , i = n
      , s = e.pos - 1;
    for (; !i.isTextblock; s--) {
        if (i.type.spec.isolating)
            return !1;
        let d = i.lastChild;
        if (!d)
            return !1;
        i = d
    }
    let o = e.nodeAfter
      , l = o
      , a = e.pos + 1;
    for (; !l.isTextblock; a++) {
        if (l.type.spec.isolating)
            return !1;
        let d = l.firstChild;
        if (!d)
            return !1;
        l = d
    }
    let c = Qt(r.doc, s, a, x.empty);
    if (!c || c.from != s || c instanceof F && c.slice.size >= a - s)
        return !1;
    if (t) {
        let d = r.tr.step(c);
        d.setSelection(T.create(d.doc, s)),
        t(d.scrollIntoView())
    }
    return !0
}
function st(r, e, t=!1) {
    for (let n = r; n; n = e == "start" ? n.firstChild : n.lastChild) {
        if (n.isTextblock)
            return !0;
        if (t && n.childCount != 1)
            return !1
    }
    return !1
}
const Ks = (r, e, t) => {
    let {$head: n, empty: i} = r.selection
      , s = n;
    if (!i)
        return !1;
    if (n.parent.isTextblock) {
        if (t ? !t.endOfTextblock("backward", r) : n.parentOffset > 0)
            return !1;
        s = ar(n)
    }
    let o = s && s.nodeBefore;
    return !o || !M.isSelectable(o) ? !1 : (e && e(r.tr.setSelection(M.create(r.doc, s.pos - o.nodeSize)).scrollIntoView()),
    !0)
}
;
function ar(r) {
    if (!r.parent.type.spec.isolating)
        for (let e = r.depth - 1; e >= 0; e--) {
            if (r.index(e) > 0)
                return r.doc.resolve(r.before(e + 1));
            if (r.node(e).type.spec.isolating)
                break
        }
    return null
}
function Us(r, e) {
    let {$cursor: t} = r.selection;
    return !t || (e ? !e.endOfTextblock("forward", r) : t.parentOffset < t.parent.content.size) ? null : t
}
const _s = (r, e, t) => {
    let n = Us(r, t);
    if (!n)
        return !1;
    let i = cr(n);
    if (!i)
        return !1;
    let s = i.nodeAfter;
    if (Qs(r, i, e, 1))
        return !0;
    if (n.parent.content.size == 0 && (st(s, "start") || M.isSelectable(s))) {
        let o = Qt(r.doc, n.before(), n.after(), x.empty);
        if (o && o.slice.size < o.to - o.from) {
            if (e) {
                let l = r.tr.step(o);
                l.setSelection(st(s, "start") ? E.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : M.create(l.doc, l.mapping.map(i.pos))),
                e(l.scrollIntoView())
            }
            return !0
        }
    }
    return s.isAtom && i.depth == n.depth - 1 ? (e && e(r.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()),
    !0) : !1
}
  , Gs = (r, e, t) => {
    let {$head: n, empty: i} = r.selection
      , s = n;
    if (!i)
        return !1;
    if (n.parent.isTextblock) {
        if (t ? !t.endOfTextblock("forward", r) : n.parentOffset < n.parent.content.size)
            return !1;
        s = cr(n)
    }
    let o = s && s.nodeAfter;
    return !o || !M.isSelectable(o) ? !1 : (e && e(r.tr.setSelection(M.create(r.doc, s.pos)).scrollIntoView()),
    !0)
}
;
function cr(r) {
    if (!r.parent.type.spec.isolating)
        for (let e = r.depth - 1; e >= 0; e--) {
            let t = r.node(e);
            if (r.index(e) + 1 < t.childCount)
                return r.doc.resolve(r.after(e + 1));
            if (t.type.spec.isolating)
                break
        }
    return null
}
const lc = (r, e) => {
    let t = r.selection, n = t instanceof M, i;
    if (n) {
        if (t.node.isTextblock || !De(r.doc, t.from))
            return !1;
        i = t.from
    } else if (i = Zt(r.doc, t.from, -1),
    i == null)
        return !1;
    if (e) {
        let s = r.tr.join(i);
        n && s.setSelection(M.create(s.doc, i - r.doc.resolve(i).nodeBefore.nodeSize)),
        e(s.scrollIntoView())
    }
    return !0
}
  , ac = (r, e) => {
    let t = r.selection, n;
    if (t instanceof M) {
        if (t.node.isTextblock || !De(r.doc, t.to))
            return !1;
        n = t.to
    } else if (n = Zt(r.doc, t.to, 1),
    n == null)
        return !1;
    return e && e(r.tr.join(n).scrollIntoView()),
    !0
}
  , cc = (r, e) => {
    let {$from: t, $to: n} = r.selection
      , i = t.blockRange(n)
      , s = i && ot(i);
    return s == null ? !1 : (e && e(r.tr.lift(i, s).scrollIntoView()),
    !0)
}
  , Ys = (r, e) => {
    let {$head: t, $anchor: n} = r.selection;
    return !t.parent.type.spec.code || !t.sameParent(n) ? !1 : (e && e(r.tr.insertText(`
`).scrollIntoView()),
    !0)
}
;
function dr(r) {
    for (let e = 0; e < r.edgeCount; e++) {
        let {type: t} = r.edge(e);
        if (t.isTextblock && !t.hasRequiredAttrs())
            return t
    }
    return null
}
const dc = (r, e) => {
    let {$head: t, $anchor: n} = r.selection;
    if (!t.parent.type.spec.code || !t.sameParent(n))
        return !1;
    let i = t.node(-1)
      , s = t.indexAfter(-1)
      , o = dr(i.contentMatchAt(s));
    if (!o || !i.canReplaceWith(s, s, o))
        return !1;
    if (e) {
        let l = t.after()
          , a = r.tr.replaceWith(l, l, o.createAndFill());
        a.setSelection(E.near(a.doc.resolve(l), 1)),
        e(a.scrollIntoView())
    }
    return !0
}
  , Xs = (r, e) => {
    let t = r.selection
      , {$from: n, $to: i} = t;
    if (t instanceof Q || n.parent.inlineContent || i.parent.inlineContent)
        return !1;
    let s = dr(i.parent.contentMatchAt(i.indexAfter()));
    if (!s || !s.isTextblock)
        return !1;
    if (e) {
        let o = (!n.parentOffset && i.index() < i.parent.childCount ? n : i).pos
          , l = r.tr.insert(o, s.createAndFill());
        l.setSelection(T.create(l.doc, o + 1)),
        e(l.scrollIntoView())
    }
    return !0
}
  , Zs = (r, e) => {
    let {$cursor: t} = r.selection;
    if (!t || t.parent.content.size)
        return !1;
    if (t.depth > 1 && t.after() != t.end(-1)) {
        let s = t.before();
        if (pe(r.doc, s))
            return e && e(r.tr.split(s).scrollIntoView()),
            !0
    }
    let n = t.blockRange()
      , i = n && ot(n);
    return i == null ? !1 : (e && e(r.tr.lift(n, i).scrollIntoView()),
    !0)
}
;
function fc(r) {
    return (e, t) => {
        let {$from: n, $to: i} = e.selection;
        if (e.selection instanceof M && e.selection.node.isBlock)
            return !n.parentOffset || !pe(e.doc, n.pos) ? !1 : (t && t(e.tr.split(n.pos).scrollIntoView()),
            !0);
        if (!n.depth)
            return !1;
        let s = [], o, l, a = !1, c = !1;
        for (let h = n.depth; ; h--)
            if (n.node(h).isBlock) {
                a = n.end(h) == n.pos + (n.depth - h),
                c = n.start(h) == n.pos - (n.depth - h),
                l = dr(n.node(h - 1).contentMatchAt(n.indexAfter(h - 1))),
                s.unshift(a && l ? {
                    type: l
                } : null),
                o = h;
                break
            } else {
                if (h == 1)
                    return !1;
                s.unshift(null)
            }
        let d = e.tr;
        (e.selection instanceof T || e.selection instanceof Q) && d.deleteSelection();
        let f = d.mapping.map(n.pos)
          , u = pe(d.doc, f, s.length, s);
        if (u || (s[0] = l ? {
            type: l
        } : null,
        u = pe(d.doc, f, s.length, s)),
        !u)
            return !1;
        if (d.split(f, s.length, s),
        !a && c && n.node(o).type != l) {
            let h = d.mapping.map(n.before(o))
              , p = d.doc.resolve(h);
            l && n.node(o - 1).canReplaceWith(p.index(), p.index() + 1, l) && d.setNodeMarkup(d.mapping.map(n.before(o)), l)
        }
        return t && t(d.scrollIntoView()),
        !0
    }
}
const uc = fc()
  , hc = (r, e) => {
    let {$from: t, to: n} = r.selection, i, s = t.sharedDepth(n);
    return s == 0 ? !1 : (i = t.before(s),
    e && e(r.tr.setSelection(M.create(r.doc, i))),
    !0)
}
;
function pc(r, e, t) {
    let n = e.nodeBefore
      , i = e.nodeAfter
      , s = e.index();
    return !n || !i || !n.type.compatibleContent(i.type) ? !1 : !n.content.size && e.parent.canReplace(s - 1, s) ? (t && t(r.tr.delete(e.pos - n.nodeSize, e.pos).scrollIntoView()),
    !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || De(r.doc, e.pos)) ? !1 : (t && t(r.tr.join(e.pos).scrollIntoView()),
    !0)
}
function Qs(r, e, t, n) {
    let i = e.nodeBefore, s = e.nodeAfter, o, l, a = i.type.spec.isolating || s.type.spec.isolating;
    if (!a && pc(r, e, t))
        return !0;
    let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
    if (c && (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && l.matchType(o[0] || s.type).validEnd) {
        if (t) {
            let h = e.pos + s.nodeSize
              , p = b.empty;
            for (let y = o.length - 1; y >= 0; y--)
                p = b.from(o[y].create(null, p));
            p = b.from(i.copy(p));
            let m = r.tr.step(new L(e.pos - 1,h,e.pos,h,new x(p,1,0),o.length,!0))
              , g = m.doc.resolve(h + 2 * o.length);
            g.nodeAfter && g.nodeAfter.type == i.type && De(m.doc, g.pos) && m.join(g.pos),
            t(m.scrollIntoView())
        }
        return !0
    }
    let d = s.type.spec.isolating || n > 0 && a ? null : E.findFrom(e, 1)
      , f = d && d.$from.blockRange(d.$to)
      , u = f && ot(f);
    if (u != null && u >= e.depth)
        return t && t(r.tr.lift(f, u).scrollIntoView()),
        !0;
    if (c && st(s, "start", !0) && st(i, "end")) {
        let h = i
          , p = [];
        for (; p.push(h),
        !h.isTextblock; )
            h = h.lastChild;
        let m = s
          , g = 1;
        for (; !m.isTextblock; m = m.firstChild)
            g++;
        if (h.canReplace(h.childCount, h.childCount, m.content)) {
            if (t) {
                let y = b.empty;
                for (let O = p.length - 1; O >= 0; O--)
                    y = b.from(p[O].copy(y));
                let C = r.tr.step(new L(e.pos - p.length,e.pos + s.nodeSize,e.pos + g,e.pos + s.nodeSize - g,new x(y,p.length,0),0,!0));
                t(C.scrollIntoView())
            }
            return !0
        }
    }
    return !1
}
function eo(r) {
    return function(e, t) {
        let n = e.selection
          , i = r < 0 ? n.$from : n.$to
          , s = i.depth;
        for (; i.node(s).isInline; ) {
            if (!s)
                return !1;
            s--
        }
        return i.node(s).isTextblock ? (t && t(e.tr.setSelection(T.create(e.doc, r < 0 ? i.start(s) : i.end(s)))),
        !0) : !1
    }
}
const mc = eo(-1)
  , gc = eo(1);
function yc(r, e=null) {
    return function(t, n) {
        let {$from: i, $to: s} = t.selection
          , o = i.blockRange(s)
          , l = o && Yn(o, r, e);
        return l ? (n && n(t.tr.wrap(o, l).scrollIntoView()),
        !0) : !1
    }
}
function bi(r, e=null) {
    return function(t, n) {
        let i = !1;
        for (let s = 0; s < t.selection.ranges.length && !i; s++) {
            let {$from: {pos: o}, $to: {pos: l}} = t.selection.ranges[s];
            t.doc.nodesBetween(o, l, (a, c) => {
                if (i)
                    return !1;
                if (!(!a.isTextblock || a.hasMarkup(r, e)))
                    if (a.type == r)
                        i = !0;
                    else {
                        let d = t.doc.resolve(c)
                          , f = d.index();
                        i = d.parent.canReplaceWith(f, f + 1, r)
                    }
            }
            )
        }
        if (!i)
            return !1;
        if (n) {
            let s = t.tr;
            for (let o = 0; o < t.selection.ranges.length; o++) {
                let {$from: {pos: l}, $to: {pos: a}} = t.selection.ranges[o];
                s.setBlockType(l, a, r, e)
            }
            n(s.scrollIntoView())
        }
        return !0
    }
}
function fr(...r) {
    return function(e, t, n) {
        for (let i = 0; i < r.length; i++)
            if (r[i](e, t, n))
                return !0;
        return !1
    }
}
fr(lr, Js, Ks);
fr(lr, _s, Gs);
fr(Ys, Xs, Zs, uc);
typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os != "undefined" && os.platform && os.platform() == "darwin";
function bc(r, e=null) {
    return function(t, n) {
        let {$from: i, $to: s} = t.selection
          , o = i.blockRange(s);
        if (!o)
            return !1;
        let l = n ? t.tr : null;
        return kc(l, o, r, e) ? (n && n(l.scrollIntoView()),
        !0) : !1
    }
}
function kc(r, e, t, n=null) {
    let i = !1
      , s = e
      , o = e.$from.doc;
    if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
        if (e.$from.index(e.depth - 1) == 0)
            return !1;
        let a = o.resolve(e.start - 2);
        s = new Vt(a,a,e.depth),
        e.endIndex < e.parent.childCount && (e = new Vt(e.$from,o.resolve(e.$to.end(e.depth)),e.depth)),
        i = !0
    }
    let l = Yn(s, t, n, e);
    return l ? (r && xc(r, e, l, i, t),
    !0) : !1
}
function xc(r, e, t, n, i) {
    let s = b.empty;
    for (let d = t.length - 1; d >= 0; d--)
        s = b.from(t[d].type.create(t[d].attrs, s));
    r.step(new L(e.start - (n ? 2 : 0),e.end,e.start,e.end,new x(s,0,0),t.length,!0));
    let o = 0;
    for (let d = 0; d < t.length; d++)
        t[d].type == i && (o = d + 1);
    let l = t.length - o
      , a = e.start + t.length - (n ? 2 : 0)
      , c = e.parent;
    for (let d = e.startIndex, f = e.endIndex, u = !0; d < f; d++,
    u = !1)
        !u && pe(r.doc, a, l) && (r.split(a, l),
        a += 2 * l),
        a += c.child(d).nodeSize;
    return r
}
function Sc(r) {
    return function(e, t) {
        let {$from: n, $to: i} = e.selection
          , s = n.blockRange(i, o => o.childCount > 0 && o.firstChild.type == r);
        return s ? t ? n.node(s.depth - 1).type == r ? Mc(e, t, r, s) : Cc(e, t, s) : !0 : !1
    }
}
function Mc(r, e, t, n) {
    let i = r.tr
      , s = n.end
      , o = n.$to.end(n.depth);
    s < o && (i.step(new L(s - 1,o,s,o,new x(b.from(t.create(null, n.parent.copy())),1,0),1,!0)),
    n = new Vt(i.doc.resolve(n.$from.pos),i.doc.resolve(o),n.depth));
    const l = ot(n);
    if (l == null)
        return !1;
    i.lift(n, l);
    let a = i.doc.resolve(i.mapping.map(s, -1) - 1);
    return De(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos),
    e(i.scrollIntoView()),
    !0
}
function Cc(r, e, t) {
    let n = r.tr
      , i = t.parent;
    for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
        h -= i.child(p).nodeSize,
        n.delete(h - 1, h + 1);
    let s = n.doc.resolve(t.start)
      , o = s.nodeAfter;
    if (n.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
        return !1;
    let l = t.startIndex == 0
      , a = t.endIndex == i.childCount
      , c = s.node(-1)
      , d = s.index(-1);
    if (!c.canReplace(d + (l ? 0 : 1), d + 1, o.content.append(a ? b.empty : b.from(i))))
        return !1;
    let f = s.pos
      , u = f + o.nodeSize;
    return n.step(new L(f - (l ? 1 : 0),u + (a ? 1 : 0),f + 1,u - 1,new x((l ? b.empty : b.from(i.copy(b.empty))).append(a ? b.empty : b.from(i.copy(b.empty))),l ? 0 : 1,a ? 0 : 1),l ? 0 : 1)),
    e(n.scrollIntoView()),
    !0
}
function wc(r) {
    return function(e, t) {
        let {$from: n, $to: i} = e.selection
          , s = n.blockRange(i, c => c.childCount > 0 && c.firstChild.type == r);
        if (!s)
            return !1;
        let o = s.startIndex;
        if (o == 0)
            return !1;
        let l = s.parent
          , a = l.child(o - 1);
        if (a.type != r)
            return !1;
        if (t) {
            let c = a.lastChild && a.lastChild.type == l.type
              , d = b.from(c ? r.create() : null)
              , f = new x(b.from(r.create(null, b.from(l.type.create(null, d)))),c ? 3 : 1,0)
              , u = s.start
              , h = s.end;
            t(e.tr.step(new L(u - (c ? 3 : 1),h,u,h,f,1,!0)).scrollIntoView())
        }
        return !0
    }
}
function sn(r) {
    const {state: e, transaction: t} = r;
    let {selection: n} = t
      , {doc: i} = t
      , {storedMarks: s} = t;
    return B(k({}, e), {
        apply: e.apply.bind(e),
        applyTransaction: e.applyTransaction.bind(e),
        plugins: e.plugins,
        schema: e.schema,
        reconfigure: e.reconfigure.bind(e),
        toJSON: e.toJSON.bind(e),
        get storedMarks() {
            return s
        },
        get selection() {
            return n
        },
        get doc() {
            return i
        },
        get tr() {
            return n = t.selection,
            i = t.doc,
            s = t.storedMarks,
            t
        }
    })
}
class on {
    constructor(e) {
        this.editor = e.editor,
        this.rawCommands = this.editor.extensionManager.commands,
        this.customState = e.state
    }
    get hasCustomState() {
        return !!this.customState
    }
    get state() {
        return this.customState || this.editor.state
    }
    get commands() {
        const {rawCommands: e, editor: t, state: n} = this
          , {view: i} = t
          , {tr: s} = n
          , o = this.buildProps(s);
        return Object.fromEntries(Object.entries(e).map( ([l,a]) => [l, (...d) => {
            const f = a(...d)(o);
            return !s.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(s),
            f
        }
        ]))
    }
    get chain() {
        return () => this.createChain()
    }
    get can() {
        return () => this.createCan()
    }
    createChain(e, t=!0) {
        const {rawCommands: n, editor: i, state: s} = this
          , {view: o} = i
          , l = []
          , a = !!e
          , c = e || s.tr
          , d = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c),
        l.every(u => u === !0))
          , f = B(k({}, Object.fromEntries(Object.entries(n).map( ([u,h]) => [u, (...m) => {
            const g = this.buildProps(c, t)
              , y = h(...m)(g);
            return l.push(y),
            f
        }
        ]))), {
            run: d
        });
        return f
    }
    createCan(e) {
        const {rawCommands: t, state: n} = this
          , i = !1
          , s = e || n.tr
          , o = this.buildProps(s, i)
          , l = Object.fromEntries(Object.entries(t).map( ([a,c]) => [a, (...d) => c(...d)(B(k({}, o), {
            dispatch: void 0
        }))]));
        return B(k({}, l), {
            chain: () => this.createChain(s, i)
        })
    }
    buildProps(e, t=!0) {
        const {rawCommands: n, editor: i, state: s} = this
          , {view: o} = i
          , l = {
            tr: e,
            editor: i,
            view: o,
            state: sn({
                state: s,
                transaction: e
            }),
            dispatch: t ? () => {}
            : void 0,
            chain: () => this.createChain(e, t),
            can: () => this.createCan(e),
            get commands() {
                return Object.fromEntries(Object.entries(n).map( ([a,c]) => [a, (...d) => c(...d)(l)]))
            }
        };
        return l
    }
}
class Oc {
    constructor() {
        this.callbacks = {}
    }
    on(e, t) {
        return this.callbacks[e] || (this.callbacks[e] = []),
        this.callbacks[e].push(t),
        this
    }
    emit(e, ...t) {
        const n = this.callbacks[e];
        return n && n.forEach(i => i.apply(this, t)),
        this
    }
    off(e, t) {
        const n = this.callbacks[e];
        return n && (t ? this.callbacks[e] = n.filter(i => i !== t) : delete this.callbacks[e]),
        this
    }
    once(e, t) {
        const n = (...i) => {
            this.off(e, n),
            t.apply(this, i)
        }
        ;
        return this.on(e, n)
    }
    removeAllListeners() {
        this.callbacks = {}
    }
}
function S(r, e, t) {
    return r.config[e] === void 0 && r.parent ? S(r.parent, e, t) : typeof r.config[e] == "function" ? r.config[e].bind(B(k({}, t), {
        parent: r.parent ? S(r.parent, e, t) : null
    })) : r.config[e]
}
function ln(r) {
    const e = r.filter(i => i.type === "extension")
      , t = r.filter(i => i.type === "node")
      , n = r.filter(i => i.type === "mark");
    return {
        baseExtensions: e,
        nodeExtensions: t,
        markExtensions: n
    }
}
function to(r) {
    const e = []
      , {nodeExtensions: t, markExtensions: n} = ln(r)
      , i = [...t, ...n]
      , s = {
        default: null,
        rendered: !0,
        renderHTML: null,
        parseHTML: null,
        keepOnSplit: !0,
        isRequired: !1
    };
    return r.forEach(o => {
        const l = {
            name: o.name,
            options: o.options,
            storage: o.storage,
            extensions: i
        }
          , a = S(o, "addGlobalAttributes", l);
        if (!a)
            return;
        a().forEach(d => {
            d.types.forEach(f => {
                Object.entries(d.attributes).forEach( ([u,h]) => {
                    e.push({
                        type: f,
                        name: u,
                        attribute: k(k({}, s), h)
                    })
                }
                )
            }
            )
        }
        )
    }
    ),
    i.forEach(o => {
        const l = {
            name: o.name,
            options: o.options,
            storage: o.storage
        }
          , a = S(o, "addAttributes", l);
        if (!a)
            return;
        const c = a();
        Object.entries(c).forEach( ([d,f]) => {
            const u = k(k({}, s), f);
            typeof (u == null ? void 0 : u.default) == "function" && (u.default = u.default()),
            u != null && u.isRequired && (u == null ? void 0 : u.default) === void 0 && delete u.default,
            e.push({
                type: o.name,
                name: d,
                attribute: u
            })
        }
        )
    }
    ),
    e
}
function V(r, e) {
    if (typeof r == "string") {
        if (!e.nodes[r])
            throw Error(`There is no node type named '${r}'. Maybe you forgot to add the extension?`);
        return e.nodes[r]
    }
    return r
}
function Ie(...r) {
    return r.filter(e => !!e).reduce( (e, t) => {
        const n = k({}, e);
        return Object.entries(t).forEach( ([i,s]) => {
            if (!n[i]) {
                n[i] = s;
                return
            }
            if (i === "class") {
                const l = s ? String(s).split(" ") : []
                  , a = n[i] ? n[i].split(" ") : []
                  , c = l.filter(d => !a.includes(d));
                n[i] = [...a, ...c].join(" ")
            } else if (i === "style") {
                const l = s ? s.split(";").map(d => d.trim()).filter(Boolean) : []
                  , a = n[i] ? n[i].split(";").map(d => d.trim()).filter(Boolean) : []
                  , c = new Map;
                a.forEach(d => {
                    const [f,u] = d.split(":").map(h => h.trim());
                    c.set(f, u)
                }
                ),
                l.forEach(d => {
                    const [f,u] = d.split(":").map(h => h.trim());
                    c.set(f, u)
                }
                ),
                n[i] = Array.from(c.entries()).map( ([d,f]) => `${d}: ${f}`).join("; ")
            } else
                n[i] = s
        }
        ),
        n
    }
    , {})
}
function qn(r, e) {
    return e.filter(t => t.type === r.type.name).filter(t => t.attribute.rendered).map(t => t.attribute.renderHTML ? t.attribute.renderHTML(r.attrs) || {} : {
        [t.name]: r.attrs[t.name]
    }).reduce( (t, n) => Ie(t, n), {})
}
function no(r) {
    return typeof r == "function"
}
function N(r, e=void 0, ...t) {
    return no(r) ? e ? r.bind(e)(...t) : r(...t) : r
}
function Tc(r={}) {
    return Object.keys(r).length === 0 && r.constructor === Object
}
function Nc(r) {
    return typeof r != "string" ? r : r.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(r) : r === "true" ? !0 : r === "false" ? !1 : r
}
function ki(r, e) {
    return "style"in r ? r : B(k({}, r), {
        getAttrs: t => {
            const n = r.getAttrs ? r.getAttrs(t) : r.attrs;
            if (n === !1)
                return !1;
            const i = e.reduce( (s, o) => {
                const l = o.attribute.parseHTML ? o.attribute.parseHTML(t) : Nc(t.getAttribute(o.name));
                return l == null ? s : B(k({}, s), {
                    [o.name]: l
                })
            }
            , {});
            return k(k({}, n), i)
        }
    })
}
function xi(r) {
    return Object.fromEntries(Object.entries(r).filter( ([e,t]) => e === "attrs" && Tc(t) ? !1 : t != null))
}
function Ec(r, e) {
    var t;
    const n = to(r)
      , {nodeExtensions: i, markExtensions: s} = ln(r)
      , o = (t = i.find(c => S(c, "topNode"))) === null || t === void 0 ? void 0 : t.name
      , l = Object.fromEntries(i.map(c => {
        const d = n.filter(y => y.type === c.name)
          , f = {
            name: c.name,
            options: c.options,
            storage: c.storage,
            editor: e
        }
          , u = r.reduce( (y, C) => {
            const O = S(C, "extendNodeSchema", f);
            return k(k({}, y), O ? O(c) : {})
        }
        , {})
          , h = xi(B(k({}, u), {
            content: N(S(c, "content", f)),
            marks: N(S(c, "marks", f)),
            group: N(S(c, "group", f)),
            inline: N(S(c, "inline", f)),
            atom: N(S(c, "atom", f)),
            selectable: N(S(c, "selectable", f)),
            draggable: N(S(c, "draggable", f)),
            code: N(S(c, "code", f)),
            whitespace: N(S(c, "whitespace", f)),
            linebreakReplacement: N(S(c, "linebreakReplacement", f)),
            defining: N(S(c, "defining", f)),
            isolating: N(S(c, "isolating", f)),
            attrs: Object.fromEntries(d.map(y => {
                var C;
                return [y.name, {
                    default: (C = y == null ? void 0 : y.attribute) === null || C === void 0 ? void 0 : C.default
                }]
            }
            ))
        }))
          , p = N(S(c, "parseHTML", f));
        p && (h.parseDOM = p.map(y => ki(y, d)));
        const m = S(c, "renderHTML", f);
        m && (h.toDOM = y => m({
            node: y,
            HTMLAttributes: qn(y, d)
        }));
        const g = S(c, "renderText", f);
        return g && (h.toText = g),
        [c.name, h]
    }
    ))
      , a = Object.fromEntries(s.map(c => {
        const d = n.filter(g => g.type === c.name)
          , f = {
            name: c.name,
            options: c.options,
            storage: c.storage,
            editor: e
        }
          , u = r.reduce( (g, y) => {
            const C = S(y, "extendMarkSchema", f);
            return k(k({}, g), C ? C(c) : {})
        }
        , {})
          , h = xi(B(k({}, u), {
            inclusive: N(S(c, "inclusive", f)),
            excludes: N(S(c, "excludes", f)),
            group: N(S(c, "group", f)),
            spanning: N(S(c, "spanning", f)),
            code: N(S(c, "code", f)),
            attrs: Object.fromEntries(d.map(g => {
                var y;
                return [g.name, {
                    default: (y = g == null ? void 0 : g.attribute) === null || y === void 0 ? void 0 : y.default
                }]
            }
            ))
        }))
          , p = N(S(c, "parseHTML", f));
        p && (h.parseDOM = p.map(g => ki(g, d)));
        const m = S(c, "renderHTML", f);
        return m && (h.toDOM = g => m({
            mark: g,
            HTMLAttributes: qn(g, d)
        })),
        [c.name, h]
    }
    ));
    return new Ji({
        topNode: o,
        nodes: l,
        marks: a
    })
}
function Tn(r, e) {
    return e.nodes[r] || e.marks[r] || null
}
function Si(r, e) {
    return Array.isArray(e) ? e.some(t => (typeof t == "string" ? t : t.name) === r.name) : e
}
function ur(r, e) {
    const t = Ke.fromSchema(e).serializeFragment(r)
      , i = document.implementation.createHTMLDocument().createElement("div");
    return i.appendChild(t),
    i.innerHTML
}
const Dc = (r, e=500) => {
    let t = "";
    const n = r.parentOffset;
    return r.parent.nodesBetween(Math.max(0, n - e), n, (i, s, o, l) => {
        var a, c;
        const d = ((c = (a = i.type.spec).toText) === null || c === void 0 ? void 0 : c.call(a, {
            node: i,
            pos: s,
            parent: o,
            index: l
        })) || i.textContent || "%leaf%";
        t += i.isAtom && !i.isText ? d : d.slice(0, Math.max(0, n - s))
    }
    ),
    t
}
;
function hr(r) {
    return Object.prototype.toString.call(r) === "[object RegExp]"
}
class pr {
    constructor(e) {
        this.find = e.find,
        this.handler = e.handler
    }
}
const Ac = (r, e) => {
    if (hr(e))
        return e.exec(r);
    const t = e(r);
    if (!t)
        return null;
    const n = [t.text];
    return n.index = t.index,
    n.input = r,
    n.data = t.data,
    t.replaceWith && (t.text.includes(t.replaceWith),
    n.push(t.replaceWith)),
    n
}
;
function Dt(r) {
    var e;
    const {editor: t, from: n, to: i, text: s, rules: o, plugin: l} = r
      , {view: a} = t;
    if (a.composing)
        return !1;
    const c = a.state.doc.resolve(n);
    if (c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find(u => u.type.spec.code))
        return !1;
    let d = !1;
    const f = Dc(c) + s;
    return o.forEach(u => {
        if (d)
            return;
        const h = Ac(f, u.find);
        if (!h)
            return;
        const p = a.state.tr
          , m = sn({
            state: a.state,
            transaction: p
        })
          , g = {
            from: n - (h[0].length - s.length),
            to: i
        }
          , {commands: y, chain: C, can: O} = new on({
            editor: t,
            state: m
        });
        u.handler({
            state: m,
            range: g,
            match: h,
            commands: y,
            chain: C,
            can: O
        }) === null || !p.steps.length || (p.setMeta(l, {
            transform: p,
            from: n,
            to: i,
            text: s
        }),
        a.dispatch(p),
        d = !0)
    }
    ),
    d
}
function Ic(r) {
    const {editor: e, rules: t} = r
      , n = new ce({
        state: {
            init() {
                return null
            },
            apply(i, s, o) {
                const l = i.getMeta(n);
                if (l)
                    return l;
                const a = i.getMeta("applyInputRules");
                return !!a && setTimeout( () => {
                    let {text: d} = a;
                    typeof d == "string" ? d = d : d = ur(b.from(d), o.schema);
                    const {from: f} = a
                      , u = f + d.length;
                    Dt({
                        editor: e,
                        from: f,
                        to: u,
                        text: d,
                        rules: t,
                        plugin: n
                    })
                }
                ),
                i.selectionSet || i.docChanged ? null : s
            }
        },
        props: {
            handleTextInput(i, s, o, l) {
                return Dt({
                    editor: e,
                    from: s,
                    to: o,
                    text: l,
                    rules: t,
                    plugin: n
                })
            },
            handleDOMEvents: {
                compositionend: i => (setTimeout( () => {
                    const {$cursor: s} = i.state.selection;
                    s && Dt({
                        editor: e,
                        from: s.pos,
                        to: s.pos,
                        text: "",
                        rules: t,
                        plugin: n
                    })
                }
                ),
                !1)
            },
            handleKeyDown(i, s) {
                if (s.key !== "Enter")
                    return !1;
                const {$cursor: o} = i.state.selection;
                return o ? Dt({
                    editor: e,
                    from: o.pos,
                    to: o.pos,
                    text: `
`,
                    rules: t,
                    plugin: n
                }) : !1
            }
        },
        isInputRules: !0
    });
    return n
}
function vc(r) {
    return Object.prototype.toString.call(r).slice(8, -1)
}
function At(r) {
    return vc(r) !== "Object" ? !1 : r.constructor === Object && Object.getPrototypeOf(r) === Object.prototype
}
function an(r, e) {
    const t = k({}, r);
    return At(r) && At(e) && Object.keys(e).forEach(n => {
        At(e[n]) && At(r[n]) ? t[n] = an(r[n], e[n]) : t[n] = e[n]
    }
    ),
    t
}
class qe {
    constructor(e={}) {
        this.type = "mark",
        this.name = "mark",
        this.parent = null,
        this.child = null,
        this.config = {
            name: this.name,
            defaultOptions: {}
        },
        this.config = k(k({}, this.config), e),
        this.name = this.config.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        this.options = this.config.defaultOptions,
        this.config.addOptions && (this.options = N(S(this, "addOptions", {
            name: this.name
        }))),
        this.storage = N(S(this, "addStorage", {
            name: this.name,
            options: this.options
        })) || {}
    }
    static create(e={}) {
        return new qe(e)
    }
    configure(e={}) {
        const t = this.extend(B(k({}, this.config), {
            addOptions: () => an(this.options, e)
        }));
        return t.name = this.name,
        t.parent = this.parent,
        t
    }
    extend(e={}) {
        const t = new qe(e);
        return t.parent = this,
        this.child = t,
        t.name = e.name ? e.name : t.parent.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        t.options = N(S(t, "addOptions", {
            name: t.name
        })),
        t.storage = N(S(t, "addStorage", {
            name: t.name,
            options: t.options
        })),
        t
    }
    static handleExit({editor: e, mark: t}) {
        const {tr: n} = e.state
          , i = e.state.selection.$from;
        if (i.pos === i.end()) {
            const o = i.marks();
            if (!!!o.find(c => (c == null ? void 0 : c.type.name) === t.name))
                return !1;
            const a = o.find(c => (c == null ? void 0 : c.type.name) === t.name);
            return a && n.removeStoredMark(a),
            n.insertText(" ", i.pos),
            e.view.dispatch(n),
            !0
        }
        return !1
    }
}
function Rc(r) {
    return typeof r == "number"
}
class Pc {
    constructor(e) {
        this.find = e.find,
        this.handler = e.handler
    }
}
const Bc = (r, e, t) => {
    if (hr(e))
        return [...r.matchAll(e)];
    const n = e(r, t);
    return n ? n.map(i => {
        const s = [i.text];
        return s.index = i.index,
        s.input = r,
        s.data = i.data,
        i.replaceWith && (i.text.includes(i.replaceWith),
        s.push(i.replaceWith)),
        s
    }
    ) : []
}
;
function zc(r) {
    const {editor: e, state: t, from: n, to: i, rule: s, pasteEvent: o, dropEvent: l} = r
      , {commands: a, chain: c, can: d} = new on({
        editor: e,
        state: t
    })
      , f = [];
    return t.doc.nodesBetween(n, i, (h, p) => {
        if (!h.isTextblock || h.type.spec.code)
            return;
        const m = Math.max(n, p)
          , g = Math.min(i, p + h.content.size)
          , y = h.textBetween(m - p, g - p, void 0, " ");
        Bc(y, s.find, o).forEach(O => {
            if (O.index === void 0)
                return;
            const A = m + O.index + 1
              , D = A + O[0].length
              , P = {
                from: t.tr.mapping.map(A),
                to: t.tr.mapping.map(D)
            }
              , K = s.handler({
                state: t,
                range: P,
                match: O,
                commands: a,
                chain: c,
                can: d,
                pasteEvent: o,
                dropEvent: l
            });
            f.push(K)
        }
        )
    }
    ),
    f.every(h => h !== null)
}
let It = null;
const Fc = r => {
    var e;
    const t = new ClipboardEvent("paste",{
        clipboardData: new DataTransfer
    });
    return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", r),
    t
}
;
function Lc(r) {
    const {editor: e, rules: t} = r;
    let n = null, i = !1, s = !1, o = typeof ClipboardEvent != "undefined" ? new ClipboardEvent("paste") : null, l;
    try {
        l = typeof DragEvent != "undefined" ? new DragEvent("drop") : null
    } catch (d) {
        l = null
    }
    const a = ({state: d, from: f, to: u, rule: h, pasteEvt: p}) => {
        const m = d.tr
          , g = sn({
            state: d,
            transaction: m
        });
        if (!(!zc({
            editor: e,
            state: g,
            from: Math.max(f - 1, 0),
            to: u.b - 1,
            rule: h,
            pasteEvent: p,
            dropEvent: l
        }) || !m.steps.length)) {
            try {
                l = typeof DragEvent != "undefined" ? new DragEvent("drop") : null
            } catch (C) {
                l = null
            }
            return o = typeof ClipboardEvent != "undefined" ? new ClipboardEvent("paste") : null,
            m
        }
    }
    ;
    return t.map(d => new ce({
        view(f) {
            const u = p => {
                var m;
                n = !((m = f.dom.parentElement) === null || m === void 0) && m.contains(p.target) ? f.dom.parentElement : null,
                n && (It = e)
            }
              , h = () => {
                It && (It = null)
            }
            ;
            return window.addEventListener("dragstart", u),
            window.addEventListener("dragend", h),
            {
                destroy() {
                    window.removeEventListener("dragstart", u),
                    window.removeEventListener("dragend", h)
                }
            }
        },
        props: {
            handleDOMEvents: {
                drop: (f, u) => {
                    if (s = n === f.dom.parentElement,
                    l = u,
                    !s) {
                        const h = It;
                        h != null && h.isEditable && setTimeout( () => {
                            const p = h.state.selection;
                            p && h.commands.deleteRange({
                                from: p.from,
                                to: p.to
                            })
                        }
                        , 10)
                    }
                    return !1
                }
                ,
                paste: (f, u) => {
                    var h;
                    const p = (h = u.clipboardData) === null || h === void 0 ? void 0 : h.getData("text/html");
                    return o = u,
                    i = !!(p != null && p.includes("data-pm-slice")),
                    !1
                }
            }
        },
        appendTransaction: (f, u, h) => {
            const p = f[0]
              , m = p.getMeta("uiEvent") === "paste" && !i
              , g = p.getMeta("uiEvent") === "drop" && !s
              , y = p.getMeta("applyPasteRules")
              , C = !!y;
            if (!m && !g && !C)
                return;
            if (C) {
                let {text: D} = y;
                typeof D == "string" ? D = D : D = ur(b.from(D), h.schema);
                const {from: P} = y
                  , K = P + D.length
                  , w = Fc(D);
                return a({
                    rule: d,
                    state: h,
                    from: P,
                    to: {
                        b: K
                    },
                    pasteEvt: w
                })
            }
            const O = u.doc.content.findDiffStart(h.doc.content)
              , A = u.doc.content.findDiffEnd(h.doc.content);
            if (!(!Rc(O) || !A || O === A.b))
                return a({
                    rule: d,
                    state: h,
                    from: O,
                    to: A,
                    pasteEvt: o
                })
        }
    }))
}
function Vc(r) {
    const e = r.filter( (t, n) => r.indexOf(t) !== n);
    return Array.from(new Set(e))
}
class Qe {
    constructor(e, t) {
        this.splittableMarks = [],
        this.editor = t,
        this.extensions = Qe.resolve(e),
        this.schema = Ec(this.extensions, t),
        this.setupExtensions()
    }
    static resolve(e) {
        const t = Qe.sort(Qe.flatten(e));
        return Vc(t.map(i => i.name)).length,
        t
    }
    static flatten(e) {
        return e.map(t => {
            const n = {
                name: t.name,
                options: t.options,
                storage: t.storage
            }
              , i = S(t, "addExtensions", n);
            return i ? [t, ...this.flatten(i())] : t
        }
        ).flat(10)
    }
    static sort(e) {
        return e.sort( (n, i) => {
            const s = S(n, "priority") || 100
              , o = S(i, "priority") || 100;
            return s > o ? -1 : s < o ? 1 : 0
        }
        )
    }
    get commands() {
        return this.extensions.reduce( (e, t) => {
            const n = {
                name: t.name,
                options: t.options,
                storage: t.storage,
                editor: this.editor,
                type: Tn(t.name, this.schema)
            }
              , i = S(t, "addCommands", n);
            return i ? k(k({}, e), i()) : e
        }
        , {})
    }
    get plugins() {
        const {editor: e} = this
          , t = Qe.sort([...this.extensions].reverse())
          , n = []
          , i = []
          , s = t.map(o => {
            const l = {
                name: o.name,
                options: o.options,
                storage: o.storage,
                editor: e,
                type: Tn(o.name, this.schema)
            }
              , a = []
              , c = S(o, "addKeyboardShortcuts", l);
            let d = {};
            if (o.type === "mark" && S(o, "exitable", l) && (d.ArrowRight = () => qe.handleExit({
                editor: e,
                mark: o
            })),
            c) {
                const m = Object.fromEntries(Object.entries(c()).map( ([g,y]) => [g, () => y({
                    editor: e
                })]));
                d = k(k({}, d), m)
            }
            const f = rc(d);
            a.push(f);
            const u = S(o, "addInputRules", l);
            Si(o, e.options.enableInputRules) && u && n.push(...u());
            const h = S(o, "addPasteRules", l);
            Si(o, e.options.enablePasteRules) && h && i.push(...h());
            const p = S(o, "addProseMirrorPlugins", l);
            if (p) {
                const m = p();
                a.push(...m)
            }
            return a
        }
        ).flat();
        return [Ic({
            editor: e,
            rules: n
        }), ...Lc({
            editor: e,
            rules: i
        }), ...s]
    }
    get attributes() {
        return to(this.extensions)
    }
    get nodeViews() {
        const {editor: e} = this
          , {nodeExtensions: t} = ln(this.extensions);
        return Object.fromEntries(t.filter(n => !!S(n, "addNodeView")).map(n => {
            const i = this.attributes.filter(a => a.type === n.name)
              , s = {
                name: n.name,
                options: n.options,
                storage: n.storage,
                editor: e,
                type: V(n.name, this.schema)
            }
              , o = S(n, "addNodeView", s);
            if (!o)
                return [];
            const l = (a, c, d, f, u) => {
                const h = qn(a, i);
                return o()({
                    node: a,
                    view: c,
                    getPos: d,
                    decorations: f,
                    innerDecorations: u,
                    editor: e,
                    extension: n,
                    HTMLAttributes: h
                })
            }
            ;
            return [n.name, l]
        }
        ))
    }
    setupExtensions() {
        this.extensions.forEach(e => {
            var t;
            this.editor.extensionStorage[e.name] = e.storage;
            const n = {
                name: e.name,
                options: e.options,
                storage: e.storage,
                editor: this.editor,
                type: Tn(e.name, this.schema)
            };
            e.type === "mark" && (!((t = N(S(e, "keepOnSplit", n))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
            const i = S(e, "onBeforeCreate", n)
              , s = S(e, "onCreate", n)
              , o = S(e, "onUpdate", n)
              , l = S(e, "onSelectionUpdate", n)
              , a = S(e, "onTransaction", n)
              , c = S(e, "onFocus", n)
              , d = S(e, "onBlur", n)
              , f = S(e, "onDestroy", n);
            i && this.editor.on("beforeCreate", i),
            s && this.editor.on("create", s),
            o && this.editor.on("update", o),
            l && this.editor.on("selectionUpdate", l),
            a && this.editor.on("transaction", a),
            c && this.editor.on("focus", c),
            d && this.editor.on("blur", d),
            f && this.editor.on("destroy", f)
        }
        )
    }
}
class se {
    constructor(e={}) {
        this.type = "extension",
        this.name = "extension",
        this.parent = null,
        this.child = null,
        this.config = {
            name: this.name,
            defaultOptions: {}
        },
        this.config = k(k({}, this.config), e),
        this.name = this.config.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        this.options = this.config.defaultOptions,
        this.config.addOptions && (this.options = N(S(this, "addOptions", {
            name: this.name
        }))),
        this.storage = N(S(this, "addStorage", {
            name: this.name,
            options: this.options
        })) || {}
    }
    static create(e={}) {
        return new se(e)
    }
    configure(e={}) {
        const t = this.extend(B(k({}, this.config), {
            addOptions: () => an(this.options, e)
        }));
        return t.name = this.name,
        t.parent = this.parent,
        t
    }
    extend(e={}) {
        const t = new se(k(k({}, this.config), e));
        return t.parent = this,
        this.child = t,
        t.name = e.name ? e.name : t.parent.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        t.options = N(S(t, "addOptions", {
            name: t.name
        })),
        t.storage = N(S(t, "addStorage", {
            name: t.name,
            options: t.options
        })),
        t
    }
}
function ro(r, e, t) {
    const {from: n, to: i} = e
      , {blockSeparator: s=`

`, textSerializers: o={}} = t || {};
    let l = "";
    return r.nodesBetween(n, i, (a, c, d, f) => {
        var u;
        a.isBlock && c > n && (l += s);
        const h = o == null ? void 0 : o[a.type.name];
        if (h)
            return d && (l += h({
                node: a,
                pos: c,
                parent: d,
                index: f,
                range: e
            })),
            !1;
        a.isText && (l += (u = a == null ? void 0 : a.text) === null || u === void 0 ? void 0 : u.slice(Math.max(n, c) - c, i - c))
    }
    ),
    l
}
function io(r) {
    return Object.fromEntries(Object.entries(r.nodes).filter( ([,e]) => e.spec.toText).map( ([e,t]) => [e, t.spec.toText]))
}
const $c = se.create({
    name: "clipboardTextSerializer",
    addOptions() {
        return {
            blockSeparator: void 0
        }
    },
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("clipboardTextSerializer"),
            props: {
                clipboardTextSerializer: () => {
                    const {editor: r} = this
                      , {state: e, schema: t} = r
                      , {doc: n, selection: i} = e
                      , {ranges: s} = i
                      , o = Math.min(...s.map(d => d.$from.pos))
                      , l = Math.max(...s.map(d => d.$to.pos))
                      , a = io(t);
                    return ro(n, {
                        from: o,
                        to: l
                    }, B(k({}, this.options.blockSeparator !== void 0 ? {
                        blockSeparator: this.options.blockSeparator
                    } : {}), {
                        textSerializers: a
                    }))
                }
            }
        })]
    }
})
  , Wc = () => ({editor: r, view: e}) => (requestAnimationFrame( () => {
    var t;
    r.isDestroyed || (e.dom.blur(),
    (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges())
}
),
!0)
  , Hc = (r=!1) => ({commands: e}) => e.setContent("", r)
  , jc = () => ({state: r, tr: e, dispatch: t}) => {
    const {selection: n} = e
      , {ranges: i} = n;
    return t && i.forEach( ({$from: s, $to: o}) => {
        r.doc.nodesBetween(s.pos, o.pos, (l, a) => {
            if (l.type.isText)
                return;
            const {doc: c, mapping: d} = e
              , f = c.resolve(d.map(a))
              , u = c.resolve(d.map(a + l.nodeSize))
              , h = f.blockRange(u);
            if (!h)
                return;
            const p = ot(h);
            if (l.type.isTextblock) {
                const {defaultType: m} = f.parent.contentMatchAt(f.index());
                e.setNodeMarkup(h.start, m)
            }
            (p || p === 0) && e.lift(h, p)
        }
        )
    }
    ),
    !0
}
  , Jc = r => e => r(e)
  , qc = () => ({state: r, dispatch: e}) => Xs(r, e)
  , Kc = (r, e) => ({editor: t, tr: n}) => {
    const {state: i} = t
      , s = i.doc.slice(r.from, r.to);
    n.deleteRange(r.from, r.to);
    const o = n.mapping.map(e);
    return n.insert(o, s.content),
    n.setSelection(new T(n.doc.resolve(Math.max(o - 1, 0)))),
    !0
}
  , Uc = () => ({tr: r, dispatch: e}) => {
    const {selection: t} = r
      , n = t.$anchor.node();
    if (n.content.size > 0)
        return !1;
    const i = r.selection.$anchor;
    for (let s = i.depth; s > 0; s -= 1)
        if (i.node(s).type === n.type) {
            if (e) {
                const l = i.before(s)
                  , a = i.after(s);
                r.delete(l, a).scrollIntoView()
            }
            return !0
        }
    return !1
}
  , _c = r => ({tr: e, state: t, dispatch: n}) => {
    const i = V(r, t.schema)
      , s = e.selection.$anchor;
    for (let o = s.depth; o > 0; o -= 1)
        if (s.node(o).type === i) {
            if (n) {
                const a = s.before(o)
                  , c = s.after(o);
                e.delete(a, c).scrollIntoView()
            }
            return !0
        }
    return !1
}
  , Gc = r => ({tr: e, dispatch: t}) => {
    const {from: n, to: i} = r;
    return t && e.delete(n, i),
    !0
}
  , Yc = () => ({state: r, dispatch: e}) => lr(r, e)
  , Xc = () => ({commands: r}) => r.keyboardShortcut("Enter")
  , Zc = () => ({state: r, dispatch: e}) => dc(r, e);
function _t(r, e, t={
    strict: !0
}) {
    const n = Object.keys(e);
    return n.length ? n.every(i => t.strict ? e[i] === r[i] : hr(e[i]) ? e[i].test(r[i]) : e[i] === r[i]) : !0
}
function so(r, e, t={}) {
    return r.find(n => n.type === e && _t(Object.fromEntries(Object.keys(t).map(i => [i, n.attrs[i]])), t))
}
function Mi(r, e, t={}) {
    return !!so(r, e, t)
}
function mr(r, e, t) {
    var n;
    if (!r || !e)
        return;
    let i = r.parent.childAfter(r.parentOffset);
    if ((!i.node || !i.node.marks.some(d => d.type === e)) && (i = r.parent.childBefore(r.parentOffset)),
    !i.node || !i.node.marks.some(d => d.type === e) || (t = t || ((n = i.node.marks[0]) === null || n === void 0 ? void 0 : n.attrs),
    !so([...i.node.marks], e, t)))
        return;
    let o = i.index
      , l = r.start() + i.offset
      , a = o + 1
      , c = l + i.node.nodeSize;
    for (; o > 0 && Mi([...r.parent.child(o - 1).marks], e, t); )
        o -= 1,
        l -= r.parent.child(o).nodeSize;
    for (; a < r.parent.childCount && Mi([...r.parent.child(a).marks], e, t); )
        c += r.parent.child(a).nodeSize,
        a += 1;
    return {
        from: l,
        to: c
    }
}
function ve(r, e) {
    if (typeof r == "string") {
        if (!e.marks[r])
            throw Error(`There is no mark type named '${r}'. Maybe you forgot to add the extension?`);
        return e.marks[r]
    }
    return r
}
const Qc = (r, e={}) => ({tr: t, state: n, dispatch: i}) => {
    const s = ve(r, n.schema)
      , {doc: o, selection: l} = t
      , {$from: a, from: c, to: d} = l;
    if (i) {
        const f = mr(a, s, e);
        if (f && f.from <= c && f.to >= d) {
            const u = T.create(o, f.from, f.to);
            t.setSelection(u)
        }
    }
    return !0
}
  , ed = r => e => {
    const t = typeof r == "function" ? r(e) : r;
    for (let n = 0; n < t.length; n += 1)
        if (t[n](e))
            return !0;
    return !1
}
;
function oo(r) {
    return r instanceof T
}
function he(r=0, e=0, t=0) {
    return Math.min(Math.max(r, e), t)
}
function lo(r, e=null) {
    if (!e)
        return null;
    const t = E.atStart(r)
      , n = E.atEnd(r);
    if (e === "start" || e === !0)
        return t;
    if (e === "end")
        return n;
    const i = t.from
      , s = n.to;
    return e === "all" ? T.create(r, he(0, i, s), he(r.content.size, i, s)) : T.create(r, he(e, i, s), he(e, i, s))
}
function ao() {
    return navigator.platform === "Android" || /android/i.test(navigator.userAgent)
}
function cn() {
    return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend"in document
}
const td = (r=null, e={}) => ({editor: t, view: n, tr: i, dispatch: s}) => {
    e = k({
        scrollIntoView: !0
    }, e);
    const o = () => {
        (cn() || ao()) && n.dom.focus(),
        requestAnimationFrame( () => {
            t.isDestroyed || (n.focus(),
            e != null && e.scrollIntoView && t.commands.scrollIntoView())
        }
        )
    }
    ;
    if (n.hasFocus() && r === null || r === !1)
        return !0;
    if (s && r === null && !oo(t.state.selection))
        return o(),
        !0;
    const l = lo(i.doc, r) || t.state.selection
      , a = t.state.selection.eq(l);
    return s && (a || i.setSelection(l),
    a && i.storedMarks && i.setStoredMarks(i.storedMarks),
    o()),
    !0
}
  , nd = (r, e) => t => r.every( (n, i) => e(n, B(k({}, t), {
    index: i
})))
  , rd = (r, e) => ({tr: t, commands: n}) => n.insertContentAt({
    from: t.selection.from,
    to: t.selection.to
}, r, e)
  , co = r => {
    const e = r.childNodes;
    for (let t = e.length - 1; t >= 0; t -= 1) {
        const n = e[t];
        n.nodeType === 3 && n.nodeValue && /^(\n\s\s|\n)$/.test(n.nodeValue) ? r.removeChild(n) : n.nodeType === 1 && co(n)
    }
    return r
}
;
function vt(r) {
    const e = `<body>${r}</body>`
      , t = new window.DOMParser().parseFromString(e, "text/html").body;
    return co(t)
}
function St(r, e, t) {
    if (r instanceof Ce || r instanceof b)
        return r;
    t = k({
        slice: !0,
        parseOptions: {}
    }, t);
    const n = typeof r == "object" && r !== null
      , i = typeof r == "string";
    if (n)
        try {
            if (Array.isArray(r) && r.length > 0)
                return b.fromArray(r.map(l => e.nodeFromJSON(l)));
            const o = e.nodeFromJSON(r);
            return t.errorOnInvalidContent && o.check(),
            o
        } catch (s) {
            if (t.errorOnInvalidContent)
                throw new Error("[tiptap error]: Invalid JSON content",{
                    cause: s
                });
            return St("", e, t)
        }
    if (i) {
        if (t.errorOnInvalidContent) {
            let o = !1
              , l = "";
            const a = new Ji({
                topNode: e.spec.topNode,
                marks: e.spec.marks,
                nodes: e.spec.nodes.append({
                    __tiptap__private__unknown__catch__all__node: {
                        content: "inline*",
                        group: "block",
                        parseDOM: [{
                            tag: "*",
                            getAttrs: c => (o = !0,
                            l = typeof c == "string" ? c : c.outerHTML,
                            null)
                        }]
                    }
                })
            });
            if (t.slice ? we.fromSchema(a).parseSlice(vt(r), t.parseOptions) : we.fromSchema(a).parse(vt(r), t.parseOptions),
            t.errorOnInvalidContent && o)
                throw new Error("[tiptap error]: Invalid HTML content",{
                    cause: new Error(`Invalid element found: ${l}`)
                })
        }
        const s = we.fromSchema(e);
        return t.slice ? s.parseSlice(vt(r), t.parseOptions).content : s.parse(vt(r), t.parseOptions)
    }
    return St("", e, t)
}
function id(r, e, t) {
    const n = r.steps.length - 1;
    if (n < e)
        return;
    const i = r.steps[n];
    if (!(i instanceof F || i instanceof L))
        return;
    const s = r.mapping.maps[n];
    let o = 0;
    s.forEach( (l, a, c, d) => {
        o === 0 && (o = d)
    }
    ),
    r.setSelection(E.near(r.doc.resolve(o), t))
}
const sd = r => !("type"in r)
  , od = (r, e, t) => ({tr: n, dispatch: i, editor: s}) => {
    var o;
    if (i) {
        t = k({
            parseOptions: s.options.parseOptions,
            updateSelection: !0,
            applyInputRules: !1,
            applyPasteRules: !1
        }, t);
        let l;
        const a = g => {
            s.emit("contentError", {
                editor: s,
                error: g,
                disableCollaboration: () => {
                    s.storage.collaboration && (s.storage.collaboration.isDisabled = !0)
                }
            })
        }
          , c = k({
            preserveWhitespace: "full"
        }, t.parseOptions);
        if (!t.errorOnInvalidContent && !s.options.enableContentCheck && s.options.emitContentError)
            try {
                St(e, s.schema, {
                    parseOptions: c,
                    errorOnInvalidContent: !0
                })
            } catch (g) {
                a(g)
            }
        try {
            l = St(e, s.schema, {
                parseOptions: c,
                errorOnInvalidContent: (o = t.errorOnInvalidContent) !== null && o !== void 0 ? o : s.options.enableContentCheck
            })
        } catch (g) {
            return a(g),
            !1
        }
        let {from: d, to: f} = typeof r == "number" ? {
            from: r,
            to: r
        } : {
            from: r.from,
            to: r.to
        }
          , u = !0
          , h = !0;
        if ((sd(l) ? l : [l]).forEach(g => {
            g.check(),
            u = u ? g.isText && g.marks.length === 0 : !1,
            h = h ? g.isBlock : !1
        }
        ),
        d === f && h) {
            const {parent: g} = n.doc.resolve(d);
            g.isTextblock && !g.type.spec.code && !g.childCount && (d -= 1,
            f += 1)
        }
        let m;
        if (u) {
            if (Array.isArray(e))
                m = e.map(g => g.text || "").join("");
            else if (e instanceof b) {
                let g = "";
                e.forEach(y => {
                    y.text && (g += y.text)
                }
                ),
                m = g
            } else
                typeof e == "object" && e && e.text ? m = e.text : m = e;
            n.insertText(m, d, f)
        } else
            m = l,
            n.replaceWith(d, f, m);
        t.updateSelection && id(n, n.steps.length - 1, -1),
        t.applyInputRules && n.setMeta("applyInputRules", {
            from: d,
            text: m
        }),
        t.applyPasteRules && n.setMeta("applyPasteRules", {
            from: d,
            text: m
        })
    }
    return !0
}
  , ld = () => ({state: r, dispatch: e}) => lc(r, e)
  , ad = () => ({state: r, dispatch: e}) => ac(r, e)
  , cd = () => ({state: r, dispatch: e}) => Js(r, e)
  , dd = () => ({state: r, dispatch: e}) => _s(r, e)
  , fd = () => ({state: r, dispatch: e, tr: t}) => {
    try {
        const n = Zt(r.doc, r.selection.$from.pos, -1);
        return n == null ? !1 : (t.join(n, 2),
        e && e(t),
        !0)
    } catch (n) {
        return !1
    }
}
  , ud = () => ({state: r, dispatch: e, tr: t}) => {
    try {
        const n = Zt(r.doc, r.selection.$from.pos, 1);
        return n == null ? !1 : (t.join(n, 2),
        e && e(t),
        !0)
    } catch (n) {
        return !1
    }
}
  , hd = () => ({state: r, dispatch: e}) => sc(r, e)
  , pd = () => ({state: r, dispatch: e}) => oc(r, e);
function fo() {
    return typeof navigator != "undefined" ? /Mac/.test(navigator.platform) : !1
}
function md(r) {
    const e = r.split(/-(?!$)/);
    let t = e[e.length - 1];
    t === "Space" && (t = " ");
    let n, i, s, o;
    for (let l = 0; l < e.length - 1; l += 1) {
        const a = e[l];
        if (/^(cmd|meta|m)$/i.test(a))
            o = !0;
        else if (/^a(lt)?$/i.test(a))
            n = !0;
        else if (/^(c|ctrl|control)$/i.test(a))
            i = !0;
        else if (/^s(hift)?$/i.test(a))
            s = !0;
        else if (/^mod$/i.test(a))
            cn() || fo() ? o = !0 : i = !0;
        else
            throw new Error(`Unrecognized modifier name: ${a}`)
    }
    return n && (t = `Alt-${t}`),
    i && (t = `Ctrl-${t}`),
    o && (t = `Meta-${t}`),
    s && (t = `Shift-${t}`),
    t
}
const gd = r => ({editor: e, view: t, tr: n, dispatch: i}) => {
    const s = md(r).split(/-(?!$)/)
      , o = s.find(c => !["Alt", "Ctrl", "Meta", "Shift"].includes(c))
      , l = new KeyboardEvent("keydown",{
        key: o === "Space" ? " " : o,
        altKey: s.includes("Alt"),
        ctrlKey: s.includes("Ctrl"),
        metaKey: s.includes("Meta"),
        shiftKey: s.includes("Shift"),
        bubbles: !0,
        cancelable: !0
    })
      , a = e.captureTransaction( () => {
        t.someProp("handleKeyDown", c => c(t, l))
    }
    );
    return a == null || a.steps.forEach(c => {
        const d = c.map(n.mapping);
        d && i && n.maybeStep(d)
    }
    ),
    !0
}
;
function Mt(r, e, t={}) {
    const {from: n, to: i, empty: s} = r.selection
      , o = e ? V(e, r.schema) : null
      , l = [];
    r.doc.nodesBetween(n, i, (f, u) => {
        if (f.isText)
            return;
        const h = Math.max(n, u)
          , p = Math.min(i, u + f.nodeSize);
        l.push({
            node: f,
            from: h,
            to: p
        })
    }
    );
    const a = i - n
      , c = l.filter(f => o ? o.name === f.node.type.name : !0).filter(f => _t(f.node.attrs, t, {
        strict: !1
    }));
    return s ? !!c.length : c.reduce( (f, u) => f + u.to - u.from, 0) >= a
}
const yd = (r, e={}) => ({state: t, dispatch: n}) => {
    const i = V(r, t.schema);
    return Mt(t, i, e) ? cc(t, n) : !1
}
  , bd = () => ({state: r, dispatch: e}) => Zs(r, e)
  , kd = r => ({state: e, dispatch: t}) => {
    const n = V(r, e.schema);
    return Sc(n)(e, t)
}
  , xd = () => ({state: r, dispatch: e}) => Ys(r, e);
function dn(r, e) {
    return e.nodes[r] ? "node" : e.marks[r] ? "mark" : null
}
function Ci(r, e) {
    const t = typeof e == "string" ? [e] : e;
    return Object.keys(r).reduce( (n, i) => (t.includes(i) || (n[i] = r[i]),
    n), {})
}
const Sd = (r, e) => ({tr: t, state: n, dispatch: i}) => {
    let s = null
      , o = null;
    const l = dn(typeof r == "string" ? r : r.name, n.schema);
    return l ? (l === "node" && (s = V(r, n.schema)),
    l === "mark" && (o = ve(r, n.schema)),
    i && t.selection.ranges.forEach(a => {
        n.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, d) => {
            s && s === c.type && t.setNodeMarkup(d, void 0, Ci(c.attrs, e)),
            o && c.marks.length && c.marks.forEach(f => {
                o === f.type && t.addMark(d, d + c.nodeSize, o.create(Ci(f.attrs, e)))
            }
            )
        }
        )
    }
    ),
    !0) : !1
}
  , Md = () => ({tr: r, dispatch: e}) => (e && r.scrollIntoView(),
!0)
  , Cd = () => ({tr: r, dispatch: e}) => {
    if (e) {
        const t = new Q(r.doc);
        r.setSelection(t)
    }
    return !0
}
  , wd = () => ({state: r, dispatch: e}) => Ks(r, e)
  , Od = () => ({state: r, dispatch: e}) => Gs(r, e)
  , Td = () => ({state: r, dispatch: e}) => hc(r, e)
  , Nd = () => ({state: r, dispatch: e}) => gc(r, e)
  , Ed = () => ({state: r, dispatch: e}) => mc(r, e);
function Kn(r, e, t={}, n={}) {
    return St(r, e, {
        slice: !1,
        parseOptions: t,
        errorOnInvalidContent: n.errorOnInvalidContent
    })
}
const Dd = (r, e=!1, t={}, n={}) => ({editor: i, tr: s, dispatch: o, commands: l}) => {
    var a, c;
    const {doc: d} = s;
    if (t.preserveWhitespace !== "full") {
        const f = Kn(r, i.schema, t, {
            errorOnInvalidContent: (a = n.errorOnInvalidContent) !== null && a !== void 0 ? a : i.options.enableContentCheck
        });
        return o && s.replaceWith(0, d.content.size, f).setMeta("preventUpdate", !e),
        !0
    }
    return o && s.setMeta("preventUpdate", !e),
    l.insertContentAt({
        from: 0,
        to: d.content.size
    }, r, {
        parseOptions: t,
        errorOnInvalidContent: (c = n.errorOnInvalidContent) !== null && c !== void 0 ? c : i.options.enableContentCheck
    })
}
;
function uo(r, e) {
    const t = ve(e, r.schema)
      , {from: n, to: i, empty: s} = r.selection
      , o = [];
    s ? (r.storedMarks && o.push(...r.storedMarks),
    o.push(...r.selection.$head.marks())) : r.doc.nodesBetween(n, i, a => {
        o.push(...a.marks)
    }
    );
    const l = o.find(a => a.type.name === t.name);
    return l ? k({}, l.attrs) : {}
}
function Tf(r, e) {
    const t = new ss(r);
    return e.forEach(n => {
        n.steps.forEach(i => {
            t.step(i)
        }
        )
    }
    ),
    t
}
function Ad(r) {
    for (let e = 0; e < r.edgeCount; e += 1) {
        const {type: t} = r.edge(e);
        if (t.isTextblock && !t.hasRequiredAttrs())
            return t
    }
    return null
}
function Nf(r, e, t) {
    const n = [];
    return r.nodesBetween(e.from, e.to, (i, s) => {
        t(i) && n.push({
            node: i,
            pos: s
        })
    }
    ),
    n
}
function Id(r, e) {
    for (let t = r.depth; t > 0; t -= 1) {
        const n = r.node(t);
        if (e(n))
            return {
                pos: t > 0 ? r.before(t) : 0,
                start: r.start(t),
                depth: t,
                node: n
            }
    }
}
function gr(r) {
    return e => Id(e.$from, r)
}
function vd(r, e) {
    const t = {
        from: 0,
        to: r.content.size
    };
    return ro(r, t, e)
}
function Rd(r, e) {
    const t = V(e, r.schema)
      , {from: n, to: i} = r.selection
      , s = [];
    r.doc.nodesBetween(n, i, l => {
        s.push(l)
    }
    );
    const o = s.reverse().find(l => l.type.name === t.name);
    return o ? k({}, o.attrs) : {}
}
function Pd(r, e) {
    const t = dn(typeof e == "string" ? e : e.name, r.schema);
    return t === "node" ? Rd(r, e) : t === "mark" ? uo(r, e) : {}
}
function Bd(r, e=JSON.stringify) {
    const t = {};
    return r.filter(n => {
        const i = e(n);
        return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0
    }
    )
}
function zd(r) {
    const e = Bd(r);
    return e.length === 1 ? e : e.filter( (t, n) => !e.filter( (s, o) => o !== n).some(s => t.oldRange.from >= s.oldRange.from && t.oldRange.to <= s.oldRange.to && t.newRange.from >= s.newRange.from && t.newRange.to <= s.newRange.to))
}
function Ef(r) {
    const {mapping: e, steps: t} = r
      , n = [];
    return e.maps.forEach( (i, s) => {
        const o = [];
        if (i.ranges.length)
            i.forEach( (l, a) => {
                o.push({
                    from: l,
                    to: a
                })
            }
            );
        else {
            const {from: l, to: a} = t[s];
            if (l === void 0 || a === void 0)
                return;
            o.push({
                from: l,
                to: a
            })
        }
        o.forEach( ({from: l, to: a}) => {
            const c = e.slice(s).map(l, -1)
              , d = e.slice(s).map(a)
              , f = e.invert().map(c, -1)
              , u = e.invert().map(d);
            n.push({
                oldRange: {
                    from: f,
                    to: u
                },
                newRange: {
                    from: c,
                    to: d
                }
            })
        }
        )
    }
    ),
    zd(n)
}
function ho(r, e, t) {
    const n = [];
    return r === e ? t.resolve(r).marks().forEach(i => {
        const s = t.resolve(r)
          , o = mr(s, i.type);
        o && n.push(k({
            mark: i
        }, o))
    }
    ) : t.nodesBetween(r, e, (i, s) => {
        !i || (i == null ? void 0 : i.nodeSize) === void 0 || n.push(...i.marks.map(o => ({
            from: s,
            to: s + i.nodeSize,
            mark: o
        })))
    }
    ),
    n
}
function Bt(r, e, t) {
    return Object.fromEntries(Object.entries(t).filter( ([n]) => {
        const i = r.find(s => s.type === e && s.name === n);
        return i ? i.attribute.keepOnSplit : !1
    }
    ))
}
function Un(r, e, t={}) {
    const {empty: n, ranges: i} = r.selection
      , s = e ? ve(e, r.schema) : null;
    if (n)
        return !!(r.storedMarks || r.selection.$from.marks()).filter(f => s ? s.name === f.type.name : !0).find(f => _t(f.attrs, t, {
            strict: !1
        }));
    let o = 0;
    const l = [];
    if (i.forEach( ({$from: f, $to: u}) => {
        const h = f.pos
          , p = u.pos;
        r.doc.nodesBetween(h, p, (m, g) => {
            if (!m.isText && !m.marks.length)
                return;
            const y = Math.max(h, g)
              , C = Math.min(p, g + m.nodeSize)
              , O = C - y;
            o += O,
            l.push(...m.marks.map(A => ({
                mark: A,
                from: y,
                to: C
            })))
        }
        )
    }
    ),
    o === 0)
        return !1;
    const a = l.filter(f => s ? s.name === f.mark.type.name : !0).filter(f => _t(f.mark.attrs, t, {
        strict: !1
    })).reduce( (f, u) => f + u.to - u.from, 0)
      , c = l.filter(f => s ? f.mark.type !== s && f.mark.type.excludes(s) : !0).reduce( (f, u) => f + u.to - u.from, 0);
    return (a > 0 ? a + c : a) >= o
}
function Fd(r, e, t={}) {
    if (!e)
        return Mt(r, null, t) || Un(r, null, t);
    const n = dn(e, r.schema);
    return n === "node" ? Mt(r, e, t) : n === "mark" ? Un(r, e, t) : !1
}
function wi(r, e) {
    const {nodeExtensions: t} = ln(e)
      , n = t.find(o => o.name === r);
    if (!n)
        return !1;
    const i = {
        name: n.name,
        options: n.options,
        storage: n.storage
    }
      , s = N(S(n, "group", i));
    return typeof s != "string" ? !1 : s.split(" ").includes("list")
}
function yr(r, {checkChildren: e=!0, ignoreWhitespace: t=!1}={}) {
    var n;
    if (t) {
        if (r.type.name === "hardBreak")
            return !0;
        if (r.isText)
            return /^\s*$/m.test((n = r.text) !== null && n !== void 0 ? n : "")
    }
    if (r.isText)
        return !r.text;
    if (r.isAtom || r.isLeaf)
        return !1;
    if (r.content.childCount === 0)
        return !0;
    if (e) {
        let i = !0;
        return r.content.forEach(s => {
            i !== !1 && (yr(s, {
                ignoreWhitespace: t,
                checkChildren: e
            }) || (i = !1))
        }
        ),
        i
    }
    return !1
}
function Df(r) {
    return r instanceof M
}
function Af(r, e, t) {
    const i = r.state.doc.content.size
      , s = he(e, 0, i)
      , o = he(t, 0, i)
      , l = r.coordsAtPos(s)
      , a = r.coordsAtPos(o, -1)
      , c = Math.min(l.top, a.top)
      , d = Math.max(l.bottom, a.bottom)
      , f = Math.min(l.left, a.left)
      , u = Math.max(l.right, a.right)
      , h = u - f
      , p = d - c
      , y = {
        top: c,
        bottom: d,
        left: f,
        right: u,
        width: h,
        height: p,
        x: f,
        y: c
    };
    return B(k({}, y), {
        toJSON: () => y
    })
}
function Ld(r, e, t) {
    var n;
    const {selection: i} = e;
    let s = null;
    if (oo(i) && (s = i.$cursor),
    s) {
        const l = (n = r.storedMarks) !== null && n !== void 0 ? n : s.marks();
        return !!t.isInSet(l) || !l.some(a => a.type.excludes(t))
    }
    const {ranges: o} = i;
    return o.some( ({$from: l, $to: a}) => {
        let c = l.depth === 0 ? r.doc.inlineContent && r.doc.type.allowsMarkType(t) : !1;
        return r.doc.nodesBetween(l.pos, a.pos, (d, f, u) => {
            if (c)
                return !1;
            if (d.isInline) {
                const h = !u || u.type.allowsMarkType(t)
                  , p = !!t.isInSet(d.marks) || !d.marks.some(m => m.type.excludes(t));
                c = h && p
            }
            return !c
        }
        ),
        c
    }
    )
}
const Vd = (r, e={}) => ({tr: t, state: n, dispatch: i}) => {
    const {selection: s} = t
      , {empty: o, ranges: l} = s
      , a = ve(r, n.schema);
    if (i)
        if (o) {
            const c = uo(n, a);
            t.addStoredMark(a.create(k(k({}, c), e)))
        } else
            l.forEach(c => {
                const d = c.$from.pos
                  , f = c.$to.pos;
                n.doc.nodesBetween(d, f, (u, h) => {
                    const p = Math.max(h, d)
                      , m = Math.min(h + u.nodeSize, f);
                    u.marks.find(y => y.type === a) ? u.marks.forEach(y => {
                        a === y.type && t.addMark(p, m, a.create(k(k({}, y.attrs), e)))
                    }
                    ) : t.addMark(p, m, a.create(e))
                }
                )
            }
            );
    return Ld(n, t, a)
}
  , $d = (r, e) => ({tr: t}) => (t.setMeta(r, e),
!0)
  , Wd = (r, e={}) => ({state: t, dispatch: n, chain: i}) => {
    const s = V(r, t.schema);
    let o;
    return t.selection.$anchor.sameParent(t.selection.$head) && (o = t.selection.$anchor.parent.attrs),
    s.isTextblock ? i().command( ({commands: l}) => bi(s, k(k({}, o), e))(t) ? !0 : l.clearNodes()).command( ({state: l}) => bi(s, k(k({}, o), e))(l, n)).run() : !1
}
  , Hd = r => ({tr: e, dispatch: t}) => {
    if (t) {
        const {doc: n} = e
          , i = he(r, 0, n.content.size)
          , s = M.create(n, i);
        e.setSelection(s)
    }
    return !0
}
  , jd = r => ({tr: e, dispatch: t}) => {
    if (t) {
        const {doc: n} = e
          , {from: i, to: s} = typeof r == "number" ? {
            from: r,
            to: r
        } : r
          , o = T.atStart(n).from
          , l = T.atEnd(n).to
          , a = he(i, o, l)
          , c = he(s, o, l)
          , d = T.create(n, a, c);
        e.setSelection(d)
    }
    return !0
}
  , Jd = r => ({state: e, dispatch: t}) => {
    const n = V(r, e.schema);
    return wc(n)(e, t)
}
;
function Oi(r, e) {
    const t = r.storedMarks || r.selection.$to.parentOffset && r.selection.$from.marks();
    if (t) {
        const n = t.filter(i => e == null ? void 0 : e.includes(i.type.name));
        r.tr.ensureMarks(n)
    }
}
const qd = ({keepMarks: r=!0}={}) => ({tr: e, state: t, dispatch: n, editor: i}) => {
    const {selection: s, doc: o} = e
      , {$from: l, $to: a} = s
      , c = i.extensionManager.attributes
      , d = Bt(c, l.node().type.name, l.node().attrs);
    if (s instanceof M && s.node.isBlock)
        return !l.parentOffset || !pe(o, l.pos) ? !1 : (n && (r && Oi(t, i.extensionManager.splittableMarks),
        e.split(l.pos).scrollIntoView()),
        !0);
    if (!l.parent.isBlock)
        return !1;
    const f = a.parentOffset === a.parent.content.size
      , u = l.depth === 0 ? void 0 : Ad(l.node(-1).contentMatchAt(l.indexAfter(-1)));
    let h = f && u ? [{
        type: u,
        attrs: d
    }] : void 0
      , p = pe(e.doc, e.mapping.map(l.pos), 1, h);
    if (!h && !p && pe(e.doc, e.mapping.map(l.pos), 1, u ? [{
        type: u
    }] : void 0) && (p = !0,
    h = u ? [{
        type: u,
        attrs: d
    }] : void 0),
    n) {
        if (p && (s instanceof T && e.deleteSelection(),
        e.split(e.mapping.map(l.pos), 1, h),
        u && !f && !l.parentOffset && l.parent.type !== u)) {
            const m = e.mapping.map(l.before())
              , g = e.doc.resolve(m);
            l.node(-1).canReplaceWith(g.index(), g.index() + 1, u) && e.setNodeMarkup(e.mapping.map(l.before()), u)
        }
        r && Oi(t, i.extensionManager.splittableMarks),
        e.scrollIntoView()
    }
    return p
}
  , Kd = (r, e={}) => ({tr: t, state: n, dispatch: i, editor: s}) => {
    var o;
    const l = V(r, n.schema)
      , {$from: a, $to: c} = n.selection
      , d = n.selection.node;
    if (d && d.isBlock || a.depth < 2 || !a.sameParent(c))
        return !1;
    const f = a.node(-1);
    if (f.type !== l)
        return !1;
    const u = s.extensionManager.attributes;
    if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
        if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
            return !1;
        if (i) {
            let y = b.empty;
            const C = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
            for (let w = a.depth - C; w >= a.depth - 3; w -= 1)
                y = b.from(a.node(w).copy(y));
            const O = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3
              , A = k(k({}, Bt(u, a.node().type.name, a.node().attrs)), e)
              , D = ((o = l.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(A)) || void 0;
            y = y.append(b.from(l.createAndFill(null, D) || void 0));
            const P = a.before(a.depth - (C - 1));
            t.replace(P, a.after(-O), new x(y,4 - C,0));
            let K = -1;
            t.doc.nodesBetween(P, t.doc.content.size, (w, v) => {
                if (K > -1)
                    return !1;
                w.isTextblock && w.content.size === 0 && (K = v + 1)
            }
            ),
            K > -1 && t.setSelection(T.near(t.doc.resolve(K))),
            t.scrollIntoView()
        }
        return !0
    }
    const h = c.pos === a.end() ? f.contentMatchAt(0).defaultType : null
      , p = k(k({}, Bt(u, f.type.name, f.attrs)), e)
      , m = k(k({}, Bt(u, a.node().type.name, a.node().attrs)), e);
    t.delete(a.pos, c.pos);
    const g = h ? [{
        type: l,
        attrs: p
    }, {
        type: h,
        attrs: m
    }] : [{
        type: l,
        attrs: p
    }];
    if (!pe(t.doc, a.pos, 2))
        return !1;
    if (i) {
        const {selection: y, storedMarks: C} = n
          , {splittableMarks: O} = s.extensionManager
          , A = C || y.$to.parentOffset && y.$from.marks();
        if (t.split(a.pos, 2, g).scrollIntoView(),
        !A || !i)
            return !0;
        const D = A.filter(P => O.includes(P.type.name));
        t.ensureMarks(D)
    }
    return !0
}
  , Nn = (r, e) => {
    const t = gr(o => o.type === e)(r.selection);
    if (!t)
        return !0;
    const n = r.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
    if (n === void 0)
        return !0;
    const i = r.doc.nodeAt(n);
    return t.node.type === (i == null ? void 0 : i.type) && De(r.doc, t.pos) && r.join(t.pos),
    !0
}
  , En = (r, e) => {
    const t = gr(o => o.type === e)(r.selection);
    if (!t)
        return !0;
    const n = r.doc.resolve(t.start).after(t.depth);
    if (n === void 0)
        return !0;
    const i = r.doc.nodeAt(n);
    return t.node.type === (i == null ? void 0 : i.type) && De(r.doc, n) && r.join(n),
    !0
}
  , Ud = (r, e, t, n={}) => ({editor: i, tr: s, state: o, dispatch: l, chain: a, commands: c, can: d}) => {
    const {extensions: f, splittableMarks: u} = i.extensionManager
      , h = V(r, o.schema)
      , p = V(e, o.schema)
      , {selection: m, storedMarks: g} = o
      , {$from: y, $to: C} = m
      , O = y.blockRange(C)
      , A = g || m.$to.parentOffset && m.$from.marks();
    if (!O)
        return !1;
    const D = gr(P => wi(P.type.name, f))(m);
    if (O.depth >= 1 && D && O.depth - D.depth <= 1) {
        if (D.node.type === h)
            return c.liftListItem(p);
        if (wi(D.node.type.name, f) && h.validContent(D.node.content) && l)
            return a().command( () => (s.setNodeMarkup(D.pos, h),
            !0)).command( () => Nn(s, h)).command( () => En(s, h)).run()
    }
    return !t || !A || !l ? a().command( () => d().wrapInList(h, n) ? !0 : c.clearNodes()).wrapInList(h, n).command( () => Nn(s, h)).command( () => En(s, h)).run() : a().command( () => {
        const P = d().wrapInList(h, n)
          , K = A.filter(w => u.includes(w.type.name));
        return s.ensureMarks(K),
        P ? !0 : c.clearNodes()
    }
    ).wrapInList(h, n).command( () => Nn(s, h)).command( () => En(s, h)).run()
}
  , _d = (r, e={}, t={}) => ({state: n, commands: i}) => {
    const {extendEmptyMarkRange: s=!1} = t
      , o = ve(r, n.schema);
    return Un(n, o, e) ? i.unsetMark(o, {
        extendEmptyMarkRange: s
    }) : i.setMark(o, e)
}
  , Gd = (r, e, t={}) => ({state: n, commands: i}) => {
    const s = V(r, n.schema)
      , o = V(e, n.schema)
      , l = Mt(n, s, t);
    let a;
    return n.selection.$anchor.sameParent(n.selection.$head) && (a = n.selection.$anchor.parent.attrs),
    l ? i.setNode(o, a) : i.setNode(s, k(k({}, a), t))
}
  , Yd = (r, e={}) => ({state: t, commands: n}) => {
    const i = V(r, t.schema);
    return Mt(t, i, e) ? n.lift(i) : n.wrapIn(i, e)
}
  , Xd = () => ({state: r, dispatch: e}) => {
    const t = r.plugins;
    for (let n = 0; n < t.length; n += 1) {
        const i = t[n];
        let s;
        if (i.spec.isInputRules && (s = i.getState(r))) {
            if (e) {
                const o = r.tr
                  , l = s.transform;
                for (let a = l.steps.length - 1; a >= 0; a -= 1)
                    o.step(l.steps[a].invert(l.docs[a]));
                if (s.text) {
                    const a = o.doc.resolve(s.from).marks();
                    o.replaceWith(s.from, s.to, r.schema.text(s.text, a))
                } else
                    o.delete(s.from, s.to)
            }
            return !0
        }
    }
    return !1
}
  , Zd = () => ({tr: r, dispatch: e}) => {
    const {selection: t} = r
      , {empty: n, ranges: i} = t;
    return n || e && i.forEach(s => {
        r.removeMark(s.$from.pos, s.$to.pos)
    }
    ),
    !0
}
  , Qd = (r, e={}) => ({tr: t, state: n, dispatch: i}) => {
    var s;
    const {extendEmptyMarkRange: o=!1} = e
      , {selection: l} = t
      , a = ve(r, n.schema)
      , {$from: c, empty: d, ranges: f} = l;
    if (!i)
        return !0;
    if (d && o) {
        let {from: u, to: h} = l;
        const p = (s = c.marks().find(g => g.type === a)) === null || s === void 0 ? void 0 : s.attrs
          , m = mr(c, a, p);
        m && (u = m.from,
        h = m.to),
        t.removeMark(u, h, a)
    } else
        f.forEach(u => {
            t.removeMark(u.$from.pos, u.$to.pos, a)
        }
        );
    return t.removeStoredMark(a),
    !0
}
  , ef = (r, e={}) => ({tr: t, state: n, dispatch: i}) => {
    let s = null
      , o = null;
    const l = dn(typeof r == "string" ? r : r.name, n.schema);
    return l ? (l === "node" && (s = V(r, n.schema)),
    l === "mark" && (o = ve(r, n.schema)),
    i && t.selection.ranges.forEach(a => {
        const c = a.$from.pos
          , d = a.$to.pos;
        let f, u, h, p;
        t.selection.empty ? n.doc.nodesBetween(c, d, (m, g) => {
            s && s === m.type && (h = Math.max(g, c),
            p = Math.min(g + m.nodeSize, d),
            f = g,
            u = m)
        }
        ) : n.doc.nodesBetween(c, d, (m, g) => {
            g < c && s && s === m.type && (h = Math.max(g, c),
            p = Math.min(g + m.nodeSize, d),
            f = g,
            u = m),
            g >= c && g <= d && (s && s === m.type && t.setNodeMarkup(g, void 0, k(k({}, m.attrs), e)),
            o && m.marks.length && m.marks.forEach(y => {
                if (o === y.type) {
                    const C = Math.max(g, c)
                      , O = Math.min(g + m.nodeSize, d);
                    t.addMark(C, O, o.create(k(k({}, y.attrs), e)))
                }
            }
            ))
        }
        ),
        u && (f !== void 0 && t.setNodeMarkup(f, void 0, k(k({}, u.attrs), e)),
        o && u.marks.length && u.marks.forEach(m => {
            o === m.type && t.addMark(h, p, o.create(k(k({}, m.attrs), e)))
        }
        ))
    }
    ),
    !0) : !1
}
  , tf = (r, e={}) => ({state: t, dispatch: n}) => {
    const i = V(r, t.schema);
    return yc(i, e)(t, n)
}
  , nf = (r, e={}) => ({state: t, dispatch: n}) => {
    const i = V(r, t.schema);
    return bc(i, e)(t, n)
}
;
var rf = Object.freeze({
    __proto__: null,
    blur: Wc,
    clearContent: Hc,
    clearNodes: jc,
    command: Jc,
    createParagraphNear: qc,
    cut: Kc,
    deleteCurrentNode: Uc,
    deleteNode: _c,
    deleteRange: Gc,
    deleteSelection: Yc,
    enter: Xc,
    exitCode: Zc,
    extendMarkRange: Qc,
    first: ed,
    focus: td,
    forEach: nd,
    insertContent: rd,
    insertContentAt: od,
    joinBackward: cd,
    joinDown: ad,
    joinForward: dd,
    joinItemBackward: fd,
    joinItemForward: ud,
    joinTextblockBackward: hd,
    joinTextblockForward: pd,
    joinUp: ld,
    keyboardShortcut: gd,
    lift: yd,
    liftEmptyBlock: bd,
    liftListItem: kd,
    newlineInCode: xd,
    resetAttributes: Sd,
    scrollIntoView: Md,
    selectAll: Cd,
    selectNodeBackward: wd,
    selectNodeForward: Od,
    selectParentNode: Td,
    selectTextblockEnd: Nd,
    selectTextblockStart: Ed,
    setContent: Dd,
    setMark: Vd,
    setMeta: $d,
    setNode: Wd,
    setNodeSelection: Hd,
    setTextSelection: jd,
    sinkListItem: Jd,
    splitBlock: qd,
    splitListItem: Kd,
    toggleList: Ud,
    toggleMark: _d,
    toggleNode: Gd,
    toggleWrap: Yd,
    undoInputRule: Xd,
    unsetAllMarks: Zd,
    unsetMark: Qd,
    updateAttributes: ef,
    wrapIn: tf,
    wrapInList: nf
});
const sf = se.create({
    name: "commands",
    addCommands() {
        return k({}, rf)
    }
})
  , of = se.create({
    name: "drop",
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("tiptapDrop"),
            props: {
                handleDrop: (r, e, t, n) => {
                    this.editor.emit("drop", {
                        editor: this.editor,
                        event: e,
                        slice: t,
                        moved: n
                    })
                }
            }
        })]
    }
})
  , lf = se.create({
    name: "editable",
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("editable"),
            props: {
                editable: () => this.editor.options.editable
            }
        })]
    }
})
  , af = new Ue("focusEvents")
  , cf = se.create({
    name: "focusEvents",
    addProseMirrorPlugins() {
        const {editor: r} = this;
        return [new ce({
            key: af,
            props: {
                handleDOMEvents: {
                    focus: (e, t) => {
                        r.isFocused = !0;
                        const n = r.state.tr.setMeta("focus", {
                            event: t
                        }).setMeta("addToHistory", !1);
                        return e.dispatch(n),
                        !1
                    }
                    ,
                    blur: (e, t) => {
                        r.isFocused = !1;
                        const n = r.state.tr.setMeta("blur", {
                            event: t
                        }).setMeta("addToHistory", !1);
                        return e.dispatch(n),
                        !1
                    }
                }
            }
        })]
    }
})
  , df = se.create({
    name: "keymap",
    addKeyboardShortcuts() {
        const r = () => this.editor.commands.first( ({commands: o}) => [ () => o.undoInputRule(), () => o.command( ({tr: l}) => {
            const {selection: a, doc: c} = l
              , {empty: d, $anchor: f} = a
              , {pos: u, parent: h} = f
              , p = f.parent.isTextblock && u > 0 ? l.doc.resolve(u - 1) : f
              , m = p.parent.type.spec.isolating
              , g = f.pos - f.parentOffset
              , y = m && p.parent.childCount === 1 ? g === f.pos : E.atStart(c).from === u;
            return !d || !h.type.isTextblock || h.textContent.length || !y || y && f.parent.type.name === "paragraph" ? !1 : o.clearNodes()
        }
        ), () => o.deleteSelection(), () => o.joinBackward(), () => o.selectNodeBackward()])
          , e = () => this.editor.commands.first( ({commands: o}) => [ () => o.deleteSelection(), () => o.deleteCurrentNode(), () => o.joinForward(), () => o.selectNodeForward()])
          , n = {
            Enter: () => this.editor.commands.first( ({commands: o}) => [ () => o.newlineInCode(), () => o.createParagraphNear(), () => o.liftEmptyBlock(), () => o.splitBlock()]),
            "Mod-Enter": () => this.editor.commands.exitCode(),
            Backspace: r,
            "Mod-Backspace": r,
            "Shift-Backspace": r,
            Delete: e,
            "Mod-Delete": e,
            "Mod-a": () => this.editor.commands.selectAll()
        }
          , i = k({}, n)
          , s = B(k({}, n), {
            "Ctrl-h": r,
            "Alt-Backspace": r,
            "Ctrl-d": e,
            "Ctrl-Alt-Backspace": e,
            "Alt-Delete": e,
            "Alt-d": e,
            "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
            "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
        });
        return cn() || fo() ? s : i
    },
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("clearDocument"),
            appendTransaction: (r, e, t) => {
                if (r.some(m => m.getMeta("composition")))
                    return;
                const n = r.some(m => m.docChanged) && !e.doc.eq(t.doc)
                  , i = r.some(m => m.getMeta("preventClearDocument"));
                if (!n || i)
                    return;
                const {empty: s, from: o, to: l} = e.selection
                  , a = E.atStart(e.doc).from
                  , c = E.atEnd(e.doc).to;
                if (s || !(o === a && l === c) || !yr(t.doc))
                    return;
                const u = t.tr
                  , h = sn({
                    state: t,
                    transaction: u
                })
                  , {commands: p} = new on({
                    editor: this.editor,
                    state: h
                });
                if (p.clearNodes(),
                !!u.steps.length)
                    return u
            }
        })]
    }
})
  , ff = se.create({
    name: "paste",
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("tiptapPaste"),
            props: {
                handlePaste: (r, e, t) => {
                    this.editor.emit("paste", {
                        editor: this.editor,
                        event: e,
                        slice: t
                    })
                }
            }
        })]
    }
})
  , uf = se.create({
    name: "tabindex",
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("tabindex"),
            props: {
                attributes: () => this.editor.isEditable ? {
                    tabindex: "0"
                } : {}
            }
        })]
    }
});
class Pe {
    get name() {
        return this.node.type.name
    }
    constructor(e, t, n=!1, i=null) {
        this.currentNode = null,
        this.actualDepth = null,
        this.isBlock = n,
        this.resolvedPos = e,
        this.editor = t,
        this.currentNode = i
    }
    get node() {
        return this.currentNode || this.resolvedPos.node()
    }
    get element() {
        return this.editor.view.domAtPos(this.pos).node
    }
    get depth() {
        var e;
        return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth
    }
    get pos() {
        return this.resolvedPos.pos
    }
    get content() {
        return this.node.content
    }
    set content(e) {
        let t = this.from
          , n = this.to;
        if (this.isBlock) {
            if (this.content.size === 0)
                return;
            t = this.from + 1,
            n = this.to - 1
        }
        this.editor.commands.insertContentAt({
            from: t,
            to: n
        }, e)
    }
    get attributes() {
        return this.node.attrs
    }
    get textContent() {
        return this.node.textContent
    }
    get size() {
        return this.node.nodeSize
    }
    get from() {
        return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth)
    }
    get range() {
        return {
            from: this.from,
            to: this.to
        }
    }
    get to() {
        return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1)
    }
    get parent() {
        if (this.depth === 0)
            return null;
        const e = this.resolvedPos.start(this.resolvedPos.depth - 1)
          , t = this.resolvedPos.doc.resolve(e);
        return new Pe(t,this.editor)
    }
    get before() {
        let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
        return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)),
        new Pe(e,this.editor)
    }
    get after() {
        let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
        return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)),
        new Pe(e,this.editor)
    }
    get children() {
        const e = [];
        return this.node.content.forEach( (t, n) => {
            const i = t.isBlock && !t.isTextblock
              , s = t.isAtom && !t.isText
              , o = this.pos + n + (s ? 0 : 1);
            if (o < 0 || o > this.resolvedPos.doc.nodeSize - 2)
                return;
            const l = this.resolvedPos.doc.resolve(o);
            if (!i && l.depth <= this.depth)
                return;
            const a = new Pe(l,this.editor,i,i ? t : null);
            i && (a.actualDepth = this.depth + 1),
            e.push(new Pe(l,this.editor,i,i ? t : null))
        }
        ),
        e
    }
    get firstChild() {
        return this.children[0] || null
    }
    get lastChild() {
        const e = this.children;
        return e[e.length - 1] || null
    }
    closest(e, t={}) {
        let n = null
          , i = this.parent;
        for (; i && !n; ) {
            if (i.node.type.name === e)
                if (Object.keys(t).length > 0) {
                    const s = i.node.attrs
                      , o = Object.keys(t);
                    for (let l = 0; l < o.length; l += 1) {
                        const a = o[l];
                        if (s[a] !== t[a])
                            break
                    }
                } else
                    n = i;
            i = i.parent
        }
        return n
    }
    querySelector(e, t={}) {
        return this.querySelectorAll(e, t, !0)[0] || null
    }
    querySelectorAll(e, t={}, n=!1) {
        let i = [];
        if (!this.children || this.children.length === 0)
            return i;
        const s = Object.keys(t);
        return this.children.forEach(o => {
            n && i.length > 0 || (o.node.type.name === e && s.every(a => t[a] === o.node.attrs[a]) && i.push(o),
            !(n && i.length > 0) && (i = i.concat(o.querySelectorAll(e, t, n))))
        }
        ),
        i
    }
    setAttribute(e) {
        const {tr: t} = this.editor.state;
        t.setNodeMarkup(this.from, void 0, k(k({}, this.node.attrs), e)),
        this.editor.view.dispatch(t)
    }
}
const hf = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function pf(r, e, t) {
    const n = document.querySelector("style[data-tiptap-style]");
    if (n !== null)
        return n;
    const i = document.createElement("style");
    return e && i.setAttribute("nonce", e),
    i.setAttribute("data-tiptap-style", ""),
    i.innerHTML = r,
    document.getElementsByTagName("head")[0].appendChild(i),
    i
}
let If = class extends Oc {
    constructor(e={}) {
        super(),
        this.isFocused = !1,
        this.isInitialized = !1,
        this.extensionStorage = {},
        this.options = {
            element: document.createElement("div"),
            content: "",
            injectCSS: !0,
            injectNonce: void 0,
            extensions: [],
            autofocus: !1,
            editable: !0,
            editorProps: {},
            parseOptions: {},
            coreExtensionOptions: {},
            enableInputRules: !0,
            enablePasteRules: !0,
            enableCoreExtensions: !0,
            enableContentCheck: !1,
            emitContentError: !1,
            onBeforeCreate: () => null,
            onCreate: () => null,
            onUpdate: () => null,
            onSelectionUpdate: () => null,
            onTransaction: () => null,
            onFocus: () => null,
            onBlur: () => null,
            onDestroy: () => null,
            onContentError: ({error: t}) => {
                throw t
            }
            ,
            onPaste: () => null,
            onDrop: () => null
        },
        this.isCapturingTransaction = !1,
        this.capturedTransaction = null,
        this.setOptions(e),
        this.createExtensionManager(),
        this.createCommandManager(),
        this.createSchema(),
        this.on("beforeCreate", this.options.onBeforeCreate),
        this.emit("beforeCreate", {
            editor: this
        }),
        this.on("contentError", this.options.onContentError),
        this.createView(),
        this.injectCSS(),
        this.on("create", this.options.onCreate),
        this.on("update", this.options.onUpdate),
        this.on("selectionUpdate", this.options.onSelectionUpdate),
        this.on("transaction", this.options.onTransaction),
        this.on("focus", this.options.onFocus),
        this.on("blur", this.options.onBlur),
        this.on("destroy", this.options.onDestroy),
        this.on("drop", ({event: t, slice: n, moved: i}) => this.options.onDrop(t, n, i)),
        this.on("paste", ({event: t, slice: n}) => this.options.onPaste(t, n)),
        window.setTimeout( () => {
            this.isDestroyed || (this.commands.focus(this.options.autofocus),
            this.emit("create", {
                editor: this
            }),
            this.isInitialized = !0)
        }
        , 0)
    }
    get storage() {
        return this.extensionStorage
    }
    get commands() {
        return this.commandManager.commands
    }
    chain() {
        return this.commandManager.chain()
    }
    can() {
        return this.commandManager.can()
    }
    injectCSS() {
        this.options.injectCSS && document && (this.css = pf(hf, this.options.injectNonce))
    }
    setOptions(e={}) {
        this.options = k(k({}, this.options), e),
        !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps),
        this.view.updateState(this.state))
    }
    setEditable(e, t=!0) {
        this.setOptions({
            editable: e
        }),
        t && this.emit("update", {
            editor: this,
            transaction: this.state.tr
        })
    }
    get isEditable() {
        return this.options.editable && this.view && this.view.editable
    }
    get state() {
        return this.view.state
    }
    registerPlugin(e, t) {
        const n = no(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e]
          , i = this.state.reconfigure({
            plugins: n
        });
        return this.view.updateState(i),
        i
    }
    unregisterPlugin(e) {
        if (this.isDestroyed)
            return;
        const t = this.state.plugins;
        let n = t;
        if ([].concat(e).forEach(s => {
            const o = typeof s == "string" ? `${s}$` : s.key;
            n = n.filter(l => !l.key.startsWith(o))
        }
        ),
        t.length === n.length)
            return;
        const i = this.state.reconfigure({
            plugins: n
        });
        return this.view.updateState(i),
        i
    }
    createExtensionManager() {
        var e, t;
        const i = [...this.options.enableCoreExtensions ? [lf, $c.configure({
            blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
        }), sf, cf, df, uf, of, ff].filter(s => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[s.name] !== !1 : !0) : [], ...this.options.extensions].filter(s => ["extension", "node", "mark"].includes(s == null ? void 0 : s.type));
        this.extensionManager = new Qe(i,this)
    }
    createCommandManager() {
        this.commandManager = new on({
            editor: this
        })
    }
    createSchema() {
        this.schema = this.extensionManager.schema
    }
    createView() {
        var e;
        let t;
        try {
            t = Kn(this.options.content, this.schema, this.options.parseOptions, {
                errorOnInvalidContent: this.options.enableContentCheck
            })
        } catch (o) {
            if (!(o instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(o.message))
                throw o;
            this.emit("contentError", {
                editor: this,
                error: o,
                disableCollaboration: () => {
                    this.storage.collaboration && (this.storage.collaboration.isDisabled = !0),
                    this.options.extensions = this.options.extensions.filter(l => l.name !== "collaboration"),
                    this.createExtensionManager()
                }
            }),
            t = Kn(this.options.content, this.schema, this.options.parseOptions, {
                errorOnInvalidContent: !1
            })
        }
        const n = lo(t, this.options.autofocus);
        this.view = new Hs(this.options.element,B(k({}, this.options.editorProps), {
            attributes: k({
                role: "textbox"
            }, (e = this.options.editorProps) === null || e === void 0 ? void 0 : e.attributes),
            dispatchTransaction: this.dispatchTransaction.bind(this),
            state: Ze.create({
                doc: t,
                selection: n || void 0
            })
        }));
        const i = this.state.reconfigure({
            plugins: this.extensionManager.plugins
        });
        this.view.updateState(i),
        this.createNodeViews(),
        this.prependClass();
        const s = this.view.dom;
        s.editor = this
    }
    createNodeViews() {
        this.view.isDestroyed || this.view.setProps({
            nodeViews: this.extensionManager.nodeViews
        })
    }
    prependClass() {
        this.view.dom.className = `tiptap ${this.view.dom.className}`
    }
    captureTransaction(e) {
        this.isCapturingTransaction = !0,
        e(),
        this.isCapturingTransaction = !1;
        const t = this.capturedTransaction;
        return this.capturedTransaction = null,
        t
    }
    dispatchTransaction(e) {
        if (this.view.isDestroyed)
            return;
        if (this.isCapturingTransaction) {
            if (!this.capturedTransaction) {
                this.capturedTransaction = e;
                return
            }
            e.steps.forEach(o => {
                var l;
                return (l = this.capturedTransaction) === null || l === void 0 ? void 0 : l.step(o)
            }
            );
            return
        }
        const t = this.state.apply(e)
          , n = !this.state.selection.eq(t.selection);
        this.emit("beforeTransaction", {
            editor: this,
            transaction: e,
            nextState: t
        }),
        this.view.updateState(t),
        this.emit("transaction", {
            editor: this,
            transaction: e
        }),
        n && this.emit("selectionUpdate", {
            editor: this,
            transaction: e
        });
        const i = e.getMeta("focus")
          , s = e.getMeta("blur");
        i && this.emit("focus", {
            editor: this,
            event: i.event,
            transaction: e
        }),
        s && this.emit("blur", {
            editor: this,
            event: s.event,
            transaction: e
        }),
        !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
            editor: this,
            transaction: e
        })
    }
    getAttributes(e) {
        return Pd(this.state, e)
    }
    isActive(e, t) {
        const n = typeof e == "string" ? e : null
          , i = typeof e == "string" ? t : e;
        return Fd(this.state, n, i)
    }
    getJSON() {
        return this.state.doc.toJSON()
    }
    getHTML() {
        return ur(this.state.doc.content, this.schema)
    }
    getText(e) {
        const {blockSeparator: t=`

`, textSerializers: n={}} = e || {};
        return vd(this.state.doc, {
            blockSeparator: t,
            textSerializers: k(k({}, io(this.schema)), n)
        })
    }
    get isEmpty() {
        return yr(this.state.doc)
    }
    getCharacterCount() {
        return this.state.doc.content.size - 2
    }
    destroy() {
        if (this.emit("destroy"),
        this.view) {
            const e = this.view.dom;
            e && e.editor && delete e.editor,
            this.view.destroy()
        }
        this.removeAllListeners()
    }
    get isDestroyed() {
        var e;
        return !(!((e = this.view) === null || e === void 0) && e.docView)
    }
    $node(e, t) {
        var n;
        return ((n = this.$doc) === null || n === void 0 ? void 0 : n.querySelector(e, t)) || null
    }
    $nodes(e, t) {
        var n;
        return ((n = this.$doc) === null || n === void 0 ? void 0 : n.querySelectorAll(e, t)) || null
    }
    $pos(e) {
        const t = this.state.doc.resolve(e);
        return new Pe(t,this)
    }
    get $doc() {
        return this.$pos(0)
    }
}
;
function Gt(r) {
    return new pr({
        find: r.find,
        handler: ({state: e, range: t, match: n}) => {
            const i = N(r.getAttributes, void 0, n);
            if (i === !1 || i === null)
                return null;
            const {tr: s} = e
              , o = n[n.length - 1]
              , l = n[0];
            if (o) {
                const a = l.search(/\S/)
                  , c = t.from + l.indexOf(o)
                  , d = c + o.length;
                if (ho(t.from, t.to, e.doc).filter(h => h.mark.type.excluded.find(m => m === r.type && m !== h.mark.type)).filter(h => h.to > c).length)
                    return null;
                d < t.to && s.delete(d, t.to),
                c > t.from && s.delete(t.from + a, c);
                const u = t.from + a + o.length;
                s.addMark(t.from + a, u, r.type.create(i || {})),
                s.removeStoredMark(r.type)
            }
        }
    })
}
function mf(r) {
    return new pr({
        find: r.find,
        handler: ({state: e, range: t, match: n}) => {
            const i = e.doc.resolve(t.from)
              , s = N(r.getAttributes, void 0, n) || {};
            if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), r.type))
                return null;
            e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, r.type, s)
        }
    })
}
function Ti(r) {
    return new pr({
        find: r.find,
        handler: ({state: e, range: t, match: n, chain: i}) => {
            const s = N(r.getAttributes, void 0, n) || {}
              , o = e.tr.delete(t.from, t.to)
              , a = o.doc.resolve(t.from).blockRange()
              , c = a && Yn(a, r.type, s);
            if (!c)
                return null;
            if (o.wrap(a, c),
            r.keepMarks && r.editor) {
                const {selection: f, storedMarks: u} = e
                  , {splittableMarks: h} = r.editor.extensionManager
                  , p = u || f.$to.parentOffset && f.$from.marks();
                if (p) {
                    const m = p.filter(g => h.includes(g.type.name));
                    o.ensureMarks(m)
                }
            }
            if (r.keepAttributes) {
                const f = r.type.name === "bulletList" || r.type.name === "orderedList" ? "listItem" : "taskList";
                i().updateAttributes(f, s).run()
            }
            const d = o.doc.resolve(t.from - 1).nodeBefore;
            d && d.type === r.type && De(o.doc, t.from - 1) && (!r.joinPredicate || r.joinPredicate(n, d)) && o.join(t.from - 1)
        }
    })
}
class ge {
    constructor(e={}) {
        this.type = "node",
        this.name = "node",
        this.parent = null,
        this.child = null,
        this.config = {
            name: this.name,
            defaultOptions: {}
        },
        this.config = k(k({}, this.config), e),
        this.name = this.config.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        this.options = this.config.defaultOptions,
        this.config.addOptions && (this.options = N(S(this, "addOptions", {
            name: this.name
        }))),
        this.storage = N(S(this, "addStorage", {
            name: this.name,
            options: this.options
        })) || {}
    }
    static create(e={}) {
        return new ge(e)
    }
    configure(e={}) {
        const t = this.extend(B(k({}, this.config), {
            addOptions: () => an(this.options, e)
        }));
        return t.name = this.name,
        t.parent = this.parent,
        t
    }
    extend(e={}) {
        const t = new ge(e);
        return t.parent = this,
        this.child = t,
        t.name = e.name ? e.name : t.parent.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        t.options = N(S(t, "addOptions", {
            name: t.name
        })),
        t.storage = N(S(t, "addStorage", {
            name: t.name,
            options: t.options
        })),
        t
    }
}
class Rf {
    constructor(e, t, n) {
        this.isDragging = !1,
        this.component = e,
        this.editor = t.editor,
        this.options = k({
            stopEvent: null,
            ignoreMutation: null
        }, n),
        this.extension = t.extension,
        this.node = t.node,
        this.decorations = t.decorations,
        this.innerDecorations = t.innerDecorations,
        this.view = t.view,
        this.HTMLAttributes = t.HTMLAttributes,
        this.getPos = t.getPos,
        this.mount()
    }
    mount() {}
    get dom() {
        return this.editor.view.dom
    }
    get contentDOM() {
        return null
    }
    onDragStart(e) {
        var t, n, i, s, o, l, a;
        const {view: c} = this.editor
          , d = e.target
          , f = d.nodeType === 3 ? (t = d.parentElement) === null || t === void 0 ? void 0 : t.closest("[data-drag-handle]") : d.closest("[data-drag-handle]");
        if (!this.dom || !((n = this.contentDOM) === null || n === void 0) && n.contains(d) || !f)
            return;
        let u = 0
          , h = 0;
        if (this.dom !== f) {
            const C = this.dom.getBoundingClientRect()
              , O = f.getBoundingClientRect()
              , A = (i = e.offsetX) !== null && i !== void 0 ? i : (s = e.nativeEvent) === null || s === void 0 ? void 0 : s.offsetX
              , D = (o = e.offsetY) !== null && o !== void 0 ? o : (l = e.nativeEvent) === null || l === void 0 ? void 0 : l.offsetY;
            u = O.x - C.x + A,
            h = O.y - C.y + D
        }
        const p = this.dom.cloneNode(!0);
        (a = e.dataTransfer) === null || a === void 0 || a.setDragImage(p, u, h);
        const m = this.getPos();
        if (typeof m != "number")
            return;
        const g = M.create(c.state.doc, m)
          , y = c.state.tr.setSelection(g);
        c.dispatch(y)
    }
    stopEvent(e) {
        var t;
        if (!this.dom)
            return !1;
        if (typeof this.options.stopEvent == "function")
            return this.options.stopEvent({
                event: e
            });
        const n = e.target;
        if (!(this.dom.contains(n) && !(!((t = this.contentDOM) === null || t === void 0) && t.contains(n))))
            return !1;
        const s = e.type.startsWith("drag")
          , o = e.type === "drop";
        if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(n.tagName) || n.isContentEditable) && !o && !s)
            return !0;
        const {isEditable: a} = this.editor
          , {isDragging: c} = this
          , d = !!this.node.type.spec.draggable
          , f = M.isSelectable(this.node)
          , u = e.type === "copy"
          , h = e.type === "paste"
          , p = e.type === "cut"
          , m = e.type === "mousedown";
        if (!d && f && s && e.target === this.dom && e.preventDefault(),
        d && s && !c && e.target === this.dom)
            return e.preventDefault(),
            !1;
        if (d && a && !c && m) {
            const g = n.closest("[data-drag-handle]");
            g && (this.dom === g || this.dom.contains(g)) && (this.isDragging = !0,
            document.addEventListener("dragend", () => {
                this.isDragging = !1
            }
            , {
                once: !0
            }),
            document.addEventListener("drop", () => {
                this.isDragging = !1
            }
            , {
                once: !0
            }),
            document.addEventListener("mouseup", () => {
                this.isDragging = !1
            }
            , {
                once: !0
            }))
        }
        return !(c || o || u || h || p || m && f)
    }
    ignoreMutation(e) {
        return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({
            mutation: e
        }) : this.node.isLeaf || this.node.isAtom ? !0 : e.type === "selection" || this.dom.contains(e.target) && e.type === "childList" && (cn() || ao()) && this.editor.isFocused && [...Array.from(e.addedNodes), ...Array.from(e.removedNodes)].every(n => n.isContentEditable) ? !1 : this.contentDOM === e.target && e.type === "attributes" ? !0 : !this.contentDOM.contains(e.target)
    }
    updateAttributes(e) {
        this.editor.commands.command( ({tr: t}) => {
            const n = this.getPos();
            return typeof n != "number" ? !1 : (t.setNodeMarkup(n, void 0, k(k({}, this.node.attrs), e)),
            !0)
        }
        )
    }
    deleteNode() {
        const e = this.getPos();
        if (typeof e != "number")
            return;
        const t = e + this.node.nodeSize;
        this.editor.commands.deleteRange({
            from: e,
            to: t
        })
    }
}
function Yt(r) {
    return new Pc({
        find: r.find,
        handler: ({state: e, range: t, match: n, pasteEvent: i}) => {
            const s = N(r.getAttributes, void 0, n, i);
            if (s === !1 || s === null)
                return null;
            const {tr: o} = e
              , l = n[n.length - 1]
              , a = n[0];
            let c = t.to;
            if (l) {
                const d = a.search(/\S/)
                  , f = t.from + a.indexOf(l)
                  , u = f + l.length;
                if (ho(t.from, t.to, e.doc).filter(p => p.mark.type.excluded.find(g => g === r.type && g !== p.mark.type)).filter(p => p.to > f).length)
                    return null;
                u < t.to && o.delete(u, t.to),
                f > t.from && o.delete(t.from + d, f),
                c = t.from + d + l.length,
                o.addMark(t.from + d, c, r.type.create(s || {})),
                o.removeStoredMark(r.type)
            }
        }
    })
}
const gf = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/
  , yf = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g
  , bf = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/
  , kf = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g
  , Pf = qe.create({
    name: "bold",
    addOptions() {
        return {
            HTMLAttributes: {}
        }
    },
    parseHTML() {
        return [{
            tag: "strong"
        }, {
            tag: "b",
            getAttrs: r => r.style.fontWeight !== "normal" && null
        }, {
            style: "font-weight=400",
            clearMark: r => r.type.name === this.name
        }, {
            style: "font-weight",
            getAttrs: r => /^(bold(er)?|[5-9]\d{2,})$/.test(r) && null
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["strong", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            setBold: () => ({commands: r}) => r.setMark(this.name),
            toggleBold: () => ({commands: r}) => r.toggleMark(this.name),
            unsetBold: () => ({commands: r}) => r.unsetMark(this.name)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-b": () => this.editor.commands.toggleBold(),
            "Mod-B": () => this.editor.commands.toggleBold()
        }
    },
    addInputRules() {
        return [Gt({
            find: gf,
            type: this.type
        }), Gt({
            find: bf,
            type: this.type
        })]
    },
    addPasteRules() {
        return [Yt({
            find: yf,
            type: this.type
        }), Yt({
            find: kf,
            type: this.type
        })]
    }
})
  , xf = "listItem"
  , Ni = "textStyle"
  , Ei = /^\s*([-+*])\s$/
  , Bf = ge.create({
    name: "bulletList",
    addOptions() {
        return {
            itemTypeName: "listItem",
            HTMLAttributes: {},
            keepMarks: !1,
            keepAttributes: !1
        }
    },
    group: "block list",
    content() {
        return `${this.options.itemTypeName}+`
    },
    parseHTML() {
        return [{
            tag: "ul"
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["ul", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            toggleBulletList: () => ({commands: r, chain: e}) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(xf, this.editor.getAttributes(Ni)).run() : r.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
        }
    },
    addInputRules() {
        let r = Ti({
            find: Ei,
            type: this.type
        });
        return (this.options.keepMarks || this.options.keepAttributes) && (r = Ti({
            find: Ei,
            type: this.type,
            keepMarks: this.options.keepMarks,
            keepAttributes: this.options.keepAttributes,
            getAttributes: () => this.editor.getAttributes(Ni),
            editor: this.editor
        })),
        [r]
    }
})
  , zf = ge.create({
    name: "doc",
    topNode: !0,
    content: "block+"
})
  , Sf = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/
  , Mf = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g
  , Cf = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/
  , wf = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g
  , Ff = qe.create({
    name: "italic",
    addOptions() {
        return {
            HTMLAttributes: {}
        }
    },
    parseHTML() {
        return [{
            tag: "em"
        }, {
            tag: "i",
            getAttrs: r => r.style.fontStyle !== "normal" && null
        }, {
            style: "font-style=normal",
            clearMark: r => r.type.name === this.name
        }, {
            style: "font-style=italic"
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["em", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            setItalic: () => ({commands: r}) => r.setMark(this.name),
            toggleItalic: () => ({commands: r}) => r.toggleMark(this.name),
            unsetItalic: () => ({commands: r}) => r.unsetMark(this.name)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-i": () => this.editor.commands.toggleItalic(),
            "Mod-I": () => this.editor.commands.toggleItalic()
        }
    },
    addInputRules() {
        return [Gt({
            find: Sf,
            type: this.type
        }), Gt({
            find: Cf,
            type: this.type
        })]
    },
    addPasteRules() {
        return [Yt({
            find: Mf,
            type: this.type
        }), Yt({
            find: wf,
            type: this.type
        })]
    }
})
  , Lf = ge.create({
    name: "listItem",
    addOptions() {
        return {
            HTMLAttributes: {},
            bulletListTypeName: "bulletList",
            orderedListTypeName: "orderedList"
        }
    },
    content: "paragraph block*",
    defining: !0,
    parseHTML() {
        return [{
            tag: "li"
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["li", Ie(this.options.HTMLAttributes, r), 0]
    },
    addKeyboardShortcuts() {
        return {
            Enter: () => this.editor.commands.splitListItem(this.name),
            Tab: () => this.editor.commands.sinkListItem(this.name),
            "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
        }
    }
})
  , Vf = ge.create({
    name: "paragraph",
    priority: 1e3,
    addOptions() {
        return {
            HTMLAttributes: {}
        }
    },
    group: "block",
    content: "inline*",
    parseHTML() {
        return [{
            tag: "p"
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["p", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            setParagraph: () => ({commands: r}) => r.setNode(this.name)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-Alt-0": () => this.editor.commands.setParagraph()
        }
    }
})
  , $f = ge.create({
    name: "text",
    group: "inline"
})
  , Wf = ge.create({
    name: "heading",
    addOptions() {
        return {
            levels: [1, 2, 3, 4, 5, 6],
            HTMLAttributes: {}
        }
    },
    content: "inline*",
    group: "block",
    defining: !0,
    addAttributes() {
        return {
            level: {
                default: 1,
                rendered: !1
            }
        }
    },
    parseHTML() {
        return this.options.levels.map(r => ({
            tag: `h${r}`,
            attrs: {
                level: r
            }
        }))
    },
    renderHTML({node: r, HTMLAttributes: e}) {
        return [`h${this.options.levels.includes(r.attrs.level) ? r.attrs.level : this.options.levels[0]}`, Ie(this.options.HTMLAttributes, e), 0]
    },
    addCommands() {
        return {
            setHeading: r => ({commands: e}) => this.options.levels.includes(r.level) ? e.setNode(this.name, r) : !1,
            toggleHeading: r => ({commands: e}) => this.options.levels.includes(r.level) ? e.toggleNode(this.name, "paragraph", r) : !1
        }
    },
    addKeyboardShortcuts() {
        return this.options.levels.reduce( (r, e) => B(k({}, r), {
            [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({
                level: e
            })
        }), {})
    },
    addInputRules() {
        return this.options.levels.map(r => mf({
            find: new RegExp(`^(#{${Math.min(...this.options.levels)},${r}})\\s$`),
            type: this.type,
            getAttributes: {
                level: r
            }
        }))
    }
})
  , Hf = qe.create({
    name: "underline",
    addOptions() {
        return {
            HTMLAttributes: {}
        }
    },
    parseHTML() {
        return [{
            tag: "u"
        }, {
            style: "text-decoration",
            consuming: !1,
            getAttrs: r => r.includes("underline") ? {} : !1
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["u", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            setUnderline: () => ({commands: r}) => r.setMark(this.name),
            toggleUnderline: () => ({commands: r}) => r.toggleMark(this.name),
            unsetUnderline: () => ({commands: r}) => r.unsetMark(this.name)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-u": () => this.editor.commands.toggleUnderline(),
            "Mod-U": () => this.editor.commands.toggleUnderline()
        }
    }
});
export {Gt as A, Pf as B, oo as C, zf as D, se as E, b as F, Df as G, Wf as H, Ff as I, Af as J, Lf as L, Wt as M, ge as N, ce as P, x as S, $f as T, Hf as U, Ue as a, If as b, Bf as c, Vf as d, Rf as e, T as f, M as g, z as h, re as i, E as j, ic as k, N as l, Ie as m, S as n, ul as o, ss as p, qe as q, Yt as r, Tf as s, Ef as t, Nf as u, ho as v, Ti as w, Pd as x, Id as y, mf as z};
//# sourceMappingURL=index-09JYhwSQ.js.map var mo = Object.defineProperty
  , go = Object.defineProperties;
var yo = Object.getOwnPropertyDescriptors;
var br = Object.getOwnPropertySymbols;
var bo = Object.prototype.hasOwnProperty
  , ko = Object.prototype.propertyIsEnumerable;
var kr = (r, e, t) => e in r ? mo(r, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : r[e] = t
  , k = (r, e) => {
    for (var t in e || (e = {}))
        bo.call(e, t) && kr(r, t, e[t]);
    if (br)
        for (var t of br(e))
            ko.call(e, t) && kr(r, t, e[t]);
    return r
}
  , B = (r, e) => go(r, yo(e));
function $(r) {
    this.content = r
}
$.prototype = {
    constructor: $,
    find: function(r) {
        for (var e = 0; e < this.content.length; e += 2)
            if (this.content[e] === r)
                return e;
        return -1
    },
    get: function(r) {
        var e = this.find(r);
        return e == -1 ? void 0 : this.content[e + 1]
    },
    update: function(r, e, t) {
        var n = t && t != r ? this.remove(t) : this
          , i = n.find(r)
          , s = n.content.slice();
        return i == -1 ? s.push(t || r, e) : (s[i + 1] = e,
        t && (s[i] = t)),
        new $(s)
    },
    remove: function(r) {
        var e = this.find(r);
        if (e == -1)
            return this;
        var t = this.content.slice();
        return t.splice(e, 2),
        new $(t)
    },
    addToStart: function(r, e) {
        return new $([r, e].concat(this.remove(r).content))
    },
    addToEnd: function(r, e) {
        var t = this.remove(r).content.slice();
        return t.push(r, e),
        new $(t)
    },
    addBefore: function(r, e, t) {
        var n = this.remove(e)
          , i = n.content.slice()
          , s = n.find(r);
        return i.splice(s == -1 ? i.length : s, 0, e, t),
        new $(i)
    },
    forEach: function(r) {
        for (var e = 0; e < this.content.length; e += 2)
            r(this.content[e], this.content[e + 1])
    },
    prepend: function(r) {
        return r = $.from(r),
        r.size ? new $(r.content.concat(this.subtract(r).content)) : this
    },
    append: function(r) {
        return r = $.from(r),
        r.size ? new $(this.subtract(r).content.concat(r.content)) : this
    },
    subtract: function(r) {
        var e = this;
        r = $.from(r);
        for (var t = 0; t < r.content.length; t += 2)
            e = e.remove(r.content[t]);
        return e
    },
    toObject: function() {
        var r = {};
        return this.forEach(function(e, t) {
            r[e] = t
        }),
        r
    },
    get size() {
        return this.content.length >> 1
    }
};
$.from = function(r) {
    if (r instanceof $)
        return r;
    var e = [];
    if (r)
        for (var t in r)
            e.push(t, r[t]);
    return new $(e)
}
;
function Di(r, e, t) {
    for (let n = 0; ; n++) {
        if (n == r.childCount || n == e.childCount)
            return r.childCount == e.childCount ? null : t;
        let i = r.child(n)
          , s = e.child(n);
        if (i == s) {
            t += i.nodeSize;
            continue
        }
        if (!i.sameMarkup(s))
            return t;
        if (i.isText && i.text != s.text) {
            for (let o = 0; i.text[o] == s.text[o]; o++)
                t++;
            return t
        }
        if (i.content.size || s.content.size) {
            let o = Di(i.content, s.content, t + 1);
            if (o != null)
                return o
        }
        t += i.nodeSize
    }
}
function Ai(r, e, t, n) {
    for (let i = r.childCount, s = e.childCount; ; ) {
        if (i == 0 || s == 0)
            return i == s ? null : {
                a: t,
                b: n
            };
        let o = r.child(--i)
          , l = e.child(--s)
          , a = o.nodeSize;
        if (o == l) {
            t -= a,
            n -= a;
            continue
        }
        if (!o.sameMarkup(l))
            return {
                a: t,
                b: n
            };
        if (o.isText && o.text != l.text) {
            let c = 0
              , d = Math.min(o.text.length, l.text.length);
            for (; c < d && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
                c++,
                t--,
                n--;
            return {
                a: t,
                b: n
            }
        }
        if (o.content.size || l.content.size) {
            let c = Ai(o.content, l.content, t - 1, n - 1);
            if (c)
                return c
        }
        t -= a,
        n -= a
    }
}
class b {
    constructor(e, t) {
        if (this.content = e,
        this.size = t || 0,
        t == null)
            for (let n = 0; n < e.length; n++)
                this.size += e[n].nodeSize
    }
    nodesBetween(e, t, n, i=0, s) {
        for (let o = 0, l = 0; l < t; o++) {
            let a = this.content[o]
              , c = l + a.nodeSize;
            if (c > e && n(a, i + l, s || null, o) !== !1 && a.content.size) {
                let d = l + 1;
                a.nodesBetween(Math.max(0, e - d), Math.min(a.content.size, t - d), n, i + d)
            }
            l = c
        }
    }
    descendants(e) {
        this.nodesBetween(0, this.size, e)
    }
    textBetween(e, t, n, i) {
        let s = ""
          , o = !0;
        return this.nodesBetween(e, t, (l, a) => {
            let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
            l.isBlock && (l.isLeaf && c || l.isTextblock) && n && (o ? o = !1 : s += n),
            s += c
        }
        , 0),
        s
    }
    append(e) {
        if (!e.size)
            return this;
        if (!this.size)
            return e;
        let t = this.lastChild
          , n = e.firstChild
          , i = this.content.slice()
          , s = 0;
        for (t.isText && t.sameMarkup(n) && (i[i.length - 1] = t.withText(t.text + n.text),
        s = 1); s < e.content.length; s++)
            i.push(e.content[s]);
        return new b(i,this.size + e.size)
    }
    cut(e, t=this.size) {
        if (e == 0 && t == this.size)
            return this;
        let n = []
          , i = 0;
        if (t > e)
            for (let s = 0, o = 0; o < t; s++) {
                let l = this.content[s]
                  , a = o + l.nodeSize;
                a > e && ((o < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, t - o - 1))),
                n.push(l),
                i += l.nodeSize),
                o = a
            }
        return new b(n,i)
    }
    cutByIndex(e, t) {
        return e == t ? b.empty : e == 0 && t == this.content.length ? this : new b(this.content.slice(e, t))
    }
    replaceChild(e, t) {
        let n = this.content[e];
        if (n == t)
            return this;
        let i = this.content.slice()
          , s = this.size + t.nodeSize - n.nodeSize;
        return i[e] = t,
        new b(i,s)
    }
    addToStart(e) {
        return new b([e].concat(this.content),this.size + e.nodeSize)
    }
    addToEnd(e) {
        return new b(this.content.concat(e),this.size + e.nodeSize)
    }
    eq(e) {
        if (this.content.length != e.content.length)
            return !1;
        for (let t = 0; t < this.content.length; t++)
            if (!this.content[t].eq(e.content[t]))
                return !1;
        return !0
    }
    get firstChild() {
        return this.content.length ? this.content[0] : null
    }
    get lastChild() {
        return this.content.length ? this.content[this.content.length - 1] : null
    }
    get childCount() {
        return this.content.length
    }
    child(e) {
        let t = this.content[e];
        if (!t)
            throw new RangeError("Index " + e + " out of range for " + this);
        return t
    }
    maybeChild(e) {
        return this.content[e] || null
    }
    forEach(e) {
        for (let t = 0, n = 0; t < this.content.length; t++) {
            let i = this.content[t];
            e(i, n, t),
            n += i.nodeSize
        }
    }
    findDiffStart(e, t=0) {
        return Di(this, e, t)
    }
    findDiffEnd(e, t=this.size, n=e.size) {
        return Ai(this, e, t, n)
    }
    findIndex(e) {
        if (e == 0)
            return Tt(0, e);
        if (e == this.size)
            return Tt(this.content.length, e);
        if (e > this.size || e < 0)
            throw new RangeError(`Position ${e} outside of fragment (${this})`);
        for (let t = 0, n = 0; ; t++) {
            let i = this.child(t)
              , s = n + i.nodeSize;
            if (s >= e)
                return s == e ? Tt(t + 1, s) : Tt(t, n);
            n = s
        }
    }
    toString() {
        return "<" + this.toStringInner() + ">"
    }
    toStringInner() {
        return this.content.join(", ")
    }
    toJSON() {
        return this.content.length ? this.content.map(e => e.toJSON()) : null
    }
    static fromJSON(e, t) {
        if (!t)
            return b.empty;
        if (!Array.isArray(t))
            throw new RangeError("Invalid input for Fragment.fromJSON");
        return new b(t.map(e.nodeFromJSON))
    }
    static fromArray(e) {
        if (!e.length)
            return b.empty;
        let t, n = 0;
        for (let i = 0; i < e.length; i++) {
            let s = e[i];
            n += s.nodeSize,
            i && s.isText && e[i - 1].sameMarkup(s) ? (t || (t = e.slice(0, i)),
            t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s)
        }
        return new b(t || e,n)
    }
    static from(e) {
        if (!e)
            return b.empty;
        if (e instanceof b)
            return e;
        if (Array.isArray(e))
            return this.fromArray(e);
        if (e.attrs)
            return new b([e],e.nodeSize);
        throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""))
    }
}
b.empty = new b([],0);
const fn = {
    index: 0,
    offset: 0
};
function Tt(r, e) {
    return fn.index = r,
    fn.offset = e,
    fn
}
function zt(r, e) {
    if (r === e)
        return !0;
    if (!(r && typeof r == "object") || !(e && typeof e == "object"))
        return !1;
    let t = Array.isArray(r);
    if (Array.isArray(e) != t)
        return !1;
    if (t) {
        if (r.length != e.length)
            return !1;
        for (let n = 0; n < r.length; n++)
            if (!zt(r[n], e[n]))
                return !1
    } else {
        for (let n in r)
            if (!(n in e) || !zt(r[n], e[n]))
                return !1;
        for (let n in e)
            if (!(n in r))
                return !1
    }
    return !0
}
let I = class Dn {
    constructor(e, t) {
        this.type = e,
        this.attrs = t
    }
    addToSet(e) {
        let t, n = !1;
        for (let i = 0; i < e.length; i++) {
            let s = e[i];
            if (this.eq(s))
                return e;
            if (this.type.excludes(s.type))
                t || (t = e.slice(0, i));
            else {
                if (s.type.excludes(this.type))
                    return e;
                !n && s.type.rank > this.type.rank && (t || (t = e.slice(0, i)),
                t.push(this),
                n = !0),
                t && t.push(s)
            }
        }
        return t || (t = e.slice()),
        n || t.push(this),
        t
    }
    removeFromSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t]))
                return e.slice(0, t).concat(e.slice(t + 1));
        return e
    }
    isInSet(e) {
        for (let t = 0; t < e.length; t++)
            if (this.eq(e[t]))
                return !0;
        return !1
    }
    eq(e) {
        return this == e || this.type == e.type && zt(this.attrs, e.attrs)
    }
    toJSON() {
        let e = {
            type: this.type.name
        };
        for (let t in this.attrs) {
            e.attrs = this.attrs;
            break
        }
        return e
    }
    static fromJSON(e, t) {
        if (!t)
            throw new RangeError("Invalid input for Mark.fromJSON");
        let n = e.marks[t.type];
        if (!n)
            throw new RangeError(`There is no mark type ${t.type} in this schema`);
        let i = n.create(t.attrs);
        return n.checkAttrs(i.attrs),
        i
    }
    static sameSet(e, t) {
        if (e == t)
            return !0;
        if (e.length != t.length)
            return !1;
        for (let n = 0; n < e.length; n++)
            if (!e[n].eq(t[n]))
                return !1;
        return !0
    }
    static setFrom(e) {
        if (!e || Array.isArray(e) && e.length == 0)
            return Dn.none;
        if (e instanceof Dn)
            return [e];
        let t = e.slice();
        return t.sort( (n, i) => n.type.rank - i.type.rank),
        t
    }
}
;
I.none = [];
class Ft extends Error {
}
class x {
    constructor(e, t, n) {
        this.content = e,
        this.openStart = t,
        this.openEnd = n
    }
    get size() {
        return this.content.size - this.openStart - this.openEnd
    }
    insertAt(e, t) {
        let n = vi(this.content, e + this.openStart, t);
        return n && new x(n,this.openStart,this.openEnd)
    }
    removeBetween(e, t) {
        return new x(Ii(this.content, e + this.openStart, t + this.openStart),this.openStart,this.openEnd)
    }
    eq(e) {
        return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd
    }
    toString() {
        return this.content + "(" + this.openStart + "," + this.openEnd + ")"
    }
    toJSON() {
        if (!this.content.size)
            return null;
        let e = {
            content: this.content.toJSON()
        };
        return this.openStart > 0 && (e.openStart = this.openStart),
        this.openEnd > 0 && (e.openEnd = this.openEnd),
        e
    }
    static fromJSON(e, t) {
        if (!t)
            return x.empty;
        let n = t.openStart || 0
          , i = t.openEnd || 0;
        if (typeof n != "number" || typeof i != "number")
            throw new RangeError("Invalid input for Slice.fromJSON");
        return new x(b.fromJSON(e, t.content),n,i)
    }
    static maxOpen(e, t=!0) {
        let n = 0
          , i = 0;
        for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
            n++;
        for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
            i++;
        return new x(e,n,i)
    }
}
x.empty = new x(b.empty,0,0);
function Ii(r, e, t) {
    let {index: n, offset: i} = r.findIndex(e)
      , s = r.maybeChild(n)
      , {index: o, offset: l} = r.findIndex(t);
    if (i == e || s.isText) {
        if (l != t && !r.child(o).isText)
            throw new RangeError("Removing non-flat range");
        return r.cut(0, e).append(r.cut(t))
    }
    if (n != o)
        throw new RangeError("Removing non-flat range");
    return r.replaceChild(n, s.copy(Ii(s.content, e - i - 1, t - i - 1)))
}
function vi(r, e, t, n) {
    let {index: i, offset: s} = r.findIndex(e)
      , o = r.maybeChild(i);
    if (s == e || o.isText)
        return r.cut(0, e).append(t).append(r.cut(e));
    let l = vi(o.content, e - s - 1, t);
    return l && r.replaceChild(i, o.copy(l))
}
function xo(r, e, t) {
    if (t.openStart > r.depth)
        throw new Ft("Inserted content deeper than insertion position");
    if (r.depth - t.openStart != e.depth - t.openEnd)
        throw new Ft("Inconsistent open depths");
    return Ri(r, e, t, 0)
}
function Ri(r, e, t, n) {
    let i = r.index(n)
      , s = r.node(n);
    if (i == e.index(n) && n < r.depth - t.openStart) {
        let o = Ri(r, e, t, n + 1);
        return s.copy(s.content.replaceChild(i, o))
    } else if (t.content.size)
        if (!t.openStart && !t.openEnd && r.depth == n && e.depth == n) {
            let o = r.parent
              , l = o.content;
            return Le(o, l.cut(0, r.parentOffset).append(t.content).append(l.cut(e.parentOffset)))
        } else {
            let {start: o, end: l} = So(t, r);
            return Le(s, Bi(r, o, l, e, n))
        }
    else
        return Le(s, Lt(r, e, n))
}
function Pi(r, e) {
    if (!e.type.compatibleContent(r.type))
        throw new Ft("Cannot join " + e.type.name + " onto " + r.type.name)
}
function An(r, e, t) {
    let n = r.node(t);
    return Pi(n, e.node(t)),
    n
}
function Fe(r, e) {
    let t = e.length - 1;
    t >= 0 && r.isText && r.sameMarkup(e[t]) ? e[t] = r.withText(e[t].text + r.text) : e.push(r)
}
function ft(r, e, t, n) {
    let i = (e || r).node(t)
      , s = 0
      , o = e ? e.index(t) : i.childCount;
    r && (s = r.index(t),
    r.depth > t ? s++ : r.textOffset && (Fe(r.nodeAfter, n),
    s++));
    for (let l = s; l < o; l++)
        Fe(i.child(l), n);
    e && e.depth == t && e.textOffset && Fe(e.nodeBefore, n)
}
function Le(r, e) {
    return r.type.checkContent(e),
    r.copy(e)
}
function Bi(r, e, t, n, i) {
    let s = r.depth > i && An(r, e, i + 1)
      , o = n.depth > i && An(t, n, i + 1)
      , l = [];
    return ft(null, r, i, l),
    s && o && e.index(i) == t.index(i) ? (Pi(s, o),
    Fe(Le(s, Bi(r, e, t, n, i + 1)), l)) : (s && Fe(Le(s, Lt(r, e, i + 1)), l),
    ft(e, t, i, l),
    o && Fe(Le(o, Lt(t, n, i + 1)), l)),
    ft(n, null, i, l),
    new b(l)
}
function Lt(r, e, t) {
    let n = [];
    if (ft(null, r, t, n),
    r.depth > t) {
        let i = An(r, e, t + 1);
        Fe(Le(i, Lt(r, e, t + 1)), n)
    }
    return ft(e, null, t, n),
    new b(n)
}
function So(r, e) {
    let t = e.depth - r.openStart
      , i = e.node(t).copy(r.content);
    for (let s = t - 1; s >= 0; s--)
        i = e.node(s).copy(b.from(i));
    return {
        start: i.resolveNoCache(r.openStart + t),
        end: i.resolveNoCache(i.content.size - r.openEnd - t)
    }
}
class mt {
    constructor(e, t, n) {
        this.pos = e,
        this.path = t,
        this.parentOffset = n,
        this.depth = t.length / 3 - 1
    }
    resolveDepth(e) {
        return e == null ? this.depth : e < 0 ? this.depth + e : e
    }
    get parent() {
        return this.node(this.depth)
    }
    get doc() {
        return this.node(0)
    }
    node(e) {
        return this.path[this.resolveDepth(e) * 3]
    }
    index(e) {
        return this.path[this.resolveDepth(e) * 3 + 1]
    }
    indexAfter(e) {
        return e = this.resolveDepth(e),
        this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1)
    }
    start(e) {
        return e = this.resolveDepth(e),
        e == 0 ? 0 : this.path[e * 3 - 1] + 1
    }
    end(e) {
        return e = this.resolveDepth(e),
        this.start(e) + this.node(e).content.size
    }
    before(e) {
        if (e = this.resolveDepth(e),
        !e)
            throw new RangeError("There is no position before the top-level node");
        return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1]
    }
    after(e) {
        if (e = this.resolveDepth(e),
        !e)
            throw new RangeError("There is no position after the top-level node");
        return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize
    }
    get textOffset() {
        return this.pos - this.path[this.path.length - 1]
    }
    get nodeAfter() {
        let e = this.parent
          , t = this.index(this.depth);
        if (t == e.childCount)
            return null;
        let n = this.pos - this.path[this.path.length - 1]
          , i = e.child(t);
        return n ? e.child(t).cut(n) : i
    }
    get nodeBefore() {
        let e = this.index(this.depth)
          , t = this.pos - this.path[this.path.length - 1];
        return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1)
    }
    posAtIndex(e, t) {
        t = this.resolveDepth(t);
        let n = this.path[t * 3]
          , i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
        for (let s = 0; s < e; s++)
            i += n.child(s).nodeSize;
        return i
    }
    marks() {
        let e = this.parent
          , t = this.index();
        if (e.content.size == 0)
            return I.none;
        if (this.textOffset)
            return e.child(t).marks;
        let n = e.maybeChild(t - 1)
          , i = e.maybeChild(t);
        if (!n) {
            let l = n;
            n = i,
            i = l
        }
        let s = n.marks;
        for (var o = 0; o < s.length; o++)
            s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
        return s
    }
    marksAcross(e) {
        let t = this.parent.maybeChild(this.index());
        if (!t || !t.isInline)
            return null;
        let n = t.marks
          , i = e.parent.maybeChild(e.index());
        for (var s = 0; s < n.length; s++)
            n[s].type.spec.inclusive === !1 && (!i || !n[s].isInSet(i.marks)) && (n = n[s--].removeFromSet(n));
        return n
    }
    sharedDepth(e) {
        for (let t = this.depth; t > 0; t--)
            if (this.start(t) <= e && this.end(t) >= e)
                return t;
        return 0
    }
    blockRange(e=this, t) {
        if (e.pos < this.pos)
            return e.blockRange(this);
        for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--)
            if (e.pos <= this.end(n) && (!t || t(this.node(n))))
                return new Vt(this,e,n);
        return null
    }
    sameParent(e) {
        return this.pos - this.parentOffset == e.pos - e.parentOffset
    }
    max(e) {
        return e.pos > this.pos ? e : this
    }
    min(e) {
        return e.pos < this.pos ? e : this
    }
    toString() {
        let e = "";
        for (let t = 1; t <= this.depth; t++)
            e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
        return e + ":" + this.parentOffset
    }
    static resolve(e, t) {
        if (!(t >= 0 && t <= e.content.size))
            throw new RangeError("Position " + t + " out of range");
        let n = []
          , i = 0
          , s = t;
        for (let o = e; ; ) {
            let {index: l, offset: a} = o.content.findIndex(s)
              , c = s - a;
            if (n.push(o, l, i + a),
            !c || (o = o.child(l),
            o.isText))
                break;
            s = c - 1,
            i += a + 1
        }
        return new mt(t,n,s)
    }
    static resolveCached(e, t) {
        let n = xr.get(e);
        if (n)
            for (let s = 0; s < n.elts.length; s++) {
                let o = n.elts[s];
                if (o.pos == t)
                    return o
            }
        else
            xr.set(e, n = new Mo);
        let i = n.elts[n.i] = mt.resolve(e, t);
        return n.i = (n.i + 1) % Co,
        i
    }
}
class Mo {
    constructor() {
        this.elts = [],
        this.i = 0
    }
}
const Co = 12
  , xr = new WeakMap;
class Vt {
    constructor(e, t, n) {
        this.$from = e,
        this.$to = t,
        this.depth = n
    }
    get start() {
        return this.$from.before(this.depth + 1)
    }
    get end() {
        return this.$to.after(this.depth + 1)
    }
    get parent() {
        return this.$from.node(this.depth)
    }
    get startIndex() {
        return this.$from.index(this.depth)
    }
    get endIndex() {
        return this.$to.indexAfter(this.depth)
    }
}
const wo = Object.create(null);
let Ce = class In {
    constructor(e, t, n, i=I.none) {
        this.type = e,
        this.attrs = t,
        this.marks = i,
        this.content = n || b.empty
    }
    get children() {
        return this.content.content
    }
    get nodeSize() {
        return this.isLeaf ? 1 : 2 + this.content.size
    }
    get childCount() {
        return this.content.childCount
    }
    child(e) {
        return this.content.child(e)
    }
    maybeChild(e) {
        return this.content.maybeChild(e)
    }
    forEach(e) {
        this.content.forEach(e)
    }
    nodesBetween(e, t, n, i=0) {
        this.content.nodesBetween(e, t, n, i, this)
    }
    descendants(e) {
        this.nodesBetween(0, this.content.size, e)
    }
    get textContent() {
        return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "")
    }
    textBetween(e, t, n, i) {
        return this.content.textBetween(e, t, n, i)
    }
    get firstChild() {
        return this.content.firstChild
    }
    get lastChild() {
        return this.content.lastChild
    }
    eq(e) {
        return this == e || this.sameMarkup(e) && this.content.eq(e.content)
    }
    sameMarkup(e) {
        return this.hasMarkup(e.type, e.attrs, e.marks)
    }
    hasMarkup(e, t, n) {
        return this.type == e && zt(this.attrs, t || e.defaultAttrs || wo) && I.sameSet(this.marks, n || I.none)
    }
    copy(e=null) {
        return e == this.content ? this : new In(this.type,this.attrs,e,this.marks)
    }
    mark(e) {
        return e == this.marks ? this : new In(this.type,this.attrs,this.content,e)
    }
    cut(e, t=this.content.size) {
        return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t))
    }
    slice(e, t=this.content.size, n=!1) {
        if (e == t)
            return x.empty;
        let i = this.resolve(e)
          , s = this.resolve(t)
          , o = n ? 0 : i.sharedDepth(t)
          , l = i.start(o)
          , c = i.node(o).content.cut(i.pos - l, s.pos - l);
        return new x(c,i.depth - o,s.depth - o)
    }
    replace(e, t, n) {
        return xo(this.resolve(e), this.resolve(t), n)
    }
    nodeAt(e) {
        for (let t = this; ; ) {
            let {index: n, offset: i} = t.content.findIndex(e);
            if (t = t.maybeChild(n),
            !t)
                return null;
            if (i == e || t.isText)
                return t;
            e -= i + 1
        }
    }
    childAfter(e) {
        let {index: t, offset: n} = this.content.findIndex(e);
        return {
            node: this.content.maybeChild(t),
            index: t,
            offset: n
        }
    }
    childBefore(e) {
        if (e == 0)
            return {
                node: null,
                index: 0,
                offset: 0
            };
        let {index: t, offset: n} = this.content.findIndex(e);
        if (n < e)
            return {
                node: this.content.child(t),
                index: t,
                offset: n
            };
        let i = this.content.child(t - 1);
        return {
            node: i,
            index: t - 1,
            offset: n - i.nodeSize
        }
    }
    resolve(e) {
        return mt.resolveCached(this, e)
    }
    resolveNoCache(e) {
        return mt.resolve(this, e)
    }
    rangeHasMark(e, t, n) {
        let i = !1;
        return t > e && this.nodesBetween(e, t, s => (n.isInSet(s.marks) && (i = !0),
        !i)),
        i
    }
    get isBlock() {
        return this.type.isBlock
    }
    get isTextblock() {
        return this.type.isTextblock
    }
    get inlineContent() {
        return this.type.inlineContent
    }
    get isInline() {
        return this.type.isInline
    }
    get isText() {
        return this.type.isText
    }
    get isLeaf() {
        return this.type.isLeaf
    }
    get isAtom() {
        return this.type.isAtom
    }
    toString() {
        if (this.type.spec.toDebugString)
            return this.type.spec.toDebugString(this);
        let e = this.type.name;
        return this.content.size && (e += "(" + this.content.toStringInner() + ")"),
        zi(this.marks, e)
    }
    contentMatchAt(e) {
        let t = this.type.contentMatch.matchFragment(this.content, 0, e);
        if (!t)
            throw new Error("Called contentMatchAt on a node with invalid content");
        return t
    }
    canReplace(e, t, n=b.empty, i=0, s=n.childCount) {
        let o = this.contentMatchAt(e).matchFragment(n, i, s)
          , l = o && o.matchFragment(this.content, t);
        if (!l || !l.validEnd)
            return !1;
        for (let a = i; a < s; a++)
            if (!this.type.allowsMarks(n.child(a).marks))
                return !1;
        return !0
    }
    canReplaceWith(e, t, n, i) {
        if (i && !this.type.allowsMarks(i))
            return !1;
        let s = this.contentMatchAt(e).matchType(n)
          , o = s && s.matchFragment(this.content, t);
        return o ? o.validEnd : !1
    }
    canAppend(e) {
        return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type)
    }
    check() {
        this.type.checkContent(this.content),
        this.type.checkAttrs(this.attrs);
        let e = I.none;
        for (let t = 0; t < this.marks.length; t++) {
            let n = this.marks[t];
            n.type.checkAttrs(n.attrs),
            e = n.addToSet(e)
        }
        if (!I.sameSet(e, this.marks))
            throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map(t => t.type.name)}`);
        this.content.forEach(t => t.check())
    }
    toJSON() {
        let e = {
            type: this.type.name
        };
        for (let t in this.attrs) {
            e.attrs = this.attrs;
            break
        }
        return this.content.size && (e.content = this.content.toJSON()),
        this.marks.length && (e.marks = this.marks.map(t => t.toJSON())),
        e
    }
    static fromJSON(e, t) {
        if (!t)
            throw new RangeError("Invalid input for Node.fromJSON");
        let n;
        if (t.marks) {
            if (!Array.isArray(t.marks))
                throw new RangeError("Invalid mark data for Node.fromJSON");
            n = t.marks.map(e.markFromJSON)
        }
        if (t.type == "text") {
            if (typeof t.text != "string")
                throw new RangeError("Invalid text node in JSON");
            return e.text(t.text, n)
        }
        let i = b.fromJSON(e, t.content)
          , s = e.nodeType(t.type).create(t.attrs, i, n);
        return s.type.checkAttrs(s.attrs),
        s
    }
}
;
Ce.prototype.text = void 0;
class $t extends Ce {
    constructor(e, t, n, i) {
        if (super(e, t, null, i),
        !n)
            throw new RangeError("Empty text nodes are not allowed");
        this.text = n
    }
    toString() {
        return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : zi(this.marks, JSON.stringify(this.text))
    }
    get textContent() {
        return this.text
    }
    textBetween(e, t) {
        return this.text.slice(e, t)
    }
    get nodeSize() {
        return this.text.length
    }
    mark(e) {
        return e == this.marks ? this : new $t(this.type,this.attrs,this.text,e)
    }
    withText(e) {
        return e == this.text ? this : new $t(this.type,this.attrs,e,this.marks)
    }
    cut(e=0, t=this.text.length) {
        return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t))
    }
    eq(e) {
        return this.sameMarkup(e) && this.text == e.text
    }
    toJSON() {
        let e = super.toJSON();
        return e.text = this.text,
        e
    }
}
function zi(r, e) {
    for (let t = r.length - 1; t >= 0; t--)
        e = r[t].type.name + "(" + e + ")";
    return e
}
class We {
    constructor(e) {
        this.validEnd = e,
        this.next = [],
        this.wrapCache = []
    }
    static parse(e, t) {
        let n = new Oo(e,t);
        if (n.next == null)
            return We.empty;
        let i = Fi(n);
        n.next && n.err("Unexpected trailing text");
        let s = vo(Io(i));
        return Ro(s, n),
        s
    }
    matchType(e) {
        for (let t = 0; t < this.next.length; t++)
            if (this.next[t].type == e)
                return this.next[t].next;
        return null
    }
    matchFragment(e, t=0, n=e.childCount) {
        let i = this;
        for (let s = t; i && s < n; s++)
            i = i.matchType(e.child(s).type);
        return i
    }
    get inlineContent() {
        return this.next.length != 0 && this.next[0].type.isInline
    }
    get defaultType() {
        for (let e = 0; e < this.next.length; e++) {
            let {type: t} = this.next[e];
            if (!(t.isText || t.hasRequiredAttrs()))
                return t
        }
        return null
    }
    compatible(e) {
        for (let t = 0; t < this.next.length; t++)
            for (let n = 0; n < e.next.length; n++)
                if (this.next[t].type == e.next[n].type)
                    return !0;
        return !1
    }
    fillBefore(e, t=!1, n=0) {
        let i = [this];
        function s(o, l) {
            let a = o.matchFragment(e, n);
            if (a && (!t || a.validEnd))
                return b.from(l.map(c => c.createAndFill()));
            for (let c = 0; c < o.next.length; c++) {
                let {type: d, next: f} = o.next[c];
                if (!(d.isText || d.hasRequiredAttrs()) && i.indexOf(f) == -1) {
                    i.push(f);
                    let u = s(f, l.concat(d));
                    if (u)
                        return u
                }
            }
            return null
        }
        return s(this, [])
    }
    findWrapping(e) {
        for (let n = 0; n < this.wrapCache.length; n += 2)
            if (this.wrapCache[n] == e)
                return this.wrapCache[n + 1];
        let t = this.computeWrapping(e);
        return this.wrapCache.push(e, t),
        t
    }
    computeWrapping(e) {
        let t = Object.create(null)
          , n = [{
            match: this,
            type: null,
            via: null
        }];
        for (; n.length; ) {
            let i = n.shift()
              , s = i.match;
            if (s.matchType(e)) {
                let o = [];
                for (let l = i; l.type; l = l.via)
                    o.push(l.type);
                return o.reverse()
            }
            for (let o = 0; o < s.next.length; o++) {
                let {type: l, next: a} = s.next[o];
                !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (n.push({
                    match: l.contentMatch,
                    type: l,
                    via: i
                }),
                t[l.name] = !0)
            }
        }
        return null
    }
    get edgeCount() {
        return this.next.length
    }
    edge(e) {
        if (e >= this.next.length)
            throw new RangeError(`There's no ${e}th edge in this content match`);
        return this.next[e]
    }
    toString() {
        let e = [];
        function t(n) {
            e.push(n);
            for (let i = 0; i < n.next.length; i++)
                e.indexOf(n.next[i].next) == -1 && t(n.next[i].next)
        }
        return t(this),
        e.map( (n, i) => {
            let s = i + (n.validEnd ? "*" : " ") + " ";
            for (let o = 0; o < n.next.length; o++)
                s += (o ? ", " : "") + n.next[o].type.name + "->" + e.indexOf(n.next[o].next);
            return s
        }
        ).join(`
`)
    }
}
We.empty = new We(!0);
class Oo {
    constructor(e, t) {
        this.string = e,
        this.nodeTypes = t,
        this.inline = null,
        this.pos = 0,
        this.tokens = e.split(/\s*(?=\b|\W|$)/),
        this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(),
        this.tokens[0] == "" && this.tokens.shift()
    }
    get next() {
        return this.tokens[this.pos]
    }
    eat(e) {
        return this.next == e && (this.pos++ || !0)
    }
    err(e) {
        throw new SyntaxError(e + " (in content expression '" + this.string + "')")
    }
}
function Fi(r) {
    let e = [];
    do
        e.push(To(r));
    while (r.eat("|"));
    return e.length == 1 ? e[0] : {
        type: "choice",
        exprs: e
    }
}
function To(r) {
    let e = [];
    do
        e.push(No(r));
    while (r.next && r.next != ")" && r.next != "|");
    return e.length == 1 ? e[0] : {
        type: "seq",
        exprs: e
    }
}
function No(r) {
    let e = Ao(r);
    for (; ; )
        if (r.eat("+"))
            e = {
                type: "plus",
                expr: e
            };
        else if (r.eat("*"))
            e = {
                type: "star",
                expr: e
            };
        else if (r.eat("?"))
            e = {
                type: "opt",
                expr: e
            };
        else if (r.eat("{"))
            e = Eo(r, e);
        else
            break;
    return e
}
function Sr(r) {
    /\D/.test(r.next) && r.err("Expected number, got '" + r.next + "'");
    let e = Number(r.next);
    return r.pos++,
    e
}
function Eo(r, e) {
    let t = Sr(r)
      , n = t;
    return r.eat(",") && (r.next != "}" ? n = Sr(r) : n = -1),
    r.eat("}") || r.err("Unclosed braced range"),
    {
        type: "range",
        min: t,
        max: n,
        expr: e
    }
}
function Do(r, e) {
    let t = r.nodeTypes
      , n = t[e];
    if (n)
        return [n];
    let i = [];
    for (let s in t) {
        let o = t[s];
        o.isInGroup(e) && i.push(o)
    }
    return i.length == 0 && r.err("No node type or group '" + e + "' found"),
    i
}
function Ao(r) {
    if (r.eat("(")) {
        let e = Fi(r);
        return r.eat(")") || r.err("Missing closing paren"),
        e
    } else if (/\W/.test(r.next))
        r.err("Unexpected token '" + r.next + "'");
    else {
        let e = Do(r, r.next).map(t => (r.inline == null ? r.inline = t.isInline : r.inline != t.isInline && r.err("Mixing inline and block content"),
        {
            type: "name",
            value: t
        }));
        return r.pos++,
        e.length == 1 ? e[0] : {
            type: "choice",
            exprs: e
        }
    }
}
function Io(r) {
    let e = [[]];
    return i(s(r, 0), t()),
    e;
    function t() {
        return e.push([]) - 1
    }
    function n(o, l, a) {
        let c = {
            term: a,
            to: l
        };
        return e[o].push(c),
        c
    }
    function i(o, l) {
        o.forEach(a => a.to = l)
    }
    function s(o, l) {
        if (o.type == "choice")
            return o.exprs.reduce( (a, c) => a.concat(s(c, l)), []);
        if (o.type == "seq")
            for (let a = 0; ; a++) {
                let c = s(o.exprs[a], l);
                if (a == o.exprs.length - 1)
                    return c;
                i(c, l = t())
            }
        else if (o.type == "star") {
            let a = t();
            return n(l, a),
            i(s(o.expr, a), a),
            [n(a)]
        } else if (o.type == "plus") {
            let a = t();
            return i(s(o.expr, l), a),
            i(s(o.expr, a), a),
            [n(a)]
        } else {
            if (o.type == "opt")
                return [n(l)].concat(s(o.expr, l));
            if (o.type == "range") {
                let a = l;
                for (let c = 0; c < o.min; c++) {
                    let d = t();
                    i(s(o.expr, a), d),
                    a = d
                }
                if (o.max == -1)
                    i(s(o.expr, a), a);
                else
                    for (let c = o.min; c < o.max; c++) {
                        let d = t();
                        n(a, d),
                        i(s(o.expr, a), d),
                        a = d
                    }
                return [n(a)]
            } else {
                if (o.type == "name")
                    return [n(l, void 0, o.value)];
                throw new Error("Unknown expr type")
            }
        }
    }
}
function Li(r, e) {
    return e - r
}
function Mr(r, e) {
    let t = [];
    return n(e),
    t.sort(Li);
    function n(i) {
        let s = r[i];
        if (s.length == 1 && !s[0].term)
            return n(s[0].to);
        t.push(i);
        for (let o = 0; o < s.length; o++) {
            let {term: l, to: a} = s[o];
            !l && t.indexOf(a) == -1 && n(a)
        }
    }
}
function vo(r) {
    let e = Object.create(null);
    return t(Mr(r, 0));
    function t(n) {
        let i = [];
        n.forEach(o => {
            r[o].forEach( ({term: l, to: a}) => {
                if (!l)
                    return;
                let c;
                for (let d = 0; d < i.length; d++)
                    i[d][0] == l && (c = i[d][1]);
                Mr(r, a).forEach(d => {
                    c || i.push([l, c = []]),
                    c.indexOf(d) == -1 && c.push(d)
                }
                )
            }
            )
        }
        );
        let s = e[n.join(",")] = new We(n.indexOf(r.length - 1) > -1);
        for (let o = 0; o < i.length; o++) {
            let l = i[o][1].sort(Li);
            s.next.push({
                type: i[o][0],
                next: e[l.join(",")] || t(l)
            })
        }
        return s
    }
}
function Ro(r, e) {
    for (let t = 0, n = [r]; t < n.length; t++) {
        let i = n[t]
          , s = !i.validEnd
          , o = [];
        for (let l = 0; l < i.next.length; l++) {
            let {type: a, next: c} = i.next[l];
            o.push(a.name),
            s && !(a.isText || a.hasRequiredAttrs()) && (s = !1),
            n.indexOf(c) == -1 && n.push(c)
        }
        s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)")
    }
}
function Vi(r) {
    let e = Object.create(null);
    for (let t in r) {
        let n = r[t];
        if (!n.hasDefault)
            return null;
        e[t] = n.default
    }
    return e
}
function $i(r, e) {
    let t = Object.create(null);
    for (let n in r) {
        let i = e && e[n];
        if (i === void 0) {
            let s = r[n];
            if (s.hasDefault)
                i = s.default;
            else
                throw new RangeError("No value supplied for attribute " + n)
        }
        t[n] = i
    }
    return t
}
function Wi(r, e, t, n) {
    for (let i in e)
        if (!(i in r))
            throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
    for (let i in r) {
        let s = r[i];
        s.validate && s.validate(e[i])
    }
}
function Hi(r, e) {
    let t = Object.create(null);
    if (e)
        for (let n in e)
            t[n] = new Bo(r,n,e[n]);
    return t
}
let Cr = class ji {
    constructor(e, t, n) {
        this.name = e,
        this.schema = t,
        this.spec = n,
        this.markSet = null,
        this.groups = n.group ? n.group.split(" ") : [],
        this.attrs = Hi(e, n.attrs),
        this.defaultAttrs = Vi(this.attrs),
        this.contentMatch = null,
        this.inlineContent = null,
        this.isBlock = !(n.inline || e == "text"),
        this.isText = e == "text"
    }
    get isInline() {
        return !this.isBlock
    }
    get isTextblock() {
        return this.isBlock && this.inlineContent
    }
    get isLeaf() {
        return this.contentMatch == We.empty
    }
    get isAtom() {
        return this.isLeaf || !!this.spec.atom
    }
    isInGroup(e) {
        return this.groups.indexOf(e) > -1
    }
    get whitespace() {
        return this.spec.whitespace || (this.spec.code ? "pre" : "normal")
    }
    hasRequiredAttrs() {
        for (let e in this.attrs)
            if (this.attrs[e].isRequired)
                return !0;
        return !1
    }
    compatibleContent(e) {
        return this == e || this.contentMatch.compatible(e.contentMatch)
    }
    computeAttrs(e) {
        return !e && this.defaultAttrs ? this.defaultAttrs : $i(this.attrs, e)
    }
    create(e=null, t, n) {
        if (this.isText)
            throw new Error("NodeType.create can't construct text nodes");
        return new Ce(this,this.computeAttrs(e),b.from(t),I.setFrom(n))
    }
    createChecked(e=null, t, n) {
        return t = b.from(t),
        this.checkContent(t),
        new Ce(this,this.computeAttrs(e),t,I.setFrom(n))
    }
    createAndFill(e=null, t, n) {
        if (e = this.computeAttrs(e),
        t = b.from(t),
        t.size) {
            let o = this.contentMatch.fillBefore(t);
            if (!o)
                return null;
            t = o.append(t)
        }
        let i = this.contentMatch.matchFragment(t)
          , s = i && i.fillBefore(b.empty, !0);
        return s ? new Ce(this,e,t.append(s),I.setFrom(n)) : null
    }
    validContent(e) {
        let t = this.contentMatch.matchFragment(e);
        if (!t || !t.validEnd)
            return !1;
        for (let n = 0; n < e.childCount; n++)
            if (!this.allowsMarks(e.child(n).marks))
                return !1;
        return !0
    }
    checkContent(e) {
        if (!this.validContent(e))
            throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`)
    }
    checkAttrs(e) {
        Wi(this.attrs, e, "node", this.name)
    }
    allowsMarkType(e) {
        return this.markSet == null || this.markSet.indexOf(e) > -1
    }
    allowsMarks(e) {
        if (this.markSet == null)
            return !0;
        for (let t = 0; t < e.length; t++)
            if (!this.allowsMarkType(e[t].type))
                return !1;
        return !0
    }
    allowedMarks(e) {
        if (this.markSet == null)
            return e;
        let t;
        for (let n = 0; n < e.length; n++)
            this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t || (t = e.slice(0, n));
        return t ? t.length ? t : I.none : e
    }
    static compile(e, t) {
        let n = Object.create(null);
        e.forEach( (s, o) => n[s] = new ji(s,t,o));
        let i = t.spec.topNode || "doc";
        if (!n[i])
            throw new RangeError("Schema is missing its top node type ('" + i + "')");
        if (!n.text)
            throw new RangeError("Every schema needs a 'text' type");
        for (let s in n.text.attrs)
            throw new RangeError("The text node type should not have attributes");
        return n
    }
}
;
function Po(r, e, t) {
    let n = t.split("|");
    return i => {
        let s = i === null ? "null" : typeof i;
        if (n.indexOf(s) < 0)
            throw new RangeError(`Expected value of type ${n} for attribute ${e} on type ${r}, got ${s}`)
    }
}
class Bo {
    constructor(e, t, n) {
        this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"),
        this.default = n.default,
        this.validate = typeof n.validate == "string" ? Po(e, t, n.validate) : n.validate
    }
    get isRequired() {
        return !this.hasDefault
    }
}
class Xt {
    constructor(e, t, n, i) {
        this.name = e,
        this.rank = t,
        this.schema = n,
        this.spec = i,
        this.attrs = Hi(e, i.attrs),
        this.excluded = null;
        let s = Vi(this.attrs);
        this.instance = s ? new I(this,s) : null
    }
    create(e=null) {
        return !e && this.instance ? this.instance : new I(this,$i(this.attrs, e))
    }
    static compile(e, t) {
        let n = Object.create(null)
          , i = 0;
        return e.forEach( (s, o) => n[s] = new Xt(s,i++,t,o)),
        n
    }
    removeFromSet(e) {
        for (var t = 0; t < e.length; t++)
            e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)),
            t--);
        return e
    }
    isInSet(e) {
        for (let t = 0; t < e.length; t++)
            if (e[t].type == this)
                return e[t]
    }
    checkAttrs(e) {
        Wi(this.attrs, e, "mark", this.name)
    }
    excludes(e) {
        return this.excluded.indexOf(e) > -1
    }
}
class Ji {
    constructor(e) {
        this.linebreakReplacement = null,
        this.cached = Object.create(null);
        let t = this.spec = {};
        for (let i in e)
            t[i] = e[i];
        t.nodes = $.from(e.nodes),
        t.marks = $.from(e.marks || {}),
        this.nodes = Cr.compile(this.spec.nodes, this),
        this.marks = Xt.compile(this.spec.marks, this);
        let n = Object.create(null);
        for (let i in this.nodes) {
            if (i in this.marks)
                throw new RangeError(i + " can not be both a node and a mark");
            let s = this.nodes[i]
              , o = s.spec.content || ""
              , l = s.spec.marks;
            if (s.contentMatch = n[o] || (n[o] = We.parse(o, this.nodes)),
            s.inlineContent = s.contentMatch.inlineContent,
            s.spec.linebreakReplacement) {
                if (this.linebreakReplacement)
                    throw new RangeError("Multiple linebreak nodes defined");
                if (!s.isInline || !s.isLeaf)
                    throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
                this.linebreakReplacement = s
            }
            s.markSet = l == "_" ? null : l ? wr(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null
        }
        for (let i in this.marks) {
            let s = this.marks[i]
              , o = s.spec.excludes;
            s.excluded = o == null ? [s] : o == "" ? [] : wr(this, o.split(" "))
        }
        this.nodeFromJSON = i => Ce.fromJSON(this, i),
        this.markFromJSON = i => I.fromJSON(this, i),
        this.topNodeType = this.nodes[this.spec.topNode || "doc"],
        this.cached.wrappings = Object.create(null)
    }
    node(e, t=null, n, i) {
        if (typeof e == "string")
            e = this.nodeType(e);
        else if (e instanceof Cr) {
            if (e.schema != this)
                throw new RangeError("Node type from different schema used (" + e.name + ")")
        } else
            throw new RangeError("Invalid node type: " + e);
        return e.createChecked(t, n, i)
    }
    text(e, t) {
        let n = this.nodes.text;
        return new $t(n,n.defaultAttrs,e,I.setFrom(t))
    }
    mark(e, t) {
        return typeof e == "string" && (e = this.marks[e]),
        e.create(t)
    }
    nodeType(e) {
        let t = this.nodes[e];
        if (!t)
            throw new RangeError("Unknown node type: " + e);
        return t
    }
}
function wr(r, e) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
        let i = e[n]
          , s = r.marks[i]
          , o = s;
        if (s)
            t.push(s);
        else
            for (let l in r.marks) {
                let a = r.marks[l];
                (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(o = a)
            }
        if (!o)
            throw new SyntaxError("Unknown mark type: '" + e[n] + "'")
    }
    return t
}
function zo(r) {
    return r.tag != null
}
function Fo(r) {
    return r.style != null
}
class we {
    constructor(e, t) {
        this.schema = e,
        this.rules = t,
        this.tags = [],
        this.styles = [];
        let n = this.matchedStyles = [];
        t.forEach(i => {
            if (zo(i))
                this.tags.push(i);
            else if (Fo(i)) {
                let s = /[^=]*/.exec(i.style)[0];
                n.indexOf(s) < 0 && n.push(s),
                this.styles.push(i)
            }
        }
        ),
        this.normalizeLists = !this.tags.some(i => {
            if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
                return !1;
            let s = e.nodes[i.node];
            return s.contentMatch.matchType(s)
        }
        )
    }
    parse(e, t={}) {
        let n = new Tr(this,t,!1);
        return n.addAll(e, I.none, t.from, t.to),
        n.finish()
    }
    parseSlice(e, t={}) {
        let n = new Tr(this,t,!0);
        return n.addAll(e, I.none, t.from, t.to),
        x.maxOpen(n.finish())
    }
    matchTag(e, t, n) {
        for (let i = n ? this.tags.indexOf(n) + 1 : 0; i < this.tags.length; i++) {
            let s = this.tags[i];
            if ($o(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
                if (s.getAttrs) {
                    let o = s.getAttrs(e);
                    if (o === !1)
                        continue;
                    s.attrs = o || void 0
                }
                return s
            }
        }
    }
    matchStyle(e, t, n, i) {
        for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
            let o = this.styles[s]
              , l = o.style;
            if (!(l.indexOf(e) != 0 || o.context && !n.matchesContext(o.context) || l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
                if (o.getAttrs) {
                    let a = o.getAttrs(t);
                    if (a === !1)
                        continue;
                    o.attrs = a || void 0
                }
                return o
            }
        }
    }
    static schemaRules(e) {
        let t = [];
        function n(i) {
            let s = i.priority == null ? 50 : i.priority
              , o = 0;
            for (; o < t.length; o++) {
                let l = t[o];
                if ((l.priority == null ? 50 : l.priority) < s)
                    break
            }
            t.splice(o, 0, i)
        }
        for (let i in e.marks) {
            let s = e.marks[i].spec.parseDOM;
            s && s.forEach(o => {
                n(o = Nr(o)),
                o.mark || o.ignore || o.clearMark || (o.mark = i)
            }
            )
        }
        for (let i in e.nodes) {
            let s = e.nodes[i].spec.parseDOM;
            s && s.forEach(o => {
                n(o = Nr(o)),
                o.node || o.ignore || o.mark || (o.node = i)
            }
            )
        }
        return t
    }
    static fromSchema(e) {
        return e.cached.domParser || (e.cached.domParser = new we(e,we.schemaRules(e)))
    }
}
const qi = {
    address: !0,
    article: !0,
    aside: !0,
    blockquote: !0,
    canvas: !0,
    dd: !0,
    div: !0,
    dl: !0,
    fieldset: !0,
    figcaption: !0,
    figure: !0,
    footer: !0,
    form: !0,
    h1: !0,
    h2: !0,
    h3: !0,
    h4: !0,
    h5: !0,
    h6: !0,
    header: !0,
    hgroup: !0,
    hr: !0,
    li: !0,
    noscript: !0,
    ol: !0,
    output: !0,
    p: !0,
    pre: !0,
    section: !0,
    table: !0,
    tfoot: !0,
    ul: !0
}
  , Lo = {
    head: !0,
    noscript: !0,
    object: !0,
    script: !0,
    style: !0,
    title: !0
}
  , Ki = {
    ol: !0,
    ul: !0
}
  , gt = 1
  , vn = 2
  , ut = 4;
function Or(r, e, t) {
    return e != null ? (e ? gt : 0) | (e === "full" ? vn : 0) : r && r.whitespace == "pre" ? gt | vn : t & ~ut
}
class Nt {
    constructor(e, t, n, i, s, o) {
        this.type = e,
        this.attrs = t,
        this.marks = n,
        this.solid = i,
        this.options = o,
        this.content = [],
        this.activeMarks = I.none,
        this.match = s || (o & ut ? null : e.contentMatch)
    }
    findWrapping(e) {
        if (!this.match) {
            if (!this.type)
                return [];
            let t = this.type.contentMatch.fillBefore(b.from(e));
            if (t)
                this.match = this.type.contentMatch.matchFragment(t);
            else {
                let n = this.type.contentMatch, i;
                return (i = n.findWrapping(e.type)) ? (this.match = n,
                i) : null
            }
        }
        return this.match.findWrapping(e.type)
    }
    finish(e) {
        if (!(this.options & gt)) {
            let n = this.content[this.content.length - 1], i;
            if (n && n.isText && (i = /[ \t\r\n\u000c]+$/.exec(n.text))) {
                let s = n;
                n.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length))
            }
        }
        let t = b.from(this.content);
        return !e && this.match && (t = t.append(this.match.fillBefore(b.empty, !0))),
        this.type ? this.type.create(this.attrs, t, this.marks) : t
    }
    inlineContext(e) {
        return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !qi.hasOwnProperty(e.parentNode.nodeName.toLowerCase())
    }
}
class Tr {
    constructor(e, t, n) {
        this.parser = e,
        this.options = t,
        this.isOpen = n,
        this.open = 0,
        this.localPreserveWS = !1;
        let i = t.topNode, s, o = Or(null, t.preserveWhitespace, 0) | (n ? ut : 0);
        i ? s = new Nt(i.type,i.attrs,I.none,!0,t.topMatch || i.type.contentMatch,o) : n ? s = new Nt(null,null,I.none,!0,null,o) : s = new Nt(e.schema.topNodeType,null,I.none,!0,null,o),
        this.nodes = [s],
        this.find = t.findPositions,
        this.needsBlock = !1
    }
    get top() {
        return this.nodes[this.open]
    }
    addDOM(e, t) {
        e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t)
    }
    addTextNode(e, t) {
        let n = e.nodeValue
          , i = this.top
          , s = i.options & vn ? "full" : this.localPreserveWS || (i.options & gt) > 0;
        if (s === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
            if (s)
                s !== "full" ? n = n.replace(/\r?\n|\r/g, " ") : n = n.replace(/\r\n?/g, `
`);
            else if (n = n.replace(/[ \t\r\n\u000c]+/g, " "),
            /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
                let o = i.content[i.content.length - 1]
                  , l = e.previousSibling;
                (!o || l && l.nodeName == "BR" || o.isText && /[ \t\r\n\u000c]$/.test(o.text)) && (n = n.slice(1))
            }
            n && this.insertNode(this.parser.schema.text(n), t, !/\S/.test(n)),
            this.findInText(e)
        } else
            this.findInside(e)
    }
    addElement(e, t, n) {
        let i = this.localPreserveWS
          , s = this.top;
        (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
        let o = e.nodeName.toLowerCase(), l;
        Ki.hasOwnProperty(o) && this.parser.normalizeLists && Vo(e);
        let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, n));
        e: if (a ? a.ignore : Lo.hasOwnProperty(o))
            this.findInside(e),
            this.ignoreFallback(e, t);
        else if (!a || a.skip || a.closeParent) {
            a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
            let c, d = this.needsBlock;
            if (qi.hasOwnProperty(o))
                s.content.length && s.content[0].isInline && this.open && (this.open--,
                s = this.top),
                c = !0,
                s.type || (this.needsBlock = !0);
            else if (!e.firstChild) {
                this.leafFallback(e, t);
                break e
            }
            let f = a && a.skip ? t : this.readStyles(e, t);
            f && this.addAll(e, f),
            c && this.sync(s),
            this.needsBlock = d
        } else {
            let c = this.readStyles(e, t);
            c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0)
        }
        this.localPreserveWS = i
    }
    leafFallback(e, t) {
        e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t)
    }
    ignoreFallback(e, t) {
        e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0)
    }
    readStyles(e, t) {
        let n = e.style;
        if (n && n.length)
            for (let i = 0; i < this.parser.matchedStyles.length; i++) {
                let s = this.parser.matchedStyles[i]
                  , o = n.getPropertyValue(s);
                if (o)
                    for (let l = void 0; ; ) {
                        let a = this.parser.matchStyle(s, o, this, l);
                        if (!a)
                            break;
                        if (a.ignore)
                            return null;
                        if (a.clearMark ? t = t.filter(c => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)),
                        a.consuming === !1)
                            l = a;
                        else
                            break
                    }
            }
        return t
    }
    addElementByRule(e, t, n, i) {
        let s, o;
        if (t.node)
            if (o = this.parser.schema.nodes[t.node],
            o.isLeaf)
                this.insertNode(o.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
            else {
                let a = this.enter(o, t.attrs || null, n, t.preserveWhitespace);
                a && (s = !0,
                n = a)
            }
        else {
            let a = this.parser.schema.marks[t.mark];
            n = n.concat(a.create(t.attrs))
        }
        let l = this.top;
        if (o && o.isLeaf)
            this.findInside(e);
        else if (i)
            this.addElement(e, n, i);
        else if (t.getContent)
            this.findInside(e),
            t.getContent(e, this.parser.schema).forEach(a => this.insertNode(a, n, !1));
        else {
            let a = e;
            typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement),
            this.findAround(e, a, !0),
            this.addAll(a, n),
            this.findAround(e, a, !1)
        }
        s && this.sync(l) && this.open--
    }
    addAll(e, t, n, i) {
        let s = n || 0;
        for (let o = n ? e.childNodes[n] : e.firstChild, l = i == null ? null : e.childNodes[i]; o != l; o = o.nextSibling,
        ++s)
            this.findAtPoint(e, s),
            this.addDOM(o, t);
        this.findAtPoint(e, s)
    }
    findPlace(e, t, n) {
        let i, s;
        for (let o = this.open, l = 0; o >= 0; o--) {
            let a = this.nodes[o]
              , c = a.findWrapping(e);
            if (c && (!i || i.length > c.length + l) && (i = c,
            s = a,
            !c.length))
                break;
            if (a.solid) {
                if (n)
                    break;
                l += 2
            }
        }
        if (!i)
            return null;
        this.sync(s);
        for (let o = 0; o < i.length; o++)
            t = this.enterInner(i[o], null, t, !1);
        return t
    }
    insertNode(e, t, n) {
        if (e.isInline && this.needsBlock && !this.top.type) {
            let s = this.textblockFromContext();
            s && (t = this.enterInner(s, null, t))
        }
        let i = this.findPlace(e, t, n);
        if (i) {
            this.closeExtra();
            let s = this.top;
            s.match && (s.match = s.match.matchType(e.type));
            let o = I.none;
            for (let l of i.concat(e.marks))
                (s.type ? s.type.allowsMarkType(l.type) : Er(l.type, e.type)) && (o = l.addToSet(o));
            return s.content.push(e.mark(o)),
            !0
        }
        return !1
    }
    enter(e, t, n, i) {
        let s = this.findPlace(e.create(t), n, !1);
        return s && (s = this.enterInner(e, t, n, !0, i)),
        s
    }
    enterInner(e, t, n, i=!1, s) {
        this.closeExtra();
        let o = this.top;
        o.match = o.match && o.match.matchType(e);
        let l = Or(e, s, o.options);
        o.options & ut && o.content.length == 0 && (l |= ut);
        let a = I.none;
        return n = n.filter(c => (o.type ? o.type.allowsMarkType(c.type) : Er(c.type, e)) ? (a = c.addToSet(a),
        !1) : !0),
        this.nodes.push(new Nt(e,t,a,i,null,l)),
        this.open++,
        n
    }
    closeExtra(e=!1) {
        let t = this.nodes.length - 1;
        if (t > this.open) {
            for (; t > this.open; t--)
                this.nodes[t - 1].content.push(this.nodes[t].finish(e));
            this.nodes.length = this.open + 1
        }
    }
    finish() {
        return this.open = 0,
        this.closeExtra(this.isOpen),
        this.nodes[0].finish(!!(this.isOpen || this.options.topOpen))
    }
    sync(e) {
        for (let t = this.open; t >= 0; t--) {
            if (this.nodes[t] == e)
                return this.open = t,
                !0;
            this.localPreserveWS && (this.nodes[t].options |= gt)
        }
        return !1
    }
    get currentPos() {
        this.closeExtra();
        let e = 0;
        for (let t = this.open; t >= 0; t--) {
            let n = this.nodes[t].content;
            for (let i = n.length - 1; i >= 0; i--)
                e += n[i].nodeSize;
            t && e++
        }
        return e
    }
    findAtPoint(e, t) {
        if (this.find)
            for (let n = 0; n < this.find.length; n++)
                this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos)
    }
    findInside(e) {
        if (this.find)
            for (let t = 0; t < this.find.length; t++)
                this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos)
    }
    findAround(e, t, n) {
        if (e != t && this.find)
            for (let i = 0; i < this.find.length; i++)
                this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (n ? 2 : 4) && (this.find[i].pos = this.currentPos)
    }
    findInText(e) {
        if (this.find)
            for (let t = 0; t < this.find.length; t++)
                this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset))
    }
    matchesContext(e) {
        if (e.indexOf("|") > -1)
            return e.split(/\s*\|\s*/).some(this.matchesContext, this);
        let t = e.split("/")
          , n = this.options.context
          , i = !this.isOpen && (!n || n.parent.type == this.nodes[0].type)
          , s = -(n ? n.depth + 1 : 0) + (i ? 0 : 1)
          , o = (l, a) => {
            for (; l >= 0; l--) {
                let c = t[l];
                if (c == "") {
                    if (l == t.length - 1 || l == 0)
                        continue;
                    for (; a >= s; a--)
                        if (o(l - 1, a))
                            return !0;
                    return !1
                } else {
                    let d = a > 0 || a == 0 && i ? this.nodes[a].type : n && a >= s ? n.node(a - s).type : null;
                    if (!d || d.name != c && !d.isInGroup(c))
                        return !1;
                    a--
                }
            }
            return !0
        }
        ;
        return o(t.length - 1, this.open)
    }
    textblockFromContext() {
        let e = this.options.context;
        if (e)
            for (let t = e.depth; t >= 0; t--) {
                let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
                if (n && n.isTextblock && n.defaultAttrs)
                    return n
            }
        for (let t in this.parser.schema.nodes) {
            let n = this.parser.schema.nodes[t];
            if (n.isTextblock && n.defaultAttrs)
                return n
        }
    }
}
function Vo(r) {
    for (let e = r.firstChild, t = null; e; e = e.nextSibling) {
        let n = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
        n && Ki.hasOwnProperty(n) && t ? (t.appendChild(e),
        e = t) : n == "li" ? t = e : n && (t = null)
    }
}
function $o(r, e) {
    return (r.matches || r.msMatchesSelector || r.webkitMatchesSelector || r.mozMatchesSelector).call(r, e)
}
function Nr(r) {
    let e = {};
    for (let t in r)
        e[t] = r[t];
    return e
}
function Er(r, e) {
    let t = e.schema.nodes;
    for (let n in t) {
        let i = t[n];
        if (!i.allowsMarkType(r))
            continue;
        let s = []
          , o = l => {
            s.push(l);
            for (let a = 0; a < l.edgeCount; a++) {
                let {type: c, next: d} = l.edge(a);
                if (c == e || s.indexOf(d) < 0 && o(d))
                    return !0
            }
        }
        ;
        if (o(i.contentMatch))
            return !0
    }
}
class Ke {
    constructor(e, t) {
        this.nodes = e,
        this.marks = t
    }
    serializeFragment(e, t={}, n) {
        n || (n = un(t).createDocumentFragment());
        let i = n
          , s = [];
        return e.forEach(o => {
            if (s.length || o.marks.length) {
                let l = 0
                  , a = 0;
                for (; l < s.length && a < o.marks.length; ) {
                    let c = o.marks[a];
                    if (!this.marks[c.type.name]) {
                        a++;
                        continue
                    }
                    if (!c.eq(s[l][0]) || c.type.spec.spanning === !1)
                        break;
                    l++,
                    a++
                }
                for (; l < s.length; )
                    i = s.pop()[1];
                for (; a < o.marks.length; ) {
                    let c = o.marks[a++]
                      , d = this.serializeMark(c, o.isInline, t);
                    d && (s.push([c, i]),
                    i.appendChild(d.dom),
                    i = d.contentDOM || d.dom)
                }
            }
            i.appendChild(this.serializeNodeInner(o, t))
        }
        ),
        n
    }
    serializeNodeInner(e, t) {
        let {dom: n, contentDOM: i} = Rt(un(t), this.nodes[e.type.name](e), null, e.attrs);
        if (i) {
            if (e.isLeaf)
                throw new RangeError("Content hole not allowed in a leaf node spec");
            this.serializeFragment(e.content, t, i)
        }
        return n
    }
    serializeNode(e, t={}) {
        let n = this.serializeNodeInner(e, t);
        for (let i = e.marks.length - 1; i >= 0; i--) {
            let s = this.serializeMark(e.marks[i], e.isInline, t);
            s && ((s.contentDOM || s.dom).appendChild(n),
            n = s.dom)
        }
        return n
    }
    serializeMark(e, t, n={}) {
        let i = this.marks[e.type.name];
        return i && Rt(un(n), i(e, t), null, e.attrs)
    }
    static renderSpec(e, t, n=null, i) {
        return Rt(e, t, n, i)
    }
    static fromSchema(e) {
        return e.cached.domSerializer || (e.cached.domSerializer = new Ke(this.nodesFromSchema(e),this.marksFromSchema(e)))
    }
    static nodesFromSchema(e) {
        let t = Dr(e.nodes);
        return t.text || (t.text = n => n.text),
        t
    }
    static marksFromSchema(e) {
        return Dr(e.marks)
    }
}
function Dr(r) {
    let e = {};
    for (let t in r) {
        let n = r[t].spec.toDOM;
        n && (e[t] = n)
    }
    return e
}
function un(r) {
    return r.document || window.document
}
const Ar = new WeakMap;
function Wo(r) {
    let e = Ar.get(r);
    return e === void 0 && Ar.set(r, e = Ho(r)),
    e
}
function Ho(r) {
    let e = null;
    function t(n) {
        if (n && typeof n == "object")
            if (Array.isArray(n))
                if (typeof n[0] == "string")
                    e || (e = []),
                    e.push(n);
                else
                    for (let i = 0; i < n.length; i++)
                        t(n[i]);
            else
                for (let i in n)
                    t(n[i])
    }
    return t(r),
    e
}
function Rt(r, e, t, n) {
    if (typeof e == "string")
        return {
            dom: r.createTextNode(e)
        };
    if (e.nodeType != null)
        return {
            dom: e
        };
    if (e.dom && e.dom.nodeType != null)
        return e;
    let i = e[0], s;
    if (typeof i != "string")
        throw new RangeError("Invalid array passed to renderSpec");
    if (n && (s = Wo(n)) && s.indexOf(e) > -1)
        throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
    let o = i.indexOf(" ");
    o > 0 && (t = i.slice(0, o),
    i = i.slice(o + 1));
    let l, a = t ? r.createElementNS(t, i) : r.createElement(i), c = e[1], d = 1;
    if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
        d = 2;
        for (let f in c)
            if (c[f] != null) {
                let u = f.indexOf(" ");
                u > 0 ? a.setAttributeNS(f.slice(0, u), f.slice(u + 1), c[f]) : f == "style" && a.style ? a.style.cssText = c[f] : a.setAttribute(f, c[f])
            }
    }
    for (let f = d; f < e.length; f++) {
        let u = e[f];
        if (u === 0) {
            if (f < e.length - 1 || f > d)
                throw new RangeError("Content hole must be the only child of its parent node");
            return {
                dom: a,
                contentDOM: a
            }
        } else {
            let {dom: h, contentDOM: p} = Rt(r, u, t, n);
            if (a.appendChild(h),
            p) {
                if (l)
                    throw new RangeError("Multiple content holes");
                l = p
            }
        }
    }
    return {
        dom: a,
        contentDOM: l
    }
}
const Ui = 65535
  , _i = Math.pow(2, 16);
function jo(r, e) {
    return r + e * _i
}
function Ir(r) {
    return r & Ui
}
function Jo(r) {
    return (r - (r & Ui)) / _i
}
const Gi = 1
  , Yi = 2
  , Pt = 4
  , Xi = 8;
class Rn {
    constructor(e, t, n) {
        this.pos = e,
        this.delInfo = t,
        this.recover = n
    }
    get deleted() {
        return (this.delInfo & Xi) > 0
    }
    get deletedBefore() {
        return (this.delInfo & (Gi | Pt)) > 0
    }
    get deletedAfter() {
        return (this.delInfo & (Yi | Pt)) > 0
    }
    get deletedAcross() {
        return (this.delInfo & Pt) > 0
    }
}
class Z {
    constructor(e, t=!1) {
        if (this.ranges = e,
        this.inverted = t,
        !e.length && Z.empty)
            return Z.empty
    }
    recover(e) {
        let t = 0
          , n = Ir(e);
        if (!this.inverted)
            for (let i = 0; i < n; i++)
                t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
        return this.ranges[n * 3] + t + Jo(e)
    }
    mapResult(e, t=1) {
        return this._map(e, t, !1)
    }
    map(e, t=1) {
        return this._map(e, t, !0)
    }
    _map(e, t, n) {
        let i = 0
          , s = this.inverted ? 2 : 1
          , o = this.inverted ? 1 : 2;
        for (let l = 0; l < this.ranges.length; l += 3) {
            let a = this.ranges[l] - (this.inverted ? i : 0);
            if (a > e)
                break;
            let c = this.ranges[l + s]
              , d = this.ranges[l + o]
              , f = a + c;
            if (e <= f) {
                let u = c ? e == a ? -1 : e == f ? 1 : t : t
                  , h = a + i + (u < 0 ? 0 : d);
                if (n)
                    return h;
                let p = e == (t < 0 ? a : f) ? null : jo(l / 3, e - a)
                  , m = e == a ? Yi : e == f ? Gi : Pt;
                return (t < 0 ? e != a : e != f) && (m |= Xi),
                new Rn(h,m,p)
            }
            i += d - c
        }
        return n ? e + i : new Rn(e + i,0,null)
    }
    touches(e, t) {
        let n = 0
          , i = Ir(t)
          , s = this.inverted ? 2 : 1
          , o = this.inverted ? 1 : 2;
        for (let l = 0; l < this.ranges.length; l += 3) {
            let a = this.ranges[l] - (this.inverted ? n : 0);
            if (a > e)
                break;
            let c = this.ranges[l + s]
              , d = a + c;
            if (e <= d && l == i * 3)
                return !0;
            n += this.ranges[l + o] - c
        }
        return !1
    }
    forEach(e) {
        let t = this.inverted ? 2 : 1
          , n = this.inverted ? 1 : 2;
        for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
            let o = this.ranges[i]
              , l = o - (this.inverted ? s : 0)
              , a = o + (this.inverted ? 0 : s)
              , c = this.ranges[i + t]
              , d = this.ranges[i + n];
            e(l, l + c, a, a + d),
            s += d - c
        }
    }
    invert() {
        return new Z(this.ranges,!this.inverted)
    }
    toString() {
        return (this.inverted ? "-" : "") + JSON.stringify(this.ranges)
    }
    static offset(e) {
        return e == 0 ? Z.empty : new Z(e < 0 ? [0, -e, 0] : [0, 0, e])
    }
}
Z.empty = new Z([]);
class Wt {
    constructor(e, t, n=0, i=e ? e.length : 0) {
        this.mirror = t,
        this.from = n,
        this.to = i,
        this._maps = e || [],
        this.ownData = !(e || t)
    }
    get maps() {
        return this._maps
    }
    slice(e=0, t=this.maps.length) {
        return new Wt(this._maps,this.mirror,e,t)
    }
    appendMap(e, t) {
        this.ownData || (this._maps = this._maps.slice(),
        this.mirror = this.mirror && this.mirror.slice(),
        this.ownData = !0),
        this.to = this._maps.push(e),
        t != null && this.setMirror(this._maps.length - 1, t)
    }
    appendMapping(e) {
        for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
            let i = e.getMirror(t);
            this.appendMap(e._maps[t], i != null && i < t ? n + i : void 0)
        }
    }
    getMirror(e) {
        if (this.mirror) {
            for (let t = 0; t < this.mirror.length; t++)
                if (this.mirror[t] == e)
                    return this.mirror[t + (t % 2 ? -1 : 1)]
        }
    }
    setMirror(e, t) {
        this.mirror || (this.mirror = []),
        this.mirror.push(e, t)
    }
    appendMappingInverted(e) {
        for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
            let i = e.getMirror(t);
            this.appendMap(e._maps[t].invert(), i != null && i > t ? n - i - 1 : void 0)
        }
    }
    invert() {
        let e = new Wt;
        return e.appendMappingInverted(this),
        e
    }
    map(e, t=1) {
        if (this.mirror)
            return this._map(e, t, !0);
        for (let n = this.from; n < this.to; n++)
            e = this._maps[n].map(e, t);
        return e
    }
    mapResult(e, t=1) {
        return this._map(e, t, !1)
    }
    _map(e, t, n) {
        let i = 0;
        for (let s = this.from; s < this.to; s++) {
            let o = this._maps[s]
              , l = o.mapResult(e, t);
            if (l.recover != null) {
                let a = this.getMirror(s);
                if (a != null && a > s && a < this.to) {
                    s = a,
                    e = this._maps[a].recover(l.recover);
                    continue
                }
            }
            i |= l.delInfo,
            e = l.pos
        }
        return n ? e : new Rn(e,i,null)
    }
}
const hn = Object.create(null);
class q {
    getMap() {
        return Z.empty
    }
    merge(e) {
        return null
    }
    static fromJSON(e, t) {
        if (!t || !t.stepType)
            throw new RangeError("Invalid input for Step.fromJSON");
        let n = hn[t.stepType];
        if (!n)
            throw new RangeError(`No step type ${t.stepType} defined`);
        return n.fromJSON(e, t)
    }
    static jsonID(e, t) {
        if (e in hn)
            throw new RangeError("Duplicate use of step JSON ID " + e);
        return hn[e] = t,
        t.prototype.jsonID = e,
        t
    }
}
class R {
    constructor(e, t) {
        this.doc = e,
        this.failed = t
    }
    static ok(e) {
        return new R(e,null)
    }
    static fail(e) {
        return new R(null,e)
    }
    static fromReplace(e, t, n, i) {
        try {
            return R.ok(e.replace(t, n, i))
        } catch (s) {
            if (s instanceof Ft)
                return R.fail(s.message);
            throw s
        }
    }
}
function _n(r, e, t) {
    let n = [];
    for (let i = 0; i < r.childCount; i++) {
        let s = r.child(i);
        s.content.size && (s = s.copy(_n(s.content, e, s))),
        s.isInline && (s = e(s, t, i)),
        n.push(s)
    }
    return b.fromArray(n)
}
class xe extends q {
    constructor(e, t, n) {
        super(),
        this.from = e,
        this.to = t,
        this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to)
          , n = e.resolve(this.from)
          , i = n.node(n.sharedDepth(this.to))
          , s = new x(_n(t.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i),t.openStart,t.openEnd);
        return R.fromReplace(e, this.from, this.to, s)
    }
    invert() {
        return new oe(this.from,this.to,this.mark)
    }
    map(e) {
        let t = e.mapResult(this.from, 1)
          , n = e.mapResult(this.to, -1);
        return t.deleted && n.deleted || t.pos >= n.pos ? null : new xe(t.pos,n.pos,this.mark)
    }
    merge(e) {
        return e instanceof xe && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new xe(Math.min(this.from, e.from),Math.max(this.to, e.to),this.mark) : null
    }
    toJSON() {
        return {
            stepType: "addMark",
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(e, t) {
        if (typeof t.from != "number" || typeof t.to != "number")
            throw new RangeError("Invalid input for AddMarkStep.fromJSON");
        return new xe(t.from,t.to,e.markFromJSON(t.mark))
    }
}
q.jsonID("addMark", xe);
class oe extends q {
    constructor(e, t, n) {
        super(),
        this.from = e,
        this.to = t,
        this.mark = n
    }
    apply(e) {
        let t = e.slice(this.from, this.to)
          , n = new x(_n(t.content, i => i.mark(this.mark.removeFromSet(i.marks)), e),t.openStart,t.openEnd);
        return R.fromReplace(e, this.from, this.to, n)
    }
    invert() {
        return new xe(this.from,this.to,this.mark)
    }
    map(e) {
        let t = e.mapResult(this.from, 1)
          , n = e.mapResult(this.to, -1);
        return t.deleted && n.deleted || t.pos >= n.pos ? null : new oe(t.pos,n.pos,this.mark)
    }
    merge(e) {
        return e instanceof oe && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new oe(Math.min(this.from, e.from),Math.max(this.to, e.to),this.mark) : null
    }
    toJSON() {
        return {
            stepType: "removeMark",
            mark: this.mark.toJSON(),
            from: this.from,
            to: this.to
        }
    }
    static fromJSON(e, t) {
        if (typeof t.from != "number" || typeof t.to != "number")
            throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
        return new oe(t.from,t.to,e.markFromJSON(t.mark))
    }
}
q.jsonID("removeMark", oe);
class Se extends q {
    constructor(e, t) {
        super(),
        this.pos = e,
        this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t)
            return R.fail("No node at mark step's position");
        let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
        return R.fromReplace(e, this.pos, this.pos + 1, new x(b.from(n),0,t.isLeaf ? 0 : 1))
    }
    invert(e) {
        let t = e.nodeAt(this.pos);
        if (t) {
            let n = this.mark.addToSet(t.marks);
            if (n.length == t.marks.length) {
                for (let i = 0; i < t.marks.length; i++)
                    if (!t.marks[i].isInSet(n))
                        return new Se(this.pos,t.marks[i]);
                return new Se(this.pos,this.mark)
            }
        }
        return new He(this.pos,this.mark)
    }
    map(e) {
        let t = e.mapResult(this.pos, 1);
        return t.deletedAfter ? null : new Se(t.pos,this.mark)
    }
    toJSON() {
        return {
            stepType: "addNodeMark",
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(e, t) {
        if (typeof t.pos != "number")
            throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
        return new Se(t.pos,e.markFromJSON(t.mark))
    }
}
q.jsonID("addNodeMark", Se);
class He extends q {
    constructor(e, t) {
        super(),
        this.pos = e,
        this.mark = t
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t)
            return R.fail("No node at mark step's position");
        let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
        return R.fromReplace(e, this.pos, this.pos + 1, new x(b.from(n),0,t.isLeaf ? 0 : 1))
    }
    invert(e) {
        let t = e.nodeAt(this.pos);
        return !t || !this.mark.isInSet(t.marks) ? this : new Se(this.pos,this.mark)
    }
    map(e) {
        let t = e.mapResult(this.pos, 1);
        return t.deletedAfter ? null : new He(t.pos,this.mark)
    }
    toJSON() {
        return {
            stepType: "removeNodeMark",
            pos: this.pos,
            mark: this.mark.toJSON()
        }
    }
    static fromJSON(e, t) {
        if (typeof t.pos != "number")
            throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
        return new He(t.pos,e.markFromJSON(t.mark))
    }
}
q.jsonID("removeNodeMark", He);
class F extends q {
    constructor(e, t, n, i=!1) {
        super(),
        this.from = e,
        this.to = t,
        this.slice = n,
        this.structure = i
    }
    apply(e) {
        return this.structure && Pn(e, this.from, this.to) ? R.fail("Structure replace would overwrite content") : R.fromReplace(e, this.from, this.to, this.slice)
    }
    getMap() {
        return new Z([this.from, this.to - this.from, this.slice.size])
    }
    invert(e) {
        return new F(this.from,this.from + this.slice.size,e.slice(this.from, this.to))
    }
    map(e) {
        let t = e.mapResult(this.from, 1)
          , n = e.mapResult(this.to, -1);
        return t.deletedAcross && n.deletedAcross ? null : new F(t.pos,Math.max(t.pos, n.pos),this.slice,this.structure)
    }
    merge(e) {
        if (!(e instanceof F) || e.structure || this.structure)
            return null;
        if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
            let t = this.slice.size + e.slice.size == 0 ? x.empty : new x(this.slice.content.append(e.slice.content),this.slice.openStart,e.slice.openEnd);
            return new F(this.from,this.to + (e.to - e.from),t,this.structure)
        } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
            let t = this.slice.size + e.slice.size == 0 ? x.empty : new x(e.slice.content.append(this.slice.content),e.slice.openStart,this.slice.openEnd);
            return new F(e.from,this.to,t,this.structure)
        } else
            return null
    }
    toJSON() {
        let e = {
            stepType: "replace",
            from: this.from,
            to: this.to
        };
        return this.slice.size && (e.slice = this.slice.toJSON()),
        this.structure && (e.structure = !0),
        e
    }
    static fromJSON(e, t) {
        if (typeof t.from != "number" || typeof t.to != "number")
            throw new RangeError("Invalid input for ReplaceStep.fromJSON");
        return new F(t.from,t.to,x.fromJSON(e, t.slice),!!t.structure)
    }
}
q.jsonID("replace", F);
class L extends q {
    constructor(e, t, n, i, s, o, l=!1) {
        super(),
        this.from = e,
        this.to = t,
        this.gapFrom = n,
        this.gapTo = i,
        this.slice = s,
        this.insert = o,
        this.structure = l
    }
    apply(e) {
        if (this.structure && (Pn(e, this.from, this.gapFrom) || Pn(e, this.gapTo, this.to)))
            return R.fail("Structure gap-replace would overwrite content");
        let t = e.slice(this.gapFrom, this.gapTo);
        if (t.openStart || t.openEnd)
            return R.fail("Gap is not a flat range");
        let n = this.slice.insertAt(this.insert, t.content);
        return n ? R.fromReplace(e, this.from, this.to, n) : R.fail("Content does not fit in gap")
    }
    getMap() {
        return new Z([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert])
    }
    invert(e) {
        let t = this.gapTo - this.gapFrom;
        return new L(this.from,this.from + this.slice.size + t,this.from + this.insert,this.from + this.insert + t,e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from),this.gapFrom - this.from,this.structure)
    }
    map(e) {
        let t = e.mapResult(this.from, 1)
          , n = e.mapResult(this.to, -1)
          , i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1)
          , s = this.to == this.gapTo ? n.pos : e.map(this.gapTo, 1);
        return t.deletedAcross && n.deletedAcross || i < t.pos || s > n.pos ? null : new L(t.pos,n.pos,i,s,this.slice,this.insert,this.structure)
    }
    toJSON() {
        let e = {
            stepType: "replaceAround",
            from: this.from,
            to: this.to,
            gapFrom: this.gapFrom,
            gapTo: this.gapTo,
            insert: this.insert
        };
        return this.slice.size && (e.slice = this.slice.toJSON()),
        this.structure && (e.structure = !0),
        e
    }
    static fromJSON(e, t) {
        if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
            throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
        return new L(t.from,t.to,t.gapFrom,t.gapTo,x.fromJSON(e, t.slice),t.insert,!!t.structure)
    }
}
q.jsonID("replaceAround", L);
function Pn(r, e, t) {
    let n = r.resolve(e)
      , i = t - e
      , s = n.depth;
    for (; i > 0 && s > 0 && n.indexAfter(s) == n.node(s).childCount; )
        s--,
        i--;
    if (i > 0) {
        let o = n.node(s).maybeChild(n.indexAfter(s));
        for (; i > 0; ) {
            if (!o || o.isLeaf)
                return !0;
            o = o.firstChild,
            i--
        }
    }
    return !1
}
function qo(r, e, t, n) {
    let i = [], s = [], o, l;
    r.doc.nodesBetween(e, t, (a, c, d) => {
        if (!a.isInline)
            return;
        let f = a.marks;
        if (!n.isInSet(f) && d.type.allowsMarkType(n.type)) {
            let u = Math.max(c, e)
              , h = Math.min(c + a.nodeSize, t)
              , p = n.addToSet(f);
            for (let m = 0; m < f.length; m++)
                f[m].isInSet(p) || (o && o.to == u && o.mark.eq(f[m]) ? o.to = h : i.push(o = new oe(u,h,f[m])));
            l && l.to == u ? l.to = h : s.push(l = new xe(u,h,n))
        }
    }
    ),
    i.forEach(a => r.step(a)),
    s.forEach(a => r.step(a))
}
function Ko(r, e, t, n) {
    let i = []
      , s = 0;
    r.doc.nodesBetween(e, t, (o, l) => {
        if (!o.isInline)
            return;
        s++;
        let a = null;
        if (n instanceof Xt) {
            let c = o.marks, d;
            for (; d = n.isInSet(c); )
                (a || (a = [])).push(d),
                c = d.removeFromSet(c)
        } else
            n ? n.isInSet(o.marks) && (a = [n]) : a = o.marks;
        if (a && a.length) {
            let c = Math.min(l + o.nodeSize, t);
            for (let d = 0; d < a.length; d++) {
                let f = a[d], u;
                for (let h = 0; h < i.length; h++) {
                    let p = i[h];
                    p.step == s - 1 && f.eq(i[h].style) && (u = p)
                }
                u ? (u.to = c,
                u.step = s) : i.push({
                    style: f,
                    from: Math.max(l, e),
                    to: c,
                    step: s
                })
            }
        }
    }
    ),
    i.forEach(o => r.step(new oe(o.from,o.to,o.style)))
}
function Gn(r, e, t, n=t.contentMatch, i=!0) {
    let s = r.doc.nodeAt(e)
      , o = []
      , l = e + 1;
    for (let a = 0; a < s.childCount; a++) {
        let c = s.child(a)
          , d = l + c.nodeSize
          , f = n.matchType(c.type);
        if (!f)
            o.push(new F(l,d,x.empty));
        else {
            n = f;
            for (let u = 0; u < c.marks.length; u++)
                t.allowsMarkType(c.marks[u].type) || r.step(new oe(l,d,c.marks[u]));
            if (i && c.isText && t.whitespace != "pre") {
                let u, h = /\r?\n|\r/g, p;
                for (; u = h.exec(c.text); )
                    p || (p = new x(b.from(t.schema.text(" ", t.allowedMarks(c.marks))),0,0)),
                    o.push(new F(l + u.index,l + u.index + u[0].length,p))
            }
        }
        l = d
    }
    if (!n.validEnd) {
        let a = n.fillBefore(b.empty, !0);
        r.replace(l, l, new x(a,0,0))
    }
    for (let a = o.length - 1; a >= 0; a--)
        r.step(o[a])
}
function Uo(r, e, t) {
    return (e == 0 || r.canReplace(e, r.childCount)) && (t == r.childCount || r.canReplace(0, t))
}
function ot(r) {
    let t = r.parent.content.cutByIndex(r.startIndex, r.endIndex);
    for (let n = r.depth; ; --n) {
        let i = r.$from.node(n)
          , s = r.$from.index(n)
          , o = r.$to.indexAfter(n);
        if (n < r.depth && i.canReplace(s, o, t))
            return n;
        if (n == 0 || i.type.spec.isolating || !Uo(i, s, o))
            break
    }
    return null
}
function _o(r, e, t) {
    let {$from: n, $to: i, depth: s} = e
      , o = n.before(s + 1)
      , l = i.after(s + 1)
      , a = o
      , c = l
      , d = b.empty
      , f = 0;
    for (let p = s, m = !1; p > t; p--)
        m || n.index(p) > 0 ? (m = !0,
        d = b.from(n.node(p).copy(d)),
        f++) : a--;
    let u = b.empty
      , h = 0;
    for (let p = s, m = !1; p > t; p--)
        m || i.after(p + 1) < i.end(p) ? (m = !0,
        u = b.from(i.node(p).copy(u)),
        h++) : c++;
    r.step(new L(a,c,o,l,new x(d.append(u),f,h),d.size - f,!0))
}
function Yn(r, e, t=null, n=r) {
    let i = Go(r, e)
      , s = i && Yo(n, e);
    return s ? i.map(vr).concat({
        type: e,
        attrs: t
    }).concat(s.map(vr)) : null
}
function vr(r) {
    return {
        type: r,
        attrs: null
    }
}
function Go(r, e) {
    let {parent: t, startIndex: n, endIndex: i} = r
      , s = t.contentMatchAt(n).findWrapping(e);
    if (!s)
        return null;
    let o = s.length ? s[0] : e;
    return t.canReplaceWith(n, i, o) ? s : null
}
function Yo(r, e) {
    let {parent: t, startIndex: n, endIndex: i} = r
      , s = t.child(n)
      , o = e.contentMatch.findWrapping(s.type);
    if (!o)
        return null;
    let a = (o.length ? o[o.length - 1] : e).contentMatch;
    for (let c = n; a && c < i; c++)
        a = a.matchType(t.child(c).type);
    return !a || !a.validEnd ? null : o
}
function Xo(r, e, t) {
    let n = b.empty;
    for (let o = t.length - 1; o >= 0; o--) {
        if (n.size) {
            let l = t[o].type.contentMatch.matchFragment(n);
            if (!l || !l.validEnd)
                throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper")
        }
        n = b.from(t[o].type.create(t[o].attrs, n))
    }
    let i = e.start
      , s = e.end;
    r.step(new L(i,s,i,s,new x(n,0,0),t.length,!0))
}
function Zo(r, e, t, n, i) {
    if (!n.isTextblock)
        throw new RangeError("Type given to setBlockType should be a textblock");
    let s = r.steps.length;
    r.doc.nodesBetween(e, t, (o, l) => {
        let a = typeof i == "function" ? i(o) : i;
        if (o.isTextblock && !o.hasMarkup(n, a) && Qo(r.doc, r.mapping.slice(s).map(l), n)) {
            let c = null;
            if (n.schema.linebreakReplacement) {
                let h = n.whitespace == "pre"
                  , p = !!n.contentMatch.matchType(n.schema.linebreakReplacement);
                h && !p ? c = !1 : !h && p && (c = !0)
            }
            c === !1 && Qi(r, o, l, s),
            Gn(r, r.mapping.slice(s).map(l, 1), n, void 0, c === null);
            let d = r.mapping.slice(s)
              , f = d.map(l, 1)
              , u = d.map(l + o.nodeSize, 1);
            return r.step(new L(f,u,f + 1,u - 1,new x(b.from(n.create(a, null, o.marks)),0,0),1,!0)),
            c === !0 && Zi(r, o, l, s),
            !1
        }
    }
    )
}
function Zi(r, e, t, n) {
    e.forEach( (i, s) => {
        if (i.isText) {
            let o, l = /\r?\n|\r/g;
            for (; o = l.exec(i.text); ) {
                let a = r.mapping.slice(n).map(t + 1 + s + o.index);
                r.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create())
            }
        }
    }
    )
}
function Qi(r, e, t, n) {
    e.forEach( (i, s) => {
        if (i.type == i.type.schema.linebreakReplacement) {
            let o = r.mapping.slice(n).map(t + 1 + s);
            r.replaceWith(o, o + 1, e.type.schema.text(`
`))
        }
    }
    )
}
function Qo(r, e, t) {
    let n = r.resolve(e)
      , i = n.index();
    return n.parent.canReplaceWith(i, i + 1, t)
}
function el(r, e, t, n, i) {
    let s = r.doc.nodeAt(e);
    if (!s)
        throw new RangeError("No node at given position");
    t || (t = s.type);
    let o = t.create(n, null, i || s.marks);
    if (s.isLeaf)
        return r.replaceWith(e, e + s.nodeSize, o);
    if (!t.validContent(s.content))
        throw new RangeError("Invalid content for node type " + t.name);
    r.step(new L(e,e + s.nodeSize,e + 1,e + s.nodeSize - 1,new x(b.from(o),0,0),1,!0))
}
function pe(r, e, t=1, n) {
    let i = r.resolve(e)
      , s = i.depth - t
      , o = n && n[n.length - 1] || i.parent;
    if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
        return !1;
    for (let c = i.depth - 1, d = t - 2; c > s; c--,
    d--) {
        let f = i.node(c)
          , u = i.index(c);
        if (f.type.spec.isolating)
            return !1;
        let h = f.content.cutByIndex(u, f.childCount)
          , p = n && n[d + 1];
        p && (h = h.replaceChild(0, p.type.create(p.attrs)));
        let m = n && n[d] || f;
        if (!f.canReplace(u + 1, f.childCount) || !m.type.validContent(h))
            return !1
    }
    let l = i.indexAfter(s)
      , a = n && n[0];
    return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type)
}
function tl(r, e, t=1, n) {
    let i = r.doc.resolve(e)
      , s = b.empty
      , o = b.empty;
    for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--,
    c--) {
        s = b.from(i.node(l).copy(s));
        let d = n && n[c];
        o = b.from(d ? d.type.create(d.attrs, o) : i.node(l).copy(o))
    }
    r.step(new F(e,e,new x(s.append(o),t,t),!0))
}
function De(r, e) {
    let t = r.resolve(e)
      , n = t.index();
    return es(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(n, n + 1)
}
function nl(r, e) {
    e.content.size || r.type.compatibleContent(e.type);
    let t = r.contentMatchAt(r.childCount)
      , {linebreakReplacement: n} = r.type.schema;
    for (let i = 0; i < e.childCount; i++) {
        let s = e.child(i)
          , o = s.type == n ? r.type.schema.nodes.text : s.type;
        if (t = t.matchType(o),
        !t || !r.type.allowsMarks(s.marks))
            return !1
    }
    return t.validEnd
}
function es(r, e) {
    return !!(r && e && !r.isLeaf && nl(r, e))
}
function Zt(r, e, t=-1) {
    let n = r.resolve(e);
    for (let i = n.depth; ; i--) {
        let s, o, l = n.index(i);
        if (i == n.depth ? (s = n.nodeBefore,
        o = n.nodeAfter) : t > 0 ? (s = n.node(i + 1),
        l++,
        o = n.node(i).maybeChild(l)) : (s = n.node(i).maybeChild(l - 1),
        o = n.node(i + 1)),
        s && !s.isTextblock && es(s, o) && n.node(i).canReplace(l, l + 1))
            return e;
        if (i == 0)
            break;
        e = t < 0 ? n.before(i) : n.after(i)
    }
}
function rl(r, e, t) {
    let n = null
      , {linebreakReplacement: i} = r.doc.type.schema
      , s = r.doc.resolve(e - t)
      , o = s.node().type;
    if (i && o.inlineContent) {
        let d = o.whitespace == "pre"
          , f = !!o.contentMatch.matchType(i);
        d && !f ? n = !1 : !d && f && (n = !0)
    }
    let l = r.steps.length;
    if (n === !1) {
        let d = r.doc.resolve(e + t);
        Qi(r, d.node(), d.before(), l)
    }
    o.inlineContent && Gn(r, e + t - 1, o, s.node().contentMatchAt(s.index()), n == null);
    let a = r.mapping.slice(l)
      , c = a.map(e - t);
    if (r.step(new F(c,a.map(e + t, -1),x.empty,!0)),
    n === !0) {
        let d = r.doc.resolve(c);
        Zi(r, d.node(), d.before(), r.steps.length)
    }
    return r
}
function il(r, e, t) {
    let n = r.resolve(e);
    if (n.parent.canReplaceWith(n.index(), n.index(), t))
        return e;
    if (n.parentOffset == 0)
        for (let i = n.depth - 1; i >= 0; i--) {
            let s = n.index(i);
            if (n.node(i).canReplaceWith(s, s, t))
                return n.before(i + 1);
            if (s > 0)
                return null
        }
    if (n.parentOffset == n.parent.content.size)
        for (let i = n.depth - 1; i >= 0; i--) {
            let s = n.indexAfter(i);
            if (n.node(i).canReplaceWith(s, s, t))
                return n.after(i + 1);
            if (s < n.node(i).childCount)
                return null
        }
    return null
}
function sl(r, e, t) {
    let n = r.resolve(e);
    if (!t.content.size)
        return e;
    let i = t.content;
    for (let s = 0; s < t.openStart; s++)
        i = i.firstChild.content;
    for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
        for (let o = n.depth; o >= 0; o--) {
            let l = o == n.depth ? 0 : n.pos <= (n.start(o + 1) + n.end(o + 1)) / 2 ? -1 : 1
              , a = n.index(o) + (l > 0 ? 1 : 0)
              , c = n.node(o)
              , d = !1;
            if (s == 1)
                d = c.canReplace(a, a, i);
            else {
                let f = c.contentMatchAt(a).findWrapping(i.firstChild.type);
                d = f && c.canReplaceWith(a, a, f[0])
            }
            if (d)
                return l == 0 ? n.pos : l < 0 ? n.before(o + 1) : n.after(o + 1)
        }
    return null
}
function Qt(r, e, t=e, n=x.empty) {
    if (e == t && !n.size)
        return null;
    let i = r.resolve(e)
      , s = r.resolve(t);
    return ts(i, s, n) ? new F(e,t,n) : new ol(i,s,n).fit()
}
function ts(r, e, t) {
    return !t.openStart && !t.openEnd && r.start() == e.start() && r.parent.canReplace(r.index(), e.index(), t.content)
}
class ol {
    constructor(e, t, n) {
        this.$from = e,
        this.$to = t,
        this.unplaced = n,
        this.frontier = [],
        this.placed = b.empty;
        for (let i = 0; i <= e.depth; i++) {
            let s = e.node(i);
            this.frontier.push({
                type: s.type,
                match: s.contentMatchAt(e.indexAfter(i))
            })
        }
        for (let i = e.depth; i > 0; i--)
            this.placed = b.from(e.node(i).copy(this.placed))
    }
    get depth() {
        return this.frontier.length - 1
    }
    fit() {
        for (; this.unplaced.size; ) {
            let c = this.findFittable();
            c ? this.placeNodes(c) : this.openMore() || this.dropNode()
        }
        let e = this.mustMoveInline()
          , t = this.placed.size - this.depth - this.$from.depth
          , n = this.$from
          , i = this.close(e < 0 ? this.$to : n.doc.resolve(e));
        if (!i)
            return null;
        let s = this.placed
          , o = n.depth
          , l = i.depth;
        for (; o && l && s.childCount == 1; )
            s = s.firstChild.content,
            o--,
            l--;
        let a = new x(s,o,l);
        return e > -1 ? new L(n.pos,e,this.$to.pos,this.$to.end(),a,t) : a.size || n.pos != this.$to.pos ? new F(n.pos,i.pos,a) : null
    }
    findFittable() {
        let e = this.unplaced.openStart;
        for (let t = this.unplaced.content, n = 0, i = this.unplaced.openEnd; n < e; n++) {
            let s = t.firstChild;
            if (t.childCount > 1 && (i = 0),
            s.type.spec.isolating && i <= n) {
                e = n;
                break
            }
            t = s.content
        }
        for (let t = 1; t <= 2; t++)
            for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
                let i, s = null;
                n ? (s = pn(this.unplaced.content, n - 1).firstChild,
                i = s.content) : i = this.unplaced.content;
                let o = i.firstChild;
                for (let l = this.depth; l >= 0; l--) {
                    let {type: a, match: c} = this.frontier[l], d, f = null;
                    if (t == 1 && (o ? c.matchType(o.type) || (f = c.fillBefore(b.from(o), !1)) : s && a.compatibleContent(s.type)))
                        return {
                            sliceDepth: n,
                            frontierDepth: l,
                            parent: s,
                            inject: f
                        };
                    if (t == 2 && o && (d = c.findWrapping(o.type)))
                        return {
                            sliceDepth: n,
                            frontierDepth: l,
                            parent: s,
                            wrap: d
                        };
                    if (s && c.matchType(s.type))
                        break
                }
            }
    }
    openMore() {
        let {content: e, openStart: t, openEnd: n} = this.unplaced
          , i = pn(e, t);
        return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new x(e,t + 1,Math.max(n, i.size + t >= e.size - n ? t + 1 : 0)),
        !0)
    }
    dropNode() {
        let {content: e, openStart: t, openEnd: n} = this.unplaced
          , i = pn(e, t);
        if (i.childCount <= 1 && t > 0) {
            let s = e.size - t <= t + i.size;
            this.unplaced = new x(at(e, t - 1, 1),t - 1,s ? t - 1 : n)
        } else
            this.unplaced = new x(at(e, t, 1),t,n)
    }
    placeNodes({sliceDepth: e, frontierDepth: t, parent: n, inject: i, wrap: s}) {
        for (; this.depth > t; )
            this.closeFrontierNode();
        if (s)
            for (let m = 0; m < s.length; m++)
                this.openFrontierNode(s[m]);
        let o = this.unplaced
          , l = n ? n.content : o.content
          , a = o.openStart - e
          , c = 0
          , d = []
          , {match: f, type: u} = this.frontier[t];
        if (i) {
            for (let m = 0; m < i.childCount; m++)
                d.push(i.child(m));
            f = f.matchFragment(i)
        }
        let h = l.size + e - (o.content.size - o.openEnd);
        for (; c < l.childCount; ) {
            let m = l.child(c)
              , g = f.matchType(m.type);
            if (!g)
                break;
            c++,
            (c > 1 || a == 0 || m.content.size) && (f = g,
            d.push(ns(m.mark(u.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)))
        }
        let p = c == l.childCount;
        p || (h = -1),
        this.placed = ct(this.placed, t, b.from(d)),
        this.frontier[t].match = f,
        p && h < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
        for (let m = 0, g = l; m < h; m++) {
            let y = g.lastChild;
            this.frontier.push({
                type: y.type,
                match: y.contentMatchAt(y.childCount)
            }),
            g = y.content
        }
        this.unplaced = p ? e == 0 ? x.empty : new x(at(o.content, e - 1, 1),e - 1,h < 0 ? o.openEnd : e - 1) : new x(at(o.content, e, c),o.openStart,o.openEnd)
    }
    mustMoveInline() {
        if (!this.$to.parent.isTextblock)
            return -1;
        let e = this.frontier[this.depth], t;
        if (!e.type.isTextblock || !mn(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
            return -1;
        let {depth: n} = this.$to
          , i = this.$to.after(n);
        for (; n > 1 && i == this.$to.end(--n); )
            ++i;
        return i
    }
    findCloseLevel(e) {
        e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
            let {match: n, type: i} = this.frontier[t]
              , s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1))
              , o = mn(e, t, i, n, s);
            if (o) {
                for (let l = t - 1; l >= 0; l--) {
                    let {match: a, type: c} = this.frontier[l]
                      , d = mn(e, l, c, a, !0);
                    if (!d || d.childCount)
                        continue e
                }
                return {
                    depth: t,
                    fit: o,
                    move: s ? e.doc.resolve(e.after(t + 1)) : e
                }
            }
        }
    }
    close(e) {
        let t = this.findCloseLevel(e);
        if (!t)
            return null;
        for (; this.depth > t.depth; )
            this.closeFrontierNode();
        t.fit.childCount && (this.placed = ct(this.placed, t.depth, t.fit)),
        e = t.move;
        for (let n = t.depth + 1; n <= e.depth; n++) {
            let i = e.node(n)
              , s = i.type.contentMatch.fillBefore(i.content, !0, e.index(n));
            this.openFrontierNode(i.type, i.attrs, s)
        }
        return e
    }
    openFrontierNode(e, t=null, n) {
        let i = this.frontier[this.depth];
        i.match = i.match.matchType(e),
        this.placed = ct(this.placed, this.depth, b.from(e.create(t, n))),
        this.frontier.push({
            type: e,
            match: e.contentMatch
        })
    }
    closeFrontierNode() {
        let t = this.frontier.pop().match.fillBefore(b.empty, !0);
        t.childCount && (this.placed = ct(this.placed, this.frontier.length, t))
    }
}
function at(r, e, t) {
    return e == 0 ? r.cutByIndex(t, r.childCount) : r.replaceChild(0, r.firstChild.copy(at(r.firstChild.content, e - 1, t)))
}
function ct(r, e, t) {
    return e == 0 ? r.append(t) : r.replaceChild(r.childCount - 1, r.lastChild.copy(ct(r.lastChild.content, e - 1, t)))
}
function pn(r, e) {
    for (let t = 0; t < e; t++)
        r = r.firstChild.content;
    return r
}
function ns(r, e, t) {
    if (e <= 0)
        return r;
    let n = r.content;
    return e > 1 && (n = n.replaceChild(0, ns(n.firstChild, e - 1, n.childCount == 1 ? t - 1 : 0))),
    e > 0 && (n = r.type.contentMatch.fillBefore(n).append(n),
    t <= 0 && (n = n.append(r.type.contentMatch.matchFragment(n).fillBefore(b.empty, !0)))),
    r.copy(n)
}
function mn(r, e, t, n, i) {
    let s = r.node(e)
      , o = i ? r.indexAfter(e) : r.index(e);
    if (o == s.childCount && !t.compatibleContent(s.type))
        return null;
    let l = n.fillBefore(s.content, !0, o);
    return l && !ll(t, s.content, o) ? l : null
}
function ll(r, e, t) {
    for (let n = t; n < e.childCount; n++)
        if (!r.allowsMarks(e.child(n).marks))
            return !0;
    return !1
}
function al(r) {
    return r.spec.defining || r.spec.definingForContent
}
function cl(r, e, t, n) {
    if (!n.size)
        return r.deleteRange(e, t);
    let i = r.doc.resolve(e)
      , s = r.doc.resolve(t);
    if (ts(i, s, n))
        return r.step(new F(e,t,n));
    let o = is(i, r.doc.resolve(t));
    o[o.length - 1] == 0 && o.pop();
    let l = -(i.depth + 1);
    o.unshift(l);
    for (let u = i.depth, h = i.pos - 1; u > 0; u--,
    h--) {
        let p = i.node(u).type.spec;
        if (p.defining || p.definingAsContext || p.isolating)
            break;
        o.indexOf(u) > -1 ? l = u : i.before(u) == h && o.splice(1, 0, -u)
    }
    let a = o.indexOf(l)
      , c = []
      , d = n.openStart;
    for (let u = n.content, h = 0; ; h++) {
        let p = u.firstChild;
        if (c.push(p),
        h == n.openStart)
            break;
        u = p.content
    }
    for (let u = d - 1; u >= 0; u--) {
        let h = c[u]
          , p = al(h.type);
        if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
            d = u;
        else if (p || !h.type.isTextblock)
            break
    }
    for (let u = n.openStart; u >= 0; u--) {
        let h = (u + d + 1) % (n.openStart + 1)
          , p = c[h];
        if (p)
            for (let m = 0; m < o.length; m++) {
                let g = o[(m + a) % o.length]
                  , y = !0;
                g < 0 && (y = !1,
                g = -g);
                let C = i.node(g - 1)
                  , O = i.index(g - 1);
                if (C.canReplaceWith(O, O, p.type, p.marks))
                    return r.replace(i.before(g), y ? s.after(g) : t, new x(rs(n.content, 0, n.openStart, h),h,n.openEnd))
            }
    }
    let f = r.steps.length;
    for (let u = o.length - 1; u >= 0 && (r.replace(e, t, n),
    !(r.steps.length > f)); u--) {
        let h = o[u];
        h < 0 || (e = i.before(h),
        t = s.after(h))
    }
}
function rs(r, e, t, n, i) {
    if (e < t) {
        let s = r.firstChild;
        r = r.replaceChild(0, s.copy(rs(s.content, e + 1, t, n, s)))
    }
    if (e > n) {
        let s = i.contentMatchAt(0)
          , o = s.fillBefore(r).append(r);
        r = o.append(s.matchFragment(o).fillBefore(b.empty, !0))
    }
    return r
}
function dl(r, e, t, n) {
    if (!n.isInline && e == t && r.doc.resolve(e).parent.content.size) {
        let i = il(r.doc, e, n.type);
        i != null && (e = t = i)
    }
    r.replaceRange(e, t, new x(b.from(n),0,0))
}
function fl(r, e, t) {
    let n = r.doc.resolve(e)
      , i = r.doc.resolve(t)
      , s = is(n, i);
    for (let o = 0; o < s.length; o++) {
        let l = s[o]
          , a = o == s.length - 1;
        if (a && l == 0 || n.node(l).type.contentMatch.validEnd)
            return r.delete(n.start(l), i.end(l));
        if (l > 0 && (a || n.node(l - 1).canReplace(n.index(l - 1), i.indexAfter(l - 1))))
            return r.delete(n.before(l), i.after(l))
    }
    for (let o = 1; o <= n.depth && o <= i.depth; o++)
        if (e - n.start(o) == n.depth - o && t > n.end(o) && i.end(o) - t != i.depth - o && n.start(o - 1) == i.start(o - 1) && n.node(o - 1).canReplace(n.index(o - 1), i.index(o - 1)))
            return r.delete(n.before(o), t);
    r.delete(e, t)
}
function is(r, e) {
    let t = []
      , n = Math.min(r.depth, e.depth);
    for (let i = n; i >= 0; i--) {
        let s = r.start(i);
        if (s < r.pos - (r.depth - i) || e.end(i) > e.pos + (e.depth - i) || r.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
            break;
        (s == e.start(i) || i == r.depth && i == e.depth && r.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && t.push(i)
    }
    return t
}
class et extends q {
    constructor(e, t, n) {
        super(),
        this.pos = e,
        this.attr = t,
        this.value = n
    }
    apply(e) {
        let t = e.nodeAt(this.pos);
        if (!t)
            return R.fail("No node at attribute step's position");
        let n = Object.create(null);
        for (let s in t.attrs)
            n[s] = t.attrs[s];
        n[this.attr] = this.value;
        let i = t.type.create(n, null, t.marks);
        return R.fromReplace(e, this.pos, this.pos + 1, new x(b.from(i),0,t.isLeaf ? 0 : 1))
    }
    getMap() {
        return Z.empty
    }
    invert(e) {
        return new et(this.pos,this.attr,e.nodeAt(this.pos).attrs[this.attr])
    }
    map(e) {
        let t = e.mapResult(this.pos, 1);
        return t.deletedAfter ? null : new et(t.pos,this.attr,this.value)
    }
    toJSON() {
        return {
            stepType: "attr",
            pos: this.pos,
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(e, t) {
        if (typeof t.pos != "number" || typeof t.attr != "string")
            throw new RangeError("Invalid input for AttrStep.fromJSON");
        return new et(t.pos,t.attr,t.value)
    }
}
q.jsonID("attr", et);
class yt extends q {
    constructor(e, t) {
        super(),
        this.attr = e,
        this.value = t
    }
    apply(e) {
        let t = Object.create(null);
        for (let i in e.attrs)
            t[i] = e.attrs[i];
        t[this.attr] = this.value;
        let n = e.type.create(t, e.content, e.marks);
        return R.ok(n)
    }
    getMap() {
        return Z.empty
    }
    invert(e) {
        return new yt(this.attr,e.attrs[this.attr])
    }
    map(e) {
        return this
    }
    toJSON() {
        return {
            stepType: "docAttr",
            attr: this.attr,
            value: this.value
        }
    }
    static fromJSON(e, t) {
        if (typeof t.attr != "string")
            throw new RangeError("Invalid input for DocAttrStep.fromJSON");
        return new yt(t.attr,t.value)
    }
}
q.jsonID("docAttr", yt);
let nt = class extends Error {
}
;
nt = function r(e) {
    let t = Error.call(this, e);
    return t.__proto__ = r.prototype,
    t
}
;
nt.prototype = Object.create(Error.prototype);
nt.prototype.constructor = nt;
nt.prototype.name = "TransformError";
class ss {
    constructor(e) {
        this.doc = e,
        this.steps = [],
        this.docs = [],
        this.mapping = new Wt
    }
    get before() {
        return this.docs.length ? this.docs[0] : this.doc
    }
    step(e) {
        let t = this.maybeStep(e);
        if (t.failed)
            throw new nt(t.failed);
        return this
    }
    maybeStep(e) {
        let t = e.apply(this.doc);
        return t.failed || this.addStep(e, t.doc),
        t
    }
    get docChanged() {
        return this.steps.length > 0
    }
    addStep(e, t) {
        this.docs.push(this.doc),
        this.steps.push(e),
        this.mapping.appendMap(e.getMap()),
        this.doc = t
    }
    replace(e, t=e, n=x.empty) {
        let i = Qt(this.doc, e, t, n);
        return i && this.step(i),
        this
    }
    replaceWith(e, t, n) {
        return this.replace(e, t, new x(b.from(n),0,0))
    }
    delete(e, t) {
        return this.replace(e, t, x.empty)
    }
    insert(e, t) {
        return this.replaceWith(e, e, t)
    }
    replaceRange(e, t, n) {
        return cl(this, e, t, n),
        this
    }
    replaceRangeWith(e, t, n) {
        return dl(this, e, t, n),
        this
    }
    deleteRange(e, t) {
        return fl(this, e, t),
        this
    }
    lift(e, t) {
        return _o(this, e, t),
        this
    }
    join(e, t=1) {
        return rl(this, e, t),
        this
    }
    wrap(e, t) {
        return Xo(this, e, t),
        this
    }
    setBlockType(e, t=e, n, i=null) {
        return Zo(this, e, t, n, i),
        this
    }
    setNodeMarkup(e, t, n=null, i) {
        return el(this, e, t, n, i),
        this
    }
    setNodeAttribute(e, t, n) {
        return this.step(new et(e,t,n)),
        this
    }
    setDocAttribute(e, t) {
        return this.step(new yt(e,t)),
        this
    }
    addNodeMark(e, t) {
        return this.step(new Se(e,t)),
        this
    }
    removeNodeMark(e, t) {
        let n = this.doc.nodeAt(e);
        if (!n)
            throw new RangeError("No node at position " + e);
        if (t instanceof I)
            t.isInSet(n.marks) && this.step(new He(e,t));
        else {
            let i = n.marks, s, o = [];
            for (; s = t.isInSet(i); )
                o.push(new He(e,s)),
                i = s.removeFromSet(i);
            for (let l = o.length - 1; l >= 0; l--)
                this.step(o[l])
        }
        return this
    }
    split(e, t=1, n) {
        return tl(this, e, t, n),
        this
    }
    addMark(e, t, n) {
        return qo(this, e, t, n),
        this
    }
    removeMark(e, t, n) {
        return Ko(this, e, t, n),
        this
    }
    clearIncompatible(e, t, n) {
        return Gn(this, e, t, n),
        this
    }
}
const gn = Object.create(null);
class E {
    constructor(e, t, n) {
        this.$anchor = e,
        this.$head = t,
        this.ranges = n || [new ul(e.min(t),e.max(t))]
    }
    get anchor() {
        return this.$anchor.pos
    }
    get head() {
        return this.$head.pos
    }
    get from() {
        return this.$from.pos
    }
    get to() {
        return this.$to.pos
    }
    get $from() {
        return this.ranges[0].$from
    }
    get $to() {
        return this.ranges[0].$to
    }
    get empty() {
        let e = this.ranges;
        for (let t = 0; t < e.length; t++)
            if (e[t].$from.pos != e[t].$to.pos)
                return !1;
        return !0
    }
    content() {
        return this.$from.doc.slice(this.from, this.to, !0)
    }
    replace(e, t=x.empty) {
        let n = t.content.lastChild
          , i = null;
        for (let l = 0; l < t.openEnd; l++)
            i = n,
            n = n.lastChild;
        let s = e.steps.length
          , o = this.ranges;
        for (let l = 0; l < o.length; l++) {
            let {$from: a, $to: c} = o[l]
              , d = e.mapping.slice(s);
            e.replaceRange(d.map(a.pos), d.map(c.pos), l ? x.empty : t),
            l == 0 && Br(e, s, (n ? n.isInline : i && i.isTextblock) ? -1 : 1)
        }
    }
    replaceWith(e, t) {
        let n = e.steps.length
          , i = this.ranges;
        for (let s = 0; s < i.length; s++) {
            let {$from: o, $to: l} = i[s]
              , a = e.mapping.slice(n)
              , c = a.map(o.pos)
              , d = a.map(l.pos);
            s ? e.deleteRange(c, d) : (e.replaceRangeWith(c, d, t),
            Br(e, n, t.isInline ? -1 : 1))
        }
    }
    static findFrom(e, t, n=!1) {
        let i = e.parent.inlineContent ? new T(e) : Ye(e.node(0), e.parent, e.pos, e.index(), t, n);
        if (i)
            return i;
        for (let s = e.depth - 1; s >= 0; s--) {
            let o = t < 0 ? Ye(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, n) : Ye(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, n);
            if (o)
                return o
        }
        return null
    }
    static near(e, t=1) {
        return this.findFrom(e, t) || this.findFrom(e, -t) || new Q(e.node(0))
    }
    static atStart(e) {
        return Ye(e, e, 0, 0, 1) || new Q(e)
    }
    static atEnd(e) {
        return Ye(e, e, e.content.size, e.childCount, -1) || new Q(e)
    }
    static fromJSON(e, t) {
        if (!t || !t.type)
            throw new RangeError("Invalid input for Selection.fromJSON");
        let n = gn[t.type];
        if (!n)
            throw new RangeError(`No selection type ${t.type} defined`);
        return n.fromJSON(e, t)
    }
    static jsonID(e, t) {
        if (e in gn)
            throw new RangeError("Duplicate use of selection JSON ID " + e);
        return gn[e] = t,
        t.prototype.jsonID = e,
        t
    }
    getBookmark() {
        return T.between(this.$anchor, this.$head).getBookmark()
    }
}
E.prototype.visible = !0;
class ul {
    constructor(e, t) {
        this.$from = e,
        this.$to = t
    }
}
let Rr = !1;
function Pr(r) {
    !Rr && !r.parent.inlineContent && (Rr = !0)
}
class T extends E {
    constructor(e, t=e) {
        Pr(e),
        Pr(t),
        super(e, t)
    }
    get $cursor() {
        return this.$anchor.pos == this.$head.pos ? this.$head : null
    }
    map(e, t) {
        let n = e.resolve(t.map(this.head));
        if (!n.parent.inlineContent)
            return E.near(n);
        let i = e.resolve(t.map(this.anchor));
        return new T(i.parent.inlineContent ? i : n,n)
    }
    replace(e, t=x.empty) {
        if (super.replace(e, t),
        t == x.empty) {
            let n = this.$from.marksAcross(this.$to);
            n && e.ensureMarks(n)
        }
    }
    eq(e) {
        return e instanceof T && e.anchor == this.anchor && e.head == this.head
    }
    getBookmark() {
        return new en(this.anchor,this.head)
    }
    toJSON() {
        return {
            type: "text",
            anchor: this.anchor,
            head: this.head
        }
    }
    static fromJSON(e, t) {
        if (typeof t.anchor != "number" || typeof t.head != "number")
            throw new RangeError("Invalid input for TextSelection.fromJSON");
        return new T(e.resolve(t.anchor),e.resolve(t.head))
    }
    static create(e, t, n=t) {
        let i = e.resolve(t);
        return new this(i,n == t ? i : e.resolve(n))
    }
    static between(e, t, n) {
        let i = e.pos - t.pos;
        if ((!n || i) && (n = i >= 0 ? 1 : -1),
        !t.parent.inlineContent) {
            let s = E.findFrom(t, n, !0) || E.findFrom(t, -n, !0);
            if (s)
                t = s.$head;
            else
                return E.near(t, n)
        }
        return e.parent.inlineContent || (i == 0 ? e = t : (e = (E.findFrom(e, -n, !0) || E.findFrom(e, n, !0)).$anchor,
        e.pos < t.pos != i < 0 && (e = t))),
        new T(e,t)
    }
}
E.jsonID("text", T);
class en {
    constructor(e, t) {
        this.anchor = e,
        this.head = t
    }
    map(e) {
        return new en(e.map(this.anchor),e.map(this.head))
    }
    resolve(e) {
        return T.between(e.resolve(this.anchor), e.resolve(this.head))
    }
}
class M extends E {
    constructor(e) {
        let t = e.nodeAfter
          , n = e.node(0).resolve(e.pos + t.nodeSize);
        super(e, n),
        this.node = t
    }
    map(e, t) {
        let {deleted: n, pos: i} = t.mapResult(this.anchor)
          , s = e.resolve(i);
        return n ? E.near(s) : new M(s)
    }
    content() {
        return new x(b.from(this.node),0,0)
    }
    eq(e) {
        return e instanceof M && e.anchor == this.anchor
    }
    toJSON() {
        return {
            type: "node",
            anchor: this.anchor
        }
    }
    getBookmark() {
        return new Xn(this.anchor)
    }
    static fromJSON(e, t) {
        if (typeof t.anchor != "number")
            throw new RangeError("Invalid input for NodeSelection.fromJSON");
        return new M(e.resolve(t.anchor))
    }
    static create(e, t) {
        return new M(e.resolve(t))
    }
    static isSelectable(e) {
        return !e.isText && e.type.spec.selectable !== !1
    }
}
M.prototype.visible = !1;
E.jsonID("node", M);
class Xn {
    constructor(e) {
        this.anchor = e
    }
    map(e) {
        let {deleted: t, pos: n} = e.mapResult(this.anchor);
        return t ? new en(n,n) : new Xn(n)
    }
    resolve(e) {
        let t = e.resolve(this.anchor)
          , n = t.nodeAfter;
        return n && M.isSelectable(n) ? new M(t) : E.near(t)
    }
}
class Q extends E {
    constructor(e) {
        super(e.resolve(0), e.resolve(e.content.size))
    }
    replace(e, t=x.empty) {
        if (t == x.empty) {
            e.delete(0, e.doc.content.size);
            let n = E.atStart(e.doc);
            n.eq(e.selection) || e.setSelection(n)
        } else
            super.replace(e, t)
    }
    toJSON() {
        return {
            type: "all"
        }
    }
    static fromJSON(e) {
        return new Q(e)
    }
    map(e) {
        return new Q(e)
    }
    eq(e) {
        return e instanceof Q
    }
    getBookmark() {
        return hl
    }
}
E.jsonID("all", Q);
const hl = {
    map() {
        return this
    },
    resolve(r) {
        return new Q(r)
    }
};
function Ye(r, e, t, n, i, s=!1) {
    if (e.inlineContent)
        return T.create(r, t);
    for (let o = n - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
        let l = e.child(o);
        if (l.isAtom) {
            if (!s && M.isSelectable(l))
                return M.create(r, t - (i < 0 ? l.nodeSize : 0))
        } else {
            let a = Ye(r, l, t + i, i < 0 ? l.childCount : 0, i, s);
            if (a)
                return a
        }
        t += l.nodeSize * i
    }
    return null
}
function Br(r, e, t) {
    let n = r.steps.length - 1;
    if (n < e)
        return;
    let i = r.steps[n];
    if (!(i instanceof F || i instanceof L))
        return;
    let s = r.mapping.maps[n], o;
    s.forEach( (l, a, c, d) => {
        o == null && (o = d)
    }
    ),
    r.setSelection(E.near(r.doc.resolve(o), t))
}
const zr = 1
  , Et = 2
  , Fr = 4;
class pl extends ss {
    constructor(e) {
        super(e.doc),
        this.curSelectionFor = 0,
        this.updated = 0,
        this.meta = Object.create(null),
        this.time = Date.now(),
        this.curSelection = e.selection,
        this.storedMarks = e.storedMarks
    }
    get selection() {
        return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)),
        this.curSelectionFor = this.steps.length),
        this.curSelection
    }
    setSelection(e) {
        if (e.$from.doc != this.doc)
            throw new RangeError("Selection passed to setSelection must point at the current document");
        return this.curSelection = e,
        this.curSelectionFor = this.steps.length,
        this.updated = (this.updated | zr) & ~Et,
        this.storedMarks = null,
        this
    }
    get selectionSet() {
        return (this.updated & zr) > 0
    }
    setStoredMarks(e) {
        return this.storedMarks = e,
        this.updated |= Et,
        this
    }
    ensureMarks(e) {
        return I.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e),
        this
    }
    addStoredMark(e) {
        return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()))
    }
    removeStoredMark(e) {
        return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()))
    }
    get storedMarksSet() {
        return (this.updated & Et) > 0
    }
    addStep(e, t) {
        super.addStep(e, t),
        this.updated = this.updated & ~Et,
        this.storedMarks = null
    }
    setTime(e) {
        return this.time = e,
        this
    }
    replaceSelection(e) {
        return this.selection.replace(this, e),
        this
    }
    replaceSelectionWith(e, t=!0) {
        let n = this.selection;
        return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || I.none))),
        n.replaceWith(this, e),
        this
    }
    deleteSelection() {
        return this.selection.replace(this),
        this
    }
    insertText(e, t, n) {
        let i = this.doc.type.schema;
        if (t == null)
            return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
        {
            if (n == null && (n = t),
            n = n == null ? t : n,
            !e)
                return this.deleteRange(t, n);
            let s = this.storedMarks;
            if (!s) {
                let o = this.doc.resolve(t);
                s = n == t ? o.marks() : o.marksAcross(this.doc.resolve(n))
            }
            return this.replaceRangeWith(t, n, i.text(e, s)),
            this.selection.empty || this.setSelection(E.near(this.selection.$to)),
            this
        }
    }
    setMeta(e, t) {
        return this.meta[typeof e == "string" ? e : e.key] = t,
        this
    }
    getMeta(e) {
        return this.meta[typeof e == "string" ? e : e.key]
    }
    get isGeneric() {
        for (let e in this.meta)
            return !1;
        return !0
    }
    scrollIntoView() {
        return this.updated |= Fr,
        this
    }
    get scrolledIntoView() {
        return (this.updated & Fr) > 0
    }
}
function Lr(r, e) {
    return !e || !r ? r : r.bind(e)
}
class dt {
    constructor(e, t, n) {
        this.name = e,
        this.init = Lr(t.init, n),
        this.apply = Lr(t.apply, n)
    }
}
const ml = [new dt("doc",{
    init(r) {
        return r.doc || r.schema.topNodeType.createAndFill()
    },
    apply(r) {
        return r.doc
    }
}), new dt("selection",{
    init(r, e) {
        return r.selection || E.atStart(e.doc)
    },
    apply(r) {
        return r.selection
    }
}), new dt("storedMarks",{
    init(r) {
        return r.storedMarks || null
    },
    apply(r, e, t, n) {
        return n.selection.$cursor ? r.storedMarks : null
    }
}), new dt("scrollToSelection",{
    init() {
        return 0
    },
    apply(r, e) {
        return r.scrolledIntoView ? e + 1 : e
    }
})];
class yn {
    constructor(e, t) {
        this.schema = e,
        this.plugins = [],
        this.pluginsByKey = Object.create(null),
        this.fields = ml.slice(),
        t && t.forEach(n => {
            if (this.pluginsByKey[n.key])
                throw new RangeError("Adding different instances of a keyed plugin (" + n.key + ")");
            this.plugins.push(n),
            this.pluginsByKey[n.key] = n,
            n.spec.state && this.fields.push(new dt(n.key,n.spec.state,n))
        }
        )
    }
}
class Ze {
    constructor(e) {
        this.config = e
    }
    get schema() {
        return this.config.schema
    }
    get plugins() {
        return this.config.plugins
    }
    apply(e) {
        return this.applyTransaction(e).state
    }
    filterTransaction(e, t=-1) {
        for (let n = 0; n < this.config.plugins.length; n++)
            if (n != t) {
                let i = this.config.plugins[n];
                if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
                    return !1
            }
        return !0
    }
    applyTransaction(e) {
        if (!this.filterTransaction(e))
            return {
                state: this,
                transactions: []
            };
        let t = [e]
          , n = this.applyInner(e)
          , i = null;
        for (; ; ) {
            let s = !1;
            for (let o = 0; o < this.config.plugins.length; o++) {
                let l = this.config.plugins[o];
                if (l.spec.appendTransaction) {
                    let a = i ? i[o].n : 0
                      , c = i ? i[o].state : this
                      , d = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, n);
                    if (d && n.filterTransaction(d, o)) {
                        if (d.setMeta("appendedTransaction", e),
                        !i) {
                            i = [];
                            for (let f = 0; f < this.config.plugins.length; f++)
                                i.push(f < o ? {
                                    state: n,
                                    n: t.length
                                } : {
                                    state: this,
                                    n: 0
                                })
                        }
                        t.push(d),
                        n = n.applyInner(d),
                        s = !0
                    }
                    i && (i[o] = {
                        state: n,
                        n: t.length
                    })
                }
            }
            if (!s)
                return {
                    state: n,
                    transactions: t
                }
        }
    }
    applyInner(e) {
        if (!e.before.eq(this.doc))
            throw new RangeError("Applying a mismatched transaction");
        let t = new Ze(this.config)
          , n = this.config.fields;
        for (let i = 0; i < n.length; i++) {
            let s = n[i];
            t[s.name] = s.apply(e, this[s.name], this, t)
        }
        return t
    }
    get tr() {
        return new pl(this)
    }
    static create(e) {
        let t = new yn(e.doc ? e.doc.type.schema : e.schema,e.plugins)
          , n = new Ze(t);
        for (let i = 0; i < t.fields.length; i++)
            n[t.fields[i].name] = t.fields[i].init(e, n);
        return n
    }
    reconfigure(e) {
        let t = new yn(this.schema,e.plugins)
          , n = t.fields
          , i = new Ze(t);
        for (let s = 0; s < n.length; s++) {
            let o = n[s].name;
            i[o] = this.hasOwnProperty(o) ? this[o] : n[s].init(e, i)
        }
        return i
    }
    toJSON(e) {
        let t = {
            doc: this.doc.toJSON(),
            selection: this.selection.toJSON()
        };
        if (this.storedMarks && (t.storedMarks = this.storedMarks.map(n => n.toJSON())),
        e && typeof e == "object")
            for (let n in e) {
                if (n == "doc" || n == "selection")
                    throw new RangeError("The JSON fields `doc` and `selection` are reserved");
                let i = e[n]
                  , s = i.spec.state;
                s && s.toJSON && (t[n] = s.toJSON.call(i, this[i.key]))
            }
        return t
    }
    static fromJSON(e, t, n) {
        if (!t)
            throw new RangeError("Invalid input for EditorState.fromJSON");
        if (!e.schema)
            throw new RangeError("Required config field 'schema' missing");
        let i = new yn(e.schema,e.plugins)
          , s = new Ze(i);
        return i.fields.forEach(o => {
            if (o.name == "doc")
                s.doc = Ce.fromJSON(e.schema, t.doc);
            else if (o.name == "selection")
                s.selection = E.fromJSON(s.doc, t.selection);
            else if (o.name == "storedMarks")
                t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
            else {
                if (n)
                    for (let l in n) {
                        let a = n[l]
                          , c = a.spec.state;
                        if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
                            s[o.name] = c.fromJSON.call(a, e, t[l], s);
                            return
                        }
                    }
                s[o.name] = o.init(e, s)
            }
        }
        ),
        s
    }
}
function ls(r, e, t) {
    for (let n in r) {
        let i = r[n];
        i instanceof Function ? i = i.bind(e) : n == "handleDOMEvents" && (i = ls(i, e, {})),
        t[n] = i
    }
    return t
}
class ce {
    constructor(e) {
        this.spec = e,
        this.props = {},
        e.props && ls(e.props, this, this.props),
        this.key = e.key ? e.key.key : as("plugin")
    }
    getState(e) {
        return e[this.key]
    }
}
const bn = Object.create(null);
function as(r) {
    return r in bn ? r + "$" + ++bn[r] : (bn[r] = 0,
    r + "$")
}
class Ue {
    constructor(e="key") {
        this.key = as(e)
    }
    get(e) {
        return e.config.pluginsByKey[this.key]
    }
    getState(e) {
        return e[this.key]
    }
}
const W = function(r) {
    for (var e = 0; ; e++)
        if (r = r.previousSibling,
        !r)
            return e
}
  , rt = function(r) {
    let e = r.assignedSlot || r.parentNode;
    return e && e.nodeType == 11 ? e.host : e
};
let Bn = null;
const fe = function(r, e, t) {
    let n = Bn || (Bn = document.createRange());
    return n.setEnd(r, t == null ? r.nodeValue.length : t),
    n.setStart(r, e || 0),
    n
}
  , gl = function() {
    Bn = null
}
  , je = function(r, e, t, n) {
    return t && (Vr(r, e, t, n, -1) || Vr(r, e, t, n, 1))
}
  , yl = /^(img|br|input|textarea|hr)$/i;
function Vr(r, e, t, n, i) {
    for (var s; ; ) {
        if (r == t && e == n)
            return !0;
        if (e == (i < 0 ? 0 : te(r))) {
            let o = r.parentNode;
            if (!o || o.nodeType != 1 || Ct(r) || yl.test(r.nodeName) || r.contentEditable == "false")
                return !1;
            e = W(r) + (i < 0 ? 0 : 1),
            r = o
        } else if (r.nodeType == 1) {
            let o = r.childNodes[e + (i < 0 ? -1 : 0)];
            if (o.nodeType == 1 && o.contentEditable == "false")
                if (!((s = o.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
                    e += i;
                else
                    return !1;
            else
                r = o,
                e = i < 0 ? te(r) : 0
        } else
            return !1
    }
}
function te(r) {
    return r.nodeType == 3 ? r.nodeValue.length : r.childNodes.length
}
function bl(r, e) {
    for (; ; ) {
        if (r.nodeType == 3 && e)
            return r;
        if (r.nodeType == 1 && e > 0) {
            if (r.contentEditable == "false")
                return null;
            r = r.childNodes[e - 1],
            e = te(r)
        } else if (r.parentNode && !Ct(r))
            e = W(r),
            r = r.parentNode;
        else
            return null
    }
}
function kl(r, e) {
    for (; ; ) {
        if (r.nodeType == 3 && e < r.nodeValue.length)
            return r;
        if (r.nodeType == 1 && e < r.childNodes.length) {
            if (r.contentEditable == "false")
                return null;
            r = r.childNodes[e],
            e = 0
        } else if (r.parentNode && !Ct(r))
            e = W(r) + 1,
            r = r.parentNode;
        else
            return null
    }
}
function xl(r, e, t) {
    for (let n = e == 0, i = e == te(r); n || i; ) {
        if (r == t)
            return !0;
        let s = W(r);
        if (r = r.parentNode,
        !r)
            return !1;
        n = n && s == 0,
        i = i && s == te(r)
    }
}
function Ct(r) {
    let e;
    for (let t = r; t && !(e = t.pmViewDesc); t = t.parentNode)
        ;
    return e && e.node && e.node.isBlock && (e.dom == r || e.contentDOM == r)
}
const tn = function(r) {
    return r.focusNode && je(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset)
};
function Re(r, e) {
    let t = document.createEvent("Event");
    return t.initEvent("keydown", !0, !0),
    t.keyCode = r,
    t.key = t.code = e,
    t
}
function Sl(r) {
    let e = r.activeElement;
    for (; e && e.shadowRoot; )
        e = e.shadowRoot.activeElement;
    return e
}
function Ml(r, e, t) {
    if (r.caretPositionFromPoint)
        try {
            let n = r.caretPositionFromPoint(e, t);
            if (n)
                return {
                    node: n.offsetNode,
                    offset: Math.min(te(n.offsetNode), n.offset)
                }
        } catch (n) {}
    if (r.caretRangeFromPoint) {
        let n = r.caretRangeFromPoint(e, t);
        if (n)
            return {
                node: n.startContainer,
                offset: Math.min(te(n.startContainer), n.startOffset)
            }
    }
}
const le = typeof navigator != "undefined" ? navigator : null
  , $r = typeof document != "undefined" ? document : null
  , Ae = le && le.userAgent || ""
  , zn = /Edge\/(\d+)/.exec(Ae)
  , cs = /MSIE \d/.exec(Ae)
  , Fn = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Ae)
  , X = !!(cs || Fn || zn)
  , Oe = cs ? document.documentMode : Fn ? +Fn[1] : zn ? +zn[1] : 0
  , ie = !X && /gecko\/(\d+)/i.test(Ae);
ie && +(/Firefox\/(\d+)/.exec(Ae) || [0, 0])[1];
const Ln = !X && /Chrome\/(\d+)/.exec(Ae)
  , J = !!Ln
  , ds = Ln ? +Ln[1] : 0
  , U = !X && !!le && /Apple Computer/.test(le.vendor)
  , it = U && (/Mobile\/\w+/.test(Ae) || !!le && le.maxTouchPoints > 2)
  , ee = it || (le ? /Mac/.test(le.platform) : !1)
  , Cl = le ? /Win/.test(le.platform) : !1
  , ue = /Android \d/.test(Ae)
  , wt = !!$r && "webkitFontSmoothing"in $r.documentElement.style
  , wl = wt ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Ol(r) {
    let e = r.defaultView && r.defaultView.visualViewport;
    return e ? {
        left: 0,
        right: e.width,
        top: 0,
        bottom: e.height
    } : {
        left: 0,
        right: r.documentElement.clientWidth,
        top: 0,
        bottom: r.documentElement.clientHeight
    }
}
function de(r, e) {
    return typeof r == "number" ? r : r[e]
}
function Tl(r) {
    let e = r.getBoundingClientRect()
      , t = e.width / r.offsetWidth || 1
      , n = e.height / r.offsetHeight || 1;
    return {
        left: e.left,
        right: e.left + r.clientWidth * t,
        top: e.top,
        bottom: e.top + r.clientHeight * n
    }
}
function Wr(r, e, t) {
    let n = r.someProp("scrollThreshold") || 0
      , i = r.someProp("scrollMargin") || 5
      , s = r.dom.ownerDocument;
    for (let o = t || r.dom; o; ) {
        if (o.nodeType != 1) {
            o = rt(o);
            continue
        }
        let l = o
          , a = l == s.body
          , c = a ? Ol(s) : Tl(l)
          , d = 0
          , f = 0;
        if (e.top < c.top + de(n, "top") ? f = -(c.top - e.top + de(i, "top")) : e.bottom > c.bottom - de(n, "bottom") && (f = e.bottom - e.top > c.bottom - c.top ? e.top + de(i, "top") - c.top : e.bottom - c.bottom + de(i, "bottom")),
        e.left < c.left + de(n, "left") ? d = -(c.left - e.left + de(i, "left")) : e.right > c.right - de(n, "right") && (d = e.right - c.right + de(i, "right")),
        d || f)
            if (a)
                s.defaultView.scrollBy(d, f);
            else {
                let h = l.scrollLeft
                  , p = l.scrollTop;
                f && (l.scrollTop += f),
                d && (l.scrollLeft += d);
                let m = l.scrollLeft - h
                  , g = l.scrollTop - p;
                e = {
                    left: e.left - m,
                    top: e.top - g,
                    right: e.right - m,
                    bottom: e.bottom - g
                }
            }
        let u = a ? "fixed" : getComputedStyle(o).position;
        if (/^(fixed|sticky)$/.test(u))
            break;
        o = u == "absolute" ? o.offsetParent : rt(o)
    }
}
function Nl(r) {
    let e = r.dom.getBoundingClientRect(), t = Math.max(0, e.top), n, i;
    for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
        let l = r.root.elementFromPoint(s, o);
        if (!l || l == r.dom || !r.dom.contains(l))
            continue;
        let a = l.getBoundingClientRect();
        if (a.top >= t - 20) {
            n = l,
            i = a.top;
            break
        }
    }
    return {
        refDOM: n,
        refTop: i,
        stack: fs(r.dom)
    }
}
function fs(r) {
    let e = []
      , t = r.ownerDocument;
    for (let n = r; n && (e.push({
        dom: n,
        top: n.scrollTop,
        left: n.scrollLeft
    }),
    r != t); n = rt(n))
        ;
    return e
}
function El({refDOM: r, refTop: e, stack: t}) {
    let n = r ? r.getBoundingClientRect().top : 0;
    us(t, n == 0 ? 0 : n - e)
}
function us(r, e) {
    for (let t = 0; t < r.length; t++) {
        let {dom: n, top: i, left: s} = r[t];
        n.scrollTop != i + e && (n.scrollTop = i + e),
        n.scrollLeft != s && (n.scrollLeft = s)
    }
}
let _e = null;
function Dl(r) {
    if (r.setActive)
        return r.setActive();
    if (_e)
        return r.focus(_e);
    let e = fs(r);
    r.focus(_e == null ? {
        get preventScroll() {
            return _e = {
                preventScroll: !0
            },
            !0
        }
    } : void 0),
    _e || (_e = !1,
    us(e, 0))
}
function hs(r, e) {
    let t, n = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
    for (let d = r.firstChild, f = 0; d; d = d.nextSibling,
    f++) {
        let u;
        if (d.nodeType == 1)
            u = d.getClientRects();
        else if (d.nodeType == 3)
            u = fe(d).getClientRects();
        else
            continue;
        for (let h = 0; h < u.length; h++) {
            let p = u[h];
            if (p.top <= o && p.bottom >= l) {
                o = Math.max(p.bottom, o),
                l = Math.min(p.top, l);
                let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
                if (m < n) {
                    t = d,
                    n = m,
                    i = m && t.nodeType == 3 ? {
                        left: p.right < e.left ? p.right : p.left,
                        top: e.top
                    } : e,
                    d.nodeType == 1 && m && (s = f + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
                    continue
                }
            } else
                p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = d,
                c = {
                    left: Math.max(p.left, Math.min(p.right, e.left)),
                    top: p.top
                });
            !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = f + 1)
        }
    }
    return !t && a && (t = a,
    i = c,
    n = 0),
    t && t.nodeType == 3 ? Al(t, i) : !t || n && t.nodeType == 1 ? {
        node: r,
        offset: s
    } : hs(t, i)
}
function Al(r, e) {
    let t = r.nodeValue.length
      , n = document.createRange();
    for (let i = 0; i < t; i++) {
        n.setEnd(r, i + 1),
        n.setStart(r, i);
        let s = ye(n, 1);
        if (s.top != s.bottom && Zn(e, s))
            return {
                node: r,
                offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0)
            }
    }
    return {
        node: r,
        offset: 0
    }
}
function Zn(r, e) {
    return r.left >= e.left - 1 && r.left <= e.right + 1 && r.top >= e.top - 1 && r.top <= e.bottom + 1
}
function Il(r, e) {
    let t = r.parentNode;
    return t && /^li$/i.test(t.nodeName) && e.left < r.getBoundingClientRect().left ? t : r
}
function vl(r, e, t) {
    let {node: n, offset: i} = hs(e, t)
      , s = -1;
    if (n.nodeType == 1 && !n.firstChild) {
        let o = n.getBoundingClientRect();
        s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1
    }
    return r.docView.posFromDOM(n, i, s)
}
function Rl(r, e, t, n) {
    let i = -1;
    for (let s = e, o = !1; s != r.dom; ) {
        let l = r.docView.nearestDesc(s, !0), a;
        if (!l)
            return null;
        if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!o && a.left > n.left || a.top > n.top ? i = l.posBefore : (!o && a.right < n.left || a.bottom < n.top) && (i = l.posAfter),
        o = !0),
        !l.contentDOM && i < 0 && !l.node.isText))
            return (l.node.isBlock ? n.top < (a.top + a.bottom) / 2 : n.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
        s = l.dom.parentNode
    }
    return i > -1 ? i : r.docView.posFromDOM(e, t, -1)
}
function ps(r, e, t) {
    let n = r.childNodes.length;
    if (n && t.top < t.bottom)
        for (let i = Math.max(0, Math.min(n - 1, Math.floor(n * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = i; ; ) {
            let o = r.childNodes[s];
            if (o.nodeType == 1) {
                let l = o.getClientRects();
                for (let a = 0; a < l.length; a++) {
                    let c = l[a];
                    if (Zn(e, c))
                        return ps(o, e, c)
                }
            }
            if ((s = (s + 1) % n) == i)
                break
        }
    return r
}
function Pl(r, e) {
    let t = r.dom.ownerDocument, n, i = 0, s = Ml(t, e.left, e.top);
    s && ({node: n, offset: i} = s);
    let o = (r.root.elementFromPoint ? r.root : t).elementFromPoint(e.left, e.top), l;
    if (!o || !r.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
        let c = r.dom.getBoundingClientRect();
        if (!Zn(e, c) || (o = ps(r.dom, e, c),
        !o))
            return null
    }
    if (U)
        for (let c = o; n && c; c = rt(c))
            c.draggable && (n = void 0);
    if (o = Il(o, e),
    n) {
        if (ie && n.nodeType == 1 && (i = Math.min(i, n.childNodes.length),
        i < n.childNodes.length)) {
            let d = n.childNodes[i], f;
            d.nodeName == "IMG" && (f = d.getBoundingClientRect()).right <= e.left && f.bottom > e.top && i++
        }
        let c;
        wt && i && n.nodeType == 1 && (c = n.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--,
        n == r.dom && i == n.childNodes.length - 1 && n.lastChild.nodeType == 1 && e.top > n.lastChild.getBoundingClientRect().bottom ? l = r.state.doc.content.size : (i == 0 || n.nodeType != 1 || n.childNodes[i - 1].nodeName != "BR") && (l = Rl(r, n, i, e))
    }
    l == null && (l = vl(r, o, e));
    let a = r.docView.nearestDesc(o, !0);
    return {
        pos: l,
        inside: a ? a.posAtStart - a.border : -1
    }
}
function Hr(r) {
    return r.top < r.bottom || r.left < r.right
}
function ye(r, e) {
    let t = r.getClientRects();
    if (t.length) {
        let n = t[e < 0 ? 0 : t.length - 1];
        if (Hr(n))
            return n
    }
    return Array.prototype.find.call(t, Hr) || r.getBoundingClientRect()
}
const Bl = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function ms(r, e, t) {
    let {node: n, offset: i, atom: s} = r.docView.domFromPos(e, t < 0 ? -1 : 1)
      , o = wt || ie;
    if (n.nodeType == 3)
        if (o && (Bl.test(n.nodeValue) || (t < 0 ? !i : i == n.nodeValue.length))) {
            let a = ye(fe(n, i, i), t);
            if (ie && i && /\s/.test(n.nodeValue[i - 1]) && i < n.nodeValue.length) {
                let c = ye(fe(n, i - 1, i - 1), -1);
                if (c.top == a.top) {
                    let d = ye(fe(n, i, i + 1), -1);
                    if (d.top != a.top)
                        return lt(d, d.left < c.left)
                }
            }
            return a
        } else {
            let a = i
              , c = i
              , d = t < 0 ? 1 : -1;
            return t < 0 && !i ? (c++,
            d = -1) : t >= 0 && i == n.nodeValue.length ? (a--,
            d = 1) : t < 0 ? a-- : c++,
            lt(ye(fe(n, a, c), d), d < 0)
        }
    if (!r.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
        if (s == null && i && (t < 0 || i == te(n))) {
            let a = n.childNodes[i - 1];
            if (a.nodeType == 1)
                return kn(a.getBoundingClientRect(), !1)
        }
        if (s == null && i < te(n)) {
            let a = n.childNodes[i];
            if (a.nodeType == 1)
                return kn(a.getBoundingClientRect(), !0)
        }
        return kn(n.getBoundingClientRect(), t >= 0)
    }
    if (s == null && i && (t < 0 || i == te(n))) {
        let a = n.childNodes[i - 1]
          , c = a.nodeType == 3 ? fe(a, te(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
        if (c)
            return lt(ye(c, 1), !1)
    }
    if (s == null && i < te(n)) {
        let a = n.childNodes[i];
        for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
            a = a.nextSibling;
        let c = a ? a.nodeType == 3 ? fe(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
        if (c)
            return lt(ye(c, -1), !0)
    }
    return lt(ye(n.nodeType == 3 ? fe(n) : n, -t), t >= 0)
}
function lt(r, e) {
    if (r.width == 0)
        return r;
    let t = e ? r.left : r.right;
    return {
        top: r.top,
        bottom: r.bottom,
        left: t,
        right: t
    }
}
function kn(r, e) {
    if (r.height == 0)
        return r;
    let t = e ? r.top : r.bottom;
    return {
        top: t,
        bottom: t,
        left: r.left,
        right: r.right
    }
}
function gs(r, e, t) {
    let n = r.state
      , i = r.root.activeElement;
    n != e && r.updateState(e),
    i != r.dom && r.focus();
    try {
        return t()
    } finally {
        n != e && r.updateState(n),
        i != r.dom && i && i.focus()
    }
}
function zl(r, e, t) {
    let n = e.selection
      , i = t == "up" ? n.$from : n.$to;
    return gs(r, e, () => {
        let {node: s} = r.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
        for (; ; ) {
            let l = r.docView.nearestDesc(s, !0);
            if (!l)
                break;
            if (l.node.isBlock) {
                s = l.contentDOM || l.dom;
                break
            }
            s = l.dom.parentNode
        }
        let o = ms(r, i.pos, 1);
        for (let l = s.firstChild; l; l = l.nextSibling) {
            let a;
            if (l.nodeType == 1)
                a = l.getClientRects();
            else if (l.nodeType == 3)
                a = fe(l, 0, l.nodeValue.length).getClientRects();
            else
                continue;
            for (let c = 0; c < a.length; c++) {
                let d = a[c];
                if (d.bottom > d.top + 1 && (t == "up" ? o.top - d.top > (d.bottom - o.top) * 2 : d.bottom - o.bottom > (o.bottom - d.top) * 2))
                    return !1
            }
        }
        return !0
    }
    )
}
const Fl = /[\u0590-\u08ac]/;
function Ll(r, e, t) {
    let {$head: n} = e.selection;
    if (!n.parent.isTextblock)
        return !1;
    let i = n.parentOffset
      , s = !i
      , o = i == n.parent.content.size
      , l = r.domSelection();
    return l ? !Fl.test(n.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? s : o : gs(r, e, () => {
        let {focusNode: a, focusOffset: c, anchorNode: d, anchorOffset: f} = r.domSelectionRange()
          , u = l.caretBidiLevel;
        l.modify("move", t, "character");
        let h = n.depth ? r.docView.domAfterPos(n.before()) : r.dom
          , {focusNode: p, focusOffset: m} = r.domSelectionRange()
          , g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
        try {
            l.collapse(d, f),
            a && (a != d || c != f) && l.extend && l.extend(a, c)
        } catch (y) {}
        return u != null && (l.caretBidiLevel = u),
        g
    }
    ) : n.pos == n.start() || n.pos == n.end()
}
let jr = null
  , Jr = null
  , qr = !1;
function Vl(r, e, t) {
    return jr == e && Jr == t ? qr : (jr = e,
    Jr = t,
    qr = t == "up" || t == "down" ? zl(r, e, t) : Ll(r, e, t))
}
const ne = 0
  , Kr = 1
  , Be = 2
  , ae = 3;
class Ot {
    constructor(e, t, n, i) {
        this.parent = e,
        this.children = t,
        this.dom = n,
        this.contentDOM = i,
        this.dirty = ne,
        n.pmViewDesc = this
    }
    matchesWidget(e) {
        return !1
    }
    matchesMark(e) {
        return !1
    }
    matchesNode(e, t, n) {
        return !1
    }
    matchesHack(e) {
        return !1
    }
    parseRule() {
        return null
    }
    stopEvent(e) {
        return !1
    }
    get size() {
        let e = 0;
        for (let t = 0; t < this.children.length; t++)
            e += this.children[t].size;
        return e
    }
    get border() {
        return 0
    }
    destroy() {
        this.parent = void 0,
        this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
        for (let e = 0; e < this.children.length; e++)
            this.children[e].destroy()
    }
    posBeforeChild(e) {
        for (let t = 0, n = this.posAtStart; ; t++) {
            let i = this.children[t];
            if (i == e)
                return n;
            n += i.size
        }
    }
    get posBefore() {
        return this.parent.posBeforeChild(this)
    }
    get posAtStart() {
        return this.parent ? this.parent.posBeforeChild(this) + this.border : 0
    }
    get posAfter() {
        return this.posBefore + this.size
    }
    get posAtEnd() {
        return this.posAtStart + this.size - 2 * this.border
    }
    localPosFromDOM(e, t, n) {
        if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
            if (n < 0) {
                let s, o;
                if (e == this.contentDOM)
                    s = e.childNodes[t - 1];
                else {
                    for (; e.parentNode != this.contentDOM; )
                        e = e.parentNode;
                    s = e.previousSibling
                }
                for (; s && !((o = s.pmViewDesc) && o.parent == this); )
                    s = s.previousSibling;
                return s ? this.posBeforeChild(o) + o.size : this.posAtStart
            } else {
                let s, o;
                if (e == this.contentDOM)
                    s = e.childNodes[t];
                else {
                    for (; e.parentNode != this.contentDOM; )
                        e = e.parentNode;
                    s = e.nextSibling
                }
                for (; s && !((o = s.pmViewDesc) && o.parent == this); )
                    s = s.nextSibling;
                return s ? this.posBeforeChild(o) : this.posAtEnd
            }
        let i;
        if (e == this.dom && this.contentDOM)
            i = t > W(this.contentDOM);
        else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
            i = e.compareDocumentPosition(this.contentDOM) & 2;
        else if (this.dom.firstChild) {
            if (t == 0)
                for (let s = e; ; s = s.parentNode) {
                    if (s == this.dom) {
                        i = !1;
                        break
                    }
                    if (s.previousSibling)
                        break
                }
            if (i == null && t == e.childNodes.length)
                for (let s = e; ; s = s.parentNode) {
                    if (s == this.dom) {
                        i = !0;
                        break
                    }
                    if (s.nextSibling)
                        break
                }
        }
        return (i == null ? n > 0 : i) ? this.posAtEnd : this.posAtStart
    }
    nearestDesc(e, t=!1) {
        for (let n = !0, i = e; i; i = i.parentNode) {
            let s = this.getDesc(i), o;
            if (s && (!t || s.node))
                if (n && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
                    n = !1;
                else
                    return s
        }
    }
    getDesc(e) {
        let t = e.pmViewDesc;
        for (let n = t; n; n = n.parent)
            if (n == this)
                return t
    }
    posFromDOM(e, t, n) {
        for (let i = e; i; i = i.parentNode) {
            let s = this.getDesc(i);
            if (s)
                return s.localPosFromDOM(e, t, n)
        }
        return -1
    }
    descAt(e) {
        for (let t = 0, n = 0; t < this.children.length; t++) {
            let i = this.children[t]
              , s = n + i.size;
            if (n == e && s != n) {
                for (; !i.border && i.children.length; )
                    for (let o = 0; o < i.children.length; o++) {
                        let l = i.children[o];
                        if (l.size) {
                            i = l;
                            break
                        }
                    }
                return i
            }
            if (e < s)
                return i.descAt(e - n - i.border);
            n = s
        }
    }
    domFromPos(e, t) {
        if (!this.contentDOM)
            return {
                node: this.dom,
                offset: 0,
                atom: e + 1
            };
        let n = 0
          , i = 0;
        for (let s = 0; n < this.children.length; n++) {
            let o = this.children[n]
              , l = s + o.size;
            if (l > e || o instanceof bs) {
                i = e - s;
                break
            }
            s = l
        }
        if (i)
            return this.children[n].domFromPos(i - this.children[n].border, t);
        for (let s; n && !(s = this.children[n - 1]).size && s instanceof ys && s.side >= 0; n--)
            ;
        if (t <= 0) {
            let s, o = !0;
            for (; s = n ? this.children[n - 1] : null,
            !(!s || s.dom.parentNode == this.contentDOM); n--,
            o = !1)
                ;
            return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : {
                node: this.contentDOM,
                offset: s ? W(s.dom) + 1 : 0
            }
        } else {
            let s, o = !0;
            for (; s = n < this.children.length ? this.children[n] : null,
            !(!s || s.dom.parentNode == this.contentDOM); n++,
            o = !1)
                ;
            return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : {
                node: this.contentDOM,
                offset: s ? W(s.dom) : this.contentDOM.childNodes.length
            }
        }
    }
    parseRange(e, t, n=0) {
        if (this.children.length == 0)
            return {
                node: this.contentDOM,
                from: e,
                to: t,
                fromOffset: 0,
                toOffset: this.contentDOM.childNodes.length
            };
        let i = -1
          , s = -1;
        for (let o = n, l = 0; ; l++) {
            let a = this.children[l]
              , c = o + a.size;
            if (i == -1 && e <= c) {
                let d = o + a.border;
                if (e >= d && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
                    return a.parseRange(e, t, d);
                e = o;
                for (let f = l; f > 0; f--) {
                    let u = this.children[f - 1];
                    if (u.size && u.dom.parentNode == this.contentDOM && !u.emptyChildAt(1)) {
                        i = W(u.dom) + 1;
                        break
                    }
                    e -= u.size
                }
                i == -1 && (i = 0)
            }
            if (i > -1 && (c > t || l == this.children.length - 1)) {
                t = c;
                for (let d = l + 1; d < this.children.length; d++) {
                    let f = this.children[d];
                    if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(-1)) {
                        s = W(f.dom);
                        break
                    }
                    t += f.size
                }
                s == -1 && (s = this.contentDOM.childNodes.length);
                break
            }
            o = c
        }
        return {
            node: this.contentDOM,
            from: e,
            to: t,
            fromOffset: i,
            toOffset: s
        }
    }
    emptyChildAt(e) {
        if (this.border || !this.contentDOM || !this.children.length)
            return !1;
        let t = this.children[e < 0 ? 0 : this.children.length - 1];
        return t.size == 0 || t.emptyChildAt(e)
    }
    domAfterPos(e) {
        let {node: t, offset: n} = this.domFromPos(e, 0);
        if (t.nodeType != 1 || n == t.childNodes.length)
            throw new RangeError("No node after pos " + e);
        return t.childNodes[n]
    }
    setSelection(e, t, n, i=!1) {
        let s = Math.min(e, t)
          , o = Math.max(e, t);
        for (let h = 0, p = 0; h < this.children.length; h++) {
            let m = this.children[h]
              , g = p + m.size;
            if (s > p && o < g)
                return m.setSelection(e - p - m.border, t - p - m.border, n, i);
            p = g
        }
        let l = this.domFromPos(e, e ? -1 : 1)
          , a = t == e ? l : this.domFromPos(t, t ? -1 : 1)
          , c = n.root.getSelection()
          , d = n.domSelectionRange()
          , f = !1;
        if ((ie || U) && e == t) {
            let {node: h, offset: p} = l;
            if (h.nodeType == 3) {
                if (f = !!(p && h.nodeValue[p - 1] == `
`),
                f && p == h.nodeValue.length)
                    for (let m = h, g; m; m = m.parentNode) {
                        if (g = m.nextSibling) {
                            g.nodeName == "BR" && (l = a = {
                                node: g.parentNode,
                                offset: W(g) + 1
                            });
                            break
                        }
                        let y = m.pmViewDesc;
                        if (y && y.node && y.node.isBlock)
                            break
                    }
            } else {
                let m = h.childNodes[p - 1];
                f = m && (m.nodeName == "BR" || m.contentEditable == "false")
            }
        }
        if (ie && d.focusNode && d.focusNode != a.node && d.focusNode.nodeType == 1) {
            let h = d.focusNode.childNodes[d.focusOffset];
            h && h.contentEditable == "false" && (i = !0)
        }
        if (!(i || f && U) && je(l.node, l.offset, d.anchorNode, d.anchorOffset) && je(a.node, a.offset, d.focusNode, d.focusOffset))
            return;
        let u = !1;
        if ((c.extend || e == t) && !f) {
            c.collapse(l.node, l.offset);
            try {
                e != t && c.extend(a.node, a.offset),
                u = !0
            } catch (h) {}
        }
        if (!u) {
            if (e > t) {
                let p = l;
                l = a,
                a = p
            }
            let h = document.createRange();
            h.setEnd(a.node, a.offset),
            h.setStart(l.node, l.offset),
            c.removeAllRanges(),
            c.addRange(h)
        }
    }
    ignoreMutation(e) {
        return !this.contentDOM && e.type != "selection"
    }
    get contentLost() {
        return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM)
    }
    markDirty(e, t) {
        for (let n = 0, i = 0; i < this.children.length; i++) {
            let s = this.children[i]
              , o = n + s.size;
            if (n == o ? e <= o && t >= n : e < o && t > n) {
                let l = n + s.border
                  , a = o - s.border;
                if (e >= l && t <= a) {
                    this.dirty = e == n || t == o ? Be : Kr,
                    e == l && t == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = ae : s.markDirty(e - l, t - l);
                    return
                } else
                    s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? Be : ae
            }
            n = o
        }
        this.dirty = Be
    }
    markParentsDirty() {
        let e = 1;
        for (let t = this.parent; t; t = t.parent,
        e++) {
            let n = e == 1 ? Be : Kr;
            t.dirty < n && (t.dirty = n)
        }
    }
    get domAtom() {
        return !1
    }
    get ignoreForCoords() {
        return !1
    }
    get ignoreForSelection() {
        return !1
    }
    isText(e) {
        return !1
    }
}
class ys extends Ot {
    constructor(e, t, n, i) {
        let s, o = t.type.toDOM;
        if (typeof o == "function" && (o = o(n, () => {
            if (!s)
                return i;
            if (s.parent)
                return s.parent.posBeforeChild(s)
        }
        )),
        !t.type.spec.raw) {
            if (o.nodeType != 1) {
                let l = document.createElement("span");
                l.appendChild(o),
                o = l
            }
            o.contentEditable = "false",
            o.classList.add("ProseMirror-widget")
        }
        super(e, [], o, null),
        this.widget = t,
        this.widget = t,
        s = this
    }
    matchesWidget(e) {
        return this.dirty == ne && e.type.eq(this.widget.type)
    }
    parseRule() {
        return {
            ignore: !0
        }
    }
    stopEvent(e) {
        let t = this.widget.spec.stopEvent;
        return t ? t(e) : !1
    }
    ignoreMutation(e) {
        return e.type != "selection" || this.widget.spec.ignoreSelection
    }
    destroy() {
        this.widget.type.destroy(this.dom),
        super.destroy()
    }
    get domAtom() {
        return !0
    }
    get ignoreForSelection() {
        return !!this.widget.type.spec.relaxedSide
    }
    get side() {
        return this.widget.type.side
    }
}
class $l extends Ot {
    constructor(e, t, n, i) {
        super(e, [], t, null),
        this.textDOM = n,
        this.text = i
    }
    get size() {
        return this.text.length
    }
    localPosFromDOM(e, t) {
        return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t
    }
    domFromPos(e) {
        return {
            node: this.textDOM,
            offset: e
        }
    }
    ignoreMutation(e) {
        return e.type === "characterData" && e.target.nodeValue == e.oldValue
    }
}
class Je extends Ot {
    constructor(e, t, n, i, s) {
        super(e, [], n, i),
        this.mark = t,
        this.spec = s
    }
    static create(e, t, n, i) {
        let s = i.nodeViews[t.type.name]
          , o = s && s(t, i, n);
        return (!o || !o.dom) && (o = Ke.renderSpec(document, t.type.spec.toDOM(t, n), null, t.attrs)),
        new Je(e,t,o.dom,o.contentDOM || o.dom,o)
    }
    parseRule() {
        return this.dirty & ae || this.mark.type.spec.reparseInView ? null : {
            mark: this.mark.type.name,
            attrs: this.mark.attrs,
            contentElement: this.contentDOM
        }
    }
    matchesMark(e) {
        return this.dirty != ae && this.mark.eq(e)
    }
    markDirty(e, t) {
        if (super.markDirty(e, t),
        this.dirty != ne) {
            let n = this.parent;
            for (; !n.node; )
                n = n.parent;
            n.dirty < this.dirty && (n.dirty = this.dirty),
            this.dirty = ne
        }
    }
    slice(e, t, n) {
        let i = Je.create(this.parent, this.mark, !0, n)
          , s = this.children
          , o = this.size;
        t < o && (s = $n(s, t, o, n)),
        e > 0 && (s = $n(s, 0, e, n));
        for (let l = 0; l < s.length; l++)
            s[l].parent = i;
        return i.children = s,
        i
    }
    ignoreMutation(e) {
        return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e)
    }
    destroy() {
        this.spec.destroy && this.spec.destroy(),
        super.destroy()
    }
}
class Te extends Ot {
    constructor(e, t, n, i, s, o, l, a, c) {
        super(e, [], s, o),
        this.node = t,
        this.outerDeco = n,
        this.innerDeco = i,
        this.nodeDOM = l
    }
    static create(e, t, n, i, s, o) {
        let l = s.nodeViews[t.type.name], a, c = l && l(t, s, () => {
            if (!a)
                return o;
            if (a.parent)
                return a.parent.posBeforeChild(a)
        }
        , n, i), d = c && c.dom, f = c && c.contentDOM;
        if (t.isText) {
            if (!d)
                d = document.createTextNode(t.text);
            else if (d.nodeType != 3)
                throw new RangeError("Text must be rendered as a DOM text node")
        } else
            d || ({dom: d, contentDOM: f} = Ke.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
        !f && !t.isText && d.nodeName != "BR" && (d.hasAttribute("contenteditable") || (d.contentEditable = "false"),
        t.type.spec.draggable && (d.draggable = !0));
        let u = d;
        return d = Ss(d, n, t),
        c ? a = new Wl(e,t,n,i,d,f || null,u,c,s,o + 1) : t.isText ? new nn(e,t,n,i,d,u,s) : new Te(e,t,n,i,d,f || null,u,s,o + 1)
    }
    parseRule() {
        if (this.node.type.spec.reparseInView)
            return null;
        let e = {
            node: this.node.type.name,
            attrs: this.node.attrs
        };
        if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"),
        !this.contentDOM)
            e.getContent = () => this.node.content;
        else if (!this.contentLost)
            e.contentElement = this.contentDOM;
        else {
            for (let t = this.children.length - 1; t >= 0; t--) {
                let n = this.children[t];
                if (this.dom.contains(n.dom.parentNode)) {
                    e.contentElement = n.dom.parentNode;
                    break
                }
            }
            e.contentElement || (e.getContent = () => b.empty)
        }
        return e
    }
    matchesNode(e, t, n) {
        return this.dirty == ne && e.eq(this.node) && Ht(t, this.outerDeco) && n.eq(this.innerDeco)
    }
    get size() {
        return this.node.nodeSize
    }
    get border() {
        return this.node.isLeaf ? 0 : 1
    }
    updateChildren(e, t) {
        let n = this.node.inlineContent
          , i = t
          , s = e.composing ? this.localCompositionInfo(e, t) : null
          , o = s && s.pos > -1 ? s : null
          , l = s && s.pos < 0
          , a = new jl(this,o && o.node,e);
        Kl(this.node, this.innerDeco, (c, d, f) => {
            c.spec.marks ? a.syncToMarks(c.spec.marks, n, e) : c.type.side >= 0 && !f && a.syncToMarks(d == this.node.childCount ? I.none : this.node.child(d).marks, n, e),
            a.placeWidget(c, e, i)
        }
        , (c, d, f, u) => {
            a.syncToMarks(c.marks, n, e);
            let h;
            a.findNodeMatch(c, d, f, u) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, d, f, h, e) || a.updateNextNode(c, d, f, e, u, i) || a.addNode(c, d, f, e, i),
            i += c.nodeSize
        }
        ),
        a.syncToMarks([], n, e),
        this.node.isTextblock && a.addTextblockHacks(),
        a.destroyRest(),
        (a.changed || this.dirty == Be) && (o && this.protectLocalComposition(e, o),
        ks(this.contentDOM, this.children, e),
        it && Ul(this.dom))
    }
    localCompositionInfo(e, t) {
        let {from: n, to: i} = e.state.selection;
        if (!(e.state.selection instanceof T) || n < t || i > t + this.node.content.size)
            return null;
        let s = e.input.compositionNode;
        if (!s || !this.dom.contains(s.parentNode))
            return null;
        if (this.node.inlineContent) {
            let o = s.nodeValue
              , l = _l(this.node.content, o, n - t, i - t);
            return l < 0 ? null : {
                node: s,
                pos: l,
                text: o
            }
        } else
            return {
                node: s,
                pos: -1,
                text: ""
            }
    }
    protectLocalComposition(e, {node: t, pos: n, text: i}) {
        if (this.getDesc(t))
            return;
        let s = t;
        for (; s.parentNode != this.contentDOM; s = s.parentNode) {
            for (; s.previousSibling; )
                s.parentNode.removeChild(s.previousSibling);
            for (; s.nextSibling; )
                s.parentNode.removeChild(s.nextSibling);
            s.pmViewDesc && (s.pmViewDesc = void 0)
        }
        let o = new $l(this,s,t,i);
        e.input.compositionNodes.push(o),
        this.children = $n(this.children, n, n + i.length, e, o)
    }
    update(e, t, n, i) {
        return this.dirty == ae || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, i),
        !0)
    }
    updateInner(e, t, n, i) {
        this.updateOuterDeco(t),
        this.node = e,
        this.innerDeco = n,
        this.contentDOM && this.updateChildren(i, this.posAtStart),
        this.dirty = ne
    }
    updateOuterDeco(e) {
        if (Ht(e, this.outerDeco))
            return;
        let t = this.nodeDOM.nodeType != 1
          , n = this.dom;
        this.dom = xs(this.dom, this.nodeDOM, Vn(this.outerDeco, this.node, t), Vn(e, this.node, t)),
        this.dom != n && (n.pmViewDesc = void 0,
        this.dom.pmViewDesc = this),
        this.outerDeco = e
    }
    selectNode() {
        this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"),
        (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0)
    }
    deselectNode() {
        this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"),
        (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable"))
    }
    get domAtom() {
        return this.node.isAtom
    }
}
function Ur(r, e, t, n, i) {
    Ss(n, e, r);
    let s = new Te(void 0,r,e,t,n,n,n,i,0);
    return s.contentDOM && s.updateChildren(i, 0),
    s
}
class nn extends Te {
    constructor(e, t, n, i, s, o, l) {
        super(e, t, n, i, s, null, o, l, 0)
    }
    parseRule() {
        let e = this.nodeDOM.parentNode;
        for (; e && e != this.dom && !e.pmIsDeco; )
            e = e.parentNode;
        return {
            skip: e || !0
        }
    }
    update(e, t, n, i) {
        return this.dirty == ae || this.dirty != ne && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t),
        (this.dirty != ne || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text,
        i.trackWrites == this.nodeDOM && (i.trackWrites = null)),
        this.node = e,
        this.dirty = ne,
        !0)
    }
    inParent() {
        let e = this.parent.contentDOM;
        for (let t = this.nodeDOM; t; t = t.parentNode)
            if (t == e)
                return !0;
        return !1
    }
    domFromPos(e) {
        return {
            node: this.nodeDOM,
            offset: e
        }
    }
    localPosFromDOM(e, t, n) {
        return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, n)
    }
    ignoreMutation(e) {
        return e.type != "characterData" && e.type != "selection"
    }
    slice(e, t, n) {
        let i = this.node.cut(e, t)
          , s = document.createTextNode(i.text);
        return new nn(this.parent,i,this.outerDeco,this.innerDeco,s,s,n)
    }
    markDirty(e, t) {
        super.markDirty(e, t),
        this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = ae)
    }
    get domAtom() {
        return !1
    }
    isText(e) {
        return this.node.text == e
    }
}
class bs extends Ot {
    parseRule() {
        return {
            ignore: !0
        }
    }
    matchesHack(e) {
        return this.dirty == ne && this.dom.nodeName == e
    }
    get domAtom() {
        return !0
    }
    get ignoreForCoords() {
        return this.dom.nodeName == "IMG"
    }
}
class Wl extends Te {
    constructor(e, t, n, i, s, o, l, a, c, d) {
        super(e, t, n, i, s, o, l, c, d),
        this.spec = a
    }
    update(e, t, n, i) {
        if (this.dirty == ae)
            return !1;
        if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
            let s = this.spec.update(e, t, n);
            return s && this.updateInner(e, t, n, i),
            s
        } else
            return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, n, i)
    }
    selectNode() {
        this.spec.selectNode ? this.spec.selectNode() : super.selectNode()
    }
    deselectNode() {
        this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode()
    }
    setSelection(e, t, n, i) {
        this.spec.setSelection ? this.spec.setSelection(e, t, n.root) : super.setSelection(e, t, n, i)
    }
    destroy() {
        this.spec.destroy && this.spec.destroy(),
        super.destroy()
    }
    stopEvent(e) {
        return this.spec.stopEvent ? this.spec.stopEvent(e) : !1
    }
    ignoreMutation(e) {
        return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e)
    }
}
function ks(r, e, t) {
    let n = r.firstChild
      , i = !1;
    for (let s = 0; s < e.length; s++) {
        let o = e[s]
          , l = o.dom;
        if (l.parentNode == r) {
            for (; l != n; )
                n = _r(n),
                i = !0;
            n = n.nextSibling
        } else
            i = !0,
            r.insertBefore(l, n);
        if (o instanceof Je) {
            let a = n ? n.previousSibling : r.lastChild;
            ks(o.contentDOM, o.children, t),
            n = a ? a.nextSibling : r.firstChild
        }
    }
    for (; n; )
        n = _r(n),
        i = !0;
    i && t.trackWrites == r && (t.trackWrites = null)
}
const ht = function(r) {
    r && (this.nodeName = r)
};
ht.prototype = Object.create(null);
const ze = [new ht];
function Vn(r, e, t) {
    if (r.length == 0)
        return ze;
    let n = t ? ze[0] : new ht
      , i = [n];
    for (let s = 0; s < r.length; s++) {
        let o = r[s].type.attrs;
        if (o) {
            o.nodeName && i.push(n = new ht(o.nodeName));
            for (let l in o) {
                let a = o[l];
                a != null && (t && i.length == 1 && i.push(n = new ht(e.isInline ? "span" : "div")),
                l == "class" ? n.class = (n.class ? n.class + " " : "") + a : l == "style" ? n.style = (n.style ? n.style + ";" : "") + a : l != "nodeName" && (n[l] = a))
            }
        }
    }
    return i
}
function xs(r, e, t, n) {
    if (t == ze && n == ze)
        return e;
    let i = e;
    for (let s = 0; s < n.length; s++) {
        let o = n[s]
          , l = t[s];
        if (s) {
            let a;
            l && l.nodeName == o.nodeName && i != r && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName),
            a.pmIsDeco = !0,
            a.appendChild(i),
            l = ze[0]),
            i = a
        }
        Hl(i, l || ze[0], o)
    }
    return i
}
function Hl(r, e, t) {
    for (let n in e)
        n != "class" && n != "style" && n != "nodeName" && !(n in t) && r.removeAttribute(n);
    for (let n in t)
        n != "class" && n != "style" && n != "nodeName" && t[n] != e[n] && r.setAttribute(n, t[n]);
    if (e.class != t.class) {
        let n = e.class ? e.class.split(" ").filter(Boolean) : []
          , i = t.class ? t.class.split(" ").filter(Boolean) : [];
        for (let s = 0; s < n.length; s++)
            i.indexOf(n[s]) == -1 && r.classList.remove(n[s]);
        for (let s = 0; s < i.length; s++)
            n.indexOf(i[s]) == -1 && r.classList.add(i[s]);
        r.classList.length == 0 && r.removeAttribute("class")
    }
    if (e.style != t.style) {
        if (e.style) {
            let n = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
            for (; i = n.exec(e.style); )
                r.style.removeProperty(i[1])
        }
        t.style && (r.style.cssText += t.style)
    }
}
function Ss(r, e, t) {
    return xs(r, r, ze, Vn(e, t, r.nodeType != 1))
}
function Ht(r, e) {
    if (r.length != e.length)
        return !1;
    for (let t = 0; t < r.length; t++)
        if (!r[t].type.eq(e[t].type))
            return !1;
    return !0
}
function _r(r) {
    let e = r.nextSibling;
    return r.parentNode.removeChild(r),
    e
}
class jl {
    constructor(e, t, n) {
        this.lock = t,
        this.view = n,
        this.index = 0,
        this.stack = [],
        this.changed = !1,
        this.top = e,
        this.preMatch = Jl(e.node.content, e)
    }
    destroyBetween(e, t) {
        if (e != t) {
            for (let n = e; n < t; n++)
                this.top.children[n].destroy();
            this.top.children.splice(e, t - e),
            this.changed = !0
        }
    }
    destroyRest() {
        this.destroyBetween(this.index, this.top.children.length)
    }
    syncToMarks(e, t, n) {
        let i = 0
          , s = this.stack.length >> 1
          , o = Math.min(s, e.length);
        for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
            i++;
        for (; i < s; )
            this.destroyRest(),
            this.top.dirty = ne,
            this.index = this.stack.pop(),
            this.top = this.stack.pop(),
            s--;
        for (; s < e.length; ) {
            this.stack.push(this.top, this.index + 1);
            let l = -1;
            for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
                let c = this.top.children[a];
                if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
                    l = a;
                    break
                }
            }
            if (l > -1)
                l > this.index && (this.changed = !0,
                this.destroyBetween(this.index, l)),
                this.top = this.top.children[this.index];
            else {
                let a = Je.create(this.top, e[s], t, n);
                this.top.children.splice(this.index, 0, a),
                this.top = a,
                this.changed = !0
            }
            this.index = 0,
            s++
        }
    }
    findNodeMatch(e, t, n, i) {
        let s = -1, o;
        if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, n))
            s = this.top.children.indexOf(o, this.index);
        else
            for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
                let c = this.top.children[l];
                if (c.matchesNode(e, t, n) && !this.preMatch.matched.has(c)) {
                    s = l;
                    break
                }
            }
        return s < 0 ? !1 : (this.destroyBetween(this.index, s),
        this.index++,
        !0)
    }
    updateNodeAt(e, t, n, i, s) {
        let o = this.top.children[i];
        return o.dirty == ae && o.dom == o.contentDOM && (o.dirty = Be),
        o.update(e, t, n, s) ? (this.destroyBetween(this.index, i),
        this.index++,
        !0) : !1
    }
    findIndexWithChild(e) {
        for (; ; ) {
            let t = e.parentNode;
            if (!t)
                return -1;
            if (t == this.top.contentDOM) {
                let n = e.pmViewDesc;
                if (n) {
                    for (let i = this.index; i < this.top.children.length; i++)
                        if (this.top.children[i] == n)
                            return i
                }
                return -1
            }
            e = t
        }
    }
    updateNextNode(e, t, n, i, s, o) {
        for (let l = this.index; l < this.top.children.length; l++) {
            let a = this.top.children[l];
            if (a instanceof Te) {
                let c = this.preMatch.matched.get(a);
                if (c != null && c != s)
                    return !1;
                let d = a.dom, f, u = this.isLocked(d) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != ae && Ht(t, a.outerDeco));
                if (!u && a.update(e, t, n, i))
                    return this.destroyBetween(this.index, l),
                    a.dom != d && (this.changed = !0),
                    this.index++,
                    !0;
                if (!u && (f = this.recreateWrapper(a, e, t, n, i, o)))
                    return this.destroyBetween(this.index, l),
                    this.top.children[this.index] = f,
                    f.contentDOM && (f.dirty = Be,
                    f.updateChildren(i, o + 1),
                    f.dirty = ne),
                    this.changed = !0,
                    this.index++,
                    !0;
                break
            }
        }
        return !1
    }
    recreateWrapper(e, t, n, i, s, o) {
        if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Ht(n, e.outerDeco) || !i.eq(e.innerDeco))
            return null;
        let l = Te.create(this.top, t, n, i, s, o);
        if (l.contentDOM) {
            l.children = e.children,
            e.children = [];
            for (let a of l.children)
                a.parent = l
        }
        return e.destroy(),
        l
    }
    addNode(e, t, n, i, s) {
        let o = Te.create(this.top, e, t, n, i, s);
        o.contentDOM && o.updateChildren(i, s + 1),
        this.top.children.splice(this.index++, 0, o),
        this.changed = !0
    }
    placeWidget(e, t, n) {
        let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
        if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
            this.index++;
        else {
            let s = new ys(this.top,e,t,n);
            this.top.children.splice(this.index++, 0, s),
            this.changed = !0
        }
    }
    addTextblockHacks() {
        let e = this.top.children[this.index - 1]
          , t = this.top;
        for (; e instanceof Je; )
            t = e,
            e = t.children[t.children.length - 1];
        (!e || !(e instanceof nn) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((U || J) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t),
        this.addHackNode("BR", this.top))
    }
    addHackNode(e, t) {
        if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
            this.index++;
        else {
            let n = document.createElement(e);
            e == "IMG" && (n.className = "ProseMirror-separator",
            n.alt = ""),
            e == "BR" && (n.className = "ProseMirror-trailingBreak");
            let i = new bs(this.top,[],n,null);
            t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i),
            this.changed = !0
        }
    }
    isLocked(e) {
        return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode))
    }
}
function Jl(r, e) {
    let t = e
      , n = t.children.length
      , i = r.childCount
      , s = new Map
      , o = [];
    e: for (; i > 0; ) {
        let l;
        for (; ; )
            if (n) {
                let c = t.children[n - 1];
                if (c instanceof Je)
                    t = c,
                    n = c.children.length;
                else {
                    l = c,
                    n--;
                    break
                }
            } else {
                if (t == e)
                    break e;
                n = t.parent.children.indexOf(t),
                t = t.parent
            }
        let a = l.node;
        if (a) {
            if (a != r.child(i - 1))
                break;
            --i,
            s.set(l, i),
            o.push(l)
        }
    }
    return {
        index: i,
        matched: s,
        matches: o.reverse()
    }
}
function ql(r, e) {
    return r.type.side - e.type.side
}
function Kl(r, e, t, n) {
    let i = e.locals(r)
      , s = 0;
    if (i.length == 0) {
        for (let c = 0; c < r.childCount; c++) {
            let d = r.child(c);
            n(d, i, e.forChild(s, d), c),
            s += d.nodeSize
        }
        return
    }
    let o = 0
      , l = []
      , a = null;
    for (let c = 0; ; ) {
        let d, f;
        for (; o < i.length && i[o].to == s; ) {
            let g = i[o++];
            g.widget && (d ? (f || (f = [d])).push(g) : d = g)
        }
        if (d)
            if (f) {
                f.sort(ql);
                for (let g = 0; g < f.length; g++)
                    t(f[g], c, !!a)
            } else
                t(d, c, !!a);
        let u, h;
        if (a)
            h = -1,
            u = a,
            a = null;
        else if (c < r.childCount)
            h = c,
            u = r.child(c++);
        else
            break;
        for (let g = 0; g < l.length; g++)
            l[g].to <= s && l.splice(g--, 1);
        for (; o < i.length && i[o].from <= s && i[o].to > s; )
            l.push(i[o++]);
        let p = s + u.nodeSize;
        if (u.isText) {
            let g = p;
            o < i.length && i[o].from < g && (g = i[o].from);
            for (let y = 0; y < l.length; y++)
                l[y].to < g && (g = l[y].to);
            g < p && (a = u.cut(g - s),
            u = u.cut(0, g - s),
            p = g,
            h = -1)
        } else
            for (; o < i.length && i[o].to < p; )
                o++;
        let m = u.isInline && !u.isLeaf ? l.filter(g => !g.inline) : l.slice();
        n(u, m, e.forChild(s, u), h),
        s = p
    }
}
function Ul(r) {
    if (r.nodeName == "UL" || r.nodeName == "OL") {
        let e = r.style.cssText;
        r.style.cssText = e + "; list-style: square !important",
        window.getComputedStyle(r).listStyle,
        r.style.cssText = e
    }
}
function _l(r, e, t, n) {
    for (let i = 0, s = 0; i < r.childCount && s <= n; ) {
        let o = r.child(i++)
          , l = s;
        if (s += o.nodeSize,
        !o.isText)
            continue;
        let a = o.text;
        for (; i < r.childCount; ) {
            let c = r.child(i++);
            if (s += c.nodeSize,
            !c.isText)
                break;
            a += c.text
        }
        if (s >= t) {
            if (s >= n && a.slice(n - e.length - l, n - l) == e)
                return n - e.length;
            let c = l < n ? a.lastIndexOf(e, n - l - 1) : -1;
            if (c >= 0 && c + e.length + l >= t)
                return l + c;
            if (t == n && a.length >= n + e.length - l && a.slice(n - l, n - l + e.length) == e)
                return n
        }
    }
    return -1
}
function $n(r, e, t, n, i) {
    let s = [];
    for (let o = 0, l = 0; o < r.length; o++) {
        let a = r[o]
          , c = l
          , d = l += a.size;
        c >= t || d <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, n)),
        i && (s.push(i),
        i = void 0),
        d > t && s.push(a.slice(t - c, a.size, n)))
    }
    return s
}
function Qn(r, e=null) {
    let t = r.domSelectionRange()
      , n = r.state.doc;
    if (!t.focusNode)
        return null;
    let i = r.docView.nearestDesc(t.focusNode)
      , s = i && i.size == 0
      , o = r.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
    if (o < 0)
        return null;
    let l = n.resolve(o), a, c;
    if (tn(t)) {
        for (a = o; i && !i.node; )
            i = i.parent;
        let f = i.node;
        if (i && f.isAtom && M.isSelectable(f) && i.parent && !(f.isInline && xl(t.focusNode, t.focusOffset, i.dom))) {
            let u = i.posBefore;
            c = new M(o == u ? l : n.resolve(u))
        }
    } else {
        if (t instanceof r.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
            let f = o
              , u = o;
            for (let h = 0; h < t.rangeCount; h++) {
                let p = t.getRangeAt(h);
                f = Math.min(f, r.docView.posFromDOM(p.startContainer, p.startOffset, 1)),
                u = Math.max(u, r.docView.posFromDOM(p.endContainer, p.endOffset, -1))
            }
            if (f < 0)
                return null;
            [a,o] = u == r.state.selection.anchor ? [u, f] : [f, u],
            l = n.resolve(o)
        } else
            a = r.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
        if (a < 0)
            return null
    }
    let d = n.resolve(a);
    if (!c) {
        let f = e == "pointer" || r.state.selection.head < l.pos && !s ? 1 : -1;
        c = er(r, d, l, f)
    }
    return c
}
function Ms(r) {
    return r.editable ? r.hasFocus() : ws(r) && document.activeElement && document.activeElement.contains(r.dom)
}
function me(r, e=!1) {
    let t = r.state.selection;
    if (Cs(r, t),
    !!Ms(r)) {
        if (!e && r.input.mouseDown && r.input.mouseDown.allowDefault && J) {
            let n = r.domSelectionRange()
              , i = r.domObserver.currentSelection;
            if (n.anchorNode && i.anchorNode && je(n.anchorNode, n.anchorOffset, i.anchorNode, i.anchorOffset)) {
                r.input.mouseDown.delayedSelectionSync = !0,
                r.domObserver.setCurSelection();
                return
            }
        }
        if (r.domObserver.disconnectSelection(),
        r.cursorWrapper)
            Yl(r);
        else {
            let {anchor: n, head: i} = t, s, o;
            Gr && !(t instanceof T) && (t.$from.parent.inlineContent || (s = Yr(r, t.from)),
            !t.empty && !t.$from.parent.inlineContent && (o = Yr(r, t.to))),
            r.docView.setSelection(n, i, r, e),
            Gr && (s && Xr(s),
            o && Xr(o)),
            t.visible ? r.dom.classList.remove("ProseMirror-hideselection") : (r.dom.classList.add("ProseMirror-hideselection"),
            "onselectionchange"in document && Gl(r))
        }
        r.domObserver.setCurSelection(),
        r.domObserver.connectSelection()
    }
}
const Gr = U || J && ds < 63;
function Yr(r, e) {
    let {node: t, offset: n} = r.docView.domFromPos(e, 0)
      , i = n < t.childNodes.length ? t.childNodes[n] : null
      , s = n ? t.childNodes[n - 1] : null;
    if (U && i && i.contentEditable == "false")
        return xn(i);
    if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
        if (i)
            return xn(i);
        if (s)
            return xn(s)
    }
}
function xn(r) {
    return r.contentEditable = "true",
    U && r.draggable && (r.draggable = !1,
    r.wasDraggable = !0),
    r
}
function Xr(r) {
    r.contentEditable = "false",
    r.wasDraggable && (r.draggable = !0,
    r.wasDraggable = null)
}
function Gl(r) {
    let e = r.dom.ownerDocument;
    e.removeEventListener("selectionchange", r.input.hideSelectionGuard);
    let t = r.domSelectionRange()
      , n = t.anchorNode
      , i = t.anchorOffset;
    e.addEventListener("selectionchange", r.input.hideSelectionGuard = () => {
        (t.anchorNode != n || t.anchorOffset != i) && (e.removeEventListener("selectionchange", r.input.hideSelectionGuard),
        setTimeout( () => {
            (!Ms(r) || r.state.selection.visible) && r.dom.classList.remove("ProseMirror-hideselection")
        }
        , 20))
    }
    )
}
function Yl(r) {
    let e = r.domSelection()
      , t = document.createRange();
    if (!e)
        return;
    let n = r.cursorWrapper.dom
      , i = n.nodeName == "IMG";
    i ? t.setStart(n.parentNode, W(n) + 1) : t.setStart(n, 0),
    t.collapse(!0),
    e.removeAllRanges(),
    e.addRange(t),
    !i && !r.state.selection.visible && X && Oe <= 11 && (n.disabled = !0,
    n.disabled = !1)
}
function Cs(r, e) {
    if (e instanceof M) {
        let t = r.docView.descAt(e.from);
        t != r.lastSelectedViewDesc && (Zr(r),
        t && t.selectNode(),
        r.lastSelectedViewDesc = t)
    } else
        Zr(r)
}
function Zr(r) {
    r.lastSelectedViewDesc && (r.lastSelectedViewDesc.parent && r.lastSelectedViewDesc.deselectNode(),
    r.lastSelectedViewDesc = void 0)
}
function er(r, e, t, n) {
    return r.someProp("createSelectionBetween", i => i(r, e, t)) || T.between(e, t, n)
}
function Qr(r) {
    return r.editable && !r.hasFocus() ? !1 : ws(r)
}
function ws(r) {
    let e = r.domSelectionRange();
    if (!e.anchorNode)
        return !1;
    try {
        return r.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (r.editable || r.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode))
    } catch (t) {
        return !1
    }
}
function Xl(r) {
    let e = r.docView.domFromPos(r.state.selection.anchor, 0)
      , t = r.domSelectionRange();
    return je(e.node, e.offset, t.anchorNode, t.anchorOffset)
}
function Wn(r, e) {
    let {$anchor: t, $head: n} = r.selection
      , i = e > 0 ? t.max(n) : t.min(n)
      , s = i.parent.inlineContent ? i.depth ? r.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
    return s && E.findFrom(s, e)
}
function be(r, e) {
    return r.dispatch(r.state.tr.setSelection(e).scrollIntoView()),
    !0
}
function ei(r, e, t) {
    let n = r.state.selection;
    if (n instanceof T)
        if (t.indexOf("s") > -1) {
            let {$head: i} = n
              , s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
            if (!s || s.isText || !s.isLeaf)
                return !1;
            let o = r.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
            return be(r, new T(n.$anchor,o))
        } else if (n.empty) {
            if (r.endOfTextblock(e > 0 ? "forward" : "backward")) {
                let i = Wn(r.state, e);
                return i && i instanceof M ? be(r, i) : !1
            } else if (!(ee && t.indexOf("m") > -1)) {
                let i = n.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
                if (!s || s.isText)
                    return !1;
                let l = e < 0 ? i.pos - s.nodeSize : i.pos;
                return s.isAtom || (o = r.docView.descAt(l)) && !o.contentDOM ? M.isSelectable(s) ? be(r, new M(e < 0 ? r.state.doc.resolve(i.pos - s.nodeSize) : i)) : wt ? be(r, new T(r.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1
            }
        } else
            return !1;
    else {
        if (n instanceof M && n.node.isInline)
            return be(r, new T(e > 0 ? n.$to : n.$from));
        {
            let i = Wn(r.state, e);
            return i ? be(r, i) : !1
        }
    }
}
function jt(r) {
    return r.nodeType == 3 ? r.nodeValue.length : r.childNodes.length
}
function pt(r, e) {
    let t = r.pmViewDesc;
    return t && t.size == 0 && (e < 0 || r.nextSibling || r.nodeName != "BR")
}
function Ge(r, e) {
    return e < 0 ? Zl(r) : Ql(r)
}
function Zl(r) {
    let e = r.domSelectionRange()
      , t = e.focusNode
      , n = e.focusOffset;
    if (!t)
        return;
    let i, s, o = !1;
    for (ie && t.nodeType == 1 && n < jt(t) && pt(t.childNodes[n], -1) && (o = !0); ; )
        if (n > 0) {
            if (t.nodeType != 1)
                break;
            {
                let l = t.childNodes[n - 1];
                if (pt(l, -1))
                    i = t,
                    s = --n;
                else if (l.nodeType == 3)
                    t = l,
                    n = t.nodeValue.length;
                else
                    break
            }
        } else {
            if (Os(t))
                break;
            {
                let l = t.previousSibling;
                for (; l && pt(l, -1); )
                    i = t.parentNode,
                    s = W(l),
                    l = l.previousSibling;
                if (l)
                    t = l,
                    n = jt(t);
                else {
                    if (t = t.parentNode,
                    t == r.dom)
                        break;
                    n = 0
                }
            }
        }
    o ? Hn(r, t, n) : i && Hn(r, i, s)
}
function Ql(r) {
    let e = r.domSelectionRange()
      , t = e.focusNode
      , n = e.focusOffset;
    if (!t)
        return;
    let i = jt(t), s, o;
    for (; ; )
        if (n < i) {
            if (t.nodeType != 1)
                break;
            let l = t.childNodes[n];
            if (pt(l, 1))
                s = t,
                o = ++n;
            else
                break
        } else {
            if (Os(t))
                break;
            {
                let l = t.nextSibling;
                for (; l && pt(l, 1); )
                    s = l.parentNode,
                    o = W(l) + 1,
                    l = l.nextSibling;
                if (l)
                    t = l,
                    n = 0,
                    i = jt(t);
                else {
                    if (t = t.parentNode,
                    t == r.dom)
                        break;
                    n = i = 0
                }
            }
        }
    s && Hn(r, s, o)
}
function Os(r) {
    let e = r.pmViewDesc;
    return e && e.node && e.node.isBlock
}
function ea(r, e) {
    for (; r && e == r.childNodes.length && !Ct(r); )
        e = W(r) + 1,
        r = r.parentNode;
    for (; r && e < r.childNodes.length; ) {
        let t = r.childNodes[e];
        if (t.nodeType == 3)
            return t;
        if (t.nodeType == 1 && t.contentEditable == "false")
            break;
        r = t,
        e = 0
    }
}
function ta(r, e) {
    for (; r && !e && !Ct(r); )
        e = W(r),
        r = r.parentNode;
    for (; r && e; ) {
        let t = r.childNodes[e - 1];
        if (t.nodeType == 3)
            return t;
        if (t.nodeType == 1 && t.contentEditable == "false")
            break;
        r = t,
        e = r.childNodes.length
    }
}
function Hn(r, e, t) {
    if (e.nodeType != 3) {
        let s, o;
        (o = ea(e, t)) ? (e = o,
        t = 0) : (s = ta(e, t)) && (e = s,
        t = s.nodeValue.length)
    }
    let n = r.domSelection();
    if (!n)
        return;
    if (tn(n)) {
        let s = document.createRange();
        s.setEnd(e, t),
        s.setStart(e, t),
        n.removeAllRanges(),
        n.addRange(s)
    } else
        n.extend && n.extend(e, t);
    r.domObserver.setCurSelection();
    let {state: i} = r;
    setTimeout( () => {
        r.state == i && me(r)
    }
    , 50)
}
function ti(r, e) {
    let t = r.state.doc.resolve(e);
    if (!(J || Cl) && t.parent.inlineContent) {
        let i = r.coordsAtPos(e);
        if (e > t.start()) {
            let s = r.coordsAtPos(e - 1)
              , o = (s.top + s.bottom) / 2;
            if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
                return s.left < i.left ? "ltr" : "rtl"
        }
        if (e < t.end()) {
            let s = r.coordsAtPos(e + 1)
              , o = (s.top + s.bottom) / 2;
            if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
                return s.left > i.left ? "ltr" : "rtl"
        }
    }
    return getComputedStyle(r.dom).direction == "rtl" ? "rtl" : "ltr"
}
function ni(r, e, t) {
    let n = r.state.selection;
    if (n instanceof T && !n.empty || t.indexOf("s") > -1 || ee && t.indexOf("m") > -1)
        return !1;
    let {$from: i, $to: s} = n;
    if (!i.parent.inlineContent || r.endOfTextblock(e < 0 ? "up" : "down")) {
        let o = Wn(r.state, e);
        if (o && o instanceof M)
            return be(r, o)
    }
    if (!i.parent.inlineContent) {
        let o = e < 0 ? i : s
          , l = n instanceof Q ? E.near(o, e) : E.findFrom(o, e);
        return l ? be(r, l) : !1
    }
    return !1
}
function ri(r, e) {
    if (!(r.state.selection instanceof T))
        return !0;
    let {$head: t, $anchor: n, empty: i} = r.state.selection;
    if (!t.sameParent(n))
        return !0;
    if (!i)
        return !1;
    if (r.endOfTextblock(e > 0 ? "forward" : "backward"))
        return !0;
    let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
    if (s && !s.isText) {
        let o = r.state.tr;
        return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize),
        r.dispatch(o),
        !0
    }
    return !1
}
function ii(r, e, t) {
    r.domObserver.stop(),
    e.contentEditable = t,
    r.domObserver.start()
}
function na(r) {
    if (!U || r.state.selection.$head.parentOffset > 0)
        return !1;
    let {focusNode: e, focusOffset: t} = r.domSelectionRange();
    if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
        let n = e.firstChild;
        ii(r, n, "true"),
        setTimeout( () => ii(r, n, "false"), 20)
    }
    return !1
}
function ra(r) {
    let e = "";
    return r.ctrlKey && (e += "c"),
    r.metaKey && (e += "m"),
    r.altKey && (e += "a"),
    r.shiftKey && (e += "s"),
    e
}
function ia(r, e) {
    let t = e.keyCode
      , n = ra(e);
    if (t == 8 || ee && t == 72 && n == "c")
        return ri(r, -1) || Ge(r, -1);
    if (t == 46 && !e.shiftKey || ee && t == 68 && n == "c")
        return ri(r, 1) || Ge(r, 1);
    if (t == 13 || t == 27)
        return !0;
    if (t == 37 || ee && t == 66 && n == "c") {
        let i = t == 37 ? ti(r, r.state.selection.from) == "ltr" ? -1 : 1 : -1;
        return ei(r, i, n) || Ge(r, i)
    } else if (t == 39 || ee && t == 70 && n == "c") {
        let i = t == 39 ? ti(r, r.state.selection.from) == "ltr" ? 1 : -1 : 1;
        return ei(r, i, n) || Ge(r, i)
    } else {
        if (t == 38 || ee && t == 80 && n == "c")
            return ni(r, -1, n) || Ge(r, -1);
        if (t == 40 || ee && t == 78 && n == "c")
            return na(r) || ni(r, 1, n) || Ge(r, 1);
        if (n == (ee ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
            return !0
    }
    return !1
}
function tr(r, e) {
    r.someProp("transformCopied", h => {
        e = h(e, r)
    }
    );
    let t = []
      , {content: n, openStart: i, openEnd: s} = e;
    for (; i > 1 && s > 1 && n.childCount == 1 && n.firstChild.childCount == 1; ) {
        i--,
        s--;
        let h = n.firstChild;
        t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null),
        n = h.content
    }
    let o = r.someProp("clipboardSerializer") || Ke.fromSchema(r.state.schema)
      , l = Is()
      , a = l.createElement("div");
    a.appendChild(o.serializeFragment(n, {
        document: l
    }));
    let c = a.firstChild, d, f = 0;
    for (; c && c.nodeType == 1 && (d = As[c.nodeName.toLowerCase()]); ) {
        for (let h = d.length - 1; h >= 0; h--) {
            let p = l.createElement(d[h]);
            for (; a.firstChild; )
                p.appendChild(a.firstChild);
            a.appendChild(p),
            f++
        }
        c = a.firstChild
    }
    c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${f ? ` -${f}` : ""} ${JSON.stringify(t)}`);
    let u = r.someProp("clipboardTextSerializer", h => h(e, r)) || e.content.textBetween(0, e.content.size, `

`);
    return {
        dom: a,
        text: u,
        slice: e
    }
}
function Ts(r, e, t, n, i) {
    let s = i.parent.type.spec.code, o, l;
    if (!t && !e)
        return null;
    let a = e && (n || s || !t);
    if (a) {
        if (r.someProp("transformPastedText", u => {
            e = u(e, s || n, r)
        }
        ),
        s)
            return e ? new x(b.from(r.state.schema.text(e.replace(/\r\n?/g, `
`))),0,0) : x.empty;
        let f = r.someProp("clipboardTextParser", u => u(e, i, n, r));
        if (f)
            l = f;
        else {
            let u = i.marks()
              , {schema: h} = r.state
              , p = Ke.fromSchema(h);
            o = document.createElement("div"),
            e.split(/(?:\r\n?|\n)+/).forEach(m => {
                let g = o.appendChild(document.createElement("p"));
                m && g.appendChild(p.serializeNode(h.text(m, u)))
            }
            )
        }
    } else
        r.someProp("transformPastedHTML", f => {
            t = f(t, r)
        }
        ),
        o = aa(t),
        wt && ca(o);
    let c = o && o.querySelector("[data-pm-slice]")
      , d = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
    if (d && d[3])
        for (let f = +d[3]; f > 0; f--) {
            let u = o.firstChild;
            for (; u && u.nodeType != 1; )
                u = u.nextSibling;
            if (!u)
                break;
            o = u
        }
    if (l || (l = (r.someProp("clipboardParser") || r.someProp("domParser") || we.fromSchema(r.state.schema)).parseSlice(o, {
        preserveWhitespace: !!(a || d),
        context: i,
        ruleFromNode(u) {
            return u.nodeName == "BR" && !u.nextSibling && u.parentNode && !sa.test(u.parentNode.nodeName) ? {
                ignore: !0
            } : null
        }
    })),
    d)
        l = da(si(l, +d[1], +d[2]), d[4]);
    else if (l = x.maxOpen(oa(l.content, i), !0),
    l.openStart || l.openEnd) {
        let f = 0
          , u = 0;
        for (let h = l.content.firstChild; f < l.openStart && !h.type.spec.isolating; f++,
        h = h.firstChild)
            ;
        for (let h = l.content.lastChild; u < l.openEnd && !h.type.spec.isolating; u++,
        h = h.lastChild)
            ;
        l = si(l, f, u)
    }
    return r.someProp("transformPasted", f => {
        l = f(l, r)
    }
    ),
    l
}
const sa = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function oa(r, e) {
    if (r.childCount < 2)
        return r;
    for (let t = e.depth; t >= 0; t--) {
        let i = e.node(t).contentMatchAt(e.index(t)), s, o = [];
        if (r.forEach(l => {
            if (!o)
                return;
            let a = i.findWrapping(l.type), c;
            if (!a)
                return o = null;
            if (c = o.length && s.length && Es(a, s, l, o[o.length - 1], 0))
                o[o.length - 1] = c;
            else {
                o.length && (o[o.length - 1] = Ds(o[o.length - 1], s.length));
                let d = Ns(l, a);
                o.push(d),
                i = i.matchType(d.type),
                s = a
            }
        }
        ),
        o)
            return b.from(o)
    }
    return r
}
function Ns(r, e, t=0) {
    for (let n = e.length - 1; n >= t; n--)
        r = e[n].create(null, b.from(r));
    return r
}
function Es(r, e, t, n, i) {
    if (i < r.length && i < e.length && r[i] == e[i]) {
        let s = Es(r, e, t, n.lastChild, i + 1);
        if (s)
            return n.copy(n.content.replaceChild(n.childCount - 1, s));
        if (n.contentMatchAt(n.childCount).matchType(i == r.length - 1 ? t.type : r[i + 1]))
            return n.copy(n.content.append(b.from(Ns(t, r, i + 1))))
    }
}
function Ds(r, e) {
    if (e == 0)
        return r;
    let t = r.content.replaceChild(r.childCount - 1, Ds(r.lastChild, e - 1))
      , n = r.contentMatchAt(r.childCount).fillBefore(b.empty, !0);
    return r.copy(t.append(n))
}
function jn(r, e, t, n, i, s) {
    let o = e < 0 ? r.firstChild : r.lastChild
      , l = o.content;
    return r.childCount > 1 && (s = 0),
    i < n - 1 && (l = jn(l, e, t, n, i + 1, s)),
    i >= t && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(b.empty, !0))),
    r.replaceChild(e < 0 ? 0 : r.childCount - 1, o.copy(l))
}
function si(r, e, t) {
    return e < r.openStart && (r = new x(jn(r.content, -1, e, r.openStart, 0, r.openEnd),e,r.openEnd)),
    t < r.openEnd && (r = new x(jn(r.content, 1, t, r.openEnd, 0, 0),r.openStart,t)),
    r
}
const As = {
    thead: ["table"],
    tbody: ["table"],
    tfoot: ["table"],
    caption: ["table"],
    colgroup: ["table"],
    col: ["table", "colgroup"],
    tr: ["table", "tbody"],
    td: ["table", "tbody", "tr"],
    th: ["table", "tbody", "tr"]
};
let oi = null;
function Is() {
    return oi || (oi = document.implementation.createHTMLDocument("title"))
}
let Sn = null;
function la(r) {
    let e = window.trustedTypes;
    return e ? (Sn || (Sn = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", {
        createHTML: t => t
    })),
    Sn.createHTML(r)) : r
}
function aa(r) {
    let e = /^(\s*<meta [^>]*>)*/.exec(r);
    e && (r = r.slice(e[0].length));
    let t = Is().createElement("div"), n = /<([a-z][^>\s]+)/i.exec(r), i;
    if ((i = n && As[n[1].toLowerCase()]) && (r = i.map(s => "<" + s + ">").join("") + r + i.map(s => "</" + s + ">").reverse().join("")),
    t.innerHTML = la(r),
    i)
        for (let s = 0; s < i.length; s++)
            t = t.querySelector(i[s]) || t;
    return t
}
function ca(r) {
    let e = r.querySelectorAll(J ? "span:not([class]):not([style])" : "span.Apple-converted-space");
    for (let t = 0; t < e.length; t++) {
        let n = e[t];
        n.childNodes.length == 1 && n.textContent == " " && n.parentNode && n.parentNode.replaceChild(r.ownerDocument.createTextNode(" "), n)
    }
}
function da(r, e) {
    if (!r.size)
        return r;
    let t = r.content.firstChild.type.schema, n;
    try {
        n = JSON.parse(e)
    } catch (l) {
        return r
    }
    let {content: i, openStart: s, openEnd: o} = r;
    for (let l = n.length - 2; l >= 0; l -= 2) {
        let a = t.nodes[n[l]];
        if (!a || a.hasRequiredAttrs())
            break;
        i = b.from(a.create(n[l + 1], i)),
        s++,
        o++
    }
    return new x(i,s,o)
}
const _ = {}
  , G = {}
  , fa = {
    touchstart: !0,
    touchmove: !0
};
class ua {
    constructor() {
        this.shiftKey = !1,
        this.mouseDown = null,
        this.lastKeyCode = null,
        this.lastKeyCodeTime = 0,
        this.lastClick = {
            time: 0,
            x: 0,
            y: 0,
            type: "",
            button: 0
        },
        this.lastSelectionOrigin = null,
        this.lastSelectionTime = 0,
        this.lastIOSEnter = 0,
        this.lastIOSEnterFallbackTimeout = -1,
        this.lastFocus = 0,
        this.lastTouch = 0,
        this.lastChromeDelete = 0,
        this.composing = !1,
        this.compositionNode = null,
        this.composingTimeout = -1,
        this.compositionNodes = [],
        this.compositionEndedAt = -2e8,
        this.compositionID = 1,
        this.compositionPendingChanges = 0,
        this.domChangeCount = 0,
        this.eventHandlers = Object.create(null),
        this.hideSelectionGuard = null
    }
}
function ha(r) {
    for (let e in _) {
        let t = _[e];
        r.dom.addEventListener(e, r.input.eventHandlers[e] = n => {
            ma(r, n) && !nr(r, n) && (r.editable || !(n.type in G)) && t(r, n)
        }
        , fa[e] ? {
            passive: !0
        } : void 0)
    }
    U && r.dom.addEventListener("input", () => null),
    Jn(r)
}
function Me(r, e) {
    r.input.lastSelectionOrigin = e,
    r.input.lastSelectionTime = Date.now()
}
function pa(r) {
    r.domObserver.stop();
    for (let e in r.input.eventHandlers)
        r.dom.removeEventListener(e, r.input.eventHandlers[e]);
    clearTimeout(r.input.composingTimeout),
    clearTimeout(r.input.lastIOSEnterFallbackTimeout)
}
function Jn(r) {
    r.someProp("handleDOMEvents", e => {
        for (let t in e)
            r.input.eventHandlers[t] || r.dom.addEventListener(t, r.input.eventHandlers[t] = n => nr(r, n))
    }
    )
}
function nr(r, e) {
    return r.someProp("handleDOMEvents", t => {
        let n = t[e.type];
        return n ? n(r, e) || e.defaultPrevented : !1
    }
    )
}
function ma(r, e) {
    if (!e.bubbles)
        return !0;
    if (e.defaultPrevented)
        return !1;
    for (let t = e.target; t != r.dom; t = t.parentNode)
        if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
            return !1;
    return !0
}
function ga(r, e) {
    !nr(r, e) && _[e.type] && (r.editable || !(e.type in G)) && _[e.type](r, e)
}
G.keydown = (r, e) => {
    let t = e;
    if (r.input.shiftKey = t.keyCode == 16 || t.shiftKey,
    !Rs(r, t) && (r.input.lastKeyCode = t.keyCode,
    r.input.lastKeyCodeTime = Date.now(),
    !(ue && J && t.keyCode == 13)))
        if (t.keyCode != 229 && r.domObserver.forceFlush(),
        it && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
            let n = Date.now();
            r.input.lastIOSEnter = n,
            r.input.lastIOSEnterFallbackTimeout = setTimeout( () => {
                r.input.lastIOSEnter == n && (r.someProp("handleKeyDown", i => i(r, Re(13, "Enter"))),
                r.input.lastIOSEnter = 0)
            }
            , 200)
        } else
            r.someProp("handleKeyDown", n => n(r, t)) || ia(r, t) ? t.preventDefault() : Me(r, "key")
}
;
G.keyup = (r, e) => {
    e.keyCode == 16 && (r.input.shiftKey = !1)
}
;
G.keypress = (r, e) => {
    let t = e;
    if (Rs(r, t) || !t.charCode || t.ctrlKey && !t.altKey || ee && t.metaKey)
        return;
    if (r.someProp("handleKeyPress", i => i(r, t))) {
        t.preventDefault();
        return
    }
    let n = r.state.selection;
    if (!(n instanceof T) || !n.$from.sameParent(n.$to)) {
        let i = String.fromCharCode(t.charCode)
          , s = () => r.state.tr.insertText(i).scrollIntoView();
        !/[\r\n]/.test(i) && !r.someProp("handleTextInput", o => o(r, n.$from.pos, n.$to.pos, i, s)) && r.dispatch(s()),
        t.preventDefault()
    }
}
;
function rn(r) {
    return {
        left: r.clientX,
        top: r.clientY
    }
}
function ya(r, e) {
    let t = e.x - r.clientX
      , n = e.y - r.clientY;
    return t * t + n * n < 100
}
function rr(r, e, t, n, i) {
    if (n == -1)
        return !1;
    let s = r.state.doc.resolve(n);
    for (let o = s.depth + 1; o > 0; o--)
        if (r.someProp(e, l => o > s.depth ? l(r, t, s.nodeAfter, s.before(o), i, !0) : l(r, t, s.node(o), s.before(o), i, !1)))
            return !0;
    return !1
}
function tt(r, e, t) {
    if (r.focused || r.focus(),
    r.state.selection.eq(e))
        return;
    let n = r.state.tr.setSelection(e);
    n.setMeta("pointer", !0),
    r.dispatch(n)
}
function ba(r, e) {
    if (e == -1)
        return !1;
    let t = r.state.doc.resolve(e)
      , n = t.nodeAfter;
    return n && n.isAtom && M.isSelectable(n) ? (tt(r, new M(t)),
    !0) : !1
}
function ka(r, e) {
    if (e == -1)
        return !1;
    let t = r.state.selection, n, i;
    t instanceof M && (n = t.node);
    let s = r.state.doc.resolve(e);
    for (let o = s.depth + 1; o > 0; o--) {
        let l = o > s.depth ? s.nodeAfter : s.node(o);
        if (M.isSelectable(l)) {
            n && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? i = s.before(t.$from.depth) : i = s.before(o);
            break
        }
    }
    return i != null ? (tt(r, M.create(r.state.doc, i)),
    !0) : !1
}
function xa(r, e, t, n, i) {
    return rr(r, "handleClickOn", e, t, n) || r.someProp("handleClick", s => s(r, e, n)) || (i ? ka(r, t) : ba(r, t))
}
function Sa(r, e, t, n) {
    return rr(r, "handleDoubleClickOn", e, t, n) || r.someProp("handleDoubleClick", i => i(r, e, n))
}
function Ma(r, e, t, n) {
    return rr(r, "handleTripleClickOn", e, t, n) || r.someProp("handleTripleClick", i => i(r, e, n)) || Ca(r, t, n)
}
function Ca(r, e, t) {
    if (t.button != 0)
        return !1;
    let n = r.state.doc;
    if (e == -1)
        return n.inlineContent ? (tt(r, T.create(n, 0, n.content.size)),
        !0) : !1;
    let i = n.resolve(e);
    for (let s = i.depth + 1; s > 0; s--) {
        let o = s > i.depth ? i.nodeAfter : i.node(s)
          , l = i.before(s);
        if (o.inlineContent)
            tt(r, T.create(n, l + 1, l + 1 + o.content.size));
        else if (M.isSelectable(o))
            tt(r, M.create(n, l));
        else
            continue;
        return !0
    }
}
function ir(r) {
    return Jt(r)
}
const vs = ee ? "metaKey" : "ctrlKey";
_.mousedown = (r, e) => {
    let t = e;
    r.input.shiftKey = t.shiftKey;
    let n = ir(r)
      , i = Date.now()
      , s = "singleClick";
    i - r.input.lastClick.time < 500 && ya(t, r.input.lastClick) && !t[vs] && r.input.lastClick.button == t.button && (r.input.lastClick.type == "singleClick" ? s = "doubleClick" : r.input.lastClick.type == "doubleClick" && (s = "tripleClick")),
    r.input.lastClick = {
        time: i,
        x: t.clientX,
        y: t.clientY,
        type: s,
        button: t.button
    };
    let o = r.posAtCoords(rn(t));
    o && (s == "singleClick" ? (r.input.mouseDown && r.input.mouseDown.done(),
    r.input.mouseDown = new wa(r,o,t,!!n)) : (s == "doubleClick" ? Sa : Ma)(r, o.pos, o.inside, t) ? t.preventDefault() : Me(r, "pointer"))
}
;
class wa {
    constructor(e, t, n, i) {
        this.view = e,
        this.pos = t,
        this.event = n,
        this.flushed = i,
        this.delayedSelectionSync = !1,
        this.mightDrag = null,
        this.startDoc = e.state.doc,
        this.selectNode = !!n[vs],
        this.allowDefault = n.shiftKey;
        let s, o;
        if (t.inside > -1)
            s = e.state.doc.nodeAt(t.inside),
            o = t.inside;
        else {
            let d = e.state.doc.resolve(t.pos);
            s = d.parent,
            o = d.depth ? d.before() : 0
        }
        const l = i ? null : n.target
          , a = l ? e.docView.nearestDesc(l, !0) : null;
        this.target = a && a.dom.nodeType == 1 ? a.dom : null;
        let {selection: c} = e.state;
        (n.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof M && c.from <= o && c.to > o) && (this.mightDrag = {
            node: s,
            pos: o,
            addAttr: !!(this.target && !this.target.draggable),
            setUneditable: !!(this.target && ie && !this.target.hasAttribute("contentEditable"))
        }),
        this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(),
        this.mightDrag.addAttr && (this.target.draggable = !0),
        this.mightDrag.setUneditable && setTimeout( () => {
            this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false")
        }
        , 20),
        this.view.domObserver.start()),
        e.root.addEventListener("mouseup", this.up = this.up.bind(this)),
        e.root.addEventListener("mousemove", this.move = this.move.bind(this)),
        Me(e, "pointer")
    }
    done() {
        this.view.root.removeEventListener("mouseup", this.up),
        this.view.root.removeEventListener("mousemove", this.move),
        this.mightDrag && this.target && (this.view.domObserver.stop(),
        this.mightDrag.addAttr && this.target.removeAttribute("draggable"),
        this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"),
        this.view.domObserver.start()),
        this.delayedSelectionSync && setTimeout( () => me(this.view)),
        this.view.input.mouseDown = null
    }
    up(e) {
        if (this.done(),
        !this.view.dom.contains(e.target))
            return;
        let t = this.pos;
        this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(rn(e))),
        this.updateAllowDefault(e),
        this.allowDefault || !t ? Me(this.view, "pointer") : xa(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || U && this.mightDrag && !this.mightDrag.node.isAtom || J && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (tt(this.view, E.near(this.view.state.doc.resolve(t.pos))),
        e.preventDefault()) : Me(this.view, "pointer")
    }
    move(e) {
        this.updateAllowDefault(e),
        Me(this.view, "pointer"),
        e.buttons == 0 && this.done()
    }
    updateAllowDefault(e) {
        !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0)
    }
}
_.touchstart = r => {
    r.input.lastTouch = Date.now(),
    ir(r),
    Me(r, "pointer")
}
;
_.touchmove = r => {
    r.input.lastTouch = Date.now(),
    Me(r, "pointer")
}
;
_.contextmenu = r => ir(r);
function Rs(r, e) {
    return r.composing ? !0 : U && Math.abs(e.timeStamp - r.input.compositionEndedAt) < 500 ? (r.input.compositionEndedAt = -2e8,
    !0) : !1
}
const Oa = ue ? 5e3 : -1;
G.compositionstart = G.compositionupdate = r => {
    if (!r.composing) {
        r.domObserver.flush();
        let {state: e} = r
          , t = e.selection.$to;
        if (e.selection instanceof T && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some(n => n.type.spec.inclusive === !1)))
            r.markCursor = r.state.storedMarks || t.marks(),
            Jt(r, !0),
            r.markCursor = null;
        else if (Jt(r, !e.selection.empty),
        ie && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
            let n = r.domSelectionRange();
            for (let i = n.focusNode, s = n.focusOffset; i && i.nodeType == 1 && s != 0; ) {
                let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
                if (!o)
                    break;
                if (o.nodeType == 3) {
                    let l = r.domSelection();
                    l && l.collapse(o, o.nodeValue.length);
                    break
                } else
                    i = o,
                    s = -1
            }
        }
        r.input.composing = !0
    }
    Ps(r, Oa)
}
;
G.compositionend = (r, e) => {
    r.composing && (r.input.composing = !1,
    r.input.compositionEndedAt = e.timeStamp,
    r.input.compositionPendingChanges = r.domObserver.pendingRecords().length ? r.input.compositionID : 0,
    r.input.compositionNode = null,
    r.input.compositionPendingChanges && Promise.resolve().then( () => r.domObserver.flush()),
    r.input.compositionID++,
    Ps(r, 20))
}
;
function Ps(r, e) {
    clearTimeout(r.input.composingTimeout),
    e > -1 && (r.input.composingTimeout = setTimeout( () => Jt(r), e))
}
function Bs(r) {
    for (r.composing && (r.input.composing = !1,
    r.input.compositionEndedAt = Na()); r.input.compositionNodes.length > 0; )
        r.input.compositionNodes.pop().markParentsDirty()
}
function Ta(r) {
    let e = r.domSelectionRange();
    if (!e.focusNode)
        return null;
    let t = bl(e.focusNode, e.focusOffset)
      , n = kl(e.focusNode, e.focusOffset);
    if (t && n && t != n) {
        let i = n.pmViewDesc
          , s = r.domObserver.lastChangedTextNode;
        if (t == s || n == s)
            return s;
        if (!i || !i.isText(n.nodeValue))
            return n;
        if (r.input.compositionNode == n) {
            let o = t.pmViewDesc;
            if (!(!o || !o.isText(t.nodeValue)))
                return n
        }
    }
    return t || n
}
function Na() {
    let r = document.createEvent("Event");
    return r.initEvent("event", !0, !0),
    r.timeStamp
}
function Jt(r, e=!1) {
    if (!(ue && r.domObserver.flushingSoon >= 0)) {
        if (r.domObserver.forceFlush(),
        Bs(r),
        e || r.docView && r.docView.dirty) {
            let t = Qn(r)
              , n = r.state.selection;
            return t && !t.eq(n) ? r.dispatch(r.state.tr.setSelection(t)) : (r.markCursor || e) && !n.$from.node(n.$from.sharedDepth(n.to)).inlineContent ? r.dispatch(r.state.tr.deleteSelection()) : r.updateState(r.state),
            !0
        }
        return !1
    }
}
function Ea(r, e) {
    if (!r.dom.parentNode)
        return;
    let t = r.dom.parentNode.appendChild(document.createElement("div"));
    t.appendChild(e),
    t.style.cssText = "position: fixed; left: -10000px; top: 10px";
    let n = getSelection()
      , i = document.createRange();
    i.selectNodeContents(e),
    r.dom.blur(),
    n.removeAllRanges(),
    n.addRange(i),
    setTimeout( () => {
        t.parentNode && t.parentNode.removeChild(t),
        r.focus()
    }
    , 50)
}
const bt = X && Oe < 15 || it && wl < 604;
_.copy = G.cut = (r, e) => {
    let t = e
      , n = r.state.selection
      , i = t.type == "cut";
    if (n.empty)
        return;
    let s = bt ? null : t.clipboardData
      , o = n.content()
      , {dom: l, text: a} = tr(r, o);
    s ? (t.preventDefault(),
    s.clearData(),
    s.setData("text/html", l.innerHTML),
    s.setData("text/plain", a)) : Ea(r, l),
    i && r.dispatch(r.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"))
}
;
function Da(r) {
    return r.openStart == 0 && r.openEnd == 0 && r.content.childCount == 1 ? r.content.firstChild : null
}
function Aa(r, e) {
    if (!r.dom.parentNode)
        return;
    let t = r.input.shiftKey || r.state.selection.$from.parent.type.spec.code
      , n = r.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
    t || (n.contentEditable = "true"),
    n.style.cssText = "position: fixed; left: -10000px; top: 10px",
    n.focus();
    let i = r.input.shiftKey && r.input.lastKeyCode != 45;
    setTimeout( () => {
        r.focus(),
        n.parentNode && n.parentNode.removeChild(n),
        t ? kt(r, n.value, null, i, e) : kt(r, n.textContent, n.innerHTML, i, e)
    }
    , 50)
}
function kt(r, e, t, n, i) {
    let s = Ts(r, e, t, n, r.state.selection.$from);
    if (r.someProp("handlePaste", a => a(r, i, s || x.empty)))
        return !0;
    if (!s)
        return !1;
    let o = Da(s)
      , l = o ? r.state.tr.replaceSelectionWith(o, n) : r.state.tr.replaceSelection(s);
    return r.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")),
    !0
}
function zs(r) {
    let e = r.getData("text/plain") || r.getData("Text");
    if (e)
        return e;
    let t = r.getData("text/uri-list");
    return t ? t.replace(/\r?\n/g, " ") : ""
}
G.paste = (r, e) => {
    let t = e;
    if (r.composing && !ue)
        return;
    let n = bt ? null : t.clipboardData
      , i = r.input.shiftKey && r.input.lastKeyCode != 45;
    n && kt(r, zs(n), n.getData("text/html"), i, t) ? t.preventDefault() : Aa(r, t)
}
;
class Fs {
    constructor(e, t, n) {
        this.slice = e,
        this.move = t,
        this.node = n
    }
}
const Ia = ee ? "altKey" : "ctrlKey";
function Ls(r, e) {
    let t = r.someProp("dragCopies", n => !n(e));
    return t != null ? t : !e[Ia]
}
_.dragstart = (r, e) => {
    let t = e
      , n = r.input.mouseDown;
    if (n && n.done(),
    !t.dataTransfer)
        return;
    let i = r.state.selection, s = i.empty ? null : r.posAtCoords(rn(t)), o;
    if (!(s && s.pos >= i.from && s.pos <= (i instanceof M ? i.to - 1 : i.to))) {
        if (n && n.mightDrag)
            o = M.create(r.state.doc, n.mightDrag.pos);
        else if (t.target && t.target.nodeType == 1) {
            let f = r.docView.nearestDesc(t.target, !0);
            f && f.node.type.spec.draggable && f != r.docView && (o = M.create(r.state.doc, f.posBefore))
        }
    }
    let l = (o || r.state.selection).content()
      , {dom: a, text: c, slice: d} = tr(r, l);
    (!t.dataTransfer.files.length || !J || ds > 120) && t.dataTransfer.clearData(),
    t.dataTransfer.setData(bt ? "Text" : "text/html", a.innerHTML),
    t.dataTransfer.effectAllowed = "copyMove",
    bt || t.dataTransfer.setData("text/plain", c),
    r.dragging = new Fs(d,Ls(r, t),o)
}
;
_.dragend = r => {
    let e = r.dragging;
    window.setTimeout( () => {
        r.dragging == e && (r.dragging = null)
    }
    , 50)
}
;
G.dragover = G.dragenter = (r, e) => e.preventDefault();
G.drop = (r, e) => {
    let t = e
      , n = r.dragging;
    if (r.dragging = null,
    !t.dataTransfer)
        return;
    let i = r.posAtCoords(rn(t));
    if (!i)
        return;
    let s = r.state.doc.resolve(i.pos)
      , o = n && n.slice;
    o ? r.someProp("transformPasted", p => {
        o = p(o, r)
    }
    ) : o = Ts(r, zs(t.dataTransfer), bt ? null : t.dataTransfer.getData("text/html"), !1, s);
    let l = !!(n && Ls(r, t));
    if (r.someProp("handleDrop", p => p(r, t, o || x.empty, l))) {
        t.preventDefault();
        return
    }
    if (!o)
        return;
    t.preventDefault();
    let a = o ? sl(r.state.doc, s.pos, o) : s.pos;
    a == null && (a = s.pos);
    let c = r.state.tr;
    if (l) {
        let {node: p} = n;
        p ? p.replace(c) : c.deleteSelection()
    }
    let d = c.mapping.map(a)
      , f = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1
      , u = c.doc;
    if (f ? c.replaceRangeWith(d, d, o.content.firstChild) : c.replaceRange(d, d, o),
    c.doc.eq(u))
        return;
    let h = c.doc.resolve(d);
    if (f && M.isSelectable(o.content.firstChild) && h.nodeAfter && h.nodeAfter.sameMarkup(o.content.firstChild))
        c.setSelection(new M(h));
    else {
        let p = c.mapping.map(a);
        c.mapping.maps[c.mapping.maps.length - 1].forEach( (m, g, y, C) => p = C),
        c.setSelection(er(r, h, c.doc.resolve(p)))
    }
    r.focus(),
    r.dispatch(c.setMeta("uiEvent", "drop"))
}
;
_.focus = r => {
    r.input.lastFocus = Date.now(),
    r.focused || (r.domObserver.stop(),
    r.dom.classList.add("ProseMirror-focused"),
    r.domObserver.start(),
    r.focused = !0,
    setTimeout( () => {
        r.docView && r.hasFocus() && !r.domObserver.currentSelection.eq(r.domSelectionRange()) && me(r)
    }
    , 20))
}
;
_.blur = (r, e) => {
    let t = e;
    r.focused && (r.domObserver.stop(),
    r.dom.classList.remove("ProseMirror-focused"),
    r.domObserver.start(),
    t.relatedTarget && r.dom.contains(t.relatedTarget) && r.domObserver.currentSelection.clear(),
    r.focused = !1)
}
;
_.beforeinput = (r, e) => {
    if (J && ue && e.inputType == "deleteContentBackward") {
        r.domObserver.flushSoon();
        let {domChangeCount: n} = r.input;
        setTimeout( () => {
            if (r.input.domChangeCount != n || (r.dom.blur(),
            r.focus(),
            r.someProp("handleKeyDown", s => s(r, Re(8, "Backspace")))))
                return;
            let {$cursor: i} = r.state.selection;
            i && i.pos > 0 && r.dispatch(r.state.tr.delete(i.pos - 1, i.pos).scrollIntoView())
        }
        , 50)
    }
}
;
for (let r in G)
    _[r] = G[r];
function xt(r, e) {
    if (r == e)
        return !0;
    for (let t in r)
        if (r[t] !== e[t])
            return !1;
    for (let t in e)
        if (!(t in r))
            return !1;
    return !0
}
class qt {
    constructor(e, t) {
        this.toDOM = e,
        this.spec = t || Ve,
        this.side = this.spec.side || 0
    }
    map(e, t, n, i) {
        let {pos: s, deleted: o} = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
        return o ? null : new re(s - n,s - n,this)
    }
    valid() {
        return !0
    }
    eq(e) {
        return this == e || e instanceof qt && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && xt(this.spec, e.spec))
    }
    destroy(e) {
        this.spec.destroy && this.spec.destroy(e)
    }
}
class Ne {
    constructor(e, t) {
        this.attrs = e,
        this.spec = t || Ve
    }
    map(e, t, n, i) {
        let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - n
          , o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - n;
        return s >= o ? null : new re(s,o,this)
    }
    valid(e, t) {
        return t.from < t.to
    }
    eq(e) {
        return this == e || e instanceof Ne && xt(this.attrs, e.attrs) && xt(this.spec, e.spec)
    }
    static is(e) {
        return e.type instanceof Ne
    }
    destroy() {}
}
class sr {
    constructor(e, t) {
        this.attrs = e,
        this.spec = t || Ve
    }
    map(e, t, n, i) {
        let s = e.mapResult(t.from + i, 1);
        if (s.deleted)
            return null;
        let o = e.mapResult(t.to + i, -1);
        return o.deleted || o.pos <= s.pos ? null : new re(s.pos - n,o.pos - n,this)
    }
    valid(e, t) {
        let {index: n, offset: i} = e.content.findIndex(t.from), s;
        return i == t.from && !(s = e.child(n)).isText && i + s.nodeSize == t.to
    }
    eq(e) {
        return this == e || e instanceof sr && xt(this.attrs, e.attrs) && xt(this.spec, e.spec)
    }
    destroy() {}
}
class re {
    constructor(e, t, n) {
        this.from = e,
        this.to = t,
        this.type = n
    }
    copy(e, t) {
        return new re(e,t,this.type)
    }
    eq(e, t=0) {
        return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to
    }
    map(e, t, n) {
        return this.type.map(e, this, t, n)
    }
    static widget(e, t, n) {
        return new re(e,e,new qt(t,n))
    }
    static inline(e, t, n, i) {
        return new re(e,t,new Ne(n,i))
    }
    static node(e, t, n, i) {
        return new re(e,t,new sr(n,i))
    }
    get spec() {
        return this.type.spec
    }
    get inline() {
        return this.type instanceof Ne
    }
    get widget() {
        return this.type instanceof qt
    }
}
const Xe = []
  , Ve = {};
class z {
    constructor(e, t) {
        this.local = e.length ? e : Xe,
        this.children = t.length ? t : Xe
    }
    static create(e, t) {
        return t.length ? Kt(t, e, 0, Ve) : j
    }
    find(e, t, n) {
        let i = [];
        return this.findInner(e == null ? 0 : e, t == null ? 1e9 : t, i, 0, n),
        i
    }
    findInner(e, t, n, i, s) {
        for (let o = 0; o < this.local.length; o++) {
            let l = this.local[o];
            l.from <= t && l.to >= e && (!s || s(l.spec)) && n.push(l.copy(l.from + i, l.to + i))
        }
        for (let o = 0; o < this.children.length; o += 3)
            if (this.children[o] < t && this.children[o + 1] > e) {
                let l = this.children[o] + 1;
                this.children[o + 2].findInner(e - l, t - l, n, i + l, s)
            }
    }
    map(e, t, n) {
        return this == j || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || Ve)
    }
    mapInner(e, t, n, i, s) {
        let o;
        for (let l = 0; l < this.local.length; l++) {
            let a = this.local[l].map(e, n, i);
            a && a.type.valid(t, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec)
        }
        return this.children.length ? va(this.children, o || [], e, t, n, i, s) : o ? new z(o.sort($e),Xe) : j
    }
    add(e, t) {
        return t.length ? this == j ? z.create(e, t) : this.addInner(e, t, 0) : this
    }
    addInner(e, t, n) {
        let i, s = 0;
        e.forEach( (l, a) => {
            let c = a + n, d;
            if (d = $s(t, l, c)) {
                for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
                    s += 3;
                i[s] == a ? i[s + 2] = i[s + 2].addInner(l, d, c + 1) : i.splice(s, 0, a, a + l.nodeSize, Kt(d, l, c + 1, Ve)),
                s += 3
            }
        }
        );
        let o = Vs(s ? Ws(t) : t, -n);
        for (let l = 0; l < o.length; l++)
            o[l].type.valid(e, o[l]) || o.splice(l--, 1);
        return new z(o.length ? this.local.concat(o).sort($e) : this.local,i || this.children)
    }
    remove(e) {
        return e.length == 0 || this == j ? this : this.removeInner(e, 0)
    }
    removeInner(e, t) {
        let n = this.children
          , i = this.local;
        for (let s = 0; s < n.length; s += 3) {
            let o, l = n[s] + t, a = n[s + 1] + t;
            for (let d = 0, f; d < e.length; d++)
                (f = e[d]) && f.from > l && f.to < a && (e[d] = null,
                (o || (o = [])).push(f));
            if (!o)
                continue;
            n == this.children && (n = this.children.slice());
            let c = n[s + 2].removeInner(o, l + 1);
            c != j ? n[s + 2] = c : (n.splice(s, 3),
            s -= 3)
        }
        if (i.length) {
            for (let s = 0, o; s < e.length; s++)
                if (o = e[s])
                    for (let l = 0; l < i.length; l++)
                        i[l].eq(o, t) && (i == this.local && (i = this.local.slice()),
                        i.splice(l--, 1))
        }
        return n == this.children && i == this.local ? this : i.length || n.length ? new z(i,n) : j
    }
    forChild(e, t) {
        if (this == j)
            return this;
        if (t.isLeaf)
            return z.empty;
        let n, i;
        for (let l = 0; l < this.children.length; l += 3)
            if (this.children[l] >= e) {
                this.children[l] == e && (n = this.children[l + 2]);
                break
            }
        let s = e + 1
          , o = s + t.content.size;
        for (let l = 0; l < this.local.length; l++) {
            let a = this.local[l];
            if (a.from < o && a.to > s && a.type instanceof Ne) {
                let c = Math.max(s, a.from) - s
                  , d = Math.min(o, a.to) - s;
                c < d && (i || (i = [])).push(a.copy(c, d))
            }
        }
        if (i) {
            let l = new z(i.sort($e),Xe);
            return n ? new ke([l, n]) : l
        }
        return n || j
    }
    eq(e) {
        if (this == e)
            return !0;
        if (!(e instanceof z) || this.local.length != e.local.length || this.children.length != e.children.length)
            return !1;
        for (let t = 0; t < this.local.length; t++)
            if (!this.local[t].eq(e.local[t]))
                return !1;
        for (let t = 0; t < this.children.length; t += 3)
            if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
                return !1;
        return !0
    }
    locals(e) {
        return or(this.localsInner(e))
    }
    localsInner(e) {
        if (this == j)
            return Xe;
        if (e.inlineContent || !this.local.some(Ne.is))
            return this.local;
        let t = [];
        for (let n = 0; n < this.local.length; n++)
            this.local[n].type instanceof Ne || t.push(this.local[n]);
        return t
    }
    forEachSet(e) {
        e(this)
    }
}
z.empty = new z([],[]);
z.removeOverlap = or;
const j = z.empty;
class ke {
    constructor(e) {
        this.members = e
    }
    map(e, t) {
        const n = this.members.map(i => i.map(e, t, Ve));
        return ke.from(n)
    }
    forChild(e, t) {
        if (t.isLeaf)
            return z.empty;
        let n = [];
        for (let i = 0; i < this.members.length; i++) {
            let s = this.members[i].forChild(e, t);
            s != j && (s instanceof ke ? n = n.concat(s.members) : n.push(s))
        }
        return ke.from(n)
    }
    eq(e) {
        if (!(e instanceof ke) || e.members.length != this.members.length)
            return !1;
        for (let t = 0; t < this.members.length; t++)
            if (!this.members[t].eq(e.members[t]))
                return !1;
        return !0
    }
    locals(e) {
        let t, n = !0;
        for (let i = 0; i < this.members.length; i++) {
            let s = this.members[i].localsInner(e);
            if (s.length)
                if (!t)
                    t = s;
                else {
                    n && (t = t.slice(),
                    n = !1);
                    for (let o = 0; o < s.length; o++)
                        t.push(s[o])
                }
        }
        return t ? or(n ? t : t.sort($e)) : Xe
    }
    static from(e) {
        switch (e.length) {
        case 0:
            return j;
        case 1:
            return e[0];
        default:
            return new ke(e.every(t => t instanceof z) ? e : e.reduce( (t, n) => t.concat(n instanceof z ? n : n.members), []))
        }
    }
    forEachSet(e) {
        for (let t = 0; t < this.members.length; t++)
            this.members[t].forEachSet(e)
    }
}
function va(r, e, t, n, i, s, o) {
    let l = r.slice();
    for (let c = 0, d = s; c < t.maps.length; c++) {
        let f = 0;
        t.maps[c].forEach( (u, h, p, m) => {
            let g = m - p - (h - u);
            for (let y = 0; y < l.length; y += 3) {
                let C = l[y + 1];
                if (C < 0 || u > C + d - f)
                    continue;
                let O = l[y] + d - f;
                h >= O ? l[y + 1] = u <= O ? -2 : -1 : u >= d && g && (l[y] += g,
                l[y + 1] += g)
            }
            f += g
        }
        ),
        d = t.maps[c].map(d, -1)
    }
    let a = !1;
    for (let c = 0; c < l.length; c += 3)
        if (l[c + 1] < 0) {
            if (l[c + 1] == -2) {
                a = !0,
                l[c + 1] = -1;
                continue
            }
            let d = t.map(r[c] + s)
              , f = d - i;
            if (f < 0 || f >= n.content.size) {
                a = !0;
                continue
            }
            let u = t.map(r[c + 1] + s, -1)
              , h = u - i
              , {index: p, offset: m} = n.content.findIndex(f)
              , g = n.maybeChild(p);
            if (g && m == f && m + g.nodeSize == h) {
                let y = l[c + 2].mapInner(t, g, d + 1, r[c] + s + 1, o);
                y != j ? (l[c] = f,
                l[c + 1] = h,
                l[c + 2] = y) : (l[c + 1] = -2,
                a = !0)
            } else
                a = !0
        }
    if (a) {
        let c = Ra(l, r, e, t, i, s, o)
          , d = Kt(c, n, 0, o);
        e = d.local;
        for (let f = 0; f < l.length; f += 3)
            l[f + 1] < 0 && (l.splice(f, 3),
            f -= 3);
        for (let f = 0, u = 0; f < d.children.length; f += 3) {
            let h = d.children[f];
            for (; u < l.length && l[u] < h; )
                u += 3;
            l.splice(u, 0, d.children[f], d.children[f + 1], d.children[f + 2])
        }
    }
    return new z(e.sort($e),l)
}
function Vs(r, e) {
    if (!e || !r.length)
        return r;
    let t = [];
    for (let n = 0; n < r.length; n++) {
        let i = r[n];
        t.push(new re(i.from + e,i.to + e,i.type))
    }
    return t
}
function Ra(r, e, t, n, i, s, o) {
    function l(a, c) {
        for (let d = 0; d < a.local.length; d++) {
            let f = a.local[d].map(n, i, c);
            f ? t.push(f) : o.onRemove && o.onRemove(a.local[d].spec)
        }
        for (let d = 0; d < a.children.length; d += 3)
            l(a.children[d + 2], a.children[d] + c + 1)
    }
    for (let a = 0; a < r.length; a += 3)
        r[a + 1] == -1 && l(r[a + 2], e[a] + s + 1);
    return t
}
function $s(r, e, t) {
    if (e.isLeaf)
        return null;
    let n = t + e.nodeSize
      , i = null;
    for (let s = 0, o; s < r.length; s++)
        (o = r[s]) && o.from > t && o.to < n && ((i || (i = [])).push(o),
        r[s] = null);
    return i
}
function Ws(r) {
    let e = [];
    for (let t = 0; t < r.length; t++)
        r[t] != null && e.push(r[t]);
    return e
}
function Kt(r, e, t, n) {
    let i = []
      , s = !1;
    e.forEach( (l, a) => {
        let c = $s(r, l, a + t);
        if (c) {
            s = !0;
            let d = Kt(c, l, t + a + 1, n);
            d != j && i.push(a, a + l.nodeSize, d)
        }
    }
    );
    let o = Vs(s ? Ws(r) : r, -t).sort($e);
    for (let l = 0; l < o.length; l++)
        o[l].type.valid(e, o[l]) || (n.onRemove && n.onRemove(o[l].spec),
        o.splice(l--, 1));
    return o.length || i.length ? new z(o,i) : j
}
function $e(r, e) {
    return r.from - e.from || r.to - e.to
}
function or(r) {
    let e = r;
    for (let t = 0; t < e.length - 1; t++) {
        let n = e[t];
        if (n.from != n.to)
            for (let i = t + 1; i < e.length; i++) {
                let s = e[i];
                if (s.from == n.from) {
                    s.to != n.to && (e == r && (e = r.slice()),
                    e[i] = s.copy(s.from, n.to),
                    li(e, i + 1, s.copy(n.to, s.to)));
                    continue
                } else {
                    s.from < n.to && (e == r && (e = r.slice()),
                    e[t] = n.copy(n.from, s.from),
                    li(e, i, n.copy(s.from, n.to)));
                    break
                }
            }
    }
    return e
}
function li(r, e, t) {
    for (; e < r.length && $e(t, r[e]) > 0; )
        e++;
    r.splice(e, 0, t)
}
function Mn(r) {
    let e = [];
    return r.someProp("decorations", t => {
        let n = t(r.state);
        n && n != j && e.push(n)
    }
    ),
    r.cursorWrapper && e.push(z.create(r.state.doc, [r.cursorWrapper.deco])),
    ke.from(e)
}
const Pa = {
    childList: !0,
    characterData: !0,
    characterDataOldValue: !0,
    attributes: !0,
    attributeOldValue: !0,
    subtree: !0
}
  , Ba = X && Oe <= 11;
class za {
    constructor() {
        this.anchorNode = null,
        this.anchorOffset = 0,
        this.focusNode = null,
        this.focusOffset = 0
    }
    set(e) {
        this.anchorNode = e.anchorNode,
        this.anchorOffset = e.anchorOffset,
        this.focusNode = e.focusNode,
        this.focusOffset = e.focusOffset
    }
    clear() {
        this.anchorNode = this.focusNode = null
    }
    eq(e) {
        return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset
    }
}
class Fa {
    constructor(e, t) {
        this.view = e,
        this.handleDOMChange = t,
        this.queue = [],
        this.flushingSoon = -1,
        this.observer = null,
        this.currentSelection = new za,
        this.onCharData = null,
        this.suppressingSelectionUpdates = !1,
        this.lastChangedTextNode = null,
        this.observer = window.MutationObserver && new window.MutationObserver(n => {
            for (let i = 0; i < n.length; i++)
                this.queue.push(n[i]);
            X && Oe <= 11 && n.some(i => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush()
        }
        ),
        Ba && (this.onCharData = n => {
            this.queue.push({
                target: n.target,
                type: "characterData",
                oldValue: n.prevValue
            }),
            this.flushSoon()
        }
        ),
        this.onSelectionChange = this.onSelectionChange.bind(this)
    }
    flushSoon() {
        this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout( () => {
            this.flushingSoon = -1,
            this.flush()
        }
        , 20))
    }
    forceFlush() {
        this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon),
        this.flushingSoon = -1,
        this.flush())
    }
    start() {
        this.observer && (this.observer.takeRecords(),
        this.observer.observe(this.view.dom, Pa)),
        this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData),
        this.connectSelection()
    }
    stop() {
        if (this.observer) {
            let e = this.observer.takeRecords();
            if (e.length) {
                for (let t = 0; t < e.length; t++)
                    this.queue.push(e[t]);
                window.setTimeout( () => this.flush(), 20)
            }
            this.observer.disconnect()
        }
        this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData),
        this.disconnectSelection()
    }
    connectSelection() {
        this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange)
    }
    disconnectSelection() {
        this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange)
    }
    suppressSelectionUpdates() {
        this.suppressingSelectionUpdates = !0,
        setTimeout( () => this.suppressingSelectionUpdates = !1, 50)
    }
    onSelectionChange() {
        if (Qr(this.view)) {
            if (this.suppressingSelectionUpdates)
                return me(this.view);
            if (X && Oe <= 11 && !this.view.state.selection.empty) {
                let e = this.view.domSelectionRange();
                if (e.focusNode && je(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
                    return this.flushSoon()
            }
            this.flush()
        }
    }
    setCurSelection() {
        this.currentSelection.set(this.view.domSelectionRange())
    }
    ignoreSelectionChange(e) {
        if (!e.focusNode)
            return !0;
        let t = new Set, n;
        for (let s = e.focusNode; s; s = rt(s))
            t.add(s);
        for (let s = e.anchorNode; s; s = rt(s))
            if (t.has(s)) {
                n = s;
                break
            }
        let i = n && this.view.docView.nearestDesc(n);
        if (i && i.ignoreMutation({
            type: "selection",
            target: n.nodeType == 3 ? n.parentNode : n
        }))
            return this.setCurSelection(),
            !0
    }
    pendingRecords() {
        if (this.observer)
            for (let e of this.observer.takeRecords())
                this.queue.push(e);
        return this.queue
    }
    flush() {
        let {view: e} = this;
        if (!e.docView || this.flushingSoon > -1)
            return;
        let t = this.pendingRecords();
        t.length && (this.queue = []);
        let n = e.domSelectionRange()
          , i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && Qr(e) && !this.ignoreSelectionChange(n)
          , s = -1
          , o = -1
          , l = !1
          , a = [];
        if (e.editable)
            for (let d = 0; d < t.length; d++) {
                let f = this.registerMutation(t[d], a);
                f && (s = s < 0 ? f.from : Math.min(f.from, s),
                o = o < 0 ? f.to : Math.max(f.to, o),
                f.typeOver && (l = !0))
            }
        if (ie && a.length) {
            let d = a.filter(f => f.nodeName == "BR");
            if (d.length == 2) {
                let[f,u] = d;
                f.parentNode && f.parentNode.parentNode == u.parentNode ? u.remove() : f.remove()
            } else {
                let {focusNode: f} = this.currentSelection;
                for (let u of d) {
                    let h = u.parentNode;
                    h && h.nodeName == "LI" && (!f || $a(e, f) != h) && u.remove()
                }
            }
        }
        let c = null;
        s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && tn(n) && (c = Qn(e)) && c.eq(E.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0,
        me(e),
        this.currentSelection.set(n),
        e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o),
        La(e)),
        this.handleDOMChange(s, o, l, a),
        e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(n) || me(e),
        this.currentSelection.set(n))
    }
    registerMutation(e, t) {
        if (t.indexOf(e.target) > -1)
            return null;
        let n = this.view.docView.nearestDesc(e.target);
        if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e))
            return null;
        if (e.type == "childList") {
            for (let d = 0; d < e.addedNodes.length; d++) {
                let f = e.addedNodes[d];
                t.push(f),
                f.nodeType == 3 && (this.lastChangedTextNode = f)
            }
            if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target))
                return {
                    from: n.posBefore,
                    to: n.posAfter
                };
            let i = e.previousSibling
              , s = e.nextSibling;
            if (X && Oe <= 11 && e.addedNodes.length)
                for (let d = 0; d < e.addedNodes.length; d++) {
                    let {previousSibling: f, nextSibling: u} = e.addedNodes[d];
                    (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (i = f),
                    (!u || Array.prototype.indexOf.call(e.addedNodes, u) < 0) && (s = u)
                }
            let o = i && i.parentNode == e.target ? W(i) + 1 : 0
              , l = n.localPosFromDOM(e.target, o, -1)
              , a = s && s.parentNode == e.target ? W(s) : e.target.childNodes.length
              , c = n.localPosFromDOM(e.target, a, 1);
            return {
                from: l,
                to: c
            }
        } else
            return e.type == "attributes" ? {
                from: n.posAtStart - n.border,
                to: n.posAtEnd + n.border
            } : (this.lastChangedTextNode = e.target,
            {
                from: n.posAtStart,
                to: n.posAtEnd,
                typeOver: e.target.nodeValue == e.oldValue
            })
    }
}
let ai = new WeakMap
  , ci = !1;
function La(r) {
    if (!ai.has(r) && (ai.set(r, null),
    ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(r.dom).whiteSpace) !== -1)) {
        if (r.requiresGeckoHackNode = ie,
        ci)
            return;
        ci = !0
    }
}
function di(r, e) {
    let t = e.startContainer
      , n = e.startOffset
      , i = e.endContainer
      , s = e.endOffset
      , o = r.domAtPos(r.state.selection.anchor);
    return je(o.node, o.offset, i, s) && ([t,n,i,s] = [i, s, t, n]),
    {
        anchorNode: t,
        anchorOffset: n,
        focusNode: i,
        focusOffset: s
    }
}
function Va(r, e) {
    if (e.getComposedRanges) {
        let i = e.getComposedRanges(r.root)[0];
        if (i)
            return di(r, i)
    }
    let t;
    function n(i) {
        i.preventDefault(),
        i.stopImmediatePropagation(),
        t = i.getTargetRanges()[0]
    }
    return r.dom.addEventListener("beforeinput", n, !0),
    document.execCommand("indent"),
    r.dom.removeEventListener("beforeinput", n, !0),
    t ? di(r, t) : null
}
function $a(r, e) {
    for (let t = e.parentNode; t && t != r.dom; t = t.parentNode) {
        let n = r.docView.nearestDesc(t, !0);
        if (n && n.node.isBlock)
            return t
    }
    return null
}
function Wa(r, e, t) {
    let {node: n, fromOffset: i, toOffset: s, from: o, to: l} = r.docView.parseRange(e, t), a = r.domSelectionRange(), c, d = a.anchorNode;
    if (d && r.dom.contains(d.nodeType == 1 ? d : d.parentNode) && (c = [{
        node: d,
        offset: a.anchorOffset
    }],
    tn(a) || c.push({
        node: a.focusNode,
        offset: a.focusOffset
    })),
    J && r.input.lastKeyCode === 8)
        for (let g = s; g > i; g--) {
            let y = n.childNodes[g - 1]
              , C = y.pmViewDesc;
            if (y.nodeName == "BR" && !C) {
                s = g;
                break
            }
            if (!C || C.size)
                break
        }
    let f = r.state.doc
      , u = r.someProp("domParser") || we.fromSchema(r.state.schema)
      , h = f.resolve(o)
      , p = null
      , m = u.parse(n, {
        topNode: h.parent,
        topMatch: h.parent.contentMatchAt(h.index()),
        topOpen: !0,
        from: i,
        to: s,
        preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
        findPositions: c,
        ruleFromNode: Ha,
        context: h
    });
    if (c && c[0].pos != null) {
        let g = c[0].pos
          , y = c[1] && c[1].pos;
        y == null && (y = g),
        p = {
            anchor: g + o,
            head: y + o
        }
    }
    return {
        doc: m,
        sel: p,
        from: o,
        to: l
    }
}
function Ha(r) {
    let e = r.pmViewDesc;
    if (e)
        return e.parseRule();
    if (r.nodeName == "BR" && r.parentNode) {
        if (U && /^(ul|ol)$/i.test(r.parentNode.nodeName)) {
            let t = document.createElement("div");
            return t.appendChild(document.createElement("li")),
            {
                skip: t
            }
        } else if (r.parentNode.lastChild == r || U && /^(tr|table)$/i.test(r.parentNode.nodeName))
            return {
                ignore: !0
            }
    } else if (r.nodeName == "IMG" && r.getAttribute("mark-placeholder"))
        return {
            ignore: !0
        };
    return null
}
const ja = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function Ja(r, e, t, n, i) {
    let s = r.input.compositionPendingChanges || (r.composing ? r.input.compositionID : 0);
    if (r.input.compositionPendingChanges = 0,
    e < 0) {
        let w = r.input.lastSelectionTime > Date.now() - 50 ? r.input.lastSelectionOrigin : null
          , v = Qn(r, w);
        if (v && !r.state.selection.eq(v)) {
            if (J && ue && r.input.lastKeyCode === 13 && Date.now() - 100 < r.input.lastKeyCodeTime && r.someProp("handleKeyDown", po => po(r, Re(13, "Enter"))))
                return;
            let Y = r.state.tr.setSelection(v);
            w == "pointer" ? Y.setMeta("pointer", !0) : w == "key" && Y.scrollIntoView(),
            s && Y.setMeta("composition", s),
            r.dispatch(Y)
        }
        return
    }
    let o = r.state.doc.resolve(e)
      , l = o.sharedDepth(t);
    e = o.before(l + 1),
    t = r.state.doc.resolve(t).after(l + 1);
    let a = r.state.selection, c = Wa(r, e, t), d = r.state.doc, f = d.slice(c.from, c.to), u, h;
    r.input.lastKeyCode === 8 && Date.now() - 100 < r.input.lastKeyCodeTime ? (u = r.state.selection.to,
    h = "end") : (u = r.state.selection.from,
    h = "start"),
    r.input.lastKeyCode = null;
    let p = Ua(f.content, c.doc.content, c.from, u, h);
    if (p && r.input.domChangeCount++,
    (it && r.input.lastIOSEnter > Date.now() - 225 || ue) && i.some(w => w.nodeType == 1 && !ja.test(w.nodeName)) && (!p || p.endA >= p.endB) && r.someProp("handleKeyDown", w => w(r, Re(13, "Enter")))) {
        r.input.lastIOSEnter = 0;
        return
    }
    if (!p)
        if (n && a instanceof T && !a.empty && a.$head.sameParent(a.$anchor) && !r.composing && !(c.sel && c.sel.anchor != c.sel.head))
            p = {
                start: a.from,
                endA: a.to,
                endB: a.to
            };
        else {
            if (c.sel) {
                let w = fi(r, r.state.doc, c.sel);
                if (w && !w.eq(r.state.selection)) {
                    let v = r.state.tr.setSelection(w);
                    s && v.setMeta("composition", s),
                    r.dispatch(v)
                }
            }
            return
        }
    r.state.selection.from < r.state.selection.to && p.start == p.endB && r.state.selection instanceof T && (p.start > r.state.selection.from && p.start <= r.state.selection.from + 2 && r.state.selection.from >= c.from ? p.start = r.state.selection.from : p.endA < r.state.selection.to && p.endA >= r.state.selection.to - 2 && r.state.selection.to <= c.to && (p.endB += r.state.selection.to - p.endA,
    p.endA = r.state.selection.to)),
    X && Oe <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--,
    p.endA--,
    p.endB--);
    let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), y = d.resolve(p.start), C = m.sameParent(g) && m.parent.inlineContent && y.end() >= p.endA, O;
    if ((it && r.input.lastIOSEnter > Date.now() - 225 && (!C || i.some(w => w.nodeName == "DIV" || w.nodeName == "P")) || !C && m.pos < c.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && !/\S/.test(c.doc.textBetween(m.pos, g.pos, "", "")) && (O = E.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && O.head > m.pos) && r.someProp("handleKeyDown", w => w(r, Re(13, "Enter")))) {
        r.input.lastIOSEnter = 0;
        return
    }
    if (r.state.selection.anchor > p.start && Ka(d, p.start, p.endA, m, g) && r.someProp("handleKeyDown", w => w(r, Re(8, "Backspace")))) {
        ue && J && r.domObserver.suppressSelectionUpdates();
        return
    }
    J && p.endB == p.start && (r.input.lastChromeDelete = Date.now()),
    ue && !C && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2,
    g = c.doc.resolveNoCache(p.endB - c.from),
    setTimeout( () => {
        r.someProp("handleKeyDown", function(w) {
            return w(r, Re(13, "Enter"))
        })
    }
    , 20));
    let A = p.start, D = p.endA, P = w => {
        let v = w || r.state.tr.replace(A, D, c.doc.slice(p.start - c.from, p.endB - c.from));
        if (c.sel) {
            let Y = fi(r, v.doc, c.sel);
            Y && !(J && r.composing && Y.empty && (p.start != p.endB || r.input.lastChromeDelete < Date.now() - 100) && (Y.head == A || Y.head == v.mapping.map(D) - 1) || X && Y.empty && Y.head == A) && v.setSelection(Y)
        }
        return s && v.setMeta("composition", s),
        v.scrollIntoView()
    }
    , K;
    if (C) {
        if (m.pos == g.pos) {
            X && Oe <= 11 && m.parentOffset == 0 && (r.domObserver.suppressSelectionUpdates(),
            setTimeout( () => me(r), 20));
            let w = P(r.state.tr.delete(A, D))
              , v = d.resolve(p.start).marksAcross(d.resolve(p.endA));
            v && w.ensureMarks(v),
            r.dispatch(w)
        } else if (p.endA == p.endB && (K = qa(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))) {
            let w = P(r.state.tr);
            K.type == "add" ? w.addMark(A, D, K.mark) : w.removeMark(A, D, K.mark),
            r.dispatch(w)
        } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
            let w = m.parent.textBetween(m.parentOffset, g.parentOffset)
              , v = () => P(r.state.tr.insertText(w, A, D));
            r.someProp("handleTextInput", Y => Y(r, A, D, w, v)) || r.dispatch(v())
        }
    } else
        r.dispatch(P())
}
function fi(r, e, t) {
    return Math.max(t.anchor, t.head) > e.content.size ? null : er(r, e.resolve(t.anchor), e.resolve(t.head))
}
function qa(r, e) {
    let t = r.firstChild.marks, n = e.firstChild.marks, i = t, s = n, o, l, a;
    for (let d = 0; d < n.length; d++)
        i = n[d].removeFromSet(i);
    for (let d = 0; d < t.length; d++)
        s = t[d].removeFromSet(s);
    if (i.length == 1 && s.length == 0)
        l = i[0],
        o = "add",
        a = d => d.mark(l.addToSet(d.marks));
    else if (i.length == 0 && s.length == 1)
        l = s[0],
        o = "remove",
        a = d => d.mark(l.removeFromSet(d.marks));
    else
        return null;
    let c = [];
    for (let d = 0; d < e.childCount; d++)
        c.push(a(e.child(d)));
    if (b.from(c).eq(r))
        return {
            mark: l,
            type: o
        }
}
function Ka(r, e, t, n, i) {
    if (t - e <= i.pos - n.pos || Cn(n, !0, !1) < i.pos)
        return !1;
    let s = r.resolve(e);
    if (!n.parent.isTextblock) {
        let l = s.nodeAfter;
        return l != null && t == e + l.nodeSize
    }
    if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
        return !1;
    let o = r.resolve(Cn(s, !0, !0));
    return !o.parent.isTextblock || o.pos > t || Cn(o, !0, !1) < t ? !1 : n.parent.content.cut(n.parentOffset).eq(o.parent.content)
}
function Cn(r, e, t) {
    let n = r.depth
      , i = e ? r.end() : r.pos;
    for (; n > 0 && (e || r.indexAfter(n) == r.node(n).childCount); )
        n--,
        i++,
        e = !1;
    if (t) {
        let s = r.node(n).maybeChild(r.indexAfter(n));
        for (; s && !s.isLeaf; )
            s = s.firstChild,
            i++
    }
    return i
}
function Ua(r, e, t, n, i) {
    let s = r.findDiffStart(e, t);
    if (s == null)
        return null;
    let {a: o, b: l} = r.findDiffEnd(e, t + r.size, t + e.size);
    if (i == "end") {
        let a = Math.max(0, s - Math.min(o, l));
        n -= o + a - s
    }
    if (o < s && r.size < e.size) {
        let a = n <= s && n >= o ? s - n : 0;
        s -= a,
        s && s < e.size && ui(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1),
        l = s + (l - o),
        o = s
    } else if (l < s) {
        let a = n <= s && n >= l ? s - n : 0;
        s -= a,
        s && s < r.size && ui(r.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1),
        o = s + (o - l),
        l = s
    }
    return {
        start: s,
        endA: o,
        endB: l
    }
}
function ui(r) {
    if (r.length != 2)
        return !1;
    let e = r.charCodeAt(0)
      , t = r.charCodeAt(1);
    return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319
}
class Hs {
    constructor(e, t) {
        this._root = null,
        this.focused = !1,
        this.trackWrites = null,
        this.mounted = !1,
        this.markCursor = null,
        this.cursorWrapper = null,
        this.lastSelectedViewDesc = void 0,
        this.input = new ua,
        this.prevDirectPlugins = [],
        this.pluginViews = [],
        this.requiresGeckoHackNode = !1,
        this.dragging = null,
        this._props = t,
        this.state = t.state,
        this.directPlugins = t.plugins || [],
        this.directPlugins.forEach(yi),
        this.dispatch = this.dispatch.bind(this),
        this.dom = e && e.mount || document.createElement("div"),
        e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)),
        this.editable = mi(this),
        pi(this),
        this.nodeViews = gi(this),
        this.docView = Ur(this.state.doc, hi(this), Mn(this), this.dom, this),
        this.domObserver = new Fa(this, (n, i, s, o) => Ja(this, n, i, s, o)),
        this.domObserver.start(),
        ha(this),
        this.updatePluginViews()
    }
    get composing() {
        return this.input.composing
    }
    get props() {
        if (this._props.state != this.state) {
            let e = this._props;
            this._props = {};
            for (let t in e)
                this._props[t] = e[t];
            this._props.state = this.state
        }
        return this._props
    }
    update(e) {
        e.handleDOMEvents != this._props.handleDOMEvents && Jn(this);
        let t = this._props;
        this._props = e,
        e.plugins && (e.plugins.forEach(yi),
        this.directPlugins = e.plugins),
        this.updateStateInner(e.state, t)
    }
    setProps(e) {
        let t = {};
        for (let n in this._props)
            t[n] = this._props[n];
        t.state = this.state;
        for (let n in e)
            t[n] = e[n];
        this.update(t)
    }
    updateState(e) {
        this.updateStateInner(e, this._props)
    }
    updateStateInner(e, t) {
        var n;
        let i = this.state
          , s = !1
          , o = !1;
        e.storedMarks && this.composing && (Bs(this),
        o = !0),
        this.state = e;
        let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
        if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
            let h = gi(this);
            Ga(h, this.nodeViews) && (this.nodeViews = h,
            s = !0)
        }
        (l || t.handleDOMEvents != this._props.handleDOMEvents) && Jn(this),
        this.editable = mi(this),
        pi(this);
        let a = Mn(this)
          , c = hi(this)
          , d = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve"
          , f = s || !this.docView.matchesNode(e.doc, c, a);
        (f || !e.selection.eq(i.selection)) && (o = !0);
        let u = d == "preserve" && o && this.dom.style.overflowAnchor == null && Nl(this);
        if (o) {
            this.domObserver.stop();
            let h = f && (X || J) && !this.composing && !i.selection.empty && !e.selection.empty && _a(i.selection, e.selection);
            if (f) {
                let p = J ? this.trackWrites = this.domSelectionRange().focusNode : null;
                this.composing && (this.input.compositionNode = Ta(this)),
                (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c),
                this.docView.destroy(),
                this.docView = Ur(e.doc, c, a, this.dom, this)),
                p && !this.trackWrites && (h = !0)
            }
            h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && Xl(this)) ? me(this, h) : (Cs(this, e.selection),
            this.domObserver.setCurSelection()),
            this.domObserver.start()
        }
        this.updatePluginViews(i),
        !((n = this.dragging) === null || n === void 0) && n.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i),
        d == "reset" ? this.dom.scrollTop = 0 : d == "to selection" ? this.scrollToSelection() : u && El(u)
    }
    scrollToSelection() {
        let e = this.domSelectionRange().focusNode;
        if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
            if (!this.someProp("handleScrollToSelection", t => t(this)))
                if (this.state.selection instanceof M) {
                    let t = this.docView.domAfterPos(this.state.selection.from);
                    t.nodeType == 1 && Wr(this, t.getBoundingClientRect(), e)
                } else
                    Wr(this, this.coordsAtPos(this.state.selection.head, 1), e)
        }
    }
    destroyPluginViews() {
        let e;
        for (; e = this.pluginViews.pop(); )
            e.destroy && e.destroy()
    }
    updatePluginViews(e) {
        if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
            this.prevDirectPlugins = this.directPlugins,
            this.destroyPluginViews();
            for (let t = 0; t < this.directPlugins.length; t++) {
                let n = this.directPlugins[t];
                n.spec.view && this.pluginViews.push(n.spec.view(this))
            }
            for (let t = 0; t < this.state.plugins.length; t++) {
                let n = this.state.plugins[t];
                n.spec.view && this.pluginViews.push(n.spec.view(this))
            }
        } else
            for (let t = 0; t < this.pluginViews.length; t++) {
                let n = this.pluginViews[t];
                n.update && n.update(this, e)
            }
    }
    updateDraggedNode(e, t) {
        let n = e.node
          , i = -1;
        if (this.state.doc.nodeAt(n.from) == n.node)
            i = n.from;
        else {
            let s = n.from + (this.state.doc.content.size - t.doc.content.size);
            (s > 0 && this.state.doc.nodeAt(s)) == n.node && (i = s)
        }
        this.dragging = new Fs(e.slice,e.move,i < 0 ? void 0 : M.create(this.state.doc, i))
    }
    someProp(e, t) {
        let n = this._props && this._props[e], i;
        if (n != null && (i = t ? t(n) : n))
            return i;
        for (let o = 0; o < this.directPlugins.length; o++) {
            let l = this.directPlugins[o].props[e];
            if (l != null && (i = t ? t(l) : l))
                return i
        }
        let s = this.state.plugins;
        if (s)
            for (let o = 0; o < s.length; o++) {
                let l = s[o].props[e];
                if (l != null && (i = t ? t(l) : l))
                    return i
            }
    }
    hasFocus() {
        if (X) {
            let e = this.root.activeElement;
            if (e == this.dom)
                return !0;
            if (!e || !this.dom.contains(e))
                return !1;
            for (; e && this.dom != e && this.dom.contains(e); ) {
                if (e.contentEditable == "false")
                    return !1;
                e = e.parentElement
            }
            return !0
        }
        return this.root.activeElement == this.dom
    }
    focus() {
        this.domObserver.stop(),
        this.editable && Dl(this.dom),
        me(this),
        this.domObserver.start()
    }
    get root() {
        let e = this._root;
        if (e == null) {
            for (let t = this.dom.parentNode; t; t = t.parentNode)
                if (t.nodeType == 9 || t.nodeType == 11 && t.host)
                    return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()),
                    this._root = t
        }
        return e || document
    }
    updateRoot() {
        this._root = null
    }
    posAtCoords(e) {
        return Pl(this, e)
    }
    coordsAtPos(e, t=1) {
        return ms(this, e, t)
    }
    domAtPos(e, t=0) {
        return this.docView.domFromPos(e, t)
    }
    nodeDOM(e) {
        let t = this.docView.descAt(e);
        return t ? t.nodeDOM : null
    }
    posAtDOM(e, t, n=-1) {
        let i = this.docView.posFromDOM(e, t, n);
        if (i == null)
            throw new RangeError("DOM position not inside the editor");
        return i
    }
    endOfTextblock(e, t) {
        return Vl(this, t || this.state, e)
    }
    pasteHTML(e, t) {
        return kt(this, "", e, !1, t || new ClipboardEvent("paste"))
    }
    pasteText(e, t) {
        return kt(this, e, null, !0, t || new ClipboardEvent("paste"))
    }
    serializeForClipboard(e) {
        return tr(this, e)
    }
    destroy() {
        this.docView && (pa(this),
        this.destroyPluginViews(),
        this.mounted ? (this.docView.update(this.state.doc, [], Mn(this), this),
        this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom),
        this.docView.destroy(),
        this.docView = null,
        gl())
    }
    get isDestroyed() {
        return this.docView == null
    }
    dispatchEvent(e) {
        return ga(this, e)
    }
    domSelectionRange() {
        let e = this.domSelection();
        return e ? U && this.root.nodeType === 11 && Sl(this.dom.ownerDocument) == this.dom && Va(this, e) || e : {
            focusNode: null,
            focusOffset: 0,
            anchorNode: null,
            anchorOffset: 0
        }
    }
    domSelection() {
        return this.root.getSelection()
    }
}
Hs.prototype.dispatch = function(r) {
    let e = this._props.dispatchTransaction;
    e ? e.call(this, r) : this.updateState(this.state.apply(r))
}
;
function hi(r) {
    let e = Object.create(null);
    return e.class = "ProseMirror",
    e.contenteditable = String(r.editable),
    r.someProp("attributes", t => {
        if (typeof t == "function" && (t = t(r.state)),
        t)
            for (let n in t)
                n == "class" ? e.class += " " + t[n] : n == "style" ? e.style = (e.style ? e.style + ";" : "") + t[n] : !e[n] && n != "contenteditable" && n != "nodeName" && (e[n] = String(t[n]))
    }
    ),
    e.translate || (e.translate = "no"),
    [re.node(0, r.state.doc.content.size, e)]
}
function pi(r) {
    if (r.markCursor) {
        let e = document.createElement("img");
        e.className = "ProseMirror-separator",
        e.setAttribute("mark-placeholder", "true"),
        e.setAttribute("alt", ""),
        r.cursorWrapper = {
            dom: e,
            deco: re.widget(r.state.selection.from, e, {
                raw: !0,
                marks: r.markCursor
            })
        }
    } else
        r.cursorWrapper = null
}
function mi(r) {
    return !r.someProp("editable", e => e(r.state) === !1)
}
function _a(r, e) {
    let t = Math.min(r.$anchor.sharedDepth(r.head), e.$anchor.sharedDepth(e.head));
    return r.$anchor.start(t) != e.$anchor.start(t)
}
function gi(r) {
    let e = Object.create(null);
    function t(n) {
        for (let i in n)
            Object.prototype.hasOwnProperty.call(e, i) || (e[i] = n[i])
    }
    return r.someProp("nodeViews", t),
    r.someProp("markViews", t),
    e
}
function Ga(r, e) {
    let t = 0
      , n = 0;
    for (let i in r) {
        if (r[i] != e[i])
            return !0;
        t++
    }
    for (let i in e)
        n++;
    return t != n
}
function yi(r) {
    if (r.spec.state || r.spec.filterTransaction || r.spec.appendTransaction)
        throw new RangeError("Plugins passed directly to the view must not have a state component")
}
var Ee = {
    8: "Backspace",
    9: "Tab",
    10: "Enter",
    12: "NumLock",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Meta",
    92: "Meta",
    106: "*",
    107: "+",
    108: ",",
    109: "-",
    110: ".",
    111: "/",
    144: "NumLock",
    145: "ScrollLock",
    160: "Shift",
    161: "Shift",
    162: "Control",
    163: "Control",
    164: "Alt",
    165: "Alt",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
}
  , Ut = {
    48: ")",
    49: "!",
    50: "@",
    51: "#",
    52: "$",
    53: "%",
    54: "^",
    55: "&",
    56: "*",
    57: "(",
    59: ":",
    61: "+",
    173: "_",
    186: ":",
    187: "+",
    188: "<",
    189: "_",
    190: ">",
    191: "?",
    192: "~",
    219: "{",
    220: "|",
    221: "}",
    222: '"'
}
  , Ya = typeof navigator != "undefined" && /Mac/.test(navigator.platform)
  , Xa = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var H = 0; H < 10; H++)
    Ee[48 + H] = Ee[96 + H] = String(H);
for (var H = 1; H <= 24; H++)
    Ee[H + 111] = "F" + H;
for (var H = 65; H <= 90; H++)
    Ee[H] = String.fromCharCode(H + 32),
    Ut[H] = String.fromCharCode(H);
for (var wn in Ee)
    Ut.hasOwnProperty(wn) || (Ut[wn] = Ee[wn]);
function Za(r) {
    var e = Ya && r.metaKey && r.shiftKey && !r.ctrlKey && !r.altKey || Xa && r.shiftKey && r.key && r.key.length == 1 || r.key == "Unidentified"
      , t = !e && r.key || (r.shiftKey ? Ut : Ee)[r.keyCode] || r.key || "Unidentified";
    return t == "Esc" && (t = "Escape"),
    t == "Del" && (t = "Delete"),
    t == "Left" && (t = "ArrowLeft"),
    t == "Up" && (t = "ArrowUp"),
    t == "Right" && (t = "ArrowRight"),
    t == "Down" && (t = "ArrowDown"),
    t
}
const Qa = typeof navigator != "undefined" && /Mac|iP(hone|[oa]d)/.test(navigator.platform)
  , ec = typeof navigator != "undefined" && /Win/.test(navigator.platform);
function tc(r) {
    let e = r.split(/-(?!$)/)
      , t = e[e.length - 1];
    t == "Space" && (t = " ");
    let n, i, s, o;
    for (let l = 0; l < e.length - 1; l++) {
        let a = e[l];
        if (/^(cmd|meta|m)$/i.test(a))
            o = !0;
        else if (/^a(lt)?$/i.test(a))
            n = !0;
        else if (/^(c|ctrl|control)$/i.test(a))
            i = !0;
        else if (/^s(hift)?$/i.test(a))
            s = !0;
        else if (/^mod$/i.test(a))
            Qa ? o = !0 : i = !0;
        else
            throw new Error("Unrecognized modifier name: " + a)
    }
    return n && (t = "Alt-" + t),
    i && (t = "Ctrl-" + t),
    o && (t = "Meta-" + t),
    s && (t = "Shift-" + t),
    t
}
function nc(r) {
    let e = Object.create(null);
    for (let t in r)
        e[tc(t)] = r[t];
    return e
}
function On(r, e, t=!0) {
    return e.altKey && (r = "Alt-" + r),
    e.ctrlKey && (r = "Ctrl-" + r),
    e.metaKey && (r = "Meta-" + r),
    t && e.shiftKey && (r = "Shift-" + r),
    r
}
function rc(r) {
    return new ce({
        props: {
            handleKeyDown: ic(r)
        }
    })
}
function ic(r) {
    let e = nc(r);
    return function(t, n) {
        let i = Za(n), s, o = e[On(i, n)];
        if (o && o(t.state, t.dispatch, t))
            return !0;
        if (i.length == 1 && i != " ") {
            if (n.shiftKey) {
                let l = e[On(i, n, !1)];
                if (l && l(t.state, t.dispatch, t))
                    return !0
            }
            if ((n.altKey || n.metaKey || n.ctrlKey) && !(ec && n.ctrlKey && n.altKey) && (s = Ee[n.keyCode]) && s != i) {
                let l = e[On(s, n)];
                if (l && l(t.state, t.dispatch, t))
                    return !0
            }
        }
        return !1
    }
}
const lr = (r, e) => r.selection.empty ? !1 : (e && e(r.tr.deleteSelection().scrollIntoView()),
!0);
function js(r, e) {
    let {$cursor: t} = r.selection;
    return !t || (e ? !e.endOfTextblock("backward", r) : t.parentOffset > 0) ? null : t
}
const Js = (r, e, t) => {
    let n = js(r, t);
    if (!n)
        return !1;
    let i = ar(n);
    if (!i) {
        let o = n.blockRange()
          , l = o && ot(o);
        return l == null ? !1 : (e && e(r.tr.lift(o, l).scrollIntoView()),
        !0)
    }
    let s = i.nodeBefore;
    if (Qs(r, i, e, -1))
        return !0;
    if (n.parent.content.size == 0 && (st(s, "end") || M.isSelectable(s)))
        for (let o = n.depth; ; o--) {
            let l = Qt(r.doc, n.before(o), n.after(o), x.empty);
            if (l && l.slice.size < l.to - l.from) {
                if (e) {
                    let a = r.tr.step(l);
                    a.setSelection(st(s, "end") ? E.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : M.create(a.doc, i.pos - s.nodeSize)),
                    e(a.scrollIntoView())
                }
                return !0
            }
            if (o == 1 || n.node(o - 1).childCount > 1)
                break
        }
    return s.isAtom && i.depth == n.depth - 1 ? (e && e(r.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()),
    !0) : !1
}
  , sc = (r, e, t) => {
    let n = js(r, t);
    if (!n)
        return !1;
    let i = ar(n);
    return i ? qs(r, i, e) : !1
}
  , oc = (r, e, t) => {
    let n = Us(r, t);
    if (!n)
        return !1;
    let i = cr(n);
    return i ? qs(r, i, e) : !1
}
;
function qs(r, e, t) {
    let n = e.nodeBefore
      , i = n
      , s = e.pos - 1;
    for (; !i.isTextblock; s--) {
        if (i.type.spec.isolating)
            return !1;
        let d = i.lastChild;
        if (!d)
            return !1;
        i = d
    }
    let o = e.nodeAfter
      , l = o
      , a = e.pos + 1;
    for (; !l.isTextblock; a++) {
        if (l.type.spec.isolating)
            return !1;
        let d = l.firstChild;
        if (!d)
            return !1;
        l = d
    }
    let c = Qt(r.doc, s, a, x.empty);
    if (!c || c.from != s || c instanceof F && c.slice.size >= a - s)
        return !1;
    if (t) {
        let d = r.tr.step(c);
        d.setSelection(T.create(d.doc, s)),
        t(d.scrollIntoView())
    }
    return !0
}
function st(r, e, t=!1) {
    for (let n = r; n; n = e == "start" ? n.firstChild : n.lastChild) {
        if (n.isTextblock)
            return !0;
        if (t && n.childCount != 1)
            return !1
    }
    return !1
}
const Ks = (r, e, t) => {
    let {$head: n, empty: i} = r.selection
      , s = n;
    if (!i)
        return !1;
    if (n.parent.isTextblock) {
        if (t ? !t.endOfTextblock("backward", r) : n.parentOffset > 0)
            return !1;
        s = ar(n)
    }
    let o = s && s.nodeBefore;
    return !o || !M.isSelectable(o) ? !1 : (e && e(r.tr.setSelection(M.create(r.doc, s.pos - o.nodeSize)).scrollIntoView()),
    !0)
}
;
function ar(r) {
    if (!r.parent.type.spec.isolating)
        for (let e = r.depth - 1; e >= 0; e--) {
            if (r.index(e) > 0)
                return r.doc.resolve(r.before(e + 1));
            if (r.node(e).type.spec.isolating)
                break
        }
    return null
}
function Us(r, e) {
    let {$cursor: t} = r.selection;
    return !t || (e ? !e.endOfTextblock("forward", r) : t.parentOffset < t.parent.content.size) ? null : t
}
const _s = (r, e, t) => {
    let n = Us(r, t);
    if (!n)
        return !1;
    let i = cr(n);
    if (!i)
        return !1;
    let s = i.nodeAfter;
    if (Qs(r, i, e, 1))
        return !0;
    if (n.parent.content.size == 0 && (st(s, "start") || M.isSelectable(s))) {
        let o = Qt(r.doc, n.before(), n.after(), x.empty);
        if (o && o.slice.size < o.to - o.from) {
            if (e) {
                let l = r.tr.step(o);
                l.setSelection(st(s, "start") ? E.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : M.create(l.doc, l.mapping.map(i.pos))),
                e(l.scrollIntoView())
            }
            return !0
        }
    }
    return s.isAtom && i.depth == n.depth - 1 ? (e && e(r.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()),
    !0) : !1
}
  , Gs = (r, e, t) => {
    let {$head: n, empty: i} = r.selection
      , s = n;
    if (!i)
        return !1;
    if (n.parent.isTextblock) {
        if (t ? !t.endOfTextblock("forward", r) : n.parentOffset < n.parent.content.size)
            return !1;
        s = cr(n)
    }
    let o = s && s.nodeAfter;
    return !o || !M.isSelectable(o) ? !1 : (e && e(r.tr.setSelection(M.create(r.doc, s.pos)).scrollIntoView()),
    !0)
}
;
function cr(r) {
    if (!r.parent.type.spec.isolating)
        for (let e = r.depth - 1; e >= 0; e--) {
            let t = r.node(e);
            if (r.index(e) + 1 < t.childCount)
                return r.doc.resolve(r.after(e + 1));
            if (t.type.spec.isolating)
                break
        }
    return null
}
const lc = (r, e) => {
    let t = r.selection, n = t instanceof M, i;
    if (n) {
        if (t.node.isTextblock || !De(r.doc, t.from))
            return !1;
        i = t.from
    } else if (i = Zt(r.doc, t.from, -1),
    i == null)
        return !1;
    if (e) {
        let s = r.tr.join(i);
        n && s.setSelection(M.create(s.doc, i - r.doc.resolve(i).nodeBefore.nodeSize)),
        e(s.scrollIntoView())
    }
    return !0
}
  , ac = (r, e) => {
    let t = r.selection, n;
    if (t instanceof M) {
        if (t.node.isTextblock || !De(r.doc, t.to))
            return !1;
        n = t.to
    } else if (n = Zt(r.doc, t.to, 1),
    n == null)
        return !1;
    return e && e(r.tr.join(n).scrollIntoView()),
    !0
}
  , cc = (r, e) => {
    let {$from: t, $to: n} = r.selection
      , i = t.blockRange(n)
      , s = i && ot(i);
    return s == null ? !1 : (e && e(r.tr.lift(i, s).scrollIntoView()),
    !0)
}
  , Ys = (r, e) => {
    let {$head: t, $anchor: n} = r.selection;
    return !t.parent.type.spec.code || !t.sameParent(n) ? !1 : (e && e(r.tr.insertText(`
`).scrollIntoView()),
    !0)
}
;
function dr(r) {
    for (let e = 0; e < r.edgeCount; e++) {
        let {type: t} = r.edge(e);
        if (t.isTextblock && !t.hasRequiredAttrs())
            return t
    }
    return null
}
const dc = (r, e) => {
    let {$head: t, $anchor: n} = r.selection;
    if (!t.parent.type.spec.code || !t.sameParent(n))
        return !1;
    let i = t.node(-1)
      , s = t.indexAfter(-1)
      , o = dr(i.contentMatchAt(s));
    if (!o || !i.canReplaceWith(s, s, o))
        return !1;
    if (e) {
        let l = t.after()
          , a = r.tr.replaceWith(l, l, o.createAndFill());
        a.setSelection(E.near(a.doc.resolve(l), 1)),
        e(a.scrollIntoView())
    }
    return !0
}
  , Xs = (r, e) => {
    let t = r.selection
      , {$from: n, $to: i} = t;
    if (t instanceof Q || n.parent.inlineContent || i.parent.inlineContent)
        return !1;
    let s = dr(i.parent.contentMatchAt(i.indexAfter()));
    if (!s || !s.isTextblock)
        return !1;
    if (e) {
        let o = (!n.parentOffset && i.index() < i.parent.childCount ? n : i).pos
          , l = r.tr.insert(o, s.createAndFill());
        l.setSelection(T.create(l.doc, o + 1)),
        e(l.scrollIntoView())
    }
    return !0
}
  , Zs = (r, e) => {
    let {$cursor: t} = r.selection;
    if (!t || t.parent.content.size)
        return !1;
    if (t.depth > 1 && t.after() != t.end(-1)) {
        let s = t.before();
        if (pe(r.doc, s))
            return e && e(r.tr.split(s).scrollIntoView()),
            !0
    }
    let n = t.blockRange()
      , i = n && ot(n);
    return i == null ? !1 : (e && e(r.tr.lift(n, i).scrollIntoView()),
    !0)
}
;
function fc(r) {
    return (e, t) => {
        let {$from: n, $to: i} = e.selection;
        if (e.selection instanceof M && e.selection.node.isBlock)
            return !n.parentOffset || !pe(e.doc, n.pos) ? !1 : (t && t(e.tr.split(n.pos).scrollIntoView()),
            !0);
        if (!n.depth)
            return !1;
        let s = [], o, l, a = !1, c = !1;
        for (let h = n.depth; ; h--)
            if (n.node(h).isBlock) {
                a = n.end(h) == n.pos + (n.depth - h),
                c = n.start(h) == n.pos - (n.depth - h),
                l = dr(n.node(h - 1).contentMatchAt(n.indexAfter(h - 1))),
                s.unshift(a && l ? {
                    type: l
                } : null),
                o = h;
                break
            } else {
                if (h == 1)
                    return !1;
                s.unshift(null)
            }
        let d = e.tr;
        (e.selection instanceof T || e.selection instanceof Q) && d.deleteSelection();
        let f = d.mapping.map(n.pos)
          , u = pe(d.doc, f, s.length, s);
        if (u || (s[0] = l ? {
            type: l
        } : null,
        u = pe(d.doc, f, s.length, s)),
        !u)
            return !1;
        if (d.split(f, s.length, s),
        !a && c && n.node(o).type != l) {
            let h = d.mapping.map(n.before(o))
              , p = d.doc.resolve(h);
            l && n.node(o - 1).canReplaceWith(p.index(), p.index() + 1, l) && d.setNodeMarkup(d.mapping.map(n.before(o)), l)
        }
        return t && t(d.scrollIntoView()),
        !0
    }
}
const uc = fc()
  , hc = (r, e) => {
    let {$from: t, to: n} = r.selection, i, s = t.sharedDepth(n);
    return s == 0 ? !1 : (i = t.before(s),
    e && e(r.tr.setSelection(M.create(r.doc, i))),
    !0)
}
;
function pc(r, e, t) {
    let n = e.nodeBefore
      , i = e.nodeAfter
      , s = e.index();
    return !n || !i || !n.type.compatibleContent(i.type) ? !1 : !n.content.size && e.parent.canReplace(s - 1, s) ? (t && t(r.tr.delete(e.pos - n.nodeSize, e.pos).scrollIntoView()),
    !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || De(r.doc, e.pos)) ? !1 : (t && t(r.tr.join(e.pos).scrollIntoView()),
    !0)
}
function Qs(r, e, t, n) {
    let i = e.nodeBefore, s = e.nodeAfter, o, l, a = i.type.spec.isolating || s.type.spec.isolating;
    if (!a && pc(r, e, t))
        return !0;
    let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
    if (c && (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && l.matchType(o[0] || s.type).validEnd) {
        if (t) {
            let h = e.pos + s.nodeSize
              , p = b.empty;
            for (let y = o.length - 1; y >= 0; y--)
                p = b.from(o[y].create(null, p));
            p = b.from(i.copy(p));
            let m = r.tr.step(new L(e.pos - 1,h,e.pos,h,new x(p,1,0),o.length,!0))
              , g = m.doc.resolve(h + 2 * o.length);
            g.nodeAfter && g.nodeAfter.type == i.type && De(m.doc, g.pos) && m.join(g.pos),
            t(m.scrollIntoView())
        }
        return !0
    }
    let d = s.type.spec.isolating || n > 0 && a ? null : E.findFrom(e, 1)
      , f = d && d.$from.blockRange(d.$to)
      , u = f && ot(f);
    if (u != null && u >= e.depth)
        return t && t(r.tr.lift(f, u).scrollIntoView()),
        !0;
    if (c && st(s, "start", !0) && st(i, "end")) {
        let h = i
          , p = [];
        for (; p.push(h),
        !h.isTextblock; )
            h = h.lastChild;
        let m = s
          , g = 1;
        for (; !m.isTextblock; m = m.firstChild)
            g++;
        if (h.canReplace(h.childCount, h.childCount, m.content)) {
            if (t) {
                let y = b.empty;
                for (let O = p.length - 1; O >= 0; O--)
                    y = b.from(p[O].copy(y));
                let C = r.tr.step(new L(e.pos - p.length,e.pos + s.nodeSize,e.pos + g,e.pos + s.nodeSize - g,new x(y,p.length,0),0,!0));
                t(C.scrollIntoView())
            }
            return !0
        }
    }
    return !1
}
function eo(r) {
    return function(e, t) {
        let n = e.selection
          , i = r < 0 ? n.$from : n.$to
          , s = i.depth;
        for (; i.node(s).isInline; ) {
            if (!s)
                return !1;
            s--
        }
        return i.node(s).isTextblock ? (t && t(e.tr.setSelection(T.create(e.doc, r < 0 ? i.start(s) : i.end(s)))),
        !0) : !1
    }
}
const mc = eo(-1)
  , gc = eo(1);
function yc(r, e=null) {
    return function(t, n) {
        let {$from: i, $to: s} = t.selection
          , o = i.blockRange(s)
          , l = o && Yn(o, r, e);
        return l ? (n && n(t.tr.wrap(o, l).scrollIntoView()),
        !0) : !1
    }
}
function bi(r, e=null) {
    return function(t, n) {
        let i = !1;
        for (let s = 0; s < t.selection.ranges.length && !i; s++) {
            let {$from: {pos: o}, $to: {pos: l}} = t.selection.ranges[s];
            t.doc.nodesBetween(o, l, (a, c) => {
                if (i)
                    return !1;
                if (!(!a.isTextblock || a.hasMarkup(r, e)))
                    if (a.type == r)
                        i = !0;
                    else {
                        let d = t.doc.resolve(c)
                          , f = d.index();
                        i = d.parent.canReplaceWith(f, f + 1, r)
                    }
            }
            )
        }
        if (!i)
            return !1;
        if (n) {
            let s = t.tr;
            for (let o = 0; o < t.selection.ranges.length; o++) {
                let {$from: {pos: l}, $to: {pos: a}} = t.selection.ranges[o];
                s.setBlockType(l, a, r, e)
            }
            n(s.scrollIntoView())
        }
        return !0
    }
}
function fr(...r) {
    return function(e, t, n) {
        for (let i = 0; i < r.length; i++)
            if (r[i](e, t, n))
                return !0;
        return !1
    }
}
fr(lr, Js, Ks);
fr(lr, _s, Gs);
fr(Ys, Xs, Zs, uc);
typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os != "undefined" && os.platform && os.platform() == "darwin";
function bc(r, e=null) {
    return function(t, n) {
        let {$from: i, $to: s} = t.selection
          , o = i.blockRange(s);
        if (!o)
            return !1;
        let l = n ? t.tr : null;
        return kc(l, o, r, e) ? (n && n(l.scrollIntoView()),
        !0) : !1
    }
}
function kc(r, e, t, n=null) {
    let i = !1
      , s = e
      , o = e.$from.doc;
    if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
        if (e.$from.index(e.depth - 1) == 0)
            return !1;
        let a = o.resolve(e.start - 2);
        s = new Vt(a,a,e.depth),
        e.endIndex < e.parent.childCount && (e = new Vt(e.$from,o.resolve(e.$to.end(e.depth)),e.depth)),
        i = !0
    }
    let l = Yn(s, t, n, e);
    return l ? (r && xc(r, e, l, i, t),
    !0) : !1
}
function xc(r, e, t, n, i) {
    let s = b.empty;
    for (let d = t.length - 1; d >= 0; d--)
        s = b.from(t[d].type.create(t[d].attrs, s));
    r.step(new L(e.start - (n ? 2 : 0),e.end,e.start,e.end,new x(s,0,0),t.length,!0));
    let o = 0;
    for (let d = 0; d < t.length; d++)
        t[d].type == i && (o = d + 1);
    let l = t.length - o
      , a = e.start + t.length - (n ? 2 : 0)
      , c = e.parent;
    for (let d = e.startIndex, f = e.endIndex, u = !0; d < f; d++,
    u = !1)
        !u && pe(r.doc, a, l) && (r.split(a, l),
        a += 2 * l),
        a += c.child(d).nodeSize;
    return r
}
function Sc(r) {
    return function(e, t) {
        let {$from: n, $to: i} = e.selection
          , s = n.blockRange(i, o => o.childCount > 0 && o.firstChild.type == r);
        return s ? t ? n.node(s.depth - 1).type == r ? Mc(e, t, r, s) : Cc(e, t, s) : !0 : !1
    }
}
function Mc(r, e, t, n) {
    let i = r.tr
      , s = n.end
      , o = n.$to.end(n.depth);
    s < o && (i.step(new L(s - 1,o,s,o,new x(b.from(t.create(null, n.parent.copy())),1,0),1,!0)),
    n = new Vt(i.doc.resolve(n.$from.pos),i.doc.resolve(o),n.depth));
    const l = ot(n);
    if (l == null)
        return !1;
    i.lift(n, l);
    let a = i.doc.resolve(i.mapping.map(s, -1) - 1);
    return De(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos),
    e(i.scrollIntoView()),
    !0
}
function Cc(r, e, t) {
    let n = r.tr
      , i = t.parent;
    for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
        h -= i.child(p).nodeSize,
        n.delete(h - 1, h + 1);
    let s = n.doc.resolve(t.start)
      , o = s.nodeAfter;
    if (n.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
        return !1;
    let l = t.startIndex == 0
      , a = t.endIndex == i.childCount
      , c = s.node(-1)
      , d = s.index(-1);
    if (!c.canReplace(d + (l ? 0 : 1), d + 1, o.content.append(a ? b.empty : b.from(i))))
        return !1;
    let f = s.pos
      , u = f + o.nodeSize;
    return n.step(new L(f - (l ? 1 : 0),u + (a ? 1 : 0),f + 1,u - 1,new x((l ? b.empty : b.from(i.copy(b.empty))).append(a ? b.empty : b.from(i.copy(b.empty))),l ? 0 : 1,a ? 0 : 1),l ? 0 : 1)),
    e(n.scrollIntoView()),
    !0
}
function wc(r) {
    return function(e, t) {
        let {$from: n, $to: i} = e.selection
          , s = n.blockRange(i, c => c.childCount > 0 && c.firstChild.type == r);
        if (!s)
            return !1;
        let o = s.startIndex;
        if (o == 0)
            return !1;
        let l = s.parent
          , a = l.child(o - 1);
        if (a.type != r)
            return !1;
        if (t) {
            let c = a.lastChild && a.lastChild.type == l.type
              , d = b.from(c ? r.create() : null)
              , f = new x(b.from(r.create(null, b.from(l.type.create(null, d)))),c ? 3 : 1,0)
              , u = s.start
              , h = s.end;
            t(e.tr.step(new L(u - (c ? 3 : 1),h,u,h,f,1,!0)).scrollIntoView())
        }
        return !0
    }
}
function sn(r) {
    const {state: e, transaction: t} = r;
    let {selection: n} = t
      , {doc: i} = t
      , {storedMarks: s} = t;
    return B(k({}, e), {
        apply: e.apply.bind(e),
        applyTransaction: e.applyTransaction.bind(e),
        plugins: e.plugins,
        schema: e.schema,
        reconfigure: e.reconfigure.bind(e),
        toJSON: e.toJSON.bind(e),
        get storedMarks() {
            return s
        },
        get selection() {
            return n
        },
        get doc() {
            return i
        },
        get tr() {
            return n = t.selection,
            i = t.doc,
            s = t.storedMarks,
            t
        }
    })
}
class on {
    constructor(e) {
        this.editor = e.editor,
        this.rawCommands = this.editor.extensionManager.commands,
        this.customState = e.state
    }
    get hasCustomState() {
        return !!this.customState
    }
    get state() {
        return this.customState || this.editor.state
    }
    get commands() {
        const {rawCommands: e, editor: t, state: n} = this
          , {view: i} = t
          , {tr: s} = n
          , o = this.buildProps(s);
        return Object.fromEntries(Object.entries(e).map( ([l,a]) => [l, (...d) => {
            const f = a(...d)(o);
            return !s.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(s),
            f
        }
        ]))
    }
    get chain() {
        return () => this.createChain()
    }
    get can() {
        return () => this.createCan()
    }
    createChain(e, t=!0) {
        const {rawCommands: n, editor: i, state: s} = this
          , {view: o} = i
          , l = []
          , a = !!e
          , c = e || s.tr
          , d = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c),
        l.every(u => u === !0))
          , f = B(k({}, Object.fromEntries(Object.entries(n).map( ([u,h]) => [u, (...m) => {
            const g = this.buildProps(c, t)
              , y = h(...m)(g);
            return l.push(y),
            f
        }
        ]))), {
            run: d
        });
        return f
    }
    createCan(e) {
        const {rawCommands: t, state: n} = this
          , i = !1
          , s = e || n.tr
          , o = this.buildProps(s, i)
          , l = Object.fromEntries(Object.entries(t).map( ([a,c]) => [a, (...d) => c(...d)(B(k({}, o), {
            dispatch: void 0
        }))]));
        return B(k({}, l), {
            chain: () => this.createChain(s, i)
        })
    }
    buildProps(e, t=!0) {
        const {rawCommands: n, editor: i, state: s} = this
          , {view: o} = i
          , l = {
            tr: e,
            editor: i,
            view: o,
            state: sn({
                state: s,
                transaction: e
            }),
            dispatch: t ? () => {}
            : void 0,
            chain: () => this.createChain(e, t),
            can: () => this.createCan(e),
            get commands() {
                return Object.fromEntries(Object.entries(n).map( ([a,c]) => [a, (...d) => c(...d)(l)]))
            }
        };
        return l
    }
}
class Oc {
    constructor() {
        this.callbacks = {}
    }
    on(e, t) {
        return this.callbacks[e] || (this.callbacks[e] = []),
        this.callbacks[e].push(t),
        this
    }
    emit(e, ...t) {
        const n = this.callbacks[e];
        return n && n.forEach(i => i.apply(this, t)),
        this
    }
    off(e, t) {
        const n = this.callbacks[e];
        return n && (t ? this.callbacks[e] = n.filter(i => i !== t) : delete this.callbacks[e]),
        this
    }
    once(e, t) {
        const n = (...i) => {
            this.off(e, n),
            t.apply(this, i)
        }
        ;
        return this.on(e, n)
    }
    removeAllListeners() {
        this.callbacks = {}
    }
}
function S(r, e, t) {
    return r.config[e] === void 0 && r.parent ? S(r.parent, e, t) : typeof r.config[e] == "function" ? r.config[e].bind(B(k({}, t), {
        parent: r.parent ? S(r.parent, e, t) : null
    })) : r.config[e]
}
function ln(r) {
    const e = r.filter(i => i.type === "extension")
      , t = r.filter(i => i.type === "node")
      , n = r.filter(i => i.type === "mark");
    return {
        baseExtensions: e,
        nodeExtensions: t,
        markExtensions: n
    }
}
function to(r) {
    const e = []
      , {nodeExtensions: t, markExtensions: n} = ln(r)
      , i = [...t, ...n]
      , s = {
        default: null,
        rendered: !0,
        renderHTML: null,
        parseHTML: null,
        keepOnSplit: !0,
        isRequired: !1
    };
    return r.forEach(o => {
        const l = {
            name: o.name,
            options: o.options,
            storage: o.storage,
            extensions: i
        }
          , a = S(o, "addGlobalAttributes", l);
        if (!a)
            return;
        a().forEach(d => {
            d.types.forEach(f => {
                Object.entries(d.attributes).forEach( ([u,h]) => {
                    e.push({
                        type: f,
                        name: u,
                        attribute: k(k({}, s), h)
                    })
                }
                )
            }
            )
        }
        )
    }
    ),
    i.forEach(o => {
        const l = {
            name: o.name,
            options: o.options,
            storage: o.storage
        }
          , a = S(o, "addAttributes", l);
        if (!a)
            return;
        const c = a();
        Object.entries(c).forEach( ([d,f]) => {
            const u = k(k({}, s), f);
            typeof (u == null ? void 0 : u.default) == "function" && (u.default = u.default()),
            u != null && u.isRequired && (u == null ? void 0 : u.default) === void 0 && delete u.default,
            e.push({
                type: o.name,
                name: d,
                attribute: u
            })
        }
        )
    }
    ),
    e
}
function V(r, e) {
    if (typeof r == "string") {
        if (!e.nodes[r])
            throw Error(`There is no node type named '${r}'. Maybe you forgot to add the extension?`);
        return e.nodes[r]
    }
    return r
}
function Ie(...r) {
    return r.filter(e => !!e).reduce( (e, t) => {
        const n = k({}, e);
        return Object.entries(t).forEach( ([i,s]) => {
            if (!n[i]) {
                n[i] = s;
                return
            }
            if (i === "class") {
                const l = s ? String(s).split(" ") : []
                  , a = n[i] ? n[i].split(" ") : []
                  , c = l.filter(d => !a.includes(d));
                n[i] = [...a, ...c].join(" ")
            } else if (i === "style") {
                const l = s ? s.split(";").map(d => d.trim()).filter(Boolean) : []
                  , a = n[i] ? n[i].split(";").map(d => d.trim()).filter(Boolean) : []
                  , c = new Map;
                a.forEach(d => {
                    const [f,u] = d.split(":").map(h => h.trim());
                    c.set(f, u)
                }
                ),
                l.forEach(d => {
                    const [f,u] = d.split(":").map(h => h.trim());
                    c.set(f, u)
                }
                ),
                n[i] = Array.from(c.entries()).map( ([d,f]) => `${d}: ${f}`).join("; ")
            } else
                n[i] = s
        }
        ),
        n
    }
    , {})
}
function qn(r, e) {
    return e.filter(t => t.type === r.type.name).filter(t => t.attribute.rendered).map(t => t.attribute.renderHTML ? t.attribute.renderHTML(r.attrs) || {} : {
        [t.name]: r.attrs[t.name]
    }).reduce( (t, n) => Ie(t, n), {})
}
function no(r) {
    return typeof r == "function"
}
function N(r, e=void 0, ...t) {
    return no(r) ? e ? r.bind(e)(...t) : r(...t) : r
}
function Tc(r={}) {
    return Object.keys(r).length === 0 && r.constructor === Object
}
function Nc(r) {
    return typeof r != "string" ? r : r.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(r) : r === "true" ? !0 : r === "false" ? !1 : r
}
function ki(r, e) {
    return "style"in r ? r : B(k({}, r), {
        getAttrs: t => {
            const n = r.getAttrs ? r.getAttrs(t) : r.attrs;
            if (n === !1)
                return !1;
            const i = e.reduce( (s, o) => {
                const l = o.attribute.parseHTML ? o.attribute.parseHTML(t) : Nc(t.getAttribute(o.name));
                return l == null ? s : B(k({}, s), {
                    [o.name]: l
                })
            }
            , {});
            return k(k({}, n), i)
        }
    })
}
function xi(r) {
    return Object.fromEntries(Object.entries(r).filter( ([e,t]) => e === "attrs" && Tc(t) ? !1 : t != null))
}
function Ec(r, e) {
    var t;
    const n = to(r)
      , {nodeExtensions: i, markExtensions: s} = ln(r)
      , o = (t = i.find(c => S(c, "topNode"))) === null || t === void 0 ? void 0 : t.name
      , l = Object.fromEntries(i.map(c => {
        const d = n.filter(y => y.type === c.name)
          , f = {
            name: c.name,
            options: c.options,
            storage: c.storage,
            editor: e
        }
          , u = r.reduce( (y, C) => {
            const O = S(C, "extendNodeSchema", f);
            return k(k({}, y), O ? O(c) : {})
        }
        , {})
          , h = xi(B(k({}, u), {
            content: N(S(c, "content", f)),
            marks: N(S(c, "marks", f)),
            group: N(S(c, "group", f)),
            inline: N(S(c, "inline", f)),
            atom: N(S(c, "atom", f)),
            selectable: N(S(c, "selectable", f)),
            draggable: N(S(c, "draggable", f)),
            code: N(S(c, "code", f)),
            whitespace: N(S(c, "whitespace", f)),
            linebreakReplacement: N(S(c, "linebreakReplacement", f)),
            defining: N(S(c, "defining", f)),
            isolating: N(S(c, "isolating", f)),
            attrs: Object.fromEntries(d.map(y => {
                var C;
                return [y.name, {
                    default: (C = y == null ? void 0 : y.attribute) === null || C === void 0 ? void 0 : C.default
                }]
            }
            ))
        }))
          , p = N(S(c, "parseHTML", f));
        p && (h.parseDOM = p.map(y => ki(y, d)));
        const m = S(c, "renderHTML", f);
        m && (h.toDOM = y => m({
            node: y,
            HTMLAttributes: qn(y, d)
        }));
        const g = S(c, "renderText", f);
        return g && (h.toText = g),
        [c.name, h]
    }
    ))
      , a = Object.fromEntries(s.map(c => {
        const d = n.filter(g => g.type === c.name)
          , f = {
            name: c.name,
            options: c.options,
            storage: c.storage,
            editor: e
        }
          , u = r.reduce( (g, y) => {
            const C = S(y, "extendMarkSchema", f);
            return k(k({}, g), C ? C(c) : {})
        }
        , {})
          , h = xi(B(k({}, u), {
            inclusive: N(S(c, "inclusive", f)),
            excludes: N(S(c, "excludes", f)),
            group: N(S(c, "group", f)),
            spanning: N(S(c, "spanning", f)),
            code: N(S(c, "code", f)),
            attrs: Object.fromEntries(d.map(g => {
                var y;
                return [g.name, {
                    default: (y = g == null ? void 0 : g.attribute) === null || y === void 0 ? void 0 : y.default
                }]
            }
            ))
        }))
          , p = N(S(c, "parseHTML", f));
        p && (h.parseDOM = p.map(g => ki(g, d)));
        const m = S(c, "renderHTML", f);
        return m && (h.toDOM = g => m({
            mark: g,
            HTMLAttributes: qn(g, d)
        })),
        [c.name, h]
    }
    ));
    return new Ji({
        topNode: o,
        nodes: l,
        marks: a
    })
}
function Tn(r, e) {
    return e.nodes[r] || e.marks[r] || null
}
function Si(r, e) {
    return Array.isArray(e) ? e.some(t => (typeof t == "string" ? t : t.name) === r.name) : e
}
function ur(r, e) {
    const t = Ke.fromSchema(e).serializeFragment(r)
      , i = document.implementation.createHTMLDocument().createElement("div");
    return i.appendChild(t),
    i.innerHTML
}
const Dc = (r, e=500) => {
    let t = "";
    const n = r.parentOffset;
    return r.parent.nodesBetween(Math.max(0, n - e), n, (i, s, o, l) => {
        var a, c;
        const d = ((c = (a = i.type.spec).toText) === null || c === void 0 ? void 0 : c.call(a, {
            node: i,
            pos: s,
            parent: o,
            index: l
        })) || i.textContent || "%leaf%";
        t += i.isAtom && !i.isText ? d : d.slice(0, Math.max(0, n - s))
    }
    ),
    t
}
;
function hr(r) {
    return Object.prototype.toString.call(r) === "[object RegExp]"
}
class pr {
    constructor(e) {
        this.find = e.find,
        this.handler = e.handler
    }
}
const Ac = (r, e) => {
    if (hr(e))
        return e.exec(r);
    const t = e(r);
    if (!t)
        return null;
    const n = [t.text];
    return n.index = t.index,
    n.input = r,
    n.data = t.data,
    t.replaceWith && (t.text.includes(t.replaceWith),
    n.push(t.replaceWith)),
    n
}
;
function Dt(r) {
    var e;
    const {editor: t, from: n, to: i, text: s, rules: o, plugin: l} = r
      , {view: a} = t;
    if (a.composing)
        return !1;
    const c = a.state.doc.resolve(n);
    if (c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find(u => u.type.spec.code))
        return !1;
    let d = !1;
    const f = Dc(c) + s;
    return o.forEach(u => {
        if (d)
            return;
        const h = Ac(f, u.find);
        if (!h)
            return;
        const p = a.state.tr
          , m = sn({
            state: a.state,
            transaction: p
        })
          , g = {
            from: n - (h[0].length - s.length),
            to: i
        }
          , {commands: y, chain: C, can: O} = new on({
            editor: t,
            state: m
        });
        u.handler({
            state: m,
            range: g,
            match: h,
            commands: y,
            chain: C,
            can: O
        }) === null || !p.steps.length || (p.setMeta(l, {
            transform: p,
            from: n,
            to: i,
            text: s
        }),
        a.dispatch(p),
        d = !0)
    }
    ),
    d
}
function Ic(r) {
    const {editor: e, rules: t} = r
      , n = new ce({
        state: {
            init() {
                return null
            },
            apply(i, s, o) {
                const l = i.getMeta(n);
                if (l)
                    return l;
                const a = i.getMeta("applyInputRules");
                return !!a && setTimeout( () => {
                    let {text: d} = a;
                    typeof d == "string" ? d = d : d = ur(b.from(d), o.schema);
                    const {from: f} = a
                      , u = f + d.length;
                    Dt({
                        editor: e,
                        from: f,
                        to: u,
                        text: d,
                        rules: t,
                        plugin: n
                    })
                }
                ),
                i.selectionSet || i.docChanged ? null : s
            }
        },
        props: {
            handleTextInput(i, s, o, l) {
                return Dt({
                    editor: e,
                    from: s,
                    to: o,
                    text: l,
                    rules: t,
                    plugin: n
                })
            },
            handleDOMEvents: {
                compositionend: i => (setTimeout( () => {
                    const {$cursor: s} = i.state.selection;
                    s && Dt({
                        editor: e,
                        from: s.pos,
                        to: s.pos,
                        text: "",
                        rules: t,
                        plugin: n
                    })
                }
                ),
                !1)
            },
            handleKeyDown(i, s) {
                if (s.key !== "Enter")
                    return !1;
                const {$cursor: o} = i.state.selection;
                return o ? Dt({
                    editor: e,
                    from: o.pos,
                    to: o.pos,
                    text: `
`,
                    rules: t,
                    plugin: n
                }) : !1
            }
        },
        isInputRules: !0
    });
    return n
}
function vc(r) {
    return Object.prototype.toString.call(r).slice(8, -1)
}
function At(r) {
    return vc(r) !== "Object" ? !1 : r.constructor === Object && Object.getPrototypeOf(r) === Object.prototype
}
function an(r, e) {
    const t = k({}, r);
    return At(r) && At(e) && Object.keys(e).forEach(n => {
        At(e[n]) && At(r[n]) ? t[n] = an(r[n], e[n]) : t[n] = e[n]
    }
    ),
    t
}
class qe {
    constructor(e={}) {
        this.type = "mark",
        this.name = "mark",
        this.parent = null,
        this.child = null,
        this.config = {
            name: this.name,
            defaultOptions: {}
        },
        this.config = k(k({}, this.config), e),
        this.name = this.config.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        this.options = this.config.defaultOptions,
        this.config.addOptions && (this.options = N(S(this, "addOptions", {
            name: this.name
        }))),
        this.storage = N(S(this, "addStorage", {
            name: this.name,
            options: this.options
        })) || {}
    }
    static create(e={}) {
        return new qe(e)
    }
    configure(e={}) {
        const t = this.extend(B(k({}, this.config), {
            addOptions: () => an(this.options, e)
        }));
        return t.name = this.name,
        t.parent = this.parent,
        t
    }
    extend(e={}) {
        const t = new qe(e);
        return t.parent = this,
        this.child = t,
        t.name = e.name ? e.name : t.parent.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        t.options = N(S(t, "addOptions", {
            name: t.name
        })),
        t.storage = N(S(t, "addStorage", {
            name: t.name,
            options: t.options
        })),
        t
    }
    static handleExit({editor: e, mark: t}) {
        const {tr: n} = e.state
          , i = e.state.selection.$from;
        if (i.pos === i.end()) {
            const o = i.marks();
            if (!!!o.find(c => (c == null ? void 0 : c.type.name) === t.name))
                return !1;
            const a = o.find(c => (c == null ? void 0 : c.type.name) === t.name);
            return a && n.removeStoredMark(a),
            n.insertText(" ", i.pos),
            e.view.dispatch(n),
            !0
        }
        return !1
    }
}
function Rc(r) {
    return typeof r == "number"
}
class Pc {
    constructor(e) {
        this.find = e.find,
        this.handler = e.handler
    }
}
const Bc = (r, e, t) => {
    if (hr(e))
        return [...r.matchAll(e)];
    const n = e(r, t);
    return n ? n.map(i => {
        const s = [i.text];
        return s.index = i.index,
        s.input = r,
        s.data = i.data,
        i.replaceWith && (i.text.includes(i.replaceWith),
        s.push(i.replaceWith)),
        s
    }
    ) : []
}
;
function zc(r) {
    const {editor: e, state: t, from: n, to: i, rule: s, pasteEvent: o, dropEvent: l} = r
      , {commands: a, chain: c, can: d} = new on({
        editor: e,
        state: t
    })
      , f = [];
    return t.doc.nodesBetween(n, i, (h, p) => {
        if (!h.isTextblock || h.type.spec.code)
            return;
        const m = Math.max(n, p)
          , g = Math.min(i, p + h.content.size)
          , y = h.textBetween(m - p, g - p, void 0, " ");
        Bc(y, s.find, o).forEach(O => {
            if (O.index === void 0)
                return;
            const A = m + O.index + 1
              , D = A + O[0].length
              , P = {
                from: t.tr.mapping.map(A),
                to: t.tr.mapping.map(D)
            }
              , K = s.handler({
                state: t,
                range: P,
                match: O,
                commands: a,
                chain: c,
                can: d,
                pasteEvent: o,
                dropEvent: l
            });
            f.push(K)
        }
        )
    }
    ),
    f.every(h => h !== null)
}
let It = null;
const Fc = r => {
    var e;
    const t = new ClipboardEvent("paste",{
        clipboardData: new DataTransfer
    });
    return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", r),
    t
}
;
function Lc(r) {
    const {editor: e, rules: t} = r;
    let n = null, i = !1, s = !1, o = typeof ClipboardEvent != "undefined" ? new ClipboardEvent("paste") : null, l;
    try {
        l = typeof DragEvent != "undefined" ? new DragEvent("drop") : null
    } catch (d) {
        l = null
    }
    const a = ({state: d, from: f, to: u, rule: h, pasteEvt: p}) => {
        const m = d.tr
          , g = sn({
            state: d,
            transaction: m
        });
        if (!(!zc({
            editor: e,
            state: g,
            from: Math.max(f - 1, 0),
            to: u.b - 1,
            rule: h,
            pasteEvent: p,
            dropEvent: l
        }) || !m.steps.length)) {
            try {
                l = typeof DragEvent != "undefined" ? new DragEvent("drop") : null
            } catch (C) {
                l = null
            }
            return o = typeof ClipboardEvent != "undefined" ? new ClipboardEvent("paste") : null,
            m
        }
    }
    ;
    return t.map(d => new ce({
        view(f) {
            const u = p => {
                var m;
                n = !((m = f.dom.parentElement) === null || m === void 0) && m.contains(p.target) ? f.dom.parentElement : null,
                n && (It = e)
            }
              , h = () => {
                It && (It = null)
            }
            ;
            return window.addEventListener("dragstart", u),
            window.addEventListener("dragend", h),
            {
                destroy() {
                    window.removeEventListener("dragstart", u),
                    window.removeEventListener("dragend", h)
                }
            }
        },
        props: {
            handleDOMEvents: {
                drop: (f, u) => {
                    if (s = n === f.dom.parentElement,
                    l = u,
                    !s) {
                        const h = It;
                        h != null && h.isEditable && setTimeout( () => {
                            const p = h.state.selection;
                            p && h.commands.deleteRange({
                                from: p.from,
                                to: p.to
                            })
                        }
                        , 10)
                    }
                    return !1
                }
                ,
                paste: (f, u) => {
                    var h;
                    const p = (h = u.clipboardData) === null || h === void 0 ? void 0 : h.getData("text/html");
                    return o = u,
                    i = !!(p != null && p.includes("data-pm-slice")),
                    !1
                }
            }
        },
        appendTransaction: (f, u, h) => {
            const p = f[0]
              , m = p.getMeta("uiEvent") === "paste" && !i
              , g = p.getMeta("uiEvent") === "drop" && !s
              , y = p.getMeta("applyPasteRules")
              , C = !!y;
            if (!m && !g && !C)
                return;
            if (C) {
                let {text: D} = y;
                typeof D == "string" ? D = D : D = ur(b.from(D), h.schema);
                const {from: P} = y
                  , K = P + D.length
                  , w = Fc(D);
                return a({
                    rule: d,
                    state: h,
                    from: P,
                    to: {
                        b: K
                    },
                    pasteEvt: w
                })
            }
            const O = u.doc.content.findDiffStart(h.doc.content)
              , A = u.doc.content.findDiffEnd(h.doc.content);
            if (!(!Rc(O) || !A || O === A.b))
                return a({
                    rule: d,
                    state: h,
                    from: O,
                    to: A,
                    pasteEvt: o
                })
        }
    }))
}
function Vc(r) {
    const e = r.filter( (t, n) => r.indexOf(t) !== n);
    return Array.from(new Set(e))
}
class Qe {
    constructor(e, t) {
        this.splittableMarks = [],
        this.editor = t,
        this.extensions = Qe.resolve(e),
        this.schema = Ec(this.extensions, t),
        this.setupExtensions()
    }
    static resolve(e) {
        const t = Qe.sort(Qe.flatten(e));
        return Vc(t.map(i => i.name)).length,
        t
    }
    static flatten(e) {
        return e.map(t => {
            const n = {
                name: t.name,
                options: t.options,
                storage: t.storage
            }
              , i = S(t, "addExtensions", n);
            return i ? [t, ...this.flatten(i())] : t
        }
        ).flat(10)
    }
    static sort(e) {
        return e.sort( (n, i) => {
            const s = S(n, "priority") || 100
              , o = S(i, "priority") || 100;
            return s > o ? -1 : s < o ? 1 : 0
        }
        )
    }
    get commands() {
        return this.extensions.reduce( (e, t) => {
            const n = {
                name: t.name,
                options: t.options,
                storage: t.storage,
                editor: this.editor,
                type: Tn(t.name, this.schema)
            }
              , i = S(t, "addCommands", n);
            return i ? k(k({}, e), i()) : e
        }
        , {})
    }
    get plugins() {
        const {editor: e} = this
          , t = Qe.sort([...this.extensions].reverse())
          , n = []
          , i = []
          , s = t.map(o => {
            const l = {
                name: o.name,
                options: o.options,
                storage: o.storage,
                editor: e,
                type: Tn(o.name, this.schema)
            }
              , a = []
              , c = S(o, "addKeyboardShortcuts", l);
            let d = {};
            if (o.type === "mark" && S(o, "exitable", l) && (d.ArrowRight = () => qe.handleExit({
                editor: e,
                mark: o
            })),
            c) {
                const m = Object.fromEntries(Object.entries(c()).map( ([g,y]) => [g, () => y({
                    editor: e
                })]));
                d = k(k({}, d), m)
            }
            const f = rc(d);
            a.push(f);
            const u = S(o, "addInputRules", l);
            Si(o, e.options.enableInputRules) && u && n.push(...u());
            const h = S(o, "addPasteRules", l);
            Si(o, e.options.enablePasteRules) && h && i.push(...h());
            const p = S(o, "addProseMirrorPlugins", l);
            if (p) {
                const m = p();
                a.push(...m)
            }
            return a
        }
        ).flat();
        return [Ic({
            editor: e,
            rules: n
        }), ...Lc({
            editor: e,
            rules: i
        }), ...s]
    }
    get attributes() {
        return to(this.extensions)
    }
    get nodeViews() {
        const {editor: e} = this
          , {nodeExtensions: t} = ln(this.extensions);
        return Object.fromEntries(t.filter(n => !!S(n, "addNodeView")).map(n => {
            const i = this.attributes.filter(a => a.type === n.name)
              , s = {
                name: n.name,
                options: n.options,
                storage: n.storage,
                editor: e,
                type: V(n.name, this.schema)
            }
              , o = S(n, "addNodeView", s);
            if (!o)
                return [];
            const l = (a, c, d, f, u) => {
                const h = qn(a, i);
                return o()({
                    node: a,
                    view: c,
                    getPos: d,
                    decorations: f,
                    innerDecorations: u,
                    editor: e,
                    extension: n,
                    HTMLAttributes: h
                })
            }
            ;
            return [n.name, l]
        }
        ))
    }
    setupExtensions() {
        this.extensions.forEach(e => {
            var t;
            this.editor.extensionStorage[e.name] = e.storage;
            const n = {
                name: e.name,
                options: e.options,
                storage: e.storage,
                editor: this.editor,
                type: Tn(e.name, this.schema)
            };
            e.type === "mark" && (!((t = N(S(e, "keepOnSplit", n))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
            const i = S(e, "onBeforeCreate", n)
              , s = S(e, "onCreate", n)
              , o = S(e, "onUpdate", n)
              , l = S(e, "onSelectionUpdate", n)
              , a = S(e, "onTransaction", n)
              , c = S(e, "onFocus", n)
              , d = S(e, "onBlur", n)
              , f = S(e, "onDestroy", n);
            i && this.editor.on("beforeCreate", i),
            s && this.editor.on("create", s),
            o && this.editor.on("update", o),
            l && this.editor.on("selectionUpdate", l),
            a && this.editor.on("transaction", a),
            c && this.editor.on("focus", c),
            d && this.editor.on("blur", d),
            f && this.editor.on("destroy", f)
        }
        )
    }
}
class se {
    constructor(e={}) {
        this.type = "extension",
        this.name = "extension",
        this.parent = null,
        this.child = null,
        this.config = {
            name: this.name,
            defaultOptions: {}
        },
        this.config = k(k({}, this.config), e),
        this.name = this.config.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        this.options = this.config.defaultOptions,
        this.config.addOptions && (this.options = N(S(this, "addOptions", {
            name: this.name
        }))),
        this.storage = N(S(this, "addStorage", {
            name: this.name,
            options: this.options
        })) || {}
    }
    static create(e={}) {
        return new se(e)
    }
    configure(e={}) {
        const t = this.extend(B(k({}, this.config), {
            addOptions: () => an(this.options, e)
        }));
        return t.name = this.name,
        t.parent = this.parent,
        t
    }
    extend(e={}) {
        const t = new se(k(k({}, this.config), e));
        return t.parent = this,
        this.child = t,
        t.name = e.name ? e.name : t.parent.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        t.options = N(S(t, "addOptions", {
            name: t.name
        })),
        t.storage = N(S(t, "addStorage", {
            name: t.name,
            options: t.options
        })),
        t
    }
}
function ro(r, e, t) {
    const {from: n, to: i} = e
      , {blockSeparator: s=`

`, textSerializers: o={}} = t || {};
    let l = "";
    return r.nodesBetween(n, i, (a, c, d, f) => {
        var u;
        a.isBlock && c > n && (l += s);
        const h = o == null ? void 0 : o[a.type.name];
        if (h)
            return d && (l += h({
                node: a,
                pos: c,
                parent: d,
                index: f,
                range: e
            })),
            !1;
        a.isText && (l += (u = a == null ? void 0 : a.text) === null || u === void 0 ? void 0 : u.slice(Math.max(n, c) - c, i - c))
    }
    ),
    l
}
function io(r) {
    return Object.fromEntries(Object.entries(r.nodes).filter( ([,e]) => e.spec.toText).map( ([e,t]) => [e, t.spec.toText]))
}
const $c = se.create({
    name: "clipboardTextSerializer",
    addOptions() {
        return {
            blockSeparator: void 0
        }
    },
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("clipboardTextSerializer"),
            props: {
                clipboardTextSerializer: () => {
                    const {editor: r} = this
                      , {state: e, schema: t} = r
                      , {doc: n, selection: i} = e
                      , {ranges: s} = i
                      , o = Math.min(...s.map(d => d.$from.pos))
                      , l = Math.max(...s.map(d => d.$to.pos))
                      , a = io(t);
                    return ro(n, {
                        from: o,
                        to: l
                    }, B(k({}, this.options.blockSeparator !== void 0 ? {
                        blockSeparator: this.options.blockSeparator
                    } : {}), {
                        textSerializers: a
                    }))
                }
            }
        })]
    }
})
  , Wc = () => ({editor: r, view: e}) => (requestAnimationFrame( () => {
    var t;
    r.isDestroyed || (e.dom.blur(),
    (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges())
}
),
!0)
  , Hc = (r=!1) => ({commands: e}) => e.setContent("", r)
  , jc = () => ({state: r, tr: e, dispatch: t}) => {
    const {selection: n} = e
      , {ranges: i} = n;
    return t && i.forEach( ({$from: s, $to: o}) => {
        r.doc.nodesBetween(s.pos, o.pos, (l, a) => {
            if (l.type.isText)
                return;
            const {doc: c, mapping: d} = e
              , f = c.resolve(d.map(a))
              , u = c.resolve(d.map(a + l.nodeSize))
              , h = f.blockRange(u);
            if (!h)
                return;
            const p = ot(h);
            if (l.type.isTextblock) {
                const {defaultType: m} = f.parent.contentMatchAt(f.index());
                e.setNodeMarkup(h.start, m)
            }
            (p || p === 0) && e.lift(h, p)
        }
        )
    }
    ),
    !0
}
  , Jc = r => e => r(e)
  , qc = () => ({state: r, dispatch: e}) => Xs(r, e)
  , Kc = (r, e) => ({editor: t, tr: n}) => {
    const {state: i} = t
      , s = i.doc.slice(r.from, r.to);
    n.deleteRange(r.from, r.to);
    const o = n.mapping.map(e);
    return n.insert(o, s.content),
    n.setSelection(new T(n.doc.resolve(Math.max(o - 1, 0)))),
    !0
}
  , Uc = () => ({tr: r, dispatch: e}) => {
    const {selection: t} = r
      , n = t.$anchor.node();
    if (n.content.size > 0)
        return !1;
    const i = r.selection.$anchor;
    for (let s = i.depth; s > 0; s -= 1)
        if (i.node(s).type === n.type) {
            if (e) {
                const l = i.before(s)
                  , a = i.after(s);
                r.delete(l, a).scrollIntoView()
            }
            return !0
        }
    return !1
}
  , _c = r => ({tr: e, state: t, dispatch: n}) => {
    const i = V(r, t.schema)
      , s = e.selection.$anchor;
    for (let o = s.depth; o > 0; o -= 1)
        if (s.node(o).type === i) {
            if (n) {
                const a = s.before(o)
                  , c = s.after(o);
                e.delete(a, c).scrollIntoView()
            }
            return !0
        }
    return !1
}
  , Gc = r => ({tr: e, dispatch: t}) => {
    const {from: n, to: i} = r;
    return t && e.delete(n, i),
    !0
}
  , Yc = () => ({state: r, dispatch: e}) => lr(r, e)
  , Xc = () => ({commands: r}) => r.keyboardShortcut("Enter")
  , Zc = () => ({state: r, dispatch: e}) => dc(r, e);
function _t(r, e, t={
    strict: !0
}) {
    const n = Object.keys(e);
    return n.length ? n.every(i => t.strict ? e[i] === r[i] : hr(e[i]) ? e[i].test(r[i]) : e[i] === r[i]) : !0
}
function so(r, e, t={}) {
    return r.find(n => n.type === e && _t(Object.fromEntries(Object.keys(t).map(i => [i, n.attrs[i]])), t))
}
function Mi(r, e, t={}) {
    return !!so(r, e, t)
}
function mr(r, e, t) {
    var n;
    if (!r || !e)
        return;
    let i = r.parent.childAfter(r.parentOffset);
    if ((!i.node || !i.node.marks.some(d => d.type === e)) && (i = r.parent.childBefore(r.parentOffset)),
    !i.node || !i.node.marks.some(d => d.type === e) || (t = t || ((n = i.node.marks[0]) === null || n === void 0 ? void 0 : n.attrs),
    !so([...i.node.marks], e, t)))
        return;
    let o = i.index
      , l = r.start() + i.offset
      , a = o + 1
      , c = l + i.node.nodeSize;
    for (; o > 0 && Mi([...r.parent.child(o - 1).marks], e, t); )
        o -= 1,
        l -= r.parent.child(o).nodeSize;
    for (; a < r.parent.childCount && Mi([...r.parent.child(a).marks], e, t); )
        c += r.parent.child(a).nodeSize,
        a += 1;
    return {
        from: l,
        to: c
    }
}
function ve(r, e) {
    if (typeof r == "string") {
        if (!e.marks[r])
            throw Error(`There is no mark type named '${r}'. Maybe you forgot to add the extension?`);
        return e.marks[r]
    }
    return r
}
const Qc = (r, e={}) => ({tr: t, state: n, dispatch: i}) => {
    const s = ve(r, n.schema)
      , {doc: o, selection: l} = t
      , {$from: a, from: c, to: d} = l;
    if (i) {
        const f = mr(a, s, e);
        if (f && f.from <= c && f.to >= d) {
            const u = T.create(o, f.from, f.to);
            t.setSelection(u)
        }
    }
    return !0
}
  , ed = r => e => {
    const t = typeof r == "function" ? r(e) : r;
    for (let n = 0; n < t.length; n += 1)
        if (t[n](e))
            return !0;
    return !1
}
;
function oo(r) {
    return r instanceof T
}
function he(r=0, e=0, t=0) {
    return Math.min(Math.max(r, e), t)
}
function lo(r, e=null) {
    if (!e)
        return null;
    const t = E.atStart(r)
      , n = E.atEnd(r);
    if (e === "start" || e === !0)
        return t;
    if (e === "end")
        return n;
    const i = t.from
      , s = n.to;
    return e === "all" ? T.create(r, he(0, i, s), he(r.content.size, i, s)) : T.create(r, he(e, i, s), he(e, i, s))
}
function ao() {
    return navigator.platform === "Android" || /android/i.test(navigator.userAgent)
}
function cn() {
    return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend"in document
}
const td = (r=null, e={}) => ({editor: t, view: n, tr: i, dispatch: s}) => {
    e = k({
        scrollIntoView: !0
    }, e);
    const o = () => {
        (cn() || ao()) && n.dom.focus(),
        requestAnimationFrame( () => {
            t.isDestroyed || (n.focus(),
            e != null && e.scrollIntoView && t.commands.scrollIntoView())
        }
        )
    }
    ;
    if (n.hasFocus() && r === null || r === !1)
        return !0;
    if (s && r === null && !oo(t.state.selection))
        return o(),
        !0;
    const l = lo(i.doc, r) || t.state.selection
      , a = t.state.selection.eq(l);
    return s && (a || i.setSelection(l),
    a && i.storedMarks && i.setStoredMarks(i.storedMarks),
    o()),
    !0
}
  , nd = (r, e) => t => r.every( (n, i) => e(n, B(k({}, t), {
    index: i
})))
  , rd = (r, e) => ({tr: t, commands: n}) => n.insertContentAt({
    from: t.selection.from,
    to: t.selection.to
}, r, e)
  , co = r => {
    const e = r.childNodes;
    for (let t = e.length - 1; t >= 0; t -= 1) {
        const n = e[t];
        n.nodeType === 3 && n.nodeValue && /^(\n\s\s|\n)$/.test(n.nodeValue) ? r.removeChild(n) : n.nodeType === 1 && co(n)
    }
    return r
}
;
function vt(r) {
    const e = `<body>${r}</body>`
      , t = new window.DOMParser().parseFromString(e, "text/html").body;
    return co(t)
}
function St(r, e, t) {
    if (r instanceof Ce || r instanceof b)
        return r;
    t = k({
        slice: !0,
        parseOptions: {}
    }, t);
    const n = typeof r == "object" && r !== null
      , i = typeof r == "string";
    if (n)
        try {
            if (Array.isArray(r) && r.length > 0)
                return b.fromArray(r.map(l => e.nodeFromJSON(l)));
            const o = e.nodeFromJSON(r);
            return t.errorOnInvalidContent && o.check(),
            o
        } catch (s) {
            if (t.errorOnInvalidContent)
                throw new Error("[tiptap error]: Invalid JSON content",{
                    cause: s
                });
            return St("", e, t)
        }
    if (i) {
        if (t.errorOnInvalidContent) {
            let o = !1
              , l = "";
            const a = new Ji({
                topNode: e.spec.topNode,
                marks: e.spec.marks,
                nodes: e.spec.nodes.append({
                    __tiptap__private__unknown__catch__all__node: {
                        content: "inline*",
                        group: "block",
                        parseDOM: [{
                            tag: "*",
                            getAttrs: c => (o = !0,
                            l = typeof c == "string" ? c : c.outerHTML,
                            null)
                        }]
                    }
                })
            });
            if (t.slice ? we.fromSchema(a).parseSlice(vt(r), t.parseOptions) : we.fromSchema(a).parse(vt(r), t.parseOptions),
            t.errorOnInvalidContent && o)
                throw new Error("[tiptap error]: Invalid HTML content",{
                    cause: new Error(`Invalid element found: ${l}`)
                })
        }
        const s = we.fromSchema(e);
        return t.slice ? s.parseSlice(vt(r), t.parseOptions).content : s.parse(vt(r), t.parseOptions)
    }
    return St("", e, t)
}
function id(r, e, t) {
    const n = r.steps.length - 1;
    if (n < e)
        return;
    const i = r.steps[n];
    if (!(i instanceof F || i instanceof L))
        return;
    const s = r.mapping.maps[n];
    let o = 0;
    s.forEach( (l, a, c, d) => {
        o === 0 && (o = d)
    }
    ),
    r.setSelection(E.near(r.doc.resolve(o), t))
}
const sd = r => !("type"in r)
  , od = (r, e, t) => ({tr: n, dispatch: i, editor: s}) => {
    var o;
    if (i) {
        t = k({
            parseOptions: s.options.parseOptions,
            updateSelection: !0,
            applyInputRules: !1,
            applyPasteRules: !1
        }, t);
        let l;
        const a = g => {
            s.emit("contentError", {
                editor: s,
                error: g,
                disableCollaboration: () => {
                    s.storage.collaboration && (s.storage.collaboration.isDisabled = !0)
                }
            })
        }
          , c = k({
            preserveWhitespace: "full"
        }, t.parseOptions);
        if (!t.errorOnInvalidContent && !s.options.enableContentCheck && s.options.emitContentError)
            try {
                St(e, s.schema, {
                    parseOptions: c,
                    errorOnInvalidContent: !0
                })
            } catch (g) {
                a(g)
            }
        try {
            l = St(e, s.schema, {
                parseOptions: c,
                errorOnInvalidContent: (o = t.errorOnInvalidContent) !== null && o !== void 0 ? o : s.options.enableContentCheck
            })
        } catch (g) {
            return a(g),
            !1
        }
        let {from: d, to: f} = typeof r == "number" ? {
            from: r,
            to: r
        } : {
            from: r.from,
            to: r.to
        }
          , u = !0
          , h = !0;
        if ((sd(l) ? l : [l]).forEach(g => {
            g.check(),
            u = u ? g.isText && g.marks.length === 0 : !1,
            h = h ? g.isBlock : !1
        }
        ),
        d === f && h) {
            const {parent: g} = n.doc.resolve(d);
            g.isTextblock && !g.type.spec.code && !g.childCount && (d -= 1,
            f += 1)
        }
        let m;
        if (u) {
            if (Array.isArray(e))
                m = e.map(g => g.text || "").join("");
            else if (e instanceof b) {
                let g = "";
                e.forEach(y => {
                    y.text && (g += y.text)
                }
                ),
                m = g
            } else
                typeof e == "object" && e && e.text ? m = e.text : m = e;
            n.insertText(m, d, f)
        } else
            m = l,
            n.replaceWith(d, f, m);
        t.updateSelection && id(n, n.steps.length - 1, -1),
        t.applyInputRules && n.setMeta("applyInputRules", {
            from: d,
            text: m
        }),
        t.applyPasteRules && n.setMeta("applyPasteRules", {
            from: d,
            text: m
        })
    }
    return !0
}
  , ld = () => ({state: r, dispatch: e}) => lc(r, e)
  , ad = () => ({state: r, dispatch: e}) => ac(r, e)
  , cd = () => ({state: r, dispatch: e}) => Js(r, e)
  , dd = () => ({state: r, dispatch: e}) => _s(r, e)
  , fd = () => ({state: r, dispatch: e, tr: t}) => {
    try {
        const n = Zt(r.doc, r.selection.$from.pos, -1);
        return n == null ? !1 : (t.join(n, 2),
        e && e(t),
        !0)
    } catch (n) {
        return !1
    }
}
  , ud = () => ({state: r, dispatch: e, tr: t}) => {
    try {
        const n = Zt(r.doc, r.selection.$from.pos, 1);
        return n == null ? !1 : (t.join(n, 2),
        e && e(t),
        !0)
    } catch (n) {
        return !1
    }
}
  , hd = () => ({state: r, dispatch: e}) => sc(r, e)
  , pd = () => ({state: r, dispatch: e}) => oc(r, e);
function fo() {
    return typeof navigator != "undefined" ? /Mac/.test(navigator.platform) : !1
}
function md(r) {
    const e = r.split(/-(?!$)/);
    let t = e[e.length - 1];
    t === "Space" && (t = " ");
    let n, i, s, o;
    for (let l = 0; l < e.length - 1; l += 1) {
        const a = e[l];
        if (/^(cmd|meta|m)$/i.test(a))
            o = !0;
        else if (/^a(lt)?$/i.test(a))
            n = !0;
        else if (/^(c|ctrl|control)$/i.test(a))
            i = !0;
        else if (/^s(hift)?$/i.test(a))
            s = !0;
        else if (/^mod$/i.test(a))
            cn() || fo() ? o = !0 : i = !0;
        else
            throw new Error(`Unrecognized modifier name: ${a}`)
    }
    return n && (t = `Alt-${t}`),
    i && (t = `Ctrl-${t}`),
    o && (t = `Meta-${t}`),
    s && (t = `Shift-${t}`),
    t
}
const gd = r => ({editor: e, view: t, tr: n, dispatch: i}) => {
    const s = md(r).split(/-(?!$)/)
      , o = s.find(c => !["Alt", "Ctrl", "Meta", "Shift"].includes(c))
      , l = new KeyboardEvent("keydown",{
        key: o === "Space" ? " " : o,
        altKey: s.includes("Alt"),
        ctrlKey: s.includes("Ctrl"),
        metaKey: s.includes("Meta"),
        shiftKey: s.includes("Shift"),
        bubbles: !0,
        cancelable: !0
    })
      , a = e.captureTransaction( () => {
        t.someProp("handleKeyDown", c => c(t, l))
    }
    );
    return a == null || a.steps.forEach(c => {
        const d = c.map(n.mapping);
        d && i && n.maybeStep(d)
    }
    ),
    !0
}
;
function Mt(r, e, t={}) {
    const {from: n, to: i, empty: s} = r.selection
      , o = e ? V(e, r.schema) : null
      , l = [];
    r.doc.nodesBetween(n, i, (f, u) => {
        if (f.isText)
            return;
        const h = Math.max(n, u)
          , p = Math.min(i, u + f.nodeSize);
        l.push({
            node: f,
            from: h,
            to: p
        })
    }
    );
    const a = i - n
      , c = l.filter(f => o ? o.name === f.node.type.name : !0).filter(f => _t(f.node.attrs, t, {
        strict: !1
    }));
    return s ? !!c.length : c.reduce( (f, u) => f + u.to - u.from, 0) >= a
}
const yd = (r, e={}) => ({state: t, dispatch: n}) => {
    const i = V(r, t.schema);
    return Mt(t, i, e) ? cc(t, n) : !1
}
  , bd = () => ({state: r, dispatch: e}) => Zs(r, e)
  , kd = r => ({state: e, dispatch: t}) => {
    const n = V(r, e.schema);
    return Sc(n)(e, t)
}
  , xd = () => ({state: r, dispatch: e}) => Ys(r, e);
function dn(r, e) {
    return e.nodes[r] ? "node" : e.marks[r] ? "mark" : null
}
function Ci(r, e) {
    const t = typeof e == "string" ? [e] : e;
    return Object.keys(r).reduce( (n, i) => (t.includes(i) || (n[i] = r[i]),
    n), {})
}
const Sd = (r, e) => ({tr: t, state: n, dispatch: i}) => {
    let s = null
      , o = null;
    const l = dn(typeof r == "string" ? r : r.name, n.schema);
    return l ? (l === "node" && (s = V(r, n.schema)),
    l === "mark" && (o = ve(r, n.schema)),
    i && t.selection.ranges.forEach(a => {
        n.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, d) => {
            s && s === c.type && t.setNodeMarkup(d, void 0, Ci(c.attrs, e)),
            o && c.marks.length && c.marks.forEach(f => {
                o === f.type && t.addMark(d, d + c.nodeSize, o.create(Ci(f.attrs, e)))
            }
            )
        }
        )
    }
    ),
    !0) : !1
}
  , Md = () => ({tr: r, dispatch: e}) => (e && r.scrollIntoView(),
!0)
  , Cd = () => ({tr: r, dispatch: e}) => {
    if (e) {
        const t = new Q(r.doc);
        r.setSelection(t)
    }
    return !0
}
  , wd = () => ({state: r, dispatch: e}) => Ks(r, e)
  , Od = () => ({state: r, dispatch: e}) => Gs(r, e)
  , Td = () => ({state: r, dispatch: e}) => hc(r, e)
  , Nd = () => ({state: r, dispatch: e}) => gc(r, e)
  , Ed = () => ({state: r, dispatch: e}) => mc(r, e);
function Kn(r, e, t={}, n={}) {
    return St(r, e, {
        slice: !1,
        parseOptions: t,
        errorOnInvalidContent: n.errorOnInvalidContent
    })
}
const Dd = (r, e=!1, t={}, n={}) => ({editor: i, tr: s, dispatch: o, commands: l}) => {
    var a, c;
    const {doc: d} = s;
    if (t.preserveWhitespace !== "full") {
        const f = Kn(r, i.schema, t, {
            errorOnInvalidContent: (a = n.errorOnInvalidContent) !== null && a !== void 0 ? a : i.options.enableContentCheck
        });
        return o && s.replaceWith(0, d.content.size, f).setMeta("preventUpdate", !e),
        !0
    }
    return o && s.setMeta("preventUpdate", !e),
    l.insertContentAt({
        from: 0,
        to: d.content.size
    }, r, {
        parseOptions: t,
        errorOnInvalidContent: (c = n.errorOnInvalidContent) !== null && c !== void 0 ? c : i.options.enableContentCheck
    })
}
;
function uo(r, e) {
    const t = ve(e, r.schema)
      , {from: n, to: i, empty: s} = r.selection
      , o = [];
    s ? (r.storedMarks && o.push(...r.storedMarks),
    o.push(...r.selection.$head.marks())) : r.doc.nodesBetween(n, i, a => {
        o.push(...a.marks)
    }
    );
    const l = o.find(a => a.type.name === t.name);
    return l ? k({}, l.attrs) : {}
}
function Tf(r, e) {
    const t = new ss(r);
    return e.forEach(n => {
        n.steps.forEach(i => {
            t.step(i)
        }
        )
    }
    ),
    t
}
function Ad(r) {
    for (let e = 0; e < r.edgeCount; e += 1) {
        const {type: t} = r.edge(e);
        if (t.isTextblock && !t.hasRequiredAttrs())
            return t
    }
    return null
}
function Nf(r, e, t) {
    const n = [];
    return r.nodesBetween(e.from, e.to, (i, s) => {
        t(i) && n.push({
            node: i,
            pos: s
        })
    }
    ),
    n
}
function Id(r, e) {
    for (let t = r.depth; t > 0; t -= 1) {
        const n = r.node(t);
        if (e(n))
            return {
                pos: t > 0 ? r.before(t) : 0,
                start: r.start(t),
                depth: t,
                node: n
            }
    }
}
function gr(r) {
    return e => Id(e.$from, r)
}
function vd(r, e) {
    const t = {
        from: 0,
        to: r.content.size
    };
    return ro(r, t, e)
}
function Rd(r, e) {
    const t = V(e, r.schema)
      , {from: n, to: i} = r.selection
      , s = [];
    r.doc.nodesBetween(n, i, l => {
        s.push(l)
    }
    );
    const o = s.reverse().find(l => l.type.name === t.name);
    return o ? k({}, o.attrs) : {}
}
function Pd(r, e) {
    const t = dn(typeof e == "string" ? e : e.name, r.schema);
    return t === "node" ? Rd(r, e) : t === "mark" ? uo(r, e) : {}
}
function Bd(r, e=JSON.stringify) {
    const t = {};
    return r.filter(n => {
        const i = e(n);
        return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0
    }
    )
}
function zd(r) {
    const e = Bd(r);
    return e.length === 1 ? e : e.filter( (t, n) => !e.filter( (s, o) => o !== n).some(s => t.oldRange.from >= s.oldRange.from && t.oldRange.to <= s.oldRange.to && t.newRange.from >= s.newRange.from && t.newRange.to <= s.newRange.to))
}
function Ef(r) {
    const {mapping: e, steps: t} = r
      , n = [];
    return e.maps.forEach( (i, s) => {
        const o = [];
        if (i.ranges.length)
            i.forEach( (l, a) => {
                o.push({
                    from: l,
                    to: a
                })
            }
            );
        else {
            const {from: l, to: a} = t[s];
            if (l === void 0 || a === void 0)
                return;
            o.push({
                from: l,
                to: a
            })
        }
        o.forEach( ({from: l, to: a}) => {
            const c = e.slice(s).map(l, -1)
              , d = e.slice(s).map(a)
              , f = e.invert().map(c, -1)
              , u = e.invert().map(d);
            n.push({
                oldRange: {
                    from: f,
                    to: u
                },
                newRange: {
                    from: c,
                    to: d
                }
            })
        }
        )
    }
    ),
    zd(n)
}
function ho(r, e, t) {
    const n = [];
    return r === e ? t.resolve(r).marks().forEach(i => {
        const s = t.resolve(r)
          , o = mr(s, i.type);
        o && n.push(k({
            mark: i
        }, o))
    }
    ) : t.nodesBetween(r, e, (i, s) => {
        !i || (i == null ? void 0 : i.nodeSize) === void 0 || n.push(...i.marks.map(o => ({
            from: s,
            to: s + i.nodeSize,
            mark: o
        })))
    }
    ),
    n
}
function Bt(r, e, t) {
    return Object.fromEntries(Object.entries(t).filter( ([n]) => {
        const i = r.find(s => s.type === e && s.name === n);
        return i ? i.attribute.keepOnSplit : !1
    }
    ))
}
function Un(r, e, t={}) {
    const {empty: n, ranges: i} = r.selection
      , s = e ? ve(e, r.schema) : null;
    if (n)
        return !!(r.storedMarks || r.selection.$from.marks()).filter(f => s ? s.name === f.type.name : !0).find(f => _t(f.attrs, t, {
            strict: !1
        }));
    let o = 0;
    const l = [];
    if (i.forEach( ({$from: f, $to: u}) => {
        const h = f.pos
          , p = u.pos;
        r.doc.nodesBetween(h, p, (m, g) => {
            if (!m.isText && !m.marks.length)
                return;
            const y = Math.max(h, g)
              , C = Math.min(p, g + m.nodeSize)
              , O = C - y;
            o += O,
            l.push(...m.marks.map(A => ({
                mark: A,
                from: y,
                to: C
            })))
        }
        )
    }
    ),
    o === 0)
        return !1;
    const a = l.filter(f => s ? s.name === f.mark.type.name : !0).filter(f => _t(f.mark.attrs, t, {
        strict: !1
    })).reduce( (f, u) => f + u.to - u.from, 0)
      , c = l.filter(f => s ? f.mark.type !== s && f.mark.type.excludes(s) : !0).reduce( (f, u) => f + u.to - u.from, 0);
    return (a > 0 ? a + c : a) >= o
}
function Fd(r, e, t={}) {
    if (!e)
        return Mt(r, null, t) || Un(r, null, t);
    const n = dn(e, r.schema);
    return n === "node" ? Mt(r, e, t) : n === "mark" ? Un(r, e, t) : !1
}
function wi(r, e) {
    const {nodeExtensions: t} = ln(e)
      , n = t.find(o => o.name === r);
    if (!n)
        return !1;
    const i = {
        name: n.name,
        options: n.options,
        storage: n.storage
    }
      , s = N(S(n, "group", i));
    return typeof s != "string" ? !1 : s.split(" ").includes("list")
}
function yr(r, {checkChildren: e=!0, ignoreWhitespace: t=!1}={}) {
    var n;
    if (t) {
        if (r.type.name === "hardBreak")
            return !0;
        if (r.isText)
            return /^\s*$/m.test((n = r.text) !== null && n !== void 0 ? n : "")
    }
    if (r.isText)
        return !r.text;
    if (r.isAtom || r.isLeaf)
        return !1;
    if (r.content.childCount === 0)
        return !0;
    if (e) {
        let i = !0;
        return r.content.forEach(s => {
            i !== !1 && (yr(s, {
                ignoreWhitespace: t,
                checkChildren: e
            }) || (i = !1))
        }
        ),
        i
    }
    return !1
}
function Df(r) {
    return r instanceof M
}
function Af(r, e, t) {
    const i = r.state.doc.content.size
      , s = he(e, 0, i)
      , o = he(t, 0, i)
      , l = r.coordsAtPos(s)
      , a = r.coordsAtPos(o, -1)
      , c = Math.min(l.top, a.top)
      , d = Math.max(l.bottom, a.bottom)
      , f = Math.min(l.left, a.left)
      , u = Math.max(l.right, a.right)
      , h = u - f
      , p = d - c
      , y = {
        top: c,
        bottom: d,
        left: f,
        right: u,
        width: h,
        height: p,
        x: f,
        y: c
    };
    return B(k({}, y), {
        toJSON: () => y
    })
}
function Ld(r, e, t) {
    var n;
    const {selection: i} = e;
    let s = null;
    if (oo(i) && (s = i.$cursor),
    s) {
        const l = (n = r.storedMarks) !== null && n !== void 0 ? n : s.marks();
        return !!t.isInSet(l) || !l.some(a => a.type.excludes(t))
    }
    const {ranges: o} = i;
    return o.some( ({$from: l, $to: a}) => {
        let c = l.depth === 0 ? r.doc.inlineContent && r.doc.type.allowsMarkType(t) : !1;
        return r.doc.nodesBetween(l.pos, a.pos, (d, f, u) => {
            if (c)
                return !1;
            if (d.isInline) {
                const h = !u || u.type.allowsMarkType(t)
                  , p = !!t.isInSet(d.marks) || !d.marks.some(m => m.type.excludes(t));
                c = h && p
            }
            return !c
        }
        ),
        c
    }
    )
}
const Vd = (r, e={}) => ({tr: t, state: n, dispatch: i}) => {
    const {selection: s} = t
      , {empty: o, ranges: l} = s
      , a = ve(r, n.schema);
    if (i)
        if (o) {
            const c = uo(n, a);
            t.addStoredMark(a.create(k(k({}, c), e)))
        } else
            l.forEach(c => {
                const d = c.$from.pos
                  , f = c.$to.pos;
                n.doc.nodesBetween(d, f, (u, h) => {
                    const p = Math.max(h, d)
                      , m = Math.min(h + u.nodeSize, f);
                    u.marks.find(y => y.type === a) ? u.marks.forEach(y => {
                        a === y.type && t.addMark(p, m, a.create(k(k({}, y.attrs), e)))
                    }
                    ) : t.addMark(p, m, a.create(e))
                }
                )
            }
            );
    return Ld(n, t, a)
}
  , $d = (r, e) => ({tr: t}) => (t.setMeta(r, e),
!0)
  , Wd = (r, e={}) => ({state: t, dispatch: n, chain: i}) => {
    const s = V(r, t.schema);
    let o;
    return t.selection.$anchor.sameParent(t.selection.$head) && (o = t.selection.$anchor.parent.attrs),
    s.isTextblock ? i().command( ({commands: l}) => bi(s, k(k({}, o), e))(t) ? !0 : l.clearNodes()).command( ({state: l}) => bi(s, k(k({}, o), e))(l, n)).run() : !1
}
  , Hd = r => ({tr: e, dispatch: t}) => {
    if (t) {
        const {doc: n} = e
          , i = he(r, 0, n.content.size)
          , s = M.create(n, i);
        e.setSelection(s)
    }
    return !0
}
  , jd = r => ({tr: e, dispatch: t}) => {
    if (t) {
        const {doc: n} = e
          , {from: i, to: s} = typeof r == "number" ? {
            from: r,
            to: r
        } : r
          , o = T.atStart(n).from
          , l = T.atEnd(n).to
          , a = he(i, o, l)
          , c = he(s, o, l)
          , d = T.create(n, a, c);
        e.setSelection(d)
    }
    return !0
}
  , Jd = r => ({state: e, dispatch: t}) => {
    const n = V(r, e.schema);
    return wc(n)(e, t)
}
;
function Oi(r, e) {
    const t = r.storedMarks || r.selection.$to.parentOffset && r.selection.$from.marks();
    if (t) {
        const n = t.filter(i => e == null ? void 0 : e.includes(i.type.name));
        r.tr.ensureMarks(n)
    }
}
const qd = ({keepMarks: r=!0}={}) => ({tr: e, state: t, dispatch: n, editor: i}) => {
    const {selection: s, doc: o} = e
      , {$from: l, $to: a} = s
      , c = i.extensionManager.attributes
      , d = Bt(c, l.node().type.name, l.node().attrs);
    if (s instanceof M && s.node.isBlock)
        return !l.parentOffset || !pe(o, l.pos) ? !1 : (n && (r && Oi(t, i.extensionManager.splittableMarks),
        e.split(l.pos).scrollIntoView()),
        !0);
    if (!l.parent.isBlock)
        return !1;
    const f = a.parentOffset === a.parent.content.size
      , u = l.depth === 0 ? void 0 : Ad(l.node(-1).contentMatchAt(l.indexAfter(-1)));
    let h = f && u ? [{
        type: u,
        attrs: d
    }] : void 0
      , p = pe(e.doc, e.mapping.map(l.pos), 1, h);
    if (!h && !p && pe(e.doc, e.mapping.map(l.pos), 1, u ? [{
        type: u
    }] : void 0) && (p = !0,
    h = u ? [{
        type: u,
        attrs: d
    }] : void 0),
    n) {
        if (p && (s instanceof T && e.deleteSelection(),
        e.split(e.mapping.map(l.pos), 1, h),
        u && !f && !l.parentOffset && l.parent.type !== u)) {
            const m = e.mapping.map(l.before())
              , g = e.doc.resolve(m);
            l.node(-1).canReplaceWith(g.index(), g.index() + 1, u) && e.setNodeMarkup(e.mapping.map(l.before()), u)
        }
        r && Oi(t, i.extensionManager.splittableMarks),
        e.scrollIntoView()
    }
    return p
}
  , Kd = (r, e={}) => ({tr: t, state: n, dispatch: i, editor: s}) => {
    var o;
    const l = V(r, n.schema)
      , {$from: a, $to: c} = n.selection
      , d = n.selection.node;
    if (d && d.isBlock || a.depth < 2 || !a.sameParent(c))
        return !1;
    const f = a.node(-1);
    if (f.type !== l)
        return !1;
    const u = s.extensionManager.attributes;
    if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
        if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
            return !1;
        if (i) {
            let y = b.empty;
            const C = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
            for (let w = a.depth - C; w >= a.depth - 3; w -= 1)
                y = b.from(a.node(w).copy(y));
            const O = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3
              , A = k(k({}, Bt(u, a.node().type.name, a.node().attrs)), e)
              , D = ((o = l.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(A)) || void 0;
            y = y.append(b.from(l.createAndFill(null, D) || void 0));
            const P = a.before(a.depth - (C - 1));
            t.replace(P, a.after(-O), new x(y,4 - C,0));
            let K = -1;
            t.doc.nodesBetween(P, t.doc.content.size, (w, v) => {
                if (K > -1)
                    return !1;
                w.isTextblock && w.content.size === 0 && (K = v + 1)
            }
            ),
            K > -1 && t.setSelection(T.near(t.doc.resolve(K))),
            t.scrollIntoView()
        }
        return !0
    }
    const h = c.pos === a.end() ? f.contentMatchAt(0).defaultType : null
      , p = k(k({}, Bt(u, f.type.name, f.attrs)), e)
      , m = k(k({}, Bt(u, a.node().type.name, a.node().attrs)), e);
    t.delete(a.pos, c.pos);
    const g = h ? [{
        type: l,
        attrs: p
    }, {
        type: h,
        attrs: m
    }] : [{
        type: l,
        attrs: p
    }];
    if (!pe(t.doc, a.pos, 2))
        return !1;
    if (i) {
        const {selection: y, storedMarks: C} = n
          , {splittableMarks: O} = s.extensionManager
          , A = C || y.$to.parentOffset && y.$from.marks();
        if (t.split(a.pos, 2, g).scrollIntoView(),
        !A || !i)
            return !0;
        const D = A.filter(P => O.includes(P.type.name));
        t.ensureMarks(D)
    }
    return !0
}
  , Nn = (r, e) => {
    const t = gr(o => o.type === e)(r.selection);
    if (!t)
        return !0;
    const n = r.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
    if (n === void 0)
        return !0;
    const i = r.doc.nodeAt(n);
    return t.node.type === (i == null ? void 0 : i.type) && De(r.doc, t.pos) && r.join(t.pos),
    !0
}
  , En = (r, e) => {
    const t = gr(o => o.type === e)(r.selection);
    if (!t)
        return !0;
    const n = r.doc.resolve(t.start).after(t.depth);
    if (n === void 0)
        return !0;
    const i = r.doc.nodeAt(n);
    return t.node.type === (i == null ? void 0 : i.type) && De(r.doc, n) && r.join(n),
    !0
}
  , Ud = (r, e, t, n={}) => ({editor: i, tr: s, state: o, dispatch: l, chain: a, commands: c, can: d}) => {
    const {extensions: f, splittableMarks: u} = i.extensionManager
      , h = V(r, o.schema)
      , p = V(e, o.schema)
      , {selection: m, storedMarks: g} = o
      , {$from: y, $to: C} = m
      , O = y.blockRange(C)
      , A = g || m.$to.parentOffset && m.$from.marks();
    if (!O)
        return !1;
    const D = gr(P => wi(P.type.name, f))(m);
    if (O.depth >= 1 && D && O.depth - D.depth <= 1) {
        if (D.node.type === h)
            return c.liftListItem(p);
        if (wi(D.node.type.name, f) && h.validContent(D.node.content) && l)
            return a().command( () => (s.setNodeMarkup(D.pos, h),
            !0)).command( () => Nn(s, h)).command( () => En(s, h)).run()
    }
    return !t || !A || !l ? a().command( () => d().wrapInList(h, n) ? !0 : c.clearNodes()).wrapInList(h, n).command( () => Nn(s, h)).command( () => En(s, h)).run() : a().command( () => {
        const P = d().wrapInList(h, n)
          , K = A.filter(w => u.includes(w.type.name));
        return s.ensureMarks(K),
        P ? !0 : c.clearNodes()
    }
    ).wrapInList(h, n).command( () => Nn(s, h)).command( () => En(s, h)).run()
}
  , _d = (r, e={}, t={}) => ({state: n, commands: i}) => {
    const {extendEmptyMarkRange: s=!1} = t
      , o = ve(r, n.schema);
    return Un(n, o, e) ? i.unsetMark(o, {
        extendEmptyMarkRange: s
    }) : i.setMark(o, e)
}
  , Gd = (r, e, t={}) => ({state: n, commands: i}) => {
    const s = V(r, n.schema)
      , o = V(e, n.schema)
      , l = Mt(n, s, t);
    let a;
    return n.selection.$anchor.sameParent(n.selection.$head) && (a = n.selection.$anchor.parent.attrs),
    l ? i.setNode(o, a) : i.setNode(s, k(k({}, a), t))
}
  , Yd = (r, e={}) => ({state: t, commands: n}) => {
    const i = V(r, t.schema);
    return Mt(t, i, e) ? n.lift(i) : n.wrapIn(i, e)
}
  , Xd = () => ({state: r, dispatch: e}) => {
    const t = r.plugins;
    for (let n = 0; n < t.length; n += 1) {
        const i = t[n];
        let s;
        if (i.spec.isInputRules && (s = i.getState(r))) {
            if (e) {
                const o = r.tr
                  , l = s.transform;
                for (let a = l.steps.length - 1; a >= 0; a -= 1)
                    o.step(l.steps[a].invert(l.docs[a]));
                if (s.text) {
                    const a = o.doc.resolve(s.from).marks();
                    o.replaceWith(s.from, s.to, r.schema.text(s.text, a))
                } else
                    o.delete(s.from, s.to)
            }
            return !0
        }
    }
    return !1
}
  , Zd = () => ({tr: r, dispatch: e}) => {
    const {selection: t} = r
      , {empty: n, ranges: i} = t;
    return n || e && i.forEach(s => {
        r.removeMark(s.$from.pos, s.$to.pos)
    }
    ),
    !0
}
  , Qd = (r, e={}) => ({tr: t, state: n, dispatch: i}) => {
    var s;
    const {extendEmptyMarkRange: o=!1} = e
      , {selection: l} = t
      , a = ve(r, n.schema)
      , {$from: c, empty: d, ranges: f} = l;
    if (!i)
        return !0;
    if (d && o) {
        let {from: u, to: h} = l;
        const p = (s = c.marks().find(g => g.type === a)) === null || s === void 0 ? void 0 : s.attrs
          , m = mr(c, a, p);
        m && (u = m.from,
        h = m.to),
        t.removeMark(u, h, a)
    } else
        f.forEach(u => {
            t.removeMark(u.$from.pos, u.$to.pos, a)
        }
        );
    return t.removeStoredMark(a),
    !0
}
  , ef = (r, e={}) => ({tr: t, state: n, dispatch: i}) => {
    let s = null
      , o = null;
    const l = dn(typeof r == "string" ? r : r.name, n.schema);
    return l ? (l === "node" && (s = V(r, n.schema)),
    l === "mark" && (o = ve(r, n.schema)),
    i && t.selection.ranges.forEach(a => {
        const c = a.$from.pos
          , d = a.$to.pos;
        let f, u, h, p;
        t.selection.empty ? n.doc.nodesBetween(c, d, (m, g) => {
            s && s === m.type && (h = Math.max(g, c),
            p = Math.min(g + m.nodeSize, d),
            f = g,
            u = m)
        }
        ) : n.doc.nodesBetween(c, d, (m, g) => {
            g < c && s && s === m.type && (h = Math.max(g, c),
            p = Math.min(g + m.nodeSize, d),
            f = g,
            u = m),
            g >= c && g <= d && (s && s === m.type && t.setNodeMarkup(g, void 0, k(k({}, m.attrs), e)),
            o && m.marks.length && m.marks.forEach(y => {
                if (o === y.type) {
                    const C = Math.max(g, c)
                      , O = Math.min(g + m.nodeSize, d);
                    t.addMark(C, O, o.create(k(k({}, y.attrs), e)))
                }
            }
            ))
        }
        ),
        u && (f !== void 0 && t.setNodeMarkup(f, void 0, k(k({}, u.attrs), e)),
        o && u.marks.length && u.marks.forEach(m => {
            o === m.type && t.addMark(h, p, o.create(k(k({}, m.attrs), e)))
        }
        ))
    }
    ),
    !0) : !1
}
  , tf = (r, e={}) => ({state: t, dispatch: n}) => {
    const i = V(r, t.schema);
    return yc(i, e)(t, n)
}
  , nf = (r, e={}) => ({state: t, dispatch: n}) => {
    const i = V(r, t.schema);
    return bc(i, e)(t, n)
}
;
var rf = Object.freeze({
    __proto__: null,
    blur: Wc,
    clearContent: Hc,
    clearNodes: jc,
    command: Jc,
    createParagraphNear: qc,
    cut: Kc,
    deleteCurrentNode: Uc,
    deleteNode: _c,
    deleteRange: Gc,
    deleteSelection: Yc,
    enter: Xc,
    exitCode: Zc,
    extendMarkRange: Qc,
    first: ed,
    focus: td,
    forEach: nd,
    insertContent: rd,
    insertContentAt: od,
    joinBackward: cd,
    joinDown: ad,
    joinForward: dd,
    joinItemBackward: fd,
    joinItemForward: ud,
    joinTextblockBackward: hd,
    joinTextblockForward: pd,
    joinUp: ld,
    keyboardShortcut: gd,
    lift: yd,
    liftEmptyBlock: bd,
    liftListItem: kd,
    newlineInCode: xd,
    resetAttributes: Sd,
    scrollIntoView: Md,
    selectAll: Cd,
    selectNodeBackward: wd,
    selectNodeForward: Od,
    selectParentNode: Td,
    selectTextblockEnd: Nd,
    selectTextblockStart: Ed,
    setContent: Dd,
    setMark: Vd,
    setMeta: $d,
    setNode: Wd,
    setNodeSelection: Hd,
    setTextSelection: jd,
    sinkListItem: Jd,
    splitBlock: qd,
    splitListItem: Kd,
    toggleList: Ud,
    toggleMark: _d,
    toggleNode: Gd,
    toggleWrap: Yd,
    undoInputRule: Xd,
    unsetAllMarks: Zd,
    unsetMark: Qd,
    updateAttributes: ef,
    wrapIn: tf,
    wrapInList: nf
});
const sf = se.create({
    name: "commands",
    addCommands() {
        return k({}, rf)
    }
})
  , of = se.create({
    name: "drop",
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("tiptapDrop"),
            props: {
                handleDrop: (r, e, t, n) => {
                    this.editor.emit("drop", {
                        editor: this.editor,
                        event: e,
                        slice: t,
                        moved: n
                    })
                }
            }
        })]
    }
})
  , lf = se.create({
    name: "editable",
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("editable"),
            props: {
                editable: () => this.editor.options.editable
            }
        })]
    }
})
  , af = new Ue("focusEvents")
  , cf = se.create({
    name: "focusEvents",
    addProseMirrorPlugins() {
        const {editor: r} = this;
        return [new ce({
            key: af,
            props: {
                handleDOMEvents: {
                    focus: (e, t) => {
                        r.isFocused = !0;
                        const n = r.state.tr.setMeta("focus", {
                            event: t
                        }).setMeta("addToHistory", !1);
                        return e.dispatch(n),
                        !1
                    }
                    ,
                    blur: (e, t) => {
                        r.isFocused = !1;
                        const n = r.state.tr.setMeta("blur", {
                            event: t
                        }).setMeta("addToHistory", !1);
                        return e.dispatch(n),
                        !1
                    }
                }
            }
        })]
    }
})
  , df = se.create({
    name: "keymap",
    addKeyboardShortcuts() {
        const r = () => this.editor.commands.first( ({commands: o}) => [ () => o.undoInputRule(), () => o.command( ({tr: l}) => {
            const {selection: a, doc: c} = l
              , {empty: d, $anchor: f} = a
              , {pos: u, parent: h} = f
              , p = f.parent.isTextblock && u > 0 ? l.doc.resolve(u - 1) : f
              , m = p.parent.type.spec.isolating
              , g = f.pos - f.parentOffset
              , y = m && p.parent.childCount === 1 ? g === f.pos : E.atStart(c).from === u;
            return !d || !h.type.isTextblock || h.textContent.length || !y || y && f.parent.type.name === "paragraph" ? !1 : o.clearNodes()
        }
        ), () => o.deleteSelection(), () => o.joinBackward(), () => o.selectNodeBackward()])
          , e = () => this.editor.commands.first( ({commands: o}) => [ () => o.deleteSelection(), () => o.deleteCurrentNode(), () => o.joinForward(), () => o.selectNodeForward()])
          , n = {
            Enter: () => this.editor.commands.first( ({commands: o}) => [ () => o.newlineInCode(), () => o.createParagraphNear(), () => o.liftEmptyBlock(), () => o.splitBlock()]),
            "Mod-Enter": () => this.editor.commands.exitCode(),
            Backspace: r,
            "Mod-Backspace": r,
            "Shift-Backspace": r,
            Delete: e,
            "Mod-Delete": e,
            "Mod-a": () => this.editor.commands.selectAll()
        }
          , i = k({}, n)
          , s = B(k({}, n), {
            "Ctrl-h": r,
            "Alt-Backspace": r,
            "Ctrl-d": e,
            "Ctrl-Alt-Backspace": e,
            "Alt-Delete": e,
            "Alt-d": e,
            "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
            "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
        });
        return cn() || fo() ? s : i
    },
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("clearDocument"),
            appendTransaction: (r, e, t) => {
                if (r.some(m => m.getMeta("composition")))
                    return;
                const n = r.some(m => m.docChanged) && !e.doc.eq(t.doc)
                  , i = r.some(m => m.getMeta("preventClearDocument"));
                if (!n || i)
                    return;
                const {empty: s, from: o, to: l} = e.selection
                  , a = E.atStart(e.doc).from
                  , c = E.atEnd(e.doc).to;
                if (s || !(o === a && l === c) || !yr(t.doc))
                    return;
                const u = t.tr
                  , h = sn({
                    state: t,
                    transaction: u
                })
                  , {commands: p} = new on({
                    editor: this.editor,
                    state: h
                });
                if (p.clearNodes(),
                !!u.steps.length)
                    return u
            }
        })]
    }
})
  , ff = se.create({
    name: "paste",
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("tiptapPaste"),
            props: {
                handlePaste: (r, e, t) => {
                    this.editor.emit("paste", {
                        editor: this.editor,
                        event: e,
                        slice: t
                    })
                }
            }
        })]
    }
})
  , uf = se.create({
    name: "tabindex",
    addProseMirrorPlugins() {
        return [new ce({
            key: new Ue("tabindex"),
            props: {
                attributes: () => this.editor.isEditable ? {
                    tabindex: "0"
                } : {}
            }
        })]
    }
});
class Pe {
    get name() {
        return this.node.type.name
    }
    constructor(e, t, n=!1, i=null) {
        this.currentNode = null,
        this.actualDepth = null,
        this.isBlock = n,
        this.resolvedPos = e,
        this.editor = t,
        this.currentNode = i
    }
    get node() {
        return this.currentNode || this.resolvedPos.node()
    }
    get element() {
        return this.editor.view.domAtPos(this.pos).node
    }
    get depth() {
        var e;
        return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth
    }
    get pos() {
        return this.resolvedPos.pos
    }
    get content() {
        return this.node.content
    }
    set content(e) {
        let t = this.from
          , n = this.to;
        if (this.isBlock) {
            if (this.content.size === 0)
                return;
            t = this.from + 1,
            n = this.to - 1
        }
        this.editor.commands.insertContentAt({
            from: t,
            to: n
        }, e)
    }
    get attributes() {
        return this.node.attrs
    }
    get textContent() {
        return this.node.textContent
    }
    get size() {
        return this.node.nodeSize
    }
    get from() {
        return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth)
    }
    get range() {
        return {
            from: this.from,
            to: this.to
        }
    }
    get to() {
        return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1)
    }
    get parent() {
        if (this.depth === 0)
            return null;
        const e = this.resolvedPos.start(this.resolvedPos.depth - 1)
          , t = this.resolvedPos.doc.resolve(e);
        return new Pe(t,this.editor)
    }
    get before() {
        let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
        return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)),
        new Pe(e,this.editor)
    }
    get after() {
        let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
        return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)),
        new Pe(e,this.editor)
    }
    get children() {
        const e = [];
        return this.node.content.forEach( (t, n) => {
            const i = t.isBlock && !t.isTextblock
              , s = t.isAtom && !t.isText
              , o = this.pos + n + (s ? 0 : 1);
            if (o < 0 || o > this.resolvedPos.doc.nodeSize - 2)
                return;
            const l = this.resolvedPos.doc.resolve(o);
            if (!i && l.depth <= this.depth)
                return;
            const a = new Pe(l,this.editor,i,i ? t : null);
            i && (a.actualDepth = this.depth + 1),
            e.push(new Pe(l,this.editor,i,i ? t : null))
        }
        ),
        e
    }
    get firstChild() {
        return this.children[0] || null
    }
    get lastChild() {
        const e = this.children;
        return e[e.length - 1] || null
    }
    closest(e, t={}) {
        let n = null
          , i = this.parent;
        for (; i && !n; ) {
            if (i.node.type.name === e)
                if (Object.keys(t).length > 0) {
                    const s = i.node.attrs
                      , o = Object.keys(t);
                    for (let l = 0; l < o.length; l += 1) {
                        const a = o[l];
                        if (s[a] !== t[a])
                            break
                    }
                } else
                    n = i;
            i = i.parent
        }
        return n
    }
    querySelector(e, t={}) {
        return this.querySelectorAll(e, t, !0)[0] || null
    }
    querySelectorAll(e, t={}, n=!1) {
        let i = [];
        if (!this.children || this.children.length === 0)
            return i;
        const s = Object.keys(t);
        return this.children.forEach(o => {
            n && i.length > 0 || (o.node.type.name === e && s.every(a => t[a] === o.node.attrs[a]) && i.push(o),
            !(n && i.length > 0) && (i = i.concat(o.querySelectorAll(e, t, n))))
        }
        ),
        i
    }
    setAttribute(e) {
        const {tr: t} = this.editor.state;
        t.setNodeMarkup(this.from, void 0, k(k({}, this.node.attrs), e)),
        this.editor.view.dispatch(t)
    }
}
const hf = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function pf(r, e, t) {
    const n = document.querySelector("style[data-tiptap-style]");
    if (n !== null)
        return n;
    const i = document.createElement("style");
    return e && i.setAttribute("nonce", e),
    i.setAttribute("data-tiptap-style", ""),
    i.innerHTML = r,
    document.getElementsByTagName("head")[0].appendChild(i),
    i
}
let If = class extends Oc {
    constructor(e={}) {
        super(),
        this.isFocused = !1,
        this.isInitialized = !1,
        this.extensionStorage = {},
        this.options = {
            element: document.createElement("div"),
            content: "",
            injectCSS: !0,
            injectNonce: void 0,
            extensions: [],
            autofocus: !1,
            editable: !0,
            editorProps: {},
            parseOptions: {},
            coreExtensionOptions: {},
            enableInputRules: !0,
            enablePasteRules: !0,
            enableCoreExtensions: !0,
            enableContentCheck: !1,
            emitContentError: !1,
            onBeforeCreate: () => null,
            onCreate: () => null,
            onUpdate: () => null,
            onSelectionUpdate: () => null,
            onTransaction: () => null,
            onFocus: () => null,
            onBlur: () => null,
            onDestroy: () => null,
            onContentError: ({error: t}) => {
                throw t
            }
            ,
            onPaste: () => null,
            onDrop: () => null
        },
        this.isCapturingTransaction = !1,
        this.capturedTransaction = null,
        this.setOptions(e),
        this.createExtensionManager(),
        this.createCommandManager(),
        this.createSchema(),
        this.on("beforeCreate", this.options.onBeforeCreate),
        this.emit("beforeCreate", {
            editor: this
        }),
        this.on("contentError", this.options.onContentError),
        this.createView(),
        this.injectCSS(),
        this.on("create", this.options.onCreate),
        this.on("update", this.options.onUpdate),
        this.on("selectionUpdate", this.options.onSelectionUpdate),
        this.on("transaction", this.options.onTransaction),
        this.on("focus", this.options.onFocus),
        this.on("blur", this.options.onBlur),
        this.on("destroy", this.options.onDestroy),
        this.on("drop", ({event: t, slice: n, moved: i}) => this.options.onDrop(t, n, i)),
        this.on("paste", ({event: t, slice: n}) => this.options.onPaste(t, n)),
        window.setTimeout( () => {
            this.isDestroyed || (this.commands.focus(this.options.autofocus),
            this.emit("create", {
                editor: this
            }),
            this.isInitialized = !0)
        }
        , 0)
    }
    get storage() {
        return this.extensionStorage
    }
    get commands() {
        return this.commandManager.commands
    }
    chain() {
        return this.commandManager.chain()
    }
    can() {
        return this.commandManager.can()
    }
    injectCSS() {
        this.options.injectCSS && document && (this.css = pf(hf, this.options.injectNonce))
    }
    setOptions(e={}) {
        this.options = k(k({}, this.options), e),
        !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps),
        this.view.updateState(this.state))
    }
    setEditable(e, t=!0) {
        this.setOptions({
            editable: e
        }),
        t && this.emit("update", {
            editor: this,
            transaction: this.state.tr
        })
    }
    get isEditable() {
        return this.options.editable && this.view && this.view.editable
    }
    get state() {
        return this.view.state
    }
    registerPlugin(e, t) {
        const n = no(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e]
          , i = this.state.reconfigure({
            plugins: n
        });
        return this.view.updateState(i),
        i
    }
    unregisterPlugin(e) {
        if (this.isDestroyed)
            return;
        const t = this.state.plugins;
        let n = t;
        if ([].concat(e).forEach(s => {
            const o = typeof s == "string" ? `${s}$` : s.key;
            n = n.filter(l => !l.key.startsWith(o))
        }
        ),
        t.length === n.length)
            return;
        const i = this.state.reconfigure({
            plugins: n
        });
        return this.view.updateState(i),
        i
    }
    createExtensionManager() {
        var e, t;
        const i = [...this.options.enableCoreExtensions ? [lf, $c.configure({
            blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
        }), sf, cf, df, uf, of, ff].filter(s => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[s.name] !== !1 : !0) : [], ...this.options.extensions].filter(s => ["extension", "node", "mark"].includes(s == null ? void 0 : s.type));
        this.extensionManager = new Qe(i,this)
    }
    createCommandManager() {
        this.commandManager = new on({
            editor: this
        })
    }
    createSchema() {
        this.schema = this.extensionManager.schema
    }
    createView() {
        var e;
        let t;
        try {
            t = Kn(this.options.content, this.schema, this.options.parseOptions, {
                errorOnInvalidContent: this.options.enableContentCheck
            })
        } catch (o) {
            if (!(o instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(o.message))
                throw o;
            this.emit("contentError", {
                editor: this,
                error: o,
                disableCollaboration: () => {
                    this.storage.collaboration && (this.storage.collaboration.isDisabled = !0),
                    this.options.extensions = this.options.extensions.filter(l => l.name !== "collaboration"),
                    this.createExtensionManager()
                }
            }),
            t = Kn(this.options.content, this.schema, this.options.parseOptions, {
                errorOnInvalidContent: !1
            })
        }
        const n = lo(t, this.options.autofocus);
        this.view = new Hs(this.options.element,B(k({}, this.options.editorProps), {
            attributes: k({
                role: "textbox"
            }, (e = this.options.editorProps) === null || e === void 0 ? void 0 : e.attributes),
            dispatchTransaction: this.dispatchTransaction.bind(this),
            state: Ze.create({
                doc: t,
                selection: n || void 0
            })
        }));
        const i = this.state.reconfigure({
            plugins: this.extensionManager.plugins
        });
        this.view.updateState(i),
        this.createNodeViews(),
        this.prependClass();
        const s = this.view.dom;
        s.editor = this
    }
    createNodeViews() {
        this.view.isDestroyed || this.view.setProps({
            nodeViews: this.extensionManager.nodeViews
        })
    }
    prependClass() {
        this.view.dom.className = `tiptap ${this.view.dom.className}`
    }
    captureTransaction(e) {
        this.isCapturingTransaction = !0,
        e(),
        this.isCapturingTransaction = !1;
        const t = this.capturedTransaction;
        return this.capturedTransaction = null,
        t
    }
    dispatchTransaction(e) {
        if (this.view.isDestroyed)
            return;
        if (this.isCapturingTransaction) {
            if (!this.capturedTransaction) {
                this.capturedTransaction = e;
                return
            }
            e.steps.forEach(o => {
                var l;
                return (l = this.capturedTransaction) === null || l === void 0 ? void 0 : l.step(o)
            }
            );
            return
        }
        const t = this.state.apply(e)
          , n = !this.state.selection.eq(t.selection);
        this.emit("beforeTransaction", {
            editor: this,
            transaction: e,
            nextState: t
        }),
        this.view.updateState(t),
        this.emit("transaction", {
            editor: this,
            transaction: e
        }),
        n && this.emit("selectionUpdate", {
            editor: this,
            transaction: e
        });
        const i = e.getMeta("focus")
          , s = e.getMeta("blur");
        i && this.emit("focus", {
            editor: this,
            event: i.event,
            transaction: e
        }),
        s && this.emit("blur", {
            editor: this,
            event: s.event,
            transaction: e
        }),
        !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
            editor: this,
            transaction: e
        })
    }
    getAttributes(e) {
        return Pd(this.state, e)
    }
    isActive(e, t) {
        const n = typeof e == "string" ? e : null
          , i = typeof e == "string" ? t : e;
        return Fd(this.state, n, i)
    }
    getJSON() {
        return this.state.doc.toJSON()
    }
    getHTML() {
        return ur(this.state.doc.content, this.schema)
    }
    getText(e) {
        const {blockSeparator: t=`

`, textSerializers: n={}} = e || {};
        return vd(this.state.doc, {
            blockSeparator: t,
            textSerializers: k(k({}, io(this.schema)), n)
        })
    }
    get isEmpty() {
        return yr(this.state.doc)
    }
    getCharacterCount() {
        return this.state.doc.content.size - 2
    }
    destroy() {
        if (this.emit("destroy"),
        this.view) {
            const e = this.view.dom;
            e && e.editor && delete e.editor,
            this.view.destroy()
        }
        this.removeAllListeners()
    }
    get isDestroyed() {
        var e;
        return !(!((e = this.view) === null || e === void 0) && e.docView)
    }
    $node(e, t) {
        var n;
        return ((n = this.$doc) === null || n === void 0 ? void 0 : n.querySelector(e, t)) || null
    }
    $nodes(e, t) {
        var n;
        return ((n = this.$doc) === null || n === void 0 ? void 0 : n.querySelectorAll(e, t)) || null
    }
    $pos(e) {
        const t = this.state.doc.resolve(e);
        return new Pe(t,this)
    }
    get $doc() {
        return this.$pos(0)
    }
}
;
function Gt(r) {
    return new pr({
        find: r.find,
        handler: ({state: e, range: t, match: n}) => {
            const i = N(r.getAttributes, void 0, n);
            if (i === !1 || i === null)
                return null;
            const {tr: s} = e
              , o = n[n.length - 1]
              , l = n[0];
            if (o) {
                const a = l.search(/\S/)
                  , c = t.from + l.indexOf(o)
                  , d = c + o.length;
                if (ho(t.from, t.to, e.doc).filter(h => h.mark.type.excluded.find(m => m === r.type && m !== h.mark.type)).filter(h => h.to > c).length)
                    return null;
                d < t.to && s.delete(d, t.to),
                c > t.from && s.delete(t.from + a, c);
                const u = t.from + a + o.length;
                s.addMark(t.from + a, u, r.type.create(i || {})),
                s.removeStoredMark(r.type)
            }
        }
    })
}
function mf(r) {
    return new pr({
        find: r.find,
        handler: ({state: e, range: t, match: n}) => {
            const i = e.doc.resolve(t.from)
              , s = N(r.getAttributes, void 0, n) || {};
            if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), r.type))
                return null;
            e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, r.type, s)
        }
    })
}
function Ti(r) {
    return new pr({
        find: r.find,
        handler: ({state: e, range: t, match: n, chain: i}) => {
            const s = N(r.getAttributes, void 0, n) || {}
              , o = e.tr.delete(t.from, t.to)
              , a = o.doc.resolve(t.from).blockRange()
              , c = a && Yn(a, r.type, s);
            if (!c)
                return null;
            if (o.wrap(a, c),
            r.keepMarks && r.editor) {
                const {selection: f, storedMarks: u} = e
                  , {splittableMarks: h} = r.editor.extensionManager
                  , p = u || f.$to.parentOffset && f.$from.marks();
                if (p) {
                    const m = p.filter(g => h.includes(g.type.name));
                    o.ensureMarks(m)
                }
            }
            if (r.keepAttributes) {
                const f = r.type.name === "bulletList" || r.type.name === "orderedList" ? "listItem" : "taskList";
                i().updateAttributes(f, s).run()
            }
            const d = o.doc.resolve(t.from - 1).nodeBefore;
            d && d.type === r.type && De(o.doc, t.from - 1) && (!r.joinPredicate || r.joinPredicate(n, d)) && o.join(t.from - 1)
        }
    })
}
class ge {
    constructor(e={}) {
        this.type = "node",
        this.name = "node",
        this.parent = null,
        this.child = null,
        this.config = {
            name: this.name,
            defaultOptions: {}
        },
        this.config = k(k({}, this.config), e),
        this.name = this.config.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        this.options = this.config.defaultOptions,
        this.config.addOptions && (this.options = N(S(this, "addOptions", {
            name: this.name
        }))),
        this.storage = N(S(this, "addStorage", {
            name: this.name,
            options: this.options
        })) || {}
    }
    static create(e={}) {
        return new ge(e)
    }
    configure(e={}) {
        const t = this.extend(B(k({}, this.config), {
            addOptions: () => an(this.options, e)
        }));
        return t.name = this.name,
        t.parent = this.parent,
        t
    }
    extend(e={}) {
        const t = new ge(e);
        return t.parent = this,
        this.child = t,
        t.name = e.name ? e.name : t.parent.name,
        e.defaultOptions && Object.keys(e.defaultOptions).length > 0,
        t.options = N(S(t, "addOptions", {
            name: t.name
        })),
        t.storage = N(S(t, "addStorage", {
            name: t.name,
            options: t.options
        })),
        t
    }
}
class Rf {
    constructor(e, t, n) {
        this.isDragging = !1,
        this.component = e,
        this.editor = t.editor,
        this.options = k({
            stopEvent: null,
            ignoreMutation: null
        }, n),
        this.extension = t.extension,
        this.node = t.node,
        this.decorations = t.decorations,
        this.innerDecorations = t.innerDecorations,
        this.view = t.view,
        this.HTMLAttributes = t.HTMLAttributes,
        this.getPos = t.getPos,
        this.mount()
    }
    mount() {}
    get dom() {
        return this.editor.view.dom
    }
    get contentDOM() {
        return null
    }
    onDragStart(e) {
        var t, n, i, s, o, l, a;
        const {view: c} = this.editor
          , d = e.target
          , f = d.nodeType === 3 ? (t = d.parentElement) === null || t === void 0 ? void 0 : t.closest("[data-drag-handle]") : d.closest("[data-drag-handle]");
        if (!this.dom || !((n = this.contentDOM) === null || n === void 0) && n.contains(d) || !f)
            return;
        let u = 0
          , h = 0;
        if (this.dom !== f) {
            const C = this.dom.getBoundingClientRect()
              , O = f.getBoundingClientRect()
              , A = (i = e.offsetX) !== null && i !== void 0 ? i : (s = e.nativeEvent) === null || s === void 0 ? void 0 : s.offsetX
              , D = (o = e.offsetY) !== null && o !== void 0 ? o : (l = e.nativeEvent) === null || l === void 0 ? void 0 : l.offsetY;
            u = O.x - C.x + A,
            h = O.y - C.y + D
        }
        const p = this.dom.cloneNode(!0);
        (a = e.dataTransfer) === null || a === void 0 || a.setDragImage(p, u, h);
        const m = this.getPos();
        if (typeof m != "number")
            return;
        const g = M.create(c.state.doc, m)
          , y = c.state.tr.setSelection(g);
        c.dispatch(y)
    }
    stopEvent(e) {
        var t;
        if (!this.dom)
            return !1;
        if (typeof this.options.stopEvent == "function")
            return this.options.stopEvent({
                event: e
            });
        const n = e.target;
        if (!(this.dom.contains(n) && !(!((t = this.contentDOM) === null || t === void 0) && t.contains(n))))
            return !1;
        const s = e.type.startsWith("drag")
          , o = e.type === "drop";
        if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(n.tagName) || n.isContentEditable) && !o && !s)
            return !0;
        const {isEditable: a} = this.editor
          , {isDragging: c} = this
          , d = !!this.node.type.spec.draggable
          , f = M.isSelectable(this.node)
          , u = e.type === "copy"
          , h = e.type === "paste"
          , p = e.type === "cut"
          , m = e.type === "mousedown";
        if (!d && f && s && e.target === this.dom && e.preventDefault(),
        d && s && !c && e.target === this.dom)
            return e.preventDefault(),
            !1;
        if (d && a && !c && m) {
            const g = n.closest("[data-drag-handle]");
            g && (this.dom === g || this.dom.contains(g)) && (this.isDragging = !0,
            document.addEventListener("dragend", () => {
                this.isDragging = !1
            }
            , {
                once: !0
            }),
            document.addEventListener("drop", () => {
                this.isDragging = !1
            }
            , {
                once: !0
            }),
            document.addEventListener("mouseup", () => {
                this.isDragging = !1
            }
            , {
                once: !0
            }))
        }
        return !(c || o || u || h || p || m && f)
    }
    ignoreMutation(e) {
        return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({
            mutation: e
        }) : this.node.isLeaf || this.node.isAtom ? !0 : e.type === "selection" || this.dom.contains(e.target) && e.type === "childList" && (cn() || ao()) && this.editor.isFocused && [...Array.from(e.addedNodes), ...Array.from(e.removedNodes)].every(n => n.isContentEditable) ? !1 : this.contentDOM === e.target && e.type === "attributes" ? !0 : !this.contentDOM.contains(e.target)
    }
    updateAttributes(e) {
        this.editor.commands.command( ({tr: t}) => {
            const n = this.getPos();
            return typeof n != "number" ? !1 : (t.setNodeMarkup(n, void 0, k(k({}, this.node.attrs), e)),
            !0)
        }
        )
    }
    deleteNode() {
        const e = this.getPos();
        if (typeof e != "number")
            return;
        const t = e + this.node.nodeSize;
        this.editor.commands.deleteRange({
            from: e,
            to: t
        })
    }
}
function Yt(r) {
    return new Pc({
        find: r.find,
        handler: ({state: e, range: t, match: n, pasteEvent: i}) => {
            const s = N(r.getAttributes, void 0, n, i);
            if (s === !1 || s === null)
                return null;
            const {tr: o} = e
              , l = n[n.length - 1]
              , a = n[0];
            let c = t.to;
            if (l) {
                const d = a.search(/\S/)
                  , f = t.from + a.indexOf(l)
                  , u = f + l.length;
                if (ho(t.from, t.to, e.doc).filter(p => p.mark.type.excluded.find(g => g === r.type && g !== p.mark.type)).filter(p => p.to > f).length)
                    return null;
                u < t.to && o.delete(u, t.to),
                f > t.from && o.delete(t.from + d, f),
                c = t.from + d + l.length,
                o.addMark(t.from + d, c, r.type.create(s || {})),
                o.removeStoredMark(r.type)
            }
        }
    })
}
const gf = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/
  , yf = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g
  , bf = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/
  , kf = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g
  , Pf = qe.create({
    name: "bold",
    addOptions() {
        return {
            HTMLAttributes: {}
        }
    },
    parseHTML() {
        return [{
            tag: "strong"
        }, {
            tag: "b",
            getAttrs: r => r.style.fontWeight !== "normal" && null
        }, {
            style: "font-weight=400",
            clearMark: r => r.type.name === this.name
        }, {
            style: "font-weight",
            getAttrs: r => /^(bold(er)?|[5-9]\d{2,})$/.test(r) && null
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["strong", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            setBold: () => ({commands: r}) => r.setMark(this.name),
            toggleBold: () => ({commands: r}) => r.toggleMark(this.name),
            unsetBold: () => ({commands: r}) => r.unsetMark(this.name)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-b": () => this.editor.commands.toggleBold(),
            "Mod-B": () => this.editor.commands.toggleBold()
        }
    },
    addInputRules() {
        return [Gt({
            find: gf,
            type: this.type
        }), Gt({
            find: bf,
            type: this.type
        })]
    },
    addPasteRules() {
        return [Yt({
            find: yf,
            type: this.type
        }), Yt({
            find: kf,
            type: this.type
        })]
    }
})
  , xf = "listItem"
  , Ni = "textStyle"
  , Ei = /^\s*([-+*])\s$/
  , Bf = ge.create({
    name: "bulletList",
    addOptions() {
        return {
            itemTypeName: "listItem",
            HTMLAttributes: {},
            keepMarks: !1,
            keepAttributes: !1
        }
    },
    group: "block list",
    content() {
        return `${this.options.itemTypeName}+`
    },
    parseHTML() {
        return [{
            tag: "ul"
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["ul", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            toggleBulletList: () => ({commands: r, chain: e}) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(xf, this.editor.getAttributes(Ni)).run() : r.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
        }
    },
    addInputRules() {
        let r = Ti({
            find: Ei,
            type: this.type
        });
        return (this.options.keepMarks || this.options.keepAttributes) && (r = Ti({
            find: Ei,
            type: this.type,
            keepMarks: this.options.keepMarks,
            keepAttributes: this.options.keepAttributes,
            getAttributes: () => this.editor.getAttributes(Ni),
            editor: this.editor
        })),
        [r]
    }
})
  , zf = ge.create({
    name: "doc",
    topNode: !0,
    content: "block+"
})
  , Sf = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/
  , Mf = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g
  , Cf = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/
  , wf = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g
  , Ff = qe.create({
    name: "italic",
    addOptions() {
        return {
            HTMLAttributes: {}
        }
    },
    parseHTML() {
        return [{
            tag: "em"
        }, {
            tag: "i",
            getAttrs: r => r.style.fontStyle !== "normal" && null
        }, {
            style: "font-style=normal",
            clearMark: r => r.type.name === this.name
        }, {
            style: "font-style=italic"
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["em", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            setItalic: () => ({commands: r}) => r.setMark(this.name),
            toggleItalic: () => ({commands: r}) => r.toggleMark(this.name),
            unsetItalic: () => ({commands: r}) => r.unsetMark(this.name)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-i": () => this.editor.commands.toggleItalic(),
            "Mod-I": () => this.editor.commands.toggleItalic()
        }
    },
    addInputRules() {
        return [Gt({
            find: Sf,
            type: this.type
        }), Gt({
            find: Cf,
            type: this.type
        })]
    },
    addPasteRules() {
        return [Yt({
            find: Mf,
            type: this.type
        }), Yt({
            find: wf,
            type: this.type
        })]
    }
})
  , Lf = ge.create({
    name: "listItem",
    addOptions() {
        return {
            HTMLAttributes: {},
            bulletListTypeName: "bulletList",
            orderedListTypeName: "orderedList"
        }
    },
    content: "paragraph block*",
    defining: !0,
    parseHTML() {
        return [{
            tag: "li"
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["li", Ie(this.options.HTMLAttributes, r), 0]
    },
    addKeyboardShortcuts() {
        return {
            Enter: () => this.editor.commands.splitListItem(this.name),
            Tab: () => this.editor.commands.sinkListItem(this.name),
            "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
        }
    }
})
  , Vf = ge.create({
    name: "paragraph",
    priority: 1e3,
    addOptions() {
        return {
            HTMLAttributes: {}
        }
    },
    group: "block",
    content: "inline*",
    parseHTML() {
        return [{
            tag: "p"
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["p", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            setParagraph: () => ({commands: r}) => r.setNode(this.name)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-Alt-0": () => this.editor.commands.setParagraph()
        }
    }
})
  , $f = ge.create({
    name: "text",
    group: "inline"
})
  , Wf = ge.create({
    name: "heading",
    addOptions() {
        return {
            levels: [1, 2, 3, 4, 5, 6],
            HTMLAttributes: {}
        }
    },
    content: "inline*",
    group: "block",
    defining: !0,
    addAttributes() {
        return {
            level: {
                default: 1,
                rendered: !1
            }
        }
    },
    parseHTML() {
        return this.options.levels.map(r => ({
            tag: `h${r}`,
            attrs: {
                level: r
            }
        }))
    },
    renderHTML({node: r, HTMLAttributes: e}) {
        return [`h${this.options.levels.includes(r.attrs.level) ? r.attrs.level : this.options.levels[0]}`, Ie(this.options.HTMLAttributes, e), 0]
    },
    addCommands() {
        return {
            setHeading: r => ({commands: e}) => this.options.levels.includes(r.level) ? e.setNode(this.name, r) : !1,
            toggleHeading: r => ({commands: e}) => this.options.levels.includes(r.level) ? e.toggleNode(this.name, "paragraph", r) : !1
        }
    },
    addKeyboardShortcuts() {
        return this.options.levels.reduce( (r, e) => B(k({}, r), {
            [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({
                level: e
            })
        }), {})
    },
    addInputRules() {
        return this.options.levels.map(r => mf({
            find: new RegExp(`^(#{${Math.min(...this.options.levels)},${r}})\\s$`),
            type: this.type,
            getAttributes: {
                level: r
            }
        }))
    }
})
  , Hf = qe.create({
    name: "underline",
    addOptions() {
        return {
            HTMLAttributes: {}
        }
    },
    parseHTML() {
        return [{
            tag: "u"
        }, {
            style: "text-decoration",
            consuming: !1,
            getAttrs: r => r.includes("underline") ? {} : !1
        }]
    },
    renderHTML({HTMLAttributes: r}) {
        return ["u", Ie(this.options.HTMLAttributes, r), 0]
    },
    addCommands() {
        return {
            setUnderline: () => ({commands: r}) => r.setMark(this.name),
            toggleUnderline: () => ({commands: r}) => r.toggleMark(this.name),
            unsetUnderline: () => ({commands: r}) => r.unsetMark(this.name)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-u": () => this.editor.commands.toggleUnderline(),
            "Mod-U": () => this.editor.commands.toggleUnderline()
        }
    }
});
export {Gt as A, Pf as B, oo as C, zf as D, se as E, b as F, Df as G, Wf as H, Ff as I, Af as J, Lf as L, Wt as M, ge as N, ce as P, x as S, $f as T, Hf as U, Ue as a, If as b, Bf as c, Vf as d, Rf as e, T as f, M as g, z as h, re as i, E as j, ic as k, N as l, Ie as m, S as n, ul as o, ss as p, qe as q, Yt as r, Tf as s, Ef as t, Nf as u, ho as v, Ti as w, Pd as x, Id as y, mf as z};
//# sourceMappingURL=index-09JYhwSQ.js.mapvar we = Object.defineProperty
  , Ce = Object.defineProperties;
var ve = Object.getOwnPropertyDescriptors;
var G = Object.getOwnPropertySymbols;
var Ie = Object.prototype.hasOwnProperty
  , Se = Object.prototype.propertyIsEnumerable;
var J = (t, e, n) => e in t ? we(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : t[e] = n
  , K = (t, e) => {
    for (var n in e || (e = {}))
        Ie.call(e, n) && J(t, n, e[n]);
    if (G)
        for (var n of G(e))
            Se.call(e, n) && J(t, n, e[n]);
    return t
}
  , Z = (t, e) => Ce(t, ve(e));
var f = (t, e, n) => new Promise( (s, r) => {
    var i = l => {
        try {
            c(n.next(l))
        } catch (d) {
            r(d)
        }
    }
      , a = l => {
        try {
            c(n.throw(l))
        } catch (d) {
            r(d)
        }
    }
      , c = l => l.done ? s(l.value) : Promise.resolve(l.value).then(i, a);
    c((n = n.apply(t, e)).next())
}
);
const De = () => {}
;
var Y = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ce = {
    NODE_ADMIN: !1,
    SDK_VERSION: "${JSCORE_VERSION}"
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ae = function(t, e) {
    if (!t)
        throw Be(e)
}
  , Be = function(t) {
    return new Error("Firebase Database (" + ce.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + t)
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const le = function(t) {
    const e = [];
    let n = 0;
    for (let s = 0; s < t.length; s++) {
        let r = t.charCodeAt(s);
        r < 128 ? e[n++] = r : r < 2048 ? (e[n++] = r >> 6 | 192,
        e[n++] = r & 63 | 128) : (r & 64512) === 55296 && s + 1 < t.length && (t.charCodeAt(s + 1) & 64512) === 56320 ? (r = 65536 + ((r & 1023) << 10) + (t.charCodeAt(++s) & 1023),
        e[n++] = r >> 18 | 240,
        e[n++] = r >> 12 & 63 | 128,
        e[n++] = r >> 6 & 63 | 128,
        e[n++] = r & 63 | 128) : (e[n++] = r >> 12 | 224,
        e[n++] = r >> 6 & 63 | 128,
        e[n++] = r & 63 | 128)
    }
    return e
}
  , Oe = function(t) {
    const e = [];
    let n = 0
      , s = 0;
    for (; n < t.length; ) {
        const r = t[n++];
        if (r < 128)
            e[s++] = String.fromCharCode(r);
        else if (r > 191 && r < 224) {
            const i = t[n++];
            e[s++] = String.fromCharCode((r & 31) << 6 | i & 63)
        } else if (r > 239 && r < 365) {
            const i = t[n++]
              , a = t[n++]
              , c = t[n++]
              , l = ((r & 7) << 18 | (i & 63) << 12 | (a & 63) << 6 | c & 63) - 65536;
            e[s++] = String.fromCharCode(55296 + (l >> 10)),
            e[s++] = String.fromCharCode(56320 + (l & 1023))
        } else {
            const i = t[n++]
              , a = t[n++];
            e[s++] = String.fromCharCode((r & 15) << 12 | (i & 63) << 6 | a & 63)
        }
    }
    return e.join("")
}
  , he = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + "+/="
    },
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + "-_."
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(t, e) {
        if (!Array.isArray(t))
            throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_
          , s = [];
        for (let r = 0; r < t.length; r += 3) {
            const i = t[r]
              , a = r + 1 < t.length
              , c = a ? t[r + 1] : 0
              , l = r + 2 < t.length
              , d = l ? t[r + 2] : 0
              , m = i >> 2
              , h = (i & 3) << 4 | c >> 4;
            let o = (c & 15) << 2 | d >> 6
              , p = d & 63;
            l || (p = 64,
            a || (o = 64)),
            s.push(n[m], n[h], n[o], n[p])
        }
        return s.join("")
    },
    encodeString(t, e) {
        return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(le(t), e)
    },
    decodeString(t, e) {
        return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : Oe(this.decodeStringToByteArray(t, e))
    },
    decodeStringToByteArray(t, e) {
        this.init_();
        const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_
          , s = [];
        for (let r = 0; r < t.length; ) {
            const i = n[t.charAt(r++)]
              , c = r < t.length ? n[t.charAt(r)] : 0;
            ++r;
            const d = r < t.length ? n[t.charAt(r)] : 64;
            ++r;
            const h = r < t.length ? n[t.charAt(r)] : 64;
            if (++r,
            i == null || c == null || d == null || h == null)
                throw new Te;
            const o = i << 2 | c >> 4;
            if (s.push(o),
            d !== 64) {
                const p = c << 4 & 240 | d >> 2;
                if (s.push(p),
                h !== 64) {
                    const E = d << 6 & 192 | h;
                    s.push(E)
                }
            }
        }
        return s
    },
    init_() {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {},
            this.charToByteMap_ = {},
            this.byteToCharMapWebSafe_ = {},
            this.charToByteMapWebSafe_ = {};
            for (let t = 0; t < this.ENCODED_VALS.length; t++)
                this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t),
                this.charToByteMap_[this.byteToCharMap_[t]] = t,
                this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t),
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t,
                t >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t,
                this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t)
        }
    }
};
class Te extends Error {
    constructor() {
        super(...arguments),
        this.name = "DecodeBase64StringError"
    }
}
const Me = function(t) {
    const e = le(t);
    return he.encodeByteArray(e, !0)
}
  , D = function(t) {
    return Me(t).replace(/\./g, "")
}
  , $ = function(t) {
    try {
        return he.decodeString(t, !0)
    } catch (e) {}
    return null
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function un(t) {
    return de(void 0, t)
}
function de(t, e) {
    if (!(e instanceof Object))
        return e;
    switch (e.constructor) {
    case Date:
        const n = e;
        return new Date(n.getTime());
    case Object:
        t === void 0 && (t = {});
        break;
    case Array:
        t = [];
        break;
    default:
        return e
    }
    for (const n in e)
        !e.hasOwnProperty(n) || !Ne(n) || (t[n] = de(t[n], e[n]));
    return t
}
function Ne(t) {
    return t !== "__proto__"
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Re() {
    if (typeof self != "undefined")
        return self;
    if (typeof window != "undefined")
        return window;
    if (typeof global != "undefined")
        return global;
    throw new Error("Unable to locate global object.")
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $e = () => Re().__FIREBASE_DEFAULTS__
  , Le = () => {
    if (typeof process == "undefined" || typeof Y == "undefined")
        return;
    const t = Y.__FIREBASE_DEFAULTS__;
    if (t)
        return JSON.parse(t)
}
  , Pe = () => {
    if (typeof document == "undefined")
        return;
    let t;
    try {
        t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
    } catch (n) {
        return
    }
    const e = t && $(t[1]);
    return e && JSON.parse(e)
}
  , ue = () => {
    try {
        return De() || $e() || Le() || Pe()
    } catch (t) {
        return
    }
}
  , He = t => {
    var e, n;
    return (n = (e = ue()) === null || e === void 0 ? void 0 : e.emulatorHosts) === null || n === void 0 ? void 0 : n[t]
}
  , fn = t => {
    const e = He(t);
    if (!e)
        return;
    const n = e.lastIndexOf(":");
    if (n <= 0 || n + 1 === e.length)
        throw new Error(`Invalid host ${e} with no separate hostname and port!`);
    const s = parseInt(e.substring(n + 1), 10);
    return e[0] === "[" ? [e.substring(1, n - 1), s] : [e.substring(0, n), s]
}
  , fe = () => {
    var t;
    return (t = ue()) === null || t === void 0 ? void 0 : t.config
}
;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xe {
    constructor() {
        this.reject = () => {}
        ,
        this.resolve = () => {}
        ,
        this.promise = new Promise( (e, n) => {
            this.resolve = e,
            this.reject = n
        }
        )
    }
    wrapCallback(e) {
        return (n, s) => {
            n ? this.reject(n) : this.resolve(s),
            typeof e == "function" && (this.promise.catch( () => {}
            ),
            e.length === 1 ? e(n) : e(n, s))
        }
    }
}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ke(t) {
    try {
        return (t.startsWith("http://") || t.startsWith("https://") ? new URL(t).hostname : t).endsWith(".cloudworkstations.dev")
    } catch (e) {
        return !1
    }
}
function pn(t) {
    return f(this, null, function*() {
        return (yield fetch(t, {
            credentials: "include"
        })).ok
    })
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function mn(t, e) {
    if (t.uid)
        throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
    const n = {
        alg: "none",
        type: "JWT"
    }
      , s = e || "demo-project"
      , r = t.iat || 0
      , i = t.sub || t.user_id;
    if (!i)
        throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
    const a = Object.assign({
        iss: `https://securetoken.google.com/${s}`,
        aud: s,
        iat: r,
        exp: r + 3600,
        auth_time: r,
        sub: i,
        user_id: i,
        firebase: {
            sign_in_provider: "custom",
            identities: {}
        }
    }, t);
    return [D(JSON.stringify(n)), D(JSON.stringify(a)), ""].join(".")
}
const w = {};
function Fe() {
    const t = {
        prod: [],
        emulator: []
    };
    for (const e of Object.keys(w))
        w[e] ? t.emulator.push(e) : t.prod.push(e);
    return t
}
function je(t) {
    let e = document.getElementById(t)
      , n = !1;
    return e || (e = document.createElement("div"),
    e.setAttribute("id", t),
    n = !0),
    {
        created: n,
        element: e
    }
}
let X = !1;
function gn(t, e) {
    if (typeof window == "undefined" || typeof document == "undefined" || !ke(window.location.host) || w[t] === e || w[t] || X)
        return;
    w[t] = e;
    function n(o) {
        return `__firebase__banner__${o}`
    }
    const s = "__firebase__banner"
      , i = Fe().prod.length > 0;
    function a() {
        const o = document.getElementById(s);
        o && o.remove()
    }
    function c(o) {
        o.style.display = "flex",
        o.style.background = "#7faaf0",
        o.style.position = "fixed",
        o.style.bottom = "5px",
        o.style.left = "5px",
        o.style.padding = ".5em",
        o.style.borderRadius = "5px",
        o.style.alignItems = "center"
    }
    function l(o, p) {
        o.setAttribute("width", "24"),
        o.setAttribute("id", p),
        o.setAttribute("height", "24"),
        o.setAttribute("viewBox", "0 0 24 24"),
        o.setAttribute("fill", "none"),
        o.style.marginLeft = "-6px"
    }
    function d() {
        const o = document.createElement("span");
        return o.style.cursor = "pointer",
        o.style.marginLeft = "16px",
        o.style.fontSize = "24px",
        o.innerHTML = " &times;",
        o.onclick = () => {
            X = !0,
            a()
        }
        ,
        o
    }
    function m(o, p) {
        o.setAttribute("id", p),
        o.innerText = "Learn more",
        o.href = "https://firebase.google.com/docs/studio/preview-apps#preview-backend",
        o.setAttribute("target", "__blank"),
        o.style.paddingLeft = "5px",
        o.style.textDecoration = "underline"
    }
    function h() {
        const o = je(s)
          , p = n("text")
          , E = document.getElementById(p) || document.createElement("span")
          , U = n("learnmore")
          , z = document.getElementById(U) || document.createElement("a")
          , W = n("preprendIcon")
          , I = document.getElementById(W) || document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (o.created) {
            const O = o.element;
            c(O),
            m(z, U);
            const Ee = d();
            l(I, W),
            O.append(I, E, z, Ee),
            document.body.appendChild(O)
        }
        i ? (E.innerText = "Preview backend disconnected.",
        I.innerHTML = `<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`) : (I.innerHTML = `<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,
        E.innerText = "Preview backend running in this workspace."),
        E.setAttribute("id", p)
    }
    document.readyState === "loading" ? window.addEventListener("DOMContentLoaded", h) : h()
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ve() {
    return typeof navigator != "undefined" && typeof navigator.userAgent == "string" ? navigator.userAgent : ""
}
function bn() {
    return typeof window != "undefined" && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())
}
function _n() {
    const t = typeof chrome == "object" ? chrome.runtime : typeof browser == "object" ? browser.runtime : void 0;
    return typeof t == "object" && t.id !== void 0
}
function yn() {
    return typeof navigator == "object" && navigator.product === "ReactNative"
}
function En() {
    return ce.NODE_ADMIN === !0
}
function Ue() {
    try {
        return typeof indexedDB == "object"
    } catch (t) {
        return !1
    }
}
function ze() {
    return new Promise( (t, e) => {
        try {
            let n = !0;
            const s = "validate-browser-context-for-indexeddb-analytics-module"
              , r = self.indexedDB.open(s);
            r.onsuccess = () => {
                r.result.close(),
                n || self.indexedDB.deleteDatabase(s),
                t(!0)
            }
            ,
            r.onupgradeneeded = () => {
                n = !1
            }
            ,
            r.onerror = () => {
                var i;
                e(((i = r.error) === null || i === void 0 ? void 0 : i.message) || "")
            }
        } catch (n) {
            e(n)
        }
    }
    )
}
function wn() {
    return !(typeof navigator == "undefined" || !navigator.cookieEnabled)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const We = "FirebaseError";
class v extends Error {
    constructor(e, n, s) {
        super(n),
        this.code = e,
        this.customData = s,
        this.name = We,
        Object.setPrototypeOf(this, v.prototype),
        Error.captureStackTrace && Error.captureStackTrace(this, pe.prototype.create)
    }
}
class pe {
    constructor(e, n, s) {
        this.service = e,
        this.serviceName = n,
        this.errors = s
    }
    create(e, ...n) {
        const s = n[0] || {}
          , r = `${this.service}/${e}`
          , i = this.errors[e]
          , a = i ? Ge(i, s) : "Error"
          , c = `${this.serviceName}: ${a} (${r}).`;
        return new v(r,c,s)
    }
}
function Ge(t, e) {
    return t.replace(Je, (n, s) => {
        const r = e[s];
        return r != null ? String(r) : `<${s}?>`
    }
    )
}
const Je = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function q(t) {
    return JSON.parse(t)
}
function Cn(t) {
    return JSON.stringify(t)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const me = function(t) {
    let e = {}
      , n = {}
      , s = {}
      , r = "";
    try {
        const i = t.split(".");
        e = q($(i[0]) || ""),
        n = q($(i[1]) || ""),
        r = i[2],
        s = n.d || {},
        delete n.d
    } catch (i) {}
    return {
        header: e,
        claims: n,
        data: s,
        signature: r
    }
}
  , vn = function(t) {
    const e = me(t)
      , n = e.claims;
    return !!n && typeof n == "object" && n.hasOwnProperty("iat")
}
  , In = function(t) {
    const e = me(t).claims;
    return typeof e == "object" && e.admin === !0
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Sn(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
}
function Dn(t, e) {
    if (Object.prototype.hasOwnProperty.call(t, e))
        return t[e]
}
function An(t) {
    for (const e in t)
        if (Object.prototype.hasOwnProperty.call(t, e))
            return !1;
    return !0
}
function Bn(t, e, n) {
    const s = {};
    for (const r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (s[r] = e.call(n, t[r], r, t));
    return s
}
function L(t, e) {
    if (t === e)
        return !0;
    const n = Object.keys(t)
      , s = Object.keys(e);
    for (const r of n) {
        if (!s.includes(r))
            return !1;
        const i = t[r]
          , a = e[r];
        if (Q(i) && Q(a)) {
            if (!L(i, a))
                return !1
        } else if (i !== a)
            return !1
    }
    for (const r of s)
        if (!n.includes(r))
            return !1;
    return !0
}
function Q(t) {
    return t !== null && typeof t == "object"
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function On(t) {
    const e = [];
    for (const [n,s] of Object.entries(t))
        Array.isArray(s) ? s.forEach(r => {
            e.push(encodeURIComponent(n) + "=" + encodeURIComponent(r))
        }
        ) : e.push(encodeURIComponent(n) + "=" + encodeURIComponent(s));
    return e.length ? "&" + e.join("&") : ""
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tn {
    constructor() {
        this.chain_ = [],
        this.buf_ = [],
        this.W_ = [],
        this.pad_ = [],
        this.inbuf_ = 0,
        this.total_ = 0,
        this.blockSize = 512 / 8,
        this.pad_[0] = 128;
        for (let e = 1; e < this.blockSize; ++e)
            this.pad_[e] = 0;
        this.reset()
    }
    reset() {
        this.chain_[0] = 1732584193,
        this.chain_[1] = 4023233417,
        this.chain_[2] = 2562383102,
        this.chain_[3] = 271733878,
        this.chain_[4] = 3285377520,
        this.inbuf_ = 0,
        this.total_ = 0
    }
    compress_(e, n) {
        n || (n = 0);
        const s = this.W_;
        if (typeof e == "string")
            for (let h = 0; h < 16; h++)
                s[h] = e.charCodeAt(n) << 24 | e.charCodeAt(n + 1) << 16 | e.charCodeAt(n + 2) << 8 | e.charCodeAt(n + 3),
                n += 4;
        else
            for (let h = 0; h < 16; h++)
                s[h] = e[n] << 24 | e[n + 1] << 16 | e[n + 2] << 8 | e[n + 3],
                n += 4;
        for (let h = 16; h < 80; h++) {
            const o = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16];
            s[h] = (o << 1 | o >>> 31) & 4294967295
        }
        let r = this.chain_[0], i = this.chain_[1], a = this.chain_[2], c = this.chain_[3], l = this.chain_[4], d, m;
        for (let h = 0; h < 80; h++) {
            h < 40 ? h < 20 ? (d = c ^ i & (a ^ c),
            m = 1518500249) : (d = i ^ a ^ c,
            m = 1859775393) : h < 60 ? (d = i & a | c & (i | a),
            m = 2400959708) : (d = i ^ a ^ c,
            m = 3395469782);
            const o = (r << 5 | r >>> 27) + d + l + m + s[h] & 4294967295;
            l = c,
            c = a,
            a = (i << 30 | i >>> 2) & 4294967295,
            i = r,
            r = o
        }
        this.chain_[0] = this.chain_[0] + r & 4294967295,
        this.chain_[1] = this.chain_[1] + i & 4294967295,
        this.chain_[2] = this.chain_[2] + a & 4294967295,
        this.chain_[3] = this.chain_[3] + c & 4294967295,
        this.chain_[4] = this.chain_[4] + l & 4294967295
    }
    update(e, n) {
        if (e == null)
            return;
        n === void 0 && (n = e.length);
        const s = n - this.blockSize;
        let r = 0;
        const i = this.buf_;
        let a = this.inbuf_;
        for (; r < n; ) {
            if (a === 0)
                for (; r <= s; )
                    this.compress_(e, r),
                    r += this.blockSize;
            if (typeof e == "string") {
                for (; r < n; )
                    if (i[a] = e.charCodeAt(r),
                    ++a,
                    ++r,
                    a === this.blockSize) {
                        this.compress_(i),
                        a = 0;
                        break
                    }
            } else
                for (; r < n; )
                    if (i[a] = e[r],
                    ++a,
                    ++r,
                    a === this.blockSize) {
                        this.compress_(i),
                        a = 0;
                        break
                    }
        }
        this.inbuf_ = a,
        this.total_ += n
    }
    digest() {
        const e = [];
        let n = this.total_ * 8;
        this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        for (let r = this.blockSize - 1; r >= 56; r--)
            this.buf_[r] = n & 255,
            n /= 256;
        this.compress_(this.buf_);
        let s = 0;
        for (let r = 0; r < 5; r++)
            for (let i = 24; i >= 0; i -= 8)
                e[s] = this.chain_[r] >> i & 255,
                ++s;
        return e
    }
}
function Mn(t, e) {
    return `${t} failed: ${e} argument `
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Nn = function(t) {
    const e = [];
    let n = 0;
    for (let s = 0; s < t.length; s++) {
        let r = t.charCodeAt(s);
        if (r >= 55296 && r <= 56319) {
            const i = r - 55296;
            s++,
            Ae(s < t.length, "Surrogate pair missing trail surrogate.");
            const a = t.charCodeAt(s) - 56320;
            r = 65536 + (i << 10) + a
        }
        r < 128 ? e[n++] = r : r < 2048 ? (e[n++] = r >> 6 | 192,
        e[n++] = r & 63 | 128) : r < 65536 ? (e[n++] = r >> 12 | 224,
        e[n++] = r >> 6 & 63 | 128,
        e[n++] = r & 63 | 128) : (e[n++] = r >> 18 | 240,
        e[n++] = r >> 12 & 63 | 128,
        e[n++] = r >> 6 & 63 | 128,
        e[n++] = r & 63 | 128)
    }
    return e
}
  , Rn = function(t) {
    let e = 0;
    for (let n = 0; n < t.length; n++) {
        const s = t.charCodeAt(n);
        s < 128 ? e++ : s < 2048 ? e += 2 : s >= 55296 && s <= 56319 ? (e += 4,
        n++) : e += 3
    }
    return e
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ke = 1e3
  , Ze = 2
  , Ye = 4 * 60 * 60 * 1e3
  , Xe = .5;
function $n(t, e=Ke, n=Ze) {
    const s = e * Math.pow(n, t)
      , r = Math.round(Xe * s * (Math.random() - .5) * 2);
    return Math.min(Ye, s + r)
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ln(t) {
    return t && t._delegate ? t._delegate : t
}
class A {
    constructor(e, n, s) {
        this.name = e,
        this.instanceFactory = n,
        this.type = s,
        this.multipleInstances = !1,
        this.serviceProps = {},
        this.instantiationMode = "LAZY",
        this.onInstanceCreated = null
    }
    setInstantiationMode(e) {
        return this.instantiationMode = e,
        this
    }
    setMultipleInstances(e) {
        return this.multipleInstances = e,
        this
    }
    setServiceProps(e) {
        return this.serviceProps = e,
        this
    }
    setInstanceCreatedCallback(e) {
        return this.onInstanceCreated = e,
        this
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const y = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qe {
    constructor(e, n) {
        this.name = e,
        this.container = n,
        this.component = null,
        this.instances = new Map,
        this.instancesDeferred = new Map,
        this.instancesOptions = new Map,
        this.onInitCallbacks = new Map
    }
    get(e) {
        const n = this.normalizeInstanceIdentifier(e);
        if (!this.instancesDeferred.has(n)) {
            const s = new xe;
            if (this.instancesDeferred.set(n, s),
            this.isInitialized(n) || this.shouldAutoInitialize())
                try {
                    const r = this.getOrInitializeService({
                        instanceIdentifier: n
                    });
                    r && s.resolve(r)
                } catch (r) {}
        }
        return this.instancesDeferred.get(n).promise
    }
    getImmediate(e) {
        var n;
        const s = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier)
          , r = (n = e == null ? void 0 : e.optional) !== null && n !== void 0 ? n : !1;
        if (this.isInitialized(s) || this.shouldAutoInitialize())
            try {
                return this.getOrInitializeService({
                    instanceIdentifier: s
                })
            } catch (i) {
                if (r)
                    return null;
                throw i
            }
        else {
            if (r)
                return null;
            throw Error(`Service ${this.name} is not available`)
        }
    }
    getComponent() {
        return this.component
    }
    setComponent(e) {
        if (e.name !== this.name)
            throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
        if (this.component)
            throw Error(`Component for ${this.name} has already been provided`);
        if (this.component = e,
        !!this.shouldAutoInitialize()) {
            if (et(e))
                try {
                    this.getOrInitializeService({
                        instanceIdentifier: y
                    })
                } catch (n) {}
            for (const [n,s] of this.instancesDeferred.entries()) {
                const r = this.normalizeInstanceIdentifier(n);
                try {
                    const i = this.getOrInitializeService({
                        instanceIdentifier: r
                    });
                    s.resolve(i)
                } catch (i) {}
            }
        }
    }
    clearInstance(e=y) {
        this.instancesDeferred.delete(e),
        this.instancesOptions.delete(e),
        this.instances.delete(e)
    }
    delete() {
        return f(this, null, function*() {
            const e = Array.from(this.instances.values());
            yield Promise.all([...e.filter(n => "INTERNAL"in n).map(n => n.INTERNAL.delete()), ...e.filter(n => "_delete"in n).map(n => n._delete())])
        })
    }
    isComponentSet() {
        return this.component != null
    }
    isInitialized(e=y) {
        return this.instances.has(e)
    }
    getOptions(e=y) {
        return this.instancesOptions.get(e) || {}
    }
    initialize(e={}) {
        const {options: n={}} = e
          , s = this.normalizeInstanceIdentifier(e.instanceIdentifier);
        if (this.isInitialized(s))
            throw Error(`${this.name}(${s}) has already been initialized`);
        if (!this.isComponentSet())
            throw Error(`Component ${this.name} has not been registered yet`);
        const r = this.getOrInitializeService({
            instanceIdentifier: s,
            options: n
        });
        for (const [i,a] of this.instancesDeferred.entries()) {
            const c = this.normalizeInstanceIdentifier(i);
            s === c && a.resolve(r)
        }
        return r
    }
    onInit(e, n) {
        var s;
        const r = this.normalizeInstanceIdentifier(n)
          , i = (s = this.onInitCallbacks.get(r)) !== null && s !== void 0 ? s : new Set;
        i.add(e),
        this.onInitCallbacks.set(r, i);
        const a = this.instances.get(r);
        return a && e(a, r),
        () => {
            i.delete(e)
        }
    }
    invokeOnInitCallbacks(e, n) {
        const s = this.onInitCallbacks.get(n);
        if (s)
            for (const r of s)
                try {
                    r(e, n)
                } catch (i) {}
    }
    getOrInitializeService({instanceIdentifier: e, options: n={}}) {
        let s = this.instances.get(e);
        if (!s && this.component && (s = this.component.instanceFactory(this.container, {
            instanceIdentifier: Qe(e),
            options: n
        }),
        this.instances.set(e, s),
        this.instancesOptions.set(e, n),
        this.invokeOnInitCallbacks(s, e),
        this.component.onInstanceCreated))
            try {
                this.component.onInstanceCreated(this.container, e, s)
            } catch (r) {}
        return s || null
    }
    normalizeInstanceIdentifier(e=y) {
        return this.component ? this.component.multipleInstances ? e : y : e
    }
    shouldAutoInitialize() {
        return !!this.component && this.component.instantiationMode !== "EXPLICIT"
    }
}
function Qe(t) {
    return t === y ? void 0 : t
}
function et(t) {
    return t.instantiationMode === "EAGER"
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tt {
    constructor(e) {
        this.name = e,
        this.providers = new Map
    }
    addComponent(e) {
        const n = this.getProvider(e.name);
        if (n.isComponentSet())
            throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
        n.setComponent(e)
    }
    addOrOverwriteComponent(e) {
        this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name),
        this.addComponent(e)
    }
    getProvider(e) {
        if (this.providers.has(e))
            return this.providers.get(e);
        const n = new qe(e,this);
        return this.providers.set(e, n),
        n
    }
    getProviders() {
        return Array.from(this.providers.values())
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var u;
(function(t) {
    t[t.DEBUG = 0] = "DEBUG",
    t[t.VERBOSE = 1] = "VERBOSE",
    t[t.INFO = 2] = "INFO",
    t[t.WARN = 3] = "WARN",
    t[t.ERROR = 4] = "ERROR",
    t[t.SILENT = 5] = "SILENT"
}
)(u || (u = {}));
const nt = {
    debug: u.DEBUG,
    verbose: u.VERBOSE,
    info: u.INFO,
    warn: u.WARN,
    error: u.ERROR,
    silent: u.SILENT
}
  , rt = u.INFO
  , st = {
    [u.DEBUG]: "log",
    [u.VERBOSE]: "log",
    [u.INFO]: "info",
    [u.WARN]: "warn",
    [u.ERROR]: "error"
}
  , it = (t, e, ...n) => {
    if (e < t.logLevel)
        return;
    const s = new Date().toISOString()
      , r = st[e];
    if (!r)
        throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)
}
;
class at {
    constructor(e) {
        this.name = e,
        this._logLevel = rt,
        this._logHandler = it,
        this._userLogHandler = null
    }
    get logLevel() {
        return this._logLevel
    }
    set logLevel(e) {
        if (!(e in u))
            throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
        this._logLevel = e
    }
    setLogLevel(e) {
        this._logLevel = typeof e == "string" ? nt[e] : e
    }
    get logHandler() {
        return this._logHandler
    }
    set logHandler(e) {
        if (typeof e != "function")
            throw new TypeError("Value assigned to `logHandler` must be a function");
        this._logHandler = e
    }
    get userLogHandler() {
        return this._userLogHandler
    }
    set userLogHandler(e) {
        this._userLogHandler = e
    }
    debug(...e) {
        this._userLogHandler && this._userLogHandler(this, u.DEBUG, ...e),
        this._logHandler(this, u.DEBUG, ...e)
    }
    log(...e) {
        this._userLogHandler && this._userLogHandler(this, u.VERBOSE, ...e),
        this._logHandler(this, u.VERBOSE, ...e)
    }
    info(...e) {
        this._userLogHandler && this._userLogHandler(this, u.INFO, ...e),
        this._logHandler(this, u.INFO, ...e)
    }
    warn(...e) {
        this._userLogHandler && this._userLogHandler(this, u.WARN, ...e),
        this._logHandler(this, u.WARN, ...e)
    }
    error(...e) {
        this._userLogHandler && this._userLogHandler(this, u.ERROR, ...e),
        this._logHandler(this, u.ERROR, ...e)
    }
}
const ot = (t, e) => e.some(n => t instanceof n);
let ee, te;
function ct() {
    return ee || (ee = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
}
function lt() {
    return te || (te = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])
}
const ge = new WeakMap
  , P = new WeakMap
  , be = new WeakMap
  , T = new WeakMap
  , V = new WeakMap;
function ht(t) {
    const e = new Promise( (n, s) => {
        const r = () => {
            t.removeEventListener("success", i),
            t.removeEventListener("error", a)
        }
          , i = () => {
            n(b(t.result)),
            r()
        }
          , a = () => {
            s(t.error),
            r()
        }
        ;
        t.addEventListener("success", i),
        t.addEventListener("error", a)
    }
    );
    return e.then(n => {
        n instanceof IDBCursor && ge.set(n, t)
    }
    ).catch( () => {}
    ),
    V.set(e, t),
    e
}
function dt(t) {
    if (P.has(t))
        return;
    const e = new Promise( (n, s) => {
        const r = () => {
            t.removeEventListener("complete", i),
            t.removeEventListener("error", a),
            t.removeEventListener("abort", a)
        }
          , i = () => {
            n(),
            r()
        }
          , a = () => {
            s(t.error || new DOMException("AbortError","AbortError")),
            r()
        }
        ;
        t.addEventListener("complete", i),
        t.addEventListener("error", a),
        t.addEventListener("abort", a)
    }
    );
    P.set(t, e)
}
let H = {
    get(t, e, n) {
        if (t instanceof IDBTransaction) {
            if (e === "done")
                return P.get(t);
            if (e === "objectStoreNames")
                return t.objectStoreNames || be.get(t);
            if (e === "store")
                return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
        }
        return b(t[e])
    },
    set(t, e, n) {
        return t[e] = n,
        !0
    },
    has(t, e) {
        return t instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in t
    }
};
function ut(t) {
    H = t(H)
}
function ft(t) {
    return t === IDBDatabase.prototype.transaction && !("objectStoreNames"in IDBTransaction.prototype) ? function(e, ...n) {
        const s = t.call(M(this), e, ...n);
        return be.set(s, e.sort ? e.sort() : [e]),
        b(s)
    }
    : lt().includes(t) ? function(...e) {
        return t.apply(M(this), e),
        b(ge.get(this))
    }
    : function(...e) {
        return b(t.apply(M(this), e))
    }
}
function pt(t) {
    return typeof t == "function" ? ft(t) : (t instanceof IDBTransaction && dt(t),
    ot(t, ct()) ? new Proxy(t,H) : t)
}
function b(t) {
    if (t instanceof IDBRequest)
        return ht(t);
    if (T.has(t))
        return T.get(t);
    const e = pt(t);
    return e !== t && (T.set(t, e),
    V.set(e, t)),
    e
}
const M = t => V.get(t);
function mt(t, e, {blocked: n, upgrade: s, blocking: r, terminated: i}={}) {
    const a = indexedDB.open(t, e)
      , c = b(a);
    return s && a.addEventListener("upgradeneeded", l => {
        s(b(a.result), l.oldVersion, l.newVersion, b(a.transaction), l)
    }
    ),
    n && a.addEventListener("blocked", l => n(l.oldVersion, l.newVersion, l)),
    c.then(l => {
        i && l.addEventListener("close", () => i()),
        r && l.addEventListener("versionchange", d => r(d.oldVersion, d.newVersion, d))
    }
    ).catch( () => {}
    ),
    c
}
const gt = ["get", "getKey", "getAll", "getAllKeys", "count"]
  , bt = ["put", "add", "delete", "clear"]
  , N = new Map;
function ne(t, e) {
    if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string"))
        return;
    if (N.get(e))
        return N.get(e);
    const n = e.replace(/FromIndex$/, "")
      , s = e !== n
      , r = bt.includes(n);
    if (!(n in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || gt.includes(n)))
        return;
    const i = function(a, ...c) {
        return f(this, null, function*() {
            const l = this.transaction(a, r ? "readwrite" : "readonly");
            let d = l.store;
            return s && (d = d.index(c.shift())),
            (yield Promise.all([d[n](...c), r && l.done]))[0]
        })
    };
    return N.set(e, i),
    i
}
ut(t => Z(K({}, t), {
    get: (e, n, s) => ne(e, n) || t.get(e, n, s),
    has: (e, n) => !!ne(e, n) || t.has(e, n)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _t {
    constructor(e) {
        this.container = e
    }
    getPlatformInfoString() {
        return this.container.getProviders().map(n => {
            if (yt(n)) {
                const s = n.getImmediate();
                return `${s.library}/${s.version}`
            } else
                return null
        }
        ).filter(n => n).join(" ")
    }
}
function yt(t) {
    const e = t.getComponent();
    return (e == null ? void 0 : e.type) === "VERSION"
}
const x = "@firebase/app"
  , re = "0.13.2";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const g = new at("@firebase/app")
  , Et = "@firebase/app-compat"
  , wt = "@firebase/analytics-compat"
  , Ct = "@firebase/analytics"
  , vt = "@firebase/app-check-compat"
  , It = "@firebase/app-check"
  , St = "@firebase/auth"
  , Dt = "@firebase/auth-compat"
  , At = "@firebase/database"
  , Bt = "@firebase/data-connect"
  , Ot = "@firebase/database-compat"
  , Tt = "@firebase/functions"
  , Mt = "@firebase/functions-compat"
  , Nt = "@firebase/installations"
  , Rt = "@firebase/installations-compat"
  , $t = "@firebase/messaging"
  , Lt = "@firebase/messaging-compat"
  , Pt = "@firebase/performance"
  , Ht = "@firebase/performance-compat"
  , xt = "@firebase/remote-config"
  , kt = "@firebase/remote-config-compat"
  , Ft = "@firebase/storage"
  , jt = "@firebase/storage-compat"
  , Vt = "@firebase/firestore"
  , Ut = "@firebase/ai"
  , zt = "@firebase/firestore-compat"
  , Wt = "firebase"
  , Gt = "11.10.0";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const k = "[DEFAULT]"
  , Jt = {
    [x]: "fire-core",
    [Et]: "fire-core-compat",
    [Ct]: "fire-analytics",
    [wt]: "fire-analytics-compat",
    [It]: "fire-app-check",
    [vt]: "fire-app-check-compat",
    [St]: "fire-auth",
    [Dt]: "fire-auth-compat",
    [At]: "fire-rtdb",
    [Bt]: "fire-data-connect",
    [Ot]: "fire-rtdb-compat",
    [Tt]: "fire-fn",
    [Mt]: "fire-fn-compat",
    [Nt]: "fire-iid",
    [Rt]: "fire-iid-compat",
    [$t]: "fire-fcm",
    [Lt]: "fire-fcm-compat",
    [Pt]: "fire-perf",
    [Ht]: "fire-perf-compat",
    [xt]: "fire-rc",
    [kt]: "fire-rc-compat",
    [Ft]: "fire-gcs",
    [jt]: "fire-gcs-compat",
    [Vt]: "fire-fst",
    [zt]: "fire-fst-compat",
    [Ut]: "fire-vertex",
    "fire-js": "fire-js",
    [Wt]: "fire-js-all"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const B = new Map
  , Kt = new Map
  , F = new Map;
function se(t, e) {
    try {
        t.container.addComponent(e)
    } catch (n) {
        g.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`, n)
    }
}
function j(t) {
    const e = t.name;
    if (F.has(e))
        return g.debug(`There were multiple attempts to register component ${e}.`),
        !1;
    F.set(e, t);
    for (const n of B.values())
        se(n, t);
    for (const n of Kt.values())
        se(n, t);
    return !0
}
function Pn(t, e) {
    const n = t.container.getProvider("heartbeat").getImmediate({
        optional: !0
    });
    return n && n.triggerHeartbeat(),
    t.container.getProvider(e)
}
function Hn(t) {
    return t == null ? !1 : t.settings !== void 0
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Zt = {
    "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options": "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument": "First argument to `onLog` must be null or a function.",
    "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
}
  , _ = new pe("app","Firebase",Zt);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yt {
    constructor(e, n, s) {
        this._isDeleted = !1,
        this._options = Object.assign({}, e),
        this._config = Object.assign({}, n),
        this._name = n.name,
        this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled,
        this._container = s,
        this.container.addComponent(new A("app", () => this,"PUBLIC"))
    }
    get automaticDataCollectionEnabled() {
        return this.checkDestroyed(),
        this._automaticDataCollectionEnabled
    }
    set automaticDataCollectionEnabled(e) {
        this.checkDestroyed(),
        this._automaticDataCollectionEnabled = e
    }
    get name() {
        return this.checkDestroyed(),
        this._name
    }
    get options() {
        return this.checkDestroyed(),
        this._options
    }
    get config() {
        return this.checkDestroyed(),
        this._config
    }
    get container() {
        return this._container
    }
    get isDeleted() {
        return this._isDeleted
    }
    set isDeleted(e) {
        this._isDeleted = e
    }
    checkDestroyed() {
        if (this.isDeleted)
            throw _.create("app-deleted", {
                appName: this._name
            })
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const xn = Gt;
function Xt(t, e={}) {
    let n = t;
    typeof e != "object" && (e = {
        name: e
    });
    const s = Object.assign({
        name: k,
        automaticDataCollectionEnabled: !0
    }, e)
      , r = s.name;
    if (typeof r != "string" || !r)
        throw _.create("bad-app-name", {
            appName: String(r)
        });
    if (n || (n = fe()),
    !n)
        throw _.create("no-options");
    const i = B.get(r);
    if (i) {
        if (L(n, i.options) && L(s, i.config))
            return i;
        throw _.create("duplicate-app", {
            appName: r
        })
    }
    const a = new tt(r);
    for (const l of F.values())
        a.addComponent(l);
    const c = new Yt(n,s,a);
    return B.set(r, c),
    c
}
function kn(t=k) {
    const e = B.get(t);
    if (!e && t === k && fe())
        return Xt();
    if (!e)
        throw _.create("no-app", {
            appName: t
        });
    return e
}
function S(t, e, n) {
    var s;
    let r = (s = Jt[t]) !== null && s !== void 0 ? s : t;
    n && (r += `-${n}`);
    const i = r.match(/\s|\//)
      , a = e.match(/\s|\//);
    if (i || a) {
        const c = [`Unable to register library "${r}" with version "${e}":`];
        i && c.push(`library name "${r}" contains illegal characters (whitespace or "/")`),
        i && a && c.push("and"),
        a && c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),
        g.warn(c.join(" "));
        return
    }
    j(new A(`${r}-version`, () => ({
        library: r,
        version: e
    }),"VERSION"))
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const qt = "firebase-heartbeat-database"
  , Qt = 1
  , C = "firebase-heartbeat-store";
let R = null;
function _e() {
    return R || (R = mt(qt, Qt, {
        upgrade: (t, e) => {
            switch (e) {
            case 0:
                try {
                    t.createObjectStore(C)
                } catch (n) {}
            }
        }
    }).catch(t => {
        throw _.create("idb-open", {
            originalErrorMessage: t.message
        })
    }
    )),
    R
}
function en(t) {
    return f(this, null, function*() {
        try {
            const n = (yield _e()).transaction(C)
              , s = yield n.objectStore(C).get(ye(t));
            return yield n.done,
            s
        } catch (e) {
            if (e instanceof v)
                g.warn(e.message);
            else {
                const n = _.create("idb-get", {
                    originalErrorMessage: e == null ? void 0 : e.message
                });
                g.warn(n.message)
            }
        }
    })
}
function ie(t, e) {
    return f(this, null, function*() {
        try {
            const s = (yield _e()).transaction(C, "readwrite");
            yield s.objectStore(C).put(e, ye(t)),
            yield s.done
        } catch (n) {
            if (n instanceof v)
                g.warn(n.message);
            else {
                const s = _.create("idb-set", {
                    originalErrorMessage: n == null ? void 0 : n.message
                });
                g.warn(s.message)
            }
        }
    })
}
function ye(t) {
    return `${t.name}!${t.options.appId}`
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const tn = 1024
  , nn = 30;
class rn {
    constructor(e) {
        this.container = e,
        this._heartbeatsCache = null;
        const n = this.container.getProvider("app").getImmediate();
        this._storage = new an(n),
        this._heartbeatsCachePromise = this._storage.read().then(s => (this._heartbeatsCache = s,
        s))
    }
    triggerHeartbeat() {
        return f(this, null, function*() {
            var e, n;
            try {
                const r = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString()
                  , i = ae();
                if (((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null && (this._heartbeatsCache = yield this._heartbeatsCachePromise,
                ((n = this._heartbeatsCache) === null || n === void 0 ? void 0 : n.heartbeats) == null) || this._heartbeatsCache.lastSentHeartbeatDate === i || this._heartbeatsCache.heartbeats.some(a => a.date === i))
                    return;
                if (this._heartbeatsCache.heartbeats.push({
                    date: i,
                    agent: r
                }),
                this._heartbeatsCache.heartbeats.length > nn) {
                    const a = on(this._heartbeatsCache.heartbeats);
                    this._heartbeatsCache.heartbeats.splice(a, 1)
                }
                return this._storage.overwrite(this._heartbeatsCache)
            } catch (s) {
                g.warn(s)
            }
        })
    }
    getHeartbeatsHeader() {
        return f(this, null, function*() {
            var e;
            try {
                if (this._heartbeatsCache === null && (yield this._heartbeatsCachePromise),
                ((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0)
                    return "";
                const n = ae()
                  , {heartbeatsToSend: s, unsentEntries: r} = sn(this._heartbeatsCache.heartbeats)
                  , i = D(JSON.stringify({
                    version: 2,
                    heartbeats: s
                }));
                return this._heartbeatsCache.lastSentHeartbeatDate = n,
                r.length > 0 ? (this._heartbeatsCache.heartbeats = r,
                yield this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [],
                this._storage.overwrite(this._heartbeatsCache)),
                i
            } catch (n) {
                return g.warn(n),
                ""
            }
        })
    }
}
function ae() {
    return new Date().toISOString().substring(0, 10)
}
function sn(t, e=tn) {
    const n = [];
    let s = t.slice();
    for (const r of t) {
        const i = n.find(a => a.agent === r.agent);
        if (i) {
            if (i.dates.push(r.date),
            oe(n) > e) {
                i.dates.pop();
                break
            }
        } else if (n.push({
            agent: r.agent,
            dates: [r.date]
        }),
        oe(n) > e) {
            n.pop();
            break
        }
        s = s.slice(1)
    }
    return {
        heartbeatsToSend: n,
        unsentEntries: s
    }
}
class an {
    constructor(e) {
        this.app = e,
        this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()
    }
    runIndexedDBEnvironmentCheck() {
        return f(this, null, function*() {
            return Ue() ? ze().then( () => !0).catch( () => !1) : !1
        })
    }
    read() {
        return f(this, null, function*() {
            if (yield this._canUseIndexedDBPromise) {
                const n = yield en(this.app);
                return n != null && n.heartbeats ? n : {
                    heartbeats: []
                }
            } else
                return {
                    heartbeats: []
                }
        })
    }
    overwrite(e) {
        return f(this, null, function*() {
            var n;
            if (yield this._canUseIndexedDBPromise) {
                const r = yield this.read();
                return ie(this.app, {
                    lastSentHeartbeatDate: (n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : r.lastSentHeartbeatDate,
                    heartbeats: e.heartbeats
                })
            } else
                return
        })
    }
    add(e) {
        return f(this, null, function*() {
            var n;
            if (yield this._canUseIndexedDBPromise) {
                const r = yield this.read();
                return ie(this.app, {
                    lastSentHeartbeatDate: (n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : r.lastSentHeartbeatDate,
                    heartbeats: [...r.heartbeats, ...e.heartbeats]
                })
            } else
                return
        })
    }
}
function oe(t) {
    return D(JSON.stringify({
        version: 2,
        heartbeats: t
    })).length
}
function on(t) {
    if (t.length === 0)
        return -1;
    let e = 0
      , n = t[0].date;
    for (let s = 1; s < t.length; s++)
        t[s].date < n && (n = t[s].date,
        e = s);
    return e
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function cn(t) {
    j(new A("platform-logger",e => new _t(e),"PRIVATE")),
    j(new A("heartbeat",e => new rn(e),"PRIVATE")),
    S(x, re, t),
    S(x, re, "esm2017"),
    S("fire-js", "")
}
cn("");
var ln = "firebase"
  , hn = "11.10.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
S(ln, hn, "app");
export {An as A, bn as B, A as C, xe as D, pe as E, v as F, yn as G, un as H, Rn as I, Me as J, En as K, at as L, kn as M, fn as N, mn as O, ke as P, pn as Q, gn as R, Tn as S, xn as T, j as _, Pn as a, Ue as b, $n as c, L as d, wn as e, Xt as f, Ln as g, Ae as h, _n as i, q as j, Sn as k, Dn as l, Bn as m, Nn as n, mt as o, he as p, Be as q, S as r, Cn as s, Mn as t, Hn as u, ze as v, u as w, On as x, In as y, vn as z};
//# sourceMappingURL=index.esm-CfaZAp1P.js.map


