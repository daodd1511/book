<script setup></script>
<template>
  <div
    tabindex="-1"
    class="h-modal fixed top-0 right-0 left-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40 md:inset-0 md:h-full"
  >
    <div class="relative h-full w-full max-w-md p-4 md:h-auto">
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white shadow">
        <!-- Modal header -->
        <div class="flex justify-end p-2">
          <button
            type="button"
            class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            @click="$emit('closeModal')"
          >
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 pt-0 text-center">
          <svg
            class="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this book?
          </h3>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
