import { useState } from 'react';
import { useAddContactMutation, useGetContactsQuery } from 'redux/phoneBookAPI';
import s from './Form.module.css';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const { data: contacts } = useGetContactsQuery();
    const [addContact] = useAddContactMutation();


    const createContact = async user => {
        await addContact(user);
    };


    const cheakAddContact = name => {
        const isValidate = contacts.find(item => item.name === name);
        isValidate && alert(`${name} is already in contacts`);
        return isValidate;
    };

    const handleSubmut = e => {
        e.preventDefault();
        const isValidate = cheakAddContact(name);
        resetForm();
        if (isValidate) return;
        createContact({ name, number });
        resetForm();
    };

    const handleInputChange = evt => {
        const { name } = evt.currentTarget;
        const { value } = evt.currentTarget;

        switch (name) {
            case "name":
                setName(value);
                break;
            
            case "number":
                setNumber(value);
                break;
            
            default:
                return;
        }
    }

    const resetForm = () => {
        setName('');
        setNumber('');
    }

  return (
    <form className={s.form} onSubmit={handleSubmut}>
      <label className={s.label}>
        Name
        <input
          autoComplete="off"
          className={s.input}
          type="text"
          value={name}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          autoComplete="off"
          className={s.input}
          value={number}
          onChange={handleInputChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={s.submit} type="submit">
        Add contact
      </button>
    </form>
  );
}


