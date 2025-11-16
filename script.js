let valorActual = '0';
let valorPrevio = null;
let operadorActual = null;
let debeReiniciarPantalla = false;

const pantalla = document.getElementById('display');
const botones = document.querySelectorAll('.btn');

function actualizarPantalla() {
    pantalla.textContent = valorActual;
}

function agregarNumero(numero) {
    if (debeReiniciarPantalla) {
        valorActual = numero;
        debeReiniciarPantalla = false;
    } else {
        if (valorActual === '0' && numero !== '.') {
            valorActual = numero;
        } else {
            if (numero === '.' && valorActual.includes('.')) {
                return;
            }
            valorActual += numero;
        }
    }
    actualizarPantalla();
}

function seleccionarOperador(operador) {
    if (operadorActual !== null && valorPrevio !== null && !debeReiniciarPantalla) {
        calcular();
    }

    valorPrevio = valorActual;
    operadorActual = operador;
    debeReiniciarPantalla = true;
}

function calcular() {
    if (operadorActual === null || valorPrevio === null) {
        return;
    }

    const previo = parseFloat(valorPrevio);
    const actual = parseFloat(valorActual);
    let resultado;

    switch (operadorActual) {
        case 'add':
            resultado = previo + actual;
            break;
        case 'subtract':
            resultado = previo - actual;
            break;
        case 'multiply':
            resultado = previo * actual;
            break;
        case 'divide':
            if (actual === 0) {
                alert('Error: No se puede dividir entre cero');
                limpiar();
                return;
            }
            resultado = previo / actual;
            break;
        default:
            return;
    }

    resultado = Math.round(resultado * 100000000) / 100000000;

    valorActual = resultado.toString();
    operadorActual = null;
    valorPrevio = null;
    debeReiniciarPantalla = true;
    actualizarPantalla();
}

function limpiar() {
    valorActual = '0';
    valorPrevio = null;
    operadorActual = null;
    debeReiniciarPantalla = false;
    actualizarPantalla();
}

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        if (boton.dataset.number !== undefined) {
            agregarNumero(boton.dataset.number);
        }

        if (boton.dataset.action) {
            const accion = boton.dataset.action;

            switch (accion) {
                case 'clear':
                    limpiar();
                    break;
                case 'equals':
                    calcular();
                    break;
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    seleccionarOperador(accion);
                    break;
            }
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        agregarNumero(e.key);
    }

    if (e.key === '.') {
        agregarNumero('.');
    }

    if (e.key === '+') {
        seleccionarOperador('add');
    }
    if (e.key === '-') {
        seleccionarOperador('subtract');
    }
    if (e.key === '*') {
        seleccionarOperador('multiply');
    }
    if (e.key === '/') {
        e.preventDefault();
        seleccionarOperador('divide');
    }

    if (e.key === 'Enter' || e.key === '=') {
        calcular();
    }

    if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        limpiar();
    }

    if (e.key === 'Backspace') {
        if (valorActual.length > 1) {
            valorActual = valorActual.slice(0, -1);
        } else {
            valorActual = '0';
        }
        actualizarPantalla();
    }
});

actualizarPantalla();
