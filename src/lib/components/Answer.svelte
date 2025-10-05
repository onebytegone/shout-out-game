<script lang="ts">
   export let number: number;
   export let text: string;
   export let revealed: boolean;
   export let onClick: () => void;
</script>

<button
   class="answer"
   class:revealed
   on:click={onClick}
   disabled={revealed}
>
   {#if revealed}
      <div class="answer-content">
         <span class="answer-number">{number}</span>
         <span class="answer-text">{text}</span>
      </div>
   {:else}
      <div class="answer-number-only">{number}</div>
   {/if}
</button>

<style>
   .answer {
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 0.75rem;
      padding: 1.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   }

   .answer:not(.revealed):hover {
      background-color: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
   }

   .answer:not(.revealed):active {
      transform: translateY(0);
   }

   .answer.revealed {
      background-color: #16a34a;
      cursor: default;
      animation: reveal 0.5s ease;
   }

   @keyframes reveal {
      0% {
         transform: rotateY(0deg);
         background-color: #2563eb;
      }
      50% {
         transform: rotateY(90deg);
      }
      100% {
         transform: rotateY(0deg);
         background-color: #16a34a;
      }
   }

   .answer-number-only {
      font-size: 2rem;
      font-weight: 700;
   }

   .answer-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
      width: 100%;
   }

   .answer-number {
      font-size: 1rem;
      opacity: 0.8;
      font-weight: 700;
   }

   .answer-text {
      font-size: 1.25rem;
      font-weight: 600;
      word-break: break-word;
   }

   @media (max-width: 640px) {
      .answer {
         padding: 1rem;
         min-height: 60px;
         font-size: 1rem;
      }

      .answer-number-only {
         font-size: 1.5rem;
      }

      .answer-text {
         font-size: 1rem;
      }
   }
</style>
