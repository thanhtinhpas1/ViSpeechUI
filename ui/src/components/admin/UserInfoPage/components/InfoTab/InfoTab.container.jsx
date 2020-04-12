import { connect } from 'react-redux'
import { updateUserInfo } from 'redux/user/user.actions'
import InfoTab from './InfoTab.component'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (id, userInfo) => dispatch(updateUserInfo(id, userInfo)),
})

const InfoTabContainer = connect(mapStateToProps, mapDispatchToProps)(InfoTab)

export default InfoTabContainer
