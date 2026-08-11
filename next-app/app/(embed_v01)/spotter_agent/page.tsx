"use client";
import styles from "./page.module.css";
import InputArea from "./components/InputArea";
import EmptyState from "./components/EmptyState";
import MessagesList from "./components/MessagesList";
import { useSpotterAgent } from "@/app/hooks/useSpotterAgent";

export default function SpotterAgent() {
  const {
    input,
    inputRef,
    setInput,
    isLoading,
    messages,
    conversationStarted,
    attachVizContainer,
    sendMessage,
    handleKeyDown,
    handleNewConversation,
  } = useSpotterAgent();

  return (
    <div className={styles.chatPage}>
      <div className={styles.messagesContainer}>
        {!conversationStarted ? (
          <EmptyState sendMessage={sendMessage} />
        ) : (
          <MessagesList
            messages={messages}
            isLoading={isLoading}
            attachVizContainer={attachVizContainer}
          />
        )}
      </div>
      <InputArea
        inputRef={inputRef}
        input={input}
        setInput={setInput}
        handleKeyDown={handleKeyDown}
        isLoading={isLoading}
        handleNewConversation={handleNewConversation}
        sendMessage={sendMessage}
      />
    </div>
  );
}
