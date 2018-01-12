import { observable, autorun, extendObservable } from 'mobx';
import { chunk, extend, includes, each } from 'lodash';

/*
 TODO: width determined by elements, but has max width
    - pagination
      maxItemsPerPage = (menuHeight - (2 * itemHeight)) / menuHeight
        if there is more than fits on the page
*/

var ITEM_HEIGHT = 24;

var createStore = function createStore(_ref) {
  var menuMeta = _ref.menuMeta,
      menuItems = _ref.menuItems,
      selected = _ref.selected;

  var annotateItems = function annotateItems(items) {
    items.forEach(function (item, index) {
      return item.id = index;
    });
    return items;
  };

  var selectedIndex = null;
  if (typeof selected === 'number') {
    selectedIndex = selected;
  } else if (menuItems.length > 0) {
    selectedIndex = 0;
  }

  var store = observable({
    //activelyHovered: false, //returns true if the menu is selected
    trashbin: null, //used for confirming deletion
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
    menuMeta: menuMeta,
    menuItems: annotateItems(menuItems),
    coreItems: menuItems,
    menuHeight: 240,
    paginate: true, //switch on if needed
    //paginateSlot: [], //the items that will be shown on the page
    //pages: [], // the actual pages
    //activePage: 0, //the activly page
    setChecked: function setChecked(id) {
      this.checked.set(id, true);
    },
    setUnChecked: function setUnChecked(id) {
      this.checked.delete(id);
    },
    isChecked: function isChecked(id) {
      return this.checked.has(id);
    },
    setItems: function setItems(items) {
      this.menuItems = annotateItems(items);
    },
    switchPage: function switchPage(page) {
      //sitches the page
      this.activePage = page;
      this.drawPages();
    },
    nextPage: function nextPage() {},
    prevPage: function prevPage() {},
    drawPages: function drawPages() {},
    createPages: function createPages() {
      this.activePage = 0;
    },

    //sets the active page to wherever the hovering is located
    refocusPage: function refocusPage() {},
    selectItem: function selectItem(id) {
      if (!this.menuItems[id].disabled) {
        this.selected = id;
        this.setHovering(id);
      }
    },
    clearStaging: function clearStaging() {
      this.staging = null;
    },
    commitStaging: function commitStaging() {
      var menuItems = this.menuItems;
      menuItems.push(this.staging);
      this.menuItems = annotateItems(menuItems); //reannotate the indeces
      this.clearStaging();
    },
    addItem: function addItem(item) {
      var menuItems = this.menuItems;
      item.id = menuItems.length;
      menuItems.push(item);
      this.menuItems = annotateItems(menuItems); //reannotate the indeces
    },
    updateStaging: function updateStaging(label) {
      if (this.staging) this.staging.label = label;else this.staging = { label: label };
    },
    isHovering: function isHovering(id) {
      return this.hovering === id;
    },
    setHovering: function setHovering(id) {

      if (this.hovering !== id) {
        this.hovering = id;
      }
    },
    setEditing: function setEditing(id) {
      //setup the editing for the item
      if (this.editing.id !== id) {
        this.editing = {
          id: id,
          label: this.menuItems[id].label
        };
      }
    },
    clearEditing: function clearEditing() {
      this.editing = {
        id: null,
        label: null
      };
    },
    updateLabel: function updateLabel(label) {
      this.editing.label = label;
    },
    commitEditing: function commitEditing() {
      if (this.editing.id !== null) {
        this.menuItems[this.editing.id].label = this.editing.label;
        this.clearEditing();
      }
    },
    setTrashBin: function setTrashBin(id) {
      this.clearEditing(); //so we don't get a editing and trash at the same time
      this.trashbin = id;
    },
    destroyItem: function destroyItem(id) {
      //removes the item
      this.menuItems = annotateItems(this.menuItems.filter(function (item, index) {
        return index !== id;
      }));
      this.clearTrashBin();
      this.drawPages();
    },
    clearTrashBin: function clearTrashBin() {
      this.trashbin = null;
    }
  });

  //store.createPages();
  var extendedStore = extendObservable(store, {
    get foo() {
      return 'rii';
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
      var _this = this;

      var active = 0;
      this.pages.forEach(function (page, index) {
        if (includes(page.map(function (item) {
          return item.id;
        }), _this.hovering)) {
          //this.paginateSlot = page;
          active = index;
        }
      });
      return active;
    },
    get paginateSlot() {
      return this.pages[this.activePage];
    }

  });

  return extendedStore;
};

export default createStore;