import React, { useEffect } from 'react'
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
import {
  cilAddressBook,
  cilCalendar,
  cilClock,
  cilHouse,
  cilMagnifyingGlass,
  cilMap,
  cilPen,
  cilPencil,
  cilPhone,
  cilUser,
  cilTrash,
} from '@coreui/icons'
import acessosServices from '../../../services/acessosService'
import companiesServices from '../../../services/empresasService'

import Estela from '../estela/Estela'

const PageCompaniesManagement = () => {
  const [empresas, setEmpresas] = React.useState([])
  const [addEmpresa, setAddEmpresa] = React.useState(null)
  const [editEmpresa, setEditEmpresa] = React.useState(null)
  const [modalAddVisible, setModalAddVisible] = React.useState(false)
  const [modalEditVisible, setModalEditVisible] = React.useState(false)

  const getAllEmpresas = async () => {
    try {
      const { data } = await companiesServices.getAllCompanies()
      console.log(data)
      setEmpresas(data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCompanie = async (id) => {
    try {
      await companiesServices.deleteCompanie(id)
      getAllEmpresas()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllEmpresas()
  }, [])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-start">
      <CContainer>
        <CRow className="justify-content-between align-items-center">
          <CCol md={12}>
            <div className="d-flex flex-row justify-content-between p-3">
              <h6 className="float-start display-6 me-6">Empresas</h6>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <button
                  color="primary"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setModalAddVisible(true)
                  }}
                >
                  Adicionar Empresa
                </button>
              </div>
            </div>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Telefone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cidade</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Bairro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Logradouro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Numero</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Horario de Funcionamento</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {empresas &&
                  empresas.map((empresa) => (
                    <CTableRow key={empresa.id_empresa}>
                      <CTableHeaderCell scope="row">{empresa.id_empresa}</CTableHeaderCell>
                      <CTableDataCell>{empresa.nome_empresa}</CTableDataCell>
                      <CTableDataCell>{empresa.telefone_empresa}</CTableDataCell>
                      <CTableDataCell>{empresa.cidade_empresa}</CTableDataCell>
                      <CTableDataCell>{empresa.bairro_empresa}</CTableDataCell>
                      <CTableDataCell>{empresa.logradouro_empresa}</CTableDataCell>
                      <CTableDataCell>{empresa.numero_empresa}</CTableDataCell>
                      <CTableDataCell>
                        {empresa.horario_funcionamento_de} até {empresa.horario_funcionamento_de}
                      </CTableDataCell>
                      <CTableDataCell className="d-flex flex-row justify-content-around">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            setEditEmpresa(empresa)
                            setModalEditVisible(true)
                          }}
                        >
                          <CIcon icon={cilPencil} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            deleteCompanie(empresa.id_empresa)
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
      <CModal size="xl" visible={modalAddVisible} onClose={() => {}} aria-labelledby="AddEmpresa">
        <CModalHeader>
          <CModalTitle id="AddEmpresa">Adicionar Empresa</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilHouse} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Nome"
                  value={addEmpresa?.nome_empresa}
                  onChange={(e) => setAddEmpresa({ ...addEmpresa, nome_empresa: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilPhone} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Telefone"
                  value={addEmpresa?.telefone_empresa}
                  onChange={(e) =>
                    setAddEmpresa({ ...addEmpresa, telefone_empresa: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Cidade"
                  value={addEmpresa?.cidade_empresa}
                  onChange={(e) => setAddEmpresa({ ...addEmpresa, cidade_empresa: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Bairro"
                  value={addEmpresa?.bairro_empresa}
                  onChange={(e) => setAddEmpresa({ ...addEmpresa, bairro_empresa: e.target.value })}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Logradouro"
                  value={addEmpresa?.logradouro_empresa}
                  onChange={(e) =>
                    setAddEmpresa({ ...addEmpresa, logradouro_empresa: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Numero"
                  value={addEmpresa?.numero_empresa}
                  onChange={(e) => setAddEmpresa({ ...addEmpresa, numero_empresa: e.target.value })}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Horario de Funcionamento de"
                  value={addEmpresa?.horario_funcionamento_de}
                  onChange={(e) =>
                    setAddEmpresa({ ...addEmpresa, horario_funcionamento_de: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Horario de Funcionamento ate"
                  value={addEmpresa?.horario_funcionamento_ate}
                  onChange={(e) =>
                    setAddEmpresa({ ...addEmpresa, horario_funcionamento_ate: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol className="d-flex flex-row justify-content-end">
              <CButton
                color="primary"
                onClick={async () => {
                  try {
                    await companiesServices.createCompanie(addEmpresa)
                    setModalAddVisible(false)
                    getAllEmpresas()
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                Adicionar
              </CButton>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
      <CModal size="xl" visible={modalEditVisible} onClose={() => {}} aria-labelledby="EditEmpresa">
        <CModalHeader>
          <CModalTitle id="EditEmpresa">Editar Empresa</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilHouse} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Nome"
                  value={editEmpresa?.nome_empresa}
                  onChange={(e) => setEditEmpresa({ ...editEmpresa, nome_empresa: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilPhone} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Telefone"
                  value={editEmpresa?.telefone_empresa}
                  onChange={(e) =>
                    setEditEmpresa({ ...editEmpresa, telefone_empresa: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Cidade"
                  value={editEmpresa?.cidade_empresa}
                  onChange={(e) =>
                    setEditEmpresa({ ...editEmpresa, cidade_empresa: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Bairro"
                  value={editEmpresa?.bairro_empresa}
                  onChange={(e) =>
                    setEditEmpresa({ ...editEmpresa, bairro_empresa: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Logradouro"
                  value={editEmpresa?.logradouro_empresa}
                  onChange={(e) =>
                    setEditEmpresa({ ...editEmpresa, logradouro_empresa: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Numero"
                  value={editEmpresa?.numero_empresa}
                  onChange={(e) =>
                    setEditEmpresa({ ...editEmpresa, numero_empresa: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Horario de Funcionamento de"
                  value={editEmpresa?.horario_funcionamento_de}
                  onChange={(e) =>
                    setEditEmpresa({ ...editEmpresa, horario_funcionamento_de: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Horario de Funcionamento ate"
                  value={editEmpresa?.horario_funcionamento_ate}
                  onChange={(e) =>
                    setEditEmpresa({ ...editEmpresa, horario_funcionamento_ate: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol className="d-flex flex-row justify-content-end">
              <CButton
                color="primary"
                onClick={async () => {
                  try {
                    await companiesServices.updateCompanie(editEmpresa)
                    setModalEditVisible(false)
                    getAllEmpresas()
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                Editar
              </CButton>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
      <Estela />
    </div>
  )
}

export default PageCompaniesManagement
