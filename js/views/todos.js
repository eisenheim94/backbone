// js/views/todos.js
var app = app || {};
// представление задачи
// --------------
// DOM-элемент задачи представляет собой...
app.TodoView = Backbone.View.extend({
	//... тег списка.
	tagName: 'li',
	// Кэширование функции шаблона для отдельного элемента.
	template: _.template( $('#item-template').html() ),
	// DOM-события, специфичные для элемента.
	events: {
		'click .toggle': 'togglecompleted', // Новый код
		'dblclick label': 'edit',
		'click .destroy': 'clear', // Новый код
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},
	// представление TodoView прослушивает изменения своей модели
	// и выполняет повторное отображение. Поскольку в этом приложении
	// **Todo** и **TodoView** соотносятся как 1 к 1,
	// для удобства мы устанавливаем прямую ссылку на модель.
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove); // НОВОЕ
		this.listenTo(this.model, 'visible', this.toggleVisible); // НОВОЕ
	},
	// Повторно отображает заголовки задачи.
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		this.$el.toggleClass( 'completed', this.model.get('completed') ); // Новый код
		this.toggleVisible(); // Новый код
		
		this.$input = this.$('.edit');
		return this;
	},
	// НОВОЕ: переключает видимость элемента
	toggleVisible : function () {
		this.$el.toggleClass( 'hidden', this.isHidden());
	},
	// НОВОЕ – определяет, должен ли элемент быть скрытым
	isHidden : function () {
		var isCompleted = this.model.get('completed');
		return ( // только для скрытых
			(!isCompleted && app.TodoFilter === 'completed')
			|| (isCompleted && app.TodoFilter === 'active')
		);
	},
	// НОВОЕ: переключает состояние completed модели.
	togglecompleted: function() {
		this.model.toggle();
	},
	// Переключение этого представления в режим редактирования,
	// отображение поля ввода.
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},
	// Закрытие режима редактирования, сохранение изменений в задаче.
	close: function() {
		var value = this.$input.val().trim();
		if ( value ) {
			this.model.save({ title: value });
		} else {
			this.clear(); // НОВОЕ
		}
		this.$el.removeClass('editing');
	},
	// Если вы нажмете `enter`, то редактирование элемента завершится.
	updateOnEnter: function( e ) {
		if ( e.which === ENTER_KEY ) {
			this.close();
		}
	},
	// НОВОЕ – удаление элемента, уничтожение модели
	// в локальном хранилище и удаление ее представления
	clear: function() {
		this.model.destroy();
	}
});