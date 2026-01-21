const SubmitCompletionUnauthorized = ({ message }: { message: string }) => {
  return (
    <main className="max-w-7xl mx-auto mt-30 relative mb-20 flex-center flex-col font-figtree">
      <h1 className="font-bold text-7xl font-figtree text-main text-shadow-xs text-shadow-main">
        Submit Completion
      </h1>
      <div className="mt-10 w-full max-w-3xl">
        <p className="text-center text-red text-lg">{message}</p>
      </div>
    </main>
  );
};

export default SubmitCompletionUnauthorized;
