/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import * as moment from 'moment'
import ReactTable from 'components/admin/ReactTable/ReactTable.component'

const TasksPage = ({ taskListObj, getTaskList }) => {
  const columns = [
    {
      Header: 'Tên',
      accessor: 'name',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Thời gian chạy kế tiếp',
      accessor: 'nextRun',
      Cell: props => moment(props.cell.value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      Header: 'Thời gian chạy trước đó',
      accessor: 'previousRun',
      Cell: props => moment(props.cell.value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      Header: 'Trạng thái chạy trước đó',
      accessor: 'previousRunStatus',
      Cell: props => {
        const { cell } = props
        return (
          <span className={`badge ${cell.value.status && cell.value.class} ucap`}>
            {cell.value.name}
          </span>
        )
      },
    },
    {
      Header: 'Lỗi',
      accessor: 'errorLog',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
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
