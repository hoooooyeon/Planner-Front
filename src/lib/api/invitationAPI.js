import client from "./client"

const baseUrl = '/api/invitation/';

export const inviteAccept = ({ link }) => {
    return client.post(link + '/accept');
};

export const inviteReject = ({ link }) => {
    return client.delete(link + '/reject');
};