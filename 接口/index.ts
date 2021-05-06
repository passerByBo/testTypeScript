//typescript的核心原则之一是对值所具有的结构进行类型检查，它有时被称为‘鸭式辨型法’或者‘结构性子类型化’
//只会关注值得外形，类型检查器不会检查属性的顺序

interface SquareConfig {
    color?: string;
    width?: number;
    //字符串类型索引
    // [propName:string]:any
}

function createSquare(config: SquareConfig) {
    let newSquare = { color: 'white', area: 2 };
    if (config.color) {
        newSquare.color = config.color;
    }

    if (config.width) {
        newSquare.area = config.width * config.width;
    }

    return newSquare;
}
//当将字面量赋值给另外一个类型，就可绕开参数的类型检查
let squareOptions = { color: 'blue', aaa: 1 }
createSquare(squareOptions)



interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = {
    x: 1,
    y: 2
}

//p1.x = 3;//error

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
let ro2: ReadonlyArray<number>;
ro[0] = 1;
ro.push(4);
ro.splice(1, 1);
a = ro;
ro2 = ro;
//用类型断言
a = ro as number[];


//函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
//函数参数多的兼容参数少的
mySearch = (source: string, subString: string) => {
    let result = subString.substr(1, 2)
    return result.length > 1;
}

//可索引类型
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Job'];
myArray[1].substring(0, 1);
let myString: string = myArray[1];


class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}

//TypeScript支持两种索引签名，字符串和数字，数字签名的返回值必须是字符串索引返回值的子类型
//应为当使用number来索引时，JavaScript会将它转换成string然后再去索引对象
interface NotOkay {
    [x: number]: Dog;
    [y: string]: Animal;
}


interface NumberDictionary {
    [index: string]: number;
    length: number;
    name: string;//所以第一个索引类型设置为父类型包含所有的成员就不会报错
}

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = ['a', 'b'];
myArray2[3] = 'c';
myArray2.push('c');

//类实现接口
//静态部分的类型和实例部分的类型，constructor存在于类的静态部分
//当类实现一个接口的时候只对实力部分进行类型检查
interface ClockInterface {
    tick();
}

interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {

    }

}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute)
}

//定义了构造器的类型，所以这里会检查构造器是否符合
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

//混合类型
interface Counter {
    (start: number): string;
    interval: number;
    rest(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {
        return '123';
    }

    counter.interval = 5;
    counter.rest = function () { }
    return counter;
}

//接口继承
//接口继承类的成员但是不包括实现
class Control {
    protected state: any;

    //实现
    name(params: string) {
        console.log(params)
    }
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select(): void {
        throw new Error("Method not implemented.");
    }

}

class TextBox extends Control {
    
}

let b: TextBox;
//继承后包括成员方法
b.name('1');

class Image2 implements SelectableControl {
    public state;
    select(): void {
        throw new Error("Method not implemented.");
    }
    name(params: string): void {
        throw new Error("Method not implemented.");
    }

}
