<script setup>
defineProps({ label: String, value: [String, Number], hint: String, accent: Boolean })
</script>
<template><article class="metric-card" :class="{ accent }"><span>{{ label }}</span><strong>{{ value }}</strong><small v-if="hint">{{ hint }}</small></article></template>
