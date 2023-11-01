import type { App } from "vue";
// TODO 渐变边框组件
import BorderWrapper from "./BorderWrapper";
import ChartEmpty from "./ChartEmpty";
import CollapsePanel from "./CollapsePanel";
import CustomTable from "./CustomTable";
import DateMonthPicker from "./DateMonthPicker";
import EllipticTags from "./EllipticTags";
import Loading from "./Loading";
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from "./ReIcon";
import ScreenBox from "./ScreenBox";
import TableEmpty from "./TableEmpty";
import WeekMonthPicker from "./WeekMonthPicker";
// TODO 文件预览组件
// 图片、word、excel、pdf

export type { TagType } from "./EllipticTags/types";

const componentList = [
  BorderWrapper,
  ChartEmpty,
  CollapsePanel,
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
  CollapsePanel,
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
