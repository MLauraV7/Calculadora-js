//Eliminé prompt y alert
window.onload = function() {
    const bienvenida = document.getElementById("bienvenida");
    bienvenida.textContent = `¡Bienvenido/a a nuestro sitio!`;
};
// Array para almacenar los valores y operadores
let calcular = [];
// Función para determinar si un valor es un operador
function Operador(valor) {
    return ['+', '-', '*', '/'].includes(valor);
}
// Función para actualizar la pantalla con los valores del array
function actualizarPantalla() {
    document.getElementById('resultado').value = calcular.join('');
}
// Función para agregar un valor u operador al array
function agregarAlCalculo(valor) {
    // Se comprueba si el último elemento es un operador y no se permite agregar dos operadores seguidos
    if (Operador(valor) && Operador(calcular[calcular.length - 1])) {
        return; // No agregamos el operador si el último ya es uno
    }
    // Se agrega el valor al array
    calcular.push(valor);
    actualizarPantalla();
}
// Función para limpiar el resultado
function limpiarResultado() {
    calcular = []; // Se vacía el array
    actualizarPantalla(); // Actualiza la pantalla
}
// Función para verificar si la expresión es válida
function expresionValida(expresion) {
    return !/[+\-*/]$/.test(expresion);
}
// Función para calcular el resultado
function calcularResultado() {
    const expresion = calcular.join(''); // Une la operación del array
    // Se verifica si la expresión es válida (si no termina en operador y no contiene operadores consecutivos)
    if (expresionValida(expresion)) {
        // Se evalúa la expresión
        let resultado = eval(expresion);
        //Se guarda el resultado en el array
        calcular = [resultado];
        //Se guarda la operación y el resultado en el historial
        guardarOperacion(expresion, resultado);
    } else {
        // Si la expresión no es válida, se muestra "Error"
        calcular = ['Error'];
    }
    // Se actualiza la pantalla
    actualizarPantalla();
}
//Función para guardar el resultado de las operaciones
function guardarOperacion(expresion, resultado) {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push({ operacion: expresion, resultado: resultado });
    localStorage.setItem("historial", JSON.stringify(historial));
}
//Función para mostrar el historial guardado en localStorage
function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const contenedor = document.getElementById("historial");
    contenedor.innerHTML= "<h3>Historial de operaciones</h3>";
    if (historial.length === 0) {
        contenedor.innerHTML += "<p>No hay historial aún</p>";
        return;
    }
    for (let i = 0; i < historial.length; i++) {
        const item = historial [i];
        contenedor.innerHTML += `<p>${item.operacion} = ${item.resultado}</p>`;
    }
}
//Función para eliminar el historial
function borrarHistorial() {
    localStorage.removeItem("historial");
    const contenedor = document.getElementById("historial");
    contenedor.innerHTML = "<h3>Historial de operaciones:</h3>";
}