//软件工程中我们不仅要创建一致的定义良好的API，同时也要考虑可重用性，罪案不惊讶哦能够支持当前的
//数据类型，同时也要能支持未来的数据类型
//例定义identity函数
//接受两个参数：类型参数和参数arg
function identity<T>(arg: T): T {
    return arg;
}

let str = identity<string>('myString')
let num = identity<number>(3)

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg;
}

let myIdentity: { <T>(arg: T[]): T[] } = identity;

myIdentity<string>(['1'])

//泛型当做函数的参数
interface GenericIdentity {
    <T>(arg: T): T
}
//泛型当做整个接口的一个参数
interface GenericIdentity2<T> {
    <T>(arg: T): T
}

function identity2<T>(a: T) {
    return a;
}

let myIdentity2: GenericIdentity = identity2;

let myIdentity3: GenericIdentity2<number> = identity2;

//泛型类
//类有两部分：静态部分和实力部分，泛型类指的是实例部分的类型
class GenericNumber<T>{
    zeroValue: T;
    add: (x: T, y: T) => T
}

//创建一个GenericNumber类型的空对象，限定了属性和方法
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 1;
myGenericNumber.zeroValue = myGenericNumber.add(1, 2)
console.log('myGenericNumber', myGenericNumber)

//泛型约束
interface lengthwise {
    length: number;
}

//extends关键字约束泛型的类型
function loggingIdentity3<T extends lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg;
}

loggingIdentity3(3);
loggingIdentity3('3');
loggingIdentity3([]);
loggingIdentity3({ length: 3, name: '123' });


function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); 
getProperty(x, "m");

function create<T>(c:{new():T}):T{
    return new c();
}

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal{
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c:{new ():A}):A{
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

