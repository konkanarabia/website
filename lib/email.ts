import nodemailer from 'nodemailer';

// Email transporter configuration
export const createTransporter = () => {
  // Check if all required environment variables are set
  const requiredVars = [
    'EMAIL_SERVER_HOST',
    'EMAIL_SERVER_PORT',
    'EMAIL_SERVER_USER',
    'EMAIL_SERVER_PASSWORD',
    'EMAIL_FROM',
    'EMAIL_TO'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  // For testing purposes - use Ethereal test account
  if (process.env.NODE_ENV === 'development' && process.env.USE_TEST_EMAIL === 'true') {
    console.log('Using Ethereal test account for emails');
    
    // Create a test account at ethereal.email
    return nodemailer.createTestAccount().then(testAccount => {
      console.log('Created test email account:', testAccount.user);
      
      // Create a transporter using the test account
      const testTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      
      return testTransporter;
    });
  }
  
  // Use real email configuration
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    // Add required settings for Gmail
    tls: {
      // Do not fail on invalid certificates
      rejectUnauthorized: false
    }
  });
  
  return transporter;
};

// Helper function to send emails
export const sendEmail = async ({ 
  to, 
  from = process.env.EMAIL_FROM as string, 
  subject, 
  text, 
  html 
}: {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html: string;
}) => {
  // Log email configuration for debugging
  console.log('Email configuration:', {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: process.env.EMAIL_SERVER_SECURE,
    user: process.env.EMAIL_SERVER_USER ? '✓ Set' : '✗ Not set',
    pass: process.env.EMAIL_SERVER_PASSWORD ? '✓ Set' : '✗ Not set',
    to,
    from,
  });
  
  // Validate email addresses
  if (!to || !from) {
    throw new Error('Missing required email addresses (to/from)');
  }
    try {
    const transporter = await createTransporter();
    
    // Verify SMTP connection configuration
    await transporter.verify().catch(error => {
      console.error('SMTP verification failed:', error);
      throw new Error(`SMTP verification failed: ${error.message}`);
    });
    
    const info = await transporter.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });
    
    console.log('Email sent successfully:', info.messageId);
    
    // If using Ethereal test account, log the URL to view the test email
    if (process.env.NODE_ENV === 'development' && process.env.USE_TEST_EMAIL === 'true') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
