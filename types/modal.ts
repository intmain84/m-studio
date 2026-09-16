export type Room = "self" | "main";

export type ModalState =
  | { type: "book"; room?: Room; from?: "room-info" }
  | { type: "room-info"; room: Room }
  | { type: "gift" }
  | null;
