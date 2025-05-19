import { Helmet } from "react-helmet";


type SeoProps = {
  title: string;
  description: string;
  image?: string;
  url: string;
};

const Seo = ({ title, description, image, url}: SeoProps) => {
  const defaultImage = "/public/img/logo/blablabook-social.jpg";
  const siteName = "BlablaBook";

  
  return(
    <Helmet>
      <title>{`${siteName} - ${title}`}</title>
      <meta name="description" content={description}/>

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={`${siteName} - ${title}`} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

       {/* Twitter Card */}
       <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${siteName} - ${title}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  )
};

export default Seo;