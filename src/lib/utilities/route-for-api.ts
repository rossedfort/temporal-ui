import { getApiOrigin } from './get-api-origin';
import { publicPath } from './get-public-path';

const replaceNamespaceInApiUrl = (
  apiUrl: string,
  namespace: string,
): string => {
  if (apiUrl) {
    return apiUrl.replace('%namespace%', namespace);
  }
  return '';
};

const base = async (namespace?: string): Promise<string> => {
  let baseUrl = '';

  if (globalThis?.GetNamespaces && namespace) {
    const namespaces = await globalThis.GetNamespaces();
    const configNamespace = namespaces?.find((n) => n.namespace === namespace);
    baseUrl =
      configNamespace?.webUri ??
      replaceNamespaceInApiUrl(globalThis?.AppConfig?.apiUrl, namespace);
  } else {
    baseUrl = getApiOrigin();
  }

  if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);

  baseUrl = `${baseUrl}${publicPath}`;
  return baseUrl;
};

const withBase = async (
  endpoint: string,
  namespace?: string,
): Promise<string> => {
  if (endpoint.startsWith('/')) endpoint = endpoint.slice(1);
  const baseUrl = await base(namespace);
  return `${baseUrl}/api/v1/${endpoint}`;
};

const encode = (parameters: APIRouteParameters): APIRouteParameters => {
  return Object.keys(parameters ?? {}).reduce(
    (acc, key) => {
      acc[key] = encodeURIComponent(encodeURIComponent(parameters[key]));
      return acc;
    },
    {
      namespace: '',
      workflowId: '',
      scheduleId: '',
      runId: '',
      queue: '',
    },
  );
};

export function routeForApi(
  route: WorkflowsAPIRoutePath,
  parameters: WorkflowListRouteParameters,
  shouldEncode?: boolean,
): Promise<string>;
export function routeForApi(
  route: NamespaceAPIRoutePath,
  parameters: NamespaceRouteParameters,
  shouldEncode?: boolean,
): Promise<string>;
export function routeForApi(
  route: SchedulesAPIRoutePath,
  parameters: ScheduleListRouteParameters,
): Promise<string>;
export function routeForApi(
  route: WorkflowAPIRoutePath,
  parameters: WorkflowRouteParameters,
  shouldEncode?: boolean,
): Promise<string>;
export function routeForApi(
  route: BatchAPIRoutePath,
  parameters: BatchRouteParameters,
  shouldEncode?: boolean,
): Promise<string>;
export function routeForApi(
  route: ScheduleAPIRoutePath,
  parameters: ScheduleRouteParameters,
  shouldEncode?: boolean,
): Promise<string>;
export function routeForApi(
  route: TaskQueueAPIRoutePath,
  parameters: TaskQueueRouteParameters,
  shouldEncode?: boolean,
): Promise<string>;
export function routeForApi(
  route: ParameterlessAPIRoutePath | SearchAttributesRoutePath,
): Promise<string>;
export function routeForApi(
  route: APIRoutePath,
  parameters?: APIRouteParameters,
  shouldEncode = true,
): Promise<string> {
  if (shouldEncode) parameters = encode(parameters);

  const routes: { [K in APIRoutePath]: string } = {
    cluster: '/cluster',
    'events.ascending': `/namespaces/${parameters?.namespace}/workflows/${parameters?.workflowId}/runs/${parameters?.runId}/events`,
    'events.descending': `/namespaces/${parameters?.namespace}/workflows/${parameters?.workflowId}/runs/${parameters?.runId}/events/reverse`,
    namespaces: '/namespaces',
    namespace: `/namespaces/${parameters?.namespace}`,
    query: `/namespaces/${parameters?.namespace}/workflows/${parameters?.workflowId}/runs/${parameters?.runId}/query`,
    'schedule.delete': `/namespaces/${parameters?.namespace}/schedules/${parameters?.scheduleId}`,
    schedule: `/namespaces/${parameters?.namespace}/schedules/${parameters?.scheduleId}`,
    schedules: `/namespaces/${parameters?.namespace}/schedules`,
    'search-attributes': '/search-attributes',
    settings: '/settings',
    'task-queue': `/namespaces/${parameters?.namespace}/task-queues/${parameters?.queue}`,
    user: '/me',
    'workflow.terminate': `/namespaces/${parameters?.namespace}/workflows/${parameters?.workflowId}/runs/${parameters?.runId}/terminate`,
    'workflow.cancel': `/namespaces/${parameters.namespace}/workflows/${parameters.workflowId}/runs/${parameters.runId}/cancel`,
    workflow: `/namespaces/${parameters?.namespace}/workflows/${parameters?.workflowId}/runs/${parameters?.runId}`,
    'workflows.archived': `/namespaces/${parameters?.namespace}/workflows/archived`,
    workflows: `/namespaces/${parameters?.namespace}/workflows`,
    'workflows.count': `/namespaces/${parameters?.namespace}/workflows/count`,
    'batch-operations': `/namespaces/${parameters.namespace}/batch-operations`,
    'batch-operation.describe': `/namespaces/${parameters.namespace}/batch-operations/describe`,
    // TODO: Remove when new batch APIs are deployed
    'workflows.batch.terminate': `/namespaces/${parameters.namespace}/workflows/batch/terminate`,
    'workflows.batch.describe': `/namespaces/${parameters.namespace}/workflows/batch/describe`,
  };

  return withBase(routes[route], parameters?.namespace);
}
