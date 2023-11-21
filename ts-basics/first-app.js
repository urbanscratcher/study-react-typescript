var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Type inference
var userName = "Max";
var API_KEY = "abv";
var userAge = 34;
// Explicit Type
var isValid = true;
// Primitive Types
// string, number, boolean
// Union Types
var userId = "abc1";
var user;
user = {
    name: "Max",
    age: 22,
    isAdmin: true,
    id: "adwb2",
};
// Array Type
var hobbies;
hobbies = ["Soccer", "Cooking", "Reading"];
// hobbies = [1, 2];
var hobbies2;
hobbies2 = ["Soccer", "Cooking", "Reading"];
// functions
function add(a, b) {
    var result = a + b;
    console.log(result);
}
function add2(a, b) {
    var result = a + b;
    return result;
}
function calculate(a, b, calcFn) {
    calcFn(a, b);
}
calculate(2, 5, add2);
// interface Credentials {
//   mode: string;
// }
var creds;
creds = { password: "adslfk", email: "dmd@gmadlkw.com" };
// Interface vs. Custom Type
// interface is limited to object
// interface cannot store a union type
// interface is easy to extend
var AuthCredentials = /** @class */ (function () {
    function AuthCredentials() {
    }
    return AuthCredentials;
}());
function login(credentials) { }
login(new AuthCredentials());
var role;
role = "admin";
role = "user";
// role = "editor"; error
// Adding Type Guards
function performAction(action, role) {
    if (role === "admin" && typeof action === "string") {
    }
}
// Generic type
var roles;
roles = ["admin", "editor"];
var textStorage = {
    storage: [],
    add: function (data) {
        this.storage.push(data);
    },
};
var userStorage = {
    storage: [],
    add: function (user) { },
};
// Generic function
function merge(a, b) {
    return __assign(__assign({}, a), b);
}
var newUser = merge({ name: "Morgan" }, { age: 54 });
