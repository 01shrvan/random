export interface TarotCard {
    name: string;
    position: string;
    meaning: string;
  }
  
  export interface TarotOutput {
    reading: TarotCard[];
    spread: string;
    question: string;
    narrative: string;
  }
  
  export interface SecretOutput {
    subject: string;
    trait: string;
    intensity: string;
    revelation: string;
    warning: string;
  }