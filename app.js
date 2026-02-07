// ===== SISTEM ULASAN & RATING =====
let reviews = [];

// Initialize rating system
function initializeRatingSystem() {
    // Rating stars untuk form ulasan
    const ratingStars = document.querySelectorAll('#ratingStars .star');
    const ratingInput = document.getElementById('reviewRating');
    const ratingText = document.getElementById('ratingText');
    
    const ratingTexts = {
        1: "Sangat Buruk",
        2: "Buruk",
        3: "Cukup",
        4: "Baik",
        5: "Sangat Baik"
    };
    
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                // Update stars display
                ratingStars.forEach(s => {
                    const starRating = s.getAttribute('data-rating');
                    s.textContent = starRating <= rating ? '★' : '☆';
                    s.classList.toggle('active', starRating <= rating);
                });
                
                // Update rating text
                if (ratingText) ratingText.textContent = ratingTexts[rating] || 'Sangat Baik';
            });
            
            // Hover effect
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                ratingStars.forEach(s => {
                    const starRating = s.getAttribute('data-rating');
                    s.textContent = starRating <= rating ? '★' : '☆';
                });
                if (ratingText) ratingText.textContent = ratingTexts[rating] || 'Sangat Baik';
            });
            
            star.addEventListener('mouseout', function() {
                const currentRating = ratingInput.value;
                ratingStars.forEach(s => {
                    const starRating = s.getAttribute('data-rating');
                    s.textContent = starRating <= currentRating ? '★' : '☆';
                });
                if (ratingText) ratingText.textContent = ratingTexts[currentRating] || 'Sangat Baik';
            });
        });
        
        // Initialize dengan rating 5
        ratingStars.forEach(s => {
            const starRating = s.getAttribute('data-rating');
            s.textContent = starRating <= 5 ? '★' : '☆';
            if (starRating <= 5) s.classList.add('active');
        });
    }
}

// Load reviews data
function loadReviews() {
    // Coba load dari localStorage
    try {
        const savedReviews = localStorage.getItem('jokiinaja_reviews');
        if (savedReviews) {
            reviews = JSON.parse(savedReviews);
        }
    } catch (e) {
        console.log('Tidak ada ulasan tersimpan');
    }
    
    // Jika tidak ada ulasan, gunakan default
    if (reviews.length === 0) {
        reviews = [
            {
                id: 1,
                name: 'Rizki',
                service: 'laporan',
                rating: 5,
                message: 'Deadline skripsi tinggal 3 hari, panik banget! Untung ada JOKIINAJA, 2 hari langsung selesai, malah dapet nilai A.',
                date: '2024-03-15',
                verified: true
            },
            {
                id: 2,
                name: 'Sari',
                service: 'powerpoint',
                rating: 5,
                message: 'PPT untuk sidang akhir, desainnya keren banget! Dosen sampe nanya template dari mana.',
                date: '2024-03-10',
                verified: true
            },
            {
                id: 3,
                name: 'Andi',
                service: 'programming',
                rating: 5,
                message: 'Project Python buat tugas akhir, code-nya clean banget, dokumentasi lengkap. Bisa request fitur tambahan juga.',
                date: '2024-03-05',
                verified: true
            },
            {
                id: 4,
                name: 'Dewi',
                service: 'analisis',
                rating: 5,
                message: 'Analisis data pakai SPSS, hasilnya detail banget plus interpretasi yang mudah dipahami.',
                date: '2024-02-28',
                verified: true
            },
            {
                id: 5,
                name: 'Budi',
                service: 'laporan',
                rating: 5,
                message: 'Sambil kerja full-time, nulis makalah itu berat. Alhamdulillah ada yang bantuin, kualitasnya bagus.',
                date: '2024-02-20',
                verified: true
            }
        ];
    }
    
    updateReviewStats();
}

