export const UNDER_CONSTRUCTION = true;

export const NOINDEX = process.env.CI_COMMIT_BRANCH === "develop" || UNDER_CONSTRUCTION;
