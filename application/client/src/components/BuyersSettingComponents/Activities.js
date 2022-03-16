import React from 'react';
import { Bar } from 'react-chartjs-2'; 


const buyerActivitiesSettings = () => {

   return (
    <div className="buyerActivitiesSettings-wrapper">
        <h3># of Activities</h3>
        <div className="buyerActivitiesSettings-firstContainer">
            <Bar data={{
                labels: ['Buys', 'Rate', 'Reviews', 'Refunds', 'Returns', 'Reports'], 
                datasets: [ 
                        {
                            data: [12,20,5,8,18,30], 
                            backgroundColor: [
                                'green', 
                                'blue', 
                                'orange', 
                                'yellow', 
                                'purple', 
                                'red'
                            ]
                        },
                    ],
                }}
                height={400}
                width={600} 
                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    </div>
   );
};



export default buyerActivitiesSettings;