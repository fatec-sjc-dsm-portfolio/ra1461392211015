import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fazenda } from './fazenda.entity';
import { FazendasService } from './fazendas.service';
import { FazendasController } from './fazendas.controller';
import { GeojsonModule } from '../geojson/geojson.module';
import { FazendasCoordenadasModule } from 'src/fazendas-coordenadas/fazendas-coordenadas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fazenda]),
    forwardRef(() => GeojsonModule), // Usando forwardRef para evitar dependência circular
    forwardRef(() => FazendasCoordenadasModule)
  ],
  providers: [FazendasService],
  controllers: [FazendasController],
  exports: [FazendasService], // Exportando FazendasService
})

export class FazendasModule {}
