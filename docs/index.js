(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("ClinicalTrials.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _utils = require("./utils");

var _ramda = require("ramda");

var _Paginate = _interopRequireDefault(require("./components/Paginate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var trialLens = (0, _ramda.lensProp)('trials');

var byTerms = function byTerms(ps) {
  return function (query) {
    return (0, _ramda.compose)((0, _ramda.test)(new RegExp(query, 'i')), (0, _ramda.props)(ps));
  };
};

var markBy = function markBy(q) {
  return function (str) {
    return q ? (0, _ramda.replace)(new RegExp(q, 'gi'), "<span class=\"marked\">".concat(q, "</span>"), str) : str;
  };
};

var searchData = function searchData(ps) {
  return function (query) {
    return (0, _ramda.compose)((0, _ramda.map)((0, _ramda.map)(markBy(query))), (0, _ramda.filter)(byTerms(ps)(query)));
  };
};

var Trial = function Trial() {
  var showDescription = false;
  return {
    view: function view(_ref) {
      var _ref$attrs$trial = _ref.attrs.trial,
          official_title = _ref$attrs$trial.official_title,
          start_date = _ref$attrs$trial.start_date,
          detail_description = _ref$attrs$trial.detail_description;
      return (0, _mithril["default"])('.grid-item.row', {
        onclick: function onclick() {
          return showDescription = !showDescription;
        }
      }, [(0, _mithril["default"])('h1.left', _mithril["default"].trust(official_title)), (0, _mithril["default"])('p.right', 'Start Date: ', (0, _mithril["default"])('pre', start_date)), showDescription && (0, _mithril["default"])('.row', (0, _mithril["default"])('pre.pre', _mithril["default"].trust(detail_description)))]);
    }
  };
};

var ClinicalTrials = function ClinicalTrials(_ref2) {
  var mdl = _ref2.attrs.mdl;

  var state = _objectSpread({
    error: {},
    data: undefined
  }, mdl.state.paginate, {
    props: ['official_title', 'detail_description']
  });

  var onError = function onError(error) {
    return state.error = error;
  };

  var onSuccess = function onSuccess(_ref3) {
    var trials = _ref3.trials,
        total = _ref3.total;
    state.originalData = trials;
    state.data = trials;
    state.total = total;
  };

  var getTrialData = (0, _ramda.pickAll)(['official_title', 'detail_description', 'start_date', 'nci_id']);

  var fetchData = function fetchData(http) {
    return http.getTask('https://clinicaltrialsapi.cancer.gov/v1/clinical-trials')({
      from: state.from,
      size: state.size
    }).map((0, _ramda.over)(trialLens, (0, _ramda.map)(getTrialData))).fork(onError, onSuccess);
  };

  return {
    oninit: function oninit(_ref4) {
      var http = _ref4.attrs.mdl.http;
      return fetchData(http);
    },
    onbeforeupdate: function onbeforeupdate(_ref5) {
      var query = _ref5.attrs.mdl.state.query;
      return state.data ? state.data = searchData(state.props)(query())(state.originalData) : true;
    },
    view: function view(_ref6) {
      var _ref6$attrs$mdl = _ref6.attrs.mdl,
          http = _ref6$attrs$mdl.http,
          _ref6$attrs$mdl$state = _ref6$attrs$mdl.state,
          isLoading = _ref6$attrs$mdl$state.isLoading,
          limit = _ref6$attrs$mdl$state.limit;
      return (0, _mithril["default"])('section.clinical-trials', [(0, _mithril["default"])(_Paginate["default"], {
        state: state,
        http: http,
        paginateFn: fetchData,
        limit: limit,
        mdl: mdl
      }), state.data && !isLoading() && (0, _mithril["default"])('.trials', [state.data.map(function (trial, key) {
        return (0, _mithril["default"])(Trial, {
          oncreate: (0, _utils.animateComponentEntrance)(key),
          key: key,
          trial: trial
        });
      })]), isLoading() && _utils.IsLoading]);
    }
  };
};

var _default = ClinicalTrials;
exports["default"] = _default;
});

;require.register("Layout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _Header = _interopRequireDefault(require("./components/Header.js"));

var _Footer = _interopRequireDefault(require("./components/Footer.js"));

var _Body = _interopRequireDefault(require("./components/Body.js"));

var _Modal = _interopRequireDefault(require("./components/Modal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = function Layout(_ref) {
  var mdl = _ref.attrs.mdl;
  return {
    view: function view(_ref2) {
      var children = _ref2.children;
      return (0, _mithril["default"])('section.layout', {
        id: 'layout'
      }, children ? [(0, _mithril["default"])(_Header["default"], {
        mdl: mdl
      }), mdl.state.showModal() && (0, _mithril["default"])(_Modal["default"], {
        mdl: mdl
      }, (0, _mithril["default"])('code.about', 'Search For Clinical Trials')), (0, _mithril["default"])(_Body["default"], {
        mdl: mdl
      }, [children]), (0, _mithril["default"])(_Footer["default"], {
        mdl: mdl
      })] : []);
    }
  };
};

var _default = Layout;
exports["default"] = _default;
});

;require.register("Model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.model = exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _mithrilStream = _interopRequireDefault(require("mithril-stream"));

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var routes = ['/home', '/clinical-trials', '/interventions', '/diseases', '/terms'];

function onProgress(e) {
  if (e.lengthComputable) {
    model.state.loadingProgress.max = e.total;
    model.state.loadingProgress.value = e.loaded;

    _mithril["default"].redraw();
  }
}

function onLoad() {
  return false;
}

function onLoadStart() {
  model.state.isLoading(true);
  return false;
}

function onLoadEnd() {
  model.state.isLoading(false);
  model.state.loadingProgress.max = 0;
  model.state.loadingProgress.value = 0;
  return false;
}

var xhrProgress = {
  config: function config(xhr) {
    xhr.onprogress = onProgress;
    xhr.onload = onLoad;
    xhr.onloadstart = onLoadStart;
    xhr.onloadend = onLoadEnd;
  }
};

var _task = function _task(url) {
  return function (args) {
    return new _data["default"](function (rej, res) {
      return _mithril["default"].request(url, _objectSpread({}, args, {}, xhrProgress)).then(res, rej);
    });
  };
};

var getTask = function getTask(url) {
  return function (args) {
    return _task(url)({
      params: _objectSpread({}, args),
      method: 'GET'
    });
  };
};

var postTask = function postTask(url) {
  return function (args) {
    return _task(url)(_objectSpread({}, args, {
      method: 'POST'
    }));
  };
};

var putTask = function putTask(url) {
  return function (args) {
    return _task(url)(_objectSpread({}, args, {
      method: 'PUT'
    }));
  };
};

var http = {
  getTask: getTask,
  postTask: postTask,
  putTask: putTask
};
var _default = http;
exports["default"] = _default;
var model = {
  routes: routes,
  http: http,
  limits: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  data: (0, _mithrilStream["default"])({}),
  state: {
    loadingProgress: {
      max: 0,
      value: 0
    },
    paginate: {
      from: 1,
      size: 10,
      total: 0
    },
    isLoading: (0, _mithrilStream["default"])(false),
    url: '',
    route: '',
    scrollPos: 1,
    limit: 10,
    profile: '',
    showLimits: (0, _mithrilStream["default"])(false),
    showSettings: (0, _mithrilStream["default"])(false),
    showNavigation: (0, _mithrilStream["default"])(false),
    showModal: (0, _mithrilStream["default"])(false),
    query: (0, _mithrilStream["default"])('')
  },
  toggleLimits: function toggleLimits(mdl) {
    return mdl.state.showLimits(!mdl.state.showLimits());
  },
  toggleSettings: function toggleSettings(mdl) {
    return mdl.state.showSettings(!mdl.state.showSettings());
  },
  toggleModal: function toggleModal(mdl) {
    return mdl.state.showModal(!mdl.state.showModal());
  },
  filterData: function filterData(mdl) {
    return function (query) {
      return mdl.state.query(query);
    };
  }
};
exports.model = model;
});

;require.register("OpenSecrets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var OpenSecrets = function OpenSecrets() {
  return {
    view: function view() {
      return m("section", []);
    }
  };
};

var _default = OpenSecrets;
exports["default"] = _default;
});

