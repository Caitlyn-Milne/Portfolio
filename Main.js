
var projectsDiv = document.getElementById("projectsDiv");

var portfilloContent = "insert Portfillo Website content in here";
var portfilloWebsite = new Project(projectsDiv,"Portfillo Website",portfilloContent);


var collapsibles = document.getElementsByClassName("collapsible");
var i;
var ani = false; // stops multiple animations going off at once
for (i = 0; i < collapsibles.length; i++) {
  collapsibles[i].addEventListener("click", function() {
    if(ani == false){
      ani = true;
      setTimeout(function(){ani = false;},700);
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      var that=this;
      if(content.classList.contains("showing")){ //if showing
        content.classList.toggle("hiding");
        content.classList.toggle("showing");
        setTimeout(function(){
              that.classList.toggle("radiusShow");
              that.classList.toggle("radiusHide");
            }, 500);
      }else{
        that.classList.toggle("radiusShow");
        that.classList.toggle("radiusHide");
        setTimeout(function(){
          content.classList.toggle("hiding");
          content.classList.toggle("showing");
        },200);
      }
    }
  });
}
