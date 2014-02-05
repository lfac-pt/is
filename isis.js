//The code
var is;

(function () {
    var not, methods, or, and;
    
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
            return fn1.apply(null, arguments) || fn2.apply(null, arguments);
        };
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
        return Object(value) instanceof fn || fn(value) === true;       
    };
    
    _.extend(is, methods);
}());

_.mixin({ is: is });

//Tests lib
var assert = function (cond) {
    if (!cond) {
        throw new Error();
    }
};

//Tests
//Basic type/class checking
assert(_.is(Number)(2))
assert(_.is(String)("hi"))

var Person = function () {};
var jonh = new Person();
assert(_.is(Person)(jonh))

//Custom check function
var defined = function (x) {
    return x !== null && x !== undefined;
};
assert(_.is(defined)({a: 1}))
assert(_.is(defined)(null) === false)
assert(_.is(defined)(undefined) === false)

//`.not`
assert(_.is.not(Number)("ola"))

//`.or`
assert(_.is(String).or(Number)(2))
assert(_.is(String).or(Number)("ola"))
assert(_.is(String).or(Number)({a: 2}) === false)

//`.and`
assert(_.is(Object).and(_.matches({a: 2})))

//All tests pass!
console.log("All is good!");