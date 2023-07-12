const {Category,Product}=require('../db')


const getAllCategory=async(req,res)=>{
    try {
        const category=await Category.findAll({
          include:[{model:Product}]
        })
        res.json(category)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


const getCategoryByid=async(req,res)=>{
    try {
        const category=await Category.findOne({
          where:{
           id:req.params.id
          },
          include:[{model:Product}]
        })
        res.json(category)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      if(!name)throw new Error(`Type the ${name}`)
      const [category, created] = await Category.findOrCreate({
        where: { name },
        defaults: { name }
      });
  
      res.json(category);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

module.exports={
    getAllCategory,
    getCategoryByid,
    createCategory
}