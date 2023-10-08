/**
 * 从props配置中获取默认值
 * @param props
 * @param overrideProps
 * @returns
 */
export function getDefaultFromProps<T = Record<string, any>>(
  props: Record<string, any>,
  overrideProps: T
): T | Record<string, any> {
  const defaults = Object.entries(props).reduce((temp, [key, value]) => {
    temp[key] = value?.default;
    return temp;
  }, {} as any);
  return {
    ...defaults,
    ...overrideProps,
  };
}
