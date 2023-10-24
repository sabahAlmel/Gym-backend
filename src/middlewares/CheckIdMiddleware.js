export function checkReqId(req, res, next){
    console.log(req.body.id)
    console.log(req.body)
    return res.send(req.body)
    req.body.id ? next() : res.status(500).json({message: 'Provide an id'})
}
function checkIdLength(req,res,next){
    const id = req.body.id
    const length = id.length
    if(length === 12 || length === 24){
        next()
    }else{
        res.json({message: "Wrong id length!"})
    }
}