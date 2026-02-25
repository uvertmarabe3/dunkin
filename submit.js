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