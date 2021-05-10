namespace enumDemo {
    enum Direction {
        Up = 1,
        Down,
        Left,
        Right
    }

    enum Response {
        No = 0,
        Yes = 1,
    }

    function respond(recipient: string, message: Response): void {
        // ...
    }

    respond("Princess Caroline", Response.Yes)
    respond("Princess Caroline", Response[0])

    function getSomeValue() {
        return 1;
    }

    enum E {
        A = getSomeValue(),
        B
    }

    //字符串枚举
    //在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化
    //简单来说每一个字符串枚举都需要被初始化或者被另外一个枚举值初始化
    enum Direction2 {
        Up = "UP",
        Down = Up,
        Left = "LEFT",
        Right = "RIGHT",
    }

    enum FileAccess {
        // constant members
        None,
        Read = 1 << 1,
        Write = 1 << 2,
        ReadWrite = Read | Write,
        // computed member
        G = "123".length
    }

    //一个枚举表达式字面量（主要是字符串字面量或数字字面量）
    //一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
    //带括号的常量枚举表达式
    //一元运算符 +, -, ~其中之一应用在了常量枚举表达式
    //常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错。
    enum ShapeKind {
        Circle,
        Square,
    }

    interface Circle {
        kind: ShapeKind.Circle;
        radius: number;
    }

    interface Square {
        kind: ShapeKind.Square;
        sideLength: number;
    }

    let c: Circle = {
        //kind: ShapeKind.Square,
        //    ~~~~~~~~~~~~~~~~ Error!
        //kind:0
        kind: ShapeKind.Circle,
        radius: 100,
    }

    enum E {
        Foo,
        Bar,
    }

    function f(x: E) {
        if (x !== E.Foo || x !== E.Bar) {

        }
    }

    //枚举的反向映射
    enum Enum {
        A
    }
    let a = Enum.A;
    let nameOfA = Enum[a]; // "A"

    var Enum2;
    (function (Enum) {
        Enum[Enum["A"] = 0] = "A";
    })(Enum2 || (Enum2 = {}));
    var a2 = Enum.A;
    var nameOfA2 = Enum[a]; // "A"

    //常量枚举
    const enum Enum3 {
        A = 1,
        B = A * 2
    }

    //var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

    //外部枚举
    declare enum Enum4 {
        A = 1,
        B,
        C = 2
    }
}
