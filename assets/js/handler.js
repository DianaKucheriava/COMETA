var CompositesList = []
var ApplicationModelVar; 
console.log($('#RUSE').find(":selected").val());
$("#nextVal").click(function()
{
    // document.getElementById("elementwrapper").innerHTML="<br> <br>";
    var viewscount= parseInt(document.getElementById("viewscount").value);
    var reportscount =  parseInt(document.getElementById("reportscount").value);

    if(!viewscount>0 || !reportscount>0)
    {
        alert("error in input"); 
        return;
    }
//         $('#elementwrapper').children('input').each(function () {
//     alert(this.value); // "this" is the current element in the loop
// });
$(".viewsarea").append("<h5> insert views data</h5>")
// adding the number of screens and each one will add its number of screens and dataservers
for (var i =0; i<viewscount; i++)
{
$( ".viewsarea" ).append( " <input id='screens' type='number' min='1' class='form-control copier' placeholder='Number Of Screens'>" );
$( ".viewsarea" ).append( " <input id='servers' type='number' min='1' class='form-control copier' placeholder='Number Of Servers'>" );
$( ".viewsarea" ).append( " <input id='clients' type='number' min='1' class='form-control copier' placeholder='Number Of Clients'>" );
$(".viewsarea").append("<br>")
}

$(".viewsarea").append("<br>")

$(".reportsarea").append("<h5> insert reports data</h5>")

// adding the number of screens and each one will add its number of screens and dataservers
for (var i =0; i<reportscount; i++)
{
$( ".reportsarea" ).append( " <input id='sections' type='number' min='1' class='form-control copier' placeholder='Number Of Sections'>" );
$( ".reportsarea" ).append( " <input id='servers' type='number' min='1' class='form-control copier' placeholder='Number Of Servers'>" );
$( ".reportsarea" ).append( " <input id='clients' type='number' min='1' class='form-control copier' placeholder='Number Of Clients'>" );
$(".reportsarea").append("<br>")
}
document.getElementById("nextVal").remove(); 
$("#nextVal").fadeOut(function()
{

});

$( ".dataarea" ).append( " <br><br> <h5> Other Data</h5>  <input id='devtools' type='number' min='1' class='form-control copier' placeholder='Productivity'>" );
$( ".dataarea" ).append( " <input id='CASE' type='number' min='1' class='form-control copier' placeholder='CASE'>" );
$( ".dataarea" ).append( " <input id='reuse' type='number' min='1' class='form-control copier' placeholder='Reuse Percentage'> <br>" );

$('.reportsarea').append("<button onclick='AppModel()'  id='nextValtwo' type='button'  class='btn btn-primary btn-block btn-md'>Next Step</button> ")



});

function AppModel()
{
    var count =0; 
    var tempList = []; 
    var checkforvalidation; 
            $('.viewsarea').children('input').each(function () {
              
                if (!parseInt(this.value)>0)
                {
                    checkforvalidation=false; 
                }
                tempList.push(parseInt( this.value));
});
for (var i =0; i<tempList.length; i+=3)
{
    CompositesList.push(new AppComposite(tempList[i] , tempList[i+1] , tempList[i+2] , 1)); 
}



var tempList2 = []; 
$('.reportsarea').children('input').each(function () {
              
    if (!parseInt(this.value)>0)
    {
        checkforvalidation=false; 
    }
    tempList2.push(parseInt( this.value));
});
for (var i =0; i<tempList2.length; i+=3)
{
    CompositesList.push(new AppComposite(tempList2[i] , tempList2[i+1] , tempList2[i+2] , 2)); 
}

if (checkforvalidation==false)
{
    alert("error in inputs"); 
    CompositesList = [];
    return;
}

// $(".viewsarea").empty(); 
//sd
 


var finalList = []; 
$('.dataarea').children('input').each(function () {
              
    finalList.push(parseInt(this.value));
});
if (!finalList[0]>0 || !finalList[2]>0  || !finalList[1]>0 )
{
    alert("error in input"); 
    return;
}
B_Calculation(); 
ApplicationModelVar = new ApplicationModel(CompositesList , finalList[0] , finalList[1] , finalList[2]); 
ApplicationModelVar.b = B_Value; 
ApplicationModelVar.Calculation(); 
console.log(ApplicationModelVar); 
$(".reportsarea").fadeOut("slow");
$(".viewsarea").fadeOut("slow");
$(".dataarea").fadeOut("slow");

$("#interAP").text("AP is : " + ApplicationModelVar.AP);
$("#interNAP").text("NAP is : " + ApplicationModelVar.NAP); 
$("#interEffort").text("Effort is : " + ApplicationModelVar.effort); 
$("#interTime").text("Time is : " + ApplicationModelVar.time); 
$("#interPeople").text("People is : " + ApplicationModelVar.people); 
 
}



