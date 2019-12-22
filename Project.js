class Project{
  //skills is an array
  constructor(title, skills, html){
    this.mTitle = title;
    this.mSkills = skills;
    this.mHtml = html;

    this.build();
  }

  build(){
    //Create Project Nav
    this.mProjectBtn = document.createElement("button");
    this.mProjectBtn.classList = "PortfilioButton ColorTextColor MediumSmallText";
    this.mProjectBtn.innerHTML = this.mTitle;
    projectsNavDiv.appendChild(this.mProjectBtn);
  }

  getTitle(){
    return this.mTitle;
  }
  getSkills(){
    return this.mSkills
  }
  getHtml(){
    return this.mHtml;
  }
}
