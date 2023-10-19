import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getMeetingInfo } from "@/services/meeting";
import { ParsedUrlQuery } from "querystring";
import { Meeting } from "@/types/meeting";

interface PageProps {
  meetingInfo: Meeting;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
  context
) => {
  const meetingId = context.params?.id || "";

  const { data, error } = await getMeetingInfo(meetingId);

  if (!data)
    return {
      notFound: true,
    };

  return { props: { meetingInfo: data[0] } };
};

export default function MakeMeetingResultPage({
  meetingInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <></>;
}
