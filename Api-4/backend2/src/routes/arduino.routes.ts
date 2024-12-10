import { Router } from 'express';
import express from 'express';
import { getAllData } from '../controller/retornoArduinoController';

const arduinorouter = express.Router();


arduinorouter.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
  });

arduinorouter.get('/data', getAllData);

export default arduinorouter;

