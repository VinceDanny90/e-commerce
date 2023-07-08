<template>
    <component :is="type" class="btn">
        <slot></slot>
    </component>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();
const type = computed(() => (attrs.href ? "a" : "button"));

</script>

