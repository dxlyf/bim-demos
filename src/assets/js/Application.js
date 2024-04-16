!(function () {
  "use strict";
  var e,
    t = (window.Glodon = window.Glodon || {});
  (t.Version = "2024-4-3-20-16"),
    (function () {
      function e(e, t) {
        let n = t.split("."),
          a = e,
          i = n.length;
        for (let e = 0; e < i; e++)
          void 0 === a[n[e]] && (a[n[e]] = {}), (a = a[n[e]]);
        return a;
      }
      e(t, "Web.Lang.Utility.Namespace").ensureNamespace = e;
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Common"),
        n = function (e) {
          "string" == typeof e && (e = JSON.parse(res)),
            (this.code = e.code),
            (this.message = e.message);
        };
      (n.prototype = {
        getErrorCode: function () {
          return this.code;
        },
        getErrorMessage: function () {
          return this.message;
        },
      }),
        (e.Error = n);
    })(),
    (function (e) {
      const n = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Common.Flexible"
      );
      let a = !1,
        i = !1,
        o = "37.5px";
      var l,
        s = e.document,
        r = s.documentElement,
        c = s.querySelector('meta[name="viewport"]');
      if (
        (e.addEventListener(
          "resize",
          function () {
            clearTimeout(l), (l = setTimeout(f, 300));
          },
          !1
        ),
        e.addEventListener(
          "pageshow",
          function (e) {
            e.persisted && (clearTimeout(l), (l = setTimeout(f, 300)));
          },
          !1
        ),
        !c)
      )
        if (
          ((c = s.createElement("meta")).setAttribute("name", "viewport"),
          c.setAttribute(
            "content",
            "initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          ),
          r.firstElementChild)
        )
          r.firstElementChild.appendChild(c);
        else {
          var d = s.createElement("div");
          d.appendChild(c), s.write(d.innerHTML);
        }
      function f() {
        let t = e.screen.availWidth || 375,
          n = e.screen.availHeight || 667;
        a = t > n;
        var l = navigator.userAgent,
          s = /(?:Android)/.test(l),
          r = /(?:Firefox)/.test(l),
          c =
            /Macintosh/i.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1;
        i =
          /(?:iPad|PlayBook)/.test(l) ||
          (s && !/(?:Mobile)/.test(l)) ||
          (r && /(?:Tablet)/.test(l)) ||
          c;
        var d = Math.min(t, n);
        (t =
          d <= 320
            ? 320
            : d > 320 && d <= 414
            ? d
            : d > 414 && d < 1024
            ? 420
            : 450),
          (o = t / 10 + "px");
      }
      f();
      (n.getIsHorizontal = () => a),
        (n.getIsTablet = () => i),
        (n.getFontSize = () => o);
    })(window);
  class n {
    constructor(e, t, n) {
      (this.x = e || 0), (this.y = t || 0), (this.z = n || 0);
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(e) {
      return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    multiplyScalar(e) {
      return (this.x *= e), (this.y *= e), (this.z *= e), this;
    }
    min(e) {
      return (
        (this.x = Math.min(this.x, e.x)),
        (this.y = Math.min(this.y, e.y)),
        (this.z = Math.min(this.z, e.z)),
        this
      );
    }
    max(e) {
      return (
        (this.x = Math.max(this.x, e.x)),
        (this.y = Math.max(this.y, e.y)),
        (this.z = Math.max(this.z, e.z)),
        this
      );
    }
    add(e) {
      return (this.x += e.x), (this.y += e.y), (this.z += e.z), this;
    }
    sub(e) {
      return (this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    distanceTo(e) {
      return Math.sqrt(this.distanceToSquared(e));
    }
    addScalar(e) {
      return (this.x += e), (this.y += e), (this.z += e), this;
    }
    distanceToSquared(e) {
      var t = this.x - e.x,
        n = this.y - e.y,
        a = this.z - e.z;
      return t * t + n * n + a * a;
    }
    subVectors(e, t) {
      return (
        (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this
      );
    }
  }
  class a {
    constructor(e, t) {
      (this.min = e || new n(1 / 0, 1 / 0, 1 / 0)),
        (this.max = t || new n(-1 / 0, -1 / 0, -1 / 0));
    }
    getSize() {
      return new n(
        this.max.x - this.min.x,
        this.max.y - this.min.y,
        this.max.z - this.min.z
      );
    }
    setFromCenterAndSize(e, t) {
      let a = new n(t.x, t.y).multiplyScalar(0.5);
      return this.min.copy(e).sub(a), this.max.copy(e).add(a), this;
    }
    getCenter() {
      return new n(
        this.min.x + this.max.x,
        this.min.y + this.max.y,
        this.min.z + this.max.z
      ).multiplyScalar(0.5);
    }
    intersectsBox(e) {
      return !(
        e.max.x < this.min.x ||
        e.min.x > this.max.x ||
        e.max.y < this.min.y ||
        e.min.y > this.max.y ||
        e.max.z < this.min.z ||
        e.min.z > this.max.z
      );
    }
    union(e) {
      return this.min.min(e.min), this.max.max(e.max), this;
    }
    makeEmpty() {
      return (
        (this.min.x = this.min.y = this.min.z = 1 / 0),
        (this.max.x = this.max.y = this.max.z = -1 / 0),
        this
      );
    }
    expandByPoint(e) {
      return this.min.min(e), this.max.max(e), this;
    }
    setFromPoints(e) {
      this.makeEmpty();
      for (var t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
      return this;
    }
  }
  !(function () {
    let e = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Algorithm");
    e.MeanShift = class {
      constructor(e, t) {
        (this.points = e),
          (this.searchRangeSquared = t ** 2),
          (this.EPSILON_SQR = 0.1),
          (this.clusters = []);
      }
      setSearchRange(e) {
        this.searchRangeSquared = e ** 2;
      }
      setPoints(e) {
        this.points = e;
      }
      meanShift(e) {
        let t = e.clone(),
          n = [];
        for (;;) {
          let e = this.rangeSearch(t);
          n = this.connect(n, e);
          let a = this.mean(e);
          if (t.distanceToSquared(a) <= this.EPSILON_SQR) break;
          t = a;
        }
        return n;
      }
      mean(e) {
        let t = new n();
        for (const n of e) t.add(n);
        return t.multiplyScalar(1 / e.length), t;
      }
      rangeSearch(e) {
        let t = [];
        for (const n of this.points)
          e.distanceToSquared(n) <= this.searchRangeSquared && t.push(n);
        return t;
      }
      clustering(e, t) {
        0 === this.clusters.length
          ? this.clusteringPrepare()
          : this.clusteringAfter(e, t),
          this.clusters.forEach((e) => {
            this.resetPointStatus(e.points);
          });
      }
      clusteringPrepare() {
        for (const e of this.points) {
          if (e.stopMoving) continue;
          const t = this.meanShift(e),
            n = t.length,
            a = `${t[0].index}_${n}`;
          this.mergeClusters({
            points: t,
            center: this.mean(t),
            id: a,
            parent: null,
            children: [],
          });
        }
      }
      clusteringAfter(e, t) {
        (this.tmpPoints = this.points), (this.points = []);
        let n = [...this.clusters];
        if (((this.clusters = []), !1 !== e)) {
          for (let e = 0; e < n.length; e++) {
            const a = n[e];
            let i = [];
            t || this.resetClusterPoints(a.points),
              (this.points = a.points),
              this.clusteringZoomIn(a, i),
              this.clusters.push.apply(this.clusters, i);
          }
          this.clusters.forEach((e) => {
            this.resetPointStatus(e.points);
          });
        } else this.clusteringZoomOut(n, t);
      }
      clusteringZoomIn(e, t) {
        for (const n of e.points) {
          if (n.stopMoving) continue;
          const a = this.meanShift(n),
            i = a.length,
            o = `${a[0].index}_${i}`;
          this.mergeClustersInTarget(
            {
              points: a,
              center: this.mean(a),
              id: o,
              parent: e.id,
              children: [],
            },
            t
          );
        }
      }
      clusteringZoomOut(e, t) {
        for (let n = 0; n < e.length; n++) {
          const a = e[n];
          t || this.resetClusterPoints(a.points),
            (a.center = this.mean(a.points)),
            this.updateClusterBbox(a),
            (a.children = []),
            (a.parent = null),
            (a.isMerged = !1);
        }
        for (let t = 0; t < e.length; t++) {
          const n = Object.assign({}, e[t]);
          if (!0 === n.isMerged) continue;
          let a = [n.id];
          for (let i = t + 1; i < e.length; i++) {
            const t = e[i];
            if (!0 === t.isMerged) continue;
            n.center.distanceToSquared(t.center) <=
              4 * this.searchRangeSquared &&
              ((t.isMerged = !0),
              (n.points = this.connect(n.points, t.points, !0)),
              a.push(t.id));
          }
          if (((n.isMerged = !0), a.length > 1)) {
            (n.center = this.mean(n.points)), this.updateClusterBbox(n);
            const e = n.points.length,
              t = `${n.points[0].index}_${e}`;
            (n.id = t), (n.children = a);
          }
          this.clusters.push(n);
        }
        this.clusters.forEach((e) => {
          delete e.isMerged, this.resetPointStatus(e.points);
        });
      }
      mergeClusters(e) {
        let t = !1;
        for (const n of this.clusters) {
          const a =
              e.center.distanceToSquared(n.center) <=
              4 * this.searchRangeSquared,
            i = n.parent == n.parent;
          if (a && i) {
            (n.points = this.connect(n.points, e.points, !0)),
              (n.center = this.mean(n.points)),
              this.updateClusterBbox(n);
            const a = n.points.length,
              i = `${n.points[0].index}_${a}`;
            (n.id = i), (n.children = []), (t = !0);
            break;
          }
        }
        !1 === t && (this.updateClusterBbox(e), this.clusters.push(e));
      }
      mergeClustersInTarget(e, t) {
        let n = !1;
        for (const a of t) {
          if (
            e.center.distanceToSquared(a.center) <=
            4 * this.searchRangeSquared
          ) {
            (a.points = this.connect(a.points, e.points, !0)),
              (a.center = this.mean(a.points)),
              this.updateClusterBbox(a);
            const t = a.points.length,
              i = `${a.points[0].index}_${t}`;
            (a.id = i), (a.children = []), (n = !0);
            break;
          }
        }
        !1 === n && (this.updateClusterBbox(e), t.push(e));
      }
      removeNodeFromParents(e, t) {
        let n = t.indexOf(e);
        n >= 0 && t.splice(n, 1);
      }
      updateClusterBbox(e) {
        let t = new a().setFromPoints(e.points);
        e.bbox = t;
      }
      connect(e, t, n) {
        let a = [...e];
        for (const e of t)
          (e.stopMoving && !n) || a.push(e), (e.stopMoving = !0);
        return a;
      }
      resetPointStatus(e) {
        for (const t of e) t.stopMoving = !1;
      }
      resetClusterPoints(e) {
        for (let t = 0; t < e.length; t++)
          for (let n = 0; n < this.tmpPoints.length; n++)
            if (e[t].index === this.tmpPoints[n].index) {
              e[t] = this.tmpPoints[n];
              break;
            }
      }
    };
  })();
  class i {
    constructor(e, t) {
      (this.x = e || 0), (this.y = t || 0);
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(e) {
      return (this.x = e.x), (this.y = e.y), this;
    }
    multiplyScalar(e) {
      return (this.x *= e), (this.y *= e), this;
    }
    normalize() {
      return this.multiplyScalar(1 / this.length());
    }
    min(e) {
      return (
        (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this
      );
    }
    max(e) {
      return (
        (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this
      );
    }
    add(e) {
      return (this.x += e.x), (this.y += e.y), this;
    }
    sub(e) {
      return (this.x -= e.x), (this.y -= e.y), this;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    addScalar(e) {
      return (this.x += e), (this.y += e), this;
    }
    rotateAround(e, t) {
      var n = Math.cos(t),
        a = Math.sin(t),
        i = this.x - e.x,
        o = this.y - e.y;
      return (
        (this.x = i * n - o * a + e.x), (this.y = i * a + o * n + e.y), this
      );
    }
    setLength(e) {
      return this.multiplyScalar(e / this.length());
    }
    angle() {
      var e = Math.atan2(this.y, this.x);
      return e < 0 && (e += 2 * Math.PI), e;
    }
    distanceToSquared(e) {
      var t = this.x - e.x,
        n = this.y - e.y;
      return t * t + n * n;
    }
    distanceTo(e) {
      return Math.sqrt(this.distanceToSquared(e));
    }
  }
  class o {
    constructor(e, t) {
      (this.min = e || new i(1 / 0, 1 / 0)),
        (this.max = t || new i(-1 / 0, -1 / 0));
    }
    getSize() {
      return new i(this.max.x - this.min.x, this.max.y - this.min.y);
    }
    setFromCenterAndSize(e, t) {
      let n = new i(t.x, t.y).multiplyScalar(0.5);
      return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
    }
    getCenter() {
      return new i(
        this.min.x + this.max.x,
        this.min.y + this.max.y
      ).multiplyScalar(0.5);
    }
    intersectsBox(e) {
      return !(
        e.max.x < this.min.x ||
        e.min.x > this.max.x ||
        e.max.y < this.min.y ||
        e.min.y > this.max.y
      );
    }
    union(e) {
      return this.min.min(e.min), this.max.max(e.max), this;
    }
    expandByPoint(e) {
      return this.min.min(e), this.max.max(e), this;
    }
  }
  !(function () {
    let e = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Algorithm");
    class n {
      constructor() {}
    }
    (n.toThreeJsBox2 = function (e, t = 0) {
      let n = [];
      for (const a of e) {
        let e = Math.min(t, 100) / 100,
          l = Math.max(a[1][1] - a[0][1], a[1][0] - a[0][0]) * e,
          s = new i(a[0][0], a[0][1]),
          r = new i(a[1][0], a[1][1]),
          c = new o(s, r),
          d = c.getSize();
        n.push(new o().setFromCenterAndSize(c.getCenter(), d.addScalar(2 * l)));
      }
      let a = 0;
      for (const e of n) e.indices = [a++];
      return n;
    }),
      (n.toDrawingBox2 = function (e) {
        let t = [];
        for (const n of e) {
          let e = [];
          e.push([n.min.x, n.min.y]), e.push([n.max.x, n.max.y]), t.push(e);
        }
        return t;
      }),
      (n.merge = function (e, t) {
        let n = e.length;
        for (let a = 0; a <= n; a++) {
          if (a === n) {
            e.push(t);
            break;
          }
          let i = e[a];
          if (i.intersectsBox(t)) {
            i.union(t), (i.indices = i.indices.concat(t.indices));
            break;
          }
        }
      }),
      (n.mergeBoundingBox = function (e) {
        let t = e,
          a = [];
        for (;;) {
          for (let e = 0; e < t.length; e++) n.merge(a, t[e]);
          if (a.length === t.length) break;
          (t = a.slice(0, a.length)), (a = []);
        }
        return a;
      }),
      (e.BoundingBoxUtil = n);
  })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.Type"
    ).inheritPrototype = function (e, t) {
      var n = (function (e) {
        function t() {}
        return (t.prototype = e), new t();
      })(t.prototype);
      (n.constructor = e), (e.prototype = n);
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.HttpRequest"
        ),
        n = {},
        a = function (e, t) {
          var n = Object.assign(
            {
              type: "get",
              cache: !0,
              headers: { "Content-type": "application/x-www-form-urlencoded" },
              data: null,
              async: !0,
              success: null,
              failure: null,
            },
            e
          );
          const a = (e) => {
              n.success && n.success(e.responseText, e.responseXML);
            },
            i = (e) => {
              n.failure && n.failure(e);
            },
            o = (e, t) => {
              var a;
              ((a = window.XMLHttpRequest
                ? new XMLHttpRequest()
                : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange =
                function () {
                  if (4 == a.readyState) {
                    var n = a.status;
                    if (
                      (n >= 200 && n < 300) ||
                      304 == n ||
                      (0 === n && "file:" === window.location.protocol)
                    ) {
                      let { responseText: t, responseXML: n } = a;
                      e({ responseText: t, responseXML: n });
                    } else t(n);
                  }
                }),
                a.open(n.type, n.url, n.async);
              for (let e in n.headers) a.setRequestHeader(e, n.headers[e]);
              a.send(n.data);
            };
          t
            ? CLOUD.Storage.IndexedDBHelper.loadWithStorage(
                "InfoData",
                n.url,
                () => new Promise(o),
                a,
                i
              )
            : o(a, i);
        },
        i = function (e, t, a) {
          if (void 0 === n[e]) {
            let i = document.createElement("script");
            (i.type = "text/javascript"),
              (i.src = e),
              document.head.appendChild(i),
              (n[e] = { callbacks: [], failCallbacks: [] }),
              n[e].callbacks.push(t),
              n[e].failCallbacks.push(a),
              i.readyState
                ? (i.onreadystatechange = function () {
                    "loaded" == i.readyState || "complete" == i.readyState
                      ? ((i.onreadystatechange = null),
                        n[e].callbacks.map((e) => {
                          e && e();
                        }),
                        (n[e] = !0))
                      : "uninitialized" == i.readyState &&
                        ((i.onreadystatechange = null),
                        n[e].failCallbacks.map((e) => {
                          e && e();
                        }),
                        (n[e] = !1));
                  })
                : ((i.onload = function () {
                    n[e].callbacks.map((e) => {
                      e && e();
                    }),
                      (n[e] = !0);
                  }),
                  (i.onerror = function () {
                    n[e].failCallbacks.map((e) => {
                      e && e();
                    }),
                      (n[e] = !1);
                  }));
          } else
            !0 === n[e]
              ? t && t()
              : !1 === n[e]
              ? a && a()
              : (n[e].callbacks.push(t), n[e].failCallbacks.push(a));
        },
        o = function (e, t, n) {
          let i;
          return (
            (i = "string" == typeof e ? { url: e, status: t } : e),
            new Promise(function (e, o) {
              a(
                Object.assign({}, i, {
                  success: function (n) {
                    try {
                      var a = JSON.parse(n);
                    } catch (t) {
                      return e(n);
                    }
                    "success" == a.code ||
                    "noCode" == i.status ||
                    "bimfaceservice-0000" == a.code
                      ? e("noCode" == t ? a : a.data)
                      : o(
                          `requestError，dataCode:${a.code}, dataMessage:${a.message}`
                        );
                  },
                  failure: (e) => {
                    o(e);
                  },
                }),
                n
              );
            })
          );
        },
        l = {
          singleModel: "fileId",
          integrateModel: "integrateId",
          compareModel: "compareId",
        };
      (e.ajax = a),
        (e.promiseJSONRequest = o),
        (e.getScript = i),
        (e.getScripts = function (e, t) {
          e.length <= 1
            ? i(e.shift(), t)
            : Promise.all(
                e.map(
                  (e) =>
                    new Promise((t, n) => {
                      i(e, () => {
                        t();
                      });
                    })
                )
              ).then(() => {
                t && t();
              });
        }),
        (e.promiseJsonFunction = function (e) {
          if ("Fast" === (e.loadMode || "Fast"))
            return o(e.url, e.status, e.enableStorage);
          {
            let {
              APIHost: t,
              path: n,
              fileId: a,
              viewToken: i,
              modelType: s,
            } = e;
            return o(
              `${t}/data/v1/databag/resource-stream?${
                l[s] || "fileId"
              }=${a}&view_token=${i}&path=${n}`,
              e.status,
              e.enableStorage
            );
          }
        }),
        (e.getUrl = function (e) {
          if ("Strict" == (e.loadMode || "Fast")) {
            let {
              APIHost: t,
              path: n,
              fileId: a,
              viewToken: i,
              modelType: o,
              workerType: s,
            } = e;
            return `${t}/data/v1/databag/resource-stream?${
              s ? "workerType=" + s + "&" : ""
            }${l[o] || "fileId"}=${a}&view_token=${i}&path=${n}`;
          }
          return e.url;
        });
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.FullScreen"
      );
      (e.fullScreen = function (e) {
        if (!e) return !1;
        e.requestFullscreen
          ? e.requestFullscreen()
          : e.mozRequestFullScreen
          ? e.mozRequestFullScreen()
          : e.webkitRequestFullScreen
          ? e.webkitRequestFullScreen()
          : e.msRequestFullscreen && e.msRequestFullscreen();
      }),
        (e.exitFullScreen = function () {
          document.exitFullscreen
            ? document.exitFullscreen()
            : document.mozCancelFullScreen
            ? document.mozCancelFullScreen()
            : document.webkitCancelFullScreen
            ? document.webkitCancelFullScreen()
            : document.msExitFullscreen && document.msExitFullscreen();
        }),
        (e.onFullScreenChanged = function (e) {
          var t = function () {
            e && e();
          };
          (document.onfullscreenchange = t),
            "onwebkitfullscreenchange" in document
              ? (document.onwebkitfullscreenchange = t)
              : (document.documentElement.onwebkitfullscreenchange = t),
            (document.onmozfullscreenchange = t),
            (document.onmsfullscreenchange = t);
        }),
        (e.isFullScreen = function () {
          return (
            document.webkitIsFullScreen ||
            !!document.mozFullScreenElement ||
            !!document.msFullScreenElement ||
            !1
          );
        });
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.ClientHelper"
        ),
        n = null;
      if (e.getIsDesktop) return;
      var a = function (e, t, n) {
        n = n || "asc";
        var a = !1;
        return (
          t ? t.indexOf(".") > -1 && (a = !0) : (t = "name"),
          (e = e.sort(function (e, i) {
            if (a) {
              var o = l(e, t),
                s = l(i, t);
              return "asc" == n ? o.localeCompare(s) : s.localeCompare(o);
            }
            return "asc" == n
              ? e[t].localeCompare(i[t])
              : i[t].localeCompare(e[t]);
          })),
          o(e, t, a)
        );
      };
      var i = function (e, t) {
          return function (n, a) {
            var i, o;
            t ? ((i = l(n, e)), (o = l(a, e))) : ((i = n[e]), (o = a[e]));
            var s,
              r,
              c = 1,
              d = 0,
              f = 0,
              m = String.alphabet;
            function p(e, t, n) {
              if (n) {
                for (s = t; (n = p(e, s)) < 76 && n > 65; ) ++s;
                return +e.slice(t - 1, s);
              }
              return (n = m && m.indexOf(e.charAt(t))) > -1
                ? n + 76
                : (n = e.charCodeAt(t) || 0) < 45 || n > 127
                ? n
                : n < 46
                ? 65
                : n < 48
                ? n - 1
                : n < 58
                ? n + 18
                : n < 65
                ? n - 11
                : n < 91
                ? n + 11
                : n < 97
                ? n - 37
                : n < 123
                ? n + 5
                : n - 63;
            }
            if ((i += "") != (o += ""))
              for (; c; )
                if (
                  ((r = p(i, d++)),
                  (c = p(o, f++)),
                  r < 76 &&
                    c < 76 &&
                    r > 66 &&
                    c > 66 &&
                    ((r = p(i, d, d)), (c = p(o, f, (d = s))), (f = s)),
                  r != c)
                )
                  return r < c ? -1 : 1;
            return 0;
          };
        },
        o = function (e, t, n) {
          let a = [],
            i = [],
            o = [],
            s = [];
          return (
            e.map(function (e, r) {
              var c;
              (c = n ? l(e, t) : e[t]),
                /^[a-zA-Z]*$/.test(c.slice(0, 1))
                  ? a.push(e)
                  : /^[\u4e00-\u9fa5]*$/.test(c.slice(0, 1))
                  ? i.push(e)
                  : /^\d+(\.\d+)?$/.test(c.slice(0, 1))
                  ? o.push(e)
                  : s.push(e);
            }),
            s.concat(o, a, i)
          );
        },
        l = function (e, t) {
          var n = t.split("."),
            a = e;
          return (
            n.map(function (e, t) {
              a = a[e];
            }),
            a
          );
        };
      (e.getIsDesktop = function () {
        if ("Mobile" === n) return !1;
        if ("Web" === n) return !0;
        var e = navigator.userAgent,
          t = /(?:Windows Phone)/.test(e),
          a = /(?:SymbianOS)/.test(e) || t,
          i = /(?:Android)/.test(e),
          o = /(?:Firefox)/.test(e),
          l =
            (/(?:Chrome|CriOS)/.test(e),
            /(?:iPad|PlayBook)/.test(e) ||
              (i && !/(?:Mobile)/.test(e)) ||
              (o && /(?:Tablet)/.test(e))),
          s =
            /Macintosh/i.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1;
        return !((/(?:iPhone)/.test(e) && !l) || i || a || l || s);
      }),
        (e.getIsMac = () => /macintosh|mac os x/i.test(navigator.userAgent)),
        (e.getIsChrome = () => /(?:Chrome|CriOS)/.test(navigator.userAgent)),
        (e.setNavigatorType = function (e) {
          n = e;
        }),
        (e.getIsIphone = function () {
          var e = navigator.userAgent;
          return /(?:iPhone)/.test(e);
        }),
        (e.getIsTablet = function () {
          var e = navigator.userAgent,
            t = /(?:Android)/.test(e),
            n = /(?:Firefox)/.test(e),
            a =
              /Macintosh/i.test(navigator.userAgent) &&
              navigator.maxTouchPoints &&
              navigator.maxTouchPoints > 1;
          return (
            /(?:iPad|PlayBook)/.test(e) ||
            (t && !/(?:Mobile)/.test(e)) ||
            (n && /(?:Tablet)/.test(e)) ||
            a
          );
        }),
        (e.getDeviceType = function () {
          var e = navigator.userAgent,
            t = /(?:Windows Phone)/.test(e),
            n = /(?:SymbianOS)/.test(e) || t,
            a = /(?:Android)/.test(e),
            i = /(?:Firefox)/.test(e),
            o =
              /(?:iPad|PlayBook)/.test(e) ||
              (a && !/(?:Mobile)/.test(e)) ||
              (i && /(?:Tablet)/.test(e)),
            l =
              /Macintosh/i.test(navigator.userAgent) &&
              navigator.maxTouchPoints &&
              navigator.maxTouchPoints > 1,
            s = /(?:iPhone)/.test(e) && !o;
          return o || l ? "PAD" : s || a || n ? "MOBILE" : "PC";
        }),
        (e.getBrowserType = function () {
          var e = navigator.userAgent,
            t = "";
          return (
            e.indexOf("Opera") > -1 || e.indexOf("OPR") > -1
              ? (t = "Opera")
              : (e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1) ||
                window.ActiveXObject ||
                "ActiveXObject" in window
              ? (t = "IE")
              : e.indexOf("Edge") > -1
              ? (t = "Edge")
              : e.indexOf("Firefox") > -1
              ? (t = "Firefox")
              : e.indexOf("Safari") > -1 && -1 == e.indexOf("Chrome")
              ? (t = "Safari")
              : e.indexOf("Safari") > -1 &&
                e.indexOf("Chrome") > -1 &&
                (t = "Chrome"),
            t
          );
        }),
        (e.getBrowserVersion = function () {
          var e,
            t = {},
            n = navigator.userAgent.toLowerCase();
          return (
            (e = n.match(/rv:([\d.]+)\) like gecko/)) ||
            (e = n.match(/msie ([\d\.]+)/))
              ? (t.ie = e[1])
              : (e = n.match(/edge\/([\d\.]+)/))
              ? (t.edge = e[1])
              : (e = n.match(/firefox\/([\d\.]+)/))
              ? (t.firefox = e[1])
              : (e = n.match(/(?:opera|opr).([\d\.]+)/))
              ? (t.opera = e[1])
              : (e = n.match(/chrome\/([\d\.]+)/))
              ? (t.chrome = e[1])
              : (e = n.match(/version\/([\d\.]+).*safari/)) &&
                (t.safari = e[1]),
            t.ie
              ? t.ie
              : t.edge
              ? t.edge
              : t.firefox
              ? t.firefox
              : t.chrome
              ? t.chrome
              : t.opera
              ? t.opera
              : t.safari
              ? t.safari
              : "Unkonwn"
          );
        }),
        (e.formatTime = (e = "", t = new Date().getTime()) => {
          let n, a, i;
          (e = e || "YYYY-mm-dd HH:MM:SS"),
            (a =
              10 == t.toString().length
                ? new Date(1e3 * parseInt(t))
                : new Date(parseInt(t)));
          const o = {
            Y: a.getFullYear().toString(),
            m: (a.getMonth() + 1).toString(),
            d: a.getDate().toString(),
            H: a.getHours().toString(),
            M: a.getMinutes().toString(),
            S: a.getSeconds().toString(),
          };
          for (var l in o)
            (n = new RegExp("(" + l + "+)").exec(e)),
              n &&
                ((i =
                  1 == n[1].length ? o[l] : o[l].padStart(n[1].length, "0")),
                (e = e.replace(n[1], i)));
          return e;
        }),
        (e.getDesktopType = function () {
          var e = navigator.userAgent.toLowerCase(),
            t = "",
            n = "";
          return (
            e.indexOf("win") > -1
              ? ((t = "Windows"),
                e.indexOf("windows nt 5.0") > -1
                  ? (t = "Windows 2000")
                  : e.indexOf("windows nt 5.1") > -1 ||
                    e.indexOf("windows nt 5.2") > -1
                  ? (t = "Windows XP")
                  : e.indexOf("windows nt 6.0") > -1
                  ? (t = "Windows Vista")
                  : e.indexOf("windows nt 6.1") > -1 ||
                    e.indexOf("windows 7") > -1
                  ? (t = "Windows 7")
                  : e.indexOf("windows nt 6.2") > -1 ||
                    e.indexOf("windows 8") > -1
                  ? (t = "Windows 8")
                  : e.indexOf("windows nt 6.3") > -1
                  ? (t = "Windows 8.1")
                  : (e.indexOf("windows nt 6.2") > -1 ||
                      e.indexOf("windows nt 10.0") > -1) &&
                    (t = "Windows 10"),
                e.indexOf("win64") > -1
                  ? (n = "win64")
                  : e.indexOf("win32") > -1 && (n = "win32"))
              : e.indexOf("mac") > -1
              ? (t = "Mac")
              : e.indexOf("x11") > -1 ||
                e.indexOf("unix") > -1 ||
                e.indexOf("sunname") > -1 ||
                e.indexOf("bsd") > -1
              ? (t = "Unix")
              : e.indexOf("linux") > -1 && (t = "Linux"),
            { name: t, type: n }
          );
        }),
        (e.getIsIE = function () {
          return !(!window.ActiveXObject && !("ActiveXObject" in window));
        }),
        (e.formatURL = function (e) {
          var t = function (e) {
            return e
              .replace("viewToken.json", "")
              .replace(/\.\//g, "/")
              .replace(/\/\//g, "/");
          };
          if (e.indexOf("://") > -1) {
            var n = e.split("://");
            e = n[0] + "://" + t(n[1]);
          } else
            e =
              "//" === e.slice(0, 2)
                ? "//" + t(e.slice(2))
                : "./" != e.slice(0, 2)
                ? t(e)
                : "." + t(e.slice(1));
          return e;
        }),
        (e.sortByName = a),
        (e.sortByRules = function (e, t, n) {
          n = n || "asc";
          var a = !1;
          return (
            t ? t.indexOf(".") > -1 && (a = !0) : (t = "name"),
            (e = e.sort(i(t, a))),
            o(e, t, a)
          );
        }),
        (e.PointToLineDistance = function (e, t, n, a, i, o) {
          let l,
            s,
            r,
            c,
            d = 0;
          const f = Math.sqrt((n - e) * (n - e) + (a - t) * (a - t));
          if (0 === f) return [0, { x: n, y: a }];
          const m = Math.sqrt((i - e) * (i - e) + (o - t) * (o - t));
          if (0 === m) return [0, { x: i, y: o }];
          const p = Math.sqrt((n - i) * (n - i) + (a - o) * (a - o));
          if (0 === p) return (d = f), [d, { x: n, y: a }];
          if (f < m) {
            if (
              (a === o
                ? (l = n < i ? 0 : Math.PI)
                : ((c = (i - n) / p),
                  c - 1 > 1e-5 && (c = 1),
                  (l = Math.acos(c)),
                  a > o && (l = 2 * Math.PI - l)),
              (c = (e - n) / f),
              c - 1 > 1e-5 && (c = 1),
              (s = Math.acos(c)),
              a > t && (s = 2 * Math.PI - s),
              (r = s - l),
              r < 0 && (r = -r),
              r > Math.PI && (r = 2 * Math.PI - r),
              r > Math.PI / 2)
            )
              return [f, { x: n, y: a }];
            if (n === i) return [m * Math.sin(r), { x: n, y: t }];
            if (a === o) return [m * Math.sin(r), { x: e, y: a }];
            let d = 0,
              u = 0;
            const g = (o - a) / i - n,
              h = -1 / g,
              b = t - e * h;
            return (
              (d = (o - i * g - b) / (h - g)),
              (u = h * d + b),
              [f * Math.sin(r), { x: d, y: u }]
            );
          }
          if (
            (a === o
              ? (l = n < i ? Math.PI : 0)
              : ((c = (n - i) / p),
                c - 1 > 1e-5 && (c = 1),
                (l = Math.acos(c)),
                o > a && (l = 2 * Math.PI - l)),
            (c = (e - i) / m),
            c - 1 > 1e-5 && (c = 1),
            (s = Math.acos(c)),
            o > t && (s = 2 * Math.PI - s),
            (r = s - l),
            r < 0 && (r = -r),
            r > Math.PI && (r = 2 * Math.PI - r),
            r > Math.PI / 2)
          )
            return [m, { x: i, y: o }];
          if (n === i) return [m * Math.sin(r), { x: n, y: t }];
          if (a === o) return [m * Math.sin(r), { x: e, y: a }];
          let u = 0,
            g = 0;
          const h = (o - a) / i - n,
            b = -1 / h,
            v = t - e * b;
          return (
            (u = (o - i * h - v) / (b - h)),
            (g = b * u + v),
            [m * Math.sin(r), { x: u, y: g }]
          );
        }),
        (e.isWebGLAvailable = function () {
          try {
            var e = document.createElement("canvas");
            return !(
              !window.WebGLRenderingContext ||
              (!e.getContext("webgl") && !e.getContext("experimental-webgl"))
            );
          } catch (e) {
            return !1;
          }
        }),
        (e.isWebGL2Available = function () {
          try {
            var e = document.createElement("canvas");
            return !(!window.WebGL2RenderingContext || !e.getContext("webgl2"));
          } catch (e) {
            return !1;
          }
        }),
        (e.sortByGroupName = function (e, t, n, i) {
          let o = ((e, t) =>
              e.reduce(
                (e, n) => ({ ...e, [n[t]]: [...(e[n[t]] || []), n] }),
                {}
              ))(e, t),
            l = [];
          for (let e in o) l = [...l, ...a(o[e], n, i)];
          return l;
        });
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.MouseMotion"
    ).setCursor = function (e) {
      let n,
        a = !1,
        i = e.getDomElement(),
        o = !1,
        l = !1,
        s = !1,
        r = null;
      function c() {
        (a && "walk" == e.getViewer().getEditorManager().editor.name) ||
          (i.addClass("motion-zoom"),
          (n = Date.now()),
          setTimeout(() => {
            Date.now() - n > 180 && i.removeClass("motion-zoom");
          }, 200));
      }
      function d(e) {
        const t = e.keyCode || e.which || e.charCode;
        17 == t ? (o = !0) : 18 == t && (l = !0);
      }
      function f(e) {
        const t = e.keyCode || e.which || e.charCode;
        17 == t ? (o = !1) : 18 == t && (l = !1);
      }
      function m(t) {
        e._opt.enableZoomRect || o || l || (r = { x: t.clientX, y: t.clientY });
      }
      function p(t) {
        if (
          r &&
          !s &&
          !o &&
          !l &&
          !(Math.abs(r.x - t.clientX) < 2 && Math.abs(r.y - t.clientY) < 2)
        ) {
          if (a) {
            let n = e.getUseLeftHandedInput();
            if ("walk" == e.getViewer().getEditorManager().editor.name)
              1 == t.buttons && i.addClass("motion-rotate");
            else {
              let a = e._getIsCursorEnabled();
              1 == t.buttons
                ? a && i.addClass(n ? "motion-rotate" : "motion-translate")
                : i.addClass(n ? "motion-translate" : "motion-rotate");
            }
          } else 1 == t.buttons && i.addClass("motion-translate");
          s = !0;
        }
      }
      function u(e) {
        (r = !1),
          (s = !1),
          i.removeClass("motion-translate"),
          i.removeClass("motion-rotate");
      }
      return (
        t.Bimface.Viewer.Viewer3D && "Viewer3D" === e.viewerType && (a = !0),
        document.addEventListener("keydown", d),
        document.addEventListener("keyup", f),
        i.addEventListener("mousedown", m),
        i.addEventListener("mousemove", p),
        i.addEventListener("mousewheel", c, !1),
        i.addEventListener("DOMMouseScroll", c, !1),
        i.addEventListener("mouseup", u),
        function () {
          i.removeEventListener("mousemove", p),
            i.removeEventListener("mousewheel", c),
            i.removeEventListener("DOMMouseScroll", c),
            i.removeEventListener("mousedown", m),
            i.removeEventListener("mouseup", u),
            document.removeEventListener("keydown", d),
            document.removeEventListener("keyup", f);
        }
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.Dom"
    ).create = function (e, t) {
      var n = document.createElement(e);
      return n.setAttribute("class", t), n;
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.Dom"
    ).createNS = function (e, t) {
      var n = document.createElementNS("http://www.w3.org/2000/svg", e);
      return n.setAttribute("class", t), n;
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.Dom"
    ).select = function (e) {
      return e.indexOf("#") > -1
        ? document.getElementById(e.replace("#", "")) || []
        : e.indexOf(".") > -1
        ? document.getElementsByClassName(e.replace(".", ""))
        : document.getElementsByTagName(e);
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.Dom"
    ).drag = function (e) {
      let n = t.Web.Lang.Utility.ClientHelper.getIsDesktop(),
        a = Object.assign(
          {
            element: null,
            handle: null,
            axis: "all",
            cursor: "move",
            distance: 0,
            start: null,
            move: null,
            stop: null,
            bBoxDetection: !1,
          },
          e
        ),
        i = a.element;
      if (!i) return !1;
      let o,
        l = a.handle || i,
        s = !1,
        r = this;
      this.resize = function (e, t, n) {
        t = t || { x: 0, y: 0 };
        let i = e.getBoundingClientRect(),
          o = e.parentElement.getBoundingClientRect(),
          l = i.left - o.left,
          s = i.top - o.top;
        var r = e.offsetWidth,
          c = e.offsetHeight,
          d = e.parentElement.offsetWidth,
          f = e.parentElement.offsetHeight,
          m = Math.min(l + t.x, d - r),
          p = Math.min(s + t.y, f - c),
          u = l + t.x < 0 ? 0 : (m > 0 && m) || 0,
          g = s + t.y < 0 ? 0 : (p > 0 && p) || 0;
        (n && 0 != u && 0 != g) ||
          ((e.style.left = `${u}px`),
          (e.style.top = `${g}px`),
          (e.style.transform = "none"),
          a.record && a.record(u, g));
      };
      let c = function (e) {
          var t,
            i,
            s = e;
          if (n) {
            if (
              ((t = s.button),
              !((i = navigator.userAgent).indexOf("compatible") > -1 &&
              i.indexOf("MSIE") > -1 &&
              !isOpera
                ? 1 == t
                : 0 == t))
            )
              return;
            (o = { x: s.clientX, y: s.clientY }),
              document.addEventListener("mousemove", d);
          } else
            (o = { x: s.touches[0].clientX, y: s.touches[0].clientY }),
              l.addEventListener("touchmove", d);
          a.start && a.start(o);
        },
        d = function (e) {
          var t = e;
          if (n) var l = { x: t.clientX, y: t.clientY };
          else l = { x: t.touches[0].clientX, y: t.touches[0].clientY };
          var c = { x: l.x - o.x, y: l.y - o.y };
          s
            ? (a.move && a.move(o, l, c),
              (o = l),
              (function (e) {
                let t = i.getBoundingClientRect(),
                  n = i.parentElement.getBoundingClientRect(),
                  o = t.left - n.left,
                  l = t.top - n.top;
                if (a.bBoxDetection) r.resize(i, e);
                else {
                  let t = o + e.x,
                    n = l + e.y;
                  switch (a.axis) {
                    case "x":
                      i.style.left = `${t}px`;
                      break;
                    case "y":
                      i.style.top = `${n}px`;
                      break;
                    default:
                      (i.style.left = `${t}px`), (i.style.top = `${n}px`);
                  }
                }
              })(c))
            : (s = (function (e) {
                return (
                  Math.pow(e.x, 2) + Math.pow(e.y, 2) >
                    Math.pow(a.distance, 2) && (a.start && a.start(o), !0)
                );
              })(c)),
            e.preventDefault(),
            e.stopPropagation();
        },
        f = function () {
          s && a.end && a.end(o),
            (s = !1),
            document.removeEventListener("mousemove", d),
            l.removeEventListener("touchmove", d);
        };
      n
        ? ((l.style.cursor = a.cursor),
          (l.style.userSelect = "none"),
          l.addEventListener("mousedown", c),
          document.addEventListener("mouseup", f))
        : (l.addEventListener("touchend", f),
          l.addEventListener("touchstart", c));
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      e.sizable = function (t) {
        let n = Object.assign(
            {
              element: null,
              axis: "all",
              minWidth: 100,
              minHeight: 100,
              distance: 0,
              start: null,
              sizable: null,
              stop: null,
            },
            t
          ),
          a = n.element;
        if (!a) return !1;
        let i,
          o = !1,
          l = e.create("div", "bf-resize");
        var s, r;
        let c = function (e) {
            (s = a.clientWidth), (r = a.clientHeight);
            var t,
              n,
              o = e;
            ((t = o.button),
            (n = navigator.userAgent).indexOf("compatible") > -1 &&
            n.indexOf("MSIE") > -1 &&
            !isOpera
              ? 1 == t
              : 0 == t) &&
              ((i = { x: o.clientX, y: o.clientY }),
              document.addEventListener("mousemove", d),
              document.addEventListener("touchmove", d));
          },
          d = function (e) {
            var t = e,
              l = { x: t.clientX, y: t.clientY },
              c = { x: l.x - i.x, y: l.y - i.y };
            o
              ? (n.sizable && n.sizable(i, l, c),
                (function (e) {
                  var t = a.offsetLeft,
                    i = a.offsetTop,
                    o = s + e.x < n.minWidth ? n.minWidth : s + e.x,
                    l = r + e.y < n.minHeight ? n.minHeight : r + e.y;
                  switch (
                    (n.resize && n.resize(o, l),
                    (a.style.left = `${t}px`),
                    (a.style.top = `${i}px`),
                    n.axis)
                  ) {
                    case "x":
                      a.style.width = `${o}px`;
                      break;
                    case "y":
                      a.style.height = `${l}px`;
                      break;
                    default:
                      (a.style.width = `${o}px`), (a.style.height = `${l}px`);
                  }
                })(c))
              : (o = (function (e) {
                  return (
                    Math.pow(e.x, 2) + Math.pow(e.y, 2) >
                      Math.pow(n.distance, 2) && (n.start && n.start(i), !0)
                  );
                })(c));
          },
          f = function () {
            o && n.end && n.end(i),
              (o = !1),
              document.removeEventListener("mousemove", d),
              document.removeEventListener("touchmove", d);
          };
        a.addClass("bf-sizable"),
          a.appendChild(l),
          l.addEventListener("mousedown", c),
          l.addEventListener("touchstart", c),
          document.addEventListener("mouseup", f),
          document.addEventListener("touchend", f);
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        n = function (t) {
          let n = this,
            a = Object.assign(
              {
                element: null,
                min: 0,
                max: 100,
                cur: 50,
                step: 1,
                isShowProgress: !0,
                input: null,
                change: null,
                currentColor: "#11dab7",
                defaultColor: "#999",
              },
              t
            );
          this._opt = a;
          let i = e.create("div", "bf-range"),
            o = e.create("input", "bf-input-range");
          (n.input = o),
            o.setAttribute("type", "range"),
            o.setAttribute("step", a.step),
            o.setAttribute("min", a.min),
            o.setAttribute("max", a.max),
            o.setAttribute("value", a.cur);
          let l = e.create("span", "bf-range-min");
          l.innerText = a.min;
          let s = e.create("span", "bf-range-cur");
          (n.cur = s), (s.innerText = a.cur);
          let r = e.create("span", "bf-range-max");
          r.innerText = a.max;
          let c = e.create("span", "bf-range-progress");
          i.appendChild(o),
            a.isShowProgress &&
              (i.appendChild(l), i.appendChild(s), i.appendChild(r)),
            i.appendChild(c),
            a.element.appendChild(i),
            n.setProgress(a.cur),
            o.addEventListener("input", function () {
              n.setProgress(this.value), a.input && a.input(this.value);
            }),
            o.addEventListener("change", function () {
              n.setProgress(this.value), a.change && a.change(this.value);
            });
        };
      (n.prototype.setProgress = function (e) {
        var t = this._opt,
          n = t.max - t.min,
          a = this.input,
          i = this.cur,
          o = ((e - t.min) / n) * 100;
        (a.value = e),
          (a.style.background = `linear-gradient(to right,${t.currentColor} 0%,${t.currentColor}  ${o}%,${t.defaultColor} ${o}%, ${t.defaultColor} 100%)`),
          (i.innerText = e);
      }),
        (n.prototype.reset = function () {
          this.setProgress(this._opt.cur);
        }),
        (e.range = n);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        n = function (e) {
          (this._opt = Object.assign(
            {
              element: null,
              min: 0,
              max: 100,
              from: null,
              to: null,
              step: 1,
              currentColor: "#11dab7",
              defaultColor: "#999",
              change: null,
              callback: null,
            },
            e
          )),
            (this._opt.from = this._opt.from || this._opt.min),
            (this._opt.to = this._opt.to || this._opt.max),
            this.init();
        };
      (n.prototype = {
        init: function () {
          var t = e.create("div", "bf-multiple-range"),
            n = e.create("div", "bf-range-track"),
            a = e.create("span", "bf-slider bf-slider-min");
          (a.id = "minSlider"), (a.type = "minimum");
          var i = e.create("span", "bf-slider bf-slider-max");
          (i.id = "maxSlider"),
            (i.type = "maximum"),
            (this._state = { from: this._opt.from, to: this._opt.to }),
            (n.style.backgroundColor = this._opt.currentColor),
            (t.style.backgroundColor = this._opt.defaultColor),
            t.appendChild(n),
            t.appendChild(a),
            t.appendChild(i),
            this._opt.element.appendChild(t),
            (this._track = n),
            (this._sliders = { min: a, max: i }),
            (this._element = t),
            this.bindEvent(),
            this.update(!1);
        },
        bindEvent: function () {
          var e,
            t,
            n = this,
            a = !1,
            i = function (n) {
              n = n || event;
              (t = n.screenX), (e = this), (a = !0);
            };
          this._sliders.min.addEventListener("mousedown", i),
            this._sliders.max.addEventListener("mousedown", i),
            document.addEventListener("mousemove", function (i) {
              if (a) {
                var o = (i = i || event).screenX - t,
                  l = Math.round(o / n._pix / n._opt.step) * n._opt.step;
                0 != l &&
                  ((t = l * n._pix + t),
                  "minimum" == e.type
                    ? (n._state.from += l)
                    : (n._state.to += l),
                  n.recalculate(e),
                  n.update(!0));
              }
            }),
            document.addEventListener("mouseup", function () {
              a
                ? ((a = !1), (e = null), n._opt.callback && n._opt.callback())
                : ((e = null), (a = !1));
            });
        },
        update: function (e) {
          var t = this._sliders.min.offsetWidth,
            n = this._sliders.max.offsetWidth;
          if (!this._pix) {
            var a =
              (this._element.offsetWidth - t - n) /
              (this._opt.max - this._opt.min);
            this._pix = a;
          }
          var i = (this._state.from - this._opt.min) * this._pix,
            o = (this._state.to - this._opt.min) * this._pix + t + n;
          (this._track.style.left = `${i + t / 2}px`),
            (this._track.style.width = o - i - t / 2 - n / 2 + "px"),
            (this._sliders.min.style.left = `${i}px`),
            (this._sliders.max.style.left = `${o}px`),
            this._opt.change && e && this._opt.change(this._state);
        },
        recalculate: function (e) {
          this._state.to >= this._opt.max && (this._state.to = this._opt.max),
            this._state.from <= this._opt.min &&
              (this._state.from = this._opt.min),
            e &&
              ("maximum" == e.type &&
                this._state.to <= this._state.from &&
                (this._state.to = this._state.from),
              "minimum" == e.type &&
                this._state.from >= this._state.to &&
                (this._state.from = this._state.to));
        },
        getProgress: function () {
          return this._state;
        },
        setProgress: function (e) {
          (this._state = e), this.recalculate(), this.update(!1);
        },
      }),
        (e.multipleRange = n);
    })(),
    (HTMLElement.prototype.tap = function (e) {
      var t;
      this.addEventListener("touchstart", function (e) {
        t = Date.now();
      }),
        this.addEventListener("touchend", function (n) {
          Date.now() - t < 200 && e(n);
        });
    }),
    (window.ActiveXObject || "ActiveXObject" in window) &&
      ((HTMLElement.prototype.remove = function () {
        this.parentNode && this.parentNode.removeChild(this);
      }),
      window.Element &&
        ((e = Element.prototype).matches =
          e.matches ||
          e.matchesSelector ||
          e.webkitMatchesSelector ||
          e.msMatchesSelector ||
          function (e) {
            for (
              var t = this,
                n = (t.parentNode || t.document).querySelectorAll(e),
                a = -1;
              n[++a] && n[a] != t;

            );
            return !!n[a];
          }),
      window.Element &&
        (function (e) {
          e.closest =
            e.closest ||
            function (e) {
              for (var t = this; t.matches && !t.matches(e); ) t = t.parentNode;
              return t.matches ? t : null;
            };
        })(Element.prototype)),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.UUID"
    ).createUUID = function () {
      let e = [],
        t = "0123456789abcdef";
      for (let n = 0; n < 36; n++)
        e[n] = t.substr(Math.floor(16 * Math.random()), 1);
      return (
        (e[14] = "4"),
        (e[19] = t.substr((3 & e[19]) | 8, 1)),
        (e[8] = e[13] = e[18] = e[23] = "-"),
        e.join("")
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility"
    ).throttle = function (e, t) {
      let n = null,
        a = Date.now();
      return (
        null == t && (t = 30),
        function () {
          let i = Date.now(),
            o = t - (i - a);
          const l = this,
            s = arguments;
          clearTimeout(n),
            o <= 0 ? (e.apply(l, s), (a = Date.now())) : (n = setTimeout(e, o));
        }
      );
    });
  const l = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility");
  l.DataUtil = {
    assertType(e, t) {
      const n = (t) => Object.prototype.toString.call(e) === `[object ${t}]`;
      switch (t) {
        case "obj":
        case "Obj":
        case "object":
        case "Object":
          return n("Object");
        case "arr":
        case "Arr":
        case "array":
        case "Array":
          return n("Array");
        case "num":
        case "Num":
        case "number":
        case "Number":
          return n("Number");
        case "func":
        case "Func":
        case "function":
        case "Function":
          return n("Function");
        case "str":
        case "Str":
        case "string":
        case "String":
          return n("String");
        default:
          return n(t);
      }
    },
    assertParamsType(...e) {
      if (e.length > 1) {
        const [t] = e.splice(e.length - 1, 1);
        let n = !0;
        return e.every((e) => ((n = this.assertType(e, t)), n)), n;
      }
    },
    hasProperty(e, t) {
      return !!this.assertType(e, "obj") && e.hasOwnProperty(t);
    },
    hasProperties(e, ...t) {
      if (!t) return !1;
      let n = !0;
      return t.every((t) => (n = this.hasProperty(e, t))), n;
    },
    hasChildProperty(e, ...t) {
      if (!t || 0 === t.length) return !1;
      let n = e;
      for (let e = 0; e < t.length; e++) {
        let a = t[e];
        if (!this.hasProperty(n, a)) return !1;
        n = n[a];
      }
      return !0;
    },
    getChildProperty(e, ...t) {
      if (this.hasChildProperty(e, ...t)) {
        let n = e;
        return t.forEach((e) => (n = n[e])), n;
      }
    },
    limitTransformationDecimal(e) {
      for (let t = 0; t < e.length; t++)
        t <= 11
          ? (e[t] = Number(e[t].toFixed(6)))
          : t > 11 && t <= 14 && (e[t] = Number(e[t].toFixed(3)));
      return e;
    },
  };
  var s = l.DataUtil;
  t.Web.Lang.Utility.Namespace.ensureNamespace(
    t,
    "Bimface.Utils"
  ).Transformation = {
    getTranslation(e) {
      const t = this._getDecompose(e);
      return { x: t.position.x, y: t.position.y, z: t.position.z };
    },
    getQuaternion(e) {
      const t = this._getDecompose(e);
      return {
        x: t.quaternion._x,
        y: t.quaternion._y,
        z: t.quaternion._z,
        w: t.quaternion._w,
      };
    },
    getScaling(e) {
      const t = this._getDecompose(e);
      return { x: t.scale.x, y: t.scale.y, z: t.scale.z };
    },
    quaternionToEulerAngles(e, t) {
      const n = new THREE.Euler(),
        a = new THREE.Quaternion(e.x, e.y, e.z, e.w),
        i = n.setFromQuaternion(a, t || "XYZ");
      return { x: i._x, y: i._y, z: i._z, order: i._order };
    },
    eulerAnglesToQuaternion(e) {
      const t = new THREE.Quaternion(),
        n = new THREE.Euler(e.x, e.y, e.z, e.order),
        a = t.setFromEuler(n);
      return { x: a._x, y: a._y, z: a._z, w: a._w };
    },
    _getDecompose(e) {
      const t = new THREE.Matrix4(),
        n = new THREE.Vector3(),
        a = new THREE.Quaternion(),
        i = new THREE.Vector3();
      return (
        t.fromArray(e),
        t.decompose(n, a, i),
        { position: n, quaternion: a, scale: i }
      );
    },
  };
  const r = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility");
  (r.performance = {
    throttleAndDebounce(e, t = 300) {
      let n = null,
        a = null;
      return function (...i) {
        a && (clearTimeout(a), (a = null)),
          (a = setTimeout(() => {
            clearTimeout(n), (n = null), e(...i);
          }, t)),
          n ||
            (n = setTimeout(() => {
              e(...i), clearTimeout(n), (n = null);
            }, t));
      };
    },
    throttle(e, t = 300) {
      let n = null;
      return function (...a) {
        n ||
          (n = setTimeout(() => {
            e(...a), clearTimeout(n), (n = null);
          }, t));
      };
    },
    debounce(e, t = 300) {
      let n = null;
      return function (...a) {
        n && (clearTimeout(n), (n = null)),
          (n = setTimeout(() => {
            e(...a);
          }, t));
      };
    },
  }),
    r.performance,
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang");
      let n = function () {
        this.container = {};
      };
      (n.prototype.addEvent = function (e, t, n) {
        return (
          "string" == typeof e &&
            "function" == typeof t &&
            (void 0 === this.container[e]
              ? (this.container[e] = [t])
              : !0 === n
              ? this.container[e].unshift(t)
              : this.container[e].push(t)),
          this
        );
      }),
        (n.prototype.fireEvent = function (e) {
          if (e && this.container[e]) {
            var t = Array.prototype.slice.call(arguments);
            t.shift();
            for (
              var n = [...this.container[e]], a = n.length, i = 0;
              i < a;
              i++
            ) {
              var o = n[i];
              if (!0 === o.apply(null, t)) return this;
            }
          }
          return this;
        }),
        (n.prototype.removeEvent = function (e, t) {
          if ("function" == typeof t && "string" == typeof e) {
            var n = this.container[e];
            if (n instanceof Array) {
              for (var a = 0, i = n.length; a < i; a += 1)
                if (n[a] === t) {
                  n.splice(a, 1);
                  break;
                }
              0 == n.length && delete this.container[e];
            }
            return this;
          }
        }),
        (e.EventManager = n);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Geometry"),
        n = function (e, t, n) {
          (this.x = e), (this.y = t), (this.z = n);
        };
      (n.prototype = {
        get: function () {
          return { x: this.x, y: this.y, z: this.z };
        },
        set: function (e, t, n) {
          (this.x = e), (this.y = t), (this.z = n);
        },
      }),
        (e.Point3d = n);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Geometry");
      e.BoundingBox = function (t, n) {
        var a = {},
          i = new e.Point3d(),
          o = new e.Point3d();
        return (
          i.set(t.x, t.y, t.z),
          o.set(n.x, n.y, n.z),
          (a.min = i),
          (a.max = o),
          a
        );
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Graphics.Utility"
    ).RGBToHex = function (e) {
      var t = e.toString(16);
      return 1 == t.length && (t = "0" + t), t;
    });
  var c,
    d,
    f,
    m,
    p,
    u = window.hostConfig || {
      APIHost: "https://api.bimface.com",
      resourceHost: "https://m.bimface.com",
      staticHost: "https://static.bimface.com",
      dataEnvType: "BIMFACE",
      securityApi: !0,
    };
  function g(e, t, n) {
    !e[t] && Object.defineProperty(e, t, { value: n, enumerable: !1 });
  }
  function h(e) {
    s.assertType(e, "obj") &&
      (Object.defineProperty(e, "_isVue", {
        enumerable: !1,
        value: "ForSkipVueObserver",
      }),
      Object.defineProperty(e, "__v_skip", {
        enumerable: !1,
        value: "ForSkipVueObserver",
      }));
  }
  !(function () {
    let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Graphics.Utility.Relation"
    );
    (e.getViews = function (e, n, a) {
      t.Web.Lang.Utility.HttpRequest.ajax({
        url: `${u.resourceHost}/${e}/metadata/views.json`,
        success: function (t) {
          var i = JSON.parse(t).viewList;
          t = [];
          for (var o in i) {
            var l = i[o];
            l.viewType == n &&
              ((l.preview.path = `${u.resourceHost}/${e}/${l.preview.path}`),
              t.push(l));
          }
          a && a(t);
        },
      });
    }),
      (e.getDrawingSheets = function (e, n, a, i = null, o = {}) {
        t.Web.Lang.Utility.HttpRequest.ajax({
          url: t.Web.Lang.Utility.HttpRequest.getUrl({
            url: `${u.resourceHost}/${e}/metadata/drawings.json`,
            path: "metadata/drawings.json",
            ...o,
          }),
          success: function (e) {
            for (var t = JSON.parse(e).drawingList, o = 0; o < t.length; o++) {
              var l = t[o];
              if (i) {
                if (l.fileId == i && l.viewInfo.id == n) {
                  a && a(l);
                  break;
                }
              } else if (l.viewInfo.id == n) {
                a && a(l);
                break;
              }
            }
          },
        });
      }),
      (e.point2DToPoint3D = function (e, n) {
        if ("DrawingSheet" == n.viewType)
          return (function (e, t) {
            if ("DrawingSheet" != t.viewType) return null;
            var n = t.viewInfo;
            let a = n.preview.width,
              i = n.preview.height,
              o = n.outline[0],
              l = n.outline[2],
              s = n.outline[1],
              r = n.outline[3],
              c = l - o,
              d = r - s;
            function f(e) {
              return "FloorPlan" == e || "CeilingPlan" == e;
            }
            function m(t, n, l, r, f) {
              let m = e.x / a,
                p = (i - e.y) / i;
              if ("Elevation" == f.viewType) {
                (p = (a - e.x) / a), (m = e.y / i);
                var u = f.viewPoint.viewDirection;
                (1 != Math.round(u[0]) && -1 != Math.round(u[1])) ||
                  (m = (i - e.y) / i);
              }
              let g = (t - o) / c,
                h = (n - o) / c;
              if (m < g || m > h) return null;
              let b = (l - s) / d,
                v = (r - s) / d;
              if (p < b || p > v) return null;
              let y = (m - g) / (h - g),
                C = (p - b) / (v - b),
                w =
                  ((f.outline[2] - f.outline[0]) * y + f.outline[0]) *
                  f.viewPoint.scale,
                B =
                  ((f.outline[3] - f.outline[1]) * C + f.outline[1]) *
                  f.viewPoint.scale;
              return new THREE.Vector3(w, B, 0);
            }
            let p = (n = t).portsAndViews;
            for (var u = 0; u < p.length; u++) {
              let e = p[u];
              if (!f(e.viewType)) continue;
              let t = m(
                e.viewport[0],
                e.viewport[3],
                e.viewport[1],
                e.viewport[4],
                e
              );
              if (null != t) {
                if (f(e.viewType)) null !== t && (t.z = e.elevation);
                else if ("Elevation" == e.viewType) {
                  var g = e.viewPoint.viewDirection,
                    h = e.cropBox;
                  0 != Math.round(g[0])
                    ? null !== t &&
                      ((t.z = t.y), (t.y = t.x), (t.x = g[0] < 0 ? h[3] : h[0]))
                    : 0 != Math.round(g[1]) &&
                      null !== t &&
                      ((t.z = t.y), (t.y = g[1] < 0 ? h[4] : h[1]));
                }
                return t;
              }
            }
            return null;
          })(e, n);
        if ("FloorPlan" != n.viewType)
          return console.warn("Not support yet!"), null;
        var a = n.preview.width,
          i = n.preview.height,
          o = n.outline[0],
          l = n.outline[2],
          s = n.outline[1],
          r = n.outline[3],
          c = l - o,
          d = r - s,
          f = (0 - o) / c,
          m = r / d,
          p = (e.x - a * f) / a,
          u = (i * m - e.y) / i;
        return (
          (p = p * c * n.viewPoint.scale),
          (u = u * d * n.viewPoint.scale),
          new t.Web.Geometry.Point3d(p, u, n.elevation)
        );
      }),
      (e.point3DToPoint2D = function (e, t) {
        let n = [];
        if (
          (function (e, t, n) {
            if ("DrawingSheet" != t.viewType) return !1;
            var a = t.preview.width,
              i = t.preview.height,
              o = t.outline[0],
              l = t.outline[2],
              s = t.outline[1],
              r = t.outline[3];
            let c = t.portsAndViews;
            for (let t in c) {
              let d = c[t];
              if ("FloorPlan" !== d.viewType) continue;
              let f = d.viewPoint.scale,
                m = d.outline[0] * f,
                p = d.outline[2] * f,
                u = d.outline[1] * f,
                g = d.outline[3] * f;
              if (e.x < m || e.x > p) continue;
              if (e.y < u || e.y > g) continue;
              let h = (e.x - m) / (p - m),
                b = (e.y - u) / (g - u),
                v = d.viewport[3] - d.viewport[0],
                y = d.viewport[4] - d.viewport[1];
              n(
                a * ((d.viewport[0] + v * h - o) / (l - o)),
                i - i * ((d.viewport[1] + y * b - s) / (r - s)),
                d
              );
            }
            return !0;
          })(e, t, function (e, t, a) {
            n.append({ x: e, y: t });
          })
        )
          return 0 == n.length ? null : n;
        if ("FloorPlan" != t.viewType)
          return console.warn("Not support yet!"), null;
        var a = t.preview.width,
          i = t.preview.height,
          o = t.outline[0],
          l = t.outline[2],
          s = t.outline[1],
          r = t.outline[3],
          c = l - o,
          d = r - s,
          f = (0 - o) / (l - o),
          m = r / (r - s),
          p = e.x / (c * t.viewPoint.scale),
          u = e.y / (d * t.viewPoint.scale);
        return { x: (p = p * a + a * f), y: (u = i * m - u * i), z: 0 };
      });
  })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Graphics.Utility"
    ).ImageContainer = function (e) {
      var t = new Image();
      return new Promise(function (n, a) {
        (t.onload = function () {
          n(t);
        }),
          (t.onerror = function (e) {
            a(e);
          }),
          (t.crossOrigin = "anonymous"),
          (t.src = e),
          !0 === t.complete && n(t);
      });
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Graphics"),
        n = t.Web.Graphics.Utility.RGBToHex,
        a = function (e, t, n, a) {
          (this.red = e), (this.green = t), (this.blue = n), (this.alpha = a);
        },
        i = function (e, t) {
          /^#[0-9a-fA-F]{6}$/.test(e) &&
            ((this.red = parseInt(e.slice(1, 3), 16)),
            (this.green = parseInt(e.slice(3, 5), 16)),
            (this.blue = parseInt(e.slice(5), 16))),
            "number" == typeof t
              ? (t > 1 && (t = 1), t < 0 && (t = 0), (this.alpha = t))
              : (this.alpha = 1);
        },
        o = function () {
          arguments.length < 4
            ? i.apply(this, arguments)
            : a.apply(this, arguments);
        };
      (o.prototype = {
        getRGB: function () {
          return `rgba(${this.red},${this.green},${this.blue})`;
        },
        getRGBA: function () {
          return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
        },
        getHEX: function () {
          return `${n(this.red)}${n(this.green)}${n(this.blue)}`;
        },
        getAlpha: function () {
          return this.alpha;
        },
        fromObject: function (e) {
          return (
            (this.red = e.red),
            (this.green = e.green),
            (this.blue = e.blue),
            (this.alpha = e.alpha),
            this
          );
        },
      }),
        (e.Color = o);
    })(),
    (SVGElement.prototype.getClass = HTMLElement.prototype.getClass =
      function (e) {
        return this.getAttribute("class");
      }),
    (SVGElement.prototype.hasClass = HTMLElement.prototype.hasClass =
      function (e) {
        let t = this.getClass();
        return !!t && (t && t.split(" ")).indexOf(e) > -1;
      }),
    (SVGElement.prototype.addClass = HTMLElement.prototype.addClass =
      function (e) {
        let t = this.getClass();
        var n = t && t.split(" ");
        return (
          t
            ? -1 == n.indexOf(e) &&
              (n.push(e), (t = n.join(" ")), this.setAttribute("class", `${t}`))
            : this.setAttribute("class", `${e}`),
          this
        );
      }),
    (SVGElement.prototype.removeClass = HTMLElement.prototype.removeClass =
      function (e) {
        if (!this.hasClass(e)) return this;
        let t = this.getClass().replace(e, "").trim();
        return (
          t
            ? this.setAttribute("class", `${t}`)
            : this.removeAttribute("class"),
          this
        );
      }),
    (SVGElement.prototype.toggleClass = HTMLElement.prototype.toggleClass =
      function (e, t) {
        this.getClass();
        var n = this.hasClass(e);
        return (
          null != t
            ? (t && !n && this.addClass(e), t || this.removeClass(e))
            : n
            ? this.removeClass(e)
            : this.addClass(e),
          !n
        );
      }),
    g(Array.prototype, "getObjectByAttribute", function (e, t) {
      for (var n = this, a = n.length, i = 0; i < a; i++)
        if (n[i][e] == t) return n[i];
      return !1;
    }),
    g(Array.prototype, "removeObjectByAttribute", function (e, t) {
      for (var n = this, a = n.length, i = 0; i < a; i++)
        if (n[i][e] == t) return (n = n.splice(i, 1));
      return !1;
    }),
    g(Array.prototype, "getAllObjectByAttribute", function (e, t) {
      for (var n = this, a = n.length, i = 0, o = []; i < a; i++)
        n[i][e] == t && o.push(n[i]);
      return o;
    }),
    g(Array.prototype, "removeByValue", function (e) {
      for (var t = this, n = t.length - 1; n >= 0; n--)
        t[n] == e && t.splice(n, 1);
      return t;
    }),
    g(Array.prototype, "insert", function (e, t) {
      return this.splice(e, 0, t), this;
    }),
    g(Array.prototype, "insertAfter", function (e, t) {
      let n = e.length;
      for (; n > 0 && -1 == this.indexOf(e[n - 1]); ) n--;
      return (
        n < 1 ? this.splice(e.length, 0, t) : this.splice(n, 0, t),
        { res: this, index: n }
      );
    }),
    g(Array.prototype, "unique", function (e) {
      for (var t = [], n = 0; n < e.length; n++)
        t.indexOf(-1 === e[n]) && t.push(e[n]);
      return t;
    }),
    (SVGElement.prototype.setCss = HTMLElement.prototype.setCss =
      function (e) {
        if (e) for (var t in e) this.style[t] = e[t];
      }),
    (SVGElement.prototype.getCss = HTMLElement.prototype.getCss =
      function () {
        return this.style;
      }),
    (c = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Data")),
    (d = null),
    (f = {
      getInstance: function () {
        return (
          null == d &&
            (((d = {}).sendingPeriod = 6e4),
            (d.requestList = []),
            (d.isEnabled = !0),
            (d.modelType = ""),
            (d.modelId = ""),
            (d.handleId = null),
            (d.send = function (e, t, n) {
              if (d.isEnabled) {
                let a = { functionName: `${e}.${t}` },
                  i = Object.assign(a, n);
                this.requestList.push(i);
              }
            }),
            (d.intervalAction = function () {
              if (d.isEnabled) {
                var e = d.requestList,
                  t = e.length;
                if (t > 0) {
                  var n = e.slice(0, t);
                  d._send(n), e.splice(0, t);
                }
              }
            }),
            (d.handleId = setInterval(d.intervalAction, d.sendingPeriod)),
            (d._send = function (e) {
              var t = `${BimfaceLoaderConfig.APIHost}/inside/track?ModelType=${this.modelType}&ModelId=${this.modelId}`,
                n = { Events: e };
              fetch(t, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(n),
                headers: { "Content-Type": "application/json" },
                cache: "default",
              }).then(function (e) {});
            }),
            (d.setIsEnabled = function (e) {
              (d.isEnabled = !0 === e),
                d.isEnabled && null === d.handleId
                  ? (d.handleId = setInterval(
                      d.intervalAction,
                      d.sendingPeriod
                    ))
                  : d.isEnabled ||
                    null === d.handleId ||
                    (clearInterval(d.handleId), (d.handleId = null));
            }),
            (d.getIsEnabled = function () {
              return d.isEnabled;
            })),
          d
        );
      },
    }),
    (c.StatisticsDataManager = f),
    (window._iconfont_svg_string_295828 =
      '<svg><symbol id="gld-bf-n-handdrawing" viewBox="0 0 1024 1024"><path d="M697.152 160l157.856 157.824L372.8 800l-0.576-0.576 0.128 0.544-185.92 47.712-26.464 6.784 7.04-26.4 48.16-185.696L697.12 160zM241.44 668.608l-36.48 141.312 141.472-36.32-104.992-104.992z m369.92-377.6L260.256 642.144l112.576 112.576 351.104-351.136-112.576-112.576z m85.76-85.76l-63.136 63.104 112.608 112.608 63.136-63.136-112.576-112.576z"  ></path></symbol><symbol id="gld-bf-slope-lg" viewBox="0 0 1024 1024"><path d="M806.304 484.256a16 16 0 0 0 11.648-27.2l-83.264-85.024a16 16 0 0 0-26.144 4.864l-11.424 26.656-404.48-173.248L277.984 224l-12.576 29.44 14.72 6.272L684.48 432.96l-11.712 27.392a16 16 0 0 0 14.496 22.272l119.008 1.6zM224 788.16h576V624.768l-576-236.8V788.16z m-32 0v-448l32 13.184 608 249.984V820.16H192v-32z"  ></path></symbol><symbol id="gld-bf-rectangle1" viewBox="0 0 1024 1024"><path d="M170.666667 149.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h682.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v682.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-682.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-682.666667zM213.333333 170.666667v640h640V170.666667H213.333333z"  ></path></symbol><symbol id="gld-bf-polygon" viewBox="0 0 1024 1024"><path d="M106.666667 213.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h512a21.333333 21.333333 0 0 1 13.653333 4.949333l256 213.333334a21.333333 21.333333 0 0 1 7.68 16.384v384a21.333333 21.333333 0 0 1-21.333333 21.333333H128a21.333333 21.333333 0 0 1-21.333333-21.333333V213.333333z m42.666666 21.333334v554.666666h725.333334v-352.682666L632.277333 234.666667H149.333333z"  ></path></symbol><symbol id="gld-bf-reverse-axis-lg" viewBox="0 0 1024 1024"><path d="M805.344 602.656H206.72l160.64 160.64 22.624-22.624-106.016-106.016h521.376v-32zM218.656 421.344H817.28l-160.64-160.64-22.624 22.624 106.016 106.016H218.656v32z"  ></path></symbol><symbol id="gld-bf-scaling1" viewBox="0 0 1024 1024"><path d="M240 464h-32v-256h320v32h-288v224z m544-201.376V400h32v-192h-192v32h137.376l-196.704 196.672 22.624 22.624L784 262.624zM464 816v-256h-256v256h256z m-224-224h192v192h-192v-192z m320 192h224v-288h32v320h-256v-32z"  ></path></symbol><symbol id="gld-bf-a-Frame111" viewBox="0 0 1024 1024"><path d="M64.448 277.952l51.392 27.776a157.696 157.696 0 0 0 152.32 0 61.76 61.76 0 0 1 61.056 0 157.696 157.696 0 0 0 152.32 0 61.76 61.76 0 0 1 60.992 0 157.696 157.696 0 0 0 152.32 0 61.76 61.76 0 0 1 60.992 0 157.696 157.696 0 0 0 152.32 0l51.52-27.84L912.896 192l-3.968 4.224-46.464 25.088a61.76 61.76 0 0 1-61.056 0 157.696 157.696 0 0 0-152.32 0 61.76 61.76 0 0 1-60.992 0 157.696 157.696 0 0 0-152.32 0 61.76 61.76 0 0 1-60.992 0 157.696 157.696 0 0 0-152.32 0 61.76 61.76 0 0 1-61.056 0l-48.576-26.24-1.792-1.6h-1.088l-45.568 84.48z m0 253.376l51.392 27.776a157.696 157.696 0 0 0 152.32 0 61.76 61.76 0 0 1 61.056 0 157.696 157.696 0 0 0 152.32 0 61.76 61.76 0 0 1 60.992 0 157.696 157.696 0 0 0 152.32 0 61.76 61.76 0 0 1 60.992 0 157.696 157.696 0 0 0 152.32 0l51.52-27.84-46.72-85.952-3.968 4.224-46.464 25.088a61.76 61.76 0 0 1-61.056 0 157.696 157.696 0 0 0-152.32 0 61.76 61.76 0 0 1-60.992 0 157.696 157.696 0 0 0-152.32 0 61.76 61.76 0 0 1-60.992 0 157.696 157.696 0 0 0-152.32 0 61.76 61.76 0 0 1-61.056 0l-48.576-26.24-1.792-1.6h-1.088l-45.568 84.48z m51.392 283.776l-51.392-27.776 45.568-84.48 1.088-0.064 1.792 1.6 48.64 26.24c19.84 10.752 41.088 10.752 60.992 0a157.696 157.696 0 0 1 152.32 0c19.84 10.752 41.088 10.752 60.992 0a157.696 157.696 0 0 1 152.32 0c19.84 10.752 41.152 10.752 61.056 0a157.696 157.696 0 0 1 152.32 0c19.84 10.752 41.088 10.752 60.992 0l46.464-25.088 3.968-4.224 46.72 85.952-51.52 27.84a157.696 157.696 0 0 1-152.32 0 61.76 61.76 0 0 0-60.992 0 157.696 157.696 0 0 1-152.32 0 61.76 61.76 0 0 0-61.056 0 157.696 157.696 0 0 1-152.32 0 61.76 61.76 0 0 0-60.992 0 157.696 157.696 0 0 1-152.32 0z"  ></path></symbol><symbol id="gld-bf-delete1" viewBox="0 0 1024 1024"><path d="M640 192v-64H384v64H128v64h768v-64H640zM192 320v544c0 52.928 43.072 96 96 96h448c52.928 0 96-43.072 96-96V320H192z m64 576V384h128v512H256z m192 0V384h128v512H448z m320 0H640V384h128v512z"  ></path></symbol><symbol id="gld-bf-a-Frame771" viewBox="0 0 1024 1024"><path d="M512 921.6c226.2016 0 409.6-183.3984 409.6-409.6S738.2016 102.4 512 102.4 102.4 285.7984 102.4 512s183.3984 409.6 409.6 409.6z" fill="#454545" ></path><path d="M512 560.264533l103.867733 103.867734 48.264534-48.264534L560.264533 512l103.867734-103.867733-48.264534-48.264534L512 463.735467l-103.867733-103.867734-48.264534 48.264534L463.735467 512l-103.867734 103.867733 48.264534 48.264534L512 560.264533z" fill="#FFFFFF" fill-opacity=".7" ></path></symbol><symbol id="gld-bf-view-mobile" viewBox="0 0 1024 1024"><path d="M128 576H0V448h128v128zM128 256H0V128h128v128zM1024 576H256V448h768v128zM1024 256H256V128h768v128zM128 896H0v-128h128v128zM1024 896H256v-128h768v128z" fill="#E1E1E1" ></path></symbol><symbol id="gld-bf-select-mobile" viewBox="0 0 1024 1024"><path d="M0 482.944l90.496-90.496 294.144 294.144 520.448-520.448 90.496 90.496-610.944 610.944L0 482.944z" fill="#32D3A6" ></path></symbol><symbol id="gld-bf-mulline-md" viewBox="0 0 1024 1024"><path d="M423.104 352c25.088 0 46.144 17.312 51.84 40.64l255.456 25.536a53.344 53.344 0 1 1-3.52 35.424l-255.488-25.568a53.344 53.344 0 0 1-66.4 27.488L292.256 593.28a53.344 53.344 0 1 1-26.4-23.904l111.68-136.416A53.344 53.344 0 0 1 423.104 352z"  ></path></symbol><symbol id="gld-bf-volume-md" viewBox="0 0 1024 1024"><path d="M512 128L213.333333 287.274667V605.866667l298.666667 159.274666 298.666667-159.274666V287.274667L512 128z m245.333333 170.026667L512 424.277333l-243.328-125.44L512 171.818667l245.333333 126.208zM253.098667 574.805333v-238.933333l238.933333 123.050667v250.453333l-238.933333-123.434667v-11.136z m517.717333 11.136l-238.933333 123.477334v-250.496l238.933333-123.050667v250.069333z"  ></path><path d="M128 853.333333h768v42.666667H128z"  ></path></symbol><symbol id="gld-bf-volume-lg" viewBox="0 0 1024 1024"><path d="M512 128L256 264.544V537.6l256 136.544 256-136.544V264.544L512 128z m210.24 145.76L512 381.952l-208.544-107.52L512 165.536l210.24 108.224zM290.176 510.976v-204.8l204.8 105.472v214.72l-204.8-105.824v-9.568z m443.712 9.568l-204.8 105.792v-214.688l204.8-105.472v214.368zM864 768v128H160v-128h704z m-32 32H192v64h640v-64z"  ></path></symbol><symbol id="gld-bf-mesaure-laser" viewBox="0 0 1024 1024"><path d="M768 608l160 144-160 144v-128H416v-33.216h352V608zM272 672a80 80 0 1 1 0 160 80 80 0 0 1 0-160z m0 32a48 48 0 1 0 0 96 48 48 0 0 0 0-96z m0-608L416 256H289.216L288 608H254.784L256 256H128l144-160z"  ></path></symbol><symbol id="gld-bf-third-person-lg" viewBox="0 0 1024 1024"><path d="M592 32a112 112 0 0 1 78.336 192.032L676.032 224c78.656 0 125.312 55.264 132.48 137.28l23.424 211.168 0.064 6.24c-3.168 37.184-26.24 61.728-63.84 61.728-12.032 0-22.4-2.56-31.104-7.168l-0.864 278.4A79.424 79.424 0 0 1 655.936 992c-28.096 0-50.336-11.456-64.096-30.08-14.4 18.752-37.184 30.08-63.872 30.08-45.216 0-79.04-33.856-79.04-78.72l-0.064-280.64a65.248 65.248 0 0 1-32.352 7.872c-37.728 0-64.512-27.36-64.512-63.68l0.256-3.936 25.632-206.656C387.2 279.36 427.552 224 505.44 224l8.192 0.032A112 112 0 0 1 592 32z m84.032 224h-170.592c-64.48 0-89.056 51.392-95.712 113.632L384 576.832c0 18.016 11.84 31.68 32.512 31.68 20.608 0 29.696-13.024 31.68-31.872l32.576-194.496 0.16 531.104c0 27.072 19.328 46.752 47.04 46.752 27.68 0 48-18.592 48.416-48.096L575.936 640h32l0.448 271.808c0 27.072 15.68 48.192 47.552 48.192 27.712 0 48.288-21.28 48.288-48.352l1.6-529.504 30.72 194.08c2.592 19.264 10.976 32.192 31.616 32.192s30.208-11.776 31.968-32.448l-23.424-211.136C771.296 302.912 740.448 256 676.032 256zM384 864v32H96v-32h288z m512 0v32h-96v-32h96zM288 544v32H192v-32h96z m304-480a80 80 0 1 0 0 159.968A80 80 0 0 0 592 64z"  ></path></symbol><symbol id="gld-bf-reverse-lg" viewBox="0 0 1024 1024"><path d="M128 128h192v32H160v160H128V128z m0 736h192v-32H160v-160H128v192zM864 128h-192v32h160v160h32V128z m0 736h-192v-32h160v-160h32v192zM566.016 332.48l19.968-24.96L768 448H256v-32h420.768zM457.984 659.52l-19.968 24.96L256 544h512v32H347.232z"  ></path></symbol><symbol id="gld-bf-section-plane-pick" viewBox="0 0 1024 1024"><path d="M512 416l336 208-112 64 96 160-96 64-96-160-128 80V416z m32 57.44v300.832l106.688-66.688 95.456 159.136 42.688-28.448-97.088-161.824 93.632-53.568L544 473.44z"  ></path><path d="M640 96v288h-32V156.384L288 362.016V781.76l128-82.272v38.88l-160 103.776V345.056L640 96z"  ></path></symbol><symbol id="gld-bf-split-drawings" viewBox="0 0 1024 1024"><path d="M896 384v448H320V384h576z m-160 32H352v384h384V416z m128 192h-96v192h96v-192zM736 224v96h-32V256H192v384h64v32H160V224h576z m128 288h-96v64h96v-64z m0-96h-96v64h96v-64z"  ></path></symbol><symbol id="gld-bf-export" viewBox="0 0 1024 1024"><path d="M384 64v64H128v768h768v-256h64v320H64V64h320z m576 0v384h-64V173.184l-480 480.064-45.248-45.248L850.56 128H576V64h384z"  ></path></symbol><symbol id="gld-bf-arrowup" viewBox="0 0 1024 1024"><path d="M937.642667 707.157333L511.317333 281.173333 450.730667 341.333333 85.333333 707.072l60.16 60.330667L511.317333 401.92l365.994667 365.482667z"  ></path></symbol><symbol id="gld-bf-arrowdown" viewBox="0 0 1024 1024"><path d="M937.642667 316.842667L511.317333 742.826667 450.730667 682.666667 85.333333 316.928l60.16-60.330667L511.317333 622.08l365.994667-365.482667z"  ></path></symbol><symbol id="gld-bf-search" viewBox="0 0 1024 1024"><path d="M447.99808 128c75.328 0 148.544 26.688 206.144 75.2a318.976 318.976 0 0 1 98.944 341.568 318.72 318.72 0 0 1-304.896 223.36c-32.64 0-65.216-5.056-96.768-15.04a319.04 319.04 0 0 1-222.144-277.632 319.04 319.04 0 0 1 171.456-311.552c45.504-23.552 96-35.84 147.264-35.904z m0-128A447.872 447.872 0 0 0 1.72608 486.4 448 448 0 1 0 447.99808 0z"  ></path><path d="M750.27008 843.008l90.496-90.496 180.992 180.992L931.26208 1024z"  ></path></symbol><symbol id="gld-bf-translation" viewBox="0 0 1056 1024"><path d="M512 576v160h96l-112 128-112-128h96v-160h32z m224-192l128 112-128 112v-96.032L576 512v-32l160-0.032V384zM256 384v96h160v32H256v96l-128-112L256 384z m240-256L608 256h-96v160h-32V256h-96l112-128z" fill="#000000" ></path></symbol><symbol id="gld-bf-rotation" viewBox="0 0 1056 1024"><path d="M480 192h32v352h-32V192z m0 544h32v128h-32v-128zM672 500L832 480l-14.176 160z" fill="#000000" ></path><path d="M482.976 655.968c-184.384 0-336-83.392-336-192 0-97.344 122.24-175.36 282.944-189.664l9.888-0.8 2.304 31.904c-150.976 10.912-263.136 80.704-263.136 158.56 0 85.76 134.944 160 304 160 64.096 0 125.184-10.688 176.384-30.208 46.08-17.6 82.208-41.6 104.032-68.8l4.48-5.92 26.016 18.624c-25.248 35.328-68.288 65.088-123.136 85.984-54.944 20.96-119.872 32.32-187.776 32.32z" fill="#000000" ></path></symbol><symbol id="gld-bf-scaling" viewBox="0 0 1056 1024"><path d="M480 544v320H160V544h320z m-32 32H192v256h256v-256zM836.672 164.672l22.656 22.656-224 224-22.656-22.656zM160 480h32V192h352V160H160zM544 832h288V480h32v384H544z" fill="#000000" ></path><path d="M672 160h192v192h-32V192h-160z" fill="#000000" ></path></symbol><symbol id="gld-bf-room-height" viewBox="0 0 1024 1024"><path d="M896 768v32H96v-32h800zM496 256l112 128h-96v256h96l-112 128-112-128h96v-256h-96l112-128zM896 224v32H96V224h800z"  ></path></symbol><symbol id="gld-bf-next" viewBox="0 0 1024 1024"><path d="M404.64 692.704l169.28-169.44-169.28-169.408 22.656-22.592 169.28 169.28 0.064-0.032 22.624 22.72-192 192.128z"  ></path></symbol><symbol id="gld-bf-previous" viewBox="0 0 1024 1024"><path d="M619.264 692.704l-169.28-169.44 169.28-169.408-22.656-22.592-169.28 169.28-0.064-0.032-22.624 22.72 192 192.128z"  ></path></symbol><symbol id="gld-bf-drag" viewBox="0 0 1024 1024"><path d="M608 192a64 64 0 0 1 63.84 59.2L672 256v192h-32V256a32 32 0 0 0-63.776-3.744L576 256h-32a64 64 0 0 1 64-64zM416 192a64 64 0 0 1 63.84 59.2L480 256v192h-32V256a32 32 0 0 0-63.776-3.744L384 256v192h-32V256a64 64 0 0 1 64-64z"  ></path><path d="M320 384a64 64 0 0 1 63.84 59.2L384 448v160h-32v-160a32 32 0 0 0-63.776-3.744L288 448v160H256v-160a64 64 0 0 1 64-64zM704 272a64 64 0 0 1 63.84 59.2l0.16 4.8V608h-32v-272a32 32 0 0 0-63.776-3.744L672 336h-32a64 64 0 0 1 64-64zM512 864a256 256 0 0 0 255.872-248L768 608h-32a224 224 0 0 1-447.872 7.68L288 608H256a256 256 0 0 0 256 256zM512 128a64 64 0 0 1 63.84 59.2L576 192v256h-32V192a32 32 0 0 0-63.776-3.744L480 192v80h-32V192a64 64 0 0 1 64-64z"  ></path></symbol><symbol id="gld-bf-zoom-out" viewBox="0 0 1024 1024"><path d="M480 160a288 288 0 1 0 0 576 288 288 0 0 0 0-576z m0 32a256 256 0 1 1 0 512 256 256 0 0 1 0-512z"  ></path><path d="M640 416H320v64h320z"  ></path><path d="M651.328 660.672l-22.656 22.656 176 176 22.656-22.656z"  ></path></symbol><symbol id="gld-bf-zoom-in" viewBox="0 0 1024 1024"><path d="M480 160a288 288 0 1 0 0 576 288 288 0 0 0 0-576z m0 32a256 256 0 1 1 0 512 256 256 0 0 1 0-512z"  ></path><path d="M640 416H320v64h320z"  ></path><path d="M448 288v320h64V288z"  ></path><path d="M651.328 660.672l-22.656 22.656 176 176 22.656-22.656z"  ></path></symbol><symbol id="gld-bf-full-screen" viewBox="0 0 1024 1024"><path d="M608 192v32h169.6l-227.2 227.2 22.4 22.4L800 246.4V416h32V192h-224z m-156.8 358.4L224 777.6V608H192v224h224v-32H246.4l227.2-227.2-22.4-22.4z"  ></path><path d="M896 128v768H128V128h768m32-32H96v832h832V96z"  ></path></symbol><symbol id="gld-bf-measure-settings" viewBox="0 0 1024 1024"><path d="M607.744 193.28a318.208 318.208 0 0 1 116.8 65.76c9.728 8.544 12.16 22.656 5.888 33.92-6.048 10.88-9.184 23.136-9.152 35.552a74.752 74.752 0 0 0 74.88 74.432 27.84 27.84 0 0 1 27.488 21.28 316.096 316.096 0 0 1 1.696 136.768 27.68 27.68 0 0 1-24.32 21.856l-4.832 0.128a74.816 74.816 0 0 0-65.408 38.08 73.92 73.92 0 0 0 1.664 75.296 27.584 27.584 0 0 1-4.8 35.04 318.4 318.4 0 0 1-115.584 67.2 27.744 27.744 0 0 1-33.44-13.664A75.008 75.008 0 0 0 512 744.512c-28.096 0-53.792 15.584-66.656 40.416a27.776 27.776 0 0 1-33.376 13.664 322.464 322.464 0 0 1-118.88-70.24 27.36 27.36 0 0 1-5.056-33.888 74.048 74.048 0 0 0-0.128-74.368 74.944 74.944 0 0 0-64.864-37.12l-19.168 0.864-3.584-15.36a316.8 316.8 0 0 1 0.064-144.288 27.776 27.776 0 0 1 23.872-21.12l3.52-0.16a74.784 74.784 0 0 0 74.976-74.4 72.864 72.864 0 0 0-9.152-35.52 27.392 27.392 0 0 1 5.92-33.952 318.208 318.208 0 0 1 116.736-65.792 27.904 27.904 0 0 1 32 11.936A74.944 74.944 0 0 0 512 240.608c26.016 0 50.144-13.44 63.744-35.424a27.904 27.904 0 0 1 32-11.936z m-6.624 31.488l-1.728 2.656A106.976 106.976 0 0 1 512 272.608c-34.88 0-67.456-16.96-87.36-45.184l-1.792-2.656-8.672 2.912A286.336 286.336 0 0 0 329.888 275.2l-6.624 5.568 1.76 3.52c5.344 11.52 8.544 23.968 9.44 36.64l0.256 7.616a106.784 106.784 0 0 1-101.44 106.208l-2.496 0.064-1.76 8.352a284.8 284.8 0 0 0-0.032 106.4l0.32 1.568h0.416c33.28 2.08 63.744 19.52 82.24 47.168l3.584 5.664c17.952 30.848 19.168 68.48 3.488 100.352l-1.6 2.912 5.952 5.312a290.464 290.464 0 0 0 87.776 51.84l7.52 2.656 1.472-2.592a107.008 107.008 0 0 1 85.216-51.744l6.624-0.192c37.792 0 72.64 19.84 91.904 52.032l1.376 2.528 8.32-2.88a286.368 286.368 0 0 0 83.328-48.48l6.496-5.664-1.76-3.072a105.92 105.92 0 0 1-2.08-95.232l3.296-6.4a106.752 106.752 0 0 1 86.528-54.144l5.216-0.192 1.664-8.768a283.968 283.968 0 0 0-1.216-98.464l-1.888-8.928-3.072-0.096a106.752 106.752 0 0 1-100.672-100.128l-0.16-6.016a104.832 104.832 0 0 1 9.696-44.352l1.76-3.456-6.72-5.664a286.208 286.208 0 0 0-84.16-47.456l-8.736-2.912z m-92 127.264l6.976 0.032a128 128 0 1 1-8.192 255.872 128 128 0 0 1 8.192-255.872z m5.952 32a96 96 0 1 0-6.144 191.904 96 96 0 0 0 6.144-191.872z"  ></path></symbol><symbol id="gld-bf-scene-front" viewBox="0 0 1024 1024"><path d="M608 416v352H256V416h352m32-32H224v416h416V384z" fill="#FFFFFF" ></path><path d="M768 256v352H416V256h352m32-32H384v416h416V224z" fill="#FFFFFF" ></path><path d="M768 256v371.2L627.2 768H256V396.8L396.8 256H768m32-32H384l-160 160v416h416l160-160V224z" fill="#FFFFFF" ></path><path d="M755.2 256l-128 128H268.8l128-128h358.4M800 224H384l-160 160v32h416l160-160V224zM755.2 640l-128 128H268.8l128-128h358.4m44.8-32H384l-160 160v32h416l160-160v-32z" fill="#FFFFFF" ></path><path d="M256 416h352v352H256z" fill="#FFFFFF" fill-opacity=".65" ></path></symbol><symbol id="gld-bf-scene-back" viewBox="0 0 1024 1024"><path d="M416 256h352v352H416z" fill="#FFFFFF" fill-opacity=".65" ></path><path d="M608 416v352H256V416h352m32-32H224v416h416V384z" fill="#FFFFFF" ></path><path d="M768 256v352H416V256h352m32-32H384v416h416V224z" fill="#FFFFFF" ></path><path d="M768 256v371.2L627.2 768H256V396.8L396.8 256H768m32-32H384l-160 160v416h416l160-160V224z" fill="#FFFFFF" ></path><path d="M755.2 256l-128 128H268.8l128-128h358.4M800 224H384l-160 160v32h416l160-160V224zM755.2 640l-128 128H268.8l128-128h358.4m44.8-32H384l-160 160v32h416l160-160v-32z" fill="#FFFFFF" ></path></symbol><symbol id="gld-bf-scene-left" viewBox="0 0 1024 1024"><path d="M224 384l160-160v384l-160 160z" fill="#FFFFFF" fill-opacity=".65" ></path><path d="M608 416v352H256V416h352m32-32H224v416h416V384z" fill="#FFFFFF" ></path><path d="M768 256v352H416V256h352m32-32H384v416h416V224z" fill="#FFFFFF" ></path><path d="M768 256v371.2L627.2 768H256V396.8L396.8 256H768m32-32H384l-160 160v416h416l160-160V224z" fill="#FFFFFF" ></path><path d="M755.2 256l-128 128H268.8l128-128h358.4M800 224H384l-160 160v32h416l160-160V224zM755.2 640l-128 128H268.8l128-128h358.4m44.8-32H384l-160 160v32h416l160-160v-32z" fill="#FFFFFF" ></path></symbol><symbol id="gld-bf-scene-right" viewBox="0 0 1024 1024"><path d="M608 416v352H256V416h352m32-32H224v416h416V384z" fill="#FFFFFF" ></path><path d="M768 256v352H416V256h352m32-32H384v416h416V224z" fill="#FFFFFF" ></path><path d="M755.2 256l-128 128H268.8l128-128h358.4M800 224H384l-160 160v32h416l160-160V224zM755.2 640l-128 128H268.8l128-128h358.4m44.8-32H384l-160 160v32h416l160-160v-32z" fill="#FFFFFF" ></path><path d="M640 416l128-128v339.2l-128 128z" fill="#FFFFFF" fill-opacity=".6" ></path></symbol><symbol id="gld-bf-scene-top" viewBox="0 0 1024 1024"><path d="M608 416v352H256V416h352m32-32H224v416h416V384z" fill="#FFFFFF" ></path><path d="M768 256v352H416V256h352m32-32H384v416h416V224z" fill="#FFFFFF" ></path><path d="M755.2 256l-128 128H268.8l128-128h358.4M800 224H384l-160 160v32h416l160-160V224zM755.2 640l-128 128H268.8l128-128h358.4m44.8-32H384l-160 160v32h416l160-160v-32z" fill="#FFFFFF" ></path><path d="M268.8 384l128-128h358.4l-128 128z" fill="#FFFFFF" fill-opacity=".65" ></path></symbol><symbol id="gld-bf-scene-bottom" viewBox="0 0 1024 1024"><path d="M640 768l160-160H416l-160 160z" fill="#FFFFFF" fill-opacity=".65" ></path><path d="M608 416v352H256V416h352m32-32H224v416h416V384z" fill="#FFFFFF" ></path><path d="M768 256v352H416V256h352m32-32H384v416h416V224z" fill="#FFFFFF" ></path><path d="M768 256v371.2L627.2 768H256V396.8L396.8 256H768m32-32H384l-160 160v416h416l160-160V224z" fill="#FFFFFF" ></path><path d="M755.2 256l-128 128H268.8l128-128h358.4M800 224H384l-160 160v32h416l160-160V224zM755.2 640l-128 128H268.8l128-128h358.4m44.8-32H384l-160 160v32h416l160-160v-32z" fill="#FFFFFF" ></path></symbol><symbol id="gld-bf-scene" viewBox="0 0 1024 1024"><path d="M608 416v352H256V416h352m32-32H224v416h416V384z" fill="#333333" ></path><path d="M768 256v352H416V256h352m32-32H384v416h416V224z" fill="#333333" ></path><path d="M768 256v371.2L627.2 768H256V396.8L396.8 256H768m32-32H384l-160 160v416h416l160-160V224z" fill="#333333" ></path><path d="M755.2 256l-128 128H268.8l128-128h358.4M800 224H384l-160 160v32h416l160-160V224zM755.2 640l-128 128H268.8l128-128h358.4m44.8-32H384l-160 160v32h416l160-160v-32z" fill="#333333" ></path></symbol><symbol id="gld-bf-arrow-right" viewBox="0 0 1024 1024"><path d="M538.624 466.176L150.698667 853.248l60.245333 60.416 449.024-448L210.432 25.002667l-59.733333 60.928z"  ></path><path d="M879.957333 466.176L492.032 853.248l60.245333 60.416 449.024-448L551.765333 25.002667l-59.733333 60.928z"  ></path></symbol><symbol id="gld-bf-BIMFACE-logo" viewBox="0 0 6963 1024"><path d="M13.23008 23.3472l172.2368 172.2368V23.3472zM0 208.81408h172.19584L0 36.61824zM202.01472 23.3472v172.2368L374.21056 23.3472zM387.4816 208.81408V36.61824L215.2448 208.81408zM417.30048 23.3472l172.19584 172.2368V23.3472zM404.02944 36.61824v172.19584h172.2368zM606.04416 23.3472v172.2368L778.28096 23.3472zM791.51104 208.81408V36.61824L619.3152 208.81408zM821.32992 23.3472l172.19584 172.2368V23.3472zM808.05888 36.61824v172.19584h172.2368zM1010.0736 36.61824v172.19584h172.2368zM1023.34464 225.40288l172.19584 172.19584V225.40288zM1010.0736 238.63296v172.19584h172.2368zM1109.44256 513.51552l86.09792-86.09792h-172.19584zM1010.0736 440.64768v172.19584h172.2368zM1010.0736 629.43232v172.19584l172.2368-172.19584zM1195.54048 814.85824V642.6624l-172.19584 172.19584zM1010.0736 831.44704v172.19584l172.2368-172.19584zM808.05888 831.44704v172.19584l172.2368-172.19584zM821.32992 1016.91392h172.19584v-172.2368zM619.3152 831.44704l172.19584 172.19584V831.488zM606.04416 1016.91392h172.2368l-172.2368-172.2368zM404.02944 831.44704v172.19584L576.3072 831.488zM417.30048 1016.91392h172.19584v-172.2368zM808.05888 427.4176v172.19584l172.2368-172.19584zM993.52576 612.84352v-172.19584l-172.19584 172.19584zM791.51104 599.6544v-172.2368H619.3152zM606.04416 440.64768v172.19584h172.2368zM404.02944 427.4176v172.19584l172.2368-172.19584zM589.49632 612.84352v-172.19584l-172.19584 172.19584zM0 225.36192v172.2368l172.19584-172.2368zM13.23008 410.8288h172.2368V238.63296zM13.23008 427.37664l172.2368 172.2368v-172.2368zM0 612.84352h172.19584L0 440.64768zM0 629.43232v172.19584l172.19584-172.19584zM13.23008 814.85824h172.2368V642.6624zM13.23008 831.44704l172.2368 172.19584V831.488zM0 1016.91392h172.19584L0 844.67712zM1314.77504 23.3472l172.19584 172.2368V23.3472zM1301.54496 208.81408h172.19584L1301.54496 36.61824zM1473.7408 225.40288l-172.19584 172.19584V225.40288zM1486.97088 410.8288H1314.816l172.19584-172.19584zM1314.77504 427.4176l172.19584 172.19584v-172.19584zM1301.54496 612.84352h172.19584l-172.19584-172.19584zM1473.7408 629.43232l-172.19584 172.19584v-172.19584zM1486.97088 814.8992H1314.816l172.19584-172.2368zM1314.77504 831.44704l172.19584 172.19584V831.488zM1301.54496 1016.91392h172.19584l-172.19584-172.2368zM1606.20544 23.3472l172.2368 172.2368 110.592-172.19584zM2099.32288 523.4688l175.39072 175.39072 112.72192-175.43168zM2389.4016 559.88224l-102.52288 159.58016h215.08096l-102.52288-159.58016-4.99712-7.7824M1592.9344 36.61824v172.19584h172.2368zM1592.9344 225.40288v172.19584l172.2368-172.19584zM2083.10272 506.88V225.40288h-281.47712zM1794.99008 208.81408h288.11264L1909.18656 38.2976zM2099.69152 225.40288v282.17344h282.13248zM1778.44224 410.8288V238.63296l-172.2368 172.19584zM1778.44224 599.6544v-172.2368h-172.2368zM1592.9344 440.64768v172.19584h172.2368zM1592.9344 629.43232v172.19584l172.2368-172.19584zM1778.44224 814.85824V642.6624l-172.2368 172.19584zM1606.20544 831.44704l172.2368 172.19584V831.488zM1592.9344 1016.91392h172.2368l-172.19584-172.2368zM2899.7632 23.3472l110.63296 172.2368L3182.592 23.3472zM2514.1248 698.85952l175.39072-175.39072h-288.11264zM3023.6672 208.81408h172.19584V36.61824zM3195.86304 397.59872V225.40288H3023.6672zM2705.73568 506.88l281.47712-281.47712h-281.47712zM2705.73568 208.81408h288.11264L2879.65184 38.2976zM2689.14688 225.40288l-282.13248 282.17344h282.13248zM3010.39616 238.63296v172.19584H3182.592zM3010.39616 599.6544l172.19584-172.2368h-172.19584zM3195.86304 612.84352v-172.19584l-172.19584 172.19584zM3195.86304 801.62816v-172.19584H3023.6672zM3182.592 814.85824l-172.19584-172.19584v172.19584zM3010.39616 831.44704v172.19584L3182.592 831.488zM3023.6672 1016.91392h172.19584v-172.2368zM4172.84096 530.06336c0 27.4432-22.24128 49.68448-49.68448 49.68448M4123.15648 480.37888c27.4432 0 49.68448 22.24128 49.68448 49.68448M6010.88 917.54496H5504.2048a139.10016 139.10016 0 0 1-139.10016-139.10016V261.81632a139.10016 139.10016 0 0 1 139.10016-139.10016v0.08192l457.03168-0.08192h49.68448a49.68448 49.68448 0 0 0 0-99.36896H5504.2048a238.46912 238.46912 0 0 0-238.46912 238.46912v516.62848a238.46912 238.46912 0 0 0 238.46912 238.46912H6010.88a49.68448 49.68448 0 0 0 0-99.36896"  ></path><path d="M4123.15648 480.37888H3477.34016V222.08512a99.36896 99.36896 0 0 1 99.36896-99.36896h546.65216a49.64352 49.64352 0 0 0-0.2048-99.36896H3576.70912a198.73792 198.73792 0 0 0-198.69696 198.73792V1014.5792h99.328V579.74784h645.81632a49.68448 49.68448 0 1 0 0-99.36896M5121.88416 946.05312L4704.78848 60.29312l-0.4096-0.94208v-0.04096a59.5968 59.5968 0 0 0-109.3632 0v0.04096l-0.28672 0.69632-417.13664 886.00576a49.68448 49.68448 0 0 0 89.9072 42.31168l382.23872-812.35968 382.23872 812.35968a49.68448 49.68448 0 0 0 89.9072-42.31168M6855.39328 579.74784h49.68448a49.68448 49.68448 0 0 0 0-99.36896h-645.81632V222.08512a99.36896 99.36896 0 0 1 99.36896-99.36896v-0.12288l99.328 0.12288h447.11936a49.68448 49.68448 0 0 0 0-99.36896H6358.6304a198.69696 198.69696 0 0 0-198.69696 198.73792v596.09088a198.69696 198.69696 0 0 0 198.656 198.73792H6905.11872a49.68448 49.68448 0 0 0 0-99.36896H6358.6304a99.36896 99.36896 0 0 1-99.36896-99.36896v-238.42816h596.13184z"  ></path><path d="M4550.49216 817.72544l99.24608-237.9776 99.20512 237.9776z"  ></path></symbol><symbol id="gld-bf-warning-1" viewBox="0 0 1024 1024"><path d="M469.333333 682.666667h85.333334v85.333333h-85.333334v-85.333333z m0-384h85.333334v341.333333h-85.333334V298.666667z m42.666667 640c235.648 0 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667z m0 85.333333C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z"  ></path></symbol><symbol id="gld-bf-room-addnode" viewBox="0 0 1024 1024"><path d="M224 352v257.6a80 80 0 0 1 64 77.536V672h256.704A176.064 176.064 0 0 1 704 512.704L704 352h32v160.704a176 176 0 1 1-191.296 191.328L288 704l-0.032-15.136-0.128 4.384A80 80 0 1 1 192 609.6V352h32z m496 192a144 144 0 1 0 0 288 144 144 0 0 0 0-288z m16 64l-0.032 64H800v32h-64.032L736 768h-32l-0.032-64H640v-32h63.968L704 608h32zM208 640a48 48 0 1 0 0 96 48 48 0 0 0 0-96z m0-448A80 80 0 0 1 288 271.136V256h352v32H288l-0.032-15.136-0.128 4.384A80 80 0 1 1 208 192z m512 0a80 80 0 1 1 0 160 80 80 0 0 1 0-160z m-512 32a48 48 0 1 0 0 96 48 48 0 0 0 0-96z m512 0a48 48 0 1 0 0 96 48 48 0 0 0 0-96z"  ></path></symbol><symbol id="gld-bf-room-deletenode" viewBox="0 0 1024 1024"><path d="M224 352v257.6a80 80 0 0 1 64 77.536V672h256.704A176.064 176.064 0 0 1 704 512.704L704 352h32v160.704a176 176 0 1 1-191.296 191.328L288 704l-0.032-15.136-0.128 4.384A80 80 0 1 1 192 609.6V352h32z m496 192a144 144 0 1 0 0 288 144 144 0 0 0 0-288z m-512 96a48 48 0 1 0 0 96 48 48 0 0 0 0-96zM800 672v32h-160v-32h160zM208 192A80 80 0 0 1 288 271.136V256h352v32H288l-0.032-15.136-0.128 4.384A80 80 0 1 1 208 192z m512 0a80 80 0 1 1 0 160 80 80 0 0 1 0-160z m-512 32a48 48 0 1 0 0 96 48 48 0 0 0 0-96z m512 0a48 48 0 1 0 0 96 48 48 0 0 0 0-96z"  ></path></symbol><symbol id="gld-bf-room-dragnode" viewBox="0 0 1024 1024"><path d="M512 640v128h96l-112 128-112-128h96v-128h32z m256-256l128 112-128 112v-96.032L640 512v-32l128-0.032V384zM224 384v96h128v32H224v96l-128-112L224 384z m272 32a80 80 0 1 1 0 160 80 80 0 0 1 0-160z m0 32a48 48 0 1 0 0 96 48 48 0 0 0 0-96z m0-352L608 224h-96v128h-32V224h-96l112-128z"  ></path></symbol><symbol id="gld-bf-success--fill" viewBox="0 0 1024 1024"><path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zM288 448L192 544 416 768 832 352 736 256l-320 320-128-128z"  ></path></symbol><symbol id="gld-bf-information--fill" viewBox="0 0 1024 1024"><path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m64-320V384H384v64h64v256H384v64h256v-64H576zM448 192v128h128V192H448z"  ></path></symbol><symbol id="gld-bf-warning--fill" viewBox="0 0 1024 1024"><path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zM448 192v384h128V192H448z m0 448v128h128v-128H448z"  ></path></symbol><symbol id="gld-bf-fitpanel" viewBox="0 0 1024 1024"><path d="M768 256v448h-96v-32h64V288H352v64h-32V256h448z"  ></path><path d="M608 416v320H288V416h320z m-35.552 35.552H323.52v248.896h248.896V451.52z"  ></path></symbol><symbol id="gld-bf-explode" viewBox="0 0 1024 1024"><path d="M832 288l-320 160L192 288l320-160 320 160zM512 163.776L263.552 288 512 412.224 760.448 288 512 163.776zM128 384l320 160v352L128 736V384z m32 51.776v280.448l256 128v-280.448l-256-128zM896 736l-320 160V544l320-160z"  ></path></symbol><symbol id="gld-bf-n-ployline" viewBox="0 0 1024 1024"><path d="M128 591.104l683.136 239.104 10.592-30.208-596.864-208.896 640.128-224.032L453.696 224l-10.528 30.208 324.704 112.96z"  ></path></symbol><symbol id="gld-bf-elevation" viewBox="0 0 1024 1024"><path d="M224 352h640v32h-284L384 608l-224-256h64z m313.472 32H230.528L384 559.392 537.472 384zM640 672v32H160v-32z" fill="#333333" ></path></symbol><symbol id="gld-bf-rotate-horizontal" viewBox="0 0 1024 1024"><path d="M224 512v32h320v-32zM704 512v32h96v-32z"  ></path><path d="M512 728.48v34.4c73.024-23.712 128-127.04 128-250.88 0-141.376-71.648-256-160-256-74.56 0-137.184 81.6-154.944 192h32.416c16.448-93.664 67.648-160 122.528-160 66.72 0 128 98.048 128 224 0 105.376-42.88 191.232-96 216.48z"  ></path><path d="M512 640l-16 122.88 128-10.88z"  ></path></symbol><symbol id="gld-bf-rotate-vertical" viewBox="0 0 1024 1024"><path d="M512 224h32v320h-32zM512 704h32v96h-32z"  ></path><path d="M728.48 512h34.4c-23.712 73.024-127.04 128-250.88 128-141.376 0-256-71.648-256-160 0-74.56 81.6-137.184 192-154.944v32.416c-93.664 16.448-160 67.648-160 122.528 0 66.72 98.048 128 224 128 105.376 0 191.232-42.88 216.48-96z"  ></path><path d="M640 512l122.88-16-10.88 128z"  ></path></symbol><symbol id="gld-bf-hide-slice" viewBox="0 0 1024 1024"><path d="M586.72 518.848l-25.664-25.664A241.408 241.408 0 0 1 640 480c94.272 0 179.584 53.344 256 160-28.8 40.224-58.88 72.832-90.24 97.92l-22.72-22.784c24.96-19.52 49.312-44.512 73.056-75.136-66.912-86.304-138.688-128-216.096-128-18.048 0-35.84 2.24-53.28 6.848z m-89.728 46.016c-24.992 19.52-49.344 44.512-73.088 75.136 66.912 86.304 138.688 128 216.096 128 18.048 0 35.84-2.24 53.28-6.848l25.664 25.664c-25.6 8.8-51.904 13.184-78.944 13.184-94.272 0-179.584-53.344-256-160 28.8-40.224 58.88-72.832 90.24-97.92l22.72 22.784h0.032z" fill="#333333" ></path><path d="M703.872 636a64 64 0 0 0-59.84-59.872l-28.896-28.864a96.128 96.128 0 0 1 117.6 117.6l-28.864-28.864z m-127.744 8a64 64 0 0 0 59.84 59.872l28.896 28.864a96.128 96.128 0 0 1-117.6-117.6l28.864 28.864zM480 457.376L819.424 796.8l-22.656 22.624L457.376 480z" fill="#333333" ></path><path d="M384 736v32H128V192h640v256h-32V224H160v512z" fill="#333333" ></path></symbol><symbol id="gld-bf-distance-min" viewBox="0 0 1024 1024"><path d="M224 704v64h608v-64H224z m-32-32h672v128H192v-128z m64-192h512v32H256v-32z m64-224h128v32h-32v96h-32V288h-32v96h-32V256z m128 128V288h32v96h-32z m96-160v32h-32V224h32z m0 64v96h-32V288h32z m128 96V288h32v96h-32z m-64-96v96h-32V256h96v32h-64z" fill="#333333" ></path><path d="M192 375.584l29.44-12.608L278.464 496l-56.96 133.024-29.44-12.608L243.616 496 192 375.584z m646.432 0l-29.44-12.608-56.96 133.024 56.96 133.024 29.44-12.608-51.616-120.416 51.648-120.416h-0.032z" fill="#333333" ></path></symbol><symbol id="gld-bf-area" viewBox="0 0 1024 1024"><path d="M841.6 704L550.4 288H192v416M160 256h409.6L896 736H160V256z m0-32" fill="#333333" ></path><path d="M336 345.6l22.4 22.4-86.4 86.4-22.4-22.4 86.4-86.4z m160 0l22.4 22.4-246.4 246.4-22.4-22.4 246.4-246.4z m64 96l22.4 22.4-182.4 182.4-22.4-22.4 182.4-182.4z m64 96l22.4 22.4-86.4 86.4-22.4-22.4 86.4-86.4z m64 0" fill="#333333" ></path></symbol><symbol id="gld-bf-fittobox" viewBox="0 0 1024 1024"><path d="M496 224L256 352v256l240 128 240-128v-256l-240-128z m198.4 137.6l-198.4 102.4-195.2-102.4 195.2-102.4 198.4 102.4zM288 582.4v-192l192 99.2v201.6l-192-99.2v-9.6z m416 9.6l-192 99.2v-201.6l192-99.2v201.6z" fill="#515151" ></path><path d="M352 128H128v224h32V160h192zM352 864H128v-224h32v192h192zM640 128h224v224h-32V160h-192zM640 864h224v-224h-32v192h-192z" fill="#515151" ></path></symbol><symbol id="gld-bf-delete" viewBox="0 0 1024 1024"><path d="M640 192V128H384v64H128v64h768V192zM192 320v544c0 52.928 43.072 96 96 96h448c52.928 0 96-43.072 96-96V320H192z m64 512V384h128v448H256z m192 0V384h128v448H448z m320 0h-128V384h128v448z"  ></path></symbol><symbol id="gld-bf-route" viewBox="0 0 1024 1024"><path d="M240 288a112 112 0 1 1 0-224 112 112 0 0 1 0 224zM224 288h32v128H224V288z m0 192h32v128H224v-128z m576-160h32v128h-32v-128z m0 192h32v118.144h-32V512zM240 896a112 112 0 1 1 0-224 112 112 0 0 1 0 224z m576-608a112 112 0 1 1 0-224 112 112 0 0 1 0 224z m-576 320a176 176 0 1 1 0 352 176 176 0 0 1 0-352z m0 32a144 144 0 1 0 0 288 144 144 0 0 0 0-288z m576-32a112 112 0 1 1 0 224 112 112 0 0 1 0-224z m-179.008-69.44l91.84 89.12-22.272 22.976-91.84-89.152 22.272-22.944zM499.2 404.8l91.84 89.184-22.272 22.944-91.84-89.152 22.272-22.944z m-137.76-133.696l91.84 89.152-22.272 22.944-91.84-89.152 22.272-22.944zM223.648 137.376l91.84 89.152-22.272 22.944-91.84-89.12 22.272-22.976z" fill="#000000" ></path></symbol><symbol id="gld-bf-n-cloud" viewBox="0 0 1024 1024"><path d="M694.4 192C752 192 800 240 800 297.6c0 48-32 86.4-73.6 99.2 41.6 12.8 73.6 51.2 73.6 99.2s-32 86.4-73.6 99.2c41.6 12.8 73.6 54.4 73.6 99.2 0 57.6-48 105.6-105.6 105.6-48 0-86.4-32-99.2-73.6C582.4 768 544 800 496 800s-86.4-32-99.2-73.6C384 768 342.4 800 297.6 800 240 800 192 752 192 694.4c0-48 32-86.4 73.6-99.2C224 582.4 192 544 192 496s32-86.4 73.6-99.2C224 384 192 342.4 192 297.6 192 240 240 192 297.6 192c48 0 86.4 32 99.2 73.6C409.6 224 448 192 496 192s86.4 32 99.2 73.6C608 224 649.6 192 694.4 192m0-32c-38.4 0-73.6 19.2-99.2 44.8-25.6-25.6-60.8-44.8-99.2-44.8s-73.6 19.2-99.2 44.8C371.2 179.2 336 160 297.6 160 220.8 160 160 220.8 160 297.6c0 38.4 19.2 73.6 44.8 99.2-25.6 25.6-44.8 60.8-44.8 99.2s19.2 73.6 44.8 99.2c-25.6 25.6-44.8 60.8-44.8 99.2C160 771.2 220.8 832 297.6 832c38.4 0 73.6-19.2 99.2-44.8 25.6 25.6 60.8 44.8 99.2 44.8s73.6-19.2 99.2-44.8c25.6 28.8 60.8 44.8 99.2 44.8 76.8 0 137.6-60.8 137.6-137.6 0-38.4-19.2-73.6-44.8-99.2 25.6-25.6 44.8-60.8 44.8-99.2s-19.2-73.6-44.8-99.2c28.8-25.6 44.8-60.8 44.8-99.2C832 220.8 771.2 160 694.4 160z"  ></path></symbol><symbol id="gld-bf-up" viewBox="0 0 1129 1024"><path d="M600.275862 564.965517v459.034483h-105.931034V564.965517H15.677793L564.965517 15.677793 1114.253241 564.965517H600.275862z"  ></path></symbol><symbol id="gld-bf-down" viewBox="0 0 1129 1024"><path d="M600.275862 459.034483V0h-105.931034v459.034483H15.677793L564.965517 1008.322207 1114.253241 459.034483H600.275862z"  ></path></symbol><symbol id="gld-bf-transparent" viewBox="0 0 1024 1024"><path d="M512 0L32 256v512l480 256 480-256V256z m394.24 273.28L512 476.16 120.96 274.56 512 70.4zM96 718.08v-384l384 197.76v402.56l-384-198.4z m832 17.92l-384 198.4V531.84l384-197.76v401.92z"  ></path></symbol><symbol id="gld-bf-untransparent" viewBox="0 0 1024 1024"><path d="M968.56051 244.585987l-456.56051 238.063695-456.56051-238.063695L512 0zM22.828025 306.547771l456.56051 235.454777v481.997452L22.828025 782.675159zM1001.171975 782.675159l-456.56051 241.324841V542.002548l456.56051-235.454777z"  ></path></symbol><symbol id="gld-bf-properties-" viewBox="0 0 1024 1024"><path d="M320 320v64H256V320h64z m448 0v64H384V320h384zM320 512v64H256V512h64z m448 0v64H384V512h384z m-448 192v64H256v-64h64z m448 0v64H384v-64h384zM64 0v960h896V0H64z m64 896V192h768v704H128z" fill="#333333" ></path></symbol><symbol id="gld-bf-ncloud" viewBox="0 0 1024 1024"><path d="M795.5 492c0.2-4.7 0.2-9 0.2-12.4 0-56.4-22-109.3-61.8-149.2-39.8-39.8-92.8-61.8-149.2-61.8-43.7 0-86.6 14.8-124.2 43-25.7 19.2-47.2 43.6-62.8 70.8-17-8.9-35.9-13.5-55.5-13.5-31.3 0-61.4 14.5-84.7 40.9-15.6 17.6-26.7 39-32 61.2-26.4 10.5-50 28.4-67 51.2-19.9 26.7-30.5 58.5-30.5 91.9 0 84.8 69 153.9 153.9 153.9l0-0.4L781 767.6l0 0.2c76.1 0 138-61.9 138-138C919.1 559 864.6 499.7 795.5 492L795.5 492zM786.6 736 786.6 736l-514.1-0.1C209.6 731 160 678.4 160 614.4c0-52.8 33.4-99.8 83.3-116.4 0.2-0.1 0.3-0.1 0.4-0.2 5-1.4 8.8-5.5 9.7-10.8 7.1-42.7 44.2-85.9 88.9-85.9 18.3 0 35.9 5.5 50.8 16 1.5 1.4 3.3 2.5 5.3 3.2l0 0c7.8 2.9 16.5-0.7 20-8.3 30.3-65.2 98-111.3 166.3-111.3 98.7 0 179 80.3 179 179 0 6.7-0.4 17.2-1 26.4-0.5 8.2 5.2 15.5 13.3 16.9l0 0c1.4 0.2 2.8 0.3 4.2 0.1l0 0.1c58.5 0 106.9 48.4 106.9 106.9C887.2 686.7 842.5 733.1 786.6 736L786.6 736z"  ></path></symbol><symbol id="gld-bf-axial-" viewBox="0 0 1024 1024"><path d="M608 128h32v736h-32V128z m128 128v32H928v416h-192v32h224V256h-224zM96 256h32v96H96V256z m0 192h32v96H96v-96z m0 192h32v96H96v-96z m320 64v32h96v-32h-96z m-192 0h96v32H224v-32zM224 256v32h96V256H224z m192 0h96v32h-96V256zM256 480h224v32H256z"  ></path></symbol><symbol id="gld-bf-sectionbox1" viewBox="0 0 1024 1024"><path d="M592 128L160 345.056V717.12l304 155.04L896 655.104V283.04L592 128z m269.664 172.544L464 500.064 194.368 362.56l397.664-200.096 269.632 138.08zM192 396.384l256 130.56v302.016l-256-130.56v-302.016z m672 240l-384 192.576v-302.016l384-192.576v302.016z"  ></path></symbol><symbol id="gld-bf-axial" viewBox="0 0 1024 1024"><path d="M416 128h-32v736h32V128zM288 256v32H96v416h192v32H64V256h224z m640 0h-32v96h32V256z m0 192h-32v96h32v-96z m0 192h-32v96h32v-96z m-320 64v32h-96v-32h96z m192 0h-96v32h96v-32z m0-448v32h-96V256h96z m-192 0h-96v32h96V256zM544 480h224v32h-224z"  ></path><path d="M672 384v224h-32v-224z"  ></path></symbol><symbol id="gld-bf-section-axial" viewBox="0 0 1024 1024"><path d="M320 749.76V362.016l256-173.632v387.744l-256 173.632z m-32 60.384l320-217.056V128L288 345.056v465.088z"  ></path><path d="M750.4 640.928l-15.52 26.848-277.12-160 15.488-26.88 277.12 160z m46.368-83.072l81.536 177.28-188.8 15.424 107.264-192.704z"  ></path></symbol><symbol id="gld-bf-min-" viewBox="0 0 1024 1024"><path d="M64 576v64h275.2L12.8 966.4l44.8 44.8L384 684.8V960h64V576H64z m838.4-499.2L576 403.2V128H512v384h384V448H620.8l326.4-326.4-44.8-44.8z"  ></path></symbol><symbol id="gld-bf-max-" viewBox="0 0 1024 1024"><path d="M576 64v64h275.2L524.8 454.4l44.8 44.8L896 172.8V448h64V64H576zM454.4 524.8L128 851.2V576H64v384h384v-64H172.8l326.4-326.4-44.8-44.8z"  ></path></symbol><symbol id="gld-bf-show" viewBox="0 0 1024 1024"><path d="M85.333333 505.941333S230.101333 256 512 256c286.378667 0 426.666667 251.050667 426.666667 251.050667s-139.221333 248.362667-426.666667 251.52c-292.309333 3.2-426.666667-252.586667-426.666667-252.586667zM512 682.666667a170.666667 170.666667 0 1 0 0-341.333334 170.666667 170.666667 0 0 0 0 341.333334z m0-42.666667a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"  ></path></symbol><symbol id="gld-bf-hide" viewBox="0 0 1024 1024"><path d="M235.733333 213.333333l592.213334 592.213334-29.568 29.610666L206.165333 243.029333 235.690667 213.333333z m688.128 283.093334c-5.632-9.386667-141.482667-229.674667-412.757333-229.674667-52.096 0-99.114667 8.234667-141.226667 21.333333l34.261334 34.261334a428.8 428.8 0 0 1 106.965333-13.866667c250.752 0 376.917333 209.408 376.917333 209.408s-48.426667 81.152-145.792 142.378667l30.336 30.378666c98.048-64.426667 148.181333-145.792 151.466667-151.296l12.8-21.589333-12.970667-21.333333z m-306.090666 217.258666a425.984 425.984 0 0 1-106.666667 13.738667c-250.026667 0-376.96-209.408-376.96-209.408s48.682667-80.896 145.792-142.122667l-30.336-30.378666c-97.792 64.256-148.053333 145.28-151.296 150.912L85.333333 518.016l13.098667 21.589333c5.632 9.429333 142.122667 229.717333 412.672 229.717334 52.053333 0 99.072-8.106667 141.056-21.205334l-34.389333-34.432z m-138.88-316.586666c10.325333-2.773333 21.077333-4.693333 32.213333-4.693334a125.866667 125.866667 0 0 1 125.610667 125.610667c0 11.264-1.962667 21.845333-4.693334 32.213333l33.237334 33.237334a167.509333 167.509333 0 0 0-219.733334-219.605334l33.365334 33.237334z m64.128 241.834666c-10.325333 2.773333-20.906667 4.693333-31.914667 4.693334a125.866667 125.866667 0 0 1-125.653333-125.610667c0-11.093333 1.962667-21.76 4.693333-31.914667l-33.237333-33.28a167.509333 167.509333 0 0 0 219.605333 219.605334l-33.493333-33.493334z"  ></path></symbol><symbol id="gld-bf-layers" viewBox="0 0 1024 1024"><path d="M512 512L118.4 352 512 192l393.6 160L512 512z m-310.4-160l310.4 128 310.4-128L512 224l-310.4 128z"  ></path><path d="M707.2 464l115.2 48-310.4 128-310.4-128 115.2-48-41.6-16-156.8 64L512 672l393.6-160-156.8-64z"  ></path><path d="M707.2 624l115.2 48-310.4 128-310.4-128 115.2-48-41.6-16-156.8 64L512 832l393.6-160-156.8-64z"  ></path></symbol><symbol id="gld-bf-distance" viewBox="0 0 1024 1024"><path d="M800 480v256H192v-256h608z m-32 32H224v192h544v-192z" fill="#333333" ></path><path d="M672 608.032h32v-96h-32zM576 608.032h32v-96h-32zM384 608.032h32v-96h-32zM480 640h32v-128h-32zM288 608.032h32v-96H288zM192 352h608v-32H192z" fill="#333333" ></path><path d="M768 384.032h32V288h-32v96.032z m-576 0h32V288H192v96.032z" fill="#333333" ></path></symbol><symbol id="gld-bf-angle" viewBox="0 0 1024 1024"><path d="M192 704v64h640v-64H192z m-32-32h704v128H160v-128z" fill="#333333" ></path><path d="M216.736 672.608l-18.336-25.088L692.064 256.608l18.336 25.088z" fill="#333333" ></path><path d="M288 439.072c136.512 23.456 203.616 111.136 192.416 264.928h-32.8c10.112-138.08-40.128-212.544-159.616-233.024v-31.904z" fill="#333333" ></path></symbol><symbol id="gld-bf-view" viewBox="0 0 1024 1024"><path d="M528 160L224 320v384l304 160 304-160V320l-0.032 0.032M528.032 195.584L797.664 338.08 528 480 258.368 338.08l269.664-142.496zM256 372.992l256 134.752v311.68L256 684.672v-311.68z m544 311.68L544 819.424v-311.68l256-134.752v311.68z"  ></path></symbol><symbol id="gld-bf-orbit" viewBox="0 0 1024 1024"><path d="M774.816 705.536C717.76 784.704 625.472 832 528 832c-167.616 0-304-136.384-304-304h64l-80-128-80 128h64c0 185.28 150.72 336 336 336 107.712 0 209.696-52.256 272.736-139.776l-25.92-18.688zM864 528c0-185.28-150.72-336-336-336-108.928 0-211.584 53.184-274.56 142.24l26.112 18.464C336.576 272.128 429.44 224 528 224c167.616 0 304 136.384 304 304h-64l80 128 80-128h-64z"  ></path><path d="M688 416l-160-64v0.224l-159.712 63.872L368 416v224l160 64 160-64V416zM512 663.136l-112-44.8V463.264l112 44.8v155.072zM411.328 433.344L528 386.496v0.032l116.896 46.688L528 480l-116.672-46.656zM656 618.336l-112 44.8V508.064l112-44.8v155.072z"  ></path></symbol><symbol id="gld-bf-pan" viewBox="0 0 1024 1024"><path d="M528 496H768V416l128 96-128 96v-80h-240V768H608l-96 96-96-96h80v-240H256V608l-128-96 128-96v80h240V256H416l96-128 96 128h-80v240z"  ></path></symbol><symbol id="gld-bf-zoom" viewBox="0 0 1024 1024"><path d="M512 202.816L308.16 384h168.096L512 670.016 547.744 384h168.096L512 202.816zM594.752 704h-165.504L512 786.752 594.752 704z m-147.008-32l0.512 3.968 3.52-3.968H480l-3.52-28.032L480 640h-4L448 416H224l288-256 288 256h-224l-28 224H544l3.52 3.968L544 672h28.256l3.52 3.968 0.48-3.968H672l-160 160-160-160h95.744z"  ></path></symbol><symbol id="gld-bf-add" viewBox="0 0 1024 1024"><path d="M448 448H128v128h320v320h128V576h320V448H576V128H448v320z"  ></path></symbol><symbol id="gld-bf-minus" viewBox="0 0 1024 1024"><path d="M128 448h768v128H128z"  ></path></symbol><symbol id="gld-bf-firstperson" viewBox="0 0 1024 1024"><path d="M528 224a80 80 0 1 0 0-160 80 80 0 0 0 0 160z m0 32a112 112 0 1 1 0-224 112 112 0 1 1 0 224z"  ></path><path d="M612.096 256h-170.624c-64.48 0-89.088 51.392-95.744 113.632L320 576.832c0 18.016 11.872 31.68 32.512 31.68s29.728-13.024 31.712-31.872l32.576-194.496 0.16 531.104c0 27.072 19.328 46.752 47.04 46.752 27.68 0 48.032-18.592 48.448-48.096L512 640h32l0.448 271.808c0 27.072 15.68 48.192 47.552 48.192 27.712 0 48.288-21.28 48.288-48.352l1.632-529.504 30.688 194.08c2.624 19.264 11.008 32.192 31.648 32.192s30.208-11.776 31.968-32.448l-23.424-211.136C707.392 302.912 676.544 256 612.096 256z m60.192 655.648A79.424 79.424 0 0 1 592 992c-28.096 0-50.336-11.456-64.096-30.08-14.4 18.752-37.184 30.08-63.904 30.08-45.216 0-79.04-33.856-79.04-78.72l-0.096-280.64a65.28 65.28 0 0 1-32.352 7.872c-37.728 0-64.512-27.36-64.512-63.68l0.256-3.936 25.664-206.656C323.2 279.36 363.52 224 441.472 224h170.624c78.656 0 125.344 55.264 132.48 137.28l23.456 211.168 0.064 6.24c-3.168 37.184-26.24 61.728-63.84 61.728-12.032 0-22.4-2.56-31.104-7.168l-0.864 278.4z"  ></path></symbol><symbol id="gld-bf-measure" viewBox="0 0 1024 1024"><path d="M160 672h736v-256H160v256z m-32-288h800v320H128V384z m0-32h800v32H128v-32z"  ></path><path d="M224 416h32v96H224v-96z m96 0h32v96h-32v-96z m96 0h32v96h-32v-96z m192 0h32v96h-32v-96z m-96 0h32v160h-32v-160z m192 0h32v96h-32v-96z m96 0h32v96h-32v-96z"  ></path></symbol><symbol id="gld-bf-notes" viewBox="0 0 1024 1024"><path d="M192 768.672l640 0 0 64-640 0 0-64Z"  ></path><path d="M931.904 775.2"  ></path><path d="M1191.008 516.096"  ></path><path d="M1214.56 492.544"  ></path><path d="M166.4 439.712 165.76 438.592 167.04 438.592Z"  ></path><path d="M359.712 682.784l-134.88 22.464 22.464-134.848L359.712 682.784zM359.712 682.784"  ></path><path d="M725.44 317.056l39.328-39.328-112.384-112.384-39.328 39.328L725.44 317.056zM725.44 317.056"  ></path><path d="M702.656 339.84 590.272 227.488 269.792 547.936 382.176 660.288 495.456 547.04 495.456 547.04Z"  ></path></symbol><symbol id="gld-bf-narrow" viewBox="0 0 1024 1024"><path d="M352 480l192 192-288 96L352 480zM292 754.9l-22-23.3L768 256l23.5 24L292 754.9z"  ></path></symbol><symbol id="gld-bf-noval" viewBox="0 0 1024 1024"><path d="M512 192c158.8 0 288 129.2 288 288S670.8 768 512 768 224 638.8 224 480 353.2 192 512 192M512 160c-176.7 0-320 143.3-320 320s143.3 320 320 320 320-143.3 320-320S688.7 160 512 160L512 160z"  ></path></symbol><symbol id="gld-bf-nrectangle" viewBox="0 0 1024 1024"><path d="M800.2 256.1l0 447.7-576.3 0L223.9 256.1 800.2 256.1M832.2 224.1 191.8 224.1l0 511.7 640.3 0L832.2 224.1 832.2 224.1z"  ></path></symbol><symbol id="gld-bf-ntext" viewBox="0 0 1024 1024"><path d="M784 224l0 150.4-14.6 0c-8.7-34.4-18.3-58.5-28.8-73.6s-25.1-27-43.5-36c-10.3-4.9-28.3-7.3-54-7.3l-41 0 0 425c0 28.2 1.6 45.8 4.7 52.8s9.2 13.2 18.2 18.5c9.1 5.3 21.5 7.9 37.2 7.9l18.3 0 0 15L392.1 776.7l0-15 18.3 0c16 0 28.8-2.8 38.6-8.5 7-3.8 12.6-10.3 16.7-19.5 3-6.5 4.5-23.6 4.5-51.2l0-424.9-39.8 0c-37.1 0-64.1 7.9-80.8 23.6-23.6 22-38.5 52.6-44.7 93.3L288 374.5 288 224 784 224z"  ></path></symbol><symbol id="gld-bf-mark" viewBox="0 0 1024 1024"><path d="M192.2 800.2l608-608.2 22.6 22.6-608 608.2C214.8 822.8 192.2 800.2 192.2 800.2zM809.6 822.8l-608-608.2 22.6-22.6 608 608.2C832.2 800.2 809.6 822.8 809.6 822.8z"  ></path></symbol><symbol id="gld-bf-zoomrect" viewBox="0 0 1024 1024"><path d="M886.4 809.6l-96-96c25.6-28.8 41.6-64 41.6-105.6 0-9.6 0-19.2-3.2-28.8v-6.4c-3.2-9.6-3.2-16-6.4-22.4 0-3.2-3.2-6.4-3.2-9.6-3.2-6.4-6.4-9.6-9.6-16-3.2-6.4-6.4-9.6-9.6-16l-6.4-6.4c-6.4-9.6-16-16-22.4-22.4v-288h-512v512h288c6.4 9.6 12.8 16 22.4 22.4l6.4 6.4c6.4 3.2 9.6 6.4 16 9.6 6.4 3.2 9.6 6.4 16 9.6 3.2 0 6.4 3.2 9.6 3.2 6.4 3.2 16 6.4 22.4 6.4h6.4c9.6 3.2 19.2 3.2 28.8 3.2 35.2 0 67.2-12.8 96-32l96 96 19.2-19.2zM288 672v-448h448v236.8c-19.2-9.6-41.6-12.8-64-12.8-89.6 0-160 70.4-160 160 0 22.4 6.4 44.8 12.8 64h-236.8z m384 64c-9.6 0-19.2 0-28.8-3.2-3.2 0-3.2 0-6.4-3.2-6.4-3.2-12.8-3.2-19.2-6.4-3.2 0-3.2-3.2-6.4-3.2-6.4-3.2-12.8-6.4-19.2-12.8 0 0-3.2 0-3.2-3.2l-19.2-19.2-6.4-6.4c-12.8-19.2-19.2-44.8-19.2-70.4 0-70.4 57.6-128 128-128 25.6 0 48 6.4 70.4 19.2l6.4 6.4c6.4 6.4 16 12.8 19.2 19.2 0 0 0 3.2 3.2 3.2 6.4 6.4 9.6 12.8 12.8 19.2 0 3.2 3.2 3.2 3.2 6.4 3.2 6.4 6.4 12.8 6.4 19.2 0 3.2 0 3.2 3.2 6.4 3.2 9.6 3.2 19.2 3.2 28.8 0 70.4-57.6 128-128 128z"  ></path></symbol><symbol id="gld-bf-selected" viewBox="0 0 1024 1024"><path d="M930.133333 315.733333L827.733333 213.333333 409.6 631.466667 196.266667 418.133333 85.333333 529.066667l213.333334 213.333333 102.4 102.4L512 742.4l418.133333-426.666667z" fill="#333333" ></path></symbol><symbol id="gld-bf-tree" viewBox="0 0 1024 1024"><path d="M800 672v-192h-288V288h96V128h-224v160h96v192H192v192H128v160h160v-160H224v-160h256v160h-64v160h160v-160h-64v-160h256v160h-64v160h160v-160z"  ></path></symbol><symbol id="gld-bf-infor" viewBox="0 0 1024 1024"><path d="M512 85.333333c238.933333 0 426.666667 187.733333 426.666667 426.666667s-187.733333 426.666667-426.666667 426.666667-426.666667-187.733333-426.666667-426.666667 187.733333-426.666667 426.666667-426.666667m0-85.333333C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512-230.4-512-512-512z"  ></path><path d="M469.333333 256h85.333334v85.333333h-85.333334zM469.333333 426.666667h85.333334v341.333333h-85.333334z"  ></path></symbol><symbol id="gld-bf-box-hide" viewBox="0 0 1024 1024"><path d="M528 128L96 352v352l304 160 131.2-67.2c-9.6-9.6-22.4-12.8-32-19.2L416 819.2v-278.4l384-198.4v188.8c9.6 3.2 22.4 6.4 32 9.6V288l-304-160zM128 684.8v-278.4l256 134.4v278.4l-256-134.4z m272-172.8l-268.8-140.8 396.8-208 268.8 144L400 512z" fill="#333333" ></path><path d="M682.72 582.848l-25.664-25.664A241.408 241.408 0 0 1 736 544c94.272 0 179.584 53.344 256 160-28.8 40.224-58.88 72.832-90.24 97.92l-22.72-22.784c24.96-19.52 49.312-44.512 73.056-75.136-66.912-86.304-138.688-128-216.096-128-18.048 0-35.84 2.24-53.28 6.848z m-89.728 46.016c-24.992 19.52-49.344 44.512-73.088 75.136 66.912 86.304 138.688 128 216.096 128 18.048 0 35.84-2.24 53.28-6.848l25.664 25.664c-25.6 8.8-51.904 13.184-78.944 13.184-94.272 0-179.584-53.344-256-160 28.8-40.224 58.88-72.832 90.24-97.92l22.72 22.784h0.032z" fill="#333333" ></path><path d="M799.872 700a64 64 0 0 0-59.84-59.872l-28.896-28.864a96.128 96.128 0 0 1 117.6 117.6l-28.864-28.864z m-127.744 8a64 64 0 0 0 59.84 59.872l28.896 28.864a96.128 96.128 0 0 1-117.6-117.6l28.864 28.864zM576 521.376L915.424 860.8l-22.656 22.624L553.376 544z" fill="#333333" ></path></symbol><symbol id="gld-bf-information" viewBox="0 0 1024 1024"><path d="M512 160c195.2 0 352 156.8 352 352s-156.8 352-352 352S160 707.2 160 512 316.8 160 512 160m0-32C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z"  ></path><path d="M480 320h64v64h-64zM480 448h64v256h-64z"  ></path></symbol><symbol id="gld-bf-properties" viewBox="0 0 1024 1024"><path d="M1191.008 516.096"  ></path><path d="M1214.56 492.544"  ></path><path d="M288 416l64 0 0 64-64 0 0-64Z"  ></path><path d="M416 416l352 0 0 64-352 0 0-64Z"  ></path><path d="M288 544l64 0 0 64-64 0 0-64Z"  ></path><path d="M416 544l352 0 0 64-352 0 0-64Z"  ></path><path d="M288 672l64 0 0 64-64 0 0-64Z"  ></path><path d="M416 672l352 0 0 64-352 0 0-64Z"  ></path><path d="M852 160 192 160l0 160 0 544 672 0L864 160 852 160zM384 208l64 0 0 64-64 0L384 208zM288 208l64 0 0 64L288 272 288 208zM832 832 224 832 224 320l608 0L832 832z"  ></path></symbol><symbol id="gld-bf-map" viewBox="0 0 1024 1024"><path d="M656 96C524.8 96 416 201.6 416 336S656 736 656 736 896 467.2 896 336 790.4 96 656 96z m0 339.2c-67.2 0-121.6-54.4-121.6-121.6 0-67.2 54.4-121.6 121.6-121.6s121.6 54.4 121.6 121.6c0 67.2-54.4 121.6-121.6 121.6zM128 704h480v32H128zM128 416h288v32h-288z"  ></path><path d="M320 256h32v672h-32zM640 768h32v160h-32zM704 704h160v32h-160z"  ></path></symbol><symbol id="gld-bf-maximize" viewBox="0 0 1024 1024"><path d="M608 192v32h169.6l-227.2 227.2 22.4 22.4L800 246.4V416h32V192zM451.2 550.4L224 777.6V608H192v224h224v-32H246.4l227.2-227.2z"  ></path><path d="M896 128v768H128V128h768m32-32H96v832h832V96z"  ></path></symbol><symbol id="gld-bf-minimize" viewBox="0 0 1024 1024"><path d="M256 544v32h169.6l-227.2 227.2 22.4 22.4 227.2-227.2V768h32v-224zM803.2 198.4L576 425.6V256h-32v224h224v-32h-169.6l227.2-227.2z"  ></path><path d="M896 128v768H128V128h768m32-32H96v832h832V96z"  ></path></symbol><symbol id="gld-bf-reset-box" viewBox="0 0 1024 1024"><path d="M210.56 672l112-160h-224z" fill="#333333" ></path><path d="M530.016 864v-32a304 304 0 1 0-304-304h-32c0-185.568 150.4-336 336-336 185.568 0 336 150.432 336 336S715.552 864 530.016 864z" fill="#333333" ></path></symbol><symbol id="gld-bf-rotate-box" viewBox="0 0 1024 1024"><path d="M528 832c-166.4 0-304-137.6-304-304h64l-80-128-80 128h64C192 713.6 342.4 864 528 864c108.8 0 211.2-51.2 272-140.8l-25.6-19.2c-57.6 80-150.4 128-246.4 128zM864 528C864 342.4 713.6 192 528 192c-108.8 0-211.2 54.4-275.2 140.8l25.6 19.2c57.6-80 150.4-128 249.6-128C694.4 224 832 361.6 832 528h-64l80 128 80-128h-64z"  ></path><path d="M640 416v224h-224V416h224m32-32h-288v288h288V384z"  ></path></symbol><symbol id="gld-bf-close16" viewBox="0 0 1024 1024"><path d="M929.7 873.9 567.8 511.8l361.4-361.6c11.9-11.9 11.9-31.2 0-43.2l-12.7-12.7c-11.9-11.9-31.2-11.9-43.1 0L512 455.9 150.6 94.3c-11.9-11.9-31.2-11.9-43.1 0L94.8 107c-11.9 11.9-11.9 31.2 0 43.2l361.4 361.6L94.2 873.9c-11.9 11.9-11.9 31.3 0 43.2l12.7 12.7c11.9 11.9 31.2 11.9 43.1 0L512 567.6l361.9 362.1c11.9 11.9 31.2 11.9 43.1 0l12.7-12.7C941.6 905.1 941.6 885.8 929.7 873.9z"  ></path></symbol><symbol id="gld-bf-orbitcamera" viewBox="0 0 1024 1024"><path d="M512 32"  ></path><path d="M528 832C360.384 832 224 695.616 224 528l64 0-80-128-80 128 64 0C192 713.28 342.72 864 528 864c107.712 0 209.696-52.256 272.736-139.776l-25.952-18.688C717.76 784.704 625.472 832 528 832z"  ></path><path d="M864 528C864 342.72 713.28 192 528 192c-108.928 0-211.584 53.184-274.56 142.24l26.112 18.464C336.576 272.128 429.44 224 528 224c167.616 0 304 136.384 304 304l-64 0 80 128 80-128L864 528z"  ></path><path d="M704 416l-96 48L608 416l-256 0 0 224 256 0 0-48 96 48L704 416zM576 608l-192 0 0-160 192 0 0 32 0 96L576 608zM672 588.224l-64-32 0-56.448 64-32L672 588.224z"  ></path></symbol><symbol id="gld-bf-orbitpoint" viewBox="0 0 1024 1024"><path d="M512 32"  ></path><path d="M528 832C360.384 832 224 695.616 224 528l64 0-80-128-80 128 64 0C192 713.28 342.72 864 528 864c107.712 0 209.696-52.256 272.736-139.776l-25.952-18.688C717.76 784.704 625.472 832 528 832z"  ></path><path d="M864 528C864 342.72 713.28 192 528 192c-108.928 0-211.584 53.184-274.56 142.24l26.112 18.464C336.576 272.128 429.44 224 528 224c167.616 0 304 136.384 304 304l-64 0 80 128 80-128L864 528z"  ></path><path d="M528 528m-112 0a3.5 3.5 0 1 0 224 0 3.5 3.5 0 1 0-224 0Z"  ></path></symbol><symbol id="gld-bf-settings" viewBox="0 0 1024 1024"><path d="M796.896 435.552c-6.72-25.12-16.672-48.96-29.408-70.976l55.872-84.32-0.096-0.096-79.456-79.456L743.712 200.64l-84.32 55.872c-22.016-12.736-45.824-22.688-70.976-29.408L568.32 128l-0.128 0-112.384 0L455.68 128l-20.128 99.104c-25.12 6.72-48.96 16.672-70.976 29.408L280.288 200.64 280.192 200.736 200.736 280.192 200.64 280.288l55.872 84.32c-12.736 22.016-22.688 45.824-29.408 70.976L128 455.68l0 0.128 0 112.384 0 0.128 99.104 20.128c6.72 25.12 16.672 48.96 29.408 70.976L200.64 743.712l0.096 0.096 79.456 79.456 0.096 0.096 84.32-55.872c22.016 12.736 45.824 22.688 70.976 29.408L455.68 896l0.128 0 112.384 0 0.128 0 20.096-99.104c25.12-6.72 48.96-16.672 70.976-29.408l84.32 55.872 0.096-0.096 79.456-79.456 0.096-0.096-55.872-84.32c12.736-22.016 22.688-45.824 29.408-70.976L896 568.32l0-0.128 0-112.384L896 455.68 796.896 435.552zM512 672c-88.352 0-160-71.648-160-160s71.648-160 160-160 160 71.648 160 160S600.352 672 512 672z"  ></path></symbol><symbol id="gld-bf-home" viewBox="0 0 1024 1024"><path d="M928 512L512 128 96 512h128v352h192V608h192v256h192V512z"  ></path></symbol><symbol id="gld-bf-sectionbox" viewBox="0 0 1024 1024"><path d="M576 160l32 0 0 704-32 0 0-704Z"  ></path><path d="M672 256 672 288 704 288 830.016 288 864 288 864 672 830.016 672 704 672 672 672 672 704 896 704 896 256Z"  ></path><path d="M128 512l32 0 0 96-32 0 0-96Z"  ></path><path d="M128 704l32 0c16 0 32 0 32 0l0-32L128 672 128 704z"  ></path><path d="M416 288 452 288 480 288 512 288 512 256 416 256Z"  ></path><path d="M128 352l32 0 0 96-32 0 0-96Z"  ></path><path d="M128 256l64 0 0 32-64 0 0-32Z"  ></path><path d="M256 256l96 0 0 32-96 0 0-32Z"  ></path><path d="M416 672 416 704 512 704 512 672 452 672Z"  ></path><path d="M256 672l96 0 0 32-96 0 0-32Z"  ></path></symbol></svg>'),
    (function (e) {
      var t,
        n = (t = (t = document.getElementsByTagName("script"))[
          t.length - 1
        ]).getAttribute("data-injectcss");
      if (!(t = t.getAttribute("data-disable-injectsvg"))) {
        var a, i, o, l, s;
        if (n && !e.__iconfont__svg__cssinject__) {
          e.__iconfont__svg__cssinject__ = !0;
          try {
            document.write(
              "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
            );
          } catch (t) {
            console && console.log(t);
          }
        }
        (a = function () {
          var t,
            n = document.createElement("div");
          (n.innerHTML = e._iconfont_svg_string_295828),
            (n = n.getElementsByTagName("svg")[0]) &&
              (n.setAttribute("aria-hidden", "true"),
              (n.style.position = "absolute"),
              (n.style.width = 0),
              (n.style.height = 0),
              (n.style.overflow = "hidden"),
              (n = n),
              (t = document.body).firstChild
                ? (function (e, t) {
                    t.parentNode.insertBefore(e, t);
                  })(n, t.firstChild)
                : t.appendChild(n));
        }),
          document.addEventListener
            ? ~["complete", "loaded", "interactive"].indexOf(
                document.readyState
              )
              ? setTimeout(a, 0)
              : ((i = function () {
                  document.removeEventListener("DOMContentLoaded", i, !1), a();
                }),
                document.addEventListener("DOMContentLoaded", i, !1))
            : document.attachEvent &&
              ((o = a),
              (l = e.document),
              (s = !1),
              (function e() {
                try {
                  l.documentElement.doScroll("left");
                } catch (t) {
                  return void setTimeout(e, 50);
                }
                r();
              })(),
              (l.onreadystatechange = function () {
                "complete" == l.readyState &&
                  ((l.onreadystatechange = null), r());
              }));
      }
      function r() {
        s || ((s = !0), o());
      }
    })(window),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.UI.Control"
    ).ControlConfig = function () {
      return {
        id: null,
        tagName: "div",
        className: "bf-control",
        title: "",
        element: "",
      };
    }),
    (function () {
      let e = Object.freeze({
        Click: "Click",
        MouseEnter: "MouseEnter",
        MouseLeave: "MouseLeave",
        MouseMove: "MouseMove",
        StateChange: "StateChange",
        Change: "Change",
        ActiveModelTreeTab: "ActiveModelTreeTab",
        InActiveModelTreeTab: "InActiveModelTreeTab",
      });
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.UI.Control"
      ).ControlEvent = e;
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        a = function (e) {
          let a = this;
          (a.eventManager = new t.Web.Lang.EventManager()),
            (a.element = n.create(e.tagName, e.className)),
            (a.id = e.id || t.Web.Lang.Utility.UUID.createUUID()),
            e.title && !e.isPanel && a.setTitle(e.title),
            e.element && e.element.appendChild(a.element);
        };
      (a.prototype = {
        addEventListener: function (e, t) {
          var n = this.eventManager;
          this.element.addEventListener(e.toLocaleLowerCase(), t),
            n.addEvent(e, t);
        },
        removeEventListener: function (e, t) {
          this.eventManager.removeEvent(e, t),
            this.element.removeEventListener(e.toLocaleLowerCase(), t);
        },
        show: function () {
          this.element.style.display = "";
        },
        hide: function () {
          this.element.style.display = "none";
        },
        setTitle: function (e) {
          this.element.setAttribute("title", e);
        },
        getTitle: function () {
          return this.element.getAttribute("title");
        },
        setClassNames: function (e) {
          this.element.setAttribute("class", e);
        },
        getClassNames: function () {
          return this.element.getClass();
        },
        addClassName: function (e) {
          this.element.addClass(e);
        },
        removeClassName: function (e) {
          this.element.removeClass(e);
        },
        toggleClassName: function (e, t) {
          this.element.toggleClass(e, t);
        },
        setDomId: function (e) {
          this.element.setAttribute("id", e);
        },
        getDomId: function () {
          return this.element.getAttribute("id");
        },
        getId: function () {
          return this.id;
        },
        setHtml: function (e) {
          this.element.innerHTML = e;
        },
        setStyle: function (e) {
          this.element.setCss(e);
        },
        destroy: function () {
          this.element.parentNode &&
            this.element.parentNode.removeChild(this.element);
        },
      }),
        (e.Control = a);
    })(),
    (m = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.UI.Toolbar")),
    (p = new t.Bimface.UI.Control.ControlConfig()),
    (m.ToolbarConfig = function () {
      return Object.assign({}, p, { className: "bf-toolbar" });
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Toolbar"
        ),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        i =
          (t.Web.Lang.Utility.Namespace.ensureNamespace(
            t,
            "Web.Lang.Utility.Dom"
          ),
          function (t) {
            (this._controls = []),
              e.Control.call(this, t),
              this.element.addEventListener("mousedown", (e) => {
                e.stopPropagation(), this.bringToFront.bind(this);
              });
          });
      a.Type.inheritPrototype(i, e.Control),
        (i.prototype.addControl = function (e) {
          this.getControls().push(e), this.element.appendChild(e.element);
        }),
        (i.prototype.bringToFront = function () {
          if (!this.element.hasClass("bf-pinned")) {
            let e = document.querySelector(".bf-pinned");
            e && e.removeClass("bf-pinned"), this.element.addClass("bf-pinned");
          }
        }),
        (i.prototype.addControls = function (e) {
          for (var t = 0, n = e.length; t < n; t++) this.addControl(e[t]);
          return this.getControls();
        }),
        (i.prototype.insertControl = function (e, t) {
          var n = this.getControls();
          n.insert(e, t);
          var a = n[e + 1];
          a
            ? this.element.insertBefore(t.element, a.element)
            : this.element.appendChild(t.element);
        }),
        (i.prototype.removeControl = function (e) {
          var t = this.getControls(),
            n = t.getObjectByAttribute("id", e);
          t.removeObjectByAttribute("id", e),
            this.element.removeChild(n.element);
        }),
        (i.prototype.getControls = function () {
          return this._controls;
        }),
        (i.prototype.getControl = function (e) {
          return this.getControls().getObjectByAttribute("id", e);
        }),
        (i.prototype.destroy = function () {
          var e = this.getControls();
          for (let t = 0; t < e.length; t++) e[t].destroy();
          (this._controls = []),
            this.element.parentNode &&
              this.element.parentNode.removeChild(this.element);
        }),
        (n.Toolbar = i);
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        n =
          (t.Bimface.UI.Button.ButtonOption,
          new t.Bimface.UI.Control.ControlConfig());
      e.ButtonConfig = function () {
        return Object.assign({}, n, {
          className: "bf-button",
          title: "button",
          checkedState: !1,
          defaultClass: "",
          changeClass: "",
          inheritTitle: !1,
        });
      };
    })(),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        a = function (t) {
          e.Control.call(this, t), (this._enabled = !0);
        };
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility"
      ).Type.inheritPrototype(a, e.Control),
        (a.prototype.addToolbar = function (e) {
          (this.toolbar = e), this.element.appendChild(e.element);
        }),
        (a.prototype.getToolbar = function (e) {
          return this.toolbar;
        }),
        (a.prototype.disabled = function () {
          (this._enabled = !1), this.element.addClass("bf-button-disabled");
        }),
        (a.prototype.enabled = function () {
          (this._enabled = !0), this.element.removeClass("bf-button-disabled");
        }),
        (n.Button = a);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        a = t.Bimface.UI.Control.ControlEvent,
        i = function (t) {
          e.Button.call(this, t);
          var n = this;
          (n._checked = t.checkedState),
            n._checked && this.addClassName("bf-checked"),
            n.addEventListener(a.Click, function () {
              n.toggleCheckedState();
            });
        };
      n.Type.inheritPrototype(i, e.Button),
        (i.prototype.toggleCheckedState = function () {
          this.setCheckedState(!this._checked);
        }),
        (i.prototype.setCheckedState = function (e) {
          this._checked != e &&
            ((this._checked = e),
            this.toggleClassName("bf-checked", e),
            this.eventManager.fireEvent(a.StateChange, e));
        }),
        (i.prototype.isChecked = function () {
          return this._checked;
        }),
        (e.ToggleButton = i);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Toolbar"
        ),
        i = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility");
      var o = new a.ToolbarConfig();
      let l = new e.ControlConfig(),
        s = function (t) {
          e.Control.call(this, t);
          var n = this;
          n._inheritTitle = t.inheritTitle;
          let i = new e.Control(Object.assign({}, l, t));
          i.setClassNames("bf-current"),
            (o.element = n.element),
            (o.className = "bf-sub-toolbar bf-scroll-bar");
          let s = new a.Toolbar(o);
          (n.currentElement = i),
            (n._subToolbar = s),
            n.element.appendChild(n.currentElement.element),
            n.addEventListener("Click", function () {
              n.toggleDropDownList();
            });
        };
      i.Type.inheritPrototype(s, e.Control),
        (s.prototype.toggleDropDownList = function () {
          (this.checked = !this.checked), this.toggleClassName("bf-expand");
        }),
        (s.prototype.showDropDownList = function () {
          (this._checked = !0), this.addClassName("bf-expand");
        }),
        (s.prototype.hideDropDownList = function (e) {
          (this._checked = !1), this.removeClassName("bf-expand");
        }),
        (s.prototype.addControl = function (e) {
          var t = this,
            n = t.getControls();
          t._subToolbar.addControl(e),
            1 == n.length && t.setSelectedControlById(e.id),
            e.addEventListener("Click", function () {
              for (let e = 0, t = n.length; e < t; e++)
                n[e].setCheckedState(!1);
              t.currentElement.setHtml(this.outerHTML.replace("checked", "")),
                e.setCheckedState(!0),
                (t._currentControl = e),
                t.eventManager.fireEvent("Change", e);
            });
        }),
        (s.prototype.removeControl = function (e) {
          this._subToolbar.removeControl(e);
        }),
        (s.prototype.getControls = function () {
          return this._subToolbar.getControls();
        }),
        (s.prototype.getControl = function (e) {
          return this._subToolbar.getControl(e);
        }),
        (s.prototype.getCurrentControl = function () {
          return this._currentControl;
        }),
        (s.prototype.setSelectedControlById = function (e) {
          var t = this.getControl(e);
          if (t) {
            t.setCheckedState(!1);
            var n = t.element.cloneNode(!0);
            this._inheritTitle || n.removeAttribute("title"),
              this.currentElement.setHtml(n.outerHTML),
              t.setCheckedState(!0),
              (this._currentControl = t);
          }
        }),
        (s.prototype.setSelectedUiById = function (e, t = !0) {
          this.element.querySelector(".bf-checked") &&
            this.element.querySelector(".bf-checked").removeClass("bf-checked"),
            this.setSelectedControlById(e),
            t && this.eventManager.fireEvent("Change", this.getControl(e));
        }),
        (n.ComboBox = s);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        n = function (t) {
          e.ComboBox.call(this, t),
            (this.currentElement = t.home),
            (this.home = t.home),
            this.element.appendChild(this.currentElement.element);
        };
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility"
      ).Type.inheritPrototype(n, e.ComboBox),
        (n.prototype.addControl = function (e) {
          var t = this,
            n = t.getControls();
          t._subToolbar.addControl(e),
            e.addEventListener("Click", function () {
              for (let e = 0, t = n.length; e < t; e++)
                n[e].setCheckedState(!1);
              t.currentElement.setCheckedState(!1),
                (t._currentControl = e),
                t.eventManager.fireEvent("Change", e);
            });
        }),
        (n.prototype.recover = function () {
          this.home.setCheckedState(!1), this.hideDropDownList();
        }),
        (e.TouchComboBox = n);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        n = function (t) {
          e.ToggleButton.call(this, t);
        };
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility"
      ).Type.inheritPrototype(n, e.ToggleButton),
        (e.ComboBoxOptionButton = n);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        n = function (t) {
          e.Button.call(this, t);
          var n = this;
          n.addClassName(t.defaultClass),
            (n._defaultClass = t.defaultClass),
            (n._changeClass = t.changeClass),
            (this.type = "default"),
            (n._title = t.title),
            (n._changeTitle = t.changeTitle || t.title),
            n._checked && this.addClassName("bf-checked"),
            n.addEventListener("Click", function () {
              n.toggleState(), n.eventManager.fireEvent("Change", n.type);
            });
        };
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility"
      ).Type.inheritPrototype(n, e.Button),
        (n.prototype.toggleState = function () {
          this.setState("change" == this.type ? "default" : "change");
        }),
        (n.prototype.setState = function (e) {
          (this.type = e),
            "default" == e
              ? (this.addClassName(this._defaultClass),
                this.removeClassName(this._changeClass))
              : (this.addClassName(this._changeClass),
                this.removeClassName(this._defaultClass));
        }),
        (e.ChangeButton = n);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        a = {},
        i = function (t) {
          e.Button.call(this, t);
          var n = this;
          (n._checked = t.checkedState),
            n.addEventListener("Click", function () {
              n.setChecked();
            }),
            a[t.groupName]
              ? (a[t.groupName].push(n), (this._groupList = a[t.groupName]))
              : ((a[t.groupName] = [n]),
                (this._groupList = a[t.groupName]),
                n.setChecked());
        };
      n.Type.inheritPrototype(i, e.Button),
        (i.prototype.setChecked = function () {
          var e = this._groupList;
          for (let t = 0, n = e.length; t < n; t++)
            e[t].removeClassName("bf-checked");
          this.addClassName("bf-checked");
        }),
        (e.SingleButton = i);
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Menu"
        ),
        n = new t.Bimface.UI.Control.ControlConfig();
      e.MenuConfig = function () {
        return Object.assign({}, n, {
          className: "bf-menu",
          isSubMenu: !1,
          text: null,
        });
      };
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Menu"
        ),
        n = new t.Bimface.UI.Control.ControlConfig();
      e.MenuItemConfig = function () {
        return Object.assign({}, n, { className: "bf-menu-item" });
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Button"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.UI.Menu"),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        i =
          (t.Web.Lang.Utility.Namespace.ensureNamespace(
            t,
            "Web.Lang.Utility.Dom"
          ),
          function (t) {
            (this._controls = []),
              e.Button.call(this, t),
              (this.isDisabled = !1);
          });
      a.Type.inheritPrototype(i, e.Button),
        (i.prototype.setText = function (e) {
          this.element.innerText = e;
        }),
        (i.prototype.disabled = function (e) {
          this.element.addClass("bf-disabled"), (this.isDisabled = !0);
        }),
        (i.prototype.enabled = function (e) {
          this.element.removeClass("bf-disabled"), (this.isDisabled = !1);
        }),
        (i.prototype.hide = function (e) {
          this.element.addClass("bf-hide"), (this.isHide = !0);
        }),
        (i.prototype.show = function (e) {
          this.element.removeClass("bf-hide"), (this.isHide = !1);
        }),
        (i.prototype.addEventListener = function (e, t) {
          var n = this.eventManager;
          this.isDisabled ||
            (this.element.addEventListener(e.toLocaleLowerCase(), t),
            n.addEvent(e, t));
        }),
        (i.prototype.removeEventListener = function (e, t) {
          var n = this.eventManager;
          this.isDisabled ||
            (this.element.removeEventListener(e.toLocaleLowerCase(), t),
            n.removeEvent(e, t));
        }),
        (n.MenuItem = i);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Menu"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        a = function () {
          this.element = n.create("div", "bf-spacer");
        };
      (a.prototype.hide = function (e) {
        this.element.addClass("bf-hide"), (this.isHide = !0);
      }),
        (e.Spacer = a);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Toolbar"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.UI.Menu"),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        i = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        o = function (t) {
          if (
            (e.Toolbar.call(this, t),
            this.element.addEventListener("mousedown", function (e) {
              e.stopPropagation();
            }),
            this.element.addEventListener("contextmenu", function (e) {
              e.preventDefault();
            }),
            (this.isDisabled = !1),
            t.isSubMenu)
          ) {
            var n = i.create("div", "bf-menu-item");
            n.innerText = t.text;
            var a = i.create("div", "bf-menu");
            this.element.appendChild(n),
              this.element.appendChild(a),
              (this.subElement = a);
          }
        };
      a.Type.inheritPrototype(o, e.Toolbar),
        (o.prototype.setPosition = function (e) {
          (this.element.style.left = `${e.x}px`),
            (this.element.style.top = `${e.y}px`);
        }),
        (o.prototype.addControl = function (e) {
          this.getControls().push(e),
            this.subElement
              ? this.subElement.appendChild(e.element)
              : this.element.appendChild(e.element);
        }),
        (o.prototype.disabled = function (e) {
          this.element.addClass("bf-disabled"), (this.isDisabled = !0);
        }),
        (o.prototype.enabled = function (e) {
          this.element.removeClass("bf-disabled"), (this.isDisabled = !1);
        }),
        (o.prototype.destroy = function (e) {
          this.element && this.element.remove(), (this.element = null);
        }),
        (n.Menu = o);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.UI.Panel"),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        i = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility");
      n.PanelPositions = n.PanelPositions || {};
      let o = function (i) {
        let o = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
        (i.isPanel = !0),
          (this._opt = i),
          e.Control.call(this, i),
          (this._controls = []);
        let l = this,
          s = l.element;
        l.isShow = !0;
        let r = a.create("div", "bf-panel-body"),
          c = a.create("div", "bf-panel-header"),
          d = a.create("div", "bf-panel-footer"),
          f = a.create("div", "bf-panel-container bf-scroll-bar"),
          m = a.create("div", "bf-panel-title-wrap"),
          p = a.create("div", "bf-close"),
          u = i.css;
        for (var g in u) s.style[g] = `${u[g]}`;
        if (i.title) {
          var h = a.create("div", "bf-title");
          (h.textContent = i.title), m.appendChild(h), (l.headerElement = h);
        }
        i.easyMode || m.appendChild(p),
          s.appendChild(m),
          r.appendChild(c),
          r.appendChild(f),
          s.appendChild(r),
          r.appendChild(d),
          h &&
            i.enableDrag &&
            o &&
            (this.drag = new t.Web.Lang.Utility.Dom.drag({
              element: this.element,
              handle: h,
              bBoxDetection: !0,
              move: function (e, t, n) {
                l.eventManager.fireEvent("Move", e, t, n);
              },
              record: function (e, t) {
                n.PanelPositions[i.className] = { left: e, top: t };
              },
            })),
          (this.body = r),
          (this.container = f),
          (this.header = c),
          (this.footer = d),
          i.enableSizable &&
            t.Web.Lang.Utility.Dom.sizable({
              element: this.element,
              axis: "all",
              sizable: function (e, t, n) {
                l.eventManager.fireEvent("Sizable", e, t, n);
              },
            }),
          s.addEventListener("mousedown", this.onMouseDown.bind(this)),
          s.addEventListener("mousemove", this.onMouseMove.bind(this)),
          document.addEventListener("mouseup", this.onMouseUp.bind(this)),
          p.addEventListener("click", function () {
            l.hide();
          }),
          f.addEventListener("click", function (e) {
            var t = e.target.closest(".bf-group-title");
            if (t && t.hasClass("bf-group-title")) {
              t.parentNode.toggleClass("bf-collapse");
            }
          }),
          f.addEventListener("DOMNodeRemoved", function (e) {
            "componentPanel" != e.currentTarget.firstChild.id && l.showTips();
          }),
          f.addEventListener("DOMNodeInserted", function () {
            l.hideTips();
          }),
          window.addEventListener("resize", this.initPosition.bind(this));
      };
      i.Type.inheritPrototype(o, e.Control),
        (o.prototype.setData = function (e, t) {
          if ((this.clear(), e && e.length > 0)) {
            var n = '<table class="bf-table">';
            for (let i = 0, o = e.length; i < o; i++) {
              "基本属性" === e[i].group &&
                (e[i].group = BimfaceLanguage.bf_panel_basic_attribute);
              let o = `<tbody class="bf-group ${
                  t && "bf-collapse"
                }"><tr class="bf-group-title"><td colspan="2"><i class="bf-icon"></i>${
                  e[i].group
                }</td></tr>`,
                l = e[i].items;
              for (let e = 0, t = l.length; e < t; e++) {
                var a = l[e];
                o += `<tr class="bf-group-content"><td class="bf-key">${
                  a.key
                }</td><td class="bf-value">${a.value
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")}</td></tr>`;
              }
              (o += "</tbody>"), (n += o);
            }
            (n += "</table>"), (this.container.innerHTML = n);
          }
        }),
        (o.prototype.setTitleContent = function (e) {
          this.headerElement.textContent = e;
        }),
        (o.prototype.onMouseDown = function () {
          (this.isMouseDown = !0),
            this.element.removeEventListener("mousemove", this.onMouseMove),
            this.bringToFront();
        }),
        (o.prototype.onMouseMove = function (e) {
          !0 !== this.isMouseDown && (e.preventDefault(), e.stopPropagation());
        }),
        (o.prototype.onMouseUp = function () {
          (this.isMouseDown = !1),
            this.element.addEventListener("mousemove", this.onMouseMove);
        }),
        (o.prototype.bringToFront = function () {
          if (!this.element.hasClass("bf-pinned")) {
            let e = document.querySelector(".bf-pinned");
            e && e.removeClass("bf-pinned"), this.element.addClass("bf-pinned");
          }
        }),
        (o.prototype.showTips = function () {
          this.tipsElement &&
            this.body.insertBefore(this.tipsElement, this.body.childNodes[1]);
        }),
        (o.prototype.setTips = function (e, t) {
          this.tipsElement && this.tipsElement.remove();
          var n = { default: "bf-panel-tips", loading: "bf-panel-loading" },
            i = n[t] || n.default,
            o = a.create("div", i);
          (o.textContent = e), (this.tipsElement = o), this.showTips();
        }),
        (o.prototype.hideTips = function () {
          this.tipsElement && this.tipsElement.remove();
        }),
        (o.prototype.setContainerHeader = function (e) {
          if ("String" == typeof e);
          else {
            (e.style.right = "100%"),
              (e.style.bottom = "100%"),
              document.body.appendChild(e);
            var t = e.offsetHeight;
            document.body.removeChild(e),
              e.removeAttribute("style"),
              (e.style.marginTop = `-${t}px`),
              (this.body.style.paddingTop = `${t}px`),
              this.header.appendChild(e);
          }
        }),
        (o.prototype.setContainerFooter = function (e) {
          "String" == typeof e || this.footer.appendChild(e);
        }),
        (o.prototype.close = function () {
          this.destroy(),
            this.eventManager.fireEvent("Close"),
            (this.isShow = !1),
            window.removeEventListener("resize", this.initPosition.bind(this));
        }),
        (o.prototype.hide = function (e) {
          (this.isShow = !1),
            (this.element.style.display = "none"),
            !0 !== e && this.eventManager.fireEvent("Hide");
        }),
        (o.prototype.show = function (e) {
          (this.isShow = !0),
            (this.element.style.display = ""),
            !0 !== e && this.eventManager.fireEvent("Show"),
            this.bringToFront(),
            this.initPosition();
        }),
        (o.prototype.clear = function () {
          this.container.innerHTML = "";
        }),
        (o.prototype.toggle = function () {
          this.isShow
            ? (this.element.style.display = "none")
            : ((this.element.style.display = ""), this.bringToFront()),
            (this.isShow = !this.isShow);
        }),
        (o.prototype.addControl = function (e) {
          this.getControls().push(e), this.container.appendChild(e.element);
        }),
        (o.prototype.getControls = function () {
          return this._controls;
        }),
        (o.prototype.getControl = function (e) {
          return this.getControls().getObjectByAttribute("id", e);
        }),
        (o.prototype.setHtml = function (e) {
          this.container.innerHTML = e;
        }),
        (o.prototype.addClass = function (e) {
          this.element.addClass(e);
        }),
        (o.prototype.removeClass = function (e) {
          this.element.removeClass(e);
        }),
        (o.prototype.setHeight = function (e) {
          this.element.style.height = `${e}px`;
        }),
        (o.prototype.setWidth = function (e) {
          this.element.style.width = `${e}px`;
        }),
        (o.prototype.setHeader = function (e) {
          (this._opt.title = e), (this.headerElement.textContent = e);
        }),
        (o.prototype.getTitle = function () {
          return this._opt.title;
        }),
        (o.prototype.isDisplay = function () {
          return "none" != this.element.style.display;
        }),
        (o.prototype.initPosition = function () {
          this.element.parentElement &&
            this.isShow &&
            this.drag &&
            (n.PanelPositions[this._opt.className]
              ? ((this.element.style.left = `${
                  n.PanelPositions[this._opt.className].left
                }px`),
                (this.element.style.top = `${
                  n.PanelPositions[this._opt.className].top
                }px`),
                this.drag.resize(this.element))
              : this.drag.resize(this.element, null, !0));
        }),
        (n.Panel = o);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.UI.Panel"),
        a =
          (t.Web.Lang.Utility.Namespace.ensureNamespace(
            t,
            "Web.Lang.Utility.Dom"
          ),
          t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"));
      n.PanelPositions = n.PanelPositions || {};
      let i = function (t) {
        (t.isPanel = !0),
          (this._opt = t),
          e.Control.call(this, t),
          (this._controls = []);
        this.isShow = !0;
      };
      a.Type.inheritPrototype(i, e.Control),
        (i.prototype.bringToFront = function () {
          if (!this.element.hasClass("bf-pinned")) {
            let e = document.querySelector(".bf-pinned");
            e && e.removeClass("bf-pinned"), this.element.addClass("bf-pinned");
          }
        }),
        (i.prototype.close = function () {
          this.destroy(),
            this.eventManager.fireEvent("Close"),
            (this.isShow = !1);
        }),
        (i.prototype.hide = function (e) {
          (this.isShow = !1),
            (this.element.style.display = "none"),
            !0 !== e && this.eventManager.fireEvent("Hide");
        }),
        (i.prototype.show = function (e) {
          (this.isShow = !0),
            (this.element.style.display = ""),
            !0 !== e && this.eventManager.fireEvent("Show"),
            this.bringToFront();
        }),
        (i.prototype.toggle = function () {
          this.isShow
            ? (this.element.style.display = "none")
            : ((this.element.style.display = ""), this.bringToFront()),
            (this.isShow = !this.isShow);
        }),
        (i.prototype.addControl = function (e) {
          this.getControls().push(e), this.container.appendChild(e.element);
        }),
        (i.prototype.getControls = function () {
          return this._controls;
        }),
        (i.prototype.getControl = function (e) {
          return this.getControls().getObjectByAttribute("id", e);
        }),
        (i.prototype.setHtml = function (e) {
          this.container.innerHTML = e;
        }),
        (i.prototype.addClass = function (e) {
          this.element.addClass(e);
        }),
        (i.prototype.removeClass = function (e) {
          this.element.removeClass(e);
        }),
        (i.prototype.setHeight = function (e) {
          this.element.style.height = `${e}px`;
        }),
        (i.prototype.setWidth = function (e) {
          this.element.style.width = `${e}px`;
        }),
        (i.prototype.setHeader = function (e) {
          (this._opt.title = e), (this.headerElement.textContent = e);
        }),
        (i.prototype.getTitle = function () {
          return this._opt.title;
        }),
        (i.prototype.isDisplay = function () {
          return "none" != this.element.style.display;
        }),
        (i.prototype.updateStatusByDataType = function (e, t) {
          for (
            var n = this.element.querySelectorAll(
                (t ? "" : ".bf-layoutlist-panel-simple") + " .bf-panel-item"
              ),
              a = 0;
            a < n.length;
            a++
          ) {
            const t = n[a].getAttribute("data-type");
            n[a].removeClass("bf-active"), e == t && n[a].addClass("bf-active");
          }
        }),
        (n.SimplePanel = i);
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Panel"
        ),
        n = new t.Bimface.UI.Control.ControlConfig();
      e.PanelConfig = function () {
        return Object.assign({}, n, {
          className: "bf-panel",
          title: "panel",
          css: {
            width: "200px",
            height: "200px",
            minWidth: "200px",
            minHeight: "200px",
          },
          enableDrag: !0,
          enableSizable: !0,
        });
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Tree"
        ),
        n = function (e) {
          var t = this;
          (t._root = e),
            (t.element = e.element),
            (t.eventManager = e.eventManager),
            (t.addEventListener = e.addEventListener),
            (t.removeEventListener = e.removeEventListener),
            e.addEventListener("SelectionChanged", function (e, n) {
              t._selectionNode == e
                ? n || (t._selectionNode = null)
                : (t._selectionNode && t._selectionNode.deselect(),
                  (t._selectionNode = e));
            });
        };
      (n.prototype = {
        getRoot: function () {
          return this._root;
        },
        getChecked: function () {
          var e = this._root,
            t = [];
          return (
            (function n(a, i) {
              var o = a.getCheckedState(),
                l = a.element.getAttribute("data-filter");
              switch (o) {
                case "unchecked":
                  break;
                case "checked":
                  if (a == e) t = "all";
                  else {
                    var s = Object.assign({}, i);
                    (s[l] = a.id), t.push(s);
                  }
                  break;
                case "half":
                  var r = a.getControls(),
                    c = Object.assign({}, i);
                  a != e && (c[l] = a.id);
                  for (var d = 0, f = r.length; d < f; d++) n(r[d], c);
              }
            })(e, {}),
            t
          );
        },
        getSelection: function () {
          var e = this._selectionNode,
            t = {};
          if (!e) return !1;
          return (
            (function e(t, n) {
              var a = t.element.getAttribute("data-filter"),
                i = t.getParent();
              if (!i) return n;
              (n[a] = t.id), e(i, n);
            })(e, t),
            t
          );
        },
        clear: function (e) {
          var t = this.getRoot(),
            n = function (t) {
              t.setCheckedState(e), t.setIconState("default"), t.deselect();
              var a = t.getControls();
              if (a && a.length > 0) for (var i = 0; i < a.length; i++) n(a[i]);
            };
          n(t);
        },
      }),
        (e.Tree = n);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Toolbar"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.UI.Tree"),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        i = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        o = function (t) {
          e.Toolbar.call(this, t),
            (this._opt = Object.assign({}, t)),
            t.hasCheckbox &&
              (this._checkedState = t.isChecked ? "checked" : "unchecked"),
            (this._iconState = !0);
          var n = t.isExpand
            ? i.create("div", "bf-tree-node")
            : i.create("div", "bf-tree-node bf-collapse");
          (this._enabled = t.enabled),
            (this._selection = t.selection),
            (this._selectionState = "unSelected"),
            (this._datas = t.datas),
            (this.treeNode = n);
        };
      a.Type.inheritPrototype(o, e.Toolbar),
        (o.prototype.setData = function (e, t) {
          var n = this,
            a = this._opt,
            o = this.treeNode;
          if (a.hasCheckbox) {
            var l = a.isChecked ? "bf-checked" : "",
              s = i.create("span", "bf-label " + l);
            (s.innerHTML = `<input type="checkbox" checked="${a.isChecked}"><span class="bf-checkbox"></span>`),
              (this.checkbox = s),
              o.appendChild(s),
              s.addEventListener("click", function (e) {
                var t = s.getElementsByTagName("input")[0].checked,
                  a = t ? "unchecked" : "checked";
                n.setCheckedState(!t),
                  n.eventManager.fireEvent("CheckedChanged", a, n);
              });
          }
          var r = i.create("span", "bf-tree-name");
          if (
            ((t = t || BimfaceLanguage.bf_panel_modelTree_nameUndefined),
            (r.textContent = t),
            n.setTitle(t),
            r.addEventListener("click", function (e) {
              if (n._enabled)
                if (n._selection) {
                  var t = this.hasClass("bf-selected");
                  this.hasClass("bf-restore") ||
                    n.eventManager.fireEvent("NodeNameClicked", n, !t),
                    t ? n.deselect() : n.select(),
                    (t = !t),
                    (n._selectionState = t ? "selected" : "unselected"),
                    n.eventManager.fireEvent("SelectionChanged", n, t);
                } else n.toggleExpansion();
            }),
            a.icon &&
              ((this.icon = a.icon),
              o.appendChild(a.icon.element),
              this.icon.addEventListener("Change", function (e) {
                (n._iconState = "default" == e),
                  n.setChildrenIconState(e),
                  n.eventManager.fireEvent("IconChanged", n, e);
              })),
            a.hasExpand)
          ) {
            var c = i.create("span", "bf-icon");
            o = this.treeNode;
            c.addEventListener("click", function () {
              let e;
              n.toggleExpansion(),
                (e = !o.hasClass("bf-collapse")),
                n.eventManager.fireEvent("ExpandChanged", n, e);
            }),
              o.appendChild(c),
              (this.expandIcon = c);
          }
          o.appendChild(r),
            this.element.appendChild(o),
            (this.treeName = r),
            (this.id = e),
            (this.name = t);
        }),
        (o.prototype.addChildNode = function (e, t = -1) {
          var n = this;
          if (
            (-1 == t ? this._controls.push(e) : this._controls.splice(t, 0, e),
            (e._parent = this),
            !this.subTree)
          ) {
            var a = i.create("span", "bf-icon"),
              o = this.treeNode;
            (this.expandIcon = a),
              a.addEventListener("click", function () {
                n.toggleExpansion();
              }),
              o.insertBefore(a, this.treeNode.children[0]),
              (this.subTree = i.create("div", "bf-sub-tree")),
              -1 == t
                ? this.element.appendChild(this.subTree)
                : this.element.insertBefore(
                    this.subTree,
                    this.element.childNodes[t]
                  );
          }
          -1 == t
            ? this.path
              ? this.path != e.path && this.subTree.appendChild(e.element)
              : this.subTree.appendChild(e.element)
            : this.path != e.path &&
              this.subTree.insertBefore(e.element, this.subTree.childNodes[t]),
            e.addEventListener("CheckedChanged", function (e, t) {
              t._opt.propagation && n.setParentCheckedState(),
                n.eventManager.fireEvent("CheckedChanged", e, t);
            }),
            e.addEventListener("SelectionChanged", function (e, t, a) {
              n.eventManager.fireEvent("SelectionChanged", e, t, a);
            }),
            e.addEventListener("IconChanged", function (t, a) {
              e._opt.propagation && n.setParentIconState(e),
                n.eventManager.fireEvent("IconChanged", t, a);
            });
        }),
        (o.prototype.removeChildNode = function (e) {
          var t = this._controls.getObjectByAttribute("id", e);
          this.subTree.removeChild(t.element),
            this._controls.removeObjectByAttribute("id", e);
        }),
        (o.prototype.replaceChildren = function (e) {
          this.subTree && this.subTree.replaceChildren(),
            this.subTree && this.subTree.remove(),
            delete this.subTree,
            (this._controls = []),
            e.map((e) => this.addChildNode(e));
        }),
        (o.prototype.getChildNode = function () {
          return this.subTree;
        }),
        (o.prototype.getCheckedState = function () {
          return this._checkedState;
        }),
        (o.prototype.getIconState = function () {
          return this._iconState;
        }),
        (o.prototype.getSelectionState = function () {
          return this._selectionState;
        }),
        (o.prototype.getConfig = function () {
          return this._opt;
        }),
        (o.prototype.getParent = function () {
          return !!this._parent && this._parent;
        }),
        (o.prototype.setCheckedState = function (e, t = !1) {
          var n = this._opt;
          (this._checkedState = e ? "checked" : "unchecked"),
            !t &&
              n.hasCheckbox &&
              this.checkbox &&
              ((this.checkbox.getElementsByTagName("input")[0].checked = e),
              this.checkbox.toggleClass("bf-checked", e),
              this.checkbox.toggleClass("bf-unchecked", !e),
              this.checkbox.removeClass("bf-half")),
            !t && this.setChildrenCheckedState(e),
            t &&
              ((this.checkbox.getElementsByTagName("input")[0].checked = !0),
              this.checkbox.addClass("bf-half"),
              this.checkbox.removeClass("bf-unchecked"),
              this.checkbox.removeClass("bf-checked"));
        }),
        (o.prototype.setIconState = function (e) {
          this.icon &&
            (this.icon.setState(e),
            this.setChildrenIconState(e),
            (this._iconState = "default" == e));
        }),
        (o.prototype.setParentCheckedState = function (e) {
          if ((e = e || this.getControls()) && e.length > 0) {
            for (var t, n = 0, a = e.length; n < a; n++) {
              var i = e[n].getCheckedState();
              t ? i != t && (t = "half") : (t = i);
            }
            this._checkedState = t;
          }
          switch (this._checkedState) {
            case "checked":
              (this.checkbox.getElementsByTagName("input")[0].checked = !0),
                this.checkbox.addClass("bf-checked"),
                this.checkbox.removeClass("bf-unchecked"),
                this.checkbox.removeClass("bf-half");
              break;
            case "unchecked":
              (this.checkbox.getElementsByTagName("input")[0].checked = !1),
                this.checkbox.addClass("bf-unchecked"),
                this.checkbox.removeClass("bf-checked"),
                this.checkbox.removeClass("bf-half");
              break;
            case "half":
              (this.checkbox.getElementsByTagName("input")[0].checked = !0),
                this.checkbox.addClass("bf-half"),
                this.checkbox.removeClass("bf-unchecked"),
                this.checkbox.removeClass("bf-checked");
          }
        }),
        (o.prototype.setChildrenCheckedState = function (e) {
          var t = this.getControls(),
            n = t.length;
          if (t && n > 0) for (var a = 0; a < n; a++) t[a].setCheckedState(e);
        }),
        (o.prototype.setParentIconState = function (e) {
          var t = this.getControls();
          if (t && t.length > 0) {
            for (var n = !1, a = 0, i = t.length; a < i; a++) {
              var o = t[a].getIconState();
              if (o) {
                n = o;
                break;
              }
            }
            this._iconState = n;
          }
          n ? this.icon.setState("default") : this.icon.setState("change");
        }),
        (o.prototype.setChildrenIconState = function (e) {
          var t = this.getControls(),
            n = t.length;
          if (t && n > 0) for (var a = 0; a < n; a++) t[a].setIconState(e);
        }),
        (o.prototype.expand = function () {
          this.treeNode.removeClass("bf-collapse"),
            this.eventManager.fireEvent("Expand", this);
        }),
        (o.prototype.collapse = function () {
          this.treeNode.addClass("bf-collapse"),
            this.eventManager.fireEvent("Collapse", this);
        }),
        (o.prototype.toggleExpansion = function (e) {
          this.treeNode.hasClass("bf-collapse")
            ? this.expand()
            : this.collapse();
        }),
        (o.prototype.select = function () {
          if (this._selection) return this.treeName.addClass("bf-selected");
        }),
        (o.prototype.deselect = function () {
          this.treeName && this.treeName.removeClass("bf-selected");
        }),
        (o.prototype.recoverSelect = function () {
          this.treeName.hasClass("bf-selected") ||
            this.treeName.addClass("bf-selected");
        }),
        (o.prototype.disabled = function () {
          (this._enabled = !1), this.treeName.addClass("bf-disabled");
        }),
        (o.prototype.enabled = function () {
          (this._enabled = !0), this.treeName.removeClass("bf-disabled");
        }),
        (o.prototype.addNode = function (e) {
          this.treeNode.appendChild(e);
        }),
        (o.prototype.removeNode = function (e) {
          this.treeNode.appendChild(e);
        }),
        (o.prototype.setAttribute = function (e, t) {
          this.treeNode.setAttribute(e, t);
        }),
        (n.TreeNode = o);
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Tree"
        ),
        n = new t.Bimface.UI.Control.ControlConfig();
      e.TreeNodeConfig = function () {
        return Object.assign(n, {
          className: "bf-tree",
          title: "tree",
          icon: null,
          hasCheckbox: !0,
          isChecked: !0,
          enabled: !0,
          selection: !0,
          propagation: !0,
          hasExpand: !1,
        });
      };
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Select"
        ),
        n = new t.Bimface.UI.Control.ControlConfig();
      e.SelectConfig = function () {
        return Object.assign({}, n, {
          className: "bf-select",
          options: ["请选择"],
          prefix: "",
          suffix: "",
          position: "bottom",
          default: null,
        });
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Select"
        ),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        i = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        o = function (t) {
          (this._controls = t.options), e.Control.call(this, t);
          var n = this;
          (n._opt = t), (this.isEnable = !0);
          var a = i.create("span", "bf-select-current");
          a.addEventListener("click", function () {
            n.isEnable && a.toggleClass("bf-open");
          }),
            document.addEventListener("mousedown", function (e) {
              e.target.closest(".bf-select") || a.removeClass("bf-open");
            }),
            (n._currentElement = a),
            t.default
              ? n.setCurrentOption(t.default)
              : n.setCurrentOption(t.options[0].id, !1, t.options[0].modelId);
          for (
            var o = i.create("ul", "bf-select-list bf-scroll-bar"),
              l = n._controls,
              s = 0,
              r = l.length;
            s < r;
            s++
          ) {
            var c = n.createElement(l[s]);
            o.appendChild(c);
          }
          n.element.appendChild(n._currentElement),
            n.element.appendChild(o),
            t.element && t.element.appendChild(n.element),
            "top" === t.position && o.addClass("bf-select-top");
        };
      a.Type.inheritPrototype(o, e.Control),
        (o.prototype.setCurrentOption = function (e, n, a) {
          if (
            this.currentOption &&
            e == this.currentOption.id &&
            (!a || this.currentOption.modelId == a)
          )
            return;
          var i = this.eventManager,
            o = this._controls;
          let l;
          if (a) {
            l = o
              .getAllObjectByAttribute("modelId", a)
              .getObjectByAttribute("id", e);
          } else l = o.getObjectByAttribute("id", e);
          0 != l &&
            ((this.currentOption = l),
            a && (this.currentOption.modelId = a),
            (this._currentElement.innerText = `${this._opt.prefix}${l.name}${this._opt.suffix}`),
            !n && i.fireEvent(t.Bimface.UI.Control.ControlEvent.Change, l));
        }),
        (o.prototype.getCurrentOption = function () {
          return this.currentOption;
        }),
        (o.prototype.enable = function (e) {
          (this.isEnable = e),
            e
              ? this.element.removeClass("bf-disable")
              : this.element.addClass("bf-disable");
        }),
        (o.prototype.createElement = function (e) {
          var t = this,
            n = i.create("li", "bf-select-option");
          return (
            (n.innerText = e.name),
            n.setAttribute("id", e.id),
            n.addEventListener("click", function () {
              t.setCurrentOption(e.id, !1, e.modelId),
                t._currentElement.removeClass("bf-open");
            }),
            n
          );
        }),
        (n.Select = o);
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Tabs"
        ),
        n = new t.Bimface.UI.Control.ControlConfig();
      e.TabsConfig = function () {
        return Object.assign({}, n, {
          className: "bf-select",
          options: [
            {
              id: "default",
              name: "请选择",
              className: "bf-tabs-option",
              title: "请选择",
            },
          ],
          default: null,
        });
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.UI.Tabs"),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        i = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        o = function (t) {
          (this._controls = t.options), e.Control.call(this, t);
          var n = this,
            a = i.create("ul", "bf-tabs-list bf-scroll-bar");
          this.list = a;
          for (var o = n._controls, l = 0, s = o.length; l < s; l++) {
            var r = n.createElement(o[l]);
            a.appendChild(r);
          }
          t.default
            ? n.setCurrentOption(t.default)
            : t.options[0] && n.setCurrentOption(t.options[0].id),
            n.element.appendChild(a),
            t.element && t.element.appendChild(n.element);
        };
      a.Type.inheritPrototype(o, e.Control),
        (o.prototype.setCurrentOption = function (e) {
          for (
            var n = this.eventManager,
              a = this._controls.getObjectByAttribute("id", e),
              i = this.list.querySelectorAll("li"),
              o = 0,
              l = i.length;
            o < l;
            o++
          )
            i[o].id == e
              ? (n.fireEvent(
                  t.Bimface.UI.Control.ControlEvent.ActiveModelTreeTab,
                  e
                ),
                i[o].addClass("active"))
              : i[o].hasClass("active") &&
                (n.fireEvent(
                  t.Bimface.UI.Control.ControlEvent.InActiveModelTreeTab,
                  e
                ),
                i[o].removeClass("active"));
          -1 != a &&
            ((this.currentOption = a),
            n.fireEvent(t.Bimface.UI.Control.ControlEvent.Change, a));
        }),
        (o.prototype.getCurrentOption = function () {
          return this.currentOption;
        }),
        (o.prototype.createElement = function (e) {
          var t = this,
            n =
              (this.eventManager,
              i.create("li", `bf-tabs-option ${e.className}`));
          return (
            (n.innerText = e.name),
            n.setAttribute("id", e.id),
            n.setAttribute("title", e.name),
            n.addEventListener("click", function () {
              t.getCurrentOption().id != e.id && t.setCurrentOption(e.id);
            }),
            n
          );
        }),
        (o.prototype.addOption = function (e) {
          if (!this._controls.getObjectByAttribute("id", e.id)) {
            this._controls.push(e);
            var t = this.createElement(e);
            this.list.appendChild(t);
          }
        }),
        (n.Tabs = o);
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Tips"
        ),
        n = new t.Bimface.UI.Control.ControlConfig();
      e.TipsConfig = function () {
        return Object.assign({}, n, {
          className: "bf-tips",
          element: null,
          html: "提示",
          timeOut: 0,
        });
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.UI.Control"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.UI.Tips"),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        i = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        o = function (t) {
          e.Control.call(this, t);
          var n = this,
            a = this.element,
            o = i.create("div", "bf-tips-container"),
            l = i.create("div", "bf-close");
          (o.innerHTML = t.html),
            a.appendChild(o),
            a.appendChild(l),
            l.addEventListener("click", function () {
              n.hide();
            }),
            (this.container = o),
            (this.timeOut = t.timeOut),
            this.show();
        };
      a.Type.inheritPrototype(o, e.Control),
        (o.prototype.close = function () {
          this.element.remove();
        }),
        (o.prototype.hide = function () {
          this.element.style.display = "none";
        }),
        (o.prototype.show = function () {
          var e = this;
          (e.element.style.display = ""),
            e.timeOut &&
              (clearTimeout(e.counter),
              (e.counter = setTimeout(function () {
                e.hide();
              }, e.timeOut)));
        }),
        (o.prototype.setHtml = function (e) {
          this.container.innerHTML = e;
        }),
        (o.prototype.getHtml = function (e) {
          return this.container.innerHTML;
        }),
        (n.Tips = o);
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).WebApplication3DConfig = function () {
      var e = {
        Toolbars: ["MainToolbar", "ModelTree"],
        navigatorType: "",
        Buttons: t.Web.Lang.Utility.ClientHelper.getIsDesktop()
          ? [
              "Home",
              "RectangleSelect",
              "Measure",
              "Section",
              "Walk",
              "Map",
              "Property",
              "Setting",
              "Information",
              "FullScreen",
            ]
          : [
              "Home",
              "ViewButton",
              "Measure",
              "Section",
              "Walk",
              "MobileProperty",
            ],
        effectMode: "performance",
        drawingSheetConfig: { displayMode: 0 },
        MobileToolbars: null,
        DefaultMobileToolbars: ["MainToolbar", "ModelTree"],
        MobileButtons: null,
        DefaultMobileButtons: [
          "Home",
          "View",
          "RectangleSelect",
          "Measure",
          "Section",
          "Walk",
          "Property",
          "Information",
        ],
        MobileButtonsMap: {
          Home: "MobileHome",
          View: "MobileViewButton",
          ViewButton: "MobileViewButton",
          RectangleSelect: "RectangleSelect",
          Measure: "Measure",
          Section: "Section",
          Walk: "Walk",
          Property: "MobileProperty",
          Information: "Information",
        },
      };
      let n = t.Bimface.Viewer.Viewer3DConfig();
      return Object.assign({}, n, e);
    }),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      let n = Object.freeze({
        ModelTreeNodeClicked: "ModelTreeNodeClicked",
        ViewAdded: "ViewAdded",
        ViewLoading: "ViewLoading",
        Rendered: "Rendered",
        PureRender: "PureRender",
        ComponentsSelectionChanged: "ComponentsSelectionChanged",
        ComponentsHoverChanged: "ComponentsHoverChanged",
        MouseClicked: "MouseClicked",
        MouseDragged: "MouseDragged",
        MouseDoubleClicked: "MouseDoubleClicked",
        ContextMenu: "ContextMenu",
        RectSelection: "RectSelection",
        Error: "Error",
        AddView: "AddView",
        RemoveView: "RemoveView",
        FamilyTypeChanged: "FamilyTypeChanged",
        MissingDrawingElement: "MissingDrawingElement",
        ToolbarHomeClick: "ToolbarHomeClick",
        DemandLoaded: "DemandLoaded",
        ButtonOnToolbarClicked: "ButtonOnToolbarClicked",
        AxisGridHover: "AxisGridHover",
        FloorExplosion: "FloorExplosion",
        Hover: "Hover",
        MouseMove: "MouseMove",
        ViewChanged: "ViewChanged",
        ModelAdded: "ModelAdded",
        WalkthroughStateChanged: "WalkthroughStateChanged",
        WalkthroughEdit: "WalkthroughEdit",
        initializeWalkthroughData: "initializeWalkthroughData",
      });
      e.WebApplication3DEvent = n;
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application"
        ),
        n =
          (t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer"),
          t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
          t.Web.Lang.Utility.Namespace.ensureNamespace(
            t,
            "Web.Common.Flexible"
          )),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        );
      const i = "Glodon.Bimface.Application.WebApplication3D",
        o = t.Bimface.Data.StatisticsDataManager.getInstance();
      e.WebApplication3D = function (e) {
        e.navigatorType &&
          t.Web.Lang.Utility.ClientHelper.setNavigatorType(e.navigatorType);
        let l = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
        var s;
        (this.isMobileNew = !1), (e.Toolbars = [...new Set(e.Toolbars)]);
        let r = [];
        if (
          (e.Buttons &&
            e.Buttons.forEach((e) => {
              ("DividerLine" != e && -1 != r.indexOf(e)) || r.push(e);
            }),
          (e.Buttons = r),
          h(this),
          l)
        )
          s = a.create("div", "bf-container");
        else {
          let l = "bf-container bf-mobile";
          if (
            ((e.enableViewHouse = !1),
            (e.MobileToolbars && e.MobileToolbars instanceof Array) ||
              (e.MobileButtons && e.MobileButtons instanceof Array))
          ) {
            e.MobileToolbars && o.send(i, "bf_c_MobileToolbars_new"),
              e.MobileButtons && o.send(i, "bf_c_MobileButtons_new"),
              (e.Toolbars = e.MobileToolbars =
                e.MobileToolbars ? e.MobileToolbars : e.DefaultMobileToolbars),
              (e.MobileButtons = e.MobileButtons
                ? e.MobileButtons
                : e.DefaultMobileButtons);
            const n = e.MobileButtonsMap;
            (e.Buttons = []),
              e.MobileButtons.forEach((t) => n[t] && e.Buttons.push(n[t])),
              (l = t.Web.Lang.Utility.ClientHelper.getIsTablet()
                ? "bf-container bf-mobile bf-mobile-new bf-tablet"
                : "bf-container bf-mobile bf-mobile-new"),
              (this.isMobileNew = !0),
              document.addEventListener("touchstart", function (e) {
                e.touches.length > 1 && e.preventDefault();
              }),
              document.addEventListener("gesturestart", function (e) {
                e.preventDefault();
              });
          }
          if (((s = a.create("div", l)), this.isMobileNew))
            s.style.fontSize = n.getFontSize();
          else {
            var c = e.domElement.offsetWidth,
              d = e.domElement.offsetHeight;
            s.style.fontSize = (90 * Math.min(c, d, 414)) / 750 + "px";
          }
          let r = e.Buttons.findIndex((e) => "View" === e);
          r > -1 && e.Buttons.splice(r, 1, "ViewButton");
        }
        delete e.DefaultMobileToolbars,
          delete e.DefaultMobileButtons,
          delete e.MobileButtonsMap;
        var f = this;
        let m = e;
        e.domElement.appendChild(s),
          (m.domElement = s),
          void 0 === e.enableLodDemDom && (m.enableLodDemDom = !0),
          (this.lastNormalModelCount = 0),
          (this.getIsMobileNew = function () {
            return this.isMobileNew;
          }),
          (this.getViewer = function () {
            return p;
          }),
          (this.getEventManager = function () {
            return g;
          }),
          (this.getToolbars = function () {
            return f.UI.getToolbars();
          }),
          (this.getToolbar = function (e) {
            return "LeftToolbar" == e && (e = "ModelTree"), f.UI.getToolbar(e);
          }),
          (this.getPanel = function (e) {
            return f.UI.getPanel(e);
          }),
          (this.getPlugin = function (e) {
            return f.UI.getPlugin(e);
          }),
          (this.render = function () {
            this.getViewer().render();
          }),
          (this.addView = function (e, t, n) {
            p.addView(e, t, n);
          }),
          (this.getAnnotationManager = function () {
            return f.getPlugin("Annotation");
          }),
          (this.setDomElement = function (e) {
            const t = s.parentElement;
            this.getViewer() && this.getViewer().resize(1, 1),
              t && t.removeChild(s),
              e.appendChild(s),
              requestAnimationFrame(() => {
                this.getViewer() && this.getViewer().resize();
              });
          }),
          (this.getWalkthroughData = function () {
            let e = this.getPanel("WalkRoutePanel");
            return e && e.walkthroughManager
              ? e.walkthroughManager.getWalkthroughList()
              : null;
          }),
          (this.initializeWalkthroughData = function (e) {
            this.getViewer().fireEvent(
              t.Bimface.Application.WebApplication3DEvent
                .initializeWalkthroughData,
              e
            );
          }),
          (this.destroy = function () {
            this.UI && (this.UI.destroy(), (this.UI = null)),
              p.destroy(),
              (p = null),
              (s.onclick = null),
              s.remove();
          }),
          (this.addEventListener =
            t.Bimface.Viewer.Viewer3D.prototype.addEventListener),
          (this.removeEventListener =
            t.Bimface.Viewer.Viewer3D.prototype.removeEventListener);
        let p = new t.Bimface.Viewer.Viewer3D(m);
        p.isMobileNew = this.isMobileNew;
        let u = t.Bimface.Viewer.Viewer3DEvent,
          g = p.getEventManager();
        p.addEventListener(u.ViewAdded, function () {
          f.UI.init();
          var e = p.getViewer();
          e.getNumOfElements(), e.getNumOfTriangles();
          p._data.modelType;
        }),
          p.addEventListener(u.ViewChanged, function (e) {
            if (f.UI) {
              f.UI.updateModelTree();
              let i = f.getToolbar("MainToolbar");
              if (i) {
                let o = [];
                for (var n = 0, a = i._controls.length; n < a; n++)
                  o.push(i._controls[n].id);
                let l = p.getModels(),
                  s = 0;
                for (let e = 0; e < l.length; e++) l[e].isEmptyModel || s++;
                0 === s
                  ? (o = [...p.emptyModelButtons])
                  : 1 === s &&
                    0 === f.lastNormalModelCount &&
                    (o = [...m.Buttons]),
                  (f.lastNormalModelCount = s);
                const r = () => {
                    let e = !1;
                    const t = [
                      "rvt",
                      "skp",
                      "igms",
                      "gbq",
                      "gcl",
                      "dgn",
                      "ifc",
                      "tdm",
                      "gtj",
                      "gqi",
                      "bmv",
                      "fbx",
                      "3ds",
                      "pdms",
                      "bdb",
                      "gbp",
                      "nwd",
                      "nwc",
                    ];
                    return (
                      f
                        .getViewer()
                        .getModels()
                        .find(
                          (n) => (
                            t.find((e) => {
                              if (
                                new RegExp(e + "[.]*").test(n._data.workerType)
                              )
                                return !0;
                            }) && (e = !0),
                            e
                          )
                        ),
                      e
                    );
                  },
                  c = b(
                    o,
                    [],
                    "Map",
                    ["Home", "RectangleSelect", "Measure", "Section", "Walk"],
                    e.Features.HasMiniMap || r()
                  ),
                  d = t.Web.Lang.Utility.ClientHelper.getIsDesktop()
                    ? "Property"
                    : "MobileProperty",
                  u = b(
                    c.oldButtons,
                    c.newButtons,
                    d,
                    [
                      "Home",
                      "RectangleSelect",
                      "Measure",
                      "Section",
                      "Walk",
                      "Map",
                    ],
                    e.Features.HasComponentProperty ||
                      e.Features.HasMaterialProperty
                  );
                f.UI.removeToolbar("MainToolbar"),
                  v(i, u.oldButtons, u.newButtons);
              }
            }
          }),
          p.addEventListener(u.AddView, function (n) {
            if (1 === n) {
              var a = new t.Bimface.Application.UI.UIConfig();
              ((a = Object.assign(a, e)).element = s),
                (a.viewer = p),
                (f.UI = new t.Bimface.Application.UI.UI(a));
            }
          }),
          p.addEventListener(u.RemoveView, function (e) {
            if (0 == e) {
              let e = f.UI && f.getPlugin("Measure");
              e && (e.clear(), e.measureHelper.destroy()),
                f.UI && f.UI.destroy(),
                (f.UI = null);
            }
          });
        const b = (e, n, a, i, o) => {
            if (
              e.indexOf(a) < 0 &&
              f.getViewer()._opt.Buttons.indexOf(a) > -1 &&
              o
            ) {
              const o = new t.Bimface.UI.Button.ButtonConfig();
              o.id = a;
              const l = e.insertAfter(i, a);
              (e = l.res),
                n.push({
                  button: new t.Bimface.UI.Button.ToggleButton(o),
                  index: l.index,
                });
            }
            return (
              e.indexOf(a) > -1 && !o && e.removeByValue(a),
              { oldButtons: e, newButtons: n }
            );
          },
          v = (e, n, a) => {
            const i = e.getControls();
            e.destroy();
            var o = t.Bimface.UI.Toolbar.ToolbarConfig();
            (o.id = "MainToolbar"),
              (o.title = "主菜单"),
              (o.className = "bf-toolbar bf-toolbar-bottom"),
              (o.element = f.UI._opt.domElement);
            let l = [];
            n &&
              n.forEach((e) => {
                ("DividerLine" != e && -1 != l.indexOf(e)) || l.push(e);
              }),
              (o.buttons = l),
              f.UI.addToolbar(o),
              i.map((e, t) => {
                e.id.split("-").length > 1 &&
                  f.getToolbar("MainToolbar").insertControl(t, e);
              }),
              a &&
                a.length > 0 &&
                a.forEach((e) => {
                  -1 == n.indexOf(e.button.id) &&
                    f
                      .getToolbar("MainToolbar")
                      .insertControl(e.index, e.button);
                });
          };
        l &&
          (s.onclick = function () {
            var e = document.activeElement,
              t = document.getElementById("cloud-main-canvas");
            t &&
              e.className.indexOf("can-get-focus") < 0 &&
              e != t &&
              "INPUT" != e.tagName &&
              "TEXTAREA" != e.tagName &&
              t.focus();
          });
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).WebApplicationRfaConfig = function () {
      let e = t.Bimface.Viewer.Viewer3DConfig();
      return (
        (e.enableExplosion = !0),
        Object.assign({}, e, {
          Toolbars: ["MainToolbar", "ModelTree"],
          Buttons: [
            "Home",
            "Measure",
            "Section",
            "Property",
            "Explode",
            "Setting",
            "FullScreen",
          ],
          EnableFamilyList: !0,
        })
      );
    }),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      let n = Object.freeze({
        ViewAdded: "ViewAdded",
        ViewLoading: "ViewLoading",
        ComponentsSelectionChanged: "ComponentsSelectionChanged",
        ComponentsHoverChanged: "ComponentsHoverChanged",
        Error: "Error",
      });
      e.WebApplicationRfaEvent = n;
    })(),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Button"
      ).Home = function (e, n) {
        var a = e.getViewer(),
          i = t.Bimface.UI.Control.ControlEvent,
          o = new t.Bimface.UI.Button.ButtonConfig();
        (o.id = "Home"),
          (o.title = BimfaceLanguage.bf_btn_home),
          (o.className = "bf-button gld-bf-home");
        var l = new t.Bimface.UI.Button.Button(o);
        if ("ViewerDrawing" == a.viewerType)
          l.addEventListener(i.Click, function () {
            a.home();
          });
        else {
          var s = "Viewer3D" === a.viewerType,
            r = t.Bimface.Viewer.Viewer3DEvent;
          l.addEventListener(i.Click, function () {
            var e = n.getControl("ViewButton");
            e && e.recover();
            var t = n.getControl("Interactive");
            if ((t && t.hideDropDownList(), s)) {
              if (!a.getViewHouseIsLoaded()) {
                var i = a.getCustomHomeview() || a.getDefaultHomeview();
                a.setCameraStatus(i);
              }
              a.getEventManager().fireEvent(r.ToolbarHomeClick);
            } else a.home();
          });
        }
        return l;
      };
    })(),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Button"
      ).MobileHome = function (e, n) {
        var a = e.getViewer(),
          i = t.Bimface.UI.Control.ControlEvent,
          o = new t.Bimface.UI.Button.ButtonConfig();
        (o.id = "MobileHome"),
          (o.title = BimfaceLanguage.bf_btn_home),
          (o.className = "bf-button gld-bf-home");
        var l = new t.Bimface.UI.Button.Button(o);
        if ("ViewerDrawing" == a.viewerType)
          l.addEventListener(i.Click, function () {
            a.home();
          });
        else {
          var s = "Viewer3D" === a.viewerType,
            r = t.Bimface.Viewer.Viewer3DEvent;
          l.addEventListener(i.Click, function () {
            var e = n.getControl("MobileSubViewButton");
            if ((e && e.recover(), s)) {
              var t = a.getCustomHomeview() || a.getDefaultHomeview();
              a.setCameraStatus(t),
                a.getEventManager().fireEvent(r.ToolbarHomeClick);
            } else a.home();
          });
        }
        return l;
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).OrbitButton = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (i) {
        var l = t.Bimface.Viewer.NavigationMode3D,
          s = { OrbitPoint: l.PickWithRect, OrbitCamera: l.Fly },
          r = new t.Bimface.UI.Button.ButtonConfig();
        (r.id = "OrbitButton"), (r.title = "导航"), (r.inheritTitle = !0);
        var c = new t.Bimface.UI.Button.ComboBox(r),
          d = new t.Bimface.UI.Button.ButtonConfig();
        (d.id = "OrbitPoint"),
          (d.title = "绕构件旋转"),
          (d.className = "bf-button gld-bf-orbitpoint");
        var f = new t.Bimface.UI.Button.ComboBoxOptionButton(d),
          m = new t.Bimface.UI.Button.ButtonConfig();
        (m.id = "OrbitCamera"),
          (m.title = "绕相机旋转"),
          (m.className = "bf-button gld-bf-orbitcamera");
        var p = new t.Bimface.UI.Button.ComboBoxOptionButton(m);
        return (
          c.addControl(f),
          c.addControl(p),
          c.addEventListener(o.Change, function (e) {
            n.getControl("Section").setCheckedState(!1),
              a.setNavigationMode(s[e.id]);
          }),
          c
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ViewButton = function (e, n) {
      var a = e.getViewer(),
        i = (e.getRootElement(), "Viewer3D" === a.viewerType),
        o = t.Bimface.UI.Control.ControlEvent;
      if (!i)
        return void console.log("The API is not supported on this viewer.");
      var l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "Home"),
        (l.title = "Home"),
        (l.className = "bf-button gld-bf-scene");
      var s = new t.Bimface.UI.Button.ComboBoxOptionButton(l),
        r = new t.Bimface.UI.Button.ButtonConfig();
      (r.id = "ViewButton"),
        (r.title = "视角"),
        (r.className = "bf-combobox viewButton"),
        (r.inheritTitle = !0),
        (r.home = s);
      var c = new t.Bimface.UI.Button.TouchComboBox(r);
      c.element.addClass(BimfaceLanguage.name);
      const d = {
        Top: "top",
        Bottom: "bottom",
        East: "right",
        South: "front",
        West: "left",
        North: "back",
      };
      for (const e in d) {
        const n = d[e];
        var f = new t.Bimface.UI.Button.ButtonConfig();
        (f.id = e), (f.title = e), (f.className = "bf-button");
        var m = new t.Bimface.UI.Button.ComboBoxOptionButton(f);
        m.setHtml(
          `<svg class="gld-bf-scene-inner"><use class="" xlink:href="#gld-bf-scene-${n}"></use></svg>`
        ),
          c.addControl(m);
      }
      return (
        c.addEventListener(o.Change, function (e) {
          a.setView(e.id);
        }),
        document
          .querySelector(".bf-mobile")
          .addEventListener("touchstart", function (e) {
            if ("canvas" == e.target.tagName.toLowerCase()) {
              var t = document.querySelector(".gld-bf-view.bf-checked");
              t && t.click();
            }
          }),
        c
      );
    }),
    (function () {
      const e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Button"
      ).MobileSubViewButtons = function (n, a) {
        const i = n.getViewer();
        if (!("Viewer3D" === i.viewerType))
          return void console.log("The API is not supported on this viewer.");
        const o = this,
          l = t.Bimface.UI.Control.ControlEvent;
        (this.subButtonWrap = e.create("div", "bf-mobile-sub-wrapper")),
          (this.selectedViewButton = null);
        const s = {
            Top: "top",
            Bottom: "bottom",
            East: "right",
            South: "front",
            West: "left",
            North: "back",
          },
          r = {};
        let c;
        for (const e in s) {
          const n = s[e];
          var d = new t.Bimface.UI.Button.ButtonConfig();
          (d.id = e),
            (d.title = e),
            (d.className = "bf-button"),
            (c = new t.Bimface.UI.Button.ToggleButton(d)),
            c.setHtml(
              `<svg class="gld-bf-scene-inner"><use class="" xlink:href="#gld-bf-scene-${n}"></use></svg>`
            ),
            (r[e] = c),
            c.addEventListener(l.StateChange, (t) => {
              o.selectedViewButton &&
                o.selectedViewButton.toggleClassName("bf-checked", !1),
                r[e].toggleClassName("bf-checked", !0),
                (o.selectedViewButton = r[e]),
                i.setView(e);
            }),
            this.subButtonWrap.appendChild(c.element);
        }
        var f = document.querySelector(".bf-mobile");
        f.appendChild(this.subButtonWrap),
          f.addEventListener("touchstart", function (e) {
            if ("canvas" == e.target.tagName.toLowerCase()) {
              var t = document.querySelector(".gld-bf-view.bf-checked");
              t && t.click();
            }
          }),
          (this.recover = function () {
            const e = this.subButtonWrap.getElementsByClassName("bf-checked");
            e.length &&
              Array.from(e).forEach((e) => {
                e.removeClass("bf-checked");
              });
          }),
          (this.hide = function () {
            this.subButtonWrap.style.display = "none";
          }),
          (this.show = function () {
            this.subButtonWrap.style.display = "flex";
          });
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).MobileViewButton = function (e, n) {
      var a = "Viewer3D" === e.getViewer().viewerType,
        i = t.Bimface.UI.Control.ControlEvent;
      if (!a)
        return void console.log("The API is not supported on this viewer.");
      let o = null;
      var l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "ViewButton"),
        (l.title = "视角"),
        (l.className = "bf-button gld-bf-scene");
      var s = new t.Bimface.UI.Button.ToggleButton(l);
      return (
        s.addEventListener(i.StateChange, function (a) {
          o ||
            (o = new t.Bimface.Application.UI.Button.MobileSubViewButtons(
              e,
              n
            )),
            a ? o.show() : o.hide();
        }),
        document
          .querySelector(".bf-mobile")
          .addEventListener("touchstart", function (e) {
            if ("canvas" == e.target.tagName.toLowerCase()) {
              var t = document.querySelector(".gld-bf-view.bf-checked");
              t && t.click();
            }
          }),
        s
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).RectangleSelect = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent,
        l = t.Bimface.Viewer.Viewer3DEvent;
      if (i) {
        var s = new t.Bimface.UI.Button.ButtonConfig();
        (s.id = "RectangleSelect"),
          (s.title = BimfaceLanguage.bf_btn_zoom),
          (s.className = "bf-button gld-bf-zoomrect");
        var r = new t.Bimface.UI.Button.ToggleButton(s),
          c = function (e) {
            e.end && r.setCheckedState(!1);
          };
        return (
          r.addEventListener(o.StateChange, function (e) {
            e
              ? (a.enableZoomRect(!0), a.addEventListener(l.RectSelection, c))
              : (a.enableZoomRect(!1),
                a.removeEventListener(l.RectSelection, c));
          }),
          r
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).RectZoom = function (e, n) {
      var a = e.getViewer(),
        i = t.Bimface.UI.Control.ControlEvent,
        o = t.Bimface.Viewer.ViewerDrawingEvent,
        l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "RectZoom"),
        (l.title = BimfaceLanguage.bf_btn_zoom),
        (l.className = "bf-button gld-bf-zoomrect");
      var s = new t.Bimface.UI.Button.ToggleButton(l),
        r = function () {
          setTimeout(function () {
            s.setCheckedState(!1);
          }, 200);
        };
      return (
        s.addEventListener(i.StateChange, function (e) {
          if (e) a.rectZoom(), a.addEventListener(o.ViewZoomed, r);
          else {
            var t = n.getControl("Measure");
            t && t._checked
              ? a.getViewer().mouseEditorMgr.activeEditorByName("measure")
              : a.getViewer().mouseEditorMgr.activeEditorByName("pick"),
              a.removeEventListener(o.ViewZoomed, r);
          }
        }),
        s
      );
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Common.Flexible"
        );
      e.PropertyPanel = function (e, a, i) {
        var o = t.Bimface.Viewer.Viewer3DEvent,
          l = t.Bimface.Application.WebApplication3DEvent;
        let s = e.getDefaultModel(),
          r = !1;
        var c = function (e) {
            for (var t = [], n = 0; n < e.length; n++) {
              for (
                var a = e[n].name, i = e[n].parameters, o = [], l = 0;
                l < i.length;
                l++
              )
                o = o.concat(i[l].items);
              t = t.concat([{ group: a, items: o }]);
            }
            return t;
          },
          d = function () {
            b._tab && "components" != b._tab.getCurrentOption().id
              ? b.setTips(BimfaceLanguage.bf_panel_props_matSel)
              : b.setTips(BimfaceLanguage.bf_panel_props_propSel);
          };
        const f = (t) =>
          "integrateModel" == e.getModel(t.modelId)._data.modelType &&
          (t.fileId || t.fileIdFromParent) &&
          t.id &&
          1 == t.id.split(".").length
            ? (t.fileId || t.fileIdFromParent) + "." + t.id
            : t.id;
        var m = function (t) {
            let n;
            return (
              e.getModels().some((e) => {
                let a = [];
                if (
                  ((a = t ? t[e.modelId] || [] : e.getSelectedComponents()),
                  n || 1 !== a.length)
                ) {
                  if (a.length > 1 || (1 === a.length && n && n.id !== a[0]))
                    return (n = void 0), !0;
                } else n = { modelId: e.modelId, id: a[0] };
              }),
              !n &&
                e.lastViewedNodeInfo &&
                1 ==
                  e
                    .getDomElement()
                    .parentElement.getElementsByClassName(
                      "bf-panel bf-modelTree-panel bf-sizable"
                    ).length &&
                1 ==
                  e
                    .getDomElement()
                    .parentElement.getElementsByClassName(
                      "bf-panel bf-modelTree-panel bf-sizable"
                    )[0]
                    .getElementsByClassName("bf-tree-name bf-selected")
                    .length &&
                (n = e.lastViewedNodeInfo),
              n
            );
          },
          p = function (t, n, a) {
            if (r) return;
            let i = a && "boolean" == typeof a ? t : m(t);
            b.setTips(BimfaceLanguage.bf_panel_modelTree_loading, "loading"),
              b.clear(),
              i
                ? !b._tab ||
                  (b._tab && "components" == b._tab.getCurrentOption().id)
                  ? e.getModel(i.modelId).getComponentProperty(
                      i.id,
                      function (e) {
                        b.setTips(BimfaceLanguage.bf_panel_props_propSel),
                          b.setData(e.properties);
                      },
                      function (e) {
                        d(), b.setData("");
                      }
                    )
                  : (!b._tab ||
                      (b._tab &&
                        "components" != b._tab.getCurrentOption().id)) &&
                    (t
                      ? e.getModel(i.modelId).getMaterialProperty(
                          i.id,
                          function (e) {
                            if (
                              (b.setTips(BimfaceLanguage.bf_panel_props_matSel),
                              e && e.length > 0)
                            ) {
                              var t = c(e);
                              b.setData(t, !0);
                            } else b.setData("");
                          },
                          function () {
                            b.setTips(BimfaceLanguage.bf_panel_props_matSel),
                              b.setData("");
                          }
                        )
                      : b.setData(""))
                : "rfaView" == s._data.renderType
                ? s.getFamilyProperty(
                    s._data.familyTypeId,
                    function (e) {
                      b.setTips(BimfaceLanguage.bf_panel_props_propSel),
                        b.setData(e.properties);
                    },
                    function (e) {
                      d(), b.setData("");
                    }
                  )
                : (d(), b.setData(""));
          },
          u = function (t) {
            if (((r = !0), !t.isSelected)) return b.setData("");
            if (
              (b.setTips(BimfaceLanguage.bf_panel_modelTree_loading, "loading"),
              b.clear(),
              !b._tab ||
                (b._tab && "components" == b._tab.getCurrentOption().id))
            ) {
              const n = f(t);
              (e.lastViewedNodeInfo = { modelId: t.modelId, id: n }),
                e.getModel(t.modelId).getComponentProperty(
                  n,
                  function (e) {
                    b.setTips(BimfaceLanguage.bf_panel_props_propSel),
                      b.setData(e.properties),
                      (r = !1);
                  },
                  function (e) {
                    d(), b.setData(""), (r = !1);
                  }
                );
            } else if (
              !b._tab ||
              (b._tab && "material" == b._tab.getCurrentOption().id)
            ) {
              const n = f(t);
              (e.lastViewedNodeInfo = { modelId: t.modelId, id: n }),
                e.getModel(t.modelId).getMaterialProperty(
                  n,
                  function (e) {
                    if (
                      (b.setTips(BimfaceLanguage.bf_panel_props_propSel),
                      e && e.length > 0)
                    ) {
                      var t = c(e);
                      b.setData(t, !0);
                    } else b.setData("");
                    r = !1;
                  },
                  function (e) {
                    b.setTips(BimfaceLanguage.bf_panel_props_matSel),
                      b.setData(""),
                      (r = !1);
                  }
                );
            }
          },
          g = function (t) {
            let n = m();
            if (!n && "rfaView" != s._data.renderType)
              return (
                "components" == t
                  ? b.setTips(BimfaceLanguage.bf_panel_props_propSel)
                  : b.setTips(BimfaceLanguage.bf_panel_props_matSel),
                b.setData("")
              );
            "components" == t
              ? p(n, 0, !0)
              : (b.setData(""),
                e.getModel(n.modelId).getMaterialProperty(
                  n.id,
                  function (e) {
                    if (e && e.length > 0) {
                      var t = c(e);
                      b.setData(t, !0);
                    } else d(), b.setData("");
                  },
                  function () {
                    d(), b.setData("");
                  }
                ));
          },
          h = new t.Bimface.UI.Panel.PanelConfig();
        if (
          ((h.title = BimfaceLanguage.bf_btn_props),
          (h.className = "bf-panel property-panel"),
          (h.id = "property"),
          (h.enableSizable = !0),
          t.Web.Lang.Utility.ClientHelper.getIsDesktop())
        )
          h.css = {
            right: "10px",
            top: "10px",
            width: "300px",
            height: "416px",
          };
        else {
          let t = "37.5px";
          if (e.getIsMobileNew()) (h.enableSizable = !1), (t = n.getFontSize());
          else {
            const e = a.offsetWidth,
              n = a.offsetHeight;
            t = (100 * Math.min(n, e, 414)) / 750 + "px";
          }
          h.css = {
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            fontSize: t,
          };
        }
        var b = new t.Bimface.UI.Panel.Panel(h);
        b.setTips(BimfaceLanguage.bf_panel_props_propSel),
          (e.propertyPanel = b);
        let v = b.container;
        v.setAttribute("tabindex", -1),
          v.addClass("can-get-focus"),
          v.addEventListener(
            "mousedown",
            (e) => {
              v && v.focus && v.focus({ preventScroll: !0 });
            },
            !1
          ),
          b.addClass("property-panel"),
          b.addClass("bf-property-panel");
        var y = [
          { id: "components", name: BimfaceLanguage.bf_panel_props_props },
          { id: "material", name: BimfaceLanguage.bf_panel_props_mats },
        ];
        if (!this._tab && e._manifest.Features.HasMaterialProperty) {
          var C = new t.Bimface.UI.Tabs.TabsConfig();
          (C.className = "bf-property-tab"),
            (C.default = "components"),
            (C.options = y);
          var w = new t.Bimface.UI.Tabs.Tabs(C);
          w.addEventListener(
            t.Bimface.UI.Control.ControlEvent.Change,
            function (e) {
              g(e.id);
            }
          ),
            (b._tab = w),
            b.setContainerHeader(w.element);
        }
        return (
          g("components"),
          e.addEventListener(l.ModelTreeNodeClicked, u),
          e.addEventListener(o.SelectionChangedInModel, p),
          b.addEventListener("Hide", function () {
            e.removeEventListener(o.SelectionChangedInModel, p),
              e.removeEventListener(l.ModelTreeNodeClicked, u);
          }),
          (b.initProperty = g),
          b
        );
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).Property = function (e, n) {
      var a = e.getViewer(),
        i = e.getRootElement(),
        o = "Viewer3D" === a.viewerType,
        l = t.Bimface.UI.Control.ControlEvent,
        s = t.Bimface.Viewer.Viewer3DEvent;
      if (o) {
        var r = new t.Bimface.UI.Button.ButtonConfig();
        (r.id = "Property"),
          (r.title = BimfaceLanguage.bf_btn_props),
          (r.className = "bf-button gld-bf-properties");
        var c,
          d = new t.Bimface.UI.Button.ToggleButton(r);
        return (
          d.addEventListener(l.StateChange, function (o) {
            o
              ? (a.propertyPanel &&
                  (a.propertyPanel.close(), e.removePanel(a.propertyPanel.id)),
                (c = new t.Bimface.Application.UI.Panel.PropertyPanel(
                  a,
                  i,
                  n
                )).addEventListener("Hide", function () {
                  d.setCheckedState(!1);
                }),
                i.appendChild(c.element),
                c.bringToFront(),
                c.initPosition(),
                e.addPanel(c))
              : (c.close(), e.removePanel(c.id)),
              a
                .getEventManager()
                .fireEvent(s.ButtonOnToolbarClicked, {
                  id: r.id,
                  isChecked: o,
                });
          }),
          d
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Button"
      ).MobileProperty = function (e, n) {
        var a = e.getViewer(),
          i = e.getRootElement(),
          o = "Viewer3D" === a.viewerType,
          l = t.Bimface.UI.Control.ControlEvent;
        if (o) {
          var s = new t.Bimface.UI.Button.ButtonConfig();
          (s.id = "MobileProperty"),
            (s.title = BimfaceLanguage.bf_btn_props),
            (s.className = "bf-button gld-bf-properties");
          var r,
            c,
            d = new t.Bimface.UI.Button.ToggleButton(s),
            f = t.Web.Lang.Utility.ClientHelper.getIsTablet(),
            m = !f && a.getIsMobileNew();
          return (
            d.addEventListener(l.StateChange, function (o) {
              if (
                (m &&
                  (c || (c = e.getToolbar("MainToolbar")),
                  o ? c && c.hide() : c && c.show()),
                o)
              ) {
                var l = n.getControl("ViewButton");
                l && l.setCheckedState && l.setCheckedState(!1),
                  (r = new t.Bimface.Application.UI.Panel.PropertyPanel(
                    a,
                    i,
                    n
                  )).addEventListener("Hide", function () {
                    "none" != r.element.style.display &&
                      i.removeChild(r.element),
                      d.setCheckedState(!1);
                  }),
                  i.appendChild(r.element),
                  e.addPanel(r),
                  setTimeout(() => {
                    f
                      ? r.addClass("bf-panel-tablet")
                      : r.addClass("bf-panel-bottom");
                  }, 100);
              } else i.removeChild(r.element), e.removePanel(r.id);
              a.getEventManager().fireEvent(
                t.Bimface.Viewer.Viewer3DEvent.ButtonOnToolbarClicked,
                { id: s.id, isChecked: o }
              );
            }),
            d
          );
        }
        console.log("The API is not supported on this viewer.");
      };
    })();
  class b {
    constructor() {}
    static formatDistance(e, t) {
      if (null == e) return null;
      let n = t.precision,
        a = t.scale || 1,
        i = t.unit,
        o = 1;
      return (
        "Centimeter" === i
          ? (o = 10)
          : "Meter" === i
          ? (o = 1e3)
          : "Kilometer" === i && (o = 1e6),
        "m" === t.defaultUnit && (a *= 1e3),
        (e *= a),
        (e /= o),
        this.formatPrecision(e, n)
      );
    }
    static formatArea(e, t) {
      let n = t.precision,
        a = t.scale,
        i = t.unit,
        o = 1;
      return (
        "Centimeter" === i
          ? (o = 100)
          : "Meter" === i
          ? (o = 1e6)
          : "Kilometer" === i && (o = 1e13),
        "m" === t.defaultUnit && (a *= 1e3),
        (e *= Math.pow(a, 2)),
        (e /= o),
        this.formatPrecision(e, n)
      );
    }
    static formatCubic(e, t) {
      let n = t.precision,
        a = t.scale,
        i = t.unit,
        o = 1;
      return (
        "Centimeter" === i
          ? (o = 1e3)
          : "Meter" === i
          ? (o = 1e9)
          : "Kilometer" === i && (o = 1e19),
        "m" === t.defaultUnit && (a *= 1e3),
        (e *= Math.pow(a, 3)),
        (e /= o),
        n
          ? this.toLocaleString(this.formatPrecision(e, n))
          : this.formatPrecision(e, n)
      );
    }
    static getPostFix(e, t) {
      if ("None" === e) return "";
      let n = {
        None: "",
        Kilometer: "km",
        Meter: "m",
        Centimeter: "cm",
        Millimeter: "mm",
      }[e];
      return t ? (n += "²") : (n = " " + n), n;
    }
    static toLocaleString(e) {
      let t = e.toString();
      return (t = t.replace(/\d{1,3}(?=((\d{3})+(\.\d+)?)$)/g, "$&,")), t;
    }
    static formatPrecision(e, t) {
      if (
        ((e = parseInt(Math.round(e * Math.pow(10, t))) / Math.pow(10, t)),
        0 != t)
      ) {
        let n = e.toFixed(t).split(".");
        e = n[0] + "." + n[1];
      } else e = this.toLocaleString(e);
      return e;
    }
  }
  !(function () {
    var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.Dom"
    );
    var n;
    t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Panel"
    ).MeasurePanel = function (a, i) {
      let o = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
      var l,
        s = "Viewer3D" === (n = a._opt.viewer).getViewerType(),
        r = e.create("div", "bf-tab-container"),
        c = e.create("div", "bf-tab-body"),
        d = e.create("div", "bf-tab-foot"),
        f = e.create("ul", "bf-measure-tab"),
        m = e.create("div", "bf-measure-tabface");
      const p = a.getMeasureType();
      (m.innerHTML = `<li class="bf-measure-tab-item" data-type="Distance">\n                            <i class="gld-bimface ${
        {
          Distance: "gld-bf-distance",
          Angle: "gld-bf-angle",
          Elevation: "gld-bf-elevation",
          LaserClearDistance: "gld-bf-mesaure-laser",
        }[p]
      }" ></i>\n                        </li>`),
        (f.innerHTML = `<li class="bf-measure-tab-item" data-type="Distance">\n      <i class="gld-bimface gld-bf-distance" title="${
          BimfaceLanguage.bf_tip_measure_distance
        }"></i>\n      </li>\n      ${
          o
            ? `\n        <li class="bf-measure-tab-item" data-type="MinimumDistance">\n          <i class="gld-bimface gld-bf-distance-min" title="${BimfaceLanguage.bf_tip_measure_mindis}"></i>\n        </li>\n      `
            : ""
        }\n      <li class="bf-measure-tab-item" data-type="Angle">\n        <i class="gld-bimface gld-bf-angle" title="${
          BimfaceLanguage.bf_tip_measure_angle
        }"></i>\n      </li>\n      <li class="bf-measure-tab-item" data-type="Elevation">\n        <i class="gld-bimface gld-bf-elevation" title="${
          BimfaceLanguage.bf_tip_measure_elevation
        }"></i>\n      </li>\n      ${
          o && s
            ? `\n        <div style="width: 100%;height: 1px;background-color: #555;float: left;"></div>\n        <li class="bf-measure-tab-item" data-type="Volume">\n          <i class="gld-bimface gld-bf-volume-lg" title="${BimfaceLanguage.bf_tip_measure_volume}"></i>\n        </li>\n        <div class="bf-measure-tab-icon"><span class="bf-measure-tab-arrow bf-measure-tab-arrow-open"></span></div>\n      `
            : ""
        }\n      <li class="bf-measure-tab-item" data-type="LaserClearDistance">\n        <i class="gld-bimface gld-bf-mesaure-laser" title="${
          BimfaceLanguage.bf_panel_measure_laser
        }"></i>\n      </li>\n      ${
          o
            ? `\n        <li class="bf-measure-tab-item" data-type="Slope">\n          <i class="gld-bimface gld-bf-slope-lg" title="${BimfaceLanguage.bf_tip_measure_slope}"></i>\n        </li>\n      `
            : ""
        }\n      ${
          o
            ? `\n        <li class="bf-measure-tab-item" data-type="SpatialArea">\n          <i class="gld-bimface gld-bf-area" title="${BimfaceLanguage.bf_tip_measure_spatial_area}"></i>\n        </li>\n      `
            : ""
        }\n    `);
      for (
        var u = a.type, g = f.querySelectorAll(".bf-measure-tab-item"), h = 0;
        h < g.length;
        h++
      ) {
        g[h].getAttribute("data-type") === u && g[h].addClass("bf-active"),
          g[h].addEventListener("click", function () {
            for (var e = 0; e < g.length; e++) g[e].removeClass("bf-active");
            var t = this.getAttribute("data-type");
            this.addClass("bf-active"), a.setMeasureType(t);
            let n = a.getSelectedItem(),
              i =
                n && n.type == t
                  ? a.drawableManager.mapMeasureInfo[n.getId()]
                  : {};
            I(t, i);
          });
      }
      if (o && s) {
        var v = !1,
          y = f.querySelectorAll(".bf-measure-tab-icon")[0],
          C = f.querySelectorAll(".bf-measure-tab-arrow")[0];
        y.addEventListener("click", function () {
          v
            ? ((f.style.height = "51px"),
              (document.getElementsByClassName(
                "bf-measurement-panel"
              )[0].style.height = "240px"),
              C.removeClass("bf-measure-tab-arrow-close"),
              C.addClass("bf-measure-tab-arrow-open"))
            : ((f.style.height = "101px"),
              (document.getElementsByClassName(
                "bf-measurement-panel"
              )[0].style.height = "290px"),
              C.removeClass("bf-measure-tab-arrow-open"),
              C.addClass("bf-measure-tab-arrow-close")),
            (v = !v);
        });
      }
      (d.innerHTML = `<div class="settingBtn">${BimfaceLanguage.bf_panel_measure_clearAll}<div>`),
        d.addEventListener("click", function () {
          a.clear();
        });
      var w = e.create("span", "bf-clear-all gld-bf-measure-settings");
      w.addEventListener("click", function (e) {
        M(), e.preventDefault(), e.stopPropagation();
      }),
        r.appendChild(f),
        r.appendChild(c),
        o && (r.appendChild(d), d.appendChild(w));
      var B = {
          Millimeter: "mm",
          Centimeter: "cm",
          Meter: "m",
          Kilometer: "km",
        },
        L = function (e) {
          e
            ? (l.setTitleContent(BimfaceLanguage.bf_btn_measure),
              (l.element.querySelector(".bf-close").style.display = "block"),
              (T.style.display = "none"),
              (r.style.display = "block"))
            : ((l.element.querySelector(".bf-close").style.display = "none"),
              l.setTitleContent(BimfaceLanguage.bf_panel_measure_setting),
              (T.style.display = "block"),
              (r.style.display = "none"));
        },
        M = function (e) {
          L(!1);
          var n,
            i = a.getUnits(),
            o = a.getPrecision();
          "object" == typeof o && (o = o.distance),
            (n = `<ul class="bf-measure-setting">\n                <li class="bf-measure-lengthUnits">\n                  <span >${BimfaceLanguage.bf_panel_measure_units} :</span>\n                  <div class = 'unit'></div>\n                </li>\n                <li class="bf-measure-prompt">${BimfaceLanguage.bf_panel_measure_unitsTip}</li>\n                <li class="bf-measure-precision">\n                  <span >${BimfaceLanguage.bf_panel_measure_precision} :</span>\n                  <div class = 'unit'></div>\n                </li>\n\n              </ul>`),
            (_.innerHTML = n);
          var l = new t.Bimface.Application.Button({
            type: "ComboBox",
            id: "units",
            inheritTitle: !0,
            className: "bf-combobox",
            options: {},
            handles: { Change: function (e) {} },
          });
          for (var s in B) {
            var r = {
              type: "ComboBoxOptionButton",
              title: (f = B[s]),
              id: s,
              className: "bf-button",
              html: `<span class="bf-button-name">${f}</span>`,
            };
            l.addControl(new t.Bimface.Application.Button(r));
          }
          l.setSelectedControlById(i.distance),
            _.querySelector(".bf-measure-lengthUnits .unit").appendChild(
              l.element
            ),
            (l.element.onclick = function () {
              c.element.removeClass("bf-expand");
            });
          var c = new t.Bimface.Application.Button({
              type: "ComboBox",
              id: "units",
              inheritTitle: !0,
              className: "bf-combobox",
              options: {},
              handles: { Change: function (e) {} },
            }),
            d = { 0: "0", 1: "0.0", 2: "0.00", 3: "0.000" };
          for (var s in d) {
            var f;
            r = {
              type: "ComboBoxOptionButton",
              title: (f = d[s]),
              id: s.toString(),
              className: "bf-button",
              html: `<span class="bf-button-name">${f}</span>`,
            };
            c.addControl(new t.Bimface.Application.Button(r));
          }
          c.setSelectedControlById(o),
            _.querySelector(".bf-measure-precision .unit").appendChild(
              c.element
            ),
            (c.element.onclick = function () {
              l.element.removeClass("bf-expand");
            }),
            (S.innerHTML = `<div class="bf-measure-btns">\n                                    <span class= 'save'>${BimfaceLanguage.bf_panel_measure_save} </span> <span class= cancel>${BimfaceLanguage.bf_general_cancel}</span>\n                               </div>`),
            (S.querySelector(".save").onclick = function () {
              let e = c.getCurrentControl().id,
                t = l.getCurrentControl().id;
              a.setPrecision({ distance: e, elevation: e, angle: e, area: e }),
                a.setUnits({ distance: t, area: t }),
                L(!0),
                I(a.type, {}),
                a.getEventManager().fireEvent("MeasureParamsUpdated");
            }),
            (S.querySelector(".cancel").onclick = function () {
              L(!0);
            });
        },
        T = e.create("div", "bf-setting-container"),
        _ = e.create("div", "bf-setting-body"),
        S = e.create("div", "bf-setting-foot");
      T.appendChild(_), T.appendChild(S);
      var I = function (e, n) {
          let i,
            o = a.getUnits(),
            l =
              ("None" != o.distance &&
                `<span class='units'>${B[o.distance]}</span>`) ||
              "",
            s =
              ("None" != o.area && `<span class='units'>${B[o.area]}</span>`) ||
              "",
            r =
              ("None" != o.elevation &&
                `<span class='units'>${B[o.elevation]}</span>`) ||
              "";
          switch (e) {
            case t.Bimface.Plugins.Measure.MeasureTypeOption.Distance:
              var d = void 0 !== n.distance ? k(n.distance) : "--",
                f = void 0 !== n.distanceX ? k(n.distanceX) : "--",
                m = void 0 !== n.distanceY ? k(n.distanceY) : "--",
                p = void 0 !== n.distanceZ ? k(n.distanceZ) : "--";
              (i = `<ul class="bf-measure-info">\n                  <li class="bf-measure-distance">${BimfaceLanguage.bf_panel_measure_distance}：\n                    <span class="bf-measure-value">${d}</span>${l}\n                    <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${BimfaceLanguage.bf_tip_section_resetBox}"><span>\n                  </li>\n                  <li class="bf-measure-x">X： ${f}</li>\n                  <li class="bf-measure-y">Y： ${m}</li>\n                  <li class="bf-measure-z">Z： ${p}</li>\n                </ul>`),
                (c.innerHTML = i),
                c
                  .querySelector(".gld-bf-reset-box")
                  .addEventListener("click", function () {
                    a.reset();
                  });
              break;
            case t.Bimface.Plugins.Measure.MeasureTypeOption.Angle:
              let e =
                void 0 !== n.angle
                  ? b.formatPrecision(n.angle, a.getMeasureParams().precision)
                  : "--";
              (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">${BimfaceLanguage.bf_panel_measure_angle}：\n                      <span class="bf-measure-value">${e}</span> °\n                      <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${BimfaceLanguage.bf_tip_section_resetBox}"><span></li>\n                  </ul>`),
                (c.innerHTML = i),
                c
                  .querySelector(".gld-bf-reset-box")
                  .addEventListener("click", function () {
                    a.reset();
                  });
              break;
            case t.Bimface.Plugins.Measure.MeasureTypeOption.MinimumDistance:
              d = void 0 !== n.distance ? k(n.distance) : "--";
              (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">${BimfaceLanguage.bf_panel_measure_mindis}：\n                      <span class="bf-measure-value">${d}</span>${l}\n                    </li>\n                  </ul>`),
                (c.innerHTML = i);
              break;
            case t.Bimface.Plugins.Measure.MeasureTypeOption.Elevation:
              let o = "--";
              n.points &&
                ((o = k(n.points[0].z)), 0 == o.split(" ")[0] && (o = `±${o}`)),
                (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">${BimfaceLanguage.bf_panel_measure_elevation}：\n                    <span class="bf-measure-value">${o}</span> ${r}\n                    <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${BimfaceLanguage.bf_tip_section_resetBox}"><span>\n                    </li>\n                  </ul>`),
                (c.innerHTML = i),
                c
                  .querySelector(".gld-bf-reset-box")
                  .addEventListener("click", function () {
                    a.reset();
                  });
              break;
            case t.Bimface.Plugins.Measure.MeasureTypeOption.LaserClearDistance:
              (i = `<ul class="bf-measure-info">\n            <li class="bf-measure-distance">${BimfaceLanguage.bf_panel_measure_laser}\n            <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${BimfaceLanguage.bf_tip_section_resetBox}"><span>\n            </li>\n          </ul>`),
                (c.innerHTML = i),
                c
                  .querySelector(".gld-bf-reset-box")
                  .addEventListener("click", function () {
                    a.clear();
                  });
              break;
            case t.Bimface.Plugins.Measure.MeasureTypeOption.Volume:
              var u = n.volumeResult
                ? b.formatCubic(n.volumeResult, a.getMeasureParams())
                : "--";
              (i = `<ul class="bf-measure-info">\n            <li class="bf-measure-distance">${
                BimfaceLanguage.bf_panel_measure_volume
              }：\n            <span class="bf-measure-value" style="word-break: break-all;">${u}</span> ${l} ³\n            <span class="bf-measure-value" style="width: 100%; margin-top: 5px; font-size: 12px; text-align: center; line-height: 24px; ${
                n.notSupport ? "display: inline-block;" : "display: none;"
              }">${
                BimfaceLanguage.bf_panel_measure_volumeTip
              }</span>\n            <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${
                BimfaceLanguage.bf_tip_section_resetBox
              }"><span>\n            </li>\n          </ul>`),
                (c.innerHTML = i),
                c
                  .querySelector(".gld-bf-reset-box")
                  .addEventListener("click", function () {
                    a.clear();
                  });
              break;
            case t.Bimface.Plugins.Measure.MeasureTypeOption.Slope:
              var g = void 0 !== n.slope ? n.slope : "--";
              (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">${BimfaceLanguage.bf_panel_measure_slope}：\n                      <span class="bf-measure-value">${g}</span> %\n                    </li>\n                  </ul>`),
                (c.innerHTML = i);
              break;
            case t.Bimface.Plugins.Measure.MeasureTypeOption.SpatialArea:
              var h =
                void 0 !== n.area
                  ? b.formatArea(n.area, a.getMeasureParams())
                  : "--";
              (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">${BimfaceLanguage.bf_panel_measure_spatial_area}：\n                      <span class="bf-measure-value">${h}</span> ${s} ²\n                    </li>\n                  </ul>`),
                (c.innerHTML = i);
          }
        },
        k = function (e) {
          return b.formatDistance(e, a.getMeasureParams());
        },
        x = new t.Bimface.UI.Panel.PanelConfig();
      (x.title = BimfaceLanguage.bf_btn_measure),
        (x.id = "MeaurePanel"),
        (x.css = o
          ? { right: "10px", bottom: "270px", width: "200px", height: "240px" }
          : {
              maxWidth: "414px",
              left: "50%",
              transform: "translate(-50%)",
              bottom: "0.12em",
              width: "100%",
              height: "2em",
            }),
        (x.enableSizable = !1),
        (x.className = "bf-panel bf-measurement-panel"),
        a.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.Measuring,
          function (e) {
            I(e.type, {});
          }
        ),
        a.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.Measured,
          function (e) {
            I(e.type, e),
              e.type ==
                t.Bimface.Plugins.Measure.MeasureTypeOption.MinimumDistance &&
                (a.measureItem.setMinDistanceLine(e), a.measureItem.draw());
          }
        ),
        a.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.MeasureResultUpdating,
          function (e) {
            I(e.type, e);
          }
        ),
        a.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.MeasureResultUpdated,
          function (e) {
            I(e.type, e);
          }
        ),
        a.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.MeasureSelected,
          function (e) {
            let t = f.querySelectorAll(".bf-measure-tab-item");
            for (const e of t) e.removeClass("bf-active");
            for (const n of t)
              if (n.getAttribute("data-type") === e.type) {
                n.addClass("bf-active");
                break;
              }
            a.setMeasureType(e.type), I(e.type, e);
          }
        ),
        a.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.MeasureUnselected,
          function (e) {
            I(a.type, {});
          }
        ),
        a.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.Reset,
          function () {
            I(a.getMeasureType(), {});
          }
        ),
        (l = new t.Bimface.UI.Panel.Panel(x)),
        (n = a._opt.viewer),
        l.container.appendChild(r),
        l.container.appendChild(T);
      let E = l.element.querySelector(".bf-close");
      if (!o) {
        var N = i.offsetWidth,
          P = i.offsetHeight;
        (l.element.style.fontSize = (100 * Math.min(N, P, 414)) / 750 + "px"),
          l.element.addClass("measure-panel"),
          p === t.Bimface.Plugins.Measure.MeasureTypeOption.Distance ||
            l.element.addClass("miniStyle");
        var U = l.element.querySelector(".bf-measure-tab");
        (E.innerHTML = `<span class='quit'>${BimfaceLanguage.bf_general_exit}</span>`),
          (U.measure = a),
          (U.id = "measureTabs"),
          U.addEventListener(
            "click",
            function (e) {
              U.hasClass("tab-open")
                ? (U.removeClass("tab-open"), l.element.removeClass("tab-open"))
                : (U.addClass("tab-open"), l.element.addClass("tab-open"));
              const n = e.target.parentElement.dataset.type,
                a = document.querySelector(`[data-type='${n}']`);
              l.element[
                (n === t.Bimface.Plugins.Measure.MeasureTypeOption.Distance
                  ? "remove"
                  : "add") + "Class"
              ]("miniStyle"),
                I(n, {}),
                U.measure.setMeasureType(n),
                U.querySelector(".bf-active").removeClass("bf-active"),
                a.addClass("bf-active"),
                (m.innerHTML = ""),
                m.appendChild(a.cloneNode(!0)),
                e.preventDefault(),
                e.stopPropagation();
            },
            !0
          ),
          m.addEventListener("click", function (e) {
            U.hasClass("tab-open")
              ? (U.removeClass("tab-open"), l.element.removeClass("tab-open"))
              : (U.addClass("tab-open"), l.element.addClass("tab-open"));
          }),
          l.element.appendChild(U),
          l.element.appendChild(m);
      }
      return (
        E &&
          E.addEventListener(
            "click",
            function (e) {
              a.switchOff(), l.close();
            },
            !0
          ),
        "rfaView" == n._data.renderType && f.addClass("bf-measure-tab-rfa"),
        I(p, {}),
        l
      );
    };
  })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      var n;
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Panel.Mobile"
      ).MobileMeasurePanel = function (a, i, o) {
        (n = a._opt.viewer).getViewerType();
        var l,
          s = e.create("div", "bf-tab-container"),
          r = e.create("div", "bf-tab-body"),
          c = e.create("ul", "bf-measure-tab");
        const d = a.getMeasureType();
        c.innerHTML = `\n      <li class="bf-measure-tab-item">\n        <i class="gld-bimface gld-bf-arrowdown" title="${BimfaceLanguage.bf_tip_measure_distance}"></i>\n      </li>\n      <li class="bf-measure-tab-item" data-type="Distance">\n        <i class="gld-bimface gld-bf-distance" title="${BimfaceLanguage.bf_tip_measure_distance}"></i>\n      </li>\n      <li class="bf-measure-tab-item" data-type="Angle">\n        <i class="gld-bimface gld-bf-angle" title="${BimfaceLanguage.bf_tip_measure_angle}"></i>\n      </li>\n      <li class="bf-measure-tab-item" data-type="Elevation">\n        <i class="gld-bimface gld-bf-elevation" title="${BimfaceLanguage.bf_tip_measure_elevation}"></i>\n      </li>\n      <li class="bf-measure-tab-item" data-type="LaserClearDistance">\n        <i class="gld-bimface gld-bf-mesaure-laser" title="${BimfaceLanguage.bf_panel_measure_laser}"></i>\n      </li>\n    `;
        for (
          var f = c.querySelectorAll(".bf-measure-tab-item"), m = 0;
          m < f.length;
          m++
        ) {
          var p = f[m].getAttribute("data-type");
          0 !== m
            ? (p === d && f[m].addClass("bf-active"),
              f[m].addEventListener("click", function () {
                for (var e = 0; e < f.length; e++)
                  f[e].removeClass("bf-active");
                var t = this.getAttribute("data-type");
                this.addClass("bf-active"), a.setMeasureType(t);
                let n = a.getSelectedItem(),
                  i =
                    n && n.type == t
                      ? a.drawableManager.mapMeasureInfo[n.getId()]
                      : {};
                g(t, i);
              }))
            : f[0].addEventListener("click", function () {
                l.close();
              });
        }
        s.appendChild(r), s.appendChild(c);
        var u = {
            Millimeter: "mm",
            Centimeter: "cm",
            Meter: "m",
            Kilometer: "km",
          },
          g = function (e, n) {
            let i,
              o = a.getUnits(),
              l =
                ("None" != o.distance &&
                  `<span class='units'>${u[o.distance]}</span>`) ||
                "",
              s =
                ("None" != o.elevation &&
                  `<span class='units'>${u[o.elevation]}</span>`) ||
                "";
            switch (e) {
              case t.Bimface.Plugins.Measure.MeasureTypeOption.Distance:
                var c = void 0 !== n.distance ? h(n.distance) : "--",
                  d = void 0 !== n.distanceX ? h(n.distanceX) : "--",
                  f = void 0 !== n.distanceY ? h(n.distanceY) : "--",
                  m = void 0 !== n.distanceZ ? h(n.distanceZ) : "--";
                (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">\n                      <span class="bf-measure-titile">${BimfaceLanguage.bf_panel_measure_distance}：</span>\n                      <span class="bf-measure-value">${c} <span style="color:#fff;">${l}</span></span>\n                      <span class="bf-measure-reset gld-bimface gld-bf-delete1" title="${BimfaceLanguage.bf_tip_section_resetBox}"><span>\n                    </li>\n                    <li class="bf-measure-x"><span class="X">X：${d}</span><span class="Y">Y：${f}</span></li>\n                    <li class="bf-measure-x"><span class="Z">Z：${m}</span></li>\n                  </ul>`),
                  (r.innerHTML = i);
                break;
              case t.Bimface.Plugins.Measure.MeasureTypeOption.Angle:
                let e =
                  void 0 !== n.angle
                    ? b.formatPrecision(n.angle, a.getMeasureParams().precision)
                    : "--";
                (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">\n                      <span class="bf-measure-titile">${BimfaceLanguage.bf_panel_measure_angle}：</span>\n                      <span class="bf-measure-value">${e} <span style="color:#fff;">°</span></span>\n                      <span class="bf-measure-reset gld-bimface gld-bf-delete1" title="${BimfaceLanguage.bf_tip_section_resetBox}"><span></li>\n                  </ul>`),
                  (r.innerHTML = i);
                break;
              case t.Bimface.Plugins.Measure.MeasureTypeOption.MinimumDistance:
                c = void 0 !== n.distance ? h(n.distance) : "--";
                (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">\n                      <span class="bf-measure-titile">${BimfaceLanguage.bf_panel_measure_mindis}：</span>\n                      <span class="bf-measure-value">${c} <span style="color:#fff;">${l}</span></span>\n                    </li>\n                  </ul>`),
                  (r.innerHTML = i);
                break;
              case t.Bimface.Plugins.Measure.MeasureTypeOption.Elevation:
                let o = "--";
                n.points &&
                  ((o = h(n.points[0].z)),
                  0 == o.split(" ")[0] && (o = `±${o}`)),
                  (i = `<ul class="bf-measure-info">\n                    <li class="bf-measure-distance">\n                      <span class="bf-measure-titile">${BimfaceLanguage.bf_panel_measure_elevation}：</span>\n                      <span class="bf-measure-value">${o} <span style="color:#fff;">${s}</span></span>\n                      <span class="bf-measure-reset gld-bimface gld-bf-delete1" title="${BimfaceLanguage.bf_tip_section_resetBox}"><span>\n                    </li>\n                  </ul>`),
                  (r.innerHTML = i);
                break;
              case t.Bimface.Plugins.Measure.MeasureTypeOption
                .LaserClearDistance:
                (i = `<ul class="bf-measure-info">\n            <li class="bf-measure-distance">\n              <span class="bf-measure-titile">${BimfaceLanguage.bf_panel_measure_laser}：</span>\n              <span class="bf-measure-value"></span>\n              <span class="bf-measure-reset gld-bimface gld-bf-delete1" title="${BimfaceLanguage.bf_tip_section_resetBox}"><span>\n            </li>\n          </ul>`),
                  (r.innerHTML = i);
                break;
              case t.Bimface.Plugins.Measure.MeasureTypeOption.Volume:
                var p = n.volumeResult
                  ? b.formatCubic(n.volumeResult, a.getMeasureParams())
                  : "--";
                (i = `<ul class="bf-measure-info">\n            <li class="bf-measure-distance">\n              <span class="bf-measure-titile">${
                  BimfaceLanguage.bf_panel_measure_volume
                }：</span>\n              <span class="bf-measure-value" style="word-break: break-all;">${p} <span style="color:#fff;">${l} ³</span></span>\n              <span class="bf-measure-value" style="width: 100%; margin-top: 5px; font-size: 12px; text-align: center; line-height: 24px; ${
                  n.notSupport ? "display: inline-block;" : "display: none;"
                }">${
                  BimfaceLanguage.bf_panel_measure_volumeTip
                }</span>\n              <span class="bf-measure-reset gld-bimface gld-bf-delete1" title="${
                  BimfaceLanguage.bf_tip_section_resetBox
                }"><span>\n            </li>\n          </ul>`),
                  (r.innerHTML = i);
            }
            r.querySelector(".gld-bf-delete1").addEventListener(
              "click",
              function () {
                a.clear();
              }
            );
          },
          h = function (e) {
            return b.formatDistance(e, a.getMeasureParams());
          },
          v = new t.Bimface.UI.Panel.PanelConfig();
        let y;
        (v.title = BimfaceLanguage.bf_btn_measure),
          (v.id = "MeaurePanel"),
          (v.css = {}),
          (v.enableSizable = !1),
          (v.className = "bf-panel bf-measurement-panel"),
          a.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.Measuring,
            function (e) {
              g(e.type, {});
            }
          ),
          a.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.Measured,
            function (e) {
              g(e.type, e),
                e.type ==
                  t.Bimface.Plugins.Measure.MeasureTypeOption.MinimumDistance &&
                  (a.measureItem.setMinDistanceLine(e), a.measureItem.draw());
            }
          ),
          a.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.MeasureResultUpdating,
            function (e) {
              g(e.type, e);
            }
          ),
          a.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.MeasureResultUpdated,
            function (e) {
              g(e.type, e);
            }
          ),
          a.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.MeasureSelected,
            function (e) {
              let t = c.querySelectorAll(".bf-measure-tab-item");
              for (const e of t) e.removeClass("bf-active");
              for (const n of t)
                if (n.getAttribute("data-type") === e.type) {
                  n.addClass("bf-active");
                  break;
                }
              a.setMeasureType(e.type), g(e.type, e);
            }
          ),
          a.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.MeasureUnselected,
            function (e) {
              g(a.type, {});
            }
          ),
          a.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.Reset,
            function () {
              g(a.getMeasureType(), {});
            }
          ),
          (l = new t.Bimface.UI.Panel.Panel(v)),
          (n = a._opt.viewer),
          l.container.appendChild(s),
          "rfaView" == n._data.renderType && c.addClass("bf-measure-tab-rfa");
        let C = n
            .getViewer()
            .editorManager.tools.find((e) => "pickByMeasure" === e.name),
          w = (e) => {
            y = e;
          },
          B = (e, t) => {
            C &&
              C.pickHelper.handleMouseMeasure(
                { clientX: e.x, clientY: e.y },
                !1
              );
          },
          L = (e) => {
            y &&
              (C &&
                C.pickHelper.handleMouseMeasure(
                  { clientX: e.x, clientY: e.y },
                  !0
                ),
              (y = null));
          };
        const M = () => {
          l.isShow && _();
        };
        window.addEventListener("resize", M);
        let T = null;
        var _ = function () {
          let e, a;
          T && T.destroy(),
            (T = new t.Bimface.Plugins.AuxMobile.AuxMobile({
              viewer: n,
              editor: {
                touchMoveCallback: B,
                touchEndCallback: L,
                touchStartCallback: w,
              },
            })),
            (o.auxMobile = T),
            T.canvas.addEventListener("touchstart", (t) => {
              let n = t.touches[0];
              (e = { x: n.pageX, y: n.pageY }), T.onTouchStart(t, e);
            }),
            T.canvas.addEventListener("touchmove", (t) => {
              let n = t.touches[0];
              (e = { x: n.pageX, y: n.pageY }), T.onTouchMove(t, e);
            }),
            T.canvas.addEventListener("touchend", (t) => {
              ((e) => {
                e.preventDefault(), e.stopPropagation();
              })(t),
                T.onTouchEnd(t, e),
                (e = null);
            }),
            l.addEventListener("Close", (e) => {
              a || (a = o.getToolbar("MainToolbar")),
                a && a.show(),
                window.removeEventListener("resize", M),
                T.destroy();
            }),
            T.show();
        };
        return _(), g(d, {}), l;
      };
    })();
  var v,
    y = function (e) {
      var t = e.getToolbar("MainToolbar");
      if (t) {
        var n = t.getControl("Section");
        if (n) {
          var a = n.getToolbar();
          if (a)
            a.getControl("SectionBox").setCheckedState(!1),
              a.getControl("SectionPlane").setCheckedState(!1),
              a.getControl("PickSectionPlane").setCheckedState(!1);
          else n.setCheckedState(!1);
        }
      }
    },
    C = function (e) {
      y(e), w(e), B(e);
    },
    w = function (e) {
      var t = e.getPlugin("SectionPlane");
      t && (t.exit(), e.removePlugin("SectionPlane"));
    },
    B = function (e) {
      var t = e.getPlugin("SectionBox");
      t && (t.exit(), e.removePlugin("SectionBox"));
    },
    L = function (e, t) {
      var n = e.getViewer(),
        a = e.getPlugin("SectionBox");
      if (!a) {
        var i = e.getToolbar("MainToolbar");
        if (i) {
          var o = i.getControl("Section");
          if (o)
            o.getToolbar().getControl("SectionBox").setCheckedState(!0),
              (a = e.getPlugin("SectionBox"));
        }
      }
      a.setBox(t), n.zoomToBoundingBox(t);
    };
  !(function () {
    let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    );
    t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom"),
      t.Web.Lang.Utility.ClientHelper.getIsIphone();
    e.Measure = function (e, n) {
      var a = e.getViewer(),
        i = e.getRootElement(),
        o = "Viewer3D" === a.viewerType,
        l = t.Bimface.UI.Control.ControlEvent,
        s = t.Bimface.Viewer.Viewer3DEvent;
      if (!o)
        return void console.log("The API is not supported on this viewer.");
      var r = new t.Bimface.UI.Button.ButtonConfig();
      (r.id = "Measure"),
        (r.title = BimfaceLanguage.bf_btn_measure),
        (r.className = "bf-button gld-bf-measure");
      var c,
        d,
        f = a.getIsMobileNew(),
        m = new t.Bimface.UI.Button.ToggleButton(r),
        p = new t.Bimface.Plugins.Measure.MeasureConfig();
      (p.viewer = a), (p.isCreateByUI = !0);
      let u = null;
      return (
        m.addEventListener(l.StateChange, function (o) {
          if (f) {
            var l = n.getControl("RectangleSelect");
            l && l.setCheckedState(!1);
            var g = n.getControl("ViewButton");
            g && g.setCheckedState && g.setCheckedState(!1),
              (u = e.getToolbar("MainToolbar"));
          }
          if (o) {
            t.Web.Lang.Utility.ClientHelper.getIsDesktop();
            y(e);
            var h = n.getControl("Explode");
            h && h.setCheckedState(!1),
              (d = e.getPlugin("Measure")) ||
                (((d = new t.Bimface.Plugins.Measure.Measure(p)).id =
                  "Measure"),
                e.addPlugin(d)),
              d.switchOn(),
              f
                ? ((u = e.getToolbar("MainToolbar")),
                  (c =
                    new t.Bimface.Application.UI.Panel.Mobile.MobileMeasurePanel(
                      d,
                      i,
                      e
                    )))
                : (c = new t.Bimface.Application.UI.Panel.MeasurePanel(d, i)),
              u && u.hide(),
              c.addEventListener("Close", function () {
                m.setCheckedState(!1);
              }),
              i.appendChild(c.element),
              c.bringToFront(),
              c.initPosition(),
              e.addPanel(c);
          } else
            c &&
              c.addEventListener("Close", function () {
                m.setCheckedState(!1);
              }),
              e.removePanel(c.id),
              c.close(),
              (c = null),
              u && u.show(),
              d.exit();
          a.getEventManager().fireEvent(s.ButtonOnToolbarClicked, {
            id: r.id,
            isChecked: o,
          });
        }),
        m
      );
    };
  })(),
    (v = t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.Dom"
    )),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Panel.Mobile"
    ).MobileDrawingMeasurePanel = function (e, n, a) {
      t.Web.Lang.Utility.ClientHelper.getIsDesktop();
      var i,
        o = v.create("div", "bf-tab-container"),
        l = v.create("ul", "bf-measure-tab"),
        s = v.create("div", "bf-tab-body");
      o.appendChild(s), o.appendChild(l);
      var r = {
          None: BimfaceLanguage.bf_general_none,
          Meter: "m",
          Centimeter: "cm",
          Millimeter: "mm",
        },
        c = function (n) {
          i.data = n;
          var a,
            o = e.getMeasureType(),
            d = (e.getPrecision(), e.getScale(), e.getUnits()),
            m =
              ("None" != d.distance &&
                `<span class='units'>${r[d.distance]}</span>`) ||
              "",
            p =
              ("None" != d.area && `<span class='units'>${r[d.area]}</span>`) ||
              "";
          l.innerHTML = `\n          <li class="bf-measure-tab-item">\n            <i class="gld-bimface gld-bf-arrowdown" title="${BimfaceLanguage.bf_tip_measure_distance}"></i>\n          </li>\n          <li class="bf-measure-tab-item" data-type="Distance">\n            <i class="gld-bimface gld-bf-distance" title="${BimfaceLanguage.bf_tip_measure_distance}"></i>\n          </li>\n          <li class="bf-measure-tab-item" data-type="Angle">\n            <i class="gld-bimface gld-bf-angle" title="${BimfaceLanguage.bf_tip_measure_angle}"></i>\n          </li>\n          <li class="bf-measure-tab-item" data-type="Area">\n            <i class="gld-bimface gld-bf-area" title="${BimfaceLanguage.bf_tip_measure_area}"></i>\n          </li>\n        `;
          var u = l.querySelectorAll(".bf-measure-tab-item");
          for (let t = 0; t < u.length; t++) {
            let n = u[t].getAttribute("data-type");
            0 !== t
              ? (n === e.getMeasureType() && u[t].addClass("bf-active"),
                u[t].addEventListener("click", function () {
                  for (var t = 0; t < u.length; t++)
                    u[t].removeClass("bf-active");
                  this.addClass("bf-active"), e.setMeasureType(n);
                  let a = e.getSelectedItem(),
                    i =
                      a && a.type == n
                        ? f(e.drawableManager.mapMeasureInfo[a.getId()])
                        : {};
                  c(i);
                }))
              : u[0].addEventListener("click", function () {
                  i.close();
                });
          }
          if (o == t.Bimface.Plugins.Measure.MeasureTypeOption.Distance) {
            let e = n ? n.distance : null,
              t = n ? n.distanceX : null,
              i = n ? n.distanceY : null;
            (a = `<ul class="bf-measure-info">\n                  <li class="bf-measure-distance">\n                    <span class="bf-measure-titile">${
              BimfaceLanguage.bf_panel_measure_distance
            }：</span>\n                    <span class="bf-measure-value">${
              e ? e + m : "--"
            }</span>\n                    <span class="bf-measure-reset gld-bimface gld-bf-delete1" title="${
              BimfaceLanguage.bf_tip_section_resetBox
            }"><span></li>\n                    <li class="bf-measure-x"><span class="X">X：${
              t || "--"
            }</span><span class="Y">Y：${
              i || "--"
            }</span></li>\n                </ul>`),
              u[0];
          } else if (o == t.Bimface.Plugins.Measure.MeasureTypeOption.Angle) {
            let e = null;
            n && (e = n.angle),
              (a = `<ul class="bf-measure-info">\n                <li class="bf-measure-distance">\n                  <span class="bf-measure-titile">${
                BimfaceLanguage.bf_panel_measure_angle
              }：</span>\n                  <span class="bf-measure-value">${
                e ? e + "<span class='units'>°</span>" : "--"
              }</span>\n                  <span class="bf-measure-reset gld-bimface gld-bf-delete1" title="${
                BimfaceLanguage.bf_tip_section_resetBox
              }"><span></li>\n              </ul>`),
              u[1];
          } else if (o == t.Bimface.Plugins.Measure.MeasureTypeOption.Area) {
            let e = null;
            n && (e = n.area),
              p && (p += "<i class='square'>2</i>"),
              (a = `<ul class="bf-measure-info">\n                <li class="bf-measure-distance">\n                  <span class="bf-measure-titile">${
                BimfaceLanguage.bf_panel_measure_area
              }：</span>\n                  <span class="bf-measure-value">${
                e ? e + p : "--"
              }</span>\n                  <span class="bf-measure-reset gld-bimface gld-bf-delete1" title="${
                BimfaceLanguage.bf_tip_section_resetBox
              }"><span></li>\n              </ul>`),
              u[2];
          }
          (s.innerHTML = a),
            s
              .querySelector(".gld-bf-delete1")
              .addEventListener("click", function () {
                e.clear();
              });
        },
        d = new t.Bimface.UI.Panel.PanelConfig();
      (d.title = BimfaceLanguage.bf_btn_measure),
        (d.id = "MeaurePanel"),
        (d.className = "bf-panel bf-measurement-panel"),
        (d.css = {});
      var f = function (t) {
        let n = { type: t.type },
          a = e.getMeasureParams();
        if ("Distance" === t.type) {
          var i = t.end[0] - t.start[0],
            o = t.end[1] - t.start[1],
            l = Math.sqrt(i * i + o * o);
          (n.distance = b.formatDistance(l, a)),
            (n.distanceX = b.formatDistance(i, a)),
            (n.distanceY = b.formatDistance(o, a));
        } else
          "Angle" === t.type
            ? (n.angle = b.formatPrecision(t.angle, a.precision))
            : "Area" === t.type && (n.area = b.formatArea(t.area, a));
        return n;
      };
      (d.enableSizable = !1),
        e.viewer.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.Measuring,
          function () {
            c();
          }
        ),
        e.viewer.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.Measured,
          function (e) {
            e ? c(f(e)) : c();
          }
        ),
        e.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.MeasureResultUpdating,
          function (e) {
            e ? c(f(e)) : c();
          }
        ),
        e.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.MeasureResultUpdated,
          function (e) {
            e ? c(f(e)) : c();
          }
        ),
        e.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.MeasureSelected,
          function (t) {
            if (t.isDataEmpty) return void c();
            let n = l.querySelectorAll(".bf-measure-tab-item");
            for (const e of n)
              e.getAttribute("data-type") === t.type
                ? e.addClass("bf-active")
                : e.removeClass("bf-active");
            e.setMeasureType(t.type), c(f(t));
          }
        ),
        e.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.MeasureUnselected,
          function (e) {
            c();
          }
        ),
        e.addEventListener(
          t.Bimface.Plugins.Measure.MeasureEvent.Reset,
          function () {
            c();
          }
        ),
        (i = new t.Bimface.UI.Panel.Panel(d)).container.appendChild(o),
        i.bringToFront();
      let m = null;
      return (
        i.addEventListener("Close", (e) => {
          m || (m = a.getToolbar("MainToolbar")), m && m.show();
        }),
        c(),
        i
      );
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Button"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom"),
        t.Web.Lang.Utility.ClientHelper.getIsIphone();
      e.DrawingMeasure = function (e, n) {
        var a = e.getViewer(),
          i = e.getRootElement(),
          o = t.Bimface.UI.Control.ControlEvent,
          l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "DrawingMeasure"),
          (l.title = BimfaceLanguage.bf_btn_measure),
          (l.className = "bf-button gld-bf-measure");
        var s,
          r = new t.Bimface.UI.Button.ToggleButton(l),
          c = t.Bimface.Viewer.ViewerDrawingEvent,
          d = new t.Bimface.Plugins.Measure.MeasureConfig();
        d.viewer = a;
        const f = a.getIsMobileNew();
        let m = null,
          p = null;
        return (
          r.addEventListener(o.StateChange, function (n) {
            m || (m = e.getToolbar("MainToolbar")),
              n
                ? ((p = e.getPlugin("DrawingMeasure")),
                  p ||
                    ((p = new t.Bimface.Plugins.Measure.Measure(d)),
                    (p.id = "DrawingMeasure"),
                    e.addPlugin(p)),
                  p.switchOn(),
                  f
                    ? (m && m.hide(),
                      (s =
                        new t.Bimface.Application.UI.Panel.Mobile.MobileDrawingMeasurePanel(
                          p,
                          i,
                          e
                        )))
                    : (s =
                        new t.Bimface.Application.UI.Panel.DrawingMeasurePanel(
                          p,
                          i
                        )),
                  s.addEventListener("Hide", function () {
                    r.setCheckedState(!1), m && m.show();
                  }),
                  s.addEventListener("Close", function () {
                    r.setCheckedState(!1), m && m.show();
                  }),
                  i.appendChild(s.element),
                  s.bringToFront(),
                  s.initPosition(),
                  e.addPanel(s))
                : (e.removePanel(s.id),
                  s.close(),
                  (s = null),
                  p.switchOff(),
                  f && m && m.show()),
              a
                .getEventManager()
                .fireEvent(c.ButtonOnToolbarClicked, {
                  id: "Measure",
                  isChecked: n,
                });
          }),
          r
        );
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).Annotation = function (e, n) {
      var a = e.getViewer();
      let i = "Viewer3D" == a.viewerType;
      a.viewerType;
      var o = t.Bimface.UI.Control.ControlEvent,
        l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "Annotation"),
        (l.title = "批注"),
        (l.className = "bf-button gld-bf-notes");
      var s = new t.Bimface.UI.Button.Button(l),
        r = new t.Bimface.Plugins.Annotation.AnnotationToolbarConfig();
      r.viewer = e.getViewer();
      var c = (self._annotation =
          new t.Bimface.Plugins.Annotation.AnnotationToolbar(r)),
        d = t.Bimface.Plugins.Annotation.AnnotationToolbarEvent;
      return (
        (s._annotationManager = c.getAnnotationManager()),
        (s._annotationToolbar = c),
        e._plugins.push(s),
        s.addEventListener(o.Click, function () {
          n.hide();
          var e = n.getControl(i ? "Measure" : "DrawingMeasure");
          e && e.setCheckedState(!1),
            c.show(),
            c.addEventListener(d.Saved, function () {
              n.show();
            }),
            c.addEventListener(d.Cancelled, function () {
              n.show();
            });
        }),
        s
      );
    }),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Panel"
      ).SectionBoxPanel = function (n) {
        var a = n.getViewer(),
          i = (n.getRootElement(), new t.Bimface.UI.Panel.PanelConfig());
        (i.title = BimfaceLanguage.bf_panel_section_box),
          (i.id = "SectionBoxPanel"),
          (i.css = {
            right: "10px",
            bottom: "60px",
            width: "200px",
            height: "200px",
          }),
          (i.className = "bf-panel bf-section-panel bf-sectionBox-panel"),
          (i.enableSizable = !1);
        var o,
          l = new t.Bimface.UI.Panel.Panel(i),
          s = n.getPlugin("SectionBox");
        return (
          (function () {
            var i = t.Bimface.Application.UI.Toolbar.SectionToolbarConfig(),
              r = t.Bimface.Application.UI.Toolbar.Toolbar(i, n);
            (o = r.getControl("SectionBoxVisiable")).setCheckedState(!1);
            var c = r.getControl("SectionReset");
            let d = r.getControl("SectionBoxReverse");
            c.addEventListener(
              t.Bimface.UI.Control.ControlEvent.Click,
              function () {
                o.setCheckedState(!1), d.setCheckedState(!1);
              }
            ),
              r
                .getControl("SectionRecalculation")
                .addEventListener(
                  t.Bimface.UI.Control.ControlEvent.Click,
                  function () {
                    o.setCheckedState(!1), d.setCheckedState(!1);
                  }
                );
            var f = e.create("div", "bf-range-container"),
              m = `<ul class="bf-range-list">\n        <li>\n          <span class="bf-range-name">${BimfaceLanguage.bf_panel_section_X}</span>\n          <div class="bf-section-range" id="sectionX"></div>\n        </li>\n        <li>\n          <span class="bf-range-name">${BimfaceLanguage.bf_panel_section_Y}</span>\n          <div class="bf-section-range" id="sectionY"></div>\n        </li>\n        <li>\n          <span class="bf-range-name">${BimfaceLanguage.bf_panel_section_Z}</span>\n          <div class="bf-section-range" id="sectionZ"></div>\n        </li>\n      </ul>`;
            if (
              ((f.innerHTML = m),
              l.addControl(r),
              l.container.appendChild(f),
              s && s._sectionBox)
            )
              s.showBox(), s.update();
            else {
              if (a._sectionBox) s = a._sectionBox;
              else {
                var p = new t.Bimface.Plugins.Section.SectionBoxConfig();
                (p.viewer = a),
                  (p.id = "SectionBox"),
                  null != n.isSectionOutlineEnabled &&
                    n.isSectionOutlineEnabled !== p.isOutlineEnabled &&
                    (p.isOutlineEnabled = n.isSectionOutlineEnabled),
                  (s = new t.Bimface.Plugins.Section.SectionBox(p));
              }
              n.removePlugin("SectionBox"), n.addPlugin(s);
            }
            a.render();
          })(),
          (l.hideBox = function () {
            o && o.setCheckedState(!0);
          }),
          l
        );
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Panel"
      ).MobilePickSectionPlanePanel = function (n) {
        let a = n.getViewer(),
          i = (n.getRootElement(), new t.Bimface.UI.Panel.PanelConfig()),
          o = null;
        (i.title = "剖切"),
          (i.id = "PickSectionPlanePanel"),
          (i.css = {
            position: "absolute",
            bottom: ".2133em",
            right: "inherit",
            borderRadius: ".2133em",
          }),
          (i.className = "bf-panel bf-section-panel bf-pickSectionPlane-panel"),
          (i.enableSizable = !1);
        let l,
          s = new t.Bimface.UI.Panel.Panel(i);
        !(function () {
          let e = new t.Bimface.UI.Toolbar.ToolbarConfig();
          (e.id = "SectionToolbar"),
            (e.className = "bf-pick-section-plane"),
            (e.buttons = [
              "MobileSectionPlaneBack",
              "SectionPlaneVisiable",
              "PickSectionPlaneReset",
            ]),
            (l = t.Bimface.Application.UI.Toolbar.Toolbar(e, n)),
            (s.sectionToolbar = l),
            s.addControl(l);
        })(),
          s.element.addClass("section-panel");
        var r = e.create("div", "bf-button gld-bf-section-plane-pick"),
          c = s.element.querySelector(".gld-bf-reset-box");
        s.element
          .querySelector(".bf-pick-section-plane")
          .insertBefore(r, s.element.querySelector(".gld-bf-hide-slice")),
          r.addEventListener("touchend", function (e) {
            a.enableSnap(!0),
              b.show(),
              l.getControl("SectionPlaneVisiable").setCheckedState(!1);
            var t = n.getPlugin("SectionPlane");
            t && t.hidePlane();
          });
        let d = new t.Bimface.Viewer.SnapMode(),
          f = t.Bimface.Viewer.SnapObject.Face;
        d.setSnap3DList([f]), a.setSnapMode(d), a.enableSnap(!0);
        let m,
          p = (e) => {
            if (b.showAuxBall) {
              let e = n.getPlugin("SectionPlane");
              (m = e.getOriginProgress(m)), e.setOriginProgress(m);
            }
          },
          u = (e, t) => {
            if (b.showAuxBall) {
              let i = n.getPlugin("SectionPlane");
              (e.progress = m), i.setDistanceProgress(e, t), a.render();
            } else {
              let t = a.getViewer().pickToPoint(e, 5),
                n = t
                  ? ((e, t, n, i, o) => {
                      let l = a.getViewer().cameraControl;
                      if (null != e) {
                        var s = l.scene.drawingToWorld(e);
                        e.copy(s);
                      }
                      if (null != t) {
                        var r = l.scene.drawingToWorld(t[0]),
                          c = l.scene.drawingToWorld(t[1]);
                        t[0].copy(r), t[1].copy(c);
                      }
                      return {
                        pickPoint: e,
                        pickLine: t,
                        pickPlane: n,
                        normal: i,
                        userId: o,
                      };
                    })(
                      t.pickPoint,
                      t.pickLine,
                      t.pickPlane,
                      t.face.normal,
                      t.userId
                    )
                  : {};
              a.snap.snapByPoint(n);
            }
          },
          g = (e) => {
            if (b.showAuxBall);
            else {
              let i = a.getViewer().pickToPoint(e, 5),
                o = n.getPlugin("SectionPlane");
              if (!i) return;
              b.showBall();
              let s = a.sceneToWorld(i.pickPoint);
              if ((a.enableSnap(!1), o && o._sectionTool)) o.showPlane();
              else {
                n.removePlugin("SectionPlane");
                let e = new t.Bimface.Plugins.Section.SectionPlaneConfig();
                (e.viewer = a),
                  (e.id = "SectionPlane"),
                  (e.exitSectionBox = !1),
                  (o = new t.Bimface.Plugins.Section.SectionPlane(e)),
                  n.addPlugin(o),
                  l.getControl("SectionPlaneVisiable").setCheckedState(!1);
              }
              let r = -2;
              "m" === a._defaultUnit && (r /= 1e3),
                o.setPositionByPlane(s, i.face.normal, r),
                a.render();
            }
          };
        const h = () => {
          s.isShow && v();
        };
        window.addEventListener("resize", h);
        let b = null;
        var v = function () {
          let e;
          b && b.destroy(),
            (b = new t.Bimface.Plugins.AuxMobile.AuxMobile({
              viewer: a,
              editor: {
                touchMoveCallback: u,
                touchEndCallback: g,
                touchStartCallback: p,
              },
            })),
            (n.auxMobile = b),
            b.canvas.addEventListener("touchstart", (t) => {
              let n = t.touches[0];
              (e = { x: n.pageX, y: n.pageY }), b.onTouchStart(t, e);
            }),
            b.canvas.addEventListener("touchmove", (t) => {
              let n = t.touches[0];
              (e = { x: n.pageX, y: n.pageY }), b.onTouchMove(t, e);
            }),
            b.canvas.addEventListener("touchend", (t) => {
              b.onTouchEnd(t, e), (e = null);
            }),
            c.addEventListener("click", (e) => {
              b.show();
            }),
            s.addEventListener("Close", (e) => {
              o || (o = n.getToolbar("MainToolbar")),
                o && o.show(),
                window.removeEventListener("resize", h),
                b.destroy();
            });
        };
        return v(), s;
      };
    })(),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Button"
      ).Section = function (e, n) {
        let a;
        if (t.Web.Lang.Utility.ClientHelper.getIsDesktop()) {
          let i = new t.Bimface.UI.Button.ButtonConfig();
          (i.id = "Section"),
            (i.title = BimfaceLanguage.bf_btn_section),
            (i.className = "bf-button bf-toolbar-button gld-bf-sectionbox"),
            (a = new t.Bimface.UI.Button.Button(i));
          let o = new t.Bimface.UI.Toolbar.ToolbarConfig();
          (o.id = "SectionSub"),
            (o.title = BimfaceLanguage.bf_btn_section),
            (o.className = "bf-sub-toolbar"),
            (o.buttons = ["PickSectionPlane", "SectionPlane", "SectionBox"]);
          n = new t.Bimface.Application.UI.Toolbar.Toolbar(o, e);
          a.addToolbar(n);
        } else {
          var i = e.getViewer(),
            o = e.getRootElement(),
            l = "Viewer3D" === i.viewerType,
            s = t.Bimface.UI.Control.ControlEvent;
          if (!l)
            return void console.log("The API is not supported on this viewer.");
          let d = null;
          var r,
            c = new t.Bimface.UI.Button.ButtonConfig();
          (c.id = "Section"),
            (c.title = BimfaceLanguage.bf_btn_section),
            (c.className = "bf-button gld-bf-section-axial"),
            (a = new t.Bimface.UI.Button.ToggleButton(c)),
            a.addEventListener(s.StateChange, function (l) {
              if (l) {
                var s = n.getControl("ViewButton");
                s && s.setCheckedState && s.setCheckedState(!1),
                  d || (d = e.getToolbar("MainToolbar")),
                  d && d.hide();
                var f = n.getControl("Measure");
                f && f.setCheckedState(!1);
                var m = n.getControl("Explode");
                m && m.setCheckedState(!1),
                  e.getViewer().getIsMobileNew()
                    ? ((r =
                        new t.Bimface.Application.UI.Panel.MobilePickSectionPlanePanel(
                          e
                        )),
                      i
                        .getEventManager()
                        .fireEvent(
                          t.Bimface.Viewer.Viewer3DEvent.ButtonOnToolbarClicked,
                          { id: c.id, isChecked: l }
                        ))
                    : (r =
                        new t.Bimface.Application.UI.Panel.PickSectionPlanePanel(
                          e
                        )),
                  r.addEventListener("Hide", function () {
                    a.setCheckedState(!1);
                  }),
                  o.appendChild(r.element),
                  r.bringToFront(),
                  e.addPanel(r);
              } else d && d.show(), C(e), r && (e.removePanel(r.id), r.close(), i.render());
            });
        }
        return a;
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionBox = function (e, n) {
      var a,
        i,
        o,
        l = e.getViewer(),
        s = e.getRootElement(),
        r = "Viewer3D" === l.viewerType,
        c = t.Bimface.UI.Control.ControlEvent,
        d = t.Bimface.Viewer.Viewer3DEvent;
      if (r) {
        var f = function (t, n) {
            var a = e.getPlugin("SectionBox");
            if (a) {
              var i = [n.from, n.to];
              a.setProgress(t, i),
                l.render(),
                l
                  .getViewer()
                  .modelManager.dispatchEvent({
                    type: CLOUD.EVENTS.ON_CLIP_MOUSE_MOVE,
                    onClipPlane: !0,
                  });
            }
          },
          m = function (t) {
            var n = e.getPlugin("SectionBox");
            n &&
              (n.reCalculateClippingIds(t),
              l.render(),
              l
                .getViewer()
                .modelManager.dispatchEvent({
                  type: CLOUD.EVENTS.ON_CLIP_MOUSE_MOVE_END,
                  onClipPlane: !0,
                }));
          },
          p = function () {
            var e = l._sectionBox;
            if (e) {
              var t = e.getProgress("x");
              a.setProgress({ from: t[0], to: t[1] });
              var n = e.getProgress("y");
              i.setProgress({ from: n[0], to: n[1] });
              var s = e.getProgress("z");
              o.setProgress({ from: s[0], to: s[1] });
            }
          },
          u = new t.Bimface.UI.Button.ButtonConfig();
        (u.id = "SectionBox"),
          (u.title = BimfaceLanguage.bf_panel_section_box),
          (u.className = "bf-button gld-bf-sectionbox1");
        var g,
          h = new t.Bimface.UI.Button.ToggleButton(u);
        return (
          h.addEventListener(c.StateChange, function (r) {
            if (r)
              !(function () {
                var t = e.getToolbar("MainToolbar"),
                  a = t.getControl("Measure");
                a && a.setCheckedState(!1);
                var i = t.getControl("Explode");
                i && i.setCheckedState(!1);
                var o = n.getControl("SectionPlane");
                o && o.setCheckedState(!1);
                var l = n.getControl("PickSectionPlane");
                l && l.setCheckedState(!1);
                var s = e.getPlugin("SectionPlane");
                s && (e.removePlugin(s.id), s.exit());
              })(),
                (g = new t.Bimface.Application.UI.Panel.SectionBoxPanel(
                  e
                )).addEventListener("Hide", function () {
                  h.setCheckedState(!1);
                }),
                s.appendChild(g.element),
                g.initPosition(),
                (a = new t.Web.Lang.Utility.Dom.multipleRange({
                  element: g.element.querySelector("#sectionX"),
                  min: 0,
                  max: 100,
                  defaultColor: "#555555",
                  currentColor: "#999999",
                  change: function (e) {
                    f("x", e);
                  },
                  callback: function () {
                    m(!1);
                  },
                })),
                (i = new t.Web.Lang.Utility.Dom.multipleRange({
                  element: g.element.querySelector("#sectionY"),
                  min: 0,
                  max: 100,
                  defaultColor: "#555555",
                  currentColor: "#999999",
                  change: function (e) {
                    f("y", e);
                  },
                  callback: function () {
                    m(!1);
                  },
                })),
                (o = new t.Web.Lang.Utility.Dom.multipleRange({
                  element: g.element.querySelector("#sectionZ"),
                  min: 0,
                  max: 100,
                  defaultColor: "#555555",
                  currentColor: "#999999",
                  change: function (e) {
                    f("z", e);
                  },
                  callback: function () {
                    m(!1);
                  },
                })),
                p(),
                l.addEventListener("Rendered", p),
                e.addPanel(g),
                l.render();
            else {
              var c = e.getPlugin("SectionBox");
              c && c.hideBox(),
                g && (e.removePanel(g.id), g.close(), l.render());
            }
            l.getEventManager().fireEvent(d.ButtonOnToolbarClicked, {
              id: u.id,
              isChecked: r,
            });
          }),
          h
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      let n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        a = function (e) {
          return (e = parseFloat(e)) < 0 ? 360 + e : e;
        };
      n.SectionPlanePanel = function (n) {
        let i = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
        var o = n.getViewer(),
          l = n.getRootElement(),
          s = new t.Bimface.UI.Panel.PanelConfig();
        (s.title = BimfaceLanguage.bf_panel_section_plane),
          (s.id = "SectionPlanePanel"),
          (s.css = i
            ? {
                right: "10px",
                bottom: "170px",
                width: "200px",
                height: "140px",
              }
            : {
                maxWidth: "414px",
                left: "50%",
                transform: "translate(-50%)",
                bottom: "0.12em",
                width: "100%",
                height: "1.02em",
              }),
          (s.className = "bf-panel bf-section-panel bf-sectionPlane-panel"),
          (s.enableSizable = !1);
        var r = new t.Bimface.UI.Panel.Panel(s),
          c = n.getPlugin("SectionPlane");
        let d;
        if (c) {
          let e = c.getProgress();
          c.setDirection(c.getDirection()),
            c.setPlane(c.getPlane()),
            c.setProgress(e);
        }
        return (
          (function () {
            let s = new t.Bimface.UI.Toolbar.ToolbarConfig();
            (s.id = "SectionToolbar"),
              (s.className = "bf-section-plane"),
              (s.buttons = ["SectionPlaneVisiable", "SectionPlaneReverse"]),
              (d = t.Bimface.Application.UI.Toolbar.Toolbar(s, n)),
              (r.sectionToolbar = d),
              r.addControl(d);
            var f = e.create("div", "bf-section-plane-head"),
              m = new t.Bimface.UI.Select.SelectConfig();
            if (
              (c && (m.default = c._plane),
              (m.className = "bf-select bf-select-axial"),
              i)
            ) {
              var p = new t.Bimface.UI.Tabs.TabsConfig(),
                u = e.create("div", "bf-section-select");
              p.className = "bf-tabs";
              let a = [
                { id: "X", name: "X" },
                { id: "Y", name: "Y" },
                { id: "Z", name: "Z" },
              ];
              (p.options = a), (p.element = u);
              let i = new t.Bimface.UI.Tabs.Tabs(p);
              var g = new t.Bimface.Application.UI.Button.SectionDirection(n);
              i.addEventListener("Change", function (e) {
                c &&
                  e &&
                  (c.setPlane(e.id),
                  c.coordinateSystem.update(),
                  h(r, e.id),
                  o.render());
              }),
                f.appendChild(u),
                (r.sectionPlaneTab = i);
              let l = i.getCurrentOption().id;
              var h = function (e, t) {
                e.initialCoordinate =
                  "X" == t
                    ? {
                        dirX: new THREE.Vector3(0, 0, 1),
                        dirY: new THREE.Vector3(0, 1, 0),
                      }
                    : "Y" == t
                    ? {
                        dirX: new THREE.Vector3(1, -0, 0),
                        dirY: new THREE.Vector3(0, 1, 0),
                      }
                    : {
                        dirX: new THREE.Vector3(-1, 0, 0),
                        dirY: new THREE.Vector3(0, 0, -1),
                      };
              };
              h(r, l),
                d
                  .getControl("SectionPlaneReverse")
                  .addEventListener(
                    t.Bimface.UI.Control.ControlEvent.Click,
                    function () {
                      i.setCurrentOption(-1);
                    }
                  );
            } else {
              m.options = [
                { id: "X", name: "X" },
                { id: "Y", name: "Y" },
                { id: "Z", name: "Z" },
              ];
              var b = new t.Bimface.UI.Select.Select(m);
              r.select = b;
              g = new t.Bimface.Application.UI.Button.SectionDirection(n);
              b.addEventListener("Change", function (e) {
                c &&
                  (c.setPlane(e.id), c.coordinateSystem.update(), o.render());
              }),
                f.appendChild(b.element);
            }
            var v = e.create("div", "bf-section-range"),
              y = new t.Web.Lang.Utility.Dom.range({
                element: v,
                min: 0,
                max: 100,
                cur: 50,
                defaultColor: "#666",
                currentColor: "#666",
                isShowProgress: !1,
                input: function (e) {
                  c && (c.setProgress(e), o.render());
                },
                change: function (e) {
                  c && (c.setProgress(e), o.render());
                },
              }),
              C = e.create("div", "bf-section-range");
            C.innerHTML =
              '<i class="bf-range-icon gld-bf-rotate-vertical"></i>';
            var w = e.create("div", "bf-section-range");
            w.innerHTML =
              '<i class="bf-range-icon gld-bf-rotate-horizontal"></i>';
            var B = new t.Web.Lang.Utility.Dom.range({
                element: C,
                min: -179,
                max: 180,
                cur: 0,
                defaultColor: "#666",
                currentColor: "#666",
                isShowProgress: !1,
                input: function (e) {
                  c && (c.setRotateAngle(void 0, a(e)), o.render());
                },
                change: function (e) {
                  c && (c.setRotateAngle(void 0, a(e)), o.render());
                },
              }),
              L = new t.Web.Lang.Utility.Dom.range({
                element: w,
                min: -179,
                max: 180,
                cur: 0,
                defaultColor: "#666",
                currentColor: "#666",
                isShowProgress: !1,
                input: function (e) {
                  c && (c.setRotateAngle(a(e), void 0), o.render());
                },
                change: function (e) {
                  c && (c.setRotateAngle(a(e), void 0), o.render());
                },
              });
            if (
              (o.addEventListener("Rendered", function () {
                var e = o._sectionPlane;
                if (e) {
                  var t = e.getProgress();
                  0 == i && y.setProgress(t);
                  var n = e.getRotateAngle();
                  B.setProgress(n.angleB > 180 ? n.angleB - 360 : n.angleB),
                    L.setProgress(n.angleA > 180 ? n.angleA - 360 : n.angleA);
                }
              }),
              r.container.appendChild(f),
              0 == i && r.container.appendChild(v),
              i || f.appendChild(g.element),
              c && i && c._sectionTool)
            )
              c.showPlane();
            else {
              var M = new t.Bimface.Plugins.Section.SectionPlaneConfig();
              (M.viewer = o),
                (M.id = "SectionPlane"),
                null != n.isSectionOutlineEnabled &&
                  n.isSectionOutlineEnabled !== M.isOutlineEnabled &&
                  (M.isOutlineEnabled = n.isSectionOutlineEnabled),
                (c = new t.Bimface.Plugins.Section.SectionPlane(M)),
                n.removePlugin("SectionPlane"),
                n.addPlugin(c);
            }
            if (!i) {
              var T = l.offsetWidth,
                _ = l.offsetHeight;
              c.hidePlane(),
                (r.element.style.fontSize =
                  (100 * Math.min(_, T, 414)) / 750 + "px"),
                r.element.addClass("section-panel");
              var S = r.element.querySelector(".bf-section-plane-head");
              (r.element.querySelector(
                ".bf-close"
              ).innerHTML = `<span class='quit'>${BimfaceLanguage.bf_general_exit}</span>`),
                r.element.appendChild(S);
            }
            let I = t.Bimface.Plugins.Section.SectionPlaneEvent;
            o.addEventListener(I.SectionPlaneChanged, () => {
              let e = n.getPanel("SectionPlanePanel"),
                t = o._sectionPlane;
              if (e) {
                let { dirX: n, dirY: a } = e.initialCoordinate;
                Reflect.ownKeys(n).forEach((a) => {
                  Math.abs(n[a] - t.coordinateSystem.dirX[a]) > 0.001 &&
                    e.sectionPlaneTab.setCurrentOption(-1);
                }),
                  Reflect.ownKeys(a).forEach((n) => {
                    Math.abs(a[n] - t.coordinateSystem.dirY[n]) > 0.001 &&
                      e.sectionPlaneTab.setCurrentOption(-1);
                  });
              }
            }),
              o.render();
          })(),
          r
        );
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionPlane = function (e, n) {
      var a = e.getViewer(),
        i = e.getRootElement(),
        o = "Viewer3D" === a.viewerType,
        l = t.Bimface.UI.Control.ControlEvent,
        s = t.Bimface.Viewer.Viewer3DEvent;
      if (o) {
        var r = new t.Bimface.UI.Button.ButtonConfig();
        (r.id = "SectionPlane"),
          (r.title = BimfaceLanguage.bf_panel_section_plane),
          (r.className = "bf-button gld-bf-section-axial");
        var c,
          d = new t.Bimface.UI.Button.ToggleButton(r);
        return (
          d.addEventListener(l.StateChange, function (o) {
            if (
              (a
                .getEventManager()
                .fireEvent(s.ButtonOnToolbarClicked, {
                  id: r.id,
                  isChecked: d.isChecked(),
                }),
              o)
            ) {
              !(function () {
                var t = e.getToolbar("MainToolbar"),
                  a = t.getControl("Measure");
                a && a.setCheckedState(!1);
                var i = t.getControl("Explode");
                i && i.setCheckedState(!1);
                var o = n.getControl("SectionBox");
                o && o.setCheckedState(!1);
                var l = e.getPlugin("SectionBox");
                l && e.removePlugin(l.id);
                var s = n.getControl("PickSectionPlane"),
                  r = e.getPlugin("SectionPlane");
                s &&
                  (s._checked &&
                    r &&
                    (e.removePlugin(r.id), r.hidePlane(), r.exit()),
                  s.setCheckedState(!1));
                var c = e.getPlugin("SectionPlaneForAreaTree");
                c && (c.exit(), e.removePlugin("SectionPlaneForAreaTree"));
              })();
              var l = a.getDomElement();
              (c = new t.Bimface.Application.UI.Panel.SectionPlanePanel(
                e
              )).addEventListener("Hide", function () {
                d.setCheckedState(!1), l.style.removeProperty("cursor");
              }),
                (l.style.cursor = "default"),
                i.appendChild(c.element),
                c.bringToFront(),
                e.addPanel(c),
                c.initPosition(),
                a.render();
            } else {
              var f = e.getPlugin("SectionPlane");
              f && f.hidePlane(),
                c && (e.removePanel(c.id), c.close(), a.render());
            }
          }),
          d
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Panel"
      ).PickSectionPlanePanel = function (n) {
        let a = t.Web.Lang.Utility.ClientHelper.getIsDesktop(),
          i = n.getViewer(),
          o = n.getRootElement(),
          l = new t.Bimface.UI.Panel.PanelConfig();
        (l.title = BimfaceLanguage.bf_panel_section_selectPlane),
          (l.id = "PickSectionPlanePanel"),
          (l.css = a
            ? { right: "10px", bottom: "170px", width: "200px", height: "90px" }
            : {
                maxWidth: "414px",
                left: "50%",
                transform: "translate(-50%)",
                bottom: "0.12em",
                width: "100%",
                height: "1.02em",
              }),
          (l.className = "bf-panel bf-section-panel bf-pickSectionPlane-panel"),
          (l.enableSizable = !1);
        let s,
          r = new t.Bimface.UI.Panel.Panel(l);
        if (
          ((function () {
            let e = new t.Bimface.UI.Toolbar.ToolbarConfig();
            (e.id = "SectionToolbar"),
              (e.className = "bf-pick-section-plane"),
              (e.buttons = [
                "SectionPlaneVisiable",
                "SectionPlaneReverse",
                "PickSectionPlaneReset",
              ]),
              (s = t.Bimface.Application.UI.Toolbar.Toolbar(e, n)),
              (r.sectionToolbar = s),
              r.addControl(s);
          })(),
          !a)
        ) {
          var c = o.offsetWidth,
            d = o.offsetHeight;
          (r.element.style.fontSize = (100 * Math.min(d, c, 414)) / 750 + "px"),
            r.element.addClass("section-panel");
          var f = e.create("div", "bf-button gld-bf-section-plane-pick"),
            m = r.element.querySelector(".bf-close"),
            p = r.element.querySelector(".gld-bf-reset-box");
          (m.innerHTML = `<span class='quit'>${BimfaceLanguage.bf_general_exit}</span>`),
            r.element
              .querySelector(".bf-pick-section-plane")
              .insertBefore(f, r.element.querySelector(".gld-bf-hide-slice")),
            f.addEventListener("touchend", function (e) {
              i.enableSnap(!0),
                C.show(),
                s.getControl("SectionPlaneVisiable").setCheckedState(!1);
              var t = n.getPlugin("SectionPlane");
              t && t.hidePlane();
            });
          let a = new t.Bimface.Viewer.SnapMode(),
            l = t.Bimface.Viewer.SnapObject.Face;
          a.setSnap3DList([l]), i.setSnapMode(a), i.enableSnap(!0);
          let u,
            g,
            h = (e, t, n, a, o) => {
              let l = i.getViewer().cameraControl;
              if (null != e) {
                var s = l.scene.drawingToWorld(e);
                e.copy(s);
              }
              if (null != t) {
                var r = l.scene.drawingToWorld(t[0]),
                  c = l.scene.drawingToWorld(t[1]);
                t[0].copy(r), t[1].copy(c);
              }
              return {
                pickPoint: e,
                pickLine: t,
                pickPlane: n,
                normal: a,
                userId: o,
              };
            },
            b = (e) => {
              if (C.showAuxBall) {
                let e = n.getPlugin("SectionPlane");
                (u = e.getOriginProgress(u)), e.setOriginProgress(u);
              }
            },
            v = (e, t) => {
              if (C.showAuxBall) {
                let a = n.getPlugin("SectionPlane");
                (e.progress = u), a.setDistanceProgress(e, t), i.render();
              } else {
                let t = i.getViewer().pickToPoint(e, 5),
                  n = t
                    ? h(
                        t.pickPoint,
                        t.pickLine,
                        t.pickPlane,
                        t.face.normal,
                        t.userId
                      )
                    : {};
                i.snap.snapByPoint(n);
              }
            },
            y = (e) => {
              if (C.showAuxBall);
              else {
                let a = i.getViewer().pickToPoint(e, 5),
                  o = n.getPlugin("SectionPlane");
                if (!a) return;
                C.showBall();
                let l = i.sceneToWorld(a.pickPoint);
                if ((i.enableSnap(!1), o && o._sectionTool)) o.showPlane();
                else {
                  n.removePlugin("SectionPlane");
                  let e = new t.Bimface.Plugins.Section.SectionPlaneConfig();
                  (e.viewer = i),
                    (e.id = "SectionPlane"),
                    (e.exitSectionBox = !1),
                    (o = new t.Bimface.Plugins.Section.SectionPlane(e)),
                    n.addPlugin(o),
                    s.getControl("SectionPlaneVisiable").setCheckedState(!1);
                }
                let r = -2;
                "m" === i._defaultUnit && (r /= 1e3),
                  o.setPositionByPlane(l, a.face.normal, r),
                  i.render();
              }
            },
            C = new t.Bimface.Plugins.AuxMobile.AuxMobile({
              viewer: i,
              editor: {
                touchMoveCallback: v,
                touchEndCallback: y,
                touchStartCallback: b,
              },
            });
          (n.auxMobile = C),
            C.canvas.addEventListener("touchstart", (e) => {
              let t = e.touches[0];
              (g = { x: t.pageX, y: t.pageY }), C.onTouchStart(e, g);
            }),
            C.canvas.addEventListener("touchmove", (e) => {
              let t = e.touches[0];
              (g = { x: t.pageX, y: t.pageY }), C.onTouchMove(e, g);
            }),
            C.canvas.addEventListener("touchend", (e) => {
              C.onTouchEnd(e, g), (g = null);
            }),
            p.addEventListener("click", (e) => {
              C.show();
            }),
            r.addEventListener("Close", (e) => {
              C.destroy();
            });
        }
        return r;
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).PickSectionPlane = function (e, n) {
      var a = e.getViewer(),
        i = e.getRootElement(),
        o = "Viewer3D" === a.viewerType,
        l = t.Bimface.UI.Control.ControlEvent,
        s = t.Bimface.Viewer.Viewer3DEvent;
      if (o) {
        var r = new t.Bimface.UI.Button.ButtonConfig();
        (r.id = "PickSectionPlane"),
          (r.title = BimfaceLanguage.bf_panel_section_selectPlane),
          (r.className = "bf-button gld-bf-section-plane-pick");
        var c,
          d = new t.Bimface.UI.Button.ToggleButton(r);
        return (
          d.addEventListener(l.StateChange, function (o) {
            if (
              (a
                .getEventManager()
                .fireEvent(s.ButtonOnToolbarClicked, {
                  id: r.id,
                  isChecked: d.isChecked(),
                }),
              o)
            ) {
              !(function () {
                var t = e.getToolbar("MainToolbar"),
                  a = t.getControl("Measure");
                a && a.setCheckedState(!1);
                var i = t.getControl("Explode");
                i && i.setCheckedState(!1);
                var o = n.getControl("SectionBox");
                o && o.setCheckedState(!1);
                var l = e.getPlugin("SectionBox");
                l && (l.hideBox(), l.exit());
                var s = n.getControl("SectionPlane");
                s && s.setCheckedState(!1);
                var r = e.getPlugin("SectionPlane");
                r && r.hidePlane();
                var c = e.getPlugin("SectionPlaneForAreaTree");
                c && (c.exit(), e.removePlugin("SectionPlaneForAreaTree"));
              })(),
                (f = a.getDomElement()),
                (c = new t.Bimface.Application.UI.Panel.PickSectionPlanePanel(
                  e
                )).addEventListener("Hide", function () {
                  a.enableSnap(!1),
                    d.setCheckedState(!1),
                    f.style.removeProperty("cursor");
                }),
                (f.style.cursor = "default"),
                i.appendChild(c.element),
                c.bringToFront(),
                e.addPanel(c),
                c.initPosition();
              let o = new t.Bimface.Viewer.SnapMode(),
                l = t.Bimface.Viewer.SnapObject.Face;
              o.setSnap3DList([l]), a.setSnapMode(o), a.enableSnap(!0);
            } else {
              var l = e.getPlugin("SectionPlane");
              l && l.hidePlane(),
                c && (e.removePanel(c.id), c.close(), a.render()),
                a.enableSnap(!1);
            }
            var f;
          }),
          a.addEventListener(s.MouseClicked, (n) => {
            const {
                normal: i,
                worldPosition: o,
                objectId: l,
                snapPoint: s,
              } = n,
              r = a.snap && a.snap.isOpen,
              c = s && "Plane" == s.type,
              f = d._checked;
            if ((r && f && a.removeSelectedId([l]), !(f && r && c))) return;
            a.enableSnap(!1);
            let m = 2;
            a.getUnit() === t.Bimface.Common.Units.LengthUnits.Meter &&
              (m *= 0.001),
              o.addScalar(m);
            let p = e.getPlugin("SectionPlane");
            if (p && p._sectionTool)
              p.setPositionByPlane(o, i, 0), p.showPlane();
            else {
              e.removePlugin("SectionPlane");
              let n = new t.Bimface.Plugins.Section.SectionPlaneConfig();
              (n.viewer = a),
                (n.id = "SectionPlane"),
                (n.exitSectionBox = !1),
                null != e.isSectionOutlineEnabled &&
                  e.isSectionOutlineEnabled !== n.isOutlineEnabled &&
                  (n.isOutlineEnabled = e.isSectionOutlineEnabled),
                (p = new t.Bimface.Plugins.Section.SectionPlane(n)),
                p.setPositionByPlane(o, i, 0),
                e.addPlugin(p);
            }
            a.render();
          }),
          d
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionBoxVisiable = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (i) {
        var l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "SectionBoxVisiable"),
          (l.title = BimfaceLanguage.bf_tip_section_hide),
          (l.className = "bf-button gld-bf-box-hide");
        var s = new t.Bimface.UI.Button.ToggleButton(l);
        return (
          s.addEventListener(o.StateChange, function (t) {
            var n = e.getPlugin("SectionBox");
            n && (t ? n.hideBox() : n.showBox()), a.render();
          }),
          s
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionPlaneVisiable = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (!i)
        return void console.log("The API is not supported on this viewer.");
      var l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "SectionPlaneVisiable"),
        (l.title = BimfaceLanguage.bf_tip_section_hide),
        (l.className = "bf-button gld-bf-hide-slice");
      var s = new t.Bimface.UI.Button.ToggleButton(l);
      let r = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
      return (
        s.addEventListener(o.StateChange, function (t) {
          var n = e.getPlugin("SectionPlane");
          n
            ? t
              ? (n.hidePlane(),
                r ||
                  (e.auxMobile &&
                    e.auxMobile.hideCanvas &&
                    e.auxMobile.hideCanvas()))
              : (n.showPlane(),
                r ||
                  (e.auxMobile &&
                    e.auxMobile.hideCanvas &&
                    e.auxMobile.showCanvas()))
            : s.setCheckedState(!1),
            a.render();
        }),
        s
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).MobileSectionPlaneBack = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = null;
      if ((t.Bimface.UI.Control.ControlEvent, i)) {
        var l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "MobileSectionPlaneBack"),
          (l.title = BimfaceLanguage.bf_tip_section_hide),
          (l.className = "bf-button bf-section-back");
        var s = new t.Bimface.UI.Button.Button(l);
        return (
          s.addEventListener("Click", function () {
            e.auxMobile && e.auxMobile.hideCanvas && e.auxMobile.hideCanvas(),
              o || (o = e.getToolbar("MainToolbar")),
              o && o.show();
            let n = e.getPanel("PickSectionPlanePanel");
            if (n) {
              let e = n.sectionToolbar.getControl("SectionPlaneVisiable");
              e._checked && e.setCheckedState(!1), n.hide();
            }
            let i = e.getPlugin("SectionPlane");
            i && (e.removePlugin(i.id), i.exit()),
              a.enableSnap(!1),
              a.render(),
              a
                .getEventManager()
                .fireEvent(
                  t.Bimface.Viewer.Viewer3DEvent.ButtonOnToolbarClicked,
                  { id: l.id, isChecked: !1 }
                );
          }),
          s
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionRotate = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (i) {
        var l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "SectionRotate"),
          (l.title = "旋转"),
          (l.className = "bf-button gld-bf-rotate-box");
        var s = new t.Bimface.UI.Button.ToggleButton(l);
        return (
          s.addEventListener(o.Click, function () {
            var e = t.Bimface.Viewer.SectionBoxMode;
            s.isChecked()
              ? a.setSectionBoxMode(e.Rotate)
              : a.setSectionBoxMode(e.Default);
          }),
          s
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionReset = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (i) {
        var l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "SectionReset"),
          (l.title = BimfaceLanguage.bf_tip_section_resetBox),
          (l.className = "bf-button gld-bf-reset-box");
        var s = new t.Bimface.UI.Button.Button(l);
        return (
          s.addEventListener(o.Click, function () {
            var t = e.getPlugin("SectionBox");
            t && t && t.reset(), a.render();
          }),
          s
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionPlaneReverse = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (i) {
        var l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "SectionPlaneReverse"),
          (l.title = BimfaceLanguage.bf_panel_section_reverse),
          (l.className = "bf-button gld-bf-reverse-axis-lg");
        var s = new t.Bimface.UI.Button.Button(l);
        return (
          s.addEventListener(o.Click, function () {
            var t = e.getPlugin("SectionPlane");
            t && t.changeClipDirection(), a.render();
          }),
          s
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).PickSectionPlaneReset = function (e, n) {
      let a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (!i)
        return void console.log("The API is not supported on this viewer.");
      let l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "PickSectionPlaneReset"),
        (l.title = BimfaceLanguage.bf_tip_section_resetBox),
        (l.className = "bf-button gld-bf-reset-box");
      let s = new t.Bimface.UI.Button.Button(l);
      return (
        s.addEventListener(o.Click, function () {
          let t = e.getPanel("PickSectionPlanePanel");
          if (t) {
            let e = t.sectionToolbar.getControl("SectionPlaneVisiable"),
              n = t.sectionToolbar.getControl("SectionPlaneReverse");
            e._checked && e.setCheckedState(!1),
              n._checked && n.setCheckedState(!1);
          }
          let n = e.getPlugin("SectionPlane");
          n && (e.removePlugin(n.id), n.exit()), a.enableSnap(!0), a.render();
        }),
        s
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Panel"
    ).InformationPanel = function (e, n) {
      var a = new t.Bimface.UI.Panel.PanelConfig();
      (a.title = BimfaceLanguage.bf_btn_info),
        (a.enableSizable = !1),
        (a.className = "bf-panel bf-basicInfo-panel");
      var i = e.getInformation();
      let o = e._manifest,
        l = o.Metadata && o.Metadata.IntegrateFileCount;
      const s = `<ul class="${
        l ? "bf-info-list-more" : "bf-info-list"
      }">\n                        ${
        l
          ? `<li>${BimfaceLanguage.bf_panel_info_files}：<span class="bf-info-value">${l}</span></li>`
          : ""
      }\n                        <li>${
        BimfaceLanguage.bf_panel_info_component
      }：<span class="bf-info-value">${Number(
        i.elements
      ).toLocaleString()}</span></li>\n                        <li>${
        BimfaceLanguage.bf_panel_info_mesh
      }：<span class="bf-info-value">${Number(
        i.triangles
      ).toLocaleString()}</span></li>\n                        <li>${
        BimfaceLanguage.bf_panel_info_vertex
      }：<span class="bf-info-value">${Number(
        i.vertices
      ).toLocaleString()}</span></li>\n                      </ul>`;
      let r,
        c = n && !n.show,
        d = n && n.show && !!n.content;
      c
        ? ((a.css = {
            left: "50%",
            top: "50%",
            width: "300px",
            height: "170px",
            transform: "translate(-50%,-50%)",
          }),
          (r = `<div class="bf-info">\n              ${s}\n            </div>`))
        : d
        ? ((a.css = {
            left: "50%",
            top: "50%",
            width: "300px",
            height: "210px",
            transform: "translate(-50%,-50%)",
          }),
          (r = `<div class="bf-info">\n              ${s}\n              ${n.content}\n            </div>`))
        : ((a.css = {
            left: "50%",
            top: "50%",
            width: "300px",
            height: "210px",
            transform: "translate(-50%,-50%)",
          }),
          (r = `<div class="bf-info">\n              ${s}\n              <div class="bf-info-power">Powered by <a target="_blank" href="http://bimface.com/">bimface.com</a></div>\n            </div>`));
      const f = new t.Bimface.UI.Panel.Panel(a);
      return f.setHtml(r), f;
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Panel"
    ).MobileInformationPanel = function (e, n) {
      var a = new t.Bimface.UI.Panel.PanelConfig();
      (a.title = BimfaceLanguage.bf_btn_info),
        (a.css = {
          left: "inherit",
          top: "inherit",
          width: "100%",
          bottom: 0,
          borderRadius: ".2em .2em 0 0",
        }),
        (a.enableSizable = !1),
        (a.className = "bf-panel bf-basicInfo-panel");
      var i = e.getInformation(),
        o = new t.Bimface.UI.Panel.Panel(a);
      let l = e._manifest,
        s = l.Metadata && l.Metadata.IntegrateFileCount;
      var r = `<div class="bf-info">\n                  <ul class="${
        s ? "bf-info-list-more" : "bf-info-list"
      }">\n                    ${
        s
          ? `<li><span class="title">${BimfaceLanguage.bf_panel_info_files}</span><span class="bf-info-value">${s}</span></li>`
          : ""
      }\n                    <li><span class="title">${
        BimfaceLanguage.bf_panel_info_component
      }</span><span class="bf-info-value">${Number(
        i.elements
      ).toLocaleString()}</span></li>\n                    <li><span class="title">${
        BimfaceLanguage.bf_panel_info_mesh
      }</span><span class="bf-info-value">${Number(
        i.triangles
      ).toLocaleString()}</span></li>\n                    <li><span class="title">${
        BimfaceLanguage.bf_panel_info_vertex
      }</span><span class="bf-info-value">${Number(
        i.vertices
      ).toLocaleString()}</span></li>\n                  </ul>\n                </div>`;
      return o.setHtml(r), o;
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Button"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Common.Flexible"
        );
      e.Information = function (e, a) {
        var i = e.getViewer(),
          o = e.getRootElement(),
          l = "Viewer3D" === i.viewerType,
          s = t.Bimface.UI.Control.ControlEvent,
          r = t.Bimface.Viewer.Viewer3DEvent;
        const c = i.getIsMobileNew();
        if (l) {
          var d = new t.Bimface.UI.Button.ButtonConfig();
          (d.id = "Information"),
            (d.title = BimfaceLanguage.bf_btn_info),
            (d.className = "bf-button gld-bf-information");
          var f,
            m,
            p = new t.Bimface.UI.Button.ToggleButton(d),
            g = !n.getIsTablet() && c;
          return (
            p.addEventListener(s.StateChange, async function (n) {
              if (n) {
                var l = a.getControl("ViewButton");
                if ((l && l.setCheckedState && l.setCheckedState(!1), f))
                  f.show();
                else {
                  if (c)
                    f =
                      new t.Bimface.Application.UI.Panel.MobileInformationPanel(
                        i,
                        o
                      );
                  else {
                    const e = (e) =>
                      new Promise((t) => {
                        fetch(e)
                          .then((e) => e.json())
                          .then((e) => {
                            t(e);
                          })
                          .catch(() => {
                            t({});
                          });
                      });
                    if (i._opt.useCustomResources) {
                      const n = await e(
                        `${u.staticHost}/resources/custom/config.json`
                      );
                      f = n.informationPanel
                        ? new t.Bimface.Application.UI.Panel.InformationPanel(
                            i,
                            n.informationPanel
                          )
                        : new t.Bimface.Application.UI.Panel.InformationPanel(
                            i
                          );
                    } else
                      f = new t.Bimface.Application.UI.Panel.InformationPanel(
                        i
                      );
                  }
                  f.addEventListener("Hide", function () {
                    p.setCheckedState(!1);
                  }),
                    o.appendChild(f.element),
                    f.bringToFront(),
                    e.addPanel(f);
                }
              } else f.hide();
              i
                .getEventManager()
                .fireEvent(r.ButtonOnToolbarClicked, {
                  id: d.id,
                  isChecked: n,
                }),
                g &&
                  (m || (m = e.getToolbar("MainToolbar")),
                  n ? m && m.hide() : m && m.show());
            }),
            p
          );
        }
        console.log("The API is not supported on this viewer.");
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).FullScreen = function (e, n) {
      var a = e.getViewer(),
        i = t.Bimface.UI.Control.ControlEvent,
        o = new t.Bimface.UI.Button.ButtonConfig();
      (o.id = "FullScreen"),
        (o.title = BimfaceLanguage.bf_btn_fullScreen),
        (o.className = "bf-button gld-bf-maximize");
      var l = new t.Bimface.UI.Button.ChangeButton(o);
      return (
        l.addEventListener(i.Click, function () {
          var e = this.hasClass("gld-bf-maximize");
          a.enableFullScreen(e);
        }),
        ["", "moz", "webkit", "ms"].forEach((e) => {
          document.addEventListener(e + "fullscreenchange", function () {
            var e = l.getTitle();
            l.toggleClassName("gld-bf-maximize"),
              l.toggleClassName("gld-bf-minimize"),
              e == BimfaceLanguage.bf_btn_fullScreen_exit
                ? l.setTitle(BimfaceLanguage.bf_btn_fullScreen)
                : l.setTitle(BimfaceLanguage.bf_btn_fullScreen_exit);
          });
        }),
        l
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).FamilyList = function (e, n) {
      var a = e.getViewer(),
        i = (a.viewerType, t.Bimface.UI.Control.ControlEvent),
        o = new t.Bimface.UI.Button.ButtonConfig();
      (o.id = "FamilyList"),
        (o.title = "FamilyList"),
        (o.className = "bf-combobox bf-family");
      var l = new t.Bimface.UI.Button.ComboBox(o);
      let s = a.getDefaultModel();
      return (
        a.getFamilyTypes(function (e) {
          for (var n = 0, a = e.length; n < a; n++) {
            var i = e[n],
              o = new t.Bimface.UI.Button.ButtonConfig();
            (o.id = i.id), (o.title = i.name);
            var r = new t.Bimface.UI.Button.ComboBoxOptionButton(o);
            r.setHtml(`<span class="bf-button-name">${i.name}</span>`),
              l.addControl(r),
              0 === n && (s._data.familyTypeId = i.id);
          }
        }),
        l.addEventListener(i.Change, function (n) {
          s.showFamilyTypeById(n.id), (s._data.familyTypeId = n.id);
          let i = e.getPanel("property");
          if ((i && i.initProperty("components"), e.getPanel("ModelTree"))) {
            e.getPanel("ModelTree").hide(), e.removePanel("ModelTree");
            const n = new t.Bimface.Application.UI.Panel.ModelTreePanel(
              e,
              e.getToolbar("ModelTree")
            );
            e.getRootElement().appendChild(n.element), e.addPanel(n);
          }
          a.render();
        }),
        l
      );
    }),
    (function () {
      let e = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(
          Glodon,
          "Bimface.Application.UI.Panel"
        ),
        t = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(
          Glodon,
          "Web.Lang.Utility.Dom"
        );
      e.MobileLayoutListPanel = function (e) {
        var n = new Glodon.Bimface.UI.Panel.PanelConfig(),
          a = this;
        let i = e.getViewer();
        (this.viewer = i),
          (this.currentViewId = "Model"),
          (n.id = "MobileLayoutListPanel"),
          (n.enableSizable = !1),
          (n.className = "bf-panel bf-layoutlist-panel-simple");
        var o = new Glodon.Bimface.UI.Panel.SimplePanel(n),
          l = t.create("div", "bf-panel-simple");
        let s = (i.loadedDrawings.length > 0 ? i.loadedDrawings[0].drawing : i)
            .getViewer()
            .getLayouts(),
          r = Glodon.Bimface.Viewer.ViewerDrawingEvent,
          c = "";
        for (let e = 0, t = s.length; e < t; e++) {
          let t = s[e];
          c += `\n        <li class="bf-panel-item ${
            0 === e ? "bf-active" : ""
          }" data-type="${
            t.id || "Model"
          }">\n          <span class="bf-panel-item-text">${
            t.name
          }</span>\n          <span class="bf-panel-item-right gld-bimface"></span>\n        </li>\n      `;
        }
        var d = `\n      <div class="bf-panel-simple-header">\n        <span class="bf-title">${BimfaceLanguage.bf_panel_views}</span>\n        <span class="bf-close"></span>\n      </div>\n      <div class="bf-panel-simple-body">\n        <ul class="bf-panel-list-wrapper">\n          ${c}\n        </ul>\n      </div>\n    `;
        l.innerHTML = d;
        var f = l.querySelectorAll(".bf-panel-item");
        let m = {},
          p = {};
        for (var u = 0; u < f.length; u++)
          f[u].addEventListener("click", function () {
            const t = this.getAttribute("data-type");
            if (a.currentViewId === t) return;
            a.currentViewId = t;
            for (var n = 0; n < f.length; n++) f[n].removeClass("bf-active");
            this.addClass("bf-active");
            let o = e.getPanel("MeaurePanel"),
              l = e.getToolbar("MainToolbar"),
              s = l && l.getControl("Annotation"),
              c = i.getCurrentViewId(!0);
            s &&
              s._enabled &&
              (m[c] = s._annotationManager.getAnnotationList()),
              o && o.hide(),
              (p[c] = i.getCurrentState()),
              "Model" == t ? i.showViewById(0) : i.showViewById(t),
              setTimeout(() => {
                i.update(!0);
              }, 100),
              s &&
                s._enabled &&
                m[t] &&
                s._annotationManager.setAnnotationList(m[t]);
            let d = "Model" == t ? "0" : t;
            p[d] && i.setState(p[d]);
            let u = l && l.getControl("Map");
            u && (u.element.style.display = "inline-block"),
              i
                .getEventManager()
                .fireEvent(r.ButtonOnToolbarClicked, {
                  id: "LeftSubToolbar",
                  viewId: t,
                });
          });
        return (
          l.querySelector(".bf-close").addEventListener("click", function () {
            o.hide();
          }),
          o.element.appendChild(l),
          o
        );
      };
    })();
  let M = t.Web.Lang.Utility.Namespace.ensureNamespace(
    t,
    "Web.Common.Flexible"
  );
  (t.Web.Lang.Utility.Namespace.ensureNamespace(
    t,
    "Bimface.Application.UI.Button"
  ).MobileLayoutList = function (e, n) {
    var a = e.getViewer(),
      i = e.getRootElement();
    let o = "ViewerDrawing" == a.viewerType;
    var l = t.Bimface.UI.Control.ControlEvent;
    const s = a.getIsMobileNew();
    if (!o) return void console.log("The API is not supported on this viewer.");
    var r = new t.Bimface.UI.Button.ButtonConfig();
    (r.id = "MobileLayoutList"),
      (r.title = BimfaceLanguage.bf_btn_settings),
      (r.className = "bf-button gld-bimface gld-bf-view-mobile");
    var c = new t.Bimface.UI.Button.ToggleButton(r);
    let d = null;
    var f,
      m = !M.getIsTablet() && s;
    return (
      c.addEventListener(l.StateChange, function (n) {
        (d = e.getPanel("MobileLayoutListPanel")),
          n
            ? d
              ? d.show()
              : ((d = new t.Bimface.Application.UI.Panel.MobileLayoutListPanel(
                  e
                )),
                d.addEventListener("Hide", function () {
                  c.setCheckedState(!1);
                }),
                i.appendChild(d.element),
                d.bringToFront(),
                e.addPanel(d))
            : d && d.hide(),
          m &&
            (f || (f = e.getToolbar("MainToolbar")),
            n ? f && f.hide() : f && f.show());
      }),
      c
    );
  }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).LayoutList = function (e, n) {
      let a = e.getViewer(),
        i = t.Bimface.UI.Control.ControlEvent,
        o = new t.Bimface.UI.Button.ButtonConfig();
      (o.id = "LayoutList"),
        (o.title = "LayoutList"),
        (o.className = "bf-combobox bf-family");
      let l = new t.Bimface.UI.Button.ComboBox(o),
        s = (a.loadedDrawings.length > 0 ? a.loadedDrawings[0].drawing : a)
          .getViewer()
          .getLayouts(),
        r = t.Bimface.Viewer.ViewerDrawingEvent;
      const c = (e) => {
        for (let n = 0, a = e.length; n < a; n++) {
          let a = e[n],
            i = new t.Bimface.UI.Button.ButtonConfig();
          (i.id = a.id || "Model"), (i.title = a.name);
          let o = new t.Bimface.UI.Button.ComboBoxOptionButton(i);
          o.setHtml(`<span class="bf-button-name">${a.name}</span>`),
            l.addControl(o);
        }
      };
      c(s);
      let d = {},
        f = {};
      return (
        l.addEventListener(i.Change, function (t) {
          let n,
            i = e.getPanel("MeaurePanel"),
            o = e.getToolbar("MainToolbar"),
            l = a.getCurrentViewId(!0);
          o && (n = o.getControl("Annotation")),
            n &&
              n._enabled &&
              (d[l] = n._annotationManager.getAnnotationList()),
            i && i.hide(),
            (f[l] = a.getCurrentState()),
            "Model" == t.id ? a.showViewById(0) : a.showViewById(t.id),
            setTimeout(() => {
              a.update(!0);
            }, 100),
            n &&
              n._enabled &&
              d[t.id] &&
              n._annotationManager.setAnnotationList(d[t.id]);
          let s = "Model" == t.id ? "0" : t.id;
          f[s] && a.setState(f[s]);
          let c = o && o.getControl("Map");
          c && (c.element.style.display = "inline-block");
          let m = "Model" === t.id ? 0 : t.id;
          a.getEventManager().fireEvent(r.ButtonOnToolbarClicked, {
            id: "LeftSubToolbar",
            viewId: m,
          });
        }),
        a.loadedDrawings.length > 0 &&
          a.addEventListener(r.ViewChanged, () => {
            a.getViewer().viewer.ResetLayoutList();
            const t = l.getCurrentControl() && l.getCurrentControl().id,
              n = l.getControls(),
              i = [];
            n.map((e) => i.push(e.id)), i.map((e) => l.removeControl(e));
            const o = [];
            a.loadedDrawings.map((e) => {
              e.initRemoved ||
                (e.drawing.getViewer() &&
                  e.drawing.getViews().map((e) => {
                    o.find((t) => t.id == e.id) || o.push(e);
                  }));
            }),
              c(o);
            const s = o.find((e) => e.id == ("Model" == t ? 0 : t));
            e.getToolbar("LeftSubToolbar") &&
              e.getToolbar("LeftSubToolbar").show();
            let r = !1;
            a.loadedDrawings.map((e) => {
              e.initRemoved ||
                (r =
                  r ||
                  (e.drawing._manifest &&
                    e.drawing._manifest.Features.HasLayout));
            }),
              r ||
                (e.getToolbar("LeftSubToolbar") &&
                  e.getToolbar("LeftSubToolbar").hide()),
              s
                ? l.setSelectedControlById(t)
                : a.loadedDrawings.length > 0 &&
                  !a.loadedDrawings[0].initRemoved
                ? a.showViewById(0)
                : e.getToolbar("LeftSubToolbar") &&
                  e.getToolbar("LeftSubToolbar").hide();
          }),
        l
      );
    });
  const T = t.Bimface.Application.WebApplication3DEvent;
  class _ {
    constructor() {
      (this._bfMaxLoadedNodesNum = 1e4),
        (this._bfRenderedNodes = []),
        (this._bfComponentsTreeConfigs = []);
    }
    isNodeExpanded(e, t) {
      (this._bfComponentsTreeConfigs.find(
        (t) => t.path == e.path
      ).config.isExpand = t),
        this._bfComponentsTreeConfigs
          .filter((t) => 0 == t.path.toString().indexOf(e.path + "-"))
          .map((e) => (e.show = t));
    }
    mixtureStructureAndClassicConfigs(e, t) {
      let n = e;
      if (e > 0) {
        const a = this._bfComponentsTreeConfigs.filter(
          (e) => 0 == e.path.indexOf(`${t}-`)
        );
        n = a.length > 0 ? a.length : e;
      }
      return n;
    }
    addUnsavedConfigs(e, t, n, a, i, o, l, s) {
      const r = this._bfComponentsTreeConfigs.findIndex((e) => e.path == s);
      if (
        (e.elementIds && e.elementIds.length > 0) ||
        (e.items[0].elementIds && e.items[0].elementIds.length > 0)
      )
        (e.elementIds || e.items).map((c, d) => {
          if (c.elementIds) {
            let p = c.elementIds.length,
              u = 0;
            if (d > 0)
              for (let t = 0; t < d; t++) u += e.items[t].elementIds.length;
            for (var f = 0, m = p; f < m; f++) {
              let e = c.fileId
                ? `${c.fileId}.${c.elementIds[f]}`
                : `${c.elementIds[f]}`;
              this._bfCreatTreeNode(t, e, n, a, i, r, o, f + u, l + 1, s);
            }
          } else {
            const e = this.mixtureStructureAndClassicConfigs(d, s);
            this._bfCreatTreeNode(t, c, n, a, i, r, o, e, l + 1, s);
          }
        });
      else
        for (var c = 0, d = e.items.length; c < d; c++)
          e.items[c].fileId ||
            (!e.fileId && !e.fileIdFromParent) ||
            (e.items[c].fileIdFromParent =
              e.fileIds || e.fileId || e.fileIdFromParent),
            this._bfCreatTreeNode(t, e.items[c], n, a, i, r, o, c, l + 1, s);
    }
    _bfAddComponentTreeData(e, t, n, a, i, o, l, s, r) {
      const c = this._bfComponentsTreeConfigs.findIndex((e) => e.path == r);
      if (
        (e.elementIds && e.elementIds.length > 0) ||
        (e.items[0].elementIds && e.items[0].elementIds.length > 0)
      )
        (e.elementIds || e.items).map((o, d) => {
          if (o.elementIds) {
            let p = o.elementIds.length,
              u = 0;
            if (d > 0)
              for (let t = 0; t < d; t++) u += e.items[t].elementIds.length;
            for (var f = 0, m = p; f < m; f++) {
              let e = o.fileId
                ? `${o.fileId}.${o.elementIds[f]}`
                : `${o.elementIds[f]}`;
              this._bfCreatTreeNode(t, e, n, a, i, c, l, f + u, s + 1, r);
            }
          } else {
            const e = this.mixtureStructureAndClassicConfigs(d, r);
            this._bfCreatTreeNode(t, o, n, a, i, c, l, e, s + 1, r);
          }
        });
      else
        for (var d = 0, f = e.items.length; d < f; d++)
          e.items[d].fileId ||
            (!e.fileId && !e.fileIdFromParent) ||
            (e.items[d].fileIdFromParent =
              e.fileIds || e.fileId || e.fileIdFromParent),
            this._bfCreatTreeNode(t, e.items[d], n, a, i, c, l, d, s + 1, r);
    }
    _bfLoadVirtualNodes(e, n, a, i, o = !1, l = -1, s = !1) {
      if (
        t.Web.Lang.Utility.ClientHelper.getIsDesktop()
          ? a._opt.domElement.getElementsByClassName(
              "bf-panel bf-modelTree-panel bf-sizable"
            )[0]
          : a._opt.domElement.getElementsByClassName(
              "bf-button gld-bf-tree bf-checked"
            )[0]
      ) {
        let r = [];
        const c = this,
          d = e.tree && e.tree._selectionNode ? e.tree._selectionNode.id : null;
        i.map((i) => {
          const o = new t.Bimface.UI.Tree.TreeNode(i.config);
          (o.modelId = i.modelId),
            (o.filter = i.filter),
            (o.fileId = i.fileId),
            o.setData(i.id, i.name),
            o.setCheckedState(i.checkedState, i.isHalfChecked),
            o.setIconState(i.isolatedState),
            (o.treeCategory = i.treeCategory),
            (o.level = i.level),
            (o.path = i.path),
            i.id && d && i.id == d && o.select(),
            o.addEventListener("SelectionChanged", function (e, t, n = !0) {
              c.selectComponent(a, e, t, n);
            }),
            o.addEventListener("IconChanged", function (e, t) {
              const n = `^${e.path}-`;
              c._bfComponentsTreeConfigs
                .filter(
                  (t) => 0 == t.path.search(new RegExp(n)) || t.path == e.path
                )
                .map((e) => {
                  (e.isolatedState = t), (e.config.icon.type = t);
                });
              c._bfRenderedNodes
                .filter((e) => 0 == e.path.search(new RegExp(n)))
                .map((e) => {
                  e.setIconState(t);
                });
            }),
            o.addEventListener("CheckedChanged", function (e, t) {
              const n = `^${t.path}-`;
              c._bfComponentsTreeConfigs
                .filter(
                  (e) => 0 == e.path.search(new RegExp(n)) || e.path == t.path
                )
                .map((t) => {
                  (t.checkedState = "checked" == e),
                    (t.config.isChecked = "checked" == e);
                });
              c._bfRenderedNodes
                .filter((e) => 0 == e.path.search(new RegExp(n)))
                .map((t) => {
                  t.setCheckedState("checked" == e);
                });
            }),
            o.addEventListener("NodeNameClicked", (e, t) => {
              let n = o.modelId || a.getModel().modelId;
              const i =
                "string" == typeof e._opt.datas
                  ? { id: e._opt.datas, modelId: n }
                  : { ...e._opt.datas, modelId: n };
              let l;
              if ("string" != typeof e._datas && e.treeCategory)
                if ("structTree" == e.treeCategory) {
                  let t = {};
                  (t[e._datas.type] = e._datas.id), (l = [t]);
                } else if (
                  "group" === e.filter ||
                  ("model" === e.filter && !e.id)
                ) {
                  let { datas: t } = e.getConfig();
                  l = c.getFolderConditions(t, []);
                } else l = c.getConditions(e, a);
              else l = null;
              l
                ? (delete l[0].modelId,
                  a.fireEvent(
                    T.ModelTreeNodeClicked,
                    Object.assign(
                      { isSelected: t, condition: { objectData: l } },
                      i
                    )
                  ))
                : a.fireEvent(
                    T.ModelTreeNodeClicked,
                    Object.assign({ isSelected: t }, i)
                  );
            }),
            o.addEventListener("ExpandChanged", (t, i) => {
              let l = t.getChildNode();
              if (i && t._datas.items && t._datas.items.length > 0 && !l) {
                var s = "checked" === t.getCheckedState(),
                  r = t.getIconState() ? "default" : "change";
                !c._bfComponentsTreeConfigs.find(
                  (e) => 0 == e.path.indexOf(`${o.path}-`)
                ) &&
                  c.addUnsavedConfigs(
                    t._datas,
                    e,
                    t.modelId,
                    s,
                    r,
                    t.treeCategory,
                    o.level,
                    o.path
                  );
                const i = `^${o.path}-\\d+$`;
                let l = c._bfComponentsTreeConfigs.filter(
                  (e) => 0 == e.path.search(new RegExp(i))
                );
                (l = l.filter(
                  (e) => !c._bfRenderedNodes.find((t) => t.path == e.path)
                )),
                  (c._bfDisplayedNum += l.length),
                  c._bfLoadVirtualNodes(
                    e,
                    n,
                    a,
                    l,
                    !0,
                    c._bfRenderedNodes.findIndex((e) => e.path == t.path),
                    !1
                  ),
                  requestAnimationFrame(() => {
                    if (c._bfRenderedNodes.length > c._bfMaxLoadedNodesNum) {
                      const e =
                        c._bfRenderedNodes.length - c._bfMaxLoadedNodesNum;
                      for (let t = 0; t < e; t++) {
                        const e = c._bfRenderedNodes.pop();
                        e.getParent().removeChildNode(e.id);
                      }
                    }
                  }),
                  c.isNodeExpanded(t, !0);
              }
              if (!i) {
                const i = c._bfRenderedNodes.filter(
                  (e) => 0 == e.path.toString().indexOf(t.path + "-")
                );
                c._bfDisplayedNum -= i.length;
                let o = c._bfRenderedNodes.filter(
                    (e) => -1 == e.path.toString().indexOf(`${t.path}-`)
                  ),
                  l = c._bfComponentsTreeConfigs.findIndex(
                    (e) => e.path == o[o.length - 1].path
                  );
                const s = c._bfComponentsTreeConfigs.filter(
                  (e) => 0 == e.path.toString().indexOf(t.path + "-")
                );
                s.map((e) => {
                  e.config.isExpand = !1;
                }),
                  c._bfComponentsTreeConfigs[l].path == t.path &&
                    (l += s.length),
                  (c._bfRenderedNodes = o),
                  1 != a.getModels().length &&
                    n.path &&
                    (o = o.filter(
                      (e) =>
                        e.path.split("-")[0] == t.path.split("-")[0] &&
                        e.path != n.path
                    )),
                  n.replaceChildren(o),
                  (l = c._bfComponentsTreeConfigs.findIndex(
                    (e) => e.path == o[o.length - 1].path
                  ));
                const r = Math.min(
                  c._bfMaxLoadedNodesNum - o.length,
                  c._bfComponentsTreeConfigs.length - 1 - l
                );
                for (let i = 0; i < r; i++) {
                  const o = c._bfComponentsTreeConfigs[l + i + 1];
                  0 != o.path.indexOf(t.path) &&
                    o.show &&
                    (1 == a.getModels().length ||
                      (a.getModels().length > 1 &&
                        o &&
                        o.path != n.path &&
                        o.path.split("-")[0] == t.path.split("-")[0])) &&
                    c._bfLoadVirtualNodes(e, n, a, [o], !1, -1);
                }
                c.isNodeExpanded(t, !1);
              }
            }),
            r.push(o);
        }),
          s
            ? ((this._bfRenderedNodes = [...r]),
              n.replaceChildren(r),
              r.map((e) => {
                const t = e.path.split("-").length - 1;
                (e.element.style.paddingLeft = 16 * t + "px"),
                  (e.element.style.display = "block");
              }))
            : (-1 == l
                ? (this._bfRenderedNodes = o
                    ? [...r, ...this._bfRenderedNodes]
                    : [...this._bfRenderedNodes, ...r])
                : this._bfRenderedNodes.splice(l + 1, 0, ...r),
              r.map((e, t) => {
                n &&
                  requestAnimationFrame(() => {
                    const a = n._controls.findIndex(
                      (t) => t.path == e.path.replaceAll(/-\d*$/g, "")
                    );
                    o ? n.addChildNode(e, a + 1 + t) : n.addChildNode(e);
                    const i = e.path.split("-").length - 1;
                    (e.element.style.paddingLeft = 16 * i + "px"),
                      (e.element.style.display = "block");
                  });
              }));
      }
    }
    _bfCreatTreeNode(
      e,
      n,
      a,
      i = !0,
      o = "default",
      l,
      s,
      r,
      c = 1,
      d = "",
      f = !0
    ) {
      if (!n) return;
      let m = {
        tagName: "div",
        className: "bf-control bf-tree",
        title: "tree",
        icon: null,
        hasCheckbox: !0,
        isChecked: i,
        enabled: !0,
        selection: !0,
        propagation: !0,
        hasExpand: !1,
      };
      var p = new t.Bimface.UI.Button.ButtonConfig();
      (p.className = "bf-tree-icon"),
        (p.defaultClass = "gld-bf-untransparent"),
        (p.changeClass = "gld-bf-transparent"),
        (p.title = BimfaceLanguage.bf_panel_modelTree_transparent),
        (m.selection = !0);
      var u = new t.Bimface.UI.Button.ChangeButton(p);
      switch (n.type) {
        case "floor":
          (n.type = "levelName"),
            (m.isChecked = !0),
            (m.hasCheckbox = !0),
            (m.icon = u);
          break;
        case "category":
          (n.type = "categoryId"),
            (m.isChecked = !0),
            (m.hasCheckbox = !0),
            (m.icon = u);
          break;
        case "specialty":
        case "family":
        case "familyType":
        default:
          (m.isChecked = !0), (m.hasCheckbox = !0), (m.icon = u);
          break;
        case "root":
          (m.isChecked = !0),
            (m.hasCheckbox = !0),
            (m.selection = !1),
            (m.icon = u);
      }
      n.elementIds &&
        ((n.type = "fileId"),
        (m.isChecked = !0),
        (m.hasCheckbox = !0),
        (m.icon = u)),
        n.type || ((m.isChecked = !0), (m.hasCheckbox = !0), (m.icon = u)),
        n.items && n.items.length > 0 ? (m.hasExpand = !0) : (m.hasExpand = !1),
        (m.datas = n);
      let g = {};
      if (
        ((g.config = m),
        (g.filter = "number" == typeof n.type ? "modelId" : n.type),
        "family" == n.type && (g.famliyName = n.name),
        (g.modelId = a),
        "model" == n.type && (g.fileId = n.fileIds),
        "categoryId" == n.type || "root" == n.type || "model" == n.type)
      )
        (g.id = n.id), (g.name = n.name);
      else if (n.elementIds || n.type)
        "L0" == n.type
          ? ((g.id = n.actualName), (g.name = n.name))
          : n.fileId
          ? ((g.id = n.fileId), (g.name = n.fileId))
          : "specialty" == n.type && "" == n.name
          ? ((g.id = ""),
            (g.name = BimfaceLanguage.bf_panel_modelTree_specialtyUndefined))
          : n.name == BimfaceLanguage.bf_panel_modelTree_specialtyUndefined
          ? ((g.id = ""), (g.name = n.name))
          : ((g.id = n.actualName), (g.name = n.name));
      else {
        let e = -1 == n.indexOf(".") ? n : n.split(".")[1];
        const t =
          this._bfComponentsTreeConfigs[l] &&
          this._bfComponentsTreeConfigs[l].famliyName
            ? `${this._bfComponentsTreeConfigs[l].famliyName}[${e}]`
            : `[${e}]`;
        (g.id = n), (g.name = t);
      }
      (g.checkedState = i),
        (g.isolatedState = o),
        (g.path = "" !== d ? d + "-" + r : r.toString()),
        (g.level = c),
        (g.treeCategory = s),
        (g.show = f),
        this._bfComponentsTreeConfigs
          ? l > -1
            ? (this._bfComponentsTreeConfigs[l].famliyName &&
                (g.famliyName = this._bfComponentsTreeConfigs[l].famliyName),
              this._bfComponentsTreeConfigs.splice(l + 1 + r, 0, g))
            : this._bfComponentsTreeConfigs.push(g)
          : (this._bfComponentsTreeConfigs = [g]);
    }
    getConditions(e, t) {
      var n = function (e) {
        if (e._parent) {
          var i = e._parent;
          "model" === i.filter
            ? !a.fileId && i.fileId && (a.fileId = i.fileId)
            : "root" != i.filter &&
              ("type" === i.filter
                ? i._datas && i._datas.id && (a.typeId = i._datas.id)
                : i.id && (a[i.filter] = i.id),
              n(i));
        }
        if (e.path && e.path.indexOf("-") > 0) {
          let n = e.path.split("-");
          for (let e = n.length - 1; e > -1; e--) {
            let i = n.slice(0, e + 1).join("-"),
              o = t.dynamicTree._bfComponentsTreeConfigs.find(
                (e) => e.path === i
              );
            o &&
              (a.fileId || ("model" !== o.filter && "modelId" != o.filter)
                ? "root" != o.filter &&
                  ("type" === o.filter
                    ? o._datas && o._datas.id && (a.typeId = o._datas.id)
                    : o.filter &&
                      "number" != typeof o.filter &&
                      o.id &&
                      (a[o.filter] = o.id))
                : o.fileId && (a.fileId = o.fileId));
          }
        }
      };
      if (e.filter) {
        var a = {};
        "type" === e.filter
          ? (a.typeId = e._datas.id)
          : e.id && (a[e.filter] = e.id),
          e._datas &&
            (e._datas.fileId || e._datas.fileIdFromParent) &&
            (a.fileId = e._datas.fileId || e._datas.fileIdFromParent),
          n(e);
      } else if (e.id) {
        var i = e._parent.fileId;
        a = i ? `${i}.${e.id}` : e.id;
      }
      return [a];
    }
    getFolderConditions(e, t) {
      if ("group" === e.type)
        for (let n = 0; n < e.items.length; n++)
          this.getFolderConditions(e.items[n], t);
      else if ("model" === e.type) t.push({ fileId: e.fileIds });
      else {
        let n, a;
        switch (e.type) {
          case "floor":
            n = "levelName";
            break;
          case "category":
            n = "categoryId";
            break;
          default:
            n = e.type;
        }
        (a =
          "categoryId" == e.type || "root" == e.type || "model" == e.type
            ? e.id
            : e.elementIds || e.type
            ? e.fileId
              ? e.fileId
              : ("specialty" == e.type && "" == e.name) ||
                e.name == BimfaceLanguage.bf_panel_modelTree_specialtyUndefined
              ? ""
              : e.actualName
            : e),
          t.push({ [n]: a });
      }
      return t;
    }
    selectComponent(e, t, n, a) {
      let i;
      if ("group" === t.filter || ("model" === t.filter && !t.id)) {
        let { datas: e } = t.getConfig();
        i = this.getFolderConditions(e, []);
      } else i = this.getConditions(t, e);
      var o;
      if (
        (t.filter
          ? (i[0] && delete i[0].modelId,
            (o = e.getViewer().getFilter().getMatchIds(i)))
          : (o = i),
        (e.getViewer()._componentTreeSelect = !0),
        n)
      ) {
        e.getModels().forEach((e) => {
          e.clearSelectedComponents();
        });
        const n = e.getModel(t.modelId);
        n &&
          (n.addSelectedComponentsById(o),
          a && n.zoomToSelectedComponents(1),
          t.recoverSelect());
      } else
        e.getModels().forEach((e) => {
          e.clearSelectedComponents();
        });
      e.render();
    }
  }
  var S = function (e) {
      if (e) {
        var n = new t.Bimface.UI.Tree.TreeNodeConfig(),
          a = new t.Bimface.UI.Button.ButtonConfig();
        (a.className = "bf-tree-icon"),
          (a.defaultClass = "gld-bf-untransparent"),
          (a.changeClass = "gld-bf-transparent"),
          (a.title = BimfaceLanguage.bf_panel_modelTree_transparent),
          (n.selection = !0);
        var i = new t.Bimface.UI.Button.ChangeButton(a);
        switch (e.type) {
          case "root":
          case "modelId":
            (n.isChecked = !0),
              (n.hasCheckbox = !0),
              (n.selection = !1),
              (n.icon = i);
            break;
          default:
            (n.isChecked = !1), (n.hasCheckbox = !1);
        }
        var o = new t.Bimface.UI.Tree.TreeNode(n);
        return (o.filter = e.type), o.setData(e.id, e.name), o;
      }
    },
    I = function (e, n, a, i) {
      if (n && 0 != n.length) {
        var o = S({
          type: "root",
          id: "all",
          name: BimfaceLanguage.bf_panel_modelTree_allComponents,
        });
        o.expand(), o.setAttribute("id", "treeRootNode");
        var l = new t.Bimface.UI.Tree.Tree(o);
        i.getViewer().dynamicTree
          ? ((i.getViewer().dynamicTree._bfRenderedNodes = []),
            (i.getViewer().dynamicTree._bfComponentsTreeConfigs = null))
          : (i.getViewer().dynamicTree = new _());
        var s = (t, n, o = -1) => {
          t.meta;
          var l = !0,
            s = (e) => {
              "familyType" === e.type
                ? (e.items && 0 !== e.items.length) || (l = !1)
                : e.items && e.items.length > 0 && s(e.items[0]);
            };
          t.data && t.data.length > 0 && s(t.data[0]),
            l
              ? (function (e, t, n, a, i = -1, o) {
                  var l = n.data,
                    s = n.modelType,
                    r = n.treeType,
                    c = "all" !== e.id ? e.id : t.getModel().modelId;
                  const d = (o.getViewer().dynamicTree = o.getViewer()
                    .dynamicTree
                    ? o.getViewer().dynamicTree
                    : new _());
                  if (
                    (!Glodon.Web.Lang.Utility.ClientHelper.getIsDesktop() &&
                      t.dynamicTree &&
                      ((t.dynamicTree._bfComponentsTreeConfigs = []),
                      (t.dynamicTree._bfRenderedNodes = []),
                      e.replaceChildren([])),
                    -1 == i)
                  )
                    d._bfComponentTreeData = l;
                  else {
                    const e = {
                      type: n.meta.type,
                      name: n.meta.name,
                      actualName: n.meta.name,
                      items: l,
                    };
                    0 == i
                      ? (d._bfComponentTreeData = [e])
                      : Array.isArray(d._bfComponentTreeData)
                      ? d._bfComponentTreeData.push(e)
                      : (d._bfComponentTreeData = [e]),
                      d._bfCreatTreeNode(
                        o,
                        e,
                        n.meta.modelId,
                        !0,
                        "default",
                        -1,
                        a,
                        i,
                        1,
                        ""
                      );
                  }
                  if (l && 0 != l.length) {
                    var f;
                    if ("singleModel" == s)
                      for (var m = 0, p = (f = l).length; m < p; m++)
                        if (1 == p && "floor" == f[m].type)
                          for (var u = f, g = 0; g < u.length; g++)
                            if (
                              1 === u.length &&
                              u[g].elementIds &&
                              u[g].elementIds.length > 0
                            )
                              for (let e = 0; e < u[0].elementIds.length; e++)
                                d._bfCreatTreeNode(
                                  o,
                                  u[g].elementIds[e],
                                  c,
                                  !0,
                                  "default",
                                  -1,
                                  a,
                                  `${g}-${e}`,
                                  -1 == i ? 1 : 2,
                                  -1 == i ? "" : i,
                                  -1 == i
                                );
                            else
                              d._bfCreatTreeNode(
                                o,
                                u[g],
                                c,
                                !0,
                                "default",
                                -1,
                                a,
                                g,
                                -1 == i ? 1 : 2,
                                -1 == i ? "" : i,
                                -1 == i
                              );
                        else
                          d._bfCreatTreeNode(
                            o,
                            f[m],
                            c,
                            !0,
                            "default",
                            -1,
                            a,
                            m,
                            -1 == i ? 1 : 2,
                            -1 == i ? "" : i,
                            -1 == i
                          );
                    else
                      for (
                        m = 0, p = (f = "old" == r ? l.items : l).length;
                        m < p;
                        m++
                      )
                        d._bfCreatTreeNode(
                          o,
                          f[m],
                          c,
                          !0,
                          "default",
                          -1,
                          a,
                          m,
                          -1 == i ? 1 : 2,
                          -1 == i ? "" : i
                        );
                    if (-1 == i) {
                      const n = d._bfComponentsTreeConfigs.slice(
                        0,
                        d._bfMaxLoadedNodesNum
                      );
                      d._bfLoadVirtualNodes(o, e, t, n, !1, -1);
                    } else {
                      const n = `^${i}-\\d+$`,
                        a = d._bfComponentsTreeConfigs.filter(
                          (e) => 0 == e.path.search(new RegExp(n))
                        );
                      d._bfLoadVirtualNodes(
                        o,
                        e,
                        t,
                        a.slice(0, d._bfMaxLoadedNodesNum),
                        !1,
                        -1
                      );
                    }
                  }
                })(n, e, t, a, o, i)
              : (function (e, t, n, a, i, o) {
                  var l = n.data,
                    s = n.modelType,
                    r = "all" !== e.id ? e.id : void 0;
                  if ((n.meta.workerType, l && 0 != l.length)) {
                    if (
                      (o.getViewer().dynamicTree ||
                        (o.getViewer().dynamicTree = new _()),
                      "singleModel" == s)
                    )
                      for (var c = 0, d = l.length; c < d; c++)
                        if (1 == d && "floor" == l[c].type)
                          for (var f = l[c].items, m = 0; m < f.length; m++)
                            o.getViewer().dynamicTree._bfCreatTreeNode(
                              o,
                              f[m],
                              r,
                              !0,
                              "default",
                              -1,
                              a,
                              m,
                              -1 == i ? 1 : 2,
                              -1 == i ? "" : i
                            );
                        else if (
                          "specialty" == l[0].type &&
                          "floor" == l[0].items[0].type &&
                          1 == l[0].items.length
                        )
                          for (
                            f = l[0].items[0].items, m = 0;
                            m < f.length;
                            m++
                          )
                            o.getViewer().dynamicTree._bfCreatTreeNode(
                              o,
                              f[m],
                              r,
                              !0,
                              "default",
                              -1,
                              a,
                              m,
                              -1 == i ? 1 : 2,
                              -1 == i ? "" : i
                            );
                        else
                          o.getViewer().dynamicTree._bfCreatTreeNode(
                            o,
                            l[c],
                            r,
                            !0,
                            "default",
                            -1,
                            a,
                            c,
                            -1 == i ? 1 : 2,
                            -1 == i ? "" : i
                          );
                    else
                      for (c = 0, d = l.items.length; c < d; c++)
                        o.getViewer().dynamicTree._bfCreatTreeNode(
                          o,
                          l[c],
                          r,
                          !0,
                          "default",
                          -1,
                          a,
                          c,
                          -1 == i ? 1 : 2,
                          -1 == i ? "" : i
                        );
                    if (-1 == i) {
                      const n = o
                        .getViewer()
                        .dynamicTree._bfComponentsTreeConfigs.slice(
                          0,
                          o.getViewer().dynamicTree._bfMaxLoadedNodesNum
                        );
                      o.getViewer().dynamicTree._bfLoadVirtualNodes(
                        o,
                        e,
                        t,
                        n,
                        !1,
                        -1
                      );
                    } else {
                      const n = `^${i}-\\d+$`,
                        a = o
                          .getViewer()
                          .dynamicTree._bfComponentsTreeConfigs.filter(
                            (e) => 0 == e.path.search(new RegExp(n))
                          );
                      o.getViewer().dynamicTree._bfLoadVirtualNodes(
                        o,
                        e,
                        t,
                        a.slice(
                          0,
                          o.getViewer().dynamicTree._bfMaxLoadedNodesNum
                        ),
                        !1,
                        -1
                      );
                    }
                  }
                })(n, e, t, a, o, i);
        };
        if (1 === n.length) s(n[0], o);
        else if (n.length > 1)
          for (var r = 0; r < n.length; r++) {
            var c = n[r].meta,
              d = S({ type: "modelId", id: c.modelId, name: c.name });
            (d.path = `${r}`),
              o.addChildNode(d),
              s(n[r], d, r),
              i.getViewer().dynamicTree._bfRenderedNodes.push(d);
          }
        return (
          l.addEventListener("CheckedChanged", k(e)),
          l.addEventListener("IconChanged", E(e)),
          l
        );
      }
    },
    k = function (e) {
      return function (t, n) {
        var a;
        if ("group" === n.filter || ("model" === n.filter && !n.id)) {
          let { datas: e } = n.getConfig();
          a = U(e, []);
        } else a = P(n, e);
        var i = n.modelId,
          o = n.getCheckedState(),
          l = n.id;
        "unchecked" == o
          ? "all" == l
            ? e.getModels().forEach((e) => {
                e.hideAllComponents(!1);
              })
            : e.getModel(n.id) &&
              "oap-osgb2bimtiles" === e.getModel(n.id)._data.workerType
            ? e.getModel(n.id).setVisible(!1)
            : n.filter
            ? "modelId" === n.filter
              ? e.getModel(i || l).hideAllComponents(!1)
              : e.getModel(i).hideComponentsByObjectData(a, !1)
            : e.getModel(i).hideComponentsById(a, !1)
          : "checked" == o &&
            ("all" == l
              ? e.getModels().forEach((e) => {
                  e.showAllComponents(null, null, !1);
                })
              : e.getModel(n.id) &&
                "oap-osgb2bimtiles" === e.getModel(n.id)._data.workerType
              ? e.getModel(n.id).setVisible(!0)
              : n.filter
              ? "modelId" === n.filter
                ? e.getModel(i || l).showAllComponents(null, null, !1)
                : e.getModel(i).showComponentsByObjectData(a, !1)
              : e.getModel(i).showComponentsById(a, !1)),
          x(e, n, o),
          !e.multipleClickCalled && e.render();
      };
    },
    x = function (e, t, n) {
      const a = t.path,
        i = "checked" == n;
      if (
        ("all" == t.id &&
          e.dynamicTree._bfComponentsTreeConfigs.forEach((e) => {
            (e.checkedState = i),
              (e.config.isChecked = i),
              delete e.isHalfChecked;
          }),
        !a)
      )
        return;
      const o = a.split("-");
      for (let t = o.length - 1; t >= 0; t--) {
        const a = o.slice(0, t).join("-"),
          l = e.dynamicTree._bfRenderedNodes.find((e) => e.path === a);
        if (l) {
          const t = e.dynamicTree._bfRenderedNodes
            .filter((e) => e.path.startsWith(`${a}-`))
            .every((e) => e.getCheckedState() === n);
          t ? l.setCheckedState("checked" == n) : l.setCheckedState(!0, !0);
        }
        const s = e.dynamicTree._bfComponentsTreeConfigs.find(
          (e) => e.path === a
        );
        if (s) {
          e.dynamicTree._bfComponentsTreeConfigs
            .filter((e) => e.path.startsWith(`${a}-`))
            .every((e) => e.checkedState === i)
            ? ((s.checkedState = i),
              (s.config.isChecked = i),
              delete s.isHalfChecked)
            : ((s.checkedState = !0),
              (s.config.isChecked = !0),
              (s.isHalfChecked = !0));
        }
      }
      e.dynamicTree._bfRenderedNodes[0]._parent.setParentCheckedState(),
        e.dynamicTree._bfRenderedNodes[0]._parent._parent &&
          e.dynamicTree._bfRenderedNodes[0]._parent._parent.setParentCheckedState();
    },
    E = function (e) {
      return function (t, n) {
        var a;
        if ("group" === t.filter || ("model" === t.filter && !t.id)) {
          let { datas: e } = t.getConfig();
          a = U(e, []);
        } else a = P(t, e);
        var i = t.modelId,
          o = t.id;
        "change" == n
          ? "all" == o
            ? e.getModels().forEach((e) => {
                e.transparentAllComponents();
              })
            : t.filter
            ? "modelId" === t.filter
              ? e.getModel(i || o).transparentAllComponents()
              : e.getModel(i).transparentComponentsByObjectData(a, !1)
            : e.getModel(i).transparentComponentsById(a, !1)
          : "all" == o
          ? e.getModels().forEach((e) => {
              e.opaqueAllComponents(!1);
            })
          : t.filter
          ? "modelId" === t.filter
            ? e.getModel(i || o).opaqueAllComponents(!1)
            : e.getModel(i).opaqueComponentsByObjectData(a, !1)
          : e.getModel(i).opaqueComponentsById(a, !1),
          N(e, t, n),
          e.render();
      };
    },
    N = function (e, t, n) {
      const a = t.path,
        i = "default" == n;
      if (
        ("all" == t.id &&
          e.dynamicTree._bfComponentsTreeConfigs.forEach((e) => {
            (e.isolatedState = n), (e.config.icon.type = n);
          }),
        !a)
      )
        return;
      const o = a.split("-");
      for (let t = o.length - 1; t >= 0; t--) {
        const a = o.slice(0, t).join("-"),
          l = e.dynamicTree._bfRenderedNodes.find((e) => e.path === a);
        if (l) {
          const t = e.dynamicTree._bfRenderedNodes
            .filter((e) => e.path.startsWith(`${a}-`))
            .every((e) => e._iconState === i);
          t ? l.setIconState(n) : !l._iconState && l.setIconState("default");
        }
        const s = e.dynamicTree._bfComponentsTreeConfigs.find(
          (e) => e.path === a
        );
        if (s) {
          e.dynamicTree._bfComponentsTreeConfigs
            .filter((e) => e.path.startsWith(`${a}-`))
            .every((e) => ("default" == e.isolatedState) === i)
            ? ((s.isolatedState = n), (s.config.icon.type = n))
            : ((s.isolatedState = "default"), (s.config.icon.type = "default"));
        }
      }
      e.dynamicTree._bfRenderedNodes[0]._parent.setParentIconState(),
        e.dynamicTree._bfRenderedNodes[0]._parent._parent &&
          e.dynamicTree._bfRenderedNodes[0]._parent._parent.setParentIconState();
    },
    P = function (e, t) {
      var n = function (e) {
        if (e._parent) {
          var i = e._parent;
          "model" === i.filter
            ? i.fileId && (a.fileId = i.fileId)
            : "root" != i.filter &&
              ("type" === i.filter
                ? i._datas && i._datas.id && (a.typeId = i._datas.id)
                : i.id && (a[i.filter] = i.id),
              n(i));
        }
        if (e.path && e.path.indexOf("-") > 0) {
          let n = e.path.split("-");
          for (let e = n.length - 1; e > -1; e--) {
            let i = n.slice(0, e + 1).join("-"),
              o = t.dynamicTree._bfComponentsTreeConfigs.find(
                (e) => e.path === i
              );
            o &&
              ("model" === o.filter || "modelId" == o.filter
                ? o.fileId && (a.fileId = o.fileId)
                : "root" != o.filter &&
                  ("type" === o.filter
                    ? o._datas && o._datas.id && (a.typeId = o._datas.id)
                    : "number" != typeof o.filter &&
                      o.id &&
                      (a[o.filter] = o.id)));
          }
        }
      };
      if (e.filter) {
        var a = {};
        "type" === e.filter
          ? (a.typeId = e._datas.id)
          : e.id && (a[e.filter] = e.id),
          n(e);
      } else if (e.id) {
        var i = e._parent.fileId;
        a = i ? `${i}.${e.id}` : e.id;
      }
      return [a];
    },
    U = function (e, t) {
      if ("group" === e.type)
        for (let n = 0; n < e.items.length; n++) U(e.items[n], t);
      else if ("model" === e.type) t.push({ fileId: e.fileIds });
      else {
        let n, a;
        switch (e.type) {
          case "floor":
            n = "levelName";
            break;
          case "category":
            n = "categoryId";
            break;
          default:
            n = e.type;
        }
        (a =
          "categoryId" == e.type || "root" == e.type || "model" == e.type
            ? e.id
            : e.elementIds || e.type
            ? e.fileId
              ? e.fileId
              : ("specialty" == e.type && "" == e.name) ||
                e.name == BimfaceLanguage.bf_panel_modelTree_specialtyUndefined
              ? ""
              : e.actualName
            : e),
          t.push({ [n]: a });
      }
      return t;
    };
  const A = (e, t) => {
      let n,
        a,
        i = "";
      for (let o = 0; o < e.length - 1; o++) {
        if (0 == o) (i = e[o]), (n = t.dynamicTree._bfComponentTreeData[e[o]]);
        else {
          i += `-${e[o]}`;
          let t = 0;
          n.items.map((e) => {
            e.elementIds && (t += e.elementIds.length - 1);
          }),
            (n =
              n &&
              n.items &&
              (n.items[e[o]] ||
                (n.items[0].elementIds &&
                  n.items[0].elementIds.length > 0 &&
                  (n.items[e[o] - n.items[0].elementIds.length + 1] ||
                    n.items[e[o] - t]))));
        }
        (a = t.dynamicTree._bfComponentsTreeConfigs.find((e) => e.path == i)),
          a && (a.config.isExpand = !0);
        !t.dynamicTree._bfComponentsTreeConfigs.find(
          (e) => 0 == e.path.indexOf(`${i}-`)
        ) &&
          a &&
          n &&
          t.dynamicTree._bfAddComponentTreeData(
            n,
            t.dynamicTree,
            a.modelId,
            a.checkedState,
            a.isolateState,
            t,
            a.treeCategory,
            o + 1,
            a.path
          );
      }
    },
    D = (e, t, n = !0) => {
      let a;
      t.dynamicTree._bfComponentsTreeConfigs.map((t) => {
        t.path.split("-")[0] == e.split("-")[0] && (t.show = !0);
      }),
        (a = t.dynamicTree._bfComponentsTreeConfigs.filter((e) => 1 == e.show));
      let i = a.findIndex((t) => t.path == e);
      const o =
        t.dynamicTree._bfRenderedNodes[
          t.dynamicTree._bfRenderedNodes.length - 1
        ]._parent;
      let l;
      -1 == i &&
        ((a = t.dynamicTree._bfComponentsTreeConfigs),
        (i = t.dynamicTree._bfComponentsTreeConfigs.findIndex(
          (t) => t.path == e
        ))),
        (l =
          i <= t.dynamicTree._bfMaxLoadedNodesNum / 2
            ? a.slice(0, t.dynamicTree._bfMaxLoadedNodesNum)
            : a.length - i > t.dynamicTree._bfMaxLoadedNodesNum / 2
            ? a.slice(
                i - t.dynamicTree._bfMaxLoadedNodesNum / 2,
                i + t.dynamicTree._bfMaxLoadedNodesNum / 2
              )
            : a.slice(-t.dynamicTree._bfMaxLoadedNodesNum)),
        t.dynamicTree._bfLoadVirtualNodes(t.dynamicTree, o, t, l, !1, -1, !0);
      const s = t._opt.domElement;
      requestAnimationFrame(() => {
        const a = t.dynamicTree._bfRenderedNodes.findIndex((t) => t.path == e),
          i = t.dynamicTree._bfRenderedNodes[a];
        if (!i) return;
        i.select(), i.eventManager.fireEvent("SelectionChanged", i, !0, n);
        const o = i.element.getBoundingClientRect().y,
          l =
            i.element.parentElement.parentElement.parentElement.getBoundingClientRect()
              .y;
        (o - l < 0 ||
          o - l >
            15 * t.dynamicTree._bfRenderedNodes[0].element.clientHeight) &&
          (i.element.scrollIntoView(),
          requestAnimationFrame(() => {
            t.dynamicTree._bfRenderedNodes.length - a - 1 > 15 &&
              s
                .getElementsByClassName("bf-panel-container bf-scroll-bar")[0]
                .scrollBy({
                  top:
                    2 * -t.dynamicTree._bfRenderedNodes[0].element.clientHeight,
                });
          }));
      });
    };
  let V = [],
    z = null,
    H = null;
  const W = function (e, n, a) {
      V = [];
      let i = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        o = [],
        l = [],
        s = [],
        r = [],
        c = [],
        d = [],
        f = [],
        m = [],
        p = [],
        u = [],
        g = [];
      const h = i.create("div", "bf-panel-searchbar");
      h.setAttribute("id", "searchContainer");
      const b = i.create("div", "bf-button panel-search-btn gld-bf-search"),
        v = i.create("input", "bf-panel-search-input");
      v.setAttribute("placeholder", BimfaceLanguage.bf_panel_search_textInput),
        v.setAttribute("autocomplete", "off"),
        h.appendChild(b),
        h.appendChild(v);
      const y = i.create("div", "bf-panel-search-result");
      setTimeout(function () {
        let t,
          n,
          i = e._opt.domElement;
        e.isMobileNew
          ? ((t = i.getElementsByClassName("bf-panel bf-modelTree-panel")[0]),
            (n = i.getElementsByClassName(
              "bf-panel-container bf-scroll-bar"
            )[0]))
          : ((t =
              a.getPanel("ModelTree").container.parentElement.parentElement),
            (n = a.getPanel("ModelTree").container)),
          t &&
            0 === t.getElementsByClassName("bf-panel-searchbar").length &&
            (t.getElementsByClassName("bf-panel-header")[0].append(h),
            t.getElementsByClassName("bf-panel-header")[0].append(y),
            (n.style.height = "326px"),
            i.getElementsByClassName("bf-resize")[0] &&
              i
                .getElementsByClassName("bf-resize")[0]
                .addEventListener("mousedown", function (e) {
                  i.addEventListener(
                    "mouseup",
                    (e) => {
                      const t =
                        i.getElementsByClassName("bf-panel-body")[0]
                          .offsetHeight - 61;
                      ("block" !== n.childNodes[0].style.display &&
                        "" !== n.childNodes[0].style.display) ||
                        "componentPanel" !== n.childNodes[0].id ||
                        (n.style.height = t + "px");
                    },
                    { once: !0 }
                  );
                }));
      }, 0);
      const C = () => {
          if (
            V.length === e.getModelCount() &&
            "[object Function]" === Object.prototype.toString.call(n)
          ) {
            [...B.keys()].sort().forEach((e) => {
              V[e] = B.get(e);
            });
            const t = I(e, V, H, a);
            (z = t),
              n(t),
              e.addEventListener("SelectionChangedInModel", F),
              e.addEventListener("HideOtherComponents", G),
              e.addEventListener("HideOtherModels", ee),
              e.addEventListener("TranslucentOtherComponents", Q),
              e.addEventListener("TranslucentOtherModels", te),
              e.addEventListener("ClearModelIsolation", J),
              e.addEventListener("ClearModelSelection", K),
              e.addEventListener("OpaqueModelComponents", ae),
              e.addEventListener("TranslucentModelComponents", ie),
              e.addEventListener("OpaqueComponents", Y),
              e.addEventListener("TranslucentComponents", X),
              e.addEventListener("ShowComponents", j),
              e.addEventListener("HideComponents", q),
              e.addEventListener("ShowModelComponents", se),
              e.addEventListener("HideModelComponents", le),
              (() => {
                const t = e._opt.domElement;
                let n = null,
                  a = t.getElementsByClassName("bf-panel-search-input")[0];
                const h = setInterval(() => {
                  a
                    ? (clearInterval(h),
                      a.addEventListener("input", function (t) {
                        let a = [],
                          h = [],
                          b = [],
                          v = [];
                        const C = t.target.value;
                        if (
                          ("" == C ||
                            isNaN(C) ||
                            l.map((e, t) => {
                              e === C &&
                                (a.push(o[t] + "[" + e + "]"),
                                a.push(s[t]),
                                a.push(r[t]),
                                h.push(c[t]));
                            }),
                          d.map((e, t) => {
                            e.indexOf(C) > -1 &&
                              (a.push(e),
                              a.push(f[t]),
                              a.push(m[t]),
                              h.push(p[t]),
                              b.push(u[t]),
                              v.push(g[t]));
                          }),
                          o.map((e, t) => {
                            e.indexOf(C) > -1 &&
                              (a.push(
                                e.indexOf("[" + l[t] + "]") > -1
                                  ? e
                                  : e + " [" + l[t] + "]"
                              ),
                              a.push(s[t]),
                              a.push(r[t]),
                              h.push(c[t]));
                          }),
                          n && y.removeEventListener("scroll", n),
                          C)
                        )
                          if (
                            ((y.style.display = "block"),
                            (y.textContent = ""),
                            0 === a.length)
                          ) {
                            const e = i.create("div", "no-search-result");
                            (e.innerText =
                              BimfaceLanguage.bf_panel_search_noresult),
                              y.append(e);
                          } else {
                            const o = (e) => {
                                if (e.length > 99) {
                                  let t = 0,
                                    a = 99,
                                    i = !0;
                                  (n = () => {
                                    i &&
                                      t !== a &&
                                      ((i = !1),
                                      setTimeout(() => {
                                        (t = a),
                                          (a =
                                            e.length - a - 99 > 0
                                              ? a + 99
                                              : e.length),
                                          l(e, t, a),
                                          (i = !0);
                                      }, 100));
                                  }),
                                    l(e, t, a),
                                    a < e.length &&
                                      y.addEventListener("scroll", n, !1);
                                } else l(e, 0, e.length);
                              },
                              l = (n, a, o) => {
                                const l = e._opt.domElement,
                                  s = l.getElementsByClassName(
                                    "bf-panel-search-result"
                                  )[0];
                                for (let r = a; r < o; r += 3) {
                                  const a = i.create(
                                      "div",
                                      "result-option-item"
                                    ),
                                    o = i.create("div", "result-option-leaf");
                                  o.innerText = n[r];
                                  const c = i.create(
                                    "div",
                                    "result-option-parent"
                                  );
                                  (c.innerText = n[r + 1]),
                                    a.append(o),
                                    a.append(c),
                                    (a.onclick = function () {
                                      e.getModels().forEach((e) => {
                                        e.clearSelectedComponents();
                                      });
                                      const a = e.getModel(n[r + 2]);
                                      let i;
                                      if (
                                        (l.getElementsByClassName(
                                          "bf-tree-name bf-selected"
                                        )[0] &&
                                          l
                                            .getElementsByClassName(
                                              "bf-tree-name bf-selected"
                                            )[0]
                                            .classList.remove("bf-selected"),
                                        0 != b.length && b.length > r / 3)
                                      ) {
                                        let t = [],
                                          n = b[r / 3];
                                        "" !== h[r / 3] &&
                                          ((n.fileId = [h[r / 3]]),
                                          delete n.model,
                                          delete n.group),
                                          e
                                            .getViewer()
                                            .getFilter()
                                            .getMatchIds([n])
                                            .map((e) => {
                                              let n =
                                                e.split(".").length > 1
                                                  ? e
                                                  : "" !== h[r / 3]
                                                  ? `${h[r / 3]}.${e}`
                                                  : e;
                                              t.push(n);
                                            }),
                                          (i = t),
                                          a.addSelectedComponentsById([...i]);
                                        let o = v[r / 3]
                                          .toString()
                                          .trim()
                                          .split(" ");
                                        A(o, e);
                                        const l = o.join("-");
                                        let s;
                                        D(l, e),
                                          e.getModelTree((t) => {
                                            if (
                                              ((s = t[Number(o[0])]),
                                              o.length > 1)
                                            )
                                              for (
                                                let e = 1;
                                                e < o.length;
                                                e++
                                              ) {
                                                const t = s;
                                                (s = s.items[Number(o[e])]),
                                                  s.fileId ||
                                                    (!t.fileId &&
                                                      !t.fileIdFromParent) ||
                                                    (s.fileIdFromParent =
                                                      t.fileId ||
                                                      t.fileIdFromParent);
                                              }
                                            setTimeout(() => {
                                              s &&
                                                ((s.isSelected = !0),
                                                e
                                                  .getEventManager()
                                                  .fireEvent(
                                                    "ModelTreeNodeClicked",
                                                    s
                                                  ));
                                            }, 300);
                                          });
                                      } else {
                                        const e = n[r].split("[");
                                        (i =
                                          "" !== h[r / 3]
                                            ? `${h[r / 3]}.${e[1].slice(0, -1)}`
                                            : e[1].slice(0, -1)),
                                          a.addSelectedComponentsById([i]);
                                      }
                                      let o = l.getElementsByClassName(
                                        "bf-tree-name bf-selected"
                                      );
                                      o.length > 1 &&
                                        (n && n.length > 0
                                          ? n.indexOf(o[0].innerHTML) > -1
                                            ? o[1].removeClass("bf-selected")
                                            : o[0].removeClass("bf-selected")
                                          : o[1].removeClass("bf-selected")),
                                        a.zoomToSelectedComponents(1),
                                        (s.style.display = "none"),
                                        (t.target.value = ""),
                                        e.render();
                                    }),
                                    s.append(a);
                                }
                              };
                            o(a);
                          }
                        else y.style.display = "none";
                      }))
                    : (a = t.getElementsByClassName(
                        "bf-panel-search-input"
                      )[0]);
                }, 50);
              })();
            const h = {};
            e.getModels().forEach((e) => {
              h[e.modelId] = e.getSelectedComponents();
            });
          }
        },
        w = (e, t) => {
          const n = t.trim().split(" ").length,
            a = Number(t.replaceAll(" ", ""));
          return Number(
            e.split(" ").slice(0, n).toString().replaceAll(",", "")
          ) -
            a >
            0
            ? n + ":" + e.split(" ")[n - 1]
            : 0;
        };
      let B = new Map();
      e.getModels().forEach((t, n) => {
        const a = t.getMetaData();
        a.modelId !== t.modelId && (a.modelId = t.modelId);
        t._manifest.Features.HasComponentStructure
          ? t.getModelTree((i, h, b) => {
              (H = i.type), (i = i.data || i);
              const v = /^L\d+$/,
                y = (e, n, a, i, h, b) => {
                  if (
                    (e.elementCount && e.elementCount > 0) ||
                    (e.items && e.items.length > 0)
                  ) {
                    (n = "" === n ? e.name : n + " > " + e.name),
                      ("family" === e.type ||
                        v.test(e.type) ||
                        "structTree" == H) &&
                        (a = e.name);
                    let o,
                      l = e.name;
                    d.push(l),
                      f.push(n),
                      m.push(t.modelId),
                      p.push(e.fileId || b || ""),
                      (o =
                        "floor" == e.type
                          ? "levelName"
                          : "category" == e.type
                          ? "categoryId"
                          : e.type);
                    let s = JSON.parse(JSON.stringify(h));
                    (s[o] =
                      o.indexOf("Id") > 0 || v.test(o) || "structTree" == H
                        ? e.id
                        : e.name),
                      u.push(s),
                      (i = ((e, t, n) => {
                        if (
                          e.length > 0 &&
                          e[e.length - 1].length < t.length &&
                          "0" != t.substr(-1)
                        ) {
                          const e = V.find((e) => e.meta.modelId == n);
                          let a = 0;
                          const i = t.split(" ");
                          let o = e.data[i[0]];
                          for (let e = 1; e < i.length; e++)
                            if (e != i.length - 1) o = o.items[Number(i[e])];
                            else
                              for (let t = 0; t < i[e]; t++)
                                a += o.items[t].elementIds.length;
                          return (
                            (i[i.length - 1] = a + ""),
                            i.toString().replaceAll(",", " ")
                          );
                        }
                        if (
                          e.length > 0 &&
                          e[e.length - 1].length > t.length &&
                          e[e.length - 1][0] == t[0] &&
                          w(e[e.length - 1], t)
                        ) {
                          const n = w(e[e.length - 1], t).split(":"),
                            a = t.split(" ");
                          return (
                            (a[Number(n[0]) - 1] = Number(n[1]) + 1),
                            a.toString().replaceAll(",", " ")
                          );
                        }
                        return t;
                      })(g, i, t.modelId)),
                      g.push(i),
                      e.items.map((t, o) => {
                        y(t, n, a, i.trim() + " " + o, s, e.fileId || b);
                      });
                  } else if (e.elementIds)
                    e.elementIds.map((i) => {
                      o.push(a),
                        l.push(i),
                        s.push(n),
                        r.push(t.modelId),
                        c.push(e.fileId || "");
                    });
                  else {
                    let a = e.name;
                    d.push(a),
                      f.push(n),
                      m.push(t.modelId),
                      p.push(e.fileId || b || "");
                    let o = e.type,
                      l = JSON.parse(JSON.stringify(h));
                    (l[o] =
                      o.indexOf("Id") > 0 || v.test(o) || "structTree" == H
                        ? e.id
                        : e.name),
                      u.push(l),
                      g.push(i);
                  }
                };
              V.push({ data: i, modelType: h, treeType: b, meta: a }),
                B.set(n, { data: i, modelType: h, treeType: b, meta: a }),
                i.map((t, a) => {
                  e.getModels().length > 1
                    ? y(t, "", "", n + " " + a, {}, "")
                    : y(t, "", "", a + " ", {}, "");
                }),
                C();
            }, !1)
          : (V.push({ meta: a }), B.set(n, { meta: a }), C());
      });
    },
    O = (e, t, n, a = [], i, o) => {
      let l;
      const s = (e, n, a, r) => {
        let c = 0,
          d = !1;
        if (e.items) {
          let f = !1;
          i.getModel(o) &&
            i.getModel(o)._data &&
            i.getModel(o)._data.config &&
            "true" == i.getModel(o)._data.config["integrate-with-links"] &&
            i.getModel(o)._data.enableComponentCut &&
            (f = !0),
            e.items.some((i, o) => {
              if (
                (e.fileIds && !i.fileIds && (i.fileIds = e.fileIds),
                (d = !1),
                r &&
                  i.fileId &&
                  r.toString() !== i.fileId.toString() &&
                  (!i.fileIds || i.fileIds.indexOf(r) < 0))
              )
                return !1;
              if (i.elementIds) {
                if (!f && r && i.fileId && i.fileId && i.fileId != r) return !1;
                let a = i.elementIds
                  .map((e) => e.toString())
                  .indexOf(t.toString());
                if (a >= 0) {
                  let t = [];
                  for (let n = 0; n < o; n++)
                    (a += e.items[n].elementIds.length),
                      (t = [...t, ...e.items[n].elementIds]);
                  if (
                    (o > 0 && (t = [...t, ...e.items[o].elementIds]),
                    !r || !i.fileId || (r && i.fileId && i.fileId == r))
                  )
                    return (l = [...n, a]), !0;
                }
                (c += i.elementIds.length - 1), (d = !0);
              }
              const m = d ? o : o + c;
              let p = [...n, m];
              if (i.items && i.items.length > 0) s(i, p, [...a, e], r);
              else if (i.id && i.id.toString() === t.toString()) {
                if (!r || !i.fileId) return (l = p), !0;
                if (r == i.fileId) return (l = p), !0;
              }
            });
        } else e.id == t && (l = [...n]);
      };
      return (
        Array.isArray(e) || (e = [e]),
        e.some(
          (t, i) =>
            !(n && t.fileIds && !t.fileIds.includes(n)) &&
            (t.fileIds || "floor" !== t.type || 1 !== e.length
              ? s(t, [...a, i], [], n)
              : s(t, [...a], [], n),
            !!l || void 0)
        ),
        l
      );
    };
  var F = (e, t, n) => {
    if (
      (t &&
        t.getElementsByClassName("bf-tabs-option undefined active").length >
          0 &&
        "component" ==
          t.getElementsByClassName("bf-tabs-option undefined active")[0].id &&
        t.getElementsByClassName("bf-tree-name bf-selected")[0] &&
        t
          .getElementsByClassName("bf-tree-name bf-selected")[0]
          .classList.remove("bf-selected"),
      !z)
    )
      return;
    const a = () => {
      z._selectionNode && z._selectionNode.deselect();
    };
    let i = null,
      o = 0;
    for (var l in e)
      if (e[l] && e[l].length > 0) {
        if (((o += e[l].length), o > 1)) return void a();
        i = { componentId: e[l][0], modelId: l };
      }
    if (!i) return void a();
    const { componentId: s, modelId: r } = i;
    let c,
      d = s;
    s.includes(".") && ([c, d] = s.split("."));
    const f = n.dynamicTree._bfComponentsTreeConfigs.filter(
      (e) => 1 == e.level
    );
    let m,
      p,
      u = [];
    if (
      (V.length > 1
        ? f.some((e, t) => {
            if (e.modelId && e.modelId.toString() === r.toString())
              return (m = e), u.push(t), (p = V[t] && V[t].data), !0;
          })
        : ((m = z._root), (p = V[0] && V[0].data)),
      !m || !p)
    )
      return void a();
    let g = O(p, d, c, u, n, r);
    if (!g) return void a();
    A(g, n);
    const h = g.join("-");
    D(h, n, !1);
  };
  const R = (e, t, n) => {
      t.dynamicTree._bfComponentsTreeConfigs.filter((e) => 1 == e.level);
      const a = e[0];
      let i,
        o = a;
      return a
        ? (a.includes(".") && ([i, o] = a.split(".")),
          O(t.dynamicTree._bfComponentTreeData, o, i, [], t, n))
        : [];
    },
    $ = (e, t) => {
      const { selectionList: n, viewer: a, modelId: i } = e;
      if (!z) return;
      const o = [];
      n.forEach((e) => {
        let n = R([e], a, i);
        if (!n) return;
        const l = n.join("-"),
          s = a.dynamicTree._bfComponentsTreeConfigs.find((e) => e.path == l);
        s &&
          ((s.checkedState = t),
          (s.config.isChecked = t),
          delete s.isHalfChecked);
        const r = a.dynamicTree._bfRenderedNodes.find((e) => e.path == l);
        if ((r && r.setCheckedState(t), !(n.length < 2)))
          for (let e = n.length - 2; e > -1; e--) {
            const i = n.slice(0, e + 1).join("-"),
              l = a.dynamicTree._bfComponentsTreeConfigs.find(
                (e) => e.path == i
              ),
              s = a.dynamicTree._bfComponentsTreeConfigs.find(
                (e) => 0 == e.path.indexOf(`${i}-`) && e.checkedState != t
              );
            l &&
              (s
                ? ((l.checkedState = !0),
                  (l.config.isChecked = !0),
                  (l.isHalfChecked = !0))
                : ((l.checkedState = t),
                  (l.config.isChecked = t),
                  delete l.isHalfChecked));
            const r = a.dynamicTree._bfRenderedNodes.find((e) => e.path == i);
            r && -1 == o.findIndex((e) => e.path == i) && o.push(r);
          }
      }),
        o.forEach((e) => {
          const n = a.dynamicTree._bfRenderedNodes.filter(
            (t) => 0 == t.path.indexOf(`${e.path}-`)
          );
          if (n && n.length > 0) {
            const a = n.find(
              (e) => e._checkedState != (t ? "checked" : "unchecked")
            );
            a && e.setCheckedState(!0, !0), !a && e.setCheckedState(t);
          } else e.setCheckedState(t);
        }),
        a.dynamicTree._bfRenderedNodes[0]._parent.setParentCheckedState(),
        a.dynamicTree._bfRenderedNodes[0]._parent._parent &&
          a.dynamicTree._bfRenderedNodes[0]._parent._parent.setParentCheckedState();
    },
    q = (e) => {
      $(e, !1);
    },
    j = (e) => {
      $(e, !0);
    },
    G = (e) => {
      const { selectionList: t, viewer: n, modelId: a } = e;
      if (z)
        if (t[0]) {
          let e = [];
          t.map((t) => {
            let i = R([t], n, a);
            i && e.push(i.join("-"));
          }),
            n.dynamicTree._bfComponentsTreeConfigs.map((t) => {
              e.find((e) => e == t.path) ||
                ((t.checkedState = !1),
                (t.config.isChecked = !1),
                delete t.isHalfChecked);
            }),
            n.dynamicTree._bfRenderedNodes.map((t) => {
              e.find((e) => e == t.path) ||
                (t.setCheckedState(!1),
                t._parent.setParentCheckedState(),
                t._parent._parent &&
                  n.dynamicTree._bfRenderedNodes[0]._parent._parent.setParentCheckedState());
            });
        } else
          n.dynamicTree._bfComponentsTreeConfigs.map((e) => {
            e.model == a &&
              ((e.checkedState = !1),
              (e.config.isChecked = !1),
              delete e.isHalfChecked);
          }),
            n.dynamicTree._bfRenderedNodes.map((e) => {
              e.modelId == a &&
                (e.setCheckedState(!1),
                e._parent.setParentCheckedState(),
                e._parent._parent &&
                  n.dynamicTree._bfRenderedNodes[0]._parent._parent.setParentCheckedState());
            });
    },
    Z = (e, t) => {
      const { selectionList: n, viewer: a, modelId: i } = e;
      z &&
        n.forEach((e) => {
          let n = R([e], a, i);
          if (!n) return;
          const o = n.join("-"),
            l = a.dynamicTree._bfComponentsTreeConfigs.find((e) => e.path == o);
          l && ((l.isolatedState = t), (l.config.icon.type = t));
          const s = a.dynamicTree._bfRenderedNodes.find((e) => e.path == o);
          s && s.setIconState(t);
        });
    },
    X = (e) => {
      Z(e, "change");
    },
    Y = (e) => {
      Z(e, "default");
    },
    Q = (e) => {
      const { selectionList: t, viewer: n, modelId: a } = e;
      if (z)
        if (t[0]) {
          let e = [];
          t.map((t) => {
            let i = R([t], n, a);
            i && e.push(i.join("-"));
          }),
            n.dynamicTree._bfComponentsTreeConfigs.map((t) => {
              e.find((e) => e == t.path) ||
                ((t.isolatedState = "change"), (t.config.icon.type = "change"));
            }),
            n.dynamicTree._bfRenderedNodes.map((t) => {
              e.find((e) => e == t.path) || t.setIconState("change");
            });
        } else
          n.dynamicTree._bfComponentsTreeConfigs.map((e) => {
            e.model == a &&
              ((e.isolatedState = "change"), (e.config.icon.type = "change"));
          }),
            n.dynamicTree._bfRenderedNodes.map((e) => {
              e.modelId == a && e.setIconState("change");
            });
    },
    J = (e) => {
      const { modelId: t, viewer: n } = e;
      n.dynamicTree._bfComponentsTreeConfigs.map((e) => {
        t == e.modelId &&
          ((e.isolatedState = "default"), (e.config.icon.type = "default"));
      }),
        n.dynamicTree._bfRenderedNodes.map((e) => {
          t == e.modelId && e.setIconState("default");
        });
    },
    K = (e) => {
      const { modelId: t, viewer: n } = e;
      n.dynamicTree._bfRenderedNodes.map((e) => {
        t == e.modelId && e.deselect();
      });
    },
    ee = (e) => {
      const { modelIds: t, viewer: n } = e;
      n.dynamicTree._bfComponentsTreeConfigs.map((e) => {
        -1 == t.indexOf(e.modelId) &&
          ((e.checkedState = !0),
          (e.config.isChecked = !0),
          delete e.isHalfChecked);
      }),
        n.dynamicTree._bfRenderedNodes.map((e) => {
          -1 == t.indexOf(e.modelId) && e.setCheckedState(!0);
        });
    },
    te = (e) => {
      const { modelIds: t, viewer: n } = e;
      n.dynamicTree._bfComponentsTreeConfigs.map((e) => {
        -1 == t.indexOf(e.modelId) &&
          ((e.isolatedState = "default"), (e.config.icon.type = "default"));
      }),
        n.dynamicTree._bfRenderedNodes.map((e) => {
          -1 == t.indexOf(e.modelId) && e.setIconState("default");
        });
    },
    ne = (e, t) => {
      const { modelId: n, viewer: a } = e;
      a.dynamicTree._bfComponentsTreeConfigs.map((e) => {
        n == e.modelId && ((e.isolatedState = t), (e.config.icon.type = t));
      }),
        a.dynamicTree._bfRenderedNodes.map((e) => {
          n == e.modelId && e.setIconState(t);
        });
    },
    ae = (e) => {
      ne(e, "default");
    },
    ie = (e) => {
      ne(e, "change");
    },
    oe = (e, t) => {
      const { modelId: n, viewer: a } = e;
      a.dynamicTree._bfComponentsTreeConfigs.map((e) => {
        n == e.modelId &&
          ((e.checkedState = t),
          (e.config.isChecked = t),
          delete e.isHalfChecked);
      }),
        a.dynamicTree._bfRenderedNodes.map((e) => {
          (n != e.modelId && n != e.id) || e.setCheckedState(t);
        }),
        a.dynamicTree._bfRenderedNodes[0]._parent.setParentCheckedState(),
        a.dynamicTree._bfRenderedNodes[0]._parent._parent &&
          a.dynamicTree._bfRenderedNodes[0]._parent._parent.setParentCheckedState();
    },
    le = (e) => {
      oe(e, !1);
    },
    se = (e) => {
      oe(e, !0);
    };
  var re = function (e, t, n, a) {
      const i = a.modelId ? e.getModel(a.modelId) : e.getDefaultModel();
      i &&
        ("area" == n
          ? i.getAreaProperty(a.id, function (e) {
              e && e.properties ? t.setData(e.properties) : t.setData({});
            })
          : i.getRoomProperty(a.id, function (e) {
              e && e.properties ? t.setData(e.properties) : t.setData({});
            }));
    },
    ce = "暂无对应空间";
  t.Web.Lang.Utility.Namespace.ensureNamespace(
    t,
    "Bimface.Application.UI.Panel"
  ).AreaPanel = function (e) {
    let n = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
    e.getViewer(), t.Bimface.Viewer.Viewer3DEvent;
    var a = new t.Bimface.UI.Panel.PanelConfig();
    (a.title = BimfaceLanguage.bf_tip_props_rooms),
      (a.className = "bf-panel area-panel"),
      (a.id = "AreaPropertyPanel"),
      (a.css = n
        ? { right: "10px", top: "10px", width: "300px", height: "416px" }
        : { left: "0", top: "0", width: "100%", height: "100%" });
    var i = new t.Bimface.UI.Panel.Panel(a);
    return (
      (i.body.style.height = "calc(100% - 41px)"),
      i.setTips(ce),
      (e.areaPanel = i),
      i
    );
  };
  var de = function (e, n, a, i) {
      var o = t.Web.Lang.Utility.ClientHelper.getIsDesktop(),
        l = e.getViewer();
      let s = new THREE.Vector3(),
        r = new THREE.Vector3();
      (e._objectTypes[n.id] = n.type), o || i || e.getPanel("ModelTree").hide();
      var c = e.getPanel("AreaPropertyPanel");
      let d = l.getRoomManager();
      if (a) {
        c && re(l, c, n.type, { id: n.id, modelId: n.modelId });
        var f = n.minPt && n.minPt.z > n.elevation ? n.minPt.z : n.elevation,
          m = n.height,
          p = n.maxPt,
          u = n.minPt,
          g = 1600,
          h = 10;
        "m" === l._defaultUnit && ((g /= 1e3), (h /= 1e3));
        const a = new THREE.Vector3(p.x, p.y, p.z + m);
        var b = new THREE.Box3().setFromPoints([u, a]),
          v = f + g + h,
          y = n.boundary;
        let i = CLOUD.ExtrudeBodyManager.getInstance(l.getViewer()).getNode(
          n.id
        );
        const o = (() =>
          "mm" === l._defaultUnit && !0 === l.getViewer().hasBimtilesModel()
            ? 0.001
            : "m" !== l._defaultUnit || l.getViewer().hasBimtilesModel()
            ? 1
            : 1e3)();
        if (((v = f / o + g + h), (g *= o), y))
          if ((d.hideAllRooms(), i)) {
            d.showRoomsById([n.id]), i.geometry.computeBoundingBox();
            let e = i.geometry.boundingBox.max.z - i.geometry.boundingBox.min.z;
            (e /= o), (v = f / o + e + h);
          } else {
            let e = new t.Bimface.Plugins.Rooms.RoomConfig();
            (e.viewer = l),
              (e.geometry = {
                boundary: l.globalUnitUtil.revertTranslate(JSON.parse(y), [
                  "z",
                  "x",
                  "y",
                  "offsetZ",
                ]),
                height: l.globalUnitUtil.revertTranslate(g),
              }),
              (e.roomId = n.id),
              (e.modelId = n.modelId);
            const a = new t.Bimface.Plugins.Rooms.Room(e);
            d.addRoom(a);
          }
        l.getViewer().modelManager.updateSceneBoundingBox(),
          (i =
            i ||
            CLOUD.ExtrudeBodyManager.getInstance(l.getViewer()).getNode(n.id));
        var w = i.explodedDirection.clone().multiplyScalar(i.explodedHeight);
        v += w.z;
        const C = new THREE.Matrix4().makeTranslation(w.x, w.y, w.z);
        b.applyMatrix4(C);
        const L = n.modelId ? n.modelId : l.getDefaultModel().modelId;
        b.applyMatrix4(
          l.getViewer().getModelManager().getModel(L).transformMatrix
        ),
          i.preModelExplodedMatrix && b.applyMatrix4(i.preModelExplodedMatrix),
          l.setSelectedComponentsById([n.id]);
        var B = l.getCameraAnimation();
        l.setCameraAnimation(!1),
          l.setView(t.Bimface.Viewer.ViewOption.Top),
          (b = l.globalUnitUtil.revertTranslate(b, ["x", "y", "z"])),
          l.zoomToBoundingBox(b),
          l.setCameraAnimation(B);
        let M = e.getPlugin("SectionPlane"),
          T = e.getPanel("PickSectionPlanePanel");
        T &&
          (M &&
            (M.exit(),
            e.removePlugin("SectionPlane"),
            (M = e.getPlugin("SectionPlane"))),
          T.hide());
        let _ = M || fe(l);
        !1 === M && e.addPlugin(_);
        let S = e.getPanel("SectionPlanePanel"),
          I = S && S.toggleButton;
        I && I.setCheckedState(!0);
        let k = S && S.select;
        k && k.setCurrentOption("Z");
        let x = e.getPanel("SectionBoxPanel");
        x && x.hide();
        let E = l.getViewer().getBoundingBoxWorld(),
          N = l.getViewer().getScene().getExpandScalar(),
          P = new THREE.Box3().setFromCenterAndSize(
            E.getCenter(s),
            E.getSize(r).multiplyScalar(N)
          ),
          U = P.min.z,
          A = P.max.z,
          D = i.geometry.boundingBox
            .clone()
            .applyMatrix4(
              l.getViewer().getModelManager().getModel(L).transformMatrix
            ),
          V =
            100 -
            ((l.globalUnitUtil.translate(v) + D.min.z - U) / (A - U)) * 100;
        _.setPlane("Z"),
          _.setDirection("Forward"),
          _.setProgress(V),
          _.hidePlane(),
          (CLOUD.GlobalData.ClippingCaps = !0),
          l.render();
      } else
        c && c.clear(),
          d.hideAllRooms(),
          l.getModels().forEach((e) => {
            e.clearIsolation();
          }),
          o || C(e),
          l.render();
    },
    fe = function (e) {
      let n = new t.Bimface.Plugins.Section.SectionPlaneConfig();
      return (
        (n.viewer = e),
        (n.id = "SectionPlane"),
        (n.plane = t.Bimface.Plugins.Section.SectionPlanePlane.Z),
        (n.direction = t.Bimface.Plugins.Section.SectionPlaneDirection.Forward),
        (n.exitSectionBox = !1),
        new t.Bimface.Plugins.Section.SectionPlane(n)
      );
    },
    me = function (e, n, a, i, o) {
      var l = e.getViewer(),
        s = e.getRootElement();
      if (n) {
        var r = new t.Bimface.UI.Tree.TreeNodeConfig();
        (r.isChecked = !1),
          (r.hasCheckbox = !1),
          (r.selection = !1),
          (r.className = "bf-tree bf-tree-area"),
          ("area" != a && "room" != a) || (r.selection = !0);
        var c,
          d,
          f = new t.Bimface.UI.Tree.TreeNode(r);
        if (
          ((f.type = a),
          (f.modelId = n.modelId),
          f.setData(n.id, n.name),
          "area" == a || "room" == a)
        ) {
          (f.elevation = i),
            (f.height = o),
            (f.boundary = n.boundary),
            (f.maxPt = n.maxPt),
            (f.minPt = n.minPt);
          var m = new t.Bimface.UI.Button.ButtonConfig();
          l.getIsMobileNew && l.getIsMobileNew()
            ? (m.className = "bf-property-icon bf-hide")
            : (m.className = "bf-property-icon"),
            (m.title = BimfaceLanguage.bf_tip_props_rooms);
          var p = new t.Bimface.UI.Button.Button(m);
          f.addNode(p.element),
            p.addEventListener("Click", function () {
              var n = e.getPanel("AreaPropertyPanel");
              n ||
                ((n = new t.Bimface.Application.UI.Panel.AreaPanel(
                  e
                )).addEventListener("Close", function () {
                  e.removePanel(n.id);
                }),
                n.addEventListener("Hide", function () {
                  n.close();
                }),
                re(l, n, f.type, { id: f.id, modelId: f.modelId }),
                s.appendChild(n.element),
                n.initPosition(),
                e.addPanel(n));
            });
        }
        if (
          ("areas" == a &&
            n.areas &&
            n.areas.length > 0 &&
            ((c = n.areas), (d = "area"), (i = n.elevation), (o = n.height)),
          "rooms" == a &&
            n.rooms &&
            n.rooms.length > 0 &&
            ((c = n.rooms), (d = "room"), (i = n.elevation), (o = n.height)),
          c)
        )
          for (var u = 0; u < c.length; u++) {
            c[u].modelId = f.modelId;
            var g = me(e, c[u], d, i, o);
            g.addEventListener("SelectionChanged", function (t, n, a) {
              n && t.recoverSelect(), de(e, t, n, a);
            }),
              f.addChildNode(g);
          }
        return ("rooms" != a && "areas" != a) || c || f.disabled(), f;
      }
    },
    pe = function (e, n, a, i, o, l) {
      var s = new t.Bimface.UI.Tree.TreeNodeConfig();
      (s.isChecked = !1),
        (s.hasCheckbox = !1),
        (s.selection = !1),
        (s.className = "bf-tree bf-tree-empty");
      var r = new t.Bimface.UI.Tree.TreeNode(s);
      r.setData("room", BimfaceLanguage.bf_panel_modelTree_rooms2),
        l && r.expand();
      var c = new t.Bimface.UI.Tree.TreeNode(s);
      c.setData("area", BimfaceLanguage.bf_panel_modelTree_areas),
        l && c.expand();
      for (var d = !1, f = !1, m = n.modelId, p = 0, u = n.length; p < u; p++)
        n[p].rooms &&
          n[p].rooms.length > 0 &&
          ((n[p].modelId = m), r.addChildNode(me(e, n[p], "rooms")), (d = !0)),
          n[p].areas &&
            n[p].areas.length > 0 &&
            ((n[p].modelId = m),
            c.addChildNode(me(e, n[p], "areas")),
            (f = !0));
      o && d && a.addChildNode(r), i && f && a.addChildNode(c);
    };
  const ue = function (e, n) {
    const a = e.getViewer();
    if (1 === a.getModelCount())
      a.getDefaultModel().getAreas4Tree(function (i) {
        if (i && i.length > 0) {
          const o = a._manifest.Features.HasArea,
            l = a._manifest.Features.HasRoom,
            s = (function (e, n, a, i) {
              if ((e.getViewer(), n && 0 != n.length)) {
                var o = new t.Bimface.UI.Tree.TreeNodeConfig();
                (o.isChecked = !1),
                  (o.hasCheckbox = !1),
                  (o.selection = !1),
                  (o.className = "bf-tree bf-tree-empty");
                var l = new t.Bimface.UI.Tree.TreeNode(o);
                l.expand();
                var s = new t.Bimface.UI.Tree.Tree(l);
                return pe(e, n, l, a, i, !0), s;
              }
            })(e, i, o, l);
          n && n(s);
        } else n && n();
      });
    else if (a.getModelCount() > 1) {
      let i = [];
      const o = () => {
        if (
          i.length === a.getModelCount() &&
          "[object Function]" === Object.prototype.toString.call(n)
        ) {
          const a = (function (e, n) {
            ((l = new t.Bimface.UI.Tree.TreeNodeConfig()).isChecked = !1),
              (l.hasCheckbox = !1),
              (l.selection = !1),
              (l.className = "bf-tree bf-tree-empty");
            var a = new t.Bimface.UI.Tree.TreeNode(l);
            a.expand();
            for (
              var i = new t.Bimface.UI.Tree.Tree(a), o = 0;
              o < n.length;
              o++
            ) {
              var l,
                s = n[o].data;
              ((l = new t.Bimface.UI.Tree.TreeNodeConfig()).isChecked = !1),
                (l.hasCheckbox = !1),
                (l.selection = !1),
                (l.className = "bf-tree");
              var r = new t.Bimface.UI.Tree.TreeNode(l);
              r.setData(n[o].meta.modelId, n[o].meta.name),
                (r.type = "model"),
                a.addChildNode(r),
                s
                  ? (r.expand(),
                    (s.modelId = n[o].meta.modelId),
                    pe(e, s, r, n[o].HasArea, n[o].HasRoom, !1))
                  : r.disabled();
            }
            return i;
          })(e, i);
          n(a);
        }
      };
      a.getModels().forEach((e) => {
        const t = e.getMetaData(),
          n = e._manifest,
          a = n.Features.HasArea,
          l = n.Features.HasRoom;
        a || l
          ? e.getAreas4Tree(
              (e) => {
                i.push({ data: e, meta: t, HasArea: a, HasRoom: l }), o();
              },
              (e) => {
                i.push({ error: e, meta: t }), o();
              }
            )
          : (i.push({ meta: t }), o());
      });
    }
  };
  var ge = function (e) {
      if (e) {
        var n = new t.Bimface.UI.Tree.TreeNodeConfig();
        (n.isChecked = !0), (n.hasCheckbox = !0), (n.selection = !1);
        var a = new t.Bimface.UI.Button.ButtonConfig();
        (a.className = "bf-tree-icon"),
          (a.defaultClass = "gld-bf-untransparent"),
          (a.changeClass = "gld-bf-transparent"),
          (a.title = BimfaceLanguage.bf_panel_modelTree_transparent);
        var i = new t.Bimface.UI.Button.ChangeButton(a);
        n.icon = i;
        var o = new t.Bimface.UI.Tree.TreeNode(n);
        return (
          (o.filter = e.type),
          o.setData(`${e.fileId}`, e.fileName),
          (o.linkedId = e.linkedBy),
          (o.databagId = e.databagId),
          o.addEventListener("SelectionChanged", function (e, t, n) {
            t && e.recoverSelect();
          }),
          o
        );
      }
    },
    he = function (e, n) {
      if (n && 0 != n.length) {
        var a = ge({
          type: "root",
          fileId: "all",
          fileName: BimfaceLanguage.bf_panel_modelTree_allFiles,
        });
        a.expand();
        var i = new t.Bimface.UI.Tree.Tree(a);
        if (1 === e.getModelCount())
          for (
            var o = 0,
              l = (n = t.Web.Lang.Utility.ClientHelper.sortByName(
                n,
                "fileName"
              )).length;
            o < l;
            o++
          )
            (n[o].type = "fileId"), a.addChildNode(ge(n[o]));
        else if (e.getModelCount() > 1)
          for (o = 0, l = n.length; o < l; o++)
            if ("integrateModel" === n[o].modelType) {
              var s = ge({
                type: n[o].modelType,
                fileId: n[o].modelId,
                fileName: n[o].modelName,
              });
              s.expand(), a.addChildNode(s);
              for (
                var r = t.Web.Lang.Utility.ClientHelper.sortByName(
                    n[o].fileList,
                    "fileName"
                  ),
                  c = 0;
                c < r.length;
                c++
              )
                (r[c].type = "fileId"), s.addChildNode(ge(r[c]));
            } else (n[o].type = n[o].modelType), a.addChildNode(ge(n[o]));
        return (
          i.addEventListener("CheckedChanged", function (t, n) {
            var a = n.filter,
              i = n.id,
              o = n.getCheckedState();
            if ("root" === a)
              "unchecked" == o
                ? e.getModels().forEach((e) => {
                    e.hideAllComponents(!1);
                  })
                : e.getModels().forEach((e) => {
                    e.showAllComponents(null, null, !1);
                  });
            else if ("integrateModel" === a || "singleModel" === a)
              "unchecked" == o
                ? e.getModel(i).hideAllComponents(!1)
                : e.getModel(i).showAllComponents(null, null, !1);
            else {
              var l = "all" !== n._parent.id ? n._parent.id : void 0,
                s = n.linkedId,
                r = [{ sceneId: `${n.databagId}.${i}` }];
              l && (r[0].modelId = l);
              var c = [];
              if (s)
                for (var d = 0; d < s.length; d++) {
                  var f = {};
                  (f[a] = s[d]), l && (f.modelId = l), c.push(f);
                }
              "unchecked" == o
                ? (c.length > 0
                    ? e.getModel(l).hideComponentsByObjectData(c, !1)
                    : e.getModels().some((e) => {
                        e._data.databagId != n.databagId ||
                          e.hasSet ||
                          (e.hideAllComponents(!1), (e.hasSet = !0));
                      }),
                  e.getModel(l).hideComponentsByObjectData(r, !1))
                : (c.length > 0
                    ? e.getModel(l).showComponentsByObjectData(c, !1)
                    : e.getModels().some((e) => {
                        e._data.databagId == n.databagId &&
                          e.hasSet &&
                          (e.showAllComponents(null, null, !1),
                          (e.hasSet = !1));
                      }),
                  e.getModel(l).showComponentsByObjectData(r, !1));
            }
            e.render();
          }),
          i.addEventListener("IconChanged", function (t, n) {
            var a = t.filter,
              i = t.id;
            if ("root" === a)
              "change" == n
                ? e.getModels().forEach((e) => {
                    e.transparentAllComponents();
                  })
                : e.getModels().forEach((e) => {
                    e.opaqueAllComponents();
                  });
            else if ("integrateModel" === a || "singleModel" === a)
              "change" == n
                ? e.getModel(i).transparentAllComponents()
                : e.getModel(i).opaqueAllComponents();
            else {
              var o = "all" !== t._parent.id ? t._parent.id : void 0,
                l = t.linkedId,
                s = [];
              if (l)
                for (var r = 0; r < l.length; r++) {
                  var c = {};
                  (c[a] = l[r]), o && (c.modelId = o), s.push(c);
                }
              "change" == n
                ? s.length > 0
                  ? e.getModel(o).transparentComponentsByObjectData(s, !1)
                  : e.getModels().some((e) => {
                      e._data.databagId != t.databagId ||
                        e.hasSetChange ||
                        (e.transparentAllComponents(), (e.hasSetChange = !0));
                    })
                : s.length > 0
                ? e.getModel(o).opaqueComponentsByObjectData(s, !1)
                : e.getModels().some((e) => {
                    e._data.databagId == t.databagId &&
                      e.hasSetChange &&
                      (e.opaqueAllComponents(), (e.hasSetChange = !1));
                  });
            }
            e.render();
          }),
          i
        );
      }
    };
  const be = function (e, t) {
    if (
      1 === e.getModelCount() &&
      "integrateModel" === e.getDefaultModel().getMetaData().modelType
    )
      e.getDefaultModel().getFiles((n) => {
        const a = he(e, n);
        t && t(a);
      });
    else if (e.getModelCount() > 1) {
      let n = [],
        a = 0,
        i = 0;
      if (
        (e.getModels().forEach((o) => {
          let l = { viewToken: o.viewToken };
          n.push(l);
          const s = o.getMetaData();
          if (
            ((l.modelType = s.modelType),
            (l.databagId = s.databagId),
            "singleModel" === s.modelType)
          ) {
            const e = o.modelId.toString();
            (l.fileId = e), (l.fileName = s.name), (l.fileType = s.fileType);
          } else
            "integrateModel" === s.modelType
              ? ((l.modelId = o.modelId.toString()),
                (l.modelName = s.name),
                (l.fileList = []),
                a++,
                o.getFiles((o) => {
                  if (((l.fileList = o), i++, a === i)) {
                    const a = he(e, n);
                    t && t(a);
                  }
                }))
              : (l.fileName = s.name);
        }),
        0 === a)
      ) {
        const a = he(e, n);
        t && t(a);
      }
    }
  };
  var ve = function (e, n) {
      if (e) {
        var a = new t.Bimface.UI.Tree.TreeNodeConfig();
        (a.isChecked = !0),
          (a.selection = !1),
          (a.propagation = !1),
          (a.hasCheckbox = !0);
        var i = new t.Bimface.UI.Button.ButtonConfig();
        (i.className = "bf-tree-icon"),
          (i.defaultClass = "gld-bf-untransparent"),
          (i.changeClass = "gld-bf-transparent"),
          (i.title = BimfaceLanguage.bf_panel_modelTree_transparent);
        var o = new t.Bimface.UI.Button.ChangeButton(i);
        a.icon = o;
        var l = new t.Bimface.UI.Tree.TreeNode(a);
        if (
          ((l.filter = "fileId"),
          l.setData(`${e.fileId}`, e.name),
          (l.linked = [e.linkPathHash]),
          (l.databagId = e.databagId),
          (l.modelId = n),
          l.addEventListener("SelectionChanged", function (e, t) {
            t && e.recoverSelect();
          }),
          e.links && e.links.length > 0)
        )
          for (var s = 0, r = e.links.length; s < r; s++) {
            var c = ve(e.links[s], n);
            (l.linked = l.linked.concat(c.linked)),
              l.addChildNode(ve(e.links[s], n));
          }
        return l;
      }
    },
    ye = function (e) {
      var n = new t.Bimface.UI.Tree.TreeNodeConfig();
      (n.isChecked = !0),
        (n.selection = !1),
        (n.propagation = !1),
        (n.hasCheckbox = !0);
      var a = new t.Bimface.UI.Button.ButtonConfig();
      (a.className = "bf-tree-icon"),
        (a.defaultClass = "gld-bf-untransparent"),
        (a.changeClass = "gld-bf-transparent"),
        (a.title = BimfaceLanguage.bf_panel_modelTree_transparent);
      var i = new t.Bimface.UI.Button.ChangeButton(a);
      n.icon = i;
      var o = new t.Bimface.UI.Tree.TreeNode(n);
      if (
        (o.setData(e.meta.modelId, e.meta.name),
        (o.filter = "integrateModel"),
        o.expand(),
        e.data && e.data.length > 0)
      )
        for (var l = 0, s = e.data.length; l < s; l++)
          o.addChildNode(ve(e.data[l], e.meta.modelId));
      return o;
    },
    Ce = function (e, n, a) {
      if (n && 0 != n.length) {
        var i = ve({
          type: "root",
          fileId: "all",
          name: BimfaceLanguage.bf_panel_modelTree_allFiles,
        });
        i.expand();
        var o = new t.Bimface.UI.Tree.Tree(i);
        if (1 === e.getModelCount())
          for (var l = 0, s = n.length; l < s; l++) i.addChildNode(ve(n[l]));
        else if (e.getModelCount() > 1)
          for (l = 0; l < n.length; l++) i.addChildNode(ye(n[l]));
        return (
          o.addEventListener("CheckedChanged", function (t, n) {
            var a = n.filter,
              i = n.id,
              o = n.getCheckedState();
            if ("all" == i)
              "unchecked" == o
                ? e.getModels().forEach((e) => {
                    e.hideAllComponents();
                  })
                : e.getModels().forEach((e) => {
                    e.showAllComponents();
                  });
            else if ("integrateModel" === a)
              "unchecked" == o
                ? e.getModel(i).hideAllComponents()
                : e.getModel(i).showAllComponents();
            else {
              for (
                var l = n.modelId, s = n.linked, r = [], c = 0;
                c < s.length;
                c++
              ) {
                var d = {};
                (d[a] = s[c] || n.id),
                  n.modelId && (d.modelId = n.modelId),
                  r.push(d);
              }
              "unchecked" == o
                ? e.getModel(l).hideComponentsByObjectData(r, !1)
                : e.getModel(l).showComponentsByObjectData(r, !1);
            }
            e.render();
          }),
          o.addEventListener("IconChanged", function (t, n) {
            var a = t.filter,
              i = t.id;
            if ("change" == n)
              if ("all" == i)
                e.getModels().forEach((e) => {
                  e.transparentAllComponents();
                });
              else if ("integrateModel" === a)
                e.getModel(i).transparentAllComponents();
              else {
                for (
                  var o = t.modelId, l = t.linked, s = [], r = 0;
                  r < l.length;
                  r++
                ) {
                  ((c = {})[a] = l[r] || t.id),
                    t.modelId && (c.modelId = t.modelId),
                    s.push(c);
                }
                e.getModel(o).transparentComponentsByObjectData(s, !1);
              }
            else if ("all" == i)
              e.getModels().forEach((e) => {
                e.opaqueAllComponents();
              });
            else if ("integrateModel" === a)
              e.getModel(i).opaqueAllComponents();
            else {
              for (
                o = t.modelId, l = t.linked, s = [], r = 0;
                r < l.length;
                r++
              ) {
                var c;
                ((c = {})[a] = l[r] || t.id),
                  t.modelId && (c.modelId = t.modelId),
                  s.push(c);
              }
              e.getModel(o).opaqueComponentsByObjectData(s, !1);
            }
            e.render();
          }),
          o
        );
      }
    };
  const we = function (e, t) {
    if (1 === e.getModelCount())
      e.getDefaultModel().getLinkGraph((n) => {
        const a = Ce(e, n);
        t && t(a);
      });
    else if (e.getModelCount() > 1) {
      let n = [];
      const a = () => {
        if (
          n.length === e.getModelCount() &&
          "[object Function]" === Object.prototype.toString.call(t)
        ) {
          const a = Ce(e, n);
          t(a);
        }
      };
      e.getModels().forEach((e) => {
        const t = e.getMetaData();
        e._manifest.Features.HasLinkRelation
          ? e.getLinkGraph((e) => {
              n.push({ data: e, meta: t }), a();
            })
          : "integrateModel" === t.modelType
          ? e.getFiles((e) => {
              e.forEach((e) => (e.name = e.fileName)),
                n.push({ data: e, meta: t }),
                a();
            })
          : (n.push({ meta: t }), a());
      });
    }
  };
  var Be = function (e, n, a, i, o) {
      if (e) {
        var l = new t.Bimface.UI.Tree.TreeNodeConfig();
        (l.isChecked = !1), (l.hasCheckbox = !1), (l.selection = !0);
        var s = new t.Bimface.UI.Tree.TreeNode(l);
        return (
          (s.modelId = o),
          (s.viewToken = n),
          (s.isIntegrateModel = a),
          a && (s.fileId = i),
          s.setData(e.id, e.name),
          s.addEventListener("SelectionChanged", function (e, t) {
            t && e.recoverSelect();
          }),
          s
        );
      }
    },
    Le = function (e, n, a, i) {
      var o = new t.Bimface.UI.Tree.TreeNodeConfig();
      (o.isChecked = !1), (o.hasCheckbox = !1), (o.selection = !1);
      var l = new t.Bimface.UI.Tree.TreeNode(o);
      if (
        (l.setData(e.fileId, e.fileName),
        (l.modelId = i),
        e.drawingSheets && e.drawingSheets.length > 0)
      )
        for (var s = 0; s < e.drawingSheets.length; s++)
          l.addChildNode(Be(e.drawingSheets[s].viewInfo, n, a, e.fileId, i));
      else l.disabled();
      return l;
    },
    Me = function (e) {
      var n = new t.Bimface.UI.Tree.TreeNodeConfig();
      (n.isChecked = !1), (n.hasCheckbox = !1), (n.selection = !1);
      var a = new t.Bimface.UI.Tree.TreeNode(n);
      if (
        (a.setData(e.modelId, e.modelName), e.fileList && e.fileList.length > 0)
      )
        for (var i = 0; i < e.fileList.length; i++)
          a.addChildNode(
            Le(
              e.fileList[i],
              e.viewToken,
              !0,
              e.fileList[i].integrateId || e.modelId
            )
          );
      return a.expand(), a;
    },
    Te = function () {
      var e = new t.Bimface.UI.Tree.TreeNodeConfig();
      return (
        (e.isChecked = !1),
        (e.hasCheckbox = !1),
        (e.selection = !1),
        (e.className = "bf-tree bf-tree-empty"),
        new t.Bimface.UI.Tree.TreeNode(e)
      );
    },
    _e = function (e, n, a, i) {
      if (n && 0 != n.length) {
        for (
          var o = Te(), l = new t.Bimface.UI.Tree.Tree(o), s = 0, r = n.length;
          s < r;
          s++
        ) {
          var c =
            "integrateModel" === e._data.modelType
              ? Le(
                  n[s],
                  n[s].viewToken,
                  !0,
                  n[s].integrateId || n[s].modelId || n[s].fileId
                )
              : Be(n[s].viewInfo, e._data.viewToken);
          o.addChildNode(c);
        }
        return l;
      }
    },
    Se = function (e, n) {
      if (n && 0 != n.length) {
        for (
          var a = Te(), i = new t.Bimface.UI.Tree.Tree(a), o = 0;
          o < n.length;
          o++
        )
          "integrateModel" === n[o].modelType
            ? a.addChildNode(Me(n[o]))
            : a.addChildNode(
                Le(
                  n[o],
                  n[o].viewToken,
                  !1,
                  n[o].integrateId || n[o].modelId || n[o].fileId
                )
              );
        return i;
      }
    };
  const Ie = function (e, n) {
    if (
      1 === e.getModelCount() &&
      "integrateModel" !== e.getDefaultModel().getMetaData().modelType
    )
      e.getDefaultModel().getAllDrawingsheets((a) => {
        if ((a = a.drawingList || a) && a.length > 0) {
          a = t.Web.Lang.Utility.ClientHelper.sortByName(a, "viewInfo.name");
          const i = _e(e, a);
          n && n(i);
        } else n && n();
      });
    else if (
      1 === e.getModelCount() &&
      "integrateModel" === e.getDefaultModel().getMetaData().modelType
    )
      e.getDefaultModel().getFiles((a) => {
        let i = 0,
          o = 0;
        a.forEach((l) => {
          const s = l.fileId.toString();
          i++,
            e.getDefaultModel().getDrawingsheets(s, (s) => {
              if (
                (o++,
                (s = s.drawingList || s) &&
                  ((s = t.Web.Lang.Utility.ClientHelper.sortByName(
                    s,
                    "viewInfo.name"
                  )),
                  (l.drawingSheets = s)),
                o == i)
              ) {
                const t = _e(e, a);
                n && n(t);
              }
            });
        });
      });
    else if (e.getModelCount() > 1) {
      let a = [],
        i = 0,
        o = 0,
        l = !1;
      const s = function () {
        setTimeout(function () {
          if (o == i && !l) {
            const e = Se(0, a);
            n && n(e);
          }
        }, 0);
      };
      e.getModels().forEach((e) => {
        let r = { viewToken: e.viewToken };
        a.push(r);
        const c = e.getMetaData();
        if (
          ((r.modelType = c.modelType),
          (r.databagId = c.databagId),
          "singleModel" === c.modelType)
        ) {
          const n = e.modelId.toString();
          (r.fileId = n), (r.fileName = c.name), (r.fileType = c.fileType);
          e._manifest.Features.HasDrawing &&
            (i++,
            e.getDrawingsheets(
              e._metaDataManager.dataManager._config.modelId,
              (e) => {
                o++,
                  (e = e.drawingList || e) &&
                    ((e = t.Web.Lang.Utility.ClientHelper.sortByName(
                      e,
                      "viewInfo.name"
                    )),
                    (r.drawingSheets = e)),
                  s();
              },
              () => {
                o++, s();
              }
            ));
        } else if ("integrateModel" === c.modelType) {
          (r.modelId = e.modelId.toString()),
            (r.modelName = c.name),
            (r.fileList = []);
          e._manifest.Features.HasDrawing &&
            ((l = !0),
            e.getFiles((l) => {
              (r.fileList = l),
                l.forEach((l) => {
                  const s = l.fileId.toString();
                  i++,
                    e.getDrawingsheets(s, (e) => {
                      if (
                        (o++,
                        (e = e.drawingList || e) &&
                          ((e = t.Web.Lang.Utility.ClientHelper.sortByName(
                            e,
                            "viewInfo.name"
                          )),
                          (l.drawingSheets = e)),
                        o == i)
                      ) {
                        const e = Se(0, a);
                        n && n(e);
                      }
                    });
                });
            }));
        }
      });
    }
  };
  var ke = function (e, n, a, i) {
      var o = t.Web.Lang.Utility.ClientHelper.getIsDesktop(),
        l = e.getViewer();
      if ((o || i || e.getPanel("ModelTree").hide(), a)) {
        l.getModels().forEach((e) => {
          e.clearSelectedComponents();
        });
        const e = l.getModel(n.modelId);
        e.addSelectedComponentsById(n.selectData),
          e.zoomToSelectedComponents(),
          n.recoverSelect(),
          l.render();
      } else
        l.getModels().forEach((e) => {
          e.clearSelectedComponents();
        }),
          o || C(e),
          l.render();
    },
    xe = function (e, n, a, i) {
      if (n) {
        var o = new t.Bimface.UI.Tree.TreeNodeConfig();
        (o.isChecked = !1),
          (o.hasCheckbox = !1),
          (o.selection = !1),
          (o.className = "bf-tree"),
          ("assembly" != a && "group" != a && "instances" != a) ||
            (o.selection = !0);
        var l,
          s,
          r,
          c,
          d = new t.Bimface.UI.Tree.TreeNode(o);
        if (((d.type = a), (d.modelId = i), "instances" == a))
          d.setData(n.id, n.id), (d.selectData = n.elements);
        else if ((d.setData(n.id, n.name), n.instances)) {
          var f = [];
          n.instances.forEach((e) => {
            f.push.apply(f, e.elements);
          }),
            (d.selectData = f);
        }
        if (
          (n.types && n.types.length > 0 && (l = n.types),
          (s = "assemblys" == a ? "assembly" : "group"),
          n.instances &&
            n.instances.length > 0 &&
            ((r = n.instances), (c = "instances")),
          l)
        )
          for (var m = 0; m < l.length; m++) {
            var p = xe(e, l[m], s, i);
            p.addEventListener("SelectionChanged", function (t, n, a) {
              ke(e, t, n, a);
            }),
              d.addChildNode(p);
          }
        if (r)
          for (m = 0; m < r.length; m++) {
            var u = xe(e, r[m], c, i);
            u.addEventListener("SelectionChanged", function (t, n, a) {
              ke(e, t, n, a);
            }),
              d.addChildNode(u);
          }
        return (
          ("groups" != a && "assemblys" != a) || l || d.disabled(),
          ("group" != a && "assembly" != a) || r || d.disabled(),
          d
        );
      }
    },
    Ee = function (e, n, a, i, o) {
      var l = new t.Bimface.UI.Tree.TreeNodeConfig();
      if (
        ((l.isChecked = !1),
        (l.hasCheckbox = !1),
        (l.selection = !1),
        (l.className = "bf-tree"),
        n.groups && n.groups.length > 0)
      ) {
        var s = new t.Bimface.UI.Tree.TreeNode(l);
        s.setData("group", BimfaceLanguage.bf_panel_modelTree_group),
          i && s.expand(),
          a.addChildNode(s);
        for (var r = 0, c = n.groups.length; r < c; r++)
          s.addChildNode(xe(e, n.groups[r], "groups", o));
      }
      if (n.assemblies && n.assemblies.length > 0) {
        l.selection = !1;
        var d = new t.Bimface.UI.Tree.TreeNode(l);
        d.setData("assembly", BimfaceLanguage.bf_panel_modelTree_assembly),
          i && d.expand(),
          a.addChildNode(d);
        for (r = 0, c = n.assemblies.length; r < c; r++)
          d.addChildNode(xe(e, n.assemblies[r], "assemblys", o));
      }
    };
  const Ne = function (e, n) {
      const a = e.getViewer();
      if (1 === a.getModelCount())
        a.getDefaultModel().getModelSet((a) => {
          if (a) {
            var i = (function (e, n, a) {
              if ((e.getViewer(), n && 0 != n.length)) {
                var i = new t.Bimface.UI.Tree.TreeNodeConfig();
                (i.isChecked = !1),
                  (i.hasCheckbox = !1),
                  (i.selection = !1),
                  (i.className = "bf-tree bf-tree-empty");
                var o = new t.Bimface.UI.Tree.TreeNode(i);
                o.expand();
                var l = new t.Bimface.UI.Tree.Tree(o);
                return Ee(e, n, o, !0), l;
              }
            })(e, a);
            n && n(i);
          } else n && n();
        });
      else if (a.getModelCount() > 1) {
        let i = [];
        const o = () => {
          if (
            i.length === a.getModelCount() &&
            "[object Function]" === Object.prototype.toString.call(n)
          ) {
            const a = (function (e, n) {
              ((l = new t.Bimface.UI.Tree.TreeNodeConfig()).isChecked = !1),
                (l.hasCheckbox = !1),
                (l.selection = !1),
                (l.className = "bf-tree bf-tree-empty");
              var a = new t.Bimface.UI.Tree.TreeNode(l);
              a.expand();
              for (
                var i = new t.Bimface.UI.Tree.Tree(a), o = 0;
                o < n.length;
                o++
              ) {
                var l,
                  s = n[o].data;
                ((l = new t.Bimface.UI.Tree.TreeNodeConfig()).isChecked = !1),
                  (l.hasCheckbox = !1),
                  (l.selection = !1),
                  (l.className = "bf-tree");
                var r = new t.Bimface.UI.Tree.TreeNode(l);
                r.setData(n[o].meta.modelId, n[o].meta.name),
                  (r.type = "model"),
                  a.addChildNode(r),
                  s && 0 != s.length
                    ? (r.expand(), Ee(e, s, r, !1, n[o].meta.modelId))
                    : r.disabled();
              }
              return i;
            })(e, i);
            n(a);
          }
        };
        a.getModels().forEach((e) => {
          const t = e.getMetaData();
          e._manifest.Features.HasGroup
            ? e.getModelSet(
                (e) => {
                  i.push({ data: e, meta: t }), o();
                },
                (e) => {
                  i.push({ error: e, meta: t }), o();
                }
              )
            : (i.push({ meta: t }), o());
        });
      }
    },
    Pe = (e) =>
      e &&
      e._data.extractType &&
      e._data.extractType.pipeSystem &&
      "rvt-translate" !== e._data.workerType.toLowerCase(),
    Ue = (e, t, n) => ({ id: e, name: t, children: n, type: "pipeSystem" });
  var Ae,
    De = 0,
    Ve = [];
  const ze = new Map();
  var He = function (e, n, a, i) {
      if (e) {
        var o = new t.Bimface.UI.Tree.TreeNodeConfig();
        (o.isChecked = !1),
          (o.hasCheckbox = !1),
          (o.selection = !1),
          e.type || (o.selection = !0);
        var l = new t.Bimface.UI.Tree.TreeNode(o);
        if (
          (l.setData(e.name, e.name),
          e.type || ((l.network = e.network), (l.fileId = Ae)),
          (l.modelId = n),
          e.items && e.items.length > 0)
        )
          for (var s = 0, r = e.items.length; s < r; s++)
            l.addChildNode(He(e.items[s], n, a, i));
        else if ("fileId" === e.type) l.disabled();
        else if (e.children && e.children.length > 0)
          for (s = 0, r = e.children.length; s < r; s++)
            l.addChildNode(He(e.children[s], n, a, i));
        else if (Pe(i.getModel(n)) && !e.children) {
          (l._selection = !0), (l.pipeId = e.id), (l.fileId = Ae);
          let o = [];
          Object.keys(e.network).map((e) => {
            o.push(e);
          }),
            (l.network = o);
          var c = new t.Bimface.UI.Button.ButtonConfig();
          (c.className = "bf-flow-icon"),
            (c.changeClass = "bf-flow-icon-selected"),
            (c.title = BimfaceLanguage.bf_tip_flow_effect);
          var d = new t.Bimface.UI.Button.ChangeButton(c);
          l.addNode(d.element),
            d.addEventListener("Change", function (e) {
              const o = i.getModel(n).getFeatureData("pipeSystem");
              if ("change" === e) {
                i.getModel(n).clearSelectedComponents();
                const e = l.network,
                  a = { icon: d, effects: [] };
                ze.set(i, a),
                  o.setFlowEffectMaterialByIds(
                    { componentIds: e, fileId: l.fileId },
                    (e) => {
                      e.forEach((e) => {
                        const n =
                          new t.Bimface.Plugins.Animation.FlowEffectConfig();
                        (n.material = e), (n.speed = [0.03, 0]), (n.viewer = i);
                        const o = new t.Bimface.Plugins.Animation.FlowEffect(n);
                        o.play(), a.effects.push(o);
                      });
                    }
                  );
              } else Oe(i), Fe(a, i, l, !0, !1);
            });
        }
        return l;
      }
    },
    We = function (e, n, a) {
      if (a && 0 != a.length) {
        var i;
        ((r = new t.Bimface.UI.Tree.TreeNodeConfig()).isChecked = !1),
          (r.hasCheckbox = !1),
          (r.selection = !1),
          (i = new t.Bimface.UI.Tree.TreeNode(r)).expand();
        var o = new t.Bimface.UI.Tree.Tree(i);
        if (1 === n.getModelCount()) {
          const t = "integrateModel" === n.getModel().getMetaData().modelType;
          for (var l = 0, s = a.length; l < s; l++) {
            t && (Ae = a[l].id),
              (p = He(a[l], null, e, n)).addEventListener(
                "SelectionChanged",
                function (t, a, i) {
                  Fe(e, n, t, a, i);
                }
              ),
              i.addChildNode(p);
          }
        } else if (n.getModelCount() > 1)
          for (l = 0; l < a.length; l++)
            if ("integrateModel" === a[l].modelType) {
              var r;
              ((r = new t.Bimface.UI.Tree.TreeNodeConfig()).isChecked = !1),
                (r.hasCheckbox = !1),
                (r.selection = !1);
              var c = new t.Bimface.UI.Tree.TreeNode(r);
              c.setData(a[l].modelId, a[l].modelName), i.addChildNode(c);
              for (
                var d = t.Web.Lang.Utility.ClientHelper.sortByName(
                    a[l].fileList,
                    "fileName"
                  ),
                  f = 0;
                f < d.length;
                f++
              ) {
                if ((m = d[f].mepData))
                  (Ae = m.id),
                    (p = He(m, a[l].modelId, e, n)).addEventListener(
                      "SelectionChanged",
                      function (t, a, i) {
                        Fe(e, n, t, a, i);
                      }
                    ),
                    c.addChildNode(p);
                else
                  (p = new t.Bimface.UI.Tree.TreeNode(r)).setData(
                    d[f].fileName,
                    d[f].fileName
                  ),
                    p.disabled(),
                    c.addChildNode(p);
              }
            } else {
              var m, p;
              if ((m = a[l].mepData))
                (Ae = void 0),
                  (p = He(m, a[l].fileId, e, n)).addEventListener(
                    "SelectionChanged",
                    function (t, a, i) {
                      Fe(e, n, t, a, i);
                    }
                  ),
                  i.addChildNode(p);
              else
                (p = new t.Bimface.UI.Tree.TreeNode(r)).setData(
                  a[l].fileName,
                  a[l].fileName
                ),
                  p.disabled(),
                  i.addChildNode(p);
            }
        return o;
      }
    };
  const Oe = (e) => {
      e.getModels().forEach((t) => {
        if (t._data.extractType && t._data.extractType.pipeSystem) {
          const n = t.getFeatureData("pipeSystem");
          if (!n) return;
          const a = ze.get(e);
          a &&
            (a.effects &&
              a.effects.forEach((e) => {
                e.stop();
              }),
            a.icon && a.icon.setState("default")),
            ze.set(e, null),
            n.clearFlowEffectMaterial();
        }
      });
    },
    Fe = function (e, n, a, i, o) {
      Oe(n);
      const l = ((e, t) => {
          let n = [];
          const a = t.modelId;
          if (t.fileId) {
            const i = e.getModel(a).getMetaData().config;
            if (i && i["integrate-with-links"]) {
              let e;
              Ve.map((n) => {
                n.fileId != t.fileId || (e = n.linkedBy);
              }),
                e &&
                  e.map((e) => {
                    t.network.map((t) => {
                      var a = `${e}.${t}`;
                      n.push(a);
                    });
                  });
            } else
              t.network.map((e) => {
                var a = `${t.fileId}.${e}`;
                n.push(a);
              });
          } else n = t.network;
          return n;
        })(n, a),
        s = a.modelId;
      if (
        (t.Web.Lang.Utility.ClientHelper.getIsDesktop() ||
          o ||
          e.getPanel("ModelTree").hide(),
        i)
      ) {
        n.getModels().forEach((e) => {
          e.clearSelectedComponents();
        });
        const e = n.getModel(s);
        e.addSelectedComponentsById(l),
          e.zoomToSelectedComponents(1),
          a.recoverSelect();
      } else
        n.getModels().forEach((e) => {
          e.clearSelectedComponents();
        });
      n.render();
    };
  var Re = function (e) {
    return (
      (e = t.Web.Lang.Utility.ClientHelper.sortByName(e, "name")).map((n) => {
        n.items &&
          n.items.length > 0 &&
          ("systemType" == n.type
            ? (e = t.Web.Lang.Utility.ClientHelper.sortByRules(n.items, "name"))
            : Re(n.items));
      }),
      e
    );
  };
  const $e = function (e, t, n, a, i) {
      const o = [];
      e.getMepSystem(
        t,
        function (e) {
          e.systems
            ? (function (e, t, n, a, i) {
                if (Pe(i)) a && a(e);
                else {
                  let i = e.reduce(function (e, t, n) {
                      return (
                        (e[t.systemCategory] = e[t.systemCategory] || {}),
                        (e[t.systemCategory][t.systemType] =
                          e[t.systemCategory][t.systemType] || []),
                        e[t.systemCategory][t.systemType].push({
                          name: t.name,
                          network: Object.keys(t.network),
                        }),
                        e
                      );
                    }, {}),
                    o = [];
                  for (let e in i) {
                    o.push({ type: "systemCategory", name: e, items: [] });
                    for (let t in i[e])
                      o[o.length - 1].items.push({
                        type: "systemType",
                        name: t,
                        items: i[e][t],
                      });
                  }
                  let l = [];
                  t
                    ? l.push({ type: "fileId", id: t, name: n, items: o })
                    : (l = o),
                    a && a(l);
                }
              })(
                e.systems,
                t,
                n,
                function (e) {
                  a && a(e);
                },
                i
              )
            : (De--, a && a(o));
        },
        function () {
          De--, a && a(o);
        }
      );
    },
    qe = function (e, t, n, a) {
      if (1 === t.getModelCount()) {
        const o = t.getDefaultModel();
        if ("integrateModel" == n) {
          var i = [];
          o.getFiles((n) => {
            (De = n.length),
              n.forEach((n) => {
                let l = n.fileId.toString(),
                  s = n.fileName.toString();
                Ve.push({ fileId: l, linkedBy: n.linkedBy }),
                  $e(
                    o,
                    l,
                    s,
                    (n) => {
                      if (0 != n.length)
                        if (Pe(t)) {
                          let e = Ue(l, s, n);
                          i.push(e);
                        } else i.push(n[0]);
                      if (i.length == De) {
                        let n = Re(i);
                        const o = We(e, t, n);
                        a && a(o);
                      }
                    },
                    o
                  );
              });
          });
        } else
          $e(
            o,
            "",
            "",
            (n) => {
              let i = Re(n);
              const o = We(e, t, i);
              a && a(o);
            },
            o
          );
      } else if (t.getModelCount() > 1) {
        let n = [];
        De = 0;
        let i = 0;
        t.getModels().forEach((o) => {
          let l = { viewToken: o.viewToken };
          n.push(l);
          const s = o.getMetaData();
          (l.modelType = s.modelType),
            (l.databagId = s.databagId),
            (l.fileName = s.name);
          if (o._manifest.Features.HasMEPSystem || Pe(o))
            if ((De++, "singleModel" === s.modelType)) {
              const r = o.modelId.toString();
              (l.fileId = r),
                (l.fileType = s.fileType),
                $e(
                  o,
                  r,
                  s.name,
                  (s) => {
                    if (0 != s.length)
                      if ((i++, Pe(o))) {
                        let e = Ue(r, l.fileName, s);
                        l.mepData = e;
                      } else l.mepData = s[0];
                    if (i == De) {
                      const i = We(e, t, n);
                      a && a(i);
                    }
                  },
                  o
                );
            } else
              "integrateModel" === s.modelType &&
                ((l.modelId = o.modelId.toString()),
                (l.modelName = s.name),
                (l.fileList = []),
                o.getFiles((s) => {
                  l.fileList = s;
                  let r = 0;
                  s.forEach((l) => {
                    const c = l.fileId.toString(),
                      d = l.fileName.toString();
                    Ve.push({ fileId: c, linkedBy: l.linkedBy }),
                      $e(
                        o,
                        c,
                        d,
                        (o) => {
                          if (0 != o.length)
                            if ((r++, Pe(t))) {
                              let e = Ue(c, d, o);
                              l.mepData = e;
                            } else l.mepData = o[0];
                          if ((r === s.length && i++, i == De)) {
                            const i = We(e, t, n);
                            a && a(i);
                          }
                        },
                        o
                      );
                  });
                }));
        });
      }
    };
  t.Web.Lang.Utility.Namespace.ensureNamespace(
    t,
    "Bimface.Application.UI.Panel"
  ).DrawingPanel = function (e, n) {
    let a = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
    e.getViewer(), e.getRootElement();
    var i = new t.Bimface.UI.Panel.PanelConfig();
    (i.title = "楼层平面图"),
      (i.id = "DrawingPanel"),
      (i.css = a
        ? { right: "10px", top: "10px", width: "400px", height: "420px" }
        : {
            left: "0",
            top: "2.68em",
            width: "100%",
            bottom: 0,
            paddingTop: 0,
          });
    var o = new t.Bimface.UI.Panel.Panel(i);
    return a || o.element.addClass("view-panel"), o.setHeader(n.name), o;
  };
  var je = function (e) {
    var t = e.getViewer(),
      n = e.getPanel("AreaPanel"),
      a = e.getPanel("DrawingPanel");
    C(e),
      n && (n.close(), e.removePanel("AreaPanel")),
      a && a.hide(),
      t.hideAllRooms(),
      t.getModels().forEach((e) => {
        e.clearIsolation(!1),
          e.opaqueAllComponents(!1),
          e.clearSelectedComponents(!1);
      }),
      Oe(t);
  };
  void 0 === Object.assign &&
    (Object.assign = function (e) {
      if (null == e)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var t = Object(e), n = 1; n < arguments.length; n++) {
        var a = arguments[n];
        if (null != a)
          for (var i in a)
            Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
      }
      return t;
    });
  let Ge = Object.freeze({ Release: "Release", Debug: "Debug" }),
    Ze = Object.freeze({ Normal: "Normal", DrawingView: "drawingView" }),
    Xe = Object.freeze({ BIMFACE: "BIMFACE", Local: "Local" }),
    Ye = Object.freeze({
      zh_CN: "zh_CN",
      en_GB: "en_GB",
      sv_SE: "sv_SE",
      zh_TW: "zh_TW",
    }),
    Qe = Object.freeze({ Normal: "Normal", Bake: "Bake" });
  (window.BimfaceSDKLoaderConfig = function () {
    if (window.hostConfig) {
      for (let e in window.hostConfig) u[e] = window.hostConfig[e];
      u.securityApi = window.hostConfig.securityApi;
    }
    return {
      staticHost: `${u.staticHost}/api`,
      APIHost: u.APIHost,
      language: "zh_CN",
      viewToken: null,
      configuration: Ge.Release,
      dataEnvType: u.dataEnvType || "BIMFACE",
      viewType: Ze.Normal,
      visualStyle: Qe.Bake,
      version: "",
      securityApi: u.securityApi,
    };
  }),
    (window.BimfaceEnvOption = Xe),
    (window.BimfaceLanguageOption = Ye),
    (window.BimfaceConfigrationOption = Ge),
    (window.BimfaceViewTypeOption = Ze);
  var Je = function (e, n, a) {
      var i = e.getViewer(),
        o = a.viewToken || i._data.viewToken,
        l = e.getRootElement(),
        s = a.isIntegrateModel;
      e.fileId = a.fileId || a.modelId;
      var r = a.modelId || a.fileId;
      const c = a.effectiveModelId || r;
      e.subViewer
        ? "Local" == BimfaceLoaderConfig.dataEnvType
          ? e.subViewer.addModel(
              BimfaceLoaderConfig.MetaData,
              a.id,
              s && a.fileId
            )
          : (e.getPanel("DrawingPanel").setTitleContent(a.name),
            e.subViewer.load(o, a.id, a.fileId))
        : ((BimfaceLoaderConfig.viewToken = o),
          (BimfaceLoaderConfig.viewType = Ze.DrawingView),
          BimfaceSDKLoader.load(BimfaceLoaderConfig, function (r) {
            var d,
              f,
              m = i.getViewer(),
              p = !0,
              u = function () {
                if (d) d.show();
                else {
                  var e = new t.Bimface.UI.Tips.TipsConfig();
                  (e.element = l),
                    (e.timeOut = 3e3),
                    (e.html =
                      BimfaceLanguage.bf_panel_modelTree_componentNotFound),
                    (d = new t.Bimface.UI.Tips.Tips(e));
                }
                p = !1;
              };
            m.registerEventListener(CLOUD.EVENTS.ON_SELECTION_FAILED, u);
            var g = t.Bimface.Viewer.Viewer3DEvent;
            i.addEventListener(g.MissingDrawingElement, function () {
              if (f) f.show();
              else {
                var e = new t.Bimface.UI.Tips.TipsConfig();
                (e.element = l),
                  (e.timeOut = 3e3),
                  (e.html = BimfaceLanguage.bf_panel_modelTree_entityNotFound),
                  (f = new t.Bimface.UI.Tips.Tips(e));
              }
            });
            var h = new t.Bimface.Viewer.ViewerDrawingConfig();
            ((h = Object.assign({}, h, e._opt.drawingSheetConfig)).domElement =
              n.container),
              (h.APIHost = i._opt.APIHost),
              (h.resourceHost = i._opt.resourceHost);
            var b = new t.Bimface.Viewer.ViewerDrawing(h);
            if ("Local" == BimfaceLoaderConfig.dataEnvType)
              (r.fileId = a.fileId || ""),
                (BimfaceLoaderConfig.MetaData = r),
                b.addModel(r, a.id, s && r.fileId);
            else {
              const e = (e) => {
                const n = t.Bimface.Viewer.ViewerDrawingEvent;
                e.addEventListener(n.LoadDrawing, () => {
                  const t = e.getViewer().getLayouts();
                  t.length > 1 && e.getViewer().activeLayoutById(t[1].id);
                });
              };
              let n = t.Web.Lang.Utility.HttpRequest;
              const l =
                i.getModel(a.modelId) ||
                i.getModels().find((e) => e._dataModelId == a.modelId);
              if ("integrateModel" == l._data.modelType)
                n.ajax({
                  url: `${i._opt.APIHost}/data/v2/integrations/${l._dataModelId}/files?includeDrawingSheet=true&view_token=${o}`,
                  type: "GET",
                  success: function (t) {
                    JSON.parse(t).data.forEach((t) => {
                      if (t.fileId == a.fileId) {
                        let l = i.authenticate
                          ? n.getUrl({
                              url: `${i._opt.resourceHost}/${t.databagId}/resource/drawing/${a.id}/index.json`,
                              path: `resource/drawing/${a.id}/index.json`,
                              APIHost: i._opt.APIHost,
                              loadMode: i._data.loadMode,
                              fileId: a.fileId,
                              viewToken: o,
                            })
                          : `${i._opt.resourceHost}/${t.databagId}/resource/drawing/${a.id}/index.json`;
                        n.ajax({
                          url: l,
                          type: "GET",
                          success: function (t) {
                            const n = JSON.parse(t);
                            "2" == n.metadata["version:"] ||
                            "2" == n.metadata.version
                              ? (b.loadDrawing({
                                  viewToken: o,
                                  fileId: a.fileId,
                                  sheetId: a.id,
                                }),
                                e(b))
                              : b.load(o, a.id, a.fileId);
                          },
                        });
                      }
                    });
                  },
                });
              else {
                let t = i.authenticate
                  ? n.getUrl({
                      url: `${i._opt.resourceHost}/${l._data.databagId}/resource/drawing/${a.id}/index.json`,
                      path: `resource/drawing/${a.id}/index.json`,
                      APIHost: i._opt.APIHost,
                      loadMode: i._data.loadMode,
                      fileId: l._dataModelId,
                      viewToken: o,
                      modelType: l._data.modelType,
                    })
                  : `${i._opt.resourceHost}/${l._data.databagId}/resource/drawing/${a.id}/index.json`;
                n.ajax({
                  url: t,
                  type: "GET",
                  success: function (t) {
                    const n = JSON.parse(t);
                    "2" == n.metadata["version:"] || "2" == n.metadata.version
                      ? (b.loadDrawing({
                          viewToken: o,
                          fileId: a.fileId,
                          sheetId: a.id,
                        }),
                        e(b))
                      : b.load(o, a.id, a.fileId);
                  },
                });
              }
            }
            var v = function (n) {
                if (n && n.length > 0) {
                  var a = n[0],
                    o = b.toModelId(a);
                  if (a && a.toString().indexOf(".") > -1)
                    if (o) o = o.replace(".", "_");
                    else {
                      var l = b.toLinkRevitId(a.split(".")[0], a.split(".")[1]),
                        r = l instanceof Object ? l.fileId : e.fileId,
                        d = l instanceof Object ? l.revitId : o;
                      o = r + "_" + d;
                    }
                  else s && (o = `${e.fileId}_${o}`);
                  var f = e.getPlugin("SectionBox"),
                    m = e.getPanel("SectionPanel");
                  !(function (e, t) {
                    var n,
                      a = function (n) {
                        if (0 != n.length) {
                          for (var a = 0; a < n.length; a++) {
                            var i = n[a].areas,
                              o = n[a].height,
                              l = n[a].elevation;
                            if (i && i.length > 0)
                              for (var s = 0; s < i.length; s++)
                                if (e == i[s].id) return void t(i[s], l, o);
                            var r = n[a].rooms;
                            if (r && r.length > 0)
                              for (var c = 0; c < r.length; c++)
                                if (e == r[c].id) return void t(r[c], l, o);
                          }
                          t();
                        }
                      };
                    n
                      ? a(n)
                      : (
                          i.getModel(c) ||
                          i.getModels().find((e) => e._dataModelId == c)
                        ).getAreas(function (e) {
                          a((n = e));
                        });
                  })(o, function (n, a, l) {
                    if (
                      (i.getModels().forEach((e) => {
                        e.showAllComponents();
                      }),
                      n)
                    ) {
                      n.boundary && i.setArea(n.boundary, a);
                      var r = i.getWorldBox(a - 20, a + 1500);
                      if (f) m && m.hideBox();
                      else {
                        var d =
                          new t.Bimface.Plugins.Section.SectionBoxConfig();
                        (d.viewer = i),
                          (d.id = "SectionBox"),
                          (f = new t.Bimface.Plugins.Section.SectionBox(d)),
                          e.addPlugin(f);
                      }
                      f.setBox(r),
                        f.hideBox(),
                        i.setView(t.Bimface.Viewer.ViewOption.Top);
                    } else {
                      s && (o = o.replace("_", ".")),
                        f && (f.reset(), f.hideBox()),
                        m && m.hideBox(),
                        i.clearAllRooms();
                      const e =
                        i.getModel(c) ||
                        i.getModels().find((e) => e._dataModelId == c);
                      p
                        ? (e.isolateComponentsById(
                            [o],
                            t.Bimface.Viewer.IsolateOption.MakeOthersTranslucent
                          ),
                          e.setSelectedComponentsById([o]),
                          e.zoomToSelectedComponents())
                        : (i.getModels().forEach((e) => {
                            e.clearIsolation();
                          }),
                          (p = !0));
                    }
                    i.render();
                  });
                }
              },
              y = function (e) {
                if (e.elementId) {
                  var n = e.elementId,
                    a = b.fromRevitId(n),
                    o = b.fromLinkRevitId(e.fileId, n);
                  if (!(a || (o && o.ids))) {
                    var l = t.Bimface.Viewer.Viewer3DEvent;
                    return void i
                      .getEventManager()
                      .fireEvent(l.MissingDrawingElement);
                  }
                  if (o instanceof Object)
                    i.authenticate &&
                    i.authenticate.data.config["integrate-with-links"] &&
                    "2" == b.version
                      ? (b.clearSelection(),
                        b
                          .getViewer()
                          .zoomToElementsWithBlock(o.blockId, o.ids, 0.5))
                      : b.zoomToObjectWithBlock(o.blockId, o.ids);
                  else if (a)
                    if (b.loadedDrawings.length > 0) {
                      const t = { modelId: e.modelId, objectId: a };
                      b.zoomToObject(t);
                    } else b.zoomToObject(a);
                }
              };
            n.addEventListener("Sizable", function () {
              b.resize();
            }),
              n.addEventListener("Hide", function () {
                m.unregisterEventListener(CLOUD.EVENTS.ON_SELECTION_FAILED, u),
                  b.removeEventListener("ComponentsSelectionChanged", v),
                  i.removeEventListener("ComponentsSelectionChanged", y),
                  n.close(),
                  e.removePanel("DrawingPanel"),
                  delete e.subViewer;
              }),
              b.addEventListener("ComponentsSelectionChanged", v),
              i.addEventListener("ComponentsSelectionChanged", y),
              (e.subViewer = b);
          }));
    },
    Ke = function (e, n) {
      var a = e.getRootElement();
      (i = e.getPanel("DrawingPanel")) && i.hide();
      var i = new t.Bimface.Application.UI.Panel.DrawingPanel(e, n);
      a.appendChild(i.element), i.bringToFront(), e.addPanel(i), Je(e, i, n);
    };
  !(function () {
    var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Web.Lang.Utility.Dom"
    );
    let n = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Panel"
      ),
      a = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Common.Flexible"
      );
    n.ModelTreePanel = function (n, i) {
      var o = "component",
        l = n.getViewer(),
        s = n.getRootElement(),
        r = l._manifest,
        c = l._data.modelType,
        d = e.create("div", "bf-tree-header"),
        f = e.create("div", "bf-tree-footer"),
        m = l.getIsMobileNew();
      let p,
        u,
        g,
        h = t.Web.Lang.Utility.ClientHelper.getIsDesktop(),
        b = [];
      l._data.workerType;
      const v = l.getCameraStatus(),
        y = l.getCameraAnimation();
      let w;
      if (
        (h &&
          (w = {
            component: {
              panel: !1,
              tree: null,
              initialPanelPosition: null,
              initialCameraState: { status: v, animation: y },
            },
            modelGroup: {
              panel: !1,
              tree: null,
              initialPanelPosition: null,
              initialCameraState: { status: v, animation: y },
            },
            mepSystem: {
              panel: !1,
              tree: null,
              initialPanelPosition: null,
              initialCameraState: { status: v, animation: y },
            },
            file: {
              panel: !1,
              tree: null,
              initialPanelPosition: null,
              initialCameraState: { status: v, animation: y },
            },
            links: {
              panel: !1,
              tree: null,
              initialPanelPosition: null,
              initialCameraState: { status: v, animation: y },
            },
            area: {
              panel: !1,
              tree: null,
              initialPanelPosition: null,
              initialCameraState: { status: v, animation: y },
            },
            drawing: {
              panel: !1,
              tree: null,
              initialPanelPosition: null,
              initialCameraState: { status: v, animation: y },
            },
          }),
        r.Features.HasComponentStructure &&
          b.push({
            id: "component",
            name: BimfaceLanguage.bf_panel_modelTree_components,
          }),
        (r.Features.HasGroup || r.Features.HasAssemble) &&
          b.push({
            id: "modelGroup",
            name: BimfaceLanguage.bf_panel_modelTree_modelGroup,
          }),
        (r.Features.HasMEPSystem || Pe(l)) &&
          b.push({
            id: "mepSystem",
            name: BimfaceLanguage.bf_panel_modelTree_mep,
          }),
        r.Features.HasFileList &&
          b.push({
            id: "file",
            name: BimfaceLanguage.bf_panel_modelTree_files,
          }),
        (r.Features.HasRoom || r.Features.HasArea) &&
          b.push({
            id: "area",
            name: BimfaceLanguage.bf_panel_modelTree_rooms1,
          }),
        r.Features.HasDrawing &&
          !m &&
          b.push({
            id: "drawing",
            name: BimfaceLanguage.bf_panel_modelTree_drawings,
          }),
        h)
      ) {
        var B,
          L,
          M = e.create("div", "bf-tree-tab");
        if ((d.appendChild(M), b.length < 5)) B = b;
        else {
          var T = e.create("div", "bf-tree-select"),
            _ = e.create("div", "bf-tree-slot");
          d.appendChild(_),
            d.appendChild(T),
            (B = b.slice(0, 3)),
            (L = b.slice(3));
          var S = new t.Bimface.UI.Select.SelectConfig();
          (S.className = "bf-select bf-select-tree"),
            (S.options = L),
            (S.element = T),
            (u = new t.Bimface.UI.Select.Select(S)),
            (_.innerHTML = L[0].name),
            _.setAttribute("id", L[0].id),
            _.setAttribute("title", L[0].name),
            (d.querySelectorAll(".bf-select-option")[0].style.display = "none");
          var I = d.querySelector(".bf-select-current"),
            k = e.create("i", "gld-bf-arrow-right");
          I.appendChild(k);
        }
        var x = new t.Bimface.UI.Tabs.TabsConfig(),
          E = [
            "oneTab",
            "twoTabs",
            "threeTabs",
            "fourTabs",
            "fiveTabs",
            "sixTabs",
            "sevenTabs",
          ],
          N = B.length > 7 ? 6 : B.length - 1;
        (x.className = `bf-tabs bf-tabs-tree ${E[N]}`),
          (x.options = B),
          (x.element = M),
          (p = new t.Bimface.UI.Tabs.Tabs(x)),
          p._controls && 0 === p._controls.length
            ? (g = new t.Bimface.UI.Panel.PanelConfig())
            : ((g = new t.Bimface.UI.Panel.PanelConfig()),
              (g.title = BimfaceLanguage.bf_btn_modelTree),
              (g.id = "ModelTree"),
              (g.css = {
                left: "10px",
                top: "10px",
                height: "430px",
                minWidth: "300px",
                minHeight: "140px",
              }),
              (g.className = "bf-panel bf-modelTree-panel"));
        let a = l._opt.domElement;
        p.addEventListener(
          t.Bimface.UI.Control.ControlEvent.ActiveModelTreeTab,
          function (e) {
            "component" === e &&
              a.getElementsByClassName("bf-panel-searchbar")[0] &&
              ((a.getElementsByClassName("bf-panel-search-input")[0].value =
                ""),
              (a.getElementsByClassName("bf-panel-searchbar")[0].style.display =
                "inline-block"),
              (a.getElementsByClassName(
                "bf-panel-search-result"
              )[0].style.display = "inline-block"),
              (n.getPanel("ModelTree").container.style.height = "326px"));
          }
        ),
          p.addEventListener(
            t.Bimface.UI.Control.ControlEvent.InActiveModelTreeTab,
            function (e) {
              const t = p.getCurrentOption();
              q(t.id),
                "component" !== e &&
                  a.getElementsByClassName("bf-panel-searchbar")[0] &&
                  (l.dynamicTree &&
                    "none" !=
                      a.getElementsByClassName("bf-panel-searchbar")[0].style
                        .display &&
                    (l.dynamicTree._oldState = l.getCurrentState()),
                  (a.getElementsByClassName(
                    "bf-panel-searchbar"
                  )[0].style.display = "none"),
                  (a.getElementsByClassName(
                    "bf-panel-search-result"
                  )[0].style.display = "none"),
                  (n.getPanel("ModelTree").container.style.height = null));
            }
          );
      } else {
        (x = new t.Bimface.UI.Tabs.TabsConfig()),
          (E = [
            "oneTab",
            "twoTabs",
            "threeTabs",
            "fourTabs",
            "fiveTabs",
            "sixTabs",
            "sevenTabs",
          ]),
          (N = b.length > 7 ? 6 : b.length - 1);
        var P = t.Web.Lang.Utility.ClientHelper.getIsTablet();
        (x.className = `bf-tabs bf-tabs-tree-mobile ${E[N]}`),
          (x.options = b),
          (x.element = d),
          (p = new t.Bimface.UI.Tabs.Tabs(x)),
          (g = new t.Bimface.UI.Panel.PanelConfig()),
          (g.title = BimfaceLanguage.bf_btn_modelTree),
          (g.id = "ModelTree"),
          (g.enableSizable = !1),
          P &&
            m &&
            (g.css = { left: ".2133em", top: ".2133em", width: 0, height: 0 }),
          (g.css = { left: 0, top: 0, width: "100%", height: "100%" }),
          m && (g.css.fontSize = a.getFontSize());
      }
      var U;
      r.Features.HasLinkRelation &&
        (((U = e.create(
          "label",
          "bf-tree-label bf-checkbox"
        )).innerHTML = `\n        <span class="bf-checkbox-value">${BimfaceLanguage.bf_panel_modelTree_fileLink}</span>\n        <input type="checkbox" class="bf-checkbox-input" name="hover" id="linksModeInput">\n        <span class="bf-checkbox-display"></span>`),
        f.appendChild(U),
        U.addEventListener("change", function () {
          A.setTips(BimfaceLanguage.bf_panel_modelTree_loading, "loading"),
            m && A.clear(),
            C(n),
            je(n),
            l.getModels().forEach((e) => {
              e.showAllComponents();
            }),
            l.render();
          var e = document.querySelector("#linksModeInput");
          e && e.checked ? H("links") : H("file");
        }));
      var A = new t.Bimface.UI.Panel.Panel(g);
      A.setContainerHeader(d), A.setContainerFooter(f);
      var D = A.container;
      if (
        ((A.body.style.height = "calc(100% - 41px)"),
        A.setTips(BimfaceLanguage.bf_panel_modelTree_loading, "loading"),
        !h)
      )
        if ((A.addClass("tree-panel"), m))
          A.element.style.fontSize = a.getFontSize();
        else {
          var V = s.offsetWidth,
            z = s.offsetHeight;
          A.element.style.fontSize = (100 * Math.min(V, z, 414)) / 750 + "px";
        }
      A.addEventListener("Hide", function () {
        if (m) {
          var e = i.getControl("ModelTree");
          e && e.setCheckedState(!1),
            (A.element.style.display = "block"),
            A.removeClass("bf-panel-bottom"),
            A.removeClass("bf-panel-tablet");
        }
        i && i.show(), h || ("area" != o && "component" != o && je(n));
        var t = n.getPanel("AreaPropertyPanel");
        t && t.hide(), Oe(l), l.render();
      });
      var H = function (e) {
        o = e;
        const t = document.querySelectorAll(".tree-panel");
        switch (
          (h &&
            t.forEach((e) => {
              e.style.display = "none";
            }),
          A.hideTips(),
          l.getModels().forEach((e) => {
            e.showAllComponents(null, null, !1);
          }),
          l.clearSelectedComponents(),
          e)
        ) {
          case "component":
            h
              ? w.component.panel
                ? ((document.querySelector("#componentPanel").style.display =
                    "block"),
                  (n.tree = w.component.tree),
                  setTimeout(() => {
                    $("componentPanel");
                  }, 0))
                : (A.setTips(
                    BimfaceLanguage.bf_panel_modelTree_loading,
                    "loading"
                  ),
                  W(
                    l,
                    function (e) {
                      "component" == o &&
                        (A.setTips(
                          BimfaceLanguage.bf_panel_modelTree_noComponent
                        ),
                        e &&
                          ((w.component.panel = !0),
                          e.element.setAttribute("id", "componentPanel"),
                          e.element.addClass("tree-panel"),
                          (w.component.tree = e),
                          (n.tree = w.component.tree),
                          D.appendChild(e.element)));
                    },
                    n
                  ))
              : W(
                  l,
                  function (e) {
                    "component" == o &&
                      (A.setTips(
                        BimfaceLanguage.bf_panel_modelTree_noComponent
                      ),
                      (n.tree = e),
                      e && ((D.innerHTML = ""), D.appendChild(e.element)));
                  },
                  n
                );
            break;
          case "modelGroup":
            h
              ? w.modelGroup.panel
                ? ((document.querySelector("#modelGroupPanel").style.display =
                    "block"),
                  (n.tree = w.modelGroup.tree),
                  $("modelGroupPanel"))
                : (A.setTips(
                    BimfaceLanguage.bf_panel_modelTree_loading,
                    "loading"
                  ),
                  Ne(n, function (e) {
                    "modelGroup" == o &&
                      (A.setTips(BimfaceLanguage.bf_panel_modelTree_noData),
                      e &&
                        ((w.modelGroup.panel = !0),
                        e.element.setAttribute("id", "modelGroupPanel"),
                        e.element.addClass("tree-panel"),
                        (w.modelGroup.tree = e),
                        (n.tree = w.modelGroup.tree),
                        D.appendChild(e.element)));
                  }))
              : Ne(n, function (e) {
                  "modelGroup" == o &&
                    (A.setTips(BimfaceLanguage.bf_panel_modelTree_noData),
                    (n.tree = e),
                    e && D.appendChild(e.element));
                });
            break;
          case "mepSystem":
            h
              ? w.mepSystem.panel
                ? ((document.querySelector("#mepSystemPanel").style.display =
                    "block"),
                  (n.tree = w.mepSystem.tree),
                  $("mepSystemPanel"))
                : (A.setTips(
                    BimfaceLanguage.bf_panel_modelTree_loading,
                    "loading"
                  ),
                  qe(n, l, c, function (e) {
                    "mepSystem" == o &&
                      (A.setTips(BimfaceLanguage.bf_panel_modelTree_noSystem),
                      e &&
                        ((w.mepSystem.panel = !0),
                        e.element.setAttribute("id", "mepSystemPanel"),
                        e.element.addClass("tree-panel"),
                        (w.mepSystem.tree = e),
                        (n.tree = w.mepSystem.tree),
                        D.appendChild(e.element)));
                  }))
              : qe(n, l, c, function (e) {
                  "mepSystem" == o &&
                    (A.setTips(BimfaceLanguage.bf_panel_modelTree_noSystem),
                    (n.tree = e),
                    e && D.appendChild(e.element));
                });
            break;
          case "area":
            h
              ? w.area.panel
                ? ((document.querySelector("#areaPanel").style.display =
                    "block"),
                  (n.tree = w.area.tree),
                  $("areaPanel"))
                : (A.setTips(
                    BimfaceLanguage.bf_panel_modelTree_loading,
                    "loading"
                  ),
                  ue(n, function (e) {
                    "area" == o &&
                      (A.setTips(BimfaceLanguage.bf_panel_modelTree_noRoom),
                      e &&
                        ((w.area.panel = !0),
                        e.element.setAttribute("id", "areaPanel"),
                        e.element.addClass("tree-panel"),
                        (w.area.tree = e),
                        (n.tree = w.area.tree),
                        D.appendChild(e.element)));
                  }))
              : ue(n, function (e) {
                  "area" == o &&
                    (A.setTips(BimfaceLanguage.bf_panel_modelTree_noRoom),
                    e && ((n.tree = e), D.appendChild(e.element)));
                });
            break;
          case "file":
            var a = document.querySelector("#linksModeInput");
            h
              ? w.file.panel
                ? a && a.checked && w.links.panel
                  ? ((document.querySelector("#linksPanel").style.display =
                      "block"),
                    (n.tree = w.links.tree),
                    $("linksPanel"))
                  : ((document.querySelector("#filePanel").style.display =
                      "block"),
                    (n.tree = w.file.tree),
                    $("filePanel"))
                : (A.setTips(
                    BimfaceLanguage.bf_panel_modelTree_loading,
                    "loading"
                  ),
                  be(l, function (e) {
                    "file" == o &&
                      (A.setTips(BimfaceLanguage.bf_panel_modelTree_noFile),
                      e &&
                        ((w.file.panel = !0),
                        e.element.setAttribute("id", "filePanel"),
                        e.element.addClass("tree-panel"),
                        (w.file.tree = e),
                        (n.tree = w.file.tree),
                        D.appendChild(e.element)));
                  }))
              : be(l, function (e) {
                  "file" == o &&
                    (A.setTips(BimfaceLanguage.bf_panel_modelTree_noFile),
                    (n.tree = e),
                    e && D.appendChild(e.element));
                });
            break;
          case "links":
            h
              ? w.links.panel
                ? ((document.querySelector("#linksPanel").style.display =
                    "block"),
                  (n.tree = w.links.tree),
                  $("linksPanel"))
                : (A.setTips(
                    BimfaceLanguage.bf_panel_modelTree_loading,
                    "loading"
                  ),
                  we(l, function (e) {
                    "links" == o &&
                      (A.setTips(BimfaceLanguage.bf_panel_modelTree_noFile),
                      e &&
                        ((w.links.panel = !0),
                        e.element.setAttribute("id", "linksPanel"),
                        e.element.addClass("tree-panel"),
                        (w.links.tree = e),
                        (n.tree = w.links.tree),
                        D.appendChild(e.element)));
                  }))
              : we(l, function (e) {
                  "links" == o &&
                    (A.setTips(BimfaceLanguage.bf_panel_modelTree_noFile),
                    (n.tree = e),
                    e && D.appendChild(e.element));
                });
            break;
          case "drawing":
            h
              ? w.drawing.panel
                ? ((document.querySelector("#drawingPanel").style.display =
                    "block"),
                  (n.tree = w.drawing.tree),
                  $("drawingPanel"))
                : (A.setTips(
                    BimfaceLanguage.bf_panel_modelTree_loading,
                    "loading"
                  ),
                  Ie(l, function (e) {
                    "drawing" == o &&
                      (A.setTips(BimfaceLanguage.bf_panel_modelTree_noDrawing),
                      e &&
                        ((w.drawing.panel = !0),
                        e.element.setAttribute("id", "drawingPanel"),
                        e.element.addClass("tree-panel"),
                        (w.drawing.tree = e),
                        (n.tree = w.drawing.tree),
                        D.appendChild(e.element),
                        l.getModels().length > 0 &&
                          l.getModels().map((e) => {
                            e.isMatchedBefore = !1;
                          }),
                        e.addEventListener("SelectionChanged", function (e, t) {
                          if (t)
                            l
                              .getModels()
                              .find(
                                (t) =>
                                  !(
                                    t.isMatchedBefore ||
                                    (t.modelId != e.modelId &&
                                      t._metaDataManager._config.modelId !=
                                        e.modelId)
                                  ) &&
                                  ((e.effectiveModelId = t.modelId),
                                  (t.isMatchedBefore = !0),
                                  !0)
                              ),
                              Ke(n, e);
                          else {
                            var a = n.getPanel("DrawingPanel");
                            a &&
                              n.subViewer &&
                              n.subViewer.isInitialized &&
                              a.hide();
                          }
                        })));
                  }))
              : Ie(l, function (e) {
                  "drawing" == o &&
                    (A.setTips(BimfaceLanguage.bf_panel_modelTree_noDrawing),
                    (n.tree = e),
                    e &&
                      (D.appendChild(e.element),
                      e.addEventListener("SelectionChanged", function (e, t) {
                        if (t)
                          l.getModels().map((t) => {
                            (t.modelId != e.modelId &&
                              t._metaDataManager._config.modelId !=
                                e.modelId) ||
                              (e.effectiveModelId = t.modelId);
                          }),
                            Ke(n, e);
                        else {
                          var a = n.getPanel("DrawingPanel");
                          a &&
                            n.subViewer &&
                            n.subViewer.isInitialized &&
                            a.hide();
                        }
                      })));
                });
        }
        l.render();
      };
      h
        ? 1 == b.filter((e) => "component" == e.id).length
          ? !w.component.panel &&
            W(
              l,
              function (e) {
                "component" == o &&
                  (A.setTips(BimfaceLanguage.bf_panel_modelTree_noComponent),
                  (w.component.tree = e),
                  (n.tree = w.component.tree),
                  (w.component.panel = !0),
                  e.element.setAttribute("id", "componentPanel"),
                  e.element.addClass("tree-panel"),
                  D.appendChild(e.element),
                  e.element.parentElement.addEventListener("scroll", (t) => {
                    requestAnimationFrame(() => {
                      const a = n
                          .getViewer()
                          .dynamicTree._bfComponentsTreeConfigs.filter(
                            (e) => 1 == e.show
                          ),
                        i = e.element.getBoundingClientRect().top,
                        o = t.target.scrollTop,
                        s =
                          n.getViewer().dynamicTree._bfRenderedNodes[
                            Math.floor(
                              n.getViewer().dynamicTree._bfMaxLoadedNodesNum / 3
                            )
                          ],
                        r = s ? s.element.getBoundingClientRect().top - i : -1,
                        c = a.findIndex(
                          (e) =>
                            e.path ==
                            n.getViewer().dynamicTree._bfRenderedNodes[0].path
                        ),
                        d =
                          n.getViewer().dynamicTree._bfRenderedNodes[
                            Math.ceil(
                              (n.getViewer().dynamicTree._bfMaxLoadedNodesNum /
                                3) *
                                2
                            )
                          ],
                        f = d ? d.element.getBoundingClientRect().top - i : -1,
                        m = a.findIndex(
                          (e) =>
                            e.path ==
                            n.getViewer().dynamicTree._bfRenderedNodes[
                              n.getViewer().dynamicTree._bfRenderedNodes
                                .length - 1
                            ].path
                        );
                      if (r > 0 && o < r && c > 0)
                        for (
                          let e = c - 1;
                          e >
                          Math.max(
                            c -
                              Math.ceil(
                                n.getViewer().dynamicTree._bfMaxLoadedNodesNum /
                                  3
                              ),
                            -1
                          );
                          e--
                        ) {
                          const t =
                            n.getViewer().dynamicTree._bfRenderedNodes[
                              n.getViewer().dynamicTree._bfRenderedNodes
                                .length - 1
                            ]._parent;
                          n.getViewer().dynamicTree._bfLoadVirtualNodes(
                            n,
                            t,
                            l,
                            [a[e]],
                            !0,
                            -1
                          );
                          const i = n
                            .getViewer()
                            .dynamicTree._bfRenderedNodes.pop();
                          i.getParent().removeChildNode(i.id);
                        }
                      if (f > 0 && o > f && m < a.length - 1)
                        for (
                          let e = m + 1;
                          e <
                          Math.min(
                            m +
                              Math.floor(
                                n.getViewer().dynamicTree._bfMaxLoadedNodesNum /
                                  3
                              ),
                            a.length
                          );
                          e++
                        ) {
                          const t =
                            n.getViewer().dynamicTree._bfRenderedNodes[0]
                              ._parent;
                          n.getViewer().dynamicTree._bfLoadVirtualNodes(
                            n,
                            t,
                            l,
                            [a[e]],
                            !1,
                            -1
                          );
                          const i = n
                            .getViewer()
                            .dynamicTree._bfRenderedNodes.shift();
                          i.getParent().removeChildNode(i.id);
                        }
                    });
                  }));
              },
              n
            )
          : b.length > 0 && H(b[0].id)
        : W(
            l,
            function (e) {
              "component" == o &&
                (A.setTips(BimfaceLanguage.bf_panel_modelTree_noComponent),
                (D.innerHTML = ""),
                (n.tree = e),
                D.appendChild(e.element));
            },
            n
          ),
        p.addEventListener("Change", function (e) {
          _ &&
            (_.removeClass("active"),
            s.querySelector(`#${_.id}Panel`) &&
              "none" !== s.querySelector(`#${_.id}Panel`).style.display &&
              q(_.id)),
            F(e);
        }),
        u &&
          u.addEventListener("Change", function (e) {
            O(e);
          }),
        _ &&
          _.addEventListener("click", function (e) {
            p.setCurrentOption(""), F(e.target), _.addClass("active");
          });
      var O = function (t) {
          p.setCurrentOption(""),
            (_.innerHTML = t.name),
            _.setAttribute("id", t.id),
            _.setAttribute("title", t.name),
            _.addClass("active");
          var n = d.querySelectorAll(".bf-select-option");
          (n[0].style.display = "block"),
            n.forEach((e) => {
              e.id == t.id
                ? (e.style.display = "none")
                : (e.style.display = "block");
            });
          var a = d.querySelector(".bf-select-current"),
            i = e.create("i", "gld-bf-arrow-right");
          a.appendChild(i), F(t);
        },
        F = function (e) {
          h ||
            (A.setTips(BimfaceLanguage.bf_panel_modelTree_loading, "loading"),
            A.clear()),
            C(n),
            je(n);
          const t = n.getPanel("AreaPropertyPanel");
          t &&
            ("area" != e.id
              ? (t.element.style.display = "none")
              : (t.element.style.display = "block")),
            U &&
              (m
                ? "file" == e.id
                  ? ((U.style.display = "block"),
                    (A.container.style.height = "calc(100% - 3.4em)"))
                  : ((U.style.display = "none"),
                    (A.container.style.height = "100%"))
                : "file" == e.id
                ? ((U.style.display = "block"),
                  (A.container.style.height = "calc(100% - 29px)"))
                : (U.style.display = "none")),
            m ||
              "component" !== e.id ||
              (A.container.style.height = "calc(100% - 29px)"),
            H(e.id);
        };
      const R = () => {
        const e = h
          ? s.getElementsByClassName(
              "bf-panel bf-modelTree-panel bf-sizable"
            )[0]
          : s.getElementsByClassName("bf-panel tree-panel")[0];
        return (
          e && e.getElementsByClassName("bf-panel-container bf-scroll-bar")[0]
        );
      };
      var $ = function (e, t = !0) {
        if (t) {
          const t = e.match(/(\S*)Panel/)[1],
            { initialPanelPosition: i, initialCameraState: o } = w[t];
          requestAnimationFrame(() => {
            l.setCameraStatus(o.status), l.setCameraAnimation(o.animation);
          });
          const s = R();
          if ((s && s.scrollTo(i.x, i.y), n.tree && n.tree._selectionNode)) {
            var a = n.tree._selectionNode;
            a.eventManager.fireEvent("SelectionChanged", a, !0, !0);
          }
        }
        var i = [],
          o = document.querySelectorAll(`#${e} .bf-unchecked`),
          s = document.querySelectorAll(`#${e} .gld-bf-transparent`),
          r = document.querySelectorAll(`#${e} .bf-selected`);
        document.querySelectorAll(`#${e} .gld-bf-untransparent`);
        var c = document.querySelector("#treeRootNode .bf-unchecked"),
          d = document.querySelector("#treeRootNode .gld-bf-transparent");
        if ("componentPanel" == e)
          c
            ? l.getModels().forEach((e) => {
                e.hideAllComponents();
              })
            : o.forEach((e) => {
                e
                  .closest(".bf-sub-tree")
                  .previousSibling.querySelector(".bf-unchecked") || i.push(e);
              }),
            d
              ? l.getModels().forEach((e) => {
                  e.transparentAllComponents();
                })
              : s.forEach((e) => {
                  e
                    .closest(".bf-sub-tree")
                    .previousSibling.querySelector(".gld-bf-transparent") ||
                    i.push(e);
                }),
            r.forEach((e) => {
              e
                .closest(".bf-sub-tree")
                .previousSibling.querySelector(".bf-selected") || i.push(e);
            });
        else i = [...r, ...o, ...s];
        if (((l.multipleClickCalled = !0), "componentPanel" != e))
          i.forEach((e) => {
            e.addClass("bf-restore"),
              e.click(),
              e.removeClass("bf-restore"),
              e.click();
          }),
            requestAnimationFrame(() => {
              delete l.multipleClickCalled, l.render();
            });
        else {
          const e = l.dynamicTree._oldState;
          if (e) {
            if (e.models)
              for (let t in e.models) {
                const n = e.models[t],
                  a = l.getModel(t);
                if (n.axisGrid) {
                  Object.keys(n.axisGrid).length > 0 &&
                    a.setAxisGridsState(n.axisGrid);
                }
              }
            else if (e.axisGrid) {
              Object.keys(e.axisGrid).length > 0 &&
                l.getDefaultModel().setAxisGridsState(e.axisGrid);
            }
            l.getViewer().getFilter().loadState(JSON.stringify(e.state));
          }
        }
      };
      const q = function (e) {
        w[e].initialCameraState = {
          status: l.getCameraStatus(),
          animation: l.getCameraAnimation(),
        };
        const t = R();
        if (t) {
          const { scrollLeft: n, scrollTop: a } = t;
          w[e].initialPanelPosition = { x: n, y: a };
        }
      };
      return (
        A.addEventListener("Show", function () {
          $(`${o}Panel`, !1);
        }),
        A
      );
    };
  })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ModelTree = function (e, n) {
      var a = e.getViewer(),
        i = e.getRootElement(),
        o = (a.viewerType, t.Bimface.UI.Control.ControlEvent),
        l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "ModelTree"),
        (l.title = BimfaceLanguage.bf_btn_modelTree),
        (l.className = "bf-button gld-bf-tree");
      var s = new t.Bimface.UI.Button.Button(l);
      return (
        s.addEventListener(o.Click, function () {
          n.hide();
          var a = e.getPanel("ModelTree");
          if (a) a.show(), e.tree._selectionNode;
          else {
            var o = new t.Bimface.Application.UI.Panel.ModelTreePanel(e, n);
            i.appendChild(o.element), e.addPanel(o);
          }
        }),
        s
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).MobileModelTree = function (e, n) {
      var a = e.getViewer(),
        i = e.getRootElement(),
        o = (a.viewerType, t.Bimface.UI.Control.ControlEvent),
        l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "MobileModelTree"),
        (l.title = "构件树"),
        (l.className = "bf-button gld-bf-tree");
      var s = new t.Bimface.UI.Button.Button(l);
      return (
        s.addEventListener(o.Click, function () {
          n.hide();
          var e = new t.Bimface.Application.UI.Panel.ModelTreePanel(
            a,
            i,
            n,
            !0
          );
          i.appendChild(e.element);
        }),
        s
      );
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Button"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Common.Flexible"
        );
      e.MobileModelTreeNew = function (e, a) {
        var i = e.getViewer(),
          o = e.getRootElement(),
          l = (i.viewerType, t.Bimface.UI.Control.ControlEvent),
          s = new t.Bimface.UI.Button.ButtonConfig();
        (s.id = "ModelTree"),
          (s.title = BimfaceLanguage.bf_btn_modelTree),
          (s.className = "bf-button gld-bf-tree");
        var r,
          c = new t.Bimface.UI.Button.ToggleButton(s),
          d = t.Web.Lang.Utility.ClientHelper.getIsTablet(),
          f = null,
          m = !n.getIsTablet() && i.getIsMobileNew();
        return (
          c.addEventListener(l.StateChange, function (n) {
            m &&
              (r || (r = e.getToolbar("MainToolbar")),
              n ? r && r.hide() : r && r.show()),
              (f = e.getPanel("ModelTree"))
                ? n
                  ? d
                    ? f.addClass("bf-panel-tablet")
                    : f.addClass("bf-panel-bottom")
                  : (f.removeClass("bf-panel-tablet"),
                    f.removeClass("bf-panel-bottom"))
                : ((f = new t.Bimface.Application.UI.Panel.ModelTreePanel(
                    e,
                    a
                  )),
                  o.appendChild(f.element),
                  e.addPanel(f),
                  setTimeout(() => {
                    d
                      ? f.addClass("bf-panel-tablet")
                      : f.addClass("bf-panel-bottom");
                  }, 100));
          }),
          c
        );
      };
    })();
  let et = "build";
  et || (et = "dev");
  var tt = et;
  !(function () {
    let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Panel"
      ),
      n = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
    var a = "dev" == tt;
    e.SettingPanel = function (e) {
      var i,
        o = e.getViewer(),
        l = new t.Bimface.UI.Panel.PanelConfig(),
        s = this,
        r = e.state;
      (a = a ? o.isSupportSSAO() : a),
        (r.GTAO = CLOUD.GlobalData.GTAO),
        (this.viewer = o),
        (i = o._data.dataEnvType == Xe.Local ? o._data.sdkPath : u.staticHost),
        (l.title = BimfaceLanguage.bf_btn_settings),
        (l.id = "Setting"),
        (l.css = {
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-200px)",
          width: "332px",
          height: "auto",
        }),
        (l.enableSizable = !1),
        (l.className = "bf-panel bf-settings-panel");
      var c = {
          1: {
            type: "multiple",
            direction: "0deg",
            colors: [
              {
                color: new t.Web.Graphics.Color(246, 250, 255, 1),
                stop: "10%",
              },
              {
                color: new t.Web.Graphics.Color(214, 224, 235, 1),
                stop: "70%",
              },
            ],
          },
          2: { type: "skybox", skyBoxType: "CloudySky" },
          3: { type: "skybox", skyBoxType: "DarkNight" },
          4: { type: "single", color: new t.Web.Graphics.Color(92, 92, 92, 1) },
          5: { type: "single", color: new t.Web.Graphics.Color(39, 39, 39, 1) },
          6: { type: "single", color: new t.Web.Graphics.Color(50, 71, 91, 1) },
        },
        d = new t.Bimface.UI.Panel.Panel(l),
        f = n.create("form", "bf-setting"),
        m = n.create("div", "bf-setting-foot"),
        p = [
          {
            id: "default",
            name: BimfaceLanguage.bf_panel_settings_interaction,
            title: BimfaceLanguage.bf_panel_settings_interaction,
          },
          {
            id: "effect",
            name: BimfaceLanguage.bf_panel_settings_effect,
            title: BimfaceLanguage.bf_panel_settings_effect,
          },
        ],
        g = new t.Bimface.UI.Tabs.TabsConfig();
      (g.className = "bf-setting-tabs"),
        (g.default = "default"),
        (g.options = p);
      var h = new t.Bimface.UI.Tabs.Tabs(g),
        b = `<ul class="bf-setting-tab-default bf-show">\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_contextMenu
        }</span>\n          <div class="bf-setting-value contextMenu">\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name="menu" ${
          r.menu ? "checked" : ""
        } data-value='true'>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
          BimfaceLanguage.bf_general_on
        }</span>\n            </label>\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name="menu" ${
          r.menu ? "" : "checked"
        } data-value='false'>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
          BimfaceLanguage.bf_general_off
        }</span>\n            </label>\n          </div>\n        </li>\n\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_orbitBtn
        }</span>\n          <div class="bf-setting-value setMouseBehavior">\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name="orbit" ${
          r.hobby ? "checked" : ""
        }>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
          BimfaceLanguage.bf_panel_settings_leftOrbit
        }</span>\n            </label>\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name="orbit" ${
          r.hobby ? "" : "checked"
        }>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
          BimfaceLanguage.bf_panel_settings_rightOrbit
        }</span>\n            </label>\n          </div>\n        </li>\n\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_hover
        }</span>\n          <div class="bf-setting-value mouseHover">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="hover" ${
          r.hover ? "checked" : ""
        }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_settings_hoverEffect
        }</span>\n            </label>\n          </div>\n        </li>\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_zoomDir
        }</span>\n          <div class="bf-setting-value mouseScroll">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="scroll" ${
          r.scroll ? "checked" : ""
        }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_settings_reverseDir
        }</span>\n            </label>\n          </div>\n        </li>\n        </ul>\n\n        <ul class="bf-setting-tab-effect bf-scroll-bar">\n      \n        <li class="bf-setting-li checkbox">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_modelBorder
        }</span>\n          <div class="bf-setting-value">\n            <label class="bf-checkbox setModelBorderLine">\n              <input type="checkbox" class="bf-checkbox-input" name="borderline" ${
          r.borderLine ? "checked" : ""
        }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_settings_displayModelBorder
        }</span>\n            </label>\n          </div>\n        </li>\n        <li class="bf-setting-li checkbox">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_sectionBorder
        }</span>\n          <label class="bf-checkbox setSectionBorderLine" style="margin-left: 8px;">\n            <input type="checkbox" class="bf-checkbox-input" name="borderline" ${
          r.sectionBorderLine ? "checked" : ""
        }>\n            <span class="bf-checkbox-display"></span>\n            <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_settings_displaySectionBorder
        }</span>\n          </label>\n        </li>\n        <li class="bf-setting-li checkbox">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_shadow
        }</span>\n          <div class="bf-setting-value enableShadow">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="shadow" ${
          r.shadow ? "checked" : ""
        }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_settings_enableShadow
        }</span>\n            </label>\n          </div>\n        </li>\n        <li class="bf-setting-li ${
          a ? "" : "bf-setting-none"
        }" style="display:none">\n          <span class="bf-setting-name">SSAO：</span>\n          <div class="bf-setting-value enableSSAO">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="SSAO" ${
          r.SSAO ? "checked" : ""
        }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_setting_ssao
        }</span>\n            </label>\n          </div>\n        </li>\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_exposure
        }</span>\n          <div class="bf-setting-value bf-setting-range" id="exposure"></div>\n        </li>\n        <li class="bf-setting-li checkbox">\n          <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_enhanceRendering
        }</span>\n          <label class="bf-checkbox setSSAO" style="margin-left: 8px;">\n            <input type="checkbox" class="bf-checkbox-input" name="borderline" ${
          r.GTAO ? "checked" : ""
        }>\n            <span class="bf-checkbox-display"></span>\n            <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_settings_enableSSAO
        }</span>\n          </label>\n        </li>\n\n        <li class="bf-li-more">\n          <div class="bf-panel-more">\n            <span>${
          BimfaceLanguage.bf_panel_settings_moreOpt
        }</span>\n            <i class="bf-arrow"></i>\n          </div>\n        </li>\n        <div class="bf-more-list">\n          <li class="bf-setting-li">\n            <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_bgColor
        }</span>\n            <div class="bf-color">\n              <div class="bf-color-item ${
          1 == r.backgroundColor ? "bf-color-select" : ""
        }" data-value="1">\n                <span class="bf-color-node" style="background: linear-gradient(180deg, rgb(214, 224, 235) 10%, rgb(246, 250, 255) 70%)"></span>\n              </div>\n              <div class="bf-color-item ${
          2 == r.backgroundColor ? "bf-color-select" : ""
        }" data-value="2">\n                <span class="bf-color-node" style="background: linear-gradient(180deg, rgb(214, 224, 235) 10%, rgb(246, 250, 255) 70%)">\n                  <img src="${i}/resources/SkyBox/thumbnails/CloudySky.png"/>\n                </span>\n              </div>\n              <div class="bf-color-item ${
          3 == r.backgroundColor ? "bf-color-select" : ""
        }" data-value="3">\n                <span class="bf-color-node" style="background: linear-gradient(180deg, rgb(214, 224, 235) 10%, rgb(246, 250, 255) 70%)">\n                  <img src="${i}/resources/SkyBox/thumbnails/DarkNight.png"/>\n                </span>\n              </div>\n              <div class="bf-color-item ${
          4 == r.backgroundColor ? "bf-color-select" : ""
        }" data-value="4">\n                <span class="bf-color-node" style="background:#5c5c5c;"></span>\n              </div>\n              <div class="bf-color-item ${
          5 == r.backgroundColor ? "bf-color-select" : ""
        }" data-value="5">\n                <span class="bf-color-node" style="background:#272727;"></span>\n              </div>\n              <div class="bf-color-item ${
          6 == r.backgroundColor ? "bf-color-select" : ""
        }" data-value="6">\n                <span class="bf-color-node" style="background:#32475b;"></span>\n              </div>\n            </div>\n          </li>\n          <li style="display:block" class="bf-setting-li checkbox">\n            <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_ambientLight
        }</span>\n            <div class="bf-setting-value ambientLight">\n              <label class="bf-checkbox">\n                <input type="checkbox" class="bf-checkbox-input" name="ambientLight" ${
          r.ambientLight ? "checked" : ""
        }>\n                <span class="bf-checkbox-display"></span>\n                <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_settings_enableAbientLight
        }</span>\n              </label>\n            </div>\n          </li>\n          <li style="display:block" class="bf-thumbnail bf-setting-margin bf-enable-list ${
          r.ambientLight ? "" : "bf-setting-disabled"
        }">\n            <span class="bf-setting-name">${
          BimfaceLanguage.bf_panel_settings_iblSel
        }</span>\n            <div class="bf-thumbnail-value IBL-thumbnail">\n              <label class="${
          "Gray" == r.IBLName
            ? "bf-thumbnail-item selected"
            : "bf-thumbnail-item"
        }" id="Gray">\n                <img  src="${i}/resources/IBL/thumbnails/Gray.png" />\n              </label>\n              <label class="${
          "HarborSunRise" == r.IBLName
            ? "bf-thumbnail-item selected"
            : "bf-thumbnail-item"
        }" id="HarborSunRise">\n                <img src="${i}/resources/IBL/thumbnails/HarborSunRise.png" />\n              </label>\n              <label class="${
          "ParkingLot" == r.IBLName
            ? "bf-thumbnail-item selected"
            : "bf-thumbnail-item"
        }" id="ParkingLot">\n                <img src="${i}/resources/IBL/thumbnails/ParkingLot.png" />\n              </label>\n              <label class="${
          "RiverSide" == r.IBLName
            ? "bf-thumbnail-item selected"
            : "bf-thumbnail-item"
        }" id="RiverSide">\n                <img src="${i}/resources/IBL/thumbnails/RiverSide.png" />\n              </label>\n              <label class="${
          "Sunrise" == r.IBLName
            ? "bf-thumbnail-item selected"
            : "bf-thumbnail-item"
        }" id="Sunrise">\n                <img src="${i}/resources/IBL/thumbnails/Sunrise.png" />\n              </label>\n              <label class="${
          "SunsetGrass" == r.IBLName
            ? "bf-thumbnail-item selected"
            : "bf-thumbnail-item"
        }" id="SunsetGrass">\n                <img src="${i}/resources/IBL/thumbnails/SunsetGrass.png" />\n              </label>\n            </div>\n          </li>\n          <li style="display:block" class="bf-setting-li bf-setting-margin bf-enable-list ${
          r.ambientLight ? "" : "bf-setting-disabled"
        }">\n            <span class="bf-setting-name"></span>\n            <div class="bf-setting-value IBLBackground">\n              <label class="bf-checkbox">\n                <input type="checkbox" class="bf-checkbox-input" name="enableIBLBackground" ${
          r.enableIBLBackground ? "checked" : ""
        }>\n                <span class="bf-checkbox-display"></span>\n                <span class="bf-checkbox-value">${
          BimfaceLanguage.bf_panel_settings_iblBgDisplay
        }</span>\n              </label>\n            </div>\n          </li>\n        </div>\n        </ul>`,
        v = `<div class="bf-reset">\n          <span class="reset">${BimfaceLanguage.bf_panel_settings_restore}</span>\n        </div>`;
      (f.innerHTML = b),
        (m.innerHTML = v),
        h.addEventListener("Change", function (e) {
          "default" == e.id
            ? (d.body
                .querySelector(".bf-setting-tab-default")
                .addClass("bf-show"),
              d.body
                .querySelector(".bf-setting-tab-effect")
                .removeClass("bf-show"))
            : (d.body
                .querySelector(".bf-setting-tab-default")
                .removeClass("bf-show"),
              d.body
                .querySelector(".bf-setting-tab-effect")
                .addClass("bf-show"));
        });
      var y = f.querySelectorAll(".contextMenu .bf-radio-input");
      for (let e = 0, t = y.length; e < t; e++)
        y[e].addEventListener("change", function () {
          s.viewer.toggleContextMenuDisplay();
        });
      var C = f.querySelectorAll(".setMouseBehavior .bf-radio-input");
      for (let e = 0, t = C.length; e < t; e++)
        C[e].addEventListener("change", function () {
          var t = e;
          o.setUseLeftHandedInput(!t);
        });
      var w = f.querySelector(".mouseHover .bf-checkbox-input");
      w.addEventListener("change", function () {
        var e = o.isEnableHover();
        o.enableHover(!e);
      });
      var B = f.querySelector(".mouseScroll .bf-checkbox-input");
      B.addEventListener("change", function () {
        o.setReverseWheelDirection(this.checked);
      });
      var L = f.querySelector(".setModelBorderLine .bf-checkbox-input");
      L.addEventListener("change", function () {
        o.enableWireframe(this.checked), o.render();
      });
      var M = f.querySelector(".setSectionBorderLine .bf-checkbox-input");
      M.addEventListener("change", function () {
        let t = e.getPlugin("SectionBox"),
          n = e.getPlugin("SectionPlane");
        t && t.enableOutline(this.checked),
          n && n.enableOutline(this.checked),
          (e.isSectionOutlineEnabled = this.checked),
          o.render();
      });
      var T = f.querySelector(".setSSAO .bf-checkbox-input");
      T.addEventListener("change", function () {
        o.enableSSAOEffect(this.checked);
      });
      var _ = [
          { id: "low", name: BimfaceLanguage.bf_panel_settings_bestAppear },
          { id: "high", name: BimfaceLanguage.bf_panel_settings_bestPerform },
        ],
        S = new t.Bimface.UI.Select.SelectConfig();
      (S.className = "bf-select bf-select-mode"), (S.options = _);
      var I = f.querySelector(".enableShadow .bf-checkbox-input");
      I.addEventListener("change", function () {
        o.getLightManager().getCSMLight().enableShadow(this.checked),
          o.render();
      }),
        (I.checked = !!CLOUD.GlobalData.EnableCSM);
      var k = f.querySelector(".enableSSAO .bf-checkbox-input");
      k.addEventListener("change", function () {
        o.enableSSAO(this.checked), o.render();
      });
      var x = new t.Web.Lang.Utility.Dom.range({
          element: f.querySelector("#exposure"),
          min: -1,
          max: 1,
          step: 0.1,
          cur: r.exposure,
          change: function (e) {
            o.setExposureShift(e), o.render();
          },
        }),
        E = f.querySelector(".bf-panel-more"),
        N = f.querySelector(".bf-more-list");
      E.addEventListener("click", function () {
        E.toggleClass("bf-show-more"), N.toggleClass("bf-show");
      });
      let P = new t.Bimface.Plugins.SkyBox.SkyBoxManagerConfig();
      P.viewer = o;
      const U = new t.Bimface.Plugins.SkyBox.SkyBoxManager(P);
      var A = f.querySelectorAll(".bf-color .bf-color-item");
      for (let e = 0, t = A.length; e < t; e++)
        A[e].addEventListener("click", function () {
          for (
            var n = this.getAttribute("data-value"),
              a = c[n],
              i = a.type,
              l = 0;
            l < t;
            l++
          )
            A[l].removeClass("bf-color-select");
          if ((A[e].addClass("bf-color-select"), "single" == i)) {
            U.enableSkyBox(!1);
            var s = a.color;
            o.setBackgroundColor(s);
          } else if ("multiple" == i) {
            U.enableSkyBox(!1);
            var r = a.direction,
              d = a.colors;
            o.setBackgroundColors(d, r);
          } else
            (o._opt.skyBoxType = a.skyBoxType),
              a.skyBoxType && U.setStyle(a.skyBoxType),
              U.enableSkyBox(!0);
        });
      var D = f.querySelector(".IBL-thumbnail"),
        V = D.querySelectorAll(".bf-thumbnail-item"),
        z = f.querySelector(".ambientLight .bf-checkbox-input"),
        H = f.querySelectorAll(".bf-enable-list");
      z.addEventListener("change", function () {
        for (var e = this.checked, n = 0; n < H.length; n++)
          H[n].toggleClass("bf-setting-disabled", !e);
        if (e) {
          var a;
          i = f.querySelector(".IBL-thumbnail .selected");
          o.setLightingMode(t.Bimface.Viewer.LightingMode.IBL),
            i
              ? (a = i.getAttribute("id"))
              : (V[0].addClass("selected"), (a = V[0].id)),
            o.loadIBLScene(a, W.checked);
        } else {
          var i;
          o.enableIBLBackground(!1),
            o.setLightingMode(t.Bimface.Viewer.LightingMode.Phong),
            (i = f.querySelector(".IBL-thumbnail .selected")) &&
              i.removeClass("selected"),
            (W.checked = !1),
            U._enabled && U._updateSkyBox(),
            o.render();
        }
      }),
        D.addEventListener("click", function (e) {
          if (o.isEnableIBLBackground() && "IMG" == e.target.nodeName)
            for (
              var n = e.target.parentNode, a = n.id, i = 0, l = V.length;
              i < l;
              i++
            )
              V[i].removeClass("selected"),
                V[i] == n &&
                  (n.addClass("selected"),
                  o.setLightingMode(t.Bimface.Viewer.LightingMode.IBL),
                  o.loadIBLScene(a, W.checked));
        });
      var W = f.querySelector(".IBLBackground .bf-checkbox-input");
      return (
        W.addEventListener("change", function () {
          if (o.isEnableIBLBackground()) {
            var e = this.checked;
            o.enableIBLBackground(e),
              !e && U._enabled && U._updateSkyBox(),
              o.render();
          } else this.checked = !1;
        }),
        m.querySelector(".reset").addEventListener("click", function () {
          h.setCurrentOption("default"),
            (y[r.menu ? 0 : 1].checked = !0),
            o.toggleContextMenuDisplay(r.menu),
            C[0].click(),
            (w.checked = r.hover),
            o.enableHover(r.hover),
            (B.checked = r.scroll),
            o.setReverseWheelDirection(r.scroll),
            (L.checked = r.borderLine),
            o.enableWireframe(r.borderLine),
            (M.checked = r.sectionBorderLine);
          let t = e.getPlugin("SectionBox"),
            n = e.getPlugin("SectionPlane");
          t && t.enableOutline(r.sectionBorderLine),
            n && n.enableOutline(r.sectionBorderLine),
            (e.isSectionOutlineEnabled = r.sectionBorderLine);
          var a = o.getDefaultModel().isShadowDafault();
          o.getLightManager().getCSMLight().enableShadow(a),
            (I.checked = a),
            o.enableSSAO(!1),
            (k.checked = !1),
            x.setProgress(r.exposure),
            o.setExposureShift(r.exposure),
            (T.checked = r.GTAO),
            o.enableSSAOEffect(r.GTAO),
            E.removeClass("bf-show-more"),
            N.removeClass("bf-show"),
            A[0].click(),
            z.checked != r.ambientLight && z.click();
          for (var i = 0, l = V.length; i < l; i++)
            V[i].removeClass("selected"),
              V[i].id == r.IBLName && V[i].addClass("selected");
          (W.checked = r.enableIBLBackground),
            o.loadIBLScene(r.IBLName, r.enableIBLBackground),
            o.render();
        }),
        d.setContainerHeader(h.element),
        d.container.appendChild(f),
        d.container.appendChild(m),
        d
      );
    };
  })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).Setting = function (e, n) {
      var a = e.getViewer(),
        i = e.getRootElement();
      let o = "Viewer3D" == a.viewerType,
        l = "ViewerDrawing" == a.viewerType;
      var s = t.Bimface.UI.Control.ControlEvent;
      if (o || l) {
        var r = new t.Bimface.UI.Button.ButtonConfig();
        (r.id = "Setting"),
          (r.title = BimfaceLanguage.bf_btn_settings),
          (r.className = "bf-button gld-bf-settings");
        var c = new t.Bimface.UI.Button.ToggleButton(r);
        return (
          c.addEventListener(s.StateChange, function (n) {
            var l = e.getPanel("Setting");
            if (
              (n
                ? l
                  ? l.show()
                  : ((l =
                      (o &&
                        new t.Bimface.Application.UI.Panel.SettingPanel(e)) ||
                      new t.Bimface.Application.UI.Panel.PrintModePanel(
                        e
                      )).addEventListener("Hide", function () {
                      c.setCheckedState(!1);
                    }),
                    i.appendChild(l.element),
                    l.bringToFront(),
                    e.addPanel(l))
                : l.hide(),
              o)
            ) {
              let e = t.Bimface.Viewer.Viewer3DEvent;
              a.getEventManager().fireEvent(e.ButtonOnToolbarClicked, {
                id: r.id,
                isChecked: n,
              });
            }
          }),
          c
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        );
      var a = "dev" == tt;
      e.MobileSettingPanel = function (e) {
        var i,
          o = e.getViewer(),
          l = new t.Bimface.UI.Panel.PanelConfig(),
          s = this,
          r = e.state;
        (a = a ? o.isSupportSSAO() : a),
          (this.viewer = o),
          (i =
            o._data.dataEnvType == Xe.Local ? o._data.sdkPath : u.staticHost),
          (l.title = BimfaceLanguage.bf_btn_settings),
          (l.id = "Setting"),
          (l.css = {
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "8em",
            height: "auto",
            borderRadius: ".2133em",
          }),
          (l.enableSizable = !1),
          (l.className = "bf-panel bf-settings-panel");
        var c = {
            1: {
              type: "multiple",
              direction: "0deg",
              colors: [
                {
                  color: new t.Web.Graphics.Color(246, 250, 255, 1),
                  stop: "10%",
                },
                {
                  color: new t.Web.Graphics.Color(214, 224, 235, 1),
                  stop: "70%",
                },
              ],
            },
            2: { type: "skybox", skyBoxType: "CloudySky" },
            3: { type: "skybox", skyBoxType: "DarkNight" },
            4: {
              type: "single",
              color: new t.Web.Graphics.Color(92, 92, 92, 1),
            },
            5: {
              type: "single",
              color: new t.Web.Graphics.Color(39, 39, 39, 1),
            },
            6: {
              type: "single",
              color: new t.Web.Graphics.Color(50, 71, 91, 1),
            },
          },
          d = new t.Bimface.UI.Panel.Panel(l),
          f = n.create("form", "bf-setting"),
          m = n.create("div", "bf-setting-foot"),
          p = [
            {
              id: "effect",
              name: BimfaceLanguage.bf_panel_settings_effect,
              title: BimfaceLanguage.bf_panel_settings_effect,
            },
          ],
          g = new t.Bimface.UI.Tabs.TabsConfig();
        (g.className = "bf-setting-tabs"),
          (g.default = "effect"),
          (g.options = p);
        var h = new t.Bimface.UI.Tabs.Tabs(g),
          b = `\n    <ul class="bf-setting-tab-default">\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_contextMenu
          }</span>\n          <div class="bf-setting-value contextMenu">\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name="menu" ${
            r.menu ? "checked" : ""
          } data-value='true'>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
            BimfaceLanguage.bf_general_on
          }</span>\n            </label>\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name="menu" ${
            r.menu ? "" : "checked"
          } data-value='false'>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
            BimfaceLanguage.bf_general_off
          }</span>\n            </label>\n          </div>\n        </li>\n\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_orbitBtn
          }</span>\n          <div class="bf-setting-value setMouseBehavior">\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name="orbit" ${
            r.hobby ? "checked" : ""
          }>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
            BimfaceLanguage.bf_panel_settings_leftOrbit
          }</span>\n            </label>\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name="orbit" ${
            r.hobby ? "" : "checked"
          }>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
            BimfaceLanguage.bf_panel_settings_rightOrbit
          }</span>\n            </label>\n          </div>\n        </li>\n\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_hover
          }</span>\n          <div class="bf-setting-value mouseHover">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="hover" ${
            r.hover ? "checked" : ""
          }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
            BimfaceLanguage.bf_panel_settings_hoverEffect
          }</span>\n            </label>\n          </div>\n        </li>\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_zoomDir
          }</span>\n          <div class="bf-setting-value mouseScroll">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="scroll" ${
            r.scroll ? "checked" : ""
          }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
            BimfaceLanguage.bf_panel_settings_reverseDir
          }</span>\n            </label>\n          </div>\n        </li>\n        </ul>\n\n        <ul class="bf-setting-tab-effect bf-scroll-bar bf-show">\n      \n        <li class="bf-setting-li checkbox">\n          <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_border
          }</span>\n          <div class="bf-setting-value setBorderLine">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="borderline" ${
            r.borderLine ? "checked" : ""
          }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
            BimfaceLanguage.bf_panel_settings_displayBorder
          }</span>\n            </label>\n          </div>\n        </li>\n        <li class="bf-setting-li checkbox">\n          <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_shadow
          }：</span>\n          <div class="bf-setting-value enableShadow">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="shadow" ${
            r.shadow ? "checked" : ""
          }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
            BimfaceLanguage.bf_panel_settings_enableShadow
          }</span>\n            </label>\n          </div>\n        </li>\n        <li class="bf-setting-li ${
            a ? "" : "bf-setting-none"
          }" style="display:none">\n          <span class="bf-setting-name">SSAO：</span>\n          <div class="bf-setting-value enableSSAO">\n            <label class="bf-checkbox">\n              <input type="checkbox" class="bf-checkbox-input" name="SSAO" ${
            r.SSAO ? "checked" : ""
          }>\n              <span class="bf-checkbox-display"></span>\n              <span class="bf-checkbox-value">${
            BimfaceLanguage.bf_panel_setting_ssao
          }</span>\n            </label>\n          </div>\n        </li>\n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_exposure
          }</span>\n          <div class="bf-setting-value bf-setting-range" id="exposure"></div>\n        </li>\n\n        <li class="bf-li-more">\n          <div class="bf-panel-more">\n            <span>${
            BimfaceLanguage.bf_panel_settings_moreOpt
          }</span>\n            <i class="bf-arrow"></i>\n          </div>\n        </li>\n        <div class="bf-more-list">\n          <li class="bf-setting-li">\n            <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_bgColor
          }</span>\n            <div class="bf-color">\n              <div class="bf-color-item ${
            1 == r.backgroundColor ? "bf-color-select" : ""
          }" data-value="1">\n                <span class="bf-color-node" style="background: linear-gradient(180deg, rgb(214, 224, 235) 10%, rgb(246, 250, 255) 70%)"></span>\n              </div>\n              <div class="bf-color-item ${
            2 == r.backgroundColor ? "bf-color-select" : ""
          }" data-value="2">\n                <span class="bf-color-node" style="background: linear-gradient(180deg, rgb(214, 224, 235) 10%, rgb(246, 250, 255) 70%)">\n                  <img src="${i}/resources/SkyBox/thumbnails/CloudySky.png"/>\n                </span>\n              </div>\n              <div class="bf-color-item ${
            3 == r.backgroundColor ? "bf-color-select" : ""
          }" data-value="3">\n                <span class="bf-color-node" style="background: linear-gradient(180deg, rgb(214, 224, 235) 10%, rgb(246, 250, 255) 70%)">\n                  <img src="${i}/resources/SkyBox/thumbnails/DarkNight.png"/>\n                </span>\n              </div>\n              <div class="bf-color-item ${
            4 == r.backgroundColor ? "bf-color-select" : ""
          }" data-value="4">\n                <span class="bf-color-node" style="background:#5c5c5c;"></span>\n              </div>\n              <div class="bf-color-item ${
            5 == r.backgroundColor ? "bf-color-select" : ""
          }" data-value="5">\n                <span class="bf-color-node" style="background:#272727;"></span>\n              </div>\n              <div class="bf-color-item ${
            6 == r.backgroundColor ? "bf-color-select" : ""
          }" data-value="6">\n                <span class="bf-color-node" style="background:#32475b;"></span>\n              </div>\n            </div>\n          </li>\n          <li style="display:block" class="bf-setting-li checkbox">\n            <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_ambientLight
          }</span>\n            <div class="bf-setting-value ambientLight">\n              <label class="bf-checkbox">\n                <input type="checkbox" class="bf-checkbox-input" name="ambientLight" ${
            r.ambientLight ? "checked" : ""
          }>\n                <span class="bf-checkbox-display"></span>\n                <span class="bf-checkbox-value">${
            BimfaceLanguage.bf_panel_settings_enableAbientLight
          }</span>\n              </label>\n            </div>\n          </li>\n          <li style="display:block" class="bf-thumbnail bf-setting-margin bf-enable-list ${
            r.ambientLight ? "" : "bf-setting-disabled"
          }">\n            <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_iblSel
          }</span>\n            <div class="bf-thumbnail-value IBL-thumbnail">\n              <label class="${
            "Gray" == r.IBLName
              ? "bf-thumbnail-item selected"
              : "bf-thumbnail-item"
          }" id="Gray">\n                <img  src="${i}/resources/IBL/thumbnails/Gray.png" />\n              </label>\n              <label class="${
            "HarborSunRise" == r.IBLName
              ? "bf-thumbnail-item selected"
              : "bf-thumbnail-item"
          }" id="HarborSunRise">\n                <img src="${i}/resources/IBL/thumbnails/HarborSunRise.png" />\n              </label>\n              <label class="${
            "ParkingLot" == r.IBLName
              ? "bf-thumbnail-item selected"
              : "bf-thumbnail-item"
          }" id="ParkingLot">\n                <img src="${i}/resources/IBL/thumbnails/ParkingLot.png" />\n              </label>\n              <label class="${
            "RiverSide" == r.IBLName
              ? "bf-thumbnail-item selected"
              : "bf-thumbnail-item"
          }" id="RiverSide">\n                <img src="${i}/resources/IBL/thumbnails/RiverSide.png" />\n              </label>\n              <label class="${
            "Sunrise" == r.IBLName
              ? "bf-thumbnail-item selected"
              : "bf-thumbnail-item"
          }" id="Sunrise">\n                <img src="${i}/resources/IBL/thumbnails/Sunrise.png" />\n              </label>\n              <label class="${
            "SunsetGrass" == r.IBLName
              ? "bf-thumbnail-item selected"
              : "bf-thumbnail-item"
          }" id="SunsetGrass">\n                <img src="${i}/resources/IBL/thumbnails/SunsetGrass.png" />\n              </label>\n            </div>\n          </li>\n          <li style="display:block" class="bf-setting-li bf-setting-margin bf-enable-list ${
            r.ambientLight ? "" : "bf-setting-disabled"
          }">\n            <span class="bf-setting-name"></span>\n            <div class="bf-setting-value IBLBackground">\n              <label class="bf-checkbox">\n                <input type="checkbox" class="bf-checkbox-input" name="enableIBLBackground" ${
            r.enableIBLBackground ? "checked" : ""
          }>\n                <span class="bf-checkbox-display"></span>\n                <span class="bf-checkbox-value">${
            BimfaceLanguage.bf_panel_settings_iblBgDisplay
          }</span>\n              </label>\n            </div>\n          </li>\n        </div>\n        </ul>`,
          v = `<div class="bf-reset">\n          <span class="reset">${BimfaceLanguage.bf_panel_settings_restore}</span>\n        </div>`;
        (f.innerHTML = b),
          (m.innerHTML = v),
          h.addEventListener("Change", function (e) {
            "default" == e.id
              ? (d.body
                  .querySelector(".bf-setting-tab-default")
                  .addClass("bf-show"),
                d.body
                  .querySelector(".bf-setting-tab-effect")
                  .removeClass("bf-show"))
              : (d.body
                  .querySelector(".bf-setting-tab-default")
                  .removeClass("bf-show"),
                d.body
                  .querySelector(".bf-setting-tab-effect")
                  .addClass("bf-show"));
          });
        var y = f.querySelectorAll(".contextMenu .bf-radio-input");
        for (let e = 0, t = y.length; e < t; e++)
          y[e].addEventListener("change", function () {
            s.viewer.toggleContextMenuDisplay();
          });
        var C = f.querySelectorAll(".setMouseBehavior .bf-radio-input");
        for (let e = 0, t = C.length; e < t; e++)
          C[e].addEventListener("change", function () {
            var t = e;
            o.setUseLeftHandedInput(!t);
          });
        var w = f.querySelector(".mouseHover .bf-checkbox-input");
        w.addEventListener("change", function () {
          var e = o.isEnableHover();
          o.enableHover(!e);
        });
        var B = f.querySelector(".mouseScroll .bf-checkbox-input");
        B.addEventListener("change", function () {
          o.setReverseWheelDirection(this.checked);
        });
        var L = f.querySelector(".setBorderLine .bf-checkbox-input");
        L.addEventListener("change", function () {
          o.enableWireframe(this.checked), o.render();
        });
        var M = [
            { id: "low", name: BimfaceLanguage.bf_panel_settings_bestAppear },
            { id: "high", name: BimfaceLanguage.bf_panel_settings_bestPerform },
          ],
          T = new t.Bimface.UI.Select.SelectConfig();
        (T.className = "bf-select bf-select-mode"), (T.options = M);
        var _ = f.querySelector(".enableShadow .bf-checkbox-input");
        _.addEventListener("change", function () {
          for (
            var e = o.lightManager.getAllDirectionalLights(), t = 0;
            t < e.length;
            t++
          )
            e[t].enableShadow(this.checked);
          o.render();
        }),
          (_.checked =
            4 == CLOUD.GlobalData.LightPreset ||
            6 == CLOUD.GlobalData.LightPreset);
        var S = f.querySelector(".enableSSAO .bf-checkbox-input");
        S.addEventListener("change", function () {
          o.enableSSAO(this.checked), o.render();
        });
        var I = new t.Web.Lang.Utility.Dom.range({
            element: f.querySelector("#exposure"),
            min: -1,
            max: 1,
            step: 0.1,
            cur: r.exposure,
            change: function (e) {
              o.setExposureShift(e), o.render();
            },
          }),
          k = f.querySelector(".bf-panel-more"),
          x = f.querySelector(".bf-more-list");
        k.addEventListener("click", function () {
          k.toggleClass("bf-show-more"), x.toggleClass("bf-show");
        });
        let E = new t.Bimface.Plugins.SkyBox.SkyBoxManagerConfig();
        E.viewer = o;
        const N = new t.Bimface.Plugins.SkyBox.SkyBoxManager(E);
        var P = f.querySelectorAll(".bf-color .bf-color-item");
        for (let e = 0, t = P.length; e < t; e++)
          P[e].addEventListener("click", function () {
            for (
              var n = this.getAttribute("data-value"),
                a = c[n],
                i = a.type,
                l = 0;
              l < t;
              l++
            )
              P[l].removeClass("bf-color-select");
            if ((P[e].addClass("bf-color-select"), "single" == i)) {
              N.enableSkyBox(!1);
              var s = a.color;
              o.setBackgroundColor(s);
            } else if ("multiple" == i) {
              N.enableSkyBox(!1);
              var r = a.direction,
                d = a.colors;
              o.setBackgroundColors(d, r);
            } else
              (o._opt.skyBoxType = a.skyBoxType),
                a.skyBoxType && N.setStyle(a.skyBoxType),
                N.enableSkyBox(!0);
          });
        var U = f.querySelector(".IBL-thumbnail"),
          A = U.querySelectorAll(".bf-thumbnail-item"),
          D = f.querySelector(".ambientLight .bf-checkbox-input"),
          V = f.querySelectorAll(".bf-enable-list");
        D.addEventListener("change", function () {
          for (var e = this.checked, n = 0; n < V.length; n++)
            V[n].toggleClass("bf-setting-disabled", !e);
          if (e) {
            var a;
            i = f.querySelector(".IBL-thumbnail .selected");
            o.setLightingMode(t.Bimface.Viewer.LightingMode.IBL),
              i
                ? (a = i.getAttribute("id"))
                : (A[0].addClass("selected"), (a = A[0].id)),
              o.loadIBLScene(a, z.checked);
          } else {
            var i;
            o.enableIBLBackground(!1),
              o.setLightingMode(t.Bimface.Viewer.LightingMode.Phong),
              (i = f.querySelector(".IBL-thumbnail .selected")) &&
                i.removeClass("selected"),
              (z.checked = !1),
              N._enabled && N._updateSkyBox(),
              o.render();
          }
        }),
          U.addEventListener("click", function (e) {
            if (o.isEnableIBLBackground() && "IMG" == e.target.nodeName)
              for (
                var n = e.target.parentNode, a = n.id, i = 0, l = A.length;
                i < l;
                i++
              )
                A[i].removeClass("selected"),
                  A[i] == n &&
                    (n.addClass("selected"),
                    o.setLightingMode(t.Bimface.Viewer.LightingMode.IBL),
                    o.loadIBLScene(a, z.checked));
          });
        var z = f.querySelector(".IBLBackground .bf-checkbox-input");
        return (
          z.addEventListener("change", function () {
            if (o.isEnableIBLBackground()) {
              var e = this.checked;
              o.enableIBLBackground(e),
                !e && N._enabled && N._updateSkyBox(),
                o.render();
            } else this.checked = !1;
          }),
          m.querySelector(".reset").addEventListener("click", function () {
            h.setCurrentOption("effect"),
              (y[r.menu ? 0 : 1].checked = !0),
              (y[1].checked = !0),
              o.toggleContextMenuDisplay(r.menu),
              C[0].click(),
              (w.checked = r.hover),
              o.enableHover(r.hover),
              (B.checked = r.scroll),
              o.setReverseWheelDirection(r.scroll),
              (L.checked = r.borderLine),
              o.enableWireframe(r.borderLine);
            for (
              var e = o.getDefaultModel().isShadowDafault(),
                t = o.lightManager.getAllDirectionalLights(),
                n = 0;
              n < t.length;
              n++
            )
              t[n].enableShadow(e);
            (_.checked = e),
              o.enableSSAO(!1),
              (S.checked = !1),
              I.setProgress(r.exposure),
              o.setExposureShift(r.exposure),
              k.removeClass("bf-show-more"),
              x.removeClass("bf-show"),
              P[0].click(),
              D.checked != r.ambientLight && D.click();
            n = 0;
            for (var a = A.length; n < a; n++)
              A[n].removeClass("selected"),
                A[n].id == r.IBLName && A[n].addClass("selected");
            (z.checked = r.enableIBLBackground),
              o.loadIBLScene(r.IBLName, r.enableIBLBackground),
              o.render();
          }),
          d.setContainerHeader(h.element),
          d.container.appendChild(f),
          d.container.appendChild(m),
          d
        );
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        );
      e.MobilePrintModePanel = function (e) {
        var a = new t.Bimface.UI.Panel.PanelConfig();
        let i;
        (i = "ViewerDrawingSet" == e.viewerType ? e : e.getViewer()),
          (this.viewer = i),
          (this.status = { print: i.getDisplayMode() }),
          (a.title = BimfaceLanguage.bf_btn_settings),
          (a.id = "Setting"),
          (a.enableSizable = !1),
          (a.className = "bf-panel bf-settings-panel-simple");
        var o = new t.Bimface.UI.Panel.SimplePanel(a),
          l = n.create("div", "bf-panel-simple"),
          s = `\n      <div class="bf-panel-simple-header">\n        <span class="bf-title">${BimfaceLanguage.bf_panel_settings_displayMode}</span>\n        <span class="bf-close"></span>\n      </div>\n      <div class="bf-panel-simple-body">\n        <ul class="bf-panel-list-wrapper">\n          <li class="bf-panel-item bf-active" data-type="0">\n            <span class="bf-panel-item-text">${BimfaceLanguage.bf_panel_settings_normalMode}</span>\n            <span class="bf-panel-item-right gld-bimface"></span>\n          </li>\n          <li class="bf-panel-item" data-type="1">\n            <span class="bf-panel-item-text">${BimfaceLanguage.bf_panel_settings_whiteBgMode}</span>\n            <span class="bf-panel-item-right gld-bimface"></span>\n          </li>\n          <li class="bf-panel-item" data-type="2">\n            <span class="bf-panel-item-text">${BimfaceLanguage.bf_panel_settings_monoBgMode}</span>\n            <span class="bf-panel-item-right gld-bimface"></span>\n          </li>\n        </ul>\n      </div>\n    `;
        l.innerHTML = s;
        for (
          var r = l.querySelectorAll(".bf-panel-item"), c = 0;
          c < r.length;
          c++
        )
          r[c].addEventListener("click", function () {
            for (var e = 0; e < r.length; e++) r[e].removeClass("bf-active");
            var t = this.getAttribute("data-type");
            this.addClass("bf-active"), i.setDisplayMode(t);
          });
        return (
          l.querySelector(".bf-close").addEventListener("click", function () {
            o.hide();
          }),
          o.element.appendChild(l),
          o
        );
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Button"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Common.Flexible"
        );
      e.MobileSetting = function (e, a) {
        var i = e.getViewer(),
          o = e.getRootElement();
        let l = "Viewer3D" == i.viewerType,
          s = "ViewerDrawing" == i.viewerType;
        var r,
          c = !n.getIsTablet() && i.getIsMobileNew(),
          d = t.Bimface.UI.Control.ControlEvent;
        if (l || s) {
          var f = new t.Bimface.UI.Button.ButtonConfig();
          (f.id = "Setting"),
            (f.title = BimfaceLanguage.bf_btn_settings),
            (f.className = "bf-button gld-bf-settings");
          var m = new t.Bimface.UI.Button.ToggleButton(f);
          return (
            m.addEventListener(d.StateChange, function (n) {
              c &&
                (r || (r = e.getToolbar("MainToolbar")),
                n ? r && r.hide() : r && r.show());
              var s = e.getPanel("Setting");
              if (n) {
                var d = a.getControl("ViewButton");
                d && d.setCheckedState && d.setCheckedState(!1),
                  s
                    ? s.show()
                    : ((s = i.getIsMobileNew()
                        ? (l &&
                            new t.Bimface.Application.UI.Panel.MobileSettingPanel(
                              e
                            )) ||
                          new t.Bimface.Application.UI.Panel.MobilePrintModePanel(
                            e
                          )
                        : (l &&
                            new t.Bimface.Application.UI.Panel.SettingPanel(
                              e
                            )) ||
                          new t.Bimface.Application.UI.Panel.PrintModePanel(
                            e
                          )).addEventListener("Hide", function () {
                        m.setCheckedState(!1);
                      }),
                      o.appendChild(s.element),
                      s.bringToFront(),
                      e.addPanel(s));
              } else s.hide();
              if (l) {
                let e = t.Bimface.Viewer.Viewer3DEvent;
                i.getEventManager().fireEvent(e.ButtonOnToolbarClicked, {
                  id: f.id,
                  isChecked: n,
                });
              }
            }),
            m
          );
        }
        console.log("The API is not supported on this viewer.");
      };
    })();
  var nt = function (e, n) {
      e.num || (e.num = 0);
      var a = !1;
      let i = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      var o = i.create("div", "bf-route-form"),
        l = i.create("div", "bf-route-info"),
        s = i.create("div", "bf-route-info-row"),
        r = i.create("span", "bf-route-info-label");
      r.innerText = BimfaceLanguage.bf_panel_nav_name;
      var c = i.create("input", "bf-route-info-input");
      (c.value = e._walkthrough.getName()), s.appendChild(r), s.appendChild(c);
      var d = i.create("div", "bf-route-info-input"),
        f = i.create("div", "bf-route-info-row"),
        m = i.create("span", "bf-route-info-label");
      m.innerText = BimfaceLanguage.bf_panel_nav_time;
      var p = i.create("input", "bf-route-info-time");
      p.setAttribute("type", "number"),
        (p.value = e._walkthrough.walkthroughTime),
        p.setAttribute("min", "1"),
        p.setAttribute("max", "120");
      var u = i.create("span", "bf-route-info-timespan");
      (u.innerHTML = BimfaceLanguage.bf_panel_nav_second),
        d.appendChild(p),
        d.appendChild(u),
        f.appendChild(m),
        f.appendChild(d),
        l.appendChild(s),
        l.appendChild(f);
      var g = i.create("div", "bf-route-title"),
        h = i.create("span", "bf-route-add");
      h.innerHTML = `<i class="bf-icon-add"></i><span>${BimfaceLanguage.bf_panel_nav_addKeyframe}</span>`;
      var b = i.create("span", "bf-route-clear");
      (b.innerText = BimfaceLanguage.bf_panel_nav_clearKeyframe),
        g.appendChild(h),
        g.appendChild(b);
      var v = i.create("div", "bf-route-panel-tips");
      v.innerText = BimfaceLanguage.bf_panel_nav_addHere;
      var y = i.create("ul", "bf-route-list bf-scroll-bar"),
        C = i.create("div", "bf-route-foot"),
        w = i.create("div", "bf-route-control bf-route-disabled");
      (w.innerHTML = `<i class="bf-icon-play"></i><span>${BimfaceLanguage.bf_panel_nav_playnav}</span>`),
        C.appendChild(w),
        o.appendChild(l),
        o.appendChild(g),
        o.appendChild(v),
        o.appendChild(y),
        o.appendChild(C),
        (o.saveWalkthrough = () => {
          if (0 === y.childElementCount) return !1;
          var t = [];
          for (let e = 0; e < y.childElementCount; e++)
            t.push(y.children[e].keyFrame);
          return (
            e.setKeyFrames(t),
            "" !== p.value && parseFloat(p.value) > 0
              ? e.setWalkthroughTime(parseFloat(p.value))
              : ((p.value = e._walkthrough.walkthroughTime),
                d.removeClass("bf-route-info-input-invalid")),
            "" !== c.value
              ? e._walkthrough.setName(c.value)
              : ((c.value = e._walkthrough.getName()),
                c.removeClass("bf-route-info-input-invalid")),
            !0
          );
        });
      var B = function (t, o, l) {
        n._walkthroughManager._tmpDelete &&
          n._walkthroughManager._tmpDelete.walkthrough.num > 0 &&
          !n._walkthroughManager._walkthroughMap[
            n._walkthroughManager._tmpDelete.id
          ] &&
          (n._walkthroughManager._walkthroughMap[
            n._walkthroughManager._tmpDelete.id
          ] = { id: n._walkthroughManager._tmpDelete.id, walkthrough: e }),
          (v.style.display = "none");
        var s = i.create("div", "bf-route-li"),
          r = i.create("div", "bf-route-box"),
          c = i.create("span", "bf-route-button");
        c.innerText = BimfaceLanguage.bf_general_delete;
        var d = i.create("span", "bf-route-button bf-route-play");
        d.innerText = BimfaceLanguage.bf_panel_nav_play;
        var f = i.create("span", "bf-route-name");
        (f.innerText = t),
          l && (s.camera = l),
          (s.keyFrame = o),
          r.appendChild(d),
          r.appendChild(c),
          s.appendChild(f),
          s.appendChild(r),
          s.addEventListener("click", function (e) {
            var t = e.target;
            a ||
              (t != c &&
                t != d &&
                (L
                  ? L !== s &&
                    (L.removeClass("bf-selected"),
                    s.addClass("bf-selected"),
                    (L = s))
                  : (s.addClass("bf-selected"), (L = s)),
                n.setCameraStatus(s.camera)));
          }),
          d.addEventListener("click", function (e) {
            M(s.keyFrame.id);
          }),
          c.addEventListener("click", function (e) {
            L == s && (L = null),
              y.removeChild(s),
              y.childElementCount < 2 && w.addClass("bf-route-disabled"),
              0 == y.childElementCount && (v.style.display = "block");
          }),
          L
            ? (L.after(s), L.removeClass("bf-selected"), (L = null))
            : y.appendChild(s),
          y.childElementCount >= 2 && w.removeClass("bf-route-disabled");
      };
      !(function () {
        var t = e._walkthrough.getKeyFrames();
        if (t && t.length > 0)
          for (var a = 0; a < t.length; a++) {
            let i = t[a],
              o =
                i.name || `${BimfaceLanguage.bf_panel_nav_keyframe}${e.num++}`,
              l = n.getCameraStatus();
            (l.position = n.viewerAdapter.drawingToWorld(i.position)),
              (l.target = n.viewerAdapter.drawingToWorld(i.target)),
              (l.up = { x: 0, y: 0, z: 1 }),
              B(o, i, l);
          }
      })();
      var L = !1;
      c.addEventListener("blur", function () {
        "" === c.value
          ? c.addClass("bf-route-info-input-invalid")
          : c.removeClass("bf-route-info-input-invalid");
      }),
        p.addEventListener("blur", function () {
          "" === p.value || Number(p.value) <= 0
            ? d.addClass("bf-route-info-input-invalid")
            : d.removeClass("bf-route-info-input-invalid");
        }),
        h.addEventListener("click", function () {
          if (!a) {
            let t = n.getCameraStatus(),
              a = `${BimfaceLanguage.bf_panel_nav_keyframe}${e.num++}`,
              i = e.addKeyFrame(a);
            B(a, i, t);
          }
        }),
        b.addEventListener("click", function () {
          a ||
            (e.clearKeyFrames(),
            (y.innerHTML = ""),
            (L = null),
            w.addClass("bf-route-disabled"),
            (v.style.display = "block"));
        });
      var M = function (t) {
        o.saveWalkthrough(),
          e.play(t),
          y.addClass("bf-route-disabled"),
          b.addClass("bf-route-disabled"),
          h.addClass("bf-route-disabled"),
          p.setAttribute("disabled", !0),
          c.setAttribute("disabled", !0),
          (w.innerHTML = `<i class="bf-icon-stop"></i><span>${BimfaceLanguage.bf_panel_nav_stop}</span>`),
          document
            .querySelector(".bf-routes-return")
            .addClass("bf-routes-disabled"),
          (a = !0);
      };
      return (
        w.addEventListener("click", function () {
          this.hasClass("bf-route-disabled") ||
            (a
              ? (y.removeClass("bf-route-disabled"),
                b.removeClass("bf-route-disabled"),
                h.removeClass("bf-route-disabled"),
                p.removeAttribute("disabled"),
                c.removeAttribute("disabled"),
                (this.innerHTML = `<i class="bf-icon-play"></i><span>${BimfaceLanguage.bf_panel_nav_playnav}</span>`),
                e.stop(),
                (L = !1))
              : M());
        }),
        e.stopCallback(function () {
          y.removeClass("bf-route-disabled"),
            b.removeClass("bf-route-disabled"),
            h.removeClass("bf-route-disabled"),
            p.removeAttribute("disabled"),
            c.removeAttribute("disabled"),
            (w.innerHTML = `<i class="bf-icon-play"></i><span>${BimfaceLanguage.bf_panel_nav_playnav}</span>`),
            L && L.removeClass("bf-selected"),
            document
              .querySelector(".bf-routes-return")
              .removeClass("bf-routes-disabled"),
            (a = !1);
        }),
        e.setKeyFrameCallback(function (e) {
          let t = e;
          L && L.removeClass("bf-selected"),
            y.children[t].addClass("bf-selected"),
            (L = y.children[t]);
        }),
        (o.stopWalkthrough = () => {
          a && w.click();
        }),
        o
      );
    },
    at = function (e, n) {
      var a = 0,
        i = !1,
        o = null,
        l = null;
      let s = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      var r = s.create("div", "bf-routes-panel"),
        c = s.create("div", "bf-routes-form"),
        d = s.create("div", "bf-routes-title"),
        f = s.create("span", "bf-routes-create");
      f.innerHTML = `<i class="bf-icon-create"></i><span>${BimfaceLanguage.bf_panel_nav_addWalkthrough}</span>`;
      var m = s.create("span", "bf-routes-return");
      m.innerText = BimfaceLanguage.bf_panel_nav_walkthroughList;
      var p = s.create("div", "bf-routes-split");
      d.appendChild(f), d.appendChild(m), r.appendChild(d), r.appendChild(p);
      var u = s.create("div", "bf-routes-panel-tips");
      u.innerText = BimfaceLanguage.bf_panel_nav_addWalkthroughHere;
      var g = s.create("ul", "bf-routes-list bf-scroll-bar");
      c.appendChild(u), c.appendChild(g), r.appendChild(c);
      let h = function (t) {
        o && (o.stopWalkthrough(), m.click());
        let n = e.getWalkthroughList().data;
        for (let t = 0; t < n.length; t++)
          g.removeChild(
            g.querySelector(`.bf-routes-li[walkthroughId="${n[t].id}"]`)
          ),
            e.removeWalkthrough(n[t].id);
        for (var a in (e.setWalkthroughList(t), e._walkthroughMap))
          B(e._walkthroughMap[a]);
      };
      n.addEventListener(
        t.Bimface.Application.WebApplication3DEvent.initializeWalkthroughData,
        h
      ),
        n.addEventListener(
          t.Bimface.Application.WebApplication3DEvent.RemoveView,
          function (e) {
            0 == e &&
              n.removeEventListener(
                t.Bimface.Application.WebApplication3DEvent
                  .initializeWalkthroughData,
                h
              );
          }
        );
      var b = !1,
        v = !1,
        y = null,
        C = () => {
          (v = !1),
            y &&
              "[object Function]" === Object.prototype.toString.call(y) &&
              y(),
            (y = null);
        },
        w = null,
        B = function (d) {
          if (!i) {
            var p, h;
            if (
              (o && (r.removeChild(o), (o = null)),
              !d || d instanceof MouseEvent)
            ) {
              var B = new t.Bimface.Plugins.Walkthrough.WalkthroughConfig();
              (B.viewer = n),
                (p = new t.Bimface.Plugins.Walkthrough.Walkthrough(B)),
                (h = BimfaceLanguage.bf_panel_nav_walkthrough1 + ++a),
                p.setWalkthroughTime(20),
                (l = e.addWalkthrough(h, p)),
                (o = nt(p, n)),
                r.appendChild(o),
                M(c),
                M(f),
                L(m),
                (w = !0);
            } else
              (p = d.walkthrough),
                (h = d.walkthrough._walkthrough.getName()),
                (l = d.id);
            M(u);
            var T = s.create("div", "bf-routes-li"),
              _ = s.create("div", "bf-routes-box"),
              S = s.create("span", "bf-routes-button");
            S.innerText = BimfaceLanguage.bf_general_edit;
            var I = s.create("span", "bf-routes-button");
            I.innerText = BimfaceLanguage.bf_general_delete;
            var k = s.create("span", "bf-routes-name");
            (k.innerText = h), _.appendChild(S), _.appendChild(I);
            var x = s.create("div", "bf-routes-play"),
              E = s.create("div", "bf-routes-stop");
            T.appendChild(x),
              T.appendChild(E),
              T.appendChild(k),
              T.appendChild(_),
              T.setAttribute("walkthroughId", l);
            var N = (t) => {
                var n = e._walkthroughMap[t],
                  a = n.walkthrough._stopCallback;
                (!a || a.toString().indexOf("originCb") < 0) &&
                  n.walkthrough.stopCallback(() => {
                    a && a(),
                      M(E),
                      L(x),
                      b
                        ? (b = !1)
                        : (g.removeClass("bf-routes-disabled"),
                          f.removeClass("bf-routes-disabled"),
                          (i = !1));
                  });
              },
              P = () => {
                g.querySelector(".bf-selected") &&
                  g.querySelector(".bf-selected").removeClass("bf-selected"),
                  g
                    .querySelector(`.bf-routes-li[walkthroughId="${l}"]`)
                    .addClass("bf-selected");
              },
              U = (a, s) => {
                var d = () => {
                    if (i) {
                      var e = g
                        .querySelector(`.bf-routes-li[walkthroughId="${l}"]`)
                        .querySelector(".bf-routes-stop");
                      e && e.click(), (i = !1);
                    }
                  },
                  p = () => {
                    var t = o.querySelector(".bf-route-control");
                    !t.hasClass("bf-route-disabled") &&
                    t.querySelector(".bf-icon-stop")
                      ? t.click()
                      : e._walkthroughMap[s].walkthrough.bPause &&
                        e._walkthroughMap[s].walkthrough.stop();
                  },
                  B = () => {
                    if ((s !== l && o && (r.removeChild(o), (o = null)), !o)) {
                      l = s;
                      var t = e._walkthroughMap[l];
                      (o = nt(t.walkthrough, n)), N(s), M(o), r.appendChild(o);
                    }
                  };
                switch (a) {
                  case "play":
                    return function (t) {
                      if (v)
                        y = () => {
                          this.click();
                        };
                      else {
                        (b = !1), d(), B(), P();
                        var n = o.querySelector(".bf-route-control");
                        if (
                          !n.hasClass("bf-route-disabled") &&
                          n.querySelector(".bf-icon-play")
                        )
                          n.click();
                        else {
                          if (!e._walkthroughMap[s].walkthrough.bPause) return;
                          e._walkthroughMap[s].walkthrough.play();
                        }
                        (i = !0),
                          g.addClass("bf-routes-disabled"),
                          f.addClass("bf-routes-disabled"),
                          M(x),
                          L(E);
                      }
                    };
                  case "select":
                    return function (e) {
                      (b = !1), l !== s && d(), B(), p(), P();
                      var t = o.querySelector(".bf-route-list");
                      t.childElementCount > 0 &&
                        ((v = !0),
                        n.setCameraStatus(t.firstElementChild.camera, C));
                    };
                  case "stop":
                    return function (t) {
                      (b = !1),
                        i &&
                          (M(E),
                          L(x),
                          e._walkthroughMap[s].walkthrough.pause(),
                          (i = !1),
                          g.removeClass("bf-routes-disabled"),
                          f.removeClass("bf-routes-disabled"));
                    };
                  case "edit":
                    return function (e) {
                      if (((b = !1), !i)) {
                        B(), p(), P(), M(c), M(f), L(m), L(o), (w = !1);
                        var a = o.querySelector(".bf-route-list");
                        a.childElementCount > 0 &&
                          ((v = !0),
                          n.setCameraStatus(a.firstElementChild.camera, C)),
                          n.fireEvent(
                            t.Bimface.Application.WebApplication3DEvent
                              .WalkthroughEdit,
                            { id: l, name: h }
                          );
                      }
                    };
                  case "delete":
                    return function (t) {
                      (b = !1),
                        i ||
                          (g.removeChild(
                            g.querySelector(
                              `.bf-routes-li[walkthroughId="${s}"]`
                            )
                          ),
                          e.removeWalkthrough(s),
                          8 === g.childElementCount &&
                            g.removeClass("bf-routes-list-scroll"),
                          0 === g.childElementCount && L(u));
                    };
                }
              };
            x.addEventListener("click", U("play", l)),
              E.addEventListener("click", U("stop", l)),
              S.addEventListener("click", U("edit", l)),
              I.addEventListener("click", U("delete", l)),
              k.addEventListener("click", U("select", l)),
              N(l),
              g.appendChild(T),
              g.childElementCount > 8 && g.addClass("bf-routes-list-scroll"),
              m.removeClass("bf-routes-disabled"),
              P(),
              n.fireEvent(
                t.Bimface.Application.WebApplication3DEvent.WalkthroughEdit,
                { id: l, name: h }
              );
          }
        };
      function L(e) {
        e.style.display = "block";
      }
      function M(e) {
        e.style.display = "none";
      }
      return (
        f.addEventListener("click", B),
        m.addEventListener("click", function () {
          if (!this.hasClass("bf-routes-disabled")) {
            if (o.saveWalkthrough()) {
              var t = e._walkthroughMap[l];
              t ||
                ((e._walkthroughMap[l] = e._tmpDelete),
                (t = e._tmpDelete),
                delete e._tmpDelete),
                (g
                  .querySelector(`.bf-routes-li[walkthroughId="${l}"]`)
                  .querySelector(".bf-routes-name").innerHTML =
                  t.walkthrough._walkthrough.getName());
            } else
              g
                .querySelector(`.bf-routes-li[walkthroughId="${l}"]`)
                .querySelector(".bf-routes-box")
                .lastElementChild.click(),
                w && a--;
            M(o), M(m), L(c), L(f);
          }
        }),
        (at.loadWalkthrough = function (t) {
          for (var n in (e.setWalkthroughList(t), e._walkthroughMap))
            B(e._walkthroughMap[n]);
        }),
        (at.stopWalkthrough = function () {
          if ("none" !== c.style.display && i) {
            var t = g
              .querySelector(`.bf-routes-li[walkthroughId="${l}"]`)
              .querySelector(".bf-routes-stop");
            t && t.click(),
              (i = !1),
              g.removeClass("bf-routes-disabled"),
              f.removeClass("bf-routes-disabled");
          } else o && o.stopWalkthrough();
          if (o) {
            o.saveWalkthrough()
              ? e._tmpDelete &&
                ((e._walkthroughMap[l] = e._tmpDelete), delete e._tmpDelete)
              : (!e._tmpDelete &&
                  e._walkthroughMap[l] &&
                  (e._tmpDelete = e._walkthroughMap[l]),
                e.removeWalkthrough(l));
          }
        }),
        r
      );
    };
  !(function () {
    t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
    t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Panel"
    ).WalkRoutePanel = function (e) {
      var n = e.getViewer();
      ((a = new t.Bimface.UI.Panel.PanelConfig()).title =
        BimfaceLanguage.bf_panel_nav_walkthrough),
        (a.id = "WalkRoutePanel"),
        (a.css = {
          right: "10px",
          top: "10px",
          width: "300px",
          height: "410px",
        }),
        (a.enableSizable = !1);
      var a,
        i = new t.Bimface.UI.Panel.Panel(a);
      (a =
        new t.Bimface.Plugins.Walkthrough.WalkthroughManagerConfig()).viewer =
        n;
      var o = new t.Bimface.Plugins.Walkthrough.WalkthroughManager(a),
        l = at(o, n);
      i.container.appendChild(l);
      var s = this;
      return (
        (s.isShow = !0),
        i.addEventListener("Show", function () {
          s.isShow = !0;
        }),
        i.addEventListener("Hide", function () {
          at.stopWalkthrough(),
            s.isShow &&
              n.fireEvent(
                t.Bimface.Application.WebApplication3DEvent
                  .WalkthroughStateChanged,
                "Off"
              ),
            (s.isShow = !1);
        }),
        (i.loadWalkthrough = at.loadWalkthrough),
        (i.walkthroughManager = o),
        (o.id = "WalkthroughManager"),
        e.addPlugin(o),
        (n._walkthroughManager = o),
        i
      );
    };
  })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        );
      e.WalkPanel = function (e) {
        var a = e.getViewer(),
          i = e.getRootElement(),
          o = 2,
          l = ["0.25", "0.5", "1", "2", "4", "8", "16"],
          s = t.Bimface.UI.Control.ControlEvent,
          r = a.getDefaultModel()._getMetaDataManager();
        var c = { zh_CN: 560, en_GB: 594, sv_SE: 615, zh_TW: 560 }[
            BimfaceLanguage.name
          ],
          d = {
            element: i,
            className: "bf-panel bf-walk-panel bf-walkthrough-panel",
            id: "WalkPanel",
            css: {
              left: "50%",
              bottom: "10px",
              width: c + "px",
              minWidth: 0,
              minHeight: 0,
              height: "50px",
            },
            title: "",
            enableSizable: !1,
          },
          f = "",
          m = e.getToolbar("MainToolbar").getControl("Map");
        m
          ? ((f = '<div class="bf-button gld-bf-map active"></div>'),
            m.addEventListener(s.StateChange, function (e) {
              e || u.querySelector(".gld-bf-map").removeClass("active");
            }))
          : ((c -= 50), (d.css.width = c + "px"));
        var p = new t.Bimface.Application.Panel(d),
          u = n.create("div", "bf-person"),
          g = `<div class="bf-walk-button">${f}</div>\n      <div class="bf-walk-button">\n        <div class="bf-button gld-bf-route" title="${BimfaceLanguage.bf_panel_nav_walkthrough}"></div>\n      </div>\n      <div class="bf-walk-button">\n        <div class="bf-button gld-bf-third-person-lg" title="${BimfaceLanguage.bf_panel_nav_tip_first_person}"></div>\n      </div>\n      <div  class="bf-walk-button person-select"></div>\n      <div  class="bf-walk-button mode-select"></div>\n      <div class="bf-walk-speed">\n        <span class="bf-walk-name">${BimfaceLanguage.bf_panel_nav_speed}</span>\n        <span class="gld-bf-minus speedBtn"></span><span class="speedNum">${l[o]} X</span>\n        <span class="gld-bf-add speedBtn"></span>\n      </div>\n      <label class="bf-checkbox bf-walk-label bf-walk-gravity-wrap">\n        <input type="checkbox" class="bf-checkbox-input bf-walk-gravity" name="gravity">\n        <span class="bf-checkbox-display "></span>\n        <span class="bf-checkbox-value">${BimfaceLanguage.bf_panel_nav_gravity}</span>\n      </label>\n      <label class="bf-checkbox bf-walk-label  bf-walk-collision-wrap">\n        <input type="checkbox" class="bf-checkbox-input bf-walk-collision" name="collision"}>\n        <span class="bf-checkbox-display"></span>\n        <span class="bf-checkbox-value">${BimfaceLanguage.bf_panel_nav_collision}</span>\n      </label>\n      <span class="bf-walk-exit">${BimfaceLanguage.bf_general_exit}</span>`;
        u.innerHTML = g;
        let h = u.querySelector(".gld-bf-route"),
          b = u.querySelector(".gld-bf-third-person-lg");
        u.querySelector(".gld-bf-add").addEventListener("click", function () {
          o < l.length - 1 && (o++, z());
        }),
          u
            .querySelector(".gld-bf-minus")
            .addEventListener("click", function () {
              o && (o--, z());
            }),
          m && u.querySelector(".gld-bf-map").addEventListener("click", H),
          h.addEventListener("click", function () {
            var n = this,
              o = u.querySelectorAll(".bf-walk-label"),
              l = e.getPanel("WalkRoutePanel");
            if (n.hasClass("active")) {
              n.removeClass("active"), l && l.hide();
              for (var s = 0; s < o.length; s++)
                o[s].removeClass("bf-walk-disabled"),
                  (D.disabled = !1),
                  (V.disabled = !1);
            } else {
              if ((n.addClass("active"), b.hasClass("active") && b.click(), l))
                l.show();
              else {
                var c = new t.Bimface.Application.UI.Panel.WalkRoutePanel(e);
                c.addEventListener("Hide", function () {
                  n.removeClass("active");
                  for (var e = 0; e < o.length; e++)
                    o[e].removeClass("bf-walk-disabled"),
                      (D.disabled = !1),
                      (V.disabled = !1);
                  (D.disabled = !1), (V.disabled = !1);
                }),
                  i.appendChild(c.element),
                  e.addPanel(c),
                  a._manifest &&
                    a._manifest.Features_ext &&
                    a._manifest.Features_ext.HasWalkthrough &&
                    (function () {
                      var t = e.getPanel("WalkRoutePanel");
                      if (!t) return;
                      r.getWalkthrough(function (e) {
                        t.loadWalkthrough(e);
                      });
                    })();
              }
              for (s = 0; s < o.length; s++) o[s].addClass("bf-walk-disabled");
              (D.checked = !1),
                (D.disabled = !0),
                a.enableGravity(!1),
                (V.checked = !1),
                (V.disabled = !0),
                a.enableHitDetection(!1),
                a.fireEvent(
                  t.Bimface.Application.WebApplication3DEvent
                    .WalkthroughStateChanged,
                  "On"
                );
            }
          }),
          b.addEventListener("click", function (e) {
            _ = !_;
            let n = e.target,
              o = u.querySelector(".bf-walk-gravity-wrap");
            if (_) {
              if (
                ((L = "Walking"),
                (p.element.style.width = c + 140 + "px"),
                a.addEventListener(x.ComponentsSelectionChanged, E),
                U("select"),
                T.setCurrentOption("Walking", !0),
                w.setCurrentOption(a.getAvatar(), !0),
                i.addClass("walk-Third-person"),
                h.hasClass("active"))
              ) {
                if (document.querySelector(".bf-icon-stop")) return;
                let e = document.querySelectorAll(".bf-routes-stop");
                for (let t = 0; t < e.length; t++) {
                  if ("block" == e[t].style.display) return;
                }
                h.click();
              }
              u.addClass("bf-third-person-mode"),
                n.addClass("active"),
                (n.title = BimfaceLanguage.bf_panel_nav_tip_third_person);
            } else {
              a.removeEventListener(x.ComponentsSelectionChanged, E),
                U(),
                (p.element.style.width = c + "px"),
                u.removeClass("bf-third-person-mode"),
                o.removeClass("bf-walk-disabled"),
                I.removeClass("bf-walk-disabled"),
                n.removeClass("active"),
                i.removeClass("walk-Third-person"),
                (n.title = BimfaceLanguage.bf_panel_nav_tip_first_person);
              const e = t.Bimface.Viewer.NavigationMode3D;
              a.setNavigationMode(1 === S ? e.Select : e.Walk);
            }
            S = 0;
          }),
          p.container.appendChild(u);
        var v = [
          { id: "OfficeMale", name: BimfaceLanguage.bf_panel_nav_office_male },
          {
            id: "ConstructionWorker",
            name: BimfaceLanguage.bf_panel_nav_construction_worker,
          },
        ];
        let y = a.getAvatar(),
          C = new t.Bimface.UI.Select.SelectConfig();
        (C.className = "bf-select bf-select-mode"),
          (C.options = v),
          (C.position = "top");
        let w = new t.Bimface.UI.Select.Select(C);
        u.querySelector(".person-select").appendChild(w.element),
          w.setCurrentOption(y, !0),
          w.addEventListener("Change", function (e) {
            y !== e.id &&
              ((y = e.id),
              a.setAvatar(y),
              a.getViewer().getCurrentEditorName() ==
                CLOUD.EditorMode.THIRDPERSONWALK && k());
          });
        var B = [
          { id: "Walking", name: BimfaceLanguage.bf_panel_nav_walking },
          { id: "Running", name: BimfaceLanguage.bf_panel_nav_running },
        ];
        let L = "Walking",
          M = new t.Bimface.UI.Select.SelectConfig();
        (M.className = "bf-select bf-select-mode"),
          (M.options = B),
          (M.position = "top");
        let T = new t.Bimface.UI.Select.Select(M);
        u.querySelector(".mode-select").appendChild(T.element),
          T.addEventListener("Change", function (e) {
            (L = e.id),
              a.getViewer().getCurrentEditorName() ==
                CLOUD.EditorMode.THIRDPERSONWALK && k();
          });
        let _ = !1,
          S = 0,
          I = u.querySelector(".bf-walk-collision-wrap");
        function k(e) {
          (e = e || a.getObjectPosition()),
            (V.disabled = !1),
            i.removeClass("walk-Third-person"),
            U(),
            "Walking" == L
              ? ((o = 1),
                a.setNavigationMode(
                  t.Bimface.Viewer.NavigationMode3D.ThirdPerson,
                  { position: e }
                ))
              : ((o = 3),
                a.setNavigationMode(
                  t.Bimface.Viewer.NavigationMode3D.ThirdPersonRun,
                  { position: e }
                )),
            z();
        }
        const x = t.Bimface.Viewer.Viewer3DEvent;
        let E = function (e) {
          e.worldPosition &&
            (k(e.worldPosition),
            a.enableGravity(D.checked),
            a.enableHitDetection(V.checked),
            a.clearSelectedComponents(),
            a.removeEventListener(x.ComponentsSelectionChanged, E));
        };
        var N = new t.Bimface.UI.Tips.TipsConfig();
        (N.element = i), (N.html = "");
        var P = new t.Bimface.UI.Tips.Tips(N);
        let U = function (e) {
          let t =
            "select" === e
              ? `<div>${BimfaceLanguage.bf_panel_nav_walkTips4}</div>`
              : `<div>\n                            ${BimfaceLanguage.bf_panel_nav_walkTips1}\n                            <span class="bf-tips-key">W</span>\n                            <span class="bf-tips-key">A</span>\n                            <span class="bf-tips-key">S</span>\n                            <span class="bf-tips-key">D</span>\n                            ${BimfaceLanguage.bf_panel_nav_walkTips2}\n                            <span class="bf-tips-key">Q</span>\n                            <span class="bf-tips-key">E</span>\n                            ${BimfaceLanguage.bf_panel_nav_walkTips3}\n                            </div>`;
          P.setHtml(t);
        };
        U(),
          CLOUD.EditorConfig.NoKey && P.hide(),
          u
            .querySelector(".bf-walk-exit")
            .addEventListener("click", function () {
              b.hasClass("active") && ((S = 1), b.click()), p.hide();
              for (var t = e.getToolbars(), n = 0; n < t.length; n++)
                t[n].show();
            }),
          p.addEventListener("Close", function () {
            P.close();
          }),
          p.addEventListener("Hide", function () {
            P.hide(), i.removeClass("walker");
            var t = e.getPanel("WalkRoutePanel");
            t && t.hide();
          }),
          p.addEventListener("Show", function () {
            CLOUD.EditorConfig.NoKey || P.show(),
              i.addClass("walker"),
              _ && k(),
              m && H(!0);
          });
        var A = u.querySelector(".speedNum"),
          D = u.querySelector(".bf-walk-gravity");
        D.addEventListener("change", function () {
          a.enableGravity(this.checked);
        }),
          (D.checked = !0),
          a.enableGravity(!0);
        var V = u.querySelector(".bf-walk-collision");
        function z() {
          var e = l[o];
          (A.innerText = e + "X"), a.setFlySpeedRate(parseFloat(e));
        }
        function H(e) {
          var t,
            n = u.querySelector(".gld-bf-map"),
            a = document.querySelector(".gld-bf-min-");
          a && a.click(),
            !0 === e ? ((t = !0), i.addClass("walker")) : (t = !m._checked),
            t ? n.addClass("active") : n.removeClass("active"),
            m.setCheckedState(t);
        }
        return (
          V.addEventListener("change", function () {
            a.enableHitDetection(this.checked);
          }),
          (V.checked = !0),
          a.enableHitDetection(!0),
          m && H(!0),
          z(),
          (p.destroy = function () {
            P.destroy(), p.__proto__.destroy.call(p);
          }),
          p
        );
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        );
      e.WalkMobilePanel = function (e) {
        var a = e.getViewer(),
          i = e.getRootElement(),
          o = 2,
          l = ["0.25", "0.5", "1", "2", "4", "8", "16"],
          s = a.getViewer(),
          r = {
            element: i,
            className: "bf-panel bf-walk-panel",
            id: "WalkPanel",
            css: {
              minWidth: "auto",
              minHeight: "auto",
              bottom: "0.12em",
              width: "100%",
              height: "3.5em",
            },
            title: "",
            enableSizable: !1,
          },
          c = new t.Bimface.Application.Panel(r),
          d = n.create("div", "bf-quit");
        (d.innerHTML = `<span class="bf-walk-exit">${BimfaceLanguage.bf_general_exit}</span><span class='close'></span>`),
          i.appendChild(d),
          c.addEventListener("Show", function () {
            d.style.display = "block";
          });
        var f = n.create("div", "bf-person"),
          m = `<div class="person-btns">\n        <span class="gld-bf-minus speedBtn"></span>\n        <span class="speedNum">${l[o]} X</span>\n        <span class="gld-bf-add speedBtn"></span>\n        <label class="bf-checkbox bf-walk-gravity">\n          <input type="checkbox" class="bf-checkbox-input bf-walk-input" name="gravity"}>\n          <span class="bf-checkbox-display"></span>\n          <span class="bf-checkbox-value">${BimfaceLanguage.bf_panel_nav_gravity}</span>\n        </label>\n        <div class='jump'>\n          <span class="bf-button gld-bf-up arrow-up"></span>\n          <span class="bf-button gld-bf-down arrow-down"></span>\n        </div>\n      </div>`,
          p = n.create("div", "controllerPanel");
        (f.innerHTML = m),
          (p.innerHTML = '<div class="ball"></div>'),
          p.addEventListener("touchstart", function (e) {
            e.preventDefault(), (C = e.touches[0]), T();
          }),
          p.addEventListener("touchmove", function (e) {
            e.preventDefault(), (C = e.touches[0]), T();
          }),
          p.addEventListener("touchend", function (e) {
            _("refresh"), M();
          }),
          f
            .querySelector(".gld-bf-add")
            .addEventListener("click", function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                o < l.length - 1 && (o++, B());
            }),
          f
            .querySelector(".gld-bf-minus")
            .addEventListener("click", function (e) {
              e.preventDefault(), e.stopPropagation(), o && (o--, B());
            }),
          f
            .querySelector(".arrow-up")
            .addEventListener("touchstart", function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                s.moveTo(CLOUD.MoveDirection.UP, 1);
            }),
          f
            .querySelector(".arrow-down")
            .addEventListener("touchstart", function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                s.moveTo(CLOUD.MoveDirection.DOWN, 1);
            }),
          f.querySelector(".arrow-up").addEventListener("touchend", M),
          f.querySelector(".arrow-down").addEventListener("touchend", M),
          c.container.appendChild(f),
          c.element.appendChild(p),
          d.addEventListener("click", function () {
            c.hide(), (d.style.display = "none");
            for (var t = e.getToolbars(), n = 0; n < t.length; n++) t[n].show();
            window.removeEventListener("resize", L);
          });
        var u,
          g,
          h,
          b,
          v,
          y,
          C,
          w = f.querySelector(".speedNum");
        function B() {
          var e = l[o];
          (w.innerText = e + "X"), a.setFlySpeedRate(parseFloat(e));
        }
        function L() {
          (u = p.getBoundingClientRect()),
            (g = [u.left + 0.5 * u.width, u.top + 0.5 * u.height]),
            (h = p.querySelector(".ball")),
            (v = s.getCurrentEditor()),
            (y = {
              panelRadius: u.width / 2,
              radiusPow: Math.pow(u.width / 2, 2),
              smallRadiusPow: Math.pow((u.width - h.offsetWidth) / 2, 2),
              up: [(u.width - h.offsetWidth) / 2, 0],
              down: [(u.width - h.offsetWidth) / 2, u.height - h.offsetHeight],
              left: [0, (u.height - h.offsetHeight) / 2],
              right: [u.width - h.offsetWidth, (u.height - h.offsetHeight) / 2],
              refresh: [
                (u.width - h.offsetWidth) / 2,
                (u.height - h.offsetHeight) / 2,
              ],
            }),
            a.setFlySpeedRate(parseFloat(1));
        }
        function M() {
          s.moveTo(CLOUD.MoveDirection.FORWARD, 1, !1),
            s.moveTo(CLOUD.MoveDirection.BACK, 1, !1),
            s.moveTo(CLOUD.MoveDirection.UP, 1, !1),
            s.moveTo(CLOUD.MoveDirection.DOWN, 1, !1);
        }
        function T() {
          var e = C.pageY - g[1],
            t = C.pageX - g[0];
          _(
            (b = e / t) > 0
              ? b > 2.2
                ? e > 0
                  ? "down"
                  : "up"
                : e > 0
                ? "right"
                : "left"
              : b < -2.2
              ? e > 0
                ? "down"
                : "up"
              : e > 0
              ? "left"
              : "right"
          );
        }
        function _(e) {
          switch ((M(), e)) {
            case "up":
              s.moveTo(CLOUD.MoveDirection.FORWARD, 1), s.render();
              break;
            case "down":
              s.moveTo(CLOUD.MoveDirection.BACK, 1), s.render();
              break;
            case "left":
              v._doRotate({ x: -1, y: 0 });
              break;
            case "right":
              v._doRotate({ x: 1, y: 0 });
          }
          "refresh" == e ? S() : S(C);
        }
        function S(e) {
          if (e) {
            var t = e.pageX - g[0],
              n = e.pageY - g[1],
              a = Math.pow(t, 2),
              i = Math.pow(n, 2),
              o = i + a;
            if (Math.sqrt(o) + h.offsetWidth / 2 < y.panelRadius)
              var l = e.pageY - h.offsetHeight / 2 - u.top,
                s = e.pageX - h.offsetWidth / 2 - u.left;
            else {
              var r = Math.sqrt((y.smallRadiusPow * a) / o),
                c = Math.sqrt((y.smallRadiusPow * i) / o);
              (s =
                e.pageX - g[0] > 0
                  ? y.panelRadius + r - h.offsetWidth / 2
                  : y.panelRadius - r - h.offsetWidth / 2),
                (l =
                  e.pageY - g[1] > 0
                    ? y.panelRadius + c - h.offsetWidth / 2
                    : y.panelRadius - c - h.offsetWidth / 2);
            }
            (h.style.left = s + "px"), (h.style.top = l + "px");
          } else
            (h.style.left = y.refresh[0] + "px"),
              (h.style.top = y.refresh[1] + "px");
        }
        return (
          f
            .querySelector(".bf-walk-input")
            .addEventListener("change", function () {
              a.enableGravity(this.checked);
            }),
          L(),
          window.addEventListener("resize", L),
          c
        );
      };
    })(),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Button"
      ).Walk = function (e, n) {
        var a = e.getViewer(),
          i = e.getRootElement(),
          o = "Viewer3D" === a.viewerType,
          l = t.Bimface.UI.Control.ControlEvent,
          s = t.Bimface.Viewer.Viewer3DEvent;
        if (o) {
          var r = new t.Bimface.UI.Button.ButtonConfig();
          (r.id = "Walk"),
            (r.title = BimfaceLanguage.bf_btn_nav),
            (r.className = "bf-button gld-bf-firstperson");
          var c,
            d,
            f = new t.Bimface.UI.Button.ToggleButton(r);
          a.getViewer();
          return (
            f.addEventListener(l.StateChange, function () {
              if (
                (a
                  .getEventManager()
                  .fireEvent(s.ButtonOnToolbarClicked, {
                    id: r.id,
                    isChecked: f.isChecked(),
                  }),
                f.isChecked())
              ) {
                let s = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
                var o = n.getControl("RectangleSelect");
                o && o.setCheckedState(!1);
                var l = n.getControl("ViewButton");
                l && l.setCheckedState && l.setCheckedState(!1),
                  a.setNavigationMode(t.Bimface.Viewer.NavigationMode3D.Select);
                var m = n.getControl("Measure");
                m && m.setCheckedState(!1), y(e);
                var p = n.getControl("RectangleSelect");
                p && p.setCheckedState(!1);
                var u = n.getControl("Property");
                u && u.setCheckedState(!1);
                var g = n.getControl("Information");
                g && g.setCheckedState(!1);
                var h = n.getControl("Setting");
                h && h.setCheckedState(!1),
                  e.modelTreePanel && e.modelTreePanel.hide();
                for (
                  var b = e.getToolbars(), v = e.getPanels(), C = 0;
                  C < v.length;
                  C++
                )
                  "WalkPanel" != v[C].id &&
                    "MapPanel" != v[C].id &&
                    v[C].isDisplay() &&
                    v[C].hide();
                for (var w = 0; w < b.length; w++) b[w].hide();
                if (
                  ((d = !!document.querySelector(".bf-house canvas")),
                  a.setNavigationMode(t.Bimface.Viewer.NavigationMode3D.Walk),
                  a.hideViewHouse(),
                  a.getModels().forEach((e) => {
                    e.setSelectedComponentsById();
                  }),
                  a.render(),
                  c)
                )
                  return void c.show();
                (c = s
                  ? new t.Bimface.Application.UI.Panel.WalkPanel(e)
                  : new t.Bimface.Application.UI.Panel.WalkMobilePanel(
                      e
                    )).addEventListener("Hide", function () {
                  f.setCheckedState(!1);
                }),
                  i.appendChild(c.element),
                  c.bringToFront(),
                  e.addPanel(c);
              } else {
                for (b = e.getToolbars(), w = 0; w < b.length; w++) b[w].show();
                a.setNavigationMode(
                  t.Bimface.Viewer.NavigationMode3D.PickWithRect
                ),
                  d && a.showViewHouse(),
                  c.hide();
              }
            }),
            f
          );
        }
        console.log("The API is not supported on this viewer.");
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).Interactive = function (e, n) {
      var a = "Viewer3D" === e.getViewer().viewerType,
        i = t.Bimface.UI.Control.ControlEvent;
      if (a) {
        var o = new t.Bimface.UI.Button.ButtonConfig();
        (o.id = "Interactive"), (o.title = "交互"), (o.inheritTitle = !0);
        var l = new t.Bimface.UI.Button.ComboBox(o),
          s = new t.Bimface.UI.Button.ButtonConfig();
        (s.id = "OrbitPoint"),
          (s.title = "绕构件旋转"),
          (s.className = "bf-button gld-bf-orbit");
        var r = new t.Bimface.UI.Button.ComboBoxOptionButton(s),
          c = new t.Bimface.UI.Button.ButtonConfig();
        (c.id = "OrbitCamera"),
          (c.title = "绕相机旋转"),
          (c.className = "bf-button gld-bf-pan");
        var d = new t.Bimface.UI.Button.ComboBoxOptionButton(c),
          f = new t.Bimface.UI.Button.ButtonConfig();
        (f.id = "OrbitCamera"),
          (f.title = "绕相机旋转"),
          (f.className = "bf-button gld-bf-zoom");
        var m = new t.Bimface.UI.Button.ComboBoxOptionButton(f);
        return (
          l.addControl(r),
          l.addControl(d),
          l.addControl(m),
          l.addEventListener(i.Change, function (e) {}),
          l.addEventListener(i.Click, function (e) {
            var t = n.getControl("ViewButton");
            t && t.recover();
          }),
          l
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Panel"
      ).MapPanel = function (n) {
        var a = n.getViewer(),
          i = new t.Bimface.UI.Panel.PanelConfig();
        (i.title = ""),
          (i.id = "MapPanel"),
          (i.css = {
            left: "12px",
            bottom: "10px",
            width: "300px",
            height: "240px",
          }),
          (i.className = "bf-panel bf-map bf-map-panel"),
          (i.enableSizable = !1);
        var o = new t.Bimface.UI.Panel.Panel(i),
          l = t.Bimface.Plugins.Map.MapEvents,
          s = e.create("div", "bf-map-header"),
          r = e.create("div", "bf-map-move"),
          c = e.create("div", "bf-map-foot"),
          d = e.create("div", "bf-map-container"),
          f = e.create("i", "bf-map-fit-panel-min gld-bimface gld-bf-fitpanel"),
          m = e.create("i", "bf-map-screen gld-bimface gld-bf-max-"),
          p = e.create("div", "bf-map-right");
        (c.innerHTML = `<div class="bf-map-left"><i class="gld-bimface gld-bf-information"></i><span>${BimfaceLanguage.bf_panel_map_cut}</span></div>`),
          c.appendChild(p);
        var u = new t.Bimface.Plugins.Map.MapConfig();
        (u.viewer = a),
          (u.hasFloor = a._manifest.Features.HasMiniMap),
          (u.domElement = d),
          (u.width = 298),
          (u.height = 198),
          (u.maxPixel = 800),
          (u.id = "Map"),
          (u.mapHeader = s),
          (u.mapEvents = l),
          (u.loadAsync = !0);
        var g = new t.Bimface.Plugins.Map.Map(u);
        m.addEventListener("click", function () {
          o.showAsFull(m.hasClass("gld-bf-max-")), B && B.hide();
        }),
          f.addEventListener("click", function () {
            g.clearZoomAndPan(), (f.getCss().display = "none");
          });
        var h = new t.Bimface.UI.Button.ButtonConfig();
        (h.id = "mapIsolate"),
          (h.title = BimfaceLanguage.bf_panel_map_isolation),
          (h.className = "bf-map-button bf-map-isolate");
        var b = new t.Bimface.UI.Button.Button(h);
        b.setHtml(BimfaceLanguage.bf_panel_map_isolation),
          b.addEventListener("Click", function () {
            !(function (e) {
              e.getToolbar("MainToolbar"),
                C(e),
                e.tree && e.tree.clear(!0),
                a.restoreDefault();
            })(n);
            var e = g.getBoundingBox();
            a.isolateByBox(e, t.Bimface.Viewer.IsolateOption.HideOthers),
              a.zoomToBoundingBox(e),
              g.clear(),
              B.hide(),
              a.render();
          });
        var v = new t.Bimface.UI.Button.ButtonConfig();
        (v.id = "mapSection"),
          (v.title = BimfaceLanguage.bf_panel_map_section),
          (v.className = "bf-map-button bf-map-section");
        var y = new t.Bimface.UI.Button.Button(v);
        y.setHtml(BimfaceLanguage.bf_panel_map_section),
          y.addEventListener("Click", function () {
            var e = g.getBoundingBox();
            C(n), L(n, e), g.clear(), B.hide(), a.render();
          });
        var w = new t.Bimface.UI.Button.ButtonConfig();
        (w.id = "mapCancel"),
          (w.title = BimfaceLanguage.bf_general_cancel),
          (w.className = "bf-map-button bf-map-cancel");
        var B,
          M = new t.Bimface.UI.Button.Button(w);
        M.setHtml(BimfaceLanguage.bf_general_cancel),
          M.addEventListener("Click", function () {
            g.clear(), B.hide();
          });
        g.addEventListener(l.Zoom, function (e) {
          1 == e.zoomFactor
            ? (f.getCss().display = "none")
            : (f.getCss().display = "block");
        }),
          g.addEventListener(l.MouseHoveredGrid, function (e) {
            p.innerHTML = "";
          }),
          g.addEventListener("MinimapRectChanged", function (e) {
            T(e);
          }),
          g.addEventListener("MinimapRectDestroyed", function (e) {
            B && B.hide();
          }),
          s.appendChild(m),
          s.appendChild(f),
          s.appendChild(r),
          o.container.appendChild(s),
          o.container.appendChild(d),
          o.container.appendChild(c),
          (o.drag = new t.Web.Lang.Utility.Dom.drag({
            element: o.element,
            bBoxDetection: !0,
            handle: r,
            record: function (e, n) {
              t.Bimface.UI.Panel.PanelPositions[i.className] = {
                left: e,
                top: n,
              };
            },
          })),
          (o.showAsFull = function (e) {
            e
              ? (m.removeClass("gld-bf-max-"),
                m.addClass("gld-bf-min-"),
                o.addClass("bf-map-big"),
                o.addClass("bf-map-big-panel"),
                (o.element.style.left = "50%"),
                (o.element.style.top = "50%"),
                (o.element.style.bottom = "initial"),
                f.removeClass("bf-map-fit-panel-min"),
                f.addClass("bf-map-fit-panel-max"),
                g.resize(528, 420, !0))
              : (m.removeClass("gld-bf-min-"),
                m.addClass("gld-bf-max-"),
                o.removeClass("bf-map-big"),
                o.removeClass("bf-map-big-panel"),
                (o.element.style.left = "12px"),
                (o.element.style.top = "initial"),
                (o.element.style.bottom = "10px"),
                f.removeClass("bf-map-fit-panel-max"),
                f.addClass("bf-map-fit-panel-min"),
                g.resize(298, 198, !1)),
              (f.getCss().display = "none");
          });
        var T = function (e) {
          if (B) B.show();
          else {
            let e = new t.Bimface.UI.Toolbar.ToolbarConfig();
            (e.className = "bf-map-toolbar"),
              (B = new t.Bimface.UI.Toolbar.Toolbar(e)).addControls([b, y, M]),
              (B.element.style.zIndex = 11),
              d.appendChild(B.element);
          }
          d.offsetWidth;
          var n = d.offsetHeight,
            a = B.element.offsetWidth,
            i = B.element.offsetHeight;
          e.x + e.width < a
            ? (B.element.style.left = e.x + "px")
            : (B.element.style.left = e.x + e.width - a + "px"),
            n < e.y + e.height + i
              ? (B.element.style.top = e.y + e.height - i - 6 + "px")
              : (B.element.style.top = e.y + e.height + 6 + "px");
        };
        return n.addPlugin(g), o;
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).Map = function (e, n) {
      var a = e.getViewer(),
        i = e.getRootElement(),
        o = t.Bimface.UI.Control.ControlEvent,
        l = new t.Bimface.UI.Button.ButtonConfig();
      (l.id = "Map"),
        (l.title = BimfaceLanguage.bf_btn_map),
        (l.className = "bf-button gld-bf-map");
      var s,
        r = new t.Bimface.UI.Button.ToggleButton(l);
      if ("ViewerDrawing" == a.viewerType)
        r.addEventListener(o.StateChange, function (e) {
          e
            ? a.enableMiniMap(
                !0,
                null,
                a.loadedDrawings.length > 0
                  ? a.loadedDrawings[0].drawing._viewMetaData.workerType
                  : a._viewMetaData.workerType
              )
            : a.enableMiniMap(!1);
        });
      else {
        var c = "Viewer3D" === a.viewerType,
          d = t.Bimface.Viewer.Viewer3DEvent;
        if (!c)
          return void console.log("The API is not supported on this viewer.");
        r.addEventListener(o.StateChange, function (n) {
          (s = e.getPanel("MapPanel"))
            ? n
              ? s.show()
              : (s.close(),
                e.getPlugin("Map").clearZoomAndPan(),
                e.removePanel("MapPanel"),
                delete a.getViewer().miniMapTransform)
            : ((s = new t.Bimface.Application.UI.Panel.MapPanel(
                e
              )).addEventListener("Hide", function () {
                r.setCheckedState(!1);
              }),
              i.appendChild(s.element),
              s.bringToFront(),
              e.addPanel(s),
              a.render()),
            a
              .getEventManager()
              .fireEvent(d.ButtonOnToolbarClicked, { id: l.id, isChecked: n });
        });
      }
      return r;
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionDirection = function (e, n) {
      var a = e.getViewer(),
        i = (e.getRootElement(), "Viewer3D" === a.viewerType),
        o = t.Bimface.UI.Control.ControlEvent;
      if (i) {
        var l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "SectionDirection"),
          (l.title = "剖切方向"),
          (l.className = "bf-button gld-bf-axial");
        var s = new t.Bimface.UI.Button.Button(l);
        return (
          s.addEventListener(o.Click, function () {
            var t = this.hasClass("gld-bf-axial");
            s.toggleClassName("gld-bf-axial"),
              s.toggleClassName("gld-bf-axial-");
            var n = e.getPlugin("SectionPlane");
            n && (n.setDirection(t ? "Reverse" : "Forward"), n.setProgress(50)),
              a.render();
          }),
          s
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionRecalculation = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (i) {
        var l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "SectionRecalculation"),
          (l.title = BimfaceLanguage.bf_tip_section_fitBox),
          (l.className = "bf-button gld-bf-fittobox");
        var s = new t.Bimface.UI.Button.Button(l);
        return (
          s.addEventListener(o.Click, function () {
            var t = e.getPlugin("SectionBox");
            t && t.fitToModel(), a.render();
          }),
          s
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Panel"
    ).ExplodePanel = function (e) {
      let n = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
      var a = new t.Bimface.UI.Panel.PanelConfig();
      (a.title = BimfaceLanguage.bf_panel_explode),
        (a.css = n
          ? { right: "10px", bottom: "60px", width: "200px", height: "90px" }
          : {
              maxWidth: "414px",
              left: "50%",
              transform: "translate(-50%)",
              bottom: "0.12em",
              width: "100%",
              height: "1.02em",
            }),
        (a.enableSizable = !1),
        (a.className = "bf-panel bf-explode-panel");
      var i = new t.Bimface.UI.Panel.Panel(a);
      if (
        (i.setHtml('<div class="bf-explode-range" id="dispersionRange"></div>'),
        !n)
      ) {
        var o = e.getRootElement(),
          l = o.offsetWidth,
          s = o.offsetHeight;
        (i.element.style.fontSize = (100 * Math.min(s, l, 414)) / 750 + "px"),
          i.element.addClass("explode-panel"),
          (i.element.querySelector(
            ".bf-close"
          ).innerHTML = `<span class='quit'>${BimfaceLanguage.bf_general_exit}</span>`);
      }
      return i;
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Button"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom"),
        t.Web.Lang.Utility.ClientHelper.getIsIphone();
      e.Explode = function (e, n) {
        window.viewer = e.getViewer();
        var a = e.getRootElement(),
          i = "Viewer3D" === viewer.viewerType,
          o = t.Bimface.UI.Control.ControlEvent,
          l = t.Bimface.Viewer.Viewer3DEvent;
        if (i) {
          var s = new t.Bimface.UI.Button.ButtonConfig();
          (s.id = "Explode"),
            (s.title = BimfaceLanguage.bf_btn_explode),
            (s.className = "bf-button gld-bf-explode");
          var r,
            c = new t.Bimface.UI.Button.ToggleButton(s);
          return (
            c.addEventListener(o.StateChange, function (i) {
              if (i) {
                var o = n.getControl("Measure");
                o && o.setCheckedState(!1), C(e);
                var d = n.getControl("SectionBox");
                d && d.setCheckedState(!1);
                var f = n.getControl("SectionPlane");
                f && f.setCheckedState(!1),
                  viewer.setExplosionExtent(0),
                  viewer.render(),
                  (r = new t.Bimface.Application.UI.Panel.ExplodePanel(
                    e
                  )).addEventListener("Hide", function () {
                    c.setCheckedState(!1);
                  }),
                  a.appendChild(r.element),
                  new t.Web.Lang.Utility.Dom.range({
                    element: r.element.querySelector("#dispersionRange"),
                    min: 0,
                    cur: 0,
                    max: 3,
                    step: 0.1,
                    isShowProgress: !1,
                    defaultColor: "#555555",
                    currentColor: "#999999",
                    input: function (e) {
                      viewer.setExplosionExtent(e), viewer.render();
                    },
                  }),
                  e.addPanel(r);
              } else e.removePanel(r.id), r.close(), viewer.setExplosionExtent(0), viewer.render();
              viewer
                .getEventManager()
                .fireEvent(l.ButtonOnToolbarClicked, {
                  id: s.id,
                  isChecked: i,
                });
            }),
            c
          );
        }
        console.log("The API is not supported on this viewer.");
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).RoomEditingDrag = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Drag"),
        (e.title = BimfaceLanguage.bf_tip_roomEdit_dragNode),
        (e.className = "bf-button gld-bf-room-dragnode"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).RoomEditingAdd = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Add"),
        (e.title = BimfaceLanguage.bf_tip_roomEdit_addNode),
        (e.className = "bf-button gld-bf-room-addnode"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).RoomEditingDelete = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Delete"),
        (e.title = BimfaceLanguage.bf_tip_roomEdit_deleteNode),
        (e.className = "bf-button gld-bf-room-deletenode"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).RoomEditingHeight = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Height"),
        (e.title = BimfaceLanguage.bf_tip_roomEdit_editHeight),
        (e.className = "bf-button gld-bf-room-height"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ModelEditingTranslate = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Translation"),
        (e.title = BimfaceLanguage.bf_general_move),
        (e.className = "bf-button gld-bf-translation"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ModelEditingFlap = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Flap"),
        (e.title = BimfaceLanguage.bf_general_flap),
        (e.className = "bf-button gld-bf-flap"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ModelEditingFlapNew = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Flap"),
        (e.title = BimfaceLanguage.bf_general_flap),
        (e.className = "bf-button bimface-icon gld-bf-stretch"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ModelEditingPlaneTranslate = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "PlaneTranslate"),
        (e.title = BimfaceLanguage.bf_general_point_edit),
        (e.className = "bf-button gld-bf-plane-translate"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ModelEditingPlaneTranslateNew = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "PlaneTranslate"),
        (e.title = BimfaceLanguage.bf_general_point_edit),
        (e.className = "bf-button bimface-icon gld-bf-check"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ModelEditingRotate = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Rotation"),
        (e.title = BimfaceLanguage.bf_general_rotate),
        (e.className = "bf-button gld-bf-rotation"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).ModelEditingScale = function () {
      var e = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (e.id = "Scaling"),
        (e.title = BimfaceLanguage.bf_general_zoom),
        (e.className = "bf-button gld-bf-scaling"),
        new t.Bimface.UI.Button.ToggleButton(e)
      );
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        ),
        a = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Common.Flexible"
        );
      e.LayersPanel = function (e) {
        let i = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
        var o = new t.Bimface.UI.Panel.PanelConfig();
        if (
          ((o.title = BimfaceLanguage.bf_btn_layers),
          (o.className = "bf-panel bf-layers-panel"),
          (o.id = "LayersPanel"),
          (o.enableSizable = !1),
          i)
        )
          o.css = {
            left: "10px",
            top: "10px",
            width: "300px",
            height: "416px",
          };
        else if (
          ((o.css = {
            left: "inherit",
            top: "inherit",
            bottom: 0,
            width: "100%",
            height: "10em",
            zIndex: 9999,
          }),
          e.getIsMobileNew())
        )
          o.css.fontSize = a.getFontSize();
        else {
          var l = e.getRootElement(),
            s = l.offsetWidth,
            r = l.offsetHeight,
            c = (100 * Math.min(r, s, 414)) / 750 + "px";
          o.css.fontSize = c;
        }
        var d = new t.Bimface.UI.Panel.Panel(o);
        d.element.addClass("layers-panel");
        var f = [],
          m = [];
        e.loadedDrawings.length > 0
          ? e.loadedDrawings.map((e) => {
              const t = e.drawing.getLayers();
              for (let n = 0; n < t.length; n++) m.push(e.drawing.modelId);
              f = [...f, ...t];
            })
          : (f = e.getLayers(!0));
        let p = 0;
        f.map((t, n) => {
          t.visible || p++, e.loadedDrawings.length > 0 && (t.modelId = m[n]);
        }),
          (this.layers = f);
        var u = n.create("ul", "bf-layers bf-scroll-bar"),
          g = n.create("div", "bf-allLayers");
        let h;
        p == f.length
          ? ((h = "gld-bf-hide"), g.addClass("disable"))
          : (h = "gld-bf-show"),
          (g.innerHTML = `<span title='显示' class='eyes ${h}'></span><span   class='name'>${BimfaceLanguage.bf_panel_layers_all}</span>`),
          g.addEventListener("click", function () {
            var t = this.hasClass("disable");
            t
              ? (e.loadedDrawings.length > 0
                  ? e.loadedDrawings.map((e) => {
                      e.drawing.showLayers({ all: !0 });
                    })
                  : e.showAllLayers(),
                b(!0))
              : (e.loadedDrawings.length > 0
                  ? e.loadedDrawings.map((e) => {
                      e.drawing.hideLayers({ all: !0 });
                    })
                  : e.hideAllLayers(),
                b(!1)),
              this.toggleClass("disable");
            var n = this.querySelector(".eyes");
            n.setAttribute("title", t ? "显示" : "隐藏"),
              n.toggleClass("gld-bf-show"),
              n.toggleClass("gld-bf-hide");
          });
        for (
          var b = function (e) {
              for (
                var t = u.querySelectorAll(".bf-layer"), n = 0, a = t.length;
                n < a;
                ++n
              ) {
                var i = t[n],
                  o = i.querySelector(".eyes");
                e ? i.removeClass("disable") : i.addClass("disable"),
                  i.setAttribute("visible", e),
                  o.addClass(e ? "gld-bf-show" : "gld-bf-hide"),
                  o.removeClass(e ? "gld-bf-hide" : "gld-bf-show"),
                  o.setAttribute("title", e ? "显示" : "隐藏");
              }
            },
            v = 0,
            y = (f = t.Web.Lang.Utility.ClientHelper.sortByGroupName(
              f,
              "modelId"
            )).length;
          v < y;
          ++v
        ) {
          var C,
            w,
            B = n.create("li", "bf-layer"),
            L = f[v],
            M = e.getColor(L.color);
          L.visible
            ? ((C = "gld-bf-show"), (w = "显示"))
            : ((C = "gld-bf-hide"), (w = "隐藏"), B.addClass("disable"));
          let t = L.name;
          e.loadedDrawings.length > 1 &&
            (t =
              e
                .getDrawing(L.modelId)
                .fileName.substring(
                  0,
                  e.getDrawing(L.modelId).fileName.indexOf(".")
                ) +
              " | " +
              L.name),
            (B.innerHTML = `<span title='${w}' class='eyes ${C}'></span><span class='color'style='background:${M}'></span><span   class='name'>${t}</span>`),
            B.setAttribute("layer-id", L.id),
            B.setAttribute("visible", L.visible),
            B.setAttribute("model-id", L.modelId),
            B.addEventListener("click", function () {
              this.toggleClass("disable");
              var t = this.querySelector(".eyes");
              t.toggleClass("gld-bf-show"), t.toggleClass("gld-bf-hide");
              var n = this.getAttribute("visible"),
                a = this.getAttribute("layer-id"),
                i = this.getAttribute("model-id");
              (n = "true" != n),
                this.setAttribute("visible", n),
                this.querySelector(".eyes").setAttribute(
                  "title",
                  n ? "显示" : "隐藏"
                );
              var o = g.querySelector(".eyes");
              n
                ? (e.loadedDrawings.length > 0
                    ? e.getDrawing(i).showLayers({ layerIds: new Array(a) })
                    : e.showLayer(a, !0),
                  g.removeClass("disable"),
                  o.addClass("gld-bf-show"),
                  o.removeClass("gld-bf-hide"),
                  o.setAttribute("title", "显示"))
                : (0 == u.querySelectorAll(".gld-bf-show").length &&
                    (g.addClass("disable"),
                    o.removeClass("gld-bf-show"),
                    o.addClass("gld-bf-hide"),
                    o.setAttribute("title", "隐藏")),
                  e.loadedDrawings.length > 0
                    ? e.getDrawing(i).hideLayers({ layerIds: new Array(a) })
                    : e.hideLayer(a, !0));
            }),
            u.appendChild(B);
        }
        return (
          d.container.appendChild(g),
          d.container.appendChild(u),
          e.loadedDrawings.length > 0
            ? f.map((t) => {
                e.getDrawing(t.modelId).changeLayers(t);
              })
            : e.changeLayers(f),
          d.element.setCss({ border: "solid 1px #333333" }),
          (this.update = function (t) {
            for (var n = 0, a = this.layers.length; n < a; ++n) {
              var i = this.layers[n];
              i.id == t.id && (i.visible = t.visible);
            }
            e.loadedDrawings.length > 0
              ? this.layers.map((t) => {
                  e.getDrawing(t.modelId).changeLayers(t);
                })
              : e.changeLayers(this.layers),
              e.update();
          }),
          d
        );
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Button"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Common.Flexible"
        );
      e.Layers = function (e, a) {
        var i = e.getViewer(),
          o = e.getRootElement(),
          l = t.Bimface.UI.Control.ControlEvent,
          s = new t.Bimface.UI.Button.ButtonConfig();
        (s.id = "Layers"),
          (s.title = BimfaceLanguage.bf_btn_layers),
          (s.className = "bf-button gld-bf-layers");
        var r,
          c,
          d = new t.Bimface.UI.Button.ToggleButton(s),
          f = !n.getIsTablet() && i.getIsMobileNew();
        return (
          d.addEventListener(l.StateChange, function (n) {
            if (
              (f &&
                (c || (c = e.getToolbar("MainToolbar")),
                n ? c && c.hide() : c && c.show()),
              (r = e.getPanel("LayersPanel")))
            ) {
              const a = o.getElementsByClassName(
                "bf-panel bf-layers-panel bf-has-title bf-sizable layers-panel"
              );
              n
                ? (i.loadedDrawings.length > 0 &&
                    (a.length > 0 && a[0].remove(),
                    e.removePanel("LayersPanel"),
                    r.close(),
                    (r = new t.Bimface.Application.UI.Panel.LayersPanel(i)),
                    o.appendChild(r.element),
                    r.bringToFront(),
                    e.addPanel(r),
                    r.addEventListener("Hide", function () {
                      d.setCheckedState(!1);
                    })),
                  r.show())
                : (a[0] && (a[0].style.display = "none"), r.hide());
            } else
              (r = new t.Bimface.Application.UI.Panel.LayersPanel(i)),
                o.appendChild(r.element),
                r.bringToFront(),
                e.addPanel(r),
                r.addEventListener("Hide", function () {
                  d.setCheckedState(!1);
                });
          }),
          d
        );
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        );
      e.SheetsPanel = function (e) {
        let a,
          i = t.Web.Lang.Utility.ClientHelper.getIsDesktop(),
          o = e.getViewer(),
          l = e.getRootElement(),
          s = new t.Bimface.UI.Panel.PanelConfig();
        function r(i) {
          a = i;
          let s = n.create("ul", "bf-sheets bf-scroll-bar");
          for (let e = 0, t = a.length; e < t; e++) {
            let t = n.create("li", "bf-sheet"),
              i = a[e],
              o = n.create("span", "bf-sheet-title");
            n.create("div", "bf-sheet-frames");
            (o.innerHTML = `<span >${i.name}</span>`),
              t.setAttribute("sheet-id", i.id),
              t.appendChild(o);
            for (let e = 0, a = i.frames.length; e < a; e++) {
              let a = i.frames[e],
                o = n.create("div", "bf-sheet-row");
              o.setAttribute("frame-id", a.id),
                (o.innerHTML = `<div title="${a.name}"  class="bf-sheet-frameName">${a.name}</div><span title="${BimfaceLanguage.bf_panel_viewSheet}" class="bf-sheet-icon gld-bf-export bf-button"></span><div  title="${a.number}" class="bf-sheet-frameNumber">${a.number}</div>`),
                t.appendChild(o);
            }
            s.appendChild(t);
          }
          s.addEventListener("click", function (n) {
            let i,
              s,
              r = n.target;
            (i = r.parentElement.parentElement.getAttribute("sheet-id")),
              (s = r.parentElement.getAttribute("frame-id")),
              "bf-sheet-icon gld-bf-export bf-button" == r.className
                ? (function (n, i) {
                    let s = a
                        .getObjectByAttribute("id", n)
                        .frames.getObjectByAttribute("id", i),
                      r = e.getPanel("DrawingFramePanel"),
                      c = o._viewMetaData || o._data,
                      d = c.dataEnvType,
                      f = new t.Bimface.UI.Panel.PanelConfig();
                    (f.title = s.name),
                      (f.className = "bf-panel bf-drawingFrame-panel"),
                      (f.id = "DrawingFramePanel"),
                      (f.css = {
                        left: "0",
                        top: "0",
                        width: "100%",
                        height: "100%",
                      }),
                      (r = new t.Bimface.UI.Panel.Panel(f)),
                      r.element.addClass("frame-panel"),
                      l.appendChild(r.element),
                      r.bringToFront();
                    let m =
                      new t.Bimface.Application.WebApplicationDrawingConfig();
                    m.Buttons.removeByValue("Sheets"),
                      (m.domElement = r.element.querySelector(
                        ".bf-panel-container"
                      ));
                    let p = new t.Bimface.Application.WebApplicationDrawing(m);
                    "Local" == d
                      ? p.getViewer().addModel(c, null, null, i)
                      : p.loadFrame(c.viewToken, i),
                      e.addPanel(r),
                      r.addEventListener("Hide", function () {
                        p.getViewer().destroy(!0),
                          r.destroy(),
                          e.removePanel("DrawingFramePanel");
                      });
                  })(i, s)
                : "bf-sheet-row" == r.parentElement.className &&
                  (function (t, n) {
                    let i = a
                        .getObjectByAttribute("id", t)
                        .frames.getObjectByAttribute("id", n).bbox,
                      l = e.getToolbar("LeftSubToolbar");
                    l &&
                      l
                        .getControl("LayoutList")
                        .setSelectedUiById(0 == t ? "Model" : t),
                      o.zoomToBoundingBox([i.slice(0, 2), i.slice(2, 4)]);
                  })(i, s);
          }),
            c.container.appendChild(s),
            c.element.setCss({ border: "solid 1px #333333" });
        }
        (s.title = BimfaceLanguage.bf_btn_sheets),
          (s.className = "bf-panel bf-sheets-panel"),
          (s.id = "SheetsPanel"),
          (s.css = i
            ? { left: "10px", bottom: "70px", width: "320px", height: "230px" }
            : { left: 0, top: 0, width: "100%", height: "100%", zIndex: 9999 });
        let c = new t.Bimface.UI.Panel.Panel(s);
        return (
          c.element.addClass("sheets-panel"),
          o.getDrawingFrame(function (e) {
            r(e.data || []);
          }),
          c
        );
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).Sheets = function (e, n) {
      e.getViewer();
      var a = e.getRootElement(),
        i = t.Bimface.UI.Control.ControlEvent,
        o = new t.Bimface.UI.Button.ButtonConfig();
      (o.id = "Sheets"),
        (o.title = BimfaceLanguage.bf_btn_sheets),
        (o.className = "bf-button gld-bf-split-drawings");
      var l,
        s = new t.Bimface.UI.Button.ToggleButton(o);
      return (
        s.addEventListener(i.StateChange, function (n) {
          (l = e.getPanel("SheetsPanel"))
            ? n
              ? l.show()
              : l.hide()
            : ((l = new t.Bimface.Application.UI.Panel.SheetsPanel(e)),
              a.appendChild(l.element),
              l.bringToFront(),
              e.addPanel(l),
              l.addEventListener("Hide", function () {
                s.setCheckedState(!1);
              }));
        }),
        s
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).SectionBoxReverse = function (e, n) {
      var a = e.getViewer(),
        i = "Viewer3D" === a.viewerType,
        o = t.Bimface.UI.Control.ControlEvent;
      if (i) {
        var l = new t.Bimface.UI.Button.ButtonConfig();
        (l.id = "SectionBoxReverse"),
          (l.title = BimfaceLanguage.bf_panel_section_reverse),
          (l.className = "bf-button gld-bf-reverse-lg");
        var s = new t.Bimface.UI.Button.ToggleButton(l);
        return (
          s.addEventListener(o.StateChange, function (t) {
            var n = e.getPlugin("SectionBox");
            n && (t ? n.changeClipDirection(!0) : n.changeClipDirection(!1)),
              a.render();
          }),
          s
        );
      }
      console.log("The API is not supported on this viewer.");
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Button"
    ).DividerLine = function (e, n) {
      var a = new t.Bimface.UI.Button.ButtonConfig();
      return (
        (a.id = "DividerLine"),
        (a.title = ""),
        (a.className = "bf-button bf-btn-divider"),
        new t.Bimface.UI.Button.Button(a)
      );
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Toolbar"
    ).MainToolbarConfig = function () {
      let e = new t.Bimface.UI.Toolbar.ToolbarConfig();
      return Object.assign({}, e, {
        id: "MainToolbar",
        title: "主菜单",
        className: "bf-toolbar bf-toolbar-bottom",
        buttons: [
          "Home",
          "Person",
          "OrbitButton",
          "RectangleSelect",
          "Measure",
          "Section",
          "Annotation",
          "Property",
          "Information",
          "Setting",
          "FullScreen",
        ],
      });
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Toolbar"
    ).SectionToolbarConfig = function () {
      let e = new t.Bimface.UI.Toolbar.ToolbarConfig();
      return Object.assign({}, e, {
        id: "SectionToolbar",
        title: "剖切",
        className: "bf-section-box",
        buttons: [
          "SectionBoxVisiable",
          "SectionBoxReverse",
          "SectionRecalculation",
          "SectionReset",
        ],
      });
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Toolbar"
    ).FamilyListConfig = function () {
      let e = new t.Bimface.UI.Toolbar.ToolbarConfig();
      return Object.assign({}, e, {
        id: "FamilyTypes",
        title: "FamilyTypes",
        className: "bf-toolbar bf-toolbar bf-toolbar-select",
        buttons: ["FamilyList"],
      });
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Toolbar"
    ).ModelTree = function () {
      let e = new t.Bimface.UI.Toolbar.ToolbarConfig();
      return Object.assign({}, e, {
        id: "ModelTree",
        title: "ModelTree",
        className: "bf-toolbar bf-toolbar bf-tree-toolbar",
        buttons: ["ModelTree"],
      });
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Toolbar"
    ).LeftSubToolbarConfig = function () {
      let e = new t.Bimface.UI.Toolbar.ToolbarConfig();
      return Object.assign({}, e, {
        id: "FamilyTypes",
        title: "FamilyTypes",
        className: "bf-toolbar bf-toolbar bf-toolbar-select",
        buttons: ["FamilyList"],
      });
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Toolbar"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Button"
        );
      e.Toolbar = function (e, a) {
        for (
          var i = new t.Bimface.UI.Toolbar.Toolbar(e),
            o = 0,
            l = e.buttons.length;
          o < l;
          o++
        )
          if (n[e.buttons[o]]) {
            var s = n[e.buttons[o]](a, i);
            i.addControl(s);
          }
        return i;
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI.Menu"
    ).ContextMenu = function (e, n, a) {
      let i = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
      var o =
          t.Bimface.Viewer.ViewerDrawingSet &&
          e.getViewer() instanceof t.Bimface.Viewer.ViewerDrawingSet
            ? e.getActiveViewer()
            : e.getViewer(),
        l = !!t.Bimface.Viewer.Viewer3D && "Viewer3D" === o.viewerType,
        s = l ? e.getRootElement() : o.getDomElement(),
        r = t.Bimface.UI.Control.ControlEvent,
        c = null,
        d = new t.Bimface.UI.Menu.MenuConfig();
      d.element = s;
      var f = new t.Bimface.UI.Menu.Menu(d),
        m = function () {
          i
            ? (f && f.destroy(),
              (f = null),
              s.removeEventListener("mousedown", j),
              X.removeEventListener("mousedown", j))
            : (s.removeEventListener("touchstart", j),
              X.removeEventListener("touchstart", j),
              o.getIsMobileNew &&
                o.getIsMobileNew() &&
                f &&
                setTimeout(() => {
                  f && f.destroy(), (f = null);
                }, 400));
        };
      if (l) {
        let Y,
          Q = !0;
        for (let se in n) {
          const ce = n[se];
          if (Y || 1 !== ce.length) {
            if (ce.length > 1 || (1 === ce.length && Y && Y.id !== ce[0])) {
              (Y = void 0), (c = void 0), (Q = !1);
              break;
            }
          } else (Y = { modelId: se, id: ce[0] }), (c = a[ce[0]]), (Q = !1);
        }
        var p,
          u = e.getToolbar("MainToolbar");
        u && (p = u.getControl("Property") || u.getControl("MobileProperty"));
        var g = new t.Bimface.UI.Menu.MenuItemConfig();
        g.id = "showProperty";
        var h = new t.Bimface.UI.Menu.MenuItem(g);
        function J() {
          !p || p.isChecked() || h.isDisabled
            ? !p &&
              o._manifest.Features &&
              (o._manifest.Features.HasComponentProperty ||
                o._manifest.Features.HasMaterialProperty) &&
              0 ===
                s.getElementsByClassName(
                  "bf-panel property-panel bf-has-title bf-sizable bf-property-panel"
                ).length &&
              new t.Bimface.Application.UI.Button.Property(e).setCheckedState(
                !0
              )
            : p.setCheckedState(!0),
            m();
        }
        h.setText(BimfaceLanguage.bf_btn_props),
          i && h.addEventListener(r.Click, J),
          !i && h.addEventListener("touchstart", J);
        var b = new t.Bimface.UI.Menu.MenuItemConfig();
        b.id = "areaProperty";
        var v = new t.Bimface.UI.Menu.MenuItem(b);
        if (
          (v.setText(BimfaceLanguage.bf_tip_props_rooms),
          o.getIsMobileNew && o.getIsMobileNew() && v.disabled(),
          Y && "ExtrudeBodyManager" === Y.modelId)
        ) {
          const de = CLOUD.ExtrudeBodyManager.getInstance(o.getViewer());
          Y.modelId = de.getBindedModelId(Y.id);
        }
        v.addEventListener(r.Click, function () {
          var n = e.getPanel("AreaPropertyPanel");
          n ||
            ((n = new t.Bimface.Application.UI.Panel.AreaPanel(
              e
            )).addEventListener("Close", function () {
              e.removePanel(n.id);
            }),
            n.addEventListener("Hide", function () {
              n.close();
            }),
            re(o, n, c, Y),
            s.appendChild(n.element),
            n.initPosition(),
            e.addPanel(n)),
            m();
        }),
          v.addEventListener("touchstart", function () {
            var n = e.getPanel("AreaPropertyPanel");
            n ||
              ((n = new t.Bimface.Application.UI.Panel.AreaPanel(
                e
              )).addEventListener("Close", function () {
                e.removePanel(n.id);
              }),
              n.addEventListener("Hide", function () {
                n.close();
              }),
              re(o, n, c, Y),
              s.appendChild(n.element),
              n.initPosition(),
              e.addPanel(n)),
              m();
          });
        var y = new t.Bimface.UI.Menu.MenuItemConfig();
        y.id = "areaEdit";
        var w = new t.Bimface.UI.Menu.MenuItem(y);
        w.setText(BimfaceLanguage.bf_contextmenu_roomEdit),
          w.addEventListener(r.Click, function () {
            if ((m(), !i)) return;
            let n = e.getPlugin("RoomEditorToolbar");
            if (n) {
              n.roomId = Y.id;
              let e = n.switchToolbar.getControls();
              n.uncheckOthers("Drag", e),
                n.roomEditor.activateByRoomId(Y.id),
                n.roomEditor.onEnter();
            } else {
              let a =
                new t.Bimface.Plugins.SpatialRelation.RoomEditorToolbarConfig();
              (a.viewer = o),
                (a.roomId = Y.id),
                (n = new t.Bimface.Plugins.SpatialRelation.RoomEditorToolbar(
                  a
                )),
                e.addPlugin(n);
            }
          });
        const K = (e) => {
          o.getModels().forEach(e);
          const t = o._getExternalComponentModel();
          t && e(t);
        };
        var B = new t.Bimface.UI.Menu.MenuItemConfig();
        B.id = "HideComponents";
        var M = new t.Bimface.UI.Menu.MenuItem(B);
        function ee(e, t, n, a = !1, i = []) {
          if (!o.dynamicTree || !o.dynamicTree._bfRenderedNodes) return;
          const l = [],
            s = [];
          let r = null;
          1 == i.length && (r = i[0]),
            a
              ? (o.dynamicTree._bfRenderedNodes.map((a) => {
                  (a.modelId != e.modelId ||
                    (a.modelId == e.modelId &&
                      -1 == t.indexOf(a.id) &&
                      (!r ||
                        (a.path != r.path &&
                          0 != a.path.indexOf(`${r.path}-`) &&
                          0 != r.path.indexOf(`${a.path}-`))))) &&
                    ("hide" == n && (a.setCheckedState(!1), l.push(a.path)),
                    "opacity" == n &&
                      (1 == o.getModels().length ||
                        (o.getModels().length > 1 &&
                          (!r || 0 != r.path.indexOf(`${a.path}-`)))) &&
                      (a.setIconState("change"), l.push(a.path)));
                }),
                o.dynamicTree._bfComponentsTreeConfigs.filter((a) => {
                  (a.modelId != e.modelId ||
                    (a.modelId == e.modelId &&
                      -1 == t.indexOf(a.id) &&
                      (!r ||
                        (0 != a.path.indexOf(`${r.path}-`) &&
                          a.path != r.path)))) &&
                    ("hide" == n &&
                      ((a.checkedState = !1),
                      (a.config.isChecked = !1),
                      delete a.isHalfChecked),
                    "opacity" == n &&
                      ((a.isolatedState = "change"),
                      (a.config.icon.type = "change")));
                }))
              : (o.dynamicTree._bfRenderedNodes.map((a) => {
                  a.modelId == e.modelId &&
                    t.indexOf(a.id) > -1 &&
                    (!r ||
                      (a.path != r.path &&
                        0 != a.path.indexOf(`${r.path}-`))) &&
                    ("hide" == n && a.setCheckedState(!1),
                    "opacity" == n && a.setIconState("change"),
                    l.push(a.path));
                }),
                o.dynamicTree._bfComponentsTreeConfigs.filter((a) => {
                  a.modelId == e.modelId &&
                    t.indexOf(a.id) > -1 &&
                    (!r ||
                      (a.path != r.path &&
                        0 != a.path.indexOf(`${r.path}-`))) &&
                    ("hide" == n &&
                      ((a.checkedState = !1),
                      (a.config.isChecked = !1),
                      delete a.isHalfChecked),
                    "opacity" == n &&
                      ((a.isolatedState = "change"),
                      (a.config.icon.type = "change")));
                })),
            l.map((e) => {
              let t = e.slice(
                0,
                -1 == e.lastIndexOf("-") ? 0 : e.lastIndexOf("-")
              );
              for (s.indexOf(t) < 0 && s.push(t); t.indexOf("-") > 0; )
                (t = t.slice(
                  0,
                  -1 == t.lastIndexOf("-") ? 0 : t.lastIndexOf("-")
                )),
                  s.indexOf(t) < 0 && s.push(t);
            });
          const c = o.dynamicTree._bfRenderedNodes.filter(
            (e) => t.indexOf(e.id) > -1
          );
          if (
            (a &&
              c.map((e) => {
                const t = e.path.slice(0, e.path.lastIndexOf("-"));
                s.push(t);
              }),
            1 == i.length && s.indexOf(i[0].path) < 0)
          ) {
            if (s.indexOf(i[0].path) < 0) {
              s.push(i[0].path);
              let e = i[0].path;
              for (; e.indexOf("-") > 0; )
                (e = e.slice(
                  0,
                  -1 == e.lastIndexOf("-") ? 0 : e.lastIndexOf("-")
                )),
                  s.indexOf(e) < 0 && s.push(e);
            }
            o.dynamicTree._bfRenderedNodes
              .filter((e) => 0 == e.path.indexOf(`${i[0].path}-`))
              .map((e) => {
                s.indexOf(e.path) < 0 && s.push(e.path);
              });
          }
          if ((s.sort((e, t) => t.length - e.length), "hide" == n)) {
            const e = !!a;
            s.map((n) => {
              const l = o.dynamicTree._bfRenderedNodes.filter(
                  (e) => 0 == e.path.indexOf(`${n}-`)
                ),
                r = l.filter(
                  (n) =>
                    ("checked" == n._checkedState) != e && -1 == t.indexOf(n.id)
                ),
                d = o.dynamicTree._bfRenderedNodes.find((e) => e.path == n);
              if (d)
                if (0 == r.length || s.indexOf(r[r.length - 1].path) > -1)
                  d.setCheckedState(e),
                    o.dynamicTree._bfComponentsTreeConfigs.find((t) => {
                      t.path == d.path &&
                        ((t.checkedState = e),
                        (t.config.isChecked = e),
                        delete t.isHalfChecked);
                    });
                else if ((c[0] && 0 == c[0].path.indexOf(n)) || 1 == i.length) {
                  const e = l.filter((e) => "checked" == e._checkedState);
                  e.length != l.length &&
                    (!a || (a && 0 != e.length)) &&
                    (d.setCheckedState(!0, !0),
                    o.dynamicTree._bfComponentsTreeConfigs.find((e) => {
                      e.path == d.path &&
                        ((e.checkedState = !0),
                        (e.config.isChecked = !0),
                        (e.isHalfChecked = !0));
                    }));
                }
            }),
              o.dynamicTree._bfRenderedNodes[0]._parent.setParentCheckedState(),
              o.dynamicTree._bfRenderedNodes[0]._parent._parent &&
                o.dynamicTree._bfRenderedNodes[0]._parent._parent.setParentCheckedState();
          }
          if ("opacity" == n) {
            const e = a ? "default" : "change",
              n = a ? "change" : "default";
            s.map((l) => {
              const r = o.dynamicTree._bfRenderedNodes.filter(
                  (e) => 0 == e.path.indexOf(`${l}-`)
                ),
                c = r.filter(
                  (n) =>
                    n._iconState != ("default" == e) && -1 == t.indexOf(n.id)
                ),
                d = o.dynamicTree._bfRenderedNodes.find((e) => e.path == l);
              if (d)
                if (0 == c.length || s.indexOf(c[c.length - 1].path) > -1)
                  d.setIconState(e),
                    o.dynamicTree._bfComponentsTreeConfigs.find((t) => {
                      t.path == d.path &&
                        ((t.isolatedState = e), (t.config.icon.type = e));
                    });
                else if (a && 1 == i.length && 0 == i[0].path.indexOf(l)) {
                  const e = r.filter((e) => 1 == e._iconState);
                  e.length != r.length &&
                    (!a || (a && 0 != e.length)) &&
                    (!d._iconState && d.setIconState("default"),
                    o.dynamicTree._bfComponentsTreeConfigs.find((e) => {
                      e.path == d.path &&
                        ((e.isolatedState = "default"),
                        (e.config.icon.type = "default"));
                    }));
                } else
                  o.dynamicTree._bfComponentsTreeConfigs.find((e) => {
                    e.path == d.path &&
                      ((e.isolatedState = n), (e.config.icon.type = n));
                  });
            }),
              o.dynamicTree._bfRenderedNodes[0]._parent.setParentIconState(),
              o.dynamicTree._bfRenderedNodes[0]._parent._parent &&
                o.dynamicTree._bfRenderedNodes[0]._parent._parent.setParentIconState();
          }
        }
        function te() {
          const e =
            o.dynamicTree && o.dynamicTree._bfRenderedNodes
              ? o.dynamicTree._bfRenderedNodes.filter(
                  (e) =>
                    e.treeName.classList
                      .toString()
                      .indexOf("bf-tree-name bf-selected") > -1
                )
              : null;
          K((t) => {
            const a = n[t.modelId];
            t.hideComponentsById(a, !1),
              t.setSelectedComponentsById(),
              ee(t, a, "hide", !1, e);
          }),
            o.render(),
            m();
        }
        M.setText(BimfaceLanguage.bf_contextmenu_hide),
          i && M.addEventListener(r.Click, te),
          !i && M.addEventListener("touchstart", te);
        var T = new t.Bimface.UI.Menu.MenuItemConfig();
        T.id = "SetComponentsOpacityssddd";
        var _ = new t.Bimface.UI.Menu.MenuItem(T);
        function ne() {
          const e =
            o.dynamicTree && o.dynamicTree._bfRenderedNodes
              ? o.dynamicTree._bfRenderedNodes.filter(
                  (e) =>
                    e.treeName.classList
                      .toString()
                      .indexOf("bf-tree-name bf-selected") > -1
                )
              : null;
          K((a) => {
            const i = n[a.modelId];
            a.setComponentsOpacity(
              i,
              t.Bimface.Viewer.OpacityOption.Translucent,
              !1
            ),
              a.setSelectedComponentsById(),
              ee(a, i, "opacity", !1, e);
          }),
            o.render(),
            m();
        }
        _.setText(BimfaceLanguage.bf_contextmenu_transparent),
          i && _.addEventListener(r.Click, ne),
          !i && _.addEventListener("touchstart", ne);
        var S = new t.Bimface.UI.Menu.MenuConfig();
        (S.id = "IsolateMenu"),
          (S.isSubMenu = !!i),
          (S.text = BimfaceLanguage.bf_contextmenu_isolate),
          (S.className = "bf-sub-menu");
        var I = new t.Bimface.UI.Menu.Menu(S);
        (I.subElement ? I.subElement : I.element).setAttribute(
          "style",
          "width:max-content !important;"
        );
        var k = new t.Bimface.UI.Menu.MenuItemConfig();
        k.id = "HideOthers";
        var x = new t.Bimface.UI.Menu.MenuItem(k);
        function ae() {
          const e =
            o.dynamicTree && o.dynamicTree._bfRenderedNodes
              ? o.dynamicTree._bfRenderedNodes.filter(
                  (e) =>
                    e.treeName.classList
                      .toString()
                      .indexOf("bf-tree-name bf-selected") > -1
                )
              : null;
          K((a) => {
            const i = n[a.modelId];
            a.isolateComponentsById(
              i,
              t.Bimface.Viewer.IsolateOption.HideOthers,
              !1
            ),
              a.setSelectedComponentsById(),
              i.length > 0 && ee(a, i, "hide", !0, e);
          }),
            o.render(),
            m();
        }
        x.setText(BimfaceLanguage.bf_contextmenu_isolate_hidden),
          i && x.addEventListener(r.Click, ae),
          !i && x.addEventListener("touchstart", ae);
        var E = new t.Bimface.UI.Menu.MenuItemConfig();
        E.id = "MakeOthersTranslucent";
        var N = new t.Bimface.UI.Menu.MenuItem(E);
        function ie() {
          const e =
            o.dynamicTree && o.dynamicTree._bfRenderedNodes
              ? o.dynamicTree._bfRenderedNodes.filter(
                  (e) =>
                    e.treeName.classList
                      .toString()
                      .indexOf("bf-tree-name bf-selected") > -1
                )
              : null;
          K((a) => {
            const i = n[a.modelId];
            a.isolateComponentsById(
              i,
              t.Bimface.Viewer.IsolateOption.MakeOthersTranslucent,
              !1
            ),
              a.setSelectedComponentsById(),
              i.length > 0 && ee(a, i, "opacity", !0, e);
          }),
            o.render(),
            m();
        }
        N.setText(BimfaceLanguage.bf_contextmenu_isolate_translucent),
          i && N.addEventListener(r.Click, ie),
          !i && N.addEventListener("touchstart", ie),
          I.addControl(x),
          I.addControl(N);
        var P = new t.Bimface.UI.Menu.Spacer(),
          U = new t.Bimface.UI.Menu.Spacer(),
          A = new t.Bimface.UI.Menu.MenuItemConfig();
        A.id = "sectionBox";
        var D = new t.Bimface.UI.Menu.MenuItem(A);
        function oe() {
          let t = [];
          K((e) => {
            n[e.modelId].map((n) => t.push(e.getBoundingBoxById(n))),
              e.clearSelectedComponents();
          });
          let a = t[0];
          t.map((e) => (a = a.clone().union(e))),
            C(e),
            L(e, a),
            o.render(),
            m();
        }
        function le() {
          let t = e.getPanel("PickSectionPlanePanel");
          if (t) {
            let e = t.element.querySelector(".gld-bf-reset-box");
            e && e.click();
          } else {
            !(function (e) {
              var t = e.getPlugin("SectionBox"),
                n = e.getPlugin("SectionPlane");
              t && t._sectionBox && t.restore(),
                n &&
                  n._sectionTool &&
                  (n.restoreRotation(),
                  n.setProgress(0),
                  (n.coordinateSystem.coordinateControl.centerPosition =
                    n._sectionTool.state.position),
                  n.coordinateSystem.coordinateControl.update()),
                (t = e.getViewer()._sectionBox) && t.restore();
            })(e);
            var n = e.getPlugin("SectionPlane");
            n && n.coordinateSystem.update(!0);
          }
          e.tree &&
            "areaPanel" != e.tree.element.id &&
            "drawingPanel" != e.tree.element.id &&
            e.tree.clear(!0),
            K((e) => {
              e.activateAllComponents(),
                e.clearIsolation(),
                e.clearSelectedComponents(),
                e.showAllComponents(),
                e.opaqueAllComponents();
            }),
            o.render(),
            m();
        }
        D.setText(BimfaceLanguage.bf_contextmenu_section_box),
          i && D.addEventListener(r.Click, oe),
          ((V = new t.Bimface.UI.Menu.MenuItemConfig()).id = "ShowAll"),
          (z = new t.Bimface.UI.Menu.MenuItem(V)).setText(
            BimfaceLanguage.bf_contextmenu_showAll
          ),
          i && z.addEventListener(r.Click, le),
          !i && z.addEventListener("touchstart", le),
          !c ||
          ("room" != c.toLocaleLowerCase() && "area" != c.toLocaleLowerCase())
            ? Q
              ? (f.addControl(z), (f.oneOption = !0))
              : ((p ||
                  (o._manifest.Features &&
                    (o._manifest.Features.HasComponentProperty ||
                      o._manifest.Features.HasMaterialProperty))) &&
                  (f.addControl(h), f.addControl(P)),
                f.addControl(M),
                f.addControl(_),
                f.addControl(I),
                f.addControl(U),
                i && f.addControl(D),
                f.addControl(z),
                "ExternalComponent" == c && h.disabled())
            : (f.addControl(v),
              f.addControl(w),
              f.addControl(P),
              f.addControl(z),
              !i && w.disabled(),
              (f.oneOption = !0));
      } else {
        var V,
          z,
          H = n;
        if (H.length > 0) {
          var W = new t.Bimface.UI.Menu.MenuItemConfig();
          W.id = "hideElement";
          var O = new t.Bimface.UI.Menu.MenuItem(W);
          O.setText(BimfaceLanguage.bf_contextmenu_hideElement),
            O.addEventListener(r.Click, function (e) {
              "object" == typeof n[0]
                ? n.map((e) => {
                    o.getDrawing(e.modelId).hideObjects({
                      objectIds: e.selectedObjects,
                    });
                  })
                : o.hideElementsById(H),
                o.clearSelection(),
                m();
            }),
            f.addControl(O),
            f.addControl(new t.Bimface.UI.Menu.Spacer());
          var F = new t.Bimface.UI.Menu.MenuItemConfig();
          F.id = "hideLayer";
          var R = new t.Bimface.UI.Menu.MenuItem(F);
          R.setText(BimfaceLanguage.bf_contextmenu_hideLayer),
            R.addEventListener(r.Click, function () {
              var e;
              "object" == typeof n[0]
                ? n.map((e) => {
                    if (e.initRemoved) return;
                    const t = o
                      .getDrawing(e.modelId)
                      .getLayerIdsByObjects(e.selectedObjects);
                    t && o.getDrawing(e.modelId).hideLayers({ layerIds: t });
                  })
                : ((e = o.getLayerIdFromElementId(H[0])), o.hideLayer(e)),
                q(e),
                o.clearSelection(),
                m();
            }),
            f.addControl(R),
            f.addControl(new t.Bimface.UI.Menu.Spacer());
        }
        ((V = new t.Bimface.UI.Menu.MenuItemConfig()).id = "showAll"),
          (z = new t.Bimface.UI.Menu.MenuItem(V)).setText(
            BimfaceLanguage.bf_contextmenu_showAll
          ),
          z.addEventListener(r.Click, function () {
            $(!0),
              o.loadedDrawings.length > 0
                ? o.loadedDrawings.map((e) => {
                    o.getDrawing(e.modelId) &&
                      (o.getDrawing(e.modelId).showObjects({ all: !0 }),
                      o.getDrawing(e.modelId).showLayers({ all: !0 }));
                  })
                : (o.showAllLayers(!0), o.showAllElements(!0)),
              m();
          }),
          f.addControl(z);
        var $ = function (e) {
            var t = document.querySelector(".bf-allLayers");
            if (t) {
              t.removeClass("disable"),
                (l = t.querySelector(".eyes")).addClass(
                  e ? "gld-bf-show" : "gld-bf-hide"
                ),
                l.removeClass(e ? "gld-bf-hide" : "gld-bf-show"),
                l.setAttribute("title", e ? "显示" : "隐藏");
              for (
                var n = t.nextSibling.querySelectorAll(".bf-layer"),
                  a = 0,
                  i = n.length;
                a < i;
                ++a
              ) {
                var o = n[a],
                  l = o.querySelector(".eyes");
                e ? o.removeClass("disable") : o.addClass("disable"),
                  o.setAttribute("visible", e),
                  l.addClass(e ? "gld-bf-show" : "gld-bf-hide"),
                  l.removeClass(e ? "gld-bf-hide" : "gld-bf-show"),
                  l.setAttribute("title", e ? "显示" : "隐藏");
              }
            }
          },
          q = function (e) {
            var t = document.querySelector(".bf-layers");
            if (t)
              for (
                var n = t.querySelectorAll(".bf-layer"), a = 0, i = n.length;
                a < i;
                ++a
              ) {
                var o = n[a];
                if (o.getAttribute("layer-id") == e) {
                  o.setAttribute("visible", !1), o.toggleClass("disable");
                  var l = o.querySelector(".eyes");
                  if (
                    (l.toggleClass("gld-bf-show"),
                    l.toggleClass("gld-bf-hide"),
                    l.setAttribute("title", "隐藏"),
                    0 == t.querySelectorAll(".gld-bf-show").length)
                  ) {
                    var s = document.querySelector(".eyes");
                    document.querySelector(".bf-allLayers").addClass("disable"),
                      s.removeClass("gld-bf-show"),
                      s.addClass("gld-bf-hide"),
                      s.setAttribute("title", "隐藏");
                  }
                  break;
                }
              }
          };
      }
      var j = function () {
          m();
        },
        G = new t.Bimface.UI.Menu.MenuItemConfig();
      (G.id = "MaskComponents"), (G.className = "mask");
      var Z = new t.Bimface.UI.Menu.MenuItem(G);
      f.addControl(Z);
      var X = l ? o.getDomElement() : o.getRootElement();
      return (
        i
          ? (s.addEventListener("mousedown", j),
            X.addEventListener("mousedown", j))
          : (s.addEventListener("touchstart", j),
            X.addEventListener("touchstart", j)),
        f
      );
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application"
        ),
        n =
          (t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer"),
          t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
          t.Web.Lang.Utility.Namespace.ensureNamespace(
            t,
            "Web.Lang.Utility.Dom"
          ));
      t.Bimface.Data.StatisticsDataManager.getInstance();
      e.WebApplicationRfa = function (e) {
        var a;
        if (t.Web.Lang.Utility.ClientHelper.getIsDesktop())
          (a = n.create("div", "bf-container")),
            e.EnableFamilyList &&
              !e.Toolbars.includes("FamilyList") &&
              e.Toolbars.push("FamilyList"),
            !e.EnableFamilyList &&
              e.Toolbars.includes("FamilyList") &&
              e.Toolbars.removeByValue("FamilyList");
        else {
          (e.Toolbars = ["FamilyList", "MainToolbar"]),
            (e.Buttons = [
              "Home",
              "ViewButton",
              "Measure",
              "Section",
              "Explode",
            ]),
            (e.enableViewHouse = !1),
            (a = n.create("div", "bf-container  bf-mobile bf-mobile-rfa"));
          var i = e.domElement.offsetWidth,
            o = e.domElement.offsetHeight;
          a.style.fontSize = (90 * Math.min(i, o, 414)) / 750 + "px";
        }
        var l = this;
        let s = e;
        (l.toolbars = []),
          (l._rootElement = a),
          e.domElement.appendChild(a),
          (s.domElement = a),
          h(this),
          (this.getViewer = function () {
            return r;
          }),
          (this.getEventManager = function () {
            return d;
          }),
          (this.getToolbars = function () {
            return l.UI.getToolbars();
          }),
          (this.getToolbar = function (e) {
            return "LeftToolbar" == e && (e = "ModelTree"), l.UI.getToolbar(e);
          }),
          (this.render = function () {
            this.getViewer().render();
          }),
          (this.addView = function (e) {
            r.addView(e);
          }),
          (this.getAnnotationManager = function () {
            return l.getPlugin("Annotation");
          }),
          (this._mainToolbarAdaptive = function () {
            let e = l.getToolbars();
            if (!(e && e.length >= 2 && !!l.getToolbar("MainToolbar"))) return;
            let t = l.getToolbar("MainToolbar");
            l._rootElement.offsetWidth < 1e3
              ? t.addClassName("bf-toolbar-bottom-float-right")
              : t.removeClassName("bf-toolbar-bottom-float-right");
          }),
          (this.addEventListener =
            t.Bimface.Viewer.Viewer3D.prototype.addEventListener),
          (this.removeEventListener =
            t.Bimface.Viewer.Viewer3D.prototype.removeEventListener);
        let r = new t.Bimface.Viewer.Viewer3D(s),
          c = t.Bimface.Viewer.Viewer3DEvent,
          d = r.getEventManager();
        r.addEventListener(c.ViewAdded, function (e) {
          const n = r.getViewer();
          n.getNumOfElements(), n.getNumOfTriangles();
          if (
            (r.getFamilyTypes(function (e) {
              e[0] && r.getDefaultModel().showFamilyTypeById(e[0].id),
                r.render();
            }),
            l.UI.init(),
            l._mainToolbarAdaptive(),
            r._opt.EnableFamilyList &&
              !l.UI.getToolbar("FamilyTypes") &&
              r._manifest.Features.HasFamilyTypeList)
          ) {
            var a = t.Bimface.UI.Toolbar.ToolbarConfig();
            (a.id = "FamilyTypes"),
              (a.title = "FamilyTypes"),
              (a.className = "bf-toolbar bf-toolbar bf-toolbar-select"),
              (a.element = r._opt.domElement),
              (a.buttons = ["FamilyList"]),
              l.UI.addToolbar(a);
          }
          null != r._manifest.Features.HasFamilyTypeList &&
            !r._manifest.Features.HasFamilyTypeList &&
            l.UI.getToolbar("FamilyTypes") &&
            l.UI.removeToolbar("FamilyTypes"),
            window.addEventListener("resize", function (e) {
              l._mainToolbarAdaptive();
            });
        }),
          r.addEventListener(c.AddView, function (n) {
            if (1 === n) {
              var i = new t.Bimface.Application.UI.UIConfig();
              ((i = Object.assign(i, e)).element = a),
                (i.viewer = r),
                (l.UI = new t.Bimface.Application.UI.UI(i));
            }
          }),
          r.addEventListener(c.RemoveView, function (e) {
            0 == e && (l.UI && l.UI.destroy(), (l.UI = null));
          }),
          (this.destroy = function () {
            this.UI && this.UI.destroy(),
              (this.UI = null),
              r && r.destroy(),
              (r = null),
              e.domElement.remove();
          });
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).WebApplication2DConfig = function () {
      let e = t.Bimface.Viewer.Viewer2DConfig();
      return Object.assign(
        {},
        {
          Toolbars: ["MainToolbar", "LeftSubToolbar"],
          Buttons: ["Home", "RectZoom", "FullScreen"],
        },
        e
      );
    }),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      let n = Object.freeze({ Loaded: "Loaded", Error: "Error" });
      e.WebApplication2DEvent = n;
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      var n = function (e) {
          var n = new t.Bimface.UI.Toolbar.ToolbarConfig(),
            a = Object.assign({}, n, e);
          return new t.Bimface.UI.Toolbar.Toolbar(a);
        },
        a = function (e) {
          for (var t = [], a = 0, i = e.length; a < i; a++) t.push(n(e[a]));
          this._Toolbars = t;
        };
      (a.prototype.getToolbar = function (e) {
        return this._Toolbars.getObjectByAttribute("id", e);
      }),
        (e.Toolbar = n),
        (e.Toolbars = a);
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      var n = function (e) {
          var n = new t.Bimface.UI.Button.ButtonConfig(),
            a = Object.assign({ type: "Button" }, n, e),
            i =
              (t.Bimface.UI.Control.ControlEvent,
              new t.Bimface.UI.Button[a.type](a));
          for (var o in a.handles) i.addEventListener(o, a.handles[o]);
          return a.html && i.setHtml(a.html), i;
        },
        a = function (e) {
          for (var t = [], a = 0, i = e.length; a < i; a++) {
            var o = n(e[a]);
            if ("ComboBox" == e[a].type) {
              var l = e[a].options;
              for (var s in l) o.addControl(n(l[s]));
            }
            t.push(o);
          }
          this._Buttons = t;
        };
      (a.prototype.getButtons = function (e) {
        return this._Buttons;
      }),
        (a.prototype.getButton = function (e) {
          return this._Buttons.getObjectByAttribute("id", e);
        }),
        (e.Button = n),
        (e.Buttons = a);
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).Panel = function (e) {
      var n = new t.Bimface.UI.Panel.PanelConfig(),
        a = Object.assign({}, n.css, e.css),
        i = Object.assign({}, n, e);
      return (i.css = a), new t.Bimface.UI.Panel.Panel(i);
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).Tree = function (e, n, a, i, o) {
      var l = new t.Bimface.UI.Tree.TreeNodeConfig();
      (l.hasCheckbox = i), (l.isChecked = !0), (l.selection = o);
      let s = new t.Bimface.UI.Tree.TreeNode(l);
      return (
        s.element.setAttribute("data-filter", a),
        s.setTitle(""),
        s.setData(e, n),
        s
      );
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application"
        ),
        n =
          (t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer"),
          t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
          t.Web.Lang.Utility.Namespace.ensureNamespace(
            t,
            "Web.Lang.Utility.Dom"
          ));
      t.Bimface.Data.StatisticsDataManager.getInstance();
      e.WebApplication2D = function (e) {
        var a;
        if (t.Web.Lang.Utility.ClientHelper.getIsDesktop())
          a = n.create("div", "bf-container");
        else {
          (e.Toolbars = ["LeftSubToolbar"]),
            (e.Buttons = []),
            (e.enableViewHouse = !1),
            (a = n.create("div", "bf-container  bf-mobile bf-mobile-dwg"));
          var i = e.domElement.offsetHeight;
          a.style.fontSize = (75 * i) / 1340 + "px";
        }
        var o = this;
        let l = e;
        t.Bimface.Viewer.NavigationMode2D;
        var s = t.Bimface.Viewer.Viewer2DEvent;
        e.domElement.appendChild(a), (l.domElement = a);
        let r = new t.Bimface.Viewer.Viewer2D(l);
        (this.load = function (e) {
          r.load(e);
        }),
          (this.getViewer = function () {
            return r;
          }),
          (this.getToolbars = function () {
            return g;
          }),
          (this.getToolbar = function (e) {
            return g.getToolbar(e);
          }),
          (this._panels = {});
        var c = {
            MainToolbar: {
              id: "MainToolbar",
              title: "MainToolbar",
              element: a,
              className: "bf-toolbar bf-toolbar-bottom",
            },
            LeftSubToolbar: {
              id: "LeftSubToolbar",
              title: "LeftSubToolbar",
              element: a,
              className: "bf-toolbar bf-toolbar-select",
            },
          },
          d = {
            Home: {
              id: "Home",
              title: "适应屏幕",
              className: "bf-button gld-bf-home",
              handles: {
                Click: function () {
                  r.home();
                },
              },
            },
            RectZoom: {
              id: "RectZoom",
              title: "框选",
              type: "ToggleButton",
              className: "bf-button gld-bf-zoomrect",
              handles: {
                Click: function () {
                  var e = h.getControl("RectZoom");
                  r.rectZoom(),
                    r.addEventListener(
                      t.Bimface.Viewer.Viewer2DEvent.ViewZooming,
                      function () {
                        r.setNavigationMode(
                          t.Bimface.Viewer.NavigationMode2D.Pan
                        ),
                          e.setCheckedState(!1),
                          (r._opt.enableZoomRect = !1);
                      }
                    );
                },
              },
            },
            Information: {
              id: "Information",
              title: "关于BIMFACE",
              className: "bf-button gld-bf-information",
              type: "ToggleButton",
              handles: {
                Click: function () {
                  if (this.hasClass("bf-checked"))
                    if (o._panels.InformationPanel)
                      o._panels.InformationPanel.show();
                    else {
                      var e = new t.Bimface.Application.Panel(f.Information);
                      e.setHtml(
                        '<div class="bf-info"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAAAfCAYAAAB52CgrAAAABGdBTUEAALGPC/xhBQAAFJlJREFUeAHlXAt8VcWZn5lzbyAQIIRAoSISEnyBVq1u17oqspqg5WeLq65WixV8oNQVpGopdqtWVizUoi1QFJDCyq9VKau7KyGAPBStRayPtVLzIKBSH0A0JCHJvWdm/9+5Z86dc+85ed5AKPPLZGa++WbmO+fMf75vvjPn8q/s3jDCbrJPZUaQ3KpiPD5MSB7RZNtSasSI/LLdHx4YyBrVWZrupIL9jSnZhymR46P3772lV4OKNDQ1nGfSbcFraoqKt5m0oHywbGrXgZHj3tP8A6pK/4HH+SBdTk1VlFXsLyjZmUrv6rJSiudVrb/UspUIG6tntnr1o+PHHQir13T01Qf50xDzNK2DaRztXuWc17a3PWSguZCNWI/2sr3t28KPMU4AXwGifx61pXGS5zPI96dkMT2Hceg6oog8vbZdlCaM1RhpaoqN54z/C2PqAt2cMzWfSTXZZs7Dc8jgmV5dsS9PgoaGYyEI2iQCV+w55E5VTCbBaIk5/Iu6wXWcC8XV6UypqQb/H/PKS5eeXtRj+WZ+ET3YwODIxtkVTLELNQNX4nHk76RyfnnpWZLxYYrLXynFBmsenXLODnEmLur/QelDB0aW/ARyK13XlWl+1dqT8ipLL2eKD8M9/EHgWJwtbGgSX0XdE4H1IOIe90IyB/EWxB6ImQi0AI1uT0eQoxD8OxD7Ib6O8nm4l3Z7+gjjRV80ka9HvBdxVBhfe+jo83bItyi1DehTQLsP8bjUug6WbfQ5TGCw+Yqp1QDl1rCOuMWnK8m+jRk4Blc8E9e9E+3QJiQQgKQagWlwFTTUjWiTzThf4OdWV71T0fT0GLXJ03b+ekjE2aMA739hvdiSWueUOeunbLWEWeIO8H6SygM571cxiYejZg0oL1vkPrBUtoyW88o3nCptthnAnyO5XIOL2JM2AACEe9KDFqq0OpcAWYci+zbiHYiZAhD1PgJ90yrcnjALzAQgCt9AvNLJdfIf5CCNQPNoBWJGAOSKdJKbOgk9d0Qag4CVKQBR3xZibgTLHfAAICk1DRMWtKRGIi4NIPCNwYSoIhpjcpZSYjYm7mq08zSSU+UCCPSrUV9GNOQnYYxlGGkBCp5GIh4AiQFI14VoJLr4X6LtdNwGdJTUSM5Yic4BJLaEW+ImbhsaibM/o8FeaKgJDhuTtw6oKI3cr9Qt93eROdK/cv1pTMY3YEzHvLQYXwSL+E6uYms8eV0AgWcy7nZLZscStCny2jH2LvIViJ3RpjG0fxr3k9I2Bdx/AvP1Kcw/Qvn3KbSOFJejkfN83MYNSN9C/NQtByWtXf9naDQ7peGdKH/PoH2E/JuIcYPWkez7aPTXhBZIAxKqYNNxkdBADoDShkgCyXuuBoBS2X1AYurrur4NQCIQmkDSTZOpUilA4vlCRO6RdhwPOnnPaeI+VrEuCiDdmGkgDdxVdkY8Fl+P0fK1YBjvRMHi52PxWIWL+C7uqaOBSA7NE5Tiemlilbh1jUgnYOKXBvEeBtoMjJGquc6AjOM6IxPaX45+rzbk/zXy96JPAlLGAsYR6Ow+o0PaDszAOJ0FkNclDZAIGkhk2in2CuORH5IJFwwg3YiAxHcirmGCzyMTDkKbN0YzOinqJmH1zcYFkFr1ArVpzbQDzy9d0+5lr6GZcYDkmnaCz5QyDjNIpW/ElZoIIK28SilSxRkJ+RXrvh6PyY3ozAOQ7him8jSmrFXQ4v9BJlxrAHLbjdftkc7rzGQ1+ml3Fvd8ABrdbDTcbORnGvmOZKcbjZbhGmGSZxZAbv/9kdJ1UChHnI5xMgYg6jTCo9Y0yuggbJsNLyx5ofqjlwbxJlmJh/8zXQcLcK+0xTLBlc9Gz+7R9zVpNfVuamjeDQEXa35LqP0S9gy2jtqedqr6WFlv1kbtch6TL2peSt/dE7sQCU1GJ0AT3sVEEufcthVke167s6K9+lTJpnq//DGZlcsLf7VfVDVwIV7SfaWmGz57eRSA9N6zndwgF5WX96hhVaN5VDyYOoYuSyUOwhpdzISaACB58oq42qd5UtJhRnmLkT/cWdqP9XYHfR3ptYi7EHsiXgCQnYvn/Rry7Qpol40G5xuNOgtIo6u0LI2lwzbIK3UhU2lExez5vs7gRKiuXD9+f1Ex2fEf++paLhxCdeikNZvuRwEeswKYNyOh6bw9Esp/QZW3wVRSPcpsO4kiy5pBsoHH2WPEGg6OAI8nP/ZgtTISnVyjdsMbyHapuL0GqQ/wWg5Re2jmxtp1swCk73YUSAMqN5xToyqvxKSYqGLp3kFnLM439eqd92RT/YErlC3PgGb6vpYBnkXaEz2ty0aaZeTrjfxhy+KaCDwEIh0exgT8BPSnQLjNJdLkJ7OsvYG8ktoSqEa/tI/pqoB1ywtt3gt6LdqQSU5QMGsnglLygja07RQLvM034OoCvHbB3XIAiEn7WwDNmCAOAhCzopNZPP4Yl/bgmqKStYyLCQBmUxA/0TAhrt5YsW5VR0w7AhBMxjLIkxvWP7T4puze+eP3fvXsBrj/bwOADsIkXR7K370qyK2uzWHaQL/gijcPqe3mx+MeeoueS2tL0stg0oaFQTq6sh6INIBa3gNl9uLwAJw9EiZbivvbP44HIMXG+msSJRNAmKi0yjmhq4CkAYR71SYAaXmQ3nE0AAnPhTThXYbcj0BbwGeChTbhoX3GraNVnjx1x3RwQHQkAKTveitAUh0FkO4/00BqI4A2aw2k5TDSowFI10Peoa7Me5CuMuSnLL0A1uEaPMMTdOFYTMWRBJC+4RpIOF3g00hwLPzQMeFCNBDWRc+EMzWQ7lenmQJSOwD0LTLh9PgBqQMkuL6XB9QdURKeBS2s9xhC/ALax7eXQPkd1GunEL0mudvgP+ayES6yXmPCMXGf11dv25JuUmDAcZ1RVkT43hv0ZtGdYO5Zz2LDzUY8bh2UQllcSNMGZiqnV2Xsy/pH0M9ak59Jvt0sk2wKssFm+G9Nt6V6V+f3FZXsyKvaUMCi1lxz99hs9yYb3hcISP0r1uH9C04RhDgbMIFoj8SCnA2dBRCcjAukiDxrCgWvnZ6IJvlI53GP2EmuEOQ9XBIi0MOgX+bWTcK9ewDg+jyE9++aHGF280mYVJNxE0brK7VwggH5EE+bKo3HbK3qyUj+dR1rXC+taBazJfUzTvcD73EZk6wvThT8Y5LGV/PaQ6uwfGFfbp+JfcVEp47zL4QQl2g+J1XxE5VtT4J8p2m6xZyzcxupTIB29rhx+QDev/TVPFn8YCXyFbqsUx+QNDElDQJSZwFEQ0jJpio7/k09HBwMfxCW/SHKuzWtm6TmHudxACNQo4L+Cu7VNsh8HiK5kachzkI85kIED3cJVsmbgIa7TSC16U4AQNAAvSQdqbBjpyohVpIX3gSS2Q9uPI4J8Z04GkPqvxbl9xXjK5C/3AKA9hUWv2HyS9t+UkTErTIuZ5hA0jyCs0Gom88iYjKO/Cw1gaR5UlMNJLy7OtnzMaUwmUB6qWrjWeSFa9GJoOCFy8m/qRUTzhuFAIR3Rn9hNiezabVXEZy5F/J8FlzVbiqZajtw3xcFtcQ4F4N+tltXh5ROEbQUSBv9j8twO9rPQd8HW2pwhOvOh4xPZFAGsnjmQyGoKF6Ith9ILoAgFM7FOae4oRTkw8oSM4OA5AEI5+4w8B/pQuAevhP7nsfwwuCczwuL0zQHWKIypp4UUXFzGJDgMjqOdwBIo9R7Gz+u3IOXUI4nisRJCYqtr15/muDyDLyfm002ZVAQFts+enjPbZv52fGg+lSaBhBOg9yHLv+UWh9Q/nYArTOka/HMluB5+PY5bofmS8/F4KlpZSAyR8m8JkuBPJX0/ujniN01nAzBKGYyvAgQUfADKUFr4b8BoDQuA0jol1Y+cosmNFACQL4mBCR8X0Q0MgcCAmSLMRNIaTypQEpjCCC8x0c1968srYSp+QdUmy83E9wwL62I3Koa2VBoz38P6AIkvtXK4YtCDs+mNTEBlFZ5+AhknqUBHsA6B/SxrhjNSB9186EJniuaqTlg0C+Mp6H8GOih7+ZCOzt6Kw65IKIrSAIJk8ag+69OwYOGs6kjcbMm+WuMUhJIjUBQBKsuVilHAxlMySwBKa+ilB0oGtcqkFScBcpmAglmUm2y9/BcTeG4/wWQrmC2SgcSVz9SjXwpi/L5vJnB7FSn+HviW7P68ss+HVxS76eHlDjAylUuaaAQjjDyQ6igPV4mAjmE6KM83K60YGqhFeDZm8qhVuScwifWpTptfg8+krEAcQji9xEXI3bHsAVCLc+gYO/jPu2JWBG4kY2gJM8tKCpedMCgmVmYbk9Db1yExiSQE/Ch3G7Ycv2U4KTSEwEbFJ6bs6ZnY130UBMbj1X7Bl2F4y6f41O9PjDjyjSN0n6fbCn4cvCFuzTNEtbdjEsMlwgSpwMKikoWatniIloVETGf/LZkkX0jiz3ZdNuwNBBIOGkAk3QQgDOaNcM8sayJ2Me9gH2Zo1lJA7ULQBic94j+jsdi16AHT944E23Z67yIe/1amPyZoGNBJBPnO25f2NWmm2RqRf9hsVjsd6j7msvnJJCNPkybh8ICl057azIXHZevydsN8h9AruWZliNix50bkOzX4nN2V677JxA2JYnJ3IGiEvIorUhS2pRL488rX7vOVqw42ZpvFQfrP0DZA5Et7bnJiYuJKMTc6sqy88HzErWLyNgIuLzpAerQLLiYTN/11BRe4rnCdWVYagIJi4TNIuoRaLznMTaCysMxoolYEhYi/4OOAIh6kQ3217hg/4wJdimVKQgmaU+00ikc2X/3Yni9WK3GRCtPFac53jwFtNNjy3IujE6qS12klqHup4iDEAsRr0IkwB0TwV1Z3Wt1vweSqkOHCjtxw/hWrPqr8bKVvD2BgQAEP/HxzucZgRwMALLgYpezLCmHB7OEUwlIzOJXYC79GDuGnwBAPTQ3Jj4+MOT4PIT9Z3s1kO4D78pmQZG9gn7Walp3SHFtx0OO6wxZ5hh5J6ueGZWF/dxNVICamppaj2tqBG2+QSdQHjMhCaIWPqjr2rvhAsh5N+V8b582nAcgxq5Jq0wQPAABjCeH8LRKJiDxCD5+4/wN8hqaEY2Prxl56ffavAcKGk3Zs7shkGZAVNorUSgDIN5MZJP/mxuq8f5ZDSQKXAkT1Mp82vukBmhqHAJOBPpoz9O4qYx/b+WIc0HdAUDwZngGhXGXDxeA9JDuLwOFODg0VydSAhK3ZjmftSjvY7FOdNjxppjoA9Da0TBuL2laiOjc5lOxODks+B+JxxtvQeEBh+D+A/i+RH+LUNRaiF7adiuta8qbybzAj3w4PyqCG3B1JjturS/8CFDChCMNRAAKDOLnjgkXooHgoGjSJlxnNFDg0F1JdDUSNN6LXTlMG/r+N/D0dvleBxA2pbZp/m3umbi355p0OHhuUZvGJBZgsyJh0pFpR4E+2vtmIpv2n1zoOujxdfmoSyPY/zwXEexiqAFPjcOLvCPsSoZ+WJonrR5JMxCMJw5hX1RXs0hzD//vhTXWZzf3jRwSoPtueP8hg2p3fVjzVHZz3fXQPjP1nhZOjk/McWVUPRux+SVA2FuaDrh5csLJ8eqAirKvYMO+3FRjPAunIrpZwMmQ38AT+kJSLCwBVq+nkuXDm8MEz8GIcJR4IVgLsXguvK4/87h0Ztc7ZNKRk8kLACF9tLcchCkukbTR5W7eTP5mFOh1SQ7a1hm0rsr65m2mBolYgo/Az05NxYXQBtMJFo/TJnGDW/QlDY3qbaUah2oiLn71W7v448IW2fgg7iF4ts9O1jWW1cZxdi6WPDsHwGytr/r4wZ7SvgcA9rxzAMr23KyexV/oxkgtyUdg1bsdmmqYJgMsjyO/nsoDK0qLpJI54HkQxSyiUeCNOFKT+J7eKXeHfzhaNUXavpX5FckaaLEyJ9ThFJVMsjx3wPeRegeQTSGiN9SRdkrTUCZPSn4uyjcjWoj00d5ozJH/M3lQrgX9z6CdiUgTm/ZlPvMQ5UyFJqOj0418xrL4MRq5DCYd/fqJb1VpywgEIFhiO4UtcbQ/Plco8SRcxG+Et004EeA9861sBKC+0Z7F1QUXmRiiY0RLIxaO2Qf9dhsGUdjsA7QzBXc8R6aJEC5Ct6jhL+Msx7OWVL77cLhEwwSmBecuYzzvozuD1qEs5kQVGj7jNsaj9fZIqf0tNgj4wRtFoO6KcACdahPznK4YJwJ7Nwdnz5bhEOckHOL8BQbxNFJLV6QB5J5EeA53y7K5XGQpcRt+tBDKI6mREv34vHCv675DAQQGgCTHjrOlkQibHLc53hklNZJuD/lPwY97OUCSeMkHuqeRNE/3SglA6jmuaC/Ith8h2f4V4x7njr0H6aoMy0Gm4bVun/TR3lTMl9qUMZaifCPiNxDJO7gYfGRevorYGe1ML7Dp14McDYQ0jn7pRTBpOwo0zpVI6R1djAidCHRi4Rlnr5IKpNY6RcPgs3Dw3zpA4nwKYGR0YwDI8MK1BCDdmGSz49wAkq5JpgFASlZ2q5wJIHKm4O/IBDK3dEj76E5XdDTF/HgHE5WcJpch0hyjA6rbEL3gTu7vgLAOUZtZxEexs2EwOvip0cl9yJOT41yXdglSip0OuM4d3kaLJqs27fBwaXUKDmEA0twEJKV+AxPrCeBlO25WoBeO6gJNON2PkSaABI1Epp1QgbIRkLRpJ5nsdqYd4GJooDBvpHHRXZvV94dWfNLeXRFmo1O9ktpBA2BukCPpPMR5iIeCeDpIwzvhZMA4ZM5djLgIMZ6syUhO8QHlpT/2dYXvQcYWFi8M+xmpIVUbT2i2Y9f52wg6oDkQL+LyNR1XYVu5OQuds3ON6lYAM7nscv7x/qKS32resHRA+dqZ/naqbmzhuAVatjBZ3J/7Cuv2iNDJq3ko7T6ovfuLLl2eKhBWN/r8YYhLX4NJ8GkqT2fK6D8H7U9BrETftGfokoBxCtBxP8S3MY4GVOBY4CVX91hEakPydTTQvVqJ8fRC4evHvfbhIPZB9JSIj6nthX0Y56//Dy5GPw14sZShAAAAAElFTkSuQmCC" /><p>Powered by BIMFACE</p><a target="_blank" href="https://bimface.com">https://bimface.com</a></div>'
                      ),
                        (o._panels.InformationPanel = e),
                        e.addEventListener("Hide", function () {
                          v.getButton("Information").setCheckedState(!1);
                        });
                    }
                  else o._panels.InformationPanel.hide();
                },
              },
            },
            FullScreen: {
              id: "FullScreen",
              title: "全屏",
              className: "bf-button gld-bf-maximize",
              handles: {
                Click: function () {
                  var e = this.hasClass("gld-bf-maximize");
                  r.enableFullScreen(e),
                    t.Web.Lang.Utility.FullScreen.onFullScreenChanged(
                      function () {
                        var t = h.getControl("FullScreen");
                        t.getTitle();
                        t.toggleClassName("gld-bf-maximize"),
                          t.toggleClassName("gld-bf-minimize"),
                          e ? t.setTitle("全屏") : t.setTitle("取消全屏");
                      }
                    );
                },
              },
            },
          },
          f = {
            Information: {
              element: a,
              title: "BIMFACE",
              css: {
                left: "50%",
                top: "50%",
                width: "330px",
                height: "278px",
                transform: "translate(-50%,-50%)",
                zIndex: 999,
              },
              enableSizable: !1,
            },
          };
        if (!e.Toolbars || 0 == e.Toolbars.length) return !1;
        for (var m = [], p = 0, u = e.Toolbars.length; p < u; p++)
          m.push(c[e.Toolbars[p]]);
        var g = new t.Bimface.Application.Toolbars(m),
          h = g.getToolbar("MainToolbar");
        if (h) {
          var b = [];
          for (p = 0, u = e.Buttons.length; p < u; p++) b.push(d[e.Buttons[p]]);
          var v = new t.Bimface.Application.Buttons(b);
          h.addControls(v.getButtons());
        }
        var y = g.getToolbar("LeftSubToolbar");
        y &&
          r.addEventListener(s.Loaded, function (e) {
            for (
              var n = e.getViews(),
                a = {
                  type: "ComboBox",
                  id: "Views",
                  inheritTitle: !0,
                  className: "bf-combobox bf-family",
                  options: {},
                  handles: {
                    Change: function (e) {
                      r.showViewById(e.id);
                    },
                  },
                },
                i = 0,
                o = n.length;
              i < o;
              i++
            ) {
              var l = n[i];
              a.options[l.name] = {
                type: "ComboBoxOptionButton",
                title: l.name,
                id: l.id,
                className: "bf-button",
                html: `<span class="bf-button-name">${l.name}</span>`,
              };
            }
            var c = (a = new t.Bimface.Application.Buttons([
              a,
            ])).getButtons()[0];
            r.addEventListener(s.ViewChanged, function (e) {
              c.setSelectedControlById(e);
            }),
              y.addControls(a.getButtons());
          });
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      t.Bimface.Data.StatisticsDataManager.getInstance();
      var n = function (e, n) {
        var a;
        if ("dwgView" == e.viewType) {
          (o = new t.Bimface.Application.WebApplication2DConfig()).domElement =
            n;
          var i = t.Bimface.Application.WebApplication2DEvent;
          (a = new t.Bimface.Application.WebApplication2D(o)).load(e.viewToken);
        } else if ("rfaView" == e.viewType) {
          (o = new t.Bimface.Application.WebApplicationRfaConfig()).domElement =
            n;
          i = t.Bimface.Application.WebApplicationRfaEvent;
          (a = new t.Bimface.Application.WebApplicationRfa(o))
            .getViewer()
            .loadModel({ viewToken: e.viewToken }),
            a.addEventListener(i.ViewAdded, function () {
              var e = a.getViewer().getViewer();
              e.getNumOfElements(), e.getNumOfTriangles();
              a.render();
            });
        } else if ("drawingView" == e.viewType) {
          ((o =
            new t.Bimface.Application.WebApplicationDrawingConfig()).domElement =
            n),
            (o.drawingUrl = e.drawingUrl),
            (o.viewToken = e.viewToken),
            (o.MobileToolbars = [
              "MainToolbar",
              "SearchToolbar",
              "LeftSubToolbar",
            ]);
          i = t.Bimface.Application.WebApplicationDrawingEvent;
          (a = new t.Bimface.Application.WebApplicationDrawing(o))
            .getViewer()
            .loadDrawing({ viewToken: e.viewToken });
        } else if ("pdfView" === e.viewType) {
          const i = new t.Bimface.Application.WebApplicationPDFConfig();
          (i.domElement = n),
            (a = new t.Bimface.Application.WebApplicationPDF(i));
          a.getViewer().addView(e.viewToken);
        } else if ("gisView" === e.viewType) {
          const i = new t.Bimface.Application.WebApplicationGISConfig();
          (i.domElement = n),
            (a = new t.Bimface.Application.WebApplicationGIS(i)),
            a.addScene(e.viewToken);
        } else {
          var o;
          switch (
            (((o =
              new t.Bimface.Application.WebApplication3DConfig()).domElement =
              n),
            (o.MobileToolbars = ["MainToolbar", "ModelTree"]),
            this.getQueryString("renderMode"))
          ) {
            case "fullVolume":
              o.renderMode = "fullVolume";
              break;
            case "incremental":
              o.renderMode = "incremental";
              break;
            default:
              o.renderMode = "auto";
          }
          i = t.Bimface.Application.WebApplication3DEvent;
          (a = new t.Bimface.Application.WebApplication3D(o))
            .getViewer()
            .loadModel({ viewToken: e.viewToken });
        }
        return (a._application = a), a;
      };
      (n.prototype = {
        hideBimfaceInfo: function () {
          this._application
            .getToolbar("MainToolbar")
            .getControl("Information")
            .hide();
        },
        getQueryString: (e) => {
          var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
            n = window.location.search.substr(1).match(t);
          return null != n ? unescape(n[2]) : null;
        },
      }),
        (e.WebApplicationDemo = n);
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).WebApplicationDrawingConfig = function () {
      let e = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
      var n = {
        Toolbars: e
          ? ["MainToolbar", "LeftSubToolbar", "SearchToolbar"]
          : ["MainToolbar", "LeftSubToolbar"],
        Buttons: e
          ? [
              "Home",
              "RectZoom",
              "DrawingMeasure",
              "Map",
              "Layers",
              "Sheets",
              "Setting",
              "FullScreen",
            ]
          : ["Home", "DrawingMeasure", "Layers"],
        MobileToolbars: null,
        DefaultMobileToolbars: [
          "MainToolbar",
          "LeftSubToolbar",
          "SearchToolbar",
        ],
        MobileButtons: null,
        DefaultMobileButtons: [
          "Home",
          "RectZoom",
          "DrawingMeasure",
          "Layers",
          "Setting",
        ],
        MobileButtonsMap: {
          Home: "MobileHome",
          RectZoom: "RectZoom",
          DrawingMeasure: "DrawingMeasure",
          Layers: "Layers",
          Setting: "MobileSetting",
        },
        defaultDisplayMode: null,
      };
      let a = t.Bimface.Viewer.ViewerDrawingConfig();
      var i = Object.assign({}, a, n);
      return (i.staticPath = "/api/Glodon"), i;
    }),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      let n = Object.freeze({
        ViewAdded: "ViewAdded",
        ViewLoading: "ViewLoading",
        ComponentsSelectionChanged: "ComponentsSelectionChanged",
        ComponentsHoverChanged: "ComponentsHoverChanged",
        Error: "Error",
        Loaded: "Loaded",
        MouseClicked: "MouseClicked",
        MouseDragged: "MouseDragged",
        ContextMenu: "ContextMenu",
        Rendered: "Rendered",
        ViewChanged: "ViewChanged",
        ViewMoving: "ViewMoving",
        ViewMoved: "ViewMoved",
        ViewZooming: "ViewZooming",
        ViewZoomed: "ViewZoomed",
        Hover: "Hover",
        DrawingMeasure: "DrawingMeasure",
        ZoomFactorChanged: "ZoomFactorChanged",
      });
      e.WebApplicationDrawingEvent = n;
    })(),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer");
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer"),
        t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
      const n = t.Bimface.Data.StatisticsDataManager.getInstance(),
        a = "Glodon.Bimface.Application.WebApplicationDrawing";
      e.WebApplicationDrawing = function (e) {
        (this._plugins = []), (this.isMeasureEventAdded = !1);
        var i = this;
        let o = e;
        this._domElement = e.domElement;
        t.Bimface.UI.Control.ControlEvent;
        h(this);
        var l,
          s = t.Bimface.Viewer.ViewerDrawingEvent;
        e.MobileToolbars && n.send(a, "bf_c_MobileToolbars_new"),
          e.MobileButtons && n.send(a, "bf_c_MobileButtons_new");
        let r = new t.Web.Lang.EventManager();
        function c(e) {
          i._mainToolbarAdaptive();
        }
        (this.getEventManager = function () {
          return r;
        }),
          (l = new t.Bimface.Viewer.ViewerDrawing(o)).addEventListener(
            s.ViewChanged,
            function (e) {
              i.getEventManager().fireEvent(s.ViewChanged, e),
                l.miniMapDisplayed && (l.enableMiniMap(!0), l.update());
            }
          ),
          l.addEventListener(s.ContextMenu, function (e) {
            l.contextMenu && l.contextMenu.element && l.contextMenu.destroy();
            var n = e.clientPosition,
              a = e.containerBox,
              o = l.getSelectedElements();
            if (l.loadedDrawings.length > 0) {
              let e = [];
              l.loadedDrawings.map((t) => {
                const n = t.drawing.getSelectedObjects();
                n.length > 0 &&
                  e.push({ modelId: t.drawing.modelId, selectedObjects: n });
              }),
                (o = e);
            }
            var s = new t.Bimface.Application.UI.Menu.ContextMenu(i, o),
              r = {},
              c = s.element.getBoundingClientRect();
            a.width - n.x > 2 * c.width
              ? ((r.x = n.x),
                s.element.removeClass("bf-menu-left"),
                s.element.addClass("bf-menu-right"))
              : ((r.x = n.x - c.width),
                s.element.addClass("bf-menu-left"),
                s.element.removeClass("bf-menu-right"));
            a.height - n.y > c.height ? (r.y = n.y) : (r.y = n.y - c.height);
            (r.x += 2), (r.y += 2), s.setPosition(r), (l.contextMenu = s);
          }),
          (this.addEventListener = function (e, t) {
            this.getEventManager().addEvent(e, t);
          }),
          (this.removeEventListener = function (e, t) {
            this.getEventManager().removeEvent(e, t);
          }),
          (this.loadFrame = function (e, t) {
            l.loadFrame(e, t);
          }),
          l.addEventListener("RemovedAllDrawing", function () {
            let e = i.getPlugin("DrawingMeasure");
            e && e.clear(), i.UI && i.UI.destroy(), (i.UI = null);
          }),
          (this.getRenderInfo = function (e, t) {
            l.getRenderInfo(e, t);
          }),
          l.addEventListener(s.Loaded, function (n) {
            if (!i.UI) {
              var a = l.getDomElement(),
                o = new t.Bimface.Application.UI.UIConfig();
              ((o = Object.assign(o, e)).element = a),
                (o.viewer = l),
                (i.UI = new t.Bimface.Application.UI.UI(o)),
                i.UI.init(),
                window.addEventListener("resize", c);
            }
            i._mainToolbarAdaptive(),
              l.miniMapDisplayed && (l.enableMiniMap(!0), l.update());
          }),
          l.addEventListener(s.LoadDrawing, function () {
            if (!i.UI) {
              var n = l.getDomElement(),
                a = new t.Bimface.Application.UI.UIConfig();
              ((a = Object.assign(a, e)).element = n),
                (a.viewer = l),
                (i.UI = new t.Bimface.Application.UI.UI(a)),
                i.UI.init(),
                window.addEventListener("resize", c);
            }
            i._mainToolbarAdaptive();
          }),
          l.addEventListener(s.DrawingTransformed, function () {
            l.miniMapDisplayed && (l.enableMiniMap(!0), l.update());
          }),
          (this.getViewer = function () {
            return l;
          }),
          (this.getDrawingFrame = function (e) {
            l.getDrawingFrame(e);
          }),
          (this.load = function (e, t) {
            l.load(e, t),
              l.addEventListener(s.Loaded, function () {
                "pid-transfer" === l._viewMetaData.workerType &&
                  l.setDisplayMode(2);
              });
          }),
          (this.getAxisInfo = function (e) {
            l.getAxisInfo(e);
          }),
          (this.getToolbars = function () {
            return this.UI.getToolbars();
          }),
          (this.getPlugin = function (e) {
            return this.UI.getPlugin(e);
          }),
          (this.getToolbar = function (e) {
            return this.UI.getToolbar(e);
          }),
          (this._mainToolbarAdaptive = function () {
            let e = this.getToolbars();
            if (!(e && e.length >= 2 && !!i.getToolbar("MainToolbar"))) return;
            let t = i.getToolbar("MainToolbar");
            l.getDomElement().offsetWidth < 1e3
              ? t.addClassName("bf-toolbar-bottom-float-right")
              : t.removeClassName("bf-toolbar-bottom-float-right");
          }),
          (this.setDomElement = function (e) {
            const t = l.getDomElement(),
              n = t.parentElement;
            (t.style.width = "1px"),
              (t.style.height = "1px"),
              this.getViewer() && this.getViewer().resize(),
              n && n.removeChild(t),
              e.appendChild(t),
              (this._domElement = e),
              requestAnimationFrame(() => {
                (t.style.width = "100%"),
                  (t.style.height = "100%"),
                  this.getViewer() && this.getViewer().resize();
              });
          }),
          (this.destroy = function () {
            (r = null),
              this.UI && this.UI.destroy(),
              (this.UI = null),
              l && l.destroy(!0),
              (l = null),
              window.removeEventListener("resize", c),
              this._domElement &&
                ((this._domElement.innerHTML = ""), (this._domElement = null));
          });
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).WebApplicationPDFConfig = function () {
      let e = new t.Bimface.Viewer.ViewerPDFConfig();
      var n = Object.assign(
        {},
        {
          mainToolbar: {
            create: !0,
            items: {
              Pan: { create: !0 },
              ZoomOut: { create: !0 },
              ZoomIn: { create: !0 },
              FullScreen: { create: !0 },
            },
          },
          pageController: { create: !0 },
        },
        e
      );
      return (n.staticPath = "/api/Glodon"), n;
    }),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer");
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application"
        ),
        n =
          (t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer"),
          t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
          t.Web.Lang.Utility.Namespace.ensureNamespace(
            t,
            "Web.Lang.Utility.Dom"
          ));
      t.Bimface.Data.StatisticsDataManager.getInstance();
      e.WebApplicationPDF = function (e) {
        let a,
          i = e,
          o = t.Bimface.Viewer.ViewerPDFEvent,
          l = [],
          s = new t.Web.Lang.EventManager();
        (this.getEventManager = function () {
          return s;
        }),
          (a = new t.Bimface.Viewer.ViewerPDF(i)),
          (this.addEventListener = function (e, t) {
            this.getEventManager().addEvent(e, t);
          }),
          (this.removeEventListener = function (e, t) {
            this.getEventManager().removeEvent(e, t);
          }),
          h(this),
          (this.getViewer = function () {
            return a;
          }),
          (this.load = function (e) {
            a.load(e);
          }),
          (this.getToolbars = function () {
            return l;
          }),
          (this.getToolbar = function (e) {
            return l.getToolbar(e);
          }),
          (this.destroy = function () {
            if ((a.destroy(), l && l._Toolbars && l._Toolbars.length > 0))
              for (let e = 0, t = l._Toolbars.length; e < t; e++)
                l._Toolbars[e].destroy();
          });
        const r = () => {
          if (l && l._Toolbars && l._Toolbars.length > 0)
            for (let e = 0, t = l._Toolbars.length; e < t; e++)
              l._Toolbars[e].destroy();
          let i,
            s = a.getDomElement().querySelector(".bf-pdf-outer"),
            r = n.create("div", "bf-pdf-message");
          (r.style.display = "none"), s.appendChild(r);
          const c = (e) => {
            i && (clearTimeout(i), (i = void 0)),
              (r.innerHTML = e),
              r.removeClass("bf-pdf-message-hide"),
              (r.style.opacity = 1),
              (r.style.display = "block"),
              (i = setTimeout(() => {
                const e = () => {
                  (r.style.display = "none"),
                    r.removeEventListener("transitionend", e);
                };
                r.addClass("bf-pdf-message-hide"),
                  r.addEventListener("transitionend", e),
                  (r.style.opacity = 0),
                  (i = void 0);
              }, 1500));
          };
          a.enableFullScreen = function (e) {
            e
              ? t.Web.Lang.Utility.FullScreen.fullScreen(s)
              : t.Web.Lang.Utility.FullScreen.exitFullScreen();
          };
          let d = {
              MainToolbar: {
                id: "MainToolbar",
                title: "MainToolbar",
                element: s,
                className: "bf-toolbar bf-toolbar-bottom",
              },
              PageController: {
                id: "PageController",
                title: "PageController",
                element: s,
                className: "bf-toolbar bf-toolbar-select",
              },
            },
            f = {
              Pan: {
                id: "Pan",
                title: BimfaceLanguage.bf_btn_pan,
                className: "bf-button gld-bf-drag",
                type: "ToggleButton",
                handles: {
                  Click: () => {
                    let e = this.getToolbar("MainToolbar").getControl("Pan");
                    e._checked
                      ? (e.setCheckedState(!0), a.setDragMode())
                      : (e.setCheckedState(!1), a.setTextMode());
                  },
                },
              },
              ZoomIn: {
                id: "ZoomIn",
                title: BimfaceLanguage.bf_btn_zoomIn,
                className: "bf-button gld-bf-zoom-in",
                handles: {
                  Click: () => {
                    this.getToolbar("MainToolbar").getControl("ZoomIn")
                      ._enabled && a.zoomIn();
                  },
                },
              },
              ZoomOut: {
                id: "ZoomOut",
                title: BimfaceLanguage.bf_btn_zoomOut,
                className: "bf-button gld-bf-zoom-out",
                handles: {
                  Click: () => {
                    this.getToolbar("MainToolbar").getControl("ZoomOut")
                      ._enabled && a.zoomOut();
                  },
                },
              },
              FullScreen: {
                id: "FullScreen",
                title: BimfaceLanguage.bf_btn_fullScreen,
                className: "bf-button gld-bf-maximize",
                handles: {
                  Click: function () {
                    let e = this.hasClass("gld-bf-maximize");
                    e ? a.fullScreen() : a.exitFullScreen(),
                      t.Web.Lang.Utility.FullScreen.onFullScreenChanged(
                        function () {
                          let t = p.getControl("FullScreen");
                          t.toggleClassName("gld-bf-maximize"),
                            t.toggleClassName("gld-bf-minimize"),
                            e
                              ? t.setTitle(
                                  BimfaceLanguage.bf_btn_fullScreen_exit
                                )
                              : t.setTitle(BimfaceLanguage.bf_btn_fullScreen);
                        }
                      );
                  },
                },
              },
              Previous: {
                id: "Previous",
                title: BimfaceLanguage.bf_btn_previousPage,
                className: "bf-button gld-bf-previous",
                handles: {
                  Click: () => {
                    this.getToolbar("PageController").getControl("Previous")
                      ._enabled && a.previousPage();
                  },
                },
              },
              Next: {
                id: "Next",
                title: BimfaceLanguage.bf_btn_nextPage,
                className: "bf-button gld-bf-next",
                handles: {
                  Click: () => {
                    this.getToolbar("PageController").getControl("Next")
                      ._enabled && a.nextPage();
                  },
                },
              },
            },
            m = [];
          e.mainToolbar && e.mainToolbar.create && m.push(d.MainToolbar),
            e.pageController &&
              e.pageController.create &&
              m.push(d.PageController),
            (l = new t.Bimface.Application.Toolbars(m));
          let p = l.getToolbar("MainToolbar");
          if (p) {
            let n = [];
            for (let t in e.mainToolbar.items) {
              e.mainToolbar.items[t].create && n.push(f[t]);
            }
            let i = new t.Bimface.Application.Buttons(n);
            p.addControls(i.getButtons());
            let l = p.getControl("ZoomIn"),
              s = p.getControl("ZoomOut");
            a.addEventListener(o.ViewZoomed, (e) => {
              l &&
                (Math.abs(e.zoom - e.max) < 0.001 ? l.disabled() : l.enabled()),
                s &&
                  (Math.abs(e.zoom - e.min) < 0.001
                    ? s.disabled()
                    : s.enabled());
              let t = Math.round(100 * e.zoom) + "%";
              c(t);
            });
            let r = p.getControl("Pan");
            r && (r.element.style.marginLeft = 0);
          }
          let u = l.getToolbar("PageController");
          if (u) {
            let e = new t.Bimface.Application.Button(f.Previous);
            (e.element.style.marginLeft = 0), e.disabled(), u.addControl(e);
            let i = n.create("input", "bf-page-input");
            (i.type = "number"), u.element.appendChild(i), (i.value = 1);
            let l = n.create("span", "bf-page-count");
            u.element.appendChild(l);
            const s = a.getPageCount();
            l.innerHTML = s;
            let r = new t.Bimface.Application.Button(f.Next);
            u.addControl(r),
              1 === s && r.disabled(),
              a.addEventListener(o.ViewMoved, (t) => {
                let n = t.pageNo;
                n >= t.max ? (r.disabled(), (n = t.max)) : r.enabled(),
                  n <= t.min ? (e.disabled(), (n = t.min)) : e.enabled(),
                  (i.value = n);
              });
            const c = () => {
              let e = parseInt(i.value);
              !isNaN(e) && e >= 1 && e <= a.getPageCount()
                ? a.turnToPage(e)
                : (i.value = a.getCurrentPageNo());
            };
            i.addEventListener("keyup", (e) => {
              13 === e.keyCode && c();
            }),
              i.addEventListener("blur", c);
          }
          c("100%");
        };
        (this._mainToolbarAdaptive = () => {
          let e = this.getToolbars();
          if (
            !(
              e &&
              e._Toolbars &&
              e._Toolbars.length >= 2 &&
              !!this.getToolbar("MainToolbar")
            )
          )
            return;
          let t = this.getToolbar("MainToolbar");
          a.getDomElement().offsetWidth < 1e3
            ? t.addClassName("bf-toolbar-bottom-float-right")
            : t.removeClassName("bf-toolbar-bottom-float-right");
        }),
          a.addEventListener(o.ViewLoaded, () => {
            r(),
              this._mainToolbarAdaptive(),
              window.addEventListener("resize", (e) => {
                this._mainToolbarAdaptive();
              });
          });
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).WebApplicationDrawingSetConfig = function () {
      let e = t.Bimface.Viewer.ViewerDrawingSetConfig();
      var n = Object.assign({}, e, {
        Toolbars: ["MainToolbar"],
        Buttons: [
          "Home",
          "RectZoom",
          "DrawingMeasure",
          "Layers",
          "Annotation",
          "FullScreen",
          "Setting",
        ],
        defaultDisplayMode: null,
      });
      return (n.staticPath = "/api/Glodon"), n;
    }),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      let n = Object.freeze({
        ViewAdded: "ViewAdded",
        ViewLoading: "ViewLoading",
        ComponentsSelectionChanged: "ComponentsSelectionChanged",
        ComponentsHoverChanged: "ComponentsHoverChanged",
        Error: "Error",
        Loaded: "Loaded",
        MouseClicked: "MouseClicked",
        MouseDragged: "MouseDragged",
        ContextMenu: "ContextMenu",
        ActiveViewChanged: "ActiveViewChanged",
        Rendered: "Rendered",
        ViewChanged: "ViewChanged",
        ViewMoving: "ViewMoving",
        ViewMoved: "ViewMoved",
        ViewZooming: "ViewZooming",
        ViewZoomed: "ViewZoomed",
        AddDrawing: "AddDrawing",
        Hover: "Hover",
        ZoomFactorChanged: "ZoomFactorChanged",
        DrawingMeasure: "DrawingMeasure",
      });
      e.WebApplicationDrawingSetEvent = n;
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        );
      e.LayersSetPanel = function (e, a) {
        let i = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
        var o,
          l = t.Bimface.Viewer.Viewer3DEvent,
          s = [];
        if (
          (e.sets.forEach((e) => {
            s.push(e.viewerDrawing), e.active && (o = e.fileName);
          }),
          c)
        )
          return (
            c.show(),
            s.forEach((e) => {
              e.getViewer().addEventListener(
                l.ComponentsSelectionChanged,
                showLayers
              );
            }),
            c
          );
        var r = new t.Bimface.UI.Panel.PanelConfig();
        (r.title = BimfaceLanguage.bf_btn_layers),
          (r.className = "bf-panel bf-layers-panell"),
          (r.id = "layersSet"),
          (r.css = i
            ? { left: "10px", top: "10px", width: "300px", height: "416px" }
            : { left: 0, top: 0, width: "100%", height: "100%", zIndex: 9999 });
        var c = new t.Bimface.UI.Panel.Panel(r);
        c.element.addClass("layers-panel");
        let d = 0,
          f = [];
        var m = n.create("ul", "bf-layers bf-scroll-bar");
        s.forEach((e) => {
          var a = e.getLayers(!0);
          (this.layers = a),
            a.map((e) => {
              e.visible || d++;
            }),
            (a = t.Web.Lang.Utility.ClientHelper.sortByName(a)),
            f.push(a);
          for (var i = 0, l = a.length; i < l; ++i) {
            var s,
              r,
              c = n.create("li", "bf-layer"),
              u = a[i],
              g = e.getColor(u.color);
            u.visible
              ? ((s = "gld-bf-show"), (r = "显示"))
              : ((s = "gld-bf-hide"), (r = "隐藏"), c.addClass("disable"));
            var h = e._viewMetaData.name,
              b = h.split(".dwg")[0];
            (h = h == o ? "" : `${b} | `),
              (c.innerHTML = `<span title='${r}' class='eyes ${s}'></span>\n                        <span class='color'style='background:${g}'></span>\n                        <span class='name'>${h}${u.name}</span>`),
              c.setAttribute("layer-id", u.id),
              c.setAttribute("visible", u.visible),
              c.addEventListener("click", function () {
                this.toggleClass("disable");
                var t = this.querySelector(".eyes");
                t.toggleClass("gld-bf-show"), t.toggleClass("gld-bf-hide");
                var n = this.getAttribute("visible"),
                  a = this.getAttribute("layer-id");
                (n = "true" != n),
                  this.setAttribute("visible", n),
                  this.querySelector(".eyes").setAttribute(
                    "title",
                    n ? "显示" : "隐藏"
                  );
                var i = p.querySelector(".eyes");
                n
                  ? (e.showLayer(a, !0),
                    p.removeClass("disable"),
                    i.addClass("gld-bf-show"),
                    i.removeClass("gld-bf-hide"),
                    i.setAttribute("title", "显示"))
                  : (0 == m.querySelectorAll(".gld-bf-show").length &&
                      (p.addClass("disable"),
                      i.removeClass("gld-bf-show"),
                      i.addClass("gld-bf-hide"),
                      i.setAttribute("title", "隐藏")),
                    e.hideLayer(a, !0));
              }),
              m.appendChild(c);
          }
          e.changeLayers(a);
        });
        var p = n.create("div", "bf-allLayers");
        let u;
        d == f.length
          ? ((u = "gld-bf-hide"), p.addClass("disable"))
          : (u = "gld-bf-show"),
          (p.innerHTML = `<span title='显示' class='eyes ${u}'></span><span class='name'>${BimfaceLanguage.bf_panel_layers_all}</span>`),
          p.addEventListener("click", function () {
            var e = this.hasClass("disable");
            e
              ? s.forEach((e) => {
                  e.showAllLayers(), g(!0);
                })
              : s.forEach((e) => {
                  e.hideAllLayers(), g(!1);
                }),
              this.toggleClass("disable");
            var t = this.querySelector(".eyes");
            t.setAttribute("title", e ? "显示" : "隐藏"),
              t.toggleClass("gld-bf-show"),
              t.toggleClass("gld-bf-hide");
          });
        var g = function (e) {
          for (
            var t = document.querySelectorAll(".bf-layer"), n = 0, a = t.length;
            n < a;
            ++n
          ) {
            var i = t[n],
              o = i.querySelector(".eyes");
            e ? i.removeClass("disable") : i.addClass("disable"),
              i.setAttribute("visible", e),
              o.addClass(e ? "gld-bf-show" : "gld-bf-hide"),
              o.removeClass(e ? "gld-bf-hide" : "gld-bf-show"),
              o.setAttribute("title", e ? "显示" : "隐藏");
          }
        };
        return (
          c.container.appendChild(p),
          c.container.appendChild(m),
          c.element.setCss({ border: "solid 1px #333333" }),
          c.addEventListener("Hide", function () {
            a.setCheckedState(!1);
          }),
          c
        );
      };
    })(),
    (function () {
      var e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Web.Lang.Utility.Dom"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI.Panel"
      ).DrawingMeasurePanel = function (n, a) {
        let i = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
        var o,
          l = e.create("div", "bf-tab-container"),
          s = e.create("ul", "bf-measure-tab");
        s.addEventListener(
          "click",
          function (e) {
            s.hasClass("tab-open")
              ? (s.removeClass("tab-open"), o.element.removeClass("tab-open"))
              : (s.addClass("tab-open"), o.element.addClass("tab-open"));
          },
          !0
        );
        var r = e.create("div", "bf-tab-body"),
          c = e.create("div", "bf-tab-foot");
        (c.innerHTML = `<div class="settingBtn">${BimfaceLanguage.bf_panel_measure_clearAll}<div>`),
          c.addEventListener("click", function () {
            n.clear();
          });
        var d = e.create("span", "bf-clear-all gld-bf-measure-settings");
        d.addEventListener("click", function (e) {
          g(), e.preventDefault(), e.stopPropagation();
        }),
          c.appendChild(d);
        var f = e.create("div", "bf-measure-tabface");
        (f.innerHTML =
          '<li class="bf-measure-tab-item" data-type="Distance">\n                            <i class="gld-bimface gld-bf-distance"></i>\n                        </li>'),
          f.addEventListener("click", function (e) {
            s.hasClass("tab-open")
              ? (s.removeClass("tab-open"), o.element.removeClass("tab-open"))
              : (s.addClass("tab-open"), o.element.addClass("tab-open"));
          }),
          l.appendChild(s),
          l.appendChild(r),
          l.appendChild(c);
        var m = e.create("div", "bf-setting-container"),
          p = e.create("div", "bf-setting-body"),
          u = e.create("div", "bf-setting-foot");
        m.appendChild(p), m.appendChild(u);
        var g = function (e) {
            v(!1);
            var a,
              i = n.getScale(),
              l = n.getPrecision(),
              s = n.getUnits();
            (a = `<ul class="bf-measure-setting">\n                  <li class="bf-measure-scale">\n                      <span >${BimfaceLanguage.bf_panel_measure_scale} :</span>\n                      <div class="scaleWrap">\n                          1: <input type="number"min="1" max="2000" value ="${i}" >\n                          <span>${BimfaceLanguage.bf_panel_measure_scaleInput} </span>\n                      </div>\n                  </li>\n                  <li class="bf-measure-lengthUnits">\n                      <span >${BimfaceLanguage.bf_panel_measure_units} :</span>\n                      <div class = 'unit'></div>\n                      </li>\n                  <li class="bf-measure-precision">\n                      <span >${BimfaceLanguage.bf_panel_measure_precision} :</span>\n                      <div class = 'unit'></div>\n                  </li>\n\n                </ul>`),
              (p.innerHTML = a);
            var r = "";
            p.querySelector(".scaleWrap input").oninput = function (e) {
              var t = e.target.value;
              if ("." == e.data || "e" == e.data) {
                var n = (t || r).replace(/\./g, "").replace(/e/g, "");
                e.target.setAttribute("value", n), (e.target.value = n);
              }
              !(r = e.target.value) || r > 2e3 || r < 1
                ? e.target.addClass("error")
                : e.target.removeClass("error");
            };
            var c = new t.Bimface.Application.Button({
              type: "ComboBox",
              id: "units",
              inheritTitle: !0,
              className: "bf-combobox",
              options: {},
              handles: { Change: function (e) {} },
            });
            for (var d in h) {
              var f = {
                type: "ComboBoxOptionButton",
                title: (b = h[d]),
                id: d,
                className: "bf-button",
                html: `<span class="bf-button-name">${b}</span>`,
              };
              c.addControl(new t.Bimface.Application.Button(f));
            }
            c.setSelectedControlById(s.distance),
              p
                .querySelector(".bf-measure-lengthUnits .unit")
                .appendChild(c.element),
              (c.element.onclick = function () {
                m.element.removeClass("bf-expand");
              });
            var m = new t.Bimface.Application.Button({
                type: "ComboBox",
                id: "units",
                inheritTitle: !0,
                className: "bf-combobox",
                options: {},
                handles: { Change: function (e) {} },
              }),
              g = { 0: "0", 1: "0.0", 2: "0.00", 3: "0.000" };
            for (var d in g) {
              var b;
              f = {
                type: "ComboBoxOptionButton",
                title: (b = g[d]),
                id: d.toString(),
                className: "bf-button",
                html: `<span class="bf-button-name">${b}</span>`,
              };
              m.addControl(new t.Bimface.Application.Button(f));
            }
            m.setSelectedControlById(l.distance),
              p
                .querySelector(".bf-measure-precision .unit")
                .appendChild(m.element),
              (m.element.onclick = function () {
                c.element.removeClass("bf-expand");
              }),
              (u.innerHTML = `<div class="bf-measure-btns">\n                                    <span class= 'save'>${BimfaceLanguage.bf_panel_measure_save} </span> <span class= cancel>${BimfaceLanguage.bf_general_cancel}</span>\n                               </div>`),
              (u.querySelector(".save").onclick = function () {
                var e = m.getCurrentControl().id,
                  t = p.querySelector(".scaleWrap input").value,
                  a = c.getCurrentControl().id;
                t < 1 ||
                  t > 2e3 ||
                  (n.setScale(t),
                  n.setPrecision({ distance: e, area: e, angle: e }),
                  n.setUnits({ distance: a, area: a }),
                  v(!0),
                  y(o.data),
                  n.getEventManager().fireEvent("MeasureParamsUpdated"));
              }),
              (u.querySelector(".cancel").onclick = function () {
                v(!0);
              });
          },
          h = {
            None: BimfaceLanguage.bf_general_none,
            Meter: "m",
            Centimeter: "cm",
            Millimeter: "mm",
          },
          v = function (e) {
            e
              ? (o.setTitleContent(BimfaceLanguage.bf_btn_measure),
                (o.element.querySelector(".bf-close").style.display = "block"),
                (m.style.display = "none"),
                (l.style.display = "block"))
              : ((o.element.querySelector(".bf-close").style.display = "none"),
                o.setTitleContent(BimfaceLanguage.bf_panel_measure_setting),
                (m.style.display = "block"),
                (l.style.display = "none"));
          },
          y = function (e) {
            o.data = e;
            var a,
              l = n.getMeasureType(),
              c = (n.getPrecision(), n.getScale(), n.getUnits()),
              d = null,
              m =
                ("None" != c.distance &&
                  `<span class='units'>${h[c.distance]}</span>`) ||
                "",
              p =
                ("None" != c.area &&
                  `<span class='units'>${h[c.area]}</span>`) ||
                "";
            s.innerHTML = `<li class="bf-measure-tab-item ${
              l == t.Bimface.Plugins.Measure.MeasureTypeOption.Distance &&
              "bf-active"
            }" data-type="Distance">\n          <i class="gld-bimface gld-bf-distance" title="${
              BimfaceLanguage.bf_tip_measure_distance
            }"></i>\n        </li>\n        ${
              i
                ? `\n        <li class="bf-measure-tab-item ${
                    l ==
                      t.Bimface.Plugins.Measure.MeasureTypeOption
                        .PolylineDistance && "bf-active"
                  }" data-type="PolylineDistance">\n          <i class="gld-bimface gld-bf-mulline-md" title="${
                    BimfaceLanguage.bf_tip_measure_polyline
                  }"></i>\n        </li>\n        `
                : ""
            }\n        <li class="bf-measure-tab-item ${
              l == t.Bimface.Plugins.Measure.MeasureTypeOption.Angle &&
              "bf-active"
            }" data-type="Angle">\n          <i class="gld-bimface gld-bf-angle" title="${
              BimfaceLanguage.bf_tip_measure_angle
            }"></i>\n        </li>\n        <li class="bf-measure-tab-item ${
              l == t.Bimface.Plugins.Measure.MeasureTypeOption.Area &&
              "bf-active"
            }" data-type="Area">\n          <i class="gld-bimface gld-bf-area" title="${
              BimfaceLanguage.bf_tip_measure_area
            }"></i>\n        </li>`;
            for (
              var u = s.querySelectorAll(".bf-measure-tab-item"), g = 0;
              g < u.length;
              g++
            )
              u[g].addEventListener("click", function () {
                for (var e = 0; e < u.length; e++)
                  u[e].removeClass("bf-active");
                var t = this.getAttribute("data-type");
                this.addClass("bf-active"), n.setMeasureType(t);
                let a = n.getSelectedItem(),
                  i =
                    a && a.type == t
                      ? w(n.drawableManager.mapMeasureInfo[a.getId()])
                      : {};
                y(i);
              });
            if (l == t.Bimface.Plugins.Measure.MeasureTypeOption.Distance) {
              let t = e ? e.distance : null,
                n = e ? e.distanceX : null,
                i = e ? e.distanceY : null;
              (a = `<ul class="bf-measure-info">\n                  <li class="bf-measure-distance">\n                  ${
                BimfaceLanguage.bf_panel_measure_distance
              }：\n                    <span class="bf-measure-value">${
                t ? t + m : "--"
              }</span>\n                    <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${
                BimfaceLanguage.bf_tip_section_resetBox
              }"><span></li>\n                  <li class="bf-measure-x">X： ${
                n || "--"
              }</li>\n                  <li class="bf-measure-y">Y： ${
                i || "--"
              }</li>\n\n                </ul>`),
                (d = u[0]),
                o.element.removeClass("miniStyle");
            } else if (
              l == t.Bimface.Plugins.Measure.MeasureTypeOption.PolylineDistance
            ) {
              let t = null;
              e && (t = e.totalDistance),
                (a = `<ul class="bf-measure-info">\n                <li class="bf-measure-distance">\n                ${
                  BimfaceLanguage.bf_panel_measure_total_distance
                }：\n                  <span class="bf-measure-value">${
                  t ? t + m : "--"
                }</span>\n                  <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${
                  BimfaceLanguage.bf_tip_section_resetBox
                }"><span></li>\n              </ul>`),
                (d = u[1]),
                o.element.addClass("miniStyle");
            } else if (l == t.Bimface.Plugins.Measure.MeasureTypeOption.Angle) {
              let t = null;
              e && (t = e.angle),
                (a = `<ul class="bf-measure-info">\n                <li class="bf-measure-distance">\n                ${
                  BimfaceLanguage.bf_panel_measure_angle
                }：\n                  <span class="bf-measure-value">${
                  t ? t + "<span class='units'>°</span>" : "--"
                }</span>\n                  <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${
                  BimfaceLanguage.bf_tip_section_resetBox
                }"><span></li>\n              </ul>`),
                (d = u[1]),
                o.element.addClass("miniStyle");
            } else if (l == t.Bimface.Plugins.Measure.MeasureTypeOption.Area) {
              let t = null;
              e && (t = e.area),
                p && (p += "<i class='square'>2</i>"),
                (a = `<ul class="bf-measure-info">\n                <li class="bf-measure-distance">\n                ${
                  BimfaceLanguage.bf_panel_measure_area
                }：\n                  <span class="bf-measure-value">${
                  t ? t + p : "--"
                }</span>\n                  <span class="bf-measure-reset gld-bimface gld-bf-reset-box" title="${
                  BimfaceLanguage.bf_tip_section_resetBox
                }"><span></li>\n              </ul>`),
                (d = u[2]),
                o.element.addClass("miniStyle");
            }
            (r.innerHTML = a),
              r
                .querySelector(".gld-bf-reset-box")
                .addEventListener("click", function () {
                  n.reset();
                }),
              (f.innerHTML = ""),
              f.appendChild(d.cloneNode(!0));
          },
          C = new t.Bimface.UI.Panel.PanelConfig();
        (C.title = BimfaceLanguage.bf_btn_measure),
          (C.id = "MeaurePanel"),
          (C.className = "bf-panel bf-measurement-panel"),
          (C.css = i
            ? {
                right: "10px",
                bottom: "220px",
                width: "200px",
                height: "220px",
              }
            : {
                maxWidth: "414px",
                left: "50%",
                transform: "translate(-50%)",
                bottom: "0.12em",
                width: "100%",
                height: "1.7em",
              });
        var w = function (e) {
          let t = { type: e.type },
            a = n.getMeasureParams();
          if ("Distance" === e.type) {
            var i = e.end[0] - e.start[0],
              o = e.end[1] - e.start[1],
              l = Math.sqrt(i * i + o * o);
            (t.distance = b.formatDistance(l, a)),
              (t.distanceX = b.formatDistance(i, a)),
              (t.distanceY = b.formatDistance(o, a));
          } else
            "Angle" === e.type
              ? (t.angle = b.formatPrecision(e.angle, a.precision))
              : "Area" === e.type
              ? (t.area = b.formatArea(e.area, a))
              : "PolylineDistance" === e.type &&
                (t.totalDistance = b.formatDistance(e.totalDistance, a));
          return t;
        };
        if (
          ((C.enableSizable = !1),
          n.viewer.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.Measuring,
            function () {
              y();
            }
          ),
          n.viewer.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.Measured,
            function (e) {
              e ? y(w(e)) : y();
            }
          ),
          n.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.MeasureResultUpdating,
            function (e) {
              e ? y(w(e)) : y();
            }
          ),
          n.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.MeasureResultUpdated,
            function (e) {
              e ? y(w(e)) : y();
            }
          ),
          n.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.MeasureSelected,
            function (e) {
              if (e.isDataEmpty) return void y();
              let t = s.querySelectorAll(".bf-measure-tab-item");
              for (const n of t)
                n.getAttribute("data-type") === e.type
                  ? n.addClass("bf-active")
                  : n.removeClass("bf-active");
              n.setMeasureType(e.type), y(w(e));
            }
          ),
          n.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.MeasureUnselected,
            function (e) {
              y();
            }
          ),
          n.addEventListener(
            t.Bimface.Plugins.Measure.MeasureEvent.Reset,
            function () {
              y(), v(!0);
            }
          ),
          (o = new t.Bimface.UI.Panel.Panel(C)).container.appendChild(l),
          o.container.appendChild(m),
          o.bringToFront(),
          !i)
        ) {
          var B = a.offsetWidth,
            L = a.offsetHeight;
          (o.element.style.fontSize = (100 * Math.min(B, L, 414)) / 750 + "px"),
            o.element.addClass("measure-panel"),
            (o.element.querySelector(
              ".bf-close"
            ).innerHTML = `<span class='quit'>${BimfaceLanguage.bf_general_exit}</span>`),
            o.element.appendChild(f);
        }
        return y(), o;
      };
    })(),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Bimface.Application.UI.Panel"
        ),
        n = t.Web.Lang.Utility.Namespace.ensureNamespace(
          t,
          "Web.Lang.Utility.Dom"
        );
      e.PrintModePanel = function (e) {
        var a = new t.Bimface.UI.Panel.PanelConfig(),
          i = this;
        let o;
        (o = "ViewerDrawingSet" == e.viewerType ? e : e.getViewer()),
          (this.viewer = o),
          (this.status = { print: o.getDisplayMode() }),
          (a.title = BimfaceLanguage.bf_btn_settings),
          (a.css = {
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-200px)",
            width: "330px",
            height: "auto",
          }),
          (a.id = "Setting"),
          (a.enableSizable = !1),
          (a.className = "bf-panel bf-settings-panel");
        var l = new t.Bimface.UI.Panel.Panel(a),
          s = n.create("form", "bf-setting"),
          r = n.create("div", "bf-setting-foot"),
          c = `<ul class="bf-setting-tab-default bf-show">\n\n        \n        <li class="bf-setting-li">\n          <span class="bf-setting-name">${
            BimfaceLanguage.bf_panel_settings_displayMode
          }：</span>\n          <div class="bf-setting-value printmode">\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input normal" name='menu' mode="普通模式" ${
            0 == this.status.print ? "checked" : ""
          }>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
            BimfaceLanguage.bf_panel_settings_normalMode
          }</span>\n            </label>\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name='menu' mode="白底模式" ${
            1 == this.status.print ? "checked" : ""
          }>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
            BimfaceLanguage.bf_panel_settings_whiteBgMode
          }</span>\n            </label>\n            <label class="bf-radio">\n              <input type="radio" class="bf-radio-input" name='menu' mode="黑白模式" ${
            2 == this.status.print ? "checked" : ""
          }>\n              <span class="bf-radio-display"></span>\n              <span class="bf-radio-value">${
            BimfaceLanguage.bf_panel_settings_monoBgMode
          }</span>\n            </label>\n          </div>\n        </li>\n        </ul>\n       `,
          d = `<div class="bf-reset">\n          <span class="reset">${BimfaceLanguage.bf_panel_settings_restore}</span>\n        </div>`;
        (s.innerHTML = c), (r.innerHTML = d);
        var f = s.querySelectorAll(".printmode .bf-radio-input");
        for (let e = 0, t = f.length; e < t; e++)
          f[e].addEventListener("change", function () {
            var t = e;
            o.setDisplayMode(t);
          });
        return (
          r.querySelector(".reset").addEventListener("click", function () {
            let e =
              null != o._opt.defaultDisplayMode
                ? o._opt.defaultDisplayMode
                : i.status.print;
            f[e].click();
          }),
          l.container.appendChild(s),
          l.container.appendChild(r),
          l
        );
      };
    })(),
    (function () {
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer");
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application"
      );
      t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Bimface.Viewer"),
        t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility"),
        t.Web.Lang.Utility.Namespace.ensureNamespace(t, "Web.Lang.Utility.Dom");
      const n = "Glodon.Bimface.Application.WebApplicationDrawingSet",
        a = t.Bimface.Data.StatisticsDataManager.getInstance();
      e.WebApplicationDrawingSet = function (e) {
        let i = t.Web.Lang.Utility.ClientHelper.getIsDesktop();
        var o = this,
          l = [],
          s = [];
        let r = e;
        var c,
          d = t.Bimface.UI.Control.ControlEvent,
          f = t.Bimface.Viewer.ViewerDrawingSetEvent,
          m = (c = new t.Bimface.Viewer.ViewerDrawingSet(r)).getRootElement();
        h(this),
          c.addEventListener(f.Loaded, function () {
            !(function () {
              window.bimfaceSdkVersion &&
                (a.send(n, "sdkVersion"), delete window.bimfaceSdkVersion);
              if (l && l._Toolbars && l._Toolbars.length > 0)
                for (var s = 0, r = l._Toolbars.length; s < r; s++)
                  l._Toolbars[s].destroy();
              var p,
                u,
                g,
                h,
                b,
                v,
                y = {
                  MainToolbar: {
                    id: "MainToolbar",
                    title: "MainToolbar",
                    element: m,
                    className: "bf-toolbar bf-toolbar-bottom",
                  },
                  LeftSubToolbar: {
                    id: "LeftSubToolbar",
                    title: "LeftSubToolbar",
                    element: m,
                    className: "bf-toolbar bf-toolbar-select",
                  },
                },
                C = {
                  Home: {
                    id: "Home",
                    title: BimfaceLanguage.bf_btn_home,
                    className: "bf-button gld-bf-home",
                    handles: {
                      Click: function () {
                        o.getViewer().home();
                      },
                    },
                  },
                  Layers: {
                    id: "Layers",
                    title: BimfaceLanguage.bf_btn_layers,
                    type: "ToggleButton",
                    className: "bf-button gld-bf-layers",
                    handles: {
                      Click: function () {
                        var e = B.getControl("Layers");
                        e._checked
                          ? (e.setCheckedState(!0),
                            p
                              ? p.show()
                              : ((p =
                                  new t.Bimface.Application.UI.Panel.LayersSetPanel(
                                    c,
                                    e
                                  )),
                                i || p.element.addClass("layers-panel"),
                                m.appendChild(p.element),
                                o.addPanel(p)))
                          : (e.setCheckedState(!1), p.hide()),
                          e.addEventListener(d.StateChange, function (e) {
                            e || p.hide();
                          });
                      },
                    },
                  },
                  PrintMode: {
                    id: "PrintMode",
                    title: BimfaceLanguage.bf_btn_settings,
                    type: "ToggleButton",
                    className: "bf-button gld-bf-settings",
                    handles: {
                      Click: function () {
                        var e = B.getControl("PrintMode");
                        if (e._checked) {
                          if (v) return v.show();
                          (v =
                            new t.Bimface.Application.UI.Panel.PrintModePanel(
                              o.getActiveViewer()
                            )).addEventListener("Hide", function () {
                            e.setCheckedState(!1), v.isShow && v.hide();
                          }),
                            m.appendChild(v.element);
                        } else v.toggle();
                      },
                    },
                  },
                  DrawingMeasure: {
                    id: "DrawingMeasure",
                    title: BimfaceLanguage.bf_btn_measure,
                    type: "ToggleButton",
                    className: "bf-button gld-bf-measure",
                    handles: {
                      Click: function () {
                        var e = o.getActiveViewer();
                        o.getViewer().getActiveDrawing();
                        if (!g || g.viewer.url !== e.url) {
                          var n = new t.Bimface.Plugins.Measure.MeasureConfig();
                          (n.viewer = e),
                            (g = new t.Bimface.Plugins.Measure.Measure(n)),
                            (o._measureFunc = g);
                        }
                        var a = e.getDomElement(),
                          i = B.getControl("DrawingMeasure");
                        if (i._checked) {
                          i.setCheckedState(!0);
                          var l = o.getViewer();
                          g.addEventListener("typeChange", function () {
                            o
                              .getActiveViewer()
                              .getViewer().mouseEditorMgr.editors[0].captureFail =
                              function (e, t, n) {
                                return e && l.verify(e, t, n), !1;
                              };
                          }),
                            (u =
                              new t.Bimface.Application.UI.Panel.DrawingMeasurePanel(
                                g,
                                a
                              )).addEventListener("Hide", function () {
                              i.setCheckedState(!1),
                                g.switchOff(),
                                e
                                  .getEventManager()
                                  .fireEvent("ButtonOnToolbarClicked", {
                                    id: "Measure",
                                    isChecked: !1,
                                  });
                            }),
                            a.appendChild(u.element),
                            g.switchOn(),
                            (o
                              .getActiveViewer()
                              .getViewer().mouseEditorMgr.editors[0].captureFail =
                              function (e, t, n) {
                                return l.verify(e, t, n), !1;
                              });
                        } else
                          i.setCheckedState(!1),
                            a.removeChild(u.element),
                            (u = null),
                            g.switchOff();
                        e
                          .getEventManager()
                          .fireEvent("ButtonOnToolbarClicked", {
                            id: "Measure",
                            isChecked: i._checked,
                          }),
                          i.addEventListener(d.StateChange, function (e) {
                            if (!e) {
                              g.setMeasureType(
                                t.Bimface.Plugins.Measure.MeasureTypeOption
                                  .Distance
                              );
                              var n = o.getActiveViewer();
                              n
                                .getViewer()
                                .mouseEditorMgr.activeEditorByName("pick"),
                                n.update(),
                                u.hide();
                            }
                          });
                      },
                    },
                  },
                  RectZoom: {
                    id: "RectZoom",
                    title: BimfaceLanguage.bf_btn_zoom,
                    type: "ToggleButton",
                    className: "bf-button gld-bf-zoomrect",
                    handles: {
                      Click: function () {
                        var e = B.getControl("RectZoom"),
                          t = !1;
                        !e._checked && t
                          ? (c.setNavigationMode("pick"), (t = !1))
                          : (c.rectZoom(),
                            (t = !0),
                            c.addEventListener(f.ViewZoomed, function () {
                              e._checked &&
                                t &&
                                setTimeout(function () {
                                  e.setCheckedState(!1),
                                    c.isAlignment && c.startMoving(!0);
                                }, 200);
                            })),
                          e.addEventListener(d.StateChange, function (e) {
                            if (!e && t) {
                              t = !1;
                              var n = B.getControl("DrawingMeasure");
                              n && n._checked
                                ? c.setNavigationMode("measure")
                                : c.isAlignment
                                ? c.startMoving(!0)
                                : c.setNavigationMode("pick");
                            }
                          });
                      },
                    },
                  },
                  Annotation: {
                    id: "Annotation",
                    title: "批注",
                    className: "bf-button gld-bf-notes",
                    handles: {
                      Click: function () {
                        var e =
                            new t.Bimface.Plugins.Annotation.AnnotationToolbarConfig(),
                          n = o.getActiveViewer();
                        (e.viewer = n),
                          (h = o._annotation =
                            new t.Bimface.Plugins.Annotation.AnnotationToolbar(
                              e
                            )),
                          (b =
                            t.Bimface.Plugins.Annotation
                              .AnnotationToolbarEvent),
                          B.hide();
                        var a = B.getControl("Measure");
                        a && a.setCheckedState(!1);
                        var i = B.getControl("DrawingMeasure");
                        i._checked && i.toggleCheckedState(),
                          h.show(),
                          h.addEventListener(b.Saved, function () {
                            B.show(), n.setNavigationMode("pick");
                          }),
                          h.addEventListener(b.Cancelled, function () {
                            B.show(), n.setNavigationMode("pick");
                          });
                      },
                    },
                  },
                  FullScreen: {
                    id: "FullScreen",
                    title: BimfaceLanguage.bf_btn_fullScreen,
                    className: "bf-button gld-bf-maximize",
                    handles: {
                      Click: function () {
                        var e = this.hasClass("gld-bf-maximize");
                        c.enableFullScreen(e),
                          t.Web.Lang.Utility.FullScreen.onFullScreenChanged(
                            function () {
                              var t = B.getControl("FullScreen");
                              t.getTitle();
                              t.toggleClassName("gld-bf-maximize"),
                                t.toggleClassName("gld-bf-minimize"),
                                e
                                  ? t.setTitle(
                                      BimfaceLanguage.bf_btn_fullScreen_exit
                                    )
                                  : t.setTitle(
                                      BimfaceLanguage.bf_btn_fullScreen
                                    );
                            }
                          );
                      },
                    },
                  },
                  Setting: {
                    id: "Setting",
                    title: BimfaceLanguage.bf_btn_settings,
                    type: "ToggleButton",
                    className: "bf-button gld-bf-settings",
                    handles: {
                      Click: function () {
                        var e = B.getControl("Setting");
                        if (e._checked) {
                          if (v) return v.show();
                          (v =
                            new t.Bimface.Application.UI.Panel.PrintModePanel(
                              c
                            )).addEventListener("Hide", function () {
                            e.setCheckedState(!1), v.isShow && v.hide();
                          }),
                            m.appendChild(v.element);
                        } else v.toggle();
                      },
                    },
                  },
                };
              if (
                (document.addEventListener(
                  "keydown",
                  function (e) {
                    if (27 == e.which) {
                      var t = B.getControl("DrawingMeasure"),
                        n = B.getControl("RectZoom");
                      if (g && t && t.isChecked()) {
                        const e = g.viewerDrawing.mouseEditorMgr.getEditor();
                        1 == e.points.length
                          ? g.drawableManager.setIsEnableSelection(!0)
                          : 0 == e.points.length && t.setCheckedState(!1);
                      }
                      n && n.setCheckedState(!1),
                        o.getViewer().getActiveDrawing() &&
                          Array.from(
                            o
                              .getViewer()
                              .getActiveDrawing()
                              .viewerDrawing.getSelectedElements()
                          ).length > 0 &&
                          o
                            .getViewer()
                            .getActiveDrawing()
                            .viewerDrawing.clearSelection();
                    }
                  },
                  !0
                ),
                !e.Toolbars || 0 == e.Toolbars.length)
              )
                return !1;
              var w = [];
              for (s = 0, r = e.Toolbars.length; s < r; s++)
                w.push(y[e.Toolbars[s]]);
              var B = (l = new t.Bimface.Application.Toolbars(w)).getToolbar(
                "MainToolbar"
              );
              if (B) {
                var L = [];
                for (s = 0, r = e.Buttons.length; s < r; s++)
                  L.push(C[e.Buttons[s]]);
                var M = new t.Bimface.Application.Buttons(L);
                B.addControls(M.getButtons());
              }
              var T = function (e) {
                  e && _.removeControl("Views");
                  var n = o.getActiveViewer(),
                    a = n.getViews(),
                    l = {
                      type: "ComboBox",
                      id: "Views",
                      inheritTitle: !0,
                      className: "bf-combobox bf-family",
                      options: {},
                      handles: {
                        Change: function (e) {
                          let t, a;
                          u && u.hide(),
                            "Model" == e.id
                              ? (i ||
                                  document
                                    .querySelector(".gld-bf-measure")
                                    .setCss({ display: "block" }),
                                (t = 0))
                              : (i ||
                                  document
                                    .querySelector(".gld-bf-measure")
                                    .setCss({ display: "none" }),
                                (t = e.id)),
                            (a = o.getViewer().sets);
                          for (let e = 0; e < a.length; e++) {
                            a[e].viewerDrawing.showViewById(t);
                          }
                          n.update(!0),
                            n
                              .getEventManager()
                              .fireEvent("ButtonOnToolbarClicked", {
                                id: "LeftSubToolbar",
                              });
                        },
                      },
                    };
                  if (
                    ((l.options.Model = {
                      type: "ComboBoxOptionButton",
                      title: "Model",
                      id: "model",
                      className: "bf-button",
                      html: '<span class="bf-button-name">Model</span>',
                    }),
                    a.length)
                  )
                    for (var s = 0, r = a.length; s < r; s++) {
                      var c = a[s];
                      l.options[c.name] = {
                        type: "ComboBoxOptionButton",
                        title: c.name,
                        id: c.id || "Model",
                        className: "bf-button",
                        html: `<span class="bf-button-name">${c.name}</span>`,
                      };
                    }
                  var d = (l = new t.Bimface.Application.Buttons([
                      l,
                    ])).getButtons()[0],
                    m = n.getCurrentViewId(!0);
                  n.addEventListener(f.ViewChanged, function (e) {
                    0 === e && (e = "Model"), d.setSelectedControlById(e);
                  }),
                    _.addControls(l.getButtons()),
                    m
                      ? (d._currentControl.setCheckedState(!1),
                        d.setSelectedControlById(m))
                      : d.setSelectedControlById("Model");
                },
                _ = l.getToolbar("LeftSubToolbar");
              _ && (T(), c.addEventListener(f.ActiveViewChanged, T));
              c.getManifest(function (e) {
                const t = e.Features;
                let n;
                (n = !t || t.HasLayout), n || (_ && _.destroy());
              }),
                c.addEventListener(f.ViewChanged, function () {
                  var e = o.getPanel("layersSet");
                  if (e) {
                    var n = B.getControl("Layers"),
                      a = e.isShow;
                    a && e.hide(),
                      e.destroy(),
                      o.removePanel("layersSet"),
                      a ? n.setCheckedState(!0) : n.setCheckedState(!1),
                      (p = new t.Bimface.Application.UI.Panel.LayersSetPanel(
                        c,
                        n
                      )),
                      m.appendChild(p.element),
                      o.addPanel(p),
                      a || p.hide();
                  }
                });
            })(),
              o._mainToolbarAdaptive(),
              1 === o.getViewer().sets.length &&
                "pid-transfer" ===
                  o.getViewer().sets[0].viewerDrawing._viewMetaData
                    .workerType &&
                o.getViewer().setDisplayMode(2),
              window.addEventListener("resize", function (e) {
                o._mainToolbarAdaptive();
              });
          }),
          c.addEventListener(f.ContextMenu, function (e) {
            var n = o.getActiveViewer();
            n.contextMenu && n.contextMenu.element && n.contextMenu.destroy();
            var a = e.clientPosition,
              i = e.containerBox,
              l = n.getSelectedElements(),
              s = new t.Bimface.Application.UI.Menu.ContextMenu(o, l),
              r = {},
              c = s.element.getBoundingClientRect();
            i.width - a.x > 2 * c.width
              ? ((r.x = a.x),
                s.element.removeClass("bf-menu-left"),
                s.element.addClass("bf-menu-right"))
              : ((r.x = a.x - c.width),
                s.element.addClass("bf-menu-left"),
                s.element.removeClass("bf-menu-right"));
            i.height - a.y > c.height ? (r.y = a.y) : (r.y = a.y - c.height);
            (r.x += 2), (r.y += 2), s.setPosition(r), (n.contextMenu = s);
          }),
          (this.getViewer = function () {
            return c;
          }),
          (this.getActiveViewer = function () {
            return c.getActiveDrawing().viewerDrawing;
          }),
          (this.addDrawing = function (e, t, n) {
            c.addDrawing(e, t, n);
          }),
          (this.addDrawings = function (e, t) {
            c.addDrawings(e, t);
          }),
          (this.getRenderInfo = function (e, t) {
            c.getRenderInfo(e, t);
          }),
          (this.getToolbars = function () {
            return l;
          }),
          (this.getToolbar = function (e) {
            return l.getToolbar(e);
          }),
          (this.addPanel = function (e) {
            s.push(e);
          }),
          (this.removePanel = function (e) {
            s.removeObjectByAttribute("id", e);
          }),
          (this.getPanel = function (e) {
            return s.getObjectByAttribute("id", e);
          }),
          (this._mainToolbarAdaptive = function () {
            let e = o.getToolbars();
            if (
              !(
                e &&
                e._Toolbars &&
                e._Toolbars.length >= 2 &&
                !!o.getToolbar("MainToolbar")
              )
            )
              return;
            let t = o.getToolbar("MainToolbar");
            c.getRootElement().offsetWidth < 1e3
              ? t.addClassName("bf-toolbar-bottom-float-right")
              : t.removeClassName("bf-toolbar-bottom-float-right");
          }),
          (this.destroy = function () {
            if (
              (c.destroy(),
              (c = null),
              l && l._Toolbars && l._Toolbars.length > 0)
            )
              for (let e = 0, t = l._Toolbars.length; e < t; e++)
                l._Toolbars[e].destroy && l._Toolbars[e].destroy();
            (l = null),
              s.forEach((e) => {
                e.destroy();
              }),
              (s = null);
          });
      };
    })(),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application"
    ).ApplicationDrawingDemo = function (e, n) {
      var a,
        i = new t.Bimface.Application.WebApplicationDrawingConfig();
      (i.domElement = document.getElementById(n)),
        (i.domElementId = n),
        (i.drawingUrl = e.drawingUrl),
        t.Bimface.Application.WebApplicationDrawingEvent,
        (a = new t.Bimface.Application.WebApplicationDrawing(i)),
        (this._application = a);
    }),
    (t.Web.Lang.Utility.Namespace.ensureNamespace(
      t,
      "Bimface.Application.UI"
    ).UIConfig = function () {
      return {
        Toolbars: ["MainToolbar", "ModelTree"],
        Buttons: [
          "Home",
          "RectangleSelect",
          "Measure",
          "Section",
          "Walk",
          "Map",
          "Property",
          "Setting",
          "Information",
          "FullScreen",
        ],
        contextMenu: !0,
        viewer: null,
        element: null,
      };
    }),
    (function () {
      let e = t.Web.Lang.Utility.Namespace.ensureNamespace(
        t,
        "Bimface.Application.UI"
      );
      var n = function (e) {
        var n = this,
          a = e.viewer;
        (this._toolbars = []),
          (this._panels = []),
          (this._plugins = []),
          (this._opt = e),
          (this._objectTypes = {}),
          (this._contextMenuCb = function (e) {
            a.contextMenu && a.contextMenu.element && a.contextMenu.destroy();
            var i = e.clientPosition,
              o = e.containerBox,
              l = {};
            a.getModels().forEach((e) => {
              l[e.modelId] = e.getSelectedComponents();
            });
            const s = a._getExtrudeBodyModel();
            s && (l[s.modelId] = s.getSelectedComponents());
            const r = a._getExternalComponentModel();
            r && (l[r.modelId] = r.getSelectedComponents());
            var c = new t.Bimface.Application.UI.Menu.ContextMenu(
                n,
                l,
                n._objectTypes
              ),
              d = {},
              f = c.element.getBoundingClientRect();
            o.width - i.x > 2 * f.width
              ? ((d.x = i.x),
                c.element.removeClass("bf-menu-left"),
                c.element.addClass("bf-menu-right"))
              : ((d.x = i.x - f.width > 9 ? i.x - f.width : 10),
                c.element.addClass("bf-menu-left"),
                c.element.removeClass("bf-menu-right")),
              o.height - i.y > f.height ? (d.y = i.y) : (d.y = i.y - f.height),
              c.setPosition(d),
              (a.contextMenu = c);
          });
        var i = {
          initialized: !1,
          menu: !0,
          hobby: !0,
          hover: !1,
          scroll: !1,
          backgroundColor: 1,
          borderLine: !1,
          sectionBorderLine: !0,
          environment: "color",
          effect: "low",
          exposure: 0,
          enableIBLBackground: !1,
          ambientLight: !1,
          IBLName: "none",
          SSAO: !1,
          setDefault: function () {
            a.getInformation();
            var e = a.getLoadIBLScene();
            i = Object.assign(i, {
              menu: a.isEnableToggleContextMenuDisplay(),
              hover: a.isEnableHover(),
              borderLine: a.isWireframeEnabled(),
              exposure: a.getExposureShift(),
              ambientLight: a.isEnableIBLBackground(),
              IBLName: e.IBLSceneOption,
              enableIBLBackground: e.withBackground,
            });
            t.Web.Lang.Utility.ClientHelper.getIsDesktop();
          },
        };
        this.state = i;
      };
      (n.prototype = {
        init: function () {
          if (this.state.initialized) return !1;
          var e = this,
            n = this._opt,
            a = n.viewer,
            i = a._data,
            o = n.Toolbars,
            l = a._manifest,
            s = a.getIsMobileNew();
          if ("ViewerDrawing" == a.viewerType) {
            if (-1 != o.indexOf("MainToolbar")) {
              ((d = t.Bimface.UI.Toolbar.ToolbarConfig()).id = "MainToolbar"),
                (d.title = "主菜单"),
                (d.className = "bf-toolbar bf-toolbar-bottom"),
                (d.element = n.element),
                (d.buttons = [...n.Buttons]),
                l &&
                  !l.Features.HasSplitDrawing &&
                  d.buttons.removeByValue("Sheets"),
                this.addToolbar(d);
              let e = this.getToolbar("MainToolbar");
              (this.onKeydown = function (t) {
                if (27 == t.which) {
                  var n = e.getControl("DrawingMeasure"),
                    o = i.getPlugin("DrawingMeasure"),
                    l = (i.getPanel("MeaurePanel"), e.getControl("RectZoom"));
                  if (o && n.isChecked()) {
                    const e = o.viewerDrawing.mouseEditorMgr.getEditor();
                    1 == e.points.length
                      ? o.drawableManager.setIsEnableSelection(!0)
                      : 0 == e.points.length && n.setCheckedState(!1);
                  }
                  l && l.setCheckedState(!1),
                    Array.from(a.getSelectedElements()).length > 0 &&
                      a.clearSelection();
                }
              }),
                document.addEventListener("keydown", this.onKeydown, !0);
            }
            const e = () => {
                !this._opt &&
                  this._config &&
                  ((this._opt = this._config), delete this._config);
                var e = t.Bimface.UI.Toolbar.ToolbarConfig();
                (e.id = "LeftSubToolbar"),
                  (e.title = "LeftSubToolbar"),
                  (e.className = "bf-toolbar bf-layout-btn-wrapper"),
                  (e.element = n.element),
                  (e.buttons = s ? ["MobileLayoutList"] : ["LayoutList"]),
                  this.addToolbar(e);
              },
              i = this;
            if (
              (-1 != o.indexOf("LeftSubToolbar") &&
                l &&
                l.Features.HasLayout &&
                (e(),
                a.addEventListener(
                  t.Bimface.Viewer.ViewerDrawingEvent.ViewChanged,
                  function (e) {
                    0 == e && (e = "Model"),
                      s
                        ? i.getPanel("MobileLayoutListPanel") &&
                          i
                            .getPanel("MobileLayoutListPanel")
                            .updateStatusByDataType(e)
                        : i.getToolbar("LeftSubToolbar") &&
                          i
                            .getToolbar("LeftSubToolbar")
                            .getControl("LayoutList")
                            .setSelectedUiById(e, !1);
                  }
                )),
              !this.getToolbar("LeftSubToolbar") &&
                a.loadedDrawings.length > 0 &&
                a.addEventListener(
                  t.Bimface.Viewer.ViewerDrawingEvent.Loaded,
                  (t) => {
                    !i.getToolbar("LeftSubToolbar") &&
                      -1 != o.indexOf("LeftSubToolbar") &&
                      a.getDrawing(t)._manifest &&
                      a.getDrawing(t)._manifest.Features.HasLayout &&
                      e();
                  }
                ),
              l && l.Features.HasText && -1 != o.indexOf("SearchToolbar"))
            ) {
              var r = t.Bimface.UI.Toolbar.ToolbarConfig();
              (r.id = "SearchToolbar"),
                (r.title = ""),
                (r.className = "bf-toolbar bf-toolbar-search"),
                (r.element = n.element),
                (r.buttons = []),
                this.addToolbar(r);
              var c = this.getToolbar("SearchToolbar");
              let e,
                i = new t.Bimface.Plugins.Search.SearchConfig();
              (i.wrapElement = c.element),
                (i.viewer = a),
                (i.UI = this),
                (e = s
                  ? new t.Bimface.Plugins.Search.MobileSearch(i)
                  : new t.Bimface.Plugins.Search.Search(i)),
                this.addPlugin(e),
                (this.searchPlugin = e);
            }
          } else {
            var d,
              f =
                l.Features.HasComponentStructure ||
                l.Features.HasFileList ||
                l.Features.HasLinkRelation ||
                l.Features.HasRoom ||
                l.Features.HasArea ||
                l.Features.HasDrawing ||
                l.Features.HasMEPSystem ||
                l.Features.HasGroup ||
                l.Features.HasAssemble;
            if (-1 != o.indexOf("MainToolbar"))
              ((d = t.Bimface.UI.Toolbar.ToolbarConfig()).id = "MainToolbar"),
                (d.title = "主菜单"),
                (d.className = "bf-toolbar bf-toolbar-bottom"),
                (d.element = n.element),
                (d.buttons = a.getModels()[0].isEmptyModel
                  ? [...a.emptyModelButtons]
                  : [...n.Buttons]),
                l.Features.HasComponentProperty ||
                  (d.buttons.removeByValue("Property"),
                  d.buttons.removeByValue("MobileProperty")),
                !l.Features.HasMiniMap &&
                  i.workerType &&
                  -1 == i.workerType.indexOf("rvt") &&
                  -1 == i.workerType.indexOf("skp") &&
                  -1 == i.workerType.indexOf("igms") &&
                  -1 == i.workerType.indexOf("gbq") &&
                  -1 == i.workerType.indexOf("gcl") &&
                  -1 == i.workerType.indexOf("dgn") &&
                  -1 == i.workerType.indexOf("ifc") &&
                  -1 == i.workerType.indexOf("tdm") &&
                  -1 == i.workerType.indexOf("gtj") &&
                  -1 == i.workerType.indexOf("gqi") &&
                  -1 == i.workerType.indexOf("bmv") &&
                  -1 == i.workerType.indexOf("fbx") &&
                  -1 == i.workerType.indexOf("3ds") &&
                  -1 == i.workerType.indexOf("pdms") &&
                  -1 == i.workerType.indexOf("bdb") &&
                  -1 == i.workerType.indexOf("gbp") &&
                  -1 == i.workerType.indexOf("nwd") &&
                  -1 == i.workerType.indexOf("nwc") &&
                  d.buttons.removeByValue("Map"),
                this.addToolbar(d);
            if (f && -1 != o.indexOf("ModelTree") && !e._modelTree) {
              var m = t.Bimface.UI.Toolbar.ToolbarConfig();
              (m.id = "ModelTree"),
                (m.title = "目录树"),
                (m.className = "bf-toolbar bf-toolbar bf-tree-toolbar"),
                (m.element = n.element),
                (m.buttons = s ? ["MobileModelTreeNew"] : ["ModelTree"]),
                this.addToolbar(m);
            }
            if (l.Features.HasFamilyTypeList && n.EnableFamilyList) {
              var p = t.Bimface.UI.Toolbar.ToolbarConfig();
              (p.id = "FamilyTypes"),
                (p.title = "FamilyTypes"),
                (p.className = "bf-toolbar bf-toolbar bf-toolbar-select"),
                (p.element = n.element),
                (p.buttons = ["FamilyList"]),
                this.addToolbar(p);
            }
            n.contextMenu &&
              (a.addEventListener(
                t.Bimface.Viewer.Viewer3DEvent.ContextMenu,
                e._contextMenuCb
              ),
              a.addEventListener(
                t.Bimface.Viewer.Viewer3DEvent.ComponentsSelectionChanged,
                function (t) {
                  t.objectId && (e._objectTypes[t.objectId] = t.objectType);
                }
              )),
              (this.onKeyUp = function (t) {
                var n = e.getToolbar("MainToolbar");
                if (n) {
                  var i = n.getControl("RectangleSelect"),
                    o = n.getControl("Measure"),
                    l = (function (e) {
                      var t = e.getPlugin("SectionBox"),
                        n = e.getPlugin("SectionPlane"),
                        a = e.getToolbar("MainToolbar"),
                        i = { enable: !1, button: null };
                      (t || n) && (i.enable = !0);
                      var o = a.getControl("Section");
                      if (o) {
                        var l = o.getToolbar();
                        if (!l) return;
                        var s = l.getControl("SectionBox"),
                          r = l.getControl("SectionPlane");
                        s.isChecked() && (i.button = s),
                          r.isChecked() && (i.button = r);
                      }
                      return i;
                    })(e),
                    s = n.getControl("Walk");
                  t &&
                    27 == t.keyCode &&
                    !CLOUD.EditorConfig.NoKey &&
                    (o && o.isChecked()
                      ? (function () {
                          t.stopPropagation();
                          var n = e.getPlugin("Measure");
                          n && n.getInfo().points.length > 0
                            ? n.measuringRedo()
                            : n.measuredRedo(() => {
                                o.setCheckedState(!1);
                              });
                        })()
                      : a.getSelectedComponents().length ||
                        (i && i.isChecked()
                          ? i.setCheckedState(!1)
                          : l.enable
                          ? C(e)
                          : s && s.isChecked() && s.setCheckedState(!1),
                        a.render()));
                }
              }),
              document.addEventListener("keyup", this.onKeyUp, !0),
              e.state.setDefault(),
              (e.state.initialized = !0);
          }
        },
        handlerFn: function () {
          var e = this,
            t = this._opt,
            n = t.viewer,
            a = t.Toolbars;
          ((t) => {
            !e.getToolbar("LeftSubToolbar") &&
              -1 != a.indexOf("LeftSubToolbar") &&
              n.getDrawing(t)._manifest &&
              n.getDrawing(t)._manifest.Features.HasLayout &&
              addSubToolbar();
          })(modelId);
        },
        addToolbar: function (e) {
          var n = t.Bimface.Application.UI.Toolbar.Toolbar(e, this);
          this._toolbars.push(n);
        },
        removeToolbar: function (e) {
          return (
            this._toolbars.removeObjectByAttribute("id", e), [...this._toolbars]
          );
        },
        getToolbar: function (e) {
          return this._toolbars.getObjectByAttribute("id", e);
        },
        getToolbars: function () {
          return [...this._toolbars];
        },
        getViewer: function () {
          return this._opt.viewer;
        },
        getRootElement: function () {
          return this._opt.element;
        },
        addPanel: function (e) {
          this._panels.push(e);
        },
        removePanel: function (e) {
          this._panels.removeObjectByAttribute("id", e);
        },
        getPanel: function (e) {
          return this._panels.getObjectByAttribute("id", e);
        },
        getPanels: function (e) {
          return [...this._panels];
        },
        addPlugin: function (e) {
          this._plugins.push(e);
        },
        removePlugin: function (e) {
          this._plugins.removeObjectByAttribute("id", e);
        },
        getPlugin: function (e) {
          return this._plugins.getObjectByAttribute("id", e);
        },
        getPlugins: function (e) {
          return [...this._plugins];
        },
        destroy: function () {
          "ViewerDrawing" == this._opt.viewer.viewerType
            ? ((this._config = this._opt),
              document.removeEventListener("keydown", this.onKeydown, !0),
              this.searchPlugin && this.searchPlugin.destroy())
            : (document.removeEventListener("keyup", this.onKeyUp, !0),
              this._opt.viewer.removeEventListener(
                t.Bimface.Viewer.Viewer3DEvent.ContextMenu,
                this._contextMenuCb
              ));
          for (let e = 0; e < this._toolbars.length; e++)
            this._toolbars[e].destroy();
          for (let e = 0; e < this._panels.length; e++)
            this._panels[e].destroy();
          for (let e = 0; e < this._plugins.length; e++)
            this._plugins[e].exit && this._plugins[e].exit();
          (this._toolbars = []),
            (this._panels = []),
            (this._plugins = []),
            (this.state.initialized = !1),
            this._opt.viewer.render && this._opt.viewer.render(),
            (this._opt = null);
        },
        updateModelTree: function () {
          var e = this,
            n = this._opt,
            a = n.viewer,
            i = a._manifest,
            o =
              i.Features.HasComponentStructure ||
              i.Features.HasFileList ||
              i.Features.HasLinkRelation ||
              i.Features.HasRoom ||
              i.Features.HasArea ||
              i.Features.HasDrawing ||
              i.Features.HasMEPSystem ||
              i.Features.HasGroup ||
              i.Features.HasAssemble,
            l = e.getPanel("ModelTree"),
            s = e.getToolbar("ModelTree");
          if (l) {
            var r = l.isShow;
            if ((r && l.hide(), l.destroy(), e.removePanel("ModelTree"), r)) {
              s && s.hide();
              var c = new t.Bimface.Application.UI.Panel.ModelTreePanel(e, s);
              e.getRootElement().appendChild(c.element), e.addPanel(c);
            }
          }
          if (!o && s) s.destroy(), e.removeToolbar("ModelTree");
          else if (o && !s && -1 != n.Toolbars.indexOf("ModelTree")) {
            var d = t.Bimface.UI.Toolbar.ToolbarConfig();
            (d.id = "ModelTree"),
              (d.title = "目录树"),
              (d.className = "bf-toolbar bf-toolbar bf-tree-toolbar"),
              (d.element = n.element),
              a.getIsMobileNew()
                ? (d.buttons = ["MobileModelTreeNew"])
                : (d.buttons = ["ModelTree"]),
              e.addToolbar(d);
          }
        },
      }),
        (e.UI = n);
    })();
})();
