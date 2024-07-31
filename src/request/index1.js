import axios from 'axios'

// 创建axios实例
const service = axios.create({
  timeout: 20000 // 请求超时时间(毫秒)
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    const RefreshToken = localStorage.getItem('RefreshToken')
    if (config.url) {
      // 此处为 Refresh Token 专用接口，请求头使用 Refresh Token
      if (config.url.indexOf('/refreshToken') >= 0) {
        config.headers['token'] = RefreshToken
      } else if (!(config.url.indexOf('/login') !== -1)) {
        // 其他接口，请求头使用 Access Token
        config.headers['token'] = accessToken
      }
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 变量isRefreshing
let isRefreshing = false
// 后续的请求队列
let requestList = []

service.interceptors.response.use(
  async (response) => {
    let res = response.data
    // 为了演示，这里仅展示处理状态码为401的情况
    if (res.code == '401') {
      // 控制是否在刷新token的状态
      if (!isRefreshing) {
        // 修改isRefreshing状态
        isRefreshing = true
        // 这里是获取新token的接口，方法在这里省略了。
        const result = await refreshToken()
        // 获取成功
        if (result && result.data) {
          // 新token
          let newToken = result.data
          // 保存新的accessToken
          localStorage.setItem('accessToken', newToken)
          // 替换新accessToken
          response.config.headers.token = newToken

          // token 刷新后将数组里的请求队列方法重新执行
          requestList.forEach((cb) => cb(newToken))
          // 重新请求完清空
          requestList = []

          // 继续未完成的请求
          const resp = await service.request(response.config)
          // 重置状态
          isRefreshing = false
          // 返回请求结果
          return resp
        } else {
          // 清除token
          localStorage.clear()
          // 重置状态
          isRefreshing = false
          // 跳转到登录页
          router.replace('/login')
        }
      } else {
        // 后面的请求走这里排队
        // 返回未执行 resolve 的 Promise
        return new Promise((resolve) => {
          // 用函数形式将 resolve 存入，等待获取新token后再执行
          requestList.push((newToken) => {
            response.config.headers.token = newToken
            resolve(service(response.config))
          })
        })
      }
    }
    return res
  },
  (error) => {
    // 返回错误信息
    return Promise.reject(error)
  }
)

export default service
