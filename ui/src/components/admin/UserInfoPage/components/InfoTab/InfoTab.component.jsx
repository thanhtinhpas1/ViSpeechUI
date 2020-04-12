/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { ROLES } from '../../../../../utils/constant'
import Utils from '../../../../../utils'

const InfoTab = ({ userInfoObj, updateUserInfo }) => {
  useEffect(() => {
    const roleInputs = window.$('.role-inputs')
    if (
      userInfoObj.user.roles &&
      userInfoObj.user.roles.length > 0 &&
      roleInputs.length === Object.keys(ROLES).length
    ) {
      for (let i = 0; i < roleInputs.length; i += 1) {
        const isChecked = Utils.getRolesInArray(userInfoObj.user.roles).includes(roleInputs[i].name)
        if (isChecked) {
          window.$('.role-inputs')[i].checked = true
        }
      }
    }
  }, [userInfoObj.user.roles])

  const onSubmit = event => {
    event.preventDefault()
    const userId = userInfoObj.user._id
    if (!userId) {
      return
    }

    const form = event.target
    const selectedRoles = Object.values(ROLES).map(role => {
      return {
        name: role,
        isSelected: form.elements[role].checked,
      }
    })
    const formattedRoles = Utils.formatRolesToSubmit(selectedRoles)

    const user = {
      firstName: form.elements.firstName.value,
      lastName: form.elements.lastName.value,
      email: form.elements.email.value,
      roles: formattedRoles,
    }
    updateUserInfo(userId, user)
  }

  return (
    <div role="tabpanel" className="tab-pane active" id="info-tab">
      {/* {userInfoObj.isLoading === false && userInfoObj.isSuccess === true && ( */}
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="row" style={{ margin: '0px 0px' }}>
          <label className="col-sm-2 label-on-left">Họ</label>
          <div className="col-sm-10">
            <div className="form-group label-floating is-empty">
              <label className="control-label" />
              <input
                type="text"
                className="form-control"
                placeholder="Họ"
                name="lastName"
                defaultValue={userInfoObj.user.lastName}
              />
            </div>
          </div>
        </div>
        <div className="row" style={{ margin: '0px 0px' }}>
          <label className="col-sm-2 label-on-left">Tên</label>
          <div className="col-sm-10">
            <div className="form-group label-floating is-empty">
              <label className="control-label" />
              <input
                type="text"
                className="form-control"
                placeholder="Tên"
                name="firstName"
                defaultValue={userInfoObj.user.firstName}
              />
            </div>
          </div>
        </div>
        <div className="row" style={{ margin: '0px 0px' }}>
          <label className="col-sm-2 label-on-left">Tên đăng nhập</label>
          <div className="col-sm-10">
            <div className="form-group">
              <p className="form-control-static">{userInfoObj.user.username}</p>
            </div>
          </div>
        </div>
        <div className="row" style={{ margin: '0px 0px' }}>
          <label className="col-sm-2 label-on-left">Email</label>
          <div className="col-sm-10">
            <div className="form-group label-floating is-empty">
              <label className="control-label" />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                defaultValue={userInfoObj.user.email}
              />
            </div>
          </div>
        </div>
        <div className="row" style={{ margin: '0px 0px' }}>
          <label className="col-sm-2 label-on-left">Vai trò</label>
          <div className="col-sm-10">
            {Object.values(ROLES).map(role => {
              return (
                <div
                  className="checkbox checkbox-inline"
                  style={{ marginRight: '10px' }}
                  key={role}
                >
                  <label>
                    <input type="checkbox" name={role} className="role-inputs" />
                    {role.toUpperCase()}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
        <div
          className="row"
          style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px 0px' }}
        >
          <button type="submit" className="btn btn-primary">
            Cập nhật
          </button>
        </div>
      </form>
      {/* )} */}
    </div>
  )
}

export default InfoTab
