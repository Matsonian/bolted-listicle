import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendFeedbackConfirmationEmail(
    email: string,
    name: string,
    message: string,
    contactType: string,
) {
    try {
        // Create a simple HTML email template
        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Live Through Faith Support</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #ffffff; padding: 40px 0; margin: 0;">
          <div style="background-color: #ffffff; margin: 0 auto; max-width: 600px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
            <!-- Header -->
            <div style="background-color: #ffffff; padding: 32px 40px 24px; border-bottom: 1px solid #e2e8f0; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;">
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                  <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                  <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                  <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                  <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                </svg>
                <h1 style="font-size: 24px; font-weight: 700; color: #1f2937; margin: 0; line-height: 1;">Live Through Faith</h1>
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <h2 style="color: #1f2937; font-size: 28px; font-weight: 700; line-height: 1.2; margin: 0 0 24px 0; text-align: center;">
                Thank you for reaching out, ${name}!
              </h2>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                We've received your message and our support team will get back to you within 24 hours.
              </p>
              
              <!-- Message Details Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Your Message Details</h3>
                
                <div style="margin-bottom: 12px;">
                  <p style="color: #64748b; font-size: 14px; font-weight: 500; margin: 0 0 4px 0;">Contact Type:</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0 0 12px 0;">${contactType}</p>
                </div>
                
                <div style="margin-bottom: 12px;">
                  <p style="color: #64748b; font-size: 14px; font-weight: 500; margin: 0 0 4px 0;">Message:</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0; white-space: pre-wrap; line-height: 1.5;">${message}</p>
                </div>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 32px 0 24px 0;">
                Best regards,<br>
                The Live Through Faith Support Team
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #ffffff; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 12px 0;">© 2025 Live Through Faith. All rights reserved.</p>
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <a href="https://www.livethrough.faith/privacy" style="color: #3b82f6; font-size: 14px; text-decoration: none;">Privacy Policy</a>
                <span style="color: #cbd5e1; font-size: 14px; margin: 0;">•</span>
                <a href="https://www.livehthrough.faith/contact" style="color: #3b82f6; font-size: 14px; text-decoration: none;">Contact Us</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

        const { data, error } = await resend.emails.send({
            from: 'Live Through Faith <no-reply@notifications.livethrough.faith>', // Replace with your verified domain
            to: [email],
            subject: "We've received your message - Live Through Faith Support",
            html: html,
        });

        if (error) {
            console.error('Resend error:', error);
            throw new Error(error.message);
        }

        return data;
    } catch (err) {
        console.error('Failed to send feedback confirmation email:', err);
        throw err;
    }
}

export async function sendOtpEmail(email: string, otpCode: string) {
    try {
        // Create a simple HTML email template for OTP
        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Live Through Faith - Your OTP Code</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #ffffff; padding: 40px 0; margin: 0;">
          <div style="background-color: #ffffff; margin: 0 auto; max-width: 600px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
            <!-- Header -->
            <div style="background-color: #ffffff; padding: 32px 40px 24px; border-bottom: 1px solid #e2e8f0; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;">
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                  <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                  <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                  <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                  <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                </svg>
                <h1 style="font-size: 24px; font-weight: 700; color: #1f2937; margin: 0; line-height: 1;">Live Through Faith</h1>
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <h2 style="color: #1f2937; font-size: 28px; font-weight: 700; line-height: 1.2; margin: 0 0 24px 0; text-align: center;">
                Your OTP Code
              </h2>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Use the following code to verify your email address:
              </p>
              
              <!-- OTP Code Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center;">
                <p style="color: #64748b; font-size: 14px; font-weight: 500; margin: 0 0 8px 0;">Your verification code:</p>
                <div style="font-size: 32px; font-weight: 700; color: #1f2937; letter-spacing: 4px; margin: 8px 0;">
                  ${otpCode}
                </div>
                <p style="color: #64748b; font-size: 12px; margin: 8px 0 0 0;">
                  This code will expire in 10 minutes
                </p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 32px 0 24px 0;">
                If you didn't request this code, you can safely ignore this email.
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 32px 0 24px 0;">
                Best regards,<br>
                The Live Through Faith Team
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #ffffff; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 12px 0;">© 2025 Live Through Faith. All rights reserved.</p>
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <a href="https://www.livethrough.faith/privacy" style="color: #3b82f6; font-size: 14px; text-decoration: none;">Privacy Policy</a>
                <span style="color: #cbd5e1; font-size: 14px; margin: 0;">•</span>
                <a href="https://www.livethrough.faith/contact" style="color: #3b82f6; font-size: 14px; text-decoration: none;">Contact Us</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

        const { data, error } = await resend.emails.send({
            from: 'Live Through Faith <no-reply@notifications.livethrough.faith>',
            to: [email],
            subject: 'Your OTP Code - Live Through Faith',
            html: html,
        });

        if (error) {
            console.error('Resend error:', error);
            throw new Error(error.message);
        }

        return data;
    } catch (err) {
        console.error('Failed to send OTP email:', err);
        throw err;
    }
}

