
/* global DBDeleteRequest */

var bd;

window.addEventListener("load", iniciar, false);

function iniciar() {

    zonatabla = document.getElementById("tabla");
    botonInsertar = document.getElementById("insertar");
    botonActualizar = document.getElementById("actualizar");
    botonVaciarBD = document.getElementById("vaciar");
    botonBorrar = document.getElementById("borrar");
    txtTarea = document.getElementById("tarea");
    txtUrgencia = document.getElementById("urgencia");


    botonInsertar.addEventListener("click", agregarObjeto, false);
    botonActualizar.addEventListener("click", actualizarObjeto, false);
    botonVaciarBD.addEventListener("click", vaciarBD, false);
    botonBorrar.addEventListener("click", eliminarBD, false);


    var solicitud = window.indexedDB.open("misTareas");

    solicitud.onsuccess = function (e) {
        bd = e.target.result;
        mostrar();
    };
    solicitud.onupgradeneeded = function (e) {
        bd = e.target.result;
        bd.createObjectStore("tareas", {keyPath: "tarea"});

    };

}

function agregarObjeto() {
    var tarea = document.getElementById("tarea").value;
    var urgencia = document.getElementById("urgencia").value;

    var transaccion = bd.transaction(["tareas"], "readwrite");

    var almacen = transaccion.objectStore("tareas");

    var agregar = almacen.add({tarea: tarea, urgencia: urgencia});

    agregar.addEventListener("success", mostrar, false);

}

function actualizarObjeto() {
    var tarea = document.getElementById("tarea").value;
    var urgencia = document.getElementById("urgencia").value;

    var transaccion = bd.transaction(["tareas"], "readwrite");

    var almacen = transaccion.objectStore("tareas");

    var actualizar = almacen.put({tarea: tarea, urgencia: urgencia});

    actualizar.addEventListener("success", mostrar, false);

}

function vaciarBD() {
    var transaccion = bd.transaction(["tareas"], "readwrite");

    var almacen = transaccion.objectStore("tareas");

    var borrar = almacen.clear();

    borrar.addEventListener("success", mostrar, false);

}

function eliminarBD() {
    bd.close();
    var DBDeleteRequest = window.indexedDB.deleteDatabase("misTareas");
    DBDeleteRequest.onerror = function (event) {
        console.log("Error al eliminar la base de datos.");
        alert("Error al eliminar la base de datos.");
    };

    DBDeleteRequest.onsuccess = function (event) {
        console.log("Base de datos eliminada.");
        alert("Base de datos eliminada.");
        console.log(event.result); // should be undefined
        mostrar();
    };

}

function mostrar() {

    zonatabla.innerHTML = "";

    var transaccion = bd.transaction(["tareas"], "readonly");

    var almacen = transaccion.objectStore("tareas");

    var cursor = almacen.openCursor();

    cursor.addEventListener("success", mostrarDatos, false);
}

function mostrarDatos(e) {

    var cursor = e.target.result;
    limpiar();
    if (cursor) {
        zonatabla.insertRow(-1).innerHTML = "<tr>" + "<th>" + cursor.value.tarea + "</th>" + "<th>" + cursor.value.urgencia + "</th>" + "</tr>";
        cursor.continue();
    }

}

function limpiar() {
    txtTarea.value = '';
    txtUrgencia.value = '';
}

