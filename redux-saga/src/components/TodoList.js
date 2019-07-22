import React, { Component } from 'react';
import store from '../store'
import TodoListUI from './TodoListUI'
//关键代码-------------start
import { getMyListAction, changeInputAction, addItemAction, deleteItemAction } from '../store/actionCreatores'
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
        const action = getMyListAction()
        store.dispatch(action)
        console.log(action)
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
            return ( <
                TodoListUI inputValue = { this.state.inputValue }
                list = { this.state.list }
                changeInputValue = { this.changeInputValue }
                clickBtn = { this.clickBtn }
                deleteItem = { this.deleteItem }
                />
            );
        }
        //--------关键代码------end
}
export default TodoList;