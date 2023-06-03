import { IsMongoId, IsBoolean } from "class-validator";

export class ToggleLightDto {
	
	@IsMongoId()
	id: string;
}
