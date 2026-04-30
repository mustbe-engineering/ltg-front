<script setup lang="ts">
import { ref } from 'vue';

const userEmail = ref('');
const isSubmitting = ref(false);
const statusMessage = ref('');
const isError = ref(false);

async function submitEmail() {
  if (!userEmail.value || isSubmitting.value) return;
  
  isSubmitting.value = true;
  statusMessage.value = '';
  isError.value = false;

  try {
    // Execute reCAPTCHA to get the token
    const token = await (window as any).grecaptcha.execute('6LdKwNEsAAAAADLfFIY_tGTcslx9pbMKI7pVpq3R', { action: 'submit' });

    const response = await fetch('/.netlify/functions/save-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail.value,
        recaptchaToken: token
      })
    });
    
    const data = await response.json();

    if (response.ok) {
      statusMessage.value = '¡Éxito! Te has suscrito correctamente.';
      userEmail.value = '';
    } else {
      isError.value = true;
      statusMessage.value = data.message || 'Hubo un error al suscribirse.';
    }
  } catch (err) {
    console.error("Submission error", err);
    isError.value = true;
    statusMessage.value = 'Hubo un error de conexión.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section class="py-20 relative overflow-hidden">
    <!-- Background Decorations -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-dark to-black z-0"></div>
    <div class="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
    </div>
    
    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-3xl mx-auto text-center text-white">
        <h2 class="text-3xl md:text-5xl font-serif font-bold mb-4">
          Royal Tea
        </h2>
        <p class="text-brand-secondary mb-8 text-lg">
          Suscríbete para recibir noticias de torneos, nuevos episodios del podcast y secretos del reino directamente en tu bandeja de entrada (vía cuervo digital).
        </p>
        <form @submit.prevent="submitEmail" class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-sm">
          <input 
            v-model="userEmail"
            type="email" 
            placeholder="tu_correo@reino.com" 
            required
            class="flex-1 bg-transparent border-none text-white placeholder-brand-secondary/50 px-6 py-3 focus:outline-none focus:ring-0 rounded-full" 
          />
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-dark px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-brand-primary/30 transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Enviando...' : 'Suscribirse' }}
          </button>
        </form>
        
        <p v-if="statusMessage" :class="['text-sm mt-4 transition-all', isError ? 'text-red-400' : 'text-brand-primary']">
          {{ statusMessage }}
        </p>
        
        <p class="text-xs text-brand-secondary/50 mt-4">
          Prometemos no enviar spam ni hechizos de confusión.
        </p>
      </div>
    </div>
  </section>
</template>
