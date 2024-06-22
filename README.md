# Banque App MonoRepo

Ce projet est un monorepo pour une application bancaire, utilisant NestJS pour les microservices.

## Structure du projet

bankApis/
├── apps/
│   ├── api-gateway/
│   ├── compte-service/
│   ├── epargne-service/
│   └── investissement-service/
├── packages/
│   ├── common/
│   └── database/
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json

## Prérequis

- Node.js (v14+)
- pnpm
- Docker et Docker Compose

## Installation

1. Clonez le repository
2. Installez les dépendances :

```bash
pnpm install
```


Développement
Pour lancer tous les services en mode développement :
pnpm run start:dev

Pour lancer un service spécifique :
pnpm --filter <service-name> run start:dev


Packages partagés
Common Package
Le package common contient des utilitaires et services partagés entre les différents microservices.

Utilisation
Pour utiliser le package common dans un service :

Ajoutez la dépendance dans le package.json du service :

"dependencies": {
  "@banque-app/common": "workspace:*"
}

Importez et utilisez les fonctionnalités :

import { RabbitMQService, MqttService } from '@banque-app/common';

Développement du package common
Pour travailler sur le package common :

Naviguez vers le dossier du package :

cd packages/common

Effectuez vos modifications
Compilez le package :

pnpm run build

Mettez à jour les dépendances du projet racine :

cd ../..
pnpm install

Database Package
Le package database gère les connexions et les modèles de base de données.

Utilisation
Pour utiliser le package database dans un service :

Ajoutez la dépendance dans le package.json du service :

"dependencies": {
  "@banque-app/database": "workspace:*"
}

Importez et utilisez les fonctionnalités :

import { DatabaseService, UserModel } from '@banque-app/database';

Développement du package database
Pour travailler sur le package database :

Naviguez vers le dossier du package :

cd packages/database

Effectuez vos modifications
Compilez le package :

pnpm run build

Mettez à jour les dépendances du projet racine

cd ../..
pnpm install

Tests

Pour exécuter les test de tous les packages et services:
pnpm test

Pour tester un service spécifique:
pnpm --filter <service-name> test
