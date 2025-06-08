  let scene, camera, renderer, model, textureMesh;

init();
animate();

function init() {
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// ✅ Create renderer and add to DOM
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvasContainer').appendChild(renderer.domElement);

// 💡 Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// 📦 Load building model
const loader = new THREE.GLTFLoader();
loader.load('assets/burj_khalifa_model.glb', function (gltf) {
model = gltf.scene;
model.scale.set(0.05, 0.05, 0.05);
model.position.y = -1.5;
scene.add(model);
}, undefined, function (error) {
console.error('Model load error:', error);
});

// 🎨 Load initial texture
const tex = new THREE.TextureLoader().load('assets/example_texture.png');
const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
textureMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
textureMesh.position.z = 2;
scene.add(textureMesh);

// 📁 Upload handler
document.getElementById("textureUpload").addEventListener("change", handleTextureUpload);
window.addEventListener('resize', onWindowResize);
}

function handleTextureUpload(event) {
const file = event.target.files[0];
if (!file) return;

const reader = new FileReader();
reader.onload = function (e) {
const uploadedTexture = new THREE.TextureLoader().load(e.target.result, function (newTex) {
textureMesh.material.map = newTex;
textureMesh.material.needsUpdate = true;
});
};
reader.readAsDataURL(file);
}

function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
requestAnimationFrame(animate);
if (model) model.rotation.y += 0.002;
renderer.render(scene, camera);
}

// 📸 Snapshot function — globally available
window.takeSnapshot = function () {
return new Promise((resolve) => {
requestAnimationFrame(() => {
renderer.render(scene, camera);
const dataUrl = renderer.domElement.toDataURL('image/png');
const link = document.createElement('a');
link.download = 'skycanvas_snapshot.png';
link.href = dataUrl;
link.click();
resolve();
});
});
};
