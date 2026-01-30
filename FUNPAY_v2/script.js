/**
 * FunPay Sales Tracker v3.0
 * Includes PWA, Templates, Privacy, Sound, and Sync.
 */

// --- Constants & Config ---
const STORAGE_KEY = 'funpay_tracker_data';
const RATES_API = 'https://api.exchangerate-api.com/v4/latest/EUR';
const SECURITY_SALT = 'fpt_secure_v2_99x';
const TRIBUTE_LINK = 'https://t.me/tribute/app?startapp=hqfM';

const PAID_THEMES = {};

const DEFAULT_RATES = {
    EUR: 1,
    USD: 1.18,
    UAH: 42.94,
    RUB: 89.19
};

const CATEGORIES = {
    gold: { key: 'cat_gold', color: '#f1c40f', icon: 'fa-coins' },
    access: { key: 'cat_access', color: '#3498db', icon: 'fa-user-lock' },
    boost: { key: 'cat_boost', color: '#9b59b6', icon: 'fa-rocket' },
    service: { key: 'cat_service', color: '#2ecc71', icon: 'fa-bell-concierge' },
    rent: { key: 'cat_rent', color: '#1abc9c', icon: 'fa-key' },
    items: { key: 'cat_items', color: '#e67e22', icon: 'fa-box-open' },
    other: { key: 'cat_other', color: '#95a5a6', icon: 'fa-ellipsis' }
};

const TRANSLATIONS = {
    ru: {
        balance: 'Баланс',
        purchases: 'Покупки',
        stats: 'Статистика',
        calculator: 'Калькулятор',
        notes: 'Заметки',
        inventory: 'Склад',
        settings: 'Настройки',
        theme_color: 'Цвет темы',
        appearance_title: 'Внешний вид',
        general_title: 'Общие',
        data_title: 'Данные',
        monthly_goal: 'Цель на месяц',
        sounds: 'Звуки',
        export: 'Экспорт',
        import: 'Импорт',
        sync: 'Синхронизация по коду',
        reset: 'Сбросить всё',
        add_order: 'Добавить заказ',
        add_expense: 'Добавить расход',
        add_product: 'Добавить товар',
        total_balance: 'Текущий баланс',
        updated: 'Обновлено',
        never: 'никогда',
        history: 'История заказов',
        exp_history: 'История покупок',
        search_placeholder: 'Поиск...',
        all_categories: 'Все категории',
        all_statuses: 'Все статусы',
        waiting: 'Ожидание',
        paid: 'Оплачено',
        total_expenses: 'Всего расходов',
        net_profit: 'Чистая прибыль',
        revenue: 'Выручка',
        orders_count: 'Заказов',
        avg_check: 'Ср. чек',
        forecast: 'Прогноз (мес)',
        activity: 'Активность (Календарь)',
        top_products: 'Топ товаров по прибыли',
        currency_converter: 'Конвертер валют',
        warehouse: 'Склад товаров',
        product_name: 'Название',
        unit: 'Ед.',
        quantity: 'Кол-во',
        price_per_unit: 'Цена/ед',
        total: 'Всего',
        actions: 'Действия',
        total_value: 'Общая стоимость',
        save: 'Сохранить',
        cancel: 'Отмена',
        delete: 'Удалить',
        edit: 'Редактировать',
        new_order: 'Новый заказ',
        new_expense: 'Новый расход',
        new_product: 'Новый товар',
        order_title: 'Название заказа',
        expense_target: 'На что потрачено?',
        amount: 'Сумма',
        date: 'Дата',
        welcome: 'Добро пожаловать в FP Tracker',
        welcome_text1: 'Удобный учёт продаж.',
        welcome_text2: 'Ваши данные хранятся только в браузере.',
        welcome_btn: 'Начать работу',
        cat_gold: 'Игровая валюта',
        cat_access: 'Аккаунты',
        cat_boost: 'Бустинг',
        cat_service: 'Услуги',
        cat_rent: 'Аренда',
        cat_items: 'Предметы',
        cat_other: 'Прочее',
        currency: 'Валюта',
        order_number: 'Номер заказа',
        recent_history: 'История действий',
        action_add: 'Добавлен заказ',
        action_edit: 'Изменён заказ',
        action_delete: 'Удалён заказ',
        action_status: 'Статус: ',
        action_clear: 'История очищена',
        fill_amount: 'Заполните поле суммы!',
        enter_name: 'Введите название!',
        delete_confirm: 'Удалить?',
        quick_sell: 'Быстрая продажа со склада:',
        preset_today: 'Сегодня',
        preset_yesterday: 'Вчера',
        preset_7_days: '7 дней',
        preset_30_days: '30 дней',
        preset_all_time: 'Всё время',
        compare_prev: 'Сравнить: пред. период',
        compare_day: 'Сравнить: вчера',
        compare_week: 'Сравнить: прошл. неделю',
        compare_month: 'Сравнить: прошл. месяц',
        revenue_dynamic: 'Динамика выручки',
        category_shares: 'Доли категорий',
        note_placeholder: 'Напишите заметку...',
        save_note: 'Сохранить',
        previously: 'Ранее',
        days_short: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        achievements: 'Достижения',
        achievements_title: 'Мои Достижения',
        ach_trader: 'Трейдер',
        ach_capital: 'Капитал',
        ach_inventory: 'Завхоз',
        ach_desc_trader: 'Выполнить N заказов',
        ach_desc_capital: 'Заработать N €',
        ach_desc_inventory: 'Иметь N товаров на складе',
        ach_rank_bronze: ['Начинающий', 'Копилка', 'Кладовщик'],
        ach_rank_silver: ['Опытный', 'Банкир', 'Директор склада'],
        ach_rank_gold: ['Магнат', 'Олигарх', 'Логист'],
        ach_unlocked: 'Получено',
        rank_novice: 'Новичок',
        rank_specialist: 'Специалист',
        rank_expert: 'Эксперт',
        rank_master: 'Мастер',
        rank_master: 'Мастер',
        rank_legend: 'Легенда',
        ach_stable_visit: 'Надёжный',
        ach_weekly_sales: 'Активный трейдер',
        ach_monthly_growth: 'Растущий бизнес',
        ach_desc_stable_visit: 'Заходить в приложение N дней подряд',
        ach_desc_weekly_sales: 'Продажи N недель подряд',
        ach_desc_monthly_growth: 'Рост выручки N месяцев подряд',
        ach_days_streak: 'дней',
        ach_weeks_streak: 'недель',
        ach_months_streak: 'мес.',
        support: 'Поддержка',
        faq_title: 'Часто задаваемые вопросы',
        q1: 'Где хранятся мои данные?',
        a1: 'Все ваши данные хранятся локально в вашем браузере (LocalStorage). Мы не передаем их на сторонние серверы, если вы не используете функцию синхронизации.',
        q2: 'Как работает синхронизация?',
        a2: 'Синхронизация позволяет перенести ваши данные на другое устройство по уникальному коду. Будьте осторожны: не передавайте этот код посторонним!',
        q3: 'Как изменить валюту?',
        a3: 'Вы можете выбрать основную валюту отображения в шапке сайта. Все суммы будут автоматически пересчитаны по актуальному курсу.',
        q4: 'Безопасно ли это?',
        a4: 'Приложение работает как PWA (Progressive Web App) и полностью автономно. Конфиденциальность ваших финансов — наш приоритет.',
        support_contact: 'По вопросам и предложениям обращайтесь к разработчику.',
        created_by: 'Создано',
        new_tpl: 'Новый шаблон',
        tpl_name: 'Название (на чипе)',
        tpl_name_placeholder: 'Например: Голда 1000',
        cat: 'Категория',
        amount_currency: 'Сумма и Валюта',
        rename_product: 'Переименовать товар',
        new_name_label: 'Новое название (объединит товары)',
        rename_warning: 'Внимание: все заказы с текущим названием будут переименованы.',
        ach_done: 'Выполнено! +{} XP',
        orders_unit: 'Заказов',
        completed: 'Завершено',
        max: 'МАКС',
        confirm: 'Подтверждение',
        attention: 'Внимание',
        input_data: 'Ввод данных',
        input_value: 'Введите значение:',
        yes: 'Да',
        no: 'Нет',
        ok: 'OK',
        q5: 'Для чего предназначен этот сайт?',
        a5: 'Это специализированный инструмент для трейдеров FunPay. Он помогает вести учет продаж, отслеживать чистую прибыль, управлять складом товаров и анализировать статистику за разные периоды.',
        q6: 'Как работает копилка?',
        a6: 'Копилка автоматически откладывает процент с продаж. Можно задать общий % или настроить его для каждой категории отдельно. Деньги вычитаются из чистой прибыли. При заполнении на 100% отчисления прекращаются. Если удалить копилку, деньги вернутся на баланс.',
        support_ticket_title: 'Письмо поддержке',
        ticket_subject_label: 'Тема обращения',
        ticket_message_label: 'Сообщение',
        send_request_btn: 'Отправить запрос',
        request_sent_stub: 'Заявка принята! Ожидайте ответа в ближайшее время.',
        support_contact: 'По вопросам и предложениям обращайтесь к разработчику.',
        our_socials: 'Наши соц.сети',
        fab_add_order: 'Добавить заказ',
        fab_chat: 'Общий чат',
        community_chat_title: 'Общий чат',
        chat_rules_title: 'Правила чата',
        chat_rules_text: 'Запрещено: продажа товаров, спам, мат.',
        chat_welcome_msg: 'Добро пожаловать в чат трейдеров!',
        chat_placeholder: 'Напишите сообщение...',
        chat_user_name: 'Вы',
        theme_indigo: 'Индиго',
        theme_purple: 'Фиолетовый',
        theme_green: 'Зеленый',
        theme_orange: 'Оранжевый',
        theme_red: 'Красный',
        theme_gold: 'Золотой',
        theme_matrix: 'Матрица',
        theme_japanese: 'Сакура',
        theme_cyberpunk: '2077',
        theme_vk: 'ВКонтакте',
        theme_discord: 'Discord',
        theme_telegram: 'Telegram',
        theme_hub: 'Hub',
        premium_theme: 'Премиум тема',
        feat_unlimit: 'Пожизненный доступ',
        feat_anim: 'Уникальная анимация блеска',
        feat_support: 'Поддержка разработчика',
        effects: 'Эффекты',
        backup_title: 'Резервное копирование',
        currency_rates: 'Курсы валют (1 EUR)',
        sync_by_code: 'Синхронизация по коду',
        reset_all: 'Сбросить все данные приложения',
        update_rates_btn: 'Обновить курсы валют',
        rental_duration: 'Длительность аренды',
        minutes: 'Минуты',
        hours: 'Часы',
        days: 'Дни',
        months: 'Месяцы',
        expired: 'Истекло',
        active: 'Активно',
        time_left: 'Осталось',
        finish_at: 'Закончится:',
        sort_date_desc: '<i class="fa-solid fa-calendar-days"></i> Сначала новые',
        sort_date_asc: '<i class="fa-solid fa-calendar-days"></i> Сначала старые',
        sort_time_asc: '<i class="fa-solid fa-hourglass-start"></i> Заканчиваются скоро',
        sort_time_desc: '<i class="fa-solid fa-hourglass-end"></i> Заканчиваются позже',
        err_required: 'Обязательное поле',
        err_negative: 'Число должно быть положительным',
        err_max: 'Максимум: 100,000',
        piggy_bank: 'Копилка',
        add_piggy: 'Добавить копилку',
        piggy_name: 'Название / Цель',
        piggy_percentage: 'Общий процент (%)',
        piggy_category_rates: 'Проценты по категориям',
        piggy_goal: 'Целевая сумма',
        piggy_current: 'Накоплено',
        piggy_max_error: 'Максимум 10 копилок!',
        piggy_delete_confirm: 'Удалить копилку? Все накопления в заказах сохранятся, но копилка исчезнет.',
        piggy_break_confirm: 'Разбить копилку молотком? Все накопленные деньги ({} {}) будут удалены и записаны в расходы.',
        piggy_broken_title: 'Копилка разбита: {}',
        piggy_filled: 'Заполнено',
        transfer_funds: 'Перевод средств',
        target_bank: 'Копилка-получатель',
        confirm_transfer: 'Перевести',
        transfer_from: 'Перевод из: ',
        err_same_bank: 'Нельзя перевести в ту же копилку!',
        err_insufficient_funds: 'Недостаточно средств!',
        select_placeholder: 'Выберите...',
        profile: 'Профиль',
        nickname: 'Имя пользователя',
        news_title: 'Новости и обновления',
        next_rank: 'Следующий ранг',
        rank_status: 'Текущий статус',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    },
    en: {
        balance: 'Balance',
        purchases: 'Purchases',
        stats: 'Statistics',
        calculator: 'Calculator',
        notes: 'Notes',
        inventory: 'Inventory',
        settings: 'Settings',
        theme_color: 'Theme Color',
        appearance_title: 'Appearance',
        general_title: 'General',
        data_title: 'Data',
        monthly_goal: 'Monthly Goal',
        sounds: 'Sounds',
        export: 'Export',
        import: 'Import',
        sync: 'Cloud Sync',
        premium_theme: 'Premium Theme',
        feat_unlimit: 'Lifetime Access',
        feat_anim: 'Unique Shine Animation',
        feat_support: 'Developer Support',
        reset: 'Reset All',
        add_order: 'Add Order',
        add_expense: 'Add Expense',
        add_product: 'Add Product',
        total_balance: 'Current Balance',
        updated: 'Updated',
        never: 'never',
        history: 'Order History',
        exp_history: 'Purchase History',
        search_placeholder: 'Search...',
        all_categories: 'All Categories',
        all_statuses: 'All Statuses',
        waiting: 'Waiting',
        paid: 'Paid',
        total_expenses: 'Total Expenses',
        net_profit: 'Net Profit',
        revenue: 'Revenue',
        orders_count: 'Orders',
        avg_check: 'Avg Check',
        forecast: 'Forecast (Mo)',
        activity: 'Activity (Calendar)',
        top_products: 'Top Products by Profit',
        currency_converter: 'Currency Converter',
        warehouse: 'Warehouse',
        product_name: 'Name',
        unit: 'Unit',
        quantity: 'Qty',
        price_per_unit: 'Price/Unit',
        total: 'Total',
        actions: 'Actions',
        total_value: 'Total Value',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        new_order: 'New Order',
        new_expense: 'New Expense',
        new_product: 'New Product',
        order_title: 'Order Name',
        expense_target: 'Expense Description',
        amount: 'Amount',
        date: 'Date',
        welcome: 'Welcome to FP Tracker',
        welcome_text1: 'Simple sales tracking.',
        welcome_text2: 'Your data is stored locally in your browser.',
        welcome_btn: 'Get Started',
        cat_gold: 'Currency',
        cat_access: 'Accounts',
        cat_boost: 'Boosting',
        cat_service: 'Services',
        cat_rent: 'Rental',
        cat_items: 'Items',
        cat_other: 'Other',
        currency: 'Currency',
        rates_title: 'Exchange Rates',
        update_rates_btn: 'Update Exchange Rates',
        order_number: 'Order Number',
        recent_history: 'History',
        action_add: 'Order added',
        action_edit: 'Order edited',
        action_delete: 'Order deleted',
        action_status: 'Status: ',
        action_clear: 'History cleared',
        fill_amount: 'Please enter an amount!',
        enter_name: 'Please enter a name!',
        delete_confirm: 'Delete?',
        quick_sell: 'Quick Sell from Warehouse:',
        preset_today: 'Today',
        preset_yesterday: 'Yesterday',
        preset_7_days: '7 Days',
        preset_30_days: '30 Days',
        preset_all_time: 'All Time',
        compare_prev: 'Compare: prev. period',
        compare_day: 'Compare: yesterday',
        compare_week: 'Compare: last week',
        compare_month: 'Compare: last month',
        revenue_dynamic: 'Revenue Dynamics',
        category_shares: 'Category Shares',
        note_placeholder: 'Write a note...',
        save_note: 'Save',
        previously: 'Previously',
        days_short: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        achievements: 'Achievements',
        achievements_title: 'My Achievements',
        ach_trader: 'Trader',
        ach_capital: 'Capital',
        ach_inventory: 'Manager',
        ach_desc_trader: 'Complete N orders',
        ach_desc_capital: 'Earn N €',
        ach_desc_inventory: 'Have N items in stock',
        ach_rank_bronze: ['Novice', 'Piggy Bank', 'Storeman'],
        ach_rank_silver: ['Expert', 'Banker', 'Director'],
        ach_rank_gold: ['Tycoon', 'Oligarch', 'Logistics Chief'],
        ach_unlocked: 'Unlocked',
        rank_novice: 'Novice',
        rank_specialist: 'Specialist',
        rank_expert: 'Expert',
        rank_master: 'Master',
        rank_master: 'Master',
        rank_legend: 'Legend',
        ach_stable_visit: 'Reliable',
        ach_weekly_sales: 'Active Trader',
        ach_monthly_growth: 'Growing Business',
        ach_desc_stable_visit: 'Visit app N days in a row',
        ach_desc_weekly_sales: 'Sales for N weeks in a row',
        ach_desc_monthly_growth: 'Revenue growth for N months in a row',
        ach_days_streak: 'days',
        ach_weeks_streak: 'weeks',
        ach_months_streak: 'mo.',
        support: 'Support',
        faq_title: 'Frequently Asked Questions',
        q1: 'Where is my data stored?',
        a1: 'All your data is stored locally in your browser (LocalStorage). We do not transfer it to third-party servers unless you use the synchronization feature.',
        q2: 'How does synchronization work?',
        a2: 'Synchronization allows you to transfer your data to another device using a unique code. Be careful: do not share this code with anyone!',
        q3: 'How to change the currency?',
        a3: 'You can choose the main display currency in the header. All amounts will be automatically recalculated according to the current exchange rate.',
        q4: 'Is it safe?',
        a4: 'The application works as a PWA (Progressive Web App) and is completely autonomous. The privacy of your finances is our priority.',
        support_contact: 'For questions and suggestions, please contact the developer.',
        created_by: 'Created by',
        new_tpl: 'New Template',
        tpl_name: 'Name (on chip)',
        tpl_name_placeholder: 'Example: Gold 1000',
        cat: 'Category',
        amount_currency: 'Amount & Currency',
        rename_product: 'Rename Product',
        new_name_label: 'New name (will merge products)',
        rename_warning: 'Warning: all orders with the current name will be renamed.',
        ach_done: 'Done! +{} XP',
        orders_unit: 'Orders',
        completed: 'Completed',
        max: 'MAX',
        confirm: 'Confirmation',
        attention: 'Attention',
        input_data: 'Input Data',
        input_value: 'Enter value:',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        q5: 'What is this site for?',
        a5: 'This is a specialized tool for FunPay traders. It helps track sales, monitor net profit, manage item stock, and analyze statistics over various periods.',
        support_ticket_title: 'Submit a Request',
        ticket_subject_label: 'Subject',
        ticket_message_label: 'Message',
        send_request_btn: 'Send Request',
        request_sent_stub: 'Request received! Please wait for a response soon.',
        support_contact: 'For questions and suggestions, please contact the developer.',
        our_socials: 'Our Social Networks',
        fab_add_order: 'Add Order',
        fab_chat: 'Community Chat',
        community_chat_title: 'Community Chat',
        chat_rules_title: 'Chat Rules',
        chat_rules_text: 'Prohibited: selling goods, spam, swearing.',
        chat_welcome_msg: 'Welcome to the trader chat!',
        chat_placeholder: 'Type a message...',
        chat_user_name: 'You',
        theme_indigo: 'Indigo',
        theme_purple: 'Purple',
        theme_green: 'Green',
        theme_orange: 'Orange',
        theme_red: 'Red',
        theme_gold: 'Golden',
        theme_matrix: 'Matrix',
        theme_japanese: 'Sakura',
        theme_cyberpunk: '2077',
        theme_vk: 'Classic',
        theme_ussr: 'USSR',
        theme_discord: 'Discord',
        theme_telegram: 'Telegram',
        theme_hub: 'Hub',
        effects: 'Effects',
        backup_title: 'Backup',
        currency_rates: 'Currency Rates (1 EUR)',
        sync_by_code: 'Cloud Sync by Code',
        reset_all: 'Reset All Application Data',
        rental_duration: 'Rental Duration',
        minutes: 'Minutes',
        hours: 'Hours',
        days: 'Days',
        months: 'Months',
        expired: 'Expired',
        active: 'Active',
        time_left: 'Left',
        finish_at: 'Finishes at:',
        sort_date_desc: '📅 Newest first',
        sort_date_asc: '📅 Oldest first',
        sort_time_asc: '⏳ Expiring soon',
        sort_time_desc: '⏳ Expiring later',
        err_required: 'Required field',
        err_negative: 'Value must be positive',
        err_max: 'Maximum: 100,000',
        piggy_bank: 'Piggy Bank',
        add_piggy: 'Add Piggy Bank',
        piggy_name: 'Name / Goal',
        piggy_percentage: 'Sale Percentage (%)',
        piggy_goal: 'Goal Amount',
        piggy_current: 'Saved',
        piggy_max_error: 'Maximum 10 piggy banks!',
        piggy_delete_confirm: 'Delete piggy bank? Order deductions remain, but the piggy will be gone.',
        piggy_break_confirm: 'Break the piggy bank with a hammer? All saved money ({} {}) will be removed and recorded as an expense.',
        piggy_broken_title: 'Piggy Bank Broken: {}',
        piggy_filled: 'Filled',
        transfer_funds: 'Transfer Funds',
        target_bank: 'Target Piggy Bank',
        confirm_transfer: 'Transfer',
        transfer_from: 'Transfer from: ',
        err_same_bank: 'Cannot transfer to the same bank!',
        err_insufficient_funds: 'Insufficient funds!',
        select_placeholder: 'Select...',
        profile: 'Profile',
        nickname: 'Username',
        news_title: 'News & Updates',
        next_rank: 'Next Rank',
        rank_status: 'Current Status',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    uk: {
        balance: 'Баланс',
        purchases: 'Покупки',
        stats: 'Статистика',
        calculator: 'Калькулятор',
        notes: 'Нотатки',
        inventory: 'Склад',
        settings: 'Налаштування',
        theme_color: 'Колір теми',
        appearance_title: 'Зовнішній вигляд',
        general_title: 'Загальні',
        data_title: 'Дані',
        monthly_goal: 'Ціль на місяць',
        sounds: 'Звуки',
        export: 'Експорт',
        import: 'Імпорт',
        sync: 'Хмарна синхронізація',
        reset: 'Скинути все',
        add_order: 'Додати замовлення',
        add_expense: 'Додати витрату',
        add_product: 'Додати товар',
        total_balance: 'Поточний баланс',
        updated: 'Оновлено',
        never: 'ніколи',
        history: 'Історія замовлень',
        exp_history: 'Історія покупок',
        search_placeholder: 'Пошук...',
        all_categories: 'Всі категорії',
        all_statuses: 'Всі статуси',
        waiting: 'Очікування',
        paid: 'Оплачено',
        total_expenses: 'Всього витрат',
        net_profit: 'Чистий прибуток',
        revenue: 'Виручка',
        orders_count: 'Замовлень',
        avg_check: 'Сер. чек',
        forecast: 'Прогноз (міс)',
        activity: 'Активність (Календар)',
        rental_duration: 'Тривалість оренди',
        minutes: 'Хвилини',
        hours: 'Години',
        days: 'Дні',
        expired: 'Закінчилось',
        active: 'Активно',
        time_left: 'Залишилось',
        top_products: 'Топ товарів за прибутком',
        currency_converter: 'Конвертер валют',
        warehouse: 'Склад товарів',
        product_name: 'Назва',
        unit: 'Од.',
        quantity: 'К-ть',
        price_per_unit: 'Ціна/од',
        total: 'Всього',
        actions: 'Дії',
        total_value: 'Загальна вартість',
        save: 'Зберегти',
        cancel: 'Скасувати',
        delete: 'Видалити',
        edit: 'Редагувати',
        new_order: 'Нове замовлення',
        new_expense: 'Нова витрата',
        new_product: 'Новий товар',
        order_title: 'Назва замовлення',
        expense_target: 'Опис витрати',
        amount: 'Сума',
        date: 'Дата',
        welcome: 'Ласкаво просимо до FP Tracker',
        welcome_text1: 'Зручний облік продажів.',
        welcome_text2: 'Ваші дані зберігаються лише у вашому браузері.',
        welcome_btn: 'Почати роботу',
        cat_gold: 'Ігрова валюта',
        cat_access: 'Акаунти',
        cat_boost: 'Бустінг',
        cat_service: 'Послуги',
        cat_rent: 'Оренда',
        cat_items: 'Предмети',
        cat_other: 'Інше',
        currency: 'Валюта',
        rates_title: 'Курси валют',
        update_rates_btn: 'Оновити курси валют',
        fill_amount: 'Заповніть поле суми!',
        enter_name: 'Введіть назву!',
        delete_confirm: 'Видалити?',
        quick_sell: 'Швидкий продаж зі складу:',
        preset_today: 'Сьогодні',
        preset_yesterday: 'Вчора',
        preset_7_days: '7 днів',
        preset_30_days: '30 днів',
        preset_all_time: 'Весь час',
        compare_prev: 'Порівняти: попер. період',
        compare_day: 'Порівняти: вчора',
        compare_week: 'Порівняти: минулий тиждень',
        compare_month: 'Порівняти: минулий місяць',
        revenue_dynamic: 'Динаміка виручки',
        category_shares: 'Частки категорій',
        note_placeholder: 'Напишіть нотатку...',
        save_note: 'Зберегти',
        previously: 'Раніше',
        days_short: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
        achievements: 'Досягнення',
        achievements_title: 'Мої Досягнення',
        ach_trader: 'Трейдер',
        ach_capital: 'Капітал',
        ach_inventory: 'Завгосп',
        ach_desc_trader: 'Виконати N замовлень',
        ach_desc_capital: 'Заробити N €',
        ach_desc_inventory: 'Мати N товарів на складі',
        ach_unlocked: 'Отримано',
        rank_novice: 'Новачок',
        rank_specialist: 'Спеціаліст',
        rank_expert: 'Експерт',
        rank_master: 'Майстер',
        rank_master: 'Майстер',
        rank_legend: 'Легенда',
        ach_stable_visit: 'Надійний',
        ach_weekly_sales: 'Активний трейдер',
        ach_monthly_growth: 'Зростаючий бізнес',
        ach_desc_stable_visit: 'Заходити в додаток N днів поспіль',
        ach_desc_weekly_sales: 'Продажі N тижнів поспіль',
        ach_desc_monthly_growth: 'Зростання виручки N місяців поспіль',
        ach_days_streak: 'днів',
        ach_weeks_streak: 'тижнів',
        ach_months_streak: 'міс.',
        support: 'Підтримка',
        faq_title: 'Часті запитання',
        q1: 'Де зберігаються мої дані?',
        a1: 'Усі ваші дані зберігаються локально у вашому браузері (LocalStorage). Ми не передаємо їх на сторонні сервери, якщо ви не використовуєте функцію синхронізації.',
        q2: 'Як працює синхронізація?',
        a2: 'Синхронізація дозволяє перенести ваші дані на інший пристрій за унікальним кодом. Будьте обережні: не передавайте цей код стороннім!',
        q3: 'Як змінити валюту?',
        a3: 'Ви можете вибрати основну валюту відображення у шапці сайту. Усі суми будуть автоматично перераховані за актуальним курсом.',
        q4: 'Чи безпечно це?',
        a4: 'Додаток працює як PWA (Progressive Web App) і є повністю автономним. Конфіденційність ваших фінансів — наш пріоритет.',
        support_contact: 'З питань та пропозицій звертайтеся до розробника.',
        created_by: 'Створено',
        new_tpl: 'Новий шаблон',
        tpl_name: 'Назва (на чіпі)',
        tpl_name_placeholder: 'Наприклад: Голда 1000',
        cat: 'Категорія',
        amount_currency: 'Сума та Валюта',
        rename_product: 'Перейменувати товар',
        new_name_label: 'Нова назва (об’єднає товари)',
        rename_warning: 'Увага: всі замовлення з поточною назвою будуть перейменовані.',
        ach_done: 'Виконано! +{} XP',
        orders_unit: 'Замовлень',
        completed: 'Завершено',
        max: 'МАКС',
        confirm: 'Підтвердження',
        attention: 'Увага',
        input_data: 'Введення даних',
        input_value: 'Введіть значення:',
        yes: 'Так',
        no: 'Ні',
        ok: 'OK',
        q5: 'Для чого призначений цей сайт?',
        a5: 'Це спеціалізований інструмент для трейдерів FunPay. Він допомагає вести облік продажів, відстежувати чистий прибуток, керувати складом товарів та аналізувати статистику за різні періоди.',
        support_ticket_title: 'Залишити заявку',
        ticket_subject_label: 'Тема звернення',
        ticket_message_label: 'Повідомлення',
        send_request_btn: 'Надіслати запит',
        request_sent_stub: 'Заявку прийнято! Очікуйте на відповідь найближчим часом.',
        support_contact: 'З питань та пропозицій звертайтеся до розробника.',
        our_socials: 'Наші соц-мережі',
        fab_add_order: 'Додати замовлення',
        fab_chat: 'Загальний чат',
        community_chat_title: 'Загальний чат',
        chat_rules_title: 'Правила чату',
        chat_rules_text: 'Заборонено: продаж товарів, спам, лайка.',
        chat_welcome_msg: 'Ласкаво просимо до чату трейдерів!',
        chat_placeholder: 'Напишіть повідомлення...',
        chat_user_name: 'Ви',
        theme_indigo: 'Індиго',
        theme_purple: 'Фіолетовий',
        theme_green: 'Зелений',
        theme_orange: 'Помаранчевий',
        theme_red: 'Червоний',
        theme_gold: 'Золотий',
        theme_matrix: 'Матриця',
        theme_japanese: 'Сакура',
        theme_cyberpunk: '2077',
        theme_vk: 'ВКонтакті',
        theme_ussr: 'СРСР',
        theme_discord: 'Discord',
        theme_telegram: 'Telegram',
        theme_hub: 'Hub',
        effects: 'Ефекти',
        backup_title: 'Резервне копіювання',
        currency_rates: 'Курси валют (1 EUR)',
        sync_by_code: 'Синхронізація по коду',
        reset_all: 'Скинути всі дані програми',
        err_required: 'Обов\'язкове поле',
        err_negative: 'Число має бути позитивним',
        err_max: 'Максимум: 100,000',
        piggy_bank: 'Копилка',
        add_piggy: 'Додати копилку',
        piggy_name: 'Назва / Ціль',
        piggy_percentage: 'Відсоток від продажів (%)',
        piggy_goal: 'Цільова сума',
        piggy_current: 'Накопичено',
        piggy_max_error: 'Максимум 10 копилок!',
        piggy_delete_confirm: 'Видалити копилку? Відрахування в замовленнях залишаться, але копилка зникне.',
        piggy_break_confirm: 'Розбити копилку молотком? Всі накопичені гроші ({} {}) будуть видалені та записані у витрати.',
        piggy_broken_title: 'Копилка розбита: {}',
        piggy_filled: 'Заповнено',
        transfer_funds: 'Переклад коштів',
        target_bank: 'Скарбничка-одержувач',
        confirm_transfer: 'Переказати',
        transfer_from: 'Переказ із: ',
        err_same_bank: 'Не можна переказати в ту саму скарбничку!',
        err_insufficient_funds: 'Недостатньо коштів!',
        select_placeholder: 'Оберіть...',
        profile: 'Профіль',
        nickname: 'Ім’я користувача',
        news_title: 'Новини та оновлення',
        next_rank: 'Наступний ранг',
        rank_status: 'Поточний статус',
        months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
    }
};

// --- State Management ---
let state = {
    orders: [],
    notes: [],
    templates: [],
    inventory: [],
    expenses: [],
    currency: 'EUR',
    themeColor: '#7289da',
    rates: { ...DEFAULT_RATES },
    goal: 0,
    goalCurrency: 'EUR',
    soundEnabled: true,
    winterEffectsEnabled: true,
    privacyMode: false,
    lastRateUpdate: null,
    notifications: true,
    purchased_themes: [],
    isFirstRun: true,
    language: 'ru',
    piggyBanks: [],
    nickname: 'Trader',
    visitStreak: 0,
    lastVisitDate: null
};

let uiState = {
    searchQuery: '',
    categoryFilter: 'all',
    statusFilter: 'all',
    sortBy: 'date_desc',
    dateRange: '7',
    dateStart: null,
    dateEnd: null,
    heatmapViewDate: new Date()
};

let deferredPrompt; // PWA Install Prompt

// --- Sound Engine ---
const SoundEngine = {
    ctx: null,
    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },
    play(type) {
        if (!state.soundEnabled || !this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'delete') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        }
    }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadState();

    // Force update rates if they're outdated or using old default values
    const shouldUpdateRates = () => {
        // If no last update time, definitely update
        if (!state.lastRateUpdate) return true;

        // If UAH is still at old default values (44.20 or 50.62), force update
        if (state.rates.UAH && (Math.abs(state.rates.UAH - 44.20) < 0.1 || Math.abs(state.rates.UAH - 50.62) < 0.1)) return true;

        // If rates haven't been updated in 24 hours, update
        const lastUpdate = new Date(state.lastRateUpdate);
        const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60);
        return hoursSinceUpdate > 24;
    };

    // Auto-update rates if needed
    if (shouldUpdateRates()) {
        console.log('Auto-updating currency rates...');
        updateRates();
    }

    // Migrations
    state.orders.forEach(o => { if (!o.category) o.category = 'other'; });
    if (!state.templates) state.templates = [];
    if (!state.inventory) state.inventory = []; // Inventory Init
    if (state.soundEnabled === undefined) state.soundEnabled = true;

    // Achievement Migration: Clean up invalid achievement keys
    if (state.achievements) {
        const validAchievementIds = ['ach_trader', 'ach_capital'];
        const cleanedAchievements = {};

        Object.keys(state.achievements).forEach(key => {
            // Check if the key is valid: matches ach_trader_<number> or ach_capital_<number>
            const isValid = validAchievementIds.some(achId => {
                if (key.startsWith(achId + '_')) {
                    const suffix = key.split('_').pop();
                    return !isNaN(parseInt(suffix));
                }
                return false;
            });

            if (isValid) {
                cleanedAchievements[key] = state.achievements[key];
            }
        });

        state.achievements = cleanedAchievements;
        saveState(); // Save the cleaned data immediately
    }

    // Visit Streak Logic
    const today = new Date().toISOString().split('T')[0];
    if (state.lastVisitDate !== today) {
        if (state.lastVisitDate) {
            const lastDate = new Date(state.lastVisitDate);
            const diffTime = Math.abs(new Date(today) - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                state.visitStreak = (state.visitStreak || 0) + 1;
            } else {
                state.visitStreak = 1;
            }
        } else {
            state.visitStreak = 1;
        }
        state.lastVisitDate = today;
        saveState();
    }

    // PWA Install Handler
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const container = document.getElementById('installContainer');
        if (container) container.classList.remove('hidden');
    });

    // PWA Install Click
    const installBtn = document.getElementById('installAppBtn');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                document.getElementById('installContainer').classList.add('hidden');
            }
        });
    }

    initEventListeners();
    setDefaultDates();
    initUI();
    initCalculator();

    applyTheme(state.themeColor);

    if (state.isFirstRun) {
        document.getElementById('welcomeScreen').classList.remove('hidden');
    } else {
        document.getElementById('welcomeScreen').classList.add('hidden');
        updateRates();
    }

    updateAppLanguage();
    initFAQ();
    initSupportForm();
    renderApp();
});

