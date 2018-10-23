
$("#IntermediateModelSelection").toggle(); 
$(".ReuseModel").toggle(); 
$('.EarlyDesignModel').toggle(); 
$('.FunctionPointModel').toggle(); 
class Data
{
    constructor(LOC) // побудуйє кількість рядків, заданих користувачем
    {
        this.a=[2.4 , 3 , 3.6]; 
        this.b=[1.05 , 1.12 , 1.20]; 
        this.c=[2.5,2.5,2.5]; 
        this.d=[0.38, 0.35,0.32]; 
        this.KLOC = LOC/1000; 
        this.LOC = LOC; 
        this.PM=null; 
        this.TDEV=null; 
        this.Productivity = null; 
        this.Staffing = null; 
        this.type=""; 
    }
    BasicModel() // basic model calculation, check the number of lines and apply the neccessary a,b,c,d attributes to the model calculation.
    {
        var temp =null; 
        if (this.LOC <=50000)
    {
        temp=0; 
        this.type = "Organic"; 
    }
    else if (this.LOC>50000 && this.LOC <=300000)
    {
        temp=1; 
        this.type="Semi-Detached"; 
    }
    else
    {
        temp=2; 
        this.type = "Embedded"; 
    }
    this.PM =Math.ceil( this.a[temp] * (Math.pow(this.KLOC , this.b[temp]))); // effort calcualtion
    this.TDEV =Math.ceil (this.c[temp] * (Math.pow(this.PM , this.d[temp]))); // Months needed , i cieled them all as a test, could be chnged here.

    this.Productivity =Math.round( this.LOC /this.PM); 
    this.Staffing =Math.ceil(this.PM / this.TDEV); 
    }
}
function Myfunc() // this triggers when a selection is changed in the Selection element in my html.
{
var selection = document.getElementById("ModelSelection"); 
if (selection.selectedIndex==1){
var btn = document.getElementById("calculate");
btn.disabled=false;  
var h1 = `
                      
    `;
document.getElementById("brb").innerHTML=h1;  
}
else if (selection.selectedIndex == 2)
{
    $("#IntermediateModelSelection").toggle(); 
}
else
{
$('.FunctionPointModel').toggle(); 
$(".ReuseModel").hide(); 
$(".ApplicationModel").hide(); 
$(".EarlyDesignModel").hide();     
}

}

function Calculate() //розрахунок базової моделі
{
    var Basic= new Data(parseInt(document.getElementById("LOC").value)); 
    Basic.BasicModel(); 
    document.getElementById("PM").innerText="Effort: " +  Basic.PM + " Man-Months";
    document.getElementById("TDEV").innerText="Schedule: " +  Basic.TDEV + " Months";
    document.getElementById("Productivity").innerText="Productivity: " + Basic.Productivity;
    document.getElementById("Staffing").innerText="Staffing: " + Basic.Staffing + " FSP";
    document.getElementById("type").innerText ="Type : " + Basic.type; 
}

function winOpen(){
var obj=document.getElementById("divWin").style;
obj.visibility="visible";
winOpen2(3, 0, obj);
 };
 
 