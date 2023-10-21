import Visitor from "../../src/models/visitormodel.js";
//create new visitor

const createvisitor = async(req,res) =>{

    const { First_Name, Last_Name, Phone_Number, Email, Message } = req.body;

    // Check if required fields are present in the request body
    if (!First_Name || !Last_Name || !Phone_Number || !Email || !Message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Create a new visitor using the Visitor model and save it to the database
        const newVisitor = await Visitor.create({
            First_Name,
            Last_Name,
            Phone_Number,
            Email,
            Message
        });

        // Respond with the newly created visitor object
        res.status(201).json(newVisitor);
    } catch (error) {
        // Handle errors, such as validation errors or database connection issues
        console.error("Error saving visitor data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



//get all visitor 
const getallvisitors = async(req,res) =>{
try {
    // Find all visitors in the database
    const visitors = await Visitor.find();

    // Respond with the array of visitor objects
    res.status(200).json(visitors);
} catch (error) {
    // Handle errors, such as database errors
    console.error("Error getting visitors:", error);
    res.status(500).json({ error: "Internal Server Error" });
}}





// get single visitor
const getsinglevisitor = async(req,res)=>{
const visitorId = req.params.id;
    
try {
    // Find the visitor by ID in the database
    const visitor = await Visitor.findById(visitorId);

    if (visitor) {
        // If the visitor is found, respond with their information
        res.status(200).json(visitor);
    } else {
        // If the visitor with the given ID was not found, respond with a 404 Not Found status
        res.status(404).json({ message: 'Visitor not found' });
    }
} catch (error) {
    // Handle errors, such as database errors or invalid ID format
    console.error("Error getting visitor:", error);
    res.status(500).json({ error: "Internal Server Error" });
}}


// delete visitor 

const  deletevisitor = async(req,res) =>{

  const visitorId = req.params.id;

try {
    // Find the visitor by ID and remove it from the database
    const deletedVisitor = await Visitor.findByIdAndDelete(visitorId);

    // If the visitor was found and deleted, respond with a success message
    if (deletedVisitor) {
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } else {
        // If the visitor with the given ID was not found, respond with a 404 Not Found status
        res.status(404).json({ message: 'Visitor not found' });
    }
} catch (error) {
    // Handle errors, such as database errors or invalid ID format
    console.error("Error deleting visitor:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
}



export { createvisitor }
export{getallvisitors}
export{getsinglevisitor}
export{deletevisitor}

