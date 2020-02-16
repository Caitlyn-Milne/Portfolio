const SKILL_HTML = 1;
const SKILL_JAVASCRIPT = 2;
const SKILL_CSS = 4;
const SKILL_JAVA = 8;
const SKILL_CSHARP = 16;
const SKILL_PHP = 32;
const SKILL_SQP = 64;
const SKILL_ANDROID = 128;

var object_skill_html = {
  skillName:"HTML",
  bitValue:1
};
var object_skill_javascript = {
  skillName:"Javascript",
  bitValue:2
};
var object_skill_css = {
  skillName:"CSS",
  bitValue:4
};
var object_skill_java = {
  skillName:"Java",
  bitValue:8
};
var object_skill_csharpe = {
  skillName:"C#",
  bitValue:16
};
var object_skill_php = {
  skillName:"PHP",
  bitValue:32
};
var object_skill_sql = {
  skillName:"SQL",
  bitValue:64
};
var object_skill_android = {
  skillName:"Android",
  bitValue:128
}

const ALL_SKILLS_ARRAY = [
  object_skill_html,
  object_skill_javascript,
  object_skill_css,
  object_skill_java,
  object_skill_csharpe,
  object_skill_php,
  object_skill_sql,
  object_skill_android,

];

ALL_SKILLS_ARRAY.forEach(function(skill){
  let navItem = document.createElement("span");
  navItem.innerHTML = skill.skillName;
  navItem.classList = "navBarItem";
  document.getElementById("navSkillsSection").appendChild(navItem);
  document.getElementById("navSkillsSection").innerHTML +="<br>";
});
