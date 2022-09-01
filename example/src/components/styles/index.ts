import { mkcss } from "./csser";

export const makeLayout = mkcss("mt-12 max-w-[1024px] m-auto py-8 grid gap-4");

export const makeExample = mkcss("flex", "flex-col", "items-center");

export const makeButton = mkcss(
  "text-lg",
  "bg-[#00a3ff]",
  "rounded-md",
  "px-6",
  "py-2",
  "my-2",
  "text-black",
  "font-bold",
  "w-full"
);
