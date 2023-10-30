class nuevoLibro {
    constructor(nombre, autor, numeroTotalPaginas, numeroPaginasLeidas) {
        this.nombre = nombre;
        this.autor = autor; 
        this.numeroTotalPaginas = numeroTotalPaginas;
        this.numeroPaginasLeidas = numeroPaginasLeidas;
        this.progreso = Math.round((numeroPaginasLeidas/numeroTotalPaginas)*100);
    }
}

//! Variables inicializadoras
let continuar = false; 
const librosTrackeados = [];

//! Declaracion de la funcion para empezar
let boton_empezar_proceso = document.getElementById("empezar");
function start_tracking() {
    continuar = true;
    while (continuar == true) {
        let nuevo_libro = prompt("Ingresa el nombre del libro");
            if(nuevo_libro == null) {
                alert("No entendimos tu respuesta. Intentalo de nuevo mas tarde.")
                continuar = false;
            } else {
                let autor_libro = prompt("Ingresa el nombre del autor");
                if(autor_libro == null) {
                    alert("No entendimos tu respuesta. Intentalo de nuevo mas tarde.")
                    continuar = false;
                } else {
                    let total_paginas = Number(prompt("Ingresa el total de paginas que el libro contiene.\n\nNota: debes poner unicamente el numero de paginas usando enteros (ej: 500)"));
                    let total_paginas_leidas = Number(prompt("Cuantas paginas has leido hasta ahora? \n\nNota: debes poner unicamente el numero de paginas usando enteros (ej: 500)"));
                    reconocer_libro(nuevo_libro, autor_libro, total_paginas, total_paginas_leidas);
                }
            }
    }
};
boton_empezar_proceso.addEventListener("click", start_tracking);



//! Funcion para agregar un nuevo libro al array
function reconocer_libro(nuevo_libro, autor_libro, total_paginas, total_paginas_leidas) {
    librosTrackeados.push(new nuevoLibro(nuevo_libro, autor_libro, total_paginas, total_paginas_leidas));
    continuar = confirm("Quieres continuar registrando progreso?");
    if (continuar==false) {
        visualizar_libros(librosTrackeados)
    } 
}


//! Funcion para imprimir todos los libros agregados o por los que el usuario desee filtrar
const visualizar_libros = (librosTrackeados) => {
    console.log(librosTrackeados);
    let visualizar = confirm("Quieres visualizar los libros agregados?");
    if (visualizar === true) {
        let opciones_visualizacion = Number(prompt("Tenemos varias opciones de visualizacion elige la que quieras usar hoy: \n1). Ver todos los libros agregados \n2). Ver libros comenzados recientemente (menos del 10% de progreso) \n3). Ver libros con entre 10% y 49% de progreso  \n4). Ver libros con 50% de progreso o mas \n5). Ver libros terminados" ));
        let libros_filtrados = [];
            if(opciones_visualizacion === 1) {
                libros_filtrados = librosTrackeados;
            } else if (opciones_visualizacion === 2) {
                libros_filtrados = librosTrackeados.filter((libros) => libros.progreso <= 10)
                console.log(libros_filtrados);
            } else if (opciones_visualizacion === 3) {
                libros_filtrados = librosTrackeados.filter((libros) => libros.progreso > 10 && libros.progreso < 50)
            } else if (opciones_visualizacion === 4) {
                libros_filtrados = librosTrackeados.filter((libros) => libros.progreso >= 50  && libros.progreso < 100)
            } else if (opciones_visualizacion === 5) {
                    libros_filtrados = librosTrackeados.filter((libros) => libros.progreso == 100)
            } else {
                opciones_visualizacion = prompt("Por favor selecciona una opcion valida")
            }
            console.log(opciones_visualizacion);
            console.log(libros_filtrados);
            console.log(libros_filtrados.length);

        
        let mensaje_final = "Tus libros son:";
        if (libros_filtrados.length == 0) {
            alert("No existe nungun libro en la categoria seleccionada.")
        } else {
            libros_filtrados.forEach((libro) => {
                let mensaje = `
                Nombre: ${libro.nombre}
                Autor: ${libro.autor}
                Progreso: ${libro.progreso}%
                `
                mensaje_final += mensaje
            });
            alert(mensaje_final);
        }
    } else { 
        alert("Gracias por visitarnos! Continua leyendo!");
    }
};