;require.register("components/Body.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _index = require("../utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Body = {
  oncreate: (0, _index.animate)('slideUp'),
  view: function view(_ref) {
    var children = _ref.children;
    return (0, _mithril["default"])('section.content', {
      id: 'content'
    }, children);
  }
};
var _default = Body;
exports["default"] = _default;
});

;require.register("components/Button.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Button = function Button() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          action = _ref$attrs.action,
          label = _ref$attrs.label,
          _ref$attrs$classList = _ref$attrs.classList,
          classList = _ref$attrs$classList === void 0 ? '' : _ref$attrs$classList,
          isDisabled = _ref$attrs.isDisabled;
      return (0, _mithril["default"])("button.btn.".concat(classList), {
        onclick: function onclick(e) {
          return action(e);
        },
        disabled: isDisabled
      }, label);
    }
  };
};

var _default = Button;
exports["default"] = _default;
});

;require.register("components/DropDown.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _animations = require("../utils/animations.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Selector = {
  onbeforeremove: _animations.animateChildrenLimitsExit,
  view: function view(_ref) {
    var mdl = _ref.attrs.mdl;
    return (0, _mithril["default"])('.limits', mdl.limits.map(function (limit, idx) {
      return (0, _mithril["default"])('button.btn.limit', {
        oncreate: (0, _animations.animateChildrenLimitsEntrance)(idx),
        onclick: function onclick() {
          mdl.state.limit = limit;
          mdl.state.showLimits(false);
        },
        key: idx
      }, limit);
    }));
  }
};
var DropDown = {
  view: function view(_ref2) {
    var mdl = _ref2.attrs.mdl;
    return (0, _mithril["default"])('.changeLimits', [(0, _mithril["default"])('button.btn', {
      onclick: function onclick() {
        return mdl.toggleLimits(mdl);
      }
    }, 'Change Limit'), mdl.state.showLimits() && [(0, _mithril["default"])(Selector, {
      mdl: mdl
    })]]);
  }
};
var _default = DropDown;
exports["default"] = _default;
});

