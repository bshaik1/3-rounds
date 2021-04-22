export class Game {
  id: string;
  roomName: string;
  numberOfTeams: number;
  wordsPerPerson: number;
  personDetails: PersonDetails[];
}
export class PersonDetails {
  name: string;
  uuid: string;
}
