(async function run() {
  const [arg] = process.argv.slice(2);
  // const challenge = require(`./challenges/${arg}`);
  const challenge = require(`./challenges/13`);
  challenge.default();
})();
