/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { ADMIN_PATH } from 'utils/constant'
import * as moment from 'moment'
import ReactTable from 'components/admin/ReactTable/ReactTable.component'

const TasksPage = ({ taskListObj, getTaskList }) => {
  const columns = [
    {
      Header: 'Họ tên',
      accessor: 'fullName',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Tên đăng nhập',
      accessor: 'username',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Vai trò',
      accessor: 'rolesInText',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Tạo ngày',
      accessor: 'createdDate',
      Cell: props => moment(props.cell.value).format('DD/MM/YYYY HH:mm'),
    },
    {
      Header: '',
      accessor: '_id',
      id: 'action',
      headerClassName: 'text-right',
      className: 'text-right',
      Cell: props => {
        const { cell } = props
        return (
          <>
            <a
              href={`${ADMIN_PATH}/user-info/${cell.value}`}
              className="btn btn-simple btn-secondary btn-just-icon"
            >
              <i className="zmdi zmdi-eye" />
            </a>
          </>
        )
      },
    },
  ]

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Danh sách task</h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <ReactTable
                columns={columns}
                data={taskListObj.taskList.data}
                fetchData={getTaskList}
                loading={taskListObj.isLoading}
                pageCount={Math.ceil(taskListObj.taskList.count / 10)}
                defaultPageSize={10}
                pageSize={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksPage
