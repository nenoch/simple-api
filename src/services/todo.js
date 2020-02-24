
module.exports = class TodosService {

    constructor(db) {
        this.db = db
    }

    async getAllTodos() {
        const todos = await this.db
            .collection('todos')
            .find({})
            .sort({ _id: 1 })
            .toArray()
        return todos
    }

    async createTodo(todoData) {
        if (!todoData.title) {
            throw 'title is required'
        }
        if (typeof todoData.title !== 'string') {
            throw 'title must be a string'
        }
        todoData.title = todoData.title.trim()
        const result = await this.db.collection('todos').insert({
            title: todoData.title,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const todo = result.ops[0]
        return todo
    }
}