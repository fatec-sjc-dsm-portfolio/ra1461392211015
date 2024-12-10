import { ArduinoRepository } from "../repository/RetornoArduinoRepository";
import { RetornoArduino } from '../entities/RetornoArduino';


export class ArduinoService {
    private repository: ArduinoRepository;
  
    constructor(repository: ArduinoRepository) {
      this.repository = repository;
    }
  
    async fetchDataFromRepository(): Promise<RetornoArduino[]> {
      return await this.repository.getData();
    }

    
  }
