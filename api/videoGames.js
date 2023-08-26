const express = require('express');
const router = express.Router();
const { updateVideoGameName } = require('../db/videoGames'); 

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        const videoGameId = req.params.id;
        const videoGame = await getVideoGameById(videoGameId);
        res.json(videoGame); // Send the response as JSON
    } catch (error) {
        next(error);
    }
});


// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    try {
        const newVideoGame = req.body;
        const createdVideoGame = await createVideoGame(newVideoGame);
        res.status(201).json(createdVideoGame);
    } catch (error) {
        next(error);
    }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    try {
        const videoGameId = req.params.id;
        const { name, description, imgUrl } = req.body; // Assuming these are the fields you want to update
        const updatedVideoGame = await updateVideoGame(videoGameId, { name, description, imgUrl });
        res.json(updatedVideoGame);
    } catch (error) {
        next(error);
    }
});


// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    try {
        const videoGameId = req.params.id;
        await deleteVideoGame(videoGameId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
