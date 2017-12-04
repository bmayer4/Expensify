const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000;

const app = express();

//register middleware, which runs on each request
app.use(express.static(publicPath));

//will match all unmatched routes, since /create is not in the public folder
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up!`);
  });
  