function initSupportForm() {
    const form = document.getElementById('supportForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = document.getElementById('ticketSubject').value;
            const message = document.getElementById('ticketMessage').value;

            if (!subject || !message) {
                showAlert(getTranslation('input_data'));
                return;
            }

            // Stub: simulate sending
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = '...';

            setTimeout(() => {
                showAlert(getTranslation('request_sent_stub'));
                form.reset();
                btn.disabled = false;
                btn.textContent = originalText;
            }, 1000);
        });
    }
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        state = JSON.parse(raw);
        if (!state.rates) state.rates = { ...DEFAULT_RATES };
        if (!state.orders) state.orders = [];
        if (!state.actionHistory) state.actionHistory = [];
        if (state.goal === undefined) state.goal = 0;
        if (!state.goalCurrency) state.goalCurrency = 'EUR';
        if (!state.themeColor) state.themeColor = '#7289da';
        if (!state.currency) state.currency = 'EUR';
        if (!state.notes) state.notes = [];
        if (!state.templates) state.templates = [];
        if (!state.inventory) state.inventory = [];
        if (!state.expenses) state.expenses = [];
        if (state.soundEnabled === undefined) state.soundEnabled = true;
        if (state.winterEffectsEnabled === undefined) state.winterEffectsEnabled = true;
        if (state.notifications === undefined) state.notifications = true; // New default
        if (!state.purchased_themes) state.purchased_themes = []; // New default
        if (!state.language) state.language = 'ru';
        if (!state.piggyBanks) state.piggyBanks = [];

        // FORCE UPDATE: If rates have old UAH values (44.20 or 50.62), replace with new defaults
        if (state.rates.UAH && (Math.abs(state.rates.UAH - 44.20) < 0.5 || Math.abs(state.rates.UAH - 50.62) < 0.5)) {
            console.log('Detected old currency rates, updating to current values...');
            state.rates = { ...DEFAULT_RATES };
            state.lastRateUpdate = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    } else {
        saveState();
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderApp();
}

