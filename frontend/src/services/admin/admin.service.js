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
    .patch(`/api/admin/update-employee/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
}
// doctor api

export async function createNewDoctorApi(data) {
  return httpService
    .post(`/api/admin/doctors/create-new`, data)
    .then(({ data }) => data);
}
export async function getAllDoctorsApi() {
  return httpService
    .get(`/api/admin/doctors/get-all-doctors`)
    .then(({ data }) => data);
}
export async function getDoctorById(id) {
  return httpService
    .get(`/api/admin/doctors/get-byId/${id}`)
    .then(({ data }) => data);
}
export async function deleteDoctorById(id) {
  return httpService
    .delete(`/api/admin/doctors/delete/${id}`)
    .then(({ data }) => data);
}
export async function updateDoctorsApi(id, data) {
  return httpService
    .patch(`/api/admin/doctor/update/${id}`, data)
    .then(({ data }) => data);
}

// lens api
export async function createNewRefractiveIndexApi(data) {
  return httpService
    .post(`/api/admin/lens/create-refractive-index`, data)
    .then(({ data }) => data);
}

export async function getAllRefractiveIndexApi() {
  return httpService
    .get(`/api/admin/lens/all-refractive-index`)
    .then(({ data }) => data);
}

export async function deleteRefractiveIndexByIdApi(id) {
  return httpService
    .delete(`/api/admin/lens/delete-refractive-index/${id}`)
    .then(({ data }) => data);
}

export async function updateRefractiveIndexApi(id, data) {
  return httpService
    .patch(`/api/admin/lens/update-refractive-index/${id}`, data)
    .then(({ data }) => data);
}
