import {
  Body,
  Button,
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
import { ExposantValidationEmailProps } from "@/lib/type";

const baseUrl = process.env.BETTER_AUTH
  ? `https://${process.env.BETTER_AUTH}`
  : "";

export default function ExposantValidationEmail({
  firstName,
  lastName,
  eventDate,
  eventName,
  companyName,
  eventLocation,
  siret,
  adresse,
  city,
  postalCode,
}: ExposantValidationEmailProps) {
  firstName = firstName;
  lastName = lastName;
  companyName = companyName;
  eventDate = "15 mars 2025";
  eventName = "Salon des créateurs d'objets et artisans de Neuilly";
  eventLocation = "Paris Expo Porte de Versailles";
  siret = siret;
  adresse = adresse;
  city = city;
  postalCode = postalCode;

  const previewText = `Inscription validée - ${eventName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px] text-center">
              <Img
                src={`${baseUrl}/static/salon-logo.png`}
                width="120"
                height="60"
                alt={eventName}
                className="mx-auto"
              />
            </Section>
            <Heading className="text-[#333] text-[24px] font-bold text-center mt-[20px]">
              Bonjour {firstName} {lastName},
            </Heading>
            <Text className="text-[#333] text-[16px] leading-[24px] text-center">
              Félicitations ! Votre inscription pour le salon <strong>{eventName}</strong> a été validée.
            </Text>
            <Text className="text-[#333] text-[16px] leading-[24px] text-center">
              L'événement aura lieu le <strong>{eventDate}</strong> à <strong>{eventLocation}</strong>.
            </Text>
            <Section className="bg-gray-50 rounded p-[20px] my-[16px]">
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Détails de votre participation :</strong>
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                Société : {companyName}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                SIRET : {siret}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                Adresse : {adresse}, {postalCode} {city}
              </Text>
            </Section>
            <Text className="text-[#333] text-[16px] leading-[24px] text-center">
              Vous pouvez dès à présent télécharger votre badge d'accès au salon.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[16px] font-bold py-3 px-6"
                href={`${baseUrl}/exposant/${siret}/badge`}
              >
                Télécharger mon badge
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              Nous avons hâte de vous accueillir ! Pour toute question, contactez notre support.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}