<script lang="ts">
   import { gameStore } from './lib/stores/gameStore';
   import ConfigLoader from './lib/components/ConfigLoader.svelte';
   import GameBoard from './lib/components/GameBoard.svelte';
</script>

<main>
   {#if $gameStore.gameState === 'config-loading'}
      <ConfigLoader />
   {:else}
      <GameBoard />
   {/if}
</main>

<style>
   :global(body) {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
   }

   :global(*) {
      box-sizing: border-box;
   }

   main {
      min-height: 100vh;
      padding: 1rem;
   }
</style>
