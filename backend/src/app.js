const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const entityRoutes = require('./routes/entity');
const workflowRoutes = require('./routes/workflow');

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/workflows', workflowRoutes);

const PORT = process.env.PORT || 3000;

const setupSwagger = require('./docs/swagger');

setupSwagger(app);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection error:', err);
});
