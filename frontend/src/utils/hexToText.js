export default function hexToText(str1) {
    var hex = str1.toString();
    var str = "";

    for (var n = 2; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }

    return str;
}
