// middleware/asyncHandler.js

/**
 * Enveloppe un handler async et transmet toute erreur (throw ou rejet)
 * au middleware d'erreur via next(err). Nécessaire sous Express 4 ;
 * inoffensif et explicite sous Express 5 (qui le fait déjà nativement).
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
