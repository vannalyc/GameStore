const client = require('./client');
const util = require('util');

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
            SELECT * FROM videoGames;
        `);
        return videoGames;
    } catch (error) {
        throw new Error("An error occurred while fetching all video games.");
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}
// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    const { name, description, price } = body;
    try {
        const { rows: [newVideoGame] } = await client.query(`
            INSERT INTO videoGames(name, description, price)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [name, description, price]);
        return newVideoGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    const { insert, vals } = dbFields(fields);

    if (!insert) {
        return;
    }

    try {
        const { rows: [updatedVideoGame] } = await client.query(`
            UPDATE videoGames
            SET ${insert}
            WHERE id = $${vals.length + 1}
            RETURNING *;
        `, [...vals, id]);
        return updatedVideoGame;
    } catch (error) {
        throw error;
    }
}


// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const { rows: [deletedVideoGame] } = await client.query(`
            DELETE FROM videoGames
            WHERE id = $1
            RETURNING *;
        `, [id]);
        return deletedVideoGame;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}
