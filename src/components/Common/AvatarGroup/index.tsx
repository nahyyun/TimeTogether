import Avatar from "./Avatar";
import { FaCircleUser } from "react-icons/fa6";
import * as S from "./style";

interface AvatarGroupProps<T> {
  list: T[];
  max: number;
}

export default function AvatarGroup<T>({ list, max }: AvatarGroupProps<T>) {
  const limitedMax = Math.min(max, 10);
  const extraNum = list.length > limitedMax ? list.length - limitedMax : 0;

  return (
    <S.AvatarGroupsWrapper>
      {list
        .filter((_, idx) => idx < limitedMax)
        .map((item, idx) => (
          <Avatar key={idx}>
            <FaCircleUser size={"100%"} color="#e5e8eb" />
          </Avatar>
        ))}
      {extraNum ? <Avatar borderColor="lightgray">+{extraNum}</Avatar> : null}
    </S.AvatarGroupsWrapper>
  );
}
