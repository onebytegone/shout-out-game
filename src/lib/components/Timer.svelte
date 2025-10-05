<script lang="ts">
   import { onMount, onDestroy } from 'svelte';
   import { gameStore } from '../stores/gameStore';

   export let duration: number;

   let remainingSeconds = duration;
   let intervalId: number | null = null;

   function formatTime(seconds: number): string {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
   }

   function getTimerClass(): string {
      if (remainingSeconds <= 10) {
         return 'danger';
      }
      
      if (remainingSeconds <= 30) {
         return 'warning';
      }
      
      return 'normal';
   }

   onMount(() => {
      remainingSeconds = duration;
      
      intervalId = window.setInterval(() => {
         remainingSeconds = remainingSeconds - 1;

         if (remainingSeconds <= 0) {
            if (intervalId !== null) {
               clearInterval(intervalId);
            }
            
            gameStore.setTimerExpired(true);
         }
      }, 1000);
   });

   onDestroy(() => {
      if (intervalId !== null) {
         clearInterval(intervalId);
      }
   });
</script>

<div class="timer {getTimerClass()}">
   <div class="timer-label">Time Remaining</div>
   <div class="timer-value">{formatTime(remainingSeconds)}</div>
</div>

<style>
   .timer {
      text-align: center;
      padding: 1.5rem;
      border-radius: 0.75rem;
      margin-bottom: 2rem;
      transition: all 0.3s ease;
   }

   .timer.normal {
      background-color: #dcfce7;
      border: 3px solid #16a34a;
   }

   .timer.warning {
      background-color: #fef3c7;
      border: 3px solid #eab308;
   }

   .timer.danger {
      background-color: #fee2e2;
      border: 3px solid #dc2626;
      animation: pulse 1s infinite;
   }

   @keyframes pulse {
      0%, 100% {
         transform: scale(1);
      }
      50% {
         transform: scale(1.02);
      }
   }

   .timer-label {
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 0.5rem;
   }

   .timer-value {
      font-size: 3rem;
      font-weight: 700;
      font-family: 'Courier New', monospace;
      color: #1e293b;
   }

   .timer.danger .timer-value {
      color: #dc2626;
   }

   .timer.warning .timer-value {
      color: #eab308;
   }

   .timer.normal .timer-value {
      color: #16a34a;
   }
</style>
