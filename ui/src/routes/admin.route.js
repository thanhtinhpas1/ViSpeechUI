/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ADMIN_PATH } from 'utils/constant'
import AdminLayout from 'components/admin/AdminLayout'
import AdminHomePage from 'components/admin/HomePage/HomePage.container'
import AdminUserListPage from 'components/admin/UserListPage/UserListPage.container'
import AdminUserInfoPage from 'components/admin/UserInfoPage/UserInfoPage.container'
import AdminUserCreatePage from 'components/admin/UserCreatePage/UserCreatePage.container'
import AdminProjectDetailsPage from 'components/admin/ProjectDetailsPage/ProjectDetailsPage.container'
import AdminTransactionDetailsPage from 'components/admin/TransactionDetailsPage/TransactionDetailsPage.container'
import AdminHistoriesPage from 'components/admin/HistoriesPage/HistoriesPage.container'
import AdminTasksPage from 'components/admin/TasksPage/TasksPage.container'
import StatisticsPage from 'components/admin/StatisticsPage/StatisticsPage.component'

const RouteAdmin = ({ currentUser }) => {
  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      {currentUser ? (
        <>
          <Route exact path={ADMIN_PATH}>
            <AdminLayout>
              <AdminHomePage />
            </AdminLayout>
          </Route>
          <Route path={`${ADMIN_PATH}/users`}>
            <AdminLayout>
              <AdminUserListPage />
            </AdminLayout>
          </Route>
          <Route
            path={`${ADMIN_PATH}/user-info/:id`}
            render={() => (
              <AdminLayout>
                <AdminUserInfoPage />
              </AdminLayout>
            )}
          />
          <Route path={`${ADMIN_PATH}/create-user`}>
            <AdminLayout>
              <AdminUserCreatePage />
            </AdminLayout>
          </Route>
          <Route path={`${ADMIN_PATH}/reports`}>
            <AdminLayout>
              <StatisticsPage />
            </AdminLayout>
          </Route>
          <Route
            path={`${ADMIN_PATH}/transaction-details`}
            render={() => (
              <AdminLayout>
                <AdminTransactionDetailsPage />
              </AdminLayout>
            )}
          />
          <Route
            path={`${ADMIN_PATH}/user-project/:id`}
            render={props => (
              <AdminLayout>
                <AdminProjectDetailsPage {...props} />
              </AdminLayout>
            )}
          />
          <Route
            path={`${ADMIN_PATH}/user-accepted-project/:id`}
            render={props => (
              <AdminLayout>
                <AdminProjectDetailsPage {...props} />
              </AdminLayout>
            )}
          />
          <Route path={`${ADMIN_PATH}/histories`}>
            <AdminLayout>
              <AdminHistoriesPage />
            </AdminLayout>
          </Route>
          <Route path={`${ADMIN_PATH}/tasks`}>
            <AdminLayout>
              <AdminTasksPage />
            </AdminLayout>
          </Route>
        </>
      ) : (
        <>
          <Route exact path={ADMIN_PATH}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/users`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/user-info/:id`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/create-user`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/reports`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/user-project/:id`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/user-accepted-project/:id`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/histories`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/tasks`}>
            <Redirect to="/" />
          </Route>
        </>
      )}
    </Switch>
  )
}

export default RouteAdmin
