import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div className="d-flex flex-row justify-content-end w-100">
        <a href="https://github.com/WhatsCode-24" target="_blank" rel="noopener noreferrer">
          WhatsCode
        </a>
        <span className="ms-1">&copy; 2024 todos os direitos reservados.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
