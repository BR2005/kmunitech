"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs_1 = require("fs");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const isProd = process.env.NODE_ENV === 'production';
    if (isProd) {
        const raw = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '';
        const allowedOrigins = raw
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        app.enableCors({ origin: allowedOrigins.length ? allowedOrigins : false, credentials: true });
    }
    else {
        // Dev-friendly: reflect request origin (works for 5173/4173/etc.)
        app.enableCors({ origin: true, credentials: true });
    }
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const uploadsRoot = (0, path_1.join)(process.cwd(), 'uploads');
    if (!(0, fs_1.existsSync)(uploadsRoot)) {
        (0, fs_1.mkdirSync)(uploadsRoot, { recursive: true });
    }
    app.useStaticAssets(uploadsRoot, { prefix: '/uploads' });
    await app.listen(process.env.PORT || 3000);
    console.log('Nest app listening on', process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map