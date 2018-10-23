class AppComposite
{
constructor(numberofviews , servesNum , clientsNum , checker)
{
    this.checker = checker; 
    this.NumberOfViews = numberofviews; 
    this.servesNum = servesNum; 
    this.clientsNum = clientsNum; 
    this.complexity = null; 
    this.total_data = this.servesNum + this.clientsNum; 
    this.simple = [1,2]; 
    this.medium = [2,5]; 
    this.difficult= [3,8]; 
    this.type= null; 
}
complexityCalc()
{
    var temp;
    if (this.checker ==1)
    {
        this.type = "View"; 
        this.viewCalc(); 
    }
    else
    {
        this.type = "Report";
        this.reportCalc(); 
    }
}
viewCalc()
{
       // there are three complex if/else/ conditional blocks , i divided them into three lines of codes for the readability.
    
    // first check for the screen number , then check for the data on client/server numbers to assume the complexity
    var temp; 
    ((this.NumberOfViews<3 && this.total_data<8) ) ? (this.complexity=1) : this.complexity=2;


    ((this.NumberOfViews<7 && this.NumberOfViews>=3) ) ? ((this.total_data<4) ? this.complexity =1 : 
      (this.complexity<8) ? this.complexity=2 : this.complexity=3) : temp=2;
   
   ((this.NumberOfViews>=8) ) ? (this.total_data<4 ? this.complexity = 2 : this.complexity=3) : temp=3 ;
}
reportCalc()
{
    var temp;

 ((this.NumberOfViews<2 && this.total_data<8) ) ? (this.complexity=2) : this.complexity=5;


 ((this.NumberOfViews==2 || this.NumberOfViews==3) ) ? ((this.total_data<4) ? this.complexity =2 : 
   (this.total_data<8) ? this.complexity=5 : this.complexity=8) : temp=2;

 ((this.NumberOfViews>3) ) ? (this.total_data<4 ? this.complexity = 5 : this.complexity=8) : temp=3  ;
}
}

class ApplicationModel
{
constructor(AppComposites , DevExperience , CASE ,  reuse )
{
    this.AppComposites = AppComposites;  
    this.DevExperience = DevExperience; 
    this.CASE = CASE; 
    this.AP=0; 
    this.NAP = 0; 
    this.PM = 0; 
    this.Productivity = 7; 
    this.effort = 0; 
    this.reuse = reuse; 
    this.time = 0; 
    this.people = 0; 
    this.b = 1.17; 
    

}

Calculation()
{
    // first the AP module
   for (var i =0; i<this.AppComposites.length; i++)
   {
       this.AppComposites[i].complexityCalc(); 
       this.AP+=this.AppComposites[i].complexity; 
   }
  // this.AP+=this.DevExperience+this.CASE; 
  this.AP += 1*10; 
   this.NAP = this.AP * ((100-(this.reuse))/100);

   this.effort = this.NAP / this.Productivity; 

   this.time =  3* (Math.pow(this.effort , (0.33+0.2*(this.b-1.01)))); 

   this.people  = this.effort / this.time; 
   //Time = 3*Effort^(0.33+0.2*(B-1.01))
}
}

class ReuseModel
{
constructor(ASLOC ,AT , ATPROD  , AAM )
{
this.PM = null; 
this.ASLOC = ASLOC; 
this.AT = AT;
this.ESLOC =  null; 
this.AAM = AAM;  
this.ATPROD = ATPROD;   
this.b =1.17; 
this.time = null; 
this.people= null; 
}
Calculation()
{
this.PM = (this.ASLOC* this.AT/100)/this.ATPROD; 
this.ESLOC = this.ASLOC * (1-( this.AT/100)) * this.AAM; 

this.time =  3* (Math.pow(this.PM , (0.33+0.2*(this.b-1.01)))); 

this.people  = this.PM / this.time; 
}
}