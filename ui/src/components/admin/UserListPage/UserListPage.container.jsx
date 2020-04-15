import { connect } from 'react-redux'
import { getUserList, deleteUser } from 'redux/user/user.actions'
import UserListPage from './UserListPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  userListObj: state.user.getList,
  deleteUserObj: state.user.deleteUser,
})

const mapDispatchToProps = dispatch => ({
  getUserList: ({ pageIndex, pageSize }) => dispatch(getUserList({ pageIndex, pageSize })),
  deleteUser: id => dispatch(deleteUser(id)),
})

const UserListPageContainer = connect(mapStateToProps, mapDispatchToProps)(UserListPage)

export default UserListPageContainer
