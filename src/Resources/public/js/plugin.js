
pimcore.registerNS("pimcore.plugin.DoconoCompanyBundle");

pimcore.plugin.DoconoCompanyBundle = Class.create({
    getClassName: function (){
        return "pimcore.plugin.DoconoCompanyBundle";
    },

    initialize: function () {
        if (pimcore.events.preMenuBuild) {
            document.addEventListener(pimcore.events.preMenuBuild, this.preMenuBuild.bind(this));
        } else {
            document.addEventListener(pimcore.events.pimcoreReady, this.pimcoreReady.bind(this));
        }
        // pimcore.plugin.broker.registerPlugin(this);
        // document.addEventListener(pimcore.events.preMenuBuild, this.preMenuBuild.bind(this));
    },

    preMenuBuild: function (e) {
        let menu = e.detail.menu;

        menu.mybundle = {
            label: t('docono_company_title'),
            iconCls: 'docono_menu_icon',
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
            pimcore.globalmanager.add("plugin_pimcore_docono_company", new pimcore.plugin.DoconoCompanyBundle.panel());
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
    //             companyTab =  pimcore.globalmanager.add("docono_company", new  pimcore.plugin.DoconoCompanyBundle.panel());
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

var DoconoCompanyBundle = new pimcore.plugin.DoconoCompanyBundle();