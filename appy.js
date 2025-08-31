// Datos iniciales
const rutas = [
    { nombre: "Ruta de Paseo", distancia: 8 },
    { nombre: "Ruta del Río", distancia: 15 },
    { nombre: "Ruta de la Montaña", distancia: 30 },
    { nombre: "Entrenamiento de Fondo", distancia: 70 },
];


const selectRuta = document.getElementById("ruta");
rutas.forEach((ruta, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = `${ruta.nombre} - ${ruta.distancia} km`;
    selectRuta.appendChild(option);
});

// Evento principal
document.getElementById("btnIniciar").addEventListener("click", iniciarSimulador);

function iniciarSimulador() {
    const nombre = document.getElementById("nombre").value.trim();
    const velocidadInput = document.getElementById("velocidad").value.trim();
    const ruta = rutas[selectRuta.value];

    // VALIDACIONES
    if (nombre === "") {
        mostrarResultado(" El nombre no puede estar vacío.", "error");
        return;
    }

    if (velocidadInput === "" || isNaN(velocidadInput)) {
        mostrarResultado(" La velocidad debe ser un número válido.", "error");
        return;
    }

    const velocidad = parseFloat(velocidadInput);

    if (velocidad <= 0) {
        mostrarResultado(" La velocidad debe ser mayor a 0 km/h.", "error");
        return;
    }

    if (velocidad > 100) {
        mostrarResultado(" La velocidad es demasiado alta, ingresa un valor realista (menor a 100 km/h).", "error");
        return;
    }

    
    let tiempo = calcularTiempo(ruta.distancia, velocidad);
    simularRecorrido(ruta.distancia);

   
    guardarHistorial({ nombre, ruta: ruta.nombre, distancia: ruta.distancia, tiempo });

    mostrarHistorial();
}

function calcularTiempo(distancia, velocidad) {
    let tiempo = distancia / velocidad;
    let tipo = distancia <= 10 ? "Recorrido corto" :
               distancia <= 20 ? "Recorrido medio" : "Recorrido largo";
               distancia <= 50 ? "Recorrido de fondo" : 

    mostrarResultado(`
        🚴 Usuario: ${document.getElementById("nombre").value}<br>
        📍 Ruta elegida: ${rutas[selectRuta.value].nombre} (${distancia} km)<br>
        ⏱️ Tiempo estimado: ${tiempo.toFixed(2)} horas<br>
        🔎 Tipo: ${tipo}
    `, "success");

    return tiempo;
}

function simularRecorrido(distancia) {
    let progreso = "";
    for (let km = 1; km <= distancia; km++) {
        progreso += `✅ Kilómetro ${km} completado<br>`;
    }
    mostrarResultado(document.getElementById("resultado").innerHTML + "<br>" + progreso, "success");
}

function mostrarResultado(mensaje, tipo = "success") {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = mensaje;
    resultado.className = tipo; 
}


function guardarHistorial(datos) {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(datos);
    localStorage.setItem("historial", JSON.stringify(historial));
}

// Mostrar historial en pantalla
function mostrarHistorial() {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    let lista = document.getElementById("listaHistorial");
    lista.innerHTML = "";
    historial.forEach((item, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${i+1}. ${item.nombre} hizo la ${item.ruta} (${item.distancia} km) en ${item.tiempo.toFixed(2)} h`;
        lista.appendChild(li);
    });
}


mostrarHistorial();