
const ChatEngine = {
    messages: [],
    storageKey: 'funpay_chat_history',
    container: null,
    input: null,
    sendBtn: null,

    // Pool of "other" users for simulation
    dummyUsers: [
        { name: 'EliteTrader', rankClass: 'medal-yellow', probability: 0.1 },
        { name: 'Gamer88', rankClass: 'medal-purple', probability: 0.2 },
        { name: 'GoldHunter', rankClass: 'medal-blue', probability: 0.3 },
        { name: 'NewbieSale', rankClass: 'medal-gray', probability: 0.4 }
    ],

    phrases: [
        "Всем профита!",
        "Как сегодня продажи?",
        "Наконец-то вывел косарь.",
        "У всех сайт подлагивает?",
        "Блин, клиент попался вредный.",
        "Кто-то голду покупал сегодня?",
        "Рынок сегодня бодрый.",
        "Эх, затишье...",
        "Всем хорошего вечера!",
        "Сколько сейчас курс?",
        "У меня первый заказ!",
        "Трейдеры, выручайте.",
        "Достижение 'Мастер' получено! Еее!",
        "Фух, разгреб очередь."
    ],

    init() {
        this.container = document.getElementById('chatMessages');
        this.input = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('chatSendBtn');

        if (!this.container || !this.input || !this.sendBtn) return;

        this.loadHistory();
        this.setupEventListeners();
        this.render();

        // Start simulation
        this.startSimulation();
    },

    loadHistory() {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) {
            this.messages = JSON.parse(raw);
        } else {
            // Initial welcome messages if empty
            this.messages = [
                {
                    user: 'EliteTrader',
                    text: 'Всем привет! Как сегодня продажи?',
                    time: '10:42',
                    rankClass: 'medal-yellow',
                    isSent: false
                },
                {
                    user: 'Gamer88',
                    text: 'Вроде норм, пару жирных аккаунтов ушло.',
                    time: '10:45',
                    rankClass: 'medal-purple',
                    isSent: false
                }
            ];
            this.save();
        }
    },

    save() {
        // Keep only last 50 messages to prevent storage bloat
        if (this.messages.length > 50) {
            this.messages = this.messages.slice(-50);
        }
        localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
    },

    setupEventListeners() {
        this.sendBtn.onclick = () => this.handleSend();
        this.input.onkeydown = (e) => {
            if (e.key === 'Enter') this.handleSend();
        };
    },

    handleSend() {
        const text = this.input.value.trim();
        if (!text) return;

        // Get current user rank from achievements system if exists
        let rankIcon = 'medal-gray';
        try {
            if (typeof getXpAndRank === 'function' && typeof state !== 'undefined') {
                const { currentRank } = getXpAndRank(state);
                rankIcon = currentRank.iconClass;
            }
        } catch (e) { }

        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        const msg = {
            user: getTranslation('chat_user_name') || 'Вы',
            text: text,
            time: timeStr,
            rankClass: rankIcon,
            isSent: true
        };

        this.messages.push(msg);
        this.input.value = '';
        this.save();
        this.render();

        // Smooth scroll to bottom
        this.container.scrollTo({ top: this.container.scrollHeight, behavior: 'smooth' });

        // Trigger a reply chance
        setTimeout(() => this.simulateReply(), 1500 + Math.random() * 2000);
    },

    simulateReply() {
        if (Math.random() > 0.4) return; // 40% chance to reply immediately
        this.addBotMessage();
    },

    addBotMessage() {
        const user = this.dummyUsers[Math.floor(Math.random() * this.dummyUsers.length)];
        const text = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        this.messages.push({
            user: user.name,
            text: text,
            time: timeStr,
            rankClass: user.rankClass,
            isSent: false
        });

        this.save();
        this.render();

        // Scroll to bottom
        this.container.scrollTo({ top: this.container.scrollHeight, behavior: 'smooth' });
    },

    startSimulation() {
        // Every 30-60 seconds a message might appear
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every check
                this.addBotMessage();
            }
        }, 45000);
    },

    render() {
        if (!this.container) return;

        const welcomeMsg = getTranslation('chat_welcome_msg') || 'Добро пожаловать в чат трейдеров!';

        let html = `<div class="chat-info-msg">${welcomeMsg}</div>`;

        this.messages.forEach(msg => {
            const bubbleClass = msg.isSent ? 'sent' : 'received';
            const userRowClass = msg.isSent ? 'sent' : '';

            // For 'sent', user is on left, medal on right. For 'received', medal left, user right.
            const userContent = msg.isSent
                ? `<span class="chat-user">${msg.user}</span><div class="chat-user-rank ${msg.rankClass}"></div>`
                : `<div class="chat-user-rank ${msg.rankClass}"></div><span class="chat-user">${msg.user}</span>`;

            html += `
                <div class="chat-bubble ${bubbleClass}">
                    <div class="chat-user-row ${userRowClass}">
                        ${userContent}
                    </div>
                    <p>${this.escapeHTML(msg.text)}</p>
                    <span class="chat-time">${msg.time}</span>
                </div>
            `;
        });

        this.container.innerHTML = html;
        this.container.scrollTop = this.container.scrollHeight;
    },

    escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }
};

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure achievemens.js and script.js loaded their state
    setTimeout(() => ChatEngine.init(), 100);
});
