# Enigma Machine Simulator

## Description
This project is a fully functional simulator of the Enigma machine, built with **React** and **TypeScript**. The simulation replicates the core functionality of the original Enigma machine, allowing users to encrypt and decrypt messages interactively. The interface includes rotor controls, a plugboard, a reflector, and other components required for realistic encryption.

The Enigma machine was a cipher device used in the 20th century for secure communication. It worked by using multiple rotors, a plugboard, and a reflector to produce a highly secure, pseudo-random encryption of messages.

## Features
- **Encryption/Decryption:** Simulates the Enigma machine's encryption process.
- **Rotor Movement:** Rotors automatically advance after each key press.
- **Plugboard:** Allows custom plugboard connections for added complexity.
- **Reflector:** Simulates the real-world reflector wiring for accurate encryption.
- **Configurable Settings:** Customize rotors, plugboard, and reflector settings before encryption.
- **Reset Functionality:** Restore the default configuration at any time.

---

## How to Use the Simulation

### **To run the Enigma machine simulator, simply visit the following link:**

## [**Enigma Machine Simulator**](https://enigma-seven-xi.vercel.app)

### **How to Encrypt and Decrypt:**
1. **Customize the Machine Configuration:**
   - **Rotors:** Adjust rotor positions and settings in the *Rotor Settings* panel.
   - **Plugboard:** Add plugboard connections to swap letters.
   - **Reflector:** Configure the reflector wiring if needed (default wiring is provided).

2. **Encryption:**
   - Use the on-screen keyboard to input letters one by one.
   - The encrypted letters will appear on the lightboard and in the encrypted message panel.

3. **Decryption:**
   - To decrypt a message, use the same settings as for encryption. The Enigma machine uses the same configuration to reverse the encryption process.

---

## How the Enigma Machine Works

The Enigma machine works through a combination of several components:

1. **Rotors:**
   - The machine has multiple rotors, each with a unique wiring. The rotors are positioned at the start and rotate after each letter is pressed.
   - In this simulator, you can configure the rotors’ wiring, starting position, and the notch setting, which determines when the next rotor advances.

2. **Plugboard:**
   - The plugboard allows you to swap pairs of letters before the encryption and after the encryption, adding another layer of complexity. This can be customized in the *Plugboard Settings* panel.

3. **Reflector:**
   - The reflector reflects the signal back through the rotors, creating the encryption. This component is part of the machine’s complexity and helps ensure that encryption is reversible.

### **Default Configuration:**

Here is the default configuration used in the simulator:

```javascript
const defaultConfig: EnigmaConfig = {
  rotors: [
    {
      cablage: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      notch: "Q",
      position: 0,
      ringSetting: 0,
    },
    {
      cablage: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      notch: "E",
      position: 0,
      ringSetting: 0,
    },
    {
      cablage: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      notch: "V",
      position: 0,
      ringSetting: 0,
    },
  ],
  reflecteur: {
    wiring: {
      A: "Y",
      B: "R",
      C: "U",
      D: "H",
      E: "Q",
      F: "S",
      G: "L",
      H: "D",
      I: "P",
      J: "X",
      K: "N",
      L: "G",
      M: "O",
      N: "K",
      O: "M",
      P: "I",
      Q: "E",
      R: "B",
      S: "F",
      T: "Z",
      U: "C",
      V: "W",
      W: "V",
      X: "J",
      Y: "A",
      Z: "T",
    },
  },
  plugboard: { connections: {} },
};
