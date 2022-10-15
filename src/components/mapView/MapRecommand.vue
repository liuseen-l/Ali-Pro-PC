<template>
    <div class="map-recommand">
        <div class="content">
            <div class="content-header">
                <button
                    :class="[{ active: tab == 1 }, 'custom-btn', 'btn-3']"
                    @click="showRestaurants"
                >
                    <span>热门美食</span>
                </button>
                <button
                    :class="[{ active: tab == 2 }, 'custom-btn', 'btn-3']"
                    @click="showScenery"
                >
                    <span>热门景点</span>
                </button>
                <button
                    :class="[{ active: tab == 3 }, 'custom-btn', 'btn-3']"
                    @click="showChat"
                >
                    <span>聊天室</span>
                </button>
            </div>
            <div class="content-body">
                <div v-if="tab == 1" class="recommand-list">
                    <el-scrollbar style="height: 100%">
                        <map-recommand-card
                            v-for="(item, index) in recommandPlaces"
                            :type="'restaurant'"
                            :key="index"
                            :data="item"
                        >
                        </map-recommand-card>
                    </el-scrollbar>
                </div>

                <div v-else-if="tab == 2" class="recommand-list">
                    <el-scrollbar style="height: 100%">
                        <map-recommand-card
                            v-for="(item, index) in recommandPlaces"
                            :type="'scenery'"
                            :key="index"
                            :data="item"
                        >
                        </map-recommand-card>
                    </el-scrollbar>
                </div>
                <div v-else-if="tab == 3" class="recommand-list" style="padding:0;">
                    <MapChetRoom />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MapRecommandCard from "@/components/mapView/MapRecommandCard";
