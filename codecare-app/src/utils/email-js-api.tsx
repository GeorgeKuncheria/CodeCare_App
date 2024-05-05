import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
export const sendEmail = (templateParams={}, templateId: string) => {
    emailjs.send(SERVICE_ID, templateId,
        templateParams,
        {publicKey: PUBLIC_KEY}
    ).then(
        () => {
            console.log('SUCCESS!');
        },
        (error) => {
            console.log('FAILED...', error);
        },
    )
};