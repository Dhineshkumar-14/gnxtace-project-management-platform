import { toast } from "sonner";

export const successToast = (msg) => toast.success(msg);
export const errorToast = (msg) => toast.error(msg);
export const infoToast = (msg) => toast(msg);
