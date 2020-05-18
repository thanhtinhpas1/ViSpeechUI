import { connect } from 'react-redux'
import { getOrderList } from 'redux/order/order.actions'
import TokenTransaction from './TokenTransaction.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ userId, pageIndex, pageSize }) => dispatch(getOrderList({ userId, pageIndex, pageSize })),
})

const TokenTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(TokenTransaction)

export default TokenTransactionContainer
