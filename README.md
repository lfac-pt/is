#Isis - Predicate builder for Underscore

I'm working on writing better docs!

##Examples
```javascript
assert(_.is(Number)(2))
assert(_.is(String)("hi"))
assert(_.is(_.isNull)({a: 2}) === false)
assert(_.not(_.is(Number))("ola"))
assert(_.is(String).or(Number)(2));
assert(_.is(equal).to(true).the(property("isVisible"))({isVisible: true, a: 2}));
``

##Licence
The code in this repo is under MIT licence.