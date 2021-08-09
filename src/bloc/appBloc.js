const { BehaviorSubject, partition } = require("rxjs");
const { default: Parent } = require("../model/parent");

export default class AppBloc {
  constructor() { 
    this.parentList = [];
    this.parentListController = new BehaviorSubject();
  }

  async loadData() {
    return new Promise(async (resolve, reject) => {
      try {
        let parent = new Parent();
        await parent.getAllData()
        .then((result) => {
          this.parentList = result;
          this.parentListController.next(this.parentList);
          this.storeDataOnLocalStorage();
          resolve(this.parentList);
        })
        .catch((error) => {
          console.error('AppBloc.loadData<Exception> ' + error);
          reject({error: 'AppBloc.loadData<Exception>'});
        })
      } catch (error) {
        console.error('AppBloc.loadData<Exception> ' + error);
        reject({error: 'AppBloc.loadData<Exception>'});
      }
    })
  }

  findAndExpandRow(parentList, id) {
    for (let i = 0; i < parentList.length; i++) {
      if (parentList[i].id == id) {
        parentList[i].isExpanded = !parentList[i].isExpanded;
        break;
      } else {
        this.findAndExpandRow(parentList[i].children, id);
      }
    }
  }

  toggleRowExpansion(id) {
    this.findAndExpandRow(this.parentList, id);
    this.parentListController.next(this.parentList);
  }

  setAllChildrenCheckBox(parentList, bool) {
    for (let i = 0; i < parentList.length; i++) {
      parentList[i].isChecked = bool;
      if (parentList[i].children.length > 0) {
        this.setAllChildrenCheckBox(parentList[i].children, bool);
      }
    }
  }

  toggleCheckBox(id, parentList = this.parentList) {
    for (let i = 0; i < parentList.length; i++) {
      if (parentList[i].id == id) {
        parentList[i].isChecked = !parentList[i].isChecked;
        if (parentList[i].children.length > 0) {
          this.setAllChildrenCheckBox(parentList[i].children, parentList[i].isChecked);
        }
        break;
      } else {
        this.toggleCheckBox(id, parentList[i].children);
      }
    }
    this.parentListController.next(this.parentList);
  }

  storeDataOnLocalStorage() {
    window.localStorage.setItem('data', JSON.stringify(this.parentList));
  }

  async getDataFromLocalStorage() {
    this.parentList = JSON.parse(window.localStorage.getItem('data'));
    this.parentListController.next(this.parentList);
  }
}