import Vant, { Lazyload } from "vant";
import { createPinia } from "pinia";
const useVant = () => {
  if (!window.Vant) {
    window.Vant = Vant;
    window.app.use(Vant);
    window.app.use(Lazyload, {
      lazyComponent: true
    });
  }
};
const usePinia = () => {
  if (!window.Pinia) {
    window.Pinia = true;
    window.app.use(createPinia());
  }
};
export {
  usePinia,
  useVant
};
