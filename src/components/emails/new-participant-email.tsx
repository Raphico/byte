import * as React from "react"
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { siteConfig } from "@/config/site"

interface NewParticipantEmailProps {
  WorkshopTitle: string
  organizerUsername: string
}

export default function NewParticipantEmail({
  WorkshopTitle,
  organizerUsername,
}: NewParticipantEmailProps) {
  return (
    <Html>
      <Head>
        <title>Byte</title>
      </Head>
      <Preview>New Registration for your workshop</Preview>
      <Tailwind>
        <Body className="mx-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-semibold text-black">
                New Registration for your workshop
              </Heading>
              <Text className="text-[14px] leading-[24px] text-black">
                Hello {organizerUsername},
              </Text>
              <Text className="text-[14px] leading-[24px] text-black">
                We are excited to inform you that a new participant has
                registered for your workshop <strong>{WorkshopTitle}</strong>{" "}
                You can view and manage your workshop registrations by logging
                into your dashboard.
              </Text>
              <Text className="text-[14px] leading-[24px] text-black">
                <Link
                  href={`${siteConfig.url}/dashboard`}
                  className="text-blue-500 underline"
                >
                  Go to dashboard
                </Link>
              </Text>
              <Text className="text-[14px] leading-[24px] text-black">
                <p>Thank you for using {siteConfig.title}.</p>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