;require.register("components/Footer.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _index = require("../utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Footer = {
  oncreate: (0, _index.animate)('slideUp'),
  view: function view() {
    return (0, _mithril["default"])('footer', {
      oncreate: _index.animateChildrenLimitsEntrance,
      id: 'footer'
    }, 'content served from NCI Clinical Trials Search API');
  }
};
var _default = Footer;
exports["default"] = _default;
});

;require.register("components/Hamburger.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Hamburger = function Hamburger(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = {
    close: 'M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z',
    open: 'M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'
  };

  var render = function render(dom) {
    return _mithril["default"].render(dom, (0, _mithril["default"])('path', {
      xmlns: 'http://www.w3.org/2000/svg',
      d: mdl.state.showModal() ? state.close : state.open
    }));
  };

  return {
    oncreate: function oncreate(_ref2) {
      var dom = _ref2.dom;
      var _dom = dom;
      return render(_dom);
    },
    onupdate: function onupdate(_ref3) {
      var dom = _ref3.dom;
      var _dom = dom;
      return render(_dom);
    },
    view: function view(_ref4) {
      var mdl = _ref4.attrs.mdl;
      return (0, _mithril["default"])('svg.hamburger', {
        style: {
          fill: mdl.state.showModal() ? 'white' : 'inherit'
        },
        onclick: function onclick() {
          return mdl.toggleModal(mdl);
        }
      });
    }
  };
};

