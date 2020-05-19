import { connect } from 'react-redux'
import { getOrderList } from 'redux/order/order.actions'
import TransactionsPage from './TransactionsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ userId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getOrderList({ userId, pagination, sortField, sortOrder, filters })),
})

const TransactionsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)

export default TransactionsPageContainer
