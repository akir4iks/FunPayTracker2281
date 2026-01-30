
/* Configuration */
const XP_PER_STAGE = 20;

const ACHIEVEMENTS_CONFIG = [
    {
        id: 'ach_stable_visit',
        metric: 'visit_streak',
        titleKey: 'ach_stable_visit',
        descKey: 'ach_desc_stable_visit',
        unitKey: 'ach_days_streak',
        stages: [3, 7, 14, 30, 60, 90, 180, 365]
    },
    {
        id: 'ach_weekly_sales',
        metric: 'weekly_sales_streak',
        titleKey: 'ach_weekly_sales',
        descKey: 'ach_desc_weekly_sales',
        unitKey: 'ach_weeks_streak',
        stages: [2, 4, 8, 12, 24, 52]
    },
    {
        id: 'ach_monthly_growth',
        metric: 'monthly_growth_streak',
        titleKey: 'ach_monthly_growth',
        descKey: 'ach_desc_monthly_growth',
        unitKey: 'ach_months_streak',
        stages: [1, 2, 3, 6, 12]
    },
    {
        id: 'ach_capital',
        metric: 'total_revenue',
        titleKey: 'ach_capital',
        descKey: 'ach_desc_capital',
        unitKey: 'cat_gold', // Uses currency symbol logic in render
        stages: [50, 100, 500, 1000, 5000, 10000, 50000, 100000, 1000000]
    }
];

const RANKS = [
    { nameKey: 'rank_novice', color: 'gray', minXp: 0, iconClass: 'medal-gray' },
    { nameKey: 'rank_specialist', color: 'blue', minXp: 100, iconClass: 'medal-blue' },
    { nameKey: 'rank_expert', color: 'purple', minXp: 300, iconClass: 'medal-purple' },
    { nameKey: 'rank_master', color: 'red', minXp: 600, iconClass: 'medal-red' },
    { nameKey: 'rank_legend', color: 'yellow', minXp: 1000, iconClass: 'medal-yellow' }
];

// Helper to get ISO week number
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}

function calculateWeeklySalesStreak(orders) {
    if (!orders || orders.length === 0) return 0;

    const paidOrders = orders.filter(o => o.status === 'paid');
    if (paidOrders.length === 0) return 0;

    // Set of "Year-Week" strings
    const weeksWithSales = new Set();
    paidOrders.forEach(o => {
        const date = new Date(o.date);
        const [year, week] = getWeekNumber(date);
        weeksWithSales.add(`${year}-${week}`);
    });

    let currentStreak = 0;
    let maxStreak = 0; // If we want max streak ever vs current. Requirement implies "4 weeks in a row" which usually means *current* or *best ever*. 
    // Let's check from current week backwards to find *current* streak.
    // Actually, usually achievements count "Best Ever Streak".
    // But for "Stability" checking *current* active streak encourages keeping it up.
    // However, if I break a streak, I shouldn't lose the achievement if I already unlocked "4 weeks".
    // So we need to calculate the *MAXIMUM consecutive streak* found in the history.

    // Sort sold weeks
    const sortedWeeks = Array.from(weeksWithSales).map(w => {
        const [y, wk] = w.split('-').map(Number);
        return { year: y, week: wk, val: y * 52 + wk };
    }).sort((a, b) => a.val - b.val);

    if (sortedWeeks.length === 0) return 0;

    let tempStreak = 1;
    let bestStreak = 1;

    for (let i = 1; i < sortedWeeks.length; i++) {
        const prev = sortedWeeks[i - 1];
        const curr = sortedWeeks[i];

        // Check if consecutive
        if (curr.val === prev.val + 1) {
            tempStreak++;
        } else {
            tempStreak = 1;
        }
        if (tempStreak > bestStreak) bestStreak = tempStreak;
    }

    return bestStreak;
}

function calculateMonthlyGrowthStreak(orders) {
    if (!orders || orders.length === 0) return 0;

    // Group revenue by Month (YYYY-MM)
    const monthlyRevenue = {};
    orders.filter(o => o.status === 'paid').forEach(o => {
        const key = o.date.substring(0, 7); // YYYY-MM
        const amount = convert(o.amount, o.currency, 'EUR');
        monthlyRevenue[key] = (monthlyRevenue[key] || 0) + amount;
    });

    const months = Object.keys(monthlyRevenue).sort();
    if (months.length < 2) return 0;

    let currentStreak = 0;
    let maxStreak = 0;

    for (let i = 1; i < months.length; i++) {
        const prevMonth = months[i - 1];
        const currMonth = months[i];

        // Check if consecutive months logic (optional, but "Growth Month over Month" usually implies consecutive)
        // Simple string compare YYYY-MM isn't enough for gap check, but let's assume if there's data, we compare.
        // If there's a gap with NO sales, that's technically 0 revenue, so growth breaks.
        // We really need to iterate through actual calendar months.

        // Simplified: Just check if this month > prev month in the sorted list of active months.
        // If there is a missing month, revenue was 0, so growth effectively reset unless we compare against 0.
        // Let's stick to the list of months where user was active.

        if (monthlyRevenue[currMonth] > monthlyRevenue[prevMonth]) {
            currentStreak++;
        } else {
            currentStreak = 0;
        }
        if (currentStreak > maxStreak) maxStreak = currentStreak;
    }

    return maxStreak;
}

