// ========== SISTEM GLOBAL VARIABLES ==========
let reviews = [];
let currentSpeed = 'normal';
let speedFee = 0;
let currentServicePrice = 7000;
let currentUnit = 'halaman';
let currentServiceName = 'Laporan & Makalah';
let modalInitialized = false;

// ========== SISTEM ULASAN & RATING ==========

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

// ========== KALKULATOR AI - PERBAIKAN ==========

function openOrderModal() {
    const modal = document.getElementById('orderModal');
    if (!modal) return;
    
    // Cegah multiple initialization
    if (!modalInitialized) {
        setupAICalculator();
        modalInitialized = true;
    }
    
    // Reset kalkulator setiap kali dibuka
    resetAICalculator();
    
    // Tampilkan modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update UI
    updateSpeedSelector();
    calculateAIPrice();
    
    // Focus ke elemen pertama
    setTimeout(() => {
        const serviceSelect = document.getElementById('serviceType');
        if (serviceSelect) serviceSelect.focus();
    }, 300);
    
    // Animate modal
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'translateY(0) scale(1)';
        }
    }, 10);
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(50px) scale(0.95)';
    }
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Scroll kembali ke atas jika di mobile
        if (window.innerWidth <= 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 300);
}

function setupAICalculator() {
    // Event listener untuk service type
    const serviceType = document.getElementById('serviceType');
    if (serviceType) {
        serviceType.addEventListener('change', function() {
            currentServicePrice = parseInt(this.value) || 7000;
            const selectedOption = this.options[this.selectedIndex];
            currentServiceName = selectedOption.text.split(' (')[0];
            
            // Update unit berdasarkan layanan
            if (selectedOption.text.includes('/hal')) {
                currentUnit = 'halaman';
            } else if (selectedOption.text.includes('/slide')) {
                currentUnit = 'slide';
            } else if (selectedOption.text.includes('/project')) {
                currentUnit = 'project';
            }
            
            updateSpeedSelector();
            calculateAIPrice();
        });
    }
    
    // Event listener untuk quantity
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            if (this.value < 1) this.value = 1;
            if (this.value > 1000) this.value = 1000;
            calculateAIPrice();
        });
    }
    
    // Event listener untuk coupon
    const couponInput = document.getElementById('coupon');
    if (couponInput) {
        couponInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyCoupon();
            }
        });
    }
    
    // Prevent form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
}

function updateSpeedSelector() {
    const speedContainer = document.getElementById('speedSelectorContainer');
    if (!speedContainer) return;
    
    // Tentukan biaya express berdasarkan layanan
    let expressFee = 35000;
    let expressTime = '6-12 jam';
    let normalTime = '1-3 hari';
    
    if (currentServicePrice === 25000) {
        expressFee = 50000;
        expressTime = '12-24 jam';
    } else if (currentServicePrice === 350000) {
        expressFee = 100000;
        expressTime = '24-48 jam';
        normalTime = '3-7 hari';
    } else if (currentServicePrice === 150000) {
        expressFee = 75000;
        expressTime = '12-24 jam';
    }
    
    speedContainer.innerHTML = `
        <div class="form-group">
            <label class="form-label">Kecepatan Pengerjaan</label>
            <div class="speed-selector">
                <div class="speed-option ${currentSpeed === 'normal' ? 'selected' : ''}" 
                     onclick="selectSpeed('normal', 0)" 
                     style="flex: 1; padding: 1rem; border: 2px solid ${currentSpeed === 'normal' ? '#3b82f6' : 'var(--border)'}; 
                            border-radius: var(--border-radius); background: ${currentSpeed === 'normal' ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-tertiary)'}; 
                            cursor: pointer; transition: all 0.3s ease;">
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📅</div>
                    <div style="font-weight: 600; color: var(--text-primary);">Normal</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">${normalTime}</div>
                    <div style="font-size: 0.875rem; color: #10b981; margin-top: 0.5rem; font-weight: 600;">Termasuk</div>
                </div>
                <div class="speed-option ${currentSpeed === 'express' ? 'selected' : ''}" 
                     onclick="selectSpeed('express', ${expressFee})" 
                     style="flex: 1; padding: 1rem; border: 2px solid ${currentSpeed === 'express' ? '#3b82f6' : 'var(--border)'}; 
                            border-radius: var(--border-radius); background: ${currentSpeed === 'express' ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-tertiary)'}; 
                            cursor: pointer; transition: all 0.3s ease;">
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚡</div>
                    <div style="font-weight: 600; color: var(--text-primary);">Express</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">${expressTime}</div>
                    <div style="font-size: 0.875rem; color: #f59e0b; margin-top: 0.5rem; font-weight: 600;">+ Rp ${expressFee.toLocaleString('id-ID')}</div>
                </div>
            </div>
        </div>
    `;
}

