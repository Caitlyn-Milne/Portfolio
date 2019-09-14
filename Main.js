//fixed div shift


//projects

var projectsDiv = document.getElementById("projectsDiv");

var portfilloContent = "insert Portfillo Website content in here";
var portfilloWebsite = new Project(projectsDiv,"Portfillo Website",portfilloContent);

var project2Content = "insert project2 content in here";
var project2 = new Project(projectsDiv,"Project 2", project2Content);
var project2Content = "insert project2 content in here";
var project2 = new Project(projectsDiv,"Project 2", project2Content);
var project2Content = "insert project2 content in here";
var project2 = new Project(projectsDiv,"Project 2", project2Content);
var project2Content = "insert project2 content in here";
var project2 = new Project(projectsDiv,"Project 2", project2Content);
var project2Content = "insert project2 content in here";
var project2 = new Project(projectsDiv,"Project 2", project2Content);


//collapsible code

var collapsibles = document.getElementsByClassName("collapsible");
var i;
var ani = false; // stops multiple animations going off at once
  for (i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function() {
      if(ani == false){
        ani = true;
        setTimeout(function(){ani = false;},450);
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        var that=this;
        if(!content.classList.contains("showing") && !content.classList.contains("hiding")){
          //first press
          content.classList.toggle("hiding");
          setTimeout(function(){
                that.classList.toggle("radiusHide");
              }, 250);
          return;
        }
        if(content.classList.contains("showing")){ //if showing
          content.classList.toggle("hiding");
          content.classList.toggle("showing");
          setTimeout(function(){
                that.classList.toggle("radiusShow");
                that.classList.toggle("radiusHide");
              }, 250);
        }else{
          that.classList.toggle("radiusShow");
          that.classList.toggle("radiusHide");
          setTimeout(function(){
            content.classList.toggle("hiding");
            content.classList.toggle("showing");
          },100);
        }
      }
    });
  }





//mis functions
