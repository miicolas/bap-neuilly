import { Exposant } from "@/lib/type";
import Image from "next/image";
import HtmlConvertorMdx from "@/components/ui/html-convertor-mdx";
import { Badge } from "@/components/ui/badge";
import { limiteText } from "@/lib/utils";
import Link from "next/link";
export default function CardExposant(
    { exposant }: { exposant: Exposant }
) {
    const { companyLogo, companyName, type, history } = exposant;

    return (
        <Link href={`/exposants/${companyName}`}>
            <li className="flex items-start p-2 border border-neutral-200">
                {companyLogo ? (
                    <Image src={companyLogo} alt={companyName} width={150} height={150} />
                ) : (
                    <div className="w-64 h-36 bg-neutral-200 "></div>
                )}
                <div className="flex flex-col items-start ml-4 gap-1">
                    <h1 className="text-3xl font-bold">{companyName}</h1>
                    {type && <Badge>{type}</Badge>}
                    <HtmlConvertorMdx className="text-neutral-500">{limiteText(String(history), 100)}</HtmlConvertorMdx>
                </div>
            </li>
        </Link>
    );
}