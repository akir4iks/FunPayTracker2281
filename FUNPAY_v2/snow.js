
const SnowControl = {
    canvas: null,
    ctx: null,
    flakes: [],
    timer: null,
    isActive: false,
    timeoutDuration: 40 * 1000,
    driftTimeout: null,
    baublesContainer: null,
    bottomMoundContainer: null,
    baubleCount: 10,
    baubleColors: [
        { c: '#ff4d4d', g: 'rgba(255, 77, 77, 0.5)' }, // Red
        { c: '#f1c40f', g: 'rgba(241, 196, 15, 0.5)' }, // Gold
        { c: '#3498db', g: 'rgba(52, 152, 219, 0.5)' }, // Blue
        { c: '#2ecc71', g: 'rgba(46, 204, 113, 0.5)' }, // Green
        { c: '#e67e22', g: 'rgba(230, 126, 34, 0.5)' }, // Orange
        { c: '#9b59b6', g: 'rgba(155, 89, 182, 0.5)' }  // Purple
    ],

    init() {
        this.createCanvas();
        this.resetTimer();

        ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'].forEach(evt => {
            document.addEventListener(evt, () => this.resetTimer());
        });

        // Re-randomize drifts when switching tabs to keep snow only on the active one
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-links li')) {
                if (this.isActive) {
                    // Slight delay to ensure .active class is applied by script.js first
                    setTimeout(() => this.randomizeDrifts(), 50);
                }
            }
        });

        requestAnimationFrame(() => this.loop());
    },

    createCanvas() {
        if (this.canvas) return;
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'snowCanvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.canvas.style.opacity = '0';
        this.canvas.style.transition = 'opacity 2s';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('resize', () => this.resize());
        this.resize();
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    resetTimer() {
        if (this.isActive) {
            this.stopSnow();
        }
        clearTimeout(this.timer);
        if (typeof state !== 'undefined' && !state.winterEffectsEnabled) return;
        this.timer = setTimeout(() => this.startSnow(), this.timeoutDuration);
    },

    startSnow() {
        if (typeof state !== 'undefined' && !state.winterEffectsEnabled) return;
        this.isActive = true;
        this.canvas.style.opacity = '1';
        this.flakes = [];
        for (let i = 0; i < 200; i++) this.flakes.push(this.createFlake());

        this.randomizeDrifts();

        clearTimeout(this.driftTimeout);
        this.driftTimeout = setTimeout(() => {
            if (this.isActive) {
                document.body.classList.add('snow-drifts-visible');
            }
        }, 15000); // 15 seconds delay after snowfall begins

        this.createBaubles();
        this.createBottomMound();
    },

    randomizeDrifts() {
        // Clear old drifts before re-randomizing (prevents accumulation of CSS vars if needed)
        document.querySelectorAll('.active-drifts-applied').forEach(el => {
            el.classList.remove('active-drifts-applied');
            el.style.setProperty('--d-path', 'none');
        });

        const candidates = document.querySelectorAll('button, div, span, i, li, .stat-card, .goal-widget, .inventory-summary-card, .template-chip');

        const targets = [];
        candidates.forEach(el => {
            const text = el.innerText.trim();
            const isPlus =
                text === '+' || text === '＋' ||
                el.classList.contains('add-tpl') ||
                el.classList.contains('icon-btn-plus') ||
                el.querySelector('.fa-plus') ||
                el.querySelector('i[class*="plus"]') ||
                (el.tagName === 'BUTTON' && text === '');

            const isForbidden =
                isPlus ||
                el.classList.contains('btn-primary') ||
                el.classList.contains('icon-btn') ||
                text.includes('Додати замовлення') ||
                text.includes('Добавить заказ') ||
                text.includes('Order') ||
                getComputedStyle(el).borderRadius === '50%';

            if (isForbidden) {
                el.classList.add('no-snow');
                return;
            }

            // Sidebar targeting: ONLY active item
            const isSidebarItem = el.closest('.nav-links');
            const isAllowedSidebar = isSidebarItem && el.tagName === 'LI' && el.classList.contains('active');

            const isComponent = el.classList.contains('stat-card') ||
                el.classList.contains('goal-widget') ||
                el.classList.contains('inventory-summary-card') ||
                el.classList.contains('template-chip');
            const isSecondaryButton = el.tagName === 'BUTTON' && !el.classList.contains('btn-primary');

            if (isAllowedSidebar || isComponent || isSecondaryButton) {
                targets.push(el);
            }
        });

        targets.forEach(el => {
            const isGoal = el.classList.contains('goal-widget');
            const points = [];

            // Polygon Start (Bottom-Left)
            points.push('0% 100%');

            // Safe Edges: First point inside rises fast but stays clear of corner
            points.push('1% 99%');
            points.push('3% 95%');

            // TOP EDGE - Rounded Hills (Enforce Safe Y < 80)
            const steps = isGoal ? 12 : 8;
            for (let i = 1; i < steps; i++) {
                const x = (i / steps) * 100;
                // Keep x away from the extreme edges (fixed at 5-95 range)
                const safeX = 5 + (x * 0.9);
                const y = Math.random() * (isGoal ? 30 : 25) + (isGoal ? 5 : 45);
                points.push(`${safeX.toFixed(1)}% ${y.toFixed(1)}%`);
            }

            // Safe Edges: Last point drops fast
            points.push('97% 95%');
            points.push('99% 99%');
            points.push('100% 100%');

            // BOTTOM EDGE - Irregular Wave (Enforce Safe Y > 90)
            const bottomSteps = 8;
            for (let i = bottomSteps - 1; i > 0; i--) {
                const x = (i / bottomSteps) * 100;
                const safeX = 5 + (x * 0.9);
                const y = 92 + (Math.random() * 8);
                points.push(`${safeX.toFixed(1)}% ${y.toFixed(1)}%`);
            }

            const polygon = `polygon(${points.join(', ')})`;
            el.style.setProperty('--d-path', polygon);
            el.classList.add('active-drifts-applied');

            const h = isGoal ? Math.floor(Math.random() * 10 + 40) : Math.floor(Math.random() * 8 + 22);
            el.style.setProperty('--d-height', `${h}px`);
            el.style.setProperty('--d-top', `-${h - 5}px`);
        });
    },

    stopSnow() {
        this.isActive = false;
        document.body.classList.remove('snow-drifts-visible');
        clearTimeout(this.driftTimeout);
        this.canvas.style.opacity = '0';
        this.removeBaubles();
        this.removeBottomMound();
        // Simply remove the class and clear timeout. 
        // Do NOT clear --d-path styles here, as they are needed for the CSS transition to melt smoothly.
        // They will be overwritten/cleaned up in startSnow() -> randomizeDrifts() next time.
    },

    createBaubles() {
        if (!this.baublesContainer) {
            this.baublesContainer = document.createElement('div');
            this.baublesContainer.className = 'baubles-container';
            document.body.appendChild(this.baublesContainer);
        }
        this.baublesContainer.innerHTML = '';

        for (let i = 0; i < this.baubleCount; i++) {
            const b = document.createElement('div');
            b.className = 'bauble';

            const left = (i + 0.5) * (100 / this.baubleCount);
            const randomOffset = Math.random() * 5 - 2.5;
            b.style.left = `${left + randomOffset}%`;

            const stringH = 100 + Math.random() * 200; // Increased base to compensate for top offset
            const color = this.baubleColors[Math.floor(Math.random() * this.baubleColors.length)];
            const blinkDur = 0.7 + Math.random() * 1.0; // Faster blinking
            const swingDur = 1.5 + Math.random() * 1.5; // Faster swinging
            const swingDelay = Math.random() * -5;
            const dropDelay = Math.random() * 2000;

            b.style.setProperty('--b-string-h', `${stringH}px`);
            b.style.setProperty('--b-color', color.c);
            b.style.setProperty('--b-glow', color.g);
            b.style.setProperty('--b-blink-dur', `${blinkDur}s`);
            b.style.animationDuration = `${swingDur}s`;
            b.style.animationDelay = `${swingDelay}s`;

            b.innerHTML = `
                <div class="bauble-string"></div>
                <div class="bauble-ball"></div>
            `;

            this.baublesContainer.appendChild(b);

            // Trigger drop animation
            setTimeout(() => b.classList.add('visible'), 100 + dropDelay);
        }
    },

    removeBaubles() {
        if (!this.baublesContainer) return;
        const items = this.baublesContainer.querySelectorAll('.bauble');
        items.forEach(b => b.classList.remove('visible'));
        // Cleanup DOM after transition
        setTimeout(() => {
            if (!this.isActive && this.baublesContainer) {
                this.baublesContainer.innerHTML = '';
            }
        }, 2100);
    },

    createBottomMound() {
        if (!this.bottomMoundContainer) {
            this.bottomMoundContainer = document.createElement('div');
            this.bottomMoundContainer.className = 'bottom-snow-mound-container';
            document.body.appendChild(this.bottomMoundContainer);
        }
        this.bottomMoundContainer.innerHTML = '';

        // Create 4 distinct organic layers
        for (let i = 1; i <= 4; i++) {
            const layer = document.createElement('div');
            layer.className = `mound-layer mound-${i}`;

            // Randomize organic humps using clip-path
            const points = ['0% 100%', '0% 95%'];
            const segments = 12 + Math.floor(Math.random() * 8); // 12-20 points for smoothness

            for (let s = 1; s < segments; s++) {
                const x = (s / segments) * 100;
                // Randomized height for "humps" (lower index = base layers, higher = top layers)
                // We calculate Y where higher Y is lower on screen
                const baseDrop = 60 + (i * 8); // Layers get higher up
                const variance = 15 - (i * 2);
                const y = baseDrop - (Math.random() * variance);
                points.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
            }

            points.push('100% 95%', '100% 100%');
            layer.style.setProperty('--mound-path', `polygon(${points.join(', ')})`);

            this.bottomMoundContainer.appendChild(layer);
        }
    },

    removeBottomMound() {
        // Class removal handles the slide-down animation.
        // Data is cleared on next creation.
    },

    createFlake() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            r: Math.random() * 3 + 1,
            d: Math.random() * 150,
            a: Math.random() * 0.8 + 0.1
        };
    },

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.isActive || parseFloat(getComputedStyle(this.canvas).opacity) > 0) {
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            this.flakes.forEach((f, i) => {
                this.ctx.beginPath();
                this.ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${f.a})`;
                this.ctx.fill();
                f.y += Math.pow(f.d, 0.5) * 0.1 + 1;
                f.x += Math.sin(f.y / 20) * 0.5;
                if (f.y > this.canvas.height && this.isActive) {
                    this.flakes[i] = this.createFlake();
                    this.flakes[i].y = -10;
                }
            });
        }
        requestAnimationFrame(() => this.loop());
    }
};

document.addEventListener('DOMContentLoaded', () => SnowControl.init());
