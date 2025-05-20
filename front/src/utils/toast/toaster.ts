import iziToast from "izitoast";

/**
 * Displays a success message as a toast notification.
 *
 * @param {string} message - The success message to display.
 */
export const toastSuccess = (message: string) => {
  iziToast.success({
    title: "Succès",
    message,
    position: "topRight",
    timeout: 4000,
    color: "green",
  });
};

/**
 * Displays an information's message as a toast notification.
 *
 * @param {string} message - The message to display.
 */
export const toastInfo = (message: string) => {
  iziToast.info({
    position: "topRight",
    timeout: 4000,
    message,
  });
};

/**
 * Displays a warning's message as a toast notification.
 *
 * @param {string} message - The message to display.
 */
export const toastWarning = (message: string) => {
  iziToast.warning({
    position: "center",
    timeout: 10000,
    message,
  });
};

/**
 * Displays a confirmation toast with two actions.
 *
 * @param {string} message - The message to display..
 * @param {() => void} onConfirm - Function called if the user confirms.
 */
export const toastConfirm = (message: string, onConfirm: () => void) => {
  iziToast.question({
    timeout: false,
    close: false,
    overlay: true,
    displayMode: 1,
    position: "center",
    message,
    buttons: [
      [
        "<button><strong>Oui</strong></button>",
        (
          _instance,
          toast,
          _button,
          _event,
          _inputs
        ) => {
          iziToast.hide({}, toast, "button");
          onConfirm();
        },
        true
      ],
      [
        "<button>Annuler</button>",
        (
          _instance,
          toast,
          _button,
          _event,
          _inputs
        ) => {
          iziToast.hide({}, toast, "button");
        },
        false,
      ],
    ],
  });
};
