const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const {
  getGames,
  addGame,
  updateGame,
  removeGame,
} = require('../controllers/game.controller');

router
  .get('/:id?', getGames)
  .post(
    '/',
    [
      body('title').isString().withMessage("Value for 'title' must be a string").notEmpty().trim().escape(),
      body('games_console').isString().withMessage("Value for 'games_console' must be a string").notEmpty().trim().escape(),
      body('cover_url').isString().withMessage("Value for 'cover_url' must be a string").notEmpty().trim().escape(),
    ],
    addGame,
  )
  .put(
    '/:id',
    [
      body('title').isString().withMessage("Value for 'title' must be a string").optional().trim().escape(),
      body('games_console').isString().withMessage("Value for 'games_console' must be a string").optional().trim().escape(),
      body('cover_url').isString().withMessage("Value for 'cover_url' must be a string").optional().trim().escape(),
    ],
    updateGame,
  )
  .delete('/:id', removeGame);

module.exports = router;
