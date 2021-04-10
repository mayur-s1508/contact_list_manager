export default function reducer(state = { contacts: [] }, action) {
  let newState = { ...state };
  switch (action.type) {
    case "FETCH_CONTACTS":
      newState.contacts = action.payload;
      return newState;
    case "CREATE_CONTACT":
      newState.contacts.push({
        userName: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
        phoneNumber: parseInt(action.payload.phoneNumber),
        imageUrl: action.payload.imageUrl,
      });
      return newState;
    case "EDIT_CONTACT":
      console.log(newState.contacts);
      console.log(action.payload);
      newState.contacts.forEach((contact) => {
        if (contact.phoneNumber === action.payload.contact.prevNo) {
          contact.userName.firstName = action.payload.contact.firstName;
          contact.userName.lastName = action.payload.contact.lastName;
          contact.phoneNumber = parseInt(action.payload.contact.phoneNumber);
          contact.imageUrl = action.payload.url;
        }
      });

      return newState;

    case "DELETE_CONTACT":
      for (var i = 0; i < newState.contacts.length; i++) {
        if (
          newState.contacts[i].phoneNumber ===
          parseInt(action.payload.phoneNumber)
        ) {
          newState.contacts.splice(i, 1);
          break;
        }
      }
      return newState;
    default:
      return state;
  }
}
