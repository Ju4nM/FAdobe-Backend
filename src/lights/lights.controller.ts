import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { LightsService } from "./lights.service";
import { ToggleLightDto } from "./dto/toggle-light.dto";

@Controller("lights")
export class LightsController {
	constructor(private lightService: LightsService) {}

	@Get()
	async findAllLights() {
		return await this.lightService.findAll();
	}

	@Get("status")
	async getLightsStatus() {
		return await this.lightService.getStatus();
	}

	@Put(":id")
	async toggleLight (@Param("id") id: string, @Body() toggleLightDto: ToggleLightDto) {
		// return await this.lightService.toggle(id, toggleLightDto);
	}
}
