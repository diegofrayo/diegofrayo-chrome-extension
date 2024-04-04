var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/js-convert-case/lib/modules/js-camelcase/index.js
var require_js_camelcase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-camelcase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toCamelCase(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/[^A-Za-z0-9]+/g, "$").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "$" + b;
      }).toLowerCase().replace(/(\$)(\w)/g, function(m, a, b) {
        return b.toUpperCase();
      });
    }
    exports.default = toCamelCase;
  }
});

// node_modules/js-convert-case/lib/modules/js-snakecase/index.js
var require_js_snakecase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-snakecase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toSnakeCase(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "_" + b.toLowerCase();
      }).replace(/[^A-Za-z0-9]+|_+/g, "_").toLowerCase();
    }
    exports.default = toSnakeCase;
  }
});

// node_modules/js-convert-case/lib/modules/js-pascalcase/index.js
var require_js_pascalcase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-pascalcase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toPascalCase(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$").replace(/[^A-Za-z0-9]+/g, "$").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "$" + b;
      }).toLowerCase().replace(/(\$)(\w?)/g, function(m, a, b) {
        return b.toUpperCase();
      });
    }
    exports.default = toPascalCase;
  }
});

// node_modules/js-convert-case/lib/modules/js-dotcase/index.js
var require_js_dotcase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-dotcase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toDotCase(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "_" + b.toLowerCase();
      }).replace(/[^A-Za-z0-9]+|_+/g, ".").toLowerCase();
    }
    exports.default = toDotCase;
  }
});

// node_modules/js-convert-case/lib/modules/js-pathcase/index.js
var require_js_pathcase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-pathcase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toPathCase(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "_" + b.toLowerCase();
      }).replace(/[^A-Za-z0-9]+|_+/g, "/").toLowerCase();
    }
    exports.default = toPathCase;
  }
});

// node_modules/js-convert-case/lib/modules/js-textcase/index.js
var require_js_textcase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-textcase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toTextCase(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "_" + b.toLowerCase();
      }).replace(/[^A-Za-z0-9]+|_+/g, " ").toLowerCase();
    }
    exports.default = toTextCase;
  }
});

// node_modules/js-convert-case/lib/modules/js-sentencecase/index.js
var require_js_sentencecase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-sentencecase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toSentenceCase2(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      var textcase = String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "_" + b.toLowerCase();
      }).replace(/[^A-Za-z0-9]+|_+/g, " ").toLowerCase();
      return textcase.charAt(0).toUpperCase() + textcase.slice(1);
    }
    exports.default = toSentenceCase2;
  }
});

// node_modules/js-convert-case/lib/modules/js-headercase/index.js
var require_js_headercase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-headercase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toHeaderCase(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "_" + b.toLowerCase();
      }).replace(/[^A-Za-z0-9]+|_+/g, " ").toLowerCase().replace(/( ?)(\w+)( ?)/g, function(m, a, b, c) {
        return a + b.charAt(0).toUpperCase() + b.slice(1) + c;
      });
    }
    exports.default = toHeaderCase;
  }
});

// node_modules/js-convert-case/lib/modules/js-kebabcase/index.js
var require_js_kebabcase = __commonJS({
  "node_modules/js-convert-case/lib/modules/js-kebabcase/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toKebabCase(str) {
      if (str === void 0) {
        str = "";
      }
      if (!str)
        return "";
      return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/([a-z])([A-Z])/g, function(m, a, b) {
        return a + "_" + b.toLowerCase();
      }).replace(/[^A-Za-z0-9]+|_+/g, "-").toLowerCase();
    }
    exports.default = toKebabCase;
  }
});

// node_modules/js-convert-case/lib/modules/extends/utils.js
var require_utils = __commonJS({
  "node_modules/js-convert-case/lib/modules/extends/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.belongToTypes = exports.isValidObject = exports.isArrayObject = exports.validateOptions = exports.DefaultOption = void 0;
    exports.DefaultOption = {
      recursive: false,
      recursiveInArray: false,
      keepTypesOnRecursion: []
    };
    exports.validateOptions = function(opt) {
      if (opt === void 0) {
        opt = exports.DefaultOption;
      }
      if (opt.recursive == null) {
        opt = exports.DefaultOption;
      } else if (opt.recursiveInArray == null) {
        opt.recursiveInArray = false;
      }
      return opt;
    };
    exports.isArrayObject = function(obj) {
      return obj != null && Array.isArray(obj);
    };
    exports.isValidObject = function(obj) {
      return obj != null && typeof obj === "object" && !Array.isArray(obj);
    };
    exports.belongToTypes = function(obj, types) {
      return (types || []).some(function(Type) {
        return obj instanceof Type;
      });
    };
  }
});

