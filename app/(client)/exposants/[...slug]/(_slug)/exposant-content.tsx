import HtmlConvertorMdx from "@/components/ui/html-convertor-mdx";

interface ExposantContentProps {
    history: string;
    products: string;
}

export const ExposantContent = ({ history, products }: ExposantContentProps) => (
    <div className="space-y-6">
        {/* Section Histoire */}
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                Le savon du pierre Fini
            </h2>
            <div className="prose max-w-none">
                <HtmlConvertorMdx>{history}</HtmlConvertorMdx>
            </div>
        </div>

        {/* Section Produits */}
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                Produits
            </h2>
            <div className="prose max-w-none">
                <HtmlConvertorMdx>{products}</HtmlConvertorMdx>
            </div>
        </div>

        {/* Section Contact */}
        <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Contactez-nous
            </h3>
            <div className="space-y-2 text-gray-600">
                <p>
                    Pour plus d'informations sur nos produits et
                    services, n'hésitez pas à nous contacter.
                </p>
                <p>
                    Nous serons ravis de répondre à toutes vos
                    questions.
                </p>
            </div>
        </div>
    </div>
); 