/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import { TOKEN_TYPE, STATUS } from 'utils/constant'
import RequestTypes from './request.types'
import { getRequestListSuccess, getRequestListFailure } from './request.actions'
import RequestService from '../../services/request.service'

// get request list
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
    let requestList = yield RequestService.getRequestList(filterConditions)
    requestList = formatOrderList(requestList || [])
    yield put(getRequestListSuccess(requestList))
  } catch (err) {
    yield put(getRequestListFailure(err.message))
  }
}
export function* getRequestListSaga() {
  yield takeLatest(RequestTypes.GET_REQUEST_LIST, getList)
}

// =================================

export function* requestSaga() {
  yield all([call(getRequestListSaga)])
}
