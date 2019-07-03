pimcore.registerNS("pimcore.plugin.docono_company");

pimcore.plugin.docono_company = Class.create(pimcore.plugin.admin, {
    getClassName: function () {
        return "pimcore.plugin.docono_company";
    },

    initialize: function () {;

        pimcore.plugin.broker.registerPlugin(this);

        this.navEl = Ext.get('pimcore_menu_search').insertSibling('<li id="docono_company" data-menu-tooltip="'+t('docono_company_title')+'" class="pimcre_menu_item"><img src="/bundles/company/img/megaphone_white.png"></li>', 'after');
        Ext.get("docono_company").on("mousedown", function(e) {

            try {
                pimcore.globalmanager.get("docono_company").activate();
            }
            catch (e) {
                companyTab =  pimcore.globalmanager.add("docono_company", new  pimcore.plugin.docono_company.panel());
            };

            return false;
        });
    },

    pimcoreReady: function (params, broker) {
        var toolbar = pimcore.globalmanager.get("layout_toolbar");
        this.navEl.on("mousedown", toolbar.showSubMenu.bind(toolbar.mdsMenu));
        pimcore.plugin.broker.fireEvent("mdsMenuReady", toolbar.mdsMenu);
    },
});

var docono_companyPlugin = new pimcore.plugin.docono_company();