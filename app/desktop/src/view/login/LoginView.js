Ext.define('MyExtGenApp.view.login.LoginView', {
    extend: 'Ext.form.Panel',
    xtype: 'loginview',
    cls: 'loginview',
    requires: ['MyExtGenApp.util.Constants'],
    layout: { type: 'vbox', align: 'stretch' },
    controller: { type: 'loginviewcontroller' },
    viewModel: { type: 'loginviewmodel' },

    items: [{
        xtype: 'formpanel',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Username',
                name: 'username',
                labelAlign: 'top',
                required: true,
                validators: {
                    type: 'length',
                    min: 3,
                    max: 50
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Password',
                name: 'password',
                labelAlign: 'top',
                inputType: 'password',
                required: true,
                validators: {
                    type: 'length',
                    min: 6,
                    max: 100
                }
            },
            {
                xtype: 'checkboxfield',
                label: 'Save me',
                name: 'remember'
            }
        ],
        buttons: [{
            xtype: 'button',
            text: 'Login',
            ui: 'action',
            handler: 'onLogin'
        }]
    }, {
        xtype: 'grid',
        title: 'Пользователи',
        flex: 1,
        scrollable: true,
        listeners: {
            itemtap: 'onEditOpen'
        },
        bind: {
            hidden: '{!showTable}',
            store: '{people}'
        },
        columns: [
            { text: 'Имя', dataIndex: 'name', flex: 1 },
            { text: 'Email', dataIndex: 'email', flex: 1 },
            { text: 'Статус', dataIndex: 'status', flex: 1 },
            { text: 'Любимая еда', dataIndex: 'food', flex: 1 }
        ]
    }, {
        xtype: 'dialog',
        reference: 'editDialog',
        title: 'Редактирование записи',
        modal: true,
        bind: { hidden: '{!showEdit}' },
        closable: true,
        maxWidth: 500,
        layout: 'fit',
        items: [{
            xtype: 'formpanel',
            reference: 'editForm',
            bodyPadding: 10,
            items: [{
                xtype: 'container',
                padding: 20,
                layout: 'vbox',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        label: 'Имя',
                        required: true,
                        validators: {
                            type: 'length',
                            min: 2,
                            max: 50
                        }
                    },
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: 'Email',
                        required: true,
                        validators: 'email'
                    },
                    {
                        xtype: 'combobox',
                        label: 'Статус',
                        name: 'status',
                        queryMode: 'local',
                        displayField: 'text',
                        valueField: 'value',
                        required: true,
                        store: MyExtGenApp.util.Constants.USER_STATUSES
                    },
                    {
                        xtype: 'textfield',
                        name: 'food',
                        label: 'Любимая еда',
                        validators: {
                            type: 'length',
                            max: 100
                        }
                    }
                ]
            }],
            buttons: [
                { text: 'Сохранить', ui: 'action', handler: 'onEditSave' },
                { text: 'Отмена', handler: 'onEditCancel' }
            ]
        }]
    }]
});