function IntermediateSelection() // this triggers when a selection is changed in the Selection element in my html.
{
var selection = document.getElementById("InterModelSelection"); 
if (selection.selectedIndex==1){

$('.ApplicationModel').toggle();
$('.ApplicationModel').addClass("toshow"); 
$(".ReuseModel").hide(); 
$(".EarlyDesignModel").hide(); 
$(".FunctionPointModel").hide();

}
else if (selection.selectedIndex == 2)
{
  //
 
  $(".ReuseModel").toggle(); 
  $(".ReuseModel").addClass("toshow");
  $(".ApplicationModel").hide(); 
  $(".EarlyDesignModel").hide(); 
  $(".FunctionPointModel").hide();
  
}
else if (selection.selectedIndex == 3)
{
    $(".EarlyDesignModel").toggle(); 
    $(".ReuseModel").addClass("toshow");
    $(".ApplicationModel").hide(); 
    $(".ReuseModel").hide();
}

else if (selection.selectedIndex == 4)
{

}

else
{

}
}


function ReuseModelCalculation()
{
    alert("clicked"); 
    var ASLOC = parseFloat(document.getElementById("ASLOC").value);
    var AT = parseFloat(document.getElementById("AT").value);
    var ATPROD = parseFloat(document.getElementById("ATPROD").value);
    var AAM = parseFloat(document.getElementById("AAM").value);

    if (AAM <0 || ASLOC <0 || AT <0 || ATPROD <0)
    {
        alert("Error in input"); 
        return; 
    }
    var ReuseModelVar = new ReuseModel(ASLOC , AT , ATPROD , AAM); 
    B_Calculation(); 

    ReuseModelVar.b = B_Value;
    if (ReuseModelVar.b == 0.91)
    {
        ReuseModelVar.b = 1.17; 
    }
    ReuseModelVar.Calculation(); 
    console.log(ReuseModelVar); 
}



function DesignModelCalculation()
{
var muls = []; 
muls.push($('#RCPX').find(":selected").val());
muls.push($('#RUSE').find(":selected").val());
muls.push($('#PDIF').find(":selected").val());
muls.push($('#PERS').find(":selected").val());
muls.push($('#PREX').find(":selected").val());
muls.push($('#FCIL').find(":selected").val());
muls.push($('#SCED').find(":selected").val());

var mul_answer =1; 
for (var i=0; i<muls.length; i++)
{
    mul_answer*=muls[i]; 
}
var Size = $("#size_design").val(); 
console.log(Size*2); 
console.log(mul_answer); 

var PM = 2.94 * Math.pow(Size , B_Value) * mul_answer;
console.log("PM" + PM );

var time = 3* (Math.pow(PM , (0.33+0.2*(B_Value-1.01)))); 

var people = PM/time; 

$(".designEffort").text("Effort of design model is " + Math.ceil(PM)); 
$(".designTime").text("Time of design model is " +Math.ceil(time)); 
$(".designPeople").text("People of design model is " + Math.ceil(people)); 

}



function FunctionPointCalculation()
{
    var UFP = 0 ; 
    UFP += document.getElementById("inputsSimple").value * 3; 
    UFP += document.getElementById("inputsAverage").value * 4; 
    UFP += document.getElementById("inputsComplex").value * 6; 

    UFP += document.getElementById("outputsSimple").value * 4; 
    UFP += document.getElementById("outputsAverage").value * 5; 
    UFP += document.getElementById("outputsComplex").value * 7; 

    UFP += document.getElementById("requestsSimple").value * 3; 
    UFP += document.getElementById("requestsAverage").value * 4; 
    UFP += document.getElementById("requestsComplex").value * 6; 


    UFP += document.getElementById("filesSimple").value * 7; 
    UFP += document.getElementById("filesAverage").value * 10; 
    UFP += document.getElementById("filesComplex").value * 15; 

    UFP += document.getElementById("externalsSimple").value * 5; 
    UFP += document.getElementById("externalsAverage").value * 7; 
    UFP += document.getElementById("externalsComplex").value * 10; 

    console.log(UFP);
    var validator = true; 
    var UD = 0; 
    $(".ComplexityFactors input").each(function() {
        UD +=this.value; 
        }
    );

    var FP = UFP * (0.65 + 0.01*UD); 

    console.log(FP); 

    if (validator==false)
    {
        alert("error in input"); 
        return; 
    }

    $(".FP").text("Function Point Calculation Result is equal to : " + FP); 

    
}



