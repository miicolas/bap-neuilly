import * as React from "react";
import {
    Body,
    Button,
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

interface ExposantAcceptedEmailProps {
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

const baseUrl = process.env.BETTER_AUTH
    ? `https://${process.env.BETTER_AUTH}`
    : "";

const ExposantAcceptedEmail = ({
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
}: ExposantAcceptedEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>
                Félicitations ! Votre participation au salon {eventName} a été
                confirmée
            </Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto my-[40px] max-w-[600px] rounded-[8px] bg-white p-[20px]">
                        <Heading className="text-[24px] font-bold text-gray-800 my-[30px] text-center">
                            Votre participation au salon {eventName} est
                            confirmée !
                        </Heading>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Bonjour {firstName} {lastName},
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Nous sommes ravis de vous informer que votre demande
                            de participation en tant qu'exposant au salon{" "}
                            <strong>{eventName}</strong> a été acceptée !
                        </Text>

                        <Section className="bg-gray-50 rounded-[8px] p-[20px] my-[24px]">
                            <Text className="text-[16px] font-bold text-gray-800 m-0">
                                Récapitulatif de votre inscription :
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
                                • ID Exposant : {exposantId}
                            </Text>
                            <Text className="text-[14px] leading-[20px] text-gray-700 m-0">
                                • Date du salon : {eventDate}
                            </Text>
                            <Text className="text-[14px] leading-[20px] text-gray-700 m-0">
                                • Lieu : {eventLocation}
                            </Text>
                        </Section>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Nous vous invitons à vous connecter à votre espace
                            exposant pour finaliser les détails de votre stand
                            et accéder aux informations complémentaires
                            concernant l'événement.
                        </Text>

                        <Section className="text-center my-[32px]">
                            <Button
                                className="bg-blue-600 text-white font-bold py-[12px] px-[20px] rounded-[4px] no-underline text-center box-border"
                                href={`${baseUrl}/dashboard/exposants/${exposantId}`}
                            >
                                Accéder à mon espace exposant
                            </Button>
                        </Section>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Si vous avez des questions ou besoin d'assistance,
                            n'hésitez pas à contacter notre équipe organisatrice
                            par email à{" "}
                            <Link
                                href="mailto:bap-neuilly-contact@nicolas-becharat.com"
                                className="text-blue-600"
                            >
                                bap-neuilly-contact@nicolas-becharat.com
                            </Link>{" "}
                            ou par téléphone au 01 23 45 67 89.
                        </Text>

                        <Text className="text-[16px] leading-[24px] text-gray-600">
                            Nous sommes impatients de vous accueillir et de
                            faire de cet événement un succès pour votre
                            entreprise !
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
                            {eventLocation}
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

ExposantAcceptedEmail.PreviewProps = {
    firstName: "Jean",
    lastName: "Dupont",
    eventDate: "15-17 Octobre 2025",
    eventName: "Salon de l'Innovation",
    companyName: "Entreprise Exemple SARL",
    eventLocation: "Parc des Expositions, Paris",
    exposantId: "EXP-12345",
    siret: "123 456 789 00012",
    adresse: "15 Rue du Commerce",
    city: "Paris",
    postalCode: "75015",
};

export default ExposantAcceptedEmail;
