pimcore.registerNS("pimcore.plugin.docono_company.information.form");
pimcore.plugin.docono_company.information.form = Class.create({

    initialize: function (id) {
        this.id = id;
    },

    getPanel: function () {
        var me = this;

        this.formPanel = Ext.create('Ext.form.Panel', {
            region: 'center',
            layout: 'hbox',
            title: t('docono_company.information'),
            id: 'information_form_' + this.id,
            iconCls: 'docono_icon_info',
            autoScroll: true,
            defaults: {
                xtype: 'fieldset',
                margin: '20 0 20 20'
            },
            items: [{
                xtype: 'panel',
                layout: 'vbox',
                defaults: {
                    xtype: 'fieldset'
                },
                items: [{
                    title: t('docono_company.company'),
                    name: 'company',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            name: 'company[name]',
                            fieldLabel: t('docono_company.company.name')
                        }, {
                            name: 'company[address]',
                            fieldLabel: t('docono_company.company.address')
                        }, {
                            name: 'company[town]',
                            fieldLabel: t('docono_company.company.town')
                        }, {
                            name: 'company[postalcode]',
                            fieldLabel: t('docono_company.company.postal_code')
                        },  {
                            name: 'company[region]',
                            fieldLabel: t("docono_company.company.region"),
                            emptyText: 'OW'
                        },{
                            xtype: 'combo',
                            name: 'company[country]',
                            store: new pimcore.plugin.docono_company.store.country().getStore(),
                            fieldLabel: t("docono_company.company.country"),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                        }, {
                            name: 'company[phone]',
                            fieldLabel: t('docono_company.company.telephone')
                        }, {
                            name: 'company[fax]',
                            fieldLabel: t('docono_company.company.fax')
                        }, {
                            vtype: 'email',
                            name: 'company[email]',
                            fieldLabel: t('docono_company.company.email'),
                            emptyText: 'hello@docono.io'
                        }, {
                            xtype: 'textarea',
                            name: 'company[description]',
                            labelAlign: 'top',
                            width: 275,
                            fieldLabel: t("docono_company.company.description"),
                        }
                    ]
                }]
            },
                this.getTimesPanel(),
            {
                title: t('docono_company.social_media'),
                name: 'socialmedia',
                layout: {
                    type: 'vbox'
                },
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                    {
                        name: 'socialmedia[linkedin]',
                        fieldLabel: 'linkedIn',
                        emptyText: 'http://'
                    }, {
                        name: 'socialmedia[xing]',
                        fieldLabel: 'Xing',
                        emptyText: 'http://'
                    }, {
                        name: 'socialmedia[facebook]',
                        fieldLabel: 'facebook',
                        emptyText: 'http://'
                    }, {
                        name: 'socialmedia[googleplus]',
                        fieldLabel: 'Google+',
                        emptyText: 'http://'
                    }, {
                        name: 'socialmedia[twitter]',
                        fieldLabel: 'twitter',
                        emptyText: 'http://'
                    }, {
                        name: 'socialmedia[instagram]',
                        fieldLabel: 'instagram',
                        emptyText: 'http://'
                    }, {
                        name: 'socialmedia[pinterest]',
                        fieldLabel: 'pinterest',
                        emptyText: 'http://'
                    }, {
                        name: 'socialmedia[youtube]',
                        fieldLabel: 'youtube',
                        emptyText: 'http://'
                    }, {
                        name: 'socialmedia[vimeo]',
                        fieldLabel: 'vimeo',
                        emptyText: 'http://'
                    },
                ]
            }]
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