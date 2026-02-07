// ===== KALKULATOR AI - VERSI OPTIMIZED & RESPONSIF =====
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
    
    // 3. CREATE MODAL WITH MODERN DESIGN
    const modalHTML = `
        <div id="ai-modal-overlay" class="ai-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="ai-modal-title" aria-describedby="ai-modal-description">
            <div id="ai-modal-content" class="ai-modal-content">
                <!-- Close Button -->
                <button id="ai-modal-close" class="ai-modal-close" aria-label="Tutup kalkulator">×</button>
                
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
                        <button class="service-option active" data-value="7000" data-service="laporan" aria-pressed="true">
                            <div class="service-name">Laporan</div>
                            <div class="service-price">Rp 7K/halaman</div>
                        </button>
                        
                        <button class="service-option" data-value="15000" data-service="powerpoint" aria-pressed="false">
                            <div class="service-name">PowerPoint</div>
                            <div class="service-price">Rp 15K/slide</div>
                        </button>
                        
                        <button class="service-option" data-value="25000" data-service="jurnal" aria-pressed="false">
                            <div class="service-name">Jurnal</div>
                            <div class="service-price">Rp 25K/halaman</div>
                        </button>
                    </div>
                    
                    <!-- Dropdown untuk mobile/layanan lain -->
                    <select id="ai-service-dropdown" class="ai-dropdown" aria-label="Pilih jenis layanan">
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
                        <button id="ai-normal" class="speed-btn active" data-speed="normal" aria-pressed="true">
                            <div class="speed-name">📅 Normal</div>
                            <div class="speed-time">2-3 hari</div>
                            <div class="speed-included">Termasuk</div>
                        </button>
                        
                        <button id="ai-express" class="speed-btn" data-speed="express" aria-pressed="false">
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
            animation: aiFloat 3s ease-in-out infinite;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            min-height: 44px; /* Minimum touch target size */
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
            padding: 16px;
            box-sizing: border-box;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
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
        }
        
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
            min-height: 44px; /* Minimum touch target */
            -webkit-tap-highlight-color: transparent;
        }
        
        .ai-modal-close:hover {
            background: rgba(0,0,0,0.2);
            transform: rotate(90deg);
        }
        
        /* Header */
        .ai-modal-header {
            margin-bottom: 25px;
            padding-right: 40px; /* Space for close button */
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
        
        .service-name {
            font-weight: 600;
            color: #2d3748;
            font-size: 14px;
            margin-bottom: 4px;
        }
        
        .service-price {
            color: #667eea;
            font-weight: 700;
            font-size: 15px;
        }
        
        .service-option:not(.active) .service-price {
            color: #4a5568;
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
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%234a5568' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 15px center;
            background-size: 12px;
            padding-right: 40px;
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
        
        .quantity-btn:hover {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }
        
        .quantity-input-wrapper {
            flex: 1;
            position: relative;
        }
        
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
            -moz-appearance: textfield;
        }
        
        .ai-quantity-input::-webkit-outer-spin-button,
        .ai-quantity-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        
        .ai-quantity-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .quantity-unit {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #a0aec0;
            font-size: 14px;
            font-weight: 500;
            pointer-events: none;
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
        
        .speed-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        .speed-name {
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 5px;
            font-size: 15px;
        }
        
        .speed-time {
            font-size: 13px;
            color: #718096;
            margin-bottom: 4px;
        }
        
        .speed-included {
            font-size: 12px;
            color: #48bb78;
        }
        
        .speed-price {
            font-size: 12px;
            color: #f56565;
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
        
        .total-bg {
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            transform: translate(30px, -30px);
        }
        
        .total-content {
            position: relative;
            z-index: 1;
        }
        
        .total-label {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 8px;
        }
        
        .total-amount {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 5px;
            line-height: 1.2;
            word-break: break-word;
            overflow-wrap: break-word;
        }
        
        .total-details {
            font-size: 13px;
            opacity: 0.9;
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
        
        .ai-whatsapp-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
        }
        
        .whatsapp-icon {
            flex-shrink: 0;
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
        
        .ai-cancel-btn:hover {
            background: #f7fafc;
            border-color: #cbd5e0;
        }
        
        /* Loading Spinner */
        .loading-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid white;
            border-top-color: transparent;
            border-radius: 50%;
            animation: aiSpin 1s linear infinite;
        }
        
        /* Animations */
        @keyframes aiFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes aiSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes aiPulse {
            0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
            100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
        }
        
        .ai-calculator-btn {
            animation: aiPulse 2s infinite;
        }
        
        /* === RESPONSIVE STYLES === */
        
        /* Tablet dan Mobile Landscape */
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
            
            .ai-modal-title {
                font-size: 22px;
            }
            
            .service-selector {
                grid-template-columns: 1fr;
            }
            
            .speed-selector {
                flex-direction: column;
            }
            
            .total-amount {
                font-size: 28px;
            }
        }
        
        /* Mobile Portrait */
        @media (max-width: 480px) {
            .ai-calculator-btn {
                bottom: 16px;
                right: 16px;
                padding: 10px 16px;
                font-size: 13px;
            }
            
            .ai-modal-content {
                padding: 20px 16px;
                border-radius: 16px;
            }
            
            .ai-modal-title {
                font-size: 20px;
            }
            
            .ai-modal-icon {
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
            
            .quantity-controls {
                gap: 10px;
            }
            
            .quantity-btn {
                width: 45px;
                height: 45px;
                font-size: 20px;
            }
            
            .ai-quantity-input {
                padding: 14px;
                padding-right: 50px;
                font-size: 16px;
            }
            
            .ai-action-buttons {
                flex-direction: column;
                gap: 12px;
            }
            
            .ai-whatsapp-btn,
            .ai-cancel-btn {
                width: 100%;
            }
            
            .total-amount {
                font-size: 24px;
            }
        }
        
        /* iPhone kecil dan perangkat sempit */
        @media (max-width: 375px) {
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
            
            .ai-calculator-btn .ai-btn-content {
                gap: 0;
            }
            
            .ai-modal-content {
                padding: 16px;
                max-height: 90vh;
            }
            
            .ai-modal-title-container {
                gap: 12px;
            }
            
            .ai-modal-title {
                font-size: 18px;
            }
            
            .ai-modal-subtitle {
                font-size: 13px;
            }
        }
        
        /* Landscape mode optimization */
        @media (max-height: 600px) and (orientation: landscape) {
            .ai-modal-overlay {
                align-items: flex-start;
                padding-top: 20px;
                padding-bottom: 20px;
            }
            
            .ai-modal-content {
                max-height: 85vh;
            }
        }
        
        /* Perbaikan untuk iOS */
        @supports (-webkit-touch-callout: none) {
            .ai-calculator-btn,
            .service-option,
            .speed-btn,
            .quantity-btn,
            .ai-whatsapp-btn,
            .ai-cancel-btn {
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
            }
            
            .ai-quantity-input {
                font-size: 16px; /* Mencegah zoom di iOS */
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .ai-modal-content {
                background: linear-gradient(145deg, #1a202c, #2d3748);
                color: #e2e8f0;
            }
            
            .ai-modal-title {
                color: #e2e8f0;
            }
            
            .ai-modal-subtitle {
                color: #a0aec0;
            }
            
            .ai-label {
                color: #cbd5e0;
            }
            
            .service-option {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }
            
            .service-option.active {
                background: linear-gradient(135deg, #2d3748, #4a5568);
            }
            
            .service-name {
                color: #e2e8f0;
            }
            
            .ai-dropdown {
                background-color: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23a0aec0' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
            }
            
            .ai-quantity-input {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }
            
            .quantity-btn {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }
            
            .speed-btn {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }
            
            .speed-btn.active {
                background: linear-gradient(135deg, #2d3748, #4a5568);
            }
            
            .ai-cancel-btn {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }
            
            .ai-cancel-btn:hover {
                background: #4a5568;
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
    
    // 7. MAIN CALCULATION FUNCTION
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
            document.getElementById('ai-total').textContent = 'Rp 0';
            return 0;
        }
    }
    
    // 8. HELPER FUNCTION FOR SERVICE UNITS
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
            
            if (isActive) {
                option.style.borderColor = '#667eea';
                option.style.background = 'linear-gradient(135deg, #f6f8ff, #eef2ff)';
            } else {
                option.style.borderColor = '#e2e8f0';
                option.style.background = 'white';
            }
        });
        
        // Recalculate total
        calculateTotal();
    }
    
    // 10. WHATSAPP ORDER FUNCTION
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
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Close modal
        closeModal();
    }
    
    // 11. MODAL ANIMATION FUNCTIONS
    function openModal() {
        const overlay = document.getElementById('ai-modal-overlay');
        const modal = document.getElementById('ai-modal-content');
        
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Trigger reflow
        void overlay.offsetWidth;
        
        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
        }, 10);
        
        // Focus first interactive element
        setTimeout(() => {
            document.querySelector('.service-option.active').focus();
        }, 300);
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
            document.getElementById('ai-calculator-btn').focus();
        }, 300);
    }
    
    // 12. EVENT LISTENERS
    
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
    
    // Service selection buttons
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function() {
            const price = this.getAttribute('data-value');
            updateServiceSelection(price);
        });
        
        // Add keyboard support
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const price = this.getAttribute('data-value');
                updateServiceSelection(price);
            }
        });
    });
    
    // Dropdown change
    document.getElementById('ai-service-dropdown').addEventListener('change', function() {
        updateServiceSelection(this.value);
    });
    
    // Quantity controls
    document.getElementById('ai-minus').addEventListener('click', function() {
        const input = document.getElementById('ai-quantity');
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
            // Add animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);
            calculateTotal();
        }
    });
    
    document.getElementById('ai-plus').addEventListener('click', function() {
        const input = document.getElementById('ai-quantity');
        let value = parseInt(input.value);
        if (value < 1000) {
            input.value = value + 1;
            // Add animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);
            calculateTotal();
        }
    });
    
    // Quantity input change
    document.getElementById('ai-quantity').addEventListener('input', function() {
        calculateTotal();
    });
    
    // Quantity input blur
    document.getElementById('ai-quantity').addEventListener('blur', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 1000) {
            this.value = 1000;
        }
        calculateTotal();
    });
    
    // Speed selection
    document.getElementById('ai-normal').addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            document.getElementById('ai-express').classList.remove('active');
            document.getElementById('ai-express').setAttribute('aria-pressed', 'false');
            document.getElementById('ai-express').style.borderColor = '#e2e8f0';
            document.getElementById('ai-express').style.background = 'white';
            
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            this.style.borderColor = '#667eea';
            this.style.background = 'linear-gradient(135deg, #f6f8ff, #eef2ff)';
            calculateTotal();
        }
    });
    
    document.getElementById('ai-express').addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            document.getElementById('ai-normal').classList.remove('active');
            document.getElementById('ai-normal').setAttribute('aria-pressed', 'false');
            document.getElementById('ai-normal').style.borderColor = '#e2e8f0';
            document.getElementById('ai-normal').style.background = 'white';
            
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            this.style.borderColor = '#667eea';
            this.style.background = 'linear-gradient(135deg, #f6f8ff, #eef2ff)';
            calculateTotal();
        }
    });
    
    // WhatsApp button
    document.getElementById('ai-whatsapp').addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.98)';
        
        // Add loading effect
        const originalHTML = this.innerHTML;
        this.innerHTML = `
            <div class="loading-spinner"></div>
            Membuka WhatsApp...
        `;
        this.disabled = true;
        
        setTimeout(() => {
            this.style.transform = '';
            this.innerHTML = originalHTML;
            this.disabled = false;
            orderViaWhatsApp();
        }, 800);
    });
    
    // 13. KEYBOARD SHORTCUTS
    document.addEventListener('keydown', function(e) {
        // Escape to close modal
        if (e.key === 'Escape' && document.getElementById('ai-modal-overlay').style.display === 'flex') {
            closeModal();
        }
        
        // Ctrl+Alt+C or Cmd+Alt+C to open calculator
        if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === 'c') {
            e.preventDefault();
            openModal();
        }
    });
    
    // 14. INITIAL SETUP AND RESPONSIVE ADJUSTMENTS
    
    // Show dropdown on mobile, buttons on desktop
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
    
    // 15. ADDITIONAL MOBILE SUPPORT
    
    // Prevent body scroll when modal is open (for mobile)
    const originalBodyOverflow = document.body.style.overflow;
    
    // Fix for iOS 100vh issue
    function setRealViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setRealViewportHeight();
    window.addEventListener('resize', setRealViewportHeight);
    window.addEventListener('orientationchange', setRealViewportHeight);
    
    // 16. TEST FUNCTION
    window.testAIcalculator = function() {
        console.log('🧪 Testing Kalkulator AI Premium...');
        console.log('✅ Tombol:', document.getElementById('ai-calculator-btn'));
        console.log('✅ Modal:', document.getElementById('ai-modal-overlay'));
        console.log('✅ Total Display:', document.getElementById('ai-total').textContent);
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
            if (!btn.querySelector('.ai-badge')) {
                btn.insertAdjacentHTML('beforeend', 
                    '<span class="ai-badge" style="position: absolute; top: 2px; right: 2px; background: #667eea; color: white; font-size: 10px; padding: 2px 5px; border-radius: 3px;">AI</span>');
            }
        });
    }
}, 3000);

console.log('🚀 Kalkulator AI Premium script loaded successfully!');
