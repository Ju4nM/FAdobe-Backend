import { Inject, Injectable } from "@nestjs/common";
import { CreateLightDto } from "./dto/create-light.dto";
import { UpdateLightDto } from "./dto/update-light.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Light, LightDocument } from "./scemas/light.schema";
import { Model, ObjectId } from "mongoose";
import { ToggleLightDto } from "./dto/toggle-light.dto";

@Injectable()
export class LightsService {
	constructor(
		@InjectModel(Light.name) private LightModel: Model<LightDocument>,
	) {}

	async findAll(): Promise<Light[]> {
		return await this.LightModel.find();
	}

	async toggle(id: string): Promise<Light[]> {
		let currentLight: Light = await this.LightModel.findById(id);
		await this.LightModel.findByIdAndUpdate(
			{
				_id: id
			},
			{
				status: !currentLight.status
			}
		);
		// let lightToggled: Light = await this.LightModel.findById(id);
		// lightToggled.status = !currentLight.status;
		return await this.findAll();
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
