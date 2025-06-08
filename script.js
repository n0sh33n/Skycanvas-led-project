{\rtf1\ansi\ansicpg1252\cocoartf2580
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww31360\viewh19740\viewkind0
\deftab720
\pard\pardeftab720\pardirnatural\partightenfactor0

\f0\fs24 \cf0 let scene, camera, renderer, model, textureMesh;\
\
init();\
animate();\
\
function init() \{\
  scene = new THREE.Scene();\
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\
  camera.position.z = 5;\
\
  renderer = new THREE.WebGLRenderer(\{ antialias: true \});\
  renderer.setSize(window.innerWidth, window.innerHeight);\
  document.getElementById('canvasContainer').appendChild(renderer.domElement);\
\
  const light = new THREE.AmbientLight(0xffffff, 1);\
  scene.add(light);\
\
  const loader = new THREE.GLTFLoader();\
  loader.load('assets/burj_khalifa_model.glb', gltf => \{\
    model = gltf.scene;\
    scene.add(model);\
    model.scale.set(0.05, 0.05, 0.05);\
    model.position.y = -1.5;\
  \});\
\
  const planeGeo = new THREE.PlaneGeometry(2, 2);\
  const tex = new THREE.TextureLoader().load('assets/example_texture.png');\
  const mat = new THREE.MeshBasicMaterial(\{ map: tex, transparent: true \});\
  textureMesh = new THREE.Mesh(planeGeo, mat);\
  textureMesh.position.z = 2;\
  scene.add(textureMesh);\
\
  document.getElementById("textureUpload").addEventListener("change", handleTextureUpload);\
  window.addEventListener('resize', onWindowResize);\
\}\
\
function handleTextureUpload(event) \{\
  const file = event.target.files[0];\
  if (!file) return;\
\
  const reader = new FileReader();\
  reader.onload = function(e) \{\
    new THREE.TextureLoader().load(e.target.result, function(newTex) \{\
      textureMesh.material.map = newTex;\
      textureMesh.material.needsUpdate = true;\
    \});\
  \};\
  reader.readAsDataURL(file);\
\}\
\
function animate() \{\
  requestAnimationFrame(animate);\
  if (model) model.rotation.y += 0.002;\
  renderer.render(scene, camera);\
\}\
\
function onWindowResize() \{\
  camera.aspect = window.innerWidth / window.innerHeight;\
  camera.updateProjectionMatrix();\
  renderer.setSize(window.innerWidth, window.innerHeight);\
\}\
}