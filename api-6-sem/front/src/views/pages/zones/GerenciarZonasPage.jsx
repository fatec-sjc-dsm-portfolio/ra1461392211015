import React, { useEffect, useState } from 'react'
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
  CFormSelect,
  CFormLabel,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilAppsSettings,
  cilClock,
  cilLockLocked,
  cilLockUnlocked,
  cilMagnifyingGlass,
  cilPencil,
  cilRoom,
  cilTrash,
  cilUser,
} from '@coreui/icons'
import zonesServices from '../../../services/zonesService'
import companiesServices from '../../../services/empresasService'
import { toast } from 'react-toastify'
import Estela from '../estela/Estela'

const PageZonesManagement = () => {
  const [zones, setZones] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [doors, setDoors] = useState([])

  const [modalAddVisible, setModalAddVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)
  const [modalDoorVisible, setModalDoorVisible] = useState(false)

  const [selectedZone, setSelectedZone] = useState(null)
  const [isProtected, setIsProtected] = useState(true)

  const [addZone, setAddZone] = useState(null)
  const [addZoneDoor, setAddZoneDoor] = useState(null)
  const [editZone, setEditZone] = useState(null)

  const findZones = async () => {
    try {
      const { data } = await zonesServices.getAllZones()
      setZones(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getAllEmpresas = async () => {
    try {
      const { data } = await companiesServices.getAllCompanies()
      console.log(data)
      setEmpresas(data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteZone = async (id) => {
    try {
      await zonesServices.deleteZone(id)
      findZones()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteDoor = async (id) => {
    try {
      await zonesServices.deleteZoneDoor(id)
      findDoorsOfZone()
    } catch (error) {
      console.error(error)
    }
  }

  const findDoorsOfZone = async () => {
    try {
      if (!selectedZone) return
      const { data } = await zonesServices.getAllDoorsOfZone(selectedZone.id_empresa_comodo)
      setDoors(data)
    } catch (error) {
      console.error(error)
    }
  }

  // const doorManager = async (id) => {
  //   try {
  //     await zonesServices.deleteZone(id)
  //     findZones()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  useEffect(() => {
    findDoorsOfZone()
  }, [selectedZone])

  useEffect(() => {
    findZones()
    getAllEmpresas()
  }, [])
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-start">
      <CContainer>
        <CRow className="justify-content-between align-items-center">
          <CCol md={12}>
            <div className="d-flex flex-row justify-content-between p-3">
              <h6 className="float-start display-6 me-6">Áreas</h6>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <button
                  color="primary"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setModalAddVisible(true)
                  }}
                >
                  Adicionar Áreas
                </button>
              </div>
            </div>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tamanho</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tipo Acesso</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Empresa</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {zones &&
                  zones.map((zone) => {
                    const empresaEncontrada = empresas.find(
                      (empresa) => empresa.id_empresa === zone.id_empresa,
                    )

                    return (
                      <CTableRow key={zone.id_empresa_comodo}>
                        <CTableHeaderCell scope="row">{zone.id_empresa_comodo}</CTableHeaderCell>
                        <CTableDataCell>{zone.nome_comodo}</CTableDataCell>
                        <CTableDataCell>{zone.tamanho_comodo}</CTableDataCell>
                        <CTableDataCell>{zone.tipo_acesso}</CTableDataCell>
                        <CTableDataCell>
                          {empresaEncontrada
                            ? empresaEncontrada.nome_empresa
                            : 'Nome não encontrado'}
                        </CTableDataCell>
                        <CTableDataCell className="d-flex flex-row justify-content-center">
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => {
                              setEditZone(zone)
                              setModalEditVisible(true)
                            }}
                          >
                            <CIcon icon={cilPencil} />
                          </button>
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => {
                              deleteZone(zone.id_empresa_comodo)
                            }}
                          >
                            <CIcon icon={cilTrash} />
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setSelectedZone(zone)
                              setModalDoorVisible(true)
                            }}
                          >
                            <CIcon icon={cilRoom} />
                          </button>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
      </CContainer>
      <CModal
        size="xl"
        visible={modalAddVisible}
        onClose={() => {}}
        aria-labelledby="AdicionarComodo"
      >
        <CModalHeader>
          <CModalTitle id="AdicionarComodo">Adicionar Area</CModalTitle>
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
                  value={addZone?.nome_comodo}
                  onChange={(e) => {
                    setAddZone({ ...addZone, nome_comodo: e.target.value })
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
                  type="number"
                  placeholder="Tamanho"
                  value={addZone?.tamanho_comodo || ''}
                  onChange={(e) => {
                    setAddZone({ ...addZone, tamanho_comodo: Number(e.target.value) })
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
                  placeholder="Tipo de Acesso"
                  value={addZone?.tipo_acesso}
                  onChange={(e) => {
                    setAddZone({ ...addZone, tipo_acesso: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol>
              <CFormSelect
                aria-label="Default select example"
                value={addZone?.empresaSelecionada}
                onChange={(e) => {
                  setAddZone({ ...addZone, empresaSelecionada: e.target.value })
                }}
              >
                <option value="">Selecione a Empresa</option>
                {empresas?.length > 0 ? (
                  empresas.map((empresa, index) => (
                    <option value={empresa.id_empresa} key={index}>
                      {empresa.nome_empresa}
                    </option>
                  ))
                ) : (
                  <option disabled>Nenhuma empresa disponível</option>
                )}
              </CFormSelect>
            </CCol>
            {/* <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput type="text" placeholder="Empresa" />
              </CInputGroup>
            </CCol> */}
          </CRow>
          <CRow>
            <CCol md={12} className="d-flex flex-row justify-content-end">
              <CButton
                color="primary"
                onClick={async () => {
                  try {
                    const create = await zonesServices.createZone({
                      ...addZone,
                      id_empresa: addZone.empresaSelecionada,
                    })
                    console.log(create)
                    findZones()
                    setModalAddVisible(false)
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
      <CModal size="xl" visible={modalEditVisible} onClose={() => {}} aria-labelledby="EditComodo">
        <CModalHeader>
          <CModalTitle id="EditComodo">Editar Area</CModalTitle>
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
                  value={editZone?.nome_comodo}
                  onChange={(e) => {
                    setEditZone({ ...editZone, nome_comodo: e.target.value })
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
                  placeholder="Tamanho"
                  value={editZone?.tamanho_comodo}
                  onChange={(e) => {
                    setEditZone({ ...editZone, tamanho_comodo: e.target.value })
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
                  placeholder="Tipo de Acesso"
                  value={editZone?.tipo_acesso}
                  onChange={(e) => {
                    setEditZone({ ...editZone, tipo_acesso: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="d-flex flex-row justify-content-end">
              <CButton
                color="primary"
                onClick={async () => {
                  try {
                    const update = await zonesServices.updateZone(editZone)
                    console.log(update)
                    findZones()
                    setModalEditVisible(false)
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

      <CModal
        size="xl"
        visible={modalDoorVisible}
        onClose={() => {
          setModalDoorVisible(false)
          setSelectedZone(null)
        }}
        aria-labelledby="gerenciarPortas"
      >
        <CModalHeader>
          <CModalTitle id="gerenciarPortas">Adicionar Porta</CModalTitle>
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
                  placeholder="Descrição da Porta"
                  value={addZoneDoor?.descricao_porta ?? ''}
                  onChange={(e) => {
                    setAddZoneDoor({ ...addZoneDoor, descricao_porta: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  type="number"
                  placeholder="Tempo de Abertura"
                  value={addZoneDoor?.tempo ?? ''}
                  onChange={(e) => {
                    setAddZoneDoor({ ...addZoneDoor, tempo: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText className="d-flex flex-row justify-content-start align-items-center w-100">
                  <CIcon icon={cilLockLocked} />
                  <CFormLabel htmlFor="inlineRadio2" className="m-0 ms-3">
                    Tipo de Porta:
                  </CFormLabel>
                  <CFormCheck
                    className="ms-3"
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox2"
                    value={true}
                    label="Porta Não Protegida"
                    checked={isProtected === true}
                    onChange={() => {
                      setIsProtected(true)
                      setAddZoneDoor({ ...addZoneDoor, door_password: null })
                    }} // Changed from onClick to onChange
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox3"
                    value={false}
                    label="Porta Protegida"
                    checked={isProtected === false}
                    onChange={() => setIsProtected(false)} // Changed from onClick to onChange
                  />
                </CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLockUnlocked} />
                </CInputGroupText>
                <CFormInput
                  type="number"
                  placeholder="Senha da Porta"
                  value={addZoneDoor?.door_password ?? ''}
                  onChange={(e) => {
                    setAddZoneDoor({ ...addZoneDoor, door_password: e.target.value })
                  }}
                  disabled={isProtected}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="d-flex flex-row justify-content-end">
              <CButton
                color="primary"
                onClick={async () => {
                  try {
                    var dados = {
                      id_empresa_comodos: selectedZone.id_empresa_comodo,
                      descricao_porta: addZoneDoor.descricao_porta,
                      tempo: parseInt(addZoneDoor.tempo),
                    }
                    if (addZoneDoor.door_password) {
                      dados.senha_porta = addZoneDoor.door_password
                    }
                    try {
                      const create = await zonesServices.createZoneDoor(dados)
                      if (create.status === 200 || create.status === 201) {
                        setAddZoneDoor(null)
                      }
                      findDoorsOfZone()
                    } catch (error) {
                      console.error(error)
                      toast.error('Erro ao adicionar porta')
                    }
                    // setModalDoorVisible(false)
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                Adicionar
              </CButton>
            </CCol>
          </CRow>
          {/* listagem de portas desse comodo com botão de editar e de excluir */}
          <CRow className="mt-4">
            <CCol md={12}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tempo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Senha</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Actions
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {doors &&
                    doors.map((door, index) => (
                      <CTableRow key={door.id_comodo_portas}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{door.descricao_porta}</CTableDataCell>
                        <CTableDataCell>{door.tempo}</CTableDataCell>
                        <CTableDataCell>{door.senha_porta}</CTableDataCell>
                        <CTableDataCell className="d-flex flex-row justify-content-center">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={async () => {
                              await deleteDoor(door.id_comodo_portas)
                            }}
                          >
                            <CIcon icon={cilTrash} />
                          </button>
                        </CTableDataCell>
                      </CTableRow>
                    ))}

                  {!doors.length && (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center">
                        Nenhuma porta encontrada
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
      <Estela />
    </div>
  )
}

export default PageZonesManagement
