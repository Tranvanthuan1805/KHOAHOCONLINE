// Background Animation Canvas
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Particle class for background animation
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#4c6ef5";
    ctx.fill();
  }
}

// Initialize particles
function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connecting lines
  ctx.globalAlpha = 0.1;
  ctx.strokeStyle = "#4c6ef5";
  ctx.lineWidth = 1;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Update and draw particles
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

// Mobile Navigation
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Counter animation for statistics
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-count");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0.2s";
      entry.target.style.animationFillMode = "both";
      entry.target.style.animationName = "fadeInUp";
      entry.target.style.animationDuration = "0.8s";

      // Animate counters when hero section is visible
      if (entry.target.classList.contains("hero-stats")) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".course-card, .feature-item, .contact-item, .hero-stats")
  .forEach((el) => {
    observer.observe(el);
  });

// Course card hover effects
document.querySelectorAll(".course-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Button click effects
document.querySelectorAll(".btn, .btn-course").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Đã gửi thành công!';
      submitBtn.style.background = "#28a745";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
        this.reset();
      }, 2000);
    }, 1500);
  });

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  }
});

// Dark Mode Toggle
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Update toggle icon
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("theme-toggle");
  const icon = themeToggle.querySelector("i");

  if (theme === "dark") {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
}

// Real-time Clock
function updateDateTime() {
  const now = new Date();
  const timeElement = document.getElementById("current-time");
  const dateElement = document.getElementById("current-date");

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  timeElement.textContent = now.toLocaleTimeString("vi-VN", timeOptions);
  dateElement.textContent = now.toLocaleDateString("vi-VN", dateOptions);
}

// Chat Bot Functionality
class ChatBot {
  constructor() {
    this.isOpen = false;
    this.responses = {
      greetings: [
        "Xin chào! Tôi có thể giúp gì cho bạn?",
        "Chào bạn! Bạn cần hỗ trợ về khóa học nào?",
        "Hello! Tôi sẵn sàng tư vấn cho bạn.",
      ],
      courses: [
        "Chúng tôi có nhiều khóa học IT chất lượng như JavaScript, React, Python, Node.js. Bạn quan tâm đến lĩnh vực nào?",
        "Các khóa học phổ biến: Frontend (React, JS), Backend (Node.js), AI/ML (Python), Mobile (React Native). Bạn muốn tìm hiểu khóa nào?",
        "TechLearn Pro cung cấp lộ trình từ cơ bản đến nâng cao. Bạn đã có kinh nghiệm lập trình chưa?",
      ],
      pricing: [
        "Giá khóa học từ 1.390.000₫ - 2.490.000₫. Hiện tại có nhiều ưu đãi hấp dẫn!",
        "Chúng tôi có chương trình học phí linh hoạt và nhiều gói khuyến mãi. Bạn quan tâm khóa nào?",
        "Giá cả cạnh tranh với chất lượng đảm bảo. Có hỗ trợ trả góp 0% lãi suất!",
      ],
      default: [
        "Tôi hiểu bạn đang tìm hiểu về khóa học. Bạn có thể hỏi về nội dung, giá cả, hoặc lộ trình học tập.",
        "Hãy cho tôi biết bạn quan tâm đến lĩnh vực nào trong IT nhé!",
        "Tôi có thể tư vấn về JavaScript, React, Python, Node.js và nhiều công nghệ khác. Bạn muốn học gì?",
      ],
    };

    this.init();
  }

  init() {
    this.chatToggle = document.getElementById("chat-bot-toggle");
    this.chatWindow = document.getElementById("chat-window");
    this.chatClose = document.getElementById("chat-close");
    this.chatInput = document.getElementById("chat-input");
    this.chatSend = document.getElementById("chat-send");
    this.chatMessages = document.getElementById("chat-messages");
    this.typingIndicator = document.getElementById("typing-indicator");

    this.bindEvents();
  }

  bindEvents() {
    this.chatToggle.addEventListener("click", () => this.toggleChat());
    this.chatClose.addEventListener("click", () => this.closeChat());
    this.chatSend.addEventListener("click", () => this.sendMessage());
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });

    // Auto-hide notification after first interaction
    this.chatToggle.addEventListener("click", () => {
      const notification = this.chatToggle.querySelector(".chat-notification");
      if (notification) notification.style.display = "none";
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.chatWindow.classList.toggle("active", this.isOpen);

    if (this.isOpen) {
      this.chatInput.focus();
    }
  }

  closeChat() {
    this.isOpen = false;
    this.chatWindow.classList.remove("active");
  }

  sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;

    this.addMessage(message, "user");
    this.chatInput.value = "";

    // Show typing indicator
    this.showTyping();

    // Simulate AI response delay
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(message);
      this.addMessage(response, "bot");
    }, 1000 + Math.random() * 2000);
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const now = new Date();
    const timeString = now.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageDiv.innerHTML = `
      <div class="message-avatar">
        ${
          sender === "bot"
            ? '<i class="fas fa-robot"></i>'
            : '<i class="fas fa-user"></i>'
        }
      </div>
      <div class="message-content">
        <p>${text}</p>
        <span class="message-time">${timeString}</span>
      </div>
    `;

    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("chào") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi")
    ) {
      return this.getRandomResponse("greetings");
    } else if (
      lowerMessage.includes("khóa học") ||
      lowerMessage.includes("course") ||
      lowerMessage.includes("học")
    ) {
      return this.getRandomResponse("courses");
    } else if (
      lowerMessage.includes("giá") ||
      lowerMessage.includes("phí") ||
      lowerMessage.includes("tiền")
    ) {
      return this.getRandomResponse("pricing");
    } else {
      return this.getRandomResponse("default");
    }
  }

  getRandomResponse(category) {
    const responses = this.responses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  showTyping() {
    this.typingIndicator.classList.add("active");
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  hideTyping() {
    this.typingIndicator.classList.remove("active");
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  initParticles();
  animateParticles();
  initTheme();

  // Initialize real-time clock
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Initialize chat bot
  new ChatBot();

  // Add CSS for ripple effect
  const style = document.createElement("style");
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .btn, .btn-course {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});

// Handle window resize
window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

// Course registration functionality
document.querySelectorAll(".btn-course").forEach((btn) => {
  btn.addEventListener("click", function () {
    const courseCard = this.closest(".course-card");
    const courseName = courseCard.querySelector("h3").textContent;
    const coursePrice = courseCard.querySelector(".current-price").textContent;

    // Show registration modal (you can implement a proper modal here)
    alert(
      `Bạn đã chọn đăng ký khóa học: ${courseName}\nGiá: ${coursePrice}\n\nLiên hệ hotline: 0123 456 789 để hoàn tất đăng ký!`
    );
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
