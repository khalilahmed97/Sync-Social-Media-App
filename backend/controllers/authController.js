import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const registerUser = async (req, res) =>{

    const url = req.protocol + '://' + req.get('host')
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body
        const userAlreadyExist = await User.findOne({email:email})
        if(userAlreadyExist){
            res.status(409).send("USER ALREADY EXIST")
        }
        else{
            const salt = await bcryptjs.genSalt();
            const hashPassword = await bcryptjs.hash(password, salt)
    
            const newUser =
                {
                    firstName,
                    lastName,
                    email,
                    password: hashPassword,
                    picturePath: url + '/public/' + picturePath,
                    friends,
                    location,
                    occupation,
                    viewedProfile: Math.floor(Math.random()) * 10000,
                    impressions : Math.floor(Math.random() * 10000)
                }
            const savedUser = await User.create(newUser)
            res.status(200).json(savedUser)
        }
        
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const loginUser = async (req, res) => {

    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
    
        if(!user){
            res.status(400).json({message:"USER DOES NOT EXIST."})
        }
        const isMatch = bcryptjs.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({message:"PASSWORD INVALID"})
        }
    
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.status(200).json({token, user})
    
    }

    catch(error){
        res.status(500).json({message: error.message})
    }
    

}


export {loginUser, registerUser};