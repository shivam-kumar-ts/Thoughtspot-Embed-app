import { CHAT_ROLE, Message } from "@/app/types";
import embedConfig from "@/app/utils/embedConfig";
import { generateRandomId } from "@/app/utils/utils";
import { SPOTTER_AGENT_PAGE } from "@/app/utils/constants";
import { useState, useRef, useCallback, useEffect } from "react";
import { SpotterAgentEmbed } from "@thoughtspot/visual-embed-sdk";

export const useSpotterAgent = () => {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversationStarted, setConversationStarted] = useState(false);

    const agentRef = useRef<SpotterAgentEmbed | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const vizContainersRef = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        agentRef.current = new SpotterAgentEmbed({
            ...embedConfig.globalConfig,
            ...embedConfig.spotterAgentConfig,
        });
    }, []);

    const attachVizContainer = useCallback(
        (messageId: string) => (el: HTMLDivElement | null) => {
            if (!el) return;
            const container = vizContainersRef.current.get(messageId);
            if (container && !el.hasChildNodes()) {
                el.appendChild(container);
            }
        },
        [],
    );

    const sendMessage = useCallback(
        async (text: string) => {
            if (!text.trim() || isLoading || !agentRef.current) return;

            const userMsg: Message = {
                id: generateRandomId(),
                role: CHAT_ROLE.USER,
                text: text.trim(),
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMsg]);
            setInput("");
            setIsLoading(true);
            setConversationStarted(true);

            const agentMsgId = generateRandomId();

            try {
                const { container, error } = await agentRef.current.sendMessage(
                    text.trim(),
                );

                if (error) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: agentMsgId,
                            role: CHAT_ROLE.AGENT,
                            text: SPOTTER_AGENT_PAGE.errorMessages.processing,
                            error: String(error),
                            timestamp: new Date(),
                        },
                    ]);
                } else if (container) {
                    vizContainersRef.current.set(agentMsgId, container);
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: agentMsgId,
                            role: CHAT_ROLE.AGENT,
                            text: text.trim(),
                            container,
                            timestamp: new Date(),
                        },
                    ]);
                }
            } catch (err) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: agentMsgId,
                        role: CHAT_ROLE.AGENT,
                        text: SPOTTER_AGENT_PAGE.errorMessages.unexpected,
                        error: String(err),
                        timestamp: new Date(),
                    },
                ]);
            } finally {
                setIsLoading(false);
                inputRef.current?.focus();
            }
        },
        [isLoading],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const handleNewConversation = () => {
        vizContainersRef.current.clear();
        setMessages([]);
        setConversationStarted(false);
        setInput("");
        agentRef.current = new SpotterAgentEmbed({
            ...embedConfig.globalConfig,
            ...embedConfig.spotterAgentConfig,
        });
        inputRef.current?.focus();
    };

    return {
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
    };
};