function selectSpeed(speed, fee) {
    currentSpeed = speed;
    speedFee = fee;
    updateSpeedSelector();
    calculateAIPrice();
    
    // Haptic feedback untuk mobile
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
}

function calculateAIPrice() {
    const serviceType = document.getElementById('serviceType');
    const quantityInput = document.getElementById('quantity');
    const totalPriceElement = document.getElementById('totalPrice');
    const priceBreakdownElement = document.getElementById('priceBreakdown');
    
    if (!serviceType || !quantityInput || !totalPriceElement || !priceBreakdownElement) return;
    
    // Get values
    const quantity = parseInt(quantityInput.value) || 1;
    const servicePrice = parseInt(serviceType.value) || 7000;
    
    // Calculate base price
    let basePrice = servicePrice * quantity;
    let total = basePrice;
    
    // Add express fee if selected
    if (currentSpeed === 'express') {
        total += speedFee;
    }
    
    // Apply coupon discount
    const couponInput = document.getElementById('coupon');
    let discount = 0;
    let couponCode = '';
    
    if (couponInput && couponInput.value) {
        couponCode = couponInput.value.toUpperCase();
        if (couponCode === 'WELCOME10') {
            discount = total * 0.1;
        } else if (couponCode === 'STUDENT15') {
            discount = total * 0.15;
        } else if (couponCode === 'FAST5') {
            discount = total * 0.05;
        }
        total -= discount;
    }
    
    // Format total price
    const formattedTotal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(total);
    
    totalPriceElement.textContent = formattedTotal;
    
    // Update price breakdown
    let breakdownHTML = `
        <div style="margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-light);">
            <span style="color: var(--text-muted);">${quantity} ${currentUnit} × Rp ${servicePrice.toLocaleString('id-ID')}</span>
            <span style="float: right; font-weight: 600;">Rp ${basePrice.toLocaleString('id-ID')}</span>
        </div>
    `;
    
    if (currentSpeed === 'express') {
        breakdownHTML += `
            <div style="margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-light);">
                <span style="color: var(--text-muted);">Biaya Express</span>
                <span style="float: right; color: #f59e0b; font-weight: 600;">+ Rp ${speedFee.toLocaleString('id-ID')}</span>
            </div>
        `;
    }
    
    if (discount > 0) {
        breakdownHTML += `
            <div style="margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-light);">
                <span style="color: var(--text-muted);">Diskon (${couponCode})</span>
                <span style="float: right; color: #10b981; font-weight: 600;">- Rp ${discount.toLocaleString('id-ID')}</span>
            </div>
        `;
    }
    
    breakdownHTML += `
        <div style="margin-top: 1rem; padding-top: 0.5rem; border-top: 2px solid var(--border);">
            <span style="font-weight: 700; color: var(--text-primary);">Total</span>
            <span style="float: right; font-weight: 800; color: var(--primary);">${formattedTotal}</span>
        </div>
    `;
    
    priceBreakdownElement.innerHTML = breakdownHTML;
}

function adjustAICalculatorQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    if (!quantityInput) return;
    
    let currentValue = parseInt(quantityInput.value) || 1;
    currentValue += change;
    
    if (currentValue < 1) currentValue = 1;
    if (currentValue > 1000) currentValue = 1000;
    
    quantityInput.value = currentValue;
    quantityInput.dispatchEvent(new Event('input'));
    
    // Haptic feedback untuk mobile
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
}

function applyCoupon() {
    const couponInput = document.getElementById('coupon');
    const coupon = couponInput.value.trim().toUpperCase();
    const validCoupons = ['WELCOME10', 'STUDENT15', 'FAST5'];
    
    if (!coupon) {
        showNotification('Kode Kupon Kosong', 'Silakan masukkan kode promo', 'warning');
        return;
    }
    
    if (validCoupons.includes(coupon)) {
        showNotification('Kupon Berhasil!', `Diskon ${coupon === 'WELCOME10' ? '10%' : coupon === 'STUDENT15' ? '15%' : '5%'} berhasil diterapkan`, 'success');
    } else {
        showNotification('Kupon Tidak Valid', 'Kode promo yang dimasukkan tidak valid atau sudah kadaluarsa', 'error');
        couponInput.value = '';
    }
    
    calculateAIPrice();
}

function placeAIOrder() {
    const serviceType = document.getElementById('serviceType');
    const quantity = document.getElementById('quantity').value;
    const totalPrice = document.getElementById('totalPrice').textContent;
    const couponInput = document.getElementById('coupon');
    const coupon = couponInput.value ? ` (Kupon: ${couponInput.value})` : '';
    
    if (!serviceType) {
        showNotification('Error', 'Silakan pilih layanan terlebih dahulu', 'error');
        return;
    }
    
    const selectedOption = serviceType.options[serviceType.selectedIndex];
    const serviceDetails = selectedOption.text;
    
    // Buat pesan WhatsApp
    let message = `Halo JOKIINAJA! 🚀\n\n`;
    message += `Saya ingin order menggunakan Kalkulator AI:\n\n`;
    message += `📋 *Layanan:* ${currentServiceName}\n`;
    message += `📊 *Jumlah:* ${quantity} ${currentUnit}\n`;
    message += `⚡ *Kecepatan:* ${currentSpeed === 'express' ? 'Express' : 'Normal'}\n`;
    if (couponInput.value) {
        message += `🎫 *Kupon:* ${couponInput.value}\n`;
    }
    message += `💰 *Total Harga:* ${totalPrice}\n\n`;
    message += `_Detail: ${serviceDetails}_\n\n`;
    message += `Bisa dibantu proses ordernya?`;
    
    // Encode message untuk WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6282125283598?text=${encodedMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');
    
    // Tutup modal
    closeOrderModal();
    
    // Tampilkan notifikasi
    showNotification('Order Diproses!', 'WhatsApp telah dibuka, silakan lanjutkan chat dengan admin kami', 'success');
}

function resetAICalculator() {
    // Reset form values
    document.getElementById('serviceType').selectedIndex = 0;
    document.getElementById('quantity').value = 1;
    document.getElementById('coupon').value = '';
    
    // Reset variables
    currentSpeed = 'normal';
    speedFee = 0;
    currentServicePrice = 7000;
    currentUnit = 'halaman';
    currentServiceName = 'Laporan & Makalah';
    
    // Update UI
    updateSpeedSelector();
    calculateAIPrice();
}

