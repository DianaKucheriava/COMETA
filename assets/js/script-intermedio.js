var organico = document.getElementById("organico");
var moderado = document.getElementById("moderado");
var embebido = document.getElementById("embebido");
var calcular = document.getElementById("calcular");

var rss = document.getElementById("rss");
var tbd = document.getElementById("tbd");
var cpr = document.getElementById("cpr");
var rte = document.getElementById("rte");
var rmp = document.getElementById("rmp");
var vmc = document.getElementById("vmc");
var trc = document.getElementById("trc");
var can = document.getElementById("can");
var ean = document.getElementById("ean");
var cpro = document.getElementById("cpro");
var eso = document.getElementById("eso");
var elp = document.getElementById("elp");
var utp = document.getElementById("utp");
var uhs = document.getElementById("uhs");
var rlp = document.getElementById("rlp");


var rssValue, tbdValue, cprValue, rteValue, rmpValue, vmcValue, trcValue, canValue, eanValue, cproValue, esoValue, elpValue, utpValue, uhsValue, rlpValue;

var option = 0;

function calculandoConductores() {
    'use strict';
     rssValue = rss.options[rss.selectedIndex].value;
     tbdValue = tbd.options[tbd.selectedIndex].value;
     cprValue = cpr.options[cpr.selectedIndex].value;
     rteValue = rte.options[rte.selectedIndex].value;
     rmpValue = rmp.options[rmp.selectedIndex].value;
     vmcValue = vmc.options[vmc.selectedIndex].value;
     trcValue = trc.options[trc.selectedIndex].value;
     canValue = can.options[can.selectedIndex].value;
     eanValue = ean.options[ean.selectedIndex].value;
     cproValue = cpro.options[cpro.selectedIndex].value;
     esoValue = eso.options[eso.selectedIndex].value;
     elpValue = elp.options[elp.selectedIndex].value;
     utpValue = utp.options[utp.selectedIndex].value;
     uhsValue = uhs.options[uhs.selectedIndex].value;
     rlpValue = rlp.options[rlp.selectedIndex].value;
}

var start = false;
$(".contenedor-ecuaciones").toggle(false);
$(".resultado-contenedor").toggle(false);
$("#restablecer").toggle(false);
$(".titulo-ecuaciones").css("background-color","#ddd");


organico.addEventListener("click", function () {

    option = 1;
    $(".organico").css("background-color", "tomato");
    $(".moderado").css("background-color", "white");
    $(".embebido").css("background-color", "white");
    $(".fila-organico").toggle(true);
    $(".fila-moderado").toggle(false);
    $(".fila-empotrado").toggle(false);
    if (start) {
        
        calculandoConductores();

        var kldc = document.getElementById("kldc");
        var salario = document.getElementById("salario");

        var lineasCodigo = kldc.value; 
        var fec = rssValue*tbdValue*cprValue*rteValue*rmpValue*vmcValue*trcValue*canValue*eanValue*cproValue*esoValue*elpValue*utpValue*uhsValue*rlpValue;
        var esfuerzo = 3.2 * Math.pow(lineasCodigo/1000,1.05) * fec; 
        var tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.38); 
        var personas = esfuerzo/tiempoDesarrollo; 
        var costoTotalProyecto = esfuerzo * salario.value;

        document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " місяць(і)";
        document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " люд./міс.";
        document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " гр.од.";
      
    }
});

moderado.addEventListener("click", function () {
    option = 2;
    $(".organico").css("background-color", "white");
    $(".moderado").css("background-color", "tomato");
    $(".embebido").css("background-color", "white");
    $(".fila-moderado").toggle(true);
    $(".fila-organico").toggle(false);
    $(".fila-empotrado").toggle(false); 
    if (start) {
           
        calculandoConductores();

        var kldc = document.getElementById("kldc");
        var salario = document.getElementById("salario");

        var lineasCodigo = kldc.value; 
        var fec = rssValue*tbdValue*cprValue*rteValue*rmpValue*vmcValue*trcValue*canValue*eanValue*cproValue*esoValue*elpValue*utpValue*uhsValue*rlpValue;
        var esfuerzo = 3.0 * Math.pow(lineasCodigo/1000,1.12) * fec; 
        console.log(fec);
        var tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.35); 
        var personas = esfuerzo/tiempoDesarrollo; 
        var costoTotalProyecto = esfuerzo * salario.value;

        document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " місяць(і)";
        document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " люд./міс.";
        document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " гр.од.";      
        
    }
});

