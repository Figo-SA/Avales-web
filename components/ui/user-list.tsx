import React from "react";

const UserList = () => {
  // Datos de ejemplo para mostrar en la tabla
  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "María López",
      email: "maria.lopez@example.com",
      role: "Usuario",
    },
    {
      id: 3,
      name: "Carlos García",
      email: "carlos.garcia@example.com",
      role: "Moderador",
    },
  ];

  return (
    <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-primary-500 text-white dark:bg-primary-700">
            <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left font-semibold">
              Nombre
            </th>
            <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left font-semibold">
              Correo Electrónico
            </th>
            <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left font-semibold">
              Rol
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-primary-100 dark:hover:bg-primary-800"
            >
              <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                {user.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                {user.email}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