var _default = Hamburger;
exports["default"] = _default;
});

;require.register("components/Header.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _Hamburger = _interopRequireDefault(require("./Hamburger.js"));

var _ProgressBar = _interopRequireDefault(require("./ProgressBar.js"));

var _DropDown = _interopRequireDefault(require("./DropDown.js"));

var _Searchbar = _interopRequireDefault(require("./Searchbar.js"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = {
  oncreate: (0, _utils.animate)("slideDown"),
  view: function view(_ref) {
    var mdl = _ref.attrs.mdl;
    return (0, _mithril["default"])("header.header", {
      id: "header"
    }, [mdl.state.isLoading() ? (0, _mithril["default"])(_ProgressBar["default"], {
      mdl: mdl
    }) : [(0, _mithril["default"])(_Hamburger["default"], {
      mdl: mdl
    }), (0, _mithril["default"])(_Searchbar["default"], {
      mdl: mdl
    }), (0, _mithril["default"])(_DropDown["default"], {
      mdl: mdl
    })]]);
  }
};
var _default = Header;
exports["default"] = _default;
});

;require.register("components/Modal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _animations = require("../utils/animations.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Modal = {
  oncreate: _animations.animateSidebarEntrance,
  onbeforeremove: _animations.slideModalOut,
  view: function view(_ref) {
    var children = _ref.children;
    return (0, _mithril["default"])('.navigationModal', children);
  }
};
var _default = Modal;
exports["default"] = _default;
});

;require.register("components/Navigation.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _animations = require("../utils/animations.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Tab = function Tab(_ref) {
  var key = _ref.attrs.key;
  return {
    oncreate: _animations.animateSidebarEntrance,
    view: function view(_ref2) {
      var tab = _ref2.attrs.tab;
      return (0, _mithril["default"])('a.tab', {
        key: key,
        id: "".concat(tab),
        href: "".concat(tab),
        oncreate: _mithril["default"].route.link
      }, tab.split('/')[1]);
    }
  };
};

var Navigation = {
  view: function view(_ref3) {
    var mdl = _ref3.attrs.mdl;
    return mdl.routes.map(function (tab, idx) {
      return (0, _mithril["default"])(Tab, {
        key: idx,
        active: mdl.state.route == tab,
        tab: tab
      });
    });
  }
};
var _default = Navigation;
exports["default"] = _default;
});

;require.register("components/Paginate.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _Button = _interopRequireDefault(require("../components/Button.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(Icons);
var Paginate = {
  view: function view(_ref) {
    var _ref$attrs = _ref.attrs,
        state = _ref$attrs.state,
        http = _ref$attrs.http,
        paginateFn = _ref$attrs.paginateFn,
        limit = _ref$attrs.limit,
        mdl = _ref$attrs.mdl;
    return (0, _mithril["default"])(".pagination", [(0, _mithril["default"])(_Button["default"], {
      action: function action() {
        state.from = state.from - mdl.state.limit;
        state.size = mdl.state.limit;
        paginateFn(http);
      },
      isDisabled: state.from - mdl.state.limit <= 0,
      label: [(0, _mithril["default"])(Icons.ArrowLeft, {
        height: "15px"
      }), limit]
    }), (0, _mithril["default"])(_Button["default"], {
      action: function action() {
        state.from = state.from + state.data.length++;
        state.size = mdl.state.limit;
        paginateFn(http);
      },
      label: [limit, (0, _mithril["default"])(Icons.ArrowRight, {
        height: "15px"
      })],
      isDisabled: state.from + mdl.state.limit > state.total
    }), (0, _mithril["default"])(".", (0, _mithril["default"])("code.code", "".concat(state.from, " - ").concat(state.from + state.size, " ")), (0, _mithril["default"])("code.code.row", " of ".concat(state.total, " ")))]);
  }
};
var _default = Paginate;
exports["default"] = _default;
});

