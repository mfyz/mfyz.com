import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getPosts,
  getEnglishPosts,
  getTurkishPosts,
  getAllPosts,
  getRelatedPosts,
} from "./getPosts.ts";

// Mock the getCollection function from astro:content
vi.mock("astro:content", () => {
  return {
    getCollection: vi.fn(),
  };
});

// Import the mocked function
import { getCollection } from "astro:content";

describe("getPosts utility functions", () => {
  // Sample mock posts data
  const mockPosts = [
    // English posts
    {
      id: "post-1",
      slug: "post-1",
      data: {
        title: "English Post 1",
        date: new Date("2023-01-01"),
        tags: ["javascript", "react"],
        hidden: false,
      },
    },
    {
      id: "post-2",
      slug: "post-2",
      data: {
        title: "English Post 2",
        date: new Date("2023-01-02"),
        tags: ["javascript", "vue"],
        hidden: false,
      },
    },
    {
      id: "hidden-post",
      slug: "hidden-post",
      data: {
        title: "Hidden English Post",
        date: new Date("2023-01-03"),
        tags: ["javascript"],
        hidden: true,
      },
    },
    // Turkish posts
    {
      id: "tr/post-3",
      slug: "post-3",
      data: {
        title: "Turkish Post 1",
        date: new Date("2023-01-04"),
        tags: ["javascript", "react"],
        hidden: false,
      },
    },
    {
      id: "tr/post-4",
      slug: "post-4",
      data: {
        title: "Turkish Post 2",
        date: new Date("2023-01-05"),
        tags: ["vue"],
        hidden: false,
      },
    },
    {
      id: "post-5",
      slug: "post-5",
      data: {
        title: "English Post with Turkish lang",
        date: new Date("2023-01-06"),
        tags: ["svelte"],
        lang: "tr",
        hidden: false,
      },
    },
  ];

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default implementation for getCollection mock
    getCollection.mockImplementation((collection, filterFn) => {
      if (collection !== "blog") return [];

      // If no filter function is provided, return all mock posts
      if (!filterFn) return mockPosts;

      // Apply the filter function to the mock posts
      return mockPosts.filter(filterFn);
    });
  });

  describe("getPosts function", () => {
    it("should return all posts when no filters are applied", async () => {
      const result = await getPosts();
      // By default, hidden posts are filtered out
      expect(result.length).toBe(5);
      expect(getCollection).toHaveBeenCalledWith("blog", expect.any(Function));
    });

    it("should filter out hidden posts by default", async () => {
      const result = await getPosts();
      const hiddenPosts = result.filter(post => post.data.hidden);
      expect(hiddenPosts.length).toBe(0);
    });

    it("should include hidden posts when includeHidden is true", async () => {
      const result = await getPosts({ includeHidden: true });
      const hiddenPosts = result.filter(post => post.data.hidden);
      expect(hiddenPosts.length).toBe(1);
      expect(hiddenPosts[0].slug).toBe("hidden-post");
    });

    it('should filter posts by language="en"', async () => {
      const result = await getPosts({ language: "en" });
      // Should only include posts that are not in tr/ folder and don't have lang: 'tr'
      expect(result.length).toBe(2); // 2 regular English posts (hidden post is filtered out by default)

      expect(
        result.every(
          post => !post.id.startsWith("tr/") && post.data.lang !== "tr"
        )
      ).toBe(true);
    });

    it('should filter posts by language="tr"', async () => {
      const result = await getPosts({ language: "tr" });
      // Should include posts in tr/ folder or with lang: 'tr'
      expect(result.length).toBe(3);

      // Check each post is either in tr/ folder or has lang: 'tr'
      expect(
        result.every(
          post => post.id.startsWith("tr/") || post.data.lang === "tr"
        )
      ).toBe(true);
    });

    it("should exclude a specific post by slug", async () => {
      const result = await getPosts({ excludeSlug: "post-1" });
      expect(result.some(post => post.slug === "post-1")).toBe(false);
      expect(result.length).toBe(4); // 5 visible posts - 1 excluded = 4
    });

    it("should limit the number of posts returned", async () => {
      const result = await getPosts({ limit: 2 });
      expect(result.length).toBe(2);
    });

    it("should sort posts by date in descending order by default", async () => {
      const result = await getPosts();

      // Get visible posts
      const visiblePosts = result.filter(post => !post.data.hidden);

      // Check the order
      for (let i = 0; i < visiblePosts.length - 1; i++) {
        const currentDate = new Date(visiblePosts[i].data.date).getTime();
        const nextDate = new Date(visiblePosts[i + 1].data.date).getTime();
        expect(currentDate).toBeGreaterThanOrEqual(nextDate);
      }
    });

    it("should not sort posts when sorted is false", async () => {
      // With our mock implementation, the order would be preserved when not sorting
      const result = await getPosts({ sorted: false });

      // Get dates from visible posts
      const visiblePosts = result.filter(post => !post.data.hidden);
      const dates = visiblePosts.map(post =>
        new Date(post.data.date).getTime()
      );

      // The first date should be less than the last date in our test data
      // (This test assumes our mock data is not already sorted in descending order)
      expect(dates[0]).toBeLessThan(dates[dates.length - 1]);
    });
  });

  describe("Helper functions", () => {
    it("getEnglishPosts should return only English posts", async () => {
      const result = await getEnglishPosts();
      expect(result.length).toBe(2); // 2 visible English posts
      expect(
        result.every(
          post => !post.id.startsWith("tr/") && post.data.lang !== "tr"
        )
      ).toBe(true);
    });

    it("getTurkishPosts should return only Turkish posts", async () => {
      const result = await getTurkishPosts();
      expect(result.length).toBe(3); // 3 visible Turkish posts
      expect(
        result.every(
          post => post.id.startsWith("tr/") || post.data.lang === "tr"
        )
      ).toBe(true);
    });

    it("getAllPosts should return all posts regardless of language", async () => {
      const result = await getAllPosts();
      expect(result.length).toBe(5); // All 5 visible posts (excluding the hidden one)
    });

    it("getAllPosts should include hidden posts when includeHidden is true", async () => {
      const result = await getAllPosts({ includeHidden: true });
      expect(result.length).toBe(6); // All 6 posts including the hidden one
    });
  });

  describe("getRelatedPosts function", () => {
    it("should exclude the current post by slug", async () => {
      const result = await getRelatedPosts({ slug: "post-1" });
      expect(result.some(post => post.slug === "post-1")).toBe(false);
    });

    it("should return posts with matching tags when requireMatchingTag is true", async () => {
      // Find posts related to post-1 which has tags ['javascript', 'react']
      const result = await getRelatedPosts({
        slug: "post-1",
        tags: ["javascript", "react"],
        requireMatchingTag: true,
      });

      // Should include post-2 (javascript tag) and tr/post-3 (react tag)
      // tr/post-4 (vue) doesn't share tags with post-1
      expect(result.length).toBe(2); // post-2, tr/post-3

      // Check each post shares at least one tag with ['javascript', 'react']
      expect(
        result.every(post => {
          const postTags = post.data.tags || [];
          return postTags.some(tag => ["javascript", "react"].includes(tag));
        })
      ).toBe(true);
    });

    it("should not filter by tags when requireMatchingTag is false", async () => {
      const result = await getRelatedPosts({
        slug: "post-1",
        tags: ["javascript", "react"],
        requireMatchingTag: false,
      });

      // Should include all posts except post-1 and the hidden post
      expect(result.length).toBe(4);
    });

    it("should filter posts by language", async () => {
      const result = await getRelatedPosts({
        slug: "post-1",
        language: "en",
      });

      // Should only include English posts except post-1
      expect(result.length).toBe(1); // Only post-2
      expect(
        result.every(
          post => !post.id.startsWith("tr/") && post.data.lang !== "tr"
        )
      ).toBe(true);
    });

    it("should limit the number of related posts", async () => {
      const result = await getRelatedPosts({
        slug: "post-1",
        limit: 2,
      });

      expect(result.length).toBe(2);
    });

    it("should randomize the order when randomize is true", async () => {
      // Mock Math.random to control the sort order
      const originalRandom = Math.random;
      let callCount = 0;

      // We'll mock random to return predictable values
      Math.random = () => {
        callCount++;
        return 0.5; // Always return 0.5, which means no change in order with our sort
      };

      await getRelatedPosts({
        slug: "post-1",
        randomize: true,
      });

      // Verify Math.random was called at least once (for the sort)
      expect(callCount).toBeGreaterThan(0);

      // Restore original Math.random
      Math.random = originalRandom;
    });
  });
});
