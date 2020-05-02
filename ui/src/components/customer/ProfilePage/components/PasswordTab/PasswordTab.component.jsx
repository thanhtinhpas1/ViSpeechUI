/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useCallback } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { useHistory } from 'react-router-dom'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'
import Utils from 'utils'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PASSWORD_CHANGED_SUCCESS_EVENT, PASSWORD_CHANGED_FAILED_EVENT } = KAFKA_TOPIC

const PasswordTab = ({
  currentUser,
  changePasswordObj,
  changePassword,
  changePasswordSuccess,
  changePasswordFailure,
  logout,
}) => {
  const history = useHistory()
  const [form] = Form.useForm()

  useEffect(() => {
    SocketService.socketEmitEvent(PASSWORD_CHANGED_SUCCESS_EVENT)
    SocketService.socketEmitEvent(PASSWORD_CHANGED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(PASSWORD_CHANGED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PASSWORD_CHANGED_FAILED_EVENT)
  }, [])

  const onLogout = useCallback(() => {
    logout()
    history.push(`/`)
  }, [history, logout])

  useEffect(() => {
    if (changePasswordObj.isLoading === false && changePasswordObj.isSuccess === true) {
      setTimeout(() => {
        onLogout()
      }, 1500)
    }
  }, [changePasswordObj, onLogout])

  const onSubmit = async values => {
    if (!currentUser._id) return

    const userId = currentUser._id
    const { oldPassword, newPassword } = values

    changePassword({ userId, oldPassword, newPassword })
    try {
      await UserService.changePassword({ userId, oldPassword, newPassword })
      invokeCheckSubject.PasswordChanged.subscribe(data => {
        if (data.error != null) {
          let msg = data.errorObj['message'];
          data.errorObj['message'] = msg.indexOf("Passwords do not match") >= 0 ? 'Mật khẩu cũ không chính xác' : msg;
          changePasswordFailure(data.errorObj)
        } else {
          changePasswordSuccess()
        }
        form.resetFields()
      })
    } catch (err) {
      changePasswordFailure({ message: err.message })
      form.resetFields()
    }
  }

  return (
    <div className="tab-pane fade" id="change-password">
      <Form form={form} onFinish={onSubmit} id="change-password-form">
        <div className="row">
          <div className="col-md-12">
            {!changePasswordObj.isLoading && changePasswordObj.isSuccess === false && (
              <Alert
                message={Utils.buildFailedMessage(changePasswordObj.message)}
                type="error"
                showIcon
                closable
                style={{ marginBottom: '20px' }}
              />
            )}
            {!changePasswordObj.isLoading && changePasswordObj.isSuccess === true && (
              <Alert
                message="Thay đổi mật khẩu thành công"
                type="success"
                showIcon
                closable
                style={{ marginBottom: '20px' }}
              />
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="oldPassword" className="input-item-label">
              Mật khẩu hiện tại
            </label>
            <Form.Item
              id="oldPassword"
              name="oldPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu hiện tại!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="newPassword" className="input-item-label">
              Mật khẩu mới
            </label>
            <Form.Item
              name="newPassword"
              dependencies={['oldPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu mới!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('oldPassword') !== value) {
                      return Promise.resolve()
                    }
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Mật khẩu mới trùng mật khẩu cũ!')
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <label htmlFor="confirmedNewPassword" className="input-item-label">
              Xác nhận mật khẩu mới
            </label>
            <Form.Item
              name="confirmedNewPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng xác nhận mật khẩu mới!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Mật khẩu không khớp. Vui lòng nhập lại!')
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div className="col-md-12 d-sm-flex justify-content-between align-items-center">
            <Form.Item>
              <Button
                htmlType="submit"
                loading={changePasswordObj.isLoading}
                type="primary"
                size="large"
              >
                Cập nhật
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
      {/* <form onSubmit={onSubmit} id="change-password-form">
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="old-pass" className="input-item-label">
                Mật khẩu hiện tại
              </label>
              <input className="input-bordered" type="password" id="old-pass" name="oldPassword" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="new-pass" className="input-item-label">
                Mật khẩu mới
              </label>
              <input className="input-bordered" type="password" id="new-pass" name="newPassword" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="confirm-pass" className="input-item-label">
                Xác nhận mật khẩu mới
              </label>
              <input
                className="input-bordered"
                type="password"
                id="confirm-pass"
                name="confirmedNewPassword"
                onChange={onChangeConfirmedNewPassword}
              />
            </div>
          </div>
        </div>
        <div className="note note-plane note-info pdb-1x">
          <em className="fas fa-info-circle" />
          <p>Mật khẩu phải bao gồm 8 kí tự, trong đó bao gồm kí tự thường và hoa.</p>
        </div>
        <div className="gaps-1x" />
        <div className="d-sm-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">
            Cập nhật
          </button>
        </div>
      </form> */}
    </div>
  )
}

export default PasswordTab
