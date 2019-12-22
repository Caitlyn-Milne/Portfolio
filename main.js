var skillsDiv = document.getElementById("skillsDiv");
skillsHtmlArray.forEach(function(skillName){
  let skillNavButton = document.createElement("button");
  skillNavButton.classList ="ColorTextColor MediumSmallText SkillButton";
  skillNavButton.innerHTML = skillName;
  skillsDiv.appendChild(skillNavButton);
});
