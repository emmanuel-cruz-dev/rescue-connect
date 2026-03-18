const fs = require('fs');

const content = `export const environment = {
  production: true,
  emailjs: {
    serviceId: '${process.env.EMAILJS_SERVICE_ID}',
    templateId: '${process.env.EMAILJS_TEMPLATE_ID}',
    publicKey: '${process.env.EMAILJS_PUBLIC_KEY}',
  },
  apiUrl: 'https://rescue-connect-kkfo.onrender.com',
};
`;

fs.writeFileSync('./src/environments/environment.prod.ts', content);
fs.writeFileSync('./src/environments/environment.ts', content);
console.log('✅ environment.prod.ts generado');
