import { observable, autorun} from 'mobx';
import { chunk, extend, includes, each } from 'lodash';

/*
 TODO: width determined by elements, but has max width
    - pagination
      maxItemsPerPage = (menuHeight - (2 * itemHeight)) / menuHeight
        if there is more than fits on the page
*/

const ITEM_HEIGHT = 24;

const createStore = ({ menuMeta, menuItems }) => {
  let annotateItems = (items) => {
    if (items) {
      return items.map((item, index) => extend({}, item, { id: index}));
    } else {
      return [];
    }
  };

  let store = observable({
    //activelyHovered: false, //returns true if the menu is selected
    trashbin: null,  //used for confirming deletion
    selected: null,  
    hovering: null,
    //editing is used for tracking changes to label on he editables
    editing: { 
      id: null,
      label: null
    },
    checked: observable.map({}),
    //staging is for anyting added via addable
    staging: null,
    currMenuItem: -1,
    menuMeta,
    menuItems: annotateItems(menuItems),
    menuHeight: 240,
    paginate: true, //switch on if needed
    paginateSlot: [], //the items that will be shown on the page
    pages: [], // the actual pages
    activePage: 0, //the activly page
    setChecked(id) {
      this.checked.set(id, true)
    },
    setUnChecked(id) {
      this.checked.delete(id);
    },
    isChecked(id) {
      return this.checked.has(id);
    },
    setItems(items) {
      this.menuItems = annotateItems(items);
      this.drawPages();
      this.refocusPage();
    },
    switchPage(page) {
      //sitches the page
      this.activePage = page;
      this.drawPages();
    },
    nextPage() {
      this.switchPage(this.activePage + 1);
    },
    prevPage() {
      this.switchPage(this.activePage - 1);
    },
    drawPages() {
      let maxItems = this.maxItems();
      this.pages = chunk(this.menuItems, maxItems);
      this.paginateSlot = this.pages[this.activePage];
      if (!this.paginateSlot) { debugger }
    },
    createPages() {
      this.activePage = 0;
      this.drawPages();
    },
    //sets the active page to wherever the hovering is located
    refocusPage() {
      //find the page containing the hovering
      //let selectedPage = null;
      this.pages.forEach((page, index) => {
        if (includes(page.map((item) => item.id), this.hovering)) {
          //this.paginateSlot = page;
          this.switchPage(index);
        }
      });
    },
    maxItems() {
      /* todo: do this later once we have the items part working
      if ((this.state.store.menuItems.length * ITEM_HEIGHT) > this.menuHeight) {
        return (menuMeta.height - (2 * ITEM_HEIGHT))/ITEM_HEIGHT;
      } else {
        return this.state.store.menuItems.length;
      }
      */
      return 9;
    },
    selectItem(id) {
      this.selected = id;
      this.setHovering(id);
    },
    clearStaging() {
      this.staging = null;
    },
    commitStaging() {
      let menuItems = this.menuItems
      menuItems.push(this.staging);
      this.menuItems = annotateItems(menuItems); //reannotate the indeces
      this.clearStaging();
      this.drawPages();
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
    isHovering(id) {
      return this.hovering === id;
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
      this.menuItems = annotateItems(this.menuItems.filter((item, index) => index !== id));
      this.clearTrashBin();
      this.drawPages();
      
    },
    clearTrashBin() {
      this.trashbin = null;
    }
  });

  store.createPages();
  return store;
};

export default createStore;