async function updateRates() {
    if (!navigator.onLine) {
        console.log('Offline, skipping rate update');
        return;
    }
    try {
        console.log('Fetching currency rates from API...');
        const response = await fetch(RATES_API);
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        if (data && data.rates) {
            state.rates.EUR = 1;
            if (data.rates.USD) state.rates.USD = data.rates.USD;
            if (data.rates.UAH) state.rates.UAH = data.rates.UAH;
            if (data.rates.RUB) state.rates.RUB = data.rates.RUB;
            state.lastRateUpdate = new Date().toISOString();
            console.log('Currency rates updated:', state.rates);
            saveState();
            renderApp(); // Force UI refresh
        }
    } catch (e) {
        console.warn('Rates update failed:', e);
    }
}

function convert(amount, from, to) {
    if (!amount || isNaN(amount)) return 0;
    if (from === to) return amount;
    if (!state.rates || !state.rates[from] || !state.rates[to]) return amount;
    const amountInEur = amount / state.rates[from];
    return amountInEur * state.rates[to];
}

function formatMoney(amount, currency) {
    const symbols = { EUR: '€', USD: '$', UAH: '₴', RUB: '₽' };
    const locale = state.language === 'en' ? 'en-US' : (state.language === 'uk' ? 'uk-UA' : 'ru-RU');
    return amount.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ' ' + (symbols[currency] || currency);
}

// --- Localization Engine ---
function getTranslation(key) {
    const lang = state.language || 'ru';
    return TRANSLATIONS[lang][key] || TRANSLATIONS['ru'][key] || key;
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    state.language = lang;
    saveState();
    // Use location.reload() to ensure 100% correct update of all dynamic components
    // Use location.reload() or re-init custom selects
    window.initCustomSelects && window.initCustomSelects();
    setTimeout(() => location.reload(), 100);
}

function updateAppLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'number')) {
            el.placeholder = translation;
        } else if (el.tagName === 'TEXTAREA') {
            el.placeholder = translation;
        } else {
            // Keep icons if any
            const icon = el.querySelector('i');
            if (icon) {
                // Find and replace ONLY the text node, preserving the icon
                let textFound = false;
                Array.from(el.childNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                        node.textContent = ' ' + translation;
                        textFound = true;
                    }
                });
                if (!textFound) el.appendChild(document.createTextNode(' ' + translation));
            } else {
                const translation = getTranslation(key);
                // Check if translation contains HTML (like icons)
                if (translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        }
    });

    // Update language select value
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) langSelect.value = state.language;

    // Update category stickers in dropdowns
    updateCategorySelects();
}

function updateCategorySelects() {
    const selects = ['filterCategory', 'orderCategory', 'tplCategory', 'sortOrders'];
    const icons = {
        all: '<i class="fa-solid fa-folder"></i>',
        access: '<i class="fa-solid fa-user-lock"></i>',
        gold: '<i class="fa-solid fa-coins"></i>',
        boost: '<i class="fa-solid fa-rocket"></i>',
        service: '<i class="fa-solid fa-bell-concierge"></i>',
        rent: '<i class="fa-solid fa-key"></i>',
        items: '<i class="fa-solid fa-box-open"></i>',
        other: '<i class="fa-solid fa-ellipsis"></i>'
    };

    selects.forEach(id => {
        const select = document.getElementById(id);
        if (!select) return;
        Array.from(select.options).forEach(opt => {
            if (opt.value === 'all') {
                opt.innerHTML = `${icons.all} ${getTranslation('all_categories')}`;
            } else if (CATEGORIES[opt.value]) {
                const iconTag = icons[opt.value] || '<i class="fa-solid fa-file"></i>';
                opt.innerHTML = `${iconTag} ${getTranslation(CATEGORIES[opt.value].key)}`;
            } else {
                // For other selects like sortOrders that use data-i18n on options
                const key = opt.getAttribute('data-i18n');
                if (key) {
                    opt.innerHTML = getTranslation(key);
                }
            }
        });
    });

    // Update status select
    const statusSelect = document.getElementById('filterStatus');
    if (statusSelect) {
        const statusIcons = {
            all: '<i class="fa-solid fa-list-check"></i>',
            waiting: '<i class="fa-solid fa-clock"></i>',
            paid: '<i class="fa-solid fa-check-double"></i>',
            active: '<i class="fa-solid fa-circle-play"></i>',
            expired: '<i class="fa-solid fa-circle-exclamation"></i>'
        };
        Array.from(statusSelect.options).forEach(opt => {
            const key = opt.value === 'all' ? 'all_statuses' : opt.value;
            const iconTag = statusIcons[opt.value] || '<i class="fa-solid fa-question"></i>';
            opt.innerHTML = `${iconTag} ${getTranslation(key)}`;
        });
    }
}

function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        q.addEventListener('click', () => {
            q.parentElement.classList.toggle('active');
        });
    });
}

