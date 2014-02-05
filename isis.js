(function () {
    var is, not, methods, or, and, objectWrap;
    
    //Internal utility methods
    not = function (value) {
        return !value;
    };
    or = function (fn1, fn2) {
        return function () {
            return fn1.apply(null, arguments) || fn2.apply(null, arguments);
        };
    };
    and = function (fn1, fn2) {
        return function () {
            return fn1.apply(null, arguments) && fn2.apply(null, arguments);
        };
    };
    objectWrap = function (value) {
        return value === undefined || value === null ? value : Object(value);
    };

    methods = {
        not: function (fn) {
            return _.compose(not, is(fn)); 
        },
        or : function (fn) {
            return or(this, is(fn));
        },
        and : function (fn) {
            return and(this, is(fn));
        },
        to : function (compareToValue) {
            return _.partial(this, _, compareToValue);
        },
        map : function (mutatorFn) {
            return _.compose(this, mutatorFn);
        }
    };
    methods.than = methods.to;
    
    is = function is(fn, value, compareToValue) {
        if (arguments.length === 1) {
            return _.extend(_.partial(is, fn), methods);    
        }
        return objectWrap(value) instanceof fn || 
            (arguments.length === 2 ? fn(value) : fn(value, compareToValue)) === true; //Don't pass unexpected parameters
    };
    
    _.extend(is, methods);

    _.mixin({ is: is });
}());