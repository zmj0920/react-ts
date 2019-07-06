import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import API from "../api/api";

// const data=[
//     '早8点开晨会，分配今天的开发工作',
//     '早9点和项目经理作开发需求讨论会',
//     '晚5:30对今日代码进行review'
// ]
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: []  // 商店列表
    }
  }

  getUserList = async () => {
    const userList = await API.getUser()
    this.setState({
      userList: userList
    })
    console.log(this.state.userList);
  }
  componentWillMount() {
    this.getUserList()
  }
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <div>
          <Input placeholder='添加'
            style={{
              width: '250px',
              marginRight: '10px'
            }}

          />
          <Button type="primary" >增加</Button>
        </div>
        <div style={{ margin: '10px', width: '300px' }}>
          <List
            bordered
            dataSource={this.state.userList}
            renderItem={(item, index) => (<List.Item>{item.uname}</List.Item>)}
          />
        </div>
      </div>
    );
  }
}
export default TodoList;
