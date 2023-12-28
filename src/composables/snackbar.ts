import { ref } from "vue";

export function useSnackbar() {
  const snackbar = ref({
    show: false,
    message: "",
    color: "info"
  })

  function showSnackbar(status: "success" | "error" | "warning" | "info", msg: string) {
    snackbar.value.show = true;
    snackbar.value.color = status;
    snackbar.value.message = msg
  }

  return {
    snackbar,
    showSnackbar
  }
}