// Update review statistics
function updateReviewStats() {
    // Update total review count
    const totalReviews = reviews.length;
    document.querySelectorAll('.card-review-count').forEach(el => {
        el.textContent = `(${totalReviews} ulasan)`;
    });
    
    // Update average rating per service
    const services = ['laporan', 'powerpoint', 'jurnal', 'programming', 'analisis'];
    
    services.forEach(service => {
        const serviceReviews = reviews.filter(r => r.service === service);
        if (serviceReviews.length > 0) {
            const avgRating = serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length;
            
            // Update stars di card
            document.querySelectorAll(`.card[data-service="${service}"] .card-rating-stars`).forEach(starsEl => {
                if (starsEl) {
                    starsEl.innerHTML = '';
                    for (let i = 1; i <= 5; i++) {
                        if (i <= Math.floor(avgRating)) {
                            starsEl.innerHTML += '<i class="fas fa-star"></i>';
                        } else if (i === Math.ceil(avgRating) && avgRating % 1 >= 0.5) {
                            starsEl.innerHTML += '<i class="fas fa-star-half-alt"></i>';
                        } else {
                            starsEl.innerHTML += '<i class="far fa-star"></i>';
                        }
                    }
                }
            });
        }
    });
}

// Get service name
function getServiceName(serviceCode) {
    const serviceNames = {
        'laporan': 'Laporan & Makalah',
        'powerpoint': 'PowerPoint Premium',
        'jurnal': 'Jurnal & Artikel',
        'programming': 'Programming & Coding',
        'analisis': 'Analisis Data'
    };
    return serviceNames[serviceCode] || 'Layanan';
}

// Submit review
function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById('reviewName');
    const email = document.getElementById('reviewEmail');
    const service = document.getElementById('reviewService');
    const rating = document.getElementById('reviewRating');
    const message = document.getElementById('reviewMessage');
    
    if (!name || !service || !message || !rating) return;
    
    // Validasi
    if (!name.value || !service.value || !message.value) {
        showNotification('Harap isi semua field yang wajib', 'error');
        return;
    }
    
    // Buat review object
    const newReview = {
        id: reviews.length + 1,
        name: name.value,
        email: email.value || null,
        service: service.value,
        rating: parseInt(rating.value),
        message: message.value,
        date: new Date().toISOString().split('T')[0],
        verified: false // Belum diverifikasi
    };
    
    // Tambahkan ke array
    reviews.unshift(newReview);
    
    // Simpan ke localStorage
    try {
        localStorage.setItem('jokiinaja_reviews', JSON.stringify(reviews));
    } catch (e) {
        console.log('Gagal menyimpan ulasan');
    }
    
    // Reset form
    document.getElementById('reviewForm').reset();
    
    // Reset rating
    document.querySelectorAll('#ratingStars .star').forEach(s => {
        s.textContent = '☆';
        s.classList.remove('active');
    });
    document.getElementById('reviewRating').value = '5';
    const ratingText = document.getElementById('ratingText');
    if (ratingText) ratingText.textContent = 'Sangat Baik';
    
    // Tampilkan success message
    const successEl = document.getElementById('reviewSuccess');
    if (successEl) {
        successEl.classList.add('show');
        
        // Auto hide success message
        setTimeout(() => {
            successEl.classList.remove('show');
        }, 5000);
    }
    
    // Update statistics
    updateReviewStats();
    
    // Refresh testimonials
    renderTestimonials();
    
    showNotification('Ulasan Anda berhasil dikirim!', 'success');
}

// Improved testimonials navigation dengan smooth scroll
function initTestimonialsNavigation() {
    const track = document.getElementById('testimonialsTrack');
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card-next');
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // width + gap
    
    function scrollToIndex(index) {
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        currentIndex = index;
        track.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
        
        // Update counter
        const currentTestimonialEl = document.getElementById('currentTestimonial');
        if (currentTestimonialEl) {
            currentTestimonialEl.textContent = index + 1;
        }
    }
    
    // Update arrow functions
    window.prevTestimonial = function() {
        scrollToIndex(currentIndex - 1);
    };
    
    window.nextTestimonial = function() {
        scrollToIndex(currentIndex + 1);
    };
    
    // Auto scroll
    const autoScrollInterval = setInterval(() => {
        if (document.getElementById('testimonialsTrack')) {
            scrollToIndex(currentIndex + 1);
        } else {
            clearInterval(autoScrollInterval);
        }
    }, 5000);
}

// ===== IMPROVED RENDER TESTIMONIALS =====

