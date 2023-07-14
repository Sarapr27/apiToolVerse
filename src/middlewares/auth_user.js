// module.exports=(req,res,next)=>{
//     // if(!req.originalUrl.includes("cc")) return next()
//     if(req.session.userId) return next()
//     res.redirect('/sessions')
// }

// module.exports = (req, res, next) => {
//     if (req.originalUrl.includes("xx") || req.originalUrl.includes("categories")) {
//       // Verificar si el usuario ha iniciado sesión para acceder a las rutas ccc
//       if (!req.session.userId) {
//         return res.redirect('/sessions');
//       }
//     }
//     falta bloquear las rutas xd
//     // Permitir acceso a otras rutas sin necesidad de iniciar sesión
//     return next();
//   };