// --- Inventory Functions ---
function renderInventory() {
    const list = document.getElementById('inventoryList');
    if (!list) return;
    list.innerHTML = '';

    if (!state.inventory || state.inventory.length === 0) {
        list.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px; color: var(--text-muted);">${getTranslation('warehouse')} ${getTranslation('never').toLowerCase()}</td></tr>`;
        const totalValueEl = document.getElementById('inventoryTotal');
        if (totalValueEl) totalValueEl.textContent = `${getTranslation('total_value')}: 0 ${state.currency}`;
        return;
    }

    let totalValue = 0;

    state.inventory.forEach(item => {
        const itemTotal = item.qty * item.price;
        totalValue += itemTotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="${getTranslation('product_name')}">${item.name}<br><span style="font-size: 11px; color: var(--text-muted);">${item.date || ''} ${item.time || ''}</span></td>
            <td data-label="${getTranslation('unit')}" style="color:var(--text-muted); font-size:12px;">${item.unit || 'шт'}</td>
            <td data-label="${getTranslation('quantity')}">
                <div class="qty-control">
                    <button class="qty-btn minus"><i class="fa-solid fa-minus"></i></button>
                    <span>${item.qty}</span>
                    <button class="qty-btn plus"><i class="fa-solid fa-plus"></i></button>
                </div>
            </td>
            <td data-label="${getTranslation('price_per_unit')}">${formatMoney(item.price, state.currency)}</td> 
            <td data-label="${getTranslation('total')}">${formatMoney(itemTotal, state.currency)}</td>
            <td data-label="${getTranslation('actions')}">
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <i class="fa-solid fa-pen action-btn edit" style="color: var(--primary-color);"></i>
                    <i class="fa-solid fa-trash action-btn delete" style="color: var(--danger-color);"></i>
                </div>
            </td>
        `;

        tr.querySelector('.plus').onclick = () => updateInventoryQty(item.id, 1);
        tr.querySelector('.minus').onclick = () => updateInventoryQty(item.id, -1);
        tr.querySelector('.edit').onclick = () => openInventoryModal(item.id);
        tr.querySelector('.delete').onclick = () => {
            showConfirm(getTranslation('delete_confirm'), () => {
                state.inventory = state.inventory.filter(i => i.id !== item.id);
                saveState();
                renderInventory();
                renderStockWidgets();
                SoundEngine.play('delete');
            });
        };

        list.appendChild(tr);
    });

    const totalEl = document.getElementById('inventoryTotal');
    if (totalEl) totalEl.textContent = `${getTranslation('total_value')}: ${formatMoney(totalValue, state.currency)}`;
}

function openInventoryModal(id = null) {
    const isEdit = id !== null;
    document.getElementById('invModalTitle').textContent = isEdit ? getTranslation('edit') : getTranslation('add_product');
    document.getElementById('invEditId').value = id || '';

    if (isEdit) {
        const item = state.inventory.find(i => i.id === id);
        if (item) {
            document.getElementById('invName').value = item.name;
            document.getElementById('invUnit').value = item.unit || 'шт';
            document.getElementById('invPrice').value = item.price;
            document.getElementById('invQty').value = item.qty;
        }
    } else {
        document.getElementById('invName').value = '';
        document.getElementById('invUnit').value = 'шт';
        document.getElementById('invPrice').value = 0;
        document.getElementById('invQty').value = 0;
    }
    openModal('inventoryModal');
}

function saveInventory() {
    const id = document.getElementById('invEditId').value;
    const name = document.getElementById('invName').value;
    const unit = document.getElementById('invUnit').value;
    const price = parseFloat(document.getElementById('invPrice').value);
    const qty = parseFloat(document.getElementById('invQty').value);
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    let isValid = true;
    if (!validateField('invName', { required: true })) isValid = false;
    if (!validateField('invPrice', { required: true, number: true, positive: true, max: 100000 })) isValid = false;
    if (!validateField('invQty', { required: true, number: true, positive: true, max: 100000 })) isValid = false;

    if (!isValid) return;

    if (id) {
        // Edit
        const idx = state.inventory.findIndex(i => i.id == id);
        if (idx !== -1) {
            state.inventory[idx] = { ...state.inventory[idx], name, unit, price, qty, date, time };
        }
    } else {
        // Add
        state.inventory.push({ id: Date.now(), name, unit, price, qty, date, time });
    }

    saveState();
    closeModal('inventoryModal');
    renderInventory();
    renderStockWidgets();
    checkAchievements(state);
}

function updateInventoryQty(id, delta) {
    const item = state.inventory.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty < 0) item.qty = 0;
        saveState();
        renderInventory();
        renderStockWidgets();
    }
}

function renderStockWidgets() {
    const container = document.getElementById('stockQuickActions');
    if (!container) return;
    container.innerHTML = '';

    if (!state.inventory) state.inventory = [];
    state.inventory.forEach(item => {
        if (item.qty <= 0) return;

        const btn = document.createElement('button');
        btn.className = 'template-chip';
        btn.style.borderColor = 'var(--primary-color)';
        btn.style.color = 'white';
        btn.innerHTML = `<i class="fa-solid fa-box-open"></i> ${item.name} (${item.qty})`;

        btn.onclick = () => {
            showPrompt(`${getTranslation('cat_gold')} "${item.name}" (${item.price} ${state.currency})\n${getTranslation('quantity')}?`, '1', (sellQtyStr) => {
                if (!sellQtyStr) return;
                const sellQty = parseFloat(sellQtyStr);
                if (isNaN(sellQty) || sellQty <= 0) return;
                if (sellQty > item.qty) return showAlert(getTranslation('fill_amount'));

                const total = sellQty * item.price;
                state.orders.unshift({
                    id: Date.now(),
                    title: `${getTranslation('cat_gold')}: ${item.name} (${sellQty} ${item.unit})`,
                    amount: total,
                    currency: state.currency,
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                    category: 'gold'
                });

                item.qty -= sellQty;
                playSuccessSound();
                saveState();
                renderInventory();
                renderStockWidgets();
                renderOrders();
                updateBalance();
            });
        };

        container.appendChild(btn);
    });
}

// --- UI Functions ---
function switchTab(tabId) {
    SoundEngine.init();
    SoundEngine.play('click');
    const contents = document.querySelectorAll('.tab-content');
    const links = document.querySelectorAll('.nav-links li');

    contents.forEach(el => {
        el.classList.remove('show');
        setTimeout(() => {
            if (!el.classList.contains('show')) el.classList.remove('active');
        }, 300);
    });

    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');
    setTimeout(() => {
        activeTab.classList.add('show');
    }, 50);

    links.forEach(el => {
        el.classList.toggle('active', el.dataset.tab === tabId);
    });

    // Update Header Title
    const titleMap = {
        'profile': 'profile',
        'balance': 'balance',
        'purchases': 'purchases',
        'stats': 'stats',
        'calculator': 'calculator',
        'notes': 'notes',
        'inventory': 'inventory',
        'achievements': 'achievements_title',
        'history': 'action_history_title'
    };
    const titleEl = document.getElementById('pageTitle');
    if (titleEl && titleMap[tabId]) {
        titleEl.setAttribute('data-i18n', titleMap[tabId]);
        titleEl.textContent = getTranslation(titleMap[tabId]);
    }

    if (tabId === 'profile') {
        renderProfile();
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return console.error(`Modal ${modalId} not found`);
    try {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('open'), 10);
    } catch (e) {
        console.error('Error opening modal:', e);
    }

    if (tabId === 'stats') {
        renderHeatmap();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        setTimeout(() => {
            modal.style.display = 'none';
            clearValidationErrors(modal);
        }, 400); // Wait for 0.4s CSS transition
    }
}

function validateField(id, rules = {}) {
    const el = document.getElementById(id);
    if (!el) return true;

    const val = el.value.trim();
    let isValid = true;
    let errorKey = '';

    if (rules.required && !val) {
        isValid = false;
        errorKey = 'err_required';
    } else if (rules.number) {
        const num = parseFloat(val);
        if (isNaN(num)) {
            isValid = false;
            errorKey = 'err_required';
        } else if (rules.positive && num < 0) {
            isValid = false;
            errorKey = 'err_negative';
        } else if (rules.max !== undefined && num > rules.max) {
            isValid = false;
            errorKey = 'err_max';
        }
    }

    const container = el.closest('.form-group') || el.parentElement;
    let msgEl = container.querySelector('.error-message');

    if (!isValid) {
        el.classList.add('is-invalid');
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.className = 'error-message';
            // Insert after the element or its parent row
            const target = el.closest('.amount-row') || el;
            target.after(msgEl);
        }
        msgEl.textContent = getTranslation(errorKey);
        msgEl.style.display = 'block';
    } else {
        el.classList.remove('is-invalid');
        if (msgEl) msgEl.style.display = 'none';
    }

    return isValid;
}

function clearValidationErrors(modal) {
    const inputs = modal.querySelectorAll('.is-invalid');
    inputs.forEach(input => input.classList.remove('is-invalid'));
    const msgs = modal.querySelectorAll('.error-message');
    msgs.forEach(msg => msg.style.display = 'none');
}

function applyTheme(color) {
    const isGradient = color.includes('gradient');
    const isLight = false;

    // Set fallback or primary color for dynamic elements (if needed in JS)
    let primaryColor = color;
    if (isGradient) primaryColor = '#bf953f';

    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--accent-color', isGradient ? color : color);
    root.style.setProperty('--theme-gradient', isGradient ? color : 'none');

    // Trigger theme-specific special effects
    if (isLight) {
        stopMatrixEffect();
        stopSakuraEffect();
        stopCyberpunkEffect();
    }

    if (color === 'matrix') {
        startMatrixEffect();
        stopSakuraEffect();
    } else if (color === 'japanese') {
        stopMatrixEffect();
        stopCyberpunkEffect();
        startSakuraEffect();
    } else if (color === 'cyberpunk') {
        stopMatrixEffect();
        stopSakuraEffect();
        startCyberpunkEffect();
    } else if (color === 'vk') {
        stopMatrixEffect();
        stopSakuraEffect();
        stopCyberpunkEffect();
    } else if (color === 'gold-gradient') {
        stopMatrixEffect();
        stopSakuraEffect();
        stopCyberpunkEffect();
        startGoldEffect();
    } else {
        stopMatrixEffect();
        stopSakuraEffect();
        stopCyberpunkEffect();
        stopGoldEffect();
    }

    state.themeColor = color;
    document.body.classList.toggle('light-theme', isLight || color === 'vk');
    document.body.classList.toggle('matrix-theme', color === 'matrix');
    document.body.classList.toggle('japanese-theme', color === 'japanese');
    document.body.classList.toggle('cyberpunk-theme', color === 'cyberpunk');
    document.body.classList.toggle('vk-theme', color === 'vk');
    document.body.classList.toggle('discord-theme', color === 'discord');
    document.body.classList.toggle('telegram-theme', color === 'telegram');
    document.body.classList.toggle('hub-theme', color === 'hub');
    document.body.classList.toggle('gold-gradient-theme', color === 'gold-gradient');

    // Force chart re-draw to pick up theme colors
    renderStats();
}

function showPremiumModal(color) {
    openModal('premiumModal');
    const buyBtn = document.getElementById('buyGoldBtn');
    if (buyBtn) {
        buyBtn.onclick = () => {
            unlockPremiumTheme(color);
            closeModal('premiumModal');
        };
    }
}

function unlockPremiumTheme(color) {
    if (!state.purchased_themes.includes(color)) {
        state.purchased_themes.push(color);
        saveState();
        applyTheme(color);
        showAlert(getTranslation('theme_gold') + ' разблокирована!');
        SoundEngine.play('success');
    }
}

// --- Core Logic ---
function renderApp() {
    renderBalance();
    renderOrders();
    renderStats();
    renderNotes();
    renderTemplates();
    renderInventory();
    renderStockWidgets();
    renderExpenses();
    renderConverter();
    renderAchievements();
    renderActionHistory();
    renderPiggyBanks();
}

function calculatePiggyDeductions(amount, currency, category) {
    const deductions = {};

    // First, we need to know how much each bank ALREADY HAS to handle overflow
    const currentBankAmounts = {};
    state.piggyBanks.forEach(bank => {
        let current = 0;
        state.orders.forEach(order => {
            if (order.status === 'paid' && order.piggyDeductions && order.piggyDeductions[bank.id]) {
                const d = order.piggyDeductions[bank.id];
                current += convert(d.amount, d.currency, bank.currency);
            }
        });
        currentBankAmounts[bank.id] = current;
    });

    state.piggyBanks.forEach(bank => {
        let percentage = 0;
        const hasCategoryRates = bank.categoryPercentages && Object.keys(bank.categoryPercentages).length > 0;

        if (hasCategoryRates) {
            percentage = bank.categoryPercentages[category] || 0;
        } else {
            percentage = bank.percentage || 0;
        }

        let deductedAmount = (amount * percentage) / 100;

        // Overflow Logic
        if (bank.goal > 0) {
            const currentInBank = currentBankAmounts[bank.id] || 0;
            const remainingToGoalInBankCurrency = Math.max(0, bank.goal - currentInBank);

            // Convert current deduction to bank currency to compare with remaining
            const deductedInBankCurrency = convert(deductedAmount, currency, bank.currency);

            if (deductedInBankCurrency > remainingToGoalInBankCurrency) {
                // Cap it! Convert the EXACT remaining amount back to order currency
                deductedAmount = convert(remainingToGoalInBankCurrency, bank.currency, currency);
            }
        }

        if (deductedAmount > 0) {
            deductions[bank.id] = {
                amount: deductedAmount,
                currency: currency
            };
        }
    });
    return deductions;
}

function updateBalance() {
    renderBalance();
}

function saveOrderForm() {
    const editId = document.getElementById('orderEditId').value;
    const title = document.getElementById('orderTitle').value;
    const amount = parseFloat(document.getElementById('orderAmount').value);
    const currency = document.getElementById('orderCurrency').value;
    const category = document.getElementById('orderCategory').value;
    const now = new Date();
    const localDate = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    const localTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    const date = document.getElementById('orderDate').value || localDate;
    const time = document.getElementById('orderTime').value || localTime;
    const orderNumber = document.getElementById('orderNumber').value.trim();

    let isValid = true;
    if (!validateField('orderTitle', { required: true })) isValid = false;
    if (!validateField('orderAmount', { required: true, number: true, positive: true, max: 100000 })) isValid = false;
    if (!validateField('orderNumber', { required: true })) isValid = false;

    if (!isValid) return;

    let rentalExpiry = null;
    if (category === 'rent') {
        const duration = parseFloat(document.getElementById('rentalDuration').value) || 0;
        const unit = document.getElementById('rentalUnit').value;
        if (duration > 0) {
            const start = new Date(`${date}T${time}`);
            if (isNaN(start.getTime())) {
                // Fallback to current time if manual entry invalid
                let msToAdd = 0;
                if (unit === 'months') msToAdd = duration * 30.44 * 24 * 60 * 60 * 1000;
                else if (unit === 'days') msToAdd = duration * 24 * 60 * 60 * 1000;
                else if (unit === 'hours') msToAdd = duration * 60 * 60 * 1000;
                else msToAdd = duration * 60 * 1000;
                rentalExpiry = Date.now() + msToAdd;
            } else {
                let msToAdd = 0;
                if (unit === 'months') msToAdd = duration * 30.44 * 24 * 60 * 60 * 1000;
                else if (unit === 'days') msToAdd = duration * 24 * 60 * 60 * 1000;
                else if (unit === 'hours') msToAdd = duration * 60 * 60 * 1000;
                else msToAdd = duration * 60 * 1000;
                rentalExpiry = start.getTime() + msToAdd;
            }
        }
    }

    if (editId) {
        // Edit existing
        const idx = state.orders.findIndex(o => o.id == editId);
        if (idx !== -1) {
            state.orders[idx] = {
                ...state.orders[idx],
                title,
                amount,
                currency,
                category,
                date,
                time,
                orderNumber,
                rentalExpiry,
                rentalDuration: parseFloat(document.getElementById('rentalDuration').value) || 0,
                rentalUnit: document.getElementById('rentalUnit').value,
                piggyDeductions: calculatePiggyDeductions(amount, currency, category)
            };
            const orderNum = orderNumber ? `<span class="history-number-badge">${orderNumber}</span>` : '';
            addActionLog('edit', title, orderNum);
        }
    } else {
        // Create new
        state.orders.unshift({
            id: Date.now(),
            title,
            amount,
            currency,
            category,
            date,
            time,
            orderNumber,
            status: 'waiting',
            rentalExpiry,
            rentalDuration: parseFloat(document.getElementById('rentalDuration').value) || 0,
            rentalUnit: document.getElementById('rentalUnit').value,
            piggyDeductions: calculatePiggyDeductions(amount, currency, category)
        });
        const orderNum = orderNumber ? `<span class="history-number-badge">${orderNumber}</span>` : '';
        addActionLog('add', title, orderNum);
    }

    saveState();
    renderApp();
    closeModal('orderModal');
    const fab = document.querySelector('.fab-container');
    if (fab) fab.classList.remove('open');
    SoundEngine.play('success');
}

function deleteOrder(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;
    showConfirm(getTranslation('delete_confirm'), () => {
        const orderNum = order.orderNumber ? `<span class="history-number-badge">${order.orderNumber}</span>` : '';
        addActionLog('delete', order.title, orderNum);
        state.orders = state.orders.filter(o => o.id !== id);
        saveState();
        renderOrders();
        updateBalance();
        SoundEngine.play('delete');
    });
}

function addActionLog(type, title, details) {
    if (!state.actionHistory) state.actionHistory = [];
    const entry = {
        id: Date.now(),
        type,
        title,
        details,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
    };
    state.actionHistory.unshift(entry);
    if (state.actionHistory.length > 100) state.actionHistory.pop();
    saveState();
}

function renderActionHistory() {
    const list = document.getElementById('historyList');
    if (!list) return;
    list.innerHTML = '';

    if (!state.actionHistory || state.actionHistory.length === 0) {
        list.innerHTML = `<p style="text-align:center; padding:20px; color:var(--text-muted); opacity: 0.5;">${getTranslation('never')}</p>`;
        return;
    }

    const icons = {
        add: 'fa-plus',
        edit: 'fa-pen',
        delete: 'fa-trash',
        status: 'fa-check-circle',
        clear: 'fa-broom'
    };

    state.actionHistory.forEach(entry => {
        const item = document.createElement('div');
        item.className = `history-item history-${entry.type || 'status'}`;

        const icon = icons[entry.type] || 'fa-info-circle';
        const label = getTranslation(`action_${entry.type}`) || entry.type;

        item.innerHTML = `
            <div class="history-icon-wrapper">
                <i class="fa-solid ${icon}"></i>
            </div>
            <div class="history-item-main">
                <div class="history-item-top">
                    <span class="history-action-label">${label}</span>
                    <span class="history-time">${entry.date} ${entry.time}</span>
                </div>
                <div class="history-item-content">
                    <span class="history-item-title">${entry.title}</span> 
                    <span class="history-item-details">${entry.details}</span>
                </div>
            </div>
        `;
        list.appendChild(item);
    });
}

// Redundant renderOrders and renderStats removed. Strong versions are at line 840+.

function renderNotes() {
    const list = document.getElementById('notesList');
    if (!list) return;
    list.innerHTML = '';
    (state.notes || []).forEach(note => {
        const el = document.createElement('div');
        el.className = 'note-card';
        if (note.backgroundColor) {
            el.style.backgroundColor = note.backgroundColor;
            el.style.backgroundImage = 'none'; // Remove any theme gradients
        }

        const presets = ['#f1fa8c', '#ff79c6', '#8be9fd', '#50fa7b', '#bd93f9'];
        const flyoutHtml = presets.map(c => `
            <div class="color-option" style="background:${c}" onclick="changeNoteColor(${note.id}, '${c}')"></div>
        `).join('');

        el.innerHTML = `
            <p class="note-text">${note.text}</p>
            <div class="note-actions">
                <i class="fa-solid fa-palette note-btn" onclick="toggleNoteColorFlyout(event, ${note.id})" title="Изменить цвет"></i>
                <i class="fa-solid fa-pen note-btn" onclick="openEditNoteModal(${note.id})"></i>
                <i class="fa-solid fa-trash note-btn delete" onclick="deleteNote(${note.id})"></i>
            </div>
            <div class="note-color-flyout" id="flyout_${note.id}">
                ${flyoutHtml}
                <div class="color-option" style="background:#eee; display:flex; align-items:center; justify-content:center; font-size:10px; color:#666;" onclick="changeNoteColor(${note.id}, null)" title="Сбросить цвет">✕</div>
            </div>
        `;
        // DnD Attributes
        el.setAttribute('draggable', 'true');
        el.dataset.id = note.id;
        el.addEventListener('dragstart', handleDragStart);
        el.addEventListener('dragenter', handleDragEnter);
        el.addEventListener('dragover', handleDragOver);
        el.addEventListener('dragleave', handleDragLeave);
        el.addEventListener('drop', handleDrop);
        el.addEventListener('dragend', handleDragEnd);

        list.appendChild(el);
    });
}

function toggleNoteColorFlyout(event, id) {
    event.stopPropagation();
    const allFlyouts = document.querySelectorAll('.note-color-flyout');
    const currentFlyout = document.getElementById(`flyout_${id}`);

    // Close others
    allFlyouts.forEach(f => {
        if (f !== currentFlyout) f.classList.remove('active');
    });

    if (currentFlyout) currentFlyout.classList.toggle('active');

    // Close flyout on outside click
    const closeHandler = () => {
        if (currentFlyout) currentFlyout.classList.remove('active');
        document.removeEventListener('click', closeHandler);
    };
    if (currentFlyout.classList.contains('active')) {
        setTimeout(() => document.addEventListener('click', closeHandler), 10);
    }
}

function changeNoteColor(id, color) {
    const note = state.notes.find(n => n.id === id);
    if (note) {
        note.backgroundColor = color;
        saveState();
        renderNotes();
    }
}

function addNote() {
    const input = document.getElementById('noteInput');
    const text = input.value.trim();
    if (!text) return;

    if (text.length > 150) {
        showAlert('Слишком длинная заметка! Максимум 150 символов.');
        return;
    }

    if (!state.notes) state.notes = [];
    state.notes.unshift({ id: Date.now(), text: text, backgroundColor: null });
    input.value = '';
    saveState();
    renderNotes();
}

function deleteNote(id) {
    showConfirm(getTranslation('delete_confirm'), () => {
        state.notes = state.notes.filter(n => n.id !== id);
        saveState();
        renderNotes();
        SoundEngine.play('delete');
    });
}

function openEditNoteModal(id) {
    const note = state.notes.find(n => n.id === id);
    if (note) {
        document.getElementById('editNoteId').value = id;
        document.getElementById('editNoteText').value = note.text;
        openModal('noteModal');
    }
}

function saveNote() {
    const id = parseInt(document.getElementById('editNoteId').value);
    const text = document.getElementById('editNoteText').value.trim();

    if (!validateField('editNoteText', { required: true })) return;

    if (text.length > 150) {
        showAlert('Слишком длинная заметка! Максимум 150 символов.');
        return;
    }

    if (id) {
        const note = state.notes.find(n => n.id === id);
        if (note) note.text = text;
    } else {
        state.notes.unshift({ id: Date.now(), text });
    }

    saveState();
    renderNotes();
    closeModal('noteModal');
    const fab = document.querySelector('.fab-container');
    if (fab) fab.classList.remove('open');
    SoundEngine.play('success');
}

function renderTemplates() {
    const list = document.getElementById('quickTemplates');
    if (!list) return;

    const addBtn = list.querySelector('.add-tpl');
    list.innerHTML = '';
    if (addBtn) list.appendChild(addBtn);

    (state.templates || []).forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'template-chip';
        const editLabel = getTranslation('edit');
        btn.innerHTML = `
            <i class="fa-solid fa-bookmark"></i> ${t.name} (${t.amount})
            <span class="template-edit-btn" title="${editLabel}"><i class="fa-solid fa-pen"></i></span>
        `;

        btn.onclick = (e) => {
            // If we clicked the edit button, open edit modal
            if (e.target.closest('.template-edit-btn')) {
                openTemplateModal(t.id);
                return;
            }

            // Otherwise, normal order behavior
            document.getElementById('orderTitle').value = t.name;
            document.getElementById('orderAmount').value = t.amount;
            document.getElementById('orderCurrency').value = t.currency;
            document.getElementById('orderCategory').value = t.category;
            openModal('orderModal');
        };

        // Right click to delete
        btn.oncontextmenu = (e) => {
            e.preventDefault();
            showConfirm(`${getTranslation('delete_confirm')} "${t.name}"?`, () => {
                state.templates = state.templates.filter(x => x.id !== t.id);
                saveState();
                renderTemplates();
                SoundEngine.play('delete');
            });
        };

        list.appendChild(btn);
    });
}

function openTemplateModal(id = null) {
    const isEdit = id !== null;
    const modalTitle = document.getElementById('tplModalTitle');
    const editIdInput = document.getElementById('tplEditId');
    const saveBtn = document.getElementById('saveTemplateBtn');

    if (modalTitle) modalTitle.textContent = isEdit ? getTranslation('edit') : getTranslation('new_order'); // reuse new_order or add new_template
    if (editIdInput) editIdInput.value = id || '';
    if (saveBtn) saveBtn.textContent = isEdit ? getTranslation('save') : getTranslation('add_order');

    if (isEdit) {
        const t = state.templates.find(x => x.id === id);
        if (t) {
            document.getElementById('tplTitle').value = t.name;
            document.getElementById('tplCategory').value = t.category;
            document.getElementById('tplAmount').value = t.amount;
            document.getElementById('tplCurrency').value = t.currency;
        }
    } else {
        document.getElementById('tplTitle').value = '';
        document.getElementById('tplCategory').value = 'gold';
        document.getElementById('tplAmount').value = '';
        document.getElementById('tplCurrency').value = state.currency || 'EUR';
    }
    openModal('templateModal');
}
function renderExpenses() { /* ... implemented in updateBalance or similar ... */ }

function renderSettings() {
    try {
        // Ensure language select matches state
        const langSelect = document.getElementById('languageSelect');
        if (langSelect) langSelect.value = state.language;

        const goalInput = document.getElementById('settingsGoal');
        if (goalInput) goalInput.value = state.goal || 0;
        const goalCurrencySelect = document.getElementById('settingsGoalCurrency');
        if (goalCurrencySelect) goalCurrencySelect.value = state.goalCurrency || 'EUR';
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) soundToggle.checked = !!state.soundEnabled;
        const effectsToggle = document.getElementById('effectsToggle');
        if (effectsToggle) effectsToggle.checked = !!state.winterEffectsEnabled;

        renderSettingsRates();
        initSettingsTabs();
        initThemePreviews();
        updateAppLanguage();
    } catch (e) {
        console.error('Render settings error:', e);
    }
}

function renderSettingsRates() {
    const ratesDiv = document.getElementById('settingsRates');
    if (ratesDiv && state.rates) {
        const formatDate = (isoString) => {
            if (!isoString) return getTranslation('never');
            const date = new Date(isoString);
            return date.toLocaleString(state.language === 'en' ? 'en-US' : (state.language === 'uk' ? 'uk-UA' : 'ru-RU'), {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        ratesDiv.innerHTML = `
            <div class="rate-item">
                <span class="rate-from">1 EUR =</span>
                <span class="rate-to">${(state.rates.USD || 0).toFixed(2)} $</span>
            </div>
            <div class="rate-item">
                <span class="rate-from">1 EUR =</span>
                <span class="rate-to" style="color: #ff79c6;">${(state.rates.RUB || 0).toFixed(2)} ₽</span>
            </div>
            <div class="rate-item">
                <span class="rate-from">1 EUR =</span>
                <span class="rate-to" style="color: #8be9fd;">${(state.rates.UAH || 0).toFixed(2)} ₴</span>
            </div>
            <div class="rate-item">
                <span class="rate-from">1 EUR =</span>
                <span class="rate-to" style="color: #f1fa8c;">1.00 €</span>
            </div>
            <div style="grid-column: 1 / -1; font-size:10px; opacity:0.5; text-align: center; margin-top: 5px;">
                ${getTranslation('updated')}: ${formatDate(state.lastRateUpdate)}
            </div>
        `;
    }
}

function initSettingsTabs() {
    const navItems = document.querySelectorAll('.settings-nav-item');
    const tabPanes = document.querySelectorAll('.settings-tab-pane');

    navItems.forEach(item => {
        item.onclick = () => {
            const tabId = item.dataset.settingsTab;

            navItems.forEach(i => i.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(`settings-${tabId}`).classList.add('active');
            SoundEngine.play('click');
        };
    });
}

function initThemePreviews() {
    const themeCards = document.querySelectorAll('.redesigned-theme-picker .theme-card');

    themeCards.forEach(card => {
        const color = card.dataset.color;

        // Update active state based on current state
        if (state.themeColor === color) card.classList.add('active');
        else card.classList.remove('active');

        card.onclick = () => {
            applyTheme(color);
            state.themeColor = color;
            saveState();

            themeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            SoundEngine.play('success');
        };
    });
}

// Global scope helpers for Settings
window.updateStateValue = (key, val) => {
    state[key] = (key === 'goal') ? parseFloat(val) || 0 : val;
    saveState();
};

window.manualUpdateRates = async () => {
    const btn = document.querySelector('button[onclick="manualUpdateRates()"]');
    const originalHTML = btn ? btn.innerHTML : '';

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Обновление...</span>';
    }

    try {
        const response = await fetch(RATES_API);
        if (!response.ok) throw new Error('API Error');

        const data = await response.json();
        if (data && data.rates) {
            state.rates.EUR = 1;
            state.rates.USD = data.rates.USD || state.rates.USD;
            state.rates.UAH = data.rates.UAH || state.rates.UAH;
            state.rates.RUB = data.rates.RUB || state.rates.RUB;
            state.lastRateUpdate = new Date().toISOString();
            saveState();

            // Re-render settings to show updated rates
            renderSettings();

            showAlert('✅ Курсы успешно обновлены!\n\n' +
                `1 EUR = ${state.rates.USD.toFixed(2)} $\n` +
                `1 EUR = ${state.rates.UAH.toFixed(2)} ₴\n` +
                `1 EUR = ${state.rates.RUB.toFixed(2)} ₽`);

            SoundEngine.play('success');
        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.error('Rates update failed:', error);
        showAlert('⚠️ Не удалось обновить курсы.\nИспользуются текущие значения.');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalHTML;
        }
    }
}

// --- Security & Data Utilities ---
function calculateCheckSum(str) {
    let hash = 0;
    const flavored = str + SECURITY_SALT;
    for (let i = 0; i < flavored.length; i++) {
        const char = flavored.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
}

window.exportState = () => {
    try {
        const exportData = {
            v: 2,
            ts: Date.now(),
            payload: state,
            sig: ''
        };

        // Sign the payload
        exportData.sig = calculateCheckSum(JSON.stringify(exportData.payload));

        // Obfuscate (Base64)
        const jsonStr = JSON.stringify(exportData);
        const obfuscated = btoa(unescape(encodeURIComponent(jsonStr)));

        // Use text/plain to ensure the Base64 string itself is saved as text
        const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(obfuscated);
        const dl = document.createElement('a');
        dl.setAttribute("href", dataStr);
        dl.setAttribute("download", `fpt_backup_${new Date().toISOString().slice(0, 10)}.fpt`);
        dl.click();

        showAlert('Файл сохранен успешно (.fpt)');
    } catch (e) {
        console.error(e);
        showAlert('Ошибка при экспорте');
    }
};

window.importState = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const content = ev.target.result.trim();
            // De-obfuscate
            const decoded = decodeURIComponent(escape(atob(content)));
            const pack = JSON.parse(decoded);

            if (!pack.payload || !pack.sig) {
                throw new Error('Invalid format');
            }

            // Verify integrity
            const expectedSig = calculateCheckSum(JSON.stringify(pack.payload));
            if (pack.sig !== expectedSig) {
                showAlert('Критическая ошибка: Файл был изменен или поврежден!');
                console.error('Signature mismatch');
                return;
            }

            state = pack.payload;
            saveState();
            showAlert('Данные успешно восстановлены!');
            setTimeout(() => location.reload(), 1000);
        } catch (err) {
            console.error('Import Error:', err);
            showAlert('Ошибка: Недопустимый или поврежденный файл');
        }
    };
    reader.readAsText(file);
};

window.promptSync = () => {
    showConfirm(
        'Выберите действие для синхронизации:',
        () => {
            // Copy
            const pack = {
                v: 2,
                payload: state,
                sig: calculateCheckSum(JSON.stringify(state))
            };
            const str = btoa(unescape(encodeURIComponent(JSON.stringify(pack))));
            navigator.clipboard.writeText(str).then(() => showAlert('Безопасный код скопирован!'));
        },
        () => {
            // Paste
            showPrompt('Вставьте код:', '', (code) => {
                if (code) {
                    try {
                        const decoded = decodeURIComponent(escape(atob(code)));
                        const pack = JSON.parse(decoded);

                        // Check if it's the new secure format or legacy
                        if (pack.payload && pack.sig) {
                            if (pack.sig === calculateCheckSum(JSON.stringify(pack.payload))) {
                                state = pack.payload;
                                saveState();
                                location.reload();
                                return;
                            } else {
                                showAlert('Код подделан или поврежден!');
                                return;
                            }
                        }

                        // Fallback/Legacy logic
                        state = JSON.parse(decoded);
                        saveState();
                        location.reload();
                    } catch (e) { showAlert('Ошибка кода'); }
                }
            });
        },
        'Копировать',
        'Вставить'
    );
};

window.resetAllData = () => {
    showConfirm('УДАЛИТЬ ВСЕ ДАННЫЕ?', () => {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    });
};

function setDefaultDates() {
    uiState.dateRange = '7';
    // Update active button
}
function handleCustomDate() {
    uiState.dateRange = 'custom';
    uiState.dateStart = document.getElementById('dateStart').value;
    uiState.dateEnd = document.getElementById('dateEnd').value;
    renderStats();
}
function initUI() {
    renderApp();
    renderSettings();
    renderPiggyBanks();
}
function renderConverter() {
    const amtEl = document.getElementById('calcAmount');
    const currEl = document.getElementById('calcCurrency');
    const resultsEl = document.getElementById('calcResults');
    if (!amtEl || !currEl || !resultsEl) return;

    const amount = parseFloat(amtEl.value) || 0;
    const fromCurr = currEl.value;

    const currencies = [
        { id: 'EUR', icon: '€', name: 'Euro' },
        { id: 'USD', icon: '$', name: 'US Dollar' },
        { id: 'RUB', icon: '₽', name: 'Ruble' },
        { id: 'UAH', icon: '₴', name: 'Hryvnia' }
    ];

    resultsEl.innerHTML = currencies
        .filter(c => c.id !== fromCurr)
        .map(c => {
            const converted = convert(amount, fromCurr, c.id);
            return `
                <div class="converter-card anim-slide-up">
                    <div class="curr-info">
                        <span class="curr-symbol">${c.icon}</span>
                        <div>
                            <div class="curr-code">${c.id}</div>
                            <div class="curr-name">${c.name}</div>
                        </div>
                    </div>
                    <div class="curr-value">${formatMoney(converted, c.id)}</div>
                </div>
            `;
        }).join('');
}

function initCalculator() {
    const display = document.getElementById('simpleCalcDisplay');
    const buttons = document.querySelectorAll('.calc-btn');
    if (!display || !buttons.length) return;

    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let shouldResetScreen = false;

    const updateDisplay = () => {
        display.textContent = currentInput;
    };

    const inputNumber = (num) => {
        if (currentInput === '0' || shouldResetScreen) {
            currentInput = num;
            shouldResetScreen = false;
        } else {
            currentInput += num;
        }
        updateDisplay();
    };

    const inputOperator = (op) => {
        if (operator !== null) calculate();
        previousInput = currentInput;
        operator = op;
        shouldResetScreen = true;
    };

    const calculate = () => {
        if (operator === null || shouldResetScreen) return;
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+': result = prev + current; break;
            case '−':
            case '-': result = prev - current; break;
            case '×':
            case '*': result = prev * current; break;
            case '÷':
            case '/': result = prev / current; break;
            default: return;
        }

        currentInput = result.toString();
        operator = null;
        updateDisplay();
    };

    const clear = () => {
        currentInput = '0';
        previousInput = '';
        operator = null;
        updateDisplay();
    };

    const backspace = () => {
        if (currentInput.length === 1) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    };

    buttons.forEach(btn => {
        btn.onclick = () => {
            SoundEngine.play('click');
            const text = btn.textContent;

            if (btn.classList.contains('num')) {
                inputNumber(text);
            } else if (btn.classList.contains('op')) {
                inputOperator(text);
            } else if (btn.classList.contains('eq')) {
                calculate();
            } else if (btn.classList.contains('clear')) {
                clear();
            } else if (btn.classList.contains('del')) {
                backspace();
            }
        };
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab || activeTab.id !== 'calculator') return;

        if (e.key >= '0' && e.key <= '9') inputNumber(e.key);
        if (e.key === '.') inputNumber('.');
        if (['+', '-', '*', '/'].includes(e.key)) {
            e.preventDefault();
            inputOperator(e.key);
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            calculate();
        }
        if (e.key === 'Backspace') backspace();
        if (e.key === 'Escape' || e.key.toLowerCase() === 'c') clear();
    });
}

// Global scope expose for onclick attributes
window.deleteNote = deleteNote;
window.updateInventoryQty = updateInventoryQty;
window.openNicknameModal = openNicknameModal;
window.saveNickname = saveNickname;
window.changeHeatmapMonth = changeHeatmapMonth;
window.renderHeatmap = renderHeatmap;

const NEWS_DATA = [
    {
        date: '2026-01-29',
        badge: 'feature',
        title: 'Личный кабинет и новости',
        text: 'Добавлена новая вкладка "Профиль" с вашим рангом, XP и свежими новостями проекта.'
    },
    {
        date: '2026-01-29',
        badge: 'update',
        title: 'Переводы в копилках',
        text: 'Теперь вы можете переводить средства между копилками прямо через меню редактирования.'
    },
    {
        date: '2026-01-28',
        badge: 'fix',
        title: 'Улучшение стабильности',
        text: 'Исправлена ошибка с расчётом XP при удалении заказов.'
    }
];

function renderProfile() {
    if (!state.nickname) state.nickname = 'Trader';

    document.getElementById('profileNickname').textContent = state.nickname;

    // XP & Rank from accomplishments.js logic
    const { totalXp, currentRank, nextRank } = getXpAndRank(state);

    const rankEl = document.getElementById('profileRankName');
    rankEl.textContent = getTranslation(currentRank.nameKey);
    rankEl.className = 'rank-badge ' + currentRank.color;

    document.getElementById('profileTotalXp').textContent = totalXp;

    const xpBar = document.getElementById('profileXpBar');
    const xpPercent = nextRank
        ? ((totalXp - currentRank.minXp) / (nextRank.minXp - currentRank.minXp)) * 100
        : 100;
    xpBar.style.width = Math.min(xpPercent, 100) + '%';

    document.getElementById('profileNextRankName').textContent = nextRank ? getTranslation(nextRank.nameKey) : getTranslation('max');

    // Stats
    const totalRevenue = state.orders.filter(o => o.status === 'paid')
        .reduce((acc, o) => acc + convert(o.amount, o.currency, state.currency), 0);
    const totalOrders = state.orders.filter(o => o.status === 'paid').length;

    document.getElementById('profileTotalRevenue').textContent = formatCurrency(totalRevenue, state.currency);
    document.getElementById('profileTotalOrders').textContent = totalOrders;

    // News
    const newsList = document.getElementById('newsList');
    if (newsList) {
        newsList.innerHTML = NEWS_DATA.map(item => `
            <div class="news-item">
                <span class="news-date">${item.date}</span>
                <span class="news-badge ${item.badge}">${item.badge.toUpperCase()}</span>
                <h4>${item.title}</h4>
                <p>${item.text}</p>
            </div>
        `).join('');
    }
}

function openNicknameModal() {
    document.getElementById('editNickname').value = state.nickname || 'Trader';
    openModal('nicknameModal');
}

function saveNickname() {
    const newName = document.getElementById('editNickname').value.trim();
    if (newName) {
        state.nickname = newName;
        saveState();
        renderProfile();
        closeModal('nicknameModal');
    }
}

function playSuccessSound() {
    SoundEngine.play('success');
}

// --- Event Listeners ---
function initEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-links li').forEach(item => {
        item.onclick = () => switchTab(item.dataset.tab);
    });

    // Clear validation on input
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('is-invalid')) {
            e.target.classList.remove('is-invalid');
            const container = e.target.closest('.form-group') || e.target.parentElement;
            const msgEl = container.querySelector('.error-message');
            if (msgEl) msgEl.style.display = 'none';
        }
    });

    // Theme Specific Character Initialization - Handle if elements exist
    const stalin = document.querySelector('.ussr-stalin');
    const tank = document.querySelector('.ussr-tank');
    if (stalin) stalin.style.display = 'none';
    if (tank) tank.style.display = 'none';

    // Rental Modal Logic
    const orderCategorySelect = document.getElementById('orderCategory');
    const rentalFields = document.getElementById('rentalFields');
    if (orderCategorySelect && rentalFields) {
        orderCategorySelect.addEventListener('change', (e) => {
            rentalFields.style.display = e.target.value === 'rent' ? 'block' : 'none';
        });
    }

    // Welcome Screen
    const welcomeBtn = document.getElementById('welcomeStartBtn');
    if (welcomeBtn) {
        welcomeBtn.onclick = () => {
            state.isFirstRun = false;
            saveState();
            const overlay = document.getElementById('welcomeScreen');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    updateRates();
                }, 500);
            }
        };
    }

    // Currency & Privacy
    const currencySelect = document.getElementById('mainCurrencySelect');
    if (currencySelect) {
        currencySelect.value = state.currency;
        currencySelect.onchange = (e) => {
            state.currency = e.target.value;
            saveState();
        };
    }

    const privacyBtn = document.getElementById('togglePrivacy');
    if (privacyBtn) {
        privacyBtn.onclick = () => {
            state.privacyMode = !state.privacyMode;
            document.body.classList.toggle('privacy-mode', state.privacyMode);
            const icon = privacyBtn.querySelector('i');
            if (icon) icon.className = state.privacyMode ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
            saveState();
        };
    }

    // Modals & Orders
    const addOrderBtn = document.getElementById('addOrderBtn');
    if (addOrderBtn) {
        addOrderBtn.onclick = () => {
            document.getElementById('orderEditId').value = ''; // Clear edit ID
            document.getElementById('orderTitle').value = '';
            document.getElementById('orderAmount').value = '';

            // Fix: Use local date instead of valueAsDate (which uses UTC)
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            document.getElementById('orderDate').value = `${year}-${month}-${day}`;

            document.getElementById('rentalDuration').value = '';
            document.getElementById('rentalUnit').value = 'hours';
            document.getElementById('rentalFields').style.display = 'none';
            openModal('orderModal');
        };
    }

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = (e) => closeModal(e.target.closest('.modal-overlay').id);
    });

    const saveOrderBtn = document.getElementById('saveOrderBtn');
    if (saveOrderBtn) saveOrderBtn.onclick = saveOrderForm;

    // Settings
    const openSettingsBtn = document.getElementById('openSettings');
    if (openSettingsBtn) {
        openSettingsBtn.onclick = () => {
            renderSettings();
            openModal('settingsModal');
        };
    }

    const goalWidget = document.querySelector('.goal-widget');
    if (goalWidget) {
        goalWidget.onclick = () => {
            openModal('settingsModal');
            // Switch to general tab if not already there
            const generalTab = document.querySelector('[data-settings-tab="general"]');
            if (generalTab) generalTab.click();

            const goalInput = document.getElementById('settingsGoal');
            if (goalInput) setTimeout(() => goalInput.focus(), 200);
        };
    }

    // Data Management
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
        exportBtn.onclick = () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
            const dl = document.createElement('a');
            dl.setAttribute("href", dataStr);
            dl.setAttribute("download", `funpay_tracker_backup_${new Date().toISOString().split('T')[0]}.json`);
            dl.click();
        };
    }

    const importBtn = document.getElementById('importDataBtn');
    const importInput = document.getElementById('importFileInput');
    if (importBtn && importInput) {
        importBtn.onclick = () => importInput.click();
        importInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    showConfirm('Импортировать данные? Текущие будут стерты.', () => {
                        state = data;
                        saveState();
                        location.reload();
                    });
                } catch (err) { showAlert('Ошибка импорта'); }
            };
            reader.readAsText(file);
        };
    }

    // Sync
    const copySyncBtn = document.getElementById('copySyncBtn');
    if (copySyncBtn) {
        copySyncBtn.onclick = () => {
            const str = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
            navigator.clipboard.writeText(str).then(() => alert('Код скопирован!'));
        };
    }

    const pasteSyncBtn = document.getElementById('pasteSyncBtn');
    if (pasteSyncBtn) {
        pasteSyncBtn.onclick = () => {
            const code = prompt('Вставьте код:');
            if (code) {
                try {
                    const data = JSON.parse(decodeURIComponent(escape(atob(code))));
                    if (confirm('Синхронизировать данные?')) {
                        state = data;
                        saveState();
                        location.reload();
                    }
                } catch (e) { alert('Ошибка кода'); }
            }
        };
    }

    // Search & Notes
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.oninput = (e) => {
            uiState.searchQuery = e.target.value.toLowerCase();
            renderOrders();
        };
    }

    const filterCat = document.getElementById('filterCategory');
    if (filterCat) {
        filterCat.onchange = (e) => {
            uiState.categoryFilter = e.target.value;
            renderOrders();
        };
    }

    const filterStatus = document.getElementById('filterStatus');
    if (filterStatus) {
        filterStatus.onchange = (e) => {
            uiState.statusFilter = e.target.value;
            renderOrders();
        };
    }

    const sortOrders = document.getElementById('sortOrders');
    if (sortOrders) {
        sortOrders.onchange = (e) => {
            uiState.sortBy = e.target.value;
            renderOrders();
        };
    }

    const addNoteBtn = document.getElementById('addNoteBtn');
    if (addNoteBtn) addNoteBtn.onclick = addNote;

    // Expenses
    const addExpBtn = document.getElementById('addExpenseBtn');
    if (addExpBtn) addExpBtn.onclick = () => openModal('expenseModal');

    const saveExpBtn = document.getElementById('saveExpenseBtn');
    if (saveExpBtn) {
        saveExpBtn.onclick = () => {
            const title = document.getElementById('expenseTitle').value;
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            const currency = document.getElementById('expenseCurrency').value;
            const date = document.getElementById('expenseDate').value;

            let isValid = true;
            if (!validateField('expenseTitle', { required: true })) isValid = false;
            if (!validateField('expenseAmount', { required: true, number: true, positive: true, max: 100000 })) isValid = false;
            if (!isValid) return;
            if (!state.expenses) state.expenses = [];
            state.expenses.unshift({ id: Date.now(), title, amount, currency, date });
            saveState();
            renderExpenses();
            updateBalance();
            closeModal('expenseModal');
        };
    }

    // Templates
    const addTplBtn = document.getElementById('addTemplateBtn');
    if (addTplBtn) addTplBtn.onclick = () => openTemplateModal();

    const saveTplBtn = document.getElementById('saveTemplateBtn');
    if (saveTplBtn) {
        saveTplBtn.onclick = () => {
            const id = document.getElementById('tplEditId').value;
            const name = document.getElementById('tplTitle').value;
            const amount = parseFloat(document.getElementById('tplAmount').value);
            const currency = document.getElementById('tplCurrency').value;
            const category = document.getElementById('tplCategory').value;

            let isValid = true;
            if (!validateField('tplTitle', { required: true })) isValid = false;
            if (!validateField('tplAmount', { required: true, number: true, positive: true, max: 100000 })) isValid = false;
            if (!isValid) return;

            if (id) {
                // Edit
                const idx = state.templates.findIndex(t => t.id == id);
                if (idx !== -1) {
                    state.templates[idx] = { ...state.templates[idx], name, amount, currency, category };
                }
            } else {
                // New
                state.templates.push({ id: Date.now(), name, amount, currency, category });
            }

            saveState();
            renderTemplates();
            closeModal('templateModal');
        };
    }

    // Inventory
    const addInvBtn = document.getElementById('addInventoryBtn');
    if (addInvBtn) addInvBtn.onclick = () => openInventoryModal();

    const saveInvBtn = document.getElementById('saveInventoryBtn');
    if (saveInvBtn) saveInvBtn.onclick = saveInventory;

    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.onclick = () => {
            showConfirm('Вы уверены, что хотите удалить ВСЕ данные? Это действие необратимо.', () => {
                localStorage.removeItem(STORAGE_KEY);
                location.reload();
            });
        };
    }

    const saveNoteBtn = document.getElementById('saveNoteBtn');
    if (saveNoteBtn) saveNoteBtn.onclick = saveNote;

    // Piggy Bank
    const addPiggyBtn = document.getElementById('addPiggyBtn');
    if (addPiggyBtn) addPiggyBtn.onclick = () => openPiggyModal();

    const savePiggyBtn = document.getElementById('savePiggyBtn');
    if (savePiggyBtn) savePiggyBtn.onclick = savePiggyBank;

    // Stats
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            uiState.dateRange = btn.dataset.range;
            renderStats();
        };
    });

    const dsInput = document.getElementById('dateStart');
    if (dsInput) dsInput.onchange = handleCustomDate;
    const deInput = document.getElementById('dateEnd');
    if (deInput) deInput.onchange = handleCustomDate;

    // Calc
    const calcAmt = document.getElementById('calcAmount');
    if (calcAmt) calcAmt.oninput = renderConverter;
    const calcCurr = document.getElementById('calcCurrency');
    if (calcCurr) calcCurr.onchange = renderConverter;

    // FAB Toggle
    const fabToggle = document.getElementById('fabToggle');
    const fabContainer = document.querySelector('.fab-container');
    if (fabToggle && fabContainer) {
        fabToggle.onclick = () => {
            fabContainer.classList.toggle('open');
            SoundEngine.init();
            SoundEngine.play('click');
        };
    }

    const fabOpenSupport = document.getElementById('fabOpenSupport');
    if (fabOpenSupport && fabContainer) {
        fabOpenSupport.onclick = () => {
            openModal('chatModal');
            fabContainer.classList.remove('open');
            SoundEngine.play('click');
        };
    }

    // Rename Product
    const saveRenameBtn = document.getElementById('saveRenameBtn');
    if (saveRenameBtn) saveRenameBtn.onclick = saveRenamedProduct;

    // Initialize sounds on first interaction
    document.addEventListener('click', () => SoundEngine.init(), { once: true });

    // History
    const openHistoryBtn = document.getElementById('openHistoryBtn');
    if (openHistoryBtn) {
        openHistoryBtn.onclick = () => {
            renderActionHistory();
            openModal('historyModal');
        };
    }

    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    if (clearHistoryBtn) {
        clearHistoryBtn.onclick = () => {
            showConfirm(getTranslation('reset'), () => {
                state.actionHistory = [];
                addActionLog('clear', 'System', '');
                saveState();
                renderActionHistory();
            });
        };
    }

    // Responsive resize listener
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (typeof renderApp === 'function') renderApp();
        }, 250);
    });
}

function renderBalance() {
    // Calculate Total Balance
    let total = 0;
    (state.orders || []).forEach(order => {
        if (order.status === 'paid') {
            total += convert(order.amount, order.currency, state.currency);
        }
    });

    // Subtract Expenses
    let totalExpenses = 0;
    if (state.expenses) {
        state.expenses.forEach(exp => {
            totalExpenses += convert(exp.amount, exp.currency, state.currency);
        });
    }

    // Subtract Piggy Bank Deductions
    let totalPiggyDeductions = 0;
    const activeBankIds = new Set((state.piggyBanks || []).map(b => b.id.toString()));

    (state.orders || []).forEach(order => {
        if (order.status === 'paid' && order.piggyDeductions) {
            Object.entries(order.piggyDeductions).forEach(([bankId, d]) => {
                // If the bank still exists, subtract its deduction
                if (activeBankIds.has(bankId.toString())) {
                    totalPiggyDeductions += convert(d.amount, d.currency, state.currency);
                }
                // If bank is deleted, the money naturally stays in netProfit because we don't subtract it here
            });
        }
    });

    const netProfit = total - totalExpenses - totalPiggyDeductions;

    const totalBalEl = document.getElementById('totalBalance');
    if (totalBalEl) totalBalEl.textContent = formatMoney(netProfit, state.currency);

    // Update Net Profit in Purchases Tab
    const netProfitEl = document.getElementById('netProfitDisplay');
    if (netProfitEl) netProfitEl.textContent = formatMoney(netProfit, state.currency);

    // Update Goal Progress (based on Net Profit)
    const goal = state.goal || 0;
    const goalCurr = state.goalCurrency || 'EUR';
    const goalTargetEl = document.getElementById('goalTarget');
    if (goalTargetEl) goalTargetEl.textContent = formatMoney(goal, goalCurr);

    let goalPercent = 0;
    if (goal > 0) {
        const now = new Date();
        // Calculate monthly profit in SITE currency first
        const monthlyNetProfitInSiteCurrency = state.orders.filter(o => {
            const d = new Date(o.date);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && o.status === 'paid';
        }).reduce((acc, o) => acc + convert(o.amount, o.currency, state.currency), 0);

        // Convert to GOAL currency
        const monthlyProfitInGoalCurrency = convert(monthlyNetProfitInSiteCurrency, state.currency, goalCurr);

        goalPercent = Math.min(100, Math.round((monthlyProfitInGoalCurrency / goal) * 100));
    }

    const goalPercentEl = document.getElementById('goalPercent');
    if (goalPercentEl) goalPercentEl.textContent = `${goalPercent}%`;
    const goalBarEl = document.getElementById('goalBar');
    if (goalBarEl) goalBarEl.style.width = `${goalPercent}%`;
    const lastUpdate = state.lastRateUpdate ? new Date(state.lastRateUpdate).toLocaleString(state.language === 'en' ? 'en-US' : (state.language === 'uk' ? 'uk-UA' : 'ru-RU')) : getTranslation('never');
    const lastUpdatedEl = document.getElementById('lastUpdated');
    if (lastUpdatedEl) {
        lastUpdatedEl.innerHTML = `<span data-i18n="updated">${getTranslation('updated')}</span>: ${lastUpdate}`;
    }
}

// Update UI every minute for timers
setInterval(() => {
    if (state.orders.some(o => o.category === 'rent')) {
        renderOrders();
    }
}, 60000);

function getRemainingTime(expiry) {
    if (!expiry) return null;
    const now = Date.now();
    const diff = expiry - now;
    const expired = diff <= 0;

    // Format finish time
    const expiryDate = new Date(expiry);
    const finishTimeText = expiryDate.toLocaleString(state.language === 'en' ? 'en-US' : (state.language === 'uk' ? 'uk-UA' : 'ru-RU'), {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    if (expired) return { expired: true, text: getTranslation('expired'), finish: finishTimeText };

    const diffSec = Math.floor(diff / 1000);
    const m = Math.floor(diffSec / 60) % 60;
    const h = Math.floor(diffSec / 3600) % 24;
    const d = Math.floor(diffSec / 86400);

    let countdownText = "";
    if (d > 0) countdownText = `${d}d ${h}h ${m}m`;
    else if (h > 0) countdownText = `${h}h ${m}m`;
    else countdownText = `${m}m`;

    return { expired: false, text: countdownText, finish: finishTimeText };
}

function renderOrders() {
    const list = document.getElementById('ordersList');
    list.innerHTML = '';

    // 1. Filtering
    let filtered = state.orders.filter(o => {
        const query = (uiState.searchQuery || '').toLowerCase();
        const matchTitle = (o.title || '').toLowerCase().includes(query);
        const matchNumber = (o.orderNumber || '').toLowerCase().includes(query);
        const matchText = matchTitle || matchNumber;

        const matchCat = uiState.categoryFilter === 'all' || o.category === uiState.categoryFilter;

        // Complex status matching
        let matchStatus = true;
        if (uiState.statusFilter !== 'all') {
            const status = o.status || 'waiting';
            if (uiState.statusFilter === 'active' || uiState.statusFilter === 'expired') {
                if (o.category !== 'rent' || !o.rentalExpiry) {
                    matchStatus = false;
                } else {
                    const isExpired = o.rentalExpiry <= Date.now();
                    matchStatus = uiState.statusFilter === 'expired' ? isExpired : !isExpired;
                }
            } else {
                matchStatus = status === uiState.statusFilter;
            }
        }

        return matchText && matchCat && matchStatus;
    });

    // 2. Sorting
    filtered.sort((a, b) => {
        const dateTimeA = (a.date || '0000-00-00').trim() + 'T' + (a.time || '00:00').trim();
        const dateTimeB = (b.date || '0000-00-00').trim() + 'T' + (b.time || '00:00').trim();

        const diff = dateTimeA.localeCompare(dateTimeB);

        if (uiState.sortBy === 'date_asc') {
            return diff || (a.id - b.id);
        } else if (uiState.sortBy === 'date_desc') {
            return (dateTimeB.localeCompare(dateTimeA)) || (b.id - a.id);
        } else if (uiState.sortBy === 'time_asc') {
            const timeA = a.rentalExpiry || Infinity;
            const timeB = b.rentalExpiry || Infinity;
            return timeA - timeB;
        } else if (uiState.sortBy === 'time_desc') {
            const timeA = a.rentalExpiry || 0;
            const timeB = b.rentalExpiry || 0;
            return timeB - timeA;
        }
        return 0;
    });

    document.getElementById('ordersCountBadge').textContent = filtered.length;

    filtered.forEach(order => {
        const catData = CATEGORIES[order.category] || CATEGORIES['other'];
        const status = order.status || 'waiting';
        const statusText = getTranslation(status);
        const statusClass = status === 'paid' ? 'status-paid' : 'status-waiting';
        const deleteLabel = getTranslation('delete');
        const editLabel = getTranslation('edit');
        const catLabel = getTranslation(catData.key);

        const el = document.createElement('div');
        const categoryClass = order.category && CATEGORIES[order.category] ? order.category : 'other';
        el.className = `order-card cat-${categoryClass}`;

        let rentalTimerHtml = '';
        if (order.category === 'rent' && order.rentalExpiry) {
            const timeData = getRemainingTime(order.rentalExpiry);
            const timeClass = timeData.expired ? 'rental-expired' : 'rental-active';
            rentalTimerHtml = `
                <div class="rental-timer ${timeClass}">
                    <i class="fa-solid fa-clock"></i>
                    <span class="countdown-val">${timeData.text}</span>
                    <span class="finish-at-compact">(${timeData.finish})</span>
                </div>
            `;
        }

        el.innerHTML = `
            <div style="display: flex; align-items: center; flex: 1; gap: 15px;">
                <div class="cat-icon-wrapper">
                    <i class="fa-solid ${catData.icon || 'fa-question'}"></i>
                </div>
                <div class="order-info-main">
                    <div class="order-title-row">
                        <h4>${order.title} ${order.orderNumber ? `<span class="order-number">${order.orderNumber}</span>` : ''}</h4>
                        ${rentalTimerHtml}
                    </div>
                    <span class="order-meta">${catLabel} • ${order.date} ${order.time || ''}</span>
                </div>
            </div>
            
            <div class="order-amount">
                <div class="status-badge ${statusClass}">${statusText}</div>
                <span>${formatMoney(order.amount, order.currency)}</span>
                
                <div class="order-actions">
                    <div class="action-btn edit-btn" title="${editLabel}">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                    <div class="action-btn delete-btn" title="${deleteLabel}">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
        `;

        // Handlers
        el.querySelector('.status-badge').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleOrderStatus(order.id);
        });

        el.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            openEditOrderModal(order.id);
        });

        el.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteOrder(order.id);
        });

        list.appendChild(el);
    });
}

function toggleOrderStatus(id) {
    const order = state.orders.find(o => o.id === id);
    if (order) {
        order.status = (order.status === 'paid') ? 'waiting' : 'paid';
        const orderNum = order.orderNumber ? `<span class="history-number-badge">${order.orderNumber}</span>` : '';
        addActionLog('status', order.title, `${orderNum} ${getTranslation('action_status')}${getTranslation(order.status)}`);
        saveState();
        renderOrders();
        SoundEngine.play('click');
    }
}

function openEditOrderModal(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;

    document.getElementById('orderEditId').value = order.id;
    document.getElementById('orderTitle').value = order.title;
    document.getElementById('orderAmount').value = order.amount;
    document.getElementById('orderCurrency').value = order.currency;
    document.getElementById('orderCategory').value = order.category;
    document.getElementById('orderDate').value = order.date;
    document.getElementById('orderTime').value = order.time || '';
    document.getElementById('orderNumber').value = order.orderNumber || '';

    const rentalFields = document.getElementById('rentalFields');
    if (order.category === 'rent') {
        rentalFields.style.display = 'block';
        document.getElementById('rentalDuration').value = order.rentalDuration || '';
        document.getElementById('rentalUnit').value = order.rentalUnit || 'hours';
    } else {
        rentalFields.style.display = 'none';
    }

    openModal('orderModal');
}

function renderExpenses() {
    const list = document.getElementById('expensesList');
    if (!list) return;
    list.innerHTML = '';

    let totalExpenses = 0;

    (state.expenses || []).forEach(exp => {
        const itemVal = convert(exp.amount, exp.currency, state.currency);
        totalExpenses += itemVal;

        const el = document.createElement('div');
        el.className = 'order-card';
        el.style.borderLeft = '4px solid var(--danger-color)';
        el.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div class="cat-icon-wrapper">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <div class="order-info">
                    <h4>${exp.title}</h4>
                    <span>${exp.date}</span>
                </div>
            </div>
            <div class="order-amount" style="color:var(--danger-color)">
                <span>-${formatMoney(exp.amount, exp.currency)}</span>
                <i class="fa-solid fa-trash delete-btn"></i>
            </div>
        `;

        el.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm(getTranslation('delete_confirm'))) {
                state.expenses = state.expenses.filter(e => e.id !== exp.id);
                saveState();
                renderExpenses();
                updateBalance();
            }
        });

        list.appendChild(el);
    });

    // Update Stats in Purchases Tab
    const totalElement = document.getElementById('totalExpensesDisplay');
    if (totalElement) totalElement.textContent = formatMoney(totalExpenses, state.currency);
}

