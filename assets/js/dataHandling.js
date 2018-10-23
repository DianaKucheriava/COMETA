$('.ApplicationModel').toggle(); 
var bArray = new Array(6); 
for (var i=0; i<bArray.length; i++)
{
    bArray[i] = new Array(5); 
}
bArray[0][0] = 6.2;
bArray[0][1] = 4.96; 
bArray[0][2] = 3.72; 
bArray[0][3] = 2.48; 
bArray[0][4] = 1.24; 
bArray[0][5] = 0; 


bArray[1][0] = 5.07; 
bArray[1][1] = 4.05; 
bArray[1][2] = 3.04; 
bArray[1][3] = 2.03; 
bArray[1][4] = 2.03; 
bArray[1][5] = 0; 

bArray[2][0] = 7.07; 
bArray[2][1] = 5.65; 
bArray[2][2] = 4.24; 
bArray[2][3] = 2.83; 
bArray[2][4] = 1.41; 
bArray[2][5] = 0; 

bArray[3][0] = 5.48; 
bArray[3][1] = 4.38; 
bArray[3][2] = 3.29; 
bArray[3][3] = 2.19; 
bArray[3][4] = 1.10; 
bArray[3][5] = 0;

bArray[4][0] = 7.8; 
bArray[4][1] = 6.24; 
bArray[4][2] = 4.68; 
bArray[4][3] = 3.12; 
bArray[4][4] = 1.56; 
bArray[4][5] = 0;

Names = new Array(4); 
Names[0]="Precedentness"; 
Names[1]="Development Flexibility"; 
Names[2]="Risk Resolution"; 
Names[3]="Team Cohesion"; 
Names[4]="Process Maturity"; 


console.log(bArray); 


for (var j =0; j<5; j++)
{
var tr = document.createElement("tr");
var td = document.createElement("td");
// var btn = document.createElement("button"); 
var txt = document.createTextNode(Names[j]);
td.appendChild(txt);
tr.appendChild(td);
for (var i=0; i<6; i++){

var td = document.createElement("td");
// var btn = document.createElement("button"); 
var txt = document.createTextNode(bArray[j][i]);

// btn.appendChild(txt);
td.appendChild(txt);
tr.appendChild(td);
}
$('.b_body').append(tr);
}
console.log(tr); 

$('td').on('click' , function()
{
    var tr = $(this);
   
        tr.addClass("selected");
        tr.addClass("dem"); 

    
    var tt = $(this).parent().children(); 
    console.log(tt); 

    $(this).parent().children().each(function(i) { 
        if ( $(this).hasClass("selected") && !$(this).hasClass("dem"))
        {
            $(this).removeClass("selected");
        }
    });
    tr.removeClass("dem"); 
})
var DefaultOrNot = false; 
var B_Value = 0; 
function Default()
{
DefaultOrNot = true; 
$(".b_table").fadeOut("Slow"); 
}
function B_Calculation()
{
if (DefaultOrNot==false){


var table = document.getElementById("mytabl");
for (var i = 0, row; row = table.rows[i]; i++) {

   for (var j = 0, col; col = row.cells[j]; j++) {

    // console.log(parseFloat(col.innerText));
     if (col.classList.contains("selected")) {

        B_Value +=parseFloat(col.innerText); 
     }  
   }  
}

B_Value = B_Value/100 + 0.91; 
}
else
{
    B_Value = 1.17; 
}
console.log("B value is : " +B_Value);
}