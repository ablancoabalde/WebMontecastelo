
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Tarea 4.1</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <script src="js/funcionesBotones.js"></script>
        <link rel="stylesheet" type="text/css" href="css/estilos.css">
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

            <div class="titulo">
                <h3>Tarea 4.1 Audio</h3> 
            </div>
        </nav>

        <div class="menu">


            <div class="botonera">
                <div class="top">
                    <audio id = "audio" preload = "auto">

                    </audio>
                    <p class="mod">Canción:   <strong id="cancion"></strong></p>
                    <p class="mod">Tiempo: <input type="range" id="time" step=".1" min="0" max="0" value="0" onclick="buscar(event)">
                        <strong id="tiempo"></strong>/<strong id="maxTiempo"></strong></p>
                </div>

                <div class="bottom">
                    <button class="boton" onclick = "play()" type="button">
                        <img src="icons/play_circle_outline-24px.svg" alt="Play" />
                    </button>
                    <button class="boton" onclick = "pause()" type="button"> 
                        <img src="icons/pause_circle_outline-24px.svg" alt="Pause" />
                    </button>
                    <button class="boton" onclick = "stop()" type="button"> 
                        <img src="icons/stop-24px.svg" alt="Stop" />
                    </button>    
                    <button class="boton" onclick = "preSong()" type="button"> 
                        <img src="icons/skip_previous-24px.svg" alt="Previous Song" />
                    </button>
                    <button class="boton" onclick = "nextSong()" type="button"> 
                        <img src="icons/skip_next-24px.svg" alt="Next Song" />
                    </button>
                    <button class="boton" onclick="volumenP()" type="button">                   
                        <img src="icons/volume_up-24px.svg" alt="Volume Up" />
                    </button> 
                    <button class="boton" onclick="volumenM()" type="button"> 
                        <img src="icons/volume_down-24px.svg" alt="Volume Down" />
                    </button> 
                    <button class="boton" onclick="muted()" type="button"> 
                        <img src="icons/volume_mute-24px.svg" alt="Mute" />
                    </button>
                    <button class="boton" sonclick="loop()" type="button"> 
                        <img src="icons/repeat-24px.svg" alt="Loop" />  
                    </button>
                </div>






            </div> 

            <ul id="playlist">


                <?php
                // ruta donde están los audios
                $directorio = 'audios/';
                //scandir Enumera los ficheros y directorios ubicados en la ruta especificada.
                // Devuelve un array con los nombres de los ficheros en caso de éxito, o FALSE en caso de error. 
                $ficheros1 = scandir($directorio);
                // recorremos el array para indentificar que archivos son mp3
                foreach ($ficheros1 as $fileinfo) {
                    // pathinfo nos devuelve información acerca del archivo
                    // con PATHINFO_EXTENSION devuelve solo el nombre del archivo
                    if (pathinfo($fileinfo, PATHINFO_EXTENSION) == "mp3") {
                        ?>
                        <li >
                            <a href="audios/<?php echo $fileinfo; ?>">
                                <p><?php echo pathinfo($fileinfo, PATHINFO_FILENAME); ?></p>
                            </a>

                        </li>
                        <?php
                    }
                }
                ?>

            </ul>



        </div>

        <footer class="footer mt-auto py-3">

            <p> &copy;Cuarta Tarea parte 1 realizada para el Fp DAW por Alberto Blanco</p>

        </footer><!-- /footer --> 

    </body>

</html>

