import React from 'react';
//import { BrowserRouter, Route, Link } from 'react-router-dom';
import BillPanel from "./billPanel";
import MyBill from "./mybill";
import BillCard from "./billCard";


export function BillOverview() {

  return (
    <div  style={{display:'flex', paddingLeft:'40px', flexDirection:'column'}}>
      <div style={{position: 'sticky', top: 100}}>
      <div style={{ overflowY: 'auto'}}>
          <div>
            <BillPanel />
          
            <div>
            {/* <div style={{paddingTop:'20px', position: 'fixed', top: '50px', bottom: '50px', width: '100%', overflowY: 'auto' }}> */}
                <MyBill />
            </div>
        </div>
        </div>
      </div>
      <div style={{ flex:'1', overflowY:'auto' , paddingTop: '20px', zIndex:'1000'}}>
        <div style={{ paddingBottom: '35px' }}>
            <div style={{display:'flex' ,flexDirection:'column', gap: '20px'}}>
                <BillCard />
                <BillCard />
                <BillCard />
                <BillCard />
                <BillCard />
            </div>
        </div>
      </div>
    </div>
    
  );
}
export default BillOverview;