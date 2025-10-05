import { writable } from 'svelte/store';
import type { GameConfig, GameStoreState } from '../types/game';

const initialState: GameStoreState = {
   config: null,
   currentQuestionIndex: 0,
   revealedAnswers: [],
   timerExpired: false,
   gameState: 'config-loading',
};

function createGameStore() {
   const { subscribe, set, update } = writable<GameStoreState>(initialState);

   return {
      subscribe,
      loadConfig: (config: GameConfig): void => {
         update((state) => {
            return {
               ...state,
               config,
               currentQuestionIndex: 0,
               revealedAnswers: new Array(10).fill(false),
               timerExpired: false,
               gameState: 'playing',
            };
         });
      },
      revealAnswer: (index: number): void => {
         update((state) => {
            const newRevealed = [ ...state.revealedAnswers ];
            
            newRevealed[index] = true;
            
            const allRevealed = newRevealed.every((r) => {
               return r;
            });
            
            return {
               ...state,
               revealedAnswers: newRevealed,
               gameState: allRevealed ? 'question-complete' : state.gameState,
            };
         });
      },
      revealAll: (): void => {
         update((state) => {
            return {
               ...state,
               revealedAnswers: new Array(10).fill(true),
               gameState: 'question-complete',
            };
         });
      },
      nextQuestion: (): void => {
         update((state) => {
            const nextIndex = state.currentQuestionIndex + 1;
            const isGameComplete = state.config && nextIndex >= state.config.questions.length;
            
            return {
               ...state,
               currentQuestionIndex: nextIndex,
               revealedAnswers: new Array(10).fill(false),
               timerExpired: false,
               gameState: isGameComplete ? 'game-complete' : 'playing',
            };
         });
      },
      setTimerExpired: (expired: boolean): void => {
         update((state) => {
            return {
               ...state,
               timerExpired: expired,
            };
         });
      },
      resetGame: (): void => {
         set(initialState);
      },
   };
}

export const gameStore = createGameStore();
