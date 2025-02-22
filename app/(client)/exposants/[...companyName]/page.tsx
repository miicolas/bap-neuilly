export default async function ExposantPage ({ params } : { params: { companyName: string } }) {
    const companyName = params.companyName;

    return (
        <div className="flex flex-col items-start py-16 px-36">
            <h1 className="text-3xl font-bold">{companyName}</h1>
        </div>
    );
}