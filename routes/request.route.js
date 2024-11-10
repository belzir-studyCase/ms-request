import express from "express";
import RequestTB from "../models/request.js";
import axios from "axios";
import { createRequest,getRequestbyEmail, getRequestbyID } from "../controller/request.controller.js";

const router = express.Router();

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Create a new request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               userID:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Request created successfully
 *       500:
 *         description: Request created but notification failed
 *       400:
 *         description: Error creating request
 */
router.post('/', async (req, res) => {
    const { title, description, userID, email } = req.body;
    try {
        const newRequest = new RequestTB({ title, description, userID, email, stats: "Pending" });
        const data = await createRequest(newRequest);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /requests/user/{email}:
 *   get:
 *     summary: Get all requests for a specific user by email
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's email
 *     responses:
 *       200:
 *         description: List of requests for the specified user
 *       404:
 *         description: No requests found for this email
 *       500:
 *         description: Server error
 */

router.get('/user/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const requests = await getRequestbyEmail(email);
        if (requests.length === 0) {
            return res.status(404).json({ message: 'No requests found for this email' });
        }
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /requests:
 *   get:
 *     summary: Get all requests
 *     responses:
 *       200:
 *         description: List of all requests
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const requests = await RequestTB.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /requests/{id}:
 *   get:
 *     summary: Get a specific request by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The request ID
 *     responses:
 *       200:
 *         description: Request details
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const request = await getRequestbyID(id);
        if (!request) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /requests/{id}:
 *   put:
 *     summary: Update a specific request by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               userID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request updated successfully
 *       404:
 *         description: Request not found
 *       400:
 *         description: Error updating request
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, userID } = req.body;
    try {
        const updatedRequest = await RequestTB.findByIdAndUpdate(
            id,
            { title, description, userID },
            { new: true, runValidators: true }
        );
        if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /requests/update-status/{id}:
 *   put:
 *     summary: Update the status of a specific request by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stats:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: Request not found
 *       400:
 *         description: Error updating status
 */
router.put('/update-status/:id', async (req, res) => {
    const { id } = req.params;
    const { stats } = req.body;
    try {
        const updatedRequest = await RequestTB.findByIdAndUpdate(
            id,
            { stats },
            { new: true, runValidators: true }
        );
        if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
        await axios.post(`https://gateway-9pxx.onrender.com/notification/update/request/state/${updatedRequest._id}`);
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /requests/{id}:
 *   delete:
 *     summary: Delete a specific request by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The request ID
 *     responses:
 *       200:
 *         description: Request deleted successfully
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */
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
