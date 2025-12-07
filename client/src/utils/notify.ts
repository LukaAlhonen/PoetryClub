import toast from "react-hot-toast";
import colors from "../colors";

export const notify = (msg: string) => toast(msg, {
  style: {
    background: colors.bg2,
    color: colors.eggShellWhite,
    border: `0.10rem solid ${colors.darkGray}`,
    borderRadius: "0.3rem",
    // fontWeight: "bold",
    minWidth: "25rem"
  },
  position: window.innerWidth < 769 ? "bottom-center" : "top-center"
});

export const notifyError = (msg: string) => toast.error(msg, {
  style: {
    background: colors.wineRed,
    color: colors.eggShellWhite,
    border: `0.10rem solid ${colors.darkGray}`,
    borderRadius: "0.3rem",
    fontWeight: "bold",
    minWidth: "25rem"
  },
  icon: '❌',
  position: window.innerWidth < 769 ? "bottom-center" : "top-center"
})

export const notifySuccess = (msg: string) => toast.success(msg, {
  style: {
    background: colors.successGreen,
    color: colors.eggShellWhite,
    border: `0.10rem solid ${colors.darkGray}`,
    borderRadius: "0.3rem",
    fontWeight: "bold",
    minWidth: "25rem"
  },
  icon: '🍾',
  position: window.innerWidth < 769 ? "bottom-center" : "top-center"
})