import Vue from "vue";
import mapboxgl from "mapbox-gl";
import MapChetRoom from "./MapChetRoom.vue";
import axios from "axios";
let self;
export default {
    name: "MapCenter",
    components: {
        MapRecommandCard,
        MapChetRoom,
    },
    data() {
        return {
            currentMarkers: [],
            recommandPlaces: [],
        };
    },

    mounted: function () {
        self = this;
    },
    computed: {
        longitude() {
            return this.$store.getters.currentLongitude;
        },
        latitude() {
            return this.$store.getters.currentLatitude;
        },
        tab() {
            return this.$store.getters.Tab;
        },
            //获取聊天信息，监听数据变化
        theChatRoom: function () {
        return this.$store.getters.theChatRoom;
        }
    },
    watch: {
        longitude() {
            this.tab == 1 ? this.getRestaurants() : this.getScenery();
        },
        latitude() {
            this.tab == 1 ? this.getRestaurants() : this.getScenery();
        },
    },

    methods: {
        getRestaurants() {
            var _this = this;
            axios({
                //请求方式为get
                method: "get",
                //绝对路径
                url: "http://restapi.amap.com/v3/place/around",
                //其他设置省略
                params: {
                    key: "df295ed980114633d24f5f186651247b",
                    // location: '120.3572,36.1010',
                    location: `${this.longitude},${this.latitude}`,
                    keywords: "餐饮",
                    radius: 1000,
                    offset: 5,
                    page: 1,
                    extensions: "all",
                },
            })
                .then((response) => {
                    this.recommandPlaces = response.data.pois;
                    console.log(response.data.pois);
                    self.addMarker(response.data.pois);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getScenery() {
            axios({
                //请求方式为get
                method: "get",
                //绝对路径
                url: "http://restapi.amap.com/v3/place/around",
                //其他设置省略
                params: {
                    key: "df295ed980114633d24f5f186651247b",
                    // location: '120.3572,36.1010',
                    location: `${this.longitude},${this.latitude}`,
                    keywords: "风景",
                    radius: 1000,
                    offset: 5,
                    page: 1,
                    extensions: "all",
                },
            })
                .then((response) => {
                    this.recommandPlaces = response.data.pois;
                    console.log(response.data.pois);
                    self.addMarker(response.data.pois);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        showRestaurants() {
            this.$store.commit("SET_TAB", 1);
            this.getRestaurants();
        },
        showScenery() {
            this.$store.commit("SET_TAB", 2);
            this.getScenery();
        },
        showChat(sname) {
            console.log("切换到聊天栏");
            let chatroom = this.theChatRoom;
            let name = sname;
            let localStorageArr = JSON.parse(localStorage.getItem("UserArray"));
            let username = localStorageArr[0];
            let indexOF ;
            chatroom.map((item, index) => {
                if(item.roomName == name ){
                item.Members.push({userName:username})
                this.$store.commit("theChatRoom_add_member",{userName:username},index)
                this.$store.commit("SET_OPENCHAT",item)
                indexOF = true
                }
            })
            if(indexOF){
                this.$store.commit("SET_TAB", 3);
                return 
            }else{
                let data = {
                    roomId:name,       //聊天室ID
                    roomName:name,  //聊天室名称
                //聊天室成员
                Members:[{
                userName: username,
                }],
                //历史消息
                Message_history:[]
            }
                this.$store.commit("SET_OPENCHAT",data)
                this.$store.commit("ADD_THECHATROOM", data);
                this.$store.commit("SET_TAB", 3);
            }
        },
        addMarker(pois) {
            var _this = this;
            // 加载 图标
           
            let map = Vue.prototype.$map;
            map.on("load", function (map) {
                // let that = this;
                // console.log("地图加载完成");
                // self.currentMarkers.forEach(function (marker) {
                //     marker.remove();
                // });
                pois.forEach(function (marker) {
                  console.log(marker.name)
                    const marker_on = new mapboxgl.Marker({
                        // color: marker.color,
                        anchor: "center",
                        draggable: false,
                    })
                        .setLngLat(marker.location.split(","))
                        .addTo(Vue.prototype.$map);
                    // self.currentMarkers.push(marker_on);

                    const el = marker_on.getElement();
                    el.addEventListener("click", () => {
                        self.showChat(marker.name);
                    });
                    const popup = new mapboxgl.Popup({
                        // anchor: "right",
                        offset: [0, -15],
                        className: "info",
                        closeButton: false,
                        closeOnClick: false,
                        maxWidth: "200px",
                    })
                        .setLngLat(marker.location.split(","))
                        .setHTML(marker.name)
                        .addTo(Vue.prototype.$map);
                });
            });
        },
    },
};
</script>
<style lang="less" scoped>
.map-recommand {
    width: 35%;
    height: 100%;
    // background: #0d2b61 url("~@/assets/images/recommend_bg.png") no-repeat;
    // background-size: 98% 98%;
    // background-position: center;
    padding: 24px 40px 24px 10px;
    .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        .content-header {
            padding-left: 1%;
            .custom-btn {
                width: 130px;
                height: 40px;
                color: #fff;
                border-top-left-radius: 16px;
                border-top-right-radius: 16px;
                padding: 10px 25px;
                font-family: "Lato", sans-serif;
                font-weight: 500;
                font-size: 16px;
                background: transparent;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                display: inline-block;
                box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
                    inset -7px -7px 10px 0px rgba(0, 0, 0, 0.1),
                    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
                    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
                text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5),
                    -4px -4px 6px rgba(116, 125, 136, 0.2);
                outline: none;
            }
            .btn-3 {
                color: #fff;
                background: #689ee9;
                width: 130px;
                height: 40px;
                line-height: 42px;
                padding: 0;
                border: none;
            }
            .active {
                background: #0d2b61;
            }
            .btn-3 span {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
            }

            .btn-3:before,
            .btn-3:after {
                position: absolute;
                content: "";
                right: 0;
                top: 0;
                background: rgba(2, 126, 251, 1);
                transition: all 0.3s ease;
            }

            .btn-3:before {
                height: 0%;
                width: 2px;
            }

            .btn-3:after {
                width: 0%;
                height: 2px;
            }

            .btn-3:hover {
                background: transparent;
                box-shadow: none;
            }

            .btn-3:hover:before {
                height: 100%;
            }

            .btn-3:hover:after {
                width: 100%;
            }

            .btn-3 span:hover {
                color: rgba(2, 126, 251, 1);
            }

            .btn-3 span:before,
            .btn-3 span:after {
                position: absolute;
                content: "";
                left: 0;
                bottom: 0;
                background: rgba(2, 126, 251, 1);
                transition: all 0.3s ease;
            }

            .btn-3 span:before {
                width: 2px;
                height: 0%;
            }

            .btn-3 span:after {
                width: 0%;
                height: 2px;
            }

            .btn-3 span:hover:before {
                height: 100%;
            }

            .btn-3 span:hover:after {
                width: 100%;
            }
        }
        .content-body {
            height: 100%;
            box-shadow: 8px 8px 8px #000;
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            &::before {
                content: "";
                background-image: conic-gradient(
                    #689ee9 20deg,
                    transparent 120deg
                );
                width: 150%;
                height: 150%;
                position: absolute;
                animation: rotate 5s linear infinite;
                z-index: 1;
            }
            &::after {
                content: "";
                width: 98%;
                height: 99%;
                background: #0d2b61;
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
                box-shadow: inset 8px 8px 16px #000;
            }
            .recommand-list {
                width: 100%;
                height: 100%;
                padding: 30px 0;
                position: relative;
                z-index: 3;
                display: flex;
                flex-direction: column;
                /deep/ .el-scrollbar {
                    .el-scrollbar__wrap {
                        overflow-x: hidden;
                        margin-right: -21px !important;
                    }
                }
            }
        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
