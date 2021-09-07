pimcore.registerNS("pimcore.plugin.docono_company.panel");
pimcore.plugin.docono_company.panel = Class.create({

    initialize: function () {
        this.getLayout();
    },

    getLayout: function () {
        if (!this.panel) {
            this.panel = Ext.create('Ext.tab.Panel', {
                id: 'docono_company_panel',
                title: t('docono_company_title'),
                iconCls: 'docono_icon_megaphone',
                cls: 'docono',
                border: false,
                layout: 'fit',
                closable: true,

                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    cls: 'docono_footer',
                    items: [
                        {
                            xtype: 'tbtext',
                            text: 'powered by'
                        }, {
                            xtype: 'button',
                            text: 'DOCONO | WE MAKE WEB',
                            border: false,
                            cls: 'docono_button',
                            iconCls: 'docono_icon_logo',
                            handler: function() {
                                window.open('https://docono.io', '_blank');
                            }
                        }
                    ]
                }]
            });

            this.panel.on("destroy", function () {
                pimcore.globalmanager.remove("docono_company");
            }.bind(this));

            this.getInformationPanels();

            var tabPanel = Ext.getCmp("pimcore_panel_tabs");
            tabPanel.add(this.panel);
            tabPanel.setActiveItem(this.panel);

            pimcore.layout.refresh();
        }

        return this.panel;
    },

    activate: function () {
        var tabPanel = Ext.getCmp("pimcore_panel_tabs");
        tabPanel.setActiveItem("docono_company_panel");
    },

    getInformationPanels: function() {
        var me = this;
        var sites = pimcore.globalmanager.get("sites");

        sites.each(function (record) {
            var id = record.data.id;
            if (id == "default") {
                key = "default";
            } else {
                key = "site_" + id;
            }

            var infoPanel = new pimcore.plugin.docono_company.information.panel(key, record.data.domain);
            me.panel.add(infoPanel.getLayout());
        });

        this.panel.setActiveItem("docono_company_imformation_panel_default");
    }

});