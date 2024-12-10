import { RetornoArduino } from "../entities/RetornoArduino";


export interface IRetornoArduino {

  getData(): Promise<RetornoArduino[]>
  }
  