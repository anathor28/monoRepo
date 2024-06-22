#!/bin/bash

set -e # Stop le script si une commande échoue

MONOREPO_NAME="bankApis"
MICROSERVICES=("api-gateway" "compte-service" "epargne-service" "investissement-service")
SHARED_PACKAGES=("common" "database")

# Fonction pour créer un fichier à partir d'un heredoc
create_file() {
    local file_path=$1
    cat > "$file_path" << EOL
$2
EOL
}

# Créer le dossier principal du monorepo
mkdir "$MONOREPO_NAME" && cd "$_"

# Créer les fichiers racine
create_file "package.json" '{
  "name": "banque-app-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "prestart:dev": "docker-compose up -d",
    "start:dev": "pnpm --parallel -r run start:dev",
    "poststart:dev": "docker-compose down",
    "start:dev:full": "npm run prestart:dev && npm run start:dev && npm run poststart:dev"
  },
  "devDependencies": {
    "@nestjs/cli": "latest"
  }
}'

create_file "tsconfig.json" '{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}'

create_file "pnpm-workspace.yaml" 'packages:
  - "apps/*"
  - "packages/*"'

# Créer les dossiers pour les applications et les packages partagés
mkdir -p apps packages

# Créer les microservices
for service in "${MICROSERVICES[@]}"; do
    mkdir -p "apps/$service/src"
    cd "apps/$service"

    create_file "webpack-hmr.config.js" 'const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ["webpack/hot/poll?100", options.entry],
    externals: [
      nodeExternals({
        allowlist: ["webpack/hot/poll?100"],
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename }),
    ],
  };
};'

    # Créer package.json pour chaque service
    if [ "$service" == "api-gateway" ]; then
        create_file "package.json" '{
  "name": "api-gateway",
  "version": "1.0.0",
  "scripts": {
    "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.9",
    "@nestjs/core": "^10.3.9",
    "@nestjs/microservices": "^10.3.9",
    "@nestjs/platform-express": "^10.3.9",
    "amqplib": "^0.10.3",
    "amqp-connection-manager": "^4.1.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "mqtt": "^5.3.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.2",
    "@types/node": "^20.14.8",
    "typescript": "^5.5.2",
    "webpack": "^5.0.0",
    "webpack-cli": "^4.0.0",
    "webpack-node-externals": "^3.0.0",
    "run-script-webpack-plugin": "^0.2.0",
    "ts-loader": "^9.4.2",
    "tsconfig-paths": "^4.2.0"
  }
}'
    else
        create_file "package.json" '{
  "name": "'$service'",
  "version": "1.0.0",
  "scripts": {
    "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.9",
    "@nestjs/core": "^10.3.9",
    "@nestjs/microservices": "^10.3.9",
    "@nestjs/platform-express": "^10.3.9",
    "amqplib": "^0.10.3",
    "amqp-connection-manager": "^4.1.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.2",
    "@types/node": "^20.14.8",
    "typescript": "^5.5.2",
    "webpack": "^5.0.0",
    "webpack-cli": "^4.0.0",
    "webpack-node-externals": "^3.0.0",
    "run-script-webpack-plugin": "^0.2.0",
    "ts-loader": "^9.4.2",
    "tsconfig-paths": "^4.2.0"
  }
}'
    fi

    create_file "tsconfig.json" '{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": "./"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}'

    # Créer le fichier main.ts
    if [ "$service" == "api-gateway" ]; then
        create_file "src/main.ts" 'import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://localhost:5672"],
      queue: "api_gateway_queue",
      queueOptions: {
        durable: false
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: "mqtt://localhost:1883",
    },
  });

  await app.startAllMicroservices();
  await app.listen(8096);
  console.log("API Gateway is listening on port 8096");
}
bootstrap();'
    else
        create_file "src/main.ts" 'import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672"],
        queue: "'$service'_queue",
        queueOptions: {
          durable: false
        },
      },
    },
  );
  await app.listen();
  console.log("'$service' is listening");
}
bootstrap();'
    fi

    create_file "src/app.module.ts" 'import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}'

    cd ../..
done

# Créer les packages partagés
for package in "${SHARED_PACKAGES[@]}"; do
    mkdir -p "packages/$package"
    create_file "packages/$package/package.json" '{
  "name": "@banque-app/'$package'",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}'
done

# Installer les dépendances
pnpm install

echo "Structure du monorepo créée avec succès !"