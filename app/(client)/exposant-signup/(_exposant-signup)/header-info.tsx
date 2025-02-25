

export default function ExposantSignupHeaderInfo({ title, icon }: { title: string; icon: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm">
            {icon}
            <span className="text-sm font-medium text-center">
                {title}
            </span>
        </div>
    );
}
