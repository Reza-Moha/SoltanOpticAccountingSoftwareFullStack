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
