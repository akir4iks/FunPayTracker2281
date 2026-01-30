// background.js - FunPay Super Bot Core

// Default Settings
const DEFAULT_SETTINGS = {
    autoRaise: false,
    autoRaiseInterval: 5, // minutes
    notifications: true,
    soundEnabled: true,
    theme: 'dark'
};

// Initialize settings on install
chrome.runtime.onInstalled.addListener(() => {
    console.log('FunPay Super Bot Installed');
    chrome.storage.local.get(DEFAULT_SETTINGS, (items) => {
        chrome.storage.local.set(items);
    });
});

// Handle Alarms (Auto-Raise Timer)
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'autoRaise') {
        console.log('Triggering Auto-Raise...');
        triggerAutoRaise();
    }
});

function triggerAutoRaise() {
    // Find FunPay tabs and send message to content script
    chrome.tabs.query({ url: 'https://funpay.com/*' }, (tabs) => {
        if (tabs.length > 0) {
            // Pick the first active one or just the first one
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: 'performRaise' });
        } else {
            console.log('No FunPay tabs open for Auto-Raise');
        }
    });
}

// Message Handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateSettings') {
        handleSettingsUpdate(request.settings);
    }
});

function handleSettingsUpdate(settings) {
    if (settings.autoRaise) {
        chrome.alarms.create('autoRaise', {
            periodInMinutes: parseInt(settings.autoRaiseInterval) || 5
        });
    } else {
        chrome.alarms.clear('autoRaise');
    }
}
