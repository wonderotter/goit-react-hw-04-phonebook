import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import {
  PhonebookWrapper,
  PhonebookTitle,
  PhonebookSubTitle,
} from './App.styled';
import { ContactForm } from 'components/Form/Form';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

const getContacts = () => {
  try {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(() => getContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const isNameAlreadyInContacts = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (isNameAlreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [
      { id: nanoid(), name, number },
      ...prevContacts,
    ]);
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = idToDelete => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idToDelete)
    );
  };

  return (
    <PhonebookWrapper>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onSubmit={handleFormSubmit} />
      <PhonebookSubTitle>Contacts</PhonebookSubTitle>
      <Filter filterValue={filter} handleFilterChange={handleFilterChange} />
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
    </PhonebookWrapper>
  );
};