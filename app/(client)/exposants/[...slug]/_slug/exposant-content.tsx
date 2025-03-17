import HtmlConvertorMdx from "@/components/ui/html-convertor-mdx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExposantContentProps {
    history: string;
    products: string;
}

export const ExposantContent = ({ history, products }: ExposantContentProps) => (
    <div className="space-y-6">
        <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="about">Histoire</TabsTrigger>
                <TabsTrigger value="products">Produits</TabsTrigger>
            </TabsList>
            <TabsContent
                value="about"
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <div className="prose prose-gray max-w-none">
                    <HtmlConvertorMdx>{history}</HtmlConvertorMdx>
                </div>
            </TabsContent>
            <TabsContent
                value="products"
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <div className="prose prose-gray max-w-none">
                    <HtmlConvertorMdx>{products}</HtmlConvertorMdx>
                </div>
            </TabsContent>
        </Tabs>

        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contactez-nous
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
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