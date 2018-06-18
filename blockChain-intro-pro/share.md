#React之数据状态管理（redux,dva）

##redux介绍
-Store(Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。)
示例：
```
import { createStore } from 'redux';
const store = createStore(fn);

```
-State(对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。)
示例：（得到当前的state）
```
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();

```
-Action（本质上是一个对象,由view发出,表示state应该要发生变化了）
示例：
```
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};

```
-Action Creator（action的创建函数）
```
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');

```

-Reducer（相应收到action,返回新的state,这种 State 的计算过程就叫做 Reducer。）
示例：
```
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});

```
-以上redux基础概念（实际上我也只看到了这里...）
-结合项目看看如何使用（补充实际项目）
1.用户登录

##dva
-dva是什么？？
dva 首先是一个基于 redux 和 redux-saga(还未深入研究...) 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架
-如何使用?(安装dev-cli)

```
npm install -g dva-cli -g
dva new pro01
cd pro01
npm install 
npm start

```
-Models
  每一个model有一个自己的namespace,顶层为一个js对象
  --state
  当前状态数据
  --effects
   通常指异步操作
   --reducers
   通过 actions 中传入的值，与当前 reducers 中的值进行运算获得新的值（也就是新的 state）
结合项目介绍（运营后台）   
1.商品列表页数据


##总结
-个人理解dva是对redux的进一步封装简化,相对于redux,更为清晰,上手更快。
-以上是我对两种框架的理解,主要是项目实战的使用,原理及知识点未详细提出（术语太官方,copy下来读也没得啥子意思...）,具体概念东西参照相关官方文档。

相关链接：
[Redux中文文档](http://www.redux.org.cn/)。
[dva](https://dvajs.com/)。

