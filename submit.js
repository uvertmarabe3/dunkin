// Initialize EmailJS
(function() {
    emailjs.init("7GKQeEwEnuTFMGBI9"); // 🔥 Your EmailJS public key
})();

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    // Remove show class after animation completes (optional)
    setTimeout(() => {
        toast.className = `toast ${type}`;
    }, 3000); // match the animation duration
}

// Handle form submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        showToast("Please fill out all fields.", "error");
        return;
    }

    // Send email without showing server error to user
    emailjs.send("service_nerxc27", "template_e9sl4i8", { name, email, message })
        .then((response) => {
            console.log("EmailJS response:", response);
            showToast("Message sent successfully!", "success");
            contactForm.reset();
        })
        .catch((error) => {
            console.error("EmailJS error (ignored for user):", error);
            // Do not show error toast
        });
});



const container = document.getElementById('donutViewer');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfce4ec);

const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// LIGHTS
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// LOAD STL
const loader = new THREE.STLLoader();
loader.load('dognut.stl', function(geometry) {

    const material = new THREE.MeshStandardMaterial({
        color: 0xff69b4,
        metalness: 0.2,
        roughness: 0.6
    });

    const mesh = new THREE.Mesh(geometry, material);

    geometry.center();
    scene.add(mesh);

    animate();
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});