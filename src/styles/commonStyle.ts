import styled from "@emotion/styled";
import { theme } from "./theme";

const BackgroundColorCommonCSS = `
  position: fixed;
  width: 100%;
  height: 100%;
  background: ${theme.colors.primary[50]};
  opacity: 0.71;
  filter: blur(150px);
  z-index: -10;
`;

export const BackgroundColorTop = styled.div`
  ${BackgroundColorCommonCSS}
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
`;

export const BackgroundColorBottom = styled.div`
  ${BackgroundColorCommonCSS}
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
`;

export const CommonLayout = styled.div`
  min-width: 280px;
  max-width: 400px;
  margin: 0px auto;
  padding: 40px 20px 30px 20px;
`;

export const Form = CommonLayout.withComponent("form");

export const MdMarginDiv = styled.div`
  flex: 0 0 auto;
  height: 50px;
`;

export const SmMarginDiv = styled.div`
  flex: 0 0 auto;
  height: 30px;
`;

export const Fieldset = styled.div`
  h2 {
    font-weight: 700;
    font-size: ${theme.size.text.lg};
    color: ${theme.colors.text.primary};
  }

  label,
  span {
    font-size: ${theme.size.text.sm};
    color: ${theme.colors.text.secondary};
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;