function renderPiggyBanks() {
    const list = document.getElementById('piggyBanksList');
    if (!list) return;
    list.innerHTML = '';

    if (!state.piggyBanks || state.piggyBanks.length === 0) {
        list.innerHTML = `<p style="text-align:center; grid-column: 1/-1; padding:40px; color:var(--text-muted); opacity: 0.5;">${getTranslation('never')}</p>`;
        return;
    }

    state.piggyBanks.forEach(bank => {
        // Calculate current amount for this bank
        let currentAmount = 0;
        state.orders.forEach(order => {
            if (order.status === 'paid' && order.piggyDeductions && order.piggyDeductions[bank.id]) {
                const d = order.piggyDeductions[bank.id];
                currentAmount += convert(d.amount, d.currency, bank.currency);
            }
        });

        // Add adjustments (transfers)
        if (bank.adjustments) {
            bank.adjustments.forEach(adj => {
                currentAmount += convert(adj.amount, adj.currency, bank.currency);
            });
        }

        const percent = bank.goal > 0 ? Math.min(100, Math.round((currentAmount / bank.goal) * 100)) : 0;

        const card = document.createElement('div');
        card.className = 'piggy-card compact-piggy anim-slide-up';
        card.innerHTML = `
            <div class="piggy-badge">${bank.percentage}%</div>
            <div class="piggy-actions-hover">
                <i class="fa-solid fa-pen" title="Edit" onclick="openPiggyModal(${bank.id})"></i>
                <i class="fa-solid fa-hammer" title="Break" onclick="breakPiggyBank(${bank.id})"></i>
                <i class="fa-solid fa-trash" title="Delete" onclick="deletePiggyBank(${bank.id})"></i>
            </div>
            
            <div class="piggy-header-compact">
                <h3>${bank.name}</h3>
            </div>

            <div class="piggy-visual-center">
                <div class="piggy-icon-container">
                    <i class="fa-solid fa-piggy-bank piggy-base"></i>
                    <div class="piggy-fill-overlay" style="height: ${percent}%">
                        <i class="fa-solid fa-piggy-bank piggy-filled"></i>
                    </div>
                </div>
                <div class="piggy-main-percent">${percent}%</div>
            </div>

            <div class="piggy-amounts-compact">
                <span class="piggy-amt-current">${formatMoney(currentAmount, bank.currency)}</span>
                ${bank.goal > 0 ? `<span class="piggy-amt-goal"> / ${formatMoney(bank.goal, bank.currency)}</span>` : ''}
            </div>
        `;
        list.appendChild(card);
    });
}

