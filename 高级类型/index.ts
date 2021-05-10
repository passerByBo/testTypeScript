//交叉类型
//交叉类型是将多个类型合并为一个类型
//mixin中使用

function extend1<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};

  for (let id in first) {
    (result as any)[id] = first[id];
  }

  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (result as any)[id] = second[id];
    }
  }
}

//联合类型
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "string") {
    padding.substring(0);
  }

  if (typeof padding === "number") {
  }
}

//如果联合类型是的子类是类型，那么成员可以访问子类共有的成员
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors

//类型谓词

interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

//typeof 类型保护

function isNumbert(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
function padLeft2(value: string, padding: string | number) {
  if (isNumbert(padding)) {
  }

  if (isString(padding)) {
    padding.substr(0);
  }
}

//instancesof类型保护
//通过构造函数来细化类型的一种方式
//instanceof的右侧要求是一个构造函数
//构造函数的prototype属性的类型不为any的话，构造签名返回的类型的联合

interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder("ABC");
}

let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
}

if (padder instanceof getRandomPadder) {
}

//strictNullChecks强制检测null和undefined不为其他类型的子类型
//strictNullChecks使用了该属性，可选参数会自动被加上 | undefined
function f(x: number, y?: number) {
  return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'

class C {
  a: number;
  b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'

//类型保护和类型断言
//嵌套函数调用的null如果无法去掉可以语法添加！排除null
function fixed(name: string | null): string {
  function proFixed(epithet: string) {
    return name!.charAt(0);
  }

  return proFixed("Bob");
}

//类型别名
//起别名不会创建一个新的类型，可以组合其他的类型或者单纯的给其他类型起别名
type Container<T> = {
  vale: T;
};

//类型别名可以在自己的属性中使用，范型可以在右侧任何地方使用
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};

//类型别名不能在类型定义的右侧使用

type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
  name: string;
}

var people: LinkedList<Person>;

//接口和类型别名
//接口创建了一个新的类型名称，可以在任何地方使用，类型别名不会创建新的名词--比如类型错误不会使用别名(新版本提醒已经一致)

type Alias = { num: number };

interface Interface {
  num: number;
}

declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

aliased(12);
interfaced(12);

//索引类型
//keyof
//索引类型的返回是所有key的联合类型
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: "Jarid",
  age: 35,
};
let strings: string[] = pluck(person, ["name"]); // ok, string[]
//keyof T， 索引类型查询操作符
//K[T]索引访问操作符

interface IMap<T> {
  [key: string]: T;
}

let keys: keyof IMap<number>;
let value: IMap<number>["Foo"];

//映射类型
//需求是将一个已知的类型的所有属性都变为可选的或者将所有的属性都变为可选的
//遍历
interface PersonPartial {
  name?: string;
  age?: number;
}
type ReadonlyPersonPartial<T> = {
  readonly [P in keyof T]: T[P];
};
type Partial2<T> = {
    [P in keyof T]?: T[P];
}

type PersonPartial2 = Partial2<Person>;
type ReadonlyPerson = ReadonlyPersonPartial<Person>;

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

//类型变量 K，它会依次绑定到每个属性。
//字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
//属性的结果类型。