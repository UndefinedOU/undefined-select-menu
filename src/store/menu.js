import { observable, autorun} from 'mobx';

// TODO: width determined by elements, but has max width

const createStore = ({ menuMeta, menuItems }) => {
  return observable({
    trashbin: null,  //used for confirming deletion
    selected: null,  
    hovering: null,
    //editing is used for tracking changes to label on he editables
    editing: { 
      id: null,
      label: null
    },
    //staging is for anyting added via addable
    staging: null,
    currMenuItem: -1,
    menuMeta,
    menuItems,
    selectItem(id) {
      this.selected = id;
    },
    clearStaging() {
      this.staging = null;
    },
    commitStaging() {
      this.menuItems.push(this.staging);
      this.clearStaging();
    },
    updateStaging(label) {
      if (this.staging)
        this.staging.label = label;
      else 
        this.staging = { label: label };
    },
    addItem({icon, label, disabled}) {
      //TODO
    },
    setHovering(id) {
      if (this.hovering !== id) {
        this.hovering = id;
      }
    },
    setEditing(id) {
      //setup the editing for the item
      if (this.editing.id !== id) {
        this.editing = {
          id: id,
          label: this.menuItems[id].label
        }
      }
    },
    clearEditing() {
      this.editing = {
        id: null,
        label: null
      }
    },
    updateLabel(label) {
      this.editing.label = label;
    },
    commitEditing() {
      if (this.editing.id !== null) {
        this.menuItems[this.editing.id].label = this.editing.label;
        this.clearEditing();   
      }
    },
    setTrashBin(id) {
      this.clearEditing(); //so we don't get a editing and trash at the same time
      this.trashbin = id;
    },
    destroyItem(id) {
      //removes the item
      this.menuItems = this.menuItems.filter((item, index) => index !== id);
      this.clearTrashBin();
      
    },
    clearTrashBin() {
      this.trashbin = null;
    }
  });
};

export default createStore;