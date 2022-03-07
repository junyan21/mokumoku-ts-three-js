import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


/******************************************************************
描画準備
******************************************************************/

// Three.jsでの描画内容を表示するHTML要素を取得します
const canvas = document.querySelector('canvas.webgl') as HTMLElement

// よく使う値は定数として定義しておきます
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


/******************************************************************
描画する対象 = Scene
******************************************************************/
const scene = new THREE.Scene()



/******************************************************************
 カメラ
******************************************************************/
const camera = new THREE.PerspectiveCamera(
  75,                           // 75°の視野角
  sizes.width / sizes.height,   // アスペクト比
  0.1,                          // 手前のどこからを描画対象とするか
  100                           // 遠くのどこまで描画対象とするか
)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
scene.add(camera)



/******************************************************************
空間に3Dオブジェクトを配置します
******************************************************************/
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'green' })
)
scene.add(cube)



/******************************************************************
Orbit Controls
キーボードやマウスでカメラを動かせるようにします
******************************************************************/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // 滑らかな慣性スクロールを有効化



/******************************************************************
描画マシン Renderer
HTMLCanvas要素を要求しているので、最初に取得した'canvas'を入れます
******************************************************************/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// モニタの描画解像度がどんどん上がっているものの肉眼で違いがわかる + パフォーマンス見合い => '2'
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



/******************************************************************
ウィンドウサイズ変更
Three.jsの描画領域もウィンドウサイズにマッチするように調整します
******************************************************************/
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/******************************************************************
アニメーション
毎フレーム毎に座標を調整してアニメーションさせます
******************************************************************/
const clock = new THREE.Clock()

// フレーム毎にやりたい処理を定義します
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update Controls
  controls.update()

  // Renderer
  renderer.render(scene, camera)

  // 次の描画フレームを要求します
  window.requestAnimationFrame(tick)
}

// 実際に処理を呼び出し
tick()