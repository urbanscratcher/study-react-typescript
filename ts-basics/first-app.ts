// Type inference
let userName = "Max";
const API_KEY = "abv";
let userAge = 34;

// Explicit Type
let isValid: boolean = true;

// Primitive Types
// string, number, boolean

// Union Types
let userId: string | number = "abc1";

// Object Type
// object  cannot tell structure
// let user: object;

type User = {
  name: string;
  age: number;
  isAdmin: boolean;
  id: string | number;
};

let user: User;

user = {
  name: "Max",
  age: 22,
  isAdmin: true,
  id: "adwb2",
};

// Array Type
let hobbies: Array<string>;
hobbies = ["Soccer", "Cooking", "Reading"];
// hobbies = [1, 2];

let hobbies2: string[];
hobbies2 = ["Soccer", "Cooking", "Reading"];

// functions
function add(a: number, b: number): void {
  const result = a + b;
  console.log(result);
}

function add2(a: number, b: number) {
  const result = a + b;
  return result;
}

// Custom Type
type AddFn = (a: number, b: number) => number;

function calculate(a: number, b: number, calcFn: AddFn) {
  calcFn(a, b);
}

calculate(2, 5, add2);

// interface - to define obj types
interface Credentials {
  password: string;
  email: string;
}

// interface Credentials {
//   mode: string;
// }

let creds: Credentials;

creds = { password: "adslfk", email: "dmd@gmadlkw.com" };

// Interface vs. Custom Type

// interface is limited to object
// interface cannot store a union type
// interface is easy to extend

class AuthCredentials implements Credentials {
  email: string; // required by interface
  password: string; // required by interface
  userName: string;
}
function login(credentials: Credentials) {}
login(new AuthCredentials());

// Merging types
// type Admin = { permission: string[] };
// type AppUser = { userName: string };
// type AppAdmin = Admin & AppUser;

// let admin: AppAdmin;
// admin = {
//   permission: ["login"],
//   userName: "admin",
// };

interface Admin {
  permission: string[];
}
interface AppUser {
  userName: string;
}
interface AppAdmin extends Admin, AppUser {}

// Literal Types
type Role = "admin" | "user" | "editor";
let role: Role;

role = "admin";
role = "user";
// role = "editor"; error

// Adding Type Guards
function performAction(action: string | number, role: Role) {
  if (role === "admin" && typeof action === "string") {
  }
}

// Generic type
let roles: Array<Role>;
roles = ["admin", "editor"];

type DataStorage<T> = { storage: T[]; add: (data: T) => void };

const textStorage: DataStorage<string> = {
  storage: [],
  add(data) {
    this.storage.push(data);
  },
};

const userStorage: DataStorage<User> = {
  storage: [],
  add(user) {},
};

// Generic function
function merge<T, U>(a: T, b: U) {
  return { ...a, ...b };
}

const newUser = merge({ name: "Morgan" }, { age: 54 });
