import { httpClient } from "../utils/HttpClient";

export const getCampaignStatistik = () => {
    return httpClient.get("api/CampaignStatistik")
};
