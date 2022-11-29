import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Institution } from '../models/institution';
import NavBar from './NavBar';
import InstitutionDashboard from '../../features/Institutions/dashboard/InstitutionDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    agent.Institutions.list().then(response => {
      setInstitutions(response);
      setLoading(false);
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
    setSubmitting(true);
    if (institution.id) {
      agent.Institutions.update(institution).then(() => {
        setInstitutions([...institutions.filter(i => i.id !== institution.id), institution]);
        setSubmitting(false);
        setEditMode(false);
        setSelectedInstitution(institution);
      })
    } else {
      institution.id = uuid();
      agent.Institutions.create(institution).then(() => {
        setInstitutions([...institutions, institution]);
        setSubmitting(false);
        setEditMode(false);
        setSelectedInstitution(institution);
      })
    }
  }

  function handleDeleteInstitution(id: string) {
    setInstitutions([...institutions.filter(i => i.id !== id)]);
  }

  if (loading) return <LoadingComponent />

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
          handleInstitutionFormSubmit={handleInstitutionEditOrCreate}
          submitting={submitting} />
      </Container>
    </>
  );
}

export default App;
