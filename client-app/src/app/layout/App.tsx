import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Institution } from '../models/institution';
import NavBar from './NavBar';
import InstitutionDashboard from '../../features/Institutions/dashboard/InstitutionDashboard';

import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { institutionStore } = useStore();

  useEffect(() => {
    institutionStore.loadInstitutions();
  }, [institutionStore])

  if (institutionStore.loadingInitial) return <LoadingComponent />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <InstitutionDashboard />
      </Container>
    </>
  );
}

export default observer(App);
