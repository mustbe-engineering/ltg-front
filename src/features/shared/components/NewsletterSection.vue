<script setup lang="ts">
import { ref } from 'vue';
import { useLanguage } from '../../../services/languageService';

const { currentLang } = useLanguage();

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

    const response = await fetch('https://cms.ladiesthegathering.com/.netlify/functions/save-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail.value,
        recaptchaToken: token
      })
    });
    
    // If it's not OK, the body might be HTML (404 catch-all), which causes SyntaxError on .json()
    if (!response.ok) {
      const errorText = await response.text(); 
      if (errorText.includes('<!DOCTYPE')) {
        throw new Error("API Route not found (Received HTML instead of JSON). Check your file path.");
      }
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.message || "Error en el servidor");
      } catch (e) {
        throw new Error("Error en el servidor (Respuesta no válida)");
      }
    }

    const data = await response.json();

    statusMessage.value = currentLang.value === 'es' ? '¡Éxito! Te has suscrito correctamente.' : 'Success! You have successfully subscribed.';
    userEmail.value = '';
    console.log("Success:", data);
  } catch (err: any) {
    console.error("Submission error", err);
    isError.value = true;
    statusMessage.value = err.message || (currentLang.value === 'es' ? 'Hubo un error de conexión.' : 'There was a connection error.');
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
          {{ currentLang === 'es' ? 'Suscríbete para recibir noticias de torneos, nuevos episodios del podcast y secretos del reino directamente en tu bandeja de entrada (vía cuervo digital).' : 'Subscribe to receive tournament news, new podcast episodes, and kingdom secrets directly in your inbox (via digital raven).' }}
        </p>
        <form @submit.prevent="submitEmail" class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-sm">
          <input 
            v-model="userEmail"
            type="email" 
            :placeholder="currentLang === 'es' ? 'tu_correo@reino.com' : 'your_email@kingdom.com'" 
            required
            class="flex-1 bg-transparent border-none text-white placeholder-brand-secondary/50 px-6 py-3 focus:outline-none focus:ring-0 rounded-full" 
          />
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-dark px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-brand-primary/30 transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? (currentLang === 'es' ? 'Enviando...' : 'Sending...') : (currentLang === 'es' ? 'Suscribirse' : 'Subscribe') }}
          </button>
        </form>
        
        <p v-if="statusMessage" :class="['text-sm mt-4 transition-all', isError ? 'text-red-400' : 'text-brand-primary']">
          {{ statusMessage }}
        </p>
        
        <p class="text-xs text-brand-secondary/50 mt-4">
          {{ currentLang === 'es' ? 'Prometemos no enviar spam ni hechizos de confusión.' : 'We promise not to send spam or confusion spells.' }}
        </p>
      </div>
    </div>
  </section>
</template>
