var x = Object.defineProperty;
var F = (n, e, t) => e in n ? x(n, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : n[e] = t;
var k = (n, e, t) => F(n, typeof e != "symbol" ? e + "" : e, t);
var E = (n, e, t) => new Promise( (s, i) => {
    var o = l => {
        try {
            c(t.next(l))
        } catch (d) {
            i(d)
        }
    }
      , a = l => {
        try {
            c(t.throw(l))
        } catch (d) {
            i(d)
        }
    }
      , c = l => l.done ? s(l.value) : Promise.resolve(l.value).then(o, a);
    c((t = t.apply(n, e)).next())
}
);
import "./imaios-global-js-5k-YCrmB.js";
import {o as q, g as U, f as L} from "./imaios-global-BEKmHNS5.js";
import "./imaios-theme-js-8OeJNF5p.js";
import "./imaios-vendors-script-DpOvQEUH.js";
import {L as h} from "./login-management-service-AsiTy0FF.js";
import {N as B} from "./notifications.constant-CpYlRevd.js";
import {S as v, P as H} from "./config.constant-BTOtLmfz.js";
import {w as m} from "./utils-BACTbHDn.js";
import "./preload-helper-DPi8upcZ.js";
import "./deprecatedMonkeyPatches-Bt200UOZ.js";
import "./sha256-DHPrLCgn.js";
import "./_commonjsHelpers-Chg3vePA.js";
import "./themeFeature-zU7nRuMw.js";
import "./jquery-DneebmYf.js";
import "./popper-D5tFIuWb.js";
q( () => {
    function n(r) {
        const p = r.id
          , b = document.querySelector(`[aria-labelledby="${p}"]`);
        r.parentElement.addEventListener("mouseenter", () => {
            setTimeout( () => {
                u(r.parentElement) && d(r, b)
            }
            , c())
        }
        ),
        r.parentElement.addEventListener("mouseout", () => {
            setTimeout( () => {
                u(r.parentElement) || f(r)
            }
            , o)
        }
        ),
        r.addEventListener("keyup", _ => {
            ["enter", " ", "space"].includes(_.key) && (l(r) ? f(r) : d(r, b))
        }
        ),
        b.addEventListener("animationend", _ => {
            _.animationName === "dropdown-slide-up" && b.classList.remove(t)
        }
        )
    }
    const e = "open"
      , t = "closing"
      , s = 500
      , i = 100
      , o = 500;
    let a = null;
    function c() {
        return a !== null ? i : s
    }
    function l(r) {
        return a === r
    }
    function d(r, p) {
        a !== null && r !== a && f(a),
        r.setAttribute("aria-expanded", "true"),
        p.classList.add(e),
        a = r
    }
    function f(r) {
        if (!l(r))
            return;
        const p = document.querySelector(`[aria-labelledby="${a.id}"]`);
        r.setAttribute("aria-expanded", "false"),
        p.classList.remove(e),
        p.classList.add(t),
        a = null
    }
    function u(r) {
        return r.parentElement.querySelector(":hover") === r
    }
    document.querySelectorAll(".mega-dropdown-toggle .nav-link").forEach(n)
}
);
const D = "imaios-connection-management";
function M() {
    imaios.pubsub.publish(B.LOGOUT)
}
function z() {
    return E(this, null, function*() {
        const n = document.querySelectorAll('[data-header="b2b-admin-entry"]');
        if (n) {
            yield h.awaitConnection();
            const e = m.get(v.IMAIOS_USER_INFORMATION);
            e != null && e.isB2BAdministrator && Array.from(n).forEach(t => {
                t.classList.remove("d-none")
            }
            )
        }
    })
}
function G() {
    return E(this, null, function*() {
        const n = document.getElementById("header-cases-entry");
        if (n) {
            yield h.awaitConnection();
            const e = m.get(v.IMAIOS_USER_INFORMATION);
            e != null && e.id && n.classList.remove("d-none")
        }
    })
}
function J(n) {
    return E(this, null, function*() {
        const e = document.querySelector("#msk-button-subscribe");
        e && (yield n.awaitConnection(),
        n.haveAccessToProduct(H.MSK) && e.setAttribute("style", "display:none"))
    })
}
function X(n) {
    return E(this, null, function*() {
        yield n.awaitConnection(),
        n.deleteSubscriptionsTags()
    })
}
function P() {
    if (U(D) !== !0) {
        if (imaios.store(D, !0),
        imaios.store("login-manager", h),
        z(),
        G(),
        J(h),
        X(h),
        Array.from(document.querySelectorAll(".imaios-logout")).forEach(n => {
            n.addEventListener("click", M)
        }
        ),
        window.location.search.length > 0 && window.location.href.includes("previous_imaios_action")) {
            const n = window.location.href.split("?");
            if (n.length === 2) {
                const e = ["previous_imaios_action=logout", "previous_imaios_action=login"]
                  , t = n[1];
                e.forEach(s => {
                    if (t.includes(s)) {
                        M();
                        const i = new URLSearchParams(t.replace(s, ""));
                        history.pushState({}, "", window.location.pathname + (i.toString().length > 0 ? "?" + i.toString() : ""))
                    }
                }
                )
            }
        }
        h.loadLogin()
    }
}
window.addEventListener("pageshow", n => {
    n.persisted && P()
}
);
window.addEventListener("pagehide", n => {
    imaios.store(D, !1)
}
);
P();
function W(n, e) {
    let t = null;
    return (...s) => {
        const i = () => n(...s);
        clearTimeout(t),
        t = setTimeout(i, e)
    }
}
function Y(n, e, t, s) {
    e.innerHTML = "",
    t.forEach(i => {
        const o = document.createElement("button");
        o.classList.add("dropdown-item", "search-case__suggestion-item");
        const a = i.indexOf(n);
        a !== -1 ? o.innerHTML = `${i.slice(0, a)}<span class="search-case__highlight">${i.slice(a, a + n.length)}</span>${i.slice(a + n.length)}` : o.innerHTML = i,
        o.addEventListener("click", c => {
            s(c, i),
            S(e, !1)
        }
        ),
        e.appendChild(o)
    }
    )
}
function S(n, e) {
    n.classList.toggle("d-block", e)
}
function j(n, e) {
    const t = n.id.replace("search-field__", "")
      , s = document.getElementById(`search-suggestion__${t}`);
    if (n.value === "") {
        S(s, !1);
        return
    }
    const i = imaios.get("imaios-search-autocomplete").replace("__query__", n.value).replace("__locale__", n.getAttribute("data-lang"));
    imaios.fetch(i, {
        method: "GET"
    }).then(o => {
        if (o.ok)
            return o.json();
        throw o
    }
    ).then(o => {
        if (o.length === 0) {
            S(s, !1);
            return
        }
        Y(n.value, s, o, (a, c) => {
            n.value = c
        }
        ),
        S(s, !0)
    }
    )
}
q(function() {
    const n = W(j, 150)
      , e = Array.from(document.querySelectorAll(".search-case"))
      , t = Array.from(document.querySelectorAll(".search-case__suggestion"));
    document.querySelectorAll("[data-id='search-field']").forEach(s => {
        s.addEventListener("input", i => n(s, i)),
        s.addEventListener("keydown", i => {
            i.key === "Escape" && t.forEach(o => S(o, !1))
        }
        )
    }
    ),
    document.body.addEventListener("click", s => {
        const i = s.path || s.composedPath && s.composedPath();
        (i ? i.indexOf(e) < 0 : !e.includes(s.target)) && t.forEach(a => S(a, !1))
    }
    )
});
imaios.pubsub.subscribe(imaios.pubsub, "analytics-set", ({key: n, value: e}) => {
    if (n === "content_group" && e !== "") {
        const t = "group_content_view";
        let s = {
            content_group: e
        };
        sendEventToAnalytics(t, s)
    } else
        sendSetToAnalytics(n, e)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "analytics-search", ({searchTerm: n}) => {
    const e = "search";
    let t = {
        search_term: n
    };
    sendEventToAnalytics(e, t)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "analytics-view-item-list", ({itemListId: n, itemListName: e}) => {
    const t = "view_item_list"
      , s = document.querySelectorAll(".view-item-list");
    let i = [];
    s.forEach(function(a) {
        let c = a.getAttribute("data-ga4-param-items");
        i.push(JSON.parse(c))
    });
    let o = {
        item_list_id: n,
        item_list_name: e,
        items: i
    };
    sendEventToAnalytics(t, o)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "analytics-view-item", ({tab: n}) => {
    let e = document.querySelectorAll(".active.show .view-item-list");
    n !== null && (e = document.querySelectorAll(n + " .view-item-list"));
    const t = "view_item";
    e.forEach(function(s) {
        let i = s.getAttribute("data-ga4-param-items")
          , o = {
            currency: s.getAttribute("data-ga4-param-currency"),
            value: s.getAttribute("data-ga4-param-value"),
            items: JSON.parse(i)
        };
        sendEventToAnalytics(t, o)
    })
}
);
imaios.pubsub.subscribe(imaios.pubsub, "analytics-begin-checkout", ({currency: n, value: e}) => {
    const t = "begin_checkout"
      , s = document.querySelector("div.begin-checkout").getAttribute("data-ga4-param-items");
    let i = JSON.parse(s);
    i.item_list_id = "begin_checkout_item",
    i.item_list_name = "begin checkout item";
    let o = {
        currency: n,
        value: e,
        items: [i]
    };
    sendEventToAnalytics(t, o)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "analytics-add-shipping-info", ({currency: n, value: e}) => {
    const t = "add_shipping_info"
      , s = document.querySelector("div.begin-checkout").getAttribute("data-ga4-param-items");
    let i = {
        currency: n,
        value: e,
        items: [JSON.parse(s)]
    };
    sendEventToAnalytics(t, i)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "analytics-add-payment-info", ({currency: n, value: e, paymentType: t}) => {
    const s = "add_payment_info"
      , i = document.querySelector("div.begin-checkout").getAttribute("data-ga4-param-items");
    let o = JSON.parse(i);
    o.item_list_id = "payment_method_form",
    o.item_list_name = "payment method form";
    let a = {
        currency: n,
        value: e,
        payment_type: t,
        items: [o]
    };
    sendEventToAnalytics(s, a),
    K()
}
);
imaios.pubsub.subscribe(imaios.pubsub, "analytics-quicklinks", ({product: n, module: e, access: t}) => {
    const s = "module_open";
    let i = {
        placement: "quicklinks",
        product: n,
        module: e,
        access: t
    };
    sendEventToAnalytics(s, i)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "cancel-renew", ({reason: n}) => {
    const e = "cancel_renew";
    let t = {
        reason: n
    };
    sendEventToAnalytics(e, t)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "theme-switch", ({theme: n, placement: e, individual_premium: t, ip_premium: s, group_premium: i}) => {
    let o = {
        placement: e,
        individual_premium: t,
        ip_premium: s,
        group_premium: i,
        target_name: "theme",
        target_value: n,
        action: "switch_theme"
    };
    sendEventToAnalytics("user_action", o)
}
);
function K() {
    return E(this, null, function*() {
        yield h.awaitConnection();
        const n = "ga-4-disable";
        (window.imaios.get(n) === null || window.imaios.get(n) === !1) && gtag("get", U("ga4Id"), "client_id", e => {
            L("/api/analytics/clients/users", {
                method: "POST",
                body: JSON.stringify({
                    clientId: e
                })
            })
        }
        )
    })
}
imaios.pubsub.subscribe(imaios.pubsub, "ga-zoopaedia-open-node", ({nodeName: n}) => {
    let e = {
        target_name: n,
        target_value: "open"
    };
    sendEventToAnalytics("click", e)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "ga-zoopaedia-unfold-node", ({nodeName: n}) => {
    let e = {
        target_name: n,
        target_value: "unfold"
    };
    sendEventToAnalytics("click", e)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "ga-anatomical-open-node", ({nodeName: n}) => {
    let e = {
        target_name: n,
        target_value: "open"
    };
    sendEventToAnalytics("click", e)
}
);
imaios.pubsub.subscribe(imaios.pubsub, "ga-anatomical-unfold-node", ({nodeName: n}) => {
    let e = {
        target_name: n,
        target_value: "unfold"
    };
    sendEventToAnalytics("click", e)
}
);
let w = "userConsent_"
  , I = "userConsent_10"
  , A = 10
  , T = 395;
const C = {
    ACCEPTED: 1,
    REFUSED: 0
}
  , y = {
    EXPIRED: 0,
    ACTIVE: 1
};
function V(n) {
    for (var e = n.toString(), t = "", s = 0; s < e.length; s += 2)
        t += String.fromCharCode(parseInt(e.substr(s, 2), 16));
    return t
}
var g;
window.ImaiosUserConsent = (g = class {
    constructor() {
        k(this, "setCookie", function(e, t, s, i, o, a) {
            var c = new Date;
            c.setTime(c.getTime()),
            s && (s = s * 1e3 * 60 * 60 * 24);
            var l = new Date(c.getTime() + s);
            document.cookie = e + "=" + escape(t) + (s ? ";expires=" + l.toGMTString() : "") + (i ? ";path=" + i : "") + (o ? ";domain=" + o : "") + (a ? ";secure" : "")
        })
    }
    init() {
        return h.awaitConnection().then( () => this.onInit())
    }
    onInit() {
        g.hasBeenInitialized || (g.hasBeenInitialized = !0,
        this.checkStorageExpiration(w + this.getRemoteId()).then(e => {
            e === y.EXPIRED && this.checkStorageExpiration(I).then(t => {
                if (t === y.EXPIRED)
                    $("#userConsentModal").modal({
                        show: !0,
                        backdrop: "static",
                        keyboard: !1
                    });
                else if (this.getRemoteId() !== void 0) {
                    let s = m.get(I);
                    s.session_user_consent = this.currentSessionHash(),
                    s.imUserId = this.getRemoteId(),
                    m.add(w + this.getRemoteId(), s, this.convertExpire(T)),
                    this.sendUserConsentData(s)
                }
            }
            )
        }
        ))
    }
    getRemoteId() {
        var e;
        if (m.get(v.IMAIOS_USER_INFORMATION) !== null) {
            const t = (e = m.get(v.IMAIOS_USER_INFORMATION)) != null ? e : null;
            return t !== null && t.id !== null && t.id !== void 0 ? t.id : A
        }
    }
    getSessionId() {
        var e;
        if (m.get(v.IMAIOS_USER_INFORMATION) !== null) {
            const t = (e = m.get(v.IMAIOS_USER_INFORMATION)) != null ? e : null;
            return t !== null && t.session_id !== null && typeof t.session_id != "undefined" ? t.session_id : null
        }
    }
    getConsentDate() {
        return new Promise(e => {
            var t;
            return window.imConsent ? e((t = window.imConsent.consent_timestamp) != null ? t : null) : (L(`/${imaios.getSiteAccess()}/api/user/user-consent/check`, {
                method: "GET"
            }).then(s => s.json()).then(s => {
                if (s !== null)
                    return e(s.consent_timestamp !== null && typeof s.consent_timestamp != "undefined" ? parseInt(s.consent_timestamp) : null)
            }
            ),
            e(null))
        }
        )
    }
    checkStorageExpiration(e) {
        const t = Math.round(Date.now() / 1e3);
        return new Promise(s => {
            if (m.checkExpire(e),
            m.has(e))
                return s(y.ACTIVE);
            if (e !== I)
                this.getConsentDate().then(i => {
                    const o = this.convertExpire(T) / 1e3 - t;
                    return i !== null && i + o > t ? (this.userConsentSave(C.ACCEPTED, !1, (i + o) * 1e3),
                    s(y.ACTIVE)) : s(y.EXPIRED)
                }
                );
            else
                return s(y.EXPIRED)
        }
        )
    }
    extractHostname(e) {
        let t;
        return e.indexOf("://") > -1 ? t = e.split("/")[2] : t = e.split("/")[0],
        t = t.split(":")[0],
        t = t.split("?")[0],
        t
    }
    extractRootDomain(e) {
        let t = this.extractHostname(e)
          , s = t.split(".")
          , i = s.length;
        return i > 2 && (t = s[i - 2] + "." + s[i - 1],
        s[i - 2].length === 2 && s[i - 1].length === 2 && (t = s[i - 3] + "." + t)),
        t
    }
    convertExpire(e) {
        const t = new Date;
        return t.setTime(t.getTime()),
        e = e * 1e3 * 60 * 60 * 24,
        t.getTime() + e
    }
    getCookie(e) {
        const s = `; ${document.cookie}`.split(`; ${e}=`);
        if (s.length === 2)
            return s.pop().split(";").shift()
    }
    convertHash(e) {
        return window.btoa(V(window.imaios.sha256(e)))
    }
    currentSessionHash() {
        return this.getSessionId() ? this.convertHash(this.getSessionId()) : null
    }
    checkConsent() {
        let e = !1;
        const t = w + this.getRemoteId();
        m.checkExpire(t);
        const s = m.get(t);
        return s !== null && s.cookie_analytics === 1 && (e = !0),
        e
    }
    userConsentSave(e, t=!0, s=null) {
        const i = "ga-4-disable";
        let o = e === C.REFUSED;
        imaios.store(i, o);
        let a = e === C.REFUSED ? "denied" : "granted";
        sendToConsent(a);
        const c = this.extractRootDomain(window.location.href);
        let l, d;
        const f = Math.round(Date.now() / 1e3);
        this.getRemoteId() !== A && this.getRemoteId() !== null && this.getRemoteId() !== void 0 ? (l = this.convertExpire(T),
        d = this.getRemoteId()) : (l = this.convertExpire(1),
        d = A);
        let u = {
            session_user_consent: this.currentSessionHash(),
            cookie_analytics: e,
            path: "/",
            rootDomain: c,
            imUserId: d
        };
        u.consent_timestamp = e !== C.REFUSED ? f : null,
        m.add(w + d, u, s !== null ? s : l),
        t && this.sendUserConsentData(u)
    }
    sendUserConsentData(e) {
        L(`/${imaios.getSiteAccess()}/api/user/user-consent`, {
            method: "POST",
            body: JSON.stringify(e)
        })
    }
}
,
k(g, "hasBeenInitialized", !1),
g);
const R = window.ImaiosUserConsent;
let N = "denied"
  , O = "ga-4-disable";
(function() {
    return E(this, null, function*() {
        yield h.awaitConnection();
        const n = new R;
        R.hasBeenInitialized || (yield n.init()),
        n.checkConsent() ? (window.imaios.get(O) === null || window.imaios.get(O) === !1) && (N = "granted") : window.imaios.store(O, !0),
        gtag("consent", "default", {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: N
        }),
        gtag("js", new Date)
    })
}
)();
document.addEventListener("DOMContentLoaded", () => {
    const n = document.querySelector("#userConsentModal")
      , e = document.querySelector("#manageConsentUser")
      , t = document.querySelector("#userConsentModal #continueWithoutAccepting")
      , s = document.querySelector("#userConsentModal #manageCookies")
      , i = document.querySelector("#userConsentModal #acceptCookies")
      , o = document.querySelector("#userConsentModal #cookiePreferences")
      , a = document.querySelector("#userConsentModal #cookieSettings")
      , c = document.querySelector("#userConsentModal #analyticsCookiesAccept")
      , l = document.querySelector("#userConsentModal #analyticsCookiesRefuse")
      , d = document.querySelector("#userConsentModal #saveAndContinue")
      , f = () => (n == null ? void 0 : n.style.display) === "block";
    let u = 0;
    const r = new R;
    if (r.init(),
    e === null)
        return;
    e.addEventListener("click", () => {
        $("#userConsentModal").modal({
            show: !0,
            backdrop: "static",
            keyboard: !1
        }),
        o.classList.add("d-none"),
        a.classList.remove("d-none"),
        r.checkConsent() ? p(c, l) : p(l, c)
    }
    ),
    t.addEventListener("click", () => {
        r.userConsentSave(u, f())
    }
    ),
    s.addEventListener("click", () => {
        o.classList.add("d-none"),
        a.classList.remove("d-none"),
        r.checkConsent() && p(c, l)
    }
    ),
    i.addEventListener("click", () => {
        u = 1,
        r.userConsentSave(u, f())
    }
    ),
    c.addEventListener("click", () => {
        p(c, l),
        u = 1
    }
    ),
    l.addEventListener("click", () => {
        p(l, c),
        u = 0
    }
    ),
    d.addEventListener("click", () => {
        c.classList.contains("btn-primary") && (u = 1),
        r.userConsentSave(u, f())
    }
    );
    function p(b, _) {
        b.classList.remove("btn-stroke"),
        b.classList.add("btn-primary"),
        _.classList.remove("btn-primary"),
        _.classList.add("btn-stroke"),
        _.blur(),
        b.blur()
    }
}
);
//# sourceMappingURL=page-layout-C-ufy_UX.js.map /**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var T = typeof window != "undefined" && typeof document != "undefined" && typeof navigator != "undefined"
  , pe = function() {
    for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
        if (T && navigator.userAgent.indexOf(e[t]) >= 0)
            return 1;
    return 0
}();
function ce(e) {
    var t = !1;
    return function() {
        t || (t = !0,
        window.Promise.resolve().then(function() {
            t = !1,
            e()
        }))
    }
}
function de(e) {
    var t = !1;
    return function() {
        t || (t = !0,
        setTimeout(function() {
            t = !1,
            e()
        }, pe))
    }
}
var he = T && window.Promise
  , ve = he ? ce : de;
function K(e) {
    var t = {};
    return e && t.toString.call(e) === "[object Function]"
}
function O(e, t) {
    if (e.nodeType !== 1)
        return [];
    var r = e.ownerDocument.defaultView
      , n = r.getComputedStyle(e, null);
    return t ? n[t] : n
}
function I(e) {
    return e.nodeName === "HTML" ? e : e.parentNode || e.host
}
function C(e) {
    if (!e)
        return document.body;
    switch (e.nodeName) {
    case "HTML":
    case "BODY":
        return e.ownerDocument.body;
    case "#document":
        return e.body
    }
    var t = O(e)
      , r = t.overflow
      , n = t.overflowX
      , o = t.overflowY;
    return /(auto|scroll|overlay)/.test(r + o + n) ? e : C(I(e))
}
function X(e) {
    return e && e.referenceNode ? e.referenceNode : e
}
var z = T && !!(window.MSInputMethodContext && document.documentMode)
  , U = T && /MSIE 10/.test(navigator.userAgent);
function L(e) {
    return e === 11 ? z : e === 10 ? U : z || U
}
function x(e) {
    if (!e)
        return document.documentElement;
    for (var t = L(10) ? document.body : null, r = e.offsetParent || null; r === t && e.nextElementSibling; )
        r = (e = e.nextElementSibling).offsetParent;
    var n = r && r.nodeName;
    return !n || n === "BODY" || n === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(r.nodeName) !== -1 && O(r, "position") === "static" ? x(r) : r
}
function me(e) {
    var t = e.nodeName;
    return t === "BODY" ? !1 : t === "HTML" || x(e.firstElementChild) === e
}
function R(e) {
    return e.parentNode !== null ? R(e.parentNode) : e
}
function D(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType)
        return document.documentElement;
    var r = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING
      , n = r ? e : t
      , o = r ? t : e
      , i = document.createRange();
    i.setStart(n, 0),
    i.setEnd(o, 0);
    var s = i.commonAncestorContainer;
    if (e !== s && t !== s || n.contains(o))
        return me(s) ? s : x(s);
    var f = R(e);
    return f.host ? D(f.host, t) : D(e, R(t).host)
}
function P(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top"
      , r = t === "top" ? "scrollTop" : "scrollLeft"
      , n = e.nodeName;
    if (n === "BODY" || n === "HTML") {
        var o = e.ownerDocument.documentElement
          , i = e.ownerDocument.scrollingElement || o;
        return i[r]
    }
    return e[r]
}
function ge(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
      , n = P(t, "top")
      , o = P(t, "left")
      , i = r ? -1 : 1;
    return e.top += n * i,
    e.bottom += n * i,
    e.left += o * i,
    e.right += o * i,
    e
}
function q(e, t) {
    var r = t === "x" ? "Left" : "Top"
      , n = r === "Left" ? "Right" : "Bottom";
    return parseFloat(e["border" + r + "Width"]) + parseFloat(e["border" + n + "Width"])
}
function Y(e, t, r, n) {
    return Math.max(t["offset" + e], t["scroll" + e], r["client" + e], r["offset" + e], r["scroll" + e], L(10) ? parseInt(r["offset" + e]) + parseInt(n["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(n["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0)
}
function J(e) {
    var t = e.body
      , r = e.documentElement
      , n = L(10) && getComputedStyle(r);
    return {
        height: Y("Height", t, r, n),
        width: Y("Width", t, r, n)
    }
}
var be = function(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
  , we = function() {
    function e(t, r) {
        for (var n = 0; n < r.length; n++) {
            var o = r[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(t, o.key, o)
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r),
        n && e(t, n),
        t
    }
}()
  , S = function(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r,
    e
}
  , g = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
}
;
function y(e) {
    return g({}, e, {
        right: e.left + e.width,
        bottom: e.top + e.height
    })
}
function W(e) {
    var t = {};
    try {
        if (L(10)) {
            t = e.getBoundingClientRect();
            var r = P(e, "top")
              , n = P(e, "left");
            t.top += r,
            t.left += n,
            t.bottom += r,
            t.right += n
        } else
            t = e.getBoundingClientRect()
    } catch (u) {}
    var o = {
        left: t.left,
        top: t.top,
        width: t.right - t.left,
        height: t.bottom - t.top
    }
      , i = e.nodeName === "HTML" ? J(e.ownerDocument) : {}
      , s = i.width || e.clientWidth || o.width
      , f = i.height || e.clientHeight || o.height
      , a = e.offsetWidth - s
      , l = e.offsetHeight - f;
    if (a || l) {
        var p = O(e);
        a -= q(p, "x"),
        l -= q(p, "y"),
        o.width -= a,
        o.height -= l
    }
    return y(o)
}
function k(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1
      , n = L(10)
      , o = t.nodeName === "HTML"
      , i = W(e)
      , s = W(t)
      , f = C(e)
      , a = O(t)
      , l = parseFloat(a.borderTopWidth)
      , p = parseFloat(a.borderLeftWidth);
    r && o && (s.top = Math.max(s.top, 0),
    s.left = Math.max(s.left, 0));
    var u = y({
        top: i.top - s.top - l,
        left: i.left - s.left - p,
        width: i.width,
        height: i.height
    });
    if (u.marginTop = 0,
    u.marginLeft = 0,
    !n && o) {
        var d = parseFloat(a.marginTop)
          , c = parseFloat(a.marginLeft);
        u.top -= l - d,
        u.bottom -= l - d,
        u.left -= p - c,
        u.right -= p - c,
        u.marginTop = d,
        u.marginLeft = c
    }
    return (n && !r ? t.contains(f) : t === f && f.nodeName !== "BODY") && (u = ge(u, t)),
    u
}
function ye(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
      , r = e.ownerDocument.documentElement
      , n = k(e, r)
      , o = Math.max(r.clientWidth, window.innerWidth || 0)
      , i = Math.max(r.clientHeight, window.innerHeight || 0)
      , s = t ? 0 : P(r)
      , f = t ? 0 : P(r, "left")
      , a = {
        top: s - n.top + n.marginTop,
        left: f - n.left + n.marginLeft,
        width: o,
        height: i
    };
    return y(a)
}
function Q(e) {
    var t = e.nodeName;
    if (t === "BODY" || t === "HTML")
        return !1;
    if (O(e, "position") === "fixed")
        return !0;
    var r = I(e);
    return r ? Q(r) : !1
}
function Z(e) {
    if (!e || !e.parentElement || L())
        return document.documentElement;
    for (var t = e.parentElement; t && O(t, "transform") === "none"; )
        t = t.parentElement;
    return t || document.documentElement
}
function V(e, t, r, n) {
    var o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1
      , i = {
        top: 0,
        left: 0
    }
      , s = o ? Z(e) : D(e, X(t));
    if (n === "viewport")
        i = ye(s, o);
    else {
        var f = void 0;
        n === "scrollParent" ? (f = C(I(t)),
        f.nodeName === "BODY" && (f = e.ownerDocument.documentElement)) : n === "window" ? f = e.ownerDocument.documentElement : f = n;
        var a = k(f, s, o);
        if (f.nodeName === "HTML" && !Q(s)) {
            var l = J(e.ownerDocument)
              , p = l.height
              , u = l.width;
            i.top += a.top - a.marginTop,
            i.bottom = p + a.top,
            i.left += a.left - a.marginLeft,
            i.right = u + a.left
        } else
            i = a
    }
    r = r || 0;
    var d = typeof r == "number";
    return i.left += d ? r : r.left || 0,
    i.top += d ? r : r.top || 0,
    i.right -= d ? r : r.right || 0,
    i.bottom -= d ? r : r.bottom || 0,
    i
}
function Ee(e) {
    var t = e.width
      , r = e.height;
    return t * r
}
function ee(e, t, r, n, o) {
    var i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
    if (e.indexOf("auto") === -1)
        return e;
    var s = V(r, n, i, o)
      , f = {
        top: {
            width: s.width,
            height: t.top - s.top
        },
        right: {
            width: s.right - t.right,
            height: s.height
        },
        bottom: {
            width: s.width,
            height: s.bottom - t.bottom
        },
        left: {
            width: t.left - s.left,
            height: s.height
        }
    }
      , a = Object.keys(f).map(function(d) {
        return g({
            key: d
        }, f[d], {
            area: Ee(f[d])
        })
    }).sort(function(d, c) {
        return c.area - d.area
    })
      , l = a.filter(function(d) {
        var c = d.width
          , h = d.height;
        return c >= r.clientWidth && h >= r.clientHeight
    })
      , p = l.length > 0 ? l[0].key : a[0].key
      , u = e.split("-")[1];
    return p + (u ? "-" + u : "")
}
function te(e, t, r) {
    var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null
      , o = n ? Z(t) : D(t, X(r));
    return k(r, o, n)
}
function re(e) {
    var t = e.ownerDocument.defaultView
      , r = t.getComputedStyle(e)
      , n = parseFloat(r.marginTop || 0) + parseFloat(r.marginBottom || 0)
      , o = parseFloat(r.marginLeft || 0) + parseFloat(r.marginRight || 0)
      , i = {
        width: e.offsetWidth + o,
        height: e.offsetHeight + n
    };
    return i
}
function N(e) {
    var t = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    return e.replace(/left|right|bottom|top/g, function(r) {
        return t[r]
    })
}
function ne(e, t, r) {
    r = r.split("-")[0];
    var n = re(e)
      , o = {
        width: n.width,
        height: n.height
    }
      , i = ["right", "left"].indexOf(r) !== -1
      , s = i ? "top" : "left"
      , f = i ? "left" : "top"
      , a = i ? "height" : "width"
      , l = i ? "width" : "height";
    return o[s] = t[s] + t[a] / 2 - n[a] / 2,
    r === f ? o[f] = t[f] - n[l] : o[f] = t[N(f)],
    o
}
function M(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0]
}
function Oe(e, t, r) {
    if (Array.prototype.findIndex)
        return e.findIndex(function(o) {
            return o[t] === r
        });
    var n = M(e, function(o) {
        return o[t] === r
    });
    return e.indexOf(n)
}
function ie(e, t, r) {
    var n = r === void 0 ? e : e.slice(0, Oe(e, "name", r));
    return n.forEach(function(o) {
        o.function;
        var i = o.function || o.fn;
        o.enabled && K(i) && (t.offsets.popper = y(t.offsets.popper),
        t.offsets.reference = y(t.offsets.reference),
        t = i(t, o))
    }),
    t
}
function xe() {
    if (!this.state.isDestroyed) {
        var e = {
            instance: this,
            styles: {},
            arrowStyles: {},
            attributes: {},
            flipped: !1,
            offsets: {}
        };
        e.offsets.reference = te(this.state, this.popper, this.reference, this.options.positionFixed),
        e.placement = ee(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding),
        e.originalPlacement = e.placement,
        e.positionFixed = this.options.positionFixed,
        e.offsets.popper = ne(this.popper, e.offsets.reference, e.placement),
        e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute",
        e = ie(this.modifiers, e),
        this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0,
        this.options.onCreate(e))
    }
}
function oe(e, t) {
    return e.some(function(r) {
        var n = r.name
          , o = r.enabled;
        return o && n === t
    })
}
function $(e) {
    for (var t = [!1, "ms", "Webkit", "Moz", "O"], r = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
        var o = t[n]
          , i = o ? "" + o + r : e;
        if (typeof document.body.style[i] != "undefined")
            return i
    }
    return null
}
function Pe() {
    return this.state.isDestroyed = !0,
    oe(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"),
    this.popper.style.position = "",
    this.popper.style.top = "",
    this.popper.style.left = "",
    this.popper.style.right = "",
    this.popper.style.bottom = "",
    this.popper.style.willChange = "",
    this.popper.style[$("transform")] = ""),
    this.disableEventListeners(),
    this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
    this
}
function se(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window
}
function fe(e, t, r, n) {
    var o = e.nodeName === "BODY"
      , i = o ? e.ownerDocument.defaultView : e;
    i.addEventListener(t, r, {
        passive: !0
    }),
    o || fe(C(i.parentNode), t, r, n),
    n.push(i)
}
function Se(e, t, r, n) {
    r.updateBound = n,
    se(e).addEventListener("resize", r.updateBound, {
        passive: !0
    });
    var o = C(e);
    return fe(o, "scroll", r.updateBound, r.scrollParents),
    r.scrollElement = o,
    r.eventsEnabled = !0,
    r
}
function Le() {
    this.state.eventsEnabled || (this.state = Se(this.reference, this.options, this.state, this.scheduleUpdate))
}
function Te(e, t) {
    return se(e).removeEventListener("resize", t.updateBound),
    t.scrollParents.forEach(function(r) {
        r.removeEventListener("scroll", t.updateBound)
    }),
    t.updateBound = null,
    t.scrollParents = [],
    t.scrollElement = null,
    t.eventsEnabled = !1,
    t
}
function Ce() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate),
    this.state = Te(this.reference, this.state))
}
function j(e) {
    return e !== "" && !isNaN(parseFloat(e)) && isFinite(e)
}
function H(e, t) {
    Object.keys(t).forEach(function(r) {
        var n = "";
        ["width", "height", "top", "right", "bottom", "left"].indexOf(r) !== -1 && j(t[r]) && (n = "px"),
        e.style[r] = t[r] + n
    })
}
function Me(e, t) {
    Object.keys(t).forEach(function(r) {
        var n = t[r];
        n !== !1 ? e.setAttribute(r, t[r]) : e.removeAttribute(r)
    })
}
function De(e) {
    return H(e.instance.popper, e.styles),
    Me(e.instance.popper, e.attributes),
    e.arrowElement && Object.keys(e.arrowStyles).length && H(e.arrowElement, e.arrowStyles),
    e
}
function Ne(e, t, r, n, o) {
    var i = te(o, t, e, r.positionFixed)
      , s = ee(r.placement, i, t, e, r.modifiers.flip.boundariesElement, r.modifiers.flip.padding);
    return t.setAttribute("x-placement", s),
    H(t, {
        position: r.positionFixed ? "fixed" : "absolute"
    }),
    r
}
function Be(e, t) {
    var r = e.offsets
      , n = r.popper
      , o = r.reference
      , i = Math.round
      , s = Math.floor
      , f = function(w) {
        return w
    }
      , a = i(o.width)
      , l = i(n.width)
      , p = ["left", "right"].indexOf(e.placement) !== -1
      , u = e.placement.indexOf("-") !== -1
      , d = a % 2 === l % 2
      , c = a % 2 === 1 && l % 2 === 1
      , h = t ? p || u || d ? i : s : f
      , v = t ? i : f;
    return {
        left: h(c && !u && t ? n.left - 1 : n.left),
        top: v(n.top),
        bottom: v(n.bottom),
        right: h(n.right)
    }
}
var Fe = T && /Firefox/i.test(navigator.userAgent);
function Ae(e, t) {
    var r = t.x
      , n = t.y
      , o = e.offsets.popper
      , i = M(e.instance.modifiers, function(E) {
        return E.name === "applyStyle"
    }).gpuAcceleration
      , s = i !== void 0 ? i : t.gpuAcceleration
      , f = x(e.instance.popper)
      , a = W(f)
      , l = {
        position: o.position
    }
      , p = Be(e, window.devicePixelRatio < 2 || !Fe)
      , u = r === "bottom" ? "top" : "bottom"
      , d = n === "right" ? "left" : "right"
      , c = $("transform")
      , h = void 0
      , v = void 0;
    if (u === "bottom" ? f.nodeName === "HTML" ? v = -f.clientHeight + p.bottom : v = -a.height + p.bottom : v = p.top,
    d === "right" ? f.nodeName === "HTML" ? h = -f.clientWidth + p.right : h = -a.width + p.right : h = p.left,
    s && c)
        l[c] = "translate3d(" + h + "px, " + v + "px, 0)",
        l[u] = 0,
        l[d] = 0,
        l.willChange = "transform";
    else {
        var b = u === "bottom" ? -1 : 1
          , w = d === "right" ? -1 : 1;
        l[u] = v * b,
        l[d] = h * w,
        l.willChange = u + ", " + d
    }
    var m = {
        "x-placement": e.placement
    };
    return e.attributes = g({}, m, e.attributes),
    e.styles = g({}, l, e.styles),
    e.arrowStyles = g({}, e.offsets.arrow, e.arrowStyles),
    e
}
function ae(e, t, r) {
    var n = M(e, function(f) {
        var a = f.name;
        return a === t
    })
      , o = !!n && e.some(function(f) {
        return f.name === r && f.enabled && f.order < n.order
    });
    if (!o)
        var i = "`" + t + "`"
          , s = "`" + r + "`";
    return o
}
function Re(e, t) {
    var r;
    if (!ae(e.instance.modifiers, "arrow", "keepTogether"))
        return e;
    var n = t.element;
    if (typeof n == "string") {
        if (n = e.instance.popper.querySelector(n),
        !n)
            return e
    } else if (!e.instance.popper.contains(n))
        return e;
    var o = e.placement.split("-")[0]
      , i = e.offsets
      , s = i.popper
      , f = i.reference
      , a = ["left", "right"].indexOf(o) !== -1
      , l = a ? "height" : "width"
      , p = a ? "Top" : "Left"
      , u = p.toLowerCase()
      , d = a ? "left" : "top"
      , c = a ? "bottom" : "right"
      , h = re(n)[l];
    f[c] - h < s[u] && (e.offsets.popper[u] -= s[u] - (f[c] - h)),
    f[u] + h > s[c] && (e.offsets.popper[u] += f[u] + h - s[c]),
    e.offsets.popper = y(e.offsets.popper);
    var v = f[u] + f[l] / 2 - h / 2
      , b = O(e.instance.popper)
      , w = parseFloat(b["margin" + p])
      , m = parseFloat(b["border" + p + "Width"])
      , E = v - e.offsets.popper[u] - w - m;
    return E = Math.max(Math.min(s[l] - h, E), 0),
    e.arrowElement = n,
    e.offsets.arrow = (r = {},
    S(r, u, Math.round(E)),
    S(r, d, ""),
    r),
    e
}
function We(e) {
    return e === "end" ? "start" : e === "start" ? "end" : e
}
var ue = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"]
  , F = ue.slice(3);
function G(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
      , r = F.indexOf(e)
      , n = F.slice(r + 1).concat(F.slice(0, r));
    return t ? n.reverse() : n
}
var A = {
    FLIP: "flip",
    CLOCKWISE: "clockwise",
    COUNTERCLOCKWISE: "counterclockwise"
};
function He(e, t) {
    if (oe(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement)
        return e;
    var r = V(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed)
      , n = e.placement.split("-")[0]
      , o = N(n)
      , i = e.placement.split("-")[1] || ""
      , s = [];
    switch (t.behavior) {
    case A.FLIP:
        s = [n, o];
        break;
    case A.CLOCKWISE:
        s = G(n);
        break;
    case A.COUNTERCLOCKWISE:
        s = G(n, !0);
        break;
    default:
        s = t.behavior
    }
    return s.forEach(function(f, a) {
        if (n !== f || s.length === a + 1)
            return e;
        n = e.placement.split("-")[0],
        o = N(n);
        var l = e.offsets.popper
          , p = e.offsets.reference
          , u = Math.floor
          , d = n === "left" && u(l.right) > u(p.left) || n === "right" && u(l.left) < u(p.right) || n === "top" && u(l.bottom) > u(p.top) || n === "bottom" && u(l.top) < u(p.bottom)
          , c = u(l.left) < u(r.left)
          , h = u(l.right) > u(r.right)
          , v = u(l.top) < u(r.top)
          , b = u(l.bottom) > u(r.bottom)
          , w = n === "left" && c || n === "right" && h || n === "top" && v || n === "bottom" && b
          , m = ["top", "bottom"].indexOf(n) !== -1
          , E = !!t.flipVariations && (m && i === "start" && c || m && i === "end" && h || !m && i === "start" && v || !m && i === "end" && b)
          , le = !!t.flipVariationsByContent && (m && i === "start" && h || m && i === "end" && c || !m && i === "start" && b || !m && i === "end" && v)
          , _ = E || le;
        (d || w || _) && (e.flipped = !0,
        (d || w) && (n = s[a + 1]),
        _ && (i = We(i)),
        e.placement = n + (i ? "-" + i : ""),
        e.offsets.popper = g({}, e.offsets.popper, ne(e.instance.popper, e.offsets.reference, e.placement)),
        e = ie(e.instance.modifiers, e, "flip"))
    }),
    e
}
function Ie(e) {
    var t = e.offsets
      , r = t.popper
      , n = t.reference
      , o = e.placement.split("-")[0]
      , i = Math.floor
      , s = ["top", "bottom"].indexOf(o) !== -1
      , f = s ? "right" : "bottom"
      , a = s ? "left" : "top"
      , l = s ? "width" : "height";
    return r[f] < i(n[a]) && (e.offsets.popper[a] = i(n[a]) - r[l]),
    r[a] > i(n[f]) && (e.offsets.popper[a] = i(n[f])),
    e
}
function ke(e, t, r, n) {
    var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/)
      , i = +o[1]
      , s = o[2];
    if (!i)
        return e;
    if (s.indexOf("%") === 0) {
        var f = void 0;
        switch (s) {
        case "%p":
            f = r;
            break;
        case "%":
        case "%r":
        default:
            f = n
        }
        var a = y(f);
        return a[t] / 100 * i
    } else if (s === "vh" || s === "vw") {
        var l = void 0;
        return s === "vh" ? l = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : l = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        l / 100 * i
    } else
        return i
}
function Ve(e, t, r, n) {
    var o = [0, 0]
      , i = ["right", "left"].indexOf(n) !== -1
      , s = e.split(/(\+|\-)/).map(function(p) {
        return p.trim()
    })
      , f = s.indexOf(M(s, function(p) {
        return p.search(/,|\s/) !== -1
    }));
    s[f] && s[f].indexOf(",");
    var a = /\s*,\s*|\s+/
      , l = f !== -1 ? [s.slice(0, f).concat([s[f].split(a)[0]]), [s[f].split(a)[1]].concat(s.slice(f + 1))] : [s];
    return l = l.map(function(p, u) {
        var d = (u === 1 ? !i : i) ? "height" : "width"
          , c = !1;
        return p.reduce(function(h, v) {
            return h[h.length - 1] === "" && ["+", "-"].indexOf(v) !== -1 ? (h[h.length - 1] = v,
            c = !0,
            h) : c ? (h[h.length - 1] += v,
            c = !1,
            h) : h.concat(v)
        }, []).map(function(h) {
            return ke(h, d, t, r)
        })
    }),
    l.forEach(function(p, u) {
        p.forEach(function(d, c) {
            j(d) && (o[u] += d * (p[c - 1] === "-" ? -1 : 1))
        })
    }),
    o
}
function $e(e, t) {
    var r = t.offset
      , n = e.placement
      , o = e.offsets
      , i = o.popper
      , s = o.reference
      , f = n.split("-")[0]
      , a = void 0;
    return j(+r) ? a = [+r, 0] : a = Ve(r, i, s, f),
    f === "left" ? (i.top += a[0],
    i.left -= a[1]) : f === "right" ? (i.top += a[0],
    i.left += a[1]) : f === "top" ? (i.left += a[0],
    i.top -= a[1]) : f === "bottom" && (i.left += a[0],
    i.top += a[1]),
    e.popper = i,
    e
}
function je(e, t) {
    var r = t.boundariesElement || x(e.instance.popper);
    e.instance.reference === r && (r = x(r));
    var n = $("transform")
      , o = e.instance.popper.style
      , i = o.top
      , s = o.left
      , f = o[n];
    o.top = "",
    o.left = "",
    o[n] = "";
    var a = V(e.instance.popper, e.instance.reference, t.padding, r, e.positionFixed);
    o.top = i,
    o.left = s,
    o[n] = f,
    t.boundaries = a;
    var l = t.priority
      , p = e.offsets.popper
      , u = {
        primary: function(c) {
            var h = p[c];
            return p[c] < a[c] && !t.escapeWithReference && (h = Math.max(p[c], a[c])),
            S({}, c, h)
        },
        secondary: function(c) {
            var h = c === "right" ? "left" : "top"
              , v = p[h];
            return p[c] > a[c] && !t.escapeWithReference && (v = Math.min(p[h], a[c] - (c === "right" ? p.width : p.height))),
            S({}, h, v)
        }
    };
    return l.forEach(function(d) {
        var c = ["left", "top"].indexOf(d) !== -1 ? "primary" : "secondary";
        p = g({}, p, u[c](d))
    }),
    e.offsets.popper = p,
    e
}
function _e(e) {
    var t = e.placement
      , r = t.split("-")[0]
      , n = t.split("-")[1];
    if (n) {
        var o = e.offsets
          , i = o.reference
          , s = o.popper
          , f = ["bottom", "top"].indexOf(r) !== -1
          , a = f ? "left" : "top"
          , l = f ? "width" : "height"
          , p = {
            start: S({}, a, i[a]),
            end: S({}, a, i[a] + i[l] - s[l])
        };
        e.offsets.popper = g({}, s, p[n])
    }
    return e
}
function ze(e) {
    if (!ae(e.instance.modifiers, "hide", "preventOverflow"))
        return e;
    var t = e.offsets.reference
      , r = M(e.instance.modifiers, function(n) {
        return n.name === "preventOverflow"
    }).boundaries;
    if (t.bottom < r.top || t.left > r.right || t.top > r.bottom || t.right < r.left) {
        if (e.hide === !0)
            return e;
        e.hide = !0,
        e.attributes["x-out-of-boundaries"] = ""
    } else {
        if (e.hide === !1)
            return e;
        e.hide = !1,
        e.attributes["x-out-of-boundaries"] = !1
    }
    return e
}
function Ue(e) {
    var t = e.placement
      , r = t.split("-")[0]
      , n = e.offsets
      , o = n.popper
      , i = n.reference
      , s = ["left", "right"].indexOf(r) !== -1
      , f = ["top", "left"].indexOf(r) === -1;
    return o[s ? "left" : "top"] = i[r] - (f ? o[s ? "width" : "height"] : 0),
    e.placement = N(t),
    e.offsets.popper = y(o),
    e
}
var qe = {
    shift: {
        order: 100,
        enabled: !0,
        fn: _e
    },
    offset: {
        order: 200,
        enabled: !0,
        fn: $e,
        offset: 0
    },
    preventOverflow: {
        order: 300,
        enabled: !0,
        fn: je,
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent"
    },
    keepTogether: {
        order: 400,
        enabled: !0,
        fn: Ie
    },
    arrow: {
        order: 500,
        enabled: !0,
        fn: Re,
        element: "[x-arrow]"
    },
    flip: {
        order: 600,
        enabled: !0,
        fn: He,
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport",
        flipVariations: !1,
        flipVariationsByContent: !1
    },
    inner: {
        order: 700,
        enabled: !1,
        fn: Ue
    },
    hide: {
        order: 800,
        enabled: !0,
        fn: ze
    },
    computeStyle: {
        order: 850,
        enabled: !0,
        fn: Ae,
        gpuAcceleration: !0,
        x: "bottom",
        y: "right"
    },
    applyStyle: {
        order: 900,
        enabled: !0,
        fn: De,
        onLoad: Ne,
        gpuAcceleration: void 0
    }
}
  , Ye = {
    placement: "bottom",
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function() {},
    onUpdate: function() {},
    modifiers: qe
}
  , B = function() {
    function e(t, r) {
        var n = this
          , o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        be(this, e),
        this.scheduleUpdate = function() {
            return requestAnimationFrame(n.update)
        }
        ,
        this.update = ve(this.update.bind(this)),
        this.options = g({}, e.Defaults, o),
        this.state = {
            isDestroyed: !1,
            isCreated: !1,
            scrollParents: []
        },
        this.reference = t && t.jquery ? t[0] : t,
        this.popper = r && r.jquery ? r[0] : r,
        this.options.modifiers = {},
        Object.keys(g({}, e.Defaults.modifiers, o.modifiers)).forEach(function(s) {
            n.options.modifiers[s] = g({}, e.Defaults.modifiers[s] || {}, o.modifiers ? o.modifiers[s] : {})
        }),
        this.modifiers = Object.keys(this.options.modifiers).map(function(s) {
            return g({
                name: s
            }, n.options.modifiers[s])
        }).sort(function(s, f) {
            return s.order - f.order
        }),
        this.modifiers.forEach(function(s) {
            s.enabled && K(s.onLoad) && s.onLoad(n.reference, n.popper, n.options, s, n.state)
        }),
        this.update();
        var i = this.options.eventsEnabled;
        i && this.enableEventListeners(),
        this.state.eventsEnabled = i
    }
    return we(e, [{
        key: "update",
        value: function() {
            return xe.call(this)
        }
    }, {
        key: "destroy",
        value: function() {
            return Pe.call(this)
        }
    }, {
        key: "enableEventListeners",
        value: function() {
            return Le.call(this)
        }
    }, {
        key: "disableEventListeners",
        value: function() {
            return Ce.call(this)
        }
    }]),
    e
}();
B.Utils = (typeof window != "undefined" ? window : global).PopperUtils;
B.placements = ue;
B.Defaults = Ye;
const Ge = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: B
}, Symbol.toStringTag, {
    value: "Module"
}));
export {B as P, Ge as p};
//# sourceMappingURL=popper-D5tFIuWb.js.map
 const h = "modulepreload"
  , E = function(i) {
    return "/build/" + i
}
  , a = {}
  , y = function(u, s, v) {
    let l = Promise.resolve();
    if (s && s.length > 0) {
        document.getElementsByTagName("link");
        const e = document.querySelector("meta[property=csp-nonce]")
          , t = (e == null ? void 0 : e.nonce) || (e == null ? void 0 : e.getAttribute("nonce"));
        l = Promise.allSettled(s.map(r => {
            if (r = E(r),
            r in a)
                return;
            a[r] = !0;
            const o = r.endsWith(".css")
              , d = o ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${r}"]${d}`))
                return;
            const n = document.createElement("link");
            if (n.rel = o ? "stylesheet" : h,
            o || (n.as = "script"),
            n.crossOrigin = "",
            n.href = r,
            t && n.setAttribute("nonce", t),
            document.head.appendChild(n),
            o)
                return new Promise( (f, m) => {
                    n.addEventListener("load", f),
                    n.addEventListener("error", () => m(new Error(`Unable to preload CSS for ${r}`)))
                }
                )
        }
        ))
    }
    function c(e) {
        const t = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (t.payload = e,
        window.dispatchEvent(t),
        !t.defaultPrevented)
            throw e
    }
    return l.then(e => {
        for (const t of e || [])
            t.status === "rejected" && c(t.reason);
        return u().catch(c)
    }
    )
};
export {y as _};
//# sourceMappingURL=preload-helper-DPi8upcZ.js.map, const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["assets/owl.carousel.parts-DtZ5Km4f.js", "assets/owl.carousel-B502EvXU.css"]))) => i.map(i => d[i]);
import {_ as d} from "./preload-helper-DPi8upcZ.js";
import {o as p, g as l, s as m, p as r, f} from "./imaios-global-BEKmHNS5.js";
import "./sha256-DHPrLCgn.js";
import "./_commonjsHelpers-Chg3vePA.js";
import "./utils-BACTbHDn.js";
function c() {
    document.querySelectorAll('[data-imaios-app-container="quicklinks"]').length !== 0 && (g(),
    h())
}
p( () => {
    l("quick-links-has-been-initialized") !== !0 && (m("quick-links-has-been-initialized", !0),
    window.requestIdleCallback ? window.requestIdleCallback(c) : setTimeout(function() {
        c()
    }, 1e3))
}
);
function g() {
    r.subscribe(r, "quicklinks-added", ({selector: t, contentElement: o}) => {
        const a = `#${t} [data-imaios-role="content"] .owl-carousel`;
        if (d( () => import("./owl.carousel.parts-DtZ5Km4f.js"), __vite__mapDeps([0, 1])).then(e => {
            window.owl = e.Carousel,
            o.style.display = "block",
            $(a).owlCarousel({
                items: 1,
                navContainer: `[data-container-name=${t}].navigation-carousel .custom-nav`,
                margin: 10,
                nav: !0,
                dots: !1,
                loop: !0,
                autoplay: !1,
                mouseDrag: !1,
                touchDrag: !1,
                navRewind: !1
            }).trigger("to.owl.carousel", [0, 0]);
            const i = document.querySelector("#" + t + ' [data-imaios-role="placeholder"]');
            i && (i.style.display = "none",
            i.innerHTML = "",
            i.remove())
        }
        ),
        t === "desktop") {
            const e = document.getElementById(t);
            e !== null && (ResizeObserver ? new ResizeObserver( () => s(e)).observe(e) : window.addEventListener("resize", () => s(e))),
            s(e)
        }
        document.querySelectorAll(".quick-links-owl-item .quick-link").forEach(e => {
            e.addEventListener("click", () => {
                t === "desktop" && r.publish("analytics-quicklinks", {
                    currency: e.getAttribute("data-ga4-param-currency"),
                    value: e.getAttribute("data-ga4-param-value"),
                    product: e.getAttribute("data-ga4-param-product"),
                    module: e.getAttribute("data-ga4-param-module"),
                    access: e.getAttribute("data-ga4-param-access")
                })
            }
            )
        }
        ),
        document.querySelectorAll("[data-quick-link]").forEach(e => {
            e.addEventListener("click", () => w(e)),
            e.addEventListener("mouseover", () => k(e)),
            e.addEventListener("mouseout", y)
        }
        ),
        l("login-manager") && l("login-manager").deleteSubscriptionsTags()
    }
    )
}
function w(t) {
    document.querySelectorAll(`[data-panel="panel-${t.dataset.quickLink}"]`).forEach(o => {
        let a = ".owl-carousel-custom";
        $(a).owlCarousel().trigger("to.owl.carousel", [o.dataset.carouselPosition, 0]),
        $(".owl-prev").click(function() {
            $(a).owlCarousel().trigger("to.owl.carousel", [0, 0])
        })
    }
    )
}
function k(t) {
    let o = document.querySelector(`[data-panel="panel-${t.dataset.quickLink}"]`).dataset.title.toLowerCase();
    document.querySelectorAll(".slide-panel-title-preview").forEach(e => {
        e.innerHTML = o.charAt(0).toUpperCase() + o.slice(1)
    }
    )
}
function y() {
    document.querySelectorAll(".slide-panel-title-preview").forEach(t => {
        t.innerHTML = t.dataset.titleNoHover
    }
    )
}
function u(t, o, a, e) {
    o.style.maxHeight = o.clientWidth * a + "px";
    const i = o.clientWidth * a - e * 2 + "px";
    t.forEach(n => {
        n.style.maxHeight = i,
        n.style.overflow = "auto"
    }
    )
}
function s(t) {
    let o = !1;
    const a = 1.55
      , e = 24;
    if (window.requestAnimationFrame) {
        if (!o) {
            o = !0;
            const i = t.querySelector(".cardBodyCarousel")
              , n = t.querySelectorAll(".cardBodyCarousel .quick-links-owl-item");
            window.requestAnimationFrame( () => {
                o = !1,
                u(n, i, a, e)
            }
            )
        }
    } else {
        const i = t.querySelector(".cardBodyCarousel")
          , n = t.querySelectorAll(".cardBodyCarousel .quick-links-owl-item");
        u(n, i, a, e)
    }
}
function h() {
    const t = document.querySelectorAll('[data-imaios-app-container="quicklinks"]')
      , o = l("application").replace("-", "");
    f(window.imaiosRouting.getFosJsRoutingUrlWithSiteaccess("get_quicklinks", {
        application: o
    })).then(a => a.text()).then(a => {
        t.forEach(e => {
            const i = e.querySelector('[data-imaios-role="content"]');
            i.innerHTML = a,
            r.publish("quicklinks-added", {
                selector: e.id,
                contentElement: i
            })
        }
        )
    }
    )
}
export {c as i};
//# sourceMappingURL=quick-links-js-Bz3MAHvD.js.map, /**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function Xs(e) {
    const t = Object.create(null);
    for (const s of e.split(","))
        t[s] = 1;
    return s => s in t
}
const Y = {}
  , Rt = []
  , Me = () => {}
  , el = () => !1
  , cs = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97)
  , Xn = e => e.startsWith("onUpdate:")
  , se = Object.assign
  , Zn = (e, t) => {
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1)
}
  , tl = Object.prototype.hasOwnProperty
  , z = (e, t) => tl.call(e, t)
  , D = Array.isArray
  , Ot = e => kt(e) === "[object Map]"
  , Ct = e => kt(e) === "[object Set]"
  , Ar = e => kt(e) === "[object Date]"
  , sl = e => kt(e) === "[object RegExp]"
  , W = e => typeof e == "function"
  , oe = e => typeof e == "string"
  , Ve = e => typeof e == "symbol"
  , te = e => e !== null && typeof e == "object"
  , Qn = e => (te(e) || W(e)) && W(e.then) && W(e.catch)
  , gi = Object.prototype.toString
  , kt = e => gi.call(e)
  , nl = e => kt(e).slice(8, -1)
  , Zs = e => kt(e) === "[object Object]"
  , zn = e => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , Pt = Xs(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , Qs = e => {
    const t = Object.create(null);
    return s => t[s] || (t[s] = e(s))
}
  , rl = /-(\w)/g
  , ve = Qs(e => e.replace(rl, (t, s) => s ? s.toUpperCase() : ""))
  , il = /\B([A-Z])/g
  , Ae = Qs(e => e.replace(il, "-$1").toLowerCase())
  , zs = Qs(e => e.charAt(0).toUpperCase() + e.slice(1))
  , Ss = Qs(e => e ? `on${zs(e)}` : "")
  , Te = (e, t) => !Object.is(e, t)
  , Nt = (e, ...t) => {
    for (let s = 0; s < e.length; s++)
        e[s](...t)
}
  , On = (e, t, s, n=!1) => {
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        writable: n,
        value: s
    })
}
  , Ms = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
  , Is = e => {
    const t = oe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t
}
;
let Rr;
const en = () => Rr || (Rr = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {})
  , ol = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol"
  , ll = Xs(ol);
function tn(e) {
    if (D(e)) {
        const t = {};
        for (let s = 0; s < e.length; s++) {
            const n = e[s]
              , r = oe(n) ? al(n) : tn(n);
            if (r)
                for (const i in r)
                    t[i] = r[i]
        }
        return t
    } else if (oe(e) || te(e))
        return e
}
const cl = /;(?![^(]*\))/g
  , fl = /:([^]+)/
  , ul = /\/\*[^]*?\*\//g;
function al(e) {
    const t = {};
    return e.replace(ul, "").split(cl).forEach(s => {
        if (s) {
            const n = s.split(fl);
            n.length > 1 && (t[n[0].trim()] = n[1].trim())
        }
    }
    ),
    t
}
function sn(e) {
    let t = "";
    if (oe(e))
        t = e;
    else if (D(e))
        for (let s = 0; s < e.length; s++) {
            const n = sn(e[s]);
            n && (t += n + " ")
        }
    else if (te(e))
        for (const s in e)
            e[s] && (t += s + " ");
    return t.trim()
}
function eu(e) {
    if (!e)
        return null;
    let {class: t, style: s} = e;
    return t && !oe(t) && (e.class = sn(t)),
    s && (e.style = tn(s)),
    e
}
const dl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , hl = Xs(dl);
function _i(e) {
    return !!e || e === ""
}
function pl(e, t) {
    if (e.length !== t.length)
        return !1;
    let s = !0;
    for (let n = 0; s && n < e.length; n++)
        s = lt(e[n], t[n]);
    return s
}
function lt(e, t) {
    if (e === t)
        return !0;
    let s = Ar(e)
      , n = Ar(t);
    if (s || n)
        return s && n ? e.getTime() === t.getTime() : !1;
    if (s = Ve(e),
    n = Ve(t),
    s || n)
        return e === t;
    if (s = D(e),
    n = D(t),
    s || n)
        return s && n ? pl(e, t) : !1;
    if (s = te(e),
    n = te(t),
    s || n) {
        if (!s || !n)
            return !1;
        const r = Object.keys(e).length
          , i = Object.keys(t).length;
        if (r !== i)
            return !1;
        for (const o in e) {
            const l = e.hasOwnProperty(o)
              , c = t.hasOwnProperty(o);
            if (l && !c || !l && c || !lt(e[o], t[o]))
                return !1
        }
    }
    return String(e) === String(t)
}
function nn(e, t) {
    return e.findIndex(s => lt(s, t))
}
const mi = e => !!(e && e.__v_isRef === !0)
  , gl = e => oe(e) ? e : e == null ? "" : D(e) || te(e) && (e.toString === gi || !W(e.toString)) ? mi(e) ? gl(e.value) : JSON.stringify(e, bi, 2) : String(e)
  , bi = (e, t) => mi(t) ? bi(e, t.value) : Ot(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce( (s, [n,r], i) => (s[mn(n, i) + " =>"] = r,
    s), {})
} : Ct(t) ? {
    [`Set(${t.size})`]: [...t.values()].map(s => mn(s))
} : Ve(t) ? mn(t) : te(t) && !D(t) && !Zs(t) ? String(t) : t
  , mn = (e, t="") => {
    var s;
    return Ve(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
}
;
function _l(e) {
    return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e)
}
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let me;
class yi {
    constructor(t=!1) {
        this.detached = t,
        this._active = !0,
        this._on = 0,
        this.effects = [],
        this.cleanups = [],
        this._isPaused = !1,
        this.parent = me,
        !t && me && (this.index = (me.scopes || (me.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    pause() {
        if (this._active) {
            this._isPaused = !0;
            let t, s;
            if (this.scopes)
                for (t = 0,
                s = this.scopes.length; t < s; t++)
                    this.scopes[t].pause();
            for (t = 0,
            s = this.effects.length; t < s; t++)
                this.effects[t].pause()
        }
    }
    resume() {
        if (this._active && this._isPaused) {
            this._isPaused = !1;
            let t, s;
            if (this.scopes)
                for (t = 0,
                s = this.scopes.length; t < s; t++)
                    this.scopes[t].resume();
            for (t = 0,
            s = this.effects.length; t < s; t++)
                this.effects[t].resume()
        }
    }
    run(t) {
        if (this._active) {
            const s = me;
            try {
                return me = this,
                t()
            } finally {
                me = s
            }
        }
    }
    on() {
        ++this._on === 1 && (this.prevScope = me,
        me = this)
    }
    off() {
        this._on > 0 && --this._on === 0 && (me = this.prevScope,
        this.prevScope = void 0)
    }
    stop(t) {
        if (this._active) {
            this._active = !1;
            let s, n;
            for (s = 0,
            n = this.effects.length; s < n; s++)
                this.effects[s].stop();
            for (this.effects.length = 0,
            s = 0,
            n = this.cleanups.length; s < n; s++)
                this.cleanups[s]();
            if (this.cleanups.length = 0,
            this.scopes) {
                for (s = 0,
                n = this.scopes.length; s < n; s++)
                    this.scopes[s].stop(!0);
                this.scopes.length = 0
            }
            if (!this.detached && this.parent && !t) {
                const r = this.parent.scopes.pop();
                r && r !== this && (this.parent.scopes[this.index] = r,
                r.index = this.index)
            }
            this.parent = void 0
        }
    }
}
function tu(e) {
    return new yi(e)
}
function ml() {
    return me
}
function su(e, t=!1) {
    me && me.cleanups.push(e)
}
let ie;
const bn = new WeakSet;
class Fs {
    constructor(t) {
        this.fn = t,
        this.deps = void 0,
        this.depsTail = void 0,
        this.flags = 5,
        this.next = void 0,
        this.cleanup = void 0,
        this.scheduler = void 0,
        me && me.active && me.effects.push(this)
    }
    pause() {
        this.flags |= 64
    }
    resume() {
        this.flags & 64 && (this.flags &= -65,
        bn.has(this) && (bn.delete(this),
        this.trigger()))
    }
    notify() {
        this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ci(this)
    }
    run() {
        if (!(this.flags & 1))
            return this.fn();
        this.flags |= 2,
        Or(this),
        Ti(this);
        const t = ie
          , s = He;
        ie = this,
        He = !0;
        try {
            return this.fn()
        } finally {
            Ei(this),
            ie = t,
            He = s,
            this.flags &= -3
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep)
                sr(t);
            this.deps = this.depsTail = void 0,
            Or(this),
            this.onStop && this.onStop(),
            this.flags &= -2
        }
    }
    trigger() {
        this.flags & 64 ? bn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
    }
    runIfDirty() {
        Pn(this) && this.run()
    }
    get dirty() {
        return Pn(this)
    }
}
let vi = 0, Jt, Yt;
function Ci(e, t=!1) {
    if (e.flags |= 8,
    t) {
        e.next = Yt,
        Yt = e;
        return
    }
    e.next = Jt,
    Jt = e
}
function er() {
    vi++
}
function tr() {
    if (--vi > 0)
        return;
    if (Yt) {
        let t = Yt;
        for (Yt = void 0; t; ) {
            const s = t.next;
            t.next = void 0,
            t.flags &= -9,
            t = s
        }
    }
    let e;
    for (; Jt; ) {
        let t = Jt;
        for (Jt = void 0; t; ) {
            const s = t.next;
            if (t.next = void 0,
            t.flags &= -9,
            t.flags & 1)
                try {
                    t.trigger()
                } catch (n) {
                    e || (e = n)
                }
            t = s
        }
    }
    if (e)
        throw e
}
function Ti(e) {
    for (let t = e.deps; t; t = t.nextDep)
        t.version = -1,
        t.prevActiveLink = t.dep.activeLink,
        t.dep.activeLink = t
}
function Ei(e) {
    let t, s = e.depsTail, n = s;
    for (; n; ) {
        const r = n.prevDep;
        n.version === -1 ? (n === s && (s = r),
        sr(n),
        bl(n)) : t = n,
        n.dep.activeLink = n.prevActiveLink,
        n.prevActiveLink = void 0,
        n = r
    }
    e.deps = t,
    e.depsTail = s
}
function Pn(e) {
    for (let t = e.deps; t; t = t.nextDep)
        if (t.dep.version !== t.version || t.dep.computed && (xi(t.dep.computed) || t.dep.version !== t.version))
            return !0;
    return !!e._dirty
}
function xi(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17,
    e.globalVersion === ts) || (e.globalVersion = ts,
    !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Pn(e))))
        return;
    e.flags |= 2;
    const t = e.dep
      , s = ie
      , n = He;
    ie = e,
    He = !0;
    try {
        Ti(e);
        const r = e.fn(e._value);
        (t.version === 0 || Te(r, e._value)) && (e.flags |= 128,
        e._value = r,
        t.version++)
    } catch (r) {
        throw t.version++,
        r
    } finally {
        ie = s,
        He = n,
        Ei(e),
        e.flags &= -3
    }
}
function sr(e, t=!1) {
    const {dep: s, prevSub: n, nextSub: r} = e;
    if (n && (n.nextSub = r,
    e.prevSub = void 0),
    r && (r.prevSub = n,
    e.nextSub = void 0),
    s.subs === e && (s.subs = n,
    !n && s.computed)) {
        s.computed.flags &= -5;
        for (let i = s.computed.deps; i; i = i.nextDep)
            sr(i, !0)
    }
    !t && !--s.sc && s.map && s.map.delete(s.key)
}
function bl(e) {
    const {prevDep: t, nextDep: s} = e;
    t && (t.nextDep = s,
    e.prevDep = void 0),
    s && (s.prevDep = t,
    e.nextDep = void 0)
}
function nu(e, t) {
    e.effect instanceof Fs && (e = e.effect.fn);
    const s = new Fs(e);
    t && se(s, t);
    try {
        s.run()
    } catch (r) {
        throw s.stop(),
        r
    }
    const n = s.run.bind(s);
    return n.effect = s,
    n
}
function ru(e) {
    e.effect.stop()
}
let He = !0;
const Si = [];
function Xe() {
    Si.push(He),
    He = !1
}
function Ze() {
    const e = Si.pop();
    He = e === void 0 ? !0 : e
}
function Or(e) {
    const {cleanup: t} = e;
    if (e.cleanup = void 0,
    t) {
        const s = ie;
        ie = void 0;
        try {
            t()
        } finally {
            ie = s
        }
    }
}
let ts = 0;
class yl {
    constructor(t, s) {
        this.sub = t,
        this.dep = s,
        this.version = s.version,
        this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0
    }
}
class rn {
    constructor(t) {
        this.computed = t,
        this.version = 0,
        this.activeLink = void 0,
        this.subs = void 0,
        this.map = void 0,
        this.key = void 0,
        this.sc = 0,
        this.__v_skip = !0
    }
    track(t) {
        if (!ie || !He || ie === this.computed)
            return;
        let s = this.activeLink;
        if (s === void 0 || s.sub !== ie)
            s = this.activeLink = new yl(ie,this),
            ie.deps ? (s.prevDep = ie.depsTail,
            ie.depsTail.nextDep = s,
            ie.depsTail = s) : ie.deps = ie.depsTail = s,
            wi(s);
        else if (s.version === -1 && (s.version = this.version,
        s.nextDep)) {
            const n = s.nextDep;
            n.prevDep = s.prevDep,
            s.prevDep && (s.prevDep.nextDep = n),
            s.prevDep = ie.depsTail,
            s.nextDep = void 0,
            ie.depsTail.nextDep = s,
            ie.depsTail = s,
            ie.deps === s && (ie.deps = n)
        }
        return s
    }
    trigger(t) {
        this.version++,
        ts++,
        this.notify(t)
    }
    notify(t) {
        er();
        try {
            for (let s = this.subs; s; s = s.prevSub)
                s.sub.notify() && s.sub.dep.notify()
        } finally {
            tr()
        }
    }
}
function wi(e) {
    if (e.dep.sc++,
    e.sub.flags & 4) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let n = t.deps; n; n = n.nextDep)
                wi(n)
        }
        const s = e.dep.subs;
        s !== e && (e.prevSub = s,
        s && (s.nextSub = e)),
        e.dep.subs = e
    }
}
const Ls = new WeakMap
  , gt = Symbol("")
  , Nn = Symbol("")
  , ss = Symbol("");
function be(e, t, s) {
    if (He && ie) {
        let n = Ls.get(e);
        n || Ls.set(e, n = new Map);
        let r = n.get(s);
        r || (n.set(s, r = new rn),
        r.map = n,
        r.key = s),
        r.track()
    }
}
function qe(e, t, s, n, r, i) {
    const o = Ls.get(e);
    if (!o) {
        ts++;
        return
    }
    const l = c => {
        c && c.trigger()
    }
    ;
    if (er(),
    t === "clear")
        o.forEach(l);
    else {
        const c = D(e)
          , a = c && zn(s);
        if (c && s === "length") {
            const f = Number(n);
            o.forEach( (d, _) => {
                (_ === "length" || _ === ss || !Ve(_) && _ >= f) && l(d)
            }
            )
        } else
            switch ((s !== void 0 || o.has(void 0)) && l(o.get(s)),
            a && l(o.get(ss)),
            t) {
            case "add":
                c ? a && l(o.get("length")) : (l(o.get(gt)),
                Ot(e) && l(o.get(Nn)));
                break;
            case "delete":
                c || (l(o.get(gt)),
                Ot(e) && l(o.get(Nn)));
                break;
            case "set":
                Ot(e) && l(o.get(gt));
                break
            }
    }
    tr()
}
function vl(e, t) {
    const s = Ls.get(e);
    return s && s.get(t)
}
function Et(e) {
    const t = Z(e);
    return t === e ? t : (be(t, "iterate", ss),
    Ie(e) ? t : t.map(de))
}
function on(e) {
    return be(e = Z(e), "iterate", ss),
    e
}
const Cl = {
    __proto__: null,
    [Symbol.iterator]() {
        return yn(this, Symbol.iterator, de)
    },
    concat(...e) {
        return Et(this).concat(...e.map(t => D(t) ? Et(t) : t))
    },
    entries() {
        return yn(this, "entries", e => (e[1] = de(e[1]),
        e))
    },
    every(e, t) {
        return We(this, "every", e, t, void 0, arguments)
    },
    filter(e, t) {
        return We(this, "filter", e, t, s => s.map(de), arguments)
    },
    find(e, t) {
        return We(this, "find", e, t, de, arguments)
    },
    findIndex(e, t) {
        return We(this, "findIndex", e, t, void 0, arguments)
    },
    findLast(e, t) {
        return We(this, "findLast", e, t, de, arguments)
    },
    findLastIndex(e, t) {
        return We(this, "findLastIndex", e, t, void 0, arguments)
    },
    forEach(e, t) {
        return We(this, "forEach", e, t, void 0, arguments)
    },
    includes(...e) {
        return vn(this, "includes", e)
    },
    indexOf(...e) {
        return vn(this, "indexOf", e)
    },
    join(e) {
        return Et(this).join(e)
    },
    lastIndexOf(...e) {
        return vn(this, "lastIndexOf", e)
    },
    map(e, t) {
        return We(this, "map", e, t, void 0, arguments)
    },
    pop() {
        return jt(this, "pop")
    },
    push(...e) {
        return jt(this, "push", e)
    },
    reduce(e, ...t) {
        return Pr(this, "reduce", e, t)
    },
    reduceRight(e, ...t) {
        return Pr(this, "reduceRight", e, t)
    },
    shift() {
        return jt(this, "shift")
    },
    some(e, t) {
        return We(this, "some", e, t, void 0, arguments)
    },
    splice(...e) {
        return jt(this, "splice", e)
    },
    toReversed() {
        return Et(this).toReversed()
    },
    toSorted(e) {
        return Et(this).toSorted(e)
    },
    toSpliced(...e) {
        return Et(this).toSpliced(...e)
    },
    unshift(...e) {
        return jt(this, "unshift", e)
    },
    values() {
        return yn(this, "values", de)
    }
};
function yn(e, t, s) {
    const n = on(e)
      , r = n[t]();
    return n !== e && !Ie(e) && (r._next = r.next,
    r.next = () => {
        const i = r._next();
        return i.value && (i.value = s(i.value)),
        i
    }
    ),
    r
}
const Tl = Array.prototype;
function We(e, t, s, n, r, i) {
    const o = on(e)
      , l = o !== e && !Ie(e)
      , c = o[t];
    if (c !== Tl[t]) {
        const d = c.apply(e, i);
        return l ? de(d) : d
    }
    let a = s;
    o !== e && (l ? a = function(d, _) {
        return s.call(this, de(d), _, e)
    }
    : s.length > 2 && (a = function(d, _) {
        return s.call(this, d, _, e)
    }
    ));
    const f = c.call(o, a, n);
    return l && r ? r(f) : f
}
function Pr(e, t, s, n) {
    const r = on(e);
    let i = s;
    return r !== e && (Ie(e) ? s.length > 3 && (i = function(o, l, c) {
        return s.call(this, o, l, c, e)
    }
    ) : i = function(o, l, c) {
        return s.call(this, o, de(l), c, e)
    }
    ),
    r[t](i, ...n)
}
function vn(e, t, s) {
    const n = Z(e);
    be(n, "iterate", ss);
    const r = n[t](...s);
    return (r === -1 || r === !1) && rr(s[0]) ? (s[0] = Z(s[0]),
    n[t](...s)) : r
}
function jt(e, t, s=[]) {
    Xe(),
    er();
    const n = Z(e)[t].apply(e, s);
    return tr(),
    Ze(),
    n
}
const El = Xs("__proto__,__v_isRef,__isVue")
  , Ai = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Ve));
function xl(e) {
    Ve(e) || (e = String(e));
    const t = Z(this);
    return be(t, "has", e),
    t.hasOwnProperty(e)
}
class Ri {
    constructor(t=!1, s=!1) {
        this._isReadonly = t,
        this._isShallow = s
    }
    get(t, s, n) {
        if (s === "__v_skip")
            return t.__v_skip;
        const r = this._isReadonly
          , i = this._isShallow;
        if (s === "__v_isReactive")
            return !r;
        if (s === "__v_isReadonly")
            return r;
        if (s === "__v_isShallow")
            return i;
        if (s === "__v_raw")
            return n === (r ? i ? Fi : Ii : i ? Mi : Ni).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
        const o = D(t);
        if (!r) {
            let c;
            if (o && (c = Cl[s]))
                return c;
            if (s === "hasOwnProperty")
                return xl
        }
        const l = Reflect.get(t, s, ae(t) ? t : n);
        return (Ve(s) ? Ai.has(s) : El(s)) || (r || be(t, "get", s),
        i) ? l : ae(l) ? o && zn(s) ? l : l.value : te(l) ? r ? Li(l) : nr(l) : l
    }
}
class Oi extends Ri {
    constructor(t=!1) {
        super(!1, t)
    }
    set(t, s, n, r) {
        let i = t[s];
        if (!this._isShallow) {
            const c = ct(i);
            if (!Ie(n) && !ct(n) && (i = Z(i),
            n = Z(n)),
            !D(t) && ae(i) && !ae(n))
                return c ? !1 : (i.value = n,
                !0)
        }
        const o = D(t) && zn(s) ? Number(s) < t.length : z(t, s)
          , l = Reflect.set(t, s, n, ae(t) ? t : r);
        return t === Z(r) && (o ? Te(n, i) && qe(t, "set", s, n) : qe(t, "add", s, n)),
        l
    }
    deleteProperty(t, s) {
        const n = z(t, s);
        t[s];
        const r = Reflect.deleteProperty(t, s);
        return r && n && qe(t, "delete", s, void 0),
        r
    }
    has(t, s) {
        const n = Reflect.has(t, s);
        return (!Ve(s) || !Ai.has(s)) && be(t, "has", s),
        n
    }
    ownKeys(t) {
        return be(t, "iterate", D(t) ? "length" : gt),
        Reflect.ownKeys(t)
    }
}
class Pi extends Ri {
    constructor(t=!1) {
        super(!0, t)
    }
    set(t, s) {
        return !0
    }
    deleteProperty(t, s) {
        return !0
    }
}
const Sl = new Oi
  , wl = new Pi
  , Al = new Oi(!0)
  , Rl = new Pi(!0)
  , Mn = e => e
  , gs = e => Reflect.getPrototypeOf(e);
function Ol(e, t, s) {
    return function(...n) {
        const r = this.__v_raw
          , i = Z(r)
          , o = Ot(i)
          , l = e === "entries" || e === Symbol.iterator && o
          , c = e === "keys" && o
          , a = r[e](...n)
          , f = s ? Mn : t ? Ds : de;
        return !t && be(i, "iterate", c ? Nn : gt),
        {
            next() {
                const {value: d, done: _} = a.next();
                return _ ? {
                    value: d,
                    done: _
                } : {
                    value: l ? [f(d[0]), f(d[1])] : f(d),
                    done: _
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function _s(e) {
    return function(...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}
function Pl(e, t) {
    const s = {
        get(r) {
            const i = this.__v_raw
              , o = Z(i)
              , l = Z(r);
            e || (Te(r, l) && be(o, "get", r),
            be(o, "get", l));
            const {has: c} = gs(o)
              , a = t ? Mn : e ? Ds : de;
            if (c.call(o, r))
                return a(i.get(r));
            if (c.call(o, l))
                return a(i.get(l));
            i !== o && i.get(r)
        },
        get size() {
            const r = this.__v_raw;
            return !e && be(Z(r), "iterate", gt),
            Reflect.get(r, "size", r)
        },
        has(r) {
            const i = this.__v_raw
              , o = Z(i)
              , l = Z(r);
            return e || (Te(r, l) && be(o, "has", r),
            be(o, "has", l)),
            r === l ? i.has(r) : i.has(r) || i.has(l)
        },
        forEach(r, i) {
            const o = this
              , l = o.__v_raw
              , c = Z(l)
              , a = t ? Mn : e ? Ds : de;
            return !e && be(c, "iterate", gt),
            l.forEach( (f, d) => r.call(i, a(f), a(d), o))
        }
    };
    return se(s, e ? {
        add: _s("add"),
        set: _s("set"),
        delete: _s("delete"),
        clear: _s("clear")
    } : {
        add(r) {
            !t && !Ie(r) && !ct(r) && (r = Z(r));
            const i = Z(this);
            return gs(i).has.call(i, r) || (i.add(r),
            qe(i, "add", r, r)),
            this
        },
        set(r, i) {
            !t && !Ie(i) && !ct(i) && (i = Z(i));
            const o = Z(this)
              , {has: l, get: c} = gs(o);
            let a = l.call(o, r);
            a || (r = Z(r),
            a = l.call(o, r));
            const f = c.call(o, r);
            return o.set(r, i),
            a ? Te(i, f) && qe(o, "set", r, i) : qe(o, "add", r, i),
            this
        },
        delete(r) {
            const i = Z(this)
              , {has: o, get: l} = gs(i);
            let c = o.call(i, r);
            c || (r = Z(r),
            c = o.call(i, r)),
            l && l.call(i, r);
            const a = i.delete(r);
            return c && qe(i, "delete", r, void 0),
            a
        },
        clear() {
            const r = Z(this)
              , i = r.size !== 0
              , o = r.clear();
            return i && qe(r, "clear", void 0, void 0),
            o
        }
    }),
    ["keys", "values", "entries", Symbol.iterator].forEach(r => {
        s[r] = Ol(r, e, t)
    }
    ),
    s
}
function ln(e, t) {
    const s = Pl(e, t);
    return (n, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(z(s, r) && r in n ? s : n, r, i)
}
const Nl = {
    get: ln(!1, !1)
}
  , Ml = {
    get: ln(!1, !0)
}
  , Il = {
    get: ln(!0, !1)
}
  , Fl = {
    get: ln(!0, !0)
}
  , Ni = new WeakMap
  , Mi = new WeakMap
  , Ii = new WeakMap
  , Fi = new WeakMap;
function Ll(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function Dl(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Ll(nl(e))
}
function nr(e) {
    return ct(e) ? e : cn(e, !1, Sl, Nl, Ni)
}
function Hl(e) {
    return cn(e, !1, Al, Ml, Mi)
}
function Li(e) {
    return cn(e, !0, wl, Il, Ii)
}
function iu(e) {
    return cn(e, !0, Rl, Fl, Fi)
}
function cn(e, t, s, n, r) {
    if (!te(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const i = Dl(e);
    if (i === 0)
        return e;
    const o = r.get(e);
    if (o)
        return o;
    const l = new Proxy(e,i === 2 ? n : s);
    return r.set(e, l),
    l
}
function _t(e) {
    return ct(e) ? _t(e.__v_raw) : !!(e && e.__v_isReactive)
}
function ct(e) {
    return !!(e && e.__v_isReadonly)
}
function Ie(e) {
    return !!(e && e.__v_isShallow)
}
function rr(e) {
    return e ? !!e.__v_raw : !1
}
function Z(e) {
    const t = e && e.__v_raw;
    return t ? Z(t) : e
}
function Vl(e) {
    return !z(e, "__v_skip") && Object.isExtensible(e) && On(e, "__v_skip", !0),
    e
}
const de = e => te(e) ? nr(e) : e
  , Ds = e => te(e) ? Li(e) : e;
function ae(e) {
    return e ? e.__v_isRef === !0 : !1
}
function ws(e) {
    return Di(e, !1)
}
function kl(e) {
    return Di(e, !0)
}
function Di(e, t) {
    return ae(e) ? e : new Bl(e,t)
}
class Bl {
    constructor(t, s) {
        this.dep = new rn,
        this.__v_isRef = !0,
        this.__v_isShallow = !1,
        this._rawValue = s ? t : Z(t),
        this._value = s ? t : de(t),
        this.__v_isShallow = s
    }
    get value() {
        return this.dep.track(),
        this._value
    }
    set value(t) {
        const s = this._rawValue
          , n = this.__v_isShallow || Ie(t) || ct(t);
        t = n ? t : Z(t),
        Te(t, s) && (this._rawValue = t,
        this._value = n ? t : de(t),
        this.dep.trigger())
    }
}
function ou(e) {
    e.dep && e.dep.trigger()
}
function ir(e) {
    return ae(e) ? e.value : e
}
function lu(e) {
    return W(e) ? e() : ir(e)
}
const Ul = {
    get: (e, t, s) => t === "__v_raw" ? e : ir(Reflect.get(e, t, s)),
    set: (e, t, s, n) => {
        const r = e[t];
        return ae(r) && !ae(s) ? (r.value = s,
        !0) : Reflect.set(e, t, s, n)
    }
};
function Hi(e) {
    return _t(e) ? e : new Proxy(e,Ul)
}
class $l {
    constructor(t) {
        this.__v_isRef = !0,
        this._value = void 0;
        const s = this.dep = new rn
          , {get: n, set: r} = t(s.track.bind(s), s.trigger.bind(s));
        this._get = n,
        this._set = r
    }
    get value() {
        return this._value = this._get()
    }
    set value(t) {
        this._set(t)
    }
}
function jl(e) {
    return new $l(e)
}
function cu(e) {
    const t = D(e) ? new Array(e.length) : {};
    for (const s in e)
        t[s] = Vi(e, s);
    return t
}
class Kl {
    constructor(t, s, n) {
        this._object = t,
        this._key = s,
        this._defaultValue = n,
        this.__v_isRef = !0,
        this._value = void 0
    }
    get value() {
        const t = this._object[this._key];
        return this._value = t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return vl(Z(this._object), this._key)
    }
}
class Wl {
    constructor(t) {
        this._getter = t,
        this.__v_isRef = !0,
        this.__v_isReadonly = !0,
        this._value = void 0
    }
    get value() {
        return this._value = this._getter()
    }
}
function fu(e, t, s) {
    return ae(e) ? e : W(e) ? new Wl(e) : te(e) && arguments.length > 1 ? Vi(e, t, s) : ws(e)
}
function Vi(e, t, s) {
    const n = e[t];
    return ae(n) ? n : new Kl(e,t,s)
}
class Gl {
    constructor(t, s, n) {
        this.fn = t,
        this.setter = s,
        this._value = void 0,
        this.dep = new rn(this),
        this.__v_isRef = !0,
        this.deps = void 0,
        this.depsTail = void 0,
        this.flags = 16,
        this.globalVersion = ts - 1,
        this.next = void 0,
        this.effect = this,
        this.__v_isReadonly = !s,
        this.isSSR = n
    }
    notify() {
        if (this.flags |= 16,
        !(this.flags & 8) && ie !== this)
            return Ci(this, !0),
            !0
    }
    get value() {
        const t = this.dep.track();
        return xi(this),
        t && (t.version = this.dep.version),
        this._value
    }
    set value(t) {
        this.setter && this.setter(t)
    }
}
function ql(e, t, s=!1) {
    let n, r;
    return W(e) ? n = e : (n = e.get,
    r = e.set),
    new Gl(n,r,s)
}
const uu = {
    GET: "get",
    HAS: "has",
    ITERATE: "iterate"
}
  , au = {
    SET: "set",
    ADD: "add",
    DELETE: "delete",
    CLEAR: "clear"
}
  , ms = {}
  , Hs = new WeakMap;
let st;
function du() {
    return st
}
function Jl(e, t=!1, s=st) {
    if (s) {
        let n = Hs.get(s);
        n || Hs.set(s, n = []),
        n.push(e)
    }
}
function Yl(e, t, s=Y) {
    const {immediate: n, deep: r, once: i, scheduler: o, augmentJob: l, call: c} = s
      , a = g => r ? g : Ie(g) || r === !1 || r === 0 ? Je(g, 1) : Je(g);
    let f, d, _, y, T = !1, v = !1;
    if (ae(e) ? (d = () => e.value,
    T = Ie(e)) : _t(e) ? (d = () => a(e),
    T = !0) : D(e) ? (v = !0,
    T = e.some(g => _t(g) || Ie(g)),
    d = () => e.map(g => {
        if (ae(g))
            return g.value;
        if (_t(g))
            return a(g);
        if (W(g))
            return c ? c(g, 2) : g()
    }
    )) : W(e) ? t ? d = c ? () => c(e, 2) : e : d = () => {
        if (_) {
            Xe();
            try {
                _()
            } finally {
                Ze()
            }
        }
        const g = st;
        st = f;
        try {
            return c ? c(e, 3, [y]) : e(y)
        } finally {
            st = g
        }
    }
    : d = Me,
    t && r) {
        const g = d
          , b = r === !0 ? 1 / 0 : r;
        d = () => Je(g(), b)
    }
    const q = ml()
      , H = () => {
        f.stop(),
        q && q.active && Zn(q.effects, f)
    }
    ;
    if (i && t) {
        const g = t;
        t = (...b) => {
            g(...b),
            H()
        }
    }
    let P = v ? new Array(e.length).fill(ms) : ms;
    const p = g => {
        if (!(!(f.flags & 1) || !f.dirty && !g))
            if (t) {
                const b = f.run();
                if (r || T || (v ? b.some( (R, L) => Te(R, P[L])) : Te(b, P))) {
                    _ && _();
                    const R = st;
                    st = f;
                    try {
                        const L = [b, P === ms ? void 0 : v && P[0] === ms ? [] : P, y];
                        P = b,
                        c ? c(t, 3, L) : t(...L)
                    } finally {
                        st = R
                    }
                }
            } else
                f.run()
    }
    ;
    return l && l(p),
    f = new Fs(d),
    f.scheduler = o ? () => o(p, !1) : p,
    y = g => Jl(g, !1, f),
    _ = f.onStop = () => {
        const g = Hs.get(f);
        if (g) {
            if (c)
                c(g, 4);
            else
                for (const b of g)
                    b();
            Hs.delete(f)
        }
    }
    ,
    t ? n ? p(!0) : P = f.run() : o ? o(p.bind(null, !0), !0) : f.run(),
    H.pause = f.pause.bind(f),
    H.resume = f.resume.bind(f),
    H.stop = H,
    H
}
function Je(e, t=1 / 0, s) {
    if (t <= 0 || !te(e) || e.__v_skip || (s = s || new Set,
    s.has(e)))
        return e;
    if (s.add(e),
    t--,
    ae(e))
        Je(e.value, t, s);
    else if (D(e))
        for (let n = 0; n < e.length; n++)
            Je(e[n], t, s);
    else if (Ct(e) || Ot(e))
        e.forEach(n => {
            Je(n, t, s)
        }
        );
    else if (Zs(e)) {
        for (const n in e)
            Je(e[n], t, s);
        for (const n of Object.getOwnPropertySymbols(e))
            Object.prototype.propertyIsEnumerable.call(e, n) && Je(e[n], t, s)
    }
    return e
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const ki = [];
function Xl(e) {
    ki.push(e)
}
function Zl() {
    ki.pop()
}
function hu(e, t) {}
const pu = {
    SETUP_FUNCTION: 0,
    0: "SETUP_FUNCTION",
    RENDER_FUNCTION: 1,
    1: "RENDER_FUNCTION",
    NATIVE_EVENT_HANDLER: 5,
    5: "NATIVE_EVENT_HANDLER",
    COMPONENT_EVENT_HANDLER: 6,
    6: "COMPONENT_EVENT_HANDLER",
    VNODE_HOOK: 7,
    7: "VNODE_HOOK",
    DIRECTIVE_HOOK: 8,
    8: "DIRECTIVE_HOOK",
    TRANSITION_HOOK: 9,
    9: "TRANSITION_HOOK",
    APP_ERROR_HANDLER: 10,
    10: "APP_ERROR_HANDLER",
    APP_WARN_HANDLER: 11,
    11: "APP_WARN_HANDLER",
    FUNCTION_REF: 12,
    12: "FUNCTION_REF",
    ASYNC_COMPONENT_LOADER: 13,
    13: "ASYNC_COMPONENT_LOADER",
    SCHEDULER: 14,
    14: "SCHEDULER",
    COMPONENT_UPDATE: 15,
    15: "COMPONENT_UPDATE",
    APP_UNMOUNT_CLEANUP: 16,
    16: "APP_UNMOUNT_CLEANUP"
}
  , Ql = {
    sp: "serverPrefetch hook",
    bc: "beforeCreate hook",
    c: "created hook",
    bm: "beforeMount hook",
    m: "mounted hook",
    bu: "beforeUpdate hook",
    u: "updated",
    bum: "beforeUnmount hook",
    um: "unmounted hook",
    a: "activated hook",
    da: "deactivated hook",
    ec: "errorCaptured hook",
    rtc: "renderTracked hook",
    rtg: "renderTriggered hook",
    0: "setup function",
    1: "render function",
    2: "watcher getter",
    3: "watcher callback",
    4: "watcher cleanup function",
    5: "native event handler",
    6: "component event handler",
    7: "vnode hook",
    8: "directive hook",
    9: "transition hook",
    10: "app errorHandler",
    11: "app warnHandler",
    12: "ref function",
    13: "async component loader",
    14: "scheduler flush",
    15: "component update",
    16: "app unmount cleanup function"
};
function fs(e, t, s, n) {
    try {
        return n ? e(...n) : e()
    } catch (r) {
        Bt(r, t, s)
    }
}
function ke(e, t, s, n) {
    if (W(e)) {
        const r = fs(e, t, s, n);
        return r && Qn(r) && r.catch(i => {
            Bt(i, t, s)
        }
        ),
        r
    }
    if (D(e)) {
        const r = [];
        for (let i = 0; i < e.length; i++)
            r.push(ke(e[i], t, s, n));
        return r
    }
}
function Bt(e, t, s, n=!0) {
    const r = t ? t.vnode : null
      , {errorHandler: i, throwUnhandledErrorInProduction: o} = t && t.appContext.config || Y;
    if (t) {
        let l = t.parent;
        const c = t.proxy
          , a = `https://vuejs.org/error-reference/#runtime-${s}`;
        for (; l; ) {
            const f = l.ec;
            if (f) {
                for (let d = 0; d < f.length; d++)
                    if (f[d](e, c, a) === !1)
                        return
            }
            l = l.parent
        }
        if (i) {
            Xe(),
            fs(i, null, 10, [e, c, a]),
            Ze();
            return
        }
    }
    zl(e, s, r, n, o)
}
function zl(e, t, s, n=!0, r=!1) {
    if (r)
        throw e
}
const Ee = [];
let je = -1;
const Mt = [];
let nt = null
  , St = 0;
const Bi = Promise.resolve();
let Vs = null;
function or(e) {
    const t = Vs || Bi;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function ec(e) {
    let t = je + 1
      , s = Ee.length;
    for (; t < s; ) {
        const n = t + s >>> 1
          , r = Ee[n]
          , i = ns(r);
        i < e || i === e && r.flags & 2 ? t = n + 1 : s = n
    }
    return t
}
function lr(e) {
    if (!(e.flags & 1)) {
        const t = ns(e)
          , s = Ee[Ee.length - 1];
        !s || !(e.flags & 2) && t >= ns(s) ? Ee.push(e) : Ee.splice(ec(t), 0, e),
        e.flags |= 1,
        Ui()
    }
}
function Ui() {
    Vs || (Vs = Bi.then($i))
}
function ks(e) {
    D(e) ? Mt.push(...e) : nt && e.id === -1 ? nt.splice(St + 1, 0, e) : e.flags & 1 || (Mt.push(e),
    e.flags |= 1),
    Ui()
}
function Nr(e, t, s=je + 1) {
    for (; s < Ee.length; s++) {
        const n = Ee[s];
        if (n && n.flags & 2) {
            if (e && n.id !== e.uid)
                continue;
            Ee.splice(s, 1),
            s--,
            n.flags & 4 && (n.flags &= -2),
            n(),
            n.flags & 4 || (n.flags &= -2)
        }
    }
}
function Bs(e) {
    if (Mt.length) {
        const t = [...new Set(Mt)].sort( (s, n) => ns(s) - ns(n));
        if (Mt.length = 0,
        nt) {
            nt.push(...t);
            return
        }
        for (nt = t,
        St = 0; St < nt.length; St++) {
            const s = nt[St];
            s.flags & 4 && (s.flags &= -2),
            s.flags & 8 || s(),
            s.flags &= -2
        }
        nt = null,
        St = 0
    }
}
const ns = e => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function $i(e) {
    try {
        for (je = 0; je < Ee.length; je++) {
            const t = Ee[je];
            t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2),
            fs(t, t.i, t.i ? 15 : 14),
            t.flags & 4 || (t.flags &= -2))
        }
    } finally {
        for (; je < Ee.length; je++) {
            const t = Ee[je];
            t && (t.flags &= -2)
        }
        je = -1,
        Ee.length = 0,
        Bs(),
        Vs = null,
        (Ee.length || Mt.length) && $i()
    }
}
let wt, bs = [];
function ji(e, t) {
    var s, n;
    wt = e,
    wt ? (wt.enabled = !0,
    bs.forEach( ({event: r, args: i}) => wt.emit(r, ...i)),
    bs = []) : typeof window != "undefined" && window.HTMLElement && !((n = (s = window.navigator) == null ? void 0 : s.userAgent) != null && n.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push(i => {
        ji(i, t)
    }
    ),
    setTimeout( () => {
        wt || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null,
        bs = [])
    }
    , 3e3)) : bs = []
}
let ge = null
  , fn = null;
function rs(e) {
    const t = ge;
    return ge = e,
    fn = e && e.type.__scopeId || null,
    t
}
function gu(e) {
    fn = e
}
function _u() {
    fn = null
}
const mu = e => Ki;
function Ki(e, t=ge, s) {
    if (!t || e._n)
        return e;
    const n = (...r) => {
        n._d && Wr(-1);
        const i = rs(t);
        let o;
        try {
            o = e(...r)
        } finally {
            rs(i),
            n._d && Wr(1)
        }
        return o
    }
    ;
    return n._n = !0,
    n._c = !0,
    n._d = !0,
    n
}
function bu(e, t) {
    if (ge === null)
        return e;
    const s = ds(ge)
      , n = e.dirs || (e.dirs = []);
    for (let r = 0; r < t.length; r++) {
        let[i,o,l,c=Y] = t[r];
        i && (W(i) && (i = {
            mounted: i,
            updated: i
        }),
        i.deep && Je(o),
        n.push({
            dir: i,
            instance: s,
            value: o,
            oldValue: void 0,
            arg: l,
            modifiers: c
        }))
    }
    return e
}
function Ke(e, t, s, n) {
    const r = e.dirs
      , i = t && t.dirs;
    for (let o = 0; o < r.length; o++) {
        const l = r[o];
        i && (l.oldValue = i[o].value);
        let c = l.dir[n];
        c && (Xe(),
        ke(c, s, 8, [e.el, l, e, t]),
        Ze())
    }
}
const Wi = Symbol("_vte")
  , Gi = e => e.__isTeleport
  , Xt = e => e && (e.disabled || e.disabled === "")
  , Mr = e => e && (e.defer || e.defer === "")
  , Ir = e => typeof SVGElement != "undefined" && e instanceof SVGElement
  , Fr = e => typeof MathMLElement == "function" && e instanceof MathMLElement
  , In = (e, t) => {
    const s = e && e.to;
    return oe(s) ? t ? t(s) : null : s
}
  , qi = {
    name: "Teleport",
    __isTeleport: !0,
    process(e, t, s, n, r, i, o, l, c, a) {
        const {mc: f, pc: d, pbc: _, o: {insert: y, querySelector: T, createText: v, createComment: q}} = a
          , H = Xt(t.props);
        let {shapeFlag: P, children: p, dynamicChildren: g} = t;
        if (e == null) {
            const b = t.el = v("")
              , R = t.anchor = v("");
            y(b, s, n),
            y(R, s, n);
            const L = (w, A) => {
                P & 16 && (r && r.isCE && (r.ce._teleportTarget = w),
                f(p, w, A, r, i, o, l, c))
            }
              , V = () => {
                const w = t.target = In(t.props, T)
                  , A = Ji(w, t, v, y);
                w && (o !== "svg" && Ir(w) ? o = "svg" : o !== "mathml" && Fr(w) && (o = "mathml"),
                H || (L(w, A),
                As(t, !1)))
            }
            ;
            H && (L(s, R),
            As(t, !0)),
            Mr(t.props) ? (t.el.__isMounted = !1,
            ue( () => {
                V(),
                delete t.el.__isMounted
            }
            , i)) : V()
        } else {
            if (Mr(t.props) && e.el.__isMounted === !1) {
                ue( () => {
                    qi.process(e, t, s, n, r, i, o, l, c, a)
                }
                , i);
                return
            }
            t.el = e.el,
            t.targetStart = e.targetStart;
            const b = t.anchor = e.anchor
              , R = t.target = e.target
              , L = t.targetAnchor = e.targetAnchor
              , V = Xt(e.props)
              , w = V ? s : R
              , A = V ? b : L;
            if (o === "svg" || Ir(R) ? o = "svg" : (o === "mathml" || Fr(R)) && (o = "mathml"),
            g ? (_(e.dynamicChildren, g, w, r, i, o, l),
            yr(e, t, !0)) : c || d(e, t, w, A, r, i, o, l, !1),
            H)
                V ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : ys(t, s, b, a, 1);
            else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
                const U = t.target = In(t.props, T);
                U && ys(t, U, null, a, 0)
            } else
                V && ys(t, R, L, a, 1);
            As(t, H)
        }
    },
    remove(e, t, s, {um: n, o: {remove: r}}, i) {
        const {shapeFlag: o, children: l, anchor: c, targetStart: a, targetAnchor: f, target: d, props: _} = e;
        if (d && (r(a),
        r(f)),
        i && r(c),
        o & 16) {
            const y = i || !Xt(_);
            for (let T = 0; T < l.length; T++) {
                const v = l[T];
                n(v, t, s, y, !!v.dynamicChildren)
            }
        }
    },
    move: ys,
    hydrate: tc
};
function ys(e, t, s, {o: {insert: n}, m: r}, i=2) {
    i === 0 && n(e.targetAnchor, t, s);
    const {el: o, anchor: l, shapeFlag: c, children: a, props: f} = e
      , d = i === 2;
    if (d && n(o, t, s),
    (!d || Xt(f)) && c & 16)
        for (let _ = 0; _ < a.length; _++)
            r(a[_], t, s, 2);
    d && n(l, t, s)
}
function tc(e, t, s, n, r, i, {o: {nextSibling: o, parentNode: l, querySelector: c, insert: a, createText: f}}, d) {
    const _ = t.target = In(t.props, c);
    if (_) {
        const y = Xt(t.props)
          , T = _._lpa || _.firstChild;
        if (t.shapeFlag & 16)
            if (y)
                t.anchor = d(o(e), t, l(e), s, n, r, i),
                t.targetStart = T,
                t.targetAnchor = T && o(T);
            else {
                t.anchor = o(e);
                let v = T;
                for (; v; ) {
                    if (v && v.nodeType === 8) {
                        if (v.data === "teleport start anchor")
                            t.targetStart = v;
                        else if (v.data === "teleport anchor") {
                            t.targetAnchor = v,
                            _._lpa = t.targetAnchor && o(t.targetAnchor);
                            break
                        }
                    }
                    v = o(v)
                }
                t.targetAnchor || Ji(_, t, f, a),
                d(T && o(T), t, _, s, n, r, i)
            }
        As(t, y)
    }
    return t.anchor && o(t.anchor)
}
const yu = qi;
function As(e, t) {
    const s = e.ctx;
    if (s && s.ut) {
        let n, r;
        for (t ? (n = e.el,
        r = e.anchor) : (n = e.targetStart,
        r = e.targetAnchor); n && n !== r; )
            n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid),
            n = n.nextSibling;
        s.ut()
    }
}
function Ji(e, t, s, n) {
    const r = t.targetStart = s("")
      , i = t.targetAnchor = s("");
    return r[Wi] = i,
    e && (n(r, e),
    n(i, e)),
    i
}
const rt = Symbol("_leaveCb")
  , vs = Symbol("_enterCb");
function Yi() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return an( () => {
        e.isMounted = !0
    }
    ),
    ar( () => {
        e.isUnmounting = !0
    }
    ),
    e
}
const Ne = [Function, Array]
  , Xi = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Ne,
    onEnter: Ne,
    onAfterEnter: Ne,
    onEnterCancelled: Ne,
    onBeforeLeave: Ne,
    onLeave: Ne,
    onAfterLeave: Ne,
    onLeaveCancelled: Ne,
    onBeforeAppear: Ne,
    onAppear: Ne,
    onAfterAppear: Ne,
    onAppearCancelled: Ne
}
  , Zi = e => {
    const t = e.subTree;
    return t.component ? Zi(t.component) : t
}
  , sc = {
    name: "BaseTransition",
    props: Xi,
    setup(e, {slots: t}) {
        const s = Pe()
          , n = Yi();
        return () => {
            const r = t.default && cr(t.default(), !0);
            if (!r || !r.length)
                return;
            const i = Qi(r)
              , o = Z(e)
              , {mode: l} = o;
            if (n.isLeaving)
                return Cn(i);
            const c = Lr(i);
            if (!c)
                return Cn(i);
            let a = is(c, o, n, s, d => a = d);
            c.type !== fe && ft(c, a);
            let f = s.subTree && Lr(s.subTree);
            if (f && f.type !== fe && !De(c, f) && Zi(s).type !== fe) {
                let d = is(f, o, n, s);
                if (ft(f, d),
                l === "out-in" && c.type !== fe)
                    return n.isLeaving = !0,
                    d.afterLeave = () => {
                        n.isLeaving = !1,
                        s.job.flags & 8 || s.update(),
                        delete d.afterLeave,
                        f = void 0
                    }
                    ,
                    Cn(i);
                l === "in-out" && c.type !== fe ? d.delayLeave = (_, y, T) => {
                    const v = zi(n, f);
                    v[String(f.key)] = f,
                    _[rt] = () => {
                        y(),
                        _[rt] = void 0,
                        delete a.delayedLeave,
                        f = void 0
                    }
                    ,
                    a.delayedLeave = () => {
                        T(),
                        delete a.delayedLeave,
                        f = void 0
                    }
                }
                : f = void 0
            } else
                f && (f = void 0);
            return i
        }
    }
};
function Qi(e) {
    let t = e[0];
    if (e.length > 1) {
        for (const s of e)
            if (s.type !== fe) {
                t = s;
                break
            }
    }
    return t
}
const nc = sc;
function zi(e, t) {
    const {leavingVNodes: s} = e;
    let n = s.get(t.type);
    return n || (n = Object.create(null),
    s.set(t.type, n)),
    n
}
function is(e, t, s, n, r) {
    const {appear: i, mode: o, persisted: l=!1, onBeforeEnter: c, onEnter: a, onAfterEnter: f, onEnterCancelled: d, onBeforeLeave: _, onLeave: y, onAfterLeave: T, onLeaveCancelled: v, onBeforeAppear: q, onAppear: H, onAfterAppear: P, onAppearCancelled: p} = t
      , g = String(e.key)
      , b = zi(s, e)
      , R = (w, A) => {
        w && ke(w, n, 9, A)
    }
      , L = (w, A) => {
        const U = A[1];
        R(w, A),
        D(w) ? w.every(O => O.length <= 1) && U() : w.length <= 1 && U()
    }
      , V = {
        mode: o,
        persisted: l,
        beforeEnter(w) {
            let A = c;
            if (!s.isMounted)
                if (i)
                    A = q || c;
                else
                    return;
            w[rt] && w[rt](!0);
            const U = b[g];
            U && De(e, U) && U.el[rt] && U.el[rt](),
            R(A, [w])
        },
        enter(w) {
            let A = a
              , U = f
              , O = d;
            if (!s.isMounted)
                if (i)
                    A = H || a,
                    U = P || f,
                    O = p || d;
                else
                    return;
            let K = !1;
            const Q = w[vs] = ne => {
                K || (K = !0,
                ne ? R(O, [w]) : R(U, [w]),
                V.delayedLeave && V.delayedLeave(),
                w[vs] = void 0)
            }
            ;
            A ? L(A, [w, Q]) : Q()
        },
        leave(w, A) {
            const U = String(e.key);
            if (w[vs] && w[vs](!0),
            s.isUnmounting)
                return A();
            R(_, [w]);
            let O = !1;
            const K = w[rt] = Q => {
                O || (O = !0,
                A(),
                Q ? R(v, [w]) : R(T, [w]),
                w[rt] = void 0,
                b[U] === e && delete b[U])
            }
            ;
            b[U] = e,
            y ? L(y, [w, K]) : K()
        },
        clone(w) {
            const A = is(w, t, s, n, r);
            return r && r(A),
            A
        }
    };
    return V
}
function Cn(e) {
    if (us(e))
        return e = Qe(e),
        e.children = null,
        e
}
function Lr(e) {
    if (!us(e))
        return Gi(e.type) && e.children ? Qi(e.children) : e;
    if (e.component)
        return e.component.subTree;
    const {shapeFlag: t, children: s} = e;
    if (s) {
        if (t & 16)
            return s[0];
        if (t & 32 && W(s.default))
            return s.default()
    }
}
function ft(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t,
    ft(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent),
    e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}
function cr(e, t=!1, s) {
    let n = []
      , r = 0;
    for (let i = 0; i < e.length; i++) {
        let o = e[i];
        const l = s == null ? o.key : String(s) + String(o.key != null ? o.key : i);
        o.type === he ? (o.patchFlag & 128 && r++,
        n = n.concat(cr(o.children, t, l))) : (t || o.type !== fe) && n.push(l != null ? Qe(o, {
            key: l
        }) : o)
    }
    if (r > 1)
        for (let i = 0; i < n.length; i++)
            n[i].patchFlag = -2;
    return n
}
/*! #__NO_SIDE_EFFECTS__ */
function eo(e, t) {
    return W(e) ? se({
        name: e.name
    }, t, {
        setup: e
    }) : e
}
function vu() {
    const e = Pe();
    return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : ""
}
function fr(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0]
}
function Cu(e) {
    const t = Pe()
      , s = kl(null);
    if (t) {
        const r = t.refs === Y ? t.refs = {} : t.refs;
        Object.defineProperty(r, e, {
            enumerable: !0,
            get: () => s.value,
            set: i => s.value = i
        })
    }
    return s
}
function It(e, t, s, n, r=!1) {
    if (D(e)) {
        e.forEach( (T, v) => It(T, t && (D(t) ? t[v] : t), s, n, r));
        return
    }
    if (ot(n) && !r) {
        n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && It(e, t, s, n.component.subTree);
        return
    }
    const i = n.shapeFlag & 4 ? ds(n.component) : n.el
      , o = r ? null : i
      , {i: l, r: c} = e
      , a = t && t.r
      , f = l.refs === Y ? l.refs = {} : l.refs
      , d = l.setupState
      , _ = Z(d)
      , y = d === Y ? () => !1 : T => z(_, T);
    if (a != null && a !== c && (oe(a) ? (f[a] = null,
    y(a) && (d[a] = null)) : ae(a) && (a.value = null)),
    W(c))
        fs(c, l, 12, [o, f]);
    else {
        const T = oe(c)
          , v = ae(c);
        if (T || v) {
            const q = () => {
                if (e.f) {
                    const H = T ? y(c) ? d[c] : f[c] : c.value;
                    r ? D(H) && Zn(H, i) : D(H) ? H.includes(i) || H.push(i) : T ? (f[c] = [i],
                    y(c) && (d[c] = f[c])) : (c.value = [i],
                    e.k && (f[e.k] = c.value))
                } else
                    T ? (f[c] = o,
                    y(c) && (d[c] = o)) : v && (c.value = o,
                    e.k && (f[e.k] = o))
            }
            ;
            o ? (q.id = -1,
            ue(q, s)) : q()
        }
    }
}
let Dr = !1;
const xt = () => {
    Dr || (Dr = !0)
}
  , rc = e => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject"
  , ic = e => e.namespaceURI.includes("MathML")
  , Cs = e => {
    if (e.nodeType === 1) {
        if (rc(e))
            return "svg";
        if (ic(e))
            return "mathml"
    }
}
  , At = e => e.nodeType === 8;
function oc(e) {
    const {mt: t, p: s, o: {patchProp: n, createText: r, nextSibling: i, parentNode: o, remove: l, insert: c, createComment: a}} = e
      , f = (p, g) => {
        if (!g.hasChildNodes()) {
            s(null, p, g),
            Bs(),
            g._vnode = p;
            return
        }
        d(g.firstChild, p, null, null, null),
        Bs(),
        g._vnode = p
    }
      , d = (p, g, b, R, L, V=!1) => {
        V = V || !!g.dynamicChildren;
        const w = At(p) && p.data === "["
          , A = () => v(p, g, b, R, L, w)
          , {type: U, ref: O, shapeFlag: K, patchFlag: Q} = g;
        let ne = p.nodeType;
        g.el = p,
        Q === -2 && (V = !1,
        g.dynamicChildren = null);
        let k = null;
        switch (U) {
        case bt:
            ne !== 3 ? g.children === "" ? (c(g.el = r(""), o(p), p),
            k = p) : k = A() : (p.data !== g.children && (xt(),
            p.data = g.children),
            k = i(p));
            break;
        case fe:
            P(p) ? (k = i(p),
            H(g.el = p.content.firstChild, p, b)) : ne !== 8 || w ? k = A() : k = i(p);
            break;
        case Lt:
            if (w && (p = i(p),
            ne = p.nodeType),
            ne === 1 || ne === 3) {
                k = p;
                const J = !g.children.length;
                for (let $ = 0; $ < g.staticCount; $++)
                    J && (g.children += k.nodeType === 1 ? k.outerHTML : k.data),
                    $ === g.staticCount - 1 && (g.anchor = k),
                    k = i(k);
                return w ? i(k) : k
            } else
                A();
            break;
        case he:
            w ? k = T(p, g, b, R, L, V) : k = A();
            break;
        default:
            if (K & 1)
                (ne !== 1 || g.type.toLowerCase() !== p.tagName.toLowerCase()) && !P(p) ? k = A() : k = _(p, g, b, R, L, V);
            else if (K & 6) {
                g.slotScopeIds = L;
                const J = o(p);
                if (w ? k = q(p) : At(p) && p.data === "teleport start" ? k = q(p, p.data, "teleport end") : k = i(p),
                t(g, J, null, b, R, Cs(J), V),
                ot(g) && !g.type.__asyncResolved) {
                    let $;
                    w ? ($ = le(he),
                    $.anchor = k ? k.previousSibling : J.lastChild) : $ = p.nodeType === 3 ? Ro("") : le("div"),
                    $.el = p,
                    g.component.subTree = $
                }
            } else
                K & 64 ? ne !== 8 ? k = A() : k = g.type.hydrate(p, g, b, R, L, V, e, y) : K & 128 && (k = g.type.hydrate(p, g, b, R, Cs(o(p)), L, V, e, d))
        }
        return O != null && It(O, null, R, g),
        k
    }
      , _ = (p, g, b, R, L, V) => {
        V = V || !!g.dynamicChildren;
        const {type: w, props: A, patchFlag: U, shapeFlag: O, dirs: K, transition: Q} = g
          , ne = w === "input" || w === "option";
        if (ne || U !== -1) {
            K && Ke(g, null, b, "created");
            let k = !1;
            if (P(p)) {
                k = mo(null, Q) && b && b.vnode.props && b.vnode.props.appear;
                const $ = p.content.firstChild;
                if (k) {
                    const ce = $.getAttribute("class");
                    ce && ($.$cls = ce),
                    Q.beforeEnter($)
                }
                H($, p, b),
                g.el = p = $
            }
            if (O & 16 && !(A && (A.innerHTML || A.textContent))) {
                let $ = y(p.firstChild, g, p, b, R, L, V);
                for (; $; ) {
                    Ts(p, 1) || xt();
                    const ce = $;
                    $ = $.nextSibling,
                    l(ce)
                }
            } else if (O & 8) {
                let $ = g.children;
                $[0] === `
` && (p.tagName === "PRE" || p.tagName === "TEXTAREA") && ($ = $.slice(1)),
                p.textContent !== $ && (Ts(p, 0) || xt(),
                p.textContent = g.children)
            }
            if (A) {
                if (ne || !V || U & 48) {
                    const $ = p.tagName.includes("-");
                    for (const ce in A)
                        (ne && (ce.endsWith("value") || ce === "indeterminate") || cs(ce) && !Pt(ce) || ce[0] === "." || $) && n(p, ce, null, A[ce], void 0, b)
                } else if (A.onClick)
                    n(p, "onClick", null, A.onClick, void 0, b);
                else if (U & 4 && _t(A.style))
                    for (const $ in A.style)
                        A.style[$]
            }
            let J;
            (J = A && A.onVnodeBeforeMount) && Se(J, b, g),
            K && Ke(g, null, b, "beforeMount"),
            ((J = A && A.onVnodeMounted) || K || k) && Eo( () => {
                J && Se(J, b, g),
                k && Q.enter(p),
                K && Ke(g, null, b, "mounted")
            }
            , R)
        }
        return p.nextSibling
    }
      , y = (p, g, b, R, L, V, w) => {
        w = w || !!g.dynamicChildren;
        const A = g.children
          , U = A.length;
        for (let O = 0; O < U; O++) {
            const K = w ? A[O] : A[O] = we(A[O])
              , Q = K.type === bt;
            p ? (Q && !w && O + 1 < U && we(A[O + 1]).type === bt && (c(r(p.data.slice(K.children.length)), b, i(p)),
            p.data = K.children),
            p = d(p, K, R, L, V, w)) : Q && !K.children ? c(K.el = r(""), b) : (Ts(b, 1) || xt(),
            s(null, K, b, null, R, L, Cs(b), V))
        }
        return p
    }
      , T = (p, g, b, R, L, V) => {
        const {slotScopeIds: w} = g;
        w && (L = L ? L.concat(w) : w);
        const A = o(p)
          , U = y(i(p), g, A, b, R, L, V);
        return U && At(U) && U.data === "]" ? i(g.anchor = U) : (xt(),
        c(g.anchor = a("]"), A, U),
        U)
    }
      , v = (p, g, b, R, L, V) => {
        if (Ts(p.parentElement, 1) || xt(),
        g.el = null,
        V) {
            const U = q(p);
            for (; ; ) {
                const O = i(p);
                if (O && O !== U)
                    l(O);
                else
                    break
            }
        }
        const w = i(p)
          , A = o(p);
        return l(p),
        s(null, g, A, w, b, R, Cs(A), L),
        b && (b.vnode.el = g.el,
        hn(b, g.el)),
        w
    }
      , q = (p, g="[", b="]") => {
        let R = 0;
        for (; p; )
            if (p = i(p),
            p && At(p) && (p.data === g && R++,
            p.data === b)) {
                if (R === 0)
                    return i(p);
                R--
            }
        return p
    }
      , H = (p, g, b) => {
        const R = g.parentNode;
        R && R.replaceChild(p, g);
        let L = b;
        for (; L; )
            L.vnode.el === g && (L.vnode.el = L.subTree.el = p),
            L = L.parent
    }
      , P = p => p.nodeType === 1 && p.tagName === "TEMPLATE";
    return [f, d]
}
const Hr = "data-allow-mismatch"
  , lc = {
    0: "text",
    1: "children",
    2: "class",
    3: "style",
    4: "attribute"
};
function Ts(e, t) {
    if (t === 0 || t === 1)
        for (; e && !e.hasAttribute(Hr); )
            e = e.parentElement;
    const s = e && e.getAttribute(Hr);
    if (s == null)
        return !1;
    if (s === "")
        return !0;
    {
        const n = s.split(",");
        return t === 0 && n.includes("children") ? !0 : n.includes(lc[t])
    }
}
const cc = en().requestIdleCallback || (e => setTimeout(e, 1))
  , fc = en().cancelIdleCallback || (e => clearTimeout(e))
  , Tu = (e=1e4) => t => {
    const s = cc(t, {
        timeout: e
    });
    return () => fc(s)
}
;
function uc(e) {
    const {top: t, left: s, bottom: n, right: r} = e.getBoundingClientRect()
      , {innerHeight: i, innerWidth: o} = window;
    return (t > 0 && t < i || n > 0 && n < i) && (s > 0 && s < o || r > 0 && r < o)
}
const Eu = e => (t, s) => {
    const n = new IntersectionObserver(r => {
        for (const i of r)
            if (i.isIntersecting) {
                n.disconnect(),
                t();
                break
            }
    }
    ,e);
    return s(r => {
        if (r instanceof Element) {
            if (uc(r))
                return t(),
                n.disconnect(),
                !1;
            n.observe(r)
        }
    }
    ),
    () => n.disconnect()
}
  , xu = e => t => {
    if (e) {
        const s = matchMedia(e);
        if (s.matches)
            t();
        else
            return s.addEventListener("change", t, {
                once: !0
            }),
            () => s.removeEventListener("change", t)
    }
}
  , Su = (e=[]) => (t, s) => {
    oe(e) && (e = [e]);
    let n = !1;
    const r = o => {
        n || (n = !0,
        i(),
        t(),
        o.target.dispatchEvent(new o.constructor(o.type,o)))
    }
      , i = () => {
        s(o => {
            for (const l of e)
                o.removeEventListener(l, r)
        }
        )
    }
    ;
    return s(o => {
        for (const l of e)
            o.addEventListener(l, r, {
                once: !0
            })
    }
    ),
    i
}
;
function ac(e, t) {
    if (At(e) && e.data === "[") {
        let s = 1
          , n = e.nextSibling;
        for (; n; ) {
            if (n.nodeType === 1) {
                if (t(n) === !1)
                    break
            } else if (At(n))
                if (n.data === "]") {
                    if (--s === 0)
                        break
                } else
                    n.data === "[" && s++;
            n = n.nextSibling
        }
    } else
        t(e)
}
const ot = e => !!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
function wu(e) {
    W(e) && (e = {
        loader: e
    });
    const {loader: t, loadingComponent: s, errorComponent: n, delay: r=200, hydrate: i, timeout: o, suspensible: l=!0, onError: c} = e;
    let a = null, f, d = 0;
    const _ = () => (d++,
    a = null,
    y())
      , y = () => {
        let T;
        return a || (T = a = t().catch(v => {
            if (v = v instanceof Error ? v : new Error(String(v)),
            c)
                return new Promise( (q, H) => {
                    c(v, () => q(_()), () => H(v), d + 1)
                }
                );
            throw v
        }
        ).then(v => T !== a && a ? a : (v && (v.__esModule || v[Symbol.toStringTag] === "Module") && (v = v.default),
        f = v,
        v)))
    }
    ;
    return eo({
        name: "AsyncComponentWrapper",
        __asyncLoader: y,
        __asyncHydrate(T, v, q) {
            let H = !1;
            (v.bu || (v.bu = [])).push( () => H = !0);
            const P = () => {
                H || q()
            }
              , p = i ? () => {
                const g = i(P, b => ac(T, b));
                g && (v.bum || (v.bum = [])).push(g)
            }
            : P;
            f ? p() : y().then( () => !v.isUnmounted && p())
        },
        get __asyncResolved() {
            return f
        },
        setup() {
            const T = pe;
            if (fr(T),
            f)
                return () => Tn(f, T);
            const v = p => {
                a = null,
                Bt(p, T, 13, !n)
            }
            ;
            if (l && T.suspense || Dt)
                return y().then(p => () => Tn(p, T)).catch(p => (v(p),
                () => n ? le(n, {
                    error: p
                }) : null));
            const q = ws(!1)
              , H = ws()
              , P = ws(!!r);
            return r && setTimeout( () => {
                P.value = !1
            }
            , r),
            o != null && setTimeout( () => {
                if (!q.value && !H.value) {
                    const p = new Error(`Async component timed out after ${o}ms.`);
                    v(p),
                    H.value = p
                }
            }
            , o),
            y().then( () => {
                q.value = !0,
                T.parent && us(T.parent.vnode) && T.parent.update()
            }
            ).catch(p => {
                v(p),
                H.value = p
            }
            ),
            () => {
                if (q.value && f)
                    return Tn(f, T);
                if (H.value && n)
                    return le(n, {
                        error: H.value
                    });
                if (s && !P.value)
                    return le(s)
            }
        }
    })
}
function Tn(e, t) {
    const {ref: s, props: n, children: r, ce: i} = t.vnode
      , o = le(e, n, r);
    return o.ref = s,
    o.ce = i,
    delete t.vnode.ce,
    o
}
const us = e => e.type.__isKeepAlive
  , dc = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number]
    },
    setup(e, {slots: t}) {
        const s = Pe()
          , n = s.ctx;
        if (!n.renderer)
            return () => {
                const P = t.default && t.default();
                return P && P.length === 1 ? P[0] : P
            }
            ;
        const r = new Map
          , i = new Set;
        let o = null;
        const l = s.suspense
          , {renderer: {p: c, m: a, um: f, o: {createElement: d}}} = n
          , _ = d("div");
        n.activate = (P, p, g, b, R) => {
            const L = P.component;
            a(P, p, g, 0, l),
            c(L.vnode, P, p, g, L, l, b, P.slotScopeIds, R),
            ue( () => {
                L.isDeactivated = !1,
                L.a && Nt(L.a);
                const V = P.props && P.props.onVnodeMounted;
                V && Se(V, L.parent, P)
            }
            , l)
        }
        ,
        n.deactivate = P => {
            const p = P.component;
            $s(p.m),
            $s(p.a),
            a(P, _, null, 1, l),
            ue( () => {
                p.da && Nt(p.da);
                const g = P.props && P.props.onVnodeUnmounted;
                g && Se(g, p.parent, P),
                p.isDeactivated = !0
            }
            , l)
        }
        ;
        function y(P) {
            En(P),
            f(P, s, l, !0)
        }
        function T(P) {
            r.forEach( (p, g) => {
                const b = Wn(p.type);
                b && !P(b) && v(g)
            }
            )
        }
        function v(P) {
            const p = r.get(P);
            p && (!o || !De(p, o)) ? y(p) : o && En(o),
            r.delete(P),
            i.delete(P)
        }
        Qt( () => [e.include, e.exclude], ([P,p]) => {
            P && T(g => Gt(P, g)),
            p && T(g => !Gt(p, g))
        }
        , {
            flush: "post",
            deep: !0
        });
        let q = null;
        const H = () => {
            q != null && (js(s.subTree.type) ? ue( () => {
                r.set(q, Es(s.subTree))
            }
            , s.subTree.suspense) : r.set(q, Es(s.subTree)))
        }
        ;
        return an(H),
        ur(H),
        ar( () => {
            r.forEach(P => {
                const {subTree: p, suspense: g} = s
                  , b = Es(p);
                if (P.type === b.type && P.key === b.key) {
                    En(b);
                    const R = b.component.da;
                    R && ue(R, g);
                    return
                }
                y(P)
            }
            )
        }
        ),
        () => {
            if (q = null,
            !t.default)
                return o = null;
            const P = t.default()
              , p = P[0];
            if (P.length > 1)
                return o = null,
                P;
            if (!ut(p) || !(p.shapeFlag & 4) && !(p.shapeFlag & 128))
                return o = null,
                p;
            let g = Es(p);
            if (g.type === fe)
                return o = null,
                g;
            const b = g.type
              , R = Wn(ot(g) ? g.type.__asyncResolved || {} : b)
              , {include: L, exclude: V, max: w} = e;
            if (L && (!R || !Gt(L, R)) || V && R && Gt(V, R))
                return g.shapeFlag &= -257,
                o = g,
                p;
            const A = g.key == null ? b : g.key
              , U = r.get(A);
            return g.el && (g = Qe(g),
            p.shapeFlag & 128 && (p.ssContent = g)),
            q = A,
            U ? (g.el = U.el,
            g.component = U.component,
            g.transition && ft(g, g.transition),
            g.shapeFlag |= 512,
            i.delete(A),
            i.add(A)) : (i.add(A),
            w && i.size > parseInt(w, 10) && v(i.values().next().value)),
            g.shapeFlag |= 256,
            o = g,
            js(p.type) ? p : g
        }
    }
}
  , Au = dc;
function Gt(e, t) {
    return D(e) ? e.some(s => Gt(s, t)) : oe(e) ? e.split(",").includes(t) : sl(e) ? (e.lastIndex = 0,
    e.test(t)) : !1
}
function hc(e, t) {
    to(e, "a", t)
}
function pc(e, t) {
    to(e, "da", t)
}
function to(e, t, s=pe) {
    const n = e.__wdc || (e.__wdc = () => {
        let r = s;
        for (; r; ) {
            if (r.isDeactivated)
                return;
            r = r.parent
        }
        return e()
    }
    );
    if (un(t, n, s),
    s) {
        let r = s.parent;
        for (; r && r.parent; )
            us(r.parent.vnode) && gc(n, t, s, r),
            r = r.parent
    }
}
function gc(e, t, s, n) {
    const r = un(t, e, n, !0);
    dr( () => {
        Zn(n[t], r)
    }
    , s)
}
function En(e) {
    e.shapeFlag &= -257,
    e.shapeFlag &= -513
}
function Es(e) {
    return e.shapeFlag & 128 ? e.ssContent : e
}
function un(e, t, s=pe, n=!1) {
    if (s) {
        const r = s[e] || (s[e] = [])
          , i = t.__weh || (t.__weh = (...o) => {
            Xe();
            const l = vt(s)
              , c = ke(t, s, e, o);
            return l(),
            Ze(),
            c
        }
        );
        return n ? r.unshift(i) : r.push(i),
        i
    }
}
const ze = e => (t, s=pe) => {
    (!Dt || e === "sp") && un(e, (...n) => t(...n), s)
}
  , _c = ze("bm")
  , an = ze("m")
  , so = ze("bu")
  , ur = ze("u")
  , ar = ze("bum")
  , dr = ze("um")
  , mc = ze("sp")
  , bc = ze("rtg")
  , yc = ze("rtc");
function vc(e, t=pe) {
    un("ec", e, t)
}
const hr = "components"
  , Cc = "directives";
function Ru(e, t) {
    return pr(hr, e, !0, t) || e
}
const no = Symbol.for("v-ndc");
function Ou(e) {
    return oe(e) ? pr(hr, e, !1) || e : e || no
}
function Pu(e) {
    return pr(Cc, e)
}
function pr(e, t, s=!0, n=!1) {
    const r = ge || pe;
    if (r) {
        const i = r.type;
        if (e === hr) {
            const l = Wn(i, !1);
            if (l && (l === t || l === ve(t) || l === zs(ve(t))))
                return i
        }
        const o = Vr(r[e] || i[e], t) || Vr(r.appContext[e], t);
        return !o && n ? i : o
    }
}
function Vr(e, t) {
    return e && (e[t] || e[ve(t)] || e[zs(ve(t))])
}
function Nu(e, t, s, n) {
    let r;
    const i = s && s[n]
      , o = D(e);
    if (o || oe(e)) {
        const l = o && _t(e);
        let c = !1
          , a = !1;
        l && (c = !Ie(e),
        a = ct(e),
        e = on(e)),
        r = new Array(e.length);
        for (let f = 0, d = e.length; f < d; f++)
            r[f] = t(c ? a ? Ds(de(e[f])) : de(e[f]) : e[f], f, void 0, i && i[f])
    } else if (typeof e == "number") {
        r = new Array(e);
        for (let l = 0; l < e; l++)
            r[l] = t(l + 1, l, void 0, i && i[l])
    } else if (te(e))
        if (e[Symbol.iterator])
            r = Array.from(e, (l, c) => t(l, c, void 0, i && i[c]));
        else {
            const l = Object.keys(e);
            r = new Array(l.length);
            for (let c = 0, a = l.length; c < a; c++) {
                const f = l[c];
                r[c] = t(e[f], f, c, i && i[c])
            }
        }
    else
        r = [];
    return s && (s[n] = r),
    r
}
function Mu(e, t) {
    for (let s = 0; s < t.length; s++) {
        const n = t[s];
        if (D(n))
            for (let r = 0; r < n.length; r++)
                e[n[r].name] = n[r].fn;
        else
            n && (e[n.name] = n.key ? (...r) => {
                const i = n.fn(...r);
                return i && (i.key = n.key),
                i
            }
            : n.fn)
    }
    return e
}
function Iu(e, t, s={}, n, r) {
    if (ge.ce || ge.parent && ot(ge.parent) && ge.parent.ce)
        return t !== "default" && (s.name = t),
        Ks(),
        Bn(he, null, [le("slot", s, n && n())], 64);
    let i = e[t];
    i && i._c && (i._d = !1),
    Ks();
    const o = i && gr(i(s))
      , l = s.key || o && o.key
      , c = Bn(he, {
        key: (l && !Ve(l) ? l : `_${t}`) + (!o && n ? "_fb" : "")
    }, o || (n ? n() : []), o && e._ === 1 ? 64 : -2);
    return !r && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]),
    i && i._c && (i._d = !0),
    c
}
function gr(e) {
    return e.some(t => ut(t) ? !(t.type === fe || t.type === he && !gr(t.children)) : !0) ? e : null
}
function Fu(e, t) {
    const s = {};
    for (const n in e)
        s[t && /[A-Z]/.test(n) ? `on:${n}` : Ss(n)] = e[n];
    return s
}
const Fn = e => e ? Po(e) ? ds(e) : Fn(e.parent) : null
  , Zt = se(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Fn(e.parent),
    $root: e => Fn(e.root),
    $host: e => e.ce,
    $emit: e => e.emit,
    $options: e => _r(e),
    $forceUpdate: e => e.f || (e.f = () => {
        lr(e.update)
    }
    ),
    $nextTick: e => e.n || (e.n = or.bind(e.proxy)),
    $watch: e => jc.bind(e)
})
  , xn = (e, t) => e !== Y && !e.__isScriptSetup && z(e, t)
  , Ln = {
    get({_: e}, t) {
        if (t === "__v_skip")
            return !0;
        const {ctx: s, setupState: n, data: r, props: i, accessCache: o, type: l, appContext: c} = e;
        let a;
        if (t[0] !== "$") {
            const y = o[t];
            if (y !== void 0)
                switch (y) {
                case 1:
                    return n[t];
                case 2:
                    return r[t];
                case 4:
                    return s[t];
                case 3:
                    return i[t]
                }
            else {
                if (xn(n, t))
                    return o[t] = 1,
                    n[t];
                if (r !== Y && z(r, t))
                    return o[t] = 2,
                    r[t];
                if ((a = e.propsOptions[0]) && z(a, t))
                    return o[t] = 3,
                    i[t];
                if (s !== Y && z(s, t))
                    return o[t] = 4,
                    s[t];
                Dn && (o[t] = 0)
            }
        }
        const f = Zt[t];
        let d, _;
        if (f)
            return t === "$attrs" && be(e.attrs, "get", ""),
            f(e);
        if ((d = l.__cssModules) && (d = d[t]))
            return d;
        if (s !== Y && z(s, t))
            return o[t] = 4,
            s[t];
        if (_ = c.config.globalProperties,
        z(_, t))
            return _[t]
    },
    set({_: e}, t, s) {
        const {data: n, setupState: r, ctx: i} = e;
        return xn(r, t) ? (r[t] = s,
        !0) : n !== Y && z(n, t) ? (n[t] = s,
        !0) : z(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (i[t] = s,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: i}}, o) {
        let l;
        return !!s[o] || e !== Y && z(e, o) || xn(t, o) || (l = i[0]) && z(l, o) || z(n, o) || z(Zt, o) || z(r.config.globalProperties, o)
    },
    defineProperty(e, t, s) {
        return s.get != null ? e._.accessCache[t] = 0 : z(s, "value") && this.set(e, t, s.value, null),
        Reflect.defineProperty(e, t, s)
    }
}
  , Tc = se({}, Ln, {
    get(e, t) {
        if (t !== Symbol.unscopables)
            return Ln.get(e, t, e)
    },
    has(e, t) {
        return t[0] !== "_" && !ll(t)
    }
});
function Lu() {
    return null
}
function Du() {
    return null
}
function Hu(e) {}
function Vu(e) {}
function ku() {
    return null
}
function Bu() {}
function Uu(e, t) {
    return null
}
function $u() {
    return ro().slots
}
function ju() {
    return ro().attrs
}
function ro(e) {
    const t = Pe();
    return t.setupContext || (t.setupContext = Io(t))
}
function os(e) {
    return D(e) ? e.reduce( (t, s) => (t[s] = null,
    t), {}) : e
}
function Ku(e, t) {
    const s = os(e);
    for (const n in t) {
        if (n.startsWith("__skip"))
            continue;
        let r = s[n];
        r ? D(r) || W(r) ? r = s[n] = {
            type: r,
            default: t[n]
        } : r.default = t[n] : r === null && (r = s[n] = {
            default: t[n]
        }),
        r && t[`__skip_${n}`] && (r.skipFactory = !0)
    }
    return s
}
function Wu(e, t) {
    return !e || !t ? e || t : D(e) && D(t) ? e.concat(t) : se({}, os(e), os(t))
}
function Gu(e, t) {
    const s = {};
    for (const n in e)
        t.includes(n) || Object.defineProperty(s, n, {
            enumerable: !0,
            get: () => e[n]
        });
    return s
}
function qu(e) {
    const t = Pe();
    let s = e();
    return $n(),
    Qn(s) && (s = s.catch(n => {
        throw vt(t),
        n
    }
    )),
    [s, () => vt(t)]
}
let Dn = !0;
function Ec(e) {
    const t = _r(e)
      , s = e.proxy
      , n = e.ctx;
    Dn = !1,
    t.beforeCreate && kr(t.beforeCreate, e, "bc");
    const {data: r, computed: i, methods: o, watch: l, provide: c, inject: a, created: f, beforeMount: d, mounted: _, beforeUpdate: y, updated: T, activated: v, deactivated: q, beforeDestroy: H, beforeUnmount: P, destroyed: p, unmounted: g, render: b, renderTracked: R, renderTriggered: L, errorCaptured: V, serverPrefetch: w, expose: A, inheritAttrs: U, components: O, directives: K, filters: Q} = t;
    if (a && xc(a, n, null),
    o)
        for (const J in o) {
            const $ = o[J];
            W($) && (n[J] = $.bind(s))
        }
    if (r) {
        const J = r.call(s, s);
        te(J) && (e.data = nr(J))
    }
    if (Dn = !0,
    i)
        for (const J in i) {
            const $ = i[J]
              , ce = W($) ? $.bind(s, s) : W($.get) ? $.get.bind(s, s) : Me
              , hs = !W($) && W($.set) ? $.set.bind(s) : Me
              , dt = uf({
                get: ce,
                set: hs
            });
            Object.defineProperty(n, J, {
                enumerable: !0,
                configurable: !0,
                get: () => dt.value,
                set: Be => dt.value = Be
            })
        }
    if (l)
        for (const J in l)
            io(l[J], n, s, J);
    if (c) {
        const J = W(c) ? c.call(s) : c;
        Reflect.ownKeys(J).forEach($ => {
            Pc($, J[$])
        }
        )
    }
    f && kr(f, e, "c");
    function k(J, $) {
        D($) ? $.forEach(ce => J(ce.bind(s))) : $ && J($.bind(s))
    }
    if (k(_c, d),
    k(an, _),
    k(so, y),
    k(ur, T),
    k(hc, v),
    k(pc, q),
    k(vc, V),
    k(yc, R),
    k(bc, L),
    k(ar, P),
    k(dr, g),
    k(mc, w),
    D(A))
        if (A.length) {
            const J = e.exposed || (e.exposed = {});
            A.forEach($ => {
                Object.defineProperty(J, $, {
                    get: () => s[$],
                    set: ce => s[$] = ce,
                    enumerable: !0
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    b && e.render === Me && (e.render = b),
    U != null && (e.inheritAttrs = U),
    O && (e.components = O),
    K && (e.directives = K),
    w && fr(e)
}
function xc(e, t, s=Me) {
    D(e) && (e = Hn(e));
    for (const n in e) {
        const r = e[n];
        let i;
        te(r) ? "default"in r ? i = Rs(r.from || n, r.default, !0) : i = Rs(r.from || n) : i = Rs(r),
        ae(i) ? Object.defineProperty(t, n, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: o => i.value = o
        }) : t[n] = i
    }
}
function kr(e, t, s) {
    ke(D(e) ? e.map(n => n.bind(t.proxy)) : e.bind(t.proxy), t, s)
}
function io(e, t, s, n) {
    let r = n.includes(".") ? yo(s, n) : () => s[n];
    if (oe(e)) {
        const i = t[e];
        W(i) && Qt(r, i)
    } else if (W(e))
        Qt(r, e.bind(s));
    else if (te(e))
        if (D(e))
            e.forEach(i => io(i, t, s, n));
        else {
            const i = W(e.handler) ? e.handler.bind(s) : t[e.handler];
            W(i) && Qt(r, i, e)
        }
}
function _r(e) {
    const t = e.type
      , {mixins: s, extends: n} = t
      , {mixins: r, optionsCache: i, config: {optionMergeStrategies: o}} = e.appContext
      , l = i.get(t);
    let c;
    return l ? c = l : !r.length && !s && !n ? c = t : (c = {},
    r.length && r.forEach(a => Us(c, a, o, !0)),
    Us(c, t, o)),
    te(t) && i.set(t, c),
    c
}
function Us(e, t, s, n=!1) {
    const {mixins: r, extends: i} = t;
    i && Us(e, i, s, !0),
    r && r.forEach(o => Us(e, o, s, !0));
    for (const o in t)
        if (!(n && o === "expose")) {
            const l = Sc[o] || s && s[o];
            e[o] = l ? l(e[o], t[o]) : t[o]
        }
    return e
}
const Sc = {
    data: Br,
    props: Ur,
    emits: Ur,
    methods: qt,
    computed: qt,
    beforeCreate: Ce,
    created: Ce,
    beforeMount: Ce,
    mounted: Ce,
    beforeUpdate: Ce,
    updated: Ce,
    beforeDestroy: Ce,
    beforeUnmount: Ce,
    destroyed: Ce,
    unmounted: Ce,
    activated: Ce,
    deactivated: Ce,
    errorCaptured: Ce,
    serverPrefetch: Ce,
    components: qt,
    directives: qt,
    watch: Ac,
    provide: Br,
    inject: wc
};
function Br(e, t) {
    return t ? e ? function() {
        return se(W(e) ? e.call(this, this) : e, W(t) ? t.call(this, this) : t)
    }
    : t : e
}
function wc(e, t) {
    return qt(Hn(e), Hn(t))
}
function Hn(e) {
    if (D(e)) {
        const t = {};
        for (let s = 0; s < e.length; s++)
            t[e[s]] = e[s];
        return t
    }
    return e
}
function Ce(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function qt(e, t) {
    return e ? se(Object.create(null), e, t) : t
}
function Ur(e, t) {
    return e ? D(e) && D(t) ? [...new Set([...e, ...t])] : se(Object.create(null), os(e), os(t != null ? t : {})) : t
}
function Ac(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const s = se(Object.create(null), e);
    for (const n in t)
        s[n] = Ce(e[n], t[n]);
    return s
}
function oo() {
    return {
        app: null,
        config: {
            isNativeTag: el,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Rc = 0;
function Oc(e, t) {
    return function(n, r=null) {
        W(n) || (n = se({}, n)),
        r != null && !te(r) && (r = null);
        const i = oo()
          , o = new WeakSet
          , l = [];
        let c = !1;
        const a = i.app = {
            _uid: Rc++,
            _component: n,
            _props: r,
            _container: null,
            _context: i,
            _instance: null,
            version: hf,
            get config() {
                return i.config
            },
            set config(f) {},
            use(f, ...d) {
                return o.has(f) || (f && W(f.install) ? (o.add(f),
                f.install(a, ...d)) : W(f) && (o.add(f),
                f(a, ...d))),
                a
            },
            mixin(f) {
                return i.mixins.includes(f) || i.mixins.push(f),
                a
            },
            component(f, d) {
                return d ? (i.components[f] = d,
                a) : i.components[f]
            },
            directive(f, d) {
                return d ? (i.directives[f] = d,
                a) : i.directives[f]
            },
            mount(f, d, _) {
                if (!c) {
                    const y = a._ceVNode || le(n, r);
                    return y.appContext = i,
                    _ === !0 ? _ = "svg" : _ === !1 && (_ = void 0),
                    d && t ? t(y, f) : e(y, f, _),
                    c = !0,
                    a._container = f,
                    f.__vue_app__ = a,
                    ds(y.component)
                }
            },
            onUnmount(f) {
                l.push(f)
            },
            unmount() {
                c && (ke(l, a._instance, 16),
                e(null, a._container),
                delete a._container.__vue_app__)
            },
            provide(f, d) {
                return i.provides[f] = d,
                a
            },
            runWithContext(f) {
                const d = mt;
                mt = a;
                try {
                    return f()
                } finally {
                    mt = d
                }
            }
        };
        return a
    }
}
let mt = null;
function Pc(e, t) {
    if (pe) {
        let s = pe.provides;
        const n = pe.parent && pe.parent.provides;
        n === s && (s = pe.provides = Object.create(n)),
        s[e] = t
    }
}
function Rs(e, t, s=!1) {
    const n = Pe();
    if (n || mt) {
        let r = mt ? mt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
        if (r && e in r)
            return r[e];
        if (arguments.length > 1)
            return s && W(t) ? t.call(n && n.proxy) : t
    }
}
function Ju() {
    return !!(Pe() || mt)
}
const lo = {}
  , co = () => Object.create(lo)
  , fo = e => Object.getPrototypeOf(e) === lo;
function Nc(e, t, s, n=!1) {
    const r = {}
      , i = co();
    e.propsDefaults = Object.create(null),
    uo(e, t, r, i);
    for (const o in e.propsOptions[0])
        o in r || (r[o] = void 0);
    s ? e.props = n ? r : Hl(r) : e.type.props ? e.props = r : e.props = i,
    e.attrs = i
}
function Mc(e, t, s, n) {
    const {props: r, attrs: i, vnode: {patchFlag: o}} = e
      , l = Z(r)
      , [c] = e.propsOptions;
    let a = !1;
    if ((n || o > 0) && !(o & 16)) {
        if (o & 8) {
            const f = e.vnode.dynamicProps;
            for (let d = 0; d < f.length; d++) {
                let _ = f[d];
                if (dn(e.emitsOptions, _))
                    continue;
                const y = t[_];
                if (c)
                    if (z(i, _))
                        y !== i[_] && (i[_] = y,
                        a = !0);
                    else {
                        const T = ve(_);
                        r[T] = Vn(c, l, T, y, e, !1)
                    }
                else
                    y !== i[_] && (i[_] = y,
                    a = !0)
            }
        }
    } else {
        uo(e, t, r, i) && (a = !0);
        let f;
        for (const d in l)
            (!t || !z(t, d) && ((f = Ae(d)) === d || !z(t, f))) && (c ? s && (s[d] !== void 0 || s[f] !== void 0) && (r[d] = Vn(c, l, d, void 0, e, !0)) : delete r[d]);
        if (i !== l)
            for (const d in i)
                (!t || !z(t, d)) && (delete i[d],
                a = !0)
    }
    a && qe(e.attrs, "set", "")
}
function uo(e, t, s, n) {
    const [r,i] = e.propsOptions;
    let o = !1, l;
    if (t)
        for (let c in t) {
            if (Pt(c))
                continue;
            const a = t[c];
            let f;
            r && z(r, f = ve(c)) ? !i || !i.includes(f) ? s[f] = a : (l || (l = {}))[f] = a : dn(e.emitsOptions, c) || (!(c in n) || a !== n[c]) && (n[c] = a,
            o = !0)
        }
    if (i) {
        const c = Z(s)
          , a = l || Y;
        for (let f = 0; f < i.length; f++) {
            const d = i[f];
            s[d] = Vn(r, c, d, a[d], e, !z(a, d))
        }
    }
    return o
}
function Vn(e, t, s, n, r, i) {
    const o = e[s];
    if (o != null) {
        const l = z(o, "default");
        if (l && n === void 0) {
            const c = o.default;
            if (o.type !== Function && !o.skipFactory && W(c)) {
                const {propsDefaults: a} = r;
                if (s in a)
                    n = a[s];
                else {
                    const f = vt(r);
                    n = a[s] = c.call(null, t),
                    f()
                }
            } else
                n = c;
            r.ce && r.ce._setProp(s, n)
        }
        o[0] && (i && !l ? n = !1 : o[1] && (n === "" || n === Ae(s)) && (n = !0))
    }
    return n
}
const Ic = new WeakMap;
function ao(e, t, s=!1) {
    const n = s ? Ic : t.propsCache
      , r = n.get(e);
    if (r)
        return r;
    const i = e.props
      , o = {}
      , l = [];
    let c = !1;
    if (!W(e)) {
        const f = d => {
            c = !0;
            const [_,y] = ao(d, t, !0);
            se(o, _),
            y && l.push(...y)
        }
        ;
        !s && t.mixins.length && t.mixins.forEach(f),
        e.extends && f(e.extends),
        e.mixins && e.mixins.forEach(f)
    }
    if (!i && !c)
        return te(e) && n.set(e, Rt),
        Rt;
    if (D(i))
        for (let f = 0; f < i.length; f++) {
            const d = ve(i[f]);
            $r(d) && (o[d] = Y)
        }
    else if (i)
        for (const f in i) {
            const d = ve(f);
            if ($r(d)) {
                const _ = i[f]
                  , y = o[d] = D(_) || W(_) ? {
                    type: _
                } : se({}, _)
                  , T = y.type;
                let v = !1
                  , q = !0;
                if (D(T))
                    for (let H = 0; H < T.length; ++H) {
                        const P = T[H]
                          , p = W(P) && P.name;
                        if (p === "Boolean") {
                            v = !0;
                            break
                        } else
                            p === "String" && (q = !1)
                    }
                else
                    v = W(T) && T.name === "Boolean";
                y[0] = v,
                y[1] = q,
                (v || z(y, "default")) && l.push(d)
            }
        }
    const a = [o, l];
    return te(e) && n.set(e, a),
    a
}
function $r(e) {
    return e[0] !== "$" && !Pt(e)
}
const mr = e => e === "_" || e === "__" || e === "_ctx" || e === "$stable"
  , br = e => D(e) ? e.map(we) : [we(e)]
  , Fc = (e, t, s) => {
    if (t._n)
        return t;
    const n = Ki( (...r) => br(t(...r)), s);
    return n._c = !1,
    n
}
  , ho = (e, t, s) => {
    const n = e._ctx;
    for (const r in e) {
        if (mr(r))
            continue;
        const i = e[r];
        if (W(i))
            t[r] = Fc(r, i, n);
        else if (i != null) {
            const o = br(i);
            t[r] = () => o
        }
    }
}
  , po = (e, t) => {
    const s = br(t);
    e.slots.default = () => s
}
  , go = (e, t, s) => {
    for (const n in t)
        (s || !mr(n)) && (e[n] = t[n])
}
  , Lc = (e, t, s) => {
    const n = e.slots = co();
    if (e.vnode.shapeFlag & 32) {
        const r = t.__;
        r && On(n, "__", r, !0);
        const i = t._;
        i ? (go(n, t, s),
        s && On(n, "_", i, !0)) : ho(t, n)
    } else
        t && po(e, t)
}
  , Dc = (e, t, s) => {
    const {vnode: n, slots: r} = e;
    let i = !0
      , o = Y;
    if (n.shapeFlag & 32) {
        const l = t._;
        l ? s && l === 1 ? i = !1 : go(r, t, s) : (i = !t.$stable,
        ho(t, r)),
        o = t
    } else
        t && (po(e, t),
        o = {
            default: 1
        });
    if (i)
        for (const l in r)
            !mr(l) && o[l] == null && delete r[l]
}
  , ue = Eo;
function Hc(e) {
    return _o(e)
}
function Vc(e) {
    return _o(e, oc)
}
function _o(e, t) {
    const s = en();
    s.__VUE__ = !0;
    const {insert: n, remove: r, patchProp: i, createElement: o, createText: l, createComment: c, setText: a, setElementText: f, parentNode: d, nextSibling: _, setScopeId: y=Me, insertStaticContent: T} = e
      , v = (u, h, m, x=null, C=null, E=null, I=void 0, M=null, N=!!h.dynamicChildren) => {
        if (u === h)
            return;
        u && !De(u, h) && (x = ps(u),
        Be(u, C, E, !0),
        u = null),
        h.patchFlag === -2 && (N = !1,
        h.dynamicChildren = null);
        const {type: S, ref: j, shapeFlag: F} = h;
        switch (S) {
        case bt:
            q(u, h, m, x);
            break;
        case fe:
            H(u, h, m, x);
            break;
        case Lt:
            u == null && P(h, m, x, I);
            break;
        case he:
            O(u, h, m, x, C, E, I, M, N);
            break;
        default:
            F & 1 ? b(u, h, m, x, C, E, I, M, N) : F & 6 ? K(u, h, m, x, C, E, I, M, N) : (F & 64 || F & 128) && S.process(u, h, m, x, C, E, I, M, N, Tt)
        }
        j != null && C ? It(j, u && u.ref, E, h || u, !h) : j == null && u && u.ref != null && It(u.ref, null, E, u, !0)
    }
      , q = (u, h, m, x) => {
        if (u == null)
            n(h.el = l(h.children), m, x);
        else {
            const C = h.el = u.el;
            h.children !== u.children && a(C, h.children)
        }
    }
      , H = (u, h, m, x) => {
        u == null ? n(h.el = c(h.children || ""), m, x) : h.el = u.el
    }
      , P = (u, h, m, x) => {
        [u.el,u.anchor] = T(u.children, h, m, x, u.el, u.anchor)
    }
      , p = ({el: u, anchor: h}, m, x) => {
        let C;
        for (; u && u !== h; )
            C = _(u),
            n(u, m, x),
            u = C;
        n(h, m, x)
    }
      , g = ({el: u, anchor: h}) => {
        let m;
        for (; u && u !== h; )
            m = _(u),
            r(u),
            u = m;
        r(h)
    }
      , b = (u, h, m, x, C, E, I, M, N) => {
        h.type === "svg" ? I = "svg" : h.type === "math" && (I = "mathml"),
        u == null ? R(h, m, x, C, E, I, M, N) : w(u, h, C, E, I, M, N)
    }
      , R = (u, h, m, x, C, E, I, M) => {
        let N, S;
        const {props: j, shapeFlag: F, transition: B, dirs: G} = u;
        if (N = u.el = o(u.type, E, j && j.is, j),
        F & 8 ? f(N, u.children) : F & 16 && V(u.children, N, null, x, C, Sn(u, E), I, M),
        G && Ke(u, null, x, "created"),
        L(N, u, u.scopeId, I, x),
        j) {
            for (const re in j)
                re !== "value" && !Pt(re) && i(N, re, null, j[re], E, x);
            "value"in j && i(N, "value", null, j.value, E),
            (S = j.onVnodeBeforeMount) && Se(S, x, u)
        }
        G && Ke(u, null, x, "beforeMount");
        const X = mo(C, B);
        X && B.beforeEnter(N),
        n(N, h, m),
        ((S = j && j.onVnodeMounted) || X || G) && ue( () => {
            S && Se(S, x, u),
            X && B.enter(N),
            G && Ke(u, null, x, "mounted")
        }
        , C)
    }
      , L = (u, h, m, x, C) => {
        if (m && y(u, m),
        x)
            for (let E = 0; E < x.length; E++)
                y(u, x[E]);
        if (C) {
            let E = C.subTree;
            if (h === E || js(E.type) && (E.ssContent === h || E.ssFallback === h)) {
                const I = C.vnode;
                L(u, I, I.scopeId, I.slotScopeIds, C.parent)
            }
        }
    }
      , V = (u, h, m, x, C, E, I, M, N=0) => {
        for (let S = N; S < u.length; S++) {
            const j = u[S] = M ? it(u[S]) : we(u[S]);
            v(null, j, h, m, x, C, E, I, M)
        }
    }
      , w = (u, h, m, x, C, E, I) => {
        const M = h.el = u.el;
        let {patchFlag: N, dynamicChildren: S, dirs: j} = h;
        N |= u.patchFlag & 16;
        const F = u.props || Y
          , B = h.props || Y;
        let G;
        if (m && ht(m, !1),
        (G = B.onVnodeBeforeUpdate) && Se(G, m, h, u),
        j && Ke(h, u, m, "beforeUpdate"),
        m && ht(m, !0),
        (F.innerHTML && B.innerHTML == null || F.textContent && B.textContent == null) && f(M, ""),
        S ? A(u.dynamicChildren, S, M, m, x, Sn(h, C), E) : I || $(u, h, M, null, m, x, Sn(h, C), E, !1),
        N > 0) {
            if (N & 16)
                U(M, F, B, m, C);
            else if (N & 2 && F.class !== B.class && i(M, "class", null, B.class, C),
            N & 4 && i(M, "style", F.style, B.style, C),
            N & 8) {
                const X = h.dynamicProps;
                for (let re = 0; re < X.length; re++) {
                    const ee = X[re]
                      , xe = F[ee]
                      , _e = B[ee];
                    (_e !== xe || ee === "value") && i(M, ee, xe, _e, C, m)
                }
            }
            N & 1 && u.children !== h.children && f(M, h.children)
        } else
            !I && S == null && U(M, F, B, m, C);
        ((G = B.onVnodeUpdated) || j) && ue( () => {
            G && Se(G, m, h, u),
            j && Ke(h, u, m, "updated")
        }
        , x)
    }
      , A = (u, h, m, x, C, E, I) => {
        for (let M = 0; M < h.length; M++) {
            const N = u[M]
              , S = h[M]
              , j = N.el && (N.type === he || !De(N, S) || N.shapeFlag & 198) ? d(N.el) : m;
            v(N, S, j, null, x, C, E, I, !0)
        }
    }
      , U = (u, h, m, x, C) => {
        if (h !== m) {
            if (h !== Y)
                for (const E in h)
                    !Pt(E) && !(E in m) && i(u, E, h[E], null, C, x);
            for (const E in m) {
                if (Pt(E))
                    continue;
                const I = m[E]
                  , M = h[E];
                I !== M && E !== "value" && i(u, E, M, I, C, x)
            }
            "value"in m && i(u, "value", h.value, m.value, C)
        }
    }
      , O = (u, h, m, x, C, E, I, M, N) => {
        const S = h.el = u ? u.el : l("")
          , j = h.anchor = u ? u.anchor : l("");
        let {patchFlag: F, dynamicChildren: B, slotScopeIds: G} = h;
        G && (M = M ? M.concat(G) : G),
        u == null ? (n(S, m, x),
        n(j, m, x),
        V(h.children || [], m, j, C, E, I, M, N)) : F > 0 && F & 64 && B && u.dynamicChildren ? (A(u.dynamicChildren, B, m, C, E, I, M),
        (h.key != null || C && h === C.subTree) && yr(u, h, !0)) : $(u, h, m, j, C, E, I, M, N)
    }
      , K = (u, h, m, x, C, E, I, M, N) => {
        h.slotScopeIds = M,
        u == null ? h.shapeFlag & 512 ? C.ctx.activate(h, m, x, I, N) : Q(h, m, x, C, E, I, N) : ne(u, h, N)
    }
      , Q = (u, h, m, x, C, E, I) => {
        const M = u.component = Oo(u, x, C);
        if (us(u) && (M.ctx.renderer = Tt),
        No(M, !1, I),
        M.asyncDep) {
            if (C && C.registerDep(M, k, I),
            !u.el) {
                const N = M.subTree = le(fe);
                H(null, N, h, m),
                u.placeholder = N.el
            }
        } else
            k(M, u, h, m, C, E, I)
    }
      , ne = (u, h, m) => {
        const x = h.component = u.component;
        if (Jc(u, h, m))
            if (x.asyncDep && !x.asyncResolved) {
                J(x, h, m);
                return
            } else
                x.next = h,
                x.update();
        else
            h.el = u.el,
            x.vnode = h
    }
      , k = (u, h, m, x, C, E, I) => {
        const M = () => {
            if (u.isMounted) {
                let {next: F, bu: B, u: G, parent: X, vnode: re} = u;
                {
                    const Re = bo(u);
                    if (Re) {
                        F && (F.el = re.el,
                        J(u, F, I)),
                        Re.asyncDep.then( () => {
                            u.isUnmounted || M()
                        }
                        );
                        return
                    }
                }
                let ee = F, xe;
                ht(u, !1),
                F ? (F.el = re.el,
                J(u, F, I)) : F = re,
                B && Nt(B),
                (xe = F.props && F.props.onVnodeBeforeUpdate) && Se(xe, X, F, re),
                ht(u, !0);
                const _e = Os(u)
                  , Le = u.subTree;
                u.subTree = _e,
                v(Le, _e, d(Le.el), ps(Le), u, C, E),
                F.el = _e.el,
                ee === null && hn(u, _e.el),
                G && ue(G, C),
                (xe = F.props && F.props.onVnodeUpdated) && ue( () => Se(xe, X, F, re), C)
            } else {
                let F;
                const {el: B, props: G} = h
                  , {bm: X, m: re, parent: ee, root: xe, type: _e} = u
                  , Le = ot(h);
                if (ht(u, !1),
                X && Nt(X),
                !Le && (F = G && G.onVnodeBeforeMount) && Se(F, ee, h),
                ht(u, !0),
                B && _n) {
                    const Re = () => {
                        u.subTree = Os(u),
                        _n(B, u.subTree, u, C, null)
                    }
                    ;
                    Le && _e.__asyncHydrate ? _e.__asyncHydrate(B, u, Re) : Re()
                } else {
                    xe.ce && xe.ce._def.shadowRoot !== !1 && xe.ce._injectChildStyle(_e);
                    const Re = u.subTree = Os(u);
                    v(null, Re, m, x, u, C, E),
                    h.el = Re.el
                }
                if (re && ue(re, C),
                !Le && (F = G && G.onVnodeMounted)) {
                    const Re = h;
                    ue( () => Se(F, ee, Re), C)
                }
                (h.shapeFlag & 256 || ee && ot(ee.vnode) && ee.vnode.shapeFlag & 256) && u.a && ue(u.a, C),
                u.isMounted = !0,
                h = m = x = null
            }
        }
        ;
        u.scope.on();
        const N = u.effect = new Fs(M);
        u.scope.off();
        const S = u.update = N.run.bind(N)
          , j = u.job = N.runIfDirty.bind(N);
        j.i = u,
        j.id = u.uid,
        N.scheduler = () => lr(j),
        ht(u, !0),
        S()
    }
      , J = (u, h, m) => {
        h.component = u;
        const x = u.vnode.props;
        u.vnode = h,
        u.next = null,
        Mc(u, h.props, x, m),
        Dc(u, h.children, m),
        Xe(),
        Nr(u),
        Ze()
    }
      , $ = (u, h, m, x, C, E, I, M, N=!1) => {
        const S = u && u.children
          , j = u ? u.shapeFlag : 0
          , F = h.children
          , {patchFlag: B, shapeFlag: G} = h;
        if (B > 0) {
            if (B & 128) {
                hs(S, F, m, x, C, E, I, M, N);
                return
            } else if (B & 256) {
                ce(S, F, m, x, C, E, I, M, N);
                return
            }
        }
        G & 8 ? (j & 16 && Ut(S, C, E),
        F !== S && f(m, F)) : j & 16 ? G & 16 ? hs(S, F, m, x, C, E, I, M, N) : Ut(S, C, E, !0) : (j & 8 && f(m, ""),
        G & 16 && V(F, m, x, C, E, I, M, N))
    }
      , ce = (u, h, m, x, C, E, I, M, N) => {
        u = u || Rt,
        h = h || Rt;
        const S = u.length
          , j = h.length
          , F = Math.min(S, j);
        let B;
        for (B = 0; B < F; B++) {
            const G = h[B] = N ? it(h[B]) : we(h[B]);
            v(u[B], G, m, null, C, E, I, M, N)
        }
        S > j ? Ut(u, C, E, !0, !1, F) : V(h, m, x, C, E, I, M, N, F)
    }
      , hs = (u, h, m, x, C, E, I, M, N) => {
        let S = 0;
        const j = h.length;
        let F = u.length - 1
          , B = j - 1;
        for (; S <= F && S <= B; ) {
            const G = u[S]
              , X = h[S] = N ? it(h[S]) : we(h[S]);
            if (De(G, X))
                v(G, X, m, null, C, E, I, M, N);
            else
                break;
            S++
        }
        for (; S <= F && S <= B; ) {
            const G = u[F]
              , X = h[B] = N ? it(h[B]) : we(h[B]);
            if (De(G, X))
                v(G, X, m, null, C, E, I, M, N);
            else
                break;
            F--,
            B--
        }
        if (S > F) {
            if (S <= B) {
                const G = B + 1
                  , X = G < j ? h[G].el : x;
                for (; S <= B; )
                    v(null, h[S] = N ? it(h[S]) : we(h[S]), m, X, C, E, I, M, N),
                    S++
            }
        } else if (S > B)
            for (; S <= F; )
                Be(u[S], C, E, !0),
                S++;
        else {
            const G = S
              , X = S
              , re = new Map;
            for (S = X; S <= B; S++) {
                const Oe = h[S] = N ? it(h[S]) : we(h[S]);
                Oe.key != null && re.set(Oe.key, S)
            }
            let ee, xe = 0;
            const _e = B - X + 1;
            let Le = !1
              , Re = 0;
            const $t = new Array(_e);
            for (S = 0; S < _e; S++)
                $t[S] = 0;
            for (S = G; S <= F; S++) {
                const Oe = u[S];
                if (xe >= _e) {
                    Be(Oe, C, E, !0);
                    continue
                }
                let Ue;
                if (Oe.key != null)
                    Ue = re.get(Oe.key);
                else
                    for (ee = X; ee <= B; ee++)
                        if ($t[ee - X] === 0 && De(Oe, h[ee])) {
                            Ue = ee;
                            break
                        }
                Ue === void 0 ? Be(Oe, C, E, !0) : ($t[Ue - X] = S + 1,
                Ue >= Re ? Re = Ue : Le = !0,
                v(Oe, h[Ue], m, null, C, E, I, M, N),
                xe++)
            }
            const xr = Le ? kc($t) : Rt;
            for (ee = xr.length - 1,
            S = _e - 1; S >= 0; S--) {
                const Oe = X + S
                  , Ue = h[Oe]
                  , Sr = h[Oe + 1]
                  , wr = Oe + 1 < j ? Sr.el || Sr.placeholder : x;
                $t[S] === 0 ? v(null, Ue, m, wr, C, E, I, M, N) : Le && (ee < 0 || S !== xr[ee] ? dt(Ue, m, wr, 2) : ee--)
            }
        }
    }
      , dt = (u, h, m, x, C=null) => {
        const {el: E, type: I, transition: M, children: N, shapeFlag: S} = u;
        if (S & 6) {
            dt(u.component.subTree, h, m, x);
            return
        }
        if (S & 128) {
            u.suspense.move(h, m, x);
            return
        }
        if (S & 64) {
            I.move(u, h, m, Tt);
            return
        }
        if (I === he) {
            n(E, h, m);
            for (let F = 0; F < N.length; F++)
                dt(N[F], h, m, x);
            n(u.anchor, h, m);
            return
        }
        if (I === Lt) {
            p(u, h, m);
            return
        }
        if (x !== 2 && S & 1 && M)
            if (x === 0)
                M.beforeEnter(E),
                n(E, h, m),
                ue( () => M.enter(E), C);
            else {
                const {leave: F, delayLeave: B, afterLeave: G} = M
                  , X = () => {
                    u.ctx.isUnmounted ? r(E) : n(E, h, m)
                }
                  , re = () => {
                    F(E, () => {
                        X(),
                        G && G()
                    }
                    )
                }
                ;
                B ? B(E, X, re) : re()
            }
        else
            n(E, h, m)
    }
      , Be = (u, h, m, x=!1, C=!1) => {
        const {type: E, props: I, ref: M, children: N, dynamicChildren: S, shapeFlag: j, patchFlag: F, dirs: B, cacheIndex: G} = u;
        if (F === -2 && (C = !1),
        M != null && (Xe(),
        It(M, null, m, u, !0),
        Ze()),
        G != null && (h.renderCache[G] = void 0),
        j & 256) {
            h.ctx.deactivate(u);
            return
        }
        const X = j & 1 && B
          , re = !ot(u);
        let ee;
        if (re && (ee = I && I.onVnodeBeforeUnmount) && Se(ee, h, u),
        j & 6)
            zo(u.component, m, x);
        else {
            if (j & 128) {
                u.suspense.unmount(m, x);
                return
            }
            X && Ke(u, null, h, "beforeUnmount"),
            j & 64 ? u.type.remove(u, h, m, Tt, x) : S && !S.hasOnce && (E !== he || F > 0 && F & 64) ? Ut(S, h, m, !1, !0) : (E === he && F & 384 || !C && j & 16) && Ut(N, h, m),
            x && Tr(u)
        }
        (re && (ee = I && I.onVnodeUnmounted) || X) && ue( () => {
            ee && Se(ee, h, u),
            X && Ke(u, null, h, "unmounted")
        }
        , m)
    }
      , Tr = u => {
        const {type: h, el: m, anchor: x, transition: C} = u;
        if (h === he) {
            Qo(m, x);
            return
        }
        if (h === Lt) {
            g(u);
            return
        }
        const E = () => {
            r(m),
            C && !C.persisted && C.afterLeave && C.afterLeave()
        }
        ;
        if (u.shapeFlag & 1 && C && !C.persisted) {
            const {leave: I, delayLeave: M} = C
              , N = () => I(m, E);
            M ? M(u.el, E, N) : N()
        } else
            E()
    }
      , Qo = (u, h) => {
        let m;
        for (; u !== h; )
            m = _(u),
            r(u),
            u = m;
        r(h)
    }
      , zo = (u, h, m) => {
        const {bum: x, scope: C, job: E, subTree: I, um: M, m: N, a: S, parent: j, slots: {__: F}} = u;
        $s(N),
        $s(S),
        x && Nt(x),
        j && D(F) && F.forEach(B => {
            j.renderCache[B] = void 0
        }
        ),
        C.stop(),
        E && (E.flags |= 8,
        Be(I, u, h, m)),
        M && ue(M, h),
        ue( () => {
            u.isUnmounted = !0
        }
        , h),
        h && h.pendingBranch && !h.isUnmounted && u.asyncDep && !u.asyncResolved && u.suspenseId === h.pendingId && (h.deps--,
        h.deps === 0 && h.resolve())
    }
      , Ut = (u, h, m, x=!1, C=!1, E=0) => {
        for (let I = E; I < u.length; I++)
            Be(u[I], h, m, x, C)
    }
      , ps = u => {
        if (u.shapeFlag & 6)
            return ps(u.component.subTree);
        if (u.shapeFlag & 128)
            return u.suspense.next();
        const h = _(u.anchor || u.el)
          , m = h && h[Wi];
        return m ? _(m) : h
    }
    ;
    let pn = !1;
    const Er = (u, h, m) => {
        u == null ? h._vnode && Be(h._vnode, null, null, !0) : v(h._vnode || null, u, h, null, null, null, m),
        h._vnode = u,
        pn || (pn = !0,
        Nr(),
        Bs(),
        pn = !1)
    }
      , Tt = {
        p: v,
        um: Be,
        m: dt,
        r: Tr,
        mt: Q,
        mc: V,
        pc: $,
        pbc: A,
        n: ps,
        o: e
    };
    let gn, _n;
    return t && ([gn,_n] = t(Tt)),
    {
        render: Er,
        hydrate: gn,
        createApp: Oc(Er, gn)
    }
}
function Sn({type: e, props: t}, s) {
    return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s
}
function ht({effect: e, job: t}, s) {
    s ? (e.flags |= 32,
    t.flags |= 4) : (e.flags &= -33,
    t.flags &= -5)
}
function mo(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}
function yr(e, t, s=!1) {
    const n = e.children
      , r = t.children;
    if (D(n) && D(r))
        for (let i = 0; i < n.length; i++) {
            const o = n[i];
            let l = r[i];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = it(r[i]),
            l.el = o.el),
            !s && l.patchFlag !== -2 && yr(o, l)),
            l.type === bt && (l.el = o.el),
            l.type === fe && !l.el && (l.el = o.el)
        }
}
function kc(e) {
    const t = e.slice()
      , s = [0];
    let n, r, i, o, l;
    const c = e.length;
    for (n = 0; n < c; n++) {
        const a = e[n];
        if (a !== 0) {
            if (r = s[s.length - 1],
            e[r] < a) {
                t[n] = r,
                s.push(n);
                continue
            }
            for (i = 0,
            o = s.length - 1; i < o; )
                l = i + o >> 1,
                e[s[l]] < a ? i = l + 1 : o = l;
            a < e[s[i]] && (i > 0 && (t[n] = s[i - 1]),
            s[i] = n)
        }
    }
    for (i = s.length,
    o = s[i - 1]; i-- > 0; )
        s[i] = o,
        o = t[o];
    return s
}
function bo(e) {
    const t = e.subTree.component;
    if (t)
        return t.asyncDep && !t.asyncResolved ? t : bo(t)
}
function $s(e) {
    if (e)
        for (let t = 0; t < e.length; t++)
            e[t].flags |= 8
}
const Bc = Symbol.for("v-scx")
  , Uc = () => Rs(Bc);
function Yu(e, t) {
    return as(e, null, t)
}
function Xu(e, t) {
    return as(e, null, {
        flush: "post"
    })
}
function $c(e, t) {
    return as(e, null, {
        flush: "sync"
    })
}
function Qt(e, t, s) {
    return as(e, t, s)
}
function as(e, t, s=Y) {
    const {immediate: n, deep: r, flush: i, once: o} = s
      , l = se({}, s)
      , c = t && n || !t && i !== "post";
    let a;
    if (Dt) {
        if (i === "sync") {
            const y = Uc();
            a = y.__watcherHandles || (y.__watcherHandles = [])
        } else if (!c) {
            const y = () => {}
            ;
            return y.stop = Me,
            y.resume = Me,
            y.pause = Me,
            y
        }
    }
    const f = pe;
    l.call = (y, T, v) => ke(y, f, T, v);
    let d = !1;
    i === "post" ? l.scheduler = y => {
        ue(y, f && f.suspense)
    }
    : i !== "sync" && (d = !0,
    l.scheduler = (y, T) => {
        T ? y() : lr(y)
    }
    ),
    l.augmentJob = y => {
        t && (y.flags |= 4),
        d && (y.flags |= 2,
        f && (y.id = f.uid,
        y.i = f))
    }
    ;
    const _ = Yl(e, t, l);
    return Dt && (a ? a.push(_) : c && _()),
    _
}
function jc(e, t, s) {
    const n = this.proxy
      , r = oe(e) ? e.includes(".") ? yo(n, e) : () => n[e] : e.bind(n, n);
    let i;
    W(t) ? i = t : (i = t.handler,
    s = t);
    const o = vt(this)
      , l = as(r, i.bind(n), s);
    return o(),
    l
}
function yo(e, t) {
    const s = t.split(".");
    return () => {
        let n = e;
        for (let r = 0; r < s.length && n; r++)
            n = n[s[r]];
        return n
    }
}
function Zu(e, t, s=Y) {
    const n = Pe()
      , r = ve(t)
      , i = Ae(t)
      , o = vo(e, r)
      , l = jl( (c, a) => {
        let f, d = Y, _;
        return $c( () => {
            const y = e[r];
            Te(f, y) && (f = y,
            a())
        }
        ),
        {
            get() {
                return c(),
                s.get ? s.get(f) : f
            },
            set(y) {
                const T = s.set ? s.set(y) : y;
                if (!Te(T, f) && !(d !== Y && Te(y, d)))
                    return;
                const v = n.vnode.props;
                v && (t in v || r in v || i in v) && (`onUpdate:${t}`in v || `onUpdate:${r}`in v || `onUpdate:${i}`in v) || (f = y,
                a()),
                n.emit(`update:${t}`, T),
                Te(y, T) && Te(y, d) && !Te(T, _) && a(),
                d = y,
                _ = T
            }
        }
    }
    );
    return l[Symbol.iterator] = () => {
        let c = 0;
        return {
            next() {
                return c < 2 ? {
                    value: c++ ? o || Y : l,
                    done: !1
                } : {
                    done: !0
                }
            }
        }
    }
    ,
    l
}
const vo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ve(t)}Modifiers`] || e[`${Ae(t)}Modifiers`];
function Kc(e, t, ...s) {
    if (e.isUnmounted)
        return;
    const n = e.vnode.props || Y;
    let r = s;
    const i = t.startsWith("update:")
      , o = i && vo(n, t.slice(7));
    o && (o.trim && (r = s.map(f => oe(f) ? f.trim() : f)),
    o.number && (r = s.map(Ms)));
    let l, c = n[l = Ss(t)] || n[l = Ss(ve(t))];
    !c && i && (c = n[l = Ss(Ae(t))]),
    c && ke(c, e, 6, r);
    const a = n[l + "Once"];
    if (a) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[l])
            return;
        e.emitted[l] = !0,
        ke(a, e, 6, r)
    }
}
function Co(e, t, s=!1) {
    const n = t.emitsCache
      , r = n.get(e);
    if (r !== void 0)
        return r;
    const i = e.emits;
    let o = {}
      , l = !1;
    if (!W(e)) {
        const c = a => {
            const f = Co(a, t, !0);
            f && (l = !0,
            se(o, f))
        }
        ;
        !s && t.mixins.length && t.mixins.forEach(c),
        e.extends && c(e.extends),
        e.mixins && e.mixins.forEach(c)
    }
    return !i && !l ? (te(e) && n.set(e, null),
    null) : (D(i) ? i.forEach(c => o[c] = null) : se(o, i),
    te(e) && n.set(e, o),
    o)
}
function dn(e, t) {
    return !e || !cs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    z(e, t[0].toLowerCase() + t.slice(1)) || z(e, Ae(t)) || z(e, t))
}
function Os(e) {
    const {type: t, vnode: s, proxy: n, withProxy: r, propsOptions: [i], slots: o, attrs: l, emit: c, render: a, renderCache: f, props: d, data: _, setupState: y, ctx: T, inheritAttrs: v} = e
      , q = rs(e);
    let H, P;
    try {
        if (s.shapeFlag & 4) {
            const g = r || n
              , b = g;
            H = we(a.call(b, g, f, d, y, _, T)),
            P = l
        } else {
            const g = t;
            H = we(g.length > 1 ? g(d, {
                attrs: l,
                slots: o,
                emit: c
            }) : g(d, null)),
            P = t.props ? l : Gc(l)
        }
    } catch (g) {
        zt.length = 0,
        Bt(g, e, 1),
        H = le(fe)
    }
    let p = H;
    if (P && v !== !1) {
        const g = Object.keys(P)
          , {shapeFlag: b} = p;
        g.length && b & 7 && (i && g.some(Xn) && (P = qc(P, i)),
        p = Qe(p, P, !1, !0))
    }
    return s.dirs && (p = Qe(p, null, !1, !0),
    p.dirs = p.dirs ? p.dirs.concat(s.dirs) : s.dirs),
    s.transition && ft(p, s.transition),
    H = p,
    rs(q),
    H
}
function Wc(e, t=!0) {
    let s;
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        if (ut(r)) {
            if (r.type !== fe || r.children === "v-if") {
                if (s)
                    return;
                s = r
            }
        } else
            return
    }
    return s
}
const Gc = e => {
    let t;
    for (const s in e)
        (s === "class" || s === "style" || cs(s)) && ((t || (t = {}))[s] = e[s]);
    return t
}
  , qc = (e, t) => {
    const s = {};
    for (const n in e)
        (!Xn(n) || !(n.slice(9)in t)) && (s[n] = e[n]);
    return s
}
;
function Jc(e, t, s) {
    const {props: n, children: r, component: i} = e
      , {props: o, children: l, patchFlag: c} = t
      , a = i.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (s && c >= 0) {
        if (c & 1024)
            return !0;
        if (c & 16)
            return n ? jr(n, o, a) : !!o;
        if (c & 8) {
            const f = t.dynamicProps;
            for (let d = 0; d < f.length; d++) {
                const _ = f[d];
                if (o[_] !== n[_] && !dn(a, _))
                    return !0
            }
        }
    } else
        return (r || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? o ? jr(n, o, a) : !0 : !!o;
    return !1
}
function jr(e, t, s) {
    const n = Object.keys(t);
    if (n.length !== Object.keys(e).length)
        return !0;
    for (let r = 0; r < n.length; r++) {
        const i = n[r];
        if (t[i] !== e[i] && !dn(s, i))
            return !0
    }
    return !1
}
function hn({vnode: e, parent: t}, s) {
    for (; t; ) {
        const n = t.subTree;
        if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el),
        n === e)
            (e = t.vnode).el = s,
            t = t.parent;
        else
            break
    }
}
const js = e => e.__isSuspense;
let kn = 0;
const Yc = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, s, n, r, i, o, l, c, a) {
        if (e == null)
            Xc(t, s, n, r, i, o, l, c, a);
        else {
            if (i && i.deps > 0 && !e.suspense.isInFallback) {
                t.suspense = e.suspense,
                t.suspense.vnode = t,
                t.el = e.el;
                return
            }
            Zc(e, t, s, n, r, o, l, c, a)
        }
    },
    hydrate: Qc,
    normalize: zc
}
  , Qu = Yc;
function ls(e, t) {
    const s = e.props && e.props[t];
    W(s) && s()
}
function Xc(e, t, s, n, r, i, o, l, c) {
    const {p: a, o: {createElement: f}} = c
      , d = f("div")
      , _ = e.suspense = To(e, r, n, t, d, s, i, o, l, c);
    a(null, _.pendingBranch = e.ssContent, d, null, n, _, i, o),
    _.deps > 0 ? (ls(e, "onPending"),
    ls(e, "onFallback"),
    a(null, e.ssFallback, t, s, n, null, i, o),
    Ft(_, e.ssFallback)) : _.resolve(!1, !0)
}
function Zc(e, t, s, n, r, i, o, l, {p: c, um: a, o: {createElement: f}}) {
    const d = t.suspense = e.suspense;
    d.vnode = t,
    t.el = e.el;
    const _ = t.ssContent
      , y = t.ssFallback
      , {activeBranch: T, pendingBranch: v, isInFallback: q, isHydrating: H} = d;
    if (v)
        d.pendingBranch = _,
        De(_, v) ? (c(v, _, d.hiddenContainer, null, r, d, i, o, l),
        d.deps <= 0 ? d.resolve() : q && (H || (c(T, y, s, n, r, null, i, o, l),
        Ft(d, y)))) : (d.pendingId = kn++,
        H ? (d.isHydrating = !1,
        d.activeBranch = v) : a(v, r, d),
        d.deps = 0,
        d.effects.length = 0,
        d.hiddenContainer = f("div"),
        q ? (c(null, _, d.hiddenContainer, null, r, d, i, o, l),
        d.deps <= 0 ? d.resolve() : (c(T, y, s, n, r, null, i, o, l),
        Ft(d, y))) : T && De(_, T) ? (c(T, _, s, n, r, d, i, o, l),
        d.resolve(!0)) : (c(null, _, d.hiddenContainer, null, r, d, i, o, l),
        d.deps <= 0 && d.resolve()));
    else if (T && De(_, T))
        c(T, _, s, n, r, d, i, o, l),
        Ft(d, _);
    else if (ls(t, "onPending"),
    d.pendingBranch = _,
    _.shapeFlag & 512 ? d.pendingId = _.component.suspenseId : d.pendingId = kn++,
    c(null, _, d.hiddenContainer, null, r, d, i, o, l),
    d.deps <= 0)
        d.resolve();
    else {
        const {timeout: P, pendingId: p} = d;
        P > 0 ? setTimeout( () => {
            d.pendingId === p && d.fallback(y)
        }
        , P) : P === 0 && d.fallback(y)
    }
}
function To(e, t, s, n, r, i, o, l, c, a, f=!1) {
    const {p: d, m: _, um: y, n: T, o: {parentNode: v, remove: q}} = a;
    let H;
    const P = ef(e);
    P && t && t.pendingBranch && (H = t.pendingId,
    t.deps++);
    const p = e.props ? Is(e.props.timeout) : void 0
      , g = i
      , b = {
        vnode: e,
        parent: t,
        parentComponent: s,
        namespace: o,
        container: n,
        hiddenContainer: r,
        deps: 0,
        pendingId: kn++,
        timeout: typeof p == "number" ? p : -1,
        activeBranch: null,
        pendingBranch: null,
        isInFallback: !f,
        isHydrating: f,
        isUnmounted: !1,
        effects: [],
        resolve(R=!1, L=!1) {
            const {vnode: V, activeBranch: w, pendingBranch: A, pendingId: U, effects: O, parentComponent: K, container: Q} = b;
            let ne = !1;
            b.isHydrating ? b.isHydrating = !1 : R || (ne = w && A.transition && A.transition.mode === "out-in",
            ne && (w.transition.afterLeave = () => {
                U === b.pendingId && (_(A, Q, i === g ? T(w) : i, 0),
                ks(O))
            }
            ),
            w && (v(w.el) === Q && (i = T(w)),
            y(w, K, b, !0)),
            ne || _(A, Q, i, 0)),
            Ft(b, A),
            b.pendingBranch = null,
            b.isInFallback = !1;
            let k = b.parent
              , J = !1;
            for (; k; ) {
                if (k.pendingBranch) {
                    k.effects.push(...O),
                    J = !0;
                    break
                }
                k = k.parent
            }
            !J && !ne && ks(O),
            b.effects = [],
            P && t && t.pendingBranch && H === t.pendingId && (t.deps--,
            t.deps === 0 && !L && t.resolve()),
            ls(V, "onResolve")
        },
        fallback(R) {
            if (!b.pendingBranch)
                return;
            const {vnode: L, activeBranch: V, parentComponent: w, container: A, namespace: U} = b;
            ls(L, "onFallback");
            const O = T(V)
              , K = () => {
                b.isInFallback && (d(null, R, A, O, w, null, U, l, c),
                Ft(b, R))
            }
              , Q = R.transition && R.transition.mode === "out-in";
            Q && (V.transition.afterLeave = K),
            b.isInFallback = !0,
            y(V, w, null, !0),
            Q || K()
        },
        move(R, L, V) {
            b.activeBranch && _(b.activeBranch, R, L, V),
            b.container = R
        },
        next() {
            return b.activeBranch && T(b.activeBranch)
        },
        registerDep(R, L, V) {
            const w = !!b.pendingBranch;
            w && b.deps++;
            const A = R.vnode.el;
            R.asyncDep.catch(U => {
                Bt(U, R, 0)
            }
            ).then(U => {
                if (R.isUnmounted || b.isUnmounted || b.pendingId !== R.suspenseId)
                    return;
                R.asyncResolved = !0;
                const {vnode: O} = R;
                jn(R, U, !1),
                A && (O.el = A);
                const K = !A && R.subTree.el;
                L(R, O, v(A || R.subTree.el), A ? null : T(R.subTree), b, o, V),
                K && q(K),
                hn(R, O.el),
                w && --b.deps === 0 && b.resolve()
            }
            )
        },
        unmount(R, L) {
            b.isUnmounted = !0,
            b.activeBranch && y(b.activeBranch, s, R, L),
            b.pendingBranch && y(b.pendingBranch, s, R, L)
        }
    };
    return b
}
function Qc(e, t, s, n, r, i, o, l, c) {
    const a = t.suspense = To(t, n, s, e.parentNode, document.createElement("div"), null, r, i, o, l, !0)
      , f = c(e, a.pendingBranch = t.ssContent, s, a, i, o);
    return a.deps === 0 && a.resolve(!1, !0),
    f
}
function zc(e) {
    const {shapeFlag: t, children: s} = e
      , n = t & 32;
    e.ssContent = Kr(n ? s.default : s),
    e.ssFallback = n ? Kr(s.fallback) : le(fe)
}
function Kr(e) {
    let t;
    if (W(e)) {
        const s = yt && e._c;
        s && (e._d = !1,
        Ks()),
        e = e(),
        s && (e._d = !0,
        t = ye,
        xo())
    }
    return D(e) && (e = Wc(e)),
    e = we(e),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter(s => s !== e)),
    e
}
function Eo(e, t) {
    t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : ks(e)
}
function Ft(e, t) {
    e.activeBranch = t;
    const {vnode: s, parentComponent: n} = e;
    let r = t.el;
    for (; !r && t.component; )
        t = t.component.subTree,
        r = t.el;
    s.el = r,
    n && n.subTree === s && (n.vnode.el = r,
    hn(n, r))
}
function ef(e) {
    const t = e.props && e.props.suspensible;
    return t != null && t !== !1
}
const he = Symbol.for("v-fgt")
  , bt = Symbol.for("v-txt")
  , fe = Symbol.for("v-cmt")
  , Lt = Symbol.for("v-stc")
  , zt = [];
let ye = null;
function Ks(e=!1) {
    zt.push(ye = e ? null : [])
}
function xo() {
    zt.pop(),
    ye = zt[zt.length - 1] || null
}
let yt = 1;
function Wr(e, t=!1) {
    yt += e,
    e < 0 && ye && t && (ye.hasOnce = !0)
}
function So(e) {
    return e.dynamicChildren = yt > 0 ? ye || Rt : null,
    xo(),
    yt > 0 && ye && ye.push(e),
    e
}
function zu(e, t, s, n, r, i) {
    return So(Ao(e, t, s, n, r, i, !0))
}
function Bn(e, t, s, n, r) {
    return So(le(e, t, s, n, r, !0))
}
function ut(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function De(e, t) {
    return e.type === t.type && e.key === t.key
}
function ea(e) {}
const wo = ({key: e}) => e != null ? e : null
  , Ps = ({ref: e, ref_key: t, ref_for: s}) => (typeof e == "number" && (e = "" + e),
e != null ? oe(e) || ae(e) || W(e) ? {
    i: ge,
    r: e,
    k: t,
    f: !!s
} : e : null);
function Ao(e, t=null, s=null, n=0, r=null, i=e === he ? 0 : 1, o=!1, l=!1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && wo(t),
        ref: t && Ps(t),
        scopeId: fn,
        slotScopeIds: null,
        children: s,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: n,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
        ctx: ge
    };
    return l ? (vr(c, s),
    i & 128 && e.normalize(c)) : s && (c.shapeFlag |= oe(s) ? 8 : 16),
    yt > 0 && !o && ye && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && ye.push(c),
    c
}
const le = tf;
function tf(e, t=null, s=null, n=0, r=null, i=!1) {
    if ((!e || e === no) && (e = fe),
    ut(e)) {
        const l = Qe(e, t, !0);
        return s && vr(l, s),
        yt > 0 && !i && ye && (l.shapeFlag & 6 ? ye[ye.indexOf(e)] = l : ye.push(l)),
        l.patchFlag = -2,
        l
    }
    if (ff(e) && (e = e.__vccOpts),
    t) {
        t = sf(t);
        let {class: l, style: c} = t;
        l && !oe(l) && (t.class = sn(l)),
        te(c) && (rr(c) && !D(c) && (c = se({}, c)),
        t.style = tn(c))
    }
    const o = oe(e) ? 1 : js(e) ? 128 : Gi(e) ? 64 : te(e) ? 4 : W(e) ? 2 : 0;
    return Ao(e, t, s, n, r, o, i, !0)
}
function sf(e) {
    return e ? rr(e) || fo(e) ? se({}, e) : e : null
}
function Qe(e, t, s=!1, n=!1) {
    const {props: r, ref: i, patchFlag: o, children: l, transition: c} = e
      , a = t ? nf(r || {}, t) : r
      , f = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && wo(a),
        ref: t && t.ref ? s && i ? D(i) ? i.concat(Ps(t)) : [i, Ps(t)] : Ps(t) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: l,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== he ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: c,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Qe(e.ssContent),
        ssFallback: e.ssFallback && Qe(e.ssFallback),
        placeholder: e.placeholder,
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    };
    return c && n && ft(f, c.clone(f)),
    f
}
function Ro(e=" ", t=0) {
    return le(bt, null, e, t)
}
function ta(e, t) {
    const s = le(Lt, null, e);
    return s.staticCount = t,
    s
}
function sa(e="", t=!1) {
    return t ? (Ks(),
    Bn(fe, null, e)) : le(fe, null, e)
}
function we(e) {
    return e == null || typeof e == "boolean" ? le(fe) : D(e) ? le(he, null, e.slice()) : ut(e) ? it(e) : le(bt, null, String(e))
}
function it(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Qe(e)
}
function vr(e, t) {
    let s = 0;
    const {shapeFlag: n} = e;
    if (t == null)
        t = null;
    else if (D(t))
        s = 16;
    else if (typeof t == "object")
        if (n & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1),
            vr(e, r()),
            r._c && (r._d = !0));
            return
        } else {
            s = 32;
            const r = t._;
            !r && !fo(t) ? t._ctx = ge : r === 3 && ge && (ge.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        W(t) ? (t = {
            default: t,
            _ctx: ge
        },
        s = 32) : (t = String(t),
        n & 64 ? (s = 16,
        t = [Ro(t)]) : s = 8);
    e.children = t,
    e.shapeFlag |= s
}
function nf(...e) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
        const n = e[s];
        for (const r in n)
            if (r === "class")
                t.class !== n.class && (t.class = sn([t.class, n.class]));
            else if (r === "style")
                t.style = tn([t.style, n.style]);
            else if (cs(r)) {
                const i = t[r]
                  , o = n[r];
                o && i !== o && !(D(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o)
            } else
                r !== "" && (t[r] = n[r])
    }
    return t
}
function Se(e, t, s, n=null) {
    ke(e, t, 7, [s, n])
}
const rf = oo();
let of = 0;
function Oo(e, t, s) {
    const n = e.type
      , r = (t ? t.appContext : e.appContext) || rf
      , i = {
        uid: of++,
        vnode: e,
        type: n,
        parent: t,
        appContext: r,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        job: null,
        scope: new yi(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(r.provides),
        ids: t ? t.ids : ["", 0, 0],
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: ao(n, r),
        emitsOptions: Co(n, r),
        emit: null,
        emitted: null,
        propsDefaults: Y,
        inheritAttrs: n.inheritAttrs,
        ctx: Y,
        data: Y,
        props: Y,
        attrs: Y,
        slots: Y,
        refs: Y,
        setupState: Y,
        setupContext: null,
        suspense: s,
        suspenseId: s ? s.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return i.ctx = {
        _: i
    },
    i.root = t ? t.root : i,
    i.emit = Kc.bind(null, i),
    e.ce && e.ce(i),
    i
}
let pe = null;
const Pe = () => pe || ge;
let Ws, Un;
{
    const e = en()
      , t = (s, n) => {
        let r;
        return (r = e[s]) || (r = e[s] = []),
        r.push(n),
        i => {
            r.length > 1 ? r.forEach(o => o(i)) : r[0](i)
        }
    }
    ;
    Ws = t("__VUE_INSTANCE_SETTERS__", s => pe = s),
    Un = t("__VUE_SSR_SETTERS__", s => Dt = s)
}
const vt = e => {
    const t = pe;
    return Ws(e),
    e.scope.on(),
    () => {
        e.scope.off(),
        Ws(t)
    }
}
  , $n = () => {
    pe && pe.scope.off(),
    Ws(null)
}
;
function Po(e) {
    return e.vnode.shapeFlag & 4
}
let Dt = !1;
function No(e, t=!1, s=!1) {
    t && Un(t);
    const {props: n, children: r} = e.vnode
      , i = Po(e);
    Nc(e, n, i, t),
    Lc(e, r, s || t);
    const o = i ? lf(e, t) : void 0;
    return t && Un(!1),
    o
}
function lf(e, t) {
    const s = e.type;
    e.accessCache = Object.create(null),
    e.proxy = new Proxy(e.ctx,Ln);
    const {setup: n} = s;
    if (n) {
        Xe();
        const r = e.setupContext = n.length > 1 ? Io(e) : null
          , i = vt(e)
          , o = fs(n, e, 0, [e.props, r])
          , l = Qn(o);
        if (Ze(),
        i(),
        (l || e.sp) && !ot(e) && fr(e),
        l) {
            if (o.then($n, $n),
            t)
                return o.then(c => {
                    jn(e, c, t)
                }
                ).catch(c => {
                    Bt(c, e, 0)
                }
                );
            e.asyncDep = o
        } else
            jn(e, o, t)
    } else
        Mo(e, t)
}
function jn(e, t, s) {
    W(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) && (e.setupState = Hi(t)),
    Mo(e, s)
}
let Gs, Kn;
function na(e) {
    Gs = e,
    Kn = t => {
        t.render._rc && (t.withProxy = new Proxy(t.ctx,Tc))
    }
}
const ra = () => !Gs;
function Mo(e, t, s) {
    const n = e.type;
    if (!e.render) {
        if (!t && Gs && !n.render) {
            const r = n.template || _r(e).template;
            if (r) {
                const {isCustomElement: i, compilerOptions: o} = e.appContext.config
                  , {delimiters: l, compilerOptions: c} = n
                  , a = se(se({
                    isCustomElement: i,
                    delimiters: l
                }, o), c);
                n.render = Gs(r, a)
            }
        }
        e.render = n.render || Me,
        Kn && Kn(e)
    }
    {
        const r = vt(e);
        Xe();
        try {
            Ec(e)
        } finally {
            Ze(),
            r()
        }
    }
}
const cf = {
    get(e, t) {
        return be(e, "get", ""),
        e[t]
    }
};
function Io(e) {
    const t = s => {
        e.exposed = s || {}
    }
    ;
    return {
        attrs: new Proxy(e.attrs,cf),
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function ds(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Hi(Vl(e.exposed)),{
        get(t, s) {
            if (s in t)
                return t[s];
            if (s in Zt)
                return Zt[s](e)
        },
        has(t, s) {
            return s in t || s in Zt
        }
    })) : e.proxy
}
function Wn(e, t=!0) {
    return W(e) ? e.displayName || e.name : e.name || t && e.__name
}
function ff(e) {
    return W(e) && "__vccOpts"in e
}
const uf = (e, t) => ql(e, t, Dt);
function af(e, t, s) {
    const n = arguments.length;
    return n === 2 ? te(t) && !D(t) ? ut(t) ? le(e, null, [t]) : le(e, t) : le(e, null, t) : (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && ut(s) && (s = [s]),
    le(e, t, s))
}
function ia() {}
function oa(e, t, s, n) {
    const r = s[n];
    if (r && df(r, e))
        return r;
    const i = t();
    return i.memo = e.slice(),
    i.cacheIndex = n,
    s[n] = i
}
function df(e, t) {
    const s = e.memo;
    if (s.length != t.length)
        return !1;
    for (let n = 0; n < s.length; n++)
        if (Te(s[n], t[n]))
            return !1;
    return yt > 0 && ye && ye.push(e),
    !0
}
const hf = "3.5.18"
  , la = Me
  , ca = Ql
  , fa = wt
  , ua = ji
  , pf = {
    createComponentInstance: Oo,
    setupComponent: No,
    renderComponentRoot: Os,
    setCurrentRenderingInstance: rs,
    isVNode: ut,
    normalizeVNode: we,
    getComponentPublicInstance: ds,
    ensureValidVNode: gr,
    pushWarningContext: Xl,
    popWarningContext: Zl
}
  , aa = pf
  , da = null
  , ha = null
  , pa = null;
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Gn;
const Gr = typeof window != "undefined" && window.trustedTypes;
if (Gr)
    try {
        Gn = Gr.createPolicy("vue", {
            createHTML: e => e
        })
    } catch (e) {}
const Fo = Gn ? e => Gn.createHTML(e) : e => e
  , gf = "http://www.w3.org/2000/svg"
  , _f = "http://www.w3.org/1998/Math/MathML"
  , Ge = typeof document != "undefined" ? document : null
  , qr = Ge && Ge.createElement("template")
  , mf = {
    insert: (e, t, s) => {
        t.insertBefore(e, s || null)
    }
    ,
    remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e, t, s, n) => {
        const r = t === "svg" ? Ge.createElementNS(gf, e) : t === "mathml" ? Ge.createElementNS(_f, e) : s ? Ge.createElement(e, {
            is: s
        }) : Ge.createElement(e);
        return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple),
        r
    }
    ,
    createText: e => Ge.createTextNode(e),
    createComment: e => Ge.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t
    }
    ,
    setElementText: (e, t) => {
        e.textContent = t
    }
    ,
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Ge.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, s, n, r, i) {
        const o = s ? s.previousSibling : t.lastChild;
        if (r && (r === i || r.nextSibling))
            for (; t.insertBefore(r.cloneNode(!0), s),
            !(r === i || !(r = r.nextSibling)); )
                ;
        else {
            qr.innerHTML = Fo(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
            const l = qr.content;
            if (n === "svg" || n === "mathml") {
                const c = l.firstChild;
                for (; c.firstChild; )
                    l.appendChild(c.firstChild);
                l.removeChild(c)
            }
            t.insertBefore(l, s)
        }
        return [o ? o.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild]
    }
}
  , et = "transition"
  , Kt = "animation"
  , Ht = Symbol("_vtc")
  , Lo = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
}
  , Do = se({}, Xi, Lo)
  , bf = e => (e.displayName = "Transition",
e.props = Do,
e)
  , ga = bf( (e, {slots: t}) => af(nc, Ho(e), t))
  , pt = (e, t=[]) => {
    D(e) ? e.forEach(s => s(...t)) : e && e(...t)
}
  , Jr = e => e ? D(e) ? e.some(t => t.length > 1) : e.length > 1 : !1;
function Ho(e) {
    const t = {};
    for (const O in e)
        O in Lo || (t[O] = e[O]);
    if (e.css === !1)
        return t;
    const {name: s="v", type: n, duration: r, enterFromClass: i=`${s}-enter-from`, enterActiveClass: o=`${s}-enter-active`, enterToClass: l=`${s}-enter-to`, appearFromClass: c=i, appearActiveClass: a=o, appearToClass: f=l, leaveFromClass: d=`${s}-leave-from`, leaveActiveClass: _=`${s}-leave-active`, leaveToClass: y=`${s}-leave-to`} = e
      , T = yf(r)
      , v = T && T[0]
      , q = T && T[1]
      , {onBeforeEnter: H, onEnter: P, onEnterCancelled: p, onLeave: g, onLeaveCancelled: b, onBeforeAppear: R=H, onAppear: L=P, onAppearCancelled: V=p} = t
      , w = (O, K, Q, ne) => {
        O._enterCancelled = ne,
        tt(O, K ? f : l),
        tt(O, K ? a : o),
        Q && Q()
    }
      , A = (O, K) => {
        O._isLeaving = !1,
        tt(O, d),
        tt(O, y),
        tt(O, _),
        K && K()
    }
      , U = O => (K, Q) => {
        const ne = O ? L : P
          , k = () => w(K, O, Q);
        pt(ne, [K, k]),
        Yr( () => {
            tt(K, O ? c : i),
            $e(K, O ? f : l),
            Jr(ne) || Xr(K, n, v, k)
        }
        )
    }
    ;
    return se(t, {
        onBeforeEnter(O) {
            pt(H, [O]),
            $e(O, i),
            $e(O, o)
        },
        onBeforeAppear(O) {
            pt(R, [O]),
            $e(O, c),
            $e(O, a)
        },
        onEnter: U(!1),
        onAppear: U(!0),
        onLeave(O, K) {
            O._isLeaving = !0;
            const Q = () => A(O, K);
            $e(O, d),
            O._enterCancelled ? ($e(O, _),
            qn()) : (qn(),
            $e(O, _)),
            Yr( () => {
                O._isLeaving && (tt(O, d),
                $e(O, y),
                Jr(g) || Xr(O, n, q, Q))
            }
            ),
            pt(g, [O, Q])
        },
        onEnterCancelled(O) {
            w(O, !1, void 0, !0),
            pt(p, [O])
        },
        onAppearCancelled(O) {
            w(O, !0, void 0, !0),
            pt(V, [O])
        },
        onLeaveCancelled(O) {
            A(O),
            pt(b, [O])
        }
    })
}
function yf(e) {
    if (e == null)
        return null;
    if (te(e))
        return [wn(e.enter), wn(e.leave)];
    {
        const t = wn(e);
        return [t, t]
    }
}
function wn(e) {
    return Is(e)
}
function $e(e, t) {
    t.split(/\s+/).forEach(s => s && e.classList.add(s)),
    (e[Ht] || (e[Ht] = new Set)).add(t)
}
function tt(e, t) {
    t.split(/\s+/).forEach(n => n && e.classList.remove(n));
    const s = e[Ht];
    s && (s.delete(t),
    s.size || (e[Ht] = void 0))
}
function Yr(e) {
    requestAnimationFrame( () => {
        requestAnimationFrame(e)
    }
    )
}
let vf = 0;
function Xr(e, t, s, n) {
    const r = e._endId = ++vf
      , i = () => {
        r === e._endId && n()
    }
    ;
    if (s != null)
        return setTimeout(i, s);
    const {type: o, timeout: l, propCount: c} = Vo(e, t);
    if (!o)
        return n();
    const a = o + "end";
    let f = 0;
    const d = () => {
        e.removeEventListener(a, _),
        i()
    }
      , _ = y => {
        y.target === e && ++f >= c && d()
    }
    ;
    setTimeout( () => {
        f < c && d()
    }
    , l + 1),
    e.addEventListener(a, _)
}
function Vo(e, t) {
    const s = window.getComputedStyle(e)
      , n = T => (s[T] || "").split(", ")
      , r = n(`${et}Delay`)
      , i = n(`${et}Duration`)
      , o = Zr(r, i)
      , l = n(`${Kt}Delay`)
      , c = n(`${Kt}Duration`)
      , a = Zr(l, c);
    let f = null
      , d = 0
      , _ = 0;
    t === et ? o > 0 && (f = et,
    d = o,
    _ = i.length) : t === Kt ? a > 0 && (f = Kt,
    d = a,
    _ = c.length) : (d = Math.max(o, a),
    f = d > 0 ? o > a ? et : Kt : null,
    _ = f ? f === et ? i.length : c.length : 0);
    const y = f === et && /\b(transform|all)(,|$)/.test(n(`${et}Property`).toString());
    return {
        type: f,
        timeout: d,
        propCount: _,
        hasTransform: y
    }
}
function Zr(e, t) {
    for (; e.length < t.length; )
        e = e.concat(e);
    return Math.max(...t.map( (s, n) => Qr(s) + Qr(e[n])))
}
function Qr(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3
}
function qn() {
    return document.body.offsetHeight
}
function Cf(e, t, s) {
    const n = e[Ht];
    n && (t = (t ? [t, ...n] : [...n]).join(" ")),
    t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t
}
const qs = Symbol("_vod")
  , ko = Symbol("_vsh")
  , Tf = {
    beforeMount(e, {value: t}, {transition: s}) {
        e[qs] = e.style.display === "none" ? "" : e.style.display,
        s && t ? s.beforeEnter(e) : Wt(e, t)
    },
    mounted(e, {value: t}, {transition: s}) {
        s && t && s.enter(e)
    },
    updated(e, {value: t, oldValue: s}, {transition: n}) {
        !t != !s && (n ? t ? (n.beforeEnter(e),
        Wt(e, !0),
        n.enter(e)) : n.leave(e, () => {
            Wt(e, !1)
        }
        ) : Wt(e, t))
    },
    beforeUnmount(e, {value: t}) {
        Wt(e, t)
    }
};
function Wt(e, t) {
    e.style.display = t ? e[qs] : "none",
    e[ko] = !t
}
function Ef() {
    Tf.getSSRProps = ({value: e}) => {
        if (!e)
            return {
                style: {
                    display: "none"
                }
            }
    }
}
const Bo = Symbol("");
function _a(e) {
    const t = Pe();
    if (!t)
        return;
    const s = t.ut = (r=e(t.proxy)) => {
        Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i => Js(i, r))
    }
      , n = () => {
        const r = e(t.proxy);
        t.ce ? Js(t.ce, r) : Jn(t.subTree, r),
        s(r)
    }
    ;
    so( () => {
        ks(n)
    }
    ),
    an( () => {
        Qt(n, Me, {
            flush: "post"
        });
        const r = new MutationObserver(n);
        r.observe(t.subTree.el.parentNode, {
            childList: !0
        }),
        dr( () => r.disconnect())
    }
    )
}
function Jn(e, t) {
    if (e.shapeFlag & 128) {
        const s = e.suspense;
        e = s.activeBranch,
        s.pendingBranch && !s.isHydrating && s.effects.push( () => {
            Jn(s.activeBranch, t)
        }
        )
    }
    for (; e.component; )
        e = e.component.subTree;
    if (e.shapeFlag & 1 && e.el)
        Js(e.el, t);
    else if (e.type === he)
        e.children.forEach(s => Jn(s, t));
    else if (e.type === Lt) {
        let {el: s, anchor: n} = e;
        for (; s && (Js(s, t),
        s !== n); )
            s = s.nextSibling
    }
}
function Js(e, t) {
    if (e.nodeType === 1) {
        const s = e.style;
        let n = "";
        for (const r in t) {
            const i = _l(t[r]);
            s.setProperty(`--${r}`, i),
            n += `--${r}: ${i};`
        }
        s[Bo] = n
    }
}
const xf = /(^|;)\s*display\s*:/;
function Sf(e, t, s) {
    const n = e.style
      , r = oe(s);
    let i = !1;
    if (s && !r) {
        if (t)
            if (oe(t))
                for (const o of t.split(";")) {
                    const l = o.slice(0, o.indexOf(":")).trim();
                    s[l] == null && Ns(n, l, "")
                }
            else
                for (const o in t)
                    s[o] == null && Ns(n, o, "");
        for (const o in s)
            o === "display" && (i = !0),
            Ns(n, o, s[o])
    } else if (r) {
        if (t !== s) {
            const o = n[Bo];
            o && (s += ";" + o),
            n.cssText = s,
            i = xf.test(s)
        }
    } else
        t && e.removeAttribute("style");
    qs in e && (e[qs] = i ? n.display : "",
    e[ko] && (n.display = "none"))
}
const zr = /\s*!important$/;
function Ns(e, t, s) {
    if (D(s))
        s.forEach(n => Ns(e, t, n));
    else if (s == null && (s = ""),
    t.startsWith("--"))
        e.setProperty(t, s);
    else {
        const n = wf(e, t);
        zr.test(s) ? e.setProperty(Ae(n), s.replace(zr, ""), "important") : e[n] = s
    }
}
const ei = ["Webkit", "Moz", "ms"]
  , An = {};
function wf(e, t) {
    const s = An[t];
    if (s)
        return s;
    let n = ve(t);
    if (n !== "filter" && n in e)
        return An[t] = n;
    n = zs(n);
    for (let r = 0; r < ei.length; r++) {
        const i = ei[r] + n;
        if (i in e)
            return An[t] = i
    }
    return t
}
const ti = "http://www.w3.org/1999/xlink";
function si(e, t, s, n, r, i=hl(t)) {
    n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(ti, t.slice(6, t.length)) : e.setAttributeNS(ti, t, s) : s == null || i && !_i(s) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Ve(s) ? String(s) : s)
}
function ni(e, t, s, n, r) {
    if (t === "innerHTML" || t === "textContent") {
        s != null && (e[t] = t === "innerHTML" ? Fo(s) : s);
        return
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
        const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value
          , c = s == null ? e.type === "checkbox" ? "on" : "" : String(s);
        (l !== c || !("_value"in e)) && (e.value = c),
        s == null && e.removeAttribute(t),
        e._value = s;
        return
    }
    let o = !1;
    if (s === "" || s == null) {
        const l = typeof e[t];
        l === "boolean" ? s = _i(s) : s == null && l === "string" ? (s = "",
        o = !0) : l === "number" && (s = 0,
        o = !0)
    }
    try {
        e[t] = s
    } catch (l) {}
    o && e.removeAttribute(r || t)
}
function Ye(e, t, s, n) {
    e.addEventListener(t, s, n)
}
function Af(e, t, s, n) {
    e.removeEventListener(t, s, n)
}
const ri = Symbol("_vei");
function Rf(e, t, s, n, r=null) {
    const i = e[ri] || (e[ri] = {})
      , o = i[t];
    if (n && o)
        o.value = n;
    else {
        const [l,c] = Of(t);
        if (n) {
            const a = i[t] = Mf(n, r);
            Ye(e, l, a, c)
        } else
            o && (Af(e, l, o, c),
            i[t] = void 0)
    }
}
const ii = /(?:Once|Passive|Capture)$/;
function Of(e) {
    let t;
    if (ii.test(e)) {
        t = {};
        let n;
        for (; n = e.match(ii); )
            e = e.slice(0, e.length - n[0].length),
            t[n[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Ae(e.slice(2)), t]
}
let Rn = 0;
const Pf = Promise.resolve()
  , Nf = () => Rn || (Pf.then( () => Rn = 0),
Rn = Date.now());
function Mf(e, t) {
    const s = n => {
        if (!n._vts)
            n._vts = Date.now();
        else if (n._vts <= s.attached)
            return;
        ke(If(n, s.value), t, 5, [n])
    }
    ;
    return s.value = e,
    s.attached = Nf(),
    s
}
function If(e, t) {
    if (D(t)) {
        const s = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            s.call(e),
            e._stopped = !0
        }
        ,
        t.map(n => r => !r._stopped && n && n(r))
    } else
        return t
}
const oi = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123
  , Ff = (e, t, s, n, r, i) => {
    const o = r === "svg";
    t === "class" ? Cf(e, n, o) : t === "style" ? Sf(e, s, n) : cs(t) ? Xn(t) || Rf(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : Lf(e, t, n, o)) ? (ni(e, t, n),
    !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && si(e, t, n, o, i, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !oe(n)) ? ni(e, ve(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n),
    si(e, t, n, o))
}
;
function Lf(e, t, s, n) {
    if (n)
        return !!(t === "innerHTML" || t === "textContent" || t in e && oi(t) && W(s));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
        return !1;
    if (t === "width" || t === "height") {
        const r = e.tagName;
        if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
            return !1
    }
    return oi(t) && oe(s) ? !1 : t in e
}
const li = {};
/*! #__NO_SIDE_EFFECTS__ */
function Df(e, t, s) {
    const n = eo(e, t);
    Zs(n) && se(n, t);
    class r extends Cr {
        constructor(o) {
            super(n, o, s)
        }
    }
    return r.def = n,
    r
}
/*! #__NO_SIDE_EFFECTS__ */
const ma = (e, t) => Df(e, t, zf)
  , Hf = typeof HTMLElement != "undefined" ? HTMLElement : class {
}
;
class Cr extends Hf {
    constructor(t, s={}, n=hi) {
        super(),
        this._def = t,
        this._props = s,
        this._createApp = n,
        this._isVueCE = !0,
        this._instance = null,
        this._app = null,
        this._nonce = this._def.nonce,
        this._connected = !1,
        this._resolved = !1,
        this._numberProps = null,
        this._styleChildren = new WeakSet,
        this._ob = null,
        this.shadowRoot && n !== hi ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow({
            mode: "open"
        }),
        this._root = this.shadowRoot) : this._root = this
    }
    connectedCallback() {
        if (!this.isConnected)
            return;
        !this.shadowRoot && !this._resolved && this._parseSlots(),
        this._connected = !0;
        let t = this;
        for (; t = t && (t.parentNode || t.host); )
            if (t instanceof Cr) {
                this._parent = t;
                break
            }
        this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then( () => {
            this._pendingResolve = void 0,
            this._resolveDef()
        }
        ) : this._resolveDef())
    }
    _setParent(t=this._parent) {
        t && (this._instance.parent = t._instance,
        this._inheritParentContext(t))
    }
    _inheritParentContext(t=this._parent) {
        t && this._app && Object.setPrototypeOf(this._app._context.provides, t._instance.provides)
    }
    disconnectedCallback() {
        this._connected = !1,
        or( () => {
            this._connected || (this._ob && (this._ob.disconnect(),
            this._ob = null),
            this._app && this._app.unmount(),
            this._instance && (this._instance.ce = void 0),
            this._app = this._instance = null)
        }
        )
    }
    _resolveDef() {
        if (this._pendingResolve)
            return;
        for (let n = 0; n < this.attributes.length; n++)
            this._setAttr(this.attributes[n].name);
        this._ob = new MutationObserver(n => {
            for (const r of n)
                this._setAttr(r.attributeName)
        }
        ),
        this._ob.observe(this, {
            attributes: !0
        });
        const t = (n, r=!1) => {
            this._resolved = !0,
            this._pendingResolve = void 0;
            const {props: i, styles: o} = n;
            let l;
            if (i && !D(i))
                for (const c in i) {
                    const a = i[c];
                    (a === Number || a && a.type === Number) && (c in this._props && (this._props[c] = Is(this._props[c])),
                    (l || (l = Object.create(null)))[ve(c)] = !0)
                }
            this._numberProps = l,
            this._resolveProps(n),
            this.shadowRoot && this._applyStyles(o),
            this._mount(n)
        }
          , s = this._def.__asyncLoader;
        s ? this._pendingResolve = s().then(n => {
            n.configureApp = this._def.configureApp,
            t(this._def = n, !0)
        }
        ) : t(this._def)
    }
    _mount(t) {
        this._app = this._createApp(t),
        this._inheritParentContext(),
        t.configureApp && t.configureApp(this._app),
        this._app._ceVNode = this._createVNode(),
        this._app.mount(this._root);
        const s = this._instance && this._instance.exposed;
        if (s)
            for (const n in s)
                z(this, n) || Object.defineProperty(this, n, {
                    get: () => ir(s[n])
                })
    }
    _resolveProps(t) {
        const {props: s} = t
          , n = D(s) ? s : Object.keys(s || {});
        for (const r of Object.keys(this))
            r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
        for (const r of n.map(ve))
            Object.defineProperty(this, r, {
                get() {
                    return this._getProp(r)
                },
                set(i) {
                    this._setProp(r, i, !0, !0)
                }
            })
    }
    _setAttr(t) {
        if (t.startsWith("data-v-"))
            return;
        const s = this.hasAttribute(t);
        let n = s ? this.getAttribute(t) : li;
        const r = ve(t);
        s && this._numberProps && this._numberProps[r] && (n = Is(n)),
        this._setProp(r, n, !1, !0)
    }
    _getProp(t) {
        return this._props[t]
    }
    _setProp(t, s, n=!0, r=!1) {
        if (s !== this._props[t] && (s === li ? delete this._props[t] : (this._props[t] = s,
        t === "key" && this._app && (this._app._ceVNode.key = s)),
        r && this._instance && this._update(),
        n)) {
            const i = this._ob;
            i && i.disconnect(),
            s === !0 ? this.setAttribute(Ae(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Ae(t), s + "") : s || this.removeAttribute(Ae(t)),
            i && i.observe(this, {
                attributes: !0
            })
        }
    }
    _update() {
        const t = this._createVNode();
        this._app && (t.appContext = this._app._context),
        Qf(t, this._root)
    }
    _createVNode() {
        const t = {};
        this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
        const s = le(this._def, se(t, this._props));
        return this._instance || (s.ce = n => {
            this._instance = n,
            n.ce = this,
            n.isCE = !0;
            const r = (i, o) => {
                this.dispatchEvent(new CustomEvent(i,Zs(o[0]) ? se({
                    detail: o
                }, o[0]) : {
                    detail: o
                }))
            }
            ;
            n.emit = (i, ...o) => {
                r(i, o),
                Ae(i) !== i && r(Ae(i), o)
            }
            ,
            this._setParent()
        }
        ),
        s
    }
    _applyStyles(t, s) {
        if (!t)
            return;
        if (s) {
            if (s === this._def || this._styleChildren.has(s))
                return;
            this._styleChildren.add(s)
        }
        const n = this._nonce;
        for (let r = t.length - 1; r >= 0; r--) {
            const i = document.createElement("style");
            n && i.setAttribute("nonce", n),
            i.textContent = t[r],
            this.shadowRoot.prepend(i)
        }
    }
    _parseSlots() {
        const t = this._slots = {};
        let s;
        for (; s = this.firstChild; ) {
            const n = s.nodeType === 1 && s.getAttribute("slot") || "default";
            (t[n] || (t[n] = [])).push(s),
            this.removeChild(s)
        }
    }
    _renderSlots() {
        const t = (this._teleportTarget || this).querySelectorAll("slot")
          , s = this._instance.type.__scopeId;
        for (let n = 0; n < t.length; n++) {
            const r = t[n]
              , i = r.getAttribute("name") || "default"
              , o = this._slots[i]
              , l = r.parentNode;
            if (o)
                for (const c of o) {
                    if (s && c.nodeType === 1) {
                        const a = s + "-s"
                          , f = document.createTreeWalker(c, 1);
                        c.setAttribute(a, "");
                        let d;
                        for (; d = f.nextNode(); )
                            d.setAttribute(a, "")
                    }
                    l.insertBefore(c, r)
                }
            else
                for (; r.firstChild; )
                    l.insertBefore(r.firstChild, r);
            l.removeChild(r)
        }
    }
    _injectChildStyle(t) {
        this._applyStyles(t.styles, t)
    }
    _removeChildStyle(t) {}
}
function Vf(e) {
    const t = Pe()
      , s = t && t.ce;
    return s || null
}
function ba() {
    const e = Vf();
    return e && e.shadowRoot
}
function ya(e="$style") {
    {
        const t = Pe();
        if (!t)
            return Y;
        const s = t.type.__cssModules;
        if (!s)
            return Y;
        const n = s[e];
        return n || Y
    }
}
const Uo = new WeakMap
  , $o = new WeakMap
  , Ys = Symbol("_moveCb")
  , ci = Symbol("_enterCb")
  , kf = e => (delete e.props.mode,
e)
  , Bf = kf({
    name: "TransitionGroup",
    props: se({}, Do, {
        tag: String,
        moveClass: String
    }),
    setup(e, {slots: t}) {
        const s = Pe()
          , n = Yi();
        let r, i;
        return ur( () => {
            if (!r.length)
                return;
            const o = e.moveClass || `${e.name || "v"}-move`;
            if (!Kf(r[0].el, s.vnode.el, o)) {
                r = [];
                return
            }
            r.forEach(Uf),
            r.forEach($f);
            const l = r.filter(jf);
            qn(),
            l.forEach(c => {
                const a = c.el
                  , f = a.style;
                $e(a, o),
                f.transform = f.webkitTransform = f.transitionDuration = "";
                const d = a[Ys] = _ => {
                    _ && _.target !== a || (!_ || /transform$/.test(_.propertyName)) && (a.removeEventListener("transitionend", d),
                    a[Ys] = null,
                    tt(a, o))
                }
                ;
                a.addEventListener("transitionend", d)
            }
            ),
            r = []
        }
        ),
        () => {
            const o = Z(e)
              , l = Ho(o);
            let c = o.tag || he;
            if (r = [],
            i)
                for (let a = 0; a < i.length; a++) {
                    const f = i[a];
                    f.el && f.el instanceof Element && (r.push(f),
                    ft(f, is(f, l, n, s)),
                    Uo.set(f, f.el.getBoundingClientRect()))
                }
            i = t.default ? cr(t.default()) : [];
            for (let a = 0; a < i.length; a++) {
                const f = i[a];
                f.key != null && ft(f, is(f, l, n, s))
            }
            return le(c, null, i)
        }
    }
})
  , va = Bf;
function Uf(e) {
    const t = e.el;
    t[Ys] && t[Ys](),
    t[ci] && t[ci]()
}
function $f(e) {
    $o.set(e, e.el.getBoundingClientRect())
}
function jf(e) {
    const t = Uo.get(e)
      , s = $o.get(e)
      , n = t.left - s.left
      , r = t.top - s.top;
    if (n || r) {
        const i = e.el.style;
        return i.transform = i.webkitTransform = `translate(${n}px,${r}px)`,
        i.transitionDuration = "0s",
        e
    }
}
function Kf(e, t, s) {
    const n = e.cloneNode()
      , r = e[Ht];
    r && r.forEach(l => {
        l.split(/\s+/).forEach(c => c && n.classList.remove(c))
    }
    ),
    s.split(/\s+/).forEach(l => l && n.classList.add(l)),
    n.style.display = "none";
    const i = t.nodeType === 1 ? t : t.parentNode;
    i.appendChild(n);
    const {hasTransform: o} = Vo(n);
    return i.removeChild(n),
    o
}
const at = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return D(t) ? s => Nt(t, s) : t
}
;
function Wf(e) {
    e.target.composing = !0
}
function fi(e) {
    const t = e.target;
    t.composing && (t.composing = !1,
    t.dispatchEvent(new Event("input")))
}
const Fe = Symbol("_assign")
  , Yn = {
    created(e, {modifiers: {lazy: t, trim: s, number: n}}, r) {
        e[Fe] = at(r);
        const i = n || r.props && r.props.type === "number";
        Ye(e, t ? "change" : "input", o => {
            if (o.target.composing)
                return;
            let l = e.value;
            s && (l = l.trim()),
            i && (l = Ms(l)),
            e[Fe](l)
        }
        ),
        s && Ye(e, "change", () => {
            e.value = e.value.trim()
        }
        ),
        t || (Ye(e, "compositionstart", Wf),
        Ye(e, "compositionend", fi),
        Ye(e, "change", fi))
    },
    mounted(e, {value: t}) {
        e.value = t == null ? "" : t
    },
    beforeUpdate(e, {value: t, oldValue: s, modifiers: {lazy: n, trim: r, number: i}}, o) {
        if (e[Fe] = at(o),
        e.composing)
            return;
        const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Ms(e.value) : e.value
          , c = t == null ? "" : t;
        l !== c && (document.activeElement === e && e.type !== "range" && (n && t === s || r && e.value.trim() === c) || (e.value = c))
    }
}
  , jo = {
    deep: !0,
    created(e, t, s) {
        e[Fe] = at(s),
        Ye(e, "change", () => {
            const n = e._modelValue
              , r = Vt(e)
              , i = e.checked
              , o = e[Fe];
            if (D(n)) {
                const l = nn(n, r)
                  , c = l !== -1;
                if (i && !c)
                    o(n.concat(r));
                else if (!i && c) {
                    const a = [...n];
                    a.splice(l, 1),
                    o(a)
                }
            } else if (Ct(n)) {
                const l = new Set(n);
                i ? l.add(r) : l.delete(r),
                o(l)
            } else
                o(Wo(e, i))
        }
        )
    },
    mounted: ui,
    beforeUpdate(e, t, s) {
        e[Fe] = at(s),
        ui(e, t, s)
    }
};
function ui(e, {value: t, oldValue: s}, n) {
    e._modelValue = t;
    let r;
    if (D(t))
        r = nn(t, n.props.value) > -1;
    else if (Ct(t))
        r = t.has(n.props.value);
    else {
        if (t === s)
            return;
        r = lt(t, Wo(e, !0))
    }
    e.checked !== r && (e.checked = r)
}
const Ko = {
    created(e, {value: t}, s) {
        e.checked = lt(t, s.props.value),
        e[Fe] = at(s),
        Ye(e, "change", () => {
            e[Fe](Vt(e))
        }
        )
    },
    beforeUpdate(e, {value: t, oldValue: s}, n) {
        e[Fe] = at(n),
        t !== s && (e.checked = lt(t, n.props.value))
    }
}
  , Gf = {
    deep: !0,
    created(e, {value: t, modifiers: {number: s}}, n) {
        const r = Ct(t);
        Ye(e, "change", () => {
            const i = Array.prototype.filter.call(e.options, o => o.selected).map(o => s ? Ms(Vt(o)) : Vt(o));
            e[Fe](e.multiple ? r ? new Set(i) : i : i[0]),
            e._assigning = !0,
            or( () => {
                e._assigning = !1
            }
            )
        }
        ),
        e[Fe] = at(n)
    },
    mounted(e, {value: t}) {
        ai(e, t)
    },
    beforeUpdate(e, t, s) {
        e[Fe] = at(s)
    },
    updated(e, {value: t}) {
        e._assigning || ai(e, t)
    }
};
function ai(e, t) {
    const s = e.multiple
      , n = D(t);
    if (!(s && !n && !Ct(t))) {
        for (let r = 0, i = e.options.length; r < i; r++) {
            const o = e.options[r]
              , l = Vt(o);
            if (s)
                if (n) {
                    const c = typeof l;
                    c === "string" || c === "number" ? o.selected = t.some(a => String(a) === String(l)) : o.selected = nn(t, l) > -1
                } else
                    o.selected = t.has(l);
            else if (lt(Vt(o), t)) {
                e.selectedIndex !== r && (e.selectedIndex = r);
                return
            }
        }
        !s && e.selectedIndex !== -1 && (e.selectedIndex = -1)
    }
}
function Vt(e) {
    return "_value"in e ? e._value : e.value
}
function Wo(e, t) {
    const s = t ? "_trueValue" : "_falseValue";
    return s in e ? e[s] : t
}
const qf = {
    created(e, t, s) {
        xs(e, t, s, null, "created")
    },
    mounted(e, t, s) {
        xs(e, t, s, null, "mounted")
    },
    beforeUpdate(e, t, s, n) {
        xs(e, t, s, n, "beforeUpdate")
    },
    updated(e, t, s, n) {
        xs(e, t, s, n, "updated")
    }
};
function Go(e, t) {
    switch (e) {
    case "SELECT":
        return Gf;
    case "TEXTAREA":
        return Yn;
    default:
        switch (t) {
        case "checkbox":
            return jo;
        case "radio":
            return Ko;
        default:
            return Yn
        }
    }
}
function xs(e, t, s, n, r) {
    const o = Go(e.tagName, s.props && s.props.type)[r];
    o && o(e, t, s, n)
}
function Jf() {
    Yn.getSSRProps = ({value: e}) => ({
        value: e
    }),
    Ko.getSSRProps = ({value: e}, t) => {
        if (t.props && lt(t.props.value, e))
            return {
                checked: !0
            }
    }
    ,
    jo.getSSRProps = ({value: e}, t) => {
        if (D(e)) {
            if (t.props && nn(e, t.props.value) > -1)
                return {
                    checked: !0
                }
        } else if (Ct(e)) {
            if (t.props && e.has(t.props.value))
                return {
                    checked: !0
                }
        } else if (e)
            return {
                checked: !0
            }
    }
    ,
    qf.getSSRProps = (e, t) => {
        if (typeof t.type != "string")
            return;
        const s = Go(t.type.toUpperCase(), t.props && t.props.type);
        if (s.getSSRProps)
            return s.getSSRProps(e, t)
    }
}
const Yf = ["ctrl", "shift", "alt", "meta"]
  , Xf = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => "button"in e && e.button !== 0,
    middle: e => "button"in e && e.button !== 1,
    right: e => "button"in e && e.button !== 2,
    exact: (e, t) => Yf.some(s => e[`${s}Key`] && !t.includes(s))
}
  , Ca = (e, t) => {
    const s = e._withMods || (e._withMods = {})
      , n = t.join(".");
    return s[n] || (s[n] = (r, ...i) => {
        for (let o = 0; o < t.length; o++) {
            const l = Xf[t[o]];
            if (l && l(r, t))
                return
        }
        return e(r, ...i)
    }
    )
}
  , Zf = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
}
  , Ta = (e, t) => {
    const s = e._withKeys || (e._withKeys = {})
      , n = t.join(".");
    return s[n] || (s[n] = r => {
        if (!("key"in r))
            return;
        const i = Ae(r.key);
        if (t.some(o => o === i || Zf[o] === i))
            return e(r)
    }
    )
}
  , qo = se({
    patchProp: Ff
}, mf);
let es, di = !1;
function Jo() {
    return es || (es = Hc(qo))
}
function Yo() {
    return es = di ? es : Vc(qo),
    di = !0,
    es
}
const Qf = (...e) => {
    Jo().render(...e)
}
  , Ea = (...e) => {
    Yo().hydrate(...e)
}
  , hi = (...e) => {
    const t = Jo().createApp(...e)
      , {mount: s} = t;
    return t.mount = n => {
        const r = Zo(n);
        if (!r)
            return;
        const i = t._component;
        !W(i) && !i.render && !i.template && (i.template = r.innerHTML),
        r.nodeType === 1 && (r.textContent = "");
        const o = s(r, !1, Xo(r));
        return r instanceof Element && (r.removeAttribute("v-cloak"),
        r.setAttribute("data-v-app", "")),
        o
    }
    ,
    t
}
  , zf = (...e) => {
    const t = Yo().createApp(...e)
      , {mount: s} = t;
    return t.mount = n => {
        const r = Zo(n);
        if (r)
            return s(r, !0, Xo(r))
    }
    ,
    t
}
;
function Xo(e) {
    if (e instanceof SVGElement)
        return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement)
        return "mathml"
}
function Zo(e) {
    return oe(e) ? document.querySelector(e) : e
}
let pi = !1;
const xa = () => {
    pi || (pi = !0,
    Jf(),
    Ef())
}
;
export {jl as $, sa as A, Bn as B, an as C, tn as D, hi as E, he as F, bu as G, jo as H, ar as I, Yn as J, sn as K, Tf as L, Nu as M, _a as N, Ki as O, Ro as P, Yu as Q, Pe as R, dr as S, ga as T, ut as U, Ru as V, Pu as W, Iu as X, yu as Y, Ca as Z, bt as _, nr as a, hc as a$, ur as a0, ta as a1, Wu as a2, Zu as a3, Ta as a4, _c as a5, nc as a6, Xi as a7, fe as a8, pa as a9, Hu as aA, Bu as aB, Vu as aC, Lu as aD, ma as aE, ku as aF, fa as aG, nu as aH, du as aI, cr as aJ, sf as aK, Bt as aL, Ea as aM, Tu as aN, Su as aO, xu as aP, Eu as aQ, ia as aR, xa as aS, df as aT, rr as aU, ct as aV, ra as aW, Ie as aX, Ku as aY, nf as aZ, eu as a_, yi as aa, pu as ab, ca as ac, Au as ad, Fs as ae, Lt as af, Qu as ag, uu as ah, va as ai, au as aj, Cr as ak, hu as al, ke as am, fs as an, ve as ao, zs as ap, Qe as aq, ha as ar, Vc as as, Gu as at, Hc as au, zf as av, Mu as aw, wu as ax, Df as ay, Du as az, ae as b, so as b0, pc as b1, vc as b2, yc as b3, bc as b4, mc as b5, Jl as b6, _u as b7, Hi as b8, gu as b9, $u as bA, Cu as bB, Yi as bC, qf as bD, Ko as bE, Gf as bF, hf as bG, la as bH, Xu as bI, $c as bJ, qu as bK, Uu as bL, oa as bM, mu as bN, ks as ba, Li as bb, na as bc, Qf as bd, Ou as be, da as bf, is as bg, Wr as bh, ua as bi, ft as bj, iu as bk, Bc as bl, aa as bm, ru as bn, Ss as bo, Fu as bp, fu as bq, lu as br, ea as bs, ou as bt, ju as bu, ya as bv, Vf as bw, vu as bx, Uc as by, ba as bz, _t as c, cu as d, tu as e, uf as f, ml as g, Ju as h, Rs as i, eo as j, Hl as k, af as l, Vl as m, or as n, su as o, Pc as p, zu as q, ws as r, kl as s, Z as t, ir as u, Ks as v, Qt as w, Ao as x, le as y, gl as z};
//# sourceMappingURL=runtime-dom.esm-bundler-BBQtLYZd.js.map,var l = (c, n, i) => new Promise( (e, t) => {
    var r = o => {
        try {
            s(i.next(o))
        } catch (m) {
            t(m)
        }
    }
      , a = o => {
        try {
            s(i.throw(o))
        } catch (m) {
            t(m)
        }
    }
      , s = o => o.done ? e(o.value) : Promise.resolve(o.value).then(r, a);
    s((i = i.apply(c, n)).next())
}
);
import {S as p} from "./scholarlyIq-CSCsgKPg.js";
import {w as y} from "./utils-BACTbHDn.js";
import {S as d} from "./config.constant-BTOtLmfz.js";
import {L as f} from "./login-management-service-AsiTy0FF.js";
import "./notifications.constant-CpYlRevd.js";
import "./imaios-global-BEKmHNS5.js";
import "./sha256-DHPrLCgn.js";
import "./_commonjsHelpers-Chg3vePA.js";
window.addEventListener("load", function(c) {
    return l(this, null, function*() {
        const n = new p
          , i = imaios.get("scholarlyiq.event_type")
          , e = imaios.get("scholarlyiq.database")
          , t = imaios.get("scholarlyiq.doi")
          , r = imaios.get("scholarlyiq.yop");
        yield f.awaitConnection();
        const a = y.get(d.IMAIOS_USER_INFORMATION);
        a && n.getSiqInformation(i, e, t, r, a)
    })
});
//# sourceMappingURL=scholarly-iq-js-gBSAWBdZ.js.map
,var E = (N, e, s) => new Promise( (o, c) => {
    var n = t => {
        try {
            i(s.next(t))
        } catch (l) {
            c(l)
        }
    }
      , d = t => {
        try {
            i(s.throw(t))
        } catch (l) {
            c(l)
        }
    }
      , i = t => t.done ? o(t.value) : Promise.resolve(t.value).then(n, d);
    i((s = s.apply(N, e)).next())
}
);
import {w as f, O as S} from "./utils-BACTbHDn.js";
import {N as A} from "./notifications.constant-CpYlRevd.js";
import {S as g, P as h, C} from "./config.constant-BTOtLmfz.js";
import {f as b, a as T} from "./imaios-global-BEKmHNS5.js";
const v = "e-anatomy"
  , y = "vet-anatomy"
  , u = {
    ACCESS: {
        GRANTED: "granted",
        NO_LICENSE: "no_license"
    },
    DEFAULT_USER_ID: 10
}
  , O = [{
    subscription: h.E_ANATOMY,
    database: v
}, {
    subscription: h.VET_ANATOMY,
    database: y
}]
  , R = {
    EAN: v,
    VAN: y
}
  , r = {
    event_type: "event_type",
    platform: "platform",
    database: "database",
    doi: "doi",
    url: "url",
    session_id: "session_id",
    user_id: "user_id",
    user_access: "user_access",
    device: "device",
    access: "access",
    account_id: "account_id",
    site_name: "sitename",
    context: "context"
}
  , P = "global";
class I {
    constructor() {
        f.checkAllExpire(new RegExp(`${g.SIQ_INFORMATION}-.*`)),
        window.siq = I
    }
    static getLocalStorageKey(e, s) {
        return `${g.SIQ_INFORMATION}-${e}_${s}`
    }
    static getDeviceId() {
        let e = S.get("im_device_id");
        return e || (e = this.generateDeviceId(),
        S.add("im_device_id", e)),
        e
    }
    static generateDeviceId() {
        return `w_${Math.random().toString(36).substring(2, 9)}`
    }
    loadScholarlyIqJavaScript(e) {
        let s = document.createElement("script");
        s.type = "text/javascript",
        s.text = "var NTPT_PGEXTRA = '" + e + "';",
        document.body.appendChild(s);
        let o = document.createElement("script");
        o.type = "text/javascript",
        o.src = "//imaiostag.scholarlyiq.com/siqpagetag.js",
        document.body.appendChild(o);
        try {
            window.imaios.pubsub.publish(A.SIQ_SCRIPT_LOADED)
        } catch (c) {}
    }
    static sendImaiosEvent(e, s) {
        const o = s !== "prod" ? "dev-counter.imaios.com" : "counter.imaios.com";
        e.set("cache_nonce", Date.now().toString()),
        window.imaios.fetch(`https://${o}/ptg?${e.toString()}`, {
            method: "GET"
        })
    }
    loadSiqNoScript() {
        let e = document.createElement("noscript")
          , s = document.createElement("img");
        s.src = "//imaiostag.scholarlyiq.com/siqpagetag.gif?js=0",
        s.setAttribute("height", "1"),
        s.setAttribute("width", "1"),
        s.setAttribute("border", "0"),
        s.setAttribute("hspace", "0"),
        s.setAttribute("vspace", "0"),
        e.appendChild(s),
        document.body.appendChild(e)
    }
    getSiqInformation(e, s, o, c, n) {
        return E(this, null, function*() {
            let d = u.DEFAULT_USER_ID;
            n.id !== null && (d = n.id);
            const i = I.getLocalStorageKey(s, d);
            f.checkExpire(i);
            let t = f.get(i);
            if (typeof (t == null ? void 0 : t.im_institution_id) != "undefined" && (t = null),
            t === null) {
                let l = `/${window.imaios.getSiteAccess()}/api/siq/information`;
                if (s.indexOf(",") === -1) {
                    let a = O.find(m => m.database === s)
                      , p = Object.keys(a).map(m => encodeURIComponent(m) + "=" + encodeURIComponent(a[m])).join("&");
                    l += "?" + p
                }
                t = yield(yield b(l)).json(),
                typeof t == "object" && Object.keys(t).length > 0 && f.add(i, t)
            }
            if (typeof t == "object" && Object.keys(t).length > 0) {
                this.updateDataFromThirdPartyProviderCookie(t);
                try {
                    window.imaios.pubsub.publish(A.SIQ_INFORMATION_RESOLVED)
                } catch (l) {}
                this.sendToImaiosEvent(t, e, s, o, c, n)
            }
        })
    }
    sendToImaiosEvent(e, s, o, c, n, d) {
        let i = this.getUserId(e, d);
        const t = new URLSearchParams;
        t.set(r.user_id, i),
        t.set(r.url, window.location.href),
        t.set(r.platform, "web"),
        t.set(r.database, o),
        t.set(r.event_type, s),
        t.set(r.context, P);
        const l = O.filter(a => o.includes(a.database)).map(a => a.subscription);
        if (e.siq_id !== "") {
            let a;
            e.siq_b2b_is_ip ? a = this.getUserInstitutionAccessForProduct(d, l) : a = this.getUserGroupAccessForProduct(d, l),
            s === "module_request" && e.siq_licence.search(o) === -1 && (a = u.ACCESS.NO_LICENSE),
            t.set(r.account_id, e.siq_id),
            t.set(r.access, a),
            t.set(r.site_name, e.siq_name)
        } else
            t.set(r.access, ""),
            t.set(r.account_id, "");
        t.set(r.user_access, i !== "" ? this.getUserIndividualAccessForProduct(d, l) : ""),
        t.set(r.doi, c !== null ? c : ""),
        t.set(r.session_id, e.session_id ? window.imaios.sha256(e.session_id).toString() : ""),
        t.set(r.device, I.getDeviceId());
        const _ = imaios.get("env-imaios-event");
        I.sendImaiosEvent(t, _)
    }
    getUserIndividualAccessForProduct(e, s) {
        if (s.some(o => typeof e.access[o] != "undefined")) {
            const o = Object.keys(e.access);
            for (const c of o)
                if (s.includes(c) && e.access[c].individual_premium === !0)
                    return u.ACCESS.GRANTED
        }
        return u.ACCESS.NO_LICENSE
    }
    getUserInstitutionAccessForProduct(e, s) {
        if (s.some(o => typeof e.access[o] != "undefined")) {
            const o = Object.keys(e.access);
            for (const c of o)
                if (s.includes(c) && e.access[c].ip_premium === !0)
                    return u.ACCESS.GRANTED
        }
        return u.ACCESS.NO_LICENSE
    }
    getUserGroupAccessForProduct(e, s) {
        if (s.some(o => typeof e.access[o] != "undefined")) {
            const o = Object.keys(e.access);
            for (const c of o)
                if (s.includes(c) && e.access[c].group_premium === !0)
                    return u.ACCESS.GRANTED
        }
        return u.ACCESS.NO_LICENSE
    }
    sendToScholarlyIq(e, s, o, c, n) {
        const d = imaios.get("env-imaios-event");
        let i, t = e.siq_id, l = e.siq_licence, _ = e.siq_name;
        const a = e.siq_send_log;
        if (typeof t != "undefined" && t) {
            let p = "granted";
            s === "module_request" && l.search(o) === -1 && (p = "no_license"),
            i = "platform=web&database=" + o + "&eventType=" + s + "&accountID=" + t + "&access=" + p,
            c && (i = i + "&DOI=" + c),
            n && (i = i + "&YOP=" + n),
            e.session_id && (i = i + "&sessionid=" + window.imaios.sha256(e.session_id).toString()),
            typeof _ != "undefined" && _ !== "" ? i = i + "&sitename=" + encodeURIComponent(_) : i = i + "&sitename=Unknown",
            d === "prod" && this.loadScholarlyIqJavaScript(i)
        } else
            (Math.random() < 0 || typeof a != "undefined" && a) && (i = "platform=web&database=" + o + "&eventType=" + s + "&access=" + "no_license" + "&accountID=",
            c && (i = i + "&DOI=" + c),
            n && (i = i + "&YOP=" + n),
            e.session_id && (i = i + "&sessionid=" + window.imaios.sha256(e.session_id).toString()),
            i = i + "&sitename=Unknown",
            d === "prod" && this.loadScholarlyIqJavaScript(i))
    }
    updateDataFromThirdPartyProviderCookie(e) {
        var o, c;
        const s = T(C.THIRD_PARTY_PROVIDER);
        if (s)
            try {
                const n = JSON.parse(decodeURIComponent(s));
                e.siq_id = (o = n.scholarlyiq_id) != null ? o : "",
                e.siq_name = (c = n.provider) != null ? c : "",
                e.siq_b2b_is_ip = !1;
                const d = [];
                e.siq_licence = n.product.split(",").map(i => {
                    var t;
                    return (t = R[i]) != null ? t : null
                }
                ).filter(i => i !== null).join(",")
            } catch (n) {}
    }
    getUserId(e, s) {
        var c;
        const o = T(C.THIRD_PARTY_PROVIDER);
        if (o)
            try {
                const n = JSON.parse(decodeURIComponent(o));
                return `${e.siq_id}_${n.cuid}`
            } catch (n) {}
        return (c = s.id) != null ? c : ""
    }
}
export {P as C, I as S, r as a};
//# sourceMappingURL=scholarlyIq-CSCsgKPg.js.map,import {c as T, a as D} from "./_commonjsHelpers-Chg3vePA.js";
var F = {
    exports: {}
};
(function(k, _) {
    (function(O, B) {
        k.exports = B()
    }
    )(T, function() {
        return function() {
            var O = {
                412: function(g, l, I) {
                    function u(b, m) {
                        for (var d = 0; d < m.length; d++) {
                            var i = m[d];
                            i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value"in i && (i.writable = !0),
                            Object.defineProperty(b, i.key, i)
                        }
                    }
                    Object.defineProperty(l, "t", {
                        value: !0
                    });
                    var y = I(775)
                      , S = function() {
                        function b() {
                            (function(i, f) {
                                if (!(i instanceof f))
                                    throw new TypeError("Cannot call a class as a function")
                            }
                            )(this, b)
                        }
                        var m, d;
                        return m = b,
                        d = [{
                            key: "set",
                            value: function(i, f, e) {
                                for (var t, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", n = i.split(r), o = e, s = e, h = 0; h < n.length; h++) {
                                    var v = n[h];
                                    if (v.length === 0)
                                        throw new y.default('"'.concat(i, '" is not a valid property path.'));
                                    o[v] === void 0 && (o[v] = {}),
                                    s = o,
                                    o = o[v],
                                    t = v
                                }
                                return s[t] = f,
                                e
                            }
                        }, {
                            key: "get",
                            value: function(i, f) {
                                for (var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".", t = i.split(e), r = f, n = 0; n < t.length; n++) {
                                    var o = t[n];
                                    if (o.length === 0)
                                        throw new y.default('"'.concat(i, '" is not a valid property path.'));
                                    if (r[o] === void 0)
                                        return null;
                                    r = r[o]
                                }
                                return r
                            }
                        }],
                        d && u(m.prototype, d),
                        b
                    }();
                    l.default = S
                },
                775: function(g, l) {
                    function I(f) {
                        return I = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
                            return typeof e
                        }
                        : function(e) {
                            return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }
                        ,
                        I(f)
                    }
                    function u(f, e) {
                        if (e && (I(e) === "object" || typeof e == "function"))
                            return e;
                        if (e !== void 0)
                            throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (t === void 0)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(f)
                    }
                    function y(f) {
                        var e = typeof Map == "function" ? new Map : void 0;
                        return y = function(t) {
                            if (t === null || (r = t,
                            Function.toString.call(r).indexOf("[native code]") === -1))
                                return t;
                            var r;
                            if (typeof t != "function")
                                throw new TypeError("Super expression must either be null or a function");
                            if (e !== void 0) {
                                if (e.has(t))
                                    return e.get(t);
                                e.set(t, n)
                            }
                            function n() {
                                return S(t, arguments, d(this).constructor)
                            }
                            return n.prototype = Object.create(t.prototype, {
                                constructor: {
                                    value: n,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                            m(n, t)
                        }
                        ,
                        y(f)
                    }
                    function S(f, e, t) {
                        return S = b() ? Reflect.construct : function(r, n, o) {
                            var s = [null];
                            s.push.apply(s, n);
                            var h = new (Function.bind.apply(r, s));
                            return o && m(h, o.prototype),
                            h
                        }
                        ,
                        S.apply(null, arguments)
                    }
                    function b() {
                        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
                            return !1;
                        if (typeof Proxy == "function")
                            return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})),
                            !0
                        } catch (f) {
                            return !1
                        }
                    }
                    function m(f, e) {
                        return m = Object.setPrototypeOf || function(t, r) {
                            return t.__proto__ = r,
                            t
                        }
                        ,
                        m(f, e)
                    }
                    function d(f) {
                        return d = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                            return e.__proto__ || Object.getPrototypeOf(e)
                        }
                        ,
                        d(f)
                    }
                    Object.defineProperty(l, "t", {
                        value: !0
                    });
                    var i = function(f) {
                        (function(o, s) {
                            if (typeof s != "function" && s !== null)
                                throw new TypeError("Super expression must either be null or a function");
                            o.prototype = Object.create(s && s.prototype, {
                                constructor: {
                                    value: o,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                            s && m(o, s)
                        }
                        )(n, f);
                        var e, t, r = (e = n,
                        t = b(),
                        function() {
                            var o, s = d(e);
                            if (t) {
                                var h = d(this).constructor;
                                o = Reflect.construct(s, arguments, h)
                            } else
                                o = s.apply(this, arguments);
                            return u(this, o)
                        }
                        );
                        function n(o) {
                            var s;
                            return function(h, v) {
                                if (!(h instanceof v))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this, n),
                            (s = r.call(this, o)).name = "InvalidParameterException",
                            s
                        }
                        return n
                    }(y(Error));
                    l.default = i
                },
                524: function(g, l, I) {
                    function u(p) {
                        return u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(c) {
                            return typeof c
                        }
                        : function(c) {
                            return c && typeof Symbol == "function" && c.constructor === Symbol && c !== Symbol.prototype ? "symbol" : typeof c
                        }
                        ,
                        u(p)
                    }
                    function y(p, c) {
                        if (!(p instanceof c))
                            throw new TypeError("Cannot call a class as a function")
                    }
                    function S(p, c) {
                        if (typeof c != "function" && c !== null)
                            throw new TypeError("Super expression must either be null or a function");
                        p.prototype = Object.create(c && c.prototype, {
                            constructor: {
                                value: p,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        c && t(p, c)
                    }
                    function b(p) {
                        var c = e();
                        return function() {
                            var a, E = r(p);
                            if (c) {
                                var x = r(this).constructor;
                                a = Reflect.construct(E, arguments, x)
                            } else
                                a = E.apply(this, arguments);
                            return m(this, a)
                        }
                    }
                    function m(p, c) {
                        if (c && (u(c) === "object" || typeof c == "function"))
                            return c;
                        if (c !== void 0)
                            throw new TypeError("Derived constructors may only return object or undefined");
                        return d(p)
                    }
                    function d(p) {
                        if (p === void 0)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return p
                    }
                    function i(p) {
                        var c = typeof Map == "function" ? new Map : void 0;
                        return i = function(a) {
                            if (a === null || (E = a,
                            Function.toString.call(E).indexOf("[native code]") === -1))
                                return a;
                            var E;
                            if (typeof a != "function")
                                throw new TypeError("Super expression must either be null or a function");
                            if (c !== void 0) {
                                if (c.has(a))
                                    return c.get(a);
                                c.set(a, x)
                            }
                            function x() {
                                return f(a, arguments, r(this).constructor)
                            }
                            return x.prototype = Object.create(a.prototype, {
                                constructor: {
                                    value: x,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                            t(x, a)
                        }
                        ,
                        i(p)
                    }
                    function f(p, c, a) {
                        return f = e() ? Reflect.construct : function(E, x, w) {
                            var j = [null];
                            j.push.apply(j, x);
                            var A = new (Function.bind.apply(E, j));
                            return w && t(A, w.prototype),
                            A
                        }
                        ,
                        f.apply(null, arguments)
                    }
                    function e() {
                        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
                            return !1;
                        if (typeof Proxy == "function")
                            return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})),
                            !0
                        } catch (p) {
                            return !1
                        }
                    }
                    function t(p, c) {
                        return t = Object.setPrototypeOf || function(a, E) {
                            return a.__proto__ = E,
                            a
                        }
                        ,
                        t(p, c)
                    }
                    function r(p) {
                        return r = Object.setPrototypeOf ? Object.getPrototypeOf : function(c) {
                            return c.__proto__ || Object.getPrototypeOf(c)
                        }
                        ,
                        r(p)
                    }
                    Object.defineProperty(l, "t", {
                        value: !0
                    }),
                    l.SubscriptionNotFoundException = l.SubscriptionAlreadyExistsException = l.InvalidArgumentException = l.DomainException = void 0;
                    var n = function(p) {
                        S(a, p);
                        var c = b(a);
                        function a() {
                            return y(this, a),
                            c.apply(this, arguments)
                        }
                        return a
                    }(i(Error));
                    l.DomainException = n;
                    var o = I(552)
                      , s = function(p) {
                        S(a, p);
                        var c = b(a);
                        function a(E) {
                            var x;
                            return y(this, a),
                            (x = c.call(this, E)).name = x.constructor.name,
                            (0,
                            o.captureStackTrace)(d(x), x.constructor),
                            x
                        }
                        return a
                    }(n);
                    l.InvalidArgumentException = s;
                    var h = function(p) {
                        S(a, p);
                        var c = b(a);
                        function a(E, x) {
                            var w;
                            return y(this, a),
                            (w = c.call(this, 'Unable to add subscription "'.concat(E, '" to component "').concat(x, '" because it already manage a subscription with same id.'))).name = w.constructor.name,
                            (0,
                            o.captureStackTrace)(d(w), w.constructor),
                            w
                        }
                        return a
                    }(n);
                    l.SubscriptionAlreadyExistsException = h;
                    var v = function(p) {
                        S(a, p);
                        var c = b(a);
                        function a(E, x) {
                            var w;
                            return y(this, a),
                            (w = c.call(this, 'Unable to find subscription with id "'.concat(E, '" in component "').concat(x, '".'))).name = w.constructor.name,
                            (0,
                            o.captureStackTrace)(d(w), w.constructor),
                            w
                        }
                        return a
                    }(n);
                    l.SubscriptionNotFoundException = v
                },
                413: function(g, l) {
                    Object.defineProperty(l, "t", {
                        value: !0
                    }),
                    l.generateId = void 0;
                    var I = new Map;
                    l.generateId = function(u) {
                        var y, S = (y = I.get(u)) !== null && y !== void 0 ? y : 0;
                        return I.set(u, S + 1),
                        "".concat(u, "_").concat(S)
                    }
                },
                552: function(g, l) {
                    Object.defineProperty(l, "t", {
                        value: !0
                    }),
                    l.captureStackTrace = void 0,
                    l.captureStackTrace = function(I, u) {
                        typeof Error.captureStackTrace == "function" && Error.captureStackTrace(I, u)
                    }
                },
                322: function(g, l, I) {
                    Object.defineProperty(l, "t", {
                        value: !0
                    }),
                    l.subscribeFromObject = void 0;
                    var u = new (I(412)).default;
                    l.subscribeFromObject = function(y, S, b) {
                        Object.values(b).forEach(function(m) {
                            var d = y[m.action];
                            if (typeof d == "function") {
                                var i = d.bind(y);
                                y.subscribe(S, m.notification, function(f) {
                                    var e = {};
                                    if (m.mapAttributes !== void 0) {
                                        var t = m.mapAttributes;
                                        Object.keys(t).forEach(function(r) {
                                            var n, o = (n = t[r]) !== null && n !== void 0 ? n : "";
                                            e[r] = u.get(o, f)
                                        }),
                                        i(e)
                                    } else
                                        i(f)
                                })
                            }
                        })
                    }
                },
                537: function(g, l, I) {
                    Object.defineProperty(l, "t", {
                        value: !0
                    }),
                    l.HIGH_PRIORITY = l.DEFAULT_PRIORITY = l.LOW_PRIORITY = l.ROLE = l.findSubscriptionByRoleAndComponentId = void 0;
                    var u = I(524);
                    l.findSubscriptionByRoleAndComponentId = function(y, S, b) {
                        if (S !== l.ROLE.PUBLISHER_ID && S !== l.ROLE.SUBSCRIBER_ID)
                            throw new u.InvalidArgumentException('Invalid argument given for "role" in "findSubscriptionByRoleAndComponentId". Values expected are "publisher_id" or "subscriber_id" but "'.concat(S, '" was given.'));
                        return y.getSubscriptions().filter(function(m) {
                            return (S === l.ROLE.PUBLISHER_ID ? m.publisher_id : m.subscriber_id) === b
                        })
                    }
                    ,
                    l.ROLE = {
                        PUBLISHER_ID: "publisher_id",
                        SUBSCRIBER_ID: "subscriber_id"
                    },
                    l.LOW_PRIORITY = -100,
                    l.DEFAULT_PRIORITY = 0,
                    l.HIGH_PRIORITY = 100
                },
                986: function(g, l, I) {
                    function u(i, f) {
                        for (var e = 0; e < f.length; e++) {
                            var t = f[e];
                            t.enumerable = t.enumerable || !1,
                            t.configurable = !0,
                            "value"in t && (t.writable = !0),
                            Object.defineProperty(i, t.key, t)
                        }
                    }
                    Object.defineProperty(l, "t", {
                        value: !0
                    });
                    var y = I(829)
                      , S = I(757)
                      , b = I(537)
                      , m = I(524)
                      , d = function() {
                        function i(t) {
                            (function(r, n) {
                                if (!(r instanceof n))
                                    throw new TypeError("Cannot call a class as a function")
                            }
                            )(this, i),
                            this.proxies = new Map,
                            this.removedSelfSubscription = new Set,
                            this.id = t,
                            this.publisher = new y.default(t),
                            this.subscriber = new S.default(t)
                        }
                        var f, e;
                        return f = i,
                        e = [{
                            key: "hasSubscription",
                            value: function(t) {
                                return this.subscriber.hasSubscription(t) || this.publisher.hasSubscription(t)
                            }
                        }, {
                            key: "addSubscriber",
                            value: function(t, r) {
                                this.publisher.addSubscriber(t, r)
                            }
                        }, {
                            key: "removeSubscriber",
                            value: function(t) {
                                this.publisher.removeSubscriber(t)
                            }
                        }, {
                            key: "getNbSubscriptionsAsPublisher",
                            value: function() {
                                return this.publisher.getNbSubscriptions()
                            }
                        }, {
                            key: "getNbSubscriptionsAsSubscriber",
                            value: function() {
                                return this.subscriber.getNbSubscriptions()
                            }
                        }, {
                            key: "publish",
                            value: function(t, r) {
                                this.publisher.publish(t, r)
                            }
                        }, {
                            key: "getId",
                            value: function() {
                                return this.id
                            }
                        }, {
                            key: "subscribe",
                            value: function(t, r, n, o) {
                                return this.subscriber.subscribe.apply(this, [t, r, n, o])
                            }
                        }, {
                            key: "getNbSubscriptions",
                            value: function() {
                                return this.subscriber.getNbSubscriptions()
                            }
                        }, {
                            key: "removeSubscription",
                            value: function(t) {
                                this.subscriber.removeSubscription(t)
                            }
                        }, {
                            key: "addSubscription",
                            value: function(t, r) {
                                this.subscriber.addSubscription(t, r)
                            }
                        }, {
                            key: "waitUntil",
                            value: function(t) {
                                return this.subscriber.waitUntil(t)
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                this.publisher.destroy(),
                                this.subscriber.destroy()
                            }
                        }, {
                            key: "is",
                            value: function(t) {
                                return this.id === t
                            }
                        }, {
                            key: "findSubscriptionById",
                            value: function(t) {
                                return this.subscriber.findSubscriptionById(t) || this.publisher.findSubscriptionById(t)
                            }
                        }, {
                            key: "findSubscriptionsByNotificationAndPublisherId",
                            value: function(t, r) {
                                return this.subscriber.findSubscriptionsByNotificationAndPublisherId(t, r)
                            }
                        }, {
                            key: "findSubscriptionsByNotification",
                            value: function(t) {
                                return this.subscriber.findSubscriptionsByNotification(t).concat(this.publisher.findSubscriptionsByNotification(t))
                            }
                        }, {
                            key: "getSubscriptions",
                            value: function() {
                                return this.subscriber.getSubscriptions().concat(this.publisher.getSubscriptions())
                            }
                        }, {
                            key: "unsubscribeFromNotification",
                            value: function(t) {
                                this.subscriber.unsubscribeFromNotification(t)
                            }
                        }, {
                            key: "unsubscribeFromPublisherId",
                            value: function(t) {
                                this.subscriber.unsubscribeFromPublisherId(t)
                            }
                        }, {
                            key: "unsubscribeFromSubscriptionId",
                            value: function(t) {
                                this.subscriber.unsubscribeFromSubscriptionId(t)
                            }
                        }, {
                            key: "continuePublicationOnException",
                            value: function() {
                                this.publisher.continuePublicationOnException()
                            }
                        }, {
                            key: "findSubscriptionByPublisherId",
                            value: function(t) {
                                var r = this.subscriber.findSubscriptionByPublisherId(t).concat((0,
                                b.findSubscriptionByRoleAndComponentId)(this.publisher, b.ROLE.PUBLISHER_ID, t));
                                return t === this.getId() ? Array.from(new Set(r)) : r
                            }
                        }, {
                            key: "findSubscriptionsByNotificationAndSubscriberId",
                            value: function(t, r) {
                                return this.publisher.findSubscriptionsByNotificationAndSubscriberId(t, r)
                            }
                        }, {
                            key: "findSubscriptionBySubscriberId",
                            value: function(t) {
                                var r = this.publisher.findSubscriptionBySubscriberId(t).concat((0,
                                b.findSubscriptionByRoleAndComponentId)(this.subscriber, b.ROLE.SUBSCRIBER_ID, t));
                                return t === this.getId() ? Array.from(new Set(r)) : r
                            }
                        }, {
                            key: "stopPublicationOnException",
                            value: function() {
                                this.publisher.stopPublicationOnException()
                            }
                        }, {
                            key: "clearSubscription",
                            value: function(t) {
                                if (this.removedSelfSubscription.has(t))
                                    this.removedSelfSubscription.delete(t);
                                else {
                                    var r = this.findSubscriptionById(t);
                                    if (r === null)
                                        throw new m.SubscriptionNotFoundException(t,this.getId());
                                    (r == null ? void 0 : r.subscriber_id) === this.subscriber.getId() && this.subscriber.clearSubscription(t),
                                    (r == null ? void 0 : r.publisher_id) === this.publisher.getId() && this.publisher.clearSubscription(t),
                                    (r == null ? void 0 : r.publisher_id) === (r == null ? void 0 : r.subscriber_id) && this.removedSelfSubscription.add(t)
                                }
                            }
                        }, {
                            key: "addProxy",
                            value: function(t, r) {
                                var n = this
                                  , o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(v) {
                                    return v
                                }
                                  , s = this.getPublisherProxies(t.getId())
                                  , h = this.subscribe(t, r, function(v) {
                                    n.publish(r, o(v))
                                });
                                return s.add(h.id),
                                this.proxies.set(t.getId(), s),
                                this
                            }
                        }, {
                            key: "getPublisherProxies",
                            value: function(t) {
                                var r;
                                return (r = this.proxies.get(t)) !== null && r !== void 0 ? r : new Set
                            }
                        }, {
                            key: "removeProxy",
                            value: function(t, r) {
                                var n = this
                                  , o = this.findSubscriptionsByNotificationAndPublisherId(r, t.getId())
                                  , s = this.getPublisherProxies(t.getId());
                                return o.filter(function(h) {
                                    return s.has(h.id)
                                }).forEach(function(h) {
                                    n.unsubscribeFromSubscriptionId(h.id),
                                    s.delete(h.id)
                                }),
                                this
                            }
                        }],
                        e && u(f.prototype, e),
                        i
                    }();
                    l.default = d
                },
                829: function(g, l, I) {
                    function u(r) {
                        return u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
                            return typeof n
                        }
                        : function(n) {
                            return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
                        }
                        ,
                        u(r)
                    }
                    function y(r, n) {
                        if (!(r instanceof n))
                            throw new TypeError("Cannot call a class as a function")
                    }
                    function S(r, n) {
                        for (var o = 0; o < n.length; o++) {
                            var s = n[o];
                            s.enumerable = s.enumerable || !1,
                            s.configurable = !0,
                            "value"in s && (s.writable = !0),
                            Object.defineProperty(r, s.key, s)
                        }
                    }
                    function b(r, n) {
                        return b = Object.setPrototypeOf || function(o, s) {
                            return o.__proto__ = s,
                            o
                        }
                        ,
                        b(r, n)
                    }
                    function m(r) {
                        var n = function() {
                            if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
                                return !1;
                            if (typeof Proxy == "function")
                                return !0;
                            try {
                                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})),
                                !0
                            } catch (o) {
                                return !1
                            }
                        }();
                        return function() {
                            var o, s = i(r);
                            if (n) {
                                var h = i(this).constructor;
                                o = Reflect.construct(s, arguments, h)
                            } else
                                o = s.apply(this, arguments);
                            return d(this, o)
                        }
                    }
                    function d(r, n) {
                        if (n && (u(n) === "object" || typeof n == "function"))
                            return n;
                        if (n !== void 0)
                            throw new TypeError("Derived constructors may only return object or undefined");
                        return function(o) {
                            if (o === void 0)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return o
                        }(r)
                    }
                    function i(r) {
                        return i = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
                            return n.__proto__ || Object.getPrototypeOf(n)
                        }
                        ,
                        i(r)
                    }
                    Object.defineProperty(l, "t", {
                        value: !0
                    });
                    var f = I(657)
                      , e = I(537)
                      , t = function(r) {
                        (function(v, p) {
                            if (typeof p != "function" && p !== null)
                                throw new TypeError("Super expression must either be null or a function");
                            v.prototype = Object.create(p && p.prototype, {
                                constructor: {
                                    value: v,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                            p && b(v, p)
                        }
                        )(h, r);
                        var n, o, s = m(h);
                        function h() {
                            var v;
                            return y(this, h),
                            (v = s.apply(this, arguments)).shouldIStopPublicationOnException = !1,
                            v
                        }
                        return n = h,
                        (o = [{
                            key: "stopPublicationOnException",
                            value: function() {
                                this.shouldIStopPublicationOnException = !0
                            }
                        }, {
                            key: "continuePublicationOnException",
                            value: function() {
                                this.shouldIStopPublicationOnException = !1
                            }
                        }, {
                            key: "publish",
                            value: function(v, p) {
                                var c = this
                                  , a = this.notificationsCollection[v];
                                Array.isArray(a) && a.slice(0).forEach(function(E) {
                                    try {
                                        E.handler(p)
                                    } catch (x) {
                                        if (c.shouldIStopPublicationOnException)
                                            throw x
                                    }
                                })
                            }
                        }, {
                            key: "findSubscriptionBySubscriberId",
                            value: function(v) {
                                return (0,
                                e.findSubscriptionByRoleAndComponentId)(this, e.ROLE.SUBSCRIBER_ID, v)
                            }
                        }, {
                            key: "findSubscriptionsByNotificationAndSubscriberId",
                            value: function(v, p) {
                                return this.findSubscriptionsByNotification(v).filter(function(c) {
                                    return c.subscriber_id === p
                                })
                            }
                        }, {
                            key: "addSubscriber",
                            value: function(v, p) {
                                this.addSubscription(v, p)
                            }
                        }, {
                            key: "removeSubscriber",
                            value: function(v) {
                                this.findSubscriptionBySubscriberId(v).forEach(function(p) {
                                    return p.unsubscribe()
                                })
                            }
                        }]) && S(n.prototype, o),
                        h
                    }(f.default);
                    l.default = t
                },
                757: function(g, l, I) {
                    function u(o) {
                        return u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
                            return typeof s
                        }
                        : function(s) {
                            return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s
                        }
                        ,
                        u(o)
                    }
                    function y(o, s) {
                        if (!(o instanceof s))
                            throw new TypeError("Cannot call a class as a function")
                    }
                    function S(o, s) {
                        for (var h = 0; h < s.length; h++) {
                            var v = s[h];
                            v.enumerable = v.enumerable || !1,
                            v.configurable = !0,
                            "value"in v && (v.writable = !0),
                            Object.defineProperty(o, v.key, v)
                        }
                    }
                    function b(o, s) {
                        return b = Object.setPrototypeOf || function(h, v) {
                            return h.__proto__ = v,
                            h
                        }
                        ,
                        b(o, s)
                    }
                    function m(o) {
                        var s = function() {
                            if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
                                return !1;
                            if (typeof Proxy == "function")
                                return !0;
                            try {
                                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})),
                                !0
                            } catch (h) {
                                return !1
                            }
                        }();
                        return function() {
                            var h, v = i(o);
                            if (s) {
                                var p = i(this).constructor;
                                h = Reflect.construct(v, arguments, p)
                            } else
                                h = v.apply(this, arguments);
                            return d(this, h)
                        }
                    }
                    function d(o, s) {
                        if (s && (u(s) === "object" || typeof s == "function"))
                            return s;
                        if (s !== void 0)
                            throw new TypeError("Derived constructors may only return object or undefined");
                        return function(h) {
                            if (h === void 0)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return h
                        }(o)
                    }
                    function i(o) {
                        return i = Object.setPrototypeOf ? Object.getPrototypeOf : function(s) {
                            return s.__proto__ || Object.getPrototypeOf(s)
                        }
                        ,
                        i(o)
                    }
                    Object.defineProperty(l, "t", {
                        value: !0
                    });
                    var f = I(657)
                      , e = I(537)
                      , t = I(524)
                      , r = I(413)
                      , n = function(o) {
                        (function(c, a) {
                            if (typeof a != "function" && a !== null)
                                throw new TypeError("Super expression must either be null or a function");
                            c.prototype = Object.create(a && a.prototype, {
                                constructor: {
                                    value: c,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                            a && b(c, a)
                        }
                        )(p, o);
                        var s, h, v = m(p);
                        function p() {
                            return y(this, p),
                            v.apply(this, arguments)
                        }
                        return s = p,
                        h = [{
                            key: "unsubscribeFromSubscriptionId",
                            value: function(c) {
                                var a = this.findSubscriptionById(c);
                                if (a === null)
                                    throw new t.SubscriptionNotFoundException(c,this.getId());
                                a.unsubscribe()
                            }
                        }, {
                            key: "findSubscriptionByPublisherId",
                            value: function(c) {
                                return (0,
                                e.findSubscriptionByRoleAndComponentId)(this, e.ROLE.PUBLISHER_ID, c)
                            }
                        }, {
                            key: "unsubscribeFromPublisherId",
                            value: function(c) {
                                this.findSubscriptionByPublisherId(c).map(function(a) {
                                    return a.unsubscribe
                                }).forEach(function(a) {
                                    a()
                                })
                            }
                        }, {
                            key: "unsubscribeFromNotification",
                            value: function(c) {
                                this.findSubscriptionsByNotification(c).map(function(a) {
                                    return a.unsubscribe
                                }).forEach(function(a) {
                                    a()
                                })
                            }
                        }, {
                            key: "subscribe",
                            value: function(c, a, E) {
                                var x = this
                                  , w = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : e.DEFAULT_PRIORITY
                                  , j = this.getNbSubscriptions()
                                  , A = "sub_".concat(this.getId(), "_to_").concat(c.getId(), "_salt_").concat(j);
                                if (isNaN(w) || typeof w != "number")
                                    throw new t.InvalidArgumentException('Unable to create a subscription with priority "'.concat(w, '" (typed as "').concat(u(w), '"). Number value is expected.'));
                                var C = {
                                    id: A,
                                    subscriber_id: this.getId(),
                                    publisher_id: c.getId(),
                                    unsubscribe: function() {
                                        c.clearSubscription(A),
                                        x.clearSubscription(A)
                                    },
                                    priority: w,
                                    handler: E
                                };
                                return this.addSubscription(a, C),
                                c.addSubscriber(a, C),
                                C
                            }
                        }, {
                            key: "getNbSubscriptions",
                            value: function() {
                                return this.nbSubscriptionRecorded
                            }
                        }, {
                            key: "removeSubscription",
                            value: function(c) {
                                this.clearSubscription(c)
                            }
                        }, {
                            key: "waitUntil",
                            value: function(c) {
                                var a = new p((0,
                                r.generateId)("wait-until-".concat(c.map(function(E) {
                                    return E.name
                                }).join("-and-"), "-salt")));
                                return new Promise(function(E) {
                                    Promise.all(c.map(function(x) {
                                        return new Promise(function(w) {
                                            a.subscribe(x.from, x.name, function(j) {
                                                w(j)
                                            })
                                        }
                                        )
                                    })).then(function(x) {
                                        a.destroy(),
                                        E(x)
                                    })
                                }
                                )
                            }
                        }, {
                            key: "findSubscriptionsByNotificationAndPublisherId",
                            value: function(c, a) {
                                return this.findSubscriptionsByNotification(c).filter(function(E) {
                                    return E.publisher_id === a
                                })
                            }
                        }],
                        h && S(s.prototype, h),
                        p
                    }(f.default);
                    l.default = n
                },
                657: function(g, l, I) {
                    function u(d) {
                        return function(i) {
                            if (Array.isArray(i))
                                return y(i)
                        }(d) || function(i) {
                            if (typeof Symbol != "undefined" && i[Symbol.iterator] != null || i["@@iterator"] != null)
                                return Array.from(i)
                        }(d) || function(i, f) {
                            if (i) {
                                if (typeof i == "string")
                                    return y(i, f);
                                var e = Object.prototype.toString.call(i).slice(8, -1);
                                if (e === "Object" && i.constructor && (e = i.constructor.name),
                                e === "Map" || e === "Set")
                                    return Array.from(i);
                                if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
                                    return y(i, f)
                            }
                        }(d) || function() {
                            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
                        }()
                    }
                    function y(d, i) {
                        (i == null || i > d.length) && (i = d.length);
                        for (var f = 0, e = new Array(i); f < i; f++)
                            e[f] = d[f];
                        return e
                    }
                    function S(d, i) {
                        for (var f = 0; f < i.length; f++) {
                            var e = i[f];
                            e.enumerable = e.enumerable || !1,
                            e.configurable = !0,
                            "value"in e && (e.writable = !0),
                            Object.defineProperty(d, e.key, e)
                        }
                    }
                    Object.defineProperty(l, "t", {
                        value: !0
                    });
                    var b = I(524)
                      , m = function() {
                        function d(e) {
                            (function(t, r) {
                                if (!(t instanceof r))
                                    throw new TypeError("Cannot call a class as a function")
                            }
                            )(this, d),
                            this.subscriptionsList = {},
                            this.notificationsCollection = {},
                            this.nbSubscriptionRecorded = 0,
                            this.id = e
                        }
                        var i, f;
                        return i = d,
                        (f = [{
                            key: "getSubscriptions",
                            value: function() {
                                return [].concat.apply([], Object.values(this.notificationsCollection))
                            }
                        }, {
                            key: "getNbSubscriptions",
                            value: function() {
                                return this.nbSubscriptionRecorded
                            }
                        }, {
                            key: "hasSubscription",
                            value: function(e) {
                                return this.subscriptionsList[e] !== void 0
                            }
                        }, {
                            key: "recordSubscription",
                            value: function(e, t) {
                                this.subscriptionsList[e] = t
                            }
                        }, {
                            key: "findSubscriptionIndexById",
                            value: function(e) {
                                var t = this.subscriptionsList[e]
                                  , r = {
                                    index: -1,
                                    notification: t != null ? t : ""
                                };
                                if (t === void 0)
                                    return r;
                                var n = this.notificationsCollection[t];
                                return Array.isArray(n) && (r.index = n.findIndex(function(o) {
                                    return o.id === e
                                })),
                                r
                            }
                        }, {
                            key: "findSubscriptionById",
                            value: function(e) {
                                var t = this.findSubscriptionIndexById(e);
                                return t.index < 0 ? null : this.notificationsCollection[t.notification][t.index]
                            }
                        }, {
                            key: "findSubscriptionsByNotification",
                            value: function(e) {
                                return this.notificationsCollection[e] || []
                            }
                        }, {
                            key: "clearSubscription",
                            value: function(e) {
                                var t = this.findSubscriptionIndexById(e);
                                if (t.index < 0)
                                    throw new b.SubscriptionNotFoundException(e,this.getId());
                                var r = this.notificationsCollection[t.notification].splice(t.index, 1)[0];
                                typeof r.handler == "function" && delete r.handler,
                                delete this.subscriptionsList[e],
                                this.nbSubscriptionRecorded--,
                                this.notificationsCollection[t.notification].length === 0 && delete this.notificationsCollection[t.notification]
                            }
                        }, {
                            key: "addSubscription",
                            value: function(e, t) {
                                if (Array.isArray(this.notificationsCollection[e]) !== !0 && (this.notificationsCollection[e] = []),
                                this.hasSubscription(t.id))
                                    throw new b.SubscriptionAlreadyExistsException(t.id,this.getId());
                                this.notificationsCollection[e].push(t),
                                this.notificationsCollection[e].sort(function(r, n) {
                                    return n.priority - r.priority
                                }),
                                this.recordSubscription(t.id, e),
                                this.nbSubscriptionRecorded++
                            }
                        }, {
                            key: "getId",
                            value: function() {
                                return this.id
                            }
                        }, {
                            key: "is",
                            value: function(e) {
                                return e === this.getId()
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                Object.values(this.notificationsCollection).forEach(function(e) {
                                    u(e).forEach(function(t) {
                                        t.unsubscribe()
                                    })
                                })
                            }
                        }]) && S(i.prototype, f),
                        d
                    }();
                    l.default = m
                }
            }
              , B = {};
            function R(g) {
                var l = B[g];
                if (l !== void 0)
                    return l.exports;
                var I = B[g] = {
                    exports: {}
                };
                return O[g](I, I.exports, R),
                I.exports
            }
            var P = {};
            return function() {
                var g = P;
                Object.defineProperty(g, "t", {
                    value: !0
                }),
                g.SubscriptionNotFoundException = g.SubscriptionAlreadyExistsException = g.InvalidArgumentException = g.SubscriberHelper = g.PublisherSubscriber = g.Subscriber = g.Publisher = void 0;
                var l = R(829);
                Object.defineProperty(g, "Publisher", {
                    enumerable: !0,
                    get: function() {
                        return l.default
                    }
                });
                var I = R(757);
                Object.defineProperty(g, "Subscriber", {
                    enumerable: !0,
                    get: function() {
                        return I.default
                    }
                });
                var u = R(986);
                Object.defineProperty(g, "PublisherSubscriber", {
                    enumerable: !0,
                    get: function() {
                        return u.default
                    }
                }),
                g.SubscriberHelper = R(322);
                var y = R(524);
                Object.defineProperty(g, "InvalidArgumentException", {
                    enumerable: !0,
                    get: function() {
                        return y.InvalidArgumentException
                    }
                }),
                Object.defineProperty(g, "SubscriptionAlreadyExistsException", {
                    enumerable: !0,
                    get: function() {
                        return y.SubscriptionAlreadyExistsException
                    }
                }),
                Object.defineProperty(g, "SubscriptionNotFoundException", {
                    enumerable: !0,
                    get: function() {
                        return y.SubscriptionNotFoundException
                    }
                })
            }(),
            P
        }()
    })
}
)(F);
var q = F.exports
  , N = {
    exports: {}
}
  , L = {
    exports: {}
};
(function(k) {
    (function(_) {
        var O = {
            bytesToHex: function(P) {
                return B(P)
            },
            hexToBytes: function(P) {
                if (P.length % 2 === 1)
                    throw new Error("hexToBytes can't have a string with an odd number of characters.");
                return P.indexOf("0x") === 0 && (P = P.slice(2)),
                P.match(/../g).map(function(g) {
                    return parseInt(g, 16)
                })
            }
        };
        function B(P) {
            return P.map(function(g) {
                return R(g.toString(16), 2)
            }).join("")
        }
        function R(P, g) {
            return P.length > g ? P : Array(g - P.length + 1).join("0") + P
        }
        k.exports ? k.exports = O : _.convertHex = O
    }
    )(T)
}
)(L);
var M = L.exports
  , U = {
    exports: {}
};
(function(k) {
    (function(_) {
        var O = {
            bytesToString: function(B) {
                return B.map(function(R) {
                    return String.fromCharCode(R)
                }).join("")
            },
            stringToBytes: function(B) {
                return B.split("").map(function(R) {
                    return R.charCodeAt(0)
                })
            }
        };
        O.UTF8 = {
            bytesToString: function(B) {
                return decodeURIComponent(escape(O.bytesToString(B)))
            },
            stringToBytes: function(B) {
                return O.stringToBytes(unescape(encodeURIComponent(B)))
            }
        },
        k.exports ? k.exports = O : _.convertString = O
    }
    )(T)
}
)(U);
var Y = U.exports;
(function(k) {
    (function(_) {
        var O = {};
        k.exports ? (O.bytesToHex = M.bytesToHex,
        O.convertString = Y,
        k.exports = I) : (O.bytesToHex = _.convertHex.bytesToHex,
        O.convertString = _.convertString,
        _.sha256 = I);
        var B = [];
        (function() {
            function u(m) {
                for (var d = Math.sqrt(m), i = 2; i <= d; i++)
                    if (!(m % i))
                        return !1;
                return !0
            }
            function y(m) {
                return (m - (m | 0)) * 4294967296 | 0
            }
            for (var S = 2, b = 0; b < 64; )
                u(S) && (B[b] = y(Math.pow(S, 1 / 3)),
                b++),
                S++
        }
        )();
        var R = function(u) {
            for (var y = [], S = 0, b = 0; S < u.length; S++,
            b += 8)
                y[b >>> 5] |= u[S] << 24 - b % 32;
            return y
        }
          , P = function(u) {
            for (var y = [], S = 0; S < u.length * 32; S += 8)
                y.push(u[S >>> 5] >>> 24 - S % 32 & 255);
            return y
        }
          , g = []
          , l = function(u, y, S) {
            for (var b = u[0], m = u[1], d = u[2], i = u[3], f = u[4], e = u[5], t = u[6], r = u[7], n = 0; n < 64; n++) {
                if (n < 16)
                    g[n] = y[S + n] | 0;
                else {
                    var o = g[n - 15]
                      , s = (o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3
                      , h = g[n - 2]
                      , v = (h << 15 | h >>> 17) ^ (h << 13 | h >>> 19) ^ h >>> 10;
                    g[n] = s + g[n - 7] + v + g[n - 16]
                }
                var p = f & e ^ ~f & t
                  , c = b & m ^ b & d ^ m & d
                  , a = (b << 30 | b >>> 2) ^ (b << 19 | b >>> 13) ^ (b << 10 | b >>> 22)
                  , E = (f << 26 | f >>> 6) ^ (f << 21 | f >>> 11) ^ (f << 7 | f >>> 25)
                  , x = r + E + p + B[n] + g[n]
                  , w = a + c;
                r = t,
                t = e,
                e = f,
                f = i + x | 0,
                i = d,
                d = m,
                m = b,
                b = x + w | 0
            }
            u[0] = u[0] + b | 0,
            u[1] = u[1] + m | 0,
            u[2] = u[2] + d | 0,
            u[3] = u[3] + i | 0,
            u[4] = u[4] + f | 0,
            u[5] = u[5] + e | 0,
            u[6] = u[6] + t | 0,
            u[7] = u[7] + r | 0
        };
        function I(u, y) {
            u.constructor === String && (u = O.convertString.UTF8.stringToBytes(u));
            var S = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]
              , b = R(u)
              , m = u.length * 8;
            b[m >> 5] |= 128 << 24 - m % 32,
            b[(m + 64 >> 9 << 4) + 15] = m;
            for (var d = 0; d < b.length; d += 16)
                l(S, b, d);
            var i = P(S);
            return y && y.asBytes ? i : y && y.asString ? O.convertString.bytesToString(i) : O.bytesToHex(i)
        }
        I.x2 = function(u, y) {
            return I(I(u, {
                asBytes: !0
            }), y)
        }
    }
    )(T)
}
)(N);
var W = N.exports;
const H = D(W);
export {q as p, H as t};
//# sourceMappingURL=sha256-DHPrLCgn.js.map,const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["assets/main-BCJxFS3K.js", "assets/runtime-dom.esm-bundler-BBQtLYZd.js", "assets/tippy.esm-B00VeVX7.js", "assets/index-09JYhwSQ.js", "assets/imaios-global-BEKmHNS5.js", "assets/sha256-DHPrLCgn.js", "assets/_commonjsHelpers-Chg3vePA.js", "assets/utils-BACTbHDn.js", "assets/main-Cl9fC4Y5.css", "assets/svg-arrow-BRqCctpv.css"]))) => i.map(i => d[i]);
var c = (e, r, t) => new Promise( (i, n) => {
    var _ = a => {
        try {
            o(t.next(a))
        } catch (u) {
            n(u)
        }
    }
      , d = a => {
        try {
            o(t.throw(a))
        } catch (u) {
            n(u)
        }
    }
      , o = a => a.done ? i(a.value) : Promise.resolve(a.value).then(_, d);
    o((t = t.apply(e, r)).next())
}
);
import {_ as p} from "./preload-helper-DPi8upcZ.js";
function v() {
    let e = null;
    function r(i) {
        return c(this, null, function*() {
            i ? (e = (yield p( () => c(this, null, function*() {
                const {default: n} = yield import("./main-BCJxFS3K.js");
                return {
                    default: n
                }
            }), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))).default,
            yield e.createStructurePreviewApp()) : e == null || e.removeStructurePreviewApp()
        })
    }
    const t = window.matchMedia("(min-width: 991.98px)");
    t.addEventListener("change", ({matches: i}) => r(i)),
    r(t.matches)
}
export {v as a};
//# sourceMappingURL=structure-preview-pPzbpBD4.js.map,import {a as B, c as J} from "./_commonjsHelpers-Chg3vePA.js";
import {j as X} from "./jquery-DneebmYf.js";
import {u as Z} from "./imaios-vendors-script-DpOvQEUH.js";
function ee(E, O) {
    for (var _ = 0; _ < O.length; _++) {
        const s = O[_];
        if (typeof s != "string" && !Array.isArray(s)) {
            for (const u in s)
                if (u !== "default" && !(u in E)) {
                    const e = Object.getOwnPropertyDescriptor(s, u);
                    e && Object.defineProperty(E, u, e.get ? e : {
                        enumerable: !0,
                        get: () => s[u]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(E, Symbol.toStringTag, {
        value: "Module"
    }))
}
var L = {
    exports: {}
};
/*!
  * Bootstrap tab.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(E, O) {
    (function(_, s) {
        E.exports = s(X, Z)
    }
    )(J, function(_, s) {
        function u(r) {
            return r && typeof r == "object" && "default"in r ? r : {
                default: r
            }
        }
        var e = u(_)
          , g = u(s);
        function I(r, d) {
            for (var l = 0; l < d.length; l++) {
                var t = d[l];
                t.enumerable = t.enumerable || !1,
                t.configurable = !0,
                "value"in t && (t.writable = !0),
                Object.defineProperty(r, t.key, t)
            }
        }
        function w(r, d, l) {
            return l && I(r, l),
            Object.defineProperty(r, "prototype", {
                writable: !1
            }),
            r
        }
        var c = "tab"
          , j = "4.6.2"
          , T = "bs.tab"
          , m = "." + T
          , R = ".data-api"
          , P = e.default.fn[c]
          , V = "dropdown-menu"
          , p = "active"
          , x = "disabled"
          , b = "fade"
          , C = "show"
          , M = "hide" + m
          , U = "hidden" + m
          , W = "show" + m
          , G = "shown" + m
          , H = "click" + m + R
          , Q = ".dropdown"
          , F = ".nav, .list-group"
          , S = ".active"
          , D = "> li > .active"
          , K = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]'
          , Y = ".dropdown-toggle"
          , $ = "> .dropdown-menu .active"
          , h = function() {
            function r(l) {
                this._element = l
            }
            var d = r.prototype;
            return d.show = function() {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e.default(this._element).hasClass(p) || e.default(this._element).hasClass(x) || this._element.hasAttribute("disabled"))) {
                    var n, a, f = e.default(this._element).closest(F)[0], i = g.default.getSelectorFromElement(this._element);
                    if (f) {
                        var o = f.nodeName === "UL" || f.nodeName === "OL" ? D : S;
                        a = e.default.makeArray(e.default(f).find(o)),
                        a = a[a.length - 1]
                    }
                    var v = e.default.Event(M, {
                        relatedTarget: this._element
                    })
                      , N = e.default.Event(W, {
                        relatedTarget: a
                    });
                    if (a && e.default(a).trigger(v),
                    e.default(this._element).trigger(N),
                    !(N.isDefaultPrevented() || v.isDefaultPrevented())) {
                        i && (n = document.querySelector(i)),
                        this._activate(this._element, f);
                        var A = function() {
                            var q = e.default.Event(U, {
                                relatedTarget: t._element
                            })
                              , z = e.default.Event(G, {
                                relatedTarget: a
                            });
                            e.default(a).trigger(q),
                            e.default(t._element).trigger(z)
                        };
                        n ? this._activate(n, n.parentNode, A) : A()
                    }
                }
            }
            ,
            d.dispose = function() {
                e.default.removeData(this._element, T),
                this._element = null
            }
            ,
            d._activate = function(t, n, a) {
                var f = this
                  , i = n && (n.nodeName === "UL" || n.nodeName === "OL") ? e.default(n).find(D) : e.default(n).children(S)
                  , o = i[0]
                  , v = a && o && e.default(o).hasClass(b)
                  , N = function() {
                    return f._transitionComplete(t, o, a)
                };
                if (o && v) {
                    var A = g.default.getTransitionDurationFromElement(o);
                    e.default(o).removeClass(C).one(g.default.TRANSITION_END, N).emulateTransitionEnd(A)
                } else
                    N()
            }
            ,
            d._transitionComplete = function(t, n, a) {
                if (n) {
                    e.default(n).removeClass(p);
                    var f = e.default(n.parentNode).find($)[0];
                    f && e.default(f).removeClass(p),
                    n.getAttribute("role") === "tab" && n.setAttribute("aria-selected", !1)
                }
                e.default(t).addClass(p),
                t.getAttribute("role") === "tab" && t.setAttribute("aria-selected", !0),
                g.default.reflow(t),
                t.classList.contains(b) && t.classList.add(C);
                var i = t.parentNode;
                if (i && i.nodeName === "LI" && (i = i.parentNode),
                i && e.default(i).hasClass(V)) {
                    var o = e.default(t).closest(Q)[0];
                    if (o) {
                        var v = [].slice.call(o.querySelectorAll(Y));
                        e.default(v).addClass(p)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                a && a()
            }
            ,
            r._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = e.default(this)
                      , a = n.data(T);
                    if (a || (a = new r(this),
                    n.data(T, a)),
                    typeof t == "string") {
                        if (typeof a[t] == "undefined")
                            throw new TypeError('No method named "' + t + '"');
                        a[t]()
                    }
                })
            }
            ,
            w(r, null, [{
                key: "VERSION",
                get: function() {
                    return j
                }
            }]),
            r
        }();
        return e.default(document).on(H, K, function(r) {
            r.preventDefault(),
            h._jQueryInterface.call(e.default(this), "show")
        }),
        e.default.fn[c] = h._jQueryInterface,
        e.default.fn[c].Constructor = h,
        e.default.fn[c].noConflict = function() {
            return e.default.fn[c] = P,
            h._jQueryInterface
        }
        ,
        h
    })
}
)(L);
var y = L.exports;
const te = B(y)
  , le = ee({
    __proto__: null,
    default: te
}, [y]);
export {le as t};
//# sourceMappingURL=tab-CqW8X6pb.js.map,class a{enable(){}}export{a as T};
//# sourceMappingURL=themeFeature-zU7nRuMw.js.map,var V = "top"
  , X = "bottom"
  , Y = "right"
  , N = "left"
  , mt = "auto"
  , He = [V, X, Y, N]
  , Te = "start"
  , Ie = "end"
  , dr = "clippingParents"
  , Ut = "viewport"
  , Be = "popper"
  , vr = "reference"
  , Tt = He.reduce(function(e, t) {
    return e.concat([t + "-" + Te, t + "-" + Ie])
}, [])
  , Ft = [].concat(He, [mt]).reduce(function(e, t) {
    return e.concat([t, t + "-" + Te, t + "-" + Ie])
}, [])
  , mr = "beforeRead"
  , hr = "read"
  , gr = "afterRead"
  , yr = "beforeMain"
  , br = "main"
  , wr = "afterMain"
  , Or = "beforeWrite"
  , xr = "write"
  , Ar = "afterWrite"
  , Tr = [mr, hr, gr, yr, br, wr, Or, xr, Ar];
function te(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
}
function F(e) {
    if (e == null)
        return window;
    if (e.toString() !== "[object Window]") {
        var t = e.ownerDocument;
        return t && t.defaultView || window
    }
    return e
}
function ge(e) {
    var t = F(e).Element;
    return e instanceof t || e instanceof Element
}
function z(e) {
    var t = F(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement
}
function ht(e) {
    if (typeof ShadowRoot == "undefined")
        return !1;
    var t = F(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot
}
function Er(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function(r) {
        var i = t.styles[r] || {}
          , o = t.attributes[r] || {}
          , a = t.elements[r];
        !z(a) || !te(a) || (Object.assign(a.style, i),
        Object.keys(o).forEach(function(c) {
            var u = o[c];
            u === !1 ? a.removeAttribute(c) : a.setAttribute(c, u === !0 ? "" : u)
        }))
    })
}
function Dr(e) {
    var t = e.state
      , r = {
        popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
        },
        arrow: {
            position: "absolute"
        },
        reference: {}
    };
    return Object.assign(t.elements.popper.style, r.popper),
    t.styles = r,
    t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow),
    function() {
        Object.keys(t.elements).forEach(function(i) {
            var o = t.elements[i]
              , a = t.attributes[i] || {}
              , c = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : r[i])
              , u = c.reduce(function(f, d) {
                return f[d] = "",
                f
            }, {});
            !z(o) || !te(o) || (Object.assign(o.style, u),
            Object.keys(a).forEach(function(f) {
                o.removeAttribute(f)
            }))
        })
    }
}
const qt = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: Er,
    effect: Dr,
    requires: ["computeStyles"]
};
function ee(e) {
    return e.split("-")[0]
}
var he = Math.max
  , rt = Math.min
  , Ee = Math.round;
function pt() {
    var e = navigator.userAgentData;
    return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
        return t.brand + "/" + t.version
    }).join(" ") : navigator.userAgent
}
function zt() {
    return !/^((?!chrome|android).)*safari/i.test(pt())
}
function De(e, t, r) {
    t === void 0 && (t = !1),
    r === void 0 && (r = !1);
    var i = e.getBoundingClientRect()
      , o = 1
      , a = 1;
    t && z(e) && (o = e.offsetWidth > 0 && Ee(i.width) / e.offsetWidth || 1,
    a = e.offsetHeight > 0 && Ee(i.height) / e.offsetHeight || 1);
    var c = ge(e) ? F(e) : window
      , u = c.visualViewport
      , f = !zt() && r
      , d = (i.left + (f && u ? u.offsetLeft : 0)) / o
      , p = (i.top + (f && u ? u.offsetTop : 0)) / a
      , O = i.width / o
      , A = i.height / a;
    return {
        width: O,
        height: A,
        top: p,
        right: d + O,
        bottom: p + A,
        left: d,
        x: d,
        y: p
    }
}
function gt(e) {
    var t = De(e)
      , r = e.offsetWidth
      , i = e.offsetHeight;
    return Math.abs(t.width - r) <= 1 && (r = t.width),
    Math.abs(t.height - i) <= 1 && (i = t.height),
    {
        x: e.offsetLeft,
        y: e.offsetTop,
        width: r,
        height: i
    }
}
function Xt(e, t) {
    var r = t.getRootNode && t.getRootNode();
    if (e.contains(t))
        return !0;
    if (r && ht(r)) {
        var i = t;
        do {
            if (i && e.isSameNode(i))
                return !0;
            i = i.parentNode || i.host
        } while (i)
    }
    return !1
}
function ae(e) {
    return F(e).getComputedStyle(e)
}
function Cr(e) {
    return ["table", "td", "th"].indexOf(te(e)) >= 0
}
function fe(e) {
    return ((ge(e) ? e.ownerDocument : e.document) || window.document).documentElement
}
function it(e) {
    return te(e) === "html" ? e : e.assignedSlot || e.parentNode || (ht(e) ? e.host : null) || fe(e)
}
function Et(e) {
    return !z(e) || ae(e).position === "fixed" ? null : e.offsetParent
}
function Sr(e) {
    var t = /firefox/i.test(pt())
      , r = /Trident/i.test(pt());
    if (r && z(e)) {
        var i = ae(e);
        if (i.position === "fixed")
            return null
    }
    var o = it(e);
    for (ht(o) && (o = o.host); z(o) && ["html", "body"].indexOf(te(o)) < 0; ) {
        var a = ae(o);
        if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
            return o;
        o = o.parentNode
    }
    return null
}
function Ve(e) {
    for (var t = F(e), r = Et(e); r && Cr(r) && ae(r).position === "static"; )
        r = Et(r);
    return r && (te(r) === "html" || te(r) === "body" && ae(r).position === "static") ? t : r || Sr(e) || t
}
function yt(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
}
function je(e, t, r) {
    return he(e, rt(t, r))
}
function Lr(e, t, r) {
    var i = je(e, t, r);
    return i > r ? r : i
}
function Yt() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}
function _t(e) {
    return Object.assign({}, Yt(), e)
}
function Gt(e, t) {
    return t.reduce(function(r, i) {
        return r[i] = e,
        r
    }, {})
}
var Rr = function(t, r) {
    return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
        placement: r.placement
    })) : t,
    _t(typeof t != "number" ? t : Gt(t, He))
};
function Pr(e) {
    var t, r = e.state, i = e.name, o = e.options, a = r.elements.arrow, c = r.modifiersData.popperOffsets, u = ee(r.placement), f = yt(u), d = [N, Y].indexOf(u) >= 0, p = d ? "height" : "width";
    if (!(!a || !c)) {
        var O = Rr(o.padding, r)
          , A = gt(a)
          , h = f === "y" ? V : N
          , x = f === "y" ? X : Y
          , b = r.rects.reference[p] + r.rects.reference[f] - c[f] - r.rects.popper[p]
          , w = c[f] - r.rects.reference[f]
          , g = Ve(a)
          , C = g ? f === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0
          , S = b / 2 - w / 2
          , n = O[h]
          , m = C - A[p] - O[x]
          , l = C / 2 - A[p] / 2 + S
          , T = je(n, l, m)
          , L = f;
        r.modifiersData[i] = (t = {},
        t[L] = T,
        t.centerOffset = T - l,
        t)
    }
}
function Mr(e) {
    var t = e.state
      , r = e.options
      , i = r.element
      , o = i === void 0 ? "[data-popper-arrow]" : i;
    o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o),
    !o) || Xt(t.elements.popper, o) && (t.elements.arrow = o))
}
const Br = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: Pr,
    effect: Mr,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};
function Ce(e) {
    return e.split("-")[1]
}
var jr = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};
function $r(e, t) {
    var r = e.x
      , i = e.y
      , o = t.devicePixelRatio || 1;
    return {
        x: Ee(r * o) / o || 0,
        y: Ee(i * o) / o || 0
    }
}
function Dt(e) {
    var t, r = e.popper, i = e.popperRect, o = e.placement, a = e.variation, c = e.offsets, u = e.position, f = e.gpuAcceleration, d = e.adaptive, p = e.roundOffsets, O = e.isFixed, A = c.x, h = A === void 0 ? 0 : A, x = c.y, b = x === void 0 ? 0 : x, w = typeof p == "function" ? p({
        x: h,
        y: b
    }) : {
        x: h,
        y: b
    };
    h = w.x,
    b = w.y;
    var g = c.hasOwnProperty("x")
      , C = c.hasOwnProperty("y")
      , S = N
      , n = V
      , m = window;
    if (d) {
        var l = Ve(r)
          , T = "clientHeight"
          , L = "clientWidth";
        if (l === F(r) && (l = fe(r),
        ae(l).position !== "static" && u === "absolute" && (T = "scrollHeight",
        L = "scrollWidth")),
        l = l,
        o === V || (o === N || o === Y) && a === Ie) {
            n = X;
            var R = O && l === m && m.visualViewport ? m.visualViewport.height : l[T];
            b -= R - i.height,
            b *= f ? 1 : -1
        }
        if (o === N || (o === V || o === X) && a === Ie) {
            S = Y;
            var M = O && l === m && m.visualViewport ? m.visualViewport.width : l[L];
            h -= M - i.width,
            h *= f ? 1 : -1
        }
    }
    var j = Object.assign({
        position: u
    }, d && jr)
      , B = p === !0 ? $r({
        x: h,
        y: b
    }, F(r)) : {
        x: h,
        y: b
    };
    if (h = B.x,
    b = B.y,
    f) {
        var P;
        return Object.assign({}, j, (P = {},
        P[n] = C ? "0" : "",
        P[S] = g ? "0" : "",
        P.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + b + "px)" : "translate3d(" + h + "px, " + b + "px, 0)",
        P))
    }
    return Object.assign({}, j, (t = {},
    t[n] = C ? b + "px" : "",
    t[S] = g ? h + "px" : "",
    t.transform = "",
    t))
}
function Ir(e) {
    var t = e.state
      , r = e.options
      , i = r.gpuAcceleration
      , o = i === void 0 ? !0 : i
      , a = r.adaptive
      , c = a === void 0 ? !0 : a
      , u = r.roundOffsets
      , f = u === void 0 ? !0 : u
      , d = {
        placement: ee(t.placement),
        variation: Ce(t.placement),
        popper: t.elements.popper,
        popperRect: t.rects.popper,
        gpuAcceleration: o,
        isFixed: t.options.strategy === "fixed"
    };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Dt(Object.assign({}, d, {
        offsets: t.modifiersData.popperOffsets,
        position: t.options.strategy,
        adaptive: c,
        roundOffsets: f
    })))),
    t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Dt(Object.assign({}, d, {
        offsets: t.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: f
    })))),
    t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement
    })
}
const kr = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: Ir,
    data: {}
};
var Qe = {
    passive: !0
};
function Hr(e) {
    var t = e.state
      , r = e.instance
      , i = e.options
      , o = i.scroll
      , a = o === void 0 ? !0 : o
      , c = i.resize
      , u = c === void 0 ? !0 : c
      , f = F(t.elements.popper)
      , d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return a && d.forEach(function(p) {
        p.addEventListener("scroll", r.update, Qe)
    }),
    u && f.addEventListener("resize", r.update, Qe),
    function() {
        a && d.forEach(function(p) {
            p.removeEventListener("scroll", r.update, Qe)
        }),
        u && f.removeEventListener("resize", r.update, Qe)
    }
}
const Vr = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: Hr,
    data: {}
};
var Nr = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};
function et(e) {
    return e.replace(/left|right|bottom|top/g, function(t) {
        return Nr[t]
    })
}
var Wr = {
    start: "end",
    end: "start"
};
function Ct(e) {
    return e.replace(/start|end/g, function(t) {
        return Wr[t]
    })
}
function bt(e) {
    var t = F(e)
      , r = t.pageXOffset
      , i = t.pageYOffset;
    return {
        scrollLeft: r,
        scrollTop: i
    }
}
function wt(e) {
    return De(fe(e)).left + bt(e).scrollLeft
}
function Ur(e, t) {
    var r = F(e)
      , i = fe(e)
      , o = r.visualViewport
      , a = i.clientWidth
      , c = i.clientHeight
      , u = 0
      , f = 0;
    if (o) {
        a = o.width,
        c = o.height;
        var d = zt();
        (d || !d && t === "fixed") && (u = o.offsetLeft,
        f = o.offsetTop)
    }
    return {
        width: a,
        height: c,
        x: u + wt(e),
        y: f
    }
}
function Fr(e) {
    var t, r = fe(e), i = bt(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = he(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), c = he(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), u = -i.scrollLeft + wt(e), f = -i.scrollTop;
    return ae(o || r).direction === "rtl" && (u += he(r.clientWidth, o ? o.clientWidth : 0) - a),
    {
        width: a,
        height: c,
        x: u,
        y: f
    }
}
function Ot(e) {
    var t = ae(e)
      , r = t.overflow
      , i = t.overflowX
      , o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(r + o + i)
}
function Kt(e) {
    return ["html", "body", "#document"].indexOf(te(e)) >= 0 ? e.ownerDocument.body : z(e) && Ot(e) ? e : Kt(it(e))
}
function $e(e, t) {
    var r;
    t === void 0 && (t = []);
    var i = Kt(e)
      , o = i === ((r = e.ownerDocument) == null ? void 0 : r.body)
      , a = F(i)
      , c = o ? [a].concat(a.visualViewport || [], Ot(i) ? i : []) : i
      , u = t.concat(c);
    return o ? u : u.concat($e(it(c)))
}
function lt(e) {
    return Object.assign({}, e, {
        left: e.x,
        top: e.y,
        right: e.x + e.width,
        bottom: e.y + e.height
    })
}
function qr(e, t) {
    var r = De(e, !1, t === "fixed");
    return r.top = r.top + e.clientTop,
    r.left = r.left + e.clientLeft,
    r.bottom = r.top + e.clientHeight,
    r.right = r.left + e.clientWidth,
    r.width = e.clientWidth,
    r.height = e.clientHeight,
    r.x = r.left,
    r.y = r.top,
    r
}
function St(e, t, r) {
    return t === Ut ? lt(Ur(e, r)) : ge(t) ? qr(t, r) : lt(Fr(fe(e)))
}
function zr(e) {
    var t = $e(it(e))
      , r = ["absolute", "fixed"].indexOf(ae(e).position) >= 0
      , i = r && z(e) ? Ve(e) : e;
    return ge(i) ? t.filter(function(o) {
        return ge(o) && Xt(o, i) && te(o) !== "body"
    }) : []
}
function Xr(e, t, r, i) {
    var o = t === "clippingParents" ? zr(e) : [].concat(t)
      , a = [].concat(o, [r])
      , c = a[0]
      , u = a.reduce(function(f, d) {
        var p = St(e, d, i);
        return f.top = he(p.top, f.top),
        f.right = rt(p.right, f.right),
        f.bottom = rt(p.bottom, f.bottom),
        f.left = he(p.left, f.left),
        f
    }, St(e, c, i));
    return u.width = u.right - u.left,
    u.height = u.bottom - u.top,
    u.x = u.left,
    u.y = u.top,
    u
}
function Jt(e) {
    var t = e.reference, r = e.element, i = e.placement, o = i ? ee(i) : null, a = i ? Ce(i) : null, c = t.x + t.width / 2 - r.width / 2, u = t.y + t.height / 2 - r.height / 2, f;
    switch (o) {
    case V:
        f = {
            x: c,
            y: t.y - r.height
        };
        break;
    case X:
        f = {
            x: c,
            y: t.y + t.height
        };
        break;
    case Y:
        f = {
            x: t.x + t.width,
            y: u
        };
        break;
    case N:
        f = {
            x: t.x - r.width,
            y: u
        };
        break;
    default:
        f = {
            x: t.x,
            y: t.y
        }
    }
    var d = o ? yt(o) : null;
    if (d != null) {
        var p = d === "y" ? "height" : "width";
        switch (a) {
        case Te:
            f[d] = f[d] - (t[p] / 2 - r[p] / 2);
            break;
        case Ie:
            f[d] = f[d] + (t[p] / 2 - r[p] / 2);
            break
        }
    }
    return f
}
function ke(e, t) {
    t === void 0 && (t = {});
    var r = t
      , i = r.placement
      , o = i === void 0 ? e.placement : i
      , a = r.strategy
      , c = a === void 0 ? e.strategy : a
      , u = r.boundary
      , f = u === void 0 ? dr : u
      , d = r.rootBoundary
      , p = d === void 0 ? Ut : d
      , O = r.elementContext
      , A = O === void 0 ? Be : O
      , h = r.altBoundary
      , x = h === void 0 ? !1 : h
      , b = r.padding
      , w = b === void 0 ? 0 : b
      , g = _t(typeof w != "number" ? w : Gt(w, He))
      , C = A === Be ? vr : Be
      , S = e.rects.popper
      , n = e.elements[x ? C : A]
      , m = Xr(ge(n) ? n : n.contextElement || fe(e.elements.popper), f, p, c)
      , l = De(e.elements.reference)
      , T = Jt({
        reference: l,
        element: S,
        placement: o
    })
      , L = lt(Object.assign({}, S, T))
      , R = A === Be ? L : l
      , M = {
        top: m.top - R.top + g.top,
        bottom: R.bottom - m.bottom + g.bottom,
        left: m.left - R.left + g.left,
        right: R.right - m.right + g.right
    }
      , j = e.modifiersData.offset;
    if (A === Be && j) {
        var B = j[o];
        Object.keys(M).forEach(function(P) {
            var W = [Y, X].indexOf(P) >= 0 ? 1 : -1
              , U = [V, X].indexOf(P) >= 0 ? "y" : "x";
            M[P] += B[U] * W
        })
    }
    return M
}
function Yr(e, t) {
    t === void 0 && (t = {});
    var r = t
      , i = r.placement
      , o = r.boundary
      , a = r.rootBoundary
      , c = r.padding
      , u = r.flipVariations
      , f = r.allowedAutoPlacements
      , d = f === void 0 ? Ft : f
      , p = Ce(i)
      , O = p ? u ? Tt : Tt.filter(function(x) {
        return Ce(x) === p
    }) : He
      , A = O.filter(function(x) {
        return d.indexOf(x) >= 0
    });
    A.length === 0 && (A = O);
    var h = A.reduce(function(x, b) {
        return x[b] = ke(e, {
            placement: b,
            boundary: o,
            rootBoundary: a,
            padding: c
        })[ee(b)],
        x
    }, {});
    return Object.keys(h).sort(function(x, b) {
        return h[x] - h[b]
    })
}
function _r(e) {
    if (ee(e) === mt)
        return [];
    var t = et(e);
    return [Ct(e), t, Ct(t)]
}
function Gr(e) {
    var t = e.state
      , r = e.options
      , i = e.name;
    if (!t.modifiersData[i]._skip) {
        for (var o = r.mainAxis, a = o === void 0 ? !0 : o, c = r.altAxis, u = c === void 0 ? !0 : c, f = r.fallbackPlacements, d = r.padding, p = r.boundary, O = r.rootBoundary, A = r.altBoundary, h = r.flipVariations, x = h === void 0 ? !0 : h, b = r.allowedAutoPlacements, w = t.options.placement, g = ee(w), C = g === w, S = f || (C || !x ? [et(w)] : _r(w)), n = [w].concat(S).reduce(function(re, _) {
            return re.concat(ee(_) === mt ? Yr(t, {
                placement: _,
                boundary: p,
                rootBoundary: O,
                padding: d,
                flipVariations: x,
                allowedAutoPlacements: b
            }) : _)
        }, []), m = t.rects.reference, l = t.rects.popper, T = new Map, L = !0, R = n[0], M = 0; M < n.length; M++) {
            var j = n[M]
              , B = ee(j)
              , P = Ce(j) === Te
              , W = [V, X].indexOf(B) >= 0
              , U = W ? "width" : "height"
              , I = ke(t, {
                placement: j,
                boundary: p,
                rootBoundary: O,
                altBoundary: A,
                padding: d
            })
              , k = W ? P ? Y : N : P ? X : V;
            m[U] > l[U] && (k = et(k));
            var $ = et(k)
              , K = [];
            if (a && K.push(I[B] <= 0),
            u && K.push(I[k] <= 0, I[$] <= 0),
            K.every(function(re) {
                return re
            })) {
                R = j,
                L = !1;
                break
            }
            T.set(j, K)
        }
        if (L)
            for (var J = x ? 3 : 1, ce = function(_) {
                var ne = n.find(function(ye) {
                    var ie = T.get(ye);
                    if (ie)
                        return ie.slice(0, _).every(function(be) {
                            return be
                        })
                });
                if (ne)
                    return R = ne,
                    "break"
            }, Q = J; Q > 0; Q--) {
                var pe = ce(Q);
                if (pe === "break")
                    break
            }
        t.placement !== R && (t.modifiersData[i]._skip = !0,
        t.placement = R,
        t.reset = !0)
    }
}
const Kr = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: Gr,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};
function Lt(e, t, r) {
    return r === void 0 && (r = {
        x: 0,
        y: 0
    }),
    {
        top: e.top - t.height - r.y,
        right: e.right - t.width + r.x,
        bottom: e.bottom - t.height + r.y,
        left: e.left - t.width - r.x
    }
}
function Rt(e) {
    return [V, Y, X, N].some(function(t) {
        return e[t] >= 0
    })
}
function Jr(e) {
    var t = e.state
      , r = e.name
      , i = t.rects.reference
      , o = t.rects.popper
      , a = t.modifiersData.preventOverflow
      , c = ke(t, {
        elementContext: "reference"
    })
      , u = ke(t, {
        altBoundary: !0
    })
      , f = Lt(c, i)
      , d = Lt(u, o, a)
      , p = Rt(f)
      , O = Rt(d);
    t.modifiersData[r] = {
        referenceClippingOffsets: f,
        popperEscapeOffsets: d,
        isReferenceHidden: p,
        hasPopperEscaped: O
    },
    t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-reference-hidden": p,
        "data-popper-escaped": O
    })
}
const Qr = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: Jr
};
function Zr(e, t, r) {
    var i = ee(e)
      , o = [N, V].indexOf(i) >= 0 ? -1 : 1
      , a = typeof r == "function" ? r(Object.assign({}, t, {
        placement: e
    })) : r
      , c = a[0]
      , u = a[1];
    return c = c || 0,
    u = (u || 0) * o,
    [N, Y].indexOf(i) >= 0 ? {
        x: u,
        y: c
    } : {
        x: c,
        y: u
    }
}
function en(e) {
    var t = e.state
      , r = e.options
      , i = e.name
      , o = r.offset
      , a = o === void 0 ? [0, 0] : o
      , c = Ft.reduce(function(p, O) {
        return p[O] = Zr(O, t.rects, a),
        p
    }, {})
      , u = c[t.placement]
      , f = u.x
      , d = u.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += f,
    t.modifiersData.popperOffsets.y += d),
    t.modifiersData[i] = c
}
const tn = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: en
};
function rn(e) {
    var t = e.state
      , r = e.name;
    t.modifiersData[r] = Jt({
        reference: t.rects.reference,
        element: t.rects.popper,
        placement: t.placement
    })
}
const nn = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: rn,
    data: {}
};
function on(e) {
    return e === "x" ? "y" : "x"
}
function an(e) {
    var t = e.state
      , r = e.options
      , i = e.name
      , o = r.mainAxis
      , a = o === void 0 ? !0 : o
      , c = r.altAxis
      , u = c === void 0 ? !1 : c
      , f = r.boundary
      , d = r.rootBoundary
      , p = r.altBoundary
      , O = r.padding
      , A = r.tether
      , h = A === void 0 ? !0 : A
      , x = r.tetherOffset
      , b = x === void 0 ? 0 : x
      , w = ke(t, {
        boundary: f,
        rootBoundary: d,
        padding: O,
        altBoundary: p
    })
      , g = ee(t.placement)
      , C = Ce(t.placement)
      , S = !C
      , n = yt(g)
      , m = on(n)
      , l = t.modifiersData.popperOffsets
      , T = t.rects.reference
      , L = t.rects.popper
      , R = typeof b == "function" ? b(Object.assign({}, t.rects, {
        placement: t.placement
    })) : b
      , M = typeof R == "number" ? {
        mainAxis: R,
        altAxis: R
    } : Object.assign({
        mainAxis: 0,
        altAxis: 0
    }, R)
      , j = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null
      , B = {
        x: 0,
        y: 0
    };
    if (l) {
        if (a) {
            var P, W = n === "y" ? V : N, U = n === "y" ? X : Y, I = n === "y" ? "height" : "width", k = l[n], $ = k + w[W], K = k - w[U], J = h ? -L[I] / 2 : 0, ce = C === Te ? T[I] : L[I], Q = C === Te ? -L[I] : -T[I], pe = t.elements.arrow, re = h && pe ? gt(pe) : {
                width: 0,
                height: 0
            }, _ = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Yt(), ne = _[W], ye = _[U], ie = je(0, T[I], re[I]), be = S ? T[I] / 2 - J - ie - ne - M.mainAxis : ce - ie - ne - M.mainAxis, se = S ? -T[I] / 2 + J + ie + ye + M.mainAxis : Q + ie + ye + M.mainAxis, we = t.elements.arrow && Ve(t.elements.arrow), We = we ? n === "y" ? we.clientTop || 0 : we.clientLeft || 0 : 0, Se = (P = j == null ? void 0 : j[n]) != null ? P : 0, Ue = k + be - Se - We, Fe = k + se - Se, Le = je(h ? rt($, Ue) : $, k, h ? he(K, Fe) : K);
            l[n] = Le,
            B[n] = Le - k
        }
        if (u) {
            var Re, qe = n === "x" ? V : N, ze = n === "x" ? X : Y, oe = l[m], ue = m === "y" ? "height" : "width", Pe = oe + w[qe], le = oe - w[ze], Me = [V, N].indexOf(g) !== -1, Xe = (Re = j == null ? void 0 : j[m]) != null ? Re : 0, Ye = Me ? Pe : oe - T[ue] - L[ue] - Xe + M.altAxis, _e = Me ? oe + T[ue] + L[ue] - Xe - M.altAxis : le, Ge = h && Me ? Lr(Ye, oe, _e) : je(h ? Ye : Pe, oe, h ? _e : le);
            l[m] = Ge,
            B[m] = Ge - oe
        }
        t.modifiersData[i] = B
    }
}
const sn = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: an,
    requiresIfExists: ["offset"]
};
function un(e) {
    return {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    }
}
function fn(e) {
    return e === F(e) || !z(e) ? bt(e) : un(e)
}
function cn(e) {
    var t = e.getBoundingClientRect()
      , r = Ee(t.width) / e.offsetWidth || 1
      , i = Ee(t.height) / e.offsetHeight || 1;
    return r !== 1 || i !== 1
}
function pn(e, t, r) {
    r === void 0 && (r = !1);
    var i = z(t)
      , o = z(t) && cn(t)
      , a = fe(t)
      , c = De(e, o, r)
      , u = {
        scrollLeft: 0,
        scrollTop: 0
    }
      , f = {
        x: 0,
        y: 0
    };
    return (i || !i && !r) && ((te(t) !== "body" || Ot(a)) && (u = fn(t)),
    z(t) ? (f = De(t, !0),
    f.x += t.clientLeft,
    f.y += t.clientTop) : a && (f.x = wt(a))),
    {
        x: c.left + u.scrollLeft - f.x,
        y: c.top + u.scrollTop - f.y,
        width: c.width,
        height: c.height
    }
}
function ln(e) {
    var t = new Map
      , r = new Set
      , i = [];
    e.forEach(function(a) {
        t.set(a.name, a)
    });
    function o(a) {
        r.add(a.name);
        var c = [].concat(a.requires || [], a.requiresIfExists || []);
        c.forEach(function(u) {
            if (!r.has(u)) {
                var f = t.get(u);
                f && o(f)
            }
        }),
        i.push(a)
    }
    return e.forEach(function(a) {
        r.has(a.name) || o(a)
    }),
    i
}
function dn(e) {
    var t = ln(e);
    return Tr.reduce(function(r, i) {
        return r.concat(t.filter(function(o) {
            return o.phase === i
        }))
    }, [])
}
function vn(e) {
    var t;
    return function() {
        return t || (t = new Promise(function(r) {
            Promise.resolve().then(function() {
                t = void 0,
                r(e())
            })
        }
        )),
        t
    }
}
function mn(e) {
    var t = e.reduce(function(r, i) {
        var o = r[i.name];
        return r[i.name] = o ? Object.assign({}, o, i, {
            options: Object.assign({}, o.options, i.options),
            data: Object.assign({}, o.data, i.data)
        }) : i,
        r
    }, {});
    return Object.keys(t).map(function(r) {
        return t[r]
    })
}
var Pt = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};
function Mt() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
    return !t.some(function(i) {
        return !(i && typeof i.getBoundingClientRect == "function")
    })
}
function hn(e) {
    e === void 0 && (e = {});
    var t = e
      , r = t.defaultModifiers
      , i = r === void 0 ? [] : r
      , o = t.defaultOptions
      , a = o === void 0 ? Pt : o;
    return function(u, f, d) {
        d === void 0 && (d = a);
        var p = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, Pt, a),
            modifiersData: {},
            elements: {
                reference: u,
                popper: f
            },
            attributes: {},
            styles: {}
        }
          , O = []
          , A = !1
          , h = {
            state: p,
            setOptions: function(g) {
                var C = typeof g == "function" ? g(p.options) : g;
                b(),
                p.options = Object.assign({}, a, p.options, C),
                p.scrollParents = {
                    reference: ge(u) ? $e(u) : u.contextElement ? $e(u.contextElement) : [],
                    popper: $e(f)
                };
                var S = dn(mn([].concat(i, p.options.modifiers)));
                return p.orderedModifiers = S.filter(function(n) {
                    return n.enabled
                }),
                x(),
                h.update()
            },
            forceUpdate: function() {
                if (!A) {
                    var g = p.elements
                      , C = g.reference
                      , S = g.popper;
                    if (Mt(C, S)) {
                        p.rects = {
                            reference: pn(C, Ve(S), p.options.strategy === "fixed"),
                            popper: gt(S)
                        },
                        p.reset = !1,
                        p.placement = p.options.placement,
                        p.orderedModifiers.forEach(function(M) {
                            return p.modifiersData[M.name] = Object.assign({}, M.data)
                        });
                        for (var n = 0; n < p.orderedModifiers.length; n++) {
                            if (p.reset === !0) {
                                p.reset = !1,
                                n = -1;
                                continue
                            }
                            var m = p.orderedModifiers[n]
                              , l = m.fn
                              , T = m.options
                              , L = T === void 0 ? {} : T
                              , R = m.name;
                            typeof l == "function" && (p = l({
                                state: p,
                                options: L,
                                name: R,
                                instance: h
                            }) || p)
                        }
                    }
                }
            },
            update: vn(function() {
                return new Promise(function(w) {
                    h.forceUpdate(),
                    w(p)
                }
                )
            }),
            destroy: function() {
                b(),
                A = !0
            }
        };
        if (!Mt(u, f))
            return h;
        h.setOptions(d).then(function(w) {
            !A && d.onFirstUpdate && d.onFirstUpdate(w)
        });
        function x() {
            p.orderedModifiers.forEach(function(w) {
                var g = w.name
                  , C = w.options
                  , S = C === void 0 ? {} : C
                  , n = w.effect;
                if (typeof n == "function") {
                    var m = n({
                        state: p,
                        name: g,
                        instance: h,
                        options: S
                    })
                      , l = function() {};
                    O.push(m || l)
                }
            })
        }
        function b() {
            O.forEach(function(w) {
                return w()
            }),
            O = []
        }
        return h
    }
}
var gn = [Vr, nn, kr, qt, tn, Kr, sn, Br, Qr]
  , yn = hn({
    defaultModifiers: gn
})
  , qn = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>'
  , bn = "tippy-box"
  , Qt = "tippy-content"
  , wn = "tippy-backdrop"
  , Zt = "tippy-arrow"
  , er = "tippy-svg-arrow"
  , ve = {
    passive: !0,
    capture: !0
}
  , tr = function() {
    return document.body
};
function ut(e, t, r) {
    if (Array.isArray(e)) {
        var i = e[t];
        return i == null ? Array.isArray(r) ? r[t] : r : i
    }
    return e
}
function xt(e, t) {
    var r = {}.toString.call(e);
    return r.indexOf("[object") === 0 && r.indexOf(t + "]") > -1
}
function rr(e, t) {
    return typeof e == "function" ? e.apply(void 0, t) : e
}
function Bt(e, t) {
    if (t === 0)
        return e;
    var r;
    return function(i) {
        clearTimeout(r),
        r = setTimeout(function() {
            e(i)
        }, t)
    }
}
function On(e, t) {
    var r = Object.assign({}, e);
    return t.forEach(function(i) {
        delete r[i]
    }),
    r
}
function xn(e) {
    return e.split(/\s+/).filter(Boolean)
}
function me(e) {
    return [].concat(e)
}
function jt(e, t) {
    e.indexOf(t) === -1 && e.push(t)
}
function An(e) {
    return e.filter(function(t, r) {
        return e.indexOf(t) === r
    })
}
function Tn(e) {
    return e.split("-")[0]
}
function nt(e) {
    return [].slice.call(e)
}
function $t(e) {
    return Object.keys(e).reduce(function(t, r) {
        return e[r] !== void 0 && (t[r] = e[r]),
        t
    }, {})
}
function Ae() {
    return document.createElement("div")
}
function ot(e) {
    return ["Element", "Fragment"].some(function(t) {
        return xt(e, t)
    })
}
function En(e) {
    return xt(e, "NodeList")
}
function Dn(e) {
    return xt(e, "MouseEvent")
}
function nr(e) {
    return !!(e && e._tippy && e._tippy.reference === e)
}
function Cn(e) {
    return ot(e) ? [e] : En(e) ? nt(e) : Array.isArray(e) ? e : nt(document.querySelectorAll(e))
}
function ft(e, t) {
    e.forEach(function(r) {
        r && (r.style.transitionDuration = t + "ms")
    })
}
function It(e, t) {
    e.forEach(function(r) {
        r && r.setAttribute("data-state", t)
    })
}
function Sn(e) {
    var t, r = me(e), i = r[0];
    return i != null && (t = i.ownerDocument) != null && t.body ? i.ownerDocument : document
}
function Ln(e, t) {
    var r = t.clientX
      , i = t.clientY;
    return e.every(function(o) {
        var a = o.popperRect
          , c = o.popperState
          , u = o.props
          , f = u.interactiveBorder
          , d = Tn(c.placement)
          , p = c.modifiersData.offset;
        if (!p)
            return !0;
        var O = d === "bottom" ? p.top.y : 0
          , A = d === "top" ? p.bottom.y : 0
          , h = d === "right" ? p.left.x : 0
          , x = d === "left" ? p.right.x : 0
          , b = a.top - i + O > f
          , w = i - a.bottom - A > f
          , g = a.left - r + h > f
          , C = r - a.right - x > f;
        return b || w || g || C
    })
}
function ct(e, t, r) {
    var i = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function(o) {
        e[i](o, r)
    })
}
function kt(e, t) {
    for (var r = t; r; ) {
        var i;
        if (e.contains(r))
            return !0;
        r = r.getRootNode == null || (i = r.getRootNode()) == null ? void 0 : i.host
    }
    return !1
}
var Z = {
    isTouch: !1
}
  , Ht = 0;
function Rn() {
    Z.isTouch || (Z.isTouch = !0,
    window.performance && document.addEventListener("mousemove", ir))
}
function ir() {
    var e = performance.now();
    e - Ht < 20 && (Z.isTouch = !1,
    document.removeEventListener("mousemove", ir)),
    Ht = e
}
function Pn() {
    var e = document.activeElement;
    if (nr(e)) {
        var t = e._tippy;
        e.blur && !t.state.isVisible && e.blur()
    }
}
function Mn() {
    document.addEventListener("touchstart", Rn, ve),
    window.addEventListener("blur", Pn)
}
var Bn = typeof window != "undefined" && typeof document != "undefined"
  , jn = Bn ? !!window.msCrypto : !1
  , $n = {
    animateFill: !1,
    followCursor: !1,
    inlinePositioning: !1,
    sticky: !1
}
  , In = {
    allowHTML: !1,
    animation: "fade",
    arrow: !0,
    content: "",
    inertia: !1,
    maxWidth: 350,
    role: "tooltip",
    theme: "",
    zIndex: 9999
}
  , G = Object.assign({
    appendTo: tr,
    aria: {
        content: "auto",
        expanded: "auto"
    },
    delay: 0,
    duration: [300, 250],
    getReferenceClientRect: null,
    hideOnClick: !0,
    ignoreAttributes: !1,
    interactive: !1,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: "",
    offset: [0, 10],
    onAfterUpdate: function() {},
    onBeforeUpdate: function() {},
    onCreate: function() {},
    onDestroy: function() {},
    onHidden: function() {},
    onHide: function() {},
    onMount: function() {},
    onShow: function() {},
    onShown: function() {},
    onTrigger: function() {},
    onUntrigger: function() {},
    onClickOutside: function() {},
    placement: "top",
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: !1,
    touch: !0,
    trigger: "mouseenter focus",
    triggerTarget: null
}, $n, In)
  , kn = Object.keys(G)
  , Hn = function(t) {
    var r = Object.keys(t);
    r.forEach(function(i) {
        G[i] = t[i]
    })
};
function or(e) {
    var t = e.plugins || []
      , r = t.reduce(function(i, o) {
        var a = o.name
          , c = o.defaultValue;
        if (a) {
            var u;
            i[a] = e[a] !== void 0 ? e[a] : (u = G[a]) != null ? u : c
        }
        return i
    }, {});
    return Object.assign({}, e, r)
}
function Vn(e, t) {
    var r = t ? Object.keys(or(Object.assign({}, G, {
        plugins: t
    }))) : kn
      , i = r.reduce(function(o, a) {
        var c = (e.getAttribute("data-tippy-" + a) || "").trim();
        if (!c)
            return o;
        if (a === "content")
            o[a] = c;
        else
            try {
                o[a] = JSON.parse(c)
            } catch (u) {
                o[a] = c
            }
        return o
    }, {});
    return i
}
function Vt(e, t) {
    var r = Object.assign({}, t, {
        content: rr(t.content, [e])
    }, t.ignoreAttributes ? {} : Vn(e, t.plugins));
    return r.aria = Object.assign({}, G.aria, r.aria),
    r.aria = {
        expanded: r.aria.expanded === "auto" ? t.interactive : r.aria.expanded,
        content: r.aria.content === "auto" ? t.interactive ? null : "describedby" : r.aria.content
    },
    r
}
var Nn = function() {
    return "innerHTML"
};
function dt(e, t) {
    e[Nn()] = t
}
function Nt(e) {
    var t = Ae();
    return e === !0 ? t.className = Zt : (t.className = er,
    ot(e) ? t.appendChild(e) : dt(t, e)),
    t
}
function Wt(e, t) {
    ot(t.content) ? (dt(e, ""),
    e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? dt(e, t.content) : e.textContent = t.content)
}
function vt(e) {
    var t = e.firstElementChild
      , r = nt(t.children);
    return {
        box: t,
        content: r.find(function(i) {
            return i.classList.contains(Qt)
        }),
        arrow: r.find(function(i) {
            return i.classList.contains(Zt) || i.classList.contains(er)
        }),
        backdrop: r.find(function(i) {
            return i.classList.contains(wn)
        })
    }
}
function ar(e) {
    var t = Ae()
      , r = Ae();
    r.className = bn,
    r.setAttribute("data-state", "hidden"),
    r.setAttribute("tabindex", "-1");
    var i = Ae();
    i.className = Qt,
    i.setAttribute("data-state", "hidden"),
    Wt(i, e.props),
    t.appendChild(r),
    r.appendChild(i),
    o(e.props, e.props);
    function o(a, c) {
        var u = vt(t)
          , f = u.box
          , d = u.content
          , p = u.arrow;
        c.theme ? f.setAttribute("data-theme", c.theme) : f.removeAttribute("data-theme"),
        typeof c.animation == "string" ? f.setAttribute("data-animation", c.animation) : f.removeAttribute("data-animation"),
        c.inertia ? f.setAttribute("data-inertia", "") : f.removeAttribute("data-inertia"),
        f.style.maxWidth = typeof c.maxWidth == "number" ? c.maxWidth + "px" : c.maxWidth,
        c.role ? f.setAttribute("role", c.role) : f.removeAttribute("role"),
        (a.content !== c.content || a.allowHTML !== c.allowHTML) && Wt(d, e.props),
        c.arrow ? p ? a.arrow !== c.arrow && (f.removeChild(p),
        f.appendChild(Nt(c.arrow))) : f.appendChild(Nt(c.arrow)) : p && f.removeChild(p)
    }
    return {
        popper: t,
        onUpdate: o
    }
}
ar.$$tippy = !0;
var Wn = 1
  , Ze = []
  , tt = [];
function Un(e, t) {
    var r = Vt(e, Object.assign({}, G, or($t(t)))), i, o, a, c = !1, u = !1, f = !1, d = !1, p, O, A, h = [], x = Bt(Ue, r.interactiveDebounce), b, w = Wn++, g = null, C = An(r.plugins), S = {
        isEnabled: !0,
        isVisible: !1,
        isDestroyed: !1,
        isMounted: !1,
        isShown: !1
    }, n = {
        id: w,
        reference: e,
        popper: Ae(),
        popperInstance: g,
        props: r,
        state: S,
        plugins: C,
        clearDelayTimeouts: Ye,
        setProps: _e,
        setContent: Ge,
        show: sr,
        hide: ur,
        hideWithInteractivity: fr,
        enable: Me,
        disable: Xe,
        unmount: cr,
        destroy: pr
    };
    if (!r.render)
        return n;
    var m = r.render(n)
      , l = m.popper
      , T = m.onUpdate;
    l.setAttribute("data-tippy-root", ""),
    l.id = "tippy-" + n.id,
    n.popper = l,
    e._tippy = n,
    l._tippy = n;
    var L = C.map(function(s) {
        return s.fn(n)
    })
      , R = e.hasAttribute("aria-expanded");
    return we(),
    J(),
    k(),
    $("onCreate", [n]),
    r.showOnCreate && Pe(),
    l.addEventListener("mouseenter", function() {
        n.props.interactive && n.state.isVisible && n.clearDelayTimeouts()
    }),
    l.addEventListener("mouseleave", function() {
        n.props.interactive && n.props.trigger.indexOf("mouseenter") >= 0 && W().addEventListener("mousemove", x)
    }),
    n;
    function M() {
        var s = n.props.touch;
        return Array.isArray(s) ? s : [s, 0]
    }
    function j() {
        return M()[0] === "hold"
    }
    function B() {
        var s;
        return !!((s = n.props.render) != null && s.$$tippy)
    }
    function P() {
        return b || e
    }
    function W() {
        var s = P().parentNode;
        return s ? Sn(s) : document
    }
    function U() {
        return vt(l)
    }
    function I(s) {
        return n.state.isMounted && !n.state.isVisible || Z.isTouch || p && p.type === "focus" ? 0 : ut(n.props.delay, s ? 0 : 1, G.delay)
    }
    function k(s) {
        s === void 0 && (s = !1),
        l.style.pointerEvents = n.props.interactive && !s ? "" : "none",
        l.style.zIndex = "" + n.props.zIndex
    }
    function $(s, v, y) {
        if (y === void 0 && (y = !0),
        L.forEach(function(E) {
            E[s] && E[s].apply(E, v)
        }),
        y) {
            var D;
            (D = n.props)[s].apply(D, v)
        }
    }
    function K() {
        var s = n.props.aria;
        if (s.content) {
            var v = "aria-" + s.content
              , y = l.id
              , D = me(n.props.triggerTarget || e);
            D.forEach(function(E) {
                var H = E.getAttribute(v);
                if (n.state.isVisible)
                    E.setAttribute(v, H ? H + " " + y : y);
                else {
                    var q = H && H.replace(y, "").trim();
                    q ? E.setAttribute(v, q) : E.removeAttribute(v)
                }
            })
        }
    }
    function J() {
        if (!(R || !n.props.aria.expanded)) {
            var s = me(n.props.triggerTarget || e);
            s.forEach(function(v) {
                n.props.interactive ? v.setAttribute("aria-expanded", n.state.isVisible && v === P() ? "true" : "false") : v.removeAttribute("aria-expanded")
            })
        }
    }
    function ce() {
        W().removeEventListener("mousemove", x),
        Ze = Ze.filter(function(s) {
            return s !== x
        })
    }
    function Q(s) {
        if (!(Z.isTouch && (f || s.type === "mousedown"))) {
            var v = s.composedPath && s.composedPath()[0] || s.target;
            if (!(n.props.interactive && kt(l, v))) {
                if (me(n.props.triggerTarget || e).some(function(y) {
                    return kt(y, v)
                })) {
                    if (Z.isTouch || n.state.isVisible && n.props.trigger.indexOf("click") >= 0)
                        return
                } else
                    $("onClickOutside", [n, s]);
                n.props.hideOnClick === !0 && (n.clearDelayTimeouts(),
                n.hide(),
                u = !0,
                setTimeout(function() {
                    u = !1
                }),
                n.state.isMounted || ne())
            }
        }
    }
    function pe() {
        f = !0
    }
    function re() {
        f = !1
    }
    function _() {
        var s = W();
        s.addEventListener("mousedown", Q, !0),
        s.addEventListener("touchend", Q, ve),
        s.addEventListener("touchstart", re, ve),
        s.addEventListener("touchmove", pe, ve)
    }
    function ne() {
        var s = W();
        s.removeEventListener("mousedown", Q, !0),
        s.removeEventListener("touchend", Q, ve),
        s.removeEventListener("touchstart", re, ve),
        s.removeEventListener("touchmove", pe, ve)
    }
    function ye(s, v) {
        be(s, function() {
            !n.state.isVisible && l.parentNode && l.parentNode.contains(l) && v()
        })
    }
    function ie(s, v) {
        be(s, v)
    }
    function be(s, v) {
        var y = U().box;
        function D(E) {
            E.target === y && (ct(y, "remove", D),
            v())
        }
        if (s === 0)
            return v();
        ct(y, "remove", O),
        ct(y, "add", D),
        O = D
    }
    function se(s, v, y) {
        y === void 0 && (y = !1);
        var D = me(n.props.triggerTarget || e);
        D.forEach(function(E) {
            E.addEventListener(s, v, y),
            h.push({
                node: E,
                eventType: s,
                handler: v,
                options: y
            })
        })
    }
    function we() {
        j() && (se("touchstart", Se, {
            passive: !0
        }),
        se("touchend", Fe, {
            passive: !0
        })),
        xn(n.props.trigger).forEach(function(s) {
            if (s !== "manual")
                switch (se(s, Se),
                s) {
                case "mouseenter":
                    se("mouseleave", Fe);
                    break;
                case "focus":
                    se(jn ? "focusout" : "blur", Le);
                    break;
                case "focusin":
                    se("focusout", Le);
                    break
                }
        })
    }
    function We() {
        h.forEach(function(s) {
            var v = s.node
              , y = s.eventType
              , D = s.handler
              , E = s.options;
            v.removeEventListener(y, D, E)
        }),
        h = []
    }
    function Se(s) {
        var v, y = !1;
        if (!(!n.state.isEnabled || Re(s) || u)) {
            var D = ((v = p) == null ? void 0 : v.type) === "focus";
            p = s,
            b = s.currentTarget,
            J(),
            !n.state.isVisible && Dn(s) && Ze.forEach(function(E) {
                return E(s)
            }),
            s.type === "click" && (n.props.trigger.indexOf("mouseenter") < 0 || c) && n.props.hideOnClick !== !1 && n.state.isVisible ? y = !0 : Pe(s),
            s.type === "click" && (c = !y),
            y && !D && le(s)
        }
    }
    function Ue(s) {
        var v = s.target
          , y = P().contains(v) || l.contains(v);
        if (!(s.type === "mousemove" && y)) {
            var D = ue().concat(l).map(function(E) {
                var H, q = E._tippy, Oe = (H = q.popperInstance) == null ? void 0 : H.state;
                return Oe ? {
                    popperRect: E.getBoundingClientRect(),
                    popperState: Oe,
                    props: r
                } : null
            }).filter(Boolean);
            Ln(D, s) && (ce(),
            le(s))
        }
    }
    function Fe(s) {
        var v = Re(s) || n.props.trigger.indexOf("click") >= 0 && c;
        if (!v) {
            if (n.props.interactive) {
                n.hideWithInteractivity(s);
                return
            }
            le(s)
        }
    }
    function Le(s) {
        n.props.trigger.indexOf("focusin") < 0 && s.target !== P() || n.props.interactive && s.relatedTarget && l.contains(s.relatedTarget) || le(s)
    }
    function Re(s) {
        return Z.isTouch ? j() !== s.type.indexOf("touch") >= 0 : !1
    }
    function qe() {
        ze();
        var s = n.props
          , v = s.popperOptions
          , y = s.placement
          , D = s.offset
          , E = s.getReferenceClientRect
          , H = s.moveTransition
          , q = B() ? vt(l).arrow : null
          , Oe = E ? {
            getBoundingClientRect: E,
            contextElement: E.contextElement || P()
        } : e
          , At = {
            name: "$$tippy",
            enabled: !0,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: function(Ke) {
                var xe = Ke.state;
                if (B()) {
                    var lr = U()
                      , st = lr.box;
                    ["placement", "reference-hidden", "escaped"].forEach(function(Je) {
                        Je === "placement" ? st.setAttribute("data-placement", xe.placement) : xe.attributes.popper["data-popper-" + Je] ? st.setAttribute("data-" + Je, "") : st.removeAttribute("data-" + Je)
                    }),
                    xe.attributes.popper = {}
                }
            }
        }
          , de = [{
            name: "offset",
            options: {
                offset: D
            }
        }, {
            name: "preventOverflow",
            options: {
                padding: {
                    top: 2,
                    bottom: 2,
                    left: 5,
                    right: 5
                }
            }
        }, {
            name: "flip",
            options: {
                padding: 5
            }
        }, {
            name: "computeStyles",
            options: {
                adaptive: !H
            }
        }, At];
        B() && q && de.push({
            name: "arrow",
            options: {
                element: q,
                padding: 3
            }
        }),
        de.push.apply(de, (v == null ? void 0 : v.modifiers) || []),
        n.popperInstance = yn(Oe, l, Object.assign({}, v, {
            placement: y,
            onFirstUpdate: A,
            modifiers: de
        }))
    }
    function ze() {
        n.popperInstance && (n.popperInstance.destroy(),
        n.popperInstance = null)
    }
    function oe() {
        var s = n.props.appendTo, v, y = P();
        n.props.interactive && s === tr || s === "parent" ? v = y.parentNode : v = rr(s, [y]),
        v.contains(l) || v.appendChild(l),
        n.state.isMounted = !0,
        qe()
    }
    function ue() {
        return nt(l.querySelectorAll("[data-tippy-root]"))
    }
    function Pe(s) {
        n.clearDelayTimeouts(),
        s && $("onTrigger", [n, s]),
        _();
        var v = I(!0)
          , y = M()
          , D = y[0]
          , E = y[1];
        Z.isTouch && D === "hold" && E && (v = E),
        v ? i = setTimeout(function() {
            n.show()
        }, v) : n.show()
    }
    function le(s) {
        if (n.clearDelayTimeouts(),
        $("onUntrigger", [n, s]),
        !n.state.isVisible) {
            ne();
            return
        }
        if (!(n.props.trigger.indexOf("mouseenter") >= 0 && n.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(s.type) >= 0 && c)) {
            var v = I(!1);
            v ? o = setTimeout(function() {
                n.state.isVisible && n.hide()
            }, v) : a = requestAnimationFrame(function() {
                n.hide()
            })
        }
    }
    function Me() {
        n.state.isEnabled = !0
    }
    function Xe() {
        n.hide(),
        n.state.isEnabled = !1
    }
    function Ye() {
        clearTimeout(i),
        clearTimeout(o),
        cancelAnimationFrame(a)
    }
    function _e(s) {
        if (!n.state.isDestroyed) {
            $("onBeforeUpdate", [n, s]),
            We();
            var v = n.props
              , y = Vt(e, Object.assign({}, v, $t(s), {
                ignoreAttributes: !0
            }));
            n.props = y,
            we(),
            v.interactiveDebounce !== y.interactiveDebounce && (ce(),
            x = Bt(Ue, y.interactiveDebounce)),
            v.triggerTarget && !y.triggerTarget ? me(v.triggerTarget).forEach(function(D) {
                D.removeAttribute("aria-expanded")
            }) : y.triggerTarget && e.removeAttribute("aria-expanded"),
            J(),
            k(),
            T && T(v, y),
            n.popperInstance && (qe(),
            ue().forEach(function(D) {
                requestAnimationFrame(D._tippy.popperInstance.forceUpdate)
            })),
            $("onAfterUpdate", [n, s])
        }
    }
    function Ge(s) {
        n.setProps({
            content: s
        })
    }
    function sr() {
        var s = n.state.isVisible
          , v = n.state.isDestroyed
          , y = !n.state.isEnabled
          , D = Z.isTouch && !n.props.touch
          , E = ut(n.props.duration, 0, G.duration);
        if (!(s || v || y || D) && !P().hasAttribute("disabled") && ($("onShow", [n], !1),
        n.props.onShow(n) !== !1)) {
            if (n.state.isVisible = !0,
            B() && (l.style.visibility = "visible"),
            k(),
            _(),
            n.state.isMounted || (l.style.transition = "none"),
            B()) {
                var H = U()
                  , q = H.box
                  , Oe = H.content;
                ft([q, Oe], 0)
            }
            A = function() {
                var de;
                if (!(!n.state.isVisible || d)) {
                    if (d = !0,
                    l.offsetHeight,
                    l.style.transition = n.props.moveTransition,
                    B() && n.props.animation) {
                        var at = U()
                          , Ke = at.box
                          , xe = at.content;
                        ft([Ke, xe], E),
                        It([Ke, xe], "visible")
                    }
                    K(),
                    J(),
                    jt(tt, n),
                    (de = n.popperInstance) == null || de.forceUpdate(),
                    $("onMount", [n]),
                    n.props.animation && B() && ie(E, function() {
                        n.state.isShown = !0,
                        $("onShown", [n])
                    })
                }
            }
            ,
            oe()
        }
    }
    function ur() {
        var s = !n.state.isVisible
          , v = n.state.isDestroyed
          , y = !n.state.isEnabled
          , D = ut(n.props.duration, 1, G.duration);
        if (!(s || v || y) && ($("onHide", [n], !1),
        n.props.onHide(n) !== !1)) {
            if (n.state.isVisible = !1,
            n.state.isShown = !1,
            d = !1,
            c = !1,
            B() && (l.style.visibility = "hidden"),
            ce(),
            ne(),
            k(!0),
            B()) {
                var E = U()
                  , H = E.box
                  , q = E.content;
                n.props.animation && (ft([H, q], D),
                It([H, q], "hidden"))
            }
            K(),
            J(),
            n.props.animation ? B() && ye(D, n.unmount) : n.unmount()
        }
    }
    function fr(s) {
        W().addEventListener("mousemove", x),
        jt(Ze, x),
        x(s)
    }
    function cr() {
        n.state.isVisible && n.hide(),
        n.state.isMounted && (ze(),
        ue().forEach(function(s) {
            s._tippy.unmount()
        }),
        l.parentNode && l.parentNode.removeChild(l),
        tt = tt.filter(function(s) {
            return s !== n
        }),
        n.state.isMounted = !1,
        $("onHidden", [n]))
    }
    function pr() {
        n.state.isDestroyed || (n.clearDelayTimeouts(),
        n.unmount(),
        We(),
        delete e._tippy,
        n.state.isDestroyed = !0,
        $("onDestroy", [n]))
    }
}
function Ne(e, t) {
    t === void 0 && (t = {});
    var r = G.plugins.concat(t.plugins || []);
    Mn();
    var i = Object.assign({}, t, {
        plugins: r
    })
      , o = Cn(e)
      , a = o.reduce(function(c, u) {
        var f = u && Un(u, i);
        return f && c.push(f),
        c
    }, []);
    return ot(e) ? a[0] : a
}
Ne.defaultProps = G;
Ne.setDefaultProps = Hn;
Ne.currentInput = Z;
var zn = function(t) {
    var r = t === void 0 ? {} : t
      , i = r.exclude
      , o = r.duration;
    tt.forEach(function(a) {
        var c = !1;
        if (i && (c = nr(i) ? a.reference === i : a.popper === i.popper),
        !c) {
            var u = a.props.duration;
            a.setProps({
                duration: o
            }),
            a.hide(),
            a.state.isDestroyed || a.setProps({
                duration: u
            })
        }
    })
}
  , Fn = Object.assign({}, qt, {
    effect: function(t) {
        var r = t.state
          , i = {
            popper: {
                position: r.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
            },
            reference: {}
        };
        Object.assign(r.elements.popper.style, i.popper),
        r.styles = i,
        r.elements.arrow && Object.assign(r.elements.arrow.style, i.arrow)
    }
})
  , Xn = function(t, r) {
    var i;
    r === void 0 && (r = {});
    var o = t, a = [], c = [], u, f = r.overrides, d = [], p = !1;
    function O() {
        c = o.map(function(n) {
            return me(n.props.triggerTarget || n.reference)
        }).reduce(function(n, m) {
            return n.concat(m)
        }, [])
    }
    function A() {
        a = o.map(function(n) {
            return n.reference
        })
    }
    function h(n) {
        o.forEach(function(m) {
            n ? m.enable() : m.disable()
        })
    }
    function x(n) {
        return o.map(function(m) {
            var l = m.setProps;
            return m.setProps = function(T) {
                l(T),
                m.reference === u && n.setProps(T)
            }
            ,
            function() {
                m.setProps = l
            }
        })
    }
    function b(n, m) {
        var l = c.indexOf(m);
        if (m !== u) {
            u = m;
            var T = (f || []).concat("content").reduce(function(L, R) {
                return L[R] = o[l].props[R],
                L
            }, {});
            n.setProps(Object.assign({}, T, {
                getReferenceClientRect: typeof T.getReferenceClientRect == "function" ? T.getReferenceClientRect : function() {
                    var L;
                    return (L = a[l]) == null ? void 0 : L.getBoundingClientRect()
                }
            }))
        }
    }
    h(!1),
    A(),
    O();
    var w = {
        fn: function() {
            return {
                onDestroy: function() {
                    h(!0)
                },
                onHidden: function() {
                    u = null
                },
                onClickOutside: function(l) {
                    l.props.showOnCreate && !p && (p = !0,
                    u = null)
                },
                onShow: function(l) {
                    l.props.showOnCreate && !p && (p = !0,
                    b(l, a[0]))
                },
                onTrigger: function(l, T) {
                    b(l, T.currentTarget)
                }
            }
        }
    }
      , g = Ne(Ae(), Object.assign({}, On(r, ["overrides"]), {
        plugins: [w].concat(r.plugins || []),
        triggerTarget: c,
        popperOptions: Object.assign({}, r.popperOptions, {
            modifiers: [].concat(((i = r.popperOptions) == null ? void 0 : i.modifiers) || [], [Fn])
        })
    }))
      , C = g.show;
    g.show = function(n) {
        if (C(),
        !u && n == null)
            return b(g, a[0]);
        if (!(u && n == null)) {
            if (typeof n == "number")
                return a[n] && b(g, a[n]);
            if (o.indexOf(n) >= 0) {
                var m = n.reference;
                return b(g, m)
            }
            if (a.indexOf(n) >= 0)
                return b(g, n)
        }
    }
    ,
    g.showNext = function() {
        var n = a[0];
        if (!u)
            return g.show(0);
        var m = a.indexOf(u);
        g.show(a[m + 1] || n)
    }
    ,
    g.showPrevious = function() {
        var n = a[a.length - 1];
        if (!u)
            return g.show(n);
        var m = a.indexOf(u)
          , l = a[m - 1] || n;
        g.show(l)
    }
    ;
    var S = g.setProps;
    return g.setProps = function(n) {
        f = n.overrides || f,
        S(n)
    }
    ,
    g.setInstances = function(n) {
        h(!0),
        d.forEach(function(m) {
            return m()
        }),
        o = n,
        h(!1),
        A(),
        O(),
        d = x(g),
        g.setProps({
            triggerTarget: c
        })
    }
    ,
    d = x(g),
    g
};
Ne.setDefaultProps({
    render: ar
});
export {qn as R, yn as a, Xn as c, zn as h, Ne as t};
//# sourceMappingURL=tippy.esm-B00VeVX7.js.map, var y = Object.defineProperty;
var I = Object.getOwnPropertySymbols;
var A = Object.prototype.hasOwnProperty
  , S = Object.prototype.propertyIsEnumerable;
var f = (l, e, t) => e in l ? y(l, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : l[e] = t
  , h = (l, e) => {
    for (var t in e || (e = {}))
        A.call(e, t) && f(l, t, e[t]);
    if (I)
        for (var t of I(e))
            S.call(e, t) && f(l, t, e[t]);
    return l
}
;
var m = (l, e, t) => f(l, typeof e != "symbol" ? e + "" : e, t);
var v = (l, e, t) => new Promise( (s, r) => {
    var a = i => {
        try {
            o(t.next(i))
        } catch (c) {
            r(c)
        }
    }
      , u = i => {
        try {
            o(t.throw(i))
        } catch (c) {
            r(c)
        }
    }
      , o = i => i.done ? s(i.value) : Promise.resolve(i.value).then(a, u);
    o((t = t.apply(l, e)).next())
}
);
function k(l, e, t) {
    return t = e < t ? e : t,
    t = t < l ? l : t,
    t
}
function O(l) {
    const e = new URL(l);
    return new URLSearchParams(e.hash.slice(1))
}
function E(l) {
    return `#${l.toString()}`
}
function j(l) {
    if (window.location.host.match(/^admin[\-a-z0-9]*\.imaios\.com$/))
        return "";
    const e = window.location.pathname.split("/")[1];
    return e !== void 0 && (e.length === 2 || e === "admin" || e.startsWith("test_")) ? e : l != null ? l : ""
}
const w = 3e5
  , n = class n {
    constructor() {
        m(this, "isAvailable", !1);
        this.isAvailable = n.checkIsAvailable()
    }
    static checkIsAvailable() {
        const e = "test";
        try {
            return n.store.setItem(e, e),
            n.store.removeItem(e),
            !0
        } catch (t) {
            return !1
        }
    }
    isExpired(e) {
        return typeof (e == null ? void 0 : e.expire) < "u" && e.expire < Date.now()
    }
    checkAllExpire(e) {
        if (this.isAvailable) {
            const t = Object.keys(n.store);
            for (const s of t)
                e !== void 0 ? e.test(s) && this.checkExpire(s) : this.checkExpire(s)
        }
    }
    checkExpire(e) {
        if (this.isAvailable) {
            const t = this.get(e);
            this.isExpired(t) && this.remove(e)
        }
    }
    add(e, t, s=null) {
        if (this.isAvailable) {
            s === null ? t.expire = Date.now() + w : t.expire = s;
            const r = this.get(e);
            r !== null && typeof r == "object" && (t = h(h({}, r), t)),
            n.store.setItem(e, JSON.stringify(t))
        }
    }
    get(e, t=!1) {
        if (this.isAvailable)
            try {
                const s = n.store.getItem(e);
                if (s === null)
                    return null;
                const r = JSON.parse(s);
                return t && this.isExpired(r) ? (this.remove(e),
                null) : r
            } catch (s) {
                return null
            }
        return null
    }
    remove(e, t) {
        if (this.isAvailable)
            if (t !== void 0) {
                const s = this.get(e);
                typeof s == "object" && s !== null ? (delete s[t],
                Object.keys(s).length === 0 ? n.store.removeItem(e) : n.store.setItem(e, JSON.stringify(s))) : n.store.removeItem(e)
            } else
                n.store.removeItem(e)
    }
    has(e) {
        return this.isAvailable ? this.get(e) !== null : !1
    }
}
;
m(n, "store", localStorage);
let g = n;
const J = new g;
class b {
    constructor() {
        m(this, "isAvailable", !1);
        this.isAvailable = b.checkIsAvailable()
    }
    static checkIsAvailable() {
        const e = "test";
        try {
            return localStorage.setItem(e, e),
            localStorage.removeItem(e),
            !0
        } catch (t) {
            return !1
        }
    }
    add(e, t) {
        if (this.isAvailable) {
            const s = this.get(e);
            s !== null && typeof s == "object" && (t = h(h({}, s), t)),
            localStorage.setItem(e, JSON.stringify(t))
        }
    }
    get(e) {
        var t;
        if (this.isAvailable)
            try {
                const s = localStorage.getItem(e);
                return s === null ? null : (t = JSON.parse(s)) != null ? t : null
            } catch (s) {
                return null
            }
    }
    remove(e, t) {
        if (!this.isAvailable)
            return;
        if (t === void 0 || t === "") {
            localStorage.removeItem(e);
            return
        }
        const s = this.get(e);
        typeof s == "object" && s !== null ? (delete s[t],
        Object.keys(s).length === 0 ? localStorage.removeItem(e) : localStorage.setItem(e, JSON.stringify(s))) : localStorage.removeItem(e)
    }
}
const N = new b;
function P(l, e, t=3) {
    return v(this, null, function*() {
        const s = new Array(l.length)
          , r = new Map;
        let a = 0;
        function u() {
            return v(this, null, function*() {
                if (a >= l.length)
                    return;
                const i = a
                  , c = l[i];
                a++;
                const p = Promise.resolve().then( () => e(c, i)).then(d => (s[i] = d,
                r.delete(i),
                u()));
                return r.set(i, p),
                p
            })
        }
        const o = [];
        for (let i = 0; i < Math.min(t, l.length); i++)
            o.push(u());
        for (yield Promise.all(o); r.size > 0; )
            yield Promise.all(r.values());
        return s
    })
}
export {P as E, k as I, N as O, j as d, O as m, E as p, J as w};
//# sourceMappingURL=utils-BACTbHDn.js.map










