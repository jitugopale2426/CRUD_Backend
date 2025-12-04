import { prismaClient } from "../routes/index.js";

export const createTaskController = async(req,res)=>{
    try {
        const{title,description} = req.body;

        if(!title || !description){
            return res.status(400).json({message:"All fields are required"});
        }

        const tasks = await prismaClient.task.create({
            data:{
                title,
                description,
                userId : req.user.id
            }
        })
        return res.status(200).json({mesage:"Task Created Successfully",tasks})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const updateTaskController = async(req,res)=>{
    try {
        const {id} = req.params;
        const{title,description} = req.body;

        if(!title || !description){
            return res.status(400).json({message:"All fields are required"});
        }

        const taskId = await prismaClient.task.findUnique({
            where:{id:Number(id)}
        })

        if(!taskId){
            return res.status(404).json({message:"Task not found with this id"})
        }

       const updateTask = await prismaClient.task.update({
        where:{id:Number(id)},
        data:{
            title,
            description
        }
       })
        return res.status(200).json({mesage:"Task updated Successfully",updateTask})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const deleteTaskController = async(req,res)=>{
    try {
        const deleteTask = await prismaClient.task.delete({
            where:{id:Number(req.params.id)}
        })

        return res.status(200).json({message:"Task deleted successfully",deleteTask})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const getAllTaskController = async(req,res)=>{
    try {
       const tasks = await prismaClient.task.findMany({
        where:{userId:req.user.id}
       })

        return res.status(200).json({message:"Task fetched successfully",tasks})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}