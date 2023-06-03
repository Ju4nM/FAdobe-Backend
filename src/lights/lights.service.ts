import { Inject, Injectable } from "@nestjs/common";
import { CreateLightDto } from "./dto/create-light.dto";
import { UpdateLightDto } from "./dto/update-light.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Light, LightDocument } from "./scemas/light.schema";
import { Model } from "mongoose";

@Injectable()
export class LightsService {
	constructor(
		@InjectModel(Light.name) private LightModel: Model<LightDocument>,
	) {}

	async findAll(): Promise<Light[]> {
		return await this.LightModel.find();
	}

	update(id: number, updateLightDto: UpdateLightDto) {
		return `This action updates a #${id} light`;
	}

	async getStatus() {
		let lights: Light[] = await this.findAll();
		let status = {};
		lights.forEach((light) => {
			status[light.lightName] = light.status;
		});

		return status;
	}
}
