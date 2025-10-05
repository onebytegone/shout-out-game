<script lang="ts">
   import { gameStore } from '../stores/gameStore';
   import type { GameConfig } from '../types/game';

   let jsonInput = '';
   let errorMessage = '';
   let fileInput: HTMLInputElement;

   function validateConfig(config: unknown): config is GameConfig {
      if (!config || typeof config !== 'object') {
         errorMessage = 'Invalid JSON: Must be an object';
         
         return false;
      }

      const cfg = config as Record<string, unknown>;

      if (typeof cfg.timerDuration !== 'number' || cfg.timerDuration <= 0) {
         errorMessage = 'Invalid config: timerDuration must be a positive number';
         
         return false;
      }

      if (!Array.isArray(cfg.questions) || cfg.questions.length === 0) {
         errorMessage = 'Invalid config: questions must be a non-empty array';
         
         return false;
      }

      for (let i = 0; i < cfg.questions.length; i++) {
         const q = cfg.questions[i];
         
         if (!q || typeof q !== 'object') {
            errorMessage = `Invalid config: question ${i + 1} must be an object`;
            
            return false;
         }

         const question = q as Record<string, unknown>;

         if (typeof question.text !== 'string' || question.text.trim() === '') {
            errorMessage = `Invalid config: question ${i + 1} must have a non-empty text field`;
            
            return false;
         }

         if (!Array.isArray(question.answers) || question.answers.length !== 10) {
            errorMessage = `Invalid config: question ${i + 1} must have exactly 10 answers`;
            
            return false;
         }

         for (let j = 0; j < question.answers.length; j++) {
            if (typeof question.answers[j] !== 'string' || question.answers[j].trim() === '') {
               errorMessage = `Invalid config: question ${i + 1}, answer ${j + 1} must be a non-empty string`;
               
               return false;
            }
         }
      }

      return true;
   }

   function handleJsonInput(): void {
      errorMessage = '';
      
      try {
         const parsed = JSON.parse(jsonInput);
         
         if (validateConfig(parsed)) {
            gameStore.loadConfig(parsed);
         }
      } catch (e) {
         errorMessage = `Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`;
      }
   }

   function handleFileUpload(event: Event): void {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) {
         return;
      }

      const reader = new FileReader();
      
      reader.onload = (e): void => {
         const text = e.target?.result as string;
         
         jsonInput = text;
         handleJsonInput();
      };
      
      reader.readAsText(file);
   }
</script>

<div class="config-loader">
   <h1>Shout Out Game</h1>
   <p class="subtitle">Load your game configuration to begin</p>

   <div class="input-section">
      <h2>Upload JSON File</h2>
      <input
         type="file"
         accept=".json"
         bind:this={fileInput}
         on:change={handleFileUpload}
         class="file-input"
      />
      <button on:click={() => { return fileInput.click(); }} class="upload-btn">
         Choose File
      </button>
   </div>

   <div class="divider">
      <span>OR</span>
   </div>

   <div class="input-section">
      <h2>Paste JSON</h2>
      <textarea
         bind:value={jsonInput}
         placeholder="Paste your game configuration JSON here..."
         rows="10"
         class="json-input"
      />
      <button on:click={handleJsonInput} class="load-btn">
         Load Configuration
      </button>
   </div>

   {#if errorMessage}
      <div class="error-message">
         {errorMessage}
      </div>
   {/if}

   <div class="help-section">
      <h3>Configuration Format</h3>
      <pre><code>{`{
  "timerDuration": 60,
  "questions": [
    {
      "text": "Name a popular pizza topping",
      "answers": [
        "Pepperoni", "Cheese", "Mushrooms",
        "Sausage", "Onions", "Peppers",
        "Olives", "Bacon", "Pineapple",
        "Anchovies"
      ]
    }
  ]
}`}</code></pre>
   </div>
</div>

<style>
   .config-loader {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
   }

   h1 {
      text-align: center;
      color: #2563eb;
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
   }

   .subtitle {
      text-align: center;
      color: #64748b;
      margin-bottom: 2rem;
   }

   .input-section {
      margin-bottom: 2rem;
   }

   h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: #1e293b;
   }

   .file-input {
      display: none;
   }

   .upload-btn,
   .load-btn {
      width: 100%;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: white;
      background-color: #2563eb;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s;
   }

   .upload-btn:hover,
   .load-btn:hover {
      background-color: #1d4ed8;
   }

   .json-input {
      width: 100%;
      padding: 0.75rem;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      border: 2px solid #cbd5e1;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      resize: vertical;
   }

   .json-input:focus {
      outline: none;
      border-color: #2563eb;
   }

   .divider {
      text-align: center;
      margin: 2rem 0;
      position: relative;
   }

   .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #cbd5e1;
   }

   .divider span {
      position: relative;
      background-color: white;
      padding: 0 1rem;
      color: #64748b;
      font-weight: 600;
   }

   .error-message {
      background-color: #fee2e2;
      color: #dc2626;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      border-left: 4px solid #dc2626;
   }

   .help-section {
      margin-top: 3rem;
      padding: 1.5rem;
      background-color: #f8fafc;
      border-radius: 0.5rem;
   }

   h3 {
      font-size: 1.125rem;
      margin-bottom: 1rem;
      color: #1e293b;
   }

   pre {
      background-color: #1e293b;
      color: #f8fafc;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      font-size: 0.875rem;
   }

   code {
      font-family: 'Courier New', monospace;
   }
</style>
