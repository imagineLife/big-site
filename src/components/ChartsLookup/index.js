import { AddingSvg as AddingSvgBox } from './Boxes';
import {
  AddingSvg as AddingSvgCol,
  TheLayout as TheLayoutCol,
} from './Columns';
import AddingSvgContextProvider from './State/AddingSvg';
const lookupObj = {
  box: {
    AddingSvg: AddingSvgBox,
  },
  col: {
    AddingSvg: AddingSvgCol,
    TheLayout: TheLayoutCol,
  },
  state: {
    AddingSvg: AddingSvgContextProvider,
  },
};
export default lookupObj;
