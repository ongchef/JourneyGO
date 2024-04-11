import { useSession } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

// Access the session token // You can now use the sessionToken to make
const Dashboard = () => {
  return (
    <>
      <div>{}</div>;<h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <p className="mb-5">Welcome to the dashboard!</p>
    </>
  );
};

export default Dashboard;
