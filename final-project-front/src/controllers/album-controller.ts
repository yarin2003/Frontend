import { Album } from "../services/albums-service";
import { Dialogs } from "../ui/dialogs";

export const deleteAlbumRequest = async (id: number) => {
    
  if (await Dialogs.areUSure("Are you sure you want to delete this artist?")) {
    try {
      await Album.deleteAlbum(id);
      await Dialogs.success("Album has been deleted successfully!");
      window.location.reload();
    } catch (e) {
      Dialogs.error(e);
    }
  }
};