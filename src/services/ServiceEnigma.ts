import { echangePlugboard } from "./utilsPlugboard";
import { transformationRotor, avancerRotors } from "./utilsRotors";
import { reflexion } from "./utilsReflecteur";
import { EnigmaConfig, Rotor } from "../models/EnigmaTypes";

// Chiffrement d'une lettre par la machine Enigma
export const chiffrerLettre = (
  config: EnigmaConfig,
  lettre: string,
  setConfig: React.Dispatch<React.SetStateAction<EnigmaConfig>>
): string => {
  if (!/[A-Z]/.test(lettre)) return lettre; // Ignore non-alphabetic characters

  // Initial pass through the plugboard
  const lettreInitiale = echangePlugboard(lettre, config.plugboard);

  // Forward pass through the rotors
  const passageAvant = config.rotors.reduce(
    (lettreChiffree, rotor) => transformationRotor(lettreChiffree, rotor, true),
    lettreInitiale
  );

  // Reflection via the reflector
  const lettreReflechie = reflexion(passageAvant, config.reflecteur);
  console.log("Reflected letter:", lettreReflechie);

  // Backward pass through the rotors
  const passageArriere = config.rotors.reduceRight(
    (lettreChiffree, rotor) => transformationRotor(lettreChiffree, rotor, false),
    lettreReflechie
  );

  // Final pass through the plugboard
  const lettreFinale = echangePlugboard(passageArriere, config.plugboard);

  // Advance the rotors after encrypting a single letter
  setConfig((prevConfig) => ({
    ...prevConfig,
    rotors: avancerRotors(prevConfig.rotors),
  }));

  return lettreFinale;
};

// Chiffrement d’un message complet
export const chiffrerMessage = (
  config: EnigmaConfig,
  message: string,
  setConfig: React.Dispatch<React.SetStateAction<EnigmaConfig>>
): string => {
  let messageChiffre = "";

  // Encrypt each letter in the message
  message.split("").forEach((lettre) => {
    const nouvelleLettre = chiffrerLettre(config, lettre, setConfig);
    messageChiffre += nouvelleLettre;
  });

  return messageChiffre;
};
