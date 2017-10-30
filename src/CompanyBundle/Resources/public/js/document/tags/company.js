pimcore.registerNS("pimcore.document.tags.company");
pimcore.document.tags.company = Class.create(pimcore.document.tag, {

    initialize: function(id, name, options, data, inherited) {
        this.id = id;
        this.name = name;
        this.data = {};

        this.options = this.parseOptions(options);
        this.data = data;

        this.element = Ext.get(id);
        this.element.update(data.html);

        this.setupWrapper();
    },

    getType: function () {
        return 'company';
    },

    getValue: function () {
        return this.data;
    },
});
