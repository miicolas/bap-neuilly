import { Exposant } from "@/lib/type";
import Image from "next/image";
import HtmlConvertorMdx from "@/components/ui/html-convertor-mdx";
import { Badge } from "@/components/ui/badge";
import { limiteText } from "@/lib/utils";
import Link from "next/link";

export default function CardExposant(
    { exposant }: { exposant: Exposant }
) {
    const { companyName, type, history, logoUrl } = exposant;
    const types = type.split(',');
    const logoUrlMinio = logoUrl ? `https://minio-bap-neuilly.nicolas-becharat.com/bap-neuilly/${logoUrl}` : null;

    return (
        <Link href={`/exposants/${companyName}`} className="bg-card rounded-lg p-4 border border-neutral-200 hover:bg-neutral-100 transition-all duration-300">
            <li className="flex items-start ">
                {logoUrlMinio && <Image src={logoUrlMinio} alt={companyName} width={100} height={100} />}

                <div className="flex flex-col items-start ml-4 gap-1">
                    <h1 className="text-3xl font-bold">{companyName}</h1>
                    {types.map((type, index) => (
                        <Badge key={index}>{type}</Badge>
                    ))}
                    <HtmlConvertorMdx className="text-neutral-500">{limiteText(String(history), 100)}</HtmlConvertorMdx>
                </div>
            </li>
        </Link>
    );
}