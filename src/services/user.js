import firebase from "firebase";
export async function getContacts() {
  const docref = await firebase.firestore().collection("ContactList").get();
  const docs = docref.docs.map((doc) => doc.data());
  return docs;
}

export async function createContact(contact) {
  const docref = await firebase.firestore().collection("ContactList").doc();
  await docref.set({
    userName: {
      firstName: contact.contact.firstName,
      lastName: contact.contact.lastName,
    },
    phoneNumber: parseInt(contact.contact.phoneNumber),
    imageUrl: contact.imageUrl,
  });
}

export async function deleteContact(contact) {
  const snapshot = await firebase
    .firestore()
    .collection("ContactList")
    .where("phoneNumber", "==", contact.phoneNumber)
    .get();
  snapshot.docs.map(async (doc) => await doc.ref.delete());
}
export async function editContact(contact) {
  console.log(contact);
  const queryRef = await firebase
    .firestore()
    .collection("ContactList")
    .where("phoneNumber", "==", parseInt(contact.contact.prevNo));
  const snapshot = await queryRef.get();
  snapshot.docs.map((doc) =>
    doc.ref.set({
      userName: {
        firstName: contact.contact.firstName,
        lastName: contact.contact.lastName,
      },
      phoneNumber: parseInt(contact.contact.phoneNumber),
      imageUrl: contact.url,
    })
  );
}
