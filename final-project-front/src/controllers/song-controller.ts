import { Song } from "../services/songs-service";
import { Dialogs } from "../ui/dialogs";

export const deleteSongRequest = async (id: number) => {
  if (await Dialogs.areUSure("Are you sure you want to delete this song?")) {
    try {
      await Song.deleteSong(id);
      await Dialogs.success("Song has been deleted successfully!");
      window.location.reload();
    } catch (e) {
      Dialogs.error(e);
    }
  }
};
