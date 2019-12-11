
// variables de uso global
var audio;
var canciones;
var maxDuracion;
var t;
// Cuando cargue la pagina
window.onload = function () {
    
    audio = document.getElementById('audio');
    // llamada a la función init
    init();
    // Ejecuta una función JavaScript cuando la posición de reproducción actual vaya cambiando
    audio.ontimeupdate = function () {
        // duración de la canción
        maxDuracion = document.getElementById("time").max = audio.duration;
        //  devuelve la posición actual (en segundos) de la reproducción de audio
        document.getElementById("time").value = audio.currentTime;
        
        //  maxDuración=audio.duration, devuelve NaN(Not-A-Number) cuando no tiene una canción seleccionada
        // y para que no aparecia en el HTML hago una condición  de que si me devuelve NaN el valor que me
        // escriba en el HTML sea 0
        if (isNaN(maxDuracion)) {
            document.getElementById("maxTiempo").innerHTML = 0;
            
            // como maxDuracion solo devuelve segundos y no quería que el tiempo de la reproducción de una 
            // canción aparecieran 100 segundos, hago el tratamiento para que aparezcan minutos y segundos
        } else if (maxDuracion > 60) {
            // Math.floor devuelve el máximo entero menor o igual a un número.
            var minutes = Math.floor(maxDuracion / 60);
            // Math.round() retorna el valor de un número redondeado al entero más cercano.
            var seconds = Math.round(maxDuracion % 60);
            // Genero una variable que almacenara una string con los datos obtenidos
            var result = minutes + "'" + seconds + '"';
            // Inserta en el HTML el tiempo máximo de la canción
            document.getElementById("maxTiempo").innerHTML = result;
            // Inserta en el HTML el tiempo que transcurre de la canción
            document.getElementById("tiempo").innerHTML = Math.round(audio.currentTime);
            // Si no cumple ninguna de las otras condiciones muestra en segundos la duración de la canción
        } else {
            document.getElementById("maxTiempo").innerHTML = Math.round(maxDuracion) + "s";
            document.getElementById("tiempo").innerHTML = Math.round(audio.currentTime);
        }

    };

};



function init() {
    
    var playlist = document.getElementById('playlist');
    canciones = playlist.getElementsByTagName('a');
    // Insertamos un valor a volumen de 0.10
    audio.volume = 0.10;

    //Agregamos los eventos a los links que nos permitirán cambiar de canción
    for (var pos in canciones) {
        var cancion = canciones[pos];
        if (typeof cancion === "function" || typeof cancion === "number") {
            continue;
        } else {
            cancion.addEventListener('click', function (e) {
                e.preventDefault();
                var song = this.getAttribute('href');
                run(song, audio, this);
            });
        }

    }

    //agregamos evento para reproducir la siguiente canción en la lista
    //si la canción es la ultima reproducir la primera otra vez
    audio.addEventListener('ended', function (e) {
        for (var pos in canciones) {
            var cancion = canciones[pos];
            var posNextCancion = parseInt(pos) + 1;
            if (typeof cancion === "function" || typeof cancion === "number")
                continue;
            if (!this.src)
                this.src = canciones[0];
            if (pos == (canciones.length - 1))
                posNextCancion = 0;
            console.log(posNextCancion);
            if (cancion.href === this.src) {
                var nextCancion = canciones[posNextCancion];
                run(nextCancion.getAttribute('href'), audio, nextCancion);
                break;
            }
        }
    });
}

