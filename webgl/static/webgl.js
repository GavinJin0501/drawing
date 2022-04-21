// canvas background variables
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let width;
let height;
let pxScale;

let frameCount = 0;
let frameRate = 10;


// canvas animation
function bling() {
    animation = requestAnimationFrame(bling);

    if (frameCount % frameRate === 0) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const p = Math.random();
            
            // use the math random as the probability so simulate the star
            if (p >= 0.001) {  // black
                data[i] = 0;
                data[i+1] = 0;
                data[i+2] = 0;
            } else {            // white
                data[i] = 255;
                data[i+1] = 255;
                data[i+2] = 255;
            }
        }

        context.putImageData(imageData, 0, 0);
    }
    
    frameCount = (frameCount + 1) % frameRate;
}


// canvas drawing
function setup() {
    pxScale = window.devicePixelRatio;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    canvas.width = width * pxScale;
    canvas.height = height * pxScale;

    context.scale(pxScale, pxScale);
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
}


// three.js object variables
let camera, scene, renderer, model, material;

// webgl drawing 
function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(1, width/height, 0.1, 25000);
    camera.position.set(0, 200, 700);
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xfdfbd3, 3);
    light.position.set(1, 1, 1);
    scene.add(light);

    // const pointLight = new THREE.PointLight(0xff00ff, 1, 1000); 
    // pointLight.position.set(-400, 400, 400);
    // scene.add(pointLight);


    const loader = new THREE.GLTFLoader();
    loader.load('./static/rocket.gltf', function(gltf) { 
        model = gltf.scene;
        scene.add(model);
    
        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset;

        material = new  THREE.MeshStandardMaterial({color: 0x8A7F8D, metalness: 0.5});
        model.traverse(o => {
            if (o.isMesh) {o.material = material};
        });
      });

    // render
    renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor( 0x000000, 0 );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}


// webgl animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
    if (model) { // make sure model is loaded before animating
        model.rotation.y += 0.01;
        model.rotation.z += 0.01;
    }
  
    
    controls.update();
  }
  


window.addEventListener('load', () => {
    setup(); 
    bling(); 
    init();
    animate();
});

window.addEventListener('resize', () => {
    setup(); 
    bling(); 
});

