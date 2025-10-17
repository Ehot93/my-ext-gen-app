Ext.define('MyExtGenApp.view.login.LoginViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginviewcontroller',
    requires: [
        'Ext.util.LocalStorage',
        'MyExtGenApp.util.Constants'
    ],

    init: function () {
        console.log('ready');
        //создаем exrjs localStorage с индексом MyExtGenApp и проверяем что есть в браузерном
        this.storage = new Ext.util.LocalStorage({ id: 'MyExtGenApp' });
        this.onCheckLS();
    },

    onCheckLS: function () {
        var usernameField = this.getView().down('textfield[name=username]');
        var passwordField = this.getView().down('textfield[name=password]');

        var storedUsername = this.storage && this.storage.getItem('username');
        var storedPassword = this.storage && this.storage.getItem('password');

        if (storedUsername) {
            usernameField.setValue(storedUsername);
        }
        if (storedPassword) {
            passwordField.setValue(storedPassword);
        }
    },

    onLogin: function () {
        var form = this.getView().down('formpanel');

        if (!form.isValid()) {
            Ext.Msg.alert('Ошибка валидации', MyExtGenApp.util.Constants.MESSAGES.VALIDATION_ERROR);
            return;
        }

        var username = form.down('textfield[name=username]').getValue();
        var password = form.down('textfield[name=password]').getValue();
        var remember = form.down('checkboxfield[name=remember]').getChecked();
        const vm = this.getViewModel();

        //console.log(username, password, remember);

        if (remember) {
            console.log('save');
            this.storage.setItem('username', username);
            this.storage.setItem('password', password);
        } else {
            this.storage.removeItem('username');
            this.storage.removeItem('password');
        }

        if (username && password) {
            //специально 2 рзных подхода, похожих на условный рендер
            vm.set('showTable', true);
            form.setHidden(true);
            Ext.toast({
                message: MyExtGenApp.util.Constants.MESSAGES.LOGIN_SUCCESS,
                timeout: 2000,
                align: 'top'
            });
        } else {
            Ext.toast({
                message: MyExtGenApp.util.Constants.MESSAGES.LOGIN_ERROR,
                timeout: 3000,
                align: 'top'
            });
        }
    },

    onEditOpen: function (grid, location, b, currentRow) {
        if (!currentRow) { return; }
        var store = this.getViewModel().getStore('people');
        var record = null;

        if (currentRow.data && store) {
            if (currentRow.data.email) {
                record = store.findRecord('email', currentRow.data.email, 0);
                console.log(record);
            }
            if (!record && currentRow.data.name) {
                record = store.findRecord('name', currentRow.data.name, 0);
                console.log(record);
            }
        }

        if (!record) { return; }

        var dialog = this.lookup('editDialog');
        var form = this.lookup('editForm');
        form.reset();
        form.setValues(record.getData());
        dialog._editingRecord = record;

        const vm = this.getViewModel();
        vm.set('showEdit', true);
    },

    onEditCancel: function () {
        const vm = this.getViewModel();
        vm.set('showEdit', false);
    },

    onEditSave: function () {
        const vm = this.getViewModel();
        var dialog = this.lookup('editDialog');
        var form = this.lookup('editForm');

        if (!form.isValid()) {
            Ext.Msg.alert('Ошибка валидации', MyExtGenApp.util.Constants.MESSAGES.VALIDATION_ERROR);
            return;
        }

        var record = dialog && dialog._editingRecord;
        if (!form || !record) {
            vm.set('showEdit', false);
            return;
        }

        var values = form.getValues();

        try {
            record.set(values);
            Ext.Msg.alert('Успех', MyExtGenApp.util.Constants.MESSAGES.SAVE_SUCCESS);
            vm.set('showEdit', false);
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            Ext.Msg.alert('Ошибка', MyExtGenApp.util.Constants.MESSAGES.SAVE_ERROR);
        }
    }
});