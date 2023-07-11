const {Category}=require('../db')


const getAllCategory=async(req,res)=>{
    try {
        const category=await Category.findAll()
        res.json(category)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


const getCategoryByid=async(req,res)=>{
    try {
        const category=await Category.findByPk(req.params.id)
        res.json(category)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
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