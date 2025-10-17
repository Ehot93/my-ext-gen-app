Ext.define('MyExtGenApp.view.login.LoginViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.loginviewmodel',
    requires: ['MyExtGenApp.util.Constants'],

    data: {
        showTable: false,
        showEdit: false
    },

    stores: {
        people: {
            fields: [
                { name: 'id', type: 'int' },
                { name: 'name', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'food', type: 'string' }
            ],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: MyExtGenApp.util.Constants.API_ENDPOINTS.USERS,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});