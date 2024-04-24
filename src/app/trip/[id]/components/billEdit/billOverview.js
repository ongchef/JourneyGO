
import BillPanel from "./billPanel";
import MyBill from "./mybill";
import BillCard from "./billCard";
// import { getNewMember } from '@/services/getNewMember';

export function BillPlan() {
  

  return (
    <div  style={{paddingLeft:'20px'}}>
        <div className="flex gap-5 items-center">
            <BillPanel />
        </div>
    
    <div>
        <div style={{paddingTop:'20px'}}>
          <MyBill />
        </div>
  
      <div style={{paddingTop:'20px'}}>
        <BillCard />
      </div>
    </div>
    </div>
  );
}
export default BillPlan;

