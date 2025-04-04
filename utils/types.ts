export interface MemePrediction {
  name: string;
  position: string;
  meaning: string;
}
  
export interface MemeOracleOutput {
  reading: MemePrediction[];
  spread: string;
  question: string;
  narrative: string;
}
  
export interface VibeOutput {
  subject: string;
  trait: string;
  intensity: string;
  revelation: string;
  advice: string;
}