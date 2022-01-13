import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import uniqid from 'uniqid';
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import Search from "./Search";



const App = () => {
  const LOCAL_STORAGE_KEY = "contacts"
  const [contacts, setContacts] = useState([])
  const [filtered, setFiltered] = useState([])
  
  useEffect(
    _ => {
      setFiltered(contacts);
    },
    [contacts]
  )
  
  const search = val => {
    let currentContacts = [], newList = [];
    if (val !== "") {  
      currentContacts = contacts;   
      newList = currentContacts.filter(contact => {      
        const lc = contact.name.toLowerCase();
        const filter = val.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = contacts;
    }
    setFiltered(newList);
  }

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uniqid(),
      isFriend: false,
      ...contact,
    }

    const response = await api.post("/contacts", request)
    console.log(response)
    setContacts([...contacts, response.data])
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email, isFriend } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    )
  }
  
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

 

  useEffect(() => {
     const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
     if (retriveContacts) setContacts(retriveContacts);
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    }

    getAllCOntacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Search {...{ search }} />
      <Router>
        <Header />     
          <Switch>       
          <Route  path="/" exact 
          render={(props) => (
              <ContactList
                {...props}      
                contacts={filtered}
                getContactId={removeContactHandler}
              />
            )}>
         </Route>
          <Route path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}>           
          </Route>
          <Route  path="/edit" 
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}>
           
          </Route>

          <Route path="/contact/:id" component={ContactDetail}>  </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
