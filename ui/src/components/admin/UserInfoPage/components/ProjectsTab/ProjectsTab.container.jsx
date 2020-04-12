import { connect } from 'react-redux'
import { getMyProjectList, getAcceptedProjectList } from 'redux/project/project.actions'
import ProjectsTab from './ProjectsTab.component'

const mapStateToProps = state => ({
  getMyProjectListObj: state.project.getMyProjectList,
  getAcceptedProjectListObj: state.project.getAcceptedProjectList,
})

const mapDispatchToProps = dispatch => ({
  getMyProjects: ({ userId, pageIndex, pageSize }) =>
    dispatch(getMyProjectList({ userId, pageIndex, pageSize })),
  getAcceptedProjects: ({ userId, pageIndex, pageSize }) =>
    dispatch(getAcceptedProjectList({ userId, pageIndex, pageSize })),
})

const ProjectsTabContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectsTab)

export default ProjectsTabContainer
