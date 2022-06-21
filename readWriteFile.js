const fs = require('fs').promises;

const readContentFile = async () => JSON.parse(await fs.readFile('./talker.json'));

/* const writeContentFile = async () => {
  const talkers = await readContentFile();

  const talkersToStr = JSON.stringify(talkers);
  await fs.writeFile('./talker.json', talkersToStr);
};  */

module.exports = {
  // writeContentFile,
  readContentFile,
};
