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
            if(this.restoreFromStorage === true){
                this.restoreFromStorageTodoWidget();
            } else {
                this.checkbox.checked = !!this.done;
                this.textContent.value = (this.text || "");
                this.storageLb.innerText = this.storageKey;
                this.onSaveRequired(); //save on start to avoid the missing parent cases
            }
        },
        restoreFromStorageTodoWidget : function () {
            // for(var i=0;i<this.childCount;i++){
            //     var stKey = this.storageKey + i;
            // }
        },
        toStorageString : function () {
            return {
                done : this.checkbox.checked,
                text : this.textContent.value,
                childCount : this._todoCounterInt
            }
        },
        onSaveRequired : function () {
            localStorage[this.storageKey] = JSON.stringify(this.toStorageString());
        },
        addSubTodo : function () {
            var todo = new todoWidget({
                storageKey: this.storageKey + this._todoCounterInt,
                restoreFromStorage : false
            });
            todo.placeAt(this.subtodoarea);
            this._todoCounterInt++;
        }
    });
    return todoWidget;
});
