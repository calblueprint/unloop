/**
 *
 * Asynchronously loads the component for QuestionnaireView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
