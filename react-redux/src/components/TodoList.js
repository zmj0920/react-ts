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
      userList: []  // 用户列表
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
          <table>
            <thead>
              <tr>
                <th>登录名称</th>
                <th>电子邮箱</th>
                <th>联系方式</th>
                <th>真实姓名</th>
                <th>用户性别</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.userList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td >{item.uname}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.user_name}</td>
                      <td>{item.gender}</td>
                      <td>
                        <Button>删除</Button>
                        <Button>修改</Button>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>










          {/* <Table className="table-item" title={() => '商品列表'} dataSource={this.state.userList} bordered  >
            <Column title="编号" dataIndex="uid" key="uid" />
            <Column title="姓名" dataIndex="uname" key="uname" />
            <Column title="电子邮箱" dataIndex="email" key="email" />
            <Column title="联系方式" dataIndex="phone" key="phone" />
            <Column title="真实姓名" dataIndex="user_name" key="user_name" />
            <Column title="用户性别" dataIndex="gender" key="gender" />
          </Table> */}



        </div >
      </div >
    );
  }
}
export default TodoList;
