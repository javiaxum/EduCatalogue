import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5172/api/institutions').then(response => {
      setInstitutions(response.data);
    })
  }, [])

  return (
    <div>
      <Header as="h2" icon="users" content="Institutions" />
      <List>
        {institutions.map((institution: any) => {
          return (
            <List.Item key={institution.id}>{institution.name}</List.Item>
          )
        })}
      </List>
    </div>
  );
}

export default App;
