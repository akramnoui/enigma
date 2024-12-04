import * as R from "ramda";
import { Reflector } from "../models/EnigmaTypes";

// Réflexion d’une lettre via le réflecteur
export const reflexion = (lettre: string, reflecteur: Reflector): string =>
  R.propOr(lettre, lettre, reflecteur.wiring);
