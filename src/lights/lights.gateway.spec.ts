import { Test, TestingModule } from "@nestjs/testing";
import { LightsGateway } from "./lights.gateway";
import { LightsService } from "./lights.service";

describe("LightsGateway", () => {
	let gateway: LightsGateway;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LightsGateway, LightsService],
		}).compile();

		gateway = module.get<LightsGateway>(LightsGateway);
	});

	it("should be defined", () => {
		expect(gateway).toBeDefined();
	});
});