embebido.addEventListener("click", function () {
    option = 3;
    $(".organico").css("background-color", "white");
    $(".moderado").css("background-color", "white");
    $(".embebido").css("background-color", "tomato");
    $(".fila-empotrado").toggle(true);
    $(".fila-moderado").toggle(false);
    $(".fila-organico").toggle(false);
    if (start) {
        
        calculandoConductores();

        var kldc = document.getElementById("kldc");
        var salario = document.getElementById("salario");

        var lineasCodigo = kldc.value; 
        var fec = rssValue*tbdValue*cprValue*rteValue*rmpValue*vmcValue*trcValue*canValue*eanValue*cproValue*esoValue*elpValue*utpValue*uhsValue*rlpValue;
        var esfuerzo = 2.8 * Math.pow(lineasCodigo/1000,1.20) * fec; 
        var tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.32); 
        var personas = esfuerzo/tiempoDesarrollo; 

        var costoTotalProyecto = esfuerzo * salario.value;

        document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " місяць(і)";
        document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " люд./міс. ";
        document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " гр.од.";
       
    }
});

calcular.addEventListener("click", function() {
    start = true;
    $("#calcular").toggle(300, "linear");
    $("#restablecer").toggle(300, "linear");
    $(".contenedor-ecuaciones").toggle(300, "linear");
    $(".resultado-contenedor").toggle(300, "linear");
    $(".opciones-contenedor").toggle(300,"linear");
    $(".conductores-coste").toggle(300,"linear");
    $(".contenedor-instrucciones").toggle(300,"linear");
    $(".contenedor-entradas").toggle(300,"linear");
    if (option == 1) {
        calculandoConductores();

        kldc = document.getElementById("kldc");
        salario = document.getElementById("salario");

        lineasCodigo = kldc.value;  
        fec = rssValue*tbdValue*cprValue*rteValue*rmpValue*vmcValue*trcValue*canValue*eanValue*cproValue*esoValue*elpValue*utpValue*uhsValue*rlpValue;
        esfuerzo = 3.2 * Math.pow(lineasCodigo/1000,1.05) * fec;  
        tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.38); 
        personas = esfuerzo/tiempoDesarrollo; 
        costoTotalProyecto = esfuerzo * salario.value;

        document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " місяць(і)";
        document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " люд./міс.";
        document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " гр.од.";
    } else {
        if (option == 2) {
            calculandoConductores();

            kldc = document.getElementById("kldc");
            salario = document.getElementById("salario");

            lineasCodigo = kldc.value; 
           fec = rssValue*tbdValue*cprValue*rteValue*rmpValue*vmcValue*trcValue*canValue*eanValue*cproValue*esoValue*elpValue*utpValue*uhsValue*rlpValue;
            esfuerzo = 3.0 * Math.pow(lineasCodigo/1000,1.12) * fec; 
            console.log(fec);
            tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.35); 
            personas = esfuerzo/tiempoDesarrollo; 
            costoTotalProyecto = esfuerzo * salario.value;

            document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " місяць(і)";
            document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " люд./міс.";
            document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " гр.од.";
        }
        else {
            if (option == 3) {
                calculandoConductores();

                kldc = document.getElementById("kldc");
                salario = document.getElementById("salario");

                lineasCodigo = kldc.value; 
                fec = rssValue*tbdValue*cprValue*rteValue*rmpValue*vmcValue*trcValue*canValue*eanValue*cproValue*esoValue*elpValue*utpValue*uhsValue*rlpValue;
                esfuerzo = 2.8 * Math.pow(lineasCodigo/1000,1.20) * fec; 
                tiempoDesarrollo = 2.5 * Math.pow(esfuerzo, 0.32); 
                personas = esfuerzo/tiempoDesarrollo; 

                costoTotalProyecto = esfuerzo * salario.value;

                document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " місяць(і)";
                document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " люд./міс.";
                document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " гр.од.";
            }
        }
    }
});

var restablecer = document.getElementById("restablecer");

restablecer.addEventListener("click", function () {
    $("#calcular").toggle(300, "linear");
    $("#restablecer").toggle(300, "linear");
    $(".resultado-contenedor").toggle(300, "linear");
    $(".opciones-contenedor").toggle(300,"linear");
    $(".conductores-coste").toggle(300,"linear");
    $(".contenedor-instrucciones").toggle(300,"linear");
    $(".contenedor-entradas").toggle(300,"linear");
    $(".contenedor-ecuaciones").toggle(300, "linear");
});