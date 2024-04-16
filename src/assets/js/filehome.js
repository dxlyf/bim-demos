(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["file~home"],
  {
    "1c59": function (e, t, i) {
      "use strict";
      var n = i("6d61"),
        r = i("6566");
      n(
        "Set",
        function (e) {
          return function () {
            return e(this, arguments.length ? arguments[0] : void 0);
          };
        },
        r
      );
    },
    "4e82": function (e, t, i) {
      "use strict";
      var n = i("23e7"),
        r = i("e330"),
        l = i("59ed"),
        o = i("7b0b"),
        a = i("07fa"),
        s = i("083a"),
        c = i("577e"),
        u = i("d039"),
        d = i("addb"),
        p = i("a640"),
        h = i("04d1"),
        f = i("d998"),
        m = i("2d00"),
        w = i("512ce"),
        y = [],
        v = r(y.sort),
        x = r(y.push),
        b = u(function () {
          y.sort(void 0);
        }),
        C = u(function () {
          y.sort(null);
        }),
        g = p("sort"),
        T = !u(function () {
          if (m) return m < 70;
          if (!(h && h > 3)) {
            if (f) return !0;
            if (w) return w < 603;
            var e,
              t,
              i,
              n,
              r = "";
            for (e = 65; e < 76; e++) {
              switch (((t = String.fromCharCode(e)), e)) {
                case 66:
                case 69:
                case 70:
                case 72:
                  i = 3;
                  break;
                case 68:
                case 71:
                  i = 4;
                  break;
                default:
                  i = 2;
              }
              for (n = 0; n < 47; n++) y.push({ k: t + n, v: i });
            }
            for (
              y.sort(function (e, t) {
                return t.v - e.v;
              }),
                n = 0;
              n < y.length;
              n++
            )
              (t = y[n].k.charAt(0)), r.charAt(r.length - 1) !== t && (r += t);
            return "DGBEFHACIJK" !== r;
          }
        }),
        k = b || !C || !g || !T,
        $ = function (e) {
          return function (t, i) {
            return void 0 === i
              ? -1
              : void 0 === t
              ? 1
              : void 0 !== e
              ? +e(t, i) || 0
              : c(t) > c(i)
              ? 1
              : -1;
          };
        };
      n(
        { target: "Array", proto: !0, forced: k },
        {
          sort: function (e) {
            void 0 !== e && l(e);
            var t = o(this);
            if (T) return void 0 === e ? v(t) : v(t, e);
            var i,
              n,
              r = [],
              c = a(t);
            for (n = 0; n < c; n++) n in t && x(r, t[n]);
            d(r, $(e)), (i = r.length), (n = 0);
            while (n < i) t[n] = r[n++];
            while (n < c) s(t, n++);
            return t;
          },
        }
      );
    },
    6062: function (e, t, i) {
      i("1c59");
    },
    "78f3": function (e, t, i) {
      "use strict";
      i("8168");
    },
    8168: function (e, t, i) {},
    9326: function (e, t, i) {
      "use strict";
      var n = function () {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i(
            "div",
            { staticClass: "file-table-wrapper" },
            [
              i(
                "el-table",
                {
                  directives: [
                    {
                      name: "loading",
                      rawName: "v-loading",
                      value: e.loading,
                      expression: "loading",
                    },
                  ],
                  ref: "multipleTable",
                  staticClass: "file-table",
                  class: ["file-type-"],
                  attrs: {
                    height: e.isRecovery
                      ? "calc(100vh - 224px)"
                      : "calc(100vh - 264px)",
                    fit: "",
                    "element-loading-text": "文件加载中……",
                    "tooltip-effect": "dark",
                    data: e.fileList,
                    "highlight-current-row": !0,
                  },
                  on: {
                    "selection-change": e.handleSelectRow,
                    "sort-change": e.handleSortChange,
                    "row-contextmenu": e.handleContextMenu,
                  },
                },
                [
                  i("el-table-column", {
                    key: "selection",
                    attrs: { type: "selection", width: "56", align: "center" },
                  }),
                  i("el-table-column", {
                    key: "fileName",
                    attrs: {
                      label: "名称",
                      width: e.isRecovery ? "600" : "800",
                    },
                    scopedSlots: e._u([
                      {
                        key: "default",
                        fn: function (t) {
                          return [
                            i(
                              "div",
                              {
                                staticStyle: {
                                  display: "flex",
                                  "align-items": "center",
                                },
                              },
                              [
                                i(
                                  "div",
                                  { staticStyle: { "margin-left": "-6px" } },
                                  [
                                    0 === t.row.fileType ||
                                    "png" === t.row.extendName ||
                                    "jpg" === t.row.extendName
                                      ? i("img", {
                                          staticStyle: {
                                            width: "51px",
                                            "max-height": "58px",
                                            cursor: "pointer",
                                            transform: "scale(0.65)",
                                          },
                                          attrs: { src: e.setFileImg(t.row) },
                                          on: {
                                            dragstart: function (e) {
                                              e.preventDefault();
                                            },
                                            click: function (i) {
                                              return e.handleFileNameClick(
                                                t.row,
                                                t.$index,
                                                e.sortedFileList,
                                                "haveToken"
                                              );
                                            },
                                          },
                                        })
                                      : !t.row.isTxDocs && t.row.fileType > 0
                                      ? i("img", {
                                          staticStyle: {
                                            width: "51px",
                                            "max-height": "58px",
                                            cursor: "pointer",
                                          },
                                          attrs: { src: e.setFileImg(t.row) },
                                          on: {
                                            dragstart: function (e) {
                                              e.preventDefault();
                                            },
                                            click: function (i) {
                                              return e.handleFileNameClick(
                                                t.row,
                                                t.$index,
                                                e.sortedFileList,
                                                "haveToken"
                                              );
                                            },
                                          },
                                        })
                                      : i("img", {
                                          staticStyle: {
                                            width: "56px",
                                            "max-height": "58px",
                                            cursor: "pointer",
                                            transform: "scale(0.5)",
                                            "margin-left": "-4px",
                                          },
                                          attrs: { src: e.setFileImg(t.row) },
                                          on: {
                                            dragstart: function (e) {
                                              e.preventDefault();
                                            },
                                            click: function (i) {
                                              return e.handleFileNameClick(
                                                t.row,
                                                t.$index,
                                                e.sortedFileList,
                                                "haveToken"
                                              );
                                            },
                                          },
                                        }),
                                  ]
                                ),
                                i("div", { staticClass: "more-wrap" }, [
                                  t.row.isAdd
                                    ? i(
                                        "div",
                                        { staticClass: "input-name" },
                                        [
                                          i(
                                            "el-input",
                                            {
                                              ref: "nameInput",
                                              attrs: {
                                                placeholder: "请输入文件夹名称",
                                              },
                                              model: {
                                                value: t.row.fileName,
                                                callback: function (i) {
                                                  e.$set(t.row, "fileName", i);
                                                },
                                                expression:
                                                  "scope.row.fileName",
                                              },
                                            },
                                            [
                                              i("i", {
                                                staticClass:
                                                  "el-input__icon el-icon-circle-check",
                                                attrs: { slot: "suffix" },
                                                on: {
                                                  click: function (i) {
                                                    return e.handleSaveAddDirFiled(
                                                      t.row
                                                    );
                                                  },
                                                },
                                                slot: "suffix",
                                              }),
                                              i("i", {
                                                staticClass:
                                                  "el-input__icon el-icon-circle-close",
                                                attrs: { slot: "suffix" },
                                                on: {
                                                  click: function (t) {
                                                    return e.$emit(
                                                      "getTableDataByType"
                                                    );
                                                  },
                                                },
                                                slot: "suffix",
                                              }),
                                            ]
                                          ),
                                        ],
                                        1
                                      )
                                    : i(
                                        "div",
                                        {
                                          staticClass: "file-table-name",
                                          on: {
                                            click: function (i) {
                                              return e.handleFileNameClick(
                                                t.row,
                                                t.$index,
                                                e.sortedFileList,
                                                "haveToken"
                                              );
                                            },
                                          },
                                        },
                                        [
                                          i(
                                            "el-tooltip",
                                            {
                                              staticClass: "item",
                                              attrs: {
                                                effect: "dark",
                                                content: t.row.fileName,
                                                placement: "top",
                                              },
                                            },
                                            [
                                              i("span", [
                                                e._v(e._s(t.row.fileName)),
                                              ]),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                  e.isRecovery ||
                                  t.row.permissionList ||
                                  t.row.isAdd
                                    ? e._e()
                                    : i(
                                        "div",
                                        { staticClass: "more-wrap-r" },
                                        [
                                          i(
                                            "el-popover",
                                            {
                                              ref: "cloud-popover-" + t.$index,
                                              attrs: {
                                                placement: "bottom-end",
                                                "popper-class":
                                                  "model-popper-class",
                                                width: "480",
                                                trigger: "click",
                                              },
                                            },
                                            [
                                              i(
                                                "div",
                                                {
                                                  staticStyle: {
                                                    padding: "0 4px",
                                                  },
                                                },
                                                [
                                                  i(
                                                    "div",
                                                    {
                                                      staticStyle: {
                                                        "margin-bottom": "8px",
                                                      },
                                                    },
                                                    [
                                                      i("i", {
                                                        staticClass:
                                                          "el-icon-success",
                                                        staticStyle: {
                                                          color: "#67c23a",
                                                          "margin-right": "4px",
                                                        },
                                                      }),
                                                      i("span", [
                                                        e._v("已复制分享链接"),
                                                      ]),
                                                    ]
                                                  ),
                                                  e.shareDataTitle
                                                    ? i(
                                                        "div",
                                                        {
                                                          staticStyle: {
                                                            display: "flex",
                                                            "justify-content":
                                                              "space-between",
                                                            "align-items":
                                                              "center",
                                                          },
                                                        },
                                                        [
                                                          i("span", [
                                                            e._v(
                                                              "当前权限: " +
                                                                e._s(
                                                                  e.shareDataTitle
                                                                )
                                                            ),
                                                          ]),
                                                          i(
                                                            "span",
                                                            {
                                                              staticStyle: {
                                                                color:
                                                                  "#0052d9",
                                                              },
                                                              on: {
                                                                click:
                                                                  e.handleSettingShareCloudFile,
                                                              },
                                                            },
                                                            [e._v("设置")]
                                                          ),
                                                        ]
                                                      )
                                                    : e._e(),
                                                ]
                                              ),
                                              0 !== t.row.fileType &&
                                              e.typeArr.includes(
                                                t.row.extendName.toLowerCase()
                                              )
                                                ? i("i", {
                                                    staticClass: "el-icon-link",
                                                    attrs: {
                                                      slot: "reference",
                                                    },
                                                    on: {
                                                      click: function (i) {
                                                        return e.handlecopyShareLink(
                                                          t.row,
                                                          t.$index
                                                        );
                                                      },
                                                    },
                                                    slot: "reference",
                                                  })
                                                : e._e(),
                                            ]
                                          ),
                                          i(
                                            "el-popover",
                                            {
                                              ref: "file-popper-" + t.$index,
                                              attrs: {
                                                "popper-class":
                                                  "member-popper-class",
                                                placement: "bottom-start",
                                                width: "165",
                                              },
                                            },
                                            [
                                              i(
                                                "div",
                                                {
                                                  staticClass:
                                                    "member-left-team-item-con",
                                                },
                                                [
                                                  i(
                                                    "div",
                                                    {
                                                      on: {
                                                        click: function (i) {
                                                          return e.handleFileNameClick(
                                                            t.row,
                                                            t.$index,
                                                            e.sortedFileList,
                                                            "haveToken"
                                                          );
                                                        },
                                                      },
                                                    },
                                                    [
                                                      i("i", {
                                                        staticClass:
                                                          "el-icon-folder",
                                                        staticStyle: {
                                                          "margin-right": "8px",
                                                        },
                                                      }),
                                                      e._v(" 打开 "),
                                                    ]
                                                  ),
                                                  0 !== t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "404"
                                                  ) &&
                                                  e.typeArr.includes(
                                                    t.row.extendName.toLowerCase()
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleShareFileBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-share",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 分享 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  0 !== t.row.fileType &&
                                                  e.typeArr.includes(
                                                    t.row.extendName.toLowerCase()
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleSettingShareCloudFile1(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-user",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 权限设置 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  0 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "406"
                                                  )
                                                    ? i("div", [
                                                        i(
                                                          "p",
                                                          {
                                                            staticClass:
                                                              "scope-btn",
                                                            on: {
                                                              click: function (
                                                                i
                                                              ) {
                                                                return e.getDownloadFileZip2(
                                                                  t.row.fileId,
                                                                  t.$index
                                                                );
                                                              },
                                                            },
                                                          },
                                                          [
                                                            i("i", {
                                                              staticClass:
                                                                "el-icon-download",
                                                              staticStyle: {
                                                                "margin-right":
                                                                  "8px",
                                                              },
                                                            }),
                                                            e._v(" 下载 "),
                                                          ]
                                                        ),
                                                      ])
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  0 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "409"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleRenameFile(
                                                                t.row
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-edit",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 重命名 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  0 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "414"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleCopyFile(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-copy-document",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 生成副本至 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  0 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "412"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleProjectBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-folder-add",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 跨项目复制 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  0 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "408"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleMoveFileBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-rank",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 移动到 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  0 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "410"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleDeleteFileBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-delete",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 删除 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "406"
                                                  )
                                                    ? i("div", [
                                                        i(
                                                          "a",
                                                          {
                                                            staticClass:
                                                              "scope-btn",
                                                            attrs: {
                                                              target: "_blank",
                                                            },
                                                            on: {
                                                              click: function (
                                                                i
                                                              ) {
                                                                return e.getDownloadFileZip3(
                                                                  t.row,
                                                                  t.$index
                                                                );
                                                              },
                                                            },
                                                          },
                                                          [
                                                            i("i", {
                                                              staticClass:
                                                                "el-icon-download",
                                                              staticStyle: {
                                                                "margin-right":
                                                                  "8px",
                                                              },
                                                            }),
                                                            e._v(" 下载"),
                                                          ]
                                                        ),
                                                      ])
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "409"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleRenameFile(
                                                                t.row
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-edit",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 重命名 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "408"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleMoveFileBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-rank",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 移动到 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "414"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleCopyFile(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-copy-document",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 生成副本至 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "412"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleProjectBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-folder-add",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 跨项目复制 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  !t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "410"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleDeleteFileBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-delete",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 删除 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  t.row.isTxDocs &&
                                                  1 === t.row.fileType
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleFileNameClick(
                                                                t.row,
                                                                t.$index,
                                                                e.sortedFileList,
                                                                "haveToken"
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-folder",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 打开 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  t.row.isTxDocs &&
                                                  1 === t.row.fileType
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleCopyFileUrl(
                                                                t.row
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-refresh-right",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(
                                                            " 获取分享链接 "
                                                          ),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  t.row.isTxDocs &&
                                                  t.row.createUserId ===
                                                    e.userId
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleMemberBtn(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-user",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 成员管理 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "409"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleRenameFile(
                                                                t.row
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-edit",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 重命名 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "408"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleMoveFileBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-rank",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 移动到 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "414"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleCopyFile(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-copy-document",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 生成副本至 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "412"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleProjectBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-folder-add",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 跨项目复制 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                  t.row.isTxDocs &&
                                                  1 === t.row.fileType &&
                                                  e.menuPermission.includes(
                                                    "410"
                                                  )
                                                    ? i(
                                                        "div",
                                                        {
                                                          on: {
                                                            click: function (
                                                              i
                                                            ) {
                                                              return e.handleDeleteFileBtnClick(
                                                                t.row,
                                                                t.$index
                                                              );
                                                            },
                                                          },
                                                        },
                                                        [
                                                          i("i", {
                                                            staticClass:
                                                              "el-icon-delete",
                                                            staticStyle: {
                                                              "margin-right":
                                                                "8px",
                                                            },
                                                          }),
                                                          e._v(" 删除 "),
                                                        ]
                                                      )
                                                    : e._e(),
                                                ]
                                              ),
                                              i("i", {
                                                staticClass: "el-icon-more",
                                                attrs: { slot: "reference" },
                                                slot: "reference",
                                              }),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                ]),
                              ]
                            ),
                          ];
                        },
                      },
                    ]),
                  }),
                  e.isRecovery
                    ? e._e()
                    : i("el-table-column", {
                        key: "name",
                        attrs: { label: "修改人", prop: "name" },
                      }),
                  e.isRecovery
                    ? e._e()
                    : i("el-table-column", {
                        key: "updateTime",
                        attrs: { label: "修改时间", prop: "updateTime" },
                      }),
                  e.isRecovery
                    ? e._e()
                    : i("el-table-column", {
                        key: "fileSizeStr",
                        attrs: { label: "文件大小", prop: "fileSizeStr" },
                      }),
                  !e.isRecovery && e.isSearchFile
                    ? i("el-table-column", {
                        key: "filePath",
                        attrs: { label: "路径", prop: "filePath" },
                        scopedSlots: e._u(
                          [
                            {
                              key: "default",
                              fn: function (t) {
                                return [
                                  i(
                                    "span",
                                    {
                                      staticStyle: {
                                        color: "#0052d9",
                                        cursor: "pointer",
                                      },
                                      on: {
                                        click: function (i) {
                                          return e.handleFileNameClick2(t.row);
                                        },
                                      },
                                    },
                                    [e._v(e._s(t.row.filePath))]
                                  ),
                                ];
                              },
                            },
                          ],
                          null,
                          !1,
                          4200671735
                        ),
                      })
                    : e._e(),
                  e.isRecovery
                    ? i("el-table-column", {
                        key: "filePath",
                        attrs: { label: "路径", prop: "filePath" },
                      })
                    : e._e(),
                  e.isRecovery
                    ? i("el-table-column", {
                        key: "updateUserName",
                        attrs: { label: "删除者", prop: "updateUserName" },
                      })
                    : e._e(),
                  e.isRecovery
                    ? i("el-table-column", {
                        key: "updateTime",
                        attrs: { label: "删除时间", prop: "updateTime" },
                      })
                    : e._e(),
                ],
                1
              ),
            ],
            1
          );
        },
        r = [],
        l = i("c7eb"),
        o = i("1da1"),
        a = i("5530"),
        s = (i("99af"), i("d81d"), i("2f62")),
        c = i("60fb"),
        u = i("5c62"),
        d = [
          "et",
          "rtf",
          "txt",
          "xls",
          "xlt",
          "xlsx",
          "xlsm",
          "xltx",
          "xltm",
          "doc",
          "docx",
          "dot",
          "wps",
          "wpt",
          "dotx",
          "docm",
          "dotm",
          "ppt",
          "pptx",
          "pptm",
          "ppsx",
          "ppsm",
          "pps",
          "potx",
          "potm",
          "dpt",
          "dps",
          "pdf",
        ],
        p = {
          name: "FileTable",
          props: {
            fileList: { required: !0, type: Array },
            loading: { required: !0, type: Boolean },
            isRecovery: {
              type: Boolean,
              default: function () {
                return !1;
              },
            },
            menuPermission: {
              type: Array,
              default: function () {
                return [];
              },
            },
            isSearchFile: {
              type: Boolean,
              default: function () {
                return !1;
              },
            },
          },
          data: function () {
            return (
              (this.typeArr = d),
              {
                shareDataTitle: "",
                officeFileType: ["ppt", "pptx", "doc", "docx", "xls", "xlsx"],
                sortedFileList: [],
                shareData: null,
                isShow: !1,
              }
            );
          },
          computed: Object(a["a"])(
            Object(a["a"])(
              {},
              Object(s["b"])(["selectedColumnList", "userId"])
            ),
            {},
            {
              screenWidth: function () {
                return this.$store.state.common.screenWidth;
              },
            }
          ),
          watch: {
            fileList: function () {
              this.clearSelectedTable(),
                this.$refs.multipleTable.clearSort(),
                (this.sortedFileList = this.fileList);
            },
          },
          methods: {
            handleFileNameClick2: function (e) {
              this.$emit("handleFileNameClick2", e);
            },
            handleSettingShareCloudFile: function () {
              var e = this;
              (this.shareData.policy = !0),
                this.$shareFile({ fileInfo: this.shareData }).then(function (
                  t
                ) {
                  "confirm" === t && e.$emit("getTableDataByType");
                });
            },
            handlecopyShareLink: function (e, t) {
              var i = this;
              return Object(o["a"])(
                Object(l["a"])().mark(function n() {
                  return Object(l["a"])().wrap(function (n) {
                    while (1)
                      switch ((n.prev = n.next)) {
                        case 0:
                          (i.shareData = e),
                            (i.shareDataTitle = "文档".concat(
                              1 === i.shareData.readonly
                                ? "链接可访问"
                                : "链接不可访问"
                            )),
                            e.docsId
                              ? Object(u["l"])(e.docsId).then(function (e) {
                                  if (200 === e.code) {
                                    i.$refs[
                                      "cloud-popover-".concat(t)
                                    ].doShow();
                                    var n = "https://swarm-bim.com"
                                        .concat(
                                          "/iframe-view?url=",
                                          e.data.webofficeURL,
                                          "&&token="
                                        )
                                        .concat(
                                          e.data.accessToken,
                                          "&&isShare=",
                                          !0
                                        ),
                                      r = document.createElement("input");
                                    (r.value = n),
                                      document.body.appendChild(r),
                                      r.select(),
                                      document.execCommand("Copy"),
                                      document.body.removeChild(r),
                                      setTimeout(function () {
                                        i.$refs[
                                          "cloud-popover-".concat(t)
                                        ].doClose();
                                      }, 3e3);
                                  }
                                })
                              : Object(c["w"])(e.fileId).then(function (e) {
                                  if (200 === e.code) {
                                    i.$refs[
                                      "cloud-popover-".concat(t)
                                    ].doShow();
                                    var n = "https://swarm-bim.com"
                                        .concat(
                                          "/iframe-view?url=",
                                          e.data.webofficeURL,
                                          "&&token="
                                        )
                                        .concat(
                                          e.data.accessToken,
                                          "&&isShare=",
                                          !0
                                        ),
                                      r = document.createElement("input");
                                    (r.value = n),
                                      document.body.appendChild(r),
                                      r.select(),
                                      document.execCommand("Copy"),
                                      document.body.removeChild(r),
                                      setTimeout(function () {
                                        i.$refs[
                                          "cloud-popover-".concat(t)
                                        ].doClose();
                                      }, 3e3);
                                  }
                                });
                        case 3:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              )();
            },
            getDownloadFileZip3: function (e, t) {
              this.$refs["file-popper-".concat(t)].doClose(),
                window.open(e.fileUrl);
            },
            getDownloadFileZip2: function (e, t) {
              this.$refs["file-popper-".concat(t)].doClose(),
                this.getDownloadFileZip(e);
            },
            handleShareFileBtnClick: function (e, t) {
              (e.policy = !1),
                this.$refs["file-popper-".concat(t)].doClose(),
                this.$shareFile({ fileInfo: e });
            },
            handleSettingShareCloudFile1: function (e, t) {
              var i = this;
              (e.policy = !0),
                this.$refs["file-popper-".concat(t)].doClose(),
                this.$shareFile({ fileInfo: e }).then(function (e) {
                  "confirm" === e && i.$emit("getTableDataByType");
                });
            },
            handleMemberBtn: function (e, t) {
              this.$refs["file-popper-".concat(t)].doClose(),
                this.$emit("handleMemberBtn", e);
            },
            handleProjectBtnClick: function (e, t) {
              this.$refs["file-popper-".concat(t)].doClose(),
                this.$emit("handleProjectBtnClick", e);
            },
            handleCopyFile: function (e, t) {
              this.$refs["file-popper-".concat(t)].doClose(),
                this.$emit("handleCopyFile", e);
            },
            handleCopyFileUrl: function (e) {
              var t = e.fileUrl,
                i = document.createElement("input");
              (i.value = t),
                document.body.appendChild(i),
                i.select(),
                document.execCommand("Copy"),
                document.body.removeChild(i),
                this.$message.success("已复制分享链接");
            },
            handleSaveAddDirFiled: function (e) {
              if (!e.fileName)
                return this.$message.error("文件夹名称不能为空...");
              this.$emit("handleSaveAddDirFiled", e);
            },
            handleCopyFileBtnClick: function (e) {
              var t = this;
              return Object(o["a"])(
                Object(l["a"])().mark(function i() {
                  var n, r, o;
                  return Object(l["a"])().wrap(function (i) {
                    while (1)
                      switch ((i.prev = i.next)) {
                        case 0:
                          return (
                            (i.next = 2), Object(c["h"])({ fileId: e.fileId })
                          );
                        case 2:
                          (n = i.sent),
                            (r = n.code),
                            (o = n.msg),
                            200 === r
                              ? (t.$message.success(o),
                                t.$emit("getTableDataByType"))
                              : t.$message.error(o);
                        case 6:
                        case "end":
                          return i.stop();
                      }
                  }, i);
                })
              )();
            },
            handleMoveFileBtnClick: function (e, t) {
              this.$refs["file-popper-".concat(t)].doClose(),
                this.$emit("handleMoveFileBtnClick", e);
            },
            handleRemoveMoveFileBtnClick: function (e) {
              this.$emit("handleRemoveMoveFileBtnClick", e);
            },
            handlerecoverFileBtnClick: function (e) {
              this.$emit("handlerecoverFileBtnClick", e);
            },
            handleDeleteFileBtnClick: function (e, t) {
              this.$refs["file-popper-".concat(t)].doClose(),
                this.$emit("handleDeleteFileBtnClick", e);
            },
            handleRenameFile: function (e) {
              var t,
                i = this;
              null === (t = this.fileList) ||
                void 0 === t ||
                t.map(function (e) {
                  e.isEdit &&
                    e.isAdd &&
                    (i.$set(e, "isEdit", !1), i.$set(e, "isAdd", !1));
                }),
                this.$nextTick(function () {
                  (e.isEdit = !0), (e.isAdd = !0);
                }),
                setTimeout(function () {
                  i.$refs.nameInput.focus();
                }, 200);
            },
            handleInputBlue: function (e) {
              (e.isAdd = !1), (e.isEdit = !1);
            },
            handleSortChange: function () {
              this.sortedFileList = this.$refs.multipleTable.tableData;
            },
            handleContextMenu: function (e, t, i) {
              var n = this;
              (i.cancelBubble = !0),
                this.screenWidth < 768 &&
                  (i.preventDefault(),
                  this.$refs.multipleTable.setCurrentRow(e),
                  this.$openContextMenu({ selectedFile: e, domEvent: i }).then(
                    function (e) {
                      n.$refs.multipleTable.setCurrentRow(),
                        "confirm" === e &&
                          (n.$emit("getTableDataByType"),
                          n.$store.dispatch("showStorage"));
                    }
                  ));
            },
            clearSelectedTable: function () {
              this.$refs.multipleTable.clearSelection();
            },
            handleSelectRow: function (e) {
              e && e.length > 0
                ? this.$emit("changeSelectedFiles", !1, e)
                : this.$emit("changeSelectedFiles", !0);
            },
            handleClickMore: function (e, t) {
              var i = this;
              this.$refs.multipleTable.setCurrentRow(e),
                this.$openContextMenu({ selectedFile: e, domEvent: t }).then(
                  function (e) {
                    i.$refs.multipleTable.setCurrentRow(),
                      "confirm" === e &&
                        (i.$emit("getTableDataByType"),
                        i.$store.dispatch("showStorage"));
                  }
                );
            },
          },
        },
        h = p,
        f = (i("b5e3"), i("2877")),
        m = Object(f["a"])(h, n, r, !1, null, "b141afe4", null);
      t["a"] = m.exports;
    },
    "9a81": function (e, t, i) {},
    b5e3: function (e, t, i) {
      "use strict";
      i("9a81");
    },
    fd26: function (e, t, i) {
      "use strict";
      var n = function () {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i(
            "div",
            { staticClass: "breadcrumb-wrapper" },
            [
              i("el-input", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: e.isShowInput,
                    expression: "isShowInput",
                  },
                ],
                ref: "filePathInputRef",
                staticClass: "file-path-input",
                attrs: {
                  placeholder: "请输入路径",
                  size: "mini",
                  autofocus: !0,
                },
                on: {
                  blur: e.handleInputBlurEnter,
                  change: e.handleInputBlurEnter,
                },
                model: {
                  value: e.inputFilePath,
                  callback: function (t) {
                    e.inputFilePath = t;
                  },
                  expression: "inputFilePath",
                },
              }),
              i(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !e.isShowInput,
                      expression: "!isShowInput",
                    },
                  ],
                  staticClass: "breadcrumb-box",
                  class: { "able-input": 0 === e.fileType },
                  on: {
                    click: function (t) {
                      return t.target !== t.currentTarget
                        ? null
                        : e.handleClickBreadCrumbSelf(t);
                    },
                  },
                },
                [
                  [0, 8].includes(e.fileType) ||
                  ["Share"].includes(e.$route.name)
                    ? i(
                        "el-breadcrumb",
                        { attrs: { "separator-class": "el-icon-arrow-right" } },
                        e._l(e.breadCrumbList, function (t, n) {
                          return i(
                            "el-breadcrumb-item",
                            { key: n, attrs: { to: e.getRouteQuery(t) } },
                            [e._v(e._s(t.name))]
                          );
                        }),
                        1
                      )
                    : i(
                        "el-breadcrumb",
                        { attrs: { "separator-class": "el-icon-arrow-right" } },
                        [
                          i("el-breadcrumb-item", [
                            e._v(e._s(e.fileTypeMap[e.fileType])),
                          ]),
                        ],
                        1
                      ),
                ],
                1
              ),
            ],
            1
          );
        },
        r = [],
        l = i("5530"),
        o =
          (i("a9e3"),
          i("ac1f"),
          i("1276"),
          i("a15b"),
          i("b0c0"),
          {
            name: "BreadCrumb",
            props: {
              fileType: { required: !0, type: Number },
              filePath: { require: !0, type: String },
              currentTabName: { require: !0, type: String },
            },
            data: function () {
              return {
                fileTypeMap: {
                  1: "全部图片",
                  2: "全部文档",
                  3: "全部视频",
                  4: "全部音乐",
                  5: "其他",
                  6: "回收站",
                },
                isShowInput: !1,
                inputFilePath: "",
              };
            },
            computed: {
              breadCrumbList: {
                get: function () {
                  var e = "";
                  e =
                    "model1" === this.currentTabName ||
                    "model2" === this.currentTabName
                      ? this.$route.query.modelFilePath
                      : this.$route.query.filePath;
                  for (
                    var t = e ? e.split("/") : [], i = [], n = [], r = 0;
                    r < t.length;
                    r++
                  )
                    t[r]
                      ? (n.push(t[r] + "/"),
                        i.push({ path: n.join(""), name: t[r] }))
                      : 0 === r &&
                        ((t[r] = "/"),
                        n.push(t[r]),
                        i.push({
                          path: "/",
                          name:
                            0 === this.fileType &&
                            "file" === this.currentTabName
                              ? "全部文件"
                              : 0 === this.fileType &&
                                "model1" === this.currentTabName
                              ? "模型列表"
                              : 0 === this.fileType &&
                                "model2" === this.currentTabName
                              ? "集成模型列表"
                              : 0 === this.fileType &&
                                "cloudFile" === this.currentTabName
                              ? "我的文件"
                              : 0 === this.fileType &&
                                "cloudProject" === this.currentTabName
                              ? "项目空间"
                              : "全部列表",
                        }));
                  return i;
                },
                set: function () {
                  return [];
                },
              },
            },
            methods: {
              handleClickBreadCrumbSelf: function () {
                var e = this;
                0 === this.fileType &&
                  ("file" !== this.currentTabName
                    ? (this.inputFilePath = this.modelFilePath)
                    : (this.inputFilePath = this.filePath),
                  (this.isShowInput = !1),
                  this.$nextTick(function () {
                    e.$refs.filePathInputRef.focus();
                  }));
              },
              handleInputBlurEnter: function () {
                (this.isShowInput = !1),
                  "file" !== this.currentTabName
                    ? this.inputFilePath !== this.modelFilePath &&
                      this.$router.push({
                        query: {
                          filePath: "".concat(this.inputFilePath, "/"),
                          fileType: 0,
                        },
                      })
                    : this.inputFilePath !== this.filePath &&
                      this.$router.push({
                        query: {
                          filePath: "".concat(this.inputFilePath, "/"),
                          fileType: 0,
                        },
                      });
              },
              getRouteQuery: function (e) {
                var t = this.$route.name;
                return "Share" === t
                  ? { query: { filePath: e.path } }
                  : 8 === this.fileType
                  ? {
                      query: {
                        fileType: 8,
                        filePath: e.path,
                        shareBatchNum:
                          "/" === e.path
                            ? void 0
                            : this.$route.query.shareBatchNum,
                      },
                    }
                  : "model1" === this.currentTabName ||
                    "model2" === this.currentTabName
                  ? {
                      query: Object(l["a"])(
                        Object(l["a"])({}, this.$route.query),
                        {},
                        { modelFilePath: e.path }
                      ),
                    }
                  : {
                      query: Object(l["a"])(
                        Object(l["a"])({}, this.$route.query),
                        {},
                        { filePath: e.path, fileType: 0 }
                      ),
                    };
              },
            },
          }),
        a = o,
        s = (i("78f3"), i("2877")),
        c = Object(s["a"])(a, n, r, !1, null, "03206153", null);
      t["a"] = c.exports;
    },
  },
]);
