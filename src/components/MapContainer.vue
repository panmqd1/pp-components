<template>
  <div class="wrapper">
    <div id="container"></div>
    <div
      id="generate"
      class="info_window"
      :class="{ show: infoWindowVisible }"
    >
      <div class="info_title">
        <span>我是光伏站名称</span>
        <span>查看更多</span>
      </div>
      <div class="info_content">
        <span class="content_item" v-for="(item, index) in 4" :key="index">
          <span class="label">装机容量：</span>
          <span class="value">
            <span>{{ xxx }}</span>
            <span class="unit">kWh</span>
          </span>
        </span>
      </div>
    </div>
    <div id="stored" class="info_window" :class="{ show: infoWindowVisible }">
      <div class="info_title">
        <span>我是储能站名称</span>
        <span>查看更多</span>
      </div>
      <div class="info_content">
        <span class="content_item" v-for="(item, index) in 4" :key="index">
          <span class="label">装机容量：</span>
          <span class="value">
            <span>{{ xxx }}</span>
            <span class="unit">kWh</span>
          </span>
        </span>
      </div>
    </div>
    <div id="charge" class="info_window" :class="{ show: infoWindowVisible }">
      <div class="info_title">
        <span>我是充电站名称</span>
        <span>查看更多</span>
      </div>
      <div class="info_content">
        <span class="content_item" v-for="(item, index) in 4" :key="index">
          <span class="label">装机容量：</span>
          <span class="value">
            <span>{{ xxx }}</span>
            <span class="unit">kWh</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, shallowRef, onMounted } from "vue";
import { type Position, useMap } from "/@/hooks/map";
import AMapLoader from "@amap/amap-jsapi-loader";

const map = shallowRef<any>(null);
const AMap = shallowRef<any>(null);
const initMap = async () => {
  try {
    AMap.value = await AMapLoader.load({
      key: "e476092604a4efba8da3401b84e40ccc",
      version: "2.0",
      plugins: ["AMap.MarkerCluster"],
    });
    map.value = new AMap.value.Map("container", {
      center: [104.937478, 35.439575],
      zoom: 5,
      mapStyle: "amap://styles/grey",
      // mapStyle: "amap://styles/darkblue",
    });
    map.value.clearMap(); // 清除地图覆盖物
    // 地图是否可拖拽和缩放
    map.value.setStatus({
      dragEnable: true, // 是否可拖拽
      zoomEnable: true, // 是否可缩放
    });
  } catch (e) {
    console.log(e);
  }
};

const mockPoints = [
  { lnglat: ["108.939621", "34.343147"] },
  { lnglat: [116.397428, 39.90923], abc: "aaa" },
  { lnglat: [115.382122, 37.901176], abc: "bbb" },
  { lnglat: [114.412222, 38.912345], abc: "ccc" },
];
const count = mockPoints.length;
var _renderClusterMarker = function (context: any) {
  var factor = Math.pow(context.count / count, 1 / 18);
  var div = document.createElement("div");
  var Hue = 180 - factor * 180;
  var bgColor = "hsla(" + Hue + ",100%,40%,0.7)";
  var fontColor = "hsla(" + Hue + ",100%,90%,1)";
  var borderColor = "hsla(" + Hue + ",100%,40%,1)";
  var shadowColor = "hsla(" + Hue + ",100%,90%,1)";
  div.style.backgroundColor = bgColor;
  var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
  div.style.width = div.style.height = size + "px";
  div.style.border = "solid 1px " + borderColor;
  div.style.borderRadius = size / 2 + "px";
  div.style.boxShadow = "0 0 5px " + shadowColor;
  div.innerHTML = context.count;
  div.style.lineHeight = size + "px";
  div.style.color = fontColor;
  div.style.fontSize = "14px";
  div.style.textAlign = "center";
  context.marker.setOffset(new AMap.value.Pixel(-size / 2, -size / 2));
  context.marker.setContent(div);
};
const infoWindowVisible = ref(false);
const closeInfoWindow = () => {
  map.value.clearInfoWindow();
};
const xxx = ref('123')
const handlePointClick = (e: any) => {
  closeInfoWindow();
  console.log("[ e ] >", e);
  // 聚合点
  const clusterData = e.clusterData;
  // 从聚合点中可以获取源数据
  console.log("[ clusterData[0].abc ] >", clusterData[0].abc);
  const lng = e.lnglat.getLng();
  const lat = e.lnglat.getLat();
  // TODO 根据源数据判断类型, 取不同的id
  const id = clusterData.length > 1 ? "generate" : "stored";
  xxx.value = clusterData.length > 1 ? '234' : '456'
  const infoWindow: any = infoWindows.value[id]
  infoWindow.open(map.value, [lng, lat]);
};
const cluster = shallowRef<any>(null);
const addCluster = () => {
  if (cluster.value) {
    cluster.value.setMap(null);
  }
  cluster.value = new AMap.value.MarkerCluster(map.value, mockPoints, {
    gridSize: 60, // 设置网格像素大小
    renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
    renderMarker: useMap(AMap.value, map.value).clusterRenderMarker,
  });
  cluster.value.on("click", handlePointClick);
};

const infoWindows = ref({
  generate: null,
  stored: null,
  charge: null,
});
const getInfoWindows = () => {
  infoWindows.value["generate"] = useMap(AMap.value, map.value).getInfoWindow(
    "generate"
  );
  infoWindows.value["stored"] = useMap(AMap.value, map.value).getInfoWindow(
    "stored"
  );
  infoWindows.value["charge"] = useMap(AMap.value, map.value).getInfoWindow(
    "charge"
  );
  infoWindowVisible.value = true;
};
onMounted(() => {
  initMap().then(() => {
    addCluster();
    getInfoWindows();
  });
});
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
#container {
  padding: 0;
  margin: 0;
  // width: 100%;
  width: 1400px;
  height: 1200px;
}

.info_window {
  width: 300px;
  height: 200px;
  background-color: #fff;
  visibility: hidden;
  position: absolute;
  &.show {
    visibility: visible;
    position: relative;
  }
  .info_title {
    color: blue;
  }
  .info_content {
  }
}
</style>
