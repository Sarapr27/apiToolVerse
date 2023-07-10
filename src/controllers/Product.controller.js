require("dotenv").config();
const {Product, Category} = require("../db");
const {Op, literal} = require("sequelize");

/* ----------------------------------- */
/* GET ENDPOINTS                       */
/* ----------------------------------- */

const getAllProducts = async(req, res) => {
    try {
        const products = await Product.findAll({include: Category});
        return res.status(200).json(products);
    } catch (error) {
        res.status(404).json({error: "Products not found"});
    }
};

const getProductById = async(req, res) => {

    const {id} = req.params;

    try {
        const product = await Product.findByPk(id, {include: Category});
        res.status(200).json(product);
        
    } catch (error) {
        res.status(404).json({error: "Product not found"});
    }
};

const getProductByName = async(req, res) => {

    const {name} = req.query;

try {
    const searchValues = name.split(" ");

    const whereClause = searchValues.map(searchValue => ({
        [Op.or]: [
            {
                name: {
                    [Op.iLike]: `%${searchValue}%`
                }
            },
            {
                brand: {
                    [Op.iLike]: `%${searchValue}%`
                }
            }
        ]
    }));

    const product = await Product.findAll({
        where: {
            [Op.and]: whereClause
        },
        include: Category
    });
    res.status(200).json(product)

} catch (error) {
    res.status(404).json({error: "Product not found"});
}
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductByName
};