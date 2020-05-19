class Page{
  //skills is an array
  constructor(startPos, endPos, navItem){
    this.startPos = startPos;
    this.endPos = endPos;
    this.navItem = navItem;
  }

  onPage(scrollPosition){
    return scrollPosition >= this.startPos && scrollPosition <= this.endPos;
  }

  setActive(active){
      if(active){
        this.navItem.classList.add("active");
      }else{
        this.navItem.classList.remove("active");
      }
  }

  getEndPos(){
    return this.endPos;
  }
}
