import { Artist } from "../services/artists-service";
import { Dialogs } from "../ui/dialogs";

export const deleteArtistRequest = async (id: number) => {

  if (await Dialogs.areUSure("Are you sure you want to delete this artist?")) {
    try {
      await Artist.deleteArtist(id);
      await Dialogs.success("Artist has been deleted successfully!");
      window.location.reload();
    } catch (e) {
      Dialogs.error(e);
    }
  }
};
