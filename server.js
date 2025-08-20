// Simple static server for public folder
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './')));

app.listen(PORT, () => {
  console.log(`Heart 2 Heart app running at http://localhost:${PORT}`);
});
