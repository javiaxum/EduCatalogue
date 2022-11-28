import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Institution } from '../models/institution';
import NavBar from './NavBar';
import InstitutionDashboard from '../../features/Institutions/dashboard/InstitutionDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    axios.get<Institution[]>('http://localhost:5172/api/institutions').then(response => {
      setInstitutions(response.data);
    })
  }, [])

  function handleSelectInstitution(id: string) {
    setSelectedInstitution(institutions.find(x => x.id === id));
  }
  function handleCancelSelectInstitution() {
    setSelectedInstitution(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectInstitution(id) : handleCancelSelectInstitution();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleInstitutionEditOrCreate(institution: Institution) {
    institution.id
      ? setInstitutions([...institutions.filter(i => i.id !== institution.id), institution])
      : setInstitutions([...institutions, {...institution, id: uuid()}]);
    setEditMode(false);
    setSelectedInstitution(institution);
  }

  function handleDeleteInstitution(id: string) {
    setInstitutions([...institutions.filter(i => i.id !== id)]);
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <InstitutionDashboard
          institutions={institutions}
          selectedInstitution={selectedInstitution}
          selectInstitution={handleSelectInstitution}
          cancelSelectInstitution={handleCancelSelectInstitution}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          editMode={editMode} 
          handleInstitutionFormSubmit={handleInstitutionEditOrCreate}/>
      </Container>
    </>
  );
}

export default App;
