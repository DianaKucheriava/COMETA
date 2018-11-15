function OpenDB(){
var obj=document.getElementById("DB").style;
obj.visibility="visible";
winOpen2(3, 0, obj);
 };
 
function winOpen2(s, o, obj){//показываем окно
o+=s;
if(o<100){
obj.opacity=o/100;
obj.filter='alpha(opacity='+o+')';
setTimeout(function(){winOpen2(s, o, obj);}, 55);}
else{//показать полностью
obj.opacity=1;
obj.filter='alpha(opacity=100)';};
 };
 
function winClose(){
winCloset2(5, 100, document.getElementById("DB").style);

  }

function winCloset2(s, o, obj){//скрываем окно
o-=s;
if(o>0){
obj.opacity=o/100;
obj.filter='alpha(opacity='+o+')';
setTimeout(function(){winCloset2(s, o, obj);}, 5);}
else{//обнуляем на выходе
obj.opacity=0;
obj.filter='alpha(opacity=0)';
obj.visibility="hidden";};
 };
	
	function sizeBD() {
							var db = document.getElementById("dab").value; 
							var sloc = document.getElementById("sloc").value;
							var val = document.getElementById("valueDB");
					  		var sizeBD = db/sloc;
					  		
					  		if ( sizeBD < 10 ) {
								    string = "<b>Низький</b>";
								    }
								else {
										if (sizeBD < 100) {
											 string = "<b>Середній</b>";
										}
										else{
												if (sizeBD < 1000) {
													 string = "<b>Високий</b>";
												}
												else{
													if (sizeBD >= 1000) 
														{
														 	string = "<b>Дуже високий</b>";
														}
													}
											}
									 }
									val.innerHTML = string;
					 };

					document.getElementById("clear").onclick = function(e){
				  	document.getElementById("dab").value = "";
				 	document.getElementById("sloc").value = "";
				 	document.getElementById("result").innerHTML = "<p  id='valueDB'> </p>";
				    
				};
				