
class Project {
  constructor(pParent,pName,pContent) {
    //varibles pass through
    this.name = pName;
    //create elements
    this.div = document.createElement("div");
    this.showBtn = document.createElement("button");
    this.contentDiv = document.createElement("div");
    pParent.innerHTML+= "<br>";
    pParent.appendChild(this.div);
    this.div.appendChild(this.showBtn);
    this.div.appendChild(this.contentDiv);
    //put content into collapsible
    this.showBtn.innerHTML = pName;
    this.contentDiv.innerHTML = pContent;
    //add classes
    this.showBtn.classList.add("collapsible");
    this.contentDiv.classList.add("content");
    this.div.classList.add("projectDiv")
    //set it to showing
    this.showBtn.classList.add("active");
    /*this.contentDiv.classList.add("showing");
    this.showBtn.classList.add("radiusShow");*/
    //style
    this.showBtn.classList.add("titleText")
  }

  getName(){
    return this.name;
  }
}
