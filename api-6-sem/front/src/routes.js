import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PageAcessManagement = React.lazy(() => import('./views/pages/access/GerenciarAcessosPage'))
const PageUsersManagement = React.lazy(() => import('./views/pages/users/GerenciarUsuariosPage'))
const PageZonesManagement = React.lazy(() => import('./views/pages/zones/GerenciarZonasPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {
    path: '/access/manage',
    name: 'Gerenciar Acessos',
    element: PageAcessManagement,
  },
  {
    path: '/users/manage',
    name: 'Gerenciar Usuários',
    element: PageUsersManagement,
  },
  { path: '/zones/manage', name: 'Gerenciar Zonas', element: PageZonesManagement },
]

export default routes
