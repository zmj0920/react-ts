// .src/store/index.tsx
import { createStore } from "redux";
// 引入reducers
import reducers from "./reducers";
// 接着创建仓库
let store = createStore(reducers);
// 导出store仓库
export default store;
