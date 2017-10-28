pimcore.registerNS("pimcore.plugin.docono_company.advanced.form");
pimcore.plugin.docono_company.advanced.form = Class.create({

    initialize: function (id) {
        this.id = id;
    },

    getPanel: function () {
        return this.formPanel = Ext.create('Ext.form.Panel', {
            region: 'center',
            layout: 'hbox',
            title: t("docono_company.advanced"),
            id: 'advanced_form_' + this.id,
            iconCls: 'docono_icon_advanced',
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
                    title: 'schema.org',
                    name: 'schema',
                    defaults: {
                        xtype: 'textfield',
                        width: 400
                    },
                    items: [
                        {
                            name: 'schema[type]',
                            fieldLabel: t("docono_company.schema.type"),
                            emptyText: 'LocalBusiness'
                        }, {
                            name: 'schema[subtype]',
                            fieldLabel: t("docono_company.schema.subtype"),
                            emptyText: 'http://www.productontology.org/id/...'
                        }, {
                            name: 'schema[url]',
                            fieldLabel: t("docono_company.schema.url"),
                            emptyText: 'https://docono.io'
                        },
                        this.getAssetDnd('schema[logo]', 'docono_company.schema.logo'),
                        this.getAssetDnd('schema[image]', 'docono_company.schema.image')
                    ]
                }]
            }, {
                title: t('docono_company.coordinates'),
                name: 'coordinates',
                defaults: {
                    xtype: 'textfield',
                    width: 400
                },
                items: [{
                    name: 'coordinates[lat]',
                    fieldLabel: 'Latitude',
                    emptyText: '47.050168'
                }, {
                    name: 'coordinates[long]',
                    fieldLabel: 'Longitude',
                    emptyText: '8.309307'
                }, {
                    name: 'coordinates[hasmap]',
                    fieldLabel: t('docono_company.coordinates.hasmap'),
                    emptyText: 'https://goo.gl/maps/CPzgDp35bS52'
                }]
            }]
        });
    },

    getAssetDnd: function(name, translationTag) {


        enableKeyEvents = true;
        var component = new Ext.form.TextField({
            name: name,
            width: 260,
            fieldCls: 'pimcore_droptarget_input'
        });

        component.on("render", function (el) {
            new Ext.dd.DropZone(el.getEl(), {
                reference: this,
                ddGroup: "element",
                getTargetFromEvent: function (e) {
                    return component.getEl();
                },

                onNodeOver: function (target, dd, e, data) {

                    var record = data.records[0];
                    var data = record.data;

                    if(data.elementType == 'asset' && data.type == 'image') {
                        return Ext.dd.DropZone.prototype.dropAllowed;
                    }
                    else {
                        return Ext.dd.DropZone.prototype.dropNotAllowed;
                    }
                }.bind(this),

                onNodeDrop: function (target, dd, e, data) {
                    var record = data.records[0];
                    var data = record.data;

                    if(data.elementType == 'asset' && data.type == 'image') {
                        component.setValue('/var/assets' + data.path);
                        return true;
                    } else {
                        return false;
                    }
                }
            });

        }.bind(this));

        var items = [component, {
            xtype: "button",
            iconCls: "docono_icon_delete",
            cls: 'clear',
            style: "margin-left: 5px",
            handler: function() {
                component.setValue('');
            }
        }];


        var composite = Ext.create('Ext.form.FieldContainer', {
            fieldLabel: t(translationTag),
            layout: 'hbox',
            items: items,
            componentCls: "object_field",
            border: false,
            style: {
                padding: 0
            }
        });

        return composite;
    },
});