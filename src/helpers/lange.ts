// models
import { LangType } from "@models/lang.model";

export function getBrowserLanguage() {
  return navigator.language === LangType.uk ? LangType.uk : LangType.en;
}
