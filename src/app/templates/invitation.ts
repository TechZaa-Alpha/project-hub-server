import { configs } from "../configs";

export const invitation = ({
  orgName,
  email,
  password,
  name
}: {
  orgName: string;
  email: string;
  password: string;
  name: string;
}) => {
  return `
  <section style="max-width:600px;margin:0 auto;padding:24px;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
    
    <!-- Card -->
    <div style="background-color:#ffffff;border-radius:8px;padding:32px;">
      <!-- Main Content -->
      <main>
        <h2 style="color:#111827;font-size:20px;font-weight:600;margin:0 0 16px 0;">
          Welcome to ${orgName} 👋
        </h2>

        <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 16px 0;">
          Hi ${name},
        </p>

        <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 20px 0;">
          We are pleased to inform you that your account has been successfully created
          and you are now onboarded to the <strong>${orgName} Organization</strong>.
        </p>

        <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 20px 0;">
          Below are your initial login credentials. For security reasons,
          please log in and change your password immediately.
        </p>

        <!-- Credentials Box -->
        <div style="background-color:#f9fafb;border:1px solid #e5e7eb;
                    border-radius:6px;padding:16px;margin-bottom:24px;">
          <p style="margin:0 0 8px 0;font-size:14px;color:#111827;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="margin:0;font-size:14px;color:#111827;">
            <strong>Password:</strong> ${password}
          </p>
        </div>

        <!-- Button -->
        <div style="text-align:center;margin-bottom:32px;">
          <a href="${configs.jwt.front_end_url}/login"
             style="display:inline-block;padding:12px 28px;
                    font-size:14px;font-weight:600;
                    color:#ffffff;background-color:#2563eb;
                    border-radius:6px;text-decoration:none;">
            Login to Dashboard
          </a>
        </div>

        <p style="color:#374151;font-size:14px;line-height:1.7;margin:0;">
          If you have any questions or need assistance, feel free to reach out to our support team.
        </p>

        <p style="color:#374151;font-size:14px;line-height:1.7;margin-top:24px;">
           <img 
          src="https://res.cloudinary.com/dnxsk9rgl/image/upload/v1768165540/logo_awnvit.png" 
          alt="ProjectHub Logo"
          style="height:50px; width:50px; display:block;"
        />
          Best regards,<br>
          <strong>ProjectHub Team</strong>
        </p>
      </main>

      <!-- Divider -->
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;">

      <!-- Footer -->
      <footer style="text-align:center;">
        <p style="margin:0;color:#6b7280;font-size:12px;">
          © ${new Date().getFullYear()} ProjectHub. All rights reserved.
        </p>
      </footer>

    </div>
  </section>
  `;
};
