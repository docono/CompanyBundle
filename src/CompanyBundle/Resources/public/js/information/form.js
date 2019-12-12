pimcore.registerNS("pimcore.plugin.docono_company.information.form");
pimcore.plugin.docono_company.information.form = Class.create({

    initialize: function (id) {
        this.id = id;
    },

    getPanel: function () {
        var me = this;

        this.formPanel = Ext.create('Ext.form.Panel', {
            id: 'information_form_' + this.id,
            region: 'center',
            layout: 'hbox',
            layout: 'hbox',
            title: t('docono_company_information'),
            iconCls: 'docono_icon_info',
            autoScroll: true,
            defaults: {
                xtype: 'fieldset',
                flex: 1,
                margin: '20 20 20 0'
            },
            items: [{
                title: t('docono_company_company'),
                name: 'company',
                defaults: {
                    xtype: 'textfield',
                    anchor:	"100%"
                },
                margin: '20 20 0 20',
                items: [
                    {
                        name: 'company[name]',
                        fieldLabel: t('docono_company_company_name')
                    }, {
                        name: 'company[address]',
                        fieldLabel: t('docono_company_company_address')
                    },  {
                        name: 'company[postbox]',
                        fieldLabel: t('docono_company_company_postbox')
                    }, {
                        name: 'company[town]',
                        fieldLabel: t('docono_company_company_town')
                    }, {
                        name: 'company[postalcode]',
                        fieldLabel: t('docono_company_company_postal_code')
                    },  {
                        name: 'company[region]',
                        fieldLabel: t("docono_company_company_region"),
                        emptyText: 'OW'
                    },{
                        xtype: 'combo',
                        name: 'company[country]',
                        store: new pimcore.plugin.docono_company.store.country().getStore(),
                        fieldLabel: t("docono_company_company_country"),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'code',
                    }, {
                        name: 'company[phone]',
                        fieldLabel: t('docono_company_company_telephone')
                    }, {
                        name: 'company[fax]',
                        fieldLabel: t('docono_company_company_fax')
                    }, {
                        vtype: 'email',
                        name: 'company[email]',
                        fieldLabel: t('docono_company_company_email'),
                        emptyText: 'hello@docono.io'
                    }, {
                        name: 'company[vat-number]',
                        fieldLabel: t('docono_company_company_vat_number'),
                  }
                ]
            }, {
                title: t('docono_company_social_media'),
                name: 'socialmedia',
                defaults: {
                    xtype: 'textfield',
                    anchor:	"100%"
                },
                items: [
                    {
                        name: 'socialmedia[linkedin]',
                        fieldLabel: 'LinkedIn',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon linkedin_icon'
                    }, {
                        name: 'socialmedia[xing]',
                        fieldLabel: 'Xing',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon xing_icon'
                    }, {
                        name: 'socialmedia[facebook]',
                        fieldLabel: 'Facebook',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon facebook_icon'
                    }, {
                        name: 'socialmedia[vk]',
                        fieldLabel: 'VKontakte',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon vk_icon'
                    }, {
                        name: 'socialmedia[twitter]',
                        fieldLabel: 'Twitter',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon twitter_icon'
                    }, {
                        name: 'socialmedia[instagram]',
                        fieldLabel: 'Instagram',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon instagram_icon'
                    }, {
                        name: 'socialmedia[pinterest]',
                        fieldLabel: 'Pinterest',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon pinterest_icon'
                    }, {
                        name: 'socialmedia[youtube]',
                        fieldLabel: 'YouTube',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon youtube_icon'
                    }, {
                        name: 'socialmedia[vimeo]',
                        fieldLabel: 'Vimeo',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon vimeo_icon'
                    }, {
                        name: 'socialmedia[medium]',
                        fieldLabel: 'Medium',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon medium_icon'
                    }, {
                        name: 'socialmedia[reddit]',
                        fieldLabel: 'reddit',
                        emptyText: 'https://',
                        cls : 'socialmedia-icon reddit_icon'
                    }
                ]
            }
            ]
        });

        return this.formPanel;
    }
});