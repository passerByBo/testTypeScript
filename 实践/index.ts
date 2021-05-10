namespace test {
    function isString(test: any): test is string {
        return typeof test === 'string';
    }

    function exmaple(foo: string | number) {
        if (isString(foo)) {
            console.log(foo.length)
        }
    }


    type Diff<T, U> = T extends U ? never : T;

    type R = Diff<'a' | 'b', 'C' | 'd' | 'e'>

    //infer关键字
    interface User {
        id: number;
        name: string;
        form?: string;
    }

    type Foo = () => User;

    type ReturnType<T> = T extends (...args: any[]) => infer P ? P : never;

    type R5 = ReturnType<Foo>;



    class TestClass {
        constructor(public name: string, public age: number) { }
    }

    type ConstructirParameter5<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any
        ? P
        : never;

    type R4 = ConstructirParameter5<typeof TestClass>
}



















































