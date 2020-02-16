//TODO clean this code
var viewportHeight = 0;
var navMaxScrollDistance = 0;
var navThumb = $('#navBarThumb')[0];
var navTrack = $('#navBarTrack')[0];
var navContent = $('#navContent')[0];
var navMaxThumbPosition = 0;
const navMinThumbPosition = 0;
const navScrollSpeed = 20;

init();

function init(){
  navContent.style.top = 0;
  navThumb.pressed = false;
  $('#aboutMeNavItem')[0].style.display ="block"

  onResizeViewport();
  setUpListeners();
}


function setUpListeners(){
  window.addEventListener("resize", onResizeViewport);
  document.getElementById("navBar").addEventListener("wheel", function(e) {
      var dir = Math.sign(e.deltaY);
      navScroll(dir);
  });
  navTrack.addEventListener("mousedown", (event) =>{navTrackPressed(event)});
  window.addEventListener("mouseup", function(){
    navThumb.pressed = false;
  });
  window.addEventListener("mousemove", (event)=>{onMouseMove(event)});
}

//called when viewport is resized
function onResizeViewport(){
  viewportHeight = $(window).height();
  navContent.style.top = 0;
  navScrollPercentage = 0;
  navMaxThumbPosition = viewportHeight - navThumb.offsetHeight;
  navMaxScrollDistance =  -(navContent.offsetHeight - viewportHeight) - 0;
  if(navMaxScrollDistance >= 0){
    navThumb.style.display = "none"
  }else{
    navThumb.style.display = "block"
    navThumb.style.top = 0;
  }
}

function navScroll(direction){
  //-1 direction is up, 1 direction is down
  if(navMaxScrollDistance >= 0){
    return;
  }
  var currentScroll = parseInt(navContent.style.top);
  var navScrollDistance = (direction > 0)? -navScrollSpeed : navScrollSpeed;
  var newNavScrollValue = currentScroll + navScrollDistance;
  if(newNavScrollValue > 0){
    newNavScrollValue = 0;
  }
  else if(newNavScrollValue < navMaxScrollDistance){ //boundary check
    newNavScrollValue = navMaxScrollDistance;
  }
  navContent.style.top = newNavScrollValue;
  navThumb.style.top = navMaxThumbPosition * (newNavScrollValue / navMaxScrollDistance);
}

function navTrackPressed(event){
  navThumb.pressed = true;
  onMouseMove(event);
}

function onMouseMove(event){
  if(navThumb.pressed){
    var navThumbPosition =  event.clientY - navThumb.offsetHeight / 2;
    if(navThumbPosition < navMinThumbPosition){
      navThumbPosition = navMinThumbPosition;
    }else if(navThumbPosition > navMaxThumbPosition){
      navThumbPosition = navMaxThumbPosition;
    }
    navThumb.style.top = navThumbPosition;
    var navScrollPercentage = navThumbPosition / navMaxThumbPosition; //if theres a situation where navMinThumbPosition != 0 this will need to be changed
    setNavScrollAsPencentage(navScrollPercentage);
  }
}

function setNavScrollAsPencentage(percent){
  navContent.style.top = navMaxScrollDistance * percent;
}
