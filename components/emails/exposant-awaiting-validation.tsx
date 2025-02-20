import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import { ExposantAwaitingValidationEmailProps } from '@/lib/type';

const baseUrl = process.env.BETTER_AUTH
    ? `https://${process.env.BETTER_AUTH}`
    : '';

export default function ExposantAwaitingValidationEmail({
    firstName,
    lastName,
    eventDate,
    eventName,
    companyName,
    eventLocation,
    exhibitorNumber,
}: ExposantAwaitingValidationEmailProps) {
    firstName = firstName
    lastName = lastName
    eventDate = "15 mars 2025"
    eventName = "Salon des créateurs d'objets et artisans de Neuilly"
    companyName = "Eau de Toile"
    eventLocation = "Paris Expo Porte de Versailles"
    exhibitorNumber = exhibitorNumber || "expo-2021"

    const previewText = `Inscription en attente de validation - ${eventName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={`${baseUrl}/static/salon-logo.png`}
                                width="120"
                                height="60"
                                alt={eventName}
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Inscription en attente de validation au <strong>{eventName}</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Bonjour {firstName} {lastName},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Nous avons bien reçu votre inscription au {eventName}, qui se tiendra le{' '}
                            <strong>{eventDate}</strong> à <strong>{eventLocation}</strong>.
                        </Text>
                        <Section className="bg-gray-50 rounded p-[20px] my-[16px]">
                            <Text className="text-black text-[14px] leading-[24px] m-0">
                                <strong>Détails de votre inscription :</strong>
                            </Text>
                            <Text className="text-black text-[14px] leading-[24px] m-0">
                                Numéro d'exposant : {exhibitorNumber}
                            </Text>
                            <Text className="text-black text-[14px] leading-[24px] m-0">
                               Nom de votre société : {companyName}
                            </Text>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Votre inscription est actuellement en attente de validation. Vous recevrez un email de confirmation une fois votre inscription approuvée.
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={`mailto:support@${(eventName || 'événement').toLowerCase().replace(/ /g, '-')}.fr`}
                            >
                                Contacter le support
                            </Button>
                        </Section>
                        
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            Une fois validée, votre inscription vous permettra d’accéder au salon et de participer en tant qu'exposant.
                            Veuillez patienter le temps de la validation. Pour toute question, n'hésitez pas à contacter notre service client.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
