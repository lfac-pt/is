(function () {
    var is, not, methods, or, and, objectWrap;
    
    //Internal utility methods
    not = function (value) {
        return !value;
    };
    constant = function (value) {
        return function () {
            return value;
        };
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
        }
    };
    
    is = function is(fn, value) {
        if (arguments.length === 1) {
            return _.extend(_.partial(is, fn), methods);    
        }
        return objectWrap(value) instanceof fn || fn(value) === true;
    };
    
    _.extend(is, methods);

    _.mixin({ is: is });
}());