// node_modules/js-convert-case/lib/modules/extends/lowercase-keys-object/index.js
var require_lowercase_keys_object = __commonJS({
  "node_modules/js-convert-case/lib/modules/extends/lowercase-keys-object/index.js"(exports) {
    "use strict";
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function lowerKeys(obj, opt) {
      if (opt === void 0) {
        opt = utils_1.DefaultOption;
      }
      if (!utils_1.isValidObject(obj))
        return null;
      opt = utils_1.validateOptions(opt);
      var res = {};
      Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        var nkey = key.toLowerCase();
        if (opt.recursive) {
          if (utils_1.isValidObject(value)) {
            if (!utils_1.belongToTypes(value, opt.keepTypesOnRecursion)) {
              value = lowerKeys(value, opt);
            }
          } else if (opt.recursiveInArray && utils_1.isArrayObject(value)) {
            value = __spreadArrays(value).map(function(v2) {
              var ret = v2;
              if (utils_1.isValidObject(v2)) {
                if (!utils_1.belongToTypes(ret, opt.keepTypesOnRecursion)) {
                  ret = lowerKeys(v2, opt);
                }
              } else if (utils_1.isArrayObject(v2)) {
                var temp = lowerKeys({ key: v2 }, opt);
                ret = temp.key;
              }
              return ret;
            });
          }
        }
        res[nkey] = value;
      });
      return res;
    }
    exports.default = lowerKeys;
  }
});

// node_modules/js-convert-case/lib/modules/extends/uppercase-keys-object/index.js
var require_uppercase_keys_object = __commonJS({
  "node_modules/js-convert-case/lib/modules/extends/uppercase-keys-object/index.js"(exports) {
    "use strict";
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function upperKeys(obj, opt) {
      if (opt === void 0) {
        opt = utils_1.DefaultOption;
      }
      if (!utils_1.isValidObject(obj))
        return null;
      opt = utils_1.validateOptions(opt);
      var res = {};
      Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        var nkey = key.toUpperCase();
        if (opt.recursive) {
          if (utils_1.isValidObject(value)) {
            if (!utils_1.belongToTypes(value, opt.keepTypesOnRecursion)) {
              value = upperKeys(value, opt);
            }
          } else if (opt.recursiveInArray && utils_1.isArrayObject(value)) {
            value = __spreadArrays(value).map(function(v2) {
              var ret = v2;
              if (utils_1.isValidObject(v2)) {
                if (!utils_1.belongToTypes(ret, opt.keepTypesOnRecursion)) {
                  ret = upperKeys(v2, opt);
                }
              } else if (utils_1.isArrayObject(v2)) {
                var temp = upperKeys({ key: v2 }, opt);
                ret = temp.key;
              }
              return ret;
            });
          }
        }
        res[nkey] = value;
      });
      return res;
    }
    exports.default = upperKeys;
  }
});

// node_modules/js-convert-case/lib/modules/extends/camelcase-keys-object/index.js
var require_camelcase_keys_object = __commonJS({
  "node_modules/js-convert-case/lib/modules/extends/camelcase-keys-object/index.js"(exports) {
    "use strict";
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var js_camelcase_1 = require_js_camelcase();
    function camelKeys(obj, opt) {
      if (opt === void 0) {
        opt = utils_1.DefaultOption;
      }
      if (!utils_1.isValidObject(obj))
        return null;
      opt = utils_1.validateOptions(opt);
      var res = {};
      Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        var nkey = js_camelcase_1.default(key);
        if (opt.recursive) {
          if (utils_1.isValidObject(value)) {
            if (!utils_1.belongToTypes(value, opt.keepTypesOnRecursion)) {
              value = camelKeys(value, opt);
            }
          } else if (opt.recursiveInArray && utils_1.isArrayObject(value)) {
            value = __spreadArrays(value).map(function(v2) {
              var ret = v2;
              if (utils_1.isValidObject(v2)) {
                if (!utils_1.belongToTypes(ret, opt.keepTypesOnRecursion)) {
                  ret = camelKeys(v2, opt);
                }
              } else if (utils_1.isArrayObject(v2)) {
                var temp = camelKeys({ key: v2 }, opt);
                ret = temp.key;
              }
              return ret;
            });
          }
        }
        res[nkey] = value;
      });
      return res;
    }
    exports.default = camelKeys;
  }
});

