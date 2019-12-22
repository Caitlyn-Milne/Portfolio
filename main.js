//creates skills nav
var skillsDiv = document.getElementById("skillsDiv");
skillsHtmlArray.forEach(function(skillHtml){
  let skillNavButton = document.createElement("button");
  skillNavButton.classList ="Accent2TextColor MediumSmallText PrimaryButton";
  skillNavButton.innerHTML = skillHtml;
  skillsDiv.appendChild(skillNavButton);
});

// creates projects which creates there pages and other math 2
//page details are held in constants to keep main js clear
var projects = [];
projects[0] = new Project(titlePortfiloProject,skillsPortfiloProject,htmlPortfiloProject);
projects[1] = new Project(titleAndroidApp,skillsAndroidApp,htmlAndroidApp);
projects[2] = new Project(title24HrGame,skills24HrGame,html24HrGame);
