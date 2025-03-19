import * as React from "react";
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface ExposantRejectedEmailProps {
    firstName: string;
    lastName: string;
    eventDate: string;
    eventName: string;
    companyName: string;
    eventLocation: string;
    exposantId: string;
    siret: string;
    adresse: string;
    city: string;
    postalCode: string;
}

const ExposantRejectedEmail = ({
    firstName,
    lastName,
    eventDate,
    eventName,
    companyName,
    eventLocation,
    exposantId,
    siret,
    adresse,
    city,
    postalCode,
}: ExposantRejectedEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>
                Information concernant votre demande de participation au salon{" "}
                {eventName}
            </Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto my-[40px] max-w-[600px] rounded-[8px] bg-white p-[20px]">
                        <Heading className="text-[24px] font-bold text-gray-800 my-[30px] text-center">
                            Réponse à votre demande de participation au salon{" "}
                            {eventName}
                        </Heading>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Bonjour {firstName} {lastName},
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Nous vous remercions pour l'intérêt que vous avez
                            porté au salon <strong>{eventName}</strong> qui se
                            tiendra le {eventDate} à {eventLocation}.
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Après étude attentive de votre dossier, nous sommes
                            au regret de vous informer que nous ne sommes pas en
                            mesure de retenir votre candidature pour cette
                            édition.
                        </Text>

                        <Section className="bg-gray-50 rounded-[8px] p-[20px] my-[24px]">
                            <Text className="text-[16px] font-bold text-gray-800 m-0">
                                Rappel de votre demande :
                            </Text>
                            <Text className="text-[14px] leading-[20px] text-gray-700 m-0">
                                • Entreprise : {companyName}
                            </Text>
                            <Text className="text-[14px] leading-[20px] text-gray-700 m-0">
                                • Numéro SIRET : {siret}
                            </Text>
                            <Text className="text-[14px] leading-[20px] text-gray-700 m-0">
                                • Adresse : {adresse}, {postalCode} {city}
                            </Text>
                            <Text className="text-[14px] leading-[20px] text-gray-700 m-0">
                                • ID Demande : {exposantId}
                            </Text>
                        </Section>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Cette décision ne remet nullement en cause la
                            qualité de votre entreprise ou de vos produits. Elle
                            est principalement due à :
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600 ml-[20px]">
                            • Un nombre limité d'emplacements disponibles
                        </Text>
                        <Text className="text-[16px] leading-[24px] text-gray-600 ml-[20px]">
                            • Une forte demande dans votre secteur d'activité
                        </Text>
                        <Text className="text-[16px] leading-[24px] text-gray-600 ml-[20px]">
                            • La nécessité d'assurer une diversité d'offres pour
                            nos visiteurs
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600 mt-[20px]">
                            Nous vous encourageons vivement à renouveler votre
                            candidature pour nos prochains événements.
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Si vous souhaitez obtenir plus d'informations sur
                            les raisons de cette décision ou des conseils pour
                            une future candidature, n'hésitez pas à contacter
                            notre équipe par email à{" "}
                            <Link
                                href="mailto:bap-neuilly-contact@nicolas-becharat.com"
                                className="text-blue-600"
                            >
                                bap-neuilly-contact@nicolas-becharat.com
                            </Link>{" "}
                            ou par téléphone au 01 23 45 67 89.
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Nous vous remercions pour votre compréhension et
                            espérons avoir l'opportunité de collaborer avec vous
                            lors d'un prochain événement.
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Cordialement,
                        </Text>

                        <Text className="text-[16px] leading-[24px] font-bold text-gray-700">
                            L'équipe organisatrice du salon {eventName}
                        </Text>

                        <Hr className="border-gray-300 my-[24px]" />

                        <Text className="text-[12px] leading-[16px] text-gray-500 m-0">
                            © {new Date().getFullYear()} Salon {eventName}. Tous
                            droits réservés.
                        </Text>
                        <Text className="text-[12px] leading-[16px] text-gray-500 m-0">
                            123 Avenue des Expositions, 75001 Paris, France
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ExposantRejectedEmail;
