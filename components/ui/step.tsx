export default function Step({ step, title, complete }: { step: number, title: string, complete: boolean }) {
    return (
      <div className={"flex flex-col justify-center min-w-32 w-full p-4 text-center"}>
        <div className={`flex items-center justify-center w-full h-1  text-white font-bold ${complete ? 'bg-yellow-500' : 'bg-gray-400'}`}>
        </div>
        <p className={`mt-2 text-sm text-left ${complete ? 'text-gray-900' : 'text-gray-500'}`}>Etape {step}</p>
        <p className={`mt-2 text-sm text-left ${complete ? 'text-gray-900' : 'text-gray-500'}`}>{title}</p>
      </div>
    );
  }
  