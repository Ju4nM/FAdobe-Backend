import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { LightsModule } from "./lights/lights.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		MongooseModule.forRoot(process.env.MONGO_URI),
		LightsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