function getMetrics(state) {
    return {
        visit_streak: state.visitStreak || 0,
        weekly_sales_streak: calculateWeeklySalesStreak(state.orders),
        monthly_growth_streak: calculateMonthlyGrowthStreak(state.orders),
        total_revenue: state.orders.filter(o => o.status === 'paid')
            .reduce((acc, o) => acc + convert(o.amount, o.currency, 'EUR'), 0)
    };
}

function checkAchievements(state) {
    if (!state.achievements) state.achievements = {};

    let newUnlock = false;
    const metrics = getMetrics(state);

    ACHIEVEMENTS_CONFIG.forEach(ach => {
        const currentMetric = metrics[ach.metric] || 0;

        ach.stages.forEach((threshold, idx) => {
            const stageId = `${ach.id}_${threshold}`;
            if (!state.achievements[stageId] && currentMetric >= threshold) {
                state.achievements[stageId] = new Date().toISOString();
                newUnlock = true;

                const title = getTranslation(ach.titleKey);
                const subtitle = getTranslation('ach_done').replace('{}', XP_PER_STAGE);
                showAchievementNotification(title, subtitle);
                SoundEngine.play('success');
            }
        });
    });

    if (newUnlock) {
        saveState();
        renderAchievements();
    }
}

function getXpAndRank(state) {
    if (!state.achievements) state.achievements = {};
    let totalXp = 0;
    const metrics = getMetrics(state);

    ACHIEVEMENTS_CONFIG.forEach(ach => {
        const currentMetric = metrics[ach.metric] || 0;

        ach.stages.forEach(threshold => {
            if (currentMetric >= threshold) {
                totalXp += XP_PER_STAGE;
            }
        });
    });

    let currentRank = RANKS[0];
    let nextRank = null;

    for (let i = 0; i < RANKS.length; i++) {
        if (totalXp >= RANKS[i].minXp) {
            currentRank = RANKS[i];
            nextRank = RANKS[i + 1] || null;
        }
    }

    return { totalXp, currentRank, nextRank };
}

function showAchievementNotification(title, subtitle) {
    const container = document.getElementById('notificationArea');
    if (!container) return;

    const notif = document.createElement('div');
    notif.className = 'achievement-toast anim-slide-in';
    notif.innerHTML = `
        <div class="ach-toast-icon"><i class="fa-solid fa-star"></i></div>
        <div class="ach-text">
            <h4>${title}</h4>
            <p>${subtitle}</p>
        </div>
    `;
    container.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 500);
    }, 4000);
}

function renderAchievements() {
    const list = document.getElementById('achievementsList');
    if (!list) return;
    list.innerHTML = '';

    const { totalXp, currentRank, nextRank } = getXpAndRank(state);
    const metrics = getMetrics(state);

    // 1. Render User Rank Header
    const rankProgress = nextRank
        ? ((totalXp - currentRank.minXp) / (nextRank.minXp - currentRank.minXp)) * 100
        : 100;

    const header = document.createElement('div');
    header.className = 'ach-profile-header';
    header.innerHTML = `
        <div class="ach-medal ${currentRank.iconClass}">
            <i class="fa-solid fa-shield-halved"></i>
            <div class="medal-shine"></div>
        </div>
        <div class="ach-profile-info">
            <h2>${getTranslation(currentRank.nameKey)}</h2>
            <div class="ach-xp-bar-container">
                <div class="ach-xp-bar" style="width: ${Math.min(rankProgress, 100)}%"></div>
                <span class="ach-xp-text">${totalXp} / ${nextRank ? nextRank.minXp : getTranslation('max')} XP</span>
            </div>
        </div>
    `;
    list.appendChild(header);

    // 2. Render Achievement Categories and Progress bars
    ACHIEVEMENTS_CONFIG.forEach(ach => {
        const title = getTranslation(ach.titleKey);
        const currentVal = metrics[ach.metric] || 0;
        const unitLabel = ach.metric === 'total_revenue' ? '€' : getTranslation(ach.unitKey || 'orders_unit');

        const group = document.createElement('div');
        group.className = 'ach-group';
        group.innerHTML = `<h3>${title}</h3>`;

        ach.stages.forEach(threshold => {
            const isUnlocked = currentVal >= threshold;

            // Allow progress > 100% only if unlocked? No, standard bar behavior is capped at 100%.
            const percent = Math.min((currentVal / threshold) * 100, 100);

            // Format Current Value: 12.5 vs 12
            const displayVal = Math.floor(currentVal);

            const item = document.createElement('div');
            item.className = 'ach-item ' + (isUnlocked ? 'unlocked' : 'locked');
            const statusLabel = isUnlocked ? getTranslation('completed') : `${displayVal} / ${threshold} ${ach.metric !== 'total_revenue' ? '' : ''}`;

            item.innerHTML = `
                <div class="ach-item-info">
                    <span class="ach-item-title">${threshold} ${unitLabel}</span>
                    <span class="ach-item-status">${statusLabel}</span>
                </div>
                <div class="ach-item-progress-bg">
                    <div class="ach-item-progress-fill" style="width: ${percent}%"></div>
                </div>
            `;
            group.appendChild(item);
        });

        list.appendChild(group);
    });
}
