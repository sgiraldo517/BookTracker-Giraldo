//! Constructor
class nuevoLibro {
    constructor(nombre, autor, numeroTotalPaginas) {
        this.nombre = nombre;
        this.autor = autor; 
        this.numeroTotalPaginas = numeroTotalPaginas;
    }
}


//! Funcion agregar nuevo libro

let librosTrackeados = [];

const agregarLibro = (e) => {
    e.preventDefault();
    let nuevo_libro = document.getElementById("libro").value;
    let autor_libro = document.getElementById("autor").value;
    let total_paginas = document.getElementById("totalpaginas").value;
    librosTrackeados.push(new nuevoLibro(nuevo_libro, autor_libro, total_paginas));
    document.querySelector("form").reset();

    console.log(librosTrackeados);

    //* Alert 
    Swal.fire({
        title: "Gracias!",
        text: "Libro agregado exitosamente!",
        icon: "success"
    });

    //* Session Storage
    sessionStorage.setItem("MisLibros", JSON.stringify(librosTrackeados));

    //* Crear Card
    createcard();
}

let boton_agregar_libro = document.getElementById("nuevo-libro");
boton_agregar_libro.addEventListener("click", agregarLibro)

const createcard = () => {
    let cards_libros_agregados = document.getElementById("seccion-cards");
    let libro_agregado = librosTrackeados[librosTrackeados.length -1]
    const nueva_carta = `
            <div class="col">
                <div class="card cards-tracker">
                    <div class="card-body">
                        <h5 class="card-title"><span>Titulo </span>${libro_agregado.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary"><span>Autor </span>${libro_agregado.autor}</h6>
                        <p class="card-text">Total Paginas: ${libro_agregado.numeroTotalPaginas}</p>
                        <button class="btn btn-light button_main" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            Agregar progreso
                        </button>
                    </div>
                </div>
            </div>
        `
    cards_libros_agregados.innerHTML += nueva_carta;
};

