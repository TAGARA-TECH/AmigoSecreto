let nombres = []; // Array para almacenar los nombres ingresados
let nombresDict = {}; // Diccionario para validar nombres y géneros
let nombresCargados = false; // Bandera para indicar si los nombres han sido cargados

// Cargar nombres desde el archivo CSV (simulado en código por ahora)
fetch("nombres.csv")
    .then(response => response.text())
    .then(data => {
        let lineas = data.split("\n");
        lineas.forEach(linea => {
            let partes = linea.split(",");
            if (partes.length >= 2) {
                let nombre = partes[0].trim().charAt(0).toUpperCase() + partes[0].trim().slice(1).toLowerCase();
                let genero = partes[1].trim().toUpperCase();
                if (genero === "M" || genero === "F") {
                    nombresDict[nombre] = genero;
                }
            }
        });
        nombresCargados = true; // Marcar que los nombres han sido cargados
        console.log("Nombres cargados:", Object.keys(nombresDict).length);
    });

// Agregar eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("adicionar").addEventListener("click", agregarNombre);

    document.getElementById("nombre").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            agregarNombre();
        }
    });

    document.getElementById("borrarLista").addEventListener("click", () => {
        borrarLista();
        document.getElementById("borrarLista").textContent = "Borrar Lista";
    });

    document.getElementById("sortear").addEventListener("click", sortearAmigo);
});

// Función para agregar un nombre a la lista
function agregarNombre() {
    let input = document.getElementById("nombre");
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    if (!nombresCargados) {
        alert("Por favor, espere a que se cargue la lista de nombres.");
        return;
    }

    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

    if (!(nombre in nombresDict)) {
        alert("El nombre ingresado no está registrado en la base de datos.");
        return;
    }

    nombres.push(nombre);
    actualizarLista();
    input.value = "";
}

// Función para actualizar la lista de nombres en la página
function actualizarLista() {
    let lista = document.getElementById("listaNombres");
    lista.innerHTML = "";

    nombres.forEach(nombre => {
        let li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

// Función para sortear un amigo secreto aleatoriamente
function sortearAmigo() {
    if (nombres.length === 0) {
        alert("Agrega al menos un nombre antes de sortear.");
        return;
    }

    let indice = Math.floor(Math.random() * nombres.length);
    let nombreSorteado = nombres[indice];
    let genero = nombresDict[nombreSorteado];
    let mensajeGenero = (genero === "M") ? "amigo" : "amiga";

    document.getElementById("resultado").textContent = `Tu ${mensajeGenero} secreto es: ${nombreSorteado}`;
}

// Función para borrar la lista
function borrarLista() {
    nombres = [];
    actualizarLista();
    document.getElementById("resultado").textContent = "";
}
