import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  subject,
  message,
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#9b4819', borderBottom: '2px solid #f97316', paddingBottom: '10px' }}>
        New Contact Form Submission
      </h2>
      
      <div style={{ marginTop: '20px', lineHeight: '1.6' }}>
        <p><strong>From:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Subject:</strong> {subject}</p>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '5px' }}>
        <h3 style={{ marginTop: '0', color: '#374151' }}>Message:</h3>
        <p style={{ whiteSpace: 'pre-wrap', color: '#4b5563' }}>{message}</p>
      </div>
      
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', fontSize: '12px', color: '#6b7280' }}>
        <p>This email was sent from your portfolio contact form.</p>
      </div>
    </div>
  );
};

