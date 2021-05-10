//TypeScript里的类型兼容性是基于结构子类型的,结构类型是一种只使用其成员来描述类型的方式,正好与名义（nominal）类型形成对比
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();

//TypeScript的结构性子类型是根据JavaScript代码的典型写法来设计的。
 //因为JavaScript里广泛地使用匿名对象，例如函数表达式和对象字面量，
 //所以使用结构类型系统来描述这些类型比使用名义类型系统更好。

 //TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性
 interface Named {
    name: string;
}

let x2: Named;
// y's inferred type is { name: string; location: string; }
let y2 = { name: 'Alice', location: 'Seattle' };
x2 = y2;//可多不可少，多的可以赋值给少的
//这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性

function greet(n: Named) {
    console.log('Hello, ' + n.name);
}
greet(y2); // OK


//函数兼容性
let x3 = (a: number) => 0;
let y3 = (b: number, s: string) => 0;
y3=x3;//参数少的可以赋值给参数多的
x3=y3;
//x3是否能赋值给y3，首先看它们的参数列表。 x3的每个参数必须能在y3里找到对应类型的参数