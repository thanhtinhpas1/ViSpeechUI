/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import * as moment from 'moment'
import { CUSTOMER_PATH } from 'utils/constant'
import ReactTable from 'components/customer/ReactTable/ReactTable.component'

const ProjectDetailsPage = ({
  currentUser,
  getProjectInfoObj,
  getProjectTokenListObj,
  getProjectInfo,
  getProjectTokens,
}) => {
  const { id } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    getProjectInfo(id)
  }, [id, getProjectInfo])

  const columns = [
    {
      Header: 'Token',
      accessor: 'value',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return (
          <span className="lead tnx-id">
            <div className="copy-wrap w-100">
              <span className="copy-feedback" />
              <em className="fas fa-key" />
              <input type="text" className="copy-address" defaultValue={cell.value} disabled />
              <button className="copy-trigger copy-clipboard" data-clipboard-text={cell.value}>
                <em className="ti ti-files" />
              </button>
            </div>
          </span>
        )
      },
    },
    {
      Header: 'Loại token',
      accessor: 'tokenType',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return <div className="d-flex align-items-center">{cell.value}</div>
      },
    },
    {
      Header: 'Trạng thái',
      accessor: 'isValid',
      headerClassName: 'data-col dt-token',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return (
          <div className="d-flex align-items-center">
            <div
              className={`data-state ${cell.value ? 'data-state-approved' : 'data-state-canceled'}`}
            />
            <span className="sub sub-s2" style={{ paddingTop: '0' }}>
              {cell.value ? 'Hợp lệ' : 'Có vấn đề'}
            </span>
          </div>
        )
      },
    },
    {
      Header: 'Thời gian còn lại',
      accessor: 'minutesLeft',
      headerClassName: 'data-col dt-amount',
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      className: 'data-col dt-account',
      Cell: props => {
        const { cell } = props
        return <span className="lead">{cell.value} phút</span>
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
          <Link
            to={`${CUSTOMER_PATH}/transaction-details?tokenId=${cell.value}`}
            className="btn btn-light-alt btn-xs btn-icon"
          >
            <em className="ti ti-eye" />
          </Link>
        )
      },
    },
  ]

  const getProjectTokensList = useCallback(
    ({ pageIndex, pageSize }) => {
      const projectOwnerId = getProjectInfoObj.project.userId
      if (pathname.includes('accepted-project') && projectOwnerId) {
        getProjectTokens({ userId: projectOwnerId, projectId: id, pageIndex, pageSize })
      }
      if (pathname.includes('my-project')) {
        getProjectTokens({ userId: currentUser._id, projectId: id, pageIndex, pageSize })
      }
    },
    [currentUser._id, id, pathname, getProjectInfoObj.project.userId, getProjectTokens]
  )

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head d-flex justify-content-between align-items-center">
              {getProjectInfoObj.project && (
                <>
                  <h4 className="card-title mb-0">{getProjectInfoObj.project.name}</h4>
                  {currentUser && getProjectInfoObj.project.userId === currentUser._id && (
                    <>
                      <Link
                        to={`${CUSTOMER_PATH}/assign-permission?projectName=${getProjectInfoObj.project.name}`}
                        className="btn btn-sm btn-auto btn-primary d-sm-block d-none"
                      >
                        Mời tham gia
                        <em className="fas fa-user-plus ml-3" />
                      </Link>
                      <Link
                        to={`${CUSTOMER_PATH}/assign-permission?projectName=${getProjectInfoObj.project.name}`}
                        className="btn btn-icon btn-sm btn-primary d-sm-none"
                      >
                        <em className="fas fa-user-plus" />
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="gaps-2x" />
            <div className="data-details d-md-flex">
              <div className="fake-class">
                <span className="data-details-title">Tên dự án</span>
                <span className="data-details-info">
                  <strong>{getProjectInfoObj.project.name}</strong>
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Mô tả</span>
                <span className="data-details-info">
                  <strong>{getProjectInfoObj.project.description}</strong>
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thời gian tạo</span>
                <span className="data-details-info">
                  {moment(getProjectInfoObj.project.createdDate).format('DD/MM/YYYY hh:mm:ss')}
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thời gian cập nhật</span>
                <span className="data-details-info">
                  {moment(getProjectInfoObj.project.updatedDate).format('DD/MM/YYYY hh:mm:ss')}
                </span>
              </div>
            </div>
            <div className="gaps-5x" />
            {currentUser._id && (
              <ReactTable
                columns={columns}
                data={getProjectTokenListObj.projectTokenList.data}
                fetchData={getProjectTokensList}
                loading={getProjectTokenListObj.isLoading}
                pageCount={Math.ceil(getProjectTokenListObj.projectTokenList.count / 5)}
                defaultPageSize={5}
                pageSize={5}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage
