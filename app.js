// ========== SISTEM GLOBAL VARIABLES ==========
let reviews = [];
let currentSpeed = 'normal';
let speedFee = 0;
let currentServicePrice = 7000;
let currentUnit = 'halaman';
let currentServiceName = 'Laporan & Makalah';
let modalInitialized = false;
let mobileMenuOpen = false;
let modalOpen = false;

// ========== FIX: MOBILE MENU TIDAK BERTABRAKAN ==========

// Create mobile menu overlay
function createMobileMenuOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'mobileMenuOverlay';
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    return overlay;
}

// Initialize mobile menu dengan perbaikan
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileToggle || !navLinks) return;
    
    // Create overlay
    const overlay = createMobileMenuOverlay();
    
    // Toggle menu function
    function toggleMobileMenu(isOpening) {
        if (isOpening === undefined) {
            isOpening = !navLinks.classList.contains('active');
        }
        
        // Toggle menu state
        if (isOpening) {
            // Open menu
            navLinks.classList.add('active');
            overlay.classList.add('active');
            mobileToggle.querySelector('i').classList.remove('fa-bars');
            mobileToggle.querySelector('i').classList.add('fa-times');
            document.body.classList.add('menu-open');
            mobileMenuOpen = true;
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            
            // Adjust header z-index
            const header = document.getElementById('mainHeader');
            if (header) header.style.zIndex = '1002';
        } else {
            // Close menu
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            mobileToggle.querySelector('i').classList.add('fa-bars');
            document.body.classList.remove('menu-open');
            mobileMenuOpen = false;
            
            // Restore body scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            
            // Restore header z-index
            const header = document.getElementById('mainHeader');
            if (header) header.style.zIndex = '1000';
        }
    }
    
    // Mobile toggle click
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        toggleMobileMenu(false);
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu(false);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOpen) {
            toggleMobileMenu(false);
        }
    });
    
    // Close menu on window resize (if becomes desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            toggleMobileMenu(false);
        }
    });
}

// ========== FIX: MODAL CALCULATOR UNTUK MOBILE ==========

// Improved openOrderModal untuk mobile
function openOrderModal() {
    const modal = document.getElementById('orderModal');
    if (!modal) return;
    
    // Cegah jika modal sudah terbuka
    if (modalOpen) return;
    
    // Close mobile menu jika terbuka
    if (mobileMenuOpen) {
        const navLinks = document.getElementById('navLinks');
        const overlay = document.getElementById('mobileMenuOverlay');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (navLinks && overlay && mobileToggle) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            mobileToggle.querySelector('i').classList.add('fa-bars');
            document.body.classList.remove('menu-open');
            mobileMenuOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    // Initialize kalkulator jika belum
    if (!modalInitialized) {
        setupAICalculator();
        modalInitialized = true;
    }
    
    // Reset kalkulator setiap kali dibuka
    resetAICalculator();
    
    // Set modal state
    modalOpen = true;
    
    // Tampilkan modal dengan style yang tepat
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Lock body scroll
    document.body.classList.add('modal-open');
    
    // Adjust modal untuk mobile
    adjustModalForMobile();
    
    // Focus ke elemen pertama dengan delay
    setTimeout(() => {
        const serviceSelect = document.getElementById('serviceType');
        if (serviceSelect) serviceSelect.focus();
    }, 300);
    
    // Prevent scroll pada modal content
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: false });
    }
}

// Improved closeOrderModal
function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (!modal || !modalOpen) return;
    
    // Animate close
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalOpen = false;
        document.body.classList.remove('modal-open');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Scroll kembali ke posisi semula
        if (window.innerWidth <= 768) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, 300);
}

// Adjust modal untuk mobile viewport
function adjustModalForMobile() {
    const modal = document.getElementById('orderModal');
    if (!modal || !modal.classList.contains('active')) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent) return;
    
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Untuk mobile, gunakan height yang proporsional
        const maxHeight = windowHeight * 0.85; // 85% dari tinggi layar
        modalContent.style.maxHeight = `${maxHeight}px`;
        modalContent.style.height = 'auto';
        
        // Center modal di layar
        modalContent.style.margin = 'auto';
        modalContent.style.width = '95%';
        modalContent.style.maxWidth = '450px';
        
        // Adjust content padding
        modalContent.style.padding = '1.5rem';
    } else {
        // Untuk desktop, gunakan fixed height
        modalContent.style.maxHeight = '85vh';
        modalContent.style.width = '100%';
        modalContent.style.maxWidth = '500px';
    }
    
    // Cek jika konten overflow
    setTimeout(() => {
        const contentHeight = modalContent.scrollHeight;
        const containerHeight = modalContent.clientHeight;
        
        if (contentHeight > containerHeight) {
            modalContent.style.overflowY = 'auto';
        } else {
            modalContent.style.overflowY = 'visible';
        }
    }, 100);
}

