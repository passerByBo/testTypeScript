//TypeScript能够根据返回值语句自动推断出返回值类型，通常会忽略显式定义返回值类型
let myAdd: (x: number, y: number) => number = function (x, y) {
    return x + y;
}

//函数类型包含参数类型和返回值类型
//只要参数类型是匹配的，那么就认为是一个有效的函数类型，不在乎参数名是否相同
//函数的返回值是必须的，如果没有返回值可以指定返回值类型为void

//函数会自动进行类型推断

//传递给函数的参数必须和函数的预期参数个数一致
//定义的函数类型多的兼容少的（参数），但是函数的具体实现必须参数保值一致，如果不确定参数个数可以使用可选参数
function buildName(f: string, l: string) {
    return f + l;
}

//let res1 = buildName('Bob');//error
//let res2 = buildName('Bob','Adams','gt');//error
let res3 = buildName('Bob', 'Adams');

//可选参数必须跟在必选参数后
//所有必选参数后面默认带初始化的参数都是可选的
function bnuildName2(f: string, l = 'Smith') {
    return f + l;
}

console.log(bnuildName2('Bob'))
console.log(bnuildName2('Bob', undefined))
console.log(bnuildName2('Bob', null))
console.log(bnuildName2('Bob', 'Join'))
// console.log(bnuildName2('Bob', 'Join', 'xxx'))


//函数编译器指定noImplicitThis，内层为箭头函数，会报箭头函数内部的this为any类型

//this参数来自对象字面量里的函数雕大师修改的方法是，提供一个显式的this参数，this参数时一个
//假参数，它出现在参数列表的最前面
function f(this: void) {

}

interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: string[];
    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}

interface UIElement {
    addEventListener(callback: (e: Event) => void): void
}

class Handler {
    info: string;
    onClickBad(e: Event) {
        this.info = 'e.message';
    }
}

let h = new Handler();
let uiElement: UIElement;
uiElement.addEventListener(h.onClickBad)


//函数重载
//使用了typeof这类方法可以推断出参数的类型
let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

pickCard({a:1})
pickCard(3)

