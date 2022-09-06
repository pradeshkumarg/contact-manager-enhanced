import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from 'semantic-ui-react';
import contactContext from "../context/ContactContext";
import { Contact } from "../types";
import ContactCard from "./ContactCard";

const ContactList = () => {

  const context = useContext(contactContext);

  const [contacts, setContacts] = useState<Array<Contact>>([]);

  useEffect(() => {
    setContacts(context?.contacts || []);
  }, [context?.contacts]);

  const renderHeader = <Table.Header>
    <Table.Row>
      <Table.HeaderCell width={1}/>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>E-mail address</Table.HeaderCell>
      <Table.HeaderCell width={1}></Table.HeaderCell>
      <Table.HeaderCell width={1}></Table.HeaderCell>
    </Table.Row>
  </Table.Header>

  const renderContactList = <Table.Body>
    {
      contacts.map(item => <ContactCard item={item} key={item.id} /> )
    }
  </Table.Body>
  
  return <>
  <h2>
    Contact List
    <Link to={"/add"}>
      <Button content='Add Contact' floated="right" primary/>
    </Link>
  </h2>
  
    {contacts && contacts.length > 0 && 
      <Table singleLine>
      {renderHeader}
      {renderContactList}
    </Table>
    }
  </>;
}

export default ContactList;
  