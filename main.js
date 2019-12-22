var skillsDiv = document.getElementById("skillsDiv");
skillsHtmlArray.forEach(function(skillHtml){
  let skillNavButton = document.createElement("button");
  skillNavButton.classList ="Accent2TextColor MediumSmallText SkillButton";
  skillNavButton.innerHTML = skillHtml;
  skillsDiv.appendChild(skillNavButton);
});
