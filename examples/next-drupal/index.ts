/**
 * Next-Drupal Example Components
 *
 * Import examples into your Next.js project:
 *
 * @example
 * import { ArticleCard, AuthButtons } from './examples/next-drupal'
 */

export { ArticleCard } from './ArticleCard'
export { NodeActions } from './NodeActions'
export { ModerationActions } from './ModerationActions'
export { AuthButtons, AuthButtonsCompact } from './AuthButtons'
export { ArticleListPage } from './ArticleListPage'
export {
  drupal,
  getArticles,
  getArticleByPath,
  getCategories,
  getMenu,
  submitWebform,
} from './drupal-client-setup'
