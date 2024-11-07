import ActiveInvest from "./components/ActiveInvest";
import Menubar from "components/menu";

import { columnsDataColumns } from "./variables/columnsData";
import tableDataColumns from "./variables/tableDataColumns.json";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-12 lg:!mb-0">
          <Menubar />
          <div className="my-4"></div>
          <ActiveInvest 
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
