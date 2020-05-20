const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) /100;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) /100;
const vmin = Math.min(vw, vh);
const vmax = Math.max(vw, vh);

const pageContent = document.getElementById("page_content");
const pageParent = document.getElementById("page_content_parent");

const skillsContent = null;
const skillHeaderStuck = document.getElementById("skills_sticky_header");

const contactContent = document.getElementById("contacts_div");

const aboutMePage = new Page(0, 100*vh, document.getElementById("about_me_nav_item"));
const skillsPage = new Page(100*vh + 1, 270*vh, document.getElementById("skills_nav_item"));
/*const projectsPage = new Page(?, ?,document.getElementById("projects_nav_item"));*/
const contactsPage = new Page(270*vh+1, 370*vh,document.getElementById("contacts_nav_item"));
//const pages = [aboutMePage, skillsPage, projectsPage, contactsPage];
const pages = [aboutMePage, skillsPage ,contactsPage];

window.addEventListener('load', function() {
  pageParent.scrollTop = 0;
  onScroll();
  setTimeout(()=>{pageContent.classList.add("dark")},500);
  setTimeout(()=>{document.getElementById("loading_div").style.display = "none"},500);
});

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
function changeThemeToLight(){
  pageContent.classList.remove("dark");
  pageContent.classList.add("light");
}
function changeThemeToDark(){
  pageContent.classList.add("dark");
  pageContent.classList.remove("light");
}

function eventSkillsStickyHeader(){
  if(skillsPage.onPage(pageParent.scrollTop)){
    skillHeaderStuck.style.display ="block";
    var distanceFromMarker = document.getElementById("skills_page_end_marker").offsetTop - pageParent.scrollTop;
    console.log(distanceFromMarker);
    if(distanceFromMarker < skillHeaderStuck.offsetHeight){
      skillHeaderStuck.style.top = -(skillHeaderStuck.offsetHeight - distanceFromMarker);
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
