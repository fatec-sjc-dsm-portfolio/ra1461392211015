import React, { useEffect } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
  cilMagnifyingGlass,
  cilPen,
  cilPencil,
  cilUser,
  cilTrash,
  cilSignalCellular3,
  cilAvTimer,
  cilClock,
} from '@coreui/icons'
import acessosServices from '../../../services/acessosService'
import zonesServices from '../../../services/zonesService'
import comodoPortasServices from '../../../services/comodoPortasService'
import Estela from '../estela/Estela'

const PageAcessManagement = () => {
  const [acessos, setAcessos] = React.useState([])
  const [zones, setZones] = React.useState([])
  const [zoneDoors, setZoneDoors] = React.useState([])
  const [zoneDoorsEdit, setZoneDoorsEdit] = React.useState([])
  const [editAcesso, setEditAcesso] = React.useState(null)
  const [selectedZone, setSelectedZone] = React.useState(null)
  const [selectedZoneEdit, setSelectedZoneEdit] = React.useState(null)
  const [addAcesso, setAddAcesso] = React.useState(null)
  const [showAcesso, setShowAcesso] = React.useState(null)
  const [modalEditVisible, setModalEditVisible] = React.useState(false)
  const [modalAddVisible, setModalAddVisible] = React.useState(false)
  const [modalShowVisible, setModalShowVisible] = React.useState(false)

  const getAllAcessos = async () => {
    try {
      const { data } = await acessosServices.getAllAcess()
      setAcessos(data)
    } catch (error) {
      console.error(error)
    }
  }

  const findDoorsOfZone = async (id) => {
    try {
      const { data } = await zonesServices.getAllDoorsOfZone(id)
      setZoneDoors(data)
    } catch (error) {
      console.error(error)
    }
  }

  const findDoorsOfZoneEdit = async (id) => {
    try {
      const { data } = await zonesServices.getAllDoorsOfZone(id)
      setZoneDoorsEdit(data)
    } catch (error) {
      console.error(error)
    }
  }

  const findZones = async () => {
    try {
      const { data } = await zonesServices.getAllZones()
      setZones(data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteAcess = async (id) => {
    try {
      await acessosServices.deleteAcess(id)
      getAllAcessos()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (selectedZone) {
      findDoorsOfZone(selectedZone)
    }
  }, [selectedZone])

  useEffect(() => {
    if (selectedZoneEdit) {
      findDoorsOfZoneEdit(selectedZoneEdit)
    }
  }, [selectedZoneEdit])

  useEffect(() => {
    getAllAcessos()
    findZones()
  }, [])

  //   classificacao_acesso
  // :
  // "Critico"
  // horario_acesso
  // :
  // "2024-03-09 21:00:00"
  // id_acesso
  // :
  // 3
  // id_empresa_comodo
  // :
  // 1
  // nome_comodo
  // :
  // "Comodo 1"
  // observacao_acesso
  // :
  // "Acesso Fora de Horario"

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-start">
      <CContainer>
        <CRow className="justify-content-between align-items-center">
          <CCol md={12}>
            <div className="d-flex flex-row justify-content-between p-3">
              <h6 className="float-start display-6 me-6">Acessos</h6>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <button
                  color="primary"
                  className="btn btn-sm btn-primary"
                  onClick={() => setModalAddVisible(true)}
                >
                  Adicionar Acesso
                </button>
              </div>
            </div>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Classificação de Acesso</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Observação de Acesso</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Horario de Acesso</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Local</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Autorizado</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {acessos &&
                  acessos.map((acesso) => (
                    <CTableRow
                      key={acesso.id_acesso}
                      onClick={() => {
                        setShowAcesso(acesso)
                        setModalShowVisible(true)
                      }}
                    >
                      <CTableHeaderCell scope="row">{acesso.id_acesso}</CTableHeaderCell>
                      <CTableDataCell>{acesso.classificacao_acesso}</CTableDataCell>
                      <CTableDataCell>{acesso.observacao_acesso}</CTableDataCell>
                      <CTableDataCell>{acesso.horario_acesso}</CTableDataCell>
                      <CTableDataCell>{acesso.descricao_porta}</CTableDataCell>
                      <CTableDataCell>
                        {acesso.acesso_autorizado == 1 ? 'Sim' : 'Não'}
                      </CTableDataCell>
                      <CTableDataCell className="d-flex flex-row justify-content-around">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            e.stopPropagation()
                            setEditAcesso(acesso)
                            setModalEditVisible(true)
                          }}
                        >
                          <CIcon icon={cilPencil} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            deleteAcess(acesso.id_acesso)
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
        aria-labelledby="EditarAccesso"
      >
        <CModalHeader>
          <CModalTitle id="EditarAccesso">Editar Acesso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CInputGroup className="mb-3">
                <CInputGroupText className="d-flex flex-row justify-content-start align-items-center w-100">
                  <CIcon icon={cilSignalCellular3} />
                  <CFormLabel htmlFor="inlineRadio1" className="m-0 ms-3">
                    Classificação de Acesso:
                  </CFormLabel>
                  <CFormCheck
                    className="ms-3"
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox1"
                    value="Não Autorizado"
                    label="Não Autorizado"
                    onChange={(e) => {
                      setEditAcesso({
                        ...editAcesso,
                        classificacao_acesso: e.target.value,
                        acesso_autorizado: 0,
                      })
                    }}
                    checked={editAcesso?.acesso_autorizado == 0}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox2"
                    value="Autorizado"
                    label="Autorizado"
                    onChange={(e) => {
                      setEditAcesso({
                        ...editAcesso,
                        classificacao_acesso: e.target.value,
                        acesso_autorizado: 1,
                      })
                    }}
                    checked={editAcesso?.acesso_autorizado == 1}
                  />
                </CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMagnifyingGlass} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Observação do Acesso"
                  value={editAcesso?.observacao_acesso}
                  onChange={(e) =>
                    setEditAcesso({ ...editAcesso, observacao_acesso: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
          </CRow>
          {/* <CRow>
            <CCol>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Horario do Acesso"
                  value={editAcesso?.horario_acesso}
                  onChange={(e) => setEditAcesso({ ...editAcesso, horario_acesso: e.target.value })}
                />
              </CInputGroup>
            </CCol>
          </CRow> */}
          <CRow>
            <CCol>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  type="time"
                  placeholder="Horario do Acesso"
                  value={editAcesso?.horario_acesso}
                  onChange={(e) => setEditAcesso({ ...editAcesso, horario_acesso: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol>
              <CFormSelect
                aria-label="Default select example"
                value={editAcesso?.comodoSelecionado}
                onChange={(e) => {
                  setEditAcesso({ ...editAcesso, comodoSelecionado: e.target.value })
                  setSelectedZoneEdit(e.target.value)
                }}
              >
                <option value="">Selecione o Comodo</option>
                {zones?.length > 0 ? (
                  zones.map((zone, index) => (
                    <option value={zone.id_empresa_comodo} key={index}>
                      {zone.nome_comodo}
                    </option>
                  ))
                ) : (
                  <option disabled>Nenhuma empresa disponível</option>
                )}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormSelect
                aria-label="Default select example"
                value={editAcesso?.portaSelecionado}
                onChange={(e) => {
                  setEditAcesso({ ...editAcesso, portaSelecionado: e.target.value })
                }}
                className={`${selectedZone ? '' : 'd-none'}`}
              >
                <option value="">Selecione a porta</option>
                {zoneDoorsEdit?.length > 0 ? (
                  zoneDoorsEdit.map((zone, index) => (
                    <option value={zone.id_comodo_portas} key={index}>
                      {zone.descricao_porta}
                    </option>
                  ))
                ) : (
                  <option disabled>Nenhuma Porta disponível</option>
                )}
              </CFormSelect>
            </CCol>
          </CRow>
          {/* botão salvar */}
          <div className="d-flex flex-row justify-content-end">
            <CButton
              color="primary"
              onClick={async () => {
                try {
                  const update = await acessosServices.updateAcess(editAcesso)
                  console.log(update)
                  getAllAcessos()
                  setModalEditVisible(false)
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              Salvar
            </CButton>
          </div>
        </CModalBody>
      </CModal>

      <CModal
        size="xl"
        visible={modalAddVisible}
        onClose={() => {}}
        aria-labelledby="AdicionarAccesso"
      >
        <CModalHeader>
          <CModalTitle id="AdicionarAccesso">Adicionar Acesso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CInputGroup className="mb-3">
                <CInputGroupText className="d-flex flex-row justify-content-start align-items-center w-100">
                  <CIcon icon={cilSignalCellular3} />
                  <CFormLabel htmlFor="inlineRadio1" className="m-0 ms-3">
                    Classificação de Acesso:
                  </CFormLabel>
                  <CFormCheck
                    className="ms-3"
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox1"
                    value="Não Autorizado"
                    label="Não Autorizado"
                    onChange={(e) => {
                      setAddAcesso({
                        ...addAcesso,
                        classificacao_acesso: e.target.value,
                        acesso_autorizado: 0,
                      })
                    }}
                    checked={addAcesso?.acesso_autorizado == 0}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox2"
                    value="Autorizado"
                    label="Autorizado"
                    onChange={(e) => {
                      setAddAcesso({
                        ...addAcesso,
                        classificacao_acesso: e.target.value,
                        acesso_autorizado: 1,
                      })
                    }}
                    checked={addAcesso?.acesso_autorizado == 1}
                  />
                </CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMagnifyingGlass} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Observação do Acesso"
                  value={addAcesso?.observacao_acesso}
                  onChange={(e) =>
                    setAddAcesso({ ...addAcesso, observacao_acesso: e.target.value })
                  }
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  type="time"
                  placeholder="Horario do Acesso"
                  value={addAcesso?.horario_acesso}
                  onChange={(e) => setAddAcesso({ ...addAcesso, horario_acesso: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol>
              <CFormSelect
                aria-label="Default select example"
                value={addAcesso?.comodoSelecionado}
                onChange={(e) => {
                  setAddAcesso({ ...addAcesso, comodoSelecionado: e.target.value })
                  setSelectedZone(e.target.value)
                }}
              >
                <option value="">Selecione o Comodo</option>
                {zones?.length > 0 ? (
                  zones.map((zone, index) => (
                    <option value={zone.id_empresa_comodo} key={index}>
                      {zone.nome_comodo}
                    </option>
                  ))
                ) : (
                  <option disabled>Nenhuma empresa disponível</option>
                )}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormSelect
                aria-label="Default select example"
                value={addAcesso?.portaSelecionado}
                onChange={(e) => {
                  setAddAcesso({ ...addAcesso, portaSelecionado: e.target.value })
                }}
                className={`${selectedZone ? '' : 'd-none'}`}
              >
                <option value="">Selecione a porta</option>
                {zoneDoors?.length > 0 ? (
                  zoneDoors.map((zone, index) => (
                    <option value={zone.id_comodo_portas} key={index}>
                      {zone.descricao_porta}
                    </option>
                  ))
                ) : (
                  <option disabled>Nenhuma Porta disponível</option>
                )}
              </CFormSelect>
            </CCol>
          </CRow>
          {/* botão salvar */}
          <div className="d-flex flex-row justify-content-end mt-4">
            <CButton
              color="primary"
              onClick={async () => {
                try {
                  const create = await acessosServices.createAcess({
                    ...addAcesso,
                    id_empresa_comodo: addAcesso.comodoSelecionado,
                    id_comodo_portas: Number(addAcesso.portaSelecionado),
                  })
                  console.log(create)
                  getAllAcessos()
                  setModalAddVisible(false)
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              Salvar
            </CButton>
          </div>
        </CModalBody>
      </CModal>
      <CModal
        size="lg"
        visible={modalShowVisible}
        onClose={() => {}}
        aria-labelledby="VisualizarAccesso"
      >
        <CModalHeader>
          <CModalTitle id="VisualizarAccesso">Acesso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <h3 className="float-start">Autorizar Acesso?</h3>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/qp_7hD686Ew"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div className="d-flex flex-row justify-content-end gap-4">
              <CButton
                color="success"
                size="lg"
                onClick={async () => {
                  try {
                    await acessosServices.updateAcess({
                      ...showAcesso,
                      acesso_autorizado: 1,
                    })
                    getAllAcessos()
                    setModalShowVisible(false)
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                Sim
              </CButton>
              <CButton
                color="danger"
                size="lg"
                onClick={async () => {
                  try {
                    await acessosServices.updateAcess({
                      ...showAcesso,
                      acesso_autorizado: 0,
                    })
                    getAllAcessos()
                    setModalShowVisible(false)
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                Não
              </CButton>
            </div>
          </div>
        </CModalBody>
      </CModal>
      <Estela />
    </div>
  )
}

export default PageAcessManagement
