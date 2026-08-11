import styles from "../page.module.css";
import { ClearSvg, SendSvg } from "./Svgs";
import { SPOTTER_AGENT_PAGE } from "@/app/utils/constants";

const InputArea = ({
  inputRef,
  input,
  setInput,
  handleKeyDown,
  isLoading,
  handleNewConversation,
  sendMessage,
}: {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  input: string;
  setInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  handleNewConversation: () => void;
  sendMessage: (text: string) => void;
}) => {
  return (
    <div className={styles.inputArea}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={inputRef}
          className={styles.chatInput}
          placeholder={SPOTTER_AGENT_PAGE.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          disabled={isLoading}
          autoFocus
        />
        <button className={styles.clearBtn} onClick={handleNewConversation}>
          <ClearSvg />
        </button>
        <button
          className={styles.sendBtn}
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <SendSvg />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
