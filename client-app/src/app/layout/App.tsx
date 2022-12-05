import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import InstitutionDashboard from '../../features/Institutions/dashboard/InstitutionDashboard';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import InstitutionForm from '../../features/Institutions/form/InstitutionForm';
import InstitutionDetails from '../../features/Institutions/details/InstitutionDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/*' element={
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Routes>
                <Route path='Institutions' element={<InstitutionDashboard />} />
                <Route path='Institutions/:id' element={<InstitutionDetails />} />
                <Route path={'createInstitution'} element={<InstitutionForm />} />
                <Route path={'manage/:id'} element={<InstitutionForm />} />
              </Routes>
            </Container>
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
