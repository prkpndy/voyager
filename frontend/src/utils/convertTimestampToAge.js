export default function convertTimestampToAge(timestamp) {
    const now = new Date().getTime();
    const diff = now - timestamp * 1e3;

    const minute = 60 * 1e3;
    const hour = 60 * minute;
    const day = 24 * hour;

    let age;
    if (diff < minute) {
        age = Math.round(diff / 1000) + " seconds ago";
    } else if (diff < hour) {
        age = Math.round(diff / minute) + " minutes ago";
    } else if (diff < day) {
        age = Math.round(diff / hour) + " hours ago";
    } else {
        age = Math.round(diff / day) + " days ago";
    }

    return age;
}
