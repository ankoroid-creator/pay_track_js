const expenseTracker = {
    expenses: [], // Массив расходов 
    nextId: 1,

    // 7. Проверка некорректного ввода (Валидация)
    _validate(title, amount, category) {
        if (!title || !category) return "Название и категория обязательны";
        if (typeof amount !== 'number' || amount <= 0) return "Сумма должна быть положительным числом";
        return null;
    },

    // 1. Добавление расхода
    addExpense(title, amount, category) {
        const error = this._validate(title, amount, category);
        if (error) return console.log(`Ошибка: ${error}`);

        const expense = {
            id: this.nextId++,
            title: title,
            amount: amount,
            category: category
        };
        this.expenses.push(expense);
        console.log(`Добавлено: ${title} (${amount})`);
        return expense;
    },

    // 2. Вывод всех расходов
    printAllExpenses() {
        console.log("\n--- Список расходов ---");
        if (this.expenses.length === 0) return console.log("Пусто");
        this.expenses.forEach(e => console.log(`ID:${e.id} | ${e.title} | ${e.amount} | ${e.category}`));
        console.log("-----------------------\n");
    },

    // 3. Подсчёт общего баланса
    getTotalAmount() {
        const total = this.expenses.reduce((sum, e) => sum + e.amount, 0);
        console.log(`ЧЕК: Всего потрачено ${total}`);
        return total;
    },

    // 4. Фильтрация по категории
    getExpensesByCategory(category) {
        const filtered = this.expenses.filter(e => e.category === category);
        const sum = filtered.reduce((s, e) => s + e.amount, 0);
        
        console.log(`Категория "${category}": найдено ${filtered.length} расходов на сумму ${sum}`);
        return filtered;
    },

    // 5. Поиск расхода + добавление дополнительной строки (заметки)
    findExpenseByTitle(searchString, note = null) {
        const found = this.expenses.find(e => e.title.includes(searchString));
        if (!found) return console.log(`Не найдено: "${searchString}"`);

        console.log(`Найдено: ${found.title} (${found.amount})`);
        
        // Возможность добавить дополнительную строку
        if (note) {
            found.note = note;
            console.log(`Добавлена заметка: "${note}"`);
        }
        return found;
    },

    // 7.1. Удаление расхода по id
    deleteExpense(id) {
        const len = this.expenses.length;
        this.expenses = this.expenses.filter(e => e.id !== id);
        console.log(this.expenses.length < len ? `ID ${id} удален` : `ID ${id} не найден`);
    },

    // 7.2. Статистика по категориям
    getStats() {
        const stats = {};
        this.expenses.forEach(e => stats[e.category] = (stats[e.category] || 0) + e.amount);
        console.log("\nСтатистика:");
        for (let cat in stats) console.log(`${cat}: ${stats[cat]}₽`);
        console.log("");
    }
};


// 1. Добавление 
expenseTracker.addExpense("Обед", 500, "Еда");
expenseTracker.addExpense("Такси", 300, "Транспорт");
expenseTracker.addExpense("Продукты", 1500, "Еда");
expenseTracker.addExpense("", 100, "Тест"); // Ошибка валидации

// 2. Вывод всех
expenseTracker.printAllExpenses();

// 3. Общий баланс
expenseTracker.getTotalAmount();

// 4. Фильтрация
expenseTracker.getExpensesByCategory("Еда");

// 5. Поиск + заметка
expenseTracker.findExpenseByTitle("Такси", "Поездка в дождь");

// 7.1. Удаление
expenseTracker.deleteExpense(2);

// 7.2. Статистика
expenseTracker.getStats();

// Финальный список
expenseTracker.printAllExpenses();