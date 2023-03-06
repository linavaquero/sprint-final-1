// Arrays de usuarios cliente, administrador
const usuarios = [{
  nombre: "maria",
  numeroDocumento: "1078470171",
  contraseña: "0171",
  tipo: "cliente"
},
{
  nombre: "juana",
  numeroDocumento: "35970302",
  contraseña: "0302",
  tipo: "cliente"
},
{
  nombre: "isabel",
  numeroDocumento: "1007845239",
  contraseña: "5239",
  tipo: "administrador"
},
{
  nombre: "vanessa",
  numeroDocumento: "1045530923",
  contraseña: "0923",
  tipo: "administrador"
}]
// Arrays de billetes segun su denominacion con su cantidad inicializada en cero
const billetes = [{
  denominacion: 100000,
  cantidad: 0
},
{
  denominacion: 50000,
  cantidad: 0
},
{
  denominacion: 20000,
  cantidad: 0
},
{
  denominacion: 10000,
  cantidad: 0
},
{
  denominacion: 5000,
  cantidad: 0
}]
// Se llama la funcion loguin
loguin()
// Funcion loguin donde se solicita identificacion, contraseña y se valaida que tipo de usuario
function loguin() {

  let usuario = {}
  // Pedir usuario y contraseña hasta que se ingrese uno válido
  do {
    const documento = prompt("Ingrese su número de documento:");

    const contraseña = prompt("Ingrese su contraseña:");

    usuario = usuarios.find(u => u.numeroDocumento === documento && u.contraseña === contraseña);

    if (!usuario) {
      console.log("Usuario o contraseña incorrectos. Intente de nuevo.");
    }
  } while (!usuario);

  // Si el usuario es administrador, cargar el cajero
  if (usuario.tipo === "administrador") {
    cargarCajero();
  }
  // Si el usuario es cliente, retirar dinero del cajero
  if (usuario.tipo === "cliente") {
    retirarDinero();
  }
}
// Funcion cargar cajero 
function cargarCajero() {
  
  let total = 0;
  for (let i = 0; i < billetes.length; i++) {
    // Pedir la cantidad de billetes de cada denominación
    billetes[i].cantidad += parseInt(prompt(`Ingrese la cantidad de billetes de ${billetes[i].denominacion} COP:`));
    const subtotal = billetes[i].denominacion * billetes[i].cantidad;
      // Mostrar la suma por cada denominación y el total general
    console.log(`Billetes de ${billetes[i].denominacion} COP: ${billetes[i].cantidad} (Total: ${subtotal} COP)`);
    total += subtotal;
  }
  console.log(`Total en cajero: ${total} COP`);
// Despues de cargar dinero vuelve a solicitar usuario, contraseña
  loguin()
}


// funcion retirar dinero
function retirarDinero() {
  // Verificar si el cajero tiene dinero cargado
  let cajeroVacio = true;
  for (let i = 0; i < billetes.length; i++) {
    if (billetes[i].cantidad > 0) {
      cajeroVacio = false;
      break;
    }
  }
  if (cajeroVacio) {
    console.log("Cajero en mantenimiento, vuelva pronto.");
    // Si cajero en mantenimiento vuelve a solicitar usuario, contraseña
    loguin()
  }

  // Pedir la cantidad deseada a retirar
  const cantidad = parseInt(prompt("Ingrese la cantidad de dinero a retirar:"));

  // Calcular la cantidad de billetes de cada denominación a entregar
  let restante = cantidad;
  const entregados = [];
  for (let i = 0; i < billetes.length; i++) {
    const cantidadDenominacion = Math.floor(restante / billetes[i].denominacion);
    const cantidadEntregada = Math.min(cantidadDenominacion, billetes[i].cantidad);
    entregados.push({ denominacion: billetes[i].denominacion, cantidad: cantidadEntregada });
    restante -= billetes[i].denominacion * cantidadEntregada;
  }

  // Mostrar los billetes entregados
  console.log(`Dinero entregado: ${cantidad} COP`);
  for (let i = 0; i < entregados.length; i++) {
    console.log(`Billetes de ${entregados[i].denominacion} COP: ${entregados[i].cantidad}`);
  }

  // Actualizar el array de billetes
  for (let i = 0; i < billetes.length; i++) {

    billetes[i].cantidad -= entregados[i].cantidad;
  }

  // Mostrar el dinero restante en el cajero por cada denominación
  console.log("Dinero restante en cajero:");
  let total= 0
  for (let i = 0; i < billetes.length; i++) {
    const subtotal = billetes[i].denominacion * billetes[i].cantidad;
    console.log(`Billetes de ${billetes[i].denominacion} COP: ${billetes[i].cantidad} (Total: ${subtotal} COP)`);
    total += subtotal;

  }
  console.log(`Total en cajero: ${total} COP`);

  // Despues de retirar dinero vuelve a solicitar usuario, contraseña
  loguin()
}