;require.register("components/ProgressBar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ProgressBar = function ProgressBar() {
  return {
    view: function view(_ref) {
      var _ref$attrs$mdl$state$ = _ref.attrs.mdl.state.loadingProgress,
          value = _ref$attrs$mdl$state$.value,
          max = _ref$attrs$mdl$state$.max;
      return (0, _mithril["default"])('.progressBar', (0, _mithril["default"])('progress.progress', {
        max: max,
        value: value
      }));
    }
  };
};

var _default = ProgressBar;
exports["default"] = _default;
});

;require.register("components/Searchbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _helpers = require("../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debounce300 = (0, _helpers.debounce)(300);

var SearchBar = function SearchBar(_ref) {
  var mdl = _ref.attrs.mdl;
  var filterData = mdl.filterData(mdl);
  return {
    view: function view() {
      return (0, _mithril["default"])('.searchBar', [(0, _mithril["default"])('input.input', {
        placeholder: 'search query',
        oninput: function oninput(e) {
          return debounce300(filterData(e.target.value));
        }
      })]);
    }
  };
};

var _default = SearchBar;
exports["default"] = _default;
});

;require.register("components/Sidebar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _animations = require("../utils/animations.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Sidebar = {
  oncreate: _animations.animateSidebarEntrance,
  view: function view(_ref) {
    var children = _ref.children,
        classList = _ref.attrs.classList;
    return (0, _mithril["default"])("aside.".concat(classList), children);
  }
};
var _default = Sidebar;
exports["default"] = _default;
});

;require.register("components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Body = require("./Body.js");

Object.keys(_Body).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Body[key];
    }
  });
});

var _Button = require("./Button.js");

Object.keys(_Button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Button[key];
    }
  });
});

var _DropDown = require("./DropDown.js");

Object.keys(_DropDown).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DropDown[key];
    }
  });
});

var _Footer = require("./Footer.js");

Object.keys(_Footer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Footer[key];
    }
  });
});

var _Hamburger = require("./Hamburger.js");

Object.keys(_Hamburger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Hamburger[key];
    }
  });
});

var _Header = require("./Header.js");

Object.keys(_Header).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Header[key];
    }
  });
});

var _Modal = require("./Modal.js");

Object.keys(_Modal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Modal[key];
    }
  });
});

var _Sidebar = require("./Sidebar.js");

Object.keys(_Sidebar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Sidebar[key];
    }
  });
});
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _mithril = _interopRequireDefault(require("mithril"));

var _Model = require("./Model.js");

var _ClinicalTrials = _interopRequireDefault(require("./ClinicalTrials.js"));

var _Layout = _interopRequireDefault(require("./Layout.js"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var root = document.body;

function getProfile(w) {
  if (w < 668) return "phone";
  if (w < 920) return "tablet";
  return "desktop";
}

var winW = window.innerWidth;
_Model.model.state.profile = getProfile(winW);

function checkWidth() {
  var w = window.innerWidth;

  if (winW !== w) {
    winW = w;
    var lastProfile = _Model.model.state.profile;
    _Model.model.state.profile = getProfile(w);
    if (lastProfile != _Model.model.state.profile) _mithril["default"].redraw();
  }

  requestAnimationFrame(checkWidth);
}

checkWidth();

_mithril["default"].mount(root, {
  view: function view() {
    return (0, _mithril["default"])(_Layout["default"], {
      mdl: _Model.model
    }, (0, _mithril["default"])(_ClinicalTrials["default"], {
      oncreate: _utils.animate,
      mdl: _Model.model
    }));
  }
});
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  require("index.js");
});
});

