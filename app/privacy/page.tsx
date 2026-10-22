import { pageMetadata } from '@/lib/seo';
import { LegalPage, type LegalSection } from '@/components/LegalPage';

export const metadata = pageMetadata('Privacy Policy', 'How Reverbex Technology handles website enquiries, contact details and information shared through the free AI audit form.', '/privacy');

const sections: LegalSection[] = [
  { title: 'Information you share', content: <p>When you contact us or use the audit form, you may provide your name, phone number, business or website details, and a description of your workflow. Please avoid including passwords, payment details or sensitive personal information in an enquiry.</p> },
  { title: 'How enquiries are handled', content: <p>The audit form processes your answers on our server and opens WhatsApp with a prepared message. You choose whether to send that message in WhatsApp. Submitted details may also be passed to a configured business enquiry tool. The application does not log the contents of your enquiry. We use enquiry information to respond, understand your requirements and discuss relevant services.</p> },
  { title: 'Service providers and external links', content: <p>Website hosting, communication and business tools may process information needed to deliver their services. Links to WhatsApp, LinkedIn and client websites lead to external services with their own privacy policies. Information you send through those services is also subject to their policies.</p> },
  { title: 'Technical information and browser storage', content: <p>Hosting services may record technical request information, such as an IP address, browser details and request time, for website operation and security. Your browser may store site preferences, such as a selected appearance. You can manage browser storage in your browser settings.</p> },
  { title: 'Retention, access and deletion', content: <p>We keep enquiry information as needed to manage the conversation, provide agreed services and meet applicable obligations. You can contact hello@reverbex.in to ask about the information you have shared, request a correction or request deletion. Some records may need to be retained for legal or contractual reasons.</p> },
  { title: 'Policy updates', content: <p>We may update this page as the website or our enquiry process changes. The date above identifies the latest revision. For questions about this policy, email hello@reverbex.in.</p> },
];

export default function Privacy() {
  return <LegalPage title="Privacy policy" path="/privacy" intro="A straightforward explanation of the information shared when you visit our website or get in touch." sections={sections} />;
}
