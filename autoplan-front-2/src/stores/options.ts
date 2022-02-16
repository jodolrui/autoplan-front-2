import { defineStore } from "pinia";

export const useOptionsStore = defineStore("options", {
  actions: {
    toggleDarkMode() {
      document.body.classList.toggle("dark");
    },
    toggleFullScreen() {
      // element which needs to enter full-screen mode
      var element: Element | null = document.querySelector("#app");

      // make the element go to full-screen mode
      if (element)
        element
          .requestFullscreen()
          .then(function () {
            // element has entered fullscreen mode successfully
          })
          .catch(function (error) {
            // element could not enter fullscreen mode
          });
    },
  },
});
