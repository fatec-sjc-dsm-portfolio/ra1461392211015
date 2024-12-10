import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const PageAcessManagement = React.lazy(() => import('../views/pages/access/GerenciarAcessosPage'))
const PageUsersManagement = React.lazy(() => import('../views/pages/users/GerenciarUsuariosPage'))
const PageZonesManagement = React.lazy(() => import('../views/pages/zones/GerenciarZonasPage'))
const PageCompaniesManagement = React.lazy(
  () => import('../views/pages/companies/GerenciarEmpresasPage'),
)

// routes config
import { useAuth } from '../contexts/authContexts'

const AppContent = () => {
  const { user } = useAuth()

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/dashboard" exact name="Home" element={<Dashboard />} />

          {user?.id_nivel_acesso === 1 ? (
            <>
              <Route
                path="/access/manage"
                exact={true}
                name="Gerenciar Acessos"
                element={<PageAcessManagement />}
              />
              <Route
                path="/users/manage"
                exact={true}
                name="Gerenciar Usuarios"
                element={<PageUsersManagement />}
              />
              <Route
                path="/zones/manage"
                exact={true}
                name="Gerenciar Areas"
                element={<PageZonesManagement />}
              />
              <Route
                path="/companies/manage"
                exact={true}
                name="Gerenciar Empresas"
                element={<PageCompaniesManagement />}
              />
            </>
          ) : user?.id_nivel_acesso === 2 ? (
            <>
              <Route
                path="/access/manage"
                exact={true}
                name="Gerenciar Acessos"
                element={<PageAcessManagement />}
              />
            </>
          ) : null}

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
