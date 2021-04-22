export class Game {
  id: string;
  roomName: string;
  numberOfTeams: number;
  wordsPerPerson: number;
  personDetails: PersonDetails[];
}
export class PersonDetails {
  name: string;
  uuid: number;
  isAdmin: boolean;
  constructor(details?: any) {
    details = details ?? {};
    this.name = details.name;
    this.uuid = generateUuid();
    this.isAdmin = false;
  }
}
export function generateUuid() {
  return Math.round(Math.random() * 3000000 + Math.random() * 1000000);
}
