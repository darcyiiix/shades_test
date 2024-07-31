import { CronJob } from 'cron';

const backendUrl = 'https://shades-test-4.onrender.com';

const job = new CronJob('* * * * *', function () {
    console.log('Server restarting...');

    fetch(backendUrl)
        .then(res => {
            if (res.status === 200) {
                console.log('Server restarted...');
            } else {
                console.error(`Failed to restart server with status code ${res.status}`);
            }
        })
        .catch(err => {
            console.error(`Error during restart: ${err.message}`);
        });
});

// Start the job
job.start();

export { job };
