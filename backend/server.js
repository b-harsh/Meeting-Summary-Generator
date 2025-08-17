require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/summaries', require('./routes/api/Summaries'));
app.use('/api/generate', require('./routes/api/generate'));
app.use('/api/share', require('./routes/api/share'));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the Backend ! ' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