// ========== PERBAIKAN SMOOTH SCROLL DENGAN HEADER OFFSET ==========
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip external links or empty anchors
            if (this.getAttribute('href') === '#' || 
                this.getAttribute('href').startsWith('http') ||
                this.classList.contains('external')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            // Hitung offset berdasarkan tinggi header
            const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 70;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Smooth scroll dengan offset
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Tutup mobile menu jika terbuka
            if (window.innerWidth <= 768) {
                const navLinks = document.getElementById('navLinks');
                const mobileToggle = document.getElementById('mobileToggle');
                if (navLinks && mobileToggle) {
                    navLinks.classList.remove('active');
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(title, message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationIcon = document.getElementById('notificationIcon');
    
    if (!notification || !notificationTitle || !notificationMessage || !notificationIcon) return;
    
    // Set content
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    // Set type
    notification.className = 'notification';
    notification.classList.add(type);
    
    // Set icon
    let iconClass = 'fas fa-info-circle';
    if (type === 'success') iconClass = 'fas fa-check-circle';
    if (type === 'error') iconClass = 'fas fa-exclamation-circle';
    if (type === 'warning') iconClass = 'fas fa-exclamation-triangle';
    
    notificationIcon.className = 'notification-icon ' + iconClass;
    
    // Show notification
    notification.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// ========== EVENT LISTENERS UNTUK MODAL ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing JOKIINAJA dengan semua fitur...');
    
    // Setup smooth scroll dengan header offset
    setupSmoothScroll();
    
    // Event listener untuk close modal dengan klik di luar
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('orderModal');
        const modalContent = modal?.querySelector('.modal-content');
        
        if (modal?.classList.contains('active') && 
            modalContent && 
            !modalContent.contains(event.target) && 
            !event.target.closest('.btn') && 
            !event.target.closest('.btn-text') &&
            event.target.id !== 'calculatorBtn') {
            closeOrderModal();
        }
    });
    
    // Event listener untuk escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('orderModal');
            if (modal?.classList.contains('active')) {
                closeOrderModal();
            }
        }
    });
    
    // Setup mobile keyboard behavior
    function setupMobileKeyboardBehavior() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Scroll ke input saat keyboard muncul
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
            
            // Close keyboard saat menekan done/enter
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.blur();
                    
                    // Scroll kembali ke atas sedikit
                    window.scrollTo({ 
                        top: window.scrollY - 100, 
                        behavior: 'smooth' 
                    });
                }
            });
        });
    }
    
    // Panggil setup mobile keyboard
    if (window.innerWidth <= 768) {
        setupMobileKeyboardBehavior();
    }
    
    // Initialize rating system
    initializeRatingSystem();
    
    // Load reviews
    loadReviews();
    
    // Initialize testimonials navigation
    initTestimonialsNavigation();
    
    // Initialize card hover effects
    initCardHoverEffects();
    
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
    
    // ========== LOADING SCREEN ANIMATION ==========
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('loaded');
        
        // Animate hero elements
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroButtons = document.querySelector('.hero .btn-group');
            const heroStats = document.querySelector('.hero-stats');
            
            if (heroTitle) heroTitle.classList.add('animate-fade-in');
            if (heroSubtitle) heroSubtitle.classList.add('animate-fade-in');
            if (heroButtons) heroButtons.classList.add('animate-slide-up');
            if (heroStats) heroStats.classList.add('animate-slide-up');
        }, 300);
        
        // Animate number counters
        function animateNumberCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        if (target % 1 === 0) {
                            counter.textContent = Math.floor(current);
                        } else {
                            counter.textContent = current.toFixed(1);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
                    }
                };
                
                updateCounter();
            });
        }
        
        animateNumberCounters();
    }, 1500);
    
    // ========== HEADER SCROLL BEHAVIOR ==========
    let lastScrollTop = 0;
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        
        // Header scrolled style
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ========== THEME SWITCHER ==========
    const themeToggle = document.getElementById('themeToggle');
    const themeOptions = document.getElementById('themeOptions');
    
    if (themeToggle && themeOptions) {
        themeToggle.addEventListener('click', () => {
            themeOptions.classList.toggle('show');
        });
        
        // Close theme options when clicking outside
        document.addEventListener('click', (e) => {
            if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
                themeOptions.classList.remove('show');
            }
        });
        
        // Theme selection
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                
                // Update active state
                document.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                option.classList.add('active');
                
                // Set theme
                document.documentElement.setAttribute('data-theme', theme);
                
                // Save to localStorage
                localStorage.setItem('theme', theme);
                
                // Close options
                themeOptions.classList.remove('show');
                
                showNotification('Tema berhasil diubah!', 'Tampilan situs telah diperbarui.', 'success');
            });
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const activeThemeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
        if (activeThemeOption) activeThemeOption.classList.add('active');
    }
    
    // ========== MOBILE NAVIGATION ==========
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.querySelector('i').classList.toggle('fa-bars');
            mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
    
    // ========== BACK TO TOP ==========
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create email body
            const emailBody = `Nama: ${name}%0AEmail: ${email}%0ASubjek: ${subject}%0A%0APesan:%0A${message}`;
            
            // Open default email client
            window.open(`mailto:jokiinaja@proton.me?subject=${encodeURIComponent(subject)}&body=${emailBody}`, '_blank');
            
            // Reset form
            this.reset();
            
            showNotification('Form terkirim!', 'Email client telah dibuka, silakan lanjutkan pengiriman.', 'success');
        });
    }
    
    // ========== ORDER VIA WHATSAPP FUNCTION ==========
    function orderViaWhatsApp(serviceName, basePrice, unit, isExpress) {
        let price = isExpress ? basePrice + (serviceName.includes('CEPAT') ? 0 : getExpressFee(serviceName)) : basePrice;
        let expressText = isExpress ? ' (Express)' : '';
        
        const message = `Halo JOKIINAJA, saya ingin order ${serviceName}${expressText}.\n\n` +
                       `Bisa dibantu untuk detail lebih lanjut?`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/6282125283598?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        showNotification('Order diproses!', 'WhatsApp telah dibuka untuk order ' + serviceName, 'success');
    }
    
    function getExpressFee(serviceName) {
        if (serviceName.includes('Laporan') || serviceName.includes('PowerPoint') || serviceName.includes('Ringkasan')) {
            return 35000;
        } else if (serviceName.includes('Jurnal')) {
            return 50000;
        } else if (serviceName.includes('Programming')) {
            return 100000;
        } else if (serviceName.includes('Analisis')) {
            return 75000;
        }
        return 0;
    }
    
    // Expose functions to window
    window.orderViaWhatsApp = orderViaWhatsApp;
    window.openOrderModal = openOrderModal;
    window.closeOrderModal = closeOrderModal;
    window.adjustAICalculatorQuantity = adjustAICalculatorQuantity;
    window.selectSpeed = selectSpeed;
    window.applyCoupon = applyCoupon;
    window.placeAIOrder = placeAIOrder;
    window.resetAICalculator = resetAICalculator;
    
    // ========== OTHER FUNCTIONS ==========
    window.showFastServiceInfo = function() {
        showNotification(
            '⚡ Express Service Info',
            'Layanan cepat tersedia untuk semua jenis tugas. Biaya tambahan: Makalah/PowerPoint +35K, Jurnal +50K, Programming +100K, Analisis +75K. Pengerjaan 6-12 jam.',
            'info'
        );
    };
    
    window.showPrivacyPolicy = function() {
        showNotification(
            '🔒 Kebijakan Privasi',
            'Data Anda aman bersama kami. Tidak ada informasi yang dibagikan ke pihak ketiga. Semua komunikasi dienkripsi.',
            'info'
        );
    };
    
    window.showTerms = function() {
        showNotification(
            '📜 Syarat & Ketentuan',
            '1. Revisi gratis tanpa batas\n2. Pembayaran 50% di awal, 50% setelah selesai\n3. Garansi anti plagiasi\n4. Waktu pengerjaan sesuai paket yang dipilih',
            'info'
        );
    };
    
    window.showRefundPolicy = function() {
        showNotification(
            '💸 Kebijakan Pengembalian',
            'Pengembalian dana hanya berlaku jika:\n1. Pengerjaan melebihi deadline yang disepakati\n2. Kualitas tidak sesuai dengan contoh\n3. Ada kesalahan dari kami',
            'info'
        );
    };
    
    window.showSecretAdminLogin = function() {
        showNotification(
            '🚫 Akses Ditolak',
            'Fitur ini hanya tersedia untuk admin terdaftar. Jika Anda admin, hubungi developer.',
            'error'
        );
    };
    
    console.log('🎉 JOKIINAJA dengan semua fitur siap digunakan!');
    console.log('💡 Tips: Ketik "showNotification(\'Test\', \'Ini adalah test notifikasi\', \'success\')" di console untuk testing');
});

