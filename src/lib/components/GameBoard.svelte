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

   function handleIncrementCounter(): void {
      gameStore.incrementCounter();
   }

   function handleDecrementCounter(): void {
      gameStore.decrementCounter();
   }

   function handleAddToTeam1(): void {
      gameStore.addToTeam1();
   }

   function handleAddToTeam2(): void {
      gameStore.addToTeam2();
   }

</script>

{#if isGameComplete}
   <div class="game-complete">
      <h1>🎉 Game Complete! 🎉</h1>
      <p>You've finished all the questions!</p>

      <div class="final-scores">
         <div class="score-card team1">
            <h2>Team 1</h2>
            <div class="score-display">{$gameStore.team1Score}</div>
         </div>
         <div class="score-card team2">
            <h2>Team 2</h2>
            <div class="score-display">{$gameStore.team2Score}</div>
         </div>
      </div>

      {#if $gameStore.team1Score > $gameStore.team2Score}
         <p class="winner-text">🏆 Team 1 Wins! 🏆</p>
      {:else if $gameStore.team2Score > $gameStore.team1Score}
         <p class="winner-text">🏆 Team 2 Wins! 🏆</p>
      {:else}
         <p class="winner-text">It's a Tie! 🤝</p>
      {/if}

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
            <div class="score-section">
               <div class="score-counter">
                  <button on:click={handleDecrementCounter} class="counter-btn">−</button>
                  <div class="counter-display">{$gameStore.currentCounter}</div>
                  <button on:click={handleIncrementCounter} class="counter-btn">+</button>
               </div>

               <div class="team-buttons">
                  <button on:click={handleAddToTeam1} class="team-btn team1-btn">
                     Add to Team 1
                  </button>
                  <button on:click={handleAddToTeam2} class="team-btn team2-btn">
                     Add to Team 2
                  </button>
               </div>

               <div class="score-display-row">
                  <div class="team-score">
                     <span class="team-label">Team 1:</span>
                     <span class="team-points">{$gameStore.team1Score}</span>
                  </div>
                  <div class="team-score">
                     <span class="team-label">Team 2:</span>
                     <span class="team-points">{$gameStore.team2Score}</span>
                  </div>
               </div>

               <button on:click={handleNextQuestion} class="next-btn">
                  Next Question
               </button>
            </div>
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
      flex-direction: column;
      gap: 1rem;
      align-items: center;
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

   .final-scores {
      display: flex;
      gap: 2rem;
      justify-content: center;
      margin-bottom: 2rem;
   }

   .score-card {
      background-color: #f8fafc;
      border-radius: 0.75rem;
      padding: 2rem;
      min-width: 200px;
      text-align: center;
      border: 2px solid #cbd5e1;
   }

   .score-card h2 {
      margin: 0 0 1rem 0;
      color: #1e293b;
      font-size: 1.5rem;
   }

   .score-display {
      font-size: 3rem;
      font-weight: 700;
      color: #2563eb;
   }

   .score-card.team1 {
      border-color: #3b82f6;
   }

   .score-card.team2 {
      border-color: #ef4444;
   }

   .winner-text {
      font-size: 2rem;
      color: #16a34a;
      font-weight: 600;
      margin-bottom: 2rem;
   }

   .score-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      padding: 1.5rem;
      background-color: #f8fafc;
      border-radius: 0.75rem;
      border: 2px solid #cbd5e1;
      width: 100%;
      max-width: 500px;
   }

   .score-counter {
      display: flex;
      align-items: center;
      gap: 1rem;
   }

   .counter-btn {
      background-color: #6366f1;
      color: white;
      border: none;
      width: 3rem;
      height: 3rem;
      font-size: 1.5rem;
      font-weight: 600;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
   }

   .counter-btn:hover {
      background-color: #4f46e5;
      transform: scale(1.05);
   }

   .counter-display {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      min-width: 80px;
      text-align: center;
   }

   .team-buttons {
      display: flex;
      gap: 1rem;
      width: 100%;
      justify-content: center;
   }

   .team-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
      max-width: 200px;
   }

   .team1-btn {
      background-color: #3b82f6;
      color: white;
   }

   .team1-btn:hover {
      background-color: #2563eb;
      transform: translateY(-2px);
   }

   .team2-btn {
      background-color: #ef4444;
      color: white;
   }

   .team2-btn:hover {
      background-color: #dc2626;
      transform: translateY(-2px);
   }

   .score-display-row {
      display: flex;
      gap: 2rem;
      justify-content: center;
      width: 100%;
   }

   .team-score {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.125rem;
      font-weight: 600;
   }

   .team-label {
      color: #64748b;
   }

   .team-points {
      font-size: 1.5rem;
      color: #1e293b;
      min-width: 50px;
      text-align: center;
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

      .final-scores {
         flex-direction: column;
         gap: 1rem;
      }

      .score-card {
         min-width: auto;
      }

      .team-buttons {
         flex-direction: column;
      }

      .team-btn {
         max-width: 100%;
      }

      .score-display-row {
         flex-direction: column;
         gap: 1rem;
      }

      .team-score {
         justify-content: space-between;
         width: 100%;
      }
   }
</style>
