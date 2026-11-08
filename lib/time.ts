/** "13:05" -> "1:05", like Django's time:"g:i". */
export function clockTime(hhmm: string): string {
    const [h, m] = hhmm.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")}`;
}
