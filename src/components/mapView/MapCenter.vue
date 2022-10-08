<template>
  <div class="map-center" id="map">
    <pre id="location">经纬度：{{ mouseLon + "," + mouseLat }}</pre>
  </div>
</template>
<script src="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js"></script>
<script src="https://unpkg.com/three@0.126.0/build/three.min.js"></script>
<script src="https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js"></script>
<script>
import Vue from "vue";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import * as THREE from "three"; //引入Threejs

import {
  MapboxStyleDefinition,
  MapboxStyleSwitcherControl,
} from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
// import { tSObjectKeyword } from "@babel/types";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: "MapCenter",
  props: {
    msg: String,
  },
  data() {
    return {
      map: "", //地图
      lon: "120.1187", //用户经度
      lat: "36.0035", //用户纬度
      mouseLon: "120", //鼠标经度
      mouseLat: "36", //鼠标纬度
      searchLayer: null, //搜索的点图层
    };
  },

  mounted() {
    this.initMap();
    this.setBuild();
    this.flyToPosition(this.lon, this.lat);
    this.locationFn()
      .then((res) => {
        // setTimeout(function(){
        // this.flyToPosition(this.lon, this.lat);
        // },1000)
        this.flyToPosition(this.lon, this.lat);
        this.$store.commit("SET_LONGITUDE", this.lon);
        this.$store.commit("SET_LATITUDE", this.lat);
      })
      .catch((err) => {
        alert("位置信息获取失败");
      });
  },
  computed: {
    searchInfo() {
      console.log(this.$store.getters.searchInfo);
      let lon = this.$store.getters.searchInfo.longitude;
      let lat = this.$store.getters.searchInfo.latitude;
      // this.flyToPosition(lon, lat);
      return this.$store.getters.searchInfo;
    },
  },
  watch: {
    searchInfo(n, o) {
      let lon = this.$store.getters.searchInfo.longitude;
      let lat = this.$store.getters.searchInfo.latitude;
      this.$store.commit("SET_LONGITUDE", lon);
      this.$store.commit("SET_LATITUDE", lat);
      this.map.flyTo({
        center: [lon, lat], // 中心点
        zoom: 16.5, // 缩放比例
        pitch: 45, // 倾斜度
      });
    },
  },
  methods: {
    //初始化地图
    initMap: function () {
      // var map = this.map;
      // let that = this;
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiemh1cWlxaTEyMyIsImEiOiJjbDZwdThzOTkwNzd6M2JvODd4eXN0NXdrIn0.G6_v-vFX1Atl8tHwkKLLFQ";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/zhuqiqi123/cl8k6g97m000b14mnjt8341ig",
        center: [120.1187, 36.0035],
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
      this.map.addControl(
        new mapboxgl.AttributionControl({
          compact: true,
          customAttribution: "仅用于内部学习",
        })
      );
      // 全屏按钮
      this.map.addControl(new mapboxgl.FullscreenControl());
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
      Vue.prototype.$map = this.map;
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
    },
    setBuild() {
      // parameters to ensure the model is georeferenced correctly on the map
      // const modelOrigin = [120.1191366986115, 36.00159849516021];
      const modelOrigin = [this.lon, this.lat];
      const modelAltitude = 50;
      const modelRotate = [Math.PI / 2, 0, 0];

      const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
      );

      // transformation parameters to position, rotate and scale the 3D model onto the map
      const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since the 3D model is in real world meters, a scale transform needs to be
         * applied since the CustomLayerInterface expects units in MercatorCoordinates.
         */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
      };

      // configuration of the custom layer for a 3D model per the CustomLayerInterface
      const customLayer = {
        id: "3d-model",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map, gl) {
          this.camera = new THREE.Camera();
          this.scene = new THREE.Scene();

          // create two three.js lights to illuminate the model
          const directionalLight = new THREE.DirectionalLight(0xffffff);
          directionalLight.position.set(0, -70, 100).normalize();
          this.scene.add(directionalLight);

          const directionalLight2 = new THREE.DirectionalLight(0xffffff);
          directionalLight2.position.set(0, 70, 100).normalize();
          this.scene.add(directionalLight2);

          // use the three.js GLTF loader to add the 3D model to the three.js scene
          const loader = new GLTFLoader();
          loader.load(
            // "./models/scene.gltf",
            "https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
            (gltf) => {
              this.scene.add(gltf.scene);
            }
          );
          this.map = map;

          // use the Mapbox GL JS map canvas for three.js
          this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true,
          });

          this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
          const rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
          );
          const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
          );
          const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
          );

          const m = new THREE.Matrix4().fromArray(matrix);
          const l = new THREE.Matrix4()
            .makeTranslation(
              modelTransform.translateX,
              modelTransform.translateY,
              modelTransform.translateZ
            )
            .scale(
              new THREE.Vector3(
                modelTransform.scale,
                -modelTransform.scale,
                modelTransform.scale
              )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

          this.camera.projectionMatrix = m.multiply(l);
          this.renderer.resetState();
          this.renderer.render(this.scene, this.camera);
          this.map.triggerRepaint();
        },
      };

      this.map.on("style.load", () => {
        this.map.addLayer(customLayer, "waterway-label");
      });
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
    flyToPosition: function (lon, lat) {
      // flyToPosition(lon, lat) {
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