function run(song, audio, link) {
    var parent = link.parentElement;
    //quitar el active de todos los elementos de la lista
    var items = parent.parentElement.getElementsByTagName('li');
    for (var item in items) {
        if (items[item].classList)
            items[item].classList.remove("active");
    }

    //agregar active a este elemento
    parent.classList.add("active");
    // inserta en el HTML el titulo de la canción que está sonando
    //  song.substring(7, song.length) extrae los caracteres de una cadena, entre dos índices especificados, y devuelve la nueva subcadena.
    // la canción me viene con la ruta donde está alojada que no me interesa mostrar, hago el substring para que solo muestre el nombre
    document.getElementById("cancion").innerHTML = song.substring(7, song.length);
    // Lo mismo que antes solo que lo inserta en la propiedad título que más adelante uso
    document.getElementById("cancion").title = song.substring(7, song.length);
    //tocar la cancion
    audio.src = song;
    audio.load();
    audio.play();
}


// función llamada por el botón play para reproducir la canción
function play() {

    audio.play();

}
// función llamada por el botón pause para pausar la canción
function pause() {

    audio.pause();

}
// función llamada por el botón stop para parar la canción
function stop() {
    audio.pause();
    audio.currentTime = 0;

}        
// función llamada por el botón nextSong para saltar a la siguiente canción
function nextSong() {
    var tituloCancion = document.getElementById("cancion").title;
    for (var pos in canciones) {
        var cancion = canciones[pos];
        var posNextCancion = parseInt(pos) + 1;
        // Si está en el final de la lista de reproducción y le volvemos a dar
        // pasa a la primera canción
        if (pos == (canciones.length - 1)) {
            posNextCancion = 0;
        }
        //tituloCancion.replace(".mp3", "") busca si el string contiene el valor que se le pasa en 
        // este caso .mp3 y lo remplaza por ""(que es nada), esto me sirve para comparar valores
        if (cancion.outerText == tituloCancion.replace(".mp3", "")) {
            var nextCancion = canciones[posNextCancion];
            run(nextCancion.getAttribute('href'), audio, nextCancion);
            break;
        }

    }

}
// función llamada por el botón preSong para volver a la anterior canción
function preSong() {
    var tituloCancion = document.getElementById("cancion").title;
    for (var pos in canciones) {
        var cancion = canciones[pos];
        var posNextCancion = parseInt(pos) - 1;
        // Si está en el principio de la lista de reproducción y le volvemos a dar
        // se matiene en la primera canción
        if (posNextCancion < 0) {
            posNextCancion = 0;
        }
        if (cancion.outerText == tituloCancion.replace(".mp3", "")) {
            var nextCancion = canciones[posNextCancion];
            run(nextCancion.getAttribute('href'), audio, nextCancion);
            break;
        }

    }

}
// función llamada por el botón volumenP para subir el volumen de la canción
function volumenP() {

    var volumen = audio.volume;

    volumen += 0.1;
    if (volumen > 1) {
        volumen = 1;
    }
    audio.volume = volumen;

}
// función llamada por el botón volumenM para disminuir el volumen de la canción
function volumenM() {

    var volumen = audio.volume;

    volumen -= 0.1;
    if (volumen < 0) {
        volumen = 0;
    }
    audio.volume = volumen;

}
// función llamada por el botón muted para mutear o silenciar el volumen de la canción
function muted() {

    if (audio.muted === false) {
        audio.muted = true;
    } else {
        audio.muted = false;
    }

}
// función llamada por el botón loop para que entre en bucle la canción
function loop() {

    if (audio.loop === false) {
        audio.loop = true;
    } else {
        audio.loop = false;
    }

}
// función llamada al arrastrar la barra de desplazamiento de la canción
// recibe el obj event
function buscar(event) {
    // event.clientX devuelve el punto de la posición en X de la pantalla
    var mX = event.clientX;
    // resto -110 a prueba y error pues la barra de desplazamiento no está pegada
    // al margen izquiedo de la pantalla, resto la separación mnás o menos que hay
    var x = mX - 110;
    
    // Este calculo es una regla de 3 que me dice a que segundos se tiene que poner la canción
    // según sea de larga
    var calculo = (x * maxDuracion) / 100;
    document.getElementById("time").value = x + "px";
    audio.currentTime = calculo;

}
