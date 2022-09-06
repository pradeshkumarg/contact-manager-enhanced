import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Table } from 'semantic-ui-react';
import contactContext from "../context/ContactContext";
import user from "../images/user.jpg";
import { Contact, IContactCard } from "../types";
import api from '../api/contact';

const ContactCard: FC<IContactCard> = ({item}) => {

  const context = useContext(contactContext);

  const [contacts, setContacts] = useState<Array<Contact>>([]);

  useEffect(() => {
    context && setContacts(context?.contacts || [])
  }, [context, setContacts, context?.contacts])

  // Delete contact
  const removeContactHandler = async (id: string) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter(item => item.id !== id);
    context?.setContacts([...newContactList]);
  }

  return <>
    <Table.Row key={item.id}>
        <Table.Cell>
          {item.avatar ? <img src={item.avatar} alt="user" className="ui avatar image" />: <img src={user} alt="user" className="ui avatar image" /> }
        </Table.Cell>
        <Table.Cell>
          <Link to={{pathname: `/contact/${item.id}`}}>{item.name}</Link>
        </Table.Cell>
        <Table.Cell>{item.email}</Table.Cell>
        <Table.Cell>
          <Icon name="trash alternate" circular color="red" onClick={() => removeContactHandler(item.id)}/>
        </Table.Cell>
        <Table.Cell>
          <Link to={{pathname: `/edit/${item.id}`}}>
            <Icon name="edit" circular color="blue" />
          </Link>
        </Table.Cell>
      </Table.Row>
  </>;
}

export default ContactCard;
