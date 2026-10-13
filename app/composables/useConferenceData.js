import conferenceData from '../../data/conference-data.json'

export function useConferenceData() {
  return {
    conference: conferenceData.conference,
    sessions: conferenceData.sessions,
    speakers: conferenceData.speakers,
    tracks: conferenceData.tracks,
    rooms: conferenceData.rooms
  }
}
