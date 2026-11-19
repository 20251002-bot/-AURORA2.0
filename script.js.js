// script.js — 極光音響 互動功能

document.addEventListener('DOMContentLoaded', () => {
  // ========== 圖片輪播 (首頁) ==========
  const track = document.getElementById('carouselTrack');
  if (track) {
    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 自動輪播 (每 6 秒)
    let autoInterval = setInterval(nextSlide, 6000);

    // 滑鼠移入暫停自動輪播
    const carouselContainer = document.querySelector('.carousel');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoInterval));
    carouselContainer.addEventListener('mouseleave', () => {
      autoInterval = setInterval(nextSlide, 6000);
    });
  }

  // ========== 優惠彈窗 ==========
  // 建立彈窗元素 (只建立一次)
  if (!document.getElementById('offerModal')) {
    const modal = document.createElement('div');
    modal.id = 'offerModal';
    modal.style.cssText = `
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(6px);
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;
    modal.innerHTML = `
      <div style="
        background: linear-gradient(145deg, #1a1a3a, #12122a);
        border: 1px solid #6a8aff;
        border-radius: 28px;
        padding: 3rem 2.5rem;
        text-align: center;
        max-width: 420px;
        width: 90%;
        box-shadow: 0 0 60px rgba(106, 138, 255, 0.4);
        position: relative;
      ">
        <span id="closeModal" style="
          position: absolute;
          top: 16px; right: 20px;
          font-size: 1.8rem;
          cursor: pointer;
          color: #8888bb;
          transition: color 0.3s;
        ">&times;</span>
        <h2 style="color:#c0c0ff; margin-bottom:1rem; font-size:1.8rem;">✨ 專屬優惠</h2>
        <p style="color:#a0a0d0; margin-bottom:1.5rem; font-size:1.1rem;">
          輸入折扣碼 <strong style="color:#9b9bff;">AURORA88</strong><br>
          全系列商品享 88 折優惠！
        </p>
        <button id="modalBtn" class="btn-primary" style="width:100%;">立即選購</button>
      </div>
    `;
    document.body.appendChild(modal);

    // 關閉彈窗事件
    document.getElementById('closeModal').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
    document.getElementById('modalBtn').addEventListener('click', () => {
      window.location.href = 'products.html';
    });
  }

  // 首頁的優惠按鈕
  const offerBtn = document.getElementById('offerBtn');
  if (offerBtn) {
    offerBtn.addEventListener('click', () => {
      document.getElementById('offerModal').style.display = 'flex';
    });
  }

  // 產品頁的「查看優惠」按鈕 (多個)
  const offerTriggers = document.querySelectorAll('.offer-trigger');
  offerTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('offerModal').style.display = 'flex';
    });
  });

  // ========== 聯絡表單送出 ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const feedback = document.getElementById('formFeedback');

      if (name && email && message) {
        feedback.textContent = `✅ 感謝您，${name}！我們已收到您的訊息，將盡快回覆。`;
        feedback.style.color = '#7fff7f';
        contactForm.reset();
      } else {
        feedback.textContent = '⚠️ 請填寫所有欄位。';
        feedback.style.color = '#ff8888';
      }
    });
  }
});