import Server from './server'
class API extends Server{
   /**
   * 获取用户消息
   * @param {*} get
   */
  async getUser () {
    try {
      let result = await this.axios('get', 'http://localhost:3000/user')
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取信息失败',
          response: result,
        }
        throw err
      }
    } catch (err) {
      throw err
    }
  }
}

export default new API()