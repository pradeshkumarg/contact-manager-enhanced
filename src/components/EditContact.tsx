import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import api from '../api/contact';
import contactContext from '../context/ContactContext';
import { Contact } from '../types';

const EditContact = () => {

  const context = useContext(contactContext);
  
  const [contacts, setContacts] = useState<Array<Contact>>([]);

  const [contact, setContact] = useState<Contact>();

  const params = useParams();

  const id = params.id || "";

  const [name, setName] = useState<string>();
  
  const [email, setEmail] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    const getContact = (id: string) => {
      return contacts.find(item => item.id === id) || contacts[0];
    }
    context && setContacts(context.contacts); 
    if(!contact) {
      let c = getContact(params.id as string);
      setContact(c);
      setName(c?.name || "");
      setEmail(c?.email || "");
    }
  }, [contacts, contacts.length, contact, context?.contacts, params.id])

  // Edit contact
  const editContactHandler = async (c: Contact) => {
    const response = await api.patch(`/contacts/${c.id}`, c);
    context?.setContacts(contacts.map(item => {
      return item.id === c.id? {...response.data} : item;  
    }));
  }

  const editContact = () => {
    if(!name || !email || name === "" || email === "") {
      alert("Enter all mandatory fields..")
      return;
    }
    editContactHandler({id , name, email});
    setName(""); setEmail("");
    navigate("/");
  }

  return  <>
    <h2>
      Edit Contact
      <Link to={"/"}>
        <Button content='View Contacts' floated="right"/>
      </Link>
    </h2>

    <Form onSubmit={editContact}>
      <Form.Field required={true}>
        <label>Name</label>
        <input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/>
      </Form.Field>

      <Form.Field required={true}>
        <label>Email</label>
        <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
      </Form.Field>
      
      <Button type='submit' primary>Update Contact</Button>
    </Form>
  </>;
}

export default EditContact;
