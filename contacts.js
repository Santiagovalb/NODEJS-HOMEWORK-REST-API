const fs = require('fs').promises;
const path = require('path');

// Ruta al archivo de contactos
const contactsPath = path.resolve("db/contacts.json");

// Función para listar todos los contactos.
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer los contactos: ${error.message}`);
    throw error;
  }
}

// Función para obtener un contacto por su ID.
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      throw new Error('Contacto no encontrado');
    }
    return contact;
  } catch (error) {
    console.error(`Error al obtener el contacto por ID: ${error.message}`);
    throw error;
  }
}

// Función para eliminar un contacto por su ID.
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return true;
  } catch (error) {
    console.error(`Error al eliminar el contacto por ID: ${error.message}`);
    throw error;
  }
}

// Función para agregar un nuevo contacto.
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    // Validar los datos de entrada si es necesario
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(`Error al agregar un nuevo contacto: ${error.message}`);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
