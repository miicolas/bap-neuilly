import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import { SalonInvitationEmailProps } from "@/lib/type";

const baseUrl = process.env.BETTER_AUTH
    ? `https://${process.env.BETTER_AUTH}`
    : "";

export default function SalonInvitationEmail({
    firstName,
    lastName,
    eventDate,
    eventName,
    numberOfGuests,
    eventLocation,
    ticketNumber,
}: SalonInvitationEmailProps) {
    firstName = firstName;
    lastName = lastName;
    eventDate = eventDate;
    eventName = eventName;
    numberOfGuests = numberOfGuests;
    eventLocation = eventLocation;
    ticketNumber = ticketNumber;

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
                            Confirmation d'inscription au{" "}
                            <strong>{eventName}</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Bonjour {firstName} {lastName},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Nous avons le plaisir de confirmer votre inscription
                            au {eventName} qui se tiendra le{" "}
                            <strong>{eventDate}</strong> à{" "}
                            <strong>{eventLocation}</strong>.
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
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            Ce billet est nominatif et a été émis pour{" "}
                            <span className="text-black">
                                {firstName} {lastName}
                            </span>
                            . Veuillez le présenter avec une pièce d'identité le
                            jour de l'événement. Pour toute question, n'hésitez
                            pas à contacter notre service client à
                            l&apos;adresse support@
                            {(eventName || "événement")
                                .toLowerCase()
                                .replace(/ /g, "-")}
                            .fr
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
