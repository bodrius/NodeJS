const bcryptjs = require("bcryptjs");

async function main() {
  const hash = await bcryptjs.hash("55678yhbtrewqA", 5);
  console.log("hash", hash);
}

main();
