import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";

export const AddContact = () => {
    const { actions, store } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            const existingContact = store.contacts.find(c => c.id === parseInt(id));
            if (existingContact) setContact(existingContact);
        }
    }, [id, store.contacts]);

    const handleChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (id) {
            actions.updateContact(id, contact);
        } else {
            actions.addContact(contact);
        }
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="full_name" value={contact.full_name} onChange={handleChange} placeholder="Full Name" />
            <input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Email" />
            <input type="phone" name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="address" value={contact.address} onChange={handleChange} placeholder="Address" />
            <button type="submit" className="btn btn-primary">Save Contact</button>
        </form>
    );
};
