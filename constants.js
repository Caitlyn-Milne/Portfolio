//skill constants, pass an array of these these when constructing a project class.
//each constant number should corrispond to the index of its name in skillsHtmlArray
//language constants
const SKILL_HTML = 0;
const SKILL_JAVASCRIPT = 1;
const SKILL_CSS = 2;
const SKILL_JAVA = 3;
const SKILL_CSHARP = 4;
const SKILL_PHP = 5;
const SKILL_SQP = 6;
//experience constants
const SKILL_ANDROID = 7;

const skillsHtmlArray =[
  "HTML",
  "JS",
  "CSS",
  "JAVA",
  "C#",
  "PHP",
  "SQL",
  "<img class =\"PrimaryButton AndroidLogoHoverable\">"
];
//Project Nav Div, Held here for easy access in project class
const projectsNavDiv = document.getElementById("projectsNavDiv");
//Pages here
//portfilio project
const titlePortfiloProject = "Portfilio Website";
const skillsPortfiloProject = [
  SKILL_HTML,
  SKILL_JAVASCRIPT,
  SKILL_CSS
];
const htmlPortfiloProject = "Portfilio Website Project Html";
//android app project
const titleAndroidApp = "Android App";
const skillsAndroidApp = [];
const htmlAndroidApp = "";
//24 hour game
const title24HrGame= "24 Hour Game";
const skills24HrGame = [];
const html24HrGame = "";
