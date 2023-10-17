export type CustomTableColumn = {
  label: string;
  prop: string;
  width?: string;
  showOverflowTooltip?: boolean;
  headerStyle?: object;
  style?: object;
  operationText?: string;
  operateFn?: (row: any) => void;
}