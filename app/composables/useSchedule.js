// Composable für die Verwaltung des "Mein Programm" Features 
// -> ermöglicht Hinzufügen/Entfernen von Sessions und Speichern der Auswahl im localStorage

export function useSchedule() {
  const { sessions } = useConferenceData()

  // State für die gespeicherten Session-IDs und Initialisierungsstatus
  const sessionIds = useState('schedule-session-ids', () => [])
  const isInitialized = useState('schedule-initialized', () => false)

  // Basic CRUD-Funktionen für die Verwaltung der Session-IDs in "Mein Programm"
  function addSession(sessionId) {
    const sessionExists = sessions.some(session => session.id === sessionId)

    if (!sessionExists || sessionIds.value.includes(sessionId)) {
      return
    }

    sessionIds.value.push(sessionId)
  }

  function removeSession(sessionId) {
    sessionIds.value = sessionIds.value.filter(id => id !== sessionId)
  }

  function toggleSession(sessionId) {
    if (sessionIds.value.includes(sessionId)) {
      removeSession(sessionId)
    } else {
      addSession(sessionId)
    }
  }

  function isSessionInSchedule(sessionId) {
    return sessionIds.value.includes(sessionId)
  }

  // Computed Property um die Sessions basierend auf den gespeicherten IDs zu erhalten
  const scheduledSessions = computed(() =>
    sessionIds.value
      .map(id => sessions.find(session => session.id === id))
      .filter(Boolean)
  )

  // Mein-Programm initialisieren und gespeicherte Session-IDs aus localStorage laden
  onMounted(() => {
    if (isInitialized.value) {
      return
    }

    const storedSchedule = localStorage.getItem('nextframe:my-program')

    if (storedSchedule) {
      try {
        const parsedIds = JSON.parse(storedSchedule)

        if (Array.isArray(parsedIds)) {
          sessionIds.value = parsedIds.filter(id =>
            sessions.some(session => session.id === id)
          )
        }
      } catch {
        sessionIds.value = []
      }
    }

    isInitialized.value = true
  })

  // Watch auf sessionIds, um Änderungen im localStorage 'nextframe:my-program' zu speichern
  watch(
    sessionIds,
    newSessionIds => {
      if (!isInitialized.value) {
        return
      }

      localStorage.setItem(
        'nextframe:my-program',
        JSON.stringify(newSessionIds)
      )
    },
    { deep: true }
  )

  return {
    sessionIds,
    scheduledSessions,
    isInitialized,
    addSession,
    removeSession,
    toggleSession,
    isSessionInSchedule
  }
}