/**
 * v1
 * 转化为千分位
 * @param num
 */
export function convertToThousands_v1(
  num: number | string,
  toFixed?: number | undefined,
  returnSame?: boolean
): string {
  if (typeof num === "string") {
    const parsedNum = Number(num);
    if (isNaN(parsedNum) || !isFinite(parsedNum)) {
      return returnSame ? num : "";
    }
    num = parsedNum;
  } else if (!isFinite(num)) {
    return returnSame ? "" : "";
  } else if (!num && num !== 0) {
    return returnSame ? "" : "";
  }

  // 判断数字是否为负数
  const isNegative = num < 0;
  // 取数字的绝对值, 然后四舍五入或直接转字符串
  num = Math.abs(num);
  const numStr =
    typeof toFixed === "number" ? num.toFixed(toFixed) : String(num);
  const parts = numStr.split("."); // 获取整数部分和小数部分
  const integerPart = parts[0]; // 获取整数部分

  // 将整数部分每三个数字为一组，添加逗号分隔符
  let result = "";
  for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
    result = integerPart.charAt(i) + result;
    if ((j + 1) % 3 === 0 && j + 1 !== integerPart.length) {
      result = "," + result;
    }
  }

  // 如果有小数部分则添加到结果字符串的末尾
  if (parts.length === 2) {
    result = result + "." + parts[1];
  }

  // 如果是负数, 添加负号到字符串的头部
  if (isNegative) {
    result = "-" + result;
  }

  return result;
}

/**
 * v2
 * 数字转千分位字符串, 使用toLocaleString()
 * @param num
 */
export const convertToThousands = (
  num: number | string,
  toFixed?: number | undefined,
  returnSame?: boolean,
  extraOptions?: Intl.NumberFormatOptions
): string => {
  // 排除非数字和非字符串类型
  if (typeof num !== "number" && typeof num !== "string") {
    return returnSame ? num : "";
  }

  // 排除NaN
  if (typeof num === "number" && isNaN(num)) {
    return returnSame ? (num as any) : "";
  }

  // 字符串类型, 尝试转为数字类型
  if (typeof num === "string") {
    const parsedNum = Number(num);
    // 如果转换后的数字是NaN或其他非0非法值
    if (isNaN(parsedNum) || (!parsedNum && parsedNum !== 0)) {
      return returnSame ? num : "";
    }

    num = parsedNum;
  }

  // 根据入参, 定义toLocaleString()的入参
  // NOTE toLocaleString() 小数部分默认保留3位小数
  const maximumFractionDigits =
    typeof toFixed === "number" ? toFixed : undefined;
  const options = {
    // 最多保留x位小数
    maximumFractionDigits,
    ...(extraOptions || {}),
  };

  return num.toLocaleString("en-US", options);
};

// 将未知类型的值转换为数字，如果转换失败则返回 NaN
export const convertToValidNumberOrNaN = (num: unknown) => {
  // NOTE typeof Infinity === 'number'
  // NOTE typeof NaN === 'number'
  if (typeof num === "number") {
    return num;
  }

  if (typeof num === "string") {
    const parsedNum = Number(num);
    if (isNaN(parsedNum) || !isFinite(parsedNum)) {
      return NaN;
    }
    return parsedNum;
  }

  return NaN;
};

// 将未知类型的值转换为带单位的字符串，如果转换失败则返回占位符
export const formatNumberToNumberUnitStrOrPlaceholder = (
  num: unknown,
  unit = "",
  placeholder = "-",
  toFixed?: number | undefined
) => {
  const data = convertToValidNumberOrNaN(num);
  const fixedNumber =
    typeof toFixed === "number" ? data.toFixed(toFixed) : data;
  return isNaN(data) ? placeholder : `${fixedNumber}${unit}`;
};
