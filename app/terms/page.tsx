import { pageMetadata } from '@/lib/seo';
import { LegalPage, type LegalSection } from '@/components/LegalPage';

export const metadata = pageMetadata('Terms of Use', 'Terms for using the Reverbex Technology website, requesting an AI audit and discussing custom development services.', '/terms');

const sections: LegalSection[] = [
  { title: 'Using this website', content: <p>This website introduces Reverbex Technology and its services. By using it, you agree to use it lawfully and avoid interfering with its availability, attempting unauthorised access or submitting harmful or misleading information.</p> },
  { title: 'Enquiries and free audits', content: <p>Sending an enquiry or requesting a free AI audit starts a conversation. It does not create a paid engagement or require you to purchase a service. Any recommendations are based on the information you provide and are intended to help define a potential project.</p> },
  { title: 'Pricing and project agreements', content: <p>Published prices are in Indian rupees per month. The deliverables, schedule, payment terms, applicable taxes, any setup costs and commitment are confirmed in a written proposal or service agreement before work begins. That agreement governs the project, including support, cancellation, code ownership and third-party services.</p> },
  { title: 'Content and project examples', content: <p>Our website content and branding belong to Reverbex Technology or their respective owners. Client names and marks remain the property of their owners. Case studies describe particular projects; results depend on the circumstances and do not guarantee the same outcome for another business.</p> },
  { title: 'External services and availability', content: <p>The website includes links to external websites and communication tools. Their availability and terms are controlled by their providers. We aim to keep this website accurate and available, but content may change and interruptions or errors can occur. A signed project agreement defines any service commitments.</p> },
  { title: 'Questions and updates', content: <p>Contact hello@reverbex.in with questions about these terms. Reverbex Technology is based in Jaipur, India. These website terms may be updated; the revision date appears above. Changes to an active client engagement follow the relevant project agreement.</p> },
];

export default function Terms() {
  return <LegalPage title="Terms of use" path="/terms" intro="The basics of using this website and starting a project with Reverbex Technology." sections={sections} />;
}
