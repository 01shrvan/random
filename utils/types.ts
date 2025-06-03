export interface UserProfile {
  id: string;
  name?: string;
  age?: number;
  onboardingComplete: boolean;
  createdAt: Date;
  lastSession: Date;
}

export interface LifeState {
  currentChallenges: string[];
  emotionalState: 'very_low' | 'low' | 'neutral' | 'good' | 'excellent';
  stressLevel: number; // 1-10
  supportSystem: 'none' | 'limited' | 'moderate' | 'strong';
  priorities: string[];
  goals: string[];
}

export interface TherapySession {
  id: string;
  userId: string;
  timestamp: Date;
  mood: string;
  topics: string[];
  insights: string[];
  actionItems: string[];
  progress: string;
}

export interface OnboardingData {
  personalInfo: {
    name?: string;
    age?: number;
    occupation?: string;
  };
  lifeState: LifeState;
  therapeuticGoals: string[];
  preferredApproach: 'cognitive' | 'mindfulness' | 'solution_focused' | 'mixed';
}

export interface TherapyOutput {
  sessionSummary: string;
  insights: string[];
  recommendations: string[];
  exercises: string[];
  followUpQuestions: string[];
  moodAssessment: string;
}