import { describe, expect, it } from 'vitest';
import { routeForApi } from './route-for-api';

const parameters = {
  namespace: 'namespace',
  workflowId: 'workflow',
  runId: 'run',
  queue: 'queue',
};

describe('routeForApi', () => {
  it('should return a route for workflow', async () => {
    const route = await routeForApi('workflow', parameters);
    expect(route).toBe(
      'http://localhost:8080/api/v1/namespaces/namespace/workflows/workflow/runs/run',
    );
  });

  it('should return a route for events', async () => {
    const route = await routeForApi('events.ascending', parameters);
    expect(route).toBe(
      'http://localhost:8080/api/v1/namespaces/namespace/workflows/workflow/runs/run/events',
    );
  });

  it('should return a route for events', async () => {
    const route = await routeForApi('events.descending', parameters);
    expect(route).toBe(
      'http://localhost:8080/api/v1/namespaces/namespace/workflows/workflow/runs/run/events/reverse',
    );
  });

  it('should return a route for task-queue', async () => {
    const route = await routeForApi('task-queue', parameters);
    expect(route).toBe(
      'http://localhost:8080/api/v1/namespaces/namespace/task-queues/queue',
    );
  });

  it('should return a route for cluster', async () => {
    const route = await routeForApi('cluster');
    expect(route).toBe('http://localhost:8080/api/v1/cluster');
  });

  it('should return a route for settings', async () => {
    const route = await routeForApi('settings');
    expect(route).toBe('http://localhost:8080/api/v1/settings');
  });

  it('should return a route for user', async () => {
    const route = await routeForApi('user');
    expect(route).toBe('http://localhost:8080/api/v1/me');
  });

  it('should return a route for workflow.terminate', async () => {
    const route = await routeForApi('workflow.terminate', parameters);
    expect(route).toBe(
      'http://localhost:8080/api/v1/namespaces/namespace/workflows/workflow/runs/run/terminate',
    );
  });
});

describe('API Request Encoding', () => {
  it('should return a route for workflow', async () => {
    const route = await routeForApi('workflow', {
      ...parameters,
      workflowId: 'workflow#with#hashes',
    });
    expect(route).toBe(
      'http://localhost:8080/api/v1/namespaces/namespace/workflows/workflow%2523with%2523hashes/runs/run',
    );
  });

  it('should handle slashes', async () => {
    const route = await routeForApi('workflow', {
      ...parameters,
      namespace: 'canary',
      runId: '47e33895-aff5-475a-9b53-73abdee8bebe',
      workflowId:
        'temporal.canary.cron-workflow.sanity-2022-05-02T16:03:11-06:00/workflow.advanced-visibility.scan',
    });
    expect(route).toBe(
      'http://localhost:8080/api/v1/namespaces/canary/workflows/temporal.canary.cron-workflow.sanity-2022-05-02T16%253A03%253A11-06%253A00%252Fworkflow.advanced-visibility.scan/runs/47e33895-aff5-475a-9b53-73abdee8bebe',
    );
  });
});
