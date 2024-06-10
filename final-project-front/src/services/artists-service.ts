import { ArtistRequest } from "../@types/types";
import { request } from "../utils/axios-helper";
import { baseUrl } from "./auth-service";

const getArtists = async (pageNo: number) => {
  const res = await request({ url: "/artists", params: { pageNo: pageNo } });
  return res.data;
};

const getArtistsNoLimit = async () => {
  const res = await request({ url: "/artists", params: { pageSize: 100000 } });
  return res.data;
};

const postArtist = async (req: ArtistRequest) => {
  await request({
    method: "POST",
    url: "/artists",
    data: {
      name: req.name,
      birthDate: req.birthDate,
      countryOfBirth: req.countryOfBirth,
      startYear: req.startYear,
      endYear: req.endYear,
      artistImageUrl: req.artistImageUrl,
    },
  });
};

const deleteArtist = async (id: number) => {
  console.log(`${baseUrl}/artists/${id}`);
  await request({ method: "DELETE", url: `/artists/${id}` });
};

const updateArtist = async (id: number, req: ArtistRequest) => {
  await request({
    method: "PUT",
    url: `/artists/${id}`,
    data: {
      name: req.name,
      birthDate: req.birthDate,
      countryOfBirth: req.countryOfBirth,
      startYear: req.startYear,
      endYear: req.endYear,
      artistImageUrl: req.artistImageUrl,
    },
  });
};

export const Artist = {
  getArtists,
  getArtistsNoLimit,
  postArtist,
  deleteArtist,
  updateArtist,
};
