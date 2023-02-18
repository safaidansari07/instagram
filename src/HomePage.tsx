import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

interface InstagramPhoto {
  id: string;
  media_url: string;
  caption: string;
  permalink: string;
}

const HomePage = () => {
  const [photos, setPhotos] = useState<InstagramPhoto[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      const params = Object.fromEntries(
        new URL(window.location.href).searchParams
      );
      console.log(params);

      const code = params.code;
      const clientId = "618692533418907";
      const clientSecret = "ec3c052b63c820dc13b9a78ca52d65ea";
      const redirectUri = "https://instagram-rho-ashen.vercel.app/";
      const grantType = "authorization_code";

      const tokenResponse = await axios.post(
        "https://api.instagram.com/oauth/access_token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code: code,
          grant_type: grantType,
        }
      );

      const accessToken = tokenResponse.data.access_token;

      const photoResponse = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,media_url,caption,permalink&access_token=${accessToken}`
      );
      // console.log(photoResponse.data.data);

      setPhotos(photoResponse.data.data);
    };

    getPhotos();
  }, []);

  return (
    <>
      <div>
        <h1>My Instagram Photos</h1>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.media_url} alt={photo.caption} />
            <p>{photo.caption}</p>
            <a href={photo.permalink} target="_blank" rel="noopener noreferrer">
              View on Instagram
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
