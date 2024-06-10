import { ReactNode } from "react";

export type FC = (props: { children: ReactNode }) => ReactNode;

export interface AuthContextType {
  isLoggedIn: boolean;
  jwt?: string | null;
  login: (jwt: string) => void;
  logout: () => void;
}

export interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}

export type ArtistPage = {
  totalArtists: number;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  artists: Array<Artist>;
  first: boolean;
  last: boolean;
};

export type AlbumPage = {
  totalArtists: number;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  albums: Array<Album>;
  first: boolean;
  last: boolean;
};

export type SongPage = {
  totalArtists: number;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  songs: Array<Song>;
  first: boolean;
  last: boolean;
};

export type Artist = {
  [x: string]: any;
  id: number;
  name: string;
  birthDate: string;
  countryOfBirth: string;
  startYear: string;
  endYear: string;
  artistImageUrl: string;
  albums: Array<Album>;
};

export type Album = {
  id: number;
  albumTitle: string;
  albumReleased: string;
  length: string;
  albumImageUrl: string;
  songs: Array<Song>;
};

export type Song = {
  id: number;
  songTitle: string;
  songReleased: string;
  genres: string;
  length: string;
  label: string;
  songWriters: string;
  producers: string;
  songImageUrl: string;
};

export type ArtistRequest = {
  name: string;
  birthDate: string;
  countryOfBirth: string;
  startYear: string;
  endYear: string;
  artistImageUrl: string;
};

export type FullAlbumRequest = {
  artistId: number;
  albumTitle: string;
  albumReleased: string;
  length: string;
  albumImageUrl: string;
};

export type AlbumRequest = {
  albumTitle: string;
  albumReleased: string;
  length: string;
  albumImageUrl: string;
};

export type FullSongRequest = {
  albumId: number;
  songTitle: string;
  songReleased: string;
  genres: string;
  length: string;
  label: string;
  songWriters: string;
  producers: string;
  songImageUrl: string;
};

export type SongRequest = {
  songTitle: string;
  songReleased: string;
  genres: string;
  length: string;
  label: string;
  songWriters: string;
  producers: string;
  songImageUrl: string;
};

