const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { readContentFile } = require('./readWriteFile');
const randomToken = require('./randomToken');
const loginValidation = require('./loginValidation');
const authValidation = require('./authorization');

const { nameValidation, 
        ageValidation,
        talkValidation,
        watchedAtValidation,
        rateValidation } = require('./talkerValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await readContentFile();

  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  try {
    const talkers = await readContentFile();
    const { id } = req.params;

    const talker = talkers.find((t) => t.id === Number(id));

    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talker);
  } catch (error) {
    return res.status(500).end();
  }
});

// req. 3 e 4 - validando login e gerando token aleatório
app.post('/login', loginValidation, (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    return res.status(200).json({ token: randomToken() });
  }
});

app.use(authValidation);

app.post('/talker',
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation, async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await readContentFile();

  const id = talkers.length + 1;
  const newTalker = { id, name, age, talk };
  const result = [...talkers, newTalker];
  
  await fs.writeFile('./talker.json', JSON.stringify(result));
  return res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
