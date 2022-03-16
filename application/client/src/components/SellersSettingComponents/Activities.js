import { NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2'; 


const sellerActivitiesSettings = () => {

   return (
    <div className="sellerActivitiesSettings-wrapper">
        <h3># of Activities</h3>
        <div className="sellerActivitiesSettings-firstContainer">
            <Bar data={{
                labels: ['Sells', 'Posts', 'Refunds', 'Returns', 'Reports'], 
                datasets: [ 
                        {
                            data: [12,20,5,8,18], 
                            backgroundColor: [
                                'green', 
                                'blue', 
                                'orange', 
                                'yellow', 
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



export default sellerActivitiesSettings;