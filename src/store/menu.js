import { observable, autorun, extendObservable} from 'mobx';
import { chunk, extend, includes, each } from 'lodash';


/*
 TODO: width determined by elements, but has max width
    - pagination
      maxItemsPerPage = (menuHeight - (2 * itemHeight)) / menuHeight
        if there is more than fits on the page
*/

const ITEM_HEIGHT = 24;

const createStore = ({ menuMeta, menuItems, selected }) => {
  let annotateItems = (items) => {
    items.forEach((item, index) => item.id = index);
    return items;
  };

  let selectedIndex = null;
  if (typeof(selected) === 'number') {
    selectedIndex = selected;
  } else if (menuItems.length > 0) {
    selectedIndex = 0;
  }

  let store = observable({
    //activelyHovered: false, //returns true if the menu is selected
    trashbin: null,  //used for confirming deletion
    selected: selectedIndex,
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
    menuItems: observable(annotateItems(menuItems)),
    coreItems: menuItems,
    menuHeight: 240,
    paginate: true, //switch on if needed
    //paginateSlot: [], //the items that will be shown on the page
    //pages: [], // the actual pages
    //activePage: 0, //the activly page
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
      this.menuItems = observable(annotateItems(items));
    },

    switchPage(page) {
      //sitches the page
      this.activePage = page;
      this.drawPages();
    },
    nextPage() {
    },
    prevPage() {

    },
    drawPages() {

    },
    createPages() {
      this.activePage = 0;
    },
    //sets the active page to wherever the hovering is located
    refocusPage() {

    },

    selectItem(id) {
      if (!this.menuItems[id].disabled) {
        this.selected = id;
        this.setHovering(id);
      }
    },
    clearStaging() {
      this.staging = null;
    },
    commitStaging() {
      let menuItems = this.menuItems
      menuItems.push(this.staging);
      this.menuItems = annotateItems(menuItems); //reannotate the indeces
      this.clearStaging();

    },
    addItem(item) {
      let menuItems = this.menuItems
      item.id = menuItems.length;
      menuItems.push(item);
      this.menuItems = annotateItems(menuItems); //reannotate the indeces
    },
    updateStaging(label) {
      if (this.staging)
        this.staging.label = label;
      else
        this.staging = { label: label };
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

  //store.createPages();
  let extendedStore = extendObservable(store, {
    get foo() {
      return 'rii'
    },
    get pages() {
      return chunk(this.menuItems, this.maxItems);
    },
    get maxItems() {
      /* todo: do this later once we have the items part working
      if ((this.state.store.menuItems.length * ITEM_HEIGHT) > this.menuHeight) {
        return (menuMeta.height - (2 * ITEM_HEIGHT))/ITEM_HEIGHT;
      } else {
        return this.state.store.menuItems.length;
      }
      */
      return 9;
    },
    get activePage() {
      let active = 0;
      this.pages.forEach((page, index) => {
        if (includes(page.map((item) => item.id), this.hovering)) {
          //this.paginateSlot = page;
          active = index;
        }
      });
      return active;
    },
    get paginateSlot() {
      return this.pages[this.activePage];
    },

  });

  return extendedStore;
};

export default createStore;