function renderTestimonials(filter = 'all') {
    const track = document.getElementById('testimonialsTrack');
    const currentTestimonialEl = document.getElementById('currentTestimonial');
    const totalTestimonialsEl = document.getElementById('totalTestimonials');
    
    if (!track) return;
    
    track.innerHTML = '';
    
    // Filter reviews
    let filteredReviews = reviews;
    if (filter !== 'all') {
        if (filter === '5') {
            filteredReviews = reviews.filter(r => r.rating === 5);
        } else if (filter === 'express') {
            filteredReviews = reviews.filter(r => r.tags && r.tags.includes('express'));
        } else if (filter === 'programming') {
            filteredReviews = reviews.filter(r => r.service === 'programming');
        }
    }
    
    // Render testimonials
    filteredReviews.forEach(review => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card-next';
        
        // Generate stars
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                stars += '★';
            } else if (i === Math.ceil(review.rating) && review.rating % 1 >= 0.5) {
                stars += '½';
            } else {
                stars += '☆';
            }
        }
        
        // Service icon
        const serviceIcons = {
            'laporan': '📑',
            'powerpoint': '📊',
            'jurnal': '📖',
            'programming': '💻',
            'analisis': '📈'
        };
        
        testimonialCard.innerHTML = `
            <div class="testimonial-content">"${review.message}"</div>
            <div class="testimonial-rating">${stars}</div>
            <div class="testimonial-author">
                <div class="testimonial-avatar">${review.name.charAt(0)}</div>
                <div class="testimonial-info">
                    <h4>${review.name} ${review.verified ? '<i class="fas fa-check-circle" style="color: #10b981; font-size: 0.9rem;"></i>' : ''}</h4>
                    <p>${serviceIcons[review.service] || '📝'} ${getServiceName(review.service)}</p>
                    <div class="testimonial-date">${new Date(review.date).toLocaleDateString('id-ID', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</div>
                </div>
            </div>
        `;
        
        track.appendChild(testimonialCard);
    });
    
    // Update counter
    if (currentTestimonialEl) {
        currentTestimonialEl.textContent = '1';
    }
    if (totalTestimonialsEl) {
        totalTestimonialsEl.textContent = filteredReviews.length;
    }
}

// ===== IMPROVED CARD HOVER EFFECTS =====

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Tambahkan data-service attribute
        const title = card.querySelector('.card-title');
        if (!title) return;
        
        const titleText = title.textContent.toLowerCase();
        if (titleText.includes('laporan') || titleText.includes('makalah')) card.setAttribute('data-service', 'laporan');
        else if (titleText.includes('powerpoint') || titleText.includes('ppt')) card.setAttribute('data-service', 'powerpoint');
        else if (titleText.includes('jurnal') || titleText.includes('artikel')) card.setAttribute('data-service', 'jurnal');
        else if (titleText.includes('programming') || titleText.includes('coding')) card.setAttribute('data-service', 'programming');
        else if (titleText.includes('analisis') || titleText.includes('data')) card.setAttribute('data-service', 'analisis');
        
        // Tambahkan rating container jika belum ada
        if (!card.querySelector('.card-rating')) {
            const cardContent = card.querySelector('.card-content') || card;
            const title = card.querySelector('.card-title');
            if (title && cardContent) {
                const ratingDiv = document.createElement('div');
                ratingDiv.className = 'card-rating';
                ratingDiv.innerHTML = `
                    <div class="card-rating-stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <span class="card-review-count">(${reviews.length} ulasan)</span>
                `;
                title.parentNode.insertBefore(ratingDiv, title.nextSibling);
            }
        }
        
        // Tambahkan arrow jika belum ada
        if (!card.querySelector('.card-arrow')) {
            const arrowDiv = document.createElement('div');
            arrowDiv.className = 'card-arrow';
            arrowDiv.innerHTML = '<i class="fas fa-arrow-right"></i>';
            card.appendChild(arrowDiv);
        }
        
        // Click handler untuk card
        card.addEventListener('click', function(e) {
            // Jangan trigger jika klik tombol
            if (e.target.closest('button')) return;
            
            const service = this.getAttribute('data-service');
            if (service) {
                openServiceDetails(service);
            }
        });
        
        // Keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const service = this.getAttribute('data-service');
                if (service) {
                    openServiceDetails(service);
                }
            }
        });
        
        // Tabindex untuk accessibility
        card.setAttribute('tabindex', '0');
    });
}