function openPiggyModal(id = null) {
    const isEdit = id !== null;
    document.getElementById('piggyModalTitle').textContent = isEdit ? getTranslation('edit') : getTranslation('add_piggy');
    document.getElementById('piggyEditId').value = id || '';

    const catList = document.getElementById('piggyCategoryList');
    if (catList) {
        catList.innerHTML = '';
        Object.entries(CATEGORIES).forEach(([catId, cat]) => {
            const row = document.createElement('div');
            row.className = 'piggy-cat-row';
            row.innerHTML = `
                <div class="piggy-cat-info">
                    <i class="fa-solid ${cat.icon}"></i>
                    <span>${getTranslation(cat.key)}</span>
                </div>
                <div class="piggy-cat-input">
                    <input type="number" class="piggy-cat-pct" data-cat="${catId}" placeholder="0" min="0" max="100">
                    <span>%</span>
                </div>
            `;
            catList.appendChild(row);
        });
    }

    if (isEdit) {
        const bank = state.piggyBanks.find(b => b.id === id);
        if (bank) {
            document.getElementById('piggyName').value = bank.name;
            document.getElementById('piggyPercent').value = bank.percentage;
            document.getElementById('piggyGoal').value = bank.goal;
            document.getElementById('piggyCurrency').value = bank.currency;

            // Fill category percentages
            if (bank.categoryPercentages) {
                const inputs = document.querySelectorAll('.piggy-cat-pct');
                inputs.forEach(input => {
                    const catId = input.dataset.cat;
                    if (bank.categoryPercentages[catId] !== undefined) {
                        input.value = bank.categoryPercentages[catId];
                    }
                });
            }
        }
    } else {
        document.getElementById('piggyName').value = '';
        document.getElementById('piggyPercent').value = 0;
        document.getElementById('piggyGoal').value = 0;
        document.getElementById('piggyCurrency').value = state.currency;
        const inputs = document.querySelectorAll('.piggy-cat-pct');
        inputs.forEach(i => i.value = '');
    }

    // Toggle transfer button visibility
    const transferBtn = document.getElementById('piggyTransferBtn');
    if (transferBtn) {
        transferBtn.style.display = isEdit ? 'flex' : 'none';
        transferBtn.onclick = () => {
            closeModal('piggyModal');
            openPiggyTransferModal(id);
        };
    }

    openModal('piggyModal');
}

function savePiggyBank() {
    const id = document.getElementById('piggyEditId').value;
    const name = document.getElementById('piggyName').value.trim();
    const percentage = parseFloat(document.getElementById('piggyPercent').value) || 0;
    const goal = parseFloat(document.getElementById('piggyGoal').value) || 0;
    const currency = document.getElementById('piggyCurrency').value;

    if (!validateField('piggyName', { required: true })) return;
    if (!validateField('piggyPercent', { required: true, number: true, positive: true, max: 100 })) return;

    const categoryPercentages = {};
    document.querySelectorAll('.piggy-cat-pct').forEach(input => {
        const val = input.value.trim();
        if (val !== '') {
            categoryPercentages[input.dataset.cat] = parseFloat(val);
        }
    });

    // --- CROSS-BANK VALIDATION ---
    // We must ensure that the SUM of percentages for ANY category doesn't exceed 100%
    const otherBanks = (state.piggyBanks || []).filter(b => b.id != id);
    const categories = Object.keys(CATEGORIES);
    let conflictMsg = '';

    for (const catId of categories) {
        let totalPct = 0;
        const conflictingBanks = [];

        // 1. Calculate for other banks
        otherBanks.forEach(bank => {
            const hasCatRates = bank.categoryPercentages && Object.keys(bank.categoryPercentages).length > 0;
            const bankPct = hasCatRates
                ? (bank.categoryPercentages[catId] || 0)
                : (bank.percentage || 0);

            if (bankPct > 0) {
                totalPct += bankPct;
                conflictingBanks.push(`${bank.name} (${bankPct}%)`);
            }
        });

        // 2. Add current bank's planned percentage
        const currentHasCatRates = Object.keys(categoryPercentages).length > 0;
        const currentPct = currentHasCatRates
            ? (categoryPercentages[catId] || 0)
            : percentage;

        totalPct += currentPct;

        if (totalPct > 100) {
            const catName = getTranslation(CATEGORIES[catId].key);
            conflictMsg += `\n• <strong>${catName}</strong>: ${totalPct}% (Лимит: 100%).\n  ${getTranslation('previously')}: ${conflictingBanks.join(', ')}`;
        }
    }

    if (conflictMsg) {
        showAlert(`<strong>Внимание: превышен лимит отчислений!</strong>\n${conflictMsg}\n\nПожалуйста, уменьшите проценты в этой или других копилках.`, 'error');
        return;
    }
    // --- END VALIDATION ---

    if (!id && (state.piggyBanks || []).length >= 10) {
        showAlert(getTranslation('piggy_max_error'));
        return;
    }

    if (id) {
        const idx = state.piggyBanks.findIndex(b => b.id == id);
        if (idx !== -1) {
            state.piggyBanks[idx] = { ...state.piggyBanks[idx], name, percentage, goal, currency, categoryPercentages };
        }
    } else {
        state.piggyBanks.push({ id: Date.now(), name, percentage, goal, currency, categoryPercentages });
    }

    saveState();
    closeModal('piggyModal');
    renderPiggyBanks();
    updateBalance();
}

function deletePiggyBank(id) {
    showConfirm(getTranslation('piggy_delete_confirm'), () => {
        state.piggyBanks = state.piggyBanks.filter(b => b.id !== id);
        saveState();
        renderPiggyBanks();
        updateBalance();
        SoundEngine.play('delete');
    });
}