// ========== FIX: SMOOTH SCROLL DENGAN HEADER OFFSET ==========

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip jika bukan anchor internal
            if (this.getAttribute('href') === '#' || 
                this.getAttribute('href').startsWith('http')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            // Hitung offset berdasarkan header height
            const header = document.getElementById('mainHeader');
            const headerHeight = header ? header.offsetHeight : 70;
            const extraPadding = 20; // Extra padding untuk mobile
            
            const targetPosition = targetElement.getBoundingClientRect().top + 
                                  window.pageYOffset - 
                                  headerHeight - 
                                  extraPadding;
            
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
            if (mobileMenuOpen) {
                const navLinks = document.getElementById('navLinks');
                const overlay = document.getElementById('mobileMenuOverlay');
                const mobileToggle = document.getElementById('mobileToggle');
                
                if (navLinks && overlay && mobileToggle) {
                    navLinks.classList.remove('active');
                    overlay.classList.remove('active');
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                    document.body.classList.remove('menu-open');
                    mobileMenuOpen = false;
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// ========== FIX: TOUCH AND SCROLL BEHAVIOR ==========

function setupTouchAndScrollBehavior() {
    // Mencegah pull-to-refresh di iOS
    document.body.addEventListener('touchmove', function(e) {
        if (modalOpen || mobileMenuOpen) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Improved scroll untuk modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('scroll', function() {
            const isAtTop = this.scrollTop === 0;
            const isAtBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
            
            if (isAtTop || isAtBottom) {
                this.style.overscrollBehavior = 'contain';
            } else {
                this.style.overscrollBehavior = 'none';
            }
        });
    }
    
    // Fix untuk iOS safari
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.cursor = 'pointer'; // Fix untuk :active state
    }
}

// ========== FIX: WINDOW RESIZE HANDLER ==========

function setupResizeHandler() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Adjust modal jika terbuka
            if (modalOpen) {
                adjustModalForMobile();
            }
            
            // Close mobile menu jika resize ke desktop
            if (window.innerWidth > 768 && mobileMenuOpen) {
                const navLinks = document.getElementById('navLinks');
                const overlay = document.getElementById('mobileMenuOverlay');
                const mobileToggle = document.getElementById('mobileToggle');
                
                if (navLinks && overlay && mobileToggle) {
                    navLinks.classList.remove('active');
                    overlay.classList.remove('active');
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                    document.body.classList.remove('menu-open');
                    mobileMenuOpen = false;
                    document.body.style.overflow = '';
                }
            }
        }, 250);
    });
}

// ========== FIX: LOADING AND INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing JOKIINAJA dengan semua perbaikan...');
    
    // Setup mobile menu dengan overlay
    setupMobileMenu();
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // Setup touch and scroll behavior
    setupTouchAndScrollBehavior();
    
    // Setup resize handler
    setupResizeHandler();
    
    // Setup modal event listeners
    setupModalEventListeners();
    
    // Initialize systems
    initializeSystems();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Setup mobile viewport height
    setupViewportHeight();
    
    console.log('🎉 JOKIINAJA berhasil diinisialisasi dengan semua perbaikan!');
});

// Setup modal event listeners
function setupModalEventListeners() {
    const modal = document.getElementById('orderModal');
    
    if (!modal) return;
    
    // Close modal ketika klik di luar content
    modal.addEventListener('click', function(event) {
        if (event.target === this) {
            closeOrderModal();
        }
    });
    
    // Close modal dengan escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOpen) {
            closeOrderModal();
        }
    });
    
    // Prevent modal close ketika klik di dalam content
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Initialize semua sistem
function initializeSystems() {
    // Initialize rating system
    initializeRatingSystem();
    
    // Load reviews
    loadReviews();
    
    // Initialize testimonials
    initTestimonialsNavigation();
    
    // Initialize card effects
    initCardHoverEffects();
    
    // Setup review form
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', submitReview);
    }
    
    // Setup testimonial filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            renderTestimonials(filter);
        });
    });
    
    // Render initial testimonials
    renderTestimonials();
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + / untuk kalkulator
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            openOrderModal();
        }
        
        // Ctrl + M untuk menu mobile
        if (e.ctrlKey && e.key === 'm' && window.innerWidth <= 768) {
            e.preventDefault();
            const mobileToggle = document.getElementById('mobileToggle');
            if (mobileToggle) mobileToggle.click();
        }
    });
}

// Setup viewport height untuk mobile
function setupViewportHeight() {
    function setRealViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setRealViewportHeight();
    window.addEventListener('resize', setRealViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setRealViewportHeight, 100);
    });
}

// ========== FIX: QUANTITY ADJUSTMENT ==========

function adjustAICalculatorQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    if (!quantityInput) return;
    
    let currentValue = parseInt(quantityInput.value) || 1;
    currentValue += change;
    
    // Batasan
    if (currentValue < 1) currentValue = 1;
    if (currentValue > 1000) currentValue = 1000;
    
    // Update value
    quantityInput.value = currentValue;
    
    // Trigger input event untuk update harga
    quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Haptic feedback untuk mobile
    if ('vibrate' in navigator) {
        navigator.vibrate(20);
    }
    
    // Focus pada input untuk mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            quantityInput.focus();
        }, 100);
    }
}

// ========== FIX: SELECT SPEED ==========

function selectSpeed(speed, fee) {
    currentSpeed = speed;
    speedFee = fee;
    
    // Update UI
    updateSpeedSelector();
    calculateAIPrice();
    
    // Haptic feedback untuk mobile
    if ('vibrate' in navigator) {
        navigator.vibrate(10);
    }
    
    // Auto scroll ke price preview jika di mobile
    if (window.innerWidth <= 768 && modalOpen) {
        const pricePreview = document.querySelector('.price-preview');
        if (pricePreview) {
            setTimeout(() => {
                pricePreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
}

// ========== CSS YANG PERLU DITAMBAHKAN ==========

// Tambahkan CSS ini ke file CSS Anda
const additionalCSS = `
/* ===== MOBILE MENU OVERLAY ===== */
.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.mobile-menu-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* ===== FIX BODY SCROLL LOCK ===== */
body.menu-open,
body.modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
}

body.menu-open {
    touch-action: none;
    -webkit-overflow-scrolling: none;
}

/* ===== IMPROVED MODAL FOR MOBILE ===== */
@media (max-width: 768px) {
    .modal#orderModal {
        align-items: flex-start;
        padding-top: 60px;
        padding-bottom: 20px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    
    .modal#orderModal .modal-content {
        margin: auto;
        max-height: 85vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: 16px;
        transform: none !important;
        animation: modalSlideUp 0.3s ease-out;
    }
    
    @keyframes modalSlideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Prevent body scroll when modal is open */
    body.modal-open {
        position: fixed;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    
    /* Improved scrollbar for modal */
    .modal#orderModal .modal-content::-webkit-scrollbar {
        width: 4px;
    }
    
    .modal#orderModal .modal-content::-webkit-scrollbar-track {
        background: transparent;
    }
    
    .modal#orderModal .modal-content::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 2px;
    }
    
    /* Better tap targets for mobile */
    .modal#orderModal .btn,
    .modal#orderModal .speed-option,
    .modal#orderModal .quantity-btn {
        min-height: 44px;
        min-width: 44px;
    }
    
    /* Fix input zoom on iOS */
    .modal#orderModal input,
    .modal#orderModal select,
    .modal#orderModal textarea {
        font-size: 16px !important;
    }
}

/* ===== SAFE AREA FOR IOS ===== */
@supports (padding: max(0px)) {
    body {
        padding-top: calc(var(--header-height) + env(safe-area-inset-top));
    }
    
    .mobile-menu-overlay {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
    }
    
    .modal#orderModal .modal-content {
        padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
    }
}

/* ===== IMPROVED NAV MENU ===== */
.nav-links {
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: 100%;
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-light);
    z-index: 1001;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: calc(100vh - var(--header-height));
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    pointer-events: none;
}

.nav-links.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

/* ===== PREVENT MODAL CLOSE ON INTERACTION ===== */
.modal#orderModal .modal-content {
    pointer-events: auto;
}

/* ===== FIX FOR IOS SAFARI ===== */
@supports (-webkit-touch-callout: none) {
    body {
        /* Prevent elastic scrolling */
        overscroll-behavior: none;
    }
    
    .modal#orderModal .modal-content {
        /* Enable momentum scrolling */
        -webkit-overflow-scrolling: touch;
    }
    
    /* Fix for 100vh on iOS */
    .modal#orderModal {
        height: -webkit-fill-available;
    }
}

/* ===== LOADING ANIMATION FIX ===== */
@media (max-width: 768px) {
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
    }
}
`;

// Tambahkan CSS ke document
function addAdditionalCSS() {
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);
}

// Panggil fungsi ini di DOMContentLoaded
document.addEventListener('DOMContentLoaded', addAdditionalCSS);

// ========== EXPOSE FUNCTIONS TO WINDOW ==========

window.orderViaWhatsApp = orderViaWhatsApp;
window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.adjustAICalculatorQuantity = adjustAICalculatorQuantity;
window.selectSpeed = selectSpeed;
window.applyCoupon = applyCoupon;
window.placeAIOrder = placeAIOrder;
window.resetAICalculator = resetAICalculator;
window.saveOrderDraft = saveOrderDraft;
window.loadOrderDraft = loadOrderDraft;

// Utility functions
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

console.log('🚀 JOKIINAJA script dengan perbaikan mobile ready!');
