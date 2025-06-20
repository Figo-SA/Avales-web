import React from "react";
import UserList from "@/components/ui/user-list";

const UsersPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <UserList />
    </div>
  );
};

export default UsersPage;
