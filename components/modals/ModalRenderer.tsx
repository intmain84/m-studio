//A component just to group all modals
import BookModal from "./BookModal";
import RoomInfoModal from "./RoomInfoModal";
import GiftModal from "./GiftModal";

const ModalRenderer = () => (
  <>
    <BookModal />
    <RoomInfoModal />
    <GiftModal />
  </>
);

export default ModalRenderer;