// node_modules/js-convert-case/lib/modules/extends/snakecase-keys-object/index.js
var require_snakecase_keys_object = __commonJS({
  "node_modules/js-convert-case/lib/modules/extends/snakecase-keys-object/index.js"(exports) {
    "use strict";
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var js_snakecase_1 = require_js_snakecase();
    function snakeKeys(obj, opt) {
      if (opt === void 0) {
        opt = utils_1.DefaultOption;
      }
      if (!utils_1.isValidObject(obj))
        return null;
      opt = utils_1.validateOptions(opt);
      var res = {};
      Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        var nkey = js_snakecase_1.default(key);
        if (opt.recursive) {
          if (utils_1.isValidObject(value)) {
            if (!utils_1.belongToTypes(value, opt.keepTypesOnRecursion)) {
              value = snakeKeys(value, opt);
            }
          } else if (opt.recursiveInArray && utils_1.isArrayObject(value)) {
            value = __spreadArrays(value).map(function(v2) {
              var ret = v2;
              if (utils_1.isValidObject(v2)) {
                if (!utils_1.belongToTypes(ret, opt.keepTypesOnRecursion)) {
                  ret = snakeKeys(v2, opt);
                }
              } else if (utils_1.isArrayObject(v2)) {
                var temp = snakeKeys({ key: v2 }, opt);
                ret = temp.key;
              }
              return ret;
            });
          }
        }
        res[nkey] = value;
      });
      return res;
    }
    exports.default = snakeKeys;
  }
});

// node_modules/js-convert-case/lib/modules/extends/pascalcase-keys-object/index.js
var require_pascalcase_keys_object = __commonJS({
  "node_modules/js-convert-case/lib/modules/extends/pascalcase-keys-object/index.js"(exports) {
    "use strict";
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var js_pascalcase_1 = require_js_pascalcase();
    function pascalKeys(obj, opt) {
      if (opt === void 0) {
        opt = utils_1.DefaultOption;
      }
      if (!utils_1.isValidObject(obj))
        return null;
      opt = utils_1.validateOptions(opt);
      var res = {};
      Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        var nkey = js_pascalcase_1.default(key);
        if (opt.recursive) {
          if (utils_1.isValidObject(value)) {
            if (!utils_1.belongToTypes(value, opt.keepTypesOnRecursion)) {
              value = pascalKeys(value, opt);
            }
          } else if (opt.recursiveInArray && utils_1.isArrayObject(value)) {
            value = __spreadArrays(value).map(function(v2) {
              var ret = v2;
              if (utils_1.isValidObject(v2)) {
                if (!utils_1.belongToTypes(ret, opt.keepTypesOnRecursion)) {
                  ret = pascalKeys(v2, opt);
                }
              } else if (utils_1.isArrayObject(v2)) {
                var temp = pascalKeys({ key: v2 }, opt);
                ret = temp.key;
              }
              return ret;
            });
          }
        }
        res[nkey] = value;
      });
      return res;
    }
    exports.default = pascalKeys;
  }
});

// node_modules/js-convert-case/lib/modules/extends/kebabcase-keys-object/index.js
var require_kebabcase_keys_object = __commonJS({
  "node_modules/js-convert-case/lib/modules/extends/kebabcase-keys-object/index.js"(exports) {
    "use strict";
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var js_kebabcase_1 = require_js_kebabcase();
    function kebabKeys(obj, opt) {
      if (opt === void 0) {
        opt = utils_1.DefaultOption;
      }
      if (!utils_1.isValidObject(obj))
        return null;
      opt = utils_1.validateOptions(opt);
      var res = {};
      Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        var nkey = js_kebabcase_1.default(key);
        if (opt.recursive) {
          if (utils_1.isValidObject(value)) {
            if (!utils_1.belongToTypes(value, opt.keepTypesOnRecursion)) {
              value = kebabKeys(value, opt);
            }
          } else if (opt.recursiveInArray && utils_1.isArrayObject(value)) {
            value = __spreadArrays(value).map(function(v2) {
              var ret = v2;
              if (utils_1.isValidObject(v2)) {
                if (!utils_1.belongToTypes(ret, opt.keepTypesOnRecursion)) {
                  ret = kebabKeys(v2, opt);
                }
              } else if (utils_1.isArrayObject(v2)) {
                var temp = kebabKeys({ key: v2 }, opt);
                ret = temp.key;
              }
              return ret;
            });
          }
        }
        res[nkey] = value;
      });
      return res;
    }
    exports.default = kebabKeys;
  }
});

