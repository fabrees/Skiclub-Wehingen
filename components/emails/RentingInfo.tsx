import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Row,
    Section,
    Text,
    Heading,
} from "@react-email/components";
import * as React from "react";

export const RentingInfo = (
    firstname: string,
    lastname: string,
    email: string,
    message: string,
    zeitraum: string
) => (
    <Html>
        <Head />
        <Preview>Skiclub-Wehingen: Skihütte</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section>
                    <Row>
                        <Heading
                            style={{
                                ...paragraph,
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginLeft: "15px",
                                marginTop: "20px",
                                marginBottom: "-10px",
                            }}
                        >
                            Skihütten Vermietung
                        </Heading>
                    </Row>
                </Section>

                <Section style={paragraphContent}>
                    <Hr style={hr} />
                    <Text style={paragraph}>
                        Du hast eine neue Mietanfrage über die Skiclub-Website bekommen.
                        Mit „Antworten“ geht deine Antwort direkt an die anfragende Person.
                        Der Zeitraum ist vorläufig im Buchungskalender geblockt – bitte dort bestätigen.
                    </Text>

                    <Text style={{ ...heading, marginBottom: "-20px" }}>Zeitraum:</Text>
                    <Text style={paragraph}>{zeitraum}</Text>

                    <Text style={{ ...heading, marginBottom: "-20px" }}>Vorname:</Text>
                    <Text style={paragraph}>{`${firstname}`}</Text>

                    <Text style={{ ...heading, marginBottom: "-20px" }}>Nachname:</Text>
                    <Text style={paragraph}>{lastname}</Text>

                    <Text style={{ ...heading, marginBottom: "-20px" }}>E-Mail:</Text>
                    <Text style={paragraph}>{email}</Text>

                    <Text style={{ ...heading, marginBottom: "-20px" }}>Nachricht:</Text>
                    <Text style={paragraph}>{message}</Text>
                </Section>

                <Section style={{ ...paragraphContent, paddingBottom: 30 }}>
                    <Hr style={hr} />
                    <Text
                        style={{
                            ...paragraph,
                            fontSize: "12px",
                            textAlign: "center",
                            margin: 0,
                        }}
                    >
                        © Skiclub Wehingen e.V. - Steighof 1, 78564 Wehingen
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default RentingInfo;

const main = {
    backgroundColor: "#dbddde",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "30px auto",
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
};

const heading = {
    fontSize: "14px",
    lineHeight: "26px",
    fontWeight: "700",
    color: "#004dcf",
};

const paragraphContent = {
    padding: "0 40px",
};

const paragraph = {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#3c4043",
};

const hr = {
    borderColor: "#e8eaed",
    margin: "20px 0",
};
