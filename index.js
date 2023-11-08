const { Command } = require("commander");
const program = new Command();
const contacts = require("./contacts"); // Asegúrate de que la ruta sea correcta según la ubicación de tus archivos.

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const { action, id, name, email, phone } = program.opts();

// Funciones de acciones
async function listAction() {
    const allContacts = await contacts.listContacts();
    console.table(allContacts);
  }

  async function getAction() {
    const foundContact = await contacts.getContactById(id);
    console.table([foundContact]); // Muestra el contacto encontrado en forma de tabla
  }
  
  async function addAction() {
    const newContact = await contacts.addContact(name, email, phone);
    console.table([newContact]); // Muestra el nuevo contacto agregado en forma de tabla
  }
  
  async function removeAction() {
    const isDeleted = await contacts.removeContact(id);
    console.table([{ "Contacto eliminado": isDeleted }]); // Muestra si el contacto fue eliminado en forma de tabla
  }

  // Función de ayuda para mostrar las acciones disponibles
function showAvailableActions() {
    console.log("Acciones disponibles:");
    console.log("node index.js --action list : Mostrar la lista de contactos");
    console.log("node index.js --action get --id <el id> : Obtener un contacto por ID");
    console.log("node index.js --action add --name  --email  --phone  Agregar un nuevo contacto");
    console.log("node index.js --action remove --id : Eliminar un contacto por ID");
  }

// Invocar la acción correspondiente
switch (action) {
  case "list":
    listAction();
    break;

  case "get":
    getAction();
    break;

  case "add":
    addAction();
    break;

  case "remove":
    removeAction();
    break;

  default:
    console.warn("\x1B[31m Acción desconocida. Las acciones válidas son 'list', 'get', 'add' y 'remove'.");
    showAvailableActions(); // Mostrar las acciones disponibles en caso de acción desconocida// esto lo agrege adicional :)
}

