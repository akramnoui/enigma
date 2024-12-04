import { echangePlugboard } from "./utilsPlugboard";
import { transformationRotor, avancerRotors } from "./utilsRotors";
import { reflexion } from "./utilsReflecteur";
import { EnigmaConfig, Rotor } from "../models/EnigmaTypes";

// Chiffrement d'une lettre par la machine Enigma
const chiffrerLettre = (config: EnigmaConfig, rotors: Rotor[], lettre: string): string => {
  if (!/[A-Z]/.test(lettre)) return lettre; // Ignorer les caractères non alphabétiques

  // Passage initial par le tableau de connexion (plugboard)
  const lettreInitiale = echangePlugboard(lettre, config.plugboard);

  // Passage avant dans les rotors
  const passageAvant = rotors.reduce(
    (lettreChiffree, rotor) => transformationRotor(lettreChiffree, rotor, true),
    lettreInitiale
  );

  // Réflexion via le réflecteur
  const lettreReflechie = reflexion(passageAvant, config.reflecteur);

  // Passage arrière dans les rotors
  const passageArriere = rotors.reduceRight(
    (lettreChiffree, rotor) => transformationRotor(lettreChiffree, rotor, false),
    lettreReflechie
  );

  // Passage final par le plugboard
  return echangePlugboard(passageArriere, config.plugboard);
};

// Chiffrement d’un message complet
export const chiffrerMessage = (config: EnigmaConfig, message: string): string => {
  const rotorsInitials = config.rotors;

  const resultat = message.split("").reduce(
    ({ messageChiffre, rotors }, lettre) => {
      const nouvelleLettre = chiffrerLettre(config, rotors, lettre);
      return {
        messageChiffre: messageChiffre + nouvelleLettre,
        rotors: avancerRotors(rotors),
      };
    },
    { messageChiffre: "", rotors: rotorsInitials }
  );

  return resultat.messageChiffre;
};
