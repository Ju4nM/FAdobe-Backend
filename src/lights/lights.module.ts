import { Module } from '@nestjs/common';
import { LightsService } from './lights.service';
import { LightsGateway } from './lights.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Light, LightSchema } from './scemas/light.schema';
import { LightsController } from './lights.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Light.name,
        schema: LightSchema
      }
    ])
  ],
  controllers: [LightsController],
  providers: [LightsGateway, LightsService]
})
export class LightsModule {}
