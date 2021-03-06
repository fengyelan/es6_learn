/**
 * Created by yuanlan on 2016/10/8.
 */
$(function(){

    //1.给函数的参数赋值默认值
    function fn1(x,y=2){
        console.log(x,y);
    }
    fn1(2,3);

    //使用了对象的解构赋值默认值,当函数参数为一个对象的时候，变量x,y才会通过解构赋值生成
    //当函数的参数不是一个对象的时候，变量x,y就不会通过解构赋值生成，从而能会报错
    function fn2({x,y=5}){
        console.log(x,y);
    }
    fn2({});//undefined 5
    fn2({x:1});//1 5
    fn2({x:1,y:2});//1 2
    //fn2();//报错Uncaught TypeError: Cannot read property 'x' of undefined

    //函数的参数的默认值是空对象，但是设置了对象解构赋值的默认值
    function m1({x=0,y=0}={}){
        return [x,y];
    }

    //函数参数的默认值是一个有具体对象的属性，但是没有设置对象结构赋值的默认值
    function m2({x,y}={x:0,y:0}){
        return [x,y];
    }

    m1();//[0,0]
    m2();//[0,0]

    m1({});//[0,0]
    m2({});//[undefined,undefined]

    m1({x:3,y:4});//[3,4]
    m2({x:3,y:4});//[3,4]

    m1({x:3});//[3,0]
    m2({x:3});//[3,undefined]

    //参数默认值的位置：通常设置了默认值的参数是放在尾参数，
    //如果是非尾部的参数设置默认值，实际上是没有省略的，省略的话会报错,传入undefined是传入默认值
    function fn3(x=1,y){
        console.log(x,y);
    }
    fn3(undefined,1);//1 1

    //函数有个length属性,返回的是没有指定默认值的参数的个数
    console.log((function(a){}).length);//1
    console.log((function(a=3){}).length);//0
    console.log((function(a,b,c=2){}).length);//2

    //如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
    console.log((function(a,b=1,c){}).length);//1
    console.log((function(a=0,b=1,c){}).length);//0

    //函数参数设置了对象的解构赋值，length都是1
    console.log((function({a,b}){}).length);//1
    console.log((function({a,b=2}){}).length);//1
    console.log((function({a=1,b=2}){}).length);//1

    //因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了
    console.log((function (...args){}).length);//0


    //2.ES6引入rest参数（形式为“...变量名”）
    function fn4(...args){
        console.log(args);
    }
    fn4(1,2,3);//[1,2,3]

    let sortNumbers = (...numbers)=>numbers.sort();
    sortNumbers(2,6,1,3);//[1,2,3,6]

    //rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
    //function fn5(a,...b,c){}//报错


    //3.扩展运算符（spread）是三个点（...）,将一个数组转为用逗号分隔的参数序列。
    function fn6(...arr){
    }
    var arr = [1,2,3];
    fn6(...arr);
    console.log(...[1,2,3]);

    //替代数组的apply方法 ,由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
    //es5
    function fn7(x,y,z){

    }
    var args = [0,1,2];
    fn6.apply(null,args);
    //es6
    fn6(...args);

    //es5
    Math.max.apply(null, [14, 3, 77]);
    //es6
    Math.max(...[14,3,77]);
    //=>
    Math.max(14,3,77);

    //扩展运算符的应用：（1）.合并数组
    //es5
    var moreData = [1,2,3,4,5];
    [1,2].concat(moreData);//[1,2,1,2,3,4,5]
    //es6
    [1,2,...moreData];//[1,2,1,2,3,4,5]


    //(2)JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。
    const [data1,...data2] = [1,2,3,4,5];
    console.log(data1);//1
    console.log(data2);//[2, 3, 4, 5]

    const [data3,...data4]=[];
    console.log(data3);//undefined
    console.log(data4);//[]

    const [data5,...data6]=[123];
    console.log(data5);//123
    console.log(data6);//[]

    //如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
    //const [...data7,data8]=[1,2,3,4,5];//报错

    //(3)JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

    //(4)将字符串转为真正的数组
    console.log([..."hello"]);//["h", "e", "l", "l", "o"]

    //JavaScript会将32位Unicode字符，识别为2个字符，采用扩展运算符就没有这个问题。
    //凡是涉及到操作32位Unicode字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
    'x\uD83D\uDE80y'.length;//4
    [...'x\uD83D\uDE80y'].length;//3  => [].concat(_toConsumableArray('x\uD83D\uDE80y')).length;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    //(5)任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
    //类似数组对象，部署了iterator接口，都可以用扩展运算符转为真正的数组
    let arraylike={
        0:11,
        1:22,
        2:33,
        length:3
    };
    let arrLike1 = [...arraylike];//[11,22,33]
    let arrLike2 = Array.from(arraylike);//[11,22,33]

    //(6)展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map和Set结构，Generator函数
    let map = new Map([
        [1,"aa"],
        [2,"bb"],
        [3,"cc"]
    ]);
    let arrMap = [...map.keys()];//[1,2,3]   => es5 var arrMap = [].concat(_toConsumableArray2(map.keys()));

    let set = new Set([1,2,3]);
    let arrSet = [...set];//[1,2,3]  =>es5  var arrSet = [].concat(_toConsumableArray2(set));

    //3.箭头函数
    //如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
    //如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

    var f = param => param;

    var f1 = (p1,p2) => p1+p2;

    //箭头函数注意点：
    //1.函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
    //2.不可以当做构造函数，也就是说不可以使用New命令，否则会抛出一个错误
    //3.不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数代替
    //4.不可以使用yield命令，因此箭头函数不能用作Generator函数。

    //箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。
    //es6
    function f2(){
        setTimeout(()=>{
            console.log("id:"+this.id);
        },1000);
    }
    //es5
    function f2() {
        var _this = this;

        setTimeout(function () {
            console.log("id:" + _this.id);
        }, 1000);
    }




})
