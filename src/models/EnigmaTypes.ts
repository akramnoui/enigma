export interface Rotor {
    wiring: string; // Wiring sequence, e.g., "EKMFLGDQVZNTOWYHXUSPAIBRCJ"
    notch: string;  // The position where the next rotor steps
    position: number; // Current rotor position (0-25)
    ringSetting: number; // Ring setting offset (0-25)
  }
  
  export interface Plugboard {
    connections: Record<string, string>; // Maps one letter to another
  }
  
  export interface Reflector {
    wiring: Record<string, string>; // Maps a letter to its reflected letter
  }
  
  export interface EnigmaConfig {
    rotors: Rotor[];
    reflector: Reflector;
    plugboard: Plugboard;
  }
  