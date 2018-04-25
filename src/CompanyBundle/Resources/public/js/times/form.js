pimcore.registerNS("pimcore.plugin.docono_company.times.form");
pimcore.plugin.docono_company.times.form = Class.create({
    holidayId: 0,

    initialize: function (id) {
        this.id = id;
    },

    getPanel: function () {
        var me = this;

        this.formPanel = Ext.create('Ext.form.Panel', {
            id: 'times_form_' + this.id,
            region: 'center',
            layout: 'hbox',
            title: t('docono_company.times'),
            iconCls: 'docono_icon_times',
            autoScroll: true,
            defaults: {
                margin: '20 20 20 20'
            },
            items: [
                this.getTimesPanel(),
                this.getHolidayPanel()
            ]
        });

        return this.formPanel;
    },

    getHolidayPanel: function() {
        this.holidayPanel = Ext.create('Ext.form.FieldSet', {
            title: t('docono_company.holidays'),
            name: 'holiday',
            flex: 1,
            items: [{
                xtype: 'fieldset',
                border: false,
                style: {
                    padding: 0,
                    border: 'none !important'
                },
                items: {
                    xtype: 'button',
                    text: t('docono_company.holidays.add'),
                    iconCls: 'docono_icon_add',
                    cls: 'docono_style',
                    handler: function() {
                        this.addNewHoliday();
                    }.bind(this)
                }
            }]
        });

        return this.holidayPanel;
    },

    addNewHoliday: function(data) {
        var fieldName = 'holiday_' + this.holidayId;

        if(data === undefined) {
            data = {
                'name': '',
                'start': '',
                'end': ''
            }
        }

        var holidayFieldset = Ext.create('Ext.form.FieldSet', {
            name: fieldName,
            id: fieldName,
            defaults: {
                xtype: 'datefield',
                allowBlank: false,
                anchor:	"100%"
            },
            items: [{
                xtype: 'textfield',
                name: fieldName + '[name]',
                fieldLabel: t('docono_company.holidays.name'),
                value: data['name']
            }, {
                name: fieldName + '[start]',
                fieldLabel: t('docono_company.holidays.start'),
                value: data['start'],
                format: 'd.m.Y',
                listeners: {
                    select: function (field, date, eOpts) {
                        var endField = field.nextSibling('datefield[name*=' + fieldName + '\[end\]');
                        endField.setMinValue(date);

                        var curEndDate = endField.getValue();

                        if((curEndDate === null) || (curEndDate < date)) {
                            endField.setValue(date);
                        }
                    }
                }
            }, {
                name: fieldName + '[end]',
                fieldLabel: t('docono_company.holidays.end'),
                value: data['end'],
                format: 'd.m.Y'
            }, {
                xtype: 'button',
                text: t('docono_company.holidays.delete'),
                iconCls: "docono_icon_delete",
                cls: 'clear',
                handler: function() {
                    this.holidayPanel.remove(fieldName);
                }.bind(this)
            }]
        });

        this.holidayId++;

        this.holidayPanel.add(holidayFieldset);
    },

    getTimesPanel: function() {
        this.timesFieldset = Ext.create('Ext.form.FieldSet', {
            title: t('docono_company.opening_times'),
            name: 'times',
            flex: 1,
            layout: {
                type: 'table',
                columns: 2,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            margin: '20 0 20 20',
            defaults: {
                xtype: 'timefield',
                format: 'H:i',
                increment: '30',
                margin: '5 0 10 0',
                columnWidth: '100%'
            },
            items: [
                {
                    xtype: 'checkbox',
                    colspan: 2,
                    name: 'times_lunchbreak',
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
                name: 'times_' + day + '[closed]',
                boxLabel: t('docono_company.opening_times.closed'),
                cellCls: 'day-limiter',
                margin: 0
            },{
                name: 'times_' + day + '[open]',
                margin: '5 20 10 0',
                emptyText: t('docono_company.opening_times.opening'),
                listeners: {
                    change: function (field,  time, oldTime, eOpts) {
                        var endField = field.nextSibling('timefield[name*=times_' + day + '\[close\]');
                        endField.setMinValue(time);

                        curEndTime = endField.getValue();

                        if((curEndTime === null) || (curEndTime < time)) {
                            endField.setValue(Ext.Date.add(time, Ext.Date.HOUR, 1));
                        }
                    }
                }
            }, {
                name: 'times_' + day + '[close]',
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
                    columns: 2,
                    tableAttrs: {
                        style: {
                            width: '100%'
                        }
                    }
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
                        name: 'times_' + day + '[open_pm]',
                        margin: '0 20 10 0',
                        emptyText: t('docono_company.opening_times.opening'),
                        listeners: {
                            change: function (field,  time, oldTime, eOpts) {
                                var endField = field.nextSibling('timefield[name*=times_' + day + '\[close_pm\]');
                                endField.setMinValue(time);

                                curEndTime = endField.getValue();

                                if((curEndTime === null) || (curEndTime < time)) {
                                    endField.setValue(Ext.Date.add(time, Ext.Date.HOUR, 1));
                                }
                            }
                        }
                    }, {
                        name: 'times_' + day + '[close_pm]',
                        emptyText: t('docono_company.opening_times.closing')
                    }
                ]
            }
        ]);
    }
});