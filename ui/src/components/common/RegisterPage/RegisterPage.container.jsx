import { connect } from 'react-redux'
import { registerStart, onClearUserState } from 'redux/user/user.actions'
import RegisterPage from './RegisterPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  registerObj: state.user.register,
})

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(registerStart(user)),
  onClearUserState: () => dispatch(onClearUserState()),
})

const RegisterPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterPage)

export default RegisterPageContainer
