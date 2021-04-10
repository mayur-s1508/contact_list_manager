export function fetchContacts(contacts) {
  return {
    type: "FETCH_CONTACTS",
    payload: contacts,
  };
}
export function createContacts(contact) {
  return {
    type: "CREATE_CONTACT",
    payload: contact,
  };
}
export function deleteContacts(contact) {
  return {
    type: "DELETE_CONTACT",
    payload: contact,
  };
}

export function editContacts(contact) {
  console.log(contact);
  return {
    type: "EDIT_CONTACT",
    payload: contact,
  };
}
