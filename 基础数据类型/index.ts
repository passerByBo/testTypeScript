namespace basic {
    let isDone: boolean = false;

    let decLiteral: number = 1;
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;
    let octalLiteral: number = 0o744;

    let name: string = '123';
    name = '2334';

    let name2: string = `bob`;
    let name3: string = `hello${name2}`;

    let list: number[] = [1, 2, 3];
    //泛型的方式定义
    let list2: Array<string> = ['a', 'b', 'c'];

    //元组
    let tuple: [string, number] = ['a', 1];
    tuple[0].substr(0, 1);
    //tuple[1].substr(0,1)//报错


    //枚举
    enum Color {
        Red = 1,
        green,
        Blue
    }

    let c: Color = Color.green;
    c = 2;

    let colorName: string = Color[2];
    console.log(colorName)

    //Any
    //不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查
    let notSure: any = 4
    notSure.ifItExists();//不存在的方法
    notSure.toFiexd();

    let perttySure: Object = 4;
    //perttySure.isFiexd();//报错

    let list3: any[] = [1, '2', 1.2, true];
    list3[2] = 3;

    //void
    function warnUser(): void {
        console.log('this is my wraning message');
    }

    //void类型的变量只能赋值undefined和null
    let unusable: void = undefined;
    unusable = null;
    //unusable = 1;//error

    //Null和Undefined
    //默认情况下null和udnefined是所有类型的子类型
    let nullProperty: string = null;
    //指定strictNullChecks标记null和undefined只能赋值给他们自身或者是void

    //Never
    //never表示永远不存在的值，never类型一般用在抛出异常或者根本就不会有返回值的函数表达式或箭头函数表达的返回值
    //never是任何类型的子类型，没有类型是never的子类型除了never本身除外，any也不能赋值给never
    //没有终点，永远执行不完（或者不能执行完）的函数表达式或者箭头函数表达式

    let neverAny: any;
    let neverString: string;
    let neverP1: never;
    //let neverP:never = neverAny;
    let neverP: never = neverP1;
    neverString = neverP;

    function error(message: string): never {
        throw new Error(message)
    }

    function fail(): never {
        return error('拔错了');
    }

    function infiniteLoop():never{
        while(true){

        }
    }

    //Object
    //非原始类型boolean、string、number、null、undefined、symbol的组合

    declare function create(o:object | null):void;
    create({prop:0})
    create(null);
    //create(42);


    //类型断言
    let someValue:any = 'this is a string';
    let strLength:number = (<string>someValue).length;
    let strLength2:number = (someValue as string).length;
}





