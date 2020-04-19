/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { ADMIN_PATH } from 'utils/constant'
import * as moment from 'moment'
import ReactTable from 'components/admin/ReactTable/ReactTable.component'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'
import InfoModal from 'components/admin/InfoModal/InfoModal.component'
import Utils from 'utils'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const {
  USER_DELETED_FAILED_EVENT,
  TOKEN_DELETED_BY_USERID_SUCCESS_EVENT,
  TOKEN_DELETED_BY_USERID_FAILED_EVENT,
  PROJECT_DELETED_BY_USERID_SUCCESS_EVENT,
  PROJECT_DELETED_BY_USERID_FAILED_EVENT,
  PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT,
  PERMISSION_DELETED_BY_USERID_FAILED_EVENT,
} = KAFKA_TOPIC

const UserListPage = ({
  userListObj,
  deleteUserObj,
  getUserList,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    SocketService.socketEmitEvent(USER_DELETED_FAILED_EVENT)
    SocketService.socketEmitEvent(TOKEN_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketEmitEvent(TOKEN_DELETED_BY_USERID_FAILED_EVENT)
    SocketService.socketEmitEvent(PROJECT_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketEmitEvent(PROJECT_DELETED_BY_USERID_FAILED_EVENT)
    SocketService.socketEmitEvent(PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketEmitEvent(PERMISSION_DELETED_BY_USERID_FAILED_EVENT)

    SocketService.socketOnListeningEvent(USER_DELETED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_USERID_FAILED_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_DELETED_BY_USERID_FAILED_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_DELETED_BY_USERID_FAILED_EVENT)
  }, [])

  useEffect(() => {
    if (deleteUserObj.isLoading === false && deleteUserObj.isSuccess != null) {
      if (deleteUserObj.isSuccess === true) {
        setInfoModal({
          title: 'Xoá khách hàng',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
              getUserList({ pageIndex: 0, pageSize: 5 })
            },
          },
        })
      } else {
        setInfoModal({
          title: 'Xoá khách hàng',
          message: Utils.buildFailedMessage(deleteUserObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
            },
          },
        })
      }
    }
  }, [deleteUserObj, getUserList])

  const onDeleteUser = async userId => {
    if (!userId) return

    setInfoModal({
      title: 'Xoá khách hàng',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    })
    window.$('#info-modal').modal('show')

    deleteUser(userId)
    try {
      await UserService.deleteUser(userId)
      invokeCheckSubject.UserDeleted.subscribe(data => {
        if (data.error != null) {
          deleteUserFailure(data.errorObj)
        }
      })
      invokeCheckSubject.TokenDeletedByUserId.subscribe(data => {
        if (data.error != null) {
          deleteUserFailure(data.errorObj)
        }
      })
      invokeCheckSubject.ProjectDeletedByUserId.subscribe(data => {
        if (data.error != null) {
          deleteUserFailure(data.errorObj)
        }
      })
      invokeCheckSubject.PermissionDeletedByUserId.subscribe(data => {
        if (data.error != null) {
          deleteUserFailure(data.errorObj)
        } else {
          deleteUserSuccess()
        }
      })
    } catch (err) {
      deleteUserFailure({ message: err.message })
    }
  }

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
            <a
              href="#"
              className="btn btn-simple btn-danger btn-just-icon"
              onClick={() => onDeleteUser(cell.value)}
            >
              <i className="zmdi zmdi-close-circle-o" />
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
            <h4 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Danh sách khách hàng</span>
              <a
                href={`${ADMIN_PATH}/create-user`}
                className="btn btn-just-icon btn-simple btn-primary m-0"
                rel="tooltip"
                title="Thêm mới"
              >
                <i className="zmdi zmdi-plus-circle-o" />
              </a>
            </h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <ReactTable
                columns={columns}
                data={userListObj.userList.data}
                fetchData={getUserList}
                loading={userListObj.isLoading}
                pageCount={Math.ceil(userListObj.userList.count / 5)}
                defaultPageSize={5}
                pageSize={5}
              />
            </div>
          </div>
        </div>
      </div>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default UserListPage
