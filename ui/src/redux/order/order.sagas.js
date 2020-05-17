/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import { TOKEN_TYPE, STATUS, ORDER_STATUS } from 'utils/constant'
import OrderService from 'services/order.service'
import OrderTypes from './order.types'
import {
  getOrderListSuccess,
  getOrderListFailure,
  getOrderInfoSuccess,
  getOrderInfoFailure,
} from './order.actions'

// get order list
const formatOrderList = orderList => {
  const mapFunc = order => {
    return {
      ...order,
      status: {
        status: order.status,
        name: STATUS[order.status].viText,
        class: STATUS[order.status].cssClass,
      },
      tokenType: {
        ...order.tokenType,
        name: TOKEN_TYPE[order.tokenType.name].viText,
        class: TOKEN_TYPE[order.tokenType.name].cssClass,
      },
      token: order.token.value,
    }
  }
  return orderList.map(mapFunc)
}

function* getList({ payload: filterConditions }) {
  try {
    const orderList = yield OrderService.getOrderList(filterConditions)
    orderList.data = formatOrderList(orderList.data)
    yield put(getOrderListSuccess(orderList))
  } catch (err) {
    yield put(getOrderListFailure(err.message))
  }
}
export function* getOrderListSaga() {
  yield takeLatest(OrderTypes.GET_ORDER_LIST, getList)
}

// get order info
const formatOrderInfo = order => {
  let info = { ...order }
  info = {
    ...info,
    tokenType: {
      ...info.tokenType,
      name: TOKEN_TYPE[info.tokenType.name].viText,
      class: TOKEN_TYPE[info.tokenType.name].cssClass,
      saleOffPrice:
        ((100 - Number(info.tokenType.salePercent || 0)) * Number(info.tokenType.price)) / 100,
    },
    status: {
      status: info.status,
      name: ORDER_STATUS[info.status].viText,
      class: ORDER_STATUS[info.status].cssClass,
    },
  }
  return info
}

function* getOrderInfo({ payload: { id, tokenId } }) {
  try {
    let order = yield OrderService.getOrderInfo({ id, tokenId })
    order = formatOrderInfo(order)
    yield put(getOrderInfoSuccess(order))
  } catch (err) {
    yield put(getOrderInfoFailure(err.message))
  }
}
export function* getOrderInfotSaga() {
  yield takeLatest(OrderTypes.GET_ORDER_INFO, getOrderInfo)
}

// create new transaction
// function* create({ payload: transaction }) {
//   try {
//     // const newTransaction = yield TransactionService.createTransaction(transaction)
//     // yield put(updateContract(newContract))
//   } catch (err) {
//     console.log('ERR CREATE TRANSACTION ', err)
//     // yield put(updateContract(null))
//   }
// }
// export function* createTransactionSaga() {
//   yield takeLatest(OrderTypes.CREATE_TRANSACTION, create)
// }

// =================================

export function* orderSaga() {
  yield all([call(getOrderListSaga), call(getOrderInfotSaga)])
}
