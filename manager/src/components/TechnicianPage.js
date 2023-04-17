import { useState } from "react";

function TechnicianPage(){
    const [value, setValue] = useState(0);
    const FindOrder = () => {
        
    }
    return (
        <div>
            <div>Your ID</div>
            <input type="number" value={value} onChange={(event) => setValue(event.target.value)}></input>
        </div>
    );
}

export default TechnicianPage;