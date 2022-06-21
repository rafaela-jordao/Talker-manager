const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile } = require('./readWriteFile');
const randomToken = require('./randomToken');

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

// req. 3 - retorna um token aleatório de 16 caracteres
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    return res.status(200).json({ token: randomToken() });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
