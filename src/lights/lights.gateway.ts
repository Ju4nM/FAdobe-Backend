import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	WebSocketServer,
	ConnectedSocket,
} from "@nestjs/websockets";
import { LightsService } from "./lights.service";
import { Server, Socket } from "socket.io";
import { ToggleLightDto } from "./dto/toggle-light.dto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Light } from "./scemas/light.schema";

@WebSocketGateway({ cors: true })
export class LightsGateway {
	constructor(private readonly lightsService: LightsService) {}

	@WebSocketServer()
	server: Server;

	async handleConnection (@ConnectedSocket() client: Socket, ...args: any[]) {
		let lights: Light[] = await this.lightsService.findAll();
		client.emit("connection", lights);
		console.log(client.id);
	}

	@SubscribeMessage("findAllLights")
	findAll() {
		return this.lightsService.findAll();
	}

	@SubscribeMessage("toggleLight")
	async toggleLight(@ConnectedSocket() client: Socket, @MessageBody() data: {id: string}) {
		if (typeof data != "object") return;

		const toggleLightDto = plainToClass(ToggleLightDto, data);
		let errors = await validate(toggleLightDto);

		if (errors.length > 0) {
			let errorList: string[] = errors.reduce((errs: any, currentError: any) => {
				let error = Object.values(currentError.constraints)[0];
				errs.push(error);
				return errs;
			}, []);
			client.emit("errors", errorList);
			return;
		}
		
		let lightsUpdated: Light[] = await this.lightsService.toggle(data.id);

		this.server.emit("onLightToggled", lightsUpdated);
	}
}
