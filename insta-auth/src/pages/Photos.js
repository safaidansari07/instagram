// Import the required modules
import axios from "axios";
import InstagramEmbed from "react-instagram-embed";
import passport from "passport";
import InstagramStrategy from "passport-instagram";
import session from "express-session";
import dotenv from "dotenv";

// Load the environment variables from the .env file
dotenv.config();

// Configure the passport middleware
const CALLBACK_URL = "https://instagram-jade-iota.vercel.app/";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new InstagramStrategy(
    {
      clientID: "618692533418907",
      clientSecret: "ec3c052b63c820dc13b9a78ca52d65ea",
      callbackURL: CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, { accessToken, profile }));
    }
  )
);

// Define the authentication middleware function
export const authenticate = (req, res, next) => {
  passport.authenticate("instagram")(req, res, next);
};

// Define the middleware configuration object
export const config = {
  api: {
    bodyParser: false,
  },
};

// Define the middleware array
export const middleware = [
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
  passport.initialize(),
  passport.session(),
];

// Define the Photos component that displays the user's photos
export default function Photos({ photos }) {
  return (
    <div>
      <h1>Your Photos</h1>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <InstagramEmbed url={photo.url} />
            <p>{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Define the getServerSideProps function that fetches the user's photos
export async function getServerSideProps({ req }) {
  if (!req.user) {
    // Redirect to the authentication route if user is not authenticated
    return {
      redirect: {
        destination: "/api/auth/instagram",
        permanent: false,
      },
    };
  }

  // Fetch the user's photos using the Instagram API
  const { accessToken } = req.user;
  const { data } = await axios.get(
    `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`
  );
  const photos = data.data.map((photo) => ({
    id: photo.id,
    url: photo.images.standard_resolution.url,
    caption: photo.caption ? photo.caption.text : null,
  }));

  return {
    props: {
      photos,
    },
  };
}
