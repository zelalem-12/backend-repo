import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

(async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: "*" });
  await app.listen(5000);
})();
