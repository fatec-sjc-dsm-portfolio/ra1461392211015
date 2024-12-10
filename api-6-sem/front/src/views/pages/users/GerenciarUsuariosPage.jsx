import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass, cilPencil, cilTrash, cilUser } from '@coreui/icons'
import { Button } from '@coreui/coreui'
import userServices from '../../../services/userServices'
import { toast } from 'react-toastify'

import Estela from '../estela/Estela'

const PageUsersManagement = () => {
  const [users, setUsers] = React.useState([])
  const [userEdit, setUserEdit] = React.useState(null)
  const [userAdd, setUserAdd] = React.useState(null)

  const [modalEditVisible, setModalEditVisible] = React.useState(false)
  const [modalAddVisible, setModalAddVisible] = React.useState(false)

  const getAllUsers = async () => {
    try {
      // Chamar a API para buscar todos os usuários
      const { data } = await userServices.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  const editUser = async (user) => {
    setUserEdit(user)
    setModalEditVisible(true)
  }

  const trashUser = async (user) => {
    try {
      const { data } = await userServices.deleteUser(user.id_usuario)
      toast.success('Usuário deletado com sucesso!')
      await getAllUsers()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-start">
      <CContainer>
        <CRow className="justify-content-between align-items-center">
          <CCol md={12}>
            <div className="d-flex flex-row justify-content-between p-3">
              <h6 className="float-start display-6 me-6">Usuários</h6>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <button
                  color="primary"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setModalAddVisible(true)
                  }}
                >
                  Adicionar Usuario
                </button>
              </div>
            </div>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CPF</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Telefone</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users &&
                  users.map((user) => (
                    <CTableRow key={user.id_usuario}>
                      <CTableHeaderCell scope="row">{user.id_usuario}</CTableHeaderCell>
                      <CTableDataCell>{user.nome_usuario}</CTableDataCell>
                      <CTableDataCell>{user.cpf_usuario}</CTableDataCell>
                      <CTableDataCell>{user.email_usuario}</CTableDataCell>
                      <CTableDataCell>{user.telefone_usuario}</CTableDataCell>
                      <CTableDataCell className="d-flex flex-row justify-content-around">
                        <button className="btn btn-sm btn-primary" onClick={() => editUser(user)}>
                          <CIcon icon={cilPencil} />
                        </button>
                        {/* <button className="btn btn-sm btn-success">
                          <CIcon icon={} />
                        </button> */}
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            trashUser(user)
                          }}
                        >
                          <CIcon icon={cilTrash} />
                        </button>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
      </CContainer>
      <CModal
        size="xl"
        visible={modalEditVisible}
        onClose={() => {}}
        aria-labelledby="AdicionarUsuario"
      >
        <CModalHeader>
          <CModalTitle id="EditUserModal">Editar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Nome"
                  value={userEdit?.nome_usuario}
                  onChange={(e) => {
                    setUserEdit({ ...userEdit, nome_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="CPF"
                  value={userEdit?.cpf_usuario}
                  onChange={(e) => {
                    setUserEdit({ ...userEdit, cpf_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Email"
                  value={userEdit?.email_usuario}
                  onChange={(e) => {
                    setUserEdit({ ...userEdit, email_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Telefone"
                  value={userEdit?.telefone_usuario}
                  onChange={(e) => {
                    setUserEdit({ ...userEdit, telefone_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="d-flex flex-row justify-content-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={async () => {
                  try {
                    const { data } = await userServices.updateUser(userEdit.id_usuario, userEdit)
                    toast.success('Usuário atualizado com sucesso!')
                    setModalEditVisible(false)
                    await getAllUsers()
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                Salvar
              </button>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
      <CModal
        size="xl"
        visible={modalAddVisible}
        onClose={() => {}}
        aria-labelledby="AdicionarUsuario"
      >
        <CModalHeader>
          <CModalTitle id="AdicionarUsuario">Adicionar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Nome"
                  value={userAdd?.nome_usuario}
                  onChange={(e) => {
                    setUserAdd({ ...userAdd, nome_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="CPF"
                  value={userAdd?.cpf_usuario}
                  onChange={(e) => {
                    setUserAdd({ ...userAdd, cpf_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Email"
                  value={userAdd?.email_usuario}
                  onChange={(e) => {
                    setUserAdd({ ...userAdd, email_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Telefone"
                  value={userAdd?.telefone_usuario}
                  onChange={(e) => {
                    setUserAdd({ ...userAdd, telefone_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          {/* senha */}
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Senha"
                  value={userAdd?.password_usuario}
                  onChange={(e) => {
                    setUserAdd({ ...userAdd, password_usuario: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Confirme a senha"
                  value={userAdd?.confirmacao_senha}
                  onChange={(e) => {
                    setUserAdd({ ...userAdd, confirmacao_senha: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="d-flex flex-row justify-content-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={async () => {
                  try {
                    if (userAdd.password_usuario !== userAdd.confirmacao_senha) {
                      toast.error('Senhas não conferem!')
                      return
                    }
                    userAdd.id_nivel_acesso = 1
                    const result = await userServices.createUser(userAdd)
                    if (result.status !== 201) {
                      toast.error('Erro ao criar usuário!')
                      return
                    }
                    toast.success('Usuário criado com sucesso!')
                    setModalAddVisible(false)
                    await getAllUsers()
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                Salvar
              </button>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
      <Estela />
    </div>
  )
}

export default PageUsersManagement
