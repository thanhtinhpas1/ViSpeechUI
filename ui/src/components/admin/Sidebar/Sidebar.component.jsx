/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { JWT_TOKEN, ADMIN_PATH } from 'utils/constant'
import STORAGE from 'utils/storage'

const Sidebar = ({ currentUser, onAuthenticate }) => {
  const location = useLocation()

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    if ((!currentUser && token) || !token) onAuthenticate(token)
  }, [currentUser, onAuthenticate])

  return (
    <div className="sidebar">
      <div className="logo">
        <a href={`${ADMIN_PATH}`} className="simple-text">
          ViSpeech Admin
        </a>
      </div>
      <div className="logo logo-mini">
        <a href={`${ADMIN_PATH}`} className="simple-text">
          T
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className={`${location.pathname === ADMIN_PATH ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}`}>
              <i className="material-icons">dashboard</i>
              <p>Trang chủ</p>
            </a>
          </li>
          <li
            className={`${
              location.pathname === `${ADMIN_PATH}/users` ||
              location.pathname === `${ADMIN_PATH}/create-user`
                ? 'active'
                : ''
            } `}
          >
            <a data-toggle="collapse" href="#layouts" className="collapsed" aria-expanded="false">
              <i className="zmdi zmdi-accounts" />
              <p>
                Khách hàng
                <b className="caret" />
              </p>
            </a>
            <div className="collapse" id="layouts" aria-expanded="false" style={{ height: '0px' }}>
              <ul className="nav">
                <li>
                  <a href={`${ADMIN_PATH}/users`}>Danh sách</a>
                </li>
                <li>
                  <a href={`${ADMIN_PATH}/create-user`}>Thêm mới</a>
                </li>
              </ul>
            </div>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/reports` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/reports`}>
              <i className="material-icons">equalizer</i>
              <p>Thống kê</p>
            </a>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/histories` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/histories`}>
              <i className="material-icons">library_books</i>
              <p>Lịch sử sử dụng dịch vụ</p>
            </a>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/tasks` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/tasks`}>
              <i className="material-icons">schedule</i>
              <p>Danh sách thực thi</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
