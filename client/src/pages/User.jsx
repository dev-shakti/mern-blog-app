import Loading from "@/components/common/Loading";
import UserListTable from "@/components/UserListTable";
import getEnv from "@/helpers/getEnv";
import showToast from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";

const UserDetails = () => {
  const {
    data: userData,
    loading,
    error,
    refetch
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
    try {
      const response = await fetch(
        `${getEnv("VITE_BASE_URL")}/auth/${currentUserId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      const data = await response.json();
      await refetch();  
      showToast("success", data.message);
    } catch (error) {
      console.error(error.message);
      showToast("error", error.message);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">All User List</h1>
      <UserListTable users={userData.users} onDelete={handleDelete} />
    </div>
  );
};

export default UserDetails;