;require.register("utils/animations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateChildrenLimitsExit = exports.slideModalOut = exports.animate = exports.animateChildrenLimitsEntrance = exports.animateChildrenEntrance = exports.animateSidebarEntrance = exports.animateComponentEntrance = exports.IsLoading = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var IsLoading = (0, _mithril["default"])(".holder", [(0, _mithril["default"])(".preloader", [(0, _mithril["default"])("div"), (0, _mithril["default"])("div"), (0, _mithril["default"])("div"), (0, _mithril["default"])("div"), (0, _mithril["default"])("div"), (0, _mithril["default"])("div"), (0, _mithril["default"])("div")])]);
exports.IsLoading = IsLoading;

var animateComponentEntrance = function animateComponentEntrance(idx) {
  return function (_ref) {
    var dom = _ref.dom;
    dom.style.opacity = 0;
    return setTimeout(function () {
      dom.classList.toggle("stretchRight");
      dom.style.opacity = 1;
    }, idx * 100 + 20);
  };
};

exports.animateComponentEntrance = animateComponentEntrance;

var animateSidebarEntrance = function animateSidebarEntrance(_ref2) {
  var dom = _ref2.dom;
  dom.style.opacity = 0;
  dom.classList.toggle("slideRight");
  dom.style.opacity = 1;
};

exports.animateSidebarEntrance = animateSidebarEntrance;

var animateChildrenEntrance = function animateChildrenEntrance(_ref3) {
  var dom = _ref3.dom;

  var children = _toConsumableArray(dom.children);

  return children.map(function (child, idx) {
    child.style.opacity = 0;
    setTimeout(function () {
      child.classList.toggle("slideRight");
      child.style.opacity = 1;
    }, (idx + 1) * 10);
  });
};

exports.animateChildrenEntrance = animateChildrenEntrance;

var animateChildrenLimitsEntrance = function animateChildrenLimitsEntrance(idx) {
  return function (_ref4) {
    var dom = _ref4.dom;
    dom.style.opacity = 0;
    setTimeout(function () {
      dom.classList.toggle("slideDown");
      dom.style.opacity = 1;
    }, (idx + 1) * 200);
  };
};

exports.animateChildrenLimitsEntrance = animateChildrenLimitsEntrance;

var animate = function animate(dir) {
  return function (_ref5) {
    var dom = _ref5.dom;
    dom.style.opacity = 0;
    setTimeout(function () {
      dom.classList.toggle(dir);
      dom.style.opacity = 1;
    }, 200);
  };
};

exports.animate = animate;

var slideModalOut = function slideModalOut(_ref6) {
  var dom = _ref6.dom;
  return new Promise(function (res) {
    dom.classList.remove("slideRight");
    setTimeout(function () {
      dom.classList.add("reverseAnimation", "slideRight");
    }, 200);
    return dom.addEventListener("animationend", res);
  });
};

exports.slideModalOut = slideModalOut;

var animateChildrenLimitsExit = function animateChildrenLimitsExit(_ref7) {
  var dom = _ref7.dom;
  return new Promise(function () {
    ;

    _toConsumableArray(dom.children).reverse().map(function (child, idx) {
      return setTimeout(function () {
        child.style.display = "none";
      }, idx * 100);
    });
  });
};

exports.animateChildrenLimitsExit = animateChildrenLimitsExit;
});

