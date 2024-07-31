export interface PeopleDTO {
  uid: string,
  name: string,
  url: string
}

export interface PeopleResultDTO {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string;
  next: string;
  results: PeopleDTO[];
}
