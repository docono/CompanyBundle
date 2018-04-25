pimcore.registerNS("pimcore.plugin.docono_company.times.form");
pimcore.plugin.docono_company.times.form = Class.create({

    initialize: function (id) {
        this.id = id;
    },

    getPanel: function () {
        var me = this;

        this.formPanel = Ext.create('Ext.form.Panel', {
            region: 'center',
            layout: 'hbox',
            title: t('docono_company.times'),
            id: 'times_form_' + this.id,
            iconCls: 'docono_icon_times',
            autoScroll: true,
            defaults: {
                xtype: 'fieldset',
                margin: '20 0 20 20'
            },
            items: [
                this.getTimesPanel(),
                {
                    title: t('docono_company.holidays'),
                    name: 'holidays',
                }
            ]
        });

        return this.formPanel;
    },

    getTimesPanel: function() {
        this.timesFieldset = Ext.create('Ext.form.FieldSet', {
            title: t('docono_company.opening_times'),
            name: 'times',
            layout: {
                type: 'table',
                columns: 2
            },
            defaults: {
                xtype: 'timefield',
                format: 'H:i',
                increment: '30',
                margin: '5 0 10 0'
            },
            items: [
                {
                    xtype: 'checkbox',
                    colspan: 2,
                    name: 'lunchbreak',
                    boxLabel: t('docono_company.opening_times.lunchbreak'),
                    margin: '0 0 10',
                    listeners: {
                        change: function(checkbox, newValue, oldValue, eOpts) {
                            var fieldsets = checkbox.up('fieldset').query('fieldset');
                            Ext.each(fieldsets, function(element) {
                                element.toggle();
                            });
                        }
                    }
                }
            ]
        });

        this.addDayFields('monday');
        this.addDayFields('tuesday');
        this.addDayFields('wednesday');
        this.addDayFields('thursday');
        this.addDayFields('friday');
        this.addDayFields('saturday');
        this.addDayFields('sunday');

        return this.timesFieldset;
    },

    addDayFields: function(day) {
        this.timesFieldset.add([
            {
                xtype: 'label',
                text: t(day.charAt(0).toUpperCase() + day.slice(1)),
                cls: 'day',
                cellCls: 'day-limiter'
            }, {
                xtype: 'checkboxfield',
                name: day + '[closed]',
                boxLabel: t('docono_company.opening_times.closed'),
                cellCls: 'day-limiter',
                margin: 0
            },{
                name: day + '[open]',
                margin: '5 20 10 0',
                emptyText: t('docono_company.opening_times.opening'),
            }, {
                name: day + '[close]',
                emptyText: t('docono_company.opening_times.closing')
            }, {
                xtype: 'fieldset',
                name: 'pm_times',
                border: false,
                cls: 'pm-time',
                margin: 0,
                padding: 0,
                colspan: 2,
                layout: {
                    type: 'table',
                    columns: 2
                },
                collapsed: true,
                defaults: {
                    xtype: 'timefield',
                    format: 'H:i',
                    increment: '30',
                    margin: '0 0 10'
                },
                items: [
                    {
                        name: day + '[open_pm]',
                        margin: '0 20 10 0',
                        emptyText: t('docono_company.opening_times.opening'),
                    }, {
                        name: day + '[close_pm]',
                        emptyText: t('docono_company.opening_times.closing')
                    }
                ]
            }
        ]);
    }
});