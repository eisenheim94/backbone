// js/models/todo.js
var app = app || {};
// модель задачи
// ----------
// Модель задачи имеет атрибуты 'title', 'order' и 'completed'.
app.Todo = Backbone.Model.extend({
// Атрибуты по умолчанию определяют, что у каждой созданной задачи будут ключи
// `title` и `completed`.
	defaults: {
		title: '',
		completed: false
	},
	// переключение состояния задачи `completed`.
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}
});