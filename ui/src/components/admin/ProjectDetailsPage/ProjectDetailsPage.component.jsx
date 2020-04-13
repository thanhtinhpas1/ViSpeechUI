/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as moment from 'moment'
import ReactTable from 'components/customer/ReactTable/ReactTable.component'
import { ADMIN_PATH } from '../../../utils/constant'

const ProjectDetailsPage = ({
  getProjectInfoObj,
  getProjectTokenListObj,
  updateInfoObj,
  getProjectInfo,
  getProjectTokens,
  updateProjectInfo,
}) => {
  const { id } = useParams()

  useEffect(() => {
    getProjectInfo(id)
  }, [id, getProjectInfo])

  useEffect(() => {
    if (updateInfoObj.isLoading === false && updateInfoObj.isSuccess === true) {
      getProjectInfo(id)
    }
  }, [updateInfoObj, id, getProjectInfo])

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
      className: 'data-col dt-amount',
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
          <a
            href={`${ADMIN_PATH}/transaction-details?tokenId=${cell.value}`}
            className="btn btn-just-icon btn-secondary btn-simple"
          >
            <i className="zmdi zmdi-eye" />
          </a>
        )
      },
    },
  ]

  const getProjectTokensList = useCallback(
    ({ pageIndex, pageSize }) => {
      const projectOwnerId = getProjectInfoObj.project.userId
      if (projectOwnerId) {
        getProjectTokens({ userId: projectOwnerId, projectId: id, pageIndex, pageSize })
      }
    },
    [id, getProjectInfoObj.project.userId, getProjectTokens]
  )

  const onSubmit = event => {
    event.preventDefault()
    const projectId = getProjectInfoObj.project._id
    if (!projectId) {
      return
    }

    const form = event.target
    const data = {
      name: form.elements.name.value,
      description: form.elements.description.value,
    }
    updateProjectInfo(projectId, data)
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{getProjectInfoObj.project.name}</h4>
          </div>
          <div className="card-content">
            <form onSubmit={onSubmit}>
              <div className="data-details" style={{ flexDirection: 'column' }}>
                <div className="row d-md-flex" style={{ margin: '0px 0px' }}>
                  <div className="fake-class" style={{ paddingRight: '10px' }}>
                    <span className="data-details-title">Tên dự án</span>
                    <span className="data-details-info">
                      <div
                        className="form-group label-floating is-empty"
                        style={{ padding: '0px', margin: '0px' }}
                      >
                        <label className="control-label" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tên dự án"
                          name="name"
                          defaultValue={getProjectInfoObj.project.name}
                        />
                      </div>
                    </span>
                  </div>
                  <div className="fake-class" style={{ paddingRight: '10px' }}>
                    <span className="data-details-title">Mô tả</span>
                    <span className="data-details-info">
                      <div
                        className="form-group label-floating is-empty"
                        style={{ padding: '0px', margin: '0px' }}
                      >
                        <label className="control-label" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mô tả"
                          name="description"
                          defaultValue={getProjectInfoObj.project.description}
                        />
                      </div>
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

                <div
                  className="row"
                  style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px 0px' }}
                >
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                </div>
              </div>
            </form>
            <div className="gaps-5x" />
            <div className="material-datatables">
              <ReactTable
                columns={columns}
                data={getProjectTokenListObj.projectTokenList.data}
                fetchData={getProjectTokensList}
                loading={getProjectTokenListObj.isLoading}
                pageCount={Math.ceil(getProjectTokenListObj.projectTokenList.count / 5)}
                defaultPageSize={5}
                pageSize={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage
