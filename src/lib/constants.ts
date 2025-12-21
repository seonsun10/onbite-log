export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byid", userId],
  },
  post: {
    all: ["post"],
    list: ["post", "list"],
    byID: (postId: number) => ["post", "byId", postId],
  },
};

export const BUCKET_NAME = "uploads";
