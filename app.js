const express = require('express');
const app = express();
const taskroutes = require('./routes/taskroutes');


app.use(express.json());
app.use('/tasks', taskroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

module.exports = app; 
