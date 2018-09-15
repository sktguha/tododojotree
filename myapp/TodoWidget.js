define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/todotemplate.html",
    "dojo/_base/Deferred",
    "dojo/topic"
], function(declare, _WidgetBase, _TemplatedMixin, template, topic) {

    /**
     * so make simple todo app
     * widget will have a todo
     */

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        postCreate : function () {
            this.checkbox.checked = !!this.done;
            this.textContent.value = (this.text || "");
        },
        toStorageString : function () {
            return {
                done : this.checkbox.checked,
                text : this.textContent.value
            }
        },
        onSaveRequired : function () {
            localStorage[this.storageKey]
        },
        addSubTodo : function () {

        }
    });
});
