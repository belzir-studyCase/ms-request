
import express from "express";
import RequestTB from "../models/request.js";


const router = express.Router();

// Create a new request
router.post('/', async (req, res) => {
    const { title, description, userID , email } = req.body;

    try {
        const newRequest = new RequestTB({ title, description, userID , email });
        newRequest.stats = "Pending" 
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/user/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const requests = await RequestTB.find({ email });
        if (requests.length === 0) return res.status(404).json({ message: 'No requests found for this email' });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read all requests
router.get('/', async (req, res) => {
    try {
        const requests = await RequestTB.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a specific request by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const request = await RequestTB.findById(id);
        if (!request) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a specific request by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, userID } = req.body;

    try {
        const updatedRequest = await RequestTB.findByIdAndUpdate(
            id,
            { title, description, userID },
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/update-status/:id', async (req, res) => {
    const { id } = req.params;
    const { stats } = req.body;

    try {
        const updatedRequest = await RequestTB.findByIdAndUpdate(
            id,
            { stats },
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a specific request by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRequest = await RequestTB.findByIdAndDelete(id);
        if (!deletedRequest) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





export default router;