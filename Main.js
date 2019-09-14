//fixed div shift


navMenuDiv.style.marginLeft = getScrollbarWidth();
console.log("t"+ navMenuDiv.style.marginRight);

//projects

var projectsDiv = document.getElementById("projectsDiv");

var portfilloContent = "insert Portfillo Website content in here";
var portfilloWebsite = new Project(projectsDiv,"Portfillo Website",portfilloContent);

var project2Content = "insert project2 content in here!";
var portfilloWebsite = new Project(projectsDiv,"Project 2", project2Content);


//collapsible code

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
      if(!content.classList.contains("showing") && !content.classList.contains("hiding")){
        //first press
        content.classList.toggle("hiding");
        setTimeout(function(){
              that.classList.toggle("radiusHide");
            }, 500);
        return;
      }
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

//mis functions
function getScrollbarWidth() {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

}
