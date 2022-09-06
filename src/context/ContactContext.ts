import { createContext, Dispatch, SetStateAction } from "react";
import { Contact } from "../types";

export interface ContactContext {
    contacts: Array<Contact>;
    setContacts: Dispatch<SetStateAction<Contact[]>>
}

const contactContext = createContext<ContactContext | null>(null);

export default contactContext;