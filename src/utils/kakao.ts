export const Kakao = {
  init: (key: string) => window.Kakao.init(key),

  share: <T>(templateId: number, templateArgs: T) =>
    window.Kakao.Share.sendCustom({
      templateId,
      templateArgs,
    }),
};
