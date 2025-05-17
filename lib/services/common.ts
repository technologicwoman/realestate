
export async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        return await response.json() as T;
        
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}