// node_modules/js-convert-case/lib/index.js
var require_lib = __commonJS({
  "node_modules/js-convert-case/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.kebabKeys = exports.pascalKeys = exports.snakeKeys = exports.camelKeys = exports.upperKeys = exports.lowerKeys = exports.toLowerCase = exports.toUpperCase = exports.toKebabCase = exports.toHeaderCase = exports.toSentenceCase = exports.toTextCase = exports.toPathCase = exports.toDotCase = exports.toPascalCase = exports.toSnakeCase = exports.toCamelCase = void 0;
    var js_camelcase_1 = require_js_camelcase();
    exports.toCamelCase = js_camelcase_1.default;
    var js_snakecase_1 = require_js_snakecase();
    exports.toSnakeCase = js_snakecase_1.default;
    var js_pascalcase_1 = require_js_pascalcase();
    exports.toPascalCase = js_pascalcase_1.default;
    var js_dotcase_1 = require_js_dotcase();
    exports.toDotCase = js_dotcase_1.default;
    var js_pathcase_1 = require_js_pathcase();
    exports.toPathCase = js_pathcase_1.default;
    var js_textcase_1 = require_js_textcase();
    exports.toTextCase = js_textcase_1.default;
    var js_sentencecase_1 = require_js_sentencecase();
    exports.toSentenceCase = js_sentencecase_1.default;
    var js_headercase_1 = require_js_headercase();
    exports.toHeaderCase = js_headercase_1.default;
    var js_kebabcase_1 = require_js_kebabcase();
    exports.toKebabCase = js_kebabcase_1.default;
    var lowercase_keys_object_1 = require_lowercase_keys_object();
    exports.lowerKeys = lowercase_keys_object_1.default;
    var uppercase_keys_object_1 = require_uppercase_keys_object();
    exports.upperKeys = uppercase_keys_object_1.default;
    var camelcase_keys_object_1 = require_camelcase_keys_object();
    exports.camelKeys = camelcase_keys_object_1.default;
    var snakecase_keys_object_1 = require_snakecase_keys_object();
    exports.snakeKeys = snakecase_keys_object_1.default;
    var pascalcase_keys_object_1 = require_pascalcase_keys_object();
    exports.pascalKeys = pascalcase_keys_object_1.default;
    var kebabcase_keys_object_1 = require_kebabcase_keys_object();
    exports.kebabKeys = kebabcase_keys_object_1.default;
    var toLowerCase = function(str) {
      return String(str || "").toLowerCase();
    };
    exports.toLowerCase = toLowerCase;
    var toUpperCase = function(str) {
      return String(str || "").toUpperCase();
    };
    exports.toUpperCase = toUpperCase;
    var jsConvert = {
      toCamelCase: js_camelcase_1.default,
      toSnakeCase: js_snakecase_1.default,
      toPascalCase: js_pascalcase_1.default,
      toDotCase: js_dotcase_1.default,
      toPathCase: js_pathcase_1.default,
      toTextCase: js_textcase_1.default,
      toSentenceCase: js_sentencecase_1.default,
      toHeaderCase: js_headercase_1.default,
      toKebabCase: js_kebabcase_1.default,
      toUpperCase,
      toLowerCase,
      lowerKeys: lowercase_keys_object_1.default,
      upperKeys: uppercase_keys_object_1.default,
      camelKeys: camelcase_keys_object_1.default,
      snakeKeys: snakecase_keys_object_1.default,
      pascalKeys: pascalcase_keys_object_1.default,
      kebabKeys: kebabcase_keys_object_1.default
    };
    exports.default = jsConvert;
  }
});

// node_modules/js-convert-case/index.js
var require_js_convert_case = __commonJS({
  "node_modules/js-convert-case/index.js"(exports, module) {
    module.exports = require_lib();
  }
});

