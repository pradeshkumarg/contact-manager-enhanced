import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import contactContext from "../context/ContactContext";
import user from '../images/user.jpg';
import { Contact } from "../types";

const ContactDetails = () => {
  const params = useParams();
  
  const context = useContext(contactContext);

  const [contacts, setContacts] = useState<Array<Contact>>([]);

  useEffect(() => {
    contacts.length === 0 && setContacts(context?.contacts || []);
  }, [contacts.length, setContacts, context?.contacts])
  
  const contact = contacts.find(item => item.id === params.id);

  return <>
    <h2>
      Contact Details
      <Link to={"/"}>
        <Button content='View Contacts' floated="right" primary/>
      </Link>
    </h2>
    {!!contact && <Card centered>
        {contact.avatar? <Image src={contact.avatar} wrapped ui={false} /> : <Image src={user} wrapped ui={false} />}
        <Card.Content>
        <Card.Header>{contact.name}</Card.Header>
        <Card.Meta>
            <span className='date'>{contact.email}</span>
        </Card.Meta>
        </Card.Content>
    </Card>}
  </>;
}

export default ContactDetails;