export async function sendWelcomeEmail(email: string, firstName?: string) {
    try {
        // Create a welcome email HTML template
        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Live Through Faith</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #ffffff; padding: 40px 0; margin: 0;">
          <div style="background-color: #ffffff; margin: 0 auto; max-width: 600px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
            <!-- Header -->
            <div style="background-color: #ffffff; padding: 32px 40px 24px; border-bottom: 1px solid #e2e8f0; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;">
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                  <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                  <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                  <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                  <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                </svg>
                <h1 style="font-size: 24px; font-weight: 700; color: #1f2937; margin: 0; line-height: 1;">Live Through Faith</h1>
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <h2 style="color: #1f2937; font-size: 28px; font-weight: 700; line-height: 1.2; margin: 0 0 24px 0; text-align: center;">
                Hi ${firstName || 'there'},
              </h2>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                We're excited to invite you to experience Live Through Faith.
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                With Live Through Faith, you'll:
              </p>
              
              <ul style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 20px; padding: 0;">
                <li style="margin-bottom: 16px;">Develop strong connections between your community and God</li>
              </ul>
              
              <h3 style="color: #1f2937; font-size: 20px; font-weight: 600; margin: 32px 0 24px 0; text-align: center;">Why join our beta?</h3>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                As a beta user, you'll get early access to all features free of charge. You'll also help us shape the future of worship by sharing your honest feedback.
              </p>
              
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="http://livethrough.faith/auth" style="background-color: #3b82f6; border-radius: 8px; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 32px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);">
                  Begin your journey with Live Through Faith!
                </a>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 32px 0 24px 0;">
                If you have questions or feedback at any point, please reply directly to this email. We're here to support your well-being every step of the way.
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 32px 0 0 0;">
                Wishing you calm and confidence,<br>
                — The Live Through Faith Team
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #ffffff; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 12px 0;">© 2025 Live Through Faith. All rights reserved.</p>
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <a href="https://www.livethrough.faith/privacy" style="color: #3b82f6; font-size: 14px; text-decoration: none;">Privacy Policy</a>
                <span style="color: #cbd5e1; font-size: 14px; margin: 0;">•</span>
                <a href="https://www.livethrough.faith/contact" style="color: #3b82f6; font-size: 14px; text-decoration: none;">Contact Us</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

        const { data, error } = await resend.emails.send({
            from: 'Live Through Faith <no-reply@livethrough.faith>',
            to: [email],
            subject: 'Welcome to Live Through Faith',
            html: html,
        });

        if (error) {
            console.error('Resend error:', error);
            throw new Error(error.message);
        }

        return data;
    } catch (err) {
        console.error('Failed to send welcome email:', err);
        throw err;
    }
}
