import { FullSongRequest, SongRequest } from "../@types/types";
import { request } from "../utils/axios-helper";

const getAllSongs = async (pageNo: number) => {
  const res = await request({ url: "/songs", params: { pageNo: pageNo } });
  return res.data;
};

const getSongsByAlbumId = async (albumId: number) => {
  const res = await request({
    url: `/albums/${albumId}/songs`,
    params: { pageSize: 100000 },
  });
  return res.data;
};

const postSong = async (req: FullSongRequest) => {
  await request({
    method: "POST",
    url: `/albums/${req.albumId}/songs`,
    data: {
      songTitle: req.songTitle,
      songReleased: req.songReleased,
      genres: req.genres,
      length: req.length,
      label: req.label,
      songWriters: req.songWriters,
      producers: req.producers,
      songImageUrl: req.songImageUrl,
    },
  });
};

const deleteSong = async (id: number) => {
  await request({ method: "DELETE", url: `/songs/${id}` });
};

const updateSong = async (id: number, req: SongRequest) => {
  await request({
    method: "PUT",
    url: `/songs/${id}`,
    data: {
      songTitle: req.songTitle,
      songReleased: req.songReleased,
      genres: req.genres,
      length: req.length,
      label: req.label,
      songWriters: req.songWriters,
      producers: req.producers,
      songImageUrl: req.songImageUrl,
    },
  });
};

export const Song = {
  getAllSongs,
  getSongsByAlbumId,
  postSong,
  deleteSong,
  updateSong,
};
