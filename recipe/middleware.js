

const isvelid=(req,res,next)=>{
    const { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body;

    
    if (!name || !description || !preparationTime || !cookingTime || !imageUrl || !country || veg === undefined) {
         res.status(400).send('All fields are required');
      }
      else{
        next()
      }
}

module.exports=isvelid