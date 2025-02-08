function mostrarEstadoActual() {
    document.getElementById("log").innerHTML += `<br><br><b>Posición actual: ${ubicacion} | A = ${entorno['A']}, B = ${entorno['B']}</b>`;
}

function mostrarEstadosVisitados() {
    document.getElementById("log").innerHTML += "<br><br><b>Todos los estados posibles han sido visitados</b>";
}

function mostrarAccion(accion) {
    document.getElementById("log").innerHTML += `<br>Acción: ${accion}`;
}

function mostrarAccionExterna(accion) {
    document.getElementById("log").innerHTML += `<br>Acción: ${accion}`;
}

// Función para limpiar la posición actual
function limpiar() {
    mostrarAccion(`Limpiar ${ubicacion}`);
    entorno[ubicacion] = 'Limpio';
}

// Función para mover la aspiradora a la otra posición
function mover() {
    ubicacion = ubicacion === 'A' ? 'B' : 'A';
    mostrarAccion(`Mover a ${ubicacion}`);
}

// Función para simular la suciedad de los estados
function ensuciar() {
    for (const estadoPosible of estadosPosibles) {
        const claveEstado = `${ubicacion}-${estadoPosible.estadoA}-${estadoPosible.estadoB}`;
        if (!estadosVisitados.has(claveEstado)) {
            if (entorno['A'] === 'Limpio' && estadoPosible.estadoA === 'Sucio') {
                entorno['A'] = estadoPosible.estadoA;
                mostrarAccionExterna(`Ensuciar A`);
            } else if (entorno['B'] === 'Limpio' && estadoPosible.estadoB === 'Sucio') {
                entorno['B'] = estadoPosible.estadoB;
                mostrarAccionExterna(`Ensuciar B`);
            }
        }
    }
}

// Función para determinar la acción a realizar por la aspiradora
function accion() {
    if (entorno[ubicacion] === 'Sucio') {
        limpiar();
    } else {
        mover();
    }
}

// Función para verificar si todos los estados han sido visitados
function todosLosEstadosVisitados() {
    const claveEstado = `${ubicacion}-${entorno['A']}-${entorno['B']}`;
    estadosVisitados.add(claveEstado);
    return estadosVisitados.size === 8;
}

function ejecutar() {
    mostrarEstadoActual();
    accion();

    if (todosLosEstadosVisitados()) {
        mostrarEstadosVisitados();
        return;
    }

    if (entorno['A'] === 'Limpio' && entorno['B'] === 'Limpio') {
        mostrarEstadoActual();
        ensuciar();
    }

    if (todosLosEstadosVisitados()) {
        mostrarEstadosVisitados();
        return;
    }

    setTimeout(ejecutar, 2000);
    
}

const estadosPosibles = [
    { 'lugar': 'A', 'estadoA': 'Sucio', 'estadoB': 'Sucio' },
    { 'lugar': 'A', 'estadoA': 'Sucio', 'estadoB': 'Limpio' },
    { 'lugar': 'A', 'estadoA': 'Limpio', 'estadoB': 'Sucio' },
    { 'lugar': 'A', 'estadoA': 'Limpio', 'estadoB': 'Limpio' },
    { 'lugar': 'B', 'estadoA': 'Sucio', 'estadoB': 'Sucio' },
    { 'lugar': 'B', 'estadoA': 'Sucio', 'estadoB': 'Limpio' },
    { 'lugar': 'B', 'estadoA': 'Limpio', 'estadoB': 'Sucio' },
    { 'lugar': 'B', 'estadoA': 'Limpio', 'estadoB': 'Limpio' }
];

let ubicacion = 'A';
let entorno = {
    'A': 'Sucio',
    'B': 'Sucio'
};
let estadosVisitados = new Set();

// Iniciar el proceso
ejecutar();