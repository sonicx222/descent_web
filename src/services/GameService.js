import { getCampaign, getUserId } from './LocalSessionService';

export function isUserOverlord() {
    let campaign = getCampaign();
    let userId = getUserId();
    let isOverlord = false;

    if (campaign.overlord != null && userId != null) {
        isOverlord = (campaign.overlord.playedBy.userId === userId);
        console.log("Overlord?: ", isOverlord);
    }

    return isOverlord;
}