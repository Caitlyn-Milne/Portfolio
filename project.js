class Project{
  //skills is an array
  constructor(title, html, skills){
    this.mTitle = title;
    this.mHtml = html;
    this.mSkills = skills;
  }

  getTitle(){
    return this.mTitle;
  }

  getHtml(){
    return this.mHtml;
  }

  getSkills(){
    return this.mSkills
  }
}