// Open service details modal
function openServiceDetails(service) {
    const serviceNames = {
        'laporan': 'Laporan & Makalah',
        'powerpoint': 'PowerPoint Premium',
        'jurnal': 'Jurnal & Artikel Ilmiah',
        'programming': 'Programming & Coding',
        'analisis': 'Analisis Data & Statistik'
    };
    
    const message = `Halo JOKIINAJA! 🚀

Saya tertarik dengan layanan ${serviceNames[service]}. 
Bisa tolong berikan informasi lebih detail?`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6282125283598?text=${encoded}`, '_blank');
}

// ===== KALKULATOR AI - VERSI FIXED & STABIL =====
function initAICalculator() {
    console.log('🚀 Initializing Kalkulator AI Premium...');
    
    // 1. CEK APAKAH SUDAH ADA DAN STATE MANAGEMENT
    if (document.getElementById('ai-calculator-btn')) {
        console.log('✅ Kalkulator sudah ada di halaman ini');
        return;
    }
    
    // State variables
    let isModalOpen = false;
    let isAnimating = false;
    
    // 2. CREATE FLOATING BUTTON
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'ai-calculator-btn';
    floatingBtn.className = 'ai-calculator-btn';
    floatingBtn.setAttribute('aria-label', 'Buka Kalkulator Harga AI');
    floatingBtn.innerHTML = `
        <span class="ai-btn-content">
            <svg class="ai-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9 12H15M9 15H15M9 9H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="ai-btn-text">Kalkulator AI</span>
        </span>
    `;
    
    // 3. CREATE MODAL
    const modalHTML = `
        <div id="ai-modal-overlay" class="ai-modal-overlay" style="display: none; opacity: 0;" role="dialog" aria-modal="true" aria-labelledby="ai-modal-title" aria-describedby="ai-modal-description">
            <div id="ai-modal-content" class="ai-modal-content" style="transform: translateY(20px);">
                <!-- Close Button -->
                <button id="ai-modal-close" class="ai-modal-close" aria-label="Tutup kalkulator" type="button">×</button>
                
                <!-- Header -->
                <div class="ai-modal-header">
                    <div class="ai-modal-title-container">
                        <div class="ai-modal-icon">🤖</div>
                        <div>
                            <h2 id="ai-modal-title" class="ai-modal-title">
                                Kalkulator Harga AI
                            </h2>
                            <p id="ai-modal-description" class="ai-modal-subtitle">
                                Hitung biaya layanan AI dengan mudah
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Service Selection -->
                <div class="ai-section">
                    <label class="ai-label">
                        📋 Jenis Layanan
                    </label>
                    <div id="service-selector" class="service-selector">
                        <button class="service-option active" data-value="7000" data-service="laporan" type="button" aria-pressed="true">
                            <div class="service-name">Laporan</div>
                            <div class="service-price">Rp 7K/halaman</div>
                        </button>
                        
                        <button class="service-option" data-value="15000" data-service="powerpoint" type="button" aria-pressed="false">
                            <div class="service-name">PowerPoint</div>
                            <div class="service-price">Rp 15K/slide</div>
                        </button>
                        
                        <button class="service-option" data-value="25000" data-service="jurnal" type="button" aria-pressed="false">
                            <div class="service-name">Jurnal</div>
                            <div class="service-price">Rp 25K/halaman</div>
                        </button>
                    </div>
                    
                    <!-- Dropdown untuk mobile/layanan lain -->
                    <select id="ai-service-dropdown" class="ai-dropdown" aria-label="Pilih jenis layanan" style="display: none;">
                        <option value="7000">📑 Laporan & Makalah (Rp 7K/halaman)</option>
                        <option value="15000">📊 PowerPoint (Rp 15K/slide)</option>
                        <option value="15000">📖 Jurnal (Rp 15K/halaman)</option>
                        <option value="350000">💻 Programming (Rp 350K/project)</option>
                        <option value="150000">📈 Analisis Data (Rp 150K/project)</option>
                    </select>
                </div>
                
                <!-- Quantity Input -->
                <div class="ai-section">
                    <label class="ai-label">
                        📊 Jumlah
                    </label>
                    <div class="quantity-controls">
                        <button id="ai-minus" class="quantity-btn" aria-label="Kurangi jumlah" type="button">-</button>
                        
                        <div class="quantity-input-wrapper">
                            <input id="ai-quantity" type="number" value="1" min="1" max="1000" 
                                   class="ai-quantity-input" aria-label="Jumlah layanan">
                            <div class="quantity-unit" id="quantity-unit">halaman</div>
                        </div>
                        
                        <button id="ai-plus" class="quantity-btn" aria-label="Tambah jumlah" type="button">+</button>
                    </div>
                </div>
                
                <!-- Speed Selection -->
                <div class="ai-section">
                    <label class="ai-label">
                        ⚡ Kecepatan
                    </label>
                    <div class="speed-selector">
                        <button id="ai-normal" class="speed-btn active" data-speed="normal" type="button" aria-pressed="true">
                            <div class="speed-name">📅 Normal</div>
                            <div class="speed-time">2-3 hari</div>
                            <div class="speed-included">Termasuk</div>
                        </button>
                        
                        <button id="ai-express" class="speed-btn" data-speed="express" type="button" aria-pressed="false">
                            <div class="speed-name">🚀 Express</div>
                            <div class="speed-time">24 jam</div>
                            <div class="speed-price">+ Rp 35.000</div>
                        </button>
                    </div>
                </div>
                
                <!-- Total Price Display -->
                <div class="ai-total-section">
                    <div class="total-bg"></div>
                    <div class="total-content">
                        <div class="total-label">
                            Total Harga
                        </div>
                        <div id="ai-total" class="total-amount">Rp 7.000</div>
                        <div id="ai-details" class="total-details">
                            1 halaman × Rp 7.000
                        </div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="ai-action-buttons">
                    <button id="ai-whatsapp" class="ai-whatsapp-btn" type="button">
                        <svg class="whatsapp-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M17.5 6.5C17.5 4.29086 15.7091 2.5 13.5 2.5H6.5C4.29086 2.5 2.5 4.29086 2.5 6.5V17.5C2.5 19.7091 4.29086 21.5 6.5 21.5H13.5C15.7091 21.5 17.5 19.7091 17.5 17.5V6.5Z" 
                                  stroke="currentColor" stroke-width="1.5"/>
                            <path d="M7 8.5H13M7 11.5H13M7 14.5H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        Order via WhatsApp
                    </button>
                    
                    <button id="ai-cancel" class="ai-cancel-btn" type="button">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 4. ADD TO DOM
    document.body.appendChild(floatingBtn);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 5. VARIABLES
    let currentServicePrice = 7000;
    let currentUnit = 'halaman';
    let currentServiceName = 'Laporan';
    
    // 6. FUNGSI UTAMA KALKULATOR
    function calculateTotal() {
        try {
            // Get quantity
            let quantity = parseInt(document.getElementById('ai-quantity').value);
            if (isNaN(quantity) || quantity < 1) {
                quantity = 1;
                document.getElementById('ai-quantity').value = 1;
            }
            if (quantity > 1000) {
                quantity = 1000;
                document.getElementById('ai-quantity').value = 1000;
            }
            
            // Check express
            const isExpress = document.getElementById('ai-express').classList.contains('active');
            const expressFee = isExpress ? 35000 : 0;
            
            // Calculate total
            let total = currentServicePrice * quantity + expressFee;
            
            // Format to Rupiah
            const formatted = 'Rp ' + total.toLocaleString('id-ID');
            document.getElementById('ai-total').textContent = formatted;
            
            // Update details
            const details = `${quantity} ${currentUnit} × Rp ${currentServicePrice.toLocaleString('id-ID')}`;
            document.getElementById('ai-details').textContent = details;
            
            return total;
        } catch (error) {
            console.error('Error in calculation:', error);
            return 0;
        }
    }
    
    // 7. HELPER FUNCTIONS
    function getUnitForService(price) {
        switch(price) {
            case 7000:
            case 25000:
                return 'halaman';
            case 15000:
                return 'slide';
            case 350000:
            case 150000:
                return 'project';
            default:
                return 'unit';
        }
    }
    
    function getAIServiceName(price) {
        switch(price) {
            case 7000:
                return 'Laporan';
            case 15000:
                return 'PowerPoint';
            case 25000:
                return 'Jurnal';
            case 350000:
                return 'Programming';
            case 150000:
                return 'Analisis Data';
            default:
                return 'Layanan';
        }
    }
    
    // 8. UPDATE SERVICE SELECTION
    function updateServiceSelection(price) {
        currentServicePrice = parseInt(price);
        currentUnit = getUnitForService(price);
        currentServiceName = getAIServiceName(price);
        
        // Update unit text
        document.getElementById('quantity-unit').textContent = currentUnit;
        
        // Update dropdown
        document.getElementById('ai-service-dropdown').value = price;
        
        // Update active service button
        document.querySelectorAll('.service-option').forEach(option => {
            const isActive = option.getAttribute('data-value') === price.toString();
            option.classList.toggle('active', isActive);
            option.setAttribute('aria-pressed', isActive);
        });
        
        // Recalculate total
        calculateTotal();
    }
    
    // 9. WHATSAPP ORDER
    function orderViaWhatsApp() {
        const quantity = document.getElementById('ai-quantity').value;
        const total = document.getElementById('ai-total').textContent;
        const isExpress = document.getElementById('ai-express').classList.contains('active');
        const speed = isExpress ? 'Express (24 jam)' : 'Normal (2-3 hari)';
        
        const message = `Halo JOKIINAJA! 🚀

Saya tertarik dengan layanan AI:
📋 *Jenis Layanan:* ${currentServiceName}
📊 *Jumlah:* ${quantity} ${currentUnit}
⚡ *Kecepatan:* ${speed}
💰 *Total Harga:* ${total}

Bisa dibantu untuk order ini?`;
        
        const encoded = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/6282125283598?text=${encoded}`;
        
        window.open(whatsappUrl, '_blank');
        closeModal();
    }
    
    // 10. MODAL FUNCTIONS - FIXED VERSION
    function openModal() {
        if (isModalOpen || isAnimating) return;
        
        isAnimating = true;
        const overlay = document.getElementById('ai-modal-overlay');
        const modal = document.getElementById('ai-modal-content');
        
        if (!overlay || !modal) return;
        
        // Reset state
        overlay.style.display = 'flex';
        overlay.style.opacity = '0';
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(20px)';
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
        
        // Force reflow
        void overlay.offsetWidth;
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('active');
            modal.classList.add('active');
            
            setTimeout(() => {
                overlay.style.opacity = '1';
                modal.style.opacity = '1';
                isModalOpen = true;
                isAnimating = false;
                
                // Focus first element
                const activeService = document.querySelector('.service-option.active');
                if (activeService) {
                    activeService.focus();
                }
            }, 10);
        }, 10);
    }
    
    function closeModal() {
        if (!isModalOpen || isAnimating) return;
        
        isAnimating = true;
        const overlay = document.getElementById('ai-modal-overlay');
        const modal = document.getElementById('ai-modal-content');
        
        if (!overlay || !modal) return;
        
        // Animate out
        overlay.style.opacity = '0';
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            overlay.classList.remove('active');
            modal.classList.remove('active');
            
            setTimeout(() => {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                isModalOpen = false;
                isAnimating = false;
                
                // Focus back to button
                const calcBtn = document.getElementById('ai-calculator-btn');
                if (calcBtn) calcBtn.focus();
            }, 300);
        }, 300);
    }
    
    // 11. EVENT LISTENERS - SINGLE BINDING
    
    // Floating button - single event listener
    floatingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openModal();
    });
    
    // Close buttons
    const modalCloseBtn = document.getElementById('ai-modal-close');
    const cancelBtn = document.getElementById('ai-cancel');
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }
    
    // Close when clicking outside modal
    const overlay = document.getElementById('ai-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            }
        });
    }
    
    // Prevent modal content click from closing
    const modalContent = document.getElementById('ai-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Service selection
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const price = this.getAttribute('data-value');
            updateServiceSelection(price);
        });
    });
    
    // Dropdown change
    const serviceDropdown = document.getElementById('ai-service-dropdown');
    if (serviceDropdown) {
        serviceDropdown.addEventListener('change', function(e) {
            e.preventDefault();
            e.stopPropagation();
            updateServiceSelection(this.value);
        });
    }
    
    // Quantity controls
    const minusBtn = document.getElementById('ai-minus');
    const plusBtn = document.getElementById('ai-plus');
    const quantityInput = document.getElementById('ai-quantity');
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!quantityInput) return;
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
                calculateTotal();
            }
        });
    }
    
    if (plusBtn) {
        plusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!quantityInput) return;
            let value = parseInt(quantityInput.value);
            if (value < 1000) {
                quantityInput.value = value + 1;
                calculateTotal();
            }
        });
    }
    
    // Quantity input
    if (quantityInput) {
        quantityInput.addEventListener('input', function(e) {
            e.preventDefault();
            calculateTotal();
        });
    }
    
    // Speed selection
    const normalBtn = document.getElementById('ai-normal');
    const expressBtn = document.getElementById('ai-express');
    
    if (normalBtn) {
        normalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.classList.contains('active')) {
                if (expressBtn) {
                    expressBtn.classList.remove('active');
                    expressBtn.setAttribute('aria-pressed', 'false');
                }
                
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                calculateTotal();
            }
        });
    }
    
    if (expressBtn) {
        expressBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.classList.contains('active')) {
                if (normalBtn) {
                    normalBtn.classList.remove('active');
                    normalBtn.setAttribute('aria-pressed', 'false');
                }
                
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                calculateTotal();
            }
        });
    }
    
    // WhatsApp button
    const whatsappBtn = document.getElementById('ai-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const originalHTML = this.innerHTML;
            this.innerHTML = `<div class="loading-spinner"></div> Membuka WhatsApp...`;
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.disabled = false;
                orderViaWhatsApp();
            }, 800);
        });
    }
    
    // 12. RESPONSIVE ADJUSTMENTS
    function updateServiceSelectorVisibility() {
        const isMobile = window.innerWidth < 768;
        const dropdown = document.getElementById('ai-service-dropdown');
        const selector = document.getElementById('service-selector');
        
        if (dropdown && selector) {
            if (isMobile) {
                dropdown.style.display = 'block';
                selector.style.display = 'none';
            } else {
                dropdown.style.display = 'none';
                selector.style.display = 'grid';
            }
        }
    }
    
    // Update on load and resize
    updateServiceSelectorVisibility();
    window.addEventListener('resize', updateServiceSelectorVisibility);
    
    // Initial calculation
    calculateTotal();
    
    console.log('🎉 Kalkulator AI Premium siap digunakan!');
}

// ===== INITIALIZE SEMUA FUNGSI =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing JOKIINAJA dengan semua fitur...');
    
    // Initialize rating system
    initializeRatingSystem();
    
    // Load reviews
    loadReviews();
    
    // Initialize testimonials navigation
    initTestimonialsNavigation();
    
    // Initialize card hover effects
    initCardHoverEffects();
    
    // Initialize AI Calculator
    initAICalculator();
    
    // Attach review form submit
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', submitReview);
    }
    
    // Tambahkan event listener untuk filter testimonials
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active class
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            renderTestimonials(filter);
        });
    });
    
    // Render initial testimonials
    renderTestimonials();
    
    // Set real viewport height untuk mobile
    function setRealViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setRealViewportHeight();
    window.addEventListener('resize', setRealViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setRealViewportHeight, 100);
    });
    
    // Test function untuk debugging
    window.testAllSystems = function() {
        console.log('🧪 Testing semua sistem...');
        console.log('✅ Reviews loaded:', reviews.length);
        console.log('✅ AI Calculator:', document.getElementById('ai-calculator-btn') ? 'Ready' : 'Not Found');
        console.log('✅ Rating System:', document.querySelectorAll('#ratingStars .star').length > 0 ? 'Ready' : 'Not Found');
        return '✅ Semua sistem berfungsi dengan baik!';
    };
    
    console.log('🎉 JOKIINAJA dengan semua fitur siap digunakan!');
    console.log('💡 Tips: Ketik "testAllSystems()" di console untuk testing');
});

console.log('🚀 JOKIINAJA script loaded successfully!');
