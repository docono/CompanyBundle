pimcore.registerNS("pimcore.plugin.docono_company.information.panel");
pimcore.plugin.docono_company.information.panel = Class.create({

    initialize: function (id, name) {
        this.id = id;
        this.name = name;
    },

    getLayout: function () {
        var me = this;

        if (!this.panel) {
            this.informationForm = new pimcore.plugin.docono_company.information.form(this.id);
            this.timesForm = new pimcore.plugin.docono_company.times.form(this.id);
            this.seoForm = new pimcore.plugin.docono_company.seo.form(this.id);

            this.panel = Ext.create('Ext.tab.Panel', {
                id: "docono_company_imformation_panel_" + this.id,
                title: this.name,
                iconCls: "docono_icon_site",
                border: false,
                layout: "fit",
                closable: false,

                items: [
                    this.informationForm.getPanel(),
                    this.timesForm.getPanel(),
                    this.seoForm.getPanel()
                ],

                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    style: {
                        background: 'white'
                    },
                    items: [
                        '->', {
                            xtype: 'button',
                            iconCls: 'docono_icon_save',
                            cls: 'docono_style',
                            text: t('docono_company.save'),
                            handler: function () {
                                var params = Ext.Object.merge({
                                        'site': me.id
                                    },
                                    Ext.getCmp('information_form_' + me.id).getValues(),
                                    Ext.getCmp('times_form_' + me.id).getValues(),
                                    Ext.getCmp('seo_form_' + me.id).getValues()
                                );

                                Ext.Ajax.request({
                                    url: '/admin/company/service/update',
                                    params: params,
                                    method: 'GET',
                                    success: function (xhr) {
                                        pimcore.helpers.loadingHide();
                                        pimcore.helpers.showNotification(t("success"), t("docono_company.message.successful_saved"), "success");
                                    },
                                    failure: function () {
                                        pimcore.helpers.loadingHide();
                                        Ext.MessageBox.show({
                                            title: 'Error',
                                            msg: t('docono_company,nessage.error.updating_data_failed'),
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    },
                                });
                            }
                        }
                    ]
                }]
            });

            this.panel.on("afterrender", function () {
                this.loadMask = new Ext.LoadMask({
                    target: this.panel,
                    msg: t("docono_company.message.please_wait")
                });

                this.loadMask.show();

                Ext.Ajax.request({
                    url: '/admin/company/service/get',
                    method: 'GET',
                    params: {site: me.id},
                    success: function (xhr, opts) {
                        try {
                            var data = Ext.decode(xhr.responseText);

                            Ext.Object.each(data.data, function(section, data) {
                                var fieldset = me.panel.query('[name=' + section + ']')[0];

                                if(section == 'holiday') {
                                    Ext.Object.each(data, function (key, data) {
                                        me.timesForm.addNewHoliday(data);
                                    });
                                } else {
                                    Ext.Object.each(data, function (key, value) {
                                        if(Ext.isArray(value) || Ext.isObject(value)) {
                                            Ext.Object.each(value, function (subkey, subvalue) {
                                                if ((field = fieldset.query('[name*=' + section + '_' + key + '\[' + subkey + '\]')[0]) !== undefined) {
                                                    field.setValue(subvalue);
                                                }
                                            });
                                        } else{
                                            if((field = fieldset.query('[name*=' + key + ']')[0]) !== undefined) {
                                                field.setValue(value);
                                            }
                                        }
                                    });
                                }
                            });

                            me.loadMask.hide();

                        }catch(e){
                            console.log(e);
                            pimcore.helpers.showNotification(t('error'), t('docono_company.message.error.form_data_load'), 'error');
                        }
                    },
                    failure: function () {
                        Ext.MessageBox.show({
                            title: t('error'),
                            msg: t('docono_company.message.error.xhr_failed'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    },
                });
            }.bind(this));
        }

        return this.panel;
    }
});;