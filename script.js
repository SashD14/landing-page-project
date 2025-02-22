// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Section fade-in animation when scrolling
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    threshold: 0.2 // Trigger animation when 20% of section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const submitBtn = document.getElementById("submit-btn");
    const feedback = document.getElementById("feedback");

    // Show loading state
    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    // Simulate server response
    setTimeout(() => {
        const success = Math.random() > 0.3;

        feedback.style.display = "block";
        feedback.className = success ? "feedback success" : "feedback error";
        feedback.innerHTML = success
            ? "Message sent successfully!"
            : "Oops! Something went wrong.";

        // Reset button
        submitBtn.innerHTML = "Send Message";
        submitBtn.disabled = false;
    }, 2000);

    // Example backend connection (Replace this URL with your actual server endpoint)
    fetch("http://your-server-endpoint/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message })
    })
    .then((response) => response.json())
    .then((data) => {
        feedback.style.display = "block";
        feedback.className = "feedback success";
        feedback.innerHTML = "Message sent successfully!";
    })
    .catch((error) => {
        feedback.style.display = "block";
        feedback.className = "feedback error";
        feedback.innerHTML = "Oops! Something went wrong.";
    });
});

// Select all "Buy Now" buttons
const buyNowButtons = document.querySelectorAll(".buy-now");

// Add click event listener to each button
buyNowButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const link = button.getAttribute("data-link"); // Get the link from data-link
        if (link) {
            window.open(link, "_blank"); // Open the link in a new tab
        } else {
            alert("No link specified for this button.");
        }
    });
});
