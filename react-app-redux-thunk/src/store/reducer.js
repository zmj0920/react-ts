//----关键代码--------start --------引入GET_LIST
import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, GET_LIST } from './actionTypes'
//----关键代码--------end 
const defaultState = {
    inputValue: 'Write Something',
    //----关键代码--------start --------删除原来的初始化代码，减少冗余
    list: [],
    user:[]
}
export default (state = defaultState, action) => {
    if (action.type === CHANGE_INPUT) {
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.inputValue = action.value
        return newState
    }
    if (action.type === ADD_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue) //push新的内容到列表中去
        newState.inputValue = ''
        return newState
    }
    if (action.type === DELETE_ITEM) { //根据type值，编写业务逻辑
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1) //push新的内容到列表中去
        return newState
    }
    //----关键代码--------start --------
    if (action.type === GET_LIST) { //根据type值，编写业务逻辑
        let newState = JSON.parse(JSON.stringify(state))
        newState.user = action.data //复制性的List数组进去
        return newState
    }
    //----关键代码--------en'd --------

    return state
}