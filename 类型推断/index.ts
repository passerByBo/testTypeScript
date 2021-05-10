namespace infer {
    //类型推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时
    let x = 3;

    //计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。


    //上下文类型
    window.onmousedown = function(mouseEvent) {
        console.log(mouseEvent.button);  //any
    };

    
    
}
