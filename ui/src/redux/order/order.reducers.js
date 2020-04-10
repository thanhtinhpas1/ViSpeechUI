import OrderTypes from './order.types'

const INITIAL_STATE = {
  getList: {
    orderList: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getInfo: {
    order: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  newOrder: {},
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderTypes.CLEAR_ORDER_STATE:
      return {
        ...INITIAL_STATE,
      }
    // GET ORDER LIST
    case OrderTypes.GET_ORDER_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case OrderTypes.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: true,
          orderList: action.payload.orderList,
        },
      }
    case OrderTypes.GET_ORDER_LIST_FAILURE:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET ORDER INFO
    case OrderTypes.GET_ORDER_INFO:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          isLoading: true,
        },
      }
    case OrderTypes.GET_ORDER_INFO_SUCCESS:
      return {
        ...state,
        getInfo: {
          isLoading: false,
          isSuccess: true,
          order: action.payload.data,
        },
      }
    case OrderTypes.GET_ORDER_INFO_FAILURE:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default orderReducer
