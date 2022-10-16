import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import PatientsHeader from 'components/patients/PatientsHeader'
import PatientTable from 'components/patients/PatientTable'
import Modal from 'components/shared/Modal'
import PatientCreateForm from 'components/patients/forms/PatientCreateForm'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'components/shared/Spinner'
import { getPatients } from 'store/patients/patientsSlice'

function Patients() {
  const [currentPatients, setCurrentPatients] = useState([])
  const [searchText, setSearchText] = useState('')
  const [patientModalOpen, setPatientModalOpen] = useState(false)
  const { patients } = useSelector((state) => state.patients)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPatients())
  }, [])

  useEffect(() => {
    if (patients) setCurrentPatients(patients)
  }, [patients])

  useEffect(() => {
    handlePatientSearch()
  }, [searchText])

  const toggleModal = () => {
    setPatientModalOpen((prevState) => !prevState)
  }

  const userModalCallback = () => {
    toggleModal()
  }

  const handlePatientSearch = () => {
    if (searchText.length === 0) setCurrentPatients(patients)
    else {
      const tempPatients = patients.filter((patient) => {
        return patient.name.toLowerCase().includes(searchText)
      })

      setCurrentPatients(tempPatients)
    }
  }

  if (patients === null) return <Spinner />
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PatientsHeader
            toggleModal={toggleModal}
            setSearchText={setSearchText}
          />
          <Box sx={{ mt: 3 }}>
            {currentPatients.length ? (
              <PatientTable patients={currentPatients} />
            ) : (
              <h1>No patients</h1>
            )}
          </Box>
        </Container>
      </Box>
      <Modal
        title=''
        isOpen={patientModalOpen}
        toggleModal={toggleModal}
        noPadding
      >
        <PatientCreateForm
          callBack={userModalCallback}
          toggleModal={toggleModal}
        />
      </Modal>
    </>
  )
}

export default Patients
