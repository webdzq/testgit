/**
书名：数据结构与算法javascript描述.

**/
//1, 数组的浅复制和深复制。
//浅复制
var nums = [];
for (var i = 0; i < 100; ++i) {
    nums[i] = i + 1;
}
var samenums = nums;
nums[0] = 400;
print(samenums[0]); // 显示 400
//深复制
var nums = [];
for (var i = 0; i < 100; ++i) {
    nums[i] = i + 1;
}
var samenums = [];
copy(nums, samenums);
nums[0] = 400;
print(samenums[0]); // 显示 1
//2,列表
function List() {
    this.listSize = 0;
    this.pos = 0; //位置指针
    this.dataStore = []; // 初始化一个空数组来保存列表元素
    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.length = length;
    this.contains = contains;
}
// List.prototype={
//   constructor:List,
//   append:function(){
//     //给列表添加元素
//     this.dataStore[this.listSize++] = element;
//   }
// };
function append(element) {
    //给列表添加元素
    this.dataStore[this.listSize++] = element;
}

function find(element) {
    //在列表中查找某一元素
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
            return i;
        }
    }
    return -1;
}

function remove(element) {
    //从列表中删除元素
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
    }
    return false;
}

function length() {
    //列表中有多少个元素
    return this.listSize;
}

function toString() {
    //显示列表中的元素
    return this.dataStore;
}

function insert(element, after) {
    //向列表中插入一个元素
    var insertPos = this.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos + 1, 0, element);
        ++this.listSize;
        return true;
    }
    return false;
}

function clear() {
    //清空列表中所有的元素
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
}

function contains(element) {
    //判断给定值是否在列表中
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
            return true;
        }
    }
    return false;
}

//遍历列表-元素位置相关的函数。
function front() {
    //初始位置
    this.pos = 0;
}

function end() {
    //末尾位置
    this.pos = this.listSize - 1;
}

function prev() {
    //前移一个
    if (this.pos > 0) {
        --this.pos;
    }
}

function next() {
    //后移一个
    if (this.pos < this.listSize - 1) {
        ++this.pos;
    }
}

function currPos() {
    //当前位置
    return this.pos;
}

function moveTo(position) {
    //移动到指定位置 0<position<this.listSize - 1,
    if (0 < position && position < this.listSize - 1) {
        this.pos = position;
    } else {
        if (position < 0) {
            this.pos = 0;
        } else {
            this.pos = this.listSize - 1;
        }
    }

}

function getElement() {
    //得到当前位置的元素
    return this.dataStore[this.pos];
}
//使用迭代器访问列表
function LTraversal(names) {
    //左遍历
    for (names.front(); names.currPos() < names.length(); names.next()) {
        console.log(names.getElement());
    }
}


function RTraversal(names) {
    //右遍历
    for (names.end(); names.currPos() >= 0; names.prev()) {
        console.log(names.getElement());
    }
}
//列表示例--略，之后补充完整示例
// var movies = [
//     'The Shawshank Redemption(《肖申克的救赎》) (2) The Godfather(《教父》)',
//     'The Godfather: Part II(《教父 2》)',
//     'Pulp Fiction(《低俗小说》)',
//     'The Good, the Bad and the Ugly(《黄金三镖客》) (6) 12 Angry Men(《十二怒汉》)',
//     'Schindler’s List(《辛德勒名单》)',
//     'The Dark Knight(《黑暗骑士》)',
//     'The Lord of the Rings: The Return of the King(《指环王:王者归来》)'
// ];
//
// var movieList = new List();
// for (var i = 0; i < movies.length; ++i) {
//     movieList.append(movies[i]);
// }

//-------------------------------------
//3,栈-后入先出。数组模拟栈，top模拟指针位置。
function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
}

function push(element) {
    //入栈，然后改变top的位置
    this.dataStore[this.top++] = element;
}

function pop() {
    //出栈，改变top的位置，然后出栈
    return this.dataStore[--this.top];
}

function peek() {
    //返回数组的第 top-1 个位置的元素,即栈顶元素
    //不出栈，不出栈，不出栈
    return this.dataStore[this.top - 1];
}

function length() {
    //返回栈内元素个数
    return this.top;
}

function clear() {
    //清空栈
    this.top = 0;
}
//栈的示例和应用；

