import { api } from '@/request'

export interface Card {
  id: number
}

export interface CardList {
  cards: Card[]
  current: number
  finished: boolean
  error: boolean
}




// 获取首页商品
export const getHomeGoods = api('/postal/coffee/h5.logo.list', 'post')

export const getGoodsDetail = api('/postal/coffee/h5.goods.detail', 'post')

export const getOrderList = api('/postal/order/h5.list', 'post')

export const createOrder = api('/postal/order/h5.create', 'post')

export const queryOrderStatus = api('/postal/order/h5.qup', 'post')

export const getOrderDetail = api('/postal/order/h5.detail', 'post')

export const cusLogin = api('/postal/coffee/h5.login', 'post')
