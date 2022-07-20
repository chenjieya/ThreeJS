// 导入整个threejs的核心库
import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'

export class Three {
    constructor(el, cameraObj, geometryObj, materialObj) {

        const { radian = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000, position } = cameraObj;
        const { width = 1, hieght = 1, depth = 1 } = geometryObj;

        // 保存变量
        this.cameraRadian = radian;
        this.cameraAspect = aspect;
        this.cameraNear = near;
        this.cameraFar = far;
        this.cameraPosition = position;
        this.geometryWidth = width;
        this.geometryHieght = hieght;
        this.geometryDepth = depth;
        this.el = el;  // 元素
        // 颜色
        this.skyColor = 0xffffff // 天空 白色
        this.groundColor = 0x000000 // 地面 黑色
        this.intensity = 1


        this.scene = new THREE.Scene();  // 创建一个场景
        /**
         * @params { Number }  fov 摄像机视锥体(出现在屏幕上的空间区域)垂直视野角度 （上方平面与摄像机的夹角）
         * @params { Number }  aspect 摄像机看到场景的长宽比
         * @params { Number }  near  近平面与相机的距离
         * @params { Number }  far  远平面与相机的距离
         */
        this.camera = new THREE.PerspectiveCamera( this.cameraRadian, this.cameraAspect, this.cameraNear, this.cameraFar );  // 创建一个相机

        // this.geometry = new THREE.BoxGeometry(this.geometryWidth, 50, 100);  // 创建几何体
        this.geometry = new THREE.PlaneGeometry(10000, 10000);

        this.axes = new THREE.AxesHelper(700);  // 辅助坐标系

        this.light = new THREE.HemisphereLight(this.skyColor, this.groundColor, this.intensity);  // 灯光
        
        this.loader = new THREE.TextureLoader();  // 加载器

       
        // this.material = new THREE.MeshPhongMaterial({map: textrue, side: THREE.DoubleSide});  // 创建材质
        // this.material = new THREE.MeshBasicMaterial(materialObj);
        // this.cube = new THREE.Mesh(this.geometry, this.material);  // 将材质和几何体融合到一起
        
        this.renderer = new THREE.WebGLRenderer();  // 创建一个渲染器

        this.init(); // 初始化 
    }

    /**
     * 初始化函数
     */
    init() {
        this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);  // 设置相机的高度，默认是和场景并排的，不会出现任何效果
        this.camera.lookAt(0, 0, 0);

        
        // this.cube.rotation.x = Math.PI * -0.5;

        // this.scene.add(this.cube); // 将几何体添加到场景当中
        this.scene.add(this.axes);  // 增加辅助
        this.scene.add(this.light);  // 增加灯光
        this.scene.background = new THREE.Color(0x87ceeb);  // 背景
        this.scene.fog = new THREE.Fog(0x87ceeb, 100, 10000);  // 雾

        this.loader.load('https://img2.baidu.com/it/u=1253656886,3143712494&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1658422800&t=a93b198b552c87835089aca813a61868', (textrue) => {
            textrue.wrapS = THREE.RepeatWrapping;
            textrue.wrapT = THREE.RepeatWrapping;
            textrue.magFilter = THREE.NearestFilter;
            textrue.repeat.set(100, 100);
    
            this.material = new THREE.MeshPhongMaterial({map: textrue, side: THREE.DoubleSide});  // 创建材质
            this.cube = new THREE.Mesh(this.geometry, this.material);  // 将材质和几何体融合到一起
            this.scene.add(this.cube); // 将几何体添加到场景当中

            this.el.appendChild( this.renderer.domElement );  // 将绘制成的元素添加到页面上

            this.cube.rotation.x = 2;
            this.renderer.setSize(window.innerWidth, window.innerHeight);  // 设置渲染的范围   以后记着改
            this.controls = new OrbitControls( this.camera, this.renderer.domElement );  // 鼠标可以控制相机
            this.controls.update();

            this.renderer.render( this.scene, this.camera );
        });

        // this.floor();

        
        // this.renderer.render( this.scene, this.camera );
        // this.animate(); // 执行动画
    }

    floor() {
        const loader = new THREE.TextureLoader()
        const texture = loader.load('https://img0.baidu.com/it/u=72505490,1583457147&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1658422800&t=9df0e256b0dc26c59b8ac95e2aab928e')
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.magFilter = THREE.NearestFilter
        texture.repeat.set(2, 2)
        const planeGeo = new THREE.PlaneGeometry(300, 300)
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide
        })
        const mesh = new THREE.Mesh(planeGeo, planeMat)
        mesh.rotation.x = Math.PI * -0.5
        mesh.position.y = 1
        scene.add(mesh)
    }

    /**
     * 动画函数
     */
    animate() {
        requestAnimationFrame( this.animate.bind(this) );  // 浏览器在重绘之前调用该方法，通常是每秒60次和浏览器的刷新频率次数相匹配
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render( this.scene, this.camera );
    }
}