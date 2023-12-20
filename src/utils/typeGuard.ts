import {
  ResultResponseDataType,
  ResultResponseWithParticipants,
} from "@/hooks/queries/schedule";

export const isElementNull = (element: HTMLElement | null): element is null =>
  !element;

export const isMouseEvent = (e: MouseEvent | TouchEvent): e is MouseEvent =>
  e instanceof MouseEvent;

export const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent =>
  e instanceof TouchEvent;

export const hasParticipants = (
  obj: ResultResponseDataType
): obj is ResultResponseWithParticipants => {
  if ("hasParticipants" in obj) return true;

  return false;
};
