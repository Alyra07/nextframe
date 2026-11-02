import conferenceData from '../../data/conference-data.json'

export function useConferenceData() {
  const conference = conferenceData.conference
  const sessions = conferenceData.sessions
  const speakers = conferenceData.speakers
  const tracks = conferenceData.tracks
  const rooms = conferenceData.rooms

  function getSessionById(id) {
    return sessions.find(session => session.id === id)
  }

  function getSpeakerById(id) {
    return speakers.find(speaker => speaker.id === id)
  }

  function getTrackById(id) {
    return tracks.find(track => track.id === id)
  }

  function getRoomById(id) {
    return rooms.find(room => room.id === id)
  }

  function getSessionsBySpeakerId(speakerId) {
    return sessions.filter(session =>
      session.speakerIds.includes(speakerId)
    )
  }

  function getSpeakersBySessionId(sessionId) {
    const session = getSessionById(sessionId)

    if (!session) {
      return []
    }

    return session.speakerIds
      .map(getSpeakerById)
      .filter(Boolean)
  }

  return {
    conference,
    sessions,
    speakers,
    tracks,
    rooms,
    getSessionById,
    getSpeakerById,
    getTrackById,
    getRoomById,
    getSessionsBySpeakerId,
    getSpeakersBySessionId
  }
}