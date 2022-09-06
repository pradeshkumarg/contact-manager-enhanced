import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';
import contactContext, { ContactContext } from '../context/ContactContext';
import { Contact } from '../types';
import AddContact from './AddContact';
import ContactDetails from './ContactDetails';
import ContactList from './ContactList';
import EditContact from './EditContact';
import api from '../api/contact';

const App = () => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);

  // Get all contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const contextData = useMemo<ContactContext>(() => ({
    contacts,
    setContacts
  }), [contacts]);

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) {
        setContacts(allContacts);
      }
    }
    getAllContacts();
  }, []);

  return <Router>
      <Header as="h2" textAlign='center' block>Contact Manager</Header>
      <Segment attached>
      <contactContext.Provider value={contextData}>
        <Routes>
          <Route path="/"  element={<ContactList />}/>
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
          <Route path='/contact/:id' element={<ContactDetails />}/>
        </Routes>   
      </contactContext.Provider>
           
      </Segment>
    </Router>;
}

export default App;