// src/@diegofrayo/v.ts
function isString(input) {
  return typeof input === "string";
}
function isNumber(input) {
  return typeof input === "number";
}
function isBoolean(input) {
  return typeof input === "boolean";
}
function isDate(input) {
  return input instanceof Date;
}
function isNull(input) {
  return input === null;
}
function isUndefined(input) {
  return typeof input === "undefined";
}
function isObject(input) {
  if (isNil(input) || isArray(input))
    return false;
  return typeof input === "object";
}
function isArray(input) {
  return Array.isArray(input);
}
function isArrayOf(input, type) {
  return Array.isArray(input) && input.every((item) => typeof item === type);
}
function isFunction(input) {
  return isUndefined(input) === false && typeof input === "function";
}
function isEmptyString(input) {
  return typeof input === "string" && input.length === 0;
}
function isNotEmptyString(input) {
  return typeof input === "string" && input.length > 0;
}
function between(input, range) {
  return input >= range[0] && input <= range[1];
}
function isTrue(input) {
  return input === true;
}
function isFalse(input) {
  return input === false;
}
function isNotEmptyArray(input) {
  return Array.isArray(input) && input.length > 0;
}
function isEmptyArray(input) {
  return Array.isArray(input) && input.length === 0;
}
function isEmptyObject(input) {
  return isObject(input) && Object.keys(input).length === 0 && Object.getPrototypeOf(input) === Object.prototype;
}
function isNotEmptyObject(input) {
  return isObject(input) && Object.keys(input).length > 0;
}
function isEmpty(input) {
  return isEmptyString(input) || isEmptyObject(input) || isEmptyArray(input);
}
function isNotEmpty(input) {
  return isEmpty(input) === false;
}
function isNil(input) {
  return input === null || input === void 0;
}
function isNotNil(input) {
  return isNil(input) === false;
}
function isFalsy(input) {
  return !input;
}
function isEqual(input1, input2) {
  return input1 === input2;
}
function isNotEqual(input1, input2) {
  return isEqual(input1, input2) === false;
}
function isDefined(input) {
  return input !== void 0;
}
function exists(input) {
  return isDefined(input);
}
function notFound(input) {
  return isDefined(input) === false;
}
function isEmail(email) {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ) !== null;
}
var v = {
  // --- PRIMITIVES ---
  isString,
  isNumber,
  isBoolean,
  isDate,
  isNull,
  isUndefined,
  isObject,
  isArray,
  isArrayOf,
  isFunction,
  // --- STRINGS ---
  isEmptyString,
  isNotEmptyString,
  // --- NUMBERS ---
  between,
  // --- BOOLEANS ---
  isTrue,
  isFalse,
  // --- ARRAYS ---
  isNotEmptyArray,
  isEmptyArray,
  // --- OBJECTS ---
  isEmptyObject,
  isNotEmptyObject,
  // --- SEMANTICS ---
  isEmpty,
  isNotEmpty,
  isNil,
  isNotNil,
  isFalsy,
  isEqual,
  isNotEqual,
  isDefined,
  exists,
  notFound,
  // --- VALUES ---
  isEmail
};
var v_default = v;

// src/@diegofrayo/utils/strings.ts
function replaceAll(str, toReplace, replacement) {
  if (v_default.isArray(toReplace)) {
    return toReplace.reduce(
      (result, item) => result.replace(new RegExp(escapeRegExp(item), "g"), replacement),
      str
    );
  }
  return str.replace(new RegExp(escapeRegExp(toReplace), "g"), replacement);
}
function addLeftPadding(number) {
  return `${number < 10 ? "0" : ""}${number}`;
}
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// src/scripts/bets/utils.ts
function getTextContent(element) {
  if (!element) {
    return "";
  }
  const TEXT_NODE = 3;
  let text = "";
  for (let i = 0; i < element.childNodes.length; ++i) {
    if (element.childNodes[i].nodeType === TEXT_NODE) {
      text += element.childNodes[i].textContent || "";
    }
  }
  return text.trim();
}
function parseHTML(html) {
  return new DOMParser().parseFromString(html, "text/html");
}

