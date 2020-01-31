class Project{
  //skills is an array
  constructor(title, html){
    this.mTitle = title;
    this.mHtml = html;

    this.build();
  }

  build(){
    //Create Project Nav
    this.navItem = document.createElement("span");
    this.navItem.innerHTML = this.mTitle;
    this.navItem.classList = "navBarItem";
    document.getElementById("navProjectsSection").appendChild(this.navItem);
    document.getElementById("navProjectsSection").innerHTML +="<br>";
  }

  getTitle(){
    return this.mTitle;
  }
  getSkills(){
    return this.mSkills;
  }
  getHtml(){
    return this.mHtml;
  }
}
