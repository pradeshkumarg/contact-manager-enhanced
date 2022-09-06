export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar ?: string;
}

export interface IContactCard {
  item: Contact;
}