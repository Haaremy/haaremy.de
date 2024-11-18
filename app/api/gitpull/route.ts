import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';
import https from 'https';
import fs from 'fs';

// SSL Certificates
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/haaremy.de/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/haaremy.de/fullchain.pem')
};

const app = express();
const PORT = 443; // Port to listen on

// Middleware to parse JSON body
app.use(bodyParser.json());

app.post('/api/gitpull', (req: Request, res: Response) => {
  // Verify the webhook payload (optional, you can use a secret)
  const payload = req.body;
  console.log('Received webhook:', payload);

  // Check if the push event contains the branch you want to deploy
  if (payload.ref === 'refs/heads/main') { // Adjust the branch if necessary
    console.log('Deploying latest changes...');

    // Pull the latest changes and restart the app
    exec('cd /var/www/haaremy.de && git pull origin main && npm install && pm2 restart haaremy-app', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        return res.status(500).send('Deployment failed');
      }

      console.log(stdout);
      res.status(200).send('Deployment successful');
    });
  } else {
    res.status(400).send('Not a push to the main branch');
  }
});

// Create the HTTPS server with SSL
https.createServer(options, app).listen(PORT, () => {
  console.log(`Listening for GitHub webhooks on https://localhost:${PORT}`);
});
