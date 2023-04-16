import React from "react";

export default function Loading() {
  return (
    <div class="flex justify-center items-center">
      <div
        class="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full"
        role="status"
      >
        <span class="visually-hidden"></span>
      </div>
    </div>
  );
}
