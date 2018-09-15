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
                storageKey : "" + this.todoCounter
            });
            todo.placeAt(this.todoList);
            this.todoCounter ++;
        },
        restoreFromStorageMainTODOS : function () {
            //also hv to move the todoCounter
            //pad values as 000 and 00 not there, then create it
            // tell the parent td widget to create a child with this numeric ??
            // no better give them a list and to fill the list onwards
            //to solve gap issues , store as soon as it is created

        }
    });
});
