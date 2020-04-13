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

const TransactionsTab = ({ userInfoObj, orderListObj, getOrderList }) => {
  const columns = [
    {
      Header: 'Mã',
      accessor: '_id',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      Cell: props => {
        const { cell } = props
        return <span className="lead tnx-id">{cell.value}</span>
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
      Header: 'Token',
      accessor: 'token',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-type',
      Cell: props => {
        const { cell } = props
        return (
          <span className="lead tnx-id">
            <div className="copy-wrap w-100">
              <span className="copy-feedback" />
              <em className="fas fa-key" />
              <input type="text" className="copy-address" defaultValue={cell.value} disabled />
              <button
                type="button"
                className="copy-trigger copy-clipboard"
                data-clipboard-text={cell.value}
              >
                <em className="ti ti-files" />
              </button>
            </div>
          </span>
        )
      },
    },
    {
      Header: () => <div className="dt-type-text">Loại token</div>,
      accessor: 'tokenType',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-type',
      Cell: props => {
        const { cell } = props
        return (
          <>
            <span className={`dt-type-md badge badge-outline ${cell.value.class} badge-md`}>
              {cell.value.name}
            </span>
            <span
              className={`dt-type-sm badge badge-sq badge-outline ${cell.value.class} badge-md`}
            >
              {cell.value.name}
            </span>
          </>
        )
      },
    },
    {
      Header: '',
      accessor: '_id',
      id: 'transaction-detail',
      headerClassName: 'data-col',
      className: 'data-col text-right',
      Cell: props => {
        const { cell } = props
        return (
          <a
            href={`${ADMIN_PATH}/transaction-details?id=${cell.value}`}
            className="btn btn-just-icon btn-secondary btn-simple"
          >
            <i className="zmdi zmdi-eye" />
          </a>
        )
      },
    },
  ]

  const getList = useCallback(
    ({ pageSize, pageIndex }) => {
      const userId = userInfoObj.user._id
      if (userId) {
        getOrderList({ userId, pageIndex, pageSize })
      }
    },
    [userInfoObj.user._id, getOrderList]
  )

  return (
    <div role="tabpanel" className="tab-pane" id="transactions-tab">
      {userInfoObj.user._id && (
        <ReactTable
          columns={columns}
          data={orderListObj.orderList.data}
          fetchData={getList}
          loading={orderListObj.isLoading}
          pageCount={Math.ceil(orderListObj.orderList.count / 5)}
          defaultPageSize={5}
          pageSize={5}
        />
      )}
    </div>
  )
}

export default TransactionsTab
