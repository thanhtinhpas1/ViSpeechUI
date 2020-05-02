import { connect } from 'react-redux'
import TokenTransaction from './TokenTransaction.component'
import { getOrderList } from '../../../../../redux/order/order.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ userId, pageIndex, pageSize }) =>
    dispatch(getOrderList({ userId, pageIndex, pageSize })),
})

const TokenTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(TokenTransaction)

export default TokenTransactionContainer
