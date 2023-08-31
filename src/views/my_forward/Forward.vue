

<template>
    <h1>
        holle
    </h1>
</template>


<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
/* const list = reactive({
    name:
}) */

onMounted(() => {

    console.log(route)

})

</script>

<style scoped></style>
