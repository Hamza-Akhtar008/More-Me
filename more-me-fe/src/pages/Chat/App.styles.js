import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const Container = styled.div`
  align-items: center;
  background-color: #fff;
  color: #000;
  color-scheme: light;
  display: flex;
  height: 100%;
  justify-content: space-between;
  position: absolute;
  width: 100%;
`;

export const LeftContainer = styled.div`
  border-right: solid #e7e7e7;
  height: 100%;
  width: 35%;
`
export const ChatDivContainer = styled.div`
  border-top: solid #e7e7e7;
  height: 75%;
  overflow: scroll;
  width: 100%;
`

export const RightContainer = styled.div`
  height: 100%;
  width: 65%;
  padding: 1%;
}
`

export const MessageListWrapper = styled.div`
  height: 91%;
  overflow: scroll;
  width: 100%;
`

export const MessageInputWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  height: 10%;
  width: 100%;
`
