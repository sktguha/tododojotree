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

    let TodoWidget = declare([_WidgetBase, _TemplatedMixin], {
        childCount : 0,
        templateString: template,
        setUIElemContent: function () {
            this.checkbox.checked = !!this.done;
            this.textContent.value = (this.text || "");
            this.storageLb.innerText = this.storageKey;
        },
        postCreate : function () {
            if(this.restoreFromStorage === true){
                this.restoreFromStorageTodoWidget();
            } else {
                this.setUIElemContent();
                this.onSaveRequired(); //save on start to avoid the missing parent cases
            }
        },
        restoreFromStorageTodoWidget : function () {
            var val = localStorage[this.storageKey];
            this.done = val.done;
            this.text = val.text;
            this.childCount = val.childCount;
            this.setUIElemContent();
            for (var i = 0; i < this.childCount; i++){
                var todo = new TodoWidget({
                    restoreFromStorage: true,
                    storageKey : this.storageKey + "|" +i
                });
                todo.placeAt(this.subtodoarea);
            }
            // for(var i=0;i<this.childCount;i++){
            //     var stKey = this.storageKey + i;
            // }
        },
        toStorageString : function () {
            return {
                done : this.checkbox.checked,
                text : this.textContent.value,
                childCount : this.childCount
            }
        },
        onSaveRequired : function () {
            localStorage[this.storageKey] = JSON.stringify(this.toStorageString());
        },
        addSubTodo : function () {
            var todo = new TodoWidget({
                storageKey: this.storageKey + "|" + this.childCount,
                restoreFromStorage : false
            });
            todo.placeAt(this.subtodoarea);
            this.childCount++;
            this.onSaveRequired();
        }
    });
    return TodoWidget;
});
