namespace classDemo {
    // class Animal {
    //     move(distanceInMeters:number = 0) {
    //         console.log(`Animal moved ${distanceInMeters}m.`);
    //      }
    // }

    // class Dog extends Animal{
    //     bark(){
    //         console.log('Woof! Woof!');
    //     }
    // }


    // const dog = new Dog();
    // dog.bark()
    // dog.move(10)
    // dog.bark()


    class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    class Rhino extends Animal {
        constructor() { super("Rhino"); }
    }

    class Employee {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    let animal = new Animal('Goat');
    let rhino = new Rhino();
    let employee = new Employee("Bob");

    //子类可以赋值给基类
    //Rhino共享了来自 Animal里的私有成员定义 private name: string，因此它们是兼容的
    animal = rhino;
    animal = employee;



    class Person {
        protected name: string;
        constructor(name: string) { this.name = name; }
    }
    
    class Employee2 extends Person {
        private department: string;
    
        constructor(name: string, department: string) {
            super(name)
            this.department = department;
        }
    
        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }
    
    let howard = new Employee2("Howard", "Sales");
    console.log(howard.getElevatorPitch());
    console.log(howard.name); // 错误

}