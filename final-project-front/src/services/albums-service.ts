import { AlbumRequest, FullAlbumRequest } from "../@types/types";
import { request } from "../utils/axios-helper";

const getAllAlbums = async (pageNo: number) => {
  const res = await request({ url: "/albums", params: { pageNo: pageNo } });
  return res.data;
};

const getAllAlbumsNoLimit = async () => {
  const res = await request({ url: "/albums", params: { pageSize: 100000 } });
  return res.data;
};

const getAlbumsByArtistId = async (artistId: number) => {
  const res = await request({
    url: `/artists/${artistId}/albums`,
    params: {pageSize: 100000}
  });
  return res.data;
};

const postAlbum = async (req: FullAlbumRequest) => {
  await request({
    method: "POST",
    url: `/artists/${req.artistId}/albums`,
    data: {
      albumTitle: req.albumTitle,
      albumReleased: req.albumReleased,
      length: req.length,
      albumImageUrl: req.albumImageUrl,
    },
  });
};

const deleteAlbum = async (id: number) => {
  await request({ method: "DELETE", url: `/albums/${id}` });
};

const updateAlbum = async (id: number, req: AlbumRequest) => {
  await request({
    method: "PUT",
    url: `/albums/${id}`,
    data: {
      albumTitle: req.albumTitle,
      albumReleased: req.albumReleased,
      length: req.length,
      albumImageUrl: req.albumImageUrl,
    },
  });
};

export const Album = {
  getAllAlbums,
  getAllAlbumsNoLimit,
  getAlbumsByArtistId,
  postAlbum,
  deleteAlbum,
  updateAlbum,
};
