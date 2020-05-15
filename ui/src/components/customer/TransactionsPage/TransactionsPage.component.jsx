/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import AntdTable from 'components/customer/AntdTable/AntdTable.component'
import { CUSTOMER_PATH, STATUS, TOKEN_TYPE } from 'utils/constant'
// import ReactTable from 'components/customer/ReactTable/ReactTable.component'
import * as moment from 'moment'

const TransactionsPage = ({ currentUser, orderListObj, getOrderList }) => {
  const columns = [
    {
      title: 'Mã',
      dataIndex: '_id',
      canSearch: true,
      render: _id => <span className="lead tnx-id">{_id}</span>,
      width: 150,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: true,
      filters: [
        { text: STATUS.PENDING.viText, value: STATUS.PENDING.name },
        { text: STATUS.SUCCESS.viText, value: STATUS.SUCCESS.name },
        { text: STATUS.FAILURE.viText, value: STATUS.FAILURE.name },
      ],
      filterMultiple: true,
      render: status => (
        <div className="d-flex align-items-center">
          <div className={`data-state ${status.class}`} />
          <span className="sub sub-s2" style={{ paddingTop: 0 }}>
            {status.name}
          </span>
        </div>
      ),
      width: 180,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdDate',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      sorter: true,
      render: createdDate => (
        <span className="sub sub-date" style={{ fontSize: '13px' }}>
          {moment(createdDate).format('DD/MM/YYYY HH:mm')}
        </span>
      ),
      width: 180,
    },
    {
      title: 'Token',
      dataIndex: 'token',
      headerClassName: 'dt-account',
      className: 'dt-account',
      render: token => (
        <span className="lead tnx-id">
          <div className="copy-wrap w-100">
            <span className="copy-feedback" />
            <em className="fas fa-key" />
            <input type="text" className="copy-address" defaultValue={token} disabled />
            <button
              type="button"
              className="copy-trigger copy-clipboard"
              data-clipboard-text={token}
            >
              <em className="ti ti-files" />
            </button>
          </div>
        </span>
      ),
      width: 250,
    },
    {
      title: 'Loại token',
      dataIndex: 'tokenType',
      sorter: true,
      filters: [
        { text: TOKEN_TYPE.FREE.viText, value: TOKEN_TYPE.FREE.name },
        { text: TOKEN_TYPE['50-MINS'].viText, value: TOKEN_TYPE['50-MINS'].name },
        { text: TOKEN_TYPE['200-MINS'].viText, value: TOKEN_TYPE['200-MINS'].name },
        { text: TOKEN_TYPE['500-MINS'].viText, value: TOKEN_TYPE['500-MINS'].name },
      ],
      filterMultiple: true,
      render: tokenType => (
        <>
          <span className={`dt-type-md badge badge-outline ${tokenType.class} badge-md`}>
            {tokenType.name}
          </span>
          <span className={`dt-type-sm badge badge-sq badge-outline ${tokenType.class} badge-md`}>
            {tokenType.name}
          </span>
        </>
      ),
      width: 180,
    },
    {
      title: '',
      dataIndex: '_id',
      // className: 'text-right',
      render: _id => (
        <Link
          to={`${CUSTOMER_PATH}/transaction-details?id=${_id}`}
          className="btn btn-light-alt btn-xs btn-icon"
        >
          <em className="ti ti-eye" />
        </Link>
      ),
      width: 60,
    },
  ]

  const getList = useCallback(
    // eslint-disable-next-line no-unused-vars
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = currentUser._id
      const { current, pageSize } = pagination
      getOrderList({ userId, pageIndex: current - 1, pageSize })
    },
    [currentUser._id, getOrderList]
  )

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Lịch sử giao dịch</h4>
            </div>
            {currentUser._id && (
              <AntdTable
                dataObj={orderListObj.orderList}
                columns={columns}
                fetchData={getList}
                loading={orderListObj.isLoading}
                pageSize={5}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
