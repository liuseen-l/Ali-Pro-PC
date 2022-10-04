<template>
  <div class="map-center" id="map">
    <pre id="location">经纬度：{{ mouseLon + "," + mouseLat }}</pre>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import {
  MapboxStyleDefinition,
  MapboxStyleSwitcherControl,
} from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
// import { tSObjectKeyword } from "@babel/types";
import * as THREE from "three";
import { Threebox } from "threebox-map";
export default {
  name: "MapCenter",
  props: {
    msg: String,
  },
  data() {
    return {
      map: "", //地图
      lon: "120", //用户经度
      lat: "36", //用户纬度
      mouseLon: "120", //鼠标经度
      mouseLat: "36", //鼠标纬度
    };
  },
  mounted() {
    this.initMap();

    this.locationFn()
      .then((res) => {
        // setTimeout(function(){alert("shjs")},1000)
        this.flyToPosition(this.lon, this.lat);
        this.$store.commit("SET_LONGITUDE", this.lon);
        this.$store.commit("SET_LATITUDE", this.lat);
      })
      .catch((err) => {
        alert("位置信息获取失败");
      });
  },

  methods: {
    //初始化地图
    initMap: function () {
      // let that = this;
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiemh1cWlxaTEyMyIsImEiOiJjbDZwdThzOTkwNzd6M2JvODd4eXN0NXdrIn0.G6_v-vFX1Atl8tHwkKLLFQ";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/zhuqiqi123/cl8k6g97m000b14mnjt8341ig",
        center: [120.116, 36],
        // center: [116.34, 39.88],
        zoom: 2,
        // pitch: 60, //地图的角度，不写默认是0，取值是0-60度
        // bearing: -17.6, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: true, ////抗锯齿，通过false关闭提升性能
        attributionControl: false,
        projection: "globe", //地图投影
      });
      // //设置中文
      mapboxgl.setRTLTextPlugin(
        "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
      );
      this.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans",
        })
      );
      // 地图定位控件
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          // 当地图激活时，当设备的位置发生变化时，它会收到更新
          trackUserLocation: true,
          // 在定位点旁边画一个箭头来表示设备的方向.
          showUserHeading: true,
        })
      );
      //加入缩放控件
      var nav = new mapboxgl.NavigationControl();
      this.map.addControl(nav, "top-left");
      // //去除mapbox logo
      // this.map._logoControl &&
      //     this.map.removeControl(this.map._logoControl);
      //获取鼠标位置，显示经纬度
      this.map.on("mousemove", (e) => {
        var location = this.map.queryRenderedFeatures(e.point);
        // this.lonlat= e.lngLat.lng.toFixed(4) +"," +e.lngLat.lat.toFixed(4)
        this.lonlat = 2134;
        this.mouseLon = e.lngLat.lng.toFixed(4);
        this.mouseLat = e.lngLat.lat.toFixed(4);
      });
      //点击地图获取坐标
      this.map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        console.log(lng, lat);
        this.$store.commit("SET_LONGITUDE", lng);
        this.$store.commit("SET_LATITUDE", lat);
      });
      const styles = [
        {
          title: "3D 建筑",
          uri: "mapbox://styles/zhuqiqi123/cl8k6g97m000b14mnjt8341ig",
        },
        {
          title: "普通模式",
          uri: "mapbox://styles/mapbox/streets-zh-v1",
        },

        {
          title: "遥感影像",
          uri: "mapbox://styles/mapbox/satellite-v9",
        },
        {
          title: "3D 影像",
          uri: "mapbox://styles/zhuqiqi123/cl8rcmkro000014pfow9a6k01",
        },
        {
          title: "连绵山川",
          uri: "mapbox://styles/zhuqiqi123/cl8rcui6h000514oc0ocgks0s",
        },
        {
          title: "水墨地图",
          uri: "mapbox://styles/zhuqiqi123/cl8rcf55b000r15o6wkjlf0gh",
        },
        {
          title: "怀念年代",
          uri: "mapbox://styles/zhuqiqi123/cl8rc4v3w000t15o9lapip4xx",
        },
        {
          title: "游戏世界",
          uri: "mapbox://styles/zhuqiqi123/cl8rccz7h002114mxzrctwb2r",
        },
      ];
      const options = {
        defaultStyle: "Dark",
        eventListeners: {
          // return true if you want to stop execution
          //           onOpen: (event: MouseEvent) => boolean;
          //           onSelect: (event: MouseEvent) => boolean;
          //           onChange: (event: MouseEvent, style: string) => boolean;
        },
      };
      this.map.addControl(new MapboxStyleSwitcherControl(styles, options));
      var scale = new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: "metric",
      });
      this.map.addControl(scale, "bottom-left");

      // let tb = null;
      // window.THREE = THREE;
      // this.map.on("style.load", function () {
      //     this.map.addLayer({
      //         id: "custom_layer",
      //         type: "custom",
      //         renderingMode: "3d",
      //         onAdd: function (map, mbxContext) {
      //             window.tb = new Threebox(map, mbxContext, {
      //                 defaultLights: true,
      //             });
      //             // 从外部导入obj文件，其大小扩大10倍
      //             var options = {
      //                 obj: "./models/girls.obj",
      //                 mtl: "./models/girls.mtl",
      //                 scale: 10,
      //             };
      //             tb.loadObj(options, function (model) {
      //                 let truck = model.setCoords(origin);
      //                 tb.add(truck);
      //             });
      //         },
      //         render: function (gl, matrix) {
      //             tb.update();
      //         },
      //     });
      // });
    },
    //获取位置信息异步函数
    locationFn() {
      let that = this;
      return new Promise(function (res, err) {
        //获取位置信息失败的回调函数
        function showError(error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("定位失败,用户拒绝请求地理定位");
              err();
              break;
            case error.POSITION_UNAVAILABLE:
              alert("定位失败,位置信息是不可用");
              err();
              break;
            case error.TIMEOUT:
              alert("定位失败,请求获取用户位置超时");
              err();
              break;
            case error.UNKNOWN_ERROR:
              alert("定位失败,定位系统失效");
              err();
              break;
          }
        }

        //获取位置信息成功的回调函数
        function showPosition(position) {
          that.lat = position.coords.latitude;
          that.lon = position.coords.longitude;
          res();
        }

        //获取位置信息
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError, {
            enableHighAccuracy: true,
          });
        } else {
          alert("浏览器不支持地理定位。");
          err();
        }
      });
    },
    flyToPosition(lon, lat) {
      this.map.flyTo({
        center: [this.lon, this.lat], // 中心点
        zoom: 16.5, // 缩放比例
        pitch: 45, // 倾斜度
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "mapbox-gl/dist/mapbox-gl.css";
.map-center {
  width: 100%;
  height: 100%;
}
#location {
  position: absolute;
  z-index: 1000;
  bottom: 40px;
  left: 15px;
  width: 100px;
  height: 20px;
  color: white;
}
// .mapboxgl-ctrl.mapboxgl-ctrl-scale {
// 	height: 10px;
// 	background-color:transparent;
// 	line-height:10%;
// 	text-align:center
// }

// 1.node_modules/mapbox-gl/dist/mapbox-gl.css
// 2.mapboxgl-ctrl-logo，display:none
</style>
