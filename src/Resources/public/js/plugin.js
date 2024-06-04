pimcore.registerNS("pimcore.plugin.docono_company");

pimcore.plugin.docono_company = Class.create(pimcore.plugin.admin, {
    initialize: function () {
        document.addEventListener(pimcore.events.preMenuBuild, this.preMenuBuild.bind(this));
    },

    getClassName: function () {
        return "pimcore.plugin.docono_company";
    },

    preMenuBuild: function (e) {
        let menu = e.detail.menu;

        menu.mybundle = {
            label: t('docono_company_title'),
            iconCls: 'docono-company-menu-icon',
            priority: 42,
            shadow: false,
            handler: this.openBundlePanel,
            noSubmenus: true,
            //cls: "pimcore_navigation_flyout",
        };
    },

    openBundlePanel: function(e) {
        try {
            pimcore.globalmanager.get("plugin_pimcore_docono_company").activate();
        } catch (e) {
            pimcore.globalmanager.add("plugin_pimcore_docono_company", new pimcore.plugin.docono_company());
        }
    }

    // initialize: function () {;
    //
    //     pimcore.plugin.broker.registerPlugin(this);
    //
    //     this.navEl = Ext.get('pimcore_menu_search').insertSibling('<li id="docono_company" data-menu-tooltip="'+t('docono_company_title')+'" class="pimcre_menu_item"><img src="/bundles/doconocompany/img/megaphone_white.png"></li>', 'after');
    //     Ext.get("docono_company").on("mousedown", function(e) {
    //
    //         try {
    //             pimcore.globalmanager.get("docono_company").activate();
    //         }
    //         catch (e) {
    //             companyTab =  pimcore.globalmanager.add("docono_company", new  pimcore.plugin.docono_company.panel());
    //         };
    //
    //         return false;
    //     });
    // },
    //
    // pimcoreReady: function (params, broker) {
    //     var toolbar = pimcore.globalmanager.get("layout_toolbar");
    //     this.navEl.on("mousedown", toolbar.showSubMenu.bind(toolbar.mdsMenu));
    //     pimcore.plugin.broker.fireEvent("mdsMenuReady", toolbar.mdsMenu);
    // },
});

var docono_companyPlugin = new pimcore.plugin.docono_company();