import { Request, Response, NextFunction, } from "express"
import createHttpError from "http-errors"
import { MongoClient, ObjectId } from "mongodb"

type Todo = {
    title: string
    description: string
    completed: boolean
}

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const dbClient = req.app.locals.dbClient as MongoClient
    const todo = req.body as Todo

    try {

        if(!todo.title || !todo.description) throw createHttpError(400, "Missing todo details")

        const todoCollections = dbClient.db("todok").collection('todos')
        const createdTodo = await todoCollections.insertOne(todo)
        const newTodo = await todoCollections.findOne({_id: new ObjectId(createdTodo.insertedId)})

        res.status(201).json({ data: newTodo, message: "success" })

    } catch (error) {   
       next(error) 
    }
}

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    const dbClient = req.app.locals.dbClient as MongoClient

    try {
        const todoCollections = dbClient.db("todok").collection('todos')
        const todos = await todoCollections.find().toArray()
        
        if(!todos) createHttpError(404, "Todos not found")

        res.status(200).json({ data: todos, message: "success" })

    } catch (error) {   
       next(error) 
    }
}

export const updateTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const dbClient = req.app.locals.dbClient as MongoClient
    const todoId = req.params.id 

    //this wont restrict the other properties, meaning to say, 
    //whatever the property came from the body as long as it matches the property defined inside the the Todo type
    const updateData = req.body as Partial<Todo> 

    try {
        let updatedTodo: any
        const todoCollections = dbClient.db("todok").collection('todos')

        if(!todoId) throw createHttpError(400, "Bad request, missing params")
    
        if (!ObjectId.isValid(todoId)) throw createHttpError(400, 'Invalid todo Id')

        const existingTodo = await todoCollections.findOne({_id: new ObjectId(todoId)})
        if(!existingTodo) throw createHttpError(404, "Todo not found")

        const updateResult = await todoCollections.updateOne(
            {_id: new ObjectId(todoId)}, 
            { $set: updateData }
        )

        // if the update of collection succeed, then get the updated todo document
        if(updateResult.modifiedCount === 1) {
            updatedTodo = await todoCollections.findOne({_id: new ObjectId(todoId)})
        }

        res.status(200).json({ data: updatedTodo, message: "success" })

    } catch (error) {
        next(error)
    }
} 

export const deleteTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const dbClient = req.app.locals.dbClient as MongoClient
    const todoId = req.params.id 

    try {
        const todoCollections = dbClient.db("todok").collection("todos")
        
        if (!ObjectId.isValid(todoId)) throw createHttpError(400, 'Invalid todo Id')
    
        if(!todoId) throw createHttpError(400, "Bad request, missing params.")

        const existingTodo = await todoCollections.findOne({_id: new ObjectId(todoId)})
        if(!existingTodo) throw createHttpError(404, "Todo not found")

        await todoCollections.deleteOne({_id: new ObjectId(todoId)})

        res.status(204).json({ message: "Deleted successfully." })
    } catch (error) { 
        next(error)
    }
}
