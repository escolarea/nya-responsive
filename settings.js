const clientID = process.env.NEXT_PUBLIC_CLIENT_ID || ''; // your clientID
const domain = process.env.NEXT_PUBLIC_DOMAIN || ''; // your domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nya-responsive.herokuapp.com"

export {
  clientID,
  domain,
  siteUrl
};