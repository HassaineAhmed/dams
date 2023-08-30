"use client";

import { ClipLoader, PuffLoader } from "react-spinners";

export const Loader = ({ color }: { color?: string }) => {
  return <ClipLoader color={`${color ? color : "#3498db"}`} size={50} />
};
export const PuffSpinner = ({ color }: { color?: string }) => {
  return <PuffLoader color={`${color ? color : "#3498db"}`} size={50} />
};
