<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'grid'">
      <path d="M3.5 11 12 3.5 20.5 11" />
      <path d="M5.5 9.5v10h13v-10M9.5 19.5v-6h5v6" />
    </template>
    <template v-else-if="name === 'people'">
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 19.5v-1.2A5.5 5.5 0 0 1 12 12.8a5.5 5.5 0 0 1 5.5 5.5v1.2" />
      <path d="M17.5 6.2a2.6 2.6 0 0 1 0 5M19.3 13.6a4 4 0 0 1 2.2 3.6" />
    </template>
    <template v-else-if="name === 'pulse'">
      <path d="M3 12h4l2.2-5.5 4.1 11 2.2-5.5H21" />
    </template>
    <template v-else-if="name === 'wallet'">
      <path d="M4 6.5h13.5a2 2 0 0 1 2 2v10H5.5A2.5 2.5 0 0 1 3 16V7.5A2.5 2.5 0 0 1 5.5 5H17" />
      <path d="M15.5 11h6v4h-6a2 2 0 0 1 0-4Z" />
      <circle cx="17" cy="13" r=".5" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </template>
    <template v-else-if="name === 'hands'">
      <path d="M12 20s-7-4.2-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.8-7 10-7 10Z" />
      <path d="M8.5 12.2h2.2l1-2.1 1.5 4 1-1.9h1.4" />
    </template>
    <template v-else-if="name === 'file'">
      <path d="M6 3.5h8l4 4v13H6Z" />
      <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
    </template>
    <template v-else>
      <path d="M3.5 7.5h6l2-2h9v13h-17Z" />
      <path d="M3.5 9.5h17" />
    </template>
  </svg>
</template>
