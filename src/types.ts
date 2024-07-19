export interface Show {
  id: string;
  name: string;
}

export interface CurrentShow {
  img: {
    original: string;
  };
  name: string;
  summary: string;
  score: string;
}
