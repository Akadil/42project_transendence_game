import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapters';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
    /**
     * The NestFactory class is the application's entry point.
     * It exposes a few static methods that allow creating an application instance.
     * The create() method returns an application object, which fulfills the
     *        INestApplication interface.
     */
    const app = await NestFactory.create(AppModule);

    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    // app.useWebSocketAdapter(IoAdapter);
    app.useWebSocketAdapter(redisIoAdapter);

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
