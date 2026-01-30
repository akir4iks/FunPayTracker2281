// popup.js

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    updateStats();

    // Tab Switching
    window.openTab = (tabName) => {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

        document.getElementById(tabName).classList.add('active');
        // Find button that calls this function - slightly hacky selector match
        const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.textContent.toLowerCase().includes(tabName));
        if (btn) btn.classList.add('active');
    };

    // Event Listeners
    document.getElementById('saveSettings').addEventListener('click', saveSettings);
    document.getElementById('toggleAutoRaise').addEventListener('change', saveSettings); // Auto-save on toggle
    document.getElementById('toggleNotifs').addEventListener('change', saveSettings);

    document.getElementById('openTrackerBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://funpay.com/orders/trade?fp_tracker=true' });
    });
});

function loadSettings() {
    chrome.storage.local.get(['autoRaise', 'autoRaiseInterval', 'notifications'], (data) => {
        if (data.autoRaise !== undefined) {
            document.getElementById('toggleAutoRaise').checked = data.autoRaise;
        }
        if (data.autoRaiseInterval) {
            document.getElementById('raiseInterval').value = data.autoRaiseInterval;
        }
        if (data.notifications !== undefined) {
            document.getElementById('toggleNotifs').checked = data.notifications;
        }
    });
}

function saveSettings() {
    const settings = {
        autoRaise: document.getElementById('toggleAutoRaise').checked,
        autoRaiseInterval: parseInt(document.getElementById('raiseInterval').value) || 5,
        notifications: document.getElementById('toggleNotifs').checked
    };

    chrome.storage.local.set(settings, () => {
        // Notify background script to update alarms
        chrome.runtime.sendMessage({ action: 'updateSettings', settings: settings });

        // Visual feedback for manual save
        const saveBtn = document.getElementById('saveSettings');
        const originalText = saveBtn.textContent;
        if (saveBtn) {
            saveBtn.textContent = 'Saved!';
            setTimeout(() => saveBtn.textContent = originalText, 1000);
        }
    });
}

function updateStats() {
    chrome.storage.local.get(['statsRaised', 'statsOrders'], (data) => {
        document.getElementById('statRaised').textContent = data.statsRaised || 0;
        document.getElementById('statOrders').textContent = data.statsOrders || 0;
    });
}
