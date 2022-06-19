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
const skillHeaderStuck = document.getElementById("skills_sticky_header_stuck");
const skillHeaderUnstuck = document.getElementById(
  "skills_sticky_header_unstuck"
);
//contact page element references
const contactContent = document.getElementById("contacts_div");
//project page element references
const projectContent = document.getElementById("projects_div");
//Page objects
const aboutMePage = new Page(
  document.getElementById("about_me_nav_item"),
  "about_me"
);
const skillsPage = new Page(
  document.getElementById("skills_nav_item"),
  "skills"
);
const projectPage = new Page(
  document.getElementById("projects_nav_item"),
  "projects"
);
const contactsPage = new Page(
  document.getElementById("contacts_nav_item"),
  "contacts"
);

const pages = [aboutMePage, skillsPage, projectPage, contactsPage];

//loading functions
window.addEventListener("load", onFinishedLoading);
function onFinishedLoading() {
  setViewportVaribles();
  setTimeout(() => {
    pageContent.classList.add("dark");
  }, 500);
  setTimeout(() => {
    document.getElementById("loading_div").classList.add("hidden");
  }, 500);
  onScroll();
}
function setViewportVaribles() {
  vw =
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) / 100;
  vh =
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) / 100;
  vmin = Math.min(vw, vh);
  vmax = Math.max(vw, vh);
  setPagesBoundaries();
}
function setPagesBoundaries() {
  aboutMePage.setBoundaries(0, 100 * vh);
  skillsPage.setBoundaries(
    100 * vh + 1,
    skillsContent.offsetTop + skillsContent.offsetHeight
  );
  projectPage.setBoundaries(
    skillsPage.getEndPos() + 1,
    skillsPage.getEndPos() + 100 * vh
  );
  contactsPage.setBoundaries(
    projectPage.getEndPos() + 1,
    projectPage.getEndPos() + 120 * vh
  );
}
//resizing cause refresh
window.addEventListener("resize", function () {
  location.reload();
});
//scrolling
pageParent.onscroll = () => {
  onScroll();
};
function onScroll() {
  pages.forEach(function (item, i) {
    if (item.onPage(pageParent.scrollTop)) {
      item.setActive(true);
    } else {
      item.setActive(false);
    }
  });
  //events
  eventColorChange();
  eventSkillsStickyHeader();
  eventStaticContactsPages();
}
//on clicks
document.getElementById("about_me_nav_item").onclick = function () {
  pageParent.scrollTop = aboutMePage.getStartPos();
  onScroll();
};
document.getElementById("contacts_nav_item").onclick = function () {
  pageParent.scrollTop = contactsPage.getStartPos();
  onScroll();
};
document.getElementById("skills_nav_item").onclick = function () {
  pageParent.scrollTop += skillHeaderUnstuck.getBoundingClientRect().top;
  onScroll();
};
//theme functions

var themeDark = false;
function changeThemeToLight() {
  if (!themeDark) return;
  pageContent.classList.remove("dark");
  pageContent.classList.add("light");
  themeDark = false;
}
function changeThemeToDark() {
  if (themeDark) return;
  pageContent.classList.add("dark");
  pageContent.classList.remove("light");
  themeDark = true;
}

//scroll events
function eventColorChange() {
  if (aboutMePage.onPage(pageParent.scrollTop)) {
    changeThemeToDark();
  } else if (skillsPage.onPage(pageParent.scrollTop)) {
    changeThemeToLight();
  } else if (contactsPage.onPage(pageParent.scrollTop)) {
    changeThemeToDark();
  }
}
function eventSkillsStickyHeader() {
  if (
    skillsPage.onPage(pageParent.scrollTop) &&
    skillHeaderUnstuck.getBoundingClientRect().top < 0
  ) {
    skillHeaderStuck.style.display = "block";
    skillHeaderUnstuck.style.visibility = "hidden";
    var distanceFromMarker =
      document.getElementById("skills_page_title_exit_marker").offsetTop -
      pageParent.scrollTop;
    if (distanceFromMarker < skillHeaderStuck.offsetHeight) {
      skillHeaderStuck.style.top = -(
        skillHeaderStuck.offsetHeight - distanceFromMarker
      );
    } else {
      skillHeaderStuck.style.top = 0;
    }
  } else {
    skillHeaderStuck.style.display = "none";
    skillHeaderUnstuck.style.visibility = "visible";
  }
}
function eventStaticContactsPages() {
  if (
    contactsPage.onPage(pageParent.scrollTop) &&
    contactContent.classList.contains("hidden")
  ) {
    contactContent.classList.remove("hidden");
  } else if (
    !contactsPage.onPage(pageParent.scrollTop) &&
    !contactContent.classList.contains("hidden")
  ) {
    contactContent.classList.add("hidden");
  }
}
