import { EmptyStateSvg } from "./Svgs";
import styles from "../page.module.css";
import { SPOTTER_AGENT_PAGE } from "@/app/utils/constants";

const EmptyState = ({
  sendMessage,
}: {
  sendMessage: (text: string) => void;
}) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <EmptyStateSvg />
      </div>
      <h3 className={styles.emptyTitle}>
        {SPOTTER_AGENT_PAGE.emptyState.title}
      </h3>
      <p className={styles.emptySubtitle}>
        {SPOTTER_AGENT_PAGE.emptyState.subtitle}
      </p>
      <div className={styles.quickActions}>
        {SPOTTER_AGENT_PAGE.emptyState.suggestions.map((suggestion) => (
          <button
            key={suggestion}
            className={styles.quickAction}
            onClick={() => sendMessage(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
