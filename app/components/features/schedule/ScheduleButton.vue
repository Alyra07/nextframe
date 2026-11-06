
<script setup>
import BaseButton from '~/components/base/BaseButton.vue'

const props = defineProps({
  sessionId: {
    type: String,
    required: true
  }
})

const {
  toggleSession,
  isSessionInSchedule
} = useSchedule()

const isAdded = computed(() =>
  isSessionInSchedule(props.sessionId)
)
</script>

<template>
  <BaseButton
    :variant="isAdded ? 'secondary' : 'primary'"
    @click="toggleSession(sessionId)"
  >
    {{ isAdded ? '✓ Gemerkt' : '+ Merken' }}
  </BaseButton>
</template>