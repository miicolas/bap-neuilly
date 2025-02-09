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
import * as React from 'react';

interface SalonInvitationEmailProps {
    firstName?: string;
    lastName?: string;
    eventDate?: string;
    eventName?: string;
    numberOfGuests?: number;
    eventLocation?: string;
    ticketNumber?: string;
    pdfLink?: string;
}

const baseUrl = process.env.BETTER_AUTH
    ? `https://${process.env.BETTER_AUTH}`
    : '';

export default function SalonInvitationEmail({
    firstName,
    lastName,
    eventDate,
    eventName,
    numberOfGuests,
    eventLocation,
    ticketNumber,
    pdfLink,
}: SalonInvitationEmailProps) {
    firstName = firstName
    lastName = lastName
    eventDate = "15 mars 2025"
    eventName = "Salon des créateurs d'objects et artisans de Neuilly"
    numberOfGuests = numberOfGuests
    eventLocation = "Paris Expo Porte de Versailles"
    ticketNumber = ticketNumber
    pdfLink = "https://salon-mariage.com/tickets/SALON-2025-1234.pdf"

    const previewText = `Confirmation d'inscription - ${eventName}`;

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
                            Confirmation d'inscription au <strong>{eventName}</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Bonjour {firstName} {lastName},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Nous avons le plaisir de confirmer votre inscription au {eventName} qui se tiendra le{' '}
                            <strong>{eventDate}</strong> à <strong>{eventLocation}</strong>.
                        </Text>
                        <Section className="bg-gray-50 rounded p-[20px] my-[16px]">
                            <Text className="text-black text-[14px] leading-[24px] m-0">
                                <strong>Détails de votre réservation :</strong>
                            </Text>
                            <Text className="text-black text-[14px] leading-[24px] m-0">
                                Numéro de billet : {ticketNumber}
                            </Text>
                            <Text className="text-black text-[14px] leading-[24px] m-0">
                                Nombre de personnes : {numberOfGuests}
                            </Text>
                        </Section>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={pdfLink}
                            >
                                Télécharger votre billet
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            ou copier-coller ce lien dans votre navigateur :{' '}
                            <Link href={pdfLink} className="text-blue-600 no-underline">
                                {pdfLink}
                            </Link>
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            Ce billet est nominatif et a été émis pour{' '}
                            <span className="text-black">{firstName} {lastName}</span>.
                            Veuillez le présenter avec une pièce d'identité le jour de l'événement.
                            Pour toute question, n'hésitez pas à contacter notre service client
                            à l'adresse support@{(eventName || 'événement').toLowerCase().replace(/ /g, '-')}.fr
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};