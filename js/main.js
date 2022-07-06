let camera, scene, renderer, ambient, directionalLight, flash, snow, snowGeo, snowParticles, snowGeoVertices, snowMat, loader, cloud, cloudGeo, cloudMat, cloudParticles;
const snowVelocity = 3, wind = 0, snowCount = 7500, cloudCount = 100;

// scene
scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x040407, 0.002); // 0x11111f | 0x040407
// camera
camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
camera.position.z = 1;
camera.rotation.x = 1.16;
camera.rotation.y = -0.12;
// camera.rotation.z = 0.27;
// renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(scene.fog.color);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// ambient light
ambient = new THREE.AmbientLight(0xE9D5CA);
scene.add(ambient);
// directional light
directionalLight = new THREE.DirectionalLight(0xffeedd); // 0x371B58
directionalLight.position.set(0,0,1);
scene.add(directionalLight);
// snow
snowParticles = [];

loader = new THREE.TextureLoader();
loader.load("img/snowflake.png", function(texture) {
    snowGeo = new THREE.PlaneBufferGeometry(0.7, 0.7);
    snowMat = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
    });

    for (let i = 0; i < snowCount; i++) {
        snow = new THREE.Mesh(snowGeo, snowMat);
        snow.position.set(
            Math.random() * 400 - 200,
            Math.random() * 500 - 250,
            Math.random() * 500 - 200
          );
        snow.rotation.x = Math.random() * 2*Math.PI;
        snow.rotation.y = Math.random() * 2*Math.PI;
        snow.rotation.z = Math.random() * 2*Math.PI;
        snow.material.opacity = 0.5;
        snowParticles.push(snow);
        scene.add(snow);
    }
});
// clouds
cloudParticles = [];

loader = new THREE.TextureLoader();
loader.load("img/smoke.png", function(texture) {
    cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    cloudMat = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
    });

    for (let i = 0; i < cloudCount; i++) {
        cloud = new THREE.Mesh(cloudGeo, cloudMat);
        cloud.position.set(
            Math.random() * 1400 - 500,
            500,
            Math.random() * -500 
          );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 2*Math.PI;
        cloud.material.opacity = 0.5;
        cloudParticles.push(cloud);
        scene.add(cloud);
    }
});

animate();

function snowAnimation() {
    snowParticles.forEach(snowflake => {
        snowflake.position.y -= snowVelocity;
        if (snowflake.position.y < -200) {
            snowflake.position.y = Math.random() * 200 + 50;
        }

        snowflake.position.x -= wind;
        if (snowflake.position.x < -200 && wind > 0) {
            snowflake.position.x = Math.random() * 200 + 50;
        } else if (snowflake.position.x > 200 && wind < 0) {
            snowflake.position.x = Math.random() - 200 - 50;
        } 
    })
}

function cloudAnimation() {
    cloudParticles.forEach(cloud => {
        cloud.rotation.z -= -0.0015;

        cloud.position.x -= wind;
        if (cloud.position.x < -600 && wind > 0) {
            cloud.position.x = Math.random() * 300 + 800;
        } else if (cloud.position.x > 800 && wind < 0) {
            cloud.position.x = Math.random() * -300 - 600;
        }
    })
}

function animate() {
    requestAnimationFrame(animate);
    snowAnimation();
    cloudAnimation();
    renderer.render(scene, camera);
}