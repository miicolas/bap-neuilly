interface ExposantPageProps {
    params: Promise<{ companyName: string }>;
}

export default async function ExposantPage({ params }: ExposantPageProps) {
    const { companyName } = await params;

    return (
        <div className="flex flex-col items-start py-16 px-36">
            <h1 className="text-3xl font-bold">{companyName}</h1>
        </div>
    );
}
