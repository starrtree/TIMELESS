import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        class?: string;
        "camera-orbit"?: string;
        "camera-controls"?: boolean;
        "disable-pan"?: boolean;
        "interaction-prompt"?: string;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: string;
        "rotation-per-second"?: string;
        "shadow-intensity"?: string;
        "environment-image"?: string;
        exposure?: string;
        onLoad?: () => void;
        loading?: "auto" | "lazy" | "eager";
      };
    }
  }
}

export {};
