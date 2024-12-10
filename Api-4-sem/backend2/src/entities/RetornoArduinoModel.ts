import mongoose from 'mongoose';

// Schema para o modelo RetornoArduino
const RetornoArduinoSchema = new mongoose.Schema({
  id: String,
  time: Number,
  bat: Number,
  dir: Number,
  vel: Number,
  plu: Number,
  umi: Number,
  temp: Number,
  prs: Number,
});

const RetornoArduinoModelo = mongoose.model('RetornoArduino', RetornoArduinoSchema);

export default RetornoArduinoModelo;
