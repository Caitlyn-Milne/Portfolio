//viewport varibles
var vw;
var vh;
var vmin;
var vmax;
//general page element references
const pageContent = document.getElementById("page_content");
const pageParent = document.getElementById("page_content_parent");
//skill page element references
const skillsContent = document.getElementById("skills_div");
const skillHeaderStuck = document.getElementById("skills_sticky_header");
//contact page element references
const contactContent = document.getElementById("contacts_div");
//Page objects
const aboutMePage = new Page(document.getElementById("about_me_nav_item"));
const skillsPage = new Page(document.getElementById("skills_nav_item"));
const contactsPage = new Page(document.getElementById("contacts_nav_item"));
const pages = [aboutMePage, skillsPage ,contactsPage];

//loading functions
window.addEventListener('load', onFinishedLoading);
function onFinishedLoading(){
  setViewportVaribles();
  setTimeout(()=>{pageContent.classList.add("dark")},500);
  setTimeout(()=>{document.getElementById("loading_div").style.display = "none"},500);
  onScroll();
}
function setViewportVaribles(){
  vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) /100;
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) /100;
  vmin = Math.min(vw, vh);
  vmax = Math.max(vw, vh);
  setPagesBoundaries();
}
function setPagesBoundaries(){
  pageParent.scrollTop = 0;
  aboutMePage.setBoundaries(0, 100*vh);
  skillsPage.setBoundaries(100*vh+1, skillsContent.offsetTop +skillsContent.offsetHeight);
  contactsPage.setBoundaries(skillsPage.getEndPos()+1, skillsPage.getEndPos()+ 120*vh);
}
//resizing cause refresh
window.addEventListener("resize", function(){
  setViewportVaribles();
});
//scrolling
pageParent.onscroll = ()=>{
  onScroll();
};
function onScroll(){
  pages.forEach(function(item, i){
    if(item.onPage(pageParent.scrollTop)){
      item.setActive(true);
    }else{
      item.setActive(false);
    }
  });
  //events
  eventColorChange();
  eventSkillsStickyHeader();
  eventStaticContactsPages();
}
//on clicks
document.getElementById("about_me_nav_item").onclick = function(){
  pageParent.scrollTop = aboutMePage.getStartPos();
  onScroll();
};
document.getElementById("contacts_nav_item").onclick = function(){
  pageParent.scrollTop = contactsPage.getStartPos();
  onScroll();
};
document.getElementById("skills_nav_item").onclick = function(){
  pageParent.scrollTop = skillsPage.getStartPos();
  onScroll();
};
//theme functions
function changeThemeToLight(){
  pageContent.classList.remove("dark");
  pageContent.classList.add("light");
}
function changeThemeToDark(){
  pageContent.classList.add("dark");
  pageContent.classList.remove("light");
}

//scroll events
function eventColorChange(){
  if(aboutMePage.onPage(pageParent.scrollTop)){
    changeThemeToDark();
  }else if(skillsPage.onPage(pageParent.scrollTop)){
    changeThemeToLight();
  }else if(contactsPage.onPage(pageParent.scrollTop)){
    changeThemeToDark();
  }
}
function eventSkillsStickyHeader(){
  if(skillsPage.onPage(pageParent.scrollTop)){
    skillHeaderStuck.style.display ="block";
    var distanceFromMarker = document.getElementById("skills_page_title_exit_marker").offsetTop - pageParent.scrollTop;
    if(distanceFromMarker < skillHeaderStuck.offsetHeight){
      skillHeaderStuck.style.top = -(skillHeaderStuck.offsetHeight - distanceFromMarker);
    }else{
      skillHeaderStuck.style.top = 0
    }
  }else{
      skillHeaderStuck.style.display ="none";
  }
}
function eventStaticContactsPages(){
  if(contactsPage.onPage(pageParent.scrollTop) && contactContent.classList.contains("hidden")){
    contactContent.classList.remove("hidden");
  }else if(!contactsPage.onPage(pageParent.scrollTop) && !contactContent.classList.contains("hidden")){
    contactContent.classList.add("hidden");
  }
}
