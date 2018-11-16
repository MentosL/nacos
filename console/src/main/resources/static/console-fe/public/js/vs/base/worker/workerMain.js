/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.10.1(ebbf400719be21761361804bf63fb3916e64a845)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/
(function() {
  var e = [
      'exports',
      'require',
      'vs/base/common/winjs.base',
      'vs/editor/common/core/position',
      'vs/base/common/platform',
      'vs/editor/common/core/range',
      'vs/base/common/uri',
      'vs/editor/common/core/uint',
      'vs/base/common/errors',
      'vs/base/common/event',
      'vs/base/common/lifecycle',
      'vs/base/common/functional',
      'vs/base/common/diff/diff',
      'vs/base/common/cancellation',
      'vs/base/common/types',
      'vs/base/common/callbackList',
      'vs/base/common/diff/diffChange',
      'vs/base/common/map',
      'vs/base/common/async',
      'vs/editor/common/viewModel/prefixSumComputer',
      'vs/base/common/strings',
      'vs/base/common/keyCodes',
      'vs/editor/common/core/selection',
      'vs/editor/common/core/token',
      'vs/editor/common/model/mirrorModel',
      'vs/editor/common/core/characterClassifier',
      'vs/editor/common/diff/diffComputer',
      'vs/editor/common/model/wordHelper',
      'vs/editor/common/modes/linkComputer',
      'vs/editor/common/modes/supports/inplaceReplaceSupport',
      'vs/editor/common/standalone/standaloneBase',
      'vs/base/common/worker/simpleWorker',
      'vs/base/common/winjs.base.raw',
      'vs/editor/common/services/editorSimpleWorker',
    ],
    t = function(t) {
      for (var n = [], r = 0, i = t.length; r < i; r++) n[r] = e[t[r]];
      return n;
    },
    n = this;
  !(function(e) {
    e.global = n;
    var t = (function() {
      function t(e) {
        (this.isWindows = e.isWindows),
          (this.isNode = e.isNode),
          (this.isElectronRenderer = e.isElectronRenderer),
          (this.isWebWorker = e.isWebWorker);
      }
      return (
        (t.detect = function() {
          return new t({
            isWindows: this._isWindows(),
            isNode: 'undefined' != typeof module && !!module.exports,
            isElectronRenderer:
              'undefined' != typeof process &&
              void 0 !== process.versions &&
              void 0 !== process.versions.electron &&
              'renderer' === process.type,
            isWebWorker: 'function' == typeof e.global.importScripts,
          });
        }),
        (t._isWindows = function() {
          return (
            !!(
              'undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.indexOf('Windows') >= 0
            ) ||
            ('undefined' != typeof process && 'win32' === process.platform)
          );
        }),
        t
      );
    })();
    e.Environment = t;
  })(i || (i = {}));
  !(function(e) {
    var t;
    !(function(e) {
      (e[(e.LoaderAvailable = 1)] = 'LoaderAvailable'),
        (e[(e.BeginLoadingScript = 10)] = 'BeginLoadingScript'),
        (e[(e.EndLoadingScriptOK = 11)] = 'EndLoadingScriptOK'),
        (e[(e.EndLoadingScriptError = 12)] = 'EndLoadingScriptError'),
        (e[(e.BeginInvokeFactory = 21)] = 'BeginInvokeFactory'),
        (e[(e.EndInvokeFactory = 22)] = 'EndInvokeFactory'),
        (e[(e.NodeBeginEvaluatingScript = 31)] = 'NodeBeginEvaluatingScript'),
        (e[(e.NodeEndEvaluatingScript = 32)] = 'NodeEndEvaluatingScript'),
        (e[(e.NodeBeginNativeRequire = 33)] = 'NodeBeginNativeRequire'),
        (e[(e.NodeEndNativeRequire = 34)] = 'NodeEndNativeRequire');
    })((t = e.LoaderEventType || (e.LoaderEventType = {})));
    var n = (function() {
      return function(e, t, n) {
        (this.type = e), (this.detail = t), (this.timestamp = n);
      };
    })();
    e.LoaderEvent = n;
    var r = (function() {
      function r(e) {
        this._events = [new n(t.LoaderAvailable, '', e)];
      }
      return (
        (r.prototype.record = function(t, r) {
          this._events.push(new n(t, r, e.Utilities.getHighPerformanceTimestamp()));
        }),
        (r.prototype.getEvents = function() {
          return this._events;
        }),
        r
      );
    })();
    e.LoaderEventRecorder = r;
    var i = (function() {
      function e() {}
      return (
        (e.prototype.record = function(e, t) {}),
        (e.prototype.getEvents = function() {
          return [];
        }),
        e
      );
    })();
    (i.INSTANCE = new i()), (e.NullLoaderEventRecorder = i);
  })(i || (i = {}));
  !(function(e) {
    var t = (function() {
      function t() {}
      return (
        (t.fileUriToFilePath = function(e, t) {
          if (((t = decodeURI(t)), e)) {
            if (/^file:\/\/\//.test(t)) return t.substr(8);
            if (/^file:\/\//.test(t)) return t.substr(5);
          } else if (/^file:\/\//.test(t)) return t.substr(7);
          return t;
        }),
        (t.startsWith = function(e, t) {
          return e.length >= t.length && e.substr(0, t.length) === t;
        }),
        (t.endsWith = function(e, t) {
          return e.length >= t.length && e.substr(e.length - t.length) === t;
        }),
        (t.containsQueryString = function(e) {
          return /^[^\#]*\?/gi.test(e);
        }),
        (t.isAbsolutePath = function(e) {
          return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(e);
        }),
        (t.forEachProperty = function(e, t) {
          if (e) {
            var n = void 0;
            for (n in e) e.hasOwnProperty(n) && t(n, e[n]);
          }
        }),
        (t.isEmpty = function(e) {
          var n = !0;
          return (
            t.forEachProperty(e, function() {
              n = !1;
            }),
            n
          );
        }),
        (t.recursiveClone = function(e) {
          if (!e || 'object' != typeof e) return e;
          var n = Array.isArray(e) ? [] : {};
          return (
            t.forEachProperty(e, function(e, r) {
              n[e] = r && 'object' == typeof r ? t.recursiveClone(r) : r;
            }),
            n
          );
        }),
        (t.generateAnonymousModule = function() {
          return '===anonymous' + t.NEXT_ANONYMOUS_ID++ + '===';
        }),
        (t.isAnonymousModule = function(e) {
          return /^===anonymous/.test(e);
        }),
        (t.getHighPerformanceTimestamp = function() {
          return (
            this.PERFORMANCE_NOW_PROBED ||
              ((this.PERFORMANCE_NOW_PROBED = !0),
              (this.HAS_PERFORMANCE_NOW =
                e.global.performance && 'function' == typeof e.global.performance.now)),
            this.HAS_PERFORMANCE_NOW ? e.global.performance.now() : Date.now()
          );
        }),
        t
      );
    })();
    (t.NEXT_ANONYMOUS_ID = 1),
      (t.PERFORMANCE_NOW_PROBED = !1),
      (t.HAS_PERFORMANCE_NOW = !1),
      (e.Utilities = t);
  })(i || (i = {}));
  !(function(e) {
    var t = (function() {
      function t() {}
      return (
        (t.validateConfigurationOptions = function(t, n) {
          return (
            'string' != typeof (n = n || {}).baseUrl && (n.baseUrl = ''),
            'boolean' != typeof n.isBuild && (n.isBuild = !1),
            'object' != typeof n.paths && (n.paths = {}),
            'object' != typeof n.config && (n.config = {}),
            void 0 === n.catchError && (n.catchError = t),
            'string' != typeof n.urlArgs && (n.urlArgs = ''),
            'function' != typeof n.onError &&
              (n.onError = function(e) {
                return 'load' === e.errorCode
                  ? (console.error('Loading "' + e.moduleId + '" failed'),
                    console.error('Detail: ', e.detail),
                    e.detail && e.detail.stack && console.error(e.detail.stack),
                    console.error('Here are the modules that depend on it:'),
                    void console.error(e.neededBy))
                  : 'factory' === e.errorCode
                  ? (console.error(
                      'The factory method of "' + e.moduleId + '" has thrown an exception'
                    ),
                    console.error(e.detail),
                    void (e.detail && e.detail.stack && console.error(e.detail.stack)))
                  : void 0;
              }),
            ('object' == typeof n.ignoreDuplicateModules &&
              Array.isArray(n.ignoreDuplicateModules)) ||
              (n.ignoreDuplicateModules = []),
            n.baseUrl.length > 0 && (e.Utilities.endsWith(n.baseUrl, '/') || (n.baseUrl += '/')),
            Array.isArray(n.nodeModules) || (n.nodeModules = []),
            ('number' != typeof n.nodeCachedDataWriteDelay || n.nodeCachedDataWriteDelay < 0) &&
              (n.nodeCachedDataWriteDelay = 7e3),
            'function' != typeof n.onNodeCachedData &&
              (n.onNodeCachedData = function(e, t) {
                e &&
                  ('cachedDataRejected' === e.errorCode
                    ? console.warn('Rejected cached data from file: ' + e.path)
                    : 'unlink' === e.errorCode || 'writeFile' === e.errorCode
                    ? (console.error('Problems writing cached data file: ' + e.path),
                      console.error(e.detail))
                    : console.error(e));
              }),
            n
          );
        }),
        (t.mergeConfigurationOptions = function(n, r, i) {
          void 0 === r && (r = null), void 0 === i && (i = null);
          var o = e.Utilities.recursiveClone(i || {});
          return (
            e.Utilities.forEachProperty(r, function(t, n) {
              'ignoreDuplicateModules' === t && void 0 !== o.ignoreDuplicateModules
                ? (o.ignoreDuplicateModules = o.ignoreDuplicateModules.concat(n))
                : 'paths' === t && void 0 !== o.paths
                ? e.Utilities.forEachProperty(n, function(e, t) {
                    return (o.paths[e] = t);
                  })
                : 'config' === t && void 0 !== o.config
                ? e.Utilities.forEachProperty(n, function(e, t) {
                    return (o.config[e] = t);
                  })
                : (o[t] = e.Utilities.recursiveClone(n));
            }),
            t.validateConfigurationOptions(n, o)
          );
        }),
        t
      );
    })();
    e.ConfigurationOptionsUtil = t;
    var n = (function() {
      function n(e, n) {
        if (
          ((this._env = e),
          (this.options = t.mergeConfigurationOptions(this._env.isWebWorker, n)),
          this._createIgnoreDuplicateModulesMap(),
          this._createNodeModulesMap(),
          this._createSortedPathsRules(),
          '' === this.options.baseUrl)
        ) {
          if (
            this._env.isNode &&
            this.options.nodeRequire &&
            this.options.nodeRequire.main &&
            this.options.nodeRequire.main.filename
          ) {
            var r = this.options.nodeRequire.main.filename,
              i = Math.max(r.lastIndexOf('/'), r.lastIndexOf('\\'));
            this.options.baseUrl = r.substring(0, i + 1);
          }
          if (this._env.isNode && this.options.nodeMain) {
            var r = this.options.nodeMain,
              i = Math.max(r.lastIndexOf('/'), r.lastIndexOf('\\'));
            this.options.baseUrl = r.substring(0, i + 1);
          }
        }
      }
      return (
        (n.prototype._createIgnoreDuplicateModulesMap = function() {
          this.ignoreDuplicateModulesMap = {};
          for (var e = 0; e < this.options.ignoreDuplicateModules.length; e++)
            this.ignoreDuplicateModulesMap[this.options.ignoreDuplicateModules[e]] = !0;
        }),
        (n.prototype._createNodeModulesMap = function() {
          this.nodeModulesMap = Object.create(null);
          for (var e = 0, t = this.options.nodeModules; e < t.length; e++) {
            var n = t[e];
            this.nodeModulesMap[n] = !0;
          }
        }),
        (n.prototype._createSortedPathsRules = function() {
          var t = this;
          (this.sortedPathsRules = []),
            e.Utilities.forEachProperty(this.options.paths, function(e, n) {
              Array.isArray(n)
                ? t.sortedPathsRules.push({ from: e, to: n })
                : t.sortedPathsRules.push({ from: e, to: [n] });
            }),
            this.sortedPathsRules.sort(function(e, t) {
              return t.from.length - e.from.length;
            });
        }),
        (n.prototype.cloneAndMerge = function(e) {
          return new n(
            this._env,
            t.mergeConfigurationOptions(this._env.isWebWorker, e, this.options)
          );
        }),
        (n.prototype.getOptionsLiteral = function() {
          return this.options;
        }),
        (n.prototype._applyPaths = function(t) {
          for (var n, r = 0, i = this.sortedPathsRules.length; r < i; r++)
            if (((n = this.sortedPathsRules[r]), e.Utilities.startsWith(t, n.from))) {
              for (var o = [], s = 0, u = n.to.length; s < u; s++)
                o.push(n.to[s] + t.substr(n.from.length));
              return o;
            }
          return [t];
        }),
        (n.prototype._addUrlArgsToUrl = function(t) {
          return e.Utilities.containsQueryString(t)
            ? t + '&' + this.options.urlArgs
            : t + '?' + this.options.urlArgs;
        }),
        (n.prototype._addUrlArgsIfNecessaryToUrl = function(e) {
          return this.options.urlArgs ? this._addUrlArgsToUrl(e) : e;
        }),
        (n.prototype._addUrlArgsIfNecessaryToUrls = function(e) {
          if (this.options.urlArgs)
            for (var t = 0, n = e.length; t < n; t++) e[t] = this._addUrlArgsToUrl(e[t]);
          return e;
        }),
        (n.prototype.moduleIdToPaths = function(t) {
          if (!0 === this.nodeModulesMap[t]) return this.isBuild() ? ['empty:'] : ['node|' + t];
          var n,
            r = t;
          if (e.Utilities.endsWith(r, '.js') || e.Utilities.isAbsolutePath(r))
            e.Utilities.endsWith(r, '.js') || e.Utilities.containsQueryString(r) || (r += '.js'),
              (n = [r]);
          else
            for (var i = 0, o = (n = this._applyPaths(r)).length; i < o; i++)
              (this.isBuild() && 'empty:' === n[i]) ||
                (e.Utilities.isAbsolutePath(n[i]) || (n[i] = this.options.baseUrl + n[i]),
                e.Utilities.endsWith(n[i], '.js') ||
                  e.Utilities.containsQueryString(n[i]) ||
                  (n[i] = n[i] + '.js'));
          return this._addUrlArgsIfNecessaryToUrls(n);
        }),
        (n.prototype.requireToUrl = function(t) {
          var n = t;
          return (
            e.Utilities.isAbsolutePath(n) ||
              ((n = this._applyPaths(n)[0]),
              e.Utilities.isAbsolutePath(n) || (n = this.options.baseUrl + n)),
            this._addUrlArgsIfNecessaryToUrl(n)
          );
        }),
        (n.prototype.isBuild = function() {
          return this.options.isBuild;
        }),
        (n.prototype.isDuplicateMessageIgnoredFor = function(e) {
          return this.ignoreDuplicateModulesMap.hasOwnProperty(e);
        }),
        (n.prototype.getConfigForModule = function(e) {
          if (this.options.config) return this.options.config[e];
        }),
        (n.prototype.shouldCatchError = function() {
          return this.options.catchError;
        }),
        (n.prototype.shouldRecordStats = function() {
          return this.options.recordStats;
        }),
        (n.prototype.onError = function(e) {
          this.options.onError(e);
        }),
        n
      );
    })();
    e.Configuration = n;
  })(i || (i = {}));
  !(function(e) {
    var t = (function() {
        function e(e) {
          (this.actualScriptLoader = e), (this.callbackMap = {});
        }
        return (
          (e.prototype.load = function(e, t, n, r) {
            var i = this,
              o = { callback: n, errorback: r };
            this.callbackMap.hasOwnProperty(t)
              ? this.callbackMap[t].push(o)
              : ((this.callbackMap[t] = [o]),
                this.actualScriptLoader.load(
                  e,
                  t,
                  function() {
                    return i.triggerCallback(t);
                  },
                  function(e) {
                    return i.triggerErrorback(t, e);
                  }
                ));
          }),
          (e.prototype.triggerCallback = function(e) {
            var t = this.callbackMap[e];
            delete this.callbackMap[e];
            for (var n = 0; n < t.length; n++) t[n].callback();
          }),
          (e.prototype.triggerErrorback = function(e, t) {
            var n = this.callbackMap[e];
            delete this.callbackMap[e];
            for (var r = 0; r < n.length; r++) n[r].errorback(t);
          }),
          e
        );
      })(),
      n = (function() {
        function e() {}
        return (
          (e.prototype.attachListeners = function(e, t, n) {
            var r = function() {
                e.removeEventListener('load', i), e.removeEventListener('error', o);
              },
              i = function(e) {
                r(), t();
              },
              o = function(e) {
                r(), n(e);
              };
            e.addEventListener('load', i), e.addEventListener('error', o);
          }),
          (e.prototype.load = function(e, t, n, r) {
            var i = document.createElement('script');
            i.setAttribute('async', 'async'),
              i.setAttribute('type', 'text/javascript'),
              this.attachListeners(i, n, r),
              i.setAttribute('src', t),
              document.getElementsByTagName('head')[0].appendChild(i);
          }),
          e
        );
      })(),
      r = (function() {
        function e() {}
        return (
          (e.prototype.load = function(e, t, n, r) {
            try {
              importScripts(t), n();
            } catch (e) {
              r(e);
            }
          }),
          e
        );
      })(),
      i = (function() {
        function t(e) {
          (this._env = e), (this._didInitialize = !1), (this._didPatchNodeRequire = !1);
        }
        return (
          (t.prototype._init = function(e) {
            if (!this._didInitialize) {
              (this._didInitialize = !0),
                (this._fs = e('fs')),
                (this._vm = e('vm')),
                (this._path = e('path')),
                (this._crypto = e('crypto')),
                (this._jsflags = '');
              for (var t = 0, n = process.argv; t < n.length; t++) {
                var r = n[t];
                if (0 === r.indexOf('--js-flags=')) {
                  this._jsflags = r;
                  break;
                }
              }
            }
          }),
          (t.prototype._initNodeRequire = function(t, n) {
            function r(e) {
              var t = e.constructor,
                n = function(t) {
                  try {
                    return e.require(t);
                  } finally {
                  }
                };
              return (
                (n.resolve = function(n) {
                  return t._resolveFilename(n, e);
                }),
                (n.main = process.mainModule),
                (n.extensions = t._extensions),
                (n.cache = t._cache),
                n
              );
            }
            var i = n.getConfig().getOptionsLiteral().nodeCachedDataDir;
            if (i && !this._didPatchNodeRequire) {
              this._didPatchNodeRequire = !0;
              var o = this,
                s = t('module');
              s.prototype._compile = function(t, u) {
                t = t.replace(/^#!.*/, '');
                var a = s.wrap(t),
                  l = o._getCachedDataPath(i, u),
                  c = { filename: u };
                try {
                  c.cachedData = o._fs.readFileSync(l);
                } catch (e) {
                  c.produceCachedData = !0;
                }
                var f = new o._vm.Script(a, c),
                  h = f.runInThisContext(c),
                  d = o._path.dirname(u),
                  p = r(this),
                  m = [this.exports, p, this, u, d, process, e.global, Buffer],
                  _ = h.apply(this.exports, m);
                return o._processCachedData(n, f, l), _;
              };
            }
          }),
          (t.prototype.load = function(n, r, i, o) {
            var s = this,
              u = n.getConfig().getOptionsLiteral(),
              a = u.nodeRequire || e.global.nodeRequire,
              l =
                u.nodeInstrumenter ||
                function(e) {
                  return e;
                };
            this._init(a), this._initNodeRequire(a, n);
            var c = n.getRecorder();
            if (/^node\|/.test(r)) {
              var f = r.split('|'),
                h = null;
              try {
                h = a(f[1]);
              } catch (e) {
                return void o(e);
              }
              n.enqueueDefineAnonymousModule([], function() {
                return h;
              }),
                i();
            } else
              (r = e.Utilities.fileUriToFilePath(this._env.isWindows, r)),
                this._fs.readFile(r, { encoding: 'utf8' }, function(e, a) {
                  if (e) o(e);
                  else {
                    var f = s._path.normalize(r),
                      h = f;
                    if (s._env.isElectronRenderer) {
                      var d = h.match(/^([a-z])\:(.*)/i);
                      h = d
                        ? 'file:///' + (d[1].toUpperCase() + ':' + d[2]).replace(/\\/g, '/')
                        : 'file://' + h;
                    }
                    var p,
                      m = '(function (require, define, __filename, __dirname) { ';
                    if (
                      ((p =
                        a.charCodeAt(0) === t._BOM
                          ? m + a.substring(1) + '\n});'
                          : m + a + '\n});'),
                      (p = l(p, f)),
                      u.nodeCachedDataDir)
                    ) {
                      var _ = s._getCachedDataPath(u.nodeCachedDataDir, r);
                      s._fs.readFile(_, function(e, t) {
                        var o = { filename: h, produceCachedData: void 0 === t, cachedData: t },
                          u = s._loadAndEvalScript(n, r, h, p, o, c);
                        i(), s._processCachedData(n, u, _);
                      });
                    } else s._loadAndEvalScript(n, r, h, p, { filename: h }, c), i();
                  }
                });
          }),
          (t.prototype._loadAndEvalScript = function(t, n, r, i, o, s) {
            s.record(e.LoaderEventType.NodeBeginEvaluatingScript, n);
            var u = new this._vm.Script(i, o);
            return (
              u
                .runInThisContext(o)
                .call(
                  e.global,
                  t.getGlobalAMDRequireFunc(),
                  t.getGlobalAMDDefineFunc(),
                  r,
                  this._path.dirname(n)
                ),
              s.record(e.LoaderEventType.NodeEndEvaluatingScript, n),
              u
            );
          }),
          (t.prototype._getCachedDataPath = function(e, t) {
            var n = this._crypto
                .createHash('md5')
                .update(t, 'utf8')
                .update(this._jsflags, 'utf8')
                .digest('hex'),
              r = this._path.basename(t).replace(/\.js$/, '');
            return this._path.join(e, r + '-' + n + '.code');
          }),
          (t.prototype._processCachedData = function(e, n, r) {
            var i = this;
            n.cachedDataRejected
              ? (e
                  .getConfig()
                  .getOptionsLiteral()
                  .onNodeCachedData({ errorCode: 'cachedDataRejected', path: r }),
                t._runSoon(function() {
                  return i._fs.unlink(r, function(t) {
                    t &&
                      e
                        .getConfig()
                        .getOptionsLiteral()
                        .onNodeCachedData({ errorCode: 'unlink', path: r, detail: t });
                  });
                }, e.getConfig().getOptionsLiteral().nodeCachedDataWriteDelay))
              : n.cachedDataProduced &&
                (e
                  .getConfig()
                  .getOptionsLiteral()
                  .onNodeCachedData(void 0, { path: r, length: n.cachedData.length }),
                t._runSoon(function() {
                  return i._fs.writeFile(r, n.cachedData, function(t) {
                    t &&
                      e
                        .getConfig()
                        .getOptionsLiteral()
                        .onNodeCachedData({ errorCode: 'writeFile', path: r, detail: t });
                  });
                }, e.getConfig().getOptionsLiteral().nodeCachedDataWriteDelay));
          }),
          (t._runSoon = function(e, t) {
            var n = t + Math.ceil(Math.random() * t);
            setTimeout(e, n);
          }),
          t
        );
      })();
    (i._BOM = 65279),
      (e.createScriptLoader = function(e) {
        return new t(e.isWebWorker ? new r() : e.isNode ? new i(e) : new n());
      });
  })(i || (i = {}));
  !(function(e) {
    var t = (function() {
      function t(e) {
        var t = e.lastIndexOf('/');
        this.fromModulePath = -1 !== t ? e.substr(0, t + 1) : '';
      }
      return (
        (t._normalizeModuleId = function(e) {
          var t,
            n = e;
          for (t = /\/\.\//; t.test(n); ) n = n.replace(t, '/');
          for (
            n = n.replace(/^\.\//g, ''),
              t = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
            t.test(n);

          )
            n = n.replace(t, '/');
          return (n = n.replace(
            /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
            ''
          ));
        }),
        (t.prototype.resolveModule = function(n) {
          var r = n;
          return (
            e.Utilities.isAbsolutePath(r) ||
              ((e.Utilities.startsWith(r, './') || e.Utilities.startsWith(r, '../')) &&
                (r = t._normalizeModuleId(this.fromModulePath + r))),
            r
          );
        }),
        t
      );
    })();
    (t.ROOT = new t('')), (e.ModuleIdResolver = t);
    var n = (function() {
      function t(e, t, n, r, i, o) {
        (this.id = e),
          (this.strId = t),
          (this.dependencies = n),
          (this._callback = r),
          (this._errorback = i),
          (this.moduleIdResolver = o),
          (this.exports = {}),
          (this.exportsPassedIn = !1),
          (this.unresolvedDependenciesCount = this.dependencies.length),
          (this._isComplete = !1);
      }
      return (
        (t._safeInvokeFunction = function(t, n) {
          try {
            return { returnedValue: t.apply(e.global, n), producedError: null };
          } catch (e) {
            return { returnedValue: null, producedError: e };
          }
        }),
        (t._invokeFactory = function(t, n, r, i) {
          return t.isBuild() && !e.Utilities.isAnonymousModule(n)
            ? { returnedValue: null, producedError: null }
            : t.shouldCatchError()
            ? this._safeInvokeFunction(r, i)
            : { returnedValue: r.apply(e.global, i), producedError: null };
        }),
        (t.prototype.complete = function(n, r, i) {
          this._isComplete = !0;
          var o = null;
          if (this._callback)
            if ('function' == typeof this._callback) {
              n.record(e.LoaderEventType.BeginInvokeFactory, this.strId);
              var s = t._invokeFactory(r, this.strId, this._callback, i);
              (o = s.producedError),
                n.record(e.LoaderEventType.EndInvokeFactory, this.strId),
                o ||
                  void 0 === s.returnedValue ||
                  (this.exportsPassedIn && !e.Utilities.isEmpty(this.exports)) ||
                  (this.exports = s.returnedValue);
            } else this.exports = this._callback;
          o && r.onError({ errorCode: 'factory', moduleId: this.strId, detail: o }),
            (this.dependencies = null),
            (this._callback = null),
            (this._errorback = null),
            (this.moduleIdResolver = null);
        }),
        (t.prototype.onDependencyError = function(e) {
          return !!this._errorback && (this._errorback(e), !0);
        }),
        (t.prototype.isComplete = function() {
          return this._isComplete;
        }),
        t
      );
    })();
    e.Module = n;
    var r = (function() {
        function e() {
          (this._nextId = 0),
            (this._strModuleIdToIntModuleId = new Map()),
            (this._intModuleIdToStrModuleId = []),
            this.getModuleId('exports'),
            this.getModuleId('module'),
            this.getModuleId('require');
        }
        return (
          (e.prototype.getMaxModuleId = function() {
            return this._nextId;
          }),
          (e.prototype.getModuleId = function(e) {
            var t = this._strModuleIdToIntModuleId.get(e);
            return (
              void 0 === t &&
                ((t = this._nextId++),
                this._strModuleIdToIntModuleId.set(e, t),
                (this._intModuleIdToStrModuleId[t] = e)),
              t
            );
          }),
          (e.prototype.getStrModuleId = function(e) {
            return this._intModuleIdToStrModuleId[e];
          }),
          e
        );
      })(),
      i = (function() {
        return function(e) {
          this.id = e;
        };
      })();
    (i.EXPORTS = new i(0)),
      (i.MODULE = new i(1)),
      (i.REQUIRE = new i(2)),
      (e.RegularDependency = i);
    var o = (function() {
      return function(e, t, n) {
        (this.id = e), (this.pluginId = t), (this.pluginParam = n);
      };
    })();
    e.PluginDependency = o;
    var s = (function() {
      function s(t, n, i, o, s) {
        void 0 === s && (s = 0),
          (this._env = t),
          (this._scriptLoader = n),
          (this._loaderAvailableTimestamp = s),
          (this._defineFunc = i),
          (this._requireFunc = o),
          (this._moduleIdProvider = new r()),
          (this._config = new e.Configuration(this._env)),
          (this._modules2 = []),
          (this._knownModules2 = []),
          (this._inverseDependencies2 = []),
          (this._inversePluginDependencies2 = new Map()),
          (this._currentAnnonymousDefineCall = null),
          (this._recorder = null),
          (this._buildInfoPath = []),
          (this._buildInfoDefineStack = []),
          (this._buildInfoDependencies = []);
      }
      return (
        (s.prototype.reset = function() {
          return new s(
            this._env,
            this._scriptLoader,
            this._defineFunc,
            this._requireFunc,
            this._loaderAvailableTimestamp
          );
        }),
        (s.prototype.getGlobalAMDDefineFunc = function() {
          return this._defineFunc;
        }),
        (s.prototype.getGlobalAMDRequireFunc = function() {
          return this._requireFunc;
        }),
        (s._findRelevantLocationInStack = function(e, t) {
          for (
            var n = function(e) {
                return e.replace(/\\/g, '/');
              },
              r = n(e),
              i = t.split(/\n/),
              o = 0;
            o < i.length;
            o++
          ) {
            var s = i[o].match(/(.*):(\d+):(\d+)\)?$/);
            if (s) {
              var u = s[1],
                a = s[2],
                l = s[3],
                c = Math.max(u.lastIndexOf(' ') + 1, u.lastIndexOf('(') + 1);
              if (((u = u.substr(c)), (u = n(u)) === r)) {
                var f = { line: parseInt(a, 10), col: parseInt(l, 10) };
                return (
                  1 === f.line &&
                    (f.col -= '(function (require, define, __filename, __dirname) { '.length),
                  f
                );
              }
            }
          }
          throw new Error('Could not correlate define call site for needle ' + e);
        }),
        (s.prototype.getBuildInfo = function() {
          if (!this._config.isBuild()) return null;
          for (var e = [], t = 0, n = 0, r = this._modules2.length; n < r; n++) {
            var i = this._modules2[n];
            if (i) {
              var o = this._buildInfoPath[i.id] || null,
                u = this._buildInfoDefineStack[i.id] || null,
                a = this._buildInfoDependencies[i.id];
              e[t++] = {
                id: i.strId,
                path: o,
                defineLocation: o && u ? s._findRelevantLocationInStack(o, u) : null,
                dependencies: a,
                shim: null,
                exports: i.exports,
              };
            }
          }
          return e;
        }),
        (s.prototype.getRecorder = function() {
          return (
            this._recorder ||
              (this._config.shouldRecordStats()
                ? (this._recorder = new e.LoaderEventRecorder(this._loaderAvailableTimestamp))
                : (this._recorder = e.NullLoaderEventRecorder.INSTANCE)),
            this._recorder
          );
        }),
        (s.prototype.getLoaderEvents = function() {
          return this.getRecorder().getEvents();
        }),
        (s.prototype.enqueueDefineAnonymousModule = function(e, t) {
          if (null !== this._currentAnnonymousDefineCall)
            throw new Error('Can only have one anonymous define call per script file');
          var n = null;
          this._config.isBuild() && (n = new Error('StackLocation').stack),
            (this._currentAnnonymousDefineCall = { stack: n, dependencies: e, callback: t });
        }),
        (s.prototype.defineModule = function(e, r, i, o, s, u) {
          var a = this;
          void 0 === u && (u = new t(e));
          var l = this._moduleIdProvider.getModuleId(e);
          if (this._modules2[l])
            this._config.isDuplicateMessageIgnoredFor(e) ||
              console.warn("Duplicate definition of module '" + e + "'");
          else {
            var c = new n(l, e, this._normalizeDependencies(r, u), i, o, u);
            (this._modules2[l] = c),
              this._config.isBuild() &&
                ((this._buildInfoDefineStack[l] = s),
                (this._buildInfoDependencies[l] = c.dependencies.map(function(e) {
                  return a._moduleIdProvider.getStrModuleId(e.id);
                }))),
              this._resolve(c);
          }
        }),
        (s.prototype._normalizeDependency = function(e, t) {
          if ('exports' === e) return i.EXPORTS;
          if ('module' === e) return i.MODULE;
          if ('require' === e) return i.REQUIRE;
          var n = e.indexOf('!');
          if (n >= 0) {
            var r = t.resolveModule(e.substr(0, n)),
              s = t.resolveModule(e.substr(n + 1)),
              u = this._moduleIdProvider.getModuleId(r + '!' + s),
              a = this._moduleIdProvider.getModuleId(r);
            return new o(u, a, s);
          }
          return new i(this._moduleIdProvider.getModuleId(t.resolveModule(e)));
        }),
        (s.prototype._normalizeDependencies = function(e, t) {
          for (var n = [], r = 0, i = 0, o = e.length; i < o; i++)
            n[r++] = this._normalizeDependency(e[i], t);
          return n;
        }),
        (s.prototype._relativeRequire = function(t, n, r, i) {
          if ('string' == typeof n) return this.synchronousRequire(n, t);
          this.defineModule(e.Utilities.generateAnonymousModule(), n, r, i, null, t);
        }),
        (s.prototype.synchronousRequire = function(e, n) {
          void 0 === n && (n = new t(e));
          var r = this._normalizeDependency(e, n),
            i = this._modules2[r.id];
          if (!i)
            throw new Error(
              "Check dependency list! Synchronous require cannot resolve module '" +
                e +
                "'. This is the first mention of this module!"
            );
          if (!i.isComplete())
            throw new Error(
              "Check dependency list! Synchronous require cannot resolve module '" +
                e +
                "'. This module has not been resolved completely yet."
            );
          return i.exports;
        }),
        (s.prototype.configure = function(t, n) {
          var r = this._config.shouldRecordStats();
          (this._config = n ? new e.Configuration(this._env, t) : this._config.cloneAndMerge(t)),
            this._config.shouldRecordStats() && !r && (this._recorder = null);
        }),
        (s.prototype.getConfig = function() {
          return this._config;
        }),
        (s.prototype._onLoad = function(e) {
          if (null !== this._currentAnnonymousDefineCall) {
            var t = this._currentAnnonymousDefineCall;
            (this._currentAnnonymousDefineCall = null),
              this.defineModule(
                this._moduleIdProvider.getStrModuleId(e),
                t.dependencies,
                t.callback,
                null,
                t.stack
              );
          }
        }),
        (s.prototype._createLoadError = function(e, t) {
          var n = this;
          return {
            errorCode: 'load',
            moduleId: this._moduleIdProvider.getStrModuleId(e),
            neededBy: (this._inverseDependencies2[e] || []).map(function(e) {
              return n._moduleIdProvider.getStrModuleId(e);
            }),
            detail: t,
          };
        }),
        (s.prototype._onLoadError = function(e, t) {
          for (
            var n = this._createLoadError(e, t),
              r = [],
              i = 0,
              o = this._moduleIdProvider.getMaxModuleId();
            i < o;
            i++
          )
            r[i] = !1;
          var s = !1,
            u = [];
          for (u.push(e), r[e] = !0; u.length > 0; ) {
            var a = u.shift(),
              l = this._modules2[a];
            l && (s = l.onDependencyError(n) || s);
            var c = this._inverseDependencies2[a];
            if (c)
              for (var i = 0, o = c.length; i < o; i++) {
                var f = c[i];
                r[f] || (u.push(f), (r[f] = !0));
              }
          }
          s || this._config.onError(n);
        }),
        (s.prototype._hasDependencyPath = function(e, t) {
          var n = this._modules2[e];
          if (!n) return !1;
          for (var r = [], i = 0, o = this._moduleIdProvider.getMaxModuleId(); i < o; i++)
            r[i] = !1;
          var s = [];
          for (s.push(n), r[e] = !0; s.length > 0; ) {
            var u = s.shift().dependencies;
            if (u)
              for (var i = 0, o = u.length; i < o; i++) {
                var a = u[i];
                if (a.id === t) return !0;
                var l = this._modules2[a.id];
                l && !r[a.id] && ((r[a.id] = !0), s.push(l));
              }
          }
          return !1;
        }),
        (s.prototype._findCyclePath = function(e, t, n) {
          if (e === t || 50 === n) return [e];
          var r = this._modules2[e];
          if (!r) return null;
          for (var i = r.dependencies, o = 0, s = i.length; o < s; o++) {
            var u = this._findCyclePath(i[o].id, t, n + 1);
            if (null !== u) return u.push(e), u;
          }
          return null;
        }),
        (s.prototype._createRequire = function(t) {
          var n = this,
            r = function(e, r, i) {
              return n._relativeRequire(t, e, r, i);
            };
          return (
            (r.toUrl = function(e) {
              return n._config.requireToUrl(t.resolveModule(e));
            }),
            (r.getStats = function() {
              return n.getLoaderEvents();
            }),
            (r.__$__nodeRequire = e.global.nodeRequire),
            r
          );
        }),
        (s.prototype._loadModule = function(t) {
          var n = this;
          if (!this._modules2[t] && !this._knownModules2[t]) {
            this._knownModules2[t] = !0;
            var r = this._moduleIdProvider.getStrModuleId(t),
              i = this._config.moduleIdToPaths(r);
            this._env.isNode && -1 === r.indexOf('/') && i.push('node|' + r);
            var o = -1,
              s = function(r) {
                if (++o >= i.length) n._onLoadError(t, r);
                else {
                  var u = i[o],
                    a = n.getRecorder();
                  if (n._config.isBuild() && 'empty:' === u)
                    return (
                      (n._buildInfoPath[t] = u),
                      n.defineModule(n._moduleIdProvider.getStrModuleId(t), [], null, null, null),
                      void n._onLoad(t)
                    );
                  a.record(e.LoaderEventType.BeginLoadingScript, u),
                    n._scriptLoader.load(
                      n,
                      u,
                      function() {
                        n._config.isBuild() && (n._buildInfoPath[t] = u),
                          a.record(e.LoaderEventType.EndLoadingScriptOK, u),
                          n._onLoad(t);
                      },
                      function(t) {
                        a.record(e.LoaderEventType.EndLoadingScriptError, u), s(t);
                      }
                    );
                }
              };
            s(null);
          }
        }),
        (s.prototype._loadPluginDependency = function(e, n) {
          var r = this;
          if (!this._modules2[n.id] && !this._knownModules2[n.id]) {
            this._knownModules2[n.id] = !0;
            var i = function(e) {
              r.defineModule(r._moduleIdProvider.getStrModuleId(n.id), [], e, null, null);
            };
            (i.error = function(e) {
              r._config.onError(r._createLoadError(n.id, e));
            }),
              e.load(
                n.pluginParam,
                this._createRequire(t.ROOT),
                i,
                this._config.getOptionsLiteral()
              );
          }
        }),
        (s.prototype._resolve = function(e) {
          for (var t = this, n = e.dependencies, r = 0, s = n.length; r < s; r++) {
            var u = n[r];
            if (u !== i.EXPORTS)
              if (u !== i.MODULE)
                if (u !== i.REQUIRE) {
                  var a = this._modules2[u.id];
                  if (a && a.isComplete()) e.unresolvedDependenciesCount--;
                  else if (this._hasDependencyPath(u.id, e.id)) {
                    console.warn(
                      "There is a dependency cycle between '" +
                        this._moduleIdProvider.getStrModuleId(u.id) +
                        "' and '" +
                        this._moduleIdProvider.getStrModuleId(e.id) +
                        "'. The cyclic path follows:"
                    );
                    var l = this._findCyclePath(u.id, e.id, 0);
                    l.reverse(),
                      l.push(u.id),
                      console.warn(
                        l
                          .map(function(e) {
                            return t._moduleIdProvider.getStrModuleId(e);
                          })
                          .join(' => \n')
                      ),
                      e.unresolvedDependenciesCount--;
                  } else if (
                    ((this._inverseDependencies2[u.id] = this._inverseDependencies2[u.id] || []),
                    this._inverseDependencies2[u.id].push(e.id),
                    u instanceof o)
                  ) {
                    var c = this._modules2[u.pluginId];
                    if (c && c.isComplete()) {
                      this._loadPluginDependency(c.exports, u);
                      continue;
                    }
                    var f = this._inversePluginDependencies2.get(u.pluginId);
                    f || ((f = []), this._inversePluginDependencies2.set(u.pluginId, f)),
                      f.push(u),
                      this._loadModule(u.pluginId);
                  } else this._loadModule(u.id);
                } else e.unresolvedDependenciesCount--;
              else e.unresolvedDependenciesCount--;
            else (e.exportsPassedIn = !0), e.unresolvedDependenciesCount--;
          }
          0 === e.unresolvedDependenciesCount && this._onModuleComplete(e);
        }),
        (s.prototype._onModuleComplete = function(e) {
          var t = this,
            n = this.getRecorder();
          if (!e.isComplete()) {
            for (var r = e.dependencies, o = [], s = 0, u = r.length; s < u; s++) {
              var a = r[s];
              if (a !== i.EXPORTS)
                if (a !== i.MODULE)
                  if (a !== i.REQUIRE) {
                    var l = this._modules2[a.id];
                    o[s] = l ? l.exports : null;
                  } else o[s] = this._createRequire(e.moduleIdResolver);
                else
                  o[s] = {
                    id: e.strId,
                    config: function() {
                      return t._config.getConfigForModule(e.strId);
                    },
                  };
              else o[s] = e.exports;
            }
            e.complete(n, this._config, o);
            var c = this._inverseDependencies2[e.id];
            if (((this._inverseDependencies2[e.id] = null), c))
              for (var s = 0, u = c.length; s < u; s++) {
                var f = c[s],
                  h = this._modules2[f];
                h.unresolvedDependenciesCount--,
                  0 === h.unresolvedDependenciesCount && this._onModuleComplete(h);
              }
            var d = this._inversePluginDependencies2.get(e.id);
            if (d) {
              this._inversePluginDependencies2.delete(e.id);
              for (var s = 0, u = d.length; s < u; s++) this._loadPluginDependency(e.exports, d[s]);
            }
          }
        }),
        s
      );
    })();
    e.ModuleManager = s;
  })(i || (i = {}));
  var r, i;
  !(function(e) {
    function t() {
      (o = function(e, t, n) {
        'string' != typeof e && ((n = t), (t = e), (e = null)),
          ('object' == typeof t && Array.isArray(t)) || ((n = t), (t = null)),
          t || (t = ['require', 'exports', 'module']),
          e ? i.defineModule(e, t, n, null, null) : i.enqueueDefineAnonymousModule(t, n);
      }).amd = { jQuery: !0 };
      var t = function(e, t) {
        void 0 === t && (t = !1), i.configure(e, t);
      };
      ((s = function() {
        if (1 === arguments.length) {
          if (arguments[0] instanceof Object && !Array.isArray(arguments[0]))
            return void t(arguments[0]);
          if ('string' == typeof arguments[0]) return i.synchronousRequire(arguments[0]);
        }
        if ((2 !== arguments.length && 3 !== arguments.length) || !Array.isArray(arguments[0]))
          throw new Error('Unrecognized require call');
        i.defineModule(
          e.Utilities.generateAnonymousModule(),
          arguments[0],
          arguments[1],
          arguments[2],
          null
        );
      }).config = t),
        (s.getConfig = function() {
          return i.getConfig().getOptionsLiteral();
        }),
        (s.reset = function() {
          i = i.reset();
        }),
        (s.getBuildInfo = function() {
          return i.getBuildInfo();
        }),
        (s.getStats = function() {
          return i.getLoaderEvents();
        });
    }
    function n() {
      t();
      var n = e.Environment.detect(),
        u = e.createScriptLoader(n);
      if (
        ((i = new e.ModuleManager(n, u, o, s, e.Utilities.getHighPerformanceTimestamp())), n.isNode)
      ) {
        var a = e.global.require || require,
          l = function(t) {
            i.getRecorder().record(e.LoaderEventType.NodeBeginNativeRequire, t);
            try {
              return a(t);
            } finally {
              i.getRecorder().record(e.LoaderEventType.NodeEndNativeRequire, t);
            }
          };
        (e.global.nodeRequire = l), (s.nodeRequire = l);
      }
      n.isNode && !n.isElectronRenderer
        ? ((module.exports = s),
          (r = function() {
            o.apply(null, arguments);
          }),
          (require = s))
        : (void 0 !== e.global.require &&
            'function' != typeof e.global.require &&
            s.config(e.global.require),
          n.isElectronRenderer
            ? (r = function() {
                o.apply(null, arguments);
              })
            : (e.global.define = r = o),
          (e.global.require = s),
          (e.global.require.__$__nodeRequire = l));
    }
    var i = null,
      o = null,
      s = null;
    (e.init = n),
      'undefined' != typeof doNotInitLoader ||
        ('function' == typeof e.global.define && e.global.define.amd) ||
        n();
  })(i || (i = {})),
    r(e[16], t([1, 0]), function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.DifferenceType = { Add: 0, Remove: 1, Change: 2 });
      var n = (function() {
        function e(e, t, n, r) {
          (this.originalStart = e),
            (this.originalLength = t),
            (this.modifiedStart = n),
            (this.modifiedLength = r);
        }
        return (
          (e.prototype.getChangeType = function() {
            return 0 === this.originalLength
              ? t.DifferenceType.Add
              : 0 === this.modifiedLength
              ? t.DifferenceType.Remove
              : t.DifferenceType.Change;
          }),
          (e.prototype.getOriginalEnd = function() {
            return this.originalStart + this.originalLength;
          }),
          (e.prototype.getModifiedEnd = function() {
            return this.modifiedStart + this.modifiedLength;
          }),
          e
        );
      })();
      t.DiffChange = n;
    }),
    r(e[12], t([1, 0, 16]), function(e, t, n) {
      'use strict';
      function r(e) {
        return {
          getLength: function() {
            return e.length;
          },
          getElementHash: function(t) {
            return e[t];
          },
        };
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.stringDiff = function(e, t, n) {
          return new a(r(e), r(t)).ComputeDiff(n);
        });
      var i = (function() {
        function e() {}
        return (
          (e.Assert = function(e, t) {
            if (!e) throw new Error(t);
          }),
          e
        );
      })();
      t.Debug = i;
      var o = (function() {
        function e() {}
        return (
          (e.Copy = function(e, t, n, r, i) {
            for (var o = 0; o < i; o++) n[r + o] = e[t + o];
          }),
          e
        );
      })();
      t.MyArray = o;
      var s = (function() {
          function e() {
            (this.m_changes = []),
              (this.m_originalStart = Number.MAX_VALUE),
              (this.m_modifiedStart = Number.MAX_VALUE),
              (this.m_originalCount = 0),
              (this.m_modifiedCount = 0);
          }
          return (
            (e.prototype.MarkNextChange = function() {
              (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
                this.m_changes.push(
                  new n.DiffChange(
                    this.m_originalStart,
                    this.m_originalCount,
                    this.m_modifiedStart,
                    this.m_modifiedCount
                  )
                ),
                (this.m_originalCount = 0),
                (this.m_modifiedCount = 0),
                (this.m_originalStart = Number.MAX_VALUE),
                (this.m_modifiedStart = Number.MAX_VALUE);
            }),
            (e.prototype.AddOriginalElement = function(e, t) {
              (this.m_originalStart = Math.min(this.m_originalStart, e)),
                (this.m_modifiedStart = Math.min(this.m_modifiedStart, t)),
                this.m_originalCount++;
            }),
            (e.prototype.AddModifiedElement = function(e, t) {
              (this.m_originalStart = Math.min(this.m_originalStart, e)),
                (this.m_modifiedStart = Math.min(this.m_modifiedStart, t)),
                this.m_modifiedCount++;
            }),
            (e.prototype.getChanges = function() {
              return (
                (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(),
                this.m_changes
              );
            }),
            (e.prototype.getReverseChanges = function() {
              return (
                (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(),
                this.m_changes.reverse(),
                this.m_changes
              );
            }),
            e
          );
        })(),
        u = Object.prototype.hasOwnProperty,
        a = (function() {
          function e(e, t, n) {
            void 0 === n && (n = null),
              (this.OriginalSequence = e),
              (this.ModifiedSequence = t),
              (this.ContinueProcessingPredicate = n),
              (this.m_originalIds = []),
              (this.m_modifiedIds = []),
              (this.m_forwardHistory = []),
              (this.m_reverseHistory = []),
              this.ComputeUniqueIdentifiers();
          }
          return (
            (e.prototype.ComputeUniqueIdentifiers = function() {
              var e = this.OriginalSequence.getLength(),
                t = this.ModifiedSequence.getLength();
              (this.m_originalIds = new Array(e)), (this.m_modifiedIds = new Array(t));
              var n,
                r = {},
                i = 1;
              for (n = 0; n < e; n++) {
                var o = this.OriginalSequence.getElementHash(n);
                u.call(r, o)
                  ? (this.m_originalIds[n] = r[o])
                  : ((this.m_originalIds[n] = i++), (r[o] = this.m_originalIds[n]));
              }
              for (n = 0; n < t; n++) {
                var s = this.ModifiedSequence.getElementHash(n);
                u.call(r, s)
                  ? (this.m_modifiedIds[n] = r[s])
                  : ((this.m_modifiedIds[n] = i++), (r[s] = this.m_modifiedIds[n]));
              }
            }),
            (e.prototype.ElementsAreEqual = function(e, t) {
              return this.m_originalIds[e] === this.m_modifiedIds[t];
            }),
            (e.prototype.OriginalElementsAreEqual = function(e, t) {
              return this.m_originalIds[e] === this.m_originalIds[t];
            }),
            (e.prototype.ModifiedElementsAreEqual = function(e, t) {
              return this.m_modifiedIds[e] === this.m_modifiedIds[t];
            }),
            (e.prototype.ComputeDiff = function(e) {
              return this._ComputeDiff(
                0,
                this.OriginalSequence.getLength() - 1,
                0,
                this.ModifiedSequence.getLength() - 1,
                e
              );
            }),
            (e.prototype._ComputeDiff = function(e, t, n, r, i) {
              var o = [!1],
                s = this.ComputeDiffRecursive(e, t, n, r, o);
              return i ? this.ShiftChanges(s) : s;
            }),
            (e.prototype.ComputeDiffRecursive = function(e, t, r, o, s) {
              for (s[0] = !1; e <= t && r <= o && this.ElementsAreEqual(e, r); ) e++, r++;
              for (; t >= e && o >= r && this.ElementsAreEqual(t, o); ) t--, o--;
              if (e > t || r > o) {
                var u = void 0;
                return (
                  r <= o
                    ? (i.Assert(
                        e === t + 1,
                        'originalStart should only be one more than originalEnd'
                      ),
                      (u = [new n.DiffChange(e, 0, r, o - r + 1)]))
                    : e <= t
                    ? (i.Assert(
                        r === o + 1,
                        'modifiedStart should only be one more than modifiedEnd'
                      ),
                      (u = [new n.DiffChange(e, t - e + 1, r, 0)]))
                    : (i.Assert(
                        e === t + 1,
                        'originalStart should only be one more than originalEnd'
                      ),
                      i.Assert(
                        r === o + 1,
                        'modifiedStart should only be one more than modifiedEnd'
                      ),
                      (u = [])),
                  u
                );
              }
              var a = [0],
                l = [0],
                c = this.ComputeRecursionPoint(e, t, r, o, a, l, s),
                f = a[0],
                h = l[0];
              if (null !== c) return c;
              if (!s[0]) {
                var d = this.ComputeDiffRecursive(e, f, r, h, s),
                  p = [];
                return (
                  (p = s[0]
                    ? [new n.DiffChange(f + 1, t - (f + 1) + 1, h + 1, o - (h + 1) + 1)]
                    : this.ComputeDiffRecursive(f + 1, t, h + 1, o, s)),
                  this.ConcatenateChanges(d, p)
                );
              }
              return [new n.DiffChange(e, t - e + 1, r, o - r + 1)];
            }),
            (e.prototype.WALKTRACE = function(
              e,
              t,
              r,
              i,
              o,
              u,
              a,
              l,
              c,
              f,
              h,
              d,
              p,
              m,
              _,
              g,
              v,
              y
            ) {
              var b,
                C = null,
                E = null,
                S = new s(),
                L = t,
                N = r,
                A = p[0] - g[0] - i,
                P = Number.MIN_VALUE,
                M = this.m_forwardHistory.length - 1;
              do {
                (b = A + e) === L || (b < N && c[b - 1] < c[b + 1])
                  ? ((m = (h = c[b + 1]) - A - i),
                    h < P && S.MarkNextChange(),
                    (P = h),
                    S.AddModifiedElement(h + 1, m),
                    (A = b + 1 - e))
                  : ((m = (h = c[b - 1] + 1) - A - i),
                    h < P && S.MarkNextChange(),
                    (P = h - 1),
                    S.AddOriginalElement(h, m + 1),
                    (A = b - 1 - e)),
                  M >= 0 && ((e = (c = this.m_forwardHistory[M])[0]), (L = 1), (N = c.length - 1));
              } while (--M >= -1);
              if (((C = S.getReverseChanges()), y[0])) {
                var w = p[0] + 1,
                  D = g[0] + 1;
                if (null !== C && C.length > 0) {
                  var I = C[C.length - 1];
                  (w = Math.max(w, I.getOriginalEnd())), (D = Math.max(D, I.getModifiedEnd()));
                }
                E = [new n.DiffChange(w, d - w + 1, D, _ - D + 1)];
              } else {
                (S = new s()),
                  (L = u),
                  (N = a),
                  (A = p[0] - g[0] - l),
                  (P = Number.MAX_VALUE),
                  (M = v ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2);
                do {
                  (b = A + o) === L || (b < N && f[b - 1] >= f[b + 1])
                    ? ((m = (h = f[b + 1] - 1) - A - l),
                      h > P && S.MarkNextChange(),
                      (P = h + 1),
                      S.AddOriginalElement(h + 1, m + 1),
                      (A = b + 1 - o))
                    : ((m = (h = f[b - 1]) - A - l),
                      h > P && S.MarkNextChange(),
                      (P = h),
                      S.AddModifiedElement(h + 1, m + 1),
                      (A = b - 1 - o)),
                    M >= 0 &&
                      ((o = (f = this.m_reverseHistory[M])[0]), (L = 1), (N = f.length - 1));
                } while (--M >= -1);
                E = S.getChanges();
              }
              return this.ConcatenateChanges(C, E);
            }),
            (e.prototype.ComputeRecursionPoint = function(e, t, r, i, s, u, a) {
              var l,
                c,
                f,
                h = 0,
                d = 0,
                p = 0,
                m = 0;
              e--,
                r--,
                (s[0] = 0),
                (u[0] = 0),
                (this.m_forwardHistory = []),
                (this.m_reverseHistory = []);
              var _ = t - e + (i - r),
                g = _ + 1,
                v = new Array(g),
                y = new Array(g),
                b = i - r,
                C = t - e,
                E = e - r,
                S = t - i,
                L = (C - b) % 2 == 0;
              (v[b] = e), (y[C] = t), (a[0] = !1);
              var N, A;
              for (f = 1; f <= _ / 2 + 1; f++) {
                var P = 0,
                  M = 0;
                for (
                  h = this.ClipDiagonalBound(b - f, f, b, g),
                    d = this.ClipDiagonalBound(b + f, f, b, g),
                    N = h;
                  N <= d;
                  N += 2
                ) {
                  for (
                    c =
                      (l = N === h || (N < d && v[N - 1] < v[N + 1]) ? v[N + 1] : v[N - 1] + 1) -
                      (N - b) -
                      E,
                      A = l;
                    l < t && c < i && this.ElementsAreEqual(l + 1, c + 1);

                  )
                    l++, c++;
                  if (
                    ((v[N] = l),
                    l + c > P + M && ((P = l), (M = c)),
                    !L && Math.abs(N - C) <= f - 1 && l >= y[N])
                  )
                    return (
                      (s[0] = l),
                      (u[0] = c),
                      A <= y[N] && f <= 1448
                        ? this.WALKTRACE(b, h, d, E, C, p, m, S, v, y, l, t, s, c, i, u, L, a)
                        : null
                    );
                }
                var w = (P - e + (M - r) - f) / 2;
                if (
                  null !== this.ContinueProcessingPredicate &&
                  !this.ContinueProcessingPredicate(P, this.OriginalSequence, w)
                )
                  return (
                    (a[0] = !0),
                    (s[0] = P),
                    (u[0] = M),
                    w > 0 && f <= 1448
                      ? this.WALKTRACE(b, h, d, E, C, p, m, S, v, y, l, t, s, c, i, u, L, a)
                      : (e++, r++, [new n.DiffChange(e, t - e + 1, r, i - r + 1)])
                  );
                for (
                  p = this.ClipDiagonalBound(C - f, f, C, g),
                    m = this.ClipDiagonalBound(C + f, f, C, g),
                    N = p;
                  N <= m;
                  N += 2
                ) {
                  for (
                    c =
                      (l = N === p || (N < m && y[N - 1] >= y[N + 1]) ? y[N + 1] - 1 : y[N - 1]) -
                      (N - C) -
                      S,
                      A = l;
                    l > e && c > r && this.ElementsAreEqual(l, c);

                  )
                    l--, c--;
                  if (((y[N] = l), L && Math.abs(N - b) <= f && l <= v[N]))
                    return (
                      (s[0] = l),
                      (u[0] = c),
                      A >= v[N] && f <= 1448
                        ? this.WALKTRACE(b, h, d, E, C, p, m, S, v, y, l, t, s, c, i, u, L, a)
                        : null
                    );
                }
                if (f <= 1447) {
                  var D = new Array(d - h + 2);
                  (D[0] = b - h + 1),
                    o.Copy(v, h, D, 1, d - h + 1),
                    this.m_forwardHistory.push(D),
                    ((D = new Array(m - p + 2))[0] = C - p + 1),
                    o.Copy(y, p, D, 1, m - p + 1),
                    this.m_reverseHistory.push(D);
                }
              }
              return this.WALKTRACE(b, h, d, E, C, p, m, S, v, y, l, t, s, c, i, u, L, a);
            }),
            (e.prototype.ShiftChanges = function(e) {
              var t;
              do {
                t = !1;
                for (l = 0; l < e.length; l++)
                  for (
                    var n = e[l],
                      r =
                        l < e.length - 1
                          ? e[l + 1].originalStart
                          : this.OriginalSequence.getLength(),
                      i =
                        l < e.length - 1
                          ? e[l + 1].modifiedStart
                          : this.ModifiedSequence.getLength(),
                      o = n.originalLength > 0,
                      s = n.modifiedLength > 0;
                    n.originalStart + n.originalLength < r &&
                    n.modifiedStart + n.modifiedLength < i &&
                    (!o ||
                      this.OriginalElementsAreEqual(
                        n.originalStart,
                        n.originalStart + n.originalLength
                      )) &&
                    (!s ||
                      this.ModifiedElementsAreEqual(
                        n.modifiedStart,
                        n.modifiedStart + n.modifiedLength
                      ));

                  )
                    n.originalStart++, n.modifiedStart++;
                for (var u = new Array(), a = [null], l = 0; l < e.length; l++)
                  l < e.length - 1 && this.ChangesOverlap(e[l], e[l + 1], a)
                    ? ((t = !0), u.push(a[0]), l++)
                    : u.push(e[l]);
                e = u;
              } while (t);
              for (l = e.length - 1; l >= 0; l--) {
                var n = e[l],
                  r = 0,
                  i = 0;
                if (l > 0) {
                  var c = e[l - 1];
                  c.originalLength > 0 && (r = c.originalStart + c.originalLength),
                    c.modifiedLength > 0 && (i = c.modifiedStart + c.modifiedLength);
                }
                for (
                  var o = n.originalLength > 0,
                    s = n.modifiedLength > 0,
                    f = 0,
                    h = this._boundaryScore(
                      n.originalStart,
                      n.originalLength,
                      n.modifiedStart,
                      n.modifiedLength
                    ),
                    d = 1;
                  ;
                  d++
                ) {
                  var p = n.originalStart - d,
                    m = n.modifiedStart - d;
                  if (p < r || m < m) break;
                  if (o && !this.OriginalElementsAreEqual(p, p + n.originalLength)) break;
                  if (s && !this.ModifiedElementsAreEqual(m, m + n.modifiedLength)) break;
                  var _ = this._boundaryScore(p, n.originalLength, m, n.modifiedLength);
                  _ > h && ((h = _), (f = d));
                }
                (n.originalStart -= f), (n.modifiedStart -= f);
              }
              return e;
            }),
            (e.prototype._OriginalIsBoundary = function(e) {
              return (
                e <= 0 ||
                e >= this.OriginalSequence.getLength() - 1 ||
                /^\s*$/.test(this.OriginalSequence.getElementHash(e))
              );
            }),
            (e.prototype._OriginalRegionIsBoundary = function(e, t) {
              if (this._OriginalIsBoundary(e) || this._OriginalIsBoundary(e - 1)) return !0;
              if (t > 0) {
                var n = e + t;
                if (this._OriginalIsBoundary(n - 1) || this._OriginalIsBoundary(n)) return !0;
              }
              return !1;
            }),
            (e.prototype._ModifiedIsBoundary = function(e) {
              return (
                e <= 0 ||
                e >= this.ModifiedSequence.getLength() - 1 ||
                /^\s*$/.test(this.ModifiedSequence.getElementHash(e))
              );
            }),
            (e.prototype._ModifiedRegionIsBoundary = function(e, t) {
              if (this._ModifiedIsBoundary(e) || this._ModifiedIsBoundary(e - 1)) return !0;
              if (t > 0) {
                var n = e + t;
                if (this._ModifiedIsBoundary(n - 1) || this._ModifiedIsBoundary(n)) return !0;
              }
              return !1;
            }),
            (e.prototype._boundaryScore = function(e, t, n, r) {
              return (
                (this._OriginalRegionIsBoundary(e, t) ? 1 : 0) +
                (this._ModifiedRegionIsBoundary(n, r) ? 1 : 0)
              );
            }),
            (e.prototype.ConcatenateChanges = function(e, t) {
              var n = [],
                r = null;
              return 0 === e.length || 0 === t.length
                ? t.length > 0
                  ? t
                  : e
                : this.ChangesOverlap(e[e.length - 1], t[0], n)
                ? ((r = new Array(e.length + t.length - 1)),
                  o.Copy(e, 0, r, 0, e.length - 1),
                  (r[e.length - 1] = n[0]),
                  o.Copy(t, 1, r, e.length, t.length - 1),
                  r)
                : ((r = new Array(e.length + t.length)),
                  o.Copy(e, 0, r, 0, e.length),
                  o.Copy(t, 0, r, e.length, t.length),
                  r);
            }),
            (e.prototype.ChangesOverlap = function(e, t, r) {
              if (
                (i.Assert(
                  e.originalStart <= t.originalStart,
                  'Left change is not less than or equal to right change'
                ),
                i.Assert(
                  e.modifiedStart <= t.modifiedStart,
                  'Left change is not less than or equal to right change'
                ),
                e.originalStart + e.originalLength >= t.originalStart ||
                  e.modifiedStart + e.modifiedLength >= t.modifiedStart)
              ) {
                var o = e.originalStart,
                  s = e.originalLength,
                  u = e.modifiedStart,
                  a = e.modifiedLength;
                return (
                  e.originalStart + e.originalLength >= t.originalStart &&
                    (s = t.originalStart + t.originalLength - e.originalStart),
                  e.modifiedStart + e.modifiedLength >= t.modifiedStart &&
                    (a = t.modifiedStart + t.modifiedLength - e.modifiedStart),
                  (r[0] = new n.DiffChange(o, s, u, a)),
                  !0
                );
              }
              return (r[0] = null), !1;
            }),
            (e.prototype.ClipDiagonalBound = function(e, t, n, r) {
              if (e >= 0 && e < r) return e;
              var i = n,
                o = r - n - 1,
                s = t % 2 == 0;
              return e < 0 ? (s === (i % 2 == 0) ? 0 : 1) : s === (o % 2 == 0) ? r - 1 : r - 2;
            }),
            e
          );
        })();
      t.LcsDiff = a;
    }),
    r(e[11], t([1, 0]), function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.not = function(e) {
          return function() {
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
            return !e.apply(void 0, t);
          };
        }),
        (t.once = function(e) {
          var t,
            n = this,
            r = !1;
          return function() {
            return r ? t : ((r = !0), (t = e.apply(n, arguments)));
          };
        });
    }),
    r(e[21], t([1, 0]), function(e, t) {
      'use strict';
      function n(e, t) {
        var n = !!(2048 & e),
          r = !!(256 & e);
        return new a(2 === t ? r : n, !!(1024 & e), !!(512 & e), 2 === t ? n : r, 255 & e);
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      !(function(e) {
        (e[(e.Unknown = 0)] = 'Unknown'),
          (e[(e.Backspace = 1)] = 'Backspace'),
          (e[(e.Tab = 2)] = 'Tab'),
          (e[(e.Enter = 3)] = 'Enter'),
          (e[(e.Shift = 4)] = 'Shift'),
          (e[(e.Ctrl = 5)] = 'Ctrl'),
          (e[(e.Alt = 6)] = 'Alt'),
          (e[(e.PauseBreak = 7)] = 'PauseBreak'),
          (e[(e.CapsLock = 8)] = 'CapsLock'),
          (e[(e.Escape = 9)] = 'Escape'),
          (e[(e.Space = 10)] = 'Space'),
          (e[(e.PageUp = 11)] = 'PageUp'),
          (e[(e.PageDown = 12)] = 'PageDown'),
          (e[(e.End = 13)] = 'End'),
          (e[(e.Home = 14)] = 'Home'),
          (e[(e.LeftArrow = 15)] = 'LeftArrow'),
          (e[(e.UpArrow = 16)] = 'UpArrow'),
          (e[(e.RightArrow = 17)] = 'RightArrow'),
          (e[(e.DownArrow = 18)] = 'DownArrow'),
          (e[(e.Insert = 19)] = 'Insert'),
          (e[(e.Delete = 20)] = 'Delete'),
          (e[(e.KEY_0 = 21)] = 'KEY_0'),
          (e[(e.KEY_1 = 22)] = 'KEY_1'),
          (e[(e.KEY_2 = 23)] = 'KEY_2'),
          (e[(e.KEY_3 = 24)] = 'KEY_3'),
          (e[(e.KEY_4 = 25)] = 'KEY_4'),
          (e[(e.KEY_5 = 26)] = 'KEY_5'),
          (e[(e.KEY_6 = 27)] = 'KEY_6'),
          (e[(e.KEY_7 = 28)] = 'KEY_7'),
          (e[(e.KEY_8 = 29)] = 'KEY_8'),
          (e[(e.KEY_9 = 30)] = 'KEY_9'),
          (e[(e.KEY_A = 31)] = 'KEY_A'),
          (e[(e.KEY_B = 32)] = 'KEY_B'),
          (e[(e.KEY_C = 33)] = 'KEY_C'),
          (e[(e.KEY_D = 34)] = 'KEY_D'),
          (e[(e.KEY_E = 35)] = 'KEY_E'),
          (e[(e.KEY_F = 36)] = 'KEY_F'),
          (e[(e.KEY_G = 37)] = 'KEY_G'),
          (e[(e.KEY_H = 38)] = 'KEY_H'),
          (e[(e.KEY_I = 39)] = 'KEY_I'),
          (e[(e.KEY_J = 40)] = 'KEY_J'),
          (e[(e.KEY_K = 41)] = 'KEY_K'),
          (e[(e.KEY_L = 42)] = 'KEY_L'),
          (e[(e.KEY_M = 43)] = 'KEY_M'),
          (e[(e.KEY_N = 44)] = 'KEY_N'),
          (e[(e.KEY_O = 45)] = 'KEY_O'),
          (e[(e.KEY_P = 46)] = 'KEY_P'),
          (e[(e.KEY_Q = 47)] = 'KEY_Q'),
          (e[(e.KEY_R = 48)] = 'KEY_R'),
          (e[(e.KEY_S = 49)] = 'KEY_S'),
          (e[(e.KEY_T = 50)] = 'KEY_T'),
          (e[(e.KEY_U = 51)] = 'KEY_U'),
          (e[(e.KEY_V = 52)] = 'KEY_V'),
          (e[(e.KEY_W = 53)] = 'KEY_W'),
          (e[(e.KEY_X = 54)] = 'KEY_X'),
          (e[(e.KEY_Y = 55)] = 'KEY_Y'),
          (e[(e.KEY_Z = 56)] = 'KEY_Z'),
          (e[(e.Meta = 57)] = 'Meta'),
          (e[(e.ContextMenu = 58)] = 'ContextMenu'),
          (e[(e.F1 = 59)] = 'F1'),
          (e[(e.F2 = 60)] = 'F2'),
          (e[(e.F3 = 61)] = 'F3'),
          (e[(e.F4 = 62)] = 'F4'),
          (e[(e.F5 = 63)] = 'F5'),
          (e[(e.F6 = 64)] = 'F6'),
          (e[(e.F7 = 65)] = 'F7'),
          (e[(e.F8 = 66)] = 'F8'),
          (e[(e.F9 = 67)] = 'F9'),
          (e[(e.F10 = 68)] = 'F10'),
          (e[(e.F11 = 69)] = 'F11'),
          (e[(e.F12 = 70)] = 'F12'),
          (e[(e.F13 = 71)] = 'F13'),
          (e[(e.F14 = 72)] = 'F14'),
          (e[(e.F15 = 73)] = 'F15'),
          (e[(e.F16 = 74)] = 'F16'),
          (e[(e.F17 = 75)] = 'F17'),
          (e[(e.F18 = 76)] = 'F18'),
          (e[(e.F19 = 77)] = 'F19'),
          (e[(e.NumLock = 78)] = 'NumLock'),
          (e[(e.ScrollLock = 79)] = 'ScrollLock'),
          (e[(e.US_SEMICOLON = 80)] = 'US_SEMICOLON'),
          (e[(e.US_EQUAL = 81)] = 'US_EQUAL'),
          (e[(e.US_COMMA = 82)] = 'US_COMMA'),
          (e[(e.US_MINUS = 83)] = 'US_MINUS'),
          (e[(e.US_DOT = 84)] = 'US_DOT'),
          (e[(e.US_SLASH = 85)] = 'US_SLASH'),
          (e[(e.US_BACKTICK = 86)] = 'US_BACKTICK'),
          (e[(e.US_OPEN_SQUARE_BRACKET = 87)] = 'US_OPEN_SQUARE_BRACKET'),
          (e[(e.US_BACKSLASH = 88)] = 'US_BACKSLASH'),
          (e[(e.US_CLOSE_SQUARE_BRACKET = 89)] = 'US_CLOSE_SQUARE_BRACKET'),
          (e[(e.US_QUOTE = 90)] = 'US_QUOTE'),
          (e[(e.OEM_8 = 91)] = 'OEM_8'),
          (e[(e.OEM_102 = 92)] = 'OEM_102'),
          (e[(e.NUMPAD_0 = 93)] = 'NUMPAD_0'),
          (e[(e.NUMPAD_1 = 94)] = 'NUMPAD_1'),
          (e[(e.NUMPAD_2 = 95)] = 'NUMPAD_2'),
          (e[(e.NUMPAD_3 = 96)] = 'NUMPAD_3'),
          (e[(e.NUMPAD_4 = 97)] = 'NUMPAD_4'),
          (e[(e.NUMPAD_5 = 98)] = 'NUMPAD_5'),
          (e[(e.NUMPAD_6 = 99)] = 'NUMPAD_6'),
          (e[(e.NUMPAD_7 = 100)] = 'NUMPAD_7'),
          (e[(e.NUMPAD_8 = 101)] = 'NUMPAD_8'),
          (e[(e.NUMPAD_9 = 102)] = 'NUMPAD_9'),
          (e[(e.NUMPAD_MULTIPLY = 103)] = 'NUMPAD_MULTIPLY'),
          (e[(e.NUMPAD_ADD = 104)] = 'NUMPAD_ADD'),
          (e[(e.NUMPAD_SEPARATOR = 105)] = 'NUMPAD_SEPARATOR'),
          (e[(e.NUMPAD_SUBTRACT = 106)] = 'NUMPAD_SUBTRACT'),
          (e[(e.NUMPAD_DECIMAL = 107)] = 'NUMPAD_DECIMAL'),
          (e[(e.NUMPAD_DIVIDE = 108)] = 'NUMPAD_DIVIDE'),
          (e[(e.KEY_IN_COMPOSITION = 109)] = 'KEY_IN_COMPOSITION'),
          (e[(e.ABNT_C1 = 110)] = 'ABNT_C1'),
          (e[(e.ABNT_C2 = 111)] = 'ABNT_C2'),
          (e[(e.MAX_VALUE = 112)] = 'MAX_VALUE');
      })(t.KeyCode || (t.KeyCode = {}));
      var r = (function() {
          function e() {
            (this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null));
          }
          return (
            (e.prototype.define = function(e, t) {
              (this._keyCodeToStr[e] = t), (this._strToKeyCode[t.toLowerCase()] = e);
            }),
            (e.prototype.keyCodeToStr = function(e) {
              return this._keyCodeToStr[e];
            }),
            (e.prototype.strToKeyCode = function(e) {
              return this._strToKeyCode[e.toLowerCase()] || 0;
            }),
            e
          );
        })(),
        i = new r(),
        o = new r(),
        s = new r();
      !(function() {
        function e(e, t, n, r) {
          void 0 === n && (n = t),
            void 0 === r && (r = n),
            i.define(e, t),
            o.define(e, n),
            s.define(e, r);
        }
        e(0, 'unknown'),
          e(1, 'Backspace'),
          e(2, 'Tab'),
          e(3, 'Enter'),
          e(4, 'Shift'),
          e(5, 'Ctrl'),
          e(6, 'Alt'),
          e(7, 'PauseBreak'),
          e(8, 'CapsLock'),
          e(9, 'Escape'),
          e(10, 'Space'),
          e(11, 'PageUp'),
          e(12, 'PageDown'),
          e(13, 'End'),
          e(14, 'Home'),
          e(15, 'LeftArrow', 'Left'),
          e(16, 'UpArrow', 'Up'),
          e(17, 'RightArrow', 'Right'),
          e(18, 'DownArrow', 'Down'),
          e(19, 'Insert'),
          e(20, 'Delete'),
          e(21, '0'),
          e(22, '1'),
          e(23, '2'),
          e(24, '3'),
          e(25, '4'),
          e(26, '5'),
          e(27, '6'),
          e(28, '7'),
          e(29, '8'),
          e(30, '9'),
          e(31, 'A'),
          e(32, 'B'),
          e(33, 'C'),
          e(34, 'D'),
          e(35, 'E'),
          e(36, 'F'),
          e(37, 'G'),
          e(38, 'H'),
          e(39, 'I'),
          e(40, 'J'),
          e(41, 'K'),
          e(42, 'L'),
          e(43, 'M'),
          e(44, 'N'),
          e(45, 'O'),
          e(46, 'P'),
          e(47, 'Q'),
          e(48, 'R'),
          e(49, 'S'),
          e(50, 'T'),
          e(51, 'U'),
          e(52, 'V'),
          e(53, 'W'),
          e(54, 'X'),
          e(55, 'Y'),
          e(56, 'Z'),
          e(57, 'Meta'),
          e(58, 'ContextMenu'),
          e(59, 'F1'),
          e(60, 'F2'),
          e(61, 'F3'),
          e(62, 'F4'),
          e(63, 'F5'),
          e(64, 'F6'),
          e(65, 'F7'),
          e(66, 'F8'),
          e(67, 'F9'),
          e(68, 'F10'),
          e(69, 'F11'),
          e(70, 'F12'),
          e(71, 'F13'),
          e(72, 'F14'),
          e(73, 'F15'),
          e(74, 'F16'),
          e(75, 'F17'),
          e(76, 'F18'),
          e(77, 'F19'),
          e(78, 'NumLock'),
          e(79, 'ScrollLock'),
          e(80, ';', ';', 'OEM_1'),
          e(81, '=', '=', 'OEM_PLUS'),
          e(82, ',', ',', 'OEM_COMMA'),
          e(83, '-', '-', 'OEM_MINUS'),
          e(84, '.', '.', 'OEM_PERIOD'),
          e(85, '/', '/', 'OEM_2'),
          e(86, '`', '`', 'OEM_3'),
          e(110, 'ABNT_C1'),
          e(111, 'ABNT_C2'),
          e(87, '[', '[', 'OEM_4'),
          e(88, '\\', '\\', 'OEM_5'),
          e(89, ']', ']', 'OEM_6'),
          e(90, "'", "'", 'OEM_7'),
          e(91, 'OEM_8'),
          e(92, 'OEM_102'),
          e(93, 'NumPad0'),
          e(94, 'NumPad1'),
          e(95, 'NumPad2'),
          e(96, 'NumPad3'),
          e(97, 'NumPad4'),
          e(98, 'NumPad5'),
          e(99, 'NumPad6'),
          e(100, 'NumPad7'),
          e(101, 'NumPad8'),
          e(102, 'NumPad9'),
          e(103, 'NumPad_Multiply'),
          e(104, 'NumPad_Add'),
          e(105, 'NumPad_Separator'),
          e(106, 'NumPad_Subtract'),
          e(107, 'NumPad_Decimal'),
          e(108, 'NumPad_Divide');
      })();
      !(function(e) {
        (e.toString = function(e) {
          return i.keyCodeToStr(e);
        }),
          (e.fromString = function(e) {
            return i.strToKeyCode(e);
          }),
          (e.toUserSettingsUS = function(e) {
            return o.keyCodeToStr(e);
          }),
          (e.toUserSettingsGeneral = function(e) {
            return s.keyCodeToStr(e);
          }),
          (e.fromUserSettings = function(e) {
            return o.strToKeyCode(e) || s.strToKeyCode(e);
          });
      })(t.KeyCodeUtils || (t.KeyCodeUtils = {}));
      var u;
      !(function(e) {
        (e[(e.CtrlCmd = 2048)] = 'CtrlCmd'),
          (e[(e.Shift = 1024)] = 'Shift'),
          (e[(e.Alt = 512)] = 'Alt'),
          (e[(e.WinCtrl = 256)] = 'WinCtrl'),
          (e[(e.KeyCode = 255)] = 'KeyCode');
      })(u || (u = {}));
      !(function(e) {
        (e[(e.CtrlCmd = 2048)] = 'CtrlCmd'),
          (e[(e.Shift = 1024)] = 'Shift'),
          (e[(e.Alt = 512)] = 'Alt'),
          (e[(e.WinCtrl = 256)] = 'WinCtrl');
      })(t.KeyMod || (t.KeyMod = {})),
        (t.KeyChord = function(e, t) {
          return (e | (((65535 & t) << 16) >>> 0)) >>> 0;
        }),
        (t.createKeybinding = function(e, t) {
          if (0 === e) return null;
          var r = (65535 & e) >>> 0,
            i = (4294901760 & e) >>> 16;
          return 0 !== i ? new l(n(r, t), n(i, t)) : n(r, t);
        }),
        (t.createSimpleKeybinding = n);
      !(function(e) {
        (e[(e.Simple = 1)] = 'Simple'), (e[(e.Chord = 2)] = 'Chord');
      })(t.KeybindingType || (t.KeybindingType = {}));
      var a = (function() {
        function e(e, t, n, r, i) {
          (this.type = 1),
            (this.ctrlKey = e),
            (this.shiftKey = t),
            (this.altKey = n),
            (this.metaKey = r),
            (this.keyCode = i);
        }
        return (
          (e.prototype.equals = function(e) {
            return (
              1 === e.type &&
              (this.ctrlKey === e.ctrlKey &&
                this.shiftKey === e.shiftKey &&
                this.altKey === e.altKey &&
                this.metaKey === e.metaKey &&
                this.keyCode === e.keyCode)
            );
          }),
          (e.prototype.isModifierKey = function() {
            return (
              0 === this.keyCode ||
              5 === this.keyCode ||
              57 === this.keyCode ||
              6 === this.keyCode ||
              4 === this.keyCode
            );
          }),
          (e.prototype.isDuplicateModifierCase = function() {
            return (
              (this.ctrlKey && 5 === this.keyCode) ||
              (this.shiftKey && 4 === this.keyCode) ||
              (this.altKey && 6 === this.keyCode) ||
              (this.metaKey && 57 === this.keyCode)
            );
          }),
          e
        );
      })();
      t.SimpleKeybinding = a;
      var l = (function() {
        return function(e, t) {
          (this.type = 2), (this.firstPart = e), (this.chordPart = t);
        };
      })();
      t.ChordKeybinding = l;
      var c = (function() {
        return function(e, t, n, r, i, o) {
          (this.ctrlKey = e),
            (this.shiftKey = t),
            (this.altKey = n),
            (this.metaKey = r),
            (this.keyLabel = i),
            (this.keyAriaLabel = o);
        };
      })();
      t.ResolvedKeybindingPart = c;
      var f = (function() {
        return function() {};
      })();
      t.ResolvedKeybinding = f;
    }),
    r(e[10], t([1, 0, 11]), function(e, t, n) {
      'use strict';
      function r(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        return Array.isArray(e)
          ? (e.forEach(function(e) {
              return e && e.dispose();
            }),
            [])
          : 0 !== t.length
          ? (r(e), r(t), [])
          : e
          ? (e.dispose(), e)
          : void 0;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.empty = Object.freeze({ dispose: function() {} })),
        (t.dispose = r),
        (t.combinedDisposable = function(e) {
          return {
            dispose: function() {
              return r(e);
            },
          };
        }),
        (t.toDisposable = function() {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          return {
            dispose: function() {
              for (var t = 0, n = e; t < n.length; t++) (0, n[t])();
            },
          };
        });
      var i = (function() {
        function e() {
          this._toDispose = [];
        }
        return (
          (e.prototype.dispose = function() {
            this._toDispose = r(this._toDispose);
          }),
          (e.prototype._register = function(e) {
            return this._toDispose.push(e), e;
          }),
          e
        );
      })();
      t.Disposable = i;
      var o = (function() {
        function e() {}
        return (
          Object.defineProperty(e.prototype, 'value', {
            set: function(e) {
              this._value && this._value.dispose(), (this._value = e);
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.dispose = function() {
            this.value = null;
          }),
          e
        );
      })();
      t.OneDisposable = o;
      var s = (function() {
        function e() {
          this.references = Object.create(null);
        }
        return (
          (e.prototype.acquire = function(e) {
            var t = this,
              r = this.references[e];
            r || (r = this.references[e] = { counter: 0, object: this.createReferencedObject(e) });
            var i = r.object,
              o = n.once(function() {
                0 == --r.counter && (t.destroyReferencedObject(r.object), delete t.references[e]);
              });
            return r.counter++, { object: i, dispose: o };
          }),
          e
        );
      })();
      t.ReferenceCollection = s;
      var u = (function() {
        function e(e) {
          this.object = e;
        }
        return (e.prototype.dispose = function() {}), e;
      })();
      t.ImmortalReference = u;
    }),
    r(e[4], t([1, 0]), function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = !1,
        r = !1,
        i = !1,
        o = !1,
        s = !1,
        u = !1,
        a = void 0,
        l = void 0;
      if (((t.LANGUAGE_DEFAULT = 'en'), 'object' == typeof process)) {
        (n = 'win32' === process.platform),
          (r = 'darwin' === process.platform),
          (i = 'linux' === process.platform),
          (o = !n && 0 === process.getuid());
        var c = process.env.VSCODE_NLS_CONFIG;
        if (c)
          try {
            var f = JSON.parse(c),
              h = f.availableLanguages['*'];
            (a = f.locale), (l = h || t.LANGUAGE_DEFAULT);
          } catch (e) {}
        s = !0;
      } else if ('object' == typeof navigator) {
        var d = navigator.userAgent;
        (n = d.indexOf('Windows') >= 0),
          (r = d.indexOf('Macintosh') >= 0),
          (i = d.indexOf('Linux') >= 0),
          (u = !0),
          (l = a = navigator.language);
      }
      var p;
      !(function(e) {
        (e[(e.Web = 0)] = 'Web'),
          (e[(e.Mac = 1)] = 'Mac'),
          (e[(e.Linux = 2)] = 'Linux'),
          (e[(e.Windows = 3)] = 'Windows');
      })((p = t.Platform || (t.Platform = {})));
      var m = p.Web;
      s && (r ? (m = p.Mac) : n ? (m = p.Windows) : i && (m = p.Linux)),
        (t.isWindows = n),
        (t.isMacintosh = r),
        (t.isLinux = i),
        (t.isRootUser = o),
        (t.isNative = s),
        (t.isWeb = u),
        (t.platform = m),
        (t.language = l),
        (t.locale = a);
      var _ = 'object' == typeof self ? self : global;
      (t.globals = _),
        (t.hasWebWorkerSupport = function() {
          return void 0 !== _.Worker;
        }),
        (t.setTimeout = _.setTimeout.bind(_)),
        (t.clearTimeout = _.clearTimeout.bind(_)),
        (t.setInterval = _.setInterval.bind(_)),
        (t.clearInterval = _.clearInterval.bind(_));
      !(function(e) {
        (e[(e.Windows = 1)] = 'Windows'),
          (e[(e.Macintosh = 2)] = 'Macintosh'),
          (e[(e.Linux = 3)] = 'Linux');
      })(t.OperatingSystem || (t.OperatingSystem = {})),
        (t.OS = r ? 2 : n ? 1 : 3);
      !(function(e) {
        (e[(e.Unknown = 0)] = 'Unknown'),
          (e[(e.Disabled = 1)] = 'Disabled'),
          (e[(e.Enabled = 2)] = 'Enabled');
      })(t.AccessibilitySupport || (t.AccessibilitySupport = {}));
    }),
    r(e[14], t([1, 0]), function(e, t) {
      'use strict';
      function n(e) {
        return Array.isArray
          ? Array.isArray(e)
          : !(!e || typeof e.length !== a.number || e.constructor !== Array);
      }
      function r(e) {
        return typeof e === a.string || e instanceof String;
      }
      function i(e) {
        return !(
          typeof e !== a.object ||
          null === e ||
          Array.isArray(e) ||
          e instanceof RegExp ||
          e instanceof Date
        );
      }
      function o(e) {
        return typeof e === a.undefined;
      }
      function s(e) {
        return typeof e === a.function;
      }
      function u(e, t) {
        if (r(t)) {
          if (typeof e !== t) throw new Error('argument does not match constraint: typeof ' + t);
        } else if (s(t)) {
          if (e instanceof t) return;
          if (e && e.constructor === t) return;
          if (1 === t.length && !0 === t.call(void 0, e)) return;
          throw new Error(
            'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true'
          );
        }
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var a = {
        number: 'number',
        string: 'string',
        undefined: 'undefined',
        object: 'object',
        function: 'function',
      };
      (t.isArray = n),
        (t.isString = r),
        (t.isStringArray = function(e) {
          return (
            n(e) &&
            e.every(function(e) {
              return r(e);
            })
          );
        }),
        (t.isObject = i),
        (t.isNumber = function(e) {
          return (typeof e === a.number || e instanceof Number) && !isNaN(e);
        }),
        (t.isBoolean = function(e) {
          return !0 === e || !1 === e;
        }),
        (t.isUndefined = o),
        (t.isUndefinedOrNull = function(e) {
          return o(e) || null === e;
        });
      var l = Object.prototype.hasOwnProperty;
      (t.isEmptyObject = function(e) {
        if (!i(e)) return !1;
        for (var t in e) if (l.call(e, t)) return !1;
        return !0;
      }),
        (t.isFunction = s),
        (t.areFunctions = function() {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          return e && e.length > 0 && e.every(s);
        }),
        (t.validateConstraints = function(e, t) {
          for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) u(e[r], t[r]);
        }),
        (t.validateConstraint = u),
        (t.create = function(e) {
          for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
          var r = Object.create(e.prototype);
          return e.apply(r, t), r;
        });
    }),
    r(e[6], t([1, 0, 4]), function(e, t, n) {
      'use strict';
      function r(e) {
        return (
          '%' +
          e
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()
        );
      }
      function i(e) {
        return encodeURIComponent(e).replace(/[!'()*]/g, r);
      }
      function o(e) {
        return e.replace(/[#?]/, r);
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var s = (function() {
        function e(t, n, r, i, o) {
          (this._formatted = null),
            (this._fsPath = null),
            (this.scheme = t || e._empty),
            (this.authority = n || e._empty),
            (this.path = r || e._empty),
            (this.query = i || e._empty),
            (this.fragment = o || e._empty),
            this._validate(this);
        }
        return (
          (e.isUri = function(t) {
            return (
              t instanceof e ||
              (!!t &&
                ('string' == typeof t.authority &&
                  'string' == typeof t.fragment &&
                  'string' == typeof t.path &&
                  'string' == typeof t.query &&
                  'string' == typeof t.scheme))
            );
          }),
          Object.defineProperty(e.prototype, 'fsPath', {
            get: function() {
              if (!this._fsPath) {
                var t = void 0;
                (t =
                  this.authority && this.path && 'file' === this.scheme
                    ? '//' + this.authority + this.path
                    : e._driveLetterPath.test(this.path)
                    ? this.path[1].toLowerCase() + this.path.substr(2)
                    : this.path),
                  n.isWindows && (t = t.replace(/\//g, '\\')),
                  (this._fsPath = t);
              }
              return this._fsPath;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.with = function(t) {
            if (!t) return this;
            var n = t.scheme,
              r = t.authority,
              i = t.path,
              o = t.query,
              s = t.fragment;
            return (
              void 0 === n ? (n = this.scheme) : null === n && (n = ''),
              void 0 === r ? (r = this.authority) : null === r && (r = ''),
              void 0 === i ? (i = this.path) : null === i && (i = ''),
              void 0 === o ? (o = this.query) : null === o && (o = ''),
              void 0 === s ? (s = this.fragment) : null === s && (s = ''),
              n === this.scheme &&
              r === this.authority &&
              i === this.path &&
              o === this.query &&
              s === this.fragment
                ? this
                : new e(n, r, i, o, s)
            );
          }),
          (e.parse = function(t) {
            var n = e._regexp.exec(t);
            return n
              ? new e(
                  n[2] || e._empty,
                  decodeURIComponent(n[4] || e._empty),
                  decodeURIComponent(n[5] || e._empty),
                  decodeURIComponent(n[7] || e._empty),
                  decodeURIComponent(n[9] || e._empty)
                )
              : new e(e._empty, e._empty, e._empty, e._empty, e._empty);
          }),
          (e.file = function(t) {
            var r = e._empty;
            if (
              (n.isWindows && (t = t.replace(/\\/g, e._slash)), t[0] === e._slash && t[0] === t[1])
            ) {
              var i = t.indexOf(e._slash, 2);
              -1 === i
                ? ((r = t.substring(2)), (t = e._empty))
                : ((r = t.substring(2, i)), (t = t.substring(i)));
            }
            return t[0] !== e._slash && (t = e._slash + t), new e('file', r, t, e._empty, e._empty);
          }),
          (e.from = function(t) {
            return new e(t.scheme, t.authority, t.path, t.query, t.fragment);
          }),
          (e.prototype._validate = function(t) {
            if (t.scheme && !e._schemePattern.test(t.scheme))
              throw new Error('[UriError]: Scheme contains illegal characters.');
            if (t.path)
              if (t.authority) {
                if (!e._singleSlashStart.test(t.path))
                  throw new Error(
                    '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
                  );
              } else if (e._doubleSlashStart.test(t.path))
                throw new Error(
                  '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
                );
          }),
          (e.prototype.toString = function(t) {
            return (
              void 0 === t && (t = !1),
              t
                ? e._asFormatted(this, !0)
                : (this._formatted || (this._formatted = e._asFormatted(this, !1)), this._formatted)
            );
          }),
          (e._asFormatted = function(t, n) {
            var r = n ? o : i,
              s = [],
              u = t.scheme,
              a = t.authority,
              l = t.path,
              c = t.query,
              f = t.fragment;
            if (
              (u && s.push(u, ':'),
              (a || 'file' === u) && s.push('//'),
              a &&
                (-1 === (p = (a = a.toLowerCase()).indexOf(':'))
                  ? s.push(r(a))
                  : s.push(r(a.substr(0, p)), a.substr(p))),
              l)
            ) {
              var h = e._upperCaseDrive.exec(l);
              h &&
                (l = h[1]
                  ? '/' + h[2].toLowerCase() + l.substr(3)
                  : h[2].toLowerCase() + l.substr(2));
              for (var d = 0; ; ) {
                var p = l.indexOf(e._slash, d);
                if (-1 === p) {
                  s.push(r(l.substring(d)));
                  break;
                }
                s.push(r(l.substring(d, p)), e._slash), (d = p + 1);
              }
            }
            return c && s.push('?', r(c)), f && s.push('#', r(f)), s.join(e._empty);
          }),
          (e.prototype.toJSON = function() {
            var e = { fsPath: this.fsPath, external: this.toString(), $mid: 1 };
            return (
              this.path && (e.path = this.path),
              this.scheme && (e.scheme = this.scheme),
              this.authority && (e.authority = this.authority),
              this.query && (e.query = this.query),
              this.fragment && (e.fragment = this.fragment),
              e
            );
          }),
          (e.revive = function(t) {
            var n = new e(t.scheme, t.authority, t.path, t.query, t.fragment);
            return (n._fsPath = t.fsPath), (n._formatted = t.external), n;
          }),
          (e._empty = ''),
          (e._slash = '/'),
          (e._regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),
          (e._driveLetterPath = /^\/[a-zA-z]:/),
          (e._upperCaseDrive = /^(\/)?([A-Z]:)/),
          (e._schemePattern = /^\w[\w\d+.-]*$/),
          (e._singleSlashStart = /^\//),
          (e._doubleSlashStart = /^\/\//),
          e
        );
      })();
      t.default = s;
    });
  var o =
    (this && this.__extends) ||
    (function() {
      var e =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(e, t) {
            e.__proto__ = t;
          }) ||
        function(e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        };
      return function(t, n) {
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
      };
    })();
  r(e[17], t([1, 0, 6]), function(e, t, n) {
    'use strict';
    function r(e) {
      var t = [];
      return (
        e.forEach(function(e) {
          return t.push(e);
        }),
        t
      );
    }
    function i(e) {
      var t = [];
      return (
        e.forEach(function(e, n) {
          return t.push(n);
        }),
        t
      );
    }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.values = r),
      (t.keys = i),
      (t.getOrSet = function(e, t, n) {
        var r = e.get(t);
        return void 0 === r && ((r = n), e.set(t, r)), r;
      });
    var s = (function() {
      function e(e, t, n) {
        void 0 === e && (e = Number.MAX_VALUE), void 0 === t && (t = 1);
        var r = this;
        (this.limit = e),
          (this.map = new Map()),
          (this.ratio = e * t),
          n &&
            n.entries.forEach(function(e) {
              r.set(e.key, e.value);
            });
      }
      return (
        (e.prototype.setLimit = function(e) {
          if (!(e < 0)) for (this.limit = e; this.map.size > this.limit; ) this.trim();
        }),
        (e.prototype.serialize = function() {
          var e = { entries: [] };
          return (
            this.map.forEach(function(t) {
              e.entries.push({ key: t.key, value: t.value });
            }),
            e
          );
        }),
        Object.defineProperty(e.prototype, 'size', {
          get: function() {
            return this.map.size;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.set = function(e, t) {
          if (this.map.has(e)) return !1;
          var n = { key: e, value: t };
          return this.push(n), this.size > this.limit && this.trim(), !0;
        }),
        (e.prototype.get = function(e) {
          var t = this.map.get(e);
          return t ? t.value : null;
        }),
        (e.prototype.getOrSet = function(e, t) {
          var n = this.get(e);
          return n || (this.set(e, t), t);
        }),
        (e.prototype.delete = function(e) {
          var t = this.map.get(e);
          return t
            ? (this.map.delete(e),
              t.next ? (t.next.prev = t.prev) : (this.head = t.prev),
              t.prev ? (t.prev.next = t.next) : (this.tail = t.next),
              t.value)
            : null;
        }),
        (e.prototype.has = function(e) {
          return this.map.has(e);
        }),
        (e.prototype.clear = function() {
          this.map.clear(), (this.head = null), (this.tail = null);
        }),
        (e.prototype.push = function(e) {
          this.head && ((e.prev = this.head), (this.head.next = e)),
            this.tail || (this.tail = e),
            (this.head = e),
            this.map.set(e.key, e);
        }),
        (e.prototype.trim = function() {
          if (this.tail)
            if (this.ratio < this.limit)
              for (var e = 0, t = this.tail; t.next; ) {
                if ((this.map.delete(t.key), e === this.ratio)) {
                  (this.tail = t.next), (this.tail.prev = null);
                  break;
                }
                (t = t.next), e++;
              }
            else
              this.map.delete(this.tail.key),
                (this.tail = this.tail.next),
                this.tail && (this.tail.prev = null);
        }),
        e
      );
    })();
    t.BoundedMap = s;
    var u = (function() {
        return function() {
          this.children = new Map();
        };
      })(),
      a = (function() {
        function e(e) {
          (this._root = new u()),
            (this._splitter = function(t) {
              return e(t).filter(function(e) {
                return Boolean(e);
              });
            });
        }
        return (
          (e.prototype.insert = function(e, t) {
            for (var n = this._splitter(e), r = 0, i = this._root; r < n.length; r++) {
              var o = i.children.get(n[r]);
              if (!o) break;
              i = o;
            }
            for (var s; r < n.length; r++) (s = new u()), i.children.set(n[r], s), (i = s);
            i.element = t;
          }),
          (e.prototype.lookUp = function(e) {
            for (
              var t, n = this._splitter(e), r = this._root.children, i = 0, o = n;
              i < o.length;
              i++
            ) {
              var s = o[i];
              if (!(t = r.get(s))) return;
              r = t.children;
            }
            return t.element;
          }),
          (e.prototype.findSubstr = function(e) {
            for (
              var t, n = this._splitter(e), r = this._root.children, i = 0, o = n;
              i < o.length;
              i++
            ) {
              var s = o[i],
                u = r.get(s);
              if (!u) break;
              u.element && (t = u), (r = u.children);
            }
            if (t) return t.element;
          }),
          (e.prototype.findSuperstr = function(t) {
            for (
              var n, r = this._splitter(t), i = this._root.children, o = 0, s = r;
              o < s.length;
              o++
            ) {
              var u = s[o];
              if (!(n = i.get(u))) return;
              i = n.children;
            }
            var a = new e(this._splitter);
            return (a._root = n), a;
          }),
          (e.PathSplitter = function(e) {
            return e.split(/[\\/]/).filter(function(e) {
              return !!e;
            });
          }),
          e
        );
      })();
    t.TrieMap = a;
    var l = (function() {
      function e(e) {
        (this.ignoreCase = e), (this.map = new Map());
      }
      return (
        (e.prototype.set = function(e, t) {
          this.map.set(this.toKey(e), t);
        }),
        (e.prototype.get = function(e) {
          return this.map.get(this.toKey(e));
        }),
        (e.prototype.has = function(e) {
          return this.map.has(this.toKey(e));
        }),
        Object.defineProperty(e.prototype, 'size', {
          get: function() {
            return this.map.size;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.clear = function() {
          this.map.clear();
        }),
        (e.prototype.delete = function(e) {
          return this.map.delete(this.toKey(e));
        }),
        (e.prototype.forEach = function(e) {
          this.map.forEach(e);
        }),
        (e.prototype.values = function() {
          return r(this.map);
        }),
        (e.prototype.toKey = function(e) {
          var t = e.toString();
          return this.ignoreCase && (t = t.toLowerCase()), t;
        }),
        e
      );
    })();
    t.ResourceMap = l;
    var c = (function(e) {
      function t() {
        return e.call(this) || this;
      }
      return (
        o(t, e),
        (t.prototype.keys = function() {
          return i(this.map).map(function(e) {
            return n.default.parse(e);
          });
        }),
        t
      );
    })(l);
    t.StrictResourceMap = c;
    var f;
    !(function(e) {
      (e.None = 0), (e.First = 1), (e.Last = 2);
    })((f = t.Touch || (t.Touch = {})));
    var h = (function() {
      function e() {
        (this._map = new Map()), (this._head = void 0), (this._tail = void 0), (this._size = 0);
      }
      return (
        (e.prototype.clear = function() {
          this._map.clear(), (this._head = void 0), (this._tail = void 0), (this._size = 0);
        }),
        (e.prototype.isEmpty = function() {
          return !this._head && !this._tail;
        }),
        Object.defineProperty(e.prototype, 'size', {
          get: function() {
            return this._size;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.has = function(e) {
          return this._map.has(e);
        }),
        (e.prototype.get = function(e) {
          var t = this._map.get(e);
          if (t) return t.value;
        }),
        (e.prototype.set = function(e, t, n) {
          void 0 === n && (n = f.None);
          var r = this._map.get(e);
          if (r) (r.value = t), n !== f.None && this.touch(r, n);
          else {
            switch (((r = { key: e, value: t, next: void 0, previous: void 0 }), n)) {
              case f.None:
                this.addItemLast(r);
                break;
              case f.First:
                this.addItemFirst(r);
                break;
              case f.Last:
              default:
                this.addItemLast(r);
            }
            this._map.set(e, r), this._size++;
          }
        }),
        (e.prototype.delete = function(e) {
          return !!this.remove(e);
        }),
        (e.prototype.remove = function(e) {
          var t = this._map.get(e);
          if (t) return this._map.delete(e), this.removeItem(t), this._size--, t.value;
        }),
        (e.prototype.shift = function() {
          if (this._head || this._tail) {
            if (!this._head || !this._tail) throw new Error('Invalid list');
            var e = this._head;
            return this._map.delete(e.key), this.removeItem(e), this._size--, e.value;
          }
        }),
        (e.prototype.forEach = function(e, t) {
          for (var n = this._head; n; )
            t ? e.bind(t)(n.value, n.key, this) : e(n.value, n.key, this), (n = n.next);
        }),
        (e.prototype.forEachReverse = function(e, t) {
          for (var n = this._tail; n; )
            t ? e.bind(t)(n.value, n.key, this) : e(n.value, n.key, this), (n = n.previous);
        }),
        (e.prototype.values = function() {
          for (var e = [], t = this._head; t; ) e.push(t.value), (t = t.next);
          return e;
        }),
        (e.prototype.keys = function() {
          for (var e = [], t = this._head; t; ) e.push(t.key), (t = t.next);
          return e;
        }),
        (e.prototype.addItemFirst = function(e) {
          if (this._head || this._tail) {
            if (!this._head) throw new Error('Invalid list');
            (e.next = this._head), (this._head.previous = e);
          } else this._tail = e;
          this._head = e;
        }),
        (e.prototype.addItemLast = function(e) {
          if (this._head || this._tail) {
            if (!this._tail) throw new Error('Invalid list');
            (e.previous = this._tail), (this._tail.next = e);
          } else this._head = e;
          this._tail = e;
        }),
        (e.prototype.removeItem = function(e) {
          if (e === this._head && e === this._tail) (this._head = void 0), (this._tail = void 0);
          else if (e === this._head) this._head = e.next;
          else if (e === this._tail) this._tail = e.previous;
          else {
            var t = e.next,
              n = e.previous;
            if (!t || !n) throw new Error('Invalid list');
            (t.previous = n), (n.next = t);
          }
        }),
        (e.prototype.touch = function(e, t) {
          if (!this._head || !this._tail) throw new Error('Invalid list');
          if (t === f.First || t === f.Last)
            if (t === f.First) {
              if (e === this._head) return;
              var n = e.next,
                r = e.previous;
              e === this._tail
                ? ((r.next = void 0), (this._tail = r))
                : ((n.previous = r), (r.next = n)),
                (e.previous = void 0),
                (e.next = this._head),
                (this._head.previous = e),
                (this._head = e);
            } else if (t === f.Last) {
              if (e === this._tail) return;
              var n = e.next,
                r = e.previous;
              e === this._head
                ? ((n.previous = void 0), (this._head = n))
                : ((n.previous = r), (r.next = n)),
                (e.next = void 0),
                (e.previous = this._tail),
                (this._tail.next = e),
                (this._tail = e);
            }
        }),
        e
      );
    })();
    t.LinkedMap = h;
  }),
    r(e[20], t([1, 0, 17]), function(e, t, n) {
      'use strict';
      function r(e) {
        return e.replace(/[\-\\\{\}\*\+\?\|\^\$\.\[\]\(\)\#]/g, '\\$&');
      }
      function i(e, t) {
        if (!e || !t) return e;
        var n = t.length;
        if (0 === n || 0 === e.length) return e;
        for (var r = 0; e.indexOf(t, r) === r; ) r += n;
        return e.substring(r);
      }
      function o(e, t) {
        if (!e || !t) return e;
        var n = t.length,
          r = e.length;
        if (0 === n || 0 === r) return e;
        for (var i = r, o = -1; ; ) {
          if (-1 === (o = e.lastIndexOf(t, i - 1)) || o + n !== i) break;
          if (0 === o) return '';
          i = o;
        }
        return e.substring(0, i);
      }
      function s(e, t) {
        return e < t ? -1 : e > t ? 1 : 0;
      }
      function u(e) {
        return e >= 97 && e <= 122;
      }
      function a(e) {
        return e >= 65 && e <= 90;
      }
      function l(e) {
        return u(e) || a(e);
      }
      function c(e, t, n) {
        if ((void 0 === n && (n = e.length), 'string' != typeof e || 'string' != typeof t))
          return !1;
        for (var r = 0; r < n; r++) {
          var i = e.charCodeAt(r),
            o = t.charCodeAt(r);
          if (i !== o)
            if (l(i) && l(o)) {
              var s = Math.abs(i - o);
              if (0 !== s && 32 !== s) return !1;
            } else if (
              String.fromCharCode(i).toLowerCase() !== String.fromCharCode(o).toLowerCase()
            )
              return !1;
        }
        return !0;
      }
      function f(e, t, n, r, i, o) {
        for (; t < n && i < o; ) {
          if (e[t] !== r[i]) return !1;
          (t += 1), (i += 1);
        }
        return !0;
      }
      function h(e) {
        return (
          ((e = +e) >= 11904 && e <= 55215) ||
          (e >= 63744 && e <= 64255) ||
          (e >= 65281 && e <= 65374)
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.empty = ''),
        (t.isFalsyOrWhitespace = function(e) {
          return !e || 'string' != typeof e || 0 === e.trim().length;
        }),
        (t.pad = function(e, t, n) {
          void 0 === n && (n = '0');
          for (var r = '' + e, i = [r], o = r.length; o < t; o++) i.push(n);
          return i.reverse().join('');
        });
      var d = /{(\d+)}/g;
      (t.format = function(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        return 0 === t.length
          ? e
          : e.replace(d, function(e, n) {
              var r = parseInt(n, 10);
              return isNaN(r) || r < 0 || r >= t.length ? e : t[r];
            });
      }),
        (t.escape = function(e) {
          return e.replace(/[<|>|&]/g, function(e) {
            switch (e) {
              case '<':
                return '&lt;';
              case '>':
                return '&gt;';
              case '&':
                return '&amp;';
              default:
                return e;
            }
          });
        }),
        (t.escapeRegExpCharacters = r),
        (t.trim = function(e, t) {
          return void 0 === t && (t = ' '), o(i(e, t), t);
        }),
        (t.ltrim = i),
        (t.rtrim = o),
        (t.convertSimple2RegExpPattern = function(e) {
          return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
        }),
        (t.stripWildcards = function(e) {
          return e.replace(/\*/g, '');
        }),
        (t.startsWith = function(e, t) {
          if (e.length < t.length) return !1;
          for (var n = 0; n < t.length; n++) if (e[n] !== t[n]) return !1;
          return !0;
        }),
        (t.endsWith = function(e, t) {
          var n = e.length - t.length;
          return n > 0 ? e.indexOf(t, n) === n : 0 === n && e === t;
        }),
        (t.indexOfIgnoreCase = function(e, t, n) {
          void 0 === n && (n = 0);
          var i = e.indexOf(t, n);
          return (
            i < 0 && (n > 0 && (e = e.substr(n)), (t = r(t)), (i = e.search(new RegExp(t, 'i')))), i
          );
        }),
        (t.createRegExp = function(e, t, n) {
          if ((void 0 === n && (n = {}), !e))
            throw new Error('Cannot create regex from empty string');
          t || (e = r(e)),
            n.wholeWord &&
              (/\B/.test(e.charAt(0)) || (e = '\\b' + e),
              /\B/.test(e.charAt(e.length - 1)) || (e += '\\b'));
          var i = '';
          return (
            n.global && (i += 'g'),
            n.matchCase || (i += 'i'),
            n.multiline && (i += 'm'),
            new RegExp(e, i)
          );
        }),
        (t.regExpLeadsToEndlessLoop = function(e) {
          return (
            '^' !== e.source &&
            '^$' !== e.source &&
            '$' !== e.source &&
            e.exec('') &&
            0 === e.lastIndex
          );
        }),
        (t.canNormalize = 'function' == typeof ''.normalize);
      var p = /[^\u0000-\u0080]/,
        m = new n.BoundedMap(1e4);
      (t.normalizeNFC = function(e) {
        if (!t.canNormalize || !e) return e;
        var n = m.get(e);
        if (n) return n;
        var r;
        return (r = p.test(e) ? e.normalize('NFC') : e), m.set(e, r), r;
      }),
        (t.firstNonWhitespaceIndex = function(e) {
          for (var t = 0, n = e.length; t < n; t++) {
            var r = e.charCodeAt(t);
            if (32 !== r && 9 !== r) return t;
          }
          return -1;
        }),
        (t.getLeadingWhitespace = function(e, t, n) {
          void 0 === t && (t = 0), void 0 === n && (n = e.length);
          for (var r = t; r < n; r++) {
            var i = e.charCodeAt(r);
            if (32 !== i && 9 !== i) return e.substring(t, r);
          }
          return e.substring(t, n);
        }),
        (t.lastNonWhitespaceIndex = function(e, t) {
          void 0 === t && (t = e.length - 1);
          for (var n = t; n >= 0; n--) {
            var r = e.charCodeAt(n);
            if (32 !== r && 9 !== r) return n;
          }
          return -1;
        }),
        (t.compare = s),
        (t.compareIgnoreCase = function(e, t) {
          for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
            var i = e.charCodeAt(r),
              o = t.charCodeAt(r);
            if (i !== o) {
              a(i) && (i += 32), a(o) && (o += 32);
              var l = i - o;
              if (0 !== l) return u(i) && u(o) ? l : s(e.toLowerCase(), t.toLowerCase());
            }
          }
          return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
        }),
        (t.equalsIgnoreCase = function(e, t) {
          return (e ? e.length : 0) === (t ? t.length : 0) && c(e, t);
        }),
        (t.beginsWithIgnoreCase = function(e, t) {
          var n = t.length;
          return !(t.length > e.length) && c(e, t, n);
        }),
        (t.commonPrefixLength = function(e, t) {
          var n,
            r = Math.min(e.length, t.length);
          for (n = 0; n < r; n++) if (e.charCodeAt(n) !== t.charCodeAt(n)) return n;
          return r;
        }),
        (t.commonSuffixLength = function(e, t) {
          var n,
            r = Math.min(e.length, t.length),
            i = e.length - 1,
            o = t.length - 1;
          for (n = 0; n < r; n++) if (e.charCodeAt(i - n) !== t.charCodeAt(o - n)) return n;
          return r;
        }),
        (t.overlap = function(e, t) {
          var n = e.length,
            r = t.length,
            i = n - r;
          if (0 === i) return e === t ? n : 0;
          for (i < 0 && ((r += i), (i = 0)); i < n && r > 0; ) {
            if (f(e, i, n, t, 0, r)) return r;
            (r -= 1), (i += 1);
          }
          return 0;
        }),
        (t.isHighSurrogate = function(e) {
          return 55296 <= e && e <= 56319;
        }),
        (t.isLowSurrogate = function(e) {
          return 56320 <= e && e <= 57343;
        });
      var _ = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
      t.containsRTL = function(e) {
        return _.test(e);
      };
      var g = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEF8]|\uD83E[\uDD00-\uDDE6])/;
      t.containsEmoji = function(e) {
        return g.test(e);
      };
      var v = /^[\t\n\r\x20-\x7E]*$/;
      (t.isBasicASCII = function(e) {
        return v.test(e);
      }),
        (t.containsFullWidthCharacter = function(e) {
          for (var t = 0, n = e.length; t < n; t++) if (h(e.charCodeAt(t))) return !0;
          return !1;
        }),
        (t.isFullWidthCharacter = h),
        (t.difference = function(e, t, n) {
          void 0 === n && (n = 4);
          var r = Math.abs(e.length - t.length);
          if (r > n) return 0;
          var i,
            o,
            s = [],
            u = [];
          for (i = 0; i < t.length + 1; ++i) u.push(0);
          for (i = 0; i < e.length + 1; ++i) s.push(u);
          for (i = 1; i < e.length + 1; ++i)
            for (o = 1; o < t.length + 1; ++o)
              e[i - 1] === t[o - 1]
                ? (s[i][o] = s[i - 1][o - 1] + 1)
                : (s[i][o] = Math.max(s[i - 1][o], s[i][o - 1]));
          return s[e.length][t.length] - Math.sqrt(r);
        }),
        (t.computeLineStarts = function(e) {
          for (var t = /\r\n|\r|\n/g, n = [0]; t.exec(e); ) n.push(t.lastIndex);
          return n;
        }),
        (t.lcut = function(e, n) {
          if (e.length < n) return e;
          for (var r = e.split(/\b/), i = 0, o = r.length - 1; o >= 0; o--)
            if ((i += r[o].length) > n) {
              r.splice(0, o);
              break;
            }
          return r.join(t.empty).replace(/^\s/, t.empty);
        });
      var y = /\x1B\x5B[12]?K/g,
        b = /\x1b\[\d+m/g,
        C = /\x1b\[0?m/g;
      (t.removeAnsiEscapeCodes = function(e) {
        return e && (e = (e = (e = e.replace(y, '')).replace(b, '')).replace(C, '')), e;
      }),
        (t.UTF8_BOM_CHARACTER = String.fromCharCode(65279)),
        (t.startsWithUTF8BOM = function(e) {
          return e && e.length > 0 && 65279 === e.charCodeAt(0);
        }),
        (t.appendWithLimit = function(e, t, n) {
          var r = e.length + t.length;
          return (
            r > n && (e = '...' + e.substr(r - n)),
            t.length > n ? (e += t.substr(t.length - n)) : (e += t),
            e
          );
        }),
        (t.safeBtoa = function(e) {
          return btoa(encodeURIComponent(e));
        }),
        (t.repeat = function(e, t) {
          for (var n = '', r = 0; r < t; r++) n += e;
          return n;
        });
    }),
    (function() {
      var e = {};
      e['WinJS/Core/_WinJS'] = {};
      var t = function(t, n, r) {
        var i = {},
          o = !1,
          s = n.map(function(t) {
            return 'exports' === t ? ((o = !0), i) : e[t];
          }),
          u = r.apply({}, s);
        e[t] = o ? i : u;
      };
      t('WinJS/Core/_Global', [], function() {
        'use strict';
        return 'undefined' != typeof window
          ? window
          : 'undefined' != typeof self
          ? self
          : 'undefined' != typeof global
          ? global
          : {};
      }),
        t('WinJS/Core/_BaseCoreUtils', ['WinJS/Core/_Global'], function(e) {
          'use strict';
          return {
            hasWinRT: !!e.Windows,
            markSupportedForProcessing: function(e) {
              return (e.supportedForProcessing = !0), e;
            },
            _setImmediate: e.setImmediate
              ? e.setImmediate.bind(e)
              : function(t) {
                  e.setTimeout(t, 0);
                },
          };
        }),
        t('WinJS/Core/_WriteProfilerMark', ['WinJS/Core/_Global'], function(e) {
          'use strict';
          return e.msWriteProfilerMark || function() {};
        }),
        t(
          'WinJS/Core/_Base',
          [
            'WinJS/Core/_WinJS',
            'WinJS/Core/_Global',
            'WinJS/Core/_BaseCoreUtils',
            'WinJS/Core/_WriteProfilerMark',
          ],
          function(e, t, n, r) {
            'use strict';
            function i(e, t, n) {
              var r,
                i,
                o,
                s = Object.keys(t),
                u = Array.isArray(e);
              for (i = 0, o = s.length; i < o; i++) {
                var a = s[i],
                  l = 95 !== a.charCodeAt(0),
                  c = t[a];
                !c ||
                'object' != typeof c ||
                (void 0 === c.value && 'function' != typeof c.get && 'function' != typeof c.set)
                  ? l
                    ? u
                      ? e.forEach(function(e) {
                          e[a] = c;
                        })
                      : (e[a] = c)
                    : ((r = r || {})[a] = {
                        value: c,
                        enumerable: l,
                        configurable: !0,
                        writable: !0,
                      })
                  : (void 0 === c.enumerable && (c.enumerable = l),
                    n && c.setName && 'function' == typeof c.setName && c.setName(n + '.' + a),
                    ((r = r || {})[a] = c));
              }
              r &&
                (u
                  ? e.forEach(function(e) {
                      Object.defineProperties(e, r);
                    })
                  : Object.defineProperties(e, r));
            }
            return (
              (function() {
                function n(n, r) {
                  var i = n || {};
                  if (r) {
                    var o = r.split('.');
                    i === t && 'WinJS' === o[0] && ((i = e), o.splice(0, 1));
                    for (var s = 0, u = o.length; s < u; s++) {
                      var a = o[s];
                      i[a] ||
                        Object.defineProperty(i, a, {
                          value: {},
                          writable: !1,
                          enumerable: !0,
                          configurable: !0,
                        }),
                        (i = i[a]);
                    }
                  }
                  return i;
                }
                function o(e, t, r) {
                  var o = n(e, t);
                  return r && i(o, r, t || '<ANONYMOUS>'), o;
                }
                var s = e;
                s.Namespace || (s.Namespace = Object.create(Object.prototype));
                var u = { uninitialized: 1, working: 2, initialized: 3 };
                Object.defineProperties(s.Namespace, {
                  defineWithParent: { value: o, writable: !0, enumerable: !0, configurable: !0 },
                  define: {
                    value: function(e, n) {
                      return o(t, e, n);
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                  },
                  _lazy: {
                    value: function(e) {
                      var t,
                        n,
                        i = u.uninitialized;
                      return {
                        setName: function(e) {
                          t = e;
                        },
                        get: function() {
                          switch (i) {
                            case u.initialized:
                              return n;
                            case u.uninitialized:
                              i = u.working;
                              try {
                                r('WinJS.Namespace._lazy:' + t + ',StartTM'), (n = e());
                              } finally {
                                r('WinJS.Namespace._lazy:' + t + ',StopTM'), (i = u.uninitialized);
                              }
                              return (e = null), (i = u.initialized), n;
                            case u.working:
                              throw 'Illegal: reentrancy on initialization';
                            default:
                              throw 'Illegal';
                          }
                        },
                        set: function(e) {
                          switch (i) {
                            case u.working:
                              throw 'Illegal: reentrancy on initialization';
                            default:
                              (i = u.initialized), (n = e);
                          }
                        },
                        enumerable: !0,
                        configurable: !0,
                      };
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                  },
                  _moduleDefine: {
                    value: function(e, r, o) {
                      var s = [e],
                        u = null;
                      return r && ((u = n(t, r)), s.push(u)), i(s, o, r || '<ANONYMOUS>'), u;
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                  },
                });
              })(),
              (function() {
                function t(e, t, r) {
                  return (
                    (e = e || function() {}),
                    n.markSupportedForProcessing(e),
                    t && i(e.prototype, t),
                    r && i(e, r),
                    e
                  );
                }
                e.Namespace.define('WinJS.Class', {
                  define: t,
                  derive: function(e, r, o, s) {
                    if (e) {
                      r = r || function() {};
                      var u = e.prototype;
                      return (
                        (r.prototype = Object.create(u)),
                        n.markSupportedForProcessing(r),
                        Object.defineProperty(r.prototype, 'constructor', {
                          value: r,
                          writable: !0,
                          configurable: !0,
                          enumerable: !0,
                        }),
                        o && i(r.prototype, o),
                        s && i(r, s),
                        r
                      );
                    }
                    return t(r, o, s);
                  },
                  mix: function(e) {
                    e = e || function() {};
                    var t, n;
                    for (t = 1, n = arguments.length; t < n; t++) i(e.prototype, arguments[t]);
                    return e;
                  },
                });
              })(),
              { Namespace: e.Namespace, Class: e.Class }
            );
          }
        ),
        t('WinJS/Core/_ErrorFromName', ['WinJS/Core/_Base'], function(e) {
          'use strict';
          var t = e.Class.derive(
            Error,
            function(e, t) {
              (this.name = e), (this.message = t || e);
            },
            {},
            { supportedForProcessing: !1 }
          );
          return e.Namespace.define('WinJS', { ErrorFromName: t }), t;
        }),
        t('WinJS/Core/_Events', ['exports', 'WinJS/Core/_Base'], function(e, t) {
          'use strict';
          function n(e) {
            var t = '_on' + e + 'state';
            return {
              get: function() {
                var e = this[t];
                return e && e.userHandler;
              },
              set: function(n) {
                var r = this[t];
                n
                  ? (r ||
                      ((r = {
                        wrapper: function(e) {
                          return r.userHandler(e);
                        },
                        userHandler: n,
                      }),
                      Object.defineProperty(this, t, {
                        value: r,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      }),
                      this.addEventListener(e, r.wrapper, !1)),
                    (r.userHandler = n))
                  : r && (this.removeEventListener(e, r.wrapper, !1), (this[t] = null));
              },
              enumerable: !0,
            };
          }
          var r = t.Class.define(
              function(e, t, n) {
                (this.detail = t),
                  (this.target = n),
                  (this.timeStamp = Date.now()),
                  (this.type = e);
              },
              {
                bubbles: { value: !1, writable: !1 },
                cancelable: { value: !1, writable: !1 },
                currentTarget: {
                  get: function() {
                    return this.target;
                  },
                },
                defaultPrevented: {
                  get: function() {
                    return this._preventDefaultCalled;
                  },
                },
                trusted: { value: !1, writable: !1 },
                eventPhase: { value: 0, writable: !1 },
                target: null,
                timeStamp: null,
                type: null,
                preventDefault: function() {
                  this._preventDefaultCalled = !0;
                },
                stopImmediatePropagation: function() {
                  this._stopImmediatePropagationCalled = !0;
                },
                stopPropagation: function() {},
              },
              { supportedForProcessing: !1 }
            ),
            i = {
              _listeners: null,
              addEventListener: function(e, t, n) {
                (n = n || !1), (this._listeners = this._listeners || {});
                for (
                  var r = (this._listeners[e] = this._listeners[e] || []), i = 0, o = r.length;
                  i < o;
                  i++
                ) {
                  var s = r[i];
                  if (s.useCapture === n && s.listener === t) return;
                }
                r.push({ listener: t, useCapture: n });
              },
              dispatchEvent: function(e, t) {
                var n = this._listeners && this._listeners[e];
                if (n) {
                  for (
                    var i = new r(e, t, this), o = 0, s = (n = n.slice(0, n.length)).length;
                    o < s && !i._stopImmediatePropagationCalled;
                    o++
                  )
                    n[o].listener(i);
                  return i.defaultPrevented || !1;
                }
                return !1;
              },
              removeEventListener: function(e, t, n) {
                n = n || !1;
                var r = this._listeners && this._listeners[e];
                if (r)
                  for (var i = 0, o = r.length; i < o; i++) {
                    var s = r[i];
                    if (s.listener === t && s.useCapture === n) {
                      r.splice(i, 1), 0 === r.length && delete this._listeners[e];
                      break;
                    }
                  }
              },
            };
          t.Namespace._moduleDefine(e, 'WinJS.Utilities', {
            _createEventProperty: n,
            createEventProperties: function() {
              for (var e = {}, t = 0, r = arguments.length; t < r; t++) {
                var i = arguments[t];
                e['on' + i] = n(i);
              }
              return e;
            },
            eventMixin: i,
          });
        }),
        t('WinJS/Core/_Trace', ['WinJS/Core/_Global'], function(e) {
          'use strict';
          function t(e) {
            return e;
          }
          return {
            _traceAsyncOperationStarting:
              (e.Debug &&
                e.Debug.msTraceAsyncOperationStarting &&
                e.Debug.msTraceAsyncOperationStarting.bind(e.Debug)) ||
              t,
            _traceAsyncOperationCompleted:
              (e.Debug &&
                e.Debug.msTraceAsyncOperationCompleted &&
                e.Debug.msTraceAsyncOperationCompleted.bind(e.Debug)) ||
              t,
            _traceAsyncCallbackStarting:
              (e.Debug &&
                e.Debug.msTraceAsyncCallbackStarting &&
                e.Debug.msTraceAsyncCallbackStarting.bind(e.Debug)) ||
              t,
            _traceAsyncCallbackCompleted:
              (e.Debug &&
                e.Debug.msTraceAsyncCallbackCompleted &&
                e.Debug.msTraceAsyncCallbackCompleted.bind(e.Debug)) ||
              t,
          };
        }),
        t(
          'WinJS/Promise/_StateMachine',
          [
            'WinJS/Core/_Global',
            'WinJS/Core/_BaseCoreUtils',
            'WinJS/Core/_Base',
            'WinJS/Core/_ErrorFromName',
            'WinJS/Core/_Events',
            'WinJS/Core/_Trace',
          ],
          function(e, t, n, r, i, o) {
            'use strict';
            function s() {}
            function u(e, t) {
              var n;
              (n = t && 'object' == typeof t && 'function' == typeof t.then ? T : R),
                (e._value = t),
                e._setState(n);
            }
            function a(e, t, n, r, i, o) {
              return { exception: e, error: t, promise: n, handler: o, id: r, parent: i };
            }
            function l(e, t, n, r) {
              var i = n._isException,
                o = n._errorId;
              return a(i ? t : null, i ? null : t, e, o, n, r);
            }
            function c(e, t, n) {
              var r = n._isException,
                i = n._errorId;
              return b(e, i, r), a(r ? t : null, r ? null : t, e, i, n);
            }
            function f(e, t) {
              var n = ++q;
              return b(e, n), a(null, t, e, n);
            }
            function h(e, t) {
              var n = ++q;
              return b(e, n, !0), a(t, null, e, n);
            }
            function d(e, t, n, r) {
              y(e, {
                c: t,
                e: n,
                p: r,
                asyncOpID: o._traceAsyncOperationStarting('WinJS.Promise.done'),
              });
            }
            function p(e, t, n, r) {
              (e._value = t), g(e, t, n, r), e._setState(K);
            }
            function m(t, n) {
              var r = t._value,
                i = t._listeners;
              if (i) {
                t._listeners = null;
                var s, u;
                for (s = 0, u = Array.isArray(i) ? i.length : 1; s < u; s++) {
                  var a = 1 === u ? i : i[s],
                    l = a.c,
                    c = a.promise;
                  if (
                    (o._traceAsyncOperationCompleted(
                      a.asyncOpID,
                      e.Debug && e.Debug.MS_ASYNC_OP_STATUS_SUCCESS
                    ),
                    c)
                  ) {
                    o._traceAsyncCallbackStarting(a.asyncOpID);
                    try {
                      c._setCompleteValue(l ? l(r) : r);
                    } catch (e) {
                      c._setExceptionValue(e);
                    } finally {
                      o._traceAsyncCallbackCompleted();
                    }
                    c._state !== T && c._listeners && n.push(c);
                  } else z.prototype.done.call(t, l);
                }
              }
            }
            function _(t, n) {
              var r = t._value,
                i = t._listeners;
              if (i) {
                t._listeners = null;
                var s, u;
                for (s = 0, u = Array.isArray(i) ? i.length : 1; s < u; s++) {
                  var a = 1 === u ? i : i[s],
                    c = a.e,
                    f = a.promise,
                    h =
                      e.Debug &&
                      (r && r.name === M
                        ? e.Debug.MS_ASYNC_OP_STATUS_CANCELED
                        : e.Debug.MS_ASYNC_OP_STATUS_ERROR);
                  if ((o._traceAsyncOperationCompleted(a.asyncOpID, h), f)) {
                    var d = !1;
                    try {
                      c
                        ? (o._traceAsyncCallbackStarting(a.asyncOpID),
                          (d = !0),
                          c.handlesOnError || g(f, r, l, t, c),
                          f._setCompleteValue(c(r)))
                        : f._setChainedErrorValue(r, t);
                    } catch (e) {
                      f._setExceptionValue(e);
                    } finally {
                      d && o._traceAsyncCallbackCompleted();
                    }
                    f._state !== T && f._listeners && n.push(f);
                  } else V.prototype.done.call(t, null, c);
                }
              }
            }
            function g(e, t, n, r, i) {
              if (A._listeners[P]) {
                if (t instanceof Error && t.message === M) return;
                A.dispatchEvent(P, n(e, t, r, i));
              }
            }
            function v(e, t) {
              var n = e._listeners;
              if (n) {
                var r, i;
                for (r = 0, i = Array.isArray(n) ? n.length : 1; r < i; r++) {
                  var o = 1 === i ? n : n[r],
                    s = o.p;
                  if (s)
                    try {
                      s(t);
                    } catch (e) {}
                  o.c || o.e || !o.promise || o.promise._progress(t);
                }
              }
            }
            function y(e, t) {
              var n = e._listeners;
              n ? (n = Array.isArray(n) ? n : [n]).push(t) : (n = t), (e._listeners = n);
            }
            function b(e, t, n) {
              (e._isException = n || !1), (e._errorId = t);
            }
            function C(e, t, n, r) {
              (e._value = t), g(e, t, n, r), e._setState(W);
            }
            function E(e, t) {
              var n;
              (n = t && 'object' == typeof t && 'function' == typeof t.then ? T : F),
                (e._value = t),
                e._setState(n);
            }
            function S(e, t, n, r) {
              var i = new j(e);
              return (
                y(e, {
                  promise: i,
                  c: t,
                  e: n,
                  p: r,
                  asyncOpID: o._traceAsyncOperationStarting('WinJS.Promise.then'),
                }),
                i
              );
            }
            function L(n) {
              var r;
              return new J(
                function(i) {
                  n ? (r = e.setTimeout(i, n)) : t._setImmediate(i);
                },
                function() {
                  r && e.clearTimeout(r);
                }
              );
            }
            function N(e, t) {
              var n = function() {
                e.cancel();
              };
              return (
                e.then(function() {
                  t.cancel();
                }),
                t.then(n, n),
                t
              );
            }
            e.Debug && (e.Debug.setNonUserCodeExceptions = !0);
            var A = new (n.Class.mix(
              n.Class.define(null, {}, { supportedForProcessing: !1 }),
              i.eventMixin
            ))();
            A._listeners = {};
            var P = 'error',
              M = 'Canceled',
              w = !1,
              D = {
                promise: 1,
                thenPromise: 2,
                errorPromise: 4,
                exceptionPromise: 8,
                completePromise: 16,
              };
            D.all =
              D.promise | D.thenPromise | D.errorPromise | D.exceptionPromise | D.completePromise;
            var I,
              k,
              T,
              U,
              O,
              x,
              R,
              F,
              K,
              W,
              q = 1;
            (I = {
              name: 'created',
              enter: function(e) {
                e._setState(k);
              },
              cancel: s,
              done: s,
              then: s,
              _completed: s,
              _error: s,
              _notify: s,
              _progress: s,
              _setCompleteValue: s,
              _setErrorValue: s,
            }),
              (k = {
                name: 'working',
                enter: s,
                cancel: function(e) {
                  e._setState(O);
                },
                done: d,
                then: S,
                _completed: u,
                _error: p,
                _notify: s,
                _progress: v,
                _setCompleteValue: E,
                _setErrorValue: C,
              }),
              (T = {
                name: 'waiting',
                enter: function(e) {
                  var t = e._value;
                  if (t instanceof j && t._state !== W && t._state !== F) y(t, { promise: e });
                  else {
                    var n = function(r) {
                      t._errorId ? e._chainedError(r, t) : (g(e, r, l, t, n), e._error(r));
                    };
                    (n.handlesOnError = !0), t.then(e._completed.bind(e), n, e._progress.bind(e));
                  }
                },
                cancel: function(e) {
                  e._setState(U);
                },
                done: d,
                then: S,
                _completed: u,
                _error: p,
                _notify: s,
                _progress: v,
                _setCompleteValue: E,
                _setErrorValue: C,
              }),
              (U = {
                name: 'waiting_canceled',
                enter: function(e) {
                  e._setState(x);
                  var t = e._value;
                  t.cancel && t.cancel();
                },
                cancel: s,
                done: d,
                then: S,
                _completed: u,
                _error: p,
                _notify: s,
                _progress: v,
                _setCompleteValue: E,
                _setErrorValue: C,
              }),
              (O = {
                name: 'canceled',
                enter: function(e) {
                  e._setState(x), e._cancelAction();
                },
                cancel: s,
                done: d,
                then: S,
                _completed: u,
                _error: p,
                _notify: s,
                _progress: v,
                _setCompleteValue: E,
                _setErrorValue: C,
              }),
              (x = {
                name: 'canceling',
                enter: function(e) {
                  var t = new Error(M);
                  (t.name = t.message), (e._value = t), e._setState(K);
                },
                cancel: s,
                done: s,
                then: s,
                _completed: s,
                _error: s,
                _notify: s,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s,
              }),
              (R = {
                name: 'complete_notify',
                enter: function(e) {
                  if (((e.done = z.prototype.done), (e.then = z.prototype.then), e._listeners))
                    for (var t, n = [e]; n.length; ) (t = n.shift())._state._notify(t, n);
                  e._setState(F);
                },
                cancel: s,
                done: null,
                then: null,
                _completed: s,
                _error: s,
                _notify: m,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s,
              }),
              (F = {
                name: 'success',
                enter: function(e) {
                  (e.done = z.prototype.done), (e.then = z.prototype.then), e._cleanupAction();
                },
                cancel: s,
                done: null,
                then: null,
                _completed: s,
                _error: s,
                _notify: m,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s,
              }),
              (K = {
                name: 'error_notify',
                enter: function(e) {
                  if (((e.done = V.prototype.done), (e.then = V.prototype.then), e._listeners))
                    for (var t, n = [e]; n.length; ) (t = n.shift())._state._notify(t, n);
                  e._setState(W);
                },
                cancel: s,
                done: null,
                then: null,
                _completed: s,
                _error: s,
                _notify: _,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s,
              }),
              (W = {
                name: 'error',
                enter: function(e) {
                  (e.done = V.prototype.done), (e.then = V.prototype.then), e._cleanupAction();
                },
                cancel: s,
                done: null,
                then: null,
                _completed: s,
                _error: s,
                _notify: _,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s,
              });
            var B,
              Y = n.Class.define(
                null,
                {
                  _listeners: null,
                  _nextState: null,
                  _state: null,
                  _value: null,
                  cancel: function() {
                    this._state.cancel(this), this._run();
                  },
                  done: function(e, t, n) {
                    this._state.done(this, e, t, n);
                  },
                  then: function(e, t, n) {
                    return this._state.then(this, e, t, n);
                  },
                  _chainedError: function(e, t) {
                    var n = this._state._error(this, e, c, t);
                    return this._run(), n;
                  },
                  _completed: function(e) {
                    var t = this._state._completed(this, e);
                    return this._run(), t;
                  },
                  _error: function(e) {
                    var t = this._state._error(this, e, f);
                    return this._run(), t;
                  },
                  _progress: function(e) {
                    this._state._progress(this, e);
                  },
                  _setState: function(e) {
                    this._nextState = e;
                  },
                  _setCompleteValue: function(e) {
                    this._state._setCompleteValue(this, e), this._run();
                  },
                  _setChainedErrorValue: function(e, t) {
                    var n = this._state._setErrorValue(this, e, c, t);
                    return this._run(), n;
                  },
                  _setExceptionValue: function(e) {
                    var t = this._state._setErrorValue(this, e, h);
                    return this._run(), t;
                  },
                  _run: function() {
                    for (; this._nextState; )
                      (this._state = this._nextState),
                        (this._nextState = null),
                        this._state.enter(this);
                  },
                },
                { supportedForProcessing: !1 }
              ),
              j = n.Class.derive(
                Y,
                function(e) {
                  w && (!0 === w || w & D.thenPromise) && (this._stack = J._getStack()),
                    (this._creator = e),
                    this._setState(I),
                    this._run();
                },
                {
                  _creator: null,
                  _cancelAction: function() {
                    this._creator && this._creator.cancel();
                  },
                  _cleanupAction: function() {
                    this._creator = null;
                  },
                },
                { supportedForProcessing: !1 }
              ),
              V = n.Class.define(
                function(e) {
                  w && (!0 === w || w & D.errorPromise) && (this._stack = J._getStack()),
                    (this._value = e),
                    g(this, e, f);
                },
                {
                  cancel: function() {},
                  done: function(e, t) {
                    var n = this._value;
                    if (t)
                      try {
                        t.handlesOnError || g(null, n, l, this, t);
                        var r = t(n);
                        return void (
                          r &&
                          'object' == typeof r &&
                          'function' == typeof r.done &&
                          r.done()
                        );
                      } catch (e) {
                        n = e;
                      }
                    (n instanceof Error && n.message === M) || J._doneHandler(n);
                  },
                  then: function(e, t) {
                    if (!t) return this;
                    var n,
                      r = this._value;
                    try {
                      t.handlesOnError || g(null, r, l, this, t), (n = new z(t(r)));
                    } catch (e) {
                      n = e === r ? this : new H(e);
                    }
                    return n;
                  },
                },
                { supportedForProcessing: !1 }
              ),
              H = n.Class.derive(
                V,
                function(e) {
                  w && (!0 === w || w & D.exceptionPromise) && (this._stack = J._getStack()),
                    (this._value = e),
                    g(this, e, h);
                },
                {},
                { supportedForProcessing: !1 }
              ),
              z = n.Class.define(
                function(e) {
                  if (
                    (w && (!0 === w || w & D.completePromise) && (this._stack = J._getStack()),
                    e && 'object' == typeof e && 'function' == typeof e.then)
                  ) {
                    var t = new j(null);
                    return t._setCompleteValue(e), t;
                  }
                  this._value = e;
                },
                {
                  cancel: function() {},
                  done: function(e) {
                    if (e)
                      try {
                        var t = e(this._value);
                        t && 'object' == typeof t && 'function' == typeof t.done && t.done();
                      } catch (e) {
                        J._doneHandler(e);
                      }
                  },
                  then: function(e) {
                    try {
                      var t = e ? e(this._value) : this._value;
                      return t === this._value ? this : new z(t);
                    } catch (e) {
                      return new H(e);
                    }
                  },
                },
                { supportedForProcessing: !1 }
              ),
              J = n.Class.derive(
                Y,
                function(e, t) {
                  w && (!0 === w || w & D.promise) && (this._stack = J._getStack()),
                    (this._oncancel = t),
                    this._setState(I),
                    this._run();
                  try {
                    e(
                      this._completed.bind(this),
                      this._error.bind(this),
                      this._progress.bind(this)
                    );
                  } catch (e) {
                    this._setExceptionValue(e);
                  }
                },
                {
                  _oncancel: null,
                  _cancelAction: function() {
                    try {
                      if (!this._oncancel) throw new Error('Promise did not implement oncancel');
                      this._oncancel();
                    } catch (e) {
                      e.message, e.stack;
                      A.dispatchEvent('error', e);
                    }
                  },
                  _cleanupAction: function() {
                    this._oncancel = null;
                  },
                },
                {
                  addEventListener: function(e, t, n) {
                    A.addEventListener(e, t, n);
                  },
                  any: function(e) {
                    return new J(
                      function(t, n) {
                        var r = Object.keys(e);
                        0 === r.length && t();
                        var i = 0;
                        r.forEach(function(o) {
                          J.as(e[o]).then(
                            function() {
                              t({ key: o, value: e[o] });
                            },
                            function(s) {
                              s instanceof Error && s.name === M
                                ? ++i === r.length && t(J.cancel)
                                : n({ key: o, value: e[o] });
                            }
                          );
                        });
                      },
                      function() {
                        Object.keys(e).forEach(function(t) {
                          var n = J.as(e[t]);
                          'function' == typeof n.cancel && n.cancel();
                        });
                      }
                    );
                  },
                  as: function(e) {
                    return e && 'object' == typeof e && 'function' == typeof e.then ? e : new z(e);
                  },
                  cancel: {
                    get: function() {
                      return (B = B || new V(new r(M)));
                    },
                  },
                  dispatchEvent: function(e, t) {
                    return A.dispatchEvent(e, t);
                  },
                  is: function(e) {
                    return e && 'object' == typeof e && 'function' == typeof e.then;
                  },
                  join: function(e) {
                    return new J(
                      function(t, n, r) {
                        var i = Object.keys(e),
                          o = Array.isArray(e) ? [] : {},
                          s = Array.isArray(e) ? [] : {},
                          u = 0,
                          a = i.length,
                          l = function(e) {
                            if (0 == --a) {
                              var u = Object.keys(o).length;
                              if (0 === u) t(s);
                              else {
                                var l = 0;
                                i.forEach(function(e) {
                                  var t = o[e];
                                  t instanceof Error && t.name === M && l++;
                                }),
                                  l === u ? t(J.cancel) : n(o);
                              }
                            } else r({ Key: e, Done: !0 });
                          };
                        i.forEach(function(t) {
                          var n = e[t];
                          void 0 === n
                            ? u++
                            : J.then(
                                n,
                                function(e) {
                                  (s[t] = e), l(t);
                                },
                                function(e) {
                                  (o[t] = e), l(t);
                                }
                              );
                        }),
                          0 !== (a -= u) || t(s);
                      },
                      function() {
                        Object.keys(e).forEach(function(t) {
                          var n = J.as(e[t]);
                          'function' == typeof n.cancel && n.cancel();
                        });
                      }
                    );
                  },
                  removeEventListener: function(e, t, n) {
                    A.removeEventListener(e, t, n);
                  },
                  supportedForProcessing: !1,
                  then: function(e, t, n, r) {
                    return J.as(e).then(t, n, r);
                  },
                  thenEach: function(e, t, n, r) {
                    var i = Array.isArray(e) ? [] : {};
                    return (
                      Object.keys(e).forEach(function(o) {
                        i[o] = J.as(e[o]).then(t, n, r);
                      }),
                      J.join(i)
                    );
                  },
                  timeout: function(e, t) {
                    var n = L(e);
                    return t ? N(n, t) : n;
                  },
                  wrap: function(e) {
                    return new z(e);
                  },
                  wrapError: function(e) {
                    return new V(e);
                  },
                  _veryExpensiveTagWithStack: {
                    get: function() {
                      return w;
                    },
                    set: function(e) {
                      w = e;
                    },
                  },
                  _veryExpensiveTagWithStack_tag: D,
                  _getStack: function() {
                    if (e.Debug && e.Debug.debuggerEnabled)
                      try {
                        throw new Error();
                      } catch (e) {
                        return e.stack;
                      }
                  },
                  _cancelBlocker: function(e, t) {
                    if (!J.is(e)) return J.wrap(e);
                    var n,
                      r,
                      i = new J(
                        function(e, t) {
                          (n = e), (r = t);
                        },
                        function() {
                          (n = null), (r = null), t && t();
                        }
                      );
                    return (
                      e.then(
                        function(e) {
                          n && n(e);
                        },
                        function(e) {
                          r && r(e);
                        }
                      ),
                      i
                    );
                  },
                }
              );
            return (
              Object.defineProperties(J, i.createEventProperties(P)),
              (J._doneHandler = function(e) {
                t._setImmediate(function() {
                  throw e;
                });
              }),
              { PromiseStateMachine: Y, Promise: J, state_created: I }
            );
          }
        ),
        t('WinJS/Promise', ['WinJS/Core/_Base', 'WinJS/Promise/_StateMachine'], function(e, t) {
          'use strict';
          return e.Namespace.define('WinJS', { Promise: t.Promise }), t.Promise;
        });
      var n = e['WinJS/Core/_WinJS'];
      'undefined' == typeof exports && 'function' == typeof r && r.amd
        ? r('vs/base/common/winjs.base.raw', n)
        : (module.exports = n),
        'undefined' != typeof process &&
          'function' == typeof process.nextTick &&
          (e['WinJS/Core/_BaseCoreUtils']._setImmediate = function(e) {
            return process.nextTick(e);
          });
    })(),
    r(e[2], t([32]), function(e) {
      'use strict';
      return { Promise: e.Promise, TPromise: e.Promise, PPromise: e.Promise };
    }),
    r(e[8], t([1, 0, 4, 14, 2]), function(e, t, n, r, i) {
      'use strict';
      function o(e) {
        s(e) || t.errorHandler.onUnexpectedError(e);
      }
      function s(e) {
        return e instanceof Error && e.name === l && e.message === l;
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var u = {};
      i.TPromise.addEventListener('error', function(e) {
        var t = e.detail,
          n = t.id;
        t.parent
          ? t.handler && u && delete u[n]
          : ((u[n] = t),
            1 === Object.keys(u).length &&
              setTimeout(function() {
                var e = u;
                (u = {}),
                  Object.keys(e).forEach(function(t) {
                    var n = e[t];
                    n.exception ? o(n.exception) : n.error && o(n.error),
                      console.log('WARNING: Promise with no error callback:' + n.id),
                      console.log(n),
                      n.exception && console.log(n.exception.stack);
                  });
              }, 0));
      });
      var a = (function() {
        function e() {
          (this.listeners = []),
            (this.unexpectedErrorHandler = function(e) {
              n.setTimeout(function() {
                if (e.stack) throw new Error(e.message + '\n\n' + e.stack);
                throw e;
              }, 0);
            });
        }
        return (
          (e.prototype.addListener = function(e) {
            var t = this;
            return (
              this.listeners.push(e),
              function() {
                t._removeListener(e);
              }
            );
          }),
          (e.prototype.emit = function(e) {
            this.listeners.forEach(function(t) {
              t(e);
            });
          }),
          (e.prototype._removeListener = function(e) {
            this.listeners.splice(this.listeners.indexOf(e), 1);
          }),
          (e.prototype.setUnexpectedErrorHandler = function(e) {
            this.unexpectedErrorHandler = e;
          }),
          (e.prototype.getUnexpectedErrorHandler = function() {
            return this.unexpectedErrorHandler;
          }),
          (e.prototype.onUnexpectedError = function(e) {
            this.unexpectedErrorHandler(e), this.emit(e);
          }),
          (e.prototype.onUnexpectedExternalError = function(e) {
            this.unexpectedErrorHandler(e);
          }),
          e
        );
      })();
      (t.ErrorHandler = a),
        (t.errorHandler = new a()),
        (t.setUnexpectedErrorHandler = function(e) {
          t.errorHandler.setUnexpectedErrorHandler(e);
        }),
        (t.onUnexpectedError = o),
        (t.onUnexpectedExternalError = function(e) {
          s(e) || t.errorHandler.onUnexpectedExternalError(e);
        }),
        (t.onUnexpectedPromiseError = function(e) {
          return e.then(null, o);
        }),
        (t.transformErrorForSerialization = function(e) {
          return e instanceof Error
            ? { $isError: !0, name: e.name, message: e.message, stack: e.stacktrace || e.stack }
            : e;
        });
      var l = 'Canceled';
      (t.isPromiseCanceledError = s),
        (t.canceled = function() {
          var e = new Error(l);
          return (e.name = e.message), e;
        }),
        (t.notImplemented = function() {
          return new Error('Not Implemented');
        }),
        (t.illegalArgument = function(e) {
          return e ? new Error('Illegal argument: ' + e) : new Error('Illegal argument');
        }),
        (t.illegalState = function(e) {
          return e ? new Error('Illegal state: ' + e) : new Error('Illegal state');
        }),
        (t.readonly = function(e) {
          return e
            ? new Error("readonly property '" + e + " cannot be changed'")
            : new Error('readonly property cannot be changed');
        }),
        (t.create = function(e, t) {
          void 0 === t && (t = {});
          var n = new Error(e);
          return (
            r.isNumber(t.severity) && (n.severity = t.severity),
            t.actions && (n.actions = t.actions),
            n
          );
        }),
        (t.getErrorMessage = function(e) {
          return e
            ? e.message
              ? e.message
              : e.stack
              ? e.stack.split('\n')[0]
              : String(e)
            : 'Error';
        });
    }),
    r(e[15], t([1, 0, 8]), function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = (function() {
        function e() {}
        return (
          (e.prototype.add = function(e, t, n) {
            var r = this;
            void 0 === t && (t = null),
              this._callbacks || ((this._callbacks = []), (this._contexts = [])),
              this._callbacks.push(e),
              this._contexts.push(t),
              Array.isArray(n) &&
                n.push({
                  dispose: function() {
                    return r.remove(e, t);
                  },
                });
          }),
          (e.prototype.remove = function(e, t) {
            if ((void 0 === t && (t = null), this._callbacks)) {
              for (var n = !1, r = 0, i = this._callbacks.length; r < i; r++)
                if (this._callbacks[r] === e) {
                  if (this._contexts[r] === t)
                    return this._callbacks.splice(r, 1), void this._contexts.splice(r, 1);
                  n = !0;
                }
              if (n)
                throw new Error(
                  'When adding a listener with a context, you should remove it with the same context'
                );
            }
          }),
          (e.prototype.invoke = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            if (this._callbacks) {
              for (
                var r = [],
                  i = this._callbacks.slice(0),
                  o = this._contexts.slice(0),
                  s = 0,
                  u = i.length;
                s < u;
                s++
              )
                try {
                  r.push(i[s].apply(o[s], e));
                } catch (e) {
                  n.onUnexpectedError(e);
                }
              return r;
            }
          }),
          (e.prototype.isEmpty = function() {
            return !this._callbacks || 0 === this._callbacks.length;
          }),
          (e.prototype.entries = function() {
            var e = this;
            return this._callbacks
              ? this._callbacks.map(function(t, n) {
                  return [t, e._contexts[n]];
                })
              : [];
          }),
          (e.prototype.dispose = function() {
            (this._callbacks = void 0), (this._contexts = void 0);
          }),
          e
        );
      })();
      t.default = r;
    }),
    r(e[9], t([1, 0, 10, 15, 2, 11]), function(e, t, n, r, i, o) {
      'use strict';
      function s(e) {
        return function(t, n, r) {
          void 0 === n && (n = null);
          var i = e(
            function(e) {
              return i.dispose(), t.call(n, e);
            },
            null,
            r
          );
          return i;
        };
      }
      function u(e, t) {
        return function(n, r, i) {
          return (
            void 0 === r && (r = null),
            e(
              function(e) {
                return n.call(r, t(e));
              },
              null,
              i
            )
          );
        };
      }
      function a(e, t) {
        return function(n, r, i) {
          return (
            void 0 === r && (r = null),
            e(
              function(e) {
                return t(e) && n.call(r, e);
              },
              null,
              i
            )
          );
        };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var l;
      !(function(e) {
        var t = { dispose: function() {} };
        e.None = function() {
          return t;
        };
      })(l || (l = {})),
        (t.default = l);
      var c = (function() {
        function e(e) {
          this._options = e;
        }
        return (
          Object.defineProperty(e.prototype, 'event', {
            get: function() {
              var t = this;
              return (
                this._event ||
                  (this._event = function(n, i, o) {
                    t._callbacks || (t._callbacks = new r.default());
                    var s = t._callbacks.isEmpty();
                    s &&
                      t._options &&
                      t._options.onFirstListenerAdd &&
                      t._options.onFirstListenerAdd(t),
                      t._callbacks.add(n, i),
                      s &&
                        t._options &&
                        t._options.onFirstListenerDidAdd &&
                        t._options.onFirstListenerDidAdd(t),
                      t._options &&
                        t._options.onListenerDidAdd &&
                        t._options.onListenerDidAdd(t, n, i);
                    var u;
                    return (
                      (u = {
                        dispose: function() {
                          (u.dispose = e._noop),
                            t._disposed ||
                              (t._callbacks.remove(n, i),
                              t._options &&
                                t._options.onLastListenerRemove &&
                                t._callbacks.isEmpty() &&
                                t._options.onLastListenerRemove(t));
                        },
                      }),
                      Array.isArray(o) && o.push(u),
                      u
                    );
                  }),
                this._event
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.fire = function(e) {
            this._callbacks && this._callbacks.invoke.call(this._callbacks, e);
          }),
          (e.prototype.dispose = function() {
            this._callbacks &&
              (this._callbacks.dispose(), (this._callbacks = void 0), (this._disposed = !0));
          }),
          (e._noop = function() {}),
          e
        );
      })();
      t.Emitter = c;
      var f = (function() {
        function e() {
          var e = this;
          (this.hasListeners = !1),
            (this.events = []),
            (this.emitter = new c({
              onFirstListenerAdd: function() {
                return e.onFirstListenerAdd();
              },
              onLastListenerRemove: function() {
                return e.onLastListenerRemove();
              },
            }));
        }
        return (
          Object.defineProperty(e.prototype, 'event', {
            get: function() {
              return this.emitter.event;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.add = function(e) {
            var t = this,
              r = { event: e, listener: null };
            this.events.push(r), this.hasListeners && this.hook(r);
            return n.toDisposable(
              o.once(function() {
                t.hasListeners && t.unhook(r);
                var e = t.events.indexOf(r);
                t.events.splice(e, 1);
              })
            );
          }),
          (e.prototype.onFirstListenerAdd = function() {
            var e = this;
            (this.hasListeners = !0),
              this.events.forEach(function(t) {
                return e.hook(t);
              });
          }),
          (e.prototype.onLastListenerRemove = function() {
            var e = this;
            (this.hasListeners = !1),
              this.events.forEach(function(t) {
                return e.unhook(t);
              });
          }),
          (e.prototype.hook = function(e) {
            var t = this;
            e.listener = e.event(function(e) {
              return t.emitter.fire(e);
            });
          }),
          (e.prototype.unhook = function(e) {
            e.listener.dispose(), (e.listener = null);
          }),
          (e.prototype.dispose = function() {
            this.emitter.dispose();
          }),
          e
        );
      })();
      (t.EventMultiplexer = f),
        (t.fromEventEmitter = function(e, t) {
          return function(n, r, i) {
            var o = e.addListener(t, function() {
              n.apply(r, arguments);
            });
            return Array.isArray(i) && i.push(o), o;
          };
        }),
        (t.fromCallback = function(e) {
          var t,
            n = new c({
              onFirstListenerAdd: function() {
                return (t = e(function(e) {
                  return n.fire(e);
                }));
              },
              onLastListenerRemove: function() {
                return t.dispose();
              },
            });
          return n.event;
        }),
        (t.fromPromise = function(e) {
          var t = new c(),
            n = !1;
          return (
            e
              .then(null, function() {
                return null;
              })
              .then(function() {
                n
                  ? t.fire()
                  : setTimeout(function() {
                      return t.fire();
                    }, 0);
              }),
            (n = !0),
            t.event
          );
        }),
        (t.toPromise = function(e) {
          return new i.TPromise(function(t) {
            var n = e(function(e) {
              n.dispose(), t(e);
            });
          });
        }),
        (t.delayed = function(e) {
          var t = null,
            n = null,
            r = new c({
              onFirstListenerAdd: function() {
                t = e.then(
                  function(e) {
                    return (n = e(function(e) {
                      return r.fire(e);
                    }));
                  },
                  function() {
                    return null;
                  }
                );
              },
              onLastListenerRemove: function() {
                t && (t.cancel(), (t = null)), n && (n.dispose(), (n = null));
              },
            });
          return r.event;
        }),
        (t.once = s),
        (t.any = function() {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          return function(t, r, i) {
            return (
              void 0 === r && (r = null),
              n.combinedDisposable(
                e.map(function(e) {
                  return e(
                    function(e) {
                      return t.call(r, e);
                    },
                    null,
                    i
                  );
                })
              )
            );
          };
        }),
        (t.debounceEvent = function(e, t, n, r) {
          void 0 === n && (n = 100), void 0 === r && (r = !1);
          var i,
            o,
            s,
            u = 0,
            a = new c({
              onFirstListenerAdd: function() {
                i = e(function(e) {
                  u++,
                    (o = t(o, e)),
                    !s && r && a.fire(o),
                    clearTimeout(s),
                    (s = setTimeout(function() {
                      var e = o;
                      (o = void 0), (!r || u > 1) && a.fire(e), (s = null), (u = 0);
                    }, n));
                });
              },
              onLastListenerRemove: function() {
                i.dispose();
              },
            });
          return a.event;
        });
      var h = (function() {
        function e() {
          this.buffers = [];
        }
        return (
          (e.prototype.wrapEvent = function(e) {
            var t = this;
            return function(n, r, i) {
              return e(
                function(e) {
                  var i = t.buffers[t.buffers.length - 1];
                  i
                    ? i.push(function() {
                        return n.call(r, e);
                      })
                    : n.call(r, e);
                },
                void 0,
                i
              );
            };
          }),
          (e.prototype.bufferEvents = function(e) {
            var t = [];
            this.buffers.push(t),
              e(),
              this.buffers.pop(),
              t.forEach(function(e) {
                return e();
              });
          }),
          e
        );
      })();
      (t.EventBufferer = h), (t.mapEvent = u), (t.filterEvent = a);
      var d = (function() {
        function e(e) {
          this._event = e;
        }
        return (
          Object.defineProperty(e.prototype, 'event', {
            get: function() {
              return this._event;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.map = function(t) {
            return new e(u(this._event, t));
          }),
          (e.prototype.filter = function(t) {
            return new e(a(this._event, t));
          }),
          (e.prototype.on = function(e, t, n) {
            return this._event(e, t, n);
          }),
          e
        );
      })();
      (t.chain = function(e) {
        return new d(e);
      }),
        (t.stopwatch = function(e) {
          var t = new Date().getTime();
          return u(s(e), function(e) {
            return new Date().getTime() - t;
          });
        }),
        (t.buffer = function(e, t, n) {
          void 0 === t && (t = !1), void 0 === n && (n = []), (n = n.slice());
          var r = e(function(e) {
              n ? n.push(e) : o.fire(e);
            }),
            i = function() {
              n.forEach(function(e) {
                return o.fire(e);
              }),
                (n = null);
            },
            o = new c({
              onFirstListenerAdd: function() {
                r ||
                  (r = e(function(e) {
                    return o.fire(e);
                  }));
              },
              onFirstListenerDidAdd: function() {
                n && (t ? setTimeout(i) : i());
              },
              onLastListenerRemove: function() {
                r.dispose(), (r = null);
              },
            });
          return o.event;
        }),
        (t.echo = function(e, t, n) {
          void 0 === t && (t = !1),
            void 0 === n && (n = []),
            (n = n.slice()),
            e(function(e) {
              n.push(e), i.fire(e);
            });
          var r = function(e, t) {
              return n.forEach(function(n) {
                return e.call(t, n);
              });
            },
            i = new c({
              onListenerDidAdd: function(e, n, i) {
                t
                  ? setTimeout(function() {
                      return r(n, i);
                    })
                  : r(n, i);
              },
            });
          return i.event;
        });
    }),
    r(e[13], t([1, 0, 9]), function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i = Object.freeze(function(e, t) {
          var n = setTimeout(e.bind(t), 0);
          return {
            dispose: function() {
              clearTimeout(n);
            },
          };
        });
      !(function(e) {
        (e.None = Object.freeze({
          isCancellationRequested: !1,
          onCancellationRequested: n.default.None,
        })),
          (e.Cancelled = Object.freeze({
            isCancellationRequested: !0,
            onCancellationRequested: i,
          }));
      })((r = t.CancellationToken || (t.CancellationToken = {})));
      var o = (function() {
          function e() {
            this._isCancelled = !1;
          }
          return (
            (e.prototype.cancel = function() {
              this._isCancelled ||
                ((this._isCancelled = !0),
                this._emitter && (this._emitter.fire(void 0), (this._emitter = void 0)));
            }),
            Object.defineProperty(e.prototype, 'isCancellationRequested', {
              get: function() {
                return this._isCancelled;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, 'onCancellationRequested', {
              get: function() {
                return this._isCancelled
                  ? i
                  : (this._emitter || (this._emitter = new n.Emitter()), this._emitter.event);
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(),
        s = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, 'token', {
              get: function() {
                return this._token || (this._token = new o()), this._token;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.cancel = function() {
              this._token ? this._token.cancel() : (this._token = r.Cancelled);
            }),
            (e.prototype.dispose = function() {
              this.cancel();
            }),
            e
          );
        })();
      t.CancellationTokenSource = s;
    }),
    r(e[18], t([1, 0, 8, 4, 2, 13, 10, 9]), function(e, t, n, r, i, s, u, a) {
      'use strict';
      function l(e) {
        return e && 'function' == typeof e.then;
      }
      function c(e, t) {
        return new i.TPromise(
          function(r, i, o) {
            e.done(
              function(e) {
                try {
                  t(e);
                } catch (e) {
                  n.onUnexpectedError(e);
                }
                r(e);
              },
              function(e) {
                try {
                  t(e);
                } catch (e) {
                  n.onUnexpectedError(e);
                }
                i(e);
              },
              function(e) {
                o(e);
              }
            );
          },
          function() {
            e.cancel();
          }
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.toThenable = function(e) {
          return l(e) ? e : i.TPromise.as(e);
        }),
        (t.asWinJsPromise = function(e) {
          var t = new s.CancellationTokenSource();
          return new i.TPromise(
            function(n, r, o) {
              var s = e(t.token);
              s instanceof i.TPromise ? s.then(n, r, o) : l(s) ? s.then(n, r) : n(s);
            },
            function() {
              t.cancel();
            }
          );
        }),
        (t.wireCancellationToken = function(e, t, r) {
          var o = e.onCancellationRequested(function() {
            return t.cancel();
          });
          return (
            r &&
              (t = t.then(void 0, function(e) {
                if (!n.isPromiseCanceledError(e)) return i.TPromise.wrapError(e);
              })),
            c(t, function() {
              return o.dispose();
            })
          );
        });
      var f = (function() {
        function e() {
          (this.activePromise = null),
            (this.queuedPromise = null),
            (this.queuedPromiseFactory = null);
        }
        return (
          (e.prototype.queue = function(e) {
            var t = this;
            if (this.activePromise) {
              if (((this.queuedPromiseFactory = e), !this.queuedPromise)) {
                var n = function() {
                  t.queuedPromise = null;
                  var e = t.queue(t.queuedPromiseFactory);
                  return (t.queuedPromiseFactory = null), e;
                };
                this.queuedPromise = new i.TPromise(
                  function(e, r, i) {
                    t.activePromise.then(n, n, i).done(e);
                  },
                  function() {
                    t.activePromise.cancel();
                  }
                );
              }
              return new i.TPromise(
                function(e, n, r) {
                  t.queuedPromise.then(e, n, r);
                },
                function() {}
              );
            }
            return (
              (this.activePromise = e()),
              new i.TPromise(
                function(e, n, r) {
                  t.activePromise.done(
                    function(n) {
                      (t.activePromise = null), e(n);
                    },
                    function(e) {
                      (t.activePromise = null), n(e);
                    },
                    r
                  );
                },
                function() {
                  t.activePromise.cancel();
                }
              )
            );
          }),
          e
        );
      })();
      t.Throttler = f;
      var h = (function() {
        function e() {
          this.current = i.TPromise.as(null);
        }
        return (
          (e.prototype.queue = function(e) {
            return (this.current = this.current.then(function() {
              return e();
            }));
          }),
          e
        );
      })();
      t.SimpleThrottler = h;
      var d = (function() {
        function e(e) {
          (this.defaultDelay = e),
            (this.timeout = null),
            (this.completionPromise = null),
            (this.onSuccess = null),
            (this.task = null);
        }
        return (
          (e.prototype.trigger = function(e, t) {
            var n = this;
            return (
              void 0 === t && (t = this.defaultDelay),
              (this.task = e),
              this.cancelTimeout(),
              this.completionPromise ||
                (this.completionPromise = new i.TPromise(
                  function(e) {
                    n.onSuccess = e;
                  },
                  function() {}
                ).then(function() {
                  (n.completionPromise = null), (n.onSuccess = null);
                  var e = n.task;
                  return (n.task = null), e();
                })),
              (this.timeout = setTimeout(function() {
                (n.timeout = null), n.onSuccess(null);
              }, t)),
              this.completionPromise
            );
          }),
          (e.prototype.isTriggered = function() {
            return null !== this.timeout;
          }),
          (e.prototype.cancel = function() {
            this.cancelTimeout(),
              this.completionPromise &&
                (this.completionPromise.cancel(), (this.completionPromise = null));
          }),
          (e.prototype.cancelTimeout = function() {
            null !== this.timeout && (clearTimeout(this.timeout), (this.timeout = null));
          }),
          e
        );
      })();
      t.Delayer = d;
      var p = (function(e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.throttler = new f()), n;
        }
        return (
          o(t, e),
          (t.prototype.trigger = function(t, n) {
            var r = this;
            return e.prototype.trigger.call(
              this,
              function() {
                return r.throttler.queue(t);
              },
              n
            );
          }),
          t
        );
      })(d);
      t.ThrottledDelayer = p;
      var m = (function(e) {
        function t(t, n) {
          void 0 === n && (n = 0);
          var r = e.call(this, t) || this;
          return (r.minimumPeriod = n), (r.periodThrottler = new f()), r;
        }
        return (
          o(t, e),
          (t.prototype.trigger = function(t, n) {
            var r = this;
            return e.prototype.trigger.call(
              this,
              function() {
                return r.periodThrottler.queue(function() {
                  return i.Promise.join([i.TPromise.timeout(r.minimumPeriod), t()]).then(function(
                    e
                  ) {
                    return e[1];
                  });
                });
              },
              n
            );
          }),
          t
        );
      })(p);
      t.PeriodThrottledDelayer = m;
      var _ = (function() {
        function e() {
          var e = this;
          this._value = new i.TPromise(function(t, n) {
            (e._completeCallback = t), (e._errorCallback = n);
          });
        }
        return (
          Object.defineProperty(e.prototype, 'value', {
            get: function() {
              return this._value;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.complete = function(e) {
            this._completeCallback(e);
          }),
          (e.prototype.error = function(e) {
            this._errorCallback(e);
          }),
          e
        );
      })();
      t.PromiseSource = _;
      var g = (function(e) {
        function t(t) {
          var r,
            i,
            o,
            s = this;
          return (
            (s =
              e.call(
                this,
                function(e, t, n) {
                  (r = e), (i = t), (o = n);
                },
                function() {
                  i(n.canceled());
                }
              ) || this),
            t.then(r, i, o),
            s
          );
        }
        return o(t, e), t;
      })(i.TPromise);
      (t.ShallowCancelThenPromise = g),
        (t.always = c),
        (t.sequence = function(e) {
          function t() {
            return e.length ? e.pop()() : null;
          }
          function n(e) {
            void 0 !== e && null !== e && r.push(e);
            var o = t();
            return o ? o.then(n) : i.TPromise.as(r);
          }
          var r = [];
          return (e = e.reverse()), i.TPromise.as(null).then(n);
        }),
        (t.first = function(e, t) {
          void 0 === t &&
            (t = function(e) {
              return !!e;
            }),
            (e = e.reverse().slice());
          var n = function() {
            return 0 === e.length
              ? i.TPromise.as(null)
              : e
                  .pop()()
                  .then(function(e) {
                    return t(e) ? i.TPromise.as(e) : n();
                  });
          };
          return n();
        });
      var v = (function() {
        function e(e) {
          (this.maxDegreeOfParalellism = e),
            (this.outstandingPromises = []),
            (this.runningPromises = 0),
            (this._onFinished = new a.Emitter());
        }
        return (
          Object.defineProperty(e.prototype, 'onFinished', {
            get: function() {
              return this._onFinished.event;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.queue = function(e) {
            var t = this;
            return new i.TPromise(function(n, r, i) {
              t.outstandingPromises.push({ factory: e, c: n, e: r, p: i }), t.consume();
            });
          }),
          (e.prototype.consume = function() {
            for (
              var e = this;
              this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism;

            ) {
              var t = this.outstandingPromises.shift();
              this.runningPromises++;
              var n = t.factory();
              n.done(t.c, t.e, t.p),
                n.done(
                  function() {
                    return e.consumed();
                  },
                  function() {
                    return e.consumed();
                  }
                );
            }
          }),
          (e.prototype.consumed = function() {
            this.runningPromises--,
              this.outstandingPromises.length > 0 ? this.consume() : this._onFinished.fire();
          }),
          (e.prototype.dispose = function() {
            this._onFinished.dispose();
          }),
          e
        );
      })();
      t.Limiter = v;
      var y = (function(e) {
        function t() {
          return e.call(this, 1) || this;
        }
        return o(t, e), t;
      })(v);
      (t.Queue = y),
        (t.setDisposableTimeout = function(e, t) {
          for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
          var i = setTimeout.apply(void 0, [e, t].concat(n));
          return {
            dispose: function() {
              clearTimeout(i);
            },
          };
        });
      var b = (function(e) {
        function t() {
          var t = e.call(this) || this;
          return (t._token = -1), t;
        }
        return (
          o(t, e),
          (t.prototype.dispose = function() {
            this.cancel(), e.prototype.dispose.call(this);
          }),
          (t.prototype.cancel = function() {
            -1 !== this._token && (r.clearTimeout(this._token), (this._token = -1));
          }),
          (t.prototype.cancelAndSet = function(e, t) {
            var n = this;
            this.cancel(),
              (this._token = r.setTimeout(function() {
                (n._token = -1), e();
              }, t));
          }),
          (t.prototype.setIfNotSet = function(e, t) {
            var n = this;
            -1 === this._token &&
              (this._token = r.setTimeout(function() {
                (n._token = -1), e();
              }, t));
          }),
          t
        );
      })(u.Disposable);
      t.TimeoutTimer = b;
      var C = (function(e) {
        function t() {
          var t = e.call(this) || this;
          return (t._token = -1), t;
        }
        return (
          o(t, e),
          (t.prototype.dispose = function() {
            this.cancel(), e.prototype.dispose.call(this);
          }),
          (t.prototype.cancel = function() {
            -1 !== this._token && (r.clearInterval(this._token), (this._token = -1));
          }),
          (t.prototype.cancelAndSet = function(e, t) {
            this.cancel(),
              (this._token = r.setInterval(function() {
                e();
              }, t));
          }),
          t
        );
      })(u.Disposable);
      t.IntervalTimer = C;
      var E = (function() {
        function e(e, t) {
          (this.timeoutToken = -1),
            (this.runner = e),
            (this.timeout = t),
            (this.timeoutHandler = this.onTimeout.bind(this));
        }
        return (
          (e.prototype.dispose = function() {
            this.cancel(), (this.runner = null);
          }),
          (e.prototype.cancel = function() {
            this.isScheduled() && (r.clearTimeout(this.timeoutToken), (this.timeoutToken = -1));
          }),
          (e.prototype.setRunner = function(e) {
            this.runner = e;
          }),
          (e.prototype.schedule = function(e) {
            void 0 === e && (e = this.timeout),
              this.cancel(),
              (this.timeoutToken = r.setTimeout(this.timeoutHandler, e));
          }),
          (e.prototype.isScheduled = function() {
            return -1 !== this.timeoutToken;
          }),
          (e.prototype.onTimeout = function() {
            (this.timeoutToken = -1), this.runner && this.runner();
          }),
          e
        );
      })();
      (t.RunOnceScheduler = E),
        (t.nfcall = function(e) {
          for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
          return new i.TPromise(
            function(n, r) {
              return e.apply(
                void 0,
                t.concat([
                  function(e, t) {
                    return e ? r(e) : n(t);
                  },
                ])
              );
            },
            function() {
              return null;
            }
          );
        }),
        (t.ninvoke = function(e, t) {
          for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
          return new i.TPromise(
            function(r, i) {
              return t.call.apply(
                t,
                [e].concat(n, [
                  function(e, t) {
                    return e ? i(e) : r(t);
                  },
                ])
              );
            },
            function() {
              return null;
            }
          );
        });
    }),
    r(e[31], t([1, 0, 8, 10, 2, 18, 4]), function(e, t, n, r, i, s, u) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var a = '$initialize',
        l = !1;
      t.logOnceWebWorkerWarning = function(e) {
        u.isWeb &&
          (l ||
            ((l = !0),
            console.warn(
              'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/Microsoft/monaco-editor#faq'
            )),
          console.warn(e.message));
      };
      var c = (function() {
          function e(e) {
            (this._workerId = -1),
              (this._handler = e),
              (this._lastSentReq = 0),
              (this._pendingReplies = Object.create(null));
          }
          return (
            (e.prototype.setWorkerId = function(e) {
              this._workerId = e;
            }),
            (e.prototype.sendMessage = function(e, t) {
              var n = String(++this._lastSentReq),
                r = { c: null, e: null },
                o = new i.TPromise(
                  function(e, t, n) {
                    (r.c = e), (r.e = t);
                  },
                  function() {}
                );
              return (
                (this._pendingReplies[n] = r),
                this._send({ vsWorker: this._workerId, req: n, method: e, args: t }),
                o
              );
            }),
            (e.prototype.handleMessage = function(e) {
              var t;
              try {
                t = JSON.parse(e);
              } catch (e) {}
              t.vsWorker &&
                ((-1 !== this._workerId && t.vsWorker !== this._workerId) ||
                  this._handleMessage(t));
            }),
            (e.prototype._handleMessage = function(e) {
              var t = this;
              if (e.seq) {
                var r = e;
                if (!this._pendingReplies[r.seq])
                  return void console.warn('Got reply to unknown seq');
                var i = this._pendingReplies[r.seq];
                if ((delete this._pendingReplies[r.seq], r.err)) {
                  var o = r.err;
                  return (
                    r.err.$isError &&
                      (((o = new Error()).name = r.err.name),
                      (o.message = r.err.message),
                      (o.stack = r.err.stack)),
                    void i.e(o)
                  );
                }
                i.c(r.res);
              } else {
                var s = e,
                  u = s.req;
                this._handler.handleMessage(s.method, s.args).then(
                  function(e) {
                    t._send({ vsWorker: t._workerId, seq: u, res: e, err: void 0 });
                  },
                  function(e) {
                    t._send({
                      vsWorker: t._workerId,
                      seq: u,
                      res: void 0,
                      err: n.transformErrorForSerialization(e),
                    });
                  }
                );
              }
            }),
            (e.prototype._send = function(e) {
              var t = JSON.stringify(e);
              this._handler.sendMessage(t);
            }),
            e
          );
        })(),
        f = (function(e) {
          function t(t, n) {
            var r = e.call(this) || this;
            r._lastRequestTimestamp = -1;
            var o = null,
              s = null;
            (r._worker = r._register(
              t.create(
                'vs/base/common/worker/simpleWorker',
                function(e) {
                  r._protocol.handleMessage(e);
                },
                function(e) {
                  s(e);
                }
              )
            )),
              (r._protocol = new c({
                sendMessage: function(e) {
                  r._worker.postMessage(e);
                },
                handleMessage: function(e, t) {
                  return i.TPromise.as(null);
                },
              })),
              r._protocol.setWorkerId(r._worker.getId());
            var u = null,
              l = self.require;
            'function' == typeof l.getConfig
              ? (u = l.getConfig())
              : void 0 !== self.requirejs && (u = self.requirejs.s.contexts._.config),
              (r._lazyProxy = new i.TPromise(
                function(e, t, n) {
                  (o = e), (s = t);
                },
                function() {}
              )),
              (r._onModuleLoaded = r._protocol.sendMessage(a, [r._worker.getId(), n, u])),
              r._onModuleLoaded.then(
                function(e) {
                  for (var t = {}, n = 0; n < e.length; n++) t[e[n]] = h(e[n], f);
                  o(t);
                },
                function(e) {
                  s(e), r._onError('Worker failed to load ' + n, e);
                }
              );
            var f = function(e, t) {
                return r._request(e, t);
              },
              h = function(e, t) {
                return function() {
                  var n = Array.prototype.slice.call(arguments, 0);
                  return t(e, n);
                };
              };
            return r;
          }
          return (
            o(t, e),
            (t.prototype.getProxyObject = function() {
              return new s.ShallowCancelThenPromise(this._lazyProxy);
            }),
            (t.prototype.getLastRequestTimestamp = function() {
              return this._lastRequestTimestamp;
            }),
            (t.prototype._request = function(e, t) {
              var n = this;
              return new i.TPromise(
                function(r, i, o) {
                  n._onModuleLoaded.then(function() {
                    (n._lastRequestTimestamp = Date.now()),
                      n._protocol.sendMessage(e, t).then(r, i);
                  }, i);
                },
                function() {}
              );
            }),
            (t.prototype._onError = function(e, t) {
              console.error(e), console.info(t);
            }),
            t
          );
        })(r.Disposable);
      t.SimpleWorkerClient = f;
      var h = (function() {
        function t(e) {
          var t = this;
          this._protocol = new c({
            sendMessage: function(t) {
              e(t);
            },
            handleMessage: function(e, n) {
              return t._handleMessage(e, n);
            },
          });
        }
        return (
          (t.prototype.onmessage = function(e) {
            this._protocol.handleMessage(e);
          }),
          (t.prototype._handleMessage = function(e, t) {
            if (e === a) return this.initialize(t[0], t[1], t[2]);
            if (!this._requestHandler || 'function' != typeof this._requestHandler[e])
              return i.TPromise.wrapError(new Error('Missing requestHandler or method: ' + e));
            try {
              return i.TPromise.as(this._requestHandler[e].apply(this._requestHandler, t));
            } catch (e) {
              return i.TPromise.wrapError(e);
            }
          }),
          (t.prototype.initialize = function(t, n, r) {
            var o = this;
            if ((this._protocol.setWorkerId(t), r)) {
              void 0 !== r.baseUrl && delete r.baseUrl,
                void 0 !== r.paths && void 0 !== r.paths.vs && delete r.paths.vs;
              var s = r['vs/nls'];
              s &&
                s.pseudo &&
                e(['vs/nls'], function(e) {
                  e.setPseudoTranslation(s.pseudo);
                }),
                (r.catchError = !0),
                self.require.config(r);
            }
            var u,
              a,
              l = new i.TPromise(function(e, t, n) {
                (u = e), (a = t);
              });
            return (
              self.require(
                [n],
                function() {
                  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                  var n = e[0];
                  o._requestHandler = n.create();
                  var r = [];
                  for (var i in o._requestHandler)
                    'function' == typeof o._requestHandler[i] && r.push(i);
                  u(r);
                },
                a
              ),
              l
            );
          }),
          t
        );
      })();
      (t.SimpleWorkerServer = h),
        (t.create = function(e) {
          return new h(e);
        });
    }),
    r(e[3], t([1, 0]), function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = (function() {
        function e(e, t) {
          (this.lineNumber = e), (this.column = t);
        }
        return (
          (e.prototype.equals = function(t) {
            return e.equals(this, t);
          }),
          (e.equals = function(e, t) {
            return (
              (!e && !t) || (!!e && !!t && e.lineNumber === t.lineNumber && e.column === t.column)
            );
          }),
          (e.prototype.isBefore = function(t) {
            return e.isBefore(this, t);
          }),
          (e.isBefore = function(e, t) {
            return (
              e.lineNumber < t.lineNumber || (!(t.lineNumber < e.lineNumber) && e.column < t.column)
            );
          }),
          (e.prototype.isBeforeOrEqual = function(t) {
            return e.isBeforeOrEqual(this, t);
          }),
          (e.isBeforeOrEqual = function(e, t) {
            return (
              e.lineNumber < t.lineNumber ||
              (!(t.lineNumber < e.lineNumber) && e.column <= t.column)
            );
          }),
          (e.compare = function(e, t) {
            var n = 0 | e.lineNumber,
              r = 0 | t.lineNumber;
            return n === r ? (0 | e.column) - (0 | t.column) : n - r;
          }),
          (e.prototype.clone = function() {
            return new e(this.lineNumber, this.column);
          }),
          (e.prototype.toString = function() {
            return '(' + this.lineNumber + ',' + this.column + ')';
          }),
          (e.lift = function(t) {
            return new e(t.lineNumber, t.column);
          }),
          (e.isIPosition = function(e) {
            return e && 'number' == typeof e.lineNumber && 'number' == typeof e.column;
          }),
          e
        );
      })();
      t.Position = n;
    }),
    r(e[5], t([1, 0, 3]), function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = (function() {
        function e(e, t, n, r) {
          e > n || (e === n && t > r)
            ? ((this.startLineNumber = n),
              (this.startColumn = r),
              (this.endLineNumber = e),
              (this.endColumn = t))
            : ((this.startLineNumber = e),
              (this.startColumn = t),
              (this.endLineNumber = n),
              (this.endColumn = r));
        }
        return (
          (e.prototype.isEmpty = function() {
            return e.isEmpty(this);
          }),
          (e.isEmpty = function(e) {
            return e.startLineNumber === e.endLineNumber && e.startColumn === e.endColumn;
          }),
          (e.prototype.containsPosition = function(t) {
            return e.containsPosition(this, t);
          }),
          (e.containsPosition = function(e, t) {
            return (
              !(t.lineNumber < e.startLineNumber || t.lineNumber > e.endLineNumber) &&
              (!(t.lineNumber === e.startLineNumber && t.column < e.startColumn) &&
                !(t.lineNumber === e.endLineNumber && t.column > e.endColumn))
            );
          }),
          (e.prototype.containsRange = function(t) {
            return e.containsRange(this, t);
          }),
          (e.containsRange = function(e, t) {
            return (
              !(t.startLineNumber < e.startLineNumber || t.endLineNumber < e.startLineNumber) &&
              (!(t.startLineNumber > e.endLineNumber || t.endLineNumber > e.endLineNumber) &&
                (!(t.startLineNumber === e.startLineNumber && t.startColumn < e.startColumn) &&
                  !(t.endLineNumber === e.endLineNumber && t.endColumn > e.endColumn)))
            );
          }),
          (e.prototype.plusRange = function(t) {
            return e.plusRange(this, t);
          }),
          (e.plusRange = function(t, n) {
            var r, i, o, s;
            return (
              n.startLineNumber < t.startLineNumber
                ? ((r = n.startLineNumber), (i = n.startColumn))
                : n.startLineNumber === t.startLineNumber
                ? ((r = n.startLineNumber), (i = Math.min(n.startColumn, t.startColumn)))
                : ((r = t.startLineNumber), (i = t.startColumn)),
              n.endLineNumber > t.endLineNumber
                ? ((o = n.endLineNumber), (s = n.endColumn))
                : n.endLineNumber === t.endLineNumber
                ? ((o = n.endLineNumber), (s = Math.max(n.endColumn, t.endColumn)))
                : ((o = t.endLineNumber), (s = t.endColumn)),
              new e(r, i, o, s)
            );
          }),
          (e.prototype.intersectRanges = function(t) {
            return e.intersectRanges(this, t);
          }),
          (e.intersectRanges = function(t, n) {
            var r = t.startLineNumber,
              i = t.startColumn,
              o = t.endLineNumber,
              s = t.endColumn,
              u = n.startLineNumber,
              a = n.startColumn,
              l = n.endLineNumber,
              c = n.endColumn;
            return (
              r < u ? ((r = u), (i = a)) : r === u && (i = Math.max(i, a)),
              o > l ? ((o = l), (s = c)) : o === l && (s = Math.min(s, c)),
              r > o ? null : r === o && i > s ? null : new e(r, i, o, s)
            );
          }),
          (e.prototype.equalsRange = function(t) {
            return e.equalsRange(this, t);
          }),
          (e.equalsRange = function(e, t) {
            return (
              !!e &&
              !!t &&
              e.startLineNumber === t.startLineNumber &&
              e.startColumn === t.startColumn &&
              e.endLineNumber === t.endLineNumber &&
              e.endColumn === t.endColumn
            );
          }),
          (e.prototype.getEndPosition = function() {
            return new n.Position(this.endLineNumber, this.endColumn);
          }),
          (e.prototype.getStartPosition = function() {
            return new n.Position(this.startLineNumber, this.startColumn);
          }),
          (e.prototype.cloneRange = function() {
            return new e(
              this.startLineNumber,
              this.startColumn,
              this.endLineNumber,
              this.endColumn
            );
          }),
          (e.prototype.toString = function() {
            return (
              '[' +
              this.startLineNumber +
              ',' +
              this.startColumn +
              ' -> ' +
              this.endLineNumber +
              ',' +
              this.endColumn +
              ']'
            );
          }),
          (e.prototype.setEndPosition = function(t, n) {
            return new e(this.startLineNumber, this.startColumn, t, n);
          }),
          (e.prototype.setStartPosition = function(t, n) {
            return new e(t, n, this.endLineNumber, this.endColumn);
          }),
          (e.prototype.collapseToStart = function() {
            return e.collapseToStart(this);
          }),
          (e.collapseToStart = function(t) {
            return new e(t.startLineNumber, t.startColumn, t.startLineNumber, t.startColumn);
          }),
          (e.fromPositions = function(t, n) {
            return void 0 === n && (n = t), new e(t.lineNumber, t.column, n.lineNumber, n.column);
          }),
          (e.lift = function(t) {
            return t ? new e(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : null;
          }),
          (e.isIRange = function(e) {
            return (
              e &&
              'number' == typeof e.startLineNumber &&
              'number' == typeof e.startColumn &&
              'number' == typeof e.endLineNumber &&
              'number' == typeof e.endColumn
            );
          }),
          (e.areIntersectingOrTouching = function(e, t) {
            return (
              !(
                e.endLineNumber < t.startLineNumber ||
                (e.endLineNumber === t.startLineNumber && e.endColumn < t.startColumn)
              ) &&
              !(
                t.endLineNumber < e.startLineNumber ||
                (t.endLineNumber === e.startLineNumber && t.endColumn < e.startColumn)
              )
            );
          }),
          (e.compareRangesUsingStarts = function(e, t) {
            var n = 0 | e.startLineNumber,
              r = 0 | t.startLineNumber;
            if (n === r) {
              var i = 0 | e.startColumn,
                o = 0 | t.startColumn;
              if (i === o) {
                var s = 0 | e.endLineNumber,
                  u = 0 | t.endLineNumber;
                return s === u ? (0 | e.endColumn) - (0 | t.endColumn) : s - u;
              }
              return i - o;
            }
            return n - r;
          }),
          (e.compareRangesUsingEnds = function(e, t) {
            return e.endLineNumber === t.endLineNumber
              ? e.endColumn === t.endColumn
                ? e.startLineNumber === t.startLineNumber
                  ? e.startColumn - t.startColumn
                  : e.startLineNumber - t.startLineNumber
                : e.endColumn - t.endColumn
              : e.endLineNumber - t.endLineNumber;
          }),
          (e.spansMultipleLines = function(e) {
            return e.endLineNumber > e.startLineNumber;
          }),
          e
        );
      })();
      t.Range = r;
    }),
    r(e[22], t([1, 0, 5, 3]), function(e, t, n, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i;
      !(function(e) {
        (e[(e.LTR = 0)] = 'LTR'), (e[(e.RTL = 1)] = 'RTL');
      })((i = t.SelectionDirection || (t.SelectionDirection = {})));
      var s = (function(e) {
        function t(t, n, r, i) {
          var o = e.call(this, t, n, r, i) || this;
          return (
            (o.selectionStartLineNumber = t),
            (o.selectionStartColumn = n),
            (o.positionLineNumber = r),
            (o.positionColumn = i),
            o
          );
        }
        return (
          o(t, e),
          (t.prototype.clone = function() {
            return new t(
              this.selectionStartLineNumber,
              this.selectionStartColumn,
              this.positionLineNumber,
              this.positionColumn
            );
          }),
          (t.prototype.toString = function() {
            return (
              '[' +
              this.selectionStartLineNumber +
              ',' +
              this.selectionStartColumn +
              ' -> ' +
              this.positionLineNumber +
              ',' +
              this.positionColumn +
              ']'
            );
          }),
          (t.prototype.equalsSelection = function(e) {
            return t.selectionsEqual(this, e);
          }),
          (t.selectionsEqual = function(e, t) {
            return (
              e.selectionStartLineNumber === t.selectionStartLineNumber &&
              e.selectionStartColumn === t.selectionStartColumn &&
              e.positionLineNumber === t.positionLineNumber &&
              e.positionColumn === t.positionColumn
            );
          }),
          (t.prototype.getDirection = function() {
            return this.selectionStartLineNumber === this.startLineNumber &&
              this.selectionStartColumn === this.startColumn
              ? i.LTR
              : i.RTL;
          }),
          (t.prototype.setEndPosition = function(e, n) {
            return this.getDirection() === i.LTR
              ? new t(this.startLineNumber, this.startColumn, e, n)
              : new t(e, n, this.startLineNumber, this.startColumn);
          }),
          (t.prototype.getPosition = function() {
            return new r.Position(this.positionLineNumber, this.positionColumn);
          }),
          (t.prototype.setStartPosition = function(e, n) {
            return this.getDirection() === i.LTR
              ? new t(e, n, this.endLineNumber, this.endColumn)
              : new t(this.endLineNumber, this.endColumn, e, n);
          }),
          (t.fromPositions = function(e, n) {
            return void 0 === n && (n = e), new t(e.lineNumber, e.column, n.lineNumber, n.column);
          }),
          (t.liftSelection = function(e) {
            return new t(
              e.selectionStartLineNumber,
              e.selectionStartColumn,
              e.positionLineNumber,
              e.positionColumn
            );
          }),
          (t.selectionsArrEqual = function(e, t) {
            if ((e && !t) || (!e && t)) return !1;
            if (!e && !t) return !0;
            if (e.length !== t.length) return !1;
            for (var n = 0, r = e.length; n < r; n++)
              if (!this.selectionsEqual(e[n], t[n])) return !1;
            return !0;
          }),
          (t.isISelection = function(e) {
            return (
              e &&
              'number' == typeof e.selectionStartLineNumber &&
              'number' == typeof e.selectionStartColumn &&
              'number' == typeof e.positionLineNumber &&
              'number' == typeof e.positionColumn
            );
          }),
          (t.createWithDirection = function(e, n, r, o, s) {
            return s === i.LTR ? new t(e, n, r, o) : new t(r, o, e, n);
          }),
          t
        );
      })(n.Range);
      t.Selection = s;
    }),
    r(e[23], t([1, 0]), function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = (function() {
        function e(e, t, n) {
          (this.offset = 0 | e), (this.type = t), (this.language = n);
        }
        return (
          (e.prototype.toString = function() {
            return '(' + this.offset + ', ' + this.type + ')';
          }),
          e
        );
      })();
      t.Token = n;
      var r = (function() {
        return function(e, t) {
          (this.tokens = e), (this.endState = t);
        };
      })();
      t.TokenizationResult = r;
      var i = (function() {
        return function(e, t) {
          (this.tokens = e), (this.endState = t);
        };
      })();
      t.TokenizationResult2 = i;
    }),
    r(e[7], t([1, 0]), function(e, t) {
      'use strict';
      function n(e) {
        return e < 0 ? 0 : e > 4294967295 ? 4294967295 : 0 | e;
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = (function() {
        function e(e, t, n) {
          for (var r = new Uint8Array(e * t), i = 0, o = e * t; i < o; i++) r[i] = n;
          (this._data = r), (this._rows = e), (this._cols = t);
        }
        return (
          (e.prototype.get = function(e, t) {
            return this._data[e * this._cols + t];
          }),
          (e.prototype.set = function(e, t, n) {
            this._data[e * this._cols + t] = n;
          }),
          e
        );
      })();
      t.Uint8Matrix = r;
      !(function(e) {
        (e[(e.MAX_SAFE_SMALL_INTEGER = 1073741824)] = 'MAX_SAFE_SMALL_INTEGER'),
          (e[(e.MIN_SAFE_SMALL_INTEGER = -1073741824)] = 'MIN_SAFE_SMALL_INTEGER'),
          (e[(e.MAX_UINT_8 = 255)] = 'MAX_UINT_8'),
          (e[(e.MAX_UINT_16 = 65535)] = 'MAX_UINT_16'),
          (e[(e.MAX_UINT_32 = 4294967295)] = 'MAX_UINT_32');
      })(t.Constants || (t.Constants = {})),
        (t.toUint8 = function(e) {
          return e < 0 ? 0 : e > 255 ? 255 : 0 | e;
        }),
        (t.toUint32 = n),
        (t.toUint32Array = function(e) {
          for (var t = e.length, r = new Uint32Array(t), i = 0; i < t; i++) r[i] = n(e[i]);
          return r;
        });
    }),
    r(e[25], t([1, 0, 7]), function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = (function() {
        function e(t) {
          var r = n.toUint8(t);
          (this._defaultValue = r),
            (this._asciiMap = e._createAsciiMap(r)),
            (this._map = new Map());
        }
        return (
          (e._createAsciiMap = function(e) {
            for (var t = new Uint8Array(256), n = 0; n < 256; n++) t[n] = e;
            return t;
          }),
          (e.prototype.set = function(e, t) {
            var r = n.toUint8(t);
            e >= 0 && e < 256 ? (this._asciiMap[e] = r) : this._map.set(e, r);
          }),
          (e.prototype.get = function(e) {
            return e >= 0 && e < 256 ? this._asciiMap[e] : this._map.get(e) || this._defaultValue;
          }),
          e
        );
      })();
      t.CharacterClassifier = r;
      var i;
      !(function(e) {
        (e[(e.False = 0)] = 'False'), (e[(e.True = 1)] = 'True');
      })(i || (i = {}));
      var o = (function() {
        function e() {
          this._actual = new r(0);
        }
        return (
          (e.prototype.add = function(e) {
            this._actual.set(e, 1);
          }),
          (e.prototype.has = function(e) {
            return 1 === this._actual.get(e);
          }),
          e
        );
      })();
      t.CharacterSet = o;
    }),
    r(e[26], t([1, 0, 12, 20]), function(e, t, n, r) {
      'use strict';
      function i(e, t, r, i) {
        return new n.LcsDiff(e, t, r).ComputeDiff(i);
      }
      function s(e) {
        if (e.length <= 1) return e;
        for (var t = [e[0]], n = t[0], r = 1, i = e.length; r < i; r++) {
          var o = e[r],
            s = o.originalStart - (n.originalStart + n.originalLength),
            u = o.modifiedStart - (n.modifiedStart + n.modifiedLength);
          Math.min(s, u) < a
            ? ((n.originalLength = o.originalStart + o.originalLength - n.originalStart),
              (n.modifiedLength = o.modifiedStart + o.modifiedLength - n.modifiedStart))
            : (t.push(o), (n = o));
        }
        return t;
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var u = 5e3,
        a = 3,
        l = (function() {
          function e(e, t, n) {
            (this.buffer = e), (this.startMarkers = t), (this.endMarkers = n);
          }
          return (
            (e.prototype.equals = function(t) {
              if (!(t instanceof e)) return !1;
              var n = t;
              if (this.getLength() !== n.getLength()) return !1;
              for (var r = 0, i = this.getLength(); r < i; r++)
                if (this.getElementHash(r) !== n.getElementHash(r)) return !1;
              return !0;
            }),
            (e.prototype.getLength = function() {
              return this.startMarkers.length;
            }),
            (e.prototype.getElementHash = function(e) {
              return this.buffer.substring(this.startMarkers[e].offset, this.endMarkers[e].offset);
            }),
            (e.prototype.getStartLineNumber = function(e) {
              return e === this.startMarkers.length
                ? this.startMarkers[e - 1].lineNumber + 1
                : this.startMarkers[e].lineNumber;
            }),
            (e.prototype.getStartColumn = function(e) {
              return this.startMarkers[e].column;
            }),
            (e.prototype.getEndLineNumber = function(e) {
              return this.endMarkers[e].lineNumber;
            }),
            (e.prototype.getEndColumn = function(e) {
              return this.endMarkers[e].column;
            }),
            e
          );
        })(),
        c = (function(e) {
          function t(n) {
            for (var r = '', i = [], o = [], s = 0, u = 0, a = n.length; u < a; u++) {
              r += n[u];
              var l = t._getFirstNonBlankColumn(n[u], 1),
                c = t._getLastNonBlankColumn(n[u], 1);
              i.push({ offset: s + l - 1, lineNumber: u + 1, column: l }),
                o.push({ offset: s + c - 1, lineNumber: u + 1, column: c }),
                (s += n[u].length);
            }
            return e.call(this, r, i, o) || this;
          }
          return (
            o(t, e),
            (t._getFirstNonBlankColumn = function(e, t) {
              var n = r.firstNonWhitespaceIndex(e);
              return -1 === n ? t : n + 1;
            }),
            (t._getLastNonBlankColumn = function(e, t) {
              var n = r.lastNonWhitespaceIndex(e);
              return -1 === n ? t : n + 2;
            }),
            (t.prototype.getCharSequence = function(e, t) {
              for (var n = [], r = [], i = e; i <= t; i++)
                for (
                  var o = this.startMarkers[i], s = this.endMarkers[i], u = o.offset;
                  u < s.offset;
                  u++
                )
                  n.push({
                    offset: u,
                    lineNumber: o.lineNumber,
                    column: o.column + (u - o.offset),
                  }),
                    r.push({
                      offset: u + 1,
                      lineNumber: o.lineNumber,
                      column: o.column + (u - o.offset) + 1,
                    });
              return new l(this.buffer, n, r);
            }),
            t
          );
        })(l),
        f = (function() {
          function e(e, t, n, r, i, o, s, u) {
            (this.originalStartLineNumber = e),
              (this.originalStartColumn = t),
              (this.originalEndLineNumber = n),
              (this.originalEndColumn = r),
              (this.modifiedStartLineNumber = i),
              (this.modifiedStartColumn = o),
              (this.modifiedEndLineNumber = s),
              (this.modifiedEndColumn = u);
          }
          return (
            (e.createFromDiffChange = function(t, n, r) {
              var i, o, s, u, a, l, c, f;
              return (
                0 === t.originalLength
                  ? ((i = 0), (o = 0), (s = 0), (u = 0))
                  : ((i = n.getStartLineNumber(t.originalStart)),
                    (o = n.getStartColumn(t.originalStart)),
                    (s = n.getEndLineNumber(t.originalStart + t.originalLength - 1)),
                    (u = n.getEndColumn(t.originalStart + t.originalLength - 1))),
                0 === t.modifiedLength
                  ? ((a = 0), (l = 0), (c = 0), (f = 0))
                  : ((a = r.getStartLineNumber(t.modifiedStart)),
                    (l = r.getStartColumn(t.modifiedStart)),
                    (c = r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1)),
                    (f = r.getEndColumn(t.modifiedStart + t.modifiedLength - 1))),
                new e(i, o, s, u, a, l, c, f)
              );
            }),
            e
          );
        })(),
        h = (function() {
          function e(e, t, n, r, i) {
            (this.originalStartLineNumber = e),
              (this.originalEndLineNumber = t),
              (this.modifiedStartLineNumber = n),
              (this.modifiedEndLineNumber = r),
              (this.charChanges = i);
          }
          return (
            (e.createFromDiffResult = function(t, n, r, o, u) {
              var a, l, c, h, d;
              if (
                (0 === t.originalLength
                  ? ((a = n.getStartLineNumber(t.originalStart) - 1), (l = 0))
                  : ((a = n.getStartLineNumber(t.originalStart)),
                    (l = n.getEndLineNumber(t.originalStart + t.originalLength - 1))),
                0 === t.modifiedLength
                  ? ((c = r.getStartLineNumber(t.modifiedStart) - 1), (h = 0))
                  : ((c = r.getStartLineNumber(t.modifiedStart)),
                    (h = r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1))),
                0 !== t.originalLength && 0 !== t.modifiedLength && o())
              ) {
                var p = n.getCharSequence(t.originalStart, t.originalStart + t.originalLength - 1),
                  m = r.getCharSequence(t.modifiedStart, t.modifiedStart + t.modifiedLength - 1),
                  _ = i(p, m, o, !1);
                u && (_ = s(_)), (d = []);
                for (var g = 0, v = _.length; g < v; g++)
                  d.push(f.createFromDiffChange(_[g], p, m));
              }
              return new e(a, l, c, h, d);
            }),
            e
          );
        })(),
        d = (function() {
          function e(e, t, n) {
            (this.shouldPostProcessCharChanges = n.shouldPostProcessCharChanges),
              (this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace),
              (this.shouldMakePrettyDiff = n.shouldMakePrettyDiff),
              (this.maximumRunTimeMs = u),
              (this.originalLines = e),
              (this.modifiedLines = t),
              (this.original = new c(e)),
              (this.modified = new c(t)),
              n.shouldConsiderTrimWhitespaceInEmptyCase &&
                this.shouldIgnoreTrimWhitespace &&
                this.original.equals(this.modified) &&
                (this.shouldIgnoreTrimWhitespace = !1);
          }
          return (
            (e.prototype.computeDiff = function() {
              if (1 === this.original.getLength() && 0 === this.original.getElementHash(0).length)
                return [
                  {
                    originalStartLineNumber: 1,
                    originalEndLineNumber: 1,
                    modifiedStartLineNumber: 1,
                    modifiedEndLineNumber: this.modified.getLength(),
                    charChanges: [
                      {
                        modifiedEndColumn: 0,
                        modifiedEndLineNumber: 0,
                        modifiedStartColumn: 0,
                        modifiedStartLineNumber: 0,
                        originalEndColumn: 0,
                        originalEndLineNumber: 0,
                        originalStartColumn: 0,
                        originalStartLineNumber: 0,
                      },
                    ],
                  },
                ];
              if (1 === this.modified.getLength() && 0 === this.modified.getElementHash(0).length)
                return [
                  {
                    originalStartLineNumber: 1,
                    originalEndLineNumber: this.original.getLength(),
                    modifiedStartLineNumber: 1,
                    modifiedEndLineNumber: 1,
                    charChanges: [
                      {
                        modifiedEndColumn: 0,
                        modifiedEndLineNumber: 0,
                        modifiedStartColumn: 0,
                        modifiedStartLineNumber: 0,
                        originalEndColumn: 0,
                        originalEndLineNumber: 0,
                        originalStartColumn: 0,
                        originalStartLineNumber: 0,
                      },
                    ],
                  },
                ];
              this.computationStartTime = new Date().getTime();
              var e = i(
                this.original,
                this.modified,
                this._continueProcessingPredicate.bind(this),
                this.shouldMakePrettyDiff
              );
              if (this.shouldIgnoreTrimWhitespace) {
                for (var t = [], n = 0, r = e.length; n < r; n++)
                  t.push(
                    h.createFromDiffResult(
                      e[n],
                      this.original,
                      this.modified,
                      this._continueProcessingPredicate.bind(this),
                      this.shouldPostProcessCharChanges
                    )
                  );
                return t;
              }
              for (var o = [], s = 0, u = 0, n = -1, a = e.length; n < a; n++) {
                for (
                  var l = n + 1 < a ? e[n + 1] : null,
                    f = l ? l.originalStart : this.originalLines.length,
                    d = l ? l.modifiedStart : this.modifiedLines.length;
                  s < f && u < d;

                ) {
                  var p = this.originalLines[s],
                    m = this.modifiedLines[u];
                  if (p !== m) {
                    for (
                      var _ = c._getFirstNonBlankColumn(p, 1), g = c._getFirstNonBlankColumn(m, 1);
                      _ > 1 && g > 1 && (E = p.charCodeAt(_ - 2)) === (S = m.charCodeAt(g - 2));

                    )
                      _--, g--;
                    (_ > 1 || g > 1) &&
                      this._pushTrimWhitespaceCharChange(o, s + 1, 1, _, u + 1, 1, g);
                    for (
                      var v = c._getLastNonBlankColumn(p, 1),
                        y = c._getLastNonBlankColumn(m, 1),
                        b = p.length + 1,
                        C = m.length + 1;
                      v < b && y < C;

                    ) {
                      var E = p.charCodeAt(v - 1),
                        S = p.charCodeAt(y - 1);
                      if (E !== S) break;
                      v++, y++;
                    }
                    (v < b || y < C) &&
                      this._pushTrimWhitespaceCharChange(o, s + 1, v, b, u + 1, y, C);
                  }
                  s++, u++;
                }
                l &&
                  (o.push(
                    h.createFromDiffResult(
                      l,
                      this.original,
                      this.modified,
                      this._continueProcessingPredicate.bind(this),
                      this.shouldPostProcessCharChanges
                    )
                  ),
                  (s += l.originalLength),
                  (u += l.modifiedLength));
              }
              return o;
            }),
            (e.prototype._pushTrimWhitespaceCharChange = function(e, t, n, r, i, o, s) {
              this._mergeTrimWhitespaceCharChange(e, t, n, r, i, o, s) ||
                e.push(new h(t, t, i, i, [new f(t, n, t, r, i, o, i, s)]));
            }),
            (e.prototype._mergeTrimWhitespaceCharChange = function(e, t, n, r, i, o, s) {
              var u = e.length;
              if (0 === u) return !1;
              var a = e[u - 1];
              return (
                0 !== a.originalEndLineNumber &&
                0 !== a.modifiedEndLineNumber &&
                (a.originalEndLineNumber + 1 === t &&
                  a.modifiedEndLineNumber + 1 === i &&
                  ((a.originalEndLineNumber = t),
                  (a.modifiedEndLineNumber = i),
                  a.charChanges.push(new f(t, n, t, r, i, o, i, s)),
                  !0))
              );
            }),
            (e.prototype._continueProcessingPredicate = function() {
              return (
                0 === this.maximumRunTimeMs ||
                new Date().getTime() - this.computationStartTime < this.maximumRunTimeMs
              );
            }),
            e
          );
        })();
      t.DiffComputer = d;
    }),
    r(e[27], t([1, 0]), function(e, t) {
      'use strict';
      function n(e, t, n, r) {
        var i = e - 1 - r,
          o = n.lastIndexOf(' ', i - 1) + 1,
          s = n.indexOf(' ', i);
        -1 === s && (s = n.length), (t.lastIndex = o);
        for (var u; (u = t.exec(n)); )
          if (u.index <= i && t.lastIndex >= i)
            return { word: u[0], startColumn: r + 1 + u.index, endColumn: r + 1 + t.lastIndex };
        return null;
      }
      function r(e, t, n, r) {
        var i = e - 1 - r;
        t.lastIndex = 0;
        for (var o; (o = t.exec(n)); ) {
          if (o.index > i) return null;
          if (t.lastIndex >= i)
            return { word: o[0], startColumn: r + 1 + o.index, endColumn: r + 1 + t.lastIndex };
        }
        return null;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'),
        (t.DEFAULT_WORD_REGEXP = (function(e) {
          void 0 === e && (e = '');
          for (
            var n = t.USUAL_WORD_SEPARATORS, r = '(-?\\d*\\.\\d\\w*)|([^', i = 0;
            i < n.length;
            i++
          )
            e.indexOf(n[i]) >= 0 || (r += '\\' + n[i]);
          return (r += '\\s]+)'), new RegExp(r, 'g');
        })()),
        (t.ensureValidWordDefinition = function(e) {
          var n = t.DEFAULT_WORD_REGEXP;
          if (e && e instanceof RegExp)
            if (e.global) n = e;
            else {
              var r = 'g';
              e.ignoreCase && (r += 'i'), e.multiline && (r += 'm'), (n = new RegExp(e.source, r));
            }
          return (n.lastIndex = 0), n;
        }),
        (t.getWordAtText = function(e, t, i, o) {
          t.lastIndex = 0;
          var s = t.exec(i);
          if (!s) return null;
          var u = s[0].indexOf(' ') >= 0 ? r(e, t, i, o) : n(e, t, i, o);
          return (t.lastIndex = 0), u;
        });
    }),
    r(e[28], t([1, 0, 25, 7]), function(e, t, n, r) {
      'use strict';
      function i() {
        return (
          null === l &&
            (l = new a([
              [1, 104, 2],
              [1, 72, 2],
              [1, 102, 6],
              [1, 70, 6],
              [2, 116, 3],
              [2, 84, 3],
              [3, 116, 4],
              [3, 84, 4],
              [4, 112, 5],
              [4, 80, 5],
              [5, 115, 9],
              [5, 83, 9],
              [5, 58, 10],
              [6, 105, 7],
              [6, 73, 7],
              [7, 108, 8],
              [7, 76, 8],
              [8, 101, 9],
              [8, 69, 9],
              [9, 58, 10],
              [10, 47, 11],
              [11, 47, 12],
            ])),
          l
        );
      }
      function o() {
        if (null === c) {
          c = new n.CharacterClassifier(0);
          for (
            e = 0;
            e <
            ' \t<>\'"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…'
              .length;
            e++
          )
            c.set(
              ' \t<>\'"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…'.charCodeAt(
                e
              ),
              1
            );
          for (var e = 0; e < '.,;'.length; e++) c.set('.,;'.charCodeAt(e), 2);
        }
        return c;
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var s;
      !(function(e) {
        (e[(e.Invalid = 0)] = 'Invalid'),
          (e[(e.Start = 1)] = 'Start'),
          (e[(e.H = 2)] = 'H'),
          (e[(e.HT = 3)] = 'HT'),
          (e[(e.HTT = 4)] = 'HTT'),
          (e[(e.HTTP = 5)] = 'HTTP'),
          (e[(e.F = 6)] = 'F'),
          (e[(e.FI = 7)] = 'FI'),
          (e[(e.FIL = 8)] = 'FIL'),
          (e[(e.BeforeColon = 9)] = 'BeforeColon'),
          (e[(e.AfterColon = 10)] = 'AfterColon'),
          (e[(e.AlmostThere = 11)] = 'AlmostThere'),
          (e[(e.End = 12)] = 'End'),
          (e[(e.Accept = 13)] = 'Accept');
      })(s || (s = {}));
      var u,
        a = (function() {
          function e(e) {
            for (var t = 0, n = 0, i = 0, o = e.length; i < o; i++) {
              var s = e[i],
                u = s[0],
                a = s[1],
                l = s[2];
              a > t && (t = a), u > n && (n = u), l > n && (n = l);
            }
            t++, n++;
            for (var c = new r.Uint8Matrix(n, t, 0), i = 0, o = e.length; i < o; i++) {
              var f = e[i],
                u = f[0],
                a = f[1],
                l = f[2];
              c.set(u, a, l);
            }
            (this._states = c), (this._maxCharCode = t);
          }
          return (
            (e.prototype.nextState = function(e, t) {
              return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
            }),
            e
          );
        })(),
        l = null;
      !(function(e) {
        (e[(e.None = 0)] = 'None'),
          (e[(e.ForceTermination = 1)] = 'ForceTermination'),
          (e[(e.CannotEndIn = 2)] = 'CannotEndIn');
      })(u || (u = {}));
      var c = null,
        f = (function() {
          function e() {}
          return (
            (e._createLink = function(e, t, n, r, i) {
              var o = i - 1;
              do {
                var s = t.charCodeAt(o);
                if (2 !== e.get(s)) break;
                o--;
              } while (o > r);
              return {
                range: {
                  startLineNumber: n,
                  startColumn: r + 1,
                  endLineNumber: n,
                  endColumn: o + 2,
                },
                url: t.substring(r, o + 1),
              };
            }),
            (e.computeLinks = function(t) {
              for (var n = i(), r = o(), s = [], u = 1, a = t.getLineCount(); u <= a; u++) {
                for (
                  var l = t.getLineContent(u),
                    c = l.length,
                    f = 0,
                    h = 0,
                    d = 0,
                    p = 1,
                    m = !1,
                    _ = !1,
                    g = !1;
                  f < c;

                ) {
                  var v = !1,
                    y = l.charCodeAt(f);
                  if (13 === p) {
                    var b = void 0;
                    switch (y) {
                      case 40:
                        (m = !0), (b = 0);
                        break;
                      case 41:
                        b = m ? 0 : 1;
                        break;
                      case 91:
                        (_ = !0), (b = 0);
                        break;
                      case 93:
                        b = _ ? 0 : 1;
                        break;
                      case 123:
                        (g = !0), (b = 0);
                        break;
                      case 125:
                        b = g ? 0 : 1;
                        break;
                      case 39:
                        b = 34 === d || 96 === d ? 0 : 1;
                        break;
                      case 34:
                        b = 39 === d || 96 === d ? 0 : 1;
                        break;
                      case 96:
                        b = 39 === d || 34 === d ? 0 : 1;
                        break;
                      default:
                        b = r.get(y);
                    }
                    1 === b && (s.push(e._createLink(r, l, u, h, f)), (v = !0));
                  } else
                    12 === p
                      ? 1 === (b = r.get(y))
                        ? (v = !0)
                        : (p = 13)
                      : 0 === (p = n.nextState(p, y)) && (v = !0);
                  v && ((p = 1), (m = !1), (_ = !1), (g = !1), (h = f + 1), (d = y)), f++;
                }
                13 === p && s.push(e._createLink(r, l, u, h, c));
              }
              return s;
            }),
            e
          );
        })();
      t.computeLinks = function(e) {
        return e && 'function' == typeof e.getLineCount && 'function' == typeof e.getLineContent
          ? f.computeLinks(e)
          : [];
      };
    }),
    r(e[29], t([1, 0]), function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = (function() {
        function e() {
          this._defaultValueSet = [
            ['true', 'false'],
            ['True', 'False'],
            ['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'],
            ['public', 'protected', 'private'],
          ];
        }
        return (
          (e.prototype.navigateValueSet = function(e, t, n, r, i) {
            if (e && t && (o = this.doNavigateValueSet(t, i))) return { range: e, value: o };
            if (n && r) {
              var o = this.doNavigateValueSet(r, i);
              if (o) return { range: n, value: o };
            }
            return null;
          }),
          (e.prototype.doNavigateValueSet = function(e, t) {
            var n = this.numberReplace(e, t);
            return null !== n ? n : this.textReplace(e, t);
          }),
          (e.prototype.numberReplace = function(e, t) {
            var n = Math.pow(10, e.length - (e.lastIndexOf('.') + 1)),
              r = Number(e),
              i = parseFloat(e);
            return isNaN(r) || isNaN(i) || r !== i
              ? null
              : 0 !== r || t
              ? ((r = Math.floor(r * n)), (r += t ? n : -n), String(r / n))
              : null;
          }),
          (e.prototype.textReplace = function(e, t) {
            return this.valueSetsReplace(this._defaultValueSet, e, t);
          }),
          (e.prototype.valueSetsReplace = function(e, t, n) {
            for (var r = null, i = 0, o = e.length; null === r && i < o; i++)
              r = this.valueSetReplace(e[i], t, n);
            return r;
          }),
          (e.prototype.valueSetReplace = function(e, t, n) {
            var r = e.indexOf(t);
            return r >= 0
              ? ((r += n ? 1 : -1) < 0 ? (r = e.length - 1) : (r %= e.length), e[r])
              : null;
          }),
          (e.INSTANCE = new e()),
          e
        );
      })();
      t.BasicInplaceReplace = n;
    }),
    r(e[30], t([1, 0, 9, 21, 3, 5, 22, 2, 13, 23, 6]), function(e, t, n, r, i, o, s, u, a, l, c) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var f;
      !(function(e) {
        (e[(e.Ignore = 0)] = 'Ignore'),
          (e[(e.Info = 1)] = 'Info'),
          (e[(e.Warning = 2)] = 'Warning'),
          (e[(e.Error = 3)] = 'Error');
      })((f = t.Severity || (t.Severity = {})));
      var h = (function() {
        function e() {}
        return (
          (e.chord = function(e, t) {
            return r.KeyChord(e, t);
          }),
          (e.CtrlCmd = 2048),
          (e.Shift = 1024),
          (e.Alt = 512),
          (e.WinCtrl = 256),
          e
        );
      })();
      t.KeyMod = h;
      var d;
      !(function(e) {
        (e[(e.Unknown = 0)] = 'Unknown'),
          (e[(e.Backspace = 1)] = 'Backspace'),
          (e[(e.Tab = 2)] = 'Tab'),
          (e[(e.Enter = 3)] = 'Enter'),
          (e[(e.Shift = 4)] = 'Shift'),
          (e[(e.Ctrl = 5)] = 'Ctrl'),
          (e[(e.Alt = 6)] = 'Alt'),
          (e[(e.PauseBreak = 7)] = 'PauseBreak'),
          (e[(e.CapsLock = 8)] = 'CapsLock'),
          (e[(e.Escape = 9)] = 'Escape'),
          (e[(e.Space = 10)] = 'Space'),
          (e[(e.PageUp = 11)] = 'PageUp'),
          (e[(e.PageDown = 12)] = 'PageDown'),
          (e[(e.End = 13)] = 'End'),
          (e[(e.Home = 14)] = 'Home'),
          (e[(e.LeftArrow = 15)] = 'LeftArrow'),
          (e[(e.UpArrow = 16)] = 'UpArrow'),
          (e[(e.RightArrow = 17)] = 'RightArrow'),
          (e[(e.DownArrow = 18)] = 'DownArrow'),
          (e[(e.Insert = 19)] = 'Insert'),
          (e[(e.Delete = 20)] = 'Delete'),
          (e[(e.KEY_0 = 21)] = 'KEY_0'),
          (e[(e.KEY_1 = 22)] = 'KEY_1'),
          (e[(e.KEY_2 = 23)] = 'KEY_2'),
          (e[(e.KEY_3 = 24)] = 'KEY_3'),
          (e[(e.KEY_4 = 25)] = 'KEY_4'),
          (e[(e.KEY_5 = 26)] = 'KEY_5'),
          (e[(e.KEY_6 = 27)] = 'KEY_6'),
          (e[(e.KEY_7 = 28)] = 'KEY_7'),
          (e[(e.KEY_8 = 29)] = 'KEY_8'),
          (e[(e.KEY_9 = 30)] = 'KEY_9'),
          (e[(e.KEY_A = 31)] = 'KEY_A'),
          (e[(e.KEY_B = 32)] = 'KEY_B'),
          (e[(e.KEY_C = 33)] = 'KEY_C'),
          (e[(e.KEY_D = 34)] = 'KEY_D'),
          (e[(e.KEY_E = 35)] = 'KEY_E'),
          (e[(e.KEY_F = 36)] = 'KEY_F'),
          (e[(e.KEY_G = 37)] = 'KEY_G'),
          (e[(e.KEY_H = 38)] = 'KEY_H'),
          (e[(e.KEY_I = 39)] = 'KEY_I'),
          (e[(e.KEY_J = 40)] = 'KEY_J'),
          (e[(e.KEY_K = 41)] = 'KEY_K'),
          (e[(e.KEY_L = 42)] = 'KEY_L'),
          (e[(e.KEY_M = 43)] = 'KEY_M'),
          (e[(e.KEY_N = 44)] = 'KEY_N'),
          (e[(e.KEY_O = 45)] = 'KEY_O'),
          (e[(e.KEY_P = 46)] = 'KEY_P'),
          (e[(e.KEY_Q = 47)] = 'KEY_Q'),
          (e[(e.KEY_R = 48)] = 'KEY_R'),
          (e[(e.KEY_S = 49)] = 'KEY_S'),
          (e[(e.KEY_T = 50)] = 'KEY_T'),
          (e[(e.KEY_U = 51)] = 'KEY_U'),
          (e[(e.KEY_V = 52)] = 'KEY_V'),
          (e[(e.KEY_W = 53)] = 'KEY_W'),
          (e[(e.KEY_X = 54)] = 'KEY_X'),
          (e[(e.KEY_Y = 55)] = 'KEY_Y'),
          (e[(e.KEY_Z = 56)] = 'KEY_Z'),
          (e[(e.Meta = 57)] = 'Meta'),
          (e[(e.ContextMenu = 58)] = 'ContextMenu'),
          (e[(e.F1 = 59)] = 'F1'),
          (e[(e.F2 = 60)] = 'F2'),
          (e[(e.F3 = 61)] = 'F3'),
          (e[(e.F4 = 62)] = 'F4'),
          (e[(e.F5 = 63)] = 'F5'),
          (e[(e.F6 = 64)] = 'F6'),
          (e[(e.F7 = 65)] = 'F7'),
          (e[(e.F8 = 66)] = 'F8'),
          (e[(e.F9 = 67)] = 'F9'),
          (e[(e.F10 = 68)] = 'F10'),
          (e[(e.F11 = 69)] = 'F11'),
          (e[(e.F12 = 70)] = 'F12'),
          (e[(e.F13 = 71)] = 'F13'),
          (e[(e.F14 = 72)] = 'F14'),
          (e[(e.F15 = 73)] = 'F15'),
          (e[(e.F16 = 74)] = 'F16'),
          (e[(e.F17 = 75)] = 'F17'),
          (e[(e.F18 = 76)] = 'F18'),
          (e[(e.F19 = 77)] = 'F19'),
          (e[(e.NumLock = 78)] = 'NumLock'),
          (e[(e.ScrollLock = 79)] = 'ScrollLock'),
          (e[(e.US_SEMICOLON = 80)] = 'US_SEMICOLON'),
          (e[(e.US_EQUAL = 81)] = 'US_EQUAL'),
          (e[(e.US_COMMA = 82)] = 'US_COMMA'),
          (e[(e.US_MINUS = 83)] = 'US_MINUS'),
          (e[(e.US_DOT = 84)] = 'US_DOT'),
          (e[(e.US_SLASH = 85)] = 'US_SLASH'),
          (e[(e.US_BACKTICK = 86)] = 'US_BACKTICK'),
          (e[(e.US_OPEN_SQUARE_BRACKET = 87)] = 'US_OPEN_SQUARE_BRACKET'),
          (e[(e.US_BACKSLASH = 88)] = 'US_BACKSLASH'),
          (e[(e.US_CLOSE_SQUARE_BRACKET = 89)] = 'US_CLOSE_SQUARE_BRACKET'),
          (e[(e.US_QUOTE = 90)] = 'US_QUOTE'),
          (e[(e.OEM_8 = 91)] = 'OEM_8'),
          (e[(e.OEM_102 = 92)] = 'OEM_102'),
          (e[(e.NUMPAD_0 = 93)] = 'NUMPAD_0'),
          (e[(e.NUMPAD_1 = 94)] = 'NUMPAD_1'),
          (e[(e.NUMPAD_2 = 95)] = 'NUMPAD_2'),
          (e[(e.NUMPAD_3 = 96)] = 'NUMPAD_3'),
          (e[(e.NUMPAD_4 = 97)] = 'NUMPAD_4'),
          (e[(e.NUMPAD_5 = 98)] = 'NUMPAD_5'),
          (e[(e.NUMPAD_6 = 99)] = 'NUMPAD_6'),
          (e[(e.NUMPAD_7 = 100)] = 'NUMPAD_7'),
          (e[(e.NUMPAD_8 = 101)] = 'NUMPAD_8'),
          (e[(e.NUMPAD_9 = 102)] = 'NUMPAD_9'),
          (e[(e.NUMPAD_MULTIPLY = 103)] = 'NUMPAD_MULTIPLY'),
          (e[(e.NUMPAD_ADD = 104)] = 'NUMPAD_ADD'),
          (e[(e.NUMPAD_SEPARATOR = 105)] = 'NUMPAD_SEPARATOR'),
          (e[(e.NUMPAD_SUBTRACT = 106)] = 'NUMPAD_SUBTRACT'),
          (e[(e.NUMPAD_DECIMAL = 107)] = 'NUMPAD_DECIMAL'),
          (e[(e.NUMPAD_DIVIDE = 108)] = 'NUMPAD_DIVIDE'),
          (e[(e.KEY_IN_COMPOSITION = 109)] = 'KEY_IN_COMPOSITION'),
          (e[(e.ABNT_C1 = 110)] = 'ABNT_C1'),
          (e[(e.ABNT_C2 = 111)] = 'ABNT_C2'),
          (e[(e.MAX_VALUE = 112)] = 'MAX_VALUE');
      })((d = t.KeyCode || (t.KeyCode = {}))),
        (t.createMonacoBaseAPI = function() {
          return {
            editor: void 0,
            languages: void 0,
            CancellationTokenSource: a.CancellationTokenSource,
            Emitter: n.Emitter,
            KeyCode: d,
            KeyMod: h,
            Position: i.Position,
            Range: o.Range,
            Selection: s.Selection,
            SelectionDirection: s.SelectionDirection,
            Severity: f,
            Promise: u.TPromise,
            Uri: c.default,
            Token: l.Token,
          };
        });
    }),
    r(e[19], t([1, 0, 7]), function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = (function() {
        return function(e, t) {
          (this.index = e), (this.remainder = t);
        };
      })();
      t.PrefixSumIndexOfResult = r;
      var i = (function() {
        function e(e) {
          (this.values = e),
            (this.prefixSum = new Uint32Array(e.length)),
            (this.prefixSumValidIndex = new Int32Array(1)),
            (this.prefixSumValidIndex[0] = -1);
        }
        return (
          (e.prototype.getCount = function() {
            return this.values.length;
          }),
          (e.prototype.insertValues = function(e, t) {
            e = n.toUint32(e);
            var r = this.values,
              i = this.prefixSum,
              o = t.length;
            return (
              0 !== o &&
              ((this.values = new Uint32Array(r.length + o)),
              this.values.set(r.subarray(0, e), 0),
              this.values.set(r.subarray(e), e + o),
              this.values.set(t, e),
              e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1),
              (this.prefixSum = new Uint32Array(this.values.length)),
              this.prefixSumValidIndex[0] >= 0 &&
                this.prefixSum.set(i.subarray(0, this.prefixSumValidIndex[0] + 1)),
              !0)
            );
          }),
          (e.prototype.changeValue = function(e, t) {
            return (
              (e = n.toUint32(e)),
              (t = n.toUint32(t)),
              this.values[e] !== t &&
                ((this.values[e] = t),
                e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1),
                !0)
            );
          }),
          (e.prototype.removeValues = function(e, t) {
            (e = n.toUint32(e)), (t = n.toUint32(t));
            var r = this.values,
              i = this.prefixSum;
            if (e >= r.length) return !1;
            var o = r.length - e;
            return (
              t >= o && (t = o),
              0 !== t &&
                ((this.values = new Uint32Array(r.length - t)),
                this.values.set(r.subarray(0, e), 0),
                this.values.set(r.subarray(e + t), e),
                (this.prefixSum = new Uint32Array(this.values.length)),
                e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1),
                this.prefixSumValidIndex[0] >= 0 &&
                  this.prefixSum.set(i.subarray(0, this.prefixSumValidIndex[0] + 1)),
                !0)
            );
          }),
          (e.prototype.getTotalValue = function() {
            return 0 === this.values.length ? 0 : this._getAccumulatedValue(this.values.length - 1);
          }),
          (e.prototype.getAccumulatedValue = function(e) {
            return e < 0 ? 0 : ((e = n.toUint32(e)), this._getAccumulatedValue(e));
          }),
          (e.prototype._getAccumulatedValue = function(e) {
            if (e <= this.prefixSumValidIndex[0]) return this.prefixSum[e];
            var t = this.prefixSumValidIndex[0] + 1;
            0 === t && ((this.prefixSum[0] = this.values[0]), t++),
              e >= this.values.length && (e = this.values.length - 1);
            for (var n = t; n <= e; n++) this.prefixSum[n] = this.prefixSum[n - 1] + this.values[n];
            return (
              (this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], e)),
              this.prefixSum[e]
            );
          }),
          (e.prototype.getIndexOf = function(e) {
            (e = Math.floor(e)), this.getTotalValue();
            for (var t, n, i, o = 0, s = this.values.length - 1; o <= s; )
              if (
                ((t = (o + (s - o) / 2) | 0),
                (n = this.prefixSum[t]),
                (i = n - this.values[t]),
                e < i)
              )
                s = t - 1;
              else {
                if (!(e >= n)) break;
                o = t + 1;
              }
            return new r(t, e - i);
          }),
          e
        );
      })();
      t.PrefixSumComputer = i;
      var o = (function() {
        function e(e) {
          (this._cacheAccumulatedValueStart = 0),
            (this._cache = null),
            (this._actual = new i(e)),
            this._bustCache();
        }
        return (
          (e.prototype._bustCache = function() {
            (this._cacheAccumulatedValueStart = 0), (this._cache = null);
          }),
          (e.prototype.getCount = function() {
            return this._actual.getCount();
          }),
          (e.prototype.insertValues = function(e, t) {
            this._actual.insertValues(e, t) && this._bustCache();
          }),
          (e.prototype.changeValue = function(e, t) {
            this._actual.changeValue(e, t) && this._bustCache();
          }),
          (e.prototype.removeValues = function(e, t) {
            this._actual.removeValues(e, t) && this._bustCache();
          }),
          (e.prototype.getTotalValue = function() {
            return this._actual.getTotalValue();
          }),
          (e.prototype.getAccumulatedValue = function(e) {
            return this._actual.getAccumulatedValue(e);
          }),
          (e.prototype.getIndexOf = function(e) {
            if (((e = Math.floor(e)), null !== this._cache)) {
              var t = e - this._cacheAccumulatedValueStart;
              if (t >= 0 && t < this._cache.length) return this._cache[t];
            }
            return this._actual.getIndexOf(e);
          }),
          (e.prototype.warmUpCache = function(e, t) {
            for (var n = [], r = e; r <= t; r++) n[r - e] = this.getIndexOf(r);
            (this._cache = n), (this._cacheAccumulatedValueStart = e);
          }),
          e
        );
      })();
      t.PrefixSumComputerWithCache = o;
    }),
    r(e[24], t([1, 0, 19]), function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = (function() {
        function e(e, t, n, r) {
          (this._uri = e), (this._lines = t), (this._eol = n), (this._versionId = r);
        }
        return (
          (e.prototype.dispose = function() {
            this._lines.length = 0;
          }),
          Object.defineProperty(e.prototype, 'version', {
            get: function() {
              return this._versionId;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.getText = function() {
            return this._lines.join(this._eol);
          }),
          (e.prototype.onEvents = function(e) {
            e.eol && e.eol !== this._eol && ((this._eol = e.eol), (this._lineStarts = null));
            for (var t = e.changes, n = 0, r = t.length; n < r; n++) {
              var i = t[n];
              this._acceptDeleteRange(i.range),
                this._acceptInsertText(
                  { lineNumber: i.range.startLineNumber, column: i.range.startColumn },
                  i.text
                );
            }
            this._versionId = e.versionId;
          }),
          (e.prototype._ensureLineStarts = function() {
            if (!this._lineStarts) {
              for (
                var e = this._eol.length, t = this._lines.length, r = new Uint32Array(t), i = 0;
                i < t;
                i++
              )
                r[i] = this._lines[i].length + e;
              this._lineStarts = new n.PrefixSumComputer(r);
            }
          }),
          (e.prototype._setLineText = function(e, t) {
            (this._lines[e] = t),
              this._lineStarts &&
                this._lineStarts.changeValue(e, this._lines[e].length + this._eol.length);
          }),
          (e.prototype._acceptDeleteRange = function(e) {
            if (e.startLineNumber !== e.endLineNumber)
              this._setLineText(
                e.startLineNumber - 1,
                this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) +
                  this._lines[e.endLineNumber - 1].substring(e.endColumn - 1)
              ),
                this._lines.splice(e.startLineNumber, e.endLineNumber - e.startLineNumber),
                this._lineStarts &&
                  this._lineStarts.removeValues(
                    e.startLineNumber,
                    e.endLineNumber - e.startLineNumber
                  );
            else {
              if (e.startColumn === e.endColumn) return;
              this._setLineText(
                e.startLineNumber - 1,
                this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) +
                  this._lines[e.startLineNumber - 1].substring(e.endColumn - 1)
              );
            }
          }),
          (e.prototype._acceptInsertText = function(e, t) {
            if (0 !== t.length) {
              var n = t.split(/\r\n|\r|\n/);
              if (1 !== n.length) {
                (n[n.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1)),
                  this._setLineText(
                    e.lineNumber - 1,
                    this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0]
                  );
                for (var r = new Uint32Array(n.length - 1), i = 1; i < n.length; i++)
                  this._lines.splice(e.lineNumber + i - 1, 0, n[i]),
                    (r[i - 1] = n[i].length + this._eol.length);
                this._lineStarts && this._lineStarts.insertValues(e.lineNumber, r);
              } else
                this._setLineText(
                  e.lineNumber - 1,
                  this._lines[e.lineNumber - 1].substring(0, e.column - 1) +
                    n[0] +
                    this._lines[e.lineNumber - 1].substring(e.column - 1)
                );
            }
          }),
          e
        );
      })();
      t.MirrorModel = r;
    }),
    r(e[33], t([1, 0, 6, 2, 5, 26, 12, 3, 24, 28, 29, 27, 30]), function(
      e,
      t,
      n,
      r,
      i,
      s,
      u,
      a,
      l,
      c,
      f,
      h,
      d
    ) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var p = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            o(t, e),
            Object.defineProperty(t.prototype, 'uri', {
              get: function() {
                return this._uri;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, 'version', {
              get: function() {
                return this._versionId;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, 'eol', {
              get: function() {
                return this._eol;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.getValue = function() {
              return this.getText();
            }),
            (t.prototype.getLinesContent = function() {
              return this._lines.slice(0);
            }),
            (t.prototype.getLineCount = function() {
              return this._lines.length;
            }),
            (t.prototype.getLineContent = function(e) {
              return this._lines[e - 1];
            }),
            (t.prototype.getWordAtPosition = function(e, t) {
              var n = h.getWordAtText(
                e.column,
                h.ensureValidWordDefinition(t),
                this._lines[e.lineNumber - 1],
                0
              );
              return n ? new i.Range(e.lineNumber, n.startColumn, e.lineNumber, n.endColumn) : null;
            }),
            (t.prototype.getWordUntilPosition = function(e, t) {
              var n = this.getWordAtPosition(e, t);
              return n
                ? {
                    word: this._lines[e.lineNumber - 1].substring(n.startColumn - 1, e.column - 1),
                    startColumn: n.startColumn,
                    endColumn: e.column,
                  }
                : { word: '', startColumn: e.column, endColumn: e.column };
            }),
            (t.prototype._getAllWords = function(e) {
              var t = this,
                n = [];
              return (
                this._lines.forEach(function(r) {
                  t._wordenize(r, e).forEach(function(e) {
                    n.push(r.substring(e.start, e.end));
                  });
                }),
                n
              );
            }),
            (t.prototype.getAllUniqueWords = function(e, t) {
              var n = !1,
                r = Object.create(null);
              return this._getAllWords(e).filter(function(e) {
                return t && !n && t === e ? ((n = !0), !1) : !r[e] && ((r[e] = !0), !0);
              });
            }),
            (t.prototype._wordenize = function(e, t) {
              var n,
                r = [];
              for (t.lastIndex = 0; (n = t.exec(e)) && 0 !== n[0].length; )
                r.push({ start: n.index, end: n.index + n[0].length });
              return r;
            }),
            (t.prototype.getValueInRange = function(e) {
              if ((e = this._validateRange(e)).startLineNumber === e.endLineNumber)
                return this._lines[e.startLineNumber - 1].substring(
                  e.startColumn - 1,
                  e.endColumn - 1
                );
              var t = this._eol,
                n = e.startLineNumber - 1,
                r = e.endLineNumber - 1,
                i = [];
              i.push(this._lines[n].substring(e.startColumn - 1));
              for (var o = n + 1; o < r; o++) i.push(this._lines[o]);
              return i.push(this._lines[r].substring(0, e.endColumn - 1)), i.join(t);
            }),
            (t.prototype.offsetAt = function(e) {
              return (
                (e = this._validatePosition(e)),
                this._ensureLineStarts(),
                this._lineStarts.getAccumulatedValue(e.lineNumber - 2) + (e.column - 1)
              );
            }),
            (t.prototype.positionAt = function(e) {
              (e = Math.floor(e)), (e = Math.max(0, e)), this._ensureLineStarts();
              var t = this._lineStarts.getIndexOf(e),
                n = this._lines[t.index].length;
              return { lineNumber: 1 + t.index, column: 1 + Math.min(t.remainder, n) };
            }),
            (t.prototype._validateRange = function(e) {
              var t = this._validatePosition({
                  lineNumber: e.startLineNumber,
                  column: e.startColumn,
                }),
                n = this._validatePosition({ lineNumber: e.endLineNumber, column: e.endColumn });
              return t.lineNumber !== e.startLineNumber ||
                t.column !== e.startColumn ||
                n.lineNumber !== e.endLineNumber ||
                n.column !== e.endColumn
                ? {
                    startLineNumber: t.lineNumber,
                    startColumn: t.column,
                    endLineNumber: n.lineNumber,
                    endColumn: n.column,
                  }
                : e;
            }),
            (t.prototype._validatePosition = function(e) {
              if (!a.Position.isIPosition(e)) throw new Error('bad position');
              var t = e.lineNumber,
                n = e.column,
                r = !1;
              if (t < 1) (t = 1), (n = 1), (r = !0);
              else if (t > this._lines.length)
                (t = this._lines.length), (n = this._lines[t - 1].length + 1), (r = !0);
              else {
                var i = this._lines[t - 1].length + 1;
                n < 1 ? ((n = 1), (r = !0)) : n > i && ((n = i), (r = !0));
              }
              return r ? { lineNumber: t, column: n } : e;
            }),
            t
          );
        })(l.MirrorModel),
        m = (function() {
          function e() {
            this._foreignModule = null;
          }
          return (
            (e.prototype.computeDiff = function(e, t, n) {
              var i = this._getModel(e),
                o = this._getModel(t);
              if (!i || !o) return null;
              var u = i.getLinesContent(),
                a = o.getLinesContent(),
                l = new s.DiffComputer(u, a, {
                  shouldPostProcessCharChanges: !0,
                  shouldIgnoreTrimWhitespace: n,
                  shouldConsiderTrimWhitespaceInEmptyCase: !0,
                  shouldMakePrettyDiff: !0,
                });
              return r.TPromise.as(l.computeDiff());
            }),
            (e.prototype.computeDirtyDiff = function(e, t, n) {
              var i = this._getModel(e),
                o = this._getModel(t);
              if (!i || !o) return null;
              var u = i.getLinesContent(),
                a = o.getLinesContent(),
                l = new s.DiffComputer(u, a, {
                  shouldPostProcessCharChanges: !1,
                  shouldIgnoreTrimWhitespace: n,
                  shouldConsiderTrimWhitespaceInEmptyCase: !1,
                  shouldMakePrettyDiff: !0,
                });
              return r.TPromise.as(l.computeDiff());
            }),
            (e.prototype.computeMoreMinimalEdits = function(t, n, o) {
              var s = this._getModel(t);
              if (!s) return r.TPromise.as(n);
              for (var a, l = [], c = 0, f = n; c < f.length; c++) {
                var h = f[c],
                  d = h.range,
                  p = h.text,
                  m = h.eol;
                if (('number' == typeof m && (a = m), d)) {
                  var _ = s.getValueInRange(d);
                  if (((p = p.replace(/\r\n|\n|\r/g, s.eol)), _ !== p))
                    if (Math.max(p.length, _.length) > e._diffLimit) l.push({ range: d, text: p });
                    else
                      for (
                        var g = u.stringDiff(_, p, !1),
                          v = s.offsetAt(i.Range.lift(d).getStartPosition()),
                          y = 0,
                          b = g;
                        y < b.length;
                        y++
                      ) {
                        var C = b[y],
                          E = s.positionAt(v + C.originalStart),
                          S = s.positionAt(v + C.originalStart + C.originalLength),
                          L = {
                            text: p.substr(C.modifiedStart, C.modifiedLength),
                            range: {
                              startLineNumber: E.lineNumber,
                              startColumn: E.column,
                              endLineNumber: S.lineNumber,
                              endColumn: S.column,
                            },
                          };
                        s.getValueInRange(L.range) !== L.text && l.push(L);
                      }
                }
              }
              return (
                'number' == typeof a && l.push({ eol: a, text: void 0, range: void 0 }),
                r.TPromise.as(l)
              );
            }),
            (e.prototype.computeLinks = function(e) {
              var t = this._getModel(e);
              return t ? r.TPromise.as(c.computeLinks(t)) : null;
            }),
            (e.prototype.textualSuggest = function(e, t, n, i) {
              var o = this._getModel(e);
              if (o) {
                for (
                  var s = [],
                    u = new RegExp(n, i),
                    a = o.getWordUntilPosition(t, u).word,
                    l = 0,
                    c = o.getAllUniqueWords(u);
                  l < c.length;
                  l++
                ) {
                  var f = c[l];
                  f !== a &&
                    isNaN(Number(f)) &&
                    s.push({
                      type: 'text',
                      label: f,
                      insertText: f,
                      noAutoAccept: !0,
                      overwriteBefore: a.length,
                    });
                }
                return r.TPromise.as({ suggestions: s });
              }
            }),
            (e.prototype.navigateValueSet = function(e, t, n, i, o) {
              var s = this._getModel(e);
              if (!s) return null;
              var u = new RegExp(i, o);
              t.startColumn === t.endColumn &&
                (t = {
                  startLineNumber: t.startLineNumber,
                  startColumn: t.startColumn,
                  endLineNumber: t.endLineNumber,
                  endColumn: t.endColumn + 1,
                });
              var a = s.getValueInRange(t),
                l = s.getWordAtPosition(
                  { lineNumber: t.startLineNumber, column: t.startColumn },
                  u
                ),
                c = null;
              null !== l && (c = s.getValueInRange(l));
              var h = f.BasicInplaceReplace.INSTANCE.navigateValueSet(t, a, l, c, n);
              return r.TPromise.as(h);
            }),
            (e.prototype.loadForeignModule = function(e, t) {
              var n = this;
              return new r.TPromise(function(r, i) {
                self.require(
                  [e],
                  function(e) {
                    var i = {
                      getMirrorModels: function() {
                        return n._getModels();
                      },
                    };
                    n._foreignModule = e.create(i, t);
                    var o = [];
                    for (var s in n._foreignModule)
                      'function' == typeof n._foreignModule[s] && o.push(s);
                    r(o);
                  },
                  i
                );
              });
            }),
            (e.prototype.fmr = function(e, t) {
              if (!this._foreignModule || 'function' != typeof this._foreignModule[e])
                return r.TPromise.wrapError(new Error('Missing requestHandler or method: ' + e));
              try {
                return r.TPromise.as(this._foreignModule[e].apply(this._foreignModule, t));
              } catch (e) {
                return r.TPromise.wrapError(e);
              }
            }),
            (e._diffLimit = 1e4),
            e
          );
        })();
      t.BaseEditorSimpleWorker = m;
      var _ = (function(e) {
        function t() {
          var t = e.call(this) || this;
          return (t._models = Object.create(null)), t;
        }
        return (
          o(t, e),
          (t.prototype.dispose = function() {
            this._models = Object.create(null);
          }),
          (t.prototype._getModel = function(e) {
            return this._models[e];
          }),
          (t.prototype._getModels = function() {
            var e = this,
              t = [];
            return (
              Object.keys(this._models).forEach(function(n) {
                return t.push(e._models[n]);
              }),
              t
            );
          }),
          (t.prototype.acceptNewModel = function(e) {
            this._models[e.url] = new p(n.default.parse(e.url), e.lines, e.EOL, e.versionId);
          }),
          (t.prototype.acceptModelChanged = function(e, t) {
            this._models[e] && this._models[e].onEvents(t);
          }),
          (t.prototype.acceptRemovedModel = function(e) {
            this._models[e] && delete this._models[e];
          }),
          t
        );
      })(m);
      (t.EditorSimpleWorkerImpl = _),
        (t.create = function() {
          return new _();
        });
      var g = self;
      'function' == typeof g.importScripts && (g.monaco = d.createMonacoBaseAPI());
    }),
    (function() {
      'use strict';
      var e = self.MonacoEnvironment,
        t = e && e.baseUrl ? e.baseUrl : '../../../';
      ('function' == typeof self.define && self.define.amd) || importScripts(t + 'vs/loader.js'),
        require.config({ baseUrl: t, catchError: !0 });
      var n = function(e) {
          require([e], function(e) {
            setTimeout(function() {
              var t = e.create(function(e) {
                self.postMessage(e);
              }, null);
              for (
                self.onmessage = function(e) {
                  return t.onmessage(e.data);
                };
                i.length > 0;

              )
                self.onmessage(i.shift());
            }, 0);
          });
        },
        r = !0,
        i = [];
      self.onmessage = function(e) {
        r ? ((r = !1), n(e.data)) : i.push(e);
      };
    })();
}.call(this));
//# sourceMappingURL=../../../../min-maps/vs/base/worker/workerMain.js.map
