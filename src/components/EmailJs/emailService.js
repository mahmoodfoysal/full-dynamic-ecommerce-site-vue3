// emailService.js
import axios from 'axios';

export const sendEmail = (toEmail, variables) => {
    return axios.post('/service_yn86on1', { toEmail, variables });
};
