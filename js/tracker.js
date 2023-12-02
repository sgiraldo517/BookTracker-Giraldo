//! Funcion Inicializadora
let boton_empezar_proceso = document.getElementById("ir-a-book-finder");

function start_tracking() {
    window.location.href = "buscadorlibro.html";
}

boton_empezar_proceso.addEventListener("click", start_tracking);

//! Funcion: Consultar Local Storage y mostrar libros existentes
const mostrarLibrosExistentes = () => {
    const librosGuardados = JSON.parse(localStorage.getItem("MisLibros"));
    if (librosGuardados) {
        librosTrackeados = librosGuardados;
        librosGuardados.forEach((libro) => {
            crearCard(libro);
        });
    }
    addEventListenersToButtons()
};
window.addEventListener("load", mostrarLibrosExistentes);

//! Funcion: crear card
const crearCard = (libro) => {
    let cards_libros_agregados = document.getElementById("seccion-cards");
    const nueva_carta = `
        <div class="col">
            <div class="card cards-tracker">
                <div class="card-body">
                    <h5 class="card-title"><span>Titulo </span>${libro.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary"><span>Autor </span>${libro.autor}</h6>
                    <p class="card-text">Total Paginas: ${libro.numeroTotalPaginas}</p>
                    <p class="card-text">Estado: ${libro.estado}</p>
                    <p class="card-text">Total Progreso: ${libro.progreso}%</p>
                    <button id="agregar_progreso_libro_${libro.id}" class="btn btn-light button_main" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        Agregar progreso
                    </button>
                </div>
            </div>
        </div>
    `;

    cards_libros_agregados.innerHTML += nueva_carta;
};

//! Boton inicializador: Agregar progreso
const offCanvasId = "offcanvasExample";
const offCanvas = new bootstrap.Offcanvas(document.getElementById(offCanvasId));

const addEventListenersToButtons = () => {
    librosTrackeados.forEach((libro) => {
        const boton_agregar_progreso = document.getElementById(`agregar_progreso_libro_${libro.id}`);
        boton_agregar_progreso.addEventListener("click", () => {
            offCanvas.show();
            crearOffCanvascontent(libro);
        });
    });
};

//! Funcion: Crear contenido del offcanvas segun el libro seleccionado
const crearOffCanvascontent = (libro) => {
    let offcanvas_agregar_progreso = document.getElementById("offcanvas_bodycontent");
    const offcanvas_body = `
        <div class="form-floating mb-3">
            <input type="number" id="totalpaginasleidas_${libro.id}" class="form-control input-main" placeholder="Total paginas">
            <label for="totalpaginasleidas_${libro.id}" class="input-main-label">Paginas leidas</label>
        </div>
        <select class="form-select" aria-label="Default select example" id="estado_${libro.id}">
            <option selected>Estado</option>
            <option value="Recien agregado">Recien agregado</option>
            <option value="En progreso">En progreso</option>
            <option value="Terminado">Terminado</option>
        </select>
        <button type="submit" class="btn btn-light button_main" id="registar-progreso_${libro.id}">Aceptar</button>
    `;
    offcanvas_agregar_progreso.innerHTML = offcanvas_body;
    agregarProgresoLibro(libro)
};

//! Funcion: Agregar Progreso
const agregarProgresoLibro = (libro) => {
    const boton_guardar_progreso = document.getElementById(`registar-progreso_${libro.id}`);
    boton_guardar_progreso.addEventListener("click", () => {
            const paginasLeidas = document.getElementById(`totalpaginasleidas_${libro.id}`).value;
            const estado = document.getElementById(`estado_${libro.id}`).value;

            libro.estado = estado;
            libro.progreso = parseFloat(((paginasLeidas / libro.numeroTotalPaginas) * 100).toFixed(2));

            //* Update los valores en Local Storage
            localStorage.setItem("MisLibros", JSON.stringify(librosTrackeados));

            //* Cerrar Offcanvas
            offCanvas.hide();
            updateCardLibrosExistentes()
    });
};

const updateCardLibrosExistentes = () => {
    Swal.fire({
        title: "Continua así",
        text: "Tu progreso se ha guardado exitosamente!",
        icon: "success",
        confirmButtonText: "Ok"
    }).then((result) => {
        if (result.isConfirmed) {
            reloadPaginaSmoothly();
        }
    });
};

const reloadPaginaSmoothly = () => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        location.reload();
    }, 500); 
};