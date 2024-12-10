import React from 'react'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useAuth } from '../../contexts/authContexts'
import whatscode from '../../assets/whatscode.png'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={whatscode} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={handleLogout} className="mt-2">
          <CIcon icon={cilLockLocked} className="me-2" />
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
