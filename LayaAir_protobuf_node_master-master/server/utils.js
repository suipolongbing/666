//洗牌
function shuffle(rand, a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

//计算数组中特定元素出现的次数
const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);

module.exports = {
    shuffle,
    countX: countOccurrences
}