// src/scripts/bets/rushbet.ts
var Rushbet = class {
  constructor() {
    this.COMMON_SELECTORS = {
      BETS: ".KambiBC-react-collapsable-container",
      BET_TYPE: ".KambiBC-my-bets-summary__coupon-top-left .KambiBC-my-bets-summary__title",
      BET_DATE: ".KambiBC-my-bets-summary__coupon-top-right .KambiBC-my-bets-summary__coupon-date",
      BET_NAME: ".KambiBC-my-bets-summary__coupon-bottom-left .KambiBC-my-bets-summary-coupon__event-list-name > span",
      BET_TEAMS: ".KambiBC-my-bets-summary__coupon-bottom-left .KambiBC-my-bets-summary-coupon__outcome-name",
      BET_STAKE: ".KambiBC-my-bets-summary__coupon-bottom-right .KambiBC-my-bets-summary__stake-value",
      BET_PAYMENT: ".KambiBC-my-bets-summary__coupon-bottom-right .KambiBC-my-bets-summary-payout__value"
    };
    this.SIMPLE_BETS_SELECTORS = {
      BET_QUOTA: ".KambiBC-my-bets-summary__coupon-top-left .KambiBC-my-bets-summary__value .KambiBC-my-bets-summary__value"
    };
    this.MULTIPLE_BETS_SELECTORS = {
      BET_QUOTA: ".KambiBC-my-bets-summary__coupon-bottom-left .KambiBC-my-bets-summary__odds-bog .KambiBC-my-bets-summary__value",
      BET_ITEMS: ".KambiBC-my-bets-summary-coupon__event-list > div",
      BET_ITEM_QUOTA: ".KambiBC-my-bets-summary__value"
    };
    this.name = "rushbet";
  }
  getBetsElements(document) {
    return document.querySelectorAll(this.COMMON_SELECTORS.BETS);
  }
  getBetType(betElement) {
    const betType = getTextContent(betElement.querySelector(this.COMMON_SELECTORS.BET_TYPE));
    if (betType === "Sencilla") {
      return betType;
    }
    return "Combinada";
  }
  getBetDate(betElement) {
    const [day, month, year] = (betElement.querySelector(this.COMMON_SELECTORS.BET_DATE)?.textContent || "").split(" \u2022 ")[0].toLowerCase().replace("ene", "01").replace("feb", "02").replace("mar", "03").replace("abr", "04").replace("may", "05").replace("jun", "06").replace("jul", "06").split(" ");
    return `${year}/${month}/${addLeftPadding(Number(day))}`;
  }
  getBetNameAndDetails(betElement, teamA, teamB) {
    const result = (betElement.querySelector(this.COMMON_SELECTORS.BET_NAME)?.textContent || "").split("@")[0].trim().split(":").map((item) => item.trim());
    let name = result[0].replace("1.\xAA", "1ra").replace("2.\xAA", "2da").replace("1\xAA", "1ra").replace("2\xAA", "2da");
    let details = result[1].replace("Menos de ", "<").replace("M\xE1s de ", ">").replace(teamA, "Local").replace(teamB, "Visitante");
    if (name.includes(teamA)) {
      name = name.replace(teamA, "por equipo").replace("de por", "por");
      details = `${details} (Local)`;
    } else if (name.includes(teamB)) {
      name = name.replace(teamB, "por equipo").replace("de por", "por");
      details = `${details} (Visitante)`;
    }
    if (name === "2da parte") {
      name = "Medio tiempo (2da parte)";
    } else if (name === "1ra parte") {
      name = "Medio tiempo (1ra parte)";
    }
    name = name.replace("a favor por equipo", "por equipo");
    return [name, details];
  }
  getBetTeams(betElement) {
    const [teamA, teamB] = (betElement.querySelector(this.COMMON_SELECTORS.BET_TEAMS)?.textContent || "").split(" - ") || ["", ""];
    return [teamA, teamB];
  }
  getBetQuota(betType, betElement) {
    return Number(
      getTextContent(
        betElement.querySelector(
          betType === "Combinada" ? this.MULTIPLE_BETS_SELECTORS.BET_QUOTA : this.SIMPLE_BETS_SELECTORS.BET_QUOTA
        )
      )
    );
  }
  getBetStake(betElement) {
    const stake = Number(
      getTextContent(betElement.querySelector(this.COMMON_SELECTORS.BET_STAKE)).replace(".", "").replace("$", "")
    );
    return stake;
  }
  getBetPayment(betElement, stake) {
    const payment = Number(
      getTextContent(betElement.querySelector(this.COMMON_SELECTORS.BET_PAYMENT)).replace(".", "").replace("$", "")
    );
    if (payment) {
      return payment;
    }
    return stake * -1;
  }
  getMultipleBetItemsElements(betElement) {
    return betElement.querySelectorAll(this.MULTIPLE_BETS_SELECTORS.BET_ITEMS);
  }
  getBetItemQuota(betElement) {
    return Number(
      getTextContent(betElement.querySelector(this.MULTIPLE_BETS_SELECTORS.BET_ITEM_QUOTA))
    );
  }
  parseHTML(html) {
    return parseHTML(html);
  }
};
var rushbet_default = Rushbet;

