interface Props {
  text: string;
  mine?: boolean;
  time?: string;
}

export default function MessageBubble({ text, mine, time }: Props) {
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          px-4 py-3 rounded-2xl max-w-[65%] text-sm relative
          ${
            mine
              ? 'bg-emerald-600 text-white rounded-br-md'
              : 'bg-white shadow-sm rounded-bl-md'
          }
        `}
      >
        {text}

        {time && (
          <p
            className={`text-[10px] mt-1 text-right ${
              mine ? 'text-white/80' : 'text-neutral-400'
            }`}
          >
            {time}
          </p>
        )}
      </div>
    </div>
  );
}
