import { writable } from 'svelte/store';
import type { GameConfig, GameStoreState } from '../types/game';

const initialState: GameStoreState = {
   config: null,
   currentQuestionIndex: 0,
   revealedAnswers: [],
   timerExpired: false,
   gameState: 'config-loading',
   team1Score: 0,
   team2Score: 0,
   currentCounter: 0,
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
               gameState: 'config-loaded',
            };
         });
      },
      startGame: (): void => {
         update((state) => {
            return {
               ...state,
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

            const revealedCount = newRevealed.filter(Boolean).length;

            return {
               ...state,
               revealedAnswers: newRevealed,
               gameState: allRevealed ? 'question-complete' : state.gameState,
               currentCounter: allRevealed ? revealedCount : state.currentCounter,
            };
         });
      },
      revealAll: (): void => {
         update((state) => {
            const revealedCount = state.revealedAnswers.filter(Boolean).length;
            return {
               ...state,
               revealedAnswers: new Array(10).fill(true),
               gameState: 'question-complete',
               currentCounter: revealedCount,
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
               currentCounter: 0,
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
      incrementCounter: (): void => {
         update((state) => {
            return {
               ...state,
               currentCounter: state.currentCounter + 1,
            };
         });
      },
      decrementCounter: (): void => {
         update((state) => {
            return {
               ...state,
               currentCounter: Math.max(0, state.currentCounter - 1),
            };
         });
      },
      resetCounter: (): void => {
         update((state) => {
            return {
               ...state,
               currentCounter: 0,
            };
         });
      },
      addToTeam1: (): void => {
         update((state) => {
            return {
               ...state,
               team1Score: state.team1Score + state.currentCounter,
               currentCounter: 0,
            };
         });
      },
      addToTeam2: (): void => {
         update((state) => {
            return {
               ...state,
               team2Score: state.team2Score + state.currentCounter,
               currentCounter: 0,
            };
         });
      },
   };
}

export const gameStore = createGameStore();
