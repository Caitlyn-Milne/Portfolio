class Page {
  constructor(navItem, name) {
    this.name = name;
    this.navItem = navItem;
  }

  onPage(scrollPosition) {
    return scrollPosition + 1 >= this.startPos && scrollPosition <= this.endPos;
  }

  setBoundaries(start, end) {
    this.startPos = start;
    this.endPos = end;
  }
  setActive(active) {
    if (active) {
      pageContent.classList.add(this.name);
      this.navItem.classList.add("active");
    } else {
      pageContent.classList.remove(this.name);
      this.navItem.classList.remove("active");
    }
  }
  getStartPos() {
    return this.startPos;
  }
  getEndPos() {
    return this.endPos;
  }
}
