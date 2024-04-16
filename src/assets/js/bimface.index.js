!(function () {
  "use strict";
  var e = [
      "/Private/thirdparty.js",
      "/Private/three.js",
      "/Bimface/lib/loaders/PntLoader.js",
      "/Bimface/lib/loaders/BimTilesLoader.js",
      "/Private/Editor.js",
      "/Private/WebViewer.js",
      "/Private/bimface.bufferfly.js",
      "/Private/mdvDrawing2D.js",
    ],
    t = window.hostConfig || {
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
      for (var t = Object(e), a = 1; a < arguments.length; a++) {
        var i = arguments[a];
        if (null != i)
          for (var s in i)
            Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
      }
      return t;
    });
  let a = Object.freeze({ Release: "Release", Debug: "Debug" }),
    i = Object.freeze({ Normal: "Normal", DrawingView: "drawingView" }),
    s = Object.freeze({ BIMFACE: "BIMFACE", Local: "Local" }),
    n = Object.freeze({
      zh_CN: "zh_CN",
      en_GB: "en_GB",
      sv_SE: "sv_SE",
      zh_TW: "zh_TW",
    }),
    o = Object.freeze({ Normal: "Normal", Bake: "Bake" });
  (window.BimfaceSDKLoaderConfig = function () {
    if (window.hostConfig) {
      for (let e in window.hostConfig) t[e] = window.hostConfig[e];
      t.securityApi = window.hostConfig.securityApi;
    }
    return {
      staticHost: `${t.staticHost}/api`,
      APIHost: t.APIHost,
      language: "zh_CN",
      viewToken: null,
      configuration: a.Release,
      dataEnvType: t.dataEnvType || "BIMFACE",
      viewType: i.Normal,
      visualStyle: o.Bake,
      version: "",
      securityApi: t.securityApi,
    };
  }),
    (window.BimfaceEnvOption = s),
    (window.BimfaceLanguageOption = n),
    (window.BimfaceConfigrationOption = a),
    (window.BimfaceViewTypeOption = i);
  var r = function (e, t) {
      for (var a = 0; a < t.length; a++) t[a] = e + t[a];
    },
    c = function (e) {
      var t = e.sdkVersion,
        a = e.options,
        s = a.configuration,
        n = [],
        o = [`/${t}/${a.language}.js`, `/${t}/Application${s}.js`];
      return (
        (n = (function (e, t) {
          return "drawingView" == e.renderType || t.viewType == i.DrawingView;
        })(e.metadata, e.options)
          ? [
              ...n,
              ...o,
              `/${t}/Drawing.css`,
              `/${t}/bimface.bufferfly.js`,
              `/${t}/Drawing${s}.js`,
            ]
          : [
              ...n,
              ...o,
              `/${t}/Bimface.css`,
              `/${t}/thirdparty.js`,
              `/${t}/lib/loaders/BimTilesLoader.js`,
              `/${t}/Bimface${s}.js`,
            ]),
        n
      );
    };
  window.postProcessing = function (e) {
    var t = e.metadata,
      i = e.options,
      s = e.successCb,
      n = c(e);
    r(i.staticHost, n),
      (t.databagId = `${t.databagId}`),
      i.path
        ? ((t.path = i.path), (t.dataPath = "./"))
        : i.resourcePath && (t.path = i.resourcePath.replace("viewToken", "")),
      (t.sdkPath = i.sdkPath),
      0 == n.length
        ? s(t)
        : d(n, function () {
            if (i.build === a.Debug && i.dataPath) {
              let e = i.dataPath.split("/");
              s({ databagId: e.pop(), path: e.join("/") });
            }
            s(t);
          });
  };
  var d = function (e, t, i) {
      var s = e.length,
        n = 0,
        o = function (f) {
          if (
            f &&
            "error" == f.message &&
            f.element.indexOf("bimface.index") > -1
          ) {
            n = 0;
            var u = i.options;
            u.build, a.Release;
            var p = c(i);
            return r(u.staticHost, p), void d(p, t);
          }
          ++n == s ? t() : l(e[n], o);
        };
      l(e[n], o);
    },
    f = [],
    l = function (e, t) {
      if (!(f.indexOf(e.split("/").pop()) > -1)) {
        var a,
          i = document.getElementsByTagName("head")[0];
        return (
          e.indexOf(".css") > -1
            ? ((a = document.createElement("link")).setAttribute("href", e),
              a.setAttribute("rel", "stylesheet"))
            : (a = document.createElement("script")).setAttribute("src", e),
          (a.url = e),
          i.appendChild(a),
          a.addEventListener("load", function () {
            f.push(this.url.split("/").pop()), t && t({ message: "success" });
          }),
          a.addEventListener("error", function () {
            t && t({ element: e, message: "error" });
          }),
          a
        );
      }
      t();
    };
  window.loadResource = d;
  var u = function (e, t) {
      for (var a = 0; a < t.length; a++) t[a] = e + t[a];
    },
    p = function (e, t) {
      var a = "pdf-transfer" === e.workerType || "pdfView" === t.viewType;
      return a && (e.renderType = "pdfView"), a;
    },
    m = function (e, t) {
      return "drawingView" == e.renderType || t.viewType == i.DrawingView;
    };
  const w = function (e, t, a) {
    const i =
      "Local" == BimfaceLoaderConfig.dataEnvType || BimfaceLoaderConfig.sdkPath
        ? "bimface"
        : t.sdkVersion;
    let s = [
      `/${i}/lib/Base64.min.js`,
      `/${i}/lib/CryptoJS.min.js`,
      `/${i}/lib/JSEncrypt.min.js`,
    ];
    u(e, s);
    let n = "";
    if (t.options.resourcePath.startsWith("http"))
      n = t.options.resourcePath + "/certfile.cer";
    else {
      let e = location.href.lastIndexOf("/");
      n = location.href.substring(0, e) + "/certfile.cer";
    }
    d(s, function () {
      var e, i, s;
      (e = {
        type: "get",
        url: n,
        async: !0,
        success: function (e) {
          const i = new JSEncrypt();
          i.setPublicKey(
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCP15iz0j7CO8vUP/w/rpT5VR4CLhYoVOJWjbHbWQ/esw/K7SC4qjTIN2OOOJjrbITVW8i9vRU3fLxlG0NFw6TaRDfy+UsozGSoqvEtRyzCdxNb3v7TdUqcRKLHsbgTsM8KlFn13dh606Idi+FHYAxFp1e75tbjvJ0S5BhG6oJZHQIDAQAB"
          );
          let s = JSON.parse(Base64.decode(e)),
            n = s.content;
          if (
            (new Date(n.expiryTime.replace(/\-/g, "/")).getTime() || 0) <
            new Date().getTime()
          )
            return void console.warn(
              "您的离线包已过期，如果您是订阅用户，请在官网-【控制台】-【离线数据包】中获取更新授权。"
            );
          const o = t.metadata;
          if (o.modelId != n.modelId || o.databagVersion != n.databagVersion)
            return void console.warn("授权错误，请确认证书属于当前模型！");
          const r = s.sign;
          (n = JSON.stringify(n)),
            i.verify(n, r, CryptoJS.SHA256)
              ? ((t.metadata.databagId = s.content.databagId), a(t))
              : console.warn("授权错误，请确认证书属于当前模型！");
        },
        failure: () => {
          console.log("获取证书文件失败");
        },
      }),
        (s = Object.assign(
          { type: "get", data: null, success: null, failure: null },
          e
        )),
        ((i = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange =
          function () {
            if (4 == i.readyState) {
              var e = i.status;
              (e >= 200 && e < 300) ||
              304 == e ||
              (0 === e && "file:" === window.location.protocol)
                ? s.success && s.success(i.responseText, i.responseXML)
                : s.failure && s.failure(e);
            }
          }),
        i.open(s.type, s.url, s.async),
        i.send(s.data);
    });
  };
  var g = function (t) {
    var i = t.metadata,
      s = t.options,
      n = t.successCb,
      o = (function (t) {
        var i =
            "Local" == BimfaceLoaderConfig.dataEnvType ||
            BimfaceLoaderConfig.sdkPath
              ? "bimface"
              : t.sdkVersion,
          s = t.options,
          n = s.configuration,
          o = [
            "/Bimface/Bimface.css",
            "/Bimface/Application.js",
            "/Bimface/Bimface.js",
            "/Bimface/Drawing.js",
          ],
          r = [];
        s.build === a.Debug
          ? (r = s.dataPath
              ? [...e, ...o]
              : p(t.metadata, t.options)
              ? []
              : [...e])
          : s.build !== a.Release ||
            m(t.metadata, t.options) ||
            p(t.metadata, t.options) ||
            (r = [...r, `/${i}/three.min.js`, `/${i}/bimface.foxfly${n}.js`]);
        var c,
          d = [`/${i}/${s.language}.js`, `/${i}/Application${n}.js`];
        return (
          p(t.metadata, t.options)
            ? (r = [
                ...r,
                ...d,
                `/${i}/Bimface.css`,
                `/${i}/bimface.pdf.css`,
                `/${i}/bimface.pdf.js`,
                `/${i}/bimface.pdfviewer.js`,
              ])
            : m(t.metadata, t.options)
            ? (r = [
                ...r,
                ...d,
                `/${i}/Drawing.css`,
                `/${i}/bimface.bufferfly.js`,
                `/${i}/Drawing${n}.js`,
              ])
            : (c = t.metadata).moduleData &&
              "Linkage2D3D" === c.moduleData.moduleType
            ? (r = [
                ...r,
                ...d,
                `/${i}/bimface.ui.css`,
                `/${i}/bimface.ui.js`,
                `/${i}/Bimface.css`,
                `/${i}/thirdparty.js`,
                `/${i}/lib/loaders/BimTilesLoader.js`,
                `/${i}/Bimface${n}.js`,
                `/${i}/Drawing.css`,
                `/${i}/bimface.bufferfly.js`,
                `/${i}/Drawing${n}.js`,
              ])
            : ((r = [
                ...r,
                ...d,
                `/${i}/Bimface.css`,
                `/${i}/thirdparty.js`,
                `/${i}/lib/loaders/BimTilesLoader.js`,
                `/${i}/Bimface${n}.js`,
              ]),
              "gisView" === t.metadata.renderType &&
                r.push(`/${i}/bimface.ui.js`, `/${i}/bimface.ui.css`)),
          r
        );
      })(t);
    u(s.staticHost, o),
      (i.databagId = `${i.databagId}`),
      s.path
        ? ((i.path = s.path), (i.dataPath = "./"))
        : s.resourcePath && (i.path = s.resourcePath.replace("viewToken", "")),
      (i.sdkPath = s.sdkPath),
      0 == o.length
        ? n(i)
        : d(o, function () {
            if (s.build === a.Debug && s.dataPath) {
              let e = s.dataPath.split("/");
              n({ databagId: e.pop(), path: e.join("/") });
            }
            n(i);
          });
  };
  window.postProcessing = function (e) {
    window.bimfaceStaticHost &&
      !window.BimfaceLoaderConfig.fullStaticHost &&
      ((window.BimfaceLoaderConfig.fullStaticHost = window.bimfaceStaticHost),
      delete window.bimfaceStaticHost);
    var t = e.metadata,
      a = e.options;
    "1.0" === t.licenseVersion ? w(a.staticHost, e, g) : g(e);
  };
})();
