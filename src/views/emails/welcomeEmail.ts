export const buildWelcomeEmail = (username: string, link: string) => `
  <pre style="font-family: Arial, sans-serif;">
  Hello ${username},

  Welcome to BurMit!
  We’re thrilled to have you join our exclusive community.  

  To activate your account, simply click the link below:  
  <a href="${link}">🔗 Verify My Email</a>

  Best regards,  
  The BurMit Team™
  </pre>
`;
