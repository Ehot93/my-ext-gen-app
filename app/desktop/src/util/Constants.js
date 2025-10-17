Ext.define('MyExtGenApp.util.Constants', {
    singleton: true,

    USER_STATUSES: [
        { value: 'Активный', text: 'Активный' },
        { value: 'Неактивный', text: 'Неактивный' },
        { value: 'Пассивный', text: 'Пассивный' }
    ],

    API_ENDPOINTS: {
        USERS: 'resources/people.json'
    },

    VALIDATION_RULES: {
        NAME_MIN_LENGTH: 2,
        NAME_MAX_LENGTH: 50,
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    MESSAGES: {
        VALIDATION_ERROR: 'Пожалуйста, заполните все обязательные поля корректно',
        SAVE_SUCCESS: 'Данные успешно сохранены',
        SAVE_ERROR: 'Не удалось сохранить изменения',
        LOGIN_ERROR: 'Неверное имя пользователя или пароль',
        LOGIN_SUCCESS: 'Вход выполнен успешно'
    }
});
