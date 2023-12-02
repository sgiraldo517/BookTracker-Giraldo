//! Constructor
class nuevoLibro {
    constructor(id, nombre, autor, numeroTotalPaginas, estado, progreso) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor; 
        this.numeroTotalPaginas = numeroTotalPaginas;
        this.estado = estado;
        this.progreso = progreso;
    }
}

let librosTrackeados
const librosGuardados = JSON.parse(localStorage.getItem("MisLibros"));
if (librosGuardados) {
    librosTrackeados = librosGuardados;
} else {
    librosTrackeados = []
}


//! Funcion: Agregar libros ISBN
const pedirDatos = async () => {
    let isbn = document.getElementById("isbn").value
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = await response.json();
        extraerInfoLibro(data)
        console.log(data);
        console.log(librosTrackeados);
        return data
        } catch (error) {
        console.log(error);
        }
};

const extraerInfoLibro = (libro) => {
    if(libro && libro.items && libro.items[0]) {
        let contadorLibro = librosTrackeados.length;
        let titulo = libro.items[0].volumeInfo.title;
        let autor = libro.items[0].volumeInfo.authors;
        let total_paginas = libro.items[0].volumeInfo.pageCount;
        librosTrackeados.push(new nuevoLibro(contadorLibro+1, titulo, autor, total_paginas, estado = "desconocido", progreso = 0));
        document.querySelector("form").reset();

        //* Local Storage
        localStorage.setItem("MisLibros", JSON.stringify(librosTrackeados));

        //* Alert 
        Swal.fire({
            title: "Gracias!",
            text: "Libro agregado exitosamente!",
            icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                transitionToPaginaSmoothly()
            }
        });
    } else {
        //* Alert 
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Libro no encontrado, ingrésalo manualmente.",
        });
    }
}

//! Boton inicializador: Agregar nuevo libro con ISBN
let boton_identificar_isbn = document.getElementById("identificar-isbn");
boton_identificar_isbn.addEventListener("click", pedirDatos);

//* Testing de isbn
// 9789188369376
// 9780141036694
// 9786287513525
// 9781802060959

//! Funcion: Agregar nuevo libro de forma manual
const agregarLibro = (e) => {
    let contadorLibro = librosTrackeados.length;
    e.preventDefault();
    let nuevo_libro = document.getElementById("libro").value;
    let autor_libro = document.getElementById("autor").value;
    let total_paginas = document.getElementById("totalpaginas").value;
    librosTrackeados.push(new nuevoLibro(contadorLibro+1,nuevo_libro, autor_libro, total_paginas, estado = "desconocido", progreso = 0));
    document.querySelector("form").reset();

    //* Local Storage
    localStorage.setItem("MisLibros", JSON.stringify(librosTrackeados));

    //* Alert 
    Swal.fire({
        title: "Gracias!",
        text: "Libro agregado exitosamente!",
        icon: "success"
    }).then((result) => {
        if (result.isConfirmed) {
            transitionToPaginaSmoothly()
        }
    });

}

//! Boton inicializador: Agregar nuevo libro de forma manual
let boton_agregar_libro = document.getElementById("nuevo-libro-manual");
boton_agregar_libro.addEventListener("click", agregarLibro)

let isbnInput = document.getElementById("isbn");

// Event listener for "Enter" key press in the input field
isbnInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission or other default behavior
        pedirDatos(); // Call your function when Enter is pressed
    }
});

//! Funcion: para cambio de pagina y reload mas smooth
const transitionToPaginaSmoothly = () => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = "tracker.html";
    }, 500); 
};