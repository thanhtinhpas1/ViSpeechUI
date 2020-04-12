import { connect } from 'react-redux'
import { getOrderList } from 'redux/order/order.actions'
import TransactionsTab from './TransactionsTab.component'

const mapStateToProps = state => ({
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ userId, pageIndex, pageSize }) =>
    dispatch(getOrderList({ userId, pageIndex, pageSize })),
})

const TransactionsTabContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsTab)

export default TransactionsTabContainer
