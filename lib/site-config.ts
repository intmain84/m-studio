const IS_DEV_SERVER = process.env.NODE_ENV === "development";
const IS_DEVELOP = process.env.CI_COMMIT_BRANCH === "develop";

export const UNDER_CONSTRUCTION = true; // Toggle manually: shows the under-construction page on main (never on develop) and hides the site from search engines

export const SHOW_UNDER_CONSTRUCTION = !IS_DEV_SERVER && UNDER_CONSTRUCTION && !IS_DEVELOP;

export const NOINDEX = !IS_DEV_SERVER && (IS_DEVELOP || UNDER_CONSTRUCTION);
