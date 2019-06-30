import * as React from "react";
// 引入connect，让组件和仓库建立连接
import { connect } from "react-redux";
// 引入actions，用于传给connect
import actions from "../store/actions/counter";
// 引入接口约束
import { Store } from "../types";
import 'antd/dist/antd.css'
import { Button, Table } from 'antd';
import './Counter.css'
const { Column } = Table;

// 加载组件样式


// 接口约束
interface IProps {
  number: number,
  // add是一个函数
  add: any,
  // subtract是一个函数
  subtract: any
}
const data = [
  {
    key: '1',
    name: '电脑',
    num: 32,
    account: '苹果电脑',

  },
  {
    key: '2',
    name: '手机',
    num: 42,
    account: '华为手机',

  },
  {
    key: '3',
    name: '相机',
    num: 33,
    account: '索尼相机',
  },
];
class CounterComponent extends React.Component<IProps>{
  render() {
    // 利用解构赋值取出
    // 这里比如和IProps保持一致，不对应则会报错，因为接口约束了必须这样
    let { number, add, subtract } = this.props
    return (
      <div>
        <Table className="table-item" title={() => '商品列表'} dataSource={data} bordered  >
          <Column title="商品名称" dataIndex="name" key="name" />
          <Column title="数量" dataIndex="num" key="num" />
          <Column title="简介" dataIndex="account" key="account" />
          <Column
            title="操作"
            key="action"
            render={() => (
              <span>
                <Button onClick={add}>+</Button>
                <span className="span-item">{number}</span>
                <Button onClick={subtract}>-</Button>
              </span>
            )}
          />

        </Table>
      </div>
    )
  }
}

// 这个connect需要执行两次，第二次需要我们把这个组件CounterComponent传进去
// connect第一次执行，需要两个参数，

// 需要传给connect的函数
let mapStateToProps = function (state: Store) {
  return state
}

export default connect(
  mapStateToProps,
  actions
)(CounterComponent);
