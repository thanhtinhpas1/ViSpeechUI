import { connect } from 'react-redux'
import { getOrderList } from 'redux/order/order.actions'
import TransactionsTab from './TransactionsTab.component'

const mapStateToProps = state => ({
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ userId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getOrderList({ userId, pagination, sortField, sortOrder, filters })),
})

const TransactionsTabContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsTab)

export default TransactionsTabContainer
