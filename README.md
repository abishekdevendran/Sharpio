# Sharpio - A Soft Skill Assessment Puzzle Game

Sharpio is an interactive puzzle game designed to assess the soft skills of its users. The game revolves around a central theme, and the players are presented with choices in a timed scenario. The outcomes of each choice are influenced by some amount of randomness, making it challenging and engaging for the players.

# Important:

- There is currently no way to create new admin accounts in the game itself. The only user in the game with admin previledges is:
```
username: admin
password: admin
```
- Remember to use the game Logo on the navbar to maxmize pre-cached internal client side routes and page transition animations. Home page also has easy access to admin login when an admin is already logged in.
## Soft Skills Assessed

The game is designed to assess the following soft skills:

- Decision-making
- Time-management
- Attention to detail
- Adaptability
- Perseverance

## How to Play

1. Anyone with an email address can create an Id and password to participate in the game.
2. The game presents the player with a series of timed choices, and the outcomes are influenced by some amount of randomness.
3. The player must make the best decision possible based on the information provided within the time limit.
4. The game progresses through a series of stages, with each stage becoming progressively more challenging.
5. The game ends when the player gets to the "treasure" or dies trying.

## Features

- [x] User Auth
- [x] Minimum clues and depth for all routes (4)
- [x] Progress(Achievements) stored in DB ASAP, seamlessly without interrupting gameplay loop.
- [x] A single gameplay loop is short enough to be completed in a single session. Each loop gets saved in DB.
- [x] Admin dashboard can monitor total player count, and average distribution of player persistence using rarity of achievements as a metric.

## Additional Requirements
- [x] User analytics using a deferred fuzzy search bar.
- [x] Graphs using recharts.
- [ ] User Leaderboard.

## Technologies Used

- NextJS
- ExpressJS
- Zod, Typescript, React-hooks-form for form validation
- Helmet, cors for security
- TailwindCSS, DaisyUI for styling
- PostgreSQL, Prisma for database
- Express-session, redis and connect-redis for session management (Authorization)
- Crypto-js for Authentication(Both hashing(SHA256) and encryption(AES))
- Morgan for logging

## Setup

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install` in both client and server dirs.
3. Change ENV vars in .env file in server dir and .env.local file in client dir. to point to your database and redis server, and to each other. (Easier than setting up proxies).
4. To run the application, start backend server using `npm run dev` in server dir and frontend server using `npm run dev` in client dir.
5. Build the application using `npm run build` in client dir and `npm run build` in server dir.

## ENV Variables

### Client
BACKEND_URL="linkToYourBackend"
NEXT_PUBLIC_COUPLING_SECRET="randomAESKey"

### Server
DATABASE_URL="linkToPostgresDB"
COUPLING_SECRET="randomAESKey"
SESSION_SECRET="randomSessionHashingKey"

## Deployment

The final application has been deployed to Railway(Backend) and Vercel(Frontend). This is done to maintain clear client-server separation and decreasing initial page load time by utilizing pre-rendering and caching on CDN.

- [Sharpio Backend](https://sharpio-api.up.railway.app)
- [Sharpio Frontend](https://sharpio.vercel.app)
- [Sharpio Admin Dashboard](https://sharpio.vercel.app/adminPanel)
## Conclusion

Sharpio is an engaging and challenging puzzle game that effectively assesses various soft skills in its players. The use of randomness in the outcomes of each choice makes it difficult for players to anticipate the results, making it a fair and accurate assessment tool. The game's analytics and admin dashboard make it easy to track user progress and gain insights into player performance. Overall, Sharpio is a useful tool for soft skills assessment and development.```
