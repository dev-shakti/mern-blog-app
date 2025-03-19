import Loading from "@/components/common/Loading";
import UserListTable from "@/components/UserListTable";
import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";

const UserDetails = () => {
  const {
    data: userData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_BASE_URL")}/auth/all-users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-xl">Users Not Found</p>;
  }

  async function handleDelete(currentUserId) {
    console.log(currentUserId);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">All User List</h1>
      <UserListTable users={userData.users} onDelete={handleDelete} />
    </div>
  );
};

export default UserDetails;
