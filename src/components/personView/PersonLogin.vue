<template>
  <div class="login"></div>
</template>

<script>
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";
// 容器
let container = null;
// 声明视口宽度
let width = null;
// 声明视口高度
let height = null;
// 盒模型的深度
const depth = 1400;
// 声明场景
let scene = null;
// 声明球组
let Sphere_Group = null;
// 声明球体几何
let sphereGeometry = null;
// 声明完整球
let sphere = null;
// 声明相机
let camera = null;
// 声明相机在z轴的位置
let zAxisNumber = null;
// 声明相机目标点
let cameraTarget = new THREE.Vector3(0, 0, 0);
// 声明点材质
let materials = [];
// 声明点的参数
let parameters = null;
// 声明点在z轴上移动的进度
let zprogress = null;
// 声明同上（第二个几何点）
let zprogress_second = null;
// 声明粒子1
let particles_first = null;
// 声明粒子1
let particles_second = null;
// 声明粒子1的初始化位置
let particles_init_position = null;
// 声明流动的云对象1（包含路径、云实例）
let cloudParameter_first = null;
// 声明流动的云对象2（包含路径、云实例）
let cloudParameter_second = null;
// 声明云流动的渲染函数1
let renderCloudMove_first = null;
// 声明云流动的渲染函数1
let renderCloudMove_second = null;
// 声明性能监控
let stats = new Stats();
// 声明渲染器
let renderer = null;
// 声明调试工具
let gui = new GUI();
export default {
  name: "PersonLogin",
  mounted() {
    this.initThree();
  },
  initThree() {
    container = document.getElementById("login");
    width = container.clientWidth;
    height = container.clientHeight;
    this.initScene();
    this.initSceneBg();
    this.initCamera();
    this.initLight();
    this.initSphereModal();
    this.initSphereGroup();
    particles_init_position = -zAxisNumber - depth / 2;
    zprogress = particles_init_position;
    zprogress_second = particles_init_position * 2;
    particles_first = this.initSceneStar(particles_init_position);
    particles_second = this.initSceneStar(zprogress_second);
    cloudParameter_first = this.initTubeRoute(
      [
        new THREE.Vector3(-width / 10, 0, -depth / 2),
        new THREE.Vector3(-width / 4, height / 8, 0),
        new THREE.Vector3(-width / 4, 0, zAxisNumber),
      ],
      400,
      200
    );
    cloudParameter_second = this.initTubeRoute(
      [
        new THREE.Vector3(width / 8, height / 8, -depth / 2),
        new THREE.Vector3(width / 8, height / 8, zAxisNumber),
      ],
      200,
      100
    );
    this.initRenderer();
    // 控制器必须放在renderer函数后面
    this.initOrbitControls();
    this.animate();
    // initGUI()
    // const axesHelper = new THREE.AxesHelper(2000)
    // scene.add(axesHelper)
  },
  initSceneBg() {
    new THREE.TextureLoader().load(
      require("@/assets/images/sky.png"),
      (texture) => {
        const geometry = new THREE.BoxGeometry(width, height, depth); // 创建一个球形几何体 SphereGeometry
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
        }); // 创建基础为网格基础材料
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      }
    );
  },
  initOrbitControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    // enabled设置为true是可以使用鼠标控制视角
    controls.enabled = false;
    controls.update();
  },
  // 初始化相机
  initCamera() {
    /**
     * 方式1：固定视野的距离，求满足完整的视野画面需要多大的视域角度
     * tan正切值（直角边除以临边）
     * const mathTan_value = width / 2 / depth
     * 视域角度
     * const fov_angle = (Math.atan(mathTan_value) * 180) / Math.PI
     * 创建透视相机
     * new THREE.PerspectiveCamera(fov_angle, width / height, 1, depth)
     * 场景是一个矩形容器（坐标(0, 0, 0)是矩形容器的中心），相机能看到的距离是depth，
     * camera.position.set(0, 0, depth / 2)
     */

    /**
     * 使用透视相机
     * 参数值分别是：
     * fov（field of view） — 摄像机视锥体垂直视野角度
     * aspect — 摄像机视锥体长宽比
     * near — 摄像机视锥体近端面
     * far — 摄像机视锥体远端面
     * 这里需要注意：透视相机是鱼眼效果，如果视域越大，边缘变形越大。
     * 为了避免边缘变形，可以将fov角度设置小一些，距离拉远一些
     */

    /**
     * 方式2:固定视域角度，求需要多少距离才能满足完整的视野画面
     * 15度等于(Math.PI / 12)
     */
    const fov = 15;
    const distance = width / 2 / Math.tan(Math.PI / 12);
    zAxisNumber = Math.floor(distance - depth / 2);
    camera = new THREE.PerspectiveCamera(fov, width / height, 1, 30000);
    /**
     * 这里给z轴的距离加了100，原因是做调整，使得视域更完整
     * 这么做并不代表前面计算错误了，根据前面的计算值并不能很完整的看到
     * 至于原因，我想大概就类似于0.1+0.2不等于0.3吧
     * 所以我自作主张地加了100的值做调整（但是不建议，因为当屏幕足够宽时候会看到边缘）
     */
    // camera.position.set(0, 0, zAxisNumber + 100)
    camera.position.set(0, 0, zAxisNumber);
    camera.lookAt(cameraTarget);
    // const helper = new THREE.CameraHelper(camera)
    // helper.update()
    // scene.add(helper)
  },

  //光源
  initLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // 右下角点光源
    const light_rightBottom = new THREE.PointLight(0x0655fd, 5, 0);
    light_rightBottom.position.set(0, 100, -200);
    scene.add(light_rightBottom);
    scene.add(ambientLight);
  },

  // 初始化球体模型
  initSphereModal() {
    //材质
    let material = new THREE.MeshPhongMaterial();
    material.map = new THREE.TextureLoader().load(
      require("@/assets/images/earth_bg.png")
    );
    material.blendDstAlpha = 1;
    //几何体
    sphereGeometry = new THREE.SphereGeometry(50, 64, 32);
    //模型
    sphere = new THREE.Mesh(sphereGeometry, material);
  },

  // 初始化组 --- 球体
  initSphereGroup() {
    Sphere_Group = new THREE.Group();
    Sphere_Group.add(sphere);
    Sphere_Group.position.x = -400;
    Sphere_Group.position.y = 200;
    Sphere_Group.position.z = -200;
    scene.add(Sphere_Group);
  },

  // 初始化流动路径
  initTubeRoute(route = null, geometryWidth = null, geometryHeigh = null) {
    const curve = new THREE.CatmullRomCurve3(route, false);
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 50, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      // color: '0x4488ff',
      opacity: 0,
      transparent: true,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);

    const clondGeometry = new THREE.PlaneGeometry(geometryWidth, geometryHeigh);
    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load(
      require("@/assets/images/cloud.png")
    );
    const clondMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });
    const cloud = new THREE.Mesh(clondGeometry, clondMaterial);
    scene.add(cloud);
    return {
      cloud,
      curve,
    };
  },

  // 初始化场景星星效果
  initSceneStar(initZposition) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const pointsGeometry = [];
    const textureLoader = new THREE.TextureLoader();
    const sprite1 = textureLoader.load(
      require("@/assets/images/starflake1.png")
    );
    const sprite2 = textureLoader.load(
      require("@/assets/images/starflake2.png")
    );
    parameters = [
      [[0.6, 100, 0.75], sprite1, 50],
      [[0, 0, 1], sprite2, 20],
    ];
    // 初始化500个节点
    for (let i = 0; i < 500; i++) {
      /**
       * const x: number = Math.random() * 2 * width - width
       * 等价
       * THREE.MathUtils.randFloatSpread(width)
       */
      const x = THREE.MathUtils.randFloatSpread(width);
      // eslint-disable-next-line no-undef
      const y = _.random(0, height / 2);
      // eslint-disable-next-line no-undef
      const z = _.random(-depth / 2, zAxisNumber);
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    // 创建2种不同的材质的节点（500 * 2）
    for (let i = 0; i < parameters.length; i++) {
      const color = parameters[i][0];
      const sprite = parameters[i][1];
      const size = parameters[i][2];

      materials[i] = new THREE.PointsMaterial({
        size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        transparent: true,
      });
      materials[i].color.setHSL(color[0], color[1], color[2]);
      const particles = new THREE.Points(geometry, materials[i]);
      particles.rotation.x = Math.random() * 0.2 - 0.15;
      particles.rotation.z = Math.random() * 0.2 - 0.15;
      particles.rotation.y = Math.random() * 0.2 - 0.15;
      particles.position.setZ(initZposition);
      pointsGeometry.push(particles);
      scene.add(particles);
    }
    return pointsGeometry;
  },

  // 渲染星球的自转
  renderSphereRotate() {
    if (sphere) {
      Sphere_Group.rotateY(0.001);
    }
  },

  // 渲染星星的运动
  renderStarMove() {
    const time = Date.now() * 0.00005;
    zprogress += 1;
    zprogress_second += 1;

    if (zprogress >= zAxisNumber + depth / 2) {
      zprogress = particles_init_position;
    } else {
      particles_first.forEach((item) => {
        item.position.setZ(zprogress);
      });
    }
    if (zprogress_second >= zAxisNumber + depth / 2) {
      zprogress_second = particles_init_position;
    } else {
      particles_second.forEach((item) => {
        item.position.setZ(zprogress_second);
      });
    }

    for (let i = 0; i < materials.length; i++) {
      const color = parameters[i][0];

      const h = ((360 * (color[0] + time)) % 360) / 360;
      materials[i].color.setHSL(color[0], color[1], parseFloat(h.toFixed(2)));
    }
  },

  // 初始化云的运动函数
  initCloudMove(
    cloudParameter,
    speed,
    scaleSpeed = 0.0006,
    maxScale = 1,
    startScale = 0
  ) {
    let cloudProgress = 0;
    return () => {
      if (startScale < maxScale) {
        startScale += scaleSpeed;
        cloudParameter.cloud.scale.setScalar(startScale);
      }
      if (cloudProgress > 1) {
        cloudProgress = 0;
        startScale = 0;
      } else {
        cloudProgress += speed;
        if (cloudParameter.curve) {
          const point = cloudParameter.curve.getPoint(cloudProgress);
          if (point && point.x) {
            cloudParameter.cloud.position.set(point.x, point.y, point.z);
          }
        }
      }
    };
  },

  //渲染器
  initRenderer() {
    // 开启抗锯齿
    // 在 css 中设置背景色透明显示渐变色
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // 定义渲染器的尺寸；在这里它会填满整个屏幕
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    container.appendChild(stats.dom);
    renderCloudMove_first = this.initCloudMove(cloudParameter_first, 0.0002);
    renderCloudMove_second = this.initCloudMove(
      cloudParameter_second,
      0.0008,
      0.001
    );
  },

  //动画刷新
  animate() {
    requestAnimationFrame(this.animate);
    this.renderSphereRotate();
    this.renderStarMove();
    renderCloudMove_first();
    renderCloudMove_second();
    renderer.render(scene, camera);
  },
  // // 获取验证码
  // async getValidateCodeHandle() {
  //   // 请求获取验证码 并设置验证码的图片以及验证码token
  //   state.codeSrc = "";
  //   state.codetoken = "";
  // },

  // // 提交表单
  // submitForm() {
  //   const form = unref(formRef);
  //   if (!form) return;
  //   form.validate((valid) => {
  //     if (valid) {
  //       submitHandle();
  //     } else {
  //       ElMessage.warning({
  //         message: "随便输入用户名、密码、验证码即可登陆",
  //         type: "warning",
  //       });
  //     }
  //   });
  // },

  // 提交请求
  // async submitHandle() {
  //   const params = {
  //     password: formField.pass,
  //     username: formField.user,
  //     verifyCode: formField.code,
  //   };
  //   // 提交登陆请求
  // },
};
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
}
</style>
