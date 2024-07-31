import cron from 'cron'
import https from 'https'

const backendUrl = 'https://shades-test-4.onrender.com';
const job = new cron.CronJob('* * * * *', function () {
    console.log('Server restarting...')

    https.get(backendUrl, (res) => {
        if(res.statusCode === 200){
            console.log('Server restarted...');
        } else {
            console.error(`Failed to restart server with status code ${res.statusCode}`);
        }
    }).on('error', (err) => {
        console.error(`Error during restart: ${err.message}`)
    });
});

module.exports = {
    job,
};