function breakPiggyBank(id) {
    const bank = state.piggyBanks.find(b => b.id == id);
    if (!bank) return;

    let currentAmount = 0;
    state.orders.forEach(order => {
        if (order.status === 'paid' && order.piggyDeductions && order.piggyDeductions[bank.id]) {
            const d = order.piggyDeductions[bank.id];
            currentAmount += convert(d.amount, d.currency, bank.currency);
        }
    });

    const confirmMsg = getTranslation('piggy_break_confirm')
        .replace('{}', formatMoney(currentAmount, bank.currency))
        .replace('{}', '');

    showConfirm(confirmMsg, () => {
        const cards = document.querySelectorAll('.piggy-card');
        let cardToShatter = null;
        cards.forEach(c => {
            if (c.querySelector('h3').textContent === bank.name) {
                cardToShatter = c;
            }
        });

        if (cardToShatter) {
            cardToShatter.classList.add('shattering');
            SoundEngine.play('delete');

            setTimeout(() => {
                if (currentAmount > 0) {
                    state.expenses.push({
                        id: Date.now(),
                        title: getTranslation('piggy_broken_title').replace('{}', bank.name),
                        amount: currentAmount,
                        currency: bank.currency,
                        date: new Date().toISOString().split('T')[0],
                        category: 'other'
                    });
                }

                state.piggyBanks = state.piggyBanks.filter(b => b.id !== id);

                saveState();
                renderPiggyBanks();
                updateBalance();
                if (window.renderExpenses) renderExpenses();
                if (window.renderStats) renderStats();
            }, 1200);
        } else {
            // Fallback if card element not found
            if (currentAmount > 0) {
                state.expenses.push({ id: Date.now(), title: getTranslation('piggy_broken_title').replace('{}', bank.name), amount: currentAmount, currency: bank.currency, date: new Date().toISOString().split('T')[0], category: 'other' });
            }
            state.piggyBanks = state.piggyBanks.filter(b => b.id !== id);
            saveState();
            renderPiggyBanks();
            updateBalance();
        }
    });
}

function openPiggyTransferModal(id) {
    const sourceBank = state.piggyBanks.find(b => b.id === id);
    if (!sourceBank) return;

    // Calculate current amount for source
    let currentAmount = 0;
    state.orders.forEach(order => {
        if (order.status === 'paid' && order.piggyDeductions && order.piggyDeductions[id]) {
            const d = order.piggyDeductions[id];
            currentAmount += convert(d.amount, d.currency, sourceBank.currency);
        }
    });
    if (sourceBank.adjustments) {
        sourceBank.adjustments.forEach(adj => {
            currentAmount += convert(adj.amount, adj.currency, sourceBank.currency);
        });
    }

    document.getElementById('piggyTransferSourceId').value = id;
    document.getElementById('piggyTransferSourceDisplay').innerHTML = `
        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 5px;">${getTranslation('transfer_from')}</div>
        <div style="font-weight: 700; font-size: 16px;">${sourceBank.name}</div>
        <div style="color: var(--primary-color); font-weight: 600;">${formatMoney(currentAmount, sourceBank.currency)}</div>
    `;

    const targetSelect = document.getElementById('piggyTransferTargetId');
    // Destroy custom select if it exists to allow re-populating
    if (window.destroyCustomSelect) window.destroyCustomSelect(targetSelect);

    targetSelect.innerHTML = '';
    // Add an empty placeholder option
    const placeholderOpt = document.createElement('option');
    placeholderOpt.value = "";
    placeholderOpt.disabled = true;
    placeholderOpt.selected = true;
    placeholderOpt.textContent = getTranslation('select_placeholder');
    targetSelect.appendChild(placeholderOpt);

    state.piggyBanks.forEach(bank => {
        if (bank.id !== id) {
            const opt = document.createElement('option');
            opt.value = bank.id;
            opt.textContent = `${bank.name} (${bank.currency})`;
            targetSelect.appendChild(opt);
        }
    });

    document.getElementById('piggyTransferAmount').value = '';

    // Re-init custom select
    if (window.initCustomSelects) window.initCustomSelects();

    openModal('piggyTransferModal');
}

function executePiggyTransfer() {
    const sourceId = parseInt(document.getElementById('piggyTransferSourceId').value);
    const targetId = parseInt(document.getElementById('piggyTransferTargetId').value);
    const amount = parseFloat(document.getElementById('piggyTransferAmount').value);

    if (isNaN(amount) || amount <= 0) {
        showAlert(getTranslation('fill_amount'), 'error');
        return;
    }

    if (sourceId === targetId) {
        showAlert(getTranslation('err_same_bank'), 'error');
        return;
    }

    const sourceBank = state.piggyBanks.find(b => b.id === sourceId);
    const targetBank = state.piggyBanks.find(b => b.id === targetId);

    if (!sourceBank || !targetBank) return;

    // Check if source has enough money
    let sourceCurrent = 0;
    state.orders.forEach(order => {
        if (order.status === 'paid' && order.piggyDeductions && order.piggyDeductions[sourceId]) {
            const d = order.piggyDeductions[sourceId];
            sourceCurrent += convert(d.amount, d.currency, sourceBank.currency);
        }
    });
    if (sourceBank.adjustments) {
        sourceBank.adjustments.forEach(adj => {
            sourceCurrent += convert(adj.amount, adj.currency, sourceBank.currency);
        });
    }

    if (amount > sourceCurrent + 0.01) { // Small buffer for float math
        showAlert(getTranslation('err_insufficient_funds'), 'error');
        return;
    }

    // Initialize adjustments if they don't exist
    if (!sourceBank.adjustments) sourceBank.adjustments = [];
    if (!targetBank.adjustments) targetBank.adjustments = [];

    // Apply adjustments
    sourceBank.adjustments.push({
        id: Date.now(),
        amount: -amount,
        currency: sourceBank.currency,
        timestamp: new Date().toISOString()
    });

    targetBank.adjustments.push({
        id: Date.now() + 1,
        amount: convert(amount, sourceBank.currency, targetBank.currency),
        currency: targetBank.currency,
        timestamp: new Date().toISOString()
    });

    saveState();
    closeModal('piggyTransferModal');
    renderPiggyBanks();
    SoundEngine.play('success');
    showAlert(state.language === 'ru' ? 'Перевод выполнен успешно!' : (state.language === 'uk' ? 'Переклад виконано!' : 'Transfer successful!'), 'success');
}

function getFilteredOrdersForStats() {
    const now = new Date();
    let startDate = new Date(0);
    let endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    if (uiState.dateRange === 'today') {
        startDate = new Date();
    } else if (uiState.dateRange === 'yesterday') {
        startDate = new Date();
        startDate.setDate(now.getDate() - 1);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
    } else if (uiState.dateRange === '7') {
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
    } else if (uiState.dateRange === '30') {
        startDate = new Date();
        startDate.setDate(now.getDate() - 30);
    } else if (uiState.dateRange === 'custom') {
        if (uiState.dateStart) startDate = new Date(uiState.dateStart);
        if (uiState.dateEnd) endDate = new Date(uiState.dateEnd);
    }

    startDate.setHours(0, 0, 0, 0);
    return state.orders.filter(o => {
        const d = new Date(o.date);
        return d >= startDate && d <= endDate;
    });
}

function renderStats() {
    const compareMode = document.getElementById('comparePeriod') ? document.getElementById('comparePeriod').value : 'prev_period';

    // 1. Filter Current Period Orders
    const currentOrders = getFilteredOrdersForStats();

    // 2. Calculate Current Totals
    // 2. Calculate Current Totals
    let currTotal = 0;
    let currCount = 0;

    currentOrders.forEach(o => {
        if (o.status === 'paid') {
            currTotal += convert(o.amount, o.currency, state.currency);
            currCount++;
        }
    });

    // 3. Determine Previous Period Date Range
    let prevStart, prevEnd;
    const now = new Date();

    // Determine current range duration to shift back for "prev_period"
    let rangeDurationObj = 0;
    // Helper to get logic dates from uiState or current calculation
    // Simplified: reuse getFiltered to establish current range instructions, then shift
    // Actually, let's just parse logic based on uiState

    let cStart = new Date();
    let cEnd = new Date();

    if (uiState.dateRange === 'today') {
        cStart.setHours(0, 0, 0, 0);
        cEnd.setHours(23, 59, 59, 999);
    } else if (uiState.dateRange === 'yesterday') {
        cStart.setDate(now.getDate() - 1);
        cStart.setHours(0, 0, 0, 0);
        cEnd = new Date(cStart);
        cEnd.setHours(23, 59, 59, 999);
    } else if (uiState.dateRange === '7') {
        cStart.setDate(now.getDate() - 7);
        cStart.setHours(0, 0, 0, 0);
    } else if (uiState.dateRange === '30') {
        cStart.setDate(now.getDate() - 30);
        cStart.setHours(0, 0, 0, 0);
    } else if (uiState.dateRange === 'custom' && uiState.dateStart) {
        cStart = new Date(uiState.dateStart);
        if (uiState.dateEnd) cEnd = new Date(uiState.dateEnd);
    }

    // Calculate previous range based on selection
    if (compareMode === 'day') {
        prevStart = new Date(); prevStart.setDate(now.getDate() - 1); prevStart.setHours(0, 0, 0, 0);
        prevEnd = new Date(prevStart); prevEnd.setHours(23, 59, 59, 999);
    } else if (compareMode === 'week') {
        prevStart = new Date(cStart); prevStart.setDate(prevStart.getDate() - 7);
        prevEnd = new Date(cEnd); prevEnd.setDate(prevEnd.getDate() - 7);
    } else if (compareMode === 'month') {
        prevStart = new Date(cStart); prevStart.setMonth(prevStart.getMonth() - 1);
        prevEnd = new Date(cEnd); prevEnd.setMonth(prevEnd.getMonth() - 1);
    } else {
        // prev_period: Shift by duration
        const dur = cEnd - cStart;
        prevEnd = new Date(cStart.getTime() - 1);
        prevStart = new Date(prevEnd.getTime() - dur);
    }

    // 4. Calculate Previous Totals
    // 4. Calculate Previous Totals
    const prevOrders = state.orders.filter(o => {
        const d = new Date(o.date);
        return d >= prevStart && d <= prevEnd;
    });

    let prevTotal = 0;
    // Only count paid orders for financial stats
    prevOrders.forEach(o => {
        if (o.status === 'paid') {
            prevTotal += convert(o.amount, o.currency, state.currency);
        }
    });

    // We might want to count ALL orders for "Count" or only PAID?
    // User said "Money ... should be counted".
    // Usually conversion rate implies Paid / Total. But simple stats usually track "Sales".
    // Let's count ONLY PAID for simplicity and consistency with "Sales Tracker".
    // If user wants to see "Pending", they look at the list.
    const prevCount = prevOrders.filter(o => o.status === 'paid').length;

    // 5. Render Main Stats
    document.getElementById('statRevenue').textContent = formatMoney(currTotal, state.currency);
    document.getElementById('statCount').textContent = currCount;
    const avg = currCount > 0 ? currTotal / currCount : 0;
    document.getElementById('statAvg').textContent = formatMoney(avg, state.currency);

    // 6. Render Badges & Diff
    renderGrowthBadge('revenueBadge', 'revenueDiff', currTotal, prevTotal, state.currency);
    renderGrowthBadge('countBadge', 'countDiff', currCount, prevCount, '');

    // 7. Heatmap & Forecast (Existing logic preserved/simplified)
    const catMap = {};
    const dateMap = {};
    // Only visualize PAID orders in charts
    currentOrders.forEach(o => {
        if (o.status !== 'paid') return;

        const val = convert(o.amount, o.currency, state.currency);
        catMap[o.category || 'other'] = (catMap[o.category || 'other'] || 0) + val;
        dateMap[o.date] = (dateMap[o.date] || 0) + 1;
    });

    renderHeatmap(dateMap);
    renderDonutChart(catMap, currTotal); // currTotal is already filtered below

    // Pass filtered orders to Line Chart
    const paidOrders = currentOrders.filter(o => o.status === 'paid');
    renderLineChart(paidOrders);
    let forecast = '-';
    if (uiState.dateRange === 'all' || uiState.dateRange === '30' || uiState.dateRange === '7' || uiState.dateRange === 'today' || uiState.dateRange === 'yesterday') {
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const currentDay = now.getDate();

        const monthOrders = state.orders.filter(o => {
            const d = new Date(o.date);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && o.status === 'paid';
        });
        const monthTotal = monthOrders.reduce((acc, o) => acc + convert(o.amount, o.currency, state.currency), 0);

        if (currentDay > 1) {
            const dailyAvg = monthTotal / currentDay;
            const projected = dailyAvg * daysInMonth;
            forecast = formatMoney(projected, state.currency);
        } else {
            forecast = getTranslation('never');
        }
    }
    document.getElementById('statForecast').textContent = forecast;

    renderTopProducts(currentOrders); // filtering inside function
}

function renderTopProducts(orders) {
    const list = document.getElementById('topProductsList');
    if (!list) return;
    list.innerHTML = '';

    // Expose openRenameProductModal to global scope for onclick in HTML string (optional, but cleaner if we adhere to listeners)
    // Actually, we'll attach listeners directly to elements.

    const productMap = {};
    orders.forEach(o => {
        if (o.status !== 'paid') return;
        const val = convert(o.amount, o.currency, state.currency);
        // Normalize: trim whitespace to stack correctly
        const title = (o.title || '').trim();
        if (!title) return; // skip empty
        productMap[title] = (productMap[title] || 0) + val;
    });

    const sorted = Object.entries(productMap)
        .sort((a, b) => b[1] - a[1]);
    // Removed slice to show all products

    if (sorted.length === 0) {
        list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 20px;">${getTranslation('never')}</p>`;
        return;
    }

    sorted.forEach(([title, val], index) => {
        const item = document.createElement('div');
        item.className = 'top-item';
        item.innerHTML = `
            <div class="top-item-info">
                <span class="top-rank">#${index + 1}</span>
                <span class="top-name">${title}</span>
                <i class="fa-solid fa-pen rename-product-btn" style="font-size:10px; color:var(--text-muted); cursor:pointer; margin-left:5px;"></i>
            </div>
            <span class="top-val">${formatMoney(val, state.currency)}</span>
        `;

        // Listener for the pen icon
        const pen = item.querySelector('.fa-pen');
        if (pen) {
            pen.addEventListener('click', (e) => {
                e.stopPropagation();
                openRenameProductModal(title);
            });
        }

        list.appendChild(item);
    });
}

function openRenameProductModal(oldName) {
    document.getElementById('renameOriginalName').value = oldName;
    document.getElementById('renameNewName').value = oldName;
    openModal('renameProductModal');
}

function saveRenamedProduct() {
    const oldName = document.getElementById('renameOriginalName').value;
    const newName = document.getElementById('renameNewName').value.trim();

    if (!newName) {
        showAlert(getTranslation('enter_name'));
        return;
    }

    closeModal('renameProductModal');

    showConfirm(
        `Переименовать все "${oldName}" в "${newName}"?`,
        () => {
            let count = 0;
            state.orders.forEach(o => {
                if ((o.title || '').trim() === oldName) {
                    o.title = newName;
                    count++;
                }
            });

            saveState();
            renderApp();
            showAlert(`Обновлено ${count} заказов.`);
        },
        () => {
            // On Cancel/No: Re-open the rename modal
            openModal('renameProductModal');
        }
    );
}

function showConfirm(message, onYes, onNo = null, yesLabel = 'Да', noLabel = 'Нет') {
    document.getElementById('confirmMessage').textContent = message;
    const okBtn = document.getElementById('confirmOkBtn');
    const cancelBtn = document.getElementById('confirmCancelBtn');

    okBtn.textContent = yesLabel;
    cancelBtn.textContent = noLabel;

    okBtn.onclick = () => {
        if (onYes) onYes();
        closeModal('customConfirmModal');
    };
    cancelBtn.onclick = () => {
        closeModal('customConfirmModal');
        if (onNo) onNo();
    };

    openModal('customConfirmModal');
}

function showPrompt(message, defaultValue, onOk, onCancel) {
    document.getElementById('promptMessage').textContent = message;
    const input = document.getElementById('promptInput');
    input.value = defaultValue || '';
    const okBtn = document.getElementById('promptOkBtn');
    const cancelBtn = document.getElementById('promptCancelBtn');

    okBtn.onclick = () => {
        const val = input.value;
        closeModal('customPromptModal');
        if (onOk) onOk(val);
    };
    cancelBtn.onclick = () => {
        closeModal('customPromptModal');
        if (onCancel) onCancel();
    };

    openModal('customPromptModal');
    setTimeout(() => input.focus(), 100);
}

function showAlert(message) {
    document.getElementById('alertMessage').innerHTML = message.replace(/\n/g, '<br>');
    const okBtn = document.getElementById('alertOkBtn');
    okBtn.onclick = () => closeModal('customAlertModal');
    openModal('customAlertModal');
}

function renderGrowthBadge(badgeId, diffId, curr, prev, suffix) {
    const badge = document.getElementById(badgeId);
    const diffEl = document.getElementById(diffId);
    if (!badge || !diffEl) return;

    let diff = curr - prev;
    let percent = prev === 0 ? (curr > 0 ? 100 : 0) : ((diff / prev) * 100);

    // Cap at 999% for UI sanity
    if (percent > 999) percent = 999;

    const sign = diff >= 0 ? '+' : '';
    const color = diff >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
    const icon = diff >= 0 ? '↗' : '↘';

    badge.style.display = 'inline-block';
    badge.style.color = color;
    badge.style.background = diff >= 0 ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)';
    badge.style.padding = '2px 6px';
    badge.style.borderRadius = '4px';
    badge.style.fontSize = '12px';
    badge.textContent = `${icon} ${sign}${Math.round(percent)}%`;

    const formattedPrev = suffix ? formatMoney(prev, state.currency) : prev;
    const labelPrev = getTranslation('previously');
    diffEl.textContent = `${labelPrev}: ${formattedPrev}`;
}

