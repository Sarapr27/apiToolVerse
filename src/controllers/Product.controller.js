require("dotenv").config();
const {Product} = require("../db");
const {Op, literal} = require("sequelize");

/* ----------------------------------- */
/* GET ENDPOINTS                       */
/* ----------------------------------- */

const getAllProducts = async(req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        res.status(404).json({error: "Products not found"});
    }
};

const getProductById = async(req, res) => {

    const {id} = req.params;

    try {
        const product = await Product.findByPk(id);
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
    });
    res.status(200).json(product)

} catch (error) {
    res.status(404).json({error: "Product not found"});
}
};

/* ----------------------------------- */
/* POST ENDPOINTS                       */
/* ----------------------------------- */

const createOneProduct = async (obj) => {
    try {
        const product = await Product.findOrCreate({
            where: {
                brand: obj.brand,
                name: obj.name,
                model: obj.model,
                feature: obj.feature,
                detail: obj.detail,
                price: obj.price,
                image: obj.image,
            }
        });
        return product;
    } catch (error) {
        throw error;
    }
};


const createProducts = async(req, res) => {
    const products = req.body;

    try {
        if(!products) throw new Error("Not products available");
        if(!Array.isArray(products) && !(typeof products === "object" && products !== null)) throw new Error("products must be of type array or of type object");

        const validateObject = (obj) => {
            const modelObj = {
                brand: "string",
                name: "string",
                model: "string",
                feature: "string",
                detail: "string",
                price: "number",
                image: "string"
            };
            const errors = [];

            for(const prop in modelObj) {
                if(!obj.hasOwnProperty(prop)) {
                    errors.push(`Falta la propiedad "${prop}".`);
                }else if (typeof obj[prop] !== modelObj[prop]) {
                    errors.push(`La propiedad "${prop}" tiene un tipo invalido. Se esperaba "${modelObj[prop]}", se recibio "${typeof obj[prop]}".`);
                }
            }
        if(errors.length > 0) throw new Error(errors.join("\n"));
        }

        if(Array.isArray(products)){
            products.forEach(el => {
                validateObject(el);
            });
            for(let i = 0; i < products.length; i++){
                await createOneProduct(products[i]);
            }
            res.status(200).send("Productos creados exitosamente");
        }
        else if(typeof products === "object" && products !== null){
            validateObject(products);
            await createOneProduct(products);
            res.status(200).send("producto creado exitosamente");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = {
    getAllProducts,
    getProductById,
    getProductByName,
    createProducts
};