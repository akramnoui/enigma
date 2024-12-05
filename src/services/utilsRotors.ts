import { Rotor } from "../models/EnigmaTypes";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Function to transform a letter through a rotor (forward or backward)
export const transformationRotor = (
  lettre: string,
  rotor: Rotor,
  avant: boolean
): string => {
  // Find the index of the letter in the alphabet, shifted by the rotor's position
  const index = (alphabet.indexOf(lettre) + rotor.position - rotor.ringSetting + 26) % 26;

  // Perform the forward or backward transformation
  const transformee = avant
    ? rotor.cablage[index]
    : alphabet[rotor.cablage.indexOf(alphabet[index])];

  // Adjust back for the rotor's position and ring setting
  return alphabet[
    (alphabet.indexOf(transformee) - rotor.position + rotor.ringSetting + 26) % 26
  ];
};

// Function to advance a single rotor
const avancerRotor = (rotor: Rotor): Rotor => ({
  ...rotor,
  position: (rotor.position + 1) % 26,
});

// Function to advance all rotors, considering the notch positions
export const avancerRotors = (rotors: Rotor[]): Rotor[] => {
  const newRotors = [...rotors]; // Create a shallow copy of the rotors array

  // Advance the first rotor
  newRotors[0] = avancerRotor(newRotors[0]);

  // Check the notch of the first rotor to determine if the second rotor should advance
  if (
    newRotors[0].position ===
    (newRotors[0].notch.charCodeAt(0) - "A".charCodeAt(0))
  ) {
    newRotors[1] = avancerRotor(newRotors[1]);

    // Check the notch of the second rotor to determine if the third rotor should advance
    if (
      newRotors[1].position ===
      (newRotors[1].notch.charCodeAt(0) - "A".charCodeAt(0))
    ) {
      newRotors[2] = avancerRotor(newRotors[2]);
    }
  }

  console.log("Advanced Rotors:", newRotors);
  return newRotors;
};
