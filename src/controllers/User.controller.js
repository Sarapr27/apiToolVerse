const {User} =require('../db')


const getAllUsers = async(req, res) => {
    try {
        const user = await User.findAll();
        return res.json(user);
    } catch (error) {
        res.status(404).json({error: "user not found"});
    }
};

const getUserById = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        res.json(user);
        
    } catch (error) {
        res.status(404).json({error: "user not found"});
    }
};

const getUserByName = async(req, res) => {
    const {firstName} = req.query;
try {
    const search = firstName.split(" ");

    const searchName = search.map(value => ({
        [Op.or]: [
            {
                name: {
                    [Op.iLike]: `%${value}%`
                }
            },
        ]
    }));

    const user = await User.findAll({
        where: {
            [Op.and]: searchName
        },
    });
    res.json(user)

} catch (error) {
    res.status(404).json({error: "User not found"});
}
};


const newUser =async(req,res) => {
    try {
     const {email,password,firstName,lastName,role,phone}=req.body
     if(!email||!password||!firstName||!lastName||!role||!phone){
        throw new Error(`Invalid`)
     }
     const user= await User.create({email,password,firstName,lastName,role,phone})
     res.json(user)  
    } catch (error) {
     res.status(404).json({error:error.message})
    }
}

const updateUser = async(req,res) => {
    try {
      const {id}=req.params
      const user= await User.findByPk(id)
      user.set(req.body)
      await user.save()
      res.json(user)  
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


const deleteUser = async(req,res)=>{
    try {
            const {id}=req.params
            const user= await User.findByPk(id)
            await user.destroy()
            res.json({success: true})  
        } catch (error) {
            res.status(404).json({error:error.message})
        }
}


module.exports={
    getAllUsers,
    getUserById,
    getUserByName,
    newUser,
    updateUser,
    deleteUser
}