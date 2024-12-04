import * as R from "ramda";
import { Rotor } from "../models/EnigmaTypes";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Transformation d'une lettre par un rotor (avant ou arrière)
export const transformationRotor = (
  lettre: string,
  rotor: Rotor,
  avant: boolean
): string => {
  const index = (alphabet.indexOf(lettre) + rotor.position - rotor.ringSetting + 26) % 26;

  const transformee = avant
    ? rotor.cablage[index]
    : alphabet[rotor.cablage.indexOf(lettre)];

  return alphabet[
    (alphabet.indexOf(transformee) - rotor.position + rotor.ringSetting + 26) % 26
  ];
};

// Avancer un rotor
const avancerRotor = (rotor: Rotor): Rotor => ({
  ...rotor,
  position: (rotor.position + 1) % 26,
});

// Avancer tous les rotors en tenant compte des crans (notch)
export const avancerRotors = (rotors: Rotor[]): Rotor[] => {
  const rotorsAvances = R.adjust(0, avancerRotor, rotors);

  if (rotors[0].position === rotors[0].notch.charCodeAt(0) - "A".charCodeAt(0)) {
    const deuxiemeAvance = R.adjust(1, avancerRotor, rotorsAvances);

    if (rotors[1].position === rotors[1].notch.charCodeAt(0) - "A".charCodeAt(0)) {
      return R.adjust(2, avancerRotor, deuxiemeAvance);
    }

    return deuxiemeAvance;
  }

  return rotorsAvances;
};