;require.register("utils/helpers.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = exports.filterTask = exports._paginate = exports._direction = exports._sort = exports._search = exports.addTerms = exports.infiniteScroll = exports.isEmpty = exports.log = void 0;

var _ramda = require("ramda");

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var log = function log(m) {
  return function (v) {
    console.log(m, v);
    return v;
  };
};

exports.log = log;

var isEmpty = function isEmpty(data) {
  return data.length == 0;
};

exports.isEmpty = isEmpty;

var infiniteScroll = function infiniteScroll(mdl) {
  return function (e) {
    var route = mdl.state.route;
    var length = mdl.data[route].data.length;
    var setpoint = 10 * length * mdl.state.scrollPos;

    if (e.target.scrollTop - mdl.state.scrollPos >= setpoint) {
      mdl.state.scrollPos++ + e.target.scrollTop;
    }
  };
};

exports.infiniteScroll = infiniteScroll;

var addTerms = function addTerms(item) {
  var terms = (0, _ramda.compose)((0, _ramda.join)(' '), _ramda.values, (0, _ramda.props)(['uuid', 'id', 'name']))(item);
  return (0, _ramda.assoc)('_terms', terms, item);
};

exports.addTerms = addTerms;

var byTerms = function byTerms(query) {
  return (0, _ramda.compose)((0, _ramda.test)(new RegExp(query, 'i')), (0, _ramda.prop)('name'));
};

var _search = function _search(query) {
  return (0, _ramda.compose)((0, _ramda.filter)(byTerms(query)));
};

exports._search = _search;

var _sort = function _sort(p) {
  return (0, _ramda.sortBy)((0, _ramda.compose)(_ramda.toLower, toString, (0, _ramda.prop)(p)));
};

exports._sort = _sort;

var _direction = function _direction(dir) {
  return dir == 'asc' ? _ramda.identity : _ramda.reverse;
};

exports._direction = _direction;

var _paginate = function _paginate(offset) {
  return function (limit) {
    return function (data) {
      return (0, _ramda.slice)((0, _ramda.max)(0, (0, _ramda.min)(offset, data.length)), (0, _ramda.min)(offset + limit, data.length), data);
    };
  };
};

exports._paginate = _paginate;

var filterTask = function filterTask(query) {
  return function (prop) {
    return function (direction) {
      return function (offset) {
        return function (limit) {
          return (0, _ramda.compose)(_data["default"].of, (0, _ramda.map)(_paginate(offset)(limit)), (0, _ramda.map)(_direction(direction)), (0, _ramda.map)(_sort(prop)), _search(query));
        };
      };
    };
  };
};

exports.filterTask = filterTask;

var debounce = function debounce(wait, now) {
  return function (fn) {
    var timeout = undefined;
    return function () {
      var context = this;
      var args = arguments;

      var later = function later() {
        timeout = undefined;
        if (!now) fn.apply(context, args);
      };

      var callNow = now && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      console.log(fn);
      if (callNow) fn.apply(context, args);
    };
  };
};

exports.debounce = debounce;
});

;require.register("utils/http.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _data = _interopRequireDefault(require("data.task"));

var _Model = _interopRequireDefault(require("../Model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _http = function _http(mdl) {
  mdl.isLoading(!mdl.isLoading);
  return _mithril["default"].request;
};

var _task = function _task(url) {
  return function (args) {
    return new _data["default"](function (rej, res) {
      return _http(_Model["default"])(url, args).then(res, rej);
    });
  };
};

var getTask = function getTask(url) {
  return function (args) {
    return _task(url)(_objectSpread({}, args, {
      method: 'GET'
    }));
  };
};

var postTask = function postTask(url) {
  return function (args) {
    return _task(url)(_objectSpread({}, args, {
      method: 'POST'
    }));
  };
};

var putTask = function putTask(url) {
  return function (args) {
    return _task(url)(_objectSpread({}, args, {
      method: 'PUT'
    }));
  };
};

var http = {
  getTask: getTask,
  postTask: postTask,
  putTask: putTask
};
var _default = http;
exports["default"] = _default;
});

;require.register("utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animations = require("./animations.js");

Object.keys(_animations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animations[key];
    }
  });
});

var _helpers = require("./helpers.js");

Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helpers[key];
    }
  });
});

var _http = require("./http.js");

Object.keys(_http).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _http[key];
    }
  });
});
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.Stream = require("mithril-stream/stream.js");
window.m = require("mithril");
window.Icons = require("@mithril-icons/feather/cjs");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=index.js.map