import { prismaClient } from "../routes/index.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const RegisterController = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const userExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }

        const hashPassword = await hashSync(password,10);

        const user = await prismaClient.user.create({
            data:{
                name,
                email,
                password:hashPassword
            }
        })

        return res.status(201).json({message:"User Created Successfully",user})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const LoginController = async(req,res)=>{
    try {
        const {email,password} = req.body;

         if( !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user = await prismaClient.user.findFirst({
            where:{email:email}
        })

        if(!user){
            return res.status(404).json({message:"User Not found"})
        }

        const isPasswordValid = await compareSync(password,user.password);

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = await jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(200).json({message:"User Login Sucessfully",token,user})
    } catch (error) {
         return res.status(500).json({message:"Internal Server Error"})
    }
}
