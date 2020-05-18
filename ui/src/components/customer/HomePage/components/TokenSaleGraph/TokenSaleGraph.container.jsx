import { connect } from 'react-redux'
import { getOrderList } from 'redux/order/order.actions'
import TokenSaleGraph from './TokenSaleGraph.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ userId, pageIndex, pageSize }) => dispatch(getOrderList({ userId, pageIndex, pageSize })),
})

const TokenSaleGraphContainer = connect(mapStateToProps, mapDispatchToProps)(TokenSaleGraph)

export default TokenSaleGraphContainer
