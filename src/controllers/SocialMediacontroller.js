import socialmedia from "../models/SocialmediaModel.js";
//create new visitor

const createSocialMedia = async(req,res) =>{

    const { instagram ,facebook, whatsapp ,youtube } = req.body;

    // Check if required fields are present in the request body
    try {
        // Create a new visitor using the Visitor model and save it to the database
        const newlink = new socialmedia({
            instagram,
            facebook,
            whatsapp,
            youtube
        });
        await newlink.save()

        // Respond with the newly created visitor object
        res.status(201).json(newlink);
    } catch (error) {
        // Handle errors, such as validation errors or database connection issues
        console.error("Error saving social link data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



//get all  social media
const getsocialmedia = async(req,res) =>{
try {
    // Find all visitors in the database
    const socialMedias = await socialmedia.find();

    // Respond with the array of visitor objects
    res.status(200).json(socialMedias);
} catch (error) {
    // Handle errors, such as database errors
    console.error("Error getting social media:", error);
    res.status(500).json({ error: "Internal Server Error" });
}}





// get single visitor
const getSingleSocialmedia = async(req,res)=>{
const {SocialMediaId} = req.body;
    
try {
    // Find the visitor by ID in the database
    const Socialmedia = await socialmedia.findById(SocialMediaId);

    if (Socialmedia) {
        // If the visitor is found, respond with their information
        res.status(200).json(Socialmedia);
    } else {
        // If the visitor with the given ID was not found, respond with a 404 Not Found status
        res.status(404).json({ message: 'social media  not found' });
    }
} catch (error) {
    // Handle errors, such as database errors or invalid ID format
    console.error("Error getting social media:", error);
    res.status(500).json({ error: "Internal Server Error" });
}}


// delete  social media

const  deletesocialMedia = async(req,res) =>{

  const socialmediaid = req.params.id;

try {
    // Find the visitor by ID and remove it from the database
    const deletedsocialmedia = await socialmedia.findByIdAndDelete(socialmediaid);

    // If the visitor was found and deleted, respond with a success message
    if (deletedsocialmedia) {
        res.status(200).json({ message: 'social media deleted successfully' });
    } else {
        // If the visitor with the given ID was not found, respond with a 404 Not Found status
        res.status(404).json({ message: 'social media  not found' });
    }
} catch (error) {
    // Handle errors, such as database errors or invalid ID format
    console.error("Error deleting social media:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
}


//update social media 

const updatesocialmedia = async (req, res) => {
    const { id } = req.params; // Assuming the social media ID is in the route parameter
    const updateFields = req.body; // Fields to update, sent in the request body

    try {
        // Check if the social media entry with the given ID exists
        const existingSocialmedia = await socialmedia.findById(id);

        if (existingSocialmedia) {
            // If the social media entry exists, proceed with the update
            const updatedSocialmedia = await socialmedia.findByIdAndUpdate(
                id,
                updateFields,
                { new: true } // To get the updated document in the response
            );

            // Respond with the updated social media data
            res.status(200).json(updatedSocialmedia);
        } else {
            // If the social media entry with the given ID was not found, respond with a 404 Not Found status
            res.status(404).json({ message: 'Social media not found' });
        }
    } catch (error) {
        // Handle errors, such as database errors, validation errors, or invalid ID format
        console.error("Error updating social media:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




export { createSocialMedia, getsocialmedia, getSingleSocialmedia, deletesocialMedia ,updatesocialmedia}
