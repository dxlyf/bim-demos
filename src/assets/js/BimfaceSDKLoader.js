!(function () {
  "use strict";
  var e = window.hostConfig || {
    APIHost: "https://api.bimface.com",
    resourceHost: "https://m.bimface.com",
    staticHost: "https://static.bimface.com",
    dataEnvType: "BIMFACE",
    securityApi: !0,
  };
  void 0 === Object.assign &&
    (Object.assign = function (e) {
      if (null == e)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var t = Object(e), o = 1; o < arguments.length; o++) {
        var n = arguments[o];
        if (null != n)
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
      }
      return t;
    });
  let t = Object.freeze({ Release: "Release", Debug: "Debug" }),
    o = Object.freeze({ Normal: "Normal", DrawingView: "drawingView" }),
    n = Object.freeze({ BIMFACE: "BIMFACE", Local: "Local" }),
    r = Object.freeze({
      zh_CN: "zh_CN",
      en_GB: "en_GB",
      sv_SE: "sv_SE",
      zh_TW: "zh_TW",
    }),
    a = Object.freeze({ Normal: "Normal", Bake: "Bake" });
  (window.BimfaceSDKLoaderConfig = function () {
    if (window.hostConfig) {
      for (let t in window.hostConfig) e[t] = window.hostConfig[t];
      e.securityApi = window.hostConfig.securityApi;
    }
    return {
      staticHost: `${e.staticHost}/api`,
      APIHost: e.APIHost,
      language: "zh_CN",
      viewToken: null,
      configuration: t.Release,
      dataEnvType: e.dataEnvType || "BIMFACE",
      viewType: o.Normal,
      visualStyle: a.Bake,
      version: "",
      securityApi: e.securityApi,
    };
  }),
    (window.BimfaceEnvOption = n),
    (window.BimfaceLanguageOption = r),
    (window.BimfaceConfigrationOption = t),
    (window.BimfaceViewTypeOption = o);
  let i = function (e) {
    let t = e.split("/");
    return t.pop(), t.join("/") + "/";
  };
  var s = function (e, t) {
      for (var o = 0; o < t.length; o++) t[o] = e + t[o];
    },
    c = function (e) {
      var t = e.sdkVersion,
        n = e.options,
        r = n.configuration,
        a = [],
        i = [`/${t}/${n.language}.js`, `/${t}/Application${r}.js`];
      return (
        (a = (function (e, t) {
          return "drawingView" == e.renderType || t.viewType == o.DrawingView;
        })(e.metadata, e.options)
          ? [
              ...a,
              ...i,
              `/${t}/Drawing.css`,
              `/${t}/bimface.bufferfly.js`,
              `/${t}/Drawing${r}.js`,
            ]
          : [
              ...a,
              ...i,
              `/${t}/Bimface.css`,
              `/${t}/thirdparty.js`,
              `/${t}/lib/loaders/BimTilesLoader.js`,
              `/${t}/Bimface${r}.js`,
            ]),
        a
      );
    };
  window.postProcessing = function (e) {
    var o = e.metadata,
      n = e.options,
      r = e.successCb,
      a = c(e);
    s(n.staticHost, a),
      (o.databagId = `${o.databagId}`),
      n.path
        ? ((o.path = n.path), (o.dataPath = "./"))
        : n.resourcePath && (o.path = n.resourcePath.replace("viewToken", "")),
      (o.sdkPath = n.sdkPath),
      0 == a.length
        ? r(o)
        : d(a, function () {
            if (n.build === t.Debug && n.dataPath) {
              let e = n.dataPath.split("/");
              r({ databagId: e.pop(), path: e.join("/") });
            }
            r(o);
          });
  };
  var d = function (e, o, n) {
      var r = e.length,
        a = 0,
        i = function (l) {
          if (
            l &&
            "error" == l.message &&
            l.element.indexOf("bimface.index") > -1
          ) {
            a = 0;
            var f = n.options;
            f.build, t.Release;
            var h = c(n);
            return s(f.staticHost, h), void d(h, o);
          }
          ++a == r ? o() : u(e[a], i);
        };
      u(e[a], i);
    },
    l = [],
    u = function (e, t) {
      if (!(l.indexOf(e.split("/").pop()) > -1)) {
        var o,
          n = document.getElementsByTagName("head")[0];
        return (
          e.indexOf(".css") > -1
            ? ((o = document.createElement("link")).setAttribute("href", e),
              o.setAttribute("rel", "stylesheet"))
            : (o = document.createElement("script")).setAttribute("src", e),
          (o.url = e),
          n.appendChild(o),
          o.addEventListener("load", function () {
            l.push(this.url.split("/").pop()), t && t({ message: "success" });
          }),
          o.addEventListener("error", function () {
            t && t({ element: e, message: "error" });
          }),
          o
        );
      }
      t();
    };
  window.loadResource = d;
  class f extends class {
    constructor(e) {
      (this.indexedDB =
        window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.msIndexedDB),
        this.indexedDB || console.log("IndexedDB not supported"),
        (this._db = null),
        (this._opt = e);
    }
    open(e, t) {
      const o = e || this._opt.name,
        n = t || this._opt.version || 1,
        r = this.indexedDB.open(o, n);
      return new Promise((e, t) => {
        (r.onsuccess = (t) => {
          (this._db = r.result), e(this._db);
        }),
          (r.onupgradeneeded = (e) => {
            let t = (this._db = e.target.result);
            (this._opt.storeList || []).forEach(
              (e) => !t.objectStoreNames.contains(e) && t.createObjectStore(e)
            );
          }),
          (r.onerror = (e) => {
            t(e);
          });
      });
    }
    getDB() {
      return new Promise((e, t) => {
        this._db ? e(this._db) : this.open().then(e).catch(t);
      });
    }
    addObject(e, t, o) {
      return new Promise((n, r) => {
        this.getDB()
          .then((a) => {
            const i = a.transaction(e, "readwrite");
            (i.objectStore(e).put(t, o).onsuccess = (e) => {
              n(e.target.result);
            }),
              (i.onerror = (e) => {
                r(e);
              });
          })
          .catch(r);
      });
    }
    getObject(e, t) {
      return new Promise((o, n) => {
        this.getDB()
          .then((r) => {
            const a = r.transaction(e, "readonly");
            (a.objectStore(e).get(t).onsuccess = (e) => {
              let t = e.target.result;
              t ? o(t) : n(e);
            }),
              (a.onerror = (e) => {
                n(e);
              });
          })
          .catch(n);
      });
    }
    deleteObject(e, t) {
      return new Promise((o, n) => {
        this.getDB()
          .then((r) => {
            const a = r.transaction(e, "readwrite");
            (a.objectStore(e).delete(t).onsuccess = (e) => {
              o(e.target.result);
            }),
              (a.onerror = (e) => {
                n(e);
              });
          })
          .catch(n);
      });
    }
    clearStore(e) {
      return new Promise((t, o) => {
        this.getDB()
          .then((n) => {
            const r = n.transaction(e, "readwrite");
            (r.objectStore(e).clear().onsuccess = (e) => {
              t(e.target.result);
            }),
              (r.onerror = (e) => {
                o(e);
              });
          })
          .catch(o);
      });
    }
    deleteDB(e) {
      return new Promise((t) => {
        this.indexedDB.deleteDatabase(e), t();
      });
    }
    getAllKeys(e) {
      return new Promise((t, o) => {
        this.getDB()
          .then((n) => {
            const r = n.transaction(e, "readonly");
            (r.objectStore(e).getAllKeys().onsuccess = (e) =>
              t(e.target.result)),
              (r.onerror = o);
          })
          .catch(o);
      });
    }
    getAll(e) {
      return new Promise((t, o) => {
        this.getDB()
          .then((n) => {
            const r = n.transaction(e, "readonly");
            (r.objectStore(e).getAll().onsuccess = (e) => t(e.target.result)),
              (r.onerror = o);
          })
          .catch(o);
      });
    }
  } {
    constructor() {
      super({ name: "Bf_Loader", version: 1, storeList: ["d", "t"] });
    }
    getDatabagInfo(e, t) {
      return new Promise((o, n) => {
        t
          ? this.getObject("d", e)
              .then((e) =>
                this.addTemp(e, t)
                  .then(() => o(e))
                  .catch(n)
              )
              .catch(n)
          : this.getObject("d", e).then(o).catch(n);
      });
    }
    addDatabagInfo(e, t) {
      return new Promise((o, n) => {
        const r = e.modelId,
          a = () =>
            Promise.all([this.addObject("d", e, r), this.addTemp(e, t)])
              .then(o)
              .catch(n);
        this.getDatabagInfo(r)
          .then((t) => {
            t.databagId !== e.databagId &&
              this.deleteDB(`Bf_${data.databagId}`),
              a();
          })
          .catch(() => {
            a();
          });
      });
    }
    deleteDatabagInfo(e) {
      return new Promise((t, o) => {
        this.deleteObject("d", e).then(t).catch(o);
      });
    }
    addTemp(e, t) {
      return new Promise((o, n) => {
        this.clearStore("t")
          .then(() => {
            this.addObject("t", e, t).then(o).catch(n);
          })
          .catch(n);
      });
    }
    getTemp(e) {
      return new Promise((t, o) => {
        this.getObject("t", e).then(t).catch(o);
      });
    }
    deleteStorageByModelId(e) {
      return new Promise((t) => {
        this.getDatabagInfo(e)
          .then((o) => {
            let n =
              "gisView" === o.renderType
                ? `Bg_${o.modelId}`
                : `Bf_${o.databagId}`;
            Promise.allSettled([
              this.deleteDB(n),
              this.deleteDatabagInfo(e),
            ]).then(t);
          })
          .catch(t);
      });
    }
    getStoredModelIds() {
      return this.getAllKeys("d");
    }
    getStoredModelInfo() {
      return new Promise((e, t) => {
        this.getAll("d")
          .then((t) => {
            let o = t.map((e) => {
              let { modelId: t, name: o, renderType: n } = e;
              return { modelId: t, name: o, type: n };
            });
            e(o);
          })
          .catch(t);
      });
    }
  }
  var h = function (e, t, o) {
      if (e.metadata) return o(e.metadata);
      const r = (n) => {
        if (e.enableStorage && e.modelId) {
          new f()
            .getDatabagInfo(e.modelId, e.viewToken)
            .then((e) => o && o(e))
            .catch(() => {
              console.error(
                "[BIMFACE ERROR]: failed get model info from storage"
              ),
                t && t(n);
            });
        } else t && t(n);
      };
      if (!e.viewToken && "Local" !== e.dataEnvType) return void r();
      const a = e.dataEnvType !== n.Local,
        i = a && e.securityApi;
      !(function (e) {
        var t,
          o = Object.assign(
            { type: "get", data: null, success: null, failure: null },
            e
          );
        ((t = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange =
          function () {
            if (4 == t.readyState) {
              var e = t.status;
              (e >= 200 && e < 300) ||
              304 == e ||
              (0 === e && "file:" === window.location.protocol)
                ? o.success && o.success(t.responseText, t.responseXML)
                : o.failure && o.failure(e);
            }
          }),
          t.open(o.type, o.url, o.async),
          t.send(o.data);
      })({
        type: i ? "post" : "get",
        url: a && !i ? `${e.url}?viewToken=${e.viewToken}` : e.url,
        async: !0,
        data: i ? e.data : void 0,
        requestHeader: e.requestHeader,
        success: function (t) {
          var n = JSON.parse(t);
          if ("Local" !== e.dataEnvType && "success" !== n.code)
            return (
              n.message && console.error(`[BIMFACE ERROR]: ${n.message}`),
              void r(t)
            );
          if (((n = n.data || n), e.enableStorage)) {
            new f()
              .addDatabagInfo(n, e.viewToken)
              .then(() => o && o(n))
              .catch(() => o && o(n));
          } else o && o(n);
        },
        failure: r,
      });
    },
    p = function (e, t, n) {
      h(e, n, function (n) {
        var r = (function (e, t) {
          let n,
            r = t.version;
          if (
            (e.renderVersion, /\d+?\.\d+?\.\d+/.test(r) && r.split(".")[0] >= 3)
          ) {
            window.bimfaceSdkVersion = r;
            const [e, t, o] = r.split(".");
            "6" === t && Number(o) < 143 && (r = `Bimface@${r}`);
          } else if ("Debug" == t.build) (r = "Bimface"), (n = "Application");
          else if (t.sdkPath) r = n = "bimface";
          else if (
            t.viewType == o.DrawingView &&
            "drawingView" != e.renderType
          ) {
            var a = e.subRenders;
            if (a && 0 != a.length)
              for (var i = 0; i < a.length; i++)
                a[i].renderType == o.DrawingView &&
                  ((r = a[i].jsSDKVersion), (n = a[i].jsSDKVersion));
          } else (r = e.jsSDKVersion), (n = e.jsSDKVersion);
          return { ui: n, sdk: r };
        })(n, e);
        window.BimfaceLoaderConfig.fullStaticHost =
          "Local" == BimfaceLoaderConfig.dataEnvType
            ? e.staticHost + "/bimface"
            : e.staticHost + "/" + r.sdk;
        var a = {
            metadata: n,
            options: e,
            successCb: t,
            sdkVersion: r.sdk,
            uiVersion: r.ui,
          },
          i = window.BimfaceLoaderConfig.fullStaticHost + "/bimface.index.js";
        d(
          [i],
          function () {
            postProcessing(a);
          },
          a
        );
      });
    },
    g = function (e, t) {
      var o = "bimView" == e.renderType ? "3DView" : e.renderType,
        n =
          (e.subRenders,
          {
            dataEnvType: t.dataEnvType,
            viewToken: t.viewToken,
            staticHost: t.staticHost,
            APIHost: t.APIHost,
            viewType: o,
          });
      return Object.assign(n, e);
    },
    w = {
      getStorage() {
        return (this.storage = this.storage || new f()), this.storage;
      },
      deleteStorageByModelId(e) {
        return this.getStorage().deleteStorageByModelId(e);
      },
      getStoredModelIds() {
        return this.getStorage().getStoredModelIds();
      },
      getStoredModelInfo() {
        return this.getStorage().getStoredModelInfo();
      },
      store(e) {
        let {
          url: t,
          viewToken: o,
          storeMaterialOverride: n,
          successCallback: r,
          progressCallback: a,
          errorCallback: i,
          conditions: s,
          storeByQueue: c,
        } = e;
        const d = c && c.enable,
          l = d && (c.delay || 2e3);
        if (!o) return;
        (t = t || []),
          (r = r || function () {}),
          (a = a || function () {}),
          (i = i || function () {});
        const u = new BimfaceSDKLoaderConfig();
        (u.enableStorage = !0),
          (u.viewToken = o),
          BimfaceSDKLoader.load(u)
            .then((e) => {
              if ("3DView" == e.viewType) {
                const c = document.createElement("div");
                (c.style.width = "1px"),
                  (c.style.height = "1px"),
                  (c.style.opacity = "0"),
                  (c.style.position = "absolute"),
                  (c.style.zIndex = "-1"),
                  (c.style.top = "0px"),
                  (c.style.left = "0px"),
                  document.body.appendChild(c);
                const u = new Glodon.Bimface.Viewer.Viewer3DConfig();
                (u.domElement = c),
                  (u.enableStorage = !0),
                  (u.enableViewHouse = !1),
                  (u.enableCSMShadow = !1),
                  (u.enableSSAO = !1),
                  (u.enableLogarithmicDepthBuffer = !1);
                const f = new Glodon.Bimface.Viewer.Viewer3D(u),
                  h = new Promise((t) => {
                    const r = () => {
                      requestAnimationFrame(() => {
                        f.destroy(), document.body.removeChild(c), t();
                      });
                    };
                    if ("true" == e.config.toBimtiles)
                      return (
                        f.addModel(e, null, { forceLoadBIMTiles: !0 }),
                        f
                          .getViewer()
                          .registerEventListener(
                            CLOUD.EVENTS.ON_LOAD_PROGRESS,
                            function (e) {
                              var t = e.progress,
                                o = (t.loaded / t.total) * 100;
                              a(o);
                            }
                          ),
                        void f
                          .getViewer()
                          .registerEventListener(
                            CLOUD.EVENTS.ON_MODEL_CACHE_COMPLETE,
                            function (e) {
                              r();
                            }
                          )
                      );
                    f.addModel(e),
                      d ||
                        f.addEventListener(
                          Glodon.Bimface.Viewer.Viewer3DEvent.ViewLoading,
                          (e) => a(e.progress)
                        );
                    let i = !1;
                    f.addEventListener(
                      Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded,
                      () => {
                        if (i) return;
                        const e = () => {
                          i = !0;
                          const e = f.getDefaultModel(),
                            t = e
                              .getCloudViewer()
                              .getModelManager()
                              .getModel(e.modelId),
                            n = [
                              ...t._handler.layerProvider.getAllLayerIdxData()
                                .layerKeys,
                            ],
                            s = [
                              ...t._handler.layerProvider.getLayerKeyAttributes(),
                            ];
                          let c = 0;
                          const d = {},
                            u = () => {
                              if (
                                (a(Math.floor((100 * (c + 1)) / n.length)),
                                c === n.length)
                              )
                                return void r();
                              n[c].split("-").forEach((e, t) => (d[s[t]] = e));
                              const e = f.getDefaultModel();
                              e && e.destroy();
                              const t = isNaN(l) ? 2e3 : Number(l);
                              setTimeout(() => {
                                f.addView(o);
                              }, t),
                                c++;
                            };
                          f.addEventListener(
                            Glodon.Bimface.Viewer.Viewer3DEvent.ModelAdded,
                            () => {
                              f.showExclusiveComponentsByObjectData(
                                [d],
                                null,
                                u
                              );
                            }
                          ),
                            u();
                        };
                        n
                          ? f.loadMaterialOverrideSet(
                              f.getModel().modelId,
                              o,
                              function () {
                                s
                                  ? f.showExclusiveComponentsByObjectData(
                                      s,
                                      null,
                                      r
                                    )
                                  : d
                                  ? e()
                                  : (f.showAllComponents(),
                                    f.addEventListener(
                                      Glodon.Bimface.Viewer.Viewer3DEvent
                                        .DemandLoaded,
                                      r
                                    ));
                              }
                            )
                          : s
                          ? f.showExclusiveComponentsByObjectData(s, null, r)
                          : d
                          ? e()
                          : r();
                      }
                    );
                  });
                Promise.all([h, f._storeData(t)])
                  .then(r)
                  .catch(i);
              }
            })
            .catch();
      },
    },
    m = function () {
      return (
        (m =
          Object.assign ||
          function (e) {
            for (var t, o = 1, n = arguments.length; o < n; o++)
              for (var r in (t = arguments[o]))
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
          }),
        m.apply(this, arguments)
      );
    };
  function b(e, t, o, n) {
    return new (o || (o = Promise))(function (r, a) {
      function i(e) {
        try {
          c(n.next(e));
        } catch (e) {
          a(e);
        }
      }
      function s(e) {
        try {
          c(n.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function c(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof o
              ? t
              : new o(function (e) {
                  e(t);
                })).then(i, s);
      }
      c((n = n.apply(e, t || [])).next());
    });
  }
  function v(e, t) {
    var o,
      n,
      r,
      a,
      i = {
        label: 0,
        sent: function () {
          if (1 & r[0]) throw r[1];
          return r[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (a = { next: s(0), throw: s(1), return: s(2) }),
      "function" == typeof Symbol &&
        (a[Symbol.iterator] = function () {
          return this;
        }),
      a
    );
    function s(a) {
      return function (s) {
        return (function (a) {
          if (o) throw new TypeError("Generator is already executing.");
          for (; i; )
            try {
              if (
                ((o = 1),
                n &&
                  (r =
                    2 & a[0]
                      ? n.return
                      : a[0]
                      ? n.throw || ((r = n.return) && r.call(n), 0)
                      : n.next) &&
                  !(r = r.call(n, a[1])).done)
              )
                return r;
              switch (((n = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                case 0:
                case 1:
                  r = a;
                  break;
                case 4:
                  return i.label++, { value: a[1], done: !1 };
                case 5:
                  i.label++, (n = a[1]), (a = [0]);
                  continue;
                case 7:
                  (a = i.ops.pop()), i.trys.pop();
                  continue;
                default:
                  if (
                    !((r = i.trys),
                    (r = r.length > 0 && r[r.length - 1]) ||
                      (6 !== a[0] && 2 !== a[0]))
                  ) {
                    i = 0;
                    continue;
                  }
                  if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                    i.label = a[1];
                    break;
                  }
                  if (6 === a[0] && i.label < r[1]) {
                    (i.label = r[1]), (r = a);
                    break;
                  }
                  if (r && i.label < r[2]) {
                    (i.label = r[2]), i.ops.push(a);
                    break;
                  }
                  r[2] && i.ops.pop(), i.trys.pop();
                  continue;
              }
              a = t.call(e, i);
            } catch (e) {
              (a = [6, e]), (n = 0);
            } finally {
              o = r = 0;
            }
          if (5 & a[0]) throw a[1];
          return { value: a[0] ? a[1] : void 0, done: !0 };
        })([a, s]);
      };
    }
  }
  window.hostConfig = window.hostConfig || {
    APIHost: "https://api.bimface.com",
    resourceHost: "https://m.bimface.com",
    staticHost: "https://static.bimface.com",
    dataEnvType: "BIMFACE",
    securityApi: !0,
  };
  var y = function () {
      window.hostConfig = window.hostConfig || {
        APIHost: "https://api.bimface.com",
        resourceHost: "https://m.bimface.com",
        staticHost: "https://static.bimface.com",
        dataEnvType: "BIMFACE",
        securityApi: !0,
      };
      var e = m({}, window.hostConfig);
      return (e.staticHost = window.hostConfig.staticHost + "/api"), e;
    },
    B = (function () {
      function e(e) {
        this._config = e;
      }
      return (
        (e.prototype.getModuleData = function (e) {
          var t = this;
          return new Promise(function (o, n) {
            var r;
            ((r = {
              type: "post",
              data: e,
              url: t._config.APIHost + "/inside/databag",
            }),
            new Promise(function (e, t) {
              var o = m(m({}, { type: "get", data: null }), r),
                n = new XMLHttpRequest();
              (n.onreadystatechange = function () {
                if (4 == n.readyState) {
                  var o = n.status;
                  if (
                    (o >= 200 && o < 300) ||
                    304 == o ||
                    (0 === o && "file:" === window.location.protocol)
                  ) {
                    var r = void 0;
                    try {
                      r = JSON.parse(n.responseText);
                    } catch (e) {
                      throw e;
                    }
                    e({
                      json: r,
                      responseText: n.responseText,
                      responseXML: n.responseXML,
                    });
                  } else t(o);
                }
              }),
                n.open(o.type, o.url, o.async),
                n.send(o.data);
            })).then(function (e) {
              e.json.data ? o(e.json.data) : n(e.json);
            });
          });
        }),
        (e.prototype.loadScript = function (e) {
          return new Promise(function (t, o) {
            var n = document.createElement("script");
            n.setAttribute("src", e),
              (n.onload = function () {
                t(!0);
              }),
              (n.onerror = function (e) {
                o(e), console.error(e);
              }),
              document.getElementsByTagName("head")[0].append(n);
          });
        }),
        (e.prototype.loadCss = function (e) {
          return new Promise(function (t, o) {
            var n = document.createElement("link");
            n.setAttribute("href", e),
              n.setAttribute("rel", "stylesheet"),
              (n.onload = function () {
                t(!0);
              }),
              (n.onerror = function (e) {
                o(e), console.error(e);
              }),
              document.getElementsByTagName("head")[0].append(n);
          });
        }),
        (e.prototype.getStaticMainSrc = function (e) {
          return (
            this._config.staticHost +
            "/Glodon/" +
            ("Debug" === this._config.build ? "Bimface" : e)
          );
        }),
        (e.prototype.loadSDKLoader = function () {
          var e = this;
          return new Promise(function (t, o) {
            if (window.BimfaceSDKLoader) t(!0);
            else {
              var n =
                e._config.staticHost +
                "/BimfaceSDKLoader/BimfaceSDKLoader@latest-release.js";
              e.loadScript(n)
                .then(function () {
                  return t(!0);
                })
                .catch(function () {
                  return o();
                });
            }
          });
        }),
        (e.prototype.loadUIComponents = function (e) {
          var t = this;
          return new Promise(function (o, n) {
            var r, a, i;
            if (
              null ===
                (i =
                  null ===
                    (a =
                      null === (r = window.Glodon) || void 0 === r
                        ? void 0
                        : r.Bimface) || void 0 === a
                    ? void 0
                    : a.Tiles) || void 0 === i
                ? void 0
                : i.UI
            )
              return o(!0);
            var s = t.getStaticMainSrc(e) + "/bimface.ui.css";
            t.loadCss(s)
              .then(function () {
                return o(!0);
              })
              .catch(function () {
                return n();
              });
          });
        }),
        e
      );
    })(),
    D = window.Glodon || {};
  window.Glodon = D;
  var T = (D.Bimface = D.Bimface || {}),
    S = (T.Module = T.Module || {}),
    E = (function () {
      function e(e) {
        (this._loadedModule = {}),
          (this._config = e),
          (this._helper = new B(e));
      }
      return (
        (e.prototype.loadModule = function (e) {
          return b(this, void 0, void 0, function () {
            var t, o, n, r, a;
            return v(this, function (i) {
              switch (i.label) {
                case 0:
                  return (
                    (t = new window.BimfaceSDKLoaderConfig()),
                    ((t = m(m({}, t), this._config)).viewToken = e.viewToken),
                    [
                      4,
                      window.BimfaceSDKLoader.load(t).catch(function (e) {
                        return console.log(e);
                      }),
                    ]
                  );
                case 1:
                  return i.sent(), [4, this._helper.loadSDKLoader()];
                case 2:
                  return i.sent(), [4, this._helper.getModuleData(e.viewToken)];
                case 3:
                  return "moduleData" != (o = i.sent()).modelType
                    ? [
                        2,
                        Promise.reject(
                          "[BIMFACE ERROR]: Invalid ViewToken, viewToken: [" +
                            e.viewToken +
                            "]"
                        ),
                      ]
                    : ((o.viewToken = e.viewToken),
                      (n = o.jsSDKVersion),
                      [4, this._helper.loadUIComponents(n)]);
                case 4:
                  return (
                    i.sent(),
                    this._loadedModule[e.moduleType]
                      ? [3, 6]
                      : (this._helper.loadCss(
                          this._helper.getStaticMainSrc(n) +
                            "/modules/" +
                            e.moduleType +
                            ".css"
                        ),
                        [
                          4,
                          import(
                            this._helper.getStaticMainSrc(n) +
                              "/modules/" +
                              e.moduleType +
                              ".js"
                          ),
                        ])
                  );
                case 5:
                  (r = i.sent()),
                    (this._loadedModule[e.moduleType] = r.default),
                    (i.label = 6);
                case 6:
                  for (a in this._loadedModule[e.moduleType])
                    this._loadedModule[e.moduleType][a].setCurrentModuleData &&
                      this._loadedModule[e.moduleType][a].setCurrentModuleData(
                        o
                      );
                  return [2, o];
              }
            });
          });
        }),
        e
      );
    })();
  (S.ModuleManager = E), (S.ModuleManagerConfig = y);
  var P = {
    Version: "2024-2-21-16-37",
    load: function (e, o, r) {
      (window.BimfaceLoaderConfig = e),
        null == e.build && (e.build = t.Release);
      var a = (function (e) {
        let o = Object.assign({}, e),
          r = "/Glodon";
        return (
          e.path
            ? ((o.dataEnvType = n.Local),
              (o.url = o.path),
              (o.staticHost = o.sdkPath || i(o.path)),
              (o.resourcePath = i(o.path)),
              (o.path = i(o.path)),
              (r = o.sdkPath ? "" : "/jssdk"))
            : e.resourcePath
            ? ((o.dataEnvType = n.Local),
              (o.url = o.resourcePath),
              (o.resourcePath = i(o.resourcePath)))
            : (o.sdkPath && ((r = ""), (o.staticHost = o.sdkPath)),
              (o.data = e.viewToken),
              (o.url = `${e.APIHost}/inside/databag`)),
          (o.staticHost += r),
          (e.build != t.Debug && o.configuration != t.Release) ||
            (o.configuration = ""),
          (o.configuration = o.configuration
            ? `-${o.configuration.toLowerCase()}`
            : ""),
          o
        );
      })(e);
      if (!o && !r)
        return new Promise((t, o) => {
          p(
            a,
            function (o) {
              t(g(o, e));
            },
            o
          );
        });
      p(
        a,
        function (t) {
          o && o(g(t, e));
        },
        function (e) {
          r && r();
        }
      );
    },
    Storage: w,
  };
  window.BimfaceSDKLoader = P;
})();
