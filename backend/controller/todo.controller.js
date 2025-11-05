import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) =>{

    const todo = new Todo({
        text:req.body.text, 
        completed:req.body.completed,
        user:req.user._id, //associated todo user with logged in user
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json({message:"Successfully created Todo", newTodo})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Error occuring in Todo creation"})
        
    }
};

export const getTodos = async(req, res) =>{
    try {
        const todos = await Todo.find({user:req.user._id}); // fetch only for logged in user    
        res.status(201).json({message:"Successfully fetched Todo", todos})


    } catch (error) {
          console.log(error);
        res.status(404).json({message: "Error occuring in Todo featching"});
    }
};


export const updateTodos = async(req, res) =>{  
    try {
           const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return updated document
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
        res.status(201).json({message:"Successfully Updated Todo", todo})
        
    } catch (error) {
         console.log(error);
        res.status(404).json({message: "Error occuring in Todo updation"});
        
    }
} ;

export const deleteTodo = async(req, res) =>{
    try {
   const todo =  await Todo.findByIdAndDelete(req.params.id)       
   if(!todo) {
    return res.status(404).json({message: "Todo not found"});
   }
     res.status(201).json({message:"Successfully Deleted Todo"})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Error occuring in deleting todo"})
    }
};