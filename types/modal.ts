export type Room = "self" | "main";

export type ModalState =
  | { type: "book"; room?: Room }
  | { type: "room-info"; room: Room }
  | { type: "gift" }
  | null;