// src/scripts/bets/bethouse.ts
var import_js_convert_case = __toESM(require_js_convert_case());
var BetHouse = class {
  constructor(betHouse) {
    this.betHouse = betHouse;
  }
  extractBetsData(document, configParam) {
    const bets = [];
    const config = {
      ...configParam,
      lastBetDate: replaceAll(configParam.lastBetDate || "", "-", "/")
    };
    this.betHouse.getBetsElements(document).forEach((betElement) => {
      const betType = this.betHouse.getBetType(betElement);
      if (betType === "Sencilla") {
        const date = this.betHouse.getBetDate(betElement);
        const [teamA, teamB] = this.betHouse.getBetTeams(betElement);
        const [name, details] = this.betHouse.getBetNameAndDetails(betElement, teamA, teamB);
        const quota = this.betHouse.getBetQuota(betType, betElement);
        const stake = this.betHouse.getBetStake(betElement);
        const payment = this.betHouse.getBetPayment(betElement, stake);
        const bet = {
          type: "Sencilla",
          date,
          name,
          details,
          teamA,
          teamB,
          quota,
          stake,
          payment
        };
        bets.push(bet);
      } else {
        const date = this.betHouse.getBetDate(betElement);
        const quota = this.betHouse.getBetQuota(betType, betElement);
        const stake = this.betHouse.getBetStake(betElement);
        const payment = this.betHouse.getBetPayment(betElement, stake);
        const bet = {
          type: "Combinada",
          date,
          quota,
          stake,
          payment,
          bets: []
        };
        this.betHouse.getMultipleBetItemsElements(betElement).forEach((betElement2) => {
          const [teamA, teamB] = this.betHouse.getBetTeams(betElement2);
          const [name, details] = this.betHouse.getBetNameAndDetails(betElement2, teamA, teamB);
          const quota2 = this.betHouse.getBetItemQuota(betElement2);
          bet.bets.push({
            name,
            details,
            teamA,
            teamB,
            quota: quota2
          });
        });
        bets.push(bet);
      }
    });
    return this.toCSV(
      bets.filter((bet) => {
        if (config.lastBetDate && bet.date >= config.lastBetDate || !config.lastBetDate) {
          return true;
        }
        return false;
      }).reverse(),
      config
    );
  }
  parseHTML(html) {
    return this.betHouse.parseHTML(html);
  }
  toCSV(bets, config) {
    return bets.map((bet, index) => {
      const betId = (config.lastBetId || 1) + index;
      if (bet.type === "Combinada") {
        return bet.bets.map((betItem, betItemIndex) => {
          return [
            this.parseNumber(betItemIndex === 0 ? betId + 0.1 : betId),
            betItem.teamA,
            betItem.teamB,
            this.parseBetName(betItem.name),
            betItem.details,
            this.parseNumber(bet.quota),
            bet.date,
            (0, import_js_convert_case.toSentenceCase)(config.betHouseName),
            "NO",
            betItemIndex === 0 ? bet.stake : "",
            betItemIndex === 0 ? bet.payment : ""
          ].join(";");
        }).join("\n");
      }
      return [
        this.parseNumber(betId),
        bet.teamA,
        bet.teamB,
        this.parseBetName(bet.name),
        bet.details,
        this.parseNumber(bet.quota),
        bet.date,
        (0, import_js_convert_case.toSentenceCase)(config.betHouseName),
        "NO",
        bet.stake,
        bet.payment
      ].join(";");
    }).join("\n");
  }
  parseBetName(betName) {
    return (0, import_js_convert_case.toSentenceCase)(betName).replace("Ambos equipos marcar n", "Ambos equipos marcar\xE1n");
  }
  parseNumber(number) {
    return String(number).replace(".", ",");
  }
};
var bethouse_default = BetHouse;

// src/scripts/bets/index.ts
var BetsService = {
  readBets: function readBets(domHTML, config) {
    const BetHouse2 = new bethouse_default(
      config.betHouseName === "rushbet" ? new rushbet_default() : new rushbet_default()
    );
    const bets = BetHouse2.extractBetsData(BetHouse2.parseHTML(domHTML), config);
    return bets;
  }
};
export {
  BetsService
};
//# sourceMappingURL=bets.js.map
