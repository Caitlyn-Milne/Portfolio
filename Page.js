class Page{
  constructor(navItem){
    this.navItem = navItem;
  }

  onPage(scrollPosition){
    return scrollPosition +1 >= this.startPos && scrollPosition <= this.endPos;
  }

  setBoundaries(start,end){
    this.startPos = start;
    this.endPos = end;
  }
  setActive(active){
      if(active){
        this.navItem.classList.add("active");
      }else{
        this.navItem.classList.remove("active");
      }
  }
  getStartPos(){
    return this.startPos;
  }
  getEndPos(){
    return this.endPos;
  }
}
