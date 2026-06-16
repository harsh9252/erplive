import { apiRequest } from './apiClient';
import { findById, normalizeListResponse } from './apiUtils';

const toTree = (groups = []) => {
  const map = new Map();
  groups.forEach((g) => map.set(String(g.id), { ...g, children: [] }));
  const roots = [];
  groups.forEach((g) => {
    if (g.parent_group_id && map.has(String(g.parent_group_id))) {
      map.get(String(g.parent_group_id)).children.push(map.get(String(g.id)));
    } else {
      roots.push(map.get(String(g.id)));
    }
  });
  return roots;
};

let fetchInProgress = new Map();

const getGroups = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchInProgress.has(paramKey)) {
    return fetchInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/ledger-groups',
          method: 'GET',
          params: (params),
        })
      );
    } finally {
      fetchInProgress.delete(paramKey);
    }
  })();

  fetchInProgress.set(paramKey, promise);
  return promise;
};

const getGroup = async (id) =>
  apiRequest({
    url: `/api/ledger-groups/${id}`,
    method: 'GET',
  });

const createGroup = async (groupData) =>
  apiRequest({
    url: '/api/ledger-groups',
    method: 'POST',
    data: groupData,
  });

const updateGroup = async (id, groupData) =>
  apiRequest({
    url: `/api/ledger-groups/${id}`,
    method: 'PUT',
    data: groupData,
  });

const deleteGroup = async (id) =>
  apiRequest({
    url: `/api/ledger-groups/${id}`,
    method: 'DELETE',
  });

const getGroupsTree = async (params = {}) => {
  const groupsResponse = await getGroups(params);

  return {
    ...groupsResponse,
    data: toTree(groupsResponse.data),
    selected: findById(groupsResponse.data, groupsResponse.data?.[0]?.id),
  };
};

export const ledgerGroupService = {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  getGroupsTree,
};

export default ledgerGroupService;

