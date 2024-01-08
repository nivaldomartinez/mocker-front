export const copy = async (textToCopy: string) => {
    try {
        await window.navigator.clipboard.writeText(textToCopy)
    } catch {
        throw new Error("Permissions denied!"); 
    }
}