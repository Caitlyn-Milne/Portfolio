var pageContent = document.getElementById("page_content");
var pageParent = document.getElementById("page_content_parent");

window.addEventListener('load', function() {
    setTimeout(()=>{pageContent.classList.add("dark")},500);
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

};

var aboutMePage = new Page(0, 1500, document.getElementById("about_me_nav_item"));
var skillsPage = new Page(1500, 2000, document.getElementById("skills_nav_item"));
var pages = [aboutMePage, skillsPage]
