var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  ActionBar: () => import_action_bar.default,
  ActionBarItem: () => import_action_bar_item.default,
  ActionSheet: () => import_action_sheet.default,
  Address: () => import_address.default,
  AddressSelect: () => import_address_select.default,
  FormCheckbox: () => import_form_checkbox.default,
  Header: () => import_header.default,
  List: () => import_list.default,
  ListCard: () => import_list_card.default,
  ListCell: () => import_list_cell.default,
  Navbar: () => import_navbar.default,
  Noticebar: () => import_noticebar.default,
  PageContainer: () => import_page_container.default,
  Popup: () => import_popup.default,
  PopupRadio: () => import_popup_radio.default,
  Setps: () => import_setps.default,
  SetpsItem: () => import_setps_item.default,
  Table: () => import_table.default,
  TableColumn: () => import_table_column.default,
  default: () => stdin_default,
  install: () => install,
  version: () => version
});
module.exports = __toCommonJS(stdin_exports);
var import_action_bar = __toESM(require("./action-bar"));
var import_action_bar_item = __toESM(require("./action-bar-item"));
var import_action_sheet = __toESM(require("./action-sheet"));
var import_address = __toESM(require("./address"));
var import_address_select = __toESM(require("./address-select"));
var import_form_checkbox = __toESM(require("./form-checkbox"));
var import_header = __toESM(require("./header"));
var import_list = __toESM(require("./list"));
var import_list_card = __toESM(require("./list-card"));
var import_list_cell = __toESM(require("./list-cell"));
var import_navbar = __toESM(require("./navbar"));
var import_noticebar = __toESM(require("./noticebar"));
var import_page_container = __toESM(require("./page-container"));
var import_popup = __toESM(require("./popup"));
var import_popup_radio = __toESM(require("./popup-radio"));
var import_setps = __toESM(require("./setps"));
var import_setps_item = __toESM(require("./setps-item"));
var import_table = __toESM(require("./table"));
var import_table_column = __toESM(require("./table-column"));
const version = "0.4.8";
function install(app) {
  const components = [
    import_action_bar.default,
    import_action_bar_item.default,
    import_action_sheet.default,
    import_address.default,
    import_address_select.default,
    import_form_checkbox.default,
    import_header.default,
    import_list.default,
    import_list_card.default,
    import_list_cell.default,
    import_navbar.default,
    import_noticebar.default,
    import_page_container.default,
    import_popup.default,
    import_popup_radio.default,
    import_setps.default,
    import_setps_item.default,
    import_table.default,
    import_table_column.default
  ];
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var stdin_default = {
  install,
  version
};
