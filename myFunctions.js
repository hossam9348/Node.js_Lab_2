const fs = require("fs");
const { json } = require("stream/consumers");

let filePath = "./db.json"

function createFileIfNotExist() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
}

createFileIfNotExist();

function add(data) {
    if (data.title && data.body) {
        const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        var id = 0;
        if (todos.length == 0) {
            id = 1;
        } else {
            id = (todos[todos.length - 1].id) + 1;
        }
        const todo = {
            id: id,
            title: data.title,
            body: data.body,
            checked: false,
        }
        todos.push(todo);
        fs.writeFileSync(filePath, JSON.stringify(todos));
        return "todo was created";
    } else {
        return "server error or invalid json object keys";
    }
}

function edit(id, data, query) {
    if (Object.keys(query).length !== 0) {
        if (query.status) {
            if (query.status == "checked") {
                const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                var todo = todos.filter((elem) => {
                    if (elem.id == id) {
                        elem.checked = true;
                        return true;
                    }
                })[0];
                fs.writeFileSync(filePath, JSON.stringify(todos));
                return "checked";
            } else if (query.status == "unchecked") {
                const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                var todo = todos.filter((elem) => {
                    if (elem.id == id) {
                        elem.checked = false;
                        return true;
                    }
                })[0];
                fs.writeFileSync(filePath, JSON.stringify(todos));
                return "unchecked";
            }
        }
        else {
            return "you should determine status";
        }
    } else {
        if (data.title && data.body) {
            const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            var todo = todos.filter((elem) => {
                if (elem.id == id) {
                    elem.title = data.title;
                    elem.body = data.body;
                    return true;
                }
            })[0];
            fs.writeFileSync(filePath, JSON.stringify(todos));
            return "todo was edited";
        } else {
            return "server error or invalid json object keys";
        }
    }
}

function list(data) {
    if (data.status) {
        if (data.status == "checked") {
            const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            var checkedTodos = todos.filter((elem) => {
                if (elem.checked == true) {
                    return true;
                }
            });
            return checkedTodos;
        }
        else if (data.status == "unchecked") {
            const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            var uncheckedTodos = todos.filter((elem) => {
                if (elem.checked == false) {
                    return true;
                }
            });
            return uncheckedTodos;
        } else if (data.status == "all") {
            const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return todos;
        } else {
            return "invalid status";
        }
    } else {
        return "you should determine status";
    }
}

function getById(id) {
    const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    var todo = todos.filter((elem) => {
        if (elem.id == id) {
            return true;
        }
    });

    if(todo.length == 1){
        return todo[0];
    }else{
        return "id is not exist";
    }
}

function remove(id) {
    if (id) {
        const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        var todosAfterDelete = todos.filter((elem) => {
            if (elem.id != id) {
                return true;
            }
        });
        fs.writeFileSync(filePath, JSON.stringify(todosAfterDelete));
        return "todo was removed";
    } else {
        return "server error";
    }
}

module.exports = { add, edit, list, remove,  getById};
