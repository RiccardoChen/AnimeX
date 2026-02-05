export interface IAnime {
  id: number,
  name: string,
  category: string,
  episode: number,
  description: string,
  year: number,
  img: string,
  video: string,
  profileIds: number[] | undefined,
}


export interface IAnimeSample {
  id: number,
  name: string,
  year: number,
  img: string,
}

export interface IAnimeRank {
  id: number,
  name: string,
  img: string,
  profileIds: number[],
}

export interface IAnimeCreate {
  name: string,
  category: string,
  episode: number,
  description: string,
  year: number,
  img: string,
  video: string,
}

export interface IAnimeUpdate {
  id: number,
  name: string,
  category: string,
  episode: number,
  description: string,
  year: number,
  img: string,
  video: string,
}
