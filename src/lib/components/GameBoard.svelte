<script lang="ts">
   import { gameStore } from '../stores/gameStore';
   import Timer from './Timer.svelte';
   import Answer from './Answer.svelte';

   $: currentQuestion = $gameStore.config?.questions[$gameStore.currentQuestionIndex];
   $: showRevealAll = $gameStore.timerExpired && $gameStore.gameState === 'playing';
   $: showNextButton = $gameStore.gameState === 'question-complete';
   $: isGameComplete = $gameStore.gameState === 'game-complete';

   function handleRevealAnswer(index: number): void {
      gameStore.revealAnswer(index);
   }

   function handleRevealAll(): void {
      gameStore.revealAll();
   }

   function handleNextQuestion(): void {
      gameStore.nextQuestion();
   }

   function handleRestart(): void {
      gameStore.resetGame();
   }
</script>

{#if isGameComplete}
   <div class="game-complete">
      <h1>🎉 Game Complete! 🎉</h1>
      <p>You've finished all the questions!</p>
      <button on:click={handleRestart} class="restart-btn">
         Start New Game
      </button>
   </div>
{:else if currentQuestion}
   <div class="game-board">
      <div class="header">
         <div class="question-info">
            <span class="question-number">
               Question {$gameStore.currentQuestionIndex + 1} of {$gameStore.config?.questions.length}
            </span>
         </div>
         <h2 class="question-text">{currentQuestion.text}</h2>
      </div>

      {#key $gameStore.currentQuestionIndex}
         <Timer duration={$gameStore.config?.timerDuration || 60} />
      {/key}

      <div class="answers-grid">
         {#each currentQuestion.answers as answer, index}
            <Answer
               number={index + 1}
               text={answer}
               revealed={$gameStore.revealedAnswers[index]}
               onClick={() => { return handleRevealAnswer(index); }}
            />
         {/each}
      </div>

      <div class="controls">
         {#if showRevealAll}
            <button on:click={handleRevealAll} class="reveal-all-btn">
               Reveal All Answers
            </button>
         {/if}

         {#if showNextButton}
            <button on:click={handleNextQuestion} class="next-btn">
               Next Question
            </button>
         {/if}
      </div>
   </div>
{/if}

<style>
   .game-board {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
   }

   .header {
      margin-bottom: 2rem;
   }

   .question-info {
      text-align: center;
      margin-bottom: 1rem;
   }

   .question-number {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 600;
   }

   .question-text {
      text-align: center;
      font-size: 2rem;
      color: #1e293b;
      margin: 0;
      padding: 1.5rem;
      background-color: #f8fafc;
      border-radius: 0.75rem;
      border: 2px solid #cbd5e1;
   }

   .answers-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
   }

   .controls {
      display: flex;
      gap: 1rem;
      justify-content: center;
   }

   .reveal-all-btn,
   .next-btn,
   .restart-btn {
      padding: 1rem 2rem;
      font-size: 1.125rem;
      font-weight: 600;
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   }

   .reveal-all-btn {
      background-color: #eab308;
      color: white;
   }

   .reveal-all-btn:hover {
      background-color: #ca8a04;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
   }

   .next-btn {
      background-color: #16a34a;
      color: white;
   }

   .next-btn:hover {
      background-color: #15803d;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
   }

   .game-complete {
      text-align: center;
      padding: 4rem 2rem;
      max-width: 600px;
      margin: 0 auto;
   }

   .game-complete h1 {
      font-size: 3rem;
      color: #16a34a;
      margin-bottom: 1rem;
   }

   .game-complete p {
      font-size: 1.5rem;
      color: #64748b;
      margin-bottom: 2rem;
   }

   .restart-btn {
      background-color: #2563eb;
      color: white;
   }

   .restart-btn:hover {
      background-color: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
   }

   @media (max-width: 1024px) {
      .answers-grid {
         grid-template-columns: repeat(3, 1fr);
      }
   }

   @media (max-width: 640px) {
      .game-board {
         padding: 1rem;
      }

      .question-text {
         font-size: 1.5rem;
         padding: 1rem;
      }

      .answers-grid {
         grid-template-columns: repeat(2, 1fr);
         gap: 0.75rem;
      }

      .controls {
         flex-direction: column;
      }

      .reveal-all-btn,
      .next-btn {
         width: 100%;
      }

      .game-complete h1 {
         font-size: 2rem;
      }

      .game-complete p {
         font-size: 1.25rem;
      }
   }
</style>
