import httpService from "@/services/http.service";

export async function updateAdminProfileApi(data) {
  return httpService
    .patch(`/api/admin/admin-profile-update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
}
export async function createNewEmployeeApi(data) {
  return httpService
    .post(`/api/admin/create-new-employee`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
}

// permission api
export async function createNewPermissionApi(data) {
  return httpService
    .post(`/api/admin/RBAC/create-new-permission`, data)
    .then(({ data }) => data);
}
export async function getAllPermissionApi() {
  return httpService
    .get(`/api/admin/RBAC/get-all-permission`)
    .then(({ data }) => data);
}
export async function deletePermissionByIdApi(id) {
  return httpService
    .delete(`/api/admin/RBAC/delete-permission/${id}`)
    .then(({ data }) => data);
}
export async function updatePermissionApi(id, data) {
  return httpService
    .patch(`/api/admin/RBAC/update-permission/${id}`, data)
    .then(({ data }) => data);
}

// role api
export async function createNewRoleApi(data) {
  return httpService
    .post(`/api/admin/RBAC/create-new-role`, data)
    .then(({ data }) => data);
}

export async function getAllRolesApi() {
  return httpService
    .get(`/api/admin/RBAC/get-all-roles`)
    .then(({ data }) => data);
}
export async function deleteRoleByIdApi(id) {
  return httpService
    .delete(`/api/admin/RBAC/delete-role/${id}`)
    .then(({ data }) => data);
}

export async function updateRolesApi(id, data) {
  return httpService
    .patch(`/api/admin/RBAC/update-role/${id}`, data)
    .then(({ data }) => data);
}

// employee api

export async function getAllEmployeeApi() {
  return httpService
    .get(`/api/admin/get-all-employee`)
    .then(({ data }) => data);
}

export async function deleteEmployeeByIdApi(id) {
  return httpService
    .delete(`/api/admin/delete-employee/${id}`)
    .then(({ data }) => data);
}

export async function updateEmployeeApi(id, data) {
  return httpService
    .patch(`/api/admin/update-employee/${id}`, data)
    .then(({ data }) => data);
}
