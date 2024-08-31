import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.use(VuePlyr, {
    plyr: {},
  });
});
