import { connect } from 'react-redux'
import TokenSaleGraph from './TokenSaleGraph.component'
import { getOrderList } from '../../../../../redux/order/order.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ userId, pageIndex, pageSize }) =>
    dispatch(getOrderList({ userId, pageIndex, pageSize })),
})

const TokenSaleGraphContainer = connect(mapStateToProps, mapDispatchToProps)(TokenSaleGraph)

export default TokenSaleGraphContainer
