// components for config

import { LangType } from "@models/lang.model";

export enum NavNamesPaths {
  home = "/",
  threeFirstScene = "/three/first-scene",
  threeSecondScene = "/three/second-scene",
  threeLoadModelTrain = "/three/load-model-train",
  threeAirplaneGame = "/three/airplane-game",
  blog = `/blog`,
}

export const NOTION_URL = {
  baseUrl: "https://notion-api.splitbee.io/v1/page",
  [LangType.en]: "18d4ad81d95c4083b090a218ef8ac6e9",
  [LangType.uk]: "6491d35c16f443d79190c790471100c2",
};
