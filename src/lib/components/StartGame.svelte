<script lang="ts">
   import { gameStore } from '../stores/gameStore';

   function handleStartGame() {
      gameStore.startGame();
   }
</script>

<main>
   <div class="container">
      <h1>Ready to Play?</h1>
      <button on:click={handleStartGame}>Start Game</button>
   </div>
</main>

<style>
   main {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
   }

   .container {
      text-align: center;
      max-width: 500px;
   }

   h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #1e293b;
   }

   p {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      color: #64748b;
   }

   button {
      padding: 0.75rem 2rem;
      font-size: 1.125rem;
      font-weight: 600;
      color: white;
      background-color: #3b82f6;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s;
   }

   button:hover {
      background-color: #2563eb;
   }

   button:active {
      background-color: #1d4ed8;
   }
</style>
