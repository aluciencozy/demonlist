import { PendingCompletion } from '@/types/types';
import CompletionCardButtons from '@/app/components/CompletionCardButtons';

const CompletionCard = async ({ completion, token }: { completion: PendingCompletion, token: string }) => {
  return (
    <div className="max-w-3xl w-3xl font-figtree">
      <div className="flex items-center justify-between gap-x-8 bg-background border-border border p-6 rounded-2xl hover:translate-x-4 transition-transform duration-300 after:content-[''] after:absolute after:opacity-0 after:inset-0 after:bg-surface hover:after:opacity-30 relative after:duration-200 after:transition-all group">
        <div className="relative z-1">
          <div className="after:content-[''] after:absolute after:opacity-15 after:inset-0 after:bg-primary group-hover:after:opacity-0 after:duration-200 after:transition-all" />
        </div>
        <div className="flex items-center justify-start flex-1 gap-10">
          <div className="flex-center flex-col gap-2 z-1">
            <span className="text-muted">User: {completion.user.username}</span>
            <a
              href={completion.proof_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary cursor-pointer transition-all duration-200 flex-center gap-1"
            >
              Completion
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-external-link-icon lucide-external-link"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </a>
          </div>
          <div className="flex flex-col gap-2 z-1">
            <h2 className="text-center font-mono font-bold text-muted">
              <span className="tracking-widest">#{completion.demon.ranking}</span> |{' '}
              <span className="font-bold gradient-text font-figtree">{completion.demon.name}</span>
            </h2>
            <p className="text-sm tracking-widest text-main">
              {completion.demon.points} Points (100%)
            </p>
          </div>
        </div>
        <CompletionCardButtons completion={completion} token={token} />
      </div>
    </div>
  );
};

export default CompletionCard;