// ===== KALKULATOR AI - VERSI OPTIMIZED & BEAUTIFUL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Loading Kalkulator AI Premium...');
    
    // 1. CEK APAKAH SUDAH ADA
    if (document.getElementById('ai-calculator-btn')) {
        console.log('✅ Kalkulator sudah ada di halaman ini');
        return;
    }
    
    // 2. CREATE FLOATING BUTTON WITH ANIMATION
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'ai-calculator-btn';
    floatingBtn.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M9 15H15M9 9H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Kalkulator AI
        </span>
    `;
    
    // Styling dengan gradient animasi
    floatingBtn.style.cssText = `
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
        animation: float 3s ease-in-out infinite;
    `;
    
    // Hover effects
    floatingBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.5)';
        this.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
    });
    
    floatingBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
        this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    });
    
    // 3. CREATE MODAL WITH MODERN DESIGN
    const modalHTML = `
        <div id="ai-modal-overlay" style="
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 10001;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
            opacity: 0;
            transition: opacity 0.3s ease;
        ">
            <div id="ai-modal-content" style="
                background: linear-gradient(145deg, #ffffff, #f5f7fa);
                border-radius: 20px;
                padding: 35px;
                width: 90%;
                max-width: 520px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                position: relative;
                transform: translateY(20px);
                transition: transform 0.4s ease;
                border: 1px solid rgba(255,255,255,0.2);
            ">
                <!-- Close Button -->
                <button id="ai-modal-close" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
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
                ">×</button>
                
                <!-- Header -->
                <div style="margin-bottom: 30px;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div style="
                            width: 50px;
                            height: 50px;
                            background: linear-gradient(135deg, #667eea, #764ba2);
                            border-radius: 12px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 24px;
                        ">🤖</div>
                        <div>
                            <h2 style="margin: 0; color: #2d3748; font-size: 28px; font-weight: 700;">
                                Kalkulator Harga AI
                            </h2>
                            <p style="margin: 5px 0 0 0; color: #718096; font-size: 14px;">
                                Hitung biaya layanan AI dengan mudah
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Service Selection -->
                <div style="margin-bottom: 25px;">
                    <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #4a5568; font-size: 15px;">
                        📋 Jenis Layanan
                    </label>
                    <div id="service-selector" style="
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                        gap: 12px;
                        margin-bottom: 20px;
                    ">
                        <button class="service-option active" data-value="7000" style="
                            padding: 15px;
                            border: 2px solid #667eea;
                            border-radius: 12px;
                            background: linear-gradient(135deg, #f6f8ff, #eef2ff);
                            cursor: pointer;
                            text-align: left;
                            transition: all 0.3s ease;
                        ">
                            <div style="font-weight: 600; color: #2d3748; font-size: 14px;">Laporan</div>
                            <div style="color: #667eea; font-weight: 700; font-size: 16px; margin-top: 5px;">Rp 7K/halaman</div>
                        </button>
                        
                        <button class="service-option" data-value="15000" style="
                            padding: 15px;
                            border: 2px solid #e2e8f0;
                            border-radius: 12px;
                            background: white;
                            cursor: pointer;
                            text-align: left;
                            transition: all 0.3s ease;
                        ">
                            <div style="font-weight: 600; color: #2d3748; font-size: 14px;">PowerPoint</div>
                            <div style="color: #4a5568; font-weight: 700; font-size: 16px; margin-top: 5px;">Rp 15K/slide</div>
                        </button>
                        
                        <button class="service-option" data-value="25000" style="
                            padding: 15px;
                            border: 2px solid #e2e8f0;
                            border-radius: 12px;
                            background: white;
                            cursor: pointer;
                            text-align: left;
                            transition: all 0.3s ease;
                        ">
                            <div style="font-weight: 600; color: #2d3748; font-size: 14px;">Jurnal</div>
                            <div style="color: #4a5568; font-weight: 700; font-size: 16px; margin-top: 5px;">Rp 25K/halaman</div>
                        </button>
                    </div>
                    
                    <!-- Dropdown untuk mobile/layanan lain -->
                    <select id="ai-service-dropdown" style="
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
                    ">
                        <option value="7000">📑 Laporan & Makalah (Rp 7K/halaman)</option>
                        <option value="15000">📊 PowerPoint (Rp 15K/slide)</option>
                        <option value="15000">📖 Jurnal (Rp 15K/halaman)</option>
                        <option value="350000">💻 Programming (Rp 350K/project)</option>
                        <option value="150000">📈 Analisis Data (Rp 150K/project)</option>
                    </select>
                </div>
                
                <!-- Quantity Input -->
                <div style="margin-bottom: 25px;">
                    <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #4a5568; font-size: 15px;">
                        📊 Jumlah
                    </label>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <button id="ai-minus" style="
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
                        ">-</button>
                        
                        <div style="flex: 1; position: relative;">
                            <input id="ai-quantity" type="number" value="1" min="1" style="
                                width: 100%;
                                padding: 16px;
                                padding-right: 45px;
                                text-align: center;
                                border: 2px solid #e2e8f0;
                                border-radius: 12px;
                                font-size: 20px;
                                font-weight: 700;
                                color: #2d3748;
                                background: white;
                                transition: all 0.3s ease;
                            ">
                            <div style="
                                position: absolute;
                                right: 15px;
                                top: 50%;
                                transform: translateY(-50%);
                                color: #a0aec0;
                                font-size: 14px;
                                font-weight: 500;
                                pointer-events: none;
                            " id="quantity-unit">halaman</div>
                        </div>
                        
                        <button id="ai-plus" style="
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
                        ">+</button>
                    </div>
                </div>
                
                <!-- Speed Selection -->
                <div style="margin-bottom: 30px;">
                    <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #4a5568; font-size: 15px;">
                        ⚡ Kecepatan
                    </label>
                    <div style="display: flex; gap: 15px;">
                        <button id="ai-normal" class="speed-btn active" style="
                            flex: 1;
                            padding: 20px;
                            border: 2px solid #667eea;
                            border-radius: 12px;
                            background: linear-gradient(135deg, #f6f8ff, #eef2ff);
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-align: center;
                        ">
                            <div style="font-weight: 700; color: #2d3748; margin-bottom: 5px;">📅 Normal</div>
                            <div style="font-size: 13px; color: #718096;">2-3 hari</div>
                            <div style="font-size: 12px; color: #48bb78; margin-top: 5px;">Termasuk</div>
                        </button>
                        
                        <button id="ai-express" class="speed-btn" style="
                            flex: 1;
                            padding: 20px;
                            border: 2px solid #e2e8f0;
                            border-radius: 12px;
                            background: white;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-align: center;
                        ">
                            <div style="font-weight: 700; color: #2d3748; margin-bottom: 5px;">🚀 Express</div>
                            <div style="font-size: 13px; color: #718096;">24 jam</div>
                            <div style="font-size: 12px; color: #f56565; margin-top: 5px;">+ Rp 35.000</div>
                        </button>
                    </div>
                </div>
                
                <!-- Total Price Display -->
                <div style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    padding: 25px;
                    border-radius: 16px;
                    margin-bottom: 30px;
                    color: white;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; 
                                background: rgba(255,255,255,0.1); border-radius: 50%; transform: translate(30px, -30px);">
                    </div>
                    <div style="position: relative; z-index: 1;">
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">
                            Total Harga
                        </div>
                        <div id="ai-total" style="
                            font-size: 36px;
                            font-weight: 800;
                            margin-bottom: 5px;
                        ">Rp 7.000</div>
                        <div id="ai-details" style="font-size: 13px; opacity: 0.9;">
                            1 halaman × Rp 7.000
                        </div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 15px;">
                    <button id="ai-whatsapp" style="
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
                    ">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M17.5 6.5C17.5 4.29086 15.7091 2.5 13.5 2.5H6.5C4.29086 2.5 2.5 4.29086 2.5 6.5V17.5C2.5 19.7091 4.29086 21.5 6.5 21.5H13.5C15.7091 21.5 17.5 19.7091 17.5 17.5V6.5Z" 
                                  stroke="white" stroke-width="1.5"/>
                            <path d="M7 8.5H13M7 11.5H13M7 14.5H11" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        Order via WhatsApp
                    </button>
                    
                    <button id="ai-cancel" style="
                        padding: 18px 25px;
                        background: white;
                        color: #718096;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 4. ADD TO BODY
    document.body.appendChild(floatingBtn);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 5. MAIN CALCULATION FUNCTION
    function calculateTotal() {
        try {
            // Get selected service
            let servicePrice = 7000;
            const activeService = document.querySelector('.service-option.active');
            if (activeService) {
                servicePrice = parseInt(activeService.getAttribute('data-value'));
            } else {
                servicePrice = parseInt(document.getElementById('ai-service-dropdown').value);
            }
            
            // Get quantity
            let quantity = parseInt(document.getElementById('ai-quantity').value);
            if (isNaN(quantity) || quantity < 1) quantity = 1;
            
            // Check express
            const isExpress = document.getElementById('ai-express').classList.contains('active');
            
            // Calculate
            let total = servicePrice * quantity;
            if (isExpress) total += 35000;
            
            // Format to Rupiah
            const formatted = 'Rp ' + total.toLocaleString('id-ID');
            document.getElementById('ai-total').textContent = formatted;
            
            // Update details
            const unit = getUnitForService(servicePrice);
            document.getElementById('ai-details').textContent = 
                `${quantity} ${unit} × Rp ${servicePrice.toLocaleString('id-ID')}`;
            
            return total;
        } catch (error) {
            console.error('Error in calculation:', error);
            return 0;
        }
    }
    
    // 6. HELPER FUNCTION FOR SERVICE UNITS
    function getUnitForService(price) {
        switch(price) {
            case 7000:
            case 15000:
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
    
    // 7. UPDATE UNIT TEXT BASED ON SERVICE
    function updateUnitText() {
        const activeService = document.querySelector('.service-option.active');
        let price = 7000;
        if (activeService) {
            price = parseInt(activeService.getAttribute('data-value'));
        }
        document.getElementById('quantity-unit').textContent = getUnitForService(price);
    }
    
    // 8. WHATSAPP ORDER FUNCTION
    function orderViaWhatsApp() {
        // Get service name
        let serviceName = "Laporan";
        let servicePrice = 7000;
        const activeService = document.querySelector('.service-option.active');
        if (activeService) {
            servicePrice = parseInt(activeService.getAttribute('data-value'));
            serviceName = activeService.querySelector('div:first-child').textContent;
        }
        
        const quantity = document.getElementById('ai-quantity').value;
        const total = document.getElementById('ai-total').textContent;
        const isExpress = document.getElementById('ai-express').classList.contains('active');
        const unit = getUnitForService(servicePrice);
        
        const message = `Halo JOKIINAJA! 🚀

Saya tertarik dengan layanan AI:
📋 *Jenis Layanan:* ${serviceName}
📊 *Jumlah:* ${quantity} ${unit}
⚡ *Kecepatan:* ${isExpress ? 'Express (24 jam)' : 'Normal (2-3 hari)'}
💰 *Total Harga:* ${total}

Bisa dibantu untuk order ini?`;
        
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/6282125283598?text=${encoded}`, '_blank');
        
        // Close modal with animation
        closeModal();
    }
    
    // 9. MODAL ANIMATION FUNCTIONS
    function openModal() {
        const overlay = document.getElementById('ai-modal-overlay');
        const modal = document.getElementById('ai-modal-content');
        
        overlay.style.display = 'flex';
        
        // Trigger reflow
        overlay.offsetHeight;
        
        // Animate in
        overlay.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        const overlay = document.getElementById('ai-modal-overlay');
        const modal = document.getElementById('ai-modal-content');
        
        // Animate out
        overlay.style.opacity = '0';
        modal.style.transform = 'translateY(20px)';
        
        // Hide after animation
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // 10. EVENT LISTENERS
    
    // Floating button click
    floatingBtn.addEventListener('click', openModal);
    
    // Close buttons
    document.getElementById('ai-modal-close').addEventListener('click', closeModal);
    document.getElementById('ai-cancel').addEventListener('click', closeModal);
    
    // Close when clicking outside modal
    document.getElementById('ai-modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Service selection
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all
            document.querySelectorAll('.service-option').forEach(opt => {
                opt.style.borderColor = '#e2e8f0';
                opt.style.background = 'white';
                opt.classList.remove('active');
            });
            
            // Add active class to clicked
            this.style.borderColor = '#667eea';
            this.style.background = 'linear-gradient(135deg, #f6f8ff, #eef2ff)';
            this.classList.add('active');
            
            // Update dropdown
            document.getElementById('ai-service-dropdown').value = this.getAttribute('data-value');
            
            updateUnitText();
            calculateTotal();
        });
    });
    
    // Dropdown change
    document.getElementById('ai-service-dropdown').addEventListener('change', function() {
        const price = this.value;
        document.querySelectorAll('.service-option').forEach(opt => {
            if (opt.getAttribute('data-value') === price) {
                opt.click();
            }
        });
    });
    
    // Quantity controls
    document.getElementById('ai-minus').addEventListener('click', function() {
        const input = document.getElementById('ai-quantity');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            // Add animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);
            calculateTotal();
        }
    });
    
    document.getElementById('ai-plus').addEventListener('click', function() {
        const input = document.getElementById('ai-quantity');
        input.value = parseInt(input.value) + 1;
        // Add animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = '', 150);
        calculateTotal();
    });
    
    // Quantity input change
    document.getElementById('ai-quantity').addEventListener('input', function() {
        if (this.value < 1) this.value = 1;
        calculateTotal();
    });
    
    // Speed selection
    document.getElementById('ai-normal').addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            document.getElementById('ai-express').classList.remove('active');
            document.getElementById('ai-express').style.borderColor = '#e2e8f0';
            document.getElementById('ai-express').style.background = 'white';
            
            this.classList.add('active');
            this.style.borderColor = '#667eea';
            this.style.background = 'linear-gradient(135deg, #f6f8ff, #eef2ff)';
            calculateTotal();
        }
    });
    
    document.getElementById('ai-express').addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            document.getElementById('ai-normal').classList.remove('active');
            document.getElementById('ai-normal').style.borderColor = '#e2e8f0';
            document.getElementById('ai-normal').style.background = 'white';
            
            this.classList.add('active');
            this.style.borderColor = '#667eea';
            this.style.background = 'linear-gradient(135deg, #f6f8ff, #eef2ff)';
            calculateTotal();
        }
    });
    
    // WhatsApp button
    document.getElementById('ai-whatsapp').addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => this.style.transform = '', 200);
        
        // Add loading effect
        const originalText = this.innerHTML;
        this.innerHTML = `<div style="display: flex; align-items: center; gap: 10px;">
            <div class="loading-spinner" style="width: 16px; height: 16px; border: 2px solid white; 
                  border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            Membuka WhatsApp...
        </div>`;
        this.disabled = true;
        
        setTimeout(() => {
            orderViaWhatsApp();
            this.innerHTML = originalText;
            this.disabled = false;
        }, 800);
    });
    
    // 11. ADD CSS ANIMATIONS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
            100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
        }
        
        @keyframes slideIn {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        #ai-calculator-btn {
            animation: pulse 2s infinite;
        }
        
        .service-option:hover, .speed-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        #ai-minus:hover, #ai-plus:hover {
            background: #667eea !important;
            color: white !important;
            border-color: #667eea !important;
        }
        
        #ai-whatsapp:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4) !important;
        }
        
        #ai-cancel:hover {
            background: #f7fafc !important;
            border-color: #cbd5e0 !important;
        }
        
        #ai-quantity:focus {
            outline: none;
            border-color: #667eea !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        
        #ai-modal-close:hover {
            background: rgba(0,0,0,0.2) !important;
            transform: rotate(90deg);
        }
        
        .loading-spinner {
            animation: spin 1s linear infinite;
        }
        
        /* Responsive */
        @media (max-width: 640px) {
            #ai-calculator-btn {
                bottom: 20px;
                right: 20px;
                padding: 12px 20px;
                font-size: 14px;
            }
            
            #service-selector {
                grid-template-columns: 1fr !important;
            }
            
            .service-option, .speed-btn {
                padding: 15px !important;
            }
            
            #ai-modal-content {
                padding: 25px 20px !important;
                width: 95% !important;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            #ai-total {
                font-size: 30px !important;
            }
        }
        
        @media (max-width: 480px) {
            #ai-calculator-btn span span:last-child {
                display: none;
            }
            
            #ai-calculator-btn {
                width: 50px;
                height: 50px;
                padding: 0;
                border-radius: 50%;
                justify-content: center;
            }
            
            #ai-calculator-btn svg {
                margin: 0 !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 12. KEYBOARD SHORTCUTS
    document.addEventListener('keydown', function(e) {
        // Escape to close modal
        if (e.key === 'Escape' && document.getElementById('ai-modal-overlay').style.display === 'flex') {
            closeModal();
        }
        
        // Ctrl+Alt+C to open calculator
        if (e.ctrlKey && e.altKey && e.key === 'c') {
            e.preventDefault();
            openModal();
        }
    });
    
    // 13. INITIAL SETUP
    updateUnitText();
    
    // Show dropdown on mobile
    if (window.innerWidth < 768) {
        document.getElementById('ai-service-dropdown').style.display = 'block';
        document.getElementById('service-selector').style.display = 'none';
    }
    
    // 14. TEST FUNCTION
    window.testAIcalculator = function() {
        console.log('🧪 Testing Kalkulator AI Premium...');
        console.log('✅ Tombol:', document.getElementById('ai-calculator-btn'));
        console.log('✅ Modal:', document.getElementById('ai-modal-overlay'));
        console.log('✅ Total Display:', document.getElementById('ai-total'));
        console.log('📱 WhatsApp: +62 821-2528-3598');
        
        // Test calculation
        const testTotal = calculateTotal();
        console.log(`💰 Test calculation: ${testTotal}`);
        
        return '✅ Kalkulator AI Premium siap digunakan!';
    };
    
    console.log('🎉 Kalkulator AI Premium berhasil dimuat!');
    console.log('💡 Tips: Ketik "testAIcalculator()" di console untuk testing');
});

// ===== FALLBACK FOR EXISTING CALCULATOR BUTTONS =====
setTimeout(() => {
    const existingButtons = [
        ...document.querySelectorAll('button'),
        ...document.querySelectorAll('a')
    ].filter(el => {
        const text = el.textContent.toLowerCase();
        const html = el.outerHTML.toLowerCase();
        return text.includes('kalkulator') || 
               text.includes('hitung') || 
               text.includes('harga') ||
               html.includes('calculator') ||
               html.includes('price');
    });
    
    if (existingButtons.length > 0) {
        console.log(`🔍 Found ${existingButtons.length} calculator-related elements`);
        
        existingButtons.forEach(btn => {
            const originalClick = btn.onclick;
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Try to open our calculator
                const ourBtn = document.getElementById('ai-calculator-btn');
                if (ourBtn) {
                    ourBtn.click();
                } else {
                    // If not loaded yet, reload
                    location.reload();
                }
                
                // Call original function if exists
                if (originalClick) {
                    try {
                        originalClick.call(this, e);
                    } catch(err) {
                        console.log('Original click handler skipped');
                    }
                }
                
                return false;
            };
            
            // Add visual indicator
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.insertAdjacentHTML('beforeend', 
                '<span style="position: absolute; top: 2px; right: 2px; background: #667eea; color: white; font-size: 10px; padding: 2px 5px; border-radius: 3px;">AI</span>');
        });
    }
}, 3000);

console.log('🚀 Kalkulator AI Premium script loaded successfully!');