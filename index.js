const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://engineering:EtPlsWeOvXng0bvR@light.l0uusyy.mongodb.net/?retryWrites=true&w=majority&appName=light', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
