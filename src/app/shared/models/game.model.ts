export class Game {
  id: string;
  roomName: string;
  numberOfTeams: number;
  wordsPerPerson: number;
  isStarted: boolean;
  personDetails: PersonDetails[];
  words: Words[];
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
export function generateUuid() {
  return Math.round(Math.random() * 3000000 + Math.random() * 1000000);
}
