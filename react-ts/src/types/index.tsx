// ./src/types/index.tsx
// 把Counter/Counter2组件汇总到一起
export interface Store {
    counter: Counter,
    counter2: Counter2
  }
  // 分别对应Counter组件
  export interface Counter {
    number: number
  }
  // 分别对应Counter2组件
  export interface Counter2 {
    number: number
  }
  