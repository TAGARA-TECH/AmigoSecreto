// Amigo Secreto. Declaraciones.
let nombres = []; // Array para almacenar los nombres ingresados

// Función para agregar un nombre a la lista
function agregarNombre() {
    let input = document.getElementById("nombre"); // Obtener el input
    let nombre = input.value.trim(); // Eliminar espacios en blanco

    if (nombre === "") { // Validar que el campo no esté vacío
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    nombres.push(nombre); // Agregar el nombre al array
    actualizarLista(); // Actualizar la lista en pantalla
    input.value = ""; // Limpiar el campo de entrada
}

// Función para actualizar la lista de nombres en la página
function actualizarLista() {
    let lista = document.getElementById("listaNombres"); // Obtener la lista en el HTML
    lista.innerHTML = ""; // Limpiar la lista antes de actualizar

    nombres.forEach(nombre => {
        let li = document.createElement("li"); // Crear un nuevo elemento de lista
        li.textContent = nombre; // Asignar el texto con el nombre
        lista.appendChild(li); // Agregar el elemento a la lista
    });
}

// Función para sortear un amigo secreto aleatoriamente
function sortearAmigo() {
    if (nombres.length === 0) { // Validar que haya nombres en la lista
        alert("Agrega al menos un nombre antes de sortear.");
        return;
    }

    let indice = Math.floor(Math.random() * nombres.length); // Obtener un índice aleatorio
    document.getElementById("resultado").textContent = "El amigo secreto es: " + nombres[indice]; // Mostrar el resultado
}
