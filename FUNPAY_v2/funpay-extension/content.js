// content.js - FunPay Super Bot (GOD-MODE EDITION 3.0)

console.log('%c Super Bot: Version 3.0 (GOD-MODE) Loaded ', 'background: #000; color: #00ff00; font-weight: bold; border: 1px solid #00ff00; padding: 5px;');

// --- Dependencies ---
if (!document.getElementById('fp-fa-icons')) {
    const link = document.createElement('link');
    link.id = 'fp-fa-icons'; link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
}

// --- State ---
let windowState = {};
let currentRange = 'all';

// --- Init ---
chrome.storage.local.get(['windowState', 'allOrders', 'allPurchases'], (res) => {
    windowState = res.windowState || {};
    initFAB();

    // Auto-scan on load
    const path = window.location.pathname;
    if (path.includes('/orders/')) {
        dbLog(`Auto-scan triggered for page: ${path}`);
        setTimeout(() => triggerNuclearScan(), 2000);
    }
});

// --- UI: FAB ---
function initFAB() {
    if (document.getElementById('fp-fab-root')) return;
    const root = document.createElement('div');
    root.id = 'fp-fab-root';
    root.innerHTML = `
        <div class="fp-fab-container">
            <div class="fp-fab-menu" id="fp-menu">
                <button class="fp-fab-item" data-id="stats" title="Статистика"><i class="fa-solid fa-chart-pie"></i></button>
                <button class="fp-fab-item" data-id="calc" title="Калькулятор"><i class="fa-solid fa-calculator"></i></button>
                <button class="fp-fab-item" data-id="notes" title="Заметки"><i class="fa-solid fa-note-sticky"></i></button>
            </div>
            <button class="fp-fab-main" id="fp-toggle"><i class="fa-solid fa-plus"></i></button>
        </div>
    `;
    document.body.appendChild(root);
    injectWidgets();

    document.getElementById('fp-toggle').onclick = () => {
        const opened = document.querySelector('.fp-fab-container').classList.toggle('open');
        document.querySelector('#fp-toggle i').className = opened ? 'fa-solid fa-xmark' : 'fa-solid fa-plus';
    };

    document.querySelectorAll('.fp-fab-item').forEach(btn => {
        btn.onclick = () => openWidget(`fp-win-${btn.dataset.id}`);
    });
}

