continuar = false; 

function start_tracking() {
    continuar = true;
    while (continuar == true) {
        reconocer_libro()
    }
}

function reconocer_libro() {
    nuevo_libro = prompt("Ingresa el nombre del libro");
    total_paginas = Number(prompt("Ingresa el total de paginas que el libro contiene.\n\nNota: debes poner unicamente el numero de paginas usando enteros (ej: 500)"));
    total_paginas_leidas = Number(prompt("Cuantas paginas has leido hasta ahora? \n\nNota: debes poner unicamente el numero de paginas usando enteros (ej: 500)"));
    calcular_progreso();
    continuar = confirm(mensaje + " Quieres continuar registrando progreso?");
}

function calcular_progreso() {
    progreso = (total_paginas_leidas/total_paginas)*100
    mensaje_usuario(progreso);
    return mensaje
}


function mensaje_usuario(progreso) {
    if(progreso < 10){
        mensaje = `Llevas ${progreso}% del libro ${nuevo_libro}. Apenas vas comenzando, Animo!`;
    } else if (progreso > 10 && progreso < 50 ){
        mensaje = `Llevas ${progreso}% del libro ${nuevo_libro}. Vas muy bien. Continua asi!`;
    } else if (progreso > 50 && progreso < 90) {
        mensaje = `Llevas ${progreso}% del libro ${nuevo_libro}. Ya pasaste la mitad. Eres impresionante!`;
    } else if (progreso > 90 && progreso < 100) {
        mensaje = `Llevas ${progreso}% del libro ${nuevo_libro}. Estas a punto de terminar. No te falta nada!`;
    } else if (progreso == 100) {
        mensaje = `Terminaste ${nuevo_libro}!!!.`;
    } else {
        mensaje = `No pudimos calcular tu progreso. Intentalo de nuevo mas tarde.`;
        continuar = false
    }
} 

