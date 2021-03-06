define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/maintemplate.html",
    "./TodoWidget"
], function(declare, _WidgetBase, _TemplatedMixin, template, TodoWidget) {

    /**
     * so make simple todo app
     * widget will have a todo
     */

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        todoCounter : 0,
        postCreate : function () {
            // this.addTodo();
            this.restoreFromStorageMainTODOS();
        },
        addTodo : function () {
            const todo = new TodoWidget({
                storageKey : this.todoCounter,
                restoreFromStorage :  false
            });
            todo.placeAt(this.todoList);
            this.todoCounter ++;
        },
        restoreFromStorageMainTODOS : function () {
            //so get all numberic ones. those are the initial ones
            let ctVal = _(Object.keys(localStorage)).chain().filter(function(key){
                return _.isFinite(key*1)
            }).sortBy(function (key) {
                return key*1;
            }).each(function (key) {
                var todo = new TodoWidget({
                    storageKey : key,
                    restoreFromStorage : true
                });
                todo.placeAt(this.todoList);
            }.bind(this)).max().value();
            if(_.isFinite(ctVal*1)){
                this.todoCounter = ctVal * 1 + 1;
            }

        }
    });
});
