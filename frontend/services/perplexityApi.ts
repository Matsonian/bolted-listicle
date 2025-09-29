export interface ListicleResult {
  id: string;
  title: string;
  url: string;
  domain: string;
}

export class PerplexitySearchService {
  private baseUrl = '/api/search';

  async searchListicles(query: string): Promise<ListicleResult[]> {
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid search query');
    }

    const sanitizedQuery = query.trim();
    if (!sanitizedQuery) {
      throw new Error('Search query cannot be empty');
    }

    try {
      // Call backend API route instead of Perplexity directly
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sanitizedQuery })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Enhanced search error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Search service temporarily unavailable');
    }
  }
}

export const perplexityService = new PerplexitySearchService();