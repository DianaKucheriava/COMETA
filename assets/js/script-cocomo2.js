var kldc = document.getElementById("kldc");
var salario = document.getElementById("salario");

//драйвери витрат
var rss = document.getElementById("rss");
var tbd = document.getElementById("tbd");
var cpr = document.getElementById("cpr");
var ruse = document.getElementById("ruse");
var doc = document.getElementById("doc");
var rte = document.getElementById("rte");
var rmp = document.getElementById("rmp");
var vmc = document.getElementById("vmc");
var can = document.getElementById("can");
var epla = document.getElementById("epla");
var elp = document.getElementById("elp");
var uhs = document.getElementById("uhs");
var eapl = document.getElementById("eapl");
var cpro = document.getElementById("cpro");
var cper = document.getElementById("cper");
var rpl = document.getElementById("rpl");
var dms = document.getElementById("dms");

var rssValue, tbdValue, cprValue, ruseValue, docValue, rteValue, rmpValue, vmcValue, canValue, eplaValue, elpValue, uhsValue, eaplValue, cproValue, cperValue, rplValue, dmsValue;

//Фактори масштабу

var prec = document.getElementById("prec");
var flex = document.getElementById("flex");
var resl = document.getElementById("resl");
var team = document.getElementById("team");
var pmat = document.getElementById("pmat");

var precValue, flexValue, reslValue, teamValue, pmatValue;

$(".resultado-contenedor").toggle(false);
$("#restablecer").toggle(false);
$(".contenedor-ecuaciones").toggle(false);
$(".titulo-ecuaciones").css("background-color", "#ddd");




var calcular = document.getElementById("calcular");

calcular.addEventListener("click", function () {
  var lineasCodigo = kldc.value;
  var costo = salario.value;
  var factoresDeEscala = getValuesEscala();
  var conductoresCosto = getValuesFEC();

  var esfuerzo = calcularEsfuerzo(lineasCodigo, factoresDeEscala, conductoresCosto);
  var tiempoDesarrollo = calcularTiempo(esfuerzo, factoresDeEscala);
  var costoTotalProyecto = esfuerzo * costo;
  document.getElementById("tiempoDesarrollo").innerHTML = Math.ceil(tiempoDesarrollo.toFixed(2)) + " місяць(і)";
  document.getElementById("personasNecesarias").innerHTML = Math.ceil(esfuerzo.toFixed(2)) + " люд./міс.";
  document.getElementById("costoTotal").innerHTML = costoTotalProyecto.toFixed(2) + " гр.од.";

  $(".contenedor-instrucciones").toggle(300,"linear");
  $(".contenedor-entradas").toggle(300,"linear");
  $(".factores-escala").toggle(300,"linear");
  $(".conductores-coste").toggle(300,"linear");
  $(".resultado-contenedor").toggle(300, "linear");
  $("#calcular").toggle(300, "linear");
  $("#restablecer").toggle(300, "linear");
  $(".contenedor-ecuaciones").toggle(300,"linear");

});

function calcularEsfuerzo(kldc, factoresEscala, fec) {
  var exp = 0.91 + factoresEscala/100;
  var esf = 2.94 * fec * Math.pow(kldc/1000, exp);
  return esf;
}

function calcularTiempo(esfuerzo, factoresEscala) {
  var exp = 0.28 + (0.2 * factoresEscala/100);
  var tiempoDesarrollo = 3.67 * Math.pow(esfuerzo, exp);
  
  return tiempoDesarrollo;
}

function getValuesFEC() {
  rssValue = Number(rss.options[rss.selectedIndex].value);
  tbdValue = Number(tbd.options[tbd.selectedIndex].value);
  cprValue = Number(cpr.options[cpr.selectedIndex].value);
  ruseValue = Number(ruse.options[ruse.selectedIndex].value);
  docValue = Number(doc.options[doc.selectedIndex].value);
  rteValue = Number(rte.options[rte.selectedIndex].value);
  rmpValue = Number(rmp.options[rmp.selectedIndex].value);
  vmcValue = Number(vmc.options[vmc.selectedIndex].value);
  canValue = Number(can.options[can.selectedIndex].value);
  eplaValue = Number(epla.options[epla.selectedIndex].value);
  uhsValue = Number(uhs.options[uhs.selectedIndex].value);
  eaplValue = Number(eapl.options[eapl.selectedIndex].value);
  cproValue = Number(cpro.options[cpro.selectedIndex].value);
  cperValue = Number(cper.options[cper.selectedIndex].value);
  rplValue = Number(rpl.options[rpl.selectedIndex].value);
  dmsValue = Number(dms.options[dms.selectedIndex].value);
  elpValue = Number(elp.options[elp.selectedIndex].value);

  var fec = rssValue + tbdValue + cprValue + ruseValue + docValue + rteValue + rmpValue + vmcValue + canValue + eplaValue + uhsValue + eaplValue + cproValue + cperValue + rplValue + dmsValue + elpValue;

  return fec;
}

function getValuesEscala() {
  precValue = Number(prec.options[prec.selectedIndex].value);
  flexValue = Number(flex.options[flex.selectedIndex].value);
  reslValue = Number(resl.options[resl.selectedIndex].value);
  teamValue = Number(team.options[team.selectedIndex].value);
  pmatValue = Number(pmat.options[pmat.selectedIndex].value);

  var factoresEscala = precValue + flexValue + reslValue + teamValue + pmatValue; 

  return factoresEscala;
}

var restablecer = document.getElementById("restablecer");

restablecer.addEventListener("click", function () {
  $(".contenedor-instrucciones").toggle(300,"linear");
  $(".contenedor-entradas").toggle(300,"linear");
  $(".factores-escala").toggle(300,"linear");
  $(".conductores-coste").toggle(300,"linear");
  $("#calcular").toggle(300, "linear");
  $("#restablecer").toggle(300, "linear");
  $(".resultado-contenedor").toggle(false);
  $(".contenedor-ecuaciones").toggle(false);
});