// ========== LOAD SAVED ORDER DRAFT ==========
function loadOrderDraft() {
    try {
        const savedDraft = localStorage.getItem('jokiOrderDraft');
        if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            
            // Terapkan nilai draft
            document.getElementById('serviceType').value = draft.serviceType || '7000';
            document.getElementById('quantity').value = draft.quantity || '1';
            document.getElementById('coupon').value = draft.coupon || '';
            
            if (draft.speed) {
                currentSpeed = draft.speed;
            }
            
            // Update current price
            currentServicePrice = parseInt(draft.serviceType) || 7000;
            
            // Update UI
            updateSpeedSelector();
            calculateAIPrice();
            
            return true;
        }
    } catch (e) {
        console.log('Tidak ada draft yang tersimpan atau draft rusak');
    }
    return false;
}

function saveOrderDraft() {
    const draftData = {
        serviceType: document.getElementById('serviceType').value,
        quantity: document.getElementById('quantity').value,
        coupon: document.getElementById('coupon').value,
        speed: currentSpeed,
        timestamp: new Date().toISOString()
    };
    
    // Simpan ke localStorage
    try {
        localStorage.setItem('jokiOrderDraft', JSON.stringify(draftData));
        showNotification('Draft Disimpan!', 'Order Anda telah disimpan. Buka kembali kalkulator untuk melanjutkan.', 'success');
    } catch (e) {
        showNotification('Gagal Menyimpan', 'Draft tidak dapat disimpan. Silakan coba lagi.', 'error');
    }
}

window.saveOrderDraft = saveOrderDraft;
window.loadOrderDraft = loadOrderDraft;

console.log('🚀 JOKIINAJA script loaded successfully!');
