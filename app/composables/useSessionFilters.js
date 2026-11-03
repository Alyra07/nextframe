import { computed, ref } from 'vue'

export function useSessionFilters(sessions) {
  const selectedTrack = ref('')
  const selectedDay = ref('')
  const selectedLevel = ref('')

  const filteredSessions = computed(() => {
    return sessions.filter(session => {
      const matchesTrack =
        !selectedTrack.value ||
        session.trackId === selectedTrack.value

      const matchesDay =
        !selectedDay.value ||
        String(session.day) === selectedDay.value

      const matchesLevel =
        !selectedLevel.value ||
        session.level === selectedLevel.value

      return matchesTrack && matchesDay && matchesLevel
    })
  })

  function resetFilters() {
    selectedTrack.value = ''
    selectedDay.value = ''
    selectedLevel.value = ''
  }

  return {
    selectedTrack,
    selectedDay,
    selectedLevel,
    filteredSessions,
    resetFilters
  }
}