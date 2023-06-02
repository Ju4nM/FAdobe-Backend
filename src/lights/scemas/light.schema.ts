import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type LightDocument = HydratedDocument<Light>;

@Schema()
export class Light {

    @Prop({unique: true, required: true})
    lightName: string;

    @Prop({required: true})
    status: boolean;

}

export const LightSchema = SchemaFactory.createForClass(Light);

