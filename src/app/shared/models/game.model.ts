export class Game {
  id: string;
  roomName: string;
  numberOfTeams: number;
  wordsPerPerson: number;
  roomClosed: boolean;
  currenPlayer: number;
  currentDeadline: Date | any;
  isStarted: boolean;
  personDetails: PersonDetails[];
  words: Words[];
  unplayed: Words[];
  played: Words[];
  scores: Score[];
}
export class PersonDetails {
  name: string;
  uuid: number;
  isAdmin: boolean;
  team: number;
  constructor(details?: any) {
    details = details ?? {};
    this.name = details.name;
    this.uuid = generateUuid();
    this.isAdmin = false;
  }
}
export class Words {
  value: string;
  uuid: number;
  constructor(word?: any) {
    word = word ?? {};
    this.value = word.value;
    this.uuid = word.uuid;
  }
}
export class Score {
  team: number;
  value: number;
  log: any[];
}
export function generateUuid() {
  return Math.round(Math.random() * 3000000 + Math.random() * 1000000);
}
export function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
