/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import { TOKEN_TYPE, STATUS } from 'utils/constant'
import TaskTypes from './task.types'
import { getTaskListSuccess, getTaskListFailure } from './task.actions'
import TaskService from '../../services/task.service'

// get task list
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
    let taskList = yield TaskService.getTaskList(filterConditions)
    taskList = formatOrderList(taskList || [])
    yield put(getTaskListSuccess(taskList))
  } catch (err) {
    yield put(getTaskListFailure(err.message))
  }
}
export function* getTaskListSaga() {
  yield takeLatest(TaskTypes.GET_TASK_LIST, getList)
}

// =================================

export function* taskSaga() {
  yield all([call(getTaskListSaga)])
}
