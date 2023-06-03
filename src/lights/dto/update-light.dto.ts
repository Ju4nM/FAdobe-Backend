import { PartialType } from "@nestjs/mapped-types";
import { CreateLightDto } from "./create-light.dto";
import { IsMongoId, IsBoolean } from "class-validator";

export class UpdateLightDto extends PartialType(CreateLightDto) {
	
	@IsMongoId()
	id: string;

	@IsBoolean()
	status: boolean;
}
