window.onload = function() {
    let nombreUsuario = prompt("Ingrese su nombre");  // Utilizo prompt para solicitar el nombre
    console.log(`Nombre del usuario: ${nombreUsuario}`);

    // Mensaje de bienvenida
    if (nombreUsuario) {
        // Si el usuario ingresó su nombre, se muestra el siguiente mensaje
        alert(`¡Bienvenido/a, ${nombreUsuario}! Estamos encantados de tenerte en nuestro sitio web.`);
    } else {
        // Si no ingresó su nombre, se muestra un mensaje alternativo
        alert("¡Bienvenido/a! Estamos encantados de tenerte en nuestro sitio web.");
    }
}

// Array para almacenar los valores numéricos y operadores (+, -, *, /)
let calcular = [];

// Esta función determina si un valor es un operador
function Operador(valor) {
    return ['+', '-', '*', '/'].includes(valor);
}

// Función para actualizar la pantalla
function actualizarPantalla() {
    document.getElementById('resultado').value = calcular.join('');
}

// Función para agregar un valor u operador al array principal
function agregarAlCalculo(valor) {
    if (Operador(valor) && Operador(calcular[calcular.length - 1])) {
        return;
    }
    calcular.push(valor);
    actualizarPantalla();
}

// Función para limpiar el resultado
function limpiarResultado() {
    calcular = [];
    actualizarPantalla();
}

// Función para verificar si la expresión es válida
function expresionValida(expresion) {
    return !/[+\-*/]$/.test(expresion);
}

// Función para calcular el resultado. Si la expresión es válida se guarda el resultado, si no es válida se muestra el mensaje "Error"
function calcularResultado() {
    const expresion = calcular.join('');

    if (expresionValida(expresion)) {
        calcular = [eval(expresion)];
    } else {
        calcular = ['Error'];
    }
    actualizarPantalla();
}