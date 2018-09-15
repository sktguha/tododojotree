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
        _todoList : [],
        todoCounter : 0,
        postCreate : function () {
            this.addTodo();
        },
        addTodo : function () {
            const todo = new TodoWidget({
                text : "",
                done: false,
                storageKey : "" + this.todoCounter
            });
            todo.placeAt(this.todoList);
            this.todoCounter ++;
        }
    });
});
