pimcore.registerNS("pimcore.plugin.docono_company.information.panel");
pimcore.plugin.docono_company.information.panel = Class.create({

    initialize: function (id, name) {
        this.id = id;
        this.name = name;
    },

    getLayout: function () {
        var me = this;

        if (!this.panel) {
            this.informationFormPanel = new pimcore.plugin.docono_company.information.form(this.id).getPanel();
            this.advancedFormPanel = new pimcore.plugin.docono_company.advanced.form(this.id).getPanel();

            this.panel = Ext.create('Ext.tab.Panel', {
                id: "docono_company_imformation_panel_" + this.id,
                title: this.name,
                iconCls: "docono_icon_site",
                border: false,
                layout: "fit",
                closable: false,

                items: [
                    this.informationFormPanel,
                    this.advancedFormPanel
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
                                    Ext.getCmp('advanced_form_' + me.id).getValues()
                                );

                                Ext.Ajax.request({
                                    url: '/admin/company/service/update',
                                    params: params,
                                    success: function (xhr) {
                                        pimcore.helpers.loadingHide();
                                        pimcore.helpers.showNotification(t("success"), t("docono_company.message.successful_saved"), "success");
                                    },
                                    failure: function () {
                                        //hide loading bar
                                        pimcore.helpers.loadingHide();
                                        //show error message
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

                            var informationForm = me.informationFormPanel.getForm();

                            Ext.Object.each(data.data, function(section, data) {

                                if(section != 'times') {
                                    var fieldset = me.panel.query('[name=' + section + ']')[0];

                                    Ext.Object.each(data, function (key, value) {
                                        if((field = fieldset.query('[name*=' + key + ']')[0]) !== undefined) {
                                            field.setValue(value);
                                        }
                                    });
                                } else {
                                    Ext.Object.each(data, function(day, daydata) {
                                        Ext.Object.each(daydata, function(key, value) {
                                            informationForm.findField(day + '[' + key + ']').setValue(value);
                                        });
                                    });
                                }

                            });

                            me.loadMask.hide();

                        }catch(e){
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