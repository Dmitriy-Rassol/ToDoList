'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
todoData = JSON.parse(localStorage.getItem('todoData'));

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = 
        '<span class="text-todo">' + item.value +'</span>' +
			'<div class="todo-buttons">' +
				'<button class="todo-remove"></button>' +
			    '<button class="todo-complete"></button>' +
			'</div>'
        ;

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnTodoDelete = li.querySelector('.todo-remove');
        btnTodoDelete.addEventListener('click', function(){
            todoData.splice(item, 1);
            render();
        });
    });
    localStorage.setItem('todoData', JSON.stringify(todoData));
};



todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false    
        };
            
        todoData.push(newTodo);
        headerInput.value = '';
        render();
    }    
});

render();
