import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
   const [filtered, setFiltered] = useState(props.contacts)
   const friendsCount = props.contacts.filter(contact => contact.isFriend).length;
   const colleaugesCount = props.contacts.filter(contact => !contact.isFriend).length;
   const allCount = props.contacts.length


   useEffect( ()=> {
     setFiltered(props.contacts)
   }, [props.contacts])

  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const Filter = (isFriend) => {
    if(isFriend === 'all') {
      setFiltered(props.contacts)
    } else {
      let newList = [...props.contacts].filter(contact => contact.isFriend  === isFriend)
      setFiltered(newList)
    }
  }

  const renderContactList = filtered.map((contact) => {
    return ( <div>
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
      </div>
    )
  });
  return (
    <div className="main">
      <h2>
        Contact List       
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <button onClick={()=> Filter('all')}>All Contact {allCount} </button>
      <button onClick={()=> Filter(true)}> Friends {friendsCount}</button>
      <button onClick={()=> Filter(false)}> Others {colleaugesCount}</button>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
