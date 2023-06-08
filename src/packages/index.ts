import type { App } from "vue";
import BorderWrapper from "./BorderWrapper/index.vue";
import ChartEmpty from "./ChartEmpty/index.vue";
import CustomTable from "./CustomTable/index.vue";
import DateMonthPicker from "./DateMonthPicker/index.vue";
import EllipticTags from "./EllipticTags/index.vue";
import Loading from "./Loading/index.vue";
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from "./ReIcon";
import ScreenBox from "./ScreenBox/index.vue";
import TableEmpty from "./TableEmpty/index.vue";
import WeekMonthPicker from "./WeekMonthPicker/index.vue";

const componentList = [
  BorderWrapper,
  ChartEmpty,
  CustomTable,
  DateMonthPicker,
  EllipticTags,
  Loading,
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon,
  ScreenBox,
  TableEmpty,
  WeekMonthPicker,
];

// 按需导出
export {
  BorderWrapper,
  ChartEmpty,
  CustomTable,
  DateMonthPicker,
  EllipticTags,
  Loading,
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon,
  ScreenBox,
  TableEmpty,
  WeekMonthPicker,
};

// 全量导出
const install = (app: App) => {
  componentList.forEach((component) => {
    app.component(component.name, component);
  });
};

export default install;
