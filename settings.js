const clientID = process.env.NEXT_PUBLIC_CLIENT_ID || ''; // your clientID
const domain = process.env.NEXT_PUBLIC_DOMAIN || ''; // your domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export {
  clientID,
  domain,
  siteUrl
};