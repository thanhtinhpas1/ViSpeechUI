/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react'
import * as moment from 'moment'
import ReactTable from 'components/admin/ReactTable/ReactTable.component'
import { ADMIN_PATH } from '../../../../../utils/constant'

const ProjectsTab = ({
  userInfoObj,
  getMyProjectListObj,
  getAcceptedProjectListObj,
  getMyProjects,
  getAcceptedProjects,
}) => {
  const userProjectTableColumns = [
    {
      Header: 'Tên project',
      accessor: 'name',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return (
          <span className="lead tnx-id" style={{ color: '#2c80ff' }}>
            {cell.value}
          </span>
        )
      },
    },
    {
      Header: 'Mô tả',
      accessor: 'description',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return <div className="d-flex align-items-center">{cell.value}</div>
      },
    },
    {
      Header: 'Thời gian tạo',
      accessor: 'createdDate',
      headerClassName: 'data-col dt-amount',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return (
          <span className="sub sub-date" style={{ fontSize: '13px' }}>
            {moment(cell.value).format('DD/MM/YYYY HH:mm')}
          </span>
        )
      },
    },
    {
      Header: '',
      accessor: '_id',
      id: 'my-project-detail',
      headerClassName: 'data-col',
      className: 'data-col text-right',
      Cell: props => {
        const { cell } = props
        return (
          <a
            href={`${ADMIN_PATH}/user-project/${cell.value}`}
            className="btn btn-just-icon btn-secondary btn-simple"
          >
            <i className="zmdi zmdi-eye" />
          </a>
        )
      },
    },
  ]

  const userAcceptedProjectTableColumns = [
    {
      Header: 'Tên project',
      accessor: 'name',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return (
          <span className="lead tnx-id" style={{ color: '#2c80ff' }}>
            {cell.value}
          </span>
        )
      },
    },
    {
      Header: 'Mô tả',
      accessor: 'description',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return <div className="d-flex align-items-center">{cell.value}</div>
      },
    },
    {
      Header: 'Tạo bởi',
      accessor: 'ownerName',
      headerClassName: 'data-col dt-amount',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return <span className="lead tnx-id">{cell.value}</span>
      },
    },
    {
      Header: 'Thời gian tạo',
      accessor: 'createdDate',
      headerClassName: 'data-col dt-amount',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return (
          <span className="sub sub-date" style={{ fontSize: '13px' }}>
            {moment(cell.value).format('DD/MM/YYYY HH:mm')}
          </span>
        )
      },
    },
    {
      Header: 'Trạng thái',
      accessor: 'status',
      headerClassName: 'data-col dt-token',
      className: 'data-col dt-token',
      Cell: props => {
        const { cell } = props
        return (
          <div className="d-flex align-items-center">
            <div className={`data-state ${cell.value.class}`} />
            <span className="sub sub-s2" style={{ paddingTop: 0 }}>
              {cell.value.name}
            </span>
          </div>
        )
      },
    },
    {
      Header: '',
      accessor: '_id',
      id: 'accepted-project-detail',
      headerClassName: 'data-col',
      className: 'data-col text-right',
      Cell: props => {
        const { cell } = props
        return (
          <a
            href={`${ADMIN_PATH}/user-accepted-project/${cell.value}`}
            className="btn btn-just-icon btn-secondary btn-simple"
          >
            <i className="zmdi zmdi-eye" />
          </a>
        )
      },
    },
  ]

  const getUserProjectList = useCallback(
    ({ pageIndex, pageSize }) => {
      const userId = userInfoObj.user._id
      if (userId) {
        getMyProjects({ userId, pageIndex, pageSize })
      }
    },
    [userInfoObj.user._id, getMyProjects]
  )

  const getUserAcceptedProjectList = useCallback(
    ({ pageIndex, pageSize }) => {
      const userId = userInfoObj.user._id
      if (userId) {
        getAcceptedProjects({ userId, pageIndex, pageSize })
      }
    },
    [userInfoObj.user._id, getAcceptedProjects]
  )

  return (
    <div role="tabpanel" className="tab-pane" id="projects-tab">
      <ul className="nav nav-pills nav-pills-warning">
        <li className="active">
          <a href="#user-projects" data-toggle="tab">
            Dự án của tôi
          </a>
        </li>
        <li>
          <a href="#user-accepted-projects" data-toggle="tab">
            Dự án đã tham gia
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane active" id="user-projects">
          {userInfoObj.user._id && (
            <ReactTable
              columns={userProjectTableColumns}
              data={getMyProjectListObj.myProjectList.data}
              fetchData={getUserProjectList}
              loading={getMyProjectListObj.isLoading}
              pageCount={Math.ceil(getMyProjectListObj.myProjectList.count / 5)}
              defaultPageSize={5}
              pageSize={5}
            />
          )}
        </div>
        <div className="tab-pane" id="user-accepted-projects">
          {userInfoObj.user._id && (
            <ReactTable
              columns={userAcceptedProjectTableColumns}
              data={getAcceptedProjectListObj.acceptedProjectList.data}
              fetchData={getUserAcceptedProjectList}
              loading={getAcceptedProjectListObj.isLoading}
              pageCount={Math.ceil(getAcceptedProjectListObj.acceptedProjectList.count / 5)}
              defaultPageSize={5}
              pageSize={5}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectsTab
