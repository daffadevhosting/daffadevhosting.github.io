document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // CONFIG
    // =====================================================

    const LICENSE_B64 = 'aHR0cHM6Ly9kYWZmYWRldmhvc3RpbmcuZ2l0aHViLmlv';
    const LICENSE_URL = atob(LICENSE_B64);

    const metaLicense =
        document.querySelector('meta[name="license"]')
            ?.getAttribute('content') || '';

    const adImageUrl =
        document.querySelector('meta[name="ads-image"]')
            ?.getAttribute('content') || '';

    const adTargetUrl =
        document.querySelector('meta[name="ads-link"]')
            ?.getAttribute('content') || '#';

    let isValid = false;

    // =====================================================
    // VALIDASI LICENSE
    // =====================================================

    try {
        if (
            metaLicense === LICENSE_B64 ||
            metaLicense === LICENSE_URL
        ) {
            isValid = true;
        } else {
            isValid = atob(metaLicense) === LICENSE_URL;
        }
    } catch (err) {
        isValid = false;
    }

    // =====================================================
    // LOCK TEMPLATE FUNCTION (SUPER PRO, ELEGANT & RESPONSIVE)
    // =====================================================

    function lockTemplate(reason = 'License Invalid') {
        if (document.getElementById('peringatan')) return;

        const lockHtml = `
        <style id="peringatan-style">
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
            
            html, body {
                overflow: hidden !important;
                height: 100% !important;
                position: fixed !important;
                width: 100% !important;
            }
            
            #peringatan {
                position: fixed;
                inset: 0;
                z-index: 99999999999;
                background: rgba(9, 9, 11, 0.98);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                color: #f4f4f5;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 16px;
                font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
                box-sizing: border-box;
            }

            .lock-card {
                background: rgba(20, 20, 23, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.05);
                padding: 40px 24px;
                border-radius: 24px;
                max-width: 440px;
                width: 100%;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                align-items: center;
                box-sizing: border-box;
                animation: lockAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            .lock-icon-wrapper {
                width: 56px;
                height: 56px;
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.2);
                border-radius: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 20px;
                color: #ef4444;
            }

            #peringatan h2 {
                margin: 0 0 12px;
                font-size: 22px;
                font-weight: 600;
                letter-spacing: -0.02em;
                color: #ffffff;
            }

            #peringatan p.reason-tag {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                color: #ef4444;
                font-weight: 600;
                background: rgba(239, 68, 68, 0.08);
                padding: 4px 12px;
                border-radius: 100px;
                margin-bottom: 16px;
                border: 1px solid rgba(239, 68, 68, 0.15);
            }

            #peringatan p.desc {
                font-size: 13px;
                line-height: 1.6;
                color: #a1a1aa;
                margin: 0 0 28px;
                font-weight: 300;
            }

            .countdown-container {
                position: relative;
                width: 72px;
                height: 72px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .countdown-svg {
                position: absolute;
                inset: 0;
                transform: rotate(-90deg);
                width: 100%;
                height: 100%;
            }

            .countdown-svg circle {
                fill: none;
                stroke-width: 3;
            }

            .countdown-bg {
                stroke: rgba(255, 255, 255, 0.05);
            }

            .countdown-bar {
                stroke: #ef4444;
                stroke-dasharray: 220;
                stroke-dashoffset: 0;
                transition: stroke-dashoffset 1s linear;
            }

            #aktivasi {
                font-size: 20px;
                color: #ffffff;
                font-weight: 600;
                z-index: 2;
            }

            @keyframes lockAppear {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* Responsive Khusus HP Kecil */
            @media (max-width: 360px) {
                .lock-card {
                    padding: 32px 16px;
                }
                #peringatan h2 {
                    font-size: 18px;
                }
                #peringatan p.desc {
                    font-size: 12px;
                }
            }
        </style>
        
        <div id="peringatan">
            <div class="lock-card">
                <div class="lock-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                
                <p class="reason-tag">${reason}</p>
                <h2>System Locked</h2>
                <p class="desc">
                    Lisensi meta tidak valid atau kredit footer dimodifikasi secara ilegal. Silakan hubungi pengembang untuk aktivasi kembali.
                </p>

                <div class="countdown-container">
                    <svg class="countdown-svg" viewBox="0 0 80 80">
                        <circle class="countdown-bg" cx="40" cy="40" r="35"></circle>
                        <circle class="countdown-bar" id="countdownBar" cx="40" cy="40" r="35"></circle>
                    </svg>
                    <span id="aktivasi">10</span>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lockHtml);

        let second = 10;
        const totalDuration = 10;
        const circleRadius = 35;
        const circumference = 2 * Math.PI * circleRadius;

        const countdownBar = document.getElementById('countdownBar');
        if (countdownBar) {
            countdownBar.style.strokeDasharray = circumference;
            countdownBar.style.strokeDashoffset = 0;
        }

        const timer = setInterval(() => {
            second--;

            const el = document.getElementById('aktivasi');
            if (el) el.textContent = second;

            if (countdownBar) {
                const offset = circumference - (second / totalDuration) * circumference;
                countdownBar.style.strokeDashoffset = offset;
            }

            if (second <= 0) {
                clearInterval(timer);
                window.location.href = 'https://daffadevhosting.github.io/blog/';
            }
        }, 1000);
    }

    if (!isValid) {
        lockTemplate('Meta License Invalid');
        return;
    }

    // =====================================================
    // FOOTER SELECTION
    // =====================================================

    const footer =
        document.getElementById('footer') ||
        document.querySelector('footer') ||
        document.querySelector('.footer');

    if (!footer) {
        lockTemplate('Missing Footer Element');
        return;
    }

    // =====================================================
    // CREDIT ID GENERATOR
    // =====================================================

    const creditId = btoa(
        LICENSE_URL
            .split('')
            .reduce((sum, c) => sum + c.charCodeAt(0), 0)
            .toString()
    )
    .replace(/=/g, '')
    .substring(0, 10);

    // =====================================================
    // INJECT CREDIT
    // =====================================================

    const credit = document.createElement('div');
    credit.id = 'git-license-credit';
    credit.innerHTML = `
        <a href="${LICENSE_URL}"
           target="_blank"
           rel="noopener noreferrer"
           id="git-credit-link"
           style="color: inherit; text-decoration: none;">
           &copy; Powered by Daffa • License #${creditId}
        </a>
    `;

    credit.style.cssText = `
        margin-top: 12px !important;
        font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important;
        font-size: 11px !important;
        letter-spacing: 0.03em !important;
        opacity: .6 !important;
        display: block !important;
        visibility: visible !important;
        text-align: center !important;
        text-decoration: none !important;
        transition: opacity 0.3s !important;
    `;

    footer.appendChild(credit);

    // =====================================================
    // WATCHDOG (ULTRA SECURITY)
    // =====================================================

    setInterval(() => {
        const creditEl = document.getElementById('git-license-credit');
        const footerEl =
            document.getElementById('footer') ||
            document.querySelector('footer') ||
            document.querySelector('.footer');

        // 1. Cek keberadaan elemen fisik
        if (!footerEl || !creditEl) {
            lockTemplate('Credit Dihapus dari DOM');
            return;
        }

        // 2. Cek apakah disembunyikan menggunakan CSS (display / opacity / visibility)
        const style = window.getComputedStyle(creditEl);
        const opacity = parseFloat(style.opacity);
        
        if (
            style.display === 'none' || 
            style.visibility === 'hidden' || 
            opacity < 0.1 ||
            creditEl.offsetHeight === 0
        ) {
            lockTemplate('CSS Hiding Detected');
            return;
        }

        // 3. Cek manipulasi isi Link / URL tujuan
        const linkEl = document.getElementById('git-credit-link');
        if (!linkEl || linkEl.getAttribute('href') !== LICENSE_URL) {
            lockTemplate('License URL Tampered');
            return;
        }

        // 4. Cek manipulasi Teks Kredit (Mencegah nama diganti)
        if (!linkEl.textContent.includes('Daffa')) {
            lockTemplate('Credit Text Renamed');
            return;
        }

    }, 3000);

    // =====================================================
    // IKLAN (AD MODAL - MODERN, MINIMALIST & MOBILE FRIENDLY)
    // =====================================================

    if (adImageUrl && adTargetUrl) {
        document.body.insertAdjacentHTML(
            'beforeend',
            `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

                .modal-overlay-ad {
                    position: fixed;
                    inset: 0;
                    background: rgba(9, 9, 11, 0.6);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999999;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
                    padding: 16px; /* Mencegah modal menyentuh tepi layar HP */
                    box-sizing: border-box;
                }

                .modal-overlay-ad.show {
                    opacity: 1;
                    pointer-events: auto;
                }

                .modal-content-ad {
                    width: 100%;
                    max-width: 380px;
                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    border-radius: 24px;
                    padding: 32px 20px 24px;
                    position: relative;
                    text-align: center;
                    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.25);
                    transform: scale(0.93) translateY(15px);
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    box-sizing: border-box;
                }

                .modal-overlay-ad.show .modal-content-ad {
                    transform: scale(1) translateY(0);
                }

                /* Close button mobile friendly dengan area ketuk 44px */
                .close-ad-btn {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    border: none;
                    background: none;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    color: #71717a;
                    transition: all 0.2s ease;
                    border-radius: 50%;
                    -webkit-tap-highlight-color: transparent;
                }

                .close-ad-btn-inner {
                    background: rgba(0, 0, 0, 0.04);
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.2s ease;
                }

                .close-ad-btn:hover .close-ad-btn-inner {
                    background: rgba(0, 0, 0, 0.08);
                    color: #18181b;
                    transform: rotate(90deg);
                }

                .close-ad-btn svg {
                    width: 12px;
                    height: 12px;
                }

                .modal-content-ad h3 {
                    margin: 8px 0 6px;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #3b82f6;
                }

                .modal-content-ad h2 {
                    margin: 0 0 16px;
                    font-size: 18px;
                    font-weight: 700;
                    color: #18181b;
                    letter-spacing: -0.02em;
                    line-height: 1.3;
                }

                .ad-image-container {
                    position: relative;
                    width: 100%;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                }

                .ad-image {
                    width: 100%;
                    height: auto;
                    display: block;
                    transition: transform 0.5s ease;
                }

                /* Efek hover dinonaktifkan di layar sentuh agar transisi mulus */
                @media (hover: hover) {
                    .ad-image-container:hover .ad-image {
                        transform: scale(1.03);
                    }
                }

                .ad-link-btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    width: 100%;
                    padding: 12px 20px;
                    background: #18181b;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 14px;
                    box-sizing: border-box;
                    transition: all 0.2s ease;
                    -webkit-tap-highlight-color: transparent;
                }

                .ad-link-btn:active {
                    background: #27272a;
                    transform: scale(0.98);
                }

                @media (hover: hover) {
                    .ad-link-btn:hover {
                        background: #27272a;
                        box-shadow: 0 8px 20px -6px rgba(24, 24, 27, 0.4);
                        transform: translateY(-1px);
                    }
                    .ad-link-btn:hover svg {
                        transform: translateX(3px);
                    }
                }

                .ad-link-btn svg {
                    width: 14px;
                    height: 14px;
                    transition: transform 0.2s ease;
                }

                /* Penyesuaian khusus HP Layar Kecil */
                @media (max-width: 360px) {
                    .modal-content-ad {
                        padding: 24px 16px 16px;
                    }
                    .modal-content-ad h2 {
                        font-size: 16px;
                    }
                }
            </style>

            <div class="modal-overlay-ad" id="adModal">
                <div class="modal-content-ad">
                    <button id="closeAdBtn" class="close-ad-btn" aria-label="Close ad">
                        <div class="close-ad-btn-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </button>

                    <h3>Limited Offer</h3>
                    <h2>Promo Spesial Hari Ini!</h2>

                    <div class="ad-image-container">
                        <a href="${adTargetUrl}" target="_blank">
                            <img src="${adImageUrl}" class="ad-image" alt="Iklan Promo">
                        </a>
                    </div>

                    <a href="${adTargetUrl}" target="_blank" class="ad-link-btn">
                        Cek Sekarang
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                </div>
            </div>
            `
        );

        const modal = document.getElementById('adModal');
        const closeBtn = document.getElementById('closeAdBtn');

        setTimeout(() => {
            modal?.classList.add('show');
        }, 2000);

        closeBtn?.addEventListener('click', () => modal.classList.remove('show'));

        modal?.addEventListener('click', e => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
});