// --- UI: Widgets ---
function injectWidgets() {
    const statsHTML = `
        <div class="fp-window" id="fp-win-stats" style="width: 550px;">
            <div class="fp-window-header">
                <div class="fp-window-title"><i class="fa-solid fa-chart-pie"></i> ТРЕКЕР: СТАТИСТИКА</div>
                <div class="fp-win-controls">
                    <button class="fp-win-btn pin" data-id="fp-win-stats" title="Закрепить"><i class="fa-solid fa-thumbtack"></i></button>
                    <button class="fp-win-btn close" data-id="fp-win-stats">&times;</button>
                </div>
            </div>
            <div class="fp-window-body">
                <div class="fp-stats-filters">
                    <button class="fp-filter-btn" data-r="today">СЕГОДНЯ</button>
                    <button class="fp-filter-btn" data-r="7">7 ДНЕЙ</button>
                    <button class="fp-filter-btn" data-r="30">30 ДНЕЙ</button>
                    <button class="fp-filter-btn active" data-r="all">ВСЁ ВРЕМЯ</button>
                </div>
                <div class="fp-stats-grid">
                    <div class="fp-stat-card rev">
                        <span class="fp-stat-lbl">Выручка</span>
                        <span class="fp-stat-val" id="st-rev">0.00 €</span>
                    </div>
                    <div class="fp-stat-card exp">
                        <span class="fp-stat-lbl">Траты</span>
                        <span class="fp-stat-val" id="st-exp">0.00 €</span>
                    </div>
                    <div class="fp-stat-card">
                        <span class="fp-stat-lbl">Сделок</span>
                        <span class="fp-stat-val" id="st-cnt">0</span>
                    </div>
                    <div class="fp-stat-card">
                        <span class="fp-stat-lbl">Ср. чек</span>
                        <span class="fp-stat-val" id="st-avg">0.00 €</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="fp-action-btn" style="flex: 2;" id="btn-re-scan"><i class="fa-solid fa-magnifying-glass-chart"></i> ПРИНУДИТЕЛЬНЫЙ ПОИСК</button>
                    <button class="fp-action-btn" style="flex: 1; background: #ff4d4d22; color: #ff4d4d; border: 1px solid #ff4d4d44;" id="btn-clear-stats"><i class="fa-solid fa-trash-can"></i> СБРОС</button>
                </div>
                <div id="fp-debug-box" style="margin-top:15px; background:rgba(0,0,0,0.5); border-radius:8px; padding:10px; font-size:10px; font-family:monospace; max-height:120px; overflow-y:auto; border:1px solid #00ff0033; color:#00ff00;">
                    <div>[System] Initialized. Awaiting scan...</div>
                </div>
            </div>
        </div>
    `;

    const calcHTML = `
        <div class="fp-window" id="fp-win-calc" style="width: 300px;">
            <div class="fp-window-header">
                <div class="fp-window-title"><i class="fa-solid fa-calculator"></i> КАЛЬКУЛЯТОР</div>
                <div class="fp-win-controls">
                    <button class="fp-win-btn pin" data-id="fp-win-calc"><i class="fa-solid fa-thumbtack"></i></button>
                    <button class="fp-win-btn close" data-id="fp-win-calc">&times;</button>
                </div>
            </div>
            <div class="fp-window-body">
                <input type="text" class="fp-calc-display" id="c-disp" readonly>
                <div class="fp-calc-grid">
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='7'">7</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='8'">8</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='9'">9</button>
                    <button class="fp-calc-btn op" onclick="document.getElementById('c-disp').value+='/'">÷</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='4'">4</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='5'">5</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='6'">6</button>
                    <button class="fp-calc-btn op" onclick="document.getElementById('c-disp').value+='*'">×</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='1'">1</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='2'">2</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='3'">3</button>
                    <button class="fp-calc-btn op" onclick="document.getElementById('c-disp').value+='-'">-</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='0'">0</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value+='.'">.</button>
                    <button class="fp-calc-btn op" id="c-res">=</button>
                    <button class="fp-calc-btn op" onclick="document.getElementById('c-disp').value+='+'">+</button>
                    <button class="fp-calc-btn" onclick="document.getElementById('c-disp').value=''" style="grid-column:span 4; padding:10px; margin-top:5px; background:rgba(255,77,77,0.1); color:#ff4d4d; border-radius:8px;">CLEAR</button>
                </div>
            </div>
        </div>
    `;

    const notesHTML = `
        <div class="fp-window" id="fp-win-notes" style="width: 350px;">
            <div class="fp-window-header">
                <div class="fp-window-title"><i class="fa-solid fa-note-sticky"></i> ЗАМЕТКИ</div>
                <div class="fp-win-controls">
                    <button class="fp-win-btn pin" data-id="fp-win-notes"><i class="fa-solid fa-thumbtack"></i></button>
                    <button class="fp-win-btn close" data-id="fp-win-notes">&times;</button>
                </div>
            </div>
            <div class="fp-window-body">
                <textarea id="n-area" class="fp-input" rows="12" placeholder="Введите ваш текст..."></textarea>
                <button class="fp-action-btn" id="n-save">СОХРАНИТЬ</button>
            </div>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.id = 'fp-widgets-container';
    wrapper.innerHTML = statsHTML + calcHTML + notesHTML;
    document.body.appendChild(wrapper);

    setupWindowPersistence();
    bindEvents();
}

// --- Window Core ---
function setupWindowPersistence() {
    document.querySelectorAll('.fp-window').forEach(win => {
        const id = win.id;
        const s = windowState[id] || {};
        if (s.pinned) {
            win.classList.add('open', 'pinned', 'moved');
            const pinBtn = document.querySelector(`.fp-win-btn.pin[data-id="${id}"]`);
            if (pinBtn) pinBtn.classList.add('active');
        }
        if (s.x) {
            win.classList.add('moved');
            win.style.left = s.x + 'px'; win.style.top = s.y + 'px';
            win.style.width = s.w + 'px'; win.style.height = s.h + 'px';
            win.style.transform = 'none';
        }
        makeDraggable(win);
        new ResizeObserver(() => { if (win.classList.contains('moved')) syncState(win); }).observe(win);
    });

    document.querySelectorAll('.fp-win-btn.close').forEach(btn => {
        btn.onclick = () => {
            const win = document.getElementById(btn.dataset.id);
            win.classList.remove('open', 'pinned');
            const pinBtn = document.querySelector(`.fp-win-btn.pin[data-id="${win.id}"]`);
            if (pinBtn) pinBtn.classList.remove('active');
            syncState(win);
        };
    });

    document.querySelectorAll('.fp-win-btn.pin').forEach(btn => {
        btn.onclick = () => {
            const win = document.getElementById(btn.dataset.id);
            const active = btn.classList.toggle('active');
            win.classList.toggle('pinned', active);
            syncState(win);
        };
    });
}

function makeDraggable(win) {
    const h = win.querySelector('.fp-window-header');
    h.onmousedown = (e) => {
        if (e.target.closest('button')) return;
        const rect = win.getBoundingClientRect();
        const offX = e.clientX - rect.left, offY = e.clientY - rect.top;
        win.classList.add('moved'); win.style.transform = 'none';
        const move = (me) => { win.style.left = (me.clientX - offX) + 'px'; win.style.top = (me.clientY - offY) + 'px'; };
        const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); syncState(win); };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    };
}

function syncState(win) {
    const r = win.getBoundingClientRect();
    windowState[win.id] = { x: r.left, y: r.top, w: r.width, h: r.height, pinned: win.classList.contains('pinned') };
    chrome.storage.local.set({ windowState });
}

function openWidget(id) {
    const win = document.getElementById(id);
    win.classList.add('open');
    if (id === 'fp-win-stats') updateStatsUI();
}

// --- Feature Logic ---
function bindEvents() {
    document.querySelectorAll('.fp-filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.fp-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentRange = btn.getAttribute('data-r');
            updateStatsUI();
        };
    });

    document.getElementById('btn-re-scan').onclick = () => {
        triggerNuclearScan();
    };

    document.getElementById('btn-clear-stats').onclick = () => {
        if (confirm('Вы точно хотите СБРОСИТЬ всю историю статистики?')) {
            chrome.storage.local.set({ allOrders: [], allPurchases: [] }, () => {
                dbLog('Database cleared.');
                updateStatsUI();
                toast('Данные полностью стерты');
            });
        }
    };

    document.getElementById('c-res').onclick = () => {
        const d = document.getElementById('c-disp');
        try { d.value = Number(eval(d.value).toFixed(4)); } catch (e) { d.value = 'ERR'; }
    };

    chrome.storage.local.get(['quickNote'], r => { if (r.quickNote) { const el = document.getElementById('n-area'); if (el) el.value = r.quickNote; } });
    document.getElementById('n-save').onclick = () => {
        chrome.storage.local.set({ quickNote: document.getElementById('n-area').value }, () => toast('Заметки сохранены'));
    };
}

// --- GOD-MODE SCANNER ENGINE ---
function triggerNuclearScan() {
    const path = window.location.pathname;
    const isTrade = path.includes('/trade');
    const isBuying = path.includes('/buying');

    if (!isTrade && !isBuying) {
        dbLog('Scanner: Please visit Trade/Buying page.');
        return;
    }

    dbLog(`Scanner: Starting deep-scan [${isTrade ? 'TRADE' : 'BUYING'}]...`);
    const results = [];

    // Look for all table rows that LOOK like order data
    const rows = document.querySelectorAll('tr, .tc-item');
    dbLog(`Scanner: Inspecting ${rows.length} rows.`);

    rows.forEach((row, idx) => {
        const cells = Array.from(row.querySelectorAll('td, .tc-item div'));
        if (cells.length < 3) return; // Not a data row

        let rowData = { price: null, date: null, status: null, id: null };

        cells.forEach((cell, cellIdx) => {
            const txt = cell.innerText.trim();
            const lowTxt = txt.toLowerCase();

            // 1. Detect PRICE (has digit + currency)
            if (txt.match(/[\d\s,.]+[€$₽₴]/) || txt.match(/[€$₽₴][\d\s,.]+/)) {
                rowData.price = txt;
            }

            // 2. Detect DATE (today, yesterday, xx.xx, etc)
            if (lowTxt.match(/сегодня|вчера|today|yesterday|\d{1,2}\.\d{1,2}/)) {
                rowData.date = txt;
            }

            // 3. Detect STATUS
            if (lowTxt.match(/закр|оплач|выполн|выдано|paid|closed|done/)) {
                rowData.status = 'paid';
            }

            // 4. Detect ID (contains # or link with digits)
            const link = cell.querySelector('a');
            if (txt.includes('#')) {
                rowData.id = txt.match(/#([A-Z0-9]+)/i)?.[1];
            } else if (link && !rowData.id) {
                const href = link.getAttribute('href');
                if (href && href.match(/\d+/)) rowData.id = href.split('/').pop();
            }
        });

        // Validation
        if (rowData.price && rowData.date && rowData.status === 'paid') {
            const priceMatch = rowData.price.match(/([\d\s,.]+)/);
            if (priceMatch) {
                const val = parseFloat(priceMatch[0].replace(/\s/g, '').replace(',', '.'));
                const isoDate = parseFPDate(rowData.date);
                const finalId = rowData.id || (isoDate + "_" + val);

                results.push({ amount: val, date: isoDate, id: finalId });
            }
        }
    });

    dbLog(`Scanner: Valid items found: ${results.length}.`);

    if (results.length > 0) {
        const key = isTrade ? 'allOrders' : 'allPurchases';
        chrome.storage.local.get([key], res => {
            const old = res[key] || [];
            const map = new Map();
            old.forEach(i => map.set(i.id, i));
            results.forEach(i => map.set(i.id, i));

            const merged = Array.from(map.values());
            chrome.storage.local.set({ [key]: merged }, () => {
                toast(`Обновлено: ${results.length} зап.`);
                updateStatsUI();
            });
        });
    } else {
        dbLog('Scanner ERROR: No paid items identified. Check status symbols.');
    }
}

function updateStatsUI() {
    chrome.storage.local.get(['allOrders', 'allPurchases'], res => {
        const orders = res.allOrders || [];
        const purchases = res.allPurchases || [];

        let startTime = 0;
        const now = new Date();

        if (currentRange === 'today') {
            const d = new Date(); d.setHours(0, 0, 0, 0);
            startTime = d.getTime();
        } else if (currentRange === '7') {
            const d = new Date(); d.setDate(now.getDate() - 7); d.setHours(0, 0, 0, 0);
            startTime = d.getTime();
        } else if (currentRange === '30') {
            const d = new Date(); d.setDate(now.getDate() - 30); d.setHours(0, 0, 0, 0);
            startTime = d.getTime();
        }

        let rev = 0, exp = 0, cnt = 0;
        orders.forEach(i => {
            if (new Date(i.date).getTime() >= startTime) { rev += i.amount; cnt++; }
        });
        purchases.forEach(i => {
            if (new Date(i.date).getTime() >= startTime) { exp += i.amount; }
        });

        const format = (n) => n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('st-rev').innerText = format(rev) + ' €';
        document.getElementById('st-exp').innerText = format(exp) + ' €';
        document.getElementById('st-cnt').innerText = cnt;
        document.getElementById('st-avg').innerText = (cnt > 0 ? format(rev / cnt) : '0.00') + ' €';

        dbLog(`UI: Period=${currentRange}. Total Items in DB: ${orders.length + purchases.length}`);
    });
}

// --- Utils ---
function dbLog(msg) {
    const b = document.getElementById('fp-debug-box');
    if (b) b.innerHTML = `<div>> ${new Date().toLocaleTimeString()}: ${msg}</div>` + b.innerHTML.substring(0, 1000);
}

function toast(msg) {
    const t = document.createElement('div');
    t.className = 'fp-toast';
    t.innerHTML = `<i class="fa-solid fa-bell"></i> ${msg}`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
}

function parseFPDate(t) {
    const n = new Date();
    const txt = t.toLowerCase().trim();
    const tm = txt.match(/(\d{1,2}):(\d{2})/);
    let h = 0, m = 0; if (tm) { h = parseInt(tm[1]); m = parseInt(tm[2]); }

    if (txt.includes('сегодня') || txt.includes('today')) {
        const d = new Date(); d.setHours(h, m, 0, 0); return d.toISOString();
    }
    if (txt.includes('вчера') || txt.includes('yesterday')) {
        const d = new Date(); d.setDate(d.getDate() - 1); d.setHours(h, m, 0, 0); return d.toISOString();
    }
    const f = txt.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
    if (f) return new Date(f[3], f[2] - 1, f[1], h, m).toISOString();
    const s = txt.match(/(\d{1,2})\.(\d{1,2})/);
    if (s) {
        let y = n.getFullYear();
        if (n.getMonth() === 0 && parseInt(s[2]) === 12) y--;
        return new Date(y, s[2] - 1, s[1], h, m).toISOString();
    }
    return n.toISOString();
}
