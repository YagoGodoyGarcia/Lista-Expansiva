export default class Parent {
  constructor(
    id,
    name,
    children = [],
    level,
    isChecked = false,
    isExpanded = false
  ) {
    this.id = id;
    this.name = name;
    this.children = children;
    this.level = level;
    this.isChecked = isChecked;
    this.isExpanded = isExpanded;
  }

  serializeData(data) {
    let parent = new Parent();
    parent.id = data.id;
    parent.name = data.name;
    parent.level = data.level;
    parent.isChecked = false;
    parent.isExpanded = false;

    if (Object.keys(data.children).length > 0) {
      Object.values(data.children).forEach((element) => {
        let children = new Parent();
        children = this.serializeData(element);
        parent.children.push(children);
      })
    }
    return parent;
  }

  async getAllData() {
    return new Promise((resolve, reject) => {
      try {
        let data = require('../data.json');
        let parentList = [];
        Object.values(data).forEach((element, index) => {
          let parent = new Parent();
          parent = this.serializeData(element);
          parentList.push(parent);
        })
        resolve(parentList);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    })
  }
}