pimcore.registerNS("pimcore.plugin.docono_company.seo.form");
pimcore.plugin.docono_company.seo.form = Class.create({

    initialize: function (id) {
        this.id = id;
    },

    getPanel: function () {
        var me = this;

        this.formPanel = Ext.create('Ext.form.Panel', {
            region: 'center',
            layout: 'fit',
            title: t('docono_company.seo'),
            id: 'seo_form_' + this.id,
            iconCls: 'docono_icon_seo',
            autoScroll: true,
            defaults: {
                xtype: 'fieldset',
                margin: '20 0 20 20'
            },
            items: [
                this.getSitePanel()
            ]
        });

        return this.formPanel;
    },

    getSitePanel: function () {
        var tabpanel = Ext.create('Ext.tab.Panel', {
            // title: t('docono_company.site_description'),
            name: 'site',
            // width: 300,
            height: 400
        });

        var websiteLanguages = pimcore.settings.websiteLanguages;

        for (var i=0; i<websiteLanguages.length; i++) {
            var siteName = 'site_' + websiteLanguages[i];
            var languagePanel = Ext.create('Ext.form.FieldSet', {
                title: websiteLanguages[i],
                name: siteName,
                border: false,
                autoHeight: true,
                defaultType: 'textfield',
                items: [{
                    xtype: 'textarea',
                    name: siteName + '[description]',
                    labelAlign: 'top',
                    width: 275,
                    fieldLabel: t("docono_company.site.description"),
                }, {
                    name: siteName + '[keywords]',
                    fieldLabel: t('docono_company.site.keywords')
                },
                ]
            });

            tabpanel.add(languagePanel);
        }

        tabpanel.setActiveItem(0);

        return tabpanel;
    }
});