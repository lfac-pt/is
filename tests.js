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
assert(_.is(Object)({a: 2}))
assert(_.is(Object)([1, 2, 3]))
assert(_.is(Object)(null) === false)
assert(_.is(Object)(undefined) === false)
assert(_.is(_.isNull)(null))
assert(_.is(_.isUndefined)(undefined))
assert(_.is(_.isNull)({a: 2}) === false)
assert(_.is(_.isUndefined)({a: 2}) === false)
assert(_.is(_.isNull)("") === false)
assert(_.is(_.isUndefined)("") === false)

//TODO: asser that not passing a function as the first argument to _.is throws

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
var buildMatcher = function (attrs) {
    return function (obj) {
        return _.all(attrs, function (value, key) {
            return obj[key] === value;
        });
    };
};
assert(_.is(Object).and(buildMatcher({a: 2}))({a: 2, b: 3}));
assert(_.is(Object).and(buildMatcher({a: 2}))(null) === false);
assert(_.is(Object).and(buildMatcher({a: 2}))({a: 1, b: 3}) === false);

//`.to`
var equal = _.isEqual;
assert(_.is(equal).to("hi")("hi"));
assert(_.is(equal).to("hi")("bob") === false);

//`.than` - an alias to `.to`
var greater = function (x, y) {return x > y;};
assert(_.is(greater).than(10)(20));
assert(_.is(greater).than(10)(5) === false);

//Basic chaining
//assert(_.is.not(equal).to("hi")("hi") === false);
//assert(_.is.not(equal).to("hi")("bob"));

//All tests pass!
console.log("All is good!");