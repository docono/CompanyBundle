pimcore.registerNS("pimcore.plugin.docono_company.seo.form");
pimcore.plugin.docono_company.seo.form = Class.create({

  initialize: function (id) {
    this.id = id;
  },

  getPanel: function () {
    var me = this;

    this.formPanel = Ext.create('Ext.form.Panel', {
      region: 'center',
      title: t('docono_company_seo'),
      id: 'seo_form_' + this.id,
      iconCls: 'docono_icon_seo',
      autoScroll: true,
      defaults: {
        margin: '20 20 20 20'
      },
      items: [
        this.getSitePanel(),
        this.getSchemaPanel()
      ]
    });

    return this.formPanel;
  },

  getSitePanel: function () {
    var tabpanel = Ext.create('Ext.tab.Panel', {
      name: 'seo',
      autoScroll: true,
    });

    var websiteLanguages = pimcore.settings.websiteLanguages;

    for (var i=0; i<websiteLanguages.length; i++) {
      var siteName = 'seo_' + websiteLanguages[i];

      var languagePanel = Ext.create('Ext.panel.Panel', {
        title: websiteLanguages[i],
        items: [{
          xtype: 'fieldset',
          name: siteName,
          title: t('docono_company_seo_language_definitions'),
          autoScroll: true,
          flex: 1,
          defaults: {
            xtype: 'textfield',
            anchor:	'100%'
          },
          items: [{
            xtype: 'textarea',
            name: siteName + '[description]',
            labelAlign: 'left',
            fieldLabel: t('docono_company_seo_description'),
            minLength: 50,
            maxLength: 300
          }, {
            name: siteName + '[keywords]',
            fieldLabel: t('docono_company_seo_keywords')
          }]
        }]
      });

      tabpanel.add(languagePanel);
    }

    tabpanel.setActiveItem(0);

    return tabpanel;
  },

  getSchemaPanel: function() {
    var schemaPanel = Ext.create('Ext.panel.Panel', {
      title: t('docono_company_seo_general_definitions'),
      region: 'south',
      layout: 'hbox',
      defaults: {
        xtype: 'fieldset',
        flex: 1,
        margin: '20 20 20 0'
      },
      items: [{
        title: 'schema.org',
        name: 'schema',
        defaults: {
          xtype: 'textfield',
          anchor: '100%'
        },
        items: [{
          name: 'schema[type]',
          fieldLabel: t('docono_company_schema_type'),
          emptyText: 'LocalBusiness'
        }, {
          name: 'schema[subtype]',
          fieldLabel: t('docono_company_schema_subtype'),
          emptyText: 'http://www.productontology.org/id/...'
        }, {
          name: 'schema[url]',
          fieldLabel: t('docono_company_schema_url'),
          emptyText: 'https://docono.io'
        },
        this.getAssetDnd('schema[logo]', 'docono_company_schema_logo'),
        this.getAssetDnd('schema[image]', 'docono_company_schema_image'),
        {
          xtype: 'box',
          cls: 'docono-seperator',
          autoEl: {tag: 'hr'}
        }, {
          name: 'schema[founder-name]',
          fieldLabel: t('docono_company_schema_founder_name')
        }, {
          name: 'schema[founding-date]',
          fieldLabel: t('docono_company_schema_founding_date')
        }, {
          name: 'schema[founding-town]',
          fieldLabel: t('docono_company_schema_founding_town')
        }]
      }, {
        title: t('docono_company_location_hq_coordinates'),
        name: 'location',
        defaults: {
          xtype: 'textfield',
          anchor: '100%'
        },
        items: [{
          name: 'location[lat]',
          fieldLabel: t('docono_company_location_latitude'),
          emptyText: '47.050168'
        }, {
          name: 'location[long]',
          fieldLabel: t('docono_company_location_longitude'),
          emptyText: '8.309307'
        }, {
          name: 'location[link]',
          fieldLabel: t('docono_company_location_link'),
          emptyText: 'https://goo.gl/maps/CPzgDp35bS52'
        }]
      }, {
        title: t('docono_company_socialmedia_accounts_meta'),
        name: 'accounts',
        defaults: {
          xtype: 'textfield',
          anchor: '100%'
        },
        items: [{
          name: 'accounts[twitter-site]',
          fieldLabel: t('docono_company_socialmedia_twitter_site'),
          emptyText: '@docono',
          cls : 'socialmedia-icon twitter_icon'
        }, {
          name: 'accounts[twitter-creator]',
          fieldLabel: t('docono_company_socialmedia_twitter_creator'),
          emptyText: '@docono',
          cls : 'socialmedia-icon twitter_icon'
        }, {
          name: 'accounts[facebook-publisher]',
          fieldLabel: t('docono_company_socialmedia_facebook_publisher'),
          emptyText: 'https://www.facebook.com/docono.io',
          cls : 'socialmedia-icon facebook_icon'
        }, {
          name: 'accounts[facebook-author]',
          fieldLabel: t('docono_company_socialmedia_facebook_author'),
          emptyText: 'https://www.facebook.com/docono.io',
          cls : 'socialmedia-icon facebook_icon'
        }, {
          name: 'accounts[facebook-app-id]',
          fieldLabel: t('docono_company_socialmedia_facebook_app_id'),
          cls : 'socialmedia-icon facebook_icon'
        }]
      }]
    });

    return schemaPanel;
  },

  getAssetDnd: function(name, translationTag) {

    enableKeyEvents = true;
    var component = new Ext.form.TextField({
      name: name,
      width: 260,
      fieldCls: 'pimcore_droptarget_input'
    });

    component.on('render', function (el) {
      new Ext.dd.DropZone(el.getEl(), {
        reference: this,
        ddGroup: 'element',

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
      xtype: 'button',
      iconCls: 'docono_icon_delete',
      cls: 'clear',
      style: 'margin-left: 5px',
      handler: function() {
        component.setValue('');
      }
    }];


    var composite = Ext.create('Ext.form.FieldContainer', {
      fieldLabel: t(translationTag),
      layout: 'hbox',
      items: items,
      componentCls: 'object_field',
      border: false,
      style: {
        padding: 0
      }
    });

    return composite;
  }
});