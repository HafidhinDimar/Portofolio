// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Form Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    formMessage.textContent = 'Pesan Anda telah terkirim! Saya akan segera menghubungi Anda.';
    formMessage.className = 'mt-4 p-3 bg-green-100 text-green-700 rounded-lg';
    formMessage.classList.remove('hidden');
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// EmailJS Integration
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah reload halaman

    // Ambil data dari form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Kirim data ke EmailJS
    emailjs
      .send("service_f953bpg", "template_ss9ynfl", {
        from_name: name,
        from_email: email,
        from_subject: subject,
        message: message,
      })
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          document.getElementById("form-message").innerText =
            "Pesan berhasil dikirim!";
          document.getElementById("form-message").classList.remove("hidden");
          document.getElementById("form-message").classList.add("text-green-500");
        },
        function (error) {
          console.log("FAILED...", error);
          document.getElementById("form-message").innerText =
            "Pesan gagal dikirim. Silakan coba lagi.";
          document.getElementById("form-message").classList.remove("hidden");
          document.getElementById("form-message").classList.add("text-red-500");
        }
      );
  });