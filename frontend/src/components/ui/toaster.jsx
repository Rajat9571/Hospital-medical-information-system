import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";

function Toaster({ ...props }) {
  return (
    <SonnerToaster
      data-slot="toaster"
      position="bottom-right"
      toastOptions={{
        className: "bg-background border border-input text-foreground",
      }}
      {...props}
    />
  );
}

export { Toaster };