const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) /100;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) /100;
const vmin = Math.min(vw, vh);
const vmax = Math.max(vw, vh);

const pageContent = document.getElementById("page_content");
const pageParent = document.getElementById("page_content_parent");

const contactContent = document.getElementById("contacts_div");

const aboutMePage = new Page(0, 100*vh, document.getElementById("about_me_nav_item"));
/*const skillsPage = new Page(100*vh + 1, 200*vh, document.getElementById("skills_nav_item"));
const projectsPage = new Page(200*vh+1, 300*vh,document.getElementById("projects_nav_item"));*/
const contactsPage = new Page(100*vh+1, 600*vh,document.getElementById("contacts_nav_item"));
//const pages = [aboutMePage, skillsPage, projectsPage, contactsPage];
const pages = [aboutMePage, contactsPage];

window.addEventListener('load', function() {
  pageParent.scrollTop = 0;
  setTimeout(()=>{pageContent.classList.add("dark")},500);
  setTimeout(()=>{document.getElementById("loading_div").style.display = "none"},500);
});

pageParent.onscroll = function(){
  console.log("" + pageParent.scrollTop);
  pages.forEach(function(item, i){
    if(item.onPage(pageParent.scrollTop)){
      item.setActive(true);
    }else{
      item.setActive(false);
    }
  });

  eventColorChange();
  eventStaticContactsPages();
};

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
function eventStaticContactsPages(){
  if(contactsPage.onPage(pageParent.scrollTop) && contactContent.classList.contains("hidden")){
    contactContent.classList.remove("hidden");
  }else if(!contactsPage.onPage(pageParent.scrollTop) && !contactContent.classList.contains("hidden")){
    contactContent.classList.add("hidden");
  }
}
