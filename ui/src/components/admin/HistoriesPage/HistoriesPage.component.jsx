/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import * as moment from 'moment'
import ReactTable from 'components/admin/ReactTable/ReactTable.component'

const HistoriesPage = ({ requestListObj, getRequestList }) => {
  const columns = [
    {
      Header: 'Mã token',
      accessor: 'tokenId',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Tên file',
      accessor: 'fileName',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Định dạng',
      accessor: 'mimeType',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Kích thước',
      accessor: 'size',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Mã dự án',
      accessor: 'projectId',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Thời gian sử dụng (phút)',
      accessor: 'duration',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Thời gian tạo',
      accessor: 'createdDate',
      Cell: props => moment(props.cell.value).format('DD/MM/YYYY HH:mm'),
    },
  ]

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Lịch sử</h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <ReactTable
                columns={columns}
                data={requestListObj.requestList.data}
                fetchData={getRequestList}
                loading={requestListObj.isLoading}
                pageCount={Math.ceil(requestListObj.requestList.count / 10)}
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

export default HistoriesPage
