module.exports.setup = function (_P) {
    var not, argsToArray, arrayPrototypeSlice, getType,
        applyToAllAssertion, isNoModifier, modifiers, c, eq;

    arrayPrototypeSlice = Array.prototype.slice;
    getType = Function.prototype.call.bind(Object.prototype.toString);
    argsToArray = _P.toArray || Function.prototype.call.bind(arrayPrototypeSlice);
    modifiers = ['not', 'none', 'some', 'all', 'eq', 'equal', 'lt', 'lessThan',
        'gt', 'greaterThan', 'ltEq', 'lessThanOrEqual', 'gtEq', 'greaterThanOrEqual', 'unary'];

    isNoModifier = function (typeAssertion) {
        return modifiers.indexOf(typeAssertion) === -1;
    };
    not = function (value) {
        return !value;
    };
    eq = function (reference, value) {
        return reference === value;
    };
    applyToAllAssertion = function (fn, iterator) {
        return function () {
            return argsToArray(arguments)[iterator](fn);
        };
    };
    c = _P.compose;

    _P.unary = function (functionToWrap) {
        return function () {
            return functionToWrap.call(this, arguments[0]);
        };
    };

    _P.is = {};
    _P.is.not = {};
    _P.is.some = {};
    _P.is.none = {};
    _P.is.all = {};
    _P.is.unary = {
        not: {}
    };

    _P.is.equal = _P.is.eq = Function.prototype.bind.bind(eq, undefined);
    _P.is.lessThan = _P.is.lt = function (reference) {
        return function (value) {
            return value < reference;
        };
    };
    _P.is.greaterThan = _P.is.gt = function (reference) {
        return function (value) {
            return value > reference;
        };
    };
    _P.is.lessThanOrEqual = _P.is.ltEq = function (reference) {
        return function (value) {
            return value <= reference;
        };
    };
    _P.is.greaterThanOrEqual = _P.is.gtEq = function (reference) {
        return function (value) {
            return value >= reference;
        };
    };

    _P.is.defined = _P.is.something = function (value) {
        return value !== undefined && value !== null;
    };
    ['Function', 'String', 'Number', 'Date', 'RegExp'].forEach(function (type) {
        _P.is[type.toLowerCase()] = c(_P.is.eq('[object ' + type + ']'), getType);
    });
    _P.is.str = _P.is.string;
    _P.is.num = _P.is.number;
    _P.is.fn = _P.is['function'];
    _P.is.object = _P.is.obj = function (value) {
        return value === Object(value);
    };
    _P.is.array = Array.isArray;
    _P.is['true'] = _P.is.truth = _P.is.equal(true);
    _P.is['false'] = _P.is.lie = _P.is.equal(false);
    _P.is.empty = function (value) {
        if (_P.is.array(value)) {
            return value.length === 0;
        }
        if (_P.is.obj(value)) {
            return Object.keys(value).length === 0;
        }
        if (_P.is.str(value)) {
            return value.length === 0;
        }
        return true;
    };
    _P.is['null'] = _P.is.equal(null);
    _P.is.nan = isNaN;

    _P.is.mixin = function (newAsserts) {
        Object.keys(newAsserts).filter(isNoModifier).forEach(function (key) {
            _P.is.not[key] = _P.is.none[key] = applyToAllAssertion(c(not, newAsserts[key]), 'every');
            _P.is.some[key] = applyToAllAssertion(newAsserts[key], 'some');
            _P.is.all[key] = _P.is[key] = applyToAllAssertion(newAsserts[key], 'every');
            _P.is.unary[key] = _P.unary(_P.is[key]);
            _P.is.unary.not[key] = _P.unary(_P.is.not[key]);
        });
    };

    _P.is.mixin(_P.is);

    _P.is.not.eq = _P.is.not.equal = function (reference) {
        return function (value) {
            return value !== reference;
        };
    };
}
