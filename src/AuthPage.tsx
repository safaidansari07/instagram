import axios from "axios";
import React, { useEffect, useState } from "react";

// interface InstagramPhoto {
//   id: string;
//   media_url: string;
//   caption: string;
//   permalink: string;
// }

// import axios from 'axios'
// import oauth from "axios-oauth-client";
// const getAuthorizationCode = oauth.authorizationCode(
//   axios.create(),
//   "https://cors-anywhere.herokuapp.com/https://api.instagram.com/oauth/access_token", // OAuth 2.0 token endpoint
//   "618692533418907",
//   "ec3c052b63c820dc13b9a78ca52d65ea",
//   "https://instagram-jade-iota.vercel.app/" // Redirect URL for your app
// );

const { post } = require("request");
const { promisify } = require("util");
const AuthPage = () => {
  // const [photos, setPhotos] = useState<InstagramPhoto[]>([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    try {
      const params = Object.fromEntries(
        new URL(window.location.href).searchParams
      );
      console.log(params.code);

      const code = params.code;
      // const auth = await getAuthorizationCode(code, "OPTIONAL_SCOPES");

      // console.log("Auth Token", auth);

      const clientId = "618692533418907";
      const clientSecret = "ec3c052b63c820dc13b9a78ca52d65ea";
      const redirectUri = "https://instagram-jade-iota.vercel.app/";
      const grantType = "authorization_code";

      const postAsync = promisify(post);

      const form = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: grantType,
        redirect_uri: redirectUri,
        code: code,
      };

      let { body, statusCode } = await postAsync({
        // let result = await postAsync({
        url: "https://api.instagram.com/oauth/access_token",
        form,
        headers: {
          "content-type": "multipart/form-data",
          host: "api.instagram.com",
        },
      });

      console.log("Body", body);
    } catch (error) {
      console.log("Error", error);
    }

    // console.log("Before Token Response");

    // const clientId = "618692533418907";
    // const clientSecret = "ec3c052b63c820dc13b9a78ca52d65ea";
    // const redirectUri = "https://instagram-rho-ashen.vercel.app/";
    // const authorizationCode = code;

    // const requestUrl = `https://api.instagram.com/oauth/access_token`;

    // const requestBody = {
    //   client_id: clientId,
    //   client_secret: clientSecret,
    //   grant_type: "authorization_code",
    //   redirect_uri: redirectUri,
    //   code: authorizationCode,
    // };

    // const requestOptions = {
    //   method: "POST",
    //   body: JSON.stringify(requestBody),
    // headers = {
    //   Content-Type:'multipart/form-data'
    // }
    // };

    // fetch(requestUrl, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error("Error in Catch", error));

    // const tokenResponse = await axios.post(
    //   "https://api.instagram.com/oauth/access_token",
    //   {
    //     client_id: clientId,
    //     client_secret: clientSecret,
    //     redirect_uri: redirectUri,
    //     code: code,
    //     grant_type: grantType,
    //   }
    // );
    // console.log("TOken Response", tokenResponse);

    // const accessToken = tokenResponse.data.access_token;
    // console.log("Access TOken ", accessToken);

    // import axios from 'axios'

    // const url = "https://api.instagram.com/oauth/access_token";

    // const headers = {
    //   "content-type": "multipart/form-data",
    //   host: "api.instagram.com",
    // };

    // const form = new FormData();
    // form.append("client_id", clientId);
    // form.append("client_secret", clientSecret);
    // form.append("redirect_uri", redirectUri);
    // form.append("code", code);
    // form.append("grant_type", grantType);

    // axios
    //   .post(url, form, { headers: headers })
    //   .then((response) => {
    //     console.log("Response ", response.data.access_token);
    //   })
    //   .catch((error) => {
    //     console.error("Error", error);
    //   });

    // const photoResponse = await axios.get(
    //   `https://graph.instagram.com/me/media?fields=id,media_url,caption,permalink&access_token=IGQVJVRFFzYndjb0F3NFpzSk1qUG9QTUpXX2hrRFRRb21NOHh4NWpKclJjbnRKVkNVZAVFIM2czU211TTdLNTl0eFZAlS2lpbnN2S05ncEdxcUVaYzZAXQkxDN2x1WmtDNl80cUtnR21SNHBmTmpSYUNFUAZDZD`
    // );
    // console.log(photoResponse.data.data);

    // setPhotos(photoResponse.data.data);
  };

  const handleLogin = () => {
    const clientId = "618692533418907";
    const redirectUri = "https://instagram-jade-iota.vercel.app/";
    const scope = "user_profile,user_media";
    const responseType = "code";
    const url = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
    console.log(url);
    // localStorage.setItem("Url", JSON.stringify(url));
    window.location.replace(url);
  };

  return (
    <div>
      <button onClick={handleLogin}> Login with Instagram </button>

      {/* <div>
        <h1>Instagram Photos</h1>
        {photos?.map((photo) => (
          <div key={photo.id}>
            <img src={photo.media_url} alt={photo.caption} />
            <p>{photo.caption}</p>
            <a href={photo.permalink} target="_blank" rel="noopener noreferrer">
              View on Instagram
            </a>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default AuthPage;
