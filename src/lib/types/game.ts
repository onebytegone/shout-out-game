export interface Answer {
   text: string;
   revealed: boolean;
}

export interface Question {
   text: string;
   answers: string[];
}

export interface GameConfig {
   timerDuration: number;
   questions: Question[];
}

export type GameState = 'config-loading' | 'config-loaded' | 'playing' | 'question-complete' | 'game-complete';

export interface GameStoreState {
   config: GameConfig | null;
   currentQuestionIndex: number;
   revealedAnswers: boolean[];
   timerExpired: boolean;
   gameState: GameState;
   team1Score: number;
   team2Score: number;
   currentCounter: number;
}
