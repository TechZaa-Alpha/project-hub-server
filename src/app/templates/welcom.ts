export const welcome = (name: string) => {
  return `
  <section style="max-width:600px; margin:0 auto; padding:32px 24px; background:#ffffff; font-family:Arial, Helvetica, sans-serif;">
    
    <!-- Header -->
    <header style="margin-bottom:24px;">
      <a href="#" style="text-decoration:none;">
        <img 
          src="https://res.cloudinary.com/dnxsk9rgl/image/upload/v1768165540/logo_awnvit.png" 
          alt="ProjectHub Logo"
          style="height:50px; width:50px; display:block;"
        />
      </a>
    </header>

    <!-- Main -->
    <main>
      <p style="font-size:20px; color:#374151; margin:0 0 16px 0;">
        Welcome to ProjectHub, ${name} 👋
      </p>

      <p style="font-size:15px; line-height:1.6; color:#4B5563; margin:0 0 24px 0;">
        We’re thrilled to have you on board! ProjectHub is designed to make managing projects easier, collaborating with your team seamless, and manageing project task visually using our integrated TaskBoard.
      </p>

      <p style="font-size:15px; line-height:1.6; color:#4B5563; margin:0 0 24px 0;">
        From planning to execution, you can track tasks, organize workflows, and build efficient task manager all in one platform. We’re here to help you streamline your projects and boost productivity.
      </p>

      <hr style="border:none; border-top:1px solid #E5E7EB; margin:24px 0;" />
    </main>

    <!-- Footer -->
    <footer>
      <p style="font-size:14px; color:#6B7280; line-height:1.6; margin:0 0 12px 0;">
        Thanks for joining ProjectHub! If you have any questions, feel free to reach out at 
        <a 
          href="mailto:dev.abumahid@gmail.com" 
          style="color:#2563EB; text-decoration:none; font-weight:500;"
        >
          dev.abumahid@gmail.com
        </a>.
        <br/>We’re excited to see what you create!
        <br/>— The ProjectHub Team
      </p>

      <p style="font-size:13px; color:#9CA3AF; margin:0;">
        © ${new Date().getFullYear()} ProjectHub. All Rights Reserved.
      </p>
    </footer>

  </section>

  `;
};
