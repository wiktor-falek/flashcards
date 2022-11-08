export default function splitInHalf(string) {
    const midIdx = Math.ceil(string.length / 2);

    const leftHalf = string.slice(0, midIdx);
    const rightHalf = string.slice(midIdx);
    
    return [leftHalf, rightHalf]
}