/**
3-1，数制间的相互转换
[思路:]
(1) 最高位为 n % b,将此位压入栈。
(2) 使用 n/b 代替 n。
(3) 重复步骤 1 和 2,直到 n 等于 0,且没有余数。
(4) 持续将栈内元素弹出,直到栈为空,依次将这些元素排列,就得到转换后数字的字符
串形式。
**/
function mulBase(num, base) {
    var s = new Stack();
    do {
        s.push(num % base); //求余，入栈

        num = Math.floor(num /= base);
    } while (num > 0);
    var converted = "";
    while (s.length() > 0) {
        converted += s.pop(); //出栈
    }
    return converted;
}
var newNum = mulBase(10, 2); //1010
/**
3-2，回文判断
[思路:]
(1) 回文是指一个字符串，左右对称。如1001，racecar。
(2) 入栈字符串顺序和出栈字符串顺序正好相反。

**/
function isPalindrome(word) {
    var s = new Stack();
    for (var i = 0; i < word.length; ++i) {
        s.push(word[i]);
    }
    var rword = "";
    while (s.length() > 0) {
        rword += s.pop();
    }
    if (word == rword) {
        return true;
    } else {
        return false;
    }
}
var word = "racecar";
if (isPalindrome(word)) {
    print(word + " is a palindrome.");
} else {
    print(word + " is not a palindrome.");
}
/**
3-3，递归演示
[思路:]
(1) 将递归每个过程产生的中间值入栈。
(2) 然后依次出栈做相应的操作，比如阶乘就是依次做乘法。

**/
//递归
function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
//栈的写法
function fact(n) {
    var s = new Stack();
    while (n > 1) {
        s.push(n--);
    }
    var product = 1;
    while (s.length() > 0) {
        product *= s.pop();
    }
    return product;
}
print(factorial(5)); // 显示 120 print(fact(5)); // 显示 120
//练习题--略


//4，队列-先入先出。数组模拟
function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}

function enqueue(element) {
    //入队
    this.dataStore.push(element);
}

function dequeue() {
    //出队
    return this.dataStore.shift();
}

function front() {
    //队头
    return this.dataStore[0];
}

function back() {
    //队尾
    return this.dataStore[this.dataStore.length - 1];
}

function toString() {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retStr += this.dataStore[i] + "\n";
    }
    return retStr;
}

function empty() {
    //判断是否空队
    if (this.dataStore.length === 0) {
        return true;
    } else {
        return false;
    }
}
//4-1,队列应用及练习略


//5,链表。第一个节点是head，最后一个节点是null。
//Node类--节点对象
function Node(element) {
    this.element = element;
    this.next = null;
}
//LinkedList类
function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.findPrevious = findPrevious;
    this.remove = remove;
}



function findPrevious(item) {
    //返回当前节点的前一个
    var currNode = this.head;
    while (!(currNode.next == null) &&
        (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

function remove(item) {
    //移除节点
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
    }
}

function display() {
    //显示链表节点
    var currNode = this.head;
    while (!(currNode.next == null)) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

function find(item) {
    //查找当前节点
    var currNode = this.head;

    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    //在某一个节点后插入一个节点
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}
//测试程序
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();



//双向链表
function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.dispReverse = dispReverse;
}

function dispReverse() {
    var currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
        print(currNode.element);
        currNode = currNode.previous;
    }
}

function findLast() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        currNode = currNode.next;
    }
    return currNode;
}

function remove(item) {
    var currNode = this.find(item);
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
}
//findPrevious 没用了,注释掉
/*
function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) &&
        (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}
*/

function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        print(currNode.next.element);
        currNode = currNode.next;
    }
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
}
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
print();
cities.remove("Carlisle");
cities.display();
print();
cities.dispReverse();
/**
输出如下:
Conway
Russellville
Carlisle
Alma
Conway
Russellville
Alma
Alma
Russellville
Conway
**/

//循环链表
function LList() {
    this.head = new Node("head");
    this.head.next = this.head;
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.findPrevious = findPrevious;
    this.remove = remove;
}

function display() {
    var currNode = this.head;
    while (!(currNode.next == null) &&
        !(currNode.next.element == "head")) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}
//其他方法，练习略

//6，字典-以键 - 值对形式存储数据的数据结构
function Dictionary() {
    this.add = add;
    this.datastore = [];
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
}

function add(key, value) {
    //添加
    this.datastore[key] = value;
}

function find(key) {
    //查找
    return this.datastore[key];
}

function remove(key) {
    //移除
    delete this.datastore[key];
}

function showAll() {
    //显示所有
    for each(var key in Object.keys(this.datastore)) {
        console.log(key + " -> " + this.datastore[key]);
    }
}

function count() {
    //字典个数
    var n = 0;
    for each(var key in Object.keys(this.datastore)) {
        ++n;
    }
    return n;
}

function clear() {
    //清空
    for each(var key in Object.keys(this.datastore)) {
        delete this.datastore[key];
    }
}
//测试程序
var pbook = new Dictionary();
var pbook = new Dictionary(); pbook.add("Raymond","123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
console.log("Number of entries: " + pbook.count()); print("David's extension: " + pbook.find("David")); pbook.showAll();
pbook.clear();
console.log("Number of entries: " + pbook.count());
//练习略
//7,散列- 一种常用的数据存储技术,散列后的数据可以快速地插入或取用。散列使用的数据结构叫做散列表
