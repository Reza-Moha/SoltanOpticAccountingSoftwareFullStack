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
