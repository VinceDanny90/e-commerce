<template>
    <label :for="$attrs.id">
        {{ label }}
        <input class="form-control"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue',$event.target.value)">
    </label>
</template>

<script>
    export default {
        inheritAttrs: false,
    }
</script>

<script setup>
 defineProps({
    label:{
        type: String,
    },
    modelValue:{
        type: [String, Number]
    }
 })

</script>

