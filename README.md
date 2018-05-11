# Proclamation

It's like CSS but applies behaviour to DOM.

Proclamation is a declarative behaviour framework that applies behaviour to existing DOM elements(or elements added after the page is rendered).
Since Proclamation has no opinion about how the DOM is generated it can be used with any framework, templating engine, server side rendering technology.

It resembles very much how how CSS operates:

- Elements are selected using DOM selectors
- Behaviour is applied to the selected elements using CSS like syntax and attributes

```js
behave`
    .list {
        drag-axis: x;
        iterate-collection: "todos";
        iterate-prop: "name";
        iterate-template: "#todoListItem";
    }
    #addTodo button {
        click: prepend("todos", "$todo") toggle("$todo.done") clear("$todo");
    }
    #addTodo input {
        bind-value: "$todo.name";
    }
`
```