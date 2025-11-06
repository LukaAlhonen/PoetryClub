import toast from "react-hot-toast";
import colors from "../colors";

export const notify = (msg: string) => toast(msg, {
  style: {
    background: colors.textEggshell,
    color: colors.backgroundBlack,
    border: "0.15rem solid gray",
    borderRadius: "0.5rem",
    // fontWeight: "bold",
    minWidth: "25rem"
  },
  position: window.innerWidth < 769 ? "bottom-center" : "top-center"
});

export const notifyError = (msg: string) => toast.error(msg, {
  style: {
    background: colors.wineRed,
    color: colors.textEggshell,
    border: "0.15rem solid gray",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    minWidth: "25rem"
  },
  icon: '❌',
  position: window.innerWidth < 769 ? "bottom-center" : "top-center"
})

export const notifySuccess = (msg: string) => toast.success(msg, {
  style: {
    background: colors.successGreen,
    color: colors.textEggshell,
    border: "0.15rem solid gray",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    minWidth: "25rem"
  },
  icon: '🍾',
  position: window.innerWidth < 769 ? "bottom-center" : "top-center"
})
