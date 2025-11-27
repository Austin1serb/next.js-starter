/**
 * Checks if a message contains spam keywords
 * @param message - The text content to check
 * @param keywords - Array of keywords to search for
 * @returns The count of unique keywords found in the message (0 if none found)
 */
export function detectSpamKeywords(message: string, keywords: readonly string[]): number {
  if (!message || !keywords.length) return 0

  const normalizedMessage = message.toLowerCase()
  const seen = new Set<string>()

  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase()
    if (!seen.has(normalizedKeyword) && normalizedMessage.includes(normalizedKeyword)) {
      seen.add(normalizedKeyword)
    }
  }

  return seen.size
}

/**
 * Common spam keywords for contact forms
 */
export const SPAM_KEYWORDS = [
  // SEO / marketing core
  "seo",
  "search engine optimization",
  "digital marketing",
  "online marketing",
  "internet marketing",
  "marketing campaign",
  "content marketing",
  "social media marketing",
  "smm",
  "ppc",
  "pay per click",
  "google ads",
  "adwords",
  "facebook ads",
  "instagram ads",
  "tiktok ads",
  "youtube ads",
  "linkedin ads",
  "twitter ads",
  "pinterest ads",
  "reddit ads",
  "quora ads",
  "yahoo ads",
  "bing ads",
  "yahoo ads",
  "bing ads",
  "yahoo ads",
  "your website",
  "your site",
  "your rankings",

  // Rankings / traffic / “growth” spam
  "google ranking",
  "search ranking",
  "top ranking",
  "first page",
  "page 1",
  "rank your website",
  "rank your site",
  "increase rankings",
  "boost your ranking",
  "increase website traffic",
  "increase traffic",
  "drive more traffic",
  "organic traffic",
  "targeted traffic",

  // Link building / outreach
  "backlink",
  "backlinks",
  "link building",
  "manual link building",
  "link exchange",
  "guest post",
  "guest posting",
  "sponsored post",
  "blog outreach",
  "contextual links",
  "niche edits",
  "dofollow links",
  "do follow links",
  "pbn",
  "private blog network",

  // Authority flex nonsense
  "domain authority",
  "page authority",
  "da10",
  "da20",
  "da30",
  "da40",
  "da50",
  "dr10",
  "dr20",
  "dr30",
  "dr40",
  "dr50",
  "da 30",
  "da 40",
  "da 50",
  "dr 30",
  "dr 40",
  "dr 50",
  "domain rating",
  "page rating",
  "domain rating 30",
  "page rating 30",
  "domain rating 40",
  "page rating 40",
  "domain rating 50",
  "page rating 50",
  "high da",
  "high dr",

  // Lead gen / email list spam
  "lead generation",
  "lead gen",
  "generate more leads",
  "qualified leads",
  "b2b leads",
  "buy leads",
  "email list",
  "email database",
  "email marketing",
  "bulk email",
  "cold email",
  "newsletter subscribers",

  // Social media fakery
  "buy followers",
  "buy likes",
  "buy subscribers",
  "buy views",
  "instagram followers",
  "tiktok followers",
  "youtube subscribers",
  "social media promotion",

  // Generic “agency” sales pitches
  "seo services",
  "seo agency",
  "seo company",
  "seo consultant",
  "seo expert",
  "marketing services",
  "digital agency",
  "marketing agency",
  "branding services",

  // Money / finance / scammy
  "loan",
  "loans",
  "quick loan",
  "business loan",
  "personal loan",
  "payday loan",
  "low interest rate",
  "debt relief",
  "credit repair",
  "forex",
  "binary options",
  "investment opportunity",
  "high return investment",
  "earn passive income",

  // Crypto / gambling stuff
  "crypto",
  "cryptocurrency",
  "bitcoin",
  "btc",
  "ethereum",
  "eth",
  "nft",
  "casino",
  "sports betting",
  "betting tips",

  // Super generic spammy promises
  "increase sales",
  "boost your business",
  "grow your business online",
  "scale your business fast",
  "make money online",
  "earn money online",
  "work from home",
  "work-from-home opportunity",
  "limited time offer",
  "—", // em dash signals AI generated content
] as const