function renderLineChart(orders) {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    const container = canvas.parentElement;
    const wrapper = container.parentElement;

    // Ensure we have a tooltip element
    let tooltip = wrapper.querySelector('.chart-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        wrapper.appendChild(tooltip);
    }

    // Set canvas dimensions with DPR support
    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = 250;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const dayMap = {};
    orders.forEach(o => {
        const val = convert(o.amount, o.currency, state.currency);
        dayMap[o.date] = (dayMap[o.date] || 0) + val;
    });

    const sortedDates = Object.keys(dayMap).sort();

    if (sortedDates.length === 0) {
        ctx.fillStyle = '#9ba0aa';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(getTranslation('never'), width / 2, height / 2);
        return;
    }

    // For a better visual, if only 1 day, "simulate" a range or just draw a dot
    const vals = Object.values(dayMap);
    const maxVal = Math.max(...vals, 10); // at least 10 for scale
    const minVal = 0;

    const padL = 40; // Left padding for Y axis
    const padR = 20;
    const padT = 20;
    const padB = 30; // Bottom padding for X axis
    const graphW = width - padL - padR;
    const graphH = height - padT - padB;

    const getX = (i) => {
        if (sortedDates.length === 1) return padL + graphW / 2;
        return padL + (i / (sortedDates.length - 1)) * graphW;
    };
    const getY = (val) => padT + graphH - (val / maxVal) * graphH;

    // --- Draw Grid ---
    const isDarkText = document.body.classList.contains('light-theme') || document.body.classList.contains('vk-theme');
    ctx.strokeStyle = isDarkText ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
        const y = padT + (graphH / gridSteps) * i;
        ctx.moveTo(padL, y);
        ctx.lineTo(width - padR, y);

        // Y Labels
        const labelVal = maxVal - (maxVal / gridSteps) * i;
        ctx.fillStyle = isDarkText ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)';
        ctx.font = '10px Inter';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelVal.toFixed(0), padL - 8, y);
    }
    ctx.stroke();

    // --- Draw X Labels ---
    ctx.fillStyle = isDarkText ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
    if (sortedDates.length >= 1) {
        const step = Math.max(1, Math.ceil(sortedDates.length / 5));
        sortedDates.forEach((date, i) => {
            if (i % step === 0 || i === sortedDates.length - 1) {
                ctx.textAlign = 'center';
                const dObj = new Date(date);
                const label = dObj.toLocaleDateString(state.language, { day: '2-digit', month: '2-digit' });
                ctx.fillText(label, getX(i), height - 10);
            }
        });
    }

    // --- Draw Path (Line) ---
    const linePath = new Path2D();
    sortedDates.forEach((date, i) => {
        const x = getX(i);
        const y = getY(dayMap[date]);
        if (i === 0) linePath.moveTo(x, y);
        else linePath.lineTo(x, y);
    });

    // Resolve theme color from CSS variable if it's a named theme
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || state.themeColor;

    // --- Draw Area ---
    if (sortedDates.length > 1) {
        const areaPath = new Path2D(linePath);
        areaPath.lineTo(getX(sortedDates.length - 1), padT + graphH);
        areaPath.lineTo(getX(0), padT + graphH);
        areaPath.closePath();

        const grad = ctx.createLinearGradient(0, padT, 0, padT + graphH);
        grad.addColorStop(0, hexToRgba(themeColor, 0.3));
        grad.addColorStop(1, hexToRgba(themeColor, 0));
        ctx.fillStyle = grad;
        ctx.fill(areaPath);
    }

    // --- Draw Line ---
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke(linePath);

    // --- Interaction Points ---
    const points = sortedDates.map((date, i) => ({
        x: getX(i),
        y: getY(dayMap[date]),
        date: date,
        val: dayMap[date]
    }));

    const drawPoints = (highlightIdx = -1) => {
        points.forEach((p, idx) => {
            ctx.beginPath();
            ctx.fillStyle = idx === highlightIdx ? '#fff' : themeColor;
            ctx.arc(p.x, p.y, idx === highlightIdx ? 6 : 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    };
    drawPoints(); // Initial draw of all points

    // --- Event Listeners for Tooltip ---
    // Remove old listeners to avoid duplicates
    const oldCanvas = canvas;
    const newCanvas = canvas.cloneNode(true);
    oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas); // Replace old canvas with new one to clear listeners

    // Re-get context for the new canvas
    const newCtx = newCanvas.getContext('2d');
    newCtx.scale(dpr, dpr); // Apply DPR again

    // Function to redraw the entire chart (excluding event listeners)
    const redrawChart = (highlightIdx = -1) => {
        newCtx.clearRect(0, 0, width, height); // Clear the new canvas

        // Redraw Grid
        newCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        newCtx.lineWidth = 1;
        newCtx.beginPath();
        for (let i = 0; i <= gridSteps; i++) {
            const y = padT + (graphH / gridSteps) * i;
            newCtx.moveTo(padL, y);
            newCtx.lineTo(width - padR, y);
            const labelVal = maxVal - (maxVal / gridSteps) * i;
            newCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            newCtx.font = '10px Inter';
            newCtx.textAlign = 'right';
            newCtx.textBaseline = 'middle';
            newCtx.fillText(labelVal.toFixed(0), padL - 8, y);
        }
        newCtx.stroke();

        // Redraw X Labels
        newCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        if (sortedDates.length >= 1) {
            const step = Math.max(1, Math.ceil(sortedDates.length / 5));
            sortedDates.forEach((date, i) => {
                if (i % step === 0 || i === sortedDates.length - 1) {
                    newCtx.textAlign = 'center';
                    const dObj = new Date(date);
                    const label = dObj.toLocaleDateString(state.language, { day: '2-digit', month: '2-digit' });
                    newCtx.fillText(label, getX(i), height - 10);
                }
            });
        }

        // Redraw Area
        if (sortedDates.length > 1) {
            const areaPath = new Path2D(linePath);
            areaPath.lineTo(getX(sortedDates.length - 1), padT + graphH);
            areaPath.lineTo(getX(0), padT + graphH);
            areaPath.closePath();
            const grad = newCtx.createLinearGradient(0, padT, 0, padT + graphH);
            grad.addColorStop(0, hexToRgba(themeColor, 0.3));
            grad.addColorStop(1, hexToRgba(themeColor, 0));
            newCtx.fillStyle = grad;
            newCtx.fill(areaPath);
        }

        // Redraw Line
        newCtx.strokeStyle = themeColor;
        newCtx.lineWidth = 3;
        newCtx.lineJoin = 'round';
        newCtx.lineCap = 'round';
        newCtx.stroke(linePath);

        // Redraw Points with highlight
        points.forEach((p, idx) => {
            newCtx.beginPath();
            newCtx.fillStyle = idx === highlightIdx ? '#fff' : themeColor;
            newCtx.arc(p.x, p.y, idx === highlightIdx ? 6 : 4, 0, Math.PI * 2);
            newCtx.fill();
            newCtx.strokeStyle = '#fff';
            newCtx.lineWidth = 2;
            newCtx.stroke();
        });
    };

    // Initial draw on the new canvas
    redrawChart();

    newCanvas.addEventListener('mousemove', (e) => {
        const rect = newCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        let nearest = null;
        let minDist = 30;
        let nearestIdx = -1;

        points.forEach((p, idx) => {
            const dist = Math.abs(p.x - mouseX);
            if (dist < minDist) {
                minDist = dist;
                nearest = p;
                nearestIdx = idx;
            }
        });

        if (nearest) {
            redrawChart(nearestIdx); // Redraw with highlight
            tooltip.style.display = 'block';
            // Adjust for padding of chart-container
            tooltip.style.left = (nearest.x + 0) + 'px';
            tooltip.style.top = (nearest.y + 10) + 'px'; // +10 because it's in canvas-wrapper

            const dObj = new Date(nearest.date);
            const dateStr = dObj.toLocaleDateString(state.language, { day: 'numeric', month: 'long' });
            tooltip.innerHTML = `
                <div class="tooltip-date">${dateStr}</div>
                <div class="tooltip-val">${formatMoney(nearest.val, state.currency)}</div>
            `;
        } else {
            redrawChart(); // Redraw without highlight
            tooltip.style.display = 'none';
        }
    });

    newCanvas.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
}

function hexToRgba(hex, alpha) {
    if (!hex) return `rgba(114, 137, 218, ${alpha})`;
    if (hex.startsWith('linear-gradient')) return `rgba(114, 137, 218, ${alpha})`;
    if (hex.startsWith('rgb')) {
        if (hex.startsWith('rgba')) return hex;
        return hex.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
    }
    if (!hex.startsWith('#')) return `rgba(114, 137, 218, ${alpha})`;

    let c = hex.substring(1).split('');
    if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
}

function renderDonutChart(catMap, total) {
    const chart = document.getElementById('categoryChart');
    const legend = document.getElementById('categoryLegend');
    legend.innerHTML = '';

    if (total === 0) {
        chart.style.background = `conic-gradient(#2b303b 0deg 360deg)`;
        return;
    }

    let currentDeg = 0;
    let gradients = [];

    for (const [cat, val] of Object.entries(catMap)) {
        if (val === 0) continue;
        const catInfo = CATEGORIES[cat] || CATEGORIES['other'];
        const color = catInfo.color;
        const pct = val / total;
        const deg = pct * 360;
        gradients.push(`${color} ${currentDeg}deg ${currentDeg + deg}deg`);
        currentDeg += deg;

        const li = document.createElement('div');
        li.className = 'legend-item';
        li.innerHTML = `<div class="legend-dot" style="background:${color}"></div> ${getTranslation(catInfo.key)} (${Math.round(pct * 100)}%)`;
        legend.appendChild(li);
    }
    chart.style.background = `conic-gradient(${gradients.join(', ')})`;
}

function renderHeatmap() {
    const container = document.getElementById('calendarHeatmap');
    if (!container) return;
    container.innerHTML = '';

    const viewDate = uiState.heatmapViewDate || new Date();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    // Update Label
    const monthLabel = document.getElementById('currentHeatmapMonth');
    if (monthLabel) {
        const months = getTranslation('months');
        monthLabel.textContent = `${months[month]} ${year}`;
    }

    // Headers (Mon-Sun)
    const daysHeader = getTranslation('days_short');
    daysHeader.forEach(d => {
        const div = document.createElement('div');
        div.className = 'heatmap-header-day';
        div.textContent = d;
        container.appendChild(div);
    });

    // First day of viewed month
    const firstDay = new Date(year, month, 1);
    // Last day of viewed month
    const lastDay = new Date(year, month + 1, 0);

    // Calculate padding (Monday based. Su=0, Mo=1... we want Mo=0)
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    // Pre-pad with empty cells
    for (let i = 0; i < startOffset; i++) {
        const div = document.createElement('div');
        div.className = 'heatmap-day empty-placeholder';
        container.appendChild(div);
    }

    // Determine max for scaling
    const daysInMonth = lastDay.getDate();
    const monthCounts = {};
    const monthProfit = {};
    let maxCount = 0;

    state.orders.forEach(o => {
        const d = new Date(o.date);
        if (d.getFullYear() === year && d.getMonth() === month && o.status === 'paid') {
            const dayNum = d.getDate();
            monthCounts[dayNum] = (monthCounts[dayNum] || 0) + 1;
            monthProfit[dayNum] = (monthProfit[dayNum] || 0) + convert(o.amount, o.currency, state.currency);
            if (monthCounts[dayNum] > maxCount) maxCount = monthCounts[dayNum];
        }
    });

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    // Render Days
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement('div');
        const c = monthCounts[i] || 0;

        // Level Calc
        let level = 'l0';
        if (c > 0) level = 'l1';
        if (c > maxCount * 0.3 && c > 1) level = 'l2';
        if (c > maxCount * 0.6 && c > 2) level = 'l3';
        if (c > maxCount * 0.8 && c > 4) level = 'l4';

        div.className = `heatmap-day ${level}`;

        const profit = monthProfit[i] || 0;
        const count = monthCounts[i] || 0;

        div.innerHTML = `
            <span class="heatmap-day-num">${i}</span>
            ${count > 0 ? `
                <div class="heatmap-day-stats">
                    <span class="heatmap-profit">${formatMoney(profit, state.currency)}</span>
                    <span class="heatmap-count">${count}📦</span>
                </div>
            ` : ''}
        `;

        if (c > 0) div.title = `${i}.${month + 1}.${year}: ${c} заказов (${formatMoney(profit, state.currency)})`;

        // Highlight today
        if (isCurrentMonth && i === today.getDate()) {
            div.style.border = '2px solid white';
        }

        container.appendChild(div);
    }
}

function changeHeatmapMonth(delta) {
    const cur = uiState.heatmapViewDate || new Date();
    const next = new Date(cur.getFullYear(), cur.getMonth() + delta, 1);
    uiState.heatmapViewDate = next;
    renderHeatmap();
}





// --- Matrix Theme Effect ---
// --- Matrix Theme Effect ---
let matrixInterval;
function startMatrixEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.style.display = 'block';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Katakana + Latin + Digits
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const letters = katakana + latin + nums;

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        // Translucent black background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));

            // Randomly white (glint) or green
            const isGlint = Math.random() > 0.98;
            ctx.fillStyle = isGlint ? '#fff' : '#0F0';

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop if off screen or randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(draw, 35); // Approx 30 FPS

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function stopMatrixEffect() {
    if (matrixInterval) clearInterval(matrixInterval);
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Hide it again
        canvas.style.display = 'none';

        // Also force style update just in case strict CSS doesn't hide it
        canvas.style.display = 'none';
    }
}

// --- Drag and Drop Logic ---
let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    this.classList.remove('drag-over');

    if (dragSrcEl !== this) {
        const srcId = parseInt(dragSrcEl.dataset.id);
        const targetId = parseInt(this.dataset.id);

        // Reorder state.notes
        const srcIndex = state.notes.findIndex(n => n.id === srcId);
        const targetIndex = state.notes.findIndex(n => n.id === targetId);

        if (srcIndex > -1 && targetIndex > -1) {
            const [movedNote] = state.notes.splice(srcIndex, 1);
            state.notes.splice(targetIndex, 0, movedNote);
            saveState();
            renderNotes();
        }
    }
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    this.classList.remove('drag-over');
    const items = document.querySelectorAll('.note-card');
    items.forEach(item => {
        item.classList.remove('drag-over');
        item.classList.remove('dragging');
    });
}

// --- Sakura Theme Effect ---
let sakuraAnimationId;
function startSakuraEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals = [];
    const numPetals = 40;

    function createPetal() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 5,
            speedY: Math.random() * 1.2 + 0.8,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            flip: Math.random() * Math.PI,
            flipSpeed: Math.random() * 0.03 + 0.01,
            color: Math.random() > 0.6 ? '#ffb7b2' : (Math.random() > 0.5 ? '#ffc6c6' : '#fad0c4'),
            oscillation: Math.random() * 0.02,
            phase: Math.random() * Math.PI * 2
        };
    }

    for (let i = 0; i < numPetals; i++) {
        petals.push(createPetal());
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        petals.forEach((p, i) => {
            p.y += p.speedY;
            p.x += Math.sin(p.y * 0.02 + p.phase) + p.speedX * 0.5;
            p.rotation += p.rotationSpeed;
            p.flip += p.flipSpeed;

            if (p.y > canvas.height + 20) {
                petals[i] = createPetal();
                petals[i].y = -20;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);

            // 3D Flip Scale
            const flipScale = Math.abs(Math.cos(p.flip));
            ctx.scale(1, flipScale);

            // Shadow for depth
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetY = 2;

            // Draw Realistic Petal shape
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.85;

            // Advanced Petal Path
            const s = p.size;
            ctx.moveTo(0, s);
            ctx.bezierCurveTo(-s * 1.2, s * 0.5, -s * 1.2, -s * 0.5, 0, -s); // Left
            ctx.bezierCurveTo(s * 1.2, -s * 0.5, s * 1.2, s * 0.5, 0, s);  // Right
            ctx.fill();

            // Heart-shaped base detail
            ctx.beginPath();
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = '#cb6e76';
            ctx.arc(0, -s, s * 0.3, 0, Math.PI);
            ctx.fill();

            // Center vein
            ctx.beginPath();
            ctx.globalAlpha = 0.3;
            ctx.moveTo(0, s);
            ctx.lineTo(0, -s * 0.5);
            ctx.strokeStyle = '#cb6e76';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.restore();
        });

        sakuraAnimationId = requestAnimationFrame(draw);
    }

    // Cancel any previous animation
    if (sakuraAnimationId) cancelAnimationFrame(sakuraAnimationId);
    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function stopSakuraEffect() {
    if (sakuraAnimationId) cancelAnimationFrame(sakuraAnimationId);
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Only hide if we aren't switching to matrix (handled by applyTheme logic order, but being safe)
        // applyTheme calls this BEFORE startMatrix if switching, but startMatrix handles display:block.
        // If switching TO this, applyTheme calls stopMatrix THEN startSakura.
        // So safe to hide here.
        canvas.style.display = 'none';
    }
}

// --- Cyberpunk Theme Effect ---
let cyberpunkAnimationId;
function startCyberpunkEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block';

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const lines = [];

    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 0.5 + 0.2,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    // Static horizontal scanline Y positions
    for (let i = 0; i < 5; i++) {
        lines.push({
            y: Math.random() * canvas.height,
            speed: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '#fcee0a' : '#00f3ff'
        });
    }

    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 10, 0.2)'; // Deep black trail
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // --- Digital Scanlines (Moving) ---
        lines.forEach(l => {
            ctx.beginPath();
            ctx.strokeStyle = l.color;
            ctx.globalAlpha = 0.1;
            ctx.lineWidth = 1;
            ctx.moveTo(0, l.y);
            ctx.lineTo(canvas.width, l.y);
            ctx.stroke();

            l.y += l.speed;
            if (l.y > canvas.height) {
                l.y = -10;
                l.speed = Math.random() * 2 + 1;
            }
        });

        // --- Data Nodes (Slow Drift) ---
        particles.forEach(p => {
            ctx.fillStyle = '#00f3ff';
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Subtle glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';

            p.y += p.speedY;
            if (p.y > canvas.height) p.y = -10;
        });
        ctx.shadowBlur = 0; // Reset shadow

        // --- Random Glitch Bursts ---
        if (Math.random() > 0.98) {
            const gy = Math.random() * canvas.height;
            const gh = Math.random() * 5 + 1;
            ctx.fillStyle = 'rgba(255, 0, 255, 0.2)';
            ctx.fillRect(0, gy, canvas.width, gh);
        }

        // --- Binary "Ghost" Text ---
        if (Math.random() > 0.95) {
            ctx.font = '10px Oxanium';
            ctx.fillStyle = '#fcee0a';
            ctx.globalAlpha = 0.3;
            const text = Math.random().toString(2).substr(2, 10);
            ctx.fillText(text, Math.random() * canvas.width, Math.random() * canvas.height);
        }

        cyberpunkAnimationId = requestAnimationFrame(draw);
    }

    if (cyberpunkAnimationId) cancelAnimationFrame(cyberpunkAnimationId);
    draw();
}

function stopCyberpunkEffect() {
    if (cyberpunkAnimationId) cancelAnimationFrame(cyberpunkAnimationId);
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
    }
}

// --- Gold Theme Effect ---
let goldAnimationId;
function startGoldEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block';

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 0.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.5 ? '#bf953f' : '#fcf6ba'
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();

            // Draw a diamond/sparkle shape
            ctx.moveTo(p.x, p.y - p.size);
            ctx.lineTo(p.x + p.size, p.y);
            ctx.lineTo(p.x, p.y + p.size);
            ctx.lineTo(p.x - p.size, p.y);
            ctx.closePath();
            ctx.fill();

            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;

            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y > canvas.height) p.y = -10;
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
        });

        goldAnimationId = requestAnimationFrame(draw);
    }

    if (goldAnimationId) cancelAnimationFrame(goldAnimationId);
    draw();
}

function stopGoldEffect() {
    if (goldAnimationId) cancelAnimationFrame(goldAnimationId);
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
    }
}


function showPremiumModal(themeKey) {
    // This function is now deprecated and can be removed or left as a stub
}

// Ad Rotation Logic
function initAdRotation() {
    const slides = document.querySelectorAll('.ad-slide');
    if (slides.length <= 1) return;

    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 40000); // 40 seconds
}

document.addEventListener('DOMContentLoaded', initAdRotation);
