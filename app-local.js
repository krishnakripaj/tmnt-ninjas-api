const app = require("./server/app");

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Successfully running on Port ${PORT}`);
});
