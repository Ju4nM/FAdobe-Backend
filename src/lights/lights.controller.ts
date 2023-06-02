import { Controller, Get } from '@nestjs/common';
import { LightsService } from './lights.service';

@Controller('lights')
export class LightsController {

    constructor (private lightService: LightsService) {}

    @Get()
    async findAllLights () {
        return await this.lightService.findAll();
    }

    @Get("status")
    async getLightsStatus () {
        return await this.lightService.getStatus();
    }
}
