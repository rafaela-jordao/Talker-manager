const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(watchedAt);

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!date) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};
