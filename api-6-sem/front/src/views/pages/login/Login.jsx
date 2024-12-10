import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import authServices from '../../../services/authService'
import { toast } from 'react-toastify'
import { useAuth } from '../../../contexts/authContexts'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    const result = await authServices.login({ email, password })
    if (result.status === 401) {
      toast.error('Usuário ou senha inválidos')
    }
    if (result.status === 200) {
      login(result, navigate)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">
                      Entrar no sistema de monitoramento WhatsCode
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Preencha com seu email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Preencha com sua senha"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow className="d-flex flex-row justify-content-end">
                      <CButton
                        color="primary"
                        className="px-4"
                        onClick={() => {
                          handleLogin()
                        }}
                      >
                        Login
                      </CButton>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
