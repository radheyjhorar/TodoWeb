const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const { protect } = require('./middleware/authMiddleware')

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: 'https://todowebfrontend.netlify.app/'
}));
app.use(express.json());

app.get("/apitest", (req, res) => {
  res.send("API is running...");
});

app.use('/api/users', userRoutes);
app.use('/api/todos', protect, todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));