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
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},
	// представление TodoView прослушивает изменения своей модели
	// и выполняет повторное отображение. Поскольку в этом приложении
	// **Todo** и **TodoView** соотносятся как 1 к 1,
	// для удобства мы устанавливаем прямую ссылку на модель.
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	// Повторно отображает заголовки задачи.
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		this.$input = this.$('.edit');
		return this;
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
		}
		this.$el.removeClass('editing');
	},
	// Если вы нажмете `enter`, то редактирование элемента завершится.
	updateOnEnter: function( e ) {
		if ( e.which === ENTER_KEY ) {
			this.close();
		}
	}
});