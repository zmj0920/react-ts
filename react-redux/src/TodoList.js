import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store'
// const data=[
//     '早8点开晨会，分配今天的开发工作',
//     '早9点和项目经理作开发需求讨论会',
//     '晚5:30对今日代码进行review'
// ]



class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = store.getState();
    // console.log(this.state);
    this.changeInputValue = this.changeInputValue.bind(this);

    //----------关键代码-----------start
    this.storeChange = this.storeChange.bind(this)  //转变this指向
    store.subscribe(this.storeChange) //订阅Redux的状态
    //----------关键代码-----------end
  }

  changeInputValue(e) {
    const action = {
      type: 'changeInput',
      value: e.target.value
    }
    store.dispatch(action)
  }

  clickBtn() {
    const action = { type: 'addItem' }
    store.dispatch(action)
  }


  storeChange() {
    this.setState(store.getState())
  }
  deleteItem(index){
    const action = { type: 'deleteItem',index };
    store.dispatch(action);
  }


  render() {
    return (
      <div style={{ margin: '10px' }}>
        <div>
          <Input placeholder={this.state.inputValue}
            style={{
              width: '250px',
              marginRight: '10px'
            }}
            onChange={this.changeInputValue}
          />
          <Button type="primary" onClick={this.clickBtn}>增加</Button>
        </div>
        <div style={{ margin: '10px', width: '300px' }}>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (<List.Item onClick={this.deleteItem.bind(this, index)}>{item}</List.Item>)}
          />
        </div>
      </div>
    );
  }
}
export default TodoList;
