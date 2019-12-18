export default function() {
    const gp = plat => navigator.platform.indexOf(plat);
    let isApple;
    if (gp("iPhone") !== -1 || gp("iPad") !== -1 || gp("iPod") !== -1) {
        isApple = true;
    } else {
        isApple = false;
    }
    return isApple;
}
