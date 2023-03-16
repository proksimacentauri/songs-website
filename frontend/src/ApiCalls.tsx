import axios from "axios";

export const fetchSongs = async () => {
    const response = await axios.get('http://localhost:5124/api/Songs');
    return response;
};