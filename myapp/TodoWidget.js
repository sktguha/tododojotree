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

    let todoWidget = declare([_WidgetBase, _TemplatedMixin], {
        _todoCounterInt : 0,
        templateString: template,
        postCreate : function () {
            this.checkbox.checked = !!this.done;
            this.textContent.value = (this.text || "");
            this.storageLb.innerText = this.storageKey;
        },
        toStorageString : function () {
            return {
                done : this.checkbox.checked,
                text : this.textContent.value
            }
        },
        onSaveRequired : function () {
            localStorage[this.storageKey] = JSON.stringify(this.toStorageString());
        },
        addSubTodo : function () {
            var todo = new todoWidget({
                text : "",
                done : false,
                storageKey :  this.storageKey + this._todoCounterInt
            });
            todo.placeAt(this.subtodoarea);
            this._todoCounterInt ++;
        }
    });
    return todoWidget;
});
