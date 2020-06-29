import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import styled from "styled-components";

import Message from "./Sections/Message";
import { saveMessage } from "../_actions/message_actions";

function Chatbot() {
  const dispatch = useDispatch();
  const messagesFromRedux = useSelector((state) => state.message.messages);

  //매번 렌더링 직후 실행됨
  useEffect(() => {
    eventQuery("AutoStartChat");
  }, []);

  const textQuery = async (text) => {
    //유저가 보내는 텍스트쿼리
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };
    dispatch(saveMessage(conversation));

    //챗봇이 보내는 텍스트쿼리
    const textQueryVariables = {
      text,
    };

    try {
      const response = await Axios.post(
        "/api/dialogflow/textQuery",
        textQueryVariables
      );

      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: "bot",
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "에러가 발생했습니다. 문제를 해결해주세요!",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  // 채팅방 입장시 이벤트 발생, 챗봇이 보내는 메시지
  const eventQuery = async (event) => {
    const eventQueryVariables = {
      event,
    };

    try {
      const response = await Axios.post(
        "/api/dialogflow/eventQuery",
        eventQueryVariables
      );

      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "에러가 발생했습니다. 문제를 해결해주세요!",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const keyPressEnter = (e) => {
    if (e.keyCode === 13) {
      textQuery(e.target.value);
      // value 초기화
      e.target.value = "";
    }
  };

  const renderOneMessage = (message, i) => {
    return (
      <Message key={i} who={message.who} text={message.content.text.text} />
    );
  };

  const renderMessage = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  const Chatting = styled.div`
    width: 700px;
    height: 700px;
    border: 3px solid #000;
    border-radius: 7px;
  `;

  const InputMessage = styled.input`
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 5px;
    border-radius: 4px;
    font-size: 1rem;
  `;

  return (
    <Chatting>
      <div style={{ width: "100%", height: 644, overflow: "auto" }}>
        {renderMessage(messagesFromRedux)}
      </div>
      <InputMessage
        placeholder="메시지를 입력하세요"
        onKeyDown={keyPressEnter}
        type="text"
      />
    </Chatting>
  );
}

export default Chatbot;
