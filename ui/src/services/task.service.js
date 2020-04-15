import STORAGE from 'utils/storage'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import { apiUrl } from './api-url'

export default class TaskService {
  static getTaskList = filterConditions => {
    const { pageIndex, pageSize } = filterConditions
    const offset = pageIndex * pageSize
    const limit = pageSize

    const api =
      pageIndex != null && pageSize != null
        ? `${apiUrl}/tasks?offset=${offset}&limit=${limit}`
        : `${apiUrl}/tasks`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          throw new Error(result.message || DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        throw new Error(err.message || DEFAULT_ERR_MESSAGE)
      })
  }
}
