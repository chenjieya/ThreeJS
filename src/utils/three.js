// 导入整个threejs的核心库
import * as THREE from 'three';

export class Three {
    constructor(el) {
        this.scene = new THREE.Scene();  // 创建一个场景
        /**
         * @params { Number }  fov 摄像机视锥体(出现在屏幕上的空间区域)垂直视野角度 （上方平面与摄像机的夹角）
         * @params { Number }  aspect 摄像机看到场景的长宽比
         * @params { Number }  near  近平面与相机的距离
         * @params { Number }  far  远平面与相机的距离
         */
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  // 创建一个相机
        this.geometry = new THREE.BoxGeometry(1, 1, 10);  // 创建几何体
        this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});  // 创建材质
        this.cube = new THREE.Mesh(this.geometry, this.material);  // 将材质和几何体融合到一起
        this.renderer = new THREE.WebGLRenderer();  // 创建一个渲染器

        this.el = el;  // 元素

        this.init(); // 初始化 
    }

    /**
     * 初始化函数
     */
    init() {
        this.camera.position.z = 5; // 设置相机的高度，默认是和场景并排的，不会出现任何效果
        this.scene.add(this.cube); // 将几何体添加到场景当中
        this.renderer.setSize(window.innerWidth, window.innerHeight);  // 设置渲染的范围
        this.el.appendChild( this.renderer.domElement );  // 将绘制成的元素添加到页面上
        
        this.animate(); // 执行动画
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