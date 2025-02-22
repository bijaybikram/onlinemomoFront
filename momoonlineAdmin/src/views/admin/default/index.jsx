
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import tableDataCheck from "./variables/tableDataCheck.json";
import { useEffect, useState } from "react";
import api from "http/ApiService";

const Dashboard = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    (async () => {
      const result = await api.getData('/admin/misc/data')
      console.log(result)
      setData(result)
    })()
  }, [])
  const usersWithOrders = data && data.allOrders?.map((order)=> {
    return{
      userId : order.user._id
    }
  })
  const uniquesUsersWithOrders = [...new Set(usersWithOrders?.map(user => user.userId))]
  console.log(uniquesUsersWithOrders)

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Orders"}
          subtitle={data.orders}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Products"}
          subtitle={data.products}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Users"}
          subtitle={data.users}
        />
      </div>


      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
