Ext.define('MyExtGenApp.model.LoginGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'age', type: 'number' },
    ]
});