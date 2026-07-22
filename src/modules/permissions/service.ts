import permissionRepository from "./repository.js";

const getPermissions = async ()=>{
  const getPermissions = await permissionRepository.getPermissions();
  return getPermissions;
}

export default {getPermissions}