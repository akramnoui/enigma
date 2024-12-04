import * as R from "ramda";
import { Plugboard } from "../models/EnigmaTypes";

// Échange une lettre à l'aide du tableau de connexion (plugboard)
export const echangePlugboard = (lettre: string, plugboard: Plugboard): string =>
  R.propOr(lettre, lettre, plugboard.connections);
