import STORAGE from 'utils/storage'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import { apiUrl } from './api-url'
import Utils from 'utils'

export default class TaskService {
  static getTaskList = filterConditions => {
    const { pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0
    
    let query = `${Utils.parameterizeObject({ offset, limit })}`
    if (sortField && sortOrder) {
      const sort = {
        field: sortField,
        order: Utils.getSortOrder(sortOrder)
      }
      query = query.concat(`&${Utils.parameterizeObject({ sort })}`)
    }
    if (typeof filters === 'object' && Object.keys(filters).length > 0) {
      const formatFilters = {}
      for(let key of Object.keys(filters)) {
        formatFilters[key] = filters[key][0]
      }
      query = query.concat(`&${Utils.parameterizeObject({ filters: formatFilters })}`)
    }
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/tasks?${query}`
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
