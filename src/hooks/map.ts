// 参考手册
// https://lbs.amap.com/api/javascript-api-v2/documentation#markerclustergetmaxzoom
// 示例
// https://lbs.amap.com/demo/list/jsapi-v2

export type Position = [number, number];
type MarkerOptions = {
  position: Position;
  title?: string;
  content?: string;
};

export const useMap = (AMap: any, mapInstance: any) => {
  var infoWindow = {
    instance: null,
    id: "",
  };
  // 生成一个点标记
  const renderMarker = (options: MarkerOptions) => {
    const marker = new AMap.Marker({
      ...options,
    });
    return marker;
  };
  // 添加点标记
  const addMarker = (positionList: Position[]) => {
    positionList.forEach((position) => {
      const marker = renderMarker({
        position,
      });
      mapInstance.add(marker);
    });
  };

  // 自定义非聚合点样式生成方法
  const clusterRenderMarker = (context: any) => {
    const content =
      '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
    const offset = new AMap.Pixel(-9, -9);
    context.marker.setContent(content);
    context.marker.setOffset(offset);
  };

  /**
   *
   * @param elementId 元素id
   * @param force 是否强制生成并返回新的窗体实例
   * @returns
   */
  const getInfoWindow = (elementId: string, force: Boolean = false): any => {
    if (force === false && infoWindow.id === elementId && infoWindow.instance) {
      return infoWindow.instance;
    }
    infoWindow.id = elementId;
    infoWindow.instance = new AMap.InfoWindow({
      isCustom: true, // 使用自定义窗体
      content: document.getElementById(elementId) as HTMLElement,
      offset: new AMap.Pixel(16, -45),
      // 是否自动调整窗体到视野内
      autoMove: true,
      // 是否在鼠标点击地图后关闭信息窗体
      closeWhenClickMap: true,
    });
    return infoWindow.instance;
  };

  return {
    addMarker,
    clusterRenderMarker,
    getInfoWindow
  };
};
