const { PORT } = require("./config");
const app = require("./app");

app.listen(PORT, () => console.log(`Api iniciado en el servidor :${PORT}`));
