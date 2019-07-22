import React, { Component } from 'react';
import 'antd/dist/antd.css'
// import { Input, Button, List } from 'antd'
import store from '../store'
import axios from 'axios'
import TodoListUI from './TodoListUI'
//关键代码-------------start
import { changeInputAction, addItemAction, deleteItemAction, getListAction } from '../store/actionCreatores'
//关键代码------------end

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState();
        this.changeInputValue = this.changeInputValue.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.clickBtn = this.clickBtn.bind(this)
        store.subscribe(this.storeChange) //订阅Redux的状态
        this.deleteItem = this.deleteItem.bind(this)
    }
    componentDidMount() {
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res) => {
            const data = res.data
            const action = getListAction(data)
            store.dispatch(action)
        })
    }
    storeChange() {
        console.log('store changed')
        this.setState(store.getState())
    }
    //--------关键代码------start
    changeInputValue(e) {
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }
    clickBtn() {
        const action = addItemAction()
        store.dispatch(action)
    }
    deleteItem(index) {
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                list={this.state.list}
                changeInputValue={this.changeInputValue}
                clickBtn={this.clickBtn}
                deleteItem={this.deleteItem}
            />
        );
    }
    //--------关键代码------end
}
export default TodoList;