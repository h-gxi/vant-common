import ActionBar from "./action-bar";
import ActionBarItem from "./action-bar-item";
import ActionSheet from "./action-sheet";
import Address from "./address";
import AddressSelect from "./address-select";
import FormCheckbox from "./form-checkbox";
import Header from "./header";
import List from "./list";
import ListCard from "./list-card";
import ListCell from "./list-cell";
import Navbar from "./navbar";
import Noticebar from "./noticebar";
import PageContainer from "./page-container";
import Popup from "./popup";
import PopupRadio from "./popup-radio";
import Setps from "./setps";
import SetpsItem from "./setps-item";
import Table from "./table";
import TableColumn from "./table-column";
const version = "0.4.8";
function install(app) {
  const components = [
    ActionBar,
    ActionBarItem,
    ActionSheet,
    Address,
    AddressSelect,
    FormCheckbox,
    Header,
    List,
    ListCard,
    ListCell,
    Navbar,
    Noticebar,
    PageContainer,
    Popup,
    PopupRadio,
    Setps,
    SetpsItem,
    Table,
    TableColumn
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
export {
  ActionBar,
  ActionBarItem,
  ActionSheet,
  Address,
  AddressSelect,
  FormCheckbox,
  Header,
  List,
  ListCard,
  ListCell,
  Navbar,
  Noticebar,
  PageContainer,
  Popup,
  PopupRadio,
  Setps,
  SetpsItem,
  Table,
  TableColumn,
  stdin_default as default,
  install,
  version
};
