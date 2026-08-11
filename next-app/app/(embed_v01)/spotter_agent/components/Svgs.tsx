const ClearSvg = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="white">
      <path
        clipRule="evenodd"
        d="m5 4 4-4v3c3.5899 0 6.5 2.91015 6.5 6.5 0 3.5899-2.9101 6.5-6.5 6.5-3.58985 0-6.5-2.9101-6.5-6.5h2c0 2.4853 2.01472 4.5 4.5 4.5 2.4853 0 4.5-2.0147 4.5-4.5 0-2.48528-2.0147-4.5-4.5-4.5v3z"
        fillRule="evenodd"
      />
    </svg>
  );
};

const SendSvg = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const TypingIndicatorSvg = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 110 2h-1.07A7 7 0 0113 22h-2a7 7 0 01-6.93-6H3a1 1 0 110-2h1a7 7 0 017-7h1V5.73A2 2 0 0112 2z"
        fill="currentColor"
      />
    </svg>
  );
};

const ErrorSvg = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 5v3M8 10.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const EmptyStateSvg = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { ClearSvg, SendSvg, TypingIndicatorSvg, ErrorSvg, EmptyStateSvg };
