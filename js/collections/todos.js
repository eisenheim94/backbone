// js/collections/todos.js
var app = app || {};
// Коллекция задач
// ---------------
// Коллекция задач сохраняется в локальном хранилище,
// а не на удаленном сервере.
var TodoList = Backbone.Collection.extend({
	// Ссылка на модель этой коллекции.
	model: app.Todo,
	// Сохранение всех задач в пространстве имен `"todos-backbone"`.
	// Для работы этого кода потребуется, чтобы библиотека Backbone
	// загрузила плагин локального хранилища в вашу страницу. В противном случае
	// при тестировании кода в консоли закомментируйте
	// следующую строку, чтобы не вызвать исключение.
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	// Фильтрация завершенных задач списка.
	completed: function() {
		return this.filter(function( todo ) {
			return todo.get('completed');
		});
	},
	// Фильтрация незавершенных задач списка.
	remaining: function() {
		// метод apply позволяет определить контекст указателя this
		// в области видимости нашей функции
		return this.without.apply( this, this.completed() );
	},
	// Мы поддерживаем последовательный порядок задач, хотя сохранение в базе
	// данных происходит по неупорядоченному GUID.
	// This генерирует следующий порядковый номер для новых элементов.
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},
	// Задачи сортируются в порядке их ввода.
	comparator: function( todo ) {
		return todo.get('order');
	}
});
// Создание глобальной коллекции задач **Todos**.
app.Todos = new TodoList();