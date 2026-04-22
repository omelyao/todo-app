import styled from "styled-components";
import { MyTextAreaProps } from "../../types";
const StyledTextArea = styled.textarea`
  padding: 5px 15px;
  border: 1px solid #007bff;
  border-radius: 5px;
  color: #222222;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
  resize: vertical; /* разрешить изменение высоты */
`;

export const MyTextArea: React.FC<MyTextAreaProps> = (props) => {
  return <StyledTextArea {...props} />;
};
