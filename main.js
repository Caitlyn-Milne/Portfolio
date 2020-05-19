const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) /100;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) /100;
const vmin = Math.min(vw, vh);
const vmax = Math.max(vw, vh);

const pageContent = document.getElementById("page_content");
const pageParent = document.getElementById("page_content_parent");

const skillsContent = document.getElementById("skills_div");

const aboutMePage = new Page(0, 100*vh, document.getElementById("about_me_nav_item"));
const skillsPage = new Page(100*vh + 1, 200*vh, document.getElementById("skills_nav_item"));
const pages = [aboutMePage, skillsPage];

var lastRecordedScrollPosition = 0;

window.addEventListener('load', function() {
  pageParent.scrollTop = 0;
  setTimeout(()=>{pageContent.classList.add("dark")},500);
});

pageParent.onscroll = function(){
  console.log("do i print first SCROLL");
  lastRecordedScrollPosition = pageParent.scrollTop;

  console.log("" + pageParent.scrollTop);
  pages.forEach(function(item, i){
    if(item.onPage(pageParent.scrollTop)){
      item.setActive(true);
    }else{
      item.setActive(false);
    }
  });

  eventColorChange();
  eventStaticSkillsPages();
};

skillsContent.addEventListener("wheel", (event)=>{
  console.log("event");
});

  //scroll events

function eventColorChange(){
  //colour change after about me
  if(pageContent.classList.contains("dark") && pageParent.scrollTop >= aboutMePage.getEndPos()){
    pageContent.classList.remove("dark");
    pageContent.classList.add("light");
  }else if(pageContent.classList.contains("light") && pageParent.scrollTop < aboutMePage.getEndPos()){
    pageContent.classList.add("dark");
    pageContent.classList.remove("light");
  }
}
function eventStaticSkillsPages(){
  if(skillsPage.onPage(pageParent.scrollTop) && skillsContent.classList.contains("hidden")){
    skillsContent.classList.remove("hidden");
  }else if(!skillsPage.onPage(pageParent.scrollTop) && !skillsContent.classList.contains("hidden")){
    skillsContent.classList.add("hidden");
  }
}
