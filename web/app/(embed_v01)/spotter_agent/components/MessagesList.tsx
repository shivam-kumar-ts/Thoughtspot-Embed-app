import { Message } from "@/app/types";
import styles from "../page.module.css";
import { CHAT_ROLE } from "@/app/types";
import { TypingIndicatorSvg, ErrorSvg } from "./Svgs";

const MessagesList = ({
  messages,
  isLoading,
  attachVizContainer,
}: {
  messages: Message[];
  isLoading: boolean;
  attachVizContainer: (
    messageId: string,
  ) => (el: HTMLDivElement | null) => void;
}) => {
  return (
    <div className={styles.messagesList}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`${styles.messageBubble} ${
            msg.role === CHAT_ROLE.USER ? styles.userBubble : styles.agentBubble
          }`}
        >
          {msg.role === CHAT_ROLE.AGENT && (
            <div className={styles.bubbleAvatar}>
              <TypingIndicatorSvg />
            </div>
          )}
          <div className={styles.bubbleContent}>
            {msg.role === CHAT_ROLE.USER && (
              <p className={styles.bubbleText}>{msg.text}</p>
            )}
            {msg.error && (
              <div className={styles.errorBox}>
                <ErrorSvg />
                {msg.text}
              </div>
            )}
            {msg.container && (
              <div
                className={styles.vizContainer}
                ref={attachVizContainer(msg.id)}
              />
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className={`${styles.messageBubble} ${styles.agentBubble}`}>
          <div className={styles.bubbleAvatar}>
            <TypingIndicatorSvg />
          </div>
          <div className={styles.bubbleContent}>
            <div className={styles.typingIndicator}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
