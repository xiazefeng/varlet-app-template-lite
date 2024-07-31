// import { localStorage } from './../utils/storage';
// https://github.com/varletjs/axle
import { createAxle, requestMockInterceptor, RunnerMethod, AxleRequestConfig } from '@varlet/axle'
import { createUseAxle, UseAxleOptions } from '@varlet/axle/use'
import Mock from 'mockjs'

export interface Response<T> {
  data: T
  code: number
  message: string
}

export type Options<V, R, P> = Partial<UseAxleOptions<V, R, P>>

export const axle = createAxle({
  baseURL:  import.meta.env.VITE_API_BASE 
})

axle.useRequestInterceptor({
  onFulfilled(config) {
     // 解构赋值
  let { headers = {}  } = config 
    const token = localStorage.getItem('token');
      return {
        ...config,
        headers:{
          ...headers,
          'Authorization':token,
        }
      }
    }
})

axle.useResponseInterceptor({
  onFulfilled(response) {
    const { code, msg } = response.data

    if (code !== 'ok' && msg) {
      if(code == '401'){
        const reloadFlag = localStorage.getItem('reloadFlag');
        if(reloadFlag){
          localStorage.removeItem('reloadFlag');
          Snackbar('登录失败，请重新登录')
        }else{
          // 如果需要重新登录，则移除token，标识为重新登录，同时刷新页面，
          localStorage.setItem('reloadFlag',"1");
          localStorage.removeItem('token');
          window.location.reload();
        }
      }else{
        Snackbar(msg)
      }
    }

    return response.data
  },

  onRejected(error) {
    Snackbar('服务器繁忙，请稍后再试')
    return Promise.reject(error)
  }
})

export const useAxle = createUseAxle({
  axle,
  onTransform: (response) => response.data,
})

export function api(url: string, method: RunnerMethod) {
  function load<V, P = Record<string, any>>(params?: P, config?: AxleRequestConfig): Promise<Response<V>> {
    return axle[method](url, params, config)
  }

  function use<V, RV = V, P = Record<string, any>, R = Response<RV>>(options: Options<V, R, P> = {}) {
    return useAxle({ url, method, ...options })
  }

  return {
    url,
    load,
    use
  }
}
