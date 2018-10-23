var organico = document.getElementById("organico");
var moderado = document.getElementById("moderado");
var embebido = document.getElementById("embebido");

var optModelo = 0;
var start = false;
$(".contenedor-ecuaciones").toggle(false);
$(".resultado-contenedor").toggle(false);
$("#restablecer").toggle(false);
$(".titulo-ecuaciones").css("background-color","#ddd");


organico.addEventListener("click", function () {
    optModelo = 1;
    $(".organico").css("background-color", "tomato");
    $(".moderado").css("background-color", "white");
    $(".embebido").css("background-color", "white"); 
    $(".fila-organico").toggle(true);   
    $(".fila-moderado").toggle(false);
    $(".fila-empotrado").toggle(false);
});


moderado.addEventListener("click", function() {
    optModelo = 2;
    $(".moderado").css("background-color", "tomato");
    $(".organico").css("background-color", "white");
    $(".embebido").css("background-color", "white");
    $(".fila-moderado").toggle(true);     
    $(".fila-organico").toggle(false);
    $(".fila-empotrado").toggle(false);    
});

embebido.addEventListener("click", function() {
    optModelo = 3;
    $(".embebido").css("background-color", "tomato");
    $(".moderado").css("background-color", "white");
    $(".organico").css("background-color", "white");
    $(".fila-empotrado").toggle(true); 
    $(".fila-moderado").toggle(false);
    $(".fila-organico").toggle(false);
});


var calcular = document.getElementById("calcular");

calcular.addEventListener("click", function() {
    'use strict';
    var kldc, salario, lineasCodigo, esfuerzo, tiempoDesarrollo, personas, costoTotalProyecto;
        
    start = true;
    $(".contenedor-main").toggle(300,"linear");
    $("#restablecer").toggle(300, "linear");
    if (optModelo == 1) {
        kldc = document.getElementById("kldc");
        salario = document.getElementById("salario");

        lineasCodigo = kldc.value; // Lineas de codigo en miles
        console.log(lineasCodigo);
        esfuerzo = 2.4 * Math.pow(lineasCodigo/1000,1.05); // Personas necesarias por mes para llevar adelante el proyecto
        tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.38); // Tiempo de desarrollo del proyecto en meses
        personas = esfuerzo/tiempoDesarrollo; //Personas necesarias para realizar el proyecto

        costoTotalProyecto = esfuerzo * salario.value;

        document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " місяць(і)";
        document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " люд./міс.";
        document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " гр.од.";
        $("#calcular").toggle(300, "linear");
        $(".contenedor-ecuaciones").toggle(300,"linear");
        $(".resultado-contenedor").toggle(300, "linear");
        //$(".fila-organico").css("background-color", "#ddd");
    }
    else {
        if (optModelo == 2) {
            kldc = document.getElementById("kldc");
            salario = document.getElementById("salario");

            lineasCodigo = kldc.value; // Lineas de codigo en miles
            esfuerzo = 3.0 * Math.pow(lineasCodigo/1000,1.12); // Personas necesarias por mes para llevar adelante el proyecto
            tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.35); // Tiempo de desarrollo del proyecto
            personas = esfuerzo/tiempoDesarrollo; //Personas necesarias para realizar el proyecto

            costoTotalProyecto = esfuerzo * salario.value;

            document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " meses";
            document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " personas-mes";
            document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " soles";
            $("#calcular").toggle(300, "linear");
            $(".contenedor-ecuaciones").toggle(300,"linear");
            $(".resultado-contenedor").toggle(300, "linear");
            //$(".fila-moderado").css("background-color", "#ddd");
        }
        else
        {
            if (optModelo == 3) {
                kldc = document.getElementById("kldc");
                salario = document.getElementById("salario");

                lineasCodigo = kldc.value; // Lineas de codigo en miles
                esfuerzo = 3.6 * Math.pow(lineasCodigo/1000,1.20); // Personas necesarias por mes para llevar adelante el proyecto
                tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.32); // Tiempo de desarrollo del proyecto
                personas = esfuerzo/tiempoDesarrollo; //Personas necesarias para realizar el proyecto

                costoTotalProyecto = esfuerzo * salario.value;

                document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " meses";
                document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " personas -mes";
                document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " meses";
                $("#calcular").toggle(300, "linear");
                $(".contenedor-ecuaciones").toggle(300,"linear");
                $(".resultado-contenedor").toggle(300, "linear");
                //$(".fila-empotrado").css("background-color", "#ddd");
            }
        }       
    }
});

var restablecer = document.getElementById("restablecer");

restablecer.addEventListener("click", function () {
    $(".contenedor-main").toggle(300,"linear");
    $(".resultado-contenedor").toggle(300, "linear");
    $("#calcular").toggle(300, "linear");
    $(".contenedor-ecuaciones").toggle(false);
    $("#restablecer").toggle(false);
});