var U = Object.defineProperty
  , H = Object.defineProperties;
var $ = Object.getOwnPropertyDescriptors;
var L = Object.getOwnPropertySymbols;
var D = Object.prototype.hasOwnProperty
  , M = Object.prototype.propertyIsEnumerable;
var E = (n, t, e) => t in n ? U(n, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : n[t] = e
  , T = (n, t) => {
    for (var e in t || (t = {}))
        D.call(t, e) && E(n, e, t[e]);
    if (L)
        for (var e of L(t))
            M.call(t, e) && E(n, e, t[e]);
    return n
}
  , b = (n, t) => H(n, $(t));
var w = (n, t, e) => new Promise( (r, i) => {
    var p = l => {
        try {
            u(e.next(l))
        } catch (m) {
            i(m)
        }
    }
      , c = l => {
        try {
            u(e.throw(l))
        } catch (m) {
            i(m)
        }
    }
      , u = l => l.done ? r(l.value) : Promise.resolve(l.value).then(p, c);
    u((e = e.apply(n, t)).next())
}
);
import {j as N, m as j, l as F, r as d, Q as O, n as W, u as C, R as q, I as V, $ as z, f as x, C as X, S as J, q as B, v as k, x as R, B as K, A as _, D as Q, K as A, E as G} from "./runtime-dom.esm-bundler-BBQtLYZd.js";
import {t as Y, R as Z} from "./tippy.esm-B00VeVX7.js";
/* empty css                  */
import {b as ee, B as te, c as ne, D as re, H as ie, I as ae, L as oe, d as se, T as le, U as ue} from "./index-09JYhwSQ.js";
import {g as ce} from "./imaios-global-BEKmHNS5.js";
import "./sha256-DHPrLCgn.js";
import "./_commonjsHelpers-Chg3vePA.js";
import "./utils-BACTbHDn.js";
function P(n) {
    return z( (t, e) => ({
        get() {
            return t(),
            n
        },
        set(r) {
            n = r,
            requestAnimationFrame( () => {
                requestAnimationFrame( () => {
                    e()
                }
                )
            }
            )
        }
    }))
}
class pe extends ee {
    constructor(t={}) {
        return super(t),
        this.contentComponent = null,
        this.appContext = null,
        this.reactiveState = P(this.view.state),
        this.reactiveExtensionStorage = P(this.extensionStorage),
        this.on("beforeTransaction", ({nextState: e}) => {
            this.reactiveState.value = e,
            this.reactiveExtensionStorage.value = this.extensionStorage
        }
        ),
        j(this)
    }
    get state() {
        return this.reactiveState ? this.reactiveState.value : this.view.state
    }
    get storage() {
        return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage
    }
    registerPlugin(t, e) {
        const r = super.registerPlugin(t, e);
        return this.reactiveState && (this.reactiveState.value = r),
        r
    }
    unregisterPlugin(t) {
        const e = super.unregisterPlugin(t);
        return this.reactiveState && e && (this.reactiveState.value = e),
        e
    }
}
const me = N({
    name: "EditorContent",
    props: {
        editor: {
            default: null,
            type: Object
        }
    },
    setup(n) {
        const t = d()
          , e = q();
        return O( () => {
            const r = n.editor;
            r && r.options.element && t.value && W( () => {
                if (!t.value || !r.options.element.firstChild)
                    return;
                const i = C(t.value);
                t.value.append(...r.options.element.childNodes),
                r.contentComponent = e.ctx._,
                e && (r.appContext = b(T({}, e.appContext), {
                    provides: e.provides
                })),
                r.setOptions({
                    element: i
                }),
                r.createNodeViews()
            }
            )
        }
        ),
        V( () => {
            const r = n.editor;
            r && (r.contentComponent = null,
            r.appContext = null)
        }
        ),
        {
            rootEl: t
        }
    },
    render() {
        return F("div", {
            ref: n => {
                this.rootEl = n
            }
        })
    }
})
  , de = ["href", "innerHTML"]
  , ge = ["href"]
  , he = ["src", "alt"]
  , ve = N({
    __name: "previewApp",
    props: {
        structureLink: {}
    },
    setup(n) {
        const t = n;
        let e = null;
        const r = new pe({
            content: "",
            extensions: [te, ne, re, ie, ae, oe, se, le, ue],
            editable: !1
        });
        let i = d(null);
        const p = a => w(this, null, function*() {
            if (i.value !== null)
                return;
            const s = /-(\d+)$/.exec(new URL(a).pathname)
              , g = yield fetch(`/api/structure/resume/${s[1]}`);
            if (!g.ok)
                throw new Error(`Broken link in description with hash : ${s}`);
            const h = yield g.json()
              , y = document.createElement("div");
            return y.innerHTML = h.text,
            i.value = {
                id: h.link,
                text: y,
                image: {
                    src: h.imageSrc,
                    alt: h.imageAlt,
                    background: h.imageBackground
                }
            }
        })
          , c = d(null)
          , u = d(null)
          , l = d(!1)
          , m = d(!1)
          , v = x( () => {
            var a, o;
            return ((o = (a = i.value) == null ? void 0 : a.image) == null ? void 0 : o.src) !== void 0
        }
        )
          , f = x( () => {
            var a;
            return ((a = i.value) == null ? void 0 : a.text.childNodes.length) >= 1
        }
        )
          , I = x( () => {
            var a;
            return (a = i.value) == null ? void 0 : a.image.background
        }
        )
          , S = x( () => {
            var a;
            return (a = i.value) == null ? void 0 : a.image
        }
        );
        return X( () => {
            e = Y(c.value, {
                content: u.value,
                placement: "top",
                theme: "preview-tooltip",
                maxWidth: 480,
                delay: [300, null],
                interactive: !0,
                offset: [0, 6],
                aria: {
                    content: "labelledby"
                },
                appendTo: document.body,
                onShow(o) {
                    return w(this, null, function*() {
                        var s, g;
                        l.value || (yield p(t.structureLink.href),
                        m.value && (o.disable(),
                        r.chain().setContent((g = (s = i.value) == null ? void 0 : s.text) == null ? void 0 : g.innerHTML, !1).run(),
                        l.value = !0,
                        (v.value || f.value) && o.setProps({
                            arrow: Z
                        }),
                        o.enable(),
                        o.show()))
                    })
                },
                onTrigger(o, s) {
                    m.value = !0,
                    o.setProps({
                        getReferenceClientRect: () => ({
                            width: 0,
                            height: 0,
                            top: s.target.getBoundingClientRect().top,
                            bottom: s.target.getBoundingClientRect().bottom,
                            left: s.clientX,
                            right: s.clientX
                        })
                    })
                },
                onUntrigger(o, s) {
                    m.value = !1
                }
            })
        }
        ),
        J( () => {
            e.destroy()
        }
        ),
        (a, o) => (k(),
        B("span", null, [R("a", {
            ref_key: "previewTrigger",
            ref: c,
            target: "_blank",
            href: a.structureLink.href,
            innerHTML: a.structureLink.innerHTML
        }, null, 8, de), R("a", {
            href: a.structureLink.href,
            ref_key: "previewContent",
            ref: u,
            class: A([{
                "text-only": !v.value && f.value
            }, "preview-container"])
        }, [f.value ? (k(),
        K(C(me), {
            key: 0,
            class: "preview-text",
            editor: C(r)
        }, null, 8, ["editor"])) : _("", !0), v.value ? (k(),
        B("img", {
            key: 1,
            src: S.value.src,
            alt: S.value.alt,
            class: A(["preview-img", {
                "img-only": v.value && !f.value
            }]),
            style: Q({
                backgroundColor: `#${I.value}`
            }),
            width: "180",
            height: "180"
        }, null, 14, he)) : _("", !0)], 10, ge)]))
    }
})
  , fe = ["en", "cn", "jp", "ru", "fr", "de", "es", "br", "pl", "ko", "it"]
  , we = fe.map(n => window.imaiosRouting.getFosJsRoutingUrlWithSiteaccess(`structure-view-full-${n}`, {
    application: ce("application")
}).split("/").pop())
  , Be = {
    appList: [],
    removeStructurePreviewApp() {
        this.appList.forEach( ({app: n, containerEl: t, oldElement: e}) => {
            n.unmount(),
            t.parentNode && t.parentNode.replaceChild(e, t)
        }
        ),
        this.appList = []
    },
    createStructurePreviewApp() {
        return w(this, null, function*() {
            var e, r;
            this.removeStructurePreviewApp();
            const n = (e = document.getElementById("structure-definitionText")) != null ? e : document.getElementById("structure-tooltip")
              , t = (r = n == null ? void 0 : n.getElementsByTagName("a")) != null ? r : [];
            this.appList = Array.from(t).filter(i => we.some(p => i.href.includes(p))).map(i => {
                const p = i.cloneNode(!0)
                  , c = document.createElement("span")
                  , u = G(ve, {
                    structureLink: i
                });
                return u.mount(c),
                i.replaceWith(c),
                {
                    app: u,
                    containerEl: c,
                    oldElement: p
                }
            }
            )
        })
    }
};
export {Be as default};
//# sourceMappingURL=main-BCJxFS3K.js.map
