import { apiRequest } from './apiClient';
import { findById, normalizeListResponse } from './apiUtils';

const toTree = (groups = []) =>
  groups
    .filter((group) => !group.parent_group_id)
    .map((group) => ({
      ...group,
      children: groups.filter((child) => child.parent_group_id === group.id),
    }));

const getGroups = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/ledger-groups',
      method: 'GET',
      params: (params),
    }),
  );

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

