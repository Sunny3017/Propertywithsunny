import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, schema }) => {
  const siteTitle = 'PropertyWithSunny | Luxury Real Estate';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = '3BHK Premium Luxury Villas in Sector 16B, Noida Extension. Gated township starting at ₹84 Lakhs near Gaur City Mall. High ROI investment.';
  const defaultKeywords = '3BHK Villa Noida Extension, luxury villas Noida, property in Sector 16B Noida, villas near Gaur City, PropertyWithSunny, Noida real estate investment';
  const siteUrl = 'https://propertywithsunny.com';
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description || defaultDescription} />
      <meta name='keywords' content={keywords || defaultKeywords} />
      <link rel="canonical" href={`${siteUrl}${url || ''}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${url || ''}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || '/logo1.png'} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${siteUrl}${url || ''}`} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || '/logo1.png'} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
