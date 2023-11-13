//! Funcion Inicializadora
let boton_empezar_proceso = document.getElementById("empezar");

function start_tracking() {
    window.location.href = "pages/tracker.html";
}

boton_empezar_proceso.addEventListener("click", start_tracking);