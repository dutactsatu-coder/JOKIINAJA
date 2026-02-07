// ===== KALKULATOR AI - VERSI FIXED & STABIL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Loading Kalkulator AI Premium...');
    
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
    
    // 4. ADD CSS STYLES
    const style = document.createElement('style');
    style.textContent = `
        /* === FLOATING BUTTON STYLES === */
        .ai-calculator-btn {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 28px;
            border-radius: 50px;
            border: none;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(10px);
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            min-height: 44px;
            animation: aiPulse 2s infinite;
        }
        
        .ai-calculator-btn:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.5);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        .ai-btn-content {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .ai-btn-icon {
            flex-shrink: 0;
        }
        
        .ai-btn-text {
            white-space: nowrap;
        }
        
        /* === MODAL OVERLAY === */
        .ai-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
            transition: opacity 0.3s ease;
            padding: 16px;
            box-sizing: border-box;
            opacity: 0;
            visibility: hidden;
        }
        
        .ai-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* === MODAL CONTENT === */
        .ai-modal-content {
            background: linear-gradient(145deg, #ffffff, #f5f7fa);
            border-radius: 20px;
            padding: 30px;
            width: 100%;
            max-width: 520px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            position: relative;
            transform: translateY(20px);
            transition: transform 0.4s ease;
            border: 1px solid rgba(255,255,255,0.2);
            max-height: 90vh;
            overflow-y: auto;
            box-sizing: border-box;
            opacity: 0;
        }
        
        .ai-modal-content.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        /* Modal lainnya... (CSS sama seperti sebelumnya, hanya ditambahkan class .active) */
        
        /* Close Button */
        .ai-modal-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(0,0,0,0.1);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            color: #666;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 2;
            min-height: 44px;
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Header */
        .ai-modal-header {
            margin-bottom: 25px;
            padding-right: 40px;
        }
        
        .ai-modal-title-container {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;
        }
        
        .ai-modal-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            flex-shrink: 0;
        }
        
        .ai-modal-title {
            margin: 0;
            color: #2d3748;
            font-size: 24px;
            font-weight: 700;
            line-height: 1.3;
        }
        
        .ai-modal-subtitle {
            margin: 5px 0 0 0;
            color: #718096;
            font-size: 14px;
        }
        
        /* Sections */
        .ai-section {
            margin-bottom: 25px;
        }
        
        .ai-label {
            display: block;
            margin-bottom: 12px;
            font-weight: 600;
            color: #4a5568;
            font-size: 15px;
        }
        
        /* Service Selector */
        .service-selector {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .service-option {
            padding: 15px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            text-align: left;
            transition: all 0.3s ease;
            font: inherit;
            -webkit-tap-highlight-color: transparent;
            min-height: 44px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .service-option.active {
            border-color: #667eea;
            background: linear-gradient(135deg, #f6f8ff, #eef2ff);
        }
        
        .service-option:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        /* Dropdown */
        .ai-dropdown {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            border: 2px solid #e2e8f0;
            font-size: 15px;
            background: white;
            cursor: pointer;
            color: #4a5568;
            font-weight: 500;
            display: none;
            box-sizing: border-box;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        
        /* Quantity Controls */
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            width: 100%;
        }
        
        .quantity-btn {
            width: 55px;
            height: 55px;
            border-radius: 12px;
            border: 2px solid #e2e8f0;
            background: white;
            font-size: 22px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4a5568;
            transition: all 0.3s ease;
            flex-shrink: 0;
            min-height: 44px;
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Input */
        .ai-quantity-input {
            width: 100%;
            padding: 16px;
            padding-right: 60px;
            text-align: center;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 700;
            color: #2d3748;
            background: white;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }
        
        /* Speed Selector */
        .speed-selector {
            display: flex;
            gap: 15px;
            width: 100%;
        }
        
        .speed-btn {
            flex: 1;
            padding: 18px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            font: inherit;
            -webkit-tap-highlight-color: transparent;
            min-height: 44px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .speed-btn.active {
            border-color: #667eea;
            background: linear-gradient(135deg, #f6f8ff, #eef2ff);
        }
        
        /* Total Price Display */
        .ai-total-section {
            background: linear-gradient(135deg, #667eea, #764ba2);
            padding: 25px;
            border-radius: 16px;
            margin-bottom: 30px;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        /* Action Buttons */
        .ai-action-buttons {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        .ai-whatsapp-btn {
            flex: 1;
            padding: 18px;
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
            min-height: 44px;
            -webkit-tap-highlight-color: transparent;
        }
        
        .ai-cancel-btn {
            padding: 18px 25px;
            background: white;
            color: #718096;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            min-height: 44px;
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Animations */
        @keyframes aiPulse {
            0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
            100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
        }
        
        @keyframes aiSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid white;
            border-top-color: transparent;
            border-radius: 50%;
            animation: aiSpin 1s linear infinite;
        }
        
        /* === RESPONSIVE STYLES === */
        @media (max-width: 768px) {
            .ai-calculator-btn {
                bottom: 20px;
                right: 20px;
                padding: 12px 20px;
                font-size: 14px;
            }
            
            .ai-modal-content {
                padding: 25px 20px;
                max-height: 85vh;
            }
            
            .service-selector {
                grid-template-columns: 1fr;
            }
            
            .speed-selector {
                flex-direction: column;
            }
        }
        
        @media (max-width: 480px) {
            .ai-calculator-btn .ai-btn-text {
                display: none;
            }
            
            .ai-calculator-btn {
                width: 50px;
                height: 50px;
                padding: 0;
                border-radius: 50%;
                justify-content: center;
            }
            
            .ai-modal-content {
                padding: 20px 16px;
            }
            
            .ai-action-buttons {
                flex-direction: column;
            }
        }
    `;
    
    // 5. ADD TO DOM
    document.head.appendChild(style);
    document.body.appendChild(floatingBtn);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 6. VARIABLES
    let currentServicePrice = 7000;
    let currentUnit = 'halaman';
    let currentServiceName = 'Laporan';
    
    // 7. FUNGSI UTAMA
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
    
    // 8. HELPER FUNCTIONS
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
    
    function getServiceName(price) {
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
    
    // 9. UPDATE SERVICE SELECTION
    function updateServiceSelection(price) {
        currentServicePrice = parseInt(price);
        currentUnit = getUnitForService(price);
        currentServiceName = getServiceName(price);
        
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
    
    // 10. WHATSAPP ORDER
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
    
    // 11. MODAL FUNCTIONS - FIXED VERSION
    function openModal() {
        if (isModalOpen || isAnimating) return;
        
        isAnimating = true;
        const overlay = document.getElementById('ai-modal-overlay');
        const modal = document.getElementById('ai-modal-content');
        
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
                document.getElementById('ai-calculator-btn').focus();
            }, 300);
        }, 300);
    }
    
    // 12. EVENT LISTENERS - SINGLE BINDING
    
    // Floating button - single event listener
    floatingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openModal();
    });
    
    // Close buttons
    document.getElementById('ai-modal-close').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });
    
    document.getElementById('ai-cancel').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });
    
    // Close when clicking outside modal
    document.getElementById('ai-modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        }
    });
    
    // Prevent modal content click from closing
    document.getElementById('ai-modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
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
    document.getElementById('ai-service-dropdown').addEventListener('change', function(e) {
        e.preventDefault();
        e.stopPropagation();
        updateServiceSelection(this.value);
    });
    
    // Quantity controls
    document.getElementById('ai-minus').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const input = document.getElementById('ai-quantity');
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
            calculateTotal();
        }
    });
    
    document.getElementById('ai-plus').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const input = document.getElementById('ai-quantity');
        let value = parseInt(input.value);
        if (value < 1000) {
            input.value = value + 1;
            calculateTotal();
        }
    });
    
    // Quantity input
    document.getElementById('ai-quantity').addEventListener('input', function(e) {
        e.preventDefault();
        calculateTotal();
    });
    
    // Speed selection
    document.getElementById('ai-normal').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.classList.contains('active')) {
            document.getElementById('ai-express').classList.remove('active');
            document.getElementById('ai-express').setAttribute('aria-pressed', 'false');
            
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            calculateTotal();
        }
    });
    
    document.getElementById('ai-express').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.classList.contains('active')) {
            document.getElementById('ai-normal').classList.remove('active');
            document.getElementById('ai-normal').setAttribute('aria-pressed', 'false');
            
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            calculateTotal();
        }
    });
    
    // WhatsApp button
    document.getElementById('ai-whatsapp').addEventListener('click', function(e) {
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
    
    // 13. KEYBOARD SHORTCUTS
    document.addEventListener('keydown', function(e) {
        // Escape to close modal
        if (e.key === 'Escape' && isModalOpen) {
            e.preventDefault();
            closeModal();
        }
        
        // Ctrl/Cmd + Alt + C to open calculator
        if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === 'c') {
            e.preventDefault();
            openModal();
        }
    });
    
    // 14. RESPONSIVE ADJUSTMENTS
    function updateServiceSelectorVisibility() {
        const isMobile = window.innerWidth < 768;
        const dropdown = document.getElementById('ai-service-dropdown');
        const selector = document.getElementById('service-selector');
        
        if (isMobile) {
            dropdown.style.display = 'block';
            selector.style.display = 'none';
        } else {
            dropdown.style.display = 'none';
            selector.style.display = 'grid';
        }
    }
    
    // Update on load and resize
    updateServiceSelectorVisibility();
    window.addEventListener('resize', updateServiceSelectorVisibility);
    
    // Initial calculation
    calculateTotal();
    
    // 15. MOBILE SUPPORT
    function setRealViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setRealViewportHeight();
    window.addEventListener('resize', setRealViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setRealViewportHeight, 100);
    });
    
    // 16. DEBUG AND TEST
    window.testAIcalculator = function() {
        console.log('🧪 Testing Kalkulator AI...');
        console.log('✅ Modal State:', isModalOpen ? 'Open' : 'Closed');
        console.log('✅ Animating:', isAnimating);
        console.log('✅ Current Price:', currentServicePrice);
        
        return '✅ Kalkulator AI berfungsi dengan baik!';
    };
    
    console.log('🎉 Kalkulator AI Premium siap digunakan!');
});

// ===== FALLBACK HANDLER =====
// Hapus fallback handler yang lama karena bisa menyebabkan konflik
// Ganti dengan yang lebih sederhana

console.log('🚀 Kalkulator AI